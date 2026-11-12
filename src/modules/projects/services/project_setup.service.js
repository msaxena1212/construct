"use strict";
/**
 * Project setup and master data (Construction ERP scope, section 03).
 *
 * Every function receives the caller's company_id and never trusts an id from the request body without
 * checking that it belongs to the same company (and, for structure rows, to the same project). Refusals
 * use SetupError with an HTTP status so the controller can answer consistently.
 */
const db = require("../../../models");
const { logProjectHistory } = require("../project.utils");

const CONTRACT_TYPES = Object.freeze(["lump_sum", "item_rate", "cost_plus", "percentage", "epc", "mixed"]);
const CURRENCY_PATTERN = /^[A-Z]{3}$/;
const CODE_PATTERN = /^[A-Z0-9][A-Z0-9_-]{0,39}$/;
const PHASE_STATUSES = Object.freeze(["planned", "active", "completed"]);
const ZONE_TYPES = Object.freeze(["zone", "block", "floor"]);
const PACKAGE_TYPES = Object.freeze(["in_house", "subcontract", "supply"]);
const PACKAGE_STATUSES = Object.freeze(["planned", "active", "completed", "cancelled"]);

class SetupError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.isSetupError = true;
  }
}

const fail = (status, message) => {
  throw new SetupError(status, message);
};

const isBlank = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");

/** Normalises a code to upper case and checks its format. Returns null for an empty optional value. */
function parseCode(value, label, { required = true } = {}) {
  if (isBlank(value)) {
    if (required) fail(400, `${label} is required.`);
    return null;
  }
  const code = String(value).trim().toUpperCase();
  if (!CODE_PATTERN.test(code)) {
    fail(400, `${label} must be 1-40 characters: letters, digits, hyphen or underscore.`);
  }
  return code;
}

function parseName(value, label, max = 200) {
  if (isBlank(value)) fail(400, `${label} is required.`);
  const name = String(value).trim();
  if (name.length > max) fail(400, `${label} must be at most ${max} characters.`);
  return name;
}

function parseDate(value, label) {
  if (isBlank(value)) return null;
  const text = String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || Number.isNaN(Date.parse(`${text}T00:00:00Z`))) {
    fail(400, `${label} must be a valid date (YYYY-MM-DD).`);
  }
  return text;
}

function parseEnum(value, allowed, label, { required = true, fallback = null } = {}) {
  if (isBlank(value)) {
    if (required) fail(400, `${label} is required.`);
    return fallback;
  }
  if (!allowed.includes(value)) fail(400, `${label} must be one of: ${allowed.join(", ")}.`);
  return value;
}

function parseId(value, label, { required = false } = {}) {
  if (isBlank(value)) {
    if (required) fail(400, `${label} is required.`);
    return null;
  }
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) fail(400, `${label} must be a positive integer.`);
  return id;
}

function ensureDateOrder(start, end, startLabel, endLabel) {
  if (start && end && start > end) fail(400, `${endLabel} must not be earlier than ${startLabel}.`);
}

async function loadProject(companyId, projectId) {
  const project = await db.project.findOne({ where: { id: projectId, company_id: companyId } });
  if (!project) fail(404, "Project not found");
  return project;
}

/** Ensures a company master row exists for the caller's company (or null is accepted). */
async function assertCompanyRow(model, companyId, id, label) {
  if (id === null) return null;
  const row = await db[model].findOne({ where: { id, company_id: companyId } });
  if (!row) fail(400, `${label} does not belong to your company.`);
  return row;
}

async function assertCodeFree(model, where, field, value, label) {
  const clash = await db[model].findOne({ where: { ...where, [field]: value } });
  if (clash) fail(409, `${label} code ${value} already exists.`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Project header details
// ─────────────────────────────────────────────────────────────────────────────

/** Parses only the fields present in the request. Absent fields are left unchanged. */
function parseHeaderPatch(body) {
  const patch = {};
  if ("name" in body) patch.name = parseName(body.name, "Project name");
  if ("type" in body) patch.type = parseName(body.type, "Project type", 100);
  if ("project_code" in body) patch.project_code = parseCode(body.project_code, "Project code", { required: false });
  if ("contract_type" in body) {
    patch.contract_type = parseEnum(body.contract_type, CONTRACT_TYPES, "Contract type", { required: false });
  }
  if ("currency" in body) {
    const currency = isBlank(body.currency) ? null : String(body.currency).trim().toUpperCase();
    if (!currency || !CURRENCY_PATTERN.test(currency)) fail(400, "Currency must be a three-letter ISO code, for example INR.");
    patch.currency = currency;
  }
  if ("start_date" in body) patch.start_date = parseDate(body.start_date, "Start date");
  if ("completion_date" in body) {
    const planned = parseDate(body.completion_date, "Planned completion date");
    patch.completion_date = planned ? new Date(`${planned}T00:00:00Z`) : null;
  }
  if ("location_name" in body) patch.location_name = isBlank(body.location_name) ? null : parseName(body.location_name, "Location", 200);
  if ("description" in body) patch.description = isBlank(body.description) ? null : String(body.description).trim();
  if ("client_id" in body) patch.client_id = parseId(body.client_id, "Client", { required: false });
  if ("consultant_id" in body) patch.consultant_id = parseId(body.consultant_id, "Consultant", { required: false });
  if ("project_manager_id" in body) patch.project_manager_id = parseId(body.project_manager_id, "Project manager", { required: false });
  return patch;
}

async function getProjectSetup(companyId, projectId) {
  const project = await db.project.findOne({
    where: { id: projectId, company_id: companyId },
    include: [
      { model: db.client_master, as: "client", attributes: ["id", "name", "code"], required: false },
      { model: db.consultant_master, as: "consultant", attributes: ["id", "name", "code"], required: false },
      { model: db.user, as: "project_manager", attributes: ["id", "firstname", "lastname", "email"], required: false },
    ],
  });
  if (!project) fail(404, "Project not found");

  const scope = { project_id: projectId, company_id: companyId };
  const [phases, zones, disciplines, costCentres, workPackages] = await Promise.all([
    db.project_phase.findAll({ where: scope, order: [["sequence_no", "ASC"], ["id", "ASC"]] }),
    db.project_zone.findAll({ where: scope, order: [["id", "ASC"]] }),
    db.project_discipline.findAll({ where: scope, order: [["code", "ASC"]] }),
    db.project_cost_centre.findAll({ where: scope, order: [["code", "ASC"]] }),
    db.project_work_package.findAll({ where: scope, order: [["package_code", "ASC"]] }),
  ]);

  return {
    project: project.toJSON(),
    structure: {
      phases,
      zones,
      disciplines,
      cost_centres: costCentres,
      work_packages: workPackages,
    },
    counts: {
      phases: phases.length,
      zones: zones.length,
      disciplines: disciplines.length,
      cost_centres: costCentres.length,
      work_packages: workPackages.length,
    },
  };
}

async function updateProjectDetails({ companyId, userId }, projectId, body) {
  const project = await loadProject(companyId, projectId);
  const patch = parseHeaderPatch(body || {});
  if (Object.keys(patch).length === 0) fail(400, "No project details were supplied.");

  // Relationship checks: every referenced master must belong to this company.
  if ("client_id" in patch) await assertCompanyRow("client_master", companyId, patch.client_id, "Client");
  if ("consultant_id" in patch) await assertCompanyRow("consultant_master", companyId, patch.consultant_id, "Consultant");
  if ("project_manager_id" in patch) await assertCompanyRow("user", companyId, patch.project_manager_id, "Project manager");

  const start = "start_date" in patch ? patch.start_date : project.start_date;
  const plannedEnd = "completion_date" in patch ? patch.completion_date : project.completion_date;
  const endText = plannedEnd ? new Date(plannedEnd).toISOString().slice(0, 10) : null;
  ensureDateOrder(start, endText, "start date", "planned completion date");

  if ("project_code" in patch && patch.project_code && patch.project_code !== project.project_code) {
    const clash = await db.project.findOne({ where: { company_id: companyId, project_code: patch.project_code } });
    if (clash && clash.id !== project.id) fail(409, `Project code ${patch.project_code} already exists.`);
  }

  const changed = [];
  for (const [key, value] of Object.entries(patch)) {
    const before = project[key] instanceof Date ? project[key].toISOString() : project[key];
    const after = value instanceof Date ? value.toISOString() : value;
    if (String(before ?? "") !== String(after ?? "")) changed.push(key);
  }

  const t = await db.sequelize.transaction();
  try {
    await project.update(patch, { transaction: t });
    if (changed.length) {
      await logProjectHistory(
        {
          project_id: project.id,
          company_id: companyId,
          user_id: userId,
          action_type: "PROJECT_DETAILS_UPDATED",
          detail: `updated project details: ${changed.join(", ")}`,
          meta: { changed_fields: changed },
        },
        t
      );
    }
    await t.commit();
  } catch (err) {
    await t.rollback();
    if (err.name === "SequelizeUniqueConstraintError") fail(409, "Project code already exists.");
    throw err;
  }
  return getProjectSetup(companyId, projectId);
}

// ─────────────────────────────────────────────────────────────────────────────
// Project structure (phases, zones, disciplines, cost centres, work packages)
// ─────────────────────────────────────────────────────────────────────────────

const STRUCTURE = Object.freeze({
  phases: { model: "project_phase", label: "Phase", history: "PHASE" },
  zones: { model: "project_zone", label: "Zone", history: "ZONE" },
  disciplines: { model: "project_discipline", label: "Discipline", history: "DISCIPLINE" },
  "cost-centres": { model: "project_cost_centre", label: "Cost centre", history: "COST_CENTRE" },
  "work-packages": { model: "project_work_package", label: "Work package", history: "WORK_PACKAGE" },
});

function structureDef(kind) {
  const def = STRUCTURE[kind];
  if (!def) fail(404, "Unknown project structure type");
  return def;
}

/** Validates the body of a structure row. Returns a patch. `current` is the existing row on update. */
async function parseStructurePatch(kind, companyId, projectId, body, current) {
  const def = structureDef(kind);
  const patch = {};
  const has = (k) => Object.prototype.hasOwnProperty.call(body, k);
  const isCreate = !current;

  if (kind === "phases") {
    if (isCreate || has("code")) patch.code = parseCode(body.code, "Phase code");
    if (isCreate || has("name")) patch.name = parseName(body.name, "Phase name");
    if (has("sequence_no")) {
      const seq = Number(body.sequence_no);
      if (!Number.isInteger(seq) || seq < 1 || seq > 9999) fail(400, "Sequence number must be an integer from 1 to 9999.");
      patch.sequence_no = seq;
    } else if (isCreate) patch.sequence_no = 1;
    if (has("planned_start")) patch.planned_start = parseDate(body.planned_start, "Phase planned start");
    if (has("planned_end")) patch.planned_end = parseDate(body.planned_end, "Phase planned end");
    if (has("status") || isCreate) patch.status = parseEnum(body.status, PHASE_STATUSES, "Phase status", { required: false, fallback: "planned" });
    const start = "planned_start" in patch ? patch.planned_start : current && current.planned_start;
    const end = "planned_end" in patch ? patch.planned_end : current && current.planned_end;
    ensureDateOrder(start, end, "phase start", "phase end");
  } else if (kind === "zones") {
    if (isCreate || has("zone_type")) patch.zone_type = parseEnum(body.zone_type, ZONE_TYPES, "Zone type");
    if (isCreate || has("code")) patch.code = parseCode(body.code, "Zone code");
    if (isCreate || has("name")) patch.name = parseName(body.name, "Zone name");
    if (has("parent_id")) {
      const parentId = parseId(body.parent_id, "Parent zone", { required: false });
      if (parentId !== null) {
        if (current && parentId === current.id) fail(400, "A zone cannot be its own parent.");
        const parent = await db.project_zone.findOne({ where: { id: parentId, project_id: projectId, company_id: companyId } });
        if (!parent) fail(400, "Parent zone must belong to this project.");
        // Reject cycles: walk up from the proposed parent.
        let cursor = parent;
        while (cursor && cursor.parent_id) {
          if (current && cursor.parent_id === current.id) fail(400, "This parent would create a cycle in the zone hierarchy.");
          cursor = await db.project_zone.findOne({ where: { id: cursor.parent_id, project_id: projectId, company_id: companyId } });
        }
      }
      patch.parent_id = parentId;
    }
  } else if (kind === "disciplines") {
    if (isCreate || has("code")) patch.code = parseCode(body.code, "Discipline code");
    if (isCreate || has("name")) patch.name = parseName(body.name, "Discipline name");
  } else if (kind === "cost-centres") {
    if (isCreate || has("code")) patch.code = parseCode(body.code, "Cost centre code");
    if (isCreate || has("name")) patch.name = parseName(body.name, "Cost centre name");
  } else if (kind === "work-packages") {
    if (isCreate || has("package_code")) patch.package_code = parseCode(body.package_code, "Work package code");
    if (isCreate || has("name")) patch.name = parseName(body.name, "Work package name");
    if (has("package_type") || isCreate) {
      patch.package_type = parseEnum(body.package_type, PACKAGE_TYPES, "Package type", { required: false, fallback: "in_house" });
    }
    if (has("status") || isCreate) {
      patch.status = parseEnum(body.status, PACKAGE_STATUSES, "Work package status", { required: false, fallback: "planned" });
    }
    const refs = [
      ["phase_id", "phase", "project_phase", "Phase"],
      ["discipline_id", "discipline", "project_discipline", "Discipline"],
      ["zone_id", "zone", "project_zone", "Zone"],
      ["cost_centre_id", "cost_centre", "project_cost_centre", "Cost centre"],
    ];
    for (const [field, , model, label] of refs) {
      if (!has(field)) continue;
      const id = parseId(body[field], label, { required: false });
      if (id !== null) {
        const row = await db[model].findOne({ where: { id, project_id: projectId, company_id: companyId } });
        if (!row) fail(400, `${label} must belong to this project.`);
      }
      patch[field] = id;
    }
    if (has("vendor_id")) {
      const id = parseId(body.vendor_id, "Vendor", { required: false });
      await assertCompanyRow("vendors", companyId, id, "Vendor");
      patch.vendor_id = id;
    }
    const finalType = patch.package_type ?? (current ? current.package_type : "in_house");
    const finalVendor = "vendor_id" in patch ? patch.vendor_id : current ? current.vendor_id : null;
    if (finalType === "subcontract" && !finalVendor) fail(400, "A subcontract package must name its vendor.");
  }
  return { def, patch };
}

async function listStructure(companyId, projectId, kind) {
  const def = structureDef(kind);
  await loadProject(companyId, projectId);
  return db[def.model].findAll({ where: { project_id: projectId, company_id: companyId }, order: [["id", "ASC"]] });
}

async function createStructure({ companyId, userId }, projectId, kind, body) {
  const def = structureDef(kind);
  await loadProject(companyId, projectId);
  const { patch } = await parseStructurePatch(kind, companyId, projectId, body || {}, null);
  const codeField = "package_code" in patch ? "package_code" : "code";
  if (patch[codeField]) await assertCodeFree(def.model, { project_id: projectId }, codeField, patch[codeField], def.label);
  const t = await db.sequelize.transaction();
  try {
    const row = await db[def.model].create({ ...patch, project_id: projectId, company_id: companyId }, { transaction: t });
    await logProjectHistory(
      {
        project_id: projectId,
        company_id: companyId,
        user_id: userId,
        action_type: `${def.history}_CREATED`,
        detail: `created ${def.label.toLowerCase()} ${row.code || row.package_code}`,
        meta: { id: row.id },
      },
      t
    );
    await t.commit();
    return row;
  } catch (err) {
    await t.rollback();
    if (err.name === "SequelizeUniqueConstraintError") fail(409, `${def.label} code already exists in this project.`);
    throw err;
  }
}

async function updateStructure({ companyId, userId }, projectId, kind, id, body) {
  const def = structureDef(kind);
  await loadProject(companyId, projectId);
  const row = await db[def.model].findOne({ where: { id, project_id: projectId, company_id: companyId } });
  if (!row) fail(404, `${def.label} not found`);
  const { patch } = await parseStructurePatch(kind, companyId, projectId, body || {}, row);
  if (Object.keys(patch).length === 0) fail(400, "No changes were supplied.");
  for (const field of ["code", "package_code"]) {
    if (patch[field] && patch[field] !== row[field]) {
      await assertCodeFree(def.model, { project_id: projectId }, field, patch[field], def.label);
    }
  }
  const t = await db.sequelize.transaction();
  try {
    await row.update(patch, { transaction: t });
    await logProjectHistory(
      {
        project_id: projectId,
        company_id: companyId,
        user_id: userId,
        action_type: `${def.history}_UPDATED`,
        detail: `updated ${def.label.toLowerCase()} ${row.code || row.package_code}: ${Object.keys(patch).join(", ")}`,
        meta: { id: row.id, changed_fields: Object.keys(patch) },
      },
      t
    );
    await t.commit();
    return row;
  } catch (err) {
    await t.rollback();
    if (err.name === "SequelizeUniqueConstraintError") fail(409, `${def.label} code already exists in this project.`);
    throw err;
  }
}

/** Refuses deletion while other rows depend on this one, so no link is silently detached. */
async function dependentsOf(kind, id, projectId) {
  const scope = { project_id: projectId };
  if (kind === "phases") return db.project_work_package.count({ where: { ...scope, phase_id: id } });
  if (kind === "zones") {
    return (await db.project_zone.count({ where: { ...scope, parent_id: id } })) +
      (await db.project_work_package.count({ where: { ...scope, zone_id: id } }));
  }
  if (kind === "disciplines") return db.project_work_package.count({ where: { ...scope, discipline_id: id } });
  if (kind === "cost-centres") return db.project_work_package.count({ where: { ...scope, cost_centre_id: id } });
  return 0;
}

async function deleteStructure({ companyId, userId }, projectId, kind, id) {
  const def = structureDef(kind);
  await loadProject(companyId, projectId);
  const row = await db[def.model].findOne({ where: { id, project_id: projectId, company_id: companyId } });
  if (!row) fail(404, `${def.label} not found`);
  const dependents = await dependentsOf(kind, id, projectId);
  if (dependents > 0) fail(409, `${def.label} is used by ${dependents} other record(s) and cannot be deleted.`);
  const label = row.code || row.package_code;
  const t = await db.sequelize.transaction();
  try {
    await row.destroy({ transaction: t });
    await logProjectHistory(
      {
        project_id: projectId,
        company_id: companyId,
        user_id: userId,
        action_type: `${def.history}_DELETED`,
        detail: `deleted ${def.label.toLowerCase()} ${label}`,
        meta: { id },
      },
      t
    );
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Company masters: clients and consultants
// ─────────────────────────────────────────────────────────────────────────────

const MASTERS = Object.freeze({
  clients: { model: "client_master", label: "Client", projectField: "client_id" },
  consultants: { model: "consultant_master", label: "Consultant", projectField: "consultant_id" },
});

function masterDef(kind) {
  const def = MASTERS[kind];
  if (!def) fail(404, "Unknown master type");
  return def;
}

function parseMasterPatch(body, isCreate) {
  const patch = {};
  const has = (k) => Object.prototype.hasOwnProperty.call(body, k);
  if (isCreate || has("name")) patch.name = parseName(body.name, "Name");
  if (has("code") || isCreate) patch.code = parseCode(body.code, "Code", { required: false });
  if (has("contact_person")) patch.contact_person = isBlank(body.contact_person) ? null : String(body.contact_person).trim().slice(0, 150);
  if (has("email")) {
    const email = isBlank(body.email) ? null : String(body.email).trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, "Email address is not valid.");
    patch.email = email;
  }
  if (has("phone")) patch.phone = isBlank(body.phone) ? null : String(body.phone).trim().slice(0, 40);
  if (has("address")) patch.address = isBlank(body.address) ? null : String(body.address).trim();
  return patch;
}

async function listMasters(companyId, kind) {
  const def = masterDef(kind);
  return db[def.model].findAll({ where: { company_id: companyId }, order: [["name", "ASC"]] });
}

async function createMaster(companyId, kind, body) {
  const def = masterDef(kind);
  const patch = parseMasterPatch(body || {}, true);
  if (patch.code) await assertCodeFree(def.model, { company_id: companyId }, "code", patch.code, def.label);
  const clash = await db[def.model].findOne({ where: { company_id: companyId, name: patch.name } });
  if (clash) fail(409, `${def.label} ${patch.name} already exists.`);
  return db[def.model].create({ ...patch, company_id: companyId });
}

async function updateMaster(companyId, kind, id, body) {
  const def = masterDef(kind);
  const row = await db[def.model].findOne({ where: { id, company_id: companyId } });
  if (!row) fail(404, `${def.label} not found`);
  const patch = parseMasterPatch(body || {}, false);
  if (Object.keys(patch).length === 0) fail(400, "No changes were supplied.");
  if (patch.code && patch.code !== row.code) await assertCodeFree(def.model, { company_id: companyId }, "code", patch.code, def.label);
  if (patch.name && patch.name !== row.name) {
    const clash = await db[def.model].findOne({ where: { company_id: companyId, name: patch.name } });
    if (clash) fail(409, `${def.label} ${patch.name} already exists.`);
  }
  await row.update(patch);
  return row;
}

async function deleteMaster(companyId, kind, id) {
  const def = masterDef(kind);
  const row = await db[def.model].findOne({ where: { id, company_id: companyId } });
  if (!row) fail(404, `${def.label} not found`);
  const used = await db.project.count({ where: { company_id: companyId, [def.projectField]: id } });
  if (used > 0) fail(409, `${def.label} is linked to ${used} project(s) and cannot be deleted.`);
  await row.destroy();
}

module.exports = {
  SetupError,
  CONTRACT_TYPES,
  STRUCTURE,
  MASTERS,
  getProjectSetup,
  updateProjectDetails,
  listStructure,
  createStructure,
  updateStructure,
  deleteStructure,
  listMasters,
  createMaster,
  updateMaster,
  deleteMaster,
};
