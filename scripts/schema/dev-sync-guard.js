'use strict';
/**
 * Fail-closed guard for development-only Sequelize synchronization.
 *
 * Schema changes belong in versioned migrations. Synchronization is retained only for a throwaway local
 * SQLite file (or an in-memory database) that the developer explicitly opts into. Every other target is
 * refused, including MySQL and MariaDB hosts, remote hosts, the production address and any file that is
 * not named as disposable. Unknown or missing settings are refused.
 */
const path = require('path');
const { PROHIBITED_HOSTS } = require('../../src/config/database_target_guard');
const { resolveApprovedSqlitePath } = require('../../src/config/sqlite_policy');

const OPT_IN = 'ZYNO_DEV_SYNC';
const DISPOSABLE_SUFFIX = '.disposable.sqlite';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

function evaluateDevSyncTarget(env) {
  const refuse = (reason) => ({ ok: false, reason });

  if (env.NODE_ENV === 'production') return refuse('NODE_ENV is production; synchronization is never allowed.');
  if (env[OPT_IN] !== '1') return refuse(`Opt-in flag ${OPT_IN}=1 is not set. Synchronization is disabled by default.`);

  // Any production address in any setting is a hard stop, regardless of the other values.
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === 'string' && PROHIBITED_HOSTS.some((h) => value.includes(h))) {
      return refuse(`Setting ${key} references a prohibited production host.`);
    }
  }

  const dialect = env.DB_DIALECT;
  if (dialect !== 'sqlite') return refuse(`DB_DIALECT must be explicitly 'sqlite' (got '${dialect || 'unset'}').`);

  if (env.DB_HOST && !LOCAL_HOSTS.has(env.DB_HOST)) return refuse(`DB_HOST '${env.DB_HOST}' is not a local address.`);

  const storage = env.DB_STORAGE;
  if (!storage) return refuse('DB_STORAGE is not set.');
  if (storage === ':memory:') return { ok: true, reason: 'In-memory SQLite database.', storage };
  if (!storage.toLowerCase().endsWith(DISPOSABLE_SUFFIX)) {
    return refuse(`DB_STORAGE must be a file ending in ${DISPOSABLE_SUFFIX}.`);
  }
  // Inside the approved root only. Symbolic links and '..' are resolved by the shared policy.
  try {
    const resolved = resolveApprovedSqlitePath(storage);
    return { ok: true, reason: 'Explicitly disposable SQLite file inside the approved root.', storage: resolved };
  } catch (err) {
    return refuse(err.message);
  }
}

/** Throws unless the target passes. Scripts call this before opening any connection. */
function assertDevSyncTarget(env) {
  const verdict = evaluateDevSyncTarget(env);
  if (!verdict.ok) {
    const err = new Error(`DEV_SYNC_REFUSED: ${verdict.reason}`);
    err.code = 'DEV_SYNC_REFUSED';
    throw err;
  }
  return verdict;
}

module.exports = { evaluateDevSyncTarget, assertDevSyncTarget, OPT_IN, DISPOSABLE_SUFFIX };
