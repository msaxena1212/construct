"use strict";
/**
 * Project setup routes: header details, structure rows and company masters.
 * Permissions reuse the "projects" module (read, create, update, delete). Project-scoped routes pass the
 * project access guard, which rejects projects outside the caller's company (404) before any handler runs.
 */
const ctrl = require("./project_setup.controller");
const checkPermission = require("../../core/middleware/permission.middleware");
const requireProjectAccess = require("../../core/middleware/project_access.middleware");

module.exports = (router) => {
  router.get("/projects/:projectId/setup", checkPermission("projects", "can_read"), requireProjectAccess, ctrl.getSetup);
  router.put("/projects/:projectId/details", checkPermission("projects", "can_update"), requireProjectAccess, ctrl.updateDetails);

  for (const kind of ctrl.CRUD_KINDS) {
    const base = `/projects/:projectId/${kind}`;
    router.get(base, checkPermission("projects", "can_read"), requireProjectAccess, ctrl.listStructure(kind));
    router.post(base, checkPermission("projects", "can_create"), requireProjectAccess, ctrl.createStructure(kind));
    router.put(`${base}/:id`, checkPermission("projects", "can_update"), requireProjectAccess, ctrl.updateStructure(kind));
    router.delete(`${base}/:id`, checkPermission("projects", "can_delete"), requireProjectAccess, ctrl.deleteStructure(kind));
  }

  for (const kind of ctrl.MASTER_KINDS) {
    router.get(`/${kind}`, checkPermission("projects", "can_read"), ctrl.listMaster(kind));
    router.post(`/${kind}`, checkPermission("projects", "can_create"), ctrl.createMaster(kind));
    router.put(`/${kind}/:id`, checkPermission("projects", "can_update"), ctrl.updateMaster(kind));
    router.delete(`/${kind}/:id`, checkPermission("projects", "can_delete"), ctrl.deleteMaster(kind));
  }
};
