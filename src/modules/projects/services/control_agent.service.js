'use strict';
/**
 * Project control briefing. It reads the control figures (approval ageing, retention and defect liability, bank
 * guarantees, earned value), turns them into findings with a severity and a proposed next step, and can add a short
 * narrative written by the language model.
 *
 * Boundaries, by design:
 *   - Read only. A briefing changes no record. Agents that act are in control_agents.service.js.
 *   - Facts first. Every finding comes from a deterministic check and carries the figures it used.
 *   - The model writes only the narrative, and only from the findings. If it is slow, unreachable or returns nothing,
 *     the response says so (narrative_source) and the checked findings are still returned. Nothing is invented.
 */
const axios = require('axios');
const controls = require('./project_controls.service');
const { modelConfig, modelStatus } = require('../../../core/services/model_config');
const { inr } = require('./india_compliance.service');

const SEVERITY_ORDER = { high: 0, medium: 1, info: 2 };
const REASON_TEXT = {
  no_approved_budget: 'there is no approved budget',
  no_dated_milestones: 'no milestone has a start and an end date',
};

/**
 * Asks the model for a short narrative of the findings. Returns null on any failure, so the caller can report the
 * narrative as unavailable. A short timeout keeps a briefing from hanging while the model loads.
 */
async function narrate(findings, { timeoutMs = 8000 } = {}) {
  const cfg = modelConfig();
  const facts = findings.map((f) => ({ severity: f.severity, area: f.area, message: f.message }));
  const prompt =
    'Write a briefing for a construction project manager in three to five plain sentences. ' +
    'Use only the findings below and do not add any figure that is not in them. Write rupee amounts with Indian grouping, for example ₹8,50,000.\n' +
    `Findings: ${JSON.stringify(facts)}`;
  try {
    // Goes through the AI service so the configured fallback model is used if the primary cannot answer.
    const answer = await require('../../../core/services/ai.service').generateCompletion({
      prompt, systemInstruction: '', responseFormat: 'text', temperature: 0.2, timeoutMs,
    });
    const text = String(answer || '').trim();
    return text.length > 0 ? text : null;
  } catch (err) {
    return null;
  }
}

/**
 * Pure: turns the control figures into findings. Exported for tests.
 * @param {{ approvals: object, retention: object, guarantees: object, evm: object }} facts
 */
function findingsFrom({ approvals, retention, guarantees, evm }) {
  const findings = [];

  if (approvals.escalate_count > 0) {
    findings.push({
      severity: 'high',
      area: 'approvals',
      message: `${approvals.escalate_count} item(s) have waited at least ${approvals.older_than_hours} hours for approval.`,
      evidence: { waiting_count: approvals.waiting_count, escalate_count: approvals.escalate_count },
      proposed_action: 'Open the approvals queue and clear or reassign the oldest items.',
    });
  } else if (approvals.waiting_count > 0) {
    findings.push({
      severity: 'info',
      area: 'approvals',
      message: `${approvals.waiting_count} item(s) are waiting for approval, inside the escalation window.`,
      evidence: { waiting_count: approvals.waiting_count },
      proposed_action: 'No action yet.',
    });
  }

  const outstanding = Number(retention.total_outstanding || 0);
  if (outstanding > 0 && retention.dlp_ended) {
    findings.push({
      severity: 'medium',
      area: 'retention',
      message: `The defect liability period has ended and ${inr(outstanding)} of retention is outstanding.`,
      evidence: { total_outstanding: outstanding, dlp_end_date: retention.dlp_end_date },
      proposed_action: 'Review retention per subcontractor and release what is due. A release needs approval.',
    });
  } else if (outstanding > 0) {
    findings.push({
      severity: 'info',
      area: 'retention',
      message: `${inr(outstanding)} of retention is held until the defect liability period ends${retention.dlp_end_date ? ` on ${retention.dlp_end_date}` : ', and no handover date is recorded yet'}.`,
      evidence: { total_outstanding: outstanding, dlp_end_date: retention.dlp_end_date || null },
      proposed_action: retention.handover_date ? 'Nothing to do until the period ends.' : 'Record the handover date so the period can be tracked.',
    });
  }

  if (guarantees.expired_active_count > 0) {
    findings.push({
      severity: 'high',
      area: 'guarantees',
      message: `${guarantees.expired_active_count} bank guarantee(s) are past expiry but still marked active.`,
      evidence: { expired_active_count: guarantees.expired_active_count },
      proposed_action: 'Confirm each guarantee with the bank and mark it released or invoked.',
    });
  }
  if (guarantees.expiring_count > 0) {
    findings.push({
      severity: 'high',
      area: 'guarantees',
      message: `${guarantees.expiring_count} bank guarantee(s) expire within ${guarantees.expiring_within_days} days.`,
      evidence: { expiring_count: guarantees.expiring_count, active_total: guarantees.active_total },
      proposed_action: 'Ask the bank to renew, or confirm release before expiry.',
    });
  }

  if (evm.applicable) {
    if (evm.cpi !== null && evm.cpi < 0.9) {
      findings.push({
        severity: 'high',
        area: 'cost',
        message: `The cost performance index is ${evm.cpi}: the work earned is below the cost recognized so far.`,
        evidence: { ev: evm.ev, ac: evm.ac, cpi: evm.cpi },
        proposed_action: 'Review the largest cost lines against their budget heads.',
      });
    }
    if (evm.spi !== null && evm.spi < 0.9) {
      findings.push({
        severity: 'medium',
        area: 'schedule',
        message: `The schedule performance index is ${evm.spi}: progress is behind the plan.`,
        evidence: { ev: evm.ev, pv: evm.pv, spi: evm.spi },
        proposed_action: 'Review the milestones that are behind their dates.',
      });
    }
  } else {
    findings.push({
      severity: 'info',
      area: 'evm',
      message: `Earned value is not calculated because ${REASON_TEXT[evm.reason] || 'the inputs are missing'}.`,
      evidence: { reason: evm.reason },
      proposed_action: evm.reason === 'no_approved_budget' ? 'Approve the project budget.' : 'Give the milestones their start and end dates.',
    });
  }

  return findings.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
}

/** Short deterministic summary: the three most urgent findings, or a clear statement that there are none. */
function summaryFrom(findings) {
  const urgent = findings.filter((f) => f.severity !== 'info').slice(0, 3);
  if (urgent.length === 0) return 'No open control issues.';
  return urgent.map((f) => f.message).join(' ');
}

/**
 * Builds the briefing for one project. Read only.
 * @param {{ company_id: number, project_id: number, withNarrative?: boolean, now?: Date }} args
 */
async function buildBriefing({ company_id, project_id, withNarrative = false, now = new Date() }) {
  const approvals = await controls.approvalAgeing({ company_id, project_id, older_than_hours: 48, now });
  const retention = await controls.retentionSummary({ company_id, project_id });
  const guarantees = await controls.listGuarantees({ company_id, project_id, expiring_within_days: 30 });
  const evm = await controls.earnedValue({ company_id, project_id, status_date: now });

  const findings = findingsFrom({ approvals, retention, guarantees, evm });
  let narrative = null;
  let narrative_source = 'none';
  if (withNarrative) {
    narrative = await narrate(findings);
    narrative_source = narrative ? 'model' : 'unavailable';
  }
  return {
    project_id,
    generated_at: now.toISOString(),
    summary: summaryFrom(findings),
    findings,
    narrative,
    narrative_source,
    counts: {
      high: findings.filter((f) => f.severity === 'high').length,
      medium: findings.filter((f) => f.severity === 'medium').length,
      info: findings.filter((f) => f.severity === 'info').length,
    },
  };
}

module.exports = { buildBriefing, findingsFrom, summaryFrom, narrate, modelConfig, modelStatus };
