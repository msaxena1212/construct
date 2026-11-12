'use strict';
/**
 * Feature: images on a daily progress report. In-memory SQLite (tests/setup); stored files are written by the storage
 * service under the backend's uploads folder and removed by this suite after each run.
 * Covers: accepted images, real-type checks (a renamed file is refused), the 10-image limit, the 10 MB limit, tenant
 * isolation, and listing.
 */
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(16, 1)]);
const JPG = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(16, 2)]);
const WEBP = Buffer.concat([Buffer.from('RIFF'), Buffer.from([0x10, 0, 0, 0]), Buffer.from('WEBP'), Buffer.alloc(8, 3)]);
const TEXT = Buffer.from('this is not an image, but it is named like one .png');

const storedFiles = new Set();

jest.setTimeout(120000);

describe('DPR images', () => {
  let companyA;
  let companyB;
  let user;
  let outsider;
  let project;
  let dpr;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Skyline Infra', email: 'dpr@skyline.test' });
    companyB = await db.company.create({ name: 'Horizon Build', email: 'dpr@horizon.test' });

    const roleA = await db.role.create({ name: 'Site Engineer', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Site Engineer B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });

    user = await db.user.create({ firstname: 'Asha', lastname: 'Rao', email: 'asha@skyline.test', company_id: companyA.id, role_id: roleA.id });
    outsider = await db.user.create({ firstname: 'Omar', lastname: 'Khan', email: 'omar@horizon.test', company_id: companyB.id, role_id: roleB.id });

    project = await db.project.create({ name: 'Tower A', type: 'commercial', company_id: companyA.id });
    dpr = await db.dpr.create({ project_id: project.id, company_id: companyA.id, created_by: user.id, report_date: '2026-11-02' });
  });

  afterAll(async () => {
    for (const file of storedFiles) if (fs.existsSync(file)) fs.unlinkSync(file);
    await db.sequelize.close();
  });

  const post = (token, files) => {
    let req = request(app).post(`/api/v1/dpr/${dpr.id}/images`).set('Authorization', token);
    for (const f of files) req = req.attach('images', f.buffer, { filename: f.name, contentType: f.type });
    return req;
  };

  function trackStored(res) {
    for (const row of res.body.data || []) storedFiles.add(row.file_key);
  }

  test('a PNG, a JPG and a WEBP are stored and listed', async () => {
    const res = await post(tok(user), [
      { name: 'slab.png', type: 'image/png', buffer: PNG },
      { name: 'rebar.jpg', type: 'image/jpeg', buffer: JPG },
      { name: 'formwork.webp', type: 'image/webp', buffer: WEBP },
    ]);
    trackStored(res);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.data.map((r) => r.mime_type).sort()).toEqual(['image/jpeg', 'image/png', 'image/webp']);

    const list = await request(app).get(`/api/v1/dpr/${dpr.id}/images`).set('Authorization', tok(user));
    expect(list.status).toBe(200);
    expect(list.body.data).toHaveLength(3);
  });

  test('a text file renamed to .png is refused and nothing is stored', async () => {
    const before = await db.dpr_image.count({ where: { dpr_id: dpr.id } });
    const res = await post(tok(user), [{ name: 'notes.png', type: 'image/png', buffer: TEXT }]);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/not a valid PNG image/);
    expect(await db.dpr_image.count({ where: { dpr_id: dpr.id } })).toBe(before);
  });

  test('an unsupported declared type is refused', async () => {
    const res = await post(tok(user), [{ name: 'plan.pdf', type: 'application/pdf', buffer: PNG }]);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Only JPG, PNG and WEBP/);
  });

  test('more than 10 images in one request is refused', async () => {
    const eleven = Array.from({ length: 11 }, (_, i) => ({ name: `p${i}.png`, type: 'image/png', buffer: PNG }));
    const res = await post(tok(user), eleven);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/at most 10/);
  });

  test('an image over 10 MB is refused with 413', async () => {
    const big = Buffer.concat([PNG, Buffer.alloc(10 * 1024 * 1024 + 1, 0)]);
    const res = await post(tok(user), [{ name: 'huge.png', type: 'image/png', buffer: big }]);
    expect(res.status).toBe(413);
    expect(res.body.message).toMatch(/10 MB or smaller/);
  });

  test('the report limit of 10 counts images already stored', async () => {
    // 3 are stored from the first test; 7 more fill the report to 10, and one more is refused.
    const seven = Array.from({ length: 7 }, (_, i) => ({ name: `q${i}.png`, type: 'image/png', buffer: PNG }));
    const filled = await post(tok(user), seven);
    trackStored(filled);
    expect(filled.status).toBe(201);
    const over = await post(tok(user), [{ name: 'extra.png', type: 'image/png', buffer: PNG }]);
    expect(over.status).toBe(400);
    expect(over.body.message).toMatch(/limit is 10/);
  });

  test('another company cannot attach images to this report or see them', async () => {
    const res = await request(app)
      .post(`/api/v1/dpr/${dpr.id}/images`)
      .set('Authorization', tok(outsider))
      .attach('images', PNG, { filename: 'x.png', contentType: 'image/png' });
    expect(res.status).toBe(404);
    const list = await request(app).get(`/api/v1/dpr/${dpr.id}/images`).set('Authorization', tok(outsider));
    expect(list.status).toBe(404);
  });

  test('an uploaded image streams back with its type and bytes; another company gets 404', async () => {
    // A separate report, because the shared one already holds 10 images.
    const fresh = await db.dpr.create({ project_id: project.id, company_id: companyA.id, created_by: user.id, report_date: '2026-11-03' });
    const res = await request(app)
      .post(`/api/v1/dpr/${fresh.id}/images`)
      .set('Authorization', tok(user))
      .attach('images', PNG, { filename: 'streamed.png', contentType: 'image/png' });
    trackStored(res);
    expect(res.status).toBe(201);
    const imageId = res.body.data[0].id;

    const ok = await request(app).get(`/api/v1/dpr/images/${imageId}/file`).set('Authorization', tok(user)).buffer(true).parse(
      (r, cb) => {
        const chunks = [];
        r.on('data', (c) => chunks.push(c));
        r.on('end', () => cb(null, Buffer.concat(chunks)));
      }
    );
    expect(ok.status).toBe(200);
    expect(ok.headers['content-type']).toMatch(/image\/png/);
    expect(ok.headers['x-content-type-options']).toBe('nosniff');
    expect(Buffer.from(ok.body).equals(PNG)).toBe(true);

    const other = await request(app).get(`/api/v1/dpr/images/${imageId}/file`).set('Authorization', tok(outsider));
    expect(other.status).toBe(404);
  });

  test('a request with no images is refused', async () => {
    const res = await request(app).post(`/api/v1/dpr/${dpr.id}/images`).set('Authorization', tok(user));
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/at least one image/);
  });
});
