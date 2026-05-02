module.exports = (sequelize, Sequelize) => {
  const Material = sequelize.define(
    "INVENTORY_MATERIAL",
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
        unique: true,
      },

      category: {
        type: Sequelize.STRING,
      },

      icon: {
        type: Sequelize.STRING,
      },

      bg: {
        type: Sequelize.STRING,
      },

      text: {
        type: Sequelize.STRING,
      },

      border: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // 👉 stock object ko flatten kiya
      stockCurrent: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      stockTotal: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      stockPercent: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },

      cost: {
        type: Sequelize.STRING,
      },

      supplier: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.ENUM("Optimal", "Adequate", "Critical"),
        defaultValue: "Adequate",
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

  return Material;
};