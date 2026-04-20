module.exports = (sequelize, Sequelize) => {
  const ProjectTaskAssignee = sequelize.define(
    "PROJECT_TASK_ASSIGNEE",
    {
      task_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return ProjectTaskAssignee;
};
