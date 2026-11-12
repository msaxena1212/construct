'use strict';

module.exports = (sequelize, Sequelize) => {
  const MeasurementBook = sequelize.define(
    'MEASUREMENT_BOOKS',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mb_number: {
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
      contract_reference: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      measurement_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      period_start: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      period_end: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(30), // 'draft', 'submitted', 'under_review', 'certified', 'rejected', 'cancelled'
        allowNull: false,
        defaultValue: 'draft',
      },
      total_measured_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      submitted_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      submitted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      certified_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      certified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      rejection_reason: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          fields: ['company_id', 'project_id'],
          name: 'idx_mb_company_project',
        },
        {
          unique: true,
          fields: ['company_id', 'mb_number'],
          name: 'unique_mb_number_per_company',
        },
      ],
    }
  );

  return MeasurementBook;
};
