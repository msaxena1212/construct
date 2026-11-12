'use strict';

/**
 * Migration 000009: Create PROJECT_COST_LEDGER table
 * Append-only ledger tracking actual project costs across Labour, Equipment,
 * Subcontractor, and Overhead categories with deterministic budget-head, WBS, and CBS mapping.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PROJECT_COST_LEDGER', {
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
      cost_category: {
        type: Sequelize.STRING(30), // 'labour', 'equipment', 'subcontractor', 'overhead'
        allowNull: false,
      },
      event_type: {
        type: Sequelize.STRING(30), // 'accrual', 'reversal', 'adjustment'
        allowNull: false,
        defaultValue: 'accrual',
      },
      budget_head_id: {
        type: Sequelize.INTEGER,
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
      source_type: {
        type: Sequelize.STRING(50), // 'LABOUR_ATTENDANCE', 'VENDORS_INVOICE', 'MANUAL_ADJUSTMENT'
        allowNull: false,
      },
      source_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      source_line_identifier: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      recognition_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
        defaultValue: 0,
      },
      rate: {
        type: Sequelize.DECIMAL(14, 2),
        allowNull: true,
        defaultValue: 0,
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'INR',
      },
      idempotency_key: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },
      reversal_of_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reason: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      posted_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('PROJECT_COST_LEDGER', ['company_id', 'project_id', 'cost_category'], {
      name: 'idx_cost_ledger_comp_proj_cat',
    });

    await queryInterface.addIndex('PROJECT_COST_LEDGER', ['company_id', 'idempotency_key'], {
      unique: true,
      name: 'unique_cost_ledger_idempotency_per_company',
    });

    await queryInterface.addIndex('PROJECT_COST_LEDGER', ['company_id', 'budget_head_id'], {
      name: 'idx_cost_ledger_budget_head',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PROJECT_COST_LEDGER');
  },
};
