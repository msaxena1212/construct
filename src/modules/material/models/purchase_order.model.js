'use strict';

module.exports = (sequelize, Sequelize) => {
  const PurchaseOrder = sequelize.define(
    "PURCHASE_ORDER",
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
        type: Sequelize.ENUM('draft', 'submitted', 'approved', 'partially_received', 'completed', 'cancelled'),
        defaultValue: 'draft',
      },
      items: {
        type: Sequelize.TEXT,
        allowNull: false,
        get() {
          const raw = this.getDataValue('items');
          try { return raw ? JSON.parse(raw) : []; } catch { return []; }
        },
        set(value) {
          this.setDataValue('items', JSON.stringify(value || []));
        },
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
    },
    {
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['company_id', 'po_number'],
          name: 'unique_po_number_per_company',
        },
        {
          fields: ['company_id', 'project_id', 'vendor_id'],
          name: 'idx_po_company_project_vendor',
        },
      ],
    }
  );

  return PurchaseOrder;
};
