// routes/activity.routes.js
const express    = require('express');
const router     = express.Router();
const controller = require('../vendors/vendors_controller');

// GET  /api/activities          → Sabhi activities (latest pehle)
// POST /api/activities          → Naya activity add karo

router.get('/',  controller.getActivities);
router.post('/', controller.createActivity);

module.exports = router;