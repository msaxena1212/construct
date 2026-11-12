'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const VariationOrderService = require('../src/core/services/variation_order.service');
const MeasurementBillingService = require('../src/core/services/measurement_billing.service');
const CommitmentLedgerService = require('../src/core/services/commitment_ledger.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe('Batch W – Enterprise Variations, Change Orders & Claims Tests', () => {
  let companyA, companyB, userCreator, userTech, userComm, userBudget, userApprover, userB;
  let projA, projB, vendorA, boqEarthwork, boqConcrete;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC modules & permissions
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    const vendorMod = await db.rbac_module.create({ name: 'vendors', path: 'resources/vendors', title: 'Vendors' });

    companyA = await db.company.create({ name: 'Apex Infra Ltd', email: 'audit@apexinfra.test' });
    companyB = await db.company.create({ name: 'Nova Rivals Corp', email: 'audit@novarivals.test' });

    const roleA = await db.role.create({ name: 'ProjectTeam', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'ProjectTeamB', type: 'custom', company_id: companyB.id });

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

    userCreator = await db.user.create({
      firstname: 'Anand',
      lastname: 'ProjectQS',
      email: 'anand.qs@apexinfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userTech = await db.user.create({
      firstname: 'Vikram',
      lastname: 'ChiefEngineer',
      email: 'vikram.tech@apexinfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userComm = await db.user.create({
      firstname: 'Priya',
      lastname: 'CommercialLead',
      email: 'priya.comm@apexinfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userBudget = await db.user.create({
      firstname: 'Sanjay',
      lastname: 'FinanceHead',
      email: 'sanjay.finance@apexinfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userApprover = await db.user.create({
      firstname: 'Rajesh',
      lastname: 'Director',
      email: 'rajesh.director@apexinfra.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });

    userB = await db.user.create({
      firstname: 'Intruder',
      lastname: 'Rival',
      email: 'intruder@novarivals.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projA = await db.project.create({
      name: 'Metro Line Corridor A',
      type: 'infrastructure',
      company_id: companyA.id,
      budget_total: 5000000.0,
      status: 'active',
    });

    projB = await db.project.create({
      name: 'Harbor Pier B',
      type: 'infrastructure',
      company_id: companyB.id,
      budget_total: 8000000.0,
      status: 'active',
    });

    vendorA = await db.vendors.create({
      name: 'Sub-Terra Excavations Ltd',
      spoc_name: 'Anil Kumar',
      spoc_phone: '9876543210',
      official_email: 'contracts@subterra.test',
      official_phone: '9876543210',
      physical_address: 'Plot 44 Industrial Area',
      pincode: '400001',
      skill: 'earthwork, piling',
      budget_allocation: 1000000,
      company_id: companyA.id,
      project_id: projA.id,
      status: 'active',
      compliance_score: 95,
    });

    // Create contract baseline BOQ Items for Project A
    boqEarthwork = await db.boq_item.create({
      project_id: projA.id,
      company_id: companyA.id,
      item_code: 'BOQ-EW-01',
      description: 'Bulk Earth Excavation in Soft Rock',
      category: 'Earthwork',
      unit: 'cum',
      estimated_qty: 1000.000,
      unit_rate: 450.00,
      total_estimated_amount: 450000.00,
      executed_qty: 0,
    });

    boqConcrete = await db.boq_item.create({
      project_id: projA.id,
      company_id: companyA.id,
      item_code: 'BOQ-CC-02',
      description: 'M30 Reinforced Cement Concrete',
      category: 'Concrete',
      unit: 'cum',
      estimated_qty: 500.000,
      unit_rate: 6200.00,
      total_estimated_amount: 3100000.00,
      executed_qty: 0,
    });

    // Baseline approved budget for Project A
    await db.budget.create({
      company_id: companyA.id,
      project_id: projA.id,
      revision_number: 1,
      status: 'approved',
      total_budget_amount: 5000000.00,
    });
  });

  afterAll(async () => {
    // Teardown
  });

  describe('1. Draft Creation, Decimal Precision & Validation', () => {
    it('should create a draft variation order with existing BOQ line quantity deviation', async () => {
      const res = await request(app)
        .post('/api/v1/variation-orders')
        .set('Authorization', tok(userCreator))
        .send({
          project_id: projA.id,
          variation_number: 'VO-MLA-001',
          change_type: 'client_variation',
          category: 'quantity_deviation',
          title: 'Additional Excavation for Retaining Wall',
          description: 'Client Instruction CI-12: Expand excavation footprint by 200 cum',
          originating_source: 'CI-12',
          time_extension_days_requested: 14,
          items: [
            {
              boq_item_id: boqEarthwork.id,
              proposed_delta_qty: 200.000,
              proposed_rate: 450.00,
              description: 'Additional volume of soft rock excavation',
            },
          ],
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      const vo = res.body.data;
      expect(vo.variation_number).toBe('VO-MLA-001');
      expect(vo.status).toBe('draft');
      expect(parseFloat(vo.proposed_amount)).toBe(90000.00); // 200 * 450
      expect(parseFloat(vo.approved_amount)).toBe(0.00);
      expect(vo.time_extension_days_requested).toBe(14);
      expect(vo.items.length).toBe(1);
      expect(parseFloat(vo.items[0].original_qty)).toBe(1000.000);
      expect(parseFloat(vo.items[0].proposed_delta_qty)).toBe(200.000);
      expect(vo.items[0].is_implemented).toBe(false);
    });

    it('should reject duplicate variation order numbers in the same project', async () => {
      const res = await request(app)
        .post('/api/v1/variation-orders')
        .set('Authorization', tok(userCreator))
        .send({
          project_id: projA.id,
          variation_number: 'VO-MLA-001',
          title: 'Duplicate variation',
          description: 'Should fail',
          items: [],
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/already exists/i);
    });

    it('should reject variation referencing BOQ item from another company/project', async () => {
      const res = await request(app)
        .post('/api/v1/variation-orders')
        .set('Authorization', tok(userCreator))
        .send({
          project_id: projA.id,
          variation_number: 'VO-MLA-999',
          title: 'Cross project test',
          description: 'Should fail',
          items: [
            {
              boq_item_id: 99999,
              proposed_delta_qty: 10,
            },
          ],
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/not found in project/i);
    });
  });

  describe('2. Multi-Stage Workflow & Strict Segregation of Duties', () => {
    let activeVo;

    beforeAll(async () => {
      const voRecord = await db.variation_order.findOne({
        where: { variation_number: 'VO-MLA-001' },
      });
      activeVo = voRecord;
    });

    it('should submit variation order from draft to submitted', async () => {
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/submit`)
        .set('Authorization', tok(userCreator));

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('submitted');
    });

    it('should forbid creator from conducting technical review (segregation of duties)', async () => {
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/technical-review`)
        .set('Authorization', tok(userCreator))
        .send({
          recommended_time_extension: 10,
          notes: 'Creator self-review attempt',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/segregation of duties/i);
    });

    it('should allow independent technical reviewer to complete technical review', async () => {
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/technical-review`)
        .set('Authorization', tok(userTech))
        .send({
          recommended_time_extension: 10,
          notes: 'Site survey confirms 200 cum required. Recommend 10 days extension.',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('technical_review');
      expect(res.body.data.time_extension_days_approved).toBe(10);
    });

    it('should forbid creator from conducting commercial review', async () => {
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/commercial-review`)
        .set('Authorization', tok(userCreator))
        .send({ notes: 'Commercial self-review attempt' });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/segregation of duties/i);
    });

    it('should allow commercial lead to negotiate quantities and rates in commercial review', async () => {
      const items = await db.variation_order_item.findAll({ where: { variation_order_id: activeVo.id } });
      const item0 = items[0];

      // Negotiated to 180 cum at 440.00
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/commercial-review`)
        .set('Authorization', tok(userComm))
        .send({
          negotiated_items: [
            {
              id: item0.id,
              approved_delta_qty: 180.000,
              approved_rate: 440.00,
            },
          ],
          notes: 'Negotiated earthwork unit rate down to 440 and quantity to 180 cum.',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('commercial_review');
      expect(parseFloat(res.body.data.approved_amount)).toBe(79200.00); // 180 * 440
    });

    it('should allow finance head to complete budget review', async () => {
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/budget-review`)
        .set('Authorization', tok(userBudget));

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('budget_review');
    });

    it('should forbid creator from approving their own variation order', async () => {
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/approve`)
        .set('Authorization', tok(userCreator));

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/segregation of duties/i);
    });

    it('should allow authorized director to grant final approval', async () => {
      const res = await request(app)
        .put(`/api/v1/variation-orders/${activeVo.id}/approve`)
        .set('Authorization', tok(userApprover))
        .send({ approved_time_extension_days: 10 });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('approved');
      expect(parseFloat(res.body.data.approved_amount)).toBe(79200.00);
      expect(res.body.data.time_extension_days_approved).toBe(10);
    });
  });

  describe('3. Implementation & Contractual Scope Expansion', () => {
    it('should implement approved variation and adjust authorized BOQ estimated cap', async () => {
      const vo = await db.variation_order.findOne({
        where: { variation_number: 'VO-MLA-001' },
      });

      // Original BOQ estimated qty was 1000.000
      const boqBefore = await db.boq_item.findByPk(boqEarthwork.id);
      expect(parseFloat(boqBefore.estimated_qty)).toBe(1000.000);

      const res = await request(app)
        .put(`/api/v1/variation-orders/${vo.id}/implement`)
        .set('Authorization', tok(userApprover));

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('implemented');

      // Verify BOQ item estimated quantity is expanded to 1180.000
      const boqAfter = await db.boq_item.findByPk(boqEarthwork.id);
      expect(parseFloat(boqAfter.estimated_qty)).toBe(1180.000);
      expect(parseFloat(boqAfter.total_estimated_amount)).toBe(531000.00); // 1180 * 450
    });

    it('should allow Measurement Book certification up to new implemented BOQ cap (1180 cum)', async () => {
      // Create an MB measuring 1150 cum total (which would previously exceed the 1000 cap)
      const mb = await MeasurementBillingService.createMeasurementBook({
        company_id: companyA.id,
        project_id: projA.id,
        vendor_id: vendorA.id,
        mb_number: 'MB-VO-EXP-01',
        title: 'Post-Variation Earthwork Certification',
        measurement_date: '2026-10-26',
        items: [
          {
            boq_item_id: boqEarthwork.id,
            calculation_method: 'direct',
            measured_qty: 1150.000,
            work_description: 'Cumulative excavation including variation zone',
          },
        ],
        created_by: userCreator.id,
      });

      await MeasurementBillingService.submitMeasurementBook({
        company_id: companyA.id,
        mb_id: mb.id,
        user_id: userCreator.id,
      });

      // Certify via independent certifier
      const certifiedMb = await MeasurementBillingService.certifyMeasurementBook({
        company_id: companyA.id,
        mb_id: mb.id,
        certifier_id: userApprover.id,
      });

      expect(certifiedMb.status).toBe('certified');
      const reloadedMb = await db.measurement_book.findByPk(mb.id);
      expect(parseFloat(reloadedMb.total_measured_amount)).toBe(517500.00); // 1150 * 450
    });

    it('should still enforce the new expanded cap if an MB attempts to exceed 1180 cum', async () => {
      const mb = await MeasurementBillingService.createMeasurementBook({
        company_id: companyA.id,
        project_id: projA.id,
        vendor_id: vendorA.id,
        mb_number: 'MB-VO-OVER-02',
        title: 'Over Cap Earthwork',
        measurement_date: '2026-10-27',
        items: [
          {
            boq_item_id: boqEarthwork.id,
            calculation_method: 'direct',
            measured_qty: 50.000, // 1150 + 50 = 1200 > 1180 cap!
            work_description: 'Exceeding even the variation cap',
          },
        ],
        created_by: userCreator.id,
      });

      await MeasurementBillingService.submitMeasurementBook({
        company_id: companyA.id,
        mb_id: mb.id,
        user_id: userCreator.id,
      });

      await expect(
        MeasurementBillingService.certifyMeasurementBook({
          company_id: companyA.id,
          mb_id: mb.id,
          certifier_id: userApprover.id,
        })
      ).rejects.toThrow(/Contractual scope exceeded for BOQ item/i);
    });
  });

  describe('4. Rejection, Withdrawal & Tenant Isolation', () => {
    it('should reject variation order with required reason', async () => {
      const vo = await VariationOrderService.createVariationOrder({
        company_id: companyA.id,
        project_id: projA.id,
        variation_number: 'VO-REJECT-01',
        title: 'Impractical Spec Change',
        description: 'Change paint to gold leaf',
        created_by: userCreator.id,
        items: [{ proposed_delta_qty: 10, proposed_rate: 100, description: 'Gold leaf' }],
      });

      await VariationOrderService.submitVariationOrder({
        company_id: companyA.id,
        variation_id: vo.id,
        user_id: userCreator.id,
      });

      const res = await request(app)
        .put(`/api/v1/variation-orders/${vo.id}/reject`)
        .set('Authorization', tok(userApprover))
        .send({ reason: 'Commercially non-viable and not requested by client.' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('rejected');
      expect(res.body.data.rejection_reason).toBe('Commercially non-viable and not requested by client.');
    });

    it('should allow submitter to withdraw their variation order', async () => {
      const vo = await VariationOrderService.createVariationOrder({
        company_id: companyA.id,
        project_id: projA.id,
        variation_number: 'VO-WITHDRAW-01',
        title: 'Mistaken submission',
        description: 'Wrong calculations',
        created_by: userCreator.id,
        items: [{ proposed_delta_qty: 5, proposed_rate: 100, description: 'Incorrect item' }],
      });

      const res = await request(app)
        .put(`/api/v1/variation-orders/${vo.id}/withdraw`)
        .set('Authorization', tok(userCreator))
        .send({ reason: 'Submitted with wrong drawings' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('withdrawn');
    });

    it('should enforce strict tenant isolation (Tenant B cannot access Tenant A variation orders)', async () => {
      const res = await request(app)
        .get(`/api/v1/variation-orders/project/${projA.id}`)
        .set('Authorization', tok(userB));

      // Central access security policy returns 404 to avoid disclosing project existence across tenants
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/project not found/i);
    });
  });

  describe('5. Financial Reconciliation Integration', () => {
    it('should reflect variation metrics in project financial reconciliation', async () => {
      const recon = await CommitmentLedgerService.getProjectFinancialReconciliation({
        project_id: projA.id,
        company_id: companyA.id,
      });

      expect(recon.total_approved_variation).toBe(79200.00);
      expect(recon.total_implemented_variation).toBe(79200.00);
      expect(recon.total_pending_variation).toBe(0.00);
    });

    it('should expose variation summary via API', async () => {
      const res = await request(app)
        .get(`/api/v1/variation-orders/project/${projA.id}/summary`)
        .set('Authorization', tok(userCreator));

      expect(res.status).toBe(200);
      expect(res.body.data.total_approved_variation).toBe(79200.00);
      expect(res.body.data.total_implemented_variation).toBe(79200.00);
      expect(res.body.data.total_approved_time_extension_days).toBe(10);
    });
  });
});
