'use strict';
/**
 * Stock request approval-audit columns. Reversible. NOT yet applied to any database:
 * review + back up before running (see audit report, Batch H).
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = 'STOCK_REQUESTS';
    await queryInterface.addColumn(t, 'approved_qty', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn(t, 'requested_by', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn(t, 'decided_by', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn(t, 'decided_at', { type: Sequelize.DATE, allowNull: true });
    await queryInterface.addColumn(t, 'decision_reason', { type: Sequelize.STRING(500), allowNull: true });
    await queryInterface.changeColumn(t, 'equipment_id', { type: Sequelize.INTEGER, allowNull: true });
  },
  async down(queryInterface) {
    const t = 'STOCK_REQUESTS';
    for (const c of ['decision_reason', 'decided_at', 'decided_by', 'requested_by', 'approved_qty']) {
      await queryInterface.removeColumn(t, c);
    }
    // equipment_id intentionally left nullable on rollback (restoring NOT NULL could fail on existing rows).
  },
};
