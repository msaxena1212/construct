import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ToastrService } from 'ngx-toastr';

import { IProject, IUser, IAuditEntry, IMilestone } from '../../../shared/interfaces/project.interface';

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
  uploadedDrawings: any[] = [];
  
  auditFilter = 'All';
  auditFilterOptions = ['All', 'Project', 'Task', 'Milestone', 'Document', 'Safety', 'Budget', 'Team'];
  auditTrail: IAuditEntry[] = []; 

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

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
    const totalMs = p.milestones?.length || 0;
    const completedMs = p.milestones?.filter((m: IMilestone) => m.is_completed).length || 0;
    const progress = totalMs > 0 ? Math.round((completedMs / totalMs) * 100) : 0;

    const milestones: IMilestone[] = (p.milestones || []).map((m: IMilestone, i: number) => ({
      ...m,
      color: m.color || (i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'outline'),
      progress: m.is_completed ? 100 : (i === completedMs ? 45 : 0)
    }));

    return {
      ...p,
      progress: progress,
      milestones: milestones,
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

  openDrawingUpload() { this.showDrawingUpload = true; }
  submitDrawing() {
    this.toastr.success('Drawing uploaded for review');
    this.showDrawingUpload = false;
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
}
