import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialMasterService, Material } from '../../../shared/services/master/material-master';
import { VendorsServices, Vendor } from '../../vendors/services/vendors-services';
import { QuotationService, Quote, QuoteItem } from '../../../shared/services/quotation.service';
import { ToastrService } from 'ngx-toastr';

// ADD THIS
import { Equipment } from '../../../shared/services/master/equipment';

@Component({
  selector: 'app-new-quotations',
  standalone: false,
  templateUrl: './new-quotations.html',
  styleUrl: './new-quotations.scss',
})
export class NewQuotations implements OnInit {
  private materialService = inject(MaterialMasterService);
  private equipmentService = inject(Equipment);

  private vendorService = inject(VendorsServices);
  private quotationService = inject(QuotationService);
  private toast = inject(ToastrService);

  private router = inject(Router);

  currentStep = 1;

  materials: Material[] = [];
  equipments: any[] = [];

  vendors: Vendor[] = [];

  today = new Date();

  searchQuery = '';

  selectedMaterials = new Set<string>();
  quoteItems: QuoteItem[] = [];

  selectedVendor: any;

  selectedType: 'MATERIAL' | 'EQUIPMENT' = 'MATERIAL';

  filteredMaterialsTab: any[] = [];

  typeDropdownOpen = false;
  typeOptions: { label: string; value: 'MATERIAL' | 'EQUIPMENT' }[] = [
    { label: 'Material', value: 'MATERIAL' },
    { label: 'Equipment', value: 'EQUIPMENT' }
  ];

  openVendorDropdownIndex: number | null = null;

  toggleTypeDropdown() {
    this.typeDropdownOpen = !this.typeDropdownOpen;
    this.openVendorDropdownIndex = null;
  }

  selectType(value: 'MATERIAL' | 'EQUIPMENT') {
    this.selectedType = value;
    this.typeDropdownOpen = false;
    this.onTypeChange();
  }

  toggleVendorDropdown(index: number) {
    this.openVendorDropdownIndex = this.openVendorDropdownIndex === index ? null : index;
    this.typeDropdownOpen = false;
  }

  selectVendor(item: any, vendor: Vendor) {
    item.vendorId = vendor.id;
    item.vendor_name = vendor.name;
    this.selectedVendor = vendor;
    this.openVendorDropdownIndex = null;
  }

  closeAllDropdowns() {
    this.typeDropdownOpen = false;
    this.openVendorDropdownIndex = null;
  }

  onTypeChange() {

    this.searchQuery = '';

    this.loadResourcesByType();

  }

  filterResources() {

    const query = this.searchQuery.toLowerCase().trim();
    if (this.selectedType === 'MATERIAL') {

      this.filteredMaterialsTab = this.materials.filter((mat: any) =>
        mat.name?.toLowerCase().includes(query) ||
        mat.category?.toLowerCase().includes(query) ||
        mat.sku?.toLowerCase().includes(query)
      );

    } else {
      this.filteredMaterialsTab = this.equipments.filter((eq: any) =>
        eq.name?.toLowerCase().includes(query) ||
        eq.category?.toLowerCase().includes(query) ||
        eq.sku?.toLowerCase().includes(query)
      );

    }

  }

  checkQuantity(item: any, event: any) {
    let value = Number(event.target.value);

    if (value > 1000) {
      value = 1000;
    }

    if (value < 0) {
      value = 0;
    }

    item.quantity = value || 0;
    event.target.value = value || 0;
  }


  ngOnInit() {
    this.loadResourcesByType();
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
    });

  }

  loadResourcesByType() {

    if (this.selectedType === 'MATERIAL') {

      this.materialService.loadMaterials();

      this.materialService.materials$.subscribe((res: any) => {

        this.materials = res || [];
        this.filteredMaterialsTab = [...this.materials];

      });

    } else {

      this.equipmentService.loadMaterials();

      this.equipmentService.materials$.subscribe((res: any) => {

        this.equipments = res || [];
        this.filteredMaterialsTab = [...this.equipments];

      });
    }
  }

  get filteredMaterials() {
    return this.filteredMaterialsTab;
  }

  toggleMaterial(sku: string) {
    console.log(sku, 'sku fdfgdfgffhfg');
    if (this.selectedMaterials.has(sku)) {

      this.selectedMaterials.delete(sku);

    } else {

      this.selectedMaterials.add(sku);

    }
  }


  nextStep() {
    if (this.currentStep === 1) {

      if (this.selectedMaterials.size === 0) {

        this.toast.error('Please select at least one item');

        return;
      }

      this.prepareQuoteItems();
    }

    if (this.currentStep === 2) {
      const missingVendor = this.quoteItems.find(
        (item: any) => !item.vendorId
      );
      if (missingVendor) {
        this.toast.error(
          `Please select vendor for ${missingVendor.name}`
        );

        return;
      }

      const invalidQty = this.quoteItems.find(
        (item: any) => !item.quantity || item.quantity <= 0
      );

      if (invalidQty) {

        this.toast.error(
          `Please enter valid quantity for ${invalidQty.name}`
        );

        return;
      }

    }

    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }


  prepareQuoteItems() {
    console.log(this.quoteItems, 'this.quoteItems');
    const source =
      this.selectedType === 'MATERIAL'
        ? this.materials
        : this.equipments;

    this.quoteItems = Array.from(this.selectedMaterials).map(sku => {

      const mat: any = source.find((m: any) => m.sku === sku);

      console.log(mat, 'mat');

      const defaultVendor: any = null;

      const cost = Number(
        (mat?.cost || '0')
          .toString()
          .replace(/₹/g, '')
          .replace(/,/g, '')
          .trim()
      );

      return {

        materialSku: sku,

        name: mat?.name || '',

        quantity: 1,

        unitPrice: cost || 0,

        totalPrice: cost || 0,

        vendorId: defaultVendor?.id ?? null,

        vendor_name: defaultVendor?.name ?? null,

        category: mat?.category || '',

        id: mat?.id || null,

        status: this.selectedType,

        material_master_id:
          this.selectedType === 'MATERIAL'
            ? mat?.id
            : null,

        equipment_master_id:
          this.selectedType === 'EQUIPMENT'
            ? mat?.id
            : null
      };
    });
  }


  updateLineTotal(item: QuoteItem) {
    item.totalPrice = item.quantity * item.unitPrice;
  }


  get totalAmount() {
    return this.quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }


  onVendorChange(item: QuoteItem, event: any) {

    const vendorId = event.target.value;

    const vendor = this.vendors.find(
      v => v.id.toString() === vendorId.toString()
    );

    if (vendor) {

      item.vendorId = vendor.id;

      item.vendor_name = vendor.name;

      this.selectedVendor = vendor;

    }
  }


  submitQuote() {
    if (!this.selectedVendor) {

      this.toast.error('Please select vendor');

      return;
    }

    if (!this.quoteItems || this.quoteItems.length === 0) {

      this.toast.error('Please add items');

      return;
    }

    const invalidQty = this.quoteItems.some(
      item => !item.quantity || item.quantity <= 0
    );

    if (invalidQty) {

      this.toast.error('Please enter valid quantity');

      return;
    }

    console.log(this.quoteItems, 'this.quoteItems');

    const payload = {

      date: new Date().toLocaleString('sv-SE').replace('T', ' '),

      sales_person: this.selectedVendor?.name || '',

      vendor_feedback: '',

      quotation_status: 'Sent',
      quotation_type: this.selectedType,

      status: 'Draft',

      items: this.quoteItems.map((item: any) => ({

        sku: item.materialSku || '',

        name: item.name || '',

        category: item.category || '',

        quantity: Number(item.quantity) || 0,

        unitPrice: Number(item.unitPrice || item.price) || 0,

        totalPrice:
          (Number(item.quantity) || 0) *
          (Number(item.unitPrice || item.price) || 0),

        vendor_id:
          item.vendorId ||
          this.selectedVendor?.id ||
          null,

        vendor_name:
          item.vendor_name ||
          this.selectedVendor?.name ||
          '',

        status:
          item.status ||
          this.selectedType,

        material_master_id:
          item.material_master_id ||
          null,

        equipment_master_id:
          item.equipment_master_id ||
          null
      }))
    };

    this.quotationService.addQuote(payload).subscribe({

      next: (res) => {

        this.toast.success('Quotation submitted successfully!');

        this.router.navigate(['/master/resources/quotations']);
      },

      error: (err) => {

        console.error(err);

        this.toast.error('Failed to submit quotation');
      }
    });
  }

  removeQuoteItem(index: number) {
    this.quoteItems.splice(index, 1);;
  }
}