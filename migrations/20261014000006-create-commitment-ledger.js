'use strict';

/**
 * Migration 000006: Create PROJECT_COMMITMENT_LEDGER table
 * Append-only ledger tracking PO commitment creation, amendment, release, and cancellation.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PROJECT_COMMITMENT_LEDGER', {
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
      purchase_order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      po_line_identifier: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      wbs_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cbs_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      event_type: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
        defaultValue: 0,
      },
      unit_price: {
        type: Sequelize.DECIMAL(14, 2),
        allowNull: true,
        defaultValue: 0,
      },
      committed_amount_delta: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      source_reference_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      source_reference_id: {
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
    });

    await queryInterface.addIndex('PROJECT_COMMITMENT_LEDGER', ['company_id', 'project_id', 'purchase_order_id'], {
      name: 'idx_commitment_company_proj_po',
    });

    await queryInterface.addIndex('PROJECT_COMMITMENT_LEDGER', ['company_id', 'idempotency_key'], {
      unique: true,
      name: 'unique_commitment_idempotency_per_company',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PROJECT_COMMITMENT_LEDGER');
  },
};
