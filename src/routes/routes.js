const express = require("express");
const path = require("path");

class Routes {
  constructor() { }

  initializeRoutes(app) {
    const router = express.Router();
    const fileController = require("../core/controllers/file.controller");

    // Authenticated, tenant-isolated file serving (compatible with both /uploads/... and /api/v1/files/...)
    app.get("/uploads/:category/:filename", fileController.serveProtectedFile);
    router.get("/files/:category/:filename", fileController.serveProtectedFile);

    require("../modules/users/user.routes")(router);
    require("../modules/rbac/rbac.routes")(router);
    require("../modules/projects/project.routes")(router);
    app.use("/api/v1", router);
    require("../modules/material/routes/material_master.routes")(router);
    require("../modules/material/routes/quotation.routes")(router);
    require("../modules/material/routes/procurement.routes")(router);
    require("../modules/material/routes/material.routes")(router);
    require("../modules/material/routes/material_history.routes")(router);
    require("../modules/stock-requests/routes/stockRequestRoutes")(router);

    require("../modules/equipment/routes/equipment_master.routes")(router);
    require("../modules/equipment/routes/equipment.routes")(router);
    require("../modules/category/routes/category_routes")(router);
    app.use("/api/v1", router); // Use router with /api/v1 prefix

    const authRouter = express.Router();
    require("../modules/auth/auth.routes")(authRouter);
    app.use("/api/auth", authRouter);

    app.use(
      "/api/v1/vendors",
      require("../modules/vendors/vendors_routes")
    );

    app.use(
      "/api/v1/activities",
      require("../modules/vendors/vendors_activity_routes")
    );

    app.use(
      "/api/v1/vendors_labor",
      require("../modules/vendors/vendors_labor_routes")
    );
    app.use(
      "/api/v1/skill",
      require("../modules/skill/routes/skill_routes")
    );
    app.use("/api/v1/meetings", require("../modules/meeting/routes/meeting.routes"));
    app.use("/api/v1/dpr", require("../modules/projects/routes/dpr.routes"));
    app.use("/api/v1/boq", require("../modules/projects/routes/boq.routes"));
    app.use("/api/v1/snags", require("../modules/projects/routes/snag.routes"));
    app.use("/api/v1/labour", require("../modules/projects/routes/labour.routes"));
    app.use("/api/v1/drawings", require("../modules/projects/routes/drawing.routes"));
    app.use("/api/v1/projects/budget", require("../modules/projects/routes/budget.routes"));
    app.use("/api/v1/projects/msp", require("../modules/projects/routes/msp.routes"));
    app.use("/api/v1/measurement-books", require("../modules/projects/routes/measurement_book.routes"));
    app.use("/api/v1/contractor-ra-bills", require("../modules/projects/routes/contractor_ra_bill.routes"));
    app.use("/api/v1/variation-orders", require("../modules/projects/routes/variation_order.routes"));
    app.use("/api/v1/copilot", require("../modules/projects/routes/copilot.routes"));
    app.use("/api/v1/export", require("../modules/projects/routes/export.routes"));
    app.use("/api/v1/project-controls", require("../modules/projects/routes/project_controls.routes"));
    app.use("/api/v1/agents", require("../modules/projects/routes/agents.routes"));
    app.use("/api/v1/safety", require("../modules/projects/routes/safety.routes"));
    app.use("/api/v1/rfis", require("../modules/projects/routes/rfi.routes"));
    app.use("/api/v1/portfolio", require("../modules/portfolio/portfolio.routes"));
    app.use("/api/v1/stock-transfers", require("../modules/material/routes/stock_transfer.routes"));
    app.use("/api/v1/inventory", require("../modules/material/routes/inventory.routes"));
    app.use("/api/v1", require("../modules/dashboard/routes/dashboard.routes"));

  }
}

module.exports = new Routes();