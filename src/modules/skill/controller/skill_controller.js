const db = require("../../../models");

const SkillModel = db.skill;

// ==============================
// CREATE SKILL
// ==============================
exports.createSkill = async (req, res) => {

  try {

    const { company_id, skill_name, status } = req.body;

    const skill = await SkillModel.create({
      company_id,
      skill_name,
      status,
    });

    return res.status(201).send({
      success: true,
      message: 'Skill created successfully',
      data: skill,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET ALL SKILLS
// ==============================
exports.getAllSkills = async (req, res) => {

  try {

    const skills = await SkillModel.findAll({

      where: {
        isDeleted: false,
      },

      order: [['id', 'DESC']],
    });

    return res.status(200).send({
      success: true,
      data: skills,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET SINGLE SKILL
// ==============================
exports.getSkillById = async (req, res) => {

  try {

    const skill = await SkillModel.findOne({

      where: {
        id: req.params.id,
        isDeleted: false,
      }
    });

    if (!skill) {

      return res.status(404).send({
        success: false,
        message: 'Skill not found',
      });
    }

    return res.status(200).send({
      success: true,
      data: skill,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// UPDATE SKILL
// ==============================
exports.updateSkill = async (req, res) => {

  try {

    const id = req.params.id;

    const skill = await SkillModel.findOne({

      where: {
        id,
        isDeleted: false,
      }
    });

    if (!skill) {

      return res.status(404).send({
        success: false,
        message: 'Skill not found',
      });
    }

    await skill.update(req.body);

    return res.status(200).send({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// DELETE SKILL (SOFT DELETE)
// ==============================
exports.deleteSkill = async (req, res) => {

  try {

    const id = req.params.id;

    const skill = await SkillModel.findOne({

      where: {
        id,
        isDeleted: false,
      }
    });

    if (!skill) {

      return res.status(404).send({
        success: false,
        message: 'Skill not found',
      });
    }

    await skill.update({
      isDeleted: true,
    });

    return res.status(200).send({
      success: true,
      message: 'Skill deleted successfully',
    });

  } catch (error) {

    console.error(error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};