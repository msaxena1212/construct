"use strict";
/**
 * Project master data (Construction ERP scope, section 03: Project Setup & Master Data).
 *
 * Adds project header details (code, contract type, currency, start date, location, description,
 * client, consultant and project manager links) and the project structure tables: phases, zones / blocks /
 * floors, disciplines, cost centres and work packages. Clients and consultants are company masters.
 *
 * Every table is company- and project-scoped through explicit foreign keys. Codes are unique within their
 * scope, so one company can never reuse a project code and one project can never reuse a structure code.
 */

const COMPANY_FK = { model: "RBAC_COMPANY_MASTER", key: "id" };

module.exports = {
  async up(queryInterface, Sequelize, transaction) {
    const { STRING, INTEGER, DATE, DATEONLY, TEXT, ENUM, BOOLEAN } = Sequelize;
    const now = { createdAt: { type: DATE, allowNull: false }, updatedAt: { type: DATE, allowNull: false } };

    // ── Masters ────────────────────────────────────────────────────────────────
    await queryInterface.createTable(
      "CLIENT_MASTER",
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        company_id: { type: INTEGER, allowNull: false, references: COMPANY_FK, onDelete: "CASCADE", onUpdate: "CASCADE" },
        name: { type: STRING(200), allowNull: false },
        code: { type: STRING(40), allowNull: true },
        contact_person: { type: STRING(150), allowNull: true },
        email: { type: STRING(150), allowNull: true },
        phone: { type: STRING(40), allowNull: true },
        address: { type: TEXT, allowNull: true },
        gst_no: { type: STRING(20), allowNull: true },
        ...now,
      },
      { transaction }
    );
    await queryInterface.addIndex("CLIENT_MASTER", ["company_id", "name"], { name: "ux_client_master_company_name", unique: true, transaction });
    await queryInterface.addIndex("CLIENT_MASTER", ["company_id", "code"], { name: "ux_client_master_company_code", unique: true, transaction });

    await queryInterface.createTable(
      "CONSULTANT_MASTER",
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        company_id: { type: INTEGER, allowNull: false, references: COMPANY_FK, onDelete: "CASCADE", onUpdate: "CASCADE" },
        name: { type: STRING(200), allowNull: false },
        code: { type: STRING(40), allowNull: true },
        contact_person: { type: STRING(150), allowNull: true },
        email: { type: STRING(150), allowNull: true },
        phone: { type: STRING(40), allowNull: true },
        address: { type: TEXT, allowNull: true },
        ...now,
      },
      { transaction }
    );
    await queryInterface.addIndex("CONSULTANT_MASTER", ["company_id", "name"], { name: "ux_consultant_master_company_name", unique: true, transaction });
    await queryInterface.addIndex("CONSULTANT_MASTER", ["company_id", "code"], { name: "ux_consultant_master_company_code", unique: true, transaction });

    // ── Project header details ─────────────────────────────────────────────────
    await queryInterface.addColumn("PROJECT", "project_code", { type: STRING(40), allowNull: true }, { transaction });
    await queryInterface.addColumn("PROJECT", "contract_type", { type: STRING(30), allowNull: true }, { transaction });
    await queryInterface.addColumn("PROJECT", "currency", { type: STRING(3), allowNull: false, defaultValue: "INR" }, { transaction });
    await queryInterface.addColumn("PROJECT", "start_date", { type: DATEONLY, allowNull: true }, { transaction });
    await queryInterface.addColumn("PROJECT", "location_name", { type: STRING(200), allowNull: true }, { transaction });
    await queryInterface.addColumn("PROJECT", "description", { type: TEXT, allowNull: true }, { transaction });
    await queryInterface.addColumn(
      "PROJECT",
      "client_id",
      { type: INTEGER, allowNull: true, references: { model: "CLIENT_MASTER", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
      { transaction }
    );
    await queryInterface.addColumn(
      "PROJECT",
      "consultant_id",
      { type: INTEGER, allowNull: true, references: { model: "CONSULTANT_MASTER", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
      { transaction }
    );
    await queryInterface.addColumn(
      "PROJECT",
      "project_manager_id",
      { type: INTEGER, allowNull: true, references: { model: "RBAC_USER", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
      { transaction }
    );
    await queryInterface.addIndex("PROJECT", ["company_id", "project_code"], { name: "ux_project_company_code", unique: true, transaction });

    // ── Project structure ──────────────────────────────────────────────────────
    const projectFk = { model: "PROJECT", key: "id" };
    const scoped = (extra) => ({
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      company_id: { type: INTEGER, allowNull: false, references: COMPANY_FK, onDelete: "CASCADE", onUpdate: "CASCADE" },
      project_id: { type: INTEGER, allowNull: false, references: projectFk, onDelete: "CASCADE", onUpdate: "CASCADE" },
      ...extra,
      ...now,
    });

    await queryInterface.createTable(
      "PROJECT_PHASE",
      scoped({
        code: { type: STRING(40), allowNull: false },
        name: { type: STRING(200), allowNull: false },
        sequence_no: { type: INTEGER, allowNull: false, defaultValue: 1 },
        planned_start: { type: DATEONLY, allowNull: true },
        planned_end: { type: DATEONLY, allowNull: true },
        status: { type: ENUM("planned", "active", "completed"), allowNull: false, defaultValue: "planned" },
      }),
      { transaction }
    );
    await queryInterface.addIndex("PROJECT_PHASE", ["project_id", "code"], { name: "ux_project_phase_code", unique: true, transaction });

    await queryInterface.createTable(
      "PROJECT_ZONE",
      scoped({
        parent_id: { type: INTEGER, allowNull: true, references: { model: "PROJECT_ZONE", key: "id" }, onDelete: "CASCADE", onUpdate: "CASCADE" },
        zone_type: { type: ENUM("zone", "block", "floor"), allowNull: false },
        code: { type: STRING(40), allowNull: false },
        name: { type: STRING(200), allowNull: false },
      }),
      { transaction }
    );
    await queryInterface.addIndex("PROJECT_ZONE", ["project_id", "code"], { name: "ux_project_zone_code", unique: true, transaction });

    await queryInterface.createTable(
      "PROJECT_DISCIPLINE",
      scoped({
        code: { type: STRING(40), allowNull: false },
        name: { type: STRING(200), allowNull: false },
      }),
      { transaction }
    );
    await queryInterface.addIndex("PROJECT_DISCIPLINE", ["project_id", "code"], { name: "ux_project_discipline_code", unique: true, transaction });

    await queryInterface.createTable(
      "PROJECT_COST_CENTRE",
      scoped({
        code: { type: STRING(40), allowNull: false },
        name: { type: STRING(200), allowNull: false },
      }),
      { transaction }
    );
    await queryInterface.addIndex("PROJECT_COST_CENTRE", ["project_id", "code"], { name: "ux_project_cost_centre_code", unique: true, transaction });

    await queryInterface.createTable(
      "PROJECT_WORK_PACKAGE",
      scoped({
        phase_id: { type: INTEGER, allowNull: true, references: { model: "PROJECT_PHASE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        discipline_id: { type: INTEGER, allowNull: true, references: { model: "PROJECT_DISCIPLINE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        zone_id: { type: INTEGER, allowNull: true, references: { model: "PROJECT_ZONE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        cost_centre_id: { type: INTEGER, allowNull: true, references: { model: "PROJECT_COST_CENTRE", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        vendor_id: { type: INTEGER, allowNull: true, references: { model: "VENDORS", key: "id" }, onDelete: "SET NULL", onUpdate: "CASCADE" },
        package_code: { type: STRING(40), allowNull: false },
        name: { type: STRING(200), allowNull: false },
        package_type: { type: ENUM("in_house", "subcontract", "supply"), allowNull: false, defaultValue: "in_house" },
        status: { type: ENUM("planned", "active", "completed", "cancelled"), allowNull: false, defaultValue: "planned" },
      }),
      { transaction }
    );
    await queryInterface.addIndex("PROJECT_WORK_PACKAGE", ["project_id", "package_code"], { name: "ux_project_work_package_code", unique: true, transaction });
  },

  async down(queryInterface, Sequelize, transaction) {
    // SQLite rebuilds PROJECT to drop its columns, and dropping a parent table fires its ON DELETE actions.
    // With project rows present that could cascade into child tables, so the rollback is refused there.
    if (queryInterface.sequelize.getDialect() === "sqlite") {
      const rows = await queryInterface.sequelize.query('SELECT COUNT(*) AS n FROM "PROJECT"', {
        type: queryInterface.sequelize.QueryTypes.SELECT,
        transaction,
      });
      if (Number(rows[0].n) > 0) {
        throw new Error("Refusing to roll back project master data on SQLite while PROJECT rows exist: the table rebuild could cascade into child tables.");
      }
    }

    await queryInterface.dropTable("PROJECT_WORK_PACKAGE", { transaction });
    await queryInterface.dropTable("PROJECT_COST_CENTRE", { transaction });
    await queryInterface.dropTable("PROJECT_DISCIPLINE", { transaction });
    await queryInterface.dropTable("PROJECT_ZONE", { transaction });
    await queryInterface.dropTable("PROJECT_PHASE", { transaction });

    await queryInterface.removeIndex("PROJECT", "ux_project_company_code", { transaction });
    for (const column of ["project_manager_id", "consultant_id", "client_id", "description", "location_name", "start_date", "currency", "contract_type", "project_code"]) {
      await queryInterface.removeColumn("PROJECT", column, { transaction });
    }

    await queryInterface.dropTable("CONSULTANT_MASTER", { transaction });
    await queryInterface.dropTable("CLIENT_MASTER", { transaction });
  },
};
