import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface BudgetInfo {
  allocated: number;
  totalInvoiced: number;
  exceeded: boolean;
  exceededBy: number;
}

export interface InvoiceItem {
  type: string;
  description: string;
  quantity: number;
  hours?: number;
  unitPrice: number;
  gst: number;
  baseAmount: number;
  gstAmount: number;
  total: number;
}

export interface PaymentHistoryEntry {
  amount: number;
  mode: string;
  reference: string | null;
  clearance_date: string | null;
  paid_at: string;
}

export interface VendorInvoice {
  id: number;
  project_id?: number;
  vendor_id: number;
  invoice_number: string;
  invoice_date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  grand_total: number;
  status: 'Pending' | 'Paid' | 'Cancelled' | 'Partially Paid';

  settlement_type?: 'work_poc' | 'milestone' | 'lumpsum' | null;
  settlement_completion?: number | null;
  milestone_ids?: number[];
  sub_milestone_ids?: number[];
  task_ids?: number[];
  payment_mode?: string | null;
  payment_reference?: string | null;
  cheque_clearance_date?: string | null;
  paid_amount?: number | null;
  paid_at?: string | null;
  payment_history?: PaymentHistoryEntry[];
  createdAt: string;
}

export interface PaymentPayload {
  status: 'Paid' | 'Cancelled' | 'Pending' | 'Partially Paid';

  amount?: number;
  mode?: string;
  reference?: string;
  clearance_date?: string;

  settlement_type?: 'work_poc' | 'milestone' | 'lumpsum';
  settlement_completion?: number | null;
  milestone_ids?: number[];
  sub_milestone_ids?: number[];
  task_ids?: number[];
}

@Injectable({ providedIn: 'root' })
export class VendorInvoiceService {
  private readonly base = `${environment.serverUrl}/api/v1/vendors`;

  private invoicesSubject = new BehaviorSubject<VendorInvoice[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private currentVendorId: string | number | null = null;

  invoices$ = this.invoicesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadInvoices(vendorId: string | number): void {
    this.currentVendorId = vendorId;
    this.loadingSubject.next(true);
    this.http
      .get<{ success: boolean; data: VendorInvoice[] }>(
        `${this.base}/${vendorId}/invoices`
      )
      .subscribe({
        next: (res) => {
          if (res.success) this.invoicesSubject.next(res.data);
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('[VendorInvoiceService.loadInvoices]', err);
          this.loadingSubject.next(false);
        },
      });
  }

  createInvoice(
    vendorId: string | number,
    payload: {
      project_id?: number | null;
      invoice_number: string;
      invoice_date: string;
      items: InvoiceItem[];
      subtotal: number;
      tax_rate: number;
      tax_amount: number;
      grand_total: number;
    }
  ): Observable<{ success: boolean; data: VendorInvoice; budget?: BudgetInfo }> {
  return this.http
    .post<{ success: boolean; data: VendorInvoice; budget?: BudgetInfo }>(
      `${this.base}/${vendorId}/invoices`,
      payload
    )
    .pipe(
      tap((res) => {
        if (res.success) {
          this.invoicesSubject.next([res.data, ...this.invoicesSubject.value]);
        }
      })
    );
}

updateStatus(
  invoiceId: number,
  payload: PaymentPayload
): Observable<{ success: boolean; data: VendorInvoice; budget?: BudgetInfo }> {
  const vendorId = this.currentVendorId;
  if (!vendorId) throw new Error('Vendor ID not set. Call loadInvoices() first.');

  return this.http
    .put<{ success: boolean; data: VendorInvoice; budget?: BudgetInfo }>(
      `${this.base}/${vendorId}/invoices/${invoiceId}/status`,
      payload
    )
    .pipe(
      tap((res) => {
        if (res.success) {
          const list = this.invoicesSubject.value.map((inv) =>
            inv.id === invoiceId ? { ...inv, ...res.data } : inv
          );
          this.invoicesSubject.next(list);
        }
      })
    );
}

  deleteInvoice(invoiceId: number): Observable<any> {
    const vendorId = this.currentVendorId;
    return this.http
      .delete<any>(`${this.base}/${vendorId}/invoices/${invoiceId}`)
      .pipe(
        tap(() => {
          this.invoicesSubject.next(
            this.invoicesSubject.value.filter((inv) => inv.id !== invoiceId)
          );
        })
      );
  }

  clearInvoices(): void {
    this.invoicesSubject.next([]);
    this.currentVendorId = null;
  }

  getInvoices(): VendorInvoice[] {
    return this.invoicesSubject.value;
  }
}