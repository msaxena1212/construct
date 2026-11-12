module.exports = (sequelize, Sequelize) => {
  const DPR = sequelize.define(
    "DAILY_PROGRESS_REPORTS",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weather_summary: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      work_summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ai_executive_summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ai_delay_risks: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      total_workforce_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM("draft", "submitted", "approved", "rejected"),
        defaultValue: "draft",
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return DPR;
};
