module.exports = (sequelize, Sequelize) => {
  const LabourAttendance = sequelize.define(
    "LABOUR_ATTENDANCE",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      attendance_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      trade_type: {
        type: Sequelize.STRING, // e.g. "Mason", "Bar Bender", "Carpenter", "Helper", "Plumber", "Electrician"
        allowNull: false,
      },
      skill_level: {
        type: Sequelize.ENUM("skilled", "semi_skilled", "unskilled"),
        defaultValue: "skilled",
      },
      headcount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      shift: {
        type: Sequelize.ENUM("day", "night", "overtime"),
        defaultValue: "day",
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      overtime_hours: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
      },
      daily_wage_rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      total_cost: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
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

  return LabourAttendance;
};
