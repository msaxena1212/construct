const db = require('../../../models');          // adjust path if your models index is elsewhere
const { Op, QueryTypes } = db.Sequelize;
const { v4: uuidv4 } = require('uuid');

/* ─────────────────────────────────────────────────────────────
   HELPER – safe integer parse
───────────────────────────────────────────────────────────── */
const toInt = (val) => {
    const n = parseInt(val, 10);
    return isNaN(n) ? null : n;
};

/* ─────────────────────────────────────────────────────────────
   HELPER – today's date string (YYYY-MM-DD)
───────────────────────────────────────────────────────────── */
const today = () => new Date().toISOString().slice(0, 10);

/* ═════════════════════════════════════════════════════════════
   1.  CONTRACTOR METRICS
       GET /api/v1/labor/contractor-metrics?company_id=1[&vendor_id=2]
═════════════════════════════════════════════════════════════ */
exports.getContractorMetrics = async (req, res) => {
    try {
        const companyId = toInt(req.query.company_id);
        const vendorId = toInt(req.query.vendor_id);

        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        // Build where clause
        const where = { company_id: companyId };
        if (vendorId) where.vendor_id = vendorId;

        // Get latest recorded_date per vendor
        const latestDates = await db.labor_contractor_metric.findAll({
            where,
            attributes: [
                'vendor_id',
                [db.sequelize.fn('MAX', db.sequelize.col('recorded_date')), 'max_date'],
            ],
            group: ['vendor_id'],
            raw: true,
        });

        if (!latestDates.length) {
            return res.json({ success: true, data: [] });
        }

        // Fetch metrics for latest dates
        const orConditions = latestDates.map((r) => ({
            vendor_id: r.vendor_id,
            recorded_date: r.max_date,
        }));

        const metrics = await db.labor_contractor_metric.findAll({
            where: {
                company_id: companyId,
                [Op.or]: orConditions,
            },
            include: [
                {
                    model: db.vendor,
                    as: 'vendor',
                    attributes: ['id', 'name', 'logo_url'],
                },
            ],
            order: [['efficiency', 'DESC']],
        });

        const data = metrics.map((m) => ({
            id: m.id,
            vendor_id: m.vendor_id,
            company_id: m.company_id,
            name: m.vendor?.name || 'Unknown',
            logo: m.vendor?.logo_url || null,
            efficiency: parseFloat(m.efficiency),
            safetyScore: parseFloat(m.safety_score),
            retentionRate: m.retention_rate,
            adherenceToSchedule: m.adherence_to_schedule,
            personnel: m.personnel_count,
            tasks: `${m.tasks_completed}/${m.tasks_total}`,
            trend: m.trend,
        }));

        res.json({ success: true, data });
    } catch (err) {
        console.error('getContractorMetrics:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/* ═════════════════════════════════════════════════════════════
   2.  LABOR STATS
       GET /api/v1/labor/stats?company_id=1
═════════════════════════════════════════════════════════════ */
exports.getLaborStats = async (req, res) => {
    try {
        const companyId = toInt(req.query.company_id);
        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        // Latest stats row
        const statsRow = await db.labor_stats.findOne({
            where: { company_id: companyId },
            order: [['recorded_date', 'DESC']],
        });

        if (!statsRow) {
            return res.status(404).json({ success: false, message: 'No labor stats found for this company' });
        }

        // Skills distribution
        const skillsRows = await db.labor_skills.findAll({
            where: { company_id: companyId },
            order: [['sort_order', 'ASC']],
            attributes: ['skill_name', 'personnel_count', 'color'],
        });

        // Financials
        const finRow = await db.labor_financials.findOne({
            where: { company_id: companyId },
            order: [['recorded_date', 'DESC']],
        });

        res.json({
            success: true,
            data: {
                activeCrews: statsRow.active_crews,
                totalPersonnel: statsRow.total_personnel,
                skillCompliance: parseFloat(statsRow.skill_compliance),
                overtimeAlerts: statsRow.overtime_alerts,
                skillsDistribution: skillsRows.map((s) => ({
                    name: s.skill_name,
                    count: s.personnel_count,
                    color: s.color,
                })),
                financials: finRow
                    ? {
                        earnedValue: parseFloat(finRow.earned_value),
                        actualCost: parseFloat(finRow.actual_cost),
                        cpi: parseFloat(finRow.cpi),
                        phase: finRow.phase,
                        budgetWarning: !!finRow.budget_warning,
                    }
                    : null,
            },
        });
    } catch (err) {
        console.error('getLaborStats:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/* ═════════════════════════════════════════════════════════════
   3.  PRODUCTIVITY HEATMAP
       GET /api/v1/labor/heatmap?company_id=1
═════════════════════════════════════════════════════════════ */
exports.getHeatmap = async (req, res) => {
    try {
        const companyId = toInt(req.query.company_id);
        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        // Latest recorded_date for this company
        const latest = await db.labor_heatmap.findOne({
            where: { company_id: companyId },
            attributes: [[db.sequelize.fn('MAX', db.sequelize.col('recorded_date')), 'max_date']],
            raw: true,
        });

        const maxDate = latest?.max_date;
        if (!maxDate) {
            // Return empty 3×7 grid if no data
            return res.json({
                success: true,
                data: Array(3).fill(null).map(() => Array(7).fill(0)),
            });
        }

        const rows = await db.labor_heatmap.findAll({
            where: { company_id: companyId, recorded_date: maxDate },
            order: [['week_row', 'ASC'], ['day_col', 'ASC']],
            attributes: ['week_row', 'day_col', 'intensity'],
        });

        // Build 2D grid
        const grid = Array(3).fill(null).map(() => Array(7).fill(0));
        rows.forEach((r) => {
            if (r.week_row < 3 && r.day_col < 7) grid[r.week_row][r.day_col] = r.intensity;
        });

        res.json({ success: true, data: grid });
    } catch (err) {
        console.error('getHeatmap:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/* ═════════════════════════════════════════════════════════════
   4.  SHIFT ACTIVITY (Active Pulse)
       GET /api/v1/labor/shift-activity?company_id=1[&vendor_id=2&worker_id=uuid]
═════════════════════════════════════════════════════════════ */
exports.getShiftActivity = async (req, res) => {
    try {
        const companyId = toInt(req.query.company_id);
        const vendorId = toInt(req.query.vendor_id);
        const workerId = req.query.worker_id || null;

        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        const where = { company_id: companyId, is_active: true };
        if (vendorId) where.vendor_id = vendorId;
        if (workerId) where.id = workerId;

        const workers = await db.labor.findAll({
            where,
            include: [
                {
                    model: db.vendor,
                    as: 'vendor',
                    attributes: ['id', 'name'],
                    required: false,
                },
                {
                    model: db.labor_worker_activity,
                    as: 'activities',
                    where: { activity_date: today() },
                    required: false,
                    attributes: ['label', 'activity_type', 'position_left', 'width'],
                    order: [['start_time', 'ASC']],
                },
            ],
            order: [['name', 'ASC']],
        });

        const statusClassMap = {
            'On Site': 'bg-green-100 text-green-700',
            'Active': 'bg-blue-100 text-blue-700',
            'Off Site': 'bg-slate-100 text-slate-500',
            'Break': 'bg-amber-100 text-amber-700',
            'Overtime': 'bg-rose-100 text-rose-700',
        };

        const data = workers.map((w) => ({
            id: w.id,
            name: w.name,
            role: w.role,
            avatar: w.avatar_url,
            status: w.status,
            vendorName: w.vendor?.name || null,
            statusClass: statusClassMap[w.status] || 'bg-slate-100 text-slate-500',
            activities: (w.activities || []).map((a) => ({
                label: a.label,
                type: a.activity_type,
                left: a.position_left,
                width: a.width,
            })),
        }));

        res.json({ success: true, data });
    } catch (err) {
        console.error('getShiftActivity:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/* ═════════════════════════════════════════════════════════════
   5.  REPORTS VAULT
       GET  /api/v1/labor/reports?company_id=1[&status=Published&type=Safety]
       POST /api/v1/labor/reports
═════════════════════════════════════════════════════════════ */
exports.getReports = async (req, res) => {
    try {
        const companyId = toInt(req.query.company_id);
        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        const where = { company_id: companyId };
        if (req.query.status) where.status = req.query.status;
        if (req.query.type) where.type = req.query.type;

        const rows = await db.labor_report.findAll({
            where,
            order: [['report_date', 'DESC']],
            attributes: ['id', 'title', 'type', 'report_date', 'author', 'status', 'file_size'],
        });

        const data = rows.map((r) => ({
            id: r.id,
            title: r.title,
            type: r.type,
            date: r.report_date,
            author: r.author,
            status: r.status,
            fileSize: r.file_size,
        }));

        res.json({ success: true, data });
    } catch (err) {
        console.error('getReports:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createReport = async (req, res) => {
    try {
        const { company_id, title, type, author } = req.body;

        if (!company_id || !title || !type) {
            return res.status(400).json({ success: false, message: 'company_id, title, and type are required' });
        }

        const validTypes = ['Technical', 'Financial', 'Safety', 'Quality', 'Milestone'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                message: `type must be one of: ${validTypes.join(', ')}`,
            });
        }

        const newReport = await db.labor_report.create({
            id: `r_${uuidv4().split('-')[0]}`,
            company_id: toInt(company_id),
            title,
            type,
            author: author || 'Current User',
            status: 'Draft',
            file_size: '0 KB',
            report_date: today(),
        });

        res.status(201).json({
            success: true,
            data: {
                id: newReport.id,
                title: newReport.title,
                type: newReport.type,
                status: newReport.status,
                fileSize: newReport.file_size,
                date: newReport.report_date,
                author: newReport.author,
            },
        });
    } catch (err) {
        console.error('createReport:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/* ═════════════════════════════════════════════════════════════
   6.  VENDORS LIST
       GET /api/v1/labor/vendors?company_id=1
═════════════════════════════════════════════════════════════ */
exports.getVendors = async (req, res) => {
    try {
        const companyId = toInt(req.query.company_id);
        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        const rows = await db.vendor.findAll({
            where: { company_id: companyId },
            attributes: ['id', 'name', 'logo_url', 'specialty'],
            order: [['name', 'ASC']],
        });

        const data = rows.map((v) => ({
            id: v.id,
            name: v.name,
            logo: v.logo_url,
            specialty: v.specialty,
        }));

        res.json({ success: true, data });
    } catch (err) {
        console.error('getVendors:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/* ═════════════════════════════════════════════════════════════
   7.  UPDATE CONTRACTOR METRIC (PATCH)
       PATCH /api/v1/labor/contractor-metrics/:id
═════════════════════════════════════════════════════════════ */
exports.updateContractorMetric = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = toInt(req.body.company_id);

        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        const allowedFields = [
            'efficiency',
            'safety_score',
            'retention_rate',
            'adherence_to_schedule',
            'trend',
            'personnel_count',
            'tasks_completed',
            'tasks_total',
        ];

        const updates = {};
        allowedFields.forEach((f) => {
            if (req.body[f] !== undefined) updates[f] = req.body[f];
        });

        if (!Object.keys(updates).length) {
            return res.status(400).json({ success: false, message: 'No valid fields to update' });
        }

        const [affected] = await db.labor_contractor_metric.update(updates, {
            where: { id, company_id: companyId },
        });

        if (!affected) {
            return res.status(404).json({ success: false, message: 'Record not found or access denied' });
        }

        res.json({ success: true, message: 'Updated successfully' });
    } catch (err) {
        console.error('updateContractorMetric:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/* ═════════════════════════════════════════════════════════════
   8.  DASHBOARD (all-in-one)
       GET /api/v1/labor/dashboard?company_id=1[&vendor_id=2]
═════════════════════════════════════════════════════════════ */
exports.getDashboard = async (req, res) => {
    try {
        const companyId = toInt(req.query.company_id);
        const vendorId = toInt(req.query.vendor_id);

        if (!companyId) {
            return res.status(400).json({ success: false, message: 'company_id is required' });
        }

        // Build contractor metric where
        const metricWhere = { company_id: companyId };
        if (vendorId) metricWhere.vendor_id = vendorId;

        // Worker where
        const workerWhere = { company_id: companyId, is_active: true };
        if (vendorId) workerWhere.vendor_id = vendorId;

        // ── Run all queries in parallel ────────────────────────
        const [
            latestDates,
            statsRow,
            skillsRows,
            finRow,
            latestHeatmap,
            workers,
        ] = await Promise.all([

            // Latest date per vendor for contractor metrics
            db.labor_contractor_metric.findAll({
                where: metricWhere,
                attributes: [
                    'vendor_id',
                    [db.sequelize.fn('MAX', db.sequelize.col('recorded_date')), 'max_date'],
                ],
                group: ['vendor_id'],
                raw: true,
            }),

            // Labor stats
            db.labor_stats.findOne({
                where: { company_id: companyId },
                order: [['recorded_date', 'DESC']],
            }),

            // Skills distribution
            db.labor_skills.findAll({
                where: { company_id: companyId },
                order: [['sort_order', 'ASC']],
                attributes: ['skill_name', 'personnel_count', 'color'],
            }),

            // Financials
            db.labor_financials.findOne({
                where: { company_id: companyId },
                order: [['recorded_date', 'DESC']],
            }),

            // Heatmap latest date
            db.labor_heatmap.findOne({
                where: { company_id: companyId },
                attributes: [[db.sequelize.fn('MAX', db.sequelize.col('recorded_date')), 'max_date']],
                raw: true,
            }),

            // Workers with today's activities
            db.labor.findAll({
                where: workerWhere,
                include: [
                    {
                        model: db.vendor,
                        as: 'vendor',
                        attributes: ['id', 'name'],
                        required: false,
                    },
                    {
                        model: db.labor_worker_activity,
                        as: 'activities',
                        where: { activity_date: today() },
                        required: false,
                        attributes: ['label', 'activity_type', 'position_left', 'width'],
                    },
                ],
                order: [['name', 'ASC']],
            }),
        ]);

        // ── Fetch contractor metrics with vendor info ──────────
        let contractorsData = [];
        if (latestDates.length) {
            const orConditions = latestDates.map((r) => ({
                vendor_id: r.vendor_id,
                recorded_date: r.max_date,
            }));

            const metrics = await db.labor_contractor_metric.findAll({
                where: { company_id: companyId, [Op.or]: orConditions },
                include: [{ model: db.vendor, as: 'vendor', attributes: ['id', 'name', 'logo_url'] }],
                order: [['efficiency', 'DESC']],
            });

            contractorsData = metrics.map((m) => ({
                id: m.id,
                vendor_id: m.vendor_id,
                name: m.vendor?.name || 'Unknown',
                logo: m.vendor?.logo_url || null,
                efficiency: parseFloat(m.efficiency),
                safetyScore: parseFloat(m.safety_score),
                retentionRate: m.retention_rate,
                adherenceToSchedule: m.adherence_to_schedule,
                personnel: m.personnel_count,
                tasks: `${m.tasks_completed}/${m.tasks_total}`,
                trend: m.trend,
            }));
        }

        // ── Build heatmap grid ─────────────────────────────────
        let grid = Array(3).fill(null).map(() => Array(7).fill(0));
        if (latestHeatmap?.max_date) {
            const heatRows = await db.labor_heatmap.findAll({
                where: { company_id: companyId, recorded_date: latestHeatmap.max_date },
                attributes: ['week_row', 'day_col', 'intensity'],
                order: [['week_row', 'ASC'], ['day_col', 'ASC']],
            });
            heatRows.forEach((r) => {
                if (r.week_row < 3 && r.day_col < 7) grid[r.week_row][r.day_col] = r.intensity;
            });
        }

        // ── Build shift activity ───────────────────────────────
        const statusClassMap = {
            'On Site': 'bg-green-100 text-green-700',
            'Active': 'bg-blue-100 text-blue-700',
            'Off Site': 'bg-slate-100 text-slate-500',
            'Break': 'bg-amber-100 text-amber-700',
            'Overtime': 'bg-rose-100 text-rose-700',
        };

        const shiftActivity = workers.map((w) => ({
            id: w.id,
            name: w.name,
            role: w.role,
            avatar: w.avatar_url,
            status: w.status,
            vendorName: w.vendor?.name || null,
            statusClass: statusClassMap[w.status] || 'bg-slate-100 text-slate-500',
            activities: (w.activities || []).map((a) => ({
                label: a.label,
                type: a.activity_type,
                left: a.position_left,
                width: a.width,
            })),
        }));

        // ── Assemble response ──────────────────────────────────
        res.json({
            success: true,
            data: {
                contractors: contractorsData,
                stats: statsRow
                    ? {
                        activeCrews: statsRow.active_crews,
                        totalPersonnel: statsRow.total_personnel,
                        skillCompliance: parseFloat(statsRow.skill_compliance),
                        overtimeAlerts: statsRow.overtime_alerts,
                        skillsDistribution: skillsRows.map((s) => ({
                            name: s.skill_name,
                            count: s.personnel_count,
                            color: s.color,
                        })),
                        financials: finRow
                            ? {
                                earnedValue: parseFloat(finRow.earned_value),
                                actualCost: parseFloat(finRow.actual_cost),
                                cpi: parseFloat(finRow.cpi),
                                phase: finRow.phase,
                                budgetWarning: !!finRow.budget_warning,
                            }
                            : null,
                    }
                    : null,
                heatmap: grid,
                shiftActivity,
            },
        });
    } catch (err) {
        console.error('getDashboard:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};