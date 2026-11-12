import { Injectable } from '@angular/core';

/** Base route of the stock-transfer module (lazy-loaded under /master). */
export const STOCK_TRANSFER_BASE = '/master/stock-transfer';

const STORAGE_KEY = 'zyno.stockTransfer.projectId';

/**
 * Remembers the project chosen on the stock-transfer screens, so moving between pages (or using the
 * sidebar entry, which carries no project ID) keeps the same project. The URL `projectId` stays the source of truth;
 * this only restores it when the URL has none. Session storage is optional: failures are ignored.
 */
@Injectable({ providedIn: 'root' })
export class StockTransferContext {
  read(): number | null {
    try {
      const value = Number(sessionStorage.getItem(STORAGE_KEY));
      return Number.isSafeInteger(value) && value > 0 ? value : null;
    } catch {
      return null;
    }
  }

  write(projectId: number | null): void {
    try {
      if (projectId && Number.isSafeInteger(projectId) && projectId > 0) {
        sessionStorage.setItem(STORAGE_KEY, String(projectId));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage unavailable (private mode, blocked): the URL still carries the project.
    }
  }
}
