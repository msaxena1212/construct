module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "RBAC_COMPANY_MASTER",
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // What happens when an RA bill would exceed its budget head: 'warn' (record and allow), 'block' or 'off'.
      budget_gate_mode: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: 'warn',
      },
    },
    {
      freezeTableName: true,
    },
  );
  return User;
};
