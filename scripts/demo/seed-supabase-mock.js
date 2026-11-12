#!/usr/bin/env node
'use strict';
/**
 * Mock business data for the hosted Supabase PostgreSQL database (DB_TARGET_CLASS=supabase_cloud).
 *
 * Creates three projects for the existing company (id 1) with their BOQ, milestones, tasks, WBS, zones, stores,
 * materials and equipment stock, vendors, labour attendance, DPRs, snags and drawings. It creates NO users,
 * roles or permissions: sign-in accounts are managed separately.
 *
 * Safety: runs in one transaction; refuses to run if any project already exists for company 1, so it cannot
 * duplicate data on a second run. Refuses any target other than supabase_cloud.
 *
 * Usage (from the backend folder, after migrations are applied):
 *   node scripts/demo/seed-supabase-mock.js
 */
require('dotenv').config({ quiet: true });
const path = require('path');
const { assertDatabaseTarget } = require('../../src/config/database_target_guard');

const ROOT = path.resolve(__dirname, '../..');
const COMPANY_ID = 1;

function refuse(msg) {
  console.error(`SEED_REFUSED: ${msg}`);
  process.exit(1);
}
if (process.env.DB_TARGET_CLASS !== 'supabase_cloud' || process.env.DB_DIALECT !== 'postgres') {
  refuse('set DB_TARGET_CLASS=supabase_cloud and DB_DIALECT=postgres (see .env).');
}
assertDatabaseTarget(process.env);

const db = require(path.join(ROOT, 'src/models'));

const day = (s) => new Date(`${s}T00:00:00Z`);
const addDays = (s, n) => {
  const d = day(s);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

// ---------- Mock content ----------

const PROJECTS = [
  {
    key: 'tower',
    name: 'Sahyadri Heights Residential Tower',
    code: 'SHT-001',
    type: 'Residential',
    location: 'Hinjewadi Phase 2, Pune',
    address: 'Plot 14, Hinjewadi Phase 2, Pune, Maharashtra 411057',
    start: '2026-01-15',
    completion: '2027-06-30',
    budget: 185000000,
    used: 71000000,
    progress: 38,
    status: 'On Track',
    description: 'G+24 residential tower with two basements, 180 units, and amenities deck.',
    boq: [
      ['RCC-M30', 'RCC M30 in superstructure', 'Concrete', 'cum', 7800, 5400],
      ['STL-FE500', 'TMT bars Fe500D, cut, bend and fix', 'Steel', 'MT', 1450, 880],
      ['AAC-BLK', 'AAC block masonry 200 mm', 'Masonry', 'cum', 4200, 2100],
      ['PLASTER', 'Internal cement plaster 12 mm', 'Finishing', 'sqm', 62000, 24000],
      ['TILE-VIT', 'Vitrified floor tiles 600x600', 'Finishing', 'sqm', 38000, 9500],
    ],
    milestones: [
      ['Site mobilisation and foundations', 'Completed', 100, '2026-01-15', '2026-04-30'],
      ['Superstructure', 'In Progress', 55, '2026-05-01', '2026-12-31'],
      ['MEP and services rough-in', 'Not Started', 0, '2027-01-01', '2027-03-31'],
      ['Finishes, testing and handover', 'Not Started', 0, '2027-04-01', '2027-06-30'],
    ],
    tasks: [
      ['Pour slab level 14 and obtain pour-card approval', 'High Priority', 'In Progress', 1],
      ['Install MEP risers and sleeves, levels 1-8', 'High Priority', 'To Do', 2],
      ['Approve tile and sanitary-ware samples', 'Medium Priority', 'Review', 2],
      ['Fire-fighting hydro test, wet riser', 'High Priority', 'To Do', 3],
    ],
    zones: [['block', 'BLK-A', 'Tower A'], ['block', 'BLK-B', 'Tower B']],
    wbs: ['Substructure', 'Superstructure', 'Services', 'Finishes'],
    stores: [['SHT-SS', 'Site store - Tower', 'site_store']],
    materials: [
      ['OPC 53 grade cement', 'CEM-53', 'Cement', 'bags', 9800, 390, 2600, 'UltraTech Cement Ltd'],
      ['TMT bar Fe500D 12 mm', 'TMT-12', 'Steel', 'tonne', 310, 62000, 240, 'Tata Steel Distribution'],
      ['AAC block 200 mm', 'AAC-200', 'Masonry', 'nos', 42000, 68, 18000, 'Siporex Blocks Pvt Ltd'],
      ['M-sand, zone II', 'MSAND-2', 'Aggregates', 'm3', 900, 1450, 420, 'Pune Aggregates Co'],
    ],
    equipment: [
      ['Tower crane 50 m jib', 'TC-50', 'Lifting', 2, 0, 'Morvi Cranes Pvt Ltd', 'Available'],
      ['Concrete pump 36 m', 'CP-36', 'Concrete', 1, 1, 'Schwing Rentals', 'In Use'],
      ['Transit mixer 6 cum', 'TM-6', 'Concrete', 4, 2, 'Pune Transit Mix Services', 'In Use'],
    ],
  },
  {
    key: 'flyover',
    name: 'NH-48 Flyover and Approach Road Package',
    code: 'NHF-007',
    type: 'Infrastructure',
    location: 'Talegaon Interchange, Pune',
    address: 'NH-48 km 62+400 to 63+900, Talegaon, Pune, Maharashtra',
    start: '2025-11-01',
    completion: '2027-03-31',
    budget: 642000000,
    used: 268000000,
    progress: 46,
    status: 'Delayed',
    description: '1.5 km elevated flyover with 22 spans, approach roads and drainage.',
    boq: [
      ['PILE-600', 'Bored cast-in-situ pile 600 mm dia', 'Foundation', 'rm', 9600, 6200],
      ['PIER-RCC', 'RCC pier and pier cap M35', 'Concrete', 'cum', 8400, 3900],
      ['DECK-PSC', 'Pre-stressed deck girder, launched', 'Steel', 'MT', 4100, 1700],
      ['DBM-BC', 'Dense bituminous macadam and bituminous concrete', 'Pavement', 'MT', 7600, 1800],
    ],
    milestones: [
      ['Survey, utility shifting and land handover', 'Completed', 100, '2025-11-01', '2026-02-28'],
      ['Foundation and substructure', 'Completed', 100, '2026-03-01', '2026-09-30'],
      ['Superstructure and pavement', 'In Progress', 40, '2026-10-01', '2027-01-31'],
      ['Finishing, load tests and handover', 'Not Started', 0, '2027-02-01', '2027-03-31'],
    ],
    tasks: [
      ['Complete pile integrity tests, group A', 'High Priority', 'Review', 1],
      ['Girder launching method statement approval', 'Medium Priority', 'In Progress', 3],
      ['Utility shifting clearance from the authority', 'High Priority', 'To Do', 3],
      ['Traffic diversion plan revision', 'Medium Priority', 'To Do', 3],
    ],
    zones: [['zone', 'CH-1', 'Chainage 62+400 to 63+100'], ['zone', 'CH-2', 'Chainage 63+100 to 63+900']],
    wbs: ['Earthwork', 'Substructure', 'Superstructure', 'Pavement and finishing'],
    stores: [['NHF-YARD', 'Main casting yard', 'site_store']],
    materials: [
      ['OPC 53 grade cement', 'CEM-53', 'Cement', 'bags', 22000, 390, 7000, 'UltraTech Cement Ltd'],
      ['TMT bar Fe500D 20 mm', 'TMT-20', 'Steel', 'tonne', 640, 61500, 310, 'Tata Steel Distribution'],
      ['20 mm aggregate', 'AGG-20', 'Aggregates', 'm3', 3200, 1280, 1100, 'Talegaon Quarry LLP'],
      ['Bitumen VG-30', 'BIT-VG30', 'Bituminous', 'tonne', 180, 58000, 60, 'Indian Oil Corporation'],
    ],
    equipment: [
      ['Hydraulic excavator 20 t', 'EX-20', 'Earthmoving', 3, 2, 'Kiran Earthmovers', 'In Use'],
      ['Paver finisher', 'PF-9', 'Paving', 1, 0, 'Wirtgen India', 'Available'],
      ['Vibratory roller 10 t', 'VR-10', 'Compaction', 2, 1, 'Kiran Earthmovers', 'In Use'],
    ],
  },
  {
    key: 'plant',
    name: 'Chakan Industrial Plant Expansion',
    code: 'CIP-003',
    type: 'Industrial',
    location: 'Chakan MIDC, Pune',
    address: 'Plot C-18, Chakan MIDC, Pune, Maharashtra 410501',
    start: '2026-03-01',
    completion: '2027-02-28',
    budget: 420000000,
    used: 118000000,
    progress: 27,
    status: 'On Track',
    description: 'Process plant expansion with steel shed, piping, and HT/LT electrical distribution.',
    boq: [
      ['RCC-M25', 'RCC M25 equipment foundations and plinth', 'Concrete', 'cum', 3600, 1400],
      ['STL-STR', 'Structural steel fabrication and erection', 'Steel', 'MT', 1900, 610],
      ['PEB-ROOF', 'Pre-engineered roofing and cladding', 'Roofing', 'sqm', 14000, 3200],
      ['PIPING', 'MS and HDPE process piping, installed', 'Piping', 'rm', 3400, 1100],
      ['CABLE-HT', 'HT and LT power cabling with trays', 'Electrical', 'rm', 9200, 2600],
    ],
    milestones: [
      ['Site development and foundations', 'In Progress', 70, '2026-03-01', '2026-08-31'],
      ['Structure and enclosure', 'Not Started', 0, '2026-09-01', '2026-12-31'],
      ['Mechanical, piping and electrical erection', 'Not Started', 0, '2027-01-01', '2027-02-10'],
      ['Testing, commissioning and handover', 'Not Started', 0, '2027-02-11', '2027-02-28'],
    ],
    tasks: [
      ['Anchor bolt survey before column erection', 'High Priority', 'To Do', 1],
      ['Approve piping isometrics, rev B', 'Medium Priority', 'Review', 3],
      ['Hydro test of process line L-12', 'High Priority', 'To Do', 3],
      ['Earthing resistance test', 'Medium Priority', 'To Do', 4],
    ],
    zones: [['zone', 'PZ-1', 'Plant zone 1'], ['floor', 'FL-G', 'Ground floor']],
    wbs: ['Foundations', 'Steel structure', 'Process and piping', 'Electrical and instrumentation'],
    stores: [['CIP-WH', 'Plant project store', 'project_store']],
    materials: [
      ['OPC 53 grade cement', 'CEM-53', 'Cement', 'bags', 4200, 390, 1100, 'UltraTech Cement Ltd'],
      ['Structural steel ISMB 300', 'STL-ISMB300', 'Steel', 'tonne', 180, 72500, 95, 'Jindal Steel Trading'],
      ['MS pipe 150 NB', 'PIPE-150', 'Piping', 'm', 2400, 1850, 900, 'Surya Pipes & Fittings'],
      ['LT power cable 4C x 95 sqmm', 'CAB-4C95', 'Electrical', 'm', 3000, 980, 1200, 'Polycab India Ltd'],
    ],
    equipment: [
      ['Crawler crane 80 t', 'CC-80', 'Lifting', 1, 0, 'Shriram Cranes', 'Available'],
      ['Welding generator set', 'WG-400', 'Power', 6, 4, 'Ashok Power Rentals', 'In Use'],
      ['Concrete batching plant', 'BP-60', 'Concrete', 1, 1, 'Nuvoco Equipment Hire', 'In Use'],
    ],
  },
];

const VENDORS = [
  ['UltraTech Cement Ltd', 'Ramesh Patil', '9800011001', 'sales.pune@ultratech.example', '411001', 'Cement', 'active'],
  ['Tata Steel Distribution', 'Sunil Kadam', '9800011002', 'orders.pune@tatasteel.example', '411002', 'Steel', 'active'],
  ['Siporex Blocks Pvt Ltd', 'Meera Shinde', '9800011003', 'accounts@siporex.example', '412105', 'Masonry', 'active'],
  ['Kiran Earthmovers', 'Kiran Jadhav', '9800011004', 'hire@kiranearth.example', '410506', 'Equipment hire', 'active'],
  ['Pune Transit Mix Services', 'Akash Bhosale', '9800011005', 'ops@punetransit.example', '411057', 'Concrete', 'pending'],
];

const SKILLS = ['Mason', 'Bar Bender', 'Carpenter', 'Fitter', 'Welder', 'Electrician', 'Helper'];

// ---------- Seeding ----------

async function main() {
  const existing = await db.project.count({ where: { company_id: COMPANY_ID } });
  if (existing > 0) refuse(`${existing} project(s) already exist for company ${COMPANY_ID}; mock data is loaded once.`);
  const company = await db.company.findByPk(COMPANY_ID);
  if (!company) refuse(`company ${COMPANY_ID} does not exist. Create it first.`);

  const counts = {};
  const bump = (k, n = 1) => (counts[k] = (counts[k] || 0) + n);

  await db.sequelize.transaction(async (t) => {
    const cid = COMPANY_ID;

    // Vendors
    const vendorIds = {};
    for (const [name, spoc, phone, email, pin, skill, status] of VENDORS) {
      const v = await db.vendors.create({
        company_id: cid, name, spoc_name: spoc, spoc_phone: phone, official_email: email, official_phone: phone,
        physical_address: `${name}, Pune`, pincode: pin, skill, status,
      }, { transaction: t });
      vendorIds[name] = v.id;
      bump('vendors');
    }

    // Skills (labour trades)
    for (const s of SKILLS) {
      await db.skill.create({ company_id: cid, skill_name: s, status: 'ACTIVE' }, { transaction: t });
      bump('skills');
    }

    // Material and equipment masters (company catalogue), keyed by SKU
    const materialMaster = {};
    const equipmentMaster = {};
    for (const p of PROJECTS) {
      for (const [name, sku, category, unit, qty, cost, used, vendor] of p.materials) {
        if (!materialMaster[sku]) {
          materialMaster[sku] = await db.material_master.create({
            company_id: cid, name, sku, category, stockAvailable: 0, cost: String(cost), status: 'active', isActive: true, isDeleted: false,
          }, { transaction: t });
          bump('material_master');
        }
      }
      for (const [name, sku, category, qty, inUse, vendor, status] of p.equipment) {
        if (!equipmentMaster[sku]) {
          equipmentMaster[sku] = await db.equipment_master.create({
            company_id: cid, name, sku, category, stockAvailable: 0, cost: '0', status: 'active', isActive: true, isDeleted: false,
          }, { transaction: t });
          bump('equipment_master');
        }
      }
    }

    for (const p of PROJECTS) {
      const project = await db.project.create({
        name: p.name, type: p.type, project_code: p.code, description: p.description, address: p.address,
        location_name: p.location, start_date: p.start, completion_date: p.completion, currency: 'INR',
        budget_total: p.budget, budget_used: p.used, progress: p.progress, status: p.status,
        material_total: Math.round(p.budget * 0.35), material_used: Math.round(p.used * 0.4),
        equipment_total: Math.round(p.budget * 0.12), equipment_used: Math.round(p.used * 0.15),
        labor_total: Math.round(p.budget * 0.2), labor_used: Math.round(p.used * 0.25),
        other_total: Math.round(p.budget * 0.05), other_used: Math.round(p.used * 0.03),
        company_id: cid,
      }, { transaction: t });
      bump('projects');
      const pid = project.id;

      // WBS
      const wbsIds = [];
      for (let i = 0; i < p.wbs.length; i++) {
        const w = await db.wbs.create({ company_id: cid, project_id: pid, wbs_code: String(i + 1), name: p.wbs[i], level: 1, status: 'active' }, { transaction: t });
        wbsIds.push(w.id);
        bump('wbs');
      }

      // BOQ
      for (let i = 0; i < p.boq.length; i++) {
        const [code, desc, category, unit, qty, executed] = p.boq[i];
        const unitRate = { cum: 6200, MT: 78000, rm: 1900, sqm: 480, tonne: 61000, m3: 1200, nos: 68, bags: 390 }[unit] || 1000;
        await db.boq_item.create({
          company_id: cid, project_id: pid, item_code: code, description: desc, category, unit,
          estimated_qty: qty, unit_rate: unitRate, total_estimated_amount: qty * unitRate,
          executed_qty: executed, billed_amount: Math.round(executed * unitRate * 0.9), wbs_id: wbsIds[i % wbsIds.length],
        }, { transaction: t });
        bump('boq_items');
      }

      // Milestones
      const milestoneIds = [];
      for (const [name, status, progress, start, end] of p.milestones) {
        const m = await db.milestone.create({ project_id: pid, name, phase: name.split(' ')[0], progress, status, startDate: start, endDate: end, color: '#2563eb' }, { transaction: t });
        milestoneIds.push(m.id);
        bump('milestones');
      }

      // Tasks
      for (const [title, priority, status, msIdx] of p.tasks) {
        await db.project_task.create({
          project_id: pid, milestone_id: milestoneIds[msIdx - 1] || milestoneIds[0], title, priority, status,
          progress: status === 'Completed' ? 100 : status === 'Review' ? 90 : status === 'In Progress' ? 50 : 0,
          due_date: addDays(p.start, 120 + msIdx * 30),
        }, { transaction: t });
        bump('tasks');
      }

      // Zones, stores
      for (const [zone_type, code, name] of p.zones) {
        await db.project_zone.create({ company_id: cid, project_id: pid, zone_type, code, name }, { transaction: t });
        bump('zones');
      }
      const storeIds = [];
      for (const [code, name, location_type] of p.stores) {
        const s = await db.store_location.create({ company_id: cid, project_id: pid, code: `${code}`, name, location_type, status: 'active' }, { transaction: t });
        storeIds.push(s.id);
        bump('store_locations');
      }

      // Materials: project stock
      for (const [name, sku, category, unit, qty, cost, used, vendor] of p.materials) {
        await db.material_project_stock.create({
          company_id: cid, project_id: pid, material_master_id: materialMaster[sku].id,
          vendor_id: vendorIds[vendor] || null, name, sku, category, unit_of_measure: unit, stockIn: qty,
          stockUsed: used, cost: String(cost), vendor_name: vendor, project_name: p.name, status: 'active', isActive: true, isDeleted: false,
        }, { transaction: t });
        bump('material_project_stock');
      }

      // Equipment: project stock
      for (const [name, sku, category, qty, inUse, vendor, status] of p.equipment) {
        await db.equipment_project_stock.create({
          company_id: cid, project_id: pid, equipment_master_id: equipmentMaster[sku].id,
          vendor_id: vendorIds[vendor] || null, name, sku, category, stockIn: qty, stockUsed: inUse,
          cost: '0', vendor_name: vendor, project_name: p.name, status: status === 'Available' ? 'active' : 'in_use',
          isActive: true, isDeleted: false,
        }, { transaction: t });
        bump('equipment_project_stock');
      }

      // Labour attendance, last 5 working days
      const attendanceDays = ['2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06'];
      for (const d of attendanceDays) {
        for (const [trade, level, rate] of [['Mason', 'skilled', 1450], ['Bar Bender', 'skilled', 1400], ['Helper', 'unskilled', 800]]) {
          const headcount = trade === 'Helper' ? 18 : 9;
          await db.labour_attendance.create({
            company_id: cid, project_id: pid, attendance_date: d, trade_type: trade, skill_level: level, headcount,
            shift: 'day', vendor_id: vendorIds['Pune Transit Mix Services'] || null, overtime_hours: 0,
            daily_wage_rate: rate, total_cost: headcount * rate,
          }, { transaction: t });
          bump('labour_attendance');
        }
      }

      // DPR (one submitted, one draft)
      await db.dpr.create({
        company_id: cid, project_id: pid, report_date: '2026-11-06', created_by: 1, weather_summary: 'Clear, 31 C',
        work_summary: `Progress on ${p.milestones[1][0]}. Crew mobilised in full.`, total_workforce_count: 45, status: 'submitted',
      }, { transaction: t });
      await db.dpr.create({
        company_id: cid, project_id: pid, report_date: '2026-11-07', created_by: 1, weather_summary: 'Light rain in the afternoon',
        work_summary: 'Draft, pending site engineer review.', total_workforce_count: 42, status: 'draft',
      }, { transaction: t });
      bump('dpr', 2);

      // Snags
      const snags = [
        ['Honeycombing observed on a structural member', 'high', 'Civil'],
        ['Plaster cracks near lobby', 'medium', 'Finishing'],
        ['Door frame out of plumb', 'low', 'Carpentry'],
      ];
      for (const [title, severity, trade] of snags) {
        await db.snag_item.create({ project_id: pid, company_id: cid, title, description: title, trade, severity, status: 'open', location_pin: 'Site zone A' }, { transaction: t });
        bump('snags');
      }

      // Drawings
      const drawings = [
        [`${p.code}-AR-101`, 'General arrangement plan', 'Architectural'],
        [`${p.code}-ST-210`, 'Reinforcement details', 'Structural'],
        [`${p.code}-MEP-330`, 'Riser and shaft layout', 'MEP'],
      ];
      for (const [no, title, discipline] of drawings) {
        await db.drawing_register.create({
          project_id: pid, company_id: cid, drawing_number: no, title, discipline, revision: 'B', status: 'approved_for_construction',
          file_url: `https://files.example.invalid/drawings/${no}.pdf`,
        }, { transaction: t });
        bump('drawings');
      }

      // Cost ledger: one accrual per category, so cost reports are not empty
      const costs = [['labour', 4200000], ['equipment', 1100000], ['subcontractor', 6800000], ['overhead', 900000]];
      for (const [cat, amount] of costs) {
        await db.cost_ledger.create({
          company_id: cid, project_id: pid, cost_category: cat, event_type: 'accrual', source_type: 'mock_seed',
          source_id: `${p.code}-${cat}`, recognition_date: '2026-11-06', amount: Math.round(amount * (p.progress / 40)), quantity: 1,
          rate: amount, currency: 'INR', idempotency_key: `mock-${p.code}-${cat}`,
        }, { transaction: t });
        bump('cost_ledger');
      }
    }
  });

  console.log('Mock data loaded into Supabase:');
  for (const [k, v] of Object.entries(counts)) console.log(`  ${k.padEnd(26)} ${v}`);
}

main()
  .catch((err) => {
    console.error('SEED_FAILED:', err.message);
    process.exitCode = 1;
  })
  .finally(() => db.sequelize.close());
