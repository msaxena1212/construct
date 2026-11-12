import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  __spreadValues,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-23RKHPSU.js";

// src/app/modules/vendors/services/vendors-labor-services.ts
var VendorsLaborServices = class _VendorsLaborServices {
  http;
  baseUrl = `${environment.serverUrl}/api/v1/vendors_labor`;
  workersSubject = new BehaviorSubject([]);
  statsSubject = new BehaviorSubject({
    totalPersonnel: 0,
    onSite: 0,
    remaining: 0,
    activePersonnel: 0,
    skillCompliance: "0%",
    skillComposition: []
  });
  loadingSubject = new BehaviorSubject(false);
  workers$ = this.workersSubject.asObservable();
  stats$ = this.statsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadLaborForVendor(vendorId) {
    this.loadingSubject.next(true);
    this.http.get(`${this.baseUrl}/vendor/${vendorId}`).subscribe({
      next: (res) => {
        if (res.success) {
          this.workersSubject.next(res.data);
          this.statsSubject.next(res.stats);
        }
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error("[loadLaborForVendor]", err);
        this.loadingSubject.next(false);
      }
    });
  }
  addWorker(payload) {
    return this.http.post(this.baseUrl, payload).pipe(tap((res) => {
      if (res.success) {
        this.workersSubject.next([res.data, ...this.workersSubject.value]);
        this.recalcStats();
      }
    }));
  }
  updateWorker(id, payload) {
    return this.http.put(`${this.baseUrl}/${id}`, payload).pipe(tap((res) => {
      if (res.success) {
        const list = this.workersSubject.value;
        const idx = list.findIndex((w) => w.id === id);
        if (idx !== -1) {
          list[idx] = __spreadValues(__spreadValues({}, list[idx]), res.data);
          this.workersSubject.next([...list]);
        }
        this.recalcStats();
      }
    }));
  }
  deleteWorker(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(tap(() => {
      this.workersSubject.next(this.workersSubject.value.filter((w) => w.id !== id));
      this.recalcStats();
    }));
  }
  clearWorkers() {
    this.workersSubject.next([]);
    this.statsSubject.next({
      totalPersonnel: 0,
      onSite: 0,
      remaining: 0,
      activePersonnel: 0,
      skillCompliance: "0%",
      skillComposition: []
    });
  }
  recalcStats() {
    const workers = this.workersSubject.value;
    const total = workers.reduce((s, w) => s + (w.labor_count || 0), 0);
    const onSite = workers.filter((w) => w.status === "on_site").reduce((s, w) => s + (w.labor_count || 0), 0);
    const active = workers.filter((w) => ["active", "on_site"].includes(w.status)).reduce((s, w) => s + (w.labor_count || 0), 0);
    const skillMap = {};
    workers.forEach((w) => {
      skillMap[w.skill] = (skillMap[w.skill] || 0) + (w.labor_count || 0);
    });
    this.statsSubject.next({
      totalPersonnel: total,
      onSite,
      remaining: total - onSite,
      activePersonnel: active,
      skillCompliance: total > 0 ? `${Math.round(active / total * 100)}%` : "0%",
      skillComposition: Object.entries(skillMap).map(([skill, count]) => ({ skill, count }))
    });
  }
  static \u0275fac = function VendorsLaborServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsLaborServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VendorsLaborServices, factory: _VendorsLaborServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsLaborServices, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/vendors/services/vendors-invoice-services.ts
var VendorInvoiceService = class _VendorInvoiceService {
  http;
  base = `${environment.serverUrl}/api/v1/vendors`;
  invoicesSubject = new BehaviorSubject([]);
  loadingSubject = new BehaviorSubject(false);
  currentVendorId = null;
  invoices$ = this.invoicesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadInvoices(vendorId) {
    this.currentVendorId = vendorId;
    this.loadingSubject.next(true);
    this.http.get(`${this.base}/${vendorId}/invoices`).subscribe({
      next: (res) => {
        if (res.success)
          this.invoicesSubject.next(res.data);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error("[VendorInvoiceService.loadInvoices]", err);
        this.loadingSubject.next(false);
      }
    });
  }
  createInvoice(vendorId, payload) {
    return this.http.post(`${this.base}/${vendorId}/invoices`, payload).pipe(tap((res) => {
      if (res.success) {
        this.invoicesSubject.next([res.data, ...this.invoicesSubject.value]);
      }
    }));
  }
  updateStatus(invoiceId, payload) {
    const vendorId = this.currentVendorId;
    if (!vendorId)
      return throwError(() => new Error("Vendor ID not set."));
    return this.http.put(`${this.base}/${vendorId}/invoices/${invoiceId}/status`, payload).pipe(tap((res) => {
      if (res.success) {
        const list = this.invoicesSubject.value.map((inv) => inv.id === invoiceId ? __spreadValues(__spreadValues({}, inv), res.data) : inv);
        this.invoicesSubject.next(list);
      }
    }));
  }
  deleteInvoice(invoiceId) {
    const vendorId = this.currentVendorId;
    return this.http.delete(`${this.base}/${vendorId}/invoices/${invoiceId}`).pipe(tap(() => {
      this.invoicesSubject.next(this.invoicesSubject.value.filter((inv) => inv.id !== invoiceId));
    }));
  }
  clearInvoices() {
    this.invoicesSubject.next([]);
    this.currentVendorId = null;
  }
  getInvoices() {
    return this.invoicesSubject.value;
  }
  raisePaymentRequest(vendorId, invoiceId, payload) {
    return this.http.post(`${this.base}/${vendorId}/invoices/${invoiceId}/payment-requests`, payload);
  }
  static \u0275fac = function VendorInvoiceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorInvoiceService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VendorInvoiceService, factory: _VendorInvoiceService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorInvoiceService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/vendors/services/vendors-audit-services.ts
var VendorAuditService = class _VendorAuditService {
  http;
  base = `${environment.serverUrl}/api/v1/vendors`;
  auditsSubject = new BehaviorSubject([]);
  savingSubject = new BehaviorSubject(false);
  audits$ = this.auditsSubject.asObservable();
  saving$ = this.savingSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadAudits(vendorId) {
    this.http.get(`${this.base}/${vendorId}/audits`).subscribe({
      next: (res) => {
        if (res.success)
          this.auditsSubject.next(res.data);
      },
      error: (err) => console.error("[VendorAuditService.loadAudits]", err)
    });
  }
  createAudit(vendorId, payload) {
    this.savingSubject.next(true);
    return this.http.post(`${this.base}/${vendorId}/audits`, payload).pipe(tap({
      next: (res) => {
        if (res.success) {
          this.auditsSubject.next([res.data, ...this.auditsSubject.value]);
        }
        this.savingSubject.next(false);
      },
      error: () => this.savingSubject.next(false)
    }));
  }
  clearAudits() {
    this.auditsSubject.next([]);
  }
  getLatestScore() {
    const audits = this.auditsSubject.value;
    return audits.length > 0 ? Number(audits[0].composite_score) : null;
  }
  static \u0275fac = function VendorAuditService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorAuditService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VendorAuditService, factory: _VendorAuditService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorAuditService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  VendorsLaborServices,
  VendorInvoiceService,
  VendorAuditService
};
//# sourceMappingURL=chunk-N77CZUWI.js.map
