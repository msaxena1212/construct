'use strict';

module.exports = (sequelize, Sequelize) => {
  const ProjectWBS = sequelize.define(
    'PROJECT_WBS',
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
        type: Sequelize.ENUM('active', 'completed', 'on_hold', 'archived'),
        defaultValue: 'active',
      },
      milestone_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['company_id', 'project_id', 'wbs_code'],
          name: 'unique_wbs_code_per_project',
        },
        {
          fields: ['company_id', 'project_id'],
          name: 'idx_wbs_company_project',
        },
        {
          fields: ['parent_id'],
          name: 'idx_wbs_parent_id',
        },
      ],
    }
  );

  return ProjectWBS;
};
