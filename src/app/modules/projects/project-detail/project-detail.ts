import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  project: any = null;
  loading = true;
  error: string | null = null;
  
  activeTab = 'Overview';
  tabs = ['Overview', 'Tasks', 'Timeline', 'Budget', 'Gallery', 'Files', 'Updates'];
  
  teamMembers: any[] = [{ name: 'All Members' }];
  selectedMember = 'All Members';

  showAddUpdateModal = false;
  showRFIComposer = false;
  showDrawingUpload = false;
  rfiForm = { to: '', cc: '', bcc: '', subject: '', content: '' };
  uploadedDrawings: any[] = [];
  
  auditFilter = 'All';
  auditFilterOptions = ['All', 'Project', 'Task', 'Milestone', 'Document', 'Safety', 'Budget', 'Team'];
  auditTrail: any[] = []; // Mocked for now

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
      next: (res: any) => {
        this.project = this.mapProjectData(res.data);
        this.loading = false;
        this.syncTeamMembers();
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Failed to load project details.';
        this.toastr.error(this.error);
      }
    });
  }

  private mapProjectData(p: any) {
    // Progress calculation
    const totalMs = p.milestones?.length || 0;
    const completedMs = p.milestones?.filter((m: any) => m.is_completed).length || 0;
    const progress = totalMs > 0 ? Math.round((completedMs / totalMs) * 100) : 0;

    // Milestone mapping (add colors if missing for UI)
    const milestones = (p.milestones || []).map((m: any, i: number) => ({
      ...m,
      color: m.color || (i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'outline'),
      progress: m.is_completed ? 100 : (i === completedMs ? 45 : 0) // Visual flair for active milestone
    }));

    return {
      ...p,
      progress: progress,
      milestones: milestones,
      estimatedCompletion: p.completion_date,
      budget: {
        total: p.budget_total,
        used: p.budget_used
      },
      // Map associations to the names expected by template
      team: (p.team_members || []).map((m: any) => ({
        name: `${m.firstname} ${m.lastname}`,
        role: m.PROJECT_TEAM?.role || 'Technical Staff',
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

  // --- Mock Features for UI Interactivity ---
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

  get filteredAudit() {
    if (this.auditFilter === 'All') return this.auditTrail;
    return this.auditTrail.filter((a) => a.type === this.auditFilter);
  }
}
