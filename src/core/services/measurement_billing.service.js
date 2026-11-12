'use strict';
const db = require('../../models');
const BudgetGateService = require('./budget_gate.service');

/**
 * Service to manage contractual measurement lifecycle (Measurement Book)
 * and Contractor Running Account (RA) Billing with:
 * - Deterministic decimal-safe calculation
 * - Strict project, company, BOQ, WBS, CBS, and budget-head scoping
 * - Segregation of duties for certification and approvals
 * - Cumulative measured & certified quantity tracking against BOQ caps
 * - Retention & TDS deductions
 * - Safe integration with Project Cost Ledger without double-counting
 */
class MeasurementBillingService {
  /**
   * Helper: Calculate physical quantity based on calculation method.
   */
  static calculateQuantity({
    calculation_method = 'direct',
    num_units = 1,
    length = null,
    breadth = null,
    depth_height = null,
    measured_qty = null,
  }) {
    const units = parseFloat(num_units) || 1;
    if (units <= 0) {
      throw new Error('Number of units must be greater than zero.');
    }

    let qty = 0;
    switch (calculation_method) {
      case 'l_b_d': { // Length x Breadth x Depth/Height
        const l = parseFloat(length);
        const b = parseFloat(breadth);
        const d = parseFloat(depth_height);
        if (isNaN(l) || isNaN(b) || isNaN(d) || l <= 0 || b <= 0 || d <= 0) {
          throw new Error('Calculation method l_b_d requires positive length, breadth, and depth_height.');
        }
        qty = units * l * b * d;
        break;
      }
      case 'l_b': { // Length x Breadth (Area)
        const l = parseFloat(length);
        const b = parseFloat(breadth);
        if (isNaN(l) || isNaN(b) || l <= 0 || b <= 0) {
          throw new Error('Calculation method l_b requires positive length and breadth.');
        }
        qty = units * l * b;
        break;
      }
      case 'count': { // Direct Count / Units
        qty = units;
        break;
      }
      case 'direct':
      default: {
        const mq = parseFloat(measured_qty);
        if (isNaN(mq) || mq <= 0) {
          throw new Error('Direct measurement requires a positive measured_qty.');
        }
        qty = mq;
        break;
      }
    }

    return Number(qty.toFixed(3));
  }

  /**
   * Create Measurement Book Header & Items
   */
  static async createMeasurementBook({
    company_id,
    project_id,
    vendor_id = null,
    contract_reference = null,
    title,
    measurement_date,
    period_start = null,
    period_end = null,
    remarks = null,
    submitted_by = null,
    items = [],
    transaction = null,
  }) {
    if (!company_id || !project_id || !title || !measurement_date) {
      throw new Error('company_id, project_id, title, and measurement_date are required.');
    }

    // Verify project belongs to company
    const project = await db.project.findOne({
      where: { id: project_id, company_id },
      transaction,
    });
    if (!project) {
      throw new Error(`Project #${project_id} does not exist or does not belong to company #${company_id}.`);
    }

    if (vendor_id) {
      const vendor = await db.vendors.findOne({
        where: { id: vendor_id, company_id },
        transaction,
      });
      if (!vendor) {
        throw new Error(`Vendor/Subcontractor #${vendor_id} does not belong to company #${company_id}.`);
      }
    }

    // Generate unique MB number
    const count = await db.measurement_book.count({
      where: { company_id, project_id },
      transaction,
    });
    const mb_number = `MB-P${project_id}-${Date.now().toString().slice(-4)}-${count + 1}`;

    const mb = await db.measurement_book.create(
      {
        mb_number,
        company_id,
        project_id,
        vendor_id: vendor_id || null,
        contract_reference: contract_reference ? String(contract_reference).trim() : null,
        title: String(title).trim(),
        measurement_date,
        period_start,
        period_end,
        status: 'draft',
        total_measured_amount: 0,
        remarks,
        submitted_by,
      },
      { transaction }
    );

    let totalAmount = 0;
    if (items && items.length > 0) {
      for (const rawItem of items) {
        const itemCreated = await this.addItemToMeasurementBook({
          company_id,
          project_id,
          mb_id: mb.id,
          rawItem,
          transaction,
        });
        totalAmount += parseFloat(itemCreated.measured_amount || 0);
      }
    }

    await mb.update({ total_measured_amount: Number(totalAmount.toFixed(2)) }, { transaction });
    return mb;
  }

  /**
   * Add Item to existing Measurement Book in 'draft' status
   */
  static async addItemToMeasurementBook({
    company_id,
    project_id,
    mb_id,
    rawItem,
    transaction = null,
  }) {
    const {
      boq_item_id,
      wbs_id = null,
      cbs_id = null,
      budget_head_id = null,
      item_number = null,
      work_description,
      location_reference = null,
      calculation_method = 'direct',
      num_units = 1,
      length = null,
      breadth = null,
      depth_height = null,
      measured_qty = null,
      unit,
      contract_rate = null,
      evidence_url = null,
    } = rawItem;

    if (!boq_item_id || !work_description) {
      throw new Error('boq_item_id and work_description are required for each measurement item.');
    }

    // Verify BOQ item belongs to same project & company
    const boq = await db.boq_item.findOne({
      where: { id: boq_item_id, project_id, company_id },
      transaction,
    });
    if (!boq) {
      throw new Error(`BOQ item #${boq_item_id} does not belong to project #${project_id} or company #${company_id}.`);
    }

    // Use contractual rate from BOQ if not explicitly supplied
    const rate = contract_rate !== null && contract_rate !== undefined ? parseFloat(contract_rate) : parseFloat(boq.unit_rate || 0);
    if (isNaN(rate) || rate < 0) {
      throw new Error('Valid non-negative contract rate is required.');
    }

    const calculatedQty = this.calculateQuantity({
      calculation_method,
      num_units,
      length,
      breadth,
      depth_height,
      measured_qty,
    });

    const calculatedAmount = Number((calculatedQty * rate).toFixed(2));

    const item = await db.measurement_book_item.create(
      {
        mb_id,
        company_id,
        project_id,
        boq_item_id,
        wbs_id: wbs_id || boq.wbs_id || null,
        cbs_id: cbs_id || boq.cbs_id || null,
        budget_head_id: budget_head_id || null,
        item_number: item_number ? String(item_number).trim() : boq.item_code,
        work_description: String(work_description).trim(),
        location_reference: location_reference ? String(location_reference).trim() : null,
        calculation_method,
        num_units: parseFloat(num_units) || 1,
        length: length !== null ? parseFloat(length) : null,
        breadth: breadth !== null ? parseFloat(breadth) : null,
        depth_height: depth_height !== null ? parseFloat(depth_height) : null,
        measured_qty: calculatedQty,
        unit: unit || boq.unit || 'unit',
        contract_rate: rate,
        measured_amount: calculatedAmount,
        certified_qty: 0,
        certified_amount: 0,
        status: 'draft',
        evidence_url,
      },
      { transaction }
    );

    return item;
  }

  /**
   * Submit Measurement Book for Review
   */
  static async submitMeasurementBook({ company_id, mb_id, user_id, transaction = null }) {
    const mb = await db.measurement_book.findOne({
      where: { id: mb_id, company_id },
      include: [{ model: db.measurement_book_item, as: 'items' }],
      transaction,
    });
    if (!mb) throw new Error(`Measurement book #${mb_id} not found.`);

    if (mb.status !== 'draft') {
      throw new Error(`Only draft measurement books can be submitted. Current status: ${mb.status}.`);
    }

    if (!mb.items || mb.items.length === 0) {
      throw new Error('Cannot submit an empty measurement book. Add at least one measurement entry.');
    }

    await mb.update(
      {
        status: 'submitted',
        submitted_by: user_id,
        submitted_at: new Date(),
      },
      { transaction }
    );

    await db.measurement_book_item.update(
      { status: 'submitted' },
      { where: { mb_id: mb.id }, transaction }
    );

    return mb;
  }

  /**
   * Certify Measurement Book (Segregation of Duties Enforced)
   */
  static async certifyMeasurementBook({
    company_id,
    mb_id,
    certifier_id,
    itemsToCertify = [], // Optional overrides for individual item certified quantities
    transaction = null,
  }) {
    const mb = await db.measurement_book.findOne({
      where: { id: mb_id, company_id },
      include: [{ model: db.measurement_book_item, as: 'items' }],
      transaction,
    });
    if (!mb) throw new Error(`Measurement book #${mb_id} not found.`);

    if (mb.status !== 'submitted' && mb.status !== 'under_review') {
      throw new Error(`Only submitted measurement books can be certified. Current status: ${mb.status}.`);
    }

    // Segregation of Duties: Certifier must not be the submitter
    if (mb.submitted_by && Number(mb.submitted_by) === Number(certifier_id)) {
      throw new Error('Segregation of duties violation: Submitter cannot certify their own measurement book.');
    }

    const itemOverrideMap = new Map();
    itemsToCertify.forEach((it) => itemOverrideMap.set(Number(it.id), parseFloat(it.certified_qty)));

    let totalCertifiedAmount = 0;

    for (const item of mb.items) {
      const boq = await db.boq_item.findByPk(item.boq_item_id, { transaction });
      if (!boq) throw new Error(`BOQ item #${item.boq_item_id} not found.`);

      // Check current cumulative certified quantity across all certified MB items for this BOQ item
      const prevCertifiedSumResult = await db.measurement_book_item.sum('certified_qty', {
        where: {
          boq_item_id: item.boq_item_id,
          status: 'certified',
        },
        transaction,
      });
      const previouslyCertifiedQty = parseFloat(prevCertifiedSumResult || 0);

      const proposedQty = itemOverrideMap.has(item.id)
        ? itemOverrideMap.get(item.id)
        : parseFloat(item.measured_qty);

      if (isNaN(proposedQty) || proposedQty < 0) {
        throw new Error(`Certified quantity for item #${item.id} must be non-negative.`);
      }

      const contractualEstimatedQty = parseFloat(boq.estimated_qty || 0);
      const newCumulative = previouslyCertifiedQty + proposedQty;

      // Contractual BOQ cap validation
      if (newCumulative > contractualEstimatedQty) {
        throw new Error(
          `Contractual scope exceeded for BOQ item "${boq.item_code || boq.description}": ` +
          `Estimated cap = ${contractualEstimatedQty}, Previously certified = ${previouslyCertifiedQty}, ` +
          `Attempting to certify = ${proposedQty} (Total: ${newCumulative.toFixed(3)}). ` +
          `An approved variation is required to certify beyond authorized BOQ scope.`
        );
      }

      const itemCertifiedAmt = Number((proposedQty * parseFloat(item.contract_rate)).toFixed(2));
      await item.update(
        {
          certified_qty: proposedQty,
          certified_amount: itemCertifiedAmt,
          status: 'certified',
        },
        { transaction }
      );

      totalCertifiedAmount += itemCertifiedAmt;

      // Update executed_qty on BOQ item
      await boq.update(
        {
          executed_qty: newCumulative,
          billed_amount: Number((newCumulative * parseFloat(boq.unit_rate || 0)).toFixed(2)),
        },
        { transaction }
      );
    }

    await mb.update(
      {
        status: 'certified',
        certified_by: certifier_id,
        certified_at: new Date(),
        total_measured_amount: Number(totalCertifiedAmount.toFixed(2)),
      },
      { transaction }
    );

    return mb;
  }

  /**
   * Reject Measurement Book
   */
  static async rejectMeasurementBook({ company_id, mb_id, user_id, rejection_reason, transaction = null }) {
    if (!rejection_reason || !String(rejection_reason).trim()) {
      throw new Error('A valid rejection reason is required.');
    }

    const mb = await db.measurement_book.findOne({
      where: { id: mb_id, company_id },
      transaction,
    });
    if (!mb) throw new Error(`Measurement book #${mb_id} not found.`);

    if (mb.status !== 'submitted' && mb.status !== 'under_review') {
      throw new Error(`Only submitted or under-review measurement books can be rejected.`);
    }

    await mb.update(
      {
        status: 'rejected',
        rejection_reason: String(rejection_reason).trim(),
      },
      { transaction }
    );

    await db.measurement_book_item.update(
      { status: 'rejected' },
      { where: { mb_id: mb.id }, transaction }
    );

    return mb;
  }

  /**
   * Generate Contractor Running Account (RA) Bill from Certified Measurement Items
   */
  static async createContractorRaBill({
    company_id,
    project_id,
    vendor_id,
    contract_reference = null,
    billing_period_start,
    billing_period_end,
    mb_item_ids = [],
    retention_rate_pct = 5.0,
    tds_rate_pct = 2.0,
    other_deductions_amount = 0,
    prepared_by = null,
    idempotency_key = null,
    remarks = null,
    transaction = null,
  }) {
    if (!company_id || !project_id || !vendor_id || !billing_period_start || !billing_period_end) {
      throw new Error('company_id, project_id, vendor_id, and billing period dates are required.');
    }

    if (idempotency_key) {
      const existing = await db.contractor_ra_bill.findOne({
        where: { company_id, idempotency_key },
        transaction,
      });
      if (existing) return existing;
    }

    // Verify vendor belongs to company
    const vendor = await db.vendors.findOne({
      where: { id: vendor_id, company_id },
      transaction,
    });
    if (!vendor) {
      throw new Error(`Subcontractor #${vendor_id} does not belong to company #${company_id}.`);
    }

    // Fetch certified measurement items eligible for billing
    if (!mb_item_ids || mb_item_ids.length === 0) {
      throw new Error('At least one certified measurement item must be selected for the RA bill.');
    }

    const items = await db.measurement_book_item.findAll({
      where: {
        id: mb_item_ids,
        company_id,
        project_id,
        status: 'certified',
      },
      transaction,
    });

    if (items.length !== mb_item_ids.length) {
      throw new Error('Some selected measurement items are either not found, uncertified, or belong to another project.');
    }

    // Ensure items are not already linked to another RA bill
    const alreadyBilled = items.filter((it) => it.ra_bill_id !== null);
    if (alreadyBilled.length > 0) {
      throw new Error(
        `Measurement item #${alreadyBilled[0].id} has already been billed in RA Bill #${alreadyBilled[0].ra_bill_id}.`
      );
    }

    // Calculate current period gross amount
    const currentGross = items.reduce((acc, it) => acc + parseFloat(it.certified_amount || 0), 0);

    // Compute previous cumulative gross amount for this vendor on this project
    const previousBillsSum = await db.contractor_ra_bill.sum('current_period_gross_amount', {
      where: {
        company_id,
        project_id,
        vendor_id,
        status: ['certified', 'approved', 'invoiced', 'paid'],
      },
      transaction,
    });
    const previousCumulativeAmount = Number(parseFloat(previousBillsSum || 0).toFixed(2));
    const cumulativeGrossAmount = Number((previousCumulativeAmount + currentGross).toFixed(2));

    // Deductions
    const retentionRate = parseFloat(retention_rate_pct) || 0;
    const retentionAmount = Number(((currentGross * retentionRate) / 100).toFixed(2));

    const tdsRate = parseFloat(tds_rate_pct) || 0;
    const tdsAmount = Number(((currentGross * tdsRate) / 100).toFixed(2));

    const otherDeductions = parseFloat(other_deductions_amount) || 0;
    const netPayable = Math.max(0, Number((currentGross - retentionAmount - tdsAmount - otherDeductions).toFixed(2)));

    // Generate unique RA Bill number
    const billCount = await db.contractor_ra_bill.count({
      where: { company_id, project_id },
      transaction,
    });
    const ra_bill_number = `RA-${project_id}-${billCount + 1}`;

    const raBill = await db.contractor_ra_bill.create(
      {
        ra_bill_number,
        company_id,
        project_id,
        vendor_id,
        contract_reference,
        billing_period_start,
        billing_period_end,
        previous_cumulative_amount: previousCumulativeAmount,
        current_period_gross_amount: Number(currentGross.toFixed(2)),
        cumulative_gross_amount: cumulativeGrossAmount,
        retention_rate_pct: retentionRate,
        retention_amount: retentionAmount,
        tds_rate_pct: tdsRate,
        tds_amount: tdsAmount,
        other_deductions_amount: otherDeductions,
        net_payable_amount: netPayable,
        status: 'draft',
        prepared_by,
        idempotency_key,
        remarks,
      },
      { transaction }
    );

    // Link items to this RA bill
    await db.measurement_book_item.update(
      { ra_bill_id: raBill.id },
      { where: { id: mb_item_ids }, transaction }
    );

    return raBill;
  }

  /**
   * Approve Contractor RA Bill & Link to Accounts Payable / Cost Ledger
   */
  static async approveContractorRaBill({
    company_id,
    ra_bill_id,
    approver_id,
    postToCostLedger = true,
    transaction = null,
  }) {
    const raBill = await db.contractor_ra_bill.findOne({
      where: { id: ra_bill_id, company_id },
      include: [{ model: db.measurement_book_item, as: 'billed_items' }],
      transaction,
    });
    if (!raBill) throw new Error(`RA Bill #${ra_bill_id} not found.`);

    if (raBill.status !== 'draft' && raBill.status !== 'submitted' && raBill.status !== 'certified') {
      throw new Error(`RA Bill #${ra_bill_id} cannot be approved from status "${raBill.status}".`);
    }

    // Segregation of Duties: Approver cannot be preparer
    if (raBill.prepared_by && Number(raBill.prepared_by) === Number(approver_id)) {
      throw new Error('Segregation of duties: Preparer cannot approve their own RA bill.');
    }

    // Budget gate: the cost this approval posts must fit the headroom of its budget head under the company policy.
    // Checked before the status changes, so a blocked approval leaves the bill as it was.
    let budgetGate = null;
    if (postToCostLedger && parseFloat(raBill.current_period_gross_amount) > 0) {
      const gateHeadId = raBill.billed_items?.[0]?.budget_head_id || null;
      if (gateHeadId) {
        const company = await db.company.findByPk(company_id, { attributes: ['id', 'budget_gate_mode'], transaction });
        budgetGate = await BudgetGateService.checkBudgetGate({
          company_id,
          project_id: raBill.project_id,
          budget_head_id: gateHeadId,
          amount: raBill.current_period_gross_amount,
          mode: BudgetGateService.normaliseMode(company?.budget_gate_mode),
          transaction,
        });
        if (budgetGate.status === 'exceeded' && budgetGate.mode === 'block') {
          const err = new Error(
            `Budget gate: this RA bill (₹${budgetGate.requested}) exceeds the headroom of budget head #${gateHeadId} by ₹${budgetGate.excess} (allocated ₹${budgetGate.allocated}, recognized ₹${budgetGate.recognized}). Company policy blocks approval.`
          );
          err.code = 'BUDGET_GATE_BLOCKED';
          err.budgetGate = budgetGate;
          throw err;
        }
      }
    }

    await raBill.update(
      {
        status: 'approved',
        approved_by: approver_id,
        approved_at: new Date(),
      },
      { transaction }
    );

    // Post to PROJECT_COST_LEDGER if enabled without double counting
    if (postToCostLedger && parseFloat(raBill.current_period_gross_amount) > 0) {
      const ProjectCostLedgerService = require('./project_cost_ledger.service');

      // Check first billed item for budget head / WBS / CBS attribution
      const firstItem = raBill.billed_items?.[0];
      const budgetHeadId = firstItem?.budget_head_id || null;
      const wbsId = firstItem?.wbs_id || null;
      const cbsId = firstItem?.cbs_id || null;

      await ProjectCostLedgerService.recordCost({
        company_id,
        project_id: raBill.project_id,
        cost_category: 'subcontractor',
        source_type: 'CONTRACTOR_RA_BILL',
        source_id: raBill.id,
        source_line_identifier: raBill.ra_bill_number,
        recognition_date: raBill.billing_period_end,
        amount: parseFloat(raBill.current_period_gross_amount),
        budget_head_id: budgetHeadId,
        wbs_id: wbsId,
        cbs_id: cbsId,
        idempotency_key: `RA_BILL_COST_${raBill.id}`,
        reason: `Subcontractor RA Bill certified cost recognition for ${raBill.ra_bill_number}`,
        posted_by: approver_id,
        transaction,
      });
    }

    if (budgetGate) raBill.setDataValue('budget_gate', budgetGate);
    return raBill;
  }
}

module.exports = MeasurementBillingService;
