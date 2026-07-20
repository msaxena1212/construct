const db = require("../../models");
const { logProjectHistory } = require("./project.utils");
class ProjectController {
  constructor() {
    this.createProject = this.createProject.bind(this);
    this.getAllProjects = this.getAllProjects.bind(this);
    this.getProjectById = this.getProjectById.bind(this);
    this.getProjectTimeline = this.getProjectTimeline.bind(this);
    this.createMilestone = this.createMilestone.bind(this);
    this.updateMilestone = this.updateMilestone.bind(this);
    this.getProjectHistory = this.getProjectHistory.bind(this);
    this.backfillProjectHistory = this.backfillProjectHistory.bind(this);
  }

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

  async createProject(req, res) {
    let t;
    try {
      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const projectData = req.body.data ? JSON.parse(req.body.data) : req.body;
      const { name, type, address, completionDate, budgetTotal, milestones, team,
        material_total, equipment_total, labor_total, other_total, latitude, longitude, place_id
      } = projectData;

      if (!name || !type) {
        return res.status(400).json({ message: "Project Name and Type are required." });
      }

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

      t = await db.sequelize.transaction();

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
        material_total: material_total || 0,
        equipment_total: equipment_total || 0,
        labor_total: labor_total || 0,
        other_total: other_total || 0,
        latitude: latitude || null,
        longitude: longitude || null,
        place_id: place_id || null,
        company_id,
        thumbnail: thumbnailPath
      }, { transaction: t });

      if (milestones && milestones.length > 0) {
        const milestoneData = milestones.map(ms => ({
          ...ms,
          project_id: project.id
        }));

        await db.milestone.bulkCreate(milestoneData, { transaction: t });
        await logProjectHistory({
          project_id: project.id,
          company_id,
          user_id: req.user.id,
          action_type: "MILESTONE_UPDATED",
          detail: `milestones updated (${milestones.length} milestone(s))`,
        }, t);
        const topLevelCount = milestones.filter(ms => !ms.parent_id).length;
        const subCount = milestones.filter(ms => ms.parent_id).length;
        const starts = milestones.map(ms => ms.startDate).filter(Boolean).sort();
        const ends = milestones.map(ms => ms.endDate).filter(Boolean).sort();

        await logProjectHistory({
          project_id: project.id,
          company_id,
          user_id: req.user.id,
          action_type: "TIMELINE_UPDATED",
          detail: `Timeline created for project "${name}" with ${topLevelCount} milestone(s) and ${subCount} sub-milestone(s)`,
          meta: {
            event: 'timeline_created',
            milestone_count: topLevelCount,
            submilestone_count: subCount,
            start_date: starts[0] || null,
            end_date: ends[ends.length - 1] || null
          }
        }, t);
      }

      if (team && team.length > 0) {
        const teamData = team.map(member => ({
          project_id: project.id,
          user_id: member.user_id,
          role: member.role
        }));
        await db.project_team.bulkCreate(teamData, { transaction: t });
      }


      if (req.files && req.files['blueprints'] && req.files['blueprints'].length > 0) {
        const documentData = req.files['blueprints'].map(file => ({
          project_id: project.id,
          name: file.originalname,
          size: (file.size / 1024).toFixed(2) + " KB",
          url: `/uploads/projects/${file.filename}`,
          mimetype: file.mimetype
        }));
        await db.project_document.bulkCreate(documentData, { transaction: t });


        await logProjectHistory({
          project_id: project.id,
          company_id,
          user_id: req.user.id,
          action_type: "DOCUMENT_UPLOADED",
          detail: `uploaded ${documentData.length} document(s) during project creation`,
        }, t);
      }


      if (Number(budgetTotal) > 0) {
        await logProjectHistory({
          project_id: project.id,
          company_id,
          user_id: req.user.id,
          action_type: "BUDGET_UPDATED",
          detail: `initial budget set to ₹${budgetTotal} (Material: ₹${material_total || 0}, Equipment: ₹${equipment_total || 0}, Labor: ₹${labor_total || 0}, Other: ₹${other_total || 0})`,
        }, t);
      }

      await logProjectHistory({
        project_id: project.id,
        company_id,
        user_id: req.user.id,
        action_type: "CREATED",
        detail: `created project "${name}"`,
      }, t);

      await t.commit();

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

      const taskMap = Object.create(null);

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

      let updateData = {
        material_used: total_material,
        equipment_used: total_equipment,
        labor_used: total_labor,
        other_used: total_others,
      };

      await db.project.update(updateData, {
        where: { id, company_id },
      });

      const totalSpend = invoices.reduce((sum, invoice) => {
        return sum + parseFloat(invoice.paid_amount || 0);
      }, 0);

      const grand_total = invoices.reduce((sum, invoice) => {
        return sum + parseFloat(invoice.grand_total || 0);
      }, 0);

      const on_hold = (grand_total - totalSpend);
      const remaining_budget = (projectData.budget_total - grand_total);

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
        other_used,
        latitude, longitude, place_id
      } = projectData;

      const project_data = await db.project.findOne({ where: { id, company_id } });

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

      const oldBudget = {
        budget_total: Number(project_data.budget_total || 0),
        material_total: Number(project_data.material_total || 0),
        equipment_total: Number(project_data.equipment_total || 0),
        labor_total: Number(project_data.labor_total || 0),
        other_total: Number(project_data.other_total || 0),
      };

      let updateData = {
        name, type, address,
        latitude: latitude !== undefined ? latitude : project_data.latitude,
        longitude: longitude !== undefined ? longitude : project_data.longitude,
        place_id: place_id !== undefined ? place_id : project_data.place_id,
        completion_date: completionDate,
        material_total: Number(project_data.material_total || 0) + Number(material_total || 0),
        material_used,
        equipment_total: Number(project_data.equipment_total || 0) + Number(equipment_total || 0),
        equipment_used,
        labor_total: Number(project_data.labor_total || 0) + Number(labor_total || 0),
        labor_used,
        other_total: Number(project_data.other_total || 0) + Number(other_total || 0),
        other_used,
        budget_total: Number(project_data.budget_total || 0) + Number(budgetTotal || 0),
      };

      if (req.files && req.files['thumbnail'] && req.files['thumbnail'].length > 0) {
        updateData.thumbnail = `/uploads/projects/${req.files['thumbnail'][0].filename}`;
      }

      await db.project.update(updateData, {
        where: { id, company_id },
        transaction: t
      });

      await logProjectHistory({
        project_id: id,
        company_id,
        user_id: req.user.id,
        action_type: "UPDATED",
        detail: `updated project details`,
        meta: { updated_fields: Object.keys(updateData).filter(k => updateData[k] !== undefined) }
      }, t);

      const budgetChanged =
        Number(updateData.budget_total) !== oldBudget.budget_total ||
        Number(updateData.material_total) !== oldBudget.material_total ||
        Number(updateData.equipment_total) !== oldBudget.equipment_total ||
        Number(updateData.labor_total) !== oldBudget.labor_total ||
        Number(updateData.other_total) !== oldBudget.other_total;

      if (budgetChanged) {
        await logProjectHistory({
          project_id: id,
          company_id,
          user_id: req.user.id,
          action_type: "BUDGET_UPDATED",
          detail: `budget updated — total ₹${oldBudget.budget_total} → ₹${updateData.budget_total} (Material: ₹${updateData.material_total}, Equipment: ₹${updateData.equipment_total}, Labor: ₹${updateData.labor_total}, Other: ₹${updateData.other_total})`,
        }, t);
      }

      await db.milestone.destroy({ where: { project_id: id }, transaction: t });
      if (milestones && milestones.length > 0) {
        const milestoneData = milestones.map(ms => ({ ...ms, project_id: id }));
        await db.milestone.bulkCreate(milestoneData, { transaction: t });

        await logProjectHistory({
          project_id: id,
          company_id,
          user_id: req.user.id,
          action_type: "MILESTONE_UPDATED",
          detail: `milestones updated (${milestones.length} milestone(s))`,
        }, t);

        const scheduledCount = milestones.filter(ms => ms.startDate || ms.endDate).length;
        if (scheduledCount > 0) {
          await logProjectHistory({
            project_id: id, company_id, user_id: req.user.id,
            action_type: "TIMELINE_UPDATED",
            detail: `Project timeline was updated. The schedule for ${scheduledCount} milestone(s) was modified.`,
            meta: { event: 'bulk_updated', count: scheduledCount }
          }, t);
        }
      }


      await db.project_team.destroy({ where: { project_id: id }, transaction: t });
      if (team && team.length > 0) {
        const teamData = team.map(member => ({
          project_id: id,
          user_id: member.user_id,
          role: member.role
        }));
        await db.project_team.bulkCreate(teamData, { transaction: t });

        await logProjectHistory({
          project_id: id,
          company_id,
          user_id: req.user.id,
          action_type: "TEAM_UPDATED",
          detail: `team reassigned (${team.length} member(s))`,
        }, t);
      }


      if (req.files && req.files['blueprints'] && req.files['blueprints'].length > 0) {
        const documentData = req.files['blueprints'].map(file => ({
          project_id: id,
          name: file.originalname,
          size: (file.size / 1024).toFixed(2) + " KB",
          url: `/uploads/projects/${file.filename}`,
          mimetype: file.mimetype
        }));
        await db.project_document.bulkCreate(documentData, { transaction: t });


        await logProjectHistory({
          project_id: id,
          company_id,
          user_id: req.user.id,
          action_type: "DOCUMENT_UPLOADED",
          detail: `uploaded ${documentData.length} document(s)`,
        }, t);
      }

      await t.commit();
      res.status(200).json({ message: "Project updated successfully." });

    } catch (error) {
      if (t) await t.rollback();
      console.error("[UPDATE_PROJECT_ERROR]", error);
      res.status(500).json({ message: "Error updating project.", error: error.message });
    }
  }


  async uploadDocuments(req, res) {
    let t;
    try {
      const { id } = req.params;
      const company_id = req.user.company_id;

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

      for (const doc of createdDocs) {
        await logProjectHistory({
          project_id: id,
          company_id,
          user_id: req.user.id,
          action_type: "DOCUMENT_UPLOADED",
          detail: `uploaded document "${doc.name}"`,
          meta: { file_name: doc.name }
        }, t);
      }

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

  async createMilestone(req, res) {
    let t;
    try {
      const { projectId } = req.params;
      const company_id = req.user.company_id;
      const { name, progress, color, startDate, endDate, parent_id } = req.body;

      const project = await db.project.findOne({ where: { id: projectId, company_id } });
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized." });
      }

      t = await db.sequelize.transaction();

      const milestone = await db.milestone.create({
        project_id: projectId,
        name,
        progress: progress || 0,
        color,
        startDate,
        endDate,
        parent_id,
        is_completed: progress === 100
      }, { transaction: t });

      let parentMsName = null;
      if (parent_id) {
        const parentMs = await db.milestone.findByPk(parent_id, { transaction: t });
        parentMsName = parentMs?.name || null;
      }

      await logProjectHistory({
        project_id: projectId,
        company_id,
        user_id: req.user.id,
        action_type: "MILESTONE_ADDED",
        detail: `added ${parent_id ? 'sub-milestone' : 'milestone'} "${name}"`,
        meta: parent_id
          ? { submilestone_name: name, parent_milestone_name: parentMsName, progress: progress || 0 }
          : { milestone_name: name, progress: progress || 0 }
      }, t);


      if (startDate || endDate) {
        if (parent_id) {
          await logProjectHistory({
            project_id: projectId, company_id, user_id: req.user.id,
            action_type: "TIMELINE_UPDATED",
            detail: `sub-milestone "${name}" added under "${parentMsName || 'N/A'}", scheduled from ${startDate || 'N/A'} to ${endDate || 'N/A'}`,
            meta: {
              event: 'submilestone_added',
              submilestone_name: name,
              parent_milestone_name: parentMsName,
              start_date: startDate || null,
              end_date: endDate || null
            }
          }, t);
        } else {
          await logProjectHistory({
            project_id: projectId, company_id, user_id: req.user.id,
            action_type: "TIMELINE_UPDATED",
            detail: `milestone "${name}" added to the project timeline, scheduled from ${startDate || 'N/A'} to ${endDate || 'N/A'}`,
            meta: {
              event: 'milestone_added',
              milestone_name: name,
              start_date: startDate || null,
              end_date: endDate || null
            }
          }, t);
        }
      }

      await t.commit();

      res.status(201).json({ message: "Milestone created successfully.", data: milestone });
    } catch (error) {
      if (t) await t.rollback();
      console.error("[CREATE_MILESTONE_ERROR]", error);
      res.status(500).json({ message: "Error creating milestone.", error: error.message });
    }
  }

  async updateMilestone(req, res) {
    let t;
    try {
      const { projectId, milestoneId } = req.params;
      const company_id = req.user.company_id;
      const { name, progress, color, startDate, endDate, parent_id, status } = req.body;

      const project = await db.project.findOne({ where: { id: projectId, company_id } });
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized." });
      }

      const milestone = await db.milestone.findOne({ where: { id: milestoneId, project_id: projectId } });
      if (!milestone) {
        return res.status(404).json({ message: "Milestone not found." });
      }

      t = await db.sequelize.transaction();

      const oldProgress = milestone.progress;
      const oldStartDate = milestone.startDate ? new Date(milestone.startDate).toISOString() : null;
      const oldEndDate = milestone.endDate ? new Date(milestone.endDate).toISOString() : null;
      const newStartDate = startDate ? new Date(startDate).toISOString() : oldStartDate;
      const newEndDate = endDate ? new Date(endDate).toISOString() : oldEndDate;


      const effectiveParentId = parent_id !== undefined ? parent_id : milestone.parent_id;
      const isSubmilestone = !!effectiveParentId;

      let parentMilestoneName = null;
      if (isSubmilestone) {
        const parentMilestone = await db.milestone.findByPk(effectiveParentId, { transaction: t });
        parentMilestoneName = parentMilestone ? parentMilestone.name : null;
      }

      await milestone.update({
        name,
        progress: progress !== undefined ? progress : milestone.progress,
        color,
        startDate,
        endDate,
        parent_id,
        status,
        is_completed: progress === 100
      }, { transaction: t });

      const finalName = name || milestone.name;
      const finalProgress = progress !== undefined ? progress : milestone.progress;
      const finalStatus = status || milestone.status;

      await logProjectHistory({
        project_id: projectId,
        company_id,
        user_id: req.user.id,
        action_type: "MILESTONE_UPDATED",
        detail: `milestone "${finalName}" updated${progress !== undefined && progress !== oldProgress ? ` (progress ${oldProgress}% → ${progress}%)` : ''}`,
        meta: isSubmilestone
          ? {
            submilestone_name: finalName,
            parent_milestone_name: parentMilestoneName,
            progress: finalProgress,
            status: finalStatus
          }
          : {
            milestone_name: finalName,
            progress: finalProgress,
            status: finalStatus
          }
      }, t);

      if (newStartDate !== oldStartDate || newEndDate !== oldEndDate) {
        const fmt = (d) => d ? new Date(d).toISOString().split('T')[0] : 'N/A';
        await logProjectHistory({
          project_id: projectId, company_id, user_id: req.user.id,
          action_type: "TIMELINE_UPDATED",
          detail: isSubmilestone
            ? `sub-milestone "${finalName}" timeline was updated from ${fmt(oldStartDate)} - ${fmt(oldEndDate)} to ${fmt(newStartDate)} - ${fmt(newEndDate)}`
            : `milestone "${finalName}" schedule was changed from ${fmt(oldStartDate)} - ${fmt(oldEndDate)} to ${fmt(newStartDate)} - ${fmt(newEndDate)}`,
          meta: isSubmilestone
            ? {
              event: 'submilestone_date_changed',
              submilestone_name: finalName,
              parent_milestone_name: parentMilestoneName,
              old_start_date: oldStartDate, old_end_date: oldEndDate,
              new_start_date: newStartDate, new_end_date: newEndDate
            }
            : {
              event: 'milestone_date_changed',
              milestone_name: finalName,
              old_start_date: oldStartDate, old_end_date: oldEndDate,
              new_start_date: newStartDate, new_end_date: newEndDate
            }
        }, t);
      }

      await t.commit();

      res.status(200).json({ message: "Milestone updated successfully.", data: milestone });
    } catch (error) {
      if (t) await t.rollback();
      console.error("[UPDATE_MILESTONE_ERROR]", error);
      res.status(500).json({ message: "Error updating milestone.", error: error.message });
    }
  }

  async getBudget_ProjectById(req, res) {
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


  async getBudget_total_spent_ProjectById(req, res) {
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

      projectData.vendor_invoice = vendor_invoice ? vendor_invoice.toJSON() : null;
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


  async getBudget_total_spent_ProjectALL(req, res) {
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

      projectData.vendor_invoice = vendor_invoice ? vendor_invoice.toJSON() : null;
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


  async getBudget_vendorProjectById(req, res) {
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
            attributes: [
              'id', 'firstname', 'lastname', 'email', 'avatar'
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

      let updateData = {
        material_used: total_material,
        equipment_used: total_equipment,
        labor_used: total_labor,
        other_used: total_others,
      };

      await db.project.update(updateData, {
        where: { id, company_id },
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


  async getBudgetall_vendorProjectById(req, res) {
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
            attributes: [
              'id', 'firstname', 'lastname', 'email', 'avatar'
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

      let updateData = {
        material_used: total_material,
        equipment_used: total_equipment,
        labor_used: total_labor,
        other_used: total_others,
      };

      await db.project.update(updateData, {
        where: { id, company_id },
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

  async getProjectHistory(req, res) {
    try {
      const { projectId } = req.params;
      const company_id = req.user.company_id;

      const project = await db.project.findOne({ where: { id: projectId, company_id } });
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized." });
      }

      const history = await db.project_history.findAll({
        where: { project_id: projectId },
        include: [
          { model: db.user, as: "user", attributes: ["id", "firstname", "lastname", "avatar"] }
        ],
        order: [["createdAt", "DESC"]]
      });

      return res.status(200).json({ success: true, data: history });
    } catch (error) {
      console.error("[GET_PROJECT_HISTORY_ERROR]", error);
      return res.status(500).json({ message: "Error fetching project history.", error: error.message });
    }
  }

  async backfillProjectHistory(req, res) {
    try {
      const company_id = req.user.company_id;

      const projects = await db.project.findAll({ where: { company_id } });

      let createdCount = 0;
      let skippedCount = 0;

      for (const p of projects) {
        const existing = await db.project_history.findOne({
          where: { project_id: p.id }
        });

        if (!existing) {
          await db.project_history.create({
            project_id: p.id,
            company_id: p.company_id,
            user_id: null,
            action_type: "CREATED",
            detail: `project "${p.name}" existed before history tracking was enabled`,
            createdAt: p.createdAt,
            updatedAt: p.createdAt
          });
          createdCount++;
        } else {
          skippedCount++;
        }
      }

      return res.status(200).json({
        success: true,
        message: `Backfill complete. Created: ${createdCount}, Skipped (already had history): ${skippedCount}`
      });
    } catch (error) {
      console.error("[BACKFILL_PROJECT_HISTORY_ERROR]", error);
      return res.status(500).json({ message: "Error backfilling history.", error: error.message });
    }
  }

  async get_companywise_ProjectById(req, res) {
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

      const taskMap = Object.create(null);

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

      let updateData = {
        material_used: total_material,
        equipment_used: total_equipment,
        labor_used: total_labor,
        other_used: total_others,
      };

      await db.project.update(updateData, {
        where: { id, company_id },
      });

      const totalSpend = invoices.reduce((sum, invoice) => {
        return sum + parseFloat(invoice.paid_amount || 0);
      }, 0);

      const grand_total = invoices.reduce((sum, invoice) => {
        return sum + parseFloat(invoice.grand_total || 0);
      }, 0);

      const on_hold = (grand_total - totalSpend);
      const remaining_budget = (projectData.budget_total - grand_total);

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
}

module.exports = new ProjectController();