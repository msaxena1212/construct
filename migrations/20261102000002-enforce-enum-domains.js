'use strict';
/**
 * Resolves D-2 (docs/CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md, section 6). Forward migration.
 *
 * The models declare eleven status and type columns as ENUM. The migrations declared them as VARCHAR(n) with no
 * CHECK constraint, so the database accepted any text. This migration rebuilds the nine tables that hold them:
 *   - the column becomes TEXT (the same declared type the models produce) with a CHECK constraint over the model's
 *     value list;
 *   - the rows, indexes and foreign keys are kept (see src/core/utils/sqlite-rebuild.js).
 *
 * down() restores VARCHAR(n) and removes the CHECK constraints.
 */
const { rebuildTable, assertSqlite } = require('../src/core/utils/sqlite-rebuild');

// Value lists are copied from the Sequelize ENUM declarations in src/modules/*/models. Keep them in step.
const ENUM_DOMAINS = [
  { table: 'GOODS_RECEIPT_NOTE', column: 'status', length: 50, values: ['received', 'inspected', 'partially_accepted', 'rejected'] },
  { table: 'PROJECT_BUDGET', column: 'status', length: 30, values: ['draft', 'submitted', 'approved', 'superseded', 'rejected'] },
  { table: 'PROJECT_BUDGET_HEAD', column: 'status', length: 30, values: ['active', 'inactive'] },
  { table: 'PROJECT_CBS', column: 'category', length: 30, values: ['material', 'labour', 'equipment', 'subcontractor', 'overhead'] },
  { table: 'PROJECT_CBS', column: 'status', length: 20, values: ['active', 'inactive'] },
  {
    table: 'PROJECT_COMMITMENT_LEDGER',
    column: 'event_type',
    length: 40,
    values: ['commitment_created', 'commitment_released', 'commitment_amended', 'commitment_cancelled'],
  },
  { table: 'PROJECT_COST_LEDGER', column: 'cost_category', length: 30, values: ['labour', 'equipment', 'subcontractor', 'overhead'] },
  { table: 'PROJECT_COST_LEDGER', column: 'event_type', length: 30, values: ['accrual', 'reversal', 'adjustment'] },
  { table: 'PROJECT_WBS', column: 'status', length: 30, values: ['active', 'completed', 'on_hold', 'archived'] },
  {
    table: 'PURCHASE_ORDER',
    column: 'status',
    length: 50,
    values: ['draft', 'submitted', 'approved', 'partially_received', 'completed', 'cancelled'],
  },
  {
    table: 'STOCK_LEDGER',
    column: 'movement_type',
    length: 50,
    values: [
      'opening_balance', 'receipt', 'issue', 'consumption', 'transfer_in', 'transfer_out', 'adjustment', 'reversal',
      'location_placement', 'location_writeoff', 'location_issue',
    ],
  },
];

const quoteValue = (v) => `'${v.replace(/'/g, "''")}'`;

/** Groups the domains by table, so each table is rebuilt once. */
function byTable() {
  const map = new Map();
  for (const d of ENUM_DOMAINS) {
    if (!map.has(d.table)) map.set(d.table, []);
    map.get(d.table).push(d);
  }
  return map;
}

/** The column definition as the migrations wrote it: `col` VARCHAR(n). Exactly one must match. */
function declaredVarchar(column, length) {
  return new RegExp(`([\`"])${column}\\1 VARCHAR\\(${length}\\)`, 'g');
}

module.exports = {
  ENUM_DOMAINS,

  async up(queryInterface, Sequelize, transaction) {
    assertSqlite(queryInterface);
    for (const [table, domains] of byTable()) {
      await rebuildTable(
        queryInterface,
        table,
        (sql) => {
          let out = sql;
          for (const d of domains) {
            const found = out.match(declaredVarchar(d.column, d.length)) || [];
            if (found.length !== 1) {
              throw new Error(`ENUM_DOMAIN_REFUSED: expected one VARCHAR(${d.length}) for ${table}.${d.column}, found ${found.length}`);
            }
            const list = d.values.map(quoteValue).join(', ');
            out = out.replace(
              declaredVarchar(d.column, d.length),
              `\`${d.column}\` TEXT CHECK (\`${d.column}\` IN (${list}))`
            );
          }
          return out;
        },
        transaction
      );
    }
  },

  async down(queryInterface, Sequelize, transaction) {
    assertSqlite(queryInterface);
    for (const [table, domains] of byTable()) {
      await rebuildTable(
        queryInterface,
        table,
        (sql) => {
          let out = sql;
          for (const d of domains) {
            const checked = new RegExp(`\`${d.column}\` TEXT CHECK \\(\`${d.column}\` IN \\([^)]*\\)\\)`);
            if (!checked.test(out)) throw new Error(`ENUM_DOMAIN_REFUSED: no CHECK on ${table}.${d.column} to remove`);
            out = out.replace(checked, `\`${d.column}\` VARCHAR(${d.length})`);
          }
          return out;
        },
        transaction
      );
    }
  },
};
