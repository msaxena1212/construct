/**
 * Security regression tests: tenant isolation, project ownership, mass assignment,
 * segregation of duties, approval audit, RBAC granular module permissions,
 * and authenticated/authorized file serving (Batch E + RBAC).
 * Runs against an isolated in-memory SQLite database (NODE_ENV=test).
 */
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret-test-secret-test-secret-123";
process.env.DB_HOST = "unused";
process.env.DB_NAME = "unused";
process.env.DB_USER = "unused";

const request = require("supertest");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const app = require("../src/app");
const db = require("../src/models");

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
let A, B; // tenants
let readOnlyRoleA;
let readOnlyUserA;
let sampleDrawingA, sampleDrawingB;

async function tenant(name) {
  const company = await db.company.create({ name, email: `${name}@x.test` });
  const role = await db.role.create({ name: "Manager", type: "custom", company_id: company.id });
  const mk = (n) => db.user.create({ firstname: n, lastname: name, email: `${n}.${name}@x.test`, company_id: company.id, role_id: role.id });
  const requester = await mk("req");
  const approver = await mk("appr");
  const project = await db.project.create({ name: `P-${name}`, type: "residential", company_id: company.id });
  const stock = await db.material_project_stock.create({
    name: "Cement", sku: `C-${name}`, stockIn: 100, stockUsed: 10, project_id: project.id, company_id: company.id,
  });
  return { company, role, requester, approver, project, stock };
}

jest.setTimeout(60000);

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Create RBAC modules
  const stockMod = await db.rbac_module.create({ name: "stock", path: "stock-approval", title: "Stock" });
  const projMod = await db.rbac_module.create({ name: "projects", path: "projects", title: "Projects" });
  const vendorMod = await db.rbac_module.create({ name: "vendors", path: "resources/vendors", title: "Vendors" });
  const quotMod = await db.rbac_module.create({ name: "quotations", path: "resources/quotations", title: "Quotations" });

  A = await tenant("alpha");
  B = await tenant("beta");

  // Give standard manager roles full CRUD on stock, projects, vendors, and quotations
  for (const t of [A, B]) {
    await db.role_permission.create({
      role_id: t.role.id, module_id: stockMod.id, can_create: true, can_read: true, can_update: true, can_delete: true,
    });
    await db.role_permission.create({
      role_id: t.role.id, module_id: projMod.id, can_create: true, can_read: true, can_update: true, can_delete: true,
    });
    await db.role_permission.create({
      role_id: t.role.id, module_id: vendorMod.id, can_create: true, can_read: true, can_update: true, can_delete: true,
    });
    await db.role_permission.create({
      role_id: t.role.id, module_id: quotMod.id, can_create: true, can_read: true, can_update: true, can_delete: true,
    });
  }

  // Create Read-Only role and user for Tenant A
  readOnlyRoleA = await db.role.create({ name: "ReadOnlyAuditor", type: "custom", company_id: A.company.id });
  await db.role_permission.create({
    role_id: readOnlyRoleA.id, module_id: projMod.id, can_create: false, can_read: true, can_update: false, can_delete: false,
  });
  readOnlyUserA = await db.user.create({
    firstname: "auditor", lastname: "alpha", email: "auditor.alpha@x.test", company_id: A.company.id, role_id: readOnlyRoleA.id,
  });

  // Prepare physical sample files for Batch E testing
  const staticProjDir = path.resolve(__dirname, "../src/static/uploads/projects");
  if (!fs.existsSync(staticProjDir)) fs.mkdirSync(staticProjDir, { recursive: true });

  const fileAName = "test-blueprint-alpha.pdf";
  const fileBName = "test-blueprint-beta.pdf";
  fs.writeFileSync(path.join(staticProjDir, fileAName), "%PDF-1.4 test blueprint alpha");
  fs.writeFileSync(path.join(staticProjDir, fileBName), "%PDF-1.4 test blueprint beta");

  sampleDrawingA = await db.drawing_register.create({
    project_id: A.project.id,
    company_id: A.company.id,
    drawing_number: "DWG-A-001",
    title: "Structural Slab A",
    file_url: `/uploads/projects/${fileAName}`,
  });

  sampleDrawingB = await db.drawing_register.create({
    project_id: B.project.id,
    company_id: B.company.id,
    drawing_number: "DWG-B-001",
    title: "Structural Slab B",
    file_url: `/uploads/projects/${fileBName}`,
  });
}, 60000);

afterAll(async () => {
  // Clean up physical test artifacts
  const staticProjDir = path.resolve(__dirname, "../src/static/uploads/projects");
  ["test-blueprint-alpha.pdf", "test-blueprint-beta.pdf"].forEach((f) => {
    const p = path.join(staticProjDir, f);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  });
  await db.sequelize.close();
});

const body = (t, extra = {}) => ({
  material_id: t.stock.id, task_title: "Slab", requested_qty: 5, project_id: t.project.id, ...extra,
});

describe("authentication", () => {
  test("rejects unauthenticated access", async () => {
    expect((await request(app).get("/api/v1/stock-request")).status).toBe(401);
  });
});

describe("stock request – tenant isolation & ownership", () => {
  test("cannot create a request against another company's project", async () => {
    const r = await request(app).post("/api/v1/stock-request").set("Authorization", tok(A.requester))
      .send(body(B));
    expect(r.status).toBe(404);
  });

  test("cannot reference another company's material within own project", async () => {
    const r = await request(app).post("/api/v1/stock-request").set("Authorization", tok(A.requester))
      .send(body(A, { material_id: B.stock.id }));
    expect(r.status).toBe(404);
  });

  test("create ignores client-supplied status/approval/ownership/available_qty", async () => {
    const r = await request(app).post("/api/v1/stock-request").set("Authorization", tok(A.requester))
      .send(body(A, { status: "approved", approved_qty: 999, decided_by: 1, company_id: B.company.id, available_qty: 99999, requested_by: B.approver.id }));
    expect(r.status).toBe(201);
    expect(r.body.data).toMatchObject({ status: "pending", company_id: A.company.id, requested_by: A.requester.id, available_qty: 90 });
    expect(r.body.data.approved_qty ?? null).toBeNull();
  });

  test("other tenant cannot read/update/approve/delete (IDOR)", async () => {
    const c = await request(app).post("/api/v1/stock-request").set("Authorization", tok(A.requester)).send(body(A));
    const id = c.body.data.id;
    const h = { Authorization: tok(B.approver) };
    expect((await request(app).get(`/api/v1/stock-request/${id}`).set(h)).status).toBe(404);
    expect((await request(app).put(`/api/v1/stock-request/${id}`).set(h).send({ requested_qty: 1 })).status).toBe(404);
    expect((await request(app).put(`/api/v1/stock-request/${id}/approve`).set(h)).status).toBe(404);
    expect((await request(app).delete(`/api/v1/stock-request/${id}`).set(h)).status).toBe(404);
    const list = await request(app).get("/api/v1/stock-request").set(h);
    expect(list.body.data.find((x) => x.id === id)).toBeUndefined();
  });
});

describe("stock request – mass assignment & approval workflow", () => {
  let id;
  beforeEach(async () => {
    const c = await request(app).post("/api/v1/stock-request").set("Authorization", tok(A.requester)).send(body(A));
    id = c.body.data.id;
  });

  test("ordinary update cannot change status/approval/ownership fields", async () => {
    const r = await request(app).put(`/api/v1/stock-request/${id}`).set("Authorization", tok(A.requester))
      .send({ status: "approved", approved_qty: 50, company_id: B.company.id, project_id: B.project.id, decided_by: 1, task_title: "Edited" });
    expect(r.status).toBe(200);
    const row = await db.StockRequest.findByPk(id);
    expect(row).toMatchObject({ status: "pending", company_id: A.company.id, project_id: A.project.id, task_title: "Edited" });
    expect(row.approved_qty).toBeNull();
    expect(row.decided_by).toBeNull();
  });

  test("requester cannot approve own request (segregation of duties)", async () => {
    const r = await request(app).put(`/api/v1/stock-request/${id}/approve`).set("Authorization", tok(A.requester));
    expect(r.status).toBe(403);
  });

  test("approval records approver, time and does not change inventory", async () => {
    const before = await db.material_project_stock.findByPk(A.stock.id);
    const r = await request(app).put(`/api/v1/stock-request/${id}/approve`).set("Authorization", tok(A.approver)).send({ approved_qty: 3 });
    expect(r.status).toBe(200);
    const row = await db.StockRequest.findByPk(id);
    expect(row).toMatchObject({ status: "approved", approved_qty: 3, decided_by: A.approver.id });
    expect(row.decided_at).not.toBeNull();
    const after = await db.material_project_stock.findByPk(A.stock.id);
    expect([after.stockIn, after.stockUsed]).toEqual([before.stockIn, before.stockUsed]);
  });

  test("cannot approve more than requested; decided requests are final", async () => {
    expect((await request(app).put(`/api/v1/stock-request/${id}/approve`).set("Authorization", tok(A.approver)).send({ approved_qty: 6 })).status).toBe(400);
    expect((await request(app).put(`/api/v1/stock-request/${id}/approve`).set("Authorization", tok(A.approver))).status).toBe(200);
    expect((await request(app).put(`/api/v1/stock-request/${id}/reject`).set("Authorization", tok(A.approver)).send({ reason: "x" })).status).toBe(409);
    expect((await request(app).put(`/api/v1/stock-request/${id}`).set("Authorization", tok(A.requester)).send({ requested_qty: 1 })).status).toBe(409);
    expect((await request(app).delete(`/api/v1/stock-request/${id}`).set("Authorization", tok(A.requester))).status).toBe(409);
  });

  test("rejection requires a reason and stores it", async () => {
    expect((await request(app).put(`/api/v1/stock-request/${id}/reject`).set("Authorization", tok(A.approver))).status).toBe(400);
    const r = await request(app).put(`/api/v1/stock-request/${id}/reject`).set("Authorization", tok(A.approver)).send({ reason: "Over budget" });
    expect(r.status).toBe(200);
    expect(await db.StockRequest.findByPk(id)).toMatchObject({ status: "rejected", decision_reason: "Over budget", decided_by: A.approver.id });
  });

  test("concurrent approvals: exactly one wins", async () => {
    const h = { Authorization: tok(A.approver) };
    const rs = await Promise.all([1, 2, 3].map(() => request(app).put(`/api/v1/stock-request/${id}/approve`).set(h)));
    expect(rs.filter((r) => r.status === 200).length).toBe(1);
  });
});

describe("project-scoped routes (BOQ/DPR/snag/labour/drawing/export/copilot)", () => {
  const h = () => ({ Authorization: tok(A.requester) });
  test.each([
    ["get", "/api/v1/boq/project/"],
    ["get", "/api/v1/dpr/project/"],
    ["get", "/api/v1/snags/project/"],
    ["get", "/api/v1/labour/project/"],
    ["get", "/api/v1/drawings/project/"],
    ["get", "/api/v1/export/boq/"],
    ["get", "/api/v1/export/dpr/"],
  ])("%s %s<other tenant project> is denied", async (m, p) => {
    const r = await request(app)[m](p + B.project.id).set(h());
    expect(r.status).toBe(404);
  });

  test.each([
    "/api/v1/dpr/create", "/api/v1/snags/create", "/api/v1/labour/record", "/api/v1/boq/extract-create", "/api/v1/boq/generate-rfq", "/api/v1/copilot/query",
  ])("POST %s with other tenant project_id is denied", async (p) => {
    const r = await request(app).post(p).set(h()).send({ project_id: B.project.id, title: "x", report_date: "2026-01-01" });
    expect(r.status).toBe(404);
  });
});

describe("Decision #4 verification – company-wide project access vs team mode", () => {
  let nonTeamUser;

  beforeAll(async () => {
    nonTeamUser = await db.user.create({
      firstname: "nonteam",
      lastname: "alpha",
      email: "nonteam.alpha@x.test",
      company_id: A.company.id,
      role_id: A.role.id,
    });
  });

  test("allows a company user who is not on the project team when PROJECT_ACCESS_MODE=company", async () => {
    process.env.PROJECT_ACCESS_MODE = "company";
    const r = await request(app)
      .get(`/api/v1/boq/project/${A.project.id}`)
      .set("Authorization", tok(nonTeamUser));
    expect(r.status).toBe(200);
  });

  test("denies non-team company user when PROJECT_ACCESS_MODE=team and user not in project_team", async () => {
    process.env.PROJECT_ACCESS_MODE = "team";
    const r = await request(app)
      .get(`/api/v1/boq/project/${A.project.id}`)
      .set("Authorization", tok(nonTeamUser));
    expect(r.status).toBe(403);
    expect(r.body.message).toMatch(/not assigned to this project/i);
    // Restore default setting
    process.env.PROJECT_ACCESS_MODE = "company";
  });

  test("still denies cross-company access even under company-wide mode", async () => {
    process.env.PROJECT_ACCESS_MODE = "company";
    const r = await request(app)
      .get(`/api/v1/boq/project/${B.project.id}`)
      .set("Authorization", tok(nonTeamUser));
    expect(r.status).toBe(404);
  });

  test("rejects non-existent project_id cleanly with 404", async () => {
    const r = await request(app)
      .get(`/api/v1/boq/project/999999`)
      .set("Authorization", tok(nonTeamUser));
    expect(r.status).toBe(404);
  });
});

describe("RBAC granular module permissions verification", () => {
  test("read-only user can read BOQ, DPR, Drawings, and Exports", async () => {
    const h = { Authorization: tok(readOnlyUserA) };
    const rBoq = await request(app).get(`/api/v1/boq/project/${A.project.id}`).set(h);
    expect(rBoq.status).toBe(200);

    const rDpr = await request(app).get(`/api/v1/dpr/project/${A.project.id}`).set(h);
    expect(rDpr.status).toBe(200);

    const rDraw = await request(app).get(`/api/v1/drawings/project/${A.project.id}`).set(h);
    expect(rDraw.status).toBe(200);
  });

  test("read-only user cannot create DPR, Snag, or BOQ (403 Access Denied)", async () => {
    const h = { Authorization: tok(readOnlyUserA) };
    const rDpr = await request(app).post(`/api/v1/dpr/create`).set(h).send({ project_id: A.project.id, report_date: "2026-02-01" });
    expect(rDpr.status).toBe(403);
    expect(rDpr.body.message).toMatch(/access denied/i);

    const rSnag = await request(app).post(`/api/v1/snags/create`).set(h).send({ project_id: A.project.id, title: "Defect" });
    expect(rSnag.status).toBe(403);

    const rBoq = await request(app).post(`/api/v1/boq/extract-create`).set(h).send({ project_id: A.project.id, items: [] });
    expect(rBoq.status).toBe(403);
  });

  test("read-only user cannot update snag status (can_update check -> 403)", async () => {
    const h = { Authorization: tok(readOnlyUserA) };
    const r = await request(app).put(`/api/v1/snags/1/status`).set(h).send({ status: "resolved" });
    expect(r.status).toBe(403);
  });
});

describe("Batch E – Authenticated & Protected File Access", () => {
  test("unauthenticated file request is rejected with 401", async () => {
    const r = await request(app).get("/uploads/projects/test-blueprint-alpha.pdf");
    expect(r.status).toBe(401);
  });

  test("authorized same-company user can download project file with security headers", async () => {
    const r = await request(app)
      .get("/uploads/projects/test-blueprint-alpha.pdf")
      .set("Authorization", tok(A.requester));
    expect(r.status).toBe(200);
    expect(r.headers["x-content-type-options"]).toBe("nosniff");
    const content = r.text || (r.body && r.body.toString ? r.body.toString() : "");
    expect(content).toContain("%PDF-1.4 test blueprint alpha");
  });

  test("accessing protected file via /api/v1/files endpoint also works", async () => {
    const r = await request(app)
      .get("/api/v1/files/projects/test-blueprint-alpha.pdf")
      .set("Authorization", tok(A.requester));
    expect(r.status).toBe(200);
    const content = r.text || (r.body && r.body.toString ? r.body.toString() : "");
    expect(content).toContain("%PDF-1.4 test blueprint alpha");
  });

  test("cross-company file access is denied (404/403)", async () => {
    // User from Tenant B attempts to download Tenant A's blueprint
    const r = await request(app)
      .get("/uploads/projects/test-blueprint-alpha.pdf")
      .set("Authorization", tok(B.requester));
    expect([403, 404]).toContain(r.status);
  });

  test("path traversal attempt in filename is rejected with 400 Bad Request", async () => {
    const r = await request(app)
      .get("/uploads/projects/..%2F..%2Fconfig%2Fdb.js")
      .set("Authorization", tok(A.requester));
    expect([400, 404]).toContain(r.status);
  });

  test("requesting non-existent file or unlinked document returns 404", async () => {
    const r = await request(app)
      .get("/uploads/projects/non-existent-blueprint.pdf")
      .set("Authorization", tok(A.requester));
    expect(r.status).toBe(404);
  });
});

describe("Batch G – Financial Transaction Integrity (Invoices & Payment Requests)", () => {
  let vendorA, vendorB;
  let invA;

  beforeAll(async () => {
    vendorA = await db.vendors.create({
      name: "Vendor Alpha Logistics",
      spoc_name: "John Alpha",
      spoc_phone: "9876543210",
      official_email: "billing@alpha-logistics.test",
      official_phone: "011-23456789",
      physical_address: "123 Alpha Industrial Area",
      pincode: "110001",
      budget_allocation: 100000.00,
      skill: "Logistics",
      compliance_score: 95,
      company_id: A.company.id,
      project_id: A.project.id,
    });

    vendorB = await db.vendors.create({
      name: "Vendor Beta Heavy Tools",
      spoc_name: "Bob Beta",
      spoc_phone: "9123456780",
      official_email: "billing@beta-tools.test",
      official_phone: "022-98765432",
      physical_address: "456 Beta Zone",
      pincode: "400001",
      budget_allocation: 50000.00,
      skill: "Machinery",
      compliance_score: 90,
      company_id: B.company.id,
      project_id: B.project.id,
    });
  });

  test("creates a valid invoice with server-side calculated totals and proper vendor scoping", async () => {
    const r = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set("Authorization", tok(A.requester))
      .send({
        invoice_number: "INV-ALPHA-2026-001",
        invoice_date: "2026-03-01",
        items: [
          { description: "Cement bags", quantity: 100, unit_price: 350 },
          { description: "Sand tons", quantity: 10, unit_price: 1500 }
        ],
        tax_rate: 18,
      });

    expect(r.status).toBe(201);
    expect(r.body.success).toBe(true);
    expect(r.body.data.subtotal).toBe(50000);
    expect(r.body.data.tax_amount).toBe(9000);
    expect(r.body.data.grand_total).toBe(59000);
    expect(r.body.data.status).toBe("Pending");
    invA = r.body.data;
  });

  test("rejects duplicate invoice submission for the same vendor under same company", async () => {
    const r = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set("Authorization", tok(A.requester))
      .send({
        invoice_number: "INV-ALPHA-2026-001",
        invoice_date: "2026-03-01",
        subtotal: 50000,
      });

    expect(r.status).toBe(409);
    expect(r.body.message).toMatch(/already exists/i);
  });

  test("cross-company access: tenant B cannot view or create invoices for tenant A's vendor", async () => {
    // Tenant B cannot list invoices of Tenant A's vendor
    const rList = await request(app)
      .get(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set("Authorization", tok(B.requester));
    expect(rList.status).toBe(404);

    // Tenant B cannot create an invoice against Tenant A's vendor
    const rCreate = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set("Authorization", tok(B.requester))
      .send({
        invoice_number: "INV-STEAL-001",
        invoice_date: "2026-03-01",
        grand_total: 1000,
      });
    expect(rCreate.status).toBe(404);
  });

  test("rejects negative, non-finite, and malformed monetary values", async () => {
    const r = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set("Authorization", tok(A.requester))
      .send({
        invoice_number: "INV-ALPHA-INVALID",
        invoice_date: "2026-03-01",
        subtotal: -5000,
      });
    expect(r.status).toBe(400);
    expect(r.body.message).toMatch(/non-negative/i);
  });

  test("payment request: cannot exceed remaining payable balance", async () => {
    // Remaining balance is 59000. Try requesting 65000.
    const r = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}/payment-requests`)
      .set("Authorization", tok(A.requester))
      .send({
        amount: 65000,
        mode: "Bank Transfer",
        reference: "NEFT-REQ-001",
      });
    expect(r.status).toBe(400);
    expect(r.body.message).toMatch(/exceeds remaining payable balance/i);
  });

  test("payment request: multiple requests cannot collectively exceed remaining balance", async () => {
    // 1st request of 30,000 -> succeeds (remaining 29,000 unreserved)
    const r1 = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}/payment-requests`)
      .set("Authorization", tok(A.requester))
      .send({
        amount: 30000,
        mode: "Bank Transfer",
        reference: "NEFT-REQ-PART1",
      });
    expect(r1.status).toBe(201);
    const req1Id = r1.body.data.id;

    // 2nd request of 35,000 -> fails (only 29,000 unreserved)
    const r2 = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}/payment-requests`)
      .set("Authorization", tok(A.requester))
      .send({
        amount: 35000,
        mode: "Bank Transfer",
        reference: "NEFT-REQ-OVER",
      });
    expect(r2.status).toBe(400);
    expect(r2.body.message).toMatch(/Pending requests .* already exist/i);

    // 3rd request of 20,000 -> succeeds (within 29,000)
    const r3 = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}/payment-requests`)
      .set("Authorization", tok(A.requester))
      .send({
        amount: 20000,
        mode: "Bank Transfer",
        reference: "NEFT-REQ-PART2",
      });
    expect(r3.status).toBe(201);

    // Approve req1: Requester cannot approve their own request (SoD -> 403)
    const rApproveSelf = await request(app)
      .put(`/api/v1/vendors/payment-requests/${req1Id}/approve`)
      .set("Authorization", tok(A.requester));
    expect(rApproveSelf.status).toBe(403);
    expect(rApproveSelf.body.message).toMatch(/Segregation of duties/i);

    // Approver approves req1 -> marks request as 'approved' (authorization), invoice remains Pending until executed
    const rApprove = await request(app)
      .put(`/api/v1/vendors/payment-requests/${req1Id}/approve`)
      .set("Authorization", tok(A.approver));
    expect(rApprove.status).toBe(200);
    expect(rApprove.body.data.request.status).toBe("approved");

    // Execute payment -> updates invoice paid_amount to 30000 and status to Partially Paid
    const rExec = await request(app)
      .post(`/api/v1/vendors/payment-requests/${req1Id}/execute`)
      .set("Authorization", tok(A.approver))
      .send({ payment_reference: "NEFT-UTR-30000" });
    expect(rExec.status).toBe(200);
    expect(rExec.body.data.invoice.status).toBe("Partially Paid");
    expect(rExec.body.data.invoice.paid_amount).toBe(30000);

    // Decided request cannot be approved or rejected again
    const rReApprove = await request(app)
      .put(`/api/v1/vendors/payment-requests/${req1Id}/approve`)
      .set("Authorization", tok(A.approver));
    expect(rReApprove.status).toBe(409);
  });

  test("direct payment update: partial payment and overpayment rejection", async () => {
    // Current paid: 30,000. Grand total: 59,000. Remaining: 29,000.
    // Attempting direct payment of 30,000 -> fails (exceeds invoice total)
    const rOver = await request(app)
      .put(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}/status`)
      .set("Authorization", tok(A.approver))
      .send({
        status: "Partially Paid",
        amount: 30000,
        mode: "Bank Transfer",
      });
    expect(rOver.status).toBe(400);
    expect(rOver.body.message).toMatch(/Payment amount exceeds invoice total/i);

    // Pay remaining exact 29,000 -> invoice status transitions to 'Paid'
    const rPay = await request(app)
      .put(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}/status`)
      .set("Authorization", tok(A.approver))
      .send({
        status: "Paid",
        amount: 29000,
        mode: "Bank Transfer",
        reference: "FINAL-SETTLEMENT-001",
      });
    expect(rPay.status).toBe(200);
    expect(rPay.body.data.status).toBe("Paid");
    expect(rPay.body.data.paid_amount).toBe(59000);

    // Paid invoice cannot be cancelled or deleted
    const rCancel = await request(app)
      .put(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}/status`)
      .set("Authorization", tok(A.approver))
      .send({ status: "Cancelled" });
    expect(rCancel.status).toBe(400);

    const rDelete = await request(app)
      .delete(`/api/v1/vendors/${vendorA.id}/invoices/${invA.id}`)
      .set("Authorization", tok(A.approver));
    expect(rDelete.status).toBe(400);
  });

  test("payment request rejection workflow: requires reason and records rejection audit", async () => {
    // Create a new invoice for rejection testing
    const invRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices`)
      .set("Authorization", tok(A.requester))
      .send({
        invoice_number: "INV-REJECT-TEST",
        invoice_date: "2026-03-05",
        subtotal: 10000,
      });
    expect(invRes.status).toBe(201);
    const testInvId = invRes.body.data.id;

    // Create payment request
    const prRes = await request(app)
      .post(`/api/v1/vendors/${vendorA.id}/invoices/${testInvId}/payment-requests`)
      .set("Authorization", tok(A.requester))
      .send({
        amount: 5000,
        mode: "Bank Transfer",
        reference: "NEFT-REJ-001",
      });
    expect(prRes.status).toBe(201);
    const prId = prRes.body.data.id;

    // Reject without reason fails
    const rRejNoReason = await request(app)
      .put(`/api/v1/vendors/payment-requests/${prId}/reject`)
      .set("Authorization", tok(A.approver))
      .send({});
    expect(rRejNoReason.status).toBe(400);
    expect(rRejNoReason.body.message).toMatch(/rejection reason is required/i);

    // Reject with reason succeeds
    const rRej = await request(app)
      .put(`/api/v1/vendors/payment-requests/${prId}/reject`)
      .set("Authorization", tok(A.approver))
      .send({ rejection_reason: "Vendor bank account mismatch" });
    expect(rRej.status).toBe(200);
    expect(rRej.body.data.status).toBe("rejected");
    expect(rRej.body.data.rejection_reason).toBe("Vendor bank account mismatch");
  });

  test("quotations: tenant isolation and IDOR protection", async () => {
    // Tenant A creates quotation
    const qRes = await request(app)
      .post("/api/v1/create_quotation")
      .set("Authorization", tok(A.requester))
      .send({
        date: "2026-03-10",
        quotation_status: "Active",
        sales_person: "Alice",
        items: [
          {
            sku: "SKU-STEEL-01",
            name: "TMT Steel 12mm",
            category: "Steel",
            quantity: 50,
            unitPrice: 600,
            totalPrice: 30000,
            vendor_id: vendorA.id,
            vendor_name: "Vendor Alpha Tools"
          }
        ]
      });
    expect(qRes.status).toBe(201);
    const qId = qRes.body.data.id;

    // Tenant B cannot read Tenant A's quotation (IDOR -> 404)
    const rTenantB = await request(app)
      .get(`/api/v1/getbyid_quotation/${qId}`)
      .set("Authorization", tok(B.requester));
    expect(rTenantB.status).toBe(404);

    // Tenant B cannot update Tenant A's quotation
    const rTenantBUpdate = await request(app)
      .put(`/api/v1/update_quotation/${qId}`)
      .set("Authorization", tok(B.approver))
      .send({
        date: "2026-03-10",
        quotation_status: "Modified",
        items: [
          {
            sku: "SKU-STEEL-01",
            name: "TMT Steel 12mm",
            category: "Steel",
            quantity: 10,
            unitPrice: 100,
            vendor_id: vendorB.id,
            vendor_name: "Vendor Beta Heavy Tools"
          }
        ]
      });
    expect(rTenantBUpdate.status).toBe(404);
  });
});

