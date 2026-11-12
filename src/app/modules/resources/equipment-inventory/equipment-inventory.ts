import { Component, inject, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EquipmentInventoryService, Material } from '../../../shared/services/equipment-inventory/equipment-inventory';
import { CommonModule } from '@angular/common';
import { VendorsServices } from '../../vendors/services/vendors-services';
import { Equipment } from '../../../shared/services/master/equipment';
import { ToastrService } from 'ngx-toastr';
import { CategoryServeice } from '../../../shared/services/master/category-serveice';

@Component({
  selector: 'app-equipment-inventory',
  standalone: false,
  templateUrl: './equipment-inventory.html',
  styleUrl: './equipment-inventory.scss',
})
export class EquipmentInventory {

  private materialService = inject(EquipmentInventoryService);
  private MaterialMasterService = inject(Equipment);
  private router = inject(Router);
  private vendorService = inject(VendorsServices);
  private toast = inject(ToastrService);
  private categoryService = inject(CategoryServeice);

  selectedTab = 'All Equipment';
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
  searchQuery: any;
  showAssignProjectModal: boolean = false;
  noOfProjectsAssigned: number = 0;
  noOfProjectsNotAssigned: number = 0;
  categories: any[] = [];

  openDropdown: string | null = null;

  categoryOptions: string[] = [
    'Concrete',
    'Steel',
    'Electrical',
    'Lumber',
    'Finishing',
    'Chemicals'
  ];

  sortOrderOptions: string[] = [
    'Usage Rate (Highest)',
    'Usage Rate (Lowest)',
    'Stock Level (Asc)',
    'Stock Level (Desc)',
    'Newest Additions'
  ];

  selectedSortOrder: string = this.sortOrderOptions[0];

  supplierStatusOptions: string[] = ['Active', 'Preferred', 'New'];
  selectedSupplierStatus: string = 'Active';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown-wrapper')) {
      this.openDropdown = null;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.openDropdown = null;
  }

  toggleDropdown(id: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.openDropdown = this.openDropdown === id ? null : id;
  }

  isDropdownOpen(id: string): boolean {
    return this.openDropdown === id;
  }

  closeDropdown() {
    this.openDropdown = null;
  }

  /** True when opened from Plant & Machinery -> Machinery Transfers. */
  readonly transferMode = inject(ActivatedRoute).snapshot.data['mode'] === 'transfer';

  ngOnInit() {

    this.materialService.loadMaterials();

    this.materialService.materials$.subscribe((m: any[]) => {

      this.materials = m;
      this.noOfProjectsAssigned = m.filter(
        x => x.equipment_project_stock && x.equipment_project_stock.length > 0
      ).length;

      this.noOfProjectsNotAssigned = m.filter(
        x => !x.equipment_project_stock || x.equipment_project_stock.length === 0
      ).length;

      this.page = 1;

      this.updatePagination();

    });

    this.MaterialMasterService.loadMaterials();

    this.loadProjects();

    this.MaterialMasterService.materials$.subscribe(m => {

      this.MaterialMaster = m;

    });

    this.getVendor();
    this.getCategories();

  }


  getCategories() {

    this.categoryService.loadCategories().subscribe({

      next: () => {

        this.categoryService.categories$.subscribe((res) => {

          this.categories = [
            {
              category_name: 'All Equipment',
              isDefault: true
            },
            ...res.filter((c: any) => c.category_type === 'Equipment')
          ];
          this.updatePagination();
        });
      },

      error: (err) => {

        console.error(err);

        this.toast.error('Failed to load skills');
      }
    });
  }

  get filteredMaterials(): any[] {

    let filtered = [...this.materials];

    // Tab Filter
    if (this.selectedTab === 'Low Stock') {

      filtered = filtered.filter(
        m => m.stockIn < 20
      );

    } else if (this.selectedTab !== 'All Equipment') {

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
        material.sku?.toLowerCase().includes(q) ||
        material.category?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  getInventoryValue(): number {
    return this.materials.reduce((sum, item) => {
      return sum + (+item.cost * +item.stockIn);
    }, 0);
  }

  getVendor() {
    this.vendorService.vendors$.subscribe(v => {

      this.vendors = v;

    });
  }

  loadProjects() {
    this.materialService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = res?.data || [];
      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  changeTab(tab: any) {

    this.selectedTab = tab.category_name || tab;

    this.page = 1;

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

  get endItem(): number {
    return Math.min(
      this.page * this.pageSize,
      this.filteredMaterials.length
    );
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

  getDefaultMaterial(): Material {

    return {

      name: '',
      sku: '',
      category: 'Concrete',
      cost: '',
      project_id: 0,
      project_name: '',
      equipment_master_id: 0,
      stockIn: 0,
      vendor_name: '',
      vendor_id: '',
      status: 'ASSIGNED',

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
    this.closeDropdown();

    this.showAddModal = true;

  }


  onVendorSelect(event: any) {

    const value = event.target.value;

    if (value === 'ADD_NEW') {

      this.showAddVendorModal = true;

      return;

    }

    const vendor = this.vendors.find(

      (v: any) => v.id == value

    );

    this.newMaterial.vendor_name = vendor?.name || '';

    this.newMaterial.vendor_id = value || '';

  }

  getProject(projectId: any) {

    const selectedId = Number(projectId.target.value);

    const project = this.projects.find(

      (p: any) => p.id === selectedId

    );

    this.newMaterial.project_name = project?.name || '';

    this.newMaterial.project_id = selectedId || 0;

  }


  selectEquipmentAdd(material: any) {

    this.closeDropdown();

    if (!material?.id) return;

    this.newMaterial.equipment_master_id = material.id;

    this.MaterialMasterService
      .getMaterialMasterById(material.id)
      .subscribe({

        next: (res: any) => {

          const data = res?.data || res;

          this.newMaterial = {

            ...this.newMaterial,

            name: data?.name || '',

            sku: data?.sku || '',

            category: data?.category || '',

            equipment_master_id: data?.id || 0,

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  selectCategoryAdd(cat: string) {

    this.newMaterial.category = cat;

    this.closeDropdown();

  }

  selectProjectAdd(project: any) {

    this.newMaterial.project_name = project?.name || '';

    this.newMaterial.project_id = project?.id || 0;

    this.closeDropdown();

  }

  selectVendorAdd(vendor: any) {

    this.newMaterial.vendor_name = vendor?.name || '';

    this.newMaterial.vendor_id = vendor?.id || '';

    this.closeDropdown();

  }

  selectAddNewVendor() {

    this.showAddVendorModal = true;

    this.newMaterial.vendor_id = '';

    this.closeDropdown();

  }


  addMaterial() {

    this.materialService.addMaterial({

      ...this.newMaterial

    }).subscribe({

      next: (res) => {

        console.log('Material created', res);

        this.showAddModal = false;

        this.toast.success('Equipment added successfully');

        this.materialService.loadMaterials();

        this.newMaterial = this.getDefaultMaterial();

      },

      error: (err) => {

        console.error('Error creating material', err);

        this.toast.error(

          err?.error?.message ||

          'Failed to add material'

        );

      }

    });

  }


  openEditModal(event: Event, material: Material) {

    event.stopPropagation();

    this.materialToEdit = { ...material };
    this.closeDropdown();

    this.showEditModal = true;

  }

  selectProjectEdit(project: any) {

    if (!this.materialToEdit) return;

    this.materialToEdit.project_name = project?.name || '';

    this.materialToEdit.project_id = project?.id || 0;

    this.closeDropdown();

  }

  updateMaterial() {

    if (this.materialToEdit) {

      this.materialToEdit.stockPercent = Math.round(

        (this.materialToEdit.stockCurrent /

          this.materialToEdit.stockTotal) * 100

      );

      this.materialToEdit.status = this.calculateStatus(

        this.materialToEdit.stockPercent

      );

      this.materialService
        .updateMaterial(

          this.materialToEdit.id,

          this.materialToEdit

        )
        .subscribe({

          next: () => {

            this.showEditModal = false;
            this.materialToEdit = null;
            this.toast.success(
              'Material updated successfully'
            );

            this.materialService.loadMaterials();

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
            this.toast.success(
              'Equipment deleted successfully'
            );

            this.materialService.loadMaterials();
          },

          error: (err) => {
            console.error('Delete failed', err);
            this.toast.error(
              err?.error?.message ||
              'Failed to delete equipment'
            );

          }

        });

    }

  }


  calculateStatus(percent: number): 'ASSIGNED' {
    return 'ASSIGNED';
  }

  exportReport() {
    console.log('Exporting materials report...');
    alert('Materials report exported successfully (Simulated)');

  }

  getSelectedMat(event: any) {

    const id = Number(event.target.value);

    if (!id) return;

    this.MaterialMasterService
      .getMaterialMasterById(id)
      .subscribe({

        next: (res: any) => {

          const data = res?.data || res;

          this.newMaterial = {

            ...this.newMaterial,

            name: data?.name || '',

            sku: data?.sku || '',

            category: data?.category || '',

            equipment_master_id: data?.id || 0,

          };

          console.log(

            'Selected Material =>',

            this.newMaterial

          );

        },

        error: (err) => {

          console.log(err);

        }

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
        this.getVendor();

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
    if (value == 'ADD_NEW') {
      this.showAddVendorModal = true;
      this.newMaterial.vendor_id = '';

      return;
    }

    const vendor = this.vendors.find(
      (v: any) => v.id == value
    );

    this.newMaterial.vendor_name = vendor?.name || '';
    this.newMaterial.vendor_id = value || '';

  }

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
    this.closeDropdown();

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

  selectAssignProject(index: number, project: any) {

    if (!this.assignedProjects[index]) return;

    this.assignedProjects[index].project_id = project?.id ?? null;

    this.validateAssignedStock();

    this.closeDropdown();

  }

  getProjectNameById(id: any): string {

    if (!id) return '';

    const project = this.projects.find((p: any) => p.id == id);

    return project?.name || '';

  }

  validateAssignedStock(): boolean {

    this.projectAssignError = '';

    let totalAssignedStock = 0;

    const selectedProjects: any[] = [];

    for (const item of this.assignedProjects) {

      if (!item.project_id || item.stock === null || item.stock === '') {

        this.projectAssignError =
          'Please select project and enter stock for all rows';

        return false;
      }

      if (+item.stock <= 0) {

        this.projectAssignError =
          'Stock quantity must be greater than 0';

        return false;
      }

      if (selectedProjects.includes(item.project_id)) {

        this.projectAssignError =
          'Same project cannot be selected multiple times';

        return false;
      }

      selectedProjects.push(item.project_id);

      totalAssignedStock += Number(item.stock);
    }

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
      equipment_id: this.materialToEdit.id,
      projects: projectsWithName
    };

    console.log(payload);

    this.materialService
      .updateMaterial(this.materialToEdit.id, payload)
      .subscribe({
        next: () => {

          this.showEditModal = false;
          this.materialToEdit = null;
          this.toast.success('Equipment updated successfully');
          this.materialService.loadMaterials();
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
    if (!projectId || !this.selectedMaterial?.equipment_project_stock) {
      console.log('Stock for project', projectId, '=>');

      return 0;
    }
    const stock = this.selectedMaterial.equipment_project_stock.find(
      (x: any) => x.project_id == projectId
    );
    console.log
      ('Stock for project', projectId, '=>', stock);
    return stock?.stockUsed || 0;
  }

  openStockTransferModal(material: any) {
    this.selectedMaterial = material;
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
    this.closeDropdown();

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

  selectTransferFromProject(index: number, project: any) {

    if (!this.stockTransferData.transfers[index]) return;

    this.stockTransferData.transfers[index].from_project_id = project?.id ?? '';

    this.closeDropdown();

  }

  selectTransferToProject(index: number, project: any) {

    if (!this.stockTransferData.transfers[index]) return;

    this.stockTransferData.transfers[index].to_project_id = project?.id ?? '';

    this.closeDropdown();

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

    // Each source project can only give up what it holds; the server re-checks under a lock.
    const takenBySource = new Map<string, number>();
    for (const t of this.stockTransferData.transfers) {
      const key = String(t.from_project_id);
      takenBySource.set(key, (takenBySource.get(key) || 0) + Number(t.quantity));
    }
    for (const [projectId, qty] of takenBySource) {
      if (qty > Number(this.getProjectStock(projectId))) {
        this.toast.error('Transfer quantity exceeds the stock held by the source project');
        return;
      }
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
      .equipment_stock_transfer(
        this.stockTransferData.material_id,
        payload
      )
      .subscribe({
        next: () => {
          this.toast.success(
            'Equipment reassigned successfully'
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

  selectSortOrder(order: string) {

    this.selectedSortOrder = order;

    this.closeDropdown();

  }

  toggleSupplierStatus(status: string) {

    this.selectedSupplierStatus = status;

  }
}