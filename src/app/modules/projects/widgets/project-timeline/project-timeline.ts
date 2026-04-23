import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { IProject, IProjectTask, IMilestone, ITimelinePhase, ITimelineItem } from '../../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-project-timeline',
  standalone: false,
  templateUrl: './project-timeline.html',
  styleUrl: './project-timeline.scss',
})
export class ProjectTimeline implements OnInit {
  @Input() projectId: string | number = '';
  @Input() selectedMember = 'All Members';

  loading = true;
  viewType: 'day' | 'week' | 'month' = 'week';
  showCriticalPath = false;
  showTeamView = false;
  
  // Dynamic Timeline Logic
  timelineHeaders: any[] = [];
  startDate: Date = new Date();
  totalDurationDays = 90; // Default view window

  selectedProject = '';
  projects: string[] = [];

  team: any[] = [{ name: 'All Members', avatar: '' }];
  phases: ITimelinePhase[] = [];
  resources: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.initTimelineRange();
    if (this.projectId) {
      this.fetchTimelineData();
    }
  }

  initTimelineRange() {
    const today = new Date();
    this.startDate = new Date(today);
    
    if (this.viewType === 'day') {
      this.startDate.setDate(today.getDate() - 3);
      this.totalDurationDays = 14;
    } else if (this.viewType === 'week') {
      this.startDate.setDate(today.getDate() - 21);
      this.totalDurationDays = 70; // ~10 weeks
    } else {
      this.startDate.setDate(today.getDate() - 60);
      this.totalDurationDays = 180; // ~6 months
    }
    
    this.generateTimelineHeaders();
  }

  generateTimelineHeaders() {
    this.timelineHeaders = [];
    const tempDate = new Date(this.startDate);
    
    if (this.viewType === 'day') {
      for (let i = 0; i < 14; i++) {
        this.timelineHeaders.push({
          label: tempDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          isToday: tempDate.toDateString() === new Date().toDateString()
        });
        tempDate.setDate(tempDate.getDate() + 1);
      }
    } else if (this.viewType === 'week') {
      for (let i = 0; i < 10; i++) {
        this.timelineHeaders.push({
          label: tempDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          isCurrent: tempDate <= new Date() && new Date() < new Date(tempDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        });
        tempDate.setDate(tempDate.getDate() + 7);
      }
    } else {
      for (let i = 0; i < 6; i++) {
        this.timelineHeaders.push({
          label: tempDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          isCurrent: tempDate.getMonth() === new Date().getMonth() && tempDate.getFullYear() === new Date().getFullYear()
        });
        tempDate.setMonth(tempDate.getMonth() + 1);
      }
    }
  }

  fetchTimelineData() {
    this.loading = true;
    this.projectService.getProjectTimeline(this.projectId).subscribe({
      next: (res) => {
        const project: IProject = res.data;
        this.selectedProject = project.name;
        this.projects = [project.name];

        if (project.team_members) {
          this.team = [{ name: 'All Members', avatar: '' }, ...project.team_members];
          this.resources = project.team_members.map(m => ({
            name: m.firstname + ' ' + m.lastname,
            role: m.project_team?.role || 'Site Team',
            utilization: Math.floor(Math.random() * 40) + 60,
            avatar: m.avatar,
            overAllocated: Math.random() > 0.8
          }));
        }

        this.mapDataToPhases(project);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  mapDataToPhases(project: IProject) {
    const today = new Date();
    const milestones: ITimelineItem[] = (project.milestones || []).map(m => ({
      id: `m-${m.id}`,
      name: m.name,
      color: 'bg-secondary',
      isMilestone: true,
      milestoneTitle: m.name,
      left: this.calculatePosition(new Date(m.createdAt || today))
    }));

    const tasks: ITimelineItem[] = (project.tasks || []).map(t => ({
      id: `t-${t.id}`,
      name: t.title,
      color: t.status === 'Completed' ? 'bg-green-500' : (t.priority === 'High Priority' ? 'bg-error' : 'bg-primary'),
      completion: t.is_completed ? 100 : (t.status === 'In Progress' ? 45 : 0),
      status: t.status,
      left: this.calculatePosition(new Date(t.createdAt || today)),
      width: this.calculateWidth(new Date(t.createdAt || today), new Date(t.due_date || today)),
      assignee: t.assignees?.[0]?.avatar,
      critical: t.priority === 'High Priority'
    }));

    this.phases = [
      { title: 'PROJECT MILESTONES', tasks: milestones },
      { title: 'CONSTRUCTION TASKS', tasks: tasks }
    ];
  }

  calculatePosition(date: Date): string {
    const diffTime = date.getTime() - this.startDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    let pos = (diffDays / this.totalDurationDays) * 100;
    if (pos < 0) pos = 0;
    if (pos > 98) pos = 98;
    return pos + '%';
  }

  calculateWidth(start: Date, end: Date): string {
    const diffTime = end.getTime() - start.getTime();
    let diffDays = diffTime / (1000 * 3600 * 24);
    if (diffDays < 2) diffDays = 2;
    let width = (diffDays / this.totalDurationDays) * 100;
    if (width > 40) width = 40;
    return width + '%';
  }

  get filteredPhases(): ITimelinePhase[] {
    if (this.selectedMember === 'All Members') return this.phases;
    const member = this.team.find(m => (m.firstname + ' ' + m.lastname) === this.selectedMember || m.name === this.selectedMember);
    return this.phases.map(p => ({
      ...p,
      tasks: p.tasks.filter(t => t.assignee === member?.avatar || t.isMilestone)
    })).filter(p => p.tasks.length > 0);
  }

  setViewType(type: 'day' | 'week' | 'month') {
    this.viewType = type;
    this.initTimelineRange();
    if (this.projectId) this.fetchTimelineData();
  }

  toggleCriticalPath() {
    this.showCriticalPath = !this.showCriticalPath;
  }

  toggleTeamView() {
    this.showTeamView = !this.showTeamView;
  }

  navigate(direction: 'next' | 'prev') {
    const days = direction === 'next' ? 7 : -7;
    this.startDate.setDate(this.startDate.getDate() + days);
    this.generateTimelineHeaders();
    if (this.projectId) this.fetchTimelineData();
  }

  getCurrentDateLabel(): string {
    return this.startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  getTodayPosition(): string {
    const today = new Date();
    const diffTime = today.getTime() - this.startDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    let pos = (diffDays / this.totalDurationDays) * 100;
    if (pos < 0 || pos > 100) return '-100%';
    return pos + '%';
  }

  resetToToday() {
    this.initTimelineRange();
    if (this.projectId) this.fetchTimelineData();
  }
}
