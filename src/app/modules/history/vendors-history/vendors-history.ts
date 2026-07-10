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
export interface EventMeta {
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
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

  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
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

export interface FlatDateGroup {
  dateKey: string;
  date: Date;
  events: HistoryEvent[];
}

export interface VendorDateGroup {
  date: Date;
  events: HistoryEvent[];
}

export interface VendorGroup {
  vendor: Vendor;
  events: HistoryEvent[];
  dateGroups: VendorDateGroup[];
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

interface AddEventOptions {
  rawDate: any;
  icon: string;
  iconBg: string;
  iconColor: string;
  description: string;
  idSuffix: string;
  categories: ConcreteCategory[];
  subDetails?: EventSubDetail[];
  viewAction?: () => void;
  budgetMeta?: BudgetEventMeta;
  meta?: EventMeta;
  createdRawDate?: any;
  updatedRawDate?: any;
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

function cleanNameStandalone(val: any): string | null {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  if (!str) return null;
  if (str.toLowerCase() === 'unknown') return null;
  if (str.includes('@')) return null;
  return str;
}

function buildHistoryMeta(
  action: string,
  formattedDateTime: string,
  changedByName: string | null,
  fallbackUser: string,
  entityCreatedAtFormatted?: string | null,
  entityCreatedByName?: string | null
): EventMeta {
  const actor = cleanNameStandalone(changedByName) || fallbackUser;
  const meta: EventMeta = {};

  if (entityCreatedAtFormatted) {
    meta.createdAt = entityCreatedAtFormatted;
    meta.createdBy = cleanNameStandalone(entityCreatedByName) || actor;
  }

  if (action === 'created') {
    if (!meta.createdAt) {
      meta.createdAt = formattedDateTime;
      meta.createdBy = actor;
    }
    return meta;
  }

  meta.updatedAt = formattedDateTime;
  meta.updatedBy = actor;

  if (!meta.createdAt) {
    meta.createdAt = formattedDateTime;
    meta.createdBy = actor;
  }

  return meta;
}
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

  selectedVendorIds: Set<string> = new Set();
  vendorDropdownOpen = false;
  dropdownSearch = '';
  activeCategory: HistoryCategory = 'all';
  searchQuery: string = '';

  readonly pageSize = 20;
  currentPage = 1;

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
  ];

  private cleanName(val: any): string | null {
    if (val === null || val === undefined) return null;
    const str = String(val).trim();
    if (!str) return null;
    if (str.toLowerCase() === 'unknown') return null;
    if (str.includes('@')) return null;
    return str;
  }

  private get currentUserDisplayName(): string {
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        const user = JSON.parse(raw);
        return `${user?.firstname} ${user?.lastname}` || user?.username || 'Unknown';
      }
    } catch {

    }
    return 'Unknown';
  }

  getCategoryBadgeClass(cat: ConcreteCategory): string {
    return CATEGORY_META[cat]?.badgeClass ?? 'bg-slate-100 text-slate-600';
  }

  getCategoryLabel(cat: ConcreteCategory): string {
    return CATEGORY_META[cat]?.label ?? cat;
  }

  ngOnInit(): void {
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      this.selectedVendorIds = new Set(v.map(vendor => vendor.id));
      v.forEach(vendor => this.ensureVendorLoaded(vendor));
    });

    if (this.vendorService.getVendors().length === 0) {
      this.vendorService.loadVendors();
    } else {
      const existing = this.vendorService.getVendors();
      this.vendors = existing;
      this.selectedVendorIds = new Set(existing.map(v => v.id));
      existing.forEach(v => this.ensureVendorLoaded(v));
    }
  }

  private ensureVendorLoaded(vendor: Vendor): void {
    if (!this.records[vendor.id]?.loaded && !this.records[vendor.id]?.loading) {
      this.loadVendorRecord(vendor);
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
    if (this.selectedVendorIds.size === 0 || this.isAllSelected) return 'All Vendors';
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
      this.vendors.forEach(v => this.ensureVendorLoaded(v));
    }
    this._flatCache = null;
    this.currentPage = 1;
  }

  toggleVendorSelection(vendor: Vendor): void {
    const newSet = new Set(this.selectedVendorIds);
    if (newSet.has(vendor.id)) {
      newSet.delete(vendor.id);
    } else {
      newSet.add(vendor.id);
      this.ensureVendorLoaded(vendor);
    }
    this.selectedVendorIds = newSet;
    this._flatCache = null;
    this.currentPage = 1;
  }

  removeVendorSelection(id: string): void {
    const newSet = new Set(this.selectedVendorIds);
    newSet.delete(id);
    this.selectedVendorIds = newSet;
    this._flatCache = null;
    this.currentPage = 1;
  }

  clearAllSelections(): void {
    this.selectedVendorIds = new Set();
    this._flatCache = null;
    this.currentPage = 1;
  }

  getVendorNameById(id: string): string {
    return this.vendors.find(v => v.id === id)?.name ?? id;
  }

  setActiveCategory(key: HistoryCategory): void {
    this.activeCategory = key;
    this.currentPage = 1;
  }

  onSearchChange(): void {
    this._flatCache = null;
    this.currentPage = 1;
  }

  getCategoryCount(key: HistoryCategory): number {
    const matched = key === 'all'
      ? this.timelineEvents
      : this.timelineEvents.filter(ev => ev.categories.includes(key as ConcreteCategory));

    const dateMap = new Map<string, HistoryEvent[]>();
    matched.forEach(ev => {
      const dk = this.dateKey(ev.date);
      if (!dateMap.has(dk)) dateMap.set(dk, []);
      dateMap.get(dk)!.push(ev);
    });

    let total = 0;
    dateMap.forEach(evs => {
      const fakeGroup = { events: evs } as any;
      total += this.countEventsInDateGroup(fakeGroup);
    });

    return total;
  }

  get activeCount(): number { return this.vendors.filter(v => v.status.toLowerCase() === 'active').length; }
  get pendingCount(): number { return this.vendors.filter(v => v.status.toLowerCase() === 'pending').length; }
  get inactiveCount(): number { return this.vendors.filter(v => v.status.toLowerCase() === 'inactive').length; }

  get displayVendors(): Vendor[] {
    return this.vendors.filter(v => this.selectedVendorIds.has(v.id));
  }

  get isTimelineLoading(): boolean {
    return this.displayVendors.some(v => !this.records[v.id] || this.records[v.id].loading);
  }

  private buildLaborDescription(
    vendorName: string, skill: string, count: number, dailyRate: number, status: string
  ): string {
    const dailyCost = dailyRate * count;
    const statusCap = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Active';
    const noun = count === 1 ? 'laborer' : 'laborers';
    const verb = count === 1 ? 'was' : 'were';
    return `${count} ${skill} ${noun} ${verb} added to Vendor "${vendorName}" at a daily rate of ${this.formatAmount(dailyRate)} per laborer (total daily cost ${this.formatAmount(dailyCost)}). Current status: ${statusCap}.`;
  }

  private _timelineCache: { key: string; events: HistoryEvent[] } | null = null;

  get timelineEvents(): HistoryEvent[] {
    const selectedKey = [...this.selectedVendorIds].sort().join(',');
    const loadedKey = this.displayVendors
      .filter(v => this.records[v.id]?.loaded)
      .map(v => v.id).join(',');
    const key = `${selectedKey}|${loadedKey}`;

    if (this._timelineCache?.key === key) return this._timelineCache.events;

    const events: HistoryEvent[] = [];
    this.displayVendors.forEach(v => {
      const rec = this.records[v.id];
      if (rec?.loaded) events.push(...this.buildVendorEvents(rec));
    });
    const sorted = events.sort((a, b) => b.date.getTime() - a.date.getTime());
    this._timelineCache = { key, events: sorted };
    return sorted;
  }

  get filteredTimelineEvents(): HistoryEvent[] {
    let events = this.activeCategory === 'all'
      ? this.timelineEvents
      : this.timelineEvents.filter(ev =>
        ev.categories.includes(this.activeCategory as ConcreteCategory)
      );

    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      events = events.filter(ev =>
        ev.description?.toLowerCase().includes(q) ||
        ev.vendorName?.toLowerCase().includes(q) ||
        ev.createdBy?.toLowerCase().includes(q) ||
        ev.updatedBy?.toLowerCase().includes(q) ||
        ev.subDetails?.some(d => d.value?.toLowerCase().includes(q))
      );
    }

    return events;
  }

  get totalFilteredEvents(): number {
    return this.filteredTimelineEvents.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalFilteredEvents / this.pageSize));
  }

  get paginatedTimelineEvents(): HistoryEvent[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTimelineEvents.slice(start, start + this.pageSize);
  }

  get pageStartIndex(): number {
    return this.totalFilteredEvents === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get pageEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalFilteredEvents);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  private _flatCache: { key: string; cat: string; groups: FlatDateGroup[] } | null = null;

  get flatDateGroups(): FlatDateGroup[] {
    const selectedKey = [...this.selectedVendorIds].sort().join(',');
    const loadedKey = this.displayVendors
      .filter(v => this.records[v.id]?.loaded)
      .map(v => v.id).join(',');

    const cacheKey = `${selectedKey}|${loadedKey}|${this.activeCategory}|${this.searchQuery}|${this.currentPage}`;

    if (this._flatCache?.key === cacheKey) return this._flatCache.groups;

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const events = this.paginatedTimelineEvents;

    const dateMap = new Map<string, { date: Date; events: HistoryEvent[] }>();
    events.forEach(ev => {
      const dk = this.dateKey(ev.date);
      if (!dateMap.has(dk)) {
        dateMap.set(dk, { date: ev.date, events: [] });
      }
      dateMap.get(dk)!.events.push(ev);
    });

    const groups: FlatDateGroup[] = Array.from(dateMap.entries())
      .map(([dk, val]) => ({
        dateKey: dk,
        date: val.date,
        events: val.events.sort((a, b) => b.date.getTime() - a.date.getTime()),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    this._flatCache = { key: cacheKey, cat: this.activeCategory, groups };
    return groups;
  }

  countEventsInDateGroup(dGroup: VendorDateGroup | FlatDateGroup): number {
    let count = dGroup.events.length;
    dGroup.events.forEach(ev => {
      if (ev.budgetMeta && ev.id.includes('-onboard')) count++;
    });
    return count;
  }

  private dateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private parseDate(rawDate: any): Date | null {
    if (!rawDate) return null;
    const d = new Date(rawDate);
    return isNaN(d.getTime()) ? null : d;
  }

  private addEvent(events: HistoryEvent[], vendor: Vendor, opts: AddEventOptions): void {
    const hasCreated = !!(opts.meta?.createdAt || opts.meta?.createdBy);
    const hasUpdated = !!(opts.meta?.updatedAt || opts.meta?.updatedBy);

    if (hasCreated && hasUpdated) {

      const createdDate = this.parseDate(opts.createdRawDate ?? opts.rawDate);
      if (createdDate) {
        events.push({
          id: `${vendor.id}-${opts.idSuffix}-created`,
          vendorId: vendor.id,
          vendorName: vendor.name,
          date: createdDate,
          icon: opts.icon,
          iconBg: opts.iconBg,
          iconColor: opts.iconColor,
          description: opts.description,
          categories: opts.categories,
          primaryCategory: opts.categories[0],
          subDetails: opts.subDetails,
          viewAction: opts.viewAction,
          budgetMeta: opts.budgetMeta,
          createdAt: opts.meta?.createdAt,
          createdBy: opts.meta?.createdBy,
        });
      }

      const updatedDate = this.parseDate(opts.updatedRawDate ?? opts.rawDate);
      if (updatedDate) {
        events.push({
          id: `${vendor.id}-${opts.idSuffix}-updated`,
          vendorId: vendor.id,
          vendorName: vendor.name,
          date: updatedDate,
          icon: opts.icon,
          iconBg: opts.iconBg,
          iconColor: opts.iconColor,
          description: opts.description,
          categories: opts.categories,
          primaryCategory: opts.categories[0],
          subDetails: opts.subDetails,
          viewAction: opts.viewAction,
          updatedAt: opts.meta?.updatedAt,
          updatedBy: opts.meta?.updatedBy,
        });
      }
      return;
    }

    const d = this.parseDate(opts.rawDate);
    if (!d) return;
    events.push({
      id: `${vendor.id}-${opts.idSuffix}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      date: d,
      icon: opts.icon,
      iconBg: opts.iconBg,
      iconColor: opts.iconColor,
      description: opts.description,
      categories: opts.categories,
      primaryCategory: opts.categories[0],
      subDetails: opts.subDetails,
      viewAction: opts.viewAction,
      budgetMeta: opts.budgetMeta,
      createdAt: opts.meta?.createdAt,
      createdBy: opts.meta?.createdBy,
      updatedAt: opts.meta?.updatedAt,
      updatedBy: opts.meta?.updatedBy,
    });
  }

  private buildMeta(
    createdAtRaw: any,
    createdByRaw: any,
    updatedAtRaw?: any,
    updatedByRaw?: any
  ): EventMeta {
    const fallbackUser = this.currentUserDisplayName;
    const meta: EventMeta = {
      createdAt: createdAtRaw ? this.formatDateTime(createdAtRaw) : undefined,
      createdBy: createdAtRaw
        ? (this.cleanName(createdByRaw) || this.cleanName(updatedByRaw) || fallbackUser)
        : undefined,
    };

    if (updatedAtRaw) {
      const updatedMs = new Date(updatedAtRaw).getTime();
      if (!isNaN(updatedMs)) {
        meta.updatedAt = this.formatDateTime(updatedAtRaw);
        meta.updatedBy = this.cleanName(updatedByRaw) || fallbackUser;
      }
    }

    return meta;
  }

  private resolveDate(obj: any, ...fields: string[]): string | null {
    for (const f of fields) {
      const val = obj?.[f];
      if (val) { const d = new Date(val); if (!isNaN(d.getTime())) return val; }
    }
    return null;
  }

  private dateObjToStmt(d: Date | null): string {
    if (!d || isNaN(d.getTime())) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    return `${dd}-${mmm}-${d.getFullYear()}`;
  }

  private extractAuditArray(raw: any): any[] {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw.data)) return raw.data;
    if (Array.isArray(raw.audits)) return raw.audits;
    if (Array.isArray(raw.data?.audits)) return raw.data.audits;
    return [];
  }

  formatDateTime(dateInput: string | Date | undefined | null): string {
    if (!dateInput) return '—';
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime())) return '—';
    return `${this.formatDate(d)}, ${this.formatTime(d)}`;
  }

  private stmtDate(dateInput: string | Date | undefined | null): string {
    if (!dateInput) return '—';
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime())) return '—';
    return this.dateObjToStmt(d);
  }

  private buildBudgetMeta(allocated: number, totalBilled: number, totalPaid: number): BudgetEventMeta {
    const invoiced = totalBilled;
    const utilizationPercent = allocated > 0
      ? Math.min(Math.round((invoiced / allocated) * 100), 999) : 0;
    const exceeded = invoiced > allocated;
    return {
      allocated,
      invoiced,
      paid: totalPaid,
      remaining: Math.max(0, allocated - invoiced),
      utilizationPercent,
      exceeded,
      exceededBy: exceeded ? invoiced - allocated : 0,
    };
  }

  private buildVendorEvents(rec: VendorRecord): HistoryEvent[] {
    const v = rec.vendor;
    const events: HistoryEvent[] = [];
    const allocated = Number(v.budget_allocation) || 0;
    const projectName = rec.projectData?.name || null;
    const updatedAt = (v as any).updated_at;
    const updatedBy = (v as any).updated_by_name || null;

    const creationInfoMap = new Map<string, { name: string; at: string }>();
    rec.historyEvents
      .filter(h => h.action === 'created')
      .forEach(h => {
        const key = `${h.entity_type}-${h.entity_id ?? 'vendor'}`;
        const cleanedName = this.cleanName(h.changed_by_name);
        if (!creationInfoMap.has(key) && cleanedName) {
          creationInfoMap.set(key, { name: cleanedName, at: h.createdAt });
        }
      });

    const getCreator = (entityType: string, entityId: number | string | null): { name: string; at: string } | null => {
      const key = `${entityType}-${entityId ?? 'vendor'}`;
      return creationInfoMap.get(key) || null;
    };

    const vendorCreationInfo = getCreator('vendor', null);
    const createdBy =
      this.cleanName(vendorCreationInfo?.name) ||
      this.cleanName((v as any).created_by_name) ||
      this.cleanName(updatedBy) ||
      this.currentUserDisplayName;

    this.addEvent(events, v, {
      rawDate: v.created_at,
      createdRawDate: vendorCreationInfo?.at || v.created_at,
      updatedRawDate: updatedAt,
      icon: 'person_add',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      description: `Vendor "${v.name}" was onboarded.`,
      idSuffix: 'onboard',
      categories: ['vendor'],
      subDetails: [
        { label: 'Vendor', value: v.name, valueColor: 'text-pink-600' },
        { label: 'Added On', value: this.stmtDate(v.created_at), valueColor: 'text-slate-500' },
        { label: 'Status', value: v.status, valueColor: v.status.toLowerCase() === 'active' ? 'text-green-600' : 'text-amber-600' },
        { label: 'SPOC', value: `${v.spoc?.name || '—'} · ${v.spoc?.phone || '—'}`, valueColor: 'text-slate-700' },
        { label: 'Email', value: v.email || '—', valueColor: 'text-slate-600' },
        { label: 'Phone', value: v.phone || '—', valueColor: 'text-slate-600' },
        { label: 'GST', value: v.kyc?.gst || '—', valueColor: 'text-slate-500' },
        { label: 'PAN', value: v.kyc?.pan || '—', valueColor: 'text-slate-500' },
        { label: 'Budget', value: allocated > 0 ? this.formatAmount(allocated) : 'Not allocated', valueColor: 'text-violet-600' },
        { label: 'Compliance', value: `${v.compliance_score}%`, valueColor: v.compliance_score >= 90 ? 'text-green-600' : v.compliance_score >= 70 ? 'text-amber-600' : 'text-red-500' },
        { label: 'Skills', value: v.skill?.length ? v.skill.join(', ') : 'Not specified', valueColor: 'text-slate-600' },
        ...(projectName ? [{ label: 'Project', value: projectName, valueColor: 'text-indigo-600' }] : []),
      ],
      budgetMeta: allocated > 0 ? this.buildBudgetMeta(allocated, rec.totalBilled, rec.totalPaid) : undefined,
      meta: this.buildMeta(vendorCreationInfo?.at || v.created_at, createdBy, updatedAt, updatedBy),
    });


    if (projectName) {
      this.addEvent(events, v, {
        rawDate: v.created_at,
        createdRawDate: vendorCreationInfo?.at || v.created_at,
        updatedRawDate: updatedAt,
        icon: 'folder_special',
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        description: `Vendor "${v.name}" was linked to Project "${projectName}". Current status: ${v.status}.`,
        idSuffix: 'project-link',
        categories: ['project'],
        subDetails: [
          { label: 'Vendor', value: v.name, valueColor: 'text-pink-600' },
          { label: 'Project', value: projectName, valueColor: 'text-indigo-600' },
          { label: 'Status', value: v.status, valueColor: v.status.toLowerCase() === 'active' ? 'text-green-600' : 'text-amber-600' },
          { label: 'Since', value: this.stmtDate(v.created_at), valueColor: 'text-slate-500' },
        ],
        meta: this.buildMeta(vendorCreationInfo?.at || v.created_at, createdBy, updatedAt, updatedBy),
      });
    }


    if (allocated > 0 && rec.totalBilled > allocated) {
      const exceededBy = rec.totalBilled - allocated;
      const latestInvDate = this.getLatestInvoiceDate(rec);
      const utilPct = Math.round((rec.totalBilled / allocated) * 100);
      this.addEvent(events, v, {
        rawDate: latestInvDate || v.created_at,
        icon: 'warning',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        description: `Budget for Vendor "${v.name}" was exceeded by ${this.formatAmount(exceededBy)} (${utilPct}% utilized).`,
        idSuffix: 'budget-exceeded',
        categories: ['budget'],
        subDetails: [
          { label: 'Allocated', value: this.formatAmount(allocated), valueColor: 'text-violet-600' },
          { label: 'Invoiced', value: this.formatAmount(rec.totalBilled), valueColor: 'text-red-500' },
          { label: 'Exceeded By', value: this.formatAmount(exceededBy), valueColor: 'text-red-600' },
        ],
        meta: { createdAt: this.formatDateTime(latestInvDate || v.created_at), createdBy },
      });
    }

    const invoiceHistoryMap = new Map<string, VendorHistoryEvent>();
    rec.historyEvents
      .filter(h => h.entity_type === 'invoice' && h.entity_id != null)
      .forEach(h => {
        const key = String(h.entity_id);
        const existing = invoiceHistoryMap.get(key);
        if (!existing || new Date(h.createdAt) >= new Date(existing.createdAt)) {
          invoiceHistoryMap.set(key, h);
        }
      });
    const invoiceIdsWithHistory = new Set(invoiceHistoryMap.keys());

    const laborHistoryMap = new Map<string, VendorHistoryEvent>();
    rec.historyEvents
      .filter(h => h.entity_type === 'labor' && h.entity_id != null)
      .forEach(h => {
        const key = String(h.entity_id);
        const existing = laborHistoryMap.get(key);
        if (!existing || new Date(h.createdAt) >= new Date(existing.createdAt)) {
          laborHistoryMap.set(key, h);
        }
      });
    const laborIdsWithHistory = new Set(laborHistoryMap.keys());

    rec.invoices.forEach((inv, idx) => {
      if (invoiceIdsWithHistory.has(String(inv.id))) return;

      const statusColorMap: Record<string, string> = {
        'Paid': 'text-green-600',
        'Unpaid': 'text-amber-600',
        'Pending': 'text-amber-600',
        'Partially Paid': 'text-blue-600',
        'Cancelled': 'text-red-500',
      };
      const statusColor = statusColorMap[inv.status] ?? 'text-slate-600';

      let icon = 'receipt_long', iconBg = 'bg-amber-100', iconColor = 'text-amber-600';
      if (inv.status === 'Paid') { icon = 'payments'; iconBg = 'bg-green-100'; iconColor = 'text-green-600'; }
      else if (inv.status === 'Cancelled') { icon = 'cancel'; iconBg = 'bg-red-100'; iconColor = 'text-red-600'; }

      const subDetails: EventSubDetail[] = [
        { label: 'Invoice', value: inv.invoice_number, valueColor: 'text-slate-700' },
        { label: 'Amount', value: this.formatAmount(inv.grand_total), valueColor: 'text-amber-700' },
        { label: 'Paid', value: this.formatAmount(inv.paid_amount), valueColor: 'text-green-600' },
        { label: 'Status', value: inv.status, valueColor: statusColor },
      ];
      const remainingAmt = this.remainingAmount(inv);
      if (remainingAmt > 0 && inv.status !== 'Cancelled') {
        subDetails.push({ label: 'Remaining', value: this.formatAmount(remainingAmt), valueColor: 'text-red-500' });
      }

      const invCreationInfo = getCreator('invoice', inv.id);
      const invCreatedAt = invCreationInfo?.at || (inv as any).created_at || (inv as any).createdAt || inv.invoice_date;
      const invUpdatedAt = (inv as any).updated_at || (inv as any).updatedAt;
      const invUpdatedBy = (inv as any).updated_by_name || (inv as any).updatedByName;
      const invCreatedBy =
        this.cleanName(invCreationInfo?.name) ||
        this.cleanName((inv as any).created_by_name) ||
        this.cleanName((inv as any).createdByName) ||
        this.cleanName(invUpdatedBy) ||
        this.currentUserDisplayName;

      this.addEvent(events, v, {
        rawDate: inv.invoice_date || v.created_at,
        createdRawDate: invCreatedAt,
        updatedRawDate: invUpdatedAt,
        icon, iconBg, iconColor,
        description: `Invoice ${inv.invoice_number} (${inv.status}) — ${this.formatAmount(inv.grand_total)} for Vendor "${v.name}".`,
        idSuffix: `inv-synthetic-${inv.id ?? idx}`,
        categories: ['invoice'],
        subDetails,
        viewAction: () => this.viewInvoice(rec, inv),
        meta: this.buildMeta(invCreatedAt, invCreatedBy, invUpdatedAt, invUpdatedBy),
      });
    });


    rec.laborWorkers.forEach((w, idx) => {
      if (laborIdsWithHistory.has(String((w as any).id))) return;

      const skillLabel = String(w.skill || '').replace(/_/g, ' ');
      const laborCount = w.labor_count || 0;
      const dailyRate = Number(w.daily_rate) || 0;
      const dailyCost = dailyRate * laborCount;
      const statusRaw = String((w as any).status || (w as any).statusLabel || 'active');
      const statusLabel = statusRaw.replace(/_/g, ' ');
      const statusColor = statusRaw.toLowerCase().includes('active') ? 'text-green-600'
        : statusRaw.toLowerCase().includes('inactive') ? 'text-red-500'
          : 'text-amber-600';

      const subDetails: EventSubDetail[] = [
        { label: 'Skill', value: skillLabel, valueColor: 'text-teal-600' },
        { label: 'Count', value: String(laborCount), valueColor: 'text-slate-700' },
        { label: 'Daily Rate', value: this.formatAmount(dailyRate), valueColor: 'text-teal-700' },
        { label: 'Daily Cost', value: this.formatAmount(dailyCost), valueColor: 'text-teal-800' },
        { label: 'Status', value: statusLabel, valueColor: statusColor },
      ];
      if (w.assign_worker) {
        subDetails.push({ label: 'Assigned To', value: String(w.assign_worker), valueColor: 'text-slate-600' });
      }

      const laborCreationInfo = getCreator('labor', (w as any).id);
      const lCreatedAt = laborCreationInfo?.at || (w as any).created_at || (w as any).createdAt || v.created_at;
      const lUpdatedAt = (w as any).updated_at || (w as any).updatedAt;
      const lUpdatedBy = (w as any).updated_by_name || (w as any).updatedByName;
      const lCreatedBy = laborCreationInfo?.name || (w as any).created_by_name || (w as any).createdByName || lUpdatedBy || this.currentUserDisplayName;

      this.addEvent(events, v, {
        rawDate: lCreatedAt,
        createdRawDate: lCreatedAt,
        updatedRawDate: lUpdatedAt,
        icon: 'engineering',
        iconBg: 'bg-teal-100',
        iconColor: 'text-teal-600',
        description: this.buildLaborDescription(v.name, skillLabel, laborCount, dailyRate, statusLabel),
        idSuffix: `labor-synthetic-${(w as any).id ?? idx}`,
        categories: ['labor'],
        subDetails,
        meta: this.buildMeta(lCreatedAt, lCreatedBy, lUpdatedAt, lUpdatedBy),
      });
    });


    const vendorHistoryMap = new Map<string, VendorHistoryEvent>();
    rec.historyEvents
      .filter(h => h.entity_type === 'vendor')
      .forEach(h => {

        const minuteKey = new Date(h.createdAt).toISOString().slice(0, 16);
        const valuesKey = JSON.stringify(h.new_values || {});
        const key = `${h.action}|${valuesKey}|${minuteKey}`;

        const existing = vendorHistoryMap.get(key);
        if (!existing) {
          vendorHistoryMap.set(key, h);
        }

      });


    const deduplicatedHistoryEvents: VendorHistoryEvent[] = [
      ...rec.historyEvents.filter(h =>
        h.entity_type !== 'labor' && h.entity_type !== 'invoice' && h.entity_type !== 'vendor'
      ),
      ...Array.from(vendorHistoryMap.values()),
      ...Array.from(invoiceHistoryMap.values()),
      ...Array.from(laborHistoryMap.values()),
    ];

    deduplicatedHistoryEvents.forEach(h => {
      const isInvoice = h.entity_type === 'invoice';
      const isLabor = h.entity_type === 'labor';
      const isAudit = h.entity_type === 'audit';
      const isVendor = h.entity_type === 'vendor';

      let icon = 'history', iconBg = 'bg-slate-100', iconColor = 'text-slate-600';
      let categories: ConcreteCategory[] = ['vendor'];
      let viewAction: (() => void) | undefined;
      const subDetails: EventSubDetail[] = [];
      let eventDescription = h.description;

      const hFormatted = this.formatDateTime(h.createdAt);
      const hDateObj = this.parseDate(h.createdAt);

      let entityCreatedAtRaw: any = null;
      let entityCreatedByVal: string | null = null;

      if (isVendor) {
        categories = ['vendor'];
        icon = h.action === 'deleted' ? 'person_remove' : 'edit';
        iconBg = 'bg-pink-100';
        iconColor = 'text-pink-600';

        entityCreatedAtRaw = vendorCreationInfo?.at || v.created_at;
        entityCreatedByVal = createdBy;

        const actionLabel =
          h.action === 'deleted' ? 'removed' :
            h.action === 'updated' ? 'updated' :
              h.action === 'status_changed' ? 'updated' :
                h.action === 'created' ? 'created' :
                  h.action.replace(/_/g, ' ');

        const oldName = h.old_values?.name;
        const newName = h.new_values?.name;
        const nameChanged = oldName && newName && oldName !== newName;

        const oldStatus = h.old_values?.status;
        const newStatus = h.new_values?.status || h.meta?.status;
        const statusChanged = oldStatus && newStatus && oldStatus !== newStatus;

        const newBudget = h.new_values?.budget_allocation || h.meta?.budget_allocation;
        const newEmail = h.new_values?.email || h.meta?.email;
        const newGst = h.new_values?.kyc?.gst || h.meta?.gst;
        const newPan = h.new_values?.kyc?.pan || h.meta?.pan;
        const newAddress = h.new_values?.address || h.meta?.address;

        const mainLine = h.action === 'status_changed'
          ? `Status of Vendor "${v.name}" was updated.`
          : `Vendor "${nameChanged ? oldName : v.name}" was ${actionLabel}.`;
        const extraLines: string[] = [];
        if (nameChanged) extraLines.push(`Vendor name was changed from "${oldName}" to "${newName}".`);
        if (statusChanged) extraLines.push(`Status of Vendor "${v.name}" was changed from "${oldStatus}" to "${newStatus}".`);
        if (newBudget != null) extraLines.push(`Budget for Vendor "${v.name}" was updated to ${this.formatAmount(newBudget)}.`);
        if (newEmail) extraLines.push(`Email for Vendor "${v.name}" was updated to ${newEmail}.`);
        if (newGst) extraLines.push(`GST for Vendor "${v.name}" was updated to ${newGst}.`);
        if (newPan) extraLines.push(`PAN for Vendor "${v.name}" was updated to ${newPan}.`);

        eventDescription = extraLines.length > 0 ? extraLines.join('\n') : mainLine;

        subDetails.push({ label: 'Action', value: actionLabel, valueColor: 'text-pink-600' });
        subDetails.push({ label: 'Date', value: this.dateObjToStmt(hDateObj), valueColor: 'text-slate-500' });
        if (h.changed_by_name) subDetails.push({ label: 'By', value: h.changed_by_name, valueColor: 'text-slate-500' });
        if (nameChanged) {
          subDetails.push({ label: 'Old Name', value: oldName, valueColor: 'text-red-400' });
          subDetails.push({ label: 'New Name', value: newName, valueColor: 'text-green-600' });
        }
        if (statusChanged) {
          subDetails.push({ label: 'Old Status', value: oldStatus, valueColor: 'text-red-400' });
          subDetails.push({ label: 'New Status', value: newStatus, valueColor: 'text-green-600' });
        }
        if (newBudget != null) subDetails.push({ label: 'Budget', value: this.formatAmount(newBudget), valueColor: 'text-violet-600' });
        if (newEmail) subDetails.push({ label: 'Email', value: newEmail, valueColor: 'text-slate-600' });
        if (newGst) subDetails.push({ label: 'GST', value: newGst, valueColor: 'text-slate-500' });
        if (newPan) subDetails.push({ label: 'PAN', value: newPan, valueColor: 'text-slate-500' });
        if (newAddress) subDetails.push({
          label: 'Address',
          value: typeof newAddress === 'string'
            ? newAddress
            : [newAddress?.street, newAddress?.city, newAddress?.state, newAddress?.pincode]
              .filter(Boolean).join(', '),
          valueColor: 'text-slate-600',
        });
      }

      if (isInvoice) {
        categories = ['invoice'];
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

        const matchedInv = rec.invoices.find(i => String(i.id) === String(h.entity_id));
        if (matchedInv) viewAction = () => this.viewInvoice(rec, matchedInv);

        if (matchedInv) {

          const invCreationInfo = getCreator('invoice', matchedInv.id);
          const matchedInvUpdatedBy = (matchedInv as any).updated_by_name || (matchedInv as any).updatedByName;
          entityCreatedAtRaw = invCreationInfo?.at || (matchedInv as any).created_at || (matchedInv as any).createdAt || matchedInv.invoice_date;
          entityCreatedByVal = invCreationInfo?.name || (matchedInv as any).created_by_name || (matchedInv as any).createdByName || matchedInvUpdatedBy || this.currentUserDisplayName;
        }

        const invNumberVal = h.meta?.invoice_number ?? matchedInv?.invoice_number;
        const invAmountVal = h.meta?.grand_total ?? matchedInv?.grand_total;

        if (invNumberVal != null) {
          const amountStr = invAmountVal != null ? ` (${this.formatAmount(invAmountVal)})` : '';
          const actionWord =
            h.action === 'created' ? 'created' :
              h.action === 'deleted' ? 'deleted' :
                h.action === 'payment_added' ? 'updated with a payment' :
                  h.action === 'status_changed' ? 'updated' : 'updated';
          eventDescription = `Invoice #${invNumberVal}${amountStr} was ${actionWord} for Vendor "${v.name}".`;
          if (h.action === 'payment_added' && h.meta?.amount) {
            eventDescription += ` Payment of ${this.formatAmount(h.meta.amount)} was recorded${h.meta?.mode ? ` via ${h.meta.mode}` : ''}.`;
          }
        }
      }

      if (isLabor) {
        categories = ['labor'];
        icon = h.action === 'deleted' ? 'person_remove' : 'engineering';
        iconBg = 'bg-teal-100';
        iconColor = 'text-teal-600';

        if (h.meta?.skill) subDetails.push({ label: 'Skill', value: String(h.meta.skill).replace(/_/g, ' '), valueColor: 'text-teal-600' });
        if (h.meta?.labor_count != null) subDetails.push({ label: 'Count', value: String(h.meta.labor_count), valueColor: 'text-slate-700' });
        if (h.meta?.daily_rate != null) subDetails.push({ label: 'Daily Rate', value: this.formatAmount(h.meta.daily_rate), valueColor: 'text-teal-700' });

        const laborCount = Number(h.meta?.labor_count) || 0;
        const dailyRate = Number(h.meta?.daily_rate) || 0;
        if (laborCount > 0 && dailyRate > 0)
          subDetails.push({ label: 'Daily Cost', value: this.formatAmount(laborCount * dailyRate), valueColor: 'text-teal-800' });
        if (h.meta?.status)
          subDetails.push({ label: 'Status', value: String(h.meta.status).replace(/_/g, ' '), valueColor: 'text-slate-600' });
        if (h.meta?.assign_worker)
          subDetails.push({ label: 'Assigned To', value: h.meta.assign_worker, valueColor: 'text-slate-600' });

        const matchedLabor = rec.laborWorkers.find(w => String((w as any).id) === String(h.entity_id));

        if (matchedLabor) {
          const laborCreationInfo = getCreator('labor', (matchedLabor as any).id);
          const matchedLaborUpdatedBy = (matchedLabor as any).updated_by_name || (matchedLabor as any).updatedByName;
          entityCreatedAtRaw = laborCreationInfo?.at || (matchedLabor as any).created_at || (matchedLabor as any).createdAt;
          entityCreatedByVal = laborCreationInfo?.name || (matchedLabor as any).created_by_name || (matchedLabor as any).createdByName || matchedLaborUpdatedBy || this.currentUserDisplayName;
        }

        const skillVal = h.meta?.skill ?? matchedLabor?.skill;
        const countVal = h.meta?.labor_count ?? matchedLabor?.labor_count;
        const rateVal = h.meta?.daily_rate ?? (matchedLabor as any)?.daily_rate;
        const statusVal = h.meta?.status ?? (matchedLabor as any)?.status ?? (matchedLabor as any)?.statusLabel;

        if (skillVal != null && countVal != null && rateVal != null) {
          const skill = String(skillVal).replace(/_/g, ' ');
          const count = Number(countVal) || 0;
          const rate = Number(rateVal) || 0;
          const status = statusVal ? String(statusVal).replace(/_/g, ' ') : 'active';
          eventDescription = this.buildLaborDescription(v.name, skill, count, rate, status);

          if (!subDetails.find(d => d.label === 'Daily Rate'))
            subDetails.push({ label: 'Daily Rate', value: this.formatAmount(rate), valueColor: 'text-teal-700' });
          if (!subDetails.find(d => d.label === 'Daily Cost'))
            subDetails.push({ label: 'Daily Cost', value: this.formatAmount(rate * count), valueColor: 'text-teal-800' });
          if (!subDetails.find(d => d.label === 'Status'))
            subDetails.push({ label: 'Status', value: status, valueColor: 'text-slate-600' });
        }
      }

      if (isAudit) {
        categories = ['safety'];
        icon = h.action === 'deleted' ? 'cancel' : 'fact_check';
        iconBg = 'bg-emerald-100';
        iconColor = 'text-emerald-600';

        const matchedAudit: any = rec.audits.find((a: any) => String(a.id) === String(h.entity_id));

        if (matchedAudit) {
          const auditCreationInfo = getCreator('audit', matchedAudit.id);
          const matchedAuditUpdatedBy = matchedAudit.updated_by_name || matchedAudit.updatedByName;
          entityCreatedAtRaw = auditCreationInfo?.at || matchedAudit.created_at || matchedAudit.createdAt || matchedAudit.audit_date || matchedAudit.auditDate;
          entityCreatedByVal = auditCreationInfo?.name || matchedAudit.created_by_name || matchedAudit.createdByName || matchedAuditUpdatedBy || this.currentUserDisplayName;
        }

        const scoreVal = h.meta?.composite_score ?? matchedAudit?.composite_score ?? matchedAudit?.compositeScore;
        const qualityVal = h.meta?.quality ?? matchedAudit?.quality;
        const timelinessVal = h.meta?.timeliness ?? matchedAudit?.timeliness;
        const safetyVal = h.meta?.safety ?? matchedAudit?.safety;
        const observationsVal = h.meta?.observations ?? matchedAudit?.observations;

        const actionWord =
          h.action === 'created' ? 'conducted' :
            h.action === 'deleted' ? 'deleted' :
              h.action === 'updated' ? 'updated' : 'recorded';

        eventDescription = scoreVal != null
          ? `Audit for Vendor "${v.name}" was ${actionWord} with a composite score of ${Math.round(Number(scoreVal))}%.`
          : `Audit for Vendor "${v.name}" was ${actionWord}.`;

        if (qualityVal != null) subDetails.push({ label: 'Quality', value: `${qualityVal}/10`, valueColor: 'text-slate-700' });
        if (timelinessVal != null) subDetails.push({ label: 'Timeliness', value: `${timelinessVal}/10`, valueColor: 'text-slate-700' });
        if (safetyVal != null) subDetails.push({ label: 'Safety', value: `${safetyVal}/10`, valueColor: 'text-slate-700' });
        if (observationsVal) subDetails.push({ label: 'Observations', value: observationsVal, valueColor: 'text-slate-600' });
      }

      const entityCreatedFormatted = entityCreatedAtRaw ? this.formatDateTime(entityCreatedAtRaw) : null;
      const hMeta = buildHistoryMeta(h.action, hFormatted, h.changed_by_name, this.currentUserDisplayName, entityCreatedFormatted, entityCreatedByVal);

      this.addEvent(events, v, {
        rawDate: h.createdAt,
        createdRawDate: entityCreatedAtRaw || h.createdAt,
        updatedRawDate: h.createdAt,
        icon, iconBg, iconColor,
        description: eventDescription,
        idSuffix: `hist-${h.id}`,
        categories,
        subDetails,
        viewAction,
        meta: hMeta,
      });
    });


    rec.tasks.forEach((t: any) => {
      const taskRawDate = this.resolveDate(
        t, 'updated_at', 'updatedAt', 'created_at', 'createdAt',
        'due_date', 'dueDate', 'start_date', 'startDate'
      );
      if (!this.parseDate(taskRawDate)) return;

      const statusHuman = this.humanizeStatus(t.status);
      const tCreatedAt = (t as any).created_at || (t as any).createdAt;
      const tUpdatedAt = (t as any).updated_at || (t as any).updatedAt;
      const tUpdatedBy = (t as any).updated_by_name || (t as any).updatedByName;
      const tCreatedBy = (t as any).created_by_name || (t as any).createdByName || tUpdatedBy || this.currentUserDisplayName;

      this.addEvent(events, v, {
        rawDate: taskRawDate,
        createdRawDate: tCreatedAt,
        updatedRawDate: tUpdatedAt,
        icon: 'checklist',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        description: `Task "${t.title}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''} was marked as "${statusHuman}".`,
        idSuffix: `task-${t.id}`,
        categories: ['task'],
        subDetails: [
          { label: 'Task', value: t.title, valueColor: 'text-slate-700' },
          { label: 'Status', value: statusHuman, valueColor: 'text-blue-600' },
          ...(projectName ? [{ label: 'Project', value: projectName, valueColor: 'text-indigo-600' }] : []),
          ...(t.due_date || t.dueDate
            ? [{ label: 'Due', value: this.stmtDate(t.due_date || t.dueDate), valueColor: 'text-slate-500' }]
            : []),
        ],
        meta: this.buildMeta(tCreatedAt, tCreatedBy, tUpdatedAt, tUpdatedBy),
      });
    });


    rec.milestones.forEach(m => {
      const mRawDate = this.resolveDate(
        m, 'updated_at', 'updatedAt', 'end_date', 'endDate',
        'start_date', 'startDate', 'created_at', 'createdAt'
      );
      if (!this.parseDate(mRawDate)) return;

      const progress = m.milestone_progress ?? (m as any).milestoneProgress ?? m.progress ?? null;
      const mLabel = m.name || m.title || `Milestone #${m.id}`;

      const mCreatedAt = (m as any).created_at || (m as any).createdAt;
      const mUpdatedAt = (m as any).updated_at || (m as any).updatedAt;
      const mUpdatedBy = (m as any).updated_by_name || (m as any).updatedByName || this.currentUserDisplayName;
      const mCreatedBy = (m as any).created_by_name || (m as any).createdByName || mUpdatedBy || this.currentUserDisplayName;

      this.addEvent(events, v, {
        rawDate: mRawDate,
        createdRawDate: mCreatedAt,
        updatedRawDate: mUpdatedAt,
        icon: 'flag',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        description: progress != null
          ? `Milestone "${mLabel}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''} reached ${progress}% completion.`
          : `Milestone "${mLabel}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''} was updated to "${this.humanizeStatus(m.status)}".`,
        idSuffix: `milestone-${m.id}`,
        categories: ['milestone'],
        subDetails: [
          { label: 'Milestone', value: mLabel, valueColor: 'text-purple-600' },
          ...(progress != null
            ? [{ label: 'Progress', value: `${progress}%`, valueColor: Number(progress) >= 80 ? 'text-green-600' : Number(progress) >= 40 ? 'text-amber-600' : 'text-red-500' }]
            : [{ label: 'Status', value: this.humanizeStatus(m.status), valueColor: 'text-purple-600' }]),
          ...(projectName ? [{ label: 'Project', value: projectName, valueColor: 'text-indigo-600' }] : []),
        ],
        meta: this.buildMeta(mCreatedAt, mCreatedBy, mUpdatedAt, mUpdatedBy),
      });

      (m.children || []).forEach(c => {
        const cRawDate = this.resolveDate(
          c, 'updated_at', 'updatedAt', 'end_date', 'endDate',
          'start_date', 'startDate', 'created_at', 'createdAt'
        );
        if (!this.parseDate(cRawDate)) return;

        const cLabel = c.name || c.title || `Sub-Milestone #${c.id}`;

        const cCreatedAt = (c as any).created_at || (c as any).createdAt;
        const cUpdatedAt = (c as any).updated_at || (c as any).updatedAt;
        const cUpdatedBy = (c as any).updated_by_name || (c as any).updatedByName || this.currentUserDisplayName;
        const cCreatedBy = (c as any).created_by_name || (c as any).createdByName || cUpdatedBy || this.currentUserDisplayName;

        this.addEvent(events, v, {
          rawDate: cRawDate,
          createdRawDate: cCreatedAt,
          updatedRawDate: cUpdatedAt,
          icon: 'subdirectory_arrow_right',
          iconBg: 'bg-purple-50',
          iconColor: 'text-purple-500',
          description: `Sub-Milestone "${cLabel}" under "${mLabel}" for Vendor "${v.name}" was updated to "${this.humanizeStatus(c.status)}".`,
          idSuffix: `sub-milestone-${c.id}`,
          categories: ['milestone'],
          subDetails: [
            { label: 'Sub-Milestone', value: cLabel, valueColor: 'text-purple-500' },
            { label: 'Parent', value: mLabel, valueColor: 'text-purple-600' },
            { label: 'Status', value: this.humanizeStatus(c.status), valueColor: 'text-slate-600' },
          ],
          meta: this.buildMeta(cCreatedAt, cCreatedBy, cUpdatedAt, cUpdatedBy),
        });
      });
    });


    (v.contract_files || []).forEach((file, idx) => {
      const docDate = updatedAt || v.created_at;
      const fileName = this.getFileName(file);
      this.addEvent(events, v, {
        rawDate: docDate,
        createdRawDate: vendorCreationInfo?.at || v.created_at,
        updatedRawDate: updatedAt,
        icon: 'description',
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-600',
        description: `Document "${fileName}" was uploaded for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ''}.`,
        idSuffix: `doc-${idx}`,
        categories: ['document'],
        subDetails: [
          { label: 'File', value: fileName, valueColor: 'text-slate-700' },
          { label: 'Vendor', value: v.name, valueColor: 'text-primary' },
          ...(projectName ? [{ label: 'Project', value: projectName, valueColor: 'text-indigo-600' }] : []),
        ],
        meta: this.buildMeta(vendorCreationInfo?.at || v.created_at, createdBy, updatedAt, updatedBy),
      });
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
            this._timelineCache = null;
            this._flatCache = null;
            this.records = { ...this.records, [vendor.id]: { ...rec } };
            resolve(rec);
          },
          error: (err) => {
            console.error(`[VendorsHistory] Error loading ${vendor.name}:`, err);
            rec.loaded = true;
            rec.loading = false;
            this._timelineCache = null;
            this._flatCache = null;
            this.records = { ...this.records, [vendor.id]: { ...rec } };
            resolve(rec);
          },
        });
    });
  }

  private buildMilestoneMaps(rec: VendorRecord): void {
    const raw = rec.projectData;
    const withChild: MilestoneNode[] =
      Array.isArray(raw?.milestones_with_child) ? raw.milestones_with_child :
        Array.isArray(raw?.milestonesWithChild) ? raw.milestonesWithChild :
          Array.isArray(raw?.milestones) ? raw.milestones : [];

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
    rec.totalBilled = rec.invoices
      .filter(i => i.status !== 'Cancelled')
      .reduce((s, i) => s + (Number(i.grand_total) || 0), 0);
    rec.totalPaid = rec.invoices.reduce((s, i) => s + (Number(i.paid_amount) || 0), 0);
    rec.totalDailyLaborCost = rec.laborWorkers
      .reduce((s, w) => s + (Number(w.daily_rate) || 0) * (w.labor_count || 0), 0);
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

  getLatestInvoiceDate(rec: VendorRecord): string | null {
    if (!rec.invoices.length) return null;
    return [...rec.invoices]
      .sort((a, b) => new Date(b.invoice_date).getTime() - new Date(a.invoice_date).getTime())[0]
      .invoice_date;
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
    </div>` : ''}
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
      rows.push('Vendor,Project,Record Type,Reference,Date,Amount,Status,Details,Created At,Created By,Updated At,Updated By');
      const esc = (val: any) => `"${String(val ?? '—').replace(/"/g, '""')}"`;
      const fallbackUser = this.currentUserDisplayName;
      vendorsToExport.forEach(v => {
        const rec = this.records[v.id];
        if (!rec) return;
        const projectName = rec.projectData?.name || 'Not linked';

        const creationInfoMap = new Map<string, { name: string; at: string }>();
        rec.historyEvents
          .filter(h => h.action === 'created')
          .forEach(h => {
            const key = `${h.entity_type}-${h.entity_id ?? 'vendor'}`;
            const cleanedName = this.cleanName(h.changed_by_name);
            if (!creationInfoMap.has(key) && cleanedName) {
              creationInfoMap.set(key, { name: cleanedName, at: h.createdAt });
            }
          });
        const getCreatorCsv = (entityType: string, entityId: number | string | null) => {
          const key = `${entityType}-${entityId ?? 'vendor'}`;
          return creationInfoMap.get(key) || null;
        };

        const updatedBy = (v as any).updated_by_name || fallbackUser;
        const vendorCreator = getCreatorCsv('vendor', null);
        const createdBy = vendorCreator?.name || (v as any).created_by_name || updatedBy;

        rec.invoices.forEach(inv => {
          const invCreator = getCreatorCsv('invoice', inv.id);
          const iCreatedAt = invCreator?.at || (inv as any).created_at || (inv as any).createdAt || inv.invoice_date;
          const iUpdatedAt = (inv as any).updated_at || (inv as any).updatedAt || '';
          const iUpdatedBy = (inv as any).updated_by_name || '';
          const iCreatedBy = invCreator?.name || (inv as any).created_by_name || iUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc('Invoice'), esc(inv.invoice_number), esc(this.formatDate(inv.invoice_date)), esc(this.toNumber(inv.grand_total)), esc(inv.status), esc(`Paid: ${this.formatAmount(inv.paid_amount)}`), esc(this.formatDateTime(iCreatedAt)), esc(iCreatedBy), esc(this.formatDateTime(iUpdatedAt)), esc(iUpdatedBy || '—')].join(','));
          (inv.payment_history || []).forEach(p => {
            rows.push([esc(v.name), esc(projectName), esc('Payment'), esc(inv.invoice_number), esc(this.formatDate((p as any).paid_at || (p as any).payment_date)), esc(this.toNumber((p as any).amount)), esc((p as any).mode), esc((p as any).reference ? `Ref: ${(p as any).reference}` : '—'), esc('—'), esc('—'), esc('—'), esc('—')].join(','));
          });
        });
        rec.audits.forEach((a: any) => {
          const auditCreator = getCreatorCsv('audit', a.id);
          const aCreatedAt = auditCreator?.at || a.created_at || a.createdAt;
          const aUpdatedBy = a.updated_by_name || '';
          const aCreatedBy = auditCreator?.name || a.created_by_name || aUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc('Audit'), esc('—'), esc(this.formatDate(a.audit_date || a.auditDate || a.createdAt || a.created_at)), esc('—'), esc(`${Math.round(Number(a.composite_score ?? a.compositeScore ?? 0))}%`), esc(a.observations || '—'), esc(this.formatDateTime(aCreatedAt)), esc(aCreatedBy), esc(this.formatDateTime(a.updated_at || a.updatedAt)), esc(aUpdatedBy || '—')].join(','));
        });
        rec.laborWorkers.forEach(w => {
          const laborCreator = getCreatorCsv('labor', (w as any).id);
          const lCreatedAt = laborCreator?.at || (w as any).created_at || (w as any).createdAt;
          const lUpdatedBy = (w as any).updated_by_name || '';
          const lCreatedBy = laborCreator?.name || (w as any).created_by_name || lUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc('Labor'), esc(w.skill), esc('—'), esc(this.toNumber(w.daily_rate) * (w.labor_count || 0)), esc((w as any).statusLabel || w.status), esc(`Count: ${w.labor_count} · Assigned: ${w.assign_worker || 'Unassigned'}`), esc(this.formatDateTime(lCreatedAt)), esc(lCreatedBy), esc(this.formatDateTime((w as any).updated_at || (w as any).updatedAt)), esc(lUpdatedBy || '—')].join(','));
        });
        rec.tasks.forEach((t: any) => {
          const tUpdatedBy = t.updated_by_name || '';
          const tCreatedBy = t.created_by_name || tUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc('Task'), esc(t.title), esc(this.formatDate(t.due_date || t.dueDate)), esc('—'), esc(t.status), esc(`Subtasks: ${(t.subtasks || []).length}`), esc(this.formatDateTime(t.created_at || t.createdAt)), esc(tCreatedBy), esc(this.formatDateTime(t.updated_at || t.updatedAt)), esc(tUpdatedBy || '—')].join(','));
        });
        rec.milestones.forEach(m => {
          const mUpdatedBy = (m as any).updated_by_name || '';
          const mCreatedBy = (m as any).created_by_name || mUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc('Milestone'), esc(m.name || m.title), esc(`${this.formatDate(m.start_date)} → ${this.formatDate(m.end_date)}`), esc('—'), esc(m.status || '—'), esc(`Sub-milestones: ${(m.children || []).length}`), esc(this.formatDateTime((m as any).created_at || (m as any).createdAt)), esc(mCreatedBy), esc(this.formatDateTime(m.updated_at)), esc(mUpdatedBy || '—')].join(','));
        });
        const allocated = Number(v.budget_allocation) || 0;
        rows.push([esc(v.name), esc(projectName), esc('Budget'), esc('Allocation Summary'), esc(this.formatDate(v.created_at)), esc(allocated), esc(allocated > 0 && rec.totalBilled > allocated ? 'Exceeded' : 'Within Budget'), esc(`Invoiced: ${this.formatAmount(rec.totalBilled)} | Paid: ${this.formatAmount(rec.totalPaid)} | Remaining: ${this.formatAmount(Math.max(0, allocated - rec.totalBilled))}`), esc(this.formatDateTime(vendorCreator?.at || v.created_at)), esc(createdBy), esc(this.formatDateTime((v as any).updated_at)), esc(updatedBy)].join(','));
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