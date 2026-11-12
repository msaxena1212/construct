'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const ProjectCostLedgerService = require('../src/core/services/project_cost_ledger.service');
const CommitmentLedgerService = require('../src/core/services/commitment_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe('Batch Q – Non-Material Cost Actuals & Project Financial Reconciliation Tests', () => {
  let companyA, companyB, userA1, userA2, userB, projA, projB;
  let budgetHeadCivil, budgetHeadOverhead, wbsSite, cbsLabour, cbsEquipment;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC modules & permissions
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    const vendorMod = await db.rbac_module.create({ name: 'vendors', path: 'resources/vendors', title: 'Vendors' });

    companyA = await db.company.create({ name: 'MegaInfra Construction Ltd', email: 'audit@megainfra.test' });
    companyB = await db.company.create({ name: 'Rival Infra Corp', email: 'rival@rivalinfra.test' });

    const roleA = await db.role.create({ name: 'ProjectDirector', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'ProjectDirectorB', type: 'custom', company_id: companyB.id });

    for (const m of [projMod, vendorMod]) {
      await db.role_permission.create({
        role_id: roleA.id,
        module_id: m.id,
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      });
      await db.role_permission.create({
        role_id: roleB.id,
        module_id: m.id,
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      });
    }

    userA1 = await db.user.create({
      firstname: 'Anand',
      lastname: 'Engineer',
      email: 'anand.q@megainfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userA2 = await db.user.create({
      firstname: 'Priya',
      lastname: 'Commercial',
      email: 'priya.q@megainfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userB = await db.user.create({
      firstname: 'Suresh',
      lastname: 'Rival',
      email: 'suresh@rivalinfra.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projA = await db.project.create({
      name: 'Metro Viaduct Package 1',
      type: 'infrastructure',
      company_id: companyA.id,
    });
    projB = await db.project.create({
      name: 'Rival Highway Project',
      type: 'infrastructure',
      company_id: companyB.id,
    });

    // Create budget heads for projA
    budgetHeadCivil = await db.budget_head.create({
      company_id: companyA.id,
      project_id: projA.id,
      head_code: 'BH-CIVIL',
      head_name: 'Civil Works',
      sort_order: 1,
    });

    budgetHeadOverhead = await db.budget_head.create({
      company_id: companyA.id,
      project_id: projA.id,
      head_code: 'BH-OVH',
      head_name: 'Site Overheads',
      sort_order: 2,
    });

    // Create WBS and CBS for projA
    wbsSite = await db.wbs.create({
      company_id: companyA.id,
      project_id: projA.id,
      wbs_code: 'WBS-SITE-01',
      name: 'Site Clearance and Earthworks',
      level: 1,
    });

    cbsLabour = await db.cbs.create({
      company_id: companyA.id,
      cost_code: 'CBS-LAB-01',
      name: 'Direct Skilled Labour',
      category: 'labour',
    });

    cbsEquipment = await db.cbs.create({
      company_id: companyA.id,
      cost_code: 'CBS-EQP-01',
      name: 'Crane & Rig Rental',
      category: 'equipment',
    });

    // Create approved baseline budget with head allocations
    const approvedBudget = await db.budget.create({
      company_id: companyA.id,
      project_id: projA.id,
      revision_number: 1,
      status: 'approved',
      total_budget_amount: 1000000.0, // ₹10,00,000 total budget
      created_by: userA1.id,
      approved_by: userA2.id,
      approved_at: new Date(),
    });

    await db.budget_head_allocation.create({
      company_id: companyA.id,
      project_id: projA.id,
      budget_id: approvedBudget.id,
      budget_head_id: budgetHeadCivil.id,
      allocated_amount: 800000.0, // ₹8,00,000
    });

    await db.budget_head_allocation.create({
      company_id: companyA.id,
      project_id: projA.id,
      budget_id: approvedBudget.id,
      budget_head_id: budgetHeadOverhead.id,
      allocated_amount: 200000.0, // ₹2,00,000
    });
  });

  // ── 1. Labour Actual Cost Recognition ──────────────────────────────────────
  test('recognizes labour cost from approved labour attendance record with verified calculation', async () => {
    // 1. Create labour attendance log (5 masons @ ₹800/day + 4 overtime hours = ₹4000 + ₹400 = ₹4400)
    const attendRes = await request(app)
      .post('/api/v1/labour/record')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        attendance_date: '2026-03-20',
        logs: [
          {
            trade_type: 'Mason',
            skill_level: 'skilled',
            headcount: 5,
            daily_wage_rate: 800,
            overtime_hours: 4,
            notes: 'Foundation raft concreting day shift',
          },
        ],
      });

    expect(attendRes.status).toBe(201);
    const logRecord = attendRes.body.data[0];
    expect(Number(logRecord.total_cost)).toBe(4400);

    // 2. Post to Project Cost Ledger via helper
    const postRes = await ProjectCostLedgerService.postLabourAttendanceCost({
      attendance_record: logRecord,
      budget_head_id: budgetHeadCivil.id,
      wbs_id: wbsSite.id,
      cbs_id: cbsLabour.id,
      posted_by: userA1.id,
    });

    expect(postRes.idempotent).toBe(false);
    expect(Number(postRes.entry.amount)).toBe(4400);
    expect(postRes.entry.cost_category).toBe('labour');
    expect(postRes.entry.source_type).toBe('LABOUR_ATTENDANCE');
    expect(postRes.entry.budget_head_id).toBe(budgetHeadCivil.id);

    // 3. Verify reconciliation endpoint reflects labour actual
    const recon = await CommitmentLedgerService.getProjectFinancialReconciliation(projA.id, companyA.id);
    expect(recon.recognized_labour_actuals).toBe(4400);
    expect(recon.total_recognized_actual_costs).toBe(4400);
  });

  // ── 2. Equipment, Subcontractor & Overhead Actuals From Approved Invoices ──
  test('recognizes equipment, subcontractor and overhead actuals from approved vendor invoices', async () => {
    // 1. Create equipment hire vendor and approved invoice
    const eqVendor = await db.vendors.create({
      company_id: companyA.id,
      project_id: projA.id,
      name: 'HeavyRig Rentals Ltd',
      spoc_name: 'Rajesh',
      spoc_phone: '9811223344',
      official_email: 'rentals@heavyrig.test',
      official_phone: '9811223344',
      physical_address: 'Industrial Yard 5',
      pincode: '560001',
      skill: 'Heavy Equipment Rental',
    });

    const eqInvoice = await db.vendors_invoice.create({
      company_id: companyA.id,
      project_id: projA.id,
      vendor_id: eqVendor.id,
      invoice_number: 'INV-EQP-9001',
      invoice_date: '2026-03-21',
      subtotal: 50000,
      tax_rate: 18,
      tax_amount: 9000,
      grand_total: 59000,
      status: 'Paid',
    });

    // 2. Post Equipment Cost
    const eqCost = await ProjectCostLedgerService.postInvoiceCost({
      invoice: eqInvoice,
      cost_category: 'equipment',
      budget_head_id: budgetHeadCivil.id,
      wbs_id: wbsSite.id,
      cbs_id: cbsEquipment.id,
      posted_by: userA1.id,
    });
    expect(Number(eqCost.entry.amount)).toBe(59000);
    expect(eqCost.entry.cost_category).toBe('equipment');

    // 3. Create Subcontractor Vendor and Invoice
    const subVendor = await db.vendors.create({
      company_id: companyA.id,
      project_id: projA.id,
      name: 'Apex Structural Works LLP',
      spoc_name: 'Dinesh',
      spoc_phone: '9844332211',
      official_email: 'dinesh@apexstruct.test',
      official_phone: '9844332211',
      physical_address: 'Plot 12, EPC Park',
      pincode: '560002',
      skill: 'Civil Subcontractor',
    });

    const subInvoice = await db.vendors_invoice.create({
      company_id: companyA.id,
      project_id: projA.id,
      vendor_id: subVendor.id,
      invoice_number: 'INV-SUB-101',
      invoice_date: '2026-03-22',
      subtotal: 100000,
      tax_rate: 18,
      tax_amount: 18000,
      grand_total: 118000,
      status: 'Paid',
    });

    const subCost = await ProjectCostLedgerService.postInvoiceCost({
      invoice: subInvoice,
      cost_category: 'subcontractor',
      budget_head_id: budgetHeadCivil.id,
      posted_by: userA1.id,
    });
    expect(Number(subCost.entry.amount)).toBe(118000);

    // 4. Create Overhead Vendor and Invoice
    const ovhVendor = await db.vendors.create({
      company_id: companyA.id,
      project_id: projA.id,
      name: 'Site Security & Utilities Corp',
      spoc_name: 'Harish',
      spoc_phone: '9877001122',
      official_email: 'harish@sitesec.test',
      official_phone: '9877001122',
      physical_address: 'Camp Sector 2',
      pincode: '560003',
      skill: 'Site Utilities',
    });

    const ovhInvoice = await db.vendors_invoice.create({
      company_id: companyA.id,
      project_id: projA.id,
      vendor_id: ovhVendor.id,
      invoice_number: 'INV-OVH-007',
      invoice_date: '2026-03-22',
      subtotal: 15000,
      tax_rate: 18,
      tax_amount: 2700,
      grand_total: 17700,
      status: 'Paid',
    });

    const ovhCost = await ProjectCostLedgerService.postInvoiceCost({
      invoice: ovhInvoice,
      cost_category: 'overhead',
      budget_head_id: budgetHeadOverhead.id,
      posted_by: userA1.id,
    });
    expect(Number(ovhCost.entry.amount)).toBe(17700);

    // Verify reconciliation totals
    const recon = await CommitmentLedgerService.getProjectFinancialReconciliation(projA.id, companyA.id);
    expect(recon.recognized_labour_actuals).toBe(4400);
    expect(recon.recognized_equipment_actuals).toBe(59000);
    expect(recon.recognized_subcontractor_actuals).toBe(118000);
    expect(recon.recognized_overhead_actuals).toBe(17700);
    // Total non-material actuals = 4400 + 59000 + 118000 + 17700 = 199100
    expect(recon.total_recognized_actual_costs).toBe(199100);
  });

  // ── 3. Idempotency on Retry and Duplicate Prevention ──────────────────────
  test('duplicate posting with same idempotency key is idempotent and does not create duplicate cost', async () => {
    const postDirect = await request(app)
      .post('/api/v1/projects/budget/cost-ledger')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        cost_category: 'overhead',
        budget_head_id: budgetHeadOverhead.id,
        source_type: 'MANUAL_ADJUSTMENT',
        source_id: 'ADJ-WATER-TANKER-01',
        recognition_date: '2026-03-23',
        amount: 2500.0,
        idempotency_key: 'IDEM-OVH-WATER-TANKER-01',
        reason: 'Emergency site water supply tanker delivery',
      });

    expect(postDirect.status).toBe(201);
    expect(postDirect.body.idempotent).toBe(false);

    // Immediate retry with identical idempotency key
    const retryDirect = await request(app)
      .post('/api/v1/projects/budget/cost-ledger')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        cost_category: 'overhead',
        budget_head_id: budgetHeadOverhead.id,
        source_type: 'MANUAL_ADJUSTMENT',
        source_id: 'ADJ-WATER-TANKER-01',
        recognition_date: '2026-03-23',
        amount: 2500.0,
        idempotency_key: 'IDEM-OVH-WATER-TANKER-01',
        reason: 'Emergency site water supply tanker delivery',
      });

    expect(retryDirect.status).toBe(200);
    expect(retryDirect.body.idempotent).toBe(true);

    // Verify database count for this idempotency key is strictly 1
    const count = await db.cost_ledger.count({
      where: { company_id: companyA.id, idempotency_key: 'IDEM-OVH-WATER-TANKER-01' },
    });
    expect(count).toBe(1);
  });

  // ── 4. Cross-Company and Cross-Project Validation ─────────────────────────
  test('rejects cross-company and cross-project references', async () => {
    // 1. Tenant B user cannot post costs to Tenant A's project
    const crossTenantRes = await request(app)
      .post('/api/v1/projects/budget/cost-ledger')
      .set('Authorization', tok(userB))
      .send({
        project_id: projA.id,
        cost_category: 'overhead',
        amount: 1000.0,
        idempotency_key: 'IDEM-CROSS-TENANT-01',
        source_type: 'MANUAL_ADJUSTMENT',
        source_id: 'CROSS-01',
      });

    expect(crossTenantRes.status).toBe(404); // Access control returns 404 to prevent disclosing other tenant project existence

    // 2. Tenant A user attempting to reference a budget head belonging to another project
    const headB = await db.budget_head.create({
      company_id: companyB.id,
      project_id: projB.id,
      head_code: 'BH-RIVAL-01',
      head_name: 'Rival Head',
    });

    const crossHeadRes = await request(app)
      .post('/api/v1/projects/budget/cost-ledger')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        cost_category: 'labour',
        budget_head_id: headB.id, // Belongs to Project B!
        amount: 3000.0,
        idempotency_key: 'IDEM-CROSS-HEAD-01',
        source_type: 'MANUAL_ADJUSTMENT',
        source_id: 'CROSS-HEAD-01',
      });

    expect(crossHeadRes.status).toBe(400);
    expect(crossHeadRes.body.message).toMatch(/Budget head .* does not belong to project/i);
  });

  // ── 5. Compensating Reversals & Historical Audit Preservation ─────────────
  test('reversals post compensating negative entries without destroying historical records', async () => {
    // 1. Post a cost entry to be reversed
    const entryRes = await request(app)
      .post('/api/v1/projects/budget/cost-ledger')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        cost_category: 'equipment',
        budget_head_id: budgetHeadCivil.id,
        source_type: 'MANUAL_ADJUSTMENT',
        source_id: 'ERR-DIESEL-01',
        recognition_date: '2026-03-24',
        amount: 8000.0,
        idempotency_key: 'IDEM-ERR-DIESEL-GENSET',
        reason: 'Generator diesel fueling booked in error',
      });

    expect(entryRes.status).toBe(201);
    const costEntryId = entryRes.body.data.id;

    // 2. Reverse the cost entry with audit reason
    const revRes = await request(app)
      .post(`/api/v1/projects/budget/cost-ledger/${costEntryId}/reverse`)
      .set('Authorization', tok(userA2))
      .send({ reason: 'Reversing duplicate fuel billing voucher confirmed by site engineer' });

    expect(revRes.status).toBe(201);
    expect(revRes.body.data.event_type).toBe('reversal');
    expect(Number(revRes.body.data.amount)).toBe(-8000.0);
    expect(revRes.body.data.reversal_of_id).toBe(costEntryId);

    // 3. Historical original record is preserved intact
    const originalInDb = await db.cost_ledger.findByPk(costEntryId);
    expect(originalInDb).not.toBeNull();
    expect(Number(originalInDb.amount)).toBe(8000.0);
    expect(originalInDb.event_type).toBe('accrual');

    // 4. Reversal retry is idempotent
    const revRetryRes = await request(app)
      .post(`/api/v1/projects/budget/cost-ledger/${costEntryId}/reverse`)
      .set('Authorization', tok(userA2))
      .send({ reason: 'Reversing duplicate fuel billing voucher confirmed by site engineer' });

    expect(revRetryRes.status).toBe(200);
    expect(revRetryRes.body.idempotent).toBe(true);

    // 5. Cannot reverse a reversal record
    const doubleRevRes = await request(app)
      .post(`/api/v1/projects/budget/cost-ledger/${revRes.body.data.id}/reverse`)
      .set('Authorization', tok(userA2))
      .send({ reason: 'Attempting invalid double reversal' });

    expect(doubleRevRes.status).toBe(400);
    expect(doubleRevRes.body.message).toMatch(/Cannot reverse an entry that is already a reversal/i);
  });

  // ── 6. Full Financial Reconciliation & Budget-Head Variance ───────────────
  test('financial reconciliation correctly aggregates all categories, computes variance, and reports unmapped costs', async () => {
    // Post an unmapped overhead cost (no budget_head_id assigned)
    await request(app)
      .post('/api/v1/projects/budget/cost-ledger')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        cost_category: 'overhead',
        budget_head_id: null, // explicitly unmapped
        source_type: 'MANUAL_ADJUSTMENT',
        source_id: 'UNMAPPED-PRINTING-01',
        recognition_date: '2026-03-24',
        amount: 1500.0,
        idempotency_key: 'IDEM-UNMAPPED-PRINT-01',
        reason: 'Emergency site blue-printing prints without head code',
      });

    const reconRes = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA1));

    expect(reconRes.status).toBe(200);
    const data = reconRes.body.data;

    // Verify baseline budget and variance
    expect(data.approved_budget).toBe(1000000);
    expect(data.recognized_labour_actuals).toBe(4400);
    expect(data.recognized_equipment_actuals).toBe(59000); // 59000 + 8000 - 8000 = 59000
    expect(data.recognized_subcontractor_actuals).toBe(118000);
    expect(data.recognized_overhead_actuals).toBe(21700); // 17700 + 2500 + 1500 = 21700

    const expectedTotalActuals = 4400 + 59000 + 118000 + 21700; // 203100
    expect(data.total_recognized_actual_costs).toBe(expectedTotalActuals);
    expect(data.projected_final_cost).toBe(expectedTotalActuals); // No active PO commitments in this test project
    expect(data.budget_variance).toBe(1000000 - expectedTotalActuals); // 796900

    // Verify unmapped actuals reporting
    expect(data.unmapped_costs).toBe(1500);
    expect(data.unmapped_costs_by_category.overhead).toBe(1500);
    expect(data.unmapped_costs_by_category.labour).toBe(0);

    // Verify budget heads breakdown contains recognized actuals
    const civilHead = data.budget_heads_breakdown.find((h) => h.head_code === 'BH-CIVIL');
    expect(civilHead).toBeDefined();
    // Civil head has: Labour 4400 + Equipment 59000 + Subcontractor 118000 = 181400
    expect(civilHead.recognized_actual_costs).toBe(181400);
    expect(civilHead.head_budget_variance).toBe(800000 - 181400);

    const ovhHead = data.budget_heads_breakdown.find((h) => h.head_code === 'BH-OVH');
    expect(ovhHead).toBeDefined();
    // Mapped overhead: 17700 + 2500 = 20200 (1500 was unmapped)
    expect(ovhHead.recognized_actual_costs).toBe(20200);
    expect(ovhHead.head_budget_variance).toBe(200000 - 20200);

    // Disclosures and qualifications
    expect(data.projected_cost_qualification).toBe('materials_commitments_and_recognized_actuals');
    expect(data.cost_coverage.materials).toBe('stock_ledger_consumption');
    expect(data.missing_source_workflows.statutory_payroll).toBe('pending_statutory_payroll_module');
    expect(data.missing_source_workflows.measurement_books).toBe('implemented_measurement_book_and_ra_billing');
    expect(data.missing_source_workflows.equipment_timesheets).toBe('pending_equipment_usage_timesheets');
  });
});
