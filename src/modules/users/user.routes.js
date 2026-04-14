const { route } = require("../../app");
const userCtrl = require("./user.controller");
module.exports = (router) => {
  router.post("/register-company", userCtrl.registerCompany);
  router.get("/getAllUsers", userCtrl.getAllUsers);
};
