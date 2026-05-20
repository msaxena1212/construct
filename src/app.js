const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const cors = require("cors");
var bodyParser = require("body-parser");
const Routes = require("./routes/routes");
const verifyAuthToken = require("./core/middleware/auth.middleware");

const app = express();
const db = require("./models");

// table wise sycn
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("Database synced successfully");
// }).catch((err) => {
//   console.error("Error syncing database", err);
// });
// db.user.sync({ alter: true });
// db.role_permission.sync({alter:true});
// db.project.sync({ alter: true });
// db.milestone.sync({ alter: true });
// db.project_team.sync({alter:true});
// db.project_document.sync({alter:true});
// db.project_task.sync({ alter: true });
// db.project_sub_task.sync({ alter: true });
// db.project_task_dependency.sync({ alter: true });
// db.task_activity.sync({ alter: true });
// db.task_attachment.sync({ alter: true });
// db.user.sync({ alter: true });
// db.activity.sync({ alter: true });
// db.material_master.sync({ alter: true });
// db.quotation.sync({ alter: true });
// db.material.sync({ alter: true });
// db.material_history.sync({ alter: true });
// db.equipment_master.sync({ alter: true });
// db.equipment.sync({ alter: true });
// db.equipment_history.sync({ alter: true });
// db.vendors_activity.sync({ alter: true });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.set("trust proxy", true);

const corsOpts = {
  origin: "*",
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));

// Calling Auth Token on All routes
app.use(verifyAuthToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

const serveStatic = path.join(__dirname, "static/index.html");

app.get("/", (req, res) => {
  res.sendFile(serveStatic);
});
app.get("/api/health", async (req, res) => {
  res.send({ message: "Server is healthy!", status: 200 });
});



// Initialize routes
Routes.initializeRoutes(app);

module.exports = app;
