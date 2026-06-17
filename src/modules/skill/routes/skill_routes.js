const express = require('express');
const checkPermission = require("../../../core/middleware/permission.middleware");
const router = express.Router();

const skillController = require('../../skill/controller/skill_controller');

// Create
router.post('/create', checkPermission("skill", "can_create"),  skillController.createSkill);

// Get All
router.get('/list', skillController.getAllSkills);

// Get Single
router.get('/:id', checkPermission("skill", "can_read"), skillController.getSkillById);

// Update
router.put('/update/:id', checkPermission("skill", "can_update"), skillController.updateSkill);

// Delete
router.delete('/delete/:id' ,checkPermission("skill", "can_delete"), skillController.deleteSkill);

module.exports = router;