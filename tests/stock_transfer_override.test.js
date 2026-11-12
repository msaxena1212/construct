'use strict';
/**
 * Separation of duties with the documented Super Admin override. SQLite isolated test database only.
 * The same operator may request and approve only as Super Admin, with a recorded reason. Ordinary users cannot.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const KEY = (s) => `ovr-key-${s}-${Math.random().toString(36).slice(2, 10)}`;
const B = '/api/v1/stock-transfers';

describe('Stock transfer — Super Admin override for separation of duties', () => {
  let company, project, src, dst, cement, superAdmin, clerk;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'stock-transfer', path: 'stock-transfer', title: 'Stock Transfer' });
    company = await db.company.create({ name: 'Override Co', email: 'ovr@co.test' });
    const superRole = await db.role.create({ name: 'Super Admin', type: 'custom', company_id: company.id });
    const clerkRole = await db.role.create({ name: 'Store Clerk', type: 'custom', company_id: company.id });
    for (const r of [superRole, clerkRole]) {
      await db.role_permission.create({ role_id: r.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    }
    superAdmin = await db.user.create({ firstname: 'Super', lastname: 'Admin', email: 'sa@ovr.test', company_id: company.id, role_id: superRole.id });
    clerk = await db.user.create({ firstname: 'Clerk', lastname: 'One', email: 'clerk@ovr.test', company_id: company.id, role_id: clerkRole.id });
    project = await db.project.create({ name: 'Override Tower', type: 'commercial', company_id: company.id });
    src = await db.store_location.create({ company_id: company.id, project_id: project.id, code: 'OS', name: 'Source', location_type: 'central_warehouse' });
    dst = await db.store_location.create({ company_id: company.id, project_id: project.id, code: 'OD', name: 'Dest', location_type: 'site_store' });
    cement = await db.material_project_stock.create({ name: 'Cement', sku: 'OC', stockIn: 50, stockUsed: 0, project_id: project.id, company_id: company.id, unit_of_measure: 'bags' });
    await request(app).post(`${B}/placements`).set('Authorization', tok(superAdmin)).send({ project_id: project.id, material_id: cement.id, location_id: src.id, quantity: 50, idempotency_key: KEY('place'), reason: 'Opening' });
  });

  async function newSubmitted(actor, qty = 5) {
    const c = await request(app).post(B).set('Authorization', tok(actor)).send({
      source_location_id: src.id, destination_location_id: dst.id, reason: 'Override check', lines: [{ material_id: cement.id, requested_qty: qty }],
    });
    const id = c.body.data.id;
    await request(app).put(`${B}/${id}/submit`).set('Authorization', tok(actor));
    return { id, line: c.body.data.lines[0].id };
  }

  test('Super Admin self-approval without a reason is refused', async () => {
    const { id, line } = await newSubmitted(superAdmin);
    const res = await request(app).put(`${B}/${id}/approve`).set('Authorization', tok(superAdmin)).send({ lines: [{ line_id: line, approved_qty: 5 }] });
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/override_reason/);
  });

  test('Super Admin self-approval with a reason succeeds and records the override and both identities', async () => {
    const { id, line } = await newSubmitted(superAdmin);
    const res = await request(app).put(`${B}/${id}/approve`).set('Authorization', tok(superAdmin)).send({
      lines: [{ line_id: line, approved_qty: 5 }],
      override_reason: 'Single operator demo: Super Admin approves own request',
    });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('approved');
    expect(res.body.data.decision_reason).toMatch(/^Super Admin override:/);
    const ev = await db.stock_transfer_event.findOne({ where: { transfer_id: id, event_type: 'approved' }, raw: true });
    const detail = JSON.parse(ev.detail);
    expect(detail.creator_id).toBe(superAdmin.id);
    expect(detail.approver_id).toBe(superAdmin.id);
    expect(detail.super_admin_override.reason).toMatch(/Single operator/);
    expect(detail.super_admin_override.at).toBeTruthy();
  });

  test('an ordinary user cannot approve their own request, even with a reason', async () => {
    const { id, line } = await newSubmitted(clerk);
    const res = await request(app).put(`${B}/${id}/approve`).set('Authorization', tok(clerk)).send({
      lines: [{ line_id: line, approved_qty: 5 }],
      override_reason: 'I would like to approve my own request',
    });
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/Separation of duties/);
    const still = await db.stock_transfer.findOne({ where: { id }, raw: true });
    expect(still.status).toBe('submitted');
  });

  test('Super Admin self write-off requires a reason and records the override', async () => {
    const created = await newSubmitted(superAdmin, 3);
    await request(app).put(`${B}/${created.id}/approve`).set('Authorization', tok(superAdmin)).send({
      lines: [{ line_id: created.line, approved_qty: 3 }], override_reason: 'Single operator demo approval',
    });
    await request(app).post(`${B}/${created.id}/checkout`).set('Authorization', tok(superAdmin)).send({ idempotency_key: KEY('co'), lines: [{ line_id: created.line, quantity: 3 }] });
    const decl = await request(app).post(`${B}/${created.id}/shortages`).set('Authorization', tok(superAdmin)).send({ line_id: created.line, quantity: 1, reason: 'One bag missing' });
    expect(decl.status).toBe(201);
    const disc = decl.body.data.discrepancies.find((d) => d.status === 'open');
    const noReason = await request(app).post(`${B}/shortages/${disc.id}/write-off`).set('Authorization', tok(superAdmin)).send({ reason: 'Loss confirmed', idempotency_key: KEY('wo-a') });
    expect(noReason.status).toBe(403);
    const withReason = await request(app).post(`${B}/shortages/${disc.id}/write-off`).set('Authorization', tok(superAdmin)).send({
      reason: 'Loss confirmed', idempotency_key: KEY('wo-b'), override_reason: 'Single operator demo write-off',
    });
    expect(withReason.status).toBe(200);
    const ev = await db.stock_transfer_event.findOne({ where: { transfer_id: created.id, event_type: 'shortage_written_off' }, raw: true });
    expect(JSON.parse(ev.detail).super_admin_override.reason).toMatch(/Single operator/);
  });
});
