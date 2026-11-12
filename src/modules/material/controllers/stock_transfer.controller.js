'use strict';
const db = require('../../../models');
const StockTransferService = require('../services/stock_transfer.service');
const { assertProjectAccess, handleAccessError, isSuperAdminUser } = require('../../../core/utils/access');

const StockLedgerService = require('../../../core/services/stock_ledger.service');

const { StockError } = StockLedgerService;

const STATUS_BY_CODE = {
  VALIDATION: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  STATE: 409,
  CONFLICT: 409,
  INSUFFICIENT_STOCK: 409,
  UOM_MISMATCH: 400,
  WHOLE_UNIT_REQUIRED: 400,
  PRECISION_UNSUPPORTED: 422,
};

/** Maps service errors to HTTP responses without leaking internals. */
function sendError(res, err, label) {
  if (err instanceof StockError) {
    return res.status(STATUS_BY_CODE[err.code] || 400).json({ status: 'failed', code: err.code, message: err.message });
  }
  if (handleAccessError(err, res)) return undefined;
  console.error(`[stock-transfer] ${label}:`, err && err.message);
  return res.status(500).json({ status: 'failed', message: `Error ${label}.` });
}

/** Loads the transfer header (company scoped) and enforces project access before any action. */
async function scopeTransfer(req, id) {
  const transfer = await db.stock_transfer.findOne({
    where: { id: Number(id), company_id: req.user.company_id },
    attributes: ['id', 'project_id'],
    raw: true,
  });
  if (!transfer) throw new StockError('NOT_FOUND', 'Transfer not found.');
  await assertProjectAccess(req, transfer.project_id);
  return transfer;
}

const actorOf = (req) => ({ id: req.user.id, is_super_admin: isSuperAdminUser(req.user) });

/** Runs a service call with uniform scoping and error mapping. */
function handle(label, run, status = 200) {
  return async (req, res) => {
    try {
      const data = await run(req);
      return res.status(status).json({ status: 'success', ...data });
    } catch (err) {
      return sendError(res, err, label);
    }
  };
}

module.exports = {
  createLocation: handle('creating location', async (req) => {
    await assertProjectAccess(req, req.body.project_id);
    const location = await StockTransferService.createLocation(req.user.company_id, actorOf(req), req.body);
    return { message: 'Location created.', data: location };
  }, 201),

  listLocations: handle('listing locations', async (req) => {
    if (req.query.project_id) await assertProjectAccess(req, req.query.project_id);
    return { data: await StockTransferService.listLocations(req.user.company_id, req.query.project_id) };
  }),

  placeStock: handle('placing stock', async (req) => {
    await assertProjectAccess(req, req.body.project_id);
    const result = await StockTransferService.placeStock(req.user.company_id, actorOf(req), req.body);
    return { message: result.already_processed ? 'Placement already processed.' : 'Stock placed in location.', already_processed: result.already_processed, data: result.entry };
  }, 201),

  createTransfer: handle('creating transfer', async (req) => {
    await assertProjectAccess(req, await projectOfLocation(req, req.body.source_location_id));
    const data = await StockTransferService.createTransfer(req.user.company_id, actorOf(req), req.body);
    return { message: 'Transfer request created.', data };
  }, 201),

  listTransfers: handle('listing transfers', async (req) => {
    if (req.query.project_id) await assertProjectAccess(req, req.query.project_id);
    return { data: await StockTransferService.listTransfers(req.user.company_id, req.query) };
  }),

  listInTransit: handle('listing in-transit transfers', async (req) => {
    if (req.query.project_id) await assertProjectAccess(req, req.query.project_id);
    return { data: await StockTransferService.listInTransit(req.user.company_id, req.query.project_id) };
  }),

  /** Read-only ledger reconciliation for one material: balances by location type, in-transit, and consistency. */
  getReconciliation: handle('loading reconciliation', async (req) => {
    const projectId = Number(req.query.project_id);
    const materialId = Number(req.query.material_id);
    if (!Number.isSafeInteger(projectId) || !Number.isSafeInteger(materialId)) {
      throw new StockError('VALIDATION', 'project_id and material_id are required integers.');
    }
    await assertProjectAccess(req, projectId);
    return { data: await StockLedgerService.getReconciliation(req.user.company_id, projectId, materialId) };
  }),

  getTransfer: handle('loading transfer', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { data: await StockTransferService.getTransfer(req.user.company_id, t.id) };
  }),

  getHistory: handle('loading transfer history', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { data: await StockTransferService.getHistory(req.user.company_id, t.id) };
  }),

  submitTransfer: handle('submitting transfer', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { message: 'Transfer submitted.', data: await StockTransferService.submitTransfer(req.user.company_id, actorOf(req), t.id) };
  }),

  approveTransfer: handle('approving transfer', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { message: 'Transfer approved.', data: await StockTransferService.approveTransfer(req.user.company_id, actorOf(req), t.id, req.body) };
  }),

  rejectTransfer: handle('rejecting transfer', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { message: 'Transfer rejected.', data: await StockTransferService.rejectTransfer(req.user.company_id, actorOf(req), t.id, req.body) };
  }),

  cancelTransfer: handle('cancelling transfer', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { message: 'Transfer cancelled.', data: await StockTransferService.cancelTransfer(req.user.company_id, actorOf(req), t.id, req.body) };
  }),

  checkOut: handle('checking out transfer', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    const result = await StockTransferService.checkOut(req.user.company_id, actorOf(req), t.id, req.body);
    return { message: result.already_processed ? 'Check-out already processed.' : 'Check-out recorded.', already_processed: result.already_processed, data: result.transfer };
  }),

  checkIn: handle('checking in transfer', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    const result = await StockTransferService.checkIn(req.user.company_id, actorOf(req), t.id, req.body);
    return { message: result.already_processed ? 'Check-in already processed.' : 'Check-in recorded.', already_processed: result.already_processed, data: result.transfer };
  }),

  declareShortage: handle('declaring shortage', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { message: 'Shortage declared for review.', data: await StockTransferService.declareShortage(req.user.company_id, actorOf(req), t.id, req.body) };
  }, 201),

  writeOffShortage: handle('writing off shortage', async (req) => {
    const disc = await db.stock_transfer_discrepancy.findOne({
      where: { id: Number(req.params.discrepancyId), company_id: req.user.company_id },
      attributes: ['transfer_id'],
      raw: true,
    });
    if (!disc) throw new StockError('NOT_FOUND', 'Discrepancy not found.');
    await scopeTransfer(req, disc.transfer_id);
    return { message: 'Shortage written off.', data: await StockTransferService.writeOffShortage(req.user.company_id, actorOf(req), req.params.discrepancyId, req.body) };
  }),

  reverseDispatch: handle('reversing dispatch', async (req) => {
    const t = await scopeTransfer(req, req.params.id);
    return { message: 'Dispatch reversed to source.', data: await StockTransferService.reverseDispatch(req.user.company_id, actorOf(req), t.id, req.body) };
  }),
};

/** Resolves the project of a source location, restricted to the caller's company. */
async function projectOfLocation(req, locationId) {
  const loc = await db.store_location.findOne({
    where: { id: Number(locationId), company_id: req.user.company_id },
    attributes: ['project_id'],
    raw: true,
  });
  if (!loc) throw new StockError('NOT_FOUND', 'Source location not found.');
  return loc.project_id;
}
