module.exports = (sequelize, Sequelize) => {
  const ProjectTask = sequelize.define("PROJECT_TASK", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    priority: {
      type: Sequelize.ENUM("High Priority", "Medium Priority", "Low Priority", "Archived"),
      defaultValue: "Medium Priority",
    },
    status: {
      type: Sequelize.ENUM("To Do", "In Progress", "Review", "Completed"),
      defaultValue: "To Do",
    },
    progress: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    vendorId: {
      type: Sequelize.INTEGER,
    },
    due_date: {
      type: Sequelize.DATE,
    },
    created_by: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // Task UID from an MS Project import. Set only on imported tasks; NULL for tasks created by hand.
    msp_uid: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    indexes: [
      { name: "idx_project_task_milestone_msp_uid", fields: ["milestone_id", "msp_uid"] },
    ],
  });

  return ProjectTask;
};
