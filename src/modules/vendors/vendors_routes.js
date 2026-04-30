// routes/vendor.routes.js
const express    = require('express');
const router     = express.Router();
const upload     = require('../vendors/upload');
const controller = require('../vendors/vendors_controller');

/* ─────────────────────────────────────────
   VENDOR ROUTES
─────────────────────────────────────────

  GET    /api/vendors              → Sabhi vendors (filter: ?status=active)
  GET    /api/vendors/stats        → Dashboard stats (totalActive, pendingPayments, compliantPartners)
  GET    /api/vendors/:id          → Single vendor by ID
  POST   /api/vendors              → Naya vendor onboard karo (+ PDF upload)
  PUT    /api/vendors/:id          → Vendor update karo
  DELETE /api/vendors/:id          → Vendor delete karo

  GET    /api/activities           → Compliance & Billing activity list
  POST   /api/activities           → Activity manually add karo

───────────────────────────────────────── */

// ── Stats route PEHLE honi chahiye, warna :id se match ho jaayegi ──
router.get('/stats', controller.getStats);

// ── Vendor CRUD ──
router.get('/',     controller.getAllVendors);
router.get('/:id',  controller.getVendorById);

// POST me multer middleware: Angular form ka field name "contractFile"
router.post('/',
  upload.single('contractFile'),
  controller.createVendor
);

router.put('/:id',  controller.updateVendor);
router.delete('/:id', controller.deleteVendor);

module.exports = router;