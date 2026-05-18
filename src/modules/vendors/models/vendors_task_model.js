module.exports = (sequelize, Sequelize) => {
  const VendorTask = sequelize.define("VENDORS_TASK", {
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
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("pending", "in_progress", "completed", "on_hold"),
      allowNull: false,
      defaultValue: "pending",
    },
    task_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
  });

  return VendorTask;
};