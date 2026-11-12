import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../projects/services/project-service';

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline implements OnInit {
  projects: any[] = [];
  selectedProjectId: string | number = 'all';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
      },
      error: (err) => {
        console.error('Failed to load projects list in timeline:', err);
      }
    });
  }

  onProjectChange(projectId: string | number): void {
    this.selectedProjectId = projectId;
  }
}
