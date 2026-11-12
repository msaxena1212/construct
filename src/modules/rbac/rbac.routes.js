const rbacCtrl = require("./rbac.controller");
const rolesCtrl = require("./roles.controller");

module.exports = (router) => {
  router.get("/sidebar", rbacCtrl.getSidebar);
  router.post("/modules", rbacCtrl.createModule);
  router.get("/modules", rbacCtrl.getModules);
  router.post("/modules/reset-canonical", rbacCtrl.resetToCanonical);
  router.put("/modules/:id", rbacCtrl.updateModule);
  router.delete("/modules/:id", rbacCtrl.deleteModule);

  // Roles
  router.post("/roles", rolesCtrl.createRole);
  router.get("/roles", rolesCtrl.getCompanyRoles);
  router.put("/roles/:id", rolesCtrl.updateRole);
  router.delete("/roles/:id", rolesCtrl.deleteRole);

  // Role Permissions
  router.get("/roles/:id/permissions", rolesCtrl.getRolePermissions);
  router.post("/roles/:id/permissions", rolesCtrl.updateRolePermissions);
};
