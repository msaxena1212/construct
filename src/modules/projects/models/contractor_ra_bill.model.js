'use strict';

module.exports = (sequelize, Sequelize) => {
  const ContractorRaBill = sequelize.define(
    'CONTRACTOR_RA_BILLS',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ra_bill_number: {
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
        allowNull: false,
      },
      contract_reference: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      billing_period_start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      billing_period_end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      previous_cumulative_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      current_period_gross_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      cumulative_gross_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      retention_rate_pct: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 5.0,
      },
      retention_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tds_rate_pct: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 2.0,
      },
      tds_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      other_deductions_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      net_payable_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.STRING(30), // 'draft', 'submitted', 'certified', 'approved', 'rejected', 'invoiced', 'paid'
        allowNull: false,
        defaultValue: 'draft',
      },
      prepared_by: {
        type: Sequelize.INTEGER,
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
      approved_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      approved_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      linked_invoice_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      idempotency_key: {
        type: Sequelize.STRING(191),
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
          fields: ['company_id', 'project_id', 'vendor_id'],
          name: 'idx_ra_bills_comp_proj_vendor',
        },
        {
          unique: true,
          fields: ['company_id', 'ra_bill_number'],
          name: 'unique_ra_bill_number_per_company',
        },
      ],
    }
  );

  return ContractorRaBill;
};
