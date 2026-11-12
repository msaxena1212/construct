module.exports = (sequelize, Sequelize) => {
  const BOQItem = sequelize.define(
    "BOQ_ITEMS",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      item_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING, // e.g., Earthwork, Concrete, Masonry, MEP, Finishing
        allowNull: true,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estimated_qty: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      unit_rate: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total_estimated_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      executed_qty: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      billed_amount: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0,
      },
      wbs_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cbs_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return BOQItem;
};
