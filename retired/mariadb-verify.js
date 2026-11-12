#!/usr/bin/env node
'use strict';
/**
 * Verification of the migration chain on an ISOLATED, DISPOSABLE MariaDB 10.6 instance.
 *
 * Requires separate settings (never production credentials):
 *   MARIADB_VERIFY_HOST, MARIADB_VERIFY_PORT, MARIADB_VERIFY_USER, MARIADB_VERIFY_PASSWORD,
 *   MARIADB_VERIFY_DATABASE (must end with _disposable)
 *
 * Fails closed:
 *   - exit 2 with BLOCKED when no settings are supplied (nothing is attempted);
 *   - refuses the production host, a database name without the _disposable suffix, and a server
 *     version that is not 10.6.
 * It never runs against the application's DB_* settings.
 */
const { Sequelize } = require('sequelize');
const path = require('path');
const { PROHIBITED_HOSTS } = require('../../src/config/db_target_guard');
const MigrationRunner = require('../../src/core/utils/migrator');
const { introspectTable, listTables } = require('./introspect');
const { diffTable } = require('./adopt-report');
const { assertDatabaseTarget } = require('../../src/config/database_target_guard');

const ROOT = path.resolve(__dirname, '../..');
const CANONICAL = require('./canonical-schema.json');

async function main() {
  const env = process.env;
  const required = ['MARIADB_VERIFY_HOST', 'MARIADB_VERIFY_USER', 'MARIADB_VERIFY_PASSWORD', 'MARIADB_VERIFY_DATABASE', 'MARIADB_VERIFY_CONFIRMED'];
  const missing = required.filter((k) => !env[k]);
  if (missing.length) {
    console.log(`BLOCKED: no isolated MariaDB 10.6 target configured (missing ${missing.join(', ')}). Nothing was attempted.`);
    process.exit(2);
  }
  const host = env.MARIADB_VERIFY_HOST.trim();
  const database = env.MARIADB_VERIFY_DATABASE.trim();
  if (PROHIBITED_HOSTS.includes(host.toLowerCase())) {
    console.error('REFUSED: the production host is never used for verification.');
    process.exit(1);
  }
  if (!/_disposable$/.test(database)) {
    console.error('REFUSED: MARIADB_VERIFY_DATABASE must end with _disposable.');
    process.exit(1);
  }

  // Same guard as the application: isolated_test, MySQL, disposable name, explicit confirmation.
  assertDatabaseTarget({
    NODE_ENV: 'test',
    DB_TARGET_CLASS: 'isolated_test',
    DB_DIALECT: 'mysql',
    DB_HOST: host,
    DB_NAME: database,
    DB_USER: env.MARIADB_VERIFY_USER,
    DB_PASSWORD: env.MARIADB_VERIFY_PASSWORD,
    DB_TEST_CONFIRMED: env.MARIADB_VERIFY_CONFIRMED,
    DB_TEST_HOST_ALLOWLIST: env.MARIADB_VERIFY_ALLOWLIST || '',
  });
  const sequelize = new Sequelize(database, env.MARIADB_VERIFY_USER, env.MARIADB_VERIFY_PASSWORD, {
    host,
    port: Number(env.MARIADB_VERIFY_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  });
  try {
    const [[version]] = await sequelize.query('SELECT VERSION() AS v');
    if (!/10\.6/.test(version.v)) {
      console.error(`REFUSED: server version ${version.v} is not MariaDB 10.6.`);
      process.exit(1);
    }
    const qi = sequelize.getQueryInterface();
    const existing = await listTables(qi);
    if (existing.length) {
      console.error(`REFUSED: ${existing.length} table(s) already exist; a fresh-install verification needs an empty database.`);
      process.exit(1);
    }

    const runner = new MigrationRunner(sequelize, path.join(ROOT, 'migrations'));
    const applied = await runner.up();
    console.log(`Applied ${applied.length} migration(s).`);

    const problems = [];
    const tables = await listTables(qi);
    if (tables.join() !== Object.keys(CANONICAL.tables).sort().join()) problems.push('table set differs from canonical snapshot');
    for (const t of tables) {
      for (const i of diffTable(CANONICAL.tables[t], await introspectTable(qi, t))) problems.push(`${t}: ${i.kind} ${i.detail}`);
    }
    console.log(`Schema differences: ${problems.length}`);
    problems.slice(0, 40).forEach((p) => console.log(`  ${p}`));

    const undone = await runner.down(CANONICAL.migrations.length);
    console.log(`Rolled back ${undone.length} migration(s).`);
    const left = await listTables(qi);
    console.log(`Tables after rollback (excluding bookkeeping): ${left.length}`);
    process.exitCode = problems.length === 0 && left.length === 0 ? 0 : 1;
  } finally {
    await sequelize.close();
  }
}

main().catch((err) => {
  console.error('MariaDB verification failed:', err.message);
  process.exit(1);
});
