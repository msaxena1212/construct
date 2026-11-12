import { Component, Input, OnChanges } from '@angular/core';
import { STOCK_TRANSFER_BASE } from '../../../shared/services/stock-transfer/stock-transfer-context';

export type StockTransferSection = 'inventory' | 'register' | 'in-transit' | 'approvals' | 'new' | 'detail';

/**
 * Shared header for every stock-transfer screen: an explicit Back link (a router destination, not browser history)
 * and the section tabs. Every link carries the current project; with no project selected, no project ID is generated.
 */
@Component({
  selector: 'app-stock-transfer-nav',
  standalone: false,
  templateUrl: './stock-transfer-nav.html',
  styleUrl: './stock-transfer-nav.scss',
})
export class StockTransferNav implements OnChanges {
  @Input() active: StockTransferSection = 'register';
  @Input() projectId: number | null = null;
  /** Where the Back button goes. */
  @Input() backTo: 'register' | 'inventory' = 'register';
  @Input() backLabel = 'Back to Stock Transfers';

  readonly base = STOCK_TRANSFER_BASE;

  /**
   * Computed once per input change. A getter would return a new object on every change-detection pass,
   * which the router-link bindings treat as an endless update (NG0103).
   */
  query: Record<string, number> = {};
  newQuery: Record<string, number | string> = {};
  backPath = STOCK_TRANSFER_BASE;

  ngOnChanges(): void {
    this.query = this.projectId ? { projectId: this.projectId } : {};
    this.newQuery = { ...this.query, action: 'new' };
    this.backPath = this.backTo === 'inventory' ? `${this.base}/inventory` : this.base;
  }
}
