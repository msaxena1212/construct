const express = require("express");
const router = express.Router();
const drawingController = require("../controllers/drawing.controller");
const upload = require("../../../shared/middlewares/upload.middleware");
const requireProjectAccess = require("../../../core/middleware/project_access.middleware");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.post("/register", upload.single("file"), requireProjectAccess, checkPermission("projects", "can_create"), drawingController.registerDrawing);
router.get("/project/:projectId", checkPermission("projects", "can_read"), drawingController.getProjectDrawings);
router.get("/history/:projectId/:drawingNumber", checkPermission("projects", "can_read"), drawingController.getDrawingVersionHistory);
router.post("/request-signature", checkPermission("projects", "can_create"), drawingController.requestStakeholderSignature);

router.param("projectId", requireProjectAccess.param);
module.exports = router;
