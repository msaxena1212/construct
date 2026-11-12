'use strict';

module.exports = (sequelize, Sequelize) => {
  const VariationOrder = sequelize.define(
    'VARIATION_ORDERS',
    {
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
        allowNull: true,
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
        allowNull: true,
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
    },
    {
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['company_id', 'project_id', 'variation_number'],
          name: 'unique_variation_number_per_project',
        },
        {
          fields: ['project_id', 'status'],
          name: 'idx_variation_project_status',
        },
        {
          fields: ['company_id', 'status'],
          name: 'idx_variation_company_status',
        },
      ],
    }
  );

  return VariationOrder;
};
