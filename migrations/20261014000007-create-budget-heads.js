'use strict';

/**
 * Migration 000007: Create PROJECT_BUDGET_HEAD and PROJECT_BUDGET_HEAD_ALLOCATION tables,
 * and add budget_head_id to PROJECT_BUDGET_LINE.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create PROJECT_BUDGET_HEAD
    await queryInterface.createTable('PROJECT_BUDGET_HEAD', {
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
      head_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      head_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      sort_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.STRING(30),
        defaultValue: 'active',
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('PROJECT_BUDGET_HEAD', ['company_id', 'project_id', 'head_code'], {
      unique: true,
      name: 'unique_budget_head_code_per_project',
    });

    // 2. Create PROJECT_BUDGET_HEAD_ALLOCATION
    await queryInterface.createTable('PROJECT_BUDGET_HEAD_ALLOCATION', {
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
      budget_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      budget_head_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      allocated_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      notes: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('PROJECT_BUDGET_HEAD_ALLOCATION', ['budget_id', 'budget_head_id'], {
      unique: true,
      name: 'unique_budget_head_allocation_per_rev',
    });

    // 3. Add budget_head_id to PROJECT_BUDGET_LINE (safe, nullable)
    try {
      await queryInterface.addColumn('PROJECT_BUDGET_LINE', 'budget_head_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    } catch (_) {}
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('PROJECT_BUDGET_LINE', 'budget_head_id');
    } catch (_) {}
    await queryInterface.dropTable('PROJECT_BUDGET_HEAD_ALLOCATION');
    await queryInterface.dropTable('PROJECT_BUDGET_HEAD');
  },
};
