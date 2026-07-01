import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ProjectHistoryServices, IProjectHistory } from './project-history-services';
import { ProjectService } from '../../projects/services/project-service';

interface IProjectOption {
  id: number;
  name: string;
}

interface IHistoryEntry {
  id: number;
  category: string;
  action_type: string;
  statement: string;
  icon: string;
  colorClass: string;
  metaCreatedBy?: string;
  metaCreatedAt?: string;
  metaUpdatedBy?: string;
  metaUpdatedAt?: string;
  createdAt: string;
}

interface IGroupedHistory {
  date: string;
  entries: IHistoryEntry[];
}

@Component({
  selector: 'app-project-history',
  standalone: false,
  templateUrl: './project-history.html',
  styleUrl: './project-history.scss',
})
export class ProjectHistory implements OnInit {
  projects: IProjectOption[] = [];
  selectedProjectIds: number[] = [];
  projectSearchTerm = '';
  isProjectDropdownOpen = false;
  loadingProjects = false;

  get projectId(): number | null {
    return this.selectedProjectIds.length > 0 ? this.selectedProjectIds[0] : null;
  }

  allHistory: IHistoryEntry[] = [];
  groupedHistory: IGroupedHistory[] = [];
  loading = false;
  error: string | null = null;

  tabs = [
    { key: 'All', label: 'All', count: 0 },
    { key: 'Milestone', label: 'Milestones', count: 0 },
    { key: 'Task', label: 'Tasks', count: 0 },
    { key: 'Document', label: 'Documents', count: 0 },
    { key: 'Budget', label: 'Budget', count: 0 },
    { key: 'Team', label: 'Team', count: 0 },
  ];
  activeTab = 'All';

  constructor(
    private historyService: ProjectHistoryServices,
    private projectService: ProjectService,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isProjectDropdownOpen = false;
    }
  }

  loadProjects(): void {
    this.loadingProjects = true;
    this.projectService
      .getProjects()
      .pipe(finalize(() => (this.loadingProjects = false)))
      .subscribe({
        next: (res: any) => {
          this.projects = (res?.data ?? res ?? []).map((p: any) => ({ id: p.id, name: p.name }));
          this.selectedProjectIds = this.projects.map((p) => p.id);
          if (this.selectedProjectIds.length > 0) {
            this.fetchHistory();
          }
        },
        error: () => {
          this.error = 'Failed to load projects.';
        },
      });
  }

  get filteredProjects(): IProjectOption[] {
    const term = this.projectSearchTerm.trim().toLowerCase();
    if (!term) return this.projects;
    return this.projects.filter((p) => p.name.toLowerCase().includes(term));
  }

  get isAllSelected(): boolean {
    return this.projects.length > 0 && this.selectedProjectIds.length === this.projects.length;
  }

  get selectedCountLabel(): string {
    if (this.projects.length === 0) return 'No Projects';
    if (this.isAllSelected) return 'All Projects';
    if (this.selectedProjectIds.length === 1) {
      const p = this.projects.find((pr) => pr.id === this.selectedProjectIds[0]);
      return p ? p.name : '1 Selected';
    }
    if (this.selectedProjectIds.length === 0) return 'Select Project';
    return `${this.selectedProjectIds.length} Projects`;
  }

  toggleProjectDropdown(): void {
    this.isProjectDropdownOpen = !this.isProjectDropdownOpen;
  }

  toggleSelectAllProjects(): void {
    this.selectedProjectIds = this.isAllSelected ? [] : this.projects.map((p) => p.id);
  }

  toggleProjectSelection(id: number): void {
    const idx = this.selectedProjectIds.indexOf(id);
    if (idx > -1) {
      this.selectedProjectIds.splice(idx, 1);
    } else {
      this.selectedProjectIds.push(id);
    }
  }

  isProjectChecked(id: number): boolean {
    return this.selectedProjectIds.includes(id);
  }

  applyProjectSelection(): void {
    this.isProjectDropdownOpen = false;
    if (this.selectedProjectIds.length === 0) {
      this.allHistory = [];
      this.groupedHistory = [];
      this.recomputeTabCounts();
      return;
    }
    this.fetchHistory();
  }

  onProjectChange(id: number): void {
    this.selectedProjectIds = [id];
    this.fetchHistory();
  }


  fetchHistory(): void {
    if (this.selectedProjectIds.length === 0) return;

    this.loading = true;
    this.error = null;

    const requests = this.selectedProjectIds.map((id) => this.historyService.getProjectHistory(id));

    forkJoin(requests)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (responses) => {
          const merged: IProjectHistory[] = ([] as IProjectHistory[]).concat(
            ...responses.map((r: any) => r?.data ?? [])
          );
          this.allHistory = merged.map((item) => this.mapToEntry(item));
          this.recomputeTabCounts();
          this.rebuildGroups();
        },
        error: () => {
          this.error = 'Failed to load project history. Please try again.';
        },
      });
  }

  setActiveTab(key: string): void {
    this.activeTab = key;
    this.rebuildGroups();
  }

  get totalEntries(): number {
    return this.allHistory.length;
  }
  get totalMilestoneEvents(): number {
    return this.allHistory.filter((e) => e.category === 'Milestone').length;
  }
  get totalTaskEvents(): number {
    return this.allHistory.filter((e) => e.category === 'Task').length;
  }
  get totalDocumentEvents(): number {
    return this.allHistory.filter((e) => e.category === 'Document').length;
  }
  get activeTabCount(): number {
    return this.activeTab === 'All'
      ? this.allHistory.length
      : this.allHistory.filter((e) => e.category === this.activeTab).length;
  }

  getActionLabel(actionType: string): string {
    if (!actionType) return '';
    const t = actionType.toLowerCase();
    if (t.includes('create')) return 'Created';
    if (t.includes('update')) return 'Updated';
    if (t.includes('delete')) return 'Deleted';
    const parts = actionType.split('_');
    const last = parts[parts.length - 1];
    return last ? last.charAt(0).toUpperCase() + last.slice(1) : actionType;
  }

  exportCsv(): void {
    if (!this.allHistory.length) return;

    const headers = ['Date', 'Category', 'Action', 'Detail', 'Created By', 'Created At', 'Updated By', 'Updated At'];
    const rows = this.allHistory.map((e) => [
      new Date(e.createdAt).toLocaleString(),
      e.category,
      this.getActionLabel(e.action_type),
      (e.statement || '').replace(/\n/g, ' '),
      e.metaCreatedBy || '',
      e.metaCreatedAt || '',
      e.metaUpdatedBy || '',
      e.metaUpdatedAt || '',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `project-history-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }


  private mapToEntry(item: IProjectHistory): IHistoryEntry {
    const category = this.getCategoryFromActionType(item.action_type);
    const userName = item.user ? `${item.user.firstname} ${item.user.lastname}`.trim() : undefined;
    const isCreate = item.action_type?.toLowerCase().includes('create');
    const isUpdate = item.action_type?.toLowerCase().includes('update');

    return {
      id: item.id,
      category,
      action_type: item.action_type,
      statement: item.detail,
      icon: this.getIconForCategory(category),
      colorClass: this.getColorClassForCategory(category),
      metaCreatedBy: item.meta?.createdBy ?? (isCreate ? userName : undefined),
      metaCreatedAt: item.meta?.createdAt ?? (isCreate ? item.createdAt : undefined),
      metaUpdatedBy: item.meta?.updatedBy ?? (isUpdate ? userName : undefined),
      metaUpdatedAt: item.meta?.updatedAt ?? (isUpdate ? item.createdAt : undefined),
      createdAt: item.createdAt,
    };
  }

  private getCategoryFromActionType(actionType: string): string {
    const t = (actionType || '').toLowerCase();
    if (t.includes('milestone')) return 'Milestone';
    if (t.includes('task')) return 'Task';
    if (t.includes('document') || t.includes('file')) return 'Document';
    if (t.includes('budget') || t.includes('cost')) return 'Budget';
    if (t.includes('team') || t.includes('member') || t.includes('vendor')) return 'Team';
    return 'Other';
  }

  private getIconForCategory(category: string): string {
    const map: Record<string, string> = {
      Milestone: 'flag',
      Task: 'task_alt',
      Document: 'description',
      Budget: 'payments',
      Team: 'group',
      Other: 'history',
    };
    return map[category] ?? 'history';
  }

  private getColorClassForCategory(category: string): string {
    const map: Record<string, string> = {
      Milestone: 'bg-fuchsia-100 text-fuchsia-600',
      Task: 'bg-emerald-100 text-emerald-600',
      Document: 'bg-amber-100 text-amber-600',
      Budget: 'bg-orange-100 text-orange-600',
      Team: 'bg-blue-100 text-blue-600',
      Other: 'bg-slate-100 text-slate-600',
    };
    return map[category] ?? 'bg-slate-100 text-slate-600';
  }

  private recomputeTabCounts(): void {
    const counts: Record<string, number> = {};
    this.allHistory.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    this.tabs.forEach((tab) => {
      tab.count = tab.key === 'All' ? this.allHistory.length : counts[tab.key] || 0;
    });
  }

  private rebuildGroups(): void {
    const filtered =
      this.activeTab === 'All' ? this.allHistory : this.allHistory.filter((e) => e.category === this.activeTab);

    const map = new Map<string, IHistoryEntry[]>();
    filtered
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .forEach((e) => {
        const dateKey = new Date(e.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
        if (!map.has(dateKey)) map.set(dateKey, []);
        map.get(dateKey)!.push(e);
      });

    this.groupedHistory = Array.from(map.entries()).map(([date, entries]) => ({ date, entries }));
  }
}