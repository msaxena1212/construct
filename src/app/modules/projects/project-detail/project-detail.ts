import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { IProject, IUser, IAuditEntry, IMilestone, IProjectTask, IProjectSubTask, MilestoneStatus } from '../../../shared/interfaces/project.interface';
import { MatDialog } from '@angular/material/dialog';
import { MilestoneFormDialog } from '../dialogs/milestone-form-dialog/milestone-form-dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  project: IProject | null = null;
  selectedTask: IProjectTask | null = null;
  loading = true;
  error: string | null = null;

  activeTab = 'Overview';
  tabs = ['Overview', 'Tasks', 'Timeline', 'Budget', 'BOQ', 'DPR', 'Labour', 'Drawings', 'Snags', 'MB & Billing', 'Variations', 'Safety & RFIs', 'AI Agents & Bots', 'Files'];

  teamMembers: { name: string; avatar?: string; role?: string }[] = [{ name: 'All Members' }];
  selectedMember = 'All Members';

  showRFIComposer = false;
  showDrawingUpload = false;
  rfiForm = { to: '', cc: '', bcc: '', subject: '', content: '' };
  selectedFiles: File[] = [];

  auditFilter = 'All';
  auditFilterOptions = ['All', 'Project', 'Task', 'Milestone', 'Document', 'Safety', 'Budget', 'Team'];
  auditTrail: IAuditEntry[] = [];
  auditLoading = false;
  serverUrl = environment.serverUrl;

  // Maps backend action_type -> UI display metadata for the audit trail
  private historyMeta: Record<string, { type: string; icon: string; color: string }> = {
    CREATED:                { type: 'Project',   icon: 'rocket_launch', color: 'text-blue-600 bg-blue-100' },
    UPDATED:                { type: 'Project',   icon: 'edit',          color: 'text-blue-600 bg-blue-100' },
    MILESTONE_ADDED:        { type: 'Milestone', icon: 'flag',          color: 'text-indigo-600 bg-indigo-100' },
    MILESTONE_UPDATED:      { type: 'Milestone', icon: 'flag',          color: 'text-indigo-600 bg-indigo-100' },
    TEAM_UPDATED:           { type: 'Team',      icon: 'group_add',     color: 'text-indigo-600 bg-indigo-100' },
    DOCUMENT_UPLOADED:      { type: 'Document',  icon: 'upload_file',   color: 'text-purple-600 bg-purple-100' },
    TASK_CREATED:           { type: 'Task',      icon: 'task_alt',      color: 'text-emerald-600 bg-emerald-100' },
    TASK_STATUS_CHANGED:    { type: 'Task',      icon: 'sync_alt',      color: 'text-amber-600 bg-amber-100' },
    TASK_UPDATED:           { type: 'Task',      icon: 'edit_note',     color: 'text-emerald-600 bg-emerald-100' },
    TASK_DELETED:           { type: 'Task',      icon: 'delete',        color: 'text-red-600 bg-red-100' },
    TASK_COMMENT_ADDED:     { type: 'Task',      icon: 'chat_bubble',   color: 'text-slate-600 bg-slate-100' },
    TASK_DOCUMENT_UPLOADED: { type: 'Document',  icon: 'attach_file',   color: 'text-purple-600 bg-purple-100' },
    TASK_SUBTASK_ADDED:     { type: 'Task',      icon: 'checklist',     color: 'text-emerald-600 bg-emerald-100' },
    TASK_SUBTASK_UPDATED:   { type: 'Task',      icon: 'check_circle',  color: 'text-amber-600 bg-amber-100' },
    TASK_SUBTASK_DELETED:   { type: 'Task',      icon: 'remove_circle', color: 'text-red-600 bg-red-100' },
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchProjectDetails(id);
        this.fetchProjectHistory(id);
      }
    });

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['tab']) {
        const requestedTab = queryParams['tab'].toLowerCase();
        const matched = this.tabs.find((t) => t.toLowerCase() === requestedTab);
        if (matched) {
          this.setActiveTab(matched);
        }
      }
    });
  }

  fetchProjectDetails(id: string) {
    this.loading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (res) => {
        this.project = this.mapProjectData(res.data);
        this.loading = false;
        this.syncTeamMembers();
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load project details.';
        this.toastr.error(this.error);
      }
    });
  }

  /**
   * Fetches real project history/audit trail from the backend
   * (replaces the previous hardcoded mockAuditTrail()).
   */
  fetchProjectHistory(id: string) {
    this.auditLoading = true;
    this.projectService.getProjectHistory(id, { limit: 100 }).subscribe({
      next: (res: any) => {
        const rows = res.data || [];
        this.auditTrail = rows.map((h: any) => this.mapHistoryToAuditEntry(h));
        this.auditLoading = false;
      },
      error: () => {
        this.auditLoading = false;
        this.toastr.error('Failed to load project history');
      }
    });
  }

  private mapHistoryToAuditEntry(h: any): IAuditEntry {
    const meta = this.historyMeta[h.action_type] || {
      type: 'Project',
      icon: 'info',
      color: 'text-slate-600 bg-slate-100'
    };

    return {
      id: h.id,
      type: meta.type,
      action: (h.action_type || '').replace(/_/g, ' '),
      detail: h.detail,
      user: h.user ? `${h.user.firstname} ${h.user.lastname}` : 'System',
      time: this.timeAgo(h.createdAt),
      icon: meta.icon,
      color: meta.color
    };
  }

  private timeAgo(dateStr: string): string {
    if (!dateStr) return '';
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  private mapProjectData(p: IProject): IProject {
    const allMilestones = p.milestones || [];
    const allTasks: IProjectTask[] = (((p as any).tasks || p.tasks) || []) as IProjectTask[];

    // If API already returns nested `milestones_with_child`, prefer that shape
    if (p.milestones_with_child && p.milestones_with_child.length) {
      const parentMilestones = (p.milestones_with_child as IMilestone[]).map((m, i) => ({
        ...m,
        color: m.color || (i % 3 === 0 ? 'blue-600' : i % 3 === 1 ? 'indigo-600' : 'emerald-600'),
        progress: m.milestone_progress ?? m.progress ?? 0,
        // normalize children/subMilestones property name
        children: m.children || m.subMilestones || [],
        // ensure each child has tasks array (may already be present)
        subMilestones: m.subMilestones || m.children || []
      }));

      const totalMs = parentMilestones.length;
      let totalProgress = 0;
      parentMilestones.forEach(m => totalProgress += (m.progress || 0));
      const progress = totalMs > 0 ? Math.round(totalProgress / totalMs) : 0;

      // attach tasks list to each child if not present
      parentMilestones.forEach((m) => {
        (m.children || []).forEach((child: IMilestone) => {
          child.progress = child.submilestone_progress ?? child.progress ?? 0;
          if (!child.tasks) {
            child.tasks = allTasks.filter(t => Number(t.submilestone_id) === Number(child.id));
          }
        });
      });

      return {
        ...p,
        progress,
        milestones: parentMilestones,
        milestones_with_child: parentMilestones,
        tasks: allTasks,
        estimatedCompletion: p.completion_date,
        budget_summary: {
          total: p.budget_total || 0,
          used: p.budget_used || 0
        },
        team: (p.team_members || []).map((m: IUser) => ({
          name: `${m.firstname} ${m.lastname}`,
          role: (m as any).PROJECT_TEAM?.role || 'Technical Staff',
          avatar: m.avatar || 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop'
        }))
      };
    }

    // Fallback: build nested structure from flat milestones + tasks
    const parentMilestones = allMilestones
      .filter((m) => !m.parent_id)
      .map((m, i) => ({
        ...m,
        color: m.color || (i % 3 === 0 ? 'blue-600' : i % 3 === 1 ? 'indigo-600' : 'emerald-600'),
        progress: m.milestone_progress ?? m.progress ?? 0,
        children: allMilestones.filter((sm) => sm.parent_id === m.id)
      }));

    // attach tasks to submilestones
    parentMilestones.forEach((m) => {
      (m.children || []).forEach((child: IMilestone) => {
        child.progress = child.submilestone_progress ?? child.progress ?? 0;
        child.tasks = allTasks.filter(t => Number(t.submilestone_id) === Number(child.id));
      });
    });

    const totalMs = parentMilestones.length;
    let totalProgress = 0;
    parentMilestones.forEach(m => totalProgress += (m.milestone_progress ?? m.progress ?? 0));
    const progress = totalMs > 0 ? Math.round(totalProgress / totalMs) : 0;

    return {
      ...p,
      progress: progress,
      milestones: parentMilestones,
      milestones_with_child: parentMilestones,
      tasks: allTasks,
      estimatedCompletion: p.completion_date,
      budget_summary: {
        total: p.budget_total || 0,
        used: p.budget_used || 0
      },
      team: (p.team_members || []).map((m: IUser) => ({
        name: `${m.firstname} ${m.lastname}`,
        role: (m as any).PROJECT_TEAM?.role || 'Technical Staff',
        avatar: m.avatar || 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop'
      }))
    };
  }

  private syncTeamMembers() {
    if (this.project?.team) {
      this.teamMembers = [{ name: 'All Members' }, ...this.project.team];
    }
  }

  getTasksForSubMilestone(subMilestoneId: number) {
    if (!this.project?.tasks?.length) {
      return [];
    }
    return this.project.tasks.filter((task) => Number(task.submilestone_id) === Number(subMilestoneId));
  }

  getTaskProgress(task: IProjectTask) {
    if (typeof task.task_progress === 'number') {
      return task.task_progress;
    }
    if (typeof task.progress === 'number') {
      return task.progress;
    }
    if (task.sub_tasks?.length) {
      const completedCount = task.sub_tasks.filter((sub: IProjectSubTask) => sub.completed).length;
      return Math.round((completedCount / task.sub_tasks.length) * 100);
    }
    return 0;
  }

  openTaskDetail(task: IProjectTask) {
    this.selectedTask = task;
  }

  closeTaskDetail() {
    this.selectedTask = null;
  }

  // Real-time tab data state
  boqList: any[] = [];
  selectedBoqItemIds: number[] = [];
  rfqGenerating = false;
  dprList: any[] = [];
  labourLogs: any[] = [];
  drawingsList: any[] = [];
  snagList: any[] = [];

  // In-Browser Blueprint CAD Pin-Drop State
  activeBlueprintModal = false;
  selectedBlueprintForViewing: any = null;
  blueprintPinX = 50;
  blueprintPinY = 50;

  // BOQ Spreadsheet State
  boqSearchQuery = '';
  selectedBoqCategory = 'All';
  showAddBoqModal = false;
  showAiBoqModal = false;
  boqRawText = '';
  boqAiLoading = false;
  newBoqItem = {
    item_code: '',
    description: '',
    category: 'Civil',
    unit: 'm³',
    estimated_qty: 0,
    unit_rate: 0,
  };

  // DPR Log Wizard State
  showDprWizardModal = false;
  selectedDpr: any = null;
  selectedLabourLog: any = null;
  dprWizardStep = 1;
  dprForm = {
    report_date: new Date().toISOString().split('T')[0],
    weather_summary: 'Sunny • 28°C',
    weather_type: 'Sunny',
    temperature: '28°C',
    total_workforce_count: 24,
    work_summary: '',
    work_items: [
      { task_id: null, location_grid: 'Grid A1-B3', quantity_executed: 45, unit: 'm³', description: 'RCC slab concrete pouring & vibration', status: 'completed' }
    ],
    photos: [] as string[]
  };
  dprSaving = false;

  // DPR images: up to 10 per report; JPG, PNG or WEBP; 10 MB each. Checked here and again by the server.
  readonly dprImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  readonly dprImageMaxBytes = 10 * 1024 * 1024;
  readonly dprImageMaxCount = 10;
  dprImageFiles: File[] = [];
  dprImageError = '';
  selectedDprImages: { id: number; file_name: string; url?: string }[] = [];
  private dprImageUrls: string[] = [];

  // Snag List & Kanban State
  snagViewMode: 'kanban' | 'list' = 'kanban';
  showAddSnagModal = false;
  snagSearchQuery: string = '';
  snagSeverityFilter: string = 'all';
  snagStatusFilter: string = 'all';
  snagTradeFilter: string = 'all';
  snagAiAnalyzing: boolean = false;
  expandedSnagId: number | null = null;
  snagRecognition: any = null;
  newSnag = {
    title: '',
    description: '',
    location_pin: 'Grid B2 • 3rd Floor',
    trade: 'Civil',
    severity: 'medium',
    status: 'open',
    photo_url: '',
    due_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    voice_note_text: '',
    ai_defect_tags: ['Rebar', 'Civil'] as string[]
  };
  newSnagTagInput: string = '';
  snagSaving = false;
  isRecordingVoice = false;
  editingSnag: any = null;
  editingSnagTagInput: string = '';
  showEditSnagModal = false;
  editSnagSaving = false;

  // Labour Attendance State
  showLabourModal = false;
  labourSaving = false;
  newLabour = {
    attendance_date: new Date().toISOString().split('T')[0],
    trade_type: 'Bar Benders & Steel Fixers',
    skill_level: 'skilled',
    headcount: 12,
    shift: 'day',
    overtime_hours: 0,
    daily_wage_rate: 900,
    work_location: 'Grid A1-B3 • 2nd Floor',
    notes: 'Reinforcement bar tying for beam B-12'
  };

  // Drawing Register, Immutable Versioning & Signature State
  drawingViewMode: 'grid' | 'table' = 'grid';
  selectedDrawingDiscipline = 'All';
  showDrawingUploadModal = false;
  newDrawing = {
    drawing_number: 'STR-DWG-005',
    title: 'Column Reinforcement Detail',
    discipline: 'Structural',
    revision: 'R0',
    status: 'approved_for_construction',
    file_url: '',
    revision_notes: ''
  };
  selectedDrawingFile: File | null = null;
  selectedRevisionFile: File | null = null;
  drawingSaving = false;

  showDrawingHistoryModal = false;
  drawingVersionHistoryList: any[] = [];
  selectedDrawingForHistory: any = null;
  historyLoading = false;

  showUploadRevisionModal = false;
  revisionForm = {
    drawing_number: '',
    title: '',
    discipline: 'Structural',
    revision: 'R1',
    status: 'approved_for_construction',
    file_url: '',
    revision_notes: ''
  };
  revisionSaving = false;

  showSignatureModal = false;
  selectedDrawingForSignature: any = null;
  signatureForm = {
    stakeholder_name: '',
    stakeholder_email: '',
    subject: '',
    message: '',
    required_by_date: ''
  };
  signatureSending = false;

  // BOQ AI-Assisted Extraction & Preview State
  boqImportTab: 'upload' | 'paste' = 'upload';
  boqSelectedFile: File | null = null;
  boqDragOver = false;
  boqParsing = false;
  boqPreviewMode = false;
  boqPreviewItems: any[] = [];
  boqPreviewSummary: { total_items: number; valid_items: number; invalid_items: number; total_estimated_amount: number } | null = null;
  boqPreviewSaving = false;
  ocrUnavailableNotice = false;

  // --- Batch R: Measurement Book & Contractor RA Billing State ---
  mbSubTab: 'mb' | 'ra_bills' = 'mb';
  mbList: any[] = [];
  mbLoading = false;
  raBillsList: any[] = [];
  raBillsLoading = false;
  unbilledCertifiedItems: any[] = [];
  selectedMbItemIdsForBill: number[] = [];
  vendorList: any[] = [];

  // MB Creation Modal State
  showCreateMbModal = false;
  mbSaving = false;
  newMb = {
    title: '',
    vendor_id: null as number | null,
    contract_reference: '',
    measurement_date: new Date().toISOString().split('T')[0],
    period_start: '',
    period_end: '',
    remarks: '',
    items: [
      {
        boq_item_id: null as number | null,
        work_description: '',
        location_reference: '',
        calculation_method: 'direct',
        num_units: 1,
        length: null as number | null,
        breadth: null as number | null,
        depth_height: null as number | null,
        measured_qty: 0,
        unit: 'cum',
        contract_rate: 0,
      }
    ]
  };

  // RA Bill Creation Modal State
  showCreateRaBillModal = false;
  raBillSaving = false;
  newRaBill = {
    vendor_id: null as number | null,
    contract_reference: '',
    billing_period_start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    billing_period_end: new Date().toISOString().split('T')[0],
    retention_rate_pct: 5.0,
    tds_rate_pct: 2.0,
    other_deductions_amount: 0,
    remarks: '',
  };

  // --- Batch W: Enterprise Variations & Change Orders State ---
  variationsList: any[] = [];
  variationsLoading = false;
  variationSummary: any = null;
  selectedVariationFilter = 'All'; // 'All', 'draft', 'submitted', 'technical_review', 'commercial_review', 'budget_review', 'approved', 'implemented'
  showCreateVoModal = false;
  voSaving = false;
  newVo = {
    variation_number: '',
    change_type: 'client_variation',
    category: 'quantity_deviation',
    title: '',
    description: '',
    originating_source: '',
    time_extension_days_requested: 0,
    supporting_docs_url: '',
    items: [
      {
        boq_item_id: null as number | null,
        description: '',
        unit: 'cum',
        proposed_delta_qty: 0,
        proposed_rate: 0,
      }
    ]
  };

  showVoDetailModal = false;
  selectedVoDetail: any = null;
  voActionLoading = false;

  showEditBoqModal = false;
  editingBoqItem: any = null;
  editBoqSaving = false;

  // --- BOQ Actions & Auto-Quotation RFQ Matching ---
  get filteredBoqList() {
    return this.boqList.filter(item => {
      const matchCat = this.selectedBoqCategory === 'All' || (item.category || '').toLowerCase() === this.selectedBoqCategory.toLowerCase();
      const matchSearch = !this.boqSearchQuery.trim() || 
        (item.description && item.description.toLowerCase().includes(this.boqSearchQuery.toLowerCase())) ||
        (item.item_code && item.item_code.toLowerCase().includes(this.boqSearchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }

  get boqTotalEstimated() {
    return this.boqList.reduce((acc, item) => acc + Number(item.total_estimated_amount || (Number(item.estimated_qty || 0) * Number(item.unit_rate || 0))), 0);
  }

  get boqTotalExecuted() {
    return this.boqList.reduce((acc, item) => acc + Number(item.billed_amount || 0), 0);
  }

  // EVM Schedule Performance Index (SPI) & Cost Performance Index (CPI)
  get plannedValue(): number | null {
    if (!this.boqTotalEstimated || !this.project?.progress) return null;
    return this.boqTotalEstimated * (Number(this.project.progress) / 100);
  }
  get earnedValue(): number | null {
    return this.boqTotalExecuted > 0 ? this.boqTotalExecuted : null;
  }
  get actualCost(): number | null {
    const cost = Number(this.project?.budget_used || 0);
    return cost > 0 ? cost : null;
  }
  get cpi(): number | null {
    const ac = this.actualCost;
    const ev = this.earnedValue;
    if (ac == null || ev == null || ac === 0) return null;
    return Number((ev / ac).toFixed(2));
  }
  get spi(): number | null {
    const pv = this.plannedValue;
    const ev = this.earnedValue;
    if (pv == null || ev == null || pv === 0) return null;
    return Number((ev / pv).toFixed(2));
  }

  toggleBoqSelection(id: number) {
    const idx = this.selectedBoqItemIds.indexOf(id);
    if (idx > -1) {
      this.selectedBoqItemIds.splice(idx, 1);
    } else {
      this.selectedBoqItemIds.push(id);
    }
  }

  toggleAllBoqSelection() {
    if (this.selectedBoqItemIds.length === this.filteredBoqList.length) {
      this.selectedBoqItemIds = [];
    } else {
      this.selectedBoqItemIds = this.filteredBoqList.map(i => i.id);
    }
  }

  generateVendorRFQ() {
    if (!this.project?.id || this.selectedBoqItemIds.length === 0) {
      this.toastr.warning('Please select at least one BOQ item to generate an RFQ package.');
      return;
    }
    this.rfqGenerating = true;
    this.projectService.generateVendorRFQ({
      project_id: this.project.id,
      boq_item_ids: this.selectedBoqItemIds,
      notes: `Generated RFQ package for ${this.selectedBoqItemIds.length} structural items.`
    }).subscribe({
      next: (res: any) => {
        this.rfqGenerating = false;
        this.toastr.success(res.message || 'Vendor RFQ quotation package generated successfully!');
        this.selectedBoqItemIds = [];
      },
      error: (err: any) => {
        this.rfqGenerating = false;
        this.toastr.error('Failed to generate vendor RFQ');
      }
    });
  }

  saveNewBoqItem() {
    if (!this.project?.id) return;
    if (!this.newBoqItem.item_code?.trim()) {
      this.toastr.warning('Please provide an Item Code (e.g. CW-01, RCC-02)');
      return;
    }
    if (!this.newBoqItem.description?.trim()) {
      this.toastr.warning('Please provide an item description');
      return;
    }
    const qty = Number(this.newBoqItem.estimated_qty);
    const rate = Number(this.newBoqItem.unit_rate);
    if (isNaN(qty) || qty <= 0) {
      this.toastr.warning('Estimated quantity must be greater than 0');
      return;
    }
    if (isNaN(rate) || rate < 0) {
      this.toastr.warning('Unit rate must be a valid positive amount');
      return;
    }

    const itemData = {
      ...this.newBoqItem,
      item_code: this.newBoqItem.item_code.trim(),
      description: this.newBoqItem.description.trim(),
      estimated_qty: qty,
      unit_rate: rate,
      total_estimated_amount: qty * rate
    };

    this.projectService.batchCreateBOQ({
      project_id: this.project.id,
      items: [itemData]
    }).subscribe({
      next: () => {
        this.toastr.success(`BOQ Item "${itemData.item_code}" saved successfully`);
        this.showAddBoqModal = false;
        this.newBoqItem = { item_code: '', description: '', category: 'Civil', unit: 'm³', estimated_qty: 0, unit_rate: 0 };
        // Reload live persisted items from database
        this.projectService.getProjectBOQ(this.project!.id).subscribe({
          next: (boqRes: any) => {
            this.boqList = boqRes.data || [];
          }
        });
      },
      error: (err: any) => {
        this.toastr.error(err?.error?.message || 'Failed to save BOQ item');
      }
    });
  }

  openAiBoqModal() {
    this.showAiBoqModal = true;
    this.boqPreviewMode = false;
    this.boqPreviewItems = [];
    this.boqPreviewSummary = null;
    this.boqSelectedFile = null;
    this.boqRawText = '';
    this.ocrUnavailableNotice = false;
  }

  onBoqFileSelected(event: any) {
    const file = event.target?.files?.[0];
    if (file) {
      this.handleBoqFile(file);
    }
  }

  onBoqDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.boqDragOver = true;
  }

  onBoqDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.boqDragOver = false;
  }

  onBoqFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.boqDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.handleBoqFile(file);
    }
  }

  handleBoqFile(file: File) {
    const validExts = ['.xlsx', '.xls', '.csv', '.tsv', '.txt', '.pdf'];
    const name = file.name.toLowerCase();
    const isValid = validExts.some(ext => name.endsWith(ext));
    if (!isValid) {
      this.toastr.warning('Please upload an Excel (.xlsx, .xls), CSV (.csv), text (.txt), or PDF document.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      this.toastr.warning('File size exceeds 10MB limit.');
      return;
    }
    this.boqSelectedFile = file;
    this.ocrUnavailableNotice = name.endsWith('.pdf');
    this.toastr.info(`Selected file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
  }

  processBoqExtraction() {
    if (!this.project?.id) return;

    if (this.boqImportTab === 'upload' && this.boqSelectedFile) {
      const file = this.boqSelectedFile;
      this.boqParsing = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result as string;
        this.sendBoqContentToParser(content);
      };
      reader.onerror = () => {
        this.boqParsing = false;
        this.toastr.error('Failed to read file contents.');
      };
      reader.readAsText(file);
    } else if (this.boqImportTab === 'paste' || this.boqRawText.trim()) {
      if (!this.boqRawText.trim()) {
        this.toastr.warning('Please paste BOQ schedule text or select a file.');
        return;
      }
      this.boqParsing = true;
      this.sendBoqContentToParser(this.boqRawText);
    } else {
      this.toastr.warning('Please select a file or paste schedule text.');
    }
  }

  sendBoqContentToParser(content: string) {
    if (!this.project?.id) return;
    this.projectService.parseBOQContent({
      project_id: this.project.id,
      boq_raw_text: content
    }).subscribe({
      next: (res: any) => {
        this.boqParsing = false;
        const data = res.data;
        if (!data || !data.items || data.items.length === 0) {
          this.toastr.warning(data?.message || 'No valid BOQ items could be extracted from input.');
          return;
        }
        this.boqPreviewItems = data.items.map((it: any) => ({
          ...it,
          _excluded: false
        }));
        this.boqPreviewSummary = data.summary;
        this.boqPreviewMode = true;
        this.toastr.success(`Extracted ${this.boqPreviewItems.length} BOQ items. Review preview before confirming.`);
      },
      error: (err: any) => {
        this.boqParsing = false;
        this.toastr.error(err?.error?.message || 'Failed to parse BOQ content.');
      }
    });
  }

  toggleExcludePreviewRow(row: any) {
    row._excluded = !row._excluded;
    this.recalculatePreviewTotals();
  }

  removePreviewRow(index: number) {
    this.boqPreviewItems.splice(index, 1);
    this.recalculatePreviewTotals();
  }

  recalculatePreviewTotals() {
    const active = this.boqPreviewItems.filter(r => !r._excluded);
    const totalAmt = active.reduce((acc, r) => {
      const qty = Number(r.estimated_qty) || 0;
      const rate = Number(r.unit_rate) || 0;
      return acc + (qty * rate);
    }, 0);
    this.boqPreviewSummary = {
      total_items: this.boqPreviewItems.length,
      valid_items: active.filter(r => !r.validation_errors || r.validation_errors.length === 0).length,
      invalid_items: active.filter(r => r.validation_errors && r.validation_errors.length > 0).length,
      total_estimated_amount: totalAmt
    };
  }

  confirmAndSaveBoqPreview() {
    if (!this.project?.id) return;
    const itemsToSave = this.boqPreviewItems
      .filter(r => !r._excluded)
      .map(r => ({
        item_code: r.item_code,
        description: r.description,
        category: r.category || 'Civil',
        unit: r.unit || 'm³',
        estimated_qty: Number(r.estimated_qty) || 0,
        unit_rate: Number(r.unit_rate) || 0,
        wbs_id: r.wbs_id || null,
        cbs_id: r.cbs_id || null,
        budget_head_id: r.budget_head_id || null
      }));

    if (itemsToSave.length === 0) {
      this.toastr.warning('No items selected to import.');
      return;
    }

    this.boqPreviewSaving = true;
    this.projectService.batchCreateBOQ({
      project_id: this.project.id,
      items: itemsToSave
    }).subscribe({
      next: (res: any) => {
        this.boqPreviewSaving = false;
        this.toastr.success(res.message || `Successfully persisted ${res.data?.count || itemsToSave.length} BOQ items.`);
        this.showAiBoqModal = false;
        this.boqPreviewMode = false;
        this.boqPreviewItems = [];
        this.projectService.getProjectBOQ(this.project!.id).subscribe({
          next: (boqRes: any) => {
            this.boqList = boqRes.data || [];
          }
        });
      },
      error: (err: any) => {
        this.boqPreviewSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to save BOQ items.');
      }
    });
  }

  openEditBoqModal(item: any) {
    this.editingBoqItem = {
      id: item.id,
      item_code: item.item_code || '',
      description: item.description || '',
      category: item.category || 'Civil',
      unit: item.unit || 'm³',
      estimated_qty: item.estimated_qty || 0,
      unit_rate: item.unit_rate || 0
    };
    this.showEditBoqModal = true;
  }

  saveEditBoqItem() {
    if (!this.editingBoqItem?.id) return;
    this.editBoqSaving = true;
    this.projectService.updateBOQItem(this.editingBoqItem.id, this.editingBoqItem).subscribe({
      next: () => {
        this.editBoqSaving = false;
        this.toastr.success('BOQ item updated successfully');
        this.showEditBoqModal = false;
        const idx = this.boqList.findIndex(b => b.id === this.editingBoqItem.id);
        if (idx !== -1) {
          this.boqList[idx] = { ...this.boqList[idx], ...this.editingBoqItem };
        }
        this.editingBoqItem = null;
      },
      error: (err: any) => {
        this.editBoqSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to update BOQ item');
      }
    });
  }

  deleteBoqItem(item: any) {
    if (!item?.id) return;
    Swal.fire({
      title: 'Archive BOQ Line Item?',
      text: `Are you sure you want to remove item "${item.item_code} - ${item.description}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Archive',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.projectService.deleteBOQItem(item.id).subscribe({
          next: () => {
            this.boqList = this.boqList.filter(b => b.id !== item.id);
            this.toastr.success('BOQ item archived successfully');
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Failed to archive BOQ item');
          }
        });
      }
    });
  }

  // --- DPR Actions ---
  addDprWorkItem() {
    this.dprForm.work_items.push({
      task_id: null,
      location_grid: '',
      quantity_executed: 0,
      unit: 'm³',
      description: '',
      status: 'in_progress'
    });
  }

  removeDprWorkItem(index: number) {
    this.dprForm.work_items.splice(index, 1);
  }

  saveDprReport() {
    if (!this.project?.id || !this.dprForm.report_date) {
      this.toastr.warning('Please specify report date');
      return;
    }
    this.dprSaving = true;
    this.dprForm.weather_summary = `${this.dprForm.weather_type} • ${this.dprForm.temperature}`;
    this.projectService.createDPR({
      project_id: this.project.id,
      ...this.dprForm
    }).subscribe({
      next: (res) => {
        this.dprSaving = false;
        this.toastr.success('Daily Progress Report submitted & inventory stock auto-updated');
        this.showDprWizardModal = false;
        this.dprWizardStep = 1;
        this.dprList.unshift(res.data);
        if (this.dprImageFiles.length === 0) return;
        this.dprSaving = true;
        this.projectService.uploadDprImages(res.data.id, this.dprImageFiles).subscribe({
          next: () => {
            this.dprSaving = false;
            this.dprImageFiles = [];
            this.toastr.success('Photos attached to the report');
          },
          error: (err) => {
            this.dprSaving = false;
            this.toastr.error(err?.error?.message || 'Report saved, but the photos could not be uploaded');
          },
        });
      },
      error: () => {
        this.dprSaving = false;
        this.toastr.error('Failed to create DPR');
      }
    });
  }

  // --- MS Project (MSPDI XML) ---
  exportMspProject(): void {
    if (!this.project?.id) return;
    this.projectService.exportMspdi(this.project.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.project?.name || 'project'}-msp.xml`;
        link.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.toastr.error('Could not export the schedule'),
    });
  }

  importMspProject(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file || !this.project?.id) return;
    if (file.size > 5 * 1024 * 1024) {
      this.toastr.error('The file must be 5 MB or smaller.');
      return;
    }
    this.projectService.importMspdi(this.project.id, file).subscribe({
      next: (res) => {
        const d = res.data ?? {};
        this.toastr.success(
          `Imported ${d.wbs_created ?? 0} new WBS node(s), reused ${d.wbs_reused ?? 0}, and added ${d.tasks_created ?? 0} task(s). Reload the Tasks tab to see them.`
        );
      },
      error: (err) => this.toastr.error(err?.error?.message || 'The MS Project file could not be imported'),
    });
  }

  // --- DPR images ---
  openDprWizard(): void {
    this.dprImageFiles = [];
    this.dprImageError = '';
    this.dprWizardStep = 1;
    this.showDprWizardModal = true;
  }

  onDprImagesPicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    const picked = Array.from(input.files ?? []);
    input.value = '';
    this.dprImageError = '';
    if (picked.length > this.dprImageMaxCount) {
      this.dprImageError = `Choose at most ${this.dprImageMaxCount} images.`;
      return;
    }
    const wrongType = picked.find((f) => !this.dprImageTypes.includes(f.type));
    if (wrongType) {
      this.dprImageError = `"${wrongType.name}" is not a JPG, PNG or WEBP image.`;
      return;
    }
    const tooLarge = picked.find((f) => f.size > this.dprImageMaxBytes);
    if (tooLarge) {
      this.dprImageError = `"${tooLarge.name}" is larger than 10 MB.`;
      return;
    }
    this.dprImageFiles = picked;
  }

  removeDprImage(index: number): void {
    this.dprImageFiles.splice(index, 1);
  }

  openDpr(dpr: any): void {
    this.clearDprImageUrls();
    this.selectedDprImages = [];
    this.selectedDpr = dpr;
    this.projectService.getDprImages(dpr.id).subscribe({
      next: (res) => {
        this.selectedDprImages = res.data ?? [];
        for (const image of this.selectedDprImages) this.loadDprImage(image);
      },
      error: () => this.toastr.error('Could not load the photos for this report'),
    });
  }

  closeDprDetail(): void {
    this.selectedDpr = null;
    this.clearDprImageUrls();
    this.selectedDprImages = [];
  }

  private loadDprImage(image: { id: number; url?: string }): void {
    this.projectService.getDprImageBlob(image.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.dprImageUrls.push(url);
        image.url = url;
      },
      error: () => undefined,
    });
  }

  private clearDprImageUrls(): void {
    for (const url of this.dprImageUrls) URL.revokeObjectURL(url);
    this.dprImageUrls = [];
  }

  // --- Snag Actions & Common Authoritative Dataset ---
  get filteredSnagList(): any[] {
    return this.snagList.filter((s) => {
      const status = (s.status || 'open').toLowerCase();
      const severity = (s.severity || 'medium').toLowerCase();
      const trade = (s.trade || '').toLowerCase();
      const q = this.snagSearchQuery.trim().toLowerCase();

      const matchStatus = this.snagStatusFilter === 'all' || status === this.snagStatusFilter.toLowerCase();
      const matchSeverity = this.snagSeverityFilter === 'all' || severity === this.snagSeverityFilter.toLowerCase();
      const matchTrade = this.snagTradeFilter === 'all' || trade === this.snagTradeFilter.toLowerCase();

      const matchQuery = !q || 
        (s.title && s.title.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.location_pin && s.location_pin.toLowerCase().includes(q)) ||
        (s.trade && s.trade.toLowerCase().includes(q));

      return matchStatus && matchSeverity && matchTrade && matchQuery;
    });
  }

  getSnagsByStatus(status: string): any[] {
    return this.filteredSnagList.filter(s => (s.status || 'open').toLowerCase() === status.toLowerCase());
  }

  getSnagCount(status?: string): number {
    if (!status || status === 'all') {
      return this.snagList.length;
    }
    return this.snagList.filter(s => (s.status || 'open').toLowerCase() === status.toLowerCase()).length;
  }

  toggleExpandSnag(id: number) {
    this.expandedSnagId = this.expandedSnagId === id ? null : id;
  }

  changeSnagStatus(snag: any, newStatus: string) {
    const prevStatus = snag.status;
    snag.status = newStatus;
    this.projectService.updateSnagStatus(snag.id, newStatus).subscribe({
      next: () => this.toastr.success(`Snag marked as ${newStatus.replace('_', ' ')}`),
      error: () => {
        snag.status = prevStatus;
        this.toastr.error('Failed to update snag status');
      }
    });
  }

  startVoiceRecording() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.toastr.warning('Speech recognition is not supported in this browser. Please type defect details manually.');
      return;
    }

    try {
      if (this.snagRecognition) {
        this.snagRecognition.stop();
      }

      this.snagRecognition = new SpeechRecognition();
      this.snagRecognition.continuous = false;
      this.snagRecognition.interimResults = true;
      this.snagRecognition.lang = 'en-US';

      this.isRecordingVoice = true;
      this.toastr.info('Microphone active. Please speak defect observations clearly.');

      this.snagRecognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          this.newSnag.voice_note_text = transcript;
        }
      };

      this.snagRecognition.onerror = (event: any) => {
        this.isRecordingVoice = false;
        console.warn('Speech recognition event/error:', event.error);
        if (event.error === 'not-allowed') {
          this.toastr.error('Microphone access was denied. Please allow microphone permissions or type manually.');
        } else if (event.error === 'no-speech') {
          this.toastr.info('No speech detected. Please speak into microphone or type manually.');
        } else {
          this.toastr.warning(`Voice recognition notice: ${event.error}. You can enter details manually.`);
        }
      };

      this.snagRecognition.onend = () => {
        this.isRecordingVoice = false;
        if (this.newSnag.voice_note_text.trim()) {
          this.toastr.success('Voice note transcribed. Review transcript and click "Analyze with AI" to generate suggestions.');
        }
      };

      this.snagRecognition.start();
    } catch (err: any) {
      this.isRecordingVoice = false;
      this.toastr.warning('Could not start microphone. Please type defect details manually.');
    }
  }

  stopVoiceRecording() {
    if (this.snagRecognition) {
      try { this.snagRecognition.stop(); } catch (e) {}
      this.snagRecognition = null;
    }
    this.isRecordingVoice = false;
  }

  triggerAiSnagAnalysis() {
    const text = this.newSnag.voice_note_text.trim() || this.newSnag.description.trim();
    if (!text) {
      this.toastr.warning('Please record or enter a voice note first.');
      return;
    }

    this.snagAiAnalyzing = true;
    this.projectService.analyzeVoiceSnag(text).subscribe({
      next: (res: any) => {
        this.snagAiAnalyzing = false;
        if (res.data) {
          const sug = res.data;
          if (!this.newSnag.title.trim()) {
            this.newSnag.title = sug.title || text.substring(0, 45);
          }
          if (!this.newSnag.description.trim() || this.newSnag.description === this.newSnag.voice_note_text) {
            this.newSnag.description = sug.description || text;
          }
          if (sug.severity) {
            this.newSnag.severity = sug.severity;
          }
          if (sug.trade) {
            this.newSnag.trade = sug.trade;
          }
          if (sug.location_pin && (!this.newSnag.location_pin || this.newSnag.location_pin === 'Grid B2 • 3rd Floor')) {
            this.newSnag.location_pin = sug.location_pin;
          }
          this.toastr.success('AI defect suggestions populated! Please review and edit before saving.');
        }
      },
      error: () => {
        this.snagAiAnalyzing = false;
        if (!this.newSnag.title.trim()) {
          this.newSnag.title = text.substring(0, 45) + (text.length > 45 ? '...' : '');
        }
        if (!this.newSnag.description.trim()) {
          this.newSnag.description = text;
        }
        this.toastr.info('AI service unavailable; transcript preserved for manual form review.');
      }
    });
  }

  cancelAddSnagModal() {
    const hasData = Boolean(
      this.newSnag.title.trim() || 
      this.newSnag.voice_note_text.trim() || 
      this.newSnag.description.trim()
    );

    if (hasData) {
      Swal.fire({
        title: 'Discard defect notes?',
        text: 'You have entered unsaved snag descriptions. Are you sure you want to discard them?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Yes, Discard',
        cancelButtonText: 'Keep Editing'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.closeAddSnagModalDirect();
        }
      });
    } else {
      this.closeAddSnagModalDirect();
    }
  }

  closeAddSnagModalDirect() {
    this.stopVoiceRecording();
    this.showAddSnagModal = false;
    this.newSnag = {
      title: '',
      description: '',
      location_pin: 'Grid B2 • 3rd Floor',
      trade: 'Civil',
      severity: 'medium',
      status: 'open',
      photo_url: '',
      due_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      voice_note_text: '',
      ai_defect_tags: ['Rebar', 'Civil']
    };
    this.newSnagTagInput = '';
  }

  saveNewSnag() {
    if (!this.project?.id || (!this.newSnag.title.trim() && !this.newSnag.voice_note_text.trim())) {
      this.toastr.warning('Please provide a snag title or voice note.');
      return;
    }
    this.snagSaving = true;
    this.projectService.createSnag({
      project_id: this.project.id,
      ...this.newSnag,
      ai_defect_tags: this.newSnag.ai_defect_tags || []
    }).subscribe({
      next: (res) => {
        this.snagSaving = false;
        this.toastr.success('Snag recorded successfully');
        this.closeAddSnagModalDirect();
        this.snagList.unshift(res.data || { ...this.newSnag, id: Date.now() });
      },
      error: (err: any) => {
        this.snagSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to save snag');
      }
    });
  }

  addNewSnagTag() {
    const raw = (this.newSnagTagInput || '').trim().replace(/^#+/, '').trim();
    if (!raw) return;
    if (!this.newSnag.ai_defect_tags) this.newSnag.ai_defect_tags = [];
    if (this.newSnag.ai_defect_tags.length >= 10) {
      this.toastr.warning('Maximum 10 defect tags allowed.');
      return;
    }
    if (!this.newSnag.ai_defect_tags.includes(raw)) {
      this.newSnag.ai_defect_tags.push(raw);
    }
    this.newSnagTagInput = '';
  }

  removeNewSnagTag(index: number) {
    if (this.newSnag?.ai_defect_tags) {
      this.newSnag.ai_defect_tags.splice(index, 1);
    }
  }

  addEditingSnagTag() {
    if (!this.editingSnag) return;
    const raw = (this.editingSnagTagInput || '').trim().replace(/^#+/, '').trim();
    if (!raw) return;
    if (!this.editingSnag.ai_defect_tags) this.editingSnag.ai_defect_tags = [];
    if (this.editingSnag.ai_defect_tags.length >= 10) {
      this.toastr.warning('Maximum 10 defect tags allowed.');
      return;
    }
    if (!this.editingSnag.ai_defect_tags.includes(raw)) {
      this.editingSnag.ai_defect_tags.push(raw);
    }
    this.editingSnagTagInput = '';
  }

  removeEditingSnagTag(index: number) {
    if (this.editingSnag?.ai_defect_tags) {
      this.editingSnag.ai_defect_tags.splice(index, 1);
    }
  }

  getSnagTags(snag: any): string[] {
    if (!snag) return [];
    const raw = snag.ai_defect_tags;
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw.map((t: any) => String(t).trim()).filter(Boolean);
    }
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.map((t: any) => String(t).trim()).filter(Boolean);
        }
      } catch (e) {}
      return raw
        .split(',')
        .map((t) => t.trim().replace(/^[\[\]"']+/, '').replace(/[\[\]"']+$/, ''))
        .filter((t) => t.length > 0 && !t.startsWith('[') && !t.startsWith('"'));
    }
    return [];
  }

  openEditSnagModal(snag: any) {
    this.editingSnag = {
      id: snag.id,
      title: snag.title || '',
      description: snag.description || '',
      location_pin: snag.location_pin || '',
      trade: snag.trade || 'Civil',
      severity: snag.severity || 'medium',
      status: snag.status || 'open',
      due_date: snag.due_date ? new Date(snag.due_date).toISOString().split('T')[0] : '',
      rectification_notes: snag.rectification_notes || '',
      ai_defect_tags: [...this.getSnagTags(snag)]
    };
    this.editingSnagTagInput = '';
    this.showEditSnagModal = true;
  }

  saveEditSnag() {
    if (!this.editingSnag || !this.editingSnag.id) return;
    if (!this.editingSnag.title.trim()) {
      this.toastr.warning('Defect title is required.');
      return;
    }

    this.editSnagSaving = true;
    const payload = {
      title: this.editingSnag.title.trim(),
      description: this.editingSnag.description,
      location_pin: this.editingSnag.location_pin,
      trade: this.editingSnag.trade,
      severity: this.editingSnag.severity,
      status: this.editingSnag.status,
      due_date: this.editingSnag.due_date || null,
      rectification_notes: this.editingSnag.rectification_notes,
      ai_defect_tags: this.editingSnag.ai_defect_tags || []
    };

    this.projectService.updateSnag(this.editingSnag.id, payload).subscribe({
      next: (res) => {
        this.editSnagSaving = false;
        this.toastr.success('Snag record updated successfully');
        const idx = this.snagList.findIndex((s) => s.id === this.editingSnag.id);
        if (idx !== -1) {
          this.snagList[idx] = { ...this.snagList[idx], ...payload };
        }
        this.showEditSnagModal = false;
        this.editingSnag = null;
      },
      error: (err: any) => {
        this.editSnagSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to update snag');
      },
    });
  }

  deleteSnag(snag: any) {
    if (!snag || !snag.id) return;
    Swal.fire({
      title: 'Delete Snag Record?',
      text: `Are you sure you want to delete snag "${snag.title}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.projectService.deleteSnag(snag.id).subscribe({
          next: () => {
            this.snagList = this.snagList.filter((s) => s.id !== snag.id);
            this.toastr.success('Snag record removed successfully');
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Failed to delete snag record');
          },
        });
      }
    });
  }

  // --- In-Browser Blueprint CAD Viewer & Click-to-Pin Snags ---
  openBlueprintViewer(drawing: any) {
    this.selectedBlueprintForViewing = drawing;
    this.activeBlueprintModal = true;
  }

  onBlueprintCanvasClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.blueprintPinX = Math.round(x);
    this.blueprintPinY = Math.round(y);
    
    // Auto populate location pin in snag form
    this.newSnag.location_pin = `Pin (${this.blueprintPinX}%, ${this.blueprintPinY}%) • ${this.selectedBlueprintForViewing?.drawing_number || 'Blueprint'}`;
    this.toastr.info(`Pin dropped at ${this.newSnag.location_pin}`);
  }

  createSnagFromBlueprintPin() {
    this.activeBlueprintModal = false;
    this.showAddSnagModal = true;
  }

  // --- Drawing Register Actions ---
  get filteredDrawings() {
    if (this.selectedDrawingDiscipline === 'All') return this.drawingsList;
    return this.drawingsList.filter(d => (d.discipline || '').toLowerCase() === this.selectedDrawingDiscipline.toLowerCase());
  }

  onDrawingFileSelected(event: any) {
    const file = event.target?.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.toastr.error('Drawing file must be under 10MB.');
        return;
      }
      this.selectedDrawingFile = file;
    }
  }

  removeSelectedDrawingFile() {
    this.selectedDrawingFile = null;
  }

  onRevisionFileSelected(event: any) {
    const file = event.target?.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.toastr.error('Revision file must be under 10MB.');
        return;
      }
      this.selectedRevisionFile = file;
    }
  }

  removeSelectedRevisionFile() {
    this.selectedRevisionFile = null;
  }

  saveNewDrawing() {
    if (!this.project?.id || !this.newDrawing.drawing_number.trim() || !this.newDrawing.title.trim()) {
      this.toastr.warning('Please provide Drawing Number and Title');
      return;
    }
    if (!this.selectedDrawingFile && !this.newDrawing.file_url) {
      this.toastr.warning('Please select a drawing file (PDF, DWG, DXF, PNG, JPG) to upload');
      return;
    }

    this.drawingSaving = true;

    if (this.selectedDrawingFile) {
      const formData = new FormData();
      formData.append('project_id', this.project.id.toString());
      formData.append('drawing_number', this.newDrawing.drawing_number.trim());
      formData.append('title', this.newDrawing.title.trim());
      formData.append('discipline', this.newDrawing.discipline || 'Structural');
      formData.append('revision', (this.newDrawing.revision || 'R0').trim());
      formData.append('status', 'approved_for_construction');
      if (this.newDrawing.revision_notes) {
        formData.append('revision_notes', this.newDrawing.revision_notes.trim());
      }
      formData.append('file', this.selectedDrawingFile);

      this.projectService.registerDrawing(formData).subscribe({
        next: (res) => {
          this.drawingSaving = false;
          this.toastr.success(`Drawing ${this.newDrawing.drawing_number} (${this.newDrawing.revision || 'R0'}) registered to vault!`);
          this.showDrawingUploadModal = false;
          this.selectedDrawingFile = null;
          this.newDrawing = {
            drawing_number: '',
            title: '',
            discipline: 'Structural',
            revision: 'R0',
            status: 'approved_for_construction',
            file_url: '',
            revision_notes: ''
          };
          this.projectService.getProjectDrawings(this.project!.id).subscribe({
            next: (dwgRes: any) => {
              this.drawingsList = dwgRes.data || [];
            }
          });
          this.fetchProjectHistory(this.project!.id.toString());
        },
        error: (err: any) => {
          this.drawingSaving = false;
          this.toastr.error(err?.error?.message || 'Failed to register drawing');
        }
      });
    } else {
      this.projectService.registerDrawing({
        project_id: this.project.id,
        ...this.newDrawing
      }).subscribe({
        next: (res) => {
          this.drawingSaving = false;
          this.toastr.success(`Drawing ${this.newDrawing.drawing_number} registered to vault!`);
          this.showDrawingUploadModal = false;
          this.projectService.getProjectDrawings(this.project!.id).subscribe({
            next: (dwgRes: any) => {
              this.drawingsList = dwgRes.data || [];
            }
          });
          this.fetchProjectHistory(this.project!.id.toString());
        },
        error: (err: any) => {
          this.drawingSaving = false;
          this.toastr.error(err?.error?.message || 'Failed to register drawing');
        }
      });
    }
  }

  // --- Labour Attendance Actions ---
  openLabourModal() {
    this.newLabour = {
      attendance_date: new Date().toISOString().split('T')[0],
      trade_type: 'Bar Benders & Steel Fixers',
      skill_level: 'skilled',
      headcount: 12,
      shift: 'day',
      overtime_hours: 0,
      daily_wage_rate: 900,
      work_location: 'Grid A1-B3 • 2nd Floor',
      notes: ''
    };
    this.showLabourModal = true;
  }

  saveLabourAttendance() {
    if (!this.project?.id) return;
    if (!this.newLabour.attendance_date) {
      this.toastr.warning('Attendance date is required.');
      return;
    }
    if (!this.newLabour.trade_type?.trim()) {
      this.toastr.warning('Trade/Role is required.');
      return;
    }
    if (Number(this.newLabour.headcount) < 1) {
      this.toastr.warning('Headcount must be at least 1.');
      return;
    }
    if (Number(this.newLabour.daily_wage_rate) < 0) {
      this.toastr.warning('Daily wage rate cannot be negative.');
      return;
    }

    this.labourSaving = true;
    this.projectService.recordLabourAttendance({
      project_id: this.project.id,
      ...this.newLabour,
      headcount: Number(this.newLabour.headcount),
      overtime_hours: Number(this.newLabour.overtime_hours || 0),
      daily_wage_rate: Number(this.newLabour.daily_wage_rate || 0)
    }).subscribe({
      next: () => {
        this.labourSaving = false;
        this.toastr.success('Labour attendance recorded successfully');
        this.showLabourModal = false;
        this.projectService.getProjectLabourLogs(this.project!.id).subscribe({
          next: (logsRes: any) => {
            this.labourLogs = logsRes.data || [];
          }
        });
      },
      error: (err: any) => {
        this.labourSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to record labour attendance');
      }
    });
  }

  // --- Drawing Revisions, History & Stakeholder Signature Actions ---
  openDrawingHistoryModal(dwg: any) {
    if (!this.project?.id || !dwg?.drawing_number) return;
    this.selectedDrawingForHistory = dwg;
    this.historyLoading = true;
    this.showDrawingHistoryModal = true;
    this.projectService.getDrawingVersionHistory(this.project.id, dwg.drawing_number).subscribe({
      next: (res: any) => {
        this.historyLoading = false;
        this.drawingVersionHistoryList = res.data || [];
      },
      error: () => {
        this.historyLoading = false;
        this.toastr.error('Failed to load drawing version history');
      }
    });
  }

  openUploadRevisionModal(dwg: any) {
    this.selectedDrawingForHistory = dwg;
    this.selectedRevisionFile = null;
    const currentRev = dwg.revision || 'R0';
    let nextRev = 'R1';
    const match = currentRev.match(/^R?(\d+)$/i);
    if (match) {
      nextRev = `R${parseInt(match[1], 10) + 1}`;
    }
    this.revisionForm = {
      drawing_number: dwg.drawing_number,
      title: dwg.title,
      discipline: dwg.discipline || 'Structural',
      revision: nextRev,
      status: 'approved_for_construction',
      file_url: dwg.file_url || '',
      revision_notes: ''
    };
    this.showUploadRevisionModal = true;
  }

  saveDrawingRevision() {
    if (!this.project?.id) return;
    if (!this.revisionForm.revision?.trim()) {
      this.toastr.warning('Revision code (e.g. R1, R2) is required.');
      return;
    }
    if (!this.revisionForm.revision_notes?.trim()) {
      this.toastr.warning('Revision notes explaining modifications are required.');
      return;
    }
    if (!this.selectedRevisionFile && !this.revisionForm.file_url) {
      this.toastr.warning('Please select a revision drawing file (PDF, DWG, PNG, JPG) to upload');
      return;
    }

    this.revisionSaving = true;

    if (this.selectedRevisionFile) {
      const formData = new FormData();
      formData.append('project_id', this.project.id.toString());
      formData.append('drawing_number', this.revisionForm.drawing_number.trim());
      formData.append('title', this.revisionForm.title.trim());
      formData.append('discipline', this.revisionForm.discipline || 'Structural');
      formData.append('revision', this.revisionForm.revision.trim());
      formData.append('status', 'approved_for_construction');
      formData.append('revision_notes', this.revisionForm.revision_notes.trim());
      formData.append('file', this.selectedRevisionFile);

      this.projectService.registerDrawing(formData).subscribe({
        next: () => {
          this.revisionSaving = false;
          this.toastr.success(`Revision ${this.revisionForm.revision} registered! Previous revision marked as superseded.`);
          this.showUploadRevisionModal = false;
          this.selectedRevisionFile = null;
          this.projectService.getProjectDrawings(this.project!.id).subscribe({
            next: (dwgRes: any) => {
              this.drawingsList = dwgRes.data || [];
            }
          });
          this.fetchProjectHistory(this.project!.id.toString());
        },
        error: (err: any) => {
          this.revisionSaving = false;
          this.toastr.error(err?.error?.message || 'Failed to upload revision.');
        }
      });
    } else {
      this.projectService.registerDrawing({
        project_id: this.project.id,
        ...this.revisionForm
      }).subscribe({
        next: () => {
          this.revisionSaving = false;
          this.toastr.success(`Revision ${this.revisionForm.revision} registered! Previous revision marked as superseded.`);
          this.showUploadRevisionModal = false;
          this.projectService.getProjectDrawings(this.project!.id).subscribe({
            next: (dwgRes: any) => {
              this.drawingsList = dwgRes.data || [];
            }
          });
          this.fetchProjectHistory(this.project!.id.toString());
        },
        error: (err: any) => {
          this.revisionSaving = false;
          this.toastr.error(err?.error?.message || 'Failed to upload revision.');
        }
      });
    }
  }

  downloadOrViewDrawing(dwg: any) {
    if (!dwg?.file_url) {
      this.toastr.warning('No drawing file attached to this record');
      return;
    }
    if (dwg.file_url.startsWith('http://') || dwg.file_url.startsWith('https://')) {
      window.open(dwg.file_url, '_blank');
      return;
    }
    this.projectService.downloadProtectedFile(dwg.file_url).subscribe({
      next: (blob) => {
        const fileBlobUrl = URL.createObjectURL(blob);
        window.open(fileBlobUrl, '_blank');
      },
      error: () => {
        this.toastr.error('Failed to retrieve protected drawing file');
      }
    });
  }

  openSignatureModal(dwg: any) {
    this.selectedDrawingForSignature = dwg;
    this.signatureForm = {
      stakeholder_name: 'Lead Consultant / Client Representative',
      stakeholder_email: 'client.rep@zynoconstruction.com',
      subject: `Review & Signature Request: ${dwg.title} (${dwg.drawing_number} Rev ${dwg.revision || 'R0'})`,
      message: `Dear Stakeholder,\n\nPlease review and approve drawing sheet "${dwg.title}" (${dwg.drawing_number}, Revision ${dwg.revision || 'R0'}) for project "${this.project?.name || ''}".\n\nKindly confirm structural specifications and dimensional tolerances.`,
      required_by_date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
    };
    this.showSignatureModal = true;
  }

  sendSignatureRequest() {
    if (!this.project?.id || !this.selectedDrawingForSignature) return;
    if (!this.signatureForm.stakeholder_email?.trim() || !this.signatureForm.stakeholder_email.includes('@')) {
      this.toastr.warning('Please enter a valid stakeholder email address.');
      return;
    }
    if (!this.signatureForm.stakeholder_name?.trim()) {
      this.toastr.warning('Stakeholder name is required.');
      return;
    }

    this.signatureSending = true;
    this.projectService.requestStakeholderSignature({
      project_id: this.project.id,
      drawing_id: this.selectedDrawingForSignature.id,
      drawing_number: this.selectedDrawingForSignature.drawing_number,
      revision: this.selectedDrawingForSignature.revision,
      ...this.signatureForm
    }).subscribe({
      next: (res: any) => {
        this.signatureSending = false;
        this.showSignatureModal = false;
        const status = res.data?.status;
        if (status === 'provider_unconfigured') {
          this.toastr.info('Signature request recorded in project audit trail. (Note: Outbound SMTP provider unconfigured).');
        } else {
          this.toastr.success(`Signature request email dispatched to ${this.signatureForm.stakeholder_email}`);
        }
        this.fetchProjectHistory(this.project!.id.toString());
      },
      error: (err: any) => {
        this.signatureSending = false;
        if (err?.error?.code === 'DUPLICATE_REQUEST') {
          this.toastr.warning(err?.error?.message || 'A signature request was already sent recently for this drawing revision.');
        } else {
          this.toastr.error(err?.error?.message || 'Failed to dispatch signature request.');
        }
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (!this.project?.id) return;
    const pid = this.project.id;

    if (tab === 'BOQ' && this.boqList.length === 0) {
      this.projectService.getProjectBOQ(pid).subscribe({
        next: (res: any) => { this.boqList = res.data || []; },
        error: () => {}
      });
    } else if (tab === 'DPR' && this.dprList.length === 0) {
      this.projectService.getProjectDPRs(pid).subscribe({
        next: (res: any) => { this.dprList = res.data || []; },
        error: () => {}
      });
    } else if (tab === 'Labour' && this.labourLogs.length === 0) {
      this.projectService.getProjectLabourLogs(pid).subscribe({
        next: (res: any) => { this.labourLogs = res.data || []; },
        error: () => {}
      });
    } else if (tab === 'Drawings' && this.drawingsList.length === 0) {
      this.projectService.getProjectDrawings(pid).subscribe({
        next: (res: any) => { this.drawingsList = res.data || []; },
        error: () => {}
      });
    } else if (tab === 'Snags' && this.snagList.length === 0) {
      this.projectService.getProjectSnags(pid).subscribe({
        next: (res: any) => { this.snagList = res.data || []; },
        error: () => {}
      });
    } else if (tab === 'MB & Billing') {
      this.loadMeasurementBooks();
      this.loadContractorRaBills();
      this.loadCertifiedUnbilledItems();
      if (this.boqList.length === 0) {
        this.projectService.getProjectBOQ(pid).subscribe({
          next: (res: any) => { this.boqList = res.data || []; },
          error: () => {}
        });
      }
    } else if (tab === 'Variations') {
      this.loadVariationOrders();
      this.loadVariationSummary();
      if (this.boqList.length === 0) {
        this.projectService.getProjectBOQ(pid).subscribe({
          next: (res: any) => { this.boqList = res.data || []; },
          error: () => {}
        });
      }
    }
  }

  // --- Batch R: MB & Contractor RA Billing Methods ---
  loadMeasurementBooks() {
    if (!this.project?.id) return;
    this.mbLoading = true;
    this.projectService.getMeasurementBooks(this.project.id).subscribe({
      next: (res: any) => {
        this.mbLoading = false;
        this.mbList = res.data || [];
      },
      error: () => {
        this.mbLoading = false;
        this.toastr.error('Failed to load Measurement Books.');
      }
    });
  }

  loadContractorRaBills() {
    if (!this.project?.id) return;
    this.raBillsLoading = true;
    this.projectService.getContractorRaBills(this.project.id).subscribe({
      next: (res: any) => {
        this.raBillsLoading = false;
        this.raBillsList = res.data || [];
      },
      error: () => {
        this.raBillsLoading = false;
        this.toastr.error('Failed to load Contractor RA Bills.');
      }
    });
  }

  loadCertifiedUnbilledItems() {
    if (!this.project?.id) return;
    this.projectService.getCertifiedUnbilledItems(this.project.id).subscribe({
      next: (res: any) => {
        this.unbilledCertifiedItems = res.data || [];
      },
      error: () => {}
    });
  }

  openCreateMbModal() {
    this.showCreateMbModal = true;
    this.newMb = {
      title: '',
      vendor_id: null,
      contract_reference: '',
      measurement_date: new Date().toISOString().split('T')[0],
      period_start: '',
      period_end: '',
      remarks: '',
      items: [
        {
          boq_item_id: null,
          work_description: '',
          location_reference: '',
          calculation_method: 'direct',
          num_units: 1,
          length: null,
          breadth: null,
          depth_height: null,
          measured_qty: 0,
          unit: 'cum',
          contract_rate: 0,
        }
      ]
    };
  }

  addMbItemRow() {
    this.newMb.items.push({
      boq_item_id: null,
      work_description: '',
      location_reference: '',
      calculation_method: 'direct',
      num_units: 1,
      length: null,
      breadth: null,
      depth_height: null,
      measured_qty: 0,
      unit: 'cum',
      contract_rate: 0,
    });
  }

  removeMbItemRow(idx: number) {
    if (this.newMb.items.length > 1) {
      this.newMb.items.splice(idx, 1);
    }
  }

  onBoqItemSelected(item: any, boqId: any) {
    const selected = this.boqList.find(b => Number(b.id) === Number(boqId));
    if (selected) {
      item.boq_item_id = selected.id;
      item.unit = selected.unit || 'unit';
      item.contract_rate = selected.unit_rate || 0;
      if (!item.work_description) {
        item.work_description = selected.description || '';
      }
      this.recalculateMbItemQty(item);
    }
  }

  recalculateMbItemQty(item: any) {
    const units = parseFloat(item.num_units) || 1;
    switch (item.calculation_method) {
      case 'l_b_d': {
        const l = parseFloat(item.length) || 0;
        const b = parseFloat(item.breadth) || 0;
        const d = parseFloat(item.depth_height) || 0;
        item.measured_qty = Number((units * l * b * d).toFixed(3));
        break;
      }
      case 'l_b': {
        const l = parseFloat(item.length) || 0;
        const b = parseFloat(item.breadth) || 0;
        item.measured_qty = Number((units * l * b).toFixed(3));
        break;
      }
      case 'count': {
        item.measured_qty = units;
        break;
      }
      case 'direct':
      default:
        // user enters measured_qty directly
        break;
    }
  }

  get mbModalTotalAmount(): number {
    return this.newMb.items.reduce((acc, it) => {
      const q = parseFloat(it.measured_qty as any) || 0;
      const r = parseFloat(it.contract_rate as any) || 0;
      return acc + (q * r);
    }, 0);
  }

  saveMeasurementBook() {
    if (!this.project?.id) return;
    if (!this.newMb.title.trim()) {
      this.toastr.warning('Please enter a measurement book title.');
      return;
    }
    const invalidItem = this.newMb.items.find(it => !it.boq_item_id || !it.work_description.trim() || !(it.measured_qty > 0));
    if (invalidItem) {
      this.toastr.warning('Please select a valid BOQ item, description, and positive quantity for all rows.');
      return;
    }

    this.mbSaving = true;
    this.projectService.createMeasurementBook({
      project_id: this.project.id,
      vendor_id: this.newMb.vendor_id || null,
      contract_reference: this.newMb.contract_reference || null,
      title: this.newMb.title,
      measurement_date: this.newMb.measurement_date,
      period_start: this.newMb.period_start || null,
      period_end: this.newMb.period_end || null,
      remarks: this.newMb.remarks || null,
      items: this.newMb.items,
    }).subscribe({
      next: (res: any) => {
        this.mbSaving = false;
        this.showCreateMbModal = false;
        this.toastr.success(res.message || 'Measurement Book draft created successfully.');
        this.loadMeasurementBooks();
        this.fetchProjectHistory(this.project!.id.toString());
      },
      error: (err: any) => {
        this.mbSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to create Measurement Book.');
      }
    });
  }

  submitMb(mb: any) {
    Swal.fire({
      title: 'Submit for Certification?',
      text: `Submit Measurement Book "${mb.mb_number}" for independent review and certification?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit',
      confirmButtonColor: '#2563eb'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.submitMeasurementBook(mb.id).subscribe({
          next: (res: any) => {
            this.toastr.success('Measurement Book submitted for certification.');
            this.loadMeasurementBooks();
            this.fetchProjectHistory(this.project!.id.toString());
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Failed to submit Measurement Book.');
          }
        });
      }
    });
  }

  certifyMb(mb: any) {
    Swal.fire({
      title: 'Certify Measurements?',
      text: `Certify ${mb.mb_number} (Total: ₹${parseFloat(mb.total_measured_amount || 0).toLocaleString('en-IN')})? This will update authoritative BOQ executed quantities. Note: Segregation of duties applies.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Certify Work',
      confirmButtonColor: '#059669'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.certifyMeasurementBook(mb.id).subscribe({
          next: (res: any) => {
            this.toastr.success('Measurement Book successfully certified!');
            this.loadMeasurementBooks();
            this.loadCertifiedUnbilledItems();
            this.fetchProjectHistory(this.project!.id.toString());
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Certification failed.');
          }
        });
      }
    });
  }

  rejectMb(mb: any) {
    Swal.fire({
      title: 'Reject Measurement Book',
      input: 'textarea',
      inputLabel: 'Reason for Rejection / Return for Correction',
      inputPlaceholder: 'State specific discrepancies (e.g., dimension dispute, quality hold)...',
      inputValidator: (value) => {
        if (!value) return 'A rejection reason is required!';
        return null;
      },
      showCancelButton: true,
      confirmButtonText: 'Reject Entry',
      confirmButtonColor: '#dc2626'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.projectService.rejectMeasurementBook(mb.id, result.value).subscribe({
          next: (res: any) => {
            this.toastr.info('Measurement Book rejected.');
            this.loadMeasurementBooks();
            this.fetchProjectHistory(this.project!.id.toString());
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Rejection failed.');
          }
        });
      }
    });
  }

  openCreateRaBillModal() {
    this.loadCertifiedUnbilledItems();
    this.selectedMbItemIdsForBill = [];
    this.showCreateRaBillModal = true;
    this.newRaBill = {
      vendor_id: null,
      contract_reference: '',
      billing_period_start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      billing_period_end: new Date().toISOString().split('T')[0],
      retention_rate_pct: 5.0,
      tds_rate_pct: 2.0,
      other_deductions_amount: 0,
      remarks: '',
    };
  }

  toggleMbItemForBill(id: number) {
    const idx = this.selectedMbItemIdsForBill.indexOf(id);
    if (idx >= 0) {
      this.selectedMbItemIdsForBill.splice(idx, 1);
    } else {
      this.selectedMbItemIdsForBill.push(id);
    }
  }

  selectAllCertifiedForBill() {
    this.selectedMbItemIdsForBill = this.unbilledCertifiedItems.map(it => it.id);
  }

  get selectedCertifiedGrossAmount(): number {
    return this.unbilledCertifiedItems
      .filter(it => this.selectedMbItemIdsForBill.includes(it.id))
      .reduce((acc, it) => acc + parseFloat(it.certified_amount || it.measured_amount || 0), 0);
  }

  get billCalculatedRetention(): number {
    return (this.selectedCertifiedGrossAmount * (parseFloat(this.newRaBill.retention_rate_pct as any) || 0)) / 100;
  }

  get billCalculatedTds(): number {
    return (this.selectedCertifiedGrossAmount * (parseFloat(this.newRaBill.tds_rate_pct as any) || 0)) / 100;
  }

  get billCalculatedNetPayable(): number {
    const gross = this.selectedCertifiedGrossAmount;
    const ret = this.billCalculatedRetention;
    const tds = this.billCalculatedTds;
    const oth = parseFloat(this.newRaBill.other_deductions_amount as any) || 0;
    return Math.max(0, gross - ret - tds - oth);
  }

  saveContractorRaBill() {
    if (!this.project?.id) return;
    if (this.selectedMbItemIdsForBill.length === 0) {
      this.toastr.warning('Please select at least one certified measurement item to bill.');
      return;
    }

    // Determine vendor from selected items if not chosen
    const selectedItem = this.unbilledCertifiedItems.find(it => this.selectedMbItemIdsForBill.includes(it.id));
    const vendorId = this.newRaBill.vendor_id || selectedItem?.measurement_book?.vendor_id || 1;

    this.raBillSaving = true;
    this.projectService.createContractorRaBill({
      project_id: this.project.id,
      vendor_id: vendorId,
      contract_reference: this.newRaBill.contract_reference || null,
      billing_period_start: this.newRaBill.billing_period_start,
      billing_period_end: this.newRaBill.billing_period_end,
      mb_item_ids: this.selectedMbItemIdsForBill,
      retention_rate_pct: this.newRaBill.retention_rate_pct,
      tds_rate_pct: this.newRaBill.tds_rate_pct,
      other_deductions_amount: this.newRaBill.other_deductions_amount,
      remarks: this.newRaBill.remarks,
    }).subscribe({
      next: (res: any) => {
        this.raBillSaving = false;
        this.showCreateRaBillModal = false;
        this.toastr.success(res.message || 'Contractor RA Bill drafted successfully.');
        this.loadContractorRaBills();
        this.loadCertifiedUnbilledItems();
        this.fetchProjectHistory(this.project!.id.toString());
      },
      error: (err: any) => {
        this.raBillSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to generate Contractor RA Bill.');
      }
    });
  }

  approveRaBill(bill: any) {
    Swal.fire({
      title: 'Approve Contractor RA Bill?',
      text: `Approve Bill ${bill.ra_bill_number} (Net Payable: ₹${parseFloat(bill.net_payable_amount || 0).toLocaleString('en-IN')})? This will accrue subcontractor liability in Project Cost Ledger. Note: Segregation of duties applies.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve Bill',
      confirmButtonColor: '#059669'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.approveContractorRaBill(bill.id, true).subscribe({
          next: (res: any) => {
            this.toastr.success('Contractor RA Bill approved and cost accrued!');
            this.loadContractorRaBills();
            this.fetchProjectHistory(this.project!.id.toString());
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Bill approval failed.');
          }
        });
      }
    });
  }

  // --- Batch W: Enterprise Variations Methods ---
  loadVariationOrders() {
    if (!this.project?.id) return;
    this.variationsLoading = true;
    const params: any = {};
    if (this.selectedVariationFilter !== 'All') {
      params.status = this.selectedVariationFilter;
    }
    this.projectService.getVariationOrders(this.project.id, params).subscribe({
      next: (res: any) => {
        this.variationsList = res.data || [];
        this.variationsLoading = false;
      },
      error: () => {
        this.variationsLoading = false;
      }
    });
  }

  loadVariationSummary() {
    if (!this.project?.id) return;
    this.projectService.getVariationSummary(this.project.id).subscribe({
      next: (res: any) => {
        this.variationSummary = res.data || null;
      },
      error: () => {}
    });
  }

  openCreateVoModal() {
    this.showCreateVoModal = true;
    const code = (this.project?.name || 'PRJ').replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
    this.newVo = {
      variation_number: `VO-${code}-${String(this.variationsList.length + 1).padStart(3, '0')}`,
      change_type: 'client_variation',
      category: 'quantity_deviation',
      title: '',
      description: '',
      originating_source: '',
      time_extension_days_requested: 0,
      supporting_docs_url: '',
      items: [
        {
          boq_item_id: null,
          description: '',
          unit: 'cum',
          proposed_delta_qty: 0,
          proposed_rate: 0,
        }
      ]
    };
  }

  addVoItemRow() {
    this.newVo.items.push({
      boq_item_id: null,
      description: '',
      unit: 'cum',
      proposed_delta_qty: 0,
      proposed_rate: 0,
    });
  }

  removeVoItemRow(idx: number) {
    if (this.newVo.items.length > 1) {
      this.newVo.items.splice(idx, 1);
    }
  }

  onVoBoqSelected(item: any, boqId: any) {
    const selected = this.boqList.find(b => Number(b.id) === Number(boqId));
    if (selected) {
      item.boq_item_id = selected.id;
      item.unit = selected.unit || 'unit';
      item.proposed_rate = selected.unit_rate || 0;
      if (!item.description) {
        item.description = selected.description || '';
      }
    }
  }

  saveVariationOrder() {
    if (!this.project?.id) return;
    if (!this.newVo.title.trim() || !this.newVo.variation_number.trim() || !this.newVo.description.trim()) {
      this.toastr.warning('Please enter variation number, title, and description.');
      return;
    }

    this.voSaving = true;
    this.projectService.createVariationOrder({
      project_id: this.project.id,
      variation_number: this.newVo.variation_number,
      change_type: this.newVo.change_type,
      category: this.newVo.category,
      title: this.newVo.title,
      description: this.newVo.description,
      originating_source: this.newVo.originating_source,
      time_extension_days_requested: this.newVo.time_extension_days_requested,
      supporting_docs_url: this.newVo.supporting_docs_url,
      items: this.newVo.items,
    }).subscribe({
      next: (res: any) => {
        this.voSaving = false;
        this.showCreateVoModal = false;
        this.toastr.success(res.message || 'Variation order drafted successfully.');
        this.loadVariationOrders();
        this.loadVariationSummary();
        this.fetchProjectHistory(this.project!.id.toString());
      },
      error: (err: any) => {
        this.voSaving = false;
        this.toastr.error(err?.error?.message || 'Failed to create variation order.');
      }
    });
  }

  submitVariation(vo: any) {
    Swal.fire({
      title: 'Submit Variation Order?',
      text: `Submit ${vo.variation_number} for technical and commercial evaluation?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit',
      confirmButtonColor: '#2563eb'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.submitVariationOrder(vo.id).subscribe({
          next: (res: any) => {
            this.toastr.success(res.message || 'Variation order submitted.');
            this.loadVariationOrders();
            this.loadVariationSummary();
            this.fetchProjectHistory(this.project!.id.toString());
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Submission failed.');
          }
        });
      }
    });
  }

  openVoDetails(vo: any) {
    this.selectedVoDetail = vo;
    this.showVoDetailModal = true;
  }

  approveVariation(vo: any) {
    Swal.fire({
      title: 'Authorize & Approve Variation?',
      text: `Authorize Variation ${vo.variation_number} (Proposed: ₹${parseFloat(vo.proposed_amount || 0).toLocaleString('en-IN')})? Note: Segregation of duties applies.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Authorize',
      confirmButtonColor: '#059669'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.approveVariationOrder(vo.id, { approved_time_extension_days: vo.time_extension_days_requested }).subscribe({
          next: (res: any) => {
            this.toastr.success('Variation order approved successfully!');
            this.loadVariationOrders();
            this.loadVariationSummary();
            this.fetchProjectHistory(this.project!.id.toString());
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Approval failed.');
          }
        });
      }
    });
  }

  implementVariation(vo: any) {
    Swal.fire({
      title: 'Implement into Contract Baseline?',
      text: `Implement approved Variation ${vo.variation_number}? This will adjust authorized BOQ caps and allow site Measurement Book certification.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Implement Scope',
      confirmButtonColor: '#7c3aed'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.implementVariationOrder(vo.id).subscribe({
          next: (res: any) => {
            this.toastr.success('Variation scope implemented into active contract baseline!');
            this.loadVariationOrders();
            this.loadVariationSummary();
            // Refresh BOQ list as well
            this.projectService.getProjectBOQ(this.project!.id).subscribe({
              next: (bRes: any) => { this.boqList = bRes.data || []; },
              error: () => {}
            });
            this.fetchProjectHistory(this.project!.id.toString());
          },
          error: (err: any) => {
            this.toastr.error(err?.error?.message || 'Implementation failed.');
          }
        });
      }
    });
  }


  exportBOQFile() {
    if (!this.project?.id) return;
    const exportUrl = `${this.serverUrl}/api/v1/export/boq/${this.project.id}`;
    window.open(exportUrl, '_blank');
    this.toastr.info('Downloading Project BOQ spreadsheet...');
  }

  exportDPRFile() {
    if (!this.project?.id) return;
    const exportUrl = `${this.serverUrl}/api/v1/export/dpr/${this.project.id}`;
    window.open(exportUrl, '_blank');
    this.toastr.info('Downloading Daily Progress Reports...');
  }

  openRFIComposer() { this.showRFIComposer = true; }
  sendRFI() {
    this.toastr.success('RFI Sent Successfully');
    this.showRFIComposer = false;
  }

  openDrawingUpload() {
    this.showDrawingUpload = true;
    this.selectedFiles = [];
  }

  onFilesSelected(event: any) {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  submitDrawing() {
    if (this.selectedFiles.length === 0) {
      this.toastr.warning('Please select files to upload.');
      return;
    }

    if (!this.project) return;

    this.projectService.uploadDocuments(this.project.id, this.selectedFiles).subscribe({
      next: (res) => {
        this.toastr.success('Files uploaded successfully');
        this.showDrawingUpload = false;
        this.selectedFiles = [];
        // Refresh project details to show new files in gallery
        this.fetchProjectDetails(this.project!.id.toString());
        // Refresh history too, since a DOCUMENT_UPLOADED entry was just logged
        this.fetchProjectHistory(this.project!.id.toString());
      },
      error: (err) => {
        this.toastr.error('Failed to upload files.');
        console.error(err);
      }
    });
  }

  get filteredAudit(): IAuditEntry[] {
    if (this.auditFilter === 'All') return this.auditTrail;
    return this.auditTrail.filter((a) => a.type === this.auditFilter);
  }


  openAddMilestoneModal() {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: '500px',
      disableClose: false,
      height: 'auto',
      data: {
        project: this.project,
        title: 'Add Milestone'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchProjectDetails(this.project!.id.toString());
      this.fetchProjectHistory(this.project!.id.toString());
    });
  }

  openEditMilestoneModal(ms: IMilestone) {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: '500px',
      disableClose: false,
      height: 'auto',
      data: {
        project: this.project,
        milestone: ms,
        title: 'Edit Milestone'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchProjectDetails(this.project!.id.toString());
        this.fetchProjectHistory(this.project!.id.toString());
      }
    });
  }

  openEditSubMilestoneModal(msId: number, sm: IMilestone) {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: '500px',
      disableClose: false,
      height: 'auto',
      data: {
        project: this.project,
        milestone: sm,
        parent_id: msId,
        title: 'Edit Sub Milestone'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchProjectDetails(this.project!.id.toString());
        this.fetchProjectHistory(this.project!.id.toString());
      }
    });
  }

  openAddSubMilestoneModal(msId: number) {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: '500px',
      disableClose: false,
      height: 'auto',
      data: {
        project: this.project,
        parent_id: msId,
        title: 'Add Sub Milestone'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchProjectDetails(this.project!.id.toString());
        this.fetchProjectHistory(this.project!.id.toString());
      }
    });
  }

  getCoverImageUrl(thumbnail: string | null | undefined): string {
    if (!thumbnail) return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop';
    if (thumbnail.startsWith('http')) return thumbnail;

    const baseUrl = this.serverUrl.endsWith('/') ? this.serverUrl.slice(0, -1) : this.serverUrl;
    const thumbPath = thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`;
    const token = localStorage.getItem('token') || (JSON.parse(localStorage.getItem('auth_user') || '{}').accessToken);
    return token ? `${baseUrl}${thumbPath}?token=${encodeURIComponent(token)}` : `${baseUrl}${thumbPath}`;
  }
}