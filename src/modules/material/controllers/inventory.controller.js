'use strict';
const InventoryService = require('../services/inventory.service');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');
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

function sendError(res, err, label) {
  if (err instanceof StockError) {
    return res.status(STATUS_BY_CODE[err.code] || 400).json({ status: 'failed', code: err.code, message: err.message });
  }
  if (handleAccessError(err, res)) return undefined;
  console.error(`[inventory] ${label}:`, err && err.message);
  return res.status(500).json({ status: 'failed', message: `Error ${label}.` });
}

const actorOf = (req) => ({ id: req.user.id });

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
  balances: handle('loading inventory balances', async (req) => {
    await assertProjectAccess(req, req.query.project_id);
    return { data: await InventoryService.balances(req.user.company_id, req.query.project_id) };
  }),

  receive: handle('recording receipt', async (req) => {
    await assertProjectAccess(req, req.body.project_id);
    const result = await InventoryService.receive(req.user.company_id, actorOf(req), req.body);
    return {
      message: result.already_processed ? 'Receipt already recorded; nothing posted.' : 'Receipt recorded.',
      already_processed: result.already_processed,
      data: result.entry,
    };
  }, 201),

  issue: handle('recording issue', async (req) => {
    await assertProjectAccess(req, req.body.project_id);
    const result = await InventoryService.issue(req.user.company_id, actorOf(req), req.body);
    return {
      message: result.already_processed ? 'Issue already recorded; nothing posted.' : 'Material issued.',
      already_processed: result.already_processed,
      data: result.entry,
    };
  }, 201),

  movements: handle('loading movements', async (req) => {
    await assertProjectAccess(req, req.query.project_id);
    return { data: await InventoryService.movements(req.user.company_id, req.query.project_id, req.query.material_id, req.query.limit) };
  }),
};
