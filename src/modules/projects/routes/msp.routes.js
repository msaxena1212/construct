'use strict';
const express = require('express');
const router = express.Router();
const checkPermission = require('../../../core/middleware/permission.middleware');
const requireProjectAccess = require('../../../core/middleware/project_access.middleware');
const mspController = require('../controllers/msp.controller');

router.use(requireProjectAccess);
router.param('projectId', requireProjectAccess.param);

// Feature: Microsoft Project interchange (MSPDI XML)
router.post(
  '/:projectId/import',
  checkPermission('projects', 'can_update'),
  mspController.uploadMiddleware,
  mspController.importProject
);
router.get('/:projectId/export', checkPermission('projects', 'can_read'), mspController.exportProject);

module.exports = router;
