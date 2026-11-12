'use strict';
/**
 * Additive migration for P0 Stock Transfer (INV-LOC-01, INV-TRF-01..06).
 *
 * - Creates STORE_LOCATION, STOCK_TRANSFER, STOCK_TRANSFER_LINE, STOCK_TRANSFER_EVENT, STOCK_TRANSFER_DISCREPANCY.
 * - Adds NULLABLE location_id / transfer_id / transfer_line_id to STOCK_LEDGER. Existing rows keep NULL, which
 *   means "project-level stock not yet placed in a location". Existing counters (MATERIAL_PROJECT_STOCK) are
 *   not changed, so legacy balances are preserved as they are.
 *
 * NOT applied to any database by this change. Review and back up before running `npm run migrate`.
 * MySQL DDL may commit implicitly, so `down` is for recovery of an empty or freshly created schema only:
 * rolling back after location data exists drops that data.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('STORE_LOCATION', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      code: { type: Sequelize.STRING(40), allowNull: false },
      name: { type: Sequelize.STRING(150), allowNull: false },
      location_type: {
        type: Sequelize.ENUM('central_warehouse', 'project_store', 'site_store', 'quarantine', 'in_transit'),
        allowNull: false,
      },
      status: { type: Sequelize.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active' },
      created_by: { type: Sequelize.INTEGER, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('STORE_LOCATION', ['company_id', 'code'], { unique: true, name: 'unique_store_location_code' });

    await queryInterface.createTable('STOCK_TRANSFER', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_number: { type: Sequelize.STRING(40), allowNull: false },
      source_location_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'STORE_LOCATION', key: 'id' }, onDelete: 'RESTRICT' },
      destination_location_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'STORE_LOCATION', key: 'id' }, onDelete: 'RESTRICT' },
      status: {
        type: Sequelize.ENUM('draft', 'submitted', 'approved', 'rejected', 'in_transit', 'partially_received', 'reconciliation_required', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'draft',
      },
      reason: { type: Sequelize.STRING(500), allowNull: true },
      required_date: { type: Sequelize.DATEONLY, allowNull: true },
      requested_by: { type: Sequelize.INTEGER, allowNull: false },
      submitted_at: { type: Sequelize.DATE, allowNull: true },
      approved_by: { type: Sequelize.INTEGER, allowNull: true },
      approved_at: { type: Sequelize.DATE, allowNull: true },
      decision_reason: { type: Sequelize.STRING(500), allowNull: true },
      first_dispatched_at: { type: Sequelize.DATE, allowNull: true },
      completed_at: { type: Sequelize.DATE, allowNull: true },
      cancelled_at: { type: Sequelize.DATE, allowNull: true },
      cancel_reason: { type: Sequelize.STRING(500), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('STOCK_TRANSFER', ['company_id', 'transfer_number'], { unique: true, name: 'unique_stock_transfer_number' });
    await queryInterface.addIndex('STOCK_TRANSFER', ['company_id', 'project_id', 'status'], { name: 'idx_stock_transfer_status' });

    await queryInterface.createTable('STOCK_TRANSFER_LINE', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'STOCK_TRANSFER', key: 'id' }, onDelete: 'RESTRICT' },
      material_id: { type: Sequelize.INTEGER, allowNull: false },
      unit_of_measure: { type: Sequelize.STRING(50), allowNull: false, defaultValue: 'units' },
      requested_qty: { type: Sequelize.INTEGER, allowNull: false },
      approved_qty: { type: Sequelize.INTEGER, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('STOCK_TRANSFER_LINE', ['company_id', 'transfer_id'], { name: 'idx_stock_transfer_line_transfer' });

    await queryInterface.createTable('STOCK_TRANSFER_EVENT', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'STOCK_TRANSFER', key: 'id' }, onDelete: 'RESTRICT' },
      event_type: { type: Sequelize.STRING(40), allowNull: false },
      idempotency_key: { type: Sequelize.STRING(200), allowNull: true },
      actor_id: { type: Sequelize.INTEGER, allowNull: true },
      detail: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('STOCK_TRANSFER_EVENT', ['company_id', 'idempotency_key'], { unique: true, name: 'unique_transfer_event_idempotency' });
    await queryInterface.addIndex('STOCK_TRANSFER_EVENT', ['company_id', 'transfer_id'], { name: 'idx_stock_transfer_event_transfer' });

    await queryInterface.createTable('STOCK_TRANSFER_DISCREPANCY', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'STOCK_TRANSFER', key: 'id' }, onDelete: 'RESTRICT' },
      transfer_line_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'STOCK_TRANSFER_LINE', key: 'id' }, onDelete: 'RESTRICT' },
      discrepancy_type: { type: Sequelize.ENUM('shortage'), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      reason: { type: Sequelize.STRING(500), allowNull: false },
      status: { type: Sequelize.ENUM('open', 'written_off'), allowNull: false, defaultValue: 'open' },
      declared_by: { type: Sequelize.INTEGER, allowNull: false },
      resolved_by: { type: Sequelize.INTEGER, allowNull: true },
      resolved_at: { type: Sequelize.DATE, allowNull: true },
      resolution_reason: { type: Sequelize.STRING(500), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('STOCK_TRANSFER_DISCREPANCY', ['company_id', 'transfer_id'], { name: 'idx_stock_transfer_discrepancy_transfer' });

    // Additive, nullable location layer on the append-only ledger. Legacy rows remain NULL.
    await queryInterface.addColumn('STOCK_LEDGER', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'STORE_LOCATION', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    await queryInterface.addColumn('STOCK_LEDGER', 'transfer_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'STOCK_TRANSFER', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    await queryInterface.addColumn('STOCK_LEDGER', 'transfer_line_id', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addIndex('STOCK_LEDGER', ['company_id', 'location_id'], { name: 'idx_stock_ledger_location' });
    await queryInterface.addIndex('STOCK_LEDGER', ['company_id', 'transfer_id'], { name: 'idx_stock_ledger_transfer' });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('STOCK_LEDGER', 'idx_stock_ledger_transfer');
    await queryInterface.removeIndex('STOCK_LEDGER', 'idx_stock_ledger_location');
    // MySQL refuses to drop a column that is still referenced by a foreign key, so remove the constraints first.
    const refs = await queryInterface.getForeignKeyReferencesForTable('STOCK_LEDGER');
    for (const ref of refs) {
      // SQLite reports no constraint name (its removeColumn rebuilds the table), so only named constraints are dropped.
      if (ref.constraintName && ['location_id', 'transfer_id'].includes(ref.columnName)) {
        await queryInterface.removeConstraint('STOCK_LEDGER', ref.constraintName);
      }
    }
    await queryInterface.removeColumn('STOCK_LEDGER', 'transfer_line_id');
    await queryInterface.removeColumn('STOCK_LEDGER', 'transfer_id');
    await queryInterface.removeColumn('STOCK_LEDGER', 'location_id');
    await queryInterface.dropTable('STOCK_TRANSFER_DISCREPANCY');
    await queryInterface.dropTable('STOCK_TRANSFER_EVENT');
    await queryInterface.dropTable('STOCK_TRANSFER_LINE');
    await queryInterface.dropTable('STOCK_TRANSFER');
    await queryInterface.dropTable('STORE_LOCATION');
  },
};
