import { Component, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialService, Material } from '../../../shared/services/materials/materials';
// import { VendorService, Vendor } from '../../services/vendor.service';
import { CommonModule } from '@angular/common';
import { VendorsServices } from '../../vendors/services/vendors-services';
import { MaterialMasterService } from '../../../shared/services/master/material-master';
import { Toast, ToastrService } from 'ngx-toastr';
// import { RbacService } from '../../../shared/services/rbac/rbac.service';


@Component({
  selector: 'app-materials',
  standalone: false,
  templateUrl: './materials.html',
  styleUrl: './materials.scss',
})
export class Materials {
  private materialService = inject(MaterialService);
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

  newVendor: any = {
    name: '',
    email: '',
    phone: '',
    budget: '',
    services: '',
    spoc: {
      name: '',
      phone: ''
    },
    kyc: {
      gst: '',
      pan: ''
    },
    address: {
      street: '',
      pincode: ''
    }
  };

  errorMsg = '';
  contractFile: any = null;
  isSaving = false;
  showAddVendorModal = false;
  Number: any;
  searchQuery: any;
  noOfProjectsAssigned: number = 0;
  noOfProjectsNotAssigned: number=0;

  ngOnInit() {
    this.materialService.loadMaterials();

    this.materialService.materials$.subscribe((m:any) => {
      this.materials = m;

      this.noOfProjectsAssigned = m.filter(
        (x:any) => x.material_project_stock && x.material_project_stock.length > 0
      ).length;

      this.noOfProjectsNotAssigned = m.filter(
        (x:any) => !x.material_project_stock || x.material_project_stock.length === 0
      ).length;


      this.page = 1; // 🔥 reset page (important)
      this.updatePagination(); // ✅ yahi sahi jagah hai
    });
    //  this.materialService.materials$.subscribe(m => this.materials = m);
    this.MaterialMasterService.loadMaterials();
    this.loadProjects();

    this.MaterialMasterService.materials$.subscribe(m => {
      this.MaterialMaster = m;
    });

    this.getVendors();
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

  get endItem(): number {
    return Math.min(
      this.page * this.pageSize,
      this.filteredMaterials.length
    );
  }

  get filteredMaterials(): any[] {

    let filtered = [...this.materials];

    // 🔥 Tab Filter
    if (this.selectedTab === 'Low Stock') {

      filtered = filtered.filter(
        m => m.stockIn < 20
      );

    } else if (this.selectedTab !== 'All Materials') {

      filtered = filtered.filter(
        m =>
          (m.category || '')
            .trim()
            .toLowerCase() ===
          this.selectedTab.trim().toLowerCase()
      );
    }

    // 🔥 Search Filter
    if (this.searchQuery) {

      const q = this.searchQuery.toLowerCase();

      filtered = filtered.filter((material: any) =>
        material.name?.toLowerCase().includes(q) ||
        material.sku?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
    this.page = 1; // optional reset page
    this.updatePagination();
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
    return Math.ceil(this.filteredMaterials.length / this.pageSize);
  }

  onSearchChange() {

    this.page = 1;

    this.updatePagination();
  }


  onSupplierChange() {
    if (this.newMaterial.vendor_name === 'ADD_NEW') {
      this.showAddModal = false;
      this.router.navigate(['/vendors']);
    }
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
      status: 'ASSIGNED',

    };
  }

  getInventoryValue(): number {
    return this.materials.reduce((sum, item) => {
      return sum + (+item.cost * +item.stockIn);
    }, 0);
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

  // getvendor(vendorId: any) {
  //   console.log(vendorId.target.value, this.vendors, 'sdzfdsfds');
  //   const vendor = this.vendors.find((v: any) => v.id == vendorId.target.value);
  //   this.newMaterial.vendor_name = vendor?.name || '';
  //   console.log(vendor, 'vendor');
  //   this.newMaterial.vendor_id = vendorId.target.value || '';
  // }



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

      this.materialToEdit.status = 'ASSIGNED';

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
  calculateStatus(percent: number): 'ASSIGNED' | 'NOT ASSIGNED' {

    if (percent > 0) {
      return 'ASSIGNED';
    }

    return 'NOT ASSIGNED';
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

  getVendors() {
    this.vendorService.vendors$.subscribe(v => {

      this.vendors = v;

    });
  }

  addVendor(): void {
    if (this.isSaving) return;
    this.errorMsg = '';

    const fd = new FormData();
    fd.append('vendorLegalName', this.newVendor.name);
    fd.append('spocName', this.newVendor.spoc.name);
    fd.append('spocPhone', this.newVendor.spoc.phone);
    fd.append('officialEmail', this.newVendor.email);
    fd.append('officialPhone', this.newVendor.phone);
    fd.append('gstNo', this.newVendor.kyc.gst);
    fd.append('panCardNo', this.newVendor.kyc.pan);
    fd.append('physicalAddress', this.newVendor.address.street);
    fd.append('pincode', this.newVendor.address.pincode);
    fd.append('budgetAllocation', this.newVendor.budget);
    fd.append('services', this.newVendor.services);
    if (this.contractFile) {
      fd.append('contractFile', this.contractFile);
    }

    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddVendorModal = false;
        this.getVendors();

      },
      error: (err) => {
        this.isSaving = false;
        this.errorMsg = err?.error?.message ?? 'Vendor onboard failed. Please try again.';
      },
    });
  }

  onContractFileSelected(event: any) {

    this.contractFile = event.target.files[0];

  }

  onlyNumbers(event: KeyboardEvent) {

    const charCode = event.which
      ? event.which
      : event.keyCode;

    if (charCode < 48 || charCode > 57) {

      event.preventDefault();

    }

  }

  onlyAlphanumeric(event: KeyboardEvent) {

    const regex = /^[a-zA-Z0-9]$/;

    const key = event.key;

    if (!regex.test(key)) {

      event.preventDefault();

    }

  }

  stripNonNumericOnPaste(
    event: ClipboardEvent,
    field: string,
    len: number
  ) {

    event.preventDefault();

    const pastedData =
      event.clipboardData
        ?.getData('text')
        .replace(/\D/g, '')
        .slice(0, len) || '';

    if (field === 'phone') {
      this.newVendor.phone = pastedData;
    }

    if (field === 'spocPhone') {
      this.newVendor.spoc.phone = pastedData;
    }

    if (field === 'pincode') {
      this.newVendor.address.pincode = pastedData;
    }

  }

  stripNonAlphanumericOnPaste(
    event: ClipboardEvent,
    field: string,
    len: number
  ) {

    event.preventDefault();

    const pastedData =
      event.clipboardData
        ?.getData('text')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, len)
        .toUpperCase() || '';

    if (field === 'gst') {
      this.newVendor.kyc.gst = pastedData;
    }

    if (field === 'pan') {
      this.newVendor.kyc.pan = pastedData;
    }

  }

  getvendor(event: any) {

    const value = event.target.value;

    // ✅ Add new vendor modal open
    if (value == 'ADD_NEW') {

      this.showAddVendorModal = true;
      console.log('Add new vendor selected', this.showAddVendorModal, value);



      // optional reset
      this.newMaterial.vendor_id = '';

      return;
    }

    // ✅ Existing vendor select
    const vendor = this.vendors.find(
      (v: any) => v.id == value
    );

    this.newMaterial.vendor_name = vendor?.name || '';
    this.newMaterial.vendor_id = value || '';

    console.log(vendor, 'selected vendor');
  }

  showAssignProjectModal = false;

  selectedProjects: number[] = [];

  toggleProjectSelection(projectId: number) {

    if (this.selectedProjects.includes(projectId)) {

      this.selectedProjects =
        this.selectedProjects.filter(id => id !== projectId);

    } else {

      this.selectedProjects.push(projectId);

    }
  }

  // assignProjects() {

  //   const payload = {
  //     material_id: this.materialToEdit.id,
  //     project_ids: this.selectedProjects
  //   };

  //   console.log(payload);

  //   // API CALL HERE

  //   this.showAssignProjectModal = false;
  // }

  // openAssignProjectModal(material: any) {

  //   this.materialToEdit = material;

  //   this.selectedProjects = [];

  //   // agar pehle se assigned projects hain
  //   if (material.project_ids?.length) {

  //     this.selectedProjects = [...material.project_ids];

  //   }

  //   this.showAssignProjectModal = true;
  // }

  assignedProjects: any[] = [
    {
      project_id: null,
      stock: null
    }
  ];

  projectAssignError: string = '';

  openAssignProjectModal(material: any) {

    this.materialToEdit = material;

    this.assignedProjects = [
      {
        project_id: null,
        stock: null
      }
    ];

    this.projectAssignError = '';

    this.showAssignProjectModal = true;
  }

  addProjectRow() {

    this.assignedProjects.push({
      project_id: null,
      stock: null
    });

  }

  removeProjectRow(index: number) {

    if (this.assignedProjects.length === 1) {
      return;
    }

    this.assignedProjects.splice(index, 1);

    this.validateAssignedStock();
  }

  validateAssignedStock(): boolean {

    this.projectAssignError = '';

    let totalAssignedStock = 0;

    const selectedProjects: any[] = [];

    for (const item of this.assignedProjects) {

      // Empty validation
      if (!item.project_id || item.stock === null || item.stock === '') {

        this.projectAssignError =
          'Please select project and enter stock for all rows';

        return false;
      }

      // Negative validation
      if (+item.stock <= 0) {

        this.projectAssignError =
          'Stock quantity must be greater than 0';

        return false;
      }

      // Duplicate project validation
      if (selectedProjects.includes(item.project_id)) {

        this.projectAssignError =
          'Same project cannot be selected multiple times';

        return false;
      }

      selectedProjects.push(item.project_id);

      totalAssignedStock += Number(item.stock);
    }

    // Total stock validation
    if (totalAssignedStock > this.materialToEdit.stockIn) {

      this.projectAssignError =
        `Assigned stock (${totalAssignedStock}) cannot exceed available stock (${this.materialToEdit.stockIn})`;

      return false;
    }

    return true;
  }

  getTotalAssignedStock(): number {

    return this.assignedProjects.reduce(
      (sum, item) => sum + (Number(item.stock) || 0),
      0
    );
  }

  getRemainingStock(): number {

    return (
      Number(this.materialToEdit?.stockRemaining || 0) -
      this.getTotalAssignedStock()
    );
  }

  assignProjects() {

    const isValid = this.validateAssignedStock();

    if (!isValid) {
      return;
    }

    // project name add karo
    const projectsWithName = this.assignedProjects.map(item => {

      const project = this.projects.find(
        (p: any) => p.id == item.project_id
      );

      return {
        ...item,
        project_name: project?.name || '',
        status: 'ASSIGNED'
      };

    });

    const payload = {
      material_id: this.materialToEdit.id,
      projects: projectsWithName
    };

    console.log(payload);

    this.materialService
      .updateMaterial(this.materialToEdit.id, payload)
      .subscribe({
        next: () => {

          this.showEditModal = false;
          this.materialToEdit = null;

          this.toast.success('Material updated successfully');

          this.materialService.loadMaterials();

          this.materialService.materials$.subscribe(m => {
            this.materials = m;
            this.page = 1; // 🔥 reset page (important)
            this.updatePagination(); // ✅ yahi sahi jagah hai
          });

          this.showAssignProjectModal = false;

        },

        error: (err) => {

          console.error('Update failed', err);

          this.toast.error(
            err?.error?.message || 'Failed to update material'
          );

        }
      });
  }

  selectedProjectStock: any = null;
  showProjectStockPopup = false;

  openProjectStockPopup(item: any) {

    this.selectedProjectStock = item;

    this.showProjectStockPopup = true;

  }

  showStockTransferModal = false;

  stockTransferData: any = {
    material_id: '',
    stockIn: 0,
    transfer_note: '',
    transfers: []
  };

  selectedMaterial: any = null;

  getProjectStock(projectId: any): number {
    if (!projectId || !this.selectedMaterial?.material_project_stock) {
      return 0;
    }

    const stock = this.selectedMaterial.material_project_stock.find(
      (x: any) => x.project_id
        == projectId
    );

    return stock?.stockUsed || 0;
  }

  openStockTransferModal(material: any) {

    this.selectedMaterial = material;
    console.log(material, 'material for stock transfer');


    this.stockTransferData = {

      material_id: material.id,

      stockIn: material.stockIn,

      transfer_note: '',

      transfers: [
        {
          from_project_id: material.project_id || '',
          to_project_id: '',
          quantity: 0
        }
      ]
    };

    this.showStockTransferModal = true;
  }

  addTransferRow() {

    this.stockTransferData.transfers.push({
      from_project_id: '',
      to_project_id: '',
      quantity: 0
    });

  }



  removeTransferRow(index: number) {

    this.stockTransferData.transfers.splice(index, 1);

  }



  getTotalTransferQty(): number {

    return this.stockTransferData.transfers.reduce(
      (sum: number, item: any) =>
        sum + Number(item.quantity || 0),
      0
    );

  }



  transferStock() {

    if (!this.stockTransferData.transfers.length) {
      this.toast.error('Add at least one transfer');
      return;
    }

    for (const item of this.stockTransferData.transfers) {

      if (!item.from_project_id) {
        this.toast.error('Select From Project');
        return;
      }

      if (!item.to_project_id) {
        this.toast.error('Select To Project');
        return;
      }

      if (
        item.from_project_id ===
        item.to_project_id
      ) {
        this.toast.error('From & To project cannot be same');
        return;
      }

      if (!item.quantity || item.quantity <= 0) {
        this.toast.error('Enter valid quantity');
        return;
      }

    }

    const totalQty = this.getTotalTransferQty();

    if (totalQty > this.stockTransferData.stockIn) {
      this.toast.error('Total transfer quantity exceeds available stock');
      return;
    }

    const payload = {
      note: this.stockTransferData.transfer_note,

      transfers: this.stockTransferData.transfers.map((t: any) => ({
        from_project_id: t.from_project_id,
        to_project_id: t.to_project_id,
        quantity: t.quantity
      }))
    };

    this.materialService
      .material_stock_transfer(

        this.stockTransferData.material_id,

        payload

      )
      .subscribe({

        next: () => {

          this.toast.success(

            'Material transferred successfully'

          );

          this.materialService.loadMaterials();
          this.showStockTransferModal = false;

        },

        error: (err) => {

          console.error('Update failed', err);

          this.toast.error(

            err?.error?.message ||

            'Failed to update material'

          );

        }

      });
  }
}


