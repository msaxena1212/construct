'use strict';
/**
 * Additive, reversible: adds a nullable unit_of_measure to MATERIAL_PROJECT_STOCK.
 * Legacy rows stay NULL, which means the default UOM ("units"); no stock value changes.
 * NOT applied to any database by this change.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    // NOT NULL with a default: existing rows receive 'units' when the column is added, so none stay blank.
    // Guarded: a PostgreSQL run that failed after this statement left the column behind (addColumn ran outside
    // the migration transaction there), so the column is added only when it is missing.
    const columns = await queryInterface.describeTable('MATERIAL_PROJECT_STOCK');
    if (!columns.unit_of_measure) {
      await queryInterface.addColumn('MATERIAL_PROJECT_STOCK', 'unit_of_measure', {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'units',
      });
    }
    // Explicit backfill as a safety net for any row that somehow lacks the value.
    await queryInterface.sequelize.query('UPDATE "MATERIAL_PROJECT_STOCK" SET unit_of_measure = \'units\' WHERE unit_of_measure IS NULL OR unit_of_measure = \'\'');
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('MATERIAL_PROJECT_STOCK', 'unit_of_measure');
  },
};
