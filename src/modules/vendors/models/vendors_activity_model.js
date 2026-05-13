// modules/vendors/models/vendors_activity_model.js
module.exports = (sequelize, Sequelize) => {

  const Vendors_Activity = sequelize.define("VENDORS_ACTIVITY", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // FIX: company_id was missing — controller uses it in every query
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    icon: {
      type: Sequelize.ENUM("invoice", "cert", "assign"),
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    time_label: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: "JUST NOW",
    },
  }, {
    freezeTableName: true,
  });

  return Vendors_Activity;
};