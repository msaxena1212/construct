'use strict';
/**
 * Resolves D-5 (docs/CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md, section 6). Forward migration.
 *
 * The model association MeasurementBook.belongsTo(Vendor) (src/models/index.js) declares MEASUREMENT_BOOKS.vendor_id as
 * a foreign key to VENDORS.id with ON DELETE SET NULL. No migration created it, so the database did not enforce it.
 * This migration rebuilds MEASUREMENT_BOOKS with that constraint (see src/core/utils/sqlite-rebuild.js).
 * Existing rows must reference an existing vendor or hold NULL; the rebuild fails otherwise.
 */
const { rebuildTable, assertSqlite } = require('../src/core/utils/sqlite-rebuild');

const TABLE = 'MEASUREMENT_BOOKS';
const CONSTRAINT = 'fk_MEASUREMENT_BOOKS_vendor_id';
const CLAUSE = `CONSTRAINT \`${CONSTRAINT}\` FOREIGN KEY (\`vendor_id\`) REFERENCES \`VENDORS\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`;

module.exports = {
  async up(queryInterface, Sequelize, transaction) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.addConstraint(TABLE, {
        fields: ['vendor_id'], type: 'foreign key', name: CONSTRAINT,
        references: { table: 'VENDORS', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE', transaction,
      });
      return;
    }
    assertSqlite(queryInterface);
    await rebuildTable(
      queryInterface,
      TABLE,
      (sql) => {
        if (sql.includes(CONSTRAINT)) throw new Error(`VENDOR_FK_REFUSED: ${CONSTRAINT} already exists`);
        if (!/\)\s*$/.test(sql)) throw new Error(`VENDOR_FK_REFUSED: unexpected end of CREATE statement for ${TABLE}`);
        return sql.replace(/\)\s*$/, `, ${CLAUSE})`);
      },
      transaction
    );
  },

  async down(queryInterface, Sequelize, transaction) {
    assertSqlite(queryInterface);
    await rebuildTable(
      queryInterface,
      TABLE,
      (sql) => {
        const withClause = `, ${CLAUSE})`;
        if (!sql.includes(withClause)) throw new Error(`VENDOR_FK_REFUSED: ${CONSTRAINT} not found on ${TABLE}`);
        return sql.replace(withClause, ')');
      },
      transaction
    );
  },
};
