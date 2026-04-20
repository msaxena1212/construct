module.exports = (sequelize, Sequelize) => {
  const ProjectTeam = sequelize.define(
    "PROJECT_TEAM",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Note: project_id and user_id will be added via associations in models/index.js
    },
    {
      freezeTableName: true,
    }
  );
  return ProjectTeam;
};
