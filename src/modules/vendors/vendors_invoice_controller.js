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
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

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
    const { invoice_number, invoice_date, items, subtotal, tax_rate, tax_amount, grand_total } = req.body;

    if (!invoice_number || !invoice_date) {
      return res.status(400).json({ success: false, message: 'invoice_number and invoice_date are required' });
    }

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const invoice = await InvoiceModel.create({
      vendor_id: vendorId,
      company_id,
      invoice_number,
      invoice_date,
      items: items || [],
      subtotal: parseFloat(subtotal) || 0,
      tax_rate: parseInt(tax_rate) || 18,
      tax_amount: parseFloat(tax_amount) || 0,
      grand_total: parseFloat(grand_total) || 0,
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
    const { status } = req.body;

    const invoice = await InvoiceModel.findOne({ where: { id: req.params.id, company_id } });
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

    await invoice.update({ status });
    return res.status(200).json({ success: true, message: 'Invoice updated', data: invoice });
  } catch (err) {
    console.error('[updateInvoiceStatus]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const invoice = await InvoiceModel.findOne({ where: { id: req.params.id, company_id } });
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

    await invoice.destroy();
    return res.status(200).json({ success: true, message: 'Invoice deleted' });
  } catch (err) {
    console.error('[deleteInvoice]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getInvoicesByVendor, createInvoice, updateInvoiceStatus, deleteInvoice };