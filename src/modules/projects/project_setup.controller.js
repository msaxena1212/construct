"use strict";
/**
 * HTTP layer for project setup and master data. Business rules live in services/project_setup.service.js.
 * Every handler scopes by the caller's company and maps SetupError to its status code. Unexpected errors
 * are logged on the server and answered without internal detail.
 */
const service = require("./services/project_setup.service");

const CRUD_KINDS = Object.keys(service.STRUCTURE);
const MASTER_KINDS = Object.keys(service.MASTERS);

function respondError(res, err, context) {
  if (err && err.isSetupError) {
    return res.status(err.status).json({ status: "failed", message: err.message });
  }
  console.error(`[PROJECT_SETUP_${context}]`, err);
  return res.status(500).json({ status: "failed", message: "Internal Server Error" });
}

const companyOf = (req) => req.user.company_id;

function getSetup(req, res) {
  return service
    .getProjectSetup(companyOf(req), req.params.projectId)
    .then((data) => res.status(200).json({ status: "success", data }))
    .catch((err) => respondError(res, err, "GET_SETUP"));
}

function updateDetails(req, res) {
  return service
    .updateProjectDetails({ companyId: companyOf(req), userId: req.user.id }, req.params.projectId, req.body)
    .then((data) => res.status(200).json({ status: "success", message: "Project details updated.", data }))
    .catch((err) => respondError(res, err, "UPDATE_DETAILS"));
}

function listStructure(kind) {
  return (req, res) =>
    service
      .listStructure(companyOf(req), req.params.projectId, kind)
      .then((rows) => res.status(200).json({ status: "success", data: rows }))
      .catch((err) => respondError(res, err, `LIST_${kind.toUpperCase()}`));
}

function createStructure(kind) {
  return (req, res) =>
    service
      .createStructure({ companyId: companyOf(req), userId: req.user.id }, req.params.projectId, kind, req.body)
      .then((row) => res.status(201).json({ status: "success", data: row }))
      .catch((err) => respondError(res, err, `CREATE_${kind.toUpperCase()}`));
}

function updateStructure(kind) {
  return (req, res) =>
    service
      .updateStructure({ companyId: companyOf(req), userId: req.user.id }, req.params.projectId, kind, req.params.id, req.body)
      .then((row) => res.status(200).json({ status: "success", data: row }))
      .catch((err) => respondError(res, err, `UPDATE_${kind.toUpperCase()}`));
}

function deleteStructure(kind) {
  return (req, res) =>
    service
      .deleteStructure({ companyId: companyOf(req), userId: req.user.id }, req.params.projectId, kind, req.params.id)
      .then(() => res.status(200).json({ status: "success", message: "Deleted." }))
      .catch((err) => respondError(res, err, `DELETE_${kind.toUpperCase()}`));
}

function listMaster(kind) {
  return (req, res) =>
    service
      .listMasters(companyOf(req), kind)
      .then((rows) => res.status(200).json({ status: "success", data: rows }))
      .catch((err) => respondError(res, err, `LIST_${kind.toUpperCase()}`));
}

function createMaster(kind) {
  return (req, res) =>
    service
      .createMaster(companyOf(req), kind, req.body)
      .then((row) => res.status(201).json({ status: "success", data: row }))
      .catch((err) => respondError(res, err, `CREATE_${kind.toUpperCase()}`));
}

function updateMaster(kind) {
  return (req, res) =>
    service
      .updateMaster(companyOf(req), kind, req.params.id, req.body)
      .then((row) => res.status(200).json({ status: "success", data: row }))
      .catch((err) => respondError(res, err, `UPDATE_${kind.toUpperCase()}`));
}

function deleteMaster(kind) {
  return (req, res) =>
    service
      .deleteMaster(companyOf(req), kind, req.params.id)
      .then(() => res.status(200).json({ status: "success", message: "Deleted." }))
      .catch((err) => respondError(res, err, `DELETE_${kind.toUpperCase()}`));
}

module.exports = {
  getSetup,
  updateDetails,
  listStructure,
  createStructure,
  updateStructure,
  deleteStructure,
  listMaster,
  createMaster,
  updateMaster,
  deleteMaster,
  CRUD_KINDS,
  MASTER_KINDS,
};
