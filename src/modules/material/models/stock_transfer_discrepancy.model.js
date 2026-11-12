'use strict';

/**
 * STOCK_TRANSFER_DISCREPANCY — declared shortages or damage on a transfer line. A shortage never moves
 * stock by itself; it is resolved only through an explicit, separately authorized ledger movement.
 */
module.exports = (sequelize, Sequelize) => {
  const StockTransferDiscrepancy = sequelize.define(
    'STOCK_TRANSFER_DISCREPANCY',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_line_id: { type: Sequelize.INTEGER, allowNull: false },
      discrepancy_type: { type: Sequelize.ENUM('shortage'), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      reason: { type: Sequelize.STRING(500), allowNull: false },
      status: { type: Sequelize.ENUM('open', 'written_off'), allowNull: false, defaultValue: 'open' },
      declared_by: { type: Sequelize.INTEGER, allowNull: false },
      resolved_by: { type: Sequelize.INTEGER, allowNull: true },
      resolved_at: { type: Sequelize.DATE, allowNull: true },
      resolution_reason: { type: Sequelize.STRING(500), allowNull: true },
    },
    {
      tableName: 'STOCK_TRANSFER_DISCREPANCY',
      indexes: [{ fields: ['company_id', 'transfer_id'] }],
    }
  );
  return StockTransferDiscrepancy;
};
