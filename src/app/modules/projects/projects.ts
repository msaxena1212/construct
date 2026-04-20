import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project-service';
import { IProject, IUser } from '../../shared/interfaces/project.interface';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  projects: IProject[] = [];
  loading: boolean = true;
  error: string | null = null;

  availableTeamMembers: string[] = ['All Members'];
  selectedMember = 'All Members';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  get filteredProjects(): IProject[] {
    if (this.selectedMember === 'All Members') return this.projects;
    return this.projects.filter((p) => 
      p.team_members?.some((m) => (m.firstname + ' ' + m.lastname) === this.selectedMember)
    );
  }

  fetchProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (res) => {
        const rawProjects = res.data;
        this.projects = rawProjects.map((p) => this.mapProject(p));
        this.extractUniqueMembers();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects. Please try again.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  private mapProject(p: IProject): IProject {
    const totalMilestones = p.milestones?.length || 0;
    const completedMilestones = p.milestones?.filter((m) => m.is_completed).length || 0;
    const progress = totalMilestones > 0 
      ? Math.round((completedMilestones / totalMilestones) * 100) 
      : 0;

    return {
      ...p,
      progress: progress
    };
  }

  private extractUniqueMembers() {
    const memberSet = new Set<string>();
    this.projects.forEach(p => {
      p.team_members?.forEach(m => {
        memberSet.add(m.firstname + ' ' + m.lastname);
      });
    });
    this.availableTeamMembers = ['All Members', ...Array.from(memberSet)];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'On Track':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'At Risk':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Delayed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  }
}
