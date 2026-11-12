'use strict';
const db = require('../../models');

/**
 * Service to manage Enterprise Variations, Change Orders & Subcontractor Claims (Batch W).
 * Handles:
 * - Immutable baseline preservation
 * - Multi-stage approval state machine (Draft -> Submitted -> Technical Review -> Commercial Review -> Budget Review -> Approved -> Implemented)
 * - Segregation of duties across submitter, technical reviewer, commercial reviewer, budget reviewer, and final approver
 * - Rejection, Return for Revision, and Withdrawal workflows
 * - Decimal-safe calculation of delta quantities, rates, and values
 * - Controlled implementation: adjusting authorized BOQ caps without destroying original baselines
 * - Integration with Budget Revisions and Financial Reconciliation
 */
class VariationOrderService {
  /**
   * Helper: Round number to 2 decimal places safely
   */
  static round2(val) {
    const num = parseFloat(val);
    return isNaN(num) ? 0.00 : Number(num.toFixed(2));
  }

  /**
   * Helper: Round quantity to 3 decimal places safely
   */
  static round3(val) {
    const num = parseFloat(val);
    return isNaN(num) ? 0.000 : Number(num.toFixed(3));
  }

  /**
   * Create a new draft variation order with item lines
   */
  static async createVariationOrder({
    company_id,
    project_id,
    vendor_id = null,
    variation_number,
    change_type = 'client_variation',
    category = 'addition',
    title,
    description,
    originating_source = null,
    time_extension_days_requested = 0,
    supporting_docs_url = null,
    items = [],
    created_by,
    transaction = null,
  }) {
    if (!company_id || !project_id || !title || !description || !variation_number) {
      throw new Error('company_id, project_id, variation_number, title, and description are required.');
    }

    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const project = await db.project.findOne({
        where: { id: project_id, company_id },
        transaction: t,
      });
      if (!project) {
        throw new Error(`Project #${project_id} does not belong to company #${company_id}.`);
      }

      const existing = await db.variation_order.findOne({
        where: { company_id, project_id, variation_number: String(variation_number).trim() },
        transaction: t,
      });
      if (existing) {
        throw new Error(`Variation order number "${variation_number}" already exists in this project.`);
      }

      let totalProposedAmount = 0.00;
      const parsedItems = [];

      for (let idx = 0; idx < items.length; idx++) {
        const it = items[idx];
        let originalQty = 0.000;
        let originalRate = 0.00;
        let originalAmount = 0.00;
        let boqItem = null;

        if (it.boq_item_id) {
          boqItem = await db.boq_item.findOne({
            where: { id: it.boq_item_id, project_id, company_id },
            transaction: t,
          });
          if (!boqItem) {
            throw new Error(`BOQ item #${it.boq_item_id} not found in project #${project_id}.`);
          }
          originalQty = parseFloat(boqItem.estimated_qty) || 0.000;
          originalRate = parseFloat(boqItem.unit_rate) || 0.00;
          originalAmount = this.round2(originalQty * originalRate);
        }

        const proposedDeltaQty = this.round3(it.proposed_delta_qty);
        const proposedRate = it.proposed_rate !== undefined && it.proposed_rate !== null
          ? this.round2(it.proposed_rate)
          : (boqItem ? parseFloat(boqItem.unit_rate) : 0.00);

        const proposedDeltaAmount = this.round2(proposedDeltaQty * proposedRate);
        totalProposedAmount = this.round2(totalProposedAmount + proposedDeltaAmount);

        parsedItems.push({
          company_id,
          project_id,
          boq_item_id: it.boq_item_id || null,
          wbs_id: it.wbs_id || (boqItem ? boqItem.wbs_id : null),
          cbs_id: it.cbs_id || (boqItem ? boqItem.cbs_id : null),
          budget_head_id: it.budget_head_id || null,
          line_type: it.line_type || (it.boq_item_id ? 'boq_quantity_deviation' : 'new_scope_item'),
          item_code: it.item_code || (boqItem ? boqItem.item_code : `VAR-LINE-${idx + 1}`),
          description: String(it.description || (boqItem ? boqItem.description : `Line ${idx + 1}`)).trim(),
          unit: it.unit || (boqItem ? boqItem.unit : 'unit'),
          original_qty: originalQty,
          original_rate: originalRate,
          original_amount: originalAmount,
          proposed_delta_qty: proposedDeltaQty,
          proposed_rate: proposedRate,
          proposed_delta_amount: proposedDeltaAmount,
          approved_delta_qty: 0.000,
          approved_rate: 0.00,
          approved_delta_amount: 0.00,
          is_implemented: false,
        });
      }

      // Cost impact vs Revenue impact based on change_type
      const isClient = change_type === 'client_variation';
      const netRevenueImpact = isClient ? totalProposedAmount : 0.00;
      const netCostImpact = !isClient ? totalProposedAmount : (category === 'omission' ? -Math.abs(totalProposedAmount) : totalProposedAmount);

      const vo = await db.variation_order.create(
        {
          variation_number: String(variation_number).trim(),
          company_id,
          project_id,
          vendor_id,
          change_type,
          category,
          title: String(title).trim(),
          description: String(description).trim(),
          originating_source,
          status: 'draft',
          version: 1,
          net_cost_impact: netCostImpact,
          net_revenue_impact: netRevenueImpact,
          proposed_amount: totalProposedAmount,
          approved_amount: 0.00,
          time_extension_days_requested: parseInt(time_extension_days_requested, 10) || 0,
          time_extension_days_approved: 0,
          created_by,
          supporting_docs_url,
        },
        { transaction: t }
      );

      for (const itemData of parsedItems) {
        await db.variation_order_item.create(
          {
            ...itemData,
            variation_order_id: vo.id,
          },
          { transaction: t }
        );
      }

      if (manageTx) await t.commit();

      return await db.variation_order.findByPk(vo.id, {
        include: [{ model: db.variation_order_item, as: 'items' }],
      });
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Submit Variation Order for Review
   */
  static async submitVariationOrder({
    company_id,
    variation_id,
    user_id,
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        include: [{ model: db.variation_order_item, as: 'items' }],
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status !== 'draft') {
        throw new Error(`Only draft variation orders can be submitted. Current status: ${vo.status}.`);
      }

      if (!vo.items || vo.items.length === 0) {
        throw new Error('Cannot submit variation order without any items.');
      }

      await vo.update(
        {
          status: 'submitted',
          submission_date: new Date(),
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Technical Review Transition
   */
  static async performTechnicalReview({
    company_id,
    variation_id,
    reviewer_id,
    recommended_time_extension = null,
    notes = null,
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status !== 'submitted') {
        throw new Error(`Only submitted variation orders can undergo technical review. Current: ${vo.status}`);
      }

      // Segregation of Duties: Submitter cannot perform technical review
      if (Number(vo.created_by) === Number(reviewer_id)) {
        throw new Error('Segregation of duties violation: Creator cannot conduct technical review.');
      }

      const updateData = {
        status: 'technical_review',
        technical_reviewer_id: reviewer_id,
      };
      if (recommended_time_extension !== null) {
        updateData.time_extension_days_approved = parseInt(recommended_time_extension, 10) || 0;
      }

      await vo.update(updateData, { transaction: t });

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Commercial Review Transition
   */
  static async performCommercialReview({
    company_id,
    variation_id,
    reviewer_id,
    negotiated_items = [], // Array of { id, approved_delta_qty, approved_rate }
    notes = null,
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        include: [{ model: db.variation_order_item, as: 'items' }],
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status !== 'technical_review' && vo.status !== 'submitted') {
        throw new Error(`Variation order must be under review for commercial evaluation. Current: ${vo.status}`);
      }

      // Segregation of Duties
      if (Number(vo.created_by) === Number(reviewer_id)) {
        throw new Error('Segregation of duties violation: Creator cannot conduct commercial review.');
      }

      const negMap = new Map();
      negotiated_items.forEach((it) => {
        negMap.set(Number(it.id), {
          qty: it.approved_delta_qty !== undefined ? parseFloat(it.approved_delta_qty) : null,
          rate: it.approved_rate !== undefined ? parseFloat(it.approved_rate) : null,
        });
      });

      let totalApprovedAmount = 0.00;

      for (const item of vo.items) {
        let appQty = parseFloat(item.proposed_delta_qty);
        let appRate = parseFloat(item.proposed_rate);

        if (negMap.has(Number(item.id))) {
          const neg = negMap.get(Number(item.id));
          if (neg.qty !== null && !isNaN(neg.qty)) appQty = this.round3(neg.qty);
          if (neg.rate !== null && !isNaN(neg.rate)) appRate = this.round2(neg.rate);
        }

        const appAmount = this.round2(appQty * appRate);
        totalApprovedAmount = this.round2(totalApprovedAmount + appAmount);

        await item.update(
          {
            approved_delta_qty: appQty,
            approved_rate: appRate,
            approved_delta_amount: appAmount,
          },
          { transaction: t }
        );
      }

      await vo.update(
        {
          status: 'commercial_review',
          commercial_reviewer_id: reviewer_id,
          approved_amount: totalApprovedAmount,
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Budget Review Transition
   */
  static async performBudgetReview({
    company_id,
    variation_id,
    reviewer_id,
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status !== 'commercial_review') {
        throw new Error(`Commercial review must be completed before budget review. Current: ${vo.status}`);
      }

      // Segregation of Duties
      if (Number(vo.created_by) === Number(reviewer_id)) {
        throw new Error('Segregation of duties violation: Creator cannot conduct budget review.');
      }

      await vo.update(
        {
          status: 'budget_review',
          budget_reviewer_id: reviewer_id,
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Final Authorization & Approval
   */
  static async approveVariationOrder({
    company_id,
    variation_id,
    approver_id,
    approved_time_extension_days = null,
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        include: [{ model: db.variation_order_item, as: 'items' }],
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status !== 'budget_review' && vo.status !== 'commercial_review') {
        throw new Error(`Variation order #${variation_id} cannot be approved in status '${vo.status}'.`);
      }

      // Segregation of Duties: Approver cannot be the creator
      if (Number(vo.created_by) === Number(approver_id)) {
        throw new Error('Segregation of duties violation: Creator cannot approve their own variation order.');
      }

      // Ensure item approved figures are set
      let totalApprovedAmt = 0.00;
      for (const item of vo.items) {
        let appAmt = parseFloat(item.approved_delta_amount);
        if (isNaN(appAmt) || appAmt === 0) {
          const appQty = parseFloat(item.approved_delta_qty) || parseFloat(item.proposed_delta_qty);
          const appRate = parseFloat(item.approved_rate) || parseFloat(item.proposed_rate);
          appAmt = this.round2(appQty * appRate);

          await item.update(
            {
              approved_delta_qty: appQty,
              approved_rate: appRate,
              approved_delta_amount: appAmt,
            },
            { transaction: t }
          );
        }
        totalApprovedAmt = this.round2(totalApprovedAmt + appAmt);
      }

      const updateData = {
        status: 'approved',
        approved_by: approver_id,
        approval_date: new Date(),
        approved_amount: totalApprovedAmt,
      };

      if (approved_time_extension_days !== null) {
        updateData.time_extension_days_approved = parseInt(approved_time_extension_days, 10) || 0;
      }

      await vo.update(updateData, { transaction: t });

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Implement Approved Variation Order:
   * Adjusts authorized BOQ scopes / adds new BOQ items to enable Measurement Book certification.
   * Preserves historical baselines and ensures idempotency.
   */
  static async implementVariationOrder({
    company_id,
    variation_id,
    user_id,
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        include: [{ model: db.variation_order_item, as: 'items' }],
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status !== 'approved') {
        throw new Error(`Only approved variation orders can be implemented. Current status: '${vo.status}'.`);
      }

      for (const item of vo.items) {
        if (item.is_implemented) continue;

        if (item.boq_item_id) {
          // Adjust existing BOQ Item estimated cap
          const boq = await db.boq_item.findOne({
            where: { id: item.boq_item_id, company_id, project_id: vo.project_id },
            transaction: t,
          });

          if (boq) {
            const currentEstimatedQty = parseFloat(boq.estimated_qty) || 0.000;
            const deltaQty = parseFloat(item.approved_delta_qty) || 0.000;
            const newEstimatedQty = this.round3(currentEstimatedQty + deltaQty);

            if (newEstimatedQty < 0) {
              throw new Error(
                `Implementation of item #${item.id} would cause BOQ item #${boq.id} estimated quantity to fall below zero.`
              );
            }

            const currentRate = parseFloat(boq.unit_rate) || 0.00;
            const newTotalEstAmount = this.round2(newEstimatedQty * currentRate);

            await boq.update(
              {
                estimated_qty: newEstimatedQty,
                total_estimated_amount: newTotalEstAmount,
              },
              { transaction: t }
            );
          }
        } else {
          // Create new BOQ Item for extension of scope
          const newQty = parseFloat(item.approved_delta_qty) || 0.000;
          const newRate = parseFloat(item.approved_rate) || 0.00;
          const newAmount = this.round2(newQty * newRate);

          const newBoq = await db.boq_item.create(
            {
              project_id: vo.project_id,
              company_id: vo.company_id,
              item_code: item.item_code || `VO-${vo.variation_number}-ITEM`,
              description: item.description,
              category: 'Variation Extension',
              unit: item.unit || 'unit',
              estimated_qty: newQty,
              unit_rate: newRate,
              total_estimated_amount: newAmount,
              executed_qty: 0,
              billed_amount: 0,
              wbs_id: item.wbs_id,
              cbs_id: item.cbs_id,
            },
            { transaction: t }
          );

          await item.update({ boq_item_id: newBoq.id }, { transaction: t });
        }

        await item.update({ is_implemented: true }, { transaction: t });
      }

      await vo.update(
        {
          status: 'implemented',
          implementation_date: new Date(),
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Reject Variation Order
   */
  static async rejectVariationOrder({
    company_id,
    variation_id,
    user_id,
    reason,
    transaction = null,
  }) {
    if (!reason || !String(reason).trim()) {
      throw new Error('A detailed reason is mandatory when rejecting a variation order.');
    }

    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status === 'approved' || vo.status === 'implemented') {
        throw new Error(`Cannot reject variation order in status '${vo.status}'. Approved orders must follow revision workflow.`);
      }

      // Segregation of duties: Submitter cannot reject their own variation
      if (Number(vo.created_by) === Number(user_id)) {
        throw new Error('Segregation of duties: Submitter cannot reject their own variation order. Must use withdrawal.');
      }

      await vo.update(
        {
          status: 'rejected',
          rejection_reason: String(reason).trim(),
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Withdraw Variation Order (By Submitter)
   */
  static async withdrawVariationOrder({
    company_id,
    variation_id,
    user_id,
    reason,
    transaction = null,
  }) {
    const t = transaction || (await db.sequelize.transaction());
    const manageTx = !transaction;

    try {
      const vo = await db.variation_order.findOne({
        where: { id: variation_id, company_id },
        transaction: t,
      });
      if (!vo) throw new Error(`Variation order #${variation_id} not found.`);

      if (vo.status === 'approved' || vo.status === 'implemented') {
        throw new Error(`Cannot withdraw variation order in status '${vo.status}'.`);
      }

      await vo.update(
        {
          status: 'withdrawn',
          rejection_reason: reason ? `Withdrawn: ${String(reason).trim()}` : 'Withdrawn by originator',
        },
        { transaction: t }
      );

      if (manageTx) await t.commit();
      return vo;
    } catch (err) {
      if (manageTx) await t.rollback();
      throw err;
    }
  }

  /**
   * Reconcile Variation Metrics for a Project
   */
  static async getProjectVariationSummary({ company_id, project_id, transaction = null }) {
    const orders = await db.variation_order.findAll({
      where: { company_id, project_id },
      include: [{ model: db.variation_order_item, as: 'items' }],
      transaction,
    });

    let totalProposedVariation = 0.00;
    let totalApprovedVariation = 0.00;
    let totalImplementedVariation = 0.00;
    let totalApprovedTimeExtensionDays = 0;

    let pendingApprovalCount = 0;
    let approvedCount = 0;
    let implementedCount = 0;

    for (const vo of orders) {
      const prop = parseFloat(vo.proposed_amount) || 0.00;
      const app = parseFloat(vo.approved_amount) || 0.00;

      if (vo.status === 'approved' || vo.status === 'implemented') {
        totalApprovedVariation = this.round2(totalApprovedVariation + app);
        totalApprovedTimeExtensionDays += vo.time_extension_days_approved || 0;
        approvedCount++;
      }

      if (vo.status === 'implemented') {
        totalImplementedVariation = this.round2(totalImplementedVariation + app);
        implementedCount++;
      }

      if (['submitted', 'technical_review', 'commercial_review', 'budget_review'].includes(vo.status)) {
        totalProposedVariation = this.round2(totalProposedVariation + prop);
        pendingApprovalCount++;
      }
    }

    return {
      project_id,
      company_id,
      total_variations_count: orders.length,
      pending_approval_count: pendingApprovalCount,
      approved_count: approvedCount,
      implemented_count: implementedCount,
      total_proposed_variation: totalProposedVariation,
      total_approved_variation: totalApprovedVariation,
      total_implemented_variation: totalImplementedVariation,
      total_approved_time_extension_days: totalApprovedTimeExtensionDays,
    };
  }
}

module.exports = VariationOrderService;
