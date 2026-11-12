'use strict';
/**
 * Project inventory workflow used by the demo: stock in (receipt), stock out (issue), balances, history,
 * quarantine and tenant rules, UOM immutability, and reversal retry. SQLite isolated test database only.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const StockLedgerService = require('../src/core/services/stock_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const KEY = (s) => `inv-key-${s}-${Math.random().toString(36).slice(2, 10)}`;
const INV = '/api/v1/inventory';
const TRF = '/api/v1/stock-transfers';

describe('Project inventory — receipts, issues, balances and isolation', () => {
  let companyA, companyB, projA, storekeeper, approver, outsider;
  let central, site, quarantine, cement, otherCompanyMaterial;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const invMod = await db.rbac_module.create({ name: 'inventory', path: 'inventory', title: 'Inventory' });
    const stMod = await db.rbac_module.create({ name: 'stock-transfer', path: 'stock-transfer', title: 'Stock Transfer' });
    companyA = await db.company.create({ name: 'Inv Co A', email: 'inv@a.test' });
    companyB = await db.company.create({ name: 'Inv Co B', email: 'inv@b.test' });
    const roleA = await db.role.create({ name: 'InvA', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'InvB', type: 'custom', company_id: companyB.id });
    for (const [role, mods] of [[roleA, [invMod, stMod]], [roleB, [invMod, stMod]]]) {
      for (const mod of mods) {
        await db.role_permission.create({ role_id: role.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
      }
    }
    storekeeper = await db.user.create({ firstname: 'Store', lastname: 'Keeper', email: 'sk@a.test', company_id: companyA.id, role_id: roleA.id });
    outsider = await db.user.create({ firstname: 'Out', lastname: 'Sider', email: 'out@b.test', company_id: companyB.id, role_id: roleB.id });
    approver = await db.user.create({ firstname: 'App', lastname: 'Rover', email: 'ap@a.test', company_id: companyA.id, role_id: roleA.id });
    projA = await db.project.create({ name: 'Demo Project A', type: 'commercial', company_id: companyA.id });

    central = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'CW', name: 'Central', location_type: 'central_warehouse' });
    site = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'SITE', name: 'Site', location_type: 'site_store' });
    quarantine = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'QA', name: 'Quarantine', location_type: 'quarantine' });

    // 50 bags of opening stock recorded at project level, none placed yet.
    cement = await db.material_project_stock.create({ name: 'Cement', sku: 'CEM', stockIn: 50, stockUsed: 0, project_id: projA.id, company_id: companyA.id, unit_of_measure: 'bags' });
    const otherProj = await db.project.create({ name: 'Other', type: 'commercial', company_id: companyB.id });
    otherCompanyMaterial = await db.material_project_stock.create({ name: 'Other cement', sku: 'OC', stockIn: 9, stockUsed: 0, project_id: otherProj.id, company_id: companyB.id, unit_of_measure: 'bags' });

    // Opening placement of 30 bags into the central warehouse, using the material's stored UOM.
    const place = await request(app).post(`${TRF}/placements`).set('Authorization', tok(storekeeper)).send({
      project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 30, idempotency_key: KEY('open-place'), reason: 'Opening stock placement',
    });
    expect(place.status).toBe(201);
  });

  test('placement row carries the material UOM, not a hardcoded default', async () => {
    const row = await db.stock_ledger.findOne({ where: { company_id: companyA.id, movement_type: 'location_placement' }, raw: true });
    expect(row.unit_of_measure).toBe('bags');
  });

  test('receipt increases the correct location once; a duplicate submission posts nothing', async () => {
    const key = KEY('grn-1');
    const body = { project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 10, reference: 'GRN-0001', idempotency_key: key };
    const first = await request(app).post(`${INV}/receipts`).set('Authorization', tok(storekeeper)).send(body);
    expect(first.status).toBe(201);
    expect(first.body.already_processed).toBe(false);
    const again = await request(app).post(`${INV}/receipts`).set('Authorization', tok(storekeeper)).send(body);
    expect(again.body.already_processed).toBe(true);
    expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, cement.id, central.id)).toBe(40);
    const rec = await StockLedgerService.getReconciliation(companyA.id, projA.id, cement.id);
    expect(rec.counter_available).toBe(60);
    expect(rec.consistent).toBe(true);
  });

  test('receipt needs a reference and a whole quantity', async () => {
    const noRef = await request(app).post(`${INV}/receipts`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 1, idempotency_key: KEY('noref') });
    expect(noRef.status).toBe(400);
    const frac = await request(app).post(`${INV}/receipts`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 1.5, reference: 'GRN-2', idempotency_key: KEY('frac') });
    expect(frac.status).toBe(400);
    expect(frac.body.code).toBe('WHOLE_UNIT_REQUIRED');
  });

  test('issue decreases the source balance once and records the activity and requester', async () => {
    const key = KEY('issue-1');
    const body = { project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 5, activity: 'Slab L2 pour', requested_by: 'Site Foreman A', idempotency_key: key };
    const res = await request(app).post(`${INV}/issues`).set('Authorization', tok(storekeeper)).send(body);
    expect(res.status).toBe(201);
    const again = await request(app).post(`${INV}/issues`).set('Authorization', tok(storekeeper)).send(body);
    expect(again.body.already_processed).toBe(true);
    expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, cement.id, central.id)).toBe(35);
    const rec = await StockLedgerService.getReconciliation(companyA.id, projA.id, cement.id);
    expect(rec.counter_available).toBe(55);
    expect(rec.consistent).toBe(true);
  });

  test('insufficient stock is rejected and nothing is posted', async () => {
    const before = await db.stock_ledger.count({ where: { company_id: companyA.id } });
    const res = await request(app).post(`${INV}/issues`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 999, activity: 'Too much', requested_by: 'X', idempotency_key: KEY('too-much') });
    expect(res.status).toBe(409);
    expect(res.body.code).toBe('INSUFFICIENT_STOCK');
    expect(await db.stock_ledger.count({ where: { company_id: companyA.id } })).toBe(before);
  });

  test('quarantined stock cannot be issued', async () => {
    const res = await request(app).post(`${INV}/issues`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: cement.id, location_id: quarantine.id, quantity: 1, activity: 'Damaged', requested_by: 'X', idempotency_key: KEY('q-issue') });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Quarantined/);
  });

  test('a user from another company cannot read or move this project inventory', async () => {
    const read = await request(app).get(`${INV}/balances?project_id=${projA.id}`).set('Authorization', tok(outsider));
    expect(read.status).toBe(404);
    const issue = await request(app).post(`${INV}/issues`).set('Authorization', tok(outsider)).send({ project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 1, activity: 'Attack', requested_by: 'X', idempotency_key: KEY('cross') });
    expect(issue.status).toBe(404);
    const receipt = await request(app).post(`${INV}/receipts`).set('Authorization', tok(outsider)).send({ project_id: projA.id, material_id: cement.id, location_id: central.id, quantity: 1, reference: 'X', idempotency_key: KEY('cross-r') });
    expect(receipt.status).toBe(404);
    const mismatch = await request(app).post(`${INV}/receipts`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: otherCompanyMaterial.id, location_id: central.id, quantity: 1, reference: 'X', idempotency_key: KEY('cross-m') });
    expect(mismatch.status).toBe(404);
  });

  test('balances endpoint agrees with the ledger', async () => {
    const res = await request(app).get(`${INV}/balances?project_id=${projA.id}`).set('Authorization', tok(storekeeper));
    expect(res.status).toBe(200);
    const row = res.body.data.materials.find((m) => m.material_id === cement.id);
    expect(row.unit_of_measure).toBe('bags');
    expect(row.reconciliation.consistent).toBe(true);
    const central_row = row.locations.find((l) => l.location_id === central.id);
    expect(central_row.balance).toBe(35);
    expect(row.counter_available).toBe(55);
    expect(row.unplaced).toBe(20);
  });

  test('movement history shows receipts and issues linked to the project and material', async () => {
    const res = await request(app).get(`${INV}/movements?project_id=${projA.id}&material_id=${cement.id}`).set('Authorization', tok(storekeeper));
    expect(res.status).toBe(200);
    const types = res.body.data.map((m) => m.movement_type);
    expect(types).toEqual(expect.arrayContaining(['receipt', 'location_issue', 'location_placement']));
    expect(res.body.data.every((m) => m.material && m.material.id === cement.id)).toBe(true);
  });

  test('UOM cannot change after stock movements exist; blank or unknown UOM is rejected', async () => {
    await expect(cement.update({ unit_of_measure: 'kg' })).rejects.toThrow(/cannot be changed/);
    await expect(
      db.material_project_stock.create({ name: 'Blank', sku: 'B1', stockIn: 0, stockUsed: 0, project_id: projA.id, company_id: companyA.id, unit_of_measure: '' })
    ).rejects.toThrow();
    await expect(
      db.material_project_stock.create({ name: 'Unknown', sku: 'U1', stockIn: 0, stockUsed: 0, project_id: projA.id, company_id: companyA.id, unit_of_measure: 'furlong' })
    ).rejects.toThrow();
  });

  test('reversal retry with the same key returns a consistent response and posts nothing new', async () => {
    const created = await request(app).post(TRF).set('Authorization', tok(storekeeper)).send({
      source_location_id: central.id, destination_location_id: site.id, reason: 'Retry check', lines: [{ material_id: cement.id, requested_qty: 5 }],
    });
    const id = created.body.data.id;
    const lineId = created.body.data.lines[0].id;
    await request(app).put(`${TRF}/${id}/submit`).set('Authorization', tok(storekeeper));
    // Approval by a different user (segregation of duties): the requester cannot approve their own request.
    await request(app).put(`${TRF}/${id}/approve`).set('Authorization', tok(approver)).send({ lines: [{ line_id: lineId, approved_qty: 5 }] });
    const out = await request(app).post(`${TRF}/${id}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: KEY('rv-out'), lines: [{ line_id: lineId, quantity: 5 }] });
    expect(out.status).toBe(200);
    const key = KEY('rv');
    const first = await request(app).post(`${TRF}/${id}/reverse`).set('Authorization', tok(storekeeper)).send({ line_id: lineId, quantity: 2, reason: 'Return two', idempotency_key: key });
    expect(first.status).toBe(200);
    const centralBefore = await StockLedgerService.getLocationBalance(companyA.id, projA.id, cement.id, central.id);
    const rowsBefore = await db.stock_ledger.count({ where: { company_id: companyA.id, transfer_id: id } });
    const retry = await request(app).post(`${TRF}/${id}/reverse`).set('Authorization', tok(storekeeper)).send({ line_id: lineId, quantity: 2, reason: 'Return two', idempotency_key: key });
    expect(retry.status).toBe(200);
    expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, cement.id, central.id)).toBe(centralBefore);
    expect(await db.stock_ledger.count({ where: { company_id: companyA.id, transfer_id: id } })).toBe(rowsBefore);
  });
});
