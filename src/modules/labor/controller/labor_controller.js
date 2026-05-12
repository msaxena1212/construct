const db = require('../../../models');
const { QueryTypes } = db.Sequelize;

const toInt = (v) => {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
};

const todayStr = () => new Date().toISOString().slice(0, 10);

const autoAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || 'V'
  )}&background=6366f1&color=fff&bold=true&size=64`;

const SKILL_COLORS = {
  Masonry: '#3b82f6',
  Electrical: '#f59e0b',
  'Structural Steel': '#ef4444',
  Plumbing: '#10b981',
  Foremen: '#6366f1',
  'Safety Officers': '#ec4899',
  Other: '#94a3b8',
};

const STATUS_CLASS = {
  'On Site': 'bg-green-100 text-green-700',
  Active: 'bg-blue-100 text-blue-700',
  'Off Site': 'bg-slate-100 text-slate-500',
  Break: 'bg-amber-100 text-amber-700',
  Overtime: 'bg-rose-100 text-rose-700',
};


exports.getDashboard = async (req, res) => {
  try {
    const companyId = toInt(req.query.company_id);
    const vendorId = req.query.vendor_id || null;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'company_id is required',
      });
    }

    const today = todayStr();

    const heatFrom = new Date();
    heatFrom.setDate(heatFrom.getDate() - 20);

    const heatFromStr = heatFrom.toISOString().slice(0, 10);

    const vendorClause = vendorId
      ? `AND l.vendor_id = :vendorId`
      : '';

    const replacements = {
      companyId,
      vendorId,
      today,
      heatFrom: heatFromStr,
    };

    const [
      contractorRows,
      kpiRow,
      skillRows,
      finRow,
      shiftWorkers,
      heatRows,
      vendorList,
    ] = await Promise.all([

      // Contractor Metrics
      db.sequelize.query(
        `
        SELECT
          l.vendor_id,
          v.name AS vendor_name,
          l.trend,
          AVG(l.efficiency) AS avg_efficiency,
          AVG(l.safety_score) AS avg_safety,
          AVG(l.retention_rate) AS avg_retention,
          AVG(l.adherence_to_schedule) AS avg_schedule,
          COUNT(l.id) AS personnel_count,
          COALESCE(SUM(l.tasks_completed), 0) AS total_done,
          COALESCE(SUM(l.tasks_total), 0) AS total_tasks
        FROM Labor l
        LEFT JOIN VENDOR v ON v.id = l.vendor_id
        WHERE l.company_id = :companyId
          AND l.is_active = 1
          ${vendorClause}
        GROUP BY l.vendor_id, l.trend, v.name
        ORDER BY avg_efficiency DESC
        `,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),

      // KPI
      db.sequelize.query(
        `
        SELECT
          COUNT(id) AS total_personnel,
          COUNT(DISTINCT vendor_id) AS active_crews,
          COALESCE(AVG(efficiency), 0) AS skill_compliance,
          COALESCE(SUM(CASE WHEN is_overtime = 1 THEN 1 ELSE 0 END), 0) AS overtime_alerts
        FROM Labor
        WHERE company_id = :companyId
          AND is_active = 1
        `,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),

      // Skills
      db.sequelize.query(
        `
        SELECT
          skill_category,
          COUNT(id) AS personnel_count
        FROM Labor
        WHERE company_id = :companyId
          AND is_active = 1
        GROUP BY skill_category
        ORDER BY personnel_count DESC
        `,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),

      // Financials
      db.sequelize.query(
        `
        SELECT
          COALESCE(SUM(earned_value), 0) AS total_ev,
          COALESCE(SUM(actual_cost), 0) AS total_ac
        FROM Labor
        WHERE company_id = :companyId
          AND is_active = 1
        `,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),

      // Shift Activity
      db.sequelize.query(
        `
        SELECT
          l.id,
          l.name,
          l.role,
          l.avatar_url,
          l.status,
          l.activity_label,
          l.activity_type,
          l.activity_left,
          l.activity_width,
          l.activity_label_2,
          l.activity_type_2,
          l.activity_left_2,
          l.activity_width_2,
          v.name AS vendor_name
        FROM Labor l
        LEFT JOIN VENDOR v ON v.id = l.vendor_id
        WHERE l.company_id = :companyId
          AND l.is_active = 1
          AND DATE(l.work_date) = :today
          ${vendorClause}
        ORDER BY l.name ASC
        `,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),

      // Heatmap
      db.sequelize.query(
        `
        SELECT
          DATE(work_date) AS work_date,
          COUNT(id) AS worker_count
        FROM Labor
        WHERE company_id = :companyId
          AND is_active = 1
          AND DATE(work_date) >= :heatFrom
        GROUP BY DATE(work_date)
        ORDER BY DATE(work_date) ASC
        `,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),

      // Vendors
      db.sequelize.query(
        `
        SELECT
          id,
          name
        FROM VENDOR
        WHERE company_id = :companyId
        ORDER BY name ASC
        `,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),
    ]);

    // Contractors
    const contractors = contractorRows.map((r) => ({
      id: r.vendor_id,
      vendor_id: r.vendor_id,
      name: r.vendor_name || 'Unknown',
      logo: autoAvatar(r.vendor_name),
      efficiency: Number(parseFloat(r.avg_efficiency || 0).toFixed(1)),
      safetyScore: Number(parseFloat(r.avg_safety || 0).toFixed(1)),
      retentionRate: Math.round(r.avg_retention || 0),
      adherenceToSchedule: Math.round(r.avg_schedule || 0),
      personnel: parseInt(r.personnel_count || 0, 10),
      tasks: `${r.total_done || 0}/${r.total_tasks || 0}`,
      trend: r.trend || 'stable',
    }));

    // Stats
    const kpi = kpiRow[0] || {};

    const ev = parseFloat(finRow[0]?.total_ev || 0);
    const ac = parseFloat(finRow[0]?.total_ac || 0);

    const cpi = ac > 0
      ? Number((ev / ac).toFixed(3))
      : 1;

    const stats = {
      totalPersonnel: parseInt(kpi.total_personnel || 0, 10),
      activeCrews: parseInt(kpi.active_crews || 0, 10),
      skillCompliance: Number(
        parseFloat(kpi.skill_compliance || 0).toFixed(1)
      ),
      overtimeAlerts: parseInt(kpi.overtime_alerts || 0, 10),

      skillsDistribution: skillRows.map((s) => ({
        name: s.skill_category || 'Other',
        count: parseInt(s.personnel_count || 0, 10),
        color:
          SKILL_COLORS[s.skill_category] ||
          SKILL_COLORS.Other,
      })),

      financials: {
        earnedValue: ev,
        actualCost: ac,
        cpi,
        phase: 'Phase 05',
        budgetWarning: cpi < 1,
      },
    };

    // Heatmap
    const countMap = {};
    let maxCount = 1;

    heatRows.forEach((r) => {
      const key = r.work_date?.toString().slice(0, 10);

      countMap[key] = parseInt(r.worker_count || 0, 10);

      if (countMap[key] > maxCount) {
        maxCount = countMap[key];
      }
    });

    const grid = Array(3)
      .fill(null)
      .map(() => Array(7).fill(0));

    const todayDt = new Date();

    for (let d = 20; d >= 0; d--) {
      const dt = new Date(todayDt);

      dt.setDate(todayDt.getDate() - d);

      const ds = dt.toISOString().slice(0, 10);

      const wRow = Math.floor(d / 7);
      const wCol = (dt.getDay() + 6) % 7;

      if (wRow < 3 && wCol < 7) {
        const cnt = countMap[ds] || 0;

        grid[2 - wRow][wCol] =
          cnt === 0
            ? 0
            : Math.min(
              Math.ceil((cnt / maxCount) * 4),
              4
            );
      }
    }

    // Shift Activity
    const shiftActivity = shiftWorkers.map((w) => {
      const activities = [];

      if (w.activity_label) {
        activities.push({
          label: w.activity_label,
          type: w.activity_type || 'primary',
          left: w.activity_left || '5%',
          width: w.activity_width || '70%',
        });
      }

      if (w.activity_label_2) {
        activities.push({
          label: w.activity_label_2,
          type: w.activity_type_2 || 'secondary',
          left: w.activity_left_2 || '78%',
          width: w.activity_width_2 || '15%',
        });
      }

      return {
        id: w.id,
        name: w.name,
        role: w.role,
        avatar: w.avatar_url || autoAvatar(w.name),
        status: w.status || 'Active',
        vendorName: w.vendor_name || null,
        statusClass:
          STATUS_CLASS[w.status] ||
          STATUS_CLASS.Active,
        activities,
      };
    });

    // Response
    return res.json({
      success: true,
      data: {
        contractors,
        stats,
        heatmap: grid,
        shiftActivity,

        vendors: vendorList.map((v) => ({
          id: v.id,
          name: v.name,
          logo: autoAvatar(v.name),
        })),
      },
    });

  } catch (err) {
    console.error('getDashboard error:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// CONTRACTOR METRICS
exports.getContractorMetrics = async (req, res) => {
  try {

    const companyId = toInt(req.query.company_id);
    const vendorId = req.query.vendor_id || null;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'company_id is required',
      });
    }

    const vendorClause = vendorId
      ? `AND l.vendor_id = :vendorId`
      : '';

    const rows = await db.sequelize.query(
      `
      SELECT
        l.vendor_id,
        v.name AS vendor_name,
        l.trend,
        AVG(l.efficiency) AS avg_efficiency,
        AVG(l.safety_score) AS avg_safety,
        AVG(l.retention_rate) AS avg_retention,
        AVG(l.adherence_to_schedule) AS avg_schedule,
        COUNT(l.id) AS personnel_count,
        COALESCE(SUM(l.tasks_completed), 0) AS total_done,
        COALESCE(SUM(l.tasks_total), 0) AS total_tasks
      FROM Labor l
      LEFT JOIN VENDOR v ON v.id = l.vendor_id
      WHERE l.company_id = :companyId
        AND l.is_active = 1
        ${vendorClause}
      GROUP BY l.vendor_id, l.trend, v.name
      ORDER BY avg_efficiency DESC
      `,
      {
        replacements: {
          companyId,
          vendorId,
        },
        type: QueryTypes.SELECT,
      }
    );

    const data = rows.map((r) => ({
      id: r.vendor_id,
      vendor_id: r.vendor_id,
      name: r.vendor_name || 'Unknown',
      logo: autoAvatar(r.vendor_name),
      efficiency: Number(parseFloat(r.avg_efficiency || 0).toFixed(1)),
      safetyScore: Number(parseFloat(r.avg_safety || 0).toFixed(1)),
      retentionRate: Math.round(r.avg_retention || 0),
      adherenceToSchedule: Math.round(r.avg_schedule || 0),
      personnel: parseInt(r.personnel_count || 0, 10),
      tasks: `${r.total_done || 0}/${r.total_tasks || 0}`,
      trend: r.trend || 'stable',
    }));

    return res.json({
      success: true,
      data,
    });

  } catch (err) {
    console.error('getContractorMetrics:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// SHIFT ACTIVITY
exports.getShiftActivity = async (req, res) => {
  try {

    const companyId = toInt(req.query.company_id);
    const vendorId = req.query.vendor_id || null;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'company_id is required',
      });
    }

    const vendorClause = vendorId
      ? `AND l.vendor_id = :vendorId`
      : '';

    const workers = await db.sequelize.query(
      `
      SELECT
        l.id,
        l.name,
        l.role,
        l.avatar_url,
        l.status,
        l.activity_label,
        l.activity_type,
        l.activity_left,
        l.activity_width,
        l.activity_label_2,
        l.activity_type_2,
        l.activity_left_2,
        l.activity_width_2,
        v.name AS vendor_name
      FROM Labor l
      LEFT JOIN VENDOR v ON v.id = l.vendor_id
      WHERE l.company_id = :companyId
        AND l.is_active = 1
        AND DATE(l.work_date) = :today
        ${vendorClause}
      ORDER BY l.name ASC
      `,
      {
        replacements: {
          companyId,
          vendorId,
          today: todayStr(),
        },
        type: QueryTypes.SELECT,
      }
    );

    const data = workers.map((w) => {
      const activities = [];

      if (w.activity_label) {
        activities.push({
          label: w.activity_label,
          type: w.activity_type || 'primary',
          left: w.activity_left || '5%',
          width: w.activity_width || '70%',
        });
      }

      if (w.activity_label_2) {
        activities.push({
          label: w.activity_label_2,
          type: w.activity_type_2 || 'secondary',
          left: w.activity_left_2 || '78%',
          width: w.activity_width_2 || '15%',
        });
      }

      return {
        id: w.id,
        name: w.name,
        role: w.role,
        avatar: w.avatar_url || autoAvatar(w.name),
        status: w.status || 'Active',
        vendorName: w.vendor_name || null,
        statusClass:
          STATUS_CLASS[w.status] ||
          STATUS_CLASS.Active,
        activities,
      };
    });

    return res.json({
      success: true,
      data,
    });

  } catch (err) {
    console.error('getShiftActivity:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// VENDORS
exports.getVendors = async (req, res) => {
  try {

    const companyId = toInt(req.query.company_id);

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'company_id is required',
      });
    }

    const rows = await db.sequelize.query(
      `
      SELECT
        id,
        name
      FROM VENDOR
      WHERE company_id = :companyId
      ORDER BY name ASC
      `,
      {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      }
    );

    return res.json({
      success: true,
      data: rows.map((v) => ({
        id: v.id,
        name: v.name,
        logo: autoAvatar(v.name),
      })),
    });

  } catch (err) {
    console.error('getVendors:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// CREATE LABOR
exports.createLabor = async (req, res) => {
  try {

    const { company_id, name } = req.body;

    if (!company_id || !name) {
      return res.status(400).json({
        success: false,
        message: 'company_id aur name required hain',
      });
    }

    const worker = await db.labor.create({
      ...req.body,

      company_id: toInt(req.body.company_id),

      // UUID direct
      vendor_id: req.body.vendor_id || null,

      work_date: req.body.work_date || todayStr(),
    });

    return res.status(201).json({
      success: true,
      data: worker,
    });

  } catch (err) {
    console.error('createLabor:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE LABOR
exports.updateLabor = async (req, res) => {
  try {

    const { id } = req.params;

    const companyId = toInt(req.body.company_id);

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'company_id required hai',
      });
    }

    const allowed = [
      'name',
      'role',
      'avatar_url',
      'status',
      'skill_category',
      'efficiency',
      'safety_score',
      'retention_rate',
      'adherence_to_schedule',
      'tasks_completed',
      'tasks_total',
      'trend',
      'earned_value',
      'actual_cost',
      'is_overtime',
      'is_active',
      'work_date',
      'vendor_id',
      'activity_label',
      'activity_type',
      'activity_left',
      'activity_width',
      'activity_label_2',
      'activity_type_2',
      'activity_left_2',
      'activity_width_2',
    ];

    const updates = {};

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (!Object.keys(updates).length) {
      return res.status(400).json({
        success: false,
        message: 'Koi valid field nahi mili update ke liye',
      });
    }

    const [affected] = await db.labor.update(updates, {
      where: {
        id,
        company_id: companyId,
      },
    });

    if (!affected) {
      return res.status(404).json({
        success: false,
        message: 'Record nahi mila',
      });
    }

    return res.json({
      success: true,
      message: 'Updated successfully',
    });

  } catch (err) {
    console.error('updateLabor:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE LABOR
exports.deleteLabor = async (req, res) => {
  try {

    const { id } = req.params;

    const companyId = toInt(
      req.query.company_id || req.body.company_id
    );

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'company_id required hai',
      });
    }

    const deleted = await db.labor.destroy({
      where: {
        id,
        company_id: companyId,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Record nahi mila',
      });
    }

    return res.json({
      success: true,
      message: 'Deleted successfully',
    });

  } catch (err) {
    console.error('deleteLabor:', err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};