'use strict';

module.exports = (sequelize, Sequelize) => {
  const GoodsReceiptNote = sequelize.define(
    "GOODS_RECEIPT_NOTE",
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
        get() {
          const raw = this.getDataValue('items');
          try { return raw ? JSON.parse(raw) : []; } catch { return []; }
        },
        set(value) {
          this.setDataValue('items', JSON.stringify(value || []));
        },
      },
      status: {
        type: Sequelize.ENUM('received', 'inspected', 'partially_accepted', 'rejected'),
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
    },
    {
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['company_id', 'grn_number'],
          name: 'unique_grn_number_per_company',
        },
        {
          fields: ['company_id', 'purchase_order_id'],
          name: 'idx_grn_company_po',
        },
      ],
    }
  );

  return GoodsReceiptNote;
};
