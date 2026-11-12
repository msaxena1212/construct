'use strict';

module.exports = (sequelize, Sequelize) => {
  const VariationOrderItem = sequelize.define(
    'VARIATION_ORDER_ITEMS',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      variation_order_id: {
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
        allowNull: true,
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
      line_type: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'boq_quantity_deviation', // 'boq_quantity_deviation', 'new_scope_item', 'rate_revision', 'omission'
      },
      item_code: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'unit',
      },
      original_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0.000,
      },
      original_rate: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      original_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      proposed_delta_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0.000,
      },
      proposed_rate: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      proposed_delta_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      approved_delta_qty: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0.000,
      },
      approved_rate: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      approved_delta_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      is_implemented: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          fields: ['variation_order_id'],
          name: 'idx_voi_order_id',
        },
        {
          fields: ['boq_item_id'],
          name: 'idx_voi_boq_item',
        },
        {
          fields: ['project_id', 'is_implemented'],
          name: 'idx_voi_project_implemented',
        },
      ],
    }
  );

  return VariationOrderItem;
};
