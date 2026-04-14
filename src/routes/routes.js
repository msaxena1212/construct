const express = require("express");
const path = require("path");

class Routes {
  constructor() {}

  initializeRoutes(app) {
    const router = express.Router();
    app.use(
      "/uploads",
      express.static(path.join(__dirname, "../..", "uploads")),
    );
    require("../modules/users/user.routes")(router);

    app.use("/api/v1", router); // Use router with /api prefix
  }
}

module.exports = new Routes();
