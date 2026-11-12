const db = require("../../../models");
const { assertProjectAccess, handleAccessError } = require("../../../core/utils/access");

const MAX_QTY = 1000000;
const parseQty = (v) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 && n <= MAX_QTY ? n : null;
};
const fail = (res, status, message) => res.status(status).json({ status: "failed", message });
const serverError = (res, label, error) => {
  console.error(`[stock-request] ${label}:`, error && error.message);
  return fail(res, 500, `Error ${label}.`);
};

/** Load a request that belongs to the caller's company and an accessible project. */
async function loadScoped(req, options = {}) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return { error: [400, "Invalid id"] };
  const sr = await db.StockRequest.findOne({
    where: { id, company_id: req.user.company_id, isDeleted: false },
    ...options,
  });
  if (!sr) return { error: [404, "Stock request not found."] };
  await assertProjectAccess(req, sr.project_id);
  return { sr };
}

module.exports = {
  async createStockRequest(req, res) {
    try {
      // Explicit whitelist: status / approval fields / ownership can never come from the client.
      const { material_id, equipment_id, task_title, project_id } = req.body;
      const requested_qty = parseQty(req.body.requested_qty);
      if (!material_id || !task_title || !requested_qty) {
        return fail(res, 400, "material_id, task_title and a positive integer requested_qty are required");
      }
      await assertProjectAccess(req, project_id);

      const company_id = req.user.company_id;
      const stock = await db.material_project_stock.findOne({
        where: { id: material_id, project_id, company_id, isDeleted: false },
      });
      if (!stock) return fail(res, 404, "Material not found in this project");

      // available_qty is derived by the server, never trusted from the client.
      const available_qty = Math.max(0, (stock.stockIn || 0) - (stock.stockUsed || 0));

      const stockRequest = await db.StockRequest.create({
        material_id,
        equipment_id: equipment_id || null,
        task_title: String(task_title).slice(0, 255),
        requested_qty,
        available_qty,
        project_id,
        company_id,
        requested_by: req.user.id,
        status: "pending",
      });
      return res.status(201).json({ message: "Stock request created successfully.", data: stockRequest });
    } catch (error) {
      if (handleAccessError(error, res)) return;
      return serverError(res, "creating stock request", error);
    }
  },

  async getAllStockRequests(req, res) {
    try {
      const where = { company_id: req.user.company_id, isDeleted: false };
      if (req.query.project_id) {
        await assertProjectAccess(req, req.query.project_id);
        where.project_id = Number(req.query.project_id);
      } else if ((process.env.PROJECT_ACCESS_MODE || "company").toLowerCase() === "team") {
        const rows = await db.project_team.findAll({ where: { user_id: req.user.id }, attributes: ["project_id"] });
        where.project_id = rows.map((r) => r.project_id);
      }
      const stockRequests = await db.StockRequest.findAll({ where, order: [["createdAt", "DESC"]] });
      return res.status(200).json({ message: "Fetched all stock requests successfully.", data: stockRequests });
    } catch (error) {
      if (handleAccessError(error, res)) return;
      return serverError(res, "fetching stock requests", error);
    }
  },

  async getStockRequestById(req, res) {
    try {
      const { sr, error } = await loadScoped(req);
      if (error) return fail(res, ...error);
      return res.status(200).json({ message: "Stock request fetched successfully.", data: sr });
    } catch (error) {
      if (handleAccessError(error, res)) return;
      return serverError(res, "fetching stock request", error);
    }
  },

  /** Ordinary edit: only a pending request, only task_title / requested_qty. */
  async updateStockRequest(req, res) {
    try {
      const { sr, error } = await loadScoped(req);
      if (error) return fail(res, ...error);
      if (sr.status !== "pending") return fail(res, 409, "Only pending requests can be edited.");

      const patch = {};
      if (req.body.task_title !== undefined) patch.task_title = String(req.body.task_title).slice(0, 255);
      if (req.body.requested_qty !== undefined) {
        const q = parseQty(req.body.requested_qty);
        if (!q) return fail(res, 400, "requested_qty must be a positive integer");
        patch.requested_qty = q;
      }
      if (!Object.keys(patch).length) return fail(res, 400, "No editable fields supplied");
      await sr.update(patch);
      return res.status(200).json({ message: "Stock request updated successfully.", data: sr });
    } catch (error) {
      if (handleAccessError(error, res)) return;
      return serverError(res, "updating stock request", error);
    }
  },

  /** Soft delete, pending requests only (history of decided requests is preserved). */
  async deleteStockRequest(req, res) {
    try {
      const { sr, error } = await loadScoped(req);
      if (error) return fail(res, ...error);
      if (sr.status !== "pending") return fail(res, 409, "Decided requests cannot be deleted.");
      await sr.update({ isDeleted: true });
      return res.status(200).json({ message: "Stock request deleted successfully." });
    } catch (error) {
      if (handleAccessError(error, res)) return;
      return serverError(res, "deleting stock request", error);
    }
  },

  /**
   * Explicit, auditable decision transition: pending -> approved | rejected.
   * Approval does NOT touch inventory; stock issue is a separate authorised transaction.
   */
  async approveStockRequest(req, res) {
    return decide(req, res, "approved");
  },
  async rejectStockRequest(req, res) {
    return decide(req, res, "rejected");
  },
};

async function decide(req, res, decision) {
  try {
    const { sr, error } = await loadScoped(req);
    if (error) return fail(res, ...error);
    if (sr.status !== "pending") return fail(res, 409, `Request already ${sr.status}.`);
    if (sr.requested_by && sr.requested_by === req.user.id) {
      return fail(res, 403, "Segregation of duties: you cannot decide your own request.");
    }

    const reason = req.body && req.body.reason ? String(req.body.reason).slice(0, 500) : null;
    const patch = { status: decision, decided_by: req.user.id, decided_at: new Date(), decision_reason: reason };

    if (decision === "rejected") {
      if (!reason) return fail(res, 400, "A rejection reason is required.");
    } else {
      let approved = sr.requested_qty;
      if (req.body && req.body.approved_qty !== undefined) {
        approved = parseQty(req.body.approved_qty);
        if (!approved || approved > sr.requested_qty) {
          return fail(res, 400, "approved_qty must be a positive integer not exceeding requested_qty");
        }
      }
      patch.approved_qty = approved;
    }

    // Atomic compare-and-set: only the first concurrent decision can change a pending row.
    const [affected] = await db.StockRequest.update(patch, {
      where: { id: sr.id, company_id: req.user.company_id, status: "pending" },
    });
    if (!affected) return fail(res, 409, "Request was already decided.");
    await sr.reload();
    return res.status(200).json({ message: `Stock request ${decision} successfully.`, data: sr });
  } catch (error) {
    if (handleAccessError(error, res)) return;
    return serverError(res, `${decision === "approved" ? "approving" : "rejecting"} stock request`, error);
  }
}