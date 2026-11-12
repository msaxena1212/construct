'use strict';
/**
 * Migration: Create STOCK_LEDGER table for append-only stock movement tracking
 */
module.exports = {
  async up(queryInterface, Sequelize, transaction) {
    await queryInterface.createTable(
      'STOCK_LEDGER',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        company_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        project_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        material_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        equipment_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        movement_type: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        quantity: {
          type: Sequelize.DECIMAL(12, 3),
          allowNull: false,
        },
        unit_of_measure: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: 'units',
        },
        unit_cost: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: true,
        },
        total_cost: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: true,
        },
        source_location: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        destination_location: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        reference_type: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        reference_id: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        idempotency_key: {
          type: Sequelize.STRING(150),
          allowNull: true,
        },
        reason: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        performed_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      { transaction }
    );

    await queryInterface.addIndex(
      'STOCK_LEDGER',
      ['company_id', 'project_id', 'material_id'],
      {
        name: 'idx_stock_ledger_project_material',
        transaction,
      }
    );

    await queryInterface.addIndex(
      'STOCK_LEDGER',
      ['company_id', 'idempotency_key'],
      {
        unique: true,
        name: 'unique_stock_idempotency_per_company',
        transaction,
      }
    );
  },

  async down(queryInterface, Sequelize, transaction) {
    await queryInterface.dropTable('STOCK_LEDGER', { transaction });
  },
};
