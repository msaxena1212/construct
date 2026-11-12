"use strict";
/**
 * Working directory for disposable SQLite files used by verification tests and schema tools.
 *
 * Verification databases are kept on drive E, not on the system drive (C:), because C: has limited free
 * space on the development machine. The directory is outside both repositories, is never committed, and
 * is refused if it resolves to any other drive. The root is fixed by policy; configuration cannot override it.
 */
const fs = require("fs");
const path = require("path");
const { APPROVED_ROOT } = require("../../src/config/sqlite_policy");

const DEFAULT_DIR = APPROVED_ROOT;

/** The approved root. It is fixed by policy and cannot be overridden by configuration. */
function sqliteWorkDir() {
  fs.mkdirSync(DEFAULT_DIR, { recursive: true });
  return DEFAULT_DIR;
}

/** A unique disposable file name inside the work directory. */
function disposableSqlitePath(label, random) {
  return path.join(sqliteWorkDir(), `${label}-${random}.disposable.sqlite`);
}

module.exports = { sqliteWorkDir, disposableSqlitePath, DEFAULT_DIR };
