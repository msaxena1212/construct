import { Component, inject } from '@angular/core';
import { RouterLink, Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialService, Material } from '../../../shared/services/materials/materials';
// import { VendorService, Vendor } from '../../services/vendor.service';
import { CommonModule } from '@angular/common';
// import { RbacService } from '../../../shared/services/rbac/rbac.service';


@Component({
  selector: 'app-materials',
  standalone: false,
  templateUrl: './materials.html',
  styleUrl: './materials.scss',
})
export class Materials { private materialService = inject(MaterialService);
  // private vendorService = inject(VendorService);
  private router = inject(Router);
  // public rbac = inject(RbacService);
  
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

  materialToEdit: Material | null = null;
  materialToDelete: Material | null = null;

  newMaterial: Material = this.getDefaultMaterial();

  materials: Material[] = [];
vendors: any[] = [
  {
    id: 1,
    vendor_name: 'ABC Traders',
    contact_person: 'Ravi Sharma',
    mobile_no: '9876543210',
    email: 'abc@gmail.com',
    city: 'Delhi',
    status: 'Active'
  },
  {
    id: 2,
    vendor_name: 'XYZ Enterprises',
    contact_person: 'Amit Verma',
    mobile_no: '9123456780',
    email: 'xyz@gmail.com',
    city: 'Mumbai',
    status: 'Inactive'
  },
  {
    id: 3,
    vendor_name: 'Global Supplies',
    contact_person: 'Neha Singh',
    mobile_no: '9988776655',
    email: 'global@gmail.com',
    city: 'Bangalore',
    status: 'Active'
  },
  {
    id: 4,
    vendor_name: 'Tech Solutions',
    contact_person: 'Karan Mehta',
    mobile_no: '9090909090',
    email: 'tech@gmail.com',
    city: 'Pune',
    status: 'Pending'
  },
  {
    id: 5,
    vendor_name: 'Shree Industries',
    contact_person: 'Pooja Gupta',
    mobile_no: '8888888888',
    email: 'shree@gmail.com',
    city: 'Jaipur',
    status: 'Active'
  }
];
  ngOnInit() {
    this.materialService.materials$.subscribe(m => this.materials = m);
    // this.vendorService.vendors$.subscribe(v => this.vendors = v);
  }

  onSupplierChange() {
    if (this.newMaterial.supplier === 'ADD_NEW') {
      this.showAddModal = false;
      this.router.navigate(['/vendors']);
    }
  }

  get filteredMaterials() {
    let filtered = this.materials;
    
    if (this.selectedTab === 'Low Stock') {
      filtered = filtered.filter(m => m.status === 'Critical' || m.stock.percent < 20);
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
      icon: 'inventory_2',
      bg: 'bg-slate-100',
      text: 'text-slate-400',
      stock: { current: 0, total: 100, percent: 0 },
      cost: '₹0.00',
      supplier: '',
      status: 'Optimal'
    };
  }

  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.showAddModal = true;
  }

  addMaterial() {
    this.newMaterial.stock.percent = Math.round((this.newMaterial.stock.current / this.newMaterial.stock.total) * 100);
    this.newMaterial.status = this.calculateStatus(this.newMaterial.stock.percent);
    this.materialService.addMaterial({ ...this.newMaterial });
    this.showAddModal = false;
  }

  openEditModal(event: Event, material: Material) {
    event.stopPropagation();
    this.materialToEdit = { ...material };
    this.showEditModal = true;
  }

  updateMaterial() {
    if (this.materialToEdit) {
      this.materialToEdit.stock.percent = Math.round((this.materialToEdit.stock.current / this.materialToEdit.stock.total) * 100);
      this.materialToEdit.status = this.calculateStatus(this.materialToEdit.stock.percent);
      this.materialService.updateMaterial(this.materialToEdit.sku, this.materialToEdit);
      this.showEditModal = false;
    }
  }

  openDeleteModal(event: Event, material: Material) {
    event.stopPropagation();
    this.materialToDelete = material;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.materialToDelete) {
      this.materialService.deleteMaterial(this.materialToDelete.sku);
      this.showDeleteModal = false;
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
