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

    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    role: {
      type: Sequelize.ENUM(
        "foreman",
        "specialist",
        "supervisor",
        "safety_officer",
        "worker",
        "operator"
      ),
      allowNull: false,
      defaultValue: "worker",
    },

    skill: {
      type: Sequelize.ENUM(
        "masonry",
        "electrical",
        "structural_steel",
        "plumbing",
        "hvac",
        "carpentry",
        "painting",
        "other"
      ),
      allowNull: false,
      defaultValue: "other",
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

    phone: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    daily_rate: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },

    joining_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    current_task: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

  }, {
    freezeTableName: true,
    tableName: "VENDORS_LABOR",
  });

  return VendorsLabor;
};