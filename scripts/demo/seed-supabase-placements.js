#!/usr/bin/env node
'use strict';
/**
 * Opening stock placements for the hosted Supabase database (DB_TARGET_CLASS=supabase_cloud).
 *
 * Project inventory and transfers read balances from the stock ledger, which is empty after the mock seed.
 * This script places part of each project's material stock into that project's store, using the application's
 * own placement service (StockTransferService.placeStock), so the ledger is written the same way as in the UI.
 * Each placement has a fixed idempotency key, so re-running it does nothing.
 *
 * Usage (from the backend folder):
 *   node scripts/demo/seed-supabase-placements.js
 */
require('dotenv').config({ quiet: true });
const path = require('path');
const { assertDatabaseTarget } = require('../../src/config/database_target_guard');

const ROOT = path.resolve(__dirname, '../..');
const COMPANY_ID = 1;
const ACTOR = { id: 1 };
const SHARE = 0.4; // place 40% of each project's stock into the project store

if (process.env.DB_TARGET_CLASS !== 'supabase_cloud' || process.env.DB_DIALECT !== 'postgres') {
  console.error('SEED_REFUSED: set DB_TARGET_CLASS=supabase_cloud and DB_DIALECT=postgres (see .env).');
  process.exit(1);
}
assertDatabaseTarget(process.env);

const db = require(path.join(ROOT, 'src/models'));
const StockTransferService = require(path.join(ROOT, 'src/modules/material/services/stock_transfer.service'));

async function main() {
  const rows = await db.material_project_stock.findAll({ where: { company_id: COMPANY_ID }, order: [['project_id', 'ASC'], ['id', 'ASC']] });
  let placed = 0;
  let skipped = 0;
  const failures = [];

  for (const row of rows) {
    const location = await db.store_location.findOne({
      where: { company_id: COMPANY_ID, project_id: row.project_id, status: 'active' },
      order: [['id', 'ASC']],
    });
    if (!location) {
      failures.push(`project ${row.project_id}: no active store location`);
      continue;
    }
    const qty = Math.floor(Number(row.stockIn || 0) * SHARE);
    if (qty <= 0) {
      skipped++;
      continue;
    }
    try {
      await StockTransferService.placeStock(COMPANY_ID, ACTOR, {
        project_id: row.project_id,
        material_id: row.id,
        location_id: location.id,
        quantity: qty,
        reason: 'Opening stock (demo seed)',
        idempotency_key: `demo-open-${row.project_id}-${row.id}`,
      });
      placed++;
    } catch (err) {
      failures.push(`project ${row.project_id} material ${row.id}: ${err.message}`);
    }
  }

  console.log(`placements recorded: ${placed}, skipped (no stock): ${skipped}, failed: ${failures.length}`);
  for (const f of failures) console.log('  - ' + f);
}

main()
  .catch((err) => {
    console.error('SEED_FAILED:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.sequelize.close());
