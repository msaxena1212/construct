import { Component, OnInit } from '@angular/core';
import { RoleService } from './services/role.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RoleFormDialog } from './role-form-dialog/role-form-dialog';

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.html',
  styleUrls: ['./role-management.scss']
})
export class RoleManagement implements OnInit {
  roles: any[] = [];

  // Permissions state
  managingPermissionsRoleId: number | null = null;
  managingPermissionsRoleName: string = '';
  rolePermissions: any[] = [];

  constructor(
    private roleService: RoleService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  openRoleDialog(role: any = null) {
    const dialogRef = this.dialog.open(RoleFormDialog, {
      width: '500px',
      data: { role },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  onEdit(role: any) {
    if (role.type === 'STATIC') {
      this.toast.warning('Static roles cannot be edited', 'Edit Restricted');
      return;
    }
    this.openRoleDialog(role);
  }

  onDelete(id: number, type: string) {
    if (type === 'STATIC') {
      this.toast.error('Static roles cannot be deleted', 'Action Blocked');
      return;
    }
    if (confirm('Are you sure you want to delete this role from your company?')) {
      this.roleService.deleteRole(id).subscribe({
        next: (res) => {
          this.toast.success(res.message);
          this.loadRoles();
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'Failed to delete role');
        }
      });
    }
  }

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
      error: (err) => {
        this.toast.error('Failed to load company roles');
      }
    });
  }

  // --- PERMISSIONS MANAGEMENT ---

  openPermissions(role: any) {
    this.managingPermissionsRoleId = role.id;
    this.managingPermissionsRoleName = role.name;
    this.roleService.getRolePermissions(role.id).subscribe({
      next: (res) => {
        this.rolePermissions = this.buildHierarchy(res.data);
      },
      error: (err) => {
        this.toast.error('Failed to load permissions');
        this.closePermissions();
      }
    });
  }

  closePermissions() {
    this.managingPermissionsRoleId = null;
    this.managingPermissionsRoleName = '';
    this.rolePermissions = [];
  }

  savePermissions() {
    if (!this.managingPermissionsRoleId) return;
    const payloads = this.rolePermissions.map(m => ({
      module_id: m.id,
      ...m.permissions
    }));
    
    this.roleService.updateRolePermissions(this.managingPermissionsRoleId, payloads).subscribe({
      next: (res) => {
        this.toast.success('Permissions saved successfully!');
        this.closePermissions();
      },
      error: (err) => {
        this.toast.error('Failed to update permissions');
      }
    });
  }

  togglePermission(element: any, perm: string, checked: boolean) {
    element.permissions[perm] = checked;
    // Auto-enable 'read' capability if they grant mutate privileges 
    if (perm !== 'read' && checked) {
      element.permissions['read'] = true;
    }
  }

  buildHierarchy(rawMenus: any[]): any[] {
    const map = new Map<number, any>();
    const roots: any[] = [];
    rawMenus.forEach(menu => map.set(menu.id, { ...menu, children: [] }));
    rawMenus.forEach(menu => {
      if (menu.parentId && map.has(menu.parentId)) {
        map.get(menu.parentId).children.push(map.get(menu.id));
      } else {
        roots.push(map.get(menu.id));
      }
    });
    const flattenedList: any[] = [];
    const flatten = (items: any[], depth: number = 0) => {
      items.sort((a, b) => a.order - b.order);
      items.forEach(item => {
        item.depth = depth;
        flattenedList.push(item);
        if (item.children && item.children.length > 0) flatten(item.children, depth + 1);
      });
    };
    flatten(roots, 0);
    return flattenedList;
  }
}
