require("dotenv").config();
// Database target guard first: an unsafe or undeclared target stops startup before any module is loaded.
require("./src/config/database_target_guard").assertDatabaseTarget(process.env);
// GOOGLE_MAPS_API_KEY (if needed) must be provided via environment variables only.
const missing = ["JWT_SECRET"].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}
if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET.length < 32) {
  console.error("JWT_SECRET must be at least 32 characters in production.");
  process.exit(1);
}
const app = require("./src/app");
const { connectDB } = require("./src/config/db");
const PORT = process.env.SERVER_PORT || 6568;

connectDB();

app.listen(PORT, () => {
  console.log(` \u001b[1;32m Server is running on port ${PORT}. \u001b[0m`);
  // Agents run on a timer only when AGENTS_AUTORUN_MINUTES is set to a positive number.
  const scheduler = require("./src/modules/projects/services/agent_scheduler");
  scheduler.startAgentScheduler(process.env.AGENTS_AUTORUN_MINUTES);
  scheduler.startMorningBriefingScheduler(process.env.DIRECTOR_BRIEFING_HOUR, process.env.DIRECTOR_BRIEFING_MINUTE);
});

