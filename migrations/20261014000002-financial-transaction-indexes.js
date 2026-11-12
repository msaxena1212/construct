'use strict';
/**
 * Migration: Create unique composite index on VENDORS_INVOICE (company_id, vendor_id, invoice_number)
 * and index on VENDORS_PAYMENT_REQUEST (company_id, invoice_id, status)
 */
module.exports = {
  async up(queryInterface, Sequelize, transaction) {
    // 1. Unique index on VENDORS_INVOICE
    await queryInterface.addIndex(
      'VENDORS_INVOICE',
      ['company_id', 'vendor_id', 'invoice_number'],
      {
        unique: true,
        name: 'unique_vendor_invoice_per_company',
        transaction,
      }
    );

    // 2. Composite index on VENDORS_PAYMENT_REQUEST
    await queryInterface.addIndex(
      'VENDORS_PAYMENT_REQUEST',
      ['company_id', 'invoice_id', 'status'],
      {
        name: 'idx_payment_req_company_invoice_status',
        transaction,
      }
    );
  },

  async down(queryInterface, Sequelize, transaction) {
    await queryInterface.removeIndex(
      'VENDORS_INVOICE',
      'unique_vendor_invoice_per_company',
      { transaction }
    );
    await queryInterface.removeIndex(
      'VENDORS_PAYMENT_REQUEST',
      'idx_payment_req_company_invoice_status',
      { transaction }
    );
  },
};
