import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';

interface Project {
  id: number;
  name: string;
  address: string;
  progress: number;
}

interface DashboardStats {
  totalBudget: number;
  projects: { total: number; thisMonth: number; projectList: Project[]; };
  materials: { total: number; newAdded: number };
  equipment: { total: number; active: number };
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  stats: DashboardStats = {
    totalBudget: 0,
    projects: { total: 0, thisMonth: 0, projectList: [] },
    materials: { total: 0, newAdded: 0 },
    equipment: { total: 0, active: 0 },
  };

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  goToAddMaterial(): void {
    this.router.navigate(['/master/masters/material']);
  }

  goToAddEquipment(): void {
    this.router.navigate(['/master/masters/equipment']);
  }

  goToAddQuote(): void {
    this.router.navigate(['/master/resources/quotations']);
  }

  goToAddVendor(): void {
    this.router.navigate(['/master/resources/vendors']);
  }
  goToProjects(): void {
    this.router.navigate(['/master/projects']);
  }

  formatBudget(value: number): string {
  if (!value) return '0';

  if (value >= 1000000) {
    return (value / 1000000).toFixed(2).replace(/\.00$/, '') + ' M';
  }

  if (value >= 100000) {
    return (value / 100000).toFixed(2).replace(/\.00$/, '') + ' L';
  }

  if (value >= 1000) {
    return (value / 1000).toFixed(2).replace(/\.00$/, '') + ' K';
  }

  return value.toString();
}

  private loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res) => {
        if (res?.success && res?.data) {
          this.stats = {
            totalBudget: res.data.totalBudget ?? 0,
            projects: {
              total: res.data.projects?.total ?? 0,
              thisMonth: res.data.projects?.thisMonth ?? 0,
              projectList: res.data.projects?.projectList ?? [],
            },
            materials: {
              total: res.data.materials?.total ?? 0,
              newAdded: res.data.materials?.newAdded ?? 0,
            },
            equipment: {
              total: res.data.equipment?.total ?? 0,
              active: res.data.equipment?.active ?? 0,
            },
          };
        }
      },
      error: () => {
        this.stats = {
          totalBudget: 0,
          projects: { total: 0, thisMonth: 0, projectList: [], },
          materials: { total: 0, newAdded: 0 },
          equipment: { total: 0, active: 0 },
        };
      },
    });
  }
}
