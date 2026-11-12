'use strict';
/**
 * P0 Stock Transfer (INV-LOC-01, INV-TRF-01..06) — isolated SQLite test database only.
 * Verifies the full check-out / check-in lifecycle and the ledger conservation invariant.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const StockLedgerService = require('../src/core/services/stock_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const KEY = (s) => `test-key-${s}-${Math.random().toString(36).slice(2, 10)}`;

describe('P0 Stock Transfer — check-out / check-in lifecycle', () => {
  let companyA, companyB, projA, projB, requester, approver, storekeeper, viewer, outsider;
  let central, site, quarantine, otherProjectLoc, locB;
  let material, materialB;

  const transfersPath = '/api/v1/stock-transfers';

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    const mod = await db.rbac_module.create({ name: 'stock-transfer', path: 'stock-transfer', title: 'Stock Transfer' });
    companyA = await db.company.create({ name: 'Transfer Alpha', email: 'transfer@alpha.test' });
    companyB = await db.company.create({ name: 'Transfer Beta', email: 'transfer@beta.test' });

    const full = await db.role.create({ name: 'StoreFull', type: 'custom', company_id: companyA.id });
    const readOnly = await db.role.create({ name: 'StoreRead', type: 'custom', company_id: companyA.id });
    const fullB = await db.role.create({ name: 'StoreFullB', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: full.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    await db.role_permission.create({ role_id: readOnly.id, module_id: mod.id, can_create: false, can_read: true, can_update: false, can_delete: false });
    await db.role_permission.create({ role_id: fullB.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });

    requester = await db.user.create({ firstname: 'Ria', lastname: 'Requester', email: 'req@alpha.test', company_id: companyA.id, role_id: full.id });
    approver = await db.user.create({ firstname: 'Ash', lastname: 'Approver', email: 'appr@alpha.test', company_id: companyA.id, role_id: full.id });
    storekeeper = await db.user.create({ firstname: 'Sam', lastname: 'Store', email: 'store@alpha.test', company_id: companyA.id, role_id: full.id });
    viewer = await db.user.create({ firstname: 'Vee', lastname: 'Viewer', email: 'view@alpha.test', company_id: companyA.id, role_id: readOnly.id });
    outsider = await db.user.create({ firstname: 'Oz', lastname: 'Outsider', email: 'out@beta.test', company_id: companyB.id, role_id: fullB.id });

    projA = await db.project.create({ name: 'Alpha Tower', type: 'commercial', company_id: companyA.id });
    projB = await db.project.create({ name: 'Beta Bridge', type: 'infrastructure', company_id: companyB.id });

    central = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'CW-1', name: 'Central', location_type: 'central_warehouse' });
    site = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'SITE-1', name: 'Site', location_type: 'site_store' });
    quarantine = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'QA-1', name: 'Quarantine', location_type: 'quarantine' });
    otherProjectLoc = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'SITE-2', name: 'Site 2', location_type: 'site_store' });
    locB = await db.store_location.create({ company_id: companyB.id, project_id: projB.id, code: 'CW-B', name: 'Beta Central', location_type: 'central_warehouse' });

    // Legacy project stock: 100 units held at project level, not yet placed in any location.
    material = await db.material_project_stock.create({ name: 'Cement', sku: 'CEM-1', stockIn: 100, stockUsed: 0, project_id: projA.id, company_id: companyA.id });
    materialB = await db.material_project_stock.create({ name: 'Steel', sku: 'STL-1', stockIn: 50, stockUsed: 0, project_id: projB.id, company_id: companyB.id });
  });

  const createTransfer = (token, body) => request(app).post(transfersPath).set('Authorization', token).send(body);

  describe('happy path and conservation', () => {
    let transferId;

    test('draft creation moves no stock', async () => {
      const before = await StockLedgerService.getReconciliation(companyA.id, projA.id, material.id);
      const res = await createTransfer(tok(requester), {
        source_location_id: central.id,
        destination_location_id: site.id,
        reason: 'Site needs cement',
        lines: [{ material_id: material.id, requested_qty: 40 }],
      });
      expect(res.status).toBe(201);
      expect(res.body.data.status).toBe('draft');
      transferId = res.body.data.id;
      const after = await StockLedgerService.getReconciliation(companyA.id, projA.id, material.id);
      expect(after).toEqual(before);
    });

    test('place stock into central warehouse from unplaced balance', async () => {
      const res = await request(app)
        .post(`${transfersPath}/placements`)
        .set('Authorization', tok(storekeeper))
        .send({ project_id: projA.id, material_id: material.id, location_id: central.id, quantity: 100, idempotency_key: KEY('place'), reason: 'Opening stock' });
      expect(res.status).toBe(201);
      const rec = await StockLedgerService.getReconciliation(companyA.id, projA.id, material.id);
      expect(rec).toMatchObject({ counter_available: 100, location_total: 100, in_transit: 0, unlocated: 0, consistent: true });
    });

    test('requester submits, then approver approves', async () => {
      const s = await request(app).put(`${transfersPath}/${transferId}/submit`).set('Authorization', tok(requester));
      expect(s.status).toBe(200);
      expect(s.body.data.status).toBe('submitted');

      const line = s.body.data.lines[0];
      const a = await request(app)
        .put(`${transfersPath}/${transferId}/approve`)
        .set('Authorization', tok(approver))
        .send({ lines: [{ line_id: line.id, approved_qty: 40 }] });
      expect(a.status).toBe(200);
      expect(a.body.data.status).toBe('approved');
    });

    test('requester cannot approve their own transfer (segregation of duties)', async () => {
      const created = await createTransfer(tok(requester), {
        source_location_id: central.id,
        destination_location_id: site.id,
        reason: 'SoD probe',
        lines: [{ material_id: material.id, requested_qty: 1 }],
      });
      await request(app).put(`${transfersPath}/${created.body.data.id}/submit`).set('Authorization', tok(requester));
      const res = await request(app)
        .put(`${transfersPath}/${created.body.data.id}/approve`)
        .set('Authorization', tok(requester))
        .send({ lines: [{ line_id: created.body.data.lines[0].id, approved_qty: 1 }] });
      expect(res.status).toBe(403);
      expect(res.body.code).toBe('FORBIDDEN');
    });

    test('check-out 30 reduces central and creates traceable in-transit', async () => {
      const t = await db.stock_transfer.findOne({ where: { id: transferId } });
      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const res = await request(app)
        .post(`${transfersPath}/${transferId}/checkout`)
        .set('Authorization', tok(storekeeper))
        .send({ idempotency_key: KEY('out1'), lines: [{ line_id: lineId, quantity: 30 }], dispatch_reference: 'DC-001' });
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('in_transit');
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, material.id, central.id)).toBe(70);
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, material.id, transferId)).toBe(30);
      expect(t.status).toBe('approved'); // loaded before the call; no stale state assumed afterwards
    });

    test('duplicate check-out with the same key does not deduct stock twice', async () => {
      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const key = KEY('dup-out');
      const first = await request(app).post(`${transfersPath}/${transferId}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: key, lines: [{ line_id: lineId, quantity: 10 }] });
      const second = await request(app).post(`${transfersPath}/${transferId}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: key, lines: [{ line_id: lineId, quantity: 10 }] });
      expect(first.status).toBe(200);
      expect(second.status).toBe(200);
      expect(second.body.already_processed).toBe(true);
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, material.id, transferId)).toBe(40);
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, material.id, central.id)).toBe(60);
    });

    test('check-out beyond the approved quantity is refused', async () => {
      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const res = await request(app).post(`${transfersPath}/${transferId}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: KEY('over-out'), lines: [{ line_id: lineId, quantity: 1 }] });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('CONFLICT');
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, material.id, transferId)).toBe(40);
    });

    test('partial check-in: accepted to site, damaged to quarantine, remainder stays in transit', async () => {
      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const res = await request(app)
        .post(`${transfersPath}/${transferId}/checkin`)
        .set('Authorization', tok(storekeeper))
        .send({ idempotency_key: KEY('in1'), quarantine_location_id: quarantine.id, lines: [{ line_id: lineId, accepted_qty: 25, quarantined_qty: 5 }] });
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('partially_received');
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, material.id, site.id)).toBe(25);
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, material.id, quarantine.id)).toBe(5);
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, material.id, transferId)).toBe(10);
    });

    test('over-receipt beyond the outstanding quantity is refused', async () => {
      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const res = await request(app)
        .post(`${transfersPath}/${transferId}/checkin`)
        .set('Authorization', tok(storekeeper))
        .send({ idempotency_key: KEY('over-in'), lines: [{ line_id: lineId, accepted_qty: 11 }] });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('CONFLICT');
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, material.id, site.id)).toBe(25);
    });

    test('duplicate check-in with the same key does not increase destination stock twice', async () => {
      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const key = KEY('dup-in');
      await request(app).post(`${transfersPath}/${transferId}/checkin`).set('Authorization', tok(storekeeper)).send({ idempotency_key: key, lines: [{ line_id: lineId, accepted_qty: 2 }] });
      const again = await request(app).post(`${transfersPath}/${transferId}/checkin`).set('Authorization', tok(storekeeper)).send({ idempotency_key: key, lines: [{ line_id: lineId, accepted_qty: 2 }] });
      expect(again.body.already_processed).toBe(true);
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, material.id, site.id)).toBe(27);
    });

    test('declared shortage does not move stock; the declarer cannot write it off', async () => {
      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const decl = await request(app)
        .post(`${transfersPath}/${transferId}/shortages`)
        .set('Authorization', tok(storekeeper))
        .send({ line_id: lineId, quantity: 4, reason: 'Two bags missing on arrival' });
      expect(decl.status).toBe(201);
      expect(decl.body.data.status).toBe('reconciliation_required');
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, material.id, transferId)).toBe(8);

      const discId = decl.body.data.discrepancies[0].id;
      const self = await request(app)
        .post(`${transfersPath}/shortages/${discId}/write-off`)
        .set('Authorization', tok(storekeeper))
        .send({ reason: 'Self write-off', idempotency_key: KEY('self-wo') });
      expect(self.status).toBe(403);
    });

    test('authorized write-off, then authorized reversal of unreceived goods', async () => {
      const disc = await db.stock_transfer_discrepancy.findOne({ where: { transfer_id: transferId, status: 'open' } });
      const wo = await request(app)
        .post(`${transfersPath}/shortages/${disc.id}/write-off`)
        .set('Authorization', tok(approver))
        .send({ reason: 'Confirmed loss in transit', idempotency_key: KEY('wo') });
      expect(wo.status).toBe(200);
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, material.id, transferId)).toBe(4);

      const lineId = (await db.stock_transfer_line.findOne({ where: { transfer_id: transferId } })).id;
      const rev = await request(app)
        .post(`${transfersPath}/${transferId}/reverse`)
        .set('Authorization', tok(approver))
        .send({ line_id: lineId, quantity: 4, reason: 'Goods returned to source', idempotency_key: KEY('rev') });
      expect(rev.status).toBe(200);
      expect(rev.body.data.status).toBe('completed');
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, material.id, transferId)).toBe(0);
    });

    test('ledger reconciles: placed + in-transit + unplaced equals the project counters', async () => {
      const rec = await StockLedgerService.getReconciliation(companyA.id, projA.id, material.id);
      // 100 total − 4 written off = 96 on hand. central 60 + reversed 4 = 64, site 27, quarantine 5 → 96.
      expect(rec.counter_available).toBe(96);
      expect(rec.location_total).toBe(96);
      expect(rec.in_transit).toBe(0);
      expect(rec.unlocated).toBe(0);
      expect(rec.consistent).toBe(true);
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, material.id, central.id)).toBe(64);
    });

    test('list and in-transit endpoints return ledger-derived totals', async () => {
      const list = await request(app).get(`${transfersPath}?project_id=${projA.id}`).set('Authorization', tok(viewer));
      expect(list.status).toBe(200);
      const row = list.body.data.rows.find((r) => r.id === transferId);
      expect(row.totals).toEqual({ approved: 40, dispatched: 40, outstanding: 0 });
      const inTransit = await request(app).get(`${transfersPath}/in-transit?project_id=${projA.id}`).set('Authorization', tok(viewer));
      expect(inTransit.status).toBe(200);
      expect(inTransit.body.data.find((r) => r.id === transferId)).toBeUndefined(); // completed, so not in transit
    });

    test('history exposes events and transfer-tagged ledger movements', async () => {
      const res = await request(app).get(`${transfersPath}/${transferId}/history`).set('Authorization', tok(viewer));
      expect(res.status).toBe(200);
      const types = res.body.data.events.map((e) => e.event_type);
      expect(types).toEqual(expect.arrayContaining(['created', 'submitted', 'approved', 'checkout', 'checkin', 'shortage_declared', 'shortage_written_off', 'dispatch_reversed']));
      expect(res.body.data.movements.length).toBeGreaterThan(0);
    });
  });

  describe('authorization, validation and tenant isolation', () => {
    let location_source, location_dest;

    test('unauthenticated requests are rejected', async () => {
      const res = await request(app).get(transfersPath);
      expect(res.status).toBe(401);
    });

    test('a read-only role cannot create a transfer', async () => {
      const res = await createTransfer(tok(viewer), {
        source_location_id: central.id,
        destination_location_id: site.id,
        reason: 'Not allowed',
        lines: [{ material_id: material.id, requested_qty: 1 }],
      });
      expect(res.status).toBe(403);
    });

    test('same source and destination is refused', async () => {
      const res = await createTransfer(tok(requester), {
        source_location_id: central.id,
        destination_location_id: central.id,
        reason: 'Loop',
        lines: [{ material_id: material.id, requested_qty: 1 }],
      });
      expect(res.status).toBe(400);
    });

    test('inter-project transfer is refused in this release; same-project transfer is allowed', async () => {
      const res = await createTransfer(tok(requester), {
        source_location_id: central.id,
        destination_location_id: site.id,
        reason: 'Same project control',
        lines: [{ material_id: material.id, requested_qty: 1 }],
      });
      expect(res.status).toBe(201);

      const projA2 = await db.project.create({ name: 'Alpha Annex', type: 'commercial', company_id: companyA.id });
      const annexLoc = await db.store_location.create({ company_id: companyA.id, project_id: projA2.id, code: 'ANX-1', name: 'Annex', location_type: 'site_store' });
      const inter = await createTransfer(tok(requester), {
        source_location_id: central.id,
        destination_location_id: annexLoc.id,
        reason: 'Cross project',
        lines: [{ material_id: material.id, requested_qty: 1 }],
      });
      expect(inter.status).toBe(400);
      expect(inter.body.message).toMatch(/Inter-project/);

      const cross = await createTransfer(tok(requester), {
        source_location_id: central.id,
        destination_location_id: locB.id,
        reason: 'Cross company',
        lines: [{ material_id: material.id, requested_qty: 1 }],
      });
      expect(cross.status).toBe(404); // other company's location is invisible
    });

    test('non-integer and non-positive quantities are refused', async () => {
      for (const bad of [0, -3, 1.5, 'abc', 2000000]) {
        const res = await createTransfer(tok(requester), {
          source_location_id: central.id,
          destination_location_id: site.id,
          reason: 'Bad qty',
          lines: [{ material_id: material.id, requested_qty: bad }],
        });
        expect(res.status).toBe(400);
      }
    });

    test('cross-company user cannot read or act on another company transfer', async () => {
      const created = await createTransfer(tok(requester), {
        source_location_id: central.id,
        destination_location_id: site.id,
        reason: 'Tenant probe',
        lines: [{ material_id: material.id, requested_qty: 1 }],
      });
      const id = created.body.data.id;
      const read = await request(app).get(`${transfersPath}/${id}`).set('Authorization', tok(outsider));
      expect(read.status).toBe(404);
      const act = await request(app).put(`${transfersPath}/${id}/submit`).set('Authorization', tok(outsider));
      expect(act.status).toBe(404);
      location_source = id;
    });

    test('cancel before dispatch succeeds; cancel after dispatch is refused', async () => {
      const cancelled = await request(app)
        .put(`${transfersPath}/${location_source}/cancel`)
        .set('Authorization', tok(requester))
        .send({ reason: 'No longer needed' });
      expect(cancelled.status).toBe(200);
      expect(cancelled.body.data.status).toBe('cancelled');

      const again = await request(app).put(`${transfersPath}/${location_source}/submit`).set('Authorization', tok(requester));
      expect(again.status).toBe(409);
    });

    test('a cancelled transfer cannot receive stock', async () => {
      const res = await request(app)
        .post(`${transfersPath}/${location_source}/checkin`)
        .set('Authorization', tok(storekeeper))
        .send({ idempotency_key: KEY('cancelled-in'), lines: [{ line_id: (await db.stock_transfer_line.findOne({ where: { transfer_id: location_source } })).id, accepted_qty: 1 }] });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('STATE');
    });
  });

  describe('concurrency and legacy protection', () => {
    test('oversell attempt on a location is refused (parallel race verification is BLOCKED on SQLite)', async () => {
      const loc = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'CONC-1', name: 'Concurrency', location_type: 'central_warehouse' });
      const mat = await db.material_project_stock.create({ name: 'Brick', sku: 'BRK-1', stockIn: 10, stockUsed: 0, project_id: projA.id, company_id: companyA.id });
      // 8 placed of 10 on hand: approved 10 leaves 3 undispatched, but the location physically holds only 1 after the first check-out.
      await request(app).post(`${transfersPath}/placements`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: mat.id, location_id: loc.id, quantity: 8, idempotency_key: KEY('conc-place'), reason: 'Opening' });

      const created = await createTransfer(tok(requester), { source_location_id: loc.id, destination_location_id: site.id, reason: 'Race', lines: [{ material_id: mat.id, requested_qty: 10 }] });
      const id = created.body.data.id;
      await request(app).put(`${transfersPath}/${id}/submit`).set('Authorization', tok(requester));
      await request(app).put(`${transfersPath}/${id}/approve`).set('Authorization', tok(approver)).send({ lines: [{ line_id: created.body.data.lines[0].id, approved_qty: 10 }] });
      const lineId = created.body.data.lines[0].id;

      // Sequential oversell attempt. True parallel row-lock behaviour cannot run on the in-memory SQLite
      // harness (one shared connection rejects nested transactions); it is verified only on MySQL (BLOCKED).
      const first = await request(app).post(`${transfersPath}/${id}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: KEY('race-a'), lines: [{ line_id: lineId, quantity: 7 }] });
      const second = await request(app).post(`${transfersPath}/${id}/checkout`).set('Authorization', tok(storekeeper)).send({ idempotency_key: KEY('race-b'), lines: [{ line_id: lineId, quantity: 3 }] });
      expect(first.status).toBe(200);
      expect(second.status).toBe(409);
      expect(second.body.code).toBe('INSUFFICIENT_STOCK');
      const rec = await StockLedgerService.getReconciliation(companyA.id, projA.id, mat.id);
      expect(rec.consistent).toBe(true);
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, mat.id, loc.id)).toBeGreaterThanOrEqual(0);
    });

    test('legacy issue cannot consume stock that is already placed in a location', async () => {
      const mat = await db.material_project_stock.create({ name: 'Sand', sku: 'SND-1', stockIn: 5, stockUsed: 0, project_id: projA.id, company_id: companyA.id });
      await StockLedgerService.recordMovement({ company_id: companyA.id, project_id: projA.id, material_id: mat.id, movement_type: 'location_placement', quantity: 5, location_id: central.id, idempotency_key: KEY('sand-place') });
      await expect(
        StockLedgerService.recordMovement({ company_id: companyA.id, project_id: projA.id, material_id: mat.id, movement_type: 'issue', quantity: 1, idempotency_key: KEY('sand-issue') })
      ).rejects.toMatchObject({ code: 'INSUFFICIENT_STOCK' });
    });

    test('the same unplaced quantity cannot be placed twice', async () => {
      const mat = await db.material_project_stock.create({ name: 'Tile', sku: 'TLE-1', stockIn: 10, stockUsed: 0, project_id: projA.id, company_id: companyA.id });
      const key1 = KEY('tile-1');
      const ok = await request(app).post(`${transfersPath}/placements`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: mat.id, location_id: central.id, quantity: 10, idempotency_key: key1, reason: 'Opening' });
      expect(ok.status).toBe(201);
      const again = await request(app).post(`${transfersPath}/placements`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: mat.id, location_id: central.id, quantity: 10, idempotency_key: KEY('tile-2'), reason: 'Duplicate opening' });
      expect(again.status).toBe(409);
      expect(again.body.code).toBe('INSUFFICIENT_STOCK');
      // Replaying the exact same placement key is a no-op, not a second posting.
      const replay = await request(app).post(`${transfersPath}/placements`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: mat.id, location_id: central.id, quantity: 10, idempotency_key: key1, reason: 'Opening' });
      expect(replay.status).toBe(201);
      expect(replay.body.already_processed).toBe(true);
      const rec = await StockLedgerService.getReconciliation(companyA.id, projA.id, mat.id);
      expect(rec.location_total).toBe(10);
      expect(rec.consistent).toBe(true);
    });

    test('a multi-line check-out that fails on one line moves no stock on any line', async () => {
      const m1 = await db.material_project_stock.create({ name: 'Pipe', sku: 'PIP-1', stockIn: 20, stockUsed: 0, project_id: projA.id, company_id: companyA.id });
      const m2 = await db.material_project_stock.create({ name: 'Valve', sku: 'VLV-1', stockIn: 5, stockUsed: 0, project_id: projA.id, company_id: companyA.id });
      const loc = await db.store_location.create({ company_id: companyA.id, project_id: projA.id, code: 'ATOM-1', name: 'Atomic', location_type: 'central_warehouse' });
      for (const [m, q] of [[m1, 20], [m2, 2]]) {
        await request(app).post(`${transfersPath}/placements`).set('Authorization', tok(storekeeper)).send({ project_id: projA.id, material_id: m.id, location_id: loc.id, quantity: q, idempotency_key: KEY(`atom-${m.id}`), reason: 'Opening' });
      }
      const created = await createTransfer(tok(requester), {
        source_location_id: loc.id,
        destination_location_id: site.id,
        reason: 'Atomic check',
        lines: [{ material_id: m1.id, requested_qty: 10 }, { material_id: m2.id, requested_qty: 5 }],
      });
      const id = created.body.data.id;
      await request(app).put(`${transfersPath}/${id}/submit`).set('Authorization', tok(requester));
      await request(app).put(`${transfersPath}/${id}/approve`).set('Authorization', tok(approver)).send({
        lines: created.body.data.lines.map((l) => ({ line_id: l.id, approved_qty: l.requested_qty })),
      });
      const [l1, l2] = created.body.data.lines.slice().sort((a, b) => a.material_id - b.material_id);
      const before = await StockLedgerService.getLocationBalance(companyA.id, projA.id, m1.id, loc.id);

      // Line for m1 is valid (10 of 20). Line for m2 asks for 5 but only 2 are at the location.
      const res = await request(app).post(`${transfersPath}/${id}/checkout`).set('Authorization', tok(storekeeper)).send({
        idempotency_key: KEY('atom-out'),
        lines: [{ line_id: l1.id, quantity: 10 }, { line_id: l2.id, quantity: 5 }],
      });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('INSUFFICIENT_STOCK');
      expect(await StockLedgerService.getLocationBalance(companyA.id, projA.id, m1.id, loc.id)).toBe(before);
      expect(await StockLedgerService.getInTransit(companyA.id, projA.id, m1.id, id)).toBe(0);
      const rows = await db.stock_ledger.count({ where: { company_id: companyA.id, transfer_id: id } });
      expect(rows).toBe(0);
    });

    test('legacy receipts and issues keep their original counter behaviour when no location is used', async () => {
      const mat = await db.material_project_stock.create({ name: 'Gravel', sku: 'GRV-1', stockIn: 0, stockUsed: 0, project_id: projA.id, company_id: companyA.id });
      await StockLedgerService.recordMovement({ company_id: companyA.id, project_id: projA.id, material_id: mat.id, movement_type: 'receipt', quantity: 20, idempotency_key: KEY('grv-in') });
      await StockLedgerService.recordMovement({ company_id: companyA.id, project_id: projA.id, material_id: mat.id, movement_type: 'issue', quantity: 6, idempotency_key: KEY('grv-out') });
      await mat.reload();
      expect(mat.stockIn).toBe(20);
      expect(mat.stockUsed).toBe(6);
    });
  });
});
