'use strict';
/**
 * Agents for construction control. They act on the workflow and inform people. They do NOT approve, pay, release money,
 * change a guarantee, or send any message outside the ERP. Their actions are:
 *   - create a follow-up task in the project (with a priority, an owner and a due date), and
 *   - write a dated entry in the project history, so every action is visible and auditable.
 * Each action has a key. A key is recorded once, so the same finding on the next run creates nothing new.
 *
 * Agents:
 *   approval_chaser     pending approvals past the escalation window -> chase task with a reminder draft
 *   retention_watcher   retention due after the defect liability period -> release task per subcontractor
 *   guarantee_watcher   guarantees expiring soon, or past expiry but still active -> renewal or close-out task
 *   cost_watcher        earned value shows cost or schedule running behind -> recovery task
 *   india_compliance    GSTIN, PAN, TDS, cash and labour flags (see india_compliance.service.js) -> review task
 *   briefing            a dated briefing entry in the history, with the local model narrative when reachable
 */
const db = require('../../../models');
const controls = require('./project_controls.service');
const compliance = require('./india_compliance.service');
const briefingAgent = require('./control_agent.service');
const eacForecast = require('./eac_forecast.service');

const ACTION_TYPE = 'AGENT_ACTION';
const RUN_TYPE = 'AGENT_RUN';
const PRIORITY = { high: 'High Priority', medium: 'Medium Priority', info: 'Low Priority' };

/** The keys already recorded for this project, read from the history. */
async function recordedKeys(project_id) {
  const rows = await db.project_history.findAll({
    where: { project_id, action_type: ACTION_TYPE },
    attributes: ['meta'],
  });
  const keys = new Set();
  for (const r of rows) {
    const meta = typeof r.meta === 'string' ? safeParse(r.meta) : r.meta;
    if (meta && meta.key) keys.add(meta.key);
  }
  return keys;
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
}

/**
 * Creates a follow-up task unless its key is already recorded. Returns the outcome for the run report.
 * @param {object} ctx { company_id, project_id, user_id, keys }
 * @param {object} action { key, agent, title, description, priority, due_in_days, assign }
 */
/**
 * The milestone that holds agent follow-ups for a project. The Tasks screen shows tasks under a milestone, so agent
 * tasks are placed here, where a person will see them. Created once per project.
 */
const FOLLOW_UP_MILESTONE = 'Agent follow-ups';
async function followUpMilestoneId(project_id) {
  const existing = await db.milestone.findOne({ where: { project_id, name: FOLLOW_UP_MILESTONE }, order: [['id', 'ASC']] });
  if (existing) return existing.id;
  const created = await db.milestone.create({ project_id, name: FOLLOW_UP_MILESTONE, status: 'In Progress', progress: 0 });
  return created.id;
}

async function act(ctx, action) {
  if (ctx.keys.has(action.key)) return { key: action.key, agent: action.agent, status: 'already_recorded', title: action.title };
  if (!ctx.milestone_id) ctx.milestone_id = await followUpMilestoneId(ctx.project_id);
  const task = await db.project_task.create({
    project_id: ctx.project_id,
    milestone_id: ctx.milestone_id,
    title: action.title.slice(0, 255),
    description: action.description,
    status: 'To Do',
    priority: action.priority || PRIORITY.medium,
    due_date: new Date(Date.now() + (action.due_in_days ?? 3) * 86400000),
    created_by: ctx.user_id,
  });
  if (ctx.user_id) {
    await task.setAssignees([ctx.user_id]);
  }
  await db.project_history.create({
    project_id: ctx.project_id,
    company_id: ctx.company_id,
    user_id: ctx.user_id,
    action_type: ACTION_TYPE,
    detail: `${action.agent} created task "${action.title}"`,
    meta: JSON.stringify({ key: action.key, agent: action.agent, task_id: task.id }),
  });
  ctx.keys.add(action.key);
  return { key: action.key, agent: action.agent, status: 'created', task_id: task.id, title: action.title };
}

async function approvalChaser(ctx, approvals, now) {
  const out = [];
  for (const item of approvals.items.filter((i) => i.escalate)) {
    const draft = item.kind === 'payment_request'
      ? `Reminder: ${item.label} for ${compliance.inr(item.amount)} has been waiting ${Math.round(item.age_hours)} hours for approval. Please review it or hand it to another approver.`
      : `Reminder: ${item.label} (${compliance.inr(item.amount)}) has been waiting ${Math.round(item.age_hours)} hours for approval. Please review it or hand it to another approver.`;
    out.push(await act(ctx, {
      key: `approval:${item.kind}:${item.id}`,
      agent: 'approval_chaser',
      title: `Chase approval: ${item.label} (${compliance.inr(item.amount)}, ${Math.round(item.age_hours)} h)`,
      description: `${draft}\n\nDraft message only. Nothing has been sent. Approval must be given in the approvals screen by an authorised person.`,
      priority: PRIORITY.high,
      due_in_days: 1,
    }));
  }
  return out;
}

async function retentionWatcher(ctx, retention) {
  const out = [];
  if (!retention.dlp_ended) return out;
  for (const v of retention.vendors.filter((x) => x.outstanding > 0)) {
    out.push(await act(ctx, {
      key: `retention:${v.vendor_id}:${v.outstanding}`,
      agent: 'retention_watcher',
      title: `Prepare retention release: subcontractor #${v.vendor_id}, ${compliance.inr(v.outstanding)}`,
      description: `The defect liability period ended on ${retention.dlp_end_date}. Outstanding retention for this subcontractor is ${compliance.inr(v.outstanding)}. Check the defect log, then record the release in the retention screen. The release needs approval.`,
      priority: PRIORITY.medium,
      due_in_days: 7,
    }));
  }
  return out;
}

async function guaranteeWatcher(ctx, guarantees) {
  const out = [];
  for (const g of guarantees.items.filter((i) => i.expiring || i.expired_active)) {
    if (g.expired_active) {
      out.push(await act(ctx, {
        key: `bg-closeout:${g.id}`,
        agent: 'guarantee_watcher',
        title: `Close out bank guarantee ${g.bg_number}: past expiry, still active`,
        description: `${g.bank_name} guarantee ${g.bg_number} for ${compliance.inr(g.amount)} expired on ${g.expiry_date} and is still marked active. Confirm with the bank and mark it released or invoked.`,
        priority: PRIORITY.high,
        due_in_days: 1,
      }));
    } else {
      out.push(await act(ctx, {
        key: `bg-renewal:${g.id}:${g.expiry_date}`,
        agent: 'guarantee_watcher',
        title: `Renew or release bank guarantee ${g.bg_number}: expires ${g.expiry_date}`,
        description: `${g.bank_name} guarantee ${g.bg_number} for ${compliance.inr(g.amount)} expires on ${g.expiry_date} (${g.days_to_expiry} days). Ask the bank to renew, or confirm the release before expiry.`,
        priority: PRIORITY.high,
        due_in_days: 3,
      }));
    }
  }
  return out;
}

async function costWatcher(ctx, evm) {
  const out = [];
  if (!evm.applicable) return out;
  if (evm.cpi !== null && evm.cpi < 0.9) {
    out.push(await act(ctx, {
      key: `cpi:${Math.floor(evm.cpi * 100)}`,
      agent: 'cost_watcher',
      title: `Review cost overrun: CPI ${evm.cpi}`,
      description: `Earned value is ${compliance.inr(evm.ev)} against ${compliance.inr(evm.ac)} of cost recognized, so the cost performance index is ${evm.cpi}. Review the largest cost lines against their budget heads.`,
      priority: PRIORITY.high,
      due_in_days: 5,
    }));
  }
  if (evm.spi !== null && evm.spi < 0.9) {
    out.push(await act(ctx, {
      key: `spi:${Math.floor(evm.spi * 100)}`,
      agent: 'cost_watcher',
      title: `Recovery plan for schedule: SPI ${evm.spi}`,
      description: `Earned value is ${compliance.inr(evm.ev)} against a plan value of ${compliance.inr(evm.pv)}, so the schedule performance index is ${evm.spi}. Review the milestones behind their dates.`,
      priority: PRIORITY.medium,
      due_in_days: 7,
    }));
  }
  return out;
}

async function indiaComplianceAgent(ctx, india) {
  const out = [];
  for (const f of india.findings.filter((x) => x.severity !== 'info')) {
    out.push(await act(ctx, {
      key: `india:${f.area}:${f.subject.type}:${f.subject.id || f.subject.label}:${f.rule}`,
      agent: 'india_compliance',
      title: `Compliance review (${f.rule}): ${f.subject.label}`,
      description: `${f.message}\n\nProposed action: ${f.proposed_action}\nThis is a flag for review, not legal or tax advice.`,
      priority: PRIORITY[f.severity] || PRIORITY.medium,
      due_in_days: f.severity === 'high' ? 3 : 10,
    }));
  }
  return out;
}

const AGENT_ROSTER = [
  { id: 'approval_chaser', name: 'Approval Chaser Bot', domain: 'Commercial & Finance', trigger: 'Pending approvals aged > 48h across invoices and payment requests', autonomous: true },
  { id: 'retention_watcher', name: 'Retention Release Bot', domain: 'Contracts & DLP', trigger: 'Defect Liability Period (DLP) expiration & retention recovery', autonomous: true },
  { id: 'guarantee_watcher', name: 'Bank Guarantee Watchdog', domain: 'Treasury & Risk', trigger: 'Performance Bonds / PBG / APG expiring within 30 days or past expiry', autonomous: true },
  { id: 'cost_watcher', name: 'EVM Cost & Schedule Bot', domain: 'Project Controls', trigger: 'CPI < 0.90 or SPI < 0.90 earned value thresholds', autonomous: true },
  { id: 'india_compliance', name: 'India Statutory & Tax Bot', domain: 'Tax & Labour Law', trigger: 'GSTIN/PAN checks, Sec 194C TDS, Sec 269ST cash limit, BOCW cess', autonomous: true },
  { id: 'safety_sentinel', name: 'HSE Safety Sentinel Bot', domain: 'Health, Safety & Env', trigger: 'Critical/High safety snags, open HSE incidents & safety escalations', autonomous: true },
  { id: 'procurement_burn', name: 'Procurement & Material Burn Bot', domain: 'Supply Chain', trigger: 'Project stock <= 15% safety threshold vs procured quantity', autonomous: true },
  { id: 'rfi_assistant', name: 'RFI & Drawing Expediter Bot', domain: 'Engineering & QA/QC', trigger: 'Aged unanswered RFIs (> 48h / urgent) & stalled AFC drawing reviews', autonomous: true },
  { id: 'dispute_risk', name: 'Claim & Dispute Predictor Bot', domain: 'Contractual Claims', trigger: 'High-value variation exposure (>= ₹5L / >= 14d EOT) & uncertified RA bills', autonomous: true },
  { id: 'subcontractor_performance', name: 'Subcontractor Quality Bot', domain: 'Vendor Governance', trigger: 'High defect density (>= 3 open snags per contractor)', autonomous: true },
  { id: 'eac_forecaster', name: 'EAC & Slippage Forecaster Bot', domain: 'Predictive EVM', trigger: 'Projected EAC cost overrun >= 5% or schedule slippage >= 14 days', autonomous: true },
  { id: 'vlm_site_inspector', name: 'VLM DPR Photo Inspector Bot', domain: 'Computer Vision & HSE', trigger: 'Uninspected DPR site photos pending PPE/progress VLM scan', autonomous: true },
  { id: 'briefing', name: 'Executive Briefing Agent', domain: 'AI Synthesis', trigger: 'AI-synthesized site situational narrative & executive telemetry', autonomous: true },
];

async function safetySentinelAgent(ctx, now) {
  const out = [];
  const criticalSnags = await db.snag_item.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      severity: ['high', 'critical'],
      status: ['open', 'in_progress'],
      isDeleted: false,
    },
  });
  for (const s of criticalSnags) {
    out.push(await act(ctx, {
      key: `safety:snag:${s.id}`,
      agent: 'safety_sentinel',
      title: `HSE Hazard Alert: ${s.title} (${String(s.severity).toUpperCase()})`,
      description: `High-severity defect/hazard at ${s.location_pin || 'project site'} (${s.trade || 'General'}) remains ${s.status}. Immediate HSE inspection and remediation required.`,
      priority: PRIORITY.high,
      due_in_days: 1,
    }));
  }

  const incidentRows = await db.project_history.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      action_type: ['SAFETY_INCIDENT', 'SAFETY_INCIDENT_REPORTED'],
    },
  });
  for (const r of incidentRows) {
    const meta = typeof r.meta === 'string' ? safeParse(r.meta) : (r.meta || {});
    if (meta && meta.status !== 'closed') {
      out.push(await act(ctx, {
        key: `safety:incident:${r.id}`,
        agent: 'safety_sentinel',
        title: `Investigate Safety Incident: ${meta.incident_number || `INC-${r.id}`}`,
        description: `${meta.title || r.detail} at ${meta.location || 'Site'} (${String(meta.severity || 'open').toUpperCase()}). Complete root cause analysis and verify corrective measures.`,
        priority: PRIORITY.high,
        due_in_days: 1,
      }));
    }
  }
  return out;
}

async function procurementBurnAgent(ctx, now) {
  const out = [];
  const stocks = await db.material_project_stock.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      isDeleted: false,
    },
  });
  for (const item of stocks) {
    const stockIn = Number(item.stockIn || 0);
    const stockUsed = Number(item.stockUsed || 0);
    if (stockIn <= 0) continue;
    const remaining = Math.max(0, stockIn - stockUsed);
    if (remaining <= stockIn * 0.15) {
      out.push(await act(ctx, {
        key: `procurement:reorder:${item.id}:${remaining}`,
        agent: 'procurement_burn',
        title: `Reorder Alert: ${item.name} (${remaining} ${item.unit_of_measure || 'units'} left)`,
        description: `Available project stock for ${item.name} (SKU: ${item.sku}) dropped to ${remaining} ${item.unit_of_measure || 'units'} (<= 15% safety buffer of ${stockIn}). Raise purchase requisition to avoid site stoppage.`,
        priority: remaining === 0 ? PRIORITY.high : PRIORITY.medium,
        due_in_days: 2,
      }));
    }
  }
  return out;
}

async function rfiAssistantAgent(ctx, now) {
  const out = [];
  const drawings = await db.drawing_register.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      status: 'under_review',
      isDeleted: false,
    },
  });
  for (const d of drawings) {
    out.push(await act(ctx, {
      key: `rfi:drawing:${d.id}:${d.revision}`,
      agent: 'rfi_assistant',
      title: `Expedite Drawing Review: ${d.drawing_number} (${d.discipline})`,
      description: `Drawing "${d.title}" Rev ${d.revision} is awaiting consultant sign-off. Expedite AFC release to unblock site execution.`,
      priority: PRIORITY.medium,
      due_in_days: 3,
    }));
  }

  const rfiRows = await db.project_history.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      action_type: 'RFI_RECORD',
    },
  });
  for (const r of rfiRows) {
    const meta = typeof r.meta === 'string' ? safeParse(r.meta) : (r.meta || {});
    if (!meta || (meta.status !== 'submitted' && meta.status !== 'under_review')) continue;
    const ageHours = (now.getTime() - new Date(r.createdAt).getTime()) / 3600000;
    if (ageHours >= 48 || meta.priority === 'urgent' || meta.priority === 'high') {
      out.push(await act(ctx, {
        key: `rfi:pending:${r.id}`,
        agent: 'rfi_assistant',
        title: `RFI Action Required: ${meta.rfi_number || `RFI-${r.id}`} (${meta.discipline || 'Technical'})`,
        description: `Query: ${meta.question || meta.subject}\n\nAI Technical Draft: ${meta.ai_draft_response || 'Review latest specifications and issue formal engineering response.'}`,
        priority: meta.priority === 'urgent' ? PRIORITY.high : PRIORITY.medium,
        due_in_days: 2,
      }));
    }
  }
  return out;
}

async function disputeRiskAgent(ctx, now) {
  const out = [];
  const pendingVariations = await db.variation_order.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      status: ['submitted', 'technical_review', 'commercial_review', 'budget_review'],
    },
  });
  for (const vo of pendingVariations) {
    const netCost = Number(vo.net_cost_impact || 0);
    const eotDays = Number(vo.time_extension_days_requested || 0);
    if (netCost >= 500000 || eotDays >= 14) {
      out.push(await act(ctx, {
        key: `dispute:vo:${vo.id}`,
        agent: 'dispute_risk',
        title: `Claim & Dispute Risk: Variation ${vo.variation_number} (${compliance.inr(netCost)})`,
        description: `Pending variation order "${vo.title}" carries ${compliance.inr(netCost)} cost exposure and ${eotDays} days EOT request. Reconcile with client/consultant early to mitigate formal contractual dispute.`,
        priority: PRIORITY.high,
        due_in_days: 3,
      }));
    }
  }

  const submittedBills = await db.contractor_ra_bill.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      status: 'submitted',
    },
  });
  for (const ra of submittedBills) {
    const ageHours = (now.getTime() - new Date(ra.createdAt).getTime()) / 3600000;
    if (ageHours >= 360) {
      out.push(await act(ctx, {
        key: `dispute:ra:${ra.id}`,
        agent: 'dispute_risk',
        title: `Payment Delay Risk: Uncertified RA Bill ${ra.ra_bill_number}`,
        description: `RA Bill ${ra.ra_bill_number} (${compliance.inr(ra.current_period_gross_amount)}) has awaited certification for ${Math.round(ageHours / 24)} days. Delayed payment certificates trigger contractor interest claims.`,
        priority: PRIORITY.high,
        due_in_days: 2,
      }));
    }
  }
  return out;
}

async function subcontractorPerformanceAgent(ctx, now) {
  const out = [];
  const openSnags = await db.snag_item.findAll({
    where: {
      project_id: ctx.project_id,
      company_id: ctx.company_id,
      status: ['open', 'in_progress'],
      isDeleted: false,
    },
  });
  const byVendor = new Map();
  for (const s of openSnags) {
    if (!s.vendor_id) continue;
    byVendor.set(s.vendor_id, (byVendor.get(s.vendor_id) || 0) + 1);
  }
  for (const [vendorId, count] of byVendor.entries()) {
    if (count >= 3) {
      out.push(await act(ctx, {
        key: `vendor:perf:${vendorId}:${count}`,
        agent: 'subcontractor_performance',
        title: `Subcontractor Quality Warning: Vendor #${vendorId} (${count} open snags)`,
        description: `Subcontractor #${vendorId} has accumulated ${count} unresolved defects on site. Convene quality review and verify rectification before clearing next milestone payment.`,
        priority: PRIORITY.medium,
        due_in_days: 4,
      }));
    }
  }
  return out;
}

async function eacForecasterAgent(ctx, forecast) {
  const out = [];
  if (!forecast || !forecast.applicable) return out;
  const overrunPct = Number(forecast.overrun_pct || 0);
  const slippageDays = Number(forecast.projected_slippage_days || 0);
  if (overrunPct >= 5 || slippageDays >= 14) {
    out.push(await act(ctx, {
      key: `eac:slippage:${Math.round(overrunPct)}:${Math.round(slippageDays / 7)}w`,
      agent: 'eac_forecaster',
      title: `EAC Forecast Alert: ${overrunPct > 0 ? `+${overrunPct}% cost overrun` : 'on-budget'}, +${slippageDays}d slippage`,
      description: `Projected Estimate-at-Completion is ${compliance.inr(forecast.eac_typical || 0)} vs approved BAC ${compliance.inr(forecast.bac || 0)} (Composite EAC: ${compliance.inr(forecast.eac_composite || 0)}). Projected completion date ${forecast.projected_completion_date || 'TBD'} (+${slippageDays} days slippage). Review cost recovery and fast-tracking options.`,
      priority: overrunPct >= 10 || slippageDays >= 30 ? PRIORITY.high : PRIORITY.medium,
      due_in_days: 3,
    }));
  }
  return out;
}

async function vlmSiteInspectorAgent(ctx) {
  const out = [];
  const [images, inspections] = await Promise.all([
    db.dpr_image.findAll({
      where: { company_id: ctx.company_id, project_id: ctx.project_id },
      order: [['id', 'DESC']],
      limit: 50,
    }),
    db.project_history.findAll({
      where: { company_id: ctx.company_id, project_id: ctx.project_id, action_type: 'VLM_DPR_INSPECTION' },
      attributes: ['meta'],
    }),
  ]);
  const inspectedIds = new Set();
  for (const row of inspections) {
    const m = typeof row.meta === 'string' ? safeParse(row.meta) : row.meta;
    if (m && m.image_id) inspectedIds.add(Number(m.image_id));
  }
  const pendingImages = images.filter((img) => !inspectedIds.has(Number(img.id)));
  if (pendingImages.length > 0) {
    out.push(await act(ctx, {
      key: `vlm:pending:${pendingImages[0].id}:${pendingImages.length}`,
      agent: 'vlm_site_inspector',
      title: `Run VLM PPE & Progress Scan on ${pendingImages.length} DPR photo(s)`,
      description: `${pendingImages.length} uploaded site photo(s) (latest: "${pendingImages[0].file_name}") have not yet been scanned by the Vision Language Model for PPE compliance and stage progress.`,
      priority: PRIORITY.medium,
      due_in_days: 1,
    }));
  }
  return out;
}

async function recordBriefing(ctx, briefing) {
  await db.project_history.create({
    project_id: ctx.project_id,
    company_id: ctx.company_id,
    user_id: ctx.user_id,
    action_type: 'AGENT_BRIEFING',
    detail: briefing.summary,
    meta: JSON.stringify({ narrative: briefing.narrative, narrative_source: briefing.narrative_source, counts: briefing.counts }),
  });
  return { agent: 'briefing', status: 'recorded', narrative_source: briefing.narrative_source, summary: briefing.summary };
}

/**
 * Runs every agent for one project and returns what each one did. Acting agents create tasks; a repeat run creates none
 * for the same findings.
 * @param {{ company_id: number, project_id: number, user_id: number|null, now?: Date, withNarrative?: boolean }} args
 */
async function runAgents({ company_id, project_id, user_id = null, now = new Date(), withNarrative = true }) {
  const approvals = await controls.approvalAgeing({ company_id, project_id, older_than_hours: 48, now });
  const retention = await controls.retentionSummary({ company_id, project_id });
  const guarantees = await controls.listGuarantees({ company_id, project_id, expiring_within_days: 30 });
  const evm = await controls.earnedValue({ company_id, project_id, status_date: now });
  const forecast = await eacForecast.computeEacForecast({ company_id, project_id, status_date: now });
  const india = await compliance.indiaCompliance({ company_id, project_id, now });
  const ctx = { company_id, project_id, user_id, keys: await recordedKeys(project_id) };

  const actions = [
    ...(await approvalChaser(ctx, approvals, now)),
    ...(await retentionWatcher(ctx, retention)),
    ...(await guaranteeWatcher(ctx, guarantees)),
    ...(await costWatcher(ctx, evm)),
    ...(await indiaComplianceAgent(ctx, india)),
    ...(await safetySentinelAgent(ctx, now)),
    ...(await procurementBurnAgent(ctx, now)),
    ...(await rfiAssistantAgent(ctx, now)),
    ...(await disputeRiskAgent(ctx, now)),
    ...(await subcontractorPerformanceAgent(ctx, now)),
    ...(await eacForecasterAgent(ctx, forecast)),
    ...(await vlmSiteInspectorAgent(ctx)),
  ];
  const briefing = await briefingAgent.buildBriefing({ company_id, project_id, withNarrative, now });
  actions.push(await recordBriefing(ctx, briefing));

  const created = actions.filter((a) => a.status === 'created').length;
  const repeated = actions.filter((a) => a.status === 'already_recorded').length;
  const summary = { project_id, ran_at: now.toISOString(), created, already_recorded: repeated, actions, briefing_summary: briefing.summary, narrative: briefing.narrative, narrative_source: briefing.narrative_source };
  await db.project_history.create({
    project_id,
    company_id,
    user_id,
    action_type: RUN_TYPE,
    detail: `Agents ran: ${created} new action(s), ${repeated} already recorded.`,
    meta: JSON.stringify({ created, already_recorded: repeated }),
  });
  return summary;
}

/** The agent log for a project: every action and briefing, newest first. */
async function agentLog({ project_id, limit = 100 }) {
  const rows = await db.project_history.findAll({
    where: { project_id, action_type: [ACTION_TYPE, RUN_TYPE, 'AGENT_BRIEFING'] },
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
    limit: Math.min(Math.max(Number(limit) || 100, 1), 500),
  });
  return rows.map((r) => ({
    id: r.id,
    at: r.createdAt,
    kind: r.action_type,
    detail: r.detail,
    meta: typeof r.meta === 'string' ? safeParse(r.meta) : r.meta,
  }));
}

function getAgentRoster() {
  return AGENT_ROSTER;
}

async function getProjectInsights({ company_id, project_id }) {
  const now = new Date();
  const [approvals, guarantees, evm, forecast, india, logs, openSnags, stocks, rfis, incidents, variations, vlmRows, directorBriefingRow] = await Promise.all([
    controls.approvalAgeing({ company_id, project_id, older_than_hours: 48, now }),
    controls.listGuarantees({ company_id, project_id, expiring_within_days: 30 }),
    controls.earnedValue({ company_id, project_id, status_date: now }),
    eacForecast.computeEacForecast({ company_id, project_id, status_date: now }),
    compliance.indiaCompliance({ company_id, project_id, now }),
    agentLog({ project_id, limit: 50 }),
    db.snag_item.findAll({ where: { project_id, company_id, status: ['open', 'in_progress'], isDeleted: false } }),
    db.material_project_stock.findAll({ where: { project_id, company_id, isDeleted: false } }),
    db.project_history.findAll({ where: { project_id, company_id, action_type: 'RFI_RECORD' } }),
    db.project_history.findAll({ where: { project_id, company_id, action_type: ['SAFETY_INCIDENT', 'SAFETY_INCIDENT_REPORTED'] } }),
    db.variation_order.findAll({ where: { project_id, company_id, status: ['submitted', 'technical_review', 'commercial_review', 'budget_review'] } }),
    db.project_history.findAll({ where: { project_id, company_id, action_type: 'VLM_DPR_INSPECTION' }, order: [['id', 'DESC']], limit: 20 }),
    db.project_history.findOne({ where: { project_id, company_id, action_type: 'DIRECTOR_BRIEFING' }, order: [['createdAt', 'DESC'], ['id', 'DESC']] }),
  ]);

  const criticalSnags = openSnags.filter((s) => s.severity === 'critical' || s.severity === 'high').length;
  const openIncidents = incidents.filter((i) => {
    const m = typeof i.meta === 'string' ? safeParse(i.meta) : i.meta;
    return !m || m.status !== 'closed';
  }).length;
  const openRfis = rfis.filter((r) => {
    const m = typeof r.meta === 'string' ? safeParse(r.meta) : r.meta;
    return !m || m.status === 'submitted' || m.status === 'under_review';
  }).length;
  const lowStockCount = stocks.filter((s) => Number(s.stockIn || 0) > 0 && (Number(s.stockIn) - Number(s.stockUsed || 0)) <= Number(s.stockIn) * 0.15).length;

  let score = 100;
  score -= Math.min(25, (approvals.escalate_count || 0) * 5);
  score -= Math.min(20, (guarantees.expired_active_count || 0) * 10 + (guarantees.expiring_count || 0) * 4);
  if (evm.applicable && evm.cpi !== null && evm.cpi < 0.9) score -= 12;
  if (evm.applicable && evm.spi !== null && evm.spi < 0.9) score -= 10;
  score -= Math.min(18, criticalSnags * 4 + openIncidents * 6);
  score -= Math.min(10, lowStockCount * 3);
  score -= Math.min(10, openRfis * 2);
  score = Math.max(15, Math.round(score));

  const riskLevel = score >= 85 ? 'Low' : score >= 65 ? 'Moderate' : score >= 45 ? 'Elevated' : 'Critical';

  const actionsByAgent = {};
  for (const l of logs) {
    if (l.kind === ACTION_TYPE && l.meta && l.meta.agent) {
      actionsByAgent[l.meta.agent] = (actionsByAgent[l.meta.agent] || 0) + 1;
    }
  }

  const rosterWithTelemetry = AGENT_ROSTER.map((agent) => ({
    ...agent,
    actions_recorded: actionsByAgent[agent.id] || 0,
    status: 'armed',
  }));

  const latestBriefing = logs.find((l) => l.kind === 'AGENT_BRIEFING') || null;
  const latestRun = logs.find((l) => l.kind === RUN_TYPE) || null;
  const recentActions = logs.filter((l) => l.kind === ACTION_TYPE).slice(0, 20);

  return {
    health_score: score,
    risk_level: riskLevel,
    last_run_at: latestRun ? latestRun.at : null,
    roster: rosterWithTelemetry,
    latest_briefing: latestBriefing,
    latest_director_briefing: directorBriefingRow ? (safeParse(directorBriefingRow.meta) || { detail: directorBriefingRow.detail }) : null,
    eac_forecast: forecast,
    recent_actions: recentActions,
    telemetry: {
      approvals_escalated: approvals.escalate_count || 0,
      guarantees_expiring: (guarantees.expiring_count || 0) + (guarantees.expired_active_count || 0),
      cpi: evm.applicable ? evm.cpi : null,
      spi: evm.applicable ? evm.spi : null,
      eac_typical: forecast.applicable ? forecast.eac_typical : null,
      projected_slippage_days: forecast.applicable ? forecast.projected_slippage_days : null,
      vlm_inspections_count: vlmRows.length,
      india_high_flags: india.findings.filter((f) => f.severity === 'high').length,
      critical_snags: criticalSnags,
      open_incidents: openIncidents,
      open_rfis: openRfis,
      low_stock_materials: lowStockCount,
      pending_variations: variations.length,
    },
  };
}

module.exports = { runAgents, agentLog, recordedKeys, getAgentRoster, getProjectInsights };
