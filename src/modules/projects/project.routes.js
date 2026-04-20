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
};
