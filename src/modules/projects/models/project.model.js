module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    "PROJECT",
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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      completion_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      // Handover starts the defect liability period (DLP). Retention can be released only after the DLP ends.
      handover_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dlp_months: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 12,
      },
      budget_total: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },
      budget_used: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },
      status: {
        type: Sequelize.ENUM("On Track", "Delayed", "Completed"),
        defaultValue: "On Track",
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      material_total: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      material_used: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      equipment_total: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      equipment_used: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      labor_total: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      labor_used: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      other_total: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      other_used: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0,
      },

      progress: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100
        }
      },

      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true,
      },
      place_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // Project master data (migration 20261101000001-project-master-data.js)
      project_code: { type: Sequelize.STRING(40), allowNull: true },
      contract_type: { type: Sequelize.STRING(30), allowNull: true },
      currency: { type: Sequelize.STRING(3), allowNull: false, defaultValue: "INR" },
      start_date: { type: Sequelize.DATEONLY, allowNull: true },
      location_name: { type: Sequelize.STRING(200), allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "CLIENT_MASTER", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      consultant_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "CONSULTANT_MASTER", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      project_manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "RBAC_USER", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      freezeTableName: true,
      indexes: [{ name: "ux_project_company_code", unique: true, fields: ["company_id", "project_code"] }],
    }
  );
  return Project;
};
