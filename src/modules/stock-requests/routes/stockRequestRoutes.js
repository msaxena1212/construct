const stockRequestController = require("../controller/stockRequestController");
// const upload = require("../../shared/middlewares/upload.middleware");

module.exports = (app) => {
  app.post("/stock-request",stockRequestController.createStockRequest);
  app.get("/stock-request",stockRequestController.getAllStockRequests);
  app.get("/stock-request/:id",stockRequestController.getStockRequestById);
  app.put("/stock-request/:id/reject",stockRequestController.rejectStockRequest);
  app.put("/stock-request/:id",stockRequestController.updateStockRequest);
  app.put("/stock-request/:id/approve",stockRequestController.approveStockRequest);
  app.delete("/stock-request/:id",stockRequestController.deleteStockRequest);
};
