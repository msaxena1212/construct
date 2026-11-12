'use strict';
const db = require('../../models');

/**
 * Service to manage append-only commitment ledger transactions and project cost reconciliation.
 * Reconciles budgets, commitments, receipts, consumption, liabilities and payments
 * without double-counting financial events.
 */
class CommitmentLedgerService {
  /**
   * Book commitments when a purchase order is approved.
   */
  static async recordPOApprovalCommitment({
    purchase_order,
    performed_by = null,
    transaction = null,
  }) {
    if (!purchase_order || !purchase_order.id) {
      throw new Error('Valid purchase_order object is required.');
    }

    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const items = Array.isArray(purchase_order.items) ? purchase_order.items : [];
      const records = [];

      for (let idx = 0; idx < items.length; idx++) {
        const item = items[idx];
        const lineKey = item.item_code || item.description || `LINE-${idx + 1}`;
        const qty = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.unit_price || item.rate) || 0;
        const lineTotal = Number((qty * rate).toFixed(2));
        const idempotencyKey = `PO-COMMIT-${purchase_order.id}-${lineKey}`;

        // Check if already posted
        const existing = await db.commitment_ledger.findOne({
          where: { company_id: purchase_order.company_id, idempotency_key: idempotencyKey },
          transaction: t,
        });

        if (!existing && lineTotal > 0) {
          const entry = await db.commitment_ledger.create(
            {
              company_id: purchase_order.company_id,
              project_id: purchase_order.project_id,
              purchase_order_id: purchase_order.id,
              po_line_identifier: lineKey,
              wbs_id: item.wbs_id || null,
              cbs_id: item.cbs_id || null,
              event_type: 'commitment_created',
              quantity: qty,
              unit_price: rate,
              committed_amount_delta: lineTotal,
              source_reference_type: 'PURCHASE_ORDER',
              source_reference_id: String(purchase_order.id),
              idempotency_key: idempotencyKey,
              reason: `PO #${purchase_order.po_number} approved commitment for line '${lineKey}'`,
              performed_by,
            },
            { transaction: t }
          );
          records.push(entry);
        }
      }

      if (manageTx) await t.commit();
      return records;
    } catch (err) {
      if (manageTx) await t.rollback().catch(() => {});
      throw err;
    }
  }

  /**
   * Release commitment upon accepted goods receipt note (GRN).
   * Note: The accepted goods value transitions from commitment to received inventory.
   */
  static async recordGRNCommitmentRelease({
    grn,
    purchase_order,
    performed_by = null,
    transaction = null,
  }) {
    if (!grn || !purchase_order) {
      throw new Error('grn and purchase_order are required.');
    }

    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const grnItems = Array.isArray(grn.items) ? grn.items : [];
      const poItems = Array.isArray(purchase_order.items) ? purchase_order.items : [];
      const records = [];

      for (const gi of grnItems) {
        const acceptedQty = Number(gi.accepted_qty || 0);
        if (acceptedQty <= 0) continue; // Rejected or 0 accepted goods do not release commitment

        const lineKey = gi.item_code || gi.description;
        const matchingPoLine = poItems.find(
          (p) => (gi.item_code && p.item_code === gi.item_code) || (gi.description && p.description === gi.description)
        );

        const unitRate = Number(gi.unit_price || matchingPoLine?.unit_price || matchingPoLine?.rate || 0);
        const releaseAmount = Number((acceptedQty * unitRate).toFixed(2));
        const idempotencyKey = `GRN-REL-${grn.id}-${lineKey}`;

        const existing = await db.commitment_ledger.findOne({
          where: { company_id: grn.company_id, idempotency_key: idempotencyKey },
          transaction: t,
        });

        if (!existing && releaseAmount > 0) {
          const entry = await db.commitment_ledger.create(
            {
              company_id: grn.company_id,
              project_id: grn.project_id,
              purchase_order_id: purchase_order.id,
              po_line_identifier: lineKey,
              wbs_id: matchingPoLine?.wbs_id || null,
              cbs_id: matchingPoLine?.cbs_id || null,
              event_type: 'commitment_released',
              quantity: acceptedQty,
              unit_price: unitRate,
              committed_amount_delta: -releaseAmount, // Negative delta releases commitment
              source_reference_type: 'GOODS_RECEIPT_NOTE',
              source_reference_id: String(grn.id),
              idempotency_key: idempotencyKey,
              reason: `GRN #${grn.grn_number} accepted ${acceptedQty} units for line '${lineKey}'`,
              performed_by,
            },
            { transaction: t }
          );
          records.push(entry);
        }
      }

      if (manageTx) await t.commit();
      return records;
    } catch (err) {
      if (manageTx) await t.rollback().catch(() => {});
      throw err;
    }
  }

  /**
   * Release remaining unfulfilled commitments upon PO cancellation.
   */
  static async recordPOCancellationRelease({
    purchase_order,
    performed_by = null,
    reason = 'Purchase order cancelled',
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const remainingByPo = await this.getRemainingCommitmentForPO(purchase_order.id, purchase_order.company_id, t);
      if (remainingByPo <= 0) {
        if (manageTx) await t.commit();
        return [];
      }

      const idempotencyKey = `PO-CANCEL-REL-${purchase_order.id}`;
      const entry = await db.commitment_ledger.create(
        {
          company_id: purchase_order.company_id,
          project_id: purchase_order.project_id,
          purchase_order_id: purchase_order.id,
          po_line_identifier: 'ALL',
          event_type: 'commitment_cancelled',
          committed_amount_delta: -remainingByPo,
          source_reference_type: 'PO_CANCELLATION',
          source_reference_id: String(purchase_order.id),
          idempotency_key: idempotencyKey,
          reason,
          performed_by,
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return [entry];
    } catch (err) {
      if (manageTx) await t.rollback().catch(() => {});
      throw err;
    }
  }

  /**
   * Calculate remaining active commitment for a specific PO.
   */
  static async getRemainingCommitmentForPO(purchase_order_id, company_id, transaction = null) {
    const entries = await db.commitment_ledger.findAll({
      where: { purchase_order_id, company_id },
      transaction,
    });
    const sum = entries.reduce((acc, curr) => acc + parseFloat(curr.committed_amount_delta || 0), 0);
    return Math.max(0, Number(sum.toFixed(2)));
  }

  /**
   * Get full project financial reconciliation metrics distinguishing:
   * 1. Approved baseline budget
   * 2. Remaining active commitments (Approved POs minus accepted receipts)
   * 3. Received warehouse inventory value
   * 4. Consumed material cost (DPR / site issue)
   * 5. Accounts payable liability (Invoices)
   * 6. Cash paid out (Settlements)
   */
  static async getProjectFinancialReconciliation(project_id, company_id) {
    if (typeof project_id === 'object' && project_id !== null) {
      company_id = project_id.company_id;
      project_id = project_id.project_id;
    }
    // 1. Approved budget (from latest approved budget revision, or fallback to project record)
    const approvedBudget = await db.budget.findOne({
      where: { project_id, company_id, status: 'approved' },
      order: [['revision_number', 'DESC']],
      include: [{ model: db.budget_line, as: 'lines' }],
    });

    let budgetTotal = 0;
    if (approvedBudget) {
      budgetTotal = parseFloat(approvedBudget.total_budget_amount) || 0;
    } else {
      const proj = await db.project.findOne({
        where: { id: project_id, company_id },
        attributes: ['budget_total'],
      });
      if (proj && proj.budget_total) {
        budgetTotal = parseFloat(proj.budget_total) || 0;
      }
    }

    // 2. Commitments
    const commitmentEntries = await db.commitment_ledger.findAll({
      where: { project_id, company_id },
    });
    const totalRemainingCommitment = Math.max(
      0,
      Number(commitmentEntries.reduce((acc, c) => acc + parseFloat(c.committed_amount_delta || 0), 0).toFixed(2))
    );

    // 3. Stock movements
    const stockMovements = await db.stock_ledger.findAll({
      where: { project_id, company_id },
    });

    let receivedInventoryValue = 0;
    let consumedMaterialCost = 0;

    for (const mov of stockMovements) {
      const cost = parseFloat(mov.total_cost || 0);
      if (mov.movement_type === 'receipt' || mov.movement_type === 'opening_balance') {
        receivedInventoryValue += cost;
      } else if (mov.movement_type === 'consumption' || mov.movement_type === 'issue') {
        consumedMaterialCost += cost;
      } else if (mov.movement_type === 'reversal') {
        consumedMaterialCost -= cost;
      }
    }

    // 4. Invoices & Payments
    const invoices = await db.vendors_invoice.findAll({
      where: { project_id, company_id },
    });
    const totalInvoicedLiability = invoices.reduce((acc, inv) => acc + parseFloat(inv.grand_total || 0), 0);
    const totalPaidAmount = invoices.reduce((acc, inv) => acc + parseFloat(inv.paid_amount || 0), 0);
    const outstandingPayables = Math.max(0, totalInvoicedLiability - totalPaidAmount);

    // 4b. Batch R: Contractor RA Billing & Certified Measurements
    let certifiedRaBillingGross = 0;
    let totalRetentionHeld = 0;
    let totalTdsDeducted = 0;
    let netSubcontractorPayable = 0;

    if (db.contractor_ra_bill) {
      const raBills = await db.contractor_ra_bill.findAll({
        where: {
          project_id,
          company_id,
          status: ['approved', 'certified', 'invoiced', 'paid'],
        },
      });
      for (const bill of raBills) {
        certifiedRaBillingGross += parseFloat(bill.current_period_gross_amount || 0);
        totalRetentionHeld += parseFloat(bill.retention_amount || 0);
        totalTdsDeducted += parseFloat(bill.tds_amount || 0);
        netSubcontractorPayable += parseFloat(bill.net_payable_amount || 0);
      }
    }

    // 4c. Batch W: Variation Orders & Change Orders
    let totalApprovedVariation = 0;
    let totalPendingVariation = 0;
    let totalImplementedVariation = 0;

    if (db.variation_order) {
      const variations = await db.variation_order.findAll({
        where: { project_id, company_id },
      });
      for (const vo of variations) {
        const app = parseFloat(vo.approved_amount || 0);
        const prop = parseFloat(vo.proposed_amount || 0);
        if (vo.status === 'approved' || vo.status === 'implemented') {
          totalApprovedVariation += app;
        }
        if (vo.status === 'implemented') {
          totalImplementedVariation += app;
        }
        if (['submitted', 'technical_review', 'commercial_review', 'budget_review'].includes(vo.status)) {
          totalPendingVariation += prop;
        }
      }
    }

    // 5. Non-Material Cost Actuals (Batch Q: PROJECT_COST_LEDGER)
    const costEntries = await db.cost_ledger.findAll({
      where: { project_id, company_id },
    });

    let recognizedLabourActuals = 0;
    let recognizedEquipmentActuals = 0;
    let recognizedSubcontractorActuals = 0;
    let recognizedOverheadActuals = 0;

    const unmappedCostsByCategory = {
      labour: 0,
      equipment: 0,
      subcontractor: 0,
      overhead: 0,
    };

    // Track recognized costs by budget_head_id
    const actualsByHead = {};

    for (const entry of costEntries) {
      const amt = parseFloat(entry.amount || 0);
      switch (entry.cost_category) {
        case 'labour':
          recognizedLabourActuals += amt;
          break;
        case 'equipment':
          recognizedEquipmentActuals += amt;
          break;
        case 'subcontractor':
          recognizedSubcontractorActuals += amt;
          break;
        case 'overhead':
          recognizedOverheadActuals += amt;
          break;
      }

      if (entry.budget_head_id) {
        const hid = Number(entry.budget_head_id);
        actualsByHead[hid] = (actualsByHead[hid] || 0) + amt;
      } else {
        unmappedCostsByCategory[entry.cost_category] =
          (unmappedCostsByCategory[entry.cost_category] || 0) + amt;
      }
    }

    const totalRecognizedNonMaterialCost =
      recognizedLabourActuals +
      recognizedEquipmentActuals +
      recognizedSubcontractorActuals +
      recognizedOverheadActuals;

    const totalRecognizedActualCosts = Number(
      (consumedMaterialCost + totalRecognizedNonMaterialCost).toFixed(2)
    );

    // 6. Batch N & Q: Budget Head Breakdown with Actual Costs
    const budgetHeads = await db.budget_head.findAll({
      where: { project_id, company_id, status: 'active' },
      order: [['sort_order', 'ASC'], ['head_code', 'ASC']],
    });

    // Fetch approved head allocations if active budget exists
    const headAllocations = approvedBudget
      ? await db.budget_head_allocation.findAll({
          where: { budget_id: approvedBudget.id, company_id },
        })
      : [];

    const headBreakdown = [];
    for (const bh of budgetHeads) {
      const alloc = headAllocations.find((a) => Number(a.budget_head_id) === Number(bh.id));
      const allocatedAmount = alloc ? parseFloat(alloc.allocated_amount) : 0;

      // Calculate detailed lines under this head if present
      const detailedLines = approvedBudget
        ? await db.budget_line.findAll({
            where: { budget_id: approvedBudget.id, budget_head_id: bh.id, company_id },
          })
        : [];
      const detailedSum = detailedLines.reduce((acc, l) => acc + parseFloat(l.budgeted_amount || 0), 0);
      const unallocatedInHead = Math.max(0, allocatedAmount - detailedSum);

      const recognizedHeadActuals = Number((actualsByHead[Number(bh.id)] || 0).toFixed(2));
      const headVariance = Number((allocatedAmount - recognizedHeadActuals).toFixed(2));

      headBreakdown.push({
        budget_head_id: bh.id,
        head_code: bh.head_code,
        head_name: bh.head_name,
        allocated_amount: Number(allocatedAmount.toFixed(2)),
        detailed_lines_allocated: Number(detailedSum.toFixed(2)),
        unallocated_within_head: Number(unallocatedInHead.toFixed(2)),
        recognized_actual_costs: recognizedHeadActuals,
        head_budget_variance: headVariance,
      });
    }

    const totalUnmappedCost = Number(
      (
        unmappedCostsByCategory.labour +
        unmappedCostsByCategory.equipment +
        unmappedCostsByCategory.subcontractor +
        unmappedCostsByCategory.overhead
      ).toFixed(2)
    );

    const projectedFinalCost = Number(
      (totalRecognizedActualCosts + totalRemainingCommitment).toFixed(2)
    );
    const overallBudgetVariance = Number((budgetTotal - projectedFinalCost).toFixed(2));

    return {
      project_id,
      company_id,
      approved_budget: Number(budgetTotal.toFixed(2)),
      active_commitments: totalRemainingCommitment,
      received_inventory_value: Number(receivedInventoryValue.toFixed(2)),
      consumed_material_cost: Number(consumedMaterialCost.toFixed(2)),
      // Batch Q: Categorized recognized actuals
      recognized_labour_actuals: Number(recognizedLabourActuals.toFixed(2)),
      recognized_equipment_actuals: Number(recognizedEquipmentActuals.toFixed(2)),
      recognized_subcontractor_actuals: Number(recognizedSubcontractorActuals.toFixed(2)),
      recognized_overhead_actuals: Number(recognizedOverheadActuals.toFixed(2)),
      total_recognized_actual_costs: totalRecognizedActualCosts,
      // Batch R: Contractor RA Billing & Certified Measurements
      certified_ra_billing_gross: Number(certifiedRaBillingGross.toFixed(2)),
      total_retention_held: Number(totalRetentionHeld.toFixed(2)),
      total_tds_deducted: Number(totalTdsDeducted.toFixed(2)),
      net_subcontractor_payable: Number(netSubcontractorPayable.toFixed(2)),
      // Batch W: Enterprise Variations & Change Orders
      total_approved_variation: Number(totalApprovedVariation.toFixed(2)),
      total_pending_variation: Number(totalPendingVariation.toFixed(2)),
      total_implemented_variation: Number(totalImplementedVariation.toFixed(2)),
      // Invoiced liabilities & payments remain informational settlements/obligations, not additive costs
      total_invoiced_liability: Number(totalInvoicedLiability.toFixed(2)),
      total_cash_settled: Number(totalPaidAmount.toFixed(2)),
      outstanding_payables: Number(outstandingPayables.toFixed(2)),
      // Projected final cost and variance
      projected_cost: projectedFinalCost,
      projected_final_cost: projectedFinalCost,
      projected_cost_qualification: 'materials_commitments_and_recognized_actuals',
      cost_coverage: {
        materials: 'stock_ledger_consumption',
        labour: 'attendance_daily_wage_accruals',
        equipment: 'approved_equipment_invoices',
        subcontractor: 'certified_contractor_ra_bills_and_invoices',
        overhead: 'approved_overhead_invoices',
      },
      missing_source_workflows: {
        statutory_payroll: 'pending_statutory_payroll_module',
        measurement_books: 'implemented_measurement_book_and_ra_billing',
        equipment_timesheets: 'pending_equipment_usage_timesheets',
      },
      budget_remaining: overallBudgetVariance,
      budget_headroom: overallBudgetVariance,
      budget_variance: overallBudgetVariance,
      budget_heads_breakdown: headBreakdown,
      unmapped_costs: totalUnmappedCost,
      unmapped_costs_by_category: {
        labour: Number(unmappedCostsByCategory.labour.toFixed(2)),
        equipment: Number(unmappedCostsByCategory.equipment.toFixed(2)),
        subcontractor: Number(unmappedCostsByCategory.subcontractor.toFixed(2)),
        overhead: Number(unmappedCostsByCategory.overhead.toFixed(2)),
      },
      unmapped_commitments: 0,
    };
  }
}

module.exports = CommitmentLedgerService;
