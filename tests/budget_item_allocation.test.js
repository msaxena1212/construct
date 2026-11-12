'use strict';
/**
 * Feature: item-wise budget allocation at budget creation (budget heads). In-memory SQLite (tests/setup).
 * Covers: heads, revision and allocations created together; the item total must equal the budget total exactly;
 * a second budget revision reuses the heads; duplicate and empty items are refused; tenant isolation.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const URL = '/api/v1/projects/budget/item-allocations';

jest.setTimeout(120000);

describe('Item-wise budget allocation', () => {
  let companyA;
  let companyB;
  let user;
  let outsider;
  let project;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Skyline Infra', email: 'budget@skyline.test' });
    companyB = await db.company.create({ name: 'Horizon Build', email: 'budget@horizon.test' });

    const roleA = await db.role.create({ name: 'Planner', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Planner B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });

    user = await db.user.create({ firstname: 'Asha', lastname: 'Rao', email: 'asha@skyline.test', company_id: companyA.id, role_id: roleA.id });
    outsider = await db.user.create({ firstname: 'Omar', lastname: 'Khan', email: 'omar@horizon.test', company_id: companyB.id, role_id: roleB.id });
    project = await db.project.create({ name: 'Tower A', type: 'commercial', company_id: companyA.id });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('items create heads, a draft budget revision and one allocation per item, totalling the budget', async () => {
    const res = await request(app)
      .post(URL)
      .set('Authorization', tok(user))
      .send({
        project_id: project.id,
        budget_total: '300.30',
        items: [
          { name: 'Structural steel', amount: 100.1 },
          { name: 'Cement and aggregates', amount: 200.2 },
        ],
      });
    expect(res.status).toBe(201);
    const { budget, allocations } = res.body.data;
    expect(budget.revision_number).toBe(1);
    expect(budget.status).toBe('draft');
    expect(Number(budget.total_budget_amount)).toBeCloseTo(300.3, 2);
    expect(allocations).toHaveLength(2);
    expect(allocations.map((a) => Number(a.allocated_amount)).reduce((s, x) => s + x, 0)).toBeCloseTo(300.3, 2);

    const heads = await db.budget_head.findAll({ where: { project_id: project.id } });
    expect(heads.map((h) => h.head_code).sort()).toEqual(['ITEM-CEMENT-AND-AGGREGATES', 'ITEM-STRUCTURAL-STEEL']);
  });

  test('a second budget reuses the existing heads and becomes revision 2 linked to revision 1', async () => {
    const first = await db.budget.findOne({ where: { project_id: project.id, revision_number: 1 } });
    const res = await request(app)
      .post(URL)
      .set('Authorization', tok(user))
      .send({
        project_id: project.id,
        items: [
          { name: 'Structural steel', amount: 150 },
          { name: 'Cement and aggregates', amount: 50 },
        ],
      });
    expect(res.status).toBe(201);
    expect(res.body.data.budget.revision_number).toBe(2);
    expect(res.body.data.budget.preceding_budget_id).toBe(first.id);
    expect(await db.budget_head.count({ where: { project_id: project.id } })).toBe(2);
  });

  test('items that do not add up to the budget total are refused with both amounts', async () => {
    const res = await request(app)
      .post(URL)
      .set('Authorization', tok(user))
      .send({ project_id: project.id, budget_total: 500, items: [{ name: 'Labour', amount: 400 }] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/add up to 400\.00 but the budget total is 500\.00/);
  });

  test('a duplicate item name is refused', async () => {
    const res = await request(app)
      .post(URL)
      .set('Authorization', tok(user))
      .send({ project_id: project.id, items: [{ name: 'Labour', amount: 10 }, { name: 'labour ', amount: 20 }] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/repeats an existing item name/);
  });

  test('a request with no items is refused', async () => {
    const res = await request(app).post(URL).set('Authorization', tok(user)).send({ project_id: project.id, items: [] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/At least one budget item/);
  });

  test('a negative amount is refused', async () => {
    const res = await request(app)
      .post(URL)
      .set('Authorization', tok(user))
      .send({ project_id: project.id, items: [{ name: 'Labour', amount: -5 }] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/non-negative/);
  });

  test('another company cannot create items on this project', async () => {
    const res = await request(app)
      .post(URL)
      .set('Authorization', tok(outsider))
      .send({ project_id: project.id, items: [{ name: 'Labour', amount: 10 }] });
    expect(res.status).toBe(404);
  });
});
