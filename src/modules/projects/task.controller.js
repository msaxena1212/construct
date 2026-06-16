const db = require("../../models");
const { syncTaskProgress, syncProjectProgress, syncMilestoneProgress } = require("./project.utils");

const { Sequelize } = require("sequelize");

class ProjectTaskController {
  constructor() {
    this.getTasksByProject = this.getTasksByProject.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addComment = this.addComment.bind(this);
    this.uploadAttachment = this.uploadAttachment.bind(this);
    this.createSubTask = this.createSubTask.bind(this);
    this.updateSubTask = this.updateSubTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
  }

  /**
   * Get all tasks for a project
   */
  async getTasksByProject(req, res) {
    try {
      const { projectId } = req.params;
      // const tasks = await db.project_task.findAll({
      //   where: { project_id: projectId }, // Only top-level tasks
      //   include: [
      //     { model: db.project_sub_task, as: 'sub_tasks' },
      //     { model: db.project_task_dependency, as: 'dependencies', include: [{ model: db.project_task, as: 'predecessor', attributes: ['id', 'title'] }] },
      //     { model: db.user, as: 'assignees', attributes: ['id', 'firstname', 'lastname', 'avatar'] },
      //     { model: db.user, as: 'creator', attributes: ['id', 'firstname', 'lastname', 'avatar'] },
      //     { model: db.task_attachment, as: 'attachments' },
      //     { model: db.milestone, as: 'milestone' },
      //     { model: db.milestone, as: 'submilestone' },
      //     {
      //       model: db.task_comment,
      //       as: 'comments',
      //       include: [{ model: db.user, as: 'user', attributes: ['id', 'firstname', 'lastname', 'avatar'] }]
      //     },
      //     {
      //       model: db.task_activity,
      //       as: 'activities',
      //       include: [{ model: db.user, as: 'user', attributes: ['id', 'firstname', 'lastname', 'avatar'] }]
      //     }
      //   ],
      //   order: [['priority', 'ASC'], ['createdAt', 'DESC']]
      // });
      const tasks = await db.project_task.findAll({
        where: { project_id: projectId },

        attributes: {
          include: [
            [Sequelize.col('milestone.name'), 'milestone_name'],
            [Sequelize.col('submilestone.name'), 'submilestone_name']
          ]
        },

        include: [
          { model: db.project_sub_task, as: 'sub_tasks' },
          {
            model: db.project_task_dependency,
            as: 'dependencies',
            include: [
              {
                model: db.project_task,
                as: 'predecessor',
                attributes: ['id', 'title']
              }
            ]
          },
          {
            model: db.user,
            as: 'assignees',
            attributes: ['id', 'firstname', 'lastname', 'avatar']
          },
          {
            model: db.user,
            as: 'creator',
            attributes: ['id', 'firstname', 'lastname', 'avatar']
          },
          { model: db.task_attachment, as: 'attachments' },

          {
            model: db.milestone,
            as: 'milestone',
            attributes: []
          },
          {
            model: db.milestone,
            as: 'submilestone',
            attributes: []
          },

          {
            model: db.task_comment,
            as: 'comments',
            include: [
              {
                model: db.user,
                as: 'user',
                attributes: ['id', 'firstname', 'lastname', 'avatar']
              }
            ]
          },
          {
            model: db.task_activity,
            as: 'activities',
            include: [
              {
                model: db.user,
                as: 'user',
                attributes: ['id', 'firstname', 'lastname', 'avatar']
              }
            ]
          }
        ],

        order: [['priority', 'ASC'], ['createdAt', 'DESC']]
      });
      res.status(200).json({ data: tasks });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Error fetching tasks.", error: error.message });
    }
  }

  /**
   * Create a new task
   */
  async createTask(req, res) {
    let t;
    try {
      const { projectId } = req.params;

      const { title, description, priority, status, due_date, assignees, parent_id, milestone_id, submilestone_id, vendorId } = req.body;

      const user_id = req.user.id;

      t = await db.sequelize.transaction();

      const task = await db.project_task.create({
        project_id: projectId,
        milestone_id: milestone_id || null,
        submilestone_id: submilestone_id || null,
        title,
        description,
        priority,
        status,
        due_date,
        vendorId,
        created_by: user_id,

      },
        { transaction: t });

      if (assignees && assignees.length > 0) {

        await task.setAssignees(assignees, { transaction: t });

      }

      // Handle Sub-tasks
      if (req.body.sub_tasks && req.body.sub_tasks.length > 0) {

        const subTasksData = req.body.sub_tasks.map((st) => ({
          task_id: task.id,
          title: st.title,

          material_id: st.material_id || null,
          itemName: st.itemName || null,
          stockIn: st.stockIn || 0,
          materialQty: st.materialQty || 0,

          equipment_id: st.equipment_id || null,
          equipmentQty: st.equipmentQty || 0,

          labor_id: st.labor_id || null,
          no_of_labor: st.no_of_labor || 0,

          startDate: st.startDate || null,
          endDate: st.endDate || null,

          completed: st.completed || false,
        }));

        await db.project_sub_task.bulkCreate(subTasksData, { transaction: t });

      }

      // Handle Dependencies
      if (req.body.dependencies && req.body.dependencies.length > 0) {

        const depsData = req.body.dependencies.map(d => ({

          task_id: task.id,
          predecessor_id: d.predecessor_id,
          type: d.type || 'FS',
          lag: d.lag || 0

        }));
        await db.project_task_dependency.bulkCreate(depsData, { transaction: t });
      }

      // Handle Initial Comment
      if (req.body.initialComment) {

        await db.task_comment.create({

          task_id: task.id,
          user_id,
          content: req.body.initialComment

        },
          { transaction: t }
        );
      }

      // Log activity
      await db.task_activity.create({
        task_id: task.id,
        user_id,
        action_type: 'CREATION',
        detail: `initialized the task: "${title}"`
      }, { transaction: t });

      // Trigger Progress Sync (Inside transaction)
      await syncTaskProgress(task.id, t);

      await t.commit();

      const taskWithAssociations = await db.project_task.findByPk(task.id, {
        include: [
          { model: db.project_sub_task, as: 'sub_tasks' },
          { model: db.project_task_dependency, as: 'dependencies', include: [{ model: db.project_task, as: 'predecessor', attributes: ['id', 'title'] }] },
          { model: db.user, as: 'assignees', attributes: ['id', 'firstname', 'lastname', 'avatar'] },
          { model: db.user, as: 'creator', attributes: ['id', 'firstname', 'lastname', 'avatar'] },
          { model: db.task_attachment, as: 'attachments' }
        ]
      });

      res.status(201).json({ data: taskWithAssociations });
    } catch (error) {
      if (t) await t.rollback();
      res.status(500).json({ message: "Error creating task.", error: error.message });
    }
  }

  /**
   * Update task (including status change/drag-drop)
   */
  async updateTask(req, res) {
    let t;
    try {
      const { taskId } = req.params;
      const { title, description, priority, status, progress, due_date, assignees, milestone_id, vendorId } = req.body;
      const user_id = req.user.id;

      const task = await db.project_task.findByPk(taskId);
      if (!task) return res.status(404).json({ message: "Task not found." });

      t = await db.sequelize.transaction();

      const oldStatus = task.status;

      // Only update fields that are provided
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (priority !== undefined) updateData.priority = priority;
      if (status !== undefined) updateData.status = status;
      if (progress !== undefined) updateData.progress = progress;
      if (due_date !== undefined) updateData.due_date = due_date;
      if (milestone_id !== undefined) updateData.milestone_id = milestone_id;
      if (vendorId !== undefined) updateData.vendorId = vendorId;

      await task.update(updateData, { transaction: t });

      if (assignees !== undefined) {
        await task.setAssignees(assignees, { transaction: t });
      }

      // Handle Dependencies sync
      if (req.body.dependencies) {
        await db.project_task_dependency.destroy({ where: { task_id: taskId }, transaction: t });
        const depsData = req.body.dependencies.map(d => ({
          task_id: taskId,
          predecessor_id: d.predecessor_id,
          type: d.type,
          lag: d.lag || 0
        }));
        await db.project_task_dependency.bulkCreate(depsData, { transaction: t });
      }

      // Log status change if applicable
      if (status && status !== oldStatus) {
        await db.task_activity.create({
          task_id: taskId,
          user_id,
          action_type: 'STATUS_CHANGE',
          detail: `moved task from "${oldStatus}" to "${status}"`
        }, { transaction: t });
      }

      // Trigger Progress Sync (Inside transaction)
      await syncTaskProgress(taskId, t);

      await t.commit();
      res.status(200).json({ message: "Task updated successfully." });
    } catch (error) {
      if (t) await t.rollback();
      res.status(500).json({ message: "Error updating task.", error: error.message });
    }
  }

  /**
   * Delete task
   */
  async deleteTask(req, res) {
    let t;
    try {
      const { taskId } = req.params;
      const task = await db.project_task.findByPk(taskId);
      if (task) {
        const milestoneId = task.milestone_id;
        const projectId = task.project_id;

        t = await db.sequelize.transaction();
        await task.destroy({ transaction: t });

        // Trigger Progress Sync
        if (milestoneId) await syncMilestoneProgress(milestoneId, t);
        await syncProjectProgress(projectId, t);

        await t.commit();
      }
      res.status(200).json({ message: "Task deleted." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task.", error: error.message });
    }
  }

  /**
   * Add comment to task
   */
  async addComment(req, res) {
    try {
      const { taskId } = req.params;
      const { content } = req.body;
      const user_id = req.user.id;

      const comment = await db.task_comment.create({ task_id: taskId, user_id, content });

      // Log activity
      await db.task_activity.create({
        task_id: taskId,
        user_id,
        action_type: 'COMMENT',
        detail: 'posted a new comment'
      });

      res.status(201).json({ data: comment });
    } catch (error) {
      res.status(500).json({ message: "Error adding comment.", error: error.message });
    }
  }

  /**
   * Upload attachment to task
   */
  async uploadAttachment(req, res) {
    try {
      const { taskId } = req.params;
      const user_id = req.user.id;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded." });
      }

      const documentData = req.files.map(file => ({
        task_id: taskId,
        name: file.originalname,
        size: (file.size / 1024).toFixed(2) + " KB",
        url: `/uploads/tasks/${file.filename}`,
        mimetype: file.mimetype
      }));

      const attachments = await db.task_attachment.bulkCreate(documentData);

      // Log activity
      await db.task_activity.create({
        task_id: taskId,
        user_id,
        action_type: 'FILE_UPLOAD',
        detail: `uploaded ${attachments.length} attachment(s)`
      });

      res.status(201).json({ data: attachments });
    } catch (error) {
      res.status(500).json({ message: "Error uploading attachments.", error: error.message });
    }
  }

  /**
   * Sub-task Management
   */
  async createSubTask(req, res) {
    let t;
    try {
      const { taskId } = req.params;
      const { title } = req.body;

      t = await db.sequelize.transaction();
      const subTask = await db.project_sub_task.create({ task_id: taskId, title }, { transaction: t });

      // Trigger Progress Sync
      await syncTaskProgress(taskId, t);

      await t.commit();
      res.status(201).json({ data: subTask });
    } catch (error) {
      res.status(500).json({ message: "Error creating sub-task.", error: error.message });
    }
  }

  async updateSubTask(req, res) {
    let t;
    try {
      const { subTaskId } = req.params;
      const { title, completed } = req.body;
      const subTask = await db.project_sub_task.findByPk(subTaskId);
      if (!subTask) return res.status(404).json({ message: "Sub-task not found." });

      t = await db.sequelize.transaction();
      await subTask.update({ title, completed }, { transaction: t });

      // Trigger Progress Sync
      await syncTaskProgress(subTask.task_id, t);

      await t.commit();
      res.status(200).json({ data: subTask });
    } catch (error) {
      res.status(500).json({ message: "Error updating sub-task.", error: error.message });
    }
  }

  async deleteSubTask(req, res) {
    let t;
    try {
      const { subTaskId } = req.params;
      const subTask = await db.project_sub_task.findByPk(subTaskId);
      if (subTask) {
        const taskId = subTask.task_id;
        t = await db.sequelize.transaction();
        await subTask.destroy({ transaction: t });
        // Trigger Progress Sync
        await syncTaskProgress(taskId, t);
        await t.commit();
      }
      res.status(200).json({ message: "Sub-task deleted." });
    } catch (error) {
      if (t) await t.rollback();
      res.status(500).json({ message: "Error", error: error.message });
    }
  }
}

module.exports = new ProjectTaskController();
