const db = require('../../models');

const InvoiceModel = db.vendors_invoice;
const VendorModel = db.vendors;

const getCompanyId = (req) =>
  req.user?.company_id || req.user?.companyId || null;


const getInvoicesByVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor)
      return res.status(404).json({ success: false, message: 'Vendor not found' });

    const invoices = await InvoiceModel.findAll({
      where: { vendor_id: vendorId, company_id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ success: true, count: invoices.length, data: invoices });
  } catch (err) {
    console.error('[getInvoicesByVendor]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


const createInvoice = async (req, res) => {
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
    } = req.body;

    if (!invoice_number || !invoice_date)
      return res.status(400).json({
        success: false,
        message: 'invoice_number and invoice_date are required',
      });

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor)
      return res.status(404).json({ success: false, message: 'Vendor not found' });

    const invoice = await InvoiceModel.create({
      vendor_id: vendorId,
      company_id,
      project_id: project_id || null,
      invoice_number,
      invoice_date,
      items: items || [],
      subtotal: parseFloat(subtotal) || 0,
      tax_rate: parseFloat(tax_rate) || 0,
      tax_amount: parseFloat(tax_amount) || 0,
      grand_total: parseFloat(grand_total) || 0,
      paid_amount: 0,
      payment_history: [],
      status: 'Pending',
    });

    return res.status(201).json({ success: true, message: 'Invoice created', data: invoice });
  } catch (err) {
    console.error('[createInvoice]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


const updateInvoiceStatus = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const {
      status,
      amount,
      mode,
      reference,
      clearance_date,
      settlement_type,
      settlement_completion,
      milestone_ids,
      sub_milestone_ids,
      task_ids,
    } = req.body;

    const invoice = await InvoiceModel.findOne({
      where: { id: req.params.id, company_id },
    });
    if (!invoice)
      return res.status(404).json({ success: false, message: 'Invoice not found' });

    const updatePayload = { status };

    if (status === 'Paid' || status === 'Partially Paid') {
      if (!amount || parseFloat(amount) <= 0)
        return res.status(400).json({ success: false, message: 'Valid amount is required for payment' });
      if (!mode)
        return res.status(400).json({ success: false, message: 'Payment mode is required' });
      if (mode === 'Cheque' && !clearance_date)
        return res.status(400).json({ success: false, message: 'Cheque clearance date is required' });

      const paidNow = parseFloat(amount);
      const grandTotal = parseFloat(invoice.grand_total);

      const previouslyPaid = parseFloat(invoice.paid_amount) || 0;
      const totalPaidSoFar = previouslyPaid + paidNow;

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
        reference: reference || null,
        clearance_date: clearance_date || null,
        paid_at: new Date().toISOString(),
      };
      updatePayload.payment_history = [...existingHistory, newEntry];

      if (settlement_type) {
        updatePayload.settlement_type = settlement_type;
        updatePayload.settlement_completion =
          settlement_completion != null ? parseFloat(settlement_completion) : null;
        updatePayload.milestone_ids = Array.isArray(milestone_ids) ? milestone_ids : [];
        updatePayload.sub_milestone_ids = Array.isArray(sub_milestone_ids) ? sub_milestone_ids : [];
        updatePayload.task_ids = Array.isArray(task_ids) ? task_ids : [];
      }
    }

    await invoice.update(updatePayload);
    return res.status(200).json({ success: true, message: 'Invoice updated', data: invoice });
  } catch (err) {
    console.error('[updateInvoiceStatus]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const invoice = await InvoiceModel.findOne({
      where: { id: req.params.id, company_id },
    });
    if (!invoice)
      return res.status(404).json({ success: false, message: 'Invoice not found' });

    await invoice.destroy();
    return res.status(200).json({ success: true, message: 'Invoice deleted' });
  } catch (err) {
    console.error('[deleteInvoice]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getInvoicesByVendor, createInvoice, updateInvoiceStatus, deleteInvoice };