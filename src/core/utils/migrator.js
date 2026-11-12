'use strict';
const fs = require('fs');
const path = require('path');

/**
 * Lightweight, zero-dependency migration runner built natively on top of Sequelize queryInterface.
 * Tracks migrations in `sequelize_meta` table.
 * Supports: up, down, status, run deterministic migrations, transaction-safe where supported.
 */
const { resolveApprovedSqlitePath } = require("../../config/sqlite_policy");

/** Refuses unauthorized database storage. */
function assertApprovedSqliteStorage(sequelize) {
  const dialect = sequelize.getDialect();
  if (dialect === "postgres") return; // Approved Postgres / Neon target
  if (dialect !== "sqlite") throw new Error("MIGRATION_REFUSED: Unsupported database dialect: " + dialect);
  const storage = sequelize.options.storage;
  if (storage === ":memory:") return;
  resolveApprovedSqlitePath(storage);
}

const BASELINE_MIGRATION = "20261001000000-canonical-core-schema-baseline.js";

class MigrationRunner {
  constructor(sequelize, migrationsDir = path.resolve(__dirname, '../../../migrations')) {
    this.sequelize = sequelize;
    this.queryInterface = sequelize.getQueryInterface();
    this.migrationsDir = migrationsDir;
    this.metaTable = 'sequelize_meta';
  }

  async initMetaTable() {
    const isPostgres = this.sequelize.getDialect() === 'postgres';
    const timestampType = isPostgres ? 'TIMESTAMP WITH TIME ZONE' : 'DATETIME';
    await this.sequelize.query(`
      CREATE TABLE IF NOT EXISTS ${this.metaTable} (
        name VARCHAR(255) NOT NULL,
        applied_at ${timestampType} DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (name)
      )
    `);
  }

  async getAppliedMigrations() {
    await this.initMetaTable();
    const [rows] = await this.sequelize.query(`SELECT name FROM ${this.metaTable} ORDER BY name ASC`);
    return rows.map((r) => r.name);
  }

  getAvailableMigrations() {
    if (!fs.existsSync(this.migrationsDir)) return [];
    return fs
      .readdirSync(this.migrationsDir)
      .filter((file) => file.endsWith('.js'))
      .sort();
  }

  /** Read-only: reports applied and pending files without creating the bookkeeping table. */
  async getStatus() {
    assertApprovedSqliteStorage(this.sequelize);
    const applied = await this.readAppliedIfPresent();
    const available = this.getAvailableMigrations();
    return available.map((file) => ({
      name: file,
      applied: applied.includes(file),
    }));
  }

  /** Returns baseline tables that already exist in the connected database (read-only). */
  async existingBaselineTables() {
    const baseline = require(path.join(this.migrationsDir, BASELINE_MIGRATION));
    const present = new Set((await this.queryInterface.showAllTables()).map((n) => (typeof n === "string" ? n : n.tableName)));
    return baseline.tableOrder.filter((t) => present.has(t));
  }

  /**
   * PostgreSQL has no TINYINT type. The migration history uses TINYINT (written for MySQL and SQLite), so a
   * TINYINT domain over SMALLINT is created before any migration runs. Idempotent; a no-op on other dialects.
   */
  async ensurePostgresCompatibility() {
    if (this.sequelize.getDialect() !== 'postgres') return;
    await this.sequelize.query(`
      DO $$ BEGIN
        CREATE DOMAIN tinyint AS smallint;
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);
  }

  /** Reads the applied list without creating the bookkeeping table, so a refused run leaves no trace. */
  async readAppliedIfPresent() {
    const names = (await this.queryInterface.showAllTables()).map((n) => (typeof n === "string" ? n : n.tableName));
    if (!names.includes(this.metaTable)) return [];
    const [rows] = await this.sequelize.query(`SELECT name FROM ${this.metaTable} ORDER BY name ASC`);
    return rows.map((r) => r.name);
  }

  /**
   * @param {{ exclude?: string[] }} [options] Migration files to leave out of this run. Used by fixture-based
   * tests that create pre-migration tables themselves; never used by the production runner.
   */
  async up(options = {}) {
    // SQLite-only policy: re-verify the storage path immediately before any migration runs.
    assertApprovedSqliteStorage(this.sequelize);
    const exclude = options.exclude || [];
    const applied = await this.readAppliedIfPresent();
    const available = this.getAvailableMigrations();
    const pending = available.filter((file) => !applied.includes(file) && !exclude.includes(file));

    // The canonical baseline must never run over an existing schema. Adopt existing databases with
    // scripts/schema/adopt-report.js first; the baseline is never stamped automatically.
    if (pending.includes(BASELINE_MIGRATION)) {
      const existing = await this.existingBaselineTables();
      if (existing.length > 0) {
        const err = new Error(
          `ADOPTION_REQUIRED: ${existing.length} baseline table(s) already exist (e.g. ${existing.slice(0, 3).join(", ")}) ` +
          `but ${BASELINE_MIGRATION} is not recorded. Run scripts/schema/adopt-report.js and approve an adoption plan.`
        );
        err.code = "ADOPTION_REQUIRED";
        throw err;
      }
    }

    await this.initMetaTable();
    await this.ensurePostgresCompatibility();

    const results = [];
    for (const file of pending) {
      const migrationPath = path.join(this.migrationsDir, file);
      const migration = require(migrationPath);
      console.log(`[Migration] Applying ${file}...`);

      const t = await this.sequelize.transaction();
      try {
        if (typeof migration.up === 'function') {
          // Pass queryInterface and Sequelize
          await migration.up(this.queryInterface, this.sequelize.constructor, t);
        }
        await this.sequelize.query(
          `INSERT INTO ${this.metaTable} (name) VALUES (:name)`,
          { replacements: { name: file }, transaction: t }
        );
        await t.commit();
        console.log(`[Migration] Successfully applied ${file}`);
        results.push({ name: file, status: 'success' });
      } catch (err) {
        await t.rollback().catch(() => {});
        console.error(`[Migration] FAILED applying ${file}:`, err);
        throw new Error(`Migration ${file} failed: ${err.message}`);
      }
    }
    return results;
  }

  async down(steps = 1) {
    assertApprovedSqliteStorage(this.sequelize);
    const applied = await this.getAppliedMigrations();
    if (applied.length === 0) {
      console.log('[Migration] No migrations to rollback.');
      return [];
    }

    const toRollback = applied.slice(-steps).reverse();
    const results = [];
    for (const file of toRollback) {
      const migrationPath = path.join(this.migrationsDir, file);
      const migration = require(migrationPath);
      console.log(`[Migration] Rolling back ${file}...`);

      const t = await this.sequelize.transaction();
      try {
        if (typeof migration.down === 'function') {
          await migration.down(this.queryInterface, this.sequelize.constructor, t);
        }
        await this.sequelize.query(
          `DELETE FROM ${this.metaTable} WHERE name = :name`,
          { replacements: { name: file }, transaction: t }
        );
        await t.commit();
        console.log(`[Migration] Successfully rolled back ${file}`);
        results.push({ name: file, status: 'rolled_back' });
      } catch (err) {
        await t.rollback().catch(() => {});
        console.error(`[Migration] FAILED rolling back ${file}:`, err);
        throw new Error(`Rollback of ${file} failed: ${err.message}`);
      }
    }
    return results;
  }
}

module.exports = MigrationRunner;
