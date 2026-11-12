'use strict';

/**
 * STORE_LOCATION — company-scoped stock locations (central warehouse, project store, site store,
 * quarantine). Stock balances per location are derived from STOCK_LEDGER, never stored as counters.
 * P0 limitation: every location is bound to one project, because ledger stock is keyed by project.
 */
module.exports = (sequelize, Sequelize) => {
  const StoreLocation = sequelize.define(
    'STORE_LOCATION',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      project_id: { type: Sequelize.INTEGER, allowNull: false },
      code: { type: Sequelize.STRING(40), allowNull: false },
      name: { type: Sequelize.STRING(150), allowNull: false },
      location_type: {
        // in_transit is a system-managed location, one per project, created on first dispatch. Users cannot create it.
        type: Sequelize.ENUM('central_warehouse', 'project_store', 'site_store', 'quarantine', 'in_transit'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      created_by: { type: Sequelize.INTEGER, allowNull: true },
    },
    {
      tableName: 'STORE_LOCATION',
      indexes: [{ unique: true, fields: ['company_id', 'code'] }],
    }
  );
  return StoreLocation;
};
