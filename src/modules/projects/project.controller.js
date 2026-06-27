const db = require("../../models");

class ProjectController {
  constructor() {
    this.createProject = this.createProject.bind(this);
    this.getAllProjects = this.getAllProjects.bind(this);
    this.getProjectById = this.getProjectById.bind(this);
    this.getProjectTimeline = this.getProjectTimeline.bind(this);
    this.createMilestone = this.createMilestone.bind(this);
    this.updateMilestone = this.updateMilestone.bind(this);
  }

  /**
   * Get timeline data for a project (tasks and milestones)
   */
  // async getProjectTimeline(req, res) {
  //   try {
  //     const { projectId } = req.params;
  //     const company_id = req.user.company_id;

  //     const project = await db.project.findOne({
  //       where: { id: projectId, company_id },
  //       include: [
  //         {
  //           model: db.milestone,
  //           as: 'milestones',
  //           // attributes: ['id', 'name', 'phase', 'color', 'createdAt']
  //         },
  //         {
  //           model: db.project_task,
  //           as: 'tasks',
  //           // attributes: ['id', 'title', 'status', 'priority', 'due_date', 'createdAt'],
  //           include: [
  //             { model: db.user, as: 'assignees', attributes: ['id', 'firstname', 'lastname', 'avatar'] }
  //           ]
  //         }
  //       ]
  //     });

  //     if (!project) {
  //       return res.status(404).json({ message: "Project not found or unauthorized." });
  //     }

  //     // res.status(200).json({ data: project });

  //     const projectData = project.toJSON();

  //     const milestones = projectData.milestones || [];

  //     projectData.milestones_with_child = milestones

  //       .filter(m => m.parent_id === null)

  //       .map(parent => ({
  //         ...parent,
  //         children: milestones.filter(
  //           child => child.parent_id === parent.id
  //         )
  //       }));

  //     return res.status(200).json({
  //       data: projectData
  //     });

  //   } catch (error) {
  //     console.error("[GET_PROJECT_TIMELINE_ERROR]", error);
  //     res.status(500).json({ message: "Error fetching timeline data.", error: error.message });
  //   }
  // }

  async getProjectTimeline(req, res) {
    try {
      const { projectId } = req.params;
      const company_id = req.user.company_id;

      const project = await db.project.findOne({
        where: {
          id: projectId,
          company_id
        },
        include: [
          {
            model: db.milestone,
            as: "milestones"
          },
          {
            model: db.project_task,
            as: "tasks",
            include: [
              {
                model: db.user,
                as: "assignees",
                attributes: ["id", "firstname", "lastname", "avatar"]
              },
              {
                model: db.project_sub_task,
                as: "sub_tasks"
              }
            ]
          }
        ]
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or unauthorized."
        });
      }

      const projectData = project.toJSON();

      const milestones = projectData.milestones || [];
      const tasks = projectData.tasks || [];

      // Group tasks by submilestone_id
      const taskMap = Object.create(null);

      for (const task of tasks) {
        if (!taskMap[task.submilestone_id]) {
          taskMap[task.submilestone_id] = [];
        }

        taskMap[task.submilestone_id].push(task);
      }

      const parentMilestones = [];
      const subMilestoneMap = Object.create(null);

      for (const milestone of milestones) {
        if (!milestone.parent_id) {
          parentMilestones.push(milestone);
        } else {
          if (!subMilestoneMap[milestone.parent_id]) {
            subMilestoneMap[milestone.parent_id] = [];
          }

          const milestoneTasks = taskMap[milestone.id] || [];

          // TASK PROGRESS
          const tasksWithProgress = milestoneTasks.map(task => {
            const totalSubTasks = task.sub_tasks?.length || 0;

            const completedSubTasks =
              task.sub_tasks?.filter(st => st.completed === true).length || 0;

            const task_progress =
              totalSubTasks > 0
                ? Math.round(
                  (completedSubTasks / totalSubTasks) * 100
                )
                : 0;

            return {
              ...task,
              task_progress
            };
          });

          // SUB MILESTONE PROGRESS
          const submilestone_progress =
            tasksWithProgress.length > 0
              ? Math.round(
                tasksWithProgress.reduce(
                  (sum, task) => sum + task.task_progress,
                  0
                ) / tasksWithProgress.length
              )
              : 0;

          subMilestoneMap[milestone.parent_id].push({
            ...milestone,
            tasks: tasksWithProgress,
            submilestone_progress
          });
        }
      }

      projectData.milestones_with_child = parentMilestones.map(parent => {
        const children = subMilestoneMap[parent.id] || [];

        // MILESTONE PROGRESS
        const milestone_progress =
          children.length > 0
            ? Math.round(
              children.reduce(
                (sum, sm) => sum + sm.submilestone_progress,
                0
              ) / children.length
            )
            : 0;

        return {
          ...parent,
          children,
          milestone_progress
        };
      });

      // PROJECT PROGRESS
      projectData.project_progress =
        projectData.milestones_with_child.length > 0
          ? Math.round(
            projectData.milestones_with_child.reduce(
              (sum, milestone) =>
                sum + milestone.milestone_progress,
              0
            ) / projectData.milestones_with_child.length
          )
          : 0;

      return res.status(200).json({
        success: true,
        data: projectData
      });

    } catch (error) {
      console.error("[GET_PROJECT_TIMELINE_ERROR]", error);

      return res.status(500).json({
        success: false,
        message: "Error fetching timeline data.",
        error: error.message
      });
    }
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
      let thumbnailPath = null;
      if (req.files && req.files['thumbnail'] && req.files['thumbnail'].length > 0) {
        thumbnailPath = `/uploads/projects/${req.files['thumbnail'][0].filename}`;
      }

      const project = await db.project.create({
        name,
        type,
        address,
        completion_date: completionDate,
        budget_total: budgetTotal || 0,
        company_id,
        thumbnail: thumbnailPath
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

      // 6. Handle Documents (Files uploaded via Multer - specifically blueprints)
      if (req.files && req.files['blueprints'] && req.files['blueprints'].length > 0) {
        const documentData = req.files['blueprints'].map(file => ({
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

  async getAllProjects(req, res) {
    try {
      const company_id = req.user.company_id;

      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const projects = await db.project.findAll({
        where: { company_id },
        include: [
          {
            model: db.milestone,
            as: "milestones"
          },
          {
            model: db.project_document,
            as: "documents"
          },
          {
            model: db.user,
            as: "team_members",
            attributes: ["id", "firstname", "lastname", "avatar"],
            through: {
              attributes: ["role"]
            }
          }
        ],
        order: [["createdAt", "DESC"]]
      });

      const projectIds = projects.map(project => project.id);

      const allTasks = await db.project_task.findAll({
        where: {
          project_id: projectIds
        },
        include: [
          {
            model: db.project_sub_task,
            as: "sub_tasks"
          },
        ],
        order: [["createdAt", "DESC"]]
      });

      // Group tasks by submilestone_id
      const taskMap = Object.create(null);

      for (const task of allTasks) {
        if (!taskMap[task.submilestone_id]) {
          taskMap[task.submilestone_id] = [];
        }

        taskMap[task.submilestone_id].push(task);
      }



      const formattedProjects = projects.map(project => {
        const projectData = project.toJSON();

        const parentMilestones = [];
        const subMilestoneMap = Object.create(null);

        for (const milestone of projectData.milestones) {
          if (!milestone.parent_id) {
            parentMilestones.push(milestone);
          } else {
            if (!subMilestoneMap[milestone.parent_id]) {
              subMilestoneMap[milestone.parent_id] = [];
            }

            const tasks = taskMap[milestone.id] || [];

            // TASK PROGRESS
            const tasksWithProgress = tasks.map(task => {
              const totalSubTasks = task.sub_tasks?.length || 0;

              const completedSubTasks =
                task.sub_tasks?.filter(st => st.completed).length || 0;

              const task_progress =
                totalSubTasks > 0
                  ? Math.round((completedSubTasks / totalSubTasks) * 100)
                  : 0;

              return {
                ...task.toJSON(),
                task_progress
              };
            });

            // SUB MILESTONE PROGRESS
            const submilestone_progress =
              tasksWithProgress.length > 0
                ? Math.round(
                  tasksWithProgress.reduce(
                    (sum, task) => sum + task.task_progress,
                    0
                  ) / tasksWithProgress.length
                )
                : 0;

            subMilestoneMap[milestone.parent_id].push({
              ...milestone,
              tasks: tasksWithProgress,
              submilestone_progress
            });
          }
        }

        projectData.milestone_with_sub = parentMilestones.map(parent => {
          const subMilestones = subMilestoneMap[parent.id] || [];

          // MILESTONE PROGRESS
          const milestone_progress =
            subMilestones.length > 0
              ? Math.round(
                subMilestones.reduce(
                  (sum, sm) => sum + sm.submilestone_progress,
                  0
                ) / subMilestones.length
              )
              : 0;

          return {
            ...parent,
            subMilestones,
            milestone_progress
          };
        });

        // PROJECT PROGRESS
        projectData.project_progress =
          projectData.milestone_with_sub.length > 0
            ? Math.round(
              projectData.milestone_with_sub.reduce(
                (sum, milestone) =>
                  sum + milestone.milestone_progress,
                0
              ) / projectData.milestone_with_sub.length
            )
            : 0;

        return projectData;
      });

      return res.status(200).json({
        success: true,
        count: formattedProjects.length,
        data: formattedProjects
      });

    } catch (error) {
      console.error("[GET_ALL_PROJECTS_ERROR]", error);

      return res.status(500).json({
        success: false,
        message: "Error fetching projects.",
        error: error.message
      });
    }
  }


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
            attributes: ['id', 'firstname', 'lastname', 'email', 'avatar'],
            through: { attributes: ['role'] }
          },
          {
            model: db.project_task,
            as: "tasks",
            include: [
              {
                model: db.user,
                as: "assignees",
                attributes: ["id", "firstname", "lastname", "avatar"]
              },
              {
                model: db.project_sub_task,
                as: "sub_tasks"
              }
            ]
          }
        ]
      });



      if (!project) {
        return res.status(404).json({
          message: "Project not found or unauthorized."
        });
      }

      const projectData = project.toJSON();

      const milestones = projectData.milestones || [];
      const tasks = projectData.tasks || [];

      // Group tasks by submilestone_id
      const taskMap = Object.create(null);

      ////////////////

      projectData.milestones_with_child = milestones

        .filter(m => m.parent_id === null)

        .map(parent => ({

          ...parent,
          children: milestones.filter(
            child => child.parent_id === parent.id

          )
        }));

      const invoices = await db.vendors_invoice.findAll({
        where: {
          project_id: id,
          company_id,

        },
        order: [['createdAt', 'DESC']],
      });


      let total_material = 0;
      let total_equipment = 0;
      let total_labor = 0;
      let total_others = 0;

      invoices.forEach(invoice => {
        (invoice.items || []).forEach(item => {
          const total = parseFloat(item.total || 0);

          if (item.type === "material") {
            total_material += total;
          } else if (item.type === "equipment") {
            total_equipment += total;
          } else if (item.type === "labor") {
            total_labor += total;
          } else if (item.type === "others") {
            total_others += total;
          }

        });
      });


      const totalSpend = invoices.reduce((sum, invoice) => {

        return sum + parseFloat(invoice.paid_amount || 0);

      }, 0);

      const grand_total = invoices.reduce((sum, invoice) => {

        return sum + parseFloat(invoice.grand_total || 0);

      }, 0);


      const on_hold = (grand_total - totalSpend);

      const remaining_budget = (projectData.budget_total - grand_total);

      ////////////////extra logic


      //       projectData.milestones_with_child = milestones

      //   .filter(m => m.parent_id === null)

      //   .map(parent => ({

      //     ...parent,
      //     children: milestones.filter(
      //       child => child.parent_id === parent.id

      //     )
      //   }));

      // const invoices = await db.vendors_invoice.findAll({
      //   where: {
      //     project_id: id,
      //     company_id,

      //   },
      //   order: [['createdAt', 'DESC']],
      // });


      // let total_material = 0;
      // let total_equipment = 0;
      // let total_labor = 0;
      // let total_others = 0;

      // invoices.forEach(invoice => {
      //   (invoice.items || []).forEach(item => {
      //     const total = parseFloat(item.total || 0);

      //     if (item.type === "material") {
      //       total_material += total;
      //     } else if (item.type === "equipment") {
      //       total_equipment += total;
      //     } else if (item.type === "labor") {
      //       total_labor += total;
      //     } else if (item.type === "others") {
      //       total_others += total;
      //     }

      //   });
      // });


      // const totalSpend = invoices.reduce((sum, invoice) => {

      //   return sum + parseFloat(invoice.paid_amount || 0);

      // }, 0);

      // const grand_total = invoices.reduce((sum, invoice) => {

      //   return sum + parseFloat(invoice.grand_total || 0);

      // }, 0);


      // const on_hold = (grand_total - totalSpend);

      // const remaining_budget = (projectData.budget_total - grand_total);

      /////////////////extra2


      for (const task of tasks) {
        if (!taskMap[task.submilestone_id]) {
          taskMap[task.submilestone_id] = [];
        }

        taskMap[task.submilestone_id].push(task);
      }

      const parentMilestones = [];
      const subMilestoneMap = Object.create(null);

      for (const milestone of milestones) {
        if (!milestone.parent_id) {
          parentMilestones.push(milestone);
        } else {
          if (!subMilestoneMap[milestone.parent_id]) {
            subMilestoneMap[milestone.parent_id] = [];
          }

          const milestoneTasks = taskMap[milestone.id] || [];

          // TASK PROGRESS
          const tasksWithProgress = milestoneTasks.map(task => {
            const totalSubTasks = task.sub_tasks?.length || 0;

            const completedSubTasks =
              task.sub_tasks?.filter(st => st.completed === true).length || 0;

            const task_progress =
              totalSubTasks > 0
                ? Math.round(
                  (completedSubTasks / totalSubTasks) * 100
                )
                : 0;

            return {
              ...task,
              task_progress
            };
          });

          // SUB MILESTONE PROGRESS
          const submilestone_progress =
            tasksWithProgress.length > 0
              ? Math.round(
                tasksWithProgress.reduce(
                  (sum, task) => sum + task.task_progress,
                  0
                ) / tasksWithProgress.length
              )
              : 0;

          subMilestoneMap[milestone.parent_id].push({
            ...milestone,
            tasks: tasksWithProgress,
            submilestone_progress
          });
        }
      }

      projectData.milestones_with_child = parentMilestones.map(parent => {
        const children = subMilestoneMap[parent.id] || [];

        // MILESTONE PROGRESS
        const milestone_progress =
          children.length > 0
            ? Math.round(
              children.reduce(
                (sum, sm) => sum + sm.submilestone_progress,
                0
              ) / children.length
            )
            : 0;

        return {
          ...parent,
          children,
          milestone_progress
        };
      });

      // PROJECT PROGRESS
      projectData.project_progress =
        projectData.milestones_with_child.length > 0
          ? Math.round(
            projectData.milestones_with_child.reduce(
              (sum, milestone) =>
                sum + milestone.milestone_progress,
              0
            ) / projectData.milestones_with_child.length
          )
          : 0;

      return res.status(200).json({
        success: true,
        // data: projectData
        data: {
          ...projectData,
          invoice: invoices,
          totalSpend: totalSpend.toFixed(2),
          grand_total: grand_total.toFixed(2),
          on_hold: on_hold.toFixed(2),
          remaining_budget: remaining_budget.toFixed(2),
          total_material: total_material.toFixed(2),
          total_equipment: total_equipment.toFixed(2),
          total_labor: total_labor.toFixed(2),
          total_others: total_others.toFixed(2),
        }
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error fetching project details.",
        error: error.message
      });
    }
  }

  /**
   * Update an existing project
   */
  async updateProject(req, res) {
    let t;
    try {
      const { id } = req.params;
      const company_id = req.user.company_id;

      const projectData = req.body.data ? JSON.parse(req.body.data) : req.body;
      const { name, type, address, completionDate, budgetTotal, milestones, team,
        material_total,
        material_used,
        equipment_total,
        equipment_used,
        labor_total,
        labor_used,
        other_total,
        other_used
      } = projectData;

      // 1. Team Validation
      if (team && team.length > 0) {
        const userIds = team.map(member => member.user_id);
        const validUsers = await db.user.findAll({
          where: { id: userIds, company_id: company_id }
        });
        if (validUsers.length !== userIds.length) {
          return res.status(400).json({ message: "Invalid team members assigned." });
        }
      }

      t = await db.sequelize.transaction();

      // 2. Update Project Header
      let updateData = {
        name, type, address,
        completion_date: completionDate,
        material_total,
        material_used,
        equipment_total,
        equipment_used,
        labor_total,
        labor_used,
        other_total,
        other_used,
        budget_total: budgetTotal || 0,
      };

      if (req.files && req.files['thumbnail'] && req.files['thumbnail'].length > 0) {
        updateData.thumbnail = `/uploads/projects/${req.files['thumbnail'][0].filename}`;
      }

      await db.project.update(updateData, {
        where: { id, company_id },
        transaction: t
      });

      // 3. Update Milestones (Delete and Recreate)
      await db.milestone.destroy({ where: { project_id: id }, transaction: t });
      if (milestones && milestones.length > 0) {
        const milestoneData = milestones.map(ms => ({ ...ms, project_id: id }));
        await db.milestone.bulkCreate(milestoneData, { transaction: t });
      }

      // 4. Update Team Assignments (Delete and Recreate)
      await db.project_team.destroy({ where: { project_id: id }, transaction: t });
      if (team && team.length > 0) {
        const teamData = team.map(member => ({
          project_id: id,
          user_id: member.user_id,
          role: member.role
        }));
        await db.project_team.bulkCreate(teamData, { transaction: t });
      }

      // 5. Handle New Documents (Blueprints)
      if (req.files && req.files['blueprints'] && req.files['blueprints'].length > 0) {
        const documentData = req.files['blueprints'].map(file => ({
          project_id: id,
          name: file.originalname,
          size: (file.size / 1024).toFixed(2) + " KB",
          url: `/uploads/projects/${file.filename}`,
          mimetype: file.mimetype
        }));
        await db.project_document.bulkCreate(documentData, { transaction: t });
      }

      await t.commit();
      res.status(200).json({ message: "Project updated successfully." });

    } catch (error) {
      if (t) await t.rollback();
      console.error("[UPDATE_PROJECT_ERROR]", error);
      res.status(500).json({ message: "Error updating project.", error: error.message });
    }
  }

  /**
   * Upload additional documents/media to an existing project
   */

  async uploadDocuments(req, res) {
    let t;
    try {
      const { id } = req.params;
      const company_id = req.user.company_id;

      // Verify project ownership
      const project = await db.project.findOne({ where: { id, company_id } });
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized." });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded." });
      }

      t = await db.sequelize.transaction();

      const documentData = req.files.map(file => ({
        project_id: id,
        name: file.originalname,
        size: (file.size / 1024).toFixed(2) + " KB",
        url: `/uploads/projects/${file.filename}`,
        mimetype: file.mimetype
      }));

      const createdDocs = await db.project_document.bulkCreate(documentData, { transaction: t });

      await t.commit();
      res.status(201).json({
        message: "Documents uploaded successfully.",
        data: createdDocs
      });
    } catch (error) {
      if (t) await t.rollback();
      console.error("[UPLOAD_DOCUMENTS_ERROR]", error);
      res.status(500).json({ message: "Error uploading documents.", error: error.message });
    }
  }

  /**
   * Create a milestone for a project
   */
  async createMilestone(req, res) {
    try {
      const { projectId } = req.params;
      const company_id = req.user.company_id;
      const { name, progress, color, startDate, endDate, parent_id } = req.body;

      const project = await db.project.findOne({ where: { id: projectId, company_id } });
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized." });
      }

      const milestone = await db.milestone.create({
        project_id: projectId,
        name,
        progress: progress || 0,
        color,
        startDate,
        endDate,
        parent_id,
        is_completed: progress === 100
      });

      res.status(201).json({ message: "Milestone created successfully.", data: milestone });
    } catch (error) {
      console.error("[CREATE_MILESTONE_ERROR]", error);
      res.status(500).json({ message: "Error creating milestone.", error: error.message });
    }
  }

  /**
   * Update a milestone for a project
   */
  async updateMilestone(req, res) {
    try {
      const { projectId, milestoneId } = req.params;
      const company_id = req.user.company_id;
      const { name, progress, color, startDate, endDate, parent_id } = req.body;

      const project = await db.project.findOne({ where: { id: projectId, company_id } });
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized." });
      }

      const milestone = await db.milestone.findOne({ where: { id: milestoneId, project_id: projectId } });
      if (!milestone) {
        return res.status(404).json({ message: "Milestone not found." });
      }

      await milestone.update({
        name,
        progress: progress !== undefined ? progress : milestone.progress,
        color,
        startDate,
        endDate,
        parent_id,
        is_completed: progress === 100
      });

      res.status(200).json({ message: "Milestone updated successfully.", data: milestone });
    } catch (error) {
      console.error("[UPDATE_MILESTONE_ERROR]", error);
      res.status(500).json({ message: "Error updating milestone.", error: error.message });
    }
  }


  //Budgets
  async getBudget_ProjectById(req, res) {
    try {

      const { id } = req.params;

      const company_id = req.user.company_id;

      const project = await db.project.findOne({
        where: { id, company_id },
        include: [
          {
            model: db.milestone,
            as: 'milestones'
          },
          {
            model: db.project_document,
            as: 'documents'
          },
          {
            model: db.user,
            as: 'team_members',
            attributes: [
              'id',
              'firstname',
              'lastname',
              'email',
              'avatar'
            ],
            through: { attributes: ['role'] }
          }
        ]
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or unauthorized."
        });
      }

      const projectData = project.toJSON();

      const milestones = projectData.milestones || [];

      projectData.milestones_with_child = milestones

        .filter(m => m.parent_id === null)

        .map(parent => ({
          ...parent,
          children: milestones.filter(
            child => child.parent_id === parent.id
          )
        }));

      return res.status(200).json({
        data: projectData
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error fetching project details.",
        error: error.message
      });
    }
  }


  //Budgets total spent
  async getBudget_total_spent_ProjectById(req, res) {
    try {
      const { id } = req.params;
      const company_id = req.user.company_id;

      const project = await db.project.findOne({
        where: { id, company_id },
        include: [
          {
            model: db.milestone,
            as: 'milestones'
          },
          {
            model: db.project_document,
            as: 'documents'
          },
          {
            model: db.user,
            as: 'team_members',
            attributes: ['id', 'firstname', 'lastname', 'email', 'avatar'],
            through: { attributes: ['role'] }
          }
        ]
      });

      const vendor_invoice = await db.vendors_invoice.findOne({
        where: { project_id: id, company_id }
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or unauthorized."
        });
      }

      const projectData = project.toJSON();
      const milestones = projectData.milestones || [];

      projectData.milestones_with_child = milestones
        .filter(m => m.parent_id === null)
        .map(parent => ({
          ...parent,
          children: milestones.filter(child => child.parent_id === parent.id)
        }));

      // Attach vendor invoice info
      projectData.vendor_invoice = vendor_invoice ? vendor_invoice.toJSON() : null;

      // If you only want paid_amount
      projectData.total_spent = vendor_invoice ? vendor_invoice.paid_amount : 0;

      return res.status(200).json({
        data: projectData
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error fetching project details.",
        error: error.message
      });
    }
  }




  //Budgets total ALL spent
  async getBudget_total_spent_ProjectALL(req, res) {
    try {
      const { id } = req.params;
      const company_id = req.user.company_id;

      const project = await db.project.findOne({
        where: { id, company_id },
        include: [
          {
            model: db.milestone,
            as: 'milestones'
          },
          {
            model: db.project_document,
            as: 'documents'
          },
          {
            model: db.user,
            as: 'team_members',
            attributes: ['id', 'firstname', 'lastname', 'email', 'avatar'],
            through: { attributes: ['role'] }
          }
        ]
      });

      const vendor_invoice = await db.vendors_invoice.findOne({
        where: { project_id: id, company_id }
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or unauthorized."
        });
      }

      const projectData = project.toJSON();
      const milestones = projectData.milestones || [];

      projectData.milestones_with_child = milestones
        .filter(m => m.parent_id === null)
        .map(parent => ({
          ...parent,
          children: milestones.filter(child => child.parent_id === parent.id)
        }));

      // Attach vendor invoice info
      projectData.vendor_invoice = vendor_invoice ? vendor_invoice.toJSON() : null;

      // If you only want paid_amount
      projectData.total_spent = vendor_invoice ? vendor_invoice.paid_amount : 0;

      return res.status(200).json({
        data: projectData
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error fetching project details.",
        error: error.message
      });
    }
  }


  //Budgets
  async getBudget_vendorProjectById(req, res) {
    try {

      const { id } = req.params;

      const company_id = req.user.company_id;

      const project = await db.project.findOne({
        where: { id, company_id },
        include: [
          {
            model: db.milestone,
            as: 'milestones'
          },
          {
            model: db.project_document,
            as: 'documents'
          },
          {
            model: db.user,
            as: 'team_members',
            attributes: [
              'id',
              'firstname',
              'lastname',
              'email',
              'avatar'
            ],
            through: { attributes: ['role'] }
          }
        ]
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or unauthorized."
        });
      }

      const projectData = project.toJSON();

      const milestones = projectData.milestones || [];

      projectData.milestones_with_child = milestones

        .filter(m => m.parent_id === null)

        .map(parent => ({

          ...parent,
          children: milestones.filter(
            child => child.parent_id === parent.id

          )
        }));

      const invoices = await db.vendors_invoice.findAll({
        where: {
          project_id: id,
          company_id,

        },
        order: [['createdAt', 'DESC']],
      });


      let total_material = 0;
      let total_equipment = 0;
      let total_labor = 0;
      let total_others = 0;

      invoices.forEach(invoice => {
        (invoice.items || []).forEach(item => {
          const total = parseFloat(item.total || 0);

          if (item.type === "material") {
            total_material += total;
          } else if (item.type === "equipment") {
            total_equipment += total;
          } else if (item.type === "labor") {
            total_labor += total;
          } else if (item.type === "others") {
            total_others += total;
          }

        });
      });


      const totalSpend = invoices.reduce((sum, invoice) => {

        return sum + parseFloat(invoice.paid_amount || 0);

      }, 0);

      const grand_total = invoices.reduce((sum, invoice) => {

        return sum + parseFloat(invoice.grand_total || 0);

      }, 0);


      const on_hold = (grand_total - totalSpend);

      const remaining_budget = (projectData.budget_total - grand_total);

      return res.status(200).json({

        data: {
          ...projectData,
          invoice: invoices,
          totalSpend: totalSpend.toFixed(2),
          grand_total: grand_total.toFixed(2),
          on_hold: on_hold.toFixed(2),
          remaining_budget: remaining_budget.toFixed(2),
          total_material: total_material.toFixed(2),
          total_equipment: total_equipment.toFixed(2),
          total_labor: total_labor.toFixed(2),
          total_others: total_others.toFixed(2),
        }

      });


    } catch (error) {
      return res.status(500).json({
        message: "Error fetching project details.",
        error: error.message
      });
    }
  }


  //Budgetsall
  async getBudgetall_vendorProjectById(req, res) {
    try {

      const { id } = req.params;

      const company_id = req.user.company_id;

      const project = await db.project.findOne({
        where: { id, company_id },
        include: [
          {
            model: db.milestone,
            as: 'milestones'
          },
          {
            model: db.project_document,
            as: 'documents'
          },
          {
            model: db.user,
            as: 'team_members',
            attributes: [
              'id',
              'firstname',
              'lastname',
              'email',
              'avatar'
            ],
            through: { attributes: ['role'] }
          }
        ]
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or unauthorized."
        });
      }

      const projectData = project.toJSON();

      const milestones = projectData.milestones || [];

      projectData.milestones_with_child = milestones

        .filter(m => m.parent_id === null)

        .map(parent => ({

          ...parent,
          children: milestones.filter(
            child => child.parent_id === parent.id

          )
        }));


      const invoices = await db.vendors_invoice.findAll({
        where: {
          project_id: id,
          company_id,
          //  status: "Partially Paid"
        },
        order: [['createdAt', 'DESC']],
      });


      let total_material = 0;
      let total_equipment = 0;
      let total_labor = 0;

      invoices.forEach(invoice => {
        (invoice.items || []).forEach(item => {
          const total = parseFloat(item.total || 0);

          if (item.type === "material") {
            total_material += total;
          } else if (item.type === "equipment") {
            total_equipment += total;
          } else if (item.type === "labor") {
            total_labor += total;
          }

        });
      });


      const totalSpend = invoices.reduce((sum, invoice) => {

        return sum + parseFloat(invoice.paid_amount || 0);

      }, 0);


      const grand_total = invoices.reduce((sum, invoice) => {

        return sum + parseFloat(invoice.grand_total || 0);

      }, 0);

      const on_hold = (grand_total - totalSpend);

      const remaining_budget = (projectData.budget_total - grand_total);

      return res.status(200).json({

        data: {
          ...projectData,
          invoice: invoices,
          totalSpend: totalSpend.toFixed(2),
          grand_total: grand_total.toFixed(2),
          on_hold: on_hold.toFixed(2),
          remaining_budget: remaining_budget.toFixed(2),
          total_material: total_material.toFixed(2),
          total_equipment: total_equipment.toFixed(2),
          total_labor: total_labor.toFixed(2),
        }

      });


    } catch (error) {
      return res.status(500).json({
        message: "Error fetching project details.",
        error: error.message
      });
    }
  }



}

module.exports = new ProjectController();
