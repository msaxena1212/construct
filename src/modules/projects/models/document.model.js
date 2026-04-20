module.exports = (sequelize, Sequelize) => {
  const ProjectDocument = sequelize.define(
    "PROJECT_DOCUMENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mimetype: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return ProjectDocument;
};
