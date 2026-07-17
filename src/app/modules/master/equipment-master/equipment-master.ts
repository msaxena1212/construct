import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipment, Material } from '../../../shared/services/master/equipment';
import { VendorsServices } from '../../vendors/services/vendors-services';
import { ToastrService } from 'ngx-toastr';
import { CategoryServeice } from '../../../shared/services/master/category-serveice';

@Component({
  selector: 'app-equipment-master',
  standalone: false,
  templateUrl: './equipment-master.html',
  styleUrl: './equipment-master.scss',
})
export class EquipmentMaster {
  private router = inject(Router);
  private vendorService = inject(VendorsServices);
  private toast = inject(ToastrService);
  private materialService = inject(Equipment);
  private categoryService = inject(CategoryServeice);

  team = [
    { name: 'All Members' },
    { name: 'Marcus Thorne' },
    { name: 'Sarah Chen' }
  ];
  selectedMember = 'All Members';
  selectedTab = 'All Materials';
  // tabs = ['All Materials', 'Low Stock', 'Concrete', 'Steel', 'Electrical', 'Lumber'];

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showFilters = false;

  materialToEdit: any;
  materialToDelete: any;

  newMaterial: Material = this.getDefaultMaterial();

  materials: Material[] = [];
  vendors: any[] = [];
  page = 1;
  pageSize = 5;
  paginatedMaterials: any[] = [];
  Math: any;
  searchQuery: any;
  categories: any;
  categoryDropdownOpen = false;
  editCategoryDropdownOpen = false;

  ngOnInit() {
    this.materialService.loadMaterials();

    this.materialService.materials$.subscribe(m => {
      this.materials = m;
      this.page = 1;
      this.updatePagination();
    });

    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
    });
    this.getCategories();
  }

  getCategories() {

    this.categoryService.loadCategories().subscribe({

      next: () => {

        this.categoryService.categories$.subscribe((res) => {

          this.categories = res.filter((c: any) => c.category_type === 'Equipment');

          this.updatePagination();
        });
      },

      error: (err) => {

        console.error(err);

        this.toast.error('Failed to load skills');
      }
    });
  }

  selectCategory(name: string) {
    this.newMaterial.category = name;
    this.categoryDropdownOpen = false;
  }

  selectEditCategory(name: string) {
    this.materialToEdit.category = name;
    this.editCategoryDropdownOpen = false;
  }

  updatePagination() {

    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedMaterials =
      this.filteredMaterials.slice(start, end);
  }

  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }

  goToPage(p: number) {
    this.page = p;
    this.updatePagination();
  }

  totalPages() {
    return Math.ceil(this.materials.length / this.pageSize);
  }

  get endItem(): number {
    return Math.min(
      this.page * this.pageSize,
      this.filteredMaterials.length
    );
  }

  onSearchChange() {

    this.page = 1;

    this.updatePagination();
  }

  get filteredMaterials(): any[] {

    let filtered = [...this.materials];

    if (this.selectedTab !== 'All Materials') {

      filtered = filtered.filter(
        m =>
          (m.category || '')
            .trim()
            .toLowerCase() ===
          this.selectedTab.trim().toLowerCase()
      );
    }

    if (this.searchQuery) {

      const q = this.searchQuery.toLowerCase();

      filtered = filtered.filter((material: any) =>
        material.name?.toLowerCase().includes(q) ||
        material.sku?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  getDefaultMaterial(): Material {
    return {
      name: '',
      sku: '',
      category: 'Concrete',
      cost: 0,
      status: 'ACTIVE',
      stockAvailable: 0
    };
  }

  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.showAddModal = true;
  }

  getvendor(vendorId: any) {
    console.log(vendorId.target.value, 'sdzfdsfds');
  }

  addMaterial() {
    // this.newMaterial.stockPercent = Math.round(
    //   (this.newMaterial.stockCurrent / this.newMaterial.stockTotal) * 100
    // );

    // this.newMaterial.status = this.calculateStatus(
    //   this.newMaterial.stockPercent
    // );

    this.materialService.addMaterial({ ...this.newMaterial }).subscribe({
      next: (res) => {
        console.log('Material created', res);
        this.showAddModal = false;
        this.toast.success('Material added successfully');
        this.materialService.loadMaterials();
        this.getDefaultMaterial();
      },
      error: (err) => {
        console.error('Error creating material', err);
        this.toast.error(err?.error?.message || 'Failed to add material');
      }
    });
  }

  openEditModal(event: Event, material: Material) {
    console.log(material);

    event.stopPropagation();
    this.materialToEdit = { ...material };
    this.showEditModal = true;
  }

  updateMaterial() {
    if (this.materialToEdit) {

      this.materialService
        .updateMaterial(this.materialToEdit.id, this.materialToEdit)
        .subscribe({
          next: () => {
            this.showEditModal = false;
            this.materialToEdit = null;
            this.toast.success('Material updated successfully');
            this.materialService.loadMaterials();

          },
          error: (err) => {
            console.error('Update failed', err);
            this.toast.error(err?.error?.message || 'Failed to update material');
          }
        });
    }
  }

  openDeleteModal(event: Event, material: Material) {
    event.stopPropagation();
    this.materialToDelete = material;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.materialToDelete) {

      this.materialService
        .deleteMaterial(this.materialToDelete.id)
        .subscribe({
          next: () => {
            this.showDeleteModal = false;
            this.materialToDelete = null;
            this.toast.success('Material deleted successfully');
            this.materialService.loadMaterials();

          },
          error: (err) => {
            console.error('Delete failed', err);
            this.toast.error(err?.error?.message || 'Failed to delete material');
          }
        });
    }
  }
  calculateStatus(percent: number): 'Optimal' | 'Adequate' | 'Critical' {
    if (percent < 20) return 'Critical';
    if (percent < 60) return 'Adequate';
    return 'Optimal';
  }

  exportReport() {
    console.log('Exporting materials report...');
    alert('Materials report exported successfully (Simulated)');
  }

  deliveries = [
    { time: '09:00', period: 'AM', item: 'Lumber Pine Planks (400 Units)', location: 'Site A - Skyline Towers', status: 'In Transit', statusColor: 'bg-blue-50 text-blue-600', assignee: 'Marcus Thorne' },
    { time: '14:30', period: 'PM', item: 'HVAC Ducting Components', location: 'Site C - Riverside Mall', status: 'Confirmed', statusColor: 'bg-surface-container text-outline', assignee: 'Sarah Chen' }
  ];

  get filteredDeliveries() {
    if (this.selectedMember === 'All Members') return this.deliveries;
    return this.deliveries.filter(d => d.assignee === this.selectedMember);
  }
}

