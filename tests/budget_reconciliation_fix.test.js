'use strict';
process.env.NODE_ENV = 'test';
process.env.DB_DIALECT = 'sqlite';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret-123';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const CommitmentLedgerService = require('../src/core/services/commitment_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

jest.setTimeout(60000);

describe('P0 – Urgent Budget Reconciliation Fix & Formula Invariants', () => {
  let companyA, companyB, userA, userB, projA, projB;
  let budgetHead1, budgetHead2;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC module
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });

    companyA = await db.company.create({ name: 'Alpha Builders Ltd', email: 'alpha@test.com' });
    companyB = await db.company.create({ name: 'Beta Constructors', email: 'beta@test.com' });

    const roleA = await db.role.create({ name: 'ProjectAdmin', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'ProjectAdminB', type: 'custom', company_id: companyB.id });

    for (const r of [roleA, roleB]) {
      await db.role_permission.create({
        role_id: r.id,
        module_id: projMod.id,
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      });
    }

    userA = await db.user.create({
      firstname: 'Aarav',
      lastname: 'Patel',
      email: 'aarav@alpha.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userB = await db.user.create({
      firstname: 'Rohan',
      lastname: 'Sharma',
      email: 'rohan@beta.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projA = await db.project.create({
      name: 'Skyline Metro Tower',
      type: 'commercial',
      company_id: companyA.id,
      budget_total: 1000000,
    });

    projB = await db.project.create({
      name: 'Beta Warehouse',
      type: 'industrial',
      company_id: companyB.id,
      budget_total: 500000,
    });

    // Create approved budget revisions for ProjA
    // Revision 1: ₹9,00,000 (superseded)
    await db.budget.create({
      company_id: companyA.id,
      project_id: projA.id,
      revision_number: 1,
      status: 'superseded',
      total_budget_amount: 900000,
      approved_by: userA.id,
      approved_at: new Date('2026-01-01'),
    });

    // Revision 2: ₹12,00,000 (approved)
    const approvedBudget = await db.budget.create({
      company_id: companyA.id,
      project_id: projA.id,
      revision_number: 2,
      status: 'approved',
      total_budget_amount: 1200000,
      approved_by: userA.id,
      approved_at: new Date('2026-02-01'),
    });

    // Create vendor for invoice FK
    const vendorA = await db.vendors.create({
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

    // Budget heads
    budgetHead1 = await db.budget_head.create({
      company_id: companyA.id,
      project_id: projA.id,
      head_code: 'BH-01',
      head_name: 'Civil Works',
      category: 'materials',
      status: 'active',
    });

    budgetHead2 = await db.budget_head.create({
      company_id: companyA.id,
      project_id: projA.id,
      head_code: 'BH-02',
      head_name: 'Labour & Manpower',
      category: 'labour',
      status: 'active',
    });

    // Head allocations
    await db.budget_head_allocation.create({
      company_id: companyA.id,
      project_id: projA.id,
      budget_id: approvedBudget.id,
      budget_head_id: budgetHead1.id,
      allocated_amount: 700000,
    });

    await db.budget_head_allocation.create({
      company_id: companyA.id,
      project_id: projA.id,
      budget_id: approvedBudget.id,
      budget_head_id: budgetHead2.id,
      allocated_amount: 500000,
    });
  });

  test('1. Approved budget derives from latest approved revision and head allocations', async () => {
    const res = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA));

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const data = res.body.data;

    // Must be latest approved revision (12,00,000) not superseded revision 1 (9,00,000)
    expect(data.approved_budget).toBe(1200000);
    expect(data.budget_heads_breakdown).toHaveLength(2);
    expect(data.budget_heads_breakdown[0].allocated_amount).toBe(700000);
    expect(data.budget_heads_breakdown[1].allocated_amount).toBe(500000);
  });

  test('2. Actual costs and active commitments correctly aggregate without double counting invoices or settlements', async () => {
    // 1. Book consumed material in stock_ledger: ₹1,50,000
    await db.stock_ledger.create({
      company_id: companyA.id,
      project_id: projA.id,
      movement_type: 'consumption',
      quantity: 100,
      unit_cost: 1500,
      total_cost: 150000,
      reference_type: 'DPR_CONSUMPTION',
      reference_id: 'DPR-001',
      movement_date: new Date(),
    });

    // 2. Book labour cost entry in cost_ledger: ₹80,000
    await db.cost_ledger.create({
      company_id: companyA.id,
      project_id: projA.id,
      cost_category: 'labour',
      budget_head_id: budgetHead2.id,
      source_type: 'LABOUR_ATTENDANCE',
      source_id: 'ATT-001',
      recognition_date: '2026-03-20',
      amount: 80000,
      idempotency_key: 'LAB-001',
      created_by: userA.id,
    });

    // 3. Book active commitment in commitment_ledger: ₹2,00,000
    await db.commitment_ledger.create({
      company_id: companyA.id,
      project_id: projA.id,
      purchase_order_id: 101,
      po_line_identifier: 'LINE-1',
      event_type: 'commitment_created',
      committed_amount_delta: 200000,
      source_reference_type: 'PO_APPROVAL',
      source_reference_id: 'PO-101',
      idempotency_key: 'PO-COMMIT-101',
      performed_by: userA.id,
    });

    // 4. Record vendor invoice and payment (liability and cash, NOT double-counted costs)
    await db.vendors_invoice.create({
      company_id: companyA.id,
      project_id: projA.id,
      vendor_id: 1,
      invoice_number: 'INV-1001',
      invoice_date: '2026-03-20',
      grand_total: 300000,
      paid_amount: 100000,
    });

    const res = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA));

    expect(res.status).toBe(200);
    const data = res.body.data;

    // Actual Costs = Material Consumption (150,000) + Labour (80,000) = 230,000
    expect(data.consumed_material_cost).toBe(150000);
    expect(data.recognized_labour_actuals).toBe(80000);
    expect(data.total_recognized_actual_costs).toBe(230000);

    // Active Commitments = 200,000
    expect(data.active_commitments).toBe(200000);

    // Invoices and payments are reported as liabilities/settlements, NOT added to recognized actual costs
    expect(data.total_invoiced_liability).toBe(300000);
    expect(data.total_cash_settled).toBe(100000);
    expect(data.outstanding_payables).toBe(200000);
  });

  test('3. Mathematical invariants hold: Projected Final Cost, Remaining Headroom, and Variance', async () => {
    const res = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA));

    expect(res.status).toBe(200);
    const data = res.body.data;

    // Invariant 1: Projected Final Cost = Actual Costs + Active Commitments
    // 230,000 + 200,000 = 430,000
    expect(data.projected_final_cost).toBe(Number((data.total_recognized_actual_costs + data.active_commitments).toFixed(2)));
    expect(data.projected_final_cost).toBe(430000);

    // Invariant 2: Budget Remaining = Approved Budget - Projected Final Cost
    // 1,200,000 - 430,000 = 770,000
    expect(data.budget_remaining).toBe(Number((data.approved_budget - data.projected_final_cost).toFixed(2)));
    expect(data.budget_remaining).toBe(770000);

    // Invariant 3: Budget Variance = Approved Budget - Projected Final Cost
    expect(data.budget_variance).toBe(data.budget_remaining);
    expect(data.budget_headroom).toBe(data.budget_remaining);
  });

  test('4. Resource Distribution categories reconcile exactly to total_recognized_actual_costs', async () => {
    // Add equipment and overhead actuals
    await db.cost_ledger.create({
      company_id: companyA.id,
      project_id: projA.id,
      cost_category: 'equipment',
      source_type: 'VENDORS_INVOICE',
      source_id: 'INV-EQ-001',
      recognition_date: '2026-03-22',
      amount: 45000,
      idempotency_key: 'EQ-001',
      created_by: userA.id,
    });

    await db.cost_ledger.create({
      company_id: companyA.id,
      project_id: projA.id,
      cost_category: 'overhead',
      source_type: 'VENDORS_INVOICE',
      source_id: 'INV-OVH-001',
      recognition_date: '2026-03-23',
      amount: 25000,
      idempotency_key: 'OVH-001',
      created_by: userA.id,
    });

    const res = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA));

    expect(res.status).toBe(200);
    const data = res.body.data;

    const resourceSum =
      data.consumed_material_cost +
      data.recognized_labour_actuals +
      data.recognized_equipment_actuals +
      data.recognized_subcontractor_actuals +
      data.recognized_overhead_actuals;

    expect(resourceSum).toBe(data.total_recognized_actual_costs);
    // 150000 + 80000 + 45000 + 0 + 25000 = 300000
    expect(data.total_recognized_actual_costs).toBe(300000);
  });

  test('5. Negative headroom (over-budget state) is preserved and not clamped to zero', async () => {
    // Inject massive commitment of ₹20,00,000 making projected final cost ₹25,00,000 (exceeding ₹12,00,000)
    await db.commitment_ledger.create({
      company_id: companyA.id,
      project_id: projA.id,
      purchase_order_id: 102,
      po_line_identifier: 'LINE-OVER',
      event_type: 'commitment_created',
      committed_amount_delta: 2000000,
      source_reference_type: 'PO_APPROVAL',
      source_reference_id: 'PO-102',
      idempotency_key: 'PO-OVER-102',
      performed_by: userA.id,
    });

    const res = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA));

    expect(res.status).toBe(200);
    const data = res.body.data;

    // Approved: 1200000, Actuals: 300000, Commitments: 200000 + 2000000 = 2200000 => Projected: 2500000
    expect(data.projected_final_cost).toBe(2500000);
    // Remaining = 1200000 - 2500000 = -1300000 (NEGATIVE HEADROOM PRESERVED!)
    expect(data.budget_remaining).toBe(-1300000);
    expect(data.budget_variance).toBe(-1300000);
    expect(data.budget_remaining).toBeLessThan(0);
  });

  test('6. Company isolation: User from Company B cannot access Company A reconciliation (fails closed 404/403)', async () => {
    const res = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userB));

    // assertProjectAccess returns 404 so project existence across tenants is not disclosed
    expect([403, 404]).toContain(res.status);
  });
});
