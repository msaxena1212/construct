'use strict';
/**
 * Portfolio layer: pure rules first (risk score, critical path, cash-out buckets, vendor score), then the endpoints
 * over a small two-company fixture, including tenant isolation and team-mode scoping. In-memory SQLite (tests/setup).
 */
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const { riskFrom, computeCriticalPath, bucketCashOut, vendorScoreFrom } = require('../src/modules/portfolio/portfolio.calc');
const { findingsFromOverview } = require('../src/modules/portfolio/portfolio.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const DAY = 86400000;

describe('project risk (pure)', () => {
  const quiet = { evm: { applicable: true, cpi: 1.1, spi: 1.0 }, snags: {}, approvals: {}, guarantees: {}, days_since_dpr: 0, overdue_tasks: 0, status: 'On Track' };

  test('a project with nothing wrong scores 0 and is green', () => {
    const r = riskFrom(quiet);
    expect(r).toMatchObject({ score: 0, rag: 'green', drivers: [], unknown: [] });
  });

  test('cost and schedule overruns, severe snags and an expired guarantee make a project red, and each driver says why', () => {
    const r = riskFrom({
      ...quiet,
      evm: { applicable: true, cpi: 0.7, spi: 0.6, cv: -300, sv: -400 },
      snags: { critical: 1, high: 2 },
      approvals: { escalate_count: 2, waiting_count: 3 },
      guarantees: { expired_active_count: 1 },
      days_since_dpr: 6,
      overdue_tasks: 2,
      status: 'Delayed',
    });
    expect(r.rag).toBe('red');
    expect(r.score).toBeGreaterThanOrEqual(55);
    expect(r.drivers.map((d) => d.area)).toEqual(expect.arrayContaining(['cost', 'schedule', 'quality', 'approvals', 'cover', 'reporting', 'tasks', 'status']));
    expect(r.drivers[0].points).toBeGreaterThanOrEqual(r.drivers[r.drivers.length - 1].points);
    expect(r.drivers.find((d) => d.area === 'cost').evidence).toMatchObject({ cpi: 0.7 });
  });

  test('figures that cannot be calculated add nothing and are listed as unknown, never read as fine', () => {
    const r = riskFrom({ ...quiet, evm: { applicable: false, reason: 'no_approved_budget' }, days_since_dpr: null });
    expect(r.score).toBe(0);
    expect(r.unknown).toEqual(expect.arrayContaining(['cost', 'schedule', 'reporting']));
  });

  test('the Delayed flag alone moves a project off zero, and a completed project is capped', () => {
    expect(riskFrom({ ...quiet, status: 'Delayed' }).score).toBe(8);
    const done = riskFrom({ ...quiet, status: 'Completed', evm: { applicable: true, cpi: 0.4, spi: 0.4 }, snags: { critical: 5 } });
    expect(done.score).toBeLessThanOrEqual(20);
  });
});

describe('critical path (pure)', () => {
  const dep = (task_id, predecessor_id, type = 'FS', lag = 0) => ({ task_id, predecessor_id, type, lag });
  const row = (cpm, id) => cpm.tasks.find((t) => t.id === id);

  test('a diamond: the longer branch is critical and the shorter one has float', () => {
    const cpm = computeCriticalPath(
      [{ id: 1, duration: 3 }, { id: 2, duration: 5 }, { id: 3, duration: 2 }, { id: 4, duration: 4 }],
      [dep(2, 1), dep(3, 1), dep(4, 2), dep(4, 3)]
    );
    expect(cpm.ok).toBe(true);
    expect(cpm.finish).toBe(12);
    expect(cpm.critical_path).toEqual([1, 2, 4]);
    expect(row(cpm, 3)).toMatchObject({ es: 3, ef: 5, float: 3, critical: false });
  });

  test('start-to-start with a lag, finish-to-finish and start-to-finish links are honoured', () => {
    const ss = computeCriticalPath([{ id: 1, duration: 4 }, { id: 2, duration: 3 }], [dep(2, 1, 'SS', 2)]);
    expect(row(ss, 2)).toMatchObject({ es: 2, ef: 5 });
    expect(ss.finish).toBe(5);

    const ff = computeCriticalPath([{ id: 1, duration: 5 }, { id: 2, duration: 2 }], [dep(2, 1, 'FF', 0)]);
    expect(row(ff, 2)).toMatchObject({ es: 3, ef: 5 });

    const sf = computeCriticalPath([{ id: 1, duration: 3 }, { id: 2, duration: 4 }], [dep(2, 1, 'SF', 0)]);
    expect(row(sf, 2)).toMatchObject({ es: 0, ef: 4, critical: true });
    expect(row(sf, 1)).toMatchObject({ float: 1, critical: false });
  });

  test('a dependency cycle is reported, not guessed at', () => {
    const cpm = computeCriticalPath([{ id: 1, duration: 2 }, { id: 2, duration: 2 }], [dep(2, 1), dep(1, 2)]);
    expect(cpm.ok).toBe(false);
    expect(cpm.cycle.sort()).toEqual([1, 2]);
  });

  test('links to tasks outside the set are ignored and counted; a zero duration counts as one day', () => {
    const cpm = computeCriticalPath([{ id: 1, duration: 0 }], [dep(1, 99)]);
    expect(cpm.ignored_dependencies).toBe(1);
    expect(cpm.finish).toBe(1);
  });
});

describe('cash-out buckets (pure)', () => {
  const now = new Date('2026-11-09T00:00:00Z');

  test('items go into weekly buckets; late items land in week 1 as overdue; nothing is dropped silently', () => {
    const r = bucketCashOut([
      { date: '2026-11-01', amount: 100, source: 'ra_bills' },
      { date: '2026-11-10', amount: 50, source: 'payment_requests' },
      { date: '2026-11-18', amount: 70, source: 'payment_requests' },
      { date: '2027-06-01', amount: 900, source: 'open_purchase_orders' },
      { date: '2026-11-20', amount: 0, source: 'ra_bills' },
      { date: 'not a date', amount: 5, source: 'ra_bills' },
    ], now, 4);
    expect(r.weeks[0]).toMatchObject({ total: 150, overdue: 100 });
    expect(r.weeks[1].total).toBe(70);
    expect(r.weeks[1].by_source).toEqual({ payment_requests: 70 });
    expect(r.total).toBe(220);
    expect(r.weeks[3].cumulative).toBe(220);
    expect(r.beyond_horizon).toEqual({ count: 1, amount: 900 });
    expect(r.peak_week).toMatchObject({ week: 1, total: 150 });
  });
});

describe('vendor score (pure)', () => {
  test('a fully registered vendor with clean records is an A', () => {
    const r = vendorScoreFrom({ gst_no: '27AAACS1234F1Z5', pan_card_no: 'AAACS1234F', compliance_score: 90, invoice_count: 4, unpaid_invoice_count: 1, received_qty: 100, rejected_qty: 0, open_snags: 0 });
    expect(r).toMatchObject({ score: 100, grade: 'A', reasons: [] });
  });

  test('missing registration, rejected goods and severe snags pull the grade down, with the reasons', () => {
    const r = vendorScoreFrom({ gst_no: null, pan_card_no: null, compliance_score: 0, invoice_count: 0, unpaid_invoice_count: 0, received_qty: 100, rejected_qty: 10, open_snags: 2, open_snags_high: 2 });
    expect(r.grade).toBe('D');
    expect(r.reasons.map((x) => x.reason).join(' ')).toMatch(/GSTIN/);
    expect(r.reasons.map((x) => x.reason).join(' ')).toMatch(/rejected/);
    // A stored compliance score of 0 means "not assessed" and is not penalised.
    expect(r.reasons.some((x) => /compliance score/.test(x.reason))).toBe(false);
  });

  test('a stored compliance score between 1 and 79 is penalised', () => {
    const r = vendorScoreFrom({ gst_no: 'x', pan_card_no: 'y', compliance_score: 40, invoice_count: 0, unpaid_invoice_count: 0, received_qty: 0, rejected_qty: 0, open_snags: 0 });
    expect(r.score).toBe(90);
  });
});

describe('portfolio endpoints (database)', () => {
  let companyA; let companyB; let userA; let userB; let planner; let projectA; let projectB;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Alpha Infra', email: 'p@alpha.test' });
    companyB = await db.company.create({ name: 'Beta Build', email: 'p@beta.test' });
    const grant = { can_create: true, can_read: true, can_update: true, can_delete: true };
    const roleA = await db.role.create({ name: 'Admin', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Admin B', type: 'custom', company_id: companyB.id });
    const rolePlanner = await db.role.create({ name: 'Planner', type: 'custom', company_id: companyA.id });
    for (const r of [roleA, roleB, rolePlanner]) await db.role_permission.create({ role_id: r.id, module_id: mod.id, ...grant });
    userA = await db.user.create({ firstname: 'Asha', lastname: 'Rao', email: 'asha@alpha.test', company_id: companyA.id, role_id: roleA.id });
    userB = await db.user.create({ firstname: 'Bala', lastname: 'Iyer', email: 'bala@beta.test', company_id: companyB.id, role_id: roleB.id });
    planner = await db.user.create({ firstname: 'Pia', lastname: 'Shah', email: 'pia@alpha.test', company_id: companyA.id, role_id: rolePlanner.id });

    projectA = await db.project.create({ name: 'Alpha Tower', type: 'residential', company_id: companyA.id, status: 'Delayed', progress: 40, budget_total: 1000000, completion_date: '2027-06-30', project_code: 'ALP' });
    projectB = await db.project.create({ name: 'Beta Bridge', type: 'infrastructure', company_id: companyB.id, progress: 10, budget_total: 500000, project_code: 'BET' });

    // Alpha: approved budget, a dated milestone half done and half elapsed, cost ahead of earned value
    const now = Date.now();
    await db.budget.create({ company_id: companyA.id, project_id: projectA.id, revision_number: 1, status: 'approved', total_budget_amount: 1000000, created_by: userA.id, approved_by: userA.id, approved_at: new Date() });
    await db.milestone.create({ project_id: projectA.id, name: 'Structure', progress: 50, status: 'In Progress', startDate: new Date(now - 100 * DAY).toISOString().slice(0, 10), endDate: new Date(now + 100 * DAY).toISOString().slice(0, 10) });
    await db.cost_ledger.create({
      company_id: companyA.id, project_id: projectA.id, cost_category: 'subcontractor', source_type: 'TEST', source_id: '1', recognition_date: '2026-10-31', amount: 700000, idempotency_key: 'PF-COST-1',
    });
    await db.snag_item.create({ project_id: projectA.id, company_id: companyA.id, title: 'Cracked beam', severity: 'high', status: 'open' });
    await db.bank_guarantee.create({ company_id: companyA.id, project_id: projectA.id, bg_type: 'performance', bank_name: 'SBI', bg_number: 'PF-BG-1', amount: 100000, issue_date: '2024-01-01', expiry_date: '2025-01-01', status: 'active' });

    const vendor = await db.vendors.create({
      name: 'Unregistered Works', spoc_name: 'Ravi', spoc_phone: '9000000001', official_email: 'r@w.test', official_phone: '9000000002', physical_address: 'Pune', pincode: '411001', skill: 'civil',
      company_id: companyA.id, project_id: projectA.id,
    });
    const invoice = await db.vendors_invoice.create({ company_id: companyA.id, vendor_id: vendor.id, project_id: projectA.id, invoice_number: 'PF-INV-1', invoice_date: '2026-10-01', grand_total: 250000, items: [], status: 'Pending' });
    await db.vendors_payment_request.create({ company_id: companyA.id, vendor_id: vendor.id, invoice_id: invoice.id, project_id: projectA.id, amount: 250000, mode: 'Bank Transfer', status: 'approved', approved_by: userA.id, approved_at: new Date(), requested_by: userA.id });
    await db.snag_item.create({ project_id: projectA.id, company_id: companyA.id, title: 'Vendor snag', severity: 'high', status: 'open', vendor_id: vendor.id });

    // Alpha tasks: 1 -> 2 (FS), 1 -> 3 (FS); task 2 is the longer branch
    const t = [];
    for (const title of ['Excavate', 'Pour slab', 'Fix rebar']) t.push(await db.project_task.create({ project_id: projectA.id, title, created_by: userA.id, status: 'In Progress' }));
    const span = (task, from, to) => db.project_sub_task.create({ task_id: task.id, title: 'Work', startDate: from, endDate: to });
    await span(t[0], '2026-11-01', '2026-11-03');
    await span(t[1], '2026-11-04', '2026-11-13');
    await span(t[2], '2026-11-04', '2026-11-06');
    await db.project_task_dependency.create({ task_id: t[1].id, predecessor_id: t[0].id, type: 'FS', lag: 0 });
    await db.project_task_dependency.create({ task_id: t[2].id, predecessor_id: t[0].id, type: 'FS', lag: 0 });
    // A cycle in Beta, to see it reported
    const b1 = await db.project_task.create({ project_id: projectB.id, title: 'B1', created_by: userB.id });
    const b2 = await db.project_task.create({ project_id: projectB.id, title: 'B2', created_by: userB.id });
    await db.project_task_dependency.create({ task_id: b2.id, predecessor_id: b1.id, type: 'FS', lag: 0 });
    await db.project_task_dependency.create({ task_id: b1.id, predecessor_id: b2.id, type: 'FS', lag: 0 });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('every endpoint needs a signed-in user', async () => {
    for (const p of ['/overview', '/brief', '/cash-flow', '/vendors', `/projects/${projectA.id}/critical-path`]) {
      const res = await request(app).get(`/api/v1/portfolio${p}`);
      expect(res.status).toBe(401);
    }
  });

  test('the overview lists only the caller\'s own company, with earned value and a risk score explained by its drivers', async () => {
    const res = await request(app).get('/api/v1/portfolio/overview').set('Authorization', tok(userA));
    expect(res.status).toBe(200);
    const { totals, projects } = res.body.data;
    expect(projects.map((p) => p.name)).toEqual(['Alpha Tower']);
    expect(totals.projects).toBe(1);
    const p = projects[0];
    // BAC 1,000,000; progress 50% -> EV 500,000; AC 700,000 -> CPI 0.714
    expect(p).toMatchObject({ bac: 1000000, ac: 700000, ev: 500000, cpi: 0.714 });
    // Schedule is on plan (half elapsed, half done). Score = cost 29 + two high snags 6 + expired guarantee 6 + Delayed flag 8.
    const points = Object.fromEntries(p.risk.drivers.map((d) => [d.area, d.points]));
    expect(points).toEqual({ cost: 29, quality: 6, cover: 6, status: 8 });
    expect(p.risk).toMatchObject({ score: 49, rag: 'amber' });
    expect(p.guarantees.expired_active).toBe(1);

    const other = await request(app).get('/api/v1/portfolio/overview').set('Authorization', tok(userB));
    expect(other.body.data.projects.map((x) => x.name)).toEqual(['Beta Bridge']);
  });

  test('a project outside the company is not found, whichever endpoint asks for it', async () => {
    const cp = await request(app).get(`/api/v1/portfolio/projects/${projectB.id}/critical-path`).set('Authorization', tok(userA));
    expect(cp.status).toBe(404);
    const cf = await request(app).get(`/api/v1/portfolio/cash-flow?project_id=${projectB.id}`).set('Authorization', tok(userA));
    expect(cf.status).toBe(404);
  });

  test('the cash-out forecast counts the approved payment request once, and says what it assumed', async () => {
    const res = await request(app).get('/api/v1/portfolio/cash-flow?weeks=8').set('Authorization', tok(userA));
    expect(res.status).toBe(200);
    const d = res.body.data;
    expect(d.by_source.payment_requests).toBe(250000);
    // The invoice behind the payment request must not be counted a second time.
    expect(d.by_source.vendor_invoices).toBeUndefined();
    expect(d.total).toBe(250000);
    expect(d.weeks).toHaveLength(8);
    expect(d.assumptions.length).toBeGreaterThan(3);
    expect(d.by_project[0]).toMatchObject({ name: 'Alpha Tower', total: 250000 });
  });

  test('the critical path follows the longer branch and shows float on the other', async () => {
    const res = await request(app).get(`/api/v1/portfolio/projects/${projectA.id}/critical-path`).set('Authorization', tok(userA));
    expect(res.status).toBe(200);
    const d = res.body.data;
    expect(d.applicable).toBe(true);
    expect(d.critical_path.map((x) => x.title)).toEqual(['Excavate', 'Pour slab']);
    const rebar = d.tasks.find((t) => t.title === 'Fix rebar');
    expect(rebar.critical).toBe(false);
    expect(rebar.float_days).toBeGreaterThan(0);
    expect(d.contract_completion_date).toBe('2027-06-30');
    expect(d.days_to_contract_completion).toBeGreaterThan(0);
  });

  test('a dependency cycle comes back as a clear non-result', async () => {
    const res = await request(app).get(`/api/v1/portfolio/projects/${projectB.id}/critical-path`).set('Authorization', tok(userB));
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ applicable: false, reason: 'dependency_cycle' });
    expect(res.body.data.cycle.map((c) => c.title).sort()).toEqual(['B1', 'B2']);
  });

  test('the vendor scorecard flags the unregistered vendor with a snag and shows the reasons', async () => {
    const res = await request(app).get('/api/v1/portfolio/vendors').set('Authorization', tok(userA));
    expect(res.status).toBe(200);
    const v = res.body.data.vendors.find((x) => x.name === 'Unregistered Works');
    expect(v.grade).not.toBe('A');
    expect(v.reasons.map((r) => r.reason).join(' ')).toMatch(/GSTIN/);
    expect(v.reasons.map((r) => r.reason).join(' ')).toMatch(/snag/);
    expect(res.body.data.summary.count).toBe(1);
  });

  test('the brief lists findings; with no model reachable the narrative is reported unavailable, never invented', async () => {
    const saved = { host: process.env.OLLAMA_HOST, key: process.env.OLLAMA_API_KEY, gem: process.env.GEMINI_API_KEY };
    process.env.OLLAMA_HOST = 'http://127.0.0.1:9';
    delete process.env.OLLAMA_API_KEY;
    delete process.env.GEMINI_API_KEY;
    try {
      const res = await request(app).get('/api/v1/portfolio/brief?narrative=1').set('Authorization', tok(userA));
      expect(res.status).toBe(200);
      const d = res.body.data;
      expect(d.findings.length).toBeGreaterThan(0);
      expect(d.findings[0].severity).toBe('high');
      expect(d.narrative).toBeNull();
      expect(d.narrative_status).toBe('unavailable');
      expect(d.narrative_reason).toMatch(/did not answer/);
    } finally {
      if (saved.host === undefined) delete process.env.OLLAMA_HOST; else process.env.OLLAMA_HOST = saved.host;
      if (saved.key !== undefined) process.env.OLLAMA_API_KEY = saved.key;
      if (saved.gem !== undefined) process.env.GEMINI_API_KEY = saved.gem;
    }
  });

  test('in team mode a user sees only the projects they belong to', async () => {
    process.env.PROJECT_ACCESS_MODE = 'team';
    try {
      const before = await request(app).get('/api/v1/portfolio/overview').set('Authorization', tok(planner));
      expect(before.status).toBe(200);
      expect(before.body.data.projects).toEqual([]);
      const cp = await request(app).get(`/api/v1/portfolio/projects/${projectA.id}/critical-path`).set('Authorization', tok(planner));
      expect(cp.status).toBe(403);

      await db.project_team.create({ project_id: projectA.id, user_id: planner.id, role: 'Planner' });
      const after = await request(app).get('/api/v1/portfolio/overview').set('Authorization', tok(planner));
      expect(after.body.data.projects.map((p) => p.name)).toEqual(['Alpha Tower']);

      // A bypass role (Admin) still sees the whole company.
      const admin = await request(app).get('/api/v1/portfolio/overview').set('Authorization', tok(userA));
      expect(admin.body.data.projects).toHaveLength(1);
    } finally {
      delete process.env.PROJECT_ACCESS_MODE;
    }
  });
});

describe('brief findings (pure)', () => {
  test('red projects and escalated approvals come before amber ones and information', () => {
    const overview = {
      totals: { guarantees_expired_active: 1, guarantees_expiring: 0, approvals_escalated: 2, approvals_waiting: 5, open_snags_high_or_critical: 0, pending_variation_amount: 1500000, cpi: 0.9, ac: 100, ev: 90 },
      projects: [
        { id: 1, name: 'Amber One', risk: { rag: 'amber', score: 40, drivers: [{ message: 'cost is up' }] } },
        { id: 2, name: 'Red Two', risk: { rag: 'red', score: 70, drivers: [{ message: 'snags' }] } },
      ],
    };
    const f = findingsFromOverview(overview);
    expect(f[0].message).toContain('Red Two');
    expect(f.map((x) => x.severity)).toEqual(['high', 'high', 'high', 'medium', 'medium', 'info']);
    expect(f.at(-1).message).toContain('₹15,00,000');
  });
});
