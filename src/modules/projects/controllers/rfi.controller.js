'use strict';

const db = require('../../../models');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    if (err.status) return res.status(err.status).json({ success: false, message: err.message });
    console.error('[rfi]', err);
    return res.status(500).json({ success: false, message: 'Could not complete RFI operation.' });
  }
};

const companyOf = (req) => req.user.company_id;
const projectOf = (req) => Number(req.params.projectId);

function parseMeta(meta) {
  if (!meta) return {};
  if (typeof meta === 'object') return meta;
  try {
    return JSON.parse(meta);
  } catch (e) {
    return {};
  }
}

exports.listRFIs = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const historyRows = await db.project_history.findAll({
    where: {
      project_id: projectId,
      company_id: companyId,
      action_type: 'RFI_RECORD',
    },
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
  });

  let data = historyRows.map((r) => {
    const meta = parseMeta(r.meta);
    return {
      id: r.id,
      project_id: r.project_id,
      rfi_number: meta.rfi_number || `RFI-${r.id}`,
      subject: meta.subject || r.detail,
      question: meta.question || '',
      proposed_solution: meta.proposed_solution || '',
      discipline: meta.discipline || 'Structural',
      priority: meta.priority || 'medium',
      status: meta.status || 'submitted',
      cost_impact: Boolean(meta.cost_impact),
      schedule_impact: Boolean(meta.schedule_impact),
      estimated_cost_impact: Number(meta.estimated_cost_impact) || 0,
      schedule_impact_days: Number(meta.schedule_impact_days) || 0,
      drawing_reference: meta.drawing_reference || '',
      spec_reference: meta.spec_reference || '',
      ai_draft_response: meta.ai_draft_response || '',
      response: meta.response || null,
      answered_at: meta.answered_at || null,
      createdAt: r.createdAt,
    };
  });

  if (req.query.status) data = data.filter((x) => x.status === req.query.status);
  if (req.query.discipline) data = data.filter((x) => x.discipline === req.query.discipline);
  if (req.query.priority) data = data.filter((x) => x.priority === req.query.priority);

  return res.status(200).json({ success: true, data });
});

exports.getRFIById = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const entry = await db.project_history.findOne({
    where: { id: req.params.rfiId, project_id: projectId, company_id: companyId, action_type: 'RFI_RECORD' },
  });
  if (!entry) return res.status(404).json({ success: false, message: 'RFI not found.' });

  const meta = parseMeta(entry.meta);
  return res.status(200).json({
    success: true,
    data: { id: entry.id, project_id: entry.project_id, ...meta, createdAt: entry.createdAt },
  });
});

exports.createRFI = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const count = await db.project_history.count({
    where: { project_id: projectId, action_type: 'RFI_RECORD' },
  });

  const year = new Date().getFullYear();
  const discCode = (req.body.discipline || 'STR').slice(0, 3).toUpperCase();
  const rfiNumber = req.body.rfi_number || `RFI-${discCode}-${year}-${String(count + 1).padStart(3, '0')}`;

  const q = req.body.question || '';
  let draft = `AI Technical Draft: Cross-referenced with Indian Standard (IS) & NBC project parameters. `;
  if (q.toLowerCase().includes('rebar') || q.toLowerCase().includes('lap') || q.toLowerCase().includes('steel')) {
    draft += 'Verify minimum lap length of 50d per IS 456 Clause 26.2. Stagger splices by 1.3x lap length and maintain clear cover per structural schedule.';
  } else if (q.toLowerCase().includes('concrete') || q.toLowerCase().includes('grade') || q.toLowerCase().includes('cube')) {
    draft += 'Comply with IS 456 & IS 383 Zone II aggregate limits. Confirm slump test (75-100mm) prior to placement and retain 28-day test cubes.';
  } else if (q.toLowerCase().includes('pipe') || q.toLowerCase().includes('plumbing') || q.toLowerCase().includes('drain')) {
    draft += 'Maintain minimum 1:100 gradient with hydro-testing at 1.5x operating pressure before shaft closure.';
  } else {
    draft += 'Review latest Approved-For-Construction (AFC) drawing revision and confirm clash clearance before execution.';
  }

  const meta = {
    rfi_number: rfiNumber,
    subject: req.body.subject || 'Technical Clarification',
    question: q,
    proposed_solution: req.body.proposed_solution || '',
    discipline: req.body.discipline || 'Structural',
    priority: req.body.priority || 'medium',
    status: req.body.status || 'submitted',
    cost_impact: Boolean(req.body.cost_impact),
    schedule_impact: Boolean(req.body.schedule_impact),
    estimated_cost_impact: Number(req.body.estimated_cost_impact) || 0,
    schedule_impact_days: Number(req.body.schedule_impact_days) || 0,
    submitted_by: req.user.id,
    drawing_reference: req.body.drawing_reference || '',
    spec_reference: req.body.spec_reference || '',
    ai_draft_response: draft,
    response: null,
    answered_by: null,
    answered_at: null,
  };

  const entry = await db.project_history.create({
    project_id: projectId,
    company_id: companyId,
    user_id: req.user.id,
    action_type: 'RFI_RECORD',
    detail: `RFI ${rfiNumber} submitted: ${meta.subject}`,
    meta: JSON.stringify(meta),
  });

  return res.status(201).json({
    success: true,
    message: 'RFI created successfully.',
    data: { id: entry.id, project_id: projectId, ...meta, createdAt: entry.createdAt },
  });
});

exports.answerRFI = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const entry = await db.project_history.findOne({
    where: { id: req.params.rfiId, project_id: projectId, company_id: companyId, action_type: 'RFI_RECORD' },
  });
  if (!entry) return res.status(404).json({ success: false, message: 'RFI not found.' });

  const meta = parseMeta(entry.meta);
  meta.response = req.body.response;
  meta.status = 'answered';
  meta.answered_by = req.user.id;
  meta.answered_at = new Date().toISOString();

  entry.meta = JSON.stringify(meta);
  entry.detail = `RFI ${meta.rfi_number} answered: ${meta.subject}`;
  await entry.save();

  return res.status(200).json({
    success: true,
    message: 'RFI response recorded.',
    data: { id: entry.id, project_id: projectId, ...meta },
  });
});

exports.updateStatus = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const entry = await db.project_history.findOne({
    where: { id: req.params.rfiId, project_id: projectId, company_id: companyId, action_type: 'RFI_RECORD' },
  });
  if (!entry) return res.status(404).json({ success: false, message: 'RFI not found.' });

  const meta = parseMeta(entry.meta);
  if (req.body.status) meta.status = req.body.status;
  entry.meta = JSON.stringify(meta);
  await entry.save();

  return res.status(200).json({
    success: true,
    message: 'Status updated.',
    data: { id: entry.id, project_id: projectId, ...meta },
  });
});
