'use strict';
const express = require('express');
const router = express.Router();
const budgetWBSCtrl = require('../controllers/budget_wbs.controller');
const budgetItemsCtrl = require('../controllers/budget_items.controller');
const checkPermission = require('../../../core/middleware/permission.middleware');
const requireProjectAccess = require('../../../core/middleware/project_access.middleware');

router.use(requireProjectAccess);
router.param('projectId', requireProjectAccess.param);

// WBS Endpoints
router.post('/wbs', checkPermission('projects', 'can_create'), budgetWBSCtrl.createWBS);
router.get('/wbs/project/:projectId', checkPermission('projects', 'can_read'), budgetWBSCtrl.getProjectWBS);
router.put('/wbs/:id', checkPermission('projects', 'can_update'), budgetWBSCtrl.updateWBS);

// CBS Endpoints (Company level)
router.post('/cbs', checkPermission('projects', 'can_create'), budgetWBSCtrl.createCBS);
router.get('/cbs', checkPermission('projects', 'can_read'), budgetWBSCtrl.getCompanyCBS);

// Project Budget Endpoints
router.post('/budgets', checkPermission('projects', 'can_create'), budgetWBSCtrl.createBudget);
router.put('/budgets/:id/approve', checkPermission('projects', 'can_update'), budgetWBSCtrl.approveBudget);
router.get('/budgets/project/:projectId', checkPermission('projects', 'can_read'), budgetWBSCtrl.getBudgetRevisions);

// Feature: item-wise budget allocation (budget heads) at budget creation
router.post('/item-allocations', checkPermission('projects', 'can_create'), budgetItemsCtrl.createItemBudget);

// Batch N: Project Budget Head Endpoints
router.post('/budget-heads', checkPermission('projects', 'can_create'), budgetWBSCtrl.createBudgetHead);
router.get('/budget-heads/project/:projectId', checkPermission('projects', 'can_read'), budgetWBSCtrl.getProjectBudgetHeads);
router.put('/budget-heads/:id', checkPermission('projects', 'can_update'), budgetWBSCtrl.updateBudgetHead);
router.delete('/budget-heads/:id', checkPermission('projects', 'can_delete'), budgetWBSCtrl.deleteBudgetHead);

// BOQ Mapping Endpoint
router.post('/boq/link-wbs', checkPermission('projects', 'can_update'), budgetWBSCtrl.linkBOQToWBS);

// Batch M: Project Financial Reconciliation View
router.get(
  '/reconciliation/project/:projectId',
  checkPermission('projects', 'can_read'),
  budgetWBSCtrl.getProjectCostReconciliation
);

// Batch Q: Project Cost Ledger Endpoints
router.post('/cost-ledger', checkPermission('projects', 'can_create'), budgetWBSCtrl.recordActualCost);
router.post('/cost-ledger/:id/reverse', checkPermission('projects', 'can_update'), budgetWBSCtrl.reverseActualCost);

module.exports = router;
