const express = require('express');
const router = express.Router();
const upload = require('../vendors/upload');

const vendorCtrl = require('../vendors/vendors_controller');
const invoiceCtrl = require('../vendors/vendors_invoice_controller');
const auditCtrl = require('../vendors/vendors_audit_controller');


router.get('/stats', vendorCtrl.getStats);


router.get('/:vendorId/invoices', invoiceCtrl.getInvoicesByVendor);
router.post('/:vendorId/invoices', invoiceCtrl.createInvoice);
router.put('/invoices/:id/status', invoiceCtrl.updateInvoiceStatus);
router.delete('/invoices/:id', invoiceCtrl.deleteInvoice);


router.get('/:vendorId/audits', auditCtrl.getAuditsByVendor);
router.post('/:vendorId/audits', auditCtrl.createAudit);


router.get('/', vendorCtrl.getAllVendors);
router.get('/:id', vendorCtrl.getVendorById);

router.post('/', (req, res, next) => {
  upload.array('contractFiles', 10)(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, vendorCtrl.createVendor);

router.put('/:id', vendorCtrl.updateVendor);
router.delete('/:id', vendorCtrl.deleteVendor);

module.exports = router;