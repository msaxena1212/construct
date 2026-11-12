const { sequelize, connectDB, Model, Sequelize, DataTypes } = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// RBAC START
db.user = require("../modules/users/models/user.model.js")(sequelize, Sequelize);
db.company = require("../modules/users/models/company.model.js")(sequelize, Sequelize);
db.role = require("../modules/rbac/models/roles.model.js")(sequelize, Sequelize);
db.rbac_module = require("../modules/rbac/models/module.model.js")(sequelize, Sequelize);
db.employee_history = require("../modules/users/models/employee-history.model.js")(sequelize, Sequelize);

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

db.user.hasMany(db.employee_history, { foreignKey: "user_id", as: "employee_history" });
db.employee_history.belongsTo(db.user, { foreignKey: "user_id", as: "employee" });

db.user.hasMany(db.employee_history, { foreignKey: "performed_by", as: "performed_actions" });
db.employee_history.belongsTo(db.user, { foreignKey: "performed_by", as: "performer" });

db.company.hasMany(db.employee_history, { foreignKey: "company_id", as: "employee_history" });
db.employee_history.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

// RBAC END

// PROJECT MANAGEMENT START
db.project = require("../modules/projects/models/project.model.js")(sequelize, Sequelize);
db.milestone = require("../modules/projects/models/milestone.model.js")(sequelize, Sequelize);
db.project_team = require("../modules/projects/models/team.model.js")(sequelize, Sequelize);
db.project_document = require("../modules/projects/models/document.model.js")(sequelize, Sequelize);
// Project master data (scope section 03): clients, consultants and the project structure
const projectMaster = require("../modules/projects/models/project_master.models.js");
db.client_master = projectMaster.client_master(sequelize, Sequelize);
db.consultant_master = projectMaster.consultant_master(sequelize, Sequelize);
db.project_phase = projectMaster.project_phase(sequelize, Sequelize);
db.project_zone = projectMaster.project_zone(sequelize, Sequelize);
db.project_discipline = projectMaster.project_discipline(sequelize, Sequelize);
db.project_cost_centre = projectMaster.project_cost_centre(sequelize, Sequelize);
db.project_work_package = projectMaster.project_work_package(sequelize, Sequelize);
// PROJECT HISTORY START
db.project_history = require("../modules/projects/models/project-history.model.js")(sequelize, Sequelize);

// Task Management Models
db.project_task = require("../modules/projects/models/task.model.js")(sequelize, Sequelize);
db.task_attachment = require("../modules/projects/models/task-attachment.model.js")(sequelize, Sequelize);
db.task_comment = require("../modules/projects/models/task-comment.model.js")(sequelize, Sequelize);
db.task_activity = require("../modules/projects/models/task-activity.model.js")(sequelize, Sequelize);
db.project_task_assignee = require("../modules/projects/models/task-assignee.model.js")(sequelize, Sequelize);
db.project_sub_task = require("../modules/projects/models/sub-task.model.js")(sequelize, Sequelize);
db.project_task_dependency = require("../modules/projects/models/task-dependency.model.js")(sequelize, Sequelize);

// Construction Extension Models
db.dpr = require("../modules/projects/models/dpr.model.js")(sequelize, Sequelize);
db.dpr_work_item = require("../modules/projects/models/dpr_work_item.model.js")(sequelize, Sequelize);
db.dpr_image = require("../modules/projects/models/dpr_image.model.js")(sequelize, Sequelize);
db.retention_release = require("../modules/projects/models/retention_release.model.js")(sequelize, Sequelize);
db.bank_guarantee = require("../modules/projects/models/bank_guarantee.model.js")(sequelize, Sequelize);
db.boq_item = require("../modules/projects/models/boq_item.model.js")(sequelize, Sequelize);
db.snag_item = require("../modules/projects/models/snag_item.model.js")(sequelize, Sequelize);
db.labour_attendance = require("../modules/projects/models/labour_attendance.model.js")(sequelize, Sequelize);
db.drawing_register = require("../modules/projects/models/drawing_register.model.js")(sequelize, Sequelize);

// Batch L: WBS, CBS & Budget Models
db.wbs = require("../modules/projects/models/wbs.model.js")(sequelize, Sequelize);
db.cbs = require("../modules/projects/models/cbs.model.js")(sequelize, Sequelize);
db.budget = require("../modules/projects/models/budget.model.js")(sequelize, Sequelize);
db.budget_line = require("../modules/projects/models/budget_line.model.js")(sequelize, Sequelize);
db.commitment_ledger = require("../modules/projects/models/commitment_ledger.model.js")(sequelize, Sequelize);
db.budget_head = require("../modules/projects/models/budget_head.model.js")(sequelize, Sequelize);
db.budget_head_allocation = require("../modules/projects/models/budget_head_allocation.model.js")(sequelize, Sequelize);
db.cost_ledger = require("../modules/projects/models/cost_ledger.model.js")(sequelize, Sequelize);

// Batch R: Measurement Book & Contractor RA Billing
db.measurement_book = require("../modules/projects/models/measurement_book.model.js")(sequelize, Sequelize);
db.measurement_book_item = require("../modules/projects/models/measurement_book_item.model.js")(sequelize, Sequelize);
db.contractor_ra_bill = require("../modules/projects/models/contractor_ra_bill.model.js")(sequelize, Sequelize);

// Batch W: Variations, Change Orders & Subcontractor Claims
db.variation_order = require("../modules/projects/models/variation_order.model.js")(sequelize, Sequelize);
db.variation_order_item = require("../modules/projects/models/variation_order_item.model.js")(sequelize, Sequelize);

// Associations for Construction Extension
db.project.hasMany(db.dpr, { foreignKey: "project_id", as: "daily_reports", onDelete: "CASCADE" });
db.dpr.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.dpr.hasMany(db.dpr_work_item, { foreignKey: "dpr_id", as: "work_items", onDelete: "CASCADE" });
db.dpr_work_item.belongsTo(db.dpr, { foreignKey: "dpr_id", as: "dpr" });
db.dpr.hasMany(db.dpr_image, { foreignKey: "dpr_id", as: "images", onDelete: "CASCADE" });
db.dpr_image.belongsTo(db.dpr, { foreignKey: "dpr_id", as: "dpr" });
db.project.hasMany(db.dpr_image, { foreignKey: "project_id", as: "dpr_images", onDelete: "CASCADE" });
db.dpr_image.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.project.hasMany(db.retention_release, { foreignKey: "project_id", as: "retention_releases", onDelete: "CASCADE" });
db.retention_release.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.project.hasMany(db.bank_guarantee, { foreignKey: "project_id", as: "bank_guarantees", onDelete: "CASCADE" });
db.bank_guarantee.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.project.hasMany(db.boq_item, { foreignKey: "project_id", as: "boq_items", onDelete: "CASCADE" });
db.boq_item.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

// Batch W Associations: Variation Orders ↔ Items
db.project.hasMany(db.variation_order, { foreignKey: "project_id", as: "variation_orders", onDelete: "CASCADE" });
db.variation_order.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.company.hasMany(db.variation_order, { foreignKey: "company_id", as: "variation_orders", onDelete: "CASCADE" });
db.variation_order.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.variation_order.hasMany(db.variation_order_item, { foreignKey: "variation_order_id", as: "items", onDelete: "CASCADE" });
db.variation_order_item.belongsTo(db.variation_order, { foreignKey: "variation_order_id", as: "variation_order" });
db.variation_order_item.belongsTo(db.boq_item, { foreignKey: "boq_item_id", as: "boq_item" });

// Batch R Associations: Measurement Book ↔ Items ↔ RA Bills
db.project.hasMany(db.measurement_book, { foreignKey: "project_id", as: "measurement_books", onDelete: "CASCADE" });
db.measurement_book.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.company.hasMany(db.measurement_book, { foreignKey: "company_id", as: "measurement_books", onDelete: "CASCADE" });
db.measurement_book.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.measurement_book.hasMany(db.measurement_book_item, { foreignKey: "mb_id", as: "items", onDelete: "CASCADE" });
db.measurement_book_item.belongsTo(db.measurement_book, { foreignKey: "mb_id", as: "measurement_book" });
db.measurement_book_item.belongsTo(db.boq_item, { foreignKey: "boq_item_id", as: "boq_item" });

db.project.hasMany(db.contractor_ra_bill, { foreignKey: "project_id", as: "contractor_ra_bills", onDelete: "CASCADE" });
db.contractor_ra_bill.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.contractor_ra_bill.hasMany(db.measurement_book_item, { foreignKey: "ra_bill_id", as: "billed_items" });
db.measurement_book_item.belongsTo(db.contractor_ra_bill, { foreignKey: "ra_bill_id", as: "ra_bill" });

// Batch L Associations
db.project.hasMany(db.wbs, { foreignKey: "project_id", as: "wbs_nodes", onDelete: "CASCADE" });
db.wbs.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.wbs.hasMany(db.wbs, { foreignKey: "parent_id", as: "children", onDelete: "CASCADE" });
db.wbs.belongsTo(db.wbs, { foreignKey: "parent_id", as: "parent" });

db.company.hasMany(db.cbs, { foreignKey: "company_id", as: "cbs_codes", onDelete: "CASCADE" });
db.cbs.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.project.hasMany(db.budget, { foreignKey: "project_id", as: "budgets", onDelete: "CASCADE" });
db.budget.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

// Batch N Associations
db.project.hasMany(db.budget_head, { foreignKey: "project_id", as: "budget_heads", onDelete: "CASCADE" });
db.budget_head.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.budget.hasMany(db.budget_head_allocation, { foreignKey: "budget_id", as: "head_allocations", onDelete: "CASCADE" });
db.budget_head_allocation.belongsTo(db.budget, { foreignKey: "budget_id", as: "budget" });

db.budget_head.hasMany(db.budget_head_allocation, { foreignKey: "budget_head_id", as: "allocations", onDelete: "CASCADE" });
db.budget_head_allocation.belongsTo(db.budget_head, { foreignKey: "budget_head_id", as: "head" });

db.budget_head.hasMany(db.budget_line, { foreignKey: "budget_head_id", as: "lines" });
db.budget_line.belongsTo(db.budget_head, { foreignKey: "budget_head_id", as: "head" });

db.budget.hasMany(db.budget_line, { foreignKey: "budget_id", as: "lines", onDelete: "CASCADE" });
db.budget_line.belongsTo(db.budget, { foreignKey: "budget_id", as: "budget" });
db.budget_line.belongsTo(db.wbs, { foreignKey: "wbs_id", as: "wbs" });
db.budget_line.belongsTo(db.cbs, { foreignKey: "cbs_id", as: "cbs" });
db.budget_line.belongsTo(db.boq_item, { foreignKey: "boq_item_id", as: "boq_item" });
// boq_item is mapped directly to project; wbs/cbs linking is maintained via budget_line

db.project.hasMany(db.snag_item, { foreignKey: "project_id", as: "snag_items", onDelete: "CASCADE" });
db.snag_item.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.project.hasMany(db.labour_attendance, { foreignKey: "project_id", as: "labour_logs", onDelete: "CASCADE" });
db.labour_attendance.belongsTo(db.project, { foreignKey: "project_id", as: "project" });

db.project.hasMany(db.drawing_register, { foreignKey: "project_id", as: "drawings", onDelete: "CASCADE" });
db.drawing_register.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.drawing_register.belongsTo(db.user, { foreignKey: "uploaded_by", as: "creator" });

// Vendors Models
db.vendors = require("../modules/vendors/models/vendors_model.js")(sequelize, Sequelize);
// Vendor links for the Phase A control tables (retention releases and bank guarantees). Declared here because
// db.vendors is defined on this line.
db.vendors.hasMany(db.retention_release, { foreignKey: "vendor_id", as: "retention_releases", onDelete: "RESTRICT" });
db.retention_release.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendor" });
db.vendors.hasMany(db.bank_guarantee, { foreignKey: "vendor_id", as: "bank_guarantees", onDelete: "RESTRICT" });
db.bank_guarantee.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendor" });
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
db.stock_ledger = require("../modules/material/models/stock_ledger.model.js")(sequelize, Sequelize);
db.store_location = require("../modules/material/models/store_location.model.js")(sequelize, Sequelize);
db.stock_transfer = require("../modules/material/models/stock_transfer.model.js")(sequelize, Sequelize);
db.stock_transfer_line = require("../modules/material/models/stock_transfer_line.model.js")(sequelize, Sequelize);
db.stock_transfer_event = require("../modules/material/models/stock_transfer_event.model.js")(sequelize, Sequelize);
db.stock_transfer_discrepancy = require("../modules/material/models/stock_transfer_discrepancy.model.js")(sequelize, Sequelize);

// Foreign keys for the location/transfer layer. These match the constraints created by
// migrations/20261029000001-create-store-locations-and-stock-transfers.js.
db.stock_ledger.belongsTo(db.store_location, { foreignKey: "location_id", as: "location", onDelete: "RESTRICT" });
db.stock_ledger.belongsTo(db.stock_transfer, { foreignKey: "transfer_id", as: "transfer", onDelete: "RESTRICT" });
db.stock_transfer.belongsTo(db.store_location, { foreignKey: "source_location_id", as: "source_location", onDelete: "RESTRICT" });
db.stock_transfer.belongsTo(db.store_location, { foreignKey: "destination_location_id", as: "destination_location", onDelete: "RESTRICT" });
db.stock_transfer_line.belongsTo(db.stock_transfer, { foreignKey: "transfer_id", as: "transfer", onDelete: "RESTRICT" });
db.stock_transfer_event.belongsTo(db.stock_transfer, { foreignKey: "transfer_id", as: "transfer", onDelete: "RESTRICT" });
db.stock_transfer_discrepancy.belongsTo(db.stock_transfer, { foreignKey: "transfer_id", as: "transfer", onDelete: "RESTRICT" });
db.stock_transfer_discrepancy.belongsTo(db.stock_transfer_line, { foreignKey: "transfer_line_id", as: "line", onDelete: "RESTRICT" });
db.purchase_order = require("../modules/material/models/purchase_order.model.js")(sequelize, Sequelize);
db.goods_receipt_note = require("../modules/material/models/goods_receipt_note.model.js")(sequelize, Sequelize);

db.material_project_stock_history = require("../modules/material/models/material_project_stock_history.model.js")(sequelize, Sequelize);

db.equipment_project_stock_history = require("../modules/equipment/models/equipment_project_stock_history.model.js")(sequelize, Sequelize);

db.quotation_history = require("../modules/material/models/quotation_history.model.js")(sequelize, Sequelize);


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

// Project ↔ History
db.project.hasMany(db.project_history, { foreignKey: "project_id", as: "history", onDelete: 'CASCADE' });
db.project_history.belongsTo(db.project, { foreignKey: "project_id" });

db.user.hasMany(db.project_history, { foreignKey: "user_id", as: "project_history_logs" });
db.project_history.belongsTo(db.user, { foreignKey: "user_id", as: "user" });

db.company.hasMany(db.project_history, { foreignKey: "company_id", as: "project_history_logs" });
db.project_history.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

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
db.project_task_dependency.belongsTo(db.project_task, { foreignKey: "predecessor_id", as: "predecessor", onDelete: 'CASCADE' });

db.company.hasMany(db.vendors, { foreignKey: "company_id", as: "vendors" });
db.vendors.belongsTo(db.company, { foreignKey: "company_id", as: "company" });
db.company.hasMany(db.vendors_activity, { foreignKey: "company_id", as: "vendors_activity" });
db.vendors_activity.belongsTo(db.company, { foreignKey: "company_id", as: "company" });
db.project.hasMany(db.vendors, { foreignKey: "project_id", as: "vendors" });
db.vendors.belongsTo(db.project, { foreignKey: "project_id", as: "project" });
db.contractor_ra_bill.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "subcontractor" });
db.contractor_ra_bill.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendor" });
db.measurement_book.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendor" });

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
db.user.hasMany(db.material_history, { foreignKey: "user_id", as: "material_history_logs" });
db.material_history.belongsTo(db.user, { foreignKey: "user_id", as: "user" });
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

db.user.hasMany(db.equipment_history, { foreignKey: "user_id", as: "equipment_history_logs" });
db.equipment_history.belongsTo(db.user, { foreignKey: "user_id", as: "user" });

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

db.quotation.hasMany(db.quotation_history, { foreignKey: "quotation_id", as: "quotation_history" });
db.quotation_history.belongsTo(db.quotation, { foreignKey: "quotation_id", as: "quotation" });


// Project master data associations. Foreign keys are defined by the migration and the model attributes,
// so these associations are declared with constraints: false to avoid a second definition.
db.company.hasMany(db.client_master, { foreignKey: "company_id", as: "clients", constraints: false });
db.company.hasMany(db.consultant_master, { foreignKey: "company_id", as: "consultants", constraints: false });
db.client_master.belongsTo(db.company, { foreignKey: "company_id", as: "company", constraints: false });
db.consultant_master.belongsTo(db.company, { foreignKey: "company_id", as: "company", constraints: false });
db.project.belongsTo(db.client_master, { foreignKey: "client_id", as: "client", constraints: false });
db.project.belongsTo(db.consultant_master, { foreignKey: "consultant_id", as: "consultant", constraints: false });
db.project.belongsTo(db.user, { foreignKey: "project_manager_id", as: "project_manager", constraints: false });
for (const child of [db.project_phase, db.project_zone, db.project_discipline, db.project_cost_centre, db.project_work_package]) {
  db.project.hasMany(child, { foreignKey: "project_id", as: child.getTableName().toLowerCase().replace("project_", "") + "s", constraints: false });
  child.belongsTo(db.project, { foreignKey: "project_id", as: "project", constraints: false });
}
db.project_phase.hasMany(db.project_work_package, { foreignKey: "phase_id", as: "work_packages", constraints: false });
db.project_work_package.belongsTo(db.project_phase, { foreignKey: "phase_id", as: "phase", constraints: false });
db.project_zone.hasMany(db.project_zone, { foreignKey: "parent_id", as: "children", constraints: false });
db.project_zone.belongsTo(db.project_zone, { foreignKey: "parent_id", as: "parent", constraints: false });
db.project_discipline.hasMany(db.project_work_package, { foreignKey: "discipline_id", as: "work_packages", constraints: false });
db.project_work_package.belongsTo(db.project_discipline, { foreignKey: "discipline_id", as: "discipline", constraints: false });
db.project_zone.hasMany(db.project_work_package, { foreignKey: "zone_id", as: "work_packages", constraints: false });
db.project_work_package.belongsTo(db.project_zone, { foreignKey: "zone_id", as: "zone", constraints: false });
db.project_cost_centre.hasMany(db.project_work_package, { foreignKey: "cost_centre_id", as: "work_packages", constraints: false });
db.project_work_package.belongsTo(db.project_cost_centre, { foreignKey: "cost_centre_id", as: "cost_centre", constraints: false });
db.vendors.hasMany(db.project_work_package, { foreignKey: "vendor_id", as: "work_packages", constraints: false });
db.project_work_package.belongsTo(db.vendors, { foreignKey: "vendor_id", as: "vendor", constraints: false });

// PROJECT MANAGEMENT END


module.exports = db;
