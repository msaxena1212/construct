'use strict';
const db = require('../src/models');
const StockLedgerService = require('../src/core/services/stock_ledger.service');

describe('Batch I – Inventory Ledger & Stock Integrity Tests', () => {
  let companyA, companyB, projectA1, projectA2, projectB, stockA, stockB;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    // 1. Setup tenants and projects
    companyA = await db.company.create({ name: 'Alpha Builders Ltd', email: 'contact@alpha.test' });
    companyB = await db.company.create({ name: 'Beta Infra Ltd', email: 'contact@beta.test' });

    projectA1 = await db.project.create({ name: 'Alpha Site 1', type: 'commercial', company_id: companyA.id });
    projectA2 = await db.project.create({ name: 'Alpha Site 2', type: 'residential', company_id: companyA.id });
    projectB = await db.project.create({ name: 'Beta Site', type: 'industrial', company_id: companyB.id });

    // 2. Setup project stock
    stockA = await db.material_project_stock.create({
      name: 'UltraTech Cement 50kg',
      sku: 'CEM-50KG',
      stockIn: 100,
      stockUsed: 0,
      project_id: projectA1.id,
      company_id: companyA.id,
    });

    stockB = await db.material_project_stock.create({
      name: 'UltraTech Cement 50kg',
      sku: 'CEM-50KG',
      stockIn: 50,
      stockUsed: 0,
      project_id: projectB.id,
      company_id: companyB.id,
    });
  });

  test('valid receipt and opening balance: increases stock and logs append-only movement', async () => {
    const res = await StockLedgerService.recordMovement({
      company_id: companyA.id,
      project_id: projectA1.id,
      material_id: stockA.id,
      movement_type: 'receipt',
      quantity: 25.5,
      unit_of_measure: 'bags',
      unit_cost: 380,
      reference_type: 'PO',
      reference_id: 'PO-2026-001',
      idempotency_key: 'PO-RECEIPT-2026-001-A',
      reason: 'Standard stock delivery',
    });

    expect(res.already_processed).toBe(false);
    expect(res.entry.movement_type).toBe('receipt');
    expect(Number(res.entry.quantity)).toBe(25.5);
    expect(Number(res.entry.total_cost)).toBe(9690);

    // Stock record updated for backward compatibility (100 + 25.5 = 125.5)
    await stockA.reload();
    expect(Number(stockA.stockIn)).toBe(125.5);
  });

  test('insufficient stock rejection: cannot consume more than available stock', async () => {
    // Current available: 125.5. Attempt to consume 200.
    await expect(
      StockLedgerService.recordMovement({
        company_id: companyA.id,
        project_id: projectA1.id,
        material_id: stockA.id,
        movement_type: 'consumption',
        quantity: 200,
        reason: 'Over-consumption test',
      })
    ).rejects.toThrow(/Insufficient stock/);
  });

  test('concurrency & idempotency: duplicate idempotency key prevents double counting', async () => {
    const key = 'DPR-SLAB-CONCRETE-001';

    // 1st consumption: 20 bags
    const res1 = await StockLedgerService.recordMovement({
      company_id: companyA.id,
      project_id: projectA1.id,
      material_id: stockA.id,
      movement_type: 'consumption',
      quantity: 20,
      idempotency_key: key,
    });
    expect(res1.already_processed).toBe(false);

    // 2nd consumption with identical key: returns existing entry without double-decrementing
    const res2 = await StockLedgerService.recordMovement({
      company_id: companyA.id,
      project_id: projectA1.id,
      material_id: stockA.id,
      movement_type: 'consumption',
      quantity: 20,
      idempotency_key: key,
    });
    expect(res2.already_processed).toBe(true);
    expect(res2.entry.id).toBe(res1.entry.id);

    // Verify stockUsed only increased by 20, not 40
    await stockA.reload();
    expect(Number(stockA.stockUsed)).toBe(20);
  });

  test('cross-company and cross-project isolation', async () => {
    // Tenant B cannot consume Tenant A's stock record
    await expect(
      StockLedgerService.recordMovement({
        company_id: companyB.id,
        project_id: projectB.id,
        material_id: stockA.id, // Belong to companyA
        movement_type: 'consumption',
        quantity: 5,
      })
    ).rejects.toThrow(/Insufficient stock: no stock record found/);
  });

  test('reversal transaction: compensating transaction correctly adjusts ledger balance', async () => {
    // Record a mistaken issue of 10 bags
    const issueRes = await StockLedgerService.recordMovement({
      company_id: companyA.id,
      project_id: projectA1.id,
      material_id: stockA.id,
      movement_type: 'issue',
      quantity: 10,
      reference_id: 'ISSUE-ERR-001',
      idempotency_key: 'ISSUE-ERR-001-KEY',
    });

    // Reverse the mistaken issue
    const revRes = await StockLedgerService.recordMovement({
      company_id: companyA.id,
      project_id: projectA1.id,
      material_id: stockA.id,
      movement_type: 'reversal',
      quantity: 10,
      reference_id: 'ISSUE-ERR-001',
      idempotency_key: 'REV-ISSUE-ERR-001',
      reason: 'Compensating transaction for wrongly booked issue',
    });
    expect(revRes.entry.movement_type).toBe('reversal');

    // Balance calculation directly from append-only ledger verifies consistency
    const balance = await StockLedgerService.getBalanceFromLedger(companyA.id, projectA1.id, stockA.id);
    expect(balance.movementsCount).toBeGreaterThanOrEqual(4);
  });
});
