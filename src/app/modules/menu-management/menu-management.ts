import { Component, HostListener, OnInit } from '@angular/core';
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

  showModal: boolean = false;

  parentDropdownOpen: boolean = false;

  menuForm!: FormGroup;
  menus: any[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'title',
    'path',
    'icon',
    'parent',
    'order',
    'status',
    'actions'
  ];

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private toast: ToastrService
  ) { }

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
        this.menus = this.buildHierarchy(res.data || []);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Failed to load available menus');
      }
    });
  }

  toggleStatus(menu: any) {
    const updatedStatus = !menu.status;
    this.menuService.updateMenu(menu.id, {
      ...menu,
      status: updatedStatus
    }).subscribe({
      next: () => {
        menu.status = updatedStatus;
        this.toast.success(`Module "${menu.name}" marked ${updatedStatus ? 'Active' : 'Inactive'}`);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'Failed to update module status');
      }
    });
  }

  syncCanonical() {
    Swal.fire({
      title: 'Reset to Canonical 10 Domains?',
      text: 'This will ensure all 10 enterprise domains and default working routes are restored.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3a66b0',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Restore Default Hierarchy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.resetToCanonical().subscribe({
          next: (res) => {
            this.toast.success(res.message || 'Canonical menus restored successfully!');
            this.loadMenus();
          },
          error: (err) => {
            this.toast.error(err?.error?.message || 'Failed to restore canonical menus');
          }
        });
      }
    });
  }

  buildHierarchy(rawMenus: any[]): any[] {

    const map = new Map<number, any>();
    const roots: any[] = [];

    rawMenus.forEach(menu => {
      map.set(menu.id, {
        ...menu,
        children: []
      });
    });

    rawMenus.forEach(menu => {

      if (menu.parentId && map.has(menu.parentId)) {

        map.get(menu.parentId).children.push(
          map.get(menu.id)
        );

      } else {

        roots.push(map.get(menu.id));

      }

    });

    const flattenedList: any[] = [];

    const flatten = (
      items: any[],
      depth: number = 0
    ) => {

      items.sort((a, b) => a.order - b.order);

      items.forEach(item => {

        item.depth = depth;

        flattenedList.push(item);

        if (item.children?.length > 0) {
          flatten(item.children, depth + 1);
        }

      });

    };

    flatten(roots, 0);

    return flattenedList;
  }

  getParentName(parentId: any): string {

    if (!parentId) return 'None';

    const parent = this.menus.find(
      m => m.id === parentId
    );

    return parent ? parent.name : 'Unknown';
  }

  toggleParentDropdown(): void {
    this.parentDropdownOpen = !this.parentDropdownOpen;
  }

  closeParentDropdown(): void {
    this.parentDropdownOpen = false;
  }

  selectParent(id: number | null): void {
    this.menuForm.get('parentId')?.setValue(id);
    this.parentDropdownOpen = false;
  }

  getSelectedParentLabel(): string {

    const selectedId = this.menuForm.get('parentId')?.value;

    if (!selectedId) {
      return '-- Top Level --';
    }

    const selected = this.menus.find(m => m.id === selectedId);

    if (!selected) {
      return '-- Top Level --';
    }

    const prefix = selected.depth > 0 ? '↳ '.repeat(selected.depth) : '';

    return `${prefix}${selected.name}`;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    if (!this.parentDropdownOpen) {
      return;
    }

    const target = event.target as HTMLElement;

    if (!target.closest('.parent-dropdown-wrapper')) {
      this.parentDropdownOpen = false;
    }
  }

  openCreateModal() {

    this.isEditing = false;
    this.editingId = null;
    this.parentDropdownOpen = false;

    this.menuForm.reset({
      icon: 'domain',
      order: 0,
      status: true,
      parentId: null
    });

    this.showModal = true;
  }

  editMenu(menu: any) {
    this.isEditing = true;
    this.editingId = menu.id;
    this.parentDropdownOpen = false;

    this.menuForm.patchValue({
      name: menu.name,
      title: menu.title,
      path: menu.path,
      icon: menu.icon,
      order: menu.order,
      parentId: menu.parentId,
      status: menu.status
    });

    this.showModal = true;
  }

  closeModal() {

    this.showModal = false;
    this.parentDropdownOpen = false;

    this.isEditing = false;
    this.editingId = null;

    this.menuForm.reset({
      icon: 'domain',
      order: 0,
      status: true,
      parentId: null
    });
  }


  deleteMenu(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the module.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes Delete'
    }).then((result) => {

      if (result.isConfirmed) {

        this.menuService.deleteMenu(id).subscribe({

          next: () => {

            this.toast.success(
              'Module deleted successfully'
            );

            this.loadMenus();
          },

          error: (err) => {

            this.toast.error(
              err.error?.message ||
              'Failed to delete module'
            );

          }

        });

      }

    });

  }

  onSubmit() {

    if (this.menuForm.invalid) {

      this.toast.error(
        'Please fill all required fields'
      );

      return;
    }

    if (this.isEditing && this.editingId) {

      this.menuService.updateMenu(
        this.editingId,
        this.menuForm.value
      ).subscribe({

        next: (res) => {

          this.toast.success(
            res.message || 'Menu updated successfully!'
          );

          this.closeModal();

          this.loadMenus();
        },

        error: (err) => {

          this.toast.error(
            err.error?.message ||
            'Failed to update menu'
          );

        }

      });

    }

    else {

      this.menuService.createMenu(
        this.menuForm.value
      ).subscribe({

        next: (res) => {

          this.toast.success(
            res.message || 'Menu created successfully!'
          );

          this.closeModal();

          this.loadMenus();
        },

        error: (err) => {

          this.toast.error(
            err.error?.message ||
            'Failed to create menu'
          );

        }

      });

    }

  }

}