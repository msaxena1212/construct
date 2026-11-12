const initialEnv = process.env.NODE_ENV;
const dotenv = require("dotenv");
dotenv.config();
if (initialEnv === "test") {
  process.env.NODE_ENV = "test";
}

const express = require("express");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
var bodyParser = require("body-parser");
const Routes = require("./routes/routes");
const verifyAuthToken = require("./core/middleware/auth.middleware");

const app = express();
const db = require("./models");

// ─────────────────────────────────────────────────────────────
// Sync helpers (uncomment per model when schema changes needed)
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Trust proxy (required for rate-limiter when behind Nginx/load balancer)
// ─────────────────────────────────────────────────────────────
app.set("trust proxy", 1);

// ─────────────────────────────────────────────────────────────
// CORS — restrict to known origins only. NEVER allow "*" in production.
// ─────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [
      "http://localhost:4200",
      "http://localhost:3000",
      "http://localhost",
      "https://zynoconstruction.elitetraveltech.in",
    ];

const corsOpts = {
  origin: (origin, callback) => {
    // Allow server-to-server or same-origin requests (no Origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: Origin ${origin} is not permitted`));
  },
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400, // cache preflight 24h
};

app.use(cors(corsOpts));
app.options(/(.*)/, cors(corsOpts)); // enable pre-flight across all routes

// ─────────────────────────────────────────────────────────────
// Rate Limiters
// ─────────────────────────────────────────────────────────────

/** Auth brute-force guard: max 10 login/register attempts per 15 min per IP */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many authentication attempts. Please try again after 15 minutes.",
  },
  skipSuccessfulRequests: false,
});

/** General API limiter: 300 req / min per IP to prevent scraping */
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Rate limit exceeded. Please slow down.",
  },
  skip: (req) => req.path === "/api/v1/health" || req.path === "/api/health",
});

/** AI Copilot limiter: streaming SSE calls are expensive */
const copilotLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "AI Copilot rate limit reached. Please wait before sending more queries.",
  },
});

// ─────────────────────────────────────────────────────────────
// Body parsing
// ─────────────────────────────────────────────────────────────
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// ─────────────────────────────────────────────────────────────
// Apply rate limiters BEFORE auth middleware
// (auth endpoints exposed before verifyAuthToken)
// ─────────────────────────────────────────────────────────────
app.use("/api/auth", authLimiter);
app.use("/api/v1", apiLimiter);
app.use("/api/v1/copilot", copilotLimiter);

// ─────────────────────────────────────────────────────────────
// JWT Auth check on all routes (auth routes themselves are public
// because auth.routes.js skips token verification internally)
// ─────────────────────────────────────────────────────────────
app.use(verifyAuthToken);

app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────────────────────
// Static / Health / Root
// ─────────────────────────────────────────────────────────────
const serveStatic = path.join(__dirname, "static/index.html");

app.get("/", (req, res) => {
  res.sendFile(serveStatic);
});

/** Health endpoint used by Docker health checks */
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Zyno Construction API",
    version: "2.0.0",
  });
});

// Legacy path (kept for backward compat)
app.get("/api/health", (req, res) => res.redirect("/api/v1/health"));

// ─────────────────────────────────────────────────────────────
// Application Routes
// ─────────────────────────────────────────────────────────────
Routes.initializeRoutes(app);

// ─────────────────────────────────────────────────────────────
// Global error handler
// ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  if (err.message && err.message.startsWith("CORS")) {
    return res.status(403).json({ status: "error", message: err.message });
  }
  console.error("[Server Error]", err.stack || err.message);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});

module.exports = app;
