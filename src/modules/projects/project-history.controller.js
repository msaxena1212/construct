const { Op } = require('sequelize');
const db = require('../../models');

const HistoryModel = db.project_history;
const ProjectModel = db.project;

const getCompanyId = (req) => req.user?.company_id || req.user?.companyId || null;

const getProjectHistory = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { projectId } = req.params;
    const { action_type, from, to, limit: rawLimit = 50, offset: rawOffset = 0 } = req.query;

    const project = await ProjectModel.findOne({ where: { id: projectId, company_id } });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found or unauthorized.' });
    }

    const where = { project_id: projectId };
    if (action_type) where.action_type = action_type;
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt[Op.gte] = new Date(from);
      if (to) where.createdAt[Op.lte] = new Date(to + 'T23:59:59.999Z');
    }

    const limit = Math.min(parseInt(rawLimit) || 50, 200);
    const offset = Math.max(parseInt(rawOffset) || 0, 0);

    const { count, rows } = await HistoryModel.findAndCountAll({
      where,
      include: [
        { model: db.user, as: 'user', attributes: ['id', 'firstname', 'lastname', 'avatar'] }
      ],
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
    console.error('[getProjectHistory]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProjectHistorySummary = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { projectId } = req.params;

    const project = await ProjectModel.findOne({ where: { id: projectId, company_id } });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found or unauthorized.' });
    }

    const rows = await HistoryModel.findAll({
      where: { project_id: projectId },
      attributes: [
        'action_type',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
      ],
      group: ['action_type'],
      raw: true,
    });

    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('[getProjectHistorySummary]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProjectHistory, getProjectHistorySummary };