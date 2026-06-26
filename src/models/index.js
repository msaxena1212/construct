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

// Vendors Models
db.vendors = require("../modules/vendors/models/vendors_model.js")(sequelize, Sequelize);
db.vendors_activity = require("../modules/vendors/models/vendors_activity_model.js")(sequelize, Sequelize);
db.vendors_labor = require("../modules/vendors/models/vendors_labor_model.js")(sequelize, Sequelize);
db.vendors_invoice = require("../modules/vendors/models/vendors_invoice_model.js")(sequelize, Sequelize);
db.vendors_payment_request = require("../modules/vendors/models/vendors_payment_request_model.js")(sequelize, Sequelize);
db.vendors_audit = require("../modules/vendors/models/vendors_audit_model.js")(sequelize, Sequelize);
db.vendors_history = require("../modules/vendors/models/vendors_history_model.js")(sequelize, Sequelize);
db.skill = require("../modules/skill/model/skill_model.js")(sequelize, Sequelize);
//Material
db.material_master = require("../modules/material/models/material_master.model.js")(sequelize, Sequelize);

db.quotation = require("../modules/material/models/quotation.model.js")(sequelize, Sequelize);

db.material = require("../modules/material/models/material.model.js")(sequelize, Sequelize);

db.material_project_stock = require("../modules/material/models/material_project_stock.model.js")(sequelize, Sequelize);

db.material_project_stock_history = require("../modules/material/models/material_project_stock_history.model.js")(sequelize, Sequelize);

db.equipment_project_stock_history = require("../modules/equipment/models/equipment_project_stock_history.model.js")(sequelize, Sequelize);

//Labor
// db.labor = require("../modules/labor/models/labor_models.js")(sequelize, Sequelize);
db.material_history = require("../modules/material/models/material_history.model.js")(sequelize, Sequelize);

//equipment
db.equipment_master = require("../modules/equipment/models/equipment_master.model.js")(sequelize, Sequelize);

db.equipment = require("../modules/equipment/models/equipment.model.js")(sequelize, Sequelize);

db.equipment_project_stock = require("../modules/equipment/models/equipment_project_stock.model.js")(sequelize, Sequelize);

db.equipment_history = require("../modules/equipment/models/equipment_history.model.js")(sequelize, Sequelize);

db.category = require("../modules/category/model/category_model.js")(sequelize, Sequelize);
db.meeting = require("../modules/meeting/model/meeting.model.js")(sequelize, Sequelize);

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

db.milestone.hasMany(db.project_task, { foreignKey: "submilestone_id", as: "tasks_submilestone", onDelete: 'CASCADE' });
db.project_task.belongsTo(db.milestone, { foreignKey: "submilestone_id", as: "submilestone" });


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


db.material.hasMany(db.project_sub_task, { foreignKey: "material_id", as: "sub_tasks", onDelete: 'CASCADE' });
db.project_sub_task.belongsTo(db.material, { foreignKey: "material_id", as: "material" });

db.equipment.hasMany(db.project_sub_task, { foreignKey: "equipment_id", as: "sub_tasks", onDelete: 'CASCADE' });
db.project_sub_task.belongsTo(db.equipment, { foreignKey: "equipment_id", as: "equipment" });

db.vendors_labor.hasMany(db.project_sub_task, { foreignKey: "labor_id", as: "sub_tasks", onDelete: 'CASCADE' });
db.project_sub_task.belongsTo(db.vendors_labor, { foreignKey: "labor_id", as: "vendors_labor" });



db.project_task.hasMany(db.project_task_dependency, { foreignKey: "task_id", as: "dependencies", onDelete: 'CASCADE' });
db.project_task_dependency.belongsTo(db.project_task, { foreignKey: "task_id" });
db.project_task_dependency.belongsTo(db.project_task, { foreignKey: "predecessor_id", as: "predecessor" });

db.company.hasMany(db.vendors, { foreignKey: "company_id", as: "vendors" });
db.vendors.belongsTo(db.company, { foreignKey: "company_id", as: "company" });
db.company.hasMany(db.vendors_activity, { foreignKey: "company_id", as: "vendors_activity" });
db.vendors_activity.belongsTo(db.company, { foreignKey: "company_id", as: "company" });
db.project.hasMany(db.vendors, { foreignKey: "project_id", as: "vendors" });
db.vendors.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.company.hasMany(db.material_master, { foreignKey: "company_id", as: "material_master" });
db.material_master.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.company.hasMany(db.quotation, { foreignKey: "company_id", as: "quotation" });
db.quotation.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.quotation.hasMany(db.material, { foreignKey: "quotation_id", as: "material" });
db.material.belongsTo(db.quotation, { foreignKey: "quotation_id", as: "quotation" });

db.material_master.hasMany(db.material, { foreignKey: "material_master_id", as: "material" });
db.material.belongsTo(db.material_master, { foreignKey: "material_master_id", as: "material_master" });

db.company.hasMany(db.material, { foreignKey: "company_id", as: "material" });
db.material.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.vendors.hasMany(db.material, { foreignKey: "vendor_id", as: "material" });
db.material.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendors" });

// db.project.hasMany(db.material, { foreignKey: "project_id", as: "material" });
// db.material.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.material.hasMany(db.material_project_stock, { foreignKey: "material_id", as: "material_project_stock" });
db.material_project_stock.belongsTo(db.material, { foreignKey: "material_id", as: "material" });

db.quotation.hasMany(db.material_project_stock, { foreignKey: "quotation_id", as: "material_project_stock" });
db.material_project_stock.belongsTo(db.quotation, { foreignKey: "quotation_id", as: "quotation" });

db.material_master.hasMany(db.material_project_stock, { foreignKey: "material_master_id", as: "material_project_stock" });
db.material_project_stock.belongsTo(db.material_master, { foreignKey: "material_master_id", as: "material_master" });

db.company.hasMany(db.material_project_stock, { foreignKey: "company_id", as: "material_project_stock" });
db.material_project_stock.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.vendors.hasMany(db.material_project_stock, { foreignKey: "vendor_id", as: "material_project_stock" });
db.material_project_stock.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendors" });

db.project.hasMany(db.material_project_stock, { foreignKey: "project_id", as: "material_project_stock" });
db.material_project_stock.belongsTo(db.project, { foreignKey: "project_id", as: "project" });


db.material_master.hasMany(db.material_history, { foreignKey: "material_master_id", as: "material_history" });
db.material_history.belongsTo(db.material_master, { foreignKey: "material_master_id", as: "material_master" });

db.material.hasMany(db.material_history, { foreignKey: "material_id", as: "material_history" });
db.material_history.belongsTo(db.material, { foreignKey: "material_id", as: "material" });

db.company.hasMany(db.material_history, { foreignKey: "company_id", as: "material_history" });
db.material_history.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.vendors.hasMany(db.material_history, { foreignKey: "vendor_id", as: "material_history" });
db.material_history.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendors" });

db.project.hasMany(db.material_history, { foreignKey: "project_id", as: "material_history" });
db.material_history.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.StockRequest = require("../modules/stock-requests/model/stockRequestModel.js")(sequelize, Sequelize);

db.quotation.hasMany(db.material_history, { foreignKey: "quotation_id", as: "material_history" });
db.material_history.belongsTo(db.quotation, { foreignKey: "quotation_id", as: "quotation" });

db.company.hasMany(db.equipment_master, { foreignKey: "company_id", as: "equipment_master" });
db.equipment_master.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.equipment_master.hasMany(db.equipment, { foreignKey: "equipment_master_id", as: "equipment" });
db.equipment.belongsTo(db.equipment_master, { foreignKey: "equipment_master_id", as: "equipment_master" });

db.quotation.hasMany(db.equipment, { foreignKey: "quotation_id", as: "equipment" });
db.equipment.belongsTo(db.quotation, { foreignKey: "quotation_id", as: "quotation" });

db.company.hasMany(db.equipment, { foreignKey: "company_id", as: "equipment" });
db.equipment.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.vendors.hasMany(db.equipment, { foreignKey: "vendor_id", as: "equipment" });
db.equipment.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendors" });

// db.project.hasMany(db.equipment, { foreignKey: "project_id", as: "equipment" });
// db.equipment.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.equipment.hasMany(db.equipment_project_stock, { foreignKey: "equipment_id", as: "equipment_project_stock" });
db.equipment_project_stock.belongsTo(db.equipment, { foreignKey: "equipment_id", as: "equipment" });

db.quotation.hasMany(db.equipment_project_stock, { foreignKey: "quotation_id", as: "equipment_project_stock" });
db.equipment_project_stock.belongsTo(db.quotation, { foreignKey: "quotation_id", as: "quotation" });

db.equipment_master.hasMany(db.equipment_project_stock, { foreignKey: "equipment_master_id", as: "equipment_project_stock" });
db.equipment_project_stock.belongsTo(db.equipment_master, { foreignKey: "equipment_master_id", as: "equipment_master" });

db.company.hasMany(db.equipment_project_stock, { foreignKey: "company_id", as: "equipment_project_stock" });
db.equipment_project_stock.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.vendors.hasMany(db.equipment_project_stock, { foreignKey: "vendor_id", as: "equipment_project_stock" });
db.equipment_project_stock.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendors" });

db.project.hasMany(db.equipment_project_stock, { foreignKey: "project_id", as: "equipment_project_stock" });
db.equipment_project_stock.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.equipment_master.hasMany(db.equipment_history, { foreignKey: "equipment_master_id", as: "equipment_history" });
db.equipment_history.belongsTo(db.equipment_master, { foreignKey: "equipment_master_id", as: "equipment_master" });

db.equipment.hasMany(db.equipment_history, { foreignKey: "equipment_id", as: "equipment_history" });
db.equipment_history.belongsTo(db.equipment, { foreignKey: "equipment_id", as: "equipment" });

db.company.hasMany(db.equipment_history, { foreignKey: "company_id", as: "equipment_history" });
db.equipment_history.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.vendors.hasMany(db.equipment_history, { foreignKey: "vendor_id", as: "equipment_history" });
db.equipment_history.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendors" });

db.project.hasMany(db.equipment_history, { foreignKey: "project_id", as: "equipment_history" });
db.equipment_history.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.quotation.hasMany(db.equipment_history, { foreignKey: "quotation_id", as: "equipment_history" });
db.equipment_history.belongsTo(db.quotation, { foreignKey: "quotation_id", as: "quotation" });

// For Vendors_labor]
db.company.hasMany(db.vendors_labor, {
    foreignKey: 'company_id',
    as: 'vendors_labor'
});

db.vendors_labor.belongsTo(db.company, {
    foreignKey: 'company_id',
    as: 'company'
});

db.vendors.hasMany(db.vendors_labor, {
    foreignKey: 'vendor_id',
    as: 'vendors_labor'
});

db.vendors_labor.belongsTo(db.vendors, {
    foreignKey: 'vendor_id',
    as: 'vendor'
});

// Vendor ↔ Invoice
db.vendors.hasMany(db.vendors_invoice, { foreignKey: 'vendor_id', as: 'invoices' });
db.vendors_invoice.belongsTo(db.vendors, { foreignKey: 'vendor_id', as: 'vendor' });

db.company.hasMany(db.vendors_invoice, { foreignKey: 'company_id', as: 'vendors_invoices' });
db.vendors_invoice.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

db.project.hasMany(db.vendors_invoice, { foreignKey: "project_id", as: "vendors_invoices" });
db.vendors_invoice.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

// Vendor ↔ Payment Request
db.vendors.hasMany(db.vendors_payment_request, { foreignKey: 'vendor_id', as: 'payment_requests' });
db.vendors_payment_request.belongsTo(db.vendors, { foreignKey: 'vendor_id', as: 'vendor' });

db.vendors_invoice.hasMany(db.vendors_payment_request, { foreignKey: 'invoice_id', as: 'payment_requests' });
db.vendors_payment_request.belongsTo(db.vendors_invoice, { foreignKey: 'invoice_id', as: 'invoice' });

db.company.hasMany(db.vendors_payment_request, { foreignKey: 'company_id', as: 'vendors_payment_requests' });
db.vendors_payment_request.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });
// Vendor ↔ Audit
db.vendors.hasMany(db.vendors_audit, { foreignKey: 'vendor_id', as: 'audits' });
db.vendors_audit.belongsTo(db.vendors, { foreignKey: 'vendor_id', as: 'vendor' });

db.company.hasMany(db.vendors_audit, { foreignKey: 'company_id', as: 'vendors_audits' });
db.vendors_audit.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// Vendor ↔ History
db.vendors.hasMany(db.vendors_history, { foreignKey: 'vendor_id', as: 'history' });
db.vendors_history.belongsTo(db.vendors, { foreignKey: 'vendor_id', as: 'vendor' });

db.company.hasMany(db.vendors_history, { foreignKey: 'company_id', as: 'vendors_history' });
db.vendors_history.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

db.project.hasMany(db.vendors_history, { foreignKey: 'project_id', as: 'vendors_history' });
db.vendors_history.belongsTo(db.project, { foreignKey: 'project_id', as: 'project' });

// Skill ↔ Master
db.company.hasMany(db.skill, { foreignKey: 'company_id', as: 'skill' });
db.skill.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

db.company.hasMany(db.category, { foreignKey: "company_id", as: "category" });
db.category.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

// Calendar Meeting----->
db.company.hasMany(db.meeting, { foreignKey: "company_id", as: "meetings" });
db.meeting.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.project.hasMany(db.meeting, { foreignKey: "project_id", as: "meetings" });
db.meeting.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.vendors.hasMany(db.meeting, { foreignKey: "vendor_id", as: "meetings" });
db.meeting.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendor" });

db.user.hasMany(db.meeting, { foreignKey: "created_by", as: "created_meetings" });
db.meeting.belongsTo(db.user, { foreignKey: "created_by", as: "creator" });



db.material_project_stock.hasMany(db.material_project_stock_history, { foreignKey: "material_project_stock_id", as: "material_project_stock_history" });
db.material_project_stock_history.belongsTo(db.material_project_stock, { foreignKey: "material_project_stock_id", as: "material_project_stock" });

db.equipment_project_stock.hasMany(db.equipment_project_stock_history, { foreignKey: "equipment_project_stock_id", as: "equipment_project_stock_history" });
db.equipment_project_stock_history.belongsTo(db.equipment_project_stock, { foreignKey: "equipment_project_stock_id", as: "equipment_project_stock" });


// PROJECT MANAGEMENT END
// ── LABOR associations ──────────────────────────────────────
// Labor → Company
// db.company.hasMany(db.labor, { foreignKey: 'company_id', as: 'laborWorkers' });
// db.labor.belongsTo(db.company, { foreignKey: 'company_id', as: 'company' });

// db.vendors.hasMany(db.labor, { foreignKey: 'vendor_id', as: 'laborWorkers' });
// db.labor.belongsTo(db.vendors, { foreignKey: 'vendor_id', as: 'vendors' });



connectDB();
module.exports = db;
