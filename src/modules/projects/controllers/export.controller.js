const db = require("../../../models");

/**
 * Controller to generate CSV / Spreadsheet data for BOQ and DPR
 */

// Export Project BOQ to CSV format
exports.exportBOQ = async (req, res) => {
  try {
    const { projectId } = req.params;
    const company_id = req.user.company_id;

    const items = await db.boq_item.findAll({
      where: { project_id: projectId, company_id, isDeleted: false },
      order: [["id", "ASC"]],
    });

    // Generate CSV Header & Rows
    let csv = "Item Code,Description,Category,Unit,Estimated Qty,Unit Rate ($),Total Estimated Amount ($)\n";
    items.forEach((item) => {
      const code = `"${item.item_code || ""}"`;
      const desc = `"${(item.description || "").replace(/"/g, '""')}"`;
      const cat = `"${item.category || ""}"`;
      const unit = `"${item.unit || ""}"`;
      const qty = Number(item.estimated_qty || 0).toFixed(2);
      const rate = Number(item.unit_rate || 0).toFixed(2);
      const total = Number(item.total_estimated_amount || 0).toFixed(2);

      csv += `${code},${desc},${cat},${unit},${qty},${rate},${total}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="Project_${projectId}_BOQ.csv"`);
    return res.status(200).send(csv);
  } catch (error) {
    console.error("Export BOQ Error:", error);
    return res.status(500).json({ status: "failed", message: "Failed to export BOQ" });
  }
};

// Export Project DPR (Daily Progress Reports) to CSV format
exports.exportDPR = async (req, res) => {
  try {
    const { projectId } = req.params;
    const company_id = req.user.company_id;

    const reports = await db.dpr.findAll({
      where: { project_id: projectId, company_id, isDeleted: false },
      order: [["report_date", "DESC"]],
    });

    let csv = "Report Date,Status,Weather,Workforce Count,Field Work Notes,AI Executive Summary\n";
    reports.forEach((r) => {
      const date = `"${r.report_date}"`;
      const status = `"${r.status}"`;
      const weather = `"${r.weather_summary || ""}"`;
      const count = r.total_workforce_count || 0;
      const notes = `"${(r.work_summary || "").replace(/"/g, '""')}"`;
      const aiSummary = `"${(r.ai_executive_summary || "").replace(/"/g, '""')}"`;

      csv += `${date},${status},${weather},${count},${notes},${aiSummary}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="Project_${projectId}_DPR_Reports.csv"`);
    return res.status(200).send(csv);
  } catch (error) {
    console.error("Export DPR Error:", error);
    return res.status(500).json({ status: "failed", message: "Failed to export DPR" });
  }
};
