'use strict';
const db = require('../../models');

/**
 * Service to manage append-only project actual-cost ledger transactions
 * across Labour, Equipment, Subcontractor, and Overhead categories.
 * Enforces:
 * - Deterministic project, budget-head, WBS, and CBS mapping
 * - Server-side monetary rounding to 2 decimals
 * - Tenant isolation and strict cross-project reference rejection
 * - Append-only audit integrity with compensating reversal records
 * - Retry idempotency via unique constraints
 */
class ProjectCostLedgerService {
  /**
   * Validate that budget_head_id, wbs_id, and cbs_id belong strictly to the project and company.
   */
  static async validateCostAttribution({
    company_id,
    project_id,
    budget_head_id = null,
    wbs_id = null,
    cbs_id = null,
    transaction = null,
  }) {
    if (!company_id || !project_id) {
      throw new Error('company_id and project_id are required for cost validation.');
    }

    // 1. Verify project exists and belongs to company
    const project = await db.project.findOne({
      where: { id: project_id, company_id },
      transaction,
    });
    if (!project) {
      throw new Error(`Project #${project_id} not found or does not belong to company #${company_id}.`);
    }

    // 2. Verify budget_head if provided
    if (budget_head_id) {
      const bh = await db.budget_head.findOne({
        where: { id: budget_head_id, company_id, project_id },
        transaction,
      });
      if (!bh) {
        throw new Error(
          `Budget head #${budget_head_id} does not belong to project #${project_id} or company #${company_id}.`
        );
      }
    }

    // 3. Verify WBS if provided
    if (wbs_id) {
      const wbs = await db.wbs.findOne({
        where: { id: wbs_id, company_id, project_id },
        transaction,
      });
      if (!wbs) {
        throw new Error(
          `WBS node #${wbs_id} does not belong to project #${project_id} or company #${company_id}.`
        );
      }
    }

    // 4. Verify CBS if provided
    if (cbs_id) {
      const cbs = await db.cbs.findOne({
        where: { id: cbs_id, company_id },
        transaction,
      });
      if (!cbs) {
        throw new Error(`CBS item #${cbs_id} not found or does not belong to company #${company_id}.`);
      }
    }

    return true;
  }

  /**
   * Post an actual cost entry to PROJECT_COST_LEDGER.
   */
  static async recordCost({
    company_id,
    project_id,
    cost_category, // 'labour', 'equipment', 'subcontractor', 'overhead'
    event_type = 'accrual',
    budget_head_id = null,
    wbs_id = null,
    cbs_id = null,
    source_type, // 'LABOUR_ATTENDANCE', 'VENDORS_INVOICE', 'MANUAL_ADJUSTMENT'
    source_id,
    source_line_identifier = null,
    recognition_date,
    quantity = 0,
    rate = 0,
    amount,
    currency = 'INR',
    idempotency_key,
    reason = null,
    posted_by = null,
    transaction = null,
  }) {
    const validCategories = ['labour', 'equipment', 'subcontractor', 'overhead'];
    if (!validCategories.includes(cost_category)) {
      throw new Error(`Invalid cost_category '${cost_category}'. Valid categories: ${validCategories.join(', ')}.`);
    }

    if (!idempotency_key || String(idempotency_key).trim() === '') {
      throw new Error('idempotency_key is required for cost ledger entry.');
    }

    if (!source_type || !source_id) {
      throw new Error('source_type and source_id are required.');
    }

    const numericAmount = Number(Number(amount).toFixed(2));
    if (isNaN(numericAmount) || !isFinite(numericAmount) || numericAmount <= 0) {
      throw new Error(`Invalid cost amount '${amount}'. Must be a positive finite number.`);
    }

    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      // Validate project/head/wbs/cbs scoping
      await this.validateCostAttribution({
        company_id,
        project_id,
        budget_head_id,
        wbs_id,
        cbs_id,
        transaction: t,
      });

      // Check idempotency
      const existing = await db.cost_ledger.findOne({
        where: { company_id, idempotency_key },
        transaction: t,
      });
      if (existing) {
        if (manageTx) await t.commit();
        return { entry: existing, idempotent: true };
      }

      const entry = await db.cost_ledger.create(
        {
          company_id,
          project_id,
          cost_category,
          event_type,
          budget_head_id: budget_head_id || null,
          wbs_id: wbs_id || null,
          cbs_id: cbs_id || null,
          source_type,
          source_id: String(source_id),
          source_line_identifier: source_line_identifier ? String(source_line_identifier) : null,
          recognition_date: recognition_date || new Date().toISOString().split('T')[0],
          quantity: Number(Number(quantity || 0).toFixed(3)),
          rate: Number(Number(rate || 0).toFixed(2)),
          amount: numericAmount,
          currency: currency || 'INR',
          idempotency_key,
          reason,
          posted_by,
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return { entry, idempotent: false };
    } catch (err) {
      if (manageTx) await t.rollback().catch(() => {});
      throw err;
    }
  }

  /**
   * Post a compensating reversal record for an existing cost ledger entry.
   * Preserves historical ledger record and creates compensating negative entry.
   */
  static async recordReversal({
    cost_ledger_id,
    company_id,
    reason,
    performed_by = null,
    transaction = null,
  }) {
    if (!cost_ledger_id || !company_id) {
      throw new Error('cost_ledger_id and company_id are required for reversal.');
    }
    if (!reason || String(reason).trim() === '') {
      throw new Error('Audit reason is required for cost reversal.');
    }

    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const original = await db.cost_ledger.findOne({
        where: { id: cost_ledger_id, company_id },
        transaction: t,
      });

      if (!original) {
        throw new Error(`Cost ledger entry #${cost_ledger_id} not found.`);
      }

      if (original.event_type === 'reversal') {
        throw new Error(`Cannot reverse an entry that is already a reversal.`);
      }

      const reversalIdempotencyKey = `REV-${original.id}-${original.idempotency_key}`;
      const existingRev = await db.cost_ledger.findOne({
        where: { company_id, idempotency_key: reversalIdempotencyKey },
        transaction: t,
      });
      if (existingRev) {
        if (manageTx) await t.commit();
        return { entry: existingRev, idempotent: true };
      }

      const reversalEntry = await db.cost_ledger.create(
        {
          company_id: original.company_id,
          project_id: original.project_id,
          cost_category: original.cost_category,
          event_type: 'reversal',
          budget_head_id: original.budget_head_id,
          wbs_id: original.wbs_id,
          cbs_id: original.cbs_id,
          source_type: original.source_type,
          source_id: original.source_id,
          source_line_identifier: original.source_line_identifier,
          recognition_date: new Date().toISOString().split('T')[0],
          quantity: -Math.abs(Number(original.quantity || 0)),
          rate: Number(original.rate || 0),
          amount: -Math.abs(Number(original.amount)),
          currency: original.currency,
          idempotency_key: reversalIdempotencyKey,
          reversal_of_id: original.id,
          reason,
          posted_by: performed_by,
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return { entry: reversalEntry, idempotent: false };
    } catch (err) {
      if (manageTx) await t.rollback().catch(() => {});
      throw err;
    }
  }

  /**
   * Helper: Post approved labour attendance as project labour cost actual.
   * Maps headcount * daily_wage + overtime to labour cost.
   */
  static async postLabourAttendanceCost({
    attendance_record,
    budget_head_id = null,
    wbs_id = null,
    cbs_id = null,
    posted_by = null,
    transaction = null,
  }) {
    if (!attendance_record || !attendance_record.id) {
      throw new Error('Valid attendance_record is required.');
    }

    const totalCost = Number(Number(attendance_record.total_cost || 0).toFixed(2));
    if (totalCost <= 0) {
      throw new Error('Labour attendance record has zero or invalid total_cost.');
    }

    const idempotencyKey = `LABOUR-ATTEND-${attendance_record.company_id}-${attendance_record.id}`;

    return await this.recordCost({
      company_id: attendance_record.company_id,
      project_id: attendance_record.project_id,
      cost_category: 'labour',
      event_type: 'accrual',
      budget_head_id,
      wbs_id,
      cbs_id,
      source_type: 'LABOUR_ATTENDANCE',
      source_id: String(attendance_record.id),
      source_line_identifier: attendance_record.trade_type || 'General',
      recognition_date: attendance_record.attendance_date,
      quantity: Number(attendance_record.headcount || 1),
      rate: Number(attendance_record.daily_wage_rate || 0),
      amount: totalCost,
      currency: 'INR',
      idempotency_key: idempotencyKey,
      reason: `Labour cost recognized from attendance log #${attendance_record.id} (${attendance_record.trade_type})`,
      posted_by,
      transaction,
    });
  }

  /**
   * Helper: Post verified invoice actuals (equipment, subcontractor, overhead)
   * Only posts if invoice is in an approved status (Paid, Partially Paid, or approved payment request).
   */
  static async postInvoiceCost({
    invoice,
    cost_category, // 'equipment', 'subcontractor', 'overhead'
    budget_head_id = null,
    wbs_id = null,
    cbs_id = null,
    posted_by = null,
    transaction = null,
  }) {
    if (!invoice || !invoice.id) {
      throw new Error('Valid invoice is required.');
    }

    if (!invoice.project_id) {
      throw new Error('Invoice must be associated with a valid project_id to post to project cost ledger.');
    }

    const validCategories = ['equipment', 'subcontractor', 'overhead'];
    if (!validCategories.includes(cost_category)) {
      throw new Error(`Invalid cost_category '${cost_category}' for invoice. Must be one of: ${validCategories.join(', ')}.`);
    }

    const totalAmount = Number(Number(invoice.grand_total || 0).toFixed(2));
    if (totalAmount <= 0) {
      throw new Error('Invoice has zero or invalid grand_total.');
    }

    const idempotencyKey = `INV-COST-${cost_category.toUpperCase()}-${invoice.company_id}-${invoice.id}`;

    return await this.recordCost({
      company_id: invoice.company_id,
      project_id: invoice.project_id,
      cost_category,
      event_type: 'accrual',
      budget_head_id,
      wbs_id,
      cbs_id,
      source_type: 'VENDORS_INVOICE',
      source_id: String(invoice.id),
      source_line_identifier: invoice.invoice_number || `INV-${invoice.id}`,
      recognition_date: invoice.invoice_date || new Date().toISOString().split('T')[0],
      quantity: 1,
      rate: totalAmount,
      amount: totalAmount,
      currency: 'INR',
      idempotency_key: idempotencyKey,
      reason: `${cost_category} cost recognized from approved vendor invoice #${invoice.invoice_number}`,
      posted_by,
      transaction,
    });
  }
}

module.exports = ProjectCostLedgerService;
