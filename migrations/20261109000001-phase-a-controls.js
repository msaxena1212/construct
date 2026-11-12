'use strict';
/**
 * Phase A construction controls (docs/CONSTRUCTION_ERP_FARVISION_BENCHMARK.md, items 4 and 5).
 *   - PROJECT.handover_date and PROJECT.dlp_months: the handover date starts the defect liability period (DLP); retention
 *     can be released only after the DLP ends.
 *   - RBAC_COMPANY_MASTER.budget_gate_mode: what happens when an RA bill would exceed its budget head ('warn' or 'block').
 *   - RETENTION_RELEASES: retention released to a subcontractor after the DLP.
 *   - BANK_GUARANTEES: the bank guarantee register with expiry tracking.
 *
 * Additive and reversible. Down drops the two tables and drops the three columns in place with ALTER TABLE ... DROP
 * COLUMN (SQLite 3.35 or later). Table and column names are literals so scripts/schema/generate-baseline.js sees them.
 */
module.exports = {
  async up(queryInterface, Sequelize, transaction) {
    const { DATE, DATEONLY, DECIMAL, INTEGER, STRING } = Sequelize;

    await queryInterface.addColumn('PROJECT', 'handover_date', { type: DATE, allowNull: true }, { transaction });
    await queryInterface.addColumn('PROJECT', 'dlp_months', { type: INTEGER, allowNull: true, defaultValue: 12 }, { transaction });
    await queryInterface.addColumn('RBAC_COMPANY_MASTER', 'budget_gate_mode', { type: STRING(10), allowNull: true, defaultValue: 'warn' }, { transaction });

    await queryInterface.createTable(
      'RETENTION_RELEASES',
      {
        id: { type: INTEGER, autoIncrement: true, primaryKey: true },
        company_id: { type: INTEGER, allowNull: false },
        project_id: {
          type: INTEGER,
          allowNull: false,
          references: { model: 'PROJECT', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        vendor_id: {
          type: INTEGER,
          allowNull: false,
          references: { model: 'VENDORS', key: 'id' },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
        amount: { type: DECIMAL(15, 2), allowNull: false },
        release_date: { type: DATEONLY, allowNull: false },
        remarks: { type: STRING(500), allowNull: true },
        released_by: { type: INTEGER, allowNull: true },
        createdAt: { type: DATE, allowNull: false },
        updatedAt: { type: DATE, allowNull: false },
      },
      { transaction }
    );
    await queryInterface.addIndex('RETENTION_RELEASES', ['project_id', 'vendor_id'], {
      name: 'idx_retention_releases_project_vendor',
      transaction,
    });

    await queryInterface.createTable(
      'BANK_GUARANTEES',
      {
        id: { type: INTEGER, autoIncrement: true, primaryKey: true },
        company_id: { type: INTEGER, allowNull: false },
        project_id: {
          type: INTEGER,
          allowNull: false,
          references: { model: 'PROJECT', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        vendor_id: {
          type: INTEGER,
          allowNull: true,
          references: { model: 'VENDORS', key: 'id' },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
        bg_type: { type: STRING(20), allowNull: false },
        bank_name: { type: STRING(255), allowNull: false },
        bg_number: { type: STRING(100), allowNull: false },
        amount: { type: DECIMAL(15, 2), allowNull: false },
        issue_date: { type: DATEONLY, allowNull: false },
        expiry_date: { type: DATEONLY, allowNull: false },
        status: { type: STRING(20), allowNull: false, defaultValue: 'active' },
        remarks: { type: STRING(500), allowNull: true },
        created_by: { type: INTEGER, allowNull: true },
        createdAt: { type: DATE, allowNull: false },
        updatedAt: { type: DATE, allowNull: false },
      },
      { transaction }
    );
    await queryInterface.addIndex('BANK_GUARANTEES', ['project_id', 'status'], {
      name: 'idx_bank_guarantees_project_status',
      transaction,
    });
  },

  async down(queryInterface, Sequelize, transaction) {
    await queryInterface.dropTable('BANK_GUARANTEES', { transaction });
    await queryInterface.dropTable('RETENTION_RELEASES', { transaction });
    await queryInterface.sequelize.query('ALTER TABLE `RBAC_COMPANY_MASTER` DROP COLUMN `budget_gate_mode`', { transaction });
    await queryInterface.sequelize.query('ALTER TABLE `PROJECT` DROP COLUMN `dlp_months`', { transaction });
    await queryInterface.sequelize.query('ALTER TABLE `PROJECT` DROP COLUMN `handover_date`', { transaction });
  },
};
