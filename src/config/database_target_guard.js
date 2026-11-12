"use strict";

/**
 * Application-level database target guard (SQLite-only).
 *
 * SQLite is the only permitted database for this project. src/config/db.js calls assertDatabaseTarget() before it
 * creates a Sequelize instance, so a refused target throws at require time and no connection is opened.
 * Standalone tools that build their own connection must call the same function first.
 *
 * Rules (all must hold; anything unknown is refused):
 *   1. No production host appears in any environment value, whatever the other settings say.
 *   2. NODE_ENV=production is refused: no approved production database path exists in this build.
 *   3. DB_TARGET_CLASS is declared explicitly as one of:
 *        isolated_test - unit and integration tests: in-memory SQLite (":memory:") or a file ending in
 *                        .disposable.sqlite inside the approved root.
 *        local_demo    - a file ending in .sqlite inside the approved root (demonstration and development).
 *   4. DB_DIALECT is declared explicitly and must be "sqlite". MySQL, MariaDB, PostgreSQL and any other
 *      dialect are refused (project policy).
 *   5. Every file path must be absolute, on drive E:, inside the approved root, and not reached through a link
 *      that leaves the root (see src/config/sqlite_policy.js).
 */

const path = require("path");
const { resolveApprovedSqlitePath, APPROVED_ROOT } = require("./sqlite_policy");

// Known production hosts. Refused in any setting, even though SQLite does not use a host.
const PROHIBITED_HOSTS = Object.freeze(["13.233.140.9"]);

const TARGET_CLASSES = Object.freeze(["isolated_test", "local_demo", "neon_cloud", "supabase_cloud"]);
// Hosted PostgreSQL targets. Only these classes may use DB_DIALECT=postgres.
const POSTGRES_CLOUD_CLASSES = Object.freeze(["neon_cloud", "supabase_cloud"]);
const DIALECTS = Object.freeze(["sqlite", "postgres"]);
const DISPOSABLE_SQLITE = /\.disposable\.sqlite$/i;
const DEMO_SQLITE = /\.sqlite$/i;

/**
 * Returns { ok, reason, target } without throwing. The summary never includes credentials.
 * @param {Record<string, string | undefined>} env
 */
function evaluateDatabaseTarget(env) {
  const summary = {
    nodeEnv: env.NODE_ENV || "(unset)",
    targetClass: env.DB_TARGET_CLASS || "(unset)",
    dialect: env.DB_DIALECT || "(unset)",
    storage: env.DB_STORAGE || "(unset)",
    databaseUrlSet: Boolean(env.DATABASE_URL),
  };
  const refuse = (reason) => ({ ok: false, reason, target: summary });

  // Rule 1.
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === "string" && PROHIBITED_HOSTS.some((h) => value.includes(h))) {
      return refuse(`Setting ${key} references a prohibited production host.`);
    }
  }

  // Rule 2.
  if (env.NODE_ENV === "production" && !POSTGRES_CLOUD_CLASSES.includes(env.DB_TARGET_CLASS)) {
    return refuse("NODE_ENV=production is refused without an approved cloud target class.");
  }

  // Rule 3.
  if (!env.DB_TARGET_CLASS) {
    return refuse("DB_TARGET_CLASS is not set. Declare isolated_test, local_demo, neon_cloud, or supabase_cloud explicitly.");
  }
  if (!TARGET_CLASSES.includes(env.DB_TARGET_CLASS)) {
    return refuse(`DB_TARGET_CLASS '${env.DB_TARGET_CLASS}' is not an approved class.`);
  }

  // Rule 4.
  if (!env.DB_DIALECT) return refuse("DB_DIALECT is not set. There is no default dialect.");
  if (!DIALECTS.includes(env.DB_DIALECT)) {
    return refuse(`DB_DIALECT '${env.DB_DIALECT}' is not permitted.`);
  }

  // Hosted PostgreSQL target (Neon or Supabase)
  if (env.DB_DIALECT === "postgres" || POSTGRES_CLOUD_CLASSES.includes(env.DB_TARGET_CLASS)) {
    if (env.DB_DIALECT !== "postgres") {
      return refuse(`${env.DB_TARGET_CLASS} target requires DB_DIALECT=postgres.`);
    }
    if (!POSTGRES_CLOUD_CLASSES.includes(env.DB_TARGET_CLASS)) {
      return refuse("PostgreSQL is permitted only for the neon_cloud or supabase_cloud target class.");
    }
    if (!env.DATABASE_URL && !env.DB_HOST) {
      return refuse("DATABASE_URL or DB_HOST must be provided for postgres/cloud targets.");
    }
    return {
      ok: true,
      reason: `Approved ${env.DB_TARGET_CLASS} PostgreSQL database target.`,
      target: summary,
    };
  }

  // Rule 5 (SQLite).
  const storage = env.DB_STORAGE;
  if (storage === ":memory:") {
    if (env.DB_TARGET_CLASS !== "isolated_test") {
      return refuse("In-memory SQLite is allowed only for isolated_test.");
    }
    return { ok: true, reason: "In-memory SQLite test database.", target: summary };
  }
  if (!storage) return refuse("DB_STORAGE is not set.");

  let resolved;
  try {
    resolved = resolveApprovedSqlitePath(storage);
  } catch (err) {
    return refuse(`${err.message} (approved root: ${APPROVED_ROOT}).`);
  }
  if (env.DB_TARGET_CLASS === "isolated_test" && !DISPOSABLE_SQLITE.test(resolved)) {
    return refuse("isolated_test SQLite files must end in .disposable.sqlite.");
  }
  if (env.DB_TARGET_CLASS === "local_demo" && !DEMO_SQLITE.test(resolved)) {
    return refuse("local_demo SQLite files must end in .sqlite.");
  }
  return {
    ok: true,
    reason: `Approved SQLite file for ${env.DB_TARGET_CLASS}.`,
    target: { ...summary, storage: resolved },
  };
}

/** Throws unless the target passes. Callers must invoke this before opening any connection. */
function assertDatabaseTarget(env) {
  const verdict = evaluateDatabaseTarget(env);
  if (!verdict.ok) {
    const err = new Error(`DB_TARGET_REFUSED: ${verdict.reason}`);
    err.code = "DB_TARGET_REFUSED";
    err.target = verdict.target;
    throw err;
  }
  return verdict;
}

/**
 * Preflight for the migration command. SQLite inside the approved root only; everything else is refused.
 * Kept under this name because scripts/migrate.js imports it.
 */
function evaluateMigrationTarget(env) {
  // No default class: the migration command must be given an explicit, approved declaration.
  return evaluateDatabaseTarget(env);
}

module.exports = {
  PROHIBITED_HOSTS,
  TARGET_CLASSES,
  DIALECTS,
  APPROVED_ROOT,
  evaluateDatabaseTarget,
  assertDatabaseTarget,
  evaluateMigrationTarget,
};
