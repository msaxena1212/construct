'use strict';
/**
 * Retention, defect liability period and bank guarantee endpoints. Mounted at /api/v1/project-controls.
 *   GET  /:projectId/retention                 retention held, released and outstanding per subcontractor, DLP state
 *   POST /:projectId/retention/releases        release retention after the DLP (body: vendor_id, amount, release_date, remarks)
 *   PUT  /:projectId/handover                  handover date and DLP length (body: handover_date, dlp_months)
 *   GET  /:projectId/guarantees                guarantee register with expiry flags (?expiring_within_days=30)
 *   POST /:projectId/guarantees                register a guarantee
 *   PUT  /guarantees/:id/status                release or invoke an active guarantee
 */
const express = require('express');
const checkPermission = require('../../../core/middleware/permission.middleware');
const controller = require('../controllers/project_controls.controller');

const router = express.Router();

router.get('/:projectId/retention', checkPermission('projects', 'can_read'), controller.getRetention);
router.post('/:projectId/retention/releases', checkPermission('projects', 'can_update'), controller.releaseRetention);
router.put('/:projectId/handover', checkPermission('projects', 'can_update'), controller.setHandover);
router.get('/:projectId/guarantees', checkPermission('projects', 'can_read'), controller.listGuarantees);
router.post('/:projectId/guarantees', checkPermission('projects', 'can_create'), controller.createGuarantee);
router.put('/guarantees/:id/status', checkPermission('projects', 'can_update'), controller.setGuaranteeStatus);
router.get('/:projectId/approvals/ageing', checkPermission('projects', 'can_read'), controller.getApprovalAgeing);
router.get('/:projectId/evm', checkPermission('projects', 'can_read'), controller.getEarnedValue);
router.get('/:projectId/briefing', checkPermission('projects', 'can_read'), controller.getBriefing);

module.exports = router;
