'use strict';

module.exports = (sequelize, Sequelize) => {
  const ProjectCBS = sequelize.define(
    'PROJECT_CBS',
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
      cost_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM('material', 'labour', 'equipment', 'subcontractor', 'overhead'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['company_id', 'cost_code'],
          name: 'unique_cbs_code_per_company',
        },
        {
          fields: ['company_id', 'category'],
          name: 'idx_cbs_company_category',
        },
      ],
    }
  );

  return ProjectCBS;
};
