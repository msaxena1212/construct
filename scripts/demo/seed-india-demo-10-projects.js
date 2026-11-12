#!/usr/bin/env node
'use strict';
/**
 * Adds 10 more Indian construction projects (ids follow the existing two) to the demo database, each with
 * about 25 kinds of linked records (master data, WBS/BOQ/budget, schedule, procurement, billing, site
 * records, quality, stock and cost) so the dashboards and the Copilot have real context to work from.
 *
 * Same guard as seed-india-demo.js: refuses unless DB_TARGET_CLASS=isolated_test, DB_DIALECT=sqlite and
 * DB_STORAGE is an existing *.disposable.sqlite inside _sqlite_work\tests. It never runs twice: it stops if
 * any of the new project codes already exists. Every step is attempted on its own and failures are listed.
 *
 * Usage (Git Bash):
 *   export DB_TARGET_CLASS=isolated_test DB_DIALECT=sqlite DB_STORAGE="E:/Port/Construction/_sqlite_work/tests/<file>.disposable.sqlite"
 *   export DB_HOST= DB_NAME= DB_USER= DB_PASSWORD= DB_PORT=
 *   node scripts/demo/seed-india-demo-10-projects.js
 */
const path = require('path');
const fs = require('fs');

const storage = String(process.env.DB_STORAGE || '');
const allowed = process.env.DB_TARGET_CLASS === 'isolated_test'
  && process.env.DB_DIALECT === 'sqlite'
  && /[\\/]_sqlite_work[\\/]tests[\\/][^\\/]+\.disposable\.sqlite$/i.test(storage)
  && fs.existsSync(storage);
if (!allowed) {
  console.error('SEED_REFUSED: set DB_TARGET_CLASS=isolated_test, DB_DIALECT=sqlite and DB_STORAGE to an existing *.disposable.sqlite under _sqlite_work\\tests.');
  process.exit(1);
}

const db = require(path.resolve(__dirname, '../../src/models'));

const outcome = [];
const counts = {}; // counts[projectCode][category] = rows created
const failures = [];

async function mk(code, category, label, fn) {
  try {
    const row = await fn();
    outcome.push(true);
    counts[code] = counts[code] || {};
    counts[code][category] = (counts[code][category] || 0) + 1;
    return row;
  } catch (err) {
    outcome.push(false);
    failures.push({ project: code, category, label, message: err.message });
    return null;
  }
}

const iso = (d) => new Date(d).toISOString().slice(0, 10);
const addDays = (d, n) => new Date(new Date(d).getTime() + n * 86400000);
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const round = (n) => Math.round(n);
const TODAY = new Date('2026-11-09T00:00:00Z');

// ---------------------------------------------------------------------------------------------------------
// Type libraries: BOQ lines are [code, description, unit, rate (INR), share of project budget]
// ---------------------------------------------------------------------------------------------------------
const { LIB } = require('./lib/india-demo-library');

// ---------------------------------------------------------------------------------------------------------
// The ten projects. budget in INR; progress is overall percent complete; cpi below 1 means spend ahead of progress.
// ---------------------------------------------------------------------------------------------------------
const PROJECTS = [
  { code: 'WFT', name: 'Whitefield Tech Park, Block C', type: 'commercial', lib: 'building', city: 'Bengaluru', state: '29', stateName: 'Karnataka', pin: '560066', address: 'ITPL Main Road, Whitefield, Bengaluru, Karnataka 560066', lat: 12.9698, lng: 77.7500, budget: 820000000, progress: 64, cpi: 0.97, start: '2025-02-01', end: '2027-06-30', status: 'On Track', client: 'Brigade Enterprises Ltd', consultant: 'Sathya Architects and Planners', vendors: ['Karnataka RMC and Civil Works', 'Southern Facade Systems'] },
  { code: 'MCR', name: 'Mumbai Coastal Road Link, Section 4', type: 'infrastructure', lib: 'infra', city: 'Mumbai', state: '27', stateName: 'Maharashtra', pin: '400030', address: 'Worli to Bandra approach, Mumbai, Maharashtra 400030', lat: 19.0176, lng: 72.8157, budget: 2400000000, progress: 48, cpi: 0.91, start: '2025-04-15', end: '2028-03-31', status: 'Delayed', client: 'Brihanmumbai Municipal Corporation', consultant: 'Tandon Urban Infrastructure Consultants', vendors: ['Konkan Marine Piling Pvt Ltd', 'Mahim Precast and Girders'] },
  { code: 'HMD', name: 'Hyderabad Metro Depot, Civil Works', type: 'infrastructure', lib: 'infra', city: 'Hyderabad', state: '36', stateName: 'Telangana', pin: '500039', address: 'Uppal Depot Road, Hyderabad, Telangana 500039', lat: 17.4000, lng: 78.5600, budget: 960000000, progress: 72, cpi: 1.02, start: '2024-11-01', end: '2027-01-31', status: 'On Track', client: 'Hyderabad Metro Rail Authority', consultant: 'Deccan Rail Consultancy', vendors: ['Golconda Earthworks and Roads', 'Telangana Steel Structures'] },
  { code: 'GGN', name: 'Gurugram Sector 82 Group Housing', type: 'residential', lib: 'building', city: 'Gurugram', state: '06', stateName: 'Haryana', pin: '122004', address: 'Sector 82, Gurugram, Haryana 122004', lat: 28.3900, lng: 76.9600, budget: 1100000000, progress: 38, cpi: 0.94, start: '2025-09-01', end: '2028-02-28', status: 'On Track', client: 'Aravali Homes Private Limited', consultant: 'Studio Raman Architects', vendors: ['NCR Shuttering and Formwork', 'Haryana Electricals and Fire Systems'] },
  { code: 'CWT', name: 'Chennai Smart Water Treatment Plant', type: 'industrial', lib: 'industrial', city: 'Chennai', state: '33', stateName: 'Tamil Nadu', pin: '600058', address: 'Perungudi Industrial Estate, Chennai, Tamil Nadu 600096', lat: 12.9600, lng: 80.2400, budget: 540000000, progress: 81, cpi: 1.04, start: '2024-06-01', end: '2026-12-31', status: 'On Track', client: 'Chennai Metropolitan Water Supply Board', consultant: 'Cauvery Process Engineering', vendors: ['Coromandel Process Piping', 'Madras Electro Mechanical Works'] },
  { code: 'AHM', name: 'Ahmedabad Riverfront Mall and Hotel', type: 'commercial', lib: 'building', city: 'Ahmedabad', state: '24', stateName: 'Gujarat', pin: '380009', address: 'Ellisbridge, Sabarmati Riverfront, Ahmedabad, Gujarat 380009', lat: 23.0225, lng: 72.5714, budget: 1350000000, progress: 55, cpi: 0.89, start: '2025-01-10', end: '2027-09-30', status: 'Delayed', client: 'Sabarmati Retail Developers LLP', consultant: 'Hasmukh Patel and Associates', vendors: ['Gujarat Glass and Cladding', 'Amdavad Interiors and Fit-out'] },
  { code: 'KSL', name: 'Kolkata Salt Lake Hospital Wing', type: 'institutional', lib: 'building', city: 'Kolkata', state: '19', stateName: 'West Bengal', pin: '700091', address: 'Sector V, Salt Lake, Kolkata, West Bengal 700091', lat: 22.5726, lng: 88.4300, budget: 680000000, progress: 59, cpi: 1.00, start: '2025-05-01', end: '2027-04-30', status: 'On Track', client: 'Eastern Healthcare Trust', consultant: 'Bhattacharya and Sen Architects', vendors: ['Bengal Medical Gas Systems', 'Hooghly Civil Contractors'] },
  { code: 'JSP', name: 'Jaipur Solar Park Substation', type: 'industrial', lib: 'industrial', city: 'Jaipur', state: '08', stateName: 'Rajasthan', pin: '302022', address: 'Bhadla Road, Jaipur, Rajasthan 302022', lat: 26.9124, lng: 75.7873, budget: 760000000, progress: 90, cpi: 1.05, start: '2024-03-01', end: '2026-12-15', status: 'On Track', client: 'Rajasthan Renewable Energy Corporation', consultant: 'Marwar Power Consultants', vendors: ['Aravali Transmission Works', 'Thar Earthing and Cabling'] },
  { code: 'KPW', name: 'Kochi Port Warehouse Complex', type: 'industrial', lib: 'industrial', city: 'Kochi', state: '32', stateName: 'Kerala', pin: '682003', address: 'Willingdon Island, Kochi, Kerala 682003', lat: 9.9667, lng: 76.2667, budget: 430000000, progress: 100, cpi: 0.98, start: '2024-01-15', end: '2026-10-31', status: 'Completed', client: 'Cochin Port Logistics Authority', consultant: 'Malabar Structural Consultants', vendors: ['Kerala Pre-engineered Buildings', 'Vembanad Marine Civil'] },
  { code: 'LKO', name: 'Lucknow Smart City Road and Drainage', type: 'infrastructure', lib: 'infra', city: 'Lucknow', state: '09', stateName: 'Uttar Pradesh', pin: '226010', address: 'Gomti Nagar Extension, Lucknow, Uttar Pradesh 226010', lat: 26.8467, lng: 80.9462, budget: 590000000, progress: 33, cpi: 0.93, start: '2025-10-01', end: '2027-12-31', status: 'Delayed', client: 'Lucknow Smart City Limited', consultant: 'Awadh Urban Engineers', vendors: ['Awadh Roadworks Pvt Ltd', 'Gomti Drainage and Culverts'] },
];

const panFor = (name, i) => {
  const letters = name.replace(/[^A-Za-z]/g, '').toUpperCase().padEnd(5, 'X').slice(0, 5);
  return `${letters.slice(0, 3)}${'C'}${letters[3]}${String(1000 + ((i * 7919) % 9000)).padStart(4, '0')}${letters[4]}`;
};
const gstFor = (state, pan) => `${state}${pan}1Z${(pan.charCodeAt(2) % 9) + 1}`;
const DAILY_SUMMARY = (p, work, qty, unit, day) =>
  `${work} continued at ${p.name}. ${qty} ${unit} completed today; ${day % 3 === 0 ? 'minor delay due to material delivery' : 'work proceeded as planned'}. Safety briefing held at 8:00 am.`;
const WEATHER = ['Clear', 'Partly cloudy', 'Light rain in the afternoon', 'Hot and humid', 'Overcast', 'Clear', 'Clear'];

async function main() {
  await db.sequelize.query('PRAGMA synchronous = OFF');

  const admin = await db.user.findOne({ where: { email: 'admin@sahyadri-demo.test' } });
  const planner = await db.user.findOne({ where: { email: 'planner@sahyadri-demo.test' } });
  const accounts = await db.user.findOne({ where: { email: 'accounts@sahyadri-demo.test' } });
  if (!admin || !planner || !accounts) throw new Error('the demo users are missing; run seed-india-demo.js first');
  const companyId = admin.company_id;

  const already = await db.project.count({ where: { company_id: companyId, project_code: PROJECTS.map((p) => p.code) } });
  if (already > 0) throw new Error(`${already} of the new project codes already exist; refusing to seed twice`);

  // Shared masters (materials and equipment catalogues)
  const matMaster = {};
  const eqMaster = {};
  for (const lib of Object.values(LIB)) {
    for (const [name, sku, unit, cat] of lib.materials) {
      if (!matMaster[sku]) matMaster[sku] = await db.material_master.findOne({ where: { sku: `MAT-${sku}-${lib.zoneType}` } })
        || await mk('shared', 'material_master', sku, () => db.material_master.create({ name, sku: `MAT-${sku}-${lib.zoneType}`, company_id: companyId, unit, category: cat }));
    }
  }
  void eqMaster;

  const summary = [];
  let ledgerSeq = 5000;
  let vendorIdx = 0;

  for (const p of PROJECTS) {
    const lib = LIB[p.lib];
    const C = p.code;
    const budget = p.budget;
    const spent = round(budget * (p.progress / 100) / p.cpi);
    const matShare = 0.45, eqShare = 0.15, labShare = 0.25, othShare = 0.15;

    // 1. Client and consultant masters
    const client = await mk(C, 'client_master', p.client, async () => (await db.client_master.findOne({ where: { company_id: companyId, name: p.client } })) || db.client_master.create({ company_id: companyId, name: p.client }));
    const consultant = await mk(C, 'consultant_master', p.consultant, async () => (await db.consultant_master.findOne({ where: { company_id: companyId, name: p.consultant } })) || db.consultant_master.create({ company_id: companyId, name: p.consultant }));

    // 2. Project master record
    const project = await mk(C, 'project', p.name, () => db.project.create({
      name: p.name, type: p.type, company_id: companyId, address: p.address, latitude: p.lat, longitude: p.lng,
      completion_date: p.end, start_date: p.start, budget_total: budget, budget_used: spent, status: p.status, progress: p.progress,
      project_code: C, contract_type: p.type === 'infrastructure' ? 'EPC' : 'Item rate', currency: 'INR', location_name: p.city,
      description: `${p.name}, ${p.city}, ${p.stateName}. Client: ${p.client}. Consultant: ${p.consultant}.`,
      client_id: client?.id || null, consultant_id: consultant?.id || null, project_manager_id: planner.id,
      handover_date: p.status === 'Completed' ? p.end : null, dlp_months: 12,
      material_total: round(budget * matShare), material_used: round(spent * matShare),
      equipment_total: round(budget * eqShare), equipment_used: round(spent * eqShare),
      labor_total: round(budget * labShare), labor_used: round(spent * labShare),
      other_total: round(budget * othShare), other_used: round(spent * othShare),
    }));
    if (!project) continue;
    const pid = project.id;

    // 3. Project team
    for (const [u, role] of [[admin, 'Project Director'], [planner, 'Project Manager'], [accounts, 'Billing Engineer']]) {
      await mk(C, 'project_team', role, () => db.project_team.create({ project_id: pid, user_id: u.id, role }));
    }

    // 4. Site store, zones, disciplines, phases, work packages
    await mk(C, 'store_location', 'site store', () => db.store_location.create({ company_id: companyId, project_id: pid, code: `SITE-${C}`, name: `${p.name} site store`, location_type: 'site_store', created_by: admin.id }));
    await mk(C, 'store_location', 'quarantine', () => db.store_location.create({ company_id: companyId, project_id: pid, code: `QRN-${C}`, name: `${p.name} quarantine yard`, location_type: 'quarantine', created_by: admin.id }));
    const zones = [];
    for (const [i, letter] of ['A', 'B', 'C'].entries()) {
      const z = await mk(C, 'project_zone', letter, () => db.project_zone.create({ company_id: companyId, project_id: pid, zone_type: lib.zoneType, code: `${lib.zoneType === 'block' ? 'BLK' : 'ZN'}-${letter}`, name: `${lib.zonePrefix} ${letter}` }));
      if (z) zones.push(z);
      void i;
    }
    const disciplines = [];
    for (const [code, name] of [['CIV', 'Civil'], ['STR', 'Structural'], ['MEP', 'MEP and services']]) {
      const d = await mk(C, 'project_discipline', code, () => db.project_discipline.create({ company_id: companyId, project_id: pid, code, name }));
      if (d) disciplines.push(d);
    }
    const phases = [];
    const spanDays = Math.round((new Date(p.end) - new Date(p.start)) / 86400000);
    for (const [i, name] of ['Mobilisation', 'Execution', 'Closeout'].entries()) {
      const planned = [0, 0.1, 0.9, 1];
      const ph = await mk(C, 'project_phase', name, () => db.project_phase.create({
        company_id: companyId, project_id: pid, code: `PH${i + 1}`, name, sequence_no: i + 1,
        planned_start: iso(addDays(p.start, spanDays * planned[i])), planned_end: iso(addDays(p.start, spanDays * planned[i + 1])),
        status: p.progress >= (i + 1) * 33 ? 'completed' : p.progress > i * 33 ? 'active' : 'planned',
      }));
      if (ph) phases.push(ph);
    }
    for (const [i, name] of ['Civil and structure', 'Services and utilities', 'Finishing and external works'].entries()) {
      await mk(C, 'project_work_package', name, () => db.project_work_package.create({
        company_id: companyId, project_id: pid, phase_id: phases[Math.min(i, phases.length - 1)]?.id || null, discipline_id: disciplines[i]?.id || null,
        zone_id: zones[i]?.id || null, package_code: `WP-${String(i + 1).padStart(2, '0')}`, name, package_type: i === 0 ? 'subcontract' : 'in_house',
        status: p.progress > 15 + i * 25 ? 'active' : 'planned',
      }));
    }

    // 5. Vendors (two per project) with labour roster
    const vendors = [];
    for (const vname of p.vendors) {
      vendorIdx += 1;
      const pan = panFor(vname, vendorIdx);
      const unregistered = vendorIdx % 7 === 0; // a few without GST so compliance has something to flag
      const v = await mk(C, 'vendors', vname, () => db.vendors.create({
        project_id: pid, project_ids: JSON.stringify([pid]), name: vname, spoc_name: ['Anil Reddy', 'Meera Nair', 'Harpreet Singh', 'Debasish Roy', 'Kavita Desai', 'Imran Qureshi'][vendorIdx % 6],
        spoc_phone: `98${String(10000000 + vendorIdx * 137).slice(0, 8)}`, official_email: `accounts${vendorIdx}@vendors.sahyadri-demo.test`,
        official_phone: `98${String(20000000 + vendorIdx * 211).slice(0, 8)}`, physical_address: `${p.city}, ${p.stateName}`, pincode: p.pin,
        skill: vendors.length === 0 ? 'Civil and structural works' : 'Specialist installation and finishing', gst_no: unregistered ? null : gstFor(p.state, pan), pan_card_no: pan,
        budget_allocation: round(budget * 0.12), status: 'active', compliance_score: unregistered ? 55 : 80 + (vendorIdx % 18), company_id: companyId,
      }));
      if (v) {
        vendors.push(v);
        await mk(C, 'vendors_labor', vname, () => db.vendors_labor.create({ vendor_id: v.id, company_id: companyId, skill: v.skill, count: 10 + (vendorIdx % 9) * 3 }));
      }
    }
    const [v1, v2] = vendors;

    // 6. WBS
    const wbsRows = [];
    for (const [i, name] of lib.wbs.entries()) {
      const w = await mk(C, 'wbs', name, () => db.wbs.create({ company_id: companyId, project_id: pid, wbs_code: String(i + 1), name, level: 1, status: p.progress > i * 25 + 25 ? 'completed' : 'active' }));
      if (w) wbsRows.push(w);
    }

    // 7. BOQ
    const boqRows = [];
    for (const [code, description, unit, rate, share] of lib.boq) {
      const qty = Math.max(1, round((budget * share) / rate));
      const executed = round(qty * clamp(p.progress / 100 + 0.02, 0, 1));
      const row = await mk(C, 'boq_item', code, () => db.boq_item.create({
        project_id: pid, company_id: companyId, item_code: `${C}-${code}`, description, category: lib.wbs[boqRows.length % lib.wbs.length], unit,
        estimated_qty: qty, unit_rate: rate, total_estimated_amount: qty * rate, executed_qty: executed, billed_amount: round(executed * rate * 0.9),
        wbs_id: wbsRows[boqRows.length % wbsRows.length]?.id || null,
      }));
      if (row) boqRows.push(row);
    }

    // 8. Budget (approved revision with heads and allocations)
    const bud = await mk(C, 'project_budget', 'rev 1', () => db.budget.create({
      company_id: companyId, project_id: pid, revision_number: 1, status: 'approved', total_budget_amount: budget,
      change_reason: 'Approved contract baseline', created_by: planner.id, approved_by: admin.id, approved_at: new Date(addDays(p.start, 5)),
    }));
    const heads = {};
    for (const [i, [code, name, share]] of lib.heads.entries()) {
      const h = await mk(C, 'budget_head', code, () => db.budget_head.create({ company_id: companyId, project_id: pid, head_code: code, head_name: name, sort_order: i + 1, status: 'active', created_by: planner.id }));
      if (h) {
        heads[code] = h;
        if (bud) await mk(C, 'budget_head_allocation', code, () => db.budget_head_allocation.create({ company_id: companyId, project_id: pid, budget_id: bud.id, budget_head_id: h.id, allocated_amount: round(budget * share) }));
      }
    }

    // 9. Milestones
    const msRows = [];
    const msSpan = spanDays / 4;
    for (const [i, name] of lib.milestones.entries()) {
      const prog = clamp(round(p.progress * 4 - i * 100), 0, 100);
      const ms = await mk(C, 'milestone', name, () => db.milestone.create({
        project_id: pid, name, phase: ['Mobilisation', 'Execution', 'Execution', 'Closeout'][i], progress: prog,
        status: prog === 100 ? 'Completed' : prog > 0 ? (p.status === 'Delayed' && i === Math.floor(p.progress / 25) ? 'On Hold' : 'In Progress') : 'Not Started',
        startDate: iso(addDays(p.start, msSpan * i)), endDate: iso(addDays(p.start, msSpan * (i + 1))),
      }));
      if (ms) msRows.push(ms);
    }

    // 10. Tasks
    const activeMs = Math.min(3, Math.floor(p.progress / 25));
    for (const [i, [title, priority]] of lib.tasks.entries()) {
      const status = p.status === 'Completed' ? 'Completed' : i < 2 ? 'In Progress' : i === 2 ? 'Review' : i === 3 ? 'To Do' : (i % 2 ? 'Completed' : 'To Do');
      await mk(C, 'project_task', title, () => db.project_task.create({
        project_id: pid, milestone_id: msRows[Math.min(activeMs, msRows.length - 1)]?.id || null, title, description: `${title} (${p.name}).`, priority,
        status, progress: status === 'Completed' ? 100 : status === 'Review' ? 90 : status === 'In Progress' ? 40 + i * 10 : 0, created_by: planner.id,
        due_date: addDays(TODAY, status === 'Completed' ? -10 : 5 + i * 6),
      }));
    }

    // 11. Measurement book with certified items
    const mb = await mk(C, 'measurement_book', 'MB-001', () => db.measurement_book.create({
      mb_number: `MB-${C}-001`, company_id: companyId, project_id: pid, vendor_id: v1?.id || null, title: `${lib.boq[0][1]} - measurement to date`,
      measurement_date: '2026-10-31', period_start: '2026-10-01', period_end: '2026-10-31', status: 'certified', created_by: planner.id, certified_by: admin.id, certified_at: new Date('2026-11-02T10:00:00Z'),
    }));
    let mbTotal = 0;
    const mbItems = [];
    for (const [i, boq] of boqRows.slice(0, 3).entries()) {
      const measured = round(Number(boq.estimated_qty) * 0.06 * (i + 1) / 2);
      const rate = Number(boq.unit_rate);
      mbTotal += measured * rate;
      const it = await mk(C, 'measurement_book_item', boq.item_code, () => db.measurement_book_item.create({
        mb_id: mb?.id, company_id: companyId, project_id: pid, boq_item_id: boq.id, wbs_id: boq.wbs_id, item_number: String(i + 1),
        work_description: `${boq.description}, October measurement`, location_reference: zones[i % zones.length]?.name || 'Site', calculation_method: 'direct',
        measured_qty: measured, unit: boq.unit, contract_rate: rate, measured_amount: measured * rate, certified_qty: measured, certified_amount: measured * rate,
        status: 'certified', budget_head_id: heads[lib.heads[0][0]]?.id || null,
      }));
      if (it) mbItems.push(it);
    }
    if (mb) await mb.update({ total_measured_amount: mbTotal });

    // 12. Subcontractor RA bills (one approved, one awaiting approval)
    const raSpecs = [
      { no: 1, vendor: v1, gross: round(mbTotal * 0.8), status: 'approved', start: '2026-09-01', end: '2026-09-30' },
      { no: 2, vendor: v2 || v1, gross: round(mbTotal * 0.45), status: 'submitted', start: '2026-10-01', end: '2026-10-31' },
    ];
    for (const ra of raSpecs) {
      const retention = round(ra.gross * 0.05);
      const tds = round(ra.gross * 0.02);
      await mk(C, 'contractor_ra_bill', `RA-${ra.no}`, () => db.contractor_ra_bill.create({
        ra_bill_number: `RA-${C}-00${ra.no}`, company_id: companyId, project_id: pid, vendor_id: ra.vendor?.id, billing_period_start: ra.start, billing_period_end: ra.end,
        previous_cumulative_amount: 0, current_period_gross_amount: ra.gross, cumulative_gross_amount: ra.gross, retention_rate_pct: 5, retention_amount: retention,
        tds_rate_pct: 2, tds_amount: tds, other_deductions_amount: 0, net_payable_amount: ra.gross - retention - tds, status: ra.status, prepared_by: planner.id,
        approved_by: ra.status === 'approved' ? admin.id : null, approved_at: ra.status === 'approved' ? new Date('2026-10-12T09:00:00Z') : null,
        idempotency_key: `SEED10-RA-${C}-${ra.no}`,
      }));
    }

    // 13. Vendor invoices and payment requests
    const invSpecs = [
      { no: '0301', vendor: v1, sub: round(mbTotal * 0.5), date: '2026-09-18', status: 'Paid', pr: 'paid' },
      { no: '0412', vendor: v2 || v1, sub: round(mbTotal * 0.3), date: '2026-10-14', status: 'Pending', pr: 'pending_approval' },
      { no: '0455', vendor: v1, sub: round(mbTotal * 0.2), date: '2026-10-28', status: 'Pending', pr: 'approved' },
    ];
    for (const inv of invSpecs) {
      const tax = round(inv.sub * 0.18);
      const grand = inv.sub + tax;
      const row = await mk(C, 'vendors_invoice', inv.no, () => db.vendors_invoice.create({
        company_id: companyId, vendor_id: inv.vendor?.id, project_id: pid, invoice_number: `${C}/INV/2026/${inv.no}`, invoice_date: inv.date,
        items: [{ description: 'Work done as per measurement book', amount: inv.sub }], subtotal: inv.sub, tax_rate: 18, tax_amount: tax, grand_total: grand, status: inv.status,
        payment_mode: inv.status === 'Paid' ? 'Bank Transfer' : null, paid_amount: inv.status === 'Paid' ? grand : 0, paid_at: inv.status === 'Paid' ? new Date('2026-10-05T11:00:00Z') : null,
      }));
      if (row) {
        await mk(C, 'vendors_payment_request', inv.no, () => db.vendors_payment_request.create({
          company_id: companyId, vendor_id: inv.vendor.id, invoice_id: row.id, project_id: pid, amount: grand, mode: 'Bank Transfer', status: inv.pr, requested_by: planner.id,
          approved_by: inv.pr === 'pending_approval' ? null : admin.id, approved_at: inv.pr === 'pending_approval' ? null : new Date('2026-10-20T09:30:00Z'),
        }));
      }
    }

    // 14. Purchase orders and 15. goods receipts
    const poSpecs = [
      { no: '001', boq: boqRows[1], vendor: v1, qtyPct: 0.12, status: 'completed', grn: 'accepted' },
      { no: '002', boq: boqRows[0], vendor: v2 || v1, qtyPct: 0.08, status: 'partially_received', grn: 'partially_accepted' },
      { no: '003', boq: boqRows[2], vendor: v1, qtyPct: 0.05, status: 'approved', grn: null },
    ];
    for (const ps of poSpecs) {
      if (!ps.boq) continue;
      const qty = Math.max(1, round(Number(ps.boq.estimated_qty) * ps.qtyPct));
      const rate = Number(ps.boq.unit_rate);
      const items = [{ item_code: ps.boq.item_code, description: ps.boq.description, quantity: qty, unit: ps.boq.unit, unit_rate: rate, amount: qty * rate }];
      const po = await mk(C, 'purchase_order', ps.no, () => db.purchase_order.create({
        po_number: `PO-${C}-${ps.no}`, company_id: companyId, project_id: pid, vendor_id: ps.vendor?.id, order_date: iso(addDays(TODAY, -60 + Number(ps.no) * 6)),
        expected_delivery_date: iso(addDays(TODAY, -40 + Number(ps.no) * 10)), status: ps.status, items, total_amount: qty * rate, created_by: planner.id,
        approved_by: admin.id, approved_at: new Date('2026-09-20T09:00:00Z'),
      }));
      if (po && ps.grn) {
        const rejected = ps.grn === 'accepted' ? 0 : Math.max(1, round(qty * 0.02));
        await mk(C, 'goods_receipt_note', ps.no, () => db.goods_receipt_note.create({
          grn_number: `GRN-${C}-${ps.no}`, company_id: companyId, project_id: pid, vendor_id: ps.vendor.id, purchase_order_id: po.id, receipt_date: iso(addDays(TODAY, -35 + Number(ps.no) * 8)),
          delivery_challan_number: `DC-${C}-${1000 + Number(ps.no)}`, vehicle_number: `${p.state === '27' ? 'MH12' : 'KA01'}AB${4000 + Number(ps.no)}`,
          items: [{ item_code: ps.boq.item_code, description: ps.boq.description, received_qty: qty, accepted_qty: qty - rejected, rejected_qty: rejected, unit_rate: rate }],
          status: ps.grn === 'accepted' ? 'inspected' : 'partially_accepted', inspection_notes: rejected ? 'Short quantity and surface defects on part of the lot.' : 'Checked against PO; test certificates received.',
          received_by: planner.id, inspected_by: planner.id,
        }));
      }
    }

    // 16. Bank guarantees (performance, advance, and one expiring soon)
    const bgs = [
      ['performance', 'State Bank of India', 0.05, '2025-02-15', iso(addDays(TODAY, 400))],
      ['advance', 'HDFC Bank', 0.10, '2025-03-01', iso(addDays(TODAY, p.code === 'MCR' || p.code === 'AHM' ? 25 : 200))],
    ];
    for (const [i, [type, bank, pct, issue, expiry]] of bgs.entries()) {
      await mk(C, 'bank_guarantee', type, () => db.bank_guarantee.create({
        company_id: companyId, project_id: pid, vendor_id: null, bg_type: type, bank_name: bank, bg_number: `${C}-${type.slice(0, 3).toUpperCase()}-${5100 + i}-2025`,
        amount: round(budget * pct), issue_date: issue, expiry_date: expiry, status: 'active', created_by: admin.id,
      }));
    }

    // 17. Cost ledger (spend split across budget heads; categories follow the head)
    for (const [code, , share] of lib.heads) {
      ledgerSeq += 1;
      const cat = lib.headCategory[code] || 'overhead';
      await mk(C, 'project_cost_ledger', code, () => db.cost_ledger.create({
        company_id: companyId, project_id: pid, cost_category: cat, event_type: 'accrual', budget_head_id: heads[code]?.id || null, source_type: 'DEMO_SEED_10', source_id: String(ledgerSeq),
        source_line_identifier: `${C}-${code}`, recognition_date: '2026-10-31', amount: round(spent * share), currency: 'INR', idempotency_key: `SEED10-COST-${C}-${code}`,
        reason: `Cost to date, ${code}`, posted_by: accounts.id,
      }));
    }

    // 18. Labour attendance, last 7 days x 3 trades (one row per trade per day)
    const days = [...Array(7).keys()].map((n) => iso(addDays(TODAY, -(6 - n))));
    const labourScale = clamp(round(budget / 40000000), 6, 60);
    for (const [di, day] of days.entries()) {
      for (const [ti, [trade, level, wage]] of lib.trades.slice(0, 3).entries()) {
        const head = labourScale + ((di * 3 + ti * 5) % 9) - (ti === 2 ? 4 : 0);
        await mk(C, 'labour_attendance', `${day} ${trade}`, () => db.labour_attendance.create({
          project_id: pid, company_id: companyId, attendance_date: day, trade_type: trade, skill_level: level, headcount: head, shift: 'day', vendor_id: (ti % 2 ? v2 : v1)?.id || null,
          overtime_hours: di % 3 === 0 ? 2 * ti : 0, daily_wage_rate: wage, total_cost: head * wage + (di % 3 === 0 ? 2 * ti * wage / 8 : 0),
        }));
      }
    }

    // 19. Daily progress reports with work items
    for (const [di, day] of days.entries()) {
      const work = lib.works[di % lib.works.length];
      const qty = 30 + ((di * 17) % 80);
      const unit = lib.boq[di % lib.boq.length][2];
      const dpr = await mk(C, 'dpr', day, () => db.dpr.create({
        report_date: day, project_id: pid, company_id: companyId, created_by: planner.id, weather_summary: WEATHER[di % WEATHER.length],
        work_summary: DAILY_SUMMARY(p, work, qty, unit, di), total_workforce_count: labourScale * 3 + di, status: di < 5 ? 'approved' : 'submitted',
      }));
      if (dpr) {
        await mk(C, 'dpr_work_item', `${day} ${work}`, () => db.dpr_work_item.create({
          dpr_id: dpr.id, milestone_id: msRows[activeMs]?.id || null, location_grid: zones[di % zones.length]?.name || 'Site', quantity_executed: qty, unit, description: work,
          progress_percentage: clamp(p.progress + di, 5, 100), status: p.status === 'Delayed' && di % 3 === 0 ? 'delayed' : 'in_progress',
        }));
      }
    }

    // 20. Snags (quality defects), status mix depends on project health
    for (const [i, [title, severity, trade, location]] of lib.snags.entries()) {
      const status = p.status === 'Completed' ? 'closed' : i === 0 ? 'open' : i === 1 ? 'in_progress' : i === 2 ? 'resolved' : 'open';
      await mk(C, 'snag_item', title, () => db.snag_item.create({
        project_id: pid, company_id: companyId, title, description: `${title}. Raised during the weekly quality walk at ${p.name}.`, location_pin: location, trade, severity, status,
        assigned_to: planner.id, vendor_id: (i % 2 ? v2 : v1)?.id || null, due_date: iso(addDays(TODAY, 7 + i * 5)),
      }));
    }

    // 21. Drawings
    for (const [i, [no, title, discipline]] of lib.drawings.entries()) {
      await mk(C, 'drawing_register', no, () => db.drawing_register.create({
        project_id: pid, company_id: companyId, drawing_number: `${C}-${no}`, title: `${title}, ${p.name}`, discipline, revision: ['R2', 'R1', 'R3', 'R0'][i],
        status: i === 3 ? 'under_review' : 'approved_for_construction', file_url: `https://files.sahyadri-demo.test/drawings/${C}-${no}.pdf`, uploaded_by: planner.id,
      }));
    }

    // 22. Variation orders (one approved, one pending) with priced items
    const voSpecs = [
      { no: '01', title: `Additional scope requested by ${p.client.split(' ')[0]}`, status: 'approved', delta: 0.012, days: 10 },
      { no: '02', title: 'Design change after consultant review', status: 'submitted', delta: 0.008, days: 14 },
    ];
    for (const vs of voSpecs) {
      const amount = round(budget * vs.delta);
      const vo = await mk(C, 'variation_order', vs.no, () => db.variation_order.create({
        variation_number: `VO-${C}-${vs.no}`, company_id: companyId, project_id: pid, change_type: 'client_variation', category: 'addition', title: vs.title,
        description: `${vs.title}. Cost and time impact assessed against the approved baseline.`, status: vs.status, proposed_amount: amount, approved_amount: vs.status === 'approved' ? amount : 0,
        net_cost_impact: amount, net_revenue_impact: round(amount * 1.1), time_extension_days_requested: vs.days, time_extension_days_approved: vs.status === 'approved' ? vs.days : 0,
        submission_date: iso(addDays(TODAY, -30)), created_by: planner.id, approved_by: vs.status === 'approved' ? admin.id : null, approval_date: vs.status === 'approved' ? new Date('2026-10-22T10:00:00Z') : null,
      }));
      if (vo) {
        const boq = boqRows[vs.no === '01' ? 0 : 3] || boqRows[0];
        const rate = Number(boq?.unit_rate || 1);
        const qty = Math.max(1, round(amount / rate));
        await mk(C, 'variation_order_item', vs.no, () => db.variation_order_item.create({
          variation_order_id: vo.id, company_id: companyId, project_id: pid, boq_item_id: boq?.id || null, budget_head_id: heads[lib.heads[0][0]]?.id || null, item_code: boq?.item_code,
          description: boq?.description || 'Additional work', unit: boq?.unit || 'lot', proposed_delta_qty: qty, proposed_rate: rate, proposed_delta_amount: qty * rate,
          approved_delta_qty: vs.status === 'approved' ? qty : 0, approved_rate: vs.status === 'approved' ? rate : 0, approved_delta_amount: vs.status === 'approved' ? qty * rate : 0,
        }));
      }
    }

    // 23. Meetings and 24. project documents
    for (const [i, [title, date]] of [['Weekly coordination meeting', '2026-11-05'], ['Monthly progress review with the client', '2026-11-12'], ['Safety and quality committee', '2026-11-19']].entries()) {
      await mk(C, 'meeting', title, () => db.meeting.create({
        title: `${title}, ${p.city}`, description: `Agenda: progress against the baseline, open snags, pending RA bills, and look-ahead. Project: ${p.name}.`, date, time: i === 1 ? '15:00' : '10:30',
        duration: 60, attendees: [admin.email, planner.email, accounts.email], project_id: pid, vendor_id: v1?.id || null, company_id: companyId, created_by: planner.id,
      }));
    }
    for (const [name, mimetype] of [[`Contract agreement, ${p.name}`, 'application/pdf'], [`Approved baseline programme, ${p.name}`, 'application/pdf'], [`Quality assurance plan, ${p.name}`, 'application/pdf']]) {
      await mk(C, 'project_document', name, () => db.project_document.create({
        name, size: `${(1.2 + Math.random() * 3).toFixed(1)} MB`, url: `https://files.sahyadri-demo.test/docs/${C}-${name.split(',')[0].toLowerCase().replace(/[^a-z]+/g, '-')}.pdf`, mimetype, project_id: pid,
      }));
    }

    // 25. Site stock (materials), stock ledger receipts, 26. equipment on site
    for (const [i, [name, sku, unit, cat]] of lib.materials.entries()) {
      const stockIn = 400 + i * 350;
      const used = round(stockIn * clamp(p.progress / 100 + 0.1 - i * 0.05, 0.1, 0.95));
      const master = matMaster[sku];
      await mk(C, 'material_project_stock', name, () => db.material_project_stock.create({
        name, sku: `${C}-${sku}`, category: cat, unit_of_measure: unit, stockIn, stockUsed: used, cost: String(round(40000 * (i + 1))), vendor_name: (v1?.name || ''), project_name: p.name,
        status: used > stockIn * 0.85 ? 'low' : 'available', material_master_id: master?.id || null, company_id: companyId, vendor_id: v1?.id || null, project_id: pid,
      }));
      if (master) {
        await mk(C, 'stock_ledger', name, () => db.stock_ledger.create({
          company_id: companyId, project_id: pid, material_id: master.id, movement_type: 'receipt', quantity: stockIn, unit_of_measure: unit, unit_cost: round(40000 * (i + 1) / stockIn * 10),
          reference_type: 'GRN', reference_id: `GRN-${C}-00${(i % 3) + 1}`, idempotency_key: `SEED10-STK-${C}-${sku}`, reason: 'Receipt against purchase order', performed_by: planner.id,
        }));
      }
    }
    for (const [name, sku, cat] of lib.equipment) {
      await mk(C, 'equipment_project_stock', name, () => db.equipment_project_stock.create({
        name, sku: `${C}-${sku}`, category: cat, stockIn: 1, stockUsed: p.status === 'Completed' ? 0 : 1, cost: String(round(budget * 0.002)), vendor_name: (v2?.name || v1?.name || ''), project_name: p.name,
        status: p.status === 'Completed' ? 'demobilised' : 'on_site', company_id: companyId, vendor_id: v2?.id || v1?.id || null, project_id: pid,
      }));
    }

    summary.push({ id: pid, code: C, name: p.name, status: p.status, progress: p.progress });
  }

  // Tidy the two earlier projects so the dashboards and Copilot read them correctly (fields the first seed could not set).
  const tidy = async (label, sql) => { try { await db.sequelize.query(sql); outcome.push(true); } catch (e) { outcome.push(false); failures.push({ project: 'existing', category: 'tidy', label, message: e.message }); } };
  await tidy('snag enums', "UPDATE SNAG_ITEMS SET severity = lower(severity), status = replace(lower(status), ' ', '_') WHERE severity IN ('High','Medium','Low','Critical') OR status IN ('Open','In Progress','Resolved','Closed')");
  await tidy('drawing status', "UPDATE DRAWING_REGISTER SET status = 'approved_for_construction' WHERE status = 'Approved'");
  await tidy('attendance headcount', "UPDATE LABOUR_ATTENDANCE SET headcount = CASE trade_type WHEN 'Mason' THEN CASE project_id WHEN 1 THEN 38 ELSE 24 END WHEN 'Carpenter' THEN 22 WHEN 'Bar Bender' THEN 16 ELSE headcount END WHERE project_id IN (1,2) AND headcount = 1");
  await tidy('project 1 and 2 roll-up', "UPDATE PROJECT SET progress = CASE id WHEN 1 THEN 62 ELSE 38 END, budget_used = CASE id WHEN 1 THEN 27500000 ELSE 14500000 END, status = CASE id WHEN 1 THEN 'On Track' ELSE 'Delayed' END, project_code = CASE id WHEN 1 THEN 'HSR' ELSE 'NRF' END, start_date = CASE id WHEN 1 THEN '2025-01-10' ELSE '2026-01-01' END WHERE id IN (1,2) AND progress = 0");

  const failed = failures.length;
  const perProject = Object.fromEntries(Object.entries(counts).filter(([k]) => k !== 'shared').map(([k, v]) => [k, { categories: Object.keys(v).length, rows: Object.values(v).reduce((a, b) => a + b, 0) }]));
  console.log(JSON.stringify({ projects: summary, per_project: perProject, steps_ok: outcome.filter(Boolean).length, steps_failed: failed, failures: failures.slice(0, 40) }, null, 2));
}

main()
  .then(() => db.sequelize.close())
  .catch(async (err) => {
    console.error('SEED_FAILED', err.message);
    await db.sequelize.close();
    process.exit(1);
  });
