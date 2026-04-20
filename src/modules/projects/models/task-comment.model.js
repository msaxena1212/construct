module.exports = (sequelize, Sequelize) => {
  const TaskComment = sequelize.define("TASK_COMMENT", {
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
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  return TaskComment;
};
