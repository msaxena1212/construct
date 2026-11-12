const express = require('express');
const router = express.Router();
const requireProjectAccess = require('../../../core/middleware/project_access.middleware');
const checkPermission = require('../../../core/middleware/permission.middleware');
const measurementBillingController = require('../controllers/measurement_billing.controller');

router.use(requireProjectAccess);
router.param('projectId', requireProjectAccess.param);

// Measurement Book endpoints
router.get(
  '/project/:projectId',
  checkPermission('projects', 'can_read'),
  measurementBillingController.getMeasurementBooks
);

router.get(
  '/project/:projectId/certified-unbilled',
  checkPermission('projects', 'can_read'),
  measurementBillingController.getCertifiedUnbilledItems
);

router.get(
  '/:id',
  checkPermission('projects', 'can_read'),
  measurementBillingController.getMeasurementBookById
);

router.post(
  '/',
  checkPermission('projects', 'can_create'),
  measurementBillingController.createMeasurementBook
);

router.post(
  '/:id/items',
  checkPermission('projects', 'can_create'),
  measurementBillingController.addItem
);

router.post(
  '/:id/submit',
  checkPermission('projects', 'can_update'),
  measurementBillingController.submitMeasurementBook
);

router.post(
  '/:id/certify',
  checkPermission('projects', 'can_update'),
  measurementBillingController.certifyMeasurementBook
);

router.post(
  '/:id/reject',
  checkPermission('projects', 'can_update'),
  measurementBillingController.rejectMeasurementBook
);

module.exports = router;
