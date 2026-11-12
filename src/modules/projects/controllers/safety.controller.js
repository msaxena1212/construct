'use strict';

const db = require('../../../models');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    if (err.status) return res.status(err.status).json({ success: false, message: err.message });
    console.error('[safety]', err);
    return res.status(500).json({ success: false, message: 'Could not complete safety operation.' });
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

exports.getSafetySummary = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const historyRows = await db.project_history.findAll({
    where: {
      project_id: projectId,
      company_id: companyId,
      action_type: ['SAFETY_INCIDENT', 'SAFETY_INCIDENT_REPORTED', 'TOOLBOX_TALK'],
    },
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
  });

  const rawIncidents = [];
  const rawTalks = [];

  for (const row of historyRows) {
    const meta = parseMeta(row.meta);
    if (row.action_type === 'TOOLBOX_TALK') {
      rawTalks.push({
        id: row.id,
        talk_date: meta.talk_date || row.createdAt.toISOString().slice(0, 10),
        topic: meta.topic || row.detail,
        conductor_name: meta.conductor_name || 'HSE Officer',
        attendee_count: meta.attendee_count || 15,
        trade: meta.trade || 'Site Trades',
        key_points_discussed: meta.key_points_discussed || '',
        createdAt: row.createdAt,
      });
    } else {
      rawIncidents.push({
        id: row.id,
        incident_number: meta.incident_number || `INC-${row.id}`,
        incident_date: meta.incident_date || row.createdAt.toISOString().slice(0, 10),
        severity: meta.severity || 'near_miss',
        category: meta.category || 'General',
        title: meta.title || row.detail,
        location: meta.location || 'Site',
        description: meta.description || '',
        status: meta.status || 'open',
        corrective_action: meta.corrective_action || null,
        createdAt: row.createdAt,
      });
    }
  }

  // Also include high/critical severity snags from snag items as hazards
  const safetySnags = await db.snag_item.findAll({
    where: { project_id: projectId, company_id: companyId, severity: ['high', 'critical'] },
  });

  const counts = {
    total: rawIncidents.length + safetySnags.length,
    near_miss: rawIncidents.filter((i) => i.severity === 'near_miss').length,
    first_aid: rawIncidents.filter((i) => i.severity === 'first_aid').length,
    lost_time: rawIncidents.filter((i) => i.severity === 'lost_time').length,
    fatal: rawIncidents.filter((i) => i.severity === 'fatal').length,
    critical_snags: safetySnags.length,
    open: rawIncidents.filter((i) => i.status !== 'closed').length + safetySnags.filter((s) => s.status !== 'closed').length,
  };

  const lastLTI = rawIncidents.find((i) => i.severity === 'lost_time');
  const safeDays = lastLTI
    ? Math.max(0, Math.floor((Date.now() - new Date(lastLTI.incident_date).getTime()) / 86400000))
    : 142; // default safe days benchmark

  return res.status(200).json({
    success: true,
    data: {
      metrics: {
        safe_man_days_without_lti: safeDays,
        total_incidents: counts.total,
        open_hazards: counts.open,
        severity_breakdown: counts,
        toolbox_talks_conducted: rawTalks.length,
      },
      recent_incidents: rawIncidents.slice(0, 15),
      recent_talks: rawTalks.slice(0, 10),
    },
  });
});

exports.listIncidents = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const historyRows = await db.project_history.findAll({
    where: {
      project_id: projectId,
      company_id: companyId,
      action_type: ['SAFETY_INCIDENT', 'SAFETY_INCIDENT_REPORTED'],
    },
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
  });

  const list = historyRows.map((r) => {
    const meta = parseMeta(r.meta);
    return {
      id: r.id,
      incident_number: meta.incident_number || `INC-${r.id}`,
      incident_date: meta.incident_date || r.createdAt.toISOString().slice(0, 10),
      severity: meta.severity || 'near_miss',
      category: meta.category || 'General',
      title: meta.title || r.detail,
      location: meta.location || 'Site',
      description: meta.description || '',
      status: meta.status || 'open',
      corrective_action: meta.corrective_action || null,
      createdAt: r.createdAt,
    };
  });

  return res.status(200).json({ success: true, data: list });
});

exports.createIncident = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const existingCount = await db.project_history.count({
    where: { project_id: projectId, action_type: ['SAFETY_INCIDENT', 'SAFETY_INCIDENT_REPORTED'] },
  });

  const year = new Date().getFullYear();
  const incidentNumber = req.body.incident_number || `INC-${year}-${String(existingCount + 1).padStart(3, '0')}`;
  const severity = req.body.severity || 'near_miss';
  const category = req.body.category || 'General';
  const title = req.body.title || 'Safety observation';
  const location = req.body.location || 'Main Site';
  const description = req.body.description || '';
  const correctiveAction = req.body.corrective_action || null;
  const status = req.body.status || 'open';
  const incidentDate = req.body.incident_date || new Date().toISOString().slice(0, 10);

  const metaData = {
    incident_number: incidentNumber,
    incident_date: incidentDate,
    severity,
    category,
    title,
    location,
    description,
    corrective_action: correctiveAction,
    status,
    reported_by: req.user.id,
  };

  const entry = await db.project_history.create({
    project_id: projectId,
    company_id: companyId,
    user_id: req.user.id,
    action_type: 'SAFETY_INCIDENT',
    detail: `Safety incident ${incidentNumber} (${severity.toUpperCase()}): ${title}`,
    meta: JSON.stringify(metaData),
  });

  // If high or critical, link with a high-priority snag item for immediate site remediation
  if (severity === 'medical_treatment' || severity === 'lost_time' || severity === 'fatal') {
    await db.snag_item.create({
      project_id: projectId,
      company_id: companyId,
      title: `[HSE Hazard] ${title}`,
      description: `Auto-generated from safety incident ${incidentNumber}. Root cause inspection & corrective action required: ${description}`,
      location_pin: location,
      trade: category,
      severity: 'critical',
      status: 'open',
      due_date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Safety incident logged successfully.',
    data: { id: entry.id, ...metaData, createdAt: entry.createdAt },
  });
});

exports.updateIncident = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const entry = await db.project_history.findOne({
    where: { id: req.params.incidentId, project_id: projectId, company_id: companyId },
  });
  if (!entry) return res.status(404).json({ success: false, message: 'Incident record not found.' });

  const meta = parseMeta(entry.meta);
  if (req.body.status) meta.status = req.body.status;
  if (req.body.corrective_action) meta.corrective_action = req.body.corrective_action;
  if (req.body.root_cause) meta.root_cause = req.body.root_cause;

  entry.meta = JSON.stringify(meta);
  await entry.save();

  return res.status(200).json({ success: true, message: 'Incident updated successfully.', data: { id: entry.id, ...meta } });
});

exports.listToolboxTalks = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const historyRows = await db.project_history.findAll({
    where: { project_id: projectId, company_id: companyId, action_type: 'TOOLBOX_TALK' },
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
  });

  const list = historyRows.map((r) => {
    const meta = parseMeta(r.meta);
    return {
      id: r.id,
      talk_date: meta.talk_date || r.createdAt.toISOString().slice(0, 10),
      topic: meta.topic || r.detail,
      conductor_name: meta.conductor_name || 'HSE Officer',
      attendee_count: meta.attendee_count || 12,
      trade: meta.trade || 'All Trades',
      key_points_discussed: meta.key_points_discussed || '',
      feedback_or_hazards_raised: meta.feedback_or_hazards_raised || '',
      createdAt: r.createdAt,
    };
  });

  return res.status(200).json({ success: true, data: list });
});

exports.createToolboxTalk = handle(async (req, res) => {
  const projectId = projectOf(req);
  const companyId = companyOf(req);
  await assertProjectAccess(req, projectId);

  const meta = {
    talk_date: req.body.talk_date || new Date().toISOString().slice(0, 10),
    topic: req.body.topic || 'Daily Site Safety Briefing',
    conductor_name: req.body.conductor_name || `${req.user.firstname} ${req.user.lastname}`,
    attendee_count: Number(req.body.attendee_count) || 15,
    trade: req.body.trade || 'All Site Trades',
    key_points_discussed: req.body.key_points_discussed || '',
    feedback_or_hazards_raised: req.body.feedback_or_hazards_raised || '',
  };

  const entry = await db.project_history.create({
    project_id: projectId,
    company_id: companyId,
    user_id: req.user.id,
    action_type: 'TOOLBOX_TALK',
    detail: `Toolbox talk conducted: ${meta.topic} (${meta.attendee_count} attendees)`,
    meta: JSON.stringify(meta),
  });

  return res.status(201).json({
    success: true,
    message: 'Toolbox talk logged.',
    data: { id: entry.id, ...meta, createdAt: entry.createdAt },
  });
});
