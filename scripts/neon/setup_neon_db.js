'use strict';
/**
 * Neon Database Setup & Model Sync Script
 * Pre-configures PostgreSQL domains (e.g. tinyint -> smallint),
 * creates all tables directly from Sequelize models, and seeds Super Admin.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');

async function main() {
  console.log('--- Connecting to Neon PostgreSQL ---');
  const db = require('../../src/models');

  try {
    await db.sequelize.authenticate();
    console.log('✅ Connection to Neon PostgreSQL successful!\n');

    console.log('Re-creating canonical tables from application models...');
    // Reset schema and create tinyint compatibility domain for PostgreSQL
    await db.sequelize.query(`
      DROP SCHEMA IF EXISTS public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO neondb_owner;
      GRANT ALL ON SCHEMA public TO public;
      DO $$ BEGIN
        CREATE DOMAIN tinyint AS smallint;
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Sync all models defined in src/models/index.js
    console.log('Building all application tables directly from Sequelize models...');
    await db.sequelize.sync({ force: true });
    console.log('✅ All application models synchronized cleanly on Neon DB!\n');

    // 1. Seed Company
    const company = await db.company.create({
      id: 1,
      name: 'Zyno Construction Infrastructure Ltd.',
      email: 'corporate@zynoconstruction.com',
      isActive: true,
      isDeleted: false,
      budget_gate_mode: 'warn',
    });
    console.log(`✅ Default Company created: ${company.name} (ID: ${company.id})`);

    // 2. Seed Super Admin Role
    const role = await db.role.create({
      id: 1,
      name: 'Super Admin',
      type: 'STATIC',
      is_deleted: false,
      company_id: company.id,
    });
    console.log(`✅ Default Role created: ${role.name} (ID: ${role.id})`);

    // 3. Seed Super Admin User
    const hashedPassword = bcrypt.hashSync('Admin@Zyno2026!', 10);
    const user = await db.user.create({
      id: 1,
      firstname: 'Super',
      lastname: 'Administrator',
      email: 'admin@zynoconstruction.com',
      password: hashedPassword,
      isActive: true,
      isInviteAccepted: true,
      company_id: company.id,
      role_id: role.id,
    });
    console.log(`✅ Super Administrator created: ${user.firstname} ${user.lastname} (${user.email})`);

    console.log('\n--- Ready for Sign-in ---');
    console.log('  URL:      http://localhost:3000/api/auth/signin');
    console.log('  Email:    admin@zynoconstruction.com');
    console.log('  Password: Admin@Zyno2026!');
    console.log('\n🎉 Neon PostgreSQL is 100% ready and synchronized with the backend application!');
  } catch (err) {
    console.error('❌ Neon setup error:', err);
    process.exit(1);
  } finally {
    await db.sequelize.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
