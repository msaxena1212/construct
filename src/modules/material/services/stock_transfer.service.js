'use strict';
const crypto = require('crypto');
const { Op } = require('sequelize');
const db = require('../../../models');
const StockLedgerService = require('../../../core/services/stock_ledger.service');
const { uomRule, normalizeUom } = require('../../../core/utils/uom');

const { StockError } = StockLedgerService;
const fail = (code, message) => new StockError(code, message);

const CHECKOUT_STATES = ['approved', 'in_transit', 'partially_received'];
const CHECKIN_STATES = ['in_transit', 'partially_received', 'reconciliation_required'];
const CANCELLABLE_STATES = ['draft', 'submitted', 'approved'];
const LOCATION_TYPES = ['central_warehouse', 'project_store', 'site_store', 'quarantine'];
const MAX_LINES = 50;
const MAX_QTY = 1000000;

// ── validation helpers ────────────────────────────────────────────────────────

const toId = (v, label) => {
  const n = Number(v);
  if (!Number.isSafeInteger(n) || n <= 0) throw fail('VALIDATION', `${label} must be a positive integer.`);
  return n;
};
const wholeQty = (v, label, { allowZero = false } = {}) => {
  const n = Number(v);
  const min = allowZero ? 0 : 1;
  if (!Number.isSafeInteger(n) || n < min || n > MAX_QTY) {
    throw fail('VALIDATION', `${label} must be a ${allowZero ? 'non-negative' : 'positive'} whole number.`);
  }
  return n;
};
const idempotencyKey = (v) => {
  if (typeof v !== 'string' || v.trim().length < 8 || v.trim().length > 120) {
    throw fail('VALIDATION', 'idempotency_key (8–120 characters) is required.');
  }
  return v.trim();
};
const requireText = (v, label, max = 500) => {
  const s = typeof v === 'string' ? v.trim() : '';
  if (!s) throw fail('VALIDATION', `${label} is required.`);
  return s.slice(0, max);
};
const listOf = (v, label) => {
  if (!Array.isArray(v) || v.length === 0 || v.length > MAX_LINES) {
    throw fail('VALIDATION', `${label} must contain between 1 and ${MAX_LINES} entries.`);
  }
  return v;
};

// ── transaction helpers ───────────────────────────────────────────────────────

async function lockTransfer(t, company_id, id) {
  const transfer = await db.stock_transfer.findOne({
    where: { id, company_id },
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  if (!transfer) throw fail('NOT_FOUND', 'Transfer not found.');
  return transfer;
}

async function transferLines(t, transfer) {
  return db.stock_transfer_line.findAll({
    where: { transfer_id: transfer.id, company_id: transfer.company_id },
    order: [['material_id', 'ASC'], ['id', 'ASC']],
    transaction: t,
  });
}

async function locationTypeMap(company_id, t) {
  const rows = await db.store_location.findAll({
    where: { company_id },
    attributes: ['id', 'location_type'],
    transaction: t,
    raw: true,
  });
  return new Map(rows.map((r) => [Number(r.id), r.location_type]));
}

/**
 * Quantity policy for a line. Never rounds or truncates: a fraction is refused, not adjusted.
 * Fractional UOMs are recognised but refused until stock counters are exact decimals (see src/core/utils/uom.js).
 */
function quantityForUom(uomCode, raw, label = 'quantity') {
  const uom = normalizeUom(uomCode);
  const rule = uomRule(uom);
  if (!rule) throw fail('VALIDATION', `Unsupported unit of measure: ${uom}.`);
  if (!Number.isInteger(Number(raw))) {
    throw fail('WHOLE_UNIT_REQUIRED', `${label} must be a whole number for ${uom}; fractions are not accepted.`);
  }
  if (rule.fractional) {
    throw fail('PRECISION_UNSUPPORTED', `Fractional ${uom} movements are not supported until stock counters use exact decimals.`);
  }
  return wholeQty(raw, label);
}

/**
 * System-managed in-transit location: one per company and project, created on first dispatch.
 * Its balance is never stored; it is the ledger sum of the legs that reference it.
 */
async function ensureInTransitLocation(t, company_id, project_id) {
  const code = `INTRANSIT-P${project_id}`;
  const [loc] = await db.store_location.findOrCreate({
    where: { company_id, code },
    defaults: {
      company_id,
      project_id,
      code,
      name: `In transit (project ${project_id})`,
      location_type: 'in_transit',
      status: 'active',
      created_by: null,
    },
    transaction: t,
  });
  return loc;
}

/**
 * Per-line figures derived only from STOCK_LEDGER rows tagged with transfer_line_id.
 *   dispatched           = transfer_out from a physical location (leaves the source)
 *   outstanding          = in-transit balance: legs into in-transit − legs out of in-transit − write-offs from in-transit
 *   received_accepted    = transfer_in to a non-quarantine destination
 *   received_quarantined = transfer_in to a quarantine location
 *   reversed             = transfer_in tagged reference_type 'transfer_reversal' (returned to source)
 *   shortage             = location_writeoff from in-transit
 * Invariant: dispatched = outstanding + received_accepted + received_quarantined + reversed + shortage.
 */
async function lineFigures(t, transfer, lines) {
  const rows = await db.stock_ledger.findAll({
    where: { company_id: transfer.company_id, transfer_id: transfer.id },
    transaction: t,
    raw: true,
  });
  const types = await locationTypeMap(transfer.company_id, t);
  const figs = new Map();
  for (const line of lines) {
    figs.set(line.id, {
      dispatched: 0,
      received_accepted: 0,
      received_quarantined: 0,
      reversed: 0,
      shortage: 0,
      outstanding: 0,
    });
  }
  for (const r of rows) {
    const f = figs.get(Number(r.transfer_line_id));
    if (!f) continue;
    const q = Number(r.quantity);
    const type = types.get(Number(r.location_id));
    if (type === 'in_transit') {
      if (r.movement_type === 'transfer_in') f.outstanding += q;
      else if (r.movement_type === 'transfer_out') f.outstanding -= q;
      else if (r.movement_type === 'location_writeoff') {
        f.outstanding -= q;
        f.shortage += q;
      }
    } else if (r.movement_type === 'transfer_out') {
      f.dispatched += q;
    } else if (r.movement_type === 'transfer_in') {
      if (r.reference_type === 'transfer_reversal') f.reversed += q;
      else if (type === 'quarantine') f.received_quarantined += q;
      else f.received_accepted += q;
    }
  }
  return figs;
}

async function openDiscrepancyQty(t, transfer_id, transfer_line_id) {
  const rows = await db.stock_transfer_discrepancy.findAll({
    where: { transfer_id, transfer_line_id, status: 'open' },
    transaction: t,
    raw: true,
  });
  return rows.reduce((s, r) => s + Number(r.quantity), 0);
}

/**
 * Status is recomputed from ledger figures after every operation, so it cannot drift from the stock.
 * `completed` requires every approved unit to be dispatched and fully accounted for.
 */
async function recomputeStatus(t, transfer, lines, figs) {
  if (!['approved', 'in_transit', 'partially_received', 'reconciliation_required', 'completed'].includes(transfer.status)) {
    return transfer;
  }
  let dispatchedTotal = 0;
  let outstandingTotal = 0;
  let receivedTotal = 0;
  let allDispatched = true;
  for (const line of lines) {
    const f = figs.get(line.id);
    dispatchedTotal += f.dispatched;
    outstandingTotal += f.outstanding;
    receivedTotal += f.received_accepted + f.received_quarantined;
    if (f.dispatched !== Number(line.approved_qty || 0)) allDispatched = false;
  }
  const openDisc = await db.stock_transfer_discrepancy.count({
    where: { transfer_id: transfer.id, status: 'open' },
    transaction: t,
  });

  let status;
  if (dispatchedTotal === 0) status = 'approved';
  else if (outstandingTotal === 0) status = allDispatched ? 'completed' : 'partially_received';
  else if (openDisc > 0) status = 'reconciliation_required';
  else status = receivedTotal > 0 ? 'partially_received' : 'in_transit';

  const patch = { status };
  if (dispatchedTotal > 0 && !transfer.first_dispatched_at) patch.first_dispatched_at = new Date();
  if (status === 'completed') patch.completed_at = new Date();
  await transfer.update(patch, { transaction: t });
  return transfer;
}

/**
 * Separation of duties. The same person may not approve their own request or write off their own shortage,
 * except a Super Admin who gives a written reason. The override is recorded; ordinary users cannot use it.
 */
function selfActionOverride(actor, body, label) {
  if (!actor.is_super_admin) {
    throw fail('FORBIDDEN', `The same person cannot perform this ${label}. Separation of duties applies.`);
  }
  const reason = typeof body.override_reason === 'string' ? body.override_reason.trim() : '';
  if (reason.length < 10) {
    throw fail('FORBIDDEN', `A Super Admin ${label} override needs an override_reason of at least 10 characters.`);
  }
  return reason.slice(0, 500);
}

async function recordEvent(t, transfer, actor, event_type, idemKey, detail) {
  await db.stock_transfer_event.create(
    {
      company_id: transfer.company_id,
      transfer_id: transfer.id,
      event_type,
      idempotency_key: idemKey,
      actor_id: actor ? actor.id : null,
      detail: detail ? JSON.stringify(detail) : null,
    },
    { transaction: t }
  );
}

/** Adds ledger-derived quantity totals to header rows for list views (one line query per transfer). */
async function withTotals(rows) {
  const out = [];
  for (const row of rows) {
    const lines = await db.stock_transfer_line.findAll({ where: { transfer_id: row.id, company_id: row.company_id }, raw: true });
    const figs = await lineFigures(null, row, lines);
    const all = [...figs.values()];
    out.push({
      ...row,
      totals: {
        approved: lines.reduce((s, l) => s + Number(l.approved_qty || 0), 0),
        dispatched: all.reduce((s, f) => s + f.dispatched, 0),
        outstanding: all.reduce((s, f) => s + f.outstanding, 0),
      },
    });
  }
  return out;
}

/** Runs fn in a transaction, mapping a duplicate-event unique violation to an already-processed result. */
async function inTransaction(fn) {
  const t = await db.sequelize.transaction();
  try {
    const result = await fn(t);
    await t.commit();
    return result;
  } catch (err) {
    await t.rollback().catch(() => {});
    throw err;
  }
}

// ── public service ────────────────────────────────────────────────────────────

const StockTransferService = {
  async createLocation(company_id, actor, body) {
    const project_id = toId(body.project_id, 'project_id');
    const location_type = String(body.location_type || '');
    if (!LOCATION_TYPES.includes(location_type)) {
      throw fail('VALIDATION', `location_type must be one of: ${LOCATION_TYPES.join(', ')}.`);
    }
    const code = String(body.code || '').trim();
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(code)) throw fail('VALIDATION', 'code must be 1–40 letters, digits, "-" or "_".');
    const name = requireText(body.name, 'name', 150);
    const project = await db.project.findOne({ where: { id: project_id, company_id } });
    if (!project) throw fail('NOT_FOUND', 'Project not found.');
    try {
      return await db.store_location.create({
        company_id,
        project_id,
        code,
        name,
        location_type,
        status: 'active',
        created_by: actor.id,
      });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') throw fail('CONFLICT', 'A location with this code already exists.');
      throw err;
    }
  },

  async listLocations(company_id, project_id) {
    const where = { company_id };
    if (project_id) where.project_id = toId(project_id, 'project_id');
    return db.store_location.findAll({ where, order: [['location_type', 'ASC'], ['code', 'ASC']] });
  },

  /**
   * Places unplaced project stock into a location (e.g. opening stock into the central warehouse).
   * It moves quantity from "unplaced" to the location and never changes the project total.
   */
  async placeStock(company_id, actor, body) {
    const project_id = toId(body.project_id, 'project_id');
    const material_id = toId(body.material_id, 'material_id');
    const location_id = toId(body.location_id, 'location_id');
    const key = idempotencyKey(body.idempotency_key);
    const reason = requireText(body.reason, 'reason');

    const material = await db.material_project_stock.findOne({ where: { id: material_id, company_id, project_id } });
    if (!material) throw fail('NOT_FOUND', 'Material not found in this project.');
    const quantity = quantityForUom(material.unit_of_measure, body.quantity, 'quantity');

    const location = await db.store_location.findOne({ where: { id: location_id, company_id, project_id } });
    if (!location) throw fail('NOT_FOUND', 'Location not found in this project.');
    if (location.status !== 'active') throw fail('STATE', 'Location is not active.');
    if (location.location_type === 'in_transit') throw fail('VALIDATION', 'Stock cannot be placed into the in-transit location.');

    const result = await inTransaction((t) =>
      StockLedgerService.recordMovement({
        company_id,
        project_id,
        material_id,
        movement_type: 'location_placement',
        quantity,
        unit_of_measure: material.unit_of_measure,
        location_id,
        idempotency_key: `PLACE:${company_id}:${key}`,
        reason,
        performed_by: actor.id,
        transaction: t,
      })
    );
    return { already_processed: result.already_processed, entry: result.entry };
  },

  async createTransfer(company_id, actor, body) {
    const source_location_id = toId(body.source_location_id, 'source_location_id');
    const destination_location_id = toId(body.destination_location_id, 'destination_location_id');
    if (source_location_id === destination_location_id) throw fail('VALIDATION', 'Source and destination must differ.');
    const reason = requireText(body.reason, 'reason');
    const lineInputs = listOf(body.lines, 'lines');

    const [src, dst] = await Promise.all([
      db.store_location.findOne({ where: { id: source_location_id, company_id } }),
      db.store_location.findOne({ where: { id: destination_location_id, company_id } }),
    ]);
    if (!src || !dst) throw fail('NOT_FOUND', 'Source or destination location not found.');
    if (src.status !== 'active' || dst.status !== 'active') throw fail('STATE', 'Source and destination must be active.');
    if (src.location_type === 'in_transit' || dst.location_type === 'in_transit') {
      throw fail('VALIDATION', 'The in-transit location is system-managed and cannot be a transfer endpoint.');
    }
    if (src.project_id !== dst.project_id) {
      throw fail('VALIDATION', 'Inter-project transfers are not supported in this release.');
    }

    const seen = new Set();
    const lines = [];
    for (const input of lineInputs) {
      const material_id = toId(input.material_id, 'material_id');
      if (seen.has(material_id)) throw fail('VALIDATION', 'Each material may appear only once per transfer.');
      seen.add(material_id);
      const material = await db.material_project_stock.findOne({
        where: { id: material_id, company_id, project_id: src.project_id },
      });
      if (!material) throw fail('NOT_FOUND', `Material ${material_id} not found in this project.`);
      // A line must use the material's own UOM. Requested UOM, if sent, must match exactly; no conversion is applied.
      const materialUom = normalizeUom(material.unit_of_measure);
      const lineUom = normalizeUom(input.unit_of_measure || materialUom);
      if (!uomRule(lineUom)) throw fail('VALIDATION', `Unsupported unit of measure: ${lineUom}.`);
      if (lineUom !== materialUom) {
        throw fail('UOM_MISMATCH', `Unit of measure ${lineUom} does not match the material's unit (${materialUom}).`);
      }
      const requested_qty = quantityForUom(materialUom, input.requested_qty, 'requested_qty');
      lines.push({ material_id, requested_qty, unit_of_measure: lineUom });
    }

    return inTransaction(async (t) => {
      const transfer = await db.stock_transfer.create(
        {
          company_id,
          project_id: src.project_id,
          transfer_number: `TRF-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto
            .randomBytes(3)
            .toString('hex')
            .toUpperCase()}`,
          source_location_id,
          destination_location_id,
          status: 'draft',
          reason,
          required_date: body.required_date || null,
          requested_by: actor.id,
        },
        { transaction: t }
      );
      for (const line of lines) {
        await db.stock_transfer_line.create(
          { company_id, transfer_id: transfer.id, ...line },
          { transaction: t }
        );
      }
      await recordEvent(t, transfer, actor, 'created', null, { lines: lines.length });
      return transfer;
    }).then((transfer) => this.getTransfer(company_id, transfer.id));
  },

  async submitTransfer(company_id, actor, id) {
    await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      if (transfer.status !== 'draft') throw fail('STATE', `Only a draft can be submitted (status: ${transfer.status}).`);
      if (transfer.requested_by !== actor.id) throw fail('FORBIDDEN', 'Only the requester can submit this transfer.');
      await transfer.update({ status: 'submitted', submitted_at: new Date() }, { transaction: t });
      await recordEvent(t, transfer, actor, 'submitted', null, null);
    });
    return this.getTransfer(company_id, id);
  },

  async approveTransfer(company_id, actor, id, body) {
    await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      if (transfer.status !== 'submitted') throw fail('STATE', `Only a submitted transfer can be approved (status: ${transfer.status}).`);
      const override = transfer.requested_by === actor.id ? selfActionOverride(actor, body, 'approval') : null;

      const lines = await transferLines(t, transfer);
      const decisions = listOf(body.lines, 'lines');
      const byLine = new Map(decisions.map((d) => [toId(d.line_id, 'line_id'), d]));
      if (byLine.size !== lines.length || lines.some((l) => !byLine.has(l.id))) {
        throw fail('VALIDATION', 'Every line must have an approved_qty decision.');
      }
      let totalApproved = 0;
      for (const line of lines) {
        const approved = wholeQty(byLine.get(line.id).approved_qty, 'approved_qty', { allowZero: true });
        if (approved > line.requested_qty) throw fail('VALIDATION', 'approved_qty cannot exceed requested_qty.');
        await line.update({ approved_qty: approved }, { transaction: t });
        totalApproved += approved;
      }
      if (totalApproved === 0) throw fail('VALIDATION', 'At least one line must be approved.');

      await transfer.update(
        {
          status: 'approved',
          approved_by: actor.id,
          approved_at: new Date(),
          decision_reason: override
            ? `Super Admin override: ${override}`.slice(0, 500)
            : body.decision_reason ? String(body.decision_reason).slice(0, 500) : null,
        },
        { transaction: t }
      );
      await recordEvent(t, transfer, actor, 'approved', null, {
        total_approved: totalApproved,
        creator_id: transfer.requested_by,
        approver_id: actor.id,
        super_admin_override: override ? { reason: override, at: new Date().toISOString() } : null,
      });
    });
    return this.getTransfer(company_id, id);
  },

  async rejectTransfer(company_id, actor, id, body) {
    const reason = requireText(body.reason, 'reason');
    await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      if (transfer.status !== 'submitted') throw fail('STATE', `Only a submitted transfer can be rejected (status: ${transfer.status}).`);
      if (transfer.requested_by === actor.id) throw fail('FORBIDDEN', 'The requester cannot reject their own transfer.');
      await transfer.update({ status: 'rejected', decision_reason: reason, approved_by: actor.id, approved_at: new Date() }, { transaction: t });
      await recordEvent(t, transfer, actor, 'rejected', null, { reason });
    });
    return this.getTransfer(company_id, id);
  },

  async cancelTransfer(company_id, actor, id, body) {
    const reason = requireText(body.reason, 'reason');
    await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      if (!CANCELLABLE_STATES.includes(transfer.status)) {
        throw fail('STATE', `A ${transfer.status} transfer cannot be cancelled.`);
      }
      const dispatched = await db.stock_ledger.count({
        where: { company_id, transfer_id: transfer.id, movement_type: 'transfer_out' },
        transaction: t,
      });
      if (dispatched > 0) throw fail('STATE', 'Stock has already been dispatched; use the authorized dispatch reversal instead.');
      await transfer.update({ status: 'cancelled', cancelled_at: new Date(), cancel_reason: reason }, { transaction: t });
      await recordEvent(t, transfer, actor, 'cancelled', null, { reason });
    });
    return this.getTransfer(company_id, id);
  },

  /** Source check-out: picks and dispatches approved quantities, moving them into in-transit. Idempotent. */
  async checkOut(company_id, actor, id, body) {
    const key = idempotencyKey(body.idempotency_key);
    const eventKey = `TRF:${id}:checkout:${key}`;
    const items = listOf(body.lines, 'lines');

    const result = await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      const prior = await db.stock_transfer_event.findOne({
        where: { company_id, idempotency_key: eventKey },
        transaction: t,
      });
      if (prior) return { already_processed: true };
      if (!CHECKOUT_STATES.includes(transfer.status)) {
        throw fail('STATE', `Check-out is not allowed while the transfer is ${transfer.status}.`);
      }

      const lines = await transferLines(t, transfer);
      const byId = new Map(lines.map((l) => [l.id, l]));
      const requests = new Map();
      for (const item of items) {
        const lineId = toId(item.line_id, 'line_id');
        if (!byId.has(lineId)) throw fail('NOT_FOUND', `Line ${lineId} does not belong to this transfer.`);
        if (requests.has(lineId)) throw fail('VALIDATION', 'Each line may appear only once per check-out.');
        requests.set(lineId, wholeQty(item.quantity, 'quantity'));
      }

      const figs = await lineFigures(t, transfer, lines);
      const transit = await ensureInTransitLocation(t, company_id, transfer.project_id);
      const ordered = [...requests.entries()].sort((a, b) => byId.get(a[0]).material_id - byId.get(b[0]).material_id);
      for (const [lineId, quantity] of ordered) {
        const line = byId.get(lineId);
        const remaining = Number(line.approved_qty || 0) - figs.get(lineId).dispatched;
        if (quantity > remaining) {
          throw fail('CONFLICT', `Check-out exceeds the approved quantity remaining (${remaining}).`);
        }
        // Two legs in one transaction: source leaves, in-transit receives. Source balance is checked by the first leg.
        const legBase = {
          company_id,
          project_id: transfer.project_id,
          material_id: line.material_id,
          quantity,
          unit_of_measure: line.unit_of_measure,
          transfer_id: transfer.id,
          transfer_line_id: line.id,
          reference_type: 'stock_transfer',
          reference_id: transfer.id,
          reason: body.dispatch_reference ? String(body.dispatch_reference).slice(0, 500) : null,
          performed_by: actor.id,
          transaction: t,
        };
        await StockLedgerService.recordMovement({
          ...legBase,
          movement_type: 'transfer_out',
          location_id: transfer.source_location_id,
          idempotency_key: `TRF:${transfer.id}:OUT:${key}:L${line.id}:S`,
        });
        await StockLedgerService.recordMovement({
          ...legBase,
          movement_type: 'transfer_in',
          location_id: transit.id,
          idempotency_key: `TRF:${transfer.id}:OUT:${key}:L${line.id}:T`,
        });
      }

      const refreshed = await lineFigures(t, transfer, lines);
      await recomputeStatus(t, transfer, lines, refreshed);
      await recordEvent(t, transfer, actor, 'checkout', eventKey, {
        lines: ordered.map(([lineId, quantity]) => ({ line_id: lineId, quantity })),
        dispatch_reference: body.dispatch_reference ? String(body.dispatch_reference).slice(0, 200) : null,
      });
      return { already_processed: false };
    });
    return { ...result, transfer: await this.getTransfer(company_id, id) };
  },

  /** Destination check-in: accepted goes to destination, rejected/damaged goes to quarantine. Idempotent. */
  async checkIn(company_id, actor, id, body) {
    const key = idempotencyKey(body.idempotency_key);
    const eventKey = `TRF:${id}:checkin:${key}`;
    const items = listOf(body.lines, 'lines');

    const result = await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      const prior = await db.stock_transfer_event.findOne({
        where: { company_id, idempotency_key: eventKey },
        transaction: t,
      });
      if (prior) return { already_processed: true };
      if (!CHECKIN_STATES.includes(transfer.status)) {
        throw fail('STATE', `Check-in is not allowed while the transfer is ${transfer.status}.`);
      }

      const destination = await db.store_location.findOne({ where: { id: transfer.destination_location_id, company_id }, transaction: t });
      if (!destination || destination.status !== 'active') throw fail('STATE', 'Destination location is not active.');

      const lines = await transferLines(t, transfer);
      const byId = new Map(lines.map((l) => [l.id, l]));
      const plan = new Map();
      let quarantineLocation = null;
      for (const item of items) {
        const lineId = toId(item.line_id, 'line_id');
        if (!byId.has(lineId)) throw fail('NOT_FOUND', `Line ${lineId} does not belong to this transfer.`);
        if (plan.has(lineId)) throw fail('VALIDATION', 'Each line may appear only once per check-in.');
        const accepted = wholeQty(item.accepted_qty ?? 0, 'accepted_qty', { allowZero: true });
        const quarantined = wholeQty(item.quarantined_qty ?? 0, 'quarantined_qty', { allowZero: true });
        if (accepted + quarantined === 0) throw fail('VALIDATION', 'Each check-in line needs an accepted or quarantined quantity.');
        plan.set(lineId, { accepted, quarantined });
        if (quarantined > 0 && !quarantineLocation) {
          const qid = toId(body.quarantine_location_id, 'quarantine_location_id');
          quarantineLocation = await db.store_location.findOne({ where: { id: qid, company_id }, transaction: t });
          if (!quarantineLocation || quarantineLocation.location_type !== 'quarantine' || quarantineLocation.status !== 'active') {
            throw fail('VALIDATION', 'quarantine_location_id must reference an active quarantine location.');
          }
          if (quarantineLocation.project_id !== transfer.project_id) {
            throw fail('VALIDATION', 'Quarantine location belongs to another project.');
          }
        }
      }

      const figs = await lineFigures(t, transfer, lines);
      const transit = await ensureInTransitLocation(t, company_id, transfer.project_id);
      const ordered = [...plan.entries()].sort((a, b) => byId.get(a[0]).material_id - byId.get(b[0]).material_id);
      for (const [lineId, { accepted, quarantined }] of ordered) {
        const line = byId.get(lineId);
        const outstanding = figs.get(lineId).outstanding;
        if (accepted + quarantined > outstanding) {
          throw fail('CONFLICT', `Received quantity exceeds the outstanding in-transit quantity (${outstanding}).`);
        }
        // Each receipt is two legs in one transaction: in-transit gives up the goods, the destination (or quarantine) takes them.
        const base = { company_id, project_id: transfer.project_id, material_id: line.material_id, transfer_id: transfer.id, transfer_line_id: line.id, reference_type: 'stock_transfer', reference_id: transfer.id, performed_by: actor.id, transaction: t, unit_of_measure: line.unit_of_measure };
        const receive = async (qty, target, suffix) => {
          await StockLedgerService.recordMovement({ ...base, movement_type: 'transfer_out', quantity: qty, location_id: transit.id, idempotency_key: `TRF:${transfer.id}:IN:${key}:L${line.id}:${suffix}:O` });
          await StockLedgerService.recordMovement({ ...base, movement_type: 'transfer_in', quantity: qty, location_id: target, idempotency_key: `TRF:${transfer.id}:IN:${key}:L${line.id}:${suffix}:I` });
        };
        if (accepted > 0) await receive(accepted, transfer.destination_location_id, 'A');
        if (quarantined > 0) await receive(quarantined, quarantineLocation.id, 'Q');
      }

      const refreshed = await lineFigures(t, transfer, lines);
      await recomputeStatus(t, transfer, lines, refreshed);
      await recordEvent(t, transfer, actor, 'checkin', eventKey, {
        lines: ordered.map(([lineId, v]) => ({ line_id: lineId, ...v })),
        quarantine_location_id: quarantineLocation ? quarantineLocation.id : null,
        receipt_reference: body.receipt_reference ? String(body.receipt_reference).slice(0, 200) : null,
      });
      return { already_processed: false };
    });
    return { ...result, transfer: await this.getTransfer(company_id, id) };
  },

  /** Records a shortage for review. It does not move stock and does not write anything off. */
  async declareShortage(company_id, actor, id, body) {
    const line_id = toId(body.line_id, 'line_id');
    const quantity = wholeQty(body.quantity, 'quantity');
    const reason = requireText(body.reason, 'reason');
    await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      if (!CHECKIN_STATES.includes(transfer.status)) {
        throw fail('STATE', `A shortage can be declared only while goods are in transit (status: ${transfer.status}).`);
      }
      const lines = await transferLines(t, transfer);
      const line = lines.find((l) => l.id === line_id);
      if (!line) throw fail('NOT_FOUND', 'Line not found on this transfer.');
      const figs = await lineFigures(t, transfer, lines);
      const open = await openDiscrepancyQty(t, transfer.id, line.id);
      if (quantity + open > figs.get(line.id).outstanding) {
        throw fail('CONFLICT', `Declared quantity exceeds the outstanding in-transit quantity (${figs.get(line.id).outstanding}).`);
      }
      await db.stock_transfer_discrepancy.create(
        {
          company_id,
          transfer_id: transfer.id,
          transfer_line_id: line.id,
          discrepancy_type: 'shortage',
          quantity,
          reason,
          status: 'open',
          declared_by: actor.id,
        },
        { transaction: t }
      );
      await recomputeStatus(t, transfer, lines, await lineFigures(t, transfer, lines));
      await recordEvent(t, transfer, actor, 'shortage_declared', null, { line_id: line.id, quantity, reason });
    });
    return this.getTransfer(company_id, id);
  },

  /** Authorized write-off of a declared shortage. Separation of duties: the resolver must not be the declarer. */
  async writeOffShortage(company_id, actor, discrepancyId, body) {
    const reason = requireText(body.reason, 'reason');
    const key = idempotencyKey(body.idempotency_key);
    const did = toId(discrepancyId, 'discrepancy id');
    const transferId = await inTransaction(async (t) => {
      const disc = await db.stock_transfer_discrepancy.findOne({ where: { id: did, company_id }, transaction: t, lock: t.LOCK.UPDATE });
      if (!disc) throw fail('NOT_FOUND', 'Discrepancy not found.');
      const transfer = await lockTransfer(t, company_id, disc.transfer_id);
      if (disc.status !== 'open') throw fail('STATE', 'Discrepancy is already resolved.');
      const override = disc.declared_by === actor.id ? selfActionOverride(actor, body, 'write-off') : null;
      const lines = await transferLines(t, transfer);
      const line = lines.find((l) => l.id === disc.transfer_line_id);
      const figs = await lineFigures(t, transfer, lines);
      if (disc.quantity > figs.get(line.id).outstanding) {
        throw fail('CONFLICT', 'Write-off exceeds the outstanding in-transit quantity.');
      }
      const transit = await ensureInTransitLocation(t, company_id, transfer.project_id);
      await StockLedgerService.recordMovement({
        company_id,
        project_id: transfer.project_id,
        material_id: line.material_id,
        movement_type: 'location_writeoff',
        quantity: disc.quantity,
        unit_of_measure: line.unit_of_measure,
        location_id: transit.id,
        transfer_id: transfer.id,
        transfer_line_id: line.id,
        reference_type: 'stock_transfer_discrepancy',
        reference_id: disc.id,
        idempotency_key: `TRF:${transfer.id}:SHORT:${key}:D${disc.id}`,
        reason,
        performed_by: actor.id,
        transaction: t,
      });
      await disc.update({ status: 'written_off', resolved_by: actor.id, resolved_at: new Date(), resolution_reason: reason }, { transaction: t });
      await recomputeStatus(t, transfer, lines, await lineFigures(t, transfer, lines));
      await recordEvent(t, transfer, actor, 'shortage_written_off', `TRF:${transfer.id}:SHORT:${key}:D${disc.id}`, {
        discrepancy_id: disc.id,
        quantity: disc.quantity,
        reason,
        declarer_id: disc.declared_by,
        resolver_id: actor.id,
        super_admin_override: override ? { reason: override, at: new Date().toISOString() } : null,
      });
      return transfer.id;
    });
    return this.getTransfer(company_id, transferId);
  },

  /** Authorized reversal of dispatched goods that have not been received: returns them to the source location. */
  async reverseDispatch(company_id, actor, id, body) {
    const line_id = toId(body.line_id, 'line_id');
    const quantity = wholeQty(body.quantity, 'quantity');
    const reason = requireText(body.reason, 'reason');
    const key = idempotencyKey(body.idempotency_key);
    const eventKey = `TRF:${id}:REV:${key}`;
    await inTransaction(async (t) => {
      const transfer = await lockTransfer(t, company_id, id);
      // A retry with the same key returns the original outcome; nothing is posted twice and no 500 is raised.
      const prior = await db.stock_transfer_event.findOne({ where: { company_id, idempotency_key: `${eventKey}:L${line_id}` }, transaction: t });
      if (prior) return { already_processed: true };
      if (!CHECKIN_STATES.includes(transfer.status)) {
        throw fail('STATE', `Dispatch reversal is not allowed while the transfer is ${transfer.status}.`);
      }
      const lines = await transferLines(t, transfer);
      const line = lines.find((l) => l.id === line_id);
      if (!line) throw fail('NOT_FOUND', 'Line not found on this transfer.');
      const figs = await lineFigures(t, transfer, lines);
      if (quantity > figs.get(line.id).outstanding) {
        throw fail('CONFLICT', `Reversal exceeds the outstanding in-transit quantity (${figs.get(line.id).outstanding}).`);
      }
      // Two legs in one transaction: goods leave in-transit and return to the source. Tagged so they are not counted as received.
      const transit = await ensureInTransitLocation(t, company_id, transfer.project_id);
      const legBase = {
        company_id,
        project_id: transfer.project_id,
        material_id: line.material_id,
        quantity,
        unit_of_measure: line.unit_of_measure,
        transfer_id: transfer.id,
        transfer_line_id: line.id,
        reference_type: 'transfer_reversal',
        reference_id: transfer.id,
        reason,
        performed_by: actor.id,
        transaction: t,
      };
      await StockLedgerService.recordMovement({
        ...legBase,
        movement_type: 'transfer_out',
        location_id: transit.id,
        idempotency_key: `TRF:${transfer.id}:REV:${key}:L${line.id}:O`,
      });
      await StockLedgerService.recordMovement({
        ...legBase,
        movement_type: 'transfer_in',
        location_id: transfer.source_location_id,
        idempotency_key: `TRF:${transfer.id}:REV:${key}:L${line.id}:I`,
      });
      await recomputeStatus(t, transfer, lines, await lineFigures(t, transfer, lines));
      await recordEvent(t, transfer, actor, 'dispatch_reversed', `TRF:${transfer.id}:REV:${key}:L${line.id}`, { line_id: line.id, quantity, reason });
    });
    return this.getTransfer(company_id, id);
  },

  async getTransfer(company_id, id) {
    const transfer = await db.stock_transfer.findOne({ where: { id: toId(id, 'id'), company_id }, raw: true });
    if (!transfer) throw fail('NOT_FOUND', 'Transfer not found.');
    const lines = await db.stock_transfer_line.findAll({ where: { transfer_id: transfer.id, company_id }, order: [['id', 'ASC']], raw: true });
    const figs = await lineFigures(null, transfer, lines);
    const discrepancies = await db.stock_transfer_discrepancy.findAll({ where: { transfer_id: transfer.id, company_id }, order: [['id', 'ASC']], raw: true });
    return {
      ...transfer,
      lines: lines.map((l) => ({
        ...l,
        ...figs.get(l.id),
      })),
      discrepancies,
      totals: {
        approved: lines.reduce((s, l) => s + Number(l.approved_qty || 0), 0),
        dispatched: [...figs.values()].reduce((s, f) => s + f.dispatched, 0),
        outstanding: [...figs.values()].reduce((s, f) => s + f.outstanding, 0),
      },
    };
  },

  async listTransfers(company_id, query) {
    const where = { company_id };
    if (query.project_id) where.project_id = toId(query.project_id, 'project_id');
    if (query.status) where.status = String(query.status);
    const limit = Math.min(Math.max(parseInt(query.limit, 10) || 25, 1), 100);
    const page = Math.max(parseInt(query.page, 10) || 1, 1);
    const { rows, count } = await db.stock_transfer.findAndCountAll({
      where,
      order: [['id', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      raw: true,
    });
    return { rows: await withTotals(rows), count, page, limit };
  },

  async listInTransit(company_id, project_id) {
    const where = { company_id, status: { [Op.in]: ['in_transit', 'partially_received', 'reconciliation_required'] } };
    if (project_id) where.project_id = toId(project_id, 'project_id');
    const rows = await db.stock_transfer.findAll({ where, order: [['first_dispatched_at', 'ASC']], raw: true });
    return withTotals(rows);
  },

  async getHistory(company_id, id) {
    const tid = toId(id, 'id');
    const transfer = await db.stock_transfer.findOne({ where: { id: tid, company_id }, attributes: ['id'], raw: true });
    if (!transfer) throw fail('NOT_FOUND', 'Transfer not found.');
    const events = await db.stock_transfer_event.findAll({ where: { company_id, transfer_id: tid }, order: [['id', 'ASC']], raw: true });
    const movements = await db.stock_ledger.findAll({ where: { company_id, transfer_id: tid }, order: [['id', 'ASC']], raw: true });
    return { events, movements };
  },
};

module.exports = StockTransferService;
