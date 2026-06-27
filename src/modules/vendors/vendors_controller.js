const { Op } = require('sequelize');
const db = require('../../models');
const { logVendorHistory } = require('./history_helper');

const VendorModel = db.vendors;
const ActivityModel = db.vendors_activity;
const InvoiceModel = db.vendors_invoice;

const getCompanyId = (req) =>
  req.user?.company_id || req.user?.companyId || null;

const parseProjectIds = (raw) => {
  if (raw == null) return [];
  if (Array.isArray(raw)) return raw.map((v) => parseInt(v)).filter((v) => !isNaN(v));
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((v) => parseInt(v)).filter((v) => !isNaN(v)) : [];
  } catch {
    return String(raw)
      .split(',')
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v));
  }
};


const getAllVendors = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { status } = req.query;
    const where = { company_id };
    if (status) where.status = status;
    const vendors = await VendorModel.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.status(200).json({ success: true, count: vendors.length, data: vendors });
  } catch (err) {
    console.error('[getAllVendors]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


const getStats = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const [totalActive, totalVendors, compliantCount, pendingInvoices] = await Promise.all([
      VendorModel.count({ where: { company_id, status: 'active' } }),
      VendorModel.count({ where: { company_id } }),
      VendorModel.count({ where: { company_id, compliance_score: { [Op.gte]: 90 } } }),
      InvoiceModel.findAll({
        where: { company_id, status: { [Op.in]: ['Pending', 'Partially Paid'] } },
        attributes: ['grand_total', 'paid_amount'],
      }),
    ]);
    const pendingAmount = pendingInvoices.reduce((sum, inv) => {
      return sum + Math.max(0, (parseFloat(inv.grand_total) || 0) - (parseFloat(inv.paid_amount) || 0));
    }, 0);
    return res.status(200).json({
      success: true,
      data: {
        totalActive,
        pendingPayments: pendingAmount,
        compliantPartners: totalVendors > 0
          ? `${Math.round((compliantCount / totalVendors) * 100)}%` : '0%',
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
    const vendor = await VendorModel.findOne({ where: { id: req.params.id, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
    return res.status(200).json({ success: true, data: vendor });
  } catch (err) {
    console.error('[getVendorById]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


const createVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    if (!company_id) return res.status(401).json({ success: false, message: 'Unauthorized: company_id not found' });

    const {
      vendorLegalName, spocName, spocPhone,
      officialEmail, officialPhone,
      gstNo, panCardNo,
      physicalAddress, pincode,
      budgetAllocation, skill,
      project_id, project_ids,
    } = req.body;

    const alwaysRequired = { vendorLegalName, spocName, spocPhone, officialEmail, officialPhone, physicalAddress, pincode, budgetAllocation, skill };
    const missingFields = Object.keys(alwaysRequired).filter(k => !alwaysRequired[k]);
    if (missingFields.length > 0)
      return res.status(400).json({ success: false, message: `Required fields missing: ${missingFields.join(', ')}` });

    const hasGst = !!(gstNo && gstNo.trim());
    const hasPan = !!(panCardNo && panCardNo.trim());
    if (!hasGst && !hasPan)
      return res.status(400).json({ success: false, message: 'At least one of GST No. or PAN Card No. is required.' });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officialEmail))
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    if (hasGst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNo.toUpperCase()))
      return res.status(400).json({ success: false, message: 'Invalid GST format. Expected: 22AAAAA0000A1Z5' });
    if (hasPan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCardNo.toUpperCase()))
      return res.status(400).json({ success: false, message: 'Invalid PAN format. Expected: ABCDE1234F' });

    const parsedProjectIds = parseProjectIds(project_ids).length > 0
      ? parseProjectIds(project_ids)
      : (project_id ? [parseInt(project_id)].filter((v) => !isNaN(v)) : []);

    if (parsedProjectIds.length === 0)
      return res.status(400).json({ success: false, message: 'At least one project is required.' });

    const primaryProjectId = parsedProjectIds[0];

    const skillString = Array.isArray(skill) ? skill.join(', ') : String(skill).trim();
    const budgetNum = parseFloat(String(budgetAllocation).replace(/[^0-9.]/g, '')) || 0;

    let contractFiles = null;
    if (req.files?.length > 0) contractFiles = req.files.map(f => `/uploads/contracts/${f.filename}`);
    else if (req.file) contractFiles = [`/uploads/contracts/${req.file.filename}`];

    let complianceScore = 0;
    if (hasGst) complianceScore += 25;
    if (hasPan) complianceScore += 25;
    if (contractFiles?.length > 0) complianceScore += 25;
    if (budgetNum > 0) complianceScore += 15;
    if (skillString) complianceScore += 10;

    const newVendor = await VendorModel.create({
      company_id,
      project_id: primaryProjectId,
      project_ids: parsedProjectIds,
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
      skill: skillString,
      contract_file: contractFiles ? JSON.stringify(contractFiles) : null,
      status: 'active',
      compliance_score: complianceScore,
    });

    await ActivityModel.create({
      company_id, icon: 'assign',
      title: 'New Vendor Onboarded',
      description: `${vendorLegalName} has been successfully onboarded.`,
      time_label: 'JUST NOW',
    });

    await logVendorHistory({
      req,
      vendor_id: newVendor.id,
      company_id,
      project_id: newVendor.project_id,
      entity_type: 'vendor',
      entity_id: newVendor.id,
      action: 'created',
      description: `Vendor "${vendorLegalName}" was onboarded.`,
      new_values: newVendor.toJSON(),
    });

    return res.status(201).json({ success: true, message: 'Vendor onboarded successfully', data: newVendor });
  } catch (err) {
    console.error('[createVendor]', err);
    if (err.name === 'SequelizeUniqueConstraintError')
      return res.status(409).json({ success: false, message: 'GST number, PAN card or email already registered' });
    return res.status(500).json({ success: false, message: err.message });
  }
};


const updateVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const vendor = await VendorModel.findOne({ where: { id: req.params.id, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const oldSnapshot = vendor.toJSON();

    if (req.body.skill)
      req.body.skill = Array.isArray(req.body.skill) ? req.body.skill.join(', ') : String(req.body.skill).trim();

    if (req.body.project_ids !== undefined) {
      const parsedProjectIds = parseProjectIds(req.body.project_ids);
      if (parsedProjectIds.length === 0) {
        return res.status(400).json({ success: false, message: 'At least one project is required.' });
      }
      req.body.project_ids = parsedProjectIds;
      req.body.project_id = parsedProjectIds[0];
    } else if (req.body.project_id) {
      req.body.project_ids = [parseInt(req.body.project_id)];
    }

    if (req.files?.length > 0) {
      const newFiles = req.files.map(f => `/uploads/contracts/${f.filename}`);
      let existingFiles = [];
      try {
        const parsed = JSON.parse(vendor.contract_file);
        existingFiles = Array.isArray(parsed) ? parsed : [parsed];
      } catch { existingFiles = vendor.contract_file ? [vendor.contract_file] : []; }
      req.body.contract_file = JSON.stringify([...existingFiles, ...newFiles]);
    }

    delete req.body.company_id;

    const hasGst = !!(req.body.gst_no ?? vendor.gst_no);
    const hasPan = !!(req.body.pan_card_no ?? vendor.pan_card_no);
    let contractFileRaw = req.body.contract_file ?? vendor.contract_file;
    let hasFile = false;
    if (contractFileRaw) {
      try { const p = JSON.parse(contractFileRaw); hasFile = Array.isArray(p) ? p.length > 0 : !!p; }
      catch { hasFile = !!contractFileRaw; }
    }
    const budget = parseFloat(req.body.budget_allocation ?? vendor.budget_allocation) || 0;
    const skill = (req.body.skill ?? vendor.skill ?? '').toString().trim();
    let complianceScore = 0;
    if (hasGst) complianceScore += 25;
    if (hasPan) complianceScore += 25;
    if (hasFile) complianceScore += 25;
    if (budget > 0) complianceScore += 15;
    if (skill) complianceScore += 10;
    req.body.compliance_score = complianceScore;

    await vendor.update(req.body);

    await logVendorHistory({
      req,
      vendor_id: vendor.id,
      company_id,
      project_id: vendor.project_id || null,
      entity_type: 'vendor',
      entity_id: vendor.id,
      action: 'updated',
      description: `Vendor "${vendor.name}" details were updated.`,
      old_values: oldSnapshot,
      new_values: vendor.toJSON(),
    });

    return res.status(200).json({ success: true, message: 'Vendor updated successfully', data: vendor });
  } catch (err) {
    console.error('[updateVendor]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


const deleteVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const vendor = await VendorModel.findOne({ where: { id: req.params.id, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const snapshot = vendor.toJSON();
    await vendor.destroy();

    await logVendorHistory({
      req,
      vendor_id: snapshot.id,
      company_id,
      project_id: snapshot.project_id || null,
      entity_type: 'vendor',
      entity_id: snapshot.id,
      action: 'deleted',
      description: `Vendor "${snapshot.name}" was deleted.`,
      old_values: snapshot,
    });

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
    const activities = await db.vendors_activity.findAll({
      where: { company_id }, order: [['createdAt', 'DESC']], limit,
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
      else time = new Date(activity.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
      return { ...data, time };
    });
    return res.status(200).json({ success: true, count: result.length, data: result });
  } catch (err) {
    console.error('[getActivities]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


const createActivity = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { icon, title, description, time_label } = req.body;
    if (!icon || !title || !description)
      return res.status(400).json({ success: false, message: 'icon, title, description are required' });
    const activity = await db.vendors_activity.create({ company_id, icon, title, description, time_label: time_label || 'JUST NOW' });
    return res.status(201).json({ success: true, data: activity });
  } catch (err) {
    console.error('[createActivity]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllVendors, getVendorById, createVendor, updateVendor, deleteVendor, getStats, getActivities, createActivity };