const express = require("express");
const router = express.Router();

const dashboardController = require("../controller/dashboard.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.get(
  "/dashboard",
  checkPermission("dashboard", "can_read"),
  dashboardController.getDashboardData
);

module.exports = router;