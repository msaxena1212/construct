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
import { IProjectTask, IUser } from '../../shared/interfaces/project.interface';
@Component({
  selector: 'app-vendors',
  standalone: false,
  templateUrl: './vendors.html',
  styleUrl: './vendors.scss',
})
export class Vendors implements OnInit {
  @Input() projectId: string | number = '';
  allTasks: IProjectTask[] = [];
  skillOptions: any[] = [];
  private vendorService = inject(VendorsServices);
  private laborService = inject(VendorsLaborServices);
  private invoiceService = inject(VendorInvoiceService);
  private auditService = inject(VendorAuditService);
  private skillMasterService = inject(SkillMasterServices);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
  isSavingAudit = false;
  isSavingInvoice = false;
  errorMsg = '';
  laborError = '';

  viewingVendorId: string | null = null;
  selectedVendor: Vendor | undefined = undefined;
  vendors: Vendor[] = [];
  stats: VendorStats = { totalActive: 0, pendingPayments: '₹0', compliantPartners: '0%' };
  activities: Activity[] = [];

  // Labour
  laborWorkers: LaborWorker[] = [];
  laborStats: LaborStats = {
    totalPersonnel: 0, onSite: 0, remaining: 0,
    activePersonnel: 0, skillCompliance: '0%', skillComposition: [],
  };
  laborLoading = false;

  invoices: VendorInvoice[] = [];

  vendorAudits: VendorAudit[] = [];

  // Forms
  newLabor: any = this.defaultLabor();
  newVendor: any = this.defaultVendor();
  contractFile: File | null = null;
  invoiceForm: any = this.defaultInvoice();
  auditForm: any = { quality: 5, timeliness: 5, safety: 5, observations: '' };

  readonly statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'on_site', label: 'On Site' },
    { value: 'off_duty', label: 'Off Duty' },
    { value: 'inactive', label: 'Inactive' },
  ];

  readonly sumRate = (acc: number, w: LaborWorker): number =>
    acc + (Number(w.daily_rate) || 0);

  ngOnInit(): void {
     this.projectService.getProjectTasks(this.projectId).subscribe((res: any) => {
      this.allTasks = res.data;
      console.log(this.allTasks, 'NNNNNNNNNNNNNNNNNNNN')
    });
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      this.syncSelectedVendor();
    });
    this.vendorService.stats$.subscribe(s => (this.stats = s));
    this.vendorService.activities$.subscribe(a => (this.activities = a));

    this.laborService.workers$.subscribe(w => (this.laborWorkers = w));
    this.laborService.stats$.subscribe(s => (this.laborStats = s));
    this.laborService.loading$.subscribe(l => (this.laborLoading = l));

    this.invoiceService.invoices$.subscribe(inv => { this.invoices = inv; });

    this.auditService.audits$.subscribe(audits => { this.vendorAudits = audits; });

    this.route.paramMap.subscribe(params => {
      this.viewingVendorId = params.get('id');
      this.syncSelectedVendor();
    });
    this.getSkill();
    // this.getProjectTasks();
  }

  getSkill(): void {
    this.skillMasterService.loadSkills().subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data)) {
          this.skillOptions = res.data.map((s: any) => ({
            value: s.skill_name?.toLowerCase().replace(/\s+/g, '_') ?? s.id,
            label: s.skill_name ?? s.name,
          }));
        }
      },
    });
  }
// getProjectTasks() {
//   console.log('getProjectTasks called');
//   console.log('Calling API with:', this.projectId);

//   this.projectService.getProjectTasks(this.projectId).subscribe({
//     next: (res: any) => {
//       console.log('API Response:', res);
//       this.allTasks = res.data || [];
//     },
//     error: (err) => {
//       console.error('Task load failed', err);
//     }
//   });

// }
  private syncSelectedVendor(): void {
    if (!this.viewingVendorId) { this.selectedVendor = undefined; return; }
    const local = this.vendorService.getVendorById(this.viewingVendorId);
    if (local) {
      this.selectedVendor = local;
      this.loadVendorSubData(this.viewingVendorId);
    } else {
      this.vendorService.getVendorByIdFromApi(this.viewingVendorId).subscribe({
        next: v => { this.selectedVendor = v; this.loadVendorSubData(this.viewingVendorId!); },
        error: () => this.router.navigate(['/master/resources/vendors']),
      });
    }
  }

  private loadVendorSubData(vendorId: string): void {
    this.invoiceService.loadInvoices(vendorId);
    this.auditService.loadAudits(vendorId);
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
    this.invoiceService.clearInvoices();
    this.auditService.clearAudits();
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
      next: () => { this.isSaving = false; this.showAddModal = false; },
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
      error: err => { this.isDeleting = false; alert('Delete failed: ' + (err?.error?.message ?? 'Server error')); },
    });
  }


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
    this.invoiceForm.items.push({ type: '', description: '', quantity: 1, hours: 0, unitPrice: 0, total: 0 });
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
      const qty = Number(item.quantity) || 0;
      const rate = Number(item.unitPrice) || 0;
      const hours = Number(item.hours) || 0;
      item.total = item.type === 'labor' ? qty * hours * rate : qty * rate;
      subtotal += item.total;
    });
    this.invoiceForm.subtotal = subtotal;
    this.invoiceForm.taxAmount = Math.round((subtotal * this.invoiceForm.taxRate) / 100);
    this.invoiceForm.grandTotal = subtotal + this.invoiceForm.taxAmount;
  }

  submitInvoice(): void {
    if (this.isSavingInvoice || !this.selectedVendor) return;
    this.isSavingInvoice = true;

    const payload = {
      invoice_number: this.invoiceForm.number,
      invoice_date: new Date().toISOString().split('T')[0],
      items: this.invoiceForm.items,
      subtotal: this.invoiceForm.subtotal,
      tax_rate: this.invoiceForm.taxRate,
      tax_amount: this.invoiceForm.taxAmount,
      grand_total: this.invoiceForm.grandTotal,
    };

    this.invoiceService.createInvoice(this.selectedVendor.id, payload).subscribe({
      next: () => {
        this.isSavingInvoice = false;
        this.showInvoiceModal = false;
        this.vendorService.loadStats();
      },
      error: err => {
        this.isSavingInvoice = false;
        alert('Invoice submission failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }


  viewInvoice(inv: VendorInvoice): void {
    const vendor = this.selectedVendor;
    let invoiceItems: any[] = [];

    try {

      if (Array.isArray(inv.items)) {
        invoiceItems = inv.items;
      } else if (typeof inv.items === 'string') {
        invoiceItems = JSON.parse(inv.items);
      }

    } catch (e) {

      console.error('Invalid invoice items', e);
      invoiceItems = [];

    }
    const itemRows = invoiceItems.map((item: any) =>
      `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.type || '-'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.description || '-'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 0}</td>
        ${item.type === 'labor' ? `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.hours || 0}h</td>` : '<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">—</td>'}
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.unitPrice || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">₹${Number(item.total || 0).toLocaleString('en-IN')}</td>
      </tr>`
    ).join('');

    const html = `<!DOCTYPE html><html><head><title>Invoice ${inv.invoice_number}</title>
    <style>body{font-family:sans-serif;padding:40px;color:#1e293b;}
    h1{font-size:24px;font-weight:900;}
    table{width:100%;border-collapse:collapse;margin-top:16px;}
    th{background:#f1f5f9;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;}
    .total-row{font-weight:900;font-size:16px;}
    @media print{button{display:none!important;}}
    </style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div><h1>Tax Invoice</h1><p style="color:#64748b;margin:0;">${vendor?.name ?? ''}</p></div>
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
    ${vendor ? `<div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
      <p style="margin:0;font-weight:700;">Bill To: ${vendor.name}</p>
      <p style="margin:4px 0 0;color:#64748b;">${vendor.address?.street || ''} ${vendor.address?.pincode || ''}</p>
      <p style="margin:4px 0 0;color:#64748b;">GST: ${vendor.kyc?.gst || ''} | PAN: ${vendor.kyc?.pan || ''}</p>
    </div>` : ''}
    <table><thead><tr>
      <th>Type</th><th>Description</th><th style="text-align:center;">Qty</th>
      <th style="text-align:center;">Hours</th>
      <th style="text-align:right;">Rate</th><th style="text-align:right;">Total</th>
    </tr></thead><tbody>${itemRows}</tbody></table>
    <div style="margin-top:24px;max-width:320px;margin-left:auto;">
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
        <span style="color:#64748b;">Subtotal</span>
        <span style="font-weight:700;">₹${Number(inv.subtotal).toLocaleString('en-IN')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
        <span style="color:#64748b;">GST (${inv.tax_rate}%)</span>
        <span style="font-weight:700;">₹${Number(inv.tax_amount).toLocaleString('en-IN')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:12px 0;" class="total-row">
        <span>Grand Total</span>
        <span style="color:#4f46e5;font-size:18px;">₹${Number(inv.grand_total).toLocaleString('en-IN')}</span>
      </div>
    </div>
    <div style="margin-top:32px;text-align:center;">
      <button onclick="window.print()"
        style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;
               font-weight:700;font-size:14px;cursor:pointer;">
        Print / Save as PDF
      </button>
    </div>
    </body></html>`;

    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }


  openBilling(): void {
    if (this.selectedVendor && this.invoices.length === 0) {
      this.invoiceService.loadInvoices(this.selectedVendor.id);
    }
    this.showBillingModal = true;
  }

  get totalBilled(): number {
    return this.invoices.reduce((acc, inv) => acc + Number(inv.grand_total), 0);
  }

  openAudit(): void {
    const latest = this.vendorAudits[0];
    if (latest) {
      this.auditForm = {
        quality: Number(latest.quality),
        timeliness: Number(latest.timeliness),
        safety: Number(latest.safety),
        observations: latest.observations ?? '',
      };
    } else {
      this.auditForm = { quality: 5, timeliness: 5, safety: 5, observations: '' };
    }
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
      next: (res) => {
        this.isSavingAudit = false;
        this.showAuditModal = false;
        if (this.selectedVendor && res.data?.composite_score != null) {
          this.selectedVendor.compliance_score = Math.round(res.data.composite_score);
        }
        this.vendorService.loadVendors();
      },
      error: err => {
        this.isSavingAudit = false;
        alert('Audit submission failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }


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

    if (!this.newLabor.skill) {
      this.laborError = 'Skill is required.';
      return;
    }

    const payload = {
      company_id: this.selectedVendor.company_id,
      vendor_id: this.selectedVendor.id,
      skill: this.newLabor.skill,
      status: this.newLabor.status || 'active',
      daily_rate: parseFloat(this.newLabor.daily_rate) || 0,
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


  updateTaskStatus(task: any, statusRaw: string): void {
    this.projectService.updateTask(task.id, { status: statusRaw }).subscribe();
  }

  deleteTask(taskId: number): void {
    if (!confirm('Remove this task?')) return;
    this.projectService.deleteTask(taskId).subscribe({
      error: err => alert('Delete failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

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
      'Completed': 'bg-green-100 text-green-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'Pending': 'bg-amber-100 text-amber-700',
      'On Hold': 'bg-slate-100 text-slate-500',
    };
    return map[status] ?? 'bg-slate-100 text-slate-500';
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
      items: [{ type: '', description: '', quantity: 1, hours: 0, unitPrice: 0, total: 0 }],
      taxRate: 18,
      taxAmount: 0,
      subtotal: 0,
      grandTotal: 0,
    };
  }

  private defaultLabor() {
    return { skill: '', status: 'active', daily_rate: '', current_task: '' };
  }
}