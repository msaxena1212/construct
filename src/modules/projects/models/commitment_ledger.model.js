'use strict';

module.exports = (sequelize, Sequelize) => {
  const ProjectCommitmentLedger = sequelize.define(
    'PROJECT_COMMITMENT_LEDGER',
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
      purchase_order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      po_line_identifier: {
        type: Sequelize.STRING(100),
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
      event_type: {
        type: Sequelize.ENUM('commitment_created', 'commitment_released', 'commitment_amended', 'commitment_cancelled'),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
        defaultValue: 0,
      },
      unit_price: {
        type: Sequelize.DECIMAL(14, 2),
        allowNull: true,
        defaultValue: 0,
      },
      committed_amount_delta: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        comment: 'Positive for commitment creation/increase; negative for release on receipt or cancellation',
      },
      source_reference_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'e.g. PO, GRN, AMENDMENT, CANCELLATION',
      },
      source_reference_id: {
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
      updatedAt: false, // Append-only audit trail
      indexes: [
        {
          fields: ['company_id', 'project_id', 'purchase_order_id'],
          name: 'idx_commitment_company_proj_po',
        },
        {
          fields: ['wbs_id', 'cbs_id'],
          name: 'idx_commitment_wbs_cbs',
        },
        {
          unique: true,
          fields: ['company_id', 'idempotency_key'],
          name: 'unique_commitment_idempotency_per_company',
        },
      ],
    }
  );

  return ProjectCommitmentLedger;
};
