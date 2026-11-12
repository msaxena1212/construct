'use strict';
const express = require('express');
const router = express.Router();
const VariationOrderController = require('../controllers/variation_order.controller');
const requireProjectAccess = require('../../../core/middleware/project_access.middleware');

// Variation orders router (mounted at /api/v1/variation-orders)
router.post('/', requireProjectAccess, VariationOrderController.createVariationOrder);
router.get('/project/:projectId', requireProjectAccess, VariationOrderController.listVariationOrders);
router.get('/project/:projectId/summary', requireProjectAccess, VariationOrderController.getVariationSummary);
router.get('/:id', VariationOrderController.getVariationOrderById);
router.put('/:id/submit', VariationOrderController.submitVariationOrder);
router.put('/:id/technical-review', VariationOrderController.technicalReview);
router.put('/:id/commercial-review', VariationOrderController.commercialReview);
router.put('/:id/budget-review', VariationOrderController.budgetReview);
router.put('/:id/approve', VariationOrderController.approveVariationOrder);
router.put('/:id/implement', VariationOrderController.implementVariationOrder);
router.put('/:id/reject', VariationOrderController.rejectVariationOrder);
router.put('/:id/withdraw', VariationOrderController.withdrawVariationOrder);

module.exports = router;
