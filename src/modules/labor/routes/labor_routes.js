const express = require('express');
const router = express.Router();
const ctrl = require('../controller/labor_controller');

router.get('/dashboard', ctrl.getDashboard);
router.get('/contractor-metrics', ctrl.getContractorMetrics);
router.get('/shift-activity', ctrl.getShiftActivity);
router.get('/vendors', ctrl.getVendors);

router.post('/', ctrl.createLabor);
router.patch('/:id', ctrl.updateLabor);
router.delete('/:id', ctrl.deleteLabor);

module.exports = router;