module.exports = (sequelize, Sequelize) => {
  const LaborContractorMetric = sequelize.define(
    'LaborContractorMetric',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vendor_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      efficiency: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
      },
      safety_score: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
      },
      retention_rate: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      adherence_to_schedule: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      personnel_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tasks_completed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tasks_total: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      trend: {
        type: Sequelize.ENUM('up', 'down', 'stable'),
        defaultValue: 'stable',
      },
      recorded_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      freezeTableName: true,
      tableName: 'LaborContractorMetric',
      indexes: [
        { fields: ['company_id', 'vendor_id'] },
        { fields: ['recorded_date'] },
      ],
    }
  );

  return LaborContractorMetric;
};