'use strict';
/**
 * Material Project Reallocation and Equipment Reassignment (cross-project) — isolated SQLite only.
 * Verifies validation-before-movement, rollback-safe behaviour, rejection of invalid input and balance reconciliation.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

// Material Project Reallocation is gated (see project_reallocation_gate.test.js). Only the equipment
// reassignment path is exercised here; it is a separate asset-management operation and is not gated.
describe.each([
  ['equipment', 'equipment_project_stock', 'equipment_id', '/api/v1/equipment_stock_transfer'],
])('%s cross-project transfer', (kind, stockModel, idField, path) => {
  let company, user, p1, p2, other, item;

  const stockOf = async (projectId) => {
    const row = await db[stockModel].findOne({ where: { [idField]: item.id, project_id: projectId } });
    return row ? Number(row.stockUsed) : null;
  };
  const send = (transfers) =>
    request(app).put(`${path}/${item.id}`).set('Authorization', tok(user)).send({ note: 'test', transfers });

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    company = await db.company.create({ name: `Co ${kind}`, email: `${kind}@co.test` });
    const mod = await db.rbac_module.create({ name: kind, path: kind, title: kind });
    const role = await db.role.create({ name: 'Full', type: 'custom', company_id: company.id });
    await db.role_permission.create({ role_id: role.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    user = await db.user.create({ firstname: 'A', lastname: 'B', email: `${kind}@u.test`, company_id: company.id, role_id: role.id });
    p1 = await db.project.create({ name: 'P1', type: 'commercial', company_id: company.id });
    p2 = await db.project.create({ name: 'P2', type: 'commercial', company_id: company.id });
    const outsiderCo = await db.company.create({ name: 'Other', email: `${kind}@other.test` });
    other = await db.project.create({ name: 'Foreign', type: 'commercial', company_id: outsiderCo.id });
    item = await db[kind].create({ name: 'Item', sku: 'X-1', company_id: company.id });
    await db[stockModel].create({ name: 'Item', sku: 'X-1', stockIn: 10, stockUsed: 10, [idField]: item.id, project_id: p1.id, company_id: company.id });
  });

  test('rejects same project and zero quantity without moving stock', async () => {
    expect((await send([{ from_project_id: p1.id, to_project_id: p1.id, quantity: 1 }])).status).toBe(400);
    expect((await send([{ from_project_id: p1.id, to_project_id: p2.id, quantity: 0 }])).status).toBe(400);
    expect(await stockOf(p1.id)).toBe(10);
  });

  test('unknown destination leaves source balance unchanged', async () => {
    const res = await send([{ from_project_id: p1.id, to_project_id: other.id, quantity: 4 }]);
    expect(res.status).toBe(404);
    expect(await stockOf(p1.id)).toBe(10);
  });

  test('insufficient source stock is rejected', async () => {
    const res = await send([{ from_project_id: p1.id, to_project_id: p2.id, quantity: 11 }]);
    expect(res.status).toBe(400);
    expect(await stockOf(p1.id)).toBe(10);
  });

  test('a failing later row rolls back an earlier valid row', async () => {
    const res = await send([
      { from_project_id: p1.id, to_project_id: p2.id, quantity: 3 },
      { from_project_id: p1.id, to_project_id: p2.id, quantity: 99 },
    ]);
    expect(res.status).toBe(400);
    expect(await stockOf(p1.id)).toBe(10);
    expect(await stockOf(p2.id)).toBeNull();
  });

  test('valid transfer reconciles and zero source becomes NOT ASSIGNED', async () => {
    expect((await send([{ from_project_id: p1.id, to_project_id: p2.id, quantity: 6 }])).status).toBe(200);
    expect(await stockOf(p1.id)).toBe(4);
    expect(await stockOf(p2.id)).toBe(6);
    expect((await send([{ from_project_id: p1.id, to_project_id: p2.id, quantity: 4 }])).status).toBe(200);
    const src = await db[stockModel].findOne({ where: { [idField]: item.id, project_id: p1.id } });
    expect(src.status).toBe('NOT ASSIGNED');
    expect((await stockOf(p1.id)) + (await stockOf(p2.id))).toBe(10);
  });
});
