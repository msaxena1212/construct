'use strict';
/**
 * Feature: Microsoft Project interchange (MSPDI XML). In-memory SQLite (tests/setup).
 * Covers: the XML reader (entities, CDATA, comments, DOCTYPE refused); importing the sample into WBS and tasks;
 * re-importing reuses WBS nodes and replaces the earlier tasks (matched by UID; hand-made and worked-on tasks are kept);
 * export and re-import into another project; refused files; tenant isolation.
 */
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const { parseXml, XmlError } = require('../src/core/utils/xml-lite');
const { parseMspdi } = require('../src/modules/projects/services/mspdi.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const SAMPLE = fs.readFileSync(path.join(__dirname, 'fixtures', 'msp-sample.xml'));
const IMPORT = (id) => `/api/v1/projects/msp/${id}/import`;
const EXPORT = (id) => `/api/v1/projects/msp/${id}/export`;

jest.setTimeout(120000);

describe('XML reader', () => {
  test('decodes predefined and numeric entities and reads CDATA and comments', () => {
    const doc = parseXml('<?xml version="1.0"?><!-- note --><A x="1 &amp; 2"><B>a &lt; b &#65;<![CDATA[ <raw> ]]></B><C/></A>');
    const a = doc.children[0];
    expect(a.attrs.x).toBe('1 & 2');
    expect(a.children[0].text).toBe('a < b A <raw> ');
    expect(a.children[1].name).toBe('C');
  });

  test('a DOCTYPE declaration is refused, so no external or custom entities can be declared', () => {
    expect(() => parseXml('<!DOCTYPE x [<!ENTITY e "boom">]><x>&e;</x>')).toThrow(/DOCTYPE/);
  });

  test('malformed markup is refused', () => {
    expect(() => parseXml('<a><b></a>')).toThrow(XmlError);
    expect(() => parseXml('<a>')).toThrow(/Unclosed/);
  });
});

describe('MSPDI parsing of the sample', () => {
  test('UID 0 is skipped, the unnamed task is reported, and summaries are separated from tasks', () => {
    const parsed = parseMspdi(SAMPLE.toString('utf8'));
    expect(parsed.projectName).toBe('Tower A schedule');
    expect(parsed.tasks.filter((t) => t.summary).map((t) => t.name)).toEqual(['Structure', 'Foundations', 'Finishes']);
    expect(parsed.tasks.find((t) => t.uid === 3).name).toBe('Excavation & shoring');
    expect(parsed.tasks.find((t) => t.uid === 4).name).toBe('Pile caps <level 1>');
    expect(parsed.skipped).toEqual([{ uid: 7, reason: 'The task has no name.' }]);
  });
});

describe('MS Project import and export', () => {
  let companyA;
  let companyB;
  let user;
  let outsider;
  let projectA;
  let projectB;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Skyline Infra', email: 'msp@skyline.test' });
    companyB = await db.company.create({ name: 'Horizon Build', email: 'msp@horizon.test' });
    const roleA = await db.role.create({ name: 'Planner', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Planner B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    user = await db.user.create({ firstname: 'Asha', lastname: 'Rao', email: 'asha@skyline.test', company_id: companyA.id, role_id: roleA.id });
    outsider = await db.user.create({ firstname: 'Omar', lastname: 'Khan', email: 'omar@horizon.test', company_id: companyB.id, role_id: roleB.id });
    projectA = await db.project.create({ name: 'Tower A', type: 'commercial', company_id: companyA.id });
    projectB = await db.project.create({ name: 'Tower B', type: 'commercial', company_id: companyA.id });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('the sample imports into WBS nodes with the outline hierarchy and into tasks with the right status', async () => {
    const res = await request(app).post(IMPORT(projectA.id)).set('Authorization', tok(user)).attach('file', SAMPLE, { filename: 'tower-a.xml', contentType: 'text/xml' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ wbs_created: 3, wbs_reused: 0, tasks_created: 3 });
    expect(res.body.data.skipped).toHaveLength(1);

    const foundations = await db.wbs.findOne({ where: { project_id: projectA.id, wbs_code: '1.1' } });
    const structure = await db.wbs.findOne({ where: { project_id: projectA.id, wbs_code: '1' } });
    expect(foundations.parent_id).toBe(structure.id);
    expect(foundations.level).toBe(2);

    const tasks = await db.project_task.findAll({ where: { project_id: projectA.id }, order: [['id', 'ASC']] });
    expect(tasks.map((t) => [t.title, t.status, t.progress])).toEqual([
      ['Excavation & shoring', 'Completed', 100],
      ['Pile caps <level 1>', 'In Progress', 40],
      ['Painting and primer', 'To Do', 0],
    ]);
    expect(tasks[0].due_date.toISOString().slice(0, 10)).toBe('2026-11-10');

    // One milestone for this import holds all three tasks. Their progress is 100, 40 and 0, so the milestone is at 47.
    expect(res.body.data.milestone_name).toBe('MS Project: Tower A schedule');
    const milestone = await db.milestone.findByPk(res.body.data.milestone_id);
    expect(milestone).toMatchObject({ project_id: projectA.id, name: 'MS Project: Tower A schedule' });
    expect(tasks.map((t) => t.milestone_id)).toEqual([milestone.id, milestone.id, milestone.id]);
    expect(milestone.progress).toBe(47);
    expect((await db.project.findByPk(projectA.id)).progress).toBe(47);
  });

  test('importing the same file again reuses the WBS nodes and replaces the earlier tasks instead of duplicating them', async () => {
    const res = await request(app).post(IMPORT(projectA.id)).set('Authorization', tok(user)).attach('file', SAMPLE, { filename: 'tower-a.xml', contentType: 'text/xml' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ wbs_created: 0, wbs_reused: 3, tasks_created: 0, tasks_updated: 3, tasks_removed: 0, tasks_kept: 0 });
    expect(await db.wbs.count({ where: { project_id: projectA.id } })).toBe(3);
    // The schedule keeps one milestone, reused by the re-import, and still holds exactly its three tasks.
    expect(await db.milestone.count({ where: { project_id: projectA.id } })).toBe(1);
    expect(await db.project_task.count({ where: { project_id: projectA.id, milestone_id: res.body.data.milestone_id } })).toBe(3);
  });

  test('export produces MSPDI XML that parses back to the same WBS and tasks, and imports into another project', async () => {
    const exported = await request(app).get(EXPORT(projectA.id)).set('Authorization', tok(user)).buffer(true).parse((r, cb) => {
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => cb(null, Buffer.concat(chunks).toString('utf8')));
    });
    expect(exported.status).toBe(200);
    expect(exported.headers['content-type']).toMatch(/application\/xml/);
    expect(exported.headers['content-disposition']).toMatch(/attachment; filename="Tower_A-msp\.xml"/);

    const parsed = parseMspdi(exported.body);
    expect(parsed.tasks.filter((t) => t.summary)).toHaveLength(3);
    expect(parsed.tasks.filter((t) => !t.summary).map((t) => t.name)).toEqual(
      expect.arrayContaining(['Excavation & shoring', 'Pile caps <level 1>', 'Painting and primer'])
    );

    // Project A holds the three imported tasks, so the export carries every task it holds.
    const tasksInA = await db.project_task.count({ where: { project_id: projectA.id } });
    expect(parsed.tasks.filter((t) => !t.summary)).toHaveLength(tasksInA);

    const res = await request(app).post(IMPORT(projectB.id)).set('Authorization', tok(user)).attach('file', Buffer.from(exported.body), { filename: 'round.xml', contentType: 'text/xml' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ wbs_created: 3, tasks_created: tasksInA });
    expect(await db.project_task.count({ where: { project_id: projectB.id, milestone_id: res.body.data.milestone_id } })).toBe(tasksInA);
  });

  test('a file with only summary rows creates WBS nodes but no milestone', async () => {
    const projectC = await db.project.create({ name: 'Groups only', type: 'commercial', company_id: companyA.id });
    const xml =
      '<?xml version="1.0"?><Project xmlns="http://schemas.microsoft.com/project"><Name>Groups only</Name><Tasks>' +
      '<Task><UID>1</UID><ID>1</ID><Name>Structure</Name><WBS>1</WBS><OutlineNumber>1</OutlineNumber><OutlineLevel>1</OutlineLevel><Summary>1</Summary></Task>' +
      '</Tasks></Project>';
    const res = await request(app).post(IMPORT(projectC.id)).set('Authorization', tok(user)).attach('file', Buffer.from(xml), { filename: 'groups.xml', contentType: 'text/xml' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ wbs_created: 1, tasks_created: 0, milestone_id: null, milestone_name: null });
    expect(await db.milestone.count({ where: { project_id: projectC.id } })).toBe(0);
  });

  test('a file that is not XML, or not an MS Project document, is refused', async () => {
    const notXml = await request(app).post(IMPORT(projectB.id)).set('Authorization', tok(user)).attach('file', Buffer.from('<Project><Tasks>'), { filename: 'bad.xml', contentType: 'text/xml' });
    expect(notXml.status).toBe(400);
    expect(notXml.body.message).toMatch(/not valid XML/);

    const other = await request(app).post(IMPORT(projectB.id)).set('Authorization', tok(user)).attach('file', Buffer.from('<Report><x/></Report>'), { filename: 'r.xml', contentType: 'text/xml' });
    expect(other.status).toBe(400);
    expect(other.body.message).toMatch(/not an MS Project XML document/);
  });

  test('a file over 5 MB is refused with 413', async () => {
    const big = Buffer.alloc(5 * 1024 * 1024 + 1, 0x20);
    const res = await request(app).post(IMPORT(projectB.id)).set('Authorization', tok(user)).attach('file', big, { filename: 'big.xml', contentType: 'text/xml' });
    expect(res.status).toBe(413);
  });

  test('another company cannot import into or export this project', async () => {
    const imp = await request(app).post(IMPORT(projectA.id)).set('Authorization', tok(outsider)).attach('file', SAMPLE, { filename: 'x.xml', contentType: 'text/xml' });
    expect(imp.status).toBe(404);
    const exp = await request(app).get(EXPORT(projectA.id)).set('Authorization', tok(outsider));
    expect(exp.status).toBe(404);
  });

  test('a re-import replaces the earlier import: updates, adds and removes its tasks, and keeps hand-made and worked-on tasks', async () => {
    const projectD = await db.project.create({ name: 'Replace check', type: 'commercial', company_id: companyA.id });
    const first = await request(app).post(IMPORT(projectD.id)).set('Authorization', tok(user)).attach('file', SAMPLE, { filename: 'tower-a.xml', contentType: 'text/xml' });
    expect(first.status).toBe(201);
    const milestoneId = first.body.data.milestone_id;

    // A task added by hand under the same milestone, and a comment on a task the revised file will drop.
    await db.project_task.create({ project_id: projectD.id, milestone_id: milestoneId, title: 'Hand-made check', created_by: user.id });
    const pileCaps = await db.project_task.findOne({ where: { project_id: projectD.id, msp_uid: 4 } });
    await db.task_comment.create({ task_id: pileCaps.id, user_id: user.id, content: 'Check the pile caps with the engineer' });

    // Revised schedule: task 3 is 50% done, task 6 is gone, task 4 is gone, and task 9 is new.
    const revised = Buffer.from(
      '<?xml version="1.0"?><Project xmlns="http://schemas.microsoft.com/project"><Name>Tower A schedule</Name><Tasks>' +
        '<Task><UID>3</UID><ID>1</ID><Name>Excavation &amp; shoring</Name><OutlineNumber>1.1.1</OutlineNumber><OutlineLevel>3</OutlineLevel><PercentComplete>50</PercentComplete><Summary>0</Summary></Task>' +
        '<Task><UID>9</UID><ID>2</ID><Name>Backfill</Name><OutlineNumber>2.1</OutlineNumber><OutlineLevel>2</OutlineLevel><PercentComplete>0</PercentComplete><Summary>0</Summary></Task>' +
        '</Tasks></Project>'
    );
    const res = await request(app).post(IMPORT(projectD.id)).set('Authorization', tok(user)).attach('file', revised, { filename: 'tower-a-v2.xml', contentType: 'text/xml' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ tasks_created: 1, tasks_updated: 1, tasks_removed: 1, tasks_kept: 1, milestone_id: milestoneId });
    expect(await db.milestone.count({ where: { project_id: projectD.id } })).toBe(1);

    const excavation = await db.project_task.findOne({ where: { project_id: projectD.id, msp_uid: 3 } });
    expect(excavation).toMatchObject({ progress: 50, milestone_id: milestoneId });
    expect((await db.project_task.findOne({ where: { project_id: projectD.id, msp_uid: 9 } })).title).toBe('Backfill');
    // Task 6 had no work on it, so it is gone. Task 4 has a comment, so it stays and is reported as kept.
    expect(await db.project_task.findOne({ where: { project_id: projectD.id, msp_uid: 6 } })).toBeNull();
    expect(await db.task_comment.count({ where: { task_id: pileCaps.id } })).toBe(1);
    expect(await db.project_task.findOne({ where: { project_id: projectD.id, title: 'Hand-made check' } })).not.toBeNull();
    // Imported tasks 3, 4 and 9, plus the hand-made task.
    expect(await db.project_task.count({ where: { project_id: projectD.id } })).toBe(4);
  });
});
