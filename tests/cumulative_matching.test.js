'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret-123';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe('Batch O – Legacy Invoice Compatibility, Cumulative Matching & Payment Idempotency Tests', () => {
  let companyA, companyB, userA1, userA2, userB, projA, projB, vendorA;
  let po1, po2;

  beforeAll(async () => {
    jest.setTimeout(30000);
    await db.sequelize.sync({ force: true });

    // Seed RBAC module
    const vendorMod = await db.rbac_module.create({ name: 'vendors', path: 'resources/vendors', title: 'Vendors' });
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });

    companyA = await db.company.create({ name: 'Sterling Infrastructure Corp', email: 'audit@sterling.test' });
    companyB = await db.company.create({ name: 'Apex Builders Ltd', email: 'audit@apex.test' });

    const roleA = await db.role.create({ name: 'CommercialManager', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'CommercialManagerB', type: 'custom', company_id: companyB.id });

    for (const r of [roleA, roleB]) {
      for (const m of [vendorMod, projMod]) {
        await db.role_permission.create({
          role_id: r.id,
          module_id: m.id,
          can_create: true,
          can_read: true,
          can_update: true,
          can_delete: true,
        });
      }
    }

    userA1 = await db.user.create({
      firstname: 'Anand',
      lastname: 'BillingOfficer',
      email: 'anand@sterling.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userA2 = await db.user.create({
      firstname: 'Deepa',
      lastname: 'FinanceApprover',
      email: 'deepa@sterling.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userB = await db.user.create({
      firstname: 'Vikram',
      lastname: 'Competitor',
      email: 'vikram@apex.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projA = await db.project.create({ name: 'Sterling Cyber Park', type: 'commercial', company_id: companyA.id });
    projB = await db.project.create({ name: 'Apex Industrial Hub', type: 'industrial', company_id: companyB.id });

    vendorA = await db.vendors.create({
      name: 'UltraTech Cement Suppliers',
      spoc_name: 'Rajesh Sharma',
      spoc_phone: '9876543210',
      physical_address: 'Plot 10, Industrial Estate, Mumbai',
      skill: 'Cement & Building Materials',
      company_id: companyA.id,
      project_id: projA.id,
      official_email: 'sales@ultratech.test',
      official_phone: '9876543210',
      pincode: '400001',
      budget_allocation: 10000000,
    });

    // Create Approved Purchase Order with 2 line items (Cement & Steel)
    po1 = await db.purchase_order.create({
      po_number: 'PO-2026-001',
      company_id: companyA.id,
      project_id: projA.id,
      vendor_id: vendorA.id,
      order_date: '2026-10-01',
      status: 'approved',
      items: [
        { item_code: 'CEM-PPC', description: 'UltraTech PPC Cement 50kg', quantity: 500, unit_price: 380, total: 190000 },
        { item_code: 'STEEL-TMT', description: 'Fe-550D TMT Rebar (MT)', quantity: 20, unit_price: 65000, total: 1300000 },
      ],
      total_amount: 1490000,
    });

    // Create GRN #1: 300 bags cement accepted, 50 rejected
    await db.goods_receipt_note.create({
      grn_number: 'GRN-2026-001',
      company_id: companyA.id,
      project_id: projA.id,
      vendor_id: vendorA.id,
      purchase_order_id: po1.id,
      receipt_date: '2026-10-05',
      status: 'inspected',
      items: [
        { item_code: 'CEM-PPC', description: 'UltraTech PPC Cement 50kg', received_qty: 350, accepted_qty: 300, rejected_qty: 50, unit_rate: 380 },
      ],
    });

    // Create GRN #2: 100 bags cement accepted (total accepted = 400 bags)
    await db.goods_receipt_note.create({
      grn_number: 'GRN-2026-002',
      company_id: companyA.id,
      project_id: projA.id,
      vendor_id: vendorA.id,
      purchase_order_id: po1.id,
      receipt_date: '2026-10-08',
      status: 'inspected',
      items: [
        { item_code: 'CEM-PPC', description: 'UltraTech PPC Cement 50kg', received_qty: 100, accepted_qty: 100, rejected_qty: 0, unit_rate: 380 },
        { item_code: 'STEEL-TMT', description: 'Fe-550D TMT Rebar (MT)', received_qty: 10, accepted_qty: 10, rejected_qty: 0, unit_rate: 65000 },
      ],
    });
  });

  // ── 1. Partial Invoicing within Cumulative Matchable Capacity ─────────────
  test('allows partial invoice 1 and partial invoice 2 when cumulative quantity <= accepted GRN capacity', async () => {
    // Invoice 1: 250 bags cement
    const inv1Res = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        purchase_order_id: po1.id,
        invoice_number: 'INV-PARTIAL-001',
        invoice_date: '2026-10-10',
        items: [
          { item_code: 'CEM-PPC', description: 'UltraTech PPC Cement', quantity: 250, unit_price: 380, purchase_order_id: po1.id },
        ],
      });
    expect(inv1Res.status).toBe(201);
    const inv1 = inv1Res.body.data;

    // Payment request 1 for Invoice 1
    const req1Res = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${inv1.id}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        vendor_id: vendorA.id,
        invoice_id: inv1.id,
        project_id: projA.id,
        amount: inv1.grand_total,
        mode: 'Bank Transfer',
      });
    expect(req1Res.status).toBe(201);
    const payReq1 = req1Res.body.data;

    // Approve Payment Request 1 (Approver Deepa)
    const app1Res = await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReq1.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(app1Res.status).toBe(200);

    // Invoice 2: 150 bags cement (Cumulative = 250 + 150 = 400 bags = exact accepted GRN capacity)
    const inv2Res = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        purchase_order_id: po1.id,
        invoice_number: 'INV-PARTIAL-002',
        invoice_date: '2026-10-11',
        items: [
          { item_code: 'CEM-PPC', description: 'UltraTech PPC Cement', quantity: 150, unit_price: 380, purchase_order_id: po1.id },
        ],
      });
    expect(inv2Res.status).toBe(201);
    const inv2 = inv2Res.body.data;

    const req2Res = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${inv2.id}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        vendor_id: vendorA.id,
        invoice_id: inv2.id,
        project_id: projA.id,
        amount: inv2.grand_total,
        mode: 'Bank Transfer',
      });
    expect(req2Res.status).toBe(201);
    const payReq2 = req2Res.body.data;

    // Approve Payment Request 2: Must succeed because 250 + 150 = 400 <= 400 accepted
    const app2Res = await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReq2.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(app2Res.status).toBe(200);
  });

  // ── 2. Cumulative Over-Billing Across Multiple Invoices ───────────────────
  test('rejects cumulative over-billing when second invoice exceeds remaining matchable capacity', async () => {
    // Invoice 3: Attempts to bill 10 more bags of cement (Already 400 billed out of 400 accepted)
    const inv3Res = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        purchase_order_id: po1.id,
        invoice_number: 'INV-OVERBILL-003',
        invoice_date: '2026-10-12',
        items: [
          { item_code: 'CEM-PPC', description: 'UltraTech PPC Cement', quantity: 10, unit_price: 380, purchase_order_id: po1.id },
        ],
      });
    expect(inv3Res.status).toBe(201);
    const inv3 = inv3Res.body.data;

    const req3Res = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${inv3.id}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        vendor_id: vendorA.id,
        invoice_id: inv3.id,
        project_id: projA.id,
        amount: inv3.grand_total,
        mode: 'Bank Transfer',
      });
    expect(req3Res.status).toBe(201);
    const payReq3 = req3Res.body.data;

    // Approval must fail with cumulative 3-way match error
    const app3Res = await request(app)
      .put(`/api/v1/vendors/payment-requests/${payReq3.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(app3Res.status).toBe(400);
    expect(app3Res.body.message).toContain('3-Way match failed');
    expect(app3Res.body.message).toContain('cumulative billed quantity');
  });

  // ── 3. Legacy Invoice Compatibility & Review Requirement ─────────────────
  test('flags legacy invoice lacking PO and material identifiers as requiring review', async () => {
    // Legacy invoice created without item_code or material_id under a procurement PO
    const legacyInvRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        purchase_order_id: po1.id,
        invoice_number: 'INV-LEGACY-UNLINKED',
        invoice_date: '2026-10-13',
        items: [
          { description: 'Miscellaneous site supplies', quantity: 5, unit_price: 1000 },
        ],
      });
    expect(legacyInvRes.status).toBe(201);
    const legacyInv = legacyInvRes.body.data;

    const legReqRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${legacyInv.id}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        vendor_id: vendorA.id,
        invoice_id: legacyInv.id,
        project_id: projA.id,
        amount: legacyInv.grand_total,
        mode: 'Bank Transfer',
      });
    expect(legReqRes.status).toBe(201);
    const legPayReq = legReqRes.body.data;

    // Ordinary approval must be blocked because identifiers are missing
    const unauthAppr = await request(app)
      .put(`/api/v1/vendors/payment-requests/${legPayReq.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(unauthAppr.status).toBe(400);
    expect(unauthAppr.body.requires_review).toBe(true);
    expect(unauthAppr.body.message).toContain('Legacy invoice compatibility review required');

    // Authorized exception allows approval with documented reason
    const authAppr = await request(app)
      .put(`/api/v1/vendors/payment-requests/${legPayReq.id}/approve`)
      .set('Authorization', tok(userA2))
      .send({
        allow_unmatched_exception: true,
        exception_reason: 'Approved by CFO: Emergency supplies authorized under unlinked legacy procurement contract',
      });
    expect(authAppr.status).toBe(200);
  });

  // ── 4. Unit-Rate Discrepancy Tolerance Enforcement ───────────────────────
  test('rejects invoice approval when unit rate exceeds PO rate beyond 5% tolerance', async () => {
    // PO rate for steel is 65,000/MT. Invoice rate at 75,000/MT (+15% markup)
    const inflatedInvRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        purchase_order_id: po1.id,
        invoice_number: 'INV-RATE-INFLATED',
        invoice_date: '2026-10-14',
        items: [
          { item_code: 'STEEL-TMT', description: 'Fe-550D TMT Rebar', quantity: 5, unit_price: 75000, purchase_order_id: po1.id },
        ],
      });
    expect(inflatedInvRes.status).toBe(201);
    const inflatedInv = inflatedInvRes.body.data;

    const rateReqRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${inflatedInv.id}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        vendor_id: vendorA.id,
        invoice_id: inflatedInv.id,
        project_id: projA.id,
        amount: inflatedInv.grand_total,
        mode: 'Bank Transfer',
      });
    expect(rateReqRes.status).toBe(201);
    const ratePayReq = rateReqRes.body.data;

    const rateApprRes = await request(app)
      .put(`/api/v1/vendors/payment-requests/${ratePayReq.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(rateApprRes.status).toBe(400);
    expect(rateApprRes.body.message).toContain('exceeds approved PO rate');
  });

  // ── 5. Payment Execution Idempotency & Concurrency ───────────────────────
  test('payment execution is idempotent on retry with same reference and rejects duplicate settlement', async () => {
    // Valid invoice for 5 MT steel (within rate and accepted GRN qty of 10 MT)
    const validInvRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        purchase_order_id: po1.id,
        invoice_number: 'INV-PAY-IDEM-001',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'STEEL-TMT', description: 'Fe-550D TMT Rebar', quantity: 5, unit_price: 65000, purchase_order_id: po1.id },
        ],
      });
    expect(validInvRes.status).toBe(201);
    const validInv = validInvRes.body.data;

    const pReqRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${validInv.id}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        vendor_id: vendorA.id,
        invoice_id: validInv.id,
        project_id: projA.id,
        amount: validInv.grand_total,
        mode: 'Bank Transfer',
      });
    expect(pReqRes.status).toBe(201);
    const pReq = pReqRes.body.data;

    // Approve payment request
    await request(app)
      .put(`/api/v1/vendors/payment-requests/${pReq.id}/approve`)
      .set('Authorization', tok(userA2));

    // First execution: Settles payment
    const exec1 = await request(app)
      .post(`/api/v1/vendors/payment-requests/${pReq.id}/execute`)
      .set('Authorization', tok(userA2))
      .send({
        payment_reference: 'UTR-HDFC-99887766',
        execution_date: '2026-10-15',
      });
    expect(exec1.status).toBe(200);
    expect(exec1.body.data.request.status).toBe('paid');
    expect(exec1.body.data.invoice.status).toBe('Paid');
    expect(exec1.body.data.invoice.paid_amount).toBe(validInv.grand_total);

    // Second execution (Retry with SAME payment reference): Must succeed idempotently without double-incrementing paid_amount
    const execRetry = await request(app)
      .post(`/api/v1/vendors/payment-requests/${pReq.id}/execute`)
      .set('Authorization', tok(userA2))
      .send({
        payment_reference: 'UTR-HDFC-99887766',
        execution_date: '2026-10-15',
      });
    expect(execRetry.status).toBe(200);
    expect(execRetry.body.idempotent).toBe(true);
    expect(execRetry.body.data.invoice.paid_amount).toBe(validInv.grand_total);

    // Third execution (Retry with DIFFERENT payment reference): Must be rejected (HTTP 409)
    const execDiff = await request(app)
      .post(`/api/v1/vendors/payment-requests/${pReq.id}/execute`)
      .set('Authorization', tok(userA2))
      .send({
        payment_reference: 'UTR-ICICI-CONFLICT',
        execution_date: '2026-10-15',
      });
    expect(execDiff.status).toBe(409);
    expect(execDiff.body.message).toContain('already been paid under reference');

    // Cross-request duplicate reference rejection:
    // Create another valid invoice & payment request and attempt to execute with the ALREADY USED reference UTR-HDFC-99887766
    const invOtherRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        purchase_order_id: po1.id,
        invoice_number: 'INV-PAY-OTHER-002',
        invoice_date: '2026-10-15',
        items: [
          { item_code: 'STEEL-TMT', description: 'Fe-550D TMT Rebar', quantity: 2, unit_price: 65000, purchase_order_id: po1.id },
        ],
      });
    expect(invOtherRes.status).toBe(201);
    const invOther = invOtherRes.body.data;

    const pReqOtherRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${invOther.id}/payment-requests`)
      .set('Authorization', tok(userA1))
      .send({
        vendor_id: vendorA.id,
        invoice_id: invOther.id,
        project_id: projA.id,
        amount: invOther.grand_total,
        mode: 'Bank Transfer',
      });
    expect(pReqOtherRes.status).toBe(201);
    const pReqOther = pReqOtherRes.body.data;

    // Approve the second payment request
    await request(app)
      .put(`/api/v1/vendors/payment-requests/${pReqOther.id}/approve`)
      .set('Authorization', tok(userA2));

    // Executing the second request with the same UTR must fail with HTTP 409 (prevent accidental multi-settlement)
    const execDupOther = await request(app)
      .post(`/api/v1/vendors/payment-requests/${pReqOther.id}/execute`)
      .set('Authorization', tok(userA2))
      .send({
        payment_reference: 'UTR-HDFC-99887766',
        execution_date: '2026-10-15',
      });
    expect(execDupOther.status).toBe(409);
    expect(execDupOther.body.message).toContain('already used by payment request');
  });

  // ── 6. Cross-Tenant and Cross-Project Isolation ──────────────────────────
  test('rejects cross-company and cross-project payment approval and execution', async () => {
    // User B from Company B attempts to approve Company A payment request
    const pReq = await db.vendors_payment_request.findOne({ where: { company_id: companyA.id } });
    expect(pReq).not.toBeNull();

    const crossAppr = await request(app)
      .put(`/api/v1/vendors/payment-requests/${pReq.id}/approve`)
      .set('Authorization', tok(userB));
    expect(crossAppr.status).toBe(404);

    const crossExec = await request(app)
      .post(`/api/v1/vendors/payment-requests/${pReq.id}/execute`)
      .set('Authorization', tok(userB))
      .send({ payment_reference: 'UTR-HACK' });
    expect(crossExec.status).toBe(404);
  });
});
