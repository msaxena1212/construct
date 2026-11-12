'use strict';

module.exports = (sequelize, Sequelize) => {
  const MeasurementBookItem = sequelize.define(
    'MEASUREMENT_BOOK_ITEMS',
    {
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
        type: Sequelize.STRING(150),
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
    },
    {
      freezeTableName: true,
      timestamps: true,
      indexes: [
        {
          fields: ['mb_id'],
          name: 'idx_mb_items_mb_id',
        },
        {
          fields: ['boq_item_id'],
          name: 'idx_mb_items_boq_id',
        },
        {
          fields: ['ra_bill_id'],
          name: 'idx_mb_items_ra_bill_id',
        },
      ],
    }
  );

  return MeasurementBookItem;
};
