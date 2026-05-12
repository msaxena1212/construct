module.exports = (sequelize, Sequelize) => {
  const Labor = sequelize.define('Labor', {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    vendor_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },

    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    avatar_url: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM('On Site', 'Active', 'Off Site', 'Break', 'Overtime'),
      defaultValue: 'Active',
    },
    skill_category: {
      type: Sequelize.ENUM(
        'Masonry', 'Electrical', 'Structural Steel',
        'Plumbing', 'Foremen', 'Safety Officers', 'Other'
      ),
      defaultValue: 'Other',
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    is_overtime: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    efficiency: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0,
    },
    safety_score: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0,
    },
    retention_rate: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    adherence_to_schedule: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    tasks_completed: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    tasks_total: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    trend: {
      type: Sequelize.ENUM('up', 'down', 'stable'),
      defaultValue: 'stable',
    },

    earned_value: {
      type: Sequelize.DECIMAL(14, 2),
      defaultValue: 0,
    },
    actual_cost: {
      type: Sequelize.DECIMAL(14, 2),
      defaultValue: 0,
    },

    activity_label: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    activity_type: {
      type: Sequelize.ENUM('primary', 'secondary', 'solid'),
      defaultValue: 'primary',
    },
    activity_left: {
      type: Sequelize.STRING(10),
      defaultValue: '5%',
    },
    activity_width: {
      type: Sequelize.STRING(10),
      defaultValue: '70%',
    },
    activity_label_2: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    activity_type_2: {
      type: Sequelize.ENUM('primary', 'secondary', 'solid'),
      allowNull: true,
    },
    activity_left_2: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    activity_width_2: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },

    work_date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },

  }, {
    freezeTableName: true,
    tableName: 'Labor',
    indexes: [
      { fields: ['company_id'] },
      { fields: ['vendor_id'] },
      { fields: ['company_id', 'vendor_id'] },
      { fields: ['company_id', 'work_date'] },
      { fields: ['skill_category'] },
    ],
  });

  return Labor;
};