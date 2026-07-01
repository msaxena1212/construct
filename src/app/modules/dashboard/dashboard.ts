import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';

interface DashboardStats {
  projects: { total: number; thisMonth: number };
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
    projects: { total: 0, thisMonth: 0 },
    materials: { total: 0, newAdded: 0 },
    equipment: { total: 0, active: 0 },
  };

  constructor(private dashboardService: DashboardService,   private router: Router) {}

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

  private loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res) => {
        if (res?.success && res?.data) {
          this.stats = {
            projects: {
              total: res.data.projects?.total ?? 0,
              thisMonth: res.data.projects?.thisMonth ?? 0,
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
          projects: { total: 0, thisMonth: 0 },
          materials: { total: 0, newAdded: 0 },
          equipment: { total: 0, active: 0 },
        };
      },
    });
  }
}
