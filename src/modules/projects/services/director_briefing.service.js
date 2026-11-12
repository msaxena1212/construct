'use strict';

/**
 * Scheduled & On-Demand Morning Director Briefings.
 * Synthesizes EVM/EAC cost-slippage forecasts, HSE/VLM PPE hazards, RFIs,
 * approvals ageing, bank guarantees, and India statutory flags into a structured
 * daily executive briefing persisted in PROJECT_HISTORY (`DIRECTOR_BRIEFING`).
 */
const db = require('../../../models');
const controls = require('./project_controls.service');
const compliance = require('./india_compliance.service');
const eacForecast = require('./eac_forecast.service');
const aiService = require('../../../core/services/ai.service');
const { inr } = require('./india_compliance.service');

const BRIEFING_TYPE = 'DIRECTOR_BRIEFING';

function safeParse(text) {
  try {
    return typeof text === 'string' ? JSON.parse(text) : text;
  } catch {
    return null;
  }
}

async function generateDirectorBriefing({
  company_id,
  project_id,
  user_id = null,
  withNarrative = true,
  scheduled = false,
  force = false,
  now = new Date(),
}) {
  const dateKey = now.toISOString().slice(0, 10);
  const morningKey = `morning:${project_id}:${dateKey}`;

  if (scheduled && !force) {
    const existingRows = await db.project_history.findAll({
      where: { company_id, project_id, action_type: BRIEFING_TYPE },
      order: [['id', 'DESC']],
      limit: 20,
    });
    const duplicate = existingRows.find((r) => {
      const m = safeParse(r.meta);
      return m && m.briefing_key === morningKey;
    });
    if (duplicate) {
      return { skipped: true, reason: 'already_generated_today', id: duplicate.id, ...(safeParse(duplicate.meta) || {}) };
    }
  }

  const project = await db.project.findOne({ where: { id: project_id, company_id } });
  if (!project) {
    const err = new Error('Project not found.');
    err.status = 404;
    throw err;
  }

  const [eac, approvals, guarantees, india, openSnags, historyRows] = await Promise.all([
    eacForecast.computeEacForecast({ company_id, project_id, status_date: now }),
    controls.approvalAgeing({ company_id, project_id, older_than_hours: 48, now }),
    controls.listGuarantees({ company_id, project_id, expiring_within_days: 30 }),
    compliance.indiaCompliance({ company_id, project_id, now }),
    db.snag_item.findAll({ where: { company_id, project_id, status: ['open', 'in_progress'], isDeleted: false } }),
    db.project_history.findAll({
      where: {
        company_id,
        project_id,
        action_type: ['SAFETY_INCIDENT', 'SAFETY_INCIDENT_REPORTED', 'TOOLBOX_TALK', 'RFI_RECORD', 'VLM_DPR_INSPECTION'],
      },
      order: [['createdAt', 'DESC']],
      limit: 100,
    }),
  ]);

  let openIncidents = 0;
  let toolboxTalksToday = 0;
  let openRfis = 0;
  let urgentRfis = 0;
  let vlmViolations = 0;

  for (const row of historyRows) {
    const m = safeParse(row.meta) || {};
    if (row.action_type === 'SAFETY_INCIDENT' || row.action_type === 'SAFETY_INCIDENT_REPORTED') {
      if (m.status !== 'closed') openIncidents += 1;
    } else if (row.action_type === 'TOOLBOX_TALK') {
      const talkDate = String(m.date || row.createdAt || '').slice(0, 10);
      if (talkDate === dateKey) toolboxTalksToday += 1;
    } else if (row.action_type === 'RFI_RECORD') {
      if (m.status === 'submitted' || m.status === 'under_review') {
        openRfis += 1;
        if (m.priority === 'urgent' || m.priority === 'high') urgentRfis += 1;
      }
    } else if (row.action_type === 'VLM_DPR_INSPECTION') {
      if (m.ppe_compliant === false && Array.isArray(m.ppe_violations)) {
        vlmViolations += m.ppe_violations.length;
      }
    }
  }

  const criticalSnags = openSnags.filter((s) => s.severity === 'critical' || s.severity === 'high').length;
  const indiaHighFlags = india.findings.filter((f) => f.severity === 'high').length;

  const actionItems = [];
  if (openIncidents > 0 || vlmViolations > 0) {
    actionItems.push({
      priority: 'critical',
      area: 'HSE & VLM Safety',
      message: `${openIncidents} open safety incident(s) and ${vlmViolations} VLM-detected PPE violation(s) require immediate site closure.`,
    });
  }
  if (eac.applicable && eac.vac_typical !== null && eac.vac_typical < 0) {
    actionItems.push({
      priority: eac.overrun_pct >= 10 ? 'critical' : 'high',
      area: 'EAC & Cost Forecast',
      message: `Projected EAC overrun of ${inr(Math.abs(eac.vac_typical))} (${eac.overrun_pct}% above BAC; CPI=${eac.cpi}, SPI=${eac.spi}, +${eac.projected_slippage_days}d slippage).`,
    });
  }
  if ((approvals.escalate_count || 0) > 0) {
    actionItems.push({
      priority: 'high',
      area: 'Approvals Queue',
      message: `${approvals.escalate_count} commercial approval(s) aged past 48 hours.`,
    });
  }
  if ((guarantees.expiring_count || 0) + (guarantees.expired_active_count || 0) > 0) {
    actionItems.push({
      priority: 'high',
      area: 'Bank Guarantees',
      message: `${guarantees.expired_active_count} expired-active and ${guarantees.expiring_count} expiring guarantee(s).`,
    });
  }
  if (urgentRfis > 0 || openRfis > 0) {
    actionItems.push({
      priority: urgentRfis > 0 ? 'high' : 'medium',
      area: 'Engineering RFIs',
      message: `${openRfis} open RFI(s) (${urgentRfis} urgent/high priority) awaiting consultant clarification.`,
    });
  }
  if (indiaHighFlags > 0) {
    actionItems.push({
      priority: 'high',
      area: 'Statutory Compliance',
      message: `${indiaHighFlags} high-severity India GST/TDS/BOCW compliance flag(s).`,
    });
  }
  if (toolboxTalksToday === 0) {
    actionItems.push({
      priority: 'medium',
      area: 'Daily Site Briefing',
      message: `No Toolbox Talk logged yet for ${dateKey}. Ensure site crew completes morning TBT before shift start.`,
    });
  }

  const headline =
    actionItems.length > 0
      ? `${project.name} (${dateKey}): ${actionItems[0].message}`
      : `${project.name} (${dateKey}): All cost, schedule, safety, and statutory controls on track.`;

  let narrative = null;
  let narrativeSource = 'not_requested';
  if (withNarrative) {
    try {
      const prompt =
        `Write a concise Morning Director Briefing (3-5 crisp sentences) for project "${project.name}" on ${dateKey}. ` +
        `Use ONLY these facts; format INR with Indian grouping if cited: ${JSON.stringify({
          headline,
          eac_applicable: eac.applicable,
          bac: eac.bac,
          eac_typical: eac.eac_typical,
          vac_typical: eac.vac_typical,
          cpi: eac.cpi,
          spi: eac.spi,
          projected_slippage_days: eac.projected_slippage_days,
          action_items: actionItems.slice(0, 5),
        })}`;
      const text = await aiService.generateCompletion({
        prompt,
        systemInstruction: '',
        responseFormat: 'text',
        temperature: 0.2,
        timeoutMs: 8000,
      });
      if (text && String(text).trim()) {
        narrative = String(text).trim();
        narrativeSource = 'ai';
      } else {
        narrativeSource = 'unavailable';
      }
    } catch {
      narrativeSource = 'unavailable';
    }
  }

  const payload = {
    briefing_key: morningKey,
    briefing_date: dateKey,
    project_id,
    project_name: project.name,
    scheduled,
    headline,
    narrative,
    narrative_source: narrativeSource,
    key_metrics: {
      cpi: eac.applicable ? eac.cpi : null,
      spi: eac.applicable ? eac.spi : null,
      eac_typical: eac.applicable ? eac.eac_typical : null,
      vac_typical: eac.applicable ? eac.vac_typical : null,
      projected_slippage_days: eac.applicable ? eac.projected_slippage_days : null,
      risk_rating: eac.applicable ? eac.risk_rating : 'Unrated',
      open_incidents: openIncidents,
      critical_snags: criticalSnags,
      vlm_ppe_violations: vlmViolations,
      open_rfis: openRfis,
      approvals_escalated: approvals.escalate_count || 0,
      india_high_flags: indiaHighFlags,
      toolbox_talks_today: toolboxTalksToday,
    },
    action_items: actionItems,
    generated_at: now.toISOString(),
  };

  const row = await db.project_history.create({
    company_id,
    project_id,
    user_id,
    action_type: BRIEFING_TYPE,
    detail: headline.slice(0, 500),
    meta: JSON.stringify(payload),
  });

  return { id: row.id, skipped: false, ...payload };
}

async function listDirectorBriefings({ company_id, project_id, limit = 14 }) {
  const rows = await db.project_history.findAll({
    where: { company_id, project_id, action_type: BRIEFING_TYPE },
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
    limit: Math.min(Math.max(Number(limit) || 14, 1), 60),
  });
  return rows.map((r) => {
    const meta = safeParse(r.meta) || {};
    return { id: r.id, at: r.createdAt, detail: r.detail, ...meta };
  });
}

async function getPortfolioDailyBriefings({ company_id, now = new Date() }) {
  const projects = await db.project.findAll({
    where: { company_id, isDeleted: false },
    attributes: ['id', 'name', 'status'],
    order: [['id', 'ASC']],
  });
  const dateKey = now.toISOString().slice(0, 10);
  const digests = [];
  for (const p of projects) {
    const latest = await db.project_history.findOne({
      where: { company_id, project_id: p.id, action_type: BRIEFING_TYPE },
      order: [['createdAt', 'DESC'], ['id', 'DESC']],
    });
    digests.push({
      project_id: p.id,
      project_name: p.name,
      project_status: p.status,
      briefing_date: dateKey,
      latest_briefing: latest ? { id: latest.id, at: latest.createdAt, ...(safeParse(latest.meta) || {}) } : null,
    });
  }
  return { date: dateKey, projects: digests.length, digests };
}

module.exports = {
  generateDirectorBriefing,
  listDirectorBriefings,
  getPortfolioDailyBriefings,
  BRIEFING_TYPE,
};
