module.exports = (sequelize, Sequelize) => {
  const TaskAttachment = sequelize.define("TASK_ATTACHMENT", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    size: {
      type: Sequelize.STRING,
    },
    mimetype: {
      type: Sequelize.STRING,
    },
  }, {
    freezeTableName: true,
  });

  return TaskAttachment;
};
