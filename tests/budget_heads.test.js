'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret-123';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

jest.setTimeout(60000);

describe('Batch N – Project Budget Heads & Allocation Management Tests', () => {
  let companyA, companyB, userA1, userA2, userB, projA, projB;
  let headCivil, headElec, headPlumb, headFinish;
  let wbsRoot, cbsMat;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC module
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });

    companyA = await db.company.create({ name: 'Skyline Infra Developers', email: 'budget@skyline.test' });
    companyB = await db.company.create({ name: 'Horizon Projects', email: 'budget@horizon.test' });

    const roleA = await db.role.create({ name: 'CostManager', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'CostManagerB', type: 'custom', company_id: companyB.id });

    for (const r of [roleA, roleB]) {
      await db.role_permission.create({
        role_id: r.id,
        module_id: projMod.id,
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      });
    }

    userA1 = await db.user.create({
      firstname: 'Ramesh',
      lastname: 'Estimator',
      email: 'ramesh@skyline.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userA2 = await db.user.create({
      firstname: 'Sunita',
      lastname: 'FinanceHead',
      email: 'sunita@skyline.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userB = await db.user.create({
      firstname: 'Karan',
      lastname: 'Competitor',
      email: 'karan@horizon.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projA = await db.project.create({ name: 'Skyline Commercial Complex', type: 'commercial', company_id: companyA.id });
    projB = await db.project.create({ name: 'Horizon Office Tower', type: 'commercial', company_id: companyB.id });

    wbsRoot = await db.wbs.create({
      company_id: companyA.id,
      project_id: projA.id,
      wbs_code: '1.0',
      name: 'Main Civil Structure',
      level: 1,
    });

    cbsMat = await db.cbs.create({
      company_id: companyA.id,
      cost_code: 'MAT-CONC',
      name: 'Ready Mix Concrete',
      category: 'material',
    });
  }, 60000);

  // ── 1. Create Configurable Budget Heads Under Project ─────────────────────
  test('creates multiple configurable budget heads and enforces project-scoping and uniqueness', async () => {
    // 1. Civil Works
    const res1 = await request(app)
      .post('/api/v1/projects/budget/budget-heads')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        head_code: 'CIVIL',
        head_name: 'Civil Works',
        description: 'Earthwork, PCC, RCC, masonry, and plastering',
        sort_order: 1,
      });
    expect(res1.status).toBe(201);
    headCivil = res1.body.data;

    // 2. Electrical
    const res2 = await request(app)
      .post('/api/v1/projects/budget/budget-heads')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        head_code: 'ELEC',
        head_name: 'Electrical Works',
        description: 'Wiring, sub-stations, conduits, and fixtures',
        sort_order: 2,
      });
    expect(res2.status).toBe(201);
    headElec = res2.body.data;

    // 3. Plumbing
    const res3 = await request(app)
      .post('/api/v1/projects/budget/budget-heads')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        head_code: 'PLUMB',
        head_name: 'Plumbing & Sanitary',
        description: 'Pipes, sanitary ware, drainage, and pumps',
        sort_order: 3,
      });
    expect(res3.status).toBe(201);
    headPlumb = res3.body.data;

    // 4. Finishing
    const res4 = await request(app)
      .post('/api/v1/projects/budget/budget-heads')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        head_code: 'FINISH',
        head_name: 'Finishing Works',
        description: 'Flooring, painting, false ceiling, and cladding',
        sort_order: 4,
      });
    expect(res4.status).toBe(201);
    headFinish = res4.body.data;

    // Duplicate head_code in same project rejected
    const dupRes = await request(app)
      .post('/api/v1/projects/budget/budget-heads')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        head_code: 'CIVIL',
        head_name: 'Conflicting Civil Head',
      });
    expect(dupRes.status).toBe(409);

    // Cross-tenant access rejected
    const crossRes = await request(app)
      .get(`/api/v1/projects/budget/budget-heads/project/${projA.id}`)
      .set('Authorization', tok(userB));
    expect(crossRes.status).toBe(404);
  });

  // ── 2. Server-side Calculation of Total Budget from Head Allocations ──────
  test('calculates project budget total server-side from head allocations', async () => {
    // Illustrative allocations:
    // Civil: 25,00,000 | Electrical: 8,00,000 | Plumbing: 5,00,000 | Finishing: 12,00,000 -> Total: 50,00,000
    const budgetRes = await request(app)
      .post('/api/v1/projects/budget/budgets')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        change_reason: 'Approved baseline budget allocation across heads',
        head_allocations: [
          { budget_head_id: headCivil.id, allocated_amount: 2500000 },
          { budget_head_id: headElec.id, allocated_amount: 800000 },
          { budget_head_id: headPlumb.id, allocated_amount: 500000 },
          { budget_head_id: headFinish.id, allocated_amount: 1200000 },
        ],
        lines: [
          {
            budget_head_id: headCivil.id,
            wbs_id: wbsRoot.id,
            cbs_id: cbsMat.id,
            line_description: 'RCC Raft Foundation Materials',
            budgeted_amount: 1500000,
          },
        ],
      });

    expect(budgetRes.status).toBe(201);
    expect(Number(budgetRes.body.data.total_budget_amount)).toBe(5000000);
    expect(budgetRes.body.data.revision_number).toBe(1);
    expect(budgetRes.body.data.status).toBe('draft');
  });

  // ── 3. Detail Line Allocations Exceeding Head Amount Are Rejected ─────────
  test('rejects detailed lines whose sum exceeds the allocated head amount', async () => {
    const invalidBudget = await request(app)
      .post('/api/v1/projects/budget/budgets')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        change_reason: 'Testing detailed line overflow',
        head_allocations: [
          { budget_head_id: headCivil.id, allocated_amount: 200000 },
        ],
        lines: [
          {
            budget_head_id: headCivil.id,
            wbs_id: wbsRoot.id,
            cbs_id: cbsMat.id,
            budgeted_amount: 250000, // 2,50,000 exceeds 2,00,000 allocated head amount
          },
        ],
      });

    expect(invalidBudget.status).toBe(400);
    expect(invalidBudget.body.message).toMatch(/exceeds allocated amount/i);
  });

  // ── 4. Immutability, SoD and Budget Revision Workflow ──────────────────────
  test('enforces segregation of duties on approval, locks baseline, and revisions carry forward', async () => {
    const draftBudget = await db.budget.findOne({
      where: { project_id: projA.id, company_id: companyA.id, status: 'draft' },
    });

    // Creator cannot approve own budget
    const selfAppr = await request(app)
      .put(`/api/v1/projects/budget/budgets/${draftBudget.id}/approve`)
      .set('Authorization', tok(userA1));
    expect(selfAppr.status).toBe(403);

    // Second manager (Sunita) approves
    const appRes = await request(app)
      .put(`/api/v1/projects/budget/budgets/${draftBudget.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(appRes.status).toBe(200);
    expect(appRes.body.data.status).toBe('approved');

    // Create Revision 2: Reallocating ₹2,00,000 from Finishing to Civil (Civil=27L, Finishing=10L)
    const rev2Res = await request(app)
      .post('/api/v1/projects/budget/budgets')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        change_reason: 'Scope amendment: transfer ₹2L from finishing to civil structural works',
        head_allocations: [
          { budget_head_id: headCivil.id, allocated_amount: 2700000 },
          { budget_head_id: headElec.id, allocated_amount: 800000 },
          { budget_head_id: headPlumb.id, allocated_amount: 500000 },
          { budget_head_id: headFinish.id, allocated_amount: 1000000 },
        ],
      });

    expect(rev2Res.status).toBe(201);
    expect(rev2Res.body.data.revision_number).toBe(2);
    expect(Number(rev2Res.body.data.total_budget_amount)).toBe(5000000);

    // Approve Revision 2
    const appRev2 = await request(app)
      .put(`/api/v1/projects/budget/budgets/${rev2Res.body.data.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(appRev2.status).toBe(200);

    // Verify Revision 1 is superseded, Revision 2 is approved
    const rev1 = await db.budget.findByPk(draftBudget.id);
    const rev2 = await db.budget.findByPk(rev2Res.body.data.id);
    expect(rev1.status).toBe('superseded');
    expect(rev2.status).toBe('approved');
  });

  // ── 5. Prevent Deletion of Referenced Budget Heads ─────────────────────────
  test('prevents deletion of budget heads referenced by approved budgets', async () => {
    const delRes = await request(app)
      .delete(`/api/v1/projects/budget/budget-heads/${headCivil.id}`)
      .set('Authorization', tok(userA1));

    expect(delRes.status).toBe(400);
    expect(delRes.body.message).toMatch(/referenced by an approved budget baseline/i);
  });

  // ── 6. Project Cost Reconciliation by Budget Head ─────────────────────────
  test('returns financial reconciliation breakdown by budget head', async () => {
    const reconRes = await request(app)
      .get(`/api/v1/projects/budget/reconciliation/project/${projA.id}`)
      .set('Authorization', tok(userA1));

    expect(reconRes.status).toBe(200);
    expect(reconRes.body.data.approved_budget).toBe(5000000);
    expect(Array.isArray(reconRes.body.data.budget_heads_breakdown)).toBe(true);
    expect(reconRes.body.data.budget_heads_breakdown.length).toBe(4);

    const civilHeadRecon = reconRes.body.data.budget_heads_breakdown.find((h) => h.head_code === 'CIVIL');
    expect(civilHeadRecon).toBeDefined();
    expect(civilHeadRecon.allocated_amount).toBe(2700000);
  });
});
