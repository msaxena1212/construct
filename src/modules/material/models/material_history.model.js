module.exports = (sequelize, Sequelize) => {
  const Material_History = sequelize.define(
    "MATERIAL_INVENTORY_HISTORY",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      sku: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      category: {
        type: Sequelize.STRING,
      },

      stockIn: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      stockUsed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      cost: {
        type: Sequelize.STRING,
      },

      vendor_name: {
        type: Sequelize.STRING,
      },

      project_name: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.STRING,
      },

      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Material_History;
};