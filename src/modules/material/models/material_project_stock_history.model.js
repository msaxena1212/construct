module.exports = (sequelize, Sequelize) => {
  const Material_Project_Stock_History = sequelize.define(
    "MATERIAL_PROJECT_STOCK_HISTORY",
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

      cost: {
        type: Sequelize.STRING,
      },

      vendor_name: {
        type: Sequelize.STRING,
      },

      project_name: {
        type: Sequelize.STRING,
      },

      stockUsed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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

      material_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      quotation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      material_master_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },


    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return Material_Project_Stock_History;
};