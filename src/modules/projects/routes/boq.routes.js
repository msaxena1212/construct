const express = require("express");
const router = express.Router();
const requireProjectAccess = require("../../../core/middleware/project_access.middleware");
router.use(requireProjectAccess);
router.param("projectId", requireProjectAccess.param);
const boqController = require("../controllers/boq.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.post("/parse", checkPermission("projects", "can_create"), boqController.parseBOQContent);
router.post("/batch", checkPermission("projects", "can_create"), boqController.batchCreateBOQ);
router.post("/extract-create", checkPermission("projects", "can_create"), boqController.extractAndCreateBOQ);
router.post("/generate-rfq", checkPermission("projects", "can_create"), boqController.generateRFQFromBOQ);
router.get("/project/:projectId", checkPermission("projects", "can_read"), boqController.getProjectBOQ);
router.put("/items/:id", checkPermission("projects", "can_update"), boqController.updateBOQItem);
router.delete("/items/:id", checkPermission("projects", "can_delete"), boqController.deleteBOQItem);

module.exports = router;

