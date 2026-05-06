import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../projects/services/project-service';
import { IProject } from '../../shared/interfaces/project.interface';

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

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data;
        if (this.projects.length > 0) {
          this.selectedProjectId = this.projects[0].id;
        }
      },
      error: (err) => console.error('Error fetching projects', err)
    });
  }

  onProjectChange(projectId: number) {
    this.selectedProjectId = projectId;
  }

  getSelectedProject(): IProject | null {
    if (!this.selectedProjectId) return null;
    return this.projects.find(p => p.id === this.selectedProjectId) || null;
  }
}
