"use strict";

/**
 * Shared database-target guard. Used by src/config/db.js (test mode), scripts/test-mysql-ci.js
 * and scripts/migrate.js so that every entry point applies the same fail-closed rule.
 *
 * A MySQL target counts as an isolated test database only when ALL of these hold:
 *   - DB_TEST_CONFIRMED is exactly "true";
 *   - host is present, well-formed, and on the approved test-host allowlist;
 *   - host is not a known production host (the production list always wins over the allowlist);
 *   - database name contains "test" and does not look like production.
 */

// Known production hosts. Always refused, even if someone adds them to the test allowlist.
const PROHIBITED_HOSTS = Object.freeze(["13.233.140.9"]);

// Default approved test hosts. Extend with DB_TEST_HOST_ALLOWLIST (comma-separated) for CI services.
const DEFAULT_TEST_HOSTS = Object.freeze(["localhost", "127.0.0.1", "::1"]);

const HOST_PATTERN = /^[a-z0-9.-]+$/;

function parseList(raw) {
  if (!raw) return [];
  return String(raw)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function isWellFormedHost(host) {
  if (host === "::1") return true;
  return HOST_PATTERN.test(host) && !host.startsWith(".") && !host.endsWith(".") && !host.includes("..");
}

/**
 * @param {{host?: string, database?: string, confirmed?: string, allowedHosts?: string[]}} target
 * @returns {{ok: boolean, reason: string}}
 */
function evaluateTestTarget({ host, database, confirmed, allowedHosts } = {}) {
  if (confirmed !== "true") {
    return { ok: false, reason: "DB_TEST_CONFIRMED is not set to 'true'." };
  }
  if (!database) {
    return { ok: false, reason: "Database name is missing." };
  }
  if (!host) {
    return { ok: false, reason: "Database host is missing." };
  }
  const normalizedHost = String(host).trim().toLowerCase();
  if (!isWellFormedHost(normalizedHost)) {
    return { ok: false, reason: "Database host is malformed." };
  }
  if (PROHIBITED_HOSTS.includes(normalizedHost)) {
    return { ok: false, reason: "Database host is a known production host." };
  }
  if (/prod|production|live/i.test(database) || database === "Zyno_construction") {
    return { ok: false, reason: "Database name looks like production." };
  }
  if (!/test/i.test(database)) {
    return { ok: false, reason: "Database name does not identify a test database (must contain 'test')." };
  }
  const allowlist = (allowedHosts && allowedHosts.length ? allowedHosts : null)
    || parseList(process.env.DB_TEST_HOST_ALLOWLIST)
    || [];
  const approved = allowlist.length ? allowlist : DEFAULT_TEST_HOSTS;
  if (!approved.includes(normalizedHost)) {
    return { ok: false, reason: "Database host is not on the approved test-host allowlist." };
  }
  return { ok: true, reason: "Isolated test database." };
}

function isIsolatedTestMySQL(target) {
  return evaluateTestTarget(target).ok;
}

/**
 * Describe a target for display. Never includes the password, user or any secret.
 */
function describeTarget(env) {
  return {
    nodeEnv: env.NODE_ENV || "(unset)",
    dialect: env.DB_DIALECT || "(unset, defaults to mysql outside test)",
    host: env.DB_HOST || "(unset)",
    port: env.DB_PORT || "(unset)",
    database: env.DB_NAME || "(unset)",
  };
}

/**
 * Preflight for migration tooling. Returns whether the command may proceed and why.
 * Non-test MySQL targets require two explicit operator variables:
 *   MIGRATION_PRODUCTION_APPROVAL  – approval reference for this specific operation
 *   MIGRATION_BACKUP_VERIFIED      – reference of a restore-tested backup taken before the run
 * Known production hosts are refused regardless of these variables.
 */
function evaluateMigrationTarget(env) {
  const dialect = env.DB_DIALECT || "mysql";
  if (dialect === "sqlite") {
    return { ok: true, reason: "SQLite target.", target: describeTarget(env) };
  }
  if (dialect !== "mysql") {
    return { ok: false, reason: `Unsupported dialect '${dialect}'.`, target: describeTarget(env) };
  }

  const host = (env.DB_HOST || "").trim().toLowerCase();
  if (PROHIBITED_HOSTS.includes(host)) {
    return {
      ok: false,
      reason: "Known production host. Migrations against it are blocked until an authorized operational procedure exists.",
      target: describeTarget(env),
    };
  }

  const testVerdict = evaluateTestTarget({
    host: env.DB_HOST,
    database: env.DB_NAME,
    confirmed: env.DB_TEST_CONFIRMED,
  });
  if (testVerdict.ok) {
    return { ok: true, reason: testVerdict.reason, target: describeTarget(env) };
  }

  const approval = (env.MIGRATION_PRODUCTION_APPROVAL || "").trim();
  const backup = (env.MIGRATION_BACKUP_VERIFIED || "").trim();
  if (!approval || !backup) {
    return {
      ok: false,
      reason: `Non-test MySQL target refused (${testVerdict.reason}). Requires MIGRATION_PRODUCTION_APPROVAL and MIGRATION_BACKUP_VERIFIED.`,
      target: describeTarget(env),
    };
  }
  return {
    ok: true,
    reason: "Non-test target with operator approval and verified-backup reference.",
    target: describeTarget(env),
  };
}

module.exports = {
  PROHIBITED_HOSTS,
  DEFAULT_TEST_HOSTS,
  evaluateTestTarget,
  isIsolatedTestMySQL,
  evaluateMigrationTarget,
  describeTarget,
};
