module.exports = (sequelize, Sequelize) => {
  const VendorInvoice = sequelize.define("VENDORS_INVOICE", {
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
    invoice_number: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    invoice_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    items: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    },
    subtotal: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0,
    },
    tax_rate: {
      type: Sequelize.TINYINT.UNSIGNED,
      defaultValue: 18,
    },
    tax_amount: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0,
    },
    grand_total: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0,
    },
    status: {
      type: Sequelize.ENUM("Pending", "Paid", "Rejected"),
      defaultValue: "Pending",
    },
  }, {
    freezeTableName: true,
  });

  return VendorInvoice;
};