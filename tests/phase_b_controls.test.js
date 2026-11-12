'use strict';
/**
 * Approval ageing (benchmark item 6, partial) and earned value (item 9, partial), over HTTP and the service.
 * Figures are worked out by hand in the comments so a reviewer can check them. In-memory SQLite (tests/setup).
 */
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const { approvalAgeing, earnedValue } = require('../src/modules/projects/services/project_controls.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const HOUR = 3600000;

describe('approval ageing and earned value', () => {
  let companyA;
  let companyB;
  let userA;
  let userB;
  let projectEvm;
  let projectNoBudget;
  let outsiderProject;
  let vendor;
  let invoice;
  let paymentRequest;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Delta Build', email: 'phaseb@delta.test' });
    companyB = await db.company.create({ name: 'Echo Build', email: 'phaseb@echo.test' });
    const grant = { can_create: true, can_read: true, can_update: true, can_delete: true };
    const roleA = await db.role.create({ name: 'Planner', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'Planner B', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: roleA.id, module_id: mod.id, ...grant });
    await db.role_permission.create({ role_id: roleB.id, module_id: mod.id, ...grant });
    userA = await db.user.create({ firstname: 'Meera', lastname: 'Iyer', email: 'meera@delta.test', company_id: companyA.id, role_id: roleA.id });
    userB = await db.user.create({ firstname: 'Ben', lastname: 'Cole', email: 'ben@echo.test', company_id: companyB.id, role_id: roleB.id });

    projectEvm = await db.project.create({ name: 'Tower EVM', type: 'commercial', company_id: companyA.id });
    projectNoBudget = await db.project.create({ name: 'Tower No Budget', type: 'commercial', company_id: companyA.id });
    outsiderProject = await db.project.create({ name: 'Echo Tower', type: 'commercial', company_id: companyB.id });

    // Approved budget of 10,00,000 for the EVM project; the second project has milestones but no approved budget.
    await db.budget.create({ company_id: companyA.id, project_id: projectEvm.id, revision_number: 1, status: 'approved', total_budget_amount: 1000000 });
    await db.milestone.create({ project_id: projectEvm.id, name: 'Structure', startDate: '2026-01-01', endDate: '2026-12-31', progress: 50 });
    await db.milestone.create({ project_id: projectEvm.id, name: 'Finishes', startDate: '2026-07-01', endDate: '2026-12-31', progress: 20 });
    await db.milestone.create({ project_id: projectNoBudget.id, name: 'Only milestone', startDate: '2026-01-01', endDate: '2026-12-31', progress: 10 });

    // Net cost recognized on the EVM project: 1,75,000 (a sub-contractor bill and a reversal of 25,000).
    await db.cost_ledger.create({ company_id: companyA.id, project_id: projectEvm.id, cost_category: 'subcontractor', source_type: 'TEST', source_id: 1, recognition_date: '2026-10-01', amount: 200000, idempotency_key: 'EVM-COST-1' });
    await db.cost_ledger.create({ company_id: companyA.id, project_id: projectEvm.id, cost_category: 'subcontractor', source_type: 'TEST', source_id: 2, recognition_date: '2026-10-05', amount: -25000, idempotency_key: 'EVM-COST-2', event_type: 'reversal' });

    vendor = await db.vendors.create({
      name: 'Gopal Works', spoc_name: 'Gopal', spoc_phone: '9000000011', official_email: 'gopal@works.test', official_phone: '9000000012',
      physical_address: 'Plot 9, Nashik', pincode: '422001', skill: 'civil', company_id: companyA.id,
    });
    invoice = await db.vendors_invoice.create({
      company_id: companyA.id, vendor_id: vendor.id, project_id: projectEvm.id, invoice_number: 'INV-AGE-1',
      invoice_date: '2026-10-01', grand_total: 5000, items: [], status: 'Pending',
    });
    paymentRequest = await db.vendors_payment_request.create({
      company_id: companyA.id, vendor_id: vendor.id, invoice_id: invoice.id, project_id: projectEvm.id,
      amount: 5000, mode: 'Bank Transfer', status: 'pending_approval', requested_by: userA.id,
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('earned value', () => {
    test('at the end of the schedule: PV 10,00,000, EV 3,50,000, AC 1,75,000, CPI 2.0, SPI 0.35', async () => {
      // PV: both milestones have elapsed their full span, so each contributes 1 -> 10,00,000.
      // EV: mean progress (50% and 20%) of 10,00,000 -> 3,50,000.
      // AC: 2,00,000 less the 25,000 reversal -> 1,75,000. CPI = 3,50,000 / 1,75,000 = 2.0. SPI = 3,50,000 / 10,00,000.
      const res = await request(app)
        .get(`/api/v1/project-controls/${projectEvm.id}/evm?status_date=2026-12-31`)
        .set('Authorization', tok(userA));
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({
        applicable: true,
        bac: 1000000,
        pv: 1000000,
        ev: 350000,
        ac: 175000,
        cv: 175000,
        sv: -650000,
        cpi: 2,
        spi: 0.35,
        eac: 500000,
        milestones_used: 2,
        milestones_without_dates: 0,
      });
    });

    test('part way through the schedule, PV counts only the elapsed share of each span', async () => {
      // 1 July is 181 days after 1 January; the span is 364 days. Structure contributes 181/364, Finishes 0 (not started).
      // PV = 10,00,000 x (181/364 + 0) / 2 = 2,48,626.37
      const data = await earnedValue({ company_id: companyA.id, project_id: projectEvm.id, status_date: new Date('2026-07-01T00:00:00Z') });
      expect(data.applicable).toBe(true);
      expect(Math.abs(data.pv - 248626.37)).toBeLessThan(1);
      expect(data.ev).toBe(350000);
    });

    test('a project without an approved budget has no earned value, and the reason says so', async () => {
      const res = await request(app)
        .get(`/api/v1/project-controls/${projectNoBudget.id}/evm`)
        .set('Authorization', tok(userA));
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({ applicable: false, reason: 'no_approved_budget', milestones_used: 1 });
    });

    test('an invalid status date is refused', async () => {
      const res = await request(app)
        .get(`/api/v1/project-controls/${projectEvm.id}/evm?status_date=not-a-date`)
        .set('Authorization', tok(userA));
      expect(res.status).toBe(400);
    });

    test('a user of another company cannot read the earned value of this project', async () => {
      const res = await request(app)
        .get(`/api/v1/project-controls/${projectEvm.id}/evm`)
        .set('Authorization', tok(userB));
      expect(res.status).toBe(404);
      // The other company's own project is readable by its own user.
      const own = await request(app)
        .get(`/api/v1/project-controls/${outsiderProject.id}/evm`)
        .set('Authorization', tok(userB));
      expect(own.status).toBe(200);
      expect(own.body.data.applicable).toBe(false);
    });
  });

  describe('approval ageing', () => {
    test('a payment request older than the threshold is flagged for escalation; a newer one is not', async () => {
      const created = paymentRequest.createdAt.getTime();
      const older = await approvalAgeing({ company_id: companyA.id, project_id: projectEvm.id, older_than_hours: 48, now: new Date(created + 50 * HOUR) });
      expect(older.waiting_count).toBe(1);
      expect(older.escalate_count).toBe(1);
      expect(older.items[0]).toMatchObject({ kind: 'payment_request', id: paymentRequest.id, amount: 5000, escalate: true, age_hours: 50 });

      const newer = await approvalAgeing({ company_id: companyA.id, project_id: projectEvm.id, older_than_hours: 48, now: new Date(created + 10 * HOUR) });
      expect(newer.items[0]).toMatchObject({ escalate: false, age_hours: 10 });
    });

    test('an RA bill waiting for approval appears with its status and age', async () => {
      await db.contractor_ra_bill.create({
        ra_bill_number: 'RA-AGE-1', company_id: companyA.id, project_id: projectEvm.id, vendor_id: vendor.id,
        billing_period_start: '2026-10-01', billing_period_end: '2026-10-31', previous_cumulative_amount: 0,
        current_period_gross_amount: 80000, cumulative_gross_amount: 80000, retention_rate_pct: 5, retention_amount: 4000,
        tds_rate_pct: 0, tds_amount: 0, other_deductions_amount: 0, net_payable_amount: 76000, status: 'submitted', prepared_by: userA.id,
      });
      const res = await request(app)
        .get(`/api/v1/project-controls/${projectEvm.id}/approvals/ageing?older_than_hours=0`)
        .set('Authorization', tok(userA));
      expect(res.status).toBe(200);
      expect(res.body.data.waiting_count).toBe(2);
      expect(res.body.data.items.map((i) => i.kind).sort()).toEqual(['payment_request', 'ra_bill']);
      expect(res.body.data.items.find((i) => i.kind === 'ra_bill')).toMatchObject({ label: 'RA-AGE-1', status: 'submitted', amount: 80000 });
    });

    test('a user of another company cannot see the approvals of this project', async () => {
      const res = await request(app)
        .get(`/api/v1/project-controls/${projectEvm.id}/approvals/ageing`)
        .set('Authorization', tok(userB));
      expect(res.status).toBe(404);
    });
  });
});
