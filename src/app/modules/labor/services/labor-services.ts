import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface ContractorMetric {
  id: number;
  vendor_id: number;
  name: string;
  logo?: string;
  efficiency: number;
  safetyScore: number;
  retentionRate: number;
  adherenceToSchedule: number;
  personnel: number;
  tasks: string;
  trend: 'up' | 'down' | 'stable';
}

export interface SkillDistribution {
  name: string;
  count: number;
  color: string;
}

export interface Financials {
  earnedValue: number;
  actualCost: number;
  cpi: number;
  phase?: string;
  budgetWarning: boolean;
}

export interface LaborStats {
  totalPersonnel: number;
  activeCrews: number;
  skillCompliance: number;
  overtimeAlerts: number;
  skillsDistribution: SkillDistribution[];
  financials: Financials | null;
}

export interface WorkerActivity {
  label: string;
  type: 'primary' | 'secondary' | 'solid';
  left: string;
  width: string;
}

export interface ShiftWorker {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
  statusClass: string;
  vendorName?: string;
  activities: WorkerActivity[];
}

export interface Vendor {
  id: number;
  name: string;
  logo: string;
}

export interface LaborWorker {
  company_id: number;
  vendor_id?: number;
  name: string;
  role?: string;
  avatar_url?: string;
  status?: string;
  skill_category?: string;
  efficiency?: number;
  safety_score?: number;
  retention_rate?: number;
  adherence_to_schedule?: number;
  tasks_completed?: number;
  tasks_total?: number;
  trend?: string;
  earned_value?: number;
  actual_cost?: number;
  is_overtime?: boolean;
  activity_label?: string;
  activity_type?: string;
  activity_left?: string;
  activity_width?: string;
  activity_label_2?: string;
  activity_type_2?: string;
  activity_left_2?: string;
  activity_width_2?: string;
  work_date?: string;
}

interface ApiRes<T> { success: boolean; data: T; message?: string; }

@Injectable({ providedIn: 'root' })
export class LaborServices {
  private http = inject(HttpClient);

  private readonly BASE = `${environment.serverUrl}/api/v1/labor`;

  private contractorsSubject = new BehaviorSubject<ContractorMetric[]>([]);
  private laborStatsSubject = new BehaviorSubject<LaborStats | null>(null);
  private shiftActivitySubject = new BehaviorSubject<ShiftWorker[]>([]);
  private heatmapSubject = new BehaviorSubject<number[][]>([]);
  private vendorsSubject = new BehaviorSubject<Vendor[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);


  contractors$ = this.contractorsSubject.asObservable();
  laborStats$ = this.laborStatsSubject.asObservable();
  shiftActivity$ = this.shiftActivitySubject.asObservable();
  heatmap$ = this.heatmapSubject.asObservable();
  vendors$ = this.vendorsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();


  loadDashboard(companyId: number, vendorId?: number): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    let params = new HttpParams().set('company_id', companyId);
    if (vendorId) params = params.set('vendor_id', vendorId);

    this.http
      .get<ApiRes<any>>(`${this.BASE}/dashboard`, { params })
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: res => {
          if (res.success) {
            this.contractorsSubject.next(res.data.contractors ?? []);
            this.laborStatsSubject.next(res.data.stats ?? null);
            this.heatmapSubject.next(res.data.heatmap ?? []);
            this.shiftActivitySubject.next(res.data.shiftActivity ?? []);
            this.vendorsSubject.next(res.data.vendors ?? []);
          } else {
            this.errorSubject.next(res.message || 'Data load nahi hua');
          }
        },
        error: err => {
          this.errorSubject.next(
            err?.error?.message
          );
        },
      });
  }

  filterByVendor(companyId: number, vendorId?: number): void {
    let params = new HttpParams().set('company_id', companyId);
    if (vendorId) params = params.set('vendor_id', vendorId);

    this.http
      .get<ApiRes<ContractorMetric[]>>(`${this.BASE}/contractor-metrics`, { params })
      .subscribe({
        next: r => this.contractorsSubject.next(r.data ?? []),
        error: () => this.contractorsSubject.next([]),
      });

    this.http
      .get<ApiRes<ShiftWorker[]>>(`${this.BASE}/shift-activity`, { params })
      .subscribe({
        next: r => this.shiftActivitySubject.next(r.data ?? []),
        error: () => this.shiftActivitySubject.next([]),
      });
  }

  addWorker(worker: LaborWorker): Observable<any> {
    return this.http
      .post<ApiRes<any>>(`${this.BASE}`, worker)
      .pipe(
        map(r => r.data),
        tap(() => this.loadDashboard(worker.company_id))
      );
  }

  updateWorker(id: string, companyId: number, updates: Partial<LaborWorker>): Observable<void> {
    return this.http
      .patch<ApiRes<void>>(`${this.BASE}/${id}`, { ...updates, company_id: companyId })
      .pipe(
        map(() => void 0),
        tap(() => this.loadDashboard(companyId))
      );
  }

  deleteWorker(id: string, companyId: number): Observable<void> {
    return this.http
      .delete<ApiRes<void>>(`${this.BASE}/${id}?company_id=${companyId}`)
      .pipe(
        map(() => void 0),
        tap(() => this.loadDashboard(companyId))
      );
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}