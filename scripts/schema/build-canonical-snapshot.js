#!/usr/bin/env node
'use strict';
/**
 * Builds scripts/schema/canonical-schema.json by applying every migration to a NEW, empty, disposable
 * SQLite file in the OS temp directory and introspecting the result. The snapshot is the expected state
 * for adoption reports. Nothing else is read or written.
 *
 * Usage: node scripts/schema/build-canonical-snapshot.js
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { sqliteWorkDir } = require('./sqlite-work-dir');
const { Sequelize } = require('sequelize');
const MigrationRunner = require('../../src/core/utils/migrator');
const { introspectTable, listTables } = require('./introspect');
const { assertDatabaseTarget } = require('../../src/config/database_target_guard');

const ROOT = path.resolve(__dirname, '../..');
const OUTPUT = path.join(__dirname, 'canonical-schema.json');

async function main() {
  const file = path.join(sqliteWorkDir(), `zyno-canonical-${process.pid}-${Date.now()}.disposable.sqlite`);
  assertDatabaseTarget({ DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'sqlite', DB_STORAGE: file });
  const sequelize = new Sequelize({ dialect: 'sqlite', storage: file, logging: false });
  try {
    const runner = new MigrationRunner(sequelize, path.join(ROOT, 'migrations'));
    await runner.up();
    const qi = sequelize.getQueryInterface();
    const tables = {};
    for (const t of await listTables(qi)) tables[t] = await introspectTable(qi, t);
    const migrations = (await runner.getStatus()).map((m) => m.name);
    const baseline = require(path.join(ROOT, 'migrations', '20261001000000-canonical-core-schema-baseline.js'));
    const snapshot = {
      generatedFrom: 'every migration applied to an empty disposable SQLite database',
      migrations,
      baselineTables: baseline.tableOrder,
      tables,
    };
    fs.writeFileSync(OUTPUT, JSON.stringify(snapshot, null, 1) + '\n', 'utf8');
    console.log(`Wrote ${path.relative(ROOT, OUTPUT)}: ${Object.keys(tables).length} tables, ${migrations.length} migrations.`);
  } finally {
    await sequelize.close();
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
}

main().catch((err) => {
  console.error('snapshot failed:', err.message);
  process.exit(1);
});
