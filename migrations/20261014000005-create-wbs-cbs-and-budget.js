'use strict';

/**
 * Migration 000005: Create WBS, CBS, Project Budget and Budget Line tables,
 * and add wbs_id and cbs_id references to BOQ_ITEMS.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create PROJECT_WBS
    await queryInterface.createTable('PROJECT_WBS', {
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
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      wbs_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: Sequelize.STRING(30),
        defaultValue: 'active',
      },
      milestone_id: {
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

    await queryInterface.addIndex('PROJECT_WBS', ['company_id', 'project_id', 'wbs_code'], {
      unique: true,
      name: 'unique_wbs_code_per_project',
    });

    // 2. Create PROJECT_CBS
    await queryInterface.createTable('PROJECT_CBS', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'active',
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

    await queryInterface.addIndex('PROJECT_CBS', ['company_id', 'cost_code'], {
      unique: true,
      name: 'unique_cbs_code_per_company',
    });

    // 3. Create PROJECT_BUDGET
    await queryInterface.createTable('PROJECT_BUDGET', {
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
      revision_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      preceding_budget_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(30),
        defaultValue: 'draft',
      },
      total_budget_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      change_reason: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approved_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approved_at: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex('PROJECT_BUDGET', ['company_id', 'project_id', 'revision_number'], {
      unique: true,
      name: 'unique_budget_revision_per_project',
    });

    // 4. Create PROJECT_BUDGET_LINE
    await queryInterface.createTable('PROJECT_BUDGET_LINE', {
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
      wbs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cbs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boq_item_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      line_description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      quantity: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
        defaultValue: 0,
      },
      unit_of_measure: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      unit_rate: {
        type: Sequelize.DECIMAL(14, 2),
        allowNull: true,
        defaultValue: 0,
      },
      budgeted_amount: {
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

    await queryInterface.addIndex('PROJECT_BUDGET_LINE', ['company_id', 'budget_id'], {
      name: 'idx_budget_line_company_budget',
    });

    // 5. Add wbs_id and cbs_id to BOQ_ITEMS (safe, nullable)
    try {
      await queryInterface.addColumn('BOQ_ITEMS', 'wbs_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    } catch (_) {}

    try {
      await queryInterface.addColumn('BOQ_ITEMS', 'cbs_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    } catch (_) {}
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('BOQ_ITEMS', 'cbs_id');
    } catch (_) {}
    try {
      await queryInterface.removeColumn('BOQ_ITEMS', 'wbs_id');
    } catch (_) {}
    await queryInterface.dropTable('PROJECT_BUDGET_LINE');
    await queryInterface.dropTable('PROJECT_BUDGET');
    await queryInterface.dropTable('PROJECT_CBS');
    await queryInterface.dropTable('PROJECT_WBS');
  },
};
