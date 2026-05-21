module.exports = (sequelize, Sequelize) => {

  const category = sequelize.define("CATEGORY", {

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    category_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    category_type: {
      type: Sequelize.STRING
    },

    status: {
      type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    },

    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

  }, {
    freezeTableName: true,
    tableName: "CATEGORY",
    timestamps: true,
  });

  return category;
};