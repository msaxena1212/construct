'use strict';
/**
 * GENERATED FILE. Do not edit by hand.
 * Source: scripts/schema/generate-baseline.js (run it to regenerate; it is checked with --check).
 *
 * Canonical core schema baseline for FRESH installations. It creates the foundation tables that the
 * migration history never created. Tables and columns already created or added by later migrations
 * are excluded here, so those migrations apply unchanged.
 *
 * Existing databases must NOT run this file blindly. Use scripts/schema/adopt-report.js first.
 * The migrator refuses to apply this baseline when any of its tables already exists.
 */

// Plain descriptor data, readable without Sequelize. up() translates it to query-interface calls.
const SPEC = {
  "order": [
    "RBAC_COMPANY_MASTER",
    "PROJECT",
    "BOQ_ITEMS",
    "CATEGORY",
    "DAILY_PROGRESS_REPORTS",
    "DPR_WORK_ITEMS",
    "RBAC_ROLE_MASTER",
    "RBAC_USER",
    "DRAWING_REGISTER",
    "EQUIPMENT_MASTER",
    "QUOTATION",
    "VENDORS",
    "EQUIPMENT_INVENTORY",
    "EQUIPMENT_INVENTORY_HISTORY",
    "EQUIPMENT_PROJECT_STOCK",
    "EQUIPMENT_PROJECT_STOCK_HISTORY",
    "LABOUR_ATTENDANCE",
    "MATERIAL_MASTER",
    "MATERIAL_INVENTORY",
    "MATERIAL_INVENTORY_HISTORY",
    "MATERIAL_PROJECT_STOCK",
    "MATERIAL_PROJECT_STOCK_HISTORY",
    "MEETING",
    "PROJECT_DOCUMENT",
    "PROJECT_HISTORY",
    "PROJECT_MILESTONE",
    "PROJECT_TASK",
    "VENDORS_LABOR",
    "PROJECT_SUB_TASK",
    "PROJECT_TASK_ASSIGNEE",
    "PROJECT_TASK_DEPENDENCies",
    "PROJECT_TEAM",
    "QUOTATION_HISTORY",
    "RBAC_EMPLOYEE_HISTORY",
    "RBAC_MODULE_MASTER",
    "RBAC_ROLE_PERMISSION_MASTER",
    "SKILL",
    "SNAG_ITEMS",
    "STOCK_REQUESTS",
    "TASK_ACTIVITY",
    "TASK_ATTACHMENT",
    "TASK_COMMENT",
    "VENDORS_ACTIVITY",
    "VENDORS_AUDIT",
    "VENDORS_HISTORY",
    "VENDORS_INVOICE",
    "VENDORS_PAYMENT_REQUEST"
  ],
  "tables": {
    "RBAC_USER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "firstname": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "lastname": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "email": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "mobile": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "password": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "isInviteAccepted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "inviteToken": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "avatar": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "role_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_ROLE_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": [
        {
          "name": "ux_rbac_user_email",
          "fields": [
            "email"
          ],
          "unique": true
        }
      ]
    },
    "RBAC_COMPANY_MASTER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "email": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": [
        {
          "name": "ux_rbac_company_master_email",
          "fields": [
            "email"
          ],
          "unique": true
        }
      ]
    },
    "RBAC_ROLE_MASTER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "type": {
          "type": "ENUM",
          "values": [
            "STATIC",
            "CUSTOM"
          ],
          "allowNull": true
        },
        "is_deleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "RBAC_MODULE_MASTER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "path": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "icon": {
          "type": "STRING",
          "length": 255,
          "allowNull": true,
          "defaultValue": "domain"
        },
        "title": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "status": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "order": {
          "type": "INTEGER",
          "allowNull": true
        },
        "parentId": {
          "type": "INTEGER",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": [
        {
          "name": "ux_rbac_module_master_name",
          "fields": [
            "name"
          ],
          "unique": true
        }
      ]
    },
    "RBAC_EMPLOYEE_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "action": {
          "type": "ENUM",
          "values": [
            "INVITED",
            "INVITE_ACCEPTED",
            "ROLE_ASSIGNED",
            "ROLE_UPDATED",
            "PROFILE_UPDATED",
            "STATUS_ACTIVATED",
            "STATUS_DEACTIVATED"
          ],
          "allowNull": false
        },
        "description": {
          "type": "STRING",
          "length": 500,
          "allowNull": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "performed_by": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "RBAC_ROLE_PERMISSION_MASTER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "can_create": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "can_read": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "can_update": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "can_delete": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "role_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_ROLE_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "module_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_MODULE_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "PROJECT": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "type": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "address": {
          "type": "TEXT",
          "allowNull": true
        },
        "completion_date": {
          "type": "DATE",
          "allowNull": true
        },
        "budget_total": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "budget_used": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "ENUM",
          "values": [
            "On Track",
            "Delayed",
            "Completed"
          ],
          "allowNull": true,
          "defaultValue": "On Track"
        },
        "thumbnail": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "material_total": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "material_used": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "equipment_total": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "equipment_used": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "labor_total": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "labor_used": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "other_total": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "other_used": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "progress": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "latitude": {
          "type": "DECIMAL",
          "precision": 10,
          "scale": 8,
          "allowNull": true
        },
        "longitude": {
          "type": "DECIMAL",
          "precision": 11,
          "scale": 8,
          "allowNull": true
        },
        "place_id": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "PROJECT_MILESTONE": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "phase": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "progress": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "color": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "status": {
          "type": "ENUM",
          "values": [
            "Not Started",
            "In Progress",
            "On Hold",
            "Completed"
          ],
          "allowNull": true,
          "defaultValue": "Not Started"
        },
        "startDate": {
          "type": "DATE",
          "allowNull": true
        },
        "endDate": {
          "type": "DATE",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "parent_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT_MILESTONE",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "PROJECT_TEAM": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "role": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": [
        {
          "name": "PROJECT_TEAM_user_id_project_id_unique",
          "fields": [
            "project_id",
            "user_id"
          ],
          "unique": true
        }
      ]
    },
    "PROJECT_DOCUMENT": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "size": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "url": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "mimetype": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "PROJECT_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "action_type": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "detail": {
          "type": "TEXT",
          "allowNull": true
        },
        "meta": {
          "type": "JSON",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "PROJECT_TASK": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "title": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "description": {
          "type": "TEXT",
          "allowNull": true
        },
        "priority": {
          "type": "ENUM",
          "values": [
            "High Priority",
            "Medium Priority",
            "Low Priority",
            "Archived"
          ],
          "allowNull": true,
          "defaultValue": "Medium Priority"
        },
        "status": {
          "type": "ENUM",
          "values": [
            "To Do",
            "In Progress",
            "Review",
            "Completed"
          ],
          "allowNull": true,
          "defaultValue": "To Do"
        },
        "progress": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "vendorId": {
          "type": "INTEGER",
          "allowNull": true
        },
        "due_date": {
          "type": "DATE",
          "allowNull": true
        },
        "created_by": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "milestone_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT_MILESTONE",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "submilestone_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT_MILESTONE",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "TASK_ATTACHMENT": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "task_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT_TASK",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "url": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "size": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "mimetype": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "TASK_COMMENT": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "task_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT_TASK",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "NO ACTION",
            "onUpdate": "CASCADE"
          }
        },
        "content": {
          "type": "TEXT",
          "allowNull": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "TASK_ACTIVITY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "task_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT_TASK",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "action_type": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "detail": {
          "type": "TEXT",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "PROJECT_TASK_ASSIGNEE": {
      "columns": {
        "task_id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "references": {
            "table": "PROJECT_TASK",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": [
        {
          "name": "PROJECT_TASK_ASSIGNEE_user_id_task_id_unique",
          "fields": [
            "task_id",
            "user_id"
          ],
          "unique": true
        }
      ]
    },
    "PROJECT_SUB_TASK": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "title": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "completed": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "itemName": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "materialQty": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "equipmentQty": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "no_of_labor": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "startDate": {
          "type": "DATEONLY",
          "allowNull": true
        },
        "endDate": {
          "type": "DATEONLY",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "task_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT_TASK",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "material_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "MATERIAL_INVENTORY",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "equipment_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "EQUIPMENT_INVENTORY",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "labor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS_LABOR",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "PROJECT_TASK_DEPENDENCies": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "task_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT_TASK",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "predecessor_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT_TASK",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "type": {
          "type": "ENUM",
          "values": [
            "FS",
            "SS",
            "FF",
            "SF"
          ],
          "allowNull": true,
          "defaultValue": "FS"
        },
        "lag": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "DAILY_PROGRESS_REPORTS": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "report_date": {
          "type": "DATEONLY",
          "allowNull": false
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "created_by": {
          "type": "INTEGER",
          "allowNull": false
        },
        "weather_summary": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "work_summary": {
          "type": "TEXT",
          "allowNull": true
        },
        "ai_executive_summary": {
          "type": "TEXT",
          "allowNull": true
        },
        "ai_delay_risks": {
          "type": "JSON",
          "allowNull": true
        },
        "total_workforce_count": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "ENUM",
          "values": [
            "draft",
            "submitted",
            "approved",
            "rejected"
          ],
          "allowNull": true,
          "defaultValue": "draft"
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "DPR_WORK_ITEMS": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "dpr_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "DAILY_PROGRESS_REPORTS",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "task_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "milestone_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "location_grid": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "quantity_executed": {
          "type": "DECIMAL",
          "precision": 10,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "unit": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "description": {
          "type": "TEXT",
          "allowNull": false
        },
        "progress_percentage": {
          "type": "FLOAT",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "ENUM",
          "values": [
            "in_progress",
            "completed",
            "delayed"
          ],
          "allowNull": true,
          "defaultValue": "in_progress"
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "BOQ_ITEMS": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "item_code": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "description": {
          "type": "TEXT",
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "unit": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "estimated_qty": {
          "type": "DECIMAL",
          "precision": 12,
          "scale": 2,
          "allowNull": false,
          "defaultValue": 0
        },
        "unit_rate": {
          "type": "DECIMAL",
          "precision": 12,
          "scale": 2,
          "allowNull": false,
          "defaultValue": 0
        },
        "total_estimated_amount": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": false,
          "defaultValue": 0
        },
        "executed_qty": {
          "type": "DECIMAL",
          "precision": 12,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "billed_amount": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "SNAG_ITEMS": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "title": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "description": {
          "type": "TEXT",
          "allowNull": true
        },
        "location_pin": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "trade": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "severity": {
          "type": "ENUM",
          "values": [
            "low",
            "medium",
            "high",
            "critical"
          ],
          "allowNull": true,
          "defaultValue": "medium"
        },
        "status": {
          "type": "ENUM",
          "values": [
            "open",
            "in_progress",
            "resolved",
            "closed"
          ],
          "allowNull": true,
          "defaultValue": "open"
        },
        "assigned_to": {
          "type": "INTEGER",
          "allowNull": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "photo_url": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "ai_defect_tags": {
          "type": "JSON",
          "allowNull": true
        },
        "due_date": {
          "type": "DATEONLY",
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "LABOUR_ATTENDANCE": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "attendance_date": {
          "type": "DATEONLY",
          "allowNull": false
        },
        "trade_type": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "skill_level": {
          "type": "ENUM",
          "values": [
            "skilled",
            "semi_skilled",
            "unskilled"
          ],
          "allowNull": true,
          "defaultValue": "skilled"
        },
        "headcount": {
          "type": "INTEGER",
          "allowNull": false,
          "defaultValue": 1
        },
        "shift": {
          "type": "ENUM",
          "values": [
            "day",
            "night",
            "overtime"
          ],
          "allowNull": true,
          "defaultValue": "day"
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "overtime_hours": {
          "type": "DECIMAL",
          "precision": 5,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "daily_wage_rate": {
          "type": "DECIMAL",
          "precision": 10,
          "scale": 2,
          "allowNull": true
        },
        "total_cost": {
          "type": "DECIMAL",
          "precision": 12,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "notes": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "DRAWING_REGISTER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "drawing_number": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "title": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "discipline": {
          "type": "ENUM",
          "values": [
            "Architectural",
            "Structural",
            "MEP",
            "Civil",
            "Landscape",
            "Fire_Safety"
          ],
          "allowNull": false,
          "defaultValue": "Structural"
        },
        "revision": {
          "type": "STRING",
          "length": 255,
          "allowNull": true,
          "defaultValue": "R0"
        },
        "status": {
          "type": "ENUM",
          "values": [
            "draft",
            "under_review",
            "approved_for_construction",
            "superseded",
            "rejected"
          ],
          "allowNull": true,
          "defaultValue": "approved_for_construction"
        },
        "file_url": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "uploaded_by": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "ai_drawing_summary": {
          "type": "TEXT",
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "VENDORS": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "project_ids": {
          "type": "TEXT",
          "allowNull": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "spoc_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "spoc_phone": {
          "type": "STRING",
          "length": 20,
          "allowNull": false
        },
        "official_email": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "official_phone": {
          "type": "STRING",
          "length": 20,
          "allowNull": false
        },
        "gst_no": {
          "type": "STRING",
          "length": 20,
          "allowNull": true
        },
        "pan_card_no": {
          "type": "STRING",
          "length": 15,
          "allowNull": true
        },
        "physical_address": {
          "type": "TEXT",
          "allowNull": false
        },
        "pincode": {
          "type": "STRING",
          "length": 10,
          "allowNull": false
        },
        "budget_allocation": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": false,
          "defaultValue": 0
        },
        "skill": {
          "type": "TEXT",
          "allowNull": false
        },
        "contract_file": {
          "type": "TEXT",
          "allowNull": true
        },
        "status": {
          "type": "ENUM",
          "values": [
            "active",
            "pending",
            "inactive"
          ],
          "allowNull": false,
          "defaultValue": "active"
        },
        "compliance_score": {
          "type": "INTEGER",
          "allowNull": false,
          "defaultValue": 0
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": [
        {
          "name": "ux_vendors_official_email",
          "fields": [
            "official_email"
          ],
          "unique": true
        },
        {
          "name": "gst_unique",
          "fields": [
            "gst_no"
          ],
          "unique": true
        },
        {
          "name": "pan_unique",
          "fields": [
            "pan_card_no"
          ],
          "unique": true
        }
      ]
    },
    "VENDORS_ACTIVITY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "icon": {
          "type": "ENUM",
          "values": [
            "invoice",
            "cert",
            "assign"
          ],
          "allowNull": false
        },
        "title": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "description": {
          "type": "TEXT",
          "allowNull": false
        },
        "time_label": {
          "type": "STRING",
          "length": 50,
          "allowNull": false,
          "defaultValue": "JUST NOW"
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "VENDORS_LABOR": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "skill": {
          "type": "TEXT",
          "allowNull": false
        },
        "assign_worker": {
          "type": "STRING",
          "length": 255,
          "allowNull": true,
          "defaultValue": null
        },
        "daily_rate": {
          "type": "DECIMAL",
          "precision": 10,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "labor_count": {
          "type": "INTEGER",
          "allowNull": false,
          "defaultValue": 0
        },
        "count": {
          "type": "INTEGER",
          "allowNull": false
        },
        "status": {
          "type": "ENUM",
          "values": [
            "active",
            "on_site",
            "off_duty",
            "inactive"
          ],
          "allowNull": false,
          "defaultValue": "active"
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "VENDORS_INVOICE": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "invoice_number": {
          "type": "STRING",
          "length": 100,
          "allowNull": false
        },
        "invoice_date": {
          "type": "DATEONLY",
          "allowNull": false
        },
        "items": {
          "type": "TEXT",
          "allowNull": true
        },
        "subtotal": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "tax_rate": {
          "type": "DECIMAL",
          "precision": 5,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "tax_amount": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "grand_total": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "ENUM",
          "values": [
            "Pending",
            "Paid",
            "Cancelled",
            "Partially Paid"
          ],
          "allowNull": true,
          "defaultValue": "Pending"
        },
        "settlement_type": {
          "type": "ENUM",
          "values": [
            "work_poc",
            "milestone",
            "lumpsum"
          ],
          "allowNull": true
        },
        "settlement_completion": {
          "type": "DECIMAL",
          "precision": 5,
          "scale": 2,
          "allowNull": true
        },
        "milestone_ids": {
          "type": "TEXT",
          "allowNull": true
        },
        "sub_milestone_ids": {
          "type": "TEXT",
          "allowNull": true
        },
        "task_ids": {
          "type": "TEXT",
          "allowNull": true
        },
        "payment_mode": {
          "type": "ENUM",
          "values": [
            "Bank Transfer",
            "UPI",
            "Cheque",
            "Cash"
          ],
          "allowNull": true
        },
        "payment_reference": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "cheque_clearance_date": {
          "type": "DATEONLY",
          "allowNull": true
        },
        "paid_amount": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true,
          "defaultValue": 0
        },
        "paid_at": {
          "type": "DATE",
          "allowNull": true
        },
        "payment_history": {
          "type": "TEXT",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "VENDORS_PAYMENT_REQUEST": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "invoice_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "VENDORS_INVOICE",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "amount": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": false
        },
        "mode": {
          "type": "ENUM",
          "values": [
            "Bank Transfer",
            "UPI",
            "Cheque",
            "Cash"
          ],
          "allowNull": false
        },
        "reference": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "clearance_date": {
          "type": "DATEONLY",
          "allowNull": true
        },
        "settlement_type": {
          "type": "ENUM",
          "values": [
            "work_poc",
            "milestone",
            "lumpsum"
          ],
          "allowNull": true
        },
        "settlement_completion": {
          "type": "DECIMAL",
          "precision": 5,
          "scale": 2,
          "allowNull": true
        },
        "milestone_ids": {
          "type": "TEXT",
          "allowNull": true
        },
        "sub_milestone_ids": {
          "type": "TEXT",
          "allowNull": true
        },
        "task_ids": {
          "type": "TEXT",
          "allowNull": true
        },
        "status": {
          "type": "ENUM",
          "values": [
            "pending_approval",
            "approved",
            "rejected",
            "paid"
          ],
          "allowNull": true,
          "defaultValue": "pending_approval"
        },
        "budget_allocated": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true
        },
        "budget_invoiced": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true
        },
        "exceeded_by": {
          "type": "DECIMAL",
          "precision": 15,
          "scale": 2,
          "allowNull": true
        },
        "approved_by": {
          "type": "INTEGER",
          "allowNull": true
        },
        "approved_at": {
          "type": "DATE",
          "allowNull": true
        },
        "rejection_reason": {
          "type": "TEXT",
          "allowNull": true
        },
        "requested_by": {
          "type": "INTEGER",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "VENDORS_AUDIT": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "quality": {
          "type": "TINYINT",
          "allowNull": false
        },
        "timeliness": {
          "type": "TINYINT",
          "allowNull": false
        },
        "safety": {
          "type": "TINYINT",
          "allowNull": false
        },
        "composite_score": {
          "type": "DECIMAL",
          "precision": 5,
          "scale": 2,
          "allowNull": false
        },
        "observations": {
          "type": "TEXT",
          "allowNull": true
        },
        "audit_date": {
          "type": "DATEONLY",
          "allowNull": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "VENDORS_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "entity_type": {
          "type": "ENUM",
          "values": [
            "vendor",
            "invoice",
            "labor",
            "audit"
          ],
          "allowNull": false
        },
        "entity_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "action": {
          "type": "ENUM",
          "values": [
            "created",
            "updated",
            "deleted",
            "status_changed",
            "payment_added",
            "payment_request_raised",
            "payment_request_approved",
            "payment_request_rejected"
          ],
          "allowNull": true
        },
        "changed_by": {
          "type": "INTEGER",
          "allowNull": true
        },
        "changed_by_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "description": {
          "type": "STRING",
          "length": 500,
          "allowNull": false
        },
        "old_values": {
          "type": "TEXT",
          "allowNull": true
        },
        "new_values": {
          "type": "TEXT",
          "allowNull": true
        },
        "meta": {
          "type": "TEXT",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "SKILL": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "skill_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "status": {
          "type": "ENUM",
          "values": [
            "ACTIVE",
            "INACTIVE"
          ],
          "allowNull": false,
          "defaultValue": "ACTIVE"
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": false,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "MATERIAL_MASTER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockAvailable": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "QUOTATION": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "quotation_number": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "date": {
          "type": "DATE",
          "allowNull": false
        },
        "sales_person": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "items": {
          "type": "JSON",
          "allowNull": true
        },
        "total_amount": {
          "type": "FLOAT",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "ENUM",
          "values": [
            "Draft",
            "Sent",
            "Negotiating",
            "Approved",
            "Rejected"
          ],
          "allowNull": true,
          "defaultValue": "Draft"
        },
        "vendor_feedback": {
          "type": "TEXT",
          "allowNull": true
        },
        "last_updated": {
          "type": "DATE",
          "allowNull": true,
          "defaultValue": {
            "now": true
          }
        },
        "quotation_status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "quotation_type": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": [
        {
          "name": "ux_quotation_quotation_number",
          "fields": [
            "quotation_number"
          ],
          "unique": true
        }
      ]
    },
    "MATERIAL_INVENTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "stockRemaining": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "QUOTATION",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "material_master_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "MATERIAL_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "MATERIAL_PROJECT_STOCK": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "project_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "material_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "MATERIAL_INVENTORY",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "QUOTATION",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "material_master_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "MATERIAL_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "MATERIAL_PROJECT_STOCK_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "project_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "material_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "material_master_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "material_project_stock_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "MATERIAL_PROJECT_STOCK",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "EQUIPMENT_PROJECT_STOCK_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "project_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "equipment_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "equipment_master_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "equipment_project_stock_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "EQUIPMENT_PROJECT_STOCK",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "QUOTATION_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "quotation_number": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "date": {
          "type": "DATE",
          "allowNull": false
        },
        "sales_person": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "items": {
          "type": "JSON",
          "allowNull": true
        },
        "total_amount": {
          "type": "FLOAT",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "ENUM",
          "values": [
            "Draft",
            "Sent",
            "Negotiating",
            "Approved",
            "Rejected"
          ],
          "allowNull": true,
          "defaultValue": "Draft"
        },
        "vendor_feedback": {
          "type": "TEXT",
          "allowNull": true
        },
        "last_updated": {
          "type": "DATE",
          "allowNull": true,
          "defaultValue": {
            "now": true
          }
        },
        "quotation_status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "quotation_type": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "QUOTATION",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": [
        {
          "name": "ux_quotation_history_quotation_number",
          "fields": [
            "quotation_number"
          ],
          "unique": true
        }
      ]
    },
    "MATERIAL_INVENTORY_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "project_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "note": {
          "type": "TEXT",
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "material_master_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "MATERIAL_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "material_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "MATERIAL_INVENTORY",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "QUOTATION",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "EQUIPMENT_MASTER": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockAvailable": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "EQUIPMENT_INVENTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "stockRemaining": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "equipment_master_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "EQUIPMENT_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "QUOTATION",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "EQUIPMENT_PROJECT_STOCK": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "project_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        },
        "equipment_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "EQUIPMENT_INVENTORY",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "QUOTATION",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "equipment_master_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "EQUIPMENT_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        }
      },
      "indexes": []
    },
    "EQUIPMENT_INVENTORY_HISTORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "user_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "sku": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockIn": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "cost": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "stockUsed": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 0
        },
        "status": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "equipment_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "EQUIPMENT_INVENTORY",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "equipment_master_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "EQUIPMENT_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "project_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "quotation_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "QUOTATION",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "note": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": false
        },
        "isActive": {
          "type": "BOOLEAN",
          "allowNull": true,
          "defaultValue": true
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "CATEGORY": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
          }
        },
        "category_name": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "category_type": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "status": {
          "type": "ENUM",
          "values": [
            "ACTIVE",
            "INACTIVE"
          ],
          "allowNull": false,
          "defaultValue": "ACTIVE"
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": false,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "MEETING": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "title": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "description": {
          "type": "TEXT",
          "allowNull": true
        },
        "date": {
          "type": "DATEONLY",
          "allowNull": false
        },
        "time": {
          "type": "STRING",
          "length": 10,
          "allowNull": true,
          "defaultValue": "10:00"
        },
        "duration": {
          "type": "INTEGER",
          "allowNull": true,
          "defaultValue": 30
        },
        "attendees": {
          "type": "JSON",
          "allowNull": true
        },
        "meet_link": {
          "type": "STRING",
          "length": 255,
          "allowNull": true
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "PROJECT",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "VENDORS",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "vendor_ids": {
          "type": "JSON",
          "allowNull": true
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_COMPANY_MASTER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "created_by": {
          "type": "INTEGER",
          "allowNull": true,
          "references": {
            "table": "RBAC_USER",
            "key": "id",
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE"
          }
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    },
    "STOCK_REQUESTS": {
      "columns": {
        "id": {
          "type": "INTEGER",
          "allowNull": false,
          "primaryKey": true,
          "autoIncrement": true
        },
        "material_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "equipment_id": {
          "type": "INTEGER",
          "allowNull": true
        },
        "task_title": {
          "type": "STRING",
          "length": 255,
          "allowNull": false
        },
        "requested_qty": {
          "type": "INTEGER",
          "allowNull": false
        },
        "available_qty": {
          "type": "INTEGER",
          "allowNull": false
        },
        "project_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "company_id": {
          "type": "INTEGER",
          "allowNull": false
        },
        "status": {
          "type": "ENUM",
          "values": [
            "pending",
            "approved",
            "rejected"
          ],
          "allowNull": false,
          "defaultValue": "pending"
        },
        "isDeleted": {
          "type": "BOOLEAN",
          "allowNull": false,
          "defaultValue": false
        },
        "createdAt": {
          "type": "DATE",
          "allowNull": false
        },
        "updatedAt": {
          "type": "DATE",
          "allowNull": false
        }
      },
      "indexes": []
    }
  }
};

function toSequelizeType(Sequelize, d) {
  switch (d.type) {
    case 'STRING': return Sequelize.STRING(d.length);
    case 'TEXT': return Sequelize.TEXT;
    case 'INTEGER': return d.unsigned ? Sequelize.INTEGER.UNSIGNED : Sequelize.INTEGER;
    case 'TINYINT': return Sequelize.TINYINT;
    case 'BIGINT': return Sequelize.BIGINT;
    case 'FLOAT': return Sequelize.FLOAT;
    case 'DECIMAL': return Sequelize.DECIMAL(d.precision, d.scale);
    case 'BOOLEAN': return Sequelize.BOOLEAN;
    case 'DATE': return Sequelize.DATE;
    case 'DATEONLY': return Sequelize.DATEONLY;
    case 'JSON': return Sequelize.JSON;
    case 'ENUM': return Sequelize.ENUM(...d.values);
    default: throw new Error('Unknown baseline type ' + d.type);
  }
}

function toColumn(Sequelize, d) {
  const col = { type: toSequelizeType(Sequelize, d), allowNull: d.allowNull };
  if (d.primaryKey) col.primaryKey = true;
  if (d.autoIncrement) col.autoIncrement = true;
  if (d.defaultValue !== undefined) {
    col.defaultValue = d.defaultValue && d.defaultValue.now ? Sequelize.literal('CURRENT_TIMESTAMP') : d.defaultValue;
  }
  if (d.references) {
    col.references = { model: d.references.table, key: d.references.key };
    col.onDelete = d.references.onDelete;
    col.onUpdate = d.references.onUpdate;
  }
  return col;
}

module.exports = {
  SPEC,
  tableOrder: SPEC.order,

  async up(queryInterface, Sequelize, transaction) {
    for (const table of SPEC.order) {
      const { columns, indexes } = SPEC.tables[table];
      const attributes = {};
      for (const [name, d] of Object.entries(columns)) attributes[name] = toColumn(Sequelize, d);
      await queryInterface.createTable(table, attributes, { transaction });
      for (const idx of indexes) {
        await queryInterface.addIndex(table, idx.fields, { name: idx.name, unique: idx.unique, transaction });
      }
    }
  },

  async down(queryInterface, Sequelize, transaction) {
    for (const table of [...SPEC.order].reverse()) {
      await queryInterface.dropTable(table, { transaction });
    }
  },
};
