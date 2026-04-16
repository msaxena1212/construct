import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from './services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.html',
  styleUrls: ['./role-management.scss']
})
export class RoleManagement implements OnInit {
  roleForm!: FormGroup;
  roles: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'actions'];
  isEditMode: boolean = false;
  editingRoleId: number | null = null;

  // Permissions state
  managingPermissionsRoleId: number | null = null;
  managingPermissionsRoleName: string = '';
  rolePermissions: any[] = [];
  permissionsColumns: string[] = ['moduleName', 'create', 'read', 'update', 'delete'];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  initForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      type: ['CUSTOM', Validators.required]
    });
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

  onEdit(role: any) {
    if (role.type === 'STATIC') {
      this.toast.warning('Static roles cannot be edited', 'Edit Restricted');
      return;
    }
    this.isEditMode = true;
    this.editingRoleId = role.id;
    this.roleForm.patchValue({
      name: role.name,
      type: role.type
    });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingRoleId = null;
    this.roleForm.reset({ type: 'CUSTOM' });
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

  onSubmit() {
    if (this.roleForm.invalid) {
      this.toast.error('Please fill required fields');
      return;
    }

    if (this.isEditMode && this.editingRoleId) {
      this.roleService.updateRole(this.editingRoleId, this.roleForm.value).subscribe({
        next: (res) => {
          this.toast.success(res.message);
          this.cancelEdit();
          this.loadRoles();
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'Failed to update role');
        }
      });
    } else {
      this.roleService.createRole(this.roleForm.value).subscribe({
        next: (res) => {
          this.toast.success(res.message);
          this.roleForm.reset({ type: 'CUSTOM' });
          this.loadRoles();
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'Failed to create role');
        }
      });
    }
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
