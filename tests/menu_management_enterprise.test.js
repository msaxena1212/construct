'use strict';
process.env.NODE_ENV = 'test';
process.env.DB_DIALECT = 'sqlite';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret-123';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const db = require('../src/models');
const { MenuRegistryService } = require('../src/core/services/menu_registry.service');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;

jest.setTimeout(60000);

describe('P0 – Admin Menu Management & Left Navigation: All 10 Enterprise Domains', () => {
  let superAdminUser, adminRole, company;
  let regularUser, regularRole;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });

    company = await db.company.create({
      name: 'Zyno Enterprise Infrastructure Ltd',
      email: 'corp@zyno.test',
    });

    // Create Super Admin role and user
    adminRole = await db.role.create({
      name: 'Super Admin',
      type: 'system',
      company_id: company.id,
    });

    superAdminUser = await db.user.create({
      firstname: 'Enterprise',
      lastname: 'Admin',
      email: 'admin@zyno.test',
      company_id: company.id,
      role_id: adminRole.id,
    });

    // Create regular employee role and user
    regularRole = await db.role.create({
      name: 'Site Engineer',
      type: 'custom',
      company_id: company.id,
    });

    regularUser = await db.user.create({
      firstname: 'Site',
      lastname: 'Engineer',
      email: 'engineer@zyno.test',
      company_id: company.id,
      role_id: regularRole.id,
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('1. Canonical Enterprise Menu Registry Seeding & Order', () => {
    it('should seed all 10 canonical domains in exact required order', async () => {
      const seeded = await MenuRegistryService.seedCanonicalMenus(db);
      expect(seeded.topLevelCount).toBe(10);
      expect(seeded.childCount).toBeGreaterThanOrEqual(25);

      const topLevelModules = await db.rbac_module.findAll({
        where: { parentId: null },
        order: [['order', 'ASC']],
      });

      expect(topLevelModules.length).toBe(10);

      const expectedOrder = [
        'Admin',
        'Purchase',
        'Store',
        'Plant & Machinery',
        'Project Management',
        'H.R & Payroll',
        'MIS Admin',
        'Production',
        'Finance & Accounts',
        'Tender & Correspondence',
      ];

      topLevelModules.forEach((mod, idx) => {
        expect(mod.name).toBe(expectedOrder[idx]);
        expect(mod.order).toBe(idx + 1);
        expect(mod.status).toBe(true);
      });
    });

    it('should be idempotent and not duplicate records when re-seeded', async () => {
      await MenuRegistryService.seedCanonicalMenus(db);
      const topLevelModules = await db.rbac_module.findAll({
        where: { parentId: null },
      });
      expect(topLevelModules.length).toBe(10);
    });
  });

  describe('2. Menu Management Admin API (GET, POST, PUT, DELETE)', () => {
    it('GET /api/v1/modules should return all 10 domains with children sorted by order', async () => {
      const res = await request(app)
        .get('/api/v1/modules')
        .set('Authorization', tok(superAdminUser));

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);

      const modules = res.body.data;
      const parents = modules.filter((m) => !m.parentId);
      expect(parents.length).toBe(10);

      // Verify exact order of parents
      const parentNames = parents.map((p) => p.name);
      expect(parentNames).toEqual([
        'Admin',
        'Purchase',
        'Store',
        'Plant & Machinery',
        'Project Management',
        'H.R & Payroll',
        'MIS Admin',
        'Production',
        'Finance & Accounts',
        'Tender & Correspondence',
      ]);
    });

    it('PUT /api/v1/modules/:id should update title, icon, order and status', async () => {
      const purchaseMod = await db.rbac_module.findOne({ where: { name: 'Purchase' } });
      expect(purchaseMod).toBeTruthy();

      const res = await request(app)
        .put(`/api/v1/modules/${purchaseMod.id}`)
        .set('Authorization', tok(superAdminUser))
        .send({
          name: 'Purchase',
          title: 'Procurement & Vendor Hub',
          icon: 'shopping_bag',
          order: 2,
          status: true,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const updated = await db.rbac_module.findByPk(purchaseMod.id);
      expect(updated.title).toBe('Procurement & Vendor Hub');
      expect(updated.icon).toBe('shopping_bag');
    });

    it('PUT /api/v1/modules/:id should toggle status between active and inactive', async () => {
      const storeMod = await db.rbac_module.findOne({ where: { name: 'Store' } });

      // Toggle to false
      let res = await request(app)
        .put(`/api/v1/modules/${storeMod.id}`)
        .set('Authorization', tok(superAdminUser))
        .send({
          status: false,
        });
      expect(res.status).toBe(200);
      let updated = await db.rbac_module.findByPk(storeMod.id);
      expect(updated.status).toBe(false);

      // Toggle back to true
      res = await request(app)
        .put(`/api/v1/modules/${storeMod.id}`)
        .set('Authorization', tok(superAdminUser))
        .send({
          status: true,
        });
      expect(res.status).toBe(200);
      updated = await db.rbac_module.findByPk(storeMod.id);
      expect(updated.status).toBe(true);
    });

    it('PUT /api/v1/modules/:id should reject circular parent assignment (parentId === id)', async () => {
      const adminMod = await db.rbac_module.findOne({ where: { name: 'Admin' } });

      const res = await request(app)
        .put(`/api/v1/modules/${adminMod.id}`)
        .set('Authorization', tok(superAdminUser))
        .send({
          parentId: adminMod.id,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/cannot be its own parent/i);
    });

    it('POST /api/v1/modules should validate parentId existence if provided', async () => {
      const res = await request(app)
        .post('/api/v1/modules')
        .set('Authorization', tok(superAdminUser))
        .send({
          name: 'Ghost Module',
          title: 'Ghost',
          path: 'ghost',
          parentId: 999999, // Non-existent parent
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/parent module/i);
    });

    it('POST /api/v1/modules/reset-canonical should restore canonical hierarchy idempotently', async () => {
      const res = await request(app)
        .post('/api/v1/modules/reset-canonical')
        .set('Authorization', tok(superAdminUser));

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.topLevelCount).toBe(10);
    });

    it('POST /api/v1/modules/reset-canonical should reject non-admin users with 403 Forbidden', async () => {
      const res = await request(app)
        .post('/api/v1/modules/reset-canonical')
        .set('Authorization', tok(regularUser));

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/forbidden/i);
    });
  });

  describe('3. Left Sidebar Rendering API (GET /api/v1/sidebar)', () => {
    it('should return all 10 canonical domains and active children for authenticated Admin', async () => {
      const res = await request(app)
        .get('/api/v1/sidebar')
        .set('Authorization', tok(superAdminUser));

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const modules = res.body.data;
      // Flat list contains both top-level domains and children
      const topLevelDomains = modules.filter(m => !m.parentId);
      expect(topLevelDomains.length).toBe(10);

      const expectedDomains = [
        'Admin',
        'Purchase',
        'Store',
        'Plant & Machinery',
        'Project Management',
        'H.R & Payroll',
        'MIS Admin',
        'Production',
        'Finance & Accounts',
        'Tender & Correspondence',
      ];

      topLevelDomains.forEach((item, idx) => {
        expect(item.name).toBe(expectedDomains[idx]);
        expect(item.order).toBe(idx + 1);
      });

      // Verify that children exist and point to parents
      const children = modules.filter(m => m.parentId);
      expect(children.length).toBeGreaterThanOrEqual(25);
    });

    it('should filter child modules for non-admin based on role permissions while preserving domain access', async () => {
      // Find 'Project Management' domain and its 'Projects Portfolio' child
      const pmDomain = await db.rbac_module.findOne({ where: { name: 'Project Management' } });
      const projChild = await db.rbac_module.findOne({ where: { name: 'Projects Portfolio', parentId: pmDomain.id } });

      // Grant regularRole permission ONLY to projChild
      await db.role_permission.create({
        role_id: regularRole.id,
        module_id: projChild.id,
        can_read: true,
        can_create: false,
        can_update: false,
        can_delete: false,
      });

      const res = await request(app)
        .get('/api/v1/sidebar')
        .set('Authorization', tok(regularUser));

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const modules = res.body.data;
      // regular user should see Project Management because they have child permission
      const pmItem = modules.find((s) => s.id === pmDomain.id);
      expect(pmItem).toBeTruthy();
      expect(pmItem.name).toBe('Project Management');

      // The child module should also be present
      const childItem = modules.find((s) => s.id === projChild.id);
      expect(childItem).toBeTruthy();
      expect(childItem.name).toBe('Projects Portfolio');

      // Should NOT see Admin children because regularRole has no permissions for Admin
      const adminChild = modules.find((s) => s.name === 'Users & Team');
      expect(adminChild).toBeUndefined();
    });

    it('should reject unauthenticated requests to /api/v1/sidebar with 401', async () => {
      const res = await request(app).get('/api/v1/sidebar');
      expect(res.status).toBe(401);
    });
  });
});
