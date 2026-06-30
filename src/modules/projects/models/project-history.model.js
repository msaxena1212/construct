module.exports = (sequelize, Sequelize) => {
  const ProjectHistory = sequelize.define("PROJECT_HISTORY", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    action_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detail: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    meta: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
  });

  return ProjectHistory;
};