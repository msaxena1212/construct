const { sequelize, connectDB, Model, Sequelize, DataTypes } = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// RBAC START
db.user = require("../modules/users/models/user.model.js")(sequelize, Sequelize);
db.company = require("../modules/users/models/company.model.js")(sequelize, Sequelize);
db.role = require("../modules/rbac/models/roles.model.js")(sequelize, Sequelize);
db.rbac_module = require("../modules/rbac/models/module.model.js")(sequelize, Sequelize);

db.company.hasMany(db.user, { foreignKey: "company_id" });
db.user.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.company.hasMany(db.role, { foreignKey: "company_id", as: "roles" });
db.role.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.role.hasMany(db.user, { foreignKey: "role_id" });
db.user.belongsTo(db.role, { foreignKey: "role_id", as: "role" });

db.role_permission = require("../modules/rbac/models/role_permission.model.js")(sequelize, Sequelize);

// Permissions associations
db.role.hasMany(db.role_permission, { foreignKey: 'role_id', as: 'permissions' });
db.role_permission.belongsTo(db.role, { foreignKey: 'role_id' });

db.rbac_module.hasMany(db.role_permission, { foreignKey: 'module_id', as: 'module_permissions' });
db.role_permission.belongsTo(db.rbac_module, { foreignKey: 'module_id', as: 'module' });

// RBAC END

// PROJECT MANAGEMENT START
db.project = require("../modules/projects/models/project.model.js")(sequelize, Sequelize);
db.milestone = require("../modules/projects/models/milestone.model.js")(sequelize, Sequelize);
db.project_team = require("../modules/projects/models/team.model.js")(sequelize, Sequelize);
db.project_document = require("../modules/projects/models/document.model.js")(sequelize, Sequelize);

// Task Management Models
db.project_task = require("../modules/projects/models/task.model.js")(sequelize, Sequelize);
db.task_attachment = require("../modules/projects/models/task-attachment.model.js")(sequelize, Sequelize);
db.task_comment = require("../modules/projects/models/task-comment.model.js")(sequelize, Sequelize);
db.task_activity = require("../modules/projects/models/task-activity.model.js")(sequelize, Sequelize);
db.project_task_assignee = require("../modules/projects/models/task-assignee.model.js")(sequelize, Sequelize);
// Associations
db.company.hasMany(db.project, { foreignKey: "company_id", as: "projects" });
db.project.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.project.hasMany(db.milestone, { foreignKey: "project_id", as: "milestones", onDelete: 'CASCADE' });
db.milestone.belongsTo(db.project, { foreignKey: "project_id" });

db.project.hasMany(db.project_document, { foreignKey: "project_id", as: "documents", onDelete: 'CASCADE' });
db.project_document.belongsTo(db.project, { foreignKey: "project_id" });

db.project.belongsToMany(db.user, { through: db.project_team, foreignKey: "project_id", as: "team_members" });
db.user.belongsToMany(db.project, { through: db.project_team, foreignKey: "user_id", as: "projects" });

// Task Management Associations
db.project.hasMany(db.project_task, { foreignKey: "project_id", as: "tasks", onDelete: 'CASCADE' });
db.project_task.belongsTo(db.project, { foreignKey: "project_id" });

db.project_task.belongsTo(db.project_task, { foreignKey: "parent_id", as: "parent" });
db.project_task.hasMany(db.project_task, { foreignKey: "parent_id", as: "subtasks", onDelete: 'CASCADE' });

db.project_task.belongsToMany(db.user, { through: db.project_task_assignee, foreignKey: "task_id", as: "assignees" });
db.user.belongsToMany(db.project_task, { through: db.project_task_assignee, foreignKey: "user_id", as: "assigned_tasks" });

db.project_task.hasMany(db.task_attachment, { foreignKey: "task_id", as: "attachments", onDelete: 'CASCADE' });
db.task_attachment.belongsTo(db.project_task, { foreignKey: "task_id" });

db.project_task.hasMany(db.task_comment, { foreignKey: "task_id", as: "comments", onDelete: 'CASCADE' });
db.task_comment.belongsTo(db.project_task, { foreignKey: "task_id" });
db.task_comment.belongsTo(db.user, { foreignKey: "user_id", as: "user" });

db.project_task.hasMany(db.task_activity, { foreignKey: "task_id", as: "activities", onDelete: 'CASCADE' });
db.task_activity.belongsTo(db.project_task, { foreignKey: "task_id" });
db.task_activity.belongsTo(db.user, { foreignKey: "user_id", as: "user" });
// PROJECT MANAGEMENT END

connectDB();
module.exports = db;
