require('dotenv').config();
/*
 * DEVELOPMENT ONLY. Schema changes must go through versioned migrations (npm run migrate).
 * This script runs only against an explicitly disposable local SQLite target with ZYNO_DEV_SYNC=1.
 * It never uses ALTER, and it refuses MySQL/MariaDB, remote hosts, production and shared files.
 */
const { assertDevSyncTarget } = require('./schema/dev-sync-guard');
assertDevSyncTarget(process.env); // throws before any model or connection is loaded

const db = require('../src/models');

async function sync() {
  const models = [
    'cbs',
    'wbs',
    'budget',
    'budget_head',
    'budget_head_allocation',
    'budget_line',
    'commitment_ledger',
    'cost_ledger',
    'measurement_book',
    'contractor_ra_bill',
    'measurement_book_item',
    'variation_order',
    'variation_order_item',
  ];

  console.log('Syncing models (development only, disposable target) ...');
  for (const name of models) {
    if (db[name]) {
      process.stdout.write(`Syncing ${name}... `);
      await db[name].sync();
      console.log('DONE');
    } else {
      console.warn(`Model ${name} not found in db.`);
    }
  }

  console.log('\nAll construction models synchronized successfully!');
  process.exit(0);
}

sync().catch((err) => {
  console.error('\nError syncing models:', err);
  process.exit(1);
});
