'use strict';
/**
 * Agent endpoints, mounted at /api/v1/agents.
 *   GET  /status                       model provider, model name and whether it answers
 *   POST /:projectId/run               run every agent now (creates follow-up tasks; repeats create none)
 *   GET  /:projectId/log               the agent log: actions, runs and briefings
 *   GET  /:projectId/india-compliance  India checks: GSTIN, PAN, TDS, GST, cash and labour flags
 */
const express = require('express');
const checkPermission = require('../../../core/middleware/permission.middleware');
const controller = require('../controllers/agents.controller');

const router = express.Router();

router.get('/status', checkPermission('projects', 'can_read'), controller.modelStatus);
router.get('/roster', checkPermission('projects', 'can_read'), controller.roster);
router.get('/briefings/daily', checkPermission('projects', 'can_read'), controller.dailyPortfolioBriefings);
router.post('/run-all', checkPermission('projects', 'can_update'), controller.runAll);
router.post('/:projectId/run', checkPermission('projects', 'can_update'), controller.run);
router.get('/:projectId/log', checkPermission('projects', 'can_read'), controller.log);
router.get('/:projectId/insights', checkPermission('projects', 'can_read'), controller.insights);
router.get('/:projectId/eac-forecast', checkPermission('projects', 'can_read'), controller.eacForecast);
router.get('/:projectId/briefings', checkPermission('projects', 'can_read'), controller.listBriefings);
router.post('/:projectId/briefings/run', checkPermission('projects', 'can_update'), controller.runBriefing);
router.get('/:projectId/vlm-inspections', checkPermission('projects', 'can_read'), controller.vlmInspections);
router.get('/:projectId/india-compliance', checkPermission('projects', 'can_read'), controller.indiaCompliance);

module.exports = router;
