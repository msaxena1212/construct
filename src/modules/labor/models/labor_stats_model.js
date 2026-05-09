// modules/labor/models/labor_stats.model.js
module.exports = (sequelize, Sequelize) => {
  const LaborStats = sequelize.define(
    'LaborStats',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      active_crews: { type: Sequelize.INTEGER, defaultValue: 0 },
      total_personnel: { type: Sequelize.INTEGER, defaultValue: 0 },
      skill_compliance: { type: Sequelize.DECIMAL(5, 2), defaultValue: 0 },
      overtime_alerts: { type: Sequelize.INTEGER, defaultValue: 0 },
      recorded_date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },
    },
    {
      freezeTableName: true,
      tableName: 'LaborStats',
      indexes: [{ unique: true, fields: ['company_id', 'recorded_date'] }],
    }
  );
  return LaborStats;
};