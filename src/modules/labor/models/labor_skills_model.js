// modules/labor/models/labor_skills.model.js
module.exports = (sequelize, Sequelize) => {
  const LaborSkillsDistribution = sequelize.define(
    'LaborSkillsDistribution',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      skill_name: { type: Sequelize.STRING(100), allowNull: false },
      personnel_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      color: { type: Sequelize.STRING(20), defaultValue: '#6366f1' },
      sort_order: { type: Sequelize.INTEGER, defaultValue: 0 },
    },
    {
      freezeTableName: true,
      tableName: 'LaborSkillsDistribution',
      indexes: [{ unique: true, fields: ['company_id', 'skill_name'] }],
    }
  );
  return LaborSkillsDistribution;
};