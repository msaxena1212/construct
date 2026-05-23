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
    daily_rate: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    labor_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
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