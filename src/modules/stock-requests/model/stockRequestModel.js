module.exports = (sequelize, Sequelize) => {
  const StockRequest = sequelize.define(
    "STOCK_REQUESTS",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      material_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      equipment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },


      task_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      requested_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      available_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      approved_qty: { type: Sequelize.INTEGER, allowNull: true },
      requested_by: { type: Sequelize.INTEGER, allowNull: true },
      decided_by: { type: Sequelize.INTEGER, allowNull: true },
      decided_at: { type: Sequelize.DATE, allowNull: true },
      decision_reason: { type: Sequelize.STRING(500), allowNull: true },

      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );

  return StockRequest;
};