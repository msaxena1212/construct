import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ToastrService } from 'ngx-toastr';

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
  // tabs = ['Overview', 'Tasks', 'Timeline', 'Budget', 'Files', 'Updates'];
  tabs = ['Overview', 'Tasks', 'Timeline', 'Budget', 'Files'];

  teamMembers: { name: string; avatar?: string; role?: string }[] = [{ name: 'All Members' }];
  selectedMember = 'All Members';

  showAddUpdateModal = false;
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

  setActiveTab(tab: string) {
    this.activeTab = tab;
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
}