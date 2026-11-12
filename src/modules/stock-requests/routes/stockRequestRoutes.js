const express = require("express");
const stockRequestController = require("../controller/stockRequestController");
const checkPermission = require("../../../core/middleware/permission.middleware");

module.exports = (app) => {
  app.post("/stock-request", checkPermission("stock-approval", "can_create"), stockRequestController.createStockRequest);
  app.get("/stock-request", checkPermission("stock-approval", "can_read"), stockRequestController.getAllStockRequests);
  app.get("/stock-request/:id", checkPermission("stock-approval", "can_read"), stockRequestController.getStockRequestById);
  app.put("/stock-request/:id/reject", checkPermission("stock-approval", "can_update"), stockRequestController.rejectStockRequest);
  app.put("/stock-request/:id", checkPermission("stock-approval", "can_update"), stockRequestController.updateStockRequest);
  app.put("/stock-request/:id/approve", checkPermission("stock-approval", "can_update"), stockRequestController.approveStockRequest);
  app.delete("/stock-request/:id", checkPermission("stock-approval", "can_delete"), stockRequestController.deleteStockRequest);
};