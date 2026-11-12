const express = require("express");
const router = express.Router();
const requireProjectAccess = require("../../../core/middleware/project_access.middleware");
router.use(requireProjectAccess);
router.param("projectId", requireProjectAccess.param);
const labourController = require("../controllers/labour.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.post("/record", checkPermission("projects", "can_create"), labourController.recordLabourAttendance);
router.get("/project/:projectId", checkPermission("projects", "can_read"), labourController.getProjectLabourLogs);

module.exports = router;
