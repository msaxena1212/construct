'use strict';
/**
 * Project control briefing agent: findings are checked from the control figures, sorted by severity, and the model
 * narrative is optional and honest about its source. In-memory SQLite (tests/setup).
 */
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const { findingsFrom, summaryFrom, narrate } = require('../src/modules/projects/services/control_agent.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

const quiet = {
  approvals: { waiting_count: 0, escalate_count: 0, older_than_hours: 48 },
  retention: { total_outstanding: 0, dlp_ended: false, dlp_end_date: null, handover_date: null },
  guarantees: { expiring_count: 0, expired_active_count: 0, expiring_within_days: 30, active_total: 0 },
  evm: { applicable: true, cpi: 1.2, spi: 1.0, ev: 100, pv: 100, ac: 80 },
};

describe('briefing findings (pure)', () => {
  test('a project with nothing open has no findings and says so', () => {
    const findings = findingsFrom(quiet);
    expect(findings).toEqual([]);
    expect(summaryFrom(findings)).toBe('No open control issues.');
  });

  test('findings are sorted high first, and each carries the figures it used', () => {
    const findings = findingsFrom({
      approvals: { ...quiet.approvals, waiting_count: 2, escalate_count: 2 },
      retention: { ...quiet.retention, total_outstanding: 500, dlp_ended: true, dlp_end_date: '2021-01-01' },
      guarantees: { ...quiet.guarantees, expired_active_count: 1 },
      evm: { ...quiet.evm, cpi: 0.7 },
    });
    expect(findings.map((f) => f.severity)).toEqual(['high', 'high', 'high', 'medium']);
    expect(findings[0]).toMatchObject({ area: 'approvals', evidence: { escalate_count: 2 } });
    expect(findings.find((f) => f.area === 'retention')).toMatchObject({ severity: 'medium', evidence: { total_outstanding: 500 } });
    // The summary carries the three most urgent findings; the medium retention finding is the fourth, so it is listed
    // in findings but not in the summary.
    expect(summaryFrom(findings)).toContain('2 item(s) have waited');
    expect(summaryFrom(findings)).not.toContain('₹500');
  });

  test('retention still inside the defect liability period is information, not an action', () => {
    const findings = findingsFrom({
      ...quiet,
      retention: { total_outstanding: 300, dlp_ended: false, dlp_end_date: '2027-06-01', handover_date: '2026-06-01' },
    });
    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ severity: 'info', area: 'retention' });
    expect(findings[0].message).toContain('until the defect liability period ends on 2027-06-01');
  });

  test('earned value that cannot be calculated is explained, with the step that fixes it', () => {
    const findings = findingsFrom({ ...quiet, evm: { applicable: false, reason: 'no_approved_budget' } });
    expect(findings).toEqual([
      expect.objectContaining({ severity: 'info', area: 'evm', proposed_action: 'Approve the project budget.' }),
    ]);
    expect(findings[0].message).toContain('there is no approved budget');
  });
});

describe('model narrative', () => {
  test('when the model is unreachable the narrative is null, so the caller reports it as unavailable', async () => {
    process.env.OLLAMA_HOST = 'http://127.0.0.1:9';
    const text = await narrate([{ severity: 'high', area: 'approvals', message: 'x' }], { timeoutMs: 2000 });
    expect(text).toBeNull();
  });
});

describe('briefing over HTTP', () => {
  let company;
  let user;
  let project;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    company = await db.company.create({ name: 'Foxtrot Build', email: 'agent@foxtrot.test' });
    const role = await db.role.create({ name: 'Planner', type: 'custom', company_id: company.id });
    await db.role_permission.create({ role_id: role.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    user = await db.user.create({ firstname: 'Kiran', lastname: 'Das', email: 'kiran@foxtrot.test', company_id: company.id, role_id: role.id });
    project = await db.project.create({ name: 'Tower Briefing', type: 'commercial', company_id: company.id });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('a briefing with no narrative says the narrative was not requested, and still lists the checks', async () => {
    const res = await request(app).get(`/api/v1/project-controls/${project.id}/briefing`).set('Authorization', tok(user));
    expect(res.status).toBe(200);
    expect(res.body.data.narrative).toBeNull();
    expect(res.body.data.narrative_source).toBe('none');
    // No approved budget, so the earned value check says why it cannot run.
    expect(res.body.data.findings.map((f) => f.area)).toEqual(['evm']);
    expect(res.body.data.counts).toEqual({ high: 0, medium: 0, info: 1 });
  });

  test('when a narrative is asked for and the model is unreachable, the source says unavailable and the findings remain', async () => {
    process.env.OLLAMA_HOST = 'http://127.0.0.1:9';
    const res = await request(app).get(`/api/v1/project-controls/${project.id}/briefing?narrative=1`).set('Authorization', tok(user));
    expect(res.status).toBe(200);
    expect(res.body.data.narrative).toBeNull();
    expect(res.body.data.narrative_source).toBe('unavailable');
    expect(res.body.data.findings.length).toBeGreaterThan(0);
  });
});
