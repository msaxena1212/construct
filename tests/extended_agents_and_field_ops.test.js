'use strict';

const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const agents = require('../src/modules/projects/services/control_agents.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const HOUR = 3600000;

describe('Extended Construction AI Agents & Field Operations (Safety & RFIs)', () => {
  let companyA;
  let companyB;
  let userA;
  let userB;
  let projectA;
  let projectB;
  let vendorA;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Apex Construction', email: 'apex@test.local' });
    companyB = await db.company.create({ name: 'Rival Builders', email: 'rival@test.local' });

    const grant = { can_create: true, can_read: true, can_update: true, can_delete: true };
    const roleA = await db.role.create({ name: 'Director', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Director B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, ...grant });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, ...grant });

    userA = await db.user.create({
      firstname: 'Vikram',
      lastname: 'Mehta',
      email: 'vikram@apex.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userB = await db.user.create({
      firstname: 'Suresh',
      lastname: 'Patel',
      email: 'suresh@rival.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projectA = await db.project.create({ name: 'Apex Commercial Tower', type: 'commercial', company_id: companyA.id });
    projectB = await db.project.create({ name: 'Rival Mall', type: 'commercial', company_id: companyB.id });

    vendorA = await db.vendors.create({
      name: 'Precision MEP Contractors',
      spoc_name: 'Ramesh',
      spoc_phone: '9876543210',
      official_email: 'ramesh@precisionmep.test',
      official_phone: '9876543211',
      physical_address: 'MIDC, Pune',
      pincode: '411018',
      skill: 'MEP',
      company_id: companyA.id,
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('Safety & HSE API', () => {
    let createdIncidentId;

    test('creates a critical safety incident and auto-generates a critical hazard snag', async () => {
      const res = await request(app)
        .post(`/api/v1/safety/project/${projectA.id}/incidents`)
        .set('Authorization', tok(userA))
        .send({
          title: 'Unprotected 12th Floor Slab Edge',
          location: 'Tower B, 12th Floor Perimeter',
          severity: 'lost_time',
          category: 'Working at Height',
          description: 'Guardrails removed for material hoisting and not reinstalled.',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.incident_number).toMatch(/^INC-\d{4}-001$/);
      createdIncidentId = res.body.data.id;

      const snags = await db.snag_item.findAll({ where: { project_id: projectA.id } });
      expect(snags.length).toBe(1);
      expect(snags[0].severity).toBe('critical');
      expect(snags[0].title).toContain('[HSE Hazard]');
    });

    test('logs a daily toolbox talk and returns updated safety summary', async () => {
      const talkRes = await request(app)
        .post(`/api/v1/safety/project/${projectA.id}/toolbox-talks`)
        .set('Authorization', tok(userA))
        .send({
          topic: 'Full-Body Harness & Edge Protection Protocol',
          attendee_count: 32,
          trade: 'Formwork & Rebar',
          key_points_discussed: '100% tie-off above 1.8m height',
        });
      expect(talkRes.status).toBe(201);

      const summaryRes = await request(app)
        .get(`/api/v1/safety/project/${projectA.id}/summary`)
        .set('Authorization', tok(userA));
      expect(summaryRes.status).toBe(200);
      expect(summaryRes.body.data.metrics.toolbox_talks_conducted).toBe(1);
      expect(summaryRes.body.data.metrics.open_hazards).toBeGreaterThanOrEqual(1);
    });

    test('updates incident status and enforces company isolation', async () => {
      const foreignRes = await request(app)
        .get(`/api/v1/safety/project/${projectA.id}/summary`)
        .set('Authorization', tok(userB));
      expect(foreignRes.status).toBe(404);

      const updateRes = await request(app)
        .put(`/api/v1/safety/project/${projectA.id}/incidents/${createdIncidentId}`)
        .set('Authorization', tok(userA))
        .send({ status: 'investigating', corrective_action: 'Double guardrails reinstalled' });
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.status).toBe('investigating');
    });
  });

  describe('QA/QC & RFI API', () => {
    let rfiId;

    test('creates an RFI with AI-assisted technical draft response', async () => {
      const res = await request(app)
        .post(`/api/v1/rfis/project/${projectA.id}`)
        .set('Authorization', tok(userA))
        .send({
          subject: 'Column Rebar Lap Splice Zone Clarification',
          question: 'Can we splice 25mm dia rebar at mid-height instead of bottom zone in C14?',
          discipline: 'Structural',
          priority: 'urgent',
          drawing_reference: 'STR-COL-104-R2',
          cost_impact: false,
          schedule_impact: true,
          schedule_impact_days: 3,
        });

      expect(res.status).toBe(201);
      expect(res.body.data.rfi_number).toMatch(/^RFI-STR-\d{4}-001$/);
      expect(res.body.data.ai_draft_response).toContain('IS 456');
      rfiId = res.body.data.id;
    });

    test('lists RFIs and records engineering response', async () => {
      const listRes = await request(app)
        .get(`/api/v1/rfis/project/${projectA.id}?priority=urgent`)
        .set('Authorization', tok(userA));
      expect(listRes.status).toBe(200);
      expect(listRes.body.data.length).toBe(1);

      const ansRes = await request(app)
        .put(`/api/v1/rfis/project/${projectA.id}/${rfiId}/answer`)
        .set('Authorization', tok(userA))
        .send({ response: 'Approved per detail D-09 provided staggered 50d lap length.' });
      expect(ansRes.status).toBe(200);
      expect(ansRes.body.data.status).toBe('answered');
    });
  });

  describe('Expanded 11-Agent Autonomous Suite & Command Center', () => {
    beforeAll(async () => {
      // Seed conditions to trigger all 5 new agents:
      // 1) Low material stock (procurement_burn): 1000 in, 920 used -> 80 remaining <= 15%
      await db.material_project_stock.create({
        name: 'OPC 53 Grade Cement',
        sku: 'CEM-OPC53',
        category: 'Cement',
        unit_of_measure: 'bags',
        stockIn: 1000,
        stockUsed: 920,
        project_id: projectA.id,
        company_id: companyA.id,
      });

      // 2) Drawing under review + new urgent RFI (rfi_assistant)
      await db.drawing_register.create({
        project_id: projectA.id,
        company_id: companyA.id,
        drawing_number: 'MEP-HVAC-201',
        title: 'Basement Ventilation Duct Routing',
        discipline: 'MEP',
        revision: 'R1',
        status: 'under_review',
        file_url: '/uploads/drawings/mep-hvac-201.pdf',
      });

      await request(app)
        .post(`/api/v1/rfis/project/${projectA.id}`)
        .set('Authorization', tok(userA))
        .send({
          subject: 'Fire Damper Actuator Voltage Spec',
          question: 'Confirm 24V vs 230V actuator power supply for shaft dampers.',
          discipline: 'MEP',
          priority: 'urgent',
        });

      // 3) High-value pending variation order + aged submitted RA bill (dispute_risk)
      await db.variation_order.create({
        variation_number: 'VO-2026-004',
        company_id: companyA.id,
        project_id: projectA.id,
        change_type: 'client_variation',
        category: 'addition',
        title: 'Additional Basement Dewatering & Rock Anchors',
        description: 'Unexpected hard rock strata encountered during P2 excavation.',
        status: 'submitted',
        net_cost_impact: 1250000,
        time_extension_days_requested: 21,
        created_by: userA.id,
      });

      const raBill = await db.contractor_ra_bill.create({
        ra_bill_number: 'RA-MEP-04',
        company_id: companyA.id,
        project_id: projectA.id,
        vendor_id: vendorA.id,
        billing_period_start: '2026-09-01',
        billing_period_end: '2026-09-30',
        current_period_gross_amount: 850000,
        net_payable_amount: 790500,
        status: 'submitted',
      });
      const backdated20Days = new Date(Date.now() - 20 * 24 * HOUR).toISOString().replace('T', ' ').replace('Z', ' +00:00');
      await db.sequelize.query('UPDATE CONTRACTOR_RA_BILLS SET createdAt = :d WHERE id = :id', {
        replacements: { d: backdated20Days, id: raBill.id },
      });

      // 4) Subcontractor with >= 3 open snags (subcontractor_performance)
      for (let i = 1; i <= 3; i++) {
        await db.snag_item.create({
          project_id: projectA.id,
          company_id: companyA.id,
          vendor_id: vendorA.id,
          title: `Electrical Conduit Misalignment #${i}`,
          trade: 'MEP',
          severity: 'medium',
          status: 'open',
        });
      }
    });

    test('executes all new construction agents and preserves strict idempotency on repeat runs', async () => {
      const firstRun = await agents.runAgents({
        company_id: companyA.id,
        project_id: projectA.id,
        user_id: userA.id,
        withNarrative: false,
      });

      const actedAgents = new Set(firstRun.actions.filter((a) => a.status === 'created').map((a) => a.agent));
      expect([...actedAgents]).toEqual(
        expect.arrayContaining([
          'safety_sentinel',
          'procurement_burn',
          'rfi_assistant',
          'dispute_risk',
          'subcontractor_performance',
        ])
      );
      expect(firstRun.created).toBeGreaterThanOrEqual(7);

      const secondRun = await agents.runAgents({
        company_id: companyA.id,
        project_id: projectA.id,
        user_id: userA.id,
        withNarrative: false,
      });
      expect(secondRun.created).toBe(0);
      expect(secondRun.already_recorded).toBe(firstRun.created);
    });

    test('exposes roster and live project insights over HTTP', async () => {
      const rosterRes = await request(app).get('/api/v1/agents/roster').set('Authorization', tok(userA));
      expect(rosterRes.status).toBe(200);
      expect(rosterRes.body.data.length).toBe(13);

      const insightsRes = await request(app)
        .get(`/api/v1/agents/${projectA.id}/insights`)
        .set('Authorization', tok(userA));
      expect(insightsRes.status).toBe(200);
      expect(insightsRes.body.data.health_score).toBeLessThan(100);
      expect(insightsRes.body.data.telemetry.low_stock_materials).toBe(1);
      expect(insightsRes.body.data.telemetry.open_rfis).toBe(1);
      expect(insightsRes.body.data.telemetry.pending_variations).toBe(1);
      expect(insightsRes.body.data.roster.length).toBe(13);
    });
  });
});
