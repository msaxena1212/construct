module.exports = (sequelize, Sequelize) => {
  const LaborWorkerActivity = sequelize.define(
    'LaborWorkerActivity',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      labor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        comment: 'FK → Labor.id',
      },
      label: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      activity_type: {
        type: Sequelize.ENUM('primary', 'secondary', 'solid'),
        defaultValue: 'primary',
      },
      position_left: {
        type: Sequelize.STRING(10),
        defaultValue: '0%',
        comment: 'CSS left % for timeline bar',
      },
      width: {
        type: Sequelize.STRING(10),
        defaultValue: '50%',
        comment: 'CSS width % for timeline bar',
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      activity_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      freezeTableName: true,
      tableName: 'LaborWorkerActivity',
      indexes: [
        { fields: ['labor_id', 'activity_date'] },
      ],
    }
  );

  return LaborWorkerActivity;
};