#!/usr/bin/env node
'use strict';
/**
 * Links project stock to company inventory on the hosted Supabase database (DB_TARGET_CLASS=supabase_cloud).
 *
 * The Materials and Equipment screens show a material as "Assigned" only when its inventory row has project stock
 * rows (material_project_stock / equipment_project_stock, matched on material_id / equipment_id). The mock seed
 * left those links empty. This script sets them by SKU. Rows that already have a link are left alone, so the
 * script is safe to re-run.
 *
 * Usage (from the backend folder):
 *   node scripts/demo/seed-supabase-assignments.js
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

async function main() {
  await db.sequelize.transaction(async (t) => {
    const { Op } = db.Sequelize;

    const materials = await db.material.findAll({ where: { company_id: COMPANY_ID }, transaction: t });
    const materialBySku = new Map(materials.map((m) => [m.sku, m.id]));
    let linkedMaterials = 0;
    const pendingMaterials = await db.material_project_stock.findAll({ where: { company_id: COMPANY_ID, material_id: { [Op.is]: null } }, transaction: t });
    for (const row of pendingMaterials) {
      const id = materialBySku.get(row.sku);
      if (id) {
        await row.update({ material_id: id }, { transaction: t });
        linkedMaterials++;
      }
    }

    const equipment = await db.equipment.findAll({ where: { company_id: COMPANY_ID }, transaction: t });
    const equipmentBySku = new Map(equipment.map((e) => [e.sku, e.id]));
    let linkedEquipment = 0;
    const pendingEquipment = await db.equipment_project_stock.findAll({ where: { company_id: COMPANY_ID, equipment_id: { [Op.is]: null } }, transaction: t });
    for (const row of pendingEquipment) {
      const id = equipmentBySku.get(row.sku);
      if (id) {
        await row.update({ equipment_id: id }, { transaction: t });
        linkedEquipment++;
      }
    }

    console.log(`material project stock linked: ${linkedMaterials}`);
    console.log(`equipment project stock linked: ${linkedEquipment}`);
  });
}

main()
  .catch((err) => {
    console.error('SEED_FAILED:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.sequelize.close());
