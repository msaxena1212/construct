import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SidebarMenu } from '../interfaces/sidebar-menu.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private baseUrl = environment.serverUrl + '/api/v1';

  constructor(private http: HttpClient) { }

  public getSidebarHierarchy(): Observable<SidebarMenu[]> {
    return this.http.get<{ data: any[] }>(this.baseUrl + '/sidebar').pipe(
      map(res => {
        const rawData = res.data && res.data.length > 0 ? res.data : this.getCanonicalFallback();
        return this.buildHierarchy(rawData);
      })
    );
  }

  private getCanonicalFallback(): any[] {
    return [
      { id: 1, name: 'Admin', title: 'Admin', icon: 'admin_panel_settings', order: 1, parentId: null, status: true },
      { id: 101, name: 'Dashboard', title: 'Dashboard', path: 'dashboard', icon: 'dashboard', order: 1, parentId: 1, status: true },
      { id: 102, name: 'Users & Team', title: 'Users & Team', path: 'team-management/team-list', icon: 'group', order: 2, parentId: 1, status: true },
      { id: 103, name: 'Roles & Permissions', title: 'Roles & Permissions', path: 'team-management/role-master', icon: 'security', order: 3, parentId: 1, status: true },
      { id: 104, name: 'Company Profile', title: 'Company Profile', path: 'company-management', icon: 'apartment', order: 4, parentId: 1, status: true },
      { id: 105, name: 'Menu Management', title: 'Menu Management', path: 'menu-management', icon: 'menu_open', order: 5, parentId: 1, status: true },

      { id: 2, name: 'Purchase', title: 'Purchase', icon: 'shopping_cart', order: 2, parentId: null, status: true },
      { id: 201, name: 'Vendor Directory', title: 'Vendor Directory', path: 'resources/vendors', icon: 'storefront', order: 1, parentId: 2, status: true },
      { id: 202, name: 'Quotations', title: 'Quotations', path: 'resources/quotations', icon: 'request_quote', order: 2, parentId: 2, status: true },
      { id: 203, name: 'New Quotation RFQ', title: 'New Quotation RFQ', path: 'resources/quotations/new', icon: 'post_add', order: 3, parentId: 2, status: true },
      { id: 204, name: 'Procurement Contracts', title: 'Procurement Contracts', path: 'resources/contracts', icon: 'history_edu', order: 4, parentId: 2, status: true },
      { id: 205, name: 'Vendor Audit History', title: 'Vendor Audit History', path: 'history/history/vendor', icon: 'manage_history', order: 5, parentId: 2, status: true },

      { id: 3, name: 'Store', title: 'Store', icon: 'warehouse', order: 3, parentId: null, status: true },
      { id: 301, name: 'Material Inventory', title: 'Material Inventory', path: 'resources/materials', icon: 'inventory_2', order: 1, parentId: 3, status: true },
      { id: 302, name: 'Material Master Catalog', title: 'Material Master Catalog', path: 'masters/material', icon: 'category', order: 2, parentId: 3, status: true },
      { id: 303, name: 'Stock Approvals', title: 'Stock Approvals', path: 'stock-approval', icon: 'fact_check', order: 3, parentId: 3, status: true },
      { id: 304, name: 'Stock Movement History', title: 'Stock Movement History', path: 'history/history/resources/materials', icon: 'history', order: 4, parentId: 3, status: true },
      { id: 305, name: 'Stock Transfers', title: 'Stock Transfers', path: 'stock-transfer', icon: 'swap_horiz', order: 5, parentId: 3, status: true },

      { id: 4, name: 'Plant & Machinery', title: 'Plant & Machinery', icon: 'precision_manufacturing', order: 4, parentId: null, status: true },
      { id: 401, name: 'Equipment Fleet', title: 'Equipment Fleet', path: 'resources/equipment-inventory', icon: 'construction', order: 1, parentId: 4, status: true },
      { id: 402, name: 'Equipment Master', title: 'Equipment Master', path: 'masters/equipment', icon: 'build_circle', order: 2, parentId: 4, status: true },
      { id: 404, name: 'Machinery Transfers', title: 'Machinery Transfers', path: 'resources/equipment-transfer', icon: 'swap_horiz', order: 4, parentId: 4, status: true },
      { id: 403, name: 'Equipment History', title: 'Equipment History', path: 'history/history/resources/equipment-inventory', icon: 'history_toggle_off', order: 3, parentId: 4, status: true },

      { id: 5, name: 'Project Management', title: 'Project Management', icon: 'business_center', order: 5, parentId: null, status: true },
      { id: 501, name: 'Projects Portfolio', title: 'Projects Portfolio', path: 'projects', icon: 'domain', order: 1, parentId: 5, status: true },
      { id: 502, name: 'Work Breakdown Tasks', title: 'Work Breakdown Tasks', path: 'tasks', icon: 'task_alt', order: 2, parentId: 5, status: true },
      { id: 503, name: 'Gantt Timeline', title: 'Gantt Timeline', path: 'timeline', icon: 'timeline', order: 3, parentId: 5, status: true },
      { id: 504, name: 'Project Calendar', title: 'Project Calendar', path: 'calendar', icon: 'calendar_month', order: 4, parentId: 5, status: true },
      { id: 505, name: 'Project Audit History', title: 'Project Audit History', path: 'history/history/project', icon: 'history', order: 5, parentId: 5, status: true },

      { id: 6, name: 'H.R & Payroll', title: 'H.R & Payroll', icon: 'badge', order: 6, parentId: null, status: true },
      { id: 601, name: 'Workforce Directory', title: 'Workforce Directory', path: 'team-management/team-list', icon: 'groups', order: 1, parentId: 6, status: true },
      { id: 602, name: 'Skill Matrix', title: 'Skill Matrix', path: 'masters/skill', icon: 'psychology', order: 2, parentId: 6, status: true },
      { id: 603, name: 'Site Labour Attendance', title: 'Site Labour Attendance', path: 'resources/site-labour-attendance', icon: 'co_present', order: 3, parentId: 6, status: true },

      { id: 7, name: 'MIS Admin', title: 'MIS Admin', icon: 'analytics', order: 7, parentId: null, status: true },
      { id: 701, name: 'Executive Dashboard', title: 'Executive Dashboard', path: 'dashboard', icon: 'query_stats', order: 1, parentId: 7, status: true },
      { id: 702, name: 'Categories Master', title: 'Categories Master', path: 'masters/category', icon: 'hub', order: 2, parentId: 7, status: true },
      { id: 703, name: 'Global Audit Trail', title: 'Global Audit Trail', path: 'history/history/project', icon: 'receipt_long', order: 3, parentId: 7, status: true },

      { id: 8, name: 'Production', title: 'Production', icon: 'engineering', order: 8, parentId: null, status: true },
      { id: 801, name: 'Daily Progress Reports (DPR)', title: 'Daily Progress Reports (DPR)', path: 'projects?context=dpr', icon: 'assignment', order: 1, parentId: 8, status: true },
      { id: 802, name: 'Site Snags & Defects', title: 'Site Snags & Defects', path: 'projects?context=snags', icon: 'rule', order: 2, parentId: 8, status: true },

      { id: 9, name: 'Finance & Accounts', title: 'Finance & Accounts', icon: 'account_balance', order: 9, parentId: null, status: true },
      { id: 901, name: 'Budget Reconciliation', title: 'Budget Reconciliation', path: 'projects?context=budget', icon: 'balance', order: 1, parentId: 9, status: true },
      { id: 902, name: 'Invoices & Liabilities', title: 'Invoices & Liabilities', path: 'resources/invoices-liabilities', icon: 'receipt', order: 2, parentId: 9, status: true },

      { id: 10, name: 'Tender & Correspondence', title: 'Tender & Correspondence', icon: 'history_edu', order: 10, parentId: null, status: true },
      { id: 1001, name: 'BOQ & Estimates', title: 'BOQ & Estimates', path: 'projects?context=boq', icon: 'calculate', order: 1, parentId: 10, status: true },
      { id: 1002, name: 'Drawings & Blueprints', title: 'Drawings & Blueprints', path: 'projects?context=drawings', icon: 'architecture', order: 2, parentId: 10, status: true },
      { id: 1003, name: 'Tender Quotations', title: 'Tender Quotations', path: 'resources/quotations?context=tender', icon: 'description', order: 3, parentId: 10, status: true }
    ];
  }

  private buildHierarchy(data: any[]): SidebarMenu[] {
    const map = new Map<number, SidebarMenu>();
    const roots: SidebarMenu[] = [];

    // 1. Initialize all nodes strictly mapping to the UI Interface
    data.forEach(item => {
      const cleanPath = item.path ? item.path.replace(/^\/+|\/+$/g, '') : '';
      map.set(item.id, {
        id: item.id,
        name: item.title || item.name,
        path: cleanPath,
        icon: item.icon || 'arrow_right',
        parentId: item.parentId,
        order: item.order !== undefined && item.order !== null ? Number(item.order) : 0,
        subMenu: []
      });
    });

    // 2. Structurally link parent arrays strictly
    data.forEach(item => {
      if (item.parentId && map.has(item.parentId)) {
        const child = map.get(item.id)!;
        child.subMenuName = item.title || item.name;
        map.get(item.parentId)!.subMenu!.push(child);
      } else {
        roots.push(map.get(item.id)!);
      }
    });

    // Permission-only module rows (no children) duplicate entries that already live under Store / Plant & Machinery.
    const hiddenRootPaths = new Set(['material', 'equipment', 'stock-transfer', 'inventory']);
    for (let i = roots.length - 1; i >= 0; i--) {
      const r = roots[i];
      if (!r.subMenu?.length && hiddenRootPaths.has(r.path)) roots.splice(i, 1);
    }

    // 3. Resolve navigation route paths
    // In Angular's /master shell, root children have self-contained module routes
    // (e.g. 'team-management/team-list', 'resources/vendors', 'projects', 'tasks')
    // We sort parents and children by order. If child has an absolute-style or full relative path,
    // we preserve it so /master/<path> navigates accurately.
    const sortAndResolve = (nodes: SidebarMenu[], parentPath: string = '') => {
      nodes.sort((a, b) => a.order - b.order);

      nodes.forEach(node => {
        if (!node.path && parentPath) {
          node.path = parentPath;
        }

        if (node.subMenu && node.subMenu.length > 0) {
          sortAndResolve(node.subMenu, node.path);
        }
      });
    };

    sortAndResolve(roots, '');
    return roots;
  }
}
