const projectCtrl = require("./project.controller");
const upload = require("../../shared/middlewares/upload.middleware");

module.exports = (router) => {
  // Create Project (with milestones, team members, and file uploads)
  // 'blueprints' is the field name for multiple file uploads
  router.post(
    "/projects", 
    upload.array("blueprints", 10), 
    projectCtrl.createProject
  );

  // List all projects for the company
  router.get("/projects", projectCtrl.getAllProjects);

  // Get single project details
  router.get("/projects/:id", projectCtrl.getProjectById);

  // Get project timeline data
  router.get("/projects/:projectId/timeline", projectCtrl.getProjectTimeline);

  // --- Milestone Routes ---
  router.post("/projects/:projectId/milestones", projectCtrl.createMilestone);
  router.put("/projects/:projectId/milestones/:milestoneId", projectCtrl.updateMilestone);
  
  // Upload project documents/media
  router.post(
    "/projects/:id/documents",
    upload.array("files", 10),
    projectCtrl.uploadDocuments
  );

  // Update existing project
  router.put(
    "/projects/:id",
    upload.array("blueprints", 10),
    projectCtrl.updateProject
  );

  // --- Task Management Routes ---
  const taskCtrl = require("./task.controller");

  // Get project tasks
  router.get("/projects/:projectId/tasks", taskCtrl.getTasksByProject);

  // Create task
  router.post("/projects/:projectId/tasks", taskCtrl.createTask);

  // Update task (details or status)
  router.put("/tasks/:taskId", taskCtrl.updateTask);

  // Delete task
  router.delete("/tasks/:taskId", taskCtrl.deleteTask);

  // Comments
  router.post("/tasks/:taskId/comments", taskCtrl.addComment);

  // Attachments
  router.post(
    "/tasks/:taskId/attachments", 
    upload.array("attachments", 10), 
    taskCtrl.uploadAttachment
  );

  // Sub-tasks
  router.post("/tasks/:taskId/subtasks", taskCtrl.createSubTask);
  router.put("/subtasks/:subTaskId", taskCtrl.updateSubTask);
  router.delete("/subtasks/:subTaskId", taskCtrl.deleteSubTask);
};
