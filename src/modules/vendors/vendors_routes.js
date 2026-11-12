const express = require('express');
const router = express.Router();
const upload = require('../vendors/upload');
const checkPermission = require("../../core/middleware/permission.middleware");
const vendorCtrl = require('../vendors/vendors_controller');
const invoiceCtrl = require('../vendors/vendors_invoice_controller');
const auditCtrl = require('../vendors/vendors_audit_controller');
const historyCtrl = require('../vendors/vendors_history_controller');
const paymentRequestCtrl = require('../vendors/vendors_payment_request_controller');

router.get('/stats', checkPermission("resources/vendors", "can_read"), vendorCtrl.getStats);

// ── Invoice routes ────────────────────────────────────────────────────────
router.get('/:vendorId/invoices', checkPermission("resources/vendors", "can_read"), invoiceCtrl.getInvoicesByVendor);
router.post('/:vendorId/invoices', checkPermission("resources/vendors", "can_create"), invoiceCtrl.createInvoice);
router.put('/:vendorId/invoices/:id/status', checkPermission("resources/vendors", "can_update"), invoiceCtrl.updateInvoiceStatus);
router.delete('/:vendorId/invoices/:id', checkPermission("resources/vendors", "can_delete"), invoiceCtrl.deleteInvoice);

// ── Vendors payment request routes ────────────────────────────────────────────────────────
router.post('/:vendorId/invoices/:invoiceId/payment-requests', checkPermission("resources/vendors", "can_create"), paymentRequestCtrl.createPaymentRequest);
router.get('/:vendorId/invoices/:invoiceId/payment-requests', checkPermission("resources/vendors", "can_read"), paymentRequestCtrl.getRequestsByInvoice);
// Three-way match report: every line's accepted, billed and remaining quantities, rates and exceptions. Read only.
router.get('/:vendorId/invoices/:invoiceId/three-way-match', checkPermission("resources/vendors", "can_read"), paymentRequestCtrl.getThreeWayMatch);

router.get('/payment-requests', checkPermission("resources/vendors", "can_read"), paymentRequestCtrl.getPaymentRequests);
router.put('/payment-requests/:requestId/approve', checkPermission("resources/vendors", "can_update"), paymentRequestCtrl.approvePaymentRequest);
router.put('/payment-requests/:requestId/reject', checkPermission("resources/vendors", "can_update"), paymentRequestCtrl.rejectPaymentRequest);
router.post('/payment-requests/:requestId/execute', checkPermission("resources/vendors", "can_update"), paymentRequestCtrl.executePayment);

// ── Vendors history routes ──────────────────────
router.get('/:vendorId/history', checkPermission("resources/vendors", "can_read"), historyCtrl.getVendorHistory);
router.get('/:vendorId/history/summary', checkPermission("resources/vendors", "can_read"), historyCtrl.getVendorHistorySummary);

// ── Audit routes ──────────────────────────────────────────────────────────
router.get('/:vendorId/audits', checkPermission("resources/vendors", "can_read"), auditCtrl.getAuditsByVendor);
router.post('/:vendorId/audits', checkPermission("resources/vendors", "can_create"), auditCtrl.createAudit);

// ── Vendor CRUD ───────────────────────────────────────────────────────────
router.get('/', checkPermission("resources/vendors", "can_read"), vendorCtrl.getAllVendors);
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