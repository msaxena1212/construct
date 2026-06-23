import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface VendorHistoryEvent {
  id: number;
  company_id: number;
  vendor_id: number;
  project_id: number | null;
  entity_type: 'vendor' | 'invoice' | 'labor' | 'audit';
  entity_id: number | null;
  action: 'created' | 'updated' | 'deleted' | 'status_changed' | 'payment_added';
  changed_by: number | null;
  changed_by_name: string | null;
  description: string;
  old_values: any;
  new_values: any;
  meta: any;
  createdAt: string;
}

export interface VendorHistoryResponse {
  success: boolean;
  total: number;
  limit: number;
  offset: number;
  data: VendorHistoryEvent[];
}

export interface VendorHistorySummaryRow {
  entity_type: string;
  action: string;
  count: string | number;
}

export interface VendorHistorySummaryResponse {
  success: boolean;
  data: VendorHistorySummaryRow[];
}

export interface VendorHistoryQueryParams {
  entity_type?: 'vendor' | 'invoice' | 'labor' | 'audit';
  action?: 'created' | 'updated' | 'deleted' | 'status_changed' | 'payment_added';
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

@Injectable({ providedIn: 'root' })
export class VendorsHistoryServices {

  private readonly base = `${environment.serverUrl}/api/v1/vendors`;

  private historySubject = new BehaviorSubject<VendorHistoryEvent[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  history$ = this.historySubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  getVendorHistory(
    vendorId: string | number,
    params?: VendorHistoryQueryParams
  ): Observable<VendorHistoryResponse> {
    let httpParams: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams[key] = String(value);
        }
      });
    }
    return this.http.get<VendorHistoryResponse>(
      `${this.base}/${vendorId}/history`,
      { params: httpParams }
    );
  }

  getVendorHistorySummary(vendorId: string | number): Observable<VendorHistorySummaryResponse> {
    return this.http.get<VendorHistorySummaryResponse>(
      `${this.base}/${vendorId}/history/summary`
    );
  }

  loadVendorHistory(vendorId: string | number, params?: VendorHistoryQueryParams): void {
    this.loadingSubject.next(true);
    this.getVendorHistory(vendorId, params).subscribe({
      next: (res) => {
        if (res.success) this.historySubject.next(res.data);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('[VendorsHistoryServices.loadVendorHistory]', err);
        this.loadingSubject.next(false);
      },
    });
  }

  clearHistory(): void {
    this.historySubject.next([]);
  }

  getHistory(): VendorHistoryEvent[] {
    return this.historySubject.value;
  }
}