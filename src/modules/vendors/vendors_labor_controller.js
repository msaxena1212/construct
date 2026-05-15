const db = require('../../models');

const LaborModel = db.vendors_labor;
const VendorModel = db.vendors;
const RoleModel = db.role;

const getCompanyId = (req) =>
  req.user?.company_id || req.user?.companyId || null;

const SKILL_LABEL = {
  masonry: 'Masonry',
  electrical: 'Electrical',
  structural_steel: 'Structural Steel',
  plumbing: 'Plumbing',
  hvac: 'HVAC',
  carpentry: 'Carpentry',
  painting: 'Painting',
  other: 'Other',
};

const STATUS_COLOR = {
  active: 'bg-blue-100 text-blue-700',
  on_site: 'bg-green-100 text-green-700',
  off_duty: 'bg-amber-100 text-amber-700',
  inactive: 'bg-slate-100 text-slate-500',
};


const laborInclude = [
  {
    model: RoleModel,
    as: 'role',
    attributes: ['id', 'name'],
  },
];


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
      include: laborInclude,
      order: [['createdAt', 'DESC']],
    });

    const total = workers.length;
    const onSite = workers.filter(w => w.status === 'on_site').length;
    const active = workers.filter(w => ['active', 'on_site'].includes(w.status)).length;

    const skillMap = {};
    workers.forEach(w => {
      skillMap[w.skill] = (skillMap[w.skill] || 0) + 1;
    });

    const skillComposition = Object.entries(skillMap).map(([skill, count]) => ({
      skill: SKILL_LABEL[skill] || skill,
      count,
    }));

    const complianceScore = total > 0 ? Math.round((active / total) * 100) : 0;

    const data = workers.map(w => ({
      id: w.id,
      name: w.name,
      role_id: w.role_id,
      role: w.role?.name || null,
      roleRaw: w.role?.name || null,
      skill: SKILL_LABEL[w.skill] || w.skill,
      skillRaw: w.skill,
      status: w.status,
      statusLabel: w.status.replace('_', ' ').toUpperCase(),
      statusColor: STATUS_COLOR[w.status] || '',
      phone: w.phone,
      daily_rate: w.daily_rate,
      joining_date: w.joining_date,
      current_task: w.current_task,
      vendor_id: w.vendor_id,
      company_id: w.company_id,
    }));

    return res.status(200).json({
      success: true,
      count: total,
      stats: {
        totalPersonnel: total,
        onSite,
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
    const { vendor_id, status, skill, role_id } = req.query;

    const where = { company_id };
    if (vendor_id) where.vendor_id = vendor_id;
    if (status) where.status = status;
    if (skill) where.skill = skill;
    if (role_id) where.role_id = role_id;

    const workers = await LaborModel.findAll({
      where,
      include: [
        { model: VendorModel, as: 'vendor', attributes: ['id', 'name'] },
        { model: RoleModel, as: 'role', attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ success: true, count: workers.length, data: workers });
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
      include: [
        { model: VendorModel, as: 'vendor', attributes: ['id', 'name'] },
        { model: RoleModel, as: 'role', attributes: ['id', 'name'] },
      ],
    });

    if (!worker) {
      return res.status(404).json({ success: false, message: 'Labor record not found' });
    }

    return res.status(200).json({ success: true, data: worker });
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

    const {
      vendor_id, role_id, name, skill,
      status, phone, daily_rate, joining_date, current_task,
    } = req.body;

    if (!vendor_id || !role_id || !name || !skill) {
      return res.status(400).json({
        success: false,
        message: 'vendor_id, role_id, name and skill are required',
      });
    }

    const vendor = await VendorModel.findOne({ where: { id: vendor_id, company_id } });
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    const role = await RoleModel.findOne({ where: { id: role_id } });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    const worker = await LaborModel.create({
      vendor_id,
      company_id,
      role_id,
      name,
      skill,
      status: status || 'active',
      phone: phone || null,
      daily_rate: parseFloat(daily_rate) || 0,
      joining_date: joining_date || null,
      current_task: current_task || null,
    });

    const created = await LaborModel.findOne({
      where: { id: worker.id },
      include: laborInclude,
    });

    const data = {
      id: created.id,
      name: created.name,
      role_id: created.role_id,
      role: created.role?.name || null,
      roleRaw: created.role?.name || null,
      skill: SKILL_LABEL[created.skill] || created.skill,
      skillRaw: created.skill,
      status: created.status,
      statusLabel: created.status.replace('_', ' ').toUpperCase(),
      statusColor: STATUS_COLOR[created.status] || '',
      phone: created.phone,
      daily_rate: created.daily_rate,
      joining_date: created.joining_date,
      current_task: created.current_task,
      vendor_id: created.vendor_id,
      company_id: created.company_id,
    };

    return res.status(201).json({
      success: true,
      message: 'Labor worker added successfully',
      data,
    });
  } catch (err) {
    console.error('[createLabor]', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


const updateLabor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const worker = await LaborModel.findOne({
      where: { id: req.params.id, company_id },
    });

    if (!worker) {
      return res.status(404).json({ success: false, message: 'Labor record not found' });
    }

    delete req.body.id;
    delete req.body.company_id;
    delete req.body.vendor_id;

    if (req.body.role_id) {
      const role = await RoleModel.findOne({ where: { id: req.body.role_id } });
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found' });
      }
    }

    await worker.update(req.body);

    const updated = await LaborModel.findOne({
      where: { id: worker.id },
      include: laborInclude,
    });

    const data = {
      id: updated.id,
      name: updated.name,
      role_id: updated.role_id,
      role: updated.role?.name || null,
      roleRaw: updated.role?.name || null,
      skill: SKILL_LABEL[updated.skill] || updated.skill,
      skillRaw: updated.skill,
      status: updated.status,
      statusLabel: updated.status.replace('_', ' ').toUpperCase(),
      statusColor: STATUS_COLOR[updated.status] || '',
      phone: updated.phone,
      daily_rate: updated.daily_rate,
      joining_date: updated.joining_date,
      current_task: updated.current_task,
      vendor_id: updated.vendor_id,
      company_id: updated.company_id,
    };

    return res.status(200).json({ success: true, message: 'Labor record updated', data });
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