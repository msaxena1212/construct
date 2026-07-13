import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../projects/services/project-service';
import { IProject, IMilestone, IUser } from '../../shared/interfaces/project.interface';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  private projectService = inject(ProjectService);

  projects: IProject[] = [];
  selectedProjectId: number | null = null;
  selectedProject: IProject | null = null;
  loadingProjectDetail = false;
  readonly emptyMilestones: IMilestone[] = [];
  readonly emptyTeamMembers: IUser[] = [];

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data;
        if (this.projects.length > 0) {
          this.selectedProjectId = this.projects[0].id;
          this.selectedProject = this.projects[0];
          this.loadProjectDetail(this.selectedProjectId);
        }
      },
      error: (err) => console.error('Error fetching projects', err)
    });
  }

  onProjectChange(projectId: number) {
    this.selectedProjectId = projectId;
    this.selectedProject = this.projects.find(p => p.id === projectId) || null;
    this.loadProjectDetail(projectId);
  }


  loadProjectDetail(projectId: number) {
    this.loadingProjectDetail = true;
    this.projectService.getProjectById(projectId).subscribe({
      next: (res) => {
        const idx = this.projects.findIndex(p => p.id === projectId);
        if (idx > -1) {
          const merged = { ...this.projects[idx], ...res.data };
          this.projects[idx] = merged;
          this.projects = [...this.projects];

          if (this.selectedProjectId === projectId) {
            this.selectedProject = merged;
          }
        }
        this.loadingProjectDetail = false;
      },
      error: (err) => {
        console.error('Error fetching project detail', err);
        this.loadingProjectDetail = false;
      }
    });
  }
}