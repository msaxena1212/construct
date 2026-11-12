'use strict';
/**
 * Migration: Create PURCHASE_ORDER and GOODS_RECEIPT_NOTE tables
 */
module.exports = {
  async up(queryInterface, Sequelize, transaction) {
    // 1. PURCHASE_ORDER table
    await queryInterface.createTable(
      'PURCHASE_ORDER',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        po_number: {
          type: Sequelize.STRING(100),
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
        quotation_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        order_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        expected_delivery_date: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING(50),
          defaultValue: 'draft',
        },
        items: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        total_amount: {
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
        },
        notes: {
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
        cancelled_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        cancelled_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        cancellation_reason: {
          type: Sequelize.STRING(500),
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
      },
      { transaction }
    );

    await queryInterface.addIndex(
      'PURCHASE_ORDER',
      ['company_id', 'po_number'],
      {
        unique: true,
        name: 'unique_po_number_per_company',
        transaction,
      }
    );

    await queryInterface.addIndex(
      'PURCHASE_ORDER',
      ['company_id', 'project_id', 'vendor_id'],
      {
        name: 'idx_po_company_project_vendor',
        transaction,
      }
    );

    // 2. GOODS_RECEIPT_NOTE table
    await queryInterface.createTable(
      'GOODS_RECEIPT_NOTE',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        grn_number: {
          type: Sequelize.STRING(100),
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
        purchase_order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        receipt_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        delivery_challan_number: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        vehicle_number: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        items: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING(50),
          defaultValue: 'received',
        },
        inspection_notes: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        received_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        inspected_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        inspected_at: {
          type: Sequelize.DATE,
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
      },
      { transaction }
    );

    await queryInterface.addIndex(
      'GOODS_RECEIPT_NOTE',
      ['company_id', 'grn_number'],
      {
        unique: true,
        name: 'unique_grn_number_per_company',
        transaction,
      }
    );

    await queryInterface.addIndex(
      'GOODS_RECEIPT_NOTE',
      ['company_id', 'purchase_order_id'],
      {
        name: 'idx_grn_company_po',
        transaction,
      }
    );
  },

  async down(queryInterface, Sequelize, transaction) {
    await queryInterface.dropTable('GOODS_RECEIPT_NOTE', { transaction });
    await queryInterface.dropTable('PURCHASE_ORDER', { transaction });
  },
};
