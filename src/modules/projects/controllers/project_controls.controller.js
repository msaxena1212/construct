'use strict';
/**
 * HTTP handlers for retention release, the defect liability period and the bank guarantee register.
 * Business rules live in services/project_controls.service.js.
 */
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');
const service = require('../services/project_controls.service');
const agent = require('../services/control_agent.service');

/** Runs a handler and maps tenant and service errors to responses. */
const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    if (err.status) {
      return res.status(err.status).json({ success: false, code: err.code, message: err.message });
    }
    console.error('[project-controls]', err);
    return res.status(500).json({ success: false, message: 'The request could not be completed.' });
  }
};

const companyOf = (req) => req.user.company_id;
const projectOf = (req) => Number(req.params.projectId);

exports.getRetention = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await service.retentionSummary({ company_id: companyOf(req), project_id: projectOf(req) });
  return res.status(200).json({ success: true, data });
});

exports.releaseRetention = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const { vendor_id, amount, release_date, remarks } = req.body || {};
  const release = await service.releaseRetention({
    company_id: companyOf(req),
    project_id: projectOf(req),
    vendor_id: Number(vendor_id),
    amount,
    release_date,
    remarks,
    released_by: req.user.id,
  });
  return res.status(201).json({ success: true, message: 'Retention released.', data: release });
});

exports.setHandover = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const { handover_date, dlp_months } = req.body || {};
  const project = await service.setHandover({
    company_id: companyOf(req),
    project_id: projectOf(req),
    handover_date,
    dlp_months,
  });
  return res.status(200).json({
    success: true,
    message: 'Handover date saved.',
    data: { project_id: project.id, handover_date: project.handover_date, dlp_months: project.dlp_months },
  });
});

exports.listGuarantees = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await service.listGuarantees({
    company_id: companyOf(req),
    project_id: projectOf(req),
    expiring_within_days: req.query.expiring_within_days ?? 30,
  });
  return res.status(200).json({ success: true, data });
});

exports.createGuarantee = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  // The body is spread first, so nothing in it can override the company, project or author.
  const guarantee = await service.createGuarantee({
    ...(req.body || {}),
    company_id: companyOf(req),
    project_id: projectOf(req),
    vendor_id: req.body?.vendor_id ? Number(req.body.vendor_id) : null,
    created_by: req.user.id,
  });
  return res.status(201).json({ success: true, message: 'Bank guarantee registered.', data: guarantee });
});

exports.getApprovalAgeing = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await service.approvalAgeing({
    company_id: companyOf(req),
    project_id: projectOf(req),
    older_than_hours: req.query.older_than_hours ?? 48,
  });
  return res.status(200).json({ success: true, data });
});

exports.getEarnedValue = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const statusDate = req.query.status_date ? new Date(req.query.status_date) : new Date();
  const data = await service.earnedValue({ company_id: companyOf(req), project_id: projectOf(req), status_date: statusDate });
  return res.status(200).json({ success: true, data });
});

// Briefing agent: read only. ?narrative=1 asks the local model for a short narrative; the findings are always checked.
exports.getBriefing = handle(async (req, res) => {
  await assertProjectAccess(req, projectOf(req));
  const data = await agent.buildBriefing({
    company_id: companyOf(req),
    project_id: projectOf(req),
    withNarrative: req.query.narrative === '1',
  });
  return res.status(200).json({ success: true, data });
});

exports.setGuaranteeStatus = handle(async (req, res) => {
  // Check the caller's access to the guarantee's project before anything is changed.
  const existing = await service.loadGuarantee({ company_id: companyOf(req), id: Number(req.params.id) });
  await assertProjectAccess(req, existing.project_id);
  const { status, remarks } = req.body || {};
  const guarantee = await service.setGuaranteeStatus({
    company_id: companyOf(req),
    id: Number(req.params.id),
    status,
    remarks,
  });
  return res.status(200).json({ success: true, message: `Guarantee ${guarantee.status}.`, data: guarantee });
});
