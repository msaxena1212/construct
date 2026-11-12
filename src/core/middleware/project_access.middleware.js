const { assertProjectAccess, handleAccessError } = require("../utils/access");

/**
 * Router-level guard: every project_id supplied via params (projectId / project_id),
 * query or body must belong to the caller's company (and team, in "team" mode).
 * Routes with no project reference pass through (they must scope by company_id themselves).
 */
module.exports = async function requireProjectAccess(req, res, next) {
  try {
    const ids = [
      req.params && (req.params.projectId ?? req.params.project_id),
      req.query && req.query.project_id,
      req.body && req.body.project_id,
    ].filter((v) => v !== undefined && v !== null && v !== "");
    for (const id of new Set(ids.map(String))) {
      await assertProjectAccess(req, id);
    }
    return next();
  } catch (err) {
    if (handleAccessError(err, res)) return;
    console.error("[project-access]", err && err.message);
    return res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
};

/** Use with router.param("projectId", requireProjectAccess.param) */
module.exports.param = async function (req, res, next, value) {
  try {
    await assertProjectAccess(req, value);
    return next();
  } catch (err) {
    if (handleAccessError(err, res)) return;
    console.error("[project-access]", err && err.message);
    return res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }
};
