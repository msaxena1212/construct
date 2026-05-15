module.exports = (sequelize, Sequelize) => {
  const QUOTATION = sequelize.define(
    "QUOTATION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      sku: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      category: {
        type: Sequelize.STRING,
      },

      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      unit_cost: {
        type: Sequelize.STRING,
      },

      total_cost: {
        type: Sequelize.STRING,
      },

      vendor_name: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.STRING,
      },

      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      quotation_number: {
        type: Sequelize.STRING,
        unique: true,
      },

      quotation_status: {
        type: Sequelize.ENUM(
          'Draft',
          'Sent',
          'Negotiating',
          'Approved',
          'Rejected'
        ),
        defaultValue: 'Draft'
      },

    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return QUOTATION;
};