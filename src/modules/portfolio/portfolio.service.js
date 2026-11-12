'use strict';
/**
 * Portfolio layer: cross-project views built only from records that already exist. It writes nothing.
 *
 *   portfolioOverview   every project with earned value, risk score and RAG, plus portfolio totals
 *   cashOutForecast     weekly committed cash-out from payment requests, bills, invoices and open purchase orders
 *   criticalPath        critical path of a project's tasks and dependencies
 *   vendorScorecard     subcontractor and supplier scores
 *   portfolioBrief      findings across the portfolio, with an optional model narrative that says where it came from
 *
 * Rules live in portfolio.calc.js (pure). This file only reads and assembles.
 */
const { Op, fn, col } = require('sequelize');
const db = require('../../models');
const controls = require('../projects/services/project_controls.service');
const aiService = require('../../core/services/ai.service');
const calc = require('./portfolio.calc');

const DAY = 86400000;
const round2 = calc.round2;
const dayOf = (d) => new Date(d).toISOString().slice(0, 10);
const asArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') { try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch (e) { return []; } }
  return [];
};

function scopeWhere(company_id, project_ids) {
  const where = { company_id };
  if (Array.isArray(project_ids)) where.id = project_ids.length ? project_ids : -1;
  return where;
}

async function loadProjects(company_id, project_ids) {
  return db.project.findAll({
    where: scopeWhere(company_id, project_ids),
    attributes: ['id', 'name', 'type', 'status', 'progress', 'project_code', 'location_name', 'address', 'completion_date', 'budget_total', 'budget_used'],
    order: [['id', 'ASC']],
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------------------------------------------

async function projectMetrics(p, company_id, now) {
  const pid = p.id;
  const [evm, approvals, guarantees, snagRows, lastDpr, overdueTasks, labour, variations] = await Promise.all([
    controls.earnedValue({ company_id, project_id: pid, status_date: now }),
    controls.approvalAgeing({ company_id, project_id: pid, now }),
    controls.listGuarantees({ company_id, project_id: pid }),
    db.snag_item.findAll({
      where: { project_id: pid, company_id, isDeleted: false, status: ['open', 'in_progress'] },
      attributes: ['severity', [fn('COUNT', col('id')), 'n']],
      group: ['severity'],
      raw: true,
    }),
    db.dpr.max('report_date', { where: { project_id: pid, company_id, isDeleted: false } }),
    db.project_task.count({ where: { project_id: pid, status: { [Op.ne]: 'Completed' }, due_date: { [Op.lt]: now } } }),
    db.labour_attendance.sum('headcount', { where: { project_id: pid, company_id, isDeleted: false, attendance_date: { [Op.gte]: dayOf(new Date(now.getTime() - 7 * DAY)) } } }),
    db.variation_order.findAll({
      where: { project_id: pid, company_id, status: { [Op.notIn]: ['approved', 'rejected', 'draft', 'cancelled', 'implemented', 'closed'] } },
      attributes: ['proposed_amount'],
      raw: true,
    }),
  ]);
  const snags = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const r of snagRows) if (snags[r.severity] !== undefined) snags[r.severity] = Number(r.n);
  const daysSinceDpr = lastDpr ? Math.max(0, Math.floor((now.getTime() - new Date(lastDpr).getTime()) / DAY)) : null;
  return {
    evm, approvals, guarantees, snags,
    days_since_dpr: daysSinceDpr,
    overdue_tasks: overdueTasks,
    avg_daily_workforce: Math.round((Number(labour) || 0) / 7),
    pending_variations: { count: variations.length, amount: round2(variations.reduce((s, v) => s + Number(v.proposed_amount || 0), 0)) },
  };
}

/**
 * Every project in scope with its figures and risk, most at risk first, and the portfolio totals.
 * `project_ids` is null for the whole company, or the list the caller may see.
 */
async function portfolioOverview({ company_id, project_ids = null, now = new Date() }) {
  const projects = await loadProjects(company_id, project_ids);
  const rows = [];
  for (const p of projects) {
    const m = await projectMetrics(p, company_id, now);
    const risk = calc.riskFrom({ ...m, status: p.status });
    const evm = m.evm.applicable ? m.evm : null;
    rows.push({
      id: p.id,
      code: p.project_code,
      name: p.name,
      type: p.type,
      location: p.location_name || p.address,
      status: p.status,
      progress: Number(p.progress || 0),
      completion_date: p.completion_date ? dayOf(p.completion_date) : null,
      bac: evm ? evm.bac : Number(p.budget_total || 0),
      ac: m.evm.ac,
      ev: evm ? evm.ev : null,
      pv: evm ? evm.pv : null,
      cpi: evm ? evm.cpi : null,
      spi: evm ? evm.spi : null,
      eac: evm ? evm.eac : null,
      earned_value_note: evm ? null : m.evm.reason,
      risk,
      open_snags: m.snags,
      approvals_waiting: m.approvals.waiting_count,
      approvals_escalated: m.approvals.escalate_count,
      guarantees: { active_total: m.guarantees.active_total, expiring: m.guarantees.expiring_count, expired_active: m.guarantees.expired_active_count },
      days_since_dpr: m.days_since_dpr,
      overdue_tasks: m.overdue_tasks,
      avg_daily_workforce: m.avg_daily_workforce,
      pending_variations: m.pending_variations,
    });
  }
  rows.sort((a, b) => b.risk.score - a.risk.score || a.id - b.id);

  const withEvm = rows.filter((r) => r.ev !== null);
  const sum = (arr, k) => round2(arr.reduce((s, r) => s + Number(r[k] || 0), 0));
  const totalAc = sum(withEvm, 'ac');
  const totalEv = sum(withEvm, 'ev');
  const totalPv = sum(withEvm, 'pv');
  const totals = {
    projects: rows.length,
    bac: sum(rows, 'bac'),
    ac: sum(rows, 'ac'),
    ev: totalEv,
    pv: totalPv,
    cpi: totalAc > 0 ? Number((totalEv / totalAc).toFixed(3)) : null,
    spi: totalPv > 0 ? Number((totalEv / totalPv).toFixed(3)) : null,
    projects_with_earned_value: withEvm.length,
    rag: { red: rows.filter((r) => r.risk.rag === 'red').length, amber: rows.filter((r) => r.risk.rag === 'amber').length, green: rows.filter((r) => r.risk.rag === 'green').length },
    by_status: rows.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {}),
    approvals_waiting: rows.reduce((s, r) => s + r.approvals_waiting, 0),
    approvals_escalated: rows.reduce((s, r) => s + r.approvals_escalated, 0),
    guarantees_expired_active: rows.reduce((s, r) => s + r.guarantees.expired_active, 0),
    guarantees_expiring: rows.reduce((s, r) => s + r.guarantees.expiring, 0),
    open_snags_high_or_critical: rows.reduce((s, r) => s + r.open_snags.high + r.open_snags.critical, 0),
    pending_variation_amount: round2(rows.reduce((s, r) => s + r.pending_variations.amount, 0)),
    avg_daily_workforce: rows.reduce((s, r) => s + r.avg_daily_workforce, 0),
  };
  return { as_of: now.toISOString(), totals, projects: rows };
}

// ---------------------------------------------------------------------------------------------------------------
// Cash-out forecast
// ---------------------------------------------------------------------------------------------------------------

const ASSUMPTIONS = (terms) => [
  'Only money the company has already committed to pay is shown. Client receipts are not modelled, so this is cash-out, not net cash flow.',
  'An approved payment request is assumed paid 3 days after approval; one waiting for approval, 10 days after it was raised.',
  'An approved contractor RA bill that has no invoice linked is assumed paid 15 days after approval; a submitted or certified one, 21 days after it was raised.',
  `An unpaid vendor invoice with no payment request is assumed due ${terms} days after the invoice date, for the unpaid balance.`,
  'An approved purchase order that is not fully received is assumed paid 30 days after its expected delivery date, for the value not yet received and accepted.',
  'Anything already past its assumed date is shown in week 1 as overdue.',
];

async function cashOutForecast({ company_id, project_ids = null, weeks = 13, terms_days = 30, now = new Date() }) {
  const projects = await loadProjects(company_id, project_ids);
  const ids = projects.map((p) => p.id);
  const names = new Map(projects.map((p) => [p.id, p.name]));
  const terms = Math.min(120, Math.max(0, Math.round(Number(terms_days) || 30)));
  const items = [];
  if (ids.length === 0) {
    return { as_of: now.toISOString(), ...calc.bucketCashOut([], now, weeks), by_source: {}, by_project: [], assumptions: ASSUMPTIONS(terms), items_counted: 0 };
  }

  const payments = await db.vendors_payment_request.findAll({ where: { company_id, project_id: ids, status: ['pending_approval', 'approved'] } });
  for (const p of payments) {
    const base = p.status === 'approved' ? new Date(p.approved_at || p.createdAt).getTime() + 3 * DAY : new Date(p.createdAt).getTime() + 10 * DAY;
    items.push({ date: new Date(base), amount: p.amount, source: 'payment_requests', label: `Payment request #${p.id} (${p.status})`, project_id: p.project_id });
  }
  const paymentInvoiceIds = new Set(payments.map((p) => p.invoice_id));

  const bills = await db.contractor_ra_bill.findAll({ where: { company_id, project_id: ids, status: ['approved', 'submitted', 'certified'], linked_invoice_id: null } });
  for (const b of bills) {
    const base = b.status === 'approved' ? new Date(b.approved_at || b.createdAt).getTime() + 15 * DAY : new Date(b.createdAt).getTime() + 21 * DAY;
    items.push({ date: new Date(base), amount: b.net_payable_amount, source: 'ra_bills', label: `${b.ra_bill_number} (${b.status})`, project_id: b.project_id });
  }

  const invoices = await db.vendors_invoice.findAll({ where: { company_id, project_id: ids, status: ['Pending', 'Partially Paid'] } });
  for (const inv of invoices) {
    if (paymentInvoiceIds.has(inv.id)) continue;
    const balance = Number(inv.grand_total || 0) - Number(inv.paid_amount || 0);
    items.push({ date: new Date(new Date(inv.invoice_date).getTime() + terms * DAY), amount: balance, source: 'vendor_invoices', label: `Invoice ${inv.invoice_number}`, project_id: inv.project_id });
  }

  const orders = await db.purchase_order.findAll({ where: { company_id, project_id: ids, status: ['approved', 'partially_received'] } });
  if (orders.length) {
    const grns = await db.goods_receipt_note.findAll({ where: { company_id, purchase_order_id: orders.map((o) => o.id) } });
    const received = new Map();
    for (const g of grns) {
      const value = asArray(g.items).reduce((s, it) => s + Number(it.accepted_qty || 0) * Number(it.unit_rate || 0), 0);
      received.set(g.purchase_order_id, (received.get(g.purchase_order_id) || 0) + value);
    }
    for (const o of orders) {
      const open = Number(o.total_amount || 0) - (received.get(o.id) || 0);
      const due = new Date(new Date(o.expected_delivery_date || o.order_date).getTime() + 30 * DAY);
      items.push({ date: due, amount: open, source: 'open_purchase_orders', label: `${o.po_number} (open value)`, project_id: o.project_id });
    }
  }

  const result = calc.bucketCashOut(items, now, weeks);
  const bySource = {};
  const byProject = new Map();
  for (const it of items) {
    const amt = Number(it.amount) || 0;
    if (amt <= 0) continue;
    bySource[it.source] = round2((bySource[it.source] || 0) + amt);
    byProject.set(it.project_id, round2((byProject.get(it.project_id) || 0) + amt));
  }
  return {
    as_of: now.toISOString(),
    ...result,
    by_source: bySource,
    by_project: [...byProject.entries()].map(([id, total]) => ({ project_id: id, name: names.get(id), total })).sort((a, b) => b.total - a.total),
    assumptions: ASSUMPTIONS(terms),
    items_counted: items.filter((i) => Number(i.amount) > 0).length,
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Critical path
// ---------------------------------------------------------------------------------------------------------------

const DEFAULT_TASK_DAYS = 5;

async function criticalPath({ company_id, project_id }) {
  const project = await db.project.findOne({ where: { id: project_id, company_id }, attributes: ['id', 'name', 'completion_date'] });
  if (!project) { const e = new Error('Project not found'); e.status = 404; throw e; }
  const tasks = await db.project_task.findAll({ where: { project_id }, attributes: ['id', 'title', 'status', 'progress', 'due_date'], order: [['id', 'ASC']] });
  if (tasks.length === 0) return { project_id, project: project.name, applicable: false, reason: 'no_tasks', tasks: [] };
  const ids = tasks.map((t) => t.id);
  const subs = await db.project_sub_task.findAll({ where: { task_id: ids }, attributes: ['task_id', 'startDate', 'endDate'] });
  const deps = await db.project_task_dependency.findAll({ where: { task_id: ids }, attributes: ['task_id', 'predecessor_id', 'type', 'lag'], raw: true });

  const span = new Map();
  for (const s of subs) {
    if (!s.startDate || !s.endDate) continue;
    const cur = span.get(s.task_id) || { start: Infinity, end: -Infinity };
    cur.start = Math.min(cur.start, new Date(s.startDate).getTime());
    cur.end = Math.max(cur.end, new Date(s.endDate).getTime());
    span.set(s.task_id, cur);
  }
  const basis = new Map(); // how each duration was obtained
  const sized = tasks.map((t) => {
    const sp = span.get(t.id);
    let days;
    if (sp && Number.isFinite(sp.start) && sp.end >= sp.start) { days = Math.round((sp.end - sp.start) / DAY) + 1; basis.set(t.id, 'sub_tasks'); }
    else { days = DEFAULT_TASK_DAYS; basis.set(t.id, 'default'); }
    return { id: t.id, duration: days };
  });
  const cpm = calc.computeCriticalPath(sized, deps);
  const title = new Map(tasks.map((t) => [t.id, t]));
  if (!cpm.ok) {
    return { project_id, project: project.name, applicable: false, reason: 'dependency_cycle', cycle: cpm.cycle.map((id) => ({ id, title: title.get(id)?.title })), tasks: [] };
  }

  // Calendar anchor: the earliest sub-task start, or today if no task has dates.
  const starts = [...span.values()].map((s) => s.start).filter(Number.isFinite);
  const anchor = starts.length ? new Date(Math.min(...starts)) : new Date();
  const at = (d) => dayOf(new Date(anchor.getTime() + d * DAY));
  const finishDate = at(cpm.finish);
  const deadline = project.completion_date ? dayOf(project.completion_date) : null;
  return {
    project_id,
    project: project.name,
    applicable: true,
    anchor_date: dayOf(anchor),
    duration_days: cpm.finish,
    finish_date: finishDate,
    contract_completion_date: deadline,
    days_to_contract_completion: deadline ? Math.round((new Date(deadline).getTime() - new Date(finishDate).getTime()) / DAY) : null,
    critical_path: cpm.critical_path.map((id) => ({ id, title: title.get(id)?.title, status: title.get(id)?.status })),
    ignored_dependencies: cpm.ignored_dependencies,
    method: `Critical path method on task dependencies. A task's duration is the span of its sub-tasks; with none it is assumed ${DEFAULT_TASK_DAYS} days. FS, SS, FF and SF links and lags are used. Float is in days.`,
    tasks: cpm.tasks.map((r) => ({
      id: r.id,
      title: title.get(r.id)?.title,
      status: title.get(r.id)?.status,
      progress: title.get(r.id)?.progress,
      duration_days: sized.find((s) => s.id === r.id).duration,
      duration_basis: basis.get(r.id),
      early_start: at(r.es),
      early_finish: at(r.ef),
      float_days: r.float,
      critical: r.critical,
    })),
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Vendor scorecard
// ---------------------------------------------------------------------------------------------------------------

async function vendorScorecard({ company_id, project_ids = null }) {
  const vendorWhere = { company_id };
  const vendors = await db.vendors.findAll({ where: vendorWhere, order: [['id', 'ASC']] });
  const inScope = Array.isArray(project_ids)
    ? vendors.filter((v) => project_ids.includes(v.project_id) || asArray(v.project_ids).some((id) => project_ids.includes(Number(id))))
    : vendors;
  if (inScope.length === 0) return { vendors: [], summary: { count: 0, grades: { A: 0, B: 0, C: 0, D: 0 } } };
  const ids = inScope.map((v) => v.id);
  const [invoices, grns, snags] = await Promise.all([
    db.vendors_invoice.findAll({ where: { company_id, vendor_id: ids }, attributes: ['vendor_id', 'status'] }),
    db.goods_receipt_note.findAll({ where: { company_id, vendor_id: ids }, attributes: ['vendor_id', 'items'] }),
    db.snag_item.findAll({ where: { company_id, vendor_id: ids, isDeleted: false, status: ['open', 'in_progress'] }, attributes: ['vendor_id', 'severity'] }),
  ]);
  const rows = inScope.map((v) => {
    const inv = invoices.filter((i) => i.vendor_id === v.id);
    let received = 0;
    let rejected = 0;
    for (const g of grns.filter((x) => x.vendor_id === v.id)) {
      for (const it of asArray(g.items)) { received += Number(it.received_qty || 0); rejected += Number(it.rejected_qty || 0); }
    }
    const sn = snags.filter((s) => s.vendor_id === v.id);
    const metrics = {
      gst_no: v.gst_no, pan_card_no: v.pan_card_no, compliance_score: Number(v.compliance_score),
      invoice_count: inv.length, unpaid_invoice_count: inv.filter((i) => i.status !== 'Paid' && i.status !== 'Cancelled').length,
      received_qty: received, rejected_qty: rejected,
      open_snags: sn.length, open_snags_high: sn.filter((s) => s.severity === 'high' || s.severity === 'critical').length,
    };
    const score = calc.vendorScoreFrom(metrics);
    return { id: v.id, name: v.name, skill: v.skill, project_id: v.project_id, status: v.status, gst_registered: Boolean(v.gst_no), ...score, metrics };
  });
  rows.sort((a, b) => a.score - b.score || a.id - b.id);
  const grades = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of rows) grades[r.grade] += 1;
  return { vendors: rows, summary: { count: rows.length, grades, average_score: Math.round(rows.reduce((s, r) => s + r.score, 0) / rows.length) } };
}

// ---------------------------------------------------------------------------------------------------------------
// Brief
// ---------------------------------------------------------------------------------------------------------------

const inr = (n) => `₹${Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

/** Findings across the portfolio, most urgent first. Pure: takes the overview. */
function findingsFromOverview(overview) {
  const f = [];
  const t = overview.totals;
  for (const p of overview.projects.filter((x) => x.risk.rag === 'red')) {
    const top = p.risk.drivers[0];
    f.push({ severity: 'high', area: 'project_risk', project_id: p.id, message: `${p.name} is red (risk ${p.risk.score}/100)${top ? `; main driver: ${top.message}` : ''}`, evidence: { score: p.risk.score, cpi: p.cpi, spi: p.spi } });
  }
  if (t.guarantees_expired_active > 0) f.push({ severity: 'high', area: 'guarantees', message: `${t.guarantees_expired_active} bank guarantee(s) are past expiry but still marked active across the portfolio.`, evidence: { count: t.guarantees_expired_active } });
  if (t.approvals_escalated > 0) f.push({ severity: 'high', area: 'approvals', message: `${t.approvals_escalated} approval(s) have waited past the escalation threshold (${t.approvals_waiting} waiting in total).`, evidence: { escalated: t.approvals_escalated, waiting: t.approvals_waiting } });
  for (const p of overview.projects.filter((x) => x.risk.rag === 'amber')) {
    const top = p.risk.drivers[0];
    f.push({ severity: 'medium', area: 'project_risk', project_id: p.id, message: `${p.name} is amber (risk ${p.risk.score}/100)${top ? `; main driver: ${top.message}` : ''}`, evidence: { score: p.risk.score } });
  }
  if (t.guarantees_expiring > 0) f.push({ severity: 'medium', area: 'guarantees', message: `${t.guarantees_expiring} bank guarantee(s) expire within 30 days.`, evidence: { count: t.guarantees_expiring } });
  if (t.open_snags_high_or_critical > 0) f.push({ severity: 'medium', area: 'quality', message: `${t.open_snags_high_or_critical} high or critical snag(s) are open.`, evidence: { count: t.open_snags_high_or_critical } });
  if (t.pending_variation_amount > 0) f.push({ severity: 'info', area: 'variations', message: `Variation orders worth ${inr(t.pending_variation_amount)} are awaiting a decision.`, evidence: { amount: t.pending_variation_amount } });
  if (t.cpi !== null && t.cpi < 1) f.push({ severity: 'medium', area: 'cost', message: `Portfolio cost performance index is ${t.cpi}: ${inr(t.ac)} spent for ${inr(t.ev)} of earned value.`, evidence: { cpi: t.cpi, ac: t.ac, ev: t.ev } });
  const order = { high: 0, medium: 1, info: 2 };
  return f.sort((a, b) => order[a.severity] - order[b.severity]);
}

async function narrate(findings, timeoutMs) {
  const facts = findings.slice(0, 12).map((x) => ({ severity: x.severity, area: x.area, message: x.message }));
  const prompt =
    'Write a briefing for the head of a construction company in five to seven plain sentences. Start with the single most important point. ' +
    'Use only the findings below. Do not add any figure, project or cause that is not in them. Write rupee amounts with Indian grouping.\n' +
    `Findings: ${JSON.stringify(facts)}`;
  try {
    const text = await aiService.generateCompletion({ prompt, systemInstruction: '', responseFormat: 'text', temperature: 0.2, timeoutMs });
    const out = String(text || '').trim();
    return out ? { text: out, status: 'generated' } : { text: null, status: 'unavailable', reason: 'The model returned nothing.' };
  } catch (err) {
    return { text: null, status: 'unavailable', reason: err.message };
  }
}

async function portfolioBrief({ company_id, project_ids = null, narrative = false, now = new Date(), timeoutMs = 45000 }) {
  const overview = await portfolioOverview({ company_id, project_ids, now });
  const findings = findingsFromOverview(overview);
  const result = {
    as_of: overview.as_of,
    totals: overview.totals,
    findings,
    summary: findings.length ? findings.slice(0, 3).map((x) => x.message).join(' ') : 'No open portfolio issues.',
  };
  if (narrative) {
    const n = await narrate(findings, timeoutMs);
    result.narrative = n.text;
    result.narrative_status = n.status;
    if (n.reason) result.narrative_reason = n.reason;
  }
  return result;
}

module.exports = { portfolioOverview, cashOutForecast, criticalPath, vendorScorecard, portfolioBrief, findingsFromOverview };
