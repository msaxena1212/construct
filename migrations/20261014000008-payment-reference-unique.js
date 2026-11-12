'use strict';

/**
 * Migration 000008: Add unique constraint on company_id and reference for non-null payment references
 * to prevent accidental cross-request reference reuse and duplicate settlements.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add unique index on [company_id, reference]
    await queryInterface.addIndex('VENDORS_PAYMENT_REQUEST', ['company_id', 'reference'], {
      unique: true,
      name: 'unique_company_payment_reference',
      // Note: In standard SQL and MySQL/SQLite, multiple NULL references are allowed in unique indexes
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('VENDORS_PAYMENT_REQUEST', 'unique_company_payment_reference');
  },
};
