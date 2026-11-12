const authCtrl = require("./auth.controller");
const rateLimiter = require("../../core/middleware/rate_limit.middleware");

module.exports = (router) => {
  router.post("/signin", rateLimiter({ windowMs: 15 * 60 * 1000, max: 8, message: "Too many login attempts. Please wait 15 minutes before trying again." }), authCtrl.signin);
};
