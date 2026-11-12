'use strict';
/**
 * Phase A construction controls (docs/CONSTRUCTION_ERP_FARVISION_BENCHMARK.md, items 2, 4 and 5).
 *   - Three-way match rules, as a pure function (quantity over GRN, rate above PO tolerance, counted sibling invoices,
 *     unidentified lines, approved exceptions). These run without a database.
 *   - Retention release after the defect liability period, bank guarantee register and expiry flags, over HTTP.
 *   - Budget gate on RA bill approval, in 'block' and 'warn' modes, through the real approval service.
 * In-memory SQLite (tests/setup).
 */
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const { evaluateThreeWayMatch } = require('../src/modules/vendors/services/three_way_match.service');
const { checkBudgetGate, normaliseMode } = require('../src/core/services/budget_gate.service');
const MeasurementBilling = require('../src/core/services/measurement_billing.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const isoDaysFromNow = (days) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

describe('three-way match rules (pure)', () => {
  const invoiceWith = (items, extra = {}) => ({ id: 9, purchase_order_id: 5, items, ...extra });
  const grnFor = (code, acceptedQty, unitRate = 100) => [
    { purchase_order_id: 5, items: [{ item_code: code, accepted_qty: acceptedQty, unit_rate: unitRate }] },
  ];

  test('a line within the rate tolerance and the accepted quantity is matched', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 10, unit_price: 103 }]),
      grns: grnFor('STL-1', 10),
      siblingInvoices: [],
      countedInvoiceIds: new Set(),
      toleranceRatio: 0.05,
    });
    expect(r.violations).toEqual([]);
    expect(r.grn_checked).toBe(true);
    expect(r.lines[0]).toMatchObject({ status: 'matched', accepted_grn_qty: 10, po_unit_rate: 100 });
  });

  test('an invoice rate more than the tolerance above the PO rate is a rate exception, with the same message as before', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 10, unit_price: 110 }]),
      grns: grnFor('STL-1', 10),
      toleranceRatio: 0.05,
    });
    expect(r.violations).toHaveLength(1);
    expect(r.violations[0].code).toBe('RATE_ABOVE_PO');
    expect(r.violations[0].message).toBe(
      "3-Way match failed: Unit price ₹110 for item 'STL-1' exceeds approved PO rate ₹100 beyond allowed 5% tolerance."
    );
    expect(r.lines[0].status).toBe('rate_exception');
  });

  test('a rate below the PO rate is never an exception', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 10, unit_price: 80 }]),
      grns: grnFor('STL-1', 10),
    });
    expect(r.violations).toEqual([]);
  });

  test('billing more than the accepted GRN quantity is a quantity exception, with the same message as before', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 12, unit_price: 100 }]),
      grns: grnFor('STL-1', 10),
    });
    expect(r.violations).toHaveLength(1);
    expect(r.violations[0].code).toBe('QUANTITY_OVER_GRN');
    expect(r.violations[0].message).toBe(
      "3-Way match failed: Item 'STL-1' cumulative billed quantity (12) exceeds accepted GRN quantity (10) under PO #5. Previously billed: 0, Remaining capacity: 10."
    );
    expect(r.lines[0].status).toBe('quantity_exception');
  });

  test('quantities billed on other counted invoices count towards the cumulative total', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 5, unit_price: 100 }]),
      grns: grnFor('STL-1', 10),
      siblingInvoices: [{ id: 3, status: 'Paid', items: [{ item_code: 'STL-1', quantity: 6 }] }],
      countedInvoiceIds: new Set(),
    });
    expect(r.violations[0].message).toContain('cumulative billed quantity (11)');
    expect(r.lines[0]).toMatchObject({ previously_billed_qty: 6, remaining_capacity: 4 });
  });

  test('a sibling invoice that is neither paid nor under an approved payment request does not count', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 5, unit_price: 100 }]),
      grns: grnFor('STL-1', 10),
      siblingInvoices: [{ id: 3, status: 'Draft', items: [{ item_code: 'STL-1', quantity: 6 }] }],
      countedInvoiceIds: new Set(),
    });
    expect(r.violations).toEqual([]);
  });

  test('a procurement line without item_code or material_id is reported as unidentified', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ description: 'Misc steel', quantity: 1, unit_price: 100 }]),
      grns: [],
    });
    expect(r.lines[0]).toMatchObject({ unidentified: true, identified: false });
  });

  test('an unidentified line stays flagged even when a quantity exception is also found on it', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ description: 'Misc steel', quantity: 5, unit_price: 100 }]),
      grns: grnFor('STL-1', 1),
    });
    expect(r.lines[0].unidentified).toBe(true);
    expect(r.violations.map((v) => v.code)).toEqual(['QUANTITY_OVER_GRN']);
  });

  test('an approved exception skips the GRN checks and reports no violations', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 50, unit_price: 500 }]),
      grns: grnFor('STL-1', 10),
      allowUnmatchedException: true,
    });
    expect(r.violations).toEqual([]);
    expect(r.lines[0].status).toBe('exception_approved');
  });

  test('with no GRNs, the quantity check does not apply', () => {
    const r = evaluateThreeWayMatch({
      invoice: invoiceWith([{ item_code: 'STL-1', quantity: 50, unit_price: 100 }]),
      grns: [],
    });
    expect(r.grn_checked).toBe(false);
    expect(r.violations).toEqual([]);
  });
});

describe('budget gate (pure policy and headroom)', () => {
  test('normaliseMode: missing is warn, a known value is kept, an unknown value fails closed to block', () => {
    expect(normaliseMode(null)).toBe('warn');
    expect(normaliseMode(undefined)).toBe('warn');
    expect(normaliseMode('block')).toBe('block');
    expect(normaliseMode('off')).toBe('off');
    expect(normaliseMode('lenient')).toBe('block');
  });
});

describe('retention, bank guarantees and the budget gate (database)', () => {
  let companyA;
  let companyB;
  let userA;
  let userB;
  let approverA;
  let projectDlpStarted;
  let projectDlpFuture;
  let vendorA;
  let outsiderProject;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Summit Builders', email: 'phasea@summit.test' });
    companyB = await db.company.create({ name: 'Other Builders', email: 'phasea@other.test' });
    const grant = { can_create: true, can_read: true, can_update: true, can_delete: true };
    const roleA = await db.role.create({ name: 'Planner', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Planner B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, ...grant });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, ...grant });
    userA = await db.user.create({ firstname: 'Asha', lastname: 'Rao', email: 'asha@summit.test', company_id: companyA.id, role_id: roleA.id });
    approverA = await db.user.create({ firstname: 'Ravi', lastname: 'Menon', email: 'ravi@summit.test', company_id: companyA.id, role_id: roleA.id });
    userB = await db.user.create({ firstname: 'Omar', lastname: 'Khan', email: 'omar@other.test', company_id: companyB.id, role_id: roleB.id });

    projectDlpStarted = await db.project.create({ name: 'Tower Retention', type: 'commercial', company_id: companyA.id, handover_date: '2020-01-01', dlp_months: 12 });
    projectDlpFuture = await db.project.create({ name: 'Tower Future', type: 'commercial', company_id: companyA.id, handover_date: '2099-01-01', dlp_months: 12 });
    outsiderProject = await db.project.create({ name: 'Other Project', type: 'commercial', company_id: companyB.id });
    vendorA = await db.vendors.create({
      name: 'Ajay Civil Works',
      spoc_name: 'Ajay',
      spoc_phone: '9000000001',
      official_email: 'ajay@civil.test',
      official_phone: '9000000002',
      physical_address: 'Plot 1, Pune',
      pincode: '411001',
      skill: 'civil',
      company_id: companyA.id,
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  /** Creates an approved RA bill that holds retention for the vendor on the project. */
  async function approvedBill({ project, vendor, retention, gross = 1000, n = 1 }) {
    return db.contractor_ra_bill.create({
      ra_bill_number: `RA-TEST-${project.id}-${n}`,
      company_id: companyA.id,
      project_id: project.id,
      vendor_id: vendor.id,
      billing_period_start: '2026-10-01',
      billing_period_end: '2026-10-31',
      previous_cumulative_amount: 0,
      current_period_gross_amount: gross,
      cumulative_gross_amount: gross,
      retention_rate_pct: 10,
      retention_amount: retention,
      tds_rate_pct: 0,
      tds_amount: 0,
      other_deductions_amount: 0,
      net_payable_amount: gross - retention,
      status: 'approved',
    });
  }

  describe('retention release and the defect liability period', () => {
    beforeAll(async () => {
      await approvedBill({ project: projectDlpStarted, vendor: vendorA, retention: 100, n: 1 });
    });

    test('the summary shows retention held and the DLP has ended for a project handed over long ago', async () => {
      const res = await request(app).get(`/api/v1/project-controls/${projectDlpStarted.id}/retention`).set('Authorization', tok(userA));
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({ dlp_ended: true, dlp_end_date: '2021-01-01', total_outstanding: 100 });
      expect(res.body.data.vendors).toEqual([{ vendor_id: vendorA.id, held: 100, released: 0, outstanding: 100 }]);
    });

    test('a release larger than the outstanding retention is refused', async () => {
      const res = await request(app)
        .post(`/api/v1/project-controls/${projectDlpStarted.id}/retention/releases`)
        .set('Authorization', tok(userA))
        .send({ vendor_id: vendorA.id, amount: 150 });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('RELEASE_EXCEEDS_RETENTION');
    });

    test('a release within the outstanding retention is recorded and reduces the outstanding amount', async () => {
      const res = await request(app)
        .post(`/api/v1/project-controls/${projectDlpStarted.id}/retention/releases`)
        .set('Authorization', tok(userA))
        .send({ vendor_id: vendorA.id, amount: 60, remarks: 'First half after DLP' });
      expect(res.status).toBe(201);
      expect(Number(res.body.data.amount)).toBe(60);
      expect(res.body.data).toMatchObject({ vendor_id: vendorA.id, released_by: userA.id });

      const after = await request(app).get(`/api/v1/project-controls/${projectDlpStarted.id}/retention`).set('Authorization', tok(userA));
      expect(after.body.data.vendors[0]).toMatchObject({ held: 100, released: 60, outstanding: 40 });
    });

    test('retention cannot be released while the defect liability period is running', async () => {
      await approvedBill({ project: projectDlpFuture, vendor: vendorA, retention: 80, n: 2 });
      const res = await request(app)
        .post(`/api/v1/project-controls/${projectDlpFuture.id}/retention/releases`)
        .set('Authorization', tok(userA))
        .send({ vendor_id: vendorA.id, amount: 10 });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('DLP_NOT_ENDED');
    });

    test('a project with no handover date cannot release retention', async () => {
      const noHandover = await db.project.create({ name: 'No Handover', type: 'commercial', company_id: companyA.id });
      const res = await request(app)
        .post(`/api/v1/project-controls/${noHandover.id}/retention/releases`)
        .set('Authorization', tok(userA))
        .send({ vendor_id: vendorA.id, amount: 10 });
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('DLP_NOT_STARTED');
    });

    test('handover dates and the DLP length are validated', async () => {
      const bad = await request(app)
        .put(`/api/v1/project-controls/${projectDlpFuture.id}/handover`)
        .set('Authorization', tok(userA))
        .send({ dlp_months: 200 });
      expect(bad.status).toBe(400);

      const good = await request(app)
        .put(`/api/v1/project-controls/${projectDlpFuture.id}/handover`)
        .set('Authorization', tok(userA))
        .send({ handover_date: '2020-06-01', dlp_months: 6 });
      expect(good.status).toBe(200);
      expect(good.body.data).toMatchObject({ dlp_months: 6 });
    });

    test('a user of another company cannot see the retention of this project', async () => {
      const res = await request(app).get(`/api/v1/project-controls/${projectDlpStarted.id}/retention`).set('Authorization', tok(userB));
      expect(res.status).toBe(404);
    });
  });

  describe('bank guarantee register', () => {
    let guarantee;

    test('a guarantee is registered as active', async () => {
      const res = await request(app)
        .post(`/api/v1/project-controls/${projectDlpStarted.id}/guarantees`)
        .set('Authorization', tok(userA))
        .send({
          bg_type: 'performance',
          bank_name: 'State Bank',
          bg_number: 'BG-PERF-001',
          amount: 500000,
          issue_date: '2026-01-01',
          expiry_date: isoDaysFromNow(10),
        });
      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({ status: 'active', bg_type: 'performance', created_by: userA.id });
      guarantee = res.body.data;
    });

    test('an unknown guarantee type, a missing amount, or an expiry before issue is refused', async () => {
      const base = { bank_name: 'HDFC', bg_number: 'BG-X', amount: 1000, issue_date: '2026-01-01', expiry_date: '2026-06-01' };
      const badType = await request(app).post(`/api/v1/project-controls/${projectDlpStarted.id}/guarantees`).set('Authorization', tok(userA)).send({ ...base, bg_type: 'bogus' });
      expect(badType.status).toBe(400);
      const noAmount = await request(app).post(`/api/v1/project-controls/${projectDlpStarted.id}/guarantees`).set('Authorization', tok(userA)).send({ ...base, bg_type: 'advance', amount: 0 });
      expect(noAmount.status).toBe(400);
      const backwards = await request(app).post(`/api/v1/project-controls/${projectDlpStarted.id}/guarantees`).set('Authorization', tok(userA)).send({ ...base, bg_type: 'advance', expiry_date: '2025-06-01' });
      expect(backwards.status).toBe(400);
    });

    test('the list flags an active guarantee that expires within the window, and an expired active one', async () => {
      await request(app)
        .post(`/api/v1/project-controls/${projectDlpStarted.id}/guarantees`)
        .set('Authorization', tok(userA))
        .send({ bg_type: 'retention', bank_name: 'ICICI', bg_number: 'BG-OLD-1', amount: 1000, issue_date: '2018-01-01', expiry_date: '2019-01-01' });

      const res = await request(app).get(`/api/v1/project-controls/${projectDlpStarted.id}/guarantees?expiring_within_days=30`).set('Authorization', tok(userA));
      expect(res.status).toBe(200);
      expect(res.body.data.expiring_count).toBe(1);
      expect(res.body.data.expired_active_count).toBe(1);
      const expiring = res.body.data.items.find((i) => i.id === guarantee.id);
      expect(expiring).toMatchObject({ expiring: true, expired_active: false });
      expect(expiring.days_to_expiry).toBeGreaterThanOrEqual(9);
    });

    test('an active guarantee can be released once; a second change is refused', async () => {
      const first = await request(app)
        .put(`/api/v1/project-controls/guarantees/${guarantee.id}/status`)
        .set('Authorization', tok(userA))
        .send({ status: 'released', remarks: 'Returned by the bank' });
      expect(first.status).toBe(200);
      expect(first.body.data.status).toBe('released');

      const second = await request(app)
        .put(`/api/v1/project-controls/guarantees/${guarantee.id}/status`)
        .set('Authorization', tok(userA))
        .send({ status: 'invoked' });
      expect(second.status).toBe(409);
      expect(second.body.code).toBe('BG_NOT_ACTIVE');
    });

    test('a user of another company cannot change a guarantee, and nothing changes', async () => {
      const other = await db.bank_guarantee.create({
        company_id: companyA.id,
        project_id: projectDlpStarted.id,
        bg_type: 'bid',
        bank_name: 'Axis',
        bg_number: 'BG-BID-9',
        amount: 2000,
        issue_date: '2026-02-01',
        expiry_date: '2027-02-01',
        status: 'active',
      });
      const res = await request(app)
        .put(`/api/v1/project-controls/guarantees/${other.id}/status`)
        .set('Authorization', tok(userB))
        .send({ status: 'invoked' });
      expect(res.status).toBe(404);
      await other.reload();
      expect(other.status).toBe('active');
    });
  });

  describe('budget gate on RA bill approval', () => {
    let head;
    let budget;
    let boqItem;
    let mb;

    beforeAll(async () => {
      budget = await db.budget.create({
        company_id: companyA.id,
        project_id: projectDlpFuture.id,
        revision_number: 1,
        status: 'approved',
        total_budget_amount: 100000,
      });
      head = await db.budget_head.create({ company_id: companyA.id, project_id: projectDlpFuture.id, head_code: 'STRUCT', head_name: 'Structure' });
      await db.budget_head_allocation.create({
        company_id: companyA.id,
        project_id: projectDlpFuture.id,
        budget_id: budget.id,
        budget_head_id: head.id,
        allocated_amount: 100000,
      });
      boqItem = await db.boq_item.create({ company_id: companyA.id, project_id: projectDlpFuture.id, description: 'RCC slab', unit: 'cum', item_code: 'RCC-1' });
      mb = await db.measurement_book.create({
        company_id: companyA.id,
        project_id: projectDlpFuture.id,
        mb_number: 'MB-GATE-1',
        title: 'Slab measurement',
        measurement_date: '2026-10-15',
      });
    });

    /** A certified measurement item under a budget head, attached to a submitted RA bill for the given gross. */
    async function submittedBill(gross, n, budgetHeadId = head.id) {
      const bill = await db.contractor_ra_bill.create({
        ra_bill_number: `RA-GATE-${n}`,
        company_id: companyA.id,
        project_id: projectDlpFuture.id,
        vendor_id: vendorA.id,
        billing_period_start: '2026-10-01',
        billing_period_end: '2026-10-31',
        previous_cumulative_amount: 0,
        current_period_gross_amount: gross,
        cumulative_gross_amount: gross,
        retention_rate_pct: 0,
        retention_amount: 0,
        tds_rate_pct: 0,
        tds_amount: 0,
        other_deductions_amount: 0,
        net_payable_amount: gross,
        status: 'submitted',
      });
      await db.measurement_book_item.create({
        mb_id: mb.id,
        company_id: companyA.id,
        project_id: projectDlpFuture.id,
        boq_item_id: boqItem.id,
        work_description: 'Slab pour',
        measured_qty: 1,
        unit: 'cum',
        contract_rate: gross,
        measured_amount: gross,
        certified_qty: 1,
        certified_amount: gross,
        status: 'certified',
        budget_head_id: budgetHeadId,
        ra_bill_id: bill.id,
      });
      return bill;
    }

    test('the headroom is the allocation less the net cost already recognized against the head', async () => {
      const within = await checkBudgetGate({ company_id: companyA.id, project_id: projectDlpFuture.id, budget_head_id: head.id, amount: 90000, mode: 'block' });
      expect(within).toMatchObject({ status: 'within', allocated: 100000, recognized: 0, headroom: 100000 });

      await db.cost_ledger.create({
        company_id: companyA.id,
        project_id: projectDlpFuture.id,
        cost_category: 'subcontractor',
        source_type: 'TEST_SEED',
        source_id: 1,
        recognition_date: '2026-10-20',
        amount: 60000,
        budget_head_id: head.id,
        idempotency_key: 'PHASE-A-SEED-1',
      });
      const exceeded = await checkBudgetGate({ company_id: companyA.id, project_id: projectDlpFuture.id, budget_head_id: head.id, amount: 50000, mode: 'warn' });
      expect(exceeded).toMatchObject({ status: 'exceeded', recognized: 60000, headroom: 40000, excess: 10000, mode: 'warn' });
    });

    test('a head with no allocation, or a project with no approved budget, is not applicable', async () => {
      const otherHead = await db.budget_head.create({ company_id: companyA.id, project_id: projectDlpFuture.id, head_code: 'FINISH', head_name: 'Finishes' });
      const noAllocation = await checkBudgetGate({ company_id: companyA.id, project_id: projectDlpFuture.id, budget_head_id: otherHead.id, amount: 1, mode: 'block' });
      expect(noAllocation).toMatchObject({ status: 'not_applicable', reason: 'head_not_allocated' });

      const noBudget = await checkBudgetGate({ company_id: companyA.id, project_id: projectDlpStarted.id, budget_head_id: head.id, amount: 1, mode: 'block' });
      expect(noBudget).toMatchObject({ status: 'not_applicable', reason: 'no_approved_budget' });
    });

    test('in block mode an RA bill that exceeds the headroom is refused and stays submitted', async () => {
      await db.company.update({ budget_gate_mode: 'block' }, { where: { id: companyA.id } });
      const bill = await submittedBill(50000, 1); // headroom is 40000, so 50000 exceeds it by 10000
      await expect(
        MeasurementBilling.approveContractorRaBill({ company_id: companyA.id, ra_bill_id: bill.id, approver_id: approverA.id, postToCostLedger: true })
      ).rejects.toMatchObject({ code: 'BUDGET_GATE_BLOCKED', budgetGate: expect.objectContaining({ status: 'exceeded', excess: 10000 }) });
      await bill.reload();
      expect(bill.status).toBe('submitted');
    });

    test('in warn mode the same bill is approved, the cost is posted, and the excess is returned as a warning', async () => {
      await db.company.update({ budget_gate_mode: 'warn' }, { where: { id: companyA.id } });
      const bill = await submittedBill(50000, 2);
      const approved = await MeasurementBilling.approveContractorRaBill({ company_id: companyA.id, ra_bill_id: bill.id, approver_id: approverA.id, postToCostLedger: true });
      expect(approved.status).toBe('approved');
      const json = approved.toJSON();
      expect(json.budget_gate).toMatchObject({ status: 'exceeded', mode: 'warn', excess: 10000 });
    });

    test('a bill within the headroom is approved without a warning in block mode', async () => {
      // A second head with its own allocation, so the earlier postings on the first head do not affect this check.
      await db.company.update({ budget_gate_mode: 'block' }, { where: { id: companyA.id } });
      const fresh = await db.budget_head.create({ company_id: companyA.id, project_id: projectDlpFuture.id, head_code: 'MEP', head_name: 'MEP' });
      await db.budget_head_allocation.create({ company_id: companyA.id, project_id: projectDlpFuture.id, budget_id: budget.id, budget_head_id: fresh.id, allocated_amount: 100000 });
      const bill = await submittedBill(5000, 3, fresh.id);
      const approved = await MeasurementBilling.approveContractorRaBill({ company_id: companyA.id, ra_bill_id: bill.id, approver_id: approverA.id, postToCostLedger: true });
      expect(approved.status).toBe('approved');
      expect(approved.toJSON().budget_gate).toMatchObject({ status: 'within', mode: 'block', excess: 0 });
    });
  });
});
