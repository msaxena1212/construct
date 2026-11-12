const express = require("express");
const router = express.Router();
const requireProjectAccess = require("../../../core/middleware/project_access.middleware");
router.use(requireProjectAccess);
router.param("projectId", requireProjectAccess.param);
const dprController = require("../controllers/dpr.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.post("/create", checkPermission("projects", "can_create"), dprController.createDPR);
router.get("/project/:projectId", checkPermission("projects", "can_read"), dprController.getProjectDPRs);

// Feature: photographs on a daily progress report (JPG, PNG, WEBP; up to 10 per report; 10 MB each)
const dprImageController = require("../controllers/dpr_image.controller");
router.post(
  "/:id/images",
  checkPermission("projects", "can_update"),
  dprImageController.uploadMiddleware,
  dprImageController.uploadImages
);
router.get("/:id/images", checkPermission("projects", "can_read"), dprImageController.listImages);
router.post("/:id/images/:imageId/vlm-inspect", checkPermission("projects", "can_update"), dprImageController.inspectImageVlm);
router.get("/images/:imageId/file", checkPermission("projects", "can_read"), dprImageController.streamImage);

module.exports = router;
