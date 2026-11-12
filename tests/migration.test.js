'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const MigrationRunner = require('../src/core/utils/migrator');

// Fixture-based tests create their own pre-migration tables, so the canonical baseline and the
// corrective constraint migration are excluded from this file's runs (they have their own suite).
const SKIP = [
  '20261001000000-canonical-core-schema-baseline.js',
  '20261031000001-reconcile-migration-owned-constraints.js',
  '20261101000001-project-master-data.js',
  // Drops an index created by the baseline, so it needs the baseline's tables. Covered by its own suite.
  '20261102000001-drop-redundant-project-task-assignee-index.js',
  // D-2 and D-5 rebuild tables that the baseline and earlier migrations create. Covered by their own suite.
  '20261102000002-enforce-enum-domains.js',
  '20261102000003-add-measurement-book-vendor-foreign-key.js',
  // Creates a table that references the baseline tables. Covered by tests/dpr_images.test.js.
  '20261103000001-create-dpr-images.js',
  // Adds a column and index to PROJECT_TASK, which the baseline creates. Covered by tests/msp_task_key_migration.test.js.
  '20261104000001-add-project-task-msp-uid.js',
  // Adds columns to PROJECT and RBAC_COMPANY_MASTER and creates two tables. Covered by tests/phase_a_controls.test.js.
  '20261109000001-phase-a-controls.js',
];

describe('Batch H – Database Schema & Migration Integrity Tests', () => {
  let testSeq;
  let runner;

  beforeAll(async () => {
    jest.setTimeout(180000);
    // Isolated in-memory SQLite database specifically for migration runner testing
    testSeq = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });
    runner = new MigrationRunner(testSeq, path.resolve(__dirname, '../migrations'));
  });

  afterAll(async () => {
    if (testSeq) {
      await testSeq.close();
    }
  });

  test('runner initializes metadata table and detects pending migrations', async () => {
    const status = await runner.getStatus();
    expect(status.length).toBeGreaterThanOrEqual(2);
    expect(status.every((m) => m.applied === false)).toBe(true);
    expect(status.map((m) => m.name)).toContain('20261014000001-stock-request-approval-audit.js');
    expect(status.map((m) => m.name)).toContain('20261014000002-financial-transaction-indexes.js');
  });

  test('stock-request migration applies up, handles data, and rolls back down cleanly', async () => {
    const qi = testSeq.getQueryInterface();

    // 1. Create initial STOCK_REQUESTS table representing pre-migration state
    await qi.createTable('STOCK_REQUESTS', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      material_id: { type: DataTypes.INTEGER, allowNull: false },
      equipment_id: { type: DataTypes.INTEGER, allowNull: true },
      task_title: { type: DataTypes.STRING, allowNull: false },
      requested_qty: { type: DataTypes.INTEGER, allowNull: false },
      available_qty: { type: DataTypes.INTEGER, allowNull: false },
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      company_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, defaultValue: 'pending' },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    });

    // 2. Also create VENDORS_INVOICE and VENDORS_PAYMENT_REQUEST tables for the 2nd migration
    await qi.createTable('VENDORS_INVOICE', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      vendor_id: { type: DataTypes.INTEGER, allowNull: false },
      company_id: { type: DataTypes.INTEGER, allowNull: false },
      invoice_number: { type: DataTypes.STRING(100), allowNull: false },
    });

    await qi.createTable('VENDORS_PAYMENT_REQUEST', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      invoice_id: { type: DataTypes.INTEGER, allowNull: false },
      company_id: { type: DataTypes.INTEGER, allowNull: false },
      reference: { type: DataTypes.STRING(255), allowNull: true },
      status: { type: DataTypes.STRING, defaultValue: 'pending_approval' },
    });

    // Legacy project stock table. Created by model sync in production, so the fixture recreates the minimal shape.
    await qi.createTable('MATERIAL_PROJECT_STOCK', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      sku: { type: DataTypes.STRING, allowNull: false },
      stockIn: { type: DataTypes.INTEGER, defaultValue: 0 },
      stockUsed: { type: DataTypes.INTEGER, defaultValue: 0 },
      project_id: { type: DataTypes.INTEGER, allowNull: true },
      company_id: { type: DataTypes.INTEGER, allowNull: true },
    });

    await qi.createTable('BOQ_ITEMS', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      project_id: { type: DataTypes.INTEGER, allowNull: false },
      company_id: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
    });

    // 3. Seed pre-existing stock request
    await testSeq.query(
      "INSERT INTO STOCK_REQUESTS (material_id, task_title, requested_qty, available_qty, project_id, company_id) VALUES (1, 'Initial Slab', 10, 50, 1, 1)"
    );

    // 4. Run migrations UP
    const results = await runner.up({ exclude: SKIP });
    expect(results.length).toBe(13);

    // Verify metadata table tracks applied migrations
    const applied = await runner.getAppliedMigrations();
    expect(applied).toEqual([
      '20261014000001-stock-request-approval-audit.js',
      '20261014000002-financial-transaction-indexes.js',
      '20261014000003-create-stock-ledger.js',
      '20261014000004-create-po-and-grn.js',
      '20261014000005-create-wbs-cbs-and-budget.js',
      '20261014000006-create-commitment-ledger.js',
      '20261014000007-create-budget-heads.js',
      '20261014000008-payment-reference-unique.js',
      '20261014000009-create-project-cost-ledger.js',
      '20261014000010-create-measurement-book-and-ra-billing.js',
      '20261014000011-create-variation-orders.js',
      '20261029000001-create-store-locations-and-stock-transfers.js',
      '20261030000001-add-project-stock-unit-of-measure.js',
    ]);

    // Re-running UP should be idempotent (apply 0 migrations)
    const idempotentRun = await runner.up({ exclude: SKIP });
    expect(idempotentRun.length).toBe(0);

    // Verify existing data preserved and new columns accessible
    const [rows] = await testSeq.query('SELECT * FROM STOCK_REQUESTS WHERE id = 1');
    expect(rows[0].task_title).toBe('Initial Slab');
    expect(rows[0].approved_qty).toBeNull();
    expect(rows[0].decision_reason).toBeNull();

    // Verify we can update and query new columns
    await testSeq.query(
      "UPDATE STOCK_REQUESTS SET approved_qty = 8, decided_by = 5, decision_reason = 'Approved by manager' WHERE id = 1"
    );
    const [updatedRows] = await testSeq.query('SELECT approved_qty, decided_by, decision_reason FROM STOCK_REQUESTS WHERE id = 1');
    expect(updatedRows[0].approved_qty).toBe(8);
    expect(updatedRows[0].decided_by).toBe(5);
    expect(updatedRows[0].decision_reason).toBe('Approved by manager');

    // 4-0. Roll back the UOM column migration first (applied last)
    const downUomResult = await runner.down(1);
    expect(downUomResult.length).toBe(1);
    expect(downUomResult[0].name).toBe('20261030000001-add-project-stock-unit-of-measure.js');
    const [uomCols] = await testSeq.query("PRAGMA table_info('MATERIAL_PROJECT_STOCK')");
    expect(uomCols.map((c) => c.name)).not.toContain('unit_of_measure');

    // 4a. Roll back the stock-transfer migration (additive tables and ledger columns)
    const downStResult = await runner.down(1);
    expect(downStResult.length).toBe(1);
    expect(downStResult[0].name).toBe('20261029000001-create-store-locations-and-stock-transfers.js');

    // 4b. Roll back last migration (create-variation-orders)
    const downVoResult = await runner.down(1);
    expect(downVoResult.length).toBe(1);
    expect(downVoResult[0].name).toBe('20261014000011-create-variation-orders.js');

    // 5. Roll back create-measurement-book-and-ra-billing
    const downMbResult = await runner.down(1);
    expect(downMbResult.length).toBe(1);
    expect(downMbResult[0].name).toBe('20261014000010-create-measurement-book-and-ra-billing.js');

    // 5b. Roll back create-project-cost-ledger
    const downCostResult = await runner.down(1);
    expect(downCostResult.length).toBe(1);
    expect(downCostResult[0].name).toBe('20261014000009-create-project-cost-ledger.js');

    // 6. Roll back payment-reference-unique migration
    const downRefResult = await runner.down(1);
    expect(downRefResult.length).toBe(1);
    expect(downRefResult[0].name).toBe('20261014000008-payment-reference-unique.js');

    // 7. Roll back budget-heads migration
    const downBudgetHeadResult = await runner.down(1);
    expect(downBudgetHeadResult.length).toBe(1);
    expect(downBudgetHeadResult[0].name).toBe('20261014000007-create-budget-heads.js');

    // 8. Roll back commitment-ledger migration
    const downCommitmentResult = await runner.down(1);
    expect(downCommitmentResult.length).toBe(1);
    expect(downCommitmentResult[0].name).toBe('20261014000006-create-commitment-ledger.js');

    // 9. Roll back wbs-cbs-and-budget migration
    const downWbsResult = await runner.down(1);
    expect(downWbsResult.length).toBe(1);
    expect(downWbsResult[0].name).toBe('20261014000005-create-wbs-cbs-and-budget.js');

    // 10. Roll back po-and-grn migration
    const downResult = await runner.down(1);
    expect(downResult.length).toBe(1);
    expect(downResult[0].name).toBe('20261014000004-create-po-and-grn.js');

    // 11. Roll back stock-ledger migration
    const downLedgerResult = await runner.down(1);
    expect(downLedgerResult.length).toBe(1);
    expect(downLedgerResult[0].name).toBe('20261014000003-create-stock-ledger.js');

    // 12. Roll back indexes migration
    const downIndexResult = await runner.down(1);
    expect(downIndexResult.length).toBe(1);
    expect(downIndexResult[0].name).toBe('20261014000002-financial-transaction-indexes.js');

    const statusAfterDown = await runner.getStatus();
    expect(statusAfterDown.find((m) => m.name.includes('approval-audit')).applied).toBe(true);
    expect(statusAfterDown.find((m) => m.name.includes('indexes')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('stock-ledger')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('po-and-grn')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('create-wbs-cbs')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('create-commitment-ledger')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('create-budget-heads')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('payment-reference-unique')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('create-project-cost-ledger')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('create-measurement-book')).applied).toBe(false);
    expect(statusAfterDown.find((m) => m.name.includes('create-variation-orders')).applied).toBe(false);

    // 13. Roll back stock-request migration
    const downStockResult = await runner.down(1);
    expect(downStockResult.length).toBe(1);
    expect(downStockResult[0].name).toBe('20261014000001-stock-request-approval-audit.js');

    const allDownStatus = await runner.getStatus();
    expect(allDownStatus.every((m) => m.applied === false)).toBe(true);
  }, 120000);
});
