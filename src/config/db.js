const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");
const { assertDatabaseTarget } = require("./database_target_guard");
const { resolveApprovedSqlitePath, isInside, APPROVED_ROOT } = require("./sqlite_policy");

// Fail closed before any connection is opened. Target must be declared explicitly.
assertDatabaseTarget(process.env);

let sequelize;
let storage = null;

if (process.env.DB_DIALECT === "postgres") {
  const databaseUrl = process.env.DATABASE_URL;
  const isSsl = process.env.DB_SSL === "true" || (databaseUrl && databaseUrl.includes("sslmode="));

  const pgOptions = {
    dialect: "postgres",
    logging: false,
    pool: {
      max: 15,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: isSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  };

  if (databaseUrl) {
    sequelize = new Sequelize(databaseUrl, pgOptions);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME || "neondb",
      process.env.DB_USER || "neondb_owner",
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        ...pgOptions,
      }
    );
  }
} else {
  storage =
    process.env.DB_STORAGE === ":memory:" ? ":memory:" : resolveApprovedSqlitePath(process.env.DB_STORAGE);
  sequelize = new Sequelize({ dialect: "sqlite", storage, logging: false });
}

/**
 * Opens the database and prints diagnostics: dialect, host/file, environment mode, and how many migrations are pending.
 */
const connectDB = async () => {
  await sequelize.authenticate();
  if (sequelize.getDialect() === "postgres") {
    let hostName = sequelize.config.host;
    try {
      if (!hostName && process.env.DATABASE_URL) {
        hostName = new URL(process.env.DATABASE_URL).host;
      }
    } catch (_) {}
    console.log(
      `[db] dialect=postgres host=${hostName || "neon"} db=${sequelize.config.database || "neondb"} ` +
        `env=${process.env.NODE_ENV || "development"}`
    );
  } else {
    const inRoot = storage === ":memory:" ? "n/a (in-memory)" : String(isInside(APPROVED_ROOT, storage));
    console.log(
      `[db] dialect=sqlite file=${storage === ":memory:" ? ":memory:" : path.basename(storage)} ` +
        `insideApprovedRoot=${inRoot} env=${process.env.NODE_ENV || "development"}`
    );
  }
  try {
    const MigrationRunner = require("../core/utils/migrator");
    const runner = new MigrationRunner(sequelize);
    const applied = await runner.readAppliedIfPresent();
    const pending = runner.getAvailableMigrations().filter((file) => !applied.includes(file)).length;
    console.log(`[db] migrations pending=${pending}`);
  } catch (err) {
    console.error("[db] migration status unavailable:", err.message);
  }
};

module.exports = { sequelize, connectDB, DataTypes, Model, Sequelize };
