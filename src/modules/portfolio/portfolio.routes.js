'use strict';
/**
 * Portfolio endpoints, mounted at /api/v1/portfolio. All read-only.
 *   GET /overview                       every project with earned value, risk score and RAG, plus portfolio totals
 *   GET /brief?narrative=1              findings across the portfolio; narrative=1 adds a model-written summary
 *   GET /cash-flow?weeks=13&terms_days=30[&project_id=]   weekly committed cash-out
 *   GET /vendors                        subcontractor and supplier scorecard
 *   GET /projects/:projectId/critical-path   critical path of the project's tasks
 */
const express = require('express');
const checkPermission = require('../../core/middleware/permission.middleware');
const { assertProjectAccess, listAccessibleProjectIds, handleAccessError } = require('../../core/utils/access');
const service = require('./portfolio.service');

const router = express.Router();
const canRead = checkPermission('projects', 'can_read');

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    if (err.status) return res.status(err.status).json({ success: false, message: err.message });
    console.error('[portfolio]', err);
    return res.status(500).json({ success: false, message: 'The portfolio view could not be built.' });
  }
};

/** Project ids in scope: the whole company (null), the caller's team projects, or one project the caller may open. */
async function scopeOf(req) {
  if (req.query.project_id !== undefined && req.query.project_id !== '') {
    const project = await assertProjectAccess(req, req.query.project_id);
    return [project.id];
  }
  return listAccessibleProjectIds(req);
}

router.get('/overview', canRead, handle(async (req, res) => {
  const data = await service.portfolioOverview({ company_id: req.user.company_id, project_ids: await scopeOf(req) });
  res.status(200).json({ success: true, data });
}));

router.get('/brief', canRead, handle(async (req, res) => {
  const data = await service.portfolioBrief({ company_id: req.user.company_id, project_ids: await scopeOf(req), narrative: req.query.narrative === '1' });
  res.status(200).json({ success: true, data });
}));

router.get('/cash-flow', canRead, handle(async (req, res) => {
  const data = await service.cashOutForecast({
    company_id: req.user.company_id,
    project_ids: await scopeOf(req),
    weeks: req.query.weeks,
    terms_days: req.query.terms_days,
  });
  res.status(200).json({ success: true, data });
}));

router.get('/vendors', canRead, handle(async (req, res) => {
  const data = await service.vendorScorecard({ company_id: req.user.company_id, project_ids: await scopeOf(req) });
  res.status(200).json({ success: true, data });
}));

router.get('/projects/:projectId/critical-path', canRead, handle(async (req, res) => {
  await assertProjectAccess(req, req.params.projectId);
  const data = await service.criticalPath({ company_id: req.user.company_id, project_id: Number(req.params.projectId) });
  res.status(200).json({ success: true, data });
}));

module.exports = router;
