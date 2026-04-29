module.exports = (sequelize, Sequelize) => {
  const ProjectSubTask = sequelize.define("PROJECT_SUB_TASK", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  }, {
    freezeTableName: true,
  });

  ProjectSubTask.associate = (models) => {
    ProjectSubTask.belongsTo(models.project_task, {
      foreignKey: "task_id",
      as: "task",
    });
  };

  return ProjectSubTask;
};
