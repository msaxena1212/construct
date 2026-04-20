const db = require("../../models");

class ProjectController {
  constructor() {
    this.createProject = this.createProject.bind(this);
    this.getAllProjects = this.getAllProjects.bind(this);
    this.getProjectById = this.getProjectById.bind(this);
  }

  /**
   * Create a new project with milestones and team members
   * Matches the 4-step wizard flow in UI
   */
  async createProject(req, res) {
    let t;
    try {
      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      // Parse JSON from req.body (assuming it's sent along with files)
      // If using multipart/form-data, json data might be in a string field 'data'
      const projectData = req.body.data ? JSON.parse(req.body.data) : req.body;
      const { name, type, address, completionDate, budgetTotal, milestones, team } = projectData;

      if (!name || !type) {
        return res.status(400).json({ message: "Project Name and Type are required." });
      }

      // 1. Team Validation: Ensure all assigned users belong to the same company
      if (team && team.length > 0) {
        const userIds = team.map(member => member.user_id);
        const validUsers = await db.user.findAll({
          where: {
            id: userIds,
            company_id: company_id
          }
        });

        if (validUsers.length !== userIds.length) {
          return res.status(400).json({ 
            message: "Some assigned team members do not belong to your company." 
          });
        }
      }

      // 2. Start Transaction
      t = await db.sequelize.transaction();

      // 3. Create Project
      const project = await db.project.create({
        name,
        type,
        address,
        completion_date: completionDate,
        budget_total: budgetTotal || 0,
        company_id
      }, { transaction: t });

      // 4. Create Milestones
      if (milestones && milestones.length > 0) {
        const milestoneData = milestones.map(ms => ({
          ...ms,
          project_id: project.id
        }));
        await db.milestone.bulkCreate(milestoneData, { transaction: t });
      }

      // 5. Create Team Assignments
      if (team && team.length > 0) {
        const teamData = team.map(member => ({
          project_id: project.id,
          user_id: member.user_id,
          role: member.role
        }));
        await db.project_team.bulkCreate(teamData, { transaction: t });
      }

      // 6. Handle Documents (Files uploaded via Multer)
      if (req.files && req.files.length > 0) {
        const documentData = req.files.map(file => ({
          project_id: project.id,
          name: file.originalname,
          size: (file.size / 1024).toFixed(2) + " KB",
          url: `/uploads/projects/${file.filename}`,
          mimetype: file.mimetype
        }));
        await db.project_document.bulkCreate(documentData, { transaction: t });
      }

      await t.commit();

      // Fetch the created project with all relations to return
      const fullProject = await db.project.findByPk(project.id, {
        include: [
          { model: db.milestone, as: 'milestones' },
          { model: db.user, as: 'team_members', attributes: ['id', 'firstname', 'lastname', 'email'] },
          { model: db.project_document, as: 'documents' }
        ]
      });

      res.status(201).json({ 
        message: "Project initialized successfully.", 
        data: fullProject 
      });

    } catch (error) {
      if (t) await t.rollback();
      console.error("[CREATE_PROJECT_ERROR]", error);
      res.status(500).json({ message: "Error initializing project.", error: error.message });
    }
  }

  /**
   * Get all projects for the current company
   */
  async getAllProjects(req, res) {
    try {
      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const projects = await db.project.findAll({
        where: { company_id },
        include: [
          { model: db.milestone, as: 'milestones' },
          { model: db.project_document, as: 'documents' },
          { 
            model: db.user, 
            as: 'team_members', 
            attributes: ['id', 'firstname', 'lastname'],
            through: { attributes: ['role'] }
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({ data: projects });
    } catch (error) {
      console.error("[GET_ALL_PROJECTS_ERROR]", error);
      res.status(500).json({ message: "Error fetching projects.", error: error.message });
    }
  }

  /**
   * Get project details by ID
   */
  async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const company_id = req.user.company_id;

      const project = await db.project.findOne({
        where: { id, company_id },
        include: [
          { model: db.milestone, as: 'milestones' },
          { model: db.project_document, as: 'documents' },
          { 
            model: db.user, 
            as: 'team_members', 
            attributes: ['id', 'firstname', 'lastname', 'email'],
            through: { attributes: ['role'] }
          }
        ]
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized." });
      }

      res.status(200).json({ data: project });
    } catch (error) {
      res.status(500).json({ message: "Error fetching project details.", error: error.message });
    }
  }
}

module.exports = new ProjectController();
