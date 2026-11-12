'use strict';
const express = require('express');
const checkPermission = require('../../../core/middleware/permission.middleware');
const ctrl = require('../controllers/stock_transfer.controller');

/**
 * Stock transfer routes (INV-LOC-01, INV-TRF-01..06).
 * RBAC module path: `stock-transfer`. The module row must be seeded in each environment before use.
 * Mapping: read = can_read; request/submit/approve/check-out/check-in/shortage = can_update;
 * write-off and dispatch reversal are exceptional and require can_delete.
 */
const router = express.Router();
const M = 'stock-transfer';

router.get('/locations', checkPermission(M, 'can_read'), ctrl.listLocations);
router.post('/locations', checkPermission(M, 'can_create'), ctrl.createLocation);

router.post('/placements', checkPermission(M, 'can_update'), ctrl.placeStock);
router.get('/in-transit', checkPermission(M, 'can_read'), ctrl.listInTransit);
router.get('/', checkPermission(M, 'can_read'), ctrl.listTransfers);
router.post('/', checkPermission(M, 'can_create'), ctrl.createTransfer);
router.get('/reconciliation', checkPermission(M, 'can_read'), ctrl.getReconciliation);
router.get('/:id', checkPermission(M, 'can_read'), ctrl.getTransfer);
router.get('/:id/history', checkPermission(M, 'can_read'), ctrl.getHistory);

router.put('/:id/submit', checkPermission(M, 'can_update'), ctrl.submitTransfer);
router.put('/:id/approve', checkPermission(M, 'can_update'), ctrl.approveTransfer);
router.put('/:id/reject', checkPermission(M, 'can_update'), ctrl.rejectTransfer);
router.put('/:id/cancel', checkPermission(M, 'can_update'), ctrl.cancelTransfer);

router.post('/:id/checkout', checkPermission(M, 'can_update'), ctrl.checkOut);
router.post('/:id/checkin', checkPermission(M, 'can_update'), ctrl.checkIn);
router.post('/:id/shortages', checkPermission(M, 'can_update'), ctrl.declareShortage);
router.post('/:id/reverse', checkPermission(M, 'can_delete'), ctrl.reverseDispatch);
router.post('/shortages/:discrepancyId/write-off', checkPermission(M, 'can_delete'), ctrl.writeOffShortage);

module.exports = router;
