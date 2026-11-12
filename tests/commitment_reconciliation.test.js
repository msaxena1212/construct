'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const CommitmentLedgerService = require('../src/core/services/commitment_ledger.service');
const StockLedgerService = require('../src/core/services/stock_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe('Batch M – Project Commitment Ledger & Cost Reconciliation Tests', () => {
  let companyA, userA1, userA2, projA, vendorA;
  let wbsRoot, cbsMat, stockCement;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC modules & permissions
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    const matMod = await db.rbac_module.create({ name: 'materials', path: 'resources/materials', title: 'Materials' });
    const vendorMod = await db.rbac_module.create({ name: 'vendors', path: 'resources/vendors', title: 'Vendors' });

    companyA = await db.company.create({ name: 'MegaInfra Construction Ltd', email: 'audit@megainfra.test' });
    const roleA = await db.role.create({ name: 'ProjectDirector', type: 'custom', company_id: companyA.id });

    for (const m of [projMod, matMod, vendorMod]) {
      await db.role_permission.create({
        role_id: roleA.id,
        module_id: m.id,
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      });
    }

    userA1 = await db.user.create({
      firstname: 'Anand',
      lastname: 'Buyer',
      email: 'anand@megainfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userA2 = await db.user.create({
      firstname: 'Priya',
      lastname: 'Approver',
      email: 'priya@megainfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    projA = await db.project.create({ name: 'Elevated Corridor Expressway', type: 'infrastructure', company_id: companyA.id });

    vendorA = await db.vendors.create({
      name: 'UltraCement Ltd',
      spoc_name: 'Vikram',
      spoc_phone: '9876543210',
      physical_address: 'Zone 4, Industrial Area',
      skill: 'Cement Supplies',
      company_id: companyA.id,
      project_id: projA.id,
      official_email: 'sales@ultracement.test',
      official_phone: '9876543210',
      pincode: '400001',
    });

    wbsRoot = await db.wbs.create({
      company_id: companyA.id,
      project_id: projA.id,
      wbs_code: '1.0',
      name: 'Piers and Substructure',
      level: 1,
    });

    cbsMat = await db.cbs.create({
      company_id: companyA.id,
      cost_code: 'MAT-CEM',
      name: 'Structural Cement',
      category: 'material',
    });

    stockCement = await db.material_project_stock.create({
      name: 'OPC 53 Cement Bags',
      sku: 'OPC-53',
      stockIn: 0,
      stockUsed: 0,
      project_id: projA.id,
      company_id: companyA.id,
    });
  });

  // ── 1. Approved PO Commitment Creation vs Draft Exclusion ─────────────────
  test('draft PO does not book commitments; approval creates commitment ledger entries', async () => {
    // Create draft PO for 1,000 bags @ ₹350 = ₹3,50,000
    const poRes = await request(app)
      .post('/api/v1/procurement/purchase-orders')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        vendor_id: vendorA.id,
        po_number: 'PO-CORRIDOR-001',
        order_date: '2026-03-10',
        items: [
          {
            material_id: stockCement.id,
            item_code: 'OPC-53',
            description: 'OPC 53 Grade Cement',
            quantity: 1000,
            unit_price: 350,
            wbs_id: wbsRoot.id,
            cbs_id: cbsMat.id,
          },
        ],
      });

    expect(poRes.status).toBe(201);
    const poId = poRes.body.data.id;

    // Draft PO has 0 commitment
    const draftCommitments = await db.commitment_ledger.findAll({
      where: { purchase_order_id: poId, company_id: companyA.id },
    });
    expect(draftCommitments.length).toBe(0);

    // Second manager approves PO
    const appRes = await request(app)
      .put(`/api/v1/procurement/purchase-orders/${poId}/approve`)
      .set('Authorization', tok(userA2));
    expect(appRes.status).toBe(200);

    // Commitment now booked in append-only ledger
    const activeCommitment = await CommitmentLedgerService.getRemainingCommitmentForPO(poId, companyA.id);
    expect(activeCommitment).toBe(350000);
  });

  // ── 2. Partial Receipt Releases Commitment & Updates Inventory Value ─────
  test('partial GRN releases commitment for accepted quantities into inventory without double counting', async () => {
    const po = await db.purchase_order.findOne({ where: { po_number: 'PO-CORRIDOR-001', company_id: companyA.id } });

    // Partial receipt of 400 bags (400 * 350 = ₹1,40,000 accepted; 50 rejected)
    const grnRes = await request(app)
      .post('/api/v1/procurement/goods-receipts')
      .set('Authorization', tok(userA1))
      .send({
        purchase_order_id: po.id,
        grn_number: 'GRN-CORRIDOR-001',
        receipt_date: '2026-03-12',
        items: [
          {
            material_id: stockCement.id,
            item_code: 'OPC-53',
            received_qty: 450,
            accepted_qty: 400,
            rejected_qty: 50,
            unit_price: 350,
          },
        ],
      });

    expect(grnRes.status).toBe(201);

    // Commitment reduced: 3,50,000 - 1,40,000 = ₹2,10,000 remaining
    const remainingCommitment = await CommitmentLedgerService.getRemainingCommitmentForPO(po.id, companyA.id);
    expect(remainingCommitment).toBe(210000);

    // Physical stock increased by accepted 400 (50 rejected not added to stock)
    await stockCement.reload();
    expect(Number(stockCement.stockIn)).toBe(400);

    // Append-only commitment ledger preserves history
    const entries = await db.commitment_ledger.findAll({
      where: { purchase_order_id: po.id, company_id: companyA.id },
      order: [['id', 'ASC']],
    });
    expect(entries.length).toBe(2);
    expect(entries[0].event_type).toBe('commitment_created');
    expect(Number(entries[0].committed_amount_delta)).toBe(350000);
    expect(entries[1].event_type).toBe('commitment_released');
    expect(Number(entries[1].committed_amount_delta)).toBe(-140000);
  });

  // ── 3. Separation: Receipt in Warehouse vs Site Consumption Cost ─────────
  test('distinguishes warehouse receipt inventory value from actual WBS consumption cost', async () => {
    // At this moment:
    // Inventory received = 400 bags @ 350 = ₹1,40,000
    // Material consumed on site = 0 bags = ₹0
    let recon = await CommitmentLedgerService.getProjectFinancialReconciliation(projA.id, companyA.id);
    expect(recon.received_inventory_value).toBe(140000);
    expect(recon.consumed_material_cost).toBe(0); // NOT counted as project cost until consumed!

    // Now consume 150 bags on site for Pier 1 via StockLedgerService
    await StockLedgerService.recordMovement({
      company_id: companyA.id,
      project_id: projA.id,
      material_id: stockCement.id,
      movement_type: 'consumption',
      quantity: 150,
      unit_cost: 350,
      reference_type: 'SITE_ISSUE',
      reference_id: 'ISSUE-PIER-01',
      idempotency_key: 'KEY-ISSUE-PIER-01',
      reason: 'Pier 1 foundation concrete pouring',
      performed_by: userA1.id,
    });

    recon = await CommitmentLedgerService.getProjectFinancialReconciliation(projA.id, companyA.id);
    expect(recon.received_inventory_value).toBe(140000);
    expect(recon.consumed_material_cost).toBe(52500); // 150 * 350 = ₹52,500 accurately recognized
  });

  // ── 4. Invoicing and Payment Settlement Without Duplicate Project Cost ──
  test('invoicing books liability and payment clears cash without creating duplicate project cost', async () => {
    const po = await db.purchase_order.findOne({ where: { po_number: 'PO-CORRIDOR-001', company_id: companyA.id } });

    // Vendor sends invoice for accepted 400 bags = ₹1,40,000
    const invRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        invoice_number: 'INV-CEM-400',
        invoice_date: '2026-03-14',
        purchase_order_id: po.id,
        items: [
          { item_code: 'OPC-53', description: 'OPC 53 Cement', quantity: 400, unit_price: 350 },
        ],
      });
    expect(invRes.status).toBe(201);
    const invoiceId = invRes.body.data.id;

    // Reconciliation check: Invoice records liability, but DOES NOT add a duplicate material cost!
    let recon = await CommitmentLedgerService.getProjectFinancialReconciliation(projA.id, companyA.id);
    expect(recon.total_invoiced_liability).toBe(140000);
    expect(recon.consumed_material_cost).toBe(52500); // Still 52,500, not 52,500 + 140,000!

    // Payment request created and executed for ₹1,40,000
    const reqRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${invoiceId}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        invoice_id: invoiceId,
        amount: 140000,
        mode: 'Bank Transfer',
        purpose: 'Payment for 400 bags cement delivery',
      });
    expect(reqRes.status).toBe(201);
    const reqId = reqRes.body.data.id;

    // Approve payment request (by manager 2)
    const appPayRes = await request(app)
      .put(`/api/v1/vendors/payment-requests/${reqId}/approve`)
      .set('Authorization', tok(userA2));
    expect(appPayRes.status).toBe(200);

    // Execute payment
    const execPayRes = await request(app)
      .post(`/api/v1/vendors/payment-requests/${reqId}/execute`)
      .set('Authorization', tok(userA2))
      .send({ payment_reference: 'NEFT-AXIS-992211' });
    expect(execPayRes.status).toBe(200);

    // Final reconciliation check: Payment clears liability, cash settled recorded, no duplicate cost
    const finalRecon = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA1));

    expect(finalRecon.status).toBe(200);
    expect(finalRecon.body.data.total_cash_settled).toBe(140000);
    expect(finalRecon.body.data.outstanding_payables).toBe(0);
    expect(finalRecon.body.data.consumed_material_cost).toBe(52500);
  });
});
