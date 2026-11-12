"use strict";
/**
 * Reconciles migration-owned tables with the canonical model definitions.
 *
 * Found by comparing the migration chain with the Sequelize models (scripts/schema/compare.js):
 * the tables below were created by earlier migrations without these foreign keys or indexes.
 * Columns and types already matched; only constraints and indexes were missing.
 *
 * Fresh installs apply this after the earlier migrations. Existing databases must be checked with
 * scripts/schema/adopt-report.js first; this migration is never stamped automatically.
 */

const FOREIGN_KEYS = [
  {
    "table": "CONTRACTOR_RA_BILLS",
    "name": "fk_CONTRACTOR_RA_BILLS_vendor_id",
    "column": "vendor_id",
    "refTable": "VENDORS",
    "refColumn": "id",
    "onDelete": "NO ACTION"
  },
  {
    "table": "CONTRACTOR_RA_BILLS",
    "name": "fk_CONTRACTOR_RA_BILLS_project_id",
    "column": "project_id",
    "refTable": "PROJECT",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "MEASUREMENT_BOOKS",
    "name": "fk_MEASUREMENT_BOOKS_project_id",
    "column": "project_id",
    "refTable": "PROJECT",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "MEASUREMENT_BOOKS",
    "name": "fk_MEASUREMENT_BOOKS_company_id",
    "column": "company_id",
    "refTable": "RBAC_COMPANY_MASTER",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "MEASUREMENT_BOOK_ITEMS",
    "name": "fk_MEASUREMENT_BOOK_ITEMS_ra_bill_id",
    "column": "ra_bill_id",
    "refTable": "CONTRACTOR_RA_BILLS",
    "refColumn": "id",
    "onDelete": "SET NULL"
  },
  {
    "table": "MEASUREMENT_BOOK_ITEMS",
    "name": "fk_MEASUREMENT_BOOK_ITEMS_boq_item_id",
    "column": "boq_item_id",
    "refTable": "BOQ_ITEMS",
    "refColumn": "id",
    "onDelete": "NO ACTION"
  },
  {
    "table": "MEASUREMENT_BOOK_ITEMS",
    "name": "fk_MEASUREMENT_BOOK_ITEMS_mb_id",
    "column": "mb_id",
    "refTable": "MEASUREMENT_BOOKS",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_BUDGET",
    "name": "fk_PROJECT_BUDGET_project_id",
    "column": "project_id",
    "refTable": "PROJECT",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_BUDGET_HEAD",
    "name": "fk_PROJECT_BUDGET_HEAD_project_id",
    "column": "project_id",
    "refTable": "PROJECT",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_BUDGET_HEAD_ALLOCATION",
    "name": "fk_PROJECT_BUDGET_HEAD_ALLOCATION_budget_head_id",
    "column": "budget_head_id",
    "refTable": "PROJECT_BUDGET_HEAD",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_BUDGET_HEAD_ALLOCATION",
    "name": "fk_PROJECT_BUDGET_HEAD_ALLOCATION_budget_id",
    "column": "budget_id",
    "refTable": "PROJECT_BUDGET",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_BUDGET_LINE",
    "name": "fk_PROJECT_BUDGET_LINE_boq_item_id",
    "column": "boq_item_id",
    "refTable": "BOQ_ITEMS",
    "refColumn": "id",
    "onDelete": "SET NULL"
  },
  {
    "table": "PROJECT_BUDGET_LINE",
    "name": "fk_PROJECT_BUDGET_LINE_cbs_id",
    "column": "cbs_id",
    "refTable": "PROJECT_CBS",
    "refColumn": "id",
    "onDelete": "NO ACTION"
  },
  {
    "table": "PROJECT_BUDGET_LINE",
    "name": "fk_PROJECT_BUDGET_LINE_wbs_id",
    "column": "wbs_id",
    "refTable": "PROJECT_WBS",
    "refColumn": "id",
    "onDelete": "NO ACTION"
  },
  {
    "table": "PROJECT_BUDGET_LINE",
    "name": "fk_PROJECT_BUDGET_LINE_budget_head_id",
    "column": "budget_head_id",
    "refTable": "PROJECT_BUDGET_HEAD",
    "refColumn": "id",
    "onDelete": "SET NULL"
  },
  {
    "table": "PROJECT_BUDGET_LINE",
    "name": "fk_PROJECT_BUDGET_LINE_budget_id",
    "column": "budget_id",
    "refTable": "PROJECT_BUDGET",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_CBS",
    "name": "fk_PROJECT_CBS_company_id",
    "column": "company_id",
    "refTable": "RBAC_COMPANY_MASTER",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_WBS",
    "name": "fk_PROJECT_WBS_parent_id",
    "column": "parent_id",
    "refTable": "PROJECT_WBS",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "PROJECT_WBS",
    "name": "fk_PROJECT_WBS_project_id",
    "column": "project_id",
    "refTable": "PROJECT",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "VARIATION_ORDERS",
    "name": "fk_VARIATION_ORDERS_project_id",
    "column": "project_id",
    "refTable": "PROJECT",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "VARIATION_ORDERS",
    "name": "fk_VARIATION_ORDERS_company_id",
    "column": "company_id",
    "refTable": "RBAC_COMPANY_MASTER",
    "refColumn": "id",
    "onDelete": "CASCADE"
  },
  {
    "table": "VARIATION_ORDER_ITEMS",
    "name": "fk_VARIATION_ORDER_ITEMS_boq_item_id",
    "column": "boq_item_id",
    "refTable": "BOQ_ITEMS",
    "refColumn": "id",
    "onDelete": "SET NULL"
  },
  {
    "table": "VARIATION_ORDER_ITEMS",
    "name": "fk_VARIATION_ORDER_ITEMS_variation_order_id",
    "column": "variation_order_id",
    "refTable": "VARIATION_ORDERS",
    "refColumn": "id",
    "onDelete": "CASCADE"
  }
];

const INDEXES = [
  {
    "table": "PROJECT_BUDGET",
    "name": "idx_project_budget_company_id,project_id,status",
    "fields": [
      "company_id",
      "project_id",
      "status"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_BUDGET_HEAD",
    "name": "idx_project_budget_head_company_id,project_id",
    "fields": [
      "company_id",
      "project_id"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_BUDGET_HEAD_ALLOCATION",
    "name": "idx_project_budget_head_allocation_company_id,proje_0d88641d",
    "fields": [
      "company_id",
      "project_id",
      "budget_head_id"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_BUDGET_LINE",
    "name": "idx_project_budget_line_wbs_id,cbs_id",
    "fields": [
      "wbs_id",
      "cbs_id"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_CBS",
    "name": "idx_project_cbs_company_id,category",
    "fields": [
      "company_id",
      "category"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_COMMITMENT_LEDGER",
    "name": "idx_project_commitment_ledger_wbs_id,cbs_id",
    "fields": [
      "wbs_id",
      "cbs_id"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_COST_LEDGER",
    "name": "idx_project_cost_ledger_wbs_id,cbs_id",
    "fields": [
      "wbs_id",
      "cbs_id"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_WBS",
    "name": "idx_project_wbs_company_id,project_id",
    "fields": [
      "company_id",
      "project_id"
    ],
    "unique": false
  },
  {
    "table": "PROJECT_WBS",
    "name": "idx_project_wbs_parent_id",
    "fields": [
      "parent_id"
    ],
    "unique": false
  }
];

/**
 * Lists user-defined indexes for one table. SQLite rebuilds a table when a constraint changes and
 * drops its explicit indexes, so they are captured first and restored afterwards.
 */
async function listIndexes(queryInterface, table, transaction) {
  const sequelize = queryInterface.sequelize;
  const q = (sql) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, transaction });
  if (sequelize.getDialect() === "sqlite") {
    const list = await q(`PRAGMA index_list('${table}')`);
    const out = [];
    for (const idx of list) {
      if (idx.name.startsWith("sqlite_autoindex")) continue;
      const cols = await q(`PRAGMA index_info('${idx.name}')`);
      out.push({ name: idx.name, unique: !!idx.unique, fields: cols.sort((a, b) => a.seqno - b.seqno).map((c) => c.name) });
    }
    return out;
  }
  const rows = await queryInterface.showIndex(table, { transaction });
  const byName = new Map();
  for (const idx of rows) {
    if (idx.primary || idx.name === "PRIMARY") continue;
    if (!byName.has(idx.name)) byName.set(idx.name, { name: idx.name, unique: !!idx.unique, fields: [] });
    byName.get(idx.name).fields.push(...(idx.fields || []).map((f) => f.attribute));
  }
  return [...byName.values()];
}

/**
 * SQLite cannot drop a named constraint in place. Sequelize's removeConstraint reads the table definition
 * outside the transaction, so removing two constraints on one table inside a transaction restores the
 * first one. This removes every named foreign key of one table in a single rebuild, reading the definition
 * inside the transaction.
 */
async function sqliteRemoveForeignKeys(queryInterface, table, names, transaction) {
  const sequelize = queryInterface.sequelize;
  const [row] = await sequelize.query(
    "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = :table",
    { replacements: { table }, type: sequelize.QueryTypes.SELECT, transaction }
  );
  if (!row) throw new Error(`table ${table} not found while removing foreign keys`);
  let sql = row.sql;
  for (const name of names) {
    const snippet = new RegExp(
      ",\\s*CONSTRAINT \\`" + name + "\\` FOREIGN KEY \\([^)]*\\) REFERENCES \\`[^\\`]+\\` \\([^)]*\\) ON UPDATE [^,)]+? ON DELETE [^,)]+"
    );
    if (!snippet.test(sql)) throw new Error(`constraint ${name} not found on ${table}`);
    sql = sql.replace(snippet, "");
  }
  const fields = await queryInterface.describeTable(table, { transaction });
  const statements = queryInterface.queryGenerator
    ._alterConstraintQuery(table, fields, `${sql};`)
    .split(";")
    .filter((q) => q.trim() !== "");
  for (const statement of statements) {
    await sequelize.query(`${statement};`, { raw: true, transaction });
  }
}

module.exports = {
  FOREIGN_KEYS,
  INDEXES,

  async up(queryInterface, Sequelize, transaction) {
    const tables = [...new Set([...FOREIGN_KEYS.map((f) => f.table), ...INDEXES.map((i) => i.table)])];
    const before = {};
    for (const table of tables) before[table] = await listIndexes(queryInterface, table, transaction);

    for (const fk of FOREIGN_KEYS) {
      await queryInterface.addConstraint(fk.table, {
        fields: [fk.column],
        type: "foreign key",
        name: fk.name,
        references: { table: fk.refTable, field: fk.refColumn },
        onDelete: fk.onDelete,
        onUpdate: "CASCADE",
        transaction,
      });
    }

    for (const table of tables) {
      const present = new Set((await listIndexes(queryInterface, table, transaction)).map((i) => i.name));
      for (const idx of before[table]) {
        if (!present.has(idx.name)) {
          await queryInterface.addIndex(table, idx.fields, { name: idx.name, unique: idx.unique, transaction });
        }
      }
    }

    for (const idx of INDEXES) {
      await queryInterface.addIndex(idx.table, idx.fields, { name: idx.name, unique: idx.unique, transaction });
    }
  },

  async down(queryInterface, Sequelize, transaction) {
    const tables = [...new Set([...FOREIGN_KEYS.map((f) => f.table), ...INDEXES.map((i) => i.table)])];
    const before = {};
    for (const table of tables) before[table] = await listIndexes(queryInterface, table, transaction);

    // 1. Drop the foreign keys. SQLite rebuilds each table, which also drops its explicit indexes.
    if (queryInterface.sequelize.getDialect() === "sqlite") {
      for (const table of [...new Set(FOREIGN_KEYS.map((f) => f.table))]) {
        const names = FOREIGN_KEYS.filter((f) => f.table === table).map((f) => f.name);
        await sqliteRemoveForeignKeys(queryInterface, table, names, transaction);
      }
    } else {
      for (const fk of FOREIGN_KEYS) {
        await queryInterface.removeConstraint(fk.table, fk.name, { transaction });
      }
    }

    // 2. Drop this migration's own indexes if they are still present.
    for (const table of tables) {
      const present = new Set((await listIndexes(queryInterface, table, transaction)).map((i) => i.name));
      for (const idx of INDEXES.filter((i) => i.table === table)) {
        if (present.has(idx.name)) await queryInterface.removeIndex(table, idx.name, { transaction });
      }
    }

    // 3. Restore the pre-existing indexes that the table rebuild removed.
    const own = new Set(INDEXES.map((i) => i.name));
    for (const table of tables) {
      const present = new Set((await listIndexes(queryInterface, table, transaction)).map((i) => i.name));
      for (const idx of before[table]) {
        if (!present.has(idx.name) && !own.has(idx.name)) {
          await queryInterface.addIndex(table, idx.fields, { name: idx.name, unique: idx.unique, transaction });
        }
      }
    }
  },
};
