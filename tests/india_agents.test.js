'use strict';
/**
 * India checks and the agents that act on them. Pure rules first (no database), then the agents over a small fixture:
 * a second run must create nothing new, and the run-all endpoint must not reach another company's projects.
 * In-memory SQLite (tests/setup).
 */
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const india = require('../src/modules/projects/services/india_compliance.service');
const agents = require('../src/modules/projects/services/control_agents.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const HOUR = 3600000;

describe('India rules (pure)', () => {
  test('amounts use Indian digit grouping', () => {
    expect(india.inr(850000)).toBe('₹8,50,000');
    expect(india.inr(12345678)).toBe('₹1,23,45,678');
    expect(india.inr(999)).toBe('₹999');
    expect(india.inr(0)).toBe('₹0');
  });

  test('the financial year runs from 1 April to 31 March', () => {
    expect(india.financialYear(new Date('2026-11-09T00:00:00Z'))).toBe('2026-27');
    expect(india.financialYear(new Date('2027-03-31T00:00:00Z'))).toBe('2026-27');
    expect(india.financialYear(new Date('2027-04-01T00:00:00Z'))).toBe('2027-28');
  });

  test('GSTIN and PAN formats are checked', () => {
    expect(india.validGstin('27AAACS1234F1Z5')).toBe(true);
    expect(india.validGstin('27AAACS1234F1X5')).toBe(false);
    expect(india.validGstin('ABC')).toBe(false);
    expect(india.validPan('AAACS1234F')).toBe(true);
    expect(india.validPan('AAAAA12345')).toBe(false);
  });

  test('missing GSTIN, missing PAN, zero TDS on an RA bill, and cash of ₹2 lakh or more are flagged with their rule', () => {
    const findings = india.indiaFindings({
      vendors: [{ id: 1, name: 'Maratha Steel', gst_no: null, pan_card_no: null }],
      raBills: [{ id: 7, ra_bill_number: 'RA-9', vendor_id: 1, status: 'submitted', current_period_gross_amount: 600000, tds_rate_pct: 0 }],
      paymentRequests: [{ id: 3, amount: 250000, mode: 'Cash', status: 'pending_approval' }],
      labourCount: 0,
      now: new Date('2026-11-09T00:00:00Z'),
    });
    const rules = findings.map((f) => f.rule);
    expect(rules).toEqual(expect.arrayContaining([
      'GST registration and reverse charge',
      'PAN for TDS (section 206AA)',
      'TDS under section 194C',
      'Section 269ST',
    ]));
    expect(findings.find((f) => f.rule === 'TDS under section 194C').message).toContain('₹6,00,000');
    expect(findings.find((f) => f.rule === 'Section 269ST').message).toContain('₹2,50,000');
  });

  test('contract labour at 50 or more workers is flagged for a compliance adviser to confirm', () => {
    const findings = india.indiaFindings({ vendors: [], raBills: [], paymentRequests: [], labourCount: 60, now: new Date('2026-11-09T00:00:00Z') });
    expect(findings.find((f) => f.area === 'labour')).toMatchObject({ severity: 'medium' });
    expect(india.indiaFindings({ vendors: [], raBills: [], paymentRequests: [], labourCount: 49, now: new Date('2026-11-09T00:00:00Z') }).some((f) => f.area === 'labour')).toBe(false);
  });

  test('a bill at 2% TDS with a registered supplier gets a GST figure at 18%, marked for confirmation', () => {
    const findings = india.indiaFindings({
      vendors: [{ id: 2, name: 'Deccan MEP', gst_no: '27AABCD5678E1Z2', pan_card_no: 'AABCD5678E' }],
      raBills: [{ id: 8, ra_bill_number: 'RA-10', vendor_id: 2, status: 'approved', current_period_gross_amount: 600000, tds_rate_pct: 2 }],
      paymentRequests: [],
      labourCount: 0,
      now: new Date('2026-11-09T00:00:00Z'),
    });
    const gst = findings.find((f) => f.rule === 'GST on works contracts');
    expect(gst.message).toContain('₹1,08,000');
    expect(findings.some((f) => f.severity === 'high')).toBe(false);
  });
});

describe('agents act and do not repeat themselves (database)', () => {
  let companyA;
  let companyB;
  let userA;
  let userB;
  let projectA;
  let projectB;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Golf Infra', email: 'agents@golf.test' });
    companyB = await db.company.create({ name: 'Hotel Build', email: 'agents@hotel.test' });
    const grant = { can_create: true, can_read: true, can_update: true, can_delete: true };
    const roleA = await db.role.create({ name: 'Admin', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Admin B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, ...grant });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, ...grant });
    userA = await db.user.create({ firstname: 'Gita', lastname: 'Rane', email: 'gita@golf.test', company_id: companyA.id, role_id: roleA.id });
    userB = await db.user.create({ firstname: 'Hari', lastname: 'Mohan', email: 'hari@hotel.test', company_id: companyB.id, role_id: roleB.id });
    projectA = await db.project.create({ name: 'Golf Tower A', type: 'residential', company_id: companyA.id });
    projectB = await db.project.create({ name: 'Hotel Tower B', type: 'residential', company_id: companyB.id });

    const vendor = await db.vendors.create({
      name: 'Unlisted Steel Works', spoc_name: 'Ajit', spoc_phone: '9000000021', official_email: 'ajit@steel.test', official_phone: '9000000022',
      physical_address: 'Pune', pincode: '411001', skill: 'steel', company_id: companyA.id,
    });
    const invoice = await db.vendors_invoice.create({ company_id: companyA.id, vendor_id: vendor.id, project_id: projectA.id, invoice_number: 'INV-AG-1', invoice_date: '2026-10-01', grand_total: 250000, items: [], status: 'Pending' });
    const pr = await db.vendors_payment_request.create({ company_id: companyA.id, vendor_id: vendor.id, invoice_id: invoice.id, project_id: projectA.id, amount: 250000, mode: 'Cash', status: 'pending_approval', requested_by: userA.id });
    // Sequelize reads SQLite dates in the "YYYY-MM-DD HH:mm:ss.SSS +00:00" form, so the backdated value is written that way.
    const backdated = new Date(Date.now() - 60 * HOUR).toISOString().replace('T', ' ').replace('Z', ' +00:00');
    await db.sequelize.query('UPDATE VENDORS_PAYMENT_REQUEST SET createdAt = :w WHERE id = :id', { replacements: { w: backdated, id: pr.id } });
    await db.contractor_ra_bill.create({
      ra_bill_number: 'RA-AG-1', company_id: companyA.id, project_id: projectA.id, vendor_id: vendor.id, billing_period_start: '2026-10-01', billing_period_end: '2026-10-31',
      previous_cumulative_amount: 0, current_period_gross_amount: 400000, cumulative_gross_amount: 400000, retention_rate_pct: 5, retention_amount: 20000,
      tds_rate_pct: 0, tds_amount: 0, other_deductions_amount: 0, net_payable_amount: 380000, status: 'submitted',
    });
    await db.bank_guarantee.create({
      company_id: companyA.id, project_id: projectA.id, bg_type: 'performance', bank_name: 'Canara Bank', bg_number: 'CAN-PBG-55',
      amount: 900000, issue_date: '2024-01-01', expiry_date: '2025-12-31', status: 'active',
    });
    await db.vendors_labor.create({ vendor_id: vendor.id, company_id: companyA.id, skill: 'steel', count: 60 });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('a first run creates follow-up tasks and history entries; a second run creates none', async () => {
    const first = await agents.runAgents({ company_id: companyA.id, project_id: projectA.id, user_id: userA.id, withNarrative: false });
    const agentsThatActed = new Set(first.actions.filter((a) => a.status === 'created').map((a) => a.agent));
    expect([...agentsThatActed]).toEqual(expect.arrayContaining(['approval_chaser', 'guarantee_watcher', 'india_compliance']));
    expect(first.created).toBeGreaterThanOrEqual(5);
    const tasksAfterFirst = await db.project_task.count({ where: { project_id: projectA.id } });
    expect(tasksAfterFirst).toBe(first.created);

    const second = await agents.runAgents({ company_id: companyA.id, project_id: projectA.id, user_id: userA.id, withNarrative: false });
    expect(second.created).toBe(0);
    expect(second.already_recorded).toBeGreaterThanOrEqual(5);
    expect(await db.project_task.count({ where: { project_id: projectA.id } })).toBe(tasksAfterFirst);

    const log = await agents.agentLog({ project_id: projectA.id });
    expect(log.some((e) => e.kind === 'AGENT_ACTION')).toBe(true);
    expect(log.some((e) => e.kind === 'AGENT_BRIEFING')).toBe(true);
  });

  test('the chase task names the approval, its amount and its age, and says nothing was sent', async () => {
    const task = await db.project_task.findOne({ where: { project_id: projectA.id, title: { [Op.like]: 'Chase approval%' } } });
    expect(task).not.toBeNull();
    expect(task.description).toContain('Draft message only. Nothing has been sent.');
    expect(task.priority).toBe('High Priority');
  });

  test('the on-demand run covers only the caller company, so it cannot touch another company project', async () => {
    const before = await db.project_task.count({ where: { project_id: projectB.id } });
    const res = await request(app).post('/api/v1/agents/run-all').set('Authorization', tok(userA));
    expect(res.status).toBe(200);
    expect(res.body.data.results.every((r) => r.project_id !== projectB.id)).toBe(true);
    // Company B's project is untouched by company A's run.
    expect(await db.project_task.count({ where: { project_id: projectB.id } })).toBe(before);
  });

  test('a user of another company cannot run agents on this project', async () => {
    const res = await request(app).post(`/api/v1/agents/${projectA.id}/run`).set('Authorization', tok(userB));
    expect(res.status).toBe(404);
  });

  test('the India report is available over HTTP and lists the rule for each flag', async () => {
    const res = await request(app).get(`/api/v1/agents/${projectA.id}/india-compliance`).set('Authorization', tok(userA));
    expect(res.status).toBe(200);
    expect(res.body.data.financial_year).toMatch(/^\d{4}-\d{2}$/);
    expect(res.body.data.findings.every((f) => typeof f.rule === 'string')).toBe(true);
    expect(res.body.data.disclaimer).toContain('Not legal or tax advice');
  });

  test('the model status reports an unreachable model honestly, without sending a prompt', async () => {
    delete process.env.OLLAMA_API_KEY;
    process.env.OLLAMA_HOST = 'http://127.0.0.1:9';
    const res = await request(app).get('/api/v1/agents/status').set('Authorization', tok(userA));
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ provider: 'local-ollama', reachable: false });
  });
});
