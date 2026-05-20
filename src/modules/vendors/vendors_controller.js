const { Op } = require('sequelize');
const db = require('../../models');

const VendorModel = db.vendors;
const ActivityModel = db.vendors_activity;

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
    return res.status(500).json({ success: false, message: err.message });
  }
};


const getStats = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const [totalActive, totalVendors, compliantCount, totalBudget] = await Promise.all([
      VendorModel.count({ where: { company_id, status: 'active' } }),
      VendorModel.count({ where: { company_id } }),
      VendorModel.count({ where: { company_id, compliance_score: { [Op.gte]: 90 } } }),
      VendorModel.sum('budget_allocation', { where: { company_id, status: 'active' } }),
    ]);

    const formatCurrency = (num) => {
      if (!num) return '₹0';
      if (num >= 10_000_000) return `₹${(num / 10_000_000).toFixed(1)}Cr`;
      if (num >= 100_000) return `₹${(num / 100_000).toFixed(1)}L`;
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
    return res.status(500).json({ success: false, message: err.message });
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
    return res.status(500).json({ success: false, message: err.message });
  }
};


const createVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    if (!company_id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: company_id not found',
      });
    }

    const {
      vendorLegalName, spocName, spocPhone,
      officialEmail, officialPhone,
      gstNo, panCardNo,
      physicalAddress, pincode,
      budgetAllocation, services,
    } = req.body;


    const alwaysRequired = {
      vendorLegalName, spocName, spocPhone,
      officialEmail, officialPhone,
      physicalAddress, pincode,
      budgetAllocation, services,
    };

    const missingFields = Object.keys(alwaysRequired).filter(k => !alwaysRequired[k]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Required fields missing: ${missingFields.join(', ')}`,
      });
    }

    const hasGst = !!(gstNo && gstNo.trim());
    const hasPan = !!(panCardNo && panCardNo.trim());

    if (!hasGst && !hasPan) {
      return res.status(400).json({
        success: false,
        message: 'At least one of GST No. or PAN Card No. is required.',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officialEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    if (hasGst) {
      if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNo.toUpperCase())) {
        return res.status(400).json({ success: false, message: 'Invalid GST format. Expected: 22AAAAA0000A1Z5' });
      }
    }

    if (hasPan) {
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCardNo.toUpperCase())) {
        return res.status(400).json({ success: false, message: 'Invalid PAN format. Expected: ABCDE1234F' });
      }
    }

    const servicesArray =
      typeof services === 'string'
        ? services.split(',').map(s => s.trim()).filter(Boolean)
        : services;

    const budgetNum =
      parseFloat(String(budgetAllocation).replace(/[^0-9.]/g, '')) || 0;

    let contractFiles = null;
    if (req.files && req.files.length > 0) {
      contractFiles = req.files.map(f => `/uploads/contracts/${f.filename}`);
    } else if (req.file) {
      contractFiles = [`/uploads/contracts/${req.file.filename}`];
    }

    const newVendor = await VendorModel.create({
      company_id,
      name: vendorLegalName,
      spoc_name: spocName,
      spoc_phone: spocPhone,
      official_email: officialEmail,
      official_phone: officialPhone,
      gst_no: hasGst ? gstNo.toUpperCase() : null,
      pan_card_no: hasPan ? panCardNo.toUpperCase() : null,
      physical_address: physicalAddress,
      pincode,
      budget_allocation: budgetNum,
      services: servicesArray,
      contract_file: contractFiles ? JSON.stringify(contractFiles) : null,
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
    console.error('[createVendor]', err);

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'GST number, PAN card or email already registered',
      });
    }

    return res.status(500).json({ success: false, message: err.message });
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
        .split(',').map(s => s.trim()).filter(Boolean);
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
    return res.status(500).json({ success: false, message: err.message });
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
    return res.status(500).json({ success: false, message: err.message });
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

    const result = activities.map(activity => {
      const data = activity.toJSON();
      const diffMs = now - new Date(activity.createdAt).getTime();
      const diffMins = Math.floor(diffMs / 60_000);
      const diffHrs = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHrs / 24);

      let time;
      if (diffMins < 2) time = 'JUST NOW';
      else if (diffMins < 60) time = `${diffMins} MINS AGO`;
      else if (diffHrs < 24) time = `${diffHrs} HOUR${diffHrs > 1 ? 'S' : ''} AGO`;
      else if (diffDays === 1) time = 'YESTERDAY';
      else if (diffDays < 7) time = `${diffDays} DAYS AGO`;
      else {
        time = new Date(activity.createdAt)
          .toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
          .toUpperCase();
      }

      return { ...data, time };
    });

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    console.error('[getActivities]', err);
    return res.status(500).json({ success: false, message: err.message });
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
    return res.status(500).json({ success: false, message: err.message });
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