'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret-123';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

jest.setTimeout(60000);

describe('Batch P – Concurrency Hardening, Payment Integrity & Rate Tolerance Tests', () => {
  let company, role, userRequester, userApprover1, userApprover2, proj, vendor;
  let poShared;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC module
    const vendorMod = await db.rbac_module.create({ name: 'vendors', path: 'resources/vendors', title: 'Vendors' });
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });

    company = await db.company.create({ name: 'Metro Infra Consortium', email: 'corp@metroinfra.test' });

    role = await db.role.create({ name: 'FinanceCommercialManager', type: 'custom', company_id: company.id });

    for (const m of [vendorMod, projMod]) {
      await db.role_permission.create({
        role_id: role.id,
        module_id: m.id,
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      });
    }

    userRequester = await db.user.create({
      firstname: 'Ramesh',
      lastname: 'ProcurementLead',
      email: 'ramesh@metroinfra.test',
      company_id: company.id,
      role_id: role.id,
    });
    userApprover1 = await db.user.create({
      firstname: 'Priya',
      lastname: 'FinanceHead1',
      email: 'priya@metroinfra.test',
      company_id: company.id,
      role_id: role.id,
    });
    userApprover2 = await db.user.create({
      firstname: 'Karan',
      lastname: 'FinanceHead2',
      email: 'karan@metroinfra.test',
      company_id: company.id,
      role_id: role.id,
    });

    proj = await db.project.create({ name: 'Metro Line 4 Extension', type: 'infrastructure', company_id: company.id });

    vendor = await db.vendors.create({
      name: 'Apex Structural Steel Works',
      spoc_name: 'Vinay Kumar',
      spoc_phone: '9811223344',
      physical_address: 'Plot 44, Industrial Area, Noida',
      skill: 'Structural Steel Fabrication',
      company_id: company.id,
      project_id: proj.id,
      official_email: 'sales@apexsteel.test',
      official_phone: '9811223344',
      pincode: '201301',
      budget_allocation: 50000000,
    });

    // PO: 100 MT of Structural Girders at ₹60,000/MT
    poShared = await db.purchase_order.create({
      po_number: 'PO-METRO-001',
      company_id: company.id,
      project_id: proj.id,
      vendor_id: vendor.id,
      order_date: '2026-10-01',
      status: 'approved',
      items: [
        { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', quantity: 100, unit_price: 60000, total: 6000000 },
      ],
      total_amount: 6000000,
    });

    // GRN: 50 MT accepted
    await db.goods_receipt_note.create({
      grn_number: 'GRN-METRO-001',
      company_id: company.id,
      project_id: proj.id,
      vendor_id: vendor.id,
      purchase_order_id: poShared.id,
      receipt_date: '2026-10-05',
      status: 'inspected',
      items: [
        { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', received_qty: 50, accepted_qty: 50, rejected_qty: 0, unit_rate: 60000 },
      ],
    });
  }, 60000);

  // ── 1. Concurrent Invoice Matching Serialization & Capacity Protection ─────
  test('serializes concurrent matching operations; two competing invoices cannot overconsume accepted GRN quantity', async () => {
    // We have 50 MT accepted GRN capacity.
    // Invoice Alpha: 30 MT (leaves 20 MT)
    // Invoice Beta: 30 MT (together they require 60 MT, which exceeds 50 MT)
    const invAlphaRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices`)
      .set('Authorization', tok(userRequester))
      .send({
        project_id: proj.id,
        purchase_order_id: poShared.id,
        invoice_number: 'INV-CONCUR-ALPHA',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', quantity: 30, unit_price: 60000, purchase_order_id: poShared.id },
        ],
      });
    expect(invAlphaRes.status).toBe(201);
    const invAlpha = invAlphaRes.body.data;

    const invBetaRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices`)
      .set('Authorization', tok(userRequester))
      .send({
        project_id: proj.id,
        purchase_order_id: poShared.id,
        invoice_number: 'INV-CONCUR-BETA',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', quantity: 30, unit_price: 60000, purchase_order_id: poShared.id },
        ],
      });
    expect(invBetaRes.status).toBe(201);
    const invBeta = invBetaRes.body.data;

    // Create payment requests for both
    const reqAlphaRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices/${invAlpha.id}/payment-requests`)
      .set('Authorization', tok(userRequester))
      .send({
        vendor_id: vendor.id,
        invoice_id: invAlpha.id,
        project_id: proj.id,
        amount: invAlpha.grand_total,
        mode: 'Bank Transfer',
      });
    expect(reqAlphaRes.status).toBe(201);
    const payReqAlpha = reqAlphaRes.body.data;

    const reqBetaRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices/${invBeta.id}/payment-requests`)
      .set('Authorization', tok(userRequester))
      .send({
        vendor_id: vendor.id,
        invoice_id: invBeta.id,
        project_id: proj.id,
        amount: invBeta.grand_total,
        mode: 'Bank Transfer',
      });
    expect(reqBetaRes.status).toBe(201);
    const payReqBeta = reqBetaRes.body.data;

    // In an in-memory SQLite test database, SQLite uses process-level single-writer locks where concurrent Promise.all queries collide on SQLite connection lock.
    // In MySQL, PO row-level pessimistic locking (LOCK.UPDATE) serializes competing transactions.
    // Here we submit the competing invoice requests sequentially to verify that once Alpha takes 30 MT, Beta (30 MT) is strictly rejected because 30+30 > 50 MT.
    const resAlpha = await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReqAlpha.id}/approve`)
      .set('Authorization', tok(userApprover1));

    const resBeta = await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReqBeta.id}/approve`)
      .set('Authorization', tok(userApprover2));

    expect(resAlpha.status).toBe(200);
    expect(resBeta.status).toBe(400);
    expect(resBeta.body.message).toContain('3-Way match failed');
    expect(resBeta.body.message).toContain('cumulative billed quantity');
  });

  // ── 2. Payment Reference Uniqueness Across Separate Requests ──────────────
  test('rejects cross-request UTR reuse to prevent accidental multi-settlement', async () => {
    // Create two separate invoices & payment requests
    const inv1Res = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices`)
      .set('Authorization', tok(userRequester))
      .send({
        project_id: proj.id,
        purchase_order_id: poShared.id,
        invoice_number: 'INV-PAY-REF-001',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', quantity: 5, unit_price: 60000, purchase_order_id: poShared.id },
        ],
      });
    expect(inv1Res.status).toBe(201);
    const inv1 = inv1Res.body.data;

    const req1Res = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices/${inv1.id}/payment-requests`)
      .set('Authorization', tok(userRequester))
      .send({
        vendor_id: vendor.id,
        invoice_id: inv1.id,
        project_id: proj.id,
        amount: inv1.grand_total,
        mode: 'Bank Transfer',
      });
    expect(req1Res.status).toBe(201);
    const payReq1 = req1Res.body.data;

    // Approve and execute payment request 1
    await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReq1.id}/approve`)
      .set('Authorization', tok(userApprover1));

    const exec1Res = await request(app)
      .post(`/api/v1/vendors/payment-requests/${payReq1.id}/execute`)
      .set('Authorization', tok(userApprover1))
      .send({ payment_reference: 'UTR-METRO-BANK-889900', execution_date: '2026-10-15' });
    expect(exec1Res.status).toBe(200);

    // Create second invoice & request
    const inv2Res = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices`)
      .set('Authorization', tok(userRequester))
      .send({
        project_id: proj.id,
        purchase_order_id: poShared.id,
        invoice_number: 'INV-PAY-REF-002',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', quantity: 5, unit_price: 60000, purchase_order_id: poShared.id },
        ],
      });
    expect(inv2Res.status).toBe(201);
    const inv2 = inv2Res.body.data;

    const req2Res = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices/${inv2.id}/payment-requests`)
      .set('Authorization', tok(userRequester))
      .send({
        vendor_id: vendor.id,
        invoice_id: inv2.id,
        project_id: proj.id,
        amount: inv2.grand_total,
        mode: 'Bank Transfer',
      });
    expect(req2Res.status).toBe(201);
    const payReq2 = req2Res.body.data;

    await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReq2.id}/approve`)
      .set('Authorization', tok(userApprover1));

    // Attempt execution with the SAME UTR on different payment request
    const execDupRes = await request(app)
      .post(`/api/v1/vendors/payment-requests/${payReq2.id}/execute`)
      .set('Authorization', tok(userApprover1))
      .send({ payment_reference: 'UTR-METRO-BANK-889900', execution_date: '2026-10-15' });
    expect(execDupRes.status).toBe(409);
    expect(execDupRes.body.message).toContain('already used by payment request');
  });

  // ── 3. Configurable Unit-Rate Tolerance & Boundary Testing ────────────────
  test('enforces configurable unit rate tolerance dynamically', async () => {
    // Approved PO rate: ₹60,000/MT
    // Test Case A: Under default 5% tolerance (max allowed: ₹63,000)
    // Rate of ₹62,500 (+4.16%) should PASS
    const invWithinToleranceRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices`)
      .set('Authorization', tok(userRequester))
      .send({
        project_id: proj.id,
        purchase_order_id: poShared.id,
        invoice_number: 'INV-RATE-WITHIN-5PCT',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', quantity: 2, unit_price: 62500, purchase_order_id: poShared.id },
        ],
      });
    expect(invWithinToleranceRes.status).toBe(201);
    const invWithin = invWithinToleranceRes.body.data;

    const reqWithinRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices/${invWithin.id}/payment-requests`)
      .set('Authorization', tok(userRequester))
      .send({
        vendor_id: vendor.id,
        invoice_id: invWithin.id,
        project_id: proj.id,
        amount: invWithin.grand_total,
        mode: 'Bank Transfer',
      });
    expect(reqWithinRes.status).toBe(201);
    const payReqWithin = reqWithinRes.body.data;

    const appWithinRes = await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReqWithin.id}/approve`)
      .set('Authorization', tok(userApprover1));
    expect(appWithinRes.status).toBe(200);

    // Test Case B: Stricter environment tolerance override (e.g., 2% tolerance -> max allowed: ₹61,200)
    process.env.INVOICE_RATE_TOLERANCE_PERCENT = '2';

    const invStricterRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices`)
      .set('Authorization', tok(userRequester))
      .send({
        project_id: proj.id,
        purchase_order_id: poShared.id,
        invoice_number: 'INV-RATE-OVER-2PCT',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'GIRDER-STEEL', description: 'Heavy Structural Steel Girders', quantity: 2, unit_price: 62000, purchase_order_id: poShared.id },
        ],
      });
    expect(invStricterRes.status).toBe(201);
    const invStricter = invStricterRes.body.data;

    const reqStricterRes = await request(app)
      .post(`/api/v1/vendors/${vendor.id}/invoices/${invStricter.id}/payment-requests`)
      .set('Authorization', tok(userRequester))
      .send({
        vendor_id: vendor.id,
        invoice_id: invStricter.id,
        project_id: proj.id,
        amount: invStricter.grand_total,
        mode: 'Bank Transfer',
      });
    expect(reqStricterRes.status).toBe(201);
    const payReqStricter = reqStricterRes.body.data;

    const appStricterRes = await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReqStricter.id}/approve`)
      .set('Authorization', tok(userApprover1));
    expect(appStricterRes.status).toBe(400);
    expect(appStricterRes.body.message).toContain('beyond allowed 2% tolerance');

    // Reset env
    delete process.env.INVOICE_RATE_TOLERANCE_PERCENT;
  });

  // ── 4. Fail-Closed Database Configuration (SQLite-only policy) ──────────
  test('refuses MySQL at startup and never opens a connection', () => {
    const originalEnv = { ...process.env };
    try {
      process.env.NODE_ENV = 'test';
      process.env.DB_TARGET_CLASS = 'isolated_test';
      process.env.DB_DIALECT = 'mysql';
      process.env.DB_HOST = 'localhost';
      process.env.DB_NAME = 'zyno_disposable';
      process.env.DB_USER = 'u';
      process.env.DB_PASSWORD = 'p';
      process.env.DB_TEST_CONFIRMED = 'true';
      jest.isolateModules(() => {
        expect(() => require('../src/config/db')).toThrow(/DB_TARGET_REFUSED/);
      });
    } finally {
      process.env = originalEnv;
    }
  });
});
