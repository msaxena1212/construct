"use strict";
/**
 * SQLite-only database policy for the Zyno Construction ERP.
 *
 * SQLite is the only permitted database. Every persistent SQLite file must resolve to a location inside the
 * approved root on drive E:. Anything else is refused, including relative paths, paths that escape the root
 * through "..", symbolic links that point outside the root, other drives, URLs and network paths.
 *
 * This module is the single definition of the root. Scripts and tests import it instead of hard-coding paths.
 */
const fs = require("fs");
const path = require("path");

const APPROVED_ROOT = path.win32.normalize("E:\\Port\\Construction\\_sqlite_work");

/** Lower-cased, separator-normalised form used for every containment comparison (Windows is case-insensitive). */
function comparable(p) {
  return path.win32.normalize(p).replace(/\//g, "\\").replace(/\\+$/, "").toLowerCase();
}

function isInside(root, candidate) {
  const r = comparable(root);
  const c = comparable(candidate);
  if (c === r) return false; // the root folder itself is not a database file
  return c.startsWith(r + "\\");
}

function realpathOrNull(p) {
  try {
    return fs.realpathSync.native(p);
  } catch (_err) {
    return null;
  }
}

/**
 * Resolves a configured SQLite storage value to an approved absolute path, or throws a coded error.
 * `mustExist` is false for files the caller is about to create.
 */
function resolveApprovedSqlitePath(storage, { root = APPROVED_ROOT } = {}) {
  if (typeof storage !== "string" || storage.trim() === "") {
    throw policyError("SQLITE_PATH_MISSING", "No SQLite file path is configured.");
  }
  const value = storage.trim();
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) {
    throw policyError("SQLITE_PATH_URL", "A URL is not a permitted SQLite location.");
  }
  if (!path.win32.isAbsolute(value) && !path.posix.isAbsolute(value)) {
    throw policyError("SQLITE_PATH_RELATIVE", "The SQLite path must be absolute.");
  }
  if (/^\\\\|^\/\//.test(value)) {
    throw policyError("SQLITE_PATH_NETWORK", "Network share paths are not permitted for SQLite.");
  }
  const absolute = path.win32.normalize(value);
  if (!/^[Ee]:\\/.test(absolute)) {
    throw policyError("SQLITE_PATH_DRIVE", "The SQLite file must be on drive E:.");
  }
  if (!isInside(root, absolute)) {
    throw policyError("SQLITE_PATH_OUTSIDE_ROOT", `The SQLite file must be inside ${root}.`);
  }
  // Symbolic-link escape check: the real location of the file (or of its folder) must also be inside the root.
  const real = realpathOrNull(absolute) || realpathOrNull(path.win32.dirname(absolute));
  if (real && !isInside(root, real) && comparable(real) !== comparable(root)) {
    throw policyError("SQLITE_PATH_LINK_ESCAPE", "The SQLite path resolves through a link outside the approved root.");
  }
  return absolute;
}

function policyError(code, message) {
  const err = new Error(`SQLITE_POLICY: ${message}`);
  err.code = code;
  return err;
}

module.exports = {
  APPROVED_ROOT,
  isInside,
  resolveApprovedSqlitePath,
  comparable,
};
