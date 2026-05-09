// modules/labor/models/labor_financials.model.js
module.exports = (sequelize, Sequelize) => {
  const LaborFinancials = sequelize.define(
    'LaborFinancials',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      earned_value: { type: Sequelize.DECIMAL(14, 2), defaultValue: 0 },
      actual_cost: { type: Sequelize.DECIMAL(14, 2), defaultValue: 0 },
      cpi: { type: Sequelize.DECIMAL(5, 3), defaultValue: 1 },
      phase: { type: Sequelize.STRING(100), allowNull: true },
      budget_warning: { type: Sequelize.BOOLEAN, defaultValue: false },
      recorded_date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },
    },
    {
      freezeTableName: true,
      tableName: 'LaborFinancials',
      indexes: [{ unique: true, fields: ['company_id', 'recorded_date'] }],
    }
  );
  return LaborFinancials;
};