'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const aiService = require('../src/core/services/ai.service');
const agents = require('../src/modules/projects/services/control_agents.service');
const scheduler = require('../src/modules/projects/services/agent_scheduler');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const DAY = 86400000;

describe('Phase-2 Construction AI: EAC Forecasting, VLM DPR Inspection & Morning Briefings', () => {
  let companyA;
  let companyB;
  let userA;
  let userB;
  let projectA;
  let dprA;
  let imageA;
  let tmpImagePath;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Vertex Infra', email: 'vertex@test.local' });
    companyB = await db.company.create({ name: 'Other Corp', email: 'other@test.local' });

    const grant = { can_create: true, can_read: true, can_update: true, can_delete: true };
    const roleA = await db.role.create({ name: 'Director', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Director B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, ...grant });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, ...grant });

    userA = await db.user.create({
      firstname: 'Aarav',
      lastname: 'Sharma',
      email: 'aarav@vertex.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userB = await db.user.create({
      firstname: 'Rohan',
      lastname: 'Desai',
      email: 'rohan@other.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projectA = await db.project.create({ name: 'Metro Elevated Viaduct', type: 'infrastructure', company_id: companyA.id });

    // Seed approved budget (BAC = 1,00,00,000) & dated milestone (50% elapsed, 25% progress => behind schedule)
    await db.budget.create({
      company_id: companyA.id,
      project_id: projectA.id,
      total_budget_amount: 10000000,
      status: 'approved',
      revision_number: 1,
    });

    const now = Date.now();
    await db.milestone.create({
      project_id: projectA.id,
      name: 'Pier & Deck Superstructure',
      status: 'In Progress',
      startDate: new Date(now - 50 * DAY),
      endDate: new Date(now + 50 * DAY),
      progress: 25,
    });

    // Actual costs across 2 months = 45,00,000 against EV = 25,00,000 => CPI ~ 0.556
    await db.cost_ledger.bulkCreate([
      {
        company_id: companyA.id,
        project_id: projectA.id,
        cost_category: 'subcontractor',
        event_type: 'accrual',
        source_type: 'VENDORS_INVOICE',
        source_id: 'INV-01',
        recognition_date: new Date(now - 35 * DAY).toISOString().slice(0, 10),
        amount: 2000000,
        idempotency_key: 'eac-cost-1',
      },
      {
        company_id: companyA.id,
        project_id: projectA.id,
        cost_category: 'labour',
        event_type: 'accrual',
        source_type: 'LABOUR_ATTENDANCE',
        source_id: 'LAB-02',
        recognition_date: new Date(now - 5 * DAY).toISOString().slice(0, 10),
        amount: 2500000,
        idempotency_key: 'eac-cost-2',
      },
    ]);

    await db.commitment_ledger.create({
      company_id: companyA.id,
      project_id: projectA.id,
      purchase_order_id: 1,
      event_type: 'commitment_created',
      committed_amount_delta: 6200000,
      idempotency_key: 'eac-comm-1',
    });

    await db.variation_order.create({
      variation_number: 'VO-2026-09',
      company_id: companyA.id,
      project_id: projectA.id,
      change_type: 'client_variation',
      category: 'addition',
      title: 'Deep Pile Foundation Reinforcement',
      status: 'submitted',
      net_cost_impact: 850000,
      time_extension_days_requested: 14,
      created_by: userA.id,
    });

    // Seed DPR + valid temporary image on disk for VLM inspection
    dprA = await db.dpr.create({
      company_id: companyA.id,
      project_id: projectA.id,
      created_by: userA.id,
      report_date: new Date().toISOString().slice(0, 10),
      work_summary: 'Pier cap rebar fixing underway at P-14.',
      total_workforce_count: 24,
      status: 'submitted',
    });

    tmpImagePath = path.join(os.tmpdir(), `zyno_vlm_test_${Date.now()}.png`);
    // Minimal 1x1 valid PNG bytes
    fs.writeFileSync(
      tmpImagePath,
      Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64')
    );

    imageA = await db.dpr_image.create({
      company_id: companyA.id,
      project_id: projectA.id,
      dpr_id: dprA.id,
      file_name: 'pier-p14-rebar.png',
      file_url: '/uploads/dpr/pier-p14-rebar.png',
      file_key: tmpImagePath,
      mime_type: 'image/png',
      size_bytes: 68,
      uploaded_by: userA.id,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    scheduler.stopMorningBriefingScheduler();
    scheduler.stopAgentScheduler();
    if (tmpImagePath && fs.existsSync(tmpImagePath)) fs.unlinkSync(tmpImagePath);
    await db.sequelize.close();
  });

  test('computes EAC cost-slippage forecast, cashflow tail, and triggers autonomous eac_forecaster agent', async () => {
    const res = await request(app)
      .get(`/api/v1/agents/${projectA.id}/eac-forecast`)
      .set('Authorization', tok(userA));

    expect(res.status).toBe(200);
    const data = res.body.data;
    expect(data.applicable).toBe(true);
    expect(data.bac).toBe(10000000);
    expect(data.ac).toBe(4500000);
    expect(data.eac_typical).toBeGreaterThan(data.bac);
    expect(data.eac_composite).toBeGreaterThan(data.eac_typical);
    expect(data.vac_typical).toBeLessThan(0);
    expect(data.overrun_pct).toBeGreaterThan(50);
    expect(data.projected_slippage_days).toBeGreaterThanOrEqual(14);
    expect(data.risk_rating).toBe('Critical');
    expect(data.monthly_cashflow.some((m) => m.projected !== null)).toBe(true);

    // Run autonomous agents and confirm both eac_forecaster & vlm_site_inspector act idempotently
    const run1 = await agents.runAgents({
      company_id: companyA.id,
      project_id: projectA.id,
      user_id: userA.id,
      withNarrative: false,
    });
    const acting = new Set(run1.actions.filter((a) => a.status === 'created').map((a) => a.agent));
    expect(acting.has('eac_forecaster')).toBe(true);
    expect(acting.has('vlm_site_inspector')).toBe(true);

    const run2 = await agents.runAgents({
      company_id: companyA.id,
      project_id: projectA.id,
      user_id: userA.id,
      withNarrative: false,
    });
    expect(run2.created).toBe(0);
  });

  test('VLM DPR inspection returns 503 honestly when AI is down, then detects PPE violation & auto-escalates snag when AI responds', async () => {
    jest
      .spyOn(aiService, 'analyzeMedia')
      .mockRejectedValueOnce(new aiService.AIUnavailableError('Vision model offline'));

    const downRes = await request(app)
      .post(`/api/v1/dpr/${dprA.id}/images/${imageA.id}/vlm-inspect`)
      .set('Authorization', tok(userA));
    expect(downRes.status).toBe(503);

    jest.spyOn(aiService, 'analyzeMedia').mockResolvedValueOnce({
      ppe_compliant: false,
      ppe_violations: [
        {
          severity: 'high',
          hazard: 'Rigger missing full-body safety harness near pier cap edge',
          zone: 'Pier P-14 Deck Edge',
          recommended_action: 'Enforce 100% tie-off and reinstall edge handrail immediately.',
        },
      ],
      observed_stage: 'Pier Cap Rebar & Formwork',
      estimated_progress_pct: 64,
      housekeeping_score: 74,
      summary: 'Rebar cage assembly ~64% complete; 1 high-risk fall-protection PPE violation flagged.',
    });

    const okRes = await request(app)
      .post(`/api/v1/dpr/${dprA.id}/images/${imageA.id}/vlm-inspect`)
      .set('Authorization', tok(userA));

    expect(okRes.status).toBe(200);
    expect(okRes.body.data.ppe_compliant).toBe(false);
    expect(okRes.body.data.estimated_progress_pct).toBe(64);
    expect(okRes.body.data.escalated_snag_ids.length).toBe(1);

    const snag = await db.snag_item.findByPk(okRes.body.data.escalated_snag_ids[0]);
    expect(snag.title).toContain('[VLM HSE]');
    expect(snag.severity).toBe('high');

    const listRes = await request(app)
      .get(`/api/v1/agents/${projectA.id}/vlm-inspections`)
      .set('Authorization', tok(userA));
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.length).toBe(1);
  });

  test('generates scheduled morning director briefings once per calendar date and exposes API + tenant isolation', async () => {
    const fixedMorning = new Date('2026-11-12T07:00:00Z');
    const first = await scheduler.runMorningBriefings({ company_id: companyA.id, withNarrative: false, now: fixedMorning });
    expect(first.projects).toBe(1);
    expect(first.results[0].skipped).toBe(false);

    // Repeat run on the same date must be skipped (idempotent morning digest)
    const second = await scheduler.runMorningBriefings({ company_id: companyA.id, withNarrative: false, now: fixedMorning });
    expect(second.results[0].skipped).toBe(true);

    const listRes = await request(app)
      .get(`/api/v1/agents/${projectA.id}/briefings`)
      .set('Authorization', tok(userA));
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.length).toBe(1);
    expect(listRes.body.data[0].key_metrics.vlm_ppe_violations).toBe(1);
    expect(listRes.body.data[0].action_items.length).toBeGreaterThanOrEqual(2);

    // Portfolio daily briefings endpoint scoped to companyA
    const dailyRes = await request(app)
      .get('/api/v1/agents/briefings/daily')
      .set('Authorization', tok(userA));
    expect(dailyRes.status).toBe(200);
    expect(dailyRes.body.data.projects).toBe(1);

    // Cross-tenant isolation check
    const foreignRes = await request(app)
      .get(`/api/v1/agents/${projectA.id}/eac-forecast`)
      .set('Authorization', tok(userB));
    expect(foreignRes.status).toBe(404);
  });
});
