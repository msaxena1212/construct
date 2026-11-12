const express = require('express');
const router = express.Router();
const requireProjectAccess = require('../../../core/middleware/project_access.middleware');
const checkPermission = require('../../../core/middleware/permission.middleware');
const measurementBillingController = require('../controllers/measurement_billing.controller');

router.use(requireProjectAccess);
router.param('projectId', requireProjectAccess.param);

// Contractor RA Bills endpoints
router.get(
  '/project/:projectId',
  checkPermission('projects', 'can_read'),
  measurementBillingController.getContractorRaBills
);

router.get(
  '/:id',
  checkPermission('projects', 'can_read'),
  measurementBillingController.getContractorRaBillById
);

router.post(
  '/',
  checkPermission('projects', 'can_create'),
  measurementBillingController.createContractorRaBill
);

router.post(
  '/:id/approve',
  checkPermission('projects', 'can_update'),
  measurementBillingController.approveContractorRaBill
);

module.exports = router;
