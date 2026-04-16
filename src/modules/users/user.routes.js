const { route } = require("../../app");
const userCtrl = require("./user.controller");
module.exports = (router) => {
  router.post("/register-company", userCtrl.registerCompany);
  router.get("/getAllUsers", userCtrl.getAllUsers);
  
  // Super Admin Company Management
  router.get("/companies", userCtrl.getAllCompanies);
  router.put("/companies/:id/status", userCtrl.toggleCompanyStatus);

  // Company Team Management
  router.get("/invite-info", userCtrl.getInviteInfo);
  router.post("/invite", userCtrl.inviteUser);
  router.post("/accept-invite", userCtrl.acceptInvite);
  router.get("/team", userCtrl.getTeamUsers);
  router.put("/team/:id/status", userCtrl.toggleUserStatus);
};
