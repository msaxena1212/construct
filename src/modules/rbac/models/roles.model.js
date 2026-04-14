module.exports = (sequelize, Sequelize) => {
  const dispatchOrder = sequelize.define(
    "RBAC_ROLE_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('STATIC','CUSTOM')
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    },
  );
  return dispatchOrder;
};
