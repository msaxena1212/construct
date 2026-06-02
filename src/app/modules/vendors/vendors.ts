import { Component, OnInit, inject, Input } from '@angular/core';
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
import { VendorInvoiceService, VendorInvoice } from '../vendors/services/vendors-invoice-services';
import { VendorAuditService, VendorAudit } from '../vendors/services/vendors-audit-services';
import { SkillMasterServices } from '../master/skill-master/skill-master-services';
import { ProjectService } from '../projects/services/project-service';
import { IProjectTask } from '../../shared/interfaces/project.interface';

@Component({
  selector: 'app-vendors',
  standalone: false,
  templateUrl: './vendors.html',
  styleUrls: ['./vendors.scss'],
})
export class Vendors implements OnInit {

  @Input() projectId: string | number = '';

  projectdata: any = null;

  private vendorService = inject(VendorsServices);
  private laborService = inject(VendorsLaborServices);
  private invoiceService = inject(VendorInvoiceService);
  private auditService = inject(VendorAuditService);
  private skillMasterService = inject(SkillMasterServices);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  allTasks: IProjectTask[] = [];
  skillOptions: { value: string; label: string }[] = [];

  selectedInvoice: VendorInvoice | null = null;

  showAddModal = false;
  showInvoiceModal = false;
  showVendorDetailModal = false;
  payInvoiceeModal = false;
  showCancelInvoiceModal = false;
  showAuditModal = false;
  showBillingModal = false;
  showLaborModal = false;
  showAddLaborForm = false;

  currentStep = 1;
  stepError = '';
  fileError = '';
  contractFiles: File[] = [];

  readonly vendorSteps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'KYC & Address' },
    { num: 3, label: 'Budget' },
    { num: 4, label: 'Documents' },
  ];

  paymentForm: { amount: number | null; mode: string; reference: string } = {
    amount: null,
    mode: '',
    reference: '',
  };
  paymentError = '';
  isProcessingPayment = false;

  isEditMode = false;
  editingVendorId: string | null = null;

  isSaving = false;
  isDeleting = false;
  isSavingLabor = false;
  isSavingAudit = false;
  isSavingInvoice = false;
  isCancellingInvoice = false;
  laborError = '';

  viewingVendorId: string | null = null;
  selectedVendor: Vendor | undefined = undefined;
  vendors: Vendor[] = [];
  stats: VendorStats = { totalActive: 0, pendingPayments: '₹0', compliantPartners: '0%' };
  activities: Activity[] = [];

  laborWorkers: LaborWorker[] = [];
  laborStats: LaborStats = {
    totalPersonnel: 0,
    onSite: 0,
    remaining: 0,
    activePersonnel: 0,
    skillCompliance: '0%',
    skillComposition: [],
  };
  laborLoading = false;

  invoices: VendorInvoice[] = [];
  vendorAudits: VendorAudit[] = [];

  newLabor: any = this.defaultLabor();
  newVendor: any = this.defaultVendor();
  invoiceForm: any = this.defaultInvoice();
  auditForm: any = { quality: 5, timeliness: 5, safety: 5, observations: '' };

  editingLaborId: number | null = null;
  editLaborForm: any = {};

  team = [{ name: 'All Members' }, { name: 'Marcus Thorne' }, { name: 'Sarah Chen' }];
  selectedMember = 'All Members';

  readonly statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'on_site', label: 'On Site' },
    { value: 'off_duty', label: 'Off Duty' },
    { value: 'inactive', label: 'Inactive' },
  ];

  readonly sumRate = (acc: number, w: LaborWorker): number =>
    acc + (Number(w.daily_rate) || 0) * (w.labor_count || 0);

  // ─── Lifecycle ───────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.viewingVendorId = params.get('id');
      this.syncSelectedVendor();
    });
    this.getSkill();
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      this.syncSelectedVendor();
    });
    this.vendorService.stats$.subscribe(s => (this.stats = s));
    this.vendorService.activities$.subscribe(a => (this.activities = a));
    this.laborService.workers$.subscribe(w => (this.laborWorkers = w));
    this.laborService.stats$.subscribe(s => (this.laborStats = s));
    this.laborService.loading$.subscribe(l => (this.laborLoading = l));
    this.invoiceService.invoices$.subscribe(inv => (this.invoices = inv));
    this.auditService.audits$.subscribe(audits => (this.vendorAudits = audits));
  }

  // ─── Data Loaders ────────────────────────────────────────────────────────────

  private loadVendorSubData(vendorId: string): void {
    this.invoiceService.loadInvoices(vendorId);
    this.auditService.loadAudits(vendorId);
    this.laborService.loadLaborForVendor(vendorId);

    const projectId = this.selectedVendor?.project_id;
    if (projectId) {
      this.projectService.getProjectTasks(projectId).subscribe({
        next: (res: any) => {
          this.allTasks = res?.data || [];
        },
        error: (err: any) => console.error('Task load failed', err),
      });

      this.projectService.getProjectById(projectId).subscribe({
        next: (res: any) => {
          this.projectdata = res?.data ?? null;
        },
        error: (err: any) => {
          this.projectdata = null;
          console.error('Project load failed', err);
        },
      });
    } else {
      this.allTasks = [];
      this.projectdata = null;
    }
  }

  getSkill(): void {
    this.skillMasterService.loadSkills().subscribe({
      next: (res: any) => {
        if (res.success && Array.isArray(res.data)) {
          this.skillOptions = res.data.map((s: any) => ({
            value: s.skill_name?.toLowerCase().replace(/\s+/g, '_') ?? s.id,
            label: s.skill_name ?? s.name,
          }));
        }
      },
    });
  }

  getProjectById(): void {
    if (!this.projectId) return;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectdata = res?.data ?? null;
      },
      error: (err: any) => console.error('Project load failed', err),
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
      this.loadVendorSubData(this.viewingVendorId);
    } else {
      this.vendorService.getVendorByIdFromApi(this.viewingVendorId).subscribe({
        next: v => {
          this.selectedVendor = v;
          this.loadVendorSubData(this.viewingVendorId!);
        },
        error: () => this.router.navigate(['/master/resources/vendors']),
      });
    }
  }

  // ─── Vendor List ─────────────────────────────────────────────────────────────

  get filteredVendors(): Vendor[] {
    if (this.selectedMember === 'All Members') return this.vendors;
    return this.vendors.filter(v => v.assignee === this.selectedMember);
  }

  openVendorDetail(vendor: Vendor): void {
    this.router.navigate(['/master/resources/vendors', vendor.id]);
  }

  closeDetail(): void {
    this.laborService.clearWorkers();
    this.invoiceService.clearInvoices();
    this.auditService.clearAudits();
    this.projectdata = null;
    this.router.navigate(['/master/resources/vendors']);
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() ?? filePath;
  }

  // ─── Add / Edit Vendor Modal ──────────────────────────────────────────────────

  openAddModal(): void {
    this.isEditMode = false;
    this.editingVendorId = null;
    this.newVendor = this.defaultVendor();
    this.contractFiles = [];
    this.stepError = '';
    this.fileError = '';
    this.currentStep = 1;
    this.showAddModal = true;
  }

  editVendorDetail(vendor?: Vendor): void {
    const v = vendor ?? this.selectedVendor;
    if (!v) return;

    this.isEditMode = true;
    this.editingVendorId = v.id;
    this.currentStep = 1;
    this.stepError = '';
    this.fileError = '';
    this.contractFiles = [];

    this.newVendor = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      spoc: { name: v.spoc?.name ?? '', phone: v.spoc?.phone ?? '' },
      kyc: { gst: v.kyc?.gst ?? '', pan: v.kyc?.pan ?? '' },
      address: { street: v.address?.street ?? '', pincode: v.address?.pincode ?? '' },
      budget: String(v.budget_allocation ?? ''),
      skill: Array.isArray(v.skill) ? v.skill.join(', ') : (v.skill ?? ''),
    };

    this.showVendorDetailModal = false;
    this.showAddModal = true;
  }

  nextStep(): void {
    this.stepError = '';

    if (this.currentStep === 1) {
      if (!this.newVendor.name?.trim()) {
        this.stepError = 'Vendor Legal Name is required.'; return;
      }
      if (!this.newVendor.spoc.name?.trim()) {
        this.stepError = 'SPOC Name is required.'; return;
      }
      if (!this.newVendor.spoc.phone?.trim() || this.newVendor.spoc.phone.length < 10) {
        this.stepError = 'SPOC Phone must be 10 digits.'; return;
      }
      if (!this.newVendor.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newVendor.email)) {
        this.stepError = 'Enter a valid official email address.'; return;
      }
      if (!this.newVendor.phone?.trim() || this.newVendor.phone.length < 10) {
        this.stepError = 'Official phone must be 10 digits.'; return;
      }
    }

    if (this.currentStep === 2) {
      const gst = this.newVendor.kyc.gst?.trim();
      const pan = this.newVendor.kyc.pan?.trim();
      if (!gst && !pan) {
        this.stepError = 'At least one of GST No. or PAN Card No. is required.'; return;
      }
      if (gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst)) {
        this.stepError = 'Invalid GST format. Expected: 22AAAAA0000A1Z5'; return;
      }
      if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
        this.stepError = 'Invalid PAN format. Expected: ABCDE1234F'; return;
      }
      if (!this.newVendor.address.street?.trim()) {
        this.stepError = 'Physical address is required.'; return;
      }
      if (!this.newVendor.address.pincode?.trim() || this.newVendor.address.pincode.length < 6) {
        this.stepError = 'Enter a valid 6-digit pincode.'; return;
      }
    }

    if (this.currentStep === 3) {
      if (!this.newVendor.budget?.toString().trim()) {
        this.stepError = 'Budget allocation is required.'; return;
      }
      if (!this.newVendor.skill?.trim()) {
        this.stepError = 'At least one service is required.'; return;
      }
    }

    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep(): void {
    this.stepError = '';
    if (this.currentStep > 1) this.currentStep--;
  }

  addVendor(): void {
    if (this.isSaving) return;
    this.stepError = '';
    this.isEditMode ? this.updateVendorData() : this.createVendorData();
  }

  private createVendorData(): void {
    const fd = new FormData();
    fd.append('vendorLegalName', this.newVendor.name);
    fd.append('spocName', this.newVendor.spoc.name);
    fd.append('spocPhone', this.newVendor.spoc.phone);
    fd.append('officialEmail', this.newVendor.email);
    fd.append('officialPhone', this.newVendor.phone);
    fd.append('gstNo', this.newVendor.kyc.gst ?? '');
    fd.append('panCardNo', this.newVendor.kyc.pan ?? '');
    fd.append('physicalAddress', this.newVendor.address.street);
    fd.append('pincode', this.newVendor.address.pincode);
    fd.append('budgetAllocation', this.newVendor.budget);
    fd.append('skill', this.newVendor.skill);

    if (this.projectId) fd.append('project_id', String(this.projectId));
    this.contractFiles.forEach(file => fd.append('contractFiles', file));

    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.currentStep = 1;
        this.contractFiles = [];
      },
      error: (err: any) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? 'Vendor onboard failed. Please try again.';
      },
    });
  }

  private updateVendorData(): void {
    if (!this.editingVendorId) return;

    const body: any = {
      name: this.newVendor.name,
      spoc_name: this.newVendor.spoc.name,
      spoc_phone: this.newVendor.spoc.phone,
      official_email: this.newVendor.email,
      official_phone: this.newVendor.phone,
      gst_no: this.newVendor.kyc.gst?.toUpperCase() || null,
      pan_card_no: this.newVendor.kyc.pan?.toUpperCase() || null,
      physical_address: this.newVendor.address.street,
      pincode: this.newVendor.address.pincode,
      budget_allocation: parseFloat(String(this.newVendor.budget).replace(/[^0-9.]/g, '')) || 0,
      skill: this.newVendor.skill,
    };

    this.isSaving = true;
    this.vendorService.updateVendor(this.editingVendorId, body).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.isEditMode = false;
        this.editingVendorId = null;
        this.currentStep = 1;
        this.contractFiles = [];
        if (this.selectedVendor) {
          const updated = this.vendorService.getVendorById(this.selectedVendor.id);
          if (updated) this.selectedVendor = updated;
        }
      },
      error: (err: any) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? 'Update failed. Please try again.';
      },
    });
  }

  deleteVendor(id: string): void {
    if (this.isDeleting) return;
    if (!confirm('Are you sure you want to remove this vendor?')) return;
    this.isDeleting = true;
    this.vendorService.deleteVendor(id).subscribe({
      next: () => { this.isDeleting = false; },
      error: (err: any) => {
        this.isDeleting = false;
        alert('Delete failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  // ─── File Handling ────────────────────────────────────────────────────────────

  onContractFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.fileError = '';
    const MAX_SIZE = 10 * 1024 * 1024;
    const ALLOWED = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];

    const incoming = Array.from(input.files);
    const combined = [...this.contractFiles, ...incoming];

    if (combined.length > 10) { this.fileError = 'Maximum 10 files allowed.'; return; }

    for (const f of incoming) {
      if (!ALLOWED.includes(f.type)) {
        this.fileError = `"${f.name}" has an unsupported format.`; return;
      }
      if (f.size > MAX_SIZE) {
        this.fileError = `"${f.name}" exceeds the 10 MB limit (${this.getFileSize(f.size)}).`; return;
      }
    }

    this.contractFiles = combined;
    input.value = '';
  }

  removeContractFile(index: number): void {
    this.contractFiles = this.contractFiles.filter((_, i) => i !== index);
    this.fileError = '';
  }

  getFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  getFileIcon(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'picture_as_pdf';
    if (ext === 'doc' || ext === 'docx') return 'description';
    if (['jpg', 'jpeg', 'png'].includes(ext!)) return 'image';
    return 'attach_file';
  }

  getFileIconBg(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'bg-red-100 dark:bg-red-900/30';
    if (ext === 'doc' || ext === 'docx') return 'bg-blue-100 dark:bg-blue-900/30';
    if (['jpg', 'jpeg', 'png'].includes(ext!)) return 'bg-green-100 dark:bg-green-900/30';
    return 'bg-surface-container';
  }

  getFileIconColor(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'text-red-600';
    if (ext === 'doc' || ext === 'docx') return 'text-blue-600';
    if (['jpg', 'jpeg', 'png'].includes(ext!)) return 'text-green-600';
    return 'text-outline';
  }

  // ─── Invoice ──────────────────────────────────────────────────────────────────

  openSubmission(): void {
    this.invoiceForm = this.defaultInvoice();
    this.showInvoiceModal = true;
  }

  onTypeChange(item: any): void {
    if (item.type !== 'labor') item.hours = 0;
    this.calculateInvoiceTotals();
  }

  hasLaborItems(): boolean {
    return this.invoiceForm.items.some((item: any) => item.type === 'labor');
  }

  addInvoiceItem(): void {
    this.invoiceForm.items.push({
      type: '', description: '', quantity: 1, hours: 0,
      unitPrice: 0, gst: 18, gstAmount: 0, baseAmount: 0, total: 0,
    });
  }

  removeInvoiceItem(index: number): void {
    if (this.invoiceForm.items.length > 1) {
      this.invoiceForm.items.splice(index, 1);
      this.calculateInvoiceTotals();
    }
  }

  calculateInvoiceTotals(): void {
    let subtotal = 0;
    let totalGST = 0;
    const gstMap: Record<number, number> = {};

    this.invoiceForm.items.forEach((item: any) => {
      const qty = Number(item.quantity) || 0;
      const rate = Number(item.unitPrice) || 0;
      const hours = Number(item.hours) || 0;
      const gst = Number(item.gst) || 0;

      item.baseAmount = item.type === 'labor' ? qty * hours * rate : qty * rate;
      item.gstAmount = (item.baseAmount * gst) / 100;
      item.total = item.baseAmount + item.gstAmount;

      subtotal += item.baseAmount;
      totalGST += item.gstAmount;

      if (item.gstAmount > 0) {
        gstMap[gst] = (gstMap[gst] || 0) + item.gstAmount;
      }
    });

    this.invoiceForm.subtotal = subtotal;
    this.invoiceForm.taxAmount = totalGST;
    this.invoiceForm.grandTotal = subtotal + totalGST;
    this.invoiceForm.gstBreakdown = Object.entries(gstMap)
      .map(([rateStr, amount]) => ({ rate: Number(rateStr), amount }))
      .sort((a, b) => a.rate - b.rate);
  }

  submitInvoice(): void {
    if (this.isSavingInvoice || !this.selectedVendor) return;
    this.isSavingInvoice = true;

    const payload = {
      invoice_number: this.invoiceForm.number,
      invoice_date: new Date().toISOString().split('T')[0],
      items: this.invoiceForm.items,
      subtotal: this.invoiceForm.subtotal,
      tax_rate: this.invoiceForm.taxRate ?? 0,
      tax_amount: this.invoiceForm.taxAmount,
      grand_total: this.invoiceForm.grandTotal,
    };

    this.invoiceService.createInvoice(this.selectedVendor.id, payload).subscribe({
      next: () => {
        this.isSavingInvoice = false;
        this.showInvoiceModal = false;
        this.vendorService.loadStats();
      },
      error: (err: any) => {
        this.isSavingInvoice = false;
        alert('Invoice submission failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  // ─── Pay Invoice ──────────────────────────────────────────────────────────────

  payInvoice(inv: VendorInvoice): void {
    this.selectedInvoice = inv;
    this.paymentForm = {
      amount: Number(inv.grand_total) || null,
      mode: '',
      reference: '',
    };
    this.paymentError = '';
    this.isProcessingPayment = false;
    this.payInvoiceeModal = true;
  }

  closePayModal(): void {
    this.payInvoiceeModal = false;
    this.selectedInvoice = null;
    this.paymentForm = { amount: null, mode: '', reference: '' };
    this.paymentError = '';
    this.isProcessingPayment = false;
  }

  confirmPayment(): void {
    if (!this.selectedInvoice || this.isProcessingPayment) return;
    this.paymentError = '';

    if (!this.paymentForm.amount || this.paymentForm.amount <= 0) {
      this.paymentError = 'Please enter a valid amount.';
      return;
    }
    if (!this.paymentForm.mode) {
      this.paymentError = 'Please select a payment mode.';
      return;
    }

    this.isProcessingPayment = true;
    this.invoiceService.updateStatus(this.selectedInvoice.id, 'Paid').subscribe({
      next: () => {
        this.isProcessingPayment = false;
        this.closePayModal();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err: any) => {
        this.isProcessingPayment = false;
        this.paymentError = err?.error?.message ?? 'Payment failed. Please try again.';
      },
    });
  }

  openCancelInvoiceDialog(inv: VendorInvoice): void {
    this.selectedInvoice = inv;
    this.showCancelInvoiceModal = true;
  }

  closeCancelInvoiceDialog(): void {
    this.showCancelInvoiceModal = false;
    this.selectedInvoice = null;
  }

  confirmCancelInvoice(): void {
    if (!this.selectedInvoice || this.isCancellingInvoice) return;
    this.isCancellingInvoice = true;

    this.invoiceService.updateStatus(this.selectedInvoice.id, 'Rejected').subscribe({
      next: () => {
        this.isCancellingInvoice = false;
        this.closeCancelInvoiceDialog();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err: any) => {
        this.isCancellingInvoice = false;
        alert('Cancel failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  viewInvoice(inv: VendorInvoice): void {
    const vendor = this.selectedVendor;

    let invoiceItems: any[] = [];
    try {
      invoiceItems = Array.isArray(inv.items) ? inv.items : JSON.parse(inv.items as any);
    } catch {
      invoiceItems = [];
    }

    const gstMap: Record<number, number> = {};
    invoiceItems.forEach((item: any) => {
      const gstRate = Number(item.gst) || 0;
      const gstAmt = Number(item.gstAmount) || 0;
      if (gstAmt > 0) {
        gstMap[gstRate] = (gstMap[gstRate] || 0) + gstAmt;
      }
    });

    const taxBreakdownRows = Object.entries(gstMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([rate, amount]) =>
        `<div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
          <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
          <span style="font-weight:600;">₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
        </div>`
      ).join('');

    const hasLabor = invoiceItems.some((item: any) => item.type === 'labor');

    const itemRows = invoiceItems.map((item: any) => {
      const isLabor = item.type === 'labor';
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.type || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.description || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 0}</td>
        ${hasLabor ? `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${isLabor ? (item.hours || 0) + 'h' : ''}</td>` : ''}
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.unitPrice || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.gst || 0}%</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.gstAmount || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">₹${Number(item.total || 0).toLocaleString('en-IN')}</td>
      </tr>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Invoice ${inv.invoice_number}</title>
  <style>
    body { font-family: sans-serif; padding: 40px; color: #1e293b; }
    h1 { font-size: 24px; font-weight: 900; margin: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
    @media print { button { display: none !important; } }
  </style>
</head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <div>
      <h1>Tax Invoice</h1>
      <p style="color:#64748b;margin:4px 0 0;">${vendor?.name ?? ''}</p>
    </div>
    <div style="text-align:right;">
      <p style="font-weight:900;font-size:18px;margin:0;">${inv.invoice_number}</p>
      <p style="color:#64748b;margin:4px 0 0;">${inv.invoice_date}</p>
      <span style="display:inline-block;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;
        background:${inv.status === 'Paid' ? '#dcfce7' : inv.status === 'Rejected' ? '#fee2e2' : '#fef3c7'};
        color:${inv.status === 'Paid' ? '#15803d' : inv.status === 'Rejected' ? '#dc2626' : '#b45309'};margin-top:6px;">
        ${inv.status}
      </span>
    </div>
  </div>
  ${vendor ? `
  <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
    <p style="margin:0;font-weight:700;">Bill To: ${vendor.name}</p>
    <p style="margin:4px 0 0;color:#64748b;">${vendor.address?.street || ''} ${vendor.address?.pincode || ''}</p>
    <p style="margin:4px 0 0;color:#64748b;">GST: ${vendor.kyc?.gst || '—'} | PAN: ${vendor.kyc?.pan || '—'}</p>
  </div>` : ''}
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
        <th style="text-align:center;">Qty</th>
        ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ''}
        <th style="text-align:right;">Rate (₹)</th>
        <th style="text-align:center;">Tax %</th>
        <th style="text-align:right;">Tax (₹)</th>
        <th style="text-align:right;">Total (₹)</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>
  <div style="margin-top:24px;max-width:340px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Subtotal (excl. Tax)</span>
      <span style="font-weight:700;">₹${Number(inv.subtotal).toLocaleString('en-IN')}</span>
    </div>
    ${taxBreakdownRows}
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Total Tax</span>
      <span style="font-weight:700;">₹${Number(inv.tax_amount).toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:12px 0;">
      <span style="font-weight:900;">Grand Total</span>
      <span style="color:#4f46e5;font-size:18px;font-weight:900;">₹${Number(inv.grand_total).toLocaleString('en-IN')}</span>
    </div>
  </div>
  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()"
      style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }

  // ─── Billing ──────────────────────────────────────────────────────────────────

  openBilling(): void {
    if (this.selectedVendor && this.invoices.length === 0) {
      this.invoiceService.loadInvoices(this.selectedVendor.id);
    }
    this.showBillingModal = true;
  }

  get totalBilled(): number {
    return this.invoices.reduce((acc, inv) => acc + Number(inv.grand_total), 0);
  }

  // ─── Audit ────────────────────────────────────────────────────────────────────

  openAudit(): void {
    const latest = this.vendorAudits[0];
    this.auditForm = latest
      ? {
        quality: Number(latest.quality),
        timeliness: Number(latest.timeliness),
        safety: Number(latest.safety),
        observations: latest.observations ?? '',
      }
      : { quality: 5, timeliness: 5, safety: 5, observations: '' };
    this.showAuditModal = true;
  }

  get auditScore(): number {
    return Math.round(
      ((this.auditForm.quality + this.auditForm.timeliness + this.auditForm.safety) / 30) * 100
    );
  }

  submitAudit(): void {
    if (this.isSavingAudit || !this.selectedVendor) return;
    this.isSavingAudit = true;
    this.auditService.createAudit(this.selectedVendor.id, {
      quality: this.auditForm.quality,
      timeliness: this.auditForm.timeliness,
      safety: this.auditForm.safety,
      observations: this.auditForm.observations,
    }).subscribe({
      next: (res: any) => {
        this.isSavingAudit = false;
        this.showAuditModal = false;
        if (this.selectedVendor && res.data?.composite_score != null) {
          this.selectedVendor.compliance_score = Math.round(res.data.composite_score);
        }
        this.vendorService.loadVendors();
      },
      error: (err: any) => {
        this.isSavingAudit = false;
        alert('Audit failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  openVendorDetailData(): void {
    this.showVendorDetailModal = true;
  }

  // ─── Vendor Status ────────────────────────────────────────────────────────────

  updateVendorStatus(status: string): void {
    if (!this.selectedVendor) return;
    const statusKey = status.toLowerCase() as 'active' | 'pending' | 'inactive';
    this.vendorService.updateVendor(this.selectedVendor.id, { status: statusKey }).subscribe({
      next: () => {
        const updated = this.vendorService.getVendorById(this.selectedVendor!.id);
        if (updated) this.selectedVendor = updated;
      },
      error: (err: any) => alert('Status update failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

  // ─── Labor Modal ─────────────────────────────────────────────────────────────

  openLaborModal(): void {
    if (!this.selectedVendor) return;
    this.newLabor = this.defaultLabor();
    this.showAddLaborForm = false;
    this.laborError = '';
    this.editingLaborId = null;
    this.laborService.loadLaborForVendor(this.selectedVendor.id);
    this.showLaborModal = true;
  }

  closeLaborModal(): void {
    this.showLaborModal = false;
    this.showAddLaborForm = false;
    this.editingLaborId = null;
  }

  toggleAddLaborForm(): void {
    this.newLabor = this.defaultLabor();
    this.laborError = '';
    this.editingLaborId = null;
    this.showAddLaborForm = !this.showAddLaborForm;
  }

  submitLabor(): void {
    if (this.isSavingLabor || !this.selectedVendor) return;
    this.laborError = '';

    if (!this.newLabor.skill) {
      this.laborError = 'Skill is required.';
      return;
    }

    const laborCount = Math.max(1, parseInt(this.newLabor.labor_count) || 1);
    const payload = {
      vendor_id: this.selectedVendor.id,
      skill: this.newLabor.skill,
      status: this.newLabor.status || 'active',
      daily_rate: parseFloat(this.newLabor.daily_rate) || 0,
      labor_count: laborCount,
    };

    this.isSavingLabor = true;
    this.laborService.addWorker(payload).subscribe({
      next: () => {
        this.isSavingLabor = false;
        this.showAddLaborForm = false;
        this.newLabor = this.defaultLabor();
      },
      error: (err: any) => {
        this.isSavingLabor = false;
        this.laborError = err?.error?.message ?? 'Failed to add worker.';
      },
    });
  }

  editLaborWorker(id: number): void {
    const worker = this.laborWorkers.find(w => w.id === id);
    if (!worker) return;
    this.editingLaborId = id;
    this.editLaborForm = {
      skill: worker.skillRaw,
      status: worker.status,
      daily_rate: worker.daily_rate,
      labor_count: worker.labor_count,
    };
  }

  saveLaborEdit(id: number): void {
    const payload = {
      skill: this.editLaborForm.skill,
      status: this.editLaborForm.status,
      daily_rate: parseFloat(this.editLaborForm.daily_rate) || 0,
      labor_count: Math.max(1, parseInt(this.editLaborForm.labor_count) || 1),
    };
    this.laborService.updateWorker(id, payload).subscribe({
      next: () => { this.editingLaborId = null; },
      error: (err: any) => alert('Update failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

  cancelLaborEdit(): void {
    this.editingLaborId = null;
  }

  deleteLaborWorker(id: number): void {
    if (!confirm('Remove this worker?')) return;
    this.laborService.deleteWorker(id).subscribe({
      error: (err: any) => alert('Delete failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

  updateLaborStatus(worker: LaborWorker, status: string): void {
    this.laborService.updateWorker(worker.id, { status }).subscribe();
  }

  // ─── Tasks ────────────────────────────────────────────────────────────────────

  updateTaskStatus(task: any, statusRaw: string): void {
    this.projectService.updateTask(task.id, { status: statusRaw }).subscribe();
  }

  deleteTask(taskId: number): void {
    if (!confirm('Remove this task?')) return;
    this.projectService.deleteTask(taskId).subscribe({
      error: (err: any) => alert('Delete failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

  // ─── UI Helpers ──────────────────────────────────────────────────────────────

  getSkillBarWidth(count: number): number {
    const max = Math.max(...this.laborStats.skillComposition.map(s => s.count), 1);
    return Math.round((count / max) * 100);
  }

  getSkillBarColor(skill: string): string {
    const colors: Record<string, string> = {
      'Masonry': 'bg-blue-500',
      'Electrical': 'bg-yellow-500',
      'Structural Steel': 'bg-red-500',
      'Plumbing': 'bg-green-500',
      'HVAC': 'bg-purple-500',
      'Carpentry': 'bg-orange-400',
      'Painting': 'bg-pink-400',
      'Other': 'bg-slate-400',
    };
    return colors[skill] ?? 'bg-slate-400';
  }

  getTaskStatusColor(status: string): string {
    const map: Record<string, string> = {
      'completed': 'bg-green-100 text-green-700',
      'in_progress': 'bg-blue-100 text-blue-700',
      'pending': 'bg-amber-100 text-amber-700',
      'on_hold': 'bg-slate-100 text-slate-500',
    };
    // Case-insensitive match
    return map[status?.toLowerCase()] ?? 'bg-slate-100 text-slate-500';
  }

  // ─── Defaults ────────────────────────────────────────────────────────────────

  private defaultVendor() {
    return {
      name: '', email: '', phone: '',
      spoc: { name: '', phone: '' },
      kyc: { gst: '', pan: '' },
      address: { street: '', pincode: '' },
      budget: '', skill: '',
    };
  }

  private defaultInvoice() {
    return {
      number: 'INV-' + Math.floor(Math.random() * 9000 + 1000),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: [{
        type: '', description: '', quantity: 1, hours: 0,
        unitPrice: 0, gst: 18, baseAmount: 0, gstAmount: 0, total: 0,
      }],
      subtotal: 0, taxAmount: 0, taxRate: 0, grandTotal: 0,
      gstBreakdown: [] as { rate: number; amount: number }[],
    };
  }

  private defaultLabor() {
    return { skill: '', status: 'active', daily_rate: '', labor_count: 1 };
  }
}