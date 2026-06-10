module.exports = (sequelize, Sequelize) => {
  const Meeting = sequelize.define(
    "MEETING",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
        defaultValue: "10:00",
      },
      duration: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 30,
      },
      attendees: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      meet_link: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      project_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      vendor_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      vendor_ids: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      company_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "MEETING",
      timestamps: true,
    }
  );

  return Meeting;
};