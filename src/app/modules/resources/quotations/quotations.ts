import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuotationService, Quote } from '../../../shared/services/quotation.service';

@Component({
  selector: 'app-quotations',
  standalone: false,
  templateUrl: './quotations.html',
  styleUrl: './quotations.scss',
})
export class Quotations {
 private quotationService = inject(QuotationService);

  quotes: Quote[] = [];
  searchQuery = '';
  activeDropdownId: string | null = null;

  // New Modal States
  showViewModal = false;
  showNegotiateModal = false;
  selectedQuote: Quote | null = null;
  negotiationFeedback = '';

  get draftQuotesCount() {
    return this.quotes?.filter(q => q?.status === 'Draft').length;
  }

  get approvedQuotesCount() {
    return this.quotes?.filter(q => q?.status === 'Approved').length;
  }

get totalValue(): number {
  if (!this.quotes || !this.quotes.length) {
    return 0;
  }

  return this.quotes.reduce((acc, q) => {
    return acc + Number(q.total_cost ?? 0);
  }, 0);
}

  ngOnInit() {
    this.quotationService.quotes$.subscribe((q:any) => this.quotes = q.data);
  }

  get filteredQuotes(): any {
    if (!this.searchQuery) return this.quotes;
    const q = this.searchQuery.toLowerCase();
    return this.quotes.filter((quote:any) => 
      quote.quotation_number.toLowerCase().includes(q) || 
      quote.vendor_name.toLowerCase().includes(q)
    );
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Draft': return 'bg-slate-100 text-slate-600';
      case 'Sent': return 'bg-blue-100 text-blue-700';
      case 'Negotiating': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  }

  // toggleDropdown(quoteId: string, event: Event) {
  //   event.stopPropagation();
  //   this.activeDropdownId = this.activeDropdownId === quoteId ? null : quoteId;
  // }

  // activeDropdownId: string | null = null;

toggleDropdown(id: string,qtn: string) {
  this.activeDropdownId =
    this.activeDropdownId == qtn ? null : id;

    console.log(this.activeDropdownId,qtn,'this.activeDropdownId');
    
}

  closeDropdown() {
    this.activeDropdownId = null;
  }

  // --- Actions ---

  openViewModal(quote: Quote) {
    this.selectedQuote = quote;
    this.showViewModal = true;
    this.closeDropdown();
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedQuote = null;
  }

  openNegotiateModal(quote: Quote) {
    this.selectedQuote = quote;
    this.negotiationFeedback = quote.vendorFeedback || '';
    this.showNegotiateModal = true;
    this.closeDropdown();
  }

  closeNegotiateModal() {
    this.showNegotiateModal = false;
    this.selectedQuote = null;
  }

  updateQuoteStatus(status: Quote['status']) {
    if (this.selectedQuote) {
      this.quotationService.updateQuoteStatus(this.selectedQuote.id, status, this.negotiationFeedback);
      this.closeNegotiateModal();
      alert(`Quote ${this.selectedQuote.quotation_number} status updated to ${status}.`);
    }
  }

  handleDelete(quote: Quote) {
    if (confirm(`Are you sure you want to delete quotation ${quote.quotation_number}?`)) {
      this.quotationService.deleteQuote(quote.id);
      this.closeDropdown();
    }
  }

  downloadPdf(quote: Quote) {
    this.closeDropdown();
    alert(`Generating PDF for ${quote.quotation_number}...`);
    setTimeout(() => {
      alert(`Format completed. ${quote.quotation_number}.pdf has been prepared for download.`);
    }, 1500);
  }

  
}
