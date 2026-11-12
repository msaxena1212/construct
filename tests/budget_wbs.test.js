'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

describe('Batch L – WBS, CBS & Versioned Project Budgets Tests', () => {
  let companyA, companyB;
  let userA1, userA2, userB;
  let projA, projB;
  let cbsMat, cbsLab;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    // Seed RBAC module
    const projMod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });

    // Tenants
    companyA = await db.company.create({ name: 'Alpha Infrastructure Ltd', email: 'infra@alpha.test' });
    companyB = await db.company.create({ name: 'Beta Constructions Ltd', email: 'infra@beta.test' });

    const roleA = await db.role.create({ name: 'ManagerA', type: 'custom', company_id: companyA.id });
    const roleB = await db.role.create({ name: 'ManagerB', type: 'custom', company_id: companyB.id });

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
      firstname: 'Alice',
      lastname: 'Planner',
      email: 'alice.plan@alpha.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userA2 = await db.user.create({
      firstname: 'Bob',
      lastname: 'Director',
      email: 'bob.dir@alpha.test',
      company_id: companyA.id,
      role_id: roleA.id,
    });
    userB = await db.user.create({
      firstname: 'Charlie',
      lastname: 'Beta',
      email: 'charlie@beta.test',
      company_id: companyB.id,
      role_id: roleB.id,
    });

    projA = await db.project.create({ name: 'Alpha Metro Rail', type: 'infrastructure', company_id: companyA.id });
    projB = await db.project.create({ name: 'Beta Port Terminal', type: 'infrastructure', company_id: companyB.id });
  });

  // ── 1. CBS Creation & Company Scoping ────────────────────────────────────
  test('creates standardized company-level CBS cost codes', async () => {
    const res1 = await request(app)
      .post('/api/v1/projects/budget/cbs')
      .set('Authorization', tok(userA1))
      .send({
        cost_code: 'MAT-CIVIL',
        name: 'Civil Materials',
        category: 'material',
        description: 'Cement, steel, aggregates, bricks',
      });
    expect(res1.status).toBe(201);
    cbsMat = res1.body.data;

    const res2 = await request(app)
      .post('/api/v1/projects/budget/cbs')
      .set('Authorization', tok(userA1))
      .send({
        cost_code: 'LAB-DIRECT',
        name: 'Direct Site Labour',
        category: 'labour',
      });
    expect(res2.status).toBe(201);
    cbsLab = res2.body.data;

    // Duplicate cost code rejection within same company
    const dupRes = await request(app)
      .post('/api/v1/projects/budget/cbs')
      .set('Authorization', tok(userA1))
      .send({
        cost_code: 'MAT-CIVIL',
        name: 'Duplicate Civil Material',
        category: 'material',
      });
    expect(dupRes.status).toBe(409);
  });

  // ── 2. WBS Creation, Hierarchy & Isolation ────────────────────────────────
  test('creates hierarchical WBS nodes with parent-child levels and code uniqueness', async () => {
    // Root level 1 node
    const rootRes = await request(app)
      .post('/api/v1/projects/budget/wbs')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        wbs_code: '1.0',
        name: 'Substructure Works',
        description: 'Piling and raft foundation',
      });
    expect(rootRes.status).toBe(201);
    expect(rootRes.body.data.level).toBe(1);
    const rootNode = rootRes.body.data;

    // Child level 2 node
    const childRes = await request(app)
      .post('/api/v1/projects/budget/wbs')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        parent_id: rootNode.id,
        wbs_code: '1.1',
        name: 'Piling & Earth Excavation',
      });
    expect(childRes.status).toBe(201);
    expect(childRes.body.data.level).toBe(2);
    expect(childRes.body.data.parent_id).toBe(rootNode.id);

    // Duplicate WBS code in same project rejected
    const dupCode = await request(app)
      .post('/api/v1/projects/budget/wbs')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        wbs_code: '1.0',
        name: 'Conflicting Substructure',
      });
    expect(dupCode.status).toBe(409);

    // Cross-project parent assignment rejected
    const crossProjRes = await request(app)
      .post('/api/v1/projects/budget/wbs')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        parent_id: 99999,
        wbs_code: '1.2',
        name: 'Invalid Parent Test',
      });
    expect(crossProjRes.status).toBe(400);

    // Cross-tenant access rejected
    const tenantBRes = await request(app)
      .get(`/api/v1/projects/budget/wbs/project/${projA.id}`)
      .set('Authorization', tok(userB));
    expect(tenantBRes.status).toBe(404);
  });

  // ── 3. Circular Reference Prevention in WBS ──────────────────────────────
  test('rejects circular parent-child assignment in WBS hierarchy', async () => {
    // Create chain: A (root) -> B (child) -> C (grandchild)
    const nA = await db.wbs.create({
      company_id: companyA.id,
      project_id: projA.id,
      wbs_code: '2.0',
      name: 'Superstructure',
      level: 1,
    });
    const nB = await db.wbs.create({
      company_id: companyA.id,
      project_id: projA.id,
      parent_id: nA.id,
      wbs_code: '2.1',
      name: 'Column Framing',
      level: 2,
    });
    const nC = await db.wbs.create({
      company_id: companyA.id,
      project_id: projA.id,
      parent_id: nB.id,
      wbs_code: '2.1.1',
      name: 'Formwork & Rebar',
      level: 3,
    });

    // Attempt to set node A's parent to node C (ancestor beneath descendant)
    const circRes = await request(app)
      .put(`/api/v1/projects/budget/wbs/${nA.id}`)
      .set('Authorization', tok(userA1))
      .send({ parent_id: nC.id });

    expect(circRes.status).toBe(400);
    expect(circRes.body.message).toMatch(/circular reference/i);

    // Attempt to set self as parent
    const selfRes = await request(app)
      .put(`/api/v1/projects/budget/wbs/${nA.id}`)
      .set('Authorization', tok(userA1))
      .send({ parent_id: nA.id });
    expect(selfRes.status).toBe(400);
  });

  // ── 4. BOQ Mapping to WBS & CBS ──────────────────────────────────────────
  test('safely links existing BOQ items to valid WBS nodes and CBS codes', async () => {
    const boq = await db.boq_item.create({
      project_id: projA.id,
      company_id: companyA.id,
      item_code: 'BOQ-CIV-001',
      description: 'M30 Concrete Pouring',
      unit: 'm3',
      estimated_qty: 500,
      unit_rate: 6500,
      total_estimated_amount: 3250000,
    });

    const wbsNode = await db.wbs.findOne({ where: { company_id: companyA.id, project_id: projA.id } });

    const linkRes = await request(app)
      .post('/api/v1/projects/budget/boq/link-wbs')
      .set('Authorization', tok(userA1))
      .send({
        boq_item_id: boq.id,
        wbs_id: wbsNode.id,
        cbs_id: cbsMat.id,
      });

    expect(linkRes.status).toBe(200);
    await boq.reload();
    expect(boq.wbs_id).toBe(wbsNode.id);
    expect(boq.cbs_id).toBe(cbsMat.id);

    // Cross-project WBS assignment rejected
    const wbsB = await db.wbs.create({
      company_id: companyB.id,
      project_id: projB.id,
      wbs_code: '1.0',
      name: 'Beta Port Basin',
    });

    const invalidLink = await request(app)
      .post('/api/v1/projects/budget/boq/link-wbs')
      .set('Authorization', tok(userA1))
      .send({
        boq_item_id: boq.id,
        wbs_id: wbsB.id,
        cbs_id: cbsMat.id,
      });
    expect(invalidLink.status).toBe(400);
  });

  // ── 5. Versioned Budget Creation & Segregation of Duties ──────────────────
  test('creates draft budget revision, enforces segregation of duties on approval, and locks baseline', async () => {
    const wbsNode = await db.wbs.findOne({ where: { company_id: companyA.id, project_id: projA.id } });

    const budgetRes = await request(app)
      .post('/api/v1/projects/budget/budgets')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        change_reason: 'Initial baseline budget based on BOQ estimates',
        lines: [
          {
            wbs_id: wbsNode.id,
            cbs_id: cbsMat.id,
            line_description: 'Concrete & Rebar procurement',
            quantity: 500,
            unit_of_measure: 'm3',
            unit_rate: 6500,
            budgeted_amount: 3250000,
          },
          {
            wbs_id: wbsNode.id,
            cbs_id: cbsLab.id,
            line_description: 'Piling & Pouring Labour',
            budgeted_amount: 500000,
          },
        ],
      });

    expect(budgetRes.status).toBe(201);
    expect(budgetRes.body.data.revision_number).toBe(1);
    expect(Number(budgetRes.body.data.total_budget_amount)).toBe(3750000);
    const budgetId = budgetRes.body.data.id;

    // Segregation of duties: Creator (Alice) cannot approve their own budget
    const selfApprove = await request(app)
      .put(`/api/v1/projects/budget/budgets/${budgetId}/approve`)
      .set('Authorization', tok(userA1));
    expect(selfApprove.status).toBe(403);
    expect(selfApprove.body.message).toMatch(/segregation of duties/i);

    // Second manager (Bob) approves the budget
    const approveRes = await request(app)
      .put(`/api/v1/projects/budget/budgets/${budgetId}/approve`)
      .set('Authorization', tok(userA2));
    expect(approveRes.status).toBe(200);
    expect(approveRes.body.data.status).toBe('approved');

    // Create Revision 2: Must auto-increment revision number and preserve Revision 1
    const rev2Res = await request(app)
      .post('/api/v1/projects/budget/budgets')
      .set('Authorization', tok(userA1))
      .send({
        project_id: projA.id,
        change_reason: 'Scope expansion: additional testing and soil stabilization',
        lines: [
          {
            wbs_id: wbsNode.id,
            cbs_id: cbsMat.id,
            budgeted_amount: 3500000,
          },
        ],
      });

    expect(rev2Res.status).toBe(201);
    expect(rev2Res.body.data.revision_number).toBe(2);
    expect(rev2Res.body.data.preceding_budget_id).toBe(budgetId);

    // Approve Revision 2: Supersedes Revision 1
    const approveRev2 = await request(app)
      .put(`/api/v1/projects/budget/budgets/${rev2Res.body.data.id}/approve`)
      .set('Authorization', tok(userA2));
    expect(approveRev2.status).toBe(200);

    const oldBudget = await db.budget.findByPk(budgetId);
    expect(oldBudget.status).toBe('superseded'); // Historical baseline preserved with superseded status
  });
});
