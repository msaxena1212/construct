module.exports = (sequelize, Sequelize) => {
  const RetentionRelease = sequelize.define(
    "RETENTION_RELEASES",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      released_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        { name: "idx_retention_releases_project_vendor", fields: ["project_id", "vendor_id"] },
      ],
    }
  );
  return RetentionRelease;
};
