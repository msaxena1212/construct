'use strict';
/**
 * SQLite table rebuild for migrations that must change a column definition or add a table constraint.
 *
 * SQLite cannot add a CHECK constraint or a foreign key to an existing table in place. This helper rebuilds one table
 * inside the migration's transaction:
 *   1. reads the table's CREATE statement and its indexes from sqlite_master;
 *   2. applies the caller's transform to the CREATE statement; the transform must fail closed if the text is not
 *      what it expects;
 *   3. creates the rebuilt table under a temporary name, copies every row, drops the original, renames the rebuilt
 *      table to the original name, and recreates the indexes.
 *
 * PRAGMA defer_foreign_keys = ON is set inside the transaction. Child tables that reference the rebuilt table keep
 * their foreign keys: checks are deferred to commit, and they pass because the rebuilt table has the same name and
 * the same rows. (PRAGMA foreign_keys cannot be changed inside a transaction, so it is not used.)
 * WARNING: dropping the original table is an implicit DELETE when foreign keys are enforced, so ON DELETE CASCADE
 * child rows are deleted by the rebuild, and ON DELETE SET NULL children are nulled. Deferral does not prevent this.
 * Use the rebuild only where the children of the table are empty or use RESTRICT, or use another approach (for
 * example ALTER TABLE ... DROP COLUMN for removing a column).
 *
 * Refuses a table that has triggers, because a rebuild would not carry them over. SQLite only.
 */
const TEMP_SUFFIX = '__rebuild';

function assertSqlite(queryInterface) {
  if (queryInterface.sequelize.getDialect() !== 'sqlite') {
    throw new Error('MIGRATION_REFUSED: SQLite is the only permitted database.');
  }
}

/**
 * Rebuilds `table` with the CREATE statement returned by `transform(createSql, table)`.
 * @param {object} queryInterface
 * @param {string} table
 * @param {(sql: string, table: string) => string} transform
 * @param {object} transaction
 */
async function rebuildTable(queryInterface, table, transform, transaction) {
  assertSqlite(queryInterface);
  const sequelize = queryInterface.sequelize;
  const q = (sql, options = {}) => sequelize.query(sql, { transaction, ...options });
  const select = sequelize.QueryTypes.SELECT;
  const replacements = { table };

  await q('PRAGMA defer_foreign_keys = ON');

  const [definition] = await q("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = :table", { replacements, type: select });
  if (!definition || !definition.sql) throw new Error(`REBUILD_REFUSED: table ${table} was not found`);

  const [{ n: triggerCount }] = await q(
    "SELECT COUNT(*) AS n FROM sqlite_master WHERE type = 'trigger' AND tbl_name = :table",
    { replacements, type: select }
  );
  if (Number(triggerCount) !== 0) throw new Error(`REBUILD_REFUSED: table ${table} has triggers`);

  const indexes = await q(
    "SELECT sql FROM sqlite_master WHERE type = 'index' AND tbl_name = :table AND sql IS NOT NULL",
    { replacements, type: select }
  );
  const columns = (await q(`PRAGMA table_info('${table}')`, { type: select })).map((c) => c.name);
  if (columns.length === 0) throw new Error(`REBUILD_REFUSED: table ${table} has no columns`);

  // The CREATE statement may quote the table name with backticks or double quotes; both are accepted.
  const head = new RegExp(`^CREATE TABLE (["\`])${table}\\1 \\(`);
  if (!head.test(definition.sql)) throw new Error(`REBUILD_REFUSED: unexpected CREATE statement for ${table}`);

  const transformed = transform(definition.sql, table);
  const temp = `${table}${TEMP_SUFFIX}`;
  const createSql = transformed.replace(head, `CREATE TABLE "${temp}" (`);
  if (createSql === transformed) throw new Error(`REBUILD_REFUSED: could not name the rebuilt table for ${table}`);

  const list = columns.map((c) => `"${c}"`).join(', ');
  await q(createSql);
  await q(`INSERT INTO "${temp}" (${list}) SELECT ${list} FROM "${table}"`);
  await q(`DROP TABLE "${table}"`);
  await q(`ALTER TABLE "${temp}" RENAME TO "${table}"`);
  for (const index of indexes) await q(index.sql);
}

module.exports = { rebuildTable, assertSqlite };
