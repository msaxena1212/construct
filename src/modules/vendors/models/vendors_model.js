// modules/vendors/models/vendors_model.js
// ⚠️  id changed from UUID → INTEGER AUTO_INCREMENT as requested
module.exports = (sequelize, Sequelize) => {

  const Vendor = sequelize.define("VENDORS", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    spoc_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    spoc_phone: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    official_email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    official_phone: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    gst_no: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    },
    pan_card_no: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true,
    },
    physical_address: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    pincode: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    budget_allocation: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    services: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    },
    contract_file: {
      type: Sequelize.STRING(512),
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("active", "pending", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    compliance_score: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 95,
    },
  }, {
    freezeTableName: true,
  });

  return Vendor;
};