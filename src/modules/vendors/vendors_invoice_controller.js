const db = require('../../models');
const { logVendorHistory } = require('./history_helper');
const { assertProjectAccess, handleAccessError } = require('../../core/utils/access');

const InvoiceModel = db.vendors_invoice;
const VendorModel = db.vendors;

const getCompanyId = (req) => req.user?.company_id || req.user?.companyId || null;

const toSafeDecimal = (val, fieldName = 'Amount', max = 1000000000) => {
  const num = Number(val);
  if (isNaN(num) || !isFinite(num) || num < 0 || num > max) {
    throw new Error(`Invalid ${fieldName}: must be a non-negative finite number up to ${max}`);
  }
  return Number(num.toFixed(2));
};

const getBudgetInfo = async (vendor, company_id, extraAmount = 0) => {
  const allocated = parseFloat(vendor.budget_allocation) || 0;

  const invoices = await InvoiceModel.findAll({
    where: { vendor_id: vendor.id, company_id },
    attributes: ['grand_total', 'status'],
  });

  const totalInvoiced = invoices
    .filter((inv) => inv.status !== 'Cancelled')
    .reduce((sum, inv) => sum + (parseFloat(inv.grand_total) || 0), 0);

  const projectedTotal = Number((totalInvoiced + (parseFloat(extraAmount) || 0)).toFixed(2));
  const exceeded = allocated > 0 && projectedTotal > allocated;

  return {
    allocated,
    totalInvoiced: projectedTotal,
    exceeded,
    exceededBy: exceeded ? parseFloat((projectedTotal - allocated).toFixed(2)) : 0,
  };
};

const getInvoicesByVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;
    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    if (vendor.project_id) {
      await assertProjectAccess(req, vendor.project_id);
    }

    const invoices = await InvoiceModel.findAll({
      where: { vendor_id: vendorId, company_id },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ success: true, count: invoices.length, data: invoices });
  } catch (err) {
    if (handleAccessError(err, res)) return;
    console.error('[getInvoicesByVendor]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createInvoice = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;
    const {
      project_id,
      invoice_number,
      invoice_date,
      items,
      subtotal,
      tax_rate,
      tax_amount,
      grand_total,
      settlement_type,
      settlement_completion,
      milestone_ids,
      sub_milestone_ids,
      task_ids,
    } = req.body;

    if (!invoice_number || !invoice_date) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'invoice_number and invoice_date are required' });
    }

    const trimmedInvoiceNumber = String(invoice_number).trim();
    if (!trimmedInvoiceNumber) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Valid invoice_number is required' });
    }

    const vendor = await VendorModel.findOne({
      where: { id: vendorId, company_id },
      transaction: t,
    });
    if (!vendor) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    const targetProjectId = project_id || vendor.project_id || null;
    if (targetProjectId) {
      await assertProjectAccess(req, targetProjectId);
    }

    // Check duplicate invoice_number for this vendor within company
    const existing = await InvoiceModel.findOne({
      where: {
        vendor_id: vendorId,
        company_id,
        invoice_number: trimmedInvoiceNumber,
      },
      transaction: t,
    });
    if (existing) {
      await t.rollback();
      return res.status(409).json({
        success: false,
        message: `Invoice #${trimmedInvoiceNumber} already exists for this vendor.`,
      });
    }

    // Server-side financial calculations & validation
    let safeSubtotal = 0;
    const validatedItems = [];

    if (Array.isArray(items) && items.length > 0) {
      for (const it of items) {
        const qty = toSafeDecimal(it.quantity || 1, 'Item quantity', 1000000);
        const rate = toSafeDecimal(it.unit_price || it.rate || 0, 'Item rate');
        const lineTotal = Number((qty * rate).toFixed(2));
        safeSubtotal += lineTotal;
        validatedItems.push({
          description: String(it.description || '').slice(0, 255),
          ...(it.item_code && { item_code: String(it.item_code).slice(0, 100) }),
          ...(it.material_id && { material_id: Number(it.material_id) }),
          ...((it.purchase_order_id || req.body.purchase_order_id) && {
            purchase_order_id: Number(it.purchase_order_id || req.body.purchase_order_id),
          }),
          quantity: qty,
          unit_price: rate,
          total: lineTotal,
        });
      }
      safeSubtotal = Number(safeSubtotal.toFixed(2));
    } else {
      safeSubtotal = toSafeDecimal(subtotal || grand_total || 0, 'Subtotal');
    }

    const safeTaxRate = toSafeDecimal(tax_rate || 0, 'Tax rate', 100);
    const calculatedTax = Number(((safeSubtotal * safeTaxRate) / 100).toFixed(2));
    const safeTaxAmount = tax_amount !== undefined ? toSafeDecimal(tax_amount, 'Tax amount') : calculatedTax;
    const calculatedGrandTotal = Number((safeSubtotal + safeTaxAmount).toFixed(2));

    const invoice = await InvoiceModel.create({
      vendor_id: Number(vendorId),
      company_id,
      project_id: targetProjectId,
      invoice_number: trimmedInvoiceNumber,
      invoice_date,
      items: validatedItems.length > 0 ? validatedItems : (items || []),
      subtotal: safeSubtotal,
      tax_rate: safeTaxRate,
      tax_amount: safeTaxAmount,
      grand_total: calculatedGrandTotal,
      paid_amount: 0,
      payment_history: [],
      status: 'Pending',
      settlement_type: settlement_type || null,
      settlement_completion: settlement_completion != null ? parseFloat(settlement_completion) : null,
      milestone_ids: Array.isArray(milestone_ids) ? milestone_ids : [],
      sub_milestone_ids: Array.isArray(sub_milestone_ids) ? sub_milestone_ids : [],
      task_ids: Array.isArray(task_ids) ? task_ids : [],
    }, { transaction: t });

    await logVendorHistory({
      req,
      vendor_id: parseInt(vendorId),
      company_id,
      project_id: targetProjectId,
      entity_type: 'invoice',
      entity_id: invoice.id,
      action: 'created',
      description: `Invoice #${trimmedInvoiceNumber} (₹${calculatedGrandTotal}) was created.`,
      new_values: invoice.toJSON(),
      meta: { invoice_number: trimmedInvoiceNumber, grand_total: calculatedGrandTotal },
    });

    await t.commit();

    const budget = await getBudgetInfo(vendor, company_id, calculatedGrandTotal);
    return res.status(201).json({ success: true, message: 'Invoice created', data: invoice, budget });
  } catch (err) {
    await t.rollback().catch(() => {});
    if (handleAccessError(err, res)) return;
    console.error('[createInvoice]', err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ success: false, message: 'Duplicate invoice number for this vendor.' });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
};

const updateInvoiceStatus = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const company_id = getCompanyId(req);
    const {
      status, amount, mode, reference, clearance_date,
      settlement_type, settlement_completion,
      milestone_ids, sub_milestone_ids, task_ids,
      budget_exceeded,
    } = req.body;

    const invoice = await InvoiceModel.findOne({
      where: { id: req.params.id, company_id },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!invoice) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    if (invoice.project_id) {
      await assertProjectAccess(req, invoice.project_id);
    }

    if (status === 'Cancelled' && invoice.status === 'Partially Paid') {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Partially paid invoice cannot be cancelled. Please refund the payment first.',
      });
    }

    if (status === 'Cancelled' && invoice.status === 'Paid') {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Paid invoice cannot be cancelled.',
      });
    }

    const vendor = await VendorModel.findOne({
      where: { id: invoice.vendor_id, company_id },
      transaction: t,
    });

    const oldSnapshot = invoice.toJSON();
    const updatePayload = {};

    let action = 'status_changed';
    let description = `Invoice #${invoice.invoice_number} status changed to "${status}".`;
    let meta = { invoice_number: invoice.invoice_number, old_status: oldSnapshot.status, new_status: status };
    let budget = null;

    if (status === 'Paid' || status === 'Partially Paid') {
      const paidNow = toSafeDecimal(amount, 'Payment amount');
      if (paidNow <= 0) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Payment amount must be greater than zero.' });
      }
      if (!mode) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Payment mode is required' });
      }
      if (mode === 'Cheque' && !clearance_date) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Cheque clearance date is required' });
      }

      const grandTotal = parseFloat(invoice.grand_total);
      const previouslyPaid = parseFloat(invoice.paid_amount) || 0;
      const totalPaidSoFar = Number((previouslyPaid + paidNow).toFixed(2));

      if (totalPaidSoFar > grandTotal) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `Payment amount exceeds invoice total. Maximum payable: ₹${(grandTotal - previouslyPaid).toFixed(2)}`,
        });
      }

      if (vendor && !budget_exceeded) {
        budget = await getBudgetInfo(vendor, company_id, paidNow);
        if (budget.exceeded) {
          await t.rollback();
          return res.status(400).json({
            success: false,
            message: 'Budget exceeded. Please raise a payment request instead.',
            budget,
          });
        }
      }

      updatePayload.status = totalPaidSoFar >= grandTotal ? 'Paid' : 'Partially Paid';
      updatePayload.paid_amount = totalPaidSoFar;
      updatePayload.payment_mode = mode;
      updatePayload.payment_reference = reference || null;
      updatePayload.cheque_clearance_date = clearance_date || null;
      updatePayload.paid_at = new Date();

      const existingHistory = Array.isArray(invoice.payment_history) ? invoice.payment_history : [];
      const newEntry = {
        amount: paidNow,
        mode,
        reference: (reference && String(reference).trim() !== '') ? String(reference).trim() : null,
        clearance_date: clearance_date || null,
        paid_at: new Date().toISOString(),
        paid_by: req.user?.id || null,
        budget_exceeded: !!budget_exceeded,
      };
      updatePayload.payment_history = [...existingHistory, newEntry];

      if (settlement_type) {
        updatePayload.settlement_type = settlement_type;
        updatePayload.settlement_completion = settlement_completion != null ? parseFloat(settlement_completion) : null;
        updatePayload.milestone_ids = Array.isArray(milestone_ids) ? milestone_ids : [];
        updatePayload.sub_milestone_ids = Array.isArray(sub_milestone_ids) ? sub_milestone_ids : [];
        updatePayload.task_ids = Array.isArray(task_ids) ? task_ids : [];
      }

      action = 'payment_added';
      description = `Payment of ₹${paidNow} via ${mode} added to invoice #${invoice.invoice_number}. Total paid: ₹${totalPaidSoFar}.`;
      meta = {
        invoice_number: invoice.invoice_number,
        amount: paidNow,
        mode,
        reference: reference || null,
        new_status: updatePayload.status,
        budget_exceeded: !!budget_exceeded,
      };
    } else if (status) {
      updatePayload.status = status;
    }

    await invoice.update(updatePayload, { transaction: t });

    await logVendorHistory({
      req,
      vendor_id: invoice.vendor_id,
      company_id,
      project_id: invoice.project_id || null,
      entity_type: 'invoice',
      entity_id: invoice.id,
      action,
      description,
      old_values: oldSnapshot,
      new_values: invoice.toJSON(),
      meta,
    });

    await t.commit();

    return res.status(200).json({
      success: true,
      message: 'Invoice status updated',
      data: invoice,
      budget,
    });
  } catch (err) {
    await t.rollback().catch(() => {});
    if (handleAccessError(err, res)) return;
    console.error('[updateInvoiceStatus]', err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const invoice = await InvoiceModel.findOne({ where: { id: req.params.id, company_id } });
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

    if (invoice.project_id) {
      await assertProjectAccess(req, invoice.project_id);
    }

    if (invoice.status === 'Paid' || invoice.status === 'Partially Paid') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete an invoice that has recorded payments. Cancel or refund first.',
      });
    }

    await invoice.destroy();

    await logVendorHistory({
      req,
      vendor_id: invoice.vendor_id,
      company_id,
      project_id: invoice.project_id || null,
      entity_type: 'invoice',
      entity_id: invoice.id,
      action: 'deleted',
      description: `Invoice #${invoice.invoice_number} was deleted.`,
      meta: { invoice_number: invoice.invoice_number },
    });

    return res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
  } catch (err) {
    if (handleAccessError(err, res)) return;
    console.error('[deleteInvoice]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getInvoicesByVendor,
  createInvoice,
  updateInvoiceStatus,
  deleteInvoice,
};