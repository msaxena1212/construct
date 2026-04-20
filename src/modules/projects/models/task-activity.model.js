module.exports = (sequelize, Sequelize) => {
  const TaskActivity = sequelize.define("TASK_ACTIVITY", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    action_type: {
      type: Sequelize.STRING, // e.g., 'STATUS_CHANGE', 'ASSIGNMENT', 'COMMENT', 'FILE_UPLOAD'
      allowNull: false,
    },
    detail: {
      type: Sequelize.TEXT, // e.g., 'moved task to In Progress'
    },
  }, {
    freezeTableName: true,
  });

  return TaskActivity;
};
