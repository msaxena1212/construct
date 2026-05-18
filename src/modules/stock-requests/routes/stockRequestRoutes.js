const stockRequestController = require("../controller/stockRequestController");
// const upload = require("../../shared/middlewares/upload.middleware");

module.exports = (app) => {
  app.post("/stock-request",stockRequestController.createStockRequest);
  app.get("/stock-request",stockRequestController.getAllStockRequests);
  app.get("/stock-request/:id",stockRequestController.getStockRequestById);
  app.put("/stock-request/:id",stockRequestController.updateStockRequest);
  app.delete("/stock-request/:id",stockRequestController.deleteStockRequest);
};