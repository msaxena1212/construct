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
    },
    {
      freezeTableName: true,
      timeStamps: true,
    }
  );

  return StockRequest;
};