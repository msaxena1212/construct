const authCtrl = require("./auth.controller");
module.exports = (router) => {
  router.post("/signin", authCtrl.signin);
};
