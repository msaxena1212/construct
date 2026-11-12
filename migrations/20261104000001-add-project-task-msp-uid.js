'use strict';
/**
 * Feature 3 follow-up: a re-import of an MS Project file replaces the earlier import instead of duplicating it.
 * Adds PROJECT_TASK.msp_uid, the task UID from the MSPDI file, which identifies a task within its import milestone.
 * Tasks created by hand keep msp_uid NULL and are never matched or removed by an import.
 *
 * Up: additive (ALTER TABLE ADD COLUMN) plus an index on (milestone_id, msp_uid).
 * Down: drops the index, then drops the column in place with ALTER TABLE ... DROP COLUMN (SQLite 3.35 or later).
 * A table rebuild was tried first and rejected: it drops PROJECT_TASK, and with foreign keys enforced that drop
 * cascades into TASK_CHILD and the other child tables with ON DELETE CASCADE. DROP COLUMN only edits the definition.
 */
const { assertSqlite } = require('../src/core/utils/sqlite-rebuild');

module.exports = {
  async up(queryInterface, Sequelize, transaction) {
    assertSqlite(queryInterface);
    // Table and column names are written as literals: scripts/schema/generate-baseline.js reads them to know which
    // columns and indexes a migration owns, so the baseline does not take them over.
    await queryInterface.addColumn('PROJECT_TASK', 'msp_uid', { type: Sequelize.INTEGER, allowNull: true }, { transaction });
    await queryInterface.addIndex('PROJECT_TASK', ['milestone_id', 'msp_uid'], { name: 'idx_project_task_milestone_msp_uid', transaction });
  },

  async down(queryInterface, Sequelize, transaction) {
    assertSqlite(queryInterface);
    await queryInterface.removeIndex('PROJECT_TASK', 'idx_project_task_milestone_msp_uid', { transaction });
    await queryInterface.sequelize.query('ALTER TABLE `PROJECT_TASK` DROP COLUMN `msp_uid`', { transaction });
  },
};
