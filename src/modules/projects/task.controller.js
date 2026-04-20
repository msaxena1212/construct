const db = require("../../models");

class ProjectTaskController {
  constructor() {
    this.getTasksByProject = this.getTasksByProject.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addComment = this.addComment.bind(this);
    this.uploadAttachment = this.uploadAttachment.bind(this);
  }

  /**
   * Get all tasks for a project
   */
  async getTasksByProject(req, res) {
    try {
      const { projectId } = req.params;
      const tasks = await db.project_task.findAll({
        where: { project_id: projectId, parent_id: null }, // Only top-level tasks
        include: [
          { model: db.project_task, as: 'subtasks' },
          { model: db.user, as: 'assignees', attributes: ['id', 'firstname', 'lastname', 'avatar'] },
          { model: db.task_attachment, as: 'attachments' },
          { 
            model: db.task_comment, 
            as: 'comments',
            include: [{ model: db.user, as: 'user', attributes: ['id', 'firstname', 'lastname', 'avatar'] }]
          },
          { 
            model: db.task_activity, 
            as: 'activities',
            include: [{ model: db.user, as: 'user', attributes: ['id', 'firstname', 'lastname', 'avatar'] }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json({ data: tasks });
    } catch (error) {
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
      const { title, description, priority, status, due_date, assignees, parent_id } = req.body;
      const user_id = req.user.id;

      t = await db.sequelize.transaction();

      const task = await db.project_task.create({
        project_id: projectId,
        parent_id: parent_id || null,
        title,
        description,
        priority,
        status,
        due_date,
      }, { transaction: t });

      if (assignees && assignees.length > 0) {
        await task.setAssignees(assignees, { transaction: t });
      }

      // Log activity
      await db.task_activity.create({
        task_id: task.id,
        user_id,
        action_type: 'CREATION',
        detail: `initialized the task: "${title}"`
      }, { transaction: t });

      await t.commit();
      res.status(201).json({ data: task });
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
      const { title, description, priority, status, progress, due_date, assignees } = req.body;
      const user_id = req.user.id;

      const task = await db.project_task.findByPk(taskId);
      if (!task) return res.status(404).json({ message: "Task not found." });

      t = await db.sequelize.transaction();

      const oldStatus = task.status;
      await task.update({ title, description, priority, status, progress, due_date }, { transaction: t });

      if (assignees) {
        await task.setAssignees(assignees, { transaction: t });
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
    try {
      const { taskId } = req.params;
      await db.project_task.destroy({ where: { id: taskId } });
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
}

module.exports = new ProjectTaskController();
