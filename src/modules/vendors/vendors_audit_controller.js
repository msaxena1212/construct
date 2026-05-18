const db = require('../../models');

const AuditModel = db.vendors_audit;
const VendorModel = db.vendors;

const getCompanyId = (req) =>
  req.user?.company_id || req.user?.companyId || null;

const getAuditsByVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const audits = await AuditModel.findAll({
      where: { vendor_id: vendorId, company_id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ success: true, count: audits.length, data: audits });
  } catch (err) {
    console.error('[getAuditsByVendor]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createAudit = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;
    const { quality, timeliness, safety, observations } = req.body;

    if (quality == null || timeliness == null || safety == null) {
      return res.status(400).json({ success: false, message: 'quality, timeliness and safety are required' });
    }

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const q = parseInt(quality);
    const t = parseInt(timeliness);
    const s = parseInt(safety);
    const composite_score = parseFloat((((q + t + s) / 30) * 100).toFixed(2));

    const audit = await AuditModel.create({
      vendor_id: vendorId,
      company_id,
      quality: q,
      timeliness: t,
      safety: s,
      composite_score,
      observations: observations || null,
      audit_date: new Date().toISOString().split('T')[0],
    });
    await vendor.update({ compliance_score: Math.round(composite_score) });

    return res.status(201).json({ success: true, message: 'Audit submitted', data: audit });
  } catch (err) {
    console.error('[createAudit]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAuditsByVendor, createAudit };