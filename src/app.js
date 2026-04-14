const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const Routes = require("./routes/routes");
const verifyAuthToken = require("./core/middleware/auth.middleware");

dotenv.config();
const app = express();

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

const db = require("./models");

// table wise sycn
// db.company.sync({alter:true});
// Calling Auth Token on All routes

// Initialize routes
Routes.initializeRoutes(app);

module.exports = app;
