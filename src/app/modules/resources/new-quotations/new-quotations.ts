import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialMasterService, Material } from '../../../shared/services/master/material-master';
import { VendorsServices, Vendor } from '../../vendors/services/vendors-services';
import { QuotationService, Quote, QuoteItem } from '../../../shared/services/quotation.service';
@Component({
  selector: 'app-new-quotations',
  standalone: false,
  templateUrl: './new-quotations.html',
  styleUrl: './new-quotations.scss',
})
export class NewQuotations implements OnInit {

private materialService = inject(MaterialMasterService);
  private vendorService = inject(VendorsServices);
  private quotationService = inject(QuotationService);
  private router = inject(Router);

  currentStep = 1;
  materials: Material[] = [];
  vendors: Vendor[] = [];
  today = new Date();
  
  searchQuery = '';
  selectedMaterials = new Set<string>();

  // For Step 2
  quoteItems: QuoteItem[] = [];

  ngOnInit() {
     this.materialService.loadMaterials();
    this.materialService.materials$.subscribe(m => this.materials = m);
    this.vendorService.vendors$.subscribe(v => this.vendors = v);
  }

  get filteredMaterials() {
    if (!this.searchQuery) return this.materials;
    const query = this.searchQuery.toLowerCase();
    return this.materials.filter(m => 
      m.name.toLowerCase().includes(query) || 
      m.category.toLowerCase().includes(query)
    );
  }

  toggleMaterial(sku: string) {
    if (this.selectedMaterials.has(sku)) {
      this.selectedMaterials.delete(sku);
    } else {
      this.selectedMaterials.add(sku);
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.prepareQuoteItems();
    }
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

prepareQuoteItems() {
  this.quoteItems = Array.from(this.selectedMaterials).map(sku => {
    const mat = this.materials.find(m => m.sku === sku);

    // Default vendor null rahega
    const defaultVendor:any = null;

    const cost = Number(
      (mat?.cost || '0')
        .toString()
        .replace(/₹/g, '')
        .replace(/,/g, '')
        .trim()
    );

    return {
      materialSku: sku,
      materialName: mat?.name || '',
      quantity: 1,
      unitPrice: cost || 0,
      totalPrice: cost || 0,
      vendorId: defaultVendor?.id ?? null,
      vendorName: defaultVendor?.name ?? null
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
    const vendor = this.vendors.find(v => v.id.toString() === vendorId.toString());
    if (vendor) {
      item.vendorId = vendor.id;
      item.vendorName = vendor.name;
    }
  }

submitQuote() {
  const newQuote: Quote = {
    id: Date.now().toString(),
    quotation_number: 'QT-' + Math.floor(Math.random() * 90000 + 10000),
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }),
    vendor_name: 'Marcus Thorne',
    items: this.quoteItems,
    total_cost: this.totalAmount,
    quantity: this.quoteItems.length, // add this
    status: 'Draft'
  };

  this.quotationService.addQuote(newQuote).subscribe(() => {
    this.router.navigate(['/quotations']);
  });
}
}
