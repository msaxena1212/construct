'use strict';
/**
 * Temporary server-side gate for legacy Material Project Reallocation (isolated SQLite test database only).
 * Direct API requests must not execute the old counter-based reallocation, and project balances and ledger rows
 * must remain unchanged. Authentication and permission checks still run first.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const PATH = '/api/v1/material_stock_transfer';
const MESSAGE = 'Project Reallocation is temporarily unavailable pending ledger reconciliation.';

describe('Material Project Reallocation — temporary server-side gate', () => {
  let company, writer, reader, p1, p2, item;

  const snapshot = async () => ({
    p1: Number((await db.material_project_stock.findOne({ where: { material_id: item.id, project_id: p1.id } })).stockUsed),
    p1In: Number((await db.material_project_stock.findOne({ where: { material_id: item.id, project_id: p1.id } })).stockIn),
    p2: await db.material_project_stock.count({ where: { material_id: item.id, project_id: p2.id } }),
    ledger: await db.stock_ledger.count({ where: { company_id: company.id } }),
  });

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    company = await db.company.create({ name: 'Gate Co', email: 'gate@co.test' });
    const mod = await db.rbac_module.create({ name: 'material', path: 'material', title: 'Material' });
    const full = await db.role.create({ name: 'Full', type: 'custom', company_id: company.id });
    const readOnly = await db.role.create({ name: 'Read', type: 'custom', company_id: company.id });
    await db.role_permission.create({ role_id: full.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    await db.role_permission.create({ role_id: readOnly.id, module_id: mod.id, can_create: false, can_read: true, can_update: false, can_delete: false });
    writer = await db.user.create({ firstname: 'W', lastname: 'U', email: 'w@gate.test', company_id: company.id, role_id: full.id });
    reader = await db.user.create({ firstname: 'R', lastname: 'O', email: 'r@gate.test', company_id: company.id, role_id: readOnly.id });
    p1 = await db.project.create({ name: 'P1', type: 'commercial', company_id: company.id });
    p2 = await db.project.create({ name: 'P2', type: 'commercial', company_id: company.id });
    item = await db.material.create({ name: 'Item', sku: 'G-1', company_id: company.id });
    await db.material_project_stock.create({ name: 'Item', sku: 'G-1', stockIn: 10, stockUsed: 10, material_id: item.id, project_id: p1.id, company_id: company.id });
  });

  test('a direct API request with a valid body is refused with 409 and changes nothing', async () => {
    const before = await snapshot();
    const res = await request(app)
      .put(`${PATH}/${item.id}`)
      .set('Authorization', tok(writer))
      .send({ note: 'direct call', transfers: [{ from_project_id: p1.id, to_project_id: p2.id, quantity: 4 }] });
    expect(res.status).toBe(409);
    expect(res.body.code).toBe('REALLOCATION_UNAVAILABLE');
    expect(res.body.message).toBe(MESSAGE);
    expect(await snapshot()).toEqual(before);
  });

  test('repeated and malformed requests are all refused before any database mutation', async () => {
    const before = await snapshot();
    const bodies = [
      { transfers: [{ from_project_id: p1.id, to_project_id: p2.id, quantity: 1 }] },
      { transfers: [{ from_project_id: p1.id, to_project_id: p2.id, quantity: 99 }] },
      { transfers: [] },
      { transfers: [{ from_project_id: p1.id, to_project_id: p1.id, quantity: 1 }] },
    ];
    for (const body of bodies) {
      const res = await request(app).put(`${PATH}/${item.id}`).set('Authorization', tok(writer)).send(body);
      expect(res.status).toBe(409);
      expect(res.body.message).toBe(MESSAGE);
    }
    expect(await snapshot()).toEqual(before);
  });

  test('authentication is still enforced: no token is refused', async () => {
    const before = await snapshot();
    const res = await request(app).put(`${PATH}/${item.id}`).send({ transfers: [{ from_project_id: p1.id, to_project_id: p2.id, quantity: 1 }] });
    expect(res.status).toBe(401);
    expect(await snapshot()).toEqual(before);
  });

  test('authorization is still enforced: a read-only role is refused by the permission check', async () => {
    const before = await snapshot();
    const res = await request(app)
      .put(`${PATH}/${item.id}`)
      .set('Authorization', tok(reader))
      .send({ transfers: [{ from_project_id: p1.id, to_project_id: p2.id, quantity: 1 }] });
    expect(res.status).toBe(403);
    expect(await snapshot()).toEqual(before);
  });
});
