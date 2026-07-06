module.exports = (sequelize, Sequelize) => {
  const equipment_History = sequelize.define(
    "EQUIPMENT_INVENTORY_HISTORY",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: true },
      sku: { type: Sequelize.STRING, allowNull: false },
      category: { type: Sequelize.STRING },
      stockIn: { type: Sequelize.INTEGER, defaultValue: 0 },
      cost: { type: Sequelize.STRING },
      vendor_name: { type: Sequelize.STRING },
      stockUsed: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: { type: Sequelize.STRING },

      equipment_id: { type: Sequelize.INTEGER, allowNull: true },
      equipment_master_id: { type: Sequelize.INTEGER, allowNull: true },
      project_id: { type: Sequelize.INTEGER, allowNull: true },
      project_name: { type: Sequelize.STRING, allowNull: true },
      vendor_id: { type: Sequelize.INTEGER, allowNull: true },
      quotation_id: { type: Sequelize.INTEGER, allowNull: true },
      company_id: { type: Sequelize.INTEGER, allowNull: true },
      note: { type: Sequelize.STRING, allowNull: true },

      isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return equipment_History;
};