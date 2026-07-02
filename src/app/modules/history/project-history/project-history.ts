import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProjectHistoryServices, IProjectHistory } from './project-history-services';
import { ProjectService } from '../../projects/services/project-service';

interface ITabConfig {
  key: string;
  label: string;
  count: number;
}

interface IProjectContext {
  name: string | null;
  status: string | null;
  documents: any[];
  milestoneMap: Record<string, string>;
  subMilestoneMap: Record<string, string>;
  subMilestoneParentMap: Record<string, string>;
}

interface IHistoryDisplay extends IProjectHistory {
  category: string;
  icon: string;
  colorClass: string;
  dateLabel: string;
  timeLabel: string;
  userName: string;
  statement: string;
  projectLabel?: string;
  metaCreatedAt?: string;
  metaCreatedBy?: string;
  metaUpdatedAt?: string;
  metaUpdatedBy?: string;
}
interface ProjectRecord {
  project: any;
  loaded: boolean;
  loading: boolean;
  context: IProjectContext;
  rawHistory: IProjectHistory[];
}

@Component({
  selector: 'app-project-history',
  standalone: false,
  templateUrl: './project-history.html',
  styleUrl: './project-history.scss',
})
export class ProjectHistory implements OnInit, OnChanges {
  @Input() projectId?: string | number;

  error: string | null = null;

  projects: any[] = [];
  loadingProjects = false;

  records: Record<string, ProjectRecord> = {};

  dropdownOpen = false;
  projectSearchQuery = '';
  filteredProjects: any[] = [];
  selectedProjectIds: (string | number)[] = [];

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

  private _displayCache: { key: string; events: IHistoryDisplay[] } | null = null;
  private _groupCache: { key: string; groups: { date: string; entries: IHistoryDisplay[] }[] } | null = null;

  constructor(
    private historyService: ProjectHistoryServices,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (this.dropdownOpen && !target.closest('[data-dropdown="project"]')) {
      this.dropdownOpen = false;
    }
  }

  ngOnInit() {
    if (this.projectId) {
      this.loadingProjects = false;
      this.selectedProjectIds = [this.projectId];
      this.ensureProjectLoaded({ id: this.projectId });
      return;
    }

    const routeProjectId =
      this.route.snapshot.queryParamMap.get('projectId') ||
      this.route.snapshot.paramMap.get('projectId');

    if (routeProjectId) {
      this.projectId = routeProjectId;
      this.loadingProjects = false;
      this.selectedProjectIds = [routeProjectId];
      this.ensureProjectLoaded({ id: routeProjectId });
      return;
    }

    this.loadProjectList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && !changes['projectId'].firstChange && this.projectId) {
      this.selectedProjectIds = [this.projectId];
      this.ensureProjectLoaded({ id: this.projectId });
      this.invalidateCaches();
    }
  }

  loadProjectList() {
    this.loadingProjects = true;
    this.projectService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = res.data || [];
        this.filteredProjects = [...this.projects];
        this.loadingProjects = false;
        if (this.projects.length > 0) {
          this.selectedProjectIds = this.projects.map(p => p.id);
          this.projects.forEach(p => this.ensureProjectLoaded(p));
        }
      },
      error: () => {
        this.loadingProjects = false;
        this.toastr.error('Failed to load projects list');
      }
    });
  }


  private ensureProjectLoaded(project: any): void {
    const id = String(project.id);
    if (this.records[id]?.loaded || this.records[id]?.loading) return;
    this.loadProjectRecord(project);
  }

  private formatDisplayDate(dateInput?: string | null): string {
    if (!dateInput) return 'N/A';
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return 'N/A';
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    return `${d.getDate()} ${mmm} ${d.getFullYear()}`;
  }

  private loadProjectRecord(project: any): void {
    const id = String(project.id);
    const rec: ProjectRecord = {
      project,
      loaded: false,
      loading: true,
      context: {
        name: null,
        status: null,
        documents: [],
        milestoneMap: {},
        subMilestoneMap: {},
        subMilestoneParentMap: {},
      },
      rawHistory: [],
    };
    this.records = { ...this.records, [id]: rec };

    const projectDetail$ = this.projectService.getProjectById(project.id).pipe(
      map((res: any) => res?.data || res),
      catchError(() => of(null))
    );
    const history$ = this.historyService.getProjectHistory(project.id).pipe(
      map((res: any) => res.data || []),
      catchError(() => of([]))
    );

    forkJoin({ detail: projectDetail$, history: history$ }).subscribe({
      next: ({ detail, history }) => {
        const foundInList = this.projects.find(p => String(p.id) === id);

        const flatMilestones: any[] = Array.isArray(detail?.milestones) ? detail.milestones : [];
        const milestoneMap: Record<string, string> = {};
        const subMilestoneMap: Record<string, string> = {};
        const subMilestoneParentMap: Record<string, string> = {};

        flatMilestones.forEach(ms => {
          if (ms?.id == null) return;
          if (ms.parent_id === null || ms.parent_id === undefined) {
            milestoneMap[String(ms.id)] = ms.name ?? `Milestone #${ms.id}`;
          } else {
            subMilestoneMap[String(ms.id)] = ms.name ?? `Sub-Milestone #${ms.id}`;
          }
        });
        flatMilestones.forEach(ms => {
          if (ms?.id == null || ms.parent_id === null || ms.parent_id === undefined) return;
          subMilestoneParentMap[String(ms.id)] = milestoneMap[String(ms.parent_id)] ?? null as any;
        });

        rec.context = {
          name: detail?.name || foundInList?.name || project?.name || null,
          status: detail?.status || foundInList?.status || project?.status || null,
          documents: detail?.documents || foundInList?.documents || [],
          milestoneMap,
          subMilestoneMap,
          subMilestoneParentMap,
        };
        rec.rawHistory = history || [];
        rec.loaded = true;
        rec.loading = false;
        this.records = { ...this.records, [id]: { ...rec } };
        this.invalidateCaches();
      },
      error: () => {
        rec.loaded = true;
        rec.loading = false;
        this.records = { ...this.records, [id]: { ...rec } };
        this.invalidateCaches();
      }
    });
  }

  private invalidateCaches(): void {
    this._displayCache = null;
    this._groupCache = null;
  }

  fetchHistory() {
    this.error = null;
    this.effectiveIds.forEach(id => {
      const rec = this.records[String(id)];
      if (!rec || (!rec.loaded && !rec.loading)) {
        const projectObj = this.projects.find(p => String(p.id) === String(id)) || { id };
        this.loadProjectRecord(projectObj);
      }
    });
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.projectSearchQuery = '';
      this.filteredProjects = [...this.projects];
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  onProjectSearch() {
    const q = (this.projectSearchQuery || '').trim().toLowerCase();
    this.filteredProjects = !q
      ? [...this.projects]
      : this.projects.filter(p => (p.name || '').toLowerCase().includes(q));
  }

  get isAllSelected(): boolean {
    return this.projects.length > 0 && this.selectedProjectIds.length === this.projects.length;
  }

  get isPartiallySelected(): boolean {
    return this.selectedProjectIds.length > 0 && !this.isAllSelected;
  }

  isProjectSelected(p: any): boolean {
    return this.selectedProjectIds.some(id => String(id) === String(p.id));
  }

  toggleAllProjects() {
    if (this.isAllSelected) {
      this.selectedProjectIds = [];
    } else {
      this.selectedProjectIds = this.projects.map(p => p.id);
      this.projects.forEach(p => this.ensureProjectLoaded(p));
    }
    this.invalidateCaches();
  }

  toggleProject(p: any) {
    if (!p?.id) return;
    const idx = this.selectedProjectIds.findIndex(id => String(id) === String(p.id));
    if (idx > -1) {
      this.selectedProjectIds = this.selectedProjectIds.filter((_, i) => i !== idx);
    } else {
      this.selectedProjectIds = [...this.selectedProjectIds, p.id];
      this.ensureProjectLoaded(p);
    }
    this.invalidateCaches();
  }

  removeProjectChip(id: string | number) {
    this.selectedProjectIds = this.selectedProjectIds.filter(pid => String(pid) !== String(id));
    this.invalidateCaches();
  }

  clearAllChips() {
    this.selectedProjectIds = this.projects.map(p => p.id);
    this.projects.forEach(p => this.ensureProjectLoaded(p));
    this.invalidateCaches();
  }

  get selectedProjectsList(): any[] {
    return this.projects.filter(p => this.isProjectSelected(p));
  }

  get projectSelectorLabel(): string {
    if (!this.projects.length) return 'Select Project';
    if (this.isAllSelected) return 'All Projects';
    if (this.selectedProjectIds.length === 0) return 'Select Project';
    return `${this.selectedProjectIds.length} Project${this.selectedProjectIds.length === 1 ? '' : 's'}`;
  }

  get sectionHeadingLabel(): string {
    if (this.activeTab !== 'All') {
      return `${this.activeTab} — Activity History`;
    }
    const countLabel = this.isAllSelected ? 'All Projects' : `${this.selectedProjectIds.length} Project(s)`;
    return `${countLabel} — Activity History`;
  }

  get activeProjectsCount(): number {
    return this.projects.filter(p => (p.status || '').toLowerCase() === 'active').length;
  }

  get pendingProjectsCount(): number {
    return this.projects.filter(p => (p.status || '').toLowerCase() !== 'active').length;
  }

  formatShortDate(dateInput?: string | null): string {
    if (!dateInput) return '—';
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    return `${dd}/${mmm}/${d.getFullYear()}`;
  }

  private get effectiveIds(): (string | number)[] {
    if (this.projects.length > 0) {
      return this.selectedProjectIds.length ? this.selectedProjectIds : this.projects.map(p => p.id);
    }
    return this.projectId ? [this.projectId] : [];
  }

  get isTimelineLoading(): boolean {
    const ids = this.effectiveIds;
    if (!ids.length) return this.loadingProjects;
    return ids.some(id => !this.records[String(id)]?.loaded);
  }

  get loading(): boolean {
    return this.isTimelineLoading;
  }

  private mapCategory(actionType: string): string {
    const type = (actionType || '').toUpperCase();
    if (type.includes('MILESTONE')) return 'Milestone';
    if (type.includes('DOCUMENT') || type.includes('BLUEPRINT') || type.includes('FILE') || type.includes('UPLOAD')) return 'Document';
    if (type.includes('SUBTASK') || type.includes('TASK')) return 'Task';
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

  private cleanName(val: any): string | null {
    if (val === null || val === undefined) return null;
    const str = String(val).trim();
    if (!str) return null;
    if (str.toLowerCase() === 'unknown') return null;
    if (str.includes('@')) return null;
    return str;
  }

  private currentUserDisplayName(): string {
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) {
        const user = JSON.parse(raw);
        const name = `${user?.firstname || ''} ${user?.lastname || ''}`.trim();
        return name || user?.username || 'Unknown';
      }
    } catch {

    }
    return 'Unknown';
  }

  private formatDateTime(dateInput?: string | null): string {
    if (!dateInput) return '—';
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${dd}/${mmm}/${d.getFullYear()}, ${time}`;
  }

  private buildRowMeta(
    h: IProjectHistory,
    actorName: string | null,
    fallbackUser: string
  ): { createdAt?: string; createdBy?: string; updatedAt?: string; updatedBy?: string } {
    const actor = this.cleanName(actorName) || fallbackUser;
    const formatted = this.formatDateTime(h.createdAt);
    const isCreated = (h.action_type || '').toUpperCase().includes('CREATED');

    if (isCreated) {
      return { createdAt: formatted, createdBy: actor };
    }
    return { updatedAt: formatted, updatedBy: actor };
  }

  private getMetaVal(m: any, keys: string[]): any {
    if (!m) return null;
    for (const k of keys) {
      const v = m[k];
      if (v !== undefined && v !== null && v !== '') return v;
    }
    return null;
  }

  private getActionWord(actionType: string): string {
    const type = (actionType || '').toUpperCase();
    if (type.includes('DELETED')) return 'deleted';
    if (type.includes('UPLOAD')) return 'uploaded';
    if (type.includes('STATUS')) return 'status changed';
    if (type.includes('ADDED')) return 'added';
    if (type.includes('CREATED')) return 'created';
    if (type.includes('UPDATED')) return 'updated';
    return this.getActionLabel(actionType).toLowerCase();
  }

  private extractQuoted(text: string, regex: RegExp): string | null {
    if (!text) return null;
    const match = text.match(regex);
    return match ? match[1] : null;
  }

  private findDocumentNameNearTime(createdAt: string, documents: any[]): string | null {
    if (!documents?.length) return null;
    const target = new Date(createdAt).getTime();
    let closest: any = null;
    let closestDiff = Infinity;

    for (const doc of documents) {
      const docTime = new Date(doc.createdAt).getTime();
      const diff = Math.abs(docTime - target);
      if (diff < closestDiff) {
        closestDiff = diff;
        closest = doc;
      }
    }

    return closest && closestDiff <= 2 * 60 * 1000 ? closest.name : null;
  }

  private buildStatement(h: IProjectHistory, category: string, ctx: IProjectContext): string {
    const m: any = this.parseMeta(h.meta);
    const type = (h.action_type || '').toUpperCase();
    const actionWord = this.getActionWord(h.action_type);
    const detail = (h.detail || '').trim();
    const fallback = detail || this.getActionLabel(h.action_type);
    const projectName = ctx.name || this.getMetaVal(m, ['project_name', 'projectName', 'name']);
    const projectStatus = this.getMetaVal(m, ['status', 'new_status', 'newStatus']) || ctx.status;

    switch (category) {

      case 'Project': {
        if (!projectName) return fallback;
        let stmt = `Project "${projectName}" was ${actionWord}.`;
        if (projectStatus) stmt += ` Current status: ${projectStatus}.`;
        return stmt;
      }

      case 'Task': {
        const taskName = this.getMetaVal(m, ['task_name', 'taskName']) ||
          this.extractQuoted(detail, /task\s+"([^"]+)"/i);
        const status = this.getMetaVal(m, ['status', 'new_status', 'newStatus', 'task_status']);
        const subtaskName = this.getMetaVal(m, ['subtask_name', 'subTaskName']);

        if (!taskName || !projectName) return fallback;

        if (type.includes('SUBTASK')) {
          if (!subtaskName) return fallback;

          if (type.includes('DELETED')) {
            return `Sub-task "${subtaskName}" was deleted from Task "${taskName}" for Project "${projectName}".`;
          }
          if (status) {
            return `Sub-task "${subtaskName}" on Task "${taskName}" for Project "${projectName}" was marked as "${status}".`;
          }
          return `Sub-task "${subtaskName}" was added to Task "${taskName}" for Project "${projectName}".`;
        }

        if (type.includes('COMMENT')) {
          return `A comment was added to Task "${taskName}" for Project "${projectName}".`;
        }

        if (type.includes('STATUS')) {
          if (!status) return fallback;
          return `Task "${taskName}" for Project "${projectName}" status was changed to "${status}".`;
        }

        if (status) {
          return `Task "${taskName}" for Project "${projectName}" was ${actionWord} with status "${status}".`;
        }
        return `Task "${taskName}" for Project "${projectName}" was ${actionWord}.`;
      }

      case 'Milestone': {
        const milestoneName = this.getMetaVal(m, ['milestone_name', 'milestoneName', 'name']) ||
          this.extractQuoted(detail, /milestone\s+"([^"]+)"/i);
        const subMilestoneName = this.getMetaVal(m, ['submilestone_name', 'subMilestoneName', 'sub_milestone_name']);

        const metaProgress = this.getMetaVal(m, ['progress', 'milestone_progress', 'completion']);
        let progress: any = metaProgress;

        if (progress == null) {
          const percentages = detail.match(/(\d+)%/g);
          if (percentages && percentages.length > 0) {
            progress = percentages[percentages.length - 1].replace('%', '');
          }
        }

        if (subMilestoneName) {
          if (!projectName || progress == null) return fallback;
          return `Sub-Milestone "${subMilestoneName}" for Project "${projectName}" reached ${progress}% completion.`;
        }

        if (!projectName || !milestoneName || progress == null) return fallback;
        return `Milestone "${milestoneName}" for Project "${projectName}" reached ${progress}% completion.`;
      }

      case 'Timeline': {
        const event = this.getMetaVal(m, ['event']);
        const fmtDate = (d: any) => this.formatDisplayDate(d);

        if (event === 'timeline_created') {
          const msCount = this.getMetaVal(m, ['milestone_count']);
          const subCount = this.getMetaVal(m, ['submilestone_count']);
          const start = this.getMetaVal(m, ['start_date']);
          const end = this.getMetaVal(m, ['end_date']);
          let stmt = `Timeline created for Project "${projectName || '—'}"`;
          if (msCount != null) stmt += ` with ${msCount} milestone(s)`;
          if (subCount != null && Number(subCount) > 0) stmt += ` and ${subCount} sub-milestone(s)`;
          if (start || end) stmt += ` scheduled from ${fmtDate(start)} to ${fmtDate(end)}`;
          return stmt + '.';
        }

        if (event === 'milestone_added') {
          const milestoneName = this.getMetaVal(m, ['milestone_name']);
          if (!milestoneName) return fallback;
          return `Milestone "${milestoneName}" was added to the project timeline with a planned duration from ${fmtDate(this.getMetaVal(m, ['start_date']))} to ${fmtDate(this.getMetaVal(m, ['end_date']))}.`;
        }

        if (event === 'submilestone_added') {
          const subName = this.getMetaVal(m, ['submilestone_name']);
          const parentName = this.getMetaVal(m, ['parent_milestone_name']);
          if (!subName) return fallback;
          return `Sub-milestone "${subName}" was added under "${parentName || '—'}", scheduled from ${fmtDate(this.getMetaVal(m, ['start_date']))} to ${fmtDate(this.getMetaVal(m, ['end_date']))}.`;
        }

        if (event === 'bulk_updated') {
          const count = this.getMetaVal(m, ['count']);
          return `Project timeline was updated. The schedule for ${count} milestone(s) was modified for Project "${projectName || '—'}".`;
        }

        if (event === 'milestone_date_changed') {
          const milestoneName = this.getMetaVal(m, ['milestone_name']);
          if (!milestoneName) return fallback;
          return `Milestone "${milestoneName}" schedule was changed from ${fmtDate(this.getMetaVal(m, ['old_start_date']))} – ${fmtDate(this.getMetaVal(m, ['old_end_date']))} to ${fmtDate(this.getMetaVal(m, ['new_start_date']))} – ${fmtDate(this.getMetaVal(m, ['new_end_date']))}.`;
        }

        if (event === 'submilestone_date_changed') {
          const subName = this.getMetaVal(m, ['submilestone_name']);
          if (!subName) return fallback;
          return `Sub-milestone "${subName}" timeline was updated from ${fmtDate(this.getMetaVal(m, ['old_start_date']))} – ${fmtDate(this.getMetaVal(m, ['old_end_date']))} to ${fmtDate(this.getMetaVal(m, ['new_start_date']))} – ${fmtDate(this.getMetaVal(m, ['new_end_date']))}.`;
        }

        const taskName = this.getMetaVal(m, ['task_name', 'taskName']) ||
          this.extractQuoted(detail, /task\s+"([^"]+)"/i);
        const milestoneName = this.getMetaVal(m, ['milestone_name', 'milestoneName', 'name']) ||
          this.extractQuoted(detail, /milestone\s+"([^"]+)"/i);
        const subMilestoneName = this.getMetaVal(m, ['submilestone_name', 'subMilestoneName', 'sub_milestone_name']);

        if (taskName && subMilestoneName) {
          return `Task "${taskName}" is scheduled under Sub-Milestone "${subMilestoneName}" for Project "${projectName || '—'}".`;
        }
        if (taskName && milestoneName) {
          return `Task "${taskName}" is scheduled under Milestone "${milestoneName}" for Project "${projectName || '—'}".`;
        }
        if (milestoneName || subMilestoneName) {
          let stmt = 'Schedule updated for';
          if (milestoneName) stmt += ` milestone "${milestoneName}"`;
          if (milestoneName && subMilestoneName) stmt += ' and';
          if (subMilestoneName) stmt += ` sub-milestone "${subMilestoneName}"`;
          return stmt + '.';
        }
        return detail ? detail.charAt(0).toUpperCase() + detail.slice(1) + '.' : fallback;
      }

      case 'Budget': {
        const amount = this.getMetaVal(m, ['budget_allocation', 'budget', 'amount', 'total']);
        if (amount == null) return fallback;
        const amt = Number(amount) || 0;
        return `Budget of ₹${amt.toLocaleString('en-IN')} was ${actionWord} for Project "${projectName || '—'}".`;
      }

      case 'Document': {
        const metaFileName = this.getMetaVal(m, ['file_name', 'fileName', 'document_name', 'documentName', 'name']);
        const fileName = metaFileName || this.findDocumentNameNearTime(h.createdAt, ctx.documents);

        if (!fileName) return fallback;
        return `Document "${fileName}" was ${actionWord} for Project "${projectName || '—'}".`;
      }

      default:
        return fallback;
    }
  }

  private parseMeta(meta: any): any {
    if (!meta) return {};
    if (typeof meta === 'string') {
      try {
        return JSON.parse(meta);
      } catch {
        return {};
      }
    }
    return meta;
  }

  private buildProjectDisplayEvents(rec: ProjectRecord): IHistoryDisplay[] {
    const fallbackUser = this.currentUserDisplayName();
    return (rec.rawHistory || []).map(h => {
      const category = this.mapCategory(h.action_type);
      const date = new Date(h.createdAt);
      const actorName = h.user ? this.cleanName(`${h.user.firstname} ${h.user.lastname}`) : null;
      const rowMeta = this.buildRowMeta(h, actorName, fallbackUser);
      const statement = this.buildStatement(h, category, rec.context);

      return {
        ...h,
        category,
        icon: this.mapIcon(category),
        colorClass: this.mapColor(category),
        dateLabel: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        timeLabel: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        userName: actorName || fallbackUser,
        statement,
        projectLabel: rec.context.name || undefined,
        metaCreatedAt: rowMeta.createdAt,
        metaCreatedBy: rowMeta.createdBy,
        metaUpdatedAt: rowMeta.updatedAt,
        metaUpdatedBy: rowMeta.updatedBy,
      } as IHistoryDisplay;
    });
  }

  get displayHistory(): IHistoryDisplay[] {
    const ids = this.effectiveIds;
    const selectedKey = [...ids].map(String).sort().join(',');
    const loadedKey = ids.filter(id => this.records[String(id)]?.loaded).map(String).join(',');
    const key = `${selectedKey}|${loadedKey}`;

    if (this._displayCache?.key === key) return this._displayCache.events;

    const events: IHistoryDisplay[] = [];
    ids.forEach(id => {
      const rec = this.records[String(id)];
      if (rec?.loaded) events.push(...this.buildProjectDisplayEvents(rec));
    });
    const sorted = events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    this._displayCache = { key, events: sorted };

    this.tabs.forEach(tab => {
      tab.count = tab.key === 'All'
        ? sorted.length
        : sorted.filter(h => h.category === tab.key).length;
    });

    return sorted;
  }

  get groupedHistory(): { date: string; entries: IHistoryDisplay[] }[] {
    const all = this.displayHistory;
    const ids = this.effectiveIds;
    const selectedKey = [...ids].map(String).sort().join(',');
    const loadedKey = ids.filter(id => this.records[String(id)]?.loaded).map(String).join(',');
    const key = `${selectedKey}|${loadedKey}|${this.activeTab}`;

    if (this._groupCache?.key === key) return this._groupCache.groups;

    const filtered = this.activeTab === 'All'
      ? all
      : all.filter(h => h.category === this.activeTab);

    const groups: { [key: string]: IHistoryDisplay[] } = {};
    filtered.forEach(h => {
      if (!groups[h.dateLabel]) groups[h.dateLabel] = [];
      groups[h.dateLabel].push(h);
    });

    const result = Object.keys(groups).map(date => ({ date, entries: groups[date] }));
    this._groupCache = { key, groups: result };
    return result;
  }

  get totalEntries() { return this.displayHistory.length; }
  get totalMilestoneEvents() { return this.tabs.find(t => t.key === 'Milestone')?.count || 0; }
  get totalTaskEvents() { return this.tabs.find(t => t.key === 'Task')?.count || 0; }
  get totalDocumentEvents() { return this.tabs.find(t => t.key === 'Document')?.count || 0; }

  get activeTabCount(): number {
    return this.tabs.find(t => t.key === this.activeTab)?.count || 0;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  exportCsv() {
    const rows = [
      ['Date', 'Time', 'Project', 'Category', 'Action', 'Detail', 'User', 'Created At', 'Created By', 'Updated At', 'Updated By'],
      ...this.displayHistory.map(h => [
        h.dateLabel, h.timeLabel, h.projectLabel || '—', h.category,
        this.getActionLabel(h.action_type), h.statement || h.detail || '', h.userName,
        h.metaCreatedAt || '—', h.metaCreatedBy || '—',
        h.metaUpdatedAt || '—', h.metaUpdatedBy || '—',
      ])
    ];

    const csvContent = rows
      .map(r => r.map(c => `"${(c || '').toString().replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `project-history-${this.projectId || 'all'}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}