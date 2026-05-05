import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ToastrService } from 'ngx-toastr';

import { IProject, IUser, IAuditEntry, IMilestone, MilestoneStatus } from '../../../shared/interfaces/project.interface';
import { MatDialog } from '@angular/material/dialog';
import { MilestoneFormDialog } from '../dialogs/milestone-form-dialog/milestone-form-dialog';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  project: IProject | null = null;
  loading = true;
  error: string | null = null;

  activeTab = 'Overview';
  tabs = ['Overview', 'Tasks', 'Timeline', 'Budget', 'Gallery', 'Files', 'Updates'];

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
      }
    });

    this.mockAuditTrail();
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

  private mapProjectData(p: IProject): IProject {
    const allMilestones = p.milestones || [];

    // Create a map to group sub-milestones under their parents
    const parentMilestones: IMilestone[] = allMilestones
      .filter((m) => !m.parent_id)
      .map((m, i) => ({
        ...m,
        color: m.color || (i % 3 === 0 ? 'blue-600' : i % 3 === 1 ? 'indigo-600' : 'emerald-600'),
        subMilestones: allMilestones.filter((sm) => sm.parent_id === m.id)
      }));

    const totalMs = parentMilestones.length;
    let totalProgress = 0;
    parentMilestones.forEach(m => {
      totalProgress += (m.progress || 0);
    });
    const progress = totalMs > 0 ? Math.round(totalProgress / totalMs) : 0;

    return {
      ...p,
      progress: progress,
      milestones: parentMilestones,
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
      },
      error: (err) => {
        this.toastr.error('Failed to upload files.');
        console.error(err);
      }
    });
  }

  private mockAuditTrail() {
    this.auditTrail = [
      { id: 'a1', type: 'Project', action: 'Project Initialized', detail: 'Project created in system.', user: 'System', time: 'Just now', icon: 'rocket_launch', color: 'text-blue-600 bg-blue-100' },
      { id: 'a2', type: 'Team', action: 'Team Assigned', detail: 'Resource allocation completed.', user: 'Admin', time: '2 hours ago', icon: 'group_add', color: 'text-indigo-600 bg-indigo-100' }
    ];
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
      }
    });
  }
}
