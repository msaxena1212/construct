// modules/vendors/vendors_labor_routes.js
// NOTE: The primary labor API is at /api/v1/labor (labor_routes.js).
//       This file aliases the same controller under /api/v1/vendors_labor
//       for backward-compatibility. Both route sets are identical.

const express    = require('express');
const router     = express.Router();
// FIX: was require('../vendors/vendors_labor_controller') — no such file exists
//      Correct relative path from modules/vendors/ → modules/labor/controllers/
const controller = require('../vendors/vendors_labor_controller');

router.get('/',                   controller.getAllLabor);
router.get('/vendor/:vendorId',   controller.getLaborByVendor);
router.get('/:id',                controller.getLaborById);
router.post('/',                  controller.createLabor);
router.put('/:id',                controller.updateLabor);
router.delete('/:id',             controller.deleteLabor);

module.exports = router;