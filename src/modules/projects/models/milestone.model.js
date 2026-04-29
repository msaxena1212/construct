module.exports = (sequelize, Sequelize) => {
  const Milestone = sequelize.define(
    "PROJECT_MILESTONE",
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
      phase: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      progress: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100
        }
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Not Started', 'In Progress', 'On Hold', 'Completed'),
        defaultValue: "Not Started",
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Milestone;
};
