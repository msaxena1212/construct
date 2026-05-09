module.exports = (sequelize, Sequelize) => {
  const Labor = sequelize.define(
    'Labor',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vendor_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      avatar_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('On Site', 'Active', 'Off Site', 'Break', 'Overtime'),
        defaultValue: 'Active',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      tableName: 'Labor',
      indexes: [
        { fields: ['company_id'] },
        { fields: ['vendor_id'] },
      ],
    }
  );

  return Labor;
};