import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

export interface ContractorMetric {
  id: string;
  name: string;
  efficiency: number;
  safetyScore: number;
  retentionRate: number;
  adherenceToSchedule: number;
  personnel: number;
  tasks: string;
  logo?: string;
  trend: 'up' | 'down' | 'stable';
}

export interface LaborStats {
  activeCrews: number;
  totalPersonnel: number;
  skillCompliance: number;
  overtimeAlerts: number;
  skillsDistribution: { name: string; count: number; color: string }[];
  financials: {
    earnedValue: number;
    actualCost: number;
    cpi: number;
  };
}

export interface ReportVaultItem {
  id: string;
  title: string;
  type: 'Technical' | 'Financial' | 'Safety' | 'Quality' | 'Milestone';
  date: string;
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
  fileSize: string;
}

@Injectable({
  providedIn: 'root',
})
export class LaborServices {
  private http = inject(HttpClient);

  private contractorsSubject = new BehaviorSubject<ContractorMetric[]>([]);
  private laborStatsSubject = new BehaviorSubject<LaborStats | null>(null);
  private reportVaultSubject = new BehaviorSubject<ReportVaultItem[]>([]);

  contractors$ = this.contractorsSubject.asObservable();
  laborStats$ = this.laborStatsSubject.asObservable();
  reportVault$ = this.reportVaultSubject.asObservable();

  constructor() {
    this.refreshAll();
  }

  refreshAll() {

    this.http.get<ContractorMetric[]>('http://localhost:3000/api/contractor-metrics').subscribe({
      next: (c) => this.contractorsSubject.next(c),
      error: () => this.populateMocks()
    });

    this.http.get<LaborStats>('http://localhost:3000/api/labor-stats').subscribe(s => this.laborStatsSubject.next(s));
    this.http.get<ReportVaultItem[]>('http://localhost:3000/api/reports').subscribe(v => this.reportVaultSubject.next(v));
  }

  private populateMocks() {

    const mockContractors: ContractorMetric[] = [
      { id: 'c1', name: 'Apex Concrete Solutions', efficiency: 94.8, safetyScore: 98.2, retentionRate: 92, adherenceToSchedule: 96, personnel: 12, tasks: '28/30', logo: 'https://ui-avatars.com/api/?name=Apex+Concrete', trend: 'up' },
      { id: 'c2', name: 'Vanguard Electrical', efficiency: 88.2, safetyScore: 95.0, retentionRate: 85, adherenceToSchedule: 82, personnel: 8, tasks: '15/17', logo: 'https://ui-avatars.com/api/?name=Vanguard+Electrical', trend: 'stable' },
      { id: 'c3', name: 'Horizon Steelworks', efficiency: 76.5, safetyScore: 82.4, retentionRate: 70, adherenceToSchedule: 65, personnel: 24, tasks: '42/55', logo: 'https://ui-avatars.com/api/?name=Horizon+Steel', trend: 'down' },
      { id: 'c4', name: 'Pure Water Plumbing', efficiency: 91.0, safetyScore: 99.0, retentionRate: 95, adherenceToSchedule: 92, personnel: 6, tasks: '12/12', logo: 'https://ui-avatars.com/api/?name=Pure+Water', trend: 'up' }
    ];
    this.contractorsSubject.next(mockContractors);

    const mockStats: LaborStats = {
      activeCrews: 42,
      totalPersonnel: 156,
      skillCompliance: 94.5,
      overtimeAlerts: 3,
      skillsDistribution: [
        { name: 'Masonry', count: 45, color: '#3b82f6' },
        { name: 'Electrical', count: 28, color: '#f59e0b' },
        { name: 'Structural Steel', count: 35, color: '#ef4444' },
        { name: 'Plumbing', count: 22, color: '#10b981' },
        { name: 'Foremen', count: 12, color: '#6366f1' },
        { name: 'Safety Officers', count: 14, color: '#ec4899' }
      ],
      financials: {
        earnedValue: 845000,
        actualCost: 912000,
        cpi: 0.93
      }
    };
    this.laborStatsSubject.next(mockStats);

    const mockVault: ReportVaultItem[] = [
      { id: 'r1', title: 'Site Safety Audit - Week 31', type: 'Safety', date: 'Apr 05, 2026', author: 'Dave Safety', status: 'Published', fileSize: '2.4 MB' },
      { id: 'r2', title: 'Q1 Financial Performance', type: 'Financial', date: 'Apr 02, 2026', author: 'Michael Park', status: 'Published', fileSize: '4.1 MB' },
      { id: 'r3', title: 'North Wing Structural Review', type: 'Technical', date: 'Mar 28, 2026', author: 'Sarah Miller', status: 'Archived', fileSize: '12.8 MB' },
      { id: 'r4', title: 'Monthly Progress Summary - March', type: 'Milestone', date: 'Mar 31, 2026', author: 'James Wilson', status: 'Published', fileSize: '1.2 MB' },
      { id: 'r5', title: 'Weekly Material Audit - W32', type: 'Technical', date: 'Apr 12, 2026', author: 'Logistics Team', status: 'Draft', fileSize: '850 KB' }
    ];
    this.reportVaultSubject.next(mockVault);
  }

  generateReport(title: string, type: any): Observable<ReportVaultItem> {
    const newReport: ReportVaultItem = {
      id: `r${Math.random().toString(36).substr(2, 9)}`,
      title,
      type,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Current User',
      status: 'Draft',
      fileSize: '0 KB'
    };

    this.reportVaultSubject.next([newReport, ...this.reportVaultSubject.value]);
    return of(newReport);
  }
}

