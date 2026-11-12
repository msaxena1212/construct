'use strict';
const procurementCtrl = require('../controllers/procurement.controller');
const checkPermission = require('../../../core/middleware/permission.middleware');

module.exports = (router) => {
  // Purchase Orders
  router.post(
    '/procurement/purchase-orders',
    checkPermission('resources/materials', 'can_create'),
    procurementCtrl.createPO
  );
  router.put(
    '/procurement/purchase-orders/:id/approve',
    checkPermission('resources/materials', 'can_update'),
    procurementCtrl.approvePO
  );

  // Goods Receipt Notes (GRN) with stock ledger posting
  router.post(
    '/procurement/goods-receipts',
    checkPermission('resources/materials', 'can_create'),
    procurementCtrl.createGRN
  );

  // 3-Way Matching
  router.get(
    '/procurement/match-invoice/:invoice_id',
    checkPermission('resources/vendors', 'can_read'),
    procurementCtrl.matchInvoice
  );
};
