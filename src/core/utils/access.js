const db = require("../../models");

/**
 * Central tenant / project access policy.
 *
 * PROJECT_ACCESS_MODE (business decision #4 – pending):
 *   "company" (default): any authorised user of the company may access the company's projects.
 *   "team": additionally require membership in PROJECT_TEAM (company-wide roles listed in
 *           PROJECT_ACCESS_BYPASS_ROLES, default "Admin,Super Admin,Owner", bypass).
 */
const accessMode = () => (process.env.PROJECT_ACCESS_MODE || "company").toLowerCase();
const bypassRoles = () =>
  (process.env.PROJECT_ACCESS_BYPASS_ROLES || "Admin,Super Admin,Owner")
    .split(",")
    .map((r) => r.trim().toLowerCase());

class AccessError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.isAccessError = true;
  }
}

/** Returns the project if it belongs to the caller's company and the caller may access it. */
async function assertProjectAccess(req, projectId) {
  const id = Number(projectId);
  if (!Number.isInteger(id) || id <= 0) throw new AccessError(400, "Invalid project_id");

  const project = await db.project.findOne({ where: { id, company_id: req.user.company_id } });
  // 404 (not 403) so project existence in other tenants is not disclosed.
  if (!project) throw new AccessError(404, "Project not found");

  if (accessMode() === "team") {
    const role = (req.user.role_name || "").toLowerCase();
    if (!bypassRoles().includes(role)) {
      const member = await db.project_team.findOne({
        where: { project_id: id, user_id: req.user.id },
      });
      if (!member) throw new AccessError(403, "You are not assigned to this project");
    }
  }
  return project;
}

/**
 * Ids of the company's projects the caller may see, under the same policy as assertProjectAccess.
 * Returns null when the caller may see every project of the company (company mode, or a bypass role); otherwise an
 * array of project ids from PROJECT_TEAM. Used by cross-project views so they never list a project the caller
 * could not open.
 */
async function listAccessibleProjectIds(req) {
  if (accessMode() !== "team") return null;
  const role = (req.user.role_name || "").toLowerCase();
  if (bypassRoles().includes(role)) return null;
  const rows = await db.project_team.findAll({ where: { user_id: req.user.id }, attributes: ["project_id"] });
  return [...new Set(rows.map((r) => r.project_id))];
}

/** Sends a sanitized response for AccessError, otherwise returns false. */
function handleAccessError(err, res) {
  if (err && err.isAccessError) {
    res.status(err.status).json({ status: "failed", message: err.message });
    return true;
  }
  return false;
}

/**
 * Platform admin role check, using the same normalisation as the RBAC and menu code.
 * It is used only for the documented Super Admin override on separation-of-duties rules, never for tenant access.
 */
function isSuperAdminUser(user) {
  const role = user && user.role_name ? String(user.role_name).trim().toLowerCase().replace(/[\s_-]+/g, "") : "";
  return role === "superadmin";
}

module.exports = { assertProjectAccess, listAccessibleProjectIds, handleAccessError, AccessError, isSuperAdminUser };
