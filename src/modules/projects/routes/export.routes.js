const express = require("express");
const router = express.Router();
const requireProjectAccess = require("../../../core/middleware/project_access.middleware");
router.use(requireProjectAccess);
router.param("projectId", requireProjectAccess.param);
const exportController = require("../controllers/export.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.get("/boq/:projectId", checkPermission("projects", "can_read"), exportController.exportBOQ);
router.get("/dpr/:projectId", checkPermission("projects", "can_read"), exportController.exportDPR);

module.exports = router;
