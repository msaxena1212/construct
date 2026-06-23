import { Component, OnInit, HostListener, inject } from '@angular/core';
import { VendorsServices, Vendor } from '../../vendors/services/vendors-services';
import { VendorInvoiceService, VendorInvoice } from '../../vendors/services/vendors-invoice-services';
import { VendorAuditService, VendorAudit } from '../../vendors/services/vendors-audit-services';
import { VendorsLaborServices, LaborWorker, LaborStats } from '../../vendors/services/vendors-labor-services';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProjectService } from '../../projects/services/project-service';
import { IProjectTask } from '../../../shared/interfaces/project.interface';
import { forkJoin, of } from 'rxjs';
import { VendorsHistoryServices, VendorHistoryEvent } from '../../history/vendors-history/vendors-history-services';
import { take, catchError } from 'rxjs/operators';

type HistoryCategory =
  | 'all' | 'vendor' | 'project' | 'task' | 'milestone'
  | 'document' | 'safety' | 'invoice' | 'labor' | 'budget';

type ConcreteCategory = Exclude<HistoryCategory, 'all'>;

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
  updated_at?: string;
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
  updated_at?: string;
}

export interface EventSubDetail {
  label: string;
  value: string;
  valueColor?: string;
}

interface HistoryEvent {
  id: string;
  vendorId: string;
  vendorName: string;
  date: Date;
  icon: string;
  iconBg: string;
  iconColor: string;
  description: string;
  categories: ConcreteCategory[];
  primaryCategory: ConcreteCategory;
  subDetails?: EventSubDetail[];
  viewAction?: () => void;
  budgetMeta?: BudgetEventMeta;
}

export interface BudgetEventMeta {
  allocated: number;
  invoiced: number;
  paid: number;
  remaining: number;
  utilizationPercent: number;
  exceeded: boolean;
  exceededBy: number;
}

export interface VendorGroup {
  vendor: Vendor;
  events: HistoryEvent[];
  totalBilled: number;
  totalPaid: number;
  invoiceCount: number;
  complianceScore: number;
}

export interface VendorBudgetSummary {
  vendor: Vendor;
  allocated: number;
  invoiced: number;
  paid: number;
  remaining: number;
  utilizationPercent: number;
  exceeded: boolean;
  exceededBy: number;
  invoiceCount: number;
  paidInvoiceCount: number;
  pendingInvoiceCount: number;
  cancelledInvoiceCount: number;
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
  historyEvents: VendorHistoryEvent[];
}

const CATEGORY_META: Record<ConcreteCategory, { label: string; badgeClass: string }> = {
  vendor: { label: 'Vendor', badgeClass: 'bg-pink-100 text-pink-700' },
  project: { label: 'Project', badgeClass: 'bg-indigo-100 text-indigo-700' },
  task: { label: 'Task', badgeClass: 'bg-blue-100 text-blue-700' },
  milestone: { label: 'Milestone', badgeClass: 'bg-purple-100 text-purple-700' },
  document: { label: 'Document', badgeClass: 'bg-slate-100 text-slate-600' },
  safety: { label: 'Safety', badgeClass: 'bg-emerald-100 text-emerald-700' },
  invoice: { label: 'Invoice', badgeClass: 'bg-amber-100 text-amber-700' },
  labor: { label: 'Labor', badgeClass: 'bg-teal-100 text-teal-700' },
  budget: { label: 'Budget', badgeClass: 'bg-violet-100 text-violet-700' },
};

@Component({
  selector: 'app-vendors-history',
  standalone: false,
  templateUrl: './vendors-history.html',
  styleUrl: './vendors-history.scss',
})
export class VendorsHistory implements OnInit {

  private http = inject(HttpClient);
  private readonly vendorApiBase = `${environment.serverUrl}/api/v1/vendors`;
  private vendorService = inject(VendorsServices);
  private invoiceService = inject(VendorInvoiceService);
  private auditService = inject(VendorAuditService);
  private laborService = inject(VendorsLaborServices);
  private projectService = inject(ProjectService);
  private historyService = inject(VendorsHistoryServices);

  vendors: Vendor[] = [];
  exporting = false;
  records: Record<string, VendorRecord> = {};
  Math = Math;

  selectedVendorIds: Set<string> = new Set();
  vendorDropdownOpen = false;
  dropdownSearch = '';
  activeCategory: HistoryCategory = 'all';

  readonly categoryTabs: { key: HistoryCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'vendor', label: 'Vendors' },
    { key: 'project', label: 'Project' },
    { key: 'task', label: 'Task' },
    { key: 'milestone', label: 'Milestone' },
    { key: 'document', label: 'Document' },
    { key: 'safety', label: 'Safety' },
    { key: 'invoice', label: 'Invoices' },
    { key: 'labor', label: 'Labor' },
    { key: 'budget', label: 'Budget' },
  ];

  getCategoryBadgeClass(cat: ConcreteCategory): string {
    return CATEGORY_META[cat]?.badgeClass ?? 'bg-slate-100 text-slate-600';
  }

  getCategoryLabel(cat: ConcreteCategory): string {
    return CATEGORY_META[cat]?.label ?? cat;
  }

  ngOnInit(): void {
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      v.forEach(vendor => {
        if (!this.records[vendor.id]?.loaded && !this.records[vendor.id]?.loading) {
          this.loadVendorRecord(vendor);
        }
      });
    });

    if (this.vendorService.getVendors().length === 0) {
      this.vendorService.loadVendors();
    } else {
      const existing = this.vendorService.getVendors();
      this.vendors = existing;
      existing.forEach(v => {
        if (!this.records[v.id]?.loaded && !this.records[v.id]?.loading) {
          this.loadVendorRecord(v);
        }
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.vendorDropdownOpen && !target.closest('[data-dropdown="vendor"]')) {
      this.vendorDropdownOpen = false;
    }
  }

  get vendorDropdownLabel(): string {
    if (this.selectedVendorIds.size === 0) return 'Select Vendors';
    if (this.isAllSelected) return 'All Vendors';
    if (this.selectedVendorIds.size === 1) {
      const id = [...this.selectedVendorIds][0];
      return this.vendors.find(v => v.id === id)?.name ?? '1 Vendor';
    }
    return `${this.selectedVendorIds.size} Vendors`;
  }

  get isAllSelected(): boolean {
    return this.vendors.length > 0 && this.selectedVendorIds.size === this.vendors.length;
  }

  get isPartiallySelected(): boolean {
    return this.selectedVendorIds.size > 0 && !this.isAllSelected;
  }

  get isSingleVendorSelected(): boolean {
    return this.selectedVendorIds.size === 1;
  }

  get selectedVendorIdsArray(): string[] {
    return [...this.selectedVendorIds];
  }

  get dropdownFilteredVendors(): Vendor[] {
    if (!this.dropdownSearch.trim()) return this.vendors;
    const term = this.dropdownSearch.trim().toLowerCase();
    return this.vendors.filter(v =>
      v.name.toLowerCase().includes(term) ||
      v.email.toLowerCase().includes(term) ||
      v.skill.some(s => s.toLowerCase().includes(term))
    );
  }

  toggleVendorDropdown(): void {
    this.vendorDropdownOpen = !this.vendorDropdownOpen;
    if (this.vendorDropdownOpen) this.dropdownSearch = '';
  }

  toggleSelectAll(): void {
    if (this.isAllSelected) {
      this.selectedVendorIds = new Set();
    } else {
      this.selectedVendorIds = new Set(this.vendors.map(v => v.id));
      this.vendors.forEach(v => {
        if (!this.records[v.id]?.loaded && !this.records[v.id]?.loading) {
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
      if (!this.records[vendor.id]?.loaded && !this.records[vendor.id]?.loading) {
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

  clearAllSelections(): void { this.selectedVendorIds = new Set(); }

  getVendorNameById(id: string): string {
    return this.vendors.find(v => v.id === id)?.name ?? id;
  }

  setActiveCategory(key: HistoryCategory): void { this.activeCategory = key; }


  getCategoryCount(key: HistoryCategory): number {
    if (key === 'all') return this.timelineEvents.length;
    return this.timelineEvents.filter(ev =>
      ev.categories.includes(key as ConcreteCategory)
    ).length;
  }


  get activeCount(): number { return this.vendors.filter(v => v.status.toLowerCase() === 'active').length; }
  get pendingCount(): number { return this.vendors.filter(v => v.status.toLowerCase() === 'pending').length; }
  get inactiveCount(): number { return this.vendors.filter(v => v.status.toLowerCase() === 'inactive').length; }


  get displayVendors(): Vendor[] {
    if (this.selectedVendorIds.size === 0) return this.vendors;
    return this.vendors.filter(v => this.selectedVendorIds.has(v.id));
  }

  get displayTotalInvoices(): number {
    return this.displayVendors.reduce((s, v) => s + (this.records[v.id]?.invoices.length || 0), 0);
  }

  get displayTotalBilled(): number {
    return this.displayVendors.reduce((s, v) => s + (this.records[v.id]?.totalBilled || 0), 0);
  }

  get displayTotalPaid(): number {
    return this.displayVendors.reduce((s, v) => s + (this.records[v.id]?.totalPaid || 0), 0);
  }

  get isTimelineLoading(): boolean {
    return this.displayVendors.some(v => !this.records[v.id] || this.records[v.id].loading);
  }

  get vendorBudgetSummaries(): VendorBudgetSummary[] {
    return this.displayVendors
      .filter(v => this.records[v.id]?.loaded)
      .map(v => {
        const rec = this.records[v.id];
        const allocated = Number(v.budget_allocation) || 0;
        const invoiced = rec.totalBilled;
        const paid = rec.totalPaid;
        const remaining = Math.max(0, allocated - invoiced);
        const utilizationPercent = allocated > 0
          ? Math.min(Math.round((invoiced / allocated) * 100), 999) : 0;
        const exceeded = allocated > 0 && invoiced > allocated;
        const exceededBy = exceeded ? invoiced - allocated : 0;
        return {
          vendor: v, allocated, invoiced, paid, remaining,
          utilizationPercent, exceeded, exceededBy,
          invoiceCount: rec.invoices.length,
          paidInvoiceCount: rec.invoices.filter(i => i.status === 'Paid').length,
          pendingInvoiceCount: rec.invoices.filter(i => ['Pending', 'Unpaid'].includes(i.status)).length,
          cancelledInvoiceCount: rec.invoices.filter(i => i.status === 'Cancelled').length,
        } as VendorBudgetSummary;
      })
      .sort((a, b) => b.utilizationPercent - a.utilizationPercent);
  }

  get totalAllocated(): number { return this.vendorBudgetSummaries.reduce((s, b) => s + b.allocated, 0); }
  get totalInvoiced(): number { return this.vendorBudgetSummaries.reduce((s, b) => s + b.invoiced, 0); }
  get totalBudgetPaid(): number { return this.vendorBudgetSummaries.reduce((s, b) => s + b.paid, 0); }
  get totalBudgetRemaining(): number { return this.vendorBudgetSummaries.reduce((s, b) => s + b.remaining, 0); }
  get overallUtilizationPercent(): number {
    return this.totalAllocated > 0
      ? Math.min(Math.round((this.totalInvoiced / this.totalAllocated) * 100), 999) : 0;
  }
  get exceededVendorsCount(): number {
    return this.vendorBudgetSummaries.filter(b => b.exceeded).length;
  }

  getBudgetBarWidth(summary: VendorBudgetSummary): number { return Math.min(summary.utilizationPercent, 100); }
  getBudgetBarColor(summary: VendorBudgetSummary): string {
    if (summary.exceeded) return 'bg-red-500';
    if (summary.utilizationPercent >= 80) return 'bg-amber-500';
    if (summary.utilizationPercent >= 50) return 'bg-blue-500';
    return 'bg-emerald-500';
  }
  getBudgetStatusLabel(summary: VendorBudgetSummary): string {
    if (summary.exceeded) return 'Exceeded';
    if (summary.utilizationPercent >= 80) return 'Near Limit';
    if (summary.utilizationPercent >= 50) return 'Moderate';
    return 'Healthy';
  }
  getBudgetStatusClasses(summary: VendorBudgetSummary): string {
    if (summary.exceeded) return 'bg-red-100 text-red-600';
    if (summary.utilizationPercent >= 80) return 'bg-amber-100 text-amber-600';
    if (summary.utilizationPercent >= 50) return 'bg-blue-100 text-blue-600';
    return 'bg-emerald-100 text-emerald-600';
  }

  get timelineEvents(): HistoryEvent[] {
    const events: HistoryEvent[] = [];
    this.displayVendors.forEach(v => {
      const rec = this.records[v.id];
      if (rec?.loaded) events.push(...this.buildVendorEvents(rec));
    });
    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  get filteredTimelineEvents(): HistoryEvent[] {
    if (this.activeCategory === 'all') return this.timelineEvents;
    return this.timelineEvents.filter(ev =>
      ev.categories.includes(this.activeCategory as ConcreteCategory)
    );
  }

  get groupedTimelineEvents(): VendorGroup[] {
    return this.displayVendors
      .filter(v => this.records[v.id]?.loaded)
      .map(v => {
        const rec = this.records[v.id];
        const allEvts = this.buildVendorEvents(rec);
        const filtered = this.activeCategory === 'all'
          ? allEvts
          : allEvts.filter(ev => ev.categories.includes(this.activeCategory as ConcreteCategory));
        return {
          vendor: v,
          events: filtered.sort((a, b) => b.date.getTime() - a.date.getTime()),
          totalBilled: rec.totalBilled,
          totalPaid: rec.totalPaid,
          invoiceCount: rec.invoices.length,
          complianceScore: v.compliance_score,
        } as VendorGroup;
      })
      .filter(g => g.events.length > 0);
  }

  private addEvent(
    events: HistoryEvent[], vendor: Vendor, rawDate: any,
    icon: string, iconBg: string, iconColor: string,
    description: string, idSuffix: string, categories: ConcreteCategory[],
    subDetails?: EventSubDetail[], viewAction?: () => void, budgetMeta?: BudgetEventMeta
  ): void {
    if (!rawDate) return;
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return;
    events.push({
      id: `${vendor.id}-${idSuffix}`,
      vendorId: vendor.id, vendorName: vendor.name, date: d,
      icon, iconBg, iconColor, description, categories,
      primaryCategory: categories[0], subDetails, viewAction, budgetMeta,
    });
  }

  private resolveDate(obj: any, ...fields: string[]): string | null {
    for (const f of fields) {
      const val = obj?.[f];
      if (val) { const d = new Date(val); if (!isNaN(d.getTime())) return val; }
    }
    return null;
  }

  private extractAuditArray(raw: any): any[] {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw.data)) return raw.data;
    if (Array.isArray(raw.audits)) return raw.audits;
    if (Array.isArray(raw.data?.audits)) return raw.data.audits;
    return [];
  }

  private stmtDate(dateInput: string | Date | undefined | null): string {
    if (!dateInput) return '—';
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime())) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    return `${dd}-${mmm}-${d.getFullYear()}`;
  }


  private buildVendorEvents(rec: VendorRecord): HistoryEvent[] {
    const v = rec.vendor;
    const events: HistoryEvent[] = [];
    const allocated = Number(v.budget_allocation) || 0;
    const projectName = rec.projectData?.name || null;
    const updatedAt = (v as any).updated_at;

    this.addEvent(
      events, v, v.created_at,
      'person_add', 'bg-pink-100', 'text-pink-600',
      `Vendor "${v.name}" was onboarded${projectName ? ` under Project "${projectName}"` : ''} by Admin on ${this.stmtDate(v.created_at)}.`,
      'onboard', ['vendor'],
      [
        { label: 'Vendor', value: v.name, valueColor: 'text-pink-600' },
        { label: 'Status', value: v.status, valueColor: v.status.toLowerCase() === 'active' ? 'text-green-600' : 'text-amber-600' },
        { label: 'Compliance', value: `${v.compliance_score}%`, valueColor: v.compliance_score >= 90 ? 'text-green-600' : v.compliance_score >= 70 ? 'text-amber-600' : 'text-red-500' },
        { label: 'Since', value: this.stmtDate(v.created_at), valueColor: 'text-slate-500' },
        ...(v.skill?.length ? [{ label: 'Skills', value: v.skill.join(', '), valueColor: 'text-slate-600' }] : []),
      ]
    );


    if (projectName) {
      this.addEvent(
        events, v, v.created_at,
        'folder_special', 'bg-indigo-100', 'text-indigo-600',
        `Vendor "${v.name}" was linked to Project "${projectName}" on ${this.stmtDate(v.created_at)}.`,
        'project-link', ['project'],
        [
          { label: 'Vendor', value: v.name, valueColor: 'text-pink-600' },
          { label: 'Project', value: projectName, valueColor: 'text-indigo-600' },
          { label: 'Status', value: v.status, valueColor: v.status.toLowerCase() === 'active' ? 'text-green-600' : 'text-amber-600' },
          { label: 'Since', value: this.stmtDate(v.created_at), valueColor: 'text-slate-500' },
        ]
      );
    }

    if (allocated > 0) {
      this.addEvent(
        events, v, v.created_at,
        'account_balance_wallet', 'bg-violet-100', 'text-violet-600',
        `A budget of ${this.formatAmount(allocated)} was allocated to Vendor "${v.name}" by Admin on ${this.stmtDate(v.created_at)}.`,
        'budget-alloc', ['budget'],
        [
          { label: 'Allocated', value: this.formatAmount(allocated), valueColor: 'text-violet-600' },
          { label: 'Compliance', value: `${v.compliance_score}%`, valueColor: v.compliance_score >= 90 ? 'text-green-600' : v.compliance_score >= 70 ? 'text-amber-600' : 'text-red-500' },
        ]
      );
    }

    if (allocated > 0 && rec.totalBilled > allocated) {
      const exceededBy = rec.totalBilled - allocated;
      const latestInvDate = this.getLatestInvoiceDate(rec);
      const utilPct = Math.round((rec.totalBilled / allocated) * 100);
      this.addEvent(
        events, v, latestInvDate || v.created_at,
        'warning', 'bg-red-100', 'text-red-600',
        `Budget for Vendor "${v.name}" was exceeded by ${this.formatAmount(exceededBy)} (${utilPct}% utilized) as of ${this.stmtDate(latestInvDate || v.created_at)}.`,
        'budget-exceeded', ['budget'],
        [
          { label: 'Allocated', value: this.formatAmount(allocated), valueColor: 'text-violet-600' },
          { label: 'Invoiced', value: this.formatAmount(rec.totalBilled), valueColor: 'text-red-500' },
          { label: 'Exceeded By', value: this.formatAmount(exceededBy), valueColor: 'text-red-600' },
        ]
      );
    }

    rec.historyEvents.forEach(h => {
      const isInvoice = h.entity_type === 'invoice';
      const isLabor = h.entity_type === 'labor';
      const isAudit = h.entity_type === 'audit';
      const isVendor = h.entity_type === 'vendor';

      let icon = 'history', iconBg = 'bg-slate-100', iconColor = 'text-slate-600';
      let categories: ConcreteCategory[] = ['vendor'];
      let viewAction: (() => void) | undefined;
      let budgetMeta: BudgetEventMeta | undefined;
      const subDetails: EventSubDetail[] = [];

      if (isVendor) {
        categories = ['vendor'];
        icon = h.action === 'deleted' ? 'person_remove' : 'edit';
        iconBg = 'bg-pink-100'; iconColor = 'text-pink-600';
        subDetails.push({ label: 'Action', value: h.action.replace(/_/g, ' '), valueColor: 'text-pink-600' });
      }

      if (isInvoice) {
        categories = allocated > 0 ? ['invoice', 'budget'] : ['invoice'];
        if (h.action === 'payment_added') {
          icon = 'payments'; iconBg = 'bg-green-100'; iconColor = 'text-green-600';
          if (h.meta?.amount) subDetails.push({ label: 'Amount', value: this.formatAmount(h.meta.amount), valueColor: 'text-green-700' });
          if (h.meta?.mode) subDetails.push({ label: 'Mode', value: h.meta.mode, valueColor: 'text-slate-600' });
        } else if (h.action === 'deleted') {
          icon = 'cancel'; iconBg = 'bg-red-100'; iconColor = 'text-red-600';
        } else if (h.action === 'created') {
          icon = 'receipt_long'; iconBg = 'bg-amber-100'; iconColor = 'text-amber-600';
        } else {
          icon = 'receipt_long'; iconBg = 'bg-blue-100'; iconColor = 'text-blue-600';
        }
        if (h.meta?.invoice_number) subDetails.push({ label: 'Invoice', value: h.meta.invoice_number, valueColor: 'text-slate-700' });
        if (h.meta?.grand_total) subDetails.push({ label: 'Amount', value: this.formatAmount(h.meta.grand_total), valueColor: 'text-amber-700' });

        const matchedInv = rec.invoices.find(i => i.id === h.entity_id);
        if (matchedInv) viewAction = () => this.viewInvoice(rec, matchedInv);

        if (allocated > 0 && h.action !== 'deleted') {
          const invoiced = rec.totalBilled;
          const utilizationPercent = Math.round((invoiced / allocated) * 100);
          const exceeded = invoiced > allocated;
          budgetMeta = {
            allocated, invoiced, paid: rec.totalPaid,
            remaining: Math.max(0, allocated - invoiced),
            utilizationPercent, exceeded,
            exceededBy: exceeded ? invoiced - allocated : 0,
          };
        }
      }

      if (isLabor) {
        categories = ['labor'];
        icon = h.action === 'deleted' ? 'person_remove' : 'engineering';
        iconBg = 'bg-teal-100'; iconColor = 'text-teal-600';
        if (h.meta?.skill) subDetails.push({ label: 'Skill', value: h.meta.skill, valueColor: 'text-teal-600' });
      }

      if (isAudit) {
        categories = ['safety'];
        icon = 'fact_check'; iconBg = 'bg-emerald-100'; iconColor = 'text-emerald-600';
        if (h.meta?.composite_score != null)
          subDetails.push({ label: 'Score', value: `${Math.round(h.meta.composite_score)}%`, valueColor: 'text-emerald-600' });
      }

      if (h.changed_by_name) subDetails.push({ label: 'By', value: h.changed_by_name, valueColor: 'text-slate-500' });

      this.addEvent(
        events, v, h.createdAt,
        icon, iconBg, iconColor,
        h.description,
        `hist-${h.id}`, categories,
        subDetails, viewAction, budgetMeta
      );
    });


    rec.tasks.forEach((t: any) => {
      const taskDate = this.resolveDate(t, 'updated_at', 'updatedAt', 'due_date', 'dueDate', 'start_date', 'startDate', 'created_at', 'createdAt');
      const statusHuman = this.humanizeStatus(t.status);
      this.addEvent(
        events, v, taskDate,
        'checklist', 'bg-blue-100', 'text-blue-600',
        `Task "${t.title}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''} was marked as "${statusHuman}" on ${this.stmtDate(taskDate)}.`,
        `task-${t.id}`, ['task'],   // ← FIX: only ['task'], not ['task', 'project']
        [
          { label: 'Task', value: t.title, valueColor: 'text-slate-700' },
          { label: 'Status', value: statusHuman, valueColor: 'text-blue-600' },
          ...(projectName ? [{ label: 'Project', value: projectName, valueColor: 'text-indigo-600' }] : []),
          ...(t.due_date || t.dueDate
            ? [{ label: 'Due', value: this.stmtDate(t.due_date || t.dueDate), valueColor: 'text-slate-500' }]
            : []),
        ]
      );
    });

    rec.milestones.forEach(m => {
      const mDate = this.resolveDate(m, 'updated_at', 'updatedAt', 'end_date', 'endDate', 'start_date', 'startDate', 'created_at', 'createdAt');
      const progress = m.milestone_progress ?? (m as any).milestoneProgress ?? m.progress ?? null;
      const mLabel = m.name || m.title || `Milestone #${m.id}`;
      this.addEvent(
        events, v, mDate,
        'flag', 'bg-purple-100', 'text-purple-600',
        progress != null
          ? `Milestone "${mLabel}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''} reached ${progress}% completion as of ${this.stmtDate(mDate)}.`
          : `Milestone "${mLabel}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''} was updated to "${this.humanizeStatus(m.status)}" on ${this.stmtDate(mDate)}.`,
        `milestone-${m.id}`, ['milestone'],   // ← FIX: only ['milestone'], not ['milestone', 'project']
        [
          { label: 'Milestone', value: mLabel, valueColor: 'text-purple-600' },
          ...(progress != null
            ? [{ label: 'Progress', value: `${progress}%`, valueColor: Number(progress) >= 80 ? 'text-green-600' : Number(progress) >= 40 ? 'text-amber-600' : 'text-red-500' }]
            : [{ label: 'Status', value: this.humanizeStatus(m.status), valueColor: 'text-purple-600' }]),
          ...(projectName ? [{ label: 'Project', value: projectName, valueColor: 'text-indigo-600' }] : []),
        ]
      );

      (m.children || []).forEach(c => {
        const cDate = this.resolveDate(c, 'updated_at', 'updatedAt', 'end_date', 'endDate', 'start_date', 'startDate', 'created_at', 'createdAt');
        const cLabel = c.name || c.title || `Sub-Milestone #${c.id}`;
        this.addEvent(
          events, v, cDate,
          'subdirectory_arrow_right', 'bg-purple-50', 'text-purple-500',
          `Sub-Milestone "${cLabel}" under "${mLabel}" for Vendor "${v.name}" was updated to "${this.humanizeStatus(c.status)}" on ${this.stmtDate(cDate)}.`,
          `sub-milestone-${c.id}`, ['milestone'],   // ← FIX: only ['milestone'], not ['milestone', 'project']
          [
            { label: 'Sub-Milestone', value: cLabel, valueColor: 'text-purple-500' },
            { label: 'Parent', value: mLabel, valueColor: 'text-purple-600' },
            { label: 'Status', value: this.humanizeStatus(c.status), valueColor: 'text-slate-600' },
          ]
        );
      });
    });

    (v.contract_files || []).forEach((file, idx) => {
      const docDate = updatedAt || v.created_at;
      const fileName = this.getFileName(file);
      this.addEvent(
        events, v, docDate,
        'description', 'bg-slate-100', 'text-slate-600',
        `Document "${fileName}" was uploaded for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''} by Admin on ${this.stmtDate(docDate)}.`,
        `doc-${idx}`, ['document'],
        [
          { label: 'File', value: fileName, valueColor: 'text-slate-700' },
          { label: 'Vendor', value: v.name, valueColor: 'text-primary' },
          ...(projectName ? [{ label: 'Project', value: projectName, valueColor: 'text-indigo-600' }] : []),
        ]
      );
    });

    return events;
  }

  private humanizeStatus(status: unknown): string {
    return String(status ?? 'pending').replace(/_/g, ' ');
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  private loadVendorRecord(vendor: Vendor): Promise<VendorRecord> {
    if (this.records[vendor.id]?.loading || this.records[vendor.id]?.loaded) {
      return Promise.resolve(this.records[vendor.id]);
    }

    const rec: VendorRecord = {
      vendor, loaded: false, loading: true,
      tasks: [], invoices: [], audits: [], laborWorkers: [],
      laborStats: { totalPersonnel: 0, onSite: 0, remaining: 0, activePersonnel: 0, skillCompliance: '0%', skillComposition: [] },
      projectData: null,
      milestones: [], milestoneMap: {}, subMilestoneMap: {}, taskMap: {},
      totalBilled: 0, totalPaid: 0, totalDailyLaborCost: 0,
      historyEvents: [],
    };

    this.records = { ...this.records, [vendor.id]: rec };

    return new Promise(resolve => {
      const invoices$ = this.http.get<any>(`${this.vendorApiBase}/${vendor.id}/invoices`).pipe(catchError(() => of(null)));
      const audits$ = this.http.get<any>(`${this.vendorApiBase}/${vendor.id}/audits`).pipe(catchError(() => of(null)));
      const labor$ = this.http.get<any>(`${environment.serverUrl}/api/v1/vendors_labor/vendor/${vendor.id}`).pipe(catchError(() => of(null)));
      const project$ = vendor.project_id ? this.projectService.getProjectById(vendor.project_id).pipe(take(1), catchError(() => of(null))) : of(null);
      const tasks$ = vendor.project_id ? this.projectService.getProjectTasks(vendor.project_id).pipe(take(1), catchError(() => of(null))) : of(null);
      const history$ = this.historyService.getVendorHistory(vendor.id, { limit: 200 }).pipe(catchError(() => of(null)));

      forkJoin({ invoices: invoices$, audits: audits$, labor: labor$, project: project$, tasks: tasks$, history: history$ })
        .subscribe({
          next: (results) => {
            const rawInv = results.invoices;
            rec.invoices = Array.isArray(rawInv) ? rawInv : Array.isArray(rawInv?.data) ? rawInv.data : [];
            rec.audits = this.extractAuditArray(results.audits);

            const rawLabor = results.labor;
            if (rawLabor) {
              rec.laborWorkers = Array.isArray(rawLabor.data) ? rawLabor.data : Array.isArray(rawLabor) ? rawLabor : [];
              if (rawLabor.stats) rec.laborStats = rawLabor.stats;
            }

            const projectRes = results.project;
            rec.projectData = (projectRes as any)?.data ?? projectRes ?? null;
            this.buildMilestoneMaps(rec);

            const tasksRes = results.tasks;
            rec.tasks = Array.isArray((tasksRes as any)?.data) ? (tasksRes as any).data : Array.isArray(tasksRes) ? (tasksRes as any) : [];
            this.buildTaskMap(rec);

            rec.historyEvents = (results.history as any)?.data || [];

            this.computeTotals(rec);
            rec.loaded = true;
            rec.loading = false;
            this.records = { ...this.records, [vendor.id]: { ...rec } };
            resolve(rec);
          },
          error: (err) => {
            console.error(`[VendorsHistory] Error loading ${vendor.name}:`, err);
            rec.loaded = true;
            rec.loading = false;
            this.records = { ...this.records, [vendor.id]: { ...rec } };
            resolve(rec);
          },
        });
    });
  }

  private buildMilestoneMaps(rec: VendorRecord): void {
    const raw = rec.projectData;
    const withChild: MilestoneNode[] =
      Array.isArray(raw?.milestones_with_child) ? raw.milestones_with_child
        : Array.isArray(raw?.milestonesWithChild) ? raw.milestonesWithChild
          : Array.isArray(raw?.milestones) ? raw.milestones
            : [];

    rec.milestones = withChild.filter(m => !m.parent_id);
    withChild.forEach(m => {
      if (!m.parent_id) { rec.milestoneMap[Number(m.id)] = m.name ?? m.title ?? `Milestone #${m.id}`; }
      else { rec.subMilestoneMap[Number(m.id)] = m.name ?? m.title ?? `Sub-Milestone #${m.id}`; }
      (m.children || []).forEach(c => {
        rec.subMilestoneMap[Number(c.id)] = c.name ?? c.title ?? `Sub-Milestone #${c.id}`;
      });
    });

    const childMap: Record<string, MilestoneNode[]> = {};
    withChild.forEach(m => {
      if (m.parent_id) {
        const key = String(m.parent_id);
        if (!childMap[key]) childMap[key] = [];
        childMap[key].push(m);
      }
    });
    rec.milestones.forEach(m => {
      if (!m.children || m.children.length === 0) m.children = childMap[String(m.id)] || [];
    });
  }

  private buildTaskMap(rec: VendorRecord): void {
    rec.tasks.forEach((t: any) => { rec.taskMap[Number(t.id)] = t.title ?? `Task #${t.id}`; });
  }

  private computeTotals(rec: VendorRecord): void {
    rec.totalBilled = rec.invoices.filter(i => i.status !== 'Cancelled').reduce((s, i) => s + (Number(i.grand_total) || 0), 0);
    rec.totalPaid = rec.invoices.reduce((s, i) => s + (Number(i.paid_amount) || 0), 0);
    rec.totalDailyLaborCost = rec.laborWorkers.reduce((s, w) => s + (Number(w.daily_rate) || 0) * (w.labor_count || 0), 0);
  }

  budgetUsage(rec: VendorRecord): { allocated: number; invoiced: number; percent: number; exceeded: boolean; exceededBy: number } {
    const allocated = Number(rec.vendor.budget_allocation) || 0;
    const invoiced = rec.totalBilled;
    const percent = allocated > 0 ? Math.round((invoiced / allocated) * 100) : 0;
    const exceeded = allocated > 0 && invoiced > allocated;
    return { allocated, invoiced, percent, exceeded, exceededBy: exceeded ? invoiced - allocated : 0 };
  }

  getInvoiceItems(inv: VendorInvoice): any[] {
    if (Array.isArray(inv.items)) return inv.items;
    try { const parsed = JSON.parse(inv.items as any); return Array.isArray(parsed) ? parsed : []; } catch { return []; }
  }

  resolveSettlement(rec: VendorRecord, inv: VendorInvoice): ResolvedSettlement | null {
    if (!inv.settlement_type) return null;
    return {
      type: this.settlementLabel(inv.settlement_type),
      completion: inv.settlement_completion ?? null,
      milestoneNames: (inv.milestone_ids || []).map(id => rec.milestoneMap[Number(id)] ?? `Milestone #${id}`),
      subMilestoneNames: (inv.sub_milestone_ids || []).map(id => rec.subMilestoneMap[Number(id)] ?? `Sub-Milestone #${id}`),
      taskNames: (inv.task_ids || []).map(id => rec.taskMap[Number(id)] ?? `Task #${id}`),
    };
  }

  settlementLabel(type: string): string {
    const map: Record<string, string> = { work_poc: 'Work POC', milestone: 'Milestone', lumpsum: 'Lump Sum' };
    return map[type] ?? type;
  }

  remainingAmount(inv: VendorInvoice): number {
    return Math.max(0, this.toNumber(inv.grand_total) - this.toNumber(inv.paid_amount));
  }

  getVendorInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  getLatestInvoiceDate(rec: VendorRecord): string | null {
    if (!rec.invoices.length) return null;
    return [...rec.invoices].sort((a, b) => new Date(b.invoice_date).getTime() - new Date(a.invoice_date).getTime())[0].invoice_date;
  }

  getFileName(filePath: string): string { return filePath.split('/').pop() ?? filePath; }

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

  toNumber(val: any): number { return Number(val) || 0; }

  projectDurationLabel(projectData: any): string {
    if (!projectData) return '—';
    const start = projectData.start_date || projectData.startDate || projectData.createdAt || projectData.created_at;
    const end = projectData.completion_date || projectData.completionDate || projectData.end_date || projectData.endDate;
    if (!start) return '—';
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;
    if (!endDate) return `Started ${this.formatDate(startDate)} · Ongoing`;
    const now = new Date();
    if (now > endDate) return `${this.formatDate(startDate)} → ${this.formatDate(endDate)} · Completed`;
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / 86_400_000);
    return `${this.formatDate(startDate)} → ${this.formatDate(endDate)} · ${daysLeft} day(s) left`;
  }


  viewInvoice(rec: VendorRecord, inv: VendorInvoice): void {
    const invoiceItems = this.getInvoiceItems(inv);
    const gstMap: Record<number, number> = {};
    invoiceItems.forEach((item: any) => {
      const rate = Number(item.gst) || 0;
      const amt = Number(item.gstAmount) || 0;
      if (amt > 0) gstMap[rate] = (gstMap[rate] || 0) + amt;
    });
    const taxRows = Object.entries(gstMap).sort(([a], [b]) => Number(a) - Number(b)).map(([rate, amount]) => `
      <div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
        <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
        <span style="font-weight:600;">₹${Number(amount).toLocaleString('en-IN')}</span>
      </div>`).join('');
    const hasLabor = invoiceItems.some((i: any) => i.type === 'labor');
    const itemRows = invoiceItems.map((item: any) => {
      const isLabor = item.type === 'labor';
      const typeLabel = item.type ? String(item.type).charAt(0).toUpperCase() + String(item.type).slice(1) : '—';
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
          <tbody>${paymentHistory.map((p, i) => `
            <tr>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${i + 1}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${this.formatDate(p.paid_at || p.payment_date || p.date)}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.mode || '—'}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.reference || '—'}${p.clearance_date ? ' (Clr: ' + this.formatDate(p.clearance_date) + ')' : ''}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;text-align:right;">₹${Number(p.amount).toLocaleString('en-IN')}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>` : '';
    const html = `<!DOCTYPE html><html><head><title>Invoice ${inv.invoice_number}</title>
<style>body{font-family:sans-serif;padding:40px;color:#1e293b;}h1{font-size:24px;font-weight:900;margin:0;}
table{width:100%;border-collapse:collapse;margin-top:16px;}th{background:#f1f5f9;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;}
@media print{button{display:none!important;}}</style></head><body>
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
  <table><thead><tr>
    <th>Type</th><th>Description</th><th style="text-align:center;">Qty</th>
    ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ''}
    <th style="text-align:right;">Rate (₹)</th><th style="text-align:center;">Tax %</th>
    <th style="text-align:right;">Tax (₹)</th><th style="text-align:right;">Total (₹)</th>
  </tr></thead><tbody>${itemRows}</tbody></table>
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
    </div>`: ''}
  </div>
  ${settlementBlock}${paymentRows}
  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()" style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body></html>`;
    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }


  downloadVendorReport(rec: VendorRecord): void {
    const v = rec.vendor;
    const projectName = rec.projectData?.name || 'Project not linked';
    const usage = this.budgetUsage(rec);
    const invoiceRows = rec.invoices.map(inv => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${inv.invoice_number}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${this.formatDate(inv.invoice_date)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(inv.grand_total)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(inv.paid_amount)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${inv.status}</td>
      </tr>`).join('');
    const auditRows = rec.audits.map((a: any) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${this.formatDate(a.audit_date || a.auditDate || a.createdAt || a.created_at)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.quality}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.timeliness}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.safety}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:700;">${Math.round(Number(a.composite_score ?? a.compositeScore ?? 0))}%</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${a.observations || '—'}</td>
      </tr>`).join('');
    const laborRows = rec.laborWorkers.map(w => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${w.skill}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${w.labor_count}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${w.assign_worker || '—'}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(w.daily_rate)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">${this.formatAmount(Number(w.daily_rate) * (w.labor_count || 0))}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${(w as any).statusLabel || w.status}</td>
      </tr>`).join('');
    const html = `<!DOCTYPE html><html><head><title>Vendor Report — ${v.name}</title>
<style>body{font-family:sans-serif;padding:36px;color:#1e293b;}h1{font-size:22px;font-weight:900;margin:0 0 4px;}
h2{font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:#475569;margin:28px 0 10px;border-bottom:2px solid #e2e8f0;padding-bottom:6px;}
table{width:100%;border-collapse:collapse;margin-top:6px;}th{background:#f1f5f9;padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;}
@media print{button{display:none!important;}}</style></head><body>
  <h1>Vendor Report — ${v.name}</h1>
  <p style="color:#64748b;margin:0 0 8px;">Generated on ${this.formatDate(new Date())}</p>
  <h2>Vendor Profile</h2>
  <p><strong>Added On:</strong> ${this.formatDate((v as any).created_at)}</p>
  <p><strong>SPOC:</strong> ${v.spoc.name} · ${v.spoc.phone}</p>
  <p><strong>Email:</strong> ${v.email} · <strong>Phone:</strong> ${v.phone}</p>
  <p><strong>GST:</strong> ${v.kyc.gst || '—'} &nbsp;&nbsp; <strong>PAN:</strong> ${v.kyc.pan || '—'}</p>
  <p><strong>Address:</strong> ${v.address.street}, ${v.address.pincode}</p>
  <p><strong>Skills:</strong> ${v.skill.join(', ') || '—'}</p>
  <p><strong>Budget Allocated:</strong> ${this.formatAmount(v.budget_allocation)} &nbsp;&nbsp; <strong>Compliance Score:</strong> ${v.compliance_score}%</p>
  <p><strong>Budget Utilized:</strong> ${usage.percent}% (${this.formatAmount(usage.invoiced)} of ${this.formatAmount(usage.allocated)})${usage.exceeded ? ' — EXCEEDED by ' + this.formatAmount(usage.exceededBy) : ''}</p>
  <p><strong>Project:</strong> ${projectName} &nbsp;&nbsp; <strong>Duration:</strong> ${this.projectDurationLabel(rec.projectData)}</p>
  <h2>Invoices (${rec.invoices.length}) — Billed: ${this.formatAmount(rec.totalBilled)} | Paid: ${this.formatAmount(rec.totalPaid)}</h2>
  <table><thead><tr><th>Invoice #</th><th>Date</th><th style="text-align:right;">Amount</th><th style="text-align:right;">Paid</th><th>Status</th></tr></thead>
  <tbody>${invoiceRows || '<tr><td colspan="5" style="padding:12px;text-align:center;color:#94a3b8;">No invoices</td></tr>'}</tbody></table>
  <h2>Compliance Audits (${rec.audits.length})</h2>
  <table><thead><tr><th>Date</th><th style="text-align:center;">Quality</th><th style="text-align:center;">Timeliness</th><th style="text-align:center;">Safety</th><th style="text-align:center;">Score</th><th>Observations</th></tr></thead>
  <tbody>${auditRows || '<tr><td colspan="6" style="padding:12px;text-align:center;color:#94a3b8;">No audits</td></tr>'}</tbody></table>
  <h2>Labor (${rec.laborWorkers.length}) — Daily Cost: ${this.formatAmount(rec.totalDailyLaborCost)}</h2>
  <table><thead><tr><th>Skill</th><th style="text-align:center;">Count</th><th>Assigned To</th><th style="text-align:right;">Rate/day</th><th style="text-align:right;">Cost/day</th><th>Status</th></tr></thead>
  <tbody>${laborRows || '<tr><td colspan="6" style="padding:12px;text-align:center;color:#94a3b8;">No labor records</td></tr>'}</tbody></table>
  <div style="margin-top:30px;text-align:center;">
    <button onclick="window.print()" style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body></html>`;
    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }

  async exportAllToCsv(): Promise<void> {
    if (this.exporting) return;
    this.exporting = true;
    try {
      const vendorsToExport = this.displayVendors;
      const pending = vendorsToExport.filter(v => !this.records[v.id]?.loaded && !this.records[v.id]?.loading);
      await Promise.all(pending.map(v => this.loadVendorRecord(v)));
      await new Promise<void>(res => {
        const check = () => {
          const stillLoading = vendorsToExport.some(v => this.records[v.id]?.loading);
          if (!stillLoading) { res(); } else { setTimeout(check, 200); }
        };
        check();
      });
      const rows: string[] = [];
      rows.push('Vendor,Project,Record Type,Reference,Date,Amount,Status,Details');
      const esc = (val: any) => `"${String(val ?? '—').replace(/"/g, '""')}"`;
      vendorsToExport.forEach(v => {
        const rec = this.records[v.id];
        if (!rec) return;
        const projectName = rec.projectData?.name || 'Not linked';
        rec.invoices.forEach(inv => {
          rows.push([esc(v.name), esc(projectName), esc('Invoice'), esc(inv.invoice_number), esc(this.formatDate(inv.invoice_date)), esc(this.toNumber(inv.grand_total)), esc(inv.status), esc(`Paid: ${this.formatAmount(inv.paid_amount)}`)].join(','));
          (inv.payment_history || []).forEach(p => {
            rows.push([esc(v.name), esc(projectName), esc('Payment'), esc(inv.invoice_number), esc(this.formatDate((p as any).paid_at || (p as any).payment_date)), esc(this.toNumber((p as any).amount)), esc((p as any).mode), esc((p as any).reference ? `Ref: ${(p as any).reference}` : '—')].join(','));
          });
        });
        rec.audits.forEach((a: any) => {
          rows.push([esc(v.name), esc(projectName), esc('Audit'), esc('—'), esc(this.formatDate(a.audit_date || a.auditDate || a.createdAt || a.created_at)), esc('—'), esc(`${Math.round(Number(a.composite_score ?? a.compositeScore ?? 0))}%`), esc(a.observations || '—')].join(','));
        });
        rec.laborWorkers.forEach(w => {
          rows.push([esc(v.name), esc(projectName), esc('Labor'), esc(w.skill), esc('—'), esc(this.toNumber(w.daily_rate) * (w.labor_count || 0)), esc((w as any).statusLabel || w.status), esc(`Count: ${w.labor_count} · Assigned: ${w.assign_worker || 'Unassigned'}`)].join(','));
        });
        rec.tasks.forEach((t: any) => {
          rows.push([esc(v.name), esc(projectName), esc('Task'), esc(t.title), esc(this.formatDate(t.due_date || t.dueDate)), esc('—'), esc(t.status), esc(`Subtasks: ${(t.subtasks || []).length}`)].join(','));
        });
        rec.milestones.forEach(m => {
          rows.push([esc(v.name), esc(projectName), esc('Milestone'), esc(m.name || m.title), esc(`${this.formatDate(m.start_date)} → ${this.formatDate(m.end_date)}`), esc('—'), esc(m.status || '—'), esc(`Sub-milestones: ${(m.children || []).length}`)].join(','));
        });
        const allocated = Number(v.budget_allocation) || 0;
        rows.push([esc(v.name), esc(projectName), esc('Budget'), esc('Allocation Summary'), esc(this.formatDate(v.created_at)), esc(allocated), esc(allocated > 0 && rec.totalBilled > allocated ? 'Exceeded' : 'Within Budget'), esc(`Invoiced: ${this.formatAmount(rec.totalBilled)} | Paid: ${this.formatAmount(rec.totalPaid)} | Remaining: ${this.formatAmount(Math.max(0, allocated - rec.totalBilled))}`)].join(','));
      });
      if (rows.length <= 1) { alert('No data to export.'); return; }
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