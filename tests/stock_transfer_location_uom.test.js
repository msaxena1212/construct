'use strict';
/**
 * In-transit location, quarantine isolation, reconciliation by location type, reversal limits,
 * and unit-of-measure / quantity precision policy. SQLite isolated test database only.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const StockLedgerService = require('../src/core/services/stock_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const KEY = (s) => `loc-key-${s}-${Math.random().toString(36).slice(2, 10)}`;
const B = '/api/v1/stock-transfers';

describe('Stock transfer — in-transit location, quarantine isolation, UOM policy', () => {
  let company, project, requester, approver, storekeeper, central, site, quarantine;
  let bags, kg, cement;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'stock-transfer', path: 'stock-transfer', title: 'Stock Transfer' });
    company = await db.company.create({ name: 'Loc Co', email: 'loc@co.test' });
    const role = await db.role.create({ name: 'LocRole', type: 'custom', company_id: company.id });
    await db.role_permission.create({ role_id: role.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    requester = await db.user.create({ firstname: 'R', lastname: 'Q', email: 'r@loc.test', company_id: company.id, role_id: role.id });
    approver = await db.user.create({ firstname: 'A', lastname: 'P', email: 'a@loc.test', company_id: company.id, role_id: role.id });
    storekeeper = await db.user.create({ firstname: 'S', lastname: 'K', email: 's@loc.test', company_id: company.id, role_id: role.id });
    project = await db.project.create({ name: 'Loc Tower', type: 'commercial', company_id: company.id });

    central = await db.store_location.create({ company_id: company.id, project_id: project.id, code: 'C-1', name: 'Central', location_type: 'central_warehouse' });
    site = await db.store_location.create({ company_id: company.id, project_id: project.id, code: 'S-1', name: 'Site', location_type: 'site_store' });
    quarantine = await db.store_location.create({ company_id: company.id, project_id: project.id, code: 'Q-1', name: 'Quarantine', location_type: 'quarantine' });

    // 20 bags of legacy opening stock, not yet placed in any location.
    cement = await db.material_project_stock.create({ name: 'Cement', sku: 'CEM', stockIn: 20, stockUsed: 0, project_id: project.id, company_id: company.id, unit_of_measure: 'bags' });
    kg = await db.material_project_stock.create({ name: 'Rebar', sku: 'RBR', stockIn: 0, stockUsed: 0, project_id: project.id, company_id: company.id, unit_of_measure: 'kg' });
    // Unsupported UOMs cannot be stored on a material (model validation), so they are tested on the transfer line.
    bags = cement;
  });

  const place = (token, material, location, qty) =>
    request(app).post(`${B}/placements`).set('Authorization', token).send({ project_id: project.id, material_id: material.id, location_id: location.id, quantity: qty, idempotency_key: KEY('place'), reason: 'Opening' });

  async function setupApproved(material, qty, lines = null) {
    const created = await request(app).post(B).set('Authorization', tok(requester)).send({
      source_location_id: central.id,
      destination_location_id: site.id,
      reason: 'Loc test',
      lines: lines || [{ material_id: material.id, requested_qty: qty }],
    });
    expect(created.status).toBe(201);
    const id = created.body.data.id;
    await request(app).put(`${B}/${id}/submit`).set('Authorization', tok(requester));
    await request(app).put(`${B}/${id}/approve`).set('Authorization', tok(approver)).send({
      lines: created.body.data.lines.map((l) => ({ line_id: l.id, approved_qty: l.requested_qty })),
    });
    return created.body.data;
  }

  const inTransitLocation = () => db.store_location.findOne({ where: { company_id: company.id, project_id: project.id, location_type: 'in_transit' } });

  describe('in-transit location', () => {
    let t1, t2;

    test('users cannot create an in-transit location', async () => {
      const res = await request(app).post(`${B}/locations`).set('Authorization', tok(storekeeper)).send({ project_id: project.id, code: 'X-1', name: 'Fake', location_type: 'in_transit' });
      expect(res.status).toBe(400);
    });

    test('checkout creates a system in-transit location and moves stock into it in the same transaction', async () => {
      await place(tok(storekeeper), cement, central, 20);
      const t = await setupApproved(cement, 10);
      t1 = t.id;
      const res = await request(app).post(`${B}/${t1}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: KEY('co1'), lines: [{ line_id: t.lines[0].id, quantity: 6 }] });
      expect(res.status).toBe(200);
      const transit = await inTransitLocation();
      expect(transit).not.toBeNull();
      expect(await StockLedgerService.getLocationBalance(company.id, project.id, cement.id, central.id)).toBe(14);
      expect(await StockLedgerService.getLocationBalance(company.id, project.id, cement.id, transit.id)).toBe(6);
      expect(await StockLedgerService.getInTransit(company.id, project.id, cement.id, t1)).toBe(6);
    });

    test('a second transfer keeps its own in-transit quantity separate', async () => {
      const t = await setupApproved(cement, 4);
      t2 = t.id;
      await request(app).post(`${B}/${t2}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: KEY('co2'), lines: [{ line_id: t.lines[0].id, quantity: 4 }] });
      expect(await StockLedgerService.getInTransit(company.id, project.id, cement.id, t1)).toBe(6);
      expect(await StockLedgerService.getInTransit(company.id, project.id, cement.id, t2)).toBe(4);
      expect(await StockLedgerService.getInTransit(company.id, project.id, cement.id)).toBe(10);
    });

    test('partial check-in reduces only the receiving transfer in-transit quantity', async () => {
      const t = await request(app).get(`${B}/${t1}`).set('Authorization', tok(storekeeper));
      const line = t.body.data.lines[0];
      const res = await request(app).post(`${B}/${t1}/checkin`).set('Authorization', tok(storekeeper)).send({
        idempotency_key: KEY('ci1'),
        quarantine_location_id: quarantine.id,
        lines: [{ line_id: line.id, accepted_qty: 3, quarantined_qty: 1 }],
      });
      expect(res.status).toBe(200);
      expect(await StockLedgerService.getInTransit(company.id, project.id, cement.id, t1)).toBe(2);
      expect(await StockLedgerService.getInTransit(company.id, project.id, cement.id, t2)).toBe(4);
      expect(await StockLedgerService.getLocationBalance(company.id, project.id, cement.id, quarantine.id)).toBe(1);
      expect(await StockLedgerService.getLocationBalance(company.id, project.id, cement.id, site.id)).toBe(3);
    });

    test('reconciliation reports source, destination, quarantine and in-transit separately and conserves stock', async () => {
      const rec = await StockLedgerService.getReconciliation(company.id, project.id, cement.id);
      expect(rec.by_location_type).toEqual({ central_warehouse: 10, project_store: 0, site_store: 3, quarantine: 1, in_transit: 6 });
      expect(rec.counter_available).toBe(20);
      expect(rec.location_total).toBe(20);
      expect(rec.unlocated).toBe(0);
      expect(rec.consistent).toBe(true);
    });

    test('in-transit stock cannot be consumed by ordinary issue', async () => {
      await expect(
        StockLedgerService.recordMovement({ company_id: company.id, project_id: project.id, material_id: cement.id, movement_type: 'issue', quantity: 1, idempotency_key: KEY('issue-transit') })
      ).rejects.toMatchObject({ code: 'INSUFFICIENT_STOCK' });
    });

    test('quarantined stock cannot be consumed by ordinary issue or moved as available', async () => {
      await expect(
        StockLedgerService.recordMovement({ company_id: company.id, project_id: project.id, material_id: cement.id, movement_type: 'consumption', quantity: 10, location_id: quarantine.id, idempotency_key: KEY('cons-q') })
      ).rejects.toMatchObject({ code: 'VALIDATION' });
      // Only the 10 unplaced-in-central-or-site units are issuable as legacy stock; placed stock is protected.
      await expect(
        StockLedgerService.recordMovement({ company_id: company.id, project_id: project.id, material_id: cement.id, movement_type: 'issue', quantity: 1, idempotency_key: KEY('issue-q') })
      ).rejects.toMatchObject({ code: 'INSUFFICIENT_STOCK' });
    });

    test('an in-transit location cannot be a transfer endpoint or a placement target', async () => {
      const transit = await inTransitLocation();
      const bad = await request(app).post(B).set('Authorization', tok(requester)).send({
        source_location_id: central.id,
        destination_location_id: transit.id,
        reason: 'Into transit',
        lines: [{ material_id: cement.id, requested_qty: 1 }],
      });
      expect(bad.status).toBe(400);
      const place2 = await place(tok(storekeeper), cement, transit, 1);
      expect(place2.status).toBe(400);
    });

    test('a reversal cannot be applied twice beyond the outstanding quantity', async () => {
      const t = await request(app).get(`${B}/${t2}`).set('Authorization', tok(storekeeper));
      const line = t.body.data.lines[0];
      const first = await request(app).post(`${B}/${t2}/reverse`).set('Authorization', tok(approver)).send({ line_id: line.id, quantity: 4, reason: 'Return', idempotency_key: KEY('rev-a') });
      expect(first.status).toBe(200);
      expect(first.body.data.lines[0].outstanding).toBe(0);
      const again = await request(app).post(`${B}/${t2}/reverse`).set('Authorization', tok(approver)).send({ line_id: line.id, quantity: 4, reason: 'Return again', idempotency_key: KEY('rev-b') });
      // The transfer is completed after the first reversal, so the state rule refuses it. Quantity limits are checked too.
      expect(again.status).toBe(409);
      expect(['STATE', 'CONFLICT']).toContain(again.body.code);
      expect(await StockLedgerService.getInTransit(company.id, project.id, cement.id, t2)).toBe(0);
      const reversalRows = await db.stock_ledger.count({ where: { company_id: company.id, transfer_id: t2, reference_type: 'transfer_reversal', movement_type: 'transfer_in' } });
      expect(reversalRows).toBe(1);
    });

    test('per-line invariant holds: dispatched = outstanding + accepted + quarantined + reversed + written off', async () => {
      const t = await request(app).get(`${B}/${t1}`).set('Authorization', tok(storekeeper));
      for (const l of t.body.data.lines) {
        expect(l.dispatched).toBe(l.outstanding + l.received_accepted + l.received_quarantined + l.reversed + l.shortage);
      }
    });
  });

  describe('unit of measure and quantity precision', () => {
    const create = (token, material, qty, uom) =>
      request(app).post(B).set('Authorization', token).send({
        source_location_id: central.id,
        destination_location_id: site.id,
        reason: 'UOM probe',
        lines: [{ material_id: material.id, requested_qty: qty, unit_of_measure: uom }],
      });

    test('a line must use the material unit; a mismatch is rejected', async () => {
      const res = await create(tok(requester), cement, 1, 'kg');
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('UOM_MISMATCH');
    });

    test('whole-unit materials reject fractional quantities explicitly', async () => {
      const res = await create(tok(requester), cement, 1.5, 'bags');
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('WHOLE_UNIT_REQUIRED');
    });

    test('fractional units are refused explicitly until counters are exact decimals, never truncated', async () => {
      const res = await create(tok(requester), kg, 2, 'kg');
      expect(res.status).toBe(422);
      expect(res.body.code).toBe('PRECISION_UNSUPPORTED');
    });

    test('unsupported units are rejected on the transfer line', async () => {
      const res = await create(tok(requester), cement, 1, 'furlong');
      expect(res.status).toBe(400);
      expect(res.body.code).toBe('VALIDATION');
    });

    test('placement applies the same quantity policy', async () => {
      const frac = await place(tok(storekeeper), cement, central, 1.5);
      expect(frac.status).toBe(400);
      expect(frac.body.code).toBe('WHOLE_UNIT_REQUIRED');
      const kgPlace = await place(tok(storekeeper), kg, central, 1);
      expect(kgPlace.status).toBe(422);
      expect(kgPlace.body.code).toBe('PRECISION_UNSUPPORTED');
    });

    test('legacy projects with no UOM set default to whole units', async () => {
      const legacy = await db.material_project_stock.create({ name: 'Legacy', sku: 'LEG', stockIn: 0, stockUsed: 0, project_id: project.id, company_id: company.id });
      const res = await create(tok(requester), legacy, 2, undefined);
      expect(res.status).toBe(201);
      expect(res.body.data.lines[0].unit_of_measure).toBe('units');
    });
  });
});
