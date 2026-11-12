import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

/** Location types supported by the company-scoped store master. */
export type StoreLocationType = 'central_warehouse' | 'project_store' | 'site_store' | 'quarantine' | 'in_transit';

export interface StoreLocation {
  id: number;
  company_id: number;
  project_id: number;
  code: string;
  name: string;
  location_type: StoreLocationType;
  status: 'active' | 'inactive';
}

export type StockTransferStatus =
  | 'draft'
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'in_transit'
  | 'partially_received'
  | 'reconciliation_required'
  | 'completed'
  | 'cancelled';

export interface StockTransferLine {
  id: number;
  material_id: number;
  unit_of_measure: string;
  requested_qty: number;
  approved_qty: number | null;
  dispatched: number;
  received_accepted: number;
  received_quarantined: number;
  reversed: number;
  shortage: number;
  outstanding: number;
}

export interface StockTransferDiscrepancy {
  id: number;
  transfer_line_id: number;
  quantity: number;
  reason: string;
  status: 'open' | 'written_off';
  declared_by: number;
}

export interface StockTransfer {
  id: number;
  company_id: number;
  project_id: number;
  transfer_number: string;
  source_location_id: number;
  destination_location_id: number;
  status: StockTransferStatus;
  reason: string | null;
  required_date: string | null;
  requested_by: number;
  submitted_at: string | null;
  approved_by: number | null;
  approved_at: string | null;
  decision_reason: string | null;
  first_dispatched_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancel_reason: string | null;
  createdAt?: string;
  lines: StockTransferLine[];
  discrepancies: StockTransferDiscrepancy[];
  totals: { approved: number; dispatched: number; outstanding: number };
}

export interface StockTransferHistory {
  events: { id: number; event_type: string; actor_id: number | null; createdAt: string; detail: string | null }[];
  movements: { id: number; movement_type: string; quantity: string; location_id: number | null; createdAt: string; transfer_line_id: number | null }[];
}

export interface StockTransferPage {
  rows: StockTransfer[];
  count: number;
  page: number;
  limit: number;
}

export interface CreateTransferPayload {
  source_location_id: number;
  destination_location_id: number;
  reason: string;
  required_date?: string | null;
  lines: { material_id: number; requested_qty: number; unit_of_measure?: string }[];
}

/**
 * Typed client for /api/v1/stock-transfers. All quantities, balances and statuses come from the server;
 * this service never computes stock figures or authorization decisions.
 */
@Injectable({ providedIn: 'root' })
export class StockTransferService {
  private readonly apiUrl = `${environment.serverUrl}/api/v1/stock-transfers`;

  constructor(private http: HttpClient) {}

  listLocations(projectId: number): Observable<{ data: StoreLocation[] }> {
    return this.http.get<{ data: StoreLocation[] }>(`${this.apiUrl}/locations`, {
      params: new HttpParams().set('project_id', String(projectId)),
    });
  }

  createLocation(body: { project_id: number; code: string; name: string; location_type: StoreLocationType }) {
    return this.http.post<{ data: StoreLocation }>(`${this.apiUrl}/locations`, body);
  }

  listTransfers(filters: { projectId?: number; status?: string; page?: number; limit?: number }): Observable<{ data: StockTransferPage }> {
    let params = new HttpParams();
    if (filters.projectId) params = params.set('project_id', String(filters.projectId));
    if (filters.status) params = params.set('status', filters.status);
    if (filters.page) params = params.set('page', String(filters.page));
    if (filters.limit) params = params.set('limit', String(filters.limit));
    return this.http.get<{ data: StockTransferPage }>(this.apiUrl, { params });
  }

  listInTransit(projectId?: number): Observable<{ data: StockTransfer[] }> {
    let params = new HttpParams();
    if (projectId) params = params.set('project_id', String(projectId));
    return this.http.get<{ data: StockTransfer[] }>(`${this.apiUrl}/in-transit`, { params });
  }

  getTransfer(id: number): Observable<{ data: StockTransfer }> {
    return this.http.get<{ data: StockTransfer }>(`${this.apiUrl}/${id}`);
  }

  getHistory(id: number): Observable<{ data: StockTransferHistory }> {
    return this.http.get<{ data: StockTransferHistory }>(`${this.apiUrl}/${id}/history`);
  }

  createTransfer(body: CreateTransferPayload): Observable<{ data: StockTransfer }> {
    return this.http.post<{ data: StockTransfer }>(this.apiUrl, body);
  }

  submit(id: number) {
    return this.http.put<{ data: StockTransfer }>(`${this.apiUrl}/${id}/submit`, {});
  }

  /** override_reason is used only by a Super Admin approving a request they created; the server enforces that. */
  approve(id: number, lines: { line_id: number; approved_qty: number }[], decision_reason?: string, override_reason?: string) {
    return this.http.put<{ data: StockTransfer }>(`${this.apiUrl}/${id}/approve`, { lines, decision_reason, override_reason });
  }

  reject(id: number, reason: string) {
    return this.http.put<{ data: StockTransfer }>(`${this.apiUrl}/${id}/reject`, { reason });
  }

  cancel(id: number, reason: string) {
    return this.http.put<{ data: StockTransfer }>(`${this.apiUrl}/${id}/cancel`, { reason });
  }

  checkOut(id: number, body: { idempotency_key: string; lines: { line_id: number; quantity: number }[]; dispatch_reference?: string }) {
    return this.http.post<{ data: StockTransfer; already_processed: boolean }>(`${this.apiUrl}/${id}/checkout`, body);
  }

  checkIn(
    id: number,
    body: {
      idempotency_key: string;
      quarantine_location_id?: number;
      receipt_reference?: string;
      lines: { line_id: number; accepted_qty: number; quarantined_qty?: number }[];
    }
  ) {
    return this.http.post<{ data: StockTransfer; already_processed: boolean }>(`${this.apiUrl}/${id}/checkin`, body);
  }

  declareShortage(id: number, body: { line_id: number; quantity: number; reason: string }) {
    return this.http.post<{ data: StockTransfer }>(`${this.apiUrl}/${id}/shortages`, body);
  }

  writeOffShortage(discrepancyId: number, body: { reason: string; idempotency_key: string; override_reason?: string }) {
    return this.http.post<{ data: StockTransfer }>(`${this.apiUrl}/shortages/${discrepancyId}/write-off`, body);
  }

  reverseDispatch(id: number, body: { line_id: number; quantity: number; reason: string; idempotency_key: string }) {
    return this.http.post<{ data: StockTransfer }>(`${this.apiUrl}/${id}/reverse`, body);
  }
}
