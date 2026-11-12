'use strict';
/**
 * India coverage for construction projects. Checks and flags; it does not file, pay or change anything.
 *
 * Rules used (each finding names its rule, so a reviewer can check it):
 *   - GSTIN and PAN format (GSTIN: 15 characters, state code then PAN then entity code, 'Z', check character).
 *   - TDS under section 194C of the Income Tax Act: 1% where the payee is an individual or HUF, 2% otherwise. The
 *     system does not store the payee's legal form, so a 1% or 2% rate is accepted and a note is added.
 *   - GST on works contracts at 18% (INDIA_GST_WORKS_RATE, default 18). Shown as a computed figure, not stored, because
 *     the invoice is the tax document.
 *   - Section 269ST: receipts of ₹2,00,000 or more in cash in a single day from one person are not allowed.
 *   - Contract labour: licensing applies from 50 contract workers (as the OSH Code, 2020, now provides). Flagged for
 *     a compliance adviser to confirm; the threshold is an input, not a legal conclusion.
 * Figures are in rupees. Indian grouping (e.g. ₹8,50,000) is used in the messages.
 */
const db = require('../../../models');

const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const PAN_RE = /^[A-Z]{5}\d{4}[A-Z]$/;
const CASH_269ST_LIMIT = 200000;
const CONTRACT_LABOUR_THRESHOLD = 50;
const RA_STATUSES = ['submitted', 'certified', 'approved', 'invoiced', 'paid'];

const gstWorksRate = () => {
  const raw = Number(process.env.INDIA_GST_WORKS_RATE);
  return Number.isFinite(raw) && raw >= 0 && raw <= 28 ? raw : 18;
};

/** Indian digit grouping: 1234567 -> 12,34,567. */
function inr(amount) {
  const n = Math.round(Number(amount) || 0);
  const neg = n < 0;
  const digits = String(Math.abs(n));
  let out;
  if (digits.length <= 3) {
    out = digits;
  } else {
    const last3 = digits.slice(-3);
    let rest = digits.slice(0, -3);
    const parts = [];
    while (rest.length > 2) {
      parts.unshift(rest.slice(-2));
      rest = rest.slice(0, -2);
    }
    if (rest) parts.unshift(rest);
    out = `${parts.join(',')},${last3}`;
  }
  return `${neg ? '-' : ''}₹${out}`;
}

/** Indian financial year (1 April to 31 March) for a date, e.g. 2026-11-09 -> "2026-27". */
function financialYear(date) {
  const d = new Date(date);
  const startYear = d.getUTCMonth() >= 3 ? d.getUTCFullYear() : d.getUTCFullYear() - 1;
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;
}

const validGstin = (v) => typeof v === 'string' && GSTIN_RE.test(v.trim().toUpperCase());
const validPan = (v) => typeof v === 'string' && PAN_RE.test(v.trim().toUpperCase());

/**
 * Pure: the findings for India checks, from loaded records. Exported for tests.
 * @param {{ vendors: object[], raBills: object[], paymentRequests: object[], labourCount: number, now?: Date }} input
 */
function indiaFindings({ vendors = [], raBills = [], paymentRequests = [], labourCount = 0, now = new Date() }) {
  const findings = [];
  const gstRate = gstWorksRate();

  for (const v of vendors) {
    if (!v.gst_no) {
      findings.push({
        severity: 'medium', area: 'gst', subject: { type: 'vendor', id: v.id, label: v.name },
        message: `${v.name} has no GSTIN recorded. Check whether the supplier is unregistered; if so, reverse charge may apply to its works bills.`,
        rule: 'GST registration and reverse charge', proposed_action: 'Obtain the GSTIN or confirm the supplier is unregistered.',
      });
    } else if (!validGstin(v.gst_no)) {
      findings.push({
        severity: 'high', area: 'gst', subject: { type: 'vendor', id: v.id, label: v.name },
        message: `${v.name} has a GSTIN (${v.gst_no}) that does not match the 15-character format.`,
        rule: 'GSTIN format', proposed_action: 'Correct the GSTIN against the registration certificate.',
      });
    }
    if (!v.pan_card_no) {
      findings.push({
        severity: 'high', area: 'tds', subject: { type: 'vendor', id: v.id, label: v.name },
        message: `${v.name} has no PAN recorded. Tax must be deducted at the higher rate where PAN is not furnished.`,
        rule: 'PAN for TDS (section 206AA)', proposed_action: 'Obtain the PAN before the next payment.',
      });
    } else if (!validPan(v.pan_card_no)) {
      findings.push({
        severity: 'high', area: 'tds', subject: { type: 'vendor', id: v.id, label: v.name },
        message: `${v.name} has a PAN (${v.pan_card_no}) that does not match the format.`,
        rule: 'PAN format', proposed_action: 'Correct the PAN against the PAN card.',
      });
    }
  }

  const vendorById = new Map(vendors.map((v) => [v.id, v]));
  for (const b of raBills) {
    if (!RA_STATUSES.includes(b.status)) continue;
    const gross = Number(b.current_period_gross_amount || 0);
    const vendor = vendorById.get(b.vendor_id);
    const label = `RA bill ${b.ra_bill_number}`;
    const tdsRate = Number(b.tds_rate_pct || 0);
    if (gross > 0 && tdsRate === 0) {
      findings.push({
        severity: 'high', area: 'tds', subject: { type: 'ra_bill', id: b.id, label },
        message: `${label} (${inr(gross)}) has no TDS deducted. Section 194C applies to works contracts: 1% for an individual or HUF payee, 2% for others.`,
        rule: 'TDS under section 194C', proposed_action: 'Recompute the bill with TDS at 2% (1% if the payee is an individual or HUF).',
      });
    } else if (gross > 0 && tdsRate !== 1 && tdsRate !== 2) {
      findings.push({
        severity: 'medium', area: 'tds', subject: { type: 'ra_bill', id: b.id, label },
        message: `${label} has TDS at ${tdsRate}%, which is not a section 194C rate (1% or 2%).`,
        rule: 'TDS under section 194C', proposed_action: 'Confirm the rate with the accounts team.',
      });
    }
    if (gross > 0 && vendor && vendor.gst_no) {
      const gst = Math.round((gross * gstRate) / 100);
      findings.push({
        severity: 'info', area: 'gst', subject: { type: 'ra_bill', id: b.id, label },
        message: `${label}: GST at ${gstRate}% on works contracts is ${inr(gst)} on ${inr(gross)}. Confirm against the supplier's tax invoice.`,
        rule: 'GST on works contracts', proposed_action: 'Match the GST amount to the supplier invoice before payment.',
      });
    }
  }

  for (const p of paymentRequests) {
    if (p.status !== 'pending_approval' && p.status !== 'approved') continue;
    if (String(p.mode || '').toLowerCase() === 'cash' && Number(p.amount) >= CASH_269ST_LIMIT) {
      findings.push({
        severity: 'high', area: 'cash', subject: { type: 'payment_request', id: p.id, label: `Payment request #${p.id}` },
        message: `Payment request #${p.id} is a cash payment of ${inr(p.amount)}. Section 269ST restricts cash receipts of ₹2,00,000 or more.`,
        rule: 'Section 269ST', proposed_action: 'Change the mode to bank transfer or cheque.',
      });
    }
  }

  if (labourCount >= CONTRACT_LABOUR_THRESHOLD) {
    findings.push({
      severity: 'medium', area: 'labour', subject: { type: 'project', label: 'contract labour' },
      message: `${labourCount} contract workers are on the roster. At ${CONTRACT_LABOUR_THRESHOLD} or more, contract labour licensing applies (OSH Code, 2020). A compliance adviser should confirm the requirement and the current threshold.`,
      rule: 'Contract labour licensing (OSH Code, 2020)', proposed_action: 'Confirm licence status and the register of contract labour.',
    });
  }

  findings.push({
    severity: 'info', area: 'fy', subject: { type: 'project', label: 'financial year' },
    message: `Figures are for the financial year ${financialYear(now)}.`,
    rule: 'Financial year (1 April to 31 March)', proposed_action: 'None.',
  });

  const order = { high: 0, medium: 1, info: 2 };
  return findings.sort((a, b) => order[a.severity] - order[b.severity]);
}

/** Loads the records for one project and returns the India findings. Read only. */
async function indiaCompliance({ company_id, project_id, now = new Date() }) {
  const invoiceVendors = await db.vendors_invoice.findAll({ where: { company_id, project_id }, attributes: ['vendor_id'] });
  const orderVendors = await db.purchase_order.findAll({ where: { company_id, project_id }, attributes: ['vendor_id'] });
  const raBills = await db.contractor_ra_bill.findAll({
    where: { company_id, project_id },
    attributes: ['id', 'ra_bill_number', 'vendor_id', 'status', 'current_period_gross_amount', 'tds_rate_pct'],
  });
  // Vendors on this project: invoiced, ordered from, or billed through an RA bill.
  const ids = new Set([...invoiceVendors, ...orderVendors].map((r) => r.vendor_id).concat(raBills.map((b) => b.vendor_id)).filter(Boolean));
  const vendors = ids.size ? await db.vendors.findAll({ where: { company_id, id: [...ids] }, attributes: ['id', 'name', 'gst_no', 'pan_card_no'] }) : [];
  const paymentRequests = await db.vendors_payment_request.findAll({
    where: { company_id, project_id },
    attributes: ['id', 'amount', 'mode', 'status'],
  });
  const labourRows = await db.vendors_labor.findAll({ where: { company_id }, attributes: ['count'] });
  const labourCount = labourRows.reduce((s, r) => s + Number(r.count || 0), 0);

  const findings = indiaFindings({
    vendors: vendors.map((v) => v.toJSON()),
    raBills: raBills.map((b) => b.toJSON()),
    paymentRequests: paymentRequests.map((p) => p.toJSON()),
    labourCount,
    now,
  });
  return {
    project_id,
    financial_year: financialYear(now),
    counts: {
      high: findings.filter((f) => f.severity === 'high').length,
      medium: findings.filter((f) => f.severity === 'medium').length,
      info: findings.filter((f) => f.severity === 'info').length,
    },
    findings,
    disclaimer: 'Flags for review. Not legal or tax advice; a qualified adviser must confirm each point.',
  };
}

module.exports = { indiaCompliance, indiaFindings, inr, financialYear, validGstin, validPan, gstWorksRate, GSTIN_RE, PAN_RE };
