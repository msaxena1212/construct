import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  VendorsServices,
  Vendor,
  VendorStats,
  Activity,
} from '../vendors/services/vendors-services';
import {
  VendorsLaborServices,
  LaborWorker,
  LaborStats,
} from './services/vendors-labor-services';
import { RoleService } from '../users/role-management/services/role.service';

@Component({
  selector: 'app-vendors',
  standalone: false,
  templateUrl: './vendors.html',
  styleUrl: './vendors.scss',
})
export class Vendors implements OnInit {
  private vendorService = inject(VendorsServices);
  private laborService = inject(VendorsLaborServices);
  private roleService = inject(RoleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  roleOptions: { value: number; label: string }[] = [];

  team = [{ name: 'All Members' }, { name: 'Marcus Thorne' }, { name: 'Sarah Chen' }];
  selectedMember = 'All Members';

  showAddModal = false;
  showInvoiceModal = false;
  showAuditModal = false;
  showBillingModal = false;
  showLaborModal = false;
  showAddLaborForm = false;

  isSaving = false;
  isDeleting = false;
  isSavingLabor = false;
  errorMsg = '';
  laborError = '';

  viewingVendorId: string | null = null;
  selectedVendor: Vendor | undefined = undefined;
  vendors: Vendor[] = [];
  stats: VendorStats = { totalActive: 0, pendingPayments: '₹0', compliantPartners: '0%' };
  activities: Activity[] = [];

  laborWorkers: LaborWorker[] = [];
  laborStats: LaborStats = {
    totalPersonnel: 0, onSite: 0, activePersonnel: 0,
    skillCompliance: '0%', skillComposition: [],
  };
  laborLoading = false;

  newLabor: any = this.defaultLabor();
  newVendor: any = this.defaultVendor();
  contractFile: File | null = null;
  invoiceForm: any = this.defaultInvoice();
  auditForm: any = { quality: 5, timeliness: 5, safety: 5, observations: '' };

  readonly skillOptions = [
    { value: 'masonry', label: 'Masonry' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'structural_steel', label: 'Structural Steel' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'carpentry', label: 'Carpentry' },
    { value: 'painting', label: 'Painting' },
    { value: 'other', label: 'Other' },
  ];

  readonly statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'on_site', label: 'On Site' },
    { value: 'off_duty', label: 'Off Duty' },
    { value: 'inactive', label: 'Inactive' },
  ];

  readonly sumRate = (acc: number, w: LaborWorker): number =>
    acc + (Number(w.daily_rate) || 0);

  ngOnInit(): void {
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      this.syncSelectedVendor();
    });
    this.vendorService.stats$.subscribe(s => (this.stats = s));
    this.vendorService.activities$.subscribe(a => (this.activities = a));

    this.laborService.workers$.subscribe(w => (this.laborWorkers = w));
    this.laborService.stats$.subscribe(s => (this.laborStats = s));
    this.laborService.loading$.subscribe(l => (this.laborLoading = l));

    this.route.paramMap.subscribe(params => {
      this.viewingVendorId = params.get('id');
      this.syncSelectedVendor();
    });

    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe((res: any) => {
      this.roleOptions = (res.data || []).map((role: any) => ({
        value: role.id,
        label: role.role || role.name || role.role_name,
      }));
    });
  }

  private syncSelectedVendor(): void {
    if (!this.viewingVendorId) {
      this.selectedVendor = undefined;
      return;
    }
    const local = this.vendorService.getVendorById(this.viewingVendorId);
    if (local) {
      this.selectedVendor = local;
    } else {
      this.vendorService.getVendorByIdFromApi(this.viewingVendorId).subscribe({
        next: v => (this.selectedVendor = v),
        error: () => this.router.navigate(['/master/resources/vendors']),
      });
    }
  }

  get filteredVendors(): Vendor[] {
    if (this.selectedMember === 'All Members') return this.vendors;
    return this.vendors.filter(v => v.assignee === this.selectedMember);
  }

  openVendorDetail(vendor: Vendor): void {
    this.router.navigate(['/master/resources/vendors', vendor.id]);
  }

  closeDetail(): void {
    this.laborService.clearWorkers();
    this.router.navigate(['/master/resources/vendors']);
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
    if (this.contractFile) fd.append('contractFile', this.contractFile);

    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
      },
      error: err => {
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
      error: err => {
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
  get auditScore(): number {
    return Math.round(
      (
        this.auditForm.quality +
        this.auditForm.timeliness +
        this.auditForm.safety
      ) / 30 * 100
    );
  }
  submitAudit(): void {
    if (!this.selectedVendor) return;
    const score = Math.round(
      ((this.auditForm.quality + this.auditForm.timeliness + this.auditForm.safety) / 30) * 100,
    );
    alert(`Audit recorded for ${this.selectedVendor.name}. Score: ${score}%`);
    this.showAuditModal = false;
  }

  openBilling(): void { this.showBillingModal = true; }

  openLaborModal(): void {
    if (!this.selectedVendor) return;
    this.newLabor = this.defaultLabor();
    this.showAddLaborForm = false;
    this.laborError = '';
    this.laborService.loadLaborForVendor(this.selectedVendor.id);
    this.showLaborModal = true;
  }

  closeLaborModal(): void {
    this.showLaborModal = false;
    this.showAddLaborForm = false;
  }

  toggleAddLaborForm(): void {
    this.newLabor = this.defaultLabor();
    this.laborError = '';
    this.showAddLaborForm = !this.showAddLaborForm;
  }

  submitLabor(): void {
    if (this.isSavingLabor || !this.selectedVendor) return;
    this.laborError = '';

    if (!this.newLabor.name.trim() || !this.newLabor.role_id || !this.newLabor.skill) {
      this.laborError = 'Name, Role and Skill are required.';
      return;
    }

    const payload = {
      company_id: this.selectedVendor.company_id,
      vendor_id: this.selectedVendor.id,
      name: this.newLabor.name.trim(),
      role_id: Number(this.newLabor.role_id),
      skill: this.newLabor.skill,
      status: this.newLabor.status || 'active',
      phone: this.newLabor.phone || null,
      daily_rate: parseFloat(this.newLabor.daily_rate) || 0,
      joining_date: this.newLabor.joining_date || null,
      current_task: this.newLabor.current_task || null,
    };

    this.isSavingLabor = true;
    this.laborService.addWorker(payload).subscribe({
      next: () => {
        this.isSavingLabor = false;
        this.showAddLaborForm = false;
        this.newLabor = this.defaultLabor();
      },
      error: err => {
        this.isSavingLabor = false;
        this.laborError = err?.error?.message ?? 'Failed to add worker.';
      },
    });
  }

  deleteLaborWorker(id: number): void {
    if (!confirm('Remove this worker?')) return;
    this.laborService.deleteWorker(id).subscribe({
      error: err => alert('Delete failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

  updateLaborStatus(worker: LaborWorker, status: string): void {
    this.laborService.updateWorker(worker.id, { status }).subscribe();
  }


  getSkillBarWidth(count: number): number {
    const max = Math.max(...this.laborStats.skillComposition.map(s => s.count), 1);
    return Math.round((count / max) * 100);
  }

  getSkillBarColor(skill: string): string {
    const colors: Record<string, string> = {
      Masonry: 'bg-blue-500',
      Electrical: 'bg-yellow-500',
      'Structural Steel': 'bg-red-500',
      Plumbing: 'bg-green-500',
      HVAC: 'bg-purple-500',
      Carpentry: 'bg-orange-400',
      Painting: 'bg-pink-400',
      Other: 'bg-slate-400',
    };
    return colors[skill] ?? 'bg-slate-400';
  }

  getRoleInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    const c = event.which ?? event.keyCode;
    if ([8, 9, 13, 27, 46].includes(c) || (c >= 35 && c <= 40)) return true;
    if (c < 48 || c > 57) { event.preventDefault(); return false; }
    return true;
  }

  onlyAlphanumeric(event: KeyboardEvent): boolean {
    const c = event.which ?? event.keyCode;
    const isLetter = (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
    const isNumber = c >= 48 && c <= 57;
    const isControl = [8, 9, 13, 27, 46].includes(c) || (c >= 35 && c <= 40);
    if (!isLetter && !isNumber && !isControl) { event.preventDefault(); return false; }
    return true;
  }

  stripNonNumericOnPaste(event: ClipboardEvent, field: string, max: number): void {
    event.preventDefault();
    const cleaned = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, max);
    if (field === 'spocPhone') this.newVendor.spoc.phone = cleaned;
    if (field === 'phone') this.newVendor.phone = cleaned;
    if (field === 'pincode') this.newVendor.address.pincode = cleaned;
  }

  stripNonAlphanumericOnPaste(event: ClipboardEvent, field: string, max: number): void {
    event.preventDefault();
    const cleaned = (event.clipboardData?.getData('text') ?? '')
      .replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, max);
    if (field === 'gst') this.newVendor.kyc.gst = cleaned;
    if (field === 'pan') this.newVendor.kyc.pan = cleaned;
  }

  private defaultVendor() {
    return {
      name: '', email: '', phone: '',
      spoc: { name: '', phone: '' },
      kyc: { gst: '', pan: '' },
      address: { street: '', pincode: '' },
      budget: '', services: '',
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

  private defaultLabor() {
    return {
      name: '', role_id: '', skill: '',
      status: 'active', phone: '',
      daily_rate: '', joining_date: '', current_task: '',
    };
  }
}