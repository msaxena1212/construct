module.exports = (sequelize, Sequelize) => {
  const RolePermission = sequelize.define(
    "RBAC_ROLE_PERMISSION_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      can_create: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      can_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      can_update: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      can_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return RolePermission;
};
