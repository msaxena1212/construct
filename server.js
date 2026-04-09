const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(` \u001b[1;32m Server is running on port ${PORT}. \u001b[0m`);
});
