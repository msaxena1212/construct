'use strict';

module.exports = (sequelize, Sequelize) => {
  const StockLedger = sequelize.define(
    "STOCK_LEDGER",
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
      material_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      equipment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      movement_type: {
        type: Sequelize.ENUM(
          "opening_balance",
          "receipt",
          "issue",
          "consumption",
          "transfer_in",
          "transfer_out",
          "adjustment",
          "reversal",
          "location_placement",
          "location_writeoff",
          "location_issue"
        ),
        allowNull: false,
      },
      // Location layer (additive). NULL on legacy rows = project-level stock not yet placed in a location.
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      transfer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      transfer_line_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
      },
      unit_of_measure: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: "units",
      },
      unit_cost: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      total_cost: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      source_location: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      destination_location: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      reference_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reference_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      idempotency_key: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      reason: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      performed_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      updatedAt: false, // Append-only ledger; movements are immutable
      indexes: [
        {
          fields: ["company_id", "project_id", "material_id"],
          name: "idx_stock_ledger_project_material",
        },
        {
          unique: true,
          fields: ["company_id", "idempotency_key"],
          name: "unique_stock_idempotency_per_company",
        },
        {
          fields: ["company_id", "location_id"],
          name: "idx_stock_ledger_location",
        },
        {
          fields: ["company_id", "transfer_id"],
          name: "idx_stock_ledger_transfer",
        },
      ],
    }
  );

  return StockLedger;
};
