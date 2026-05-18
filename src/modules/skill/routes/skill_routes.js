const express = require('express');

const router = express.Router();

const skillController = require('../../skill/controller/skill_controller');

// Create
router.post('/create', skillController.createSkill);

// Get All
router.get('/list', skillController.getAllSkills);

// Get Single
router.get('/:id', skillController.getSkillById);

// Update
router.put('/update/:id', skillController.updateSkill);

// Delete
router.delete('/delete/:id', skillController.deleteSkill);

module.exports = router;