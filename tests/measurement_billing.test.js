'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const MeasurementBillingService = require('../src/core/services/measurement_billing.service');
const CommitmentLedgerService = require('../src/core/services/commitment_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe('Batch R – Measurement Book & Contractor RA Billing Tests', () => {
  let companyA, companyB, userA1, userA2, userB, projA, projB;
  let vendorA, boqCivil, boqConcrete;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC modules & permissions
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    const vendorMod = await db.rbac_module.create({ name: 'vendors', path: 'resources/vendors', title: 'Vendors' });

    companyA = await db.company.create({ name: 'Larsen Infra Ltd', email: 'audit@larseninfra.test' });
    companyB = await db.company.create({ name: 'GMR Rivals Corp', email: 'audit@gmrrivals.test' });

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
      firstname: 'Ramesh',
      lastname: 'SiteEngineer',
      email: 'ramesh.site@larseninfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userA2 = await db.user.create({
      firstname: 'Sunil',
      lastname: 'ChiefQS',
      email: 'sunil.qs@larseninfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userB = await db.user.create({
      firstname: 'Vikram',
      lastname: 'Competitor',
      email: 'vikram@gmrrivals.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projA = await db.project.create({
      name: 'Metro Viaduct Package 4',
      type: 'infrastructure',
      company_id: companyA.id,
      budget_total: 5000000.0,
    });

    projB = await db.project.create({
      name: 'Airport Runway Ext',
      type: 'infrastructure',
      company_id: companyB.id,
      budget_total: 8000000.0,
    });

    vendorA = await db.vendors.create({
      name: 'Shree Balaji Piling & Structurals',
      spoc_name: 'Balaji Rao',
      spoc_phone: '9876543210',
      official_email: 'balaji@structurals.test',
      official_phone: '9876543210',
      physical_address: 'Plot 14 Industrial Area Mumbai',
      pincode: '400001',
      skill: 'civil, piling',
      budget_allocation: 1000000,
      company_id: companyA.id,
      project_id: projA.id,
      status: 'active',
      compliance_score: 95,
    });

    boqCivil = await db.boq_item.create({
      project_id: projA.id,
      company_id: companyA.id,
      item_code: 'CW-01',
      description: 'M30 Grade Reinforced Concrete Piers',
      unit: 'cum',
      estimated_qty: 100.0,
      unit_rate: 6500.0,
      total_amount: 650000.0,
      executed_qty: 0,
      billed_amount: 0,
    });

    boqConcrete = await db.boq_item.create({
      project_id: projA.id,
      company_id: companyA.id,
      item_code: 'CW-02',
      description: 'Prestressed Concrete Box Girders',
      unit: 'cum',
      estimated_qty: 50.0,
      unit_rate: 12000.0,
      total_amount: 600000.0,
      executed_qty: 0,
      billed_amount: 0,
    });
  });

  describe('1. Dimensional and Physical Quantity Calculations', () => {
    test('calculates direct measurement correctly', () => {
      const qty = MeasurementBillingService.calculateQuantity({
        calculation_method: 'direct',
        measured_qty: 25.5,
      });
      expect(qty).toBe(25.5);
    });

    test('calculates volume with l_b_d formula deterministic decimal precision', () => {
      // 4 piers of length 5.5m x breadth 2.0m x height 1.5m = 4 * 16.5 = 66.0 cum
      const qty = MeasurementBillingService.calculateQuantity({
        calculation_method: 'l_b_d',
        num_units: 4,
        length: 5.5,
        breadth: 2.0,
        depth_height: 1.5,
      });
      expect(qty).toBe(66.0);
    });

    test('calculates area with l_b formula correctly', () => {
      // 10 panels of 2.5m x 4.0m = 100.0 sqm
      const qty = MeasurementBillingService.calculateQuantity({
        calculation_method: 'l_b',
        num_units: 10,
        length: 2.5,
        breadth: 4.0,
      });
      expect(qty).toBe(100.0);
    });

    test('calculates count correctly', () => {
      const qty = MeasurementBillingService.calculateQuantity({
        calculation_method: 'count',
        num_units: 15,
      });
      expect(qty).toBe(15);
    });

    test('rejects negative or invalid dimensions', () => {
      expect(() => {
        MeasurementBillingService.calculateQuantity({
          calculation_method: 'l_b_d',
          num_units: 1,
          length: -5,
          breadth: 2,
          depth_height: 1,
        });
      }).toThrow();

      expect(() => {
        MeasurementBillingService.calculateQuantity({
          calculation_method: 'direct',
          measured_qty: 0,
        });
      }).toThrow();
    });
  });

  describe('2. Project Scoping, Authorization and Tenant Isolation', () => {
    test('creates draft measurement book via API with items and server-side calculation', async () => {
      const res = await request(app)
        .post('/api/v1/measurement-books')
        .set('Authorization', tok(userA1))
        .send({
          project_id: projA.id,
          vendor_id: vendorA.id,
          contract_reference: 'LOA-MVP04-001',
          title: 'Pier P1 to P4 Concrete Pouring Measurement',
          measurement_date: '2026-10-20',
          items: [
            {
              boq_item_id: boqCivil.id,
              work_description: 'Pier shaft concreting Chainage 12+450',
              calculation_method: 'l_b_d',
              num_units: 2,
              length: 2.0,
              breadth: 2.0,
              depth_height: 5.0, // 2 * 2 * 2 * 5 = 40 cum @ 6500 = 260,000
            },
          ],
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe(true);
      expect(res.body.data.mb_number).toMatch(/^MB-P/);
      expect(res.body.data.status).toBe('draft');
      expect(parseFloat(res.body.data.total_measured_amount)).toBe(260000.0);
    });

    test('rejects measurement book creation referencing cross-company project', async () => {
      const res = await request(app)
        .post('/api/v1/measurement-books')
        .set('Authorization', tok(userB))
        .send({
          project_id: projA.id, // belongs to Company A
          title: 'Unauthorized Measurement Attempt',
          measurement_date: '2026-10-20',
        });

      expect([400, 403, 404]).toContain(res.status);
    });

    test('rejects adding item with BOQ belonging to another project', async () => {
      const mb = await MeasurementBillingService.createMeasurementBook({
        company_id: companyB.id,
        project_id: projB.id,
        title: 'Project B MB',
        measurement_date: '2026-10-21',
      });

      await expect(
        MeasurementBillingService.addItemToMeasurementBook({
          company_id: companyB.id,
          project_id: projB.id,
          mb_id: mb.id,
          rawItem: {
            boq_item_id: boqCivil.id, // belongs to Project A
            work_description: 'Invalid scope item',
            measured_qty: 10,
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('3. Lifecycle, Segregation of Duties and BOQ Cap Enforcement', () => {
    let mbForCert;

    beforeEach(async () => {
      mbForCert = await MeasurementBillingService.createMeasurementBook({
        company_id: companyA.id,
        project_id: projA.id,
        vendor_id: vendorA.id,
        title: 'Pier P5 Concrete Measurement',
        measurement_date: '2026-10-22',
        submitted_by: userA1.id, // Ramesh is submitter
        items: [
          {
            boq_item_id: boqCivil.id,
            work_description: 'Pier P5 shaft concrete',
            calculation_method: 'direct',
            measured_qty: 30.0, // 30 cum @ 6500 = 195,000
          },
        ],
      });
    });

    test('cannot certify draft measurement book before submission', async () => {
      const res = await request(app)
        .post(`/api/v1/measurement-books/${mbForCert.id}/certify`)
        .set('Authorization', tok(userA2))
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Only submitted/);
    });

    test('submitter cannot certify their own measurement book (segregation of duties)', async () => {
      // 1. Submit MB
      await request(app)
        .post(`/api/v1/measurement-books/${mbForCert.id}/submit`)
        .set('Authorization', tok(userA1))
        .send({});

      // 2. Ramesh tries to certify own MB -> FAILS
      const res = await request(app)
        .post(`/api/v1/measurement-books/${mbForCert.id}/certify`)
        .set('Authorization', tok(userA1))
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Segregation of duties violation/);
    });

    test('independent reviewer (Sunil) can certify measurement book', async () => {
      // 1. Submit MB
      await request(app)
        .post(`/api/v1/measurement-books/${mbForCert.id}/submit`)
        .set('Authorization', tok(userA1))
        .send({});

      // 2. Sunil certifies
      const res = await request(app)
        .post(`/api/v1/measurement-books/${mbForCert.id}/certify`)
        .set('Authorization', tok(userA2))
        .send({});

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('certified');
      expect(res.body.data.certified_by).toBe(userA2.id);

      // Verify BOQ item executed_qty updated
      const updatedBoq = await db.boq_item.findByPk(boqCivil.id);
      expect(parseFloat(updatedBoq.executed_qty)).toBe(30.0);
    });

    test('rejects certification when cumulative quantity exceeds contractual BOQ cap', async () => {
      // boqCivil has estimated_qty = 100.0. Current executed = 30.0.
      // Attempting to certify 80.0 more (total 110.0 > 100.0)
      const excessMb = await MeasurementBillingService.createMeasurementBook({
        company_id: companyA.id,
        project_id: projA.id,
        title: 'Excess Quantity MB',
        measurement_date: '2026-10-23',
        submitted_by: userA1.id,
        items: [
          {
            boq_item_id: boqCivil.id,
            work_description: 'Over-contractual concreting',
            calculation_method: 'direct',
            measured_qty: 80.0,
          },
        ],
      });

      await MeasurementBillingService.submitMeasurementBook({
        company_id: companyA.id,
        mb_id: excessMb.id,
        user_id: userA1.id,
      });

      await expect(
        MeasurementBillingService.certifyMeasurementBook({
          company_id: companyA.id,
          mb_id: excessMb.id,
          certifier_id: userA2.id,
        })
      ).rejects.toThrow(/Contractual scope exceeded/);
    });

    test('rejection requires reason and updates item statuses cleanly', async () => {
      const rejectMb = await MeasurementBillingService.createMeasurementBook({
        company_id: companyA.id,
        project_id: projA.id,
        title: 'Defective Pier Measurement',
        measurement_date: '2026-10-23',
        submitted_by: userA1.id,
        items: [
          {
            boq_item_id: boqCivil.id,
            work_description: 'Honeycomb concrete pier',
            calculation_method: 'direct',
            measured_qty: 10.0,
          },
        ],
      });

      await MeasurementBillingService.submitMeasurementBook({
        company_id: companyA.id,
        mb_id: rejectMb.id,
        user_id: userA1.id,
      });

      const res = await request(app)
        .post(`/api/v1/measurement-books/${rejectMb.id}/reject`)
        .set('Authorization', tok(userA2))
        .send({ rejection_reason: 'Honeycomb defect detected; requires structural NDT before acceptance.' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('rejected');
      expect(res.body.data.rejection_reason).toMatch(/Honeycomb defect/);
    });
  });

  describe('4. Contractor Running Account (RA) Billing Workflow', () => {
    let certifiedItem1, certifiedItem2;

    beforeAll(async () => {
      // Create certified measurements for RA bill tests
      const mb1 = await MeasurementBillingService.createMeasurementBook({
        company_id: companyA.id,
        project_id: projA.id,
        vendor_id: vendorA.id,
        title: 'Pier Cap Concreting MB-1',
        measurement_date: '2026-10-24',
        submitted_by: userA1.id,
        items: [
          {
            boq_item_id: boqCivil.id,
            work_description: 'Pier Cap P1 Concreting',
            calculation_method: 'direct',
            measured_qty: 20.0, // 20 * 6500 = 130,000
          },
        ],
      });
      await MeasurementBillingService.submitMeasurementBook({ company_id: companyA.id, mb_id: mb1.id, user_id: userA1.id });
      await MeasurementBillingService.certifyMeasurementBook({ company_id: companyA.id, mb_id: mb1.id, certifier_id: userA2.id });
      certifiedItem1 = (await db.measurement_book_item.findAll({ where: { mb_id: mb1.id } }))[0];

      const mb2 = await MeasurementBillingService.createMeasurementBook({
        company_id: companyA.id,
        project_id: projA.id,
        vendor_id: vendorA.id,
        title: 'Box Girder Span 1 MB-2',
        measurement_date: '2026-10-24',
        submitted_by: userA1.id,
        items: [
          {
            boq_item_id: boqConcrete.id,
            work_description: 'Span 1 Box Girder Pouring',
            calculation_method: 'direct',
            measured_qty: 15.0, // 15 * 12000 = 180,000
          },
        ],
      });
      await MeasurementBillingService.submitMeasurementBook({ company_id: companyA.id, mb_id: mb2.id, user_id: userA1.id });
      await MeasurementBillingService.certifyMeasurementBook({ company_id: companyA.id, mb_id: mb2.id, certifier_id: userA2.id });
      certifiedItem2 = (await db.measurement_book_item.findAll({ where: { mb_id: mb2.id } }))[0];
    });

    test('generates draft RA bill with contractual 5% retention, 2% TDS, and net payable', async () => {
      // Item 1: 130,000 + Item 2: 180,000 = Total gross: 310,000
      // Retention 5% = 15,500
      // TDS 2% = 6,200
      // Net payable = 310,000 - 15,500 - 6,200 = 288,300
      const res = await request(app)
        .post('/api/v1/contractor-ra-bills')
        .set('Authorization', tok(userA1))
        .send({
          project_id: projA.id,
          vendor_id: vendorA.id,
          contract_reference: 'LOA-MVP04-001',
          billing_period_start: '2026-10-01',
          billing_period_end: '2026-10-25',
          mb_item_ids: [certifiedItem1.id, certifiedItem2.id],
          retention_rate_pct: 5.0,
          tds_rate_pct: 2.0,
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe(true);
      const bill = res.body.data;
      expect(bill.ra_bill_number).toMatch(/^RA-/);
      expect(parseFloat(bill.current_period_gross_amount)).toBe(310000.0);
      expect(parseFloat(bill.retention_amount)).toBe(15500.0);
      expect(parseFloat(bill.tds_amount)).toBe(6200.0);
      expect(parseFloat(bill.net_payable_amount)).toBe(288300.0);
      expect(bill.status).toBe('draft');
    });

    test('prevents double-billing: already billed measurement item cannot be reused in another bill', async () => {
      const res = await request(app)
        .post('/api/v1/contractor-ra-bills')
        .set('Authorization', tok(userA1))
        .send({
          project_id: projA.id,
          vendor_id: vendorA.id,
          billing_period_start: '2026-10-01',
          billing_period_end: '2026-10-25',
          mb_item_ids: [certifiedItem1.id], // Already billed
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/already been billed/);
    });

    test('preparer cannot approve their own RA bill (segregation of duties)', async () => {
      const bill = await db.contractor_ra_bill.findOne({ where: { project_id: projA.id } });

      const res = await request(app)
        .post(`/api/v1/contractor-ra-bills/${bill.id}/approve`)
        .set('Authorization', tok(userA1)) // Ramesh prepared it
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Segregation of duties/);
    });

    test('approver (Sunil) approves RA bill, accruing subcontractor cost in PROJECT_COST_LEDGER', async () => {
      const bill = await db.contractor_ra_bill.findOne({ where: { project_id: projA.id } });

      const res = await request(app)
        .post(`/api/v1/contractor-ra-bills/${bill.id}/approve`)
        .set('Authorization', tok(userA2))
        .send({ postToCostLedger: true });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('approved');

      // Verify Project Cost Ledger entry exists with idempotency key
      const costEntry = await db.cost_ledger.findOne({
        where: {
          project_id: projA.id,
          source_type: 'CONTRACTOR_RA_BILL',
          source_id: bill.id,
        },
      });

      expect(costEntry).not.toBeNull();
      expect(costEntry.cost_category).toBe('subcontractor');
      expect(parseFloat(costEntry.amount)).toBe(310000.0);
      expect(costEntry.idempotency_key).toBe(`RA_BILL_COST_${bill.id}`);
    });
  });

  describe('5. Financial Reconciliation Integration', () => {
    test('financial reconciliation endpoint reflects certified RA billing, retention, and net payable', async () => {
      const recon = await CommitmentLedgerService.getProjectFinancialReconciliation(projA.id, companyA.id);

      expect(recon.certified_ra_billing_gross).toBe(310000.0);
      expect(recon.total_retention_held).toBe(15500.0);
      expect(recon.total_tds_deducted).toBe(6200.0);
      expect(recon.net_subcontractor_payable).toBe(288300.0);

      // Verify subcontractor cost is recognized in actual costs
      expect(recon.recognized_subcontractor_actuals).toBe(310000.0);
      expect(recon.total_recognized_actual_costs).toBeGreaterThanOrEqual(310000.0);

      // Verify source workflow status reflects Batch R implementation
      expect(recon.missing_source_workflows.measurement_books).toBe('implemented_measurement_book_and_ra_billing');
    });

    test('getCertifiedUnbilledItems returns only unbilled certified items for project', async () => {
      const res = await request(app)
        .get(`/api/v1/measurement-books/project/${projA.id}/certified-unbilled`)
        .set('Authorization', tok(userA1));

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      // Items 1 and 2 were billed, so unbilled count for vendorA should be 0 or exclude billed ones
      const hasBilledItems = res.body.data.some((it) => it.ra_bill_id !== null);
      expect(hasBilledItems).toBe(false);
    });
  });
});
