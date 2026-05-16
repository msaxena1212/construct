module.exports = (sequelize, Sequelize) => {
  const VendorAudit = sequelize.define("VENDORS_AUDIT", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quality: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    timeliness: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    safety: {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: false,
    },
    composite_score: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
    },
    observations: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    audit_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  return VendorAudit;
};