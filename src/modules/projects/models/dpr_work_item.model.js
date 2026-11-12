module.exports = (sequelize, Sequelize) => {
  const DPRWorkItem = sequelize.define(
    "DPR_WORK_ITEMS",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dpr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      milestone_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      location_grid: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity_executed: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      progress_percentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM("in_progress", "completed", "delayed"),
        defaultValue: "in_progress",
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return DPRWorkItem;
};
