const dashboardController = require("../controller/dashboard.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

module.exports = (app) => {
    app.get("/dashboard", dashboardController.getDashboardData);
}