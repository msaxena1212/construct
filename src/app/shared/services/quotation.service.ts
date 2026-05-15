import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface QuoteItem {
  materialSku: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vendorId: string | number;
  vendorName: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  createdAt: string;
  salesPerson: string;
  items: QuoteItem[];
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Negotiating' | 'Approved' | 'Rejected';
  vendorFeedback?: string;
  lastUpdated?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
   private baseUrl = `${environment.serverUrl}/api/v1`;
  private getall_material_quotation = `${this.baseUrl}/getall_material_quotation`;
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

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.getall_material_quotation, quote).pipe(
      tap(() => this.loadQuotes())
    );
  }

  getQuoteById(id: string) {
    return this.quotesSubject.value.find(q => q.id === id);
  }

  updateQuoteStatus(id: string, status: Quote['status'], feedback?: string) {
    const updateData = { 
      status, 
      vendorFeedback: feedback,
      lastUpdated: new Date().toLocaleDateString()
    };
    this.http.patch<Quote>(`${this.getall_material_quotation}/${id}`, updateData).subscribe(() => {
      this.loadQuotes();
    });
  }

  deleteQuote(id: string) {
    this.http.delete(`${this.getall_material_quotation}/${id}`).subscribe(() => {
      this.loadQuotes();
    });
  }
}
