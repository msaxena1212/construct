import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuotationService, Quote } from '../../../shared/services/quotation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotations',
  standalone: false,
  templateUrl: './quotations.html',
  styleUrl: './quotations.scss',
})
export class Quotations {
  private quotationService = inject(QuotationService);
  private toast = inject(ToastrService);

  quotes: Quote[] = [];
  searchQuery = '';
  activeDropdownId: string | null = null;

  // New Modal States
  showViewModal = false;
  showNegotiateModal = false;
  selectedQuote: Quote | null = null;
  negotiationFeedback = '';
  showDeleteModal: boolean = false;
  quoteToDelete: Quote | null = null;

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
      return acc + Number(q.total_amount ?? 0);
    }, 0);
  }

  ngOnInit() {
    this.quotationService.quotes$.subscribe((q: any) => this.quotes = q.data);
    console.log(this.quotes, 'this.quotes');

  }

  get filteredQuotes(): any {
    if (!this.searchQuery) return this.quotes;
    const q = this.searchQuery.toLowerCase();
    return this.quotes.filter((quote: any) =>
      quote.quotation_number.toLowerCase().includes(q) ||
      quote.sales_person.toLowerCase().includes(q)
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

  // activeDropdownId: string | null = null;d


  toggleDropdown(id: string, event: Event): void {
    event.stopPropagation();

    if (this.activeDropdownId === id) {
      this.activeDropdownId = null;
    } else {
      this.activeDropdownId = id;
    }
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
    this.quotationService.loadQuotes();
    this.showNegotiateModal = false;
    this.selectedQuote = null;
  }

  selectQuoteStatus(status: Quote['status']) {
    this.selectedQuote!.status = status;
  }

updateQuoteStatus() {

  if (
    this.selectedQuote &&
    this.selectedQuote.status == 'Draft' 
  ) {
    this.toast.error('Please select a  status.');
    return;
  }
  if (this.selectedQuote) {

    this.quotationService
      .updateQuoteStatus(
        this.selectedQuote.id,
        this.selectedQuote.status,
        this.negotiationFeedback
      )
      .subscribe({
        next: (res: any) => {

          this.toast.success('Quote status updated successfully');

          this.closeNegotiateModal();
        },

        error: (err: any) => {

          this.toast.error(err?.error?.message || 'Failed to update quote status');

          console.error(err);
        }
      });

  }
}

confirmDelete(quote: Quote) {

  this.quotationService
    .deleteQuote(quote.id)
    .subscribe({

      next: () => {

        this.toast.success('Quote deleted successfully');

        this.quotationService.loadQuotes();

        this.closeDropdown();

        this.showDeleteModal = false;
      },

      error: (err:any) => {

        this.toast.error(err?.error?.message || 'Failed to delete quote');

        console.error(err);
      }

    });

}

  openDeleteModal(quote: Quote, event: Event) {
    event.stopPropagation();
    this.quoteToDelete = quote;
    this.showDeleteModal = true;
  }

  downloadPdf(quote: Quote) {
    this.closeDropdown();
    alert(`Generating PDF for ${quote.quotation_number}...`);
    setTimeout(() => {
      alert(`Format completed. ${quote.quotation_number}.pdf has been prepared for download.`);
    }, 1500);
  }


}
