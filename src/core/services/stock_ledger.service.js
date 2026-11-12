'use strict';
const { Op } = require('sequelize');
const db = require('../../models');

/** Error with a machine-readable code so controllers can map it to HTTP responses. */
class StockError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'StockError';
    this.code = code;
  }
}

const IN_TRANSIT = 'in_transit';
const ALL_TYPES = [
  'opening_balance',
  'receipt',
  'issue',
  'consumption',
  'adjustment',
  'reversal',
  'location_placement',
  'location_writeoff',
  'location_issue',
  'transfer_in',
  'transfer_out',
];

/**
 * Sign of a row on a location balance. Only these types touch a location.
 * transfer_out leaves a location, transfer_in arrives at one. Dispatch from a source is
 * transfer_out(source) + transfer_in(in-transit); check-in is transfer_out(in-transit) + transfer_in(destination).
 */
const LOCATION_SIGN = {
  opening_balance: 1,
  receipt: 1,
  location_placement: 1,
  transfer_in: 1,
  transfer_out: -1,
  location_writeoff: -1,
  location_issue: -1,
};

/** Only these types may reference an in-transit location. Ordinary issue or consumption can never draw on it. */
const IN_TRANSIT_TYPES = ['transfer_in', 'transfer_out', 'location_writeoff'];

const isWholeUnit = (q) => Number.isSafeInteger(q) && q > 0;

/** Signed quantity a ledger row contributes to location balances. */
function signedLocationQty(row) {
  if (!row.location_id) return 0;
  const s = LOCATION_SIGN[row.movement_type];
  return s ? s * Number(row.quantity) : 0;
}

class StockLedgerService {
  static StockError = StockError;
  static IN_TRANSIT = IN_TRANSIT;

  /**
   * Record one stock movement atomically: the ledger row, the balance check and the project counter change.
   *
   * Legacy movements (no location) keep their original behaviour, except that a decrease is also refused
   * when it would take stock already placed in a location or in transit.
   * Location balances and in-transit quantities are derived from ledger rows, never stored.
   */
  static async recordMovement({
    company_id,
    project_id,
    material_id = null,
    equipment_id = null,
    movement_type,
    quantity,
    unit_of_measure = 'units',
    unit_cost = null,
    source_location = null,
    destination_location = null,
    location_id = null,
    transfer_id = null,
    transfer_line_id = null,
    reference_type = null,
    reference_id = null,
    idempotency_key = null,
    reason = null,
    performed_by = null,
    transaction = null,
  }) {
    if (!company_id || !project_id) {
      throw new StockError('VALIDATION', 'company_id and project_id are required for stock movements.');
    }
    const qty = Number(quantity);
    if (isNaN(qty) || !isFinite(qty) || qty <= 0) {
      throw new StockError('VALIDATION', 'Movement quantity must be a positive number.');
    }
    if (!ALL_TYPES.includes(movement_type)) {
      throw new StockError('VALIDATION', `Invalid movement_type: ${movement_type}`);
    }

    const isTransferLeg = movement_type === 'transfer_in' || movement_type === 'transfer_out';
    const isLayer = Boolean(location_id) || Boolean(transfer_id) || movement_type === 'location_placement' || movement_type === 'location_writeoff' || isTransferLeg;
    if (isTransferLeg || movement_type === 'location_placement') {
      if (!location_id) throw new StockError('VALIDATION', `${movement_type} requires location_id.`);
    }
    if (isTransferLeg && !transfer_id) throw new StockError('VALIDATION', `${movement_type} requires transfer_id.`);
    if (movement_type === 'location_placement' && transfer_id) {
      throw new StockError('VALIDATION', 'location_placement must not specify transfer_id.');
    }
    if (movement_type === 'location_writeoff' && !location_id) {
      throw new StockError('VALIDATION', 'location_writeoff requires location_id.');
    }
    if (isLayer) {
      if (!material_id) throw new StockError('VALIDATION', 'Location movements require material_id.');
      if (!isWholeUnit(qty)) throw new StockError('VALIDATION', 'Location movements require a whole-unit quantity.');
    }

    const manageTransaction = !transaction;
    const t = transaction || (await db.sequelize.transaction());

    try {
      // 1. Idempotency: a repeated key returns the original entry without any second posting.
      if (idempotency_key) {
        const existing = await db.stock_ledger.findOne({ where: { company_id, idempotency_key }, transaction: t });
        if (existing) {
          if (manageTransaction) await t.commit();
          return { already_processed: true, entry: existing };
        }
      }

      // 2. Lock the project material record so every writer for this material serializes.
      let stockRecord = null;
      if (material_id) {
        stockRecord = await db.material_project_stock.findOne({
          where: { id: material_id, project_id, company_id },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (!stockRecord) {
          stockRecord = await db.material_project_stock.findOne({
            where: { material_id, project_id, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
        }
      }
      if (isLayer && !stockRecord) {
        throw new StockError('NOT_FOUND', 'No project stock record exists for this material.');
      }

      // 3. Location shape rules. In-transit can only be touched by transfer legs and write-offs.
      let location = null;
      let isTransit = false;
      if (location_id) {
        location = await db.store_location.findOne({ where: { id: location_id, company_id }, transaction: t });
        if (!location) throw new StockError('NOT_FOUND', 'Location not found.');
        if (Number(location.project_id) !== Number(project_id)) {
          throw new StockError('VALIDATION', 'Location belongs to another project.');
        }
        if (location.status !== 'active') throw new StockError('STATE', 'Location is not active.');
        isTransit = location.location_type === IN_TRANSIT;

        if (isTransit && !IN_TRANSIT_TYPES.includes(movement_type)) {
          throw new StockError('VALIDATION', 'In-transit stock can only move through transfer legs or authorized write-offs.');
        }
        if (movement_type === 'location_placement' && isTransit) {
          throw new StockError('VALIDATION', 'Stock cannot be placed into an in-transit location.');
        }
        if (movement_type === 'location_writeoff') {
          if (isTransit && !transfer_id) throw new StockError('VALIDATION', 'Write-off from in-transit requires transfer_id.');
          if (!isTransit && transfer_id) throw new StockError('VALIDATION', 'Write-off from a physical location must not specify transfer_id.');
        }
        if (!['transfer_in', 'transfer_out', 'location_writeoff', 'location_placement', 'location_issue', 'receipt', 'opening_balance'].includes(movement_type)) {
          throw new StockError('VALIDATION', `${movement_type} cannot reference a location.`);
        }
      } else if (transfer_id) {
        throw new StockError('VALIDATION', `${movement_type} with transfer_id requires location_id.`);
      }

      // 4. Balance checks and counter effect.
      const legacyDecrease = ['issue', 'consumption'].includes(movement_type);
      let counterField = null;

      if (movement_type === 'location_placement') {
        const u = await this._unlocated(company_id, project_id, stockRecord, t);
        if (u < qty) throw new StockError('INSUFFICIENT_STOCK', `Insufficient unplaced stock. Unplaced: ${u}, requested: ${qty}.`);
      } else if (movement_type === 'transfer_out' || movement_type === 'location_writeoff' || movement_type === 'location_issue') {
        if (isTransit) {
          const inT = await this._transferInTransit(company_id, project_id, stockRecord.id, transfer_id, t);
          if (inT < qty) throw new StockError('INSUFFICIENT_STOCK', `Insufficient in-transit quantity. Outstanding: ${inT}, requested: ${qty}.`);
        } else {
          const bal = await this._locationBalance(company_id, project_id, stockRecord.id, location_id, t);
          if (bal < qty) throw new StockError('INSUFFICIENT_STOCK', `Insufficient stock at location. Available: ${bal}, requested: ${qty}.`);
        }
        if (movement_type === 'location_writeoff' || movement_type === 'location_issue') counterField = 'stockUsed';
      } else if (movement_type === 'transfer_in') {
        // Increases a location. The matching outbound leg has already checked the source balance.
      } else if (legacyDecrease) {
        if (material_id) {
          if (!stockRecord) throw new StockError('NOT_FOUND', 'Insufficient stock: no stock record found for project.');
          const u = await this._unlocated(company_id, project_id, stockRecord, t);
          if (qty > u) throw new StockError('INSUFFICIENT_STOCK', `Insufficient stock. Available: ${Math.max(0, u)}, requested: ${qty}.`);
        }
        if (stockRecord) counterField = 'stockUsed';
      } else if (movement_type === 'opening_balance' || movement_type === 'receipt') {
        if (stockRecord) counterField = 'stockIn';
      }

      // 5. Insert the append-only ledger row.
      const total_cost = unit_cost ? Number((qty * Number(unit_cost)).toFixed(2)) : null;
      const ledgerEntry = await db.stock_ledger.create(
        {
          company_id,
          project_id,
          material_id: stockRecord ? stockRecord.id : material_id,
          equipment_id,
          movement_type,
          quantity: qty,
          unit_of_measure,
          unit_cost,
          total_cost,
          source_location,
          destination_location,
          location_id,
          transfer_id,
          transfer_line_id,
          reference_type,
          reference_id: reference_id ? String(reference_id) : null,
          idempotency_key,
          reason,
          performed_by,
        },
        { transaction: t }
      );

      // 6. Project counters: new stock raises stockIn; consumption, issue and write-off raise stockUsed.
      if (stockRecord && counterField) {
        const current = Number(stockRecord[counterField] || 0);
        await stockRecord.update({ [counterField]: current + qty }, { transaction: t });
      }

      if (manageTransaction) await t.commit();
      return { already_processed: false, entry: ledgerEntry, stock: stockRecord };
    } catch (err) {
      if (manageTransaction) await t.rollback().catch(() => {});
      throw err;
    }
  }

  /** Balance held at one physical location for one project material, derived from ledger rows. */
  static async getLocationBalance(company_id, project_id, material_id, location_id) {
    return this._locationBalance(company_id, project_id, material_id, location_id, null);
  }

  /** Outstanding in-transit quantity for one transfer, or across all transfers when transfer_id is omitted. */
  static async getInTransit(company_id, project_id, material_id, transfer_id = null) {
    const transit = await this._transitIds(company_id, null);
    const where = { company_id, project_id, material_id, transfer_id: transfer_id ? transfer_id : { [Op.ne]: null } };
    const rows = await db.stock_ledger.findAll({ where, raw: true });
    return rows.reduce((s, r) => s + this._inTransitSigned(r, transit), 0);
  }

  /**
   * Reconciliation for one material across every location type, with the project counters.
   * `consistent` is false if any location or any transfer's in-transit quantity would be negative,
   * or if unplaced stock would be negative (a counter edited outside the ledger, or a bypassed check).
   */
  static async getReconciliation(company_id, project_id, material_id) {
    const stock = await db.material_project_stock.findOne({ where: { id: material_id, project_id, company_id } });
    if (!stock) throw new StockError('NOT_FOUND', 'No project stock record exists for this material.');

    const types = await this._locationTypes(company_id, null);
    const transit = await this._transitIds(company_id, null);
    const rows = await db.stock_ledger.findAll({ where: { company_id, project_id, material_id: stock.id }, raw: true });

    const byType = { central_warehouse: 0, project_store: 0, site_store: 0, quarantine: 0, in_transit: 0 };
    const perLocation = new Map();
    const perTransfer = new Map();
    for (const r of rows) {
      const q = signedLocationQty(r);
      if (!q) continue;
      const locId = Number(r.location_id);
      perLocation.set(locId, (perLocation.get(locId) || 0) + q);
      const type = types.get(locId);
      if (type) byType[type] = (byType[type] || 0) + q;
    }
    for (const r of rows) {
      if (!r.transfer_id) continue;
      const s = this._inTransitSigned(r, transit);
      if (s) perTransfer.set(Number(r.transfer_id), (perTransfer.get(Number(r.transfer_id)) || 0) + s);
    }

    const counterAvailable = Number(stock.stockIn || 0) - Number(stock.stockUsed || 0);
    const locationTotal = Object.values(byType).reduce((a, b) => a + b, 0);
    const unlocated = counterAvailable - locationTotal;
    const negativeLocation = [...perLocation.values()].some((v) => v < 0);
    const negativeTransfer = [...perTransfer.values()].some((v) => v < 0);
    return {
      material_id: stock.id,
      counter_available: counterAvailable,
      by_location_type: byType,
      location_total: locationTotal,
      in_transit: byType.in_transit,
      unlocated,
      consistent: unlocated >= 0 && !negativeLocation && !negativeTransfer,
    };
  }

  /**
   * Project total from the append-only ledger. Internal transfer legs net to zero across locations,
   * including the in-transit location, so only receipts, issues, consumption and write-offs change it.
   */
  static async getBalanceFromLedger(company_id, project_id, material_id) {
    const movements = await db.stock_ledger.findAll({
      where: { company_id, project_id, material_id },
      order: [['createdAt', 'ASC']],
    });

    let totalIn = 0;
    let totalOut = 0;
    for (const m of movements) {
      const q = parseFloat(m.quantity) || 0;
      if (m.movement_type === 'location_placement' || m.movement_type === 'transfer_in' || m.movement_type === 'transfer_out') {
        continue;
      }
      if (m.movement_type === 'opening_balance' || m.movement_type === 'receipt') {
        totalIn += q;
      } else if (['issue', 'consumption', 'location_writeoff', 'location_issue'].includes(m.movement_type)) {
        totalOut += q;
      } else if (m.movement_type === 'reversal') {
        totalOut -= q;
      }
    }
    return {
      totalIn: Number(totalIn.toFixed(3)),
      totalOut: Number(totalOut.toFixed(3)),
      available: Number((totalIn - totalOut).toFixed(3)),
      movementsCount: movements.length,
    };
  }

  // ── internals ─────────────────────────────────────────────────────────────

  static async _locationTypes(company_id, transaction) {
    const rows = await db.store_location.findAll({ where: { company_id }, attributes: ['id', 'location_type'], transaction, raw: true });
    return new Map(rows.map((r) => [Number(r.id), r.location_type]));
  }

  static async _transitIds(company_id, transaction) {
    const rows = await db.store_location.findAll({
      where: { company_id, location_type: IN_TRANSIT },
      attributes: ['id'],
      transaction,
      raw: true,
    });
    return new Set(rows.map((r) => Number(r.id)));
  }

  /** Signed in-transit contribution of one row (only rows at an in-transit location count). */
  static _inTransitSigned(row, transitIds) {
    if (!row.location_id || !transitIds.has(Number(row.location_id))) return 0;
    const s = LOCATION_SIGN[row.movement_type];
    return s ? s * Number(row.quantity) : 0;
  }

  static async _locationBalance(company_id, project_id, material_id, location_id, transaction) {
    const rows = await db.stock_ledger.findAll({
      where: { company_id, project_id, material_id, location_id },
      transaction,
      raw: true,
    });
    return rows.reduce((s, r) => s + signedLocationQty(r), 0);
  }

  static async _transferInTransit(company_id, project_id, material_id, transfer_id, transaction) {
    const transit = await this._transitIds(company_id, transaction);
    const rows = await db.stock_ledger.findAll({
      where: { company_id, project_id, material_id, transfer_id },
      transaction,
      raw: true,
    });
    return rows.reduce((s, r) => s + this._inTransitSigned(r, transit), 0);
  }

  static async _unlocated(company_id, project_id, stockRecord, transaction) {
    const counterAvailable = Number(stockRecord.stockIn || 0) - Number(stockRecord.stockUsed || 0);
    const rows = await db.stock_ledger.findAll({
      where: { company_id, project_id, material_id: stockRecord.id },
      transaction,
      raw: true,
    });
    const placed = rows.reduce((s, r) => s + signedLocationQty(r), 0);
    return counterAvailable - placed;
  }
}

module.exports = StockLedgerService;
