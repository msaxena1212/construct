const express = require('express');
const router = express.Router();
const upload = require('../vendors/upload');
const checkPermission = require("../../core/middleware/permission.middleware");
const vendorCtrl = require('../vendors/vendors_controller');
const invoiceCtrl = require('../vendors/vendors_invoice_controller');
const auditCtrl = require('../vendors/vendors_audit_controller');
const historyCtrl = require('../vendors/vendors_history_controller');

router.get('/stats', vendorCtrl.getStats);

// ── History routes  ──────────────────────
router.get('/:vendorId/history', historyCtrl.getVendorHistory);
router.get('/:vendorId/history/summary', historyCtrl.getVendorHistorySummary);

// ── Invoice routes ────────────────────────────────────────────────────────
router.get('/:vendorId/invoices', invoiceCtrl.getInvoicesByVendor);
router.post('/:vendorId/invoices', invoiceCtrl.createInvoice);
router.put('/:vendorId/invoices/:id/status', invoiceCtrl.updateInvoiceStatus);
router.delete('/:vendorId/invoices/:id', invoiceCtrl.deleteInvoice);

// ── Audit routes ──────────────────────────────────────────────────────────
router.get('/:vendorId/audits', auditCtrl.getAuditsByVendor);
router.post('/:vendorId/audits', auditCtrl.createAudit);

// ── Vendor CRUD ───────────────────────────────────────────────────────────
router.get('/', vendorCtrl.getAllVendors);
router.get('/:id', checkPermission("resources/vendors", "can_read"), vendorCtrl.getVendorById);

router.post('/', (req, res, next) => {
  upload.array('contractFiles', 10)(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, checkPermission("resources/vendors", "can_create"), vendorCtrl.createVendor);

router.put('/:id', (req, res, next) => {
  upload.array('contractFiles', 10)(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, checkPermission("resources/vendors", "can_update"), vendorCtrl.updateVendor);

router.delete('/:id', checkPermission("resources/vendors", "can_delete"), vendorCtrl.deleteVendor);

module.exports = router;