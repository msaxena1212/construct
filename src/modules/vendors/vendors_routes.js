const express = require('express');
const router = express.Router();
const upload = require('../vendors/upload');
const controller = require('../vendors/vendors_controller');

router.get('/stats', controller.getStats);

router.get('/', controller.getAllVendors);
router.get('/:id', controller.getVendorById);

router.post('/',
  upload.single('contractFile'),
  controller.createVendor
);

router.put('/:id', controller.updateVendor);
router.delete('/:id', controller.deleteVendor);

module.exports = router;