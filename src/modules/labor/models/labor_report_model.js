module.exports = (sequelize, Sequelize) => {
  const LaborReport = sequelize.define(
    'LaborReport',
    {
      id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
      },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING(255), allowNull: false },
      type: {
        type: Sequelize.ENUM('Technical', 'Financial', 'Safety', 'Quality', 'Milestone'),
        allowNull: false,
      },
      report_date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },
      author: { type: Sequelize.STRING(255), allowNull: true },
      status: {
        type: Sequelize.ENUM('Published', 'Draft', 'Archived'),
        defaultValue: 'Draft',
      },
      file_size: { type: Sequelize.STRING(20), defaultValue: '0 KB' },
    },
    {
      freezeTableName: true,
      tableName: 'LaborReport',
      indexes: [{ fields: ['company_id', 'status'] }],
    }
  );
  return LaborReport;
};