const express = require("express");
const router = express.Router();
const requireProjectAccess = require("../../../core/middleware/project_access.middleware");
router.use(requireProjectAccess);
router.param("projectId", requireProjectAccess.param);
const copilotController = require("../controllers/copilot.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.post("/query", checkPermission("projects", "can_read"), copilotController.askCopilot);
router.post("/stream", checkPermission("projects", "can_read"), copilotController.streamCopilot);

module.exports = router;
