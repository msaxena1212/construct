'use strict';

/**
 * STOCK_TRANSFER_EVENT — append-only audit and idempotency record for transfer operations.
 * The unique (company_id, idempotency_key) index makes a repeated request a no-op.
 */
module.exports = (sequelize, Sequelize) => {
  const StockTransferEvent = sequelize.define(
    'STOCK_TRANSFER_EVENT',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      transfer_id: { type: Sequelize.INTEGER, allowNull: false },
      event_type: { type: Sequelize.STRING(40), allowNull: false },
      idempotency_key: { type: Sequelize.STRING(200), allowNull: true },
      actor_id: { type: Sequelize.INTEGER, allowNull: true },
      detail: { type: Sequelize.TEXT, allowNull: true },
    },
    {
      tableName: 'STOCK_TRANSFER_EVENT',
      updatedAt: false,
      indexes: [
        { unique: true, fields: ['company_id', 'idempotency_key'], name: 'unique_transfer_event_idempotency' },
        { fields: ['company_id', 'transfer_id'] },
      ],
    }
  );
  return StockTransferEvent;
};
