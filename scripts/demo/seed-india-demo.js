#!/usr/bin/env node
'use strict';
/**
 * Demo data for an Indian construction company, for the disposable demo database only.
 *
 * Refuses to run unless DB_TARGET_CLASS=isolated_test, DB_DIALECT=sqlite and DB_STORAGE is a file named
 * *.disposable.sqlite inside the approved _sqlite_work\tests folder. It never touches the canonical or demo files.
 * Every step is attempted on its own; failures are printed at the end so gaps are visible rather than hidden.
 *
 * Usage (after migrations are applied to the disposable file):
 *   node scripts/demo/seed-india-demo.js
 */
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const storage = String(process.env.DB_STORAGE || '');
const allowed = process.env.DB_TARGET_CLASS === 'isolated_test'
  && process.env.DB_DIALECT === 'sqlite'
  && /[\\/]_sqlite_work[\\/]tests[\\/][^\\/]+\.disposable\.sqlite$/i.test(storage)
  && fs.existsSync(storage);
if (!allowed) {
  console.error('SEED_REFUSED: set DB_TARGET_CLASS=isolated_test, DB_DIALECT=sqlite and DB_STORAGE to an existing *.disposable.sqlite under _sqlite_work\\tests.');
  process.exit(1);
}

const ROOT = path.resolve(__dirname, '../..');
const db = require(path.join(ROOT, 'src/models'));
const { MenuRegistryService } = require(path.join(ROOT, 'src/core/services/menu_registry.service'));

// Sequelize silently drops a value whose name is not a column of the model. Record each such value, so the seed
// cannot put a field into the demo data that the application will never read.
const unknownFields = [];
for (const [modelName, M] of Object.entries(db)) {
  if (!M || !M.rawAttributes || typeof M.create !== 'function') continue;
  const originalCreate = M.create.bind(M);
  M.create = (values, options) => {
    const known = new Set(Object.keys(M.rawAttributes));
    const unknown = Object.keys(values || {}).filter((k) => !known.has(k));
    if (unknown.length) unknownFields.push(`${modelName}: ${unknown.join(', ')}`);
    return originalCreate(values, options);
  };
}

const PASSWORD = 'Demo@Sahyadri1';
const TODAY = new Date();
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const hoursAgo = (h) => new Date(Date.now() - h * 3600000);
const outcome = [];

async function step(name, fn) {
  if (process.env.SEED_TRACE) console.error('[seed] ' + name);
  try {
    const result = await fn();
    outcome.push({ name, ok: true });
    return result;
  } catch (err) {
    outcome.push({ name, ok: false, message: err.message });
    return null;
  }
}

/** Sets createdAt on a row. Sequelize does not let createdAt be set through create(), so this is a direct update. */
async function backdate(model, id, when) {
  // Written in the format Sequelize uses for SQLite dates ("YYYY-MM-DD HH:mm:ss.SSS +00:00"); an ISO string is unreadable.
  await db.sequelize.query(`UPDATE ${model} SET createdAt = :when WHERE id = :id`, { replacements: { when: sqlDate(when), id } });
}

/** A date in the text format Sequelize writes and reads for SQLite. */
function sqlDate(d) {
  return new Date(d).toISOString().replace('T', ' ').replace('Z', ' +00:00');
}

async function main() {
  // Disposable file only: relaxed fsync makes the many small inserts quick. Connection-level; nothing is stored in the file.
  await db.sequelize.query('PRAGMA synchronous = OFF');
  // 1. Company, roles and users (tables already exist: the migrations created them)
  const company = await step('company', () =>
    db.company.create({ name: 'Sahyadri Infra Developers Pvt Ltd', email: 'admin@sahyadri-demo.test' }));
  if (!company) throw new Error('company is required for the demo');
  const companyId = company.id;

  await step('canonical menus', () => MenuRegistryService.seedCanonicalMenus(db));
  const modules = await db.rbac_module.findAll();

  const adminRole = await step('admin role', () => db.role.create({ name: 'Administrator', type: 'custom', company_id: companyId }));
  const plannerRole = await step('planner role', () => db.role.create({ name: 'Project Planner', type: 'custom', company_id: companyId }));
  const accountsRole = await step('accounts role', () => db.role.create({ name: 'Accounts', type: 'custom', company_id: companyId }));
  const grant = { can_create: true, can_read: true, can_update: true, can_delete: true };
  for (const role of [adminRole, plannerRole, accountsRole].filter(Boolean)) {
    for (const m of modules) {
      await step(`grant ${role.name} ${m.path || m.name}`, () => db.role_permission.create({ role_id: role.id, module_id: m.id, ...grant }));
    }
  }
  const passwordHash = bcrypt.hashSync(PASSWORD, 8);
  const users = {};
  users.admin = await step('user admin', () => db.user.create({ firstname: 'Anita', lastname: 'Deshmukh', email: 'admin@sahyadri-demo.test', mobile: '9800000001', password: passwordHash, company_id: companyId, role_id: adminRole?.id }));
  users.planner = await step('user planner', () => db.user.create({ firstname: 'Rahul', lastname: 'Kulkarni', email: 'planner@sahyadri-demo.test', mobile: '9800000002', password: passwordHash, company_id: companyId, role_id: plannerRole?.id }));
  users.accounts = await step('user accounts', () => db.user.create({ firstname: 'Sneha', lastname: 'Joshi', email: 'accounts@sahyadri-demo.test', mobile: '9800000003', password: passwordHash, company_id: companyId, role_id: accountsRole?.id }));
  const admin = users.admin;
  if (!admin) throw new Error('admin user is required for the demo');

  // 2. Clients, consultants, skills and store locations
  await step('client', () => db.client_master.create({ company_id: companyId, name: 'Pune Metro Housing Trust' }));
  await step('consultant', () => db.consultant_master.create({ company_id: companyId, name: 'Kale & Partners Architects' }));
  for (const skill of ['Mason', 'Carpenter', 'Bar Bender', 'Electrician', 'Plumber', 'Tile Setter']) {
    await step(`skill ${skill}`, () => db.skill.create({ company_id: companyId, skill_name: skill }));
  }

  // 3. Projects (residential in Pune, highway flyover near Nagpur)
  const p1 = await step('project 1', () => db.project.create({
    name: 'Hinjewadi Skyline Residential Tower', type: 'residential', company_id: companyId,
    address: 'Plot 14, Hinjewadi Phase 2, Pune, Maharashtra 411057', latitude: 18.5912, longitude: 73.7389,
    completion_date: '2027-03-31', budget_total: 45000000, handover_date: '2025-06-30', dlp_months: 12,
  }));
  const p2 = await step('project 2', () => db.project.create({
    name: 'Nagpur Ring Road Flyover Package', type: 'infrastructure', company_id: companyId,
    address: 'Ring Road Junction, Nagpur, Maharashtra 440022', latitude: 21.1458, longitude: 79.0882,
    completion_date: '2027-09-30', budget_total: 30000000, dlp_months: 12,
  }));
  if (!p1 || !p2) throw new Error('both demo projects are required');
  const projects = [p1, p2];

  for (const p of projects) {
    await step(`store ${p.name}`, () => db.store_location.create({ company_id: companyId, project_id: p.id, code: `SITE-${p.id}`, name: `${p.name} site store`, location_type: 'site_store' }));
    await step(`zone ${p.name}`, () => db.project_zone.create({ company_id: companyId, project_id: p.id, zone_type: 'block', code: 'BLK-A', name: 'Block A' }));
    await step(`discipline ${p.name}`, () => db.project_discipline.create({ company_id: companyId, project_id: p.id, code: 'CIV', name: 'Civil' }));
    await step(`phase ${p.name}`, () => db.project_phase.create({ company_id: companyId, project_id: p.id, code: 'PH1', name: 'Phase 1' }));
    await step(`work package ${p.name}`, () => db.project_work_package.create({ company_id: companyId, project_id: p.id, package_code: 'WP-01', name: 'Civil and structure' }));
  }

  // 4. WBS, BOQ and budget (approved revision with heads and allocations)
  const wbs1 = await step('wbs P1', () => db.wbs.create({ company_id: companyId, project_id: p1.id, wbs_code: '1', name: 'Civil and structure', level: 1, status: 'active' }));
  await step('wbs P1.1', () => db.wbs.create({ company_id: companyId, project_id: p1.id, wbs_code: '1.1', name: 'Foundation', parent_id: wbs1?.id || null, level: 2, status: 'active' }));
  await step('wbs P2', () => db.wbs.create({ company_id: companyId, project_id: p2.id, wbs_code: '1', name: 'Flyover structure', level: 1, status: 'active' }));

  const boq = {
    [p1.id]: [
      ['RCC-M30', 'RCC M30 in superstructure', 'cum', 7800, 620],
      ['STEEL-FE500', 'TMT bars Fe500D', 'MT', 72000, 180],
      ['AAC-BLK', 'AAC block masonry 200 mm', 'cum', 4200, 950],
      ['PLASTER', 'Internal plaster 12 mm', 'sqm', 310, 52000],
      ['TILE-VIT', 'Vitrified floor tiles 600x600', 'sqm', 1450, 260000],
    ],
    [p2.id]: [
      ['PILE-600', 'Bored cast-in-situ pile 600 mm dia', 'rm', 9600, 2400],
      ['PIER-RCC', 'RCC pier and pier cap M35', 'cum', 3100, 780],
      ['DECK-PSC', 'Pre-stressed deck girder', 'MT', 2100, 540],
    ],
  };
  const boqRows = {};
  for (const p of projects) {
    boqRows[p.id] = [];
    for (const [code, description, unit, qty, rate] of boq[p.id]) {
      const row = await step(`boq ${code}`, () => db.boq_item.create({
        project_id: p.id, company_id: companyId, item_code: code, description, unit,
        estimated_qty: qty, unit_rate: rate, total_estimated_amount: qty * rate,
      }));
      if (row) boqRows[p.id].push(row);
    }
  }

  const budgetPlan = {
    [p1.id]: { total: 45000000, heads: [['STRUCT', 'Structure', 22500000], ['FIN', 'Finishes', 9000000], ['MEP', 'MEP services', 9000000], ['PRE', 'Preliminaries', 4500000]] },
    [p2.id]: { total: 30000000, heads: [['STRUCT', 'Structure', 20000000], ['PRE', 'Preliminaries', 10000000]] },
  };
  const headsByProject = {};
  for (const p of projects) {
    const plan = budgetPlan[p.id];
    const budget = await step(`budget ${p.name}`, () => db.budget.create({
      company_id: companyId, project_id: p.id, revision_number: 1, status: 'approved',
      total_budget_amount: plan.total, change_reason: 'Approved baseline for the demo',
      created_by: admin.id, approved_by: admin.id, approved_at: new Date(),
    }));
    headsByProject[p.id] = {};
    let order = 1;
    for (const [code, name, amount] of plan.heads) {
      const head = await step(`head ${p.name} ${code}`, () => db.budget_head.create({
        company_id: companyId, project_id: p.id, head_code: code, head_name: name, sort_order: order++, status: 'active', created_by: admin.id,
      }));
      if (head) headsByProject[p.id][code] = head;
      if (budget && head) {
        await step(`allocation ${p.name} ${code}`, () => db.budget_head_allocation.create({
          company_id: companyId, project_id: p.id, budget_id: budget.id, budget_head_id: head.id, allocated_amount: amount,
        }));
      }
    }
  }

  // 5. Milestones with dates and progress (drive earned value and the schedule view)
  const milestones = {
    [p1.id]: [
      ['Site preparation and foundations', '2025-01-10', '2025-06-30', 100],
      ['Superstructure (G+14)', '2025-07-01', '2026-10-31', 70],
      ['MEP rough-in', '2026-03-01', '2026-12-31', 40],
      ['Finishes and handover', '2026-11-01', '2027-03-31', 0],
    ],
    [p2.id]: [
      ['Pile foundation', '2026-01-01', '2026-06-30', 60],
      ['Pier and pier cap', '2026-04-01', '2026-12-31', 30],
      ['Deck slab and finishing', '2027-01-01', '2027-09-30', 0],
    ],
  };
  const msRows = {};
  for (const p of projects) {
    msRows[p.id] = [];
    for (const [name, start, end, progress] of milestones[p.id]) {
      const row = await step(`milestone ${name}`, () => db.milestone.create({ project_id: p.id, name, startDate: start, endDate: end, progress, status: progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started' }));
      if (row) msRows[p.id].push(row);
    }
  }

  // 6. Tasks
  const tasks = [
    [p1.id, 'Pour level 9 slab, pour card approved', 1, 'In Progress', 60],
    [p1.id, 'Install MEP risers, floors 4 to 6', 2, 'In Progress', 35],
    [p1.id, 'Finalise floor tile sample approval', 3, 'To Do', 0],
    [p2.id, 'Complete pile load test on P-12', 0, 'Completed', 100],
    [p2.id, 'Cast pier cap P-7 reinforcement check', 1, 'In Progress', 45],
  ];
  for (const [projectId, title, msIndex, status, progress] of tasks) {
    const ms = msRows[projectId]?.[msIndex];
    await step(`task ${title}`, () => db.project_task.create({
      project_id: projectId, milestone_id: ms?.id || null, title, status, progress, created_by: admin.id,
      due_date: new Date(Date.now() + 14 * 86400000),
    }));
  }

  // 7. Vendors (subcontractors and suppliers) with GSTIN and PAN. One is unregistered, so compliance has a flag to show.
  const vendorSpecs = [
    ['Sahyadri Civil Works Pvt Ltd', 'Ramesh Patil', '9800000011', '27AAACS1234F1Z5', 'AAACS1234F', 'Civil and RCC'],
    ['Deccan MEP Engineers LLP', 'Vikram Shinde', '9800000012', '27AABCD5678E1Z2', 'AABCD5678E', 'MEP services'],
    ['Maratha Steel Fabricators', 'Sanjay More', '9800000013', null, 'AAGCM2345K', 'Steel fabrication'],
    ['Konkan Finishing and Interiors', 'Priya Naik', '9800000014', '27AAFCK9012L1Z8', 'AAFCK9012L', 'Finishes'],
  ];
  const vendors = [];
  for (const [name, spoc, phone, gst, pan, skill] of vendorSpecs) {
    const v = await step(`vendor ${name}`, () => db.vendors.create({
      name, spoc_name: spoc, spoc_phone: phone, official_email: `${name.split(' ')[0].toLowerCase()}@vendors.sahyadri-demo.test`,
      official_phone: phone, physical_address: 'Pune, Maharashtra', pincode: '411057', skill, gst_no: gst, pan_card_no: pan, company_id: companyId,
    }));
    if (v) vendors.push(v);
  }
  const [civil, mep, steel, finish] = vendors;
  for (const v of vendors) {
    await step(`labour roster ${v.name}`, () => db.vendors_labor.create({ vendor_id: v.id, company_id: companyId, skill: v.skill, count: 12 }));
  }

  // 8. Measurement books and subcontractor RA bills (retention 5%, TDS 2%, GST shown by the India check)
  const mb1 = await step('MB P1 civil', () => db.measurement_book.create({ company_id: companyId, project_id: p1.id, mb_number: 'MB-P1-001', title: 'Superstructure RCC, level 1 to 8', measurement_date: '2026-09-30', status: 'certified' }));
  const raBill1 = await step('RA bill 1 civil', async () => {
    const gross = 850000;
    const retention = Math.round(gross * 0.05);
    const tds = Math.round(gross * 0.02);
    const bill = await db.contractor_ra_bill.create({
      ra_bill_number: 'RA-P1-001', company_id: companyId, project_id: p1.id, vendor_id: civil?.id,
      billing_period_start: '2026-08-01', billing_period_end: '2026-08-31', previous_cumulative_amount: 0,
      current_period_gross_amount: gross, cumulative_gross_amount: gross, retention_rate_pct: 5, retention_amount: retention,
      tds_rate_pct: 2, tds_amount: tds, other_deductions_amount: 0, net_payable_amount: gross - retention - tds,
      status: 'approved', prepared_by: users.planner?.id, approved_by: admin.id, approved_at: new Date(),
    });
    if (mb1 && boqRows[p1.id][0]) {
      await db.measurement_book_item.create({
        mb_id: mb1.id, company_id: companyId, project_id: p1.id, boq_item_id: boqRows[p1.id][0].id,
        work_description: 'RCC M30 level 1 to 8', measured_qty: 1370, unit: 'cum', contract_rate: 620, measured_amount: 849400,
        certified_qty: 1370, certified_amount: 849400, status: 'certified', budget_head_id: headsByProject[p1.id].STRUCT?.id || null, ra_bill_id: bill.id,
      });
    }
    return bill;
  });
  const raBill2 = await step('RA bill 2 MEP (awaiting approval)', async () => {
    const gross = 600000;
    const bill = await db.contractor_ra_bill.create({
      ra_bill_number: 'RA-P1-002', company_id: companyId, project_id: p1.id, vendor_id: mep?.id,
      billing_period_start: '2026-10-01', billing_period_end: '2026-10-31', previous_cumulative_amount: 0,
      current_period_gross_amount: gross, cumulative_gross_amount: gross, retention_rate_pct: 5, retention_amount: 30000,
      tds_rate_pct: 2, tds_amount: 12000, other_deductions_amount: 0, net_payable_amount: 558000,
      status: 'submitted', prepared_by: users.planner?.id,
    });
    await backdate('CONTRACTOR_RA_BILLS', bill.id, hoursAgo(60));
    return bill;
  });
  if (raBill2) {
    await step('RA bill 2 MB item', () => db.measurement_book_item.create({
      mb_id: mb1?.id, company_id: companyId, project_id: p1.id, boq_item_id: boqRows[p1.id][2]?.id || boqRows[p1.id][0].id,
      work_description: 'MEP conduit and chase, levels 4 to 6', measured_qty: 1, unit: 'lot', contract_rate: 600000, measured_amount: 600000,
      certified_qty: 1, certified_amount: 600000, status: 'submitted', budget_head_id: headsByProject[p1.id].MEP?.id || null, ra_bill_id: raBill2.id,
    }));
  }
  void raBill1;

  // 9. Vendor invoices and payment requests (one waiting for approval for two days, one approved)
  const inv1 = await step('invoice civil', () => db.vendors_invoice.create({
    company_id: companyId, vendor_id: civil?.id, project_id: p1.id, invoice_number: 'SCW/2026/0801', invoice_date: '2026-09-02',
    grand_total: 1003000, items: [], status: 'Pending',
  }));
  const inv2 = await step('invoice MEP', () => db.vendors_invoice.create({
    company_id: companyId, vendor_id: mep?.id, project_id: p1.id, invoice_number: 'DME/2026/0422', invoice_date: '2026-10-05',
    grand_total: 708000, items: [], status: 'Approved',
  }));
  if (inv1) {
    const pr = await step('payment request civil (pending)', () => db.vendors_payment_request.create({
      company_id: companyId, vendor_id: civil.id, invoice_id: inv1.id, project_id: p1.id, amount: 1003000, mode: 'Bank Transfer',
      status: 'pending_approval', requested_by: users.planner?.id,
    }));
    if (pr) await backdate('VENDORS_PAYMENT_REQUEST', pr.id, hoursAgo(60));
  }
  if (inv2) {
    await step('payment request MEP (approved)', () => db.vendors_payment_request.create({
      company_id: companyId, vendor_id: mep.id, invoice_id: inv2.id, project_id: p1.id, amount: 708000, mode: 'NEFT',
      status: 'approved', requested_by: users.planner?.id, approved_by: admin.id, approved_at: new Date(),
    }));
  }

  // 10. Purchase orders, goods receipts, quotations
  const po = await step('purchase order steel', () => db.purchase_order.create({
    po_number: 'PO-P1-0045', company_id: companyId, project_id: p1.id, vendor_id: steel?.id, order_date: '2026-09-15',
    items: [{ item_code: 'STEEL-FE500', description: 'TMT bars Fe500D', quantity: 120, unit: 'MT', unit_rate: 72000, amount: 8640000 }],
    status: 'approved',
  }));
  if (po) {
    await step('goods receipt steel', () => db.goods_receipt_note.create({
      grn_number: 'GRN-P1-0112', company_id: companyId, project_id: p1.id, vendor_id: steel.id, purchase_order_id: po.id, receipt_date: '2026-09-20',
      items: [{ item_code: 'STEEL-FE500', description: 'TMT bars Fe500D', received_qty: 120, accepted_qty: 118, rejected_qty: 2, unit_rate: 72000 }],
      status: 'partially_accepted',
    }));
  }
  await step('quotation finishes', () => db.quotation.create({ quotation_number: 'QT-P1-0009', date: '2026-10-18' }));

  // 11. Retention release (the first release is recorded through the service so it follows the DLP rule)
  // Retention is outstanding from RA bill 1 and the DLP for project 1 ended on 2026-06-30, so it is due.

  // 12. Bank guarantees: one expiring in about three weeks, one already past expiry but still active
  await step('BG performance P1', () => db.bank_guarantee.create({
    company_id: companyId, project_id: p1.id, vendor_id: null, bg_type: 'performance', bank_name: 'State Bank of India',
    bg_number: 'SBI-PBG-7781-2024', amount: 2250000, issue_date: '2025-01-05', expiry_date: iso(new Date(Date.now() + 21 * 86400000)), status: 'active',
  }));
  await step('BG retention P2 (past expiry)', () => db.bank_guarantee.create({
    company_id: companyId, project_id: p2.id, vendor_id: null, bg_type: 'retention', bank_name: 'HDFC Bank',
    bg_number: 'HDFC-RBG-3309-2025', amount: 1500000, issue_date: '2025-02-01', expiry_date: '2026-09-30', status: 'active',
  }));

  // 13. Cost ledger: spend ahead of progress on project 1 (CPI below 1), normal spend on project 2
  const costRows = [
    [p1.id, 'STRUCT', 22000000, 'Structure cost to date'],
    [p1.id, 'FIN', 3000000, 'Finishes advance'],
    [p1.id, 'MEP', 2500000, 'MEP materials and labour'],
    [p2.id, 'STRUCT', 11000000, 'Pile and pier cost to date'],
    [p2.id, 'PRE', 3500000, 'Preliminaries to date'],
  ];
  let ledgerSeq = 0;
  for (const [projectId, code, amount, label] of costRows) {
    ledgerSeq += 1;
    await step(`cost ${label}`, () => db.cost_ledger.create({
      company_id: companyId, project_id: projectId, cost_category: 'subcontractor', source_type: 'DEMO_SEED', source_id: ledgerSeq,
      source_line_identifier: label, recognition_date: '2026-10-31', amount, budget_head_id: headsByProject[projectId][code]?.id || null,
      idempotency_key: `DEMO-SEED-COST-${ledgerSeq}`, reason: label, posted_by: admin.id,
    }));
  }

  // 14. Labour attendance (daily, by trade)
  for (const [projectId, trade, count] of [[p1.id, 'Mason', 38], [p1.id, 'Carpenter', 22], [p1.id, 'Bar Bender', 16], [p2.id, 'Mason', 24]]) {
    await step(`attendance ${trade} ${projectId}`, () => db.labour_attendance.create({
      project_id: projectId, company_id: companyId, attendance_date: '2026-11-06', trade_type: trade, headcount: count,
    }));
  }

  // 15. Daily progress reports with work items
  const dpr = await step('DPR P1 2026-11-06', () => db.dpr.create({
    project_id: p1.id, company_id: companyId, report_date: '2026-11-06', weather_summary: 'Clear', created_by: users.planner?.id,
    work_summary: 'Level 9 shuttering completed; pour scheduled for Monday. Two MEP shafts blocked by a pending drawing revision.',
    total_workforce_count: 80, status: 'submitted',
  }));
  if (dpr) {
    await step('DPR work item', () => db.dpr_work_item.create({ dpr_id: dpr.id, description: 'Shuttering level 9 slab', quantity_executed: 1, unit: 'lot', progress_percentage: 60 }));
  }

  // 16. Snags (quality defects) and drawings
  for (const [title, severity] of [['Honeycombing at column C-4, level 7', 'high'], ['Plaster crack near lift lobby, level 3', 'medium'], ['Door frame out of plumb, flat 402', 'low']]) {
    await step(`snag ${title}`, () => db.snag_item.create({ project_id: p1.id, company_id: companyId, title, severity, status: 'open' }));
  }
  for (const [no, title] of [['AR-101', 'Ground floor plan'], ['ST-210', 'Level 9 slab reinforcement'], ['MEP-330', 'Riser layout floors 4 to 6']]) {
    await step(`drawing ${no}`, () => db.drawing_register.create({ project_id: p1.id, company_id: companyId, drawing_number: no, title, file_url: `https://files.sahyadri-demo.test/drawings/${no}.pdf`, revision: 'C', status: 'Approved' }));
  }

  // 17. Variation order (priced change, pending approval)
  const vo = await step('variation order', () => db.variation_order.create({
    variation_number: 'VO-P1-03', company_id: companyId, project_id: p1.id, title: 'Additional waterproofing to terraces',
    description: 'Client requested a second membrane layer on terraces.', created_by: admin.id,
  }));
  if (vo) {
    await step('variation item', () => db.variation_order_item.create({ variation_order_id: vo.id, company_id: companyId, project_id: p1.id, description: 'Second membrane layer', proposed_delta_qty: 1450, unit: 'sqm', proposed_rate: 210, proposed_delta_amount: 304500 }));
  }

  // 18. Meetings and project documents
  await step('meeting weekly coordination', () => db.meeting.create({ title: 'Weekly coordination, Hinjewadi', date: '2026-11-05', company_id: companyId, project_id: p1.id, description: 'Tile sample and MEP shaft clash to be resolved this week.' }));
  await step('document contract', () => db.project_document.create({ name: 'Main construction contract, Hinjewadi', url: 'https://files.sahyadri-demo.test/docs/contract-p1.pdf', project_id: p1.id }));

  // 19. Stock (site materials and equipment)
  await step('material master steel', () => db.material_master.create({ name: 'TMT bar Fe500D 12 mm', sku: 'MAT-TMT-12', company_id: companyId, category: 'Reinforcement steel' }));
  await step('material project stock steel', () => db.material_project_stock.create({ name: 'TMT bar Fe500D 12 mm', sku: 'MAT-TMT-12', company_id: companyId, project_id: p1.id, stockIn: 118, stockUsed: 96, unit_of_measure: 'tonne' }));
  await step('material project stock cement', () => db.material_project_stock.create({ name: 'OPC 53 grade cement', sku: 'MAT-OPC-53', company_id: companyId, project_id: p1.id, stockIn: 2400, stockUsed: 1870, unit_of_measure: 'bags' }));
  await step('equipment master tower crane', () => db.equipment_master.create({ name: 'Tower crane 50 m jib', sku: 'EQP-TC-50', company_id: companyId }));
  await step('equipment project stock concrete pump', () => db.equipment_project_stock.create({ name: 'Concrete pump 36 m', sku: 'EQP-CP-36', company_id: companyId, project_id: p1.id }));
  await step('stock ledger receipt', () => db.stock_ledger.create({ company_id: companyId, project_id: p1.id, movement_type: 'receipt', quantity: 118, reason: 'GRN-P1-0112' }));

  // 20. Summary
  const failed = outcome.filter((o) => !o.ok);
  console.log(JSON.stringify({
    company_id: companyId,
    projects: projects.map((p) => ({ id: p.id, name: p.name })),
    logins: [
      { role: 'Administrator', email: 'admin@sahyadri-demo.test' },
      { role: 'Project Planner', email: 'planner@sahyadri-demo.test' },
      { role: 'Accounts', email: 'accounts@sahyadri-demo.test' },
    ],
    password_note: 'The demo password is set in scripts/demo/seed-india-demo.js (PASSWORD constant).',
    steps_ok: outcome.length - failed.length,
    steps_failed: failed.length,
    unknown_fields: unknownFields,
    failures: failed,
  }, null, 2));
}

main()
  .then(() => db.sequelize.close())
  .catch(async (err) => {
    console.error('SEED_FAILED', err.message);
    await db.sequelize.close();
    process.exit(1);
  });
