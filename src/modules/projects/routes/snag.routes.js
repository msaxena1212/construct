const express = require("express");
const router = express.Router();
const requireProjectAccess = require("../../../core/middleware/project_access.middleware");
router.use(requireProjectAccess);
router.param("projectId", requireProjectAccess.param);
const snagController = require("../controllers/snag.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.post("/create", checkPermission("projects", "can_create"), snagController.createSnag);
router.post("/analyze-voice", checkPermission("projects", "can_read"), snagController.analyzeVoiceNote);
router.put("/:id/status", checkPermission("projects", "can_update"), snagController.updateSnagStatus);
router.put("/:id", checkPermission("projects", "can_update"), snagController.updateSnag);
router.delete("/:id", checkPermission("projects", "can_delete"), snagController.deleteSnag);
router.get("/project/:projectId", checkPermission("projects", "can_read"), snagController.getProjectSnags);

module.exports = router;

