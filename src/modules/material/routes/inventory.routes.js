'use strict';
const express = require('express');
const checkPermission = require('../../../core/middleware/permission.middleware');
const ctrl = require('../controllers/inventory.controller');

/**
 * Project inventory routes. RBAC module path: `inventory` (seed per environment).
 * Reads need can_read; receipts and issues need can_create; both are ordinary stock operations.
 */
const router = express.Router();
const M = 'inventory';

router.get('/balances', checkPermission(M, 'can_read'), ctrl.balances);
router.get('/movements', checkPermission(M, 'can_read'), ctrl.movements);
router.post('/receipts', checkPermission(M, 'can_create'), ctrl.receive);
router.post('/issues', checkPermission(M, 'can_create'), ctrl.issue);

module.exports = router;
