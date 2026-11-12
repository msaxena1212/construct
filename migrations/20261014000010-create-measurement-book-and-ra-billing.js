'use strict';

/**
 * Migration 000010: Create MEASUREMENT_BOOK and CONTRACTOR_RA_BILL tables
 * Batch R: Contractual physical work measurement, segregation of duties certification,
 * cumulative billing controls, retention deductions, and ledger linkage.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create MEASUREMENT_BOOKS table
    await queryInterface.createTable('MEASUREMENT_BOOKS', {
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
        allowNull: true, // Subcontractor / vendor
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

    // Indexes for MEASUREMENT_BOOKS
    await queryInterface.addIndex('MEASUREMENT_BOOKS', ['company_id', 'project_id'], {
      name: 'idx_mb_company_project',
    });
    await queryInterface.addIndex('MEASUREMENT_BOOKS', ['company_id', 'mb_number'], {
      unique: true,
      name: 'unique_mb_number_per_company',
    });

    // 2. Create MEASUREMENT_BOOK_ITEMS table
    await queryInterface.createTable('MEASUREMENT_BOOK_ITEMS', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mb_id: {
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
        allowNull: false,
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
      item_number: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      work_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      location_reference: {
        type: Sequelize.STRING(150), // Grid line, chainage, floor, block
        allowNull: true,
      },
      calculation_method: {
        type: Sequelize.STRING(30), // 'direct', 'l_b_d', 'l_b', 'count'
        allowNull: false,
        defaultValue: 'direct',
      },
      num_units: {
        type: Sequelize.DECIMAL(10, 3),
        allowNull: false,
        defaultValue: 1,
      },
      length: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
      },
      breadth: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
      },
      depth_height: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
      },
      measured_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      contract_rate: {
        type: Sequelize.DECIMAL(14, 2),
        allowNull: false,
      },
      measured_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      certified_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
        defaultValue: 0,
      },
      certified_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.STRING(30), // 'draft', 'submitted', 'certified', 'rejected'
        allowNull: false,
        defaultValue: 'draft',
      },
      evidence_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      ra_bill_id: {
        type: Sequelize.INTEGER,
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

    await queryInterface.addIndex('MEASUREMENT_BOOK_ITEMS', ['mb_id'], {
      name: 'idx_mb_items_mb_id',
    });
    await queryInterface.addIndex('MEASUREMENT_BOOK_ITEMS', ['boq_item_id'], {
      name: 'idx_mb_items_boq_id',
    });
    await queryInterface.addIndex('MEASUREMENT_BOOK_ITEMS', ['ra_bill_id'], {
      name: 'idx_mb_items_ra_bill_id',
    });

    // 3. Create CONTRACTOR_RA_BILLS table
    await queryInterface.createTable('CONTRACTOR_RA_BILLS', {
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
        allowNull: false, // Subcontractor
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
        defaultValue: 5.0, // Default 5% contractual retention
      },
      retention_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tds_rate_pct: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 2.0, // Default 2% TDS
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

    await queryInterface.addIndex('CONTRACTOR_RA_BILLS', ['company_id', 'project_id', 'vendor_id'], {
      name: 'idx_ra_bills_comp_proj_vendor',
    });
    await queryInterface.addIndex('CONTRACTOR_RA_BILLS', ['company_id', 'ra_bill_number'], {
      unique: true,
      name: 'unique_ra_bill_number_per_company',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('CONTRACTOR_RA_BILLS');
    await queryInterface.dropTable('MEASUREMENT_BOOK_ITEMS');
    await queryInterface.dropTable('MEASUREMENT_BOOKS');
  },
};
