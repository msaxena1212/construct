#!/usr/bin/env node
'use strict';
/**
 * Extra store locations per project on the hosted Supabase database (DB_TARGET_CLASS=supabase_cloud).
 *
 * Each mock project has one store, so the source and destination pickers on the stock-transfer form offer a single
 * choice. This adds two site stores per project so transfers can move stock between locations. Codes are unique per
 * company, and existing codes are skipped, so the script is safe to re-run.
 *
 * Usage (from the backend folder):
 *   node scripts/demo/seed-supabase-store-locations.js
 */
require('dotenv').config({ quiet: true });
const path = require('path');
const { assertDatabaseTarget } = require('../../src/config/database_target_guard');

const ROOT = path.resolve(__dirname, '../..');
const COMPANY_ID = 1;

if (process.env.DB_TARGET_CLASS !== 'supabase_cloud' || process.env.DB_DIALECT !== 'postgres') {
  console.error('SEED_REFUSED: set DB_TARGET_CLASS=supabase_cloud and DB_DIALECT=postgres (see .env).');
  process.exit(1);
}
assertDatabaseTarget(process.env);

const db = require(path.join(ROOT, 'src/models'));

const EXTRA = [
  { suffix: 'ZA', name: 'Zone A site store', location_type: 'site_store' },
  { suffix: 'ZB', name: 'Zone B site store', location_type: 'site_store' },
];

async function main() {
  const projects = await db.project.findAll({ where: { company_id: COMPANY_ID }, order: [['id', 'ASC']] });
  let added = 0;
  let skipped = 0;
  await db.sequelize.transaction(async (t) => {
    for (const p of projects) {
      const base = (p.project_code || `P${p.id}`).replace(/[^A-Za-z0-9-]/g, '');
      for (const loc of EXTRA) {
        const code = `${base}-${loc.suffix}`;
        const exists = await db.store_location.findOne({ where: { company_id: COMPANY_ID, code }, transaction: t });
        if (exists) {
          skipped++;
          continue;
        }
        await db.store_location.create({
          company_id: COMPANY_ID, project_id: p.id, code, name: `${p.name} - ${loc.name}`,
          location_type: loc.location_type, status: 'active',
        }, { transaction: t });
        added++;
      }
    }
  });
  console.log(`store locations added: ${added}, already present: ${skipped}`);
}

main()
  .catch((err) => {
    console.error('SEED_FAILED:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.sequelize.close());
