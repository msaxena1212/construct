const express = require('express');
const router = express.Router();

const controller = require('../vendors/vendors_labor_controller');

router.get('/', controller.getAllLabor);
router.get('/vendor/:vendorId', controller.getLaborByVendor);
router.get('/:id', controller.getLaborById);
router.post('/', controller.createLabor);
router.put('/:id', controller.updateLabor);
router.delete('/:id', controller.deleteLabor);

module.exports = router;