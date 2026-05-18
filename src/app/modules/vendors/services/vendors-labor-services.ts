import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LaborWorker {
  id: number;
  vendor_id: number;
  skill: string;
  skillRaw: string;
  status: 'active' | 'on_site' | 'off_duty' | 'inactive';
  statusLabel: string;
  statusColor: string;
  daily_rate: number;
  current_task: string;
}

export interface LaborStats {
  totalPersonnel: number;
  onSite: number;
  remaining: number;
  activePersonnel: number;
  skillCompliance: string;
  skillComposition: { skill: string; count: number }[];
}

export interface LaborResponse {
  success: boolean;
  count: number;
  stats: LaborStats;
  data: LaborWorker[];
}

@Injectable({ providedIn: 'root' })
export class VendorsLaborServices {
  private readonly baseUrl = `${environment.serverUrl}/api/v1/vendors_labor`;

  private workersSubject = new BehaviorSubject<LaborWorker[]>([]);
  private statsSubject = new BehaviorSubject<LaborStats>({
    totalPersonnel: 0, onSite: 0, remaining: 0,
    activePersonnel: 0, skillCompliance: '0%', skillComposition: [],
  });
  private loadingSubject = new BehaviorSubject<boolean>(false);

  workers$ = this.workersSubject.asObservable();
  stats$ = this.statsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadLaborForVendor(vendorId: number | string): void {
    this.loadingSubject.next(true);
    this.http.get<LaborResponse>(`${this.baseUrl}/vendor/${vendorId}`).subscribe({
      next: (res) => {
        if (res.success) {
          this.workersSubject.next(res.data);
          this.statsSubject.next(res.stats);
        }
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('[loadLaborForVendor]', err);
        this.loadingSubject.next(false);
      },
    });
  }

  addWorker(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload).pipe(
      tap((res) => {
        if (res.success) {
          this.workersSubject.next([res.data, ...this.workersSubject.value]);
          this.recalcStats();
        }
      })
    );
  }

  updateWorker(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload).pipe(
      tap((res) => {
        if (res.success) {
          const list = this.workersSubject.value;
          const idx = list.findIndex(w => w.id === id);
          if (idx !== -1) { list[idx] = res.data; this.workersSubject.next([...list]); }
          this.recalcStats();
        }
      })
    );
  }

  deleteWorker(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.workersSubject.next(this.workersSubject.value.filter(w => w.id !== id));
        this.recalcStats();
      })
    );
  }

  clearWorkers(): void {
    this.workersSubject.next([]);
    this.statsSubject.next({
      totalPersonnel: 0, onSite: 0, remaining: 0,
      activePersonnel: 0, skillCompliance: '0%', skillComposition: [],
    });
  }

  private recalcStats(): void {
    const workers = this.workersSubject.value;
    const total = workers.length;
    const onSite = workers.filter(w => w.status === 'on_site').length;
    const active = workers.filter(w => ['active', 'on_site'].includes(w.status)).length;

    const skillMap: Record<string, number> = {};
    workers.forEach(w => { skillMap[w.skill] = (skillMap[w.skill] || 0) + 1; });

    this.statsSubject.next({
      totalPersonnel: total,
      onSite,
      remaining: total - onSite,
      activePersonnel: active,
      skillCompliance: total > 0 ? `${Math.round((active / total) * 100)}%` : '0%',
      skillComposition: Object.entries(skillMap).map(([skill, count]) => ({ skill, count })),
    });
  }
}