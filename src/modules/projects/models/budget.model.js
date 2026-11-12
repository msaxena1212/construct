'use strict';

module.exports = (sequelize, Sequelize) => {
  const ProjectBudget = sequelize.define(
    'PROJECT_BUDGET',
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
        type: Sequelize.ENUM('draft', 'submitted', 'approved', 'superseded', 'rejected'),
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
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['company_id', 'project_id', 'revision_number'],
          name: 'unique_budget_revision_per_project',
        },
        {
          fields: ['company_id', 'project_id', 'status'],
          name: 'idx_budget_company_project_status',
        },
      ],
    }
  );

  return ProjectBudget;
};
