const express = require('express');
const router = express.Router();
const controller = require('../vendors/vendors_controller');

router.get('/', controller.getActivities);
router.post('/', controller.createActivity);

module.exports = router;