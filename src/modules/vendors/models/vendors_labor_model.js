module.exports = (sequelize, Sequelize) => {

  const VendorsLabor = sequelize.define("VENDORS_LABOR", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    skill: {
      type: Sequelize.TEXT,
      allowNull: false,
      allowNull: false,
    },
    current_task: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
      daily_rate: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },

    status: {
      type: Sequelize.ENUM(
        "active",
        "on_site",
        "off_duty",
        "inactive"
      ),
      allowNull: false,
      defaultValue: "active",
    },

  }, {
    freezeTableName: true,
    tableName: "VENDORS_LABOR",
  });

  return VendorsLabor;
};