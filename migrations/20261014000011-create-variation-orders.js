'use strict';

/**
 * Migration 000011: Create VARIATION_ORDERS and VARIATION_ORDER_ITEMS tables
 * Batch W: Enterprise Variations, Change Orders & Subcontractor Claims
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create VARIATION_ORDERS table
    await queryInterface.createTable('VARIATION_ORDERS', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      variation_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Subcontractor or vendor for claims
      },
      change_type: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: 'client_variation', // 'client_variation', 'contractor_claim', 'subcontractor_variation', 'internal_budget_adjustment'
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'addition', // 'addition', 'omission', 'quantity_deviation', 'rate_revision', 'specification_change', 'time_impact'
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      originating_source: {
        type: Sequelize.STRING(100),
        allowNull: true, // e.g., 'Client Instruction CI-042', 'Site Condition RFI-109', 'Structural Revision'
      },
      status: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: 'draft', // 'draft', 'submitted', 'technical_review', 'commercial_review', 'budget_review', 'approved', 'implemented', 'rejected', 'withdrawn', 'cancelled'
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      preceding_variation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      net_cost_impact: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      net_revenue_impact: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      proposed_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      approved_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      time_extension_days_requested: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      time_extension_days_approved: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      submission_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      approval_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      implementation_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      technical_reviewer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      commercial_reviewer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      budget_reviewer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approved_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      rejection_reason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      supporting_docs_url: {
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

    // 2. Create VARIATION_ORDER_ITEMS table
    await queryInterface.createTable('VARIATION_ORDER_ITEMS', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      variation_order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boq_item_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Nullable if creating a brand new item line
      },
      wbs_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cbs_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      budget_head_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      line_type: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'boq_quantity_deviation', // 'boq_quantity_deviation', 'new_scope_item', 'rate_revision', 'omission'
      },
      item_code: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'unit',
      },
      original_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0.000,
      },
      original_rate: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      original_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      proposed_delta_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0.000,
      },
      proposed_rate: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      proposed_delta_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      approved_delta_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0.000,
      },
      approved_rate: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      approved_delta_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      is_implemented: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    // 3. Create Indexes for VARIATION_ORDERS
    await queryInterface.addIndex('VARIATION_ORDERS', ['company_id', 'project_id', 'variation_number'], {
      unique: true,
      name: 'unique_variation_number_per_project',
    });
    await queryInterface.addIndex('VARIATION_ORDERS', ['project_id', 'status'], {
      name: 'idx_variation_project_status',
    });
    await queryInterface.addIndex('VARIATION_ORDERS', ['company_id', 'status'], {
      name: 'idx_variation_company_status',
    });

    // 4. Create Indexes for VARIATION_ORDER_ITEMS
    await queryInterface.addIndex('VARIATION_ORDER_ITEMS', ['variation_order_id'], {
      name: 'idx_voi_order_id',
    });
    await queryInterface.addIndex('VARIATION_ORDER_ITEMS', ['boq_item_id'], {
      name: 'idx_voi_boq_item',
    });
    await queryInterface.addIndex('VARIATION_ORDER_ITEMS', ['project_id', 'is_implemented'], {
      name: 'idx_voi_project_implemented',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('VARIATION_ORDER_ITEMS');
    await queryInterface.dropTable('VARIATION_ORDERS');
  },
};
