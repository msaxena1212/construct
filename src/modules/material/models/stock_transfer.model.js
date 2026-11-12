'use strict';

/**
 * STOCK_TRANSFER — internal material transfer between two STORE_LOCATIONs of the same project.
 * Holds workflow state and metadata only. Quantities are never stored here; they are derived from STOCK_LEDGER.
 */
module.exports = (sequelize, Sequelize) => {
  const StockTransfer = sequelize.define(
    'STOCK_TRANSFER',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_number: { type: Sequelize.STRING(40), allowNull: false },
      source_location_id: { type: Sequelize.INTEGER, allowNull: false },
      destination_location_id: { type: Sequelize.INTEGER, allowNull: false },
      status: {
        type: Sequelize.ENUM(
          'draft',
          'submitted',
          'approved',
          'rejected',
          'in_transit',
          'partially_received',
          'reconciliation_required',
          'completed',
          'cancelled'
        ),
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
    },
    {
      tableName: 'STOCK_TRANSFER',
      indexes: [
        { unique: true, fields: ['company_id', 'transfer_number'] },
        { fields: ['company_id', 'project_id', 'status'] },
      ],
    }
  );
  return StockTransfer;
};
