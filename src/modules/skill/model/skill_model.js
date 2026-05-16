module.exports = (sequelize, Sequelize) => {

  const Skill = sequelize.define("SKILL", {

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    skill_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
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
    tableName: "SKILL",
    timestamps: true,
  });

  return Skill;
};