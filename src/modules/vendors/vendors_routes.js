const express = require('express');
const router = express.Router();
const upload = require('../vendors/upload');
const controller = require('../vendors/vendors_controller');

router.get('/stats', controller.getStats);

router.get('/', controller.getAllVendors);
router.get('/:id', controller.getVendorById);

router.post('/', (req, res, next) => {
  upload.single('contractFile')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, controller.createVendor);

router.put('/:id', controller.updateVendor);
router.delete('/:id', controller.deleteVendor);

module.exports = router;