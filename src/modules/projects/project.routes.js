const projectCtrl = require("./project.controller");
const upload = require("../../shared/middlewares/upload.middleware");
const checkPermission = require("../../core/middleware/permission.middleware");

module.exports = (router) => {
  // Create Project (with milestones, team members, and file uploads)
  // 'blueprints' is the field name for multiple file uploads
  router.post(
    "/projects",
    upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'blueprints', maxCount: 10 }
    ]),
    checkPermission("projects", "can_create"),
    projectCtrl.createProject
  );

  // List all projects for the company
  // router.get("/projects", projectCtrl.getAllProjects);
  router.get("/projects", projectCtrl.getAllProjects);

  // Get single project details
  router.get("/projects/:id",checkPermission("projects", "can_read"),  projectCtrl.getProjectById);

  // Get project timeline data
  router.get("/projects/:projectId/timeline",checkPermission("projects", "can_read"), projectCtrl.getProjectTimeline);

  // --- Milestone Routes ---
  router.post("/projects/:projectId/milestones",checkPermission("projects", "can_create"), projectCtrl.createMilestone);
  router.put("/projects/:projectId/milestones/:milestoneId", checkPermission("projects", "can_update"), projectCtrl.updateMilestone);

  // Upload project documents/media
  router.post(
    "/projects/:id/documents",
    upload.array("files", 10), checkPermission("projects", "can_create"),
    projectCtrl.uploadDocuments
  );

  // Update existing project
  router.put(
    "/projects/:id",
    upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'blueprints', maxCount: 10 }
    ]),
    checkPermission("projects", "can_update"),
    projectCtrl.updateProject
  );

  // --- Task Management Routes ---
  const taskCtrl = require("./task.controller");

  // Get project tasks
  router.get("/projects/:projectId/tasks",   checkPermission("tasks", "can_read"), taskCtrl.getTasksByProject);

  // Create task
  router.post("/projects/:projectId/tasks", checkPermission("tasks", "can_create"),taskCtrl.createTask);

  // Update task (details or status)
  router.put("/tasks/:taskId", checkPermission("tasks", "can_update"), taskCtrl.updateTask);

  // Delete task
  router.delete("/tasks/:taskId", checkPermission("tasks", "can_delete"), taskCtrl.deleteTask);

  // Comments
  router.post("/tasks/:taskId/comments",checkPermission("tasks", "can_create"), taskCtrl.addComment);

  // Attachments
  router.post(
    "/tasks/:taskId/attachments",
    upload.array("attachments", 10),checkPermission("tasks", "can_create"),
    taskCtrl.uploadAttachment
  );

  // Sub-tasks
  router.post("/tasks/:taskId/subtasks", checkPermission("tasks", "can_create"), taskCtrl.createSubTask);
  router.put("/subtasks/:subTaskId", checkPermission("tasks", "can_update"), taskCtrl.updateSubTask);
  router.delete("/subtasks/:subTaskId", checkPermission("tasks", "can_delete"), taskCtrl.deleteSubTask);



  router.get("/getBudget_ProjectById/:id", checkPermission("projects", "can_read"),projectCtrl.getBudget_ProjectById);


  router.get("/getBudget_total_spent_ProjectById/:id", checkPermission("projects", "can_read"), projectCtrl.getBudget_total_spent_ProjectById);

  router.get("/getBudget_total_spent_ProjectALL/:id", checkPermission("projects", "can_read"), projectCtrl.getBudget_total_spent_ProjectALL);


  router.get("/getBudget_vendorProjectById/:id", checkPermission("projects", "can_read"), projectCtrl.getBudget_vendorProjectById);

  router.get("/getBudgetall_vendorProjectById/:id", checkPermission("projects", "can_read"), projectCtrl.getBudgetall_vendorProjectById);



};
