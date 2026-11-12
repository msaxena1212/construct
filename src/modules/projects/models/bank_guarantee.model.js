module.exports = (sequelize, Sequelize) => {
  const BankGuarantee = sequelize.define(
    "BANK_GUARANTEES",
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
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // 'performance', 'advance', 'retention' or 'bid' (validated in the service).
      bg_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bank_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      bg_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      issue_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      expiry_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      // 'active', 'released' or 'invoked' (validated in the service).
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "active",
      },
      remarks: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        { name: "idx_bank_guarantees_project_status", fields: ["project_id", "status"] },
      ],
    }
  );
  return BankGuarantee;
};
