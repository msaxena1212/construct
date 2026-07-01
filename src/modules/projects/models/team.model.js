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
    },
    {
      freezeTableName: true,
    }
  );
  return ProjectTeam;
};
