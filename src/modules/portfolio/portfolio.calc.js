'use strict';
/**
 * Pure calculations for the portfolio layer. No database, no clock, no network: everything is passed in, so each
 * rule can be tested on its own and every figure can be traced back to its inputs.
 *
 *   riskFrom       project risk score (0 to 100), red/amber/green and the drivers behind it
 *   computeCriticalPath   critical path method over tasks and dependencies
 *   bucketCashOut  weekly buckets for committed cash-out
 *   vendorScoreFrom       subcontractor and supplier score (0 to 100) with grade and reasons
 */

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const DAY = 86400000;

// ---------------------------------------------------------------------------------------------------------------
// Project risk
// ---------------------------------------------------------------------------------------------------------------

/**
 * Weights (points added to the score, capped per driver). The score is a transparent sum, not a model:
 *   cost      CPI below 1 (cost running ahead of earned value)       up to 30
 *   schedule  SPI below 1 (behind the plan)                          up to 25
 *   quality   open snags, weighted by severity                       up to 15
 *   approvals items waiting past the escalation threshold            up to 10
 *   cover     bank guarantees expired while active, or expiring      up to 10
 *   reporting no daily report for several days                       up to 5
 *   tasks     overdue tasks that are not completed                   up to 5
 *   status    the project is marked Delayed by the team              8
 * Where a figure cannot be calculated (no approved budget, no dated milestones) it adds nothing and is listed in
 * `unknown`, so a blank is never read as "fine".
 *
 * RAG: red at 55 and above, amber at 30 and above, otherwise green.
 */
function riskFrom(m) {
  const drivers = [];
  const unknown = [];
  let score = 0;
  const add = (area, points, message, evidence) => {
    const pts = Math.round(points);
    if (pts <= 0) return;
    score += pts;
    drivers.push({ area, points: pts, message, evidence });
  };

  if (m.evm && m.evm.applicable) {
    if (m.evm.cpi !== null && m.evm.cpi !== undefined) {
      add('cost', clamp((1 - m.evm.cpi) * 100, 0, 30), `Cost performance index is ${m.evm.cpi}: cost is ahead of earned value.`, { cpi: m.evm.cpi, cv: m.evm.cv });
    } else unknown.push('cost');
    if (m.evm.spi !== null && m.evm.spi !== undefined) {
      add('schedule', clamp((1 - m.evm.spi) * 80, 0, 25), `Schedule performance index is ${m.evm.spi}: progress is behind the plan.`, { spi: m.evm.spi, sv: m.evm.sv });
    } else unknown.push('schedule');
  } else {
    unknown.push('cost', 'schedule');
  }

  const sev = m.snags || {};
  const snagPoints = (sev.critical || 0) * 6 + (sev.high || 0) * 3 + (sev.medium || 0) * 1 + (sev.low || 0) * 0.5;
  add('quality', clamp(snagPoints, 0, 15), `${(sev.critical || 0) + (sev.high || 0) + (sev.medium || 0) + (sev.low || 0)} open snag(s), ${(sev.critical || 0) + (sev.high || 0)} of them high or critical.`, { ...sev });

  const ap = m.approvals || {};
  add('approvals', clamp((ap.escalate_count || 0) * 4, 0, 10), `${ap.escalate_count || 0} item(s) waiting past the escalation threshold.`, { waiting: ap.waiting_count || 0, escalate: ap.escalate_count || 0 });

  const g = m.guarantees || {};
  add('cover', clamp((g.expired_active_count || 0) * 6 + (g.expiring_count || 0) * 3, 0, 10), `${g.expired_active_count || 0} guarantee(s) past expiry but still active, ${g.expiring_count || 0} expiring soon.`, { expired_active: g.expired_active_count || 0, expiring: g.expiring_count || 0 });

  if (m.days_since_dpr === null || m.days_since_dpr === undefined) unknown.push('reporting');
  else add('reporting', clamp((m.days_since_dpr - 2) * 1.5, 0, 5), `The last daily report was ${m.days_since_dpr} day(s) ago.`, { days_since_dpr: m.days_since_dpr });

  add('tasks', clamp((m.overdue_tasks || 0) * 1.5, 0, 5), `${m.overdue_tasks || 0} task(s) are past their due date and not complete.`, { overdue_tasks: m.overdue_tasks || 0 });

  if (m.status === 'Delayed') add('status', 8, 'The project is marked Delayed by the project team.', { status: m.status });

  // A completed project carries no forward delivery risk from cost or schedule indices.
  if (m.status === 'Completed') {
    score = Math.min(score, 20);
  }

  score = clamp(Math.round(score), 0, 100);
  const rag = score >= 55 ? 'red' : score >= 30 ? 'amber' : 'green';
  drivers.sort((a, b) => b.points - a.points);
  return { score, rag, drivers, unknown: [...new Set(unknown)] };
}

// ---------------------------------------------------------------------------------------------------------------
// Critical path
// ---------------------------------------------------------------------------------------------------------------

/**
 * Critical path method on a set of tasks and dependencies.
 * @param {{id:number, duration:number}[]} tasks   duration in days (at least 1)
 * @param {{task_id:number, predecessor_id:number, type:'FS'|'SS'|'FF'|'SF', lag:number}[]} deps
 * Returns { ok, cycle?, tasks: [{id, es, ef, ls, lf, float, critical}], finish, critical_path: [ids] }
 * Day numbers start at 0. Dependencies that point at a task outside the set are ignored and counted.
 */
function computeCriticalPath(tasks, deps) {
  const byId = new Map(tasks.map((t) => [t.id, { ...t, duration: Math.max(1, Math.round(Number(t.duration) || 1)) }]));
  const edges = [];
  let ignored = 0;
  for (const d of deps) {
    if (!byId.has(d.task_id) || !byId.has(d.predecessor_id) || d.task_id === d.predecessor_id) { ignored += 1; continue; }
    edges.push({ from: d.predecessor_id, to: d.task_id, type: d.type || 'FS', lag: Number(d.lag) || 0 });
  }

  // Topological order (Kahn). A cycle makes the path undefined; report it and stop.
  const indeg = new Map([...byId.keys()].map((id) => [id, 0]));
  const out = new Map([...byId.keys()].map((id) => [id, []]));
  for (const e of edges) { indeg.set(e.to, indeg.get(e.to) + 1); out.get(e.from).push(e); }
  const queue = [...indeg.entries()].filter(([, n]) => n === 0).map(([id]) => id);
  const order = [];
  while (queue.length) {
    const id = queue.shift();
    order.push(id);
    for (const e of out.get(id)) {
      indeg.set(e.to, indeg.get(e.to) - 1);
      if (indeg.get(e.to) === 0) queue.push(e.to);
    }
  }
  if (order.length !== byId.size) {
    const stuck = [...indeg.entries()].filter(([, n]) => n > 0).map(([id]) => id);
    return { ok: false, cycle: stuck, ignored_dependencies: ignored, tasks: [], finish: null, critical_path: [] };
  }

  const es = new Map();
  const ef = new Map();
  for (const id of order) {
    const t = byId.get(id);
    let start = 0;
    for (const e of edges.filter((x) => x.to === id)) {
      let need;
      if (e.type === 'FS') need = ef.get(e.from) + e.lag;
      else if (e.type === 'SS') need = es.get(e.from) + e.lag;
      else if (e.type === 'FF') need = ef.get(e.from) + e.lag - t.duration;
      else need = es.get(e.from) + e.lag - t.duration; // SF
      start = Math.max(start, need);
    }
    es.set(id, start);
    ef.set(id, start + t.duration);
  }
  const finish = Math.max(0, ...[...ef.values()]);

  const lf = new Map();
  const ls = new Map();
  for (const id of [...order].reverse()) {
    const t = byId.get(id);
    let latestFinish = finish;
    // Limit on this task's latest finish from each successor (lag in days):
    //   FS: LF <= LS_succ - lag          SS: LF <= LS_succ - lag + dur
    //   FF: LF <= LF_succ - lag          SF: LF <= LF_succ - lag + dur
    for (const e of out.get(id)) {
      let limit;
      if (e.type === 'FS') limit = ls.get(e.to) - e.lag;
      else if (e.type === 'SS') limit = ls.get(e.to) - e.lag + t.duration;
      else if (e.type === 'FF') limit = lf.get(e.to) - e.lag;
      else limit = lf.get(e.to) - e.lag + t.duration;
      latestFinish = Math.min(latestFinish, limit);
    }
    lf.set(id, latestFinish);
    ls.set(id, latestFinish - t.duration);
  }

  const rows = order.map((id) => {
    const total = ls.get(id) - es.get(id);
    return { id, es: es.get(id), ef: ef.get(id), ls: ls.get(id), lf: lf.get(id), float: total, critical: total === 0 };
  });

  // One critical chain, in order, following zero-float tasks from the earliest start.
  const critical = rows.filter((r) => r.critical).sort((a, b) => a.es - b.es || a.ef - b.ef).map((r) => r.id);
  return { ok: true, ignored_dependencies: ignored, tasks: rows, finish, critical_path: critical };
}

// ---------------------------------------------------------------------------------------------------------------
// Cash-out forecast
// ---------------------------------------------------------------------------------------------------------------

/**
 * Buckets committed outflows into weekly totals.
 * @param {{ date: Date|string, amount: number, source: string, label?: string, project_id?: number }[]} items
 * @param {Date} now      start of week 1 (the date given, not rounded)
 * @param {number} weeks  number of weekly buckets (1 to 52)
 * Items dated before `now` are due now and go into week 1, flagged as overdue. Items beyond the horizon are counted
 * in `beyond_horizon`. Nothing is dropped silently.
 */
function bucketCashOut(items, now, weeks = 13) {
  const n = clamp(Math.round(Number(weeks) || 13), 1, 52);
  const start = new Date(now).getTime();
  const buckets = Array.from({ length: n }, (_, i) => ({
    week: i + 1,
    starts_on: new Date(start + i * 7 * DAY).toISOString().slice(0, 10),
    total: 0,
    overdue: 0,
    by_source: {},
    item_count: 0,
  }));
  let beyondCount = 0;
  let beyondAmount = 0;
  for (const it of items) {
    const amount = Number(it.amount) || 0;
    if (amount <= 0) continue;
    const t = new Date(it.date).getTime();
    if (!Number.isFinite(t)) continue;
    const overdue = t < start;
    const idx = overdue ? 0 : Math.floor((t - start) / (7 * DAY));
    if (idx >= n) { beyondCount += 1; beyondAmount += amount; continue; }
    const b = buckets[idx];
    b.total += amount;
    if (overdue) b.overdue += amount;
    b.by_source[it.source] = (b.by_source[it.source] || 0) + amount;
    b.item_count += 1;
  }
  let running = 0;
  for (const b of buckets) {
    b.total = round2(b.total);
    b.overdue = round2(b.overdue);
    for (const k of Object.keys(b.by_source)) b.by_source[k] = round2(b.by_source[k]);
    running += b.total;
    b.cumulative = round2(running);
  }
  const avg = buckets.reduce((s, b) => s + b.total, 0) / n;
  const peak = buckets.reduce((a, b) => (b.total > a.total ? b : a), buckets[0]);
  return {
    weeks: buckets,
    total: round2(running),
    average_week: round2(avg),
    peak_week: peak.total > 0 ? { week: peak.week, starts_on: peak.starts_on, total: peak.total } : null,
    beyond_horizon: { count: beyondCount, amount: round2(beyondAmount) },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Vendor score
// ---------------------------------------------------------------------------------------------------------------

/**
 * Score for a subcontractor or supplier, 0 to 100, with the reasons. Start at 100 and deduct:
 *   registration  no GSTIN -15, no PAN -10
 *   quality       goods rejected on receipt: up to -25 (rejection rate x 250)
 *   defects       open snags assigned: -3 each (high or critical -6), up to -25
 *   compliance    a stored compliance score between 1 and 79 loses (80 - score) / 4, up to -10 (0 means not assessed)
 *   payment       share of invoices still unpaid above 60%: up to -10
 * Grade: A 85 and above, B 70 to 84, C 55 to 69, D below 55.
 */
function vendorScoreFrom(v) {
  const reasons = [];
  let score = 100;
  const deduct = (points, reason, evidence) => {
    const p = Math.round(points * 10) / 10;
    if (p <= 0) return;
    score -= p;
    reasons.push({ points: p, reason, evidence });
  };
  if (!v.gst_no) deduct(15, 'No GSTIN on record.', {});
  if (!v.pan_card_no) deduct(10, 'No PAN on record.', {});
  if (v.received_qty > 0) {
    const rate = v.rejected_qty / v.received_qty;
    deduct(clamp(rate * 250, 0, 25), `${round2(rate * 100)}% of goods received were rejected.`, { received: v.received_qty, rejected: v.rejected_qty });
  }
  const snagPts = (v.open_snags_high || 0) * 6 + Math.max(0, (v.open_snags || 0) - (v.open_snags_high || 0)) * 3;
  deduct(clamp(snagPts, 0, 25), `${v.open_snags || 0} open snag(s) assigned, ${v.open_snags_high || 0} high or critical.`, { open: v.open_snags || 0, high: v.open_snags_high || 0 });
  // A stored score of 0 is the column default for "never assessed", so it is not read as a failed assessment.
  if (Number.isFinite(v.compliance_score) && v.compliance_score > 0 && v.compliance_score < 80) {
    deduct(clamp((80 - v.compliance_score) / 4, 0, 10), `Stored compliance score is ${v.compliance_score}.`, { compliance_score: v.compliance_score });
  }
  if (v.invoice_count > 0) {
    const unpaid = v.unpaid_invoice_count / v.invoice_count;
    if (unpaid > 0.6) deduct(clamp((unpaid - 0.6) * 25, 0, 10), `${v.unpaid_invoice_count} of ${v.invoice_count} invoices are unpaid.`, { unpaid: v.unpaid_invoice_count, total: v.invoice_count });
  }
  score = clamp(Math.round(score), 0, 100);
  const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : 'D';
  reasons.sort((a, b) => b.points - a.points);
  return { score, grade, reasons };
}

module.exports = { riskFrom, computeCriticalPath, bucketCashOut, vendorScoreFrom, round2 };
