import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project-service';
import { IProject, IUser, MilestoneStatus } from '../../shared/interfaces/project.interface';
import { environment } from '../../../environments/environment';
import { PermissionService } from '../../shared/services/permission/permission.service';

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
  serverUrl = environment.serverUrl;
  searchText = '';

  allProjects: any[] = [];
  filteredProjects: any[] = [];

  // constructor(private projectService: ProjectService) { }
  constructor(
  private projectService: ProjectService,
  public permissionService: PermissionService
) {}

  ngOnInit(): void {
    this.fetchProjects();

  }




  filterProjects() {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      this.filteredProjects = [...this.projects];
      return;
    }

    this.filteredProjects = this.projects.filter((project:any) =>
      project.name?.toLowerCase().includes(search) ||
      project.clientName?.toLowerCase().includes(search) ||
      project.location?.toLowerCase().includes(search)
    );
  }

  // get filteredProjects(): IProject[] {
  //   if (this.selectedMember === 'All Members') return this.projects;
  //   return this.projects.filter((p) =>
  //     p.team_members?.some((m) => (m.firstname + ' ' + m.lastname) === this.selectedMember)
  //   );
  // }

  fetchProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data;
        this.filteredProjects = [...this.projects];

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

  getThumbnailUrl(thumbnail: string | null | undefined): string {
    if (!thumbnail) return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop';
    if (thumbnail.startsWith('http')) return thumbnail;

    const baseUrl = this.serverUrl.endsWith('/') ? this.serverUrl.slice(0, -1) : this.serverUrl;
    const thumbPath = thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`;
    return `${baseUrl}${thumbPath}`;
  }
}
