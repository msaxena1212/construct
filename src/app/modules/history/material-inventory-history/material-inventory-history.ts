import { Component, inject, HostListener } from '@angular/core';
import {
  MaterialInventoryHistoryServices,
  MaterialHistory,
} from './material-inventory-history-services';

interface HistoryGroup {
  dateLabel: string;
  count: number;
  items: MaterialHistory[];
}

interface MaterialFilterItem {
  id: number;
  name: string;
  sku: string;
  since: string | undefined;
  stockIn: number;
  stockUsed: number;
  utilization: number;
}

@Component({
  selector: 'app-material-inventory-history',
  standalone: false,
  templateUrl: './material-inventory-history.html',
  styleUrl: './material-inventory-history.scss',
})
export class MaterialInventoryHistory {
  private historyService = inject(MaterialInventoryHistoryServices);

  loading = false;

  history: MaterialHistory[] = [];
  paginatedHistory: MaterialHistory[] = [];

  selectedTab = 'All';
  tabs = ['All', 'CREATED', 'UPDATED', 'ASSIGNED', 'TRANSFER'];

  searchQuery = '';

  page = 1;
  pageSize = 20;

  isFilterOpen = false;
  materialSearchQuery = '';
  selectedMaterialIds = new Set<number>();

  ngOnInit() {
    this.historyService.loadMaterialHistory();

    this.historyService.history$.subscribe((data) => {
      this.history = data || [];
      this.page = 1;

      this.selectedMaterialIds = new Set(this.uniqueMaterials.map((m) => m.id));

      this.updatePagination();
    });

    this.historyService.loading$.subscribe((l) => (this.loading = l));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isFilterOpen && !target.closest('.material-filter-dropdown')) {
      this.isFilterOpen = false;
    }
  }

  get uniqueMaterials(): MaterialFilterItem[] {
    const map = new Map<number, MaterialFilterItem>();

    for (const item of this.history) {
      const id = item.material_master_id ?? item.material_id;
      if (!id) continue;

      if (!map.has(id)) {
        map.set(id, {
          id,
          name: item.name,
          sku: item.sku,
          since: item.createdAt,
          stockIn: 0,
          stockUsed: 0,
          utilization: 0,
        });
      }

      const m = map.get(id)!;

      m.stockIn += item.stockIn || 0;

      if ((item.status || '').toUpperCase() === 'ASSIGNED') {
        m.stockUsed += item.stockUsed || 0;
      }

      if (item.createdAt && (!m.since || new Date(item.createdAt) < new Date(m.since))) {
        m.since = item.createdAt;
      }
    }

    return Array.from(map.values()).map((m) => ({
      ...m,
      utilization: m.stockIn > 0 ? Math.min(100, Math.round((m.stockUsed / m.stockIn) * 100)) : 0,
    }));
  }

  get filteredMaterialOptions(): MaterialFilterItem[] {
    if (!this.materialSearchQuery) return this.uniqueMaterials;
    const q = this.materialSearchQuery.toLowerCase();
    return this.uniqueMaterials.filter(
      (m) => m.name?.toLowerCase().includes(q) || m.sku?.toLowerCase().includes(q)
    );
  }

  get allMaterialsSelected(): boolean {
    return (
      this.uniqueMaterials.length > 0 &&
      this.selectedMaterialIds.size === this.uniqueMaterials.length
    );
  }

  get isPartiallySelected(): boolean {
    return this.selectedMaterialIds.size > 0 && !this.allMaterialsSelected;
  }

  get selectedMaterialsList(): MaterialFilterItem[] {
    return this.uniqueMaterials.filter((m) => this.selectedMaterialIds.has(m.id));
  }

  get selectedMaterialsLabel(): string {
    if (this.allMaterialsSelected) return 'All Materials';
    if (this.selectedMaterialIds.size === 0) return 'No Material Selected';
    if (this.selectedMaterialIds.size === 1) {
      const id = Array.from(this.selectedMaterialIds)[0];
      return this.uniqueMaterials.find((x) => x.id === id)?.name || '1 Selected';
    }
    return `${this.selectedMaterialIds.size} Materials Selected`;
  }

  get sectionHeadingLabel(): string {
    if (this.allMaterialsSelected) {
      return this.selectedTab === 'All' ? 'All Materials' : this.selectedTab;
    }
    if (this.selectedMaterialIds.size === 0) {
      return 'No Material Selected';
    }
    return `${this.selectedMaterialIds.size} Material(s)`;
  }

  getMaterialStatusLabel(utilization: number): string {
    return utilization > 0 ? 'Active' : 'Pending';
  }

  getMaterialStatusClass(utilization: number): string {
    return utilization > 0
      ? 'bg-emerald-100 text-emerald-600'
      : 'bg-amber-100 text-amber-600';
  }

  get activeMaterialsCount(): number {
    return this.uniqueMaterials.filter((m) => m.utilization > 0).length;
  }

  get pendingMaterialsCount(): number {
    return this.uniqueMaterials.filter((m) => m.utilization === 0).length;
  }

  toggleFilterDropdown() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  isMaterialChecked(id: number): boolean {
    return this.selectedMaterialIds.has(id);
  }

  toggleMaterial(id: number) {
    if (this.selectedMaterialIds.has(id)) {
      this.selectedMaterialIds.delete(id);
    } else {
      this.selectedMaterialIds.add(id);
    }
    this.page = 1;
    this.updatePagination();
  }

  toggleAllMaterials() {
    if (this.allMaterialsSelected) {
      this.selectedMaterialIds.clear();
    } else {
      this.selectedMaterialIds = new Set(this.uniqueMaterials.map((m) => m.id));
    }
    this.page = 1;
    this.updatePagination();
  }

  removeMaterialChip(id: number) {
    this.selectedMaterialIds.delete(id);
    this.page = 1;
    this.updatePagination();
  }

  clearAllMaterialChips() {
    this.selectedMaterialIds.clear();
    this.page = 1;
    this.updatePagination();
  }

  applyFilterDone() {
    this.isFilterOpen = false;
    this.page = 1;
    this.updatePagination();
  }

  private get materialFilteredHistory(): MaterialHistory[] {
    return this.history.filter((h) => {
      const id = h.material_master_id ?? h.material_id;
      return id ? this.selectedMaterialIds.has(id) : false;
    });
  }

  get tabCounts(): { [tab: string]: number } {
    const base = this.materialFilteredHistory;
    const counts: { [tab: string]: number } = { All: base.length };
    for (const tab of this.tabs) {
      if (tab === 'All') continue;
      counts[tab] = base.filter(
        (h) => (h.status || '').toUpperCase() === tab
      ).length;
    }
    return counts;
  }

  get filteredHistory(): MaterialHistory[] {
    let filtered = this.materialFilteredHistory;

    if (this.selectedTab !== 'All') {
      filtered = filtered.filter((h) => (h.status || '').toUpperCase() === this.selectedTab);
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name?.toLowerCase().includes(q) ||
          h.sku?.toLowerCase().includes(q) ||
          h.category?.toLowerCase().includes(q) ||
          h.vendor_name?.toLowerCase().includes(q) ||
          h.project_name?.toLowerCase().includes(q) ||
          h.created_by?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  get totalFilteredEntries(): number {
    return this.filteredHistory.length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalFilteredEntries / this.pageSize));
  }

  get pageStartIndex(): number {
    return this.totalFilteredEntries === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }

  get pageEndIndex(): number {
    return Math.min(this.page * this.pageSize, this.totalFilteredEntries);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.page;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.updatePagination();
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  prevPage(): void {
    this.goToPage(this.page - 1);
  }

  get groupedHistory(): HistoryGroup[] {
    const groups: { [key: string]: MaterialHistory[] } = {};

    for (const item of this.paginatedHistory) {
      const key = item.createdAt ? new Date(item.createdAt).toDateString() : 'Unknown Date';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    }

    return Object.keys(groups)
      .sort((a, b) => {
        if (a === 'Unknown Date') return 1;
        if (b === 'Unknown Date') return -1;
        return new Date(b).getTime() - new Date(a).getTime();
      })
      .map((key) => ({
        dateLabel: key === 'Unknown Date' ? key : this.formatGroupDate(key),
        count: groups[key].length,
        items: groups[key],
      }));
  }

  private formatGroupDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  getActivityText(item: MaterialHistory): string {
    const status = (item.status || '').toUpperCase();
    const name = item.name || 'Material';
    const sku = item.sku ? ` (SKU: ${item.sku})` : '';
    const costText = item.cost ? ` at ₹${item.cost} per unit` : '';

    switch (status) {
      case 'CREATED':
        return `Material "${name}"${sku} was added to inventory with ${item.stockIn || 0} units from vendor "${item.vendor_name || 'N/A'}"${costText}.`;

      case 'UPDATED':
        return `Material "${name}"${sku} stock was replenished by ${item.stockIn || 0} units from vendor "${item.vendor_name || 'N/A'}"${costText}.`;

      case 'ASSIGNED':
        return `${item.stockUsed || 0} units of Material "${name}"${sku} were assigned to Project "${item.project_name || 'N/A'}"${costText}.`;

      case 'TRANSFER':
        return `${item.stockUsed || 0} units of Material "${name}"${sku} were transferred to Project "${item.project_name || 'N/A'}"${item.note ? ` with note: "${item.note}"` : ''}.`;

      default:
        return `Stock movement recorded for Material "${name}"${sku}.`;
    }
  }

  getActivityIcon(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'CREATED':
        return 'add_circle';
      case 'UPDATED':
        return 'edit';
      case 'ASSIGNED':
        return 'assignment_turned_in';
      case 'TRANSFER':
        return 'swap_horiz';
      default:
        return 'inventory_2';
    }
  }

  getActivityIconClass(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'CREATED':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'UPDATED':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400';
      case 'ASSIGNED':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
      case 'TRANSFER':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
    }
  }

  statusBadgeClass(status: string) {
    switch ((status || '').toUpperCase()) {
      case 'CREATED':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'UPDATED':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400';
      case 'ASSIGNED':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
      case 'TRANSFER':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400';
      default:
        return 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
    }
  }

  getMetaLabel(status: string): string {
    const s = (status || '').toUpperCase();
    if (s === 'CREATED') return 'CREATED';
    if (s === 'ASSIGNED') return 'ASSIGNED';
    if (s === 'TRANSFER') return 'TRANSFERRED';
    return 'UPDATED';
  }

  getMetaBoxClass(status: string): string {
    const s = (status || '').toUpperCase();
    switch (s) {
      case 'CREATED':
        return 'bg-rose-50 dark:bg-rose-500/5 border-pink-200 dark:border-pink-800/40';
      case 'ASSIGNED':
        return 'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-800/40';
      case 'TRANSFER':
        return 'bg-purple-50 dark:bg-purple-500/5 border-purple-200 dark:border-purple-800/40';
      default:
        return 'bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-800/40';
    }
  }

  getMetaBadgeClass(status: string): string {
    const s = (status || '').toUpperCase();
    switch (s) {
      case 'CREATED':
        return 'bg-pink-100 text-pink-700';
      case 'ASSIGNED':
        return 'bg-amber-100 text-amber-700';
      case 'TRANSFER':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  }

  private currentUserDisplayName(): string {
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        const user = JSON.parse(raw);
        const name = `${user?.firstname || ''} ${user?.lastname || ''}`.trim();
        return name || user?.username || 'System';
      }
    } catch {

    }
    return 'System';
  }

  getActorName(item: MaterialHistory): string {
    if (item.created_by && item.created_by.trim().length > 0) {
      return item.created_by;
    }

    if (item.user) {
      const fullName = `${item.user.firstname || ''} ${item.user.lastname || ''}`.trim();
      if (fullName) return fullName;
    }

    return this.currentUserDisplayName()
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
    this.page = 1;
    this.updatePagination();
  }

  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }

  updatePagination() {
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }
    const start = (this.page - 1) * this.pageSize;
    this.paginatedHistory = this.filteredHistory.slice(start, start + this.pageSize);
  }

  exportCSV() {
    const rows = this.filteredHistory;
    if (!rows.length) return;

    const headers = [
      'Material', 'SKU', 'Category', 'Stock In', 'Stock Used',
      'Cost', 'Vendor', 'Project', 'Status', 'Note', 'Created By', 'Date',
    ];

    const csvRows = rows.map((r) => [
      r.name || '', r.sku || '', r.category || '', r.stockIn ?? 0,
      r.stockUsed ?? 0, r.cost ?? 0, r.vendor_name || '',
      r.project_name || '', r.status || '', r.note || '',
      this.getActorName(r),
      r.createdAt ? new Date(r.createdAt).toLocaleString() : '',
    ]);

    const csvContent = [headers, ...csvRows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `material-inventory-history-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}