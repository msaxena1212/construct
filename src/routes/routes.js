const express = require("express");
const path = require("path");

class Routes {
  constructor() { }

  initializeRoutes(app) {
    const router = express.Router();
    app.use(
      "/uploads",
      express.static(path.join(__dirname, "..", "static", "uploads")),
    );
    require("../modules/users/user.routes")(router);
    require("../modules/rbac/rbac.routes")(router);
    require("../modules/projects/project.routes")(router);
    require("../modules/material/routes/material.routes")(router);
    app.use("/api/v1", router); // Use router with /api/v1 prefix

    const authRouter = express.Router();
    require("../modules/auth/auth.routes")(authRouter);
    app.use("/api/auth", authRouter);
  }
}

module.exports = new Routes();
