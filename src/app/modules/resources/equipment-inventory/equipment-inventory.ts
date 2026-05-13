import { Component, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialService, Material } from '../../../shared/services/materials/materials';
// import { VendorService, Vendor } from '../../services/vendor.service';
import { CommonModule } from '@angular/common';
import { VendorsServices } from '../../vendors/services/vendors-services';
import { MaterialMasterService } from '../../../shared/services/master/material-master';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipment-inventory',
  standalone: false,
  templateUrl: './equipment-inventory.html',
  styleUrl: './equipment-inventory.scss',
})
export class EquipmentInventory { private materialService = inject(MaterialService);
  private MaterialMasterService = inject(MaterialMasterService);
  // private vendorService = inject(VendorService);
  private router = inject(Router);
  private vendorService = inject(VendorsServices);
  private toast = inject(ToastrService);

  team = [
    { name: 'All Members' },
    { name: 'Marcus Thorne' },
    { name: 'Sarah Chen' }
  ];
  selectedMember = 'All Members';
  selectedTab = 'All Materials';
  tabs = ['All Materials', 'Low Stock', 'Concrete', 'Steel', 'Electrical', 'Lumber'];

  // Modal States
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
  MaterialMaster: any;
  projects: any[] = [];

  ngOnInit() {
    this.materialService.loadMaterials();

    this.materialService.materials$.subscribe(m => {
      this.materials = m;
       this.page = 1; // 🔥 reset page (important)
       this.updatePagination(); // ✅ yahi sahi jagah hai
    });
//  this.materialService.materials$.subscribe(m => this.materials = m);
    this.MaterialMasterService.loadMaterials();
    this.loadProjects();

    this.MaterialMasterService.materials$.subscribe(m => {
      this.MaterialMaster = m;
    });

    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
    });
  }

  loadProjects() {
    this.materialService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = res?.data || [];
        console.log('Projects =>', this.projects);
      },
      error: (err) => {
        console.log(err);
      }
    });
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


  onSupplierChange() {
    if (this.newMaterial.vendor_name === 'ADD_NEW') {
      this.showAddModal = false;
      this.router.navigate(['/vendors']);
    }
  }

  get filteredMaterials() {
    let filtered = this.materials;
    
    if (this.selectedTab === 'Low Stock') {
      filtered = filtered.filter(m => m.status === 'ACTIVE' || m.stockIn < 20);
    } else if (this.selectedTab !== 'All Materials') {
      filtered = filtered.filter(m => m.category.toLowerCase() === this.selectedTab.toLowerCase());
    }

    if (this.selectedMember !== 'All Members') {
      // In a real app, materials would have an owner or assignee. 
      // For this demo, we'll just simulate by filtering none or all.
    }

    return filtered;
  }
  getDefaultMaterial(): Material {
    return {
      name: '',
      sku: '',
      category: 'Concrete',
      cost: '',
      project_id: 0,
      project_name: '',
      material_master_id: 0,
      stockIn: 0,
      vendor_name: '',
      vendor_id: '',
      status: 'ACTIVE',

    };
  }
  formatCost() {

    const value = Number(this.newMaterial.cost || 0);

    this.newMaterial.cost = value.toFixed(2);

  }
  formatCostEdit() {

    const value = Number(this.materialToEdit.cost || 0);

    this.materialToEdit.cost = value.toFixed(2);

  }

  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.showAddModal = true;
  }

  getvendor(vendorId: any) {
    console.log(vendorId.target.value,this.vendors, 'sdzfdsfds');
    const vendor = this.vendors.find((v:any) => v.id == vendorId.target.value);
    this.newMaterial.vendor_name = vendor?.name || '';
    console.log(vendor, 'vendor');
    this.newMaterial.vendor_id = vendorId.target.value || '';
  }



  getProject(projectId: any) {

    const selectedId = Number(projectId.target.value);

    const project = this.projects.find((p: any) => p.id === selectedId);

    console.log(project, 'project');

    this.newMaterial.project_name = project?.name || '';
    this.newMaterial.project_id = selectedId || 0;
  }

  addMaterial() {
    this.materialService.addMaterial({ ...this.newMaterial }).subscribe({
      next: (res) => {
        console.log('Material created', res);
        this.showAddModal = false;
        this.toast.success('Material added successfully');
        this.materialService.loadMaterials();

        // optional: form reset
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

      this.materialToEdit.stockPercent = Math.round(
        (this.materialToEdit.stockCurrent / this.materialToEdit.stockTotal) * 100
      );

      this.materialToEdit.status = this.calculateStatus(
        this.materialToEdit.stockPercent
      );

      this.materialService
        .updateMaterial(this.materialToEdit.id, this.materialToEdit) // ✅ id use karo
        .subscribe({
          next: () => {
            this.showEditModal = false;
            this.materialToEdit = null; // ✅ cleanup
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
        .deleteMaterial(this.materialToDelete.id) // ✅ id use karo
        .subscribe({
          next: () => {
            this.showDeleteModal = false;
            this.materialToDelete = null; // ✅ cleanup
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
  calculateStatus(percent: number): 'ACTIVE' {
    return 'ACTIVE';
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

  getSelectedMat(event: any) {

    const id = Number(event.target.value);

    if (!id) return;

    this.MaterialMasterService.getMaterialMasterById(id).subscribe({
      next: (res: any) => {

        const data = res?.data || res;

        this.newMaterial = {
          ...this.newMaterial,

          name: data?.name || '', // 👈 name bhi jayega
          sku: data?.sku || '',
          category: data?.category || '',
          material_master_id: data?.id || 0,
        };

        console.log('Selected Material =>', this.newMaterial);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

