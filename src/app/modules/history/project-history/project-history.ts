import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProjectHistoryServices, IProjectHistory } from './project-history-services';
import { ProjectService } from '../../projects/services/project-service';

interface ITabConfig {
  key: string;
  label: string;
  count: number;
}

interface IHistoryDisplay extends IProjectHistory {
  category: string;
  icon: string;
  colorClass: string;
  dateLabel: string;
  timeLabel: string;
  userName: string;
}

@Component({
  selector: 'app-project-history',
  standalone: false,
  templateUrl: './project-history.html',
  styleUrl: './project-history.scss',
})
export class ProjectHistory implements OnInit, OnChanges {
  @Input() projectId?: string | number;

  loading = false;
  error: string | null = null;

  rawHistory: IProjectHistory[] = [];
  displayHistory: IHistoryDisplay[] = [];
  groupedHistory: { date: string; entries: IHistoryDisplay[] }[] = [];

  projects: any[] = [];
  selectedProjectId: string | number | null = null;
  loadingProjects = false; // ✅ FIX: true tha, false kiya

  activeTab = 'All';
  tabs: ITabConfig[] = [
    { key: 'All', label: 'All', count: 0 },
    { key: 'Project', label: 'Project', count: 0 },
    { key: 'Task', label: 'Task', count: 0 },
    { key: 'Timeline', label: 'Timeline', count: 0 },
    { key: 'Milestone', label: 'Milestone', count: 0 },
    { key: 'Budget', label: 'Budget', count: 0 },
    { key: 'Document', label: 'Document', count: 0 },
  ];

  constructor(
    private historyService: ProjectHistoryServices,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Case 1: projectId parent component se [projectId] input ke zariye aaya
    if (this.projectId) {
      this.loadingProjects = false; // ✅ FIX: spinner rok do
      this.fetchHistory();
      return;
    }

    // Case 2: projectId route param/query se aaya
    const routeProjectId =
      this.route.snapshot.queryParamMap.get('projectId') ||
      this.route.snapshot.paramMap.get('projectId');

    if (routeProjectId) {
      this.projectId = routeProjectId;
      this.selectedProjectId = routeProjectId;
      this.loadingProjects = false; // ✅ FIX
      this.fetchHistory();
      return;
    }

    // Case 3: standalone page — project picker dikhao
    this.loadProjectList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && !changes['projectId'].firstChange && this.projectId) {
      this.loadingProjects = false; // ✅ FIX
      this.fetchHistory();
    }
  }

  loadProjectList() {
    this.loadingProjects = true;
    this.projectService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = res.data || [];
        this.loadingProjects = false;
        if (this.projects.length > 0) {
          this.selectedProjectId = this.projects[0].id;
          this.onProjectChange(this.selectedProjectId);
        }
      },
      error: () => {
        this.loadingProjects = false;
        this.toastr.error('Failed to load projects list');
      }
    });
  }

  onProjectChange(id: string | number | null) {
    if (!id) return;
    this.selectedProjectId = id;
    this.projectId = id;
    this.fetchHistory();
  }

  fetchHistory() {
    if (!this.projectId) return;

    this.loading = true;
    this.error = null;
    this.historyService.getProjectHistory(this.projectId).subscribe({
      next: (res) => {
        this.rawHistory = res.data || [];
        this.processHistory();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load project history.';
        this.loading = false;
        this.toastr.error(this.error);
      }
    });
  }

  private mapCategory(actionType: string): string {
    const type = (actionType || '').toUpperCase();
    if (type.includes('MILESTONE')) return 'Milestone';
    if (type.includes('SUBTASK') || type.includes('TASK')) return 'Task';
    if (type.includes('DOCUMENT') || type.includes('BLUEPRINT') || type.includes('FILE') || type.includes('UPLOAD')) return 'Document';
    if (type.includes('BUDGET')) return 'Budget';
    if (type.includes('TIMELINE') || type.includes('PROGRESS') || type.includes('SCHEDULE')) return 'Timeline';
    return 'Project';
  }

  private mapIcon(category: string): string {
    switch (category) {
      case 'Milestone': return 'flag';
      case 'Task': return 'task_alt';
      case 'Document': return 'description';
      case 'Budget': return 'payments';
      case 'Timeline': return 'schedule';
      default: return 'rocket_launch';
    }
  }

  private mapColor(category: string): string {
    switch (category) {
      case 'Milestone': return 'text-purple-600 bg-purple-100';
      case 'Task': return 'text-emerald-600 bg-emerald-100';
      case 'Document': return 'text-amber-600 bg-amber-100';
      case 'Budget': return 'text-orange-600 bg-orange-100';
      case 'Timeline': return 'text-cyan-600 bg-cyan-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  }

  getActionLabel(actionType: string): string {
    return (actionType || '')
      .toLowerCase()
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  private processHistory() {
    this.displayHistory = this.rawHistory
      .map(h => {
        const category = this.mapCategory(h.action_type);
        const date = new Date(h.createdAt);
        return {
          ...h,
          category,
          icon: this.mapIcon(category),
          colorClass: this.mapColor(category),
          dateLabel: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          timeLabel: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          userName: h.user ? `${h.user.firstname} ${h.user.lastname}` : 'System'
        } as IHistoryDisplay;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    this.tabs.forEach(tab => {
      tab.count = tab.key === 'All'
        ? this.displayHistory.length
        : this.displayHistory.filter(h => h.category === tab.key).length;
    });

    this.applyFilterAndGroup();
  }

  get totalEntries() { return this.rawHistory.length; }
  get totalMilestoneEvents() { return this.tabs.find(t => t.key === 'Milestone')?.count || 0; }
  get totalTaskEvents() { return this.tabs.find(t => t.key === 'Task')?.count || 0; }
  get totalDocumentEvents() { return this.tabs.find(t => t.key === 'Document')?.count || 0; }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.applyFilterAndGroup();
  }

  private applyFilterAndGroup() {
    const filtered = this.activeTab === 'All'
      ? this.displayHistory
      : this.displayHistory.filter(h => h.category === this.activeTab);

    const groups: { [key: string]: IHistoryDisplay[] } = {};
    filtered.forEach(h => {
      if (!groups[h.dateLabel]) groups[h.dateLabel] = [];
      groups[h.dateLabel].push(h);
    });

    this.groupedHistory = Object.keys(groups).map(date => ({ date, entries: groups[date] }));
  }

  exportCsv() {
    const rows = [
      ['Date', 'Time', 'Category', 'Action', 'Detail', 'User'],
      ...this.displayHistory.map(h => [
        h.dateLabel, h.timeLabel, h.category,
        this.getActionLabel(h.action_type), h.detail || '', h.userName
      ])
    ];

    const csvContent = rows
      .map(r => r.map(c => `"${(c || '').toString().replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `project-history-${this.projectId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}