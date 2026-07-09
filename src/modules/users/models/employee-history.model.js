module.exports = (sequelize, Sequelize) => {
  const EmployeeHistory = sequelize.define(
    "RBAC_EMPLOYEE_HISTORY",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: Sequelize.ENUM(
          "INVITED",
          "INVITE_ACCEPTED",
          "ROLE_ASSIGNED",
          "ROLE_UPDATED",
          "PROFILE_UPDATED",
          "STATUS_ACTIVATED",
          "STATUS_DEACTIVATED"
        ),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return EmployeeHistory;
};