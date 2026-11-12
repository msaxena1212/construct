"use strict";
/**
 * Project master data models (see migrations/20261101000001-project-master-data.js).
 * Each definition mirrors the migration exactly: types, nullability, defaults, unique scopes and foreign keys.
 * Exported as factories so src/models/index.js can register them with the same pattern as the other modules.
 */

const COMPANY_REF = { model: "RBAC_COMPANY_MASTER", key: "id" };

const scopedIds = (Sequelize) => ({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  company_id: { type: Sequelize.INTEGER, allowNull: false, references: COMPANY_REF, onDelete: "CASCADE", onUpdate: "CASCADE" },
  project_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: "PROJECT", key: "id" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

const masterDefinition = (Sequelize) => ({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  company_id: { type: Sequelize.INTEGER, allowNull: false, references: COMPANY_REF, onDelete: "CASCADE", onUpdate: "CASCADE" },
  name: { type: Sequelize.STRING(200), allowNull: false },
  code: { type: Sequelize.STRING(40), allowNull: true },
  contact_person: { type: Sequelize.STRING(150), allowNull: true },
  email: { type: Sequelize.STRING(150), allowNull: true },
  phone: { type: Sequelize.STRING(40), allowNull: true },
  address: { type: Sequelize.TEXT, allowNull: true },
});

module.exports = {
  client_master: (sequelize, Sequelize) =>
    sequelize.define(
      "CLIENT_MASTER",
      {
        ...masterDefinition(Sequelize),
        gst_no: { type: Sequelize.STRING(20), allowNull: true },
      },
      {
        tableName: "CLIENT_MASTER",
        freezeTableName: true,
        indexes: [
          { name: "ux_client_master_company_name", unique: true, fields: ["company_id", "name"] },
          { name: "ux_client_master_company_code", unique: true, fields: ["company_id", "code"] },
        ],
      }
    ),

  consultant_master: (sequelize, Sequelize) =>
    sequelize.define(
      "CONSULTANT_MASTER",
      masterDefinition(Sequelize),
      {
        tableName: "CONSULTANT_MASTER",
        freezeTableName: true,
        indexes: [
          { name: "ux_consultant_master_company_name", unique: true, fields: ["company_id", "name"] },
          { name: "ux_consultant_master_company_code", unique: true, fields: ["company_id", "code"] },
        ],
      }
    ),

  project_phase: (sequelize, Sequelize) =>
    sequelize.define(
      "PROJECT_PHASE",
      {
        ...scopedIds(Sequelize),
        code: { type: Sequelize.STRING(40), allowNull: false },
        name: { type: Sequelize.STRING(200), allowNull: false },
        sequence_no: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
        planned_start: { type: Sequelize.DATEONLY, allowNull: true },
        planned_end: { type: Sequelize.DATEONLY, allowNull: true },
        status: { type: Sequelize.ENUM("planned", "active", "completed"), allowNull: false, defaultValue: "planned" },
      },
      {
        tableName: "PROJECT_PHASE",
        freezeTableName: true,
        indexes: [{ name: "ux_project_phase_code", unique: true, fields: ["project_id", "code"] }],
      }
    ),

  project_zone: (sequelize, Sequelize) =>
    sequelize.define(
      "PROJECT_ZONE",
      {
        ...scopedIds(Sequelize),
        parent_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: "PROJECT_ZONE", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        zone_type: { type: Sequelize.ENUM("zone", "block", "floor"), allowNull: false },
        code: { type: Sequelize.STRING(40), allowNull: false },
        name: { type: Sequelize.STRING(200), allowNull: false },
      },
      {
        tableName: "PROJECT_ZONE",
        freezeTableName: true,
        indexes: [{ name: "ux_project_zone_code", unique: true, fields: ["project_id", "code"] }],
      }
    ),

  project_discipline: (sequelize, Sequelize) =>
    sequelize.define(
      "PROJECT_DISCIPLINE",
      {
        ...scopedIds(Sequelize),
        code: { type: Sequelize.STRING(40), allowNull: false },
        name: { type: Sequelize.STRING(200), allowNull: false },
      },
      {
        tableName: "PROJECT_DISCIPLINE",
        freezeTableName: true,
        indexes: [{ name: "ux_project_discipline_code", unique: true, fields: ["project_id", "code"] }],
      }
    ),

  project_cost_centre: (sequelize, Sequelize) =>
    sequelize.define(
      "PROJECT_COST_CENTRE",
      {
        ...scopedIds(Sequelize),
        code: { type: Sequelize.STRING(40), allowNull: false },
        name: { type: Sequelize.STRING(200), allowNull: false },
      },
      {
        tableName: "PROJECT_COST_CENTRE",
        freezeTableName: true,
        indexes: [{ name: "ux_project_cost_centre_code", unique: true, fields: ["project_id", "code"] }],
      }
    ),

  project_work_package: (sequelize, Sequelize) =>
    sequelize.define(
      "PROJECT_WORK_PACKAGE",
      {
        ...scopedIds(Sequelize),
        phase_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: "PROJECT_PHASE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        discipline_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: "PROJECT_DISCIPLINE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        zone_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: "PROJECT_ZONE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        cost_centre_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: "PROJECT_COST_CENTRE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        vendor_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: "VENDORS", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        package_code: { type: Sequelize.STRING(40), allowNull: false },
        name: { type: Sequelize.STRING(200), allowNull: false },
        package_type: { type: Sequelize.ENUM("in_house", "subcontract", "supply"), allowNull: false, defaultValue: "in_house" },
        status: { type: Sequelize.ENUM("planned", "active", "completed", "cancelled"), allowNull: false, defaultValue: "planned" },
      },
      {
        tableName: "PROJECT_WORK_PACKAGE",
        freezeTableName: true,
        indexes: [{ name: "ux_project_work_package_code", unique: true, fields: ["project_id", "package_code"] }],
      }
    ),
};
