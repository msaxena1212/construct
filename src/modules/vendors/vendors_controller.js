// controllers/vendor.controller.js
const { v4: uuidv4 } = require('uuid');
const path           = require('path');
const db = require("../../models");
const VendorModel = db.vendor;
const ActivityModel = db.activity;
/* ─────────────────────────────────────────
   VENDOR CONTROLLERS
───────────────────────────────────────── */

/**
 * GET /api/vendors
 * Query param: ?status=active | pending | inactive
 */
const getAllVendors = async (req, res) => {
  try {
    const { status } = req.query;
    const vendors = await VendorModel.getAll(status || null);

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

/**
 * GET /api/vendors/:id
 */
const getVendorById = async (req, res) => {
  try {
    const vendor = await VendorModel.getById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor nahi mila',
      });
    }

    return res.status(200).json({ success: true, data: vendor });
  } catch (err) {
    console.error('[getVendorById]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * POST /api/vendors
 * Body: form fields + optional file upload (multer)
 * Angular form ke fields ke anusar:
 *   vendorLegalName, spocName, spocPhone,
 *   officialEmail, officialPhone,
 *   gstNo, panCardNo,
 *   physicalAddress, pincode,
 *   budgetAllocation, services
 */
const createVendor = async (req, res) => {
  try {
    const {
      vendorLegalName,
      spocName,
      spocPhone,
      officialEmail,
      officialPhone,
      gstNo,
      panCardNo,
      physicalAddress,
      pincode,
      budgetAllocation,
      services,
    } = req.body;

    // ── Validation ──
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
        message: `Yeh fields required hain: ${missing.join(', ')}`,
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(officialEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address chahiye',
      });
    }

    // GST format check (basic: 15 alphanumeric chars)
    if (!/^[0-9A-Z]{15}$/.test(gstNo.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'GST number format galat hai (e.g. 22AAAAA0000A1Z5)',
      });
    }

    // PAN format check (5 letters + 4 digits + 1 letter)
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCardNo.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'PAN number format galat hai (e.g. ABCDE1234F)',
      });
    }

    // ── Services string → array ──
    const servicesArray = services
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // ── Budget: string se number nikalo (₹3,000,000 → 3000000) ──
    const budgetNum = parseFloat(
      budgetAllocation.replace(/[^0-9.]/g, '')
    );

    // ── Contract file path (multer se aaya) ──
    const contractFile = req.file
      ? `/uploads/contracts/${req.file.filename}`
      : null;

    // ── Vendor create karo ──
    const newVendor = await VendorModel.create({
      id:               uuidv4(),
      name:             vendorLegalName,
      spoc_name:        spocName,
      spoc_phone:       spocPhone,
      official_email:   officialEmail,
      official_phone:   officialPhone,
      gst_no:           gstNo.toUpperCase(),
      pan_card_no:      panCardNo.toUpperCase(),
      physical_address: physicalAddress,
      pincode,
      budget_allocation: budgetNum,
      services:          servicesArray,
      contract_file:     contractFile,
      status:            'active',
      compliance_score:  95,
    });

    // ── Activity log add karo ──
    await VendorModel.createActivity({
      icon:        'assign',
      title:       'New Vendor Onboarded',
      description: `${vendorLegalName} has been successfully onboarded.`,
      time_label:  'JUST NOW',
    });

    return res.status(201).json({
      success: true,
      message: 'Vendor successfully onboard ho gaya',
      data: newVendor,
    });
  } catch (err) {
    // MySQL duplicate entry error (GST/PAN already exists)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'GST number ya PAN card pehle se registered hai',
      });
    }
    console.error('[createVendor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * PUT /api/vendors/:id
 */
const updateVendor = async (req, res) => {
  try {
    const vendor = await VendorModel.getById(req.params.id);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor nahi mila',
      });
    }

    // services string → array (agar aya)
    if (req.body.services && typeof req.body.services === 'string') {
      req.body.services = req.body.services
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const updated = await VendorModel.update(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Vendor update ho gaya',
      data: updated,
    });
  } catch (err) {
    console.error('[updateVendor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * DELETE /api/vendors/:id
 */
const deleteVendor = async (req, res) => {
  try {
    const deleted = await VendorModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Vendor nahi mila',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Vendor delete ho gaya',
    });
  } catch (err) {
    console.error('[deleteVendor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/* ─────────────────────────────────────────
   STATS CONTROLLER
───────────────────────────────────────── */

/**
 * GET /api/vendors/stats
 * Dashboard ke 3 stat cards ke liye
 */
const getStats = async (req, res) => {
  try {
    const stats = await VendorModel.getStats();
    return res.status(200).json({ success: true, data: stats });
  } catch (err) {
    console.error('[getStats]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/* ─────────────────────────────────────────
   ACTIVITY CONTROLLERS
───────────────────────────────────────── */

/**
 * GET /api/activities
 * Query param: ?limit=20
 */
const getActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const activities = await VendorModel.getAllActivities(limit);

    return res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (err) {
    console.error('[getActivities]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * POST /api/activities
 * Body: { icon, title, description, time_label }
 */
const createActivity = async (req, res) => {
  try {
    const { icon, title, description, time_label } = req.body;

    if (!icon || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'icon, title, description required hain',
      });
    }

    const activity = await VendorModel.createActivity({
      icon, title, description, time_label,
    });

    return res.status(201).json({
      success: true,
      data: activity,
    });
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