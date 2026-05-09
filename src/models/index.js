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
db.project_sub_task = require("../modules/projects/models/sub-task.model.js")(sequelize, Sequelize);
db.project_task_dependency = require("../modules/projects/models/task-dependency.model.js")(sequelize, Sequelize);
db.vendor = require("../modules/vendors/models/vendors_model.js")(sequelize, Sequelize);
db.activity = require("../modules/vendors/models/vendors_activity_model.js")(sequelize, Sequelize);


//Material
db.material = require("../modules/material/models/material.model.js")(sequelize, Sequelize);

//Labor
db.labor = require("../modules/labor/models/labor_models.js")(sequelize, Sequelize);

// Associations
db.company.hasMany(db.project, { foreignKey: "company_id", as: "projects" });
db.project.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.project.hasMany(db.milestone, { foreignKey: "project_id", as: "milestones", onDelete: 'CASCADE' });
db.milestone.belongsTo(db.project, { foreignKey: "project_id" });
db.milestone.hasMany(db.milestone, { foreignKey: 'parent_id', as: 'subMilestones', onDelete: 'CASCADE' })
db.milestone.belongsTo(db.milestone, { foreignKey: 'parent_id', as: 'parent' })

db.project.hasMany(db.project_document, { foreignKey: "project_id", as: "documents", onDelete: 'CASCADE' });
db.project_document.belongsTo(db.project, { foreignKey: "project_id" });

db.project.belongsToMany(db.user, { through: db.project_team, foreignKey: "project_id", as: "team_members" });
db.user.belongsToMany(db.project, { through: db.project_team, foreignKey: "user_id", as: "projects" });

// Task Management Associations
db.project.hasMany(db.project_task, { foreignKey: "project_id", as: "tasks", onDelete: 'CASCADE' });
db.project_task.belongsTo(db.project, { foreignKey: "project_id" });

db.milestone.hasMany(db.project_task, { foreignKey: "milestone_id", as: "tasks", onDelete: 'CASCADE' });
db.project_task.belongsTo(db.milestone, { foreignKey: "milestone_id", as: "milestone" });

db.project_task.belongsToMany(db.user, { through: db.project_task_assignee, foreignKey: "task_id", as: "assignees" });
db.user.belongsToMany(db.project_task, { through: db.project_task_assignee, foreignKey: "user_id", as: "assigned_tasks" });

db.project_task.belongsTo(db.user, { foreignKey: "created_by", as: "creator" });
db.user.hasMany(db.project_task, { foreignKey: "created_by", as: "created_tasks" });

db.project_task.hasMany(db.task_attachment, { foreignKey: "task_id", as: "attachments", onDelete: 'CASCADE' });
db.task_attachment.belongsTo(db.project_task, { foreignKey: "task_id" });

db.project_task.hasMany(db.task_comment, { foreignKey: "task_id", as: "comments", onDelete: 'CASCADE' });
db.task_comment.belongsTo(db.project_task, { foreignKey: "task_id" });
db.task_comment.belongsTo(db.user, { foreignKey: "user_id", as: "user" });

db.project_task.hasMany(db.task_activity, { foreignKey: "task_id", as: "activities", onDelete: 'CASCADE' });
db.task_activity.belongsTo(db.project_task, { foreignKey: "task_id" });

db.user.hasMany(db.task_activity, { foreignKey: "user_id", as: "activities" });
db.task_activity.belongsTo(db.user, { foreignKey: "user_id", as: "user" });

db.project_task.hasMany(db.project_sub_task, { foreignKey: "task_id", as: "sub_tasks", onDelete: 'CASCADE' });
db.project_sub_task.belongsTo(db.project_task, { foreignKey: "task_id", as: "task" });

db.project_task.hasMany(db.project_task_dependency, { foreignKey: "task_id", as: "dependencies", onDelete: 'CASCADE' });
db.project_task_dependency.belongsTo(db.project_task, { foreignKey: "task_id" });
db.project_task_dependency.belongsTo(db.project_task, { foreignKey: "predecessor_id", as: "predecessor" });

db.company.hasMany(db.vendor, { foreignKey: "company_id", as: "vendor" });
db.vendor.belongsTo(db.company, { foreignKey: "company_id", as: "company" });
db.company.hasMany(db.activity, { foreignKey: "company_id", as: "activity" });
db.activity.belongsTo(db.company, { foreignKey: "company_id", as: "company" });
// PROJECT MANAGEMENT END
// ════════════════════════════════════════════════
//  LABOR MODULE — all models
// ════════════════════════════════════════════════
db.labor = require('../modules/labor/models/labor_models.js')(sequelize, Sequelize);

db.labor_contractor_metric = require('../modules/labor/models/labor_contractor_metric_model.js')(sequelize, Sequelize);
db.labor_stats = require('../modules/labor/models/labor_stats_model.js')(sequelize, Sequelize);
db.labor_skills = require('../modules/labor/models/labor_skills_model.js')(sequelize, Sequelize);
db.labor_financials = require('../modules/labor/models/labor_financials_model.js')(sequelize, Sequelize);
db.labor_heatmap = require('../modules/labor/models/labor_heatmap_model.js')(sequelize, Sequelize);
db.labor_report = require('../modules/labor/models/labor_report_model.js')(sequelize, Sequelize);
db.labor_worker_activity = require('../modules/labor/models/labor_worker_activity_model.js')(sequelize, Sequelize);

// ── Labor (Workers) associations ─────────────────────────
// Labor belongs to Company
db.company.hasMany(db.labor, { foreignKey: 'company_id', as: 'laborWorkers' });
db.labor.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// Labor belongs to Vendor (fixed: was wrongly set on company before)
db.vendor.hasMany(db.labor, { foreignKey: 'vendor_id', as: 'laborWorkers' });
db.labor.belongsTo(db.vendor, { foreignKey: 'vendor_id', as: 'vendor' });

// Worker Activities
db.labor.hasMany(db.labor_worker_activity, { foreignKey: 'labor_id', as: 'activities', onDelete: 'CASCADE' });
db.labor_worker_activity.belongsTo(db.labor, { foreignKey: 'labor_id', as: 'worker' });

// ── LaborContractorMetric associations ────────────────────
// Metric belongs to Company
db.company.hasMany(db.labor_contractor_metric, { foreignKey: 'company_id', as: 'contractorMetrics' });
db.labor_contractor_metric.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// Metric belongs to Vendor
db.vendor.hasMany(db.labor_contractor_metric, { foreignKey: 'vendor_id', as: 'contractorMetrics' });
db.labor_contractor_metric.belongsTo(db.vendor, { foreignKey: 'vendor_id', as: 'vendor' });

// ── LaborStats associations ───────────────────────────────
db.company.hasMany(db.labor_stats, { foreignKey: 'company_id', as: 'laborStats' });
db.labor_stats.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// ── LaborSkillsDistribution associations ─────────────────
db.company.hasMany(db.labor_skills, { foreignKey: 'company_id', as: 'laborSkills' });
db.labor_skills.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// ── LaborFinancials associations ──────────────────────────
db.company.hasMany(db.labor_financials, { foreignKey: 'company_id', as: 'laborFinancials' });
db.labor_financials.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// ── LaborHeatmap associations ─────────────────────────────
db.company.hasMany(db.labor_heatmap, { foreignKey: 'company_id', as: 'laborHeatmap' });
db.labor_heatmap.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// ── LaborReport associations ──────────────────────────────
db.company.hasMany(db.labor_report, { foreignKey: 'company_id', as: 'laborReports' });
db.labor_report.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// ════════════════════════════════════════════════

connectDB();
module.exports = db;
