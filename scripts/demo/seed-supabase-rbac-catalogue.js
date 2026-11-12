#!/usr/bin/env node
'use strict';
/**
 * Menu catalogue and Super Admin permissions for the hosted Supabase database (DB_TARGET_CLASS=supabase_cloud).
 *
 * The permission middleware answers "Module not found" (404) for any route whose module row is missing from
 * rbac_module, so the material, equipment and other menus are unreachable on a fresh database. This script:
 *   1. creates the canonical rbac_module rows (MenuRegistryService.seedCanonicalMenus, idempotent);
 *   2. grants the existing "Super Admin" role full access to every module that has no grant yet.
 * It creates no users. Re-running it changes nothing.
 *
 * Usage (from the backend folder):
 *   node scripts/demo/seed-supabase-rbac-catalogue.js
 */
require('dotenv').config({ quiet: true });
const path = require('path');
const { assertDatabaseTarget } = require('../../src/config/database_target_guard');

const ROOT = path.resolve(__dirname, '../..');
if (process.env.DB_TARGET_CLASS !== 'supabase_cloud' || process.env.DB_DIALECT !== 'postgres') {
  console.error('SEED_REFUSED: set DB_TARGET_CLASS=supabase_cloud and DB_DIALECT=postgres (see .env).');
  process.exit(1);
}
assertDatabaseTarget(process.env);

const db = require(path.join(ROOT, 'src/models'));
const { MenuRegistryService } = require(path.join(ROOT, 'src/core/services/menu_registry.service'));
const SUPER_ADMIN_ROLE_ID = 1;

async function main() {
  const role = await db.role.findByPk(SUPER_ADMIN_ROLE_ID);
  if (!role) throw new Error(`role ${SUPER_ADMIN_ROLE_ID} (Super Admin) does not exist. Create it first.`);

  await db.sequelize.transaction(async (t) => {
    const before = await db.rbac_module.count({ transaction: t });
    await MenuRegistryService.seedCanonicalMenus(db, { transaction: t });

    // The permission middleware looks modules up by exact path. The canonical menus use other paths for
    // these four, so the path the routes check is added as its own row when it is missing.
    const ROUTE_PATHS = [
      ['material', 'Material'],
      ['equipment', 'Equipment'],
      ['category', 'Category'],
      ['skill', 'Skill'],
    ];
    for (const [path_, title] of ROUTE_PATHS) {
      const found = await db.rbac_module.findOne({ where: { path: path_ }, transaction: t });
      if (!found) await db.rbac_module.create({ name: title, title, path: path_, status: true }, { transaction: t });
    }

    const modules = await db.rbac_module.findAll({ transaction: t });
    console.log(`rbac_module rows: ${before} -> ${modules.length}`);

    const granted = await db.role_permission.findAll({ where: { role_id: role.id }, transaction: t });
    const have = new Set(granted.map((g) => g.module_id));
    const full = { can_create: true, can_read: true, can_update: true, can_delete: true };
    let added = 0;
    for (const m of modules) {
      if (have.has(m.id)) continue;
      await db.role_permission.create({ role_id: role.id, module_id: m.id, ...full }, { transaction: t });
      added++;
    }
    console.log(`Super Admin grants: ${granted.length} existing, ${added} added`);
  });
}

main()
  .catch((err) => {
    console.error('SEED_FAILED:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.sequelize.close());
