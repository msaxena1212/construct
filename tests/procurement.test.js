'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe('Batch J – Procurement Lifecycle & 3-Way Matching Tests', () => {
  let companyA, companyB, userA1, userA2, userB, projA, projB, vendorA, vendorB, poA;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC modules & permissions
    const matMod = await db.rbac_module.create({ name: 'materials', path: 'resources/materials', title: 'Materials' });
    const vendorMod = await db.rbac_module.create({ name: 'vendors', path: 'resources/vendors', title: 'Vendors' });

    // Tenants
    companyA = await db.company.create({ name: 'Alpha Infra', email: 'procure@alpha.test' });
    companyB = await db.company.create({ name: 'Beta Infra', email: 'procure@beta.test' });

    const roleA = await db.role.create({ name: 'ManagerA', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'ManagerB', type: 'custom', company_id: companyB.id });

    for (const r of [roleA, roleB]) {
      await db.role_permission.create({ role_id: r.id, module_id: matMod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
      await db.role_permission.create({ role_id: r.id, module_id: vendorMod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    }

    userA1 = await db.user.create({ firstname: 'Alice', lastname: 'Buyer', email: 'alice@alpha.test', company_id: companyA.id, role_id: roleA.id });
    userA2 = await db.user.create({ firstname: 'Bob', lastname: 'Approver', email: 'bob@alpha.test', company_id: companyA.id, role_id: roleA.id });
    userB = await db.user.create({ firstname: 'Charlie', lastname: 'Beta', email: 'charlie@beta.test', company_id: companyB.id, role_id: roleB.id });

    projA = await db.project.create({ name: 'Alpha Tower', type: 'commercial', company_id: companyA.id });
    projB = await db.project.create({ name: 'Beta Bridge', type: 'infrastructure', company_id: companyB.id });

    vendorA = await db.vendors.create({
      name: 'Alpha Steel Mills',
      spoc_name: 'John Steel',
      spoc_phone: '9876543210',
      physical_address: 'Plot 10, Industrial Area, Mumbai',
      skill: 'Steel',
      company_id: companyA.id,
      project_id: projA.id,
      official_email: 'sales@alphasteel.test',
      official_phone: '9876543210',
      pincode: '400001',
    });

    vendorB = await db.vendors.create({
      name: 'Beta Aggregates',
      spoc_name: 'Bob Aggregates',
      spoc_phone: '9876543211',
      physical_address: 'Plot 20, Quarry Zone, Pune',
      skill: 'Aggregates',
      company_id: companyB.id,
      project_id: projB.id,
      official_email: 'sales@betaagg.test',
      official_phone: '9876543211',
      pincode: '400002',
    });
  });

  test('create purchase order with valid items and totals, company-scoped', async () => {
    const res = await request(app)
      .post('/api/v1/procurement/purchase-orders')
      .set('Authorization', tok(userA1))
      .send({
        po_number: 'PO-ALPHA-2026-001',
        project_id: projA.id,
        vendor_id: vendorA.id,
        order_date: '2026-03-01',
        expected_delivery_date: '2026-03-15',
        items: [
          { item_code: 'STEEL-16MM', description: 'TMT Steel 16mm', quantity: 100, unit_price: 65, unit_of_measure: 'kg' },
          { item_code: 'STEEL-12MM', description: 'TMT Steel 12mm', quantity: 50, unit_price: 60, unit_of_measure: 'kg' },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.total_amount).toBe(9500); // (100*65) + (50*60) = 6500 + 3000 = 9500
    expect(res.body.data.status).toBe('draft');
    poA = res.body.data;
  });

  test('duplicate PO submission rejected with 409', async () => {
    const res = await request(app)
      .post('/api/v1/procurement/purchase-orders')
      .set('Authorization', tok(userA1))
      .send({
        po_number: 'PO-ALPHA-2026-001',
        project_id: projA.id,
        vendor_id: vendorA.id,
        order_date: '2026-03-01',
        items: [{ item_code: 'STEEL-16MM', quantity: 10, unit_price: 65 }],
      });
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/already exists/i);
  });

  test('PO approval segregation of duties: creator cannot approve own PO', async () => {
    const res = await request(app)
      .put(`/api/v1/procurement/purchase-orders/${poA.id}/approve`)
      .set('Authorization', tok(userA1));

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/Creator cannot approve their own purchase order/i);
  });

  test('authorized second user approves PO successfully', async () => {
    const res = await request(app)
      .put(`/api/v1/procurement/purchase-orders/${poA.id}/approve`)
      .set('Authorization', tok(userA2));

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('approved');
  });

  test('cross-company access: Tenant B cannot receive or view Tenant A PO', async () => {
    const res = await request(app)
      .post('/api/v1/procurement/goods-receipts')
      .set('Authorization', tok(userB))
      .send({
        grn_number: 'GRN-STEAL-001',
        purchase_order_id: poA.id,
        receipt_date: '2026-03-05',
        items: [{ item_code: 'STEEL-16MM', received_qty: 10, accepted_qty: 10 }],
      });
    expect(res.status).toBe(404);
  });

  test('partial GRN receipt: updates PO status to partially_received and posts to STOCK_LEDGER', async () => {
    const res = await request(app)
      .post('/api/v1/procurement/goods-receipts')
      .set('Authorization', tok(userA1))
      .send({
        grn_number: 'GRN-ALPHA-001',
        purchase_order_id: poA.id,
        receipt_date: '2026-03-05',
        delivery_challan_number: 'DC-8841',
        vehicle_number: 'MH-04-AB-1234',
        items: [
          { item_code: 'STEEL-16MM', received_qty: 60, accepted_qty: 55, rejected_qty: 5, rejection_reason: 'Rusted ends' },
          { item_code: 'STEEL-12MM', received_qty: 50, accepted_qty: 50, rejected_qty: 0 },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.po_status).toBe('partially_received'); // 55 of 100 received for 16mm

    // Verify stock ledger entry was created for accepted quantity
    const ledgerMovements = await db.stock_ledger.findAll({
      where: { company_id: companyA.id, reference_id: 'GRN-ALPHA-001' },
    });
    expect(ledgerMovements.length).toBe(2);
    const m16 = ledgerMovements.find((m) => m.idempotency_key.includes('STEEL-16MM'));
    expect(Number(m16.quantity)).toBe(55);
    expect(m16.movement_type).toBe('receipt');
  });

  test('over-receipt protection: cannot accept more than remaining ordered PO quantity', async () => {
    // 55 accepted previously on 100 ordered -> remaining is 45. Try accepting 50.
    const res = await request(app)
      .post('/api/v1/procurement/goods-receipts')
      .set('Authorization', tok(userA1))
      .send({
        grn_number: 'GRN-ALPHA-OVER',
        purchase_order_id: poA.id,
        receipt_date: '2026-03-06',
        items: [
          { item_code: 'STEEL-16MM', received_qty: 50, accepted_qty: 50 },
        ],
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Over-receipt/i);
  });

  test('3-Way Matching: verifies accepted GRN against vendor invoice and detects discrepancies', async () => {
    // Create invoice matching exactly what was accepted (55 of 16mm @ 65 = 3575, 50 of 12mm @ 60 = 3000)
    const invRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        invoice_number: 'INV-STEEL-BILL-001',
        invoice_date: '2026-03-07',
        items: [
          { description: 'STEEL-16MM', quantity: 55, unit_price: 65 },
          { description: 'STEEL-12MM', quantity: 50, unit_price: 60 },
        ],
      });
    expect(invRes.status).toBe(201);
    const invoiceId = invRes.body.data.id;

    // Run 3-Way matching
    const matchRes = await request(app)
      .get(`/api/v1/procurement/match-invoice/${invoiceId}`)
      .set('Authorization', tok(userA1));

    expect(matchRes.status).toBe(200);
    expect(matchRes.body.match_status).toBe('verified_match');
    expect(matchRes.body.data.line_item_matches.every((m) => m.matched === true)).toBe(true);

    // Now test discrepancy detection: Create invoice claiming 60 of 16mm (5 more than accepted)
    const invDiscrepancy = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        invoice_number: 'INV-STEEL-OVERBILL',
        invoice_date: '2026-03-07',
        items: [
          { description: 'STEEL-16MM', quantity: 60, unit_price: 65 },
        ],
      });
    expect(invDiscrepancy.status).toBe(201);

    const matchDiscrepancy = await request(app)
      .get(`/api/v1/procurement/match-invoice/${invDiscrepancy.body.data.id}`)
      .set('Authorization', tok(userA1));

    expect(matchDiscrepancy.status).toBe(200);
    expect(matchDiscrepancy.body.match_status).toBe('discrepancy_found');
    expect(matchDiscrepancy.body.data.line_item_matches[0].matched).toBe(false);
    expect(matchDiscrepancy.body.data.line_item_matches[0].discrepancy_reason).toMatch(/Billed 5 units more than accepted in GRN/i);
  });
});
