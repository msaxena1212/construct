import { Component, inject, HostListener } from '@angular/core';
import {
  EquipmentInventoryHistoryServices,
  EquipmentHistory,
} from '../equipment-inventory-history/equipment-inventory-history-services';

interface HistoryGroup {
  dateLabel: string;
  count: number;
  items: EquipmentHistory[];
}

interface EquipmentFilterItem {
  id: number;
  name: string;
  sku: string;
  since: string | undefined;
  stockIn: number;
  stockUsed: number;
  utilization: number;
}

@Component({
  selector: 'app-equipment-inventory-history',
  standalone: false,
  templateUrl: './equipment-inventory-history.html',
  styleUrl: './equipment-inventory-history.scss',
})
export class EquipmentInventoryHistory {
  private historyService = inject(EquipmentInventoryHistoryServices);

  loading = false;

  history: EquipmentHistory[] = [];
  paginatedHistory: EquipmentHistory[] = [];

  selectedTab = 'All';
  tabs = ['All', 'CREATED', 'UPDATED', 'ASSIGNED', 'TRANSFER'];

  searchQuery = '';

  page = 1;
  pageSize = 20;

  isFilterOpen = false;
  equipmentSearchQuery = '';
  selectedEquipmentIds = new Set<number>();

  ngOnInit() {
    this.historyService.loadEquipmentHistory();

    this.historyService.history$.subscribe((data) => {
      this.history = data || [];
      this.page = 1;

      this.selectedEquipmentIds = new Set(this.uniqueEquipments.map((m) => m.id));

      this.updatePagination();
    });

    this.historyService.loading$.subscribe((l) => (this.loading = l));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isFilterOpen && !target.closest('.equipment-filter-dropdown')) {
      this.isFilterOpen = false;
    }
  }

  get uniqueEquipments(): EquipmentFilterItem[] {
    const map = new Map<number, EquipmentFilterItem>();

    for (const item of this.history) {
      const id = item.equipment_master_id ?? item.equipment_id;
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

      m.stockIn = Math.max(m.stockIn, item.stockIn || 0);

      const status = (item.status || '').toUpperCase();
      if (status === 'TRANSFER' || status === 'ASSIGNED') {
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

  get filteredEquipmentOptions(): EquipmentFilterItem[] {
    if (!this.equipmentSearchQuery) return this.uniqueEquipments;
    const q = this.equipmentSearchQuery.toLowerCase();
    return this.uniqueEquipments.filter(
      (m) => m.name?.toLowerCase().includes(q) || m.sku?.toLowerCase().includes(q)
    );
  }

  get allEquipmentsSelected(): boolean {
    return (
      this.uniqueEquipments.length > 0 &&
      this.selectedEquipmentIds.size === this.uniqueEquipments.length
    );
  }

  get isPartiallySelected(): boolean {
    return this.selectedEquipmentIds.size > 0 && !this.allEquipmentsSelected;
  }

  get selectedEquipmentsList(): EquipmentFilterItem[] {
    return this.uniqueEquipments.filter((m) => this.selectedEquipmentIds.has(m.id));
  }

  get selectedEquipmentsLabel(): string {
    if (this.allEquipmentsSelected) return 'All Equipment';
    if (this.selectedEquipmentIds.size === 0) return 'No Equipment Selected';
    if (this.selectedEquipmentIds.size === 1) {
      const id = Array.from(this.selectedEquipmentIds)[0];
      return this.uniqueEquipments.find((x) => x.id === id)?.name || '1 Selected';
    }
    return `${this.selectedEquipmentIds.size} Equipment Selected`;
  }

  get sectionHeadingLabel(): string {
    if (this.allEquipmentsSelected) {
      return this.selectedTab === 'All' ? 'All Equipment' : this.selectedTab;
    }
    if (this.selectedEquipmentIds.size === 0) {
      return 'No Equipment Selected';
    }
    return `${this.selectedEquipmentIds.size} Equipment`;
  }

  getEquipmentStatusLabel(utilization: number): string {
    return utilization > 0 ? 'Active' : 'Pending';
  }

  getEquipmentStatusClass(utilization: number): string {
    return utilization > 0
      ? 'bg-emerald-100 text-emerald-600'
      : 'bg-amber-100 text-amber-600';
  }

  get activeEquipmentsCount(): number {
    return this.uniqueEquipments.filter((m) => m.utilization > 0).length;
  }

  get pendingEquipmentsCount(): number {
    return this.uniqueEquipments.filter((m) => m.utilization === 0).length;
  }

  toggleFilterDropdown() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  isEquipmentChecked(id: number): boolean {
    return this.selectedEquipmentIds.has(id);
  }

  toggleEquipment(id: number) {
    if (this.selectedEquipmentIds.has(id)) {
      this.selectedEquipmentIds.delete(id);
    } else {
      this.selectedEquipmentIds.add(id);
    }
    this.page = 1;
    this.updatePagination();
  }

  toggleAllEquipments() {
    if (this.allEquipmentsSelected) {
      this.selectedEquipmentIds.clear();
    } else {
      this.selectedEquipmentIds = new Set(this.uniqueEquipments.map((m) => m.id));
    }
    this.page = 1;
    this.updatePagination();
  }

  removeEquipmentChip(id: number) {
    this.selectedEquipmentIds.delete(id);
    this.page = 1;
    this.updatePagination();
  }

  clearAllEquipmentChips() {
    this.selectedEquipmentIds.clear();
    this.page = 1;
    this.updatePagination();
  }

  applyFilterDone() {
    this.isFilterOpen = false;
    this.page = 1;
    this.updatePagination();
  }

  private get equipmentFilteredHistory(): EquipmentHistory[] {
    return this.history.filter((h) => {
      const id = h.equipment_master_id ?? h.equipment_id;
      return id ? this.selectedEquipmentIds.has(id) : false;
    });
  }

  get tabCounts(): { [tab: string]: number } {
    const base = this.equipmentFilteredHistory;
    const counts: { [tab: string]: number } = { All: base.length };
    for (const tab of this.tabs) {
      if (tab === 'All') continue;
      counts[tab] = base.filter(
        (h) => (h.status || '').toUpperCase() === tab
      ).length;
    }
    return counts;
  }

  get filteredHistory(): EquipmentHistory[] {
    let filtered = this.equipmentFilteredHistory;

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
    const groups: { [key: string]: EquipmentHistory[] } = {};

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

  private pluralize(count: number, singular: string, plural: string = singular + 's'): string {
    return count === 1 ? singular : plural;
  }

  getActivityText(item: EquipmentHistory): string {
    const status = (item.status || '').toUpperCase();
    const name = item.name || 'Equipment';
    const sku = item.sku ? ` (SKU: ${item.sku})` : '';
    const costText = item.cost ? ` at ₹${item.cost} per unit` : '';

    const stockInCount = item.stockIn || 0;
    const stockUsedCount = item.stockUsed || 0;

    switch (status) {
      case 'CREATED':
        return `Equipment "${name}"${sku} was added to inventory with ${stockInCount} ${this.pluralize(stockInCount, 'unit')} from vendor "${item.vendor_name || 'N/A'}"${costText}.`;

      case 'UPDATED':
        return `Equipment "${name}"${sku} stock was replenished by ${stockInCount} ${this.pluralize(stockInCount, 'unit')} from vendor "${item.vendor_name || 'N/A'}"${costText}.`;

      case 'ASSIGNED':
        return `${stockUsedCount} ${this.pluralize(stockUsedCount, 'unit')} of Equipment "${name}"${sku} ${stockUsedCount === 1 ? 'was' : 'were'} assigned to Project "${item.project_name || 'N/A'}".`;

      case 'TRANSFER':
        return `${stockUsedCount} ${this.pluralize(stockUsedCount, 'unit')} of Equipment "${name}"${sku} ${stockUsedCount === 1 ? 'was' : 'were'} transferred to Project "${item.project_name || 'N/A'}"${item.note ? ` with note: "${item.note}"` : ''}.`;

      default:
        return `Stock movement recorded for Equipment "${name}"${sku}.`;
    }
  }

  getActivityIcon(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'CREATED':
        return 'add_circle';
      case 'UPDATED':
        return 'edit';
      case 'ASSIGNED':
        return 'assignment_ind';
      case 'TRANSFER':
        return 'swap_horiz';
      default:
        return 'construction';
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

  getActorName(item: EquipmentHistory): string {
    if (item.created_by && item.created_by.trim().length > 0) {
      return item.created_by;
    }

    if (item.user) {
      const fullName = `${item.user.firstname || ''} ${item.user.lastname || ''}`.trim();
      if (fullName) return fullName;
    }

    return this.currentUserDisplayName();
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
      'Equipment', 'SKU', 'Category', 'Stock In', 'Stock Used',
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
    link.setAttribute('download', `equipment-inventory-history-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}