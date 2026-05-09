// modules/labor/models/labor_heatmap.model.js
module.exports = (sequelize, Sequelize) => {
  const LaborHeatmap = sequelize.define(
    'LaborHeatmap',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      week_row: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: '0-indexed row (0=week1, 1=week2, 2=week3)',
      },
      day_col: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: '0=Mon … 6=Sun',
      },
      intensity: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: '0=none, 1=low, 2=med, 3=high, 4=peak',
      },
      recorded_date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },
    },
    {
      freezeTableName: true,
      tableName: 'LaborHeatmap',
      indexes: [
        { unique: true, fields: ['company_id', 'week_row', 'day_col', 'recorded_date'] },
      ],
    }
  );
  return LaborHeatmap;
};