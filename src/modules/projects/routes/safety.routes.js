'use strict';

const express = require('express');
const router = express.Router();
const requireProjectAccess = require('../../../core/middleware/project_access.middleware');
const checkPermission = require('../../../core/middleware/permission.middleware');
const safetyController = require('../controllers/safety.controller');

router.use(requireProjectAccess);
router.param('projectId', requireProjectAccess.param);

router.get('/project/:projectId/summary', checkPermission('projects', 'can_read'), safetyController.getSafetySummary);
router.get('/project/:projectId/incidents', checkPermission('projects', 'can_read'), safetyController.listIncidents);
router.post('/project/:projectId/incidents', checkPermission('projects', 'can_create'), safetyController.createIncident);
router.put('/project/:projectId/incidents/:incidentId', checkPermission('projects', 'can_update'), safetyController.updateIncident);

router.get('/project/:projectId/toolbox-talks', checkPermission('projects', 'can_read'), safetyController.listToolboxTalks);
router.post('/project/:projectId/toolbox-talks', checkPermission('projects', 'can_create'), safetyController.createToolboxTalk);

module.exports = router;
