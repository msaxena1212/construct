'use strict';
const db = require('../../../models');
const StockLedgerService = require('../../../core/services/stock_ledger.service');
const { uomRule, normalizeUom } = require('../../../core/utils/uom');

const { StockError } = StockLedgerService;
const fail = (code, message) => new StockError(code, message);

const toId = (v, label) => {
  const n = Number(v);
  if (!Number.isSafeInteger(n) || n <= 0) throw fail('VALIDATION', `${label} must be a positive integer.`);
  return n;
};
const text = (v, label, max = 500) => {
  const s = typeof v === 'string' ? v.trim() : '';
  if (!s) throw fail('VALIDATION', `${label} is required.`);
  return s.slice(0, max);
};
const key = (v, scope) => {
  if (typeof v !== 'string' || v.trim().length < 8 || v.trim().length > 120) {
    throw fail('VALIDATION', 'idempotency_key (8–120 characters) is required.');
  }
  return `${scope}:${v.trim()}`;
};

/** Integer-only policy: fractional quantities are refused, never rounded or truncated. */
function wholeQuantity(material, raw) {
  const uom = normalizeUom(material.unit_of_measure);
  const rule = uomRule(uom);
  if (!rule) throw fail('VALIDATION', `Unsupported unit of measure: ${uom}.`);
  const n = Number(raw);
  if (!Number.isInteger(n)) throw fail('WHOLE_UNIT_REQUIRED', `Quantity must be a whole number of ${uom}; fractions are not accepted.`);
  if (rule.fractional) throw fail('PRECISION_UNSUPPORTED', `Fractional ${uom} movements are not supported until stock counters use exact decimals.`);
  if (n <= 0 || n > 1000000) throw fail('VALIDATION', 'Quantity must be a positive whole number.');
  return n;
}

async function loadScopedMaterial(company_id, project_id, material_id) {
  const material = await db.material_project_stock.findOne({ where: { id: material_id, company_id, project_id } });
  if (!material) throw fail('NOT_FOUND', 'Material not found in this project.');
  return material;
}

async function loadActiveLocation(company_id, project_id, location_id) {
  const location = await db.store_location.findOne({ where: { id: location_id, company_id, project_id } });
  if (!location) throw fail('NOT_FOUND', 'Location not found in this project.');
  if (location.status !== 'active') throw fail('STATE', 'Location is not active.');
  if (location.location_type === 'in_transit') {
    throw fail('VALIDATION', 'The in-transit location is system-managed. Use the stock transfer workflow.');
  }
  return location;
}

const InventoryService = {
  /** Project inventory: each material with its canonical UOM, per-location balances and reconciliation. */
  async balances(company_id, project_id) {
    const pid = toId(project_id, 'project_id');
    const materials = await db.material_project_stock.findAll({
      where: { company_id, project_id: pid, isDeleted: false },
      order: [['name', 'ASC']],
    });
    const locations = await db.store_location.findAll({ where: { company_id, project_id: pid }, order: [['location_type', 'ASC'], ['code', 'ASC']] });
    const out = [];
    for (const m of materials) {
      const rec = await StockLedgerService.getReconciliation(company_id, pid, m.id);
      const perLocation = [];
      for (const loc of locations) {
        const balance = await StockLedgerService.getLocationBalance(company_id, pid, m.id, loc.id);
        perLocation.push({ location_id: loc.id, code: loc.code, name: loc.name, location_type: loc.location_type, balance });
      }
      out.push({
        material_id: m.id,
        name: m.name,
        sku: m.sku,
        unit_of_measure: normalizeUom(m.unit_of_measure),
        counter_available: rec.counter_available,
        unplaced: rec.unlocated,
        in_transit: rec.in_transit,
        quarantined: rec.by_location_type.quarantine,
        locations: perLocation,
        reconciliation: rec,
      });
    }
    return { project_id: pid, materials: out, locations: locations.map((l) => ({ id: l.id, code: l.code, name: l.name, location_type: l.location_type, status: l.status })) };
  },

  /**
   * Stock in: goods receipt into a location. The reference (PO/GRN or authorized opening-stock note) is required.
   * Duplicate submissions with the same key post nothing further.
   */
  async receive(company_id, actor, body) {
    const project_id = toId(body.project_id, 'project_id');
    const material_id = toId(body.material_id, 'material_id');
    const location_id = toId(body.location_id, 'location_id');
    const reference = text(body.reference, 'reference (PO/GRN or authorization)', 200);
    const idem = key(body.idempotency_key, `RCPT:${company_id}`);
    const material = await loadScopedMaterial(company_id, project_id, material_id);
    const quantity = wholeQuantity(material, body.quantity);
    await loadActiveLocation(company_id, project_id, location_id);
    const result = await db.sequelize.transaction((t) =>
      StockLedgerService.recordMovement({
        company_id,
        project_id,
        material_id,
        movement_type: 'receipt',
        quantity,
        unit_of_measure: material.unit_of_measure,
        location_id,
        reference_type: 'goods_receipt',
        reference_id: reference,
        idempotency_key: idem,
        reason: `Receipt against ${reference}`,
        performed_by: actor.id,
        transaction: t,
      })
    );
    return { already_processed: result.already_processed, entry: result.entry };
  },

  /**
   * Stock out: issue from a location against a project activity. Requires the requesting person and the
   * activity/work reference. Only the location's own balance is consumed; in-transit and quarantine are never used.
   */
  async issue(company_id, actor, body) {
    const project_id = toId(body.project_id, 'project_id');
    const material_id = toId(body.material_id, 'material_id');
    const location_id = toId(body.location_id, 'location_id');
    const activity = text(body.activity, 'activity / work reference', 200);
    const requested_by = text(body.requested_by, 'requested by', 120);
    const idem = key(body.idempotency_key, `ISSUE:${company_id}`);
    const material = await loadScopedMaterial(company_id, project_id, material_id);
    const quantity = wholeQuantity(material, body.quantity);
    const source = await loadActiveLocation(company_id, project_id, location_id);
    if (source.location_type === 'quarantine') {
      throw fail('VALIDATION', 'Quarantined stock cannot be issued. Return it or write it off through an authorized process.');
    }
    const result = await db.sequelize.transaction((t) =>
      StockLedgerService.recordMovement({
        company_id,
        project_id,
        material_id,
        movement_type: 'location_issue',
        quantity,
        unit_of_measure: material.unit_of_measure,
        location_id,
        reference_type: 'material_issue',
        reference_id: activity,
        idempotency_key: idem,
        reason: `Issued to ${activity}; requested by ${requested_by}`,
        performed_by: actor.id,
        transaction: t,
      })
    );
    return { already_processed: result.already_processed, entry: result.entry };
  },

  /** Ledger history for a project, optionally filtered to one material. */
  async movements(company_id, project_id, material_id, limit = 50) {
    const pid = toId(project_id, 'project_id');
    const where = { company_id, project_id: pid };
    if (material_id) where.material_id = toId(material_id, 'material_id');
    const rows = await db.stock_ledger.findAll({
      where,
      order: [['id', 'DESC']],
      limit: Math.min(Math.max(Number(limit) || 50, 1), 200),
      raw: true,
    });
    const names = new Map((await db.material_project_stock.findAll({ where: { company_id, project_id: pid }, attributes: ['id', 'name', 'sku'], raw: true })).map((m) => [Number(m.id), m]));
    const locs = new Map((await db.store_location.findAll({ where: { company_id, project_id: pid }, attributes: ['id', 'code', 'name'], raw: true })).map((l) => [Number(l.id), l]));
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      movement_type: r.movement_type,
      quantity: r.quantity,
      unit_of_measure: r.unit_of_measure,
      material: names.get(Number(r.material_id)) || null,
      location: r.location_id ? locs.get(Number(r.location_id)) || null : null,
      transfer_id: r.transfer_id,
      transfer_line_id: r.transfer_line_id,
      reference_type: r.reference_type,
      reference_id: r.reference_id,
      reason: r.reason,
      performed_by: r.performed_by,
    }));
  },
};

module.exports = InventoryService;
