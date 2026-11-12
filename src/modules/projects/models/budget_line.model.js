'use strict';

module.exports = (sequelize, Sequelize) => {
  const ProjectBudgetLine = sequelize.define(
    'PROJECT_BUDGET_LINE',
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
        allowNull: true,
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
    },
    {
      freezeTableName: true,
      indexes: [
        {
          fields: ['company_id', 'budget_id'],
          name: 'idx_budget_line_company_budget',
        },
        {
          fields: ['wbs_id', 'cbs_id'],
          name: 'idx_budget_line_wbs_cbs',
        },
      ],
    }
  );

  return ProjectBudgetLine;
};
