'use strict';
/**
 * Material / equipment assignment to projects and delete guard — isolated SQLite test database only.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe.each([
  ['material', 'material_project_stock', 'material_id', '/api/v1/updateMaterial', '/api/v1/deleteMaterial'],
  ['equipment', 'equipment_project_stock', 'equipment_id', '/api/v1/updateequipment', '/api/v1/deleteequipment'],
])('%s assignment and delete guard', (kind, stockModel, idField, updatePath, deletePath) => {
  let company, user, p1, p2, foreign, item;

  const assign = (projects) =>
    request(app).put(`${updatePath}/${item.id}`).set('Authorization', tok(user)).send({ projects });
  const reload = () => db[kind].findOne({ where: { id: item.id } });

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    company = await db.company.create({ name: `Co ${kind}`, email: `${kind}@asg.test` });
    const mod = await db.rbac_module.create({ name: kind, path: kind, title: kind });
    const role = await db.role.create({ name: 'Full', type: 'custom', company_id: company.id });
    await db.role_permission.create({ role_id: role.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    user = await db.user.create({ firstname: 'A', lastname: 'B', email: `${kind}@asg-u.test`, company_id: company.id, role_id: role.id });
    p1 = await db.project.create({ name: 'P1', type: 'commercial', company_id: company.id });
    p2 = await db.project.create({ name: 'P2', type: 'commercial', company_id: company.id });
    const other = await db.company.create({ name: 'Other', email: `${kind}@asg-o.test` });
    foreign = await db.project.create({ name: 'Foreign', type: 'commercial', company_id: other.id });
    item = await db[kind].create({ name: 'Item', sku: 'A-1', stockIn: 10, stockUsed: 0, company_id: company.id });
  });

  test('rejects zero quantity and foreign project without changing stock', async () => {
    expect((await assign([{ project_id: p1.id, stock: 0 }])).status).toBe(400);
    expect((await assign([{ project_id: foreign.id, stock: 1 }])).status).toBe(404);
    expect(Number((await reload()).stockUsed)).toBe(0);
  });

  test('rejects over-allocation atomically', async () => {
    const res = await assign([{ project_id: p1.id, stock: 6 }, { project_id: p2.id, stock: 6 }]);
    expect(res.status).toBe(400);
    expect(Number((await reload()).stockUsed)).toBe(0);
    expect(await db[stockModel].count({ where: { [idField]: item.id } })).toBe(0);
  });

  test('valid assignment updates totals and remaining', async () => {
    const res = await assign([{ project_id: p1.id, stock: 4 }, { project_id: p2.id, stock: 3 }]);
    expect(res.status).toBe(200);
    const m = await reload();
    expect(Number(m.stockUsed)).toBe(7);
    expect(Number(m.stockRemaining)).toBe(3);
    expect(m.status).toBe('ASSIGNED');
  });

  test('delete is blocked while stock is allocated to projects', async () => {
    const res = await request(app).delete(`${deletePath}/${item.id}`).set('Authorization', tok(user));
    expect(res.status).toBe(409);
    expect((await reload()).isDeleted).toBeFalsy();
  });
});
