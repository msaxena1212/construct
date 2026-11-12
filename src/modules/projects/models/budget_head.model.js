'use strict';

module.exports = (sequelize, Sequelize) => {
  const ProjectBudgetHead = sequelize.define(
    'PROJECT_BUDGET_HEAD',
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
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['company_id', 'project_id', 'head_code'],
          name: 'unique_budget_head_code_per_project',
        },
        {
          fields: ['company_id', 'project_id'],
          name: 'idx_budget_head_company_project',
        },
      ],
    }
  );

  return ProjectBudgetHead;
};
