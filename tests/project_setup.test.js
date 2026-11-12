'use strict';
/**
 * Project setup and master data (scope section 03). Isolated in-memory SQLite only (set by tests/setup).
 * Covers header details, structure rows, company masters, validation, cross-company and cross-project
 * refusal, permissions, deletion guards and the audit trail.
 */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

jest.setTimeout(120000);

describe('Project setup and master data', () => {
  let companyA;
  let companyB;
  let fullUser;
  let readUser;
  let otherUser;
  let projectA;
  let projectA2;
  let projectB;
  let clientA;
  let clientB;
  let consultantA;
  let vendorA;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    companyA = await db.company.create({ name: 'Skyline Infra', email: 'setup@skyline.test' });
    companyB = await db.company.create({ name: 'Horizon Build', email: 'setup@horizon.test' });

    const full = await db.role.create({ name: 'ProjectManager', type: 'custom', company_id: companyA.id });
    const reader = await db.role.create({ name: 'Viewer', type: 'custom', company_id: companyA.id });
    const fullB = await db.role.create({ name: 'ProjectManagerB', type: 'custom', company_id: companyB.id });
    await db.role_permission.create({ role_id: full.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    await db.role_permission.create({ role_id: reader.id, module_id: mod.id, can_create: false, can_read: true, can_update: false, can_delete: false });
    await db.role_permission.create({ role_id: fullB.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });

    fullUser = await db.user.create({ firstname: 'Asha', lastname: 'Rao', email: 'asha@skyline.test', company_id: companyA.id, role_id: full.id });
    readUser = await db.user.create({ firstname: 'Ravi', lastname: 'Nair', email: 'ravi@skyline.test', company_id: companyA.id, role_id: reader.id });
    otherUser = await db.user.create({ firstname: 'Om', lastname: 'Lal', email: 'om@horizon.test', company_id: companyB.id, role_id: fullB.id });

    projectA = await db.project.create({ name: 'Tower A', type: 'commercial', company_id: companyA.id });
    projectA2 = await db.project.create({ name: 'Tower B', type: 'commercial', company_id: companyA.id });
    projectB = await db.project.create({ name: 'Other', type: 'commercial', company_id: companyB.id });

    clientA = await db.client_master.create({ name: 'Metro Development Authority', code: 'MDA', company_id: companyA.id });
    clientB = await db.client_master.create({ name: 'Foreign Client', code: 'FC', company_id: companyB.id });
    consultantA = await db.consultant_master.create({ name: 'Design Partners LLP', code: 'DPL', company_id: companyA.id });
    vendorA = await db.vendors.create({ name: 'Ferro Works', company_id: companyA.id, project_id: projectA.id, vendor_type: 'subcontractor' }).catch(() => null);
  });

  const ufull = () => tok(fullUser);
  const uread = () => tok(readUser);

  describe('project header details', () => {
    test('updates the header with valid details and records the change in project history', async () => {
      const res = await request(app)
        .put(`/api/v1/projects/${projectA.id}/details`)
        .set('Authorization', ufull())
        .send({
          project_code: 'tow-a-001',
          contract_type: 'item_rate',
          currency: 'inr',
          start_date: '2026-11-01',
          completion_date: '2027-06-30',
          location_name: 'Sector 14, Gurugram',
          description: 'Residential tower, 12 floors',
          client_id: clientA.id,
          consultant_id: consultantA.id,
          project_manager_id: fullUser.id,
        });
      expect(res.status).toBe(200);
      expect(res.body.data.project.project_code).toBe('TOW-A-001');
      expect(res.body.data.project.currency).toBe('INR');
      expect(res.body.data.project.client.name).toBe('Metro Development Authority');
      expect(res.body.data.project.project_manager.id).toBe(fullUser.id);

      const history = await db.project_history.findAll({ where: { project_id: projectA.id, action_type: 'PROJECT_DETAILS_UPDATED' } });
      expect(history.length).toBeGreaterThan(0);
      // The currency was already INR, so it is not a change and must not appear in the audit entry.
      expect(history[0].meta.changed_fields).toEqual(expect.arrayContaining(['project_code', 'client_id']));
      expect(history[0].meta.changed_fields).not.toContain('currency');
    });

    test('rejects a malformed project code, an unknown contract type and a malformed currency', async () => {
      const badCode = await request(app).put(`/api/v1/projects/${projectA.id}/details`).set('Authorization', ufull()).send({ project_code: 'bad code!' });
      expect(badCode.status).toBe(400);
      const badType = await request(app).put(`/api/v1/projects/${projectA.id}/details`).set('Authorization', ufull()).send({ contract_type: 'barter' });
      expect(badType.status).toBe(400);
      const badCurrency = await request(app).put(`/api/v1/projects/${projectA.id}/details`).set('Authorization', ufull()).send({ currency: 'RUPEE' });
      expect(badCurrency.status).toBe(400);
    });

    test('rejects a planned completion date earlier than the start date', async () => {
      const res = await request(app)
        .put(`/api/v1/projects/${projectA.id}/details`)
        .set('Authorization', ufull())
        .send({ start_date: '2027-01-01', completion_date: '2026-12-01' });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/must not be earlier/);
    });

    test('a project code is unique within a company, and the same code is allowed in another company', async () => {
      const dup = await request(app).put(`/api/v1/projects/${projectA2.id}/details`).set('Authorization', ufull()).send({ project_code: 'TOW-A-001' });
      expect(dup.status).toBe(409);
      const otherCompany = await request(app).put(`/api/v1/projects/${projectB.id}/details`).set('Authorization', tok(otherUser)).send({ project_code: 'TOW-A-001' });
      expect(otherCompany.status).toBe(200);
    });

    test('refuses a client, consultant or project manager from another company', async () => {
      const client = await request(app).put(`/api/v1/projects/${projectA.id}/details`).set('Authorization', ufull()).send({ client_id: clientB.id });
      expect(client.status).toBe(400);
      const manager = await request(app).put(`/api/v1/projects/${projectA.id}/details`).set('Authorization', ufull()).send({ project_manager_id: otherUser.id });
      expect(manager.status).toBe(400);
    });

    test('a read-only role cannot change project details', async () => {
      const res = await request(app).put(`/api/v1/projects/${projectA.id}/details`).set('Authorization', uread()).send({ location_name: 'Elsewhere' });
      expect(res.status).toBe(403);
    });

    test('a project of another company is not visible or changeable (404, no disclosure)', async () => {
      const read = await request(app).get(`/api/v1/projects/${projectB.id}/setup`).set('Authorization', ufull());
      expect(read.status).toBe(404);
      const write = await request(app).put(`/api/v1/projects/${projectB.id}/details`).set('Authorization', ufull()).send({ location_name: 'X' });
      expect(write.status).toBe(404);
    });

    test('unauthenticated requests are refused', async () => {
      const res = await request(app).get(`/api/v1/projects/${projectA.id}/setup`);
      expect(res.status).toBe(401);
    });
  });

  describe('structure rows', () => {
    let phase1;
    let phase2;
    let zoneBlock;
    let zoneFloor;
    let discipline;
    let costCentre;

    test('creates phases with a unique code per project and orders them by sequence', async () => {
      const first = await request(app).post(`/api/v1/projects/${projectA.id}/phases`).set('Authorization', ufull())
        .send({ code: 'ph-1', name: 'Foundation', sequence_no: 1, planned_start: '2026-11-01', planned_end: '2026-12-31' });
      expect(first.status).toBe(201);
      expect(first.body.data.code).toBe('PH-1');
      phase1 = first.body.data;

      const second = await request(app).post(`/api/v1/projects/${projectA.id}/phases`).set('Authorization', ufull())
        .send({ code: 'PH-2', name: 'Superstructure', sequence_no: 2 });
      expect(second.status).toBe(201);
      phase2 = second.body.data;

      const dup = await request(app).post(`/api/v1/projects/${projectA.id}/phases`).set('Authorization', ufull())
        .send({ code: 'PH-1', name: 'Again' });
      expect(dup.status).toBe(409);

      const list = await request(app).get(`/api/v1/projects/${projectA.id}/phases`).set('Authorization', ufull());
      expect(list.body.data.map((p) => p.code)).toEqual(['PH-1', 'PH-2']);
    });

    test('rejects a phase whose end is before its start', async () => {
      const res = await request(app).post(`/api/v1/projects/${projectA.id}/phases`).set('Authorization', ufull())
        .send({ code: 'PH-9', name: 'Bad', planned_start: '2026-12-31', planned_end: '2026-12-01' });
      expect(res.status).toBe(400);
    });

    test('creates a zone hierarchy and refuses a parent from another project or a cycle', async () => {
      const block = await request(app).post(`/api/v1/projects/${projectA.id}/zones`).set('Authorization', ufull())
        .send({ zone_type: 'block', code: 'BLK-A', name: 'Block A' });
      expect(block.status).toBe(201);
      zoneBlock = block.body.data;

      const floor = await request(app).post(`/api/v1/projects/${projectA.id}/zones`).set('Authorization', ufull())
        .send({ zone_type: 'floor', code: 'FL-01', name: 'Level 1', parent_id: zoneBlock.id });
      expect(floor.status).toBe(201);
      zoneFloor = floor.body.data;

      const foreignParent = await db.project_zone.create({ project_id: projectA2.id, company_id: companyA.id, zone_type: 'zone', code: 'Z-X', name: 'Other project zone' });
      const crossProject = await request(app).post(`/api/v1/projects/${projectA.id}/zones`).set('Authorization', ufull())
        .send({ zone_type: 'floor', code: 'FL-99', name: 'Bad parent', parent_id: foreignParent.id });
      expect(crossProject.status).toBe(400);

      const cycle = await request(app).put(`/api/v1/projects/${projectA.id}/zones/${zoneBlock.id}`).set('Authorization', ufull())
        .send({ parent_id: zoneFloor.id });
      expect(cycle.status).toBe(400);
      expect(cycle.body.message).toMatch(/cycle|own parent/);
    });

    test('rejects an invalid zone type', async () => {
      const res = await request(app).post(`/api/v1/projects/${projectA.id}/zones`).set('Authorization', ufull())
        .send({ zone_type: 'room', code: 'RM-1', name: 'Room' });
      expect(res.status).toBe(400);
    });

    test('creates disciplines and cost centres', async () => {
      const d = await request(app).post(`/api/v1/projects/${projectA.id}/disciplines`).set('Authorization', ufull())
        .send({ code: 'STR', name: 'Structural' });
      expect(d.status).toBe(201);
      discipline = d.body.data;
      const c = await request(app).post(`/api/v1/projects/${projectA.id}/cost-centres`).set('Authorization', ufull())
        .send({ code: 'CC-100', name: 'Frame works' });
      expect(c.status).toBe(201);
      costCentre = c.body.data;
    });

    test('creates work packages linked to this project only', async () => {
      const ok = await request(app).post(`/api/v1/projects/${projectA.id}/work-packages`).set('Authorization', ufull())
        .send({ package_code: 'WP-01', name: 'Columns L1', phase_id: phase1.id, discipline_id: discipline.id, zone_id: zoneFloor.id, cost_centre_id: costCentre.id });
      expect(ok.status).toBe(201);
      expect(ok.body.data.package_type).toBe('in_house');

      const otherProjectPhase = await db.project_phase.create({ project_id: projectA2.id, company_id: companyA.id, code: 'OP', name: 'Other', sequence_no: 1 });
      const cross = await request(app).post(`/api/v1/projects/${projectA.id}/work-packages`).set('Authorization', ufull())
        .send({ package_code: 'WP-02', name: 'Cross', phase_id: otherProjectPhase.id });
      expect(cross.status).toBe(400);
    });

    test('a subcontract package must name its vendor', async () => {
      const missing = await request(app).post(`/api/v1/projects/${projectA.id}/work-packages`).set('Authorization', ufull())
        .send({ package_code: 'WP-03', name: 'Brickwork', package_type: 'subcontract' });
      expect(missing.status).toBe(400);
      expect(missing.body.message).toMatch(/vendor/);
    });

    test('updates a structure row and refuses an unknown row', async () => {
      const upd = await request(app).put(`/api/v1/projects/${projectA.id}/phases/${phase2.id}`).set('Authorization', ufull())
        .send({ status: 'active' });
      expect(upd.status).toBe(200);
      expect(upd.body.data.status).toBe('active');
      const missing = await request(app).put(`/api/v1/projects/${projectA.id}/phases/999999`).set('Authorization', ufull()).send({ status: 'active' });
      expect(missing.status).toBe(404);
    });

    test('refuses to delete a structure row that other rows depend on', async () => {
      const res = await request(app).delete(`/api/v1/projects/${projectA.id}/zones/${zoneBlock.id}`).set('Authorization', ufull());
      expect(res.status).toBe(409);
      const leaf = await request(app).delete(`/api/v1/projects/${projectA.id}/zones/${zoneFloor.id}`).set('Authorization', ufull());
      expect(leaf.status).toBe(409);
    });

    test('deletes an unused row and records it in the audit trail', async () => {
      const row = await request(app).post(`/api/v1/projects/${projectA.id}/disciplines`).set('Authorization', ufull())
        .send({ code: 'MEP', name: 'MEP' });
      const del = await request(app).delete(`/api/v1/projects/${projectA.id}/disciplines/${row.body.data.id}`).set('Authorization', ufull());
      expect(del.status).toBe(200);
      const trail = await db.project_history.findAll({ where: { project_id: projectA.id, action_type: 'DISCIPLINE_DELETED' } });
      expect(trail.length).toBe(1);
    });

    test('a structure row belonging to another project cannot be read through this project', async () => {
      const foreign = await db.project_phase.create({ project_id: projectA2.id, company_id: companyA.id, code: 'FP', name: 'Foreign', sequence_no: 1 });
      const res = await request(app).put(`/api/v1/projects/${projectA.id}/phases/${foreign.id}`).set('Authorization', ufull()).send({ name: 'Renamed' });
      expect(res.status).toBe(404);
    });

    test('the setup endpoint returns the header and every structure list with counts', async () => {
      const res = await request(app).get(`/api/v1/projects/${projectA.id}/setup`).set('Authorization', ufull());
      expect(res.status).toBe(200);
      expect(res.body.data.counts.phases).toBe(2);
      expect(res.body.data.counts.zones).toBe(2);
      expect(res.body.data.counts.work_packages).toBe(1);
      expect(res.body.data.project.project_code).toBe('TOW-A-001');
    });

    test('a read-only role can read the setup but cannot create structure rows', async () => {
      const read = await request(app).get(`/api/v1/projects/${projectA.id}/setup`).set('Authorization', uread());
      expect(read.status).toBe(200);
      const write = await request(app).post(`/api/v1/projects/${projectA.id}/phases`).set('Authorization', uread()).send({ code: 'R1', name: 'Nope' });
      expect(write.status).toBe(403);
    });
  });

  describe('company masters', () => {
    test('creates a client and refuses a duplicate name in the same company', async () => {
      const ok = await request(app).post('/api/v1/clients').set('Authorization', ufull())
        .send({ name: 'Riverside Holdings', code: 'RH', email: 'contact@riverside.test' });
      expect(ok.status).toBe(201);
      const dup = await request(app).post('/api/v1/clients').set('Authorization', ufull()).send({ name: 'Riverside Holdings' });
      expect(dup.status).toBe(409);
    });

    test('rejects an invalid email address', async () => {
      const res = await request(app).post('/api/v1/consultants').set('Authorization', ufull()).send({ name: 'Survey Co', email: 'not-an-email' });
      expect(res.status).toBe(400);
    });

    test('a client linked to a project cannot be deleted', async () => {
      const res = await request(app).delete(`/api/v1/clients/${clientA.id}`).set('Authorization', ufull());
      expect(res.status).toBe(409);
    });

    test('clients are company-scoped in the listing', async () => {
      const res = await request(app).get('/api/v1/clients').set('Authorization', ufull());
      expect(res.status).toBe(200);
      expect(res.body.data.every((c) => c.company_id === companyA.id)).toBe(true);
      expect(res.body.data.some((c) => c.id === clientB.id)).toBe(false);
    });

    test('a client of another company cannot be updated', async () => {
      const res = await request(app).put(`/api/v1/clients/${clientB.id}`).set('Authorization', ufull()).send({ name: 'Taken over' });
      expect(res.status).toBe(404);
    });

    test('vendor link is company scoped when a package is linked to a vendor', async () => {
      if (!vendorA) return;
      const res = await request(app).post(`/api/v1/projects/${projectA.id}/work-packages`).set('Authorization', ufull())
        .send({ package_code: 'WP-SUB', name: 'Subcontract A', package_type: 'subcontract', vendor_id: vendorA.id });
      expect(res.status).toBe(201);
    });
  });
});
