'use strict';
/**
 * Three-way match between a vendor invoice, its goods receipts (GRN) and the purchase order (PO).
 *
 * Used by payment request approval (enforcement) and by the invoice match report (preview), so both apply the same
 * rules. This module is pure: the caller loads the invoice, the GRNs and the sibling invoices.
 *
 * Rules, checked for each invoice line in order:
 *   1. Rate: when the line matches an accepted GRN line that carries a PO unit rate, the invoice rate may exceed that
 *      rate by at most the tolerance (INVOICE_RATE_TOLERANCE_PERCENT, default 5%). A lower rate is not an exception.
 *   2. Quantity: the cumulative billed quantity (other counted invoices plus this one) may not exceed the accepted GRN
 *      quantity under the target PO. Applies only when the vendor/project has GRNs.
 * An approved exception skips the GRN checks for every line. The caller must require and record a reason for it.
 *
 * Messages are kept exactly as they were before this module existed, because approvals and tests depend on them.
 */

const DEFAULT_TOLERANCE_RATIO = 0.05;

function parseToleranceRate(raw = process.env.INVOICE_RATE_TOLERANCE_PERCENT) {
  if (raw !== undefined && raw !== null && String(raw).trim() !== '') {
    const parsed = Number(raw);
    if (!isNaN(parsed) && isFinite(parsed) && parsed >= 0 && parsed <= 100) {
      return parsed / 100;
    }
  }
  return DEFAULT_TOLERANCE_RATIO;
}

const norm = (v) => String(v).trim().toLowerCase();

/**
 * Evaluates the invoice against its GRNs and counted sibling invoices.
 * @param {object} args
 * @param {object} args.invoice            invoice with purchase_order_id and items
 * @param {Array}  args.grns               goods receipts for the vendor (and project, PO when given), with items
 * @param {Array}  args.siblingInvoices    other invoices of the same vendor/project: { id, status, items }
 * @param {Set}    args.countedInvoiceIds  ids of sibling invoices with approved or paid payment requests
 * @param {boolean} [args.allowUnmatchedException] approver override: skips GRN checks
 * @param {number} [args.toleranceRatio]   rate tolerance as a ratio (0.05 = 5%)
 * @returns {{ lines: Array, violations: Array, grn_checked: boolean }}
 */
function evaluateThreeWayMatch({
  invoice,
  grns = [],
  siblingInvoices = [],
  countedInvoiceIds = new Set(),
  allowUnmatchedException = false,
  toleranceRatio = parseToleranceRate(),
}) {
  const invoicePoId = invoice.purchase_order_id || null;
  const invoiceItems = Array.isArray(invoice.items) ? invoice.items : [];
  const isProcurementInvoice = Boolean(invoicePoId || invoiceItems.some((it) => it.purchase_order_id || it.item_code || it.material_id));
  const lines = [];
  const violations = [];

  invoiceItems.forEach((invIt, index) => {
    const targetPoId = invIt.purchase_order_id || invoicePoId;
    const label = invIt.item_code || invIt.description;
    const hasLineIdentifiers = Boolean(invIt.item_code || invIt.material_id);
    // A procurement line without item_code or material_id cannot be matched. Kept as its own flag, because the rate and
    // quantity checks below set the status and must not hide it.
    const unidentified = isProcurementInvoice && !hasLineIdentifiers && !invIt.is_service_line;
    const line = {
      index,
      label: label || null,
      target_po_id: targetPoId || null,
      current_qty: Number(invIt.quantity || 0),
      invoice_rate: invIt.unit_price != null ? Number(invIt.unit_price) : null,
      po_unit_rate: null,
      accepted_grn_qty: 0,
      previously_billed_qty: 0,
      remaining_capacity: null,
      identified: hasLineIdentifiers,
      unidentified,
      status: 'matched',
    };

    if (allowUnmatchedException) {
      line.status = 'exception_approved';
      lines.push(line);
      return;
    }

    // Accepted GRN quantity and the PO unit rate, for the target PO only.
    let acceptedTotal = 0;
    let poUnitRate = null;
    for (const g of grns) {
      if (targetPoId && Number(g.purchase_order_id) !== Number(targetPoId)) continue;
      const gItems = Array.isArray(g.items) ? g.items : [];
      for (const gi of gItems) {
        const codeMatch = invIt.item_code && gi.item_code && norm(invIt.item_code) === norm(gi.item_code);
        const descMatch = invIt.description && gi.item_code && norm(invIt.description).includes(norm(gi.item_code));
        const matIdMatch = invIt.material_id && gi.material_id && Number(invIt.material_id) === Number(gi.material_id);
        if (codeMatch || descMatch || matIdMatch) {
          acceptedTotal += Number(gi.accepted_qty || 0);
          if (gi.unit_rate != null && poUnitRate == null) {
            poUnitRate = Number(gi.unit_rate);
          }
        }
      }
    }
    line.accepted_grn_qty = acceptedTotal;
    line.po_unit_rate = poUnitRate;

    // 1. Rate tolerance against the PO unit rate.
    if (targetPoId && poUnitRate != null && invIt.unit_price != null) {
      const invRate = Number(invIt.unit_price);
      const rateDiscrepancy = Math.abs(invRate - poUnitRate);
      const tolerancePercent = Number((toleranceRatio * 100).toFixed(2));
      const maxAllowedDiscrepancy = poUnitRate * toleranceRatio;
      if (rateDiscrepancy > maxAllowedDiscrepancy && invRate > poUnitRate) {
        const message = `3-Way match failed: Unit price ₹${invRate} for item '${invIt.item_code || invIt.description}' exceeds approved PO rate ₹${poUnitRate} beyond allowed ${tolerancePercent}% tolerance.`;
        violations.push({ index, code: 'RATE_ABOVE_PO', message });
        line.status = 'rate_exception';
      }
    }

    // 2. Cumulative billed quantity across the other counted invoices.
    let cumulativePreviouslyBilled = 0;
    for (const sib of siblingInvoices) {
      if (Number(sib.id) === Number(invoice.id)) continue; // Do not count the current invoice twice
      const isCounted = sib.status === 'Paid' || sib.status === 'Partially Paid' || countedInvoiceIds.has(sib.id);
      if (!isCounted) continue;

      const sibItems = Array.isArray(sib.items) ? sib.items : [];
      for (const sit of sibItems) {
        const sibPoId = sit.purchase_order_id || sib.purchase_order_id;
        if (targetPoId && sibPoId && Number(sibPoId) !== Number(targetPoId)) continue;
        const codeMatch = invIt.item_code && sit.item_code && norm(invIt.item_code) === norm(sit.item_code);
        const descMatch = invIt.description && sit.item_code && norm(invIt.description).includes(norm(sit.item_code));
        const matIdMatch = invIt.material_id && sit.material_id && Number(invIt.material_id) === Number(sit.material_id);
        if (codeMatch || descMatch || matIdMatch) {
          cumulativePreviouslyBilled += Number(sit.quantity || 0);
        }
      }
    }

    const currentBilledQty = Number(invIt.quantity || 0);
    const totalCumulativeBilled = cumulativePreviouslyBilled + currentBilledQty;
    const remainingCapacity = Math.max(0, acceptedTotal - cumulativePreviouslyBilled);
    line.previously_billed_qty = cumulativePreviouslyBilled;
    line.remaining_capacity = remainingCapacity;

    if (grns.length > 0 && totalCumulativeBilled > acceptedTotal) {
      const message = `3-Way match failed: Item '${invIt.item_code || invIt.description}' cumulative billed quantity (${totalCumulativeBilled}) exceeds accepted GRN quantity (${acceptedTotal}) under PO #${targetPoId || 'ALL'}. Previously billed: ${cumulativePreviouslyBilled}, Remaining capacity: ${remainingCapacity}.`;
      violations.push({ index, code: 'QUANTITY_OVER_GRN', message });
      line.status = 'quantity_exception';
    }

    lines.push(line);
  });

  return { lines, violations, grn_checked: grns.length > 0 };
}

module.exports = { evaluateThreeWayMatch, parseToleranceRate, DEFAULT_TOLERANCE_RATIO };
