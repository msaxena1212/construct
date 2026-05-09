const express = require('express');
const router = express.Router();
const ctrl = require('../controller/labor_controller');

// ── Dashboard (all-in-one) ────────────────────────────────
// GET /api/v1/labor/dashboard?company_id=1[&vendor_id=2]
router.get('/dashboard', ctrl.getDashboard);

// ── Contractor Performance Vault ──────────────────────────
// GET   /api/v1/labor/contractor-metrics?company_id=1[&vendor_id=2]
router.get('/contractor-metrics', ctrl.getContractorMetrics);

// PATCH /api/v1/labor/contractor-metrics/:id
router.patch('/contractor-metrics/:id', ctrl.updateContractorMetric);

// ── Labor Stats (KPI cards + skills + financials) ─────────
// GET /api/v1/labor/stats?company_id=1
router.get('/stats', ctrl.getLaborStats);

// ── Productivity Heatmap ──────────────────────────────────
// GET /api/v1/labor/heatmap?company_id=1
router.get('/heatmap', ctrl.getHeatmap);

// ── Active Pulse / Shift Activity ────────────────────────
// GET /api/v1/labor/shift-activity?company_id=1[&vendor_id=2&worker_id=uuid]
router.get('/shift-activity', ctrl.getShiftActivity);

// ── Reports Vault ─────────────────────────────────────────
// GET  /api/v1/labor/reports?company_id=1[&status=Published&type=Safety]
router.get('/reports', ctrl.getReports);

// POST /api/v1/labor/reports
// body: { company_id, title, type, author }
router.post('/reports', ctrl.createReport);

// ── Vendors (for filter dropdown) ────────────────────────
// GET /api/v1/labor/vendors?company_id=1
router.get('/vendors', ctrl.getVendors);

module.exports = router;