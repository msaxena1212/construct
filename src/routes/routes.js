const express = require("express");
const path = require("path");

class Routes {
  constructor() { }

  initializeRoutes(app) {
    const router = express.Router();
    app.use("/uploads", express.static(path.join(__dirname, "..", "static", "uploads")));
    app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
    require("../modules/users/user.routes")(router);
    require("../modules/rbac/rbac.routes")(router);
    require("../modules/projects/project.routes")(router);
    app.use("/api/v1", router);
    require("../modules/material/routes/material_master.routes")(router);
    require("../modules/material/routes/quotation.routes")(router);
    require("../modules/material/routes/material.routes")(router);
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
      "/api/v1/labor",
      require("../modules/labor/routes/labor_routes")
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
     app.use("/api/v1", require("../modules/dashboard/routes/dashboard.routes"));
     
  }
}

module.exports = new Routes();