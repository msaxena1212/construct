const { Op } = require('sequelize');
const db = require('../../models');

const HistoryModel = db.vendors_history;
const VendorModel = db.vendors;

const getCompanyId = (req) => req.user?.company_id || req.user?.companyId || null;

const getVendorHistory = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;
    const { entity_type, action, from, to, limit: rawLimit = 50, offset: rawOffset = 0 } = req.query;

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const where = { vendor_id: vendorId, company_id };
    if (entity_type) where.entity_type = entity_type;
    if (action) where.action = action;
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt[Op.gte] = new Date(from);
      if (to) where.createdAt[Op.lte] = new Date(to + 'T23:59:59.999Z');
    }

    const limit = Math.min(parseInt(rawLimit) || 50, 200);
    const offset = Math.max(parseInt(rawOffset) || 0, 0);

    const { count, rows } = await HistoryModel.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return res.status(200).json({
      success: true,
      total: count,
      limit,
      offset,
      data: rows,
    });
  } catch (err) {
    console.error('[getVendorHistory]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getVendorHistorySummary = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const rows = await HistoryModel.findAll({
      where: { vendor_id: vendorId, company_id },
      attributes: [
        'entity_type',
        'action',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
      ],
      group: ['entity_type', 'action'],
      raw: true,
    });

    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('[getVendorHistorySummary]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getVendorHistory, getVendorHistorySummary };