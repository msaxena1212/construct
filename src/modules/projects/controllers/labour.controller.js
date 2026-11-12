const db = require("../../../models");

const ProjectCostLedgerService = require("../../../core/services/project_cost_ledger.service");

// Record or bulk-upload daily labour attendance with trade calculations & cost ledger idempotency
exports.recordLabourAttendance = async (req, res) => {
  try {
    let { project_id, attendance_date, logs = [] } = req.body;
    const company_id = req.user.company_id;

    // Support single log object passed directly
    if ((!logs || logs.length === 0) && req.body.trade_type) {
      logs = [req.body];
    }

    if (!project_id || !attendance_date || !Array.isArray(logs) || logs.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "project_id, attendance_date, and at least one attendance log are required",
      });
    }

    const project = await db.project.findOne({
      where: { id: project_id, company_id },
    });
    if (!project) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found or does not belong to authorized company",
      });
    }

    const createdLogs = [];
    for (const log of logs) {
      const trade_type = (log.trade_type || "").trim();
      if (!trade_type) {
        return res.status(400).json({
          status: "failed",
          message: "trade_type is required for all attendance records",
        });
      }

      const headcount = Math.max(1, parseInt(log.headcount, 10) || 1);
      const daily_wage = Math.max(0, parseFloat(log.daily_wage_rate) || 0);
      const overtime_hours = Math.max(0, Math.min(24, parseFloat(log.overtime_hours) || 0));
      const shift = ["day", "night", "overtime"].includes(log.shift) ? log.shift : "day";
      const skill_level = ["skilled", "semi_skilled", "unskilled"].includes(log.skill_level)
        ? log.skill_level
        : "skilled";

      const overtime_rate = daily_wage > 0 ? daily_wage / 8 : 0;
      const overtime_cost = Number((overtime_hours * overtime_rate).toFixed(2));
      const total_cost = Number(((daily_wage * headcount) + overtime_cost).toFixed(2));

      // Idempotency check: prevent duplicate attendance entries for same date/trade/shift/project
      let record = await db.labour_attendance.findOne({
        where: {
          project_id,
          company_id,
          attendance_date,
          trade_type,
          shift,
          isDeleted: false,
        },
      });

      if (record) {
        // Update existing record rather than creating a duplicate
        await record.update({
          skill_level,
          headcount,
          overtime_hours,
          daily_wage_rate: daily_wage,
          total_cost,
          notes: log.notes ? String(log.notes).trim() : record.notes,
        });
      } else {
        record = await db.labour_attendance.create({
          project_id,
          company_id,
          attendance_date,
          trade_type,
          skill_level,
          headcount,
          shift,
          vendor_id: log.vendor_id || null,
          overtime_hours,
          daily_wage_rate: daily_wage,
          total_cost,
          notes: log.notes ? String(log.notes).trim() : null,
        });
      }

      createdLogs.push(record);
    }

    return res.status(201).json({
      status: "success",
      message: `Recorded attendance for ${createdLogs.length} trades`,
      data: createdLogs,
    });
  } catch (error) {
    console.error("Labour Attendance Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get labour attendance logs for a project
exports.getProjectLabourLogs = async (req, res) => {
  try {
    const { projectId } = req.params;
    const company_id = req.user.company_id;

    const records = await db.labour_attendance.findAll({
      where: {
        project_id: projectId,
        company_id,
        isDeleted: false,
      },
      order: [["attendance_date", "DESC"]],
    });

    return res.status(200).json({
      status: "success",
      data: records,
    });
  } catch (error) {
    console.error("Get Labour Logs Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};
