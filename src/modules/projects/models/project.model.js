module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    "PROJECT",
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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      completion_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      budget_total: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },
      budget_used: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },
      status: {
        type: Sequelize.ENUM("On Track", "Delayed", "Completed"),
        defaultValue: "On Track",
      },
      // Thumbnail/Image URL for the project card
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      progress: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100
        }
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Project;
};
