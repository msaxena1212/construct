'use strict';

module.exports = (sequelize, Sequelize) => {
  const ProjectBudgetHeadAllocation = sequelize.define(
    'PROJECT_BUDGET_HEAD_ALLOCATION',
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
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['budget_id', 'budget_head_id'],
          name: 'unique_budget_head_allocation_per_rev',
        },
        {
          fields: ['company_id', 'project_id', 'budget_head_id'],
          name: 'idx_alloc_company_proj_head',
        },
      ],
    }
  );

  return ProjectBudgetHeadAllocation;
};
