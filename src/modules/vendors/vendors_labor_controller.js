const db = require('../../models');

const LaborModel = db.vendors_labor;
const VendorModel = db.vendors;
const SkillModel = db.skill;

const getCompanyId = (req) =>
  req.user?.company_id || req.user?.companyId || null;

const laborInclude = [
  {
    model: VendorModel,
    as: 'vendor',
    attributes: ['id', 'name'],
  },
];

const STATUS_COLOR = {
  active: 'bg-blue-100 text-blue-700',
  on_site: 'bg-green-100 text-green-700',
  off_duty: 'bg-amber-100 text-amber-700',
  inactive: 'bg-slate-100 text-slate-500',
};

const getSkillLabels = async (company_id) => {
  const skills = await SkillModel.findAll({
    where: { company_id },
    attributes: ['skill_name'],
  });

  const map = {};
  skills.forEach((s) => {
    const key = s.skill_name?.toLowerCase().replace(/\s+/g, '_');
    map[key] = s.skill_name;
  });

  return map;
};

const getLaborByVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const vendor_id = req.params.vendorId;

    const vendor = await VendorModel.findOne({
      where: { id: vendor_id, company_id },
    });

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    const workers = await LaborModel.findAll({
      where: { vendor_id, company_id },
      order: [['createdAt', 'DESC']],
    });

    const SKILL_LABEL = await getSkillLabels(company_id);

    const total = workers.reduce((sum, w) => sum + (w.labor_count || 0), 0);

    const onSite = workers
      .filter((w) => w.status === 'on_site')
      .reduce((sum, w) => sum + (w.labor_count || 0), 0);

    const active = workers
      .filter((w) => ['active', 'on_site'].includes(w.status))
      .reduce((sum, w) => sum + (w.labor_count || 0), 0);

    const remaining = total - onSite;

    const skillMap = {};
    workers.forEach((w) => {
      skillMap[w.skill] = (skillMap[w.skill] || 0) + (w.labor_count || 0);
    });

    const skillComposition = Object.entries(skillMap).map(([skill, count]) => ({
      skill: SKILL_LABEL[skill] || skill,
      count,
    }));

    const complianceScore =
      total > 0 ? Math.round((active / total) * 100) : 0;

    const data = workers.map((w) => ({
      id: w.id,
      skill: SKILL_LABEL[w.skill] || w.skill,
      skillRaw: w.skill,
      status: w.status,
      statusLabel: w.status.replace(/_/g, ' ').toUpperCase(),
      statusColor: STATUS_COLOR[w.status] || '',
      daily_rate: w.daily_rate,
      labor_count: w.labor_count,   // ← always expose labor_count
      vendor_id: w.vendor_id,
      company_id: w.company_id,
    }));

    return res.status(200).json({
      success: true,
      count: total,
      stats: {
        totalPersonnel: total,
        onSite,
        remaining,
        activePersonnel: active,
        skillCompliance: `${complianceScore}%`,
        skillComposition,
      },
      data,
    });
  } catch (err) {
    console.error('[getLaborByVendor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllLabor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendor_id, status, skill } = req.query;

    const where = { company_id };
    if (vendor_id) where.vendor_id = vendor_id;
    if (status) where.status = status;
    if (skill) where.skill = skill;

    const workers = await LaborModel.findAll({
      where,
      include: laborInclude,
      order: [['createdAt', 'DESC']],
    });

    const SKILL_LABEL = await getSkillLabels(company_id);

    const data = workers.map((w) => ({
      id: w.id,
      skill: SKILL_LABEL[w.skill] || w.skill,
      skillRaw: w.skill,
      status: w.status,
      statusLabel: w.status.replace(/_/g, ' ').toUpperCase(),
      statusColor: STATUS_COLOR[w.status] || '',
      daily_rate: w.daily_rate,
      labor_count: w.labor_count,
      vendor_id: w.vendor_id,
      company_id: w.company_id,
      vendor: w.vendor,
    }));

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    console.error('[getAllLabor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getLaborById = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const worker = await LaborModel.findOne({
      where: { id: req.params.id, company_id },
      include: laborInclude,
    });

    if (!worker) {
      return res.status(404).json({ success: false, message: 'Labor record not found' });
    }

    const SKILL_LABEL = await getSkillLabels(company_id);

    return res.status(200).json({
      success: true,
      data: {
        id: worker.id,
        skill: SKILL_LABEL[worker.skill] || worker.skill,
        skillRaw: worker.skill,
        status: worker.status,
        statusLabel: worker.status.replace(/_/g, ' ').toUpperCase(),
        statusColor: STATUS_COLOR[worker.status] || '',
        daily_rate: worker.daily_rate,
        labor_count: worker.labor_count,
        vendor_id: worker.vendor_id,
        company_id: worker.company_id,
        vendor: worker.vendor,
      },
    });
  } catch (err) {
    console.error('[getLaborById]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createLabor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    if (!company_id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { vendor_id, skill, status, daily_rate, labor_count } = req.body;

    if (!vendor_id || !skill) {
      return res.status(400).json({
        success: false,
        message: 'vendor_id and skill are required',
      });
    }

    const parsedCount = parseInt(labor_count) || 0;
    if (parsedCount < 1) {
      return res.status(400).json({
        success: false,
        message: 'labor_count must be at least 1',
      });
    }

    const vendor = await VendorModel.findOne({
      where: { id: vendor_id, company_id },
    });

    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    const SKILL_LABEL = await getSkillLabels(company_id);

    if (!SKILL_LABEL[skill]) {
      return res.status(400).json({ success: false, message: 'Invalid skill selected' });
    }

    const worker = await LaborModel.create({
      vendor_id,
      company_id,
      skill,
      status: status || 'active',
      daily_rate: parseFloat(daily_rate) || 0,
      labor_count: parsedCount,
      count: parsedCount,
    });

    return res.status(201).json({
      success: true,
      message: 'Labor worker added successfully',
      data: {
        id: worker.id,
        skill: SKILL_LABEL[worker.skill] || worker.skill,
        skillRaw: worker.skill,
        status: worker.status,
        statusLabel: worker.status.replace(/_/g, ' ').toUpperCase(),
        statusColor: STATUS_COLOR[worker.status] || '',
        daily_rate: worker.daily_rate,
        labor_count: worker.labor_count,
        vendor_id: worker.vendor_id,
        company_id: worker.company_id,
      },
    });
  } catch (err) {
    console.error('[createLabor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateLabor = async (req, res) => {
  try {
    if (req.body.labor_count !== undefined) {
      req.body.labor_count = Math.max(1, parseInt(req.body.labor_count) || 1);
      req.body.count = req.body.labor_count; // keep mirror in sync
    }

    const company_id = getCompanyId(req);

    const worker = await LaborModel.findOne({
      where: { id: req.params.id, company_id },
    });

    if (!worker) {
      return res.status(404).json({ success: false, message: 'Labor record not found' });
    }

    const SKILL_LABEL = await getSkillLabels(company_id);

    if (req.body.skill && !SKILL_LABEL[req.body.skill]) {
      return res.status(400).json({ success: false, message: 'Invalid skill selected' });
    }

    delete req.body.id;
    delete req.body.company_id;
    delete req.body.vendor_id;

    await worker.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Labor record updated',
      data: {
        id: worker.id,
        skill: SKILL_LABEL[worker.skill] || worker.skill,
        skillRaw: worker.skill,
        status: worker.status,
        statusLabel: worker.status.replace(/_/g, ' ').toUpperCase(),
        statusColor: STATUS_COLOR[worker.status] || '',
        daily_rate: worker.daily_rate,
        labor_count: worker.labor_count,
        vendor_id: worker.vendor_id,
        company_id: worker.company_id,
      },
    });
  } catch (err) {
    console.error('[updateLabor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteLabor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const worker = await LaborModel.findOne({
      where: { id: req.params.id, company_id },
    });

    if (!worker) {
      return res.status(404).json({ success: false, message: 'Labor record not found' });
    }

    await worker.destroy();

    return res.status(200).json({ success: true, message: 'Labor record deleted' });
  } catch (err) {
    console.error('[deleteLabor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllLabor,
  getLaborByVendor,
  getLaborById,
  createLabor,
  updateLabor,
  deleteLabor,
};