// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { MaterialMasterService, Material } from '../../../shared/services/master/material-master';
// import { VendorsServices, Vendor } from '../../vendors/services/vendors-services';
// import { QuotationService, Quote, QuoteItem } from '../../../shared/services/quotation.service';
// import { ToastrService } from 'ngx-toastr';
// @Component({
//   selector: 'app-new-quotations',
//   standalone: false,
//   templateUrl: './new-quotations.html',
//   styleUrl: './new-quotations.scss',
// })
// export class NewQuotations implements OnInit {

//   private materialService = inject(MaterialMasterService);
//   private vendorService = inject(VendorsServices);
//   private quotationService = inject(QuotationService);
//   private toast = inject(ToastrService);

//   private router = inject(Router);

//   currentStep = 1;
//   materials: Material[] = [];
//   vendors: Vendor[] = [];
//   today = new Date();

//   searchQuery = '';
//   selectedMaterials = new Set<string>();

//   // For Step 2
//   quoteItems: QuoteItem[] = [];
//   selectedVendor: any;

//   selectedType: 'MATERIAL' | 'EQUIPMENT' = 'MATERIAL';

// filteredMaterialsTab: any[] = [];

// filterResources() {

//   if (this.selectedType === 'MATERIAL') {

//     this.filteredMaterialstab = this.materials;

//   } else {

//     this.filteredMaterialstab = this.equipments;

//   }
// }

//   ngOnInit() {
//     this.materialService.loadMaterials();
//     this.materialService.materials$.subscribe(m => this.materials = m);
//     this.vendorService.vendors$.subscribe(v => this.vendors = v);
//   }

//   get filteredMaterials() {
//     if (!this.searchQuery) return this.materials;
//     const query = this.searchQuery.toLowerCase();
//     return this.materials.filter(m =>
//       m.name.toLowerCase().includes(query) ||
//       m.category.toLowerCase().includes(query)
//     );
//   }

//   toggleMaterial(sku: string) {
//     if (this.selectedMaterials.has(sku)) {
//       this.selectedMaterials.delete(sku);
//     } else {
//       this.selectedMaterials.add(sku);
//     }
//   }

//   nextStep() {
//     if (this.currentStep === 1) {
//       // Vendor validation
//       this.prepareQuoteItems();
//     }
//     if (this.currentStep === 2) {
//       if (!this.selectedVendor) {
//         this.toast.error('Please select a vendor before submitting the quotation.');
//         return;
//       }
//     }
//     this.currentStep++;
//   }

//   prevStep() {
//     this.currentStep--;
//   }

//   prepareQuoteItems() {
//     console.log(this.quoteItems,'this.quoteItems');

//     this.quoteItems = Array.from(this.selectedMaterials).map(sku => {
//       const mat:any = this.materials.find(m => m.sku === sku);
//       console.log(mat,'mat');


//       // Default vendor null rahega
//       const defaultVendor: any = null;

//       const cost = Number(
//         (mat?.cost || '0')
//           .toString()
//           .replace(/₹/g, '')
//           .replace(/,/g, '')
//           .trim()
//       );

//       return {
//         materialSku: sku,
//         name: mat?.name || '',
//         quantity: 1,
//         unitPrice: cost || 0,
//         totalPrice: cost || 0,
//         vendorId: defaultVendor?.id ?? null,
//         vendor_name: defaultVendor?.name ?? null,
//         category: mat?.category || '',
//         id: mat?.id || null
//       };
//     });
//   }

//   updateLineTotal(item: QuoteItem) {
//     item.totalPrice = item.quantity * item.unitPrice;
//   }

//   get totalAmount() {
//     return this.quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);
//   }

//   onVendorChange(item: QuoteItem, event: any) {
//     const vendorId = event.target.value;
//     const vendor = this.vendors.find(v => v.id.toString() === vendorId.toString());
//     if (vendor) {
//       item.vendorId = vendor.id;
//       item.vendor_name = vendor.name;
//       this.selectedVendor = vendor; // Update selected vendor for validation
//     }
//   }

//   submitQuote() {

//     // Validation
//     if (!this.selectedVendor) {
//       this.toast.error('Please select vendor');
//       return;
//     }

//     if (!this.quoteItems || this.quoteItems.length === 0) {
//       this.toast.error('Please add items');
//       return;
//     }

//     const invalidQty = this.quoteItems.some(
//       item => !item.quantity || item.quantity <= 0
//     );

//     if (invalidQty) {
//       this.toast.error('Please enter valid quantity');
//       return;
//     }

//     console.log(this.quoteItems,'this.quoteItems');

//     // Dynamic Payload
//     const payload = {
//       date: new Date().toLocaleString('sv-SE').replace('T', ' '),

//       sales_person: this.selectedVendor?.name || '',

//       vendor_feedback: '',

//       quotation_status: 'Sent',

//       status: 'Draft',

//       items: this.quoteItems.map((item: any) => ({

//         sku: item.materialSku || '',

//         name: item.name  || item.name || '',

//         category: item.category || '',

//         quantity: Number(item.quantity) || 0,

//         unitPrice: Number(item.unitPrice || item.price) || 0,

//         totalPrice:
//           (Number(item.quantity) || 0) *
//           (Number(item.unitPrice || item.price) || 0),

//         vendor_id:
//           item.vendor_id ||
//           this.selectedVendor?.id ||
//           null,

//         vendor_name:
//           item.vendor_name ||
//           this.selectedVendor?.name ||
//           '',

//         status:
//           item.status ||
//           'MATERIAL',

//         material_master_id:
//           item.id ||
//           null,

//         equipment_master_id:
//           item.equipment_master_id ||
//           null
//       }))
//     };

//     this.quotationService.addQuote(payload).subscribe({
//       next: (res) => {
//         this.toast.success('Quotation submitted successfully!');
//         this.router.navigate(['/master/resources/quotations']);
//       },

//       error: (err) => {
//         console.error(err);
//         this.toast.error('Failed to submit quotation');
//       }
//     });
//   }
// }
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

  // ADD THIS
  private equipmentService = inject(Equipment);

  private vendorService = inject(VendorsServices);
  private quotationService = inject(QuotationService);
  private toast = inject(ToastrService);

  private router = inject(Router);

  currentStep = 1;

  materials: Material[] = [];

  // ADD THIS
  equipments: any[] = [];

  vendors: Vendor[] = [];

  today = new Date();

  searchQuery = '';

  selectedMaterials = new Set<string>();

  // For Step 2
  quoteItems: QuoteItem[] = [];

  selectedVendor: any;

  selectedType: 'MATERIAL' | 'EQUIPMENT' = 'MATERIAL';

  filteredMaterialsTab: any[] = [];


  // =========================
  // FILTER RESOURCES
  // =========================

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
      // this.loadResourcesByType();
      this.filteredMaterialsTab = this.equipments.filter((eq: any) =>
        eq.name?.toLowerCase().includes(query) ||
        eq.category?.toLowerCase().includes(query) ||
        eq.sku?.toLowerCase().includes(query)
      );

    }

  }


  ngOnInit() {

    // DEFAULT LOAD
    this.loadResourcesByType();


    // VENDORS
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
    });

  }
  // LOAD DATA BY TYPE

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

    // STEP 1
    if (this.currentStep === 1) {

      if (this.selectedMaterials.size === 0) {

        this.toast.error('Please select at least one item');

        return;
      }

      this.prepareQuoteItems();
    }


    // STEP 2
    if (this.currentStep === 2) {

      // Check every item vendor
      const missingVendor = this.quoteItems.find(
        (item: any) => !item.vendorId
      );

      if (missingVendor) {

        this.toast.error(
          `Please select vendor for ${missingVendor.name}`
        );

        return;
      }


      // Check quantity
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

    // Validation
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

    // Dynamic Payload
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