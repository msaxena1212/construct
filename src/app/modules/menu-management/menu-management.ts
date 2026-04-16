import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from './services/menu.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-management',
  standalone: false,
  templateUrl: './menu-management.html',
  styleUrls: ['./menu-management.scss']
})
export class MenuManagement implements OnInit {
  isEditing: boolean = false;
  editingId: number | null = null;
  menuForm!: FormGroup;
  menus: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'title', 'path', 'icon', 'parent', 'order', 'status', 'actions'];

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMenus();
  }

  initForm() {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      title: [''],
      path: [''],
      icon: ['domain'],
      order: [0],
      parentId: [null],
      status: [true]
    });
  }

  loadMenus() {
    this.menuService.getMenus().subscribe({
      next: (res) => {
        this.menus = this.buildHierarchy(res.data);
      },
      error: (err) => {
        this.toast.error('Failed to load available menus');
      }
    });
  }

  buildHierarchy(rawMenus: any[]): any[] {
    const map = new Map<number, any>();
    const roots: any[] = [];
    
    // Create map references with an empty children array
    rawMenus.forEach(menu => {
      map.set(menu.id, { ...menu, children: [] });
    });

    // Assign children to their respective parents
    rawMenus.forEach(menu => {
      if (menu.parentId && map.has(menu.parentId)) {
        map.get(menu.parentId).children.push(map.get(menu.id));
      } else {
        roots.push(map.get(menu.id));
      }
    });

    // Recursively flatten tree back into array, injecting 'depth' for UI indentation
    const flattenedList: any[] = [];
    const flatten = (items: any[], depth: number = 0) => {
      // Respect user's sort order inside each branch
      items.sort((a, b) => a.order - b.order);
      
      items.forEach(item => {
        item.depth = depth;
        flattenedList.push(item);
        if (item.children && item.children.length > 0) {
          flatten(item.children, depth + 1);
        }
      });
    };

    flatten(roots, 0);
    return flattenedList;
  }

  getParentName(parentId: any): string {
    if (!parentId) return 'None';
    const parent = this.menus.find(m => m.id === parentId);
    return parent ? parent.name : 'Unknown';
  }

  editMenu(menu: any) {
    this.isEditing = true;
    this.editingId = menu.id;
    this.menuForm.patchValue({
      name: menu.name,
      title: menu.title,
      path: menu.path,
      icon: menu.icon,
      order: menu.order,
      parentId: menu.parentId,
      status: menu.status
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingId = null;
    this.menuForm.reset({ icon: 'domain', order: 0, status: true, parentId: null });
  }

  deleteMenu(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will attempt to permanently remove the menu! Any sub-menus attached to it will block the deletion.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0b3b49',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.deleteMenu(id).subscribe({
          next: () => {
             this.toast.success('Module deleted successfully');
             this.loadMenus();
          },
          error: (err) => {
             this.toast.error(err.error?.message || 'Failed to delete module');
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.menuForm.invalid) {
      this.toast.error('Please fill all required fields', 'Validation Error');
      return;
    }

    if (this.isEditing && this.editingId) {
      this.menuService.updateMenu(this.editingId, this.menuForm.value).subscribe({
        next: (res) => {
          this.toast.success(res.message || 'Menu updated successfully!');
          this.cancelEdit();
          this.loadMenus();
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'Failed to update menu');
        }
      });
    } else {
      this.menuService.createMenu(this.menuForm.value).subscribe({
        next: (res) => {
          this.toast.success(res.message || 'Menu created successfully!');
          this.menuForm.reset({ icon: 'domain', order: 0, status: true, parentId: null });
          this.loadMenus();
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'Failed to create menu');
        }
      });
    }
  }
}
