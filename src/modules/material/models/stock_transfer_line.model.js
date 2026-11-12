'use strict';

/**
 * STOCK_TRANSFER_LINE — requested and approved quantities per material. Dispatched, received, in-transit
 * and written-off quantities are derived from STOCK_LEDGER rows that reference this line.
 * Quantities are whole units (integers), matching the project stock counters.
 */
module.exports = (sequelize, Sequelize) => {
  const StockTransferLine = sequelize.define(
    'STOCK_TRANSFER_LINE',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_id: { type: Sequelize.INTEGER, allowNull: false },
      material_id: { type: Sequelize.INTEGER, allowNull: false },
      unit_of_measure: { type: Sequelize.STRING(50), allowNull: false, defaultValue: 'units' },
      requested_qty: { type: Sequelize.INTEGER, allowNull: false },
      approved_qty: { type: Sequelize.INTEGER, allowNull: true },
    },
    {
      tableName: 'STOCK_TRANSFER_LINE',
      indexes: [{ fields: ['company_id', 'transfer_id'] }],
    }
  );
  return StockTransferLine;
};
