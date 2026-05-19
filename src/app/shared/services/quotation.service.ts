import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface QuoteItem {
  materialSku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vendorId: string | number;
  vendor_name: string;
}

export interface Quote {
  id: string;
  quotation_number: string;
  date: string;
  sales_person: string;
  quotation_type: string;
  items: QuoteItem[];
  total_amount: number;
  quantity: number;
  status: 'Draft' | 'Sent' | 'Negotiating' | 'Approved' | 'Rejected';
  vendorFeedback?: string;
  lastUpdated?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private baseUrl = `${environment.serverUrl}/api/v1`;
  private getall_material_quotation = `${this.baseUrl}/getall_quotation`;
  private create_quotation = `${this.baseUrl}/create_quotation`;
  private delete_quotation = `${this.baseUrl}/delete_quotation`;
  private update_approval_quotation_status = `${this.baseUrl}/update_approval_quotation_status`;
  private quotesSubject = new BehaviorSubject<Quote[]>([]);
  quotes$ = this.quotesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadQuotes();
  }

  loadQuotes() {
    this.http.get<Quote[]>(this.getall_material_quotation).subscribe(data => {
      this.quotesSubject.next(data);
    });
  }

  getQuotes() {
    return this.quotesSubject.value;
  }

  addQuote(quote: any): Observable<any> {
    return this.http.post<Quote>(this.create_quotation, quote).pipe(
      tap(() => this.loadQuotes())
    );
  }

  getQuoteById(id: string) {
    return this.quotesSubject.value.find(q => q.id === id);
  }

updateQuoteStatus(
  id: string,
  status: Quote['status'],
  feedback?: string
) {

  const updateData = {
    status,
    vendor_feedback: feedback,
    last_updated: new Date().toLocaleDateString()
  };

  return this.http.post<Quote>(
    `${this.update_approval_quotation_status}/${id}`,
    updateData
  );
}

 deleteQuote(id: string) {

  return this.http.delete(
    `${this.delete_quotation}/${id}`
  );

}
}
