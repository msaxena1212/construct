'use strict';

const express = require('express');
const router = express.Router();
const requireProjectAccess = require('../../../core/middleware/project_access.middleware');
const checkPermission = require('../../../core/middleware/permission.middleware');
const rfiController = require('../controllers/rfi.controller');

router.use(requireProjectAccess);
router.param('projectId', requireProjectAccess.param);

router.get('/project/:projectId', checkPermission('projects', 'can_read'), rfiController.listRFIs);
router.get('/project/:projectId/:rfiId', checkPermission('projects', 'can_read'), rfiController.getRFIById);
router.post('/project/:projectId', checkPermission('projects', 'can_create'), rfiController.createRFI);
router.put('/project/:projectId/:rfiId/answer', checkPermission('projects', 'can_update'), rfiController.answerRFI);
router.put('/project/:projectId/:rfiId/status', checkPermission('projects', 'can_update'), rfiController.updateStatus);

module.exports = router;
