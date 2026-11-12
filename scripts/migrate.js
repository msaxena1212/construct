#!/usr/bin/env node
'use strict';
require('dotenv').config();
const path = require('path');
const { evaluateMigrationTarget } = require('../src/config/database_target_guard');

const COMMANDS = ['status', 'up', 'down'];

/**
 * Fail-closed preflight. Runs before any database module is loaded or any connection is opened.
 * Prints the target without credentials, then refuses anything that is not an approved SQLite target
 * (see src/config/database_target_guard.js). There is no production override.
 */
function preflight(command) {
  if (!COMMANDS.includes(command)) {
    console.error(`Unknown command: ${command}. Use 'up', 'down', or 'status'.`);
    process.exit(1);
  }
  const verdict = evaluateMigrationTarget(process.env);
  const t = verdict.target;
  console.log('--- Migration target preflight ---');
  console.log(`  command:     ${command}`);
  console.log(`  NODE_ENV:    ${t.nodeEnv}`);
  console.log(`  class:       ${t.targetClass}`);
  console.log(`  dialect:     ${t.dialect}`);
  console.log(`  storage:     ${t.storage}`);
  console.log(`  verdict:     ${verdict.ok ? 'ALLOWED' : 'REFUSED'} - ${verdict.reason}`);
  console.log('----------------------------------');
  if (!verdict.ok) {
    process.exit(1);
  }
  // Application-level guard: the same declaration the application requires before it connects.
  require('../src/config/database_target_guard').assertDatabaseTarget(process.env);
}

async function main() {
  const command = process.argv[2] || 'status';
  preflight(command);

  const { sequelize } = require('../src/config/db');
  const MigrationRunner = require('../src/core/utils/migrator');
  const runner = new MigrationRunner(sequelize, path.resolve(__dirname, '../migrations'));

  try {
    if (command === 'status') {
      const status = await runner.getStatus();
      console.log('\n--- Migration Status ---');
      status.forEach((m) => {
        console.log(`[${m.applied ? 'APPLIED' : 'PENDING'}] ${m.name}`);
      });
      console.log('------------------------\n');
    } else if (command === 'up') {
      const results = await runner.up();
      console.log(`Applied ${results.length} migration(s).`);
    } else if (command === 'down') {
      const steps = parseInt(process.argv[3], 10) || 1;
      const results = await runner.down(steps);
      console.log(`Rolled back ${results.length} migration(s).`);
    }
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  main();
}
