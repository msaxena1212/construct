import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface VendorInvoice {
  id: number;
  vendor_id: number;
  invoice_number: string;
  invoice_date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  grand_total: number;
  status: 'Pending' | 'Paid' | 'Rejected';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class VendorInvoiceService {
  private readonly base = `${environment.serverUrl}/api/v1/vendors`;

  private invoicesSubject = new BehaviorSubject<VendorInvoice[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  invoices$ = this.invoicesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadInvoices(vendorId: string | number): void {
    this.loadingSubject.next(true);
    this.http.get<{ success: boolean; data: VendorInvoice[] }>(
      `${this.base}/${vendorId}/invoices`
    ).subscribe({
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

  createInvoice(vendorId: string | number, payload: {
    invoice_number: string;
    invoice_date: string;
    items: InvoiceItem[];
    subtotal: number;
    tax_rate: number;
    tax_amount: number;
    grand_total: number;
  }): Observable<any> {
    return this.http
      .post<{ success: boolean; data: VendorInvoice }>(
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

  updateStatus(invoiceId: number, status: 'Pending' | 'Paid' | 'Rejected'): Observable<any> {
    return this.http
      .put<any>(`${this.base}/invoices/${invoiceId}/status`, { status })
      .pipe(
        tap((res) => {
          if (res.success) {
            const list = this.invoicesSubject.value.map((inv) =>
              inv.id === invoiceId ? { ...inv, status } : inv
            );
            this.invoicesSubject.next(list);
          }
        })
      );
  }

  deleteInvoice(invoiceId: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/invoices/${invoiceId}`).pipe(
      tap(() => {
        this.invoicesSubject.next(
          this.invoicesSubject.value.filter((inv) => inv.id !== invoiceId)
        );
      })
    );
  }

  clearInvoices(): void {
    this.invoicesSubject.next([]);
  }

  getInvoices(): VendorInvoice[] {
    return this.invoicesSubject.value;
  }
}