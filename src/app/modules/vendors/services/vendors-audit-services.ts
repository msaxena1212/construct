import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface VendorAudit {
  id: number;
  vendor_id: number;
  quality: number;
  timeliness: number;
  safety: number;
  composite_score: number;
  observations: string | null;
  audit_date: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class VendorAuditService {
  private readonly base = `${environment.serverUrl}/api/v1/vendors`;

  private auditsSubject = new BehaviorSubject<VendorAudit[]>([]);
  private savingSubject = new BehaviorSubject<boolean>(false);

  audits$ = this.auditsSubject.asObservable();
  saving$ = this.savingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadAudits(vendorId: string | number): void {
    this.http.get<{ success: boolean; data: VendorAudit[] }>(
      `${this.base}/${vendorId}/audits`
    ).subscribe({
      next: (res) => {
        if (res.success) this.auditsSubject.next(res.data);
      },
      error: (err) => console.error('[VendorAuditService.loadAudits]', err),
    });
  }

  createAudit(vendorId: string | number, payload: {
    quality: number;
    timeliness: number;
    safety: number;
    observations?: string;
  }): Observable<any> {
    this.savingSubject.next(true);
    return this.http
      .post<{ success: boolean; data: VendorAudit }>(
        `${this.base}/${vendorId}/audits`,
        payload
      )
      .pipe(
        tap({
          next: (res) => {
            if (res.success) {
              this.auditsSubject.next([res.data, ...this.auditsSubject.value]);
            }
            this.savingSubject.next(false);
          },
          error: () => this.savingSubject.next(false),
        })
      );
  }

  clearAudits(): void {
    this.auditsSubject.next([]);
  }

  getLatestScore(): number | null {
    const audits = this.auditsSubject.value;
    return audits.length > 0 ? Number(audits[0].composite_score) : null;
  }
}