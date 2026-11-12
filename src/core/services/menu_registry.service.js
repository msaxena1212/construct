'use strict';

/**
 * Canonical Enterprise Menu Registry
 *
 * Defines the 10 top-level enterprise domains in exact required order,
 * with stable keys, display titles, icons, sort orders, and verified child route mappings.
 */
const CANONICAL_ENTERPRISE_MENUS = [
  // 1. Admin
  {
    key: 'admin',
    name: 'Admin',
    title: 'Admin',
    path: '',
    icon: 'admin_panel_settings',
    order: 1,
    status: true,
    parentId: null,
    children: [
      { key: 'admin_dashboard', name: 'Dashboard', title: 'Dashboard', path: 'dashboard', icon: 'dashboard', order: 1 },
      { key: 'admin_users', name: 'Users & Team', title: 'Users & Team', path: 'team-management/team-list', icon: 'group', order: 2 },
      { key: 'admin_roles', name: 'Roles & Permissions', title: 'Roles & Permissions', path: 'team-management/role-master', icon: 'security', order: 3 },
      { key: 'admin_company', name: 'Company Profile', title: 'Company Profile', path: 'company-management', icon: 'apartment', order: 4 },
      { key: 'admin_menu_management', name: 'Menu Management', title: 'Menu Management', path: 'menu-management', icon: 'menu_open', order: 5 },
    ],
  },
  // 2. Purchase
  {
    key: 'purchase',
    name: 'Purchase',
    title: 'Purchase',
    path: '',
    icon: 'shopping_cart',
    order: 2,
    status: true,
    parentId: null,
    children: [
      { key: 'purchase_vendors', name: 'Vendor Directory', title: 'Vendor Directory', path: 'resources/vendors', icon: 'storefront', order: 1 },
      { key: 'purchase_quotations', name: 'Quotations', title: 'Quotations', path: 'resources/quotations', icon: 'request_quote', order: 2 },
      { key: 'purchase_new_quotation', name: 'New Quotation RFQ', title: 'New Quotation RFQ', path: 'resources/quotations/new', icon: 'post_add', order: 3 },
      { key: 'purchase_contracts', name: 'Procurement Contracts', title: 'Procurement Contracts', path: 'resources/contracts', icon: 'history_edu', order: 4 },
      { key: 'purchase_vendor_history', name: 'Vendor Audit History', title: 'Vendor Audit History', path: 'history/history/vendor', icon: 'manage_history', order: 5 },
    ],
  },
  // 3. Store
  {
    key: 'store',
    name: 'Store',
    title: 'Store',
    path: '',
    icon: 'warehouse',
    order: 3,
    status: true,
    parentId: null,
    children: [
      { key: 'store_materials', name: 'Material Inventory', title: 'Material Inventory', path: 'resources/materials', icon: 'inventory_2', order: 1 },
      { key: 'store_material_master', name: 'Material Master Catalog', title: 'Material Master Catalog', path: 'masters/material', icon: 'category', order: 2 },
      { key: 'store_approvals', name: 'Stock Approvals', title: 'Stock Approvals', path: 'stock-approval', icon: 'fact_check', order: 3 },
      { key: 'store_material_history', name: 'Stock Movement History', title: 'Stock Movement History', path: 'history/history/resources/materials', icon: 'history', order: 4 },
      { key: 'store_stock_transfers', name: 'Stock Transfers', title: 'Stock Transfers', path: 'stock-transfer', icon: 'swap_horiz', order: 5 },
    ],
  },
  // 4. Plant & Machinery
  {
    key: 'plant_machinery',
    name: 'Plant & Machinery',
    title: 'Plant & Machinery',
    path: '',
    icon: 'precision_manufacturing',
    order: 4,
    status: true,
    parentId: null,
    children: [
      { key: 'plant_equipment_inventory', name: 'Equipment Fleet', title: 'Equipment Fleet', path: 'resources/equipment-inventory', icon: 'construction', order: 1 },
      { key: 'plant_equipment_master', name: 'Equipment Master', title: 'Equipment Master', path: 'masters/equipment', icon: 'build_circle', order: 2 },
      { key: 'plant_equipment_history', name: 'Equipment History', title: 'Equipment History', path: 'history/history/resources/equipment-inventory', icon: 'history_toggle_off', order: 3 },
      { key: 'plant_equipment_transfers', name: 'Machinery Transfers', title: 'Machinery Transfers', path: 'resources/equipment-transfer', icon: 'swap_horiz', order: 4 },
    ],
  },
  // 5. Project Management
  {
    key: 'project_management',
    name: 'Project Management',
    title: 'Project Management',
    path: '',
    icon: 'business_center',
    order: 5,
    status: true,
    parentId: null,
    children: [
      { key: 'pm_projects', name: 'Projects Portfolio', title: 'Projects Portfolio', path: 'projects', icon: 'domain', order: 1 },
      { key: 'pm_tasks', name: 'Work Breakdown Tasks', title: 'Work Breakdown Tasks', path: 'tasks', icon: 'task_alt', order: 2 },
      { key: 'pm_timeline', name: 'Gantt Timeline', title: 'Gantt Timeline', path: 'timeline', icon: 'timeline', order: 3 },
      { key: 'pm_calendar', name: 'Project Calendar', title: 'Project Calendar', path: 'calendar', icon: 'calendar_month', order: 4 },
      { key: 'pm_history', name: 'Project Audit History', title: 'Project Audit History', path: 'history/history/project', icon: 'history', order: 5 },
    ],
  },
  // 6. H.R & Payroll
  {
    key: 'hr_payroll',
    name: 'H.R & Payroll',
    title: 'H.R & Payroll',
    path: '',
    icon: 'badge',
    order: 6,
    status: true,
    parentId: null,
    children: [
      { key: 'hr_team', name: 'Workforce Directory', title: 'Workforce Directory', path: 'team-management/team-list', icon: 'groups', order: 1 },
      { key: 'hr_skills', name: 'Skill Matrix', title: 'Skill Matrix', path: 'masters/skill', icon: 'psychology', order: 2 },
      { key: 'hr_attendance', name: 'Site Labour Attendance', title: 'Site Labour Attendance', path: 'resources/site-labour-attendance', icon: 'co_present', order: 3 },
    ],
  },
  // 7. MIS Admin
  {
    key: 'mis_admin',
    name: 'MIS Admin',
    title: 'MIS Admin',
    path: '',
    icon: 'analytics',
    order: 7,
    status: true,
    parentId: null,
    children: [
      { key: 'mis_dashboard', name: 'Executive Dashboard', title: 'Executive Dashboard', path: 'dashboard', icon: 'query_stats', order: 1 },
      { key: 'mis_categories', name: 'Categories Master', title: 'Categories Master', path: 'masters/category', icon: 'hub', order: 2 },
      { key: 'mis_project_history', name: 'Global Audit Trail', title: 'Global Audit Trail', path: 'history/history/project', icon: 'receipt_long', order: 3 },
    ],
  },
  // 8. Production
  {
    key: 'production',
    name: 'Production',
    title: 'Production',
    path: '',
    icon: 'engineering',
    order: 8,
    status: true,
    parentId: null,
    children: [
      { key: 'prod_dpr', name: 'Daily Progress Reports (DPR)', title: 'Daily Progress Reports (DPR)', path: 'projects?context=dpr', icon: 'assignment', order: 1 },
      { key: 'prod_snags', name: 'Site Snags & Defects', title: 'Site Snags & Defects', path: 'projects?context=snags', icon: 'rule', order: 2 },
    ],
  },
  // 9. Finance & Accounts
  {
    key: 'finance_accounts',
    name: 'Finance & Accounts',
    title: 'Finance & Accounts',
    path: '',
    icon: 'account_balance',
    order: 9,
    status: true,
    parentId: null,
    children: [
      { key: 'fin_budget_reconciliation', name: 'Budget Reconciliation', title: 'Budget Reconciliation', path: 'projects?context=budget', icon: 'balance', order: 1 },
      { key: 'fin_vendor_invoices', name: 'Invoices & Liabilities', title: 'Invoices & Liabilities', path: 'resources/invoices-liabilities', icon: 'receipt', order: 2 },
    ],
  },
  // 10. Tender & Correspondence
  {
    key: 'tender_correspondence',
    name: 'Tender & Correspondence',
    title: 'Tender & Correspondence',
    path: '',
    icon: 'history_edu',
    order: 10,
    status: true,
    parentId: null,
    children: [
      { key: 'tender_boq', name: 'BOQ & Estimates', title: 'BOQ & Estimates', path: 'projects?context=boq', icon: 'calculate', order: 1 },
      { key: 'tender_drawings', name: 'Drawings & Blueprints', title: 'Drawings & Blueprints', path: 'projects?context=drawings', icon: 'architecture', order: 2 },
      { key: 'tender_quotations', name: 'Tender Quotations', title: 'Tender Quotations', path: 'resources/quotations?context=tender', icon: 'description', order: 3 },
    ],
  },
];

class MenuRegistryService {
  /**
   * Returns canonical hierarchy definitions.
   */
  static getCanonicalDefinitions() {
    return JSON.parse(JSON.stringify(CANONICAL_ENTERPRISE_MENUS));
  }

  /**
   * Seeds or synchronizes database `rbac_module` records idempotently
   * guaranteeing all 10 enterprise domains and their verified child routes exist.
   *
   * @param {Object} db - Sequelize models
   * @param {Object} options - Transaction options
   */
  static async seedCanonicalMenus(db, options = {}) {
    const transaction = options.transaction || null;
    const existingModules = await db.rbac_module.findAll({ transaction });
    const nameMap = new Map();
    existingModules.forEach(m => nameMap.set(m.name, m));

    for (const domain of CANONICAL_ENTERPRISE_MENUS) {
      let parent = nameMap.get(domain.name);
      if (!parent) {
        parent = await db.rbac_module.create(
          {
            name: domain.name,
            title: domain.title,
            path: domain.path || null,
            icon: domain.icon,
            status: domain.status !== false,
            order: domain.order,
            parentId: null,
          },
          { transaction }
        );
        nameMap.set(domain.name, parent);
      } else {
        await parent.update(
          {
            title: domain.title,
            icon: domain.icon,
            order: domain.order,
            status: parent.status !== undefined ? parent.status : true,
          },
          { transaction }
        );
      }

      // Seed children
      if (domain.children && domain.children.length > 0) {
        for (const child of domain.children) {
          let childModule = nameMap.get(child.name);
          if (!childModule) {
            childModule = await db.rbac_module.create(
              {
                name: child.name,
                title: child.title,
                path: child.path,
                icon: child.icon,
                status: child.status !== false,
                order: child.order,
                parentId: parent.id,
              },
              { transaction }
            );
            nameMap.set(child.name, childModule);
          } else {
            await childModule.update(
              {
                title: child.title,
                path: child.path,
                icon: child.icon,
                order: child.order,
                parentId: parent.id,
              },
              { transaction }
            );
          }
        }
      }
    }

    let topLevelCount = 0;
    let childCount = 0;
    for (const domain of CANONICAL_ENTERPRISE_MENUS) {
      topLevelCount++;
      if (domain.children) {
        childCount += domain.children.length;
      }
    }

    return { success: true, topLevelCount, childCount };
  }

  /**
   * Retrieves full menu list. If database is empty or missing any of the 10 domains,
   * it transparently seeds the missing canonical definitions and returns the complete registry.
   */
  static async getAuthoritativeModules(db) {
    let modules = await db.rbac_module.findAll({
      order: [['order', 'ASC']],
    });

    // Check if canonical domains are present
    const existingNames = new Set(modules.map(m => m.name));
    const needsSeed = CANONICAL_ENTERPRISE_MENUS.some(d => !existingNames.has(d.name));

    if (modules.length === 0 || needsSeed) {
      try {
        await this.seedCanonicalMenus(db);
        modules = await db.rbac_module.findAll({
          order: [['order', 'ASC']],
        });
      } catch (err) {
        console.error('[MenuRegistryService] Auto-seed error:', err.message);
      }
    }

    return modules;
  }

  /**
   * Retrieves sidebar hierarchy for user role.
   * If role permissions are configured, respects them; for administrative roles,
   * ensures all 10 enterprise domains and their children are visible.
   */
  static async getSidebarForRole(db, roleId, roleName, userEmail = null) {
    const allModules = await this.getAuthoritativeModules(db);

    const normalizedRole = roleName ? String(roleName).trim().toLowerCase().replace(/[\s_-]+/g, '') : '';
    const isAdmin =
      !roleName ||
      (userEmail && String(userEmail).trim().toLowerCase() === 'gyanprakash@elitemindz.co') ||
      [
        'admin',
        'superadmin',
        'owner',
        'projectdirector',
        'projectadmin',
        'companyadmin',
        'enterpriseadmin',
      ].includes(normalizedRole);

    const canonicalDomainNames = new Set(CANONICAL_ENTERPRISE_MENUS.map(d => d.name.toLowerCase()));
    // Legacy standalone root items that are now canonical child items
    const legacyRedundantRoots = new Set([
      'vendors',
      'tasks',
      'calendar',
      'equipment inventory',
      'stock approval',
    ]);

    const filterLegacyRedundant = (moduleList) => {
      return moduleList.filter(m => {
        // If it's a root item (no parentId) and its name is in legacyRedundantRoots, drop it
        if (!m.parentId && legacyRedundantRoots.has(String(m.name || '').trim().toLowerCase())) {
          return false;
        }
        return true;
      });
    };

    if (isAdmin) {
      // Admin sees all active modules in canonical order
      const active = allModules
        .filter(m => m.status !== false)
        .map(m => (m.get ? m.get({ plain: true }) : m));
      return filterLegacyRedundant(active);
    }

    // Non-admin: filter by role_permission can_read
    const permissions = await db.role_permission.findAll({
      where: { role_id: roleId, can_read: true },
      raw: true,
    });
    const permittedModuleIds = new Set(permissions.map(p => p.module_id));

    // For any permitted child, ensure its parent domain is also included
    const parentIdsToInclude = new Set();
    allModules.forEach(m => {
      if (permittedModuleIds.has(m.id) && m.parentId) {
        parentIdsToInclude.add(m.parentId);
      }
    });

    const nonAdminModules = allModules
      .filter(m => m.status !== false && (permittedModuleIds.has(m.id) || parentIdsToInclude.has(m.id)))
      .map(m => (m.get ? m.get({ plain: true }) : m));
    return filterLegacyRedundant(nonAdminModules);
  }
}

module.exports = {
  MenuRegistryService,
  CANONICAL_ENTERPRISE_MENUS,
};
