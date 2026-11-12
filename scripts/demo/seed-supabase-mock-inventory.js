#!/usr/bin/env node
'use strict';
/**
 * Company-level inventory and categories for the hosted Supabase database (DB_TARGET_CLASS=supabase_cloud).
 *
 * Run after seed-supabase-mock.js. It adds:
 *   - one MATERIAL_INVENTORY row per material master (read by the Material Inventory list);
 *   - one EQUIPMENT_INVENTORY row per equipment master (read by the Equipment Fleet list);
 *   - the CATEGORY master used by the Categories screen.
 * Idempotent: a table that already has rows is left alone.
 *
 * Usage (from the backend folder):
 *   node scripts/demo/seed-supabase-mock-inventory.js
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

const CATEGORIES = [
  ['Cement', 'material'], ['Steel', 'material'], ['Masonry', 'material'], ['Aggregates', 'material'],
  ['Concrete', 'equipment'], ['Lifting', 'equipment'], ['Earthmoving', 'equipment'],
];

async function main() {
  await db.sequelize.transaction(async (t) => {
    const cid = COMPANY_ID;

    if ((await db.category.count({ where: { company_id: cid }, transaction: t })) === 0) {
      for (const [category_name, category_type] of CATEGORIES) {
        await db.category.create({ company_id: cid, category_name, category_type, status: 'ACTIVE', isDeleted: false }, { transaction: t });
      }
      console.log(`categories: ${CATEGORIES.length} added`);
    } else {
      console.log('categories: already present, skipped');
    }

    if ((await db.material.count({ where: { company_id: cid }, transaction: t })) === 0) {
      const masters = await db.material_master.findAll({ where: { company_id: cid }, transaction: t });
      for (const m of masters) {
        const stockIn = 500;
        const stockUsed = 120;
        await db.material.create({
          company_id: cid, material_master_id: m.id, name: m.name, sku: m.sku, category: m.category,
          stockIn, stockUsed, stockRemaining: stockIn - stockUsed, cost: m.cost, status: 'active', isActive: true, isDeleted: false,
        }, { transaction: t });
      }
      console.log(`material inventory: ${masters.length} added`);
    } else {
      console.log('material inventory: already present, skipped');
    }

    if ((await db.equipment.count({ where: { company_id: cid }, transaction: t })) === 0) {
      const masters = await db.equipment_master.findAll({ where: { company_id: cid }, transaction: t });
      for (const m of masters) {
        const stockIn = 3;
        const stockUsed = 1;
        await db.equipment.create({
          company_id: cid, equipment_master_id: m.id, name: m.name, sku: m.sku, category: m.category,
          stockIn, stockUsed, stockRemaining: stockIn - stockUsed, cost: '0', status: 'active', isActive: true, isDeleted: false,
        }, { transaction: t });
      }
      console.log(`equipment inventory: ${masters.length} added`);
    } else {
      console.log('equipment inventory: already present, skipped');
    }
  });
}

main()
  .catch((err) => {
    console.error('SEED_FAILED:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.sequelize.close());
