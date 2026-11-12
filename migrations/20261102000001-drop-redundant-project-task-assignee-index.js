'use strict';
/**
 * Resolves D-1 (docs/CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md, section 4). Forward migration; the baseline is unchanged.
 *
 * PROJECT_TASK_ASSIGNEE_user_id_task_id_unique duplicates the composite primary key (task_id, user_id): same columns,
 * same order, same BINARY collation, same ascending sort, unique, not partial, no expressions. The model declares the
 * same unique key, and SQLite folds that key into the primary-key index. Dropping the explicit copy changes no
 * enforcement and no data. The primary key itself is not touched.
 *
 * down() recreates the index with the definition the baseline used, so a rollback restores the previous schema exactly.
 * SQLite only. The statements are raw SQL on purpose: a call such as addIndex in this file would be read by the
 * baseline generator as ownership of the index.
 */
const INDEX = 'PROJECT_TASK_ASSIGNEE_user_id_task_id_unique';
const TABLE = 'PROJECT_TASK_ASSIGNEE';

function assertSqlite(queryInterface) {
  if (queryInterface.sequelize.getDialect() !== 'sqlite') {
    throw new Error('MIGRATION_REFUSED: SQLite is the only permitted database.');
  }
}

module.exports = {
  async up(queryInterface) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`DROP INDEX IF EXISTS "${INDEX}"`);
      return;
    }
    assertSqlite(queryInterface);
    await queryInterface.sequelize.query(`DROP INDEX \`${INDEX}\``);
  },

  async down(queryInterface) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`CREATE UNIQUE INDEX IF NOT EXISTS "${INDEX}" ON "${TABLE}" ("task_id", "user_id")`);
      return;
    }
    assertSqlite(queryInterface);
    await queryInterface.sequelize.query(`CREATE UNIQUE INDEX \`${INDEX}\` ON \`${TABLE}\` (\`task_id\`, \`user_id\`)`);
  },
};
