#!/usr/bin/env node
'use strict';
/**
 * Makes every demo project carry data in every project tab (Overview, Tasks, Timeline, Budget, BOQ, DPR, Labour,
 * Drawings, Snags, MB & Billing, Variations, Files), and adds the schedule depth: sub-milestones under each
 * milestone, sub-tasks under each task, task-to-sub-milestone links and task dependencies.
 *
 * Idempotent: it only adds what is missing, so it can be run after seed-india-demo-10-projects.js and run again.
 * Same guard as the other demo seeds: isolated_test + sqlite + an existing *.disposable.sqlite in _sqlite_work\tests.
 *
 * Usage (Git Bash):
 *   export DB_TARGET_CLASS=isolated_test DB_DIALECT=sqlite DB_STORAGE="E:/Port/Construction/_sqlite_work/tests/<file>.disposable.sqlite"
 *   export DB_HOST= DB_NAME= DB_USER= DB_PASSWORD= DB_PORT=
 *   node scripts/demo/seed-india-demo-coverage.js
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
const { LIB } = require('./lib/india-demo-library');

const iso = (d) => new Date(d).toISOString().slice(0, 10);
const addDays = (d, n) => new Date(new Date(d).getTime() + n * 86400000);
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const round = (n) => Math.round(n);
const TODAY = new Date('2026-11-09T00:00:00Z');

const failures = [];
const added = {}; // added[projectLabel][tab] = rows created
let ok = 0;

async function mk(label, tab, what, fn) {
  try {
    const row = await fn();
    ok += 1;
    added[label] = added[label] || {};
    added[label][tab] = (added[label][tab] || 0) + 1;
    return row;
  } catch (err) {
    failures.push({ project: label, tab, what, message: err.message });
    return null;
  }
}

const SUB_MILESTONES = {
  building: [['Excavation and PCC', 'Footing and raft', 'Plinth beam and backfilling'], ['Columns and shear walls', 'Slab casting', 'Staircase and lift core'], ['Electrical conduits', 'Plumbing and drainage', 'Fire-fighting piping'], ['Plastering and flooring', 'Painting and fixtures', 'Inspection and handover']],
  infra: [['Topographic survey', 'Utility shifting', 'Site clearance and fencing'], ['Pile boring and concreting', 'Pile cap', 'Pier shaft'], ['Girder erection', 'Deck slab casting', 'Wearing coat and drainage'], ['Load testing', 'Road furniture and markings', 'Final inspection']],
  industrial: [['Land levelling', 'Soil investigation', 'Foundation excavation'], ['Column erection', 'Roof truss and purlins', 'Wall cladding'], ['Piping erection', 'Cable laying and termination', 'Equipment installation'], ['Hydro testing', 'Pre-commissioning checks', 'Performance trial run']],
};
const SUB_TASK_STEPS = ['Plan and obtain approvals', 'Execute the work on site', 'Quality check and sign-off'];
const WEATHER = ['Clear', 'Partly cloudy', 'Light rain in the afternoon', 'Hot and humid', 'Overcast', 'Clear', 'Clear'];

const libFor = (type) => (type === 'infrastructure' ? 'infra' : type === 'industrial' ? 'industrial' : 'building');

async function main() {
  await db.sequelize.query('PRAGMA synchronous = OFF');
  const admin = await db.user.findOne({ where: { email: 'admin@sahyadri-demo.test' } });
  const planner = await db.user.findOne({ where: { email: 'planner@sahyadri-demo.test' } });
  const accounts = await db.user.findOne({ where: { email: 'accounts@sahyadri-demo.test' } });
  if (!admin || !planner || !accounts) throw new Error('the demo users are missing; run seed-india-demo.js first');
  const companyId = admin.company_id;
  const companyVendors = await db.vendors.findAll({ where: { company_id: companyId }, order: [['id', 'ASC']] });

  // Tidy fields the very first seed could not set on projects 1 and 2 (only where still unset)
  const tidy = async (what, sql) => { try { await db.sequelize.query(sql); ok += 1; } catch (e) { failures.push({ project: 'existing', tab: 'tidy', what, message: e.message }); } };
  await tidy('snag enums', "UPDATE SNAG_ITEMS SET severity = lower(severity), status = replace(lower(status), ' ', '_') WHERE severity IN ('High','Medium','Low','Critical') OR status IN ('Open','In Progress','Resolved','Closed')");
  await tidy('drawing status', "UPDATE DRAWING_REGISTER SET status = 'approved_for_construction' WHERE status = 'Approved'");
  await tidy('attendance headcount', "UPDATE LABOUR_ATTENDANCE SET headcount = CASE trade_type WHEN 'Mason' THEN CASE project_id WHEN 1 THEN 38 ELSE 24 END WHEN 'Carpenter' THEN 22 WHEN 'Bar Bender' THEN 16 ELSE headcount END WHERE project_id IN (1,2) AND headcount = 1");
  await tidy('project 1 and 2 roll-up', "UPDATE PROJECT SET progress = CASE id WHEN 1 THEN 62 ELSE 38 END, budget_used = CASE id WHEN 1 THEN 27500000 ELSE 14500000 END, status = CASE id WHEN 1 THEN 'On Track' ELSE 'Delayed' END, project_code = CASE id WHEN 1 THEN 'HSR' ELSE 'NRF' END, start_date = CASE id WHEN 1 THEN '2025-01-10' ELSE '2026-01-01' END, project_manager_id = " + planner.id + " WHERE id IN (1,2) AND progress = 0");

  const projects = await db.project.findAll({ where: { company_id: companyId }, order: [['id', 'ASC']] });
  const report = [];

  for (const p of projects) {
    const pid = p.id;
    const code = p.project_code || `P${pid}`;
    const label = `${pid} ${code}`;
    const key = libFor(p.type);
    const lib = LIB[key];
    const count = (model, where = {}) => db[model].count({ where: { project_id: pid, ...where } });
    const pVendors = companyVendors.filter((v) => v.project_id === pid);
    const vendors = pVendors.length ? pVendors : companyVendors.slice(0, 2);
    const v1 = vendors[0];
    const v2 = vendors[1] || vendors[0];
    const progress = Number(p.progress || 0);
    const budget = Number(p.budget_total || 0);

    // ---- Overview: team and description --------------------------------------------------------------------
    if ((await count('project_team')) === 0) {
      for (const [u, role] of [[admin, 'Project Director'], [planner, 'Project Manager'], [accounts, 'Billing Engineer']]) {
        await mk(label, 'overview', `team ${role}`, () => db.project_team.create({ project_id: pid, user_id: u.id, role }));
      }
    }
    if (!p.description) await p.update({ description: `${p.name}. ${p.address || ''}`.trim() });

    // ---- Timeline: top-level milestones, then sub-milestones -----------------------------------------------
    let milestones = await db.milestone.findAll({ where: { project_id: pid, parent_id: null }, order: [['id', 'ASC']] });
    while (milestones.length < 4) {
      const last = milestones[milestones.length - 1];
      const start = last?.endDate ? addDays(last.endDate, 1) : new Date(p.start_date || TODAY);
      const i = milestones.length;
      const prog = clamp(round(progress * 4 - i * 100), 0, 100);
      const row = await mk(label, 'timeline', `milestone ${lib.milestones[i]}`, () => db.milestone.create({
        project_id: pid, name: lib.milestones[i], phase: i === 3 ? 'Closeout' : 'Execution', progress: prog,
        status: prog === 100 ? 'Completed' : prog > 0 ? 'In Progress' : 'Not Started', startDate: iso(start), endDate: iso(addDays(start, 180)),
      }));
      if (!row) break;
      milestones.push(row);
    }
    const subsByParent = {};
    for (const [i, ms] of milestones.entries()) {
      const existing = await db.milestone.findAll({ where: { project_id: pid, parent_id: ms.id }, order: [['id', 'ASC']] });
      if (existing.length === 0) {
        const names = (SUB_MILESTONES[key][i % 4]);
        const start = new Date(ms.startDate || p.start_date || TODAY);
        const end = new Date(ms.endDate || addDays(start, 120));
        const span = Math.max(3, (end - start) / 86400000);
        for (const [j, name] of names.entries()) {
          const parentProg = Number(ms.progress || 0);
          const done = parentProg === 100 ? 100 : clamp(round(parentProg * 3 - j * 100), 0, 100);
          const row = await mk(label, 'timeline', `sub-milestone ${name}`, () => db.milestone.create({
            project_id: pid, parent_id: ms.id, name, phase: ms.phase || 'Execution', progress: done,
            status: done === 100 ? 'Completed' : done > 0 ? 'In Progress' : 'Not Started',
            startDate: iso(addDays(start, (span / 3) * j)), endDate: iso(addDays(start, (span / 3) * (j + 1))),
          }));
          if (row) (subsByParent[ms.id] = subsByParent[ms.id] || []).push(row);
        }
      } else {
        subsByParent[ms.id] = existing;
      }
    }

    // ---- Tasks: at least six, linked to a milestone and a sub-milestone, with sub-tasks and dependencies ----
    let tasks = await db.project_task.findAll({ where: { project_id: pid }, order: [['id', 'ASC']] });
    const activeIdx = Math.min(3, Math.floor(progress / 25));
    const taskTitles = new Set(tasks.map((t) => t.title));
    for (const [i, [title, priority]] of lib.tasks.entries()) {
      if (tasks.length >= 6) break;
      if (taskTitles.has(title)) continue;
      const status = progress === 100 ? 'Completed' : i < 2 ? 'In Progress' : i === 2 ? 'Review' : i % 2 ? 'Completed' : 'To Do';
      const row = await mk(label, 'tasks', title, () => db.project_task.create({
        project_id: pid, milestone_id: milestones[activeIdx]?.id || null, title, description: `${title} (${p.name}).`, priority, status,
        progress: status === 'Completed' ? 100 : status === 'Review' ? 90 : status === 'In Progress' ? 40 + i * 10 : 0, created_by: planner.id,
        due_date: addDays(TODAY, status === 'Completed' ? -10 : 5 + i * 6),
      }));
      if (row) { tasks.push(row); taskTitles.add(title); }
    }
    for (const [i, t] of tasks.entries()) {
      // Link each task to a milestone and one of its sub-milestones
      const ms = milestones.find((m) => m.id === t.milestone_id) || milestones[Math.min(activeIdx, milestones.length - 1)];
      const subs = subsByParent[ms?.id] || [];
      const patch = {};
      if (!t.milestone_id && ms) patch.milestone_id = ms.id;
      if (!t.submilestone_id && subs.length) patch.submilestone_id = subs[i % subs.length].id;
      if (Object.keys(patch).length) { await t.update(patch); ok += 1; added[label] = added[label] || {}; added[label].tasks = added[label].tasks || 0; }
      // Sub-tasks
      if ((await db.project_sub_task.count({ where: { task_id: t.id } })) === 0) {
        const taskProg = Number(t.progress || 0);
        for (const [j, step] of SUB_TASK_STEPS.entries()) {
          const done = t.status === 'Completed' || taskProg >= (j + 1) * 33;
          const startOffset = (t.due_date ? Math.round((new Date(t.due_date) - TODAY) / 86400000) : 7) - 12 + j * 4;
          await mk(label, 'tasks', `sub-task ${t.title} / ${step}`, () => db.project_sub_task.create({
            task_id: t.id, title: step, completed: done, itemName: lib.materials[(i + j) % lib.materials.length][0], materialQty: 20 + ((i * 7 + j * 5) % 60),
            equipmentQty: j === 1 ? 1 : 0, no_of_labor: j === 1 ? 6 + ((i * 3) % 14) : 2, startDate: iso(addDays(TODAY, startOffset)), endDate: iso(addDays(TODAY, startOffset + 3)),
          }));
        }
      }
    }

    // Schedule shape: a diamond (task 2 and 3 both follow 1, task 4 needs both) then two finishing tasks, one of them
    // linked start-to-start with a 2-day lag. Sub-task spacing differs per task so durations differ, which makes the
    // critical path a real subset of the tasks. Deterministic, so a re-run leaves the same shape.
    const shaped = tasks.slice(0, 6);
    if (shaped.length === 6) {
      const spacing = [3, 6, 2, 4, 3, 2];
      for (const [i, t] of shaped.entries()) {
        const subs = await db.project_sub_task.findAll({ where: { task_id: t.id }, order: [['id', 'ASC']] });
        if (subs.length === 0) continue;
        const first = new Date(subs[0].startDate);
        for (const [j, s] of subs.entries()) {
          const start = iso(addDays(first, j * spacing[i]));
          const end = iso(addDays(first, j * spacing[i] + 3));
          if (s.startDate !== start || s.endDate !== end) await s.update({ startDate: start, endDate: end });
        }
      }
      const links = [[1, 0, 'FS', 0], [2, 0, 'FS', 0], [3, 1, 'FS', 0], [3, 2, 'FS', 0], [4, 3, 'FS', 0], [5, 3, 'SS', 2]];
      await db.project_task_dependency.destroy({ where: { task_id: shaped.map((t) => t.id) } });
      for (const [ti, pi, type, lag] of links) {
        await mk(label, 'timeline', `dependency ${shaped[ti].id}<-${shaped[pi].id}`, () => db.project_task_dependency.create({ task_id: shaped[ti].id, predecessor_id: shaped[pi].id, type, lag }));
      }
    }

    // ---- BOQ: at least five lines ---------------------------------------------------------------------------
    let boqCount = await count('boq_item', { isDeleted: false });
    if (boqCount < 5 && budget > 0) {
      const have = new Set((await db.boq_item.findAll({ where: { project_id: pid }, attributes: ['item_code'] })).map((b) => b.item_code));
      for (const [bc, description, unit, rate, share] of lib.boq) {
        if (boqCount >= 5) break;
        if (have.has(`${code}-${bc}`)) continue;
        const qty = Math.max(1, round((budget * share) / rate));
        const executed = round(qty * clamp(progress / 100, 0, 1));
        const row = await mk(label, 'boq', bc, () => db.boq_item.create({
          project_id: pid, company_id: companyId, item_code: `${code}-${bc}`, description, category: lib.wbs[boqCount % lib.wbs.length], unit, estimated_qty: qty, unit_rate: rate,
          total_estimated_amount: qty * rate, executed_qty: executed, billed_amount: round(executed * rate * 0.9),
        }));
        if (row) boqCount += 1;
      }
    }

    // ---- DPR: the last seven days -----------------------------------------------------------------------------
    const days = [...Array(7).keys()].map((n) => iso(addDays(TODAY, -(6 - n))));
    const labourScale = clamp(round((budget || 40000000) / 40000000), 6, 60);
    const dprRows = await db.dpr.findAll({ where: { project_id: pid } });
    for (const d of dprRows) {
      if (!d.work_summary) { await d.update({ work_summary: 'Shuttering and reinforcement for the next pour continued. Two MEP shafts blocked by a pending drawing revision.', weather_summary: d.weather_summary || 'Clear', total_workforce_count: d.total_workforce_count || labourScale * 3, status: d.status === 'draft' ? 'submitted' : d.status }); ok += 1; }
    }
    const haveDays = new Set(dprRows.map((d) => iso(d.report_date)));
    for (const [di, day] of days.entries()) {
      if (haveDays.has(day)) continue;
      const work = lib.works[di % lib.works.length];
      const qty = 30 + ((di * 17) % 80);
      const unit = lib.boq[di % lib.boq.length][2];
      const dpr = await mk(label, 'dpr', day, () => db.dpr.create({
        report_date: day, project_id: pid, company_id: companyId, created_by: planner.id, weather_summary: WEATHER[di % WEATHER.length],
        work_summary: `${work} continued at ${p.name}. ${qty} ${unit} completed today; ${di % 3 === 0 ? 'minor delay due to material delivery' : 'work proceeded as planned'}. Safety briefing held at 8:00 am.`,
        total_workforce_count: labourScale * 3 + di, status: di < 5 ? 'approved' : 'submitted',
      }));
      if (dpr) {
        await mk(label, 'dpr', `${day} item`, () => db.dpr_work_item.create({
          dpr_id: dpr.id, milestone_id: milestones[activeIdx]?.id || null, location_grid: 'Zone A', quantity_executed: qty, unit, description: work,
          progress_percentage: clamp(progress + di, 5, 100), status: 'in_progress',
        }));
      }
    }

    // ---- Labour: seven days x three trades --------------------------------------------------------------------
    const labourHave = new Set((await db.labour_attendance.findAll({ where: { project_id: pid }, attributes: ['attendance_date', 'trade_type'] })).map((r) => `${iso(r.attendance_date)}|${r.trade_type}`));
    for (const [di, day] of days.entries()) {
      for (const [ti, [trade, level, wage]] of lib.trades.slice(0, 3).entries()) {
        if (labourHave.has(`${day}|${trade}`)) continue;
        const head = labourScale + ((di * 3 + ti * 5) % 9) - (ti === 2 ? 4 : 0);
        await mk(label, 'labour', `${day} ${trade}`, () => db.labour_attendance.create({
          project_id: pid, company_id: companyId, attendance_date: day, trade_type: trade, skill_level: level, headcount: head, shift: 'day', vendor_id: (ti % 2 ? v2 : v1)?.id || null,
          overtime_hours: di % 3 === 0 ? 2 * ti : 0, daily_wage_rate: wage, total_cost: head * wage,
        }));
      }
    }

    // ---- Drawings: at least four -----------------------------------------------------------------------------
    let drawCount = await count('drawing_register', { isDeleted: false });
    for (const [i, [no, title, discipline]] of lib.drawings.entries()) {
      if (drawCount >= 4) break;
      const row = await mk(label, 'drawings', no, () => db.drawing_register.create({
        project_id: pid, company_id: companyId, drawing_number: `${code}-${no}`, title: `${title}, ${p.name}`, discipline, revision: ['R2', 'R1', 'R3', 'R0'][i],
        status: i === 3 ? 'under_review' : 'approved_for_construction', file_url: `https://files.sahyadri-demo.test/drawings/${code}-${no}.pdf`, uploaded_by: planner.id,
      }));
      if (row) drawCount += 1;
    }

    // ---- Snags: at least four ---------------------------------------------------------------------------------
    let snagCount = await count('snag_item', { isDeleted: false });
    const snagTitles = new Set((await db.snag_item.findAll({ where: { project_id: pid }, attributes: ['title'] })).map((s) => s.title));
    for (const [i, [title, severity, trade, location]] of lib.snags.entries()) {
      if (snagCount >= 4) break;
      if (snagTitles.has(title)) continue;
      const status = progress === 100 ? 'closed' : i === 0 ? 'open' : i === 1 ? 'in_progress' : i === 2 ? 'resolved' : 'open';
      const row = await mk(label, 'snags', title, () => db.snag_item.create({
        project_id: pid, company_id: companyId, title, description: `${title}. Raised during the weekly quality walk at ${p.name}.`, location_pin: location, trade, severity, status,
        assigned_to: planner.id, vendor_id: (i % 2 ? v2 : v1)?.id || null, due_date: iso(addDays(TODAY, 7 + i * 5)),
      }));
      if (row) snagCount += 1;
    }

    // ---- MB & Billing: a certified measurement book with items, and two RA bills ------------------------------
    let mb = await db.measurement_book.findOne({ where: { project_id: pid }, order: [['id', 'ASC']] });
    const boqRows = await db.boq_item.findAll({ where: { project_id: pid, isDeleted: false }, order: [['id', 'ASC']], limit: 3 });
    if (!mb && boqRows.length) {
      mb = await mk(label, 'mb_billing', 'measurement book', () => db.measurement_book.create({
        mb_number: `MB-${code}-001`, company_id: companyId, project_id: pid, vendor_id: v1?.id || null, title: `${lib.boq[0][1]} - measurement to date`, measurement_date: '2026-10-31',
        period_start: '2026-10-01', period_end: '2026-10-31', status: 'certified', created_by: planner.id, certified_by: admin.id, certified_at: new Date('2026-11-02T10:00:00Z'),
      }));
      let total = 0;
      for (const [i, boq] of boqRows.entries()) {
        const measured = Math.max(1, round(Number(boq.estimated_qty || 10) * 0.06 * (i + 1) / 2));
        const rate = Number(boq.unit_rate || 1);
        total += measured * rate;
        await mk(label, 'mb_billing', `item ${boq.item_code}`, () => db.measurement_book_item.create({
          mb_id: mb?.id, company_id: companyId, project_id: pid, boq_item_id: boq.id, item_number: String(i + 1), work_description: `${boq.description}, October measurement`, location_reference: 'Zone A',
          calculation_method: 'direct', measured_qty: measured, unit: boq.unit, contract_rate: rate, measured_amount: measured * rate, certified_qty: measured, certified_amount: measured * rate, status: 'certified',
        }));
      }
      if (mb) await mb.update({ total_measured_amount: total });
    }
    if ((await count('contractor_ra_bill')) < 2 && v1) {
      const base = mb ? Number(mb.total_measured_amount || 0) : 0;
      const grossBase = base > 0 ? base : round(budget * 0.02);
      for (const ra of [
        { no: 1, vendor: v1, gross: round(grossBase * 0.8), status: 'approved', start: '2026-09-01', end: '2026-09-30' },
        { no: 2, vendor: v2, gross: round(grossBase * 0.45), status: 'submitted', start: '2026-10-01', end: '2026-10-31' },
      ]) {
        const exists = await db.contractor_ra_bill.count({ where: { company_id: companyId, ra_bill_number: `RA-${code}-00${ra.no}` } });
        if (exists) continue;
        const retention = round(ra.gross * 0.05);
        const tds = round(ra.gross * 0.02);
        await mk(label, 'mb_billing', `RA-${ra.no}`, () => db.contractor_ra_bill.create({
          ra_bill_number: `RA-${code}-00${ra.no}`, company_id: companyId, project_id: pid, vendor_id: ra.vendor.id, billing_period_start: ra.start, billing_period_end: ra.end, previous_cumulative_amount: 0,
          current_period_gross_amount: ra.gross, cumulative_gross_amount: ra.gross, retention_rate_pct: 5, retention_amount: retention, tds_rate_pct: 2, tds_amount: tds, other_deductions_amount: 0,
          net_payable_amount: ra.gross - retention - tds, status: ra.status, prepared_by: planner.id, approved_by: ra.status === 'approved' ? admin.id : null,
          approved_at: ra.status === 'approved' ? new Date('2026-10-12T09:00:00Z') : null, idempotency_key: `COVER-RA-${code}-${ra.no}`,
        }));
      }
    }

    // ---- Variations: at least two -------------------------------------------------------------------------------
    let voCount = await count('variation_order');
    const voSpecs = [
      { no: '01', title: 'Additional scope requested by the client', status: 'approved', delta: 0.012, days: 10 },
      { no: '02', title: 'Design change after consultant review', status: 'submitted', delta: 0.008, days: 14 },
    ];
    for (const vs of voSpecs) {
      if (voCount >= 2) break;
      const number = `VO-${code}-${vs.no}`;
      if (await db.variation_order.count({ where: { project_id: pid, variation_number: number } })) continue;
      const amount = round((budget || 40000000) * vs.delta);
      const vo = await mk(label, 'variations', number, () => db.variation_order.create({
        variation_number: number, company_id: companyId, project_id: pid, change_type: 'client_variation', category: 'addition', title: vs.title,
        description: `${vs.title}. Cost and time impact assessed against the approved baseline.`, status: vs.status, proposed_amount: amount, approved_amount: vs.status === 'approved' ? amount : 0,
        net_cost_impact: amount, net_revenue_impact: round(amount * 1.1), time_extension_days_requested: vs.days, time_extension_days_approved: vs.status === 'approved' ? vs.days : 0,
        submission_date: iso(addDays(TODAY, -30)), created_by: planner.id, approved_by: vs.status === 'approved' ? admin.id : null, approval_date: vs.status === 'approved' ? new Date('2026-10-22T10:00:00Z') : null,
      }));
      if (vo) {
        voCount += 1;
        const boq = boqRows[vs.no === '01' ? 0 : 1] || boqRows[0];
        const rate = Number(boq?.unit_rate || 1);
        const qty = Math.max(1, round(amount / rate));
        await mk(label, 'variations', `${number} item`, () => db.variation_order_item.create({
          variation_order_id: vo.id, company_id: companyId, project_id: pid, boq_item_id: boq?.id || null, item_code: boq?.item_code, description: boq?.description || 'Additional work',
          unit: boq?.unit || 'lot', proposed_delta_qty: qty, proposed_rate: rate, proposed_delta_amount: qty * rate, approved_delta_qty: vs.status === 'approved' ? qty : 0,
          approved_rate: vs.status === 'approved' ? rate : 0, approved_delta_amount: vs.status === 'approved' ? qty * rate : 0,
        }));
      }
    }

    // ---- Files: at least three ----------------------------------------------------------------------------------
    let fileCount = await count('project_document');
    for (const name of [`Contract agreement, ${p.name}`, `Approved baseline programme, ${p.name}`, `Quality assurance plan, ${p.name}`]) {
      if (fileCount >= 3) break;
      const exists = await db.project_document.count({ where: { project_id: pid, name } });
      if (exists) continue;
      const row = await mk(label, 'files', name, () => db.project_document.create({
        name, size: `${(1.2 + (name.length % 30) / 10).toFixed(1)} MB`, url: `https://files.sahyadri-demo.test/docs/${code}-${name.split(',')[0].toLowerCase().replace(/[^a-z]+/g, '-')}.pdf`, mimetype: 'application/pdf', project_id: pid,
      }));
      if (row) fileCount += 1;
    }

    report.push(label);
  }

  console.log(JSON.stringify({ projects_processed: report.length, steps_ok: ok, steps_failed: failures.length, added, failures: failures.slice(0, 40) }, null, 2));
}

main()
  .then(() => db.sequelize.close())
  .catch(async (err) => {
    console.error('SEED_FAILED', err.message);
    await db.sequelize.close();
    process.exit(1);
  });
