import { Component, OnInit, HostListener, inject } from '@angular/core';
import { VendorsServices, Vendor } from '../../vendors/services/vendors-services';
import { VendorInvoiceService, VendorInvoice } from '../../vendors/services/vendors-invoice-services';
import { VendorAuditService, VendorAudit } from '../../vendors/services/vendors-audit-services';
import { VendorsLaborServices, LaborWorker, LaborStats } from '../../vendors/services/vendors-labor-services';
import { ProjectService } from '../../projects/services/project-service';
import { IProjectTask } from '../../../shared/interfaces/project.interface';

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface ResolvedSettlement {
  type: string;
  completion: number | null;
  milestoneNames: string[];
  subMilestoneNames: string[];
  taskNames: string[];
}

interface MilestoneNode {
  id: number | string;
  name?: string;
  title?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  parent_id?: number | string | null;
  milestone_progress?: number | null;
  progress?: number | null;
  children?: MilestoneNode[];
}

interface TaskWithSubtasks extends IProjectTask {
  subtasks?: any[];
  start_date?: string;
  end_date?: string;
  due_date?: string;
}

/** A single row in the merged, chronological activity feed. */
interface HistoryEvent {
  id: string;
  vendorId: string;
  vendorName: string;
  date: Date;
  icon: string;
  iconBg: string;
  iconColor: string;
  description: string;
  /** Optional quick action (e.g. open invoice print view) */
  viewAction?: () => void;
}

interface VendorRecord {
  vendor: Vendor;
  loaded: boolean;
  loading: boolean;
  tasks: TaskWithSubtasks[];
  invoices: VendorInvoice[];
  audits: VendorAudit[];
  laborWorkers: LaborWorker[];
  laborStats: LaborStats;
  projectData: any;
  milestones: MilestoneNode[];
  milestoneMap: Record<number, string>;
  subMilestoneMap: Record<number, string>;
  taskMap: Record<number, string>;
  totalBilled: number;
  totalPaid: number;
  totalDailyLaborCost: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-vendors-history',
  standalone: false,
  templateUrl: './vendors-history.html',
  styleUrl: './vendors-history.scss',
})
export class VendorsHistory implements OnInit {

  private vendorService = inject(VendorsServices);
  private invoiceService = inject(VendorInvoiceService);
  private auditService = inject(VendorAuditService);
  private laborService = inject(VendorsLaborServices);
  private projectService = inject(ProjectService);

  // ── State ─────────────────────────────────────────────────────────────────
  vendors: Vendor[] = [];
  exporting = false;

  records: Record<string, VendorRecord> = {};

  Math = Math;

  // ── Multi-Select Dropdown State ───────────────────────────────────────────
  /**
   * Set of vendor IDs currently selected via the header dropdown.
   * When size === 0 → empty state (no vendors selected).
   * When size === vendors.length → "All Vendors" selected.
   */
  selectedVendorIds: Set<string> = new Set();
  vendorDropdownOpen = false;
  dropdownSearch = '';

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;

      // First load par kuch bhi auto select nahi karna
      this.selectedVendorIds = new Set();
    });

    if (this.vendorService.getVendors().length === 0) {
      this.vendorService.loadVendors();
    } else {
      this.vendors = this.vendorService.getVendors();

      // First load par empty state
      this.selectedVendorIds = new Set();
    }
  }

  // ── Close dropdown on outside click ──────────────────────────────────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.vendorDropdownOpen && !target.closest('[data-dropdown="vendor"]')) {
      this.vendorDropdownOpen = false;
    }
  }

  // ── Dropdown Computed ──────────────────────────────────────────────────────
  /** Label shown on the dropdown button */
  get vendorDropdownLabel(): string {
    if (this.selectedVendorIds.size === 0) return 'Select Vendors';
    if (this.isAllSelected) return 'All Vendors';
    if (this.selectedVendorIds.size === 1) {
      const id = [...this.selectedVendorIds][0];
      return this.vendors.find(v => v.id === id)?.name ?? '1 Vendor';
    }
    return `${this.selectedVendorIds.size} Vendors`;
  }

  /** True when all vendors are selected */
  get isAllSelected(): boolean {
    return this.vendors.length > 0 && this.selectedVendorIds.size === this.vendors.length;
  }

  /** True when some (but not all) vendors are selected */
  get isPartiallySelected(): boolean {
    return this.selectedVendorIds.size > 0 && !this.isAllSelected;
  }

  /** True when exactly one vendor is selected (used to hide vendor badges in the feed) */
  get isSingleVendorSelected(): boolean {
    return this.selectedVendorIds.size === 1;
  }

  /** Array form of selectedVendorIds for *ngFor */
  get selectedVendorIdsArray(): string[] {
    return [...this.selectedVendorIds];
  }

  /** Vendors shown inside the dropdown (filtered by dropdownSearch) */
  get dropdownFilteredVendors(): Vendor[] {
    if (!this.dropdownSearch.trim()) return this.vendors;
    const term = this.dropdownSearch.trim().toLowerCase();
    return this.vendors.filter(
      v =>
        v.name.toLowerCase().includes(term) ||
        v.email.toLowerCase().includes(term) ||
        v.skill.some(s => s.toLowerCase().includes(term))
    );
  }

  // ── Dropdown Actions ──────────────────────────────────────────────────────
  toggleVendorDropdown(): void {
    this.vendorDropdownOpen = !this.vendorDropdownOpen;
    if (this.vendorDropdownOpen) this.dropdownSearch = '';
  }

  toggleSelectAll(): void {
    if (this.isAllSelected) {
      // Deselect all
      this.selectedVendorIds = new Set();
    } else {
      // Select all and load their records
      this.selectedVendorIds = new Set(this.vendors.map(v => v.id));
      this.vendors.forEach(v => {
        if (!this.records[v.id]?.loaded) {
          this.loadVendorRecord(v);
        }
      });
    }
  }

  toggleVendorSelection(vendor: Vendor): void {
    const newSet = new Set(this.selectedVendorIds);
    if (newSet.has(vendor.id)) {
      newSet.delete(vendor.id);
    } else {
      newSet.add(vendor.id);
      // Auto-load record when selected — history dikhane ke liye turant chahiye
      if (!this.records[vendor.id]?.loaded) {
        this.loadVendorRecord(vendor);
      }
    }
    this.selectedVendorIds = newSet;
  }

  removeVendorSelection(id: string): void {
    const newSet = new Set(this.selectedVendorIds);
    newSet.delete(id);
    this.selectedVendorIds = newSet;
  }

  clearAllSelections(): void {
    this.selectedVendorIds = new Set();
  }

  getVendorNameById(id: string): string {
    return this.vendors.find(v => v.id === id)?.name ?? id;
  }

  // ── Computed Stats ────────────────────────────────────────────────────────
  get activeCount(): number {
    return this.vendors.filter(v => v.status.toLowerCase() === 'active').length;
  }

  get pendingCount(): number {
    return this.vendors.filter(v => v.status.toLowerCase() === 'pending').length;
  }

  get inactiveCount(): number {
    return this.vendors.filter(v => v.status.toLowerCase() === 'inactive').length;
  }

  /**
   * Vendors shown in the main content area — only those checked in dropdown.
   */
  get displayVendors(): Vendor[] {
    if (this.selectedVendorIds.size === 0) return [];
    return this.vendors.filter(v => this.selectedVendorIds.has(v.id));
  }

  get displayTotalInvoices(): number {
    return this.displayVendors.reduce(
      (sum, v) => sum + (this.records[v.id]?.invoices.length || 0), 0
    );
  }

  get displayTotalBilled(): number {
    return this.displayVendors.reduce(
      (sum, v) => sum + (this.records[v.id]?.totalBilled || 0), 0
    );
  }

  get displayTotalPaid(): number {
    return this.displayVendors.reduce(
      (sum, v) => sum + (this.records[v.id]?.totalPaid || 0), 0
    );
  }

  // ── Merged Activity Timeline ─────────────────────────────────────────────

  /** True while any of the currently selected vendors' records are still loading */
  get isTimelineLoading(): boolean {
    return this.displayVendors.some(v => !this.records[v.id] || this.records[v.id].loading);
  }

  /**
   * Single, merged, chronological (newest first) activity feed across ALL
   * currently selected vendors. This is what directly renders the moment a
   * vendor is selected — no expand/click-a-tab step needed.
   */
  get timelineEvents(): HistoryEvent[] {
    const events: HistoryEvent[] = [];
    this.displayVendors.forEach(v => {
      const rec = this.records[v.id];
      if (rec?.loaded) {
        events.push(...this.buildVendorEvents(rec));
      }
    });
    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  private addEvent(
    events: HistoryEvent[],
    vendor: Vendor,
    rawDate: any,
    icon: string,
    iconBg: string,
    iconColor: string,
    description: string,
    idSuffix: string,
    viewAction?: () => void
  ): void {
    if (!rawDate) return;
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return;
    events.push({
      id: `${vendor.id}-${idSuffix}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      date: d,
      icon, iconBg, iconColor,
      description,
      viewAction,
    });
  }

  private buildVendorEvents(rec: VendorRecord): HistoryEvent[] {
    const v = rec.vendor;
    const events: HistoryEvent[] = [];

    // Vendor onboarded
    this.addEvent(events, v, v.created_at, 'person_add', 'bg-indigo-100', 'text-indigo-600',
      `${v.name} was onboarded as a vendor.`, 'onboard');

    // Profile updated (only if different from creation)
    const updatedAt = (v as any).updated_at;
    if (updatedAt && updatedAt !== v.created_at) {
      this.addEvent(events, v, updatedAt, 'edit', 'bg-slate-100', 'text-slate-600',
        `Vendor profile of ${v.name} was updated.`, 'profile-update');
    }

    // Invoices + Payments
    rec.invoices.forEach(inv => {
      if (inv.status === 'Cancelled') {
        this.addEvent(events, v, inv.invoice_date, 'cancel', 'bg-red-100', 'text-red-600',
          `Invoice ${inv.invoice_number} for ${v.name} was cancelled.`, `inv-cancel-${inv.id}`,
          () => this.viewInvoice(rec, inv));
      } else {
        this.addEvent(events, v, inv.invoice_date, 'receipt_long', 'bg-amber-100', 'text-amber-600',
          `Invoice ${inv.invoice_number} worth ${this.formatAmount(inv.grand_total)} was generated for ${v.name}.`,
          `inv-${inv.id}`, () => this.viewInvoice(rec, inv));
      }

      (inv.payment_history || []).forEach((p: any, idx: number) => {
        this.addEvent(events, v, p.paid_at, 'payments', 'bg-green-100', 'text-green-600',
          `Payment of ${this.formatAmount(p.amount)} was received from ${v.name} against Invoice ${inv.invoice_number}.`,
          `pay-${inv.id}-${idx}`, () => this.viewInvoice(rec, inv));
      });
    });

    // Compliance Audits
    rec.audits.forEach(a => {
      this.addEvent(events, v, a.audit_date || a.createdAt, 'fact_check', 'bg-emerald-100', 'text-emerald-600',
        `Compliance audit for ${v.name} was completed with a score of ${Math.round(Number(a.composite_score))}%.`,
        `audit-${a.id}`);
    });

    // Tasks (best-effort date: updated_at → due_date → start_date → createdAt)
    rec.tasks.forEach((t: any) => {
      const taskDate = t.updated_at || t.due_date || t.start_date || t.createdAt;
      this.addEvent(events, v, taskDate, 'checklist', 'bg-blue-100', 'text-blue-600',
        `Task "${t.title}" for ${v.name} is currently ${this.humanizeStatus(t.status)}.`,
        `task-${t.id}`);
    });

    // Milestones + Sub-milestones
    rec.milestones.forEach(m => {
      const mDate = (m as any).updated_at || m.end_date || m.start_date;
      const progress = m.milestone_progress ?? m.progress;
      this.addEvent(events, v, mDate, 'flag', 'bg-purple-100', 'text-purple-600',
        progress != null
          ? `Milestone "${m.name || m.title}" for ${v.name} is at ${progress}% completion.`
          : `Milestone "${m.name || m.title}" for ${v.name} is ${this.humanizeStatus(m.status)}.`,
        `milestone-${m.id}`);

      (m.children || []).forEach(c => {
        const cDate = (c as any).updated_at || c.end_date || c.start_date;
        this.addEvent(events, v, cDate, 'subdirectory_arrow_right', 'bg-purple-50', 'text-purple-500',
          `Sub-milestone "${c.name || c.title}" for ${v.name} is ${this.humanizeStatus(c.status)}.`,
          `sub-milestone-${c.id}`);
      });
    });

    // Labor
    rec.laborWorkers.forEach(w => {
      const wDate = (w as any).updated_at || (w as any).created_at || v.created_at;
      this.addEvent(events, v, wDate, 'engineering', 'bg-teal-100', 'text-teal-600',
        `${w.labor_count} worker(s) for "${w.skill}" were assigned to ${v.name}.`,
        `labor-${w.id}`);
    });

    // Documents
    (v.contract_files || []).forEach((file, idx) => {
      this.addEvent(events, v, updatedAt || v.created_at, 'description', 'bg-slate-100', 'text-slate-600',
        `Document "${this.getFileName(file)}" was uploaded for ${v.name}.`,
        `doc-${idx}`);
    });

    return events;
  }

  private humanizeStatus(status: unknown): string {
    return String(status ?? 'pending').replace(/_/g, ' ');
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  // ── Load Record ───────────────────────────────────────────────────────────
  private loadVendorRecord(vendor: Vendor): Promise<VendorRecord> {
    return new Promise(resolve => {
      const rec: VendorRecord = {
        vendor,
        loaded: false,
        loading: true,
        tasks: [],
        invoices: [],
        audits: [],
        laborWorkers: [],
        laborStats: {
          totalPersonnel: 0, onSite: 0, remaining: 0,
          activePersonnel: 0, skillCompliance: '0%', skillComposition: [],
        },
        projectData: null,
        milestones: [],
        milestoneMap: {},
        subMilestoneMap: {},
        taskMap: {},
        totalBilled: 0,
        totalPaid: 0,
        totalDailyLaborCost: 0,
      };
      this.records = { ...this.records, [vendor.id]: rec };

      let pending = vendor.project_id ? 5 : 3;
      const finish = () => {
        pending--;
        if (pending <= 0) {
          rec.loaded = true;
          rec.loading = false;
          this.computeTotals(rec);
          this.records = { ...this.records, [vendor.id]: { ...rec } };
          resolve(rec);
        }
      };

      // ── Invoices ─────────────────────────────────────────────────────────
      this.invoiceService.loadInvoices(vendor.id);
      const invSub = this.invoiceService.invoices$.subscribe(invs => {
        rec.invoices = [...invs];
        this.computeTotals(rec);
      });
      setTimeout(() => { invSub.unsubscribe(); finish(); }, 500);

      // ── Audits ───────────────────────────────────────────────────────────
      this.auditService.loadAudits(vendor.id);
      const audSub = this.auditService.audits$.subscribe(auds => { rec.audits = [...auds]; });
      setTimeout(() => { audSub.unsubscribe(); finish(); }, 500);

      // ── Labor ─────────────────────────────────────────────────────────────
      this.laborService.loadLaborForVendor(vendor.id);
      const laborSub = this.laborService.workers$.subscribe(w => { rec.laborWorkers = [...w]; this.computeTotals(rec); });
      const statsSub = this.laborService.stats$.subscribe(s => { rec.laborStats = { ...s }; });
      setTimeout(() => { laborSub.unsubscribe(); statsSub.unsubscribe(); finish(); }, 500);

      // ── Project & Tasks (only if linked) ─────────────────────────────────
      if (vendor.project_id) {
        this.projectService.getProjectById(vendor.project_id).subscribe({
          next: (res: any) => {
            rec.projectData = res?.data ?? null;
            this.buildMilestoneMaps(rec);
            this.records = { ...this.records, [vendor.id]: { ...rec } };
            finish();
          },
          error: () => { rec.projectData = null; finish(); },
        });

        this.projectService.getProjectTasks(vendor.project_id).subscribe({
          next: (res: any) => {
            rec.tasks = res?.data || [];
            this.buildTaskMap(rec);
            this.records = { ...this.records, [vendor.id]: { ...rec } };
            finish();
          },
          error: () => { rec.tasks = []; finish(); },
        });
      }
    });
  }

  // ── Build Maps ────────────────────────────────────────────────────────────
  private buildMilestoneMaps(rec: VendorRecord): void {
    const withChild: MilestoneNode[] = Array.isArray(rec.projectData?.milestones_with_child)
      ? rec.projectData.milestones_with_child
      : [];

    rec.milestones = withChild.filter(m => !m.parent_id);

    withChild.forEach(m => {
      if (!m.parent_id) {
        rec.milestoneMap[Number(m.id)] = m.name ?? m.title ?? `Milestone #${m.id}`;
      } else {
        rec.subMilestoneMap[Number(m.id)] = m.name ?? m.title ?? `Sub-Milestone #${m.id}`;
      }
      (m.children || []).forEach(c => {
        rec.subMilestoneMap[Number(c.id)] = c.name ?? c.title ?? `Sub-Milestone #${c.id}`;
      });
    });
  }

  private buildTaskMap(rec: VendorRecord): void {
    rec.tasks.forEach((t: any) => {
      rec.taskMap[Number(t.id)] = t.title ?? `Task #${t.id}`;
    });
  }

  private computeTotals(rec: VendorRecord): void {
    rec.totalBilled = rec.invoices
      .filter(i => i.status !== 'Cancelled')
      .reduce((s, i) => s + (Number(i.grand_total) || 0), 0);

    rec.totalPaid = rec.invoices
      .reduce((s, i) => s + (Number(i.paid_amount) || 0), 0);

    rec.totalDailyLaborCost = rec.laborWorkers
      .reduce((s, w) => s + (Number(w.daily_rate) || 0) * (w.labor_count || 0), 0);
  }

  // ── Budget Usage (used in downloadVendorReport) ─────────────────────────
  budgetUsage(rec: VendorRecord): {
    allocated: number; invoiced: number; percent: number;
    exceeded: boolean; exceededBy: number;
  } {
    const allocated = Number(rec.vendor.budget_allocation) || 0;
    const invoiced = rec.totalBilled;
    const percent = allocated > 0 ? Math.round((invoiced / allocated) * 100) : 0;
    const exceeded = allocated > 0 && invoiced > allocated;
    return {
      allocated, invoiced, percent, exceeded,
      exceededBy: exceeded ? invoiced - allocated : 0,
    };
  }

  // ── Invoice Helpers ───────────────────────────────────────────────────────
  getInvoiceItems(inv: VendorInvoice): any[] {
    if (Array.isArray(inv.items)) return inv.items;
    try {
      const parsed = JSON.parse(inv.items as any);
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  }

  invoiceHasLabor(inv: VendorInvoice): boolean {
    return this.getInvoiceItems(inv).some((i: any) => i.type === 'labor');
  }

  resolveSettlement(rec: VendorRecord, inv: VendorInvoice): ResolvedSettlement | null {
    if (!inv.settlement_type) return null;
    return {
      type: this.settlementLabel(inv.settlement_type),
      completion: inv.settlement_completion ?? null,
      milestoneNames: (inv.milestone_ids || []).map(
        id => rec.milestoneMap[Number(id)] ?? `Milestone #${id}`
      ),
      subMilestoneNames: (inv.sub_milestone_ids || []).map(
        id => rec.subMilestoneMap[Number(id)] ?? `Sub-Milestone #${id}`
      ),
      taskNames: (inv.task_ids || []).map(
        id => rec.taskMap[Number(id)] ?? `Task #${id}`
      ),
    };
  }

  settlementLabel(type: string): string {
    const map: Record<string, string> = {
      work_poc: 'Work POC',
      milestone: 'Milestone',
      lumpsum: 'Lump Sum',
    };
    return map[type] ?? type;
  }

  remainingAmount(inv: VendorInvoice): number {
    return Math.max(0, this.toNumber(inv.grand_total) - this.toNumber(inv.paid_amount));
  }

  // ── Vendor Display Helpers ────────────────────────────────────────────────

  /** Returns 1-2 letter initials from vendor name */
  getVendorInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /**
   * Human-readable tenure: "3 yrs 2 mo" / "8 months" / "Just joined" etc.
   */
  getVendorTenure(createdAt: string | Date | null | undefined): string {
    if (!createdAt) return '—';
    const start = new Date(String(createdAt));
    if (isNaN(start.getTime())) return '—';
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (months < 0) { years--; months += 12; }
    const days = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
    if (days < 30) return 'Just joined';
    if (years === 0 && months < 12) return `${months} month${months !== 1 ? 's' : ''}`;
    if (years > 0 && months === 0) return `${years} yr${years !== 1 ? 's' : ''}`;
    if (years > 0) return `${years} yr${years !== 1 ? 's' : ''} ${months} mo`;
    return `${months} months`;
  }

  /** Returns the most recent invoice date for a record */
  getLatestInvoiceDate(rec: VendorRecord): string | null {
    if (!rec.invoices.length) return null;
    const sorted = [...rec.invoices].sort(
      (a, b) => new Date(b.invoice_date).getTime() - new Date(a.invoice_date).getTime()
    );
    return sorted[0].invoice_date;
  }

  /** Returns the most recent audit date for a record */
  getLatestAuditDate(rec: VendorRecord): string | null {
    if (!rec.audits.length) return null;
    const sorted = [...rec.audits].sort(
      (a, b) => new Date(b.audit_date || b.createdAt).getTime() - new Date(a.audit_date || a.createdAt).getTime()
    );
    return sorted[0].audit_date || sorted[0].createdAt;
  }

  // ── File Helpers ──────────────────────────────────────────────────────────
  getFileName(filePath: string): string {
    return filePath.split('/').pop() ?? filePath;
  }

  // ── Format Helpers ─────────────────────────────────────────────────────────
  formatDate(dateInput: string | Date | undefined | null): string {
    if (!dateInput) return '—';
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime())) return String(dateInput || '—');
    const dd = String(d.getDate()).padStart(2, '0');
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    return `${dd}/${mmm}/${d.getFullYear()}`;
  }

  formatAmount(amount?: number | string | null): string {
    const n = Number(amount) || 0;
    return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }

  toNumber(val: any): number {
    return Number(val) || 0;
  }

  projectDurationLabel(projectData: any): string {
    if (!projectData) return '—';
    const start = projectData.start_date || projectData.createdAt;
    const end = projectData.completion_date || projectData.end_date;
    if (!start) return '—';
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;
    if (!endDate) return `Started ${this.formatDate(startDate)} · Ongoing`;
    const now = new Date();
    if (now > endDate) return `${this.formatDate(startDate)} → ${this.formatDate(endDate)} · Completed`;
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / 86_400_000);
    return `${this.formatDate(startDate)} → ${this.formatDate(endDate)} · ${daysLeft} day(s) left`;
  }

  // ── View Invoice (print window) ───────────────────────────────────────────
  viewInvoice(rec: VendorRecord, inv: VendorInvoice): void {
    const invoiceItems = this.getInvoiceItems(inv);

    const gstMap: Record<number, number> = {};
    invoiceItems.forEach((item: any) => {
      const rate = Number(item.gst) || 0;
      const amt = Number(item.gstAmount) || 0;
      if (amt > 0) gstMap[rate] = (gstMap[rate] || 0) + amt;
    });

    const taxRows = Object.entries(gstMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([rate, amount]) => `
        <div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
          <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
          <span style="font-weight:600;">₹${Number(amount).toLocaleString('en-IN')}</span>
        </div>`).join('');

    const hasLabor = invoiceItems.some((i: any) => i.type === 'labor');
    const itemRows = invoiceItems.map((item: any) => {
      const isLabor = item.type === 'labor';
      const typeLabel = item.type
        ? String(item.type).charAt(0).toUpperCase() + String(item.type).slice(1)
        : '—';
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${typeLabel}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.description || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 0}</td>
        ${hasLabor ? `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${isLabor ? (item.hours || 0) + 'h' : ''}</td>` : ''}
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.unitPrice || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.gst || 0}%</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.gstAmount || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">₹${Number(item.total || 0).toLocaleString('en-IN')}</td>
      </tr>`;
    }).join('');

    const settlement = this.resolveSettlement(rec, inv);
    const settlementBlock = settlement ? `
      <div style="margin-top:24px;padding:14px 16px;background:#eff6ff;border-radius:10px;border:1px solid #dbeafe;">
        <p style="margin:0 0 6px;font-weight:800;font-size:12px;color:#1d4ed8;text-transform:uppercase;">Settlement — ${settlement.type}</p>
        ${settlement.completion != null ? `<p style="margin:2px 0;font-size:12px;"><strong>Completion:</strong> ${settlement.completion}%</p>` : ''}
        ${settlement.milestoneNames.length ? `<p style="margin:2px 0;font-size:12px;"><strong>Milestones:</strong> ${settlement.milestoneNames.join(', ')}</p>` : ''}
        ${settlement.subMilestoneNames.length ? `<p style="margin:2px 0;font-size:12px;"><strong>Sub-Milestones:</strong> ${settlement.subMilestoneNames.join(', ')}</p>` : ''}
        ${settlement.taskNames.length ? `<p style="margin:2px 0;font-size:12px;"><strong>Tasks:</strong> ${settlement.taskNames.join(', ')}</p>` : ''}
      </div>` : '';

    const paymentHistory: any[] = Array.isArray(inv.payment_history) ? inv.payment_history : [];
    const paymentRows = paymentHistory.length > 0 ? `
      <div style="margin-top:24px;">
        <h3 style="font-size:14px;font-weight:900;margin-bottom:10px;color:#1e293b;">Payment History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:#f1f5f9;">
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">#</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Date</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Mode</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Reference</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;text-transform:uppercase;">Amount</th>
          </tr></thead>
          <tbody>
            ${paymentHistory.map((p, i) => `
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${i + 1}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${this.formatDate(p.paid_at)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.mode || '—'}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.reference || '—'}${p.clearance_date ? ' (Clr: ' + this.formatDate(p.clearance_date) + ')' : ''}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;text-align:right;">₹${Number(p.amount).toLocaleString('en-IN')}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>` : '';

    const html = `<!DOCTYPE html>
<html><head><title>Invoice ${inv.invoice_number}</title>
<style>
  body { font-family: sans-serif; padding: 40px; color: #1e293b; }
  h1 { font-size: 24px; font-weight: 900; margin: 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; }
  th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; }
  @media print { button { display: none !important; } }
</style></head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <div><h1>Tax Invoice</h1><p style="color:#64748b;margin:4px 0 0;">${rec.vendor.name}</p></div>
    <div style="text-align:right;">
      <p style="font-weight:900;font-size:18px;margin:0;">${inv.invoice_number}</p>
      <p style="color:#64748b;margin:4px 0 0;">${this.formatDate(inv.invoice_date)}</p>
      <span style="display:inline-block;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;
        background:${inv.status === 'Paid' ? '#dcfce7' : inv.status === 'Cancelled' ? '#fee2e2' : inv.status === 'Partially Paid' ? '#dbeafe' : '#fef3c7'};
        color:${inv.status === 'Paid' ? '#15803d' : inv.status === 'Cancelled' ? '#dc2626' : inv.status === 'Partially Paid' ? '#1d4ed8' : '#b45309'};
        margin-top:6px;">${inv.status}</span>
    </div>
  </div>
  <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
    <p style="margin:0;font-weight:700;">Bill To: ${rec.vendor.name}</p>
    <p style="margin:4px 0 0;color:#64748b;">${rec.vendor.address?.street || ''} ${rec.vendor.address?.pincode || ''}</p>
    <p style="margin:4px 0 0;color:#64748b;">GST: ${rec.vendor.kyc?.gst || '—'} | PAN: ${rec.vendor.kyc?.pan || '—'}</p>
    <p style="margin:6px 0 0;"><strong style="color:#94a3b8;font-size:11px;text-transform:uppercase;">Project:</strong>
      <strong>${rec.projectData?.name || 'Not linked'}</strong></p>
  </div>
  <table>
    <thead><tr>
      <th>Type</th><th>Description</th>
      <th style="text-align:center;">Qty</th>
      ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ''}
      <th style="text-align:right;">Rate (₹)</th>
      <th style="text-align:center;">Tax %</th>
      <th style="text-align:right;">Tax (₹)</th>
      <th style="text-align:right;">Total (₹)</th>
    </tr></thead>
    <tbody>${itemRows}</tbody>
  </table>
  <div style="margin-top:24px;max-width:340px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Subtotal</span><span style="font-weight:700;">₹${Number(inv.subtotal).toLocaleString('en-IN')}</span>
    </div>
    ${taxRows}
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Total Tax</span><span style="font-weight:700;">₹${Number(inv.tax_amount).toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:12px 0;">
      <span style="font-weight:900;">Grand Total</span>
      <span style="color:#4f46e5;font-size:18px;font-weight:900;">₹${Number(inv.grand_total).toLocaleString('en-IN')}</span>
    </div>
    ${Number(inv.paid_amount) > 0 ? `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:2px solid #e5e7eb;">
      <span style="color:#16a34a;font-weight:700;">Paid</span>
      <span style="color:#16a34a;font-weight:900;">₹${Number(inv.paid_amount).toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;">
      <span style="color:#dc2626;font-weight:700;">Remaining</span>
      <span style="color:#dc2626;font-weight:900;">₹${Math.max(0, Number(inv.grand_total) - Number(inv.paid_amount)).toLocaleString('en-IN')}</span>
    </div>` : ''}
  </div>
  ${settlementBlock}
  ${paymentRows}
  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()"
      style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body></html>`;

    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }

  // ── Download Vendor Report ────────────────────────────────────────────────
  downloadVendorReport(rec: VendorRecord): void {
    const v = rec.vendor;
    const projectName = rec.projectData?.name || 'Project not linked';

    const invoiceRows = rec.invoices.map(inv => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${inv.invoice_number}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${this.formatDate(inv.invoice_date)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(inv.grand_total)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(inv.paid_amount)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${inv.status}</td>
      </tr>`).join('');

    const auditRows = rec.audits.map(a => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${this.formatDate(a.audit_date || a.createdAt)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.quality}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.timeliness}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.safety}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:700;">${Math.round(Number(a.composite_score))}%</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${a.observations || '—'}</td>
      </tr>`).join('');

    const laborRows = rec.laborWorkers.map(w => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${w.skill}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${w.labor_count}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${w.assign_worker || '—'}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(w.daily_rate)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">${this.formatAmount(Number(w.daily_rate) * (w.labor_count || 0))}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${w.statusLabel || w.status}</td>
      </tr>`).join('');

    const usage = this.budgetUsage(rec);

    const html = `<!DOCTYPE html>
<html><head><title>Vendor Report — ${v.name}</title>
<style>
  body { font-family: sans-serif; padding: 36px; color: #1e293b; }
  h1 { font-size: 22px; font-weight: 900; margin: 0 0 4px; }
  h2 { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: #475569;
       margin: 28px 0 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; margin-top: 6px; }
  th { background: #f1f5f9; padding: 8px 10px; text-align: left; font-size: 10px; text-transform: uppercase; }
  @media print { button { display: none !important; } }
</style></head>
<body>
  <h1>Vendor Report — ${v.name}</h1>
  <p style="color:#64748b;margin:0 0 8px;">Generated on ${this.formatDate(new Date())}</p>
  <h2>Vendor Profile</h2>
  <p><strong>Added On:</strong> ${this.formatDate((v as any).created_at)}</p>
  <p><strong>SPOC:</strong> ${v.spoc.name} · ${v.spoc.phone}</p>
  <p><strong>Email:</strong> ${v.email} · <strong>Phone:</strong> ${v.phone}</p>
  <p><strong>GST:</strong> ${v.kyc.gst || '—'} &nbsp;&nbsp; <strong>PAN:</strong> ${v.kyc.pan || '—'}</p>
  <p><strong>Address:</strong> ${v.address.street}, ${v.address.pincode}</p>
  <p><strong>Skills:</strong> ${v.skill.join(', ') || '—'}</p>
  <p><strong>Budget Allocated:</strong> ${v.budget} &nbsp;&nbsp; <strong>Compliance Score:</strong> ${v.compliance_score}%</p>
  <p><strong>Budget Utilized:</strong> ${usage.percent}% (${this.formatAmount(usage.invoiced)} of ${this.formatAmount(usage.allocated)})${usage.exceeded ? ' — EXCEEDED by ' + this.formatAmount(usage.exceededBy) : ''}</p>
  <p><strong>Project:</strong> ${projectName} &nbsp;&nbsp; <strong>Duration:</strong> ${this.projectDurationLabel(rec.projectData)}</p>
  <h2>Invoices (${rec.invoices.length}) — Billed: ${this.formatAmount(rec.totalBilled)} | Paid: ${this.formatAmount(rec.totalPaid)}</h2>
  <table>
    <thead><tr>
      <th>Invoice #</th><th>Date</th>
      <th style="text-align:right;">Amount</th><th style="text-align:right;">Paid</th><th>Status</th>
    </tr></thead>
    <tbody>${invoiceRows || '<tr><td colspan="5" style="padding:12px;text-align:center;color:#94a3b8;">No invoices</td></tr>'}</tbody>
  </table>
  <h2>Compliance Audits (${rec.audits.length})</h2>
  <table>
    <thead><tr>
      <th>Date</th><th style="text-align:center;">Quality</th>
      <th style="text-align:center;">Timeliness</th><th style="text-align:center;">Safety</th>
      <th style="text-align:center;">Score</th><th>Observations</th>
    </tr></thead>
    <tbody>${auditRows || '<tr><td colspan="6" style="padding:12px;text-align:center;color:#94a3b8;">No audits</td></tr>'}</tbody>
  </table>
  <h2>Labor (${rec.laborWorkers.length}) — Daily Cost: ${this.formatAmount(rec.totalDailyLaborCost)}</h2>
  <table>
    <thead><tr>
      <th>Skill</th><th style="text-align:center;">Count</th><th>Assigned To</th>
      <th style="text-align:right;">Rate/day</th><th style="text-align:right;">Cost/day</th><th>Status</th>
    </tr></thead>
    <tbody>${laborRows || '<tr><td colspan="6" style="padding:12px;text-align:center;color:#94a3b8;">No labor records</td></tr>'}</tbody>
  </table>
  <div style="margin-top:30px;text-align:center;">
    <button onclick="window.print()"
      style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body></html>`;

    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }

  // ── CSV Export ────────────────────────────────────────────────────────────
  async exportAllToCsv(): Promise<void> {
    if (this.exporting) return;
    this.exporting = true;

    try {
      const vendorsToExport = this.displayVendors;
      const pending = vendorsToExport.filter(v => !this.records[v.id]?.loaded);
      await Promise.all(pending.map(v => this.loadVendorRecord(v)));

      const rows: string[] = [];
      rows.push('Vendor,Project,Record Type,Reference,Date,Amount,Status,Details');

      const esc = (val: any) => `"${String(val ?? '—').replace(/"/g, '""')}"`;

      vendorsToExport.forEach(v => {
        const rec = this.records[v.id];
        if (!rec) return;
        const projectName = rec.projectData?.name || 'Not linked';

        rec.invoices.forEach(inv => {
          rows.push([
            esc(v.name), esc(projectName), esc('Invoice'), esc(inv.invoice_number),
            esc(this.formatDate(inv.invoice_date)), esc(this.toNumber(inv.grand_total)),
            esc(inv.status), esc(`Paid: ${this.formatAmount(inv.paid_amount)}`),
          ].join(','));

          (inv.payment_history || []).forEach(p => {
            rows.push([
              esc(v.name), esc(projectName), esc('Payment'), esc(inv.invoice_number),
              esc(this.formatDate(p.paid_at)), esc(this.toNumber(p.amount)),
              esc(p.mode), esc(p.reference ? `Ref: ${p.reference}` : '—'),
            ].join(','));
          });
        });

        rec.audits.forEach(a => {
          rows.push([
            esc(v.name), esc(projectName), esc('Audit'), esc('—'),
            esc(this.formatDate(a.audit_date || a.createdAt)), esc('—'),
            esc(`${Math.round(Number(a.composite_score))}%`),
            esc(a.observations || '—'),
          ].join(','));
        });

        rec.laborWorkers.forEach(w => {
          rows.push([
            esc(v.name), esc(projectName), esc('Labor'), esc(w.skill),
            esc('—'), esc(this.toNumber(w.daily_rate) * (w.labor_count || 0)),
            esc(w.statusLabel || w.status),
            esc(`Count: ${w.labor_count} · Assigned: ${w.assign_worker || 'Unassigned'}`),
          ].join(','));
        });

        rec.tasks.forEach((t: any) => {
          rows.push([
            esc(v.name), esc(projectName), esc('Task'), esc(t.title),
            esc(this.formatDate(t.due_date)), esc('—'),
            esc(t.status),
            esc(`Subtasks: ${(t.subtasks || []).length}`),
          ].join(','));
        });

        rec.milestones.forEach(m => {
          rows.push([
            esc(v.name), esc(projectName), esc('Milestone'), esc(m.name || m.title),
            esc(`${this.formatDate(m.start_date)} → ${this.formatDate(m.end_date)}`),
            esc('—'), esc(m.status || '—'),
            esc(`Sub-milestones: ${(m.children || []).length}`),
          ].join(','));
        });
      });

      if (rows.length <= 1) {
        alert('No data to export.');
        return;
      }

      const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vendor-history-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      this.exporting = false;
    }
  }
}