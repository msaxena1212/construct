'use strict';
/**
 * Retention and bank guarantee controls (benchmark item 4).
 *
 * Retention: each approved subcontractor RA bill holds retention (retention_amount). Retention is released to the
 * subcontractor only after the defect liability period (DLP) has ended. The DLP starts at the project's handover date
 * and lasts dlp_months calendar months. A release may not exceed the retention still outstanding for that subcontractor.
 *
 * Bank guarantees: a register of guarantees per project (performance, advance, retention or bid), with expiry tracking.
 * A guarantee is active until it is released or invoked; the list flags active guarantees that expire within a window
 * and active guarantees that have already expired.
 *
 * Errors carry a `status` (400 for bad input, 404 for missing records, 409 for rule breaches) for the controller.
 */
const db = require('../../../models');

const BG_TYPES = ['performance', 'advance', 'retention', 'bid'];
const BG_STATUSES_AFTER_ISSUE = ['released', 'invoked'];
// RA bills whose retention is held: approved, invoiced or paid. Drafts and rejected bills hold nothing.
const RETAINED_RA_STATUSES = ['approved', 'invoiced', 'paid'];

const round2 = (n) => Number(Number(n || 0).toFixed(2));

function fail(message, status = 400, code = undefined) {
  const err = new Error(message);
  err.status = status;
  if (code) err.code = code;
  return err;
}

function toDateOnly(value, label) {
  const d = value instanceof Date ? value : new Date(value);
  if (value === null || value === undefined || value === '' || Number.isNaN(d.getTime())) {
    throw fail(`${label} must be a valid date.`);
  }
  return d;
}

/** End of the defect liability period: handover date plus dlp_months calendar months, or null if not handed over. */
function dlpEndDate(project) {
  if (!project.handover_date) return null;
  const end = new Date(project.handover_date);
  end.setMonth(end.getMonth() + Number(project.dlp_months ?? 12));
  return end;
}

async function loadProject(company_id, project_id, transaction = null) {
  const project = await db.project.findOne({ where: { id: project_id, company_id }, transaction });
  if (!project) throw fail('Project not found.', 404);
  return project;
}

/** Retention held, released and outstanding per subcontractor, with the DLP state of the project. */
async function retentionSummary({ company_id, project_id, transaction = null }) {
  const project = await loadProject(company_id, project_id, transaction);
  const bills = await db.contractor_ra_bill.findAll({
    where: { company_id, project_id, status: RETAINED_RA_STATUSES },
    attributes: ['vendor_id', 'retention_amount'],
    transaction,
  });
  const releases = await db.retention_release.findAll({
    where: { company_id, project_id },
    attributes: ['vendor_id', 'amount'],
    transaction,
  });

  const byVendor = new Map();
  const row = (vendorId) => {
    if (!byVendor.has(vendorId)) byVendor.set(vendorId, { vendor_id: vendorId, held: 0, released: 0 });
    return byVendor.get(vendorId);
  };
  for (const b of bills) row(b.vendor_id).held += Number(b.retention_amount || 0);
  for (const r of releases) row(r.vendor_id).released += Number(r.amount || 0);

  const dlpEnd = dlpEndDate(project);
  const dlpEnded = dlpEnd !== null && dlpEnd.getTime() <= Date.now();
  const vendors = [...byVendor.values()]
    .map((v) => ({
      vendor_id: v.vendor_id,
      held: round2(v.held),
      released: round2(v.released),
      outstanding: round2(v.held - v.released),
    }))
    .sort((a, b) => a.vendor_id - b.vendor_id);

  return {
    project_id: project.id,
    handover_date: project.handover_date || null,
    dlp_months: project.dlp_months ?? 12,
    dlp_end_date: dlpEnd ? dlpEnd.toISOString().slice(0, 10) : null,
    dlp_ended: dlpEnded,
    vendors,
    total_outstanding: round2(vendors.reduce((s, v) => s + v.outstanding, 0)),
  };
}

/** Records a retention release after the DLP ends, within the subcontractor's outstanding retention. */
async function releaseRetention({ company_id, project_id, vendor_id, amount, release_date = null, remarks = null, released_by = null, transaction = null }) {
  const project = await loadProject(company_id, project_id, transaction);
  if (!project.handover_date) {
    throw fail('The project has no handover date, so its defect liability period has not started. Record the handover date first.', 409, 'DLP_NOT_STARTED');
  }
  const dlpEnd = dlpEndDate(project);
  if (dlpEnd.getTime() > Date.now()) {
    throw fail(`Retention cannot be released before the defect liability period ends on ${dlpEnd.toISOString().slice(0, 10)}.`, 409, 'DLP_NOT_ENDED');
  }
  const value = round2(amount);
  if (!(value > 0)) throw fail('amount must be a positive number.');

  const vendor = await db.vendors.findOne({ where: { id: vendor_id, company_id }, transaction });
  if (!vendor) throw fail(`Subcontractor #${vendor_id} does not belong to this company.`, 404);

  const summary = await retentionSummary({ company_id, project_id, transaction });
  const line = summary.vendors.find((v) => Number(v.vendor_id) === Number(vendor_id));
  const outstanding = line ? line.outstanding : 0;
  if (value > outstanding) {
    throw fail(`Release of ₹${value} exceeds the retention outstanding for this subcontractor (₹${outstanding}).`, 409, 'RELEASE_EXCEEDS_RETENTION');
  }

  const date = release_date ? toDateOnly(release_date, 'release_date') : new Date();
  return db.retention_release.create(
    {
      company_id,
      project_id,
      vendor_id,
      amount: value,
      release_date: date.toISOString().slice(0, 10),
      remarks: remarks || null,
      released_by,
    },
    { transaction }
  );
}

/** Sets the handover date and the DLP length (calendar months, 0 to 120). */
async function setHandover({ company_id, project_id, handover_date, dlp_months, transaction = null }) {
  const project = await loadProject(company_id, project_id, transaction);
  const updates = {};
  if (handover_date !== undefined) {
    updates.handover_date = toDateOnly(handover_date, 'handover_date');
  }
  if (dlp_months !== undefined) {
    const months = Number(dlp_months);
    if (!Number.isInteger(months) || months < 0 || months > 120) {
      throw fail('dlp_months must be a whole number from 0 to 120.');
    }
    updates.dlp_months = months;
  }
  if (Object.keys(updates).length === 0) throw fail('Give handover_date and/or dlp_months.');
  await project.update(updates, { transaction });
  return project;
}

async function createGuarantee({ company_id, project_id, vendor_id = null, bg_type, bank_name, bg_number, amount, issue_date, expiry_date, remarks = null, created_by = null, transaction = null }) {
  await loadProject(company_id, project_id, transaction);
  if (!BG_TYPES.includes(bg_type)) throw fail(`bg_type must be one of: ${BG_TYPES.join(', ')}.`);
  if (!bank_name || !String(bank_name).trim()) throw fail('bank_name is required.');
  if (!bg_number || !String(bg_number).trim()) throw fail('bg_number is required.');
  const value = round2(amount);
  if (!(value > 0)) throw fail('amount must be a positive number.');
  const issue = toDateOnly(issue_date, 'issue_date');
  const expiry = toDateOnly(expiry_date, 'expiry_date');
  if (expiry.getTime() < issue.getTime()) throw fail('expiry_date must be on or after issue_date.');
  if (vendor_id) {
    const vendor = await db.vendors.findOne({ where: { id: vendor_id, company_id }, transaction });
    if (!vendor) throw fail(`Subcontractor #${vendor_id} does not belong to this company.`, 404);
  }
  return db.bank_guarantee.create(
    {
      company_id,
      project_id,
      vendor_id,
      bg_type,
      bank_name: String(bank_name).trim(),
      bg_number: String(bg_number).trim(),
      amount: value,
      issue_date: issue.toISOString().slice(0, 10),
      expiry_date: expiry.toISOString().slice(0, 10),
      status: 'active',
      remarks,
      created_by,
    },
    { transaction }
  );
}

/**
 * Lists a project's guarantees with expiry flags. expiring_within_days (default 30) sets the warning window for active
 * guarantees. A guarantee still active after its expiry date is flagged expired_active.
 */
async function listGuarantees({ company_id, project_id, expiring_within_days = 30 }) {
  await loadProject(company_id, project_id);
  const windowDays = Number.isInteger(Number(expiring_within_days)) ? Math.max(0, Number(expiring_within_days)) : 30;
  const rows = await db.bank_guarantee.findAll({
    where: { company_id, project_id },
    order: [['expiry_date', 'ASC'], ['id', 'ASC']],
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const horizon = new Date(today.getTime() + windowDays * 86400000);

  const items = rows.map((g) => {
    const expiry = new Date(`${g.expiry_date}T00:00:00Z`);
    const days = Math.round((expiry.getTime() - today.getTime()) / 86400000);
    const isActive = g.status === 'active';
    return {
      ...g.toJSON(),
      days_to_expiry: days,
      expiring: isActive && expiry.getTime() >= today.getTime() && expiry.getTime() <= horizon.getTime(),
      expired_active: isActive && expiry.getTime() < today.getTime(),
    };
  });
  const active = items.filter((i) => i.status === 'active');
  return {
    project_id,
    expiring_within_days: windowDays,
    active_total: round2(active.reduce((s, i) => s + Number(i.amount), 0)),
    expiring_count: items.filter((i) => i.expiring).length,
    expired_active_count: items.filter((i) => i.expired_active).length,
    items,
  };
}

/** Loads one guarantee in the company, so the caller can check access to its project first. */
async function loadGuarantee({ company_id, id }) {
  const guarantee = await db.bank_guarantee.findOne({ where: { id, company_id } });
  if (!guarantee) throw fail('Guarantee not found.', 404);
  return guarantee;
}

/** Moves an active guarantee to released or invoked. Anything else is refused. */
async function setGuaranteeStatus({ company_id, id, status, remarks = null, transaction = null }) {
  const guarantee = await db.bank_guarantee.findOne({ where: { id, company_id }, transaction });
  if (!guarantee) throw fail('Guarantee not found.', 404);
  if (!BG_STATUSES_AFTER_ISSUE.includes(status)) throw fail(`status must be one of: ${BG_STATUSES_AFTER_ISSUE.join(', ')}.`);
  if (guarantee.status !== 'active') throw fail(`This guarantee is already ${guarantee.status}.`, 409, 'BG_NOT_ACTIVE');
  await guarantee.update({ status, remarks: remarks || guarantee.remarks }, { transaction });
  return guarantee;
}

/**
 * Approval ageing (benchmark item 6, partial). Lists payment requests waiting for approval and RA bills waiting for
 * approval, with their age in hours. An item at or over the threshold is marked escalate. Nothing is sent or changed:
 * the list is the alert, and the owner decides who is notified. No value brackets are applied here.
 */
async function approvalAgeing({ company_id, project_id, older_than_hours = 48, now = new Date() }) {
  await loadProject(company_id, project_id);
  const threshold = Number.isFinite(Number(older_than_hours)) ? Math.max(0, Number(older_than_hours)) : 48;
  const payments = await db.vendors_payment_request.findAll({
    where: { company_id, project_id, status: 'pending_approval' },
    attributes: ['id', 'amount', 'requested_by', 'createdAt'],
  });
  const bills = await db.contractor_ra_bill.findAll({
    where: { company_id, project_id, status: ['submitted', 'certified'] },
    attributes: ['id', 'ra_bill_number', 'current_period_gross_amount', 'status', 'prepared_by', 'createdAt'],
  });
  const row = (kind, id, amount, status, by, createdAt, label) => {
    // A timestamp that cannot be read gives an unknown age, which is shown as such and never escalated.
    const t = new Date(createdAt).getTime();
    const valid = Number.isFinite(t);
    const ageHours = valid ? Math.round(((now.getTime() - t) / 3600000) * 10) / 10 : null;
    return {
      kind, id, label, amount: round2(amount), status, submitted_by: by || null,
      submitted_at: valid ? new Date(t).toISOString() : null,
      age_hours: ageHours,
      escalate: valid && ageHours >= threshold,
    };
  };
  const items = [
    ...payments.map((p) => row('payment_request', p.id, p.amount, 'pending_approval', p.requested_by, p.createdAt, `Payment request #${p.id}`)),
    ...bills.map((b) => row('ra_bill', b.id, b.current_period_gross_amount, b.status, b.prepared_by, b.createdAt, b.ra_bill_number)),
  ].sort((a, b) => (b.age_hours ?? -1) - (a.age_hours ?? -1));
  return {
    project_id,
    older_than_hours: threshold,
    waiting_count: items.length,
    escalate_count: items.filter((i) => i.escalate).length,
    items,
  };
}

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const mean = (xs) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0);
const round3 = (n) => (n === null || n === undefined ? null : Number(Number(n).toFixed(3)));

/**
 * Earned value at a status date (benchmark item 9, partial). Method, stated so the figures are read correctly:
 *   BAC = total of the latest approved budget revision.
 *   PV  = BAC x mean over dated milestones of the share of each milestone's span that has elapsed by the status date.
 *   EV  = BAC x mean over dated milestones of each milestone's progress (0 to 100).
 *   AC  = net cost in the cost ledger for the project (all heads).
 * Milestones are weighted equally, because the schema holds no per-milestone value. Milestones without start and end
 * dates are left out and counted. CPI = EV / AC, SPI = EV / PV, EAC = BAC / CPI. Nothing is stored.
 */
async function earnedValue({ company_id, project_id, status_date = new Date() }) {
  await loadProject(company_id, project_id);
  const sd = new Date(status_date);
  if (Number.isNaN(sd.getTime())) throw fail('status_date must be a valid date.');
  const budget = await db.budget.findOne({
    where: { company_id, project_id, status: 'approved' },
    order: [['revision_number', 'DESC']],
  });
  const milestones = await db.milestone.findAll({
    where: { project_id, parent_id: null },
    attributes: ['id', 'name', 'startDate', 'endDate', 'progress'],
  });
  const dated = milestones.filter((m) => m.startDate && m.endDate && new Date(m.endDate) > new Date(m.startDate));
  const ac = round2(await db.cost_ledger.sum('amount', { where: { company_id, project_id } }));
  const base = {
    project_id,
    status_date: sd.toISOString().slice(0, 10),
    ac,
    milestones_used: dated.length,
    milestones_without_dates: milestones.length - dated.length,
  };
  if (!budget) return { ...base, applicable: false, reason: 'no_approved_budget' };
  if (dated.length === 0) return { ...base, applicable: false, reason: 'no_dated_milestones' };

  const bac = round2(budget.total_budget_amount);
  const planned = dated.map((m) => {
    const start = new Date(m.startDate).getTime();
    const end = new Date(m.endDate).getTime();
    return clamp01((sd.getTime() - start) / (end - start));
  });
  const actual = dated.map((m) => clamp01(Number(m.progress || 0) / 100));
  const pv = round2(bac * mean(planned));
  const ev = round2(bac * mean(actual));
  const cpi = ac > 0 ? round3(ev / ac) : null;
  const spi = pv > 0 ? round3(ev / pv) : null;
  return {
    ...base,
    applicable: true,
    bac,
    pv,
    ev,
    cv: round2(ev - ac),
    sv: round2(ev - pv),
    cpi,
    spi,
    eac: cpi ? round2(bac / cpi) : null,
    method: 'Equal-weight dated milestones. PV is linear over each milestone span; EV uses milestone progress; AC is the net cost ledger.',
  };
}

module.exports = {
  approvalAgeing,
  earnedValue,
  BG_TYPES,
  dlpEndDate,
  retentionSummary,
  releaseRetention,
  setHandover,
  createGuarantee,
  listGuarantees,
  loadGuarantee,
  setGuaranteeStatus,
};
