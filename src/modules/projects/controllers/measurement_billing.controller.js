const db = require('../../../models');
const MeasurementBillingService = require('../../../core/services/measurement_billing.service');

class MeasurementBillingController {
  /**
   * GET /api/v1/measurement-books/project/:projectId
   * List Measurement Books for a project
   */
  async getMeasurementBooks(req, res) {
    try {
      const company_id = req.user.company_id;
      const project_id = req.params.projectId;
      const { status, vendor_id, limit = 50, offset = 0 } = req.query;

      const where = { company_id, project_id };
      if (status) where.status = status;
      if (vendor_id) where.vendor_id = vendor_id;

      const { count, rows } = await db.measurement_book.findAndCountAll({
        where,
        include: [
          {
            model: db.vendors,
            as: 'vendor',
            attributes: ['id', ['name', 'vendor_name'], ['spoc_phone', 'phone_number']],
            required: false,
          },
          {
            model: db.measurement_book_item,
            as: 'items',
            include: [
              {
                model: db.boq_item,
                as: 'boq_item',
                attributes: ['id', 'item_code', 'description', 'unit', 'unit_rate', 'estimated_qty', 'executed_qty'],
                required: false,
              },
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      return res.status(200).json({
        status: true,
        data: rows,
        total: count,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
    } catch (error) {
      console.error('getMeasurementBooks error:', error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  /**
   * GET /api/v1/measurement-books/:id
   * Get single Measurement Book with details
   */
  async getMeasurementBookById(req, res) {
    try {
      const company_id = req.user.company_id;
      const { id } = req.params;

      const mb = await db.measurement_book.findOne({
        where: { id, company_id },
        include: [
          {
            model: db.project,
            as: 'project',
            attributes: ['id', ['name', 'project_name'], 'project_code'],
          },
          {
            model: db.vendors,
            as: 'vendor',
            attributes: ['id', ['name', 'vendor_name'], ['spoc_phone', 'phone_number'], ['pan_card_no', 'pan_number'], ['gst_no', 'gst_number']],
            required: false,
          },
          {
            model: db.measurement_book_item,
            as: 'items',
            include: [
              {
                model: db.boq_item,
                as: 'boq_item',
                attributes: ['id', 'item_code', 'description', 'unit', 'unit_rate', 'estimated_qty', 'executed_qty'],
                required: false,
              },
            ],
          },
        ],
      });

      if (!mb) {
        return res.status(404).json({ status: false, message: 'Measurement book not found.' });
      }

      return res.status(200).json({ status: true, data: mb });
    } catch (error) {
      console.error('getMeasurementBookById error:', error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  /**
   * POST /api/v1/measurement-books
   * Create Draft Measurement Book
   */
  async createMeasurementBook(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = req.user.company_id;
      const {
        project_id,
        vendor_id,
        contract_reference,
        title,
        measurement_date,
        period_start,
        period_end,
        remarks,
        items,
      } = req.body;

      if (!project_id || !title || !measurement_date) {
        await t.rollback();
        return res.status(400).json({
          status: false,
          message: 'project_id, title, and measurement_date are required.',
        });
      }

      const mb = await MeasurementBillingService.createMeasurementBook({
        company_id,
        project_id,
        vendor_id: vendor_id || null,
        contract_reference,
        title,
        measurement_date,
        period_start,
        period_end,
        remarks,
        submitted_by: req.user.id,
        items: items || [],
        transaction: t,
      });

      await t.commit();
      return res.status(201).json({
        status: true,
        message: 'Measurement book created successfully.',
        data: mb,
      });
    } catch (error) {
      await t.rollback();
      console.error('createMeasurementBook error:', error);
      return res.status(400).json({ status: false, message: error.message });
    }
  }

  /**
   * POST /api/v1/measurement-books/:id/items
   * Add Item to Draft Measurement Book
   */
  async addItem(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = req.user.company_id;
      const mb_id = req.params.id;

      const mb = await db.measurement_book.findOne({
        where: { id: mb_id, company_id },
        transaction: t,
      });

      if (!mb) {
        await t.rollback();
        return res.status(404).json({ status: false, message: 'Measurement book not found.' });
      }

      if (mb.status !== 'draft') {
        await t.rollback();
        return res.status(400).json({
          status: false,
          message: `Cannot add items to measurement book with status "${mb.status}".`,
        });
      }

      const item = await MeasurementBillingService.addItemToMeasurementBook({
        company_id,
        project_id: mb.project_id,
        mb_id: mb.id,
        rawItem: req.body,
        transaction: t,
      });

      // Recalculate total
      const newTotal = await db.measurement_book_item.sum('measured_amount', {
        where: { mb_id: mb.id },
        transaction: t,
      });
      await mb.update({ total_measured_amount: Number(parseFloat(newTotal || 0).toFixed(2)) }, { transaction: t });

      await t.commit();
      return res.status(201).json({
        status: true,
        message: 'Measurement item added successfully.',
        data: item,
      });
    } catch (error) {
      await t.rollback();
      console.error('addItem error:', error);
      return res.status(400).json({ status: false, message: error.message });
    }
  }

  /**
   * POST /api/v1/measurement-books/:id/submit
   * Submit Measurement Book for review
   */
  async submitMeasurementBook(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = req.user.company_id;
      const mb_id = req.params.id;

      const mb = await MeasurementBillingService.submitMeasurementBook({
        company_id,
        mb_id,
        user_id: req.user.id,
        transaction: t,
      });

      await t.commit();
      return res.status(200).json({
        status: true,
        message: 'Measurement book submitted for certification successfully.',
        data: mb,
      });
    } catch (error) {
      await t.rollback();
      console.error('submitMeasurementBook error:', error);
      return res.status(400).json({ status: false, message: error.message });
    }
  }

  /**
   * POST /api/v1/measurement-books/:id/certify
   * Certify Measurement Book (Segregation of duties enforced)
   */
  async certifyMeasurementBook(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = req.user.company_id;
      const mb_id = req.params.id;
      const { items } = req.body;

      const mb = await MeasurementBillingService.certifyMeasurementBook({
        company_id,
        mb_id,
        certifier_id: req.user.id,
        itemsToCertify: items || [],
        transaction: t,
      });

      await t.commit();
      return res.status(200).json({
        status: true,
        message: 'Measurement book certified successfully.',
        data: mb,
      });
    } catch (error) {
      await t.rollback();
      console.error('certifyMeasurementBook error:', error);
      return res.status(400).json({ status: false, message: error.message });
    }
  }

  /**
   * POST /api/v1/measurement-books/:id/reject
   * Reject Measurement Book with reason
   */
  async rejectMeasurementBook(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = req.user.company_id;
      const mb_id = req.params.id;
      const { rejection_reason } = req.body;

      if (!rejection_reason) {
        await t.rollback();
        return res.status(400).json({ status: false, message: 'rejection_reason is required.' });
      }

      const mb = await MeasurementBillingService.rejectMeasurementBook({
        company_id,
        mb_id,
        user_id: req.user.id,
        rejection_reason,
        transaction: t,
      });

      await t.commit();
      return res.status(200).json({
        status: true,
        message: 'Measurement book rejected.',
        data: mb,
      });
    } catch (error) {
      await t.rollback();
      console.error('rejectMeasurementBook error:', error);
      return res.status(400).json({ status: false, message: error.message });
    }
  }

  /**
   * GET /api/v1/contractor-ra-bills/project/:projectId
   * List Contractor RA Bills for a project
   */
  async getContractorRaBills(req, res) {
    try {
      const company_id = req.user.company_id;
      const project_id = req.params.projectId;
      const { status, vendor_id, limit = 50, offset = 0 } = req.query;

      const where = { company_id, project_id };
      if (status) where.status = status;
      if (vendor_id) where.vendor_id = vendor_id;

      const { count, rows } = await db.contractor_ra_bill.findAndCountAll({
        where,
        include: [
          {
            model: db.vendors,
            as: 'vendor',
            attributes: ['id', ['name', 'vendor_name'], ['spoc_phone', 'phone_number'], ['pan_card_no', 'pan_number'], ['gst_no', 'gst_number']],
            required: false,
          },
          {
            model: db.measurement_book_item,
            as: 'billed_items',
            include: [
              {
                model: db.boq_item,
                as: 'boq_item',
                attributes: ['id', 'item_code', 'description', 'unit', 'unit_rate'],
                required: false,
              },
            ],
          },
        ],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      return res.status(200).json({
        status: true,
        data: rows,
        total: count,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
    } catch (error) {
      console.error('getContractorRaBills error:', error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  /**
   * GET /api/v1/contractor-ra-bills/:id
   * Get single Contractor RA Bill details
   */
  async getContractorRaBillById(req, res) {
    try {
      const company_id = req.user.company_id;
      const { id } = req.params;

      const bill = await db.contractor_ra_bill.findOne({
        where: { id, company_id },
        include: [
          {
            model: db.project,
            as: 'project',
            attributes: ['id', ['name', 'project_name'], 'project_code'],
          },
          {
            model: db.vendors,
            as: 'vendor',
            attributes: ['id', ['name', 'vendor_name'], ['spoc_phone', 'phone_number'], ['pan_card_no', 'pan_number'], ['gst_no', 'gst_number']],
            required: false,
          },
          {
            model: db.measurement_book_item,
            as: 'billed_items',
            include: [
              {
                model: db.boq_item,
                as: 'boq_item',
                attributes: ['id', 'item_code', 'description', 'unit', 'unit_rate'],
                required: false,
              },
            ],
          },
        ],
      });

      if (!bill) {
        return res.status(404).json({ status: false, message: 'Contractor RA Bill not found.' });
      }

      return res.status(200).json({ status: true, data: bill });
    } catch (error) {
      console.error('getContractorRaBillById error:', error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  /**
   * POST /api/v1/contractor-ra-bills
   * Generate Contractor RA Bill from certified measurement items
   */
  async createContractorRaBill(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = req.user.company_id;
      const {
        project_id,
        vendor_id,
        contract_reference,
        billing_period_start,
        billing_period_end,
        mb_item_ids,
        retention_rate_pct,
        tds_rate_pct,
        other_deductions_amount,
        idempotency_key,
        remarks,
      } = req.body;

      const raBill = await MeasurementBillingService.createContractorRaBill({
        company_id,
        project_id,
        vendor_id,
        contract_reference,
        billing_period_start,
        billing_period_end,
        mb_item_ids: mb_item_ids || [],
        retention_rate_pct: retention_rate_pct !== undefined ? retention_rate_pct : 5.0,
        tds_rate_pct: tds_rate_pct !== undefined ? tds_rate_pct : 2.0,
        other_deductions_amount: other_deductions_amount || 0,
        prepared_by: req.user.id,
        idempotency_key,
        remarks,
        transaction: t,
      });

      await t.commit();
      return res.status(201).json({
        status: true,
        message: 'Contractor RA Bill created successfully.',
        data: raBill,
      });
    } catch (error) {
      await t.rollback();
      console.error('createContractorRaBill error:', error);
      return res.status(400).json({ status: false, message: error.message });
    }
  }

  /**
   * POST /api/v1/contractor-ra-bills/:id/approve
   * Approve Contractor RA Bill and accrue cost in Project Cost Ledger
   */
  async approveContractorRaBill(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = req.user.company_id;
      const ra_bill_id = req.params.id;
      const { postToCostLedger = true } = req.body;

      const raBill = await MeasurementBillingService.approveContractorRaBill({
        company_id,
        ra_bill_id,
        approver_id: req.user.id,
        postToCostLedger,
        transaction: t,
      });

      await t.commit();
      return res.status(200).json({
        status: true,
        message: 'Contractor RA Bill approved and cost accrued successfully.',
        data: raBill,
      });
    } catch (error) {
      await t.rollback();
      console.error('approveContractorRaBill error:', error);
      const status = error.code === 'BUDGET_GATE_BLOCKED' ? 409 : 400;
      return res.status(status).json({ status: false, code: error.code || undefined, message: error.message, budget_gate: error.budgetGate || undefined });
    }
  }

  /**
   * GET /api/v1/measurement-books/project/:projectId/certified-unbilled
   * Helper to retrieve all certified items eligible for RA billing
   */
  async getCertifiedUnbilledItems(req, res) {
    try {
      const company_id = req.user.company_id;
      const project_id = req.params.projectId;
      const { vendor_id } = req.query;

      const where = {
        company_id,
        project_id,
        status: 'certified',
        ra_bill_id: null,
      };

      const mbInclude = {
        model: db.measurement_book,
        as: 'measurement_book',
        attributes: ['id', 'mb_number', 'title', 'vendor_id'],
        required: true,
      };

      if (vendor_id) {
        mbInclude.where = { vendor_id };
      }

      const items = await db.measurement_book_item.findAll({
        where,
        include: [
          mbInclude,
          {
            model: db.boq_item,
            as: 'boq_item',
            attributes: ['id', 'item_code', 'description', 'unit', 'unit_rate'],
          },
        ],
        order: [['createdAt', 'ASC']],
      });

      return res.status(200).json({
        status: true,
        data: items,
      });
    } catch (error) {
      console.error('getCertifiedUnbilledItems error:', error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }
}

module.exports = new MeasurementBillingController();
