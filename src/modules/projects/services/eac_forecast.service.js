'use strict';

/**
 * Estimate-at-Completion (EAC), Cost-Slippage & Monthly Cashflow Forecasting Service.
 * Builds strictly on canonical project_controls.earnedValue(), cost ledger accruals,
 * open commitments, approved/pending variation orders, and dated milestone spans.
 */
const db = require('../../../models');
const controls = require('./project_controls.service');

const DAY_MS = 86400000;
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const round3 = (n) => Math.round((Number(n) || 0) * 1000) / 1000;

function monthKey(dateInput) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function addMonthsKey(ym, offset) {
  const [y, m] = ym.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + offset, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

/**
 * Computes EAC scenarios (Typical, Composite, Atypical), schedule slippage days,
 * variation/commitment exposure, cost-category breakdown, and trailing/projected monthly cashflow.
 */
async function computeEacForecast({ company_id, project_id, status_date = new Date() }) {
  const sd = new Date(status_date);
  const evm = await controls.earnedValue({ company_id, project_id, status_date: sd });

  const [commitmentDeltaSum, variations, ledgerRows, milestones] = await Promise.all([
    db.commitment_ledger.sum('committed_amount_delta', { where: { company_id, project_id } }),
    db.variation_order.findAll({
      where: { company_id, project_id },
      attributes: ['id', 'status', 'net_cost_impact', 'time_extension_days_requested'],
    }),
    db.cost_ledger.findAll({
      where: { company_id, project_id },
      attributes: ['amount', 'cost_category', 'recognition_date'],
      order: [['recognition_date', 'ASC']],
    }),
    db.milestone.findAll({
      where: { project_id, parent_id: null },
      attributes: ['id', 'name', 'startDate', 'endDate', 'progress'],
    }),
  ]);

  const openCommitments = Math.max(0, round2(commitmentDeltaSum || 0));
  const approvedVariationsCost = round2(
    variations
      .filter((v) => v.status === 'approved' || v.status === 'implemented')
      .reduce((s, v) => s + Number(v.net_cost_impact || 0), 0)
  );
  const pendingVariations = variations.filter((v) =>
    ['submitted', 'technical_review', 'commercial_review', 'budget_review'].includes(v.status)
  );
  const pendingVariationsCost = round2(
    pendingVariations.reduce((s, v) => s + Number(v.net_cost_impact || 0), 0)
  );
  const pendingEotDays = Math.round(
    pendingVariations.reduce((s, v) => s + Number(v.time_extension_days_requested || 0), 0)
  );

  // Cost category breakdown & monthly actual burn history
  const byCategory = { labour: 0, equipment: 0, subcontractor: 0, overhead: 0 };
  const monthlyMap = new Map();
  for (const row of ledgerRows) {
    const amt = Number(row.amount || 0);
    if (byCategory[row.cost_category] !== undefined) {
      byCategory[row.cost_category] = round2(byCategory[row.cost_category] + amt);
    }
    const mk = monthKey(row.recognition_date);
    if (mk) monthlyMap.set(mk, round2((monthlyMap.get(mk) || 0) + amt));
  }

  const datedMilestones = milestones.filter(
    (m) => m.startDate && m.endDate && new Date(m.endDate) > new Date(m.startDate)
  );
  const startTimes = datedMilestones.map((m) => new Date(m.startDate).getTime());
  const endTimes = datedMilestones.map((m) => new Date(m.endDate).getTime());
  const baselineStart = startTimes.length ? new Date(Math.min(...startTimes)) : null;
  const baselineEnd = endTimes.length ? new Date(Math.max(...endTimes)) : null;

  if (!evm.applicable) {
    return {
      project_id,
      status_date: evm.status_date,
      applicable: false,
      reason: evm.reason,
      ac: evm.ac,
      open_commitments: openCommitments,
      approved_variations_cost: approvedVariationsCost,
      pending_variations_cost: pendingVariationsCost,
      pending_eot_days: pendingEotDays,
      by_category: byCategory,
      monthly_cashflow: [...monthlyMap.entries()].map(([month, actual]) => ({ month, actual, projected: null })),
    };
  }

  const bac = evm.bac;
  const adjustedBac = round2(bac + approvedVariationsCost);
  const exposureBac = round2(adjustedBac + pendingVariationsCost);
  const ac = evm.ac;
  const ev = evm.ev;
  const pv = evm.pv;
  const cpi = evm.cpi;
  const spi = evm.spi;

  const eacTypical = cpi && cpi > 0 ? round2(bac / cpi) : null;
  const eacComposite = cpi && cpi > 0 && spi && spi > 0 ? round2(ac + Math.max(0, bac - ev) / (cpi * spi)) : null;
  const eacAtypical = round2(ac + Math.max(0, bac - ev));
  const etcTypical = eacTypical !== null ? round2(Math.max(0, eacTypical - ac)) : null;
  const vacTypical = eacTypical !== null ? round2(bac - eacTypical) : null;
  const overrunPct = eacTypical !== null && bac > 0 ? round2(((eacTypical - bac) / bac) * 100) : null;
  const uncommittedExposure = round2(Math.max(0, ac + openCommitments - adjustedBac));

  // Schedule slippage days: remaining planned duration dilated by (1/SPI - 1) + pending variation EOT requests
  const remainingDays = baselineEnd ? Math.max(0, Math.ceil((baselineEnd.getTime() - sd.getTime()) / DAY_MS)) : 0;
  const totalSpanDays = baselineStart && baselineEnd ? Math.max(1, Math.ceil((baselineEnd.getTime() - baselineStart.getTime()) / DAY_MS)) : 0;
  const effectiveRemaining = remainingDays > 0 ? remainingDays : Math.round(totalSpanDays * Math.max(0, 1 - (ev / Math.max(bac, 1))));
  const spiDelayDays = spi && spi > 0 && spi < 1 ? Math.round(effectiveRemaining * ((1 / spi) - 1)) : 0;
  const projectedSlippageDays = Math.max(0, spiDelayDays + pendingEotDays);
  const projectedCompletionDate = baselineEnd
    ? new Date(baselineEnd.getTime() + projectedSlippageDays * DAY_MS).toISOString().slice(0, 10)
    : null;

  // Build monthly cashflow series: trailing actuals + 3 forward forecast months
  const sortedMonths = [...monthlyMap.keys()].sort();
  const recentActuals = sortedMonths.slice(-6).map((m) => monthlyMap.get(m));
  const avgMonthlyBurn = recentActuals.length
    ? round2(recentActuals.reduce((s, v) => s + v, 0) / recentActuals.length)
    : round2((etcTypical ?? Math.max(0, bac - ac)) / 3);
  const monthlyCashflow = sortedMonths.map((month) => ({
    month,
    actual: monthlyMap.get(month),
    projected: null,
  }));

  let cursorMonth = sortedMonths[sortedMonths.length - 1] || monthKey(sd);
  let remainingForecast = etcTypical !== null ? etcTypical : Math.max(0, bac - ac);
  for (let i = 1; i <= 3 && cursorMonth; i += 1) {
    const nextMonth = addMonthsKey(cursorMonth, i);
    const slice = remainingForecast > 0 ? round2(Math.min(remainingForecast, Math.max(avgMonthlyBurn, remainingForecast / (4 - i)))) : 0;
    remainingForecast = round2(Math.max(0, remainingForecast - slice));
    monthlyCashflow.push({ month: nextMonth, actual: null, projected: slice });
  }

  let riskRating = 'Low';
  if ((overrunPct !== null && overrunPct >= 15) || projectedSlippageDays >= 30 || uncommittedExposure > 0) {
    riskRating = 'Critical';
  } else if ((overrunPct !== null && overrunPct >= 8) || projectedSlippageDays >= 14) {
    riskRating = 'High';
  } else if ((overrunPct !== null && overrunPct >= 3) || projectedSlippageDays >= 5) {
    riskRating = 'Moderate';
  }

  return {
    project_id,
    status_date: evm.status_date,
    applicable: true,
    bac,
    adjusted_bac: adjustedBac,
    exposure_bac: exposureBac,
    pv,
    ev,
    ac,
    cpi,
    spi,
    eac_typical: eacTypical,
    eac_composite: eacComposite,
    eac_atypical: eacAtypical,
    etc_typical: etcTypical,
    vac_typical: vacTypical,
    overrun_pct: overrunPct,
    open_commitments: openCommitments,
    uncommitted_overrun_exposure: uncommittedExposure,
    approved_variations_cost: approvedVariationsCost,
    pending_variations_cost: pendingVariationsCost,
    pending_eot_days: pendingEotDays,
    baseline_end_date: baselineEnd ? baselineEnd.toISOString().slice(0, 10) : null,
    projected_slippage_days: projectedSlippageDays,
    projected_completion_date: projectedCompletionDate,
    risk_rating: riskRating,
    by_category: byCategory,
    monthly_cashflow: monthlyCashflow,
  };
}

module.exports = { computeEacForecast };
