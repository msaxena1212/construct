import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorsServices, Vendor, VendorStats, Activity } from '../vendors/services/vendors-services';

@Component({
  selector: 'app-vendors',
  standalone: false,
  templateUrl: './vendors.html',
  styleUrl: './vendors.scss',
})
export class Vendors implements OnInit {
  private vendorService = inject(VendorsServices);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  team = [{ name: 'All Members' }, { name: 'Marcus Thorne' }, { name: 'Sarah Chen' }];
  selectedMember = 'All Members';

  showAddModal = false;
  showInvoiceModal = false;
  showAuditModal = false;
  showBillingModal = false;

  isSaving = false;
  isDeleting = false;
  errorMsg = '';

  viewingVendorId: string | null = null;
  selectedVendor: Vendor | undefined = undefined;

  vendors: Vendor[] = [];
  stats: VendorStats = { totalActive: 0, pendingPayments: '₹0', compliantPartners: '0%' };
  activities: Activity[] = [];

  newVendor: any = this.defaultVendor();
  contractFile: File | null = null;

  invoiceForm: any = this.defaultInvoice();

  auditForm: any = { quality: 5, timeliness: 5, safety: 5, observations: '' };

  ngOnInit(): void {
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      this.syncSelectedVendor();
    });

    this.vendorService.stats$.subscribe(s => this.stats = s);

    this.vendorService.activities$.subscribe(a => this.activities = a);

    this.route.paramMap.subscribe(params => {
      this.viewingVendorId = params.get('id');
      this.syncSelectedVendor();
    });
  }

  private syncSelectedVendor(): void {
    this.selectedVendor = this.viewingVendorId
      ? this.vendorService.getVendorById(this.viewingVendorId)
      : undefined;
  }

  get filteredVendors(): Vendor[] {
    if (this.selectedMember === 'All Members') return this.vendors;
    return this.vendors.filter(v => v.assignee === this.selectedMember);
  }

  closeDetail(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  openAddModal(): void {
    this.newVendor = this.defaultVendor();
    this.contractFile = null;
    this.errorMsg = '';
    this.showAddModal = true;
  }

  onContractFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.contractFile = input.files?.[0] ?? null;
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
        this.showAddModal = false;
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMsg = err?.error?.message ?? 'Vendor onboard failed. Please try again.';
      },
    });
  }

  deleteVendor(id: string): void {
    if (this.isDeleting) return;
    if (!confirm('Are you sure you want to remove this vendor?')) return;

    this.isDeleting = true;
    this.vendorService.deleteVendor(id).subscribe({
      next: () => { this.isDeleting = false; },
      error: (err) => {
        this.isDeleting = false;
        alert('Delete failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  openSubmission(): void {
    this.invoiceForm = this.defaultInvoice();
    this.showInvoiceModal = true;
  }

  addInvoiceItem(): void {
    this.invoiceForm.items.push({ description: '', quantity: 1, unitPrice: 0, total: 0 });
  }

  removeInvoiceItem(index: number): void {
    if (this.invoiceForm.items.length > 1) {
      this.invoiceForm.items.splice(index, 1);
      this.calculateInvoiceTotals();
    }
  }

  calculateInvoiceTotals(): void {
    let subtotal = 0;
    this.invoiceForm.items.forEach((item: any) => {
      item.total = item.quantity * item.unitPrice;
      subtotal += item.total;
    });
    this.invoiceForm.subtotal = subtotal;
    this.invoiceForm.taxAmount = Math.round((subtotal * this.invoiceForm.taxRate) / 100);
    this.invoiceForm.grandTotal = subtotal + this.invoiceForm.taxAmount;
  }

  submitInvoice(): void {
    if (!this.selectedVendor) return;
    const inv = {
      number: this.invoiceForm.number,
      amount: this.invoiceForm.grandTotal,
      status: 'Pending',
      date: this.invoiceForm.date,
      items: [...this.invoiceForm.items],
      taxAmount: this.invoiceForm.taxAmount,
      taxRate: this.invoiceForm.taxRate,
      subtotal: this.invoiceForm.subtotal,
    };
    this.selectedVendor.invoices = [inv, ...(this.selectedVendor.invoices ?? [])];
    this.showInvoiceModal = false;
    alert(`Invoice ${inv.number} submitted for ₹${inv.amount.toLocaleString('en-IN')}.`);
  }

  openAudit(): void {
    this.auditForm = { quality: 5, timeliness: 5, safety: 5, observations: '' };
    this.showAuditModal = true;
  }

  submitAudit(): void {
    if (!this.selectedVendor) return;
    const score = Math.round(((this.auditForm.quality + this.auditForm.timeliness + this.auditForm.safety) / 15) * 100);
    alert(`Audit recorded for ${this.selectedVendor.name}. Score: ${score}%`);
    this.showAuditModal = false;
  }

  openBilling(): void {
    this.showBillingModal = true;
  }

  private defaultVendor() {
    return {
      name: '',
      email: '',
      phone: '',
      spoc: { name: '', phone: '' },
      kyc: { gst: '', pan: '' },
      address: { street: '', pincode: '' },
      budget: '',
      services: '',
    };
  }

  private defaultInvoice() {
    return {
      number: 'INV-' + Math.floor(Math.random() * 9000 + 1000),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      taxRate: 18,
      taxAmount: 0,
      subtotal: 0,
      grandTotal: 0,
    };
  }
}