module.exports = (sequelize, Sequelize) => {
  const SnagItem = sequelize.define(
    "SNAG_ITEMS",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location_pin: {
        type: Sequelize.STRING, // e.g. "Block A, Floor 3, Grid C4" or JSON coordinates
        allowNull: true,
      },
      trade: {
        type: Sequelize.STRING, // e.g. "Civil", "Electrical", "Plumbing", "Finishing"
        allowNull: true,
      },
      severity: {
        type: Sequelize.ENUM("low", "medium", "high", "critical"),
        defaultValue: "medium",
      },
      status: {
        type: Sequelize.ENUM("open", "in_progress", "resolved", "closed"),
        defaultValue: "open",
      },
      assigned_to: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ai_defect_tags: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      due_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return SnagItem;
};
