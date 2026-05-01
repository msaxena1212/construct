const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const db = require('../../models');

const VendorModel = db.vendor;
const ActivityModel = db.activity;

const getCompanyId = (req) =>
  req.user?.company_id || req.user?.companyId || null;

const getAllVendors = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { status } = req.query;

    const where = { company_id };
    if (status) where.status = status;

    const vendors = await VendorModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      count: vendors.length,
      data: vendors,
    });
  } catch (err) {
    console.error('[getAllVendors]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getStats = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const totalActive = await VendorModel.count({
      where: { company_id, status: 'active' },
    });

    const totalVendors = await VendorModel.count({ where: { company_id } });

    const compliantCount = await VendorModel.count({
      where: { company_id, compliance_score: { [Op.gte]: 90 } },
    });

    const totalBudget = await VendorModel.sum('budget_allocation', {
      where: { company_id, status: 'active' },
    });

    const formatCurrency = (num) => {
      if (!num) return '₹0';
      if (num >= 1_00_00_000) return `₹${(num / 1_00_00_000).toFixed(1)}Cr`;
      if (num >= 1_00_000) return `₹${(num / 1_00_000).toFixed(1)}L`;
      if (num >= 1_000) return `₹${(num / 1_000).toFixed(1)}k`;
      return `₹${num}`;
    };

    return res.status(200).json({
      success: true,
      data: {
        totalActive,
        pendingPayments: formatCurrency(totalBudget),
        compliantPartners:
          totalVendors > 0
            ? `${Math.round((compliantCount / totalVendors) * 100)}%`
            : '0%',
      },
    });
  } catch (err) {
    console.error('[getStats]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getVendorById = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const vendor = await VendorModel.findOne({
      where: { id: req.params.id, company_id },
    });

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    return res.status(200).json({ success: true, data: vendor });
  } catch (err) {
    console.error('[getVendorById]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    if (!company_id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: company_id not found in token',
      });
    }

    const {
      vendorLegalName, spocName, spocPhone,
      officialEmail, officialPhone,
      gstNo, panCardNo,
      physicalAddress, pincode,
      budgetAllocation, services,
    } = req.body;

    const required = {
      vendorLegalName, spocName, spocPhone,
      officialEmail, officialPhone,
      gstNo, panCardNo,
      physicalAddress, pincode,
      budgetAllocation, services,
    };
    const missing = Object.keys(required).filter((k) => !required[k]);
    if (missing.length) {
      return res.status(400).json({
        success: false,
        message: `Required fields missing: ${missing.join(', ')}`,
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officialEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    if (!/^[0-9A-Z]{15}$/.test(gstNo.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid GST format (e.g. 22AAAAA0000A1Z5)',
      });
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCardNo.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid PAN format (e.g. ABCDE1234F)',
      });
    }

    const servicesArray = services
      .split(',').map((s) => s.trim()).filter(Boolean);

    const budgetNum = parseFloat(budgetAllocation.replace(/[^0-9.]/g, '')) || 0;

    const contractFile = req.file
      ? `/uploads/contracts/${req.file.filename}`
      : null;

    const newVendor = await VendorModel.create({
      id: uuidv4(),
      company_id,
      name: vendorLegalName,
      spoc_name: spocName,
      spoc_phone: spocPhone,
      official_email: officialEmail,
      official_phone: officialPhone,
      gst_no: gstNo.toUpperCase(),
      pan_card_no: panCardNo.toUpperCase(),
      physical_address: physicalAddress,
      pincode,
      budget_allocation: budgetNum,
      services: servicesArray,
      contract_file: contractFile,
      status: 'active',
      compliance_score: 95,
    });

    await ActivityModel.create({
      company_id,
      icon: 'assign',
      title: 'New Vendor Onboarded',
      description: `${vendorLegalName} has been successfully onboarded.`,
      time_label: 'JUST NOW',
    });

    return res.status(201).json({
      success: true,
      message: 'Vendor onboarded successfully',
      data: newVendor,
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'GST number, PAN card or email already registered',
      });
    }
    console.error('[createVendor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const vendor = await VendorModel.findOne({
      where: { id: req.params.id, company_id },
    });
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    if (req.body.services && typeof req.body.services === 'string') {
      req.body.services = req.body.services
        .split(',').map((s) => s.trim()).filter(Boolean);
    }

    delete req.body.company_id;

    await vendor.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Vendor updated successfully',
      data: vendor,
    });
  } catch (err) {
    console.error('[updateVendor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const vendor = await VendorModel.findOne({
      where: { id: req.params.id, company_id },
    });
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    await vendor.destroy();

    return res.status(200).json({ success: true, message: 'Vendor deleted successfully' });
  } catch (err) {
    console.error('[deleteVendor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getActivities = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);

    const activities = await ActivityModel.findAll({
      where: { company_id },
      order: [['createdAt', 'DESC']],
      limit,
    });

    const now = Date.now();
    const result = activities.map((a) => {
      const data = a.toJSON();
      const diffMs = now - new Date(a.createdAt).getTime();
      const diffMins = Math.floor(diffMs / 60_000);
      const diffHrs = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHrs / 24);

      let time = data.time_label;
      if (diffMins < 2) time = 'JUST NOW';
      else if (diffMins < 60) time = `${diffMins} MINS AGO`;
      else if (diffHrs < 24) time = `${diffHrs} HOUR${diffHrs > 1 ? 'S' : ''} AGO`;
      else if (diffDays === 1) time = 'YESTERDAY';
      else if (diffDays < 7) time = `${diffDays} DAYS AGO`;

      return { ...data, time };
    });

    return res.status(200).json({ success: true, count: result.length, data: result });
  } catch (err) {
    console.error('[getActivities]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


const createActivity = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { icon, title, description, time_label } = req.body;

    if (!icon || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'icon, title, description are required',
      });
    }

    const activity = await ActivityModel.create({
      company_id,
      icon,
      title,
      description,
      time_label: time_label || 'JUST NOW',
    });

    return res.status(201).json({ success: true, data: activity });
  } catch (err) {
    console.error('[createActivity]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getStats,
  getActivities,
  createActivity,
};