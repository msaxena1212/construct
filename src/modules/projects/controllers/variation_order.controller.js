'use strict';
const db = require('../../../models');
const VariationOrderService = require('../../../core/services/variation_order.service');

/**
 * Controller for Enterprise Variations, Change Orders & Subcontractor Claims (Batch W).
 */
class VariationOrderController {
  /**
   * Create Draft Variation Order
   * POST /api/v1/variation-orders
   */
  static async createVariationOrder(req, res) {
    try {
      const company_id = req.user.company_id;
      const user_id = req.user.id;
      const {
        project_id,
        vendor_id,
        variation_number,
        change_type,
        category,
        title,
        description,
        originating_source,
        time_extension_days_requested,
        supporting_docs_url,
        items,
      } = req.body;

      if (!project_id || !variation_number || !title || !description) {
        return res.status(400).json({
          status: 'failed',
          message: 'project_id, variation_number, title, and description are required.',
        });
      }

      const vo = await VariationOrderService.createVariationOrder({
        company_id,
        project_id,
        vendor_id,
        variation_number,
        change_type,
        category,
        title,
        description,
        originating_source,
        time_extension_days_requested,
        supporting_docs_url,
        items: items || [],
        created_by: user_id,
      });

      return res.status(201).json({
        status: 'success',
        message: 'Variation order created successfully in draft status.',
        data: vo,
      });
    } catch (err) {
      console.error('[createVariationOrder error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to create variation order.',
      });
    }
  }

  /**
   * List Variation Orders for Project
   * GET /api/v1/variation-orders/project/:projectId
   */
  static async listVariationOrders(req, res) {
    try {
      const company_id = req.user.company_id;
      const project_id = req.params.projectId;
      const { status, change_type } = req.query;

      const where = { company_id, project_id };
      if (status) where.status = status;
      if (change_type) where.change_type = change_type;

      const orders = await db.variation_order.findAll({
        where,
        include: [
          { model: db.variation_order_item, as: 'items' },
          { model: db.project, as: 'project', attributes: ['id', 'name', 'type'] },
        ],
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        status: 'success',
        data: orders,
      });
    } catch (err) {
      console.error('[listVariationOrders error]:', err);
      return res.status(500).json({
        status: 'failed',
        message: err.message || 'Failed to retrieve variation orders.',
      });
    }
  }

  /**
   * Get Single Variation Order with Items
   * GET /api/v1/variation-orders/:id
   */
  static async getVariationOrderById(req, res) {
    try {
      const company_id = req.user.company_id;
      const { id } = req.params;

      const vo = await db.variation_order.findOne({
        where: { id, company_id },
        include: [
          { model: db.variation_order_item, as: 'items' },
          { model: db.project, as: 'project', attributes: ['id', 'name', 'type'] },
        ],
      });

      if (!vo) {
        return res.status(404).json({
          status: 'failed',
          message: `Variation order #${id} not found.`,
        });
      }

      return res.status(200).json({
        status: 'success',
        data: vo,
      });
    } catch (err) {
      console.error('[getVariationOrderById error]:', err);
      return res.status(500).json({
        status: 'failed',
        message: err.message || 'Failed to retrieve variation order.',
      });
    }
  }

  /**
   * Submit Variation Order for Review
   * PUT /api/v1/variation-orders/:id/submit
   */
  static async submitVariationOrder(req, res) {
    try {
      const company_id = req.user.company_id;
      const user_id = req.user.id;
      const { id } = req.params;

      const vo = await VariationOrderService.submitVariationOrder({
        company_id,
        variation_id: id,
        user_id,
      });

      return res.status(200).json({
        status: 'success',
        message: `Variation order #${vo.variation_number} submitted for review.`,
        data: vo,
      });
    } catch (err) {
      console.error('[submitVariationOrder error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to submit variation order.',
      });
    }
  }

  /**
   * Technical Review
   * PUT /api/v1/variation-orders/:id/technical-review
   */
  static async technicalReview(req, res) {
    try {
      const company_id = req.user.company_id;
      const reviewer_id = req.user.id;
      const { id } = req.params;
      const { recommended_time_extension, notes } = req.body;

      const vo = await VariationOrderService.performTechnicalReview({
        company_id,
        variation_id: id,
        reviewer_id,
        recommended_time_extension,
        notes,
      });

      return res.status(200).json({
        status: 'success',
        message: `Technical review completed for variation order #${vo.variation_number}.`,
        data: vo,
      });
    } catch (err) {
      console.error('[technicalReview error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to complete technical review.',
      });
    }
  }

  /**
   * Commercial Review
   * PUT /api/v1/variation-orders/:id/commercial-review
   */
  static async commercialReview(req, res) {
    try {
      const company_id = req.user.company_id;
      const reviewer_id = req.user.id;
      const { id } = req.params;
      const { negotiated_items, notes } = req.body;

      const vo = await VariationOrderService.performCommercialReview({
        company_id,
        variation_id: id,
        reviewer_id,
        negotiated_items: negotiated_items || [],
        notes,
      });

      return res.status(200).json({
        status: 'success',
        message: `Commercial evaluation recorded for variation order #${vo.variation_number}.`,
        data: vo,
      });
    } catch (err) {
      console.error('[commercialReview error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to complete commercial review.',
      });
    }
  }

  /**
   * Budget Review
   * PUT /api/v1/variation-orders/:id/budget-review
   */
  static async budgetReview(req, res) {
    try {
      const company_id = req.user.company_id;
      const reviewer_id = req.user.id;
      const { id } = req.params;

      const vo = await VariationOrderService.performBudgetReview({
        company_id,
        variation_id: id,
        reviewer_id,
      });

      return res.status(200).json({
        status: 'success',
        message: `Budget verification completed for variation order #${vo.variation_number}.`,
        data: vo,
      });
    } catch (err) {
      console.error('[budgetReview error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to complete budget review.',
      });
    }
  }

  /**
   * Approve Variation Order
   * PUT /api/v1/variation-orders/:id/approve
   */
  static async approveVariationOrder(req, res) {
    try {
      const company_id = req.user.company_id;
      const approver_id = req.user.id;
      const { id } = req.params;
      const { approved_time_extension_days } = req.body || {};

      const vo = await VariationOrderService.approveVariationOrder({
        company_id,
        variation_id: id,
        approver_id,
        approved_time_extension_days,
      });

      return res.status(200).json({
        status: 'success',
        message: `Variation order #${vo.variation_number} approved successfully.`,
        data: vo,
      });
    } catch (err) {
      console.error('[approveVariationOrder error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to approve variation order.',
      });
    }
  }

  /**
   * Implement Approved Variation Order
   * PUT /api/v1/variation-orders/:id/implement
   */
  static async implementVariationOrder(req, res) {
    try {
      const company_id = req.user.company_id;
      const user_id = req.user.id;
      const { id } = req.params;

      const vo = await VariationOrderService.implementVariationOrder({
        company_id,
        variation_id: id,
        user_id,
      });

      return res.status(200).json({
        status: 'success',
        message: `Variation order #${vo.variation_number} implemented into active contract baseline.`,
        data: vo,
      });
    } catch (err) {
      console.error('[implementVariationOrder error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to implement variation order.',
      });
    }
  }

  /**
   * Reject Variation Order
   * PUT /api/v1/variation-orders/:id/reject
   */
  static async rejectVariationOrder(req, res) {
    try {
      const company_id = req.user.company_id;
      const user_id = req.user.id;
      const { id } = req.params;
      const { reason } = req.body;

      const vo = await VariationOrderService.rejectVariationOrder({
        company_id,
        variation_id: id,
        user_id,
        reason,
      });

      return res.status(200).json({
        status: 'success',
        message: `Variation order #${vo.variation_number} rejected.`,
        data: vo,
      });
    } catch (err) {
      console.error('[rejectVariationOrder error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to reject variation order.',
      });
    }
  }

  /**
   * Withdraw Variation Order
   * PUT /api/v1/variation-orders/:id/withdraw
   */
  static async withdrawVariationOrder(req, res) {
    try {
      const company_id = req.user.company_id;
      const user_id = req.user.id;
      const { id } = req.params;
      const { reason } = req.body;

      const vo = await VariationOrderService.withdrawVariationOrder({
        company_id,
        variation_id: id,
        user_id,
        reason,
      });

      return res.status(200).json({
        status: 'success',
        message: `Variation order #${vo.variation_number} withdrawn.`,
        data: vo,
      });
    } catch (err) {
      console.error('[withdrawVariationOrder error]:', err);
      return res.status(400).json({
        status: 'failed',
        message: err.message || 'Failed to withdraw variation order.',
      });
    }
  }

  /**
   * Get Variation Reconciliation Summary for Project
   * GET /api/v1/variation-orders/project/:projectId/summary
   */
  static async getVariationSummary(req, res) {
    try {
      const company_id = req.user.company_id;
      const project_id = req.params.projectId;

      const summary = await VariationOrderService.getProjectVariationSummary({
        company_id,
        project_id,
      });

      return res.status(200).json({
        status: 'success',
        data: summary,
      });
    } catch (err) {
      console.error('[getVariationSummary error]:', err);
      return res.status(500).json({
        status: 'failed',
        message: err.message || 'Failed to retrieve variation summary.',
      });
    }
  }
}

module.exports = VariationOrderController;
