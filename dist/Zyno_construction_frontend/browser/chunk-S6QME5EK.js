import {
  ProjectService
} from "./chunk-VBCWJQVV.js";
import {
  SkillMasterServices
} from "./chunk-R26N3MCA.js";
import {
  VendorsServices
} from "./chunk-PVCBN2NP.js";
import {
  CommonDialogComponent
} from "./chunk-WS53KIOQ.js";
import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  PatternValidator,
  RangeValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-WFU7JF4C.js";
import {
  ActivatedRoute,
  BehaviorSubject,
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  HttpClient,
  Injectable,
  Input,
  NgClass,
  NgModule,
  Pipe,
  Router,
  RouterModule,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-F27QM527.js";

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
          list[idx] = res.data;
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
  updateStatus(invoiceId, status) {
    const vendorId = this.currentVendorId;
    if (!vendorId) {
      throw new Error("Vendor ID not set. Call loadInvoices() first.");
    }
    return this.http.put(`${this.base}/${vendorId}/invoices/${invoiceId}/status`, { status }).pipe(tap((res) => {
      if (res.success) {
        const list = this.invoicesSubject.value.map((inv) => inv.id === invoiceId ? __spreadProps(__spreadValues({}, inv), { status }) : inv);
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

// src/app/modules/vendors/vendors.ts
var _c0 = () => [];
var _c1 = (a0) => ({ "bg-blue-600 text-white border-blue-600": a0 });
var _c2 = (a0) => ({ "border-blue-500 bg-blue-50": a0 });
var _c3 = (a0, a1, a2) => ({ "bg-primary text-white shadow-md shadow-primary/30": a0, "bg-primary/80 text-white": a1, "bg-slate-200 text-slate-600": a2 });
var _forTrack0 = ($index, $item) => $item.num;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.value;
var _forTrack3 = ($index, $item) => $item.name;
var _forTrack4 = ($index, $item) => $item.rate;
function Vendors_Conditional_1_For_33_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 193);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const svc_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(svc_r5);
  }
}
function Vendors_Conditional_1_For_33_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 193);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", v_r4.skill.length - 3);
  }
}
function Vendors_Conditional_1_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 183);
    \u0275\u0275listener("click", function Vendors_Conditional_1_For_33_Template_div_click_0_listener() {
      const v_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openVendorDetail(v_r4));
    });
    \u0275\u0275elementStart(1, "div", 184)(2, "span", 185);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 186)(5, "div", 187)(6, "span", 188);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "h3", 189);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 190);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 3)(14, "div", 191)(15, "span", 43);
    \u0275\u0275text(16, "mail");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 191)(19, "span", 43);
    \u0275\u0275text(20, "call");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 192);
    \u0275\u0275repeaterCreate(23, Vendors_Conditional_1_For_33_For_24_Template, 2, 1, "span", 193, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(25, Vendors_Conditional_1_For_33_Conditional_25_Template, 2, 1, "span", 193);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 194)(27, "div")(28, "p", 195);
    \u0275\u0275text(29, "Compliance Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 196);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 197)(33, "span", 198);
    \u0275\u0275text(34, "arrow_forward");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const v_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", v_r4.statusColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r4.status);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(v_r4.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r4.type);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", v_r4.email, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", v_r4.phone, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(v_r4.skill.slice(0, 3));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(v_r4.skill.length > 3 ? 25 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("text-green-600", v_r4.compliance_score >= 90)("text-amber-600", v_r4.compliance_score < 90 && v_r4.compliance_score >= 70)("text-error", v_r4.compliance_score < 70);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r4.compliance_score, "% ");
  }
}
function Vendors_Conditional_1_ForEmpty_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 175)(1, "span", 199);
    \u0275\u0275text(2, "storefront");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 200);
    \u0275\u0275text(4, "No vendors found. Add your first vendor to get started.");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_1_For_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 181)(1, "div", 201)(2, "span", 202);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 203)(5, "p", 204);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 205);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 206);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const act_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", act_r6.iconColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(act_r6.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(act_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(act_r6.desc);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(act_r6.time);
  }
}
function Vendors_Conditional_1_ForEmpty_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 182);
    \u0275\u0275text(1, "No recent activity.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 159)(1, "div", 111)(2, "h2", 160);
    \u0275\u0275text(3, "Vendors & Partners");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 161);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 162);
    \u0275\u0275listener("click", function Vendors_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAddModal());
    });
    \u0275\u0275element(7, "div", 163);
    \u0275\u0275elementStart(8, "div", 164)(9, "span", 85);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd()();
    \u0275\u0275text(11, " Add New Vendor ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 165)(13, "div", 166)(14, "p", 167);
    \u0275\u0275text(15, "Total Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 168);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "div", 169);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 166)(20, "p", 167);
    \u0275\u0275text(21, "Pending Payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 170);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "div", 171);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 166)(26, "p", 167);
    \u0275\u0275text(27, "Compliant Partners");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 168);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "div", 172);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 173);
    \u0275\u0275repeaterCreate(32, Vendors_Conditional_1_For_33_Template, 35, 15, "div", 174, _forTrack1, false, Vendors_Conditional_1_ForEmpty_34_Template, 5, 0, "div", 175);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 176)(36, "div", 177)(37, "h3", 178);
    \u0275\u0275text(38, "Compliance & Billing Activity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 179);
    \u0275\u0275text(40, "View All History");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 180);
    \u0275\u0275repeaterCreate(42, Vendors_Conditional_1_For_43_Template, 11, 5, "div", 181, _forTrack1, false, Vendors_Conditional_1_ForEmpty_44_Template, 2, 0, "p", 182);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Coordinate with ", ctx_r1.stats.totalActive, " active contractors and material suppliers. ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.stats.totalActive);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.stats.pendingPayments);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.stats.compliantPartners);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.filteredVendors);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.activities);
  }
}
function Vendors_Conditional_2_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 215);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.laborStats.totalPersonnel);
  }
}
function Vendors_Conditional_2_For_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 231)(1, "div", 239)(2, "span", 240);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 241)(5, "p", 242);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 243);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "select", 244);
    \u0275\u0275listener("change", function Vendors_Conditional_2_For_59_Template_select_change_10_listener($event) {
      const task_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateTaskStatus(task_r9, $event.target.value));
    })("click", function Vendors_Conditional_2_For_59_Template_select_click_10_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(11, "option", 245);
    \u0275\u0275text(12, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 246);
    \u0275\u0275text(14, "In Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 247);
    \u0275\u0275text(16, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 248);
    \u0275\u0275text(18, "On Hold");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "span", 249);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 250);
    \u0275\u0275listener("click", function Vendors_Conditional_2_For_59_Template_button_click_21_listener() {
      const task_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteTask(task_r9.id));
    });
    \u0275\u0275elementStart(22, "span", 251);
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const task_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(task_r9.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 6, task_r9.due_date, "dd/MMM/yyyy"));
    \u0275\u0275advance(2);
    \u0275\u0275property("value", task_r9.status);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngClass", ctx_r1.getTaskStatusColor(task_r9.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r9.status, " ");
  }
}
function Vendors_Conditional_2_ForEmpty_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 232);
    \u0275\u0275text(1, "No active tasks detected.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_2_For_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 238)(1, "td", 252);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 253);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 254);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 237)(8, "span", 255);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 237)(11, "div", 256)(12, "button", 257);
    \u0275\u0275listener("click", function Vendors_Conditional_2_For_82_Template_button_click_12_listener() {
      const inv_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewInvoice(inv_r11));
    });
    \u0275\u0275elementStart(13, "span", 99);
    \u0275\u0275text(14, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 258);
    \u0275\u0275listener("click", function Vendors_Conditional_2_For_82_Template_button_click_15_listener() {
      const inv_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.payInvoice(inv_r11));
    });
    \u0275\u0275elementStart(16, "span", 99);
    \u0275\u0275text(17, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "button", 259);
    \u0275\u0275listener("click", function Vendors_Conditional_2_For_82_Template_button_click_18_listener() {
      const inv_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCancelInvoiceDialog(inv_r11));
    });
    \u0275\u0275elementStart(19, "span", 99);
    \u0275\u0275text(20, "cancel");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const inv_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r11.invoice_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", (+inv_r11.grand_total).toLocaleString("en-IN"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(inv_r11.invoice_date));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", inv_r11.status === "Paid" ? "bg-green-100 text-green-700" : inv_r11.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r11.status, " ");
  }
}
function Vendors_Conditional_2_ForEmpty_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 260);
    \u0275\u0275text(2, "No invoice records found.");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 207)(2, "button", 208);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275elementStart(3, "span", 198);
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "h2", 209);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 210);
    \u0275\u0275text(9, "Partner Overview & Execution Hub");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 211)(11, "button", 212);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openVendorDetailData());
    });
    \u0275\u0275elementStart(12, "span", 43);
    \u0275\u0275text(13, "business_center");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Vendor Details ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 212);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAudit());
    });
    \u0275\u0275elementStart(16, "span", 43);
    \u0275\u0275text(17, "fact_check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Audits ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 213);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBilling());
    });
    \u0275\u0275elementStart(20, "span", 43);
    \u0275\u0275text(21, "receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " Billing ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 214);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openLaborModal());
    });
    \u0275\u0275elementStart(24, "span", 43);
    \u0275\u0275text(25, "engineering");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " Labor ");
    \u0275\u0275conditionalCreate(27, Vendors_Conditional_2_Conditional_27_Template, 2, 1, "span", 215);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 216)(29, "div", 217)(30, "span", 218);
    \u0275\u0275text(31, "Budget Allocated");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 136);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 219)(35, "span", 218);
    \u0275\u0275text(36, "Active Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 136);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 220)(40, "span", 218);
    \u0275\u0275text(41, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 221);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 220)(45, "div", 222)(46, "span", 218);
    \u0275\u0275text(47, "Compliance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 223);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 224);
    \u0275\u0275element(51, "div", 225);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 226)(53, "div", 227)(54, "div", 228)(55, "h3", 229);
    \u0275\u0275text(56, "Service Tasks & Performance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 230);
    \u0275\u0275repeaterCreate(58, Vendors_Conditional_2_For_59_Template, 24, 9, "div", 231, _forTrack1, false, Vendors_Conditional_2_ForEmpty_60_Template, 2, 0, "p", 232);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 228)(62, "div", 143)(63, "h3", 233);
    \u0275\u0275text(64, "Vendor Invoicing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 234);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_65_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSubmission());
    });
    \u0275\u0275text(66, " + New Submission ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "table", 235)(68, "thead")(69, "tr", 236)(70, "th", 237);
    \u0275\u0275text(71, "Invoice #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "th", 237);
    \u0275\u0275text(73, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "th", 237);
    \u0275\u0275text(75, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "th", 237);
    \u0275\u0275text(77, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "th", 237);
    \u0275\u0275text(79, "Action");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(80, "tbody");
    \u0275\u0275repeaterCreate(81, Vendors_Conditional_2_For_82_Template, 21, 5, "tr", 238, _forTrack1, false, Vendors_Conditional_2_ForEmpty_83_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.name);
    \u0275\u0275advance(20);
    \u0275\u0275conditional(ctx_r1.laborStats.totalPersonnel > 0 ? 27 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.budget);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.allTasks.length, " Tasks");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.selectedVendor.statusColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.status);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("text-green-600", ctx_r1.selectedVendor.compliance_score >= 90)("text-amber-600", ctx_r1.selectedVendor.compliance_score < 90);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.compliance_score, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.selectedVendor.compliance_score, "%");
    \u0275\u0275classProp("bg-green-600", ctx_r1.selectedVendor.compliance_score >= 90)("bg-amber-500", ctx_r1.selectedVendor.compliance_score < 90);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.allTasks || \u0275\u0275pureFunction0(19, _c0));
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r1.invoices);
  }
}
function Vendors_Conditional_37_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 265);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.projectdata.work_poc_completion, "% complete");
  }
}
function Vendors_Conditional_37_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 265);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.projectdata.milestone_completion, "% complete");
  }
}
function Vendors_Conditional_37_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 265);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.projectdata.lumpsum_completion, "% complete");
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 268)(1, "span", 275);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Loading milestones\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 273);
    \u0275\u0275text(1, "No milestones found for this project.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_5_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 279);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Due: ", \u0275\u0275pipeBind2(2, 1, m_r14.endDate, "dd/MMM/yyyy"));
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_5_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 281);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 282);
    \u0275\u0275element(3, "div", 283);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", m_r14.progress >= 100 ? "text-green-600" : "text-amber-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r14.progress, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", m_r14.progress, "%");
    \u0275\u0275property("ngClass", m_r14.progress >= 100 ? "bg-green-500" : "bg-amber-400");
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_5_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 277);
    \u0275\u0275listener("click", function Vendors_Conditional_37_Conditional_19_Conditional_5_For_1_Template_div_click_0_listener() {
      const m_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onMilestoneSelect(m_r14.id));
    });
    \u0275\u0275elementStart(1, "div")(2, "p", 278);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Vendors_Conditional_37_Conditional_19_Conditional_5_For_1_Conditional_4_Template, 3, 4, "p", 279);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 280);
    \u0275\u0275conditionalCreate(6, Vendors_Conditional_37_Conditional_19_Conditional_5_For_1_Conditional_6_Template, 4, 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(4, _c2, ctx_r1.selectedMilestoneId === m_r14.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r14.name ?? m_r14.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r14.endDate ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(m_r14.progress != null ? 6 : -1);
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Vendors_Conditional_37_Conditional_19_Conditional_5_For_1_Template, 7, 6, "div", 276, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r1.milestones);
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 268)(1, "span", 275);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Loading\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 286);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sm_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", sm_r16.progress >= 100 ? "text-green-600" : "text-amber-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sm_r16.progress, "% done ");
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 289)(1, "p", 290);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 291);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r17.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", task_r17.status === "completed" ? "bg-green-100 text-green-700" : task_r17.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r17.status, " ");
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 287)(1, "p", 288);
    \u0275\u0275text(2, "Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Conditional_6_For_4_Template, 5, 3, "div", 289, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.milestoneTasks);
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 285);
    \u0275\u0275listener("click", function Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Template_div_click_0_listener() {
      const sm_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.onSubMilestoneSelect(sm_r16));
    });
    \u0275\u0275elementStart(1, "div", 222)(2, "p", 278);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 280);
    \u0275\u0275conditionalCreate(5, Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Conditional_5_Template, 2, 2, "p", 286);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Conditional_6_Template, 5, 0, "div", 287);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sm_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(4, _c2, ctx_r1.selectedSubMilestoneId === sm_r16.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sm_r16.name ?? sm_r16.title);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(sm_r16.progress != null ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedSubMilestoneId === sm_r16.id && ctx_r1.milestoneTasks.length > 0 ? 6 : -1);
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_For_1_Template, 7, 6, "div", 284, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275repeater(ctx_r1.subMilestones);
  }
}
function Vendors_Conditional_37_Conditional_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 274)(1, "p", 272);
    \u0275\u0275text(2, "Sub-Milestones");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_3_Template, 4, 0, "div", 268)(4, Vendors_Conditional_37_Conditional_19_Conditional_6_Conditional_4_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.isLoadingSubMilestones ? 3 : 4);
  }
}
function Vendors_Conditional_37_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "p", 272);
    \u0275\u0275text(2, "Select Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, Vendors_Conditional_37_Conditional_19_Conditional_3_Template, 4, 0, "div", 268)(4, Vendors_Conditional_37_Conditional_19_Conditional_4_Template, 2, 0, "p", 273)(5, Vendors_Conditional_37_Conditional_19_Conditional_5_Template, 2, 0);
    \u0275\u0275conditionalCreate(6, Vendors_Conditional_37_Conditional_19_Conditional_6_Template, 5, 1, "div", 274);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.isLoadingMilestones ? 3 : ctx_r1.milestones.length === 0 ? 4 : 5);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.selectedMilestoneId && ctx_r1.subMilestones.length > 0 ? 6 : -1);
  }
}
function Vendors_Conditional_37_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 268)(1, "span", 275);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Loading milestones... ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_25_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 270);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r19 = ctx.$implicit;
    \u0275\u0275property("ngValue", m_r19.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", m_r19.name ?? m_r19.title, "", m_r19.progress > 0 ? " - " + m_r19.progress + "%" : "", " ");
  }
}
function Vendors_Conditional_37_Conditional_25_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No milestones found for this project.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_25_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.selectedMilestoneIds.length, " selected");
  }
}
function Vendors_Conditional_37_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 269);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_37_Conditional_25_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedMilestoneIds, $event) || (ctx_r1.selectedMilestoneIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_Conditional_37_Conditional_25_Template_select_ngModelChange_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onMilestoneMultiSelect());
    });
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_37_Conditional_25_For_2_Template, 2, 3, "option", 270, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, Vendors_Conditional_37_Conditional_25_Conditional_3_Template, 2, 0, "p", 23)(4, Vendors_Conditional_37_Conditional_25_Conditional_4_Template, 2, 1, "p", 23);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedMilestoneIds);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.milestones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.milestones.length === 0 ? 3 : 4);
  }
}
function Vendors_Conditional_37_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 270);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sm_r20 = ctx.$implicit;
    \u0275\u0275property("ngValue", sm_r20.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", sm_r20.name ?? sm_r20.title, "", sm_r20.progress > 0 ? " - " + sm_r20.progress + "%" : "", " ");
  }
}
function Vendors_Conditional_37_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "Select a milestone to view sub-milestones.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.selectedSubMilestoneIds.length, " selected");
  }
}
function Vendors_Conditional_37_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 270);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r21 = ctx.$implicit;
    \u0275\u0275property("ngValue", task_r21.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", task_r21.title, "", (task_r21.progress ?? 0) > 0 ? " - " + task_r21.progress + "%" : task_r21.status ? " - " + task_r21.status : "", " ");
  }
}
function Vendors_Conditional_37_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "Select a sub-milestone to view tasks.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No tasks found from project task API.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_37_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.selectedTaskIds.length, " selected");
  }
}
function Vendors_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 261)(1, "div", 262);
    \u0275\u0275listener("click", function Vendors_Conditional_37_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSettlementTypeChange("work_poc"));
    });
    \u0275\u0275elementStart(2, "span", 263);
    \u0275\u0275text(3, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 264);
    \u0275\u0275text(5, "Work POC");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, Vendors_Conditional_37_Conditional_6_Template, 2, 1, "p", 265);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 262);
    \u0275\u0275listener("click", function Vendors_Conditional_37_Template_div_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSettlementTypeChange("milestone"));
    });
    \u0275\u0275elementStart(8, "span", 263);
    \u0275\u0275text(9, "flag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 264);
    \u0275\u0275text(11, "Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, Vendors_Conditional_37_Conditional_12_Template, 2, 1, "p", 265);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 262);
    \u0275\u0275listener("click", function Vendors_Conditional_37_Template_div_click_13_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSettlementTypeChange("lumpsum"));
    });
    \u0275\u0275elementStart(14, "span", 263);
    \u0275\u0275text(15, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 264);
    \u0275\u0275text(17, "Lump Sum");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, Vendors_Conditional_37_Conditional_18_Template, 2, 1, "p", 265);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, Vendors_Conditional_37_Conditional_19_Template, 7, 2, "div", 105);
    \u0275\u0275elementStart(20, "div", 266)(21, "div")(22, "label", 267);
    \u0275\u0275text(23, " Milestone ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, Vendors_Conditional_37_Conditional_24_Template, 4, 0, "div", 268)(25, Vendors_Conditional_37_Conditional_25_Template, 5, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "label", 267);
    \u0275\u0275text(28, " Sub-Milestone ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "select", 269);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_37_Template_select_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedSubMilestoneIds, $event) || (ctx_r1.selectedSubMilestoneIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_Conditional_37_Template_select_ngModelChange_29_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubMilestoneMultiSelect());
    });
    \u0275\u0275repeaterCreate(30, Vendors_Conditional_37_For_31_Template, 2, 3, "option", 270, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, Vendors_Conditional_37_Conditional_32_Template, 2, 0, "p", 23)(33, Vendors_Conditional_37_Conditional_33_Template, 2, 1, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div")(35, "label", 267);
    \u0275\u0275text(36, " Task ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 269);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_37_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedTaskIds, $event) || (ctx_r1.selectedTaskIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_Conditional_37_Template_select_ngModelChange_37_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTaskMultiSelect());
    });
    \u0275\u0275repeaterCreate(38, Vendors_Conditional_37_For_39_Template, 2, 3, "option", 270, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(40, Vendors_Conditional_37_Conditional_40_Template, 2, 0, "p", 23)(41, Vendors_Conditional_37_Conditional_41_Template, 2, 0, "p", 23)(42, Vendors_Conditional_37_Conditional_42_Template, 2, 1, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div")(44, "label", 267);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 271);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_37_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.settlementCompletion, $event) || (ctx_r1.settlementCompletion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "p", 23);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(17, _c1, ctx_r1.selectedSettlementType === "work_poc"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.projectdata == null ? null : ctx_r1.projectdata.work_poc_completion) != null ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(19, _c1, ctx_r1.selectedSettlementType === "milestone"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.projectdata == null ? null : ctx_r1.projectdata.milestone_completion) != null ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(21, _c1, ctx_r1.selectedSettlementType === "lumpsum"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.projectdata == null ? null : ctx_r1.projectdata.lumpsum_completion) != null ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(false ? 19 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.isLoadingMilestones ? 24 : 25);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedSubMilestoneIds);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableSubMilestones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.availableSubMilestones.length === 0 ? 32 : 33);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedTaskIds);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableTaskOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedSubMilestoneIds.length === 0 ? 40 : ctx_r1.availableTaskOptions.length === 0 ? 41 : 42);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.settlementCompletionLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settlementCompletion);
    \u0275\u0275property("readonly", !ctx_r1.isSettlementCompletionEditable)("ngClass", ctx_r1.isSettlementCompletionEditable ? "bg-white" : "bg-slate-100 text-slate-500 cursor-not-allowed");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSettlementCompletionEditable ? "Auto-filled from selection, editable for Work POC." : "Auto-filled from selection, read-only for Milestone and Lump Sum.", " ");
  }
}
function Vendors_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 18);
    \u0275\u0275text(2, " Cheque Clearance Date ");
    \u0275\u0275elementStart(3, "span", 19);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 292);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_66_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.paymentForm.clearance_date, $event) || (ctx_r1.paymentForm.clearance_date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.paymentForm.clearance_date);
  }
}
function Vendors_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 18);
    \u0275\u0275text(2, " Reference / Transaction No. ");
    \u0275\u0275elementStart(3, "span", 293);
    \u0275\u0275text(4, "(Optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 294);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_67_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.paymentForm.reference, $event) || (ctx_r1.paymentForm.reference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.paymentForm.reference);
  }
}
function Vendors_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 295);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 296);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.paymentError);
  }
}
function Vendors_Conditional_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.activePersonnel, " ");
  }
}
function Vendors_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.onSite, " ");
  }
}
function Vendors_Conditional_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_108_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.remaining, " ");
  }
}
function Vendors_Conditional_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.totalPersonnel, " ");
  }
}
function Vendors_Conditional_129_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 297)(1, "span", 307);
    \u0275\u0275text(2, " error ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 308);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborError, " ");
  }
}
function Vendors_Conditional_129_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r25 = ctx.$implicit;
    \u0275\u0275property("value", s_r25.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r25.label);
  }
}
function Vendors_Conditional_129_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r26 = ctx.$implicit;
    \u0275\u0275property("value", m_r26.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r26.name);
  }
}
function Vendors_Conditional_129_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 275);
    \u0275\u0275text(1, " progress_activity ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving\u2026 ");
  }
}
function Vendors_Conditional_129_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1, " add_circle ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Confirm & Add Worker ");
  }
}
function Vendors_Conditional_129_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_129_Conditional_1_Template, 5, 1, "div", 297);
    \u0275\u0275elementStart(2, "div", 298)(3, "div", 39)(4, "label", 299);
    \u0275\u0275text(5, " Skill * ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 300);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_129_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newLabor.skill, $event) || (ctx_r1.newLabor.skill = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(7, "option", 90);
    \u0275\u0275text(8, "Select skill");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, Vendors_Conditional_129_For_10_Template, 2, 2, "option", 91, _forTrack2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 39)(12, "label", 299);
    \u0275\u0275text(13, " Daily Rate (\u20B9) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 301);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_129_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newLabor.daily_rate, $event) || (ctx_r1.newLabor.daily_rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 39)(16, "label", 299);
    \u0275\u0275text(17, " Initial Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 300);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_129_Template_select_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newLabor.status, $event) || (ctx_r1.newLabor.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(19, "option", 302);
    \u0275\u0275text(20, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 303);
    \u0275\u0275text(22, "Inactive");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 39)(24, "label", 299);
    \u0275\u0275text(25, " Count (no. of workers) * ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 304);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_129_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newLabor.labor_count, $event) || (ctx_r1.newLabor.labor_count = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 39)(28, "label", 299);
    \u0275\u0275text(29, "Assign To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "select", 305);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_129_Template_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newLabor.assign_worker, $event) || (ctx_r1.newLabor.assign_worker = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(31, "option", 25);
    \u0275\u0275text(32, "Unassigned");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(33, Vendors_Conditional_129_For_34_Template, 2, 2, "option", 91, _forTrack3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "button", 306);
    \u0275\u0275listener("click", function Vendors_Conditional_129_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitLabor());
    });
    \u0275\u0275conditionalCreate(36, Vendors_Conditional_129_Conditional_36_Template, 3, 0)(37, Vendors_Conditional_129_Conditional_37_Template, 3, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.laborError ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newLabor.skill);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.skillOptions);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newLabor.daily_rate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newLabor.status);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newLabor.labor_count);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newLabor.assign_worker);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.team);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isSavingLabor);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSavingLabor ? 36 : 37);
  }
}
function Vendors_Conditional_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "span", 309);
    \u0275\u0275text(2, " progress_activity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 310);
    \u0275\u0275text(4, " Loading workforce data\u2026 ");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "span", 199);
    \u0275\u0275text(2, " person_search ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 200);
    \u0275\u0275text(4, " No workers assigned yet. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 311);
    \u0275\u0275text(6, ' Click "Add Worker" above to onboard the first team member. ');
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_132_For_20_Conditional_0_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r28 = ctx.$implicit;
    \u0275\u0275property("value", s_r28.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r28.label);
  }
}
function Vendors_Conditional_132_For_20_Conditional_0_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r29 = ctx.$implicit;
    \u0275\u0275property("value", m_r29.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r29.name);
  }
}
function Vendors_Conditional_132_For_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 317)(1, "td", 319)(2, "div", 230)(3, "p", 320);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 321)(6, "div", 39)(7, "label", 322);
    \u0275\u0275text(8, "Skill");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 323);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_132_For_20_Conditional_0_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLaborForm.skill, $event) || (ctx_r1.editLaborForm.skill = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(10, Vendors_Conditional_132_For_20_Conditional_0_For_11_Template, 2, 2, "option", 91, _forTrack2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 39)(13, "label", 322);
    \u0275\u0275text(14, "Worker Count");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 324);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_132_For_20_Conditional_0_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLaborForm.labor_count, $event) || (ctx_r1.editLaborForm.labor_count = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 39)(17, "label", 322);
    \u0275\u0275text(18, "Daily Rate (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 325);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_132_For_20_Conditional_0_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLaborForm.daily_rate, $event) || (ctx_r1.editLaborForm.daily_rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 39)(21, "label", 322);
    \u0275\u0275text(22, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 323);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_132_For_20_Conditional_0_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLaborForm.status, $event) || (ctx_r1.editLaborForm.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(24, "option", 302);
    \u0275\u0275text(25, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 303);
    \u0275\u0275text(27, "Inactive");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 39)(29, "label", 322);
    \u0275\u0275text(30, "Assign To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 323);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_132_For_20_Conditional_0_Template_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLaborForm.assign_worker, $event) || (ctx_r1.editLaborForm.assign_worker = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(32, "option", 25);
    \u0275\u0275text(33, "Unassigned");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(34, Vendors_Conditional_132_For_20_Conditional_0_For_35_Template, 2, 2, "option", 91, _forTrack3);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 326)(37, "button", 327);
    \u0275\u0275listener("click", function Vendors_Conditional_132_For_20_Conditional_0_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r27);
      const worker_r30 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveLaborEdit(worker_r30.id));
    });
    \u0275\u0275elementStart(38, "span", 328);
    \u0275\u0275text(39, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(40, " Save Changes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 329);
    \u0275\u0275listener("click", function Vendors_Conditional_132_For_20_Conditional_0_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelLaborEdit());
    });
    \u0275\u0275text(42, " Cancel ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const worker_r30 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Editing Worker #", worker_r30.id, " ");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLaborForm.skill);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.skillOptions);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLaborForm.labor_count);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLaborForm.daily_rate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLaborForm.status);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLaborForm.assign_worker);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.team);
  }
}
function Vendors_Conditional_132_For_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 318)(1, "td", 330);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 331)(4, "span", 332);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 331)(7, "span", 332);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 333);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 334);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 331)(14, "span", 335);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 331)(17, "div", 336)(18, "button", 337);
    \u0275\u0275listener("click", function Vendors_Conditional_132_For_20_Conditional_1_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r31);
      const worker_r30 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editLaborWorker(worker_r30.id));
    });
    \u0275\u0275elementStart(19, "span", 43);
    \u0275\u0275text(20, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 338);
    \u0275\u0275listener("click", function Vendors_Conditional_132_For_20_Conditional_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r31);
      const worker_r30 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteLaborWorker(worker_r30.id));
    });
    \u0275\u0275elementStart(22, "span", 43);
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const worker_r30 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", worker_r30.skill, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", worker_r30.labor_count, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", worker_r30.assign_worker, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", worker_r30.daily_rate, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", worker_r30.daily_rate * worker_r30.labor_count, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", worker_r30.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", worker_r30.status, " ");
  }
}
function Vendors_Conditional_132_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Vendors_Conditional_132_For_20_Conditional_0_Template, 43, 6, "tr", 317)(1, Vendors_Conditional_132_For_20_Conditional_1_Template, 24, 7, "tr", 318);
  }
  if (rf & 2) {
    const worker_r30 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.editingLaborId === worker_r30.id ? 0 : 1);
  }
}
function Vendors_Conditional_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "table", 312)(2, "thead")(3, "tr", 313)(4, "th", 314);
    \u0275\u0275text(5, "Skill ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 315);
    \u0275\u0275text(7, "Worker Count");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 315);
    \u0275\u0275text(9, "Assign ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 316);
    \u0275\u0275text(11, "Rate (\u20B9/day)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 316);
    \u0275\u0275text(13, "Daily Cost (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 315);
    \u0275\u0275text(15, "Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 315);
    \u0275\u0275text(17, "Action ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, Vendors_Conditional_132_For_20_Template, 2, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r1.laborWorkers);
  }
}
function Vendors_Conditional_137_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69)(1, "span", 339);
    \u0275\u0275text(2, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 340);
    \u0275\u0275listener("change", function Vendors_Conditional_137_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateVendorStatus($event.target.value));
    });
    \u0275\u0275elementStart(4, "option", 341);
    \u0275\u0275text(5, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 342);
    \u0275\u0275text(7, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 343);
    \u0275\u0275text(9, "Inactive");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.selectedVendor.statusColor)("value", ctx_r1.selectedVendor.status);
  }
}
function Vendors_For_141_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 346);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_For_141_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 347);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r33 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.currentStep === step_r33.num ? "text-white" : "text-slate-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r33.num);
  }
}
function Vendors_For_141_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 349);
  }
  if (rf & 2) {
    const step_r33 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.currentStep > step_r33.num ? "bg-primary" : "bg-surface-container");
  }
}
function Vendors_For_141_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 344)(2, "div", 345);
    \u0275\u0275conditionalCreate(3, Vendors_For_141_Conditional_3_Template, 2, 0, "span", 346)(4, Vendors_For_141_Conditional_4_Template, 2, 2, "span", 347);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 348);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, Vendors_For_141_Conditional_7_Template, 1, 1, "div", 349);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r33 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(5, _c3, ctx_r1.currentStep === step_r33.num, ctx_r1.currentStep > step_r33.num, ctx_r1.currentStep < step_r33.num));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.currentStep > step_r33.num ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.currentStep === step_r33.num ? "text-slate-900" : "text-outline");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r33.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r33.num < ctx_r1.vendorSteps.length ? 7 : -1);
  }
}
function Vendors_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div")(2, "label", 350);
    \u0275\u0275text(3, "Vendor Legal Name ");
    \u0275\u0275elementStart(4, "span", 351);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "input", 352);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_143_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.name, $event) || (ctx_r1.newVendor.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 353)(8, "div")(9, "label", 350);
    \u0275\u0275text(10, "SPOC Name ");
    \u0275\u0275elementStart(11, "span", 351);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 354);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_143_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.spoc.name, $event) || (ctx_r1.newVendor.spoc.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "label", 350);
    \u0275\u0275text(16, "SPOC Phone ");
    \u0275\u0275elementStart(17, "span", 351);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 20)(20, "input", 355);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_143_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.spoc.phone, $event) || (ctx_r1.newVendor.spoc.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function Vendors_Conditional_143_Template_input_input_20_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sanitizePhone($event, "spoc"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 356);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 353)(24, "div")(25, "label", 350);
    \u0275\u0275text(26, "Official Email ");
    \u0275\u0275elementStart(27, "span", 351);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 357);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_143_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.email, $event) || (ctx_r1.newVendor.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "label", 350);
    \u0275\u0275text(32, "Official Phone ");
    \u0275\u0275elementStart(33, "span", 351);
    \u0275\u0275text(34, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 20)(36, "input", 355);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_143_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.phone, $event) || (ctx_r1.newVendor.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function Vendors_Conditional_143_Template_input_input_36_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sanitizePhone($event, "official"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 356);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.spoc.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.spoc.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.spoc.phone == null ? null : ctx_r1.newVendor.spoc.phone.length) ?? 0, "/10");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.email);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.phone == null ? null : ctx_r1.newVendor.phone.length) ?? 0, "/10");
  }
}
function Vendors_Conditional_144_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 358)(2, "span", 359);
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 360);
    \u0275\u0275text(5, " Provide ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7, "GST No.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " or ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, "PAN Card No.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u2014 at least one is required. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 353)(13, "div")(14, "label", 350);
    \u0275\u0275text(15, "GST No.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 20)(17, "input", 361);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_144_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.kyc.gst, $event) || (ctx_r1.newVendor.kyc.gst = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 356);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div")(21, "label", 350);
    \u0275\u0275text(22, "PAN Card No.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 20)(24, "input", 362);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_144_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.kyc.pan, $event) || (ctx_r1.newVendor.kyc.pan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 356);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "div", 363)(28, "div", 364)(29, "label", 350);
    \u0275\u0275text(30, "Physical Address ");
    \u0275\u0275elementStart(31, "span", 351);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "input", 365);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_144_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.address.street, $event) || (ctx_r1.newVendor.address.street = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div")(35, "label", 350);
    \u0275\u0275text(36, "Pincode ");
    \u0275\u0275elementStart(37, "span", 351);
    \u0275\u0275text(38, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "input", 366);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_144_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.address.pincode, $event) || (ctx_r1.newVendor.address.pincode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.kyc.gst);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.kyc.gst == null ? null : ctx_r1.newVendor.kyc.gst.length) ?? 0, "/15");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.kyc.pan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.kyc.pan == null ? null : ctx_r1.newVendor.kyc.pan.length) ?? 0, "/10");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.address.street);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.address.pincode);
  }
}
function Vendors_Conditional_145_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 378);
    \u0275\u0275listener("click", function Vendors_Conditional_145_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.newVendor.skill = []);
    });
    \u0275\u0275text(1, " Clear all ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_145_For_24_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 382);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_145_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 379)(1, "input", 380);
    \u0275\u0275listener("change", function Vendors_Conditional_145_For_24_Template_input_change_1_listener() {
      const s_r39 = \u0275\u0275restoreView(_r38).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleSkill(s_r39.label));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 381);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Vendors_Conditional_145_For_24_Conditional_4_Template, 2, 0, "span", 382);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-primary/5", ctx_r1.isSkillSelected(s_r39.label));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.isSkillSelected(s_r39.label));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r39.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSkillSelected(s_r39.label) ? 4 : -1);
  }
}
function Vendors_Conditional_145_ForEmpty_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 376);
    \u0275\u0275text(1, "No skills available.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_145_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 383);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 384);
    \u0275\u0275listener("click", function Vendors_Conditional_145_Conditional_28_For_2_Template_button_click_2_listener() {
      const svc_r41 = \u0275\u0275restoreView(_r40).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleSkill(svc_r41));
    });
    \u0275\u0275text(3, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const svc_r41 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", svc_r41, " ");
  }
}
function Vendors_Conditional_145_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 377);
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_145_Conditional_28_For_2_Template, 4, 1, "span", 383, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.newVendor.skill);
  }
}
function Vendors_Conditional_145_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div")(2, "label", 350);
    \u0275\u0275text(3, " Budget Allocation ");
    \u0275\u0275elementStart(4, "span", 351);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 20)(7, "span", 367);
    \u0275\u0275text(8, "\u20B9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 368);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_145_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.budget, $event) || (ctx_r1.newVendor.budget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 369);
    \u0275\u0275text(11, "Enter budget in INR (e.g. 500000)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 350);
    \u0275\u0275text(14, " Skill / Services Offered ");
    \u0275\u0275elementStart(15, "span", 351);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 370)(18, "div", 371)(19, "span", 372);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, Vendors_Conditional_145_Conditional_21_Template, 2, 0, "button", 373);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 374);
    \u0275\u0275repeaterCreate(23, Vendors_Conditional_145_For_24_Template, 5, 5, "label", 375, _forTrack2, false, Vendors_Conditional_145_ForEmpty_25_Template, 2, 0, "p", 376);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "p", 369);
    \u0275\u0275text(27, "Multiple skills select kar sakte ho");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(28, Vendors_Conditional_145_Conditional_28_Template, 3, 0, "div", 377);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.budget);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.newVendor.skill == null ? null : ctx_r1.newVendor.skill.length) > 0 ? ctx_r1.newVendor.skill.length + " skill(s) selected" : "Select skills", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.newVendor.skill == null ? null : ctx_r1.newVendor.skill.length) > 0 ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.skillOptions);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.newVendor.skill == null ? null : ctx_r1.newVendor.skill.length) > 0 ? 28 : -1);
  }
}
function Vendors_Conditional_146_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 391)(1, "span", 392);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 393);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 394);
    \u0275\u0275text(6, "open_in_new");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r43 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", file_r43, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getFileName(file_r43));
  }
}
function Vendors_Conditional_146_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "p", 101);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, Vendors_Conditional_146_Conditional_1_For_4_Template, 7, 2, "a", 391, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Existing Documents (", ctx_r1.selectedVendor.contract_files.length, ") ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.selectedVendor.contract_files);
  }
}
function Vendors_Conditional_146_Conditional_22_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 395)(1, "div", 396)(2, "span", 397);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 203)(5, "p", 398);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 399);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 400);
    \u0275\u0275listener("click", function Vendors_Conditional_146_Conditional_22_For_4_Template_button_click_9_listener() {
      const $index_r45 = \u0275\u0275restoreView(_r44).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeContractFile($index_r45));
    });
    \u0275\u0275elementStart(10, "span", 251);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const f_r46 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getFileIconBg(f_r46.name));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getFileIconColor(f_r46.name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getFileIcon(f_r46.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(f_r46.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFileSize(f_r46.size));
  }
}
function Vendors_Conditional_146_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "p", 101);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, Vendors_Conditional_146_Conditional_22_For_4_Template, 12, 5, "div", 395, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.contractFiles.length, " naya file", ctx_r1.contractFiles.length > 1 ? "s" : "", " selected ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.contractFiles);
  }
}
function Vendors_Conditional_146_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 401);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 402);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.fileError);
  }
}
function Vendors_Conditional_146_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_146_Conditional_1_Template, 5, 1, "div", 105);
    \u0275\u0275elementStart(2, "div")(3, "label", 350);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "span", 385);
    \u0275\u0275text(6, "(Optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "label", 386)(8, "span", 387);
    \u0275\u0275text(9, "upload_file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 388);
    \u0275\u0275text(11, "Click to upload or drag & drop");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 389);
    \u0275\u0275text(13, " PDF \xB7 Word (.doc/.docx) \xB7 JPG \xB7 PNG");
    \u0275\u0275element(14, "br");
    \u0275\u0275text(15, " Max ");
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17, "10 MB");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " per file \xB7 Up to ");
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20, "10 files");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 390);
    \u0275\u0275listener("change", function Vendors_Conditional_146_Template_input_change_21_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onContractFilesSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, Vendors_Conditional_146_Conditional_22_Template, 5, 2, "div", 105);
    \u0275\u0275conditionalCreate(23, Vendors_Conditional_146_Conditional_23_Template, 5, 1, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditMode && ctx_r1.selectedVendor && ctx_r1.selectedVendor.contract_files.length > 0 ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditMode ? "Add More Documents" : "Contract Documents", " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-primary", ctx_r1.contractFiles.length > 0);
    \u0275\u0275advance(15);
    \u0275\u0275conditional(ctx_r1.contractFiles.length > 0 ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.fileError ? 23 : -1);
  }
}
function Vendors_Conditional_147_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "span", 403);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 404);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.stepError);
  }
}
function Vendors_Conditional_149_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 405);
    \u0275\u0275listener("click", function Vendors_Conditional_149_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(1, "span", 99);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Back ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSaving);
  }
}
function Vendors_Conditional_150_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 406);
    \u0275\u0275listener("click", function Vendors_Conditional_150_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddModal = false);
    });
    \u0275\u0275text(1, " Cancel ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_151_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 407);
    \u0275\u0275listener("click", function Vendors_Conditional_151_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(1, " Next ");
    \u0275\u0275elementStart(2, "span", 99);
    \u0275\u0275text(3, "arrow_forward");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_152_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 409);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving... ");
  }
}
function Vendors_Conditional_152_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Update ");
  }
}
function Vendors_Conditional_152_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Onboard ");
  }
}
function Vendors_Conditional_152_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 408);
    \u0275\u0275listener("click", function Vendors_Conditional_152_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addVendor());
    });
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_152_Conditional_1_Template, 3, 0)(2, Vendors_Conditional_152_Conditional_2_Template, 3, 0)(3, Vendors_Conditional_152_Conditional_3_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSaving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSaving ? 1 : ctx_r1.isEditMode ? 2 : 3);
  }
}
function Vendors_For_169_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 91);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r51 = ctx.$implicit;
    \u0275\u0275property("value", p_r51.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r51.name);
  }
}
function Vendors_Conditional_195_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 102);
    \u0275\u0275text(1, " Hours ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_For_206_Conditional_17_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 428);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_206_Conditional_17_Conditional_0_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r54);
      const item_r53 = \u0275\u0275nextContext(2).$implicit;
      \u0275\u0275twoWayBindingSet(item_r53.hours, $event) || (item_r53.hours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_206_Conditional_17_Conditional_0_Template_input_ngModelChange_0_listener() {
      \u0275\u0275restoreView(_r54);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.calculateInvoiceTotals());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r53 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275twoWayProperty("ngModel", item_r53.hours);
  }
}
function Vendors_For_206_Conditional_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
}
function Vendors_For_206_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Vendors_For_206_Conditional_17_Conditional_0_Template, 1, 1, "input", 427)(1, Vendors_For_206_Conditional_17_Conditional_1_Template, 1, 0, "div");
  }
  if (rf & 2) {
    const item_r53 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(item_r53.type === "labor" ? 0 : 1);
  }
}
function Vendors_For_206_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 424);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r53 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" incl. \u20B9", \u0275\u0275pipeBind2(2, 1, item_r53.gstAmount, "1.0-2"), " TAX ");
  }
}
function Vendors_For_206_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 429);
    \u0275\u0275listener("click", function Vendors_For_206_Conditional_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r55);
      const $index_r56 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeInvoiceItem($index_r56));
    });
    \u0275\u0275elementStart(1, "span", 99);
    \u0275\u0275text(2, " delete ");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_For_206_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 426);
  }
}
function Vendors_For_206_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 410)(1, "div", 20)(2, "select", 411);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_206_Template_select_ngModelChange_2_listener($event) {
      const item_r53 = \u0275\u0275restoreView(_r52).$implicit;
      \u0275\u0275twoWayBindingSet(item_r53.type, $event) || (item_r53.type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_206_Template_select_ngModelChange_2_listener() {
      const item_r53 = \u0275\u0275restoreView(_r52).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTypeChange(item_r53));
    });
    \u0275\u0275elementStart(3, "option", 90);
    \u0275\u0275text(4, "Select");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 412);
    \u0275\u0275text(6, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 413);
    \u0275\u0275text(8, "Equipment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 414);
    \u0275\u0275text(10, "Labor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 415);
    \u0275\u0275text(12, "Others");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "span", 416);
    \u0275\u0275text(14, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "input", 417);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_206_Template_input_ngModelChange_15_listener($event) {
      const item_r53 = \u0275\u0275restoreView(_r52).$implicit;
      \u0275\u0275twoWayBindingSet(item_r53.description, $event) || (item_r53.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 418);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_206_Template_input_ngModelChange_16_listener($event) {
      const item_r53 = \u0275\u0275restoreView(_r52).$implicit;
      \u0275\u0275twoWayBindingSet(item_r53.quantity, $event) || (item_r53.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_206_Template_input_ngModelChange_16_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calculateInvoiceTotals());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, Vendors_For_206_Conditional_17_Template, 2, 1);
    \u0275\u0275elementStart(18, "div", 20)(19, "span", 419);
    \u0275\u0275text(20, " \u20B9 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 420);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_206_Template_input_ngModelChange_21_listener($event) {
      const item_r53 = \u0275\u0275restoreView(_r52).$implicit;
      \u0275\u0275twoWayBindingSet(item_r53.unitPrice, $event) || (item_r53.unitPrice = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_206_Template_input_ngModelChange_21_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calculateInvoiceTotals());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 20)(23, "select", 421);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_206_Template_select_ngModelChange_23_listener($event) {
      const item_r53 = \u0275\u0275restoreView(_r52).$implicit;
      \u0275\u0275twoWayBindingSet(item_r53.gst, $event) || (item_r53.gst = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_206_Template_select_ngModelChange_23_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calculateInvoiceTotals());
    });
    \u0275\u0275elementStart(24, "option", 270);
    \u0275\u0275text(25, "0%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 270);
    \u0275\u0275text(27, "5%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 270);
    \u0275\u0275text(29, "12%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 270);
    \u0275\u0275text(31, "18%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 270);
    \u0275\u0275text(33, "28%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "span", 422);
    \u0275\u0275text(35, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 280)(37, "p", 423);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(40, Vendors_For_206_Conditional_40_Template, 3, 4, "p", 424);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(41, Vendors_For_206_Conditional_41_Template, 3, 0, "button", 425)(42, Vendors_For_206_Conditional_42_Template, 1, 0, "div", 426);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r53 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("grid-template-columns", ctx_r1.hasLaborItems() ? "130px 1fr 60px 70px 100px 80px 90px 32px" : "130px 1fr 60px 100px 80px 90px 32px");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r53.type);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", item_r53.description);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", item_r53.quantity);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasLaborItems() ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r53.unitPrice);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r53.gst);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 5);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 12);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 18);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", 28);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(39, 16, item_r53.total || 0, "1.0-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r53.gstAmount > 0 ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.invoiceForm.items.length > 1 ? 41 : 42);
  }
}
function Vendors_Conditional_214_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 430)(1, "span", 431);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 432);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const gb_r57 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" TAX @ ", gb_r57.rate, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(5, 2, gb_r57.amount, "1.0-2"), " ");
  }
}
function Vendors_Conditional_214_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 111);
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_214_For_2_Template, 6, 5, "div", 430, _forTrack4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.invoiceForm.gstBreakdown);
  }
}
function Vendors_Conditional_231_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 275);
    \u0275\u0275text(1, " progress_activity ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving... ");
  }
}
function Vendors_Conditional_232_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1, " send ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Submit Invoice ");
  }
}
function Vendors_Conditional_234_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 451);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const svc_r59 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", svc_r59, " ");
  }
}
function Vendors_Conditional_234_Conditional_45_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 455)(1, "span", 456);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 457);
    \u0275\u0275text(4, "download");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r60 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", file_r60, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFileName(file_r60), " ");
  }
}
function Vendors_Conditional_234_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "p", 444);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 454);
    \u0275\u0275repeaterCreate(4, Vendors_Conditional_234_Conditional_45_For_5_Template, 5, 2, "a", 455, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Documents (", ctx_r1.selectedVendor.contract_files.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.selectedVendor.contract_files);
  }
}
function Vendors_Conditional_234_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 433)(1, "h3", 144);
    \u0275\u0275text(2, "Vendor Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 434)(4, "span", 435);
    \u0275\u0275listener("click", function Vendors_Conditional_234_Template_span_click_4_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editVendorDetail(ctx_r1.selectedVendor));
    });
    \u0275\u0275elementStart(5, "span", 124);
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 435);
    \u0275\u0275listener("click", function Vendors_Conditional_234_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showVendorDetailModal = false);
    });
    \u0275\u0275elementStart(8, "span", 124);
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 436)(11, "div", 437)(12, "div", 222)(13, "h3", 438);
    \u0275\u0275text(14, "Contact Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 439)(16, "span", 440);
    \u0275\u0275text(17, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 441);
    \u0275\u0275text(19, "Verified");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 442)(21, "div", 443)(22, "p", 444);
    \u0275\u0275text(23, "SPOC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 445);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 446);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 447);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 443)(31, "p", 444);
    \u0275\u0275text(32, "GST");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p", 448);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 444);
    \u0275\u0275text(36, "PAN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 448);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 449)(40, "p", 444);
    \u0275\u0275text(41, "Skills");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 450);
    \u0275\u0275repeaterCreate(43, Vendors_Conditional_234_For_44_Template, 2, 1, "span", 451, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(45, Vendors_Conditional_234_Conditional_45_Template, 6, 1, "div", 105);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 452)(47, "button", 453);
    \u0275\u0275listener("click", function Vendors_Conditional_234_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showVendorDetailModal = false);
    });
    \u0275\u0275text(48, " Close ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(25);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.spoc.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.spoc.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.spoc.phone);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.kyc.gst || "\u2014", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.kyc.pan || "\u2014", " ");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.selectedVendor.skill);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedVendor.contract_files.length > 0 ? 45 : -1);
  }
}
function Vendors_Conditional_277_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 275);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving... ");
  }
}
function Vendors_Conditional_278_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Submit Audit ");
  }
}
function Vendors_Conditional_297_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 458);
    \u0275\u0275text(2, "Total Billed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 459);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(5, 1, ctx_r1.totalBilled));
  }
}
function Vendors_For_300_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 155)(1, "div", 256)(2, "div", 460)(3, "span", 461);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "p", 462);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 463);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 464)(11, "p", 465);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 466);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 467);
    \u0275\u0275listener("click", function Vendors_For_300_Template_button_click_15_listener() {
      const inv_r62 = \u0275\u0275restoreView(_r61).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewInvoice(inv_r62));
    });
    \u0275\u0275elementStart(16, "span", 468);
    \u0275\u0275text(17, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " View Invoice ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const inv_r62 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", inv_r62.status === "Paid" ? "bg-green-100" : inv_r62.status === "Cancelled" ? "bg-red-100" : "bg-amber-100");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", inv_r62.status === "Paid" ? "text-green-600" : inv_r62.status === "Cancelled" ? "text-red-600" : "text-amber-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r62.status === "Paid" ? "check_circle" : inv_r62.status === "Cancelled" ? "cancel" : "pending", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(inv_r62.invoice_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(inv_r62.invoice_date));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", (+inv_r62.grand_total).toLocaleString("en-IN"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", inv_r62.status === "Paid" ? "bg-green-100 text-green-700" : inv_r62.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r62.status, " ");
  }
}
function Vendors_ForEmpty_301_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 156)(1, "span", 199);
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 7);
    \u0275\u0275text(4, "No billing records found.");
    \u0275\u0275elementEnd()();
  }
}
var Vendors = class _Vendors {
  projectId = "";
  projectdata = null;
  _pendingEditVendor = null;
  vendorService = inject(VendorsServices);
  laborService = inject(VendorsLaborServices);
  invoiceService = inject(VendorInvoiceService);
  auditService = inject(VendorAuditService);
  skillMasterService = inject(SkillMasterServices);
  projectService = inject(ProjectService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  allTasks = [];
  skillOptions = [];
  selectedInvoice = null;
  showSettlementCards = false;
  selectedSettlementType = "work_poc";
  milestones = [];
  subMilestones = [];
  milestoneTasks = [];
  selectedMilestoneId = null;
  selectedSubMilestoneId = null;
  selectedMilestoneIds = [];
  selectedSubMilestoneIds = [];
  selectedTaskIds = [];
  settlementCompletion = null;
  isLoadingMilestones = false;
  isLoadingSubMilestones = false;
  showAddModal = false;
  showInvoiceModal = false;
  showVendorDetailModal = false;
  payInvoiceeModal = false;
  showCancelInvoiceModal = false;
  showAuditModal = false;
  showBillingModal = false;
  showLaborModal = false;
  showAddLaborForm = false;
  currentStep = 1;
  stepError = "";
  fileError = "";
  contractFiles = [];
  vendorSteps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "KYC & Address" },
    { num: 3, label: "Budget" },
    { num: 4, label: "Documents" }
  ];
  paymentForm = {
    amount: null,
    project_id: null,
    mode: "",
    reference: "",
    clearance_date: ""
  };
  paymentError = "";
  isProcessingPayment = false;
  isEditMode = false;
  editingVendorId = null;
  isSaving = false;
  isDeleting = false;
  isSavingLabor = false;
  isSavingAudit = false;
  isSavingInvoice = false;
  isCancellingInvoice = false;
  laborError = "";
  viewingVendorId = null;
  selectedVendor = void 0;
  vendors = [];
  projects = [];
  stats = { totalActive: 0, pendingPayments: "\u20B90", compliantPartners: "0%" };
  activities = [];
  laborWorkers = [];
  laborStats = {
    totalPersonnel: 0,
    onSite: 0,
    remaining: 0,
    activePersonnel: 0,
    skillCompliance: "0%",
    skillComposition: []
  };
  laborLoading = false;
  invoices = [];
  vendorAudits = [];
  newLabor = this.defaultLabor();
  newVendor = this.defaultVendor();
  invoiceForm = this.defaultInvoice();
  auditForm = { quality: 5, timeliness: 5, safety: 5, observations: "" };
  editingLaborId = null;
  editLaborForm = {};
  team = [{ name: "All Members" }, { name: "Marcus Thorne" }, { name: "Sarah Chen" }];
  selectedMember = "All Members";
  statusOptions = [
    { value: "active", label: "Active" },
    { value: "on_site", label: "On Site" },
    { value: "off_duty", label: "Off Duty" },
    { value: "inactive", label: "Inactive" }
  ];
  sumRate = (acc, w) => acc + (Number(w.daily_rate) || 0) * (w.labor_count || 0);
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.viewingVendorId = params.get("id");
      this.syncSelectedVendor();
    });
    this.getSkill();
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
      this.syncSelectedVendor();
    });
    this.vendorService.stats$.subscribe((s) => this.stats = s);
    this.vendorService.activities$.subscribe((a) => this.activities = a);
    this.laborService.workers$.subscribe((w) => this.laborWorkers = w);
    this.laborService.stats$.subscribe((s) => this.laborStats = s);
    this.laborService.loading$.subscribe((l) => this.laborLoading = l);
    this.invoiceService.invoices$.subscribe((inv) => this.invoices = inv);
    this.auditService.audits$.subscribe((audits) => this.vendorAudits = audits);
    this.loadProjects();
  }
  loadVendorSubData(vendorId) {
    this.invoiceService.loadInvoices(vendorId);
    this.auditService.loadAudits(vendorId);
    this.laborService.loadLaborForVendor(vendorId);
    const projectId = this.selectedVendor?.project_id;
    if (projectId) {
      this.loadProjectTasks(projectId);
      this.projectService.getProjectById(projectId).subscribe({
        next: (res) => {
          this.projectdata = res?.data ?? null;
          this.setProjectMilestones(res?.data?.milestones ?? []);
          this.updateSettlementCompletionFromProject();
        },
        error: (err) => {
          this.projectdata = null;
          console.error("Project load failed", err);
        }
      });
    } else {
      this.allTasks = [];
      this.projectdata = null;
      this.setProjectMilestones([]);
    }
  }
  getSkill() {
    this.skillMasterService.loadSkills().subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data)) {
          this.skillOptions = res.data.map((s) => ({
            value: s.skill_name?.toLowerCase().replace(/\s+/g, "_") ?? s.id,
            label: s.skill_name ?? s.name
          }));
          if (this._pendingEditVendor) {
            this.editVendorDetail(this._pendingEditVendor);
            this._pendingEditVendor = null;
          }
        }
      }
    });
  }
  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = Array.isArray(res?.data) ? res.data : [];
      },
      error: (err) => console.error("Project list load failed", err)
    });
  }
  getProjectById() {
    if (!this.projectId)
      return;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.projectdata = res?.data ?? null;
      },
      error: (err) => console.error("Project load failed", err)
    });
  }
  getProject(projectEvent) {
    const projectIdValue = typeof projectEvent === "object" && projectEvent !== null && "target" in projectEvent ? projectEvent.target.value : projectEvent;
    const selectedId = Number(projectIdValue);
    this.milestones = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.selectedMilestoneId = null;
    this.selectedSubMilestoneId = null;
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    if (selectedId) {
      this.showSettlementCards = true;
      this.paymentForm.project_id = selectedId;
      this.loadProjectTasks(selectedId);
      this.isLoadingMilestones = true;
      this.projectService.getProjectById(selectedId).subscribe({
        next: (res) => {
          this.projectdata = res?.data ?? null;
          this.setProjectMilestones(res?.data?.milestones ?? []);
          this.updateSettlementCompletionFromProject();
          this.isLoadingMilestones = false;
        },
        error: (err) => {
          this.projectdata = null;
          this.isLoadingMilestones = false;
          console.error("Selected project load failed", err);
        }
      });
    } else {
      this.showSettlementCards = false;
      this.projectdata = null;
      this.allTasks = [];
      this.setProjectMilestones([]);
    }
  }
  syncSelectedVendor() {
    if (!this.viewingVendorId) {
      this.selectedVendor = void 0;
      return;
    }
    const local = this.vendorService.getVendorById(this.viewingVendorId);
    if (local) {
      this.selectedVendor = local;
      this.loadVendorSubData(this.viewingVendorId);
    } else {
      this.vendorService.getVendorByIdFromApi(this.viewingVendorId).subscribe({
        next: (v) => {
          this.selectedVendor = v;
          this.loadVendorSubData(this.viewingVendorId);
        },
        error: () => this.router.navigate(["/master/resources/vendors"])
      });
    }
  }
  get filteredVendors() {
    if (this.selectedMember === "All Members")
      return this.vendors;
    return this.vendors.filter((v) => v.assignee === this.selectedMember);
  }
  get availableSubMilestones() {
    const allMilestones = this.projectdata?.milestones ?? [];
    if (this.selectedMilestoneIds.length === 0) {
      return [];
    }
    return allMilestones.filter((m) => this.selectedMilestoneIds.includes(Number(m.parent_id)));
  }
  get availableTaskOptions() {
    if (this.selectedSubMilestoneIds.length === 0) {
      return [];
    }
    return (this.allTasks ?? []).filter((t) => this.selectedSubMilestoneIds.includes(Number(t.milestone_id)));
  }
  get isSettlementCompletionEditable() {
    return this.selectedSettlementType === "work_poc";
  }
  get settlementCompletionLabel() {
    if (this.selectedSettlementType === "work_poc")
      return "Work POC % Complete";
    if (this.selectedSettlementType === "milestone")
      return "Milestone % Complete";
    return "Lump Sum % Complete";
  }
  loadProjectTasks(projectId) {
    this.projectService.getProjectTasks(projectId).subscribe({
      next: (res) => {
        this.allTasks = res?.data || [];
        this.syncSelectedTasksWithOptions();
      },
      error: (err) => {
        this.allTasks = [];
        console.error("Task load failed", err);
      }
    });
  }
  setProjectMilestones(milestones) {
    const allMilestones = Array.isArray(milestones) ? milestones : [];
    this.milestones = allMilestones.filter((m) => !m.parent_id);
    this.subMilestones = [];
    this.milestoneTasks = [];
  }
  updateSettlementCompletionFromProject() {
    const fieldMap = {
      work_poc: "work_poc_completion",
      milestone: "milestone_completion",
      lumpsum: "lumpsum_completion"
    };
    const rawValue = this.projectdata?.[fieldMap[this.selectedSettlementType]];
    this.settlementCompletion = rawValue == null || rawValue === "" ? null : Number(rawValue);
  }
  getItemProgress(item) {
    const rawProgress = item?.progress ?? item?.completion ?? item?.percent_complete ?? item?.percentage;
    if (rawProgress != null && rawProgress !== "") {
      const progress = Number(rawProgress);
      return Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : null;
    }
    const status = String(item?.status ?? "").toLowerCase().replace(/\s+/g, "_");
    if (status === "completed")
      return 100;
    if (status === "in_progress" || status === "review")
      return 50;
    if (status === "pending" || status === "to_do" || status === "on_hold")
      return 0;
    return null;
  }
  averageProgress(items) {
    const values = items.map((item) => this.getItemProgress(item)).filter((value) => value !== null);
    if (values.length === 0)
      return null;
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }
  updateSettlementCompletionFromSelection() {
    const selectedTasks = this.allTasks.filter((task) => this.selectedTaskIds.includes(Number(task.id)));
    const selectedSubMilestones = this.availableSubMilestones.filter((sm) => this.selectedSubMilestoneIds.includes(Number(sm.id)));
    const selectedMilestones = this.milestones.filter((m) => this.selectedMilestoneIds.includes(Number(m.id)));
    const progress = this.averageProgress(selectedTasks) ?? this.averageProgress(selectedSubMilestones) ?? this.averageProgress(selectedMilestones);
    if (progress != null) {
      this.settlementCompletion = progress;
    } else {
      this.updateSettlementCompletionFromProject();
    }
  }
  onMilestoneMultiSelect() {
    this.selectedMilestoneIds = this.selectedMilestoneIds.map((id) => Number(id));
    const allowedSubIds = this.availableSubMilestones.map((m) => Number(m.id));
    this.selectedSubMilestoneIds = this.selectedSubMilestoneIds.filter((id) => allowedSubIds.includes(Number(id)));
    this.syncSelectedTasksWithOptions();
    this.updateSettlementCompletionFromSelection();
  }
  onSubMilestoneMultiSelect() {
    this.selectedSubMilestoneIds = this.selectedSubMilestoneIds.map((id) => Number(id));
    this.syncSelectedTasksWithOptions();
    this.updateSettlementCompletionFromSelection();
  }
  onTaskMultiSelect() {
    this.selectedTaskIds = this.selectedTaskIds.map((id) => Number(id));
    this.updateSettlementCompletionFromSelection();
  }
  syncSelectedTasksWithOptions() {
    const allowedTaskIds = this.availableTaskOptions.map((task) => Number(task.id));
    this.selectedTaskIds = this.selectedTaskIds.filter((id) => allowedTaskIds.includes(Number(id)));
  }
  onMilestoneSelect(milestoneId) {
    this.selectedMilestoneId = milestoneId;
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.selectedSubMilestoneId = null;
    this.isLoadingSubMilestones = true;
    this.subMilestones = (this.projectdata?.milestones ?? []).filter((m) => m.parent_id === milestoneId);
    this.isLoadingSubMilestones = false;
  }
  onSubMilestoneSelect(subMilestone) {
    this.selectedSubMilestoneId = subMilestone.id;
    if (subMilestone.amount) {
      this.paymentForm.amount = Number(subMilestone.amount);
    }
    this.milestoneTasks = (this.allTasks ?? []).filter((t) => t.milestone_id === subMilestone.id);
  }
  onSettlementTypeChange(type) {
    this.selectedSettlementType = type;
    this.selectedMilestoneId = null;
    this.selectedSubMilestoneId = null;
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.updateSettlementCompletionFromProject();
    if (type === "lumpsum") {
      this.paymentForm.amount = null;
    }
  }
  openVendorDetail(vendor) {
    this.router.navigate(["/master/resources/vendors", vendor.id]);
  }
  closeDetail() {
    this.laborService.clearWorkers();
    this.invoiceService.clearInvoices();
    this.auditService.clearAudits();
    this.projectdata = null;
    this.router.navigate(["/master/resources/vendors"]);
  }
  getFileName(filePath) {
    return filePath.split("/").pop() ?? filePath;
  }
  openAddModal() {
    this.isEditMode = false;
    this.editingVendorId = null;
    this.newVendor = this.defaultVendor();
    this.contractFiles = [];
    this.stepError = "";
    this.fileError = "";
    this.currentStep = 1;
    this.showAddModal = true;
  }
  editVendorDetail(vendor) {
    const v = vendor ?? this.selectedVendor;
    if (!v)
      return;
    if (this.skillOptions.length === 0) {
      this._pendingEditVendor = v;
      return;
    }
    this.isEditMode = true;
    this.editingVendorId = v.id;
    this.currentStep = 1;
    this.stepError = "";
    this.fileError = "";
    this.contractFiles = [];
    const rawSkills = Array.isArray(v.skill) ? [...v.skill] : v.skill ? String(v.skill).split(",").map((s) => s.trim()).filter(Boolean) : [];
    const normalizedSkills = rawSkills.map((raw) => {
      const match = this.skillOptions.find((opt) => opt.label.toLowerCase() === raw.toLowerCase() || opt.value.toLowerCase() === raw.toLowerCase() || opt.label.toLowerCase().replace(/\s+/g, "_") === raw.toLowerCase());
      return match ? match.label : raw;
    });
    this.newVendor = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      spoc: { name: v.spoc?.name ?? "", phone: v.spoc?.phone ?? "" },
      kyc: { gst: v.kyc?.gst ?? "", pan: v.kyc?.pan ?? "" },
      address: { street: v.address?.street ?? "", pincode: v.address?.pincode ?? "" },
      budget: String(v.budget_allocation ?? ""),
      skill: normalizedSkills
    };
    this.showVendorDetailModal = false;
    this.showAddModal = true;
  }
  nextStep() {
    this.stepError = "";
    if (this.currentStep === 1) {
      if (!this.newVendor.name?.trim()) {
        this.stepError = "Vendor Legal Name is required.";
        return;
      }
      if (!this.newVendor.spoc.name?.trim()) {
        this.stepError = "SPOC Name is required.";
        return;
      }
      if (!this.newVendor.spoc.phone?.trim() || this.newVendor.spoc.phone.length < 10) {
        this.stepError = "SPOC Phone must be 10 digits.";
        return;
      }
      if (!this.newVendor.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newVendor.email)) {
        this.stepError = "Enter a valid official email address.";
        return;
      }
      if (!this.newVendor.phone?.trim() || this.newVendor.phone.length < 10) {
        this.stepError = "Official phone must be 10 digits.";
        return;
      }
    }
    if (this.currentStep === 2) {
      const gst = this.newVendor.kyc.gst?.trim();
      const pan = this.newVendor.kyc.pan?.trim();
      if (!gst && !pan) {
        this.stepError = "At least one of GST No. or PAN Card No. is required.";
        return;
      }
      if (gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst)) {
        this.stepError = "Invalid GST format. Expected: 22AAAAA0000A1Z5";
        return;
      }
      if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
        this.stepError = "Invalid PAN format. Expected: ABCDE1234F";
        return;
      }
      if (!this.newVendor.address.street?.trim()) {
        this.stepError = "Physical address is required.";
        return;
      }
      if (!this.newVendor.address.pincode?.trim() || this.newVendor.address.pincode.length < 6) {
        this.stepError = "Enter a valid 6-digit pincode.";
        return;
      }
    }
    if (this.currentStep === 3) {
      if (!this.newVendor.budget?.toString().trim()) {
        this.stepError = "Budget allocation is required.";
        return;
      }
      if (!this.newVendor.skill || this.newVendor.skill.length === 0) {
        this.stepError = "At least one skill is required.";
        return;
      }
    }
    if (this.currentStep < 4)
      this.currentStep++;
  }
  prevStep() {
    this.stepError = "";
    if (this.currentStep > 1)
      this.currentStep--;
  }
  addVendor() {
    if (this.isSaving)
      return;
    this.stepError = "";
    this.isEditMode ? this.updateVendorData() : this.createVendorData();
  }
  createVendorData() {
    const fd = new FormData();
    fd.append("vendorLegalName", this.newVendor.name);
    fd.append("spocName", this.newVendor.spoc.name);
    fd.append("spocPhone", this.newVendor.spoc.phone);
    fd.append("officialEmail", this.newVendor.email);
    fd.append("officialPhone", this.newVendor.phone);
    fd.append("gstNo", this.newVendor.kyc.gst ?? "");
    fd.append("panCardNo", this.newVendor.kyc.pan ?? "");
    fd.append("physicalAddress", this.newVendor.address.street);
    fd.append("pincode", this.newVendor.address.pincode);
    fd.append("budgetAllocation", this.newVendor.budget);
    fd.append("skill", Array.isArray(this.newVendor.skill) ? this.newVendor.skill.join(", ") : this.newVendor.skill);
    if (this.projectId)
      fd.append("project_id", String(this.projectId));
    this.contractFiles.forEach((file) => fd.append("contractFiles", file));
    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.currentStep = 1;
        this.contractFiles = [];
      },
      error: (err) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? "Vendor onboard failed. Please try again.";
      }
    });
  }
  updateVendorData() {
    if (!this.editingVendorId)
      return;
    const fd = new FormData();
    fd.append("name", this.newVendor.name);
    fd.append("spoc_name", this.newVendor.spoc.name);
    fd.append("spoc_phone", this.newVendor.spoc.phone);
    fd.append("official_email", this.newVendor.email);
    fd.append("official_phone", this.newVendor.phone);
    fd.append("gst_no", this.newVendor.kyc.gst?.toUpperCase() || "");
    fd.append("pan_card_no", this.newVendor.kyc.pan?.toUpperCase() || "");
    fd.append("physical_address", this.newVendor.address.street);
    fd.append("pincode", this.newVendor.address.pincode);
    fd.append("budget_allocation", String(parseFloat(String(this.newVendor.budget).replace(/[^0-9.]/g, "")) || 0));
    fd.append("skill", Array.isArray(this.newVendor.skill) ? this.newVendor.skill.join(", ") : this.newVendor.skill);
    this.contractFiles.forEach((file) => fd.append("contractFiles", file));
    this.isSaving = true;
    this.vendorService.updateVendor(this.editingVendorId, fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.isEditMode = false;
        this.editingVendorId = null;
        this.currentStep = 1;
        this.contractFiles = [];
        if (this.selectedVendor) {
          const updated = this.vendorService.getVendorById(this.selectedVendor.id);
          if (updated)
            this.selectedVendor = updated;
        }
      },
      error: (err) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? "Update failed. Please try again.";
      }
    });
  }
  toggleSkill(skillLabel) {
    if (!Array.isArray(this.newVendor.skill)) {
      this.newVendor.skill = [];
    }
    const idx = this.newVendor.skill.findIndex((s) => s.toLowerCase() === skillLabel.toLowerCase());
    if (idx === -1) {
      this.newVendor.skill.push(skillLabel);
    } else {
      this.newVendor.skill.splice(idx, 1);
    }
  }
  isSkillSelected(skillLabel) {
    if (!Array.isArray(this.newVendor.skill))
      return false;
    return this.newVendor.skill.some((s) => s.toLowerCase() === skillLabel.toLowerCase());
  }
  deleteVendor(id) {
    if (this.isDeleting)
      return;
    if (!confirm("Are you sure you want to remove this vendor?"))
      return;
    this.isDeleting = true;
    this.vendorService.deleteVendor(id).subscribe({
      next: () => {
        this.isDeleting = false;
      },
      error: (err) => {
        this.isDeleting = false;
        alert("Delete failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  onContractFilesSelected(event) {
    const input = event.target;
    if (!input.files)
      return;
    this.fileError = "";
    const MAX_SIZE = 10 * 1024 * 1024;
    const ALLOWED = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png"
    ];
    const incoming = Array.from(input.files);
    const combined = [...this.contractFiles, ...incoming];
    if (combined.length > 10) {
      this.fileError = "Maximum 10 files allowed.";
      return;
    }
    for (const f of incoming) {
      if (!ALLOWED.includes(f.type)) {
        this.fileError = `"${f.name}" has an unsupported format.`;
        return;
      }
      if (f.size > MAX_SIZE) {
        this.fileError = `"${f.name}" exceeds the 10 MB limit (${this.getFileSize(f.size)}).`;
        return;
      }
    }
    this.contractFiles = combined;
    input.value = "";
  }
  removeContractFile(index) {
    this.contractFiles = this.contractFiles.filter((_, i) => i !== index);
    this.fileError = "";
  }
  getFileSize(bytes) {
    if (bytes < 1024)
      return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  getFileIcon(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf")
      return "picture_as_pdf";
    if (ext === "doc" || ext === "docx")
      return "description";
    if (["jpg", "jpeg", "png"].includes(ext))
      return "image";
    return "attach_file";
  }
  getFileIconBg(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf")
      return "bg-red-100 dark:bg-red-900/30";
    if (ext === "doc" || ext === "docx")
      return "bg-blue-100 dark:bg-blue-900/30";
    if (["jpg", "jpeg", "png"].includes(ext))
      return "bg-green-100 dark:bg-green-900/30";
    return "bg-surface-container";
  }
  getFileIconColor(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf")
      return "text-red-600";
    if (ext === "doc" || ext === "docx")
      return "text-blue-600";
    if (["jpg", "jpeg", "png"].includes(ext))
      return "text-green-600";
    return "text-outline";
  }
  openSubmission() {
    if (!this.selectedVendor)
      return;
    let started = false;
    const sub = this.invoiceService.loading$.subscribe((loading) => {
      if (started && !loading) {
        this.invoiceForm = this.defaultInvoice();
        this.showInvoiceModal = true;
        sub.unsubscribe();
      }
    });
    started = true;
    this.invoiceService.loadInvoices(this.selectedVendor.id);
  }
  onTypeChange(item) {
    if (item.type !== "labor")
      item.hours = 0;
    this.calculateInvoiceTotals();
  }
  hasLaborItems() {
    return this.invoiceForm.items.some((item) => item.type === "labor");
  }
  addInvoiceItem() {
    this.invoiceForm.items.push({
      type: "",
      description: "",
      quantity: 1,
      hours: 0,
      unitPrice: 0,
      gst: 18,
      gstAmount: 0,
      baseAmount: 0,
      total: 0
    });
  }
  removeInvoiceItem(index) {
    if (this.invoiceForm.items.length > 1) {
      this.invoiceForm.items.splice(index, 1);
      this.calculateInvoiceTotals();
    }
  }
  calculateInvoiceTotals() {
    let subtotal = 0;
    let totalGST = 0;
    const gstMap = {};
    this.invoiceForm.items.forEach((item) => {
      const qty = Number(item.quantity) || 0;
      const rate = Number(item.unitPrice) || 0;
      const hours = Number(item.hours) || 0;
      const gst = Number(item.gst) || 0;
      item.baseAmount = item.type === "labor" ? qty * hours * rate : qty * rate;
      item.gstAmount = item.baseAmount * gst / 100;
      item.total = item.baseAmount + item.gstAmount;
      subtotal += item.baseAmount;
      totalGST += item.gstAmount;
      if (item.gstAmount > 0) {
        gstMap[gst] = (gstMap[gst] || 0) + item.gstAmount;
      }
    });
    this.invoiceForm.subtotal = subtotal;
    this.invoiceForm.taxAmount = totalGST;
    this.invoiceForm.grandTotal = subtotal + totalGST;
    this.invoiceForm.gstBreakdown = Object.entries(gstMap).map(([rateStr, amount]) => ({ rate: Number(rateStr), amount })).sort((a, b) => a.rate - b.rate);
  }
  submitInvoice() {
    debugger;
    if (this.isSavingInvoice || !this.selectedVendor)
      return;
    this.isSavingInvoice = true;
    const payload = {
      project_id: this.invoiceForm.project_id,
      invoice_number: this.invoiceForm.number,
      invoice_date: this.invoiceForm.date,
      items: this.invoiceForm.items,
      subtotal: this.invoiceForm.subtotal,
      tax_rate: this.invoiceForm.taxRate ?? 0,
      tax_amount: this.invoiceForm.taxAmount,
      grand_total: this.invoiceForm.grandTotal
    };
    this.invoiceService.createInvoice(this.selectedVendor.id, payload).subscribe({
      next: () => {
        this.isSavingInvoice = false;
        this.showInvoiceModal = false;
        this.vendorService.loadStats();
      },
      error: (err) => {
        this.isSavingInvoice = false;
        alert("Invoice submission failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  payInvoice(inv) {
    this.selectedInvoice = inv;
    const selectedProjectId = this.selectedVendor?.project_id ? Number(this.selectedVendor.project_id) : null;
    this.paymentForm = {
      amount: Number(inv.grand_total) || null,
      project_id: selectedProjectId,
      mode: "",
      reference: "",
      clearance_date: ""
    };
    this.paymentError = "";
    this.isProcessingPayment = false;
    this.payInvoiceeModal = true;
    if (selectedProjectId) {
      this.getProject(selectedProjectId);
    }
  }
  closePayModal() {
    this.payInvoiceeModal = false;
    this.selectedInvoice = null;
    this.paymentForm = { amount: null, project_id: null, mode: "", reference: "", clearance_date: "" };
    this.paymentError = "";
    this.isProcessingPayment = false;
  }
  onPaymentModeChange(mode) {
    this.paymentForm.mode = mode;
    if (mode === "Cash") {
      this.paymentForm.reference = "";
      this.paymentForm.clearance_date = "";
    }
    if (mode !== "Cheque") {
      this.paymentForm.clearance_date = "";
    }
  }
  confirmPayment() {
    if (!this.selectedInvoice || this.isProcessingPayment)
      return;
    this.paymentError = "";
    if (!this.paymentForm.amount || this.paymentForm.amount <= 0) {
      this.paymentError = "Please enter a valid amount.";
      return;
    }
    if (!this.paymentForm.mode) {
      this.paymentError = "Please select a payment mode.";
      return;
    }
    if (this.paymentForm.mode === "Cheque" && !this.paymentForm.clearance_date) {
      this.paymentError = "Please select cheque clearance date.";
      return;
    }
    this.isProcessingPayment = true;
    this.invoiceService.updateStatus(this.selectedInvoice.id, "Paid").subscribe({
      next: () => {
        this.isProcessingPayment = false;
        this.closePayModal();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err) => {
        this.isProcessingPayment = false;
        this.paymentError = err?.error?.message ?? "Payment failed. Please try again.";
      }
    });
  }
  openCancelInvoiceDialog(inv) {
    this.selectedInvoice = inv;
    this.showCancelInvoiceModal = true;
  }
  closeCancelInvoiceDialog() {
    this.showCancelInvoiceModal = false;
    this.selectedInvoice = null;
  }
  confirmCancelInvoice() {
    if (!this.selectedInvoice || this.isCancellingInvoice)
      return;
    this.isCancellingInvoice = true;
    this.invoiceService.updateStatus(this.selectedInvoice.id, "Cancelled").subscribe({
      next: () => {
        this.isCancellingInvoice = false;
        this.closeCancelInvoiceDialog();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err) => {
        this.isCancellingInvoice = false;
        alert("Cancel failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  viewInvoice(inv) {
    const vendor = this.selectedVendor;
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "\u2014";
      const d = new Date(dateStr);
      if (isNaN(d.getTime()))
        return dateStr;
      const dd = String(d.getDate()).padStart(2, "0");
      const mmm = d.toLocaleString("en-US", { month: "short" });
      const yyyy = d.getFullYear();
      return `${dd}/${mmm}/${yyyy}`;
    };
    let invoiceItems = [];
    try {
      invoiceItems = Array.isArray(inv.items) ? inv.items : JSON.parse(inv.items);
    } catch {
      invoiceItems = [];
    }
    const gstMap = {};
    invoiceItems.forEach((item) => {
      const gstRate = Number(item.gst) || 0;
      const gstAmt = Number(item.gstAmount) || 0;
      if (gstAmt > 0) {
        gstMap[gstRate] = (gstMap[gstRate] || 0) + gstAmt;
      }
    });
    const taxBreakdownRows = Object.entries(gstMap).sort(([a], [b]) => Number(a) - Number(b)).map(([rate, amount]) => `<div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
          <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
          <span style="font-weight:600;">\u20B9${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
        </div>`).join("");
    const hasLabor = invoiceItems.some((item) => item.type === "labor");
    const itemRows = invoiceItems.map((item) => {
      const isLabor = item.type === "labor";
      const typeLabel = item.type ? String(item.type).charAt(0).toUpperCase() + String(item.type).slice(1) : "\u2014";
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${typeLabel}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.description || "\u2014"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 0}</td>
        ${hasLabor ? `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${isLabor ? (item.hours || 0) + "h" : ""}</td>` : ""}
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">\u20B9${Number(item.unitPrice || 0).toLocaleString("en-IN")}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.gst || 0}%</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">\u20B9${Number(item.gstAmount || 0).toLocaleString("en-IN")}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">\u20B9${Number(item.total || 0).toLocaleString("en-IN")}</td>
      </tr>`;
    }).join("");
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Invoice ${inv.invoice_number}</title>
  <style>
    body { font-family: sans-serif; padding: 40px; color: #1e293b; }
    h1 { font-size: 24px; font-weight: 900; margin: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
    @media print { button { display: none !important; } }
  </style>
</head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <div>
      <h1>Tax Invoice</h1>
      <p style="color:#64748b;margin:4px 0 0;">${vendor?.name ?? ""}</p>
    </div>
    <div style="text-align:right;">
      <p style="font-weight:900;font-size:18px;margin:0;">${inv.invoice_number}</p>
      <p style="color:#64748b;margin:4px 0 0;">${this.formatDate(inv.invoice_date)}</p>
      <span style="display:inline-block;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;
        background:${inv.status === "Paid" ? "#dcfce7" : inv.status === "Cancelled" ? "#fee2e2" : "#fef3c7"};
        color:${inv.status === "Paid" ? "#15803d" : inv.status === "Cancelled" ? "#dc2626" : "#b45309"};margin-top:6px;">
        ${inv.status}
      </span>
    </div>
  </div>
  ${vendor ? `
  <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
    <p style="margin:0;font-weight:700;">Bill To: ${vendor.name}</p>
    <p style="margin:4px 0 0;color:#64748b;">${vendor.address?.street || ""} ${vendor.address?.pincode || ""}</p>
    <p style="margin:4px 0 0;color:#64748b;">GST: ${vendor.kyc?.gst || "\u2014"} | PAN: ${vendor.kyc?.pan || "\u2014"}</p>
  </div>` : ""}
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
        <th style="text-align:center;">Qty</th>
        ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ""}
        <th style="text-align:right;">Rate (\u20B9)</th>
        <th style="text-align:center;">Tax %</th>
        <th style="text-align:right;">Tax (\u20B9)</th>
        <th style="text-align:right;">Total (\u20B9)</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>
  <div style="margin-top:24px;max-width:340px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Subtotal (excl. Tax)</span>
      <span style="font-weight:700;">\u20B9${Number(inv.subtotal).toLocaleString("en-IN")}</span>
    </div>
    ${taxBreakdownRows}
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Total Tax</span>
      <span style="font-weight:700;">\u20B9${Number(inv.tax_amount).toLocaleString("en-IN")}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:12px 0;">
      <span style="font-weight:900;">Grand Total</span>
      <span style="color:#4f46e5;font-size:18px;font-weight:900;">\u20B9${Number(inv.grand_total).toLocaleString("en-IN")}</span>
    </div>
  </div>
  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()"
      style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body>
</html>`;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  }
  openBilling() {
    if (this.selectedVendor && this.invoices.length === 0) {
      this.invoiceService.loadInvoices(this.selectedVendor.id);
    }
    this.showBillingModal = true;
  }
  get totalBilled() {
    return this.invoices.reduce((acc, inv) => acc + Number(inv.grand_total), 0);
  }
  openAudit() {
    const latest = this.vendorAudits[0];
    this.auditForm = latest ? {
      quality: Number(latest.quality),
      timeliness: Number(latest.timeliness),
      safety: Number(latest.safety),
      observations: latest.observations ?? ""
    } : { quality: 5, timeliness: 5, safety: 5, observations: "" };
    this.showAuditModal = true;
  }
  get auditScore() {
    return Math.round((this.auditForm.quality + this.auditForm.timeliness + this.auditForm.safety) / 30 * 100);
  }
  submitAudit() {
    if (this.isSavingAudit || !this.selectedVendor)
      return;
    this.isSavingAudit = true;
    this.auditService.createAudit(this.selectedVendor.id, {
      quality: this.auditForm.quality,
      timeliness: this.auditForm.timeliness,
      safety: this.auditForm.safety,
      observations: this.auditForm.observations
    }).subscribe({
      next: (res) => {
        this.isSavingAudit = false;
        this.showAuditModal = false;
        if (this.selectedVendor && res.data?.composite_score != null) {
          this.selectedVendor.compliance_score = Math.round(res.data.composite_score);
        }
        this.vendorService.loadVendors();
      },
      error: (err) => {
        this.isSavingAudit = false;
        alert("Audit failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  openVendorDetailData() {
    this.showVendorDetailModal = true;
  }
  updateVendorStatus(status) {
    if (!this.selectedVendor)
      return;
    const statusKey = status.toLowerCase();
    this.vendorService.updateVendor(this.selectedVendor.id, { status: statusKey }).subscribe({
      next: () => {
        const updated = this.vendorService.getVendorById(this.selectedVendor.id);
        if (updated)
          this.selectedVendor = updated;
      },
      error: (err) => alert("Status update failed: " + (err?.error?.message ?? "Server error"))
    });
  }
  openLaborModal() {
    if (!this.selectedVendor)
      return;
    this.newLabor = this.defaultLabor();
    this.showAddLaborForm = false;
    this.laborError = "";
    this.editingLaborId = null;
    this.laborService.loadLaborForVendor(this.selectedVendor.id);
    this.showLaborModal = true;
  }
  closeLaborModal() {
    this.showLaborModal = false;
    this.showAddLaborForm = false;
    this.editingLaborId = null;
  }
  toggleAddLaborForm() {
    this.newLabor = this.defaultLabor();
    this.laborError = "";
    this.editingLaborId = null;
    this.showAddLaborForm = !this.showAddLaborForm;
  }
  submitLabor() {
    if (this.isSavingLabor || !this.selectedVendor)
      return;
    this.laborError = "";
    if (!this.newLabor.skill) {
      this.laborError = "Skill is required.";
      return;
    }
    const laborCount = Math.max(1, parseInt(this.newLabor.labor_count) || 1);
    const payload = {
      vendor_id: this.selectedVendor.id,
      skill: this.newLabor.skill,
      status: this.newLabor.status || "active",
      daily_rate: parseFloat(this.newLabor.daily_rate) || 0,
      labor_count: laborCount,
      assign_worker: this.newLabor.assign_worker || null
    };
    this.isSavingLabor = true;
    this.laborService.addWorker(payload).subscribe({
      next: () => {
        this.isSavingLabor = false;
        this.showAddLaborForm = false;
        this.newLabor = this.defaultLabor();
      },
      error: (err) => {
        this.isSavingLabor = false;
        this.laborError = err?.error?.message ?? "Failed to add worker.";
      }
    });
  }
  editLaborWorker(id) {
    const worker = this.laborWorkers.find((w) => w.id === id);
    if (!worker)
      return;
    this.editingLaborId = id;
    this.editLaborForm = {
      skill: worker.skillRaw,
      status: worker.status,
      daily_rate: worker.daily_rate,
      labor_count: worker.labor_count,
      assign_worker: worker.assign_worker ?? ""
    };
  }
  saveLaborEdit(id) {
    const payload = {
      skill: this.editLaborForm.skill,
      status: this.editLaborForm.status,
      daily_rate: parseFloat(this.editLaborForm.daily_rate) || 0,
      labor_count: Math.max(1, parseInt(this.editLaborForm.labor_count) || 1),
      assign_worker: this.editLaborForm.assign_worker ?? null
    };
    this.laborService.updateWorker(id, payload).subscribe({
      next: () => {
        this.editingLaborId = null;
      },
      error: (err) => alert("Update failed: " + (err?.error?.message ?? "Server error"))
    });
  }
  cancelLaborEdit() {
    this.editingLaborId = null;
  }
  deleteLaborWorker(id) {
    if (!confirm("Remove this worker?"))
      return;
    this.laborService.deleteWorker(id).subscribe({
      error: (err) => alert("Delete failed: " + (err?.error?.message ?? "Server error"))
    });
  }
  updateLaborStatus(worker, status) {
    this.laborService.updateWorker(worker.id, { status }).subscribe();
  }
  updateTaskStatus(task, statusRaw) {
    this.projectService.updateTask(task.id, { status: statusRaw }).subscribe();
  }
  deleteTask(taskId) {
    if (!confirm("Remove this task?"))
      return;
    this.projectService.deleteTask(taskId).subscribe({
      error: (err) => alert("Delete failed: " + (err?.error?.message ?? "Server error"))
    });
  }
  getSkillBarWidth(count) {
    const max = Math.max(...this.laborStats.skillComposition.map((s) => s.count), 1);
    return Math.round(count / max * 100);
  }
  getSkillBarColor(skill) {
    const colors = {
      "Masonry": "bg-blue-500",
      "Electrical": "bg-yellow-500",
      "Structural Steel": "bg-red-500",
      "Plumbing": "bg-green-500",
      "HVAC": "bg-purple-500",
      "Carpentry": "bg-orange-400",
      "Painting": "bg-pink-400",
      "Other": "bg-slate-400"
    };
    return colors[skill] ?? "bg-slate-400";
  }
  getTaskStatusColor(status) {
    const map = {
      "completed": "bg-green-100 text-green-700",
      "in_progress": "bg-blue-100 text-blue-700",
      "pending": "bg-amber-100 text-amber-700",
      "on_hold": "bg-slate-100 text-slate-500"
    };
    return map[status?.toLowerCase()] ?? "bg-slate-100 text-slate-500";
  }
  sanitizePhone(event, field) {
    const input = event.target;
    const cleaned = input.value.replace(/\D/g, "").slice(0, 10);
    input.value = cleaned;
    if (field === "spoc") {
      this.newVendor.spoc.phone = cleaned;
    } else {
      this.newVendor.phone = cleaned;
    }
  }
  defaultVendor() {
    return {
      name: "",
      email: "",
      phone: "",
      spoc: { name: "", phone: "" },
      kyc: { gst: "", pan: "" },
      address: { street: "", pincode: "" },
      budget: "",
      skill: []
    };
  }
  getInvoicePrefix() {
    const rawName = String(this.selectedVendor?.name ?? "");
    const letters = rawName.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase();
    const prefix = letters.padEnd(3, "X");
    return prefix === "XXX" ? "VND" : prefix;
  }
  generateInvoiceNumber() {
    const prefix = this.getInvoicePrefix();
    const existing = this.invoices || [];
    const regex = new RegExp("^(?:INV-)?" + prefix + "-(\\d{5})$", "i");
    const maxNum = existing.reduce((max, inv) => {
      const match = String(inv.invoice_number || "").match(regex);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    const nextNum = String(maxNum + 1).padStart(5, "0");
    return `INV-${prefix}-${nextNum}`;
  }
  onInvoiceDateChange(value) {
    if (!value)
      return;
    const date = new Date(value);
    this.invoiceForm.date = this.formatDate(date);
    this.invoiceForm.rawDate = value;
  }
  defaultInvoice() {
    const today = /* @__PURE__ */ new Date();
    return {
      number: this.generateInvoiceNumber(),
      date: this.formatDate(today),
      rawDate: today.toISOString().split("T")[0],
      items: [{
        type: "",
        description: "",
        quantity: 1,
        hours: 0,
        unitPrice: 0,
        gst: 18,
        baseAmount: 0,
        gstAmount: 0,
        total: 0
      }],
      subtotal: 0,
      taxAmount: 0,
      taxRate: 0,
      grandTotal: 0,
      gstBreakdown: []
    };
  }
  formatDate(dateInput) {
    if (!dateInput)
      return "\u2014";
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime()))
      return String(dateInput || "\u2014");
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = d.toLocaleString("en-US", { month: "short" });
    const yyyy = d.getFullYear();
    return `${dd}/${mmm}/${yyyy}`;
  }
  defaultLabor() {
    return { skill: "", status: "active", daily_rate: "", labor_count: 1, assign_worker: "" };
  }
  static \u0275fac = function Vendors_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Vendors)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Vendors, selectors: [["app-vendors"]], inputs: { projectId: "projectId" }, standalone: false, decls: 309, vars: 98, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "space-y-8", "animate-in", "slide-in-from-right", "duration-500"], ["backdropClass", "bg-black/50", "panelClass", "bg-white rounded-2xl p-6", "title", "Vendor Invoice Payment", "subtitle", "Pay selected vendor invoice", "cancelLabel", "Cancel", "primaryLabel", "Confirm Payment", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "primaryDisabled"], [1, "space-y-3"], [1, "bg-slate-50", "rounded-xl", "p-4", "space-y-2"], [1, "flex", "justify-between", "items-center"], [1, "text-xs", "text-slate-500"], [1, "font-bold", "text-sm"], [1, "font-semibold", "text-sm"], [1, "font-semibold", "text-sm", "text-amber-600"], [1, "flex", "justify-between", "items-center", "border-t", "border-slate-200", "pt-2", "mt-1"], [1, "text-xs", "font-black", "text-slate-600", "uppercase", "tracking-wide"], [1, "font-black", "text-base", "text-green-600"], [1, "bg-slate-50", "rounded-xl", "p-4", "space-y-4"], [1, "flex", "items-center", "text-[10px]"], [1, "font-black", "uppercase", "tracking-widest", "text-outline", "mr-2"], [1, "font-bold", "opacity-80"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [1, "block", "text-xs", "font-black", "uppercase", "tracking-wide", "text-slate-500", "mb-1"], [1, "text-red-500"], [1, "relative"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-sm", "font-bold", "text-slate-400"], ["type", "number", "min", "0", 1, "w-full", "pl-7", "pr-3", "py-2.5", "border", "border-slate-200", "rounded-xl", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-green-500/20", 3, "ngModelChange", "ngModel", "max", "placeholder"], [1, "text-[10px]", "text-slate-400", "mt-1"], [1, "w-full", "border", "border-slate-200", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-green-500/20", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "Bank Transfer"], ["value", "UPI"], ["value", "Cheque"], ["value", "Cash"], [1, "flex", "items-center", "gap-2", "bg-red-50", "border", "border-red-200", "px-4", "py-3", "rounded-xl"], ["size", "sm", "variant", "danger", "title", "Cancel Invoice", "subtitle", "This action will reject the invoice and cannot be undone.", "icon", "delete_forever", "cancelLabel", "Keep Invoice", "primaryLabel", "Cancel Invoice", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "primaryDisabled"], [1, "px-6", "py-5"], [1, "text-sm", "font-medium", "text-slate-600", "dark:text-slate-300"], ["maxWidth", "max-w-[798px]", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-[2rem] max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 my-4", 3, "closed", "open"], [1, "bg-gradient-to-br", "from-slate-800", "via-slate-900", "to-slate-950", "px-4", "sm:px-6", "py-4", "text-white", "relative", "shrink-0", "overflow-hidden"], [1, "absolute", "top-0", "right-0", "p-4", "opacity-5", "select-none", "pointer-events-none"], [1, "material-symbols-outlined", "text-[70px]"], [1, "flex", "justify-between", "items-start", "gap-4", "relative", "z-10"], [1, "min-w-0"], [1, "text-2xl", "sm:text-xl", "font-black", "tracking-tight", "mt-1", "truncate"], [1, "text-[11px]", "sm:text-xs", "text-slate-400", "font-medium", "mt-0.5", "break-words"], [1, "p-2", "hover:bg-white/10", "rounded-lg", "transition-all", "cursor-pointer", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-lg"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-2", "mt-4", "relative", "z-10"], [1, "bg-white/5", "border", "border-white/10", "rounded-xl", "px-3", "py-2", "min-w-0"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-white/50", "truncate"], [1, "text-base", "sm:text-lg", "font-black", "mt-0.5", "truncate"], [1, "text-white/30"], [1, "text-base", "sm:text-lg", "font-black", "mt-0.5", "text-green-400", "truncate"], [1, "text-base", "sm:text-lg", "font-black", "mt-0.5", "text-amber-400", "truncate"], [1, "flex-1", "overflow-y-auto", "overflow-x-hidden", "p-1", "sm:p-2", "lg:p-2"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-6", "lg:gap-8"], [1, "lg:col-span-12", "min-w-0", "space-y-6"], [1, "bg-slate-50", "dark:bg-slate-800/50", "rounded-2xl", "p-1", "sm:p-2"], [1, "border-2", "border-dashed", "border-outline-variant/20", "rounded-2xl", "overflow-hidden"], [1, "w-full", "flex", "items-center", "justify-between", "gap-3", "px-4", "sm:px-6", "py-4", "text-left", "hover:bg-surface-container-low", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "min-w-0"], [1, "w-8", "h-8", "bg-primary/10", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-primary", "text-base"], [1, "text-sm", "font-black", "text-on-surface", "truncate"], [1, "material-symbols-outlined", "text-outline", "shrink-0"], [1, "px-4", "sm:px-6", "pb-6", "space-y-4", "border-t", "border-outline-variant/10"], [1, "py-16", "flex", "flex-col", "items-center", "gap-3", "text-outline"], [1, "py-16", "flex", "flex-col", "items-center", "gap-3", "text-outline", "text-center"], [1, "overflow-x-auto", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700"], [1, "shrink-0", "px-4", "sm:px-6", "py-3", "border-t", "border-surface-container", "bg-surface-container-lowest/50", "flex", "justify-end"], [1, "w-full", "sm:w-[90px]", "py-2", "rounded-lg", "bg-on-surface", "text-white", "text-xs", "font-bold", "uppercase", "tracking-wide", "cursor-pointer", "shadow-md", "hover:scale-[1.02]", "transition-transform", 3, "click"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/40", "panelClass", "bg-white dark:bg-slate-900 rounded-2xl my-auto flex flex-col max-h-[92vh] overflow-hidden", 3, "closed", "open", "title", "subtitle", "showCloseButton", "showFooter", "showDefaultFooterButtons"], [1, "bg-surface-container-low", "px-3", "py-2", "rounded-xl", "flex", "items-center", "justify-between", "h-[42px]", "mx-6", "mt-3"], [1, "px-6", "pt-5", "pb-4", "shrink-0"], [1, "flex", "items-center"], [1, "flex", "items-center", "flex-1", "min-w-0"], [1, "flex-1", "overflow-y-auto", "px-6", "pb-2", 2, "min-height", "0"], [1, "space-y-4", "animate-in", "fade-in", "slide-in-from-right-4", "duration-300"], [1, "mt-4", "flex", "items-center", "gap-3", "bg-red-50", "dark:bg-red-900/20", "border", "border-red-200", "px-4", "py-3", "rounded-xl"], ["dialog-footer", "", 1, "flex", "gap-3", "shrink-0"], [1, "flex-1", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "disabled:opacity-50", "flex", "items-center", "justify-center", "gap-1", 3, "disabled"], [1, "flex-1", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", "flex", "items-center", "justify-center", "gap-1"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", "disabled:opacity-60", "disabled:cursor-not-allowed", "disabled:hover:scale-100", "flex", "items-center", "justify-center", "gap-2", 3, "disabled"], ["maxWidth", "max-w-3xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl max-h-[88vh] flex flex-col my-auto animate-in zoom-in-95 duration-300", 3, "closed", "open"], [1, "flex", "justify-between", "items-center", "px-6", "pt-5", "pb-4", "border-b", "border-outline-variant/10", "shrink-0"], [1, "text-xl", "font-black", "tracking-tight"], [1, "p-1.5", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "flex-1", "overflow-y-auto", "px-6", "py-4", "min-h-0"], [1, "grid", "grid-cols-2", "gap-4", "mb-6"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "bg-white", 3, "ngModelChange", "change", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["type", "text", "readonly", "", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "cursor-pointer", 3, "change", "value"], [1, "text-[9px]", "text-outline/60", "mt-1"], [1, "mb-5"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "text-primary", "text-[10px]", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "hover:underline", "flex", "items-center", "gap-1", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "grid", "items-center", "gap-x-2", "mb-1", "px-1"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline", "text-center"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline", "text-right"], [1, "border-t", "border-outline-variant/10", "mb-2"], [1, "space-y-2"], [1, "grid", "items-center", "gap-x-2", 3, "grid-template-columns"], [1, "bg-surface-container-low", "rounded-2xl", "p-4", "space-y-2.5"], [1, "flex", "justify-between", "text-xs"], [1, "font-bold", "text-outline"], [1, "font-black"], [1, "space-y-1"], [1, "font-black", "text-amber-600"], [1, "flex", "justify-between", "text-sm", "border-t", "border-outline-variant/10", "pt-2.5"], [1, "font-black", "text-on-surface"], [1, "font-black", "text-primary", "text-base"], [1, "flex", "gap-3", "px-6", "py-4", "border-t", "border-outline-variant/10", "shrink-0"], [1, "flex-1", "py-3", "rounded-2xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", 3, "click"], [1, "flex-1", "py-3", "rounded-2xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:scale-[1.01]", "transition-transform", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl flex flex-col max-h-[92vh] overflow-hidden", 3, "closed", "open"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl p-5 max-h-[92vh] overflow-hidden", 3, "closed", "open"], [1, "flex", "justify-between", "items-start", "mb-5"], [1, "text-2xl", "font-black", "leading-none"], [1, "p-1.5", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "space-y-5"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-xs", "font-black", "uppercase", "tracking-wide"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-primary/10", "text-primary"], ["type", "range", "min", "1", "max", "10", 1, "w-full", "h-2", "accent-primary", "cursor-pointer", 3, "ngModelChange", "ngModel"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-secondary/10", "text-secondary"], ["type", "range", "min", "1", "max", "10", 1, "w-full", "h-2", "accent-secondary", "cursor-pointer", 3, "ngModelChange", "ngModel"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-green-100", "text-green-700"], ["type", "range", "min", "1", "max", "10", 1, "w-full", "h-2", "cursor-pointer", 2, "accent-color", "#16a34a", 3, "ngModelChange", "ngModel"], [1, "bg-slate-100", "dark:bg-slate-800", "rounded-2xl", "px-4", "py-3", "flex", "items-center", "justify-between"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wider", "text-outline"], [1, "text-2xl", "font-black"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-2", "block"], ["rows", "3", "placeholder", "Add observations or audit notes...", 1, "w-full", "px-3", "py-3", "rounded-2xl", "border", "border-outline-variant/20", "text-xs", "font-medium", "outline-none", "resize-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-3", "mt-6"], [1, "flex-1", "py-3", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex-1", "py-3", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "flex", "items-center", "justify-center", "gap-2", "shadow-lg", "shadow-primary/20", "hover:scale-[1.01]", "transition-transform", "disabled:opacity-60", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl p-5 animate-in zoom-in-95 duration-300", 3, "closed", "open"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-2xl", "font-black", "tracking-tight"], [1, "p-2", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[22px]"], [1, "grid", "grid-cols-2", "gap-4", "mb-5"], [1, "bg-surface-container-low", "p-5", "rounded-2xl", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-2"], [1, "text-3xl", "font-black", "text-on-surface"], [1, "bg-primary/5", "border", "border-primary/10", "p-5", "rounded-2xl", "text-center"], [1, "text-xl", "font-black", "text-primary"], [1, "mb-4", "flex", "items-center", "justify-between", "px-1"], [1, "space-y-3", "pr-1", "max-h-[85vh]", "overflow-y-auto"], [1, "flex", "items-center", "justify-between", "p-4", "bg-surface-container-low", "rounded-2xl", "hover:bg-surface-container", "transition-colors"], [1, "py-12", "flex", "flex-col", "items-center", "gap-3", "text-outline"], [1, "flex-1", "py-3", "rounded-2xl", "border", "border-primary", "text-primary", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-primary/5", "transition-colors", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "w-[120px]", "py-3", "rounded-2xl", "bg-on-surface", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-md", "hover:scale-[1.02]", "transition-transform", 3, "click"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-4"], [1, "text-3xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "mt-1", "text-sm", "font-medium"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], [1, "bg-surface-container-low", "p-6", "rounded-2xl", "space-y-2"], [1, "text-xs", "font-bold", "uppercase", "tracking-widest", "text-outline"], [1, "text-4xl", "font-black", "text-on-surface"], [1, "h-1", "w-12", "bg-primary", "rounded-full"], [1, "text-4xl", "font-black", "text-secondary"], [1, "h-1", "w-12", "bg-secondary", "rounded-full"], [1, "h-1", "w-12", "bg-primary-container", "rounded-full"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "cursor-pointer", "bg-surface-container-lowest", "p-6", "rounded-2xl", "group", "hover:shadow-2xl", "hover:border-primary/20", "border", "border-transparent", "transition-all", "duration-300", "relative", "overflow-hidden"], [1, "col-span-3", "py-24", "flex", "flex-col", "items-center", "gap-4", "text-outline"], [1, "bg-surface-container-low", "rounded-3xl", "p-8", "mt-4"], [1, "flex", "items-center", "justify-between", "mb-8"], [1, "text-xl", "font-black", "text-on-surface"], [1, "cursor-pointer", "text-primary", "text-sm", "font-bold", "flex", "items-center", "gap-1", "hover:underline"], [1, "space-y-6"], [1, "flex", "items-center", "gap-6", "group"], [1, "text-center", "py-8", "text-outline", "font-bold", "italic"], [1, "cursor-pointer", "bg-surface-container-lowest", "p-6", "rounded-2xl", "group", "hover:shadow-2xl", "hover:border-primary/20", "border", "border-transparent", "transition-all", "duration-300", "relative", "overflow-hidden", 3, "click"], [1, "absolute", "top-0", "right-0", "p-4"], [1, "px-3", "py-1", "text-[10px]", "font-bold", "uppercase", "tracking-wider", "rounded-full", 3, "ngClass"], [1, "flex", "items-start", "gap-4", "mb-6"], [1, "w-14", "h-14", "bg-surface-container-high", "rounded-xl", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-outline"], [1, "font-bold", "text-lg", "text-on-surface", "leading-tight", "group-hover:text-primary", "transition-colors"], [1, "text-sm", "text-outline"], [1, "flex", "items-center", "gap-3", "text-sm", "text-on-surface-variant"], [1, "mt-4", "flex", "flex-wrap", "gap-1.5"], [1, "px-2", "py-0.5", "bg-surface-container-low", "text-[10px]", "font-bold", "text-outline", "rounded-full"], [1, "mt-5", "flex", "items-center", "justify-between"], [1, "text-[10px]", "font-bold", "text-outline", "uppercase", "tracking-wider"], [1, "font-black", "text-lg"], [1, "cursor-pointer", "p-2", "text-primary", "hover:bg-primary/5", "rounded-full", "transition-colors"], [1, "material-symbols-outlined"], [1, "material-symbols-outlined", "text-5xl"], [1, "font-bold"], [1, "w-12", "h-12", "rounded-full", "bg-white", "flex", "items-center", "justify-center", "shadow-sm", "flex-shrink-0"], [1, "material-symbols-outlined", 3, "ngClass"], [1, "flex-1", "min-w-0"], [1, "text-on-surface", "font-bold"], [1, "text-sm", "text-on-surface-variant", "truncate"], [1, "text-xs", "font-bold", "text-outline", "uppercase", "tracking-widest", "whitespace-nowrap"], [1, "flex", "items-center", "gap-4", "flex-wrap"], [1, "p-2", "hover:bg-surface-container", "rounded-lg", "cursor-pointer", "transition-colors", 3, "click"], [1, "text-3xl", "font-black", "tracking-tight", "text-on-surface"], [1, "text-sm", "text-outline", "font-medium"], [1, "ml-auto", "flex", "gap-3", "flex-wrap"], [1, "px-5", "py-2.5", "bg-surface-container-highest", "text-primary", "rounded-xl", "font-bold", "flex", "items-center", "gap-2", "hover:bg-surface-dim", "transition-colors", "cursor-pointer", 3, "click"], [1, "px-5", "py-2.5", "bg-primary", "text-white", "rounded-xl", "font-bold", "flex", "items-center", "gap-2", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", "cursor-pointer", 3, "click"], [1, "px-5", "py-2.5", "bg-surface-container-highest", "text-secondary", "rounded-xl", "font-bold", "flex", "items-center", "gap-2", "hover:bg-surface-dim", "transition-colors", "cursor-pointer", 3, "click"], [1, "bg-secondary", "text-white", "text-[10px]", "font-black", "px-2", "py-0.5", "rounded-full"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-6"], [1, "bg-surface-container-low", "p-6", "rounded-2xl", "flex", "flex-col", "justify-between", "h-32", "border-l-4", "border-primary"], [1, "text-xs", "font-bold", "text-outline", "uppercase", "tracking-widest"], [1, "bg-surface-container-low", "p-6", "rounded-2xl", "flex", "flex-col", "justify-between", "h-32", "border-l-4", "border-secondary"], [1, "bg-surface-container-low", "p-6", "rounded-2xl", "flex", "flex-col", "justify-between", "h-32"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "uppercase", "tracking-wider", "w-fit", 3, "ngClass"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-black"], [1, "w-full", "bg-surface-container-high", "h-2", "rounded-full", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8"], [1, "lg:col-span-12", "w-full", "space-y-6"], [1, "bg-surface-container-lowest", "p-8", "rounded-3xl", "shadow-sm", "border", "border-outline-variant/10"], [1, "text-xl", "font-black", "mb-6"], [1, "space-y-4"], [1, "flex", "items-center", "gap-6", "p-4", "bg-surface-container-low", "rounded-2xl", "border", "border-transparent", "hover:border-primary/20", "transition-all", "group"], [1, "text-center", "py-12", "text-outline", "font-bold", "italic"], [1, "text-xl", "font-black"], [1, "text-primary", "text-xs", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "hover:underline", 3, "click"], [1, "w-full", "text-left"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "border-b", "border-surface-container"], [1, "py-4"], [1, "border-b", "border-surface-container/50", "hover:bg-surface-container-low/30", "transition-colors"], [1, "w-12", "h-12", "bg-white", "rounded-xl", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-primary"], [1, "flex-1"], [1, "font-bold", "text-on-surface"], [1, "text-xs", "text-outline"], [1, "text-[10px]", "font-black", "bg-surface-container-low", "border-none", "rounded-lg", "px-2", "py-1", "outline-none", "cursor-pointer", "appearance-none", 3, "change", "click", "value"], ["value", "pending"], ["value", "in_progress"], ["value", "completed"], ["value", "on_hold"], [1, "px-3", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-widest", 3, "ngClass"], [1, "p-1.5", "text-slate-300", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-base"], [1, "py-4", "font-bold"], [1, "py-4", "font-black"], [1, "py-4", "text-sm", "text-outline"], [1, "px-2", "py-0.5", "rounded", "text-[10px]", "font-black", "uppercase", "tracking-tighter", 3, "ngClass"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-1.5", "text-xs", "font-bold", "text-primary", "opacity-80", "hover:opacity-100", "transition-opacity", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-1.5", "text-xs", "font-bold", "text-green-600", "opacity-80", "hover:opacity-100", "transition-opacity", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-1.5", "text-xs", "font-bold", "text-red-600", "opacity-80", "hover:opacity-100", "transition-opacity", "cursor-pointer", 3, "click"], ["colspan", "5", 1, "text-center", "py-8", "text-outline", "font-bold", "italic"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-3"], [1, "cursor-pointer", "rounded-2xl", "border-2", "border-slate-200", "p-4", "flex", "flex-col", "items-center", "justify-center", "gap-1", "transition-all", 3, "click", "ngClass"], [1, "material-symbols-outlined", "text-2xl"], [1, "text-xs", "font-black", "uppercase", "tracking-wider"], [1, "text-[10px]", "font-bold", "mt-1", "opacity-80"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-1.5"], [1, "flex", "items-center", "gap-2", "text-slate-400", "text-xs", "py-2"], ["multiple", "", 1, "w-full", "min-h-28", "border", "border-slate-200", "rounded-xl", "px-3", "py-2", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-blue-500/20", "bg-white", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["type", "number", "min", "0", "max", "100", 1, "w-full", "border", "border-slate-200", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-blue-500/20", 3, "ngModelChange", "ngModel", "readonly", "ngClass"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500"], [1, "text-xs", "text-slate-400", "italic", "py-2"], [1, "ml-3", "mt-3", "space-y-2", "border-l-2", "border-blue-100", "pl-4"], [1, "material-symbols-outlined", "animate-spin", "text-sm"], [1, "cursor-pointer", "border-2", "border-slate-200", "rounded-xl", "px-4", "py-3", "flex", "items-center", "justify-between", "transition-all", "hover:border-blue-300", 3, "ngClass"], [1, "cursor-pointer", "border-2", "border-slate-200", "rounded-xl", "px-4", "py-3", "flex", "items-center", "justify-between", "transition-all", "hover:border-blue-300", 3, "click", "ngClass"], [1, "text-sm", "font-bold", "text-slate-800"], [1, "text-[10px]", "text-slate-400"], [1, "text-right"], [1, "text-xs", "font-black", 3, "ngClass"], [1, "w-16", "h-1.5", "bg-slate-200", "rounded-full", "mt-1", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all", 3, "ngClass"], [1, "cursor-pointer", "border-2", "border-slate-200", "rounded-xl", "px-4", "py-3", "transition-all", "hover:border-blue-300", 3, "ngClass"], [1, "cursor-pointer", "border-2", "border-slate-200", "rounded-xl", "px-4", "py-3", "transition-all", "hover:border-blue-300", 3, "click", "ngClass"], [1, "text-[10px]", "font-bold", 3, "ngClass"], [1, "mt-3", "space-y-1.5", "pt-3", "border-t", "border-slate-100"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-2"], [1, "flex", "items-center", "justify-between", "bg-white", "rounded-lg", "px-3", "py-2", "border", "border-slate-100"], [1, "text-xs", "font-semibold", "text-slate-700"], [1, "px-2", "py-0.5", "rounded", "text-[9px]", "font-black", "uppercase", 3, "ngClass"], ["type", "date", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "cursor-pointer", 3, "ngModelChange", "ngModel"], [1, "normal-case", "font-normal", "tracking-normal", "text-slate-400", "ml-1"], ["type", "text", "placeholder", "e.g. UTR123456789", 1, "w-full", "border", "border-slate-200", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-green-500/20", 3, "ngModelChange", "ngModel"], [1, "material-symbols-outlined", "text-red-600", "text-sm"], [1, "text-xs", "font-bold", "text-red-600"], [1, "mt-4", "flex", "items-start", "gap-3", "bg-red-50", "dark:bg-red-900/20", "border", "border-red-200", "px-4", "py-3", "rounded-xl"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "mt-4"], [1, "text-[9px]", "font-black", "uppercase", "tracking-wide", "text-outline", "mb-1", "block"], [1, "w-full", "min-w-0", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-surface-container-lowest", "cursor-pointer", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "placeholder", "e.g. 800", 1, "w-full", "min-w-0", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-surface-container-lowest", 3, "ngModelChange", "ngModel"], ["value", "active"], ["value", "inactive"], ["type", "number", "min", "1", "placeholder", "e.g. 5", 1, "w-full", "min-w-0", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-surface-container-lowest", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-surface-container-lowest", "cursor-pointer", 3, "ngModelChange", "ngModel"], [1, "w-full", "py-4", "rounded-2xl", "bg-primary", "text-white", "font-black", "uppercase", "tracking-widest", "shadow-lg", "shadow-primary/20", "hover:scale-[1.01]", "transition-transform", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-error", "text-lg", "shrink-0"], [1, "text-sm", "font-bold", "text-error", "break-words"], [1, "material-symbols-outlined", "text-4xl", "animate-spin"], [1, "text-sm", "font-bold"], [1, "text-sm"], [1, "w-full", "text-sm", "mt-5"], [1, "bg-slate-100", "dark:bg-slate-800", "border-b", "border-slate-200", "dark:border-slate-700"], [1, "px-4", "py-3", "text-left", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "px-4", "py-3", "text-center", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "px-4", "py-3", "text-right", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "border-b", "border-slate-200", "dark:border-slate-700", "bg-primary/5", "dark:bg-primary/10"], [1, "border-b", "border-slate-200", "dark:border-slate-700", "hover:bg-slate-50", "dark:hover:bg-slate-800/50", "transition-colors"], ["colspan", "7", 1, "px-4", "py-4"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-primary"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-5", "gap-3"], [1, "text-[9px]", "font-bold", "text-outline", "uppercase", "block", "mb-1"], [1, "w-full", "min-w-0", "px-3", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "bg-surface-container-lowest", "cursor-pointer", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", 1, "w-full", "min-w-0", "px-3", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "bg-surface-container-lowest", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "w-full", "min-w-0", "px-3", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "bg-surface-container-lowest", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-col", "sm:flex-row", "gap-2", "pt-2"], [1, "flex-1", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:scale-[1.01]", "transition-transform", "shadow-md", "shadow-primary/20", 3, "click"], [1, "material-symbols-outlined", "text-sm", "align-middle", "mr-1"], [1, "flex-1", "py-2.5", "rounded-xl", "border-2", "border-outline-variant/30", "text-xs", "font-black", "uppercase", "cursor-pointer", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-colors", 3, "click"], [1, "px-4", "py-3", "text-sm", "font-bold", "text-on-surface"], [1, "px-4", "py-3", "text-center"], [1, "inline-block", "px-2.5", "py-1", "bg-primary/10", "text-primary", "font-black", "text-xs", "rounded-lg"], [1, "px-4", "py-3", "text-right", "font-semibold", "text-on-surface"], [1, "px-4", "py-3", "text-right", "font-black", "text-lg", "text-primary"], [1, "inline-block", "px-3", "py-1.5", "text-[10px]", "font-black", "uppercase", "tracking-widest", "rounded-lg", 3, "ngClass"], [1, "flex", "items-center", "justify-center", "gap-2"], ["title", "Edit worker", 1, "p-1.5", "text-slate-400", "dark:text-slate-500", "hover:text-primary", "dark:hover:text-primary", "transition-colors", "rounded-lg", "hover:bg-primary/10", "cursor-pointer", 3, "click"], ["title", "Delete worker", 1, "p-1.5", "text-slate-400", "dark:text-slate-500", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "dark:hover:bg-red-900/20", "cursor-pointer", 3, "click"], [1, "text-[11px]", "font-bold", "uppercase", "tracking-widest", "text-outline"], [1, "px-3", "py-1", "rounded-full", "text-[12px]", "font-bold", "uppercase", "cursor-pointer", "border", "border-outline-variant/20", "outline-none", 3, "change", "ngClass", "value"], ["value", "Active"], ["value", "Pending"], ["value", "Inactive"], [1, "flex", "flex-col", "items-center", "gap-1", "w-28", "min-w-0"], [1, "w-9", "h-9", "flex-none", "rounded-full", "flex", "items-center", "justify-center", "text-sm", "font-black", "transition-all", "duration-300", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-sm", "text-white"], [3, "ngClass"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "whitespace-nowrap", 3, "ngClass"], [1, "flex-1", "h-0.5", "mx-2", "mb-4", "rounded-full", "transition-all", "duration-500", 3, "ngClass"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1.5", "block"], [1, "text-error"], ["type", "text", "placeholder", "e.g. Skyline Structural Engineering", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "transition-shadow", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "text", "placeholder", "Full Name", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "tel", "inputmode", "numeric", "pattern", "[0-9]*", "placeholder", "10-digit number", "maxlength", "10", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "pr-12", 3, "ngModelChange", "input", "ngModel"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-[9px]", "font-black", "text-outline/50"], ["type", "email", "placeholder", "official@vendor.com", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "justify-center", "gap-2", "bg-amber-50", "dark:bg-amber-900/20", "border", "border-amber-200", "rounded-xl", "px-4", "py-3"], [1, "material-symbols-outlined", "text-amber-600", "text-base"], [1, "text-[10px]", "font-bold", "text-amber-700", "dark:text-amber-400", "leading-relaxed", "text-center"], ["type", "text", "maxlength", "15", "placeholder", "22AAAAA0000A1Z5", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "uppercase", "outline-none", "focus:ring-2", "focus:ring-primary/20", "pr-12", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "10", "placeholder", "ABCDE1234F", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "uppercase", "outline-none", "focus:ring-2", "focus:ring-primary/20", "pr-12", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-3", "gap-3"], [1, "col-span-2"], ["type", "text", "placeholder", "Industrial Area, Sector 5...", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "tel", "maxlength", "6", "placeholder", "400001", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-sm", "font-black", "text-outline"], ["type", "text", "placeholder", "500000", 1, "w-full", "pl-7", "pr-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "text-[9px]", "text-outline/70", "mt-1"], [1, "border", "border-outline-variant/20", "rounded-xl", "overflow-hidden", "bg-surface-container-lowest"], [1, "flex", "items-center", "justify-between", "px-4", "py-2.5", "bg-surface-container", "border-b", "border-outline-variant/10"], [1, "text-[10px]", "font-bold", "text-outline"], ["type", "button", 1, "text-[9px]", "font-black", "text-error", "hover:underline", "cursor-pointer"], [1, "max-h-44", "overflow-y-auto", "divide-y", "divide-outline-variant/10"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "hover:bg-surface-container", "cursor-pointer", "transition-colors", 3, "bg-primary/5"], [1, "text-center", "py-6", "text-outline", "text-xs", "font-bold", "italic"], [1, "flex", "flex-wrap", "gap-1.5"], ["type", "button", 1, "text-[9px]", "font-black", "text-error", "hover:underline", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "hover:bg-surface-container", "cursor-pointer", "transition-colors"], ["type", "checkbox", 1, "w-4", "h-4", "rounded", "accent-primary", "cursor-pointer", "flex-shrink-0", 3, "change", "checked"], [1, "text-xs", "font-semibold", "text-on-surface"], [1, "ml-auto", "material-symbols-outlined", "text-primary", "text-base"], [1, "px-2.5", "py-1", "bg-primary/10", "text-primary", "rounded-full", "text-[10px]", "font-bold", "flex", "items-center", "gap-1.5"], ["type", "button", 1, "cursor-pointer", "hover:text-error", "leading-none", "font-black", 3, "click"], [1, "normal-case", "font-normal", "text-outline/60", "tracking-normal", "ml-1"], [1, "border-2", "border-dashed", "border-outline-variant/20", "rounded-xl", "p-6", "flex", "flex-col", "items-center", "justify-center", "gap-2", "hover:bg-slate-50", "dark:hover:bg-slate-800", "hover:border-primary/30", "transition-all", "cursor-pointer"], [1, "material-symbols-outlined", "text-primary", "text-3xl"], [1, "text-[10px]", "font-bold", "text-on-surface"], [1, "text-[9px]", "text-outline/70", "text-center"], ["type", "file", "accept", ".pdf,.doc,.docx,.jpg,.jpeg,.png", "multiple", "", 1, "hidden", 3, "change"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "gap-3", "bg-surface-container-low", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/10", "hover:bg-slate-50", "transition-all", 3, "href"], [1, "material-symbols-outlined", "text-primary", "text-[16px]"], [1, "truncate", "text-[10px]", "font-medium", "text-slate-700", "dark:text-slate-200"], [1, "material-symbols-outlined", "text-slate-400", "text-[15px]", "ml-auto"], [1, "flex", "items-center", "gap-3", "bg-surface-container-low", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/10", "group"], [1, "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-base", 3, "ngClass"], [1, "text-xs", "font-bold", "text-on-surface", "truncate"], [1, "text-[9px]", "text-outline", "font-medium"], [1, "p-1", "text-outline", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "cursor-pointer", "opacity-0", "group-hover:opacity-100", 3, "click"], [1, "material-symbols-outlined", "text-error", "text-base"], [1, "text-xs", "font-bold", "text-error"], [1, "material-symbols-outlined", "text-error", "text-lg"], [1, "text-sm", "font-bold", "text-error"], [1, "flex-1", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "disabled:opacity-50", "flex", "items-center", "justify-center", "gap-1", 3, "click", "disabled"], [1, "flex-1", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", 3, "click"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", "flex", "items-center", "justify-center", "gap-1", 3, "click"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", "disabled:opacity-60", "disabled:cursor-not-allowed", "disabled:hover:scale-100", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "material-symbols-outlined", "animate-spin", "text-xs"], [1, "grid", "items-center", "gap-x-2"], [1, "w-full", "appearance-none", "px-2", "py-2", "pr-6", "rounded-xl", "border", "border-outline-variant/20", "bg-surface-container-lowest", "text-[11px]", "font-medium", "outline-none", "focus:ring-2", "focus:ring-primary/20", "cursor-pointer", 3, "ngModelChange", "ngModel"], ["value", "material"], ["value", "equipment"], ["value", "labor"], ["value", "others"], [1, "material-symbols-outlined", "absolute", "right-1.5", "top-1/2", "-translate-y-1/2", "text-outline", "text-xs", "pointer-events-none"], ["type", "text", "placeholder", "Description", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-medium", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "placeholder", "1", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-medium", "text-center", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-2", "top-1/2", "-translate-y-1/2", "text-[10px]", "font-black", "text-outline/60"], ["type", "number", "min", "0", "placeholder", "0", 1, "w-full", "pl-5", "pr-2", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-medium", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "w-full", "appearance-none", "px-2", "py-2", "pr-5", "rounded-xl", "border", "border-outline-variant/20", "bg-surface-container-lowest", "text-[11px]", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "cursor-pointer", "text-center", 3, "ngModelChange", "ngModel"], [1, "material-symbols-outlined", "absolute", "right-1", "top-1/2", "-translate-y-1/2", "text-outline", "text-xs", "pointer-events-none"], [1, "text-[11px]", "font-black", "text-on-surface"], [1, "text-[8px]", "text-outline", "leading-tight"], [1, "w-8", "h-8", "flex", "items-center", "justify-center", "text-slate-300", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "cursor-pointer", "flex-shrink-0"], [1, "w-8", "h-8"], ["type", "number", "min", "1", "placeholder", "Hrs", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-primary/30", "bg-primary/5", "text-[11px]", "font-medium", "text-center", "outline-none", 3, "ngModel"], ["type", "number", "min", "1", "placeholder", "Hrs", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-primary/30", "bg-primary/5", "text-[11px]", "font-medium", "text-center", "outline-none", 3, "ngModelChange", "ngModel"], [1, "w-8", "h-8", "flex", "items-center", "justify-center", "text-slate-300", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "cursor-pointer", "flex-shrink-0", 3, "click"], [1, "flex", "justify-between", "text-[10px]"], [1, "text-outline"], [1, "font-bold", "text-amber-600"], [1, "flex", "justify-between", "items-center", "px-5", "pt-4", "pb-2", "border-b", "border-outline-variant/10"], [1, "flex", "items-center", "gap-2"], [1, "w-[34px]", "h-[34px]", "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", 3, "click"], [1, "px-5", "py-3", "space-y-3", "overflow-y-auto"], [1, "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "p-3", "rounded-2xl", "space-y-3"], [1, "text-[14px]", "font-black"], [1, "flex", "items-center", "gap-1", "bg-green-50", "text-green-600", "px-2", "py-0.5", "rounded-full"], [1, "material-symbols-outlined", "text-[13px]"], [1, "text-[10px]", "font-bold", "uppercase"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-2"], [1, "bg-slate-50", "dark:bg-slate-900/40", "rounded-xl", "px-3", "py-2", "space-y-1"], [1, "text-[12px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "text-[12px]", "font-bold"], [1, "text-[14px]", "text-slate-500"], [1, "text-[12px]", "text-slate-500"], [1, "text-[12px]", "font-bold", "uppercase", "break-all"], [1, "bg-slate-50", "dark:bg-slate-900/40", "rounded-xl", "px-3", "py-2", "space-y-1", "col-span-1", "md:col-span-2"], [1, "flex", "flex-wrap", "gap-1"], [1, "text-[11px]", "font-semibold", "bg-slate-100", "dark:bg-slate-800", "px-2", "py-0.5", "rounded-full"], [1, "px-5", "pb-4", "pt-2", "flex", "justify-center"], [1, "w-[110px]", "h-[34px]", "rounded-lg", "bg-slate-200", "dark:bg-slate-700", "text-[11px]", "font-bold", "uppercase", 3, "click"], [1, "flex", "flex-col", "gap-2", "max-h-[120px]", "overflow-y-auto"], ["target", "_blank", 1, "flex", "items-center", "justify-between", "bg-slate-50", "dark:bg-slate-900/40", "px-3", "py-2", "rounded-xl", 3, "href"], [1, "text-[12px]", "font-medium", "truncate"], [1, "material-symbols-outlined", "text-[15px]", "text-slate-400"], [1, "text-xs", "font-bold", "text-outline", "uppercase", "tracking-wider"], [1, "font-black", "text-primary", "text-lg"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", 3, "ngClass"], [1, "material-symbols-outlined", "text-sm", 3, "ngClass"], [1, "font-black", "text-sm", "text-on-surface"], [1, "text-[10px]", "text-outline", "font-bold", "uppercase", "tracking-widest", "mt-0.5"], [1, "text-right", "flex", "flex-col", "items-end", "gap-1"], [1, "font-black", "text-base", "text-on-surface"], [1, "px-2.5", "py-1", "rounded-md", "text-[10px]", "font-black", "uppercase", 3, "ngClass"], [1, "text-[10px]", "font-black", "text-primary", "flex", "items-center", "gap-1", "hover:underline", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[12px]"]], template: function Vendors_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, Vendors_Conditional_1_Template, 45, 6)(2, Vendors_Conditional_2_Template, 84, 20, "div", 1);
      \u0275\u0275elementStart(3, "app-common-dialog", 2);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_3_listener() {
        return ctx.closePayModal();
      })("primary", function Vendors_Template_app_common_dialog_primary_3_listener() {
        return ctx.confirmPayment();
      });
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "p", 6);
      \u0275\u0275text(8, "Invoice Number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 7);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 5)(12, "p", 6);
      \u0275\u0275text(13, "Invoice Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p", 8);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 5)(17, "p", 6);
      \u0275\u0275text(18, "Subtotal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p", 8);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 5)(22, "p", 6);
      \u0275\u0275text(23, "Tax Amount");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p", 9);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 10)(27, "p", 11);
      \u0275\u0275text(28, "Grand Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p", 12);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 13)(32, "div", 14)(33, "span", 15);
      \u0275\u0275text(34, " Project : ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span", 16);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(37, Vendors_Conditional_37_Template, 49, 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 17)(39, "div")(40, "label", 18);
      \u0275\u0275text(41, " Amount to Pay (\u20B9) ");
      \u0275\u0275elementStart(42, "span", 19);
      \u0275\u0275text(43, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div", 20)(45, "span", 21);
      \u0275\u0275text(46, "\u20B9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_47_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.paymentForm.amount, $event) || (ctx.paymentForm.amount = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "p", 23);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div")(51, "label", 18);
      \u0275\u0275text(52, " Payment Mode ");
      \u0275\u0275elementStart(53, "span", 19);
      \u0275\u0275text(54, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "select", 24);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_select_ngModelChange_55_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.paymentForm.mode, $event) || (ctx.paymentForm.mode = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Vendors_Template_select_ngModelChange_55_listener($event) {
        return ctx.onPaymentModeChange($event);
      });
      \u0275\u0275elementStart(56, "option", 25);
      \u0275\u0275text(57, "Select mode");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "option", 26);
      \u0275\u0275text(59, "Bank Transfer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "option", 27);
      \u0275\u0275text(61, "UPI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "option", 28);
      \u0275\u0275text(63, "Cheque");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "option", 29);
      \u0275\u0275text(65, "Cash");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(66, Vendors_Conditional_66_Template, 6, 1, "div");
      \u0275\u0275conditionalCreate(67, Vendors_Conditional_67_Template, 6, 1, "div");
      \u0275\u0275conditionalCreate(68, Vendors_Conditional_68_Template, 5, 1, "div", 30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "app-common-dialog", 31);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_69_listener() {
        return ctx.closeCancelInvoiceDialog();
      })("primary", function Vendors_Template_app_common_dialog_primary_69_listener() {
        return ctx.confirmCancelInvoice();
      });
      \u0275\u0275elementStart(70, "div", 32)(71, "p", 33);
      \u0275\u0275text(72, " Are you sure you want to cancel invoice ");
      \u0275\u0275elementStart(73, "strong");
      \u0275\u0275text(74);
      \u0275\u0275elementEnd();
      \u0275\u0275text(75, "? ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(76, "app-common-dialog", 34);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_76_listener() {
        return ctx.closeLaborModal();
      });
      \u0275\u0275elementStart(77, "div", 35)(78, "div", 36)(79, "span", 37);
      \u0275\u0275text(80, "engineering");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "div", 38)(82, "div", 39)(83, "h3", 40);
      \u0275\u0275text(84, " Labor Details ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "p", 41);
      \u0275\u0275text(86, " Manage Labor ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(87, "button", 42);
      \u0275\u0275listener("click", function Vendors_Template_button_click_87_listener() {
        return ctx.closeLaborModal();
      });
      \u0275\u0275elementStart(88, "span", 43);
      \u0275\u0275text(89, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(90, "div", 44)(91, "div", 45)(92, "p", 46);
      \u0275\u0275text(93, " Active ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "p", 47);
      \u0275\u0275conditionalCreate(95, Vendors_Conditional_95_Template, 2, 0, "span", 48)(96, Vendors_Conditional_96_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(97, "div", 45)(98, "p", 46);
      \u0275\u0275text(99, " On Site ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "p", 49);
      \u0275\u0275conditionalCreate(101, Vendors_Conditional_101_Template, 2, 0, "span", 48)(102, Vendors_Conditional_102_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(103, "div", 45)(104, "p", 46);
      \u0275\u0275text(105, " Remaining ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "p", 50);
      \u0275\u0275conditionalCreate(107, Vendors_Conditional_107_Template, 2, 0, "span", 48)(108, Vendors_Conditional_108_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(109, "div", 45)(110, "p", 46);
      \u0275\u0275text(111, " Workers ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "p", 47);
      \u0275\u0275conditionalCreate(113, Vendors_Conditional_113_Template, 2, 0, "span", 48)(114, Vendors_Conditional_114_Template, 1, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(115, "div", 51)(116, "div", 52)(117, "div", 53)(118, "div", 54)(119, "div", 55)(120, "button", 56);
      \u0275\u0275listener("click", function Vendors_Template_button_click_120_listener() {
        return ctx.toggleAddLaborForm();
      });
      \u0275\u0275elementStart(121, "div", 57)(122, "div", 58)(123, "span", 59);
      \u0275\u0275text(124);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(125, "span", 60);
      \u0275\u0275text(126);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(127, "span", 61);
      \u0275\u0275text(128);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(129, Vendors_Conditional_129_Template, 38, 8, "div", 62);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(130, Vendors_Conditional_130_Template, 5, 0, "div", 63)(131, Vendors_Conditional_131_Template, 7, 0, "div", 64)(132, Vendors_Conditional_132_Template, 21, 0, "div", 65);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(133, "div", 66)(134, "button", 67);
      \u0275\u0275listener("click", function Vendors_Template_button_click_134_listener() {
        return ctx.closeLaborModal();
      });
      \u0275\u0275text(135, " Done ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(136, "app-common-dialog", 68);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_136_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275conditionalCreate(137, Vendors_Conditional_137_Template, 10, 2, "div", 69);
      \u0275\u0275elementStart(138, "div", 70)(139, "div", 71);
      \u0275\u0275repeaterCreate(140, Vendors_For_141_Template, 8, 9, "div", 72, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(142, "div", 73);
      \u0275\u0275conditionalCreate(143, Vendors_Conditional_143_Template, 39, 7, "div", 74);
      \u0275\u0275conditionalCreate(144, Vendors_Conditional_144_Template, 40, 6, "div", 74);
      \u0275\u0275conditionalCreate(145, Vendors_Conditional_145_Template, 29, 5, "div", 74);
      \u0275\u0275conditionalCreate(146, Vendors_Conditional_146_Template, 24, 6, "div", 74);
      \u0275\u0275conditionalCreate(147, Vendors_Conditional_147_Template, 5, 1, "div", 75);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(148, "div", 76);
      \u0275\u0275conditionalCreate(149, Vendors_Conditional_149_Template, 4, 1, "button", 77)(150, Vendors_Conditional_150_Template, 2, 0, "button", 78);
      \u0275\u0275conditionalCreate(151, Vendors_Conditional_151_Template, 4, 0, "button", 79)(152, Vendors_Conditional_152_Template, 4, 2, "button", 80);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(153, "app-common-dialog", 81);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_153_listener() {
        return ctx.showInvoiceModal = false;
      });
      \u0275\u0275elementStart(154, "div", 82)(155, "h3", 83);
      \u0275\u0275text(156, " New Invoice Submission ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(157, "button", 84);
      \u0275\u0275listener("click", function Vendors_Template_button_click_157_listener() {
        return ctx.showInvoiceModal = false;
      });
      \u0275\u0275elementStart(158, "span", 85);
      \u0275\u0275text(159, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(160, "div", 86)(161, "div", 87)(162, "div")(163, "label", 88);
      \u0275\u0275text(164, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(165, "select", 89);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_select_ngModelChange_165_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.invoiceForm.project_id, $event) || (ctx.invoiceForm.project_id = $event);
        return $event;
      });
      \u0275\u0275listener("change", function Vendors_Template_select_change_165_listener($event) {
        return ctx.getProject($event);
      });
      \u0275\u0275elementStart(166, "option", 90);
      \u0275\u0275text(167, "Select Project");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(168, Vendors_For_169_Template, 2, 2, "option", 91, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(170, "div")(171, "label", 88);
      \u0275\u0275text(172, " Invoice # ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(173, "input", 92);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_173_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.invoiceForm.number, $event) || (ctx.invoiceForm.number = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(174, "div")(175, "label", 88);
      \u0275\u0275text(176, " Date ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(177, "input", 93);
      \u0275\u0275listener("change", function Vendors_Template_input_change_177_listener($event) {
        return ctx.onInvoiceDateChange($event.target.value);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(178, "p", 94);
      \u0275\u0275text(179);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(180, "div", 95)(181, "div", 96)(182, "label", 97);
      \u0275\u0275text(183, " Items ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(184, "button", 98);
      \u0275\u0275listener("click", function Vendors_Template_button_click_184_listener() {
        return ctx.addInvoiceItem();
      });
      \u0275\u0275elementStart(185, "span", 99);
      \u0275\u0275text(186, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(187, " Add Item ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(188, "div", 100)(189, "span", 101);
      \u0275\u0275text(190, " Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(191, "span", 101);
      \u0275\u0275text(192, " Description ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(193, "span", 102);
      \u0275\u0275text(194, " Qty ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(195, Vendors_Conditional_195_Template, 2, 0, "span", 102);
      \u0275\u0275elementStart(196, "span", 102);
      \u0275\u0275text(197, " Rate (\u20B9) ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(198, "span", 102);
      \u0275\u0275text(199, " Tax % ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(200, "span", 103);
      \u0275\u0275text(201, " Total (\u20B9) ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(202, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275element(203, "div", 104);
      \u0275\u0275elementStart(204, "div", 105);
      \u0275\u0275repeaterCreate(205, Vendors_For_206_Template, 43, 19, "div", 106, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(207, "div", 107)(208, "div", 108)(209, "span", 109);
      \u0275\u0275text(210, " Subtotal (excl. TAX) ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(211, "span", 110);
      \u0275\u0275text(212);
      \u0275\u0275pipe(213, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(214, Vendors_Conditional_214_Template, 3, 0, "div", 111);
      \u0275\u0275elementStart(215, "div", 108)(216, "span", 109);
      \u0275\u0275text(217, " Total TAX ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(218, "span", 112);
      \u0275\u0275text(219);
      \u0275\u0275pipe(220, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(221, "div", 113)(222, "span", 114);
      \u0275\u0275text(223, " Grand Total ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(224, "span", 115);
      \u0275\u0275text(225);
      \u0275\u0275pipe(226, "number");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(227, "div", 116)(228, "button", 117);
      \u0275\u0275listener("click", function Vendors_Template_button_click_228_listener() {
        return ctx.showInvoiceModal = false;
      });
      \u0275\u0275text(229, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(230, "button", 118);
      \u0275\u0275listener("click", function Vendors_Template_button_click_230_listener() {
        return ctx.submitInvoice();
      });
      \u0275\u0275conditionalCreate(231, Vendors_Conditional_231_Template, 3, 0)(232, Vendors_Conditional_232_Template, 3, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(233, "app-common-dialog", 119);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_233_listener() {
        return ctx.showVendorDetailModal = false;
      });
      \u0275\u0275conditionalCreate(234, Vendors_Conditional_234_Template, 49, 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(235, "app-common-dialog", 120);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_235_listener() {
        return ctx.showAuditModal = false;
      });
      \u0275\u0275elementStart(236, "div", 121)(237, "h3", 122);
      \u0275\u0275text(238, "Compliance Audit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(239, "button", 123);
      \u0275\u0275listener("click", function Vendors_Template_button_click_239_listener() {
        return ctx.showAuditModal = false;
      });
      \u0275\u0275elementStart(240, "span", 124);
      \u0275\u0275text(241, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(242, "div", 125)(243, "div")(244, "div", 126)(245, "label", 127);
      \u0275\u0275text(246, "Quality");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(247, "span", 128);
      \u0275\u0275text(248);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(249, "input", 129);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_249_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.quality, $event) || (ctx.auditForm.quality = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(250, "div")(251, "div", 126)(252, "label", 127);
      \u0275\u0275text(253, "Timeliness");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(254, "span", 130);
      \u0275\u0275text(255);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(256, "input", 131);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_256_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.timeliness, $event) || (ctx.auditForm.timeliness = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(257, "div")(258, "div", 126)(259, "label", 127);
      \u0275\u0275text(260, "Safety");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(261, "span", 132);
      \u0275\u0275text(262);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(263, "input", 133);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_263_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.safety, $event) || (ctx.auditForm.safety = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(264, "div", 134)(265, "span", 135);
      \u0275\u0275text(266, "Overall Score");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(267, "span", 136);
      \u0275\u0275text(268);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(269, "div")(270, "label", 137);
      \u0275\u0275text(271, "Observations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(272, "textarea", 138);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_textarea_ngModelChange_272_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.observations, $event) || (ctx.auditForm.observations = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(273, "div", 139)(274, "button", 140);
      \u0275\u0275listener("click", function Vendors_Template_button_click_274_listener() {
        return ctx.showAuditModal = false;
      });
      \u0275\u0275text(275, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(276, "button", 141);
      \u0275\u0275listener("click", function Vendors_Template_button_click_276_listener() {
        return ctx.submitAudit();
      });
      \u0275\u0275conditionalCreate(277, Vendors_Conditional_277_Template, 3, 0)(278, Vendors_Conditional_278_Template, 3, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(279, "app-common-dialog", 142);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_279_listener() {
        return ctx.showBillingModal = false;
      });
      \u0275\u0275elementStart(280, "div", 143)(281, "h3", 144);
      \u0275\u0275text(282, "Billing Summary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(283, "button", 145);
      \u0275\u0275listener("click", function Vendors_Template_button_click_283_listener() {
        return ctx.showBillingModal = false;
      });
      \u0275\u0275elementStart(284, "span", 146);
      \u0275\u0275text(285, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(286, "div", 147)(287, "div", 148)(288, "p", 149);
      \u0275\u0275text(289, "Total Invoices");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(290, "p", 150);
      \u0275\u0275text(291);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(292, "div", 151)(293, "p", 149);
      \u0275\u0275text(294, "Budget Allocated");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(295, "p", 152);
      \u0275\u0275text(296);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(297, Vendors_Conditional_297_Template, 6, 3, "div", 153);
      \u0275\u0275elementStart(298, "div", 154);
      \u0275\u0275repeaterCreate(299, Vendors_For_300_Template, 19, 8, "div", 155, _forTrack1, false, Vendors_ForEmpty_301_Template, 5, 0, "div", 156);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(302, "div", 139)(303, "button", 157);
      \u0275\u0275listener("click", function Vendors_Template_button_click_303_listener() {
        ctx.openSubmission();
        return ctx.showBillingModal = false;
      });
      \u0275\u0275elementStart(304, "span", 99);
      \u0275\u0275text(305, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(306, " New Invoice ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(307, "button", 158);
      \u0275\u0275listener("click", function Vendors_Template_button_click_307_listener() {
        return ctx.showBillingModal = false;
      });
      \u0275\u0275text(308, "Close");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.selectedVendor ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.payInvoiceeModal)("showCloseButton", true)("showFooter", true)("primaryDisabled", ctx.isProcessingPayment);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.selectedInvoice == null ? null : ctx.selectedInvoice.invoice_number);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatDate(ctx.selectedInvoice == null ? null : ctx.selectedInvoice.invoice_date));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("\u20B9", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.subtotal) || 0)).toLocaleString("en-IN"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("\u20B9", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.tax_amount) || 0)).toLocaleString("en-IN"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("\u20B9", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.grand_total) || 0)).toLocaleString("en-IN"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.projectdata == null ? null : ctx.projectdata.name, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSettlementCards ? 37 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.paymentForm.amount);
      \u0275\u0275property("max", (ctx.selectedInvoice == null ? null : ctx.selectedInvoice.grand_total) ?? null)("placeholder", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.grand_total) || 0)).toString());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Grand total: \u20B9", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.grand_total) || 0)).toLocaleString("en-IN"), " ");
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.paymentForm.mode);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.paymentForm.mode === "Cheque" ? 66 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paymentForm.mode !== "Cash" ? 67 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paymentError ? 68 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showCancelInvoiceModal && !!ctx.selectedInvoice)("showCloseButton", true)("showFooter", true)("primaryDisabled", ctx.isCancellingInvoice);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.selectedInvoice == null ? null : ctx.selectedInvoice.invoice_number);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showLaborModal && !!ctx.selectedVendor);
      \u0275\u0275advance(19);
      \u0275\u0275conditional(ctx.laborLoading ? 95 : 96);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.laborLoading ? 101 : 102);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.laborLoading ? 107 : 108);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.laborLoading ? 113 : 114);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1(" ", ctx.showAddLaborForm ? "expand_less" : "person_add", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.showAddLaborForm ? "Cancel" : "Add New Worker", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.showAddLaborForm ? "close" : "add", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAddLaborForm ? 129 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.laborLoading ? 130 : ctx.laborWorkers.length === 0 ? 131 : !ctx.showAddLaborForm ? 132 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("title", \u0275\u0275interpolate1("", ctx.isEditMode ? "Update" : "Onboard New", " Vendor"))("subtitle", \u0275\u0275interpolate(ctx.isEditMode ? "Update vendor information." : "Add vendor information."))("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true)("showDefaultFooterButtons", false);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditMode && ctx.selectedVendor ? 137 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.vendorSteps);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.currentStep === 1 ? 143 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 2 ? 144 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 3 ? 145 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 4 ? 146 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.stepError ? 147 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep > 1 ? 149 : 150);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep < 4 ? 151 : 152);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showInvoiceModal);
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.invoiceForm.project_id);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.projects);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.invoiceForm.number);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.invoiceForm.rawDate);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Selected: ", ctx.invoiceForm.date);
      \u0275\u0275advance(9);
      \u0275\u0275styleProp("grid-template-columns", ctx.hasLaborItems() ? "130px 1fr 60px 70px 100px 80px 90px 32px" : "130px 1fr 60px 100px 80px 90px 32px");
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.hasLaborItems() ? 195 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.invoiceForm.items);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(213, 89, ctx.invoiceForm.subtotal || 0, "1.0-2"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional((ctx.invoiceForm.gstBreakdown == null ? null : ctx.invoiceForm.gstBreakdown.length) > 0 ? 214 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(220, 92, ctx.invoiceForm.taxAmount || 0, "1.0-2"), " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(226, 95, ctx.invoiceForm.grandTotal || 0, "1.0-2"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.isSavingInvoice);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSavingInvoice ? 231 : 232);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showVendorDetailModal && !!ctx.selectedVendor);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedVendor ? 234 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showAuditModal);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate1("", ctx.auditForm.quality, "/10");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.quality);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.auditForm.timeliness, "/10");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.timeliness);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.auditForm.safety, "/10");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.safety);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("text-green-600", ctx.auditScore >= 80)("text-amber-500", ctx.auditScore < 80 && ctx.auditScore >= 50)("text-red-500", ctx.auditScore < 50);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.auditScore, "%");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.observations);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.isSavingAudit);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSavingAudit ? 277 : 278);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showBillingModal);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.invoices.length);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.selectedVendor == null ? null : ctx.selectedVendor.budget) ?? "\u2014");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.invoices.length > 0 ? 297 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.invoices);
    }
  }, dependencies: [NgClass, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, NgControlStatus, MaxLengthValidator, PatternValidator, MinValidator, MaxValidator, NgModel, CommonDialogComponent, DecimalPipe, DatePipe], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  --blue: #1a6bff;\n  --blue-light: #e8f0ff;\n  --gold: #c47d00;\n  --gold-bg: #fff8e6;\n  --text-primary: #111827;\n  --text-secondary: #6b7280;\n  --text-muted: #9ca3af;\n  --border: #e5e7eb;\n  --surface: #f9fafb;\n  --white: #ffffff;\n  --radius: 12px;\n  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10);\n  --shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.15);\n}\n.vp-wrapper[_ngcontent-%COMP%] {\n  background: var(--surface);\n  min-height: auto;\n  padding: 40px 48px;\n  width: 100%;\n  margin: 0;\n}\n.vp-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 32px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.vp-header__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.vp-title[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  font-size: 26px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n  letter-spacing: -0.3px;\n}\n.vp-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.vp-subtitle[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-weight: 700;\n}\n.btn-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 18px;\n  border: 1.5px solid var(--border);\n  border-radius: 24px;\n  background: var(--white);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-filter[_ngcontent-%COMP%]:hover, \n.btn-filter.active[_ngcontent-%COMP%] {\n  border-color: var(--blue);\n  color: var(--blue);\n  background: var(--blue-light);\n}\n.btn-add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: var(--blue);\n  color: white;\n  border: none;\n  border-radius: 24px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.3);\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.4);\n  transform: translateY(-1px);\n}\n.btn-add[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.vp-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  padding: 24px 28px 20px;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-md);\n  transform: translateY(-2px);\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 34px;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.stat-value--gold[_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.stat-bar[_ngcontent-%COMP%] {\n  height: 3px;\n  width: 40px;\n  border-radius: 4px;\n  margin-top: 4px;\n}\n.stat-bar--blue[_ngcontent-%COMP%] {\n  background: var(--blue);\n}\n.stat-bar--gold[_ngcontent-%COMP%] {\n  background: var(--gold);\n}\n.vp-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 48px 0;\n  justify-content: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  font-weight: 500;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--border);\n  border-top-color: var(--blue);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.vp-empty[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1.5px dashed var(--border);\n  padding: 48px 40px;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  margin-bottom: 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.vp-empty[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  opacity: 0.35;\n}\n.vp-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.vp-empty[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--blue);\n  font-weight: 600;\n}\n.vp-vendor-list[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  margin-bottom: 24px;\n  overflow: hidden;\n}\n.vendor-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--border);\n  transition: background 0.15s;\n}\n.vendor-card[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.vendor-card[_ngcontent-%COMP%]:hover {\n  background: var(--surface);\n}\n.vendor-card__info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.vendor-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--blue-light);\n  color: var(--blue);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n  letter-spacing: 0.5px;\n}\n.vendor-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.vendor-services[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 320px;\n}\n.vendor-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-shrink: 0;\n}\n.vendor-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.3px;\n}\n.vendor-badge--active[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n}\n.vendor-badge--pending[_ngcontent-%COMP%] {\n  background: #fff8e6;\n  color: var(--gold);\n}\n.vendor-badge--inactive[_ngcontent-%COMP%] {\n  background: var(--surface);\n  color: var(--text-muted);\n}\n.vendor-compliance[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.vp-activity[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  padding: 28px 32px;\n}\n.vp-activity__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.activity-title[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.btn-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: var(--blue);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  transition: opacity 0.15s;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.activity-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 18px 0;\n  border-bottom: 1px solid var(--border);\n}\n.activity-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.activity-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  color: var(--text-secondary);\n}\n.activity-icon--invoice[_ngcontent-%COMP%] {\n  background: #fff8e6;\n  border-color: #f5e0b0;\n  color: var(--gold);\n}\n.activity-icon--cert[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #059669;\n}\n.activity-icon--assign[_ngcontent-%COMP%] {\n  background: var(--blue-light);\n  border-color: #c7d9ff;\n  color: var(--blue);\n}\n.activity-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.activity-item__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 3px;\n}\n.activity-item__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--text-muted);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.activity-empty[_ngcontent-%COMP%] {\n  padding: 32px 0;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(10, 14, 30, 0.55);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 24px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: 18px;\n  width: 100%;\n  max-width: 740px;\n  max-height: 92vh;\n  overflow-y: auto;\n  box-shadow: var(--shadow-lg);\n  animation: _ngcontent-%COMP%_slideUp 0.25s ease;\n  scrollbar-width: thin;\n  scrollbar-color: var(--border) transparent;\n}\n.modal[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n}\n.modal[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.modal[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--border);\n  border-radius: 4px;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 28px 28px 20px;\n  position: sticky;\n  top: 0;\n  background: var(--white);\n  z-index: 1;\n  border-bottom: 1px solid var(--border);\n}\n.modal__title[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.modal__subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.modal__close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  color: var(--text-muted);\n  border-radius: 8px;\n  transition: all 0.15s;\n  line-height: 1;\n}\n.modal__close[_ngcontent-%COMP%]:hover {\n  background: var(--surface);\n  color: var(--text-primary);\n}\n.modal__close[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.modal__form[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group--full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-row--3-1[_ngcontent-%COMP%] {\n  grid-template-columns: 3fr 1.2fr;\n}\n.form-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  margin-bottom: 2px;\n}\n.required-star[_ngcontent-%COMP%] {\n  color: #ef4444;\n  margin-left: 2px;\n}\n.form-optional[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-weight: 400;\n  font-size: 10px;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.form-input[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border: 1.5px solid var(--border);\n  border-radius: 8px;\n  font-size: 14px;\n  color: var(--text-primary);\n  background: var(--white);\n  transition: border-color 0.18s, box-shadow 0.18s;\n  font-family: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--blue);\n  box-shadow: 0 0 0 3px rgba(26, 107, 255, 0.1);\n}\n.form-input--error[_ngcontent-%COMP%] {\n  border-color: #ef4444 !important;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08) !important;\n}\n.mt-8[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.form-hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.form-error[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #ef4444;\n  font-weight: 500;\n  margin-top: 2px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.form-error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 10px;\n}\n.form-api-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: #fff1f1;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #dc2626;\n  font-size: 13px;\n  font-weight: 500;\n}\n.form-api-error[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.upload-zone[_ngcontent-%COMP%] {\n  border: 2px dashed var(--border);\n  border-radius: 10px;\n  padding: 32px 20px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: var(--surface);\n}\n.upload-zone[_ngcontent-%COMP%]:hover {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone--dragging[_ngcontent-%COMP%] {\n  border-color: var(--blue);\n  background: var(--blue-light);\n  transform: scale(1.01);\n}\n.upload-zone--filled[_ngcontent-%COMP%] {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  color: var(--text-muted);\n}\n.upload-zone__text[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n}\n.upload-zone__text--filled[_ngcontent-%COMP%] {\n  color: var(--blue);\n  text-transform: none;\n  font-weight: 600;\n  font-size: 13px;\n  letter-spacing: 0;\n}\n.modal__actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 12px;\n  margin-top: 8px;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  background: white;\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  border-color: var(--text-secondary);\n  color: var(--text-primary);\n  background: var(--surface);\n}\n.btn-cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-approve[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: none;\n  border-radius: 10px;\n  background: var(--blue);\n  color: white;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.35);\n}\n.btn-approve[_ngcontent-%COMP%]:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.45);\n  transform: translateY(-1px);\n}\n.btn-approve[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn-approve[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n  box-shadow: none !important;\n}\n.btn-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: center;\n}\n.spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 0.9s linear infinite;\n}\n@media (max-width: 768px) {\n  .vp-wrapper[_ngcontent-%COMP%] {\n    padding: 24px 20px;\n  }\n  .vp-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .vp-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .vp-header__right[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-row--3-1[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal__actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .vendor-services[_ngcontent-%COMP%] {\n    max-width: 180px;\n  }\n}\n/*# sourceMappingURL=vendors.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Vendors, [{
    type: Component,
    args: [{ selector: "app-vendors", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
\r
  @if (!selectedVendor) {\r
\r
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">\r
    <div class="space-y-1">\r
      <h2 class="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Vendors &amp; Partners</h2>\r
      <p class="text-slate-500 mt-1 text-sm font-medium">\r
        Coordinate with {{ stats.totalActive }} active contractors and material suppliers.\r
      </p>\r
    </div>\r
    <button (click)="openAddModal()"\r
      class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r
      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>\r
      <div\r
        class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">\r
        <span class="material-symbols-outlined text-[20px]">add</span>\r
      </div>\r
      Add New Vendor\r
    </button>\r
  </div>\r
\r
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">\r
    <div class="bg-surface-container-low p-6 rounded-2xl space-y-2">\r
      <p class="text-xs font-bold uppercase tracking-widest text-outline">Total Active</p>\r
      <p class="text-4xl font-black text-on-surface">{{ stats.totalActive }}</p>\r
      <div class="h-1 w-12 bg-primary rounded-full"></div>\r
    </div>\r
    <div class="bg-surface-container-low p-6 rounded-2xl space-y-2">\r
      <p class="text-xs font-bold uppercase tracking-widest text-outline">Pending Payments</p>\r
      <p class="text-4xl font-black text-secondary">{{ stats.pendingPayments }}</p>\r
      <div class="h-1 w-12 bg-secondary rounded-full"></div>\r
    </div>\r
    <div class="bg-surface-container-low p-6 rounded-2xl space-y-2">\r
      <p class="text-xs font-bold uppercase tracking-widest text-outline">Compliant Partners</p>\r
      <p class="text-4xl font-black text-on-surface">{{ stats.compliantPartners }}</p>\r
      <div class="h-1 w-12 bg-primary-container rounded-full"></div>\r
    </div>\r
  </div>\r
\r
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\r
    @for (v of filteredVendors; track v.id) {\r
    <div (click)="openVendorDetail(v)"\r
      class="cursor-pointer bg-surface-container-lowest p-6 rounded-2xl group hover:shadow-2xl hover:border-primary/20 border border-transparent transition-all duration-300 relative overflow-hidden">\r
      <div class="absolute top-0 right-0 p-4">\r
        <span class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full" [ngClass]="v.statusColor">\r
          {{ v.status }}</span>\r
      </div>\r
      <div class="flex items-start gap-4 mb-6">\r
        <div class="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center">\r
          <span class="material-symbols-outlined text-outline">{{ v.icon }}</span>\r
        </div>\r
        <div>\r
          <h3 class="font-bold text-lg text-on-surface leading-tight group-hover:text-primary transition-colors">{{\r
            v.name }}</h3>\r
          <p class="text-sm text-outline">{{ v.type }}</p>\r
        </div>\r
      </div>\r
      <div class="space-y-3">\r
        <div class="flex items-center gap-3 text-sm text-on-surface-variant">\r
          <span class="material-symbols-outlined text-lg">mail</span> {{ v.email }}\r
        </div>\r
        <div class="flex items-center gap-3 text-sm text-on-surface-variant">\r
          <span class="material-symbols-outlined text-lg">call</span> {{ v.phone }}\r
        </div>\r
      </div>\r
      <div class="mt-4 flex flex-wrap gap-1.5">\r
        @for (svc of v.skill.slice(0,3); track svc) {\r
        <span class="px-2 py-0.5 bg-surface-container-low text-[10px] font-bold text-outline rounded-full">{{ svc\r
          }}</span>\r
        }\r
        @if (v.skill.length > 3) {\r
        <span class="px-2 py-0.5 bg-surface-container-low text-[10px] font-bold text-outline rounded-full">+{{\r
          v.skill.length - 3 }}</span>\r
        }\r
      </div>\r
      <div class="mt-5 flex items-center justify-between">\r
        <div>\r
          <p class="text-[10px] font-bold text-outline uppercase tracking-wider">Compliance Score</p>\r
          <p class="font-black text-lg" [class.text-green-600]="v.compliance_score >= 90"\r
            [class.text-amber-600]="v.compliance_score < 90 && v.compliance_score >= 70"\r
            [class.text-error]="v.compliance_score < 70">\r
            {{ v.compliance_score }}%\r
          </p>\r
        </div>\r
        <button class="cursor-pointer p-2 text-primary hover:bg-primary/5 rounded-full transition-colors">\r
          <span class="material-symbols-outlined">arrow_forward</span>\r
        </button>\r
      </div>\r
    </div>\r
    }\r
    @empty {\r
    <div class="col-span-3 py-24 flex flex-col items-center gap-4 text-outline">\r
      <span class="material-symbols-outlined text-5xl">storefront</span>\r
      <p class="font-bold">No vendors found. Add your first vendor to get started.</p>\r
    </div>\r
    }\r
  </div>\r
\r
  <div class="bg-surface-container-low rounded-3xl p-8 mt-4">\r
    <div class="flex items-center justify-between mb-8">\r
      <h3 class="text-xl font-black text-on-surface">Compliance &amp; Billing Activity</h3>\r
      <button class="cursor-pointer text-primary text-sm font-bold flex items-center gap-1 hover:underline">View All\r
        History</button>\r
    </div>\r
    <div class="space-y-6">\r
      @for (act of activities; track act.id) {\r
      <div class="flex items-center gap-6 group">\r
        <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">\r
          <span class="material-symbols-outlined" [ngClass]="act.iconColor">{{ act.icon }}</span>\r
        </div>\r
        <div class="flex-1 min-w-0">\r
          <p class="text-on-surface font-bold">{{ act.title }}</p>\r
          <p class="text-sm text-on-surface-variant truncate">{{ act.desc }}</p>\r
        </div>\r
        <p class="text-xs font-bold text-outline uppercase tracking-widest whitespace-nowrap">{{ act.time }}</p>\r
      </div>\r
      }\r
      @empty {\r
      <p class="text-center py-8 text-outline font-bold italic">No recent activity.</p>\r
      }\r
    </div>\r
  </div>\r
\r
  } @else {\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 VENDOR DETAIL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <div class="space-y-8 animate-in slide-in-from-right duration-500">\r
\r
    <div class="flex items-center gap-4 flex-wrap">\r
      <button (click)="closeDetail()"\r
        class="p-2 hover:bg-surface-container rounded-lg cursor-pointer transition-colors">\r
        <span class="material-symbols-outlined">arrow_back</span>\r
      </button>\r
      <div>\r
        <h2 class="text-3xl font-black tracking-tight text-on-surface">{{ selectedVendor.name }}</h2>\r
        <p class="text-sm text-outline font-medium">Partner Overview &amp; Execution Hub</p>\r
      </div>\r
      <div class="ml-auto flex gap-3 flex-wrap">\r
        <button\r
          class="px-5 py-2.5 bg-surface-container-highest text-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer"\r
          (click)="openVendorDetailData()">\r
          <span class="material-symbols-outlined text-lg">business_center</span> Vendor Details\r
        </button>\r
        <button\r
          class="px-5 py-2.5 bg-surface-container-highest text-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer"\r
          (click)="openAudit()">\r
          <span class="material-symbols-outlined text-lg">fact_check</span> Audits\r
        </button>\r
        <button\r
          class="px-5 py-2.5 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer"\r
          (click)="openBilling()">\r
          <span class="material-symbols-outlined text-lg">receipt</span> Billing\r
        </button>\r
        <button\r
          class="px-5 py-2.5 bg-surface-container-highest text-secondary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer"\r
          (click)="openLaborModal()">\r
          <span class="material-symbols-outlined text-lg">engineering</span> Labor\r
          @if (laborStats.totalPersonnel > 0) {\r
          <span class="bg-secondary text-white text-[10px] font-black px-2 py-0.5 rounded-full">{{\r
            laborStats.totalPersonnel }}</span>\r
          }\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">\r
      <div\r
        class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-32 border-l-4 border-primary">\r
        <span class="text-xs font-bold text-outline uppercase tracking-widest">Budget Allocated</span>\r
        <p class="text-2xl font-black">{{ selectedVendor.budget }}</p>\r
      </div>\r
      <div\r
        class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-32 border-l-4 border-secondary">\r
        <span class="text-xs font-bold text-outline uppercase tracking-widest">Active Tasks</span>\r
        <p class="text-2xl font-black">{{ allTasks.length }} Tasks</p>\r
      </div>\r
      <div class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-32">\r
        <span class="text-xs font-bold text-outline uppercase tracking-widest">Status</span>\r
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit"\r
          [ngClass]="selectedVendor.statusColor">{{ selectedVendor.status }}</span>\r
      </div>\r
      <div class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-32">\r
        <div class="flex items-center justify-between">\r
          <span class="text-xs font-bold text-outline uppercase tracking-widest">Compliance</span>\r
          <span class="text-sm font-black" [class.text-green-600]="selectedVendor.compliance_score >= 90"\r
            [class.text-amber-600]="selectedVendor.compliance_score < 90">\r
            {{ selectedVendor.compliance_score }}%\r
          </span>\r
        </div>\r
        <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">\r
          <div class="h-full rounded-full transition-all" [class.bg-green-600]="selectedVendor.compliance_score >= 90"\r
            [class.bg-amber-500]="selectedVendor.compliance_score < 90"\r
            [style.width.%]="selectedVendor.compliance_score"></div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">\r
      <div class="lg:col-span-12 w-full space-y-6">\r
\r
        <!-- Tasks -->\r
        <div class="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">\r
          <h3 class="text-xl font-black mb-6">Service Tasks &amp; Performance</h3>\r
          <div class="space-y-4">\r
            @for (task of (allTasks || []); track task.id) {\r
            <div\r
              class="flex items-center gap-6 p-4 bg-surface-container-low rounded-2xl border border-transparent hover:border-primary/20 transition-all group">\r
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">\r
                <span class="material-symbols-outlined text-primary">{{ selectedVendor.icon }}</span>\r
              </div>\r
              <div class="flex-1">\r
                <p class="font-bold text-on-surface">{{ task.title }}</p>\r
                <p class="text-xs text-outline">{{ task.due_date | date:'dd/MMM/yyyy' }}</p>\r
              </div>\r
              <select [value]="task.status" (change)="updateTaskStatus(task, $any($event.target).value)"\r
                class="text-[10px] font-black bg-surface-container-low border-none rounded-lg px-2 py-1 outline-none cursor-pointer appearance-none"\r
                (click)="$event.stopPropagation()">\r
                <option value="pending">Pending</option>\r
                <option value="in_progress">In Progress</option>\r
                <option value="completed">Completed</option>\r
                <option value="on_hold">On Hold</option>\r
              </select>\r
              <span class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"\r
                [ngClass]="getTaskStatusColor(task.status)">\r
                {{ task.status }}\r
              </span>\r
              <button (click)="deleteTask(task.id)"\r
                class="p-1.5 text-slate-300 hover:text-error transition-colors rounded-lg hover:bg-red-50 cursor-pointer">\r
                <span class="material-symbols-outlined text-base">delete</span>\r
              </button>\r
            </div>\r
            } @empty {\r
            <p class="text-center py-12 text-outline font-bold italic">No active tasks detected.</p>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Invoices -->\r
        <div class="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">\r
          <div class="flex justify-between items-center mb-6">\r
            <h3 class="text-xl font-black">Vendor Invoicing</h3>\r
            <button (click)="openSubmission()"\r
              class="text-primary text-xs font-black uppercase tracking-widest cursor-pointer hover:underline">\r
              + New Submission\r
            </button>\r
          </div>\r
          <table class="w-full text-left">\r
            <thead>\r
              <tr\r
                class="text-[10px] font-black uppercase tracking-widest text-outline border-b border-surface-container">\r
                <th class="py-4">Invoice #</th>\r
                <th class="py-4">Amount</th>\r
                <th class="py-4">Date</th>\r
                <th class="py-4">Status</th>\r
                <th class="py-4">Action</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (inv of invoices; track inv.id) {\r
              <tr class="border-b border-surface-container/50 hover:bg-surface-container-low/30 transition-colors">\r
                <td class="py-4 font-bold">{{ inv.invoice_number }}</td>\r
                <td class="py-4 font-black">\u20B9{{ (+inv.grand_total).toLocaleString('en-IN') }}</td>\r
                <td class="py-4 text-sm text-outline">{{ formatDate(inv.invoice_date) }}</td>\r
                <td class="py-4">\r
                  <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter"\r
                    [ngClass]="inv.status === 'Paid' ? 'bg-green-100 text-green-700' : inv.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'">\r
                    {{ inv.status }}\r
                  </span>\r
                </td>\r
                <td class="py-4">\r
                  <div class="flex items-center gap-3">\r
\r
                    <button (click)="viewInvoice(inv)"\r
                      class="flex items-center gap-1.5 text-xs font-bold text-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer">\r
                      <span class="material-symbols-outlined text-sm">visibility</span>\r
                    </button>\r
\r
                    <button (click)="payInvoice(inv)"\r
                      class="flex items-center gap-1.5 text-xs font-bold text-green-600 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">\r
                      <span class="material-symbols-outlined text-sm">payments</span>\r
                    </button>\r
\r
                    <button (click)="openCancelInvoiceDialog(inv)"\r
                      class="flex items-center gap-1.5 text-xs font-bold text-red-600 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">\r
                      <span class="material-symbols-outlined text-sm">cancel</span>\r
                    </button>\r
\r
                  </div>\r
                </td>\r
              </tr>\r
              } @empty {\r
              <tr>\r
                <td colspan="5" class="text-center py-8 text-outline font-bold italic">No invoice records found.</td>\r
              </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
\r
      </div>\r
    </div>\r
  </div>\r
  }\r
  <app-common-dialog [open]="payInvoiceeModal" backdropClass="bg-black/50" panelClass="bg-white rounded-2xl p-6"\r
    title="Vendor Invoice Payment" subtitle="Pay selected vendor invoice" [showCloseButton]="true" [showFooter]="true"\r
    cancelLabel="Cancel" primaryLabel="Confirm Payment" [primaryDisabled]="isProcessingPayment"\r
    (closed)="closePayModal()" (primary)="confirmPayment()">\r
\r
    <div class="space-y-3">\r
\r
      <!-- Invoice Summary -->\r
      <div class="bg-slate-50 rounded-xl p-4 space-y-2">\r
        <div class="flex justify-between items-center">\r
          <p class="text-xs text-slate-500">Invoice Number</p>\r
          <p class="font-bold text-sm">{{ selectedInvoice?.invoice_number }}</p>\r
        </div>\r
        <div class="flex justify-between items-center">\r
          <p class="text-xs text-slate-500">Invoice Date</p>\r
          <p class="font-semibold text-sm">{{ formatDate(selectedInvoice?.invoice_date) }}</p>\r
        </div>\r
        <div class="flex justify-between items-center">\r
          <p class="text-xs text-slate-500">Subtotal</p>\r
          <p class="font-semibold text-sm">\u20B9{{ (+(selectedInvoice?.subtotal || 0)).toLocaleString('en-IN') }}</p>\r
        </div>\r
        <div class="flex justify-between items-center">\r
          <p class="text-xs text-slate-500">Tax Amount</p>\r
          <p class="font-semibold text-sm text-amber-600">\u20B9{{ (+(selectedInvoice?.tax_amount ||\r
            0)).toLocaleString('en-IN') }}</p>\r
        </div>\r
        <div class="flex justify-between items-center border-t border-slate-200 pt-2 mt-1">\r
          <p class="text-xs font-black text-slate-600 uppercase tracking-wide">Grand Total</p>\r
          <p class="font-black text-base text-green-600">\u20B9{{ (+(selectedInvoice?.grand_total ||\r
            0)).toLocaleString('en-IN') }}</p>\r
        </div>\r
      </div>\r
\r
      <!-- Project + Settlement Section -->\r
      <div class="bg-slate-50 rounded-xl p-4 space-y-4">\r
\r
        <!-- Project Select -->\r
        <div class="flex items-center text-[10px]">\r
          <span class="font-black uppercase tracking-widest text-outline mr-2">\r
            Project :\r
          </span>\r
          <span class="font-bold opacity-80">\r
            {{ projectdata?.name }}\r
          </span>\r
        </div>\r
        <!-- Settlement Cards + Milestone Drill-down -->\r
        @if (showSettlementCards) {\r
\r
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">\r
\r
          <div (click)="onSettlementTypeChange('work_poc')"\r
            [ngClass]="{'bg-blue-600 text-white border-blue-600': selectedSettlementType==='work_poc'}"\r
            class="cursor-pointer rounded-2xl border-2 border-slate-200 p-4 flex flex-col items-center justify-center gap-1 transition-all">\r
            <span class="material-symbols-outlined text-2xl">account_balance_wallet</span>\r
            <p class="text-xs font-black uppercase tracking-wider">Work POC</p>\r
            @if (projectdata?.work_poc_completion != null) {\r
            <p class="text-[10px] font-bold mt-1 opacity-80">{{ projectdata.work_poc_completion }}% complete</p>\r
            }\r
          </div>\r
\r
          <div (click)="onSettlementTypeChange('milestone')"\r
            [ngClass]="{'bg-blue-600 text-white border-blue-600': selectedSettlementType==='milestone'}"\r
            class="cursor-pointer rounded-2xl border-2 border-slate-200 p-4 flex flex-col items-center justify-center gap-1 transition-all">\r
            <span class="material-symbols-outlined text-2xl">flag</span>\r
            <p class="text-xs font-black uppercase tracking-wider">Milestone</p>\r
            @if (projectdata?.milestone_completion != null) {\r
            <p class="text-[10px] font-bold mt-1 opacity-80">{{ projectdata.milestone_completion }}% complete</p>\r
            }\r
          </div>\r
\r
          <div (click)="onSettlementTypeChange('lumpsum')"\r
            [ngClass]="{'bg-blue-600 text-white border-blue-600': selectedSettlementType==='lumpsum'}"\r
            class="cursor-pointer rounded-2xl border-2 border-slate-200 p-4 flex flex-col items-center justify-center gap-1 transition-all">\r
            <span class="material-symbols-outlined text-2xl">payments</span>\r
            <p class="text-xs font-black uppercase tracking-wider">Lump Sum</p>\r
            @if (projectdata?.lumpsum_completion != null) {\r
            <p class="text-[10px] font-bold mt-1 opacity-80">{{ projectdata.lumpsum_completion }}% complete</p>\r
            }\r
          </div>\r
\r
        </div>\r
\r
        <!-- WORK POC \u2014 Milestone Drill-down -->\r
        @if (false) {
        <div class="space-y-2">\r
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Select Milestone</p>\r
\r
          @if (isLoadingMilestones) {\r
          <div class="flex items-center gap-2 text-slate-400 text-xs py-2">\r
            <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Loading milestones\u2026\r
          </div>\r
          } @else if (milestones.length === 0) {\r
          <p class="text-xs text-slate-400 italic py-2">No milestones found for this project.</p>\r
          } @else {\r
          @for (m of milestones; track m.id) {\r
          <div (click)="onMilestoneSelect(m.id)"\r
            [ngClass]="{'border-blue-500 bg-blue-50': selectedMilestoneId === m.id}"\r
            class="cursor-pointer border-2 border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between transition-all hover:border-blue-300">\r
            <div>\r
              <p class="text-sm font-bold text-slate-800">{{ m.name ?? m.title }}</p>\r
              @if (m.endDate) {\r
              <p class="text-[10px] text-slate-400">Due: {{ m.endDate | date:'dd/MMM/yyyy' }}</p>\r
              }\r
            </div>\r
            <div class="text-right">\r
              @if (m.progress != null) {\r
              <p class="text-xs font-black" [ngClass]="m.progress >= 100 ? 'text-green-600' : 'text-amber-600'">\r
                {{ m.progress }}%\r
              </p>\r
              <div class="w-16 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">\r
                <div class="h-full rounded-full transition-all"\r
                  [ngClass]="m.progress >= 100 ? 'bg-green-500' : 'bg-amber-400'" [style.width.%]="m.progress"></div>\r
              </div>\r
              }\r
            </div>\r
          </div>\r
          }\r
          }\r
\r
          <!-- Sub-Milestones -->\r
          @if (selectedMilestoneId && subMilestones.length > 0) {\r
          <div class="ml-3 mt-3 space-y-2 border-l-2 border-blue-100 pl-4">\r
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Sub-Milestones</p>\r
\r
            @if (isLoadingSubMilestones) {\r
            <div class="flex items-center gap-2 text-slate-400 text-xs py-2">\r
              <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Loading\u2026\r
            </div>\r
            } @else {\r
            @for (sm of subMilestones; track sm.id) {\r
            <div (click)="onSubMilestoneSelect(sm)"\r
              [ngClass]="{'border-blue-500 bg-blue-50': selectedSubMilestoneId === sm.id}"\r
              class="cursor-pointer border-2 border-slate-200 rounded-xl px-4 py-3 transition-all hover:border-blue-300">\r
              <div class="flex items-center justify-between">\r
                <p class="text-sm font-bold text-slate-800">{{ sm.name ?? sm.title }}</p>\r
                <div class="text-right">\r
                  @if (sm.progress != null) {\r
                  <p class="text-[10px] font-bold" [ngClass]="sm.progress >= 100 ? 'text-green-600' : 'text-amber-600'">\r
                    {{ sm.progress }}% done\r
                  </p>\r
                  }\r
                </div>\r
              </div>\r
\r
              @if (selectedSubMilestoneId === sm.id && milestoneTasks.length > 0) {\r
              <div class="mt-3 space-y-1.5 pt-3 border-t border-slate-100">\r
                <p class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Tasks</p>\r
                @for (task of milestoneTasks; track task.id) {\r
                <div class="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-slate-100">\r
                  <p class="text-xs font-semibold text-slate-700">{{ task.title }}</p>\r
                  <span class="px-2 py-0.5 rounded text-[9px] font-black uppercase" [ngClass]="task.status === 'completed' ? 'bg-green-100 text-green-700' :\r
                                           task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :\r
                                           'bg-amber-100 text-amber-700'">\r
                    {{ task.status }}\r
                  </span>\r
                </div>\r
                }\r
              </div>\r
              }\r
\r
            </div>\r
            }\r
            }\r
          </div>\r
          }\r
\r
        </div>\r
        }

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Milestone
            </label>
            @if (isLoadingMilestones) {
            <div class="flex items-center gap-2 text-slate-400 text-xs py-2">
              <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Loading milestones...
            </div>
            } @else {
            <select multiple [(ngModel)]="selectedMilestoneIds" (ngModelChange)="onMilestoneMultiSelect()"
              class="w-full min-h-28 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              @for (m of milestones; track m.id) {
              <option [ngValue]="m.id">
                {{ m.name ?? m.title }}{{ m.progress > 0 ? ' - ' + m.progress + '%' : '' }}
              </option>
              }
            </select>
            @if (milestones.length === 0) {
            <p class="text-[10px] text-slate-400 mt-1">No milestones found for this project.</p>
            } @else {
            <p class="text-[10px] text-slate-400 mt-1">{{ selectedMilestoneIds.length }} selected</p>
            }
            }
          </div>

          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Sub-Milestone
            </label>
            <select multiple [(ngModel)]="selectedSubMilestoneIds" (ngModelChange)="onSubMilestoneMultiSelect()"
              class="w-full min-h-28 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              @for (sm of availableSubMilestones; track sm.id) {
              <option [ngValue]="sm.id">
                {{ sm.name ?? sm.title }}{{ sm.progress > 0 ? ' - ' + sm.progress + '%' : '' }}
              </option>
              }
            </select>
            @if (availableSubMilestones.length === 0) {
            <p class="text-[10px] text-slate-400 mt-1">Select a milestone to view sub-milestones.</p>
            } @else {
            <p class="text-[10px] text-slate-400 mt-1">{{ selectedSubMilestoneIds.length }} selected</p>
            }
          </div>

          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Task
            </label>
            <select multiple [(ngModel)]="selectedTaskIds" (ngModelChange)="onTaskMultiSelect()"
              class="w-full min-h-28 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              @for (task of availableTaskOptions; track task.id) {
              <option [ngValue]="task.id">
                {{ task.title }}{{ (task.progress ?? 0) > 0 ? ' - ' + task.progress + '%' : task.status ? ' - ' + task.status : '' }}
              </option>
              }
            </select>
            @if (selectedSubMilestoneIds.length === 0) {
            <p class="text-[10px] text-slate-400 mt-1">Select a sub-milestone to view tasks.</p>
            } @else if (availableTaskOptions.length === 0) {
            <p class="text-[10px] text-slate-400 mt-1">No tasks found from project task API.</p>
            } @else {
            <p class="text-[10px] text-slate-400 mt-1">{{ selectedTaskIds.length }} selected</p>
            }
          </div>

          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">
              {{ settlementCompletionLabel }}
            </label>
            <input [(ngModel)]="settlementCompletion" type="number" min="0" max="100"
              [readonly]="!isSettlementCompletionEditable"
              [ngClass]="isSettlementCompletionEditable ? 'bg-white' : 'bg-slate-100 text-slate-500 cursor-not-allowed'"
              class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500/20">
            <p class="text-[10px] text-slate-400 mt-1">
              {{ isSettlementCompletionEditable ? 'Auto-filled from selection, editable for Work POC.' : 'Auto-filled from selection, read-only for Milestone and Lump Sum.' }}
            </p>
          </div>
        </div>

        }
\r
      </div>\r
      <!-- Payment Fields -->\r
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
        <div>\r
          <label class="block text-xs font-black uppercase tracking-wide text-slate-500 mb-1">\r
            Amount to Pay (\u20B9) <span class="text-red-500">*</span>\r
          </label>\r
          <div class="relative">\r
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">\u20B9</span>\r
            <input [(ngModel)]="paymentForm.amount" type="number" min="0" [max]="selectedInvoice?.grand_total ?? null"\r
              [placeholder]="(+(selectedInvoice?.grand_total || 0)).toString()"\r
              class="w-full pl-7 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-green-500/20">\r
          </div>\r
          <p class="text-[10px] text-slate-400 mt-1">\r
            Grand total: \u20B9{{ (+(selectedInvoice?.grand_total || 0)).toLocaleString('en-IN') }}\r
          </p>\r
        </div>\r
\r
        <div>\r
          <label class="block text-xs font-black uppercase tracking-wide text-slate-500 mb-1">\r
            Payment Mode <span class="text-red-500">*</span>\r
          </label>\r
          <select [(ngModel)]="paymentForm.mode" (ngModelChange)="onPaymentModeChange($event)"\r
            class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-green-500/20">\r
            <option value="">Select mode</option>\r
            <option value="Bank Transfer">Bank Transfer</option>\r
            <option value="UPI">UPI</option>\r
            <option value="Cheque">Cheque</option>\r
            <option value="Cash">Cash</option>\r
          </select>\r
        </div>\r
      </div>\r
\r
      @if (paymentForm.mode === 'Cheque') {\r
      <div>\r
        <label class="block text-xs font-black uppercase tracking-wide text-slate-500 mb-1">\r
          Cheque Clearance Date <span class="text-red-500">*</span>\r
        </label>\r
        <input [(ngModel)]="paymentForm.clearance_date" type="date"\r
          class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">\r
      </div>\r
      }\r
\r
      @if (paymentForm.mode !== 'Cash') {\r
      <div>\r
        <label class="block text-xs font-black uppercase tracking-wide text-slate-500 mb-1">\r
          Reference / Transaction No.\r
          <span class="normal-case font-normal tracking-normal text-slate-400 ml-1">(Optional)</span>\r
        </label>\r
        <input [(ngModel)]="paymentForm.reference" type="text" placeholder="e.g. UTR123456789"\r
          class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-green-500/20">\r
      </div>\r
      }\r
\r
      @if (paymentError) {\r
      <div class="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">\r
        <span class="material-symbols-outlined text-red-600 text-sm">error</span>\r
        <p class="text-xs font-bold text-red-600">{{ paymentError }}</p>\r
      </div>\r
      }\r
\r
    </div>\r
\r
  </app-common-dialog>\r
\r
  <app-common-dialog [open]="showCancelInvoiceModal && !!selectedInvoice" size="sm" variant="danger"\r
    title="Cancel Invoice" subtitle="This action will reject the invoice and cannot be undone." icon="delete_forever"\r
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Keep Invoice" primaryLabel="Cancel Invoice"\r
    [primaryDisabled]="isCancellingInvoice" (closed)="closeCancelInvoiceDialog()" (primary)="confirmCancelInvoice()">\r
    <div class="px-6 py-5">\r
      <p class="text-sm font-medium text-slate-600 dark:text-slate-300">\r
        Are you sure you want to cancel invoice <strong>{{ selectedInvoice?.invoice_number }}</strong>?\r
      </p>\r
    </div>\r
  </app-common-dialog>\r
</section>\r
\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 LABOR MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showLaborModal && !!selectedVendor" maxWidth="max-w-[798px]" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-[2rem] max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 my-4"\r
  (closed)="closeLaborModal()">\r
\r
  <div\r
    class="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4 sm:px-6 py-4 text-white relative shrink-0 overflow-hidden">\r
\r
    <div class="absolute top-0 right-0 p-4 opacity-5 select-none pointer-events-none">\r
      <span class="material-symbols-outlined text-[70px]">engineering</span>\r
    </div>\r
\r
    <div class="flex justify-between items-start gap-4 relative z-10">\r
      <div class="min-w-0">\r
        <h3 class="text-2xl sm:text-xl font-black tracking-tight mt-1 truncate">\r
          Labor Details\r
        </h3>\r
\r
        <p class="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 break-words">\r
          Manage Labor\r
        </p>\r
      </div>\r
\r
      <button (click)="closeLaborModal()"\r
        class="p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer shrink-0">\r
        <span class="material-symbols-outlined text-lg">close</span>\r
      </button>\r
    </div>\r
\r
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 relative z-10">\r
\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">\r
          Active\r
        </p>\r
\r
        <p class="text-base sm:text-lg font-black mt-0.5 truncate">\r
          @if (laborLoading) {\r
          <span class="text-white/30">\u2014</span>\r
          } @else {\r
          {{ laborStats.activePersonnel }}\r
          }\r
        </p>\r
      </div>\r
\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">\r
          On Site\r
        </p>\r
\r
        <p class="text-base sm:text-lg font-black mt-0.5 text-green-400 truncate">\r
          @if (laborLoading) {\r
          <span class="text-white/30">\u2014</span>\r
          } @else {\r
          {{ laborStats.onSite }}\r
          }\r
        </p>\r
      </div>\r
\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">\r
          Remaining\r
        </p>\r
\r
        <p class="text-base sm:text-lg font-black mt-0.5 text-amber-400 truncate">\r
          @if (laborLoading) {\r
          <span class="text-white/30">\u2014</span>\r
          } @else {\r
          {{ laborStats.remaining }}\r
          }\r
        </p>\r
      </div>\r
\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">\r
          Workers\r
        </p>\r
\r
        <p class="text-base sm:text-lg font-black mt-0.5 truncate">\r
          @if (laborLoading) {\r
          <span class="text-white/30">\u2014</span>\r
          } @else {\r
          {{ laborStats.totalPersonnel }}\r
          }\r
        </p>\r
      </div>\r
\r
    </div>\r
  </div>\r
\r
\r
  <div class="flex-1 overflow-y-auto overflow-x-hidden p-1 sm:p-2 lg:p-2">\r
\r
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">\r
\r
\r
      <div class="lg:col-span-12 min-w-0 space-y-6">\r
\r
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-1 sm:p-2">\r
\r
\r
          <div class="border-2 border-dashed border-outline-variant/20 rounded-2xl overflow-hidden">\r
\r
            <button (click)="toggleAddLaborForm()"\r
              class="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 text-left hover:bg-surface-container-low transition-colors cursor-pointer">\r
\r
              <div class="flex items-center gap-3 min-w-0">\r
                <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">\r
                  <span class="material-symbols-outlined text-primary text-base">\r
                    {{ showAddLaborForm ? 'expand_less' : 'person_add' }}\r
                  </span>\r
                </div>\r
\r
                <span class="text-sm font-black text-on-surface truncate">\r
                  {{ showAddLaborForm ? 'Cancel' : 'Add New Worker' }}\r
                </span>\r
              </div>\r
\r
              <span class="material-symbols-outlined text-outline shrink-0">\r
                {{ showAddLaborForm ? 'close' : 'add' }}\r
              </span>\r
            </button>\r
\r
            @if (showAddLaborForm) {\r
\r
            <div class="px-4 sm:px-6 pb-6 space-y-4 border-t border-outline-variant/10">\r
\r
              @if (laborError) {\r
              <div\r
                class="mt-4 flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 px-4 py-3 rounded-xl">\r
\r
                <span class="material-symbols-outlined text-error text-lg shrink-0">\r
                  error\r
                </span>\r
\r
                <p class="text-sm font-bold text-error break-words">\r
                  {{ laborError }}\r
                </p>\r
              </div>\r
              }\r
\r
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">\r
\r
\r
                <div class="min-w-0">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1 block">\r
                    Skill *\r
                  </label>\r
\r
                  <select [(ngModel)]="newLabor.skill"\r
                    class="w-full min-w-0 px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest cursor-pointer">\r
\r
                    <option value="" disabled>Select skill</option>\r
\r
                    @for (s of skillOptions; track s.value) {\r
                    <option [value]="s.value">{{ s.label }}</option>\r
                    }\r
                  </select>\r
                </div>\r
\r
\r
                <div class="min-w-0">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1 block">\r
                    Daily Rate (\u20B9)\r
                  </label>\r
\r
                  <input [(ngModel)]="newLabor.daily_rate" type="number" min="0" placeholder="e.g. 800"\r
                    class="w-full min-w-0 px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest">\r
                </div>\r
\r
\r
                <div class="min-w-0">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1 block">\r
                    Initial Status\r
                  </label>\r
\r
                  <select [(ngModel)]="newLabor.status"\r
                    class="w-full min-w-0 px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest cursor-pointer">\r
                    <option value="active">Active</option>\r
                    <option value="inactive">Inactive</option>\r
                  </select>\r
                </div>\r
\r
\r
                <div class="min-w-0">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1 block">\r
                    Count (no. of workers) *\r
                  </label>\r
\r
                  <input [(ngModel)]="newLabor.labor_count" type="number" min="1" placeholder="e.g. 5"\r
                    class="w-full min-w-0 px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest">\r
                </div>\r
\r
              </div>\r
\r
              <div class="min-w-0">\r
                <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1 block">Assign To</label>\r
                <select [(ngModel)]="newLabor.assign_worker"\r
                  class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest cursor-pointer">\r
                  <option value="">Unassigned</option>\r
                  @for (m of team; track m.name) {\r
                  <option [value]="m.name">{{ m.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
\r
              <button (click)="submitLabor()" [disabled]="isSavingLabor"\r
                class="w-full py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">\r
\r
                @if (isSavingLabor) {\r
                <span class="material-symbols-outlined animate-spin text-sm">\r
                  progress_activity\r
                </span>\r
                Saving\u2026\r
                } @else {\r
                <span class="material-symbols-outlined text-sm">\r
                  add_circle\r
                </span>\r
                Confirm &amp; Add Worker\r
                }\r
\r
              </button>\r
\r
            </div>\r
            }\r
\r
          </div>\r
\r
          @if (laborLoading) {\r
\r
          <div class="py-16 flex flex-col items-center gap-3 text-outline">\r
            <span class="material-symbols-outlined text-4xl animate-spin">\r
              progress_activity\r
            </span>\r
\r
            <p class="text-sm font-bold">\r
              Loading workforce data\u2026\r
            </p>\r
          </div>\r
\r
          } @else if (laborWorkers.length === 0) {\r
\r
          <div class="py-16 flex flex-col items-center gap-3 text-outline text-center">\r
            <span class="material-symbols-outlined text-5xl">\r
              person_search\r
            </span>\r
\r
            <p class="font-bold">\r
              No workers assigned yet.\r
            </p>\r
\r
            <p class="text-sm">\r
              Click "Add Worker" above to onboard the first team member.\r
            </p>\r
          </div>\r
\r
          } @else if (!showAddLaborForm) {\r
\r
          <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">\r
            <table class="w-full text-sm mt-5">\r
\r
              <thead>\r
                <tr class="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">\r
                  <th class="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-outline">Skill\r
                  </th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Worker\r
                    Count</th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Assign\r
                  </th>\r
                  <th class="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-outline">Rate\r
                    (\u20B9/day)</th>\r
                  <th class="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-outline">Daily\r
                    Cost (\u20B9)</th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Status\r
                  </th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Action\r
                  </th>\r
                </tr>\r
              </thead>\r
\r
              <tbody>\r
                @for (worker of laborWorkers; track worker.id) {\r
\r
                @if (editingLaborId === worker.id) {\r
                <tr class="border-b border-slate-200 dark:border-slate-700 bg-primary/5 dark:bg-primary/10">\r
                  <td colspan="7" class="px-4 py-4">\r
                    <div class="space-y-4">\r
                      <p class="text-[10px] font-black uppercase tracking-widest text-primary">\r
                        Editing Worker #{{ worker.id }}\r
                      </p>\r
\r
                      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">\r
\r
                        <div class="min-w-0">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Skill</label>\r
                          <select [(ngModel)]="editLaborForm.skill"\r
                            class="w-full min-w-0 px-3 py-2 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none bg-surface-container-lowest cursor-pointer">\r
                            @for (s of skillOptions; track s.value) {\r
                            <option [value]="s.value">{{ s.label }}</option>\r
                            }\r
                          </select>\r
                        </div>\r
\r
                        <div class="min-w-0">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Worker Count</label>\r
                          <input [(ngModel)]="editLaborForm.labor_count" type="number" min="1"\r
                            class="w-full min-w-0 px-3 py-2 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none bg-surface-container-lowest">\r
                        </div>\r
\r
                        <div class="min-w-0">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Daily Rate (\u20B9)</label>\r
                          <input [(ngModel)]="editLaborForm.daily_rate" type="number" min="0"\r
                            class="w-full min-w-0 px-3 py-2 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none bg-surface-container-lowest">\r
                        </div>\r
\r
                        <div class="min-w-0">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Status</label>\r
                          <select [(ngModel)]="editLaborForm.status"\r
                            class="w-full min-w-0 px-3 py-2 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none bg-surface-container-lowest cursor-pointer">\r
                            <option value="active">Active</option>\r
                            <option value="inactive">Inactive</option>\r
                          </select>\r
                        </div>\r
\r
                        <div class="min-w-0">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Assign To</label>\r
                          <select [(ngModel)]="editLaborForm.assign_worker"\r
                            class="w-full min-w-0 px-3 py-2 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none bg-surface-container-lowest cursor-pointer">\r
                            <option value="">Unassigned</option>\r
                            @for (m of team; track m.name) {\r
                            <option [value]="m.name">{{ m.name }}</option>\r
                            }\r
                          </select>\r
                        </div>\r
\r
                      </div>\r
\r
                      <div class="flex flex-col sm:flex-row gap-2 pt-2">\r
                        <button (click)="saveLaborEdit(worker.id)"\r
                          class="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide cursor-pointer hover:scale-[1.01] transition-transform shadow-md shadow-primary/20">\r
                          <span class="material-symbols-outlined text-sm align-middle mr-1">check_circle</span>\r
                          Save Changes\r
                        </button>\r
                        <button (click)="cancelLaborEdit()"\r
                          class="flex-1 py-2.5 rounded-xl border-2 border-outline-variant/30 text-xs font-black uppercase cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">\r
                          Cancel\r
                        </button>\r
                      </div>\r
                    </div>\r
                  </td>\r
                </tr>\r
                } @else {\r
                <tr\r
                  class="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">\r
                  <td class="px-4 py-3 text-sm font-bold text-on-surface">\r
                    {{ worker.skill }}\r
                  </td>\r
\r
                  <td class="px-4 py-3 text-center">\r
                    <span class="inline-block px-2.5 py-1 bg-primary/10 text-primary font-black text-xs rounded-lg">\r
                      {{ worker.labor_count }}\r
                    </span>\r
                  </td>\r
                  <td class="px-4 py-3 text-center">\r
                    <span class="inline-block px-2.5 py-1 bg-primary/10 text-primary font-black text-xs rounded-lg">\r
                      {{ worker.assign_worker }}\r
                    </span>\r
                  </td>\r
\r
                  <td class="px-4 py-3 text-right font-semibold text-on-surface">\r
                    \u20B9{{ worker.daily_rate }}\r
                  </td>\r
\r
                  <td class="px-4 py-3 text-right font-black text-lg text-primary">\r
                    \u20B9{{ worker.daily_rate * worker.labor_count }}\r
                  </td>\r
\r
                  <td class="px-4 py-3 text-center">\r
                    <span class="inline-block px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg"\r
                      [ngClass]="worker.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'">\r
                      {{ worker.status }}\r
                    </span>\r
                  </td>\r
\r
                  <td class="px-4 py-3 text-center">\r
                    <div class="flex items-center justify-center gap-2">\r
                      <button (click)="editLaborWorker(worker.id)"\r
                        class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"\r
                        title="Edit worker">\r
                        <span class="material-symbols-outlined text-lg">edit</span>\r
                      </button>\r
                      <button (click)="deleteLaborWorker(worker.id)"\r
                        class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-error transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"\r
                        title="Delete worker">\r
                        <span class="material-symbols-outlined text-lg">delete</span>\r
                      </button>\r
                    </div>\r
                  </td>\r
                </tr>\r
                }\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
\r
          }\r
\r
        </div>\r
\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
  <div\r
    class="shrink-0 px-4 sm:px-6 py-3 border-t border-surface-container bg-surface-container-lowest/50 flex justify-end">\r
\r
    <button (click)="closeLaborModal()"\r
      class="w-full sm:w-[90px] py-2 rounded-lg bg-on-surface text-white text-xs font-bold uppercase tracking-wide cursor-pointer shadow-md hover:scale-[1.02] transition-transform">\r
\r
      Done\r
    </button>\r
\r
  </div>\r
\r
</app-common-dialog>\r
\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 ADD / EDIT VENDOR MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showAddModal" maxWidth="max-w-2xl" backdropClass="bg-slate-900/40"\r
  panelClass="bg-white dark:bg-slate-900 rounded-2xl my-auto flex flex-col max-h-[92vh] overflow-hidden"\r
  title="{{ isEditMode ? 'Update' : 'Onboard New' }} Vendor"\r
  subtitle="{{ isEditMode ? 'Update vendor information.' : 'Add vendor information.' }}" [showCloseButton]="true"\r
  [showFooter]="true" [showDefaultFooterButtons]="false" (closed)="showAddModal = false">\r
  @if (isEditMode && selectedVendor) {\r
  <div class="bg-surface-container-low px-3 py-2 rounded-xl flex items-center justify-between h-[42px] mx-6 mt-3">\r
    <span class="text-[11px] font-bold uppercase tracking-widest text-outline">Status</span>\r
    <select\r
      class="px-3 py-1 rounded-full text-[12px] font-bold uppercase cursor-pointer border border-outline-variant/20 outline-none"\r
      (change)="updateVendorStatus($any($event.target).value)" [ngClass]="selectedVendor.statusColor"\r
      [value]="selectedVendor.status">\r
      <option value="Active">Active</option>\r
      <option value="Pending">Pending</option>\r
      <option value="Inactive">Inactive</option>\r
    </select>\r
  </div>\r
  }\r
  <div class="px-6 pt-5 pb-4 shrink-0">\r
    <div class="flex items-center">\r
\r
      @for (step of vendorSteps; track step.num) {\r
      <div class="flex items-center flex-1 min-w-0">\r
        <div class="flex flex-col items-center gap-1 w-28 min-w-0">\r
\r
          <div\r
            class="w-9 h-9 flex-none rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 shrink-0"\r
            [ngClass]="{\r
            'bg-primary text-white shadow-md shadow-primary/30': currentStep === step.num,\r
            'bg-primary/80 text-white': currentStep > step.num,\r
            'bg-slate-200 text-slate-600': currentStep < step.num\r
          }">\r
\r
            @if (currentStep > step.num) {\r
            <span class="material-symbols-outlined text-sm text-white">check</span>\r
            } @else {\r
            <span [ngClass]="currentStep === step.num ? 'text-white' : 'text-slate-600'">{{ step.num }}</span>\r
            }\r
\r
          </div>\r
\r
          <span class="text-xs font-bold uppercase tracking-wider whitespace-nowrap"\r
            [ngClass]="currentStep === step.num ? 'text-slate-900' : 'text-outline'">\r
            {{ step.label }}\r
          </span>\r
\r
        </div>\r
\r
        @if (step.num < vendorSteps.length) { <div\r
          class="flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500"\r
          [ngClass]="currentStep > step.num ? 'bg-primary' : 'bg-surface-container'">\r
      </div>\r
      }\r
\r
    </div>\r
    }\r
\r
  </div>\r
  </div>\r
\r
  <div class="flex-1 overflow-y-auto px-6 pb-2" style="min-height: 0;">\r
\r
    @if (currentStep === 1) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Vendor Legal Name\r
          <span class="text-error">*</span></label>\r
        <input [(ngModel)]="newVendor.name" type="text" placeholder="e.g. Skyline Structural Engineering"\r
          class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-shadow">\r
      </div>\r
      <div class="grid grid-cols-2 gap-3">\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">SPOC Name <span\r
              class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.spoc.name" type="text" placeholder="Full Name"\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">SPOC Phone <span\r
              class="text-error">*</span></label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.spoc.phone" type="tel" inputmode="numeric" pattern="[0-9]*"\r
              placeholder="10-digit number" maxlength="10" (input)="sanitizePhone($event, 'spoc')"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 pr-12">\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.spoc.phone?.length ?? 0 }}/10</span>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="grid grid-cols-2 gap-3">\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Official Email\r
            <span class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.email" type="email" placeholder="official@vendor.com"\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Official Phone\r
            <span class="text-error">*</span></label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.phone" type="tel" inputmode="numeric" pattern="[0-9]*"\r
              placeholder="10-digit number" maxlength="10" (input)="sanitizePhone($event, 'official')"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 pr-12">\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.phone?.length ?? 0 }}/10</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    }\r
\r
    @if (currentStep === 2) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
      <div\r
        class="flex items-center justify-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl px-4 py-3">\r
        <span class="material-symbols-outlined text-amber-600 text-base">info</span>\r
        <p class="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed text-center">\r
          Provide <strong>GST No.</strong> or <strong>PAN Card No.</strong> \u2014 at least one is required.\r
        </p>\r
      </div>\r
      <div class="grid grid-cols-2 gap-3">\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">GST No.</label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.kyc.gst" type="text" maxlength="15" placeholder="22AAAAA0000A1Z5"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-primary/20 pr-12">\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.kyc.gst?.length ?? 0 }}/15</span>\r
          </div>\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">PAN Card\r
            No.</label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.kyc.pan" type="text" maxlength="10" placeholder="ABCDE1234F"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-primary/20 pr-12">\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.kyc.pan?.length ?? 0 }}/10</span>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="grid grid-cols-3 gap-3">\r
        <div class="col-span-2">\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Physical Address\r
            <span class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.address.street" type="text" placeholder="Industrial Area, Sector 5..."\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Pincode <span\r
              class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.address.pincode" type="tel" maxlength="6" placeholder="400001"\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">\r
        </div>\r
      </div>\r
    </div>\r
    }\r
\r
    @if (currentStep === 3) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">\r
          Budget Allocation <span class="text-error">*</span>\r
        </label>\r
        <div class="relative">\r
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-outline">\u20B9</span>\r
          <input [(ngModel)]="newVendor.budget" type="text" placeholder="500000"\r
            class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">\r
        </div>\r
        <p class="text-[9px] text-outline/70 mt-1">Enter budget in INR (e.g. 500000)</p>\r
      </div>\r
\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">\r
          Skill / Services Offered <span class="text-error">*</span>\r
        </label>\r
\r
        <div class="border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-lowest">\r
\r
          <div\r
            class="flex items-center justify-between px-4 py-2.5 bg-surface-container border-b border-outline-variant/10">\r
            <span class="text-[10px] font-bold text-outline">\r
              {{ newVendor.skill?.length > 0 ? newVendor.skill.length + ' skill(s) selected' : 'Select skills' }}\r
            </span>\r
            @if (newVendor.skill?.length > 0) {\r
            <button type="button" (click)="newVendor.skill = []"\r
              class="text-[9px] font-black text-error hover:underline cursor-pointer">\r
              Clear all\r
            </button>\r
            }\r
          </div>\r
\r
          <div class="max-h-44 overflow-y-auto divide-y divide-outline-variant/10">\r
            @for (s of skillOptions; track s.value) {\r
            <label\r
              class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container cursor-pointer transition-colors"\r
              [class.bg-primary/5]="isSkillSelected(s.label)">\r
              <input type="checkbox" [checked]="isSkillSelected(s.label)" (change)="toggleSkill(s.label)"\r
                class="w-4 h-4 rounded accent-primary cursor-pointer flex-shrink-0">\r
              <span class="text-xs font-semibold text-on-surface">{{ s.label }}</span>\r
              @if (isSkillSelected(s.label)) {\r
              <span class="ml-auto material-symbols-outlined text-primary text-base">check</span>\r
              }\r
            </label>\r
            }\r
            @empty {\r
            <p class="text-center py-6 text-outline text-xs font-bold italic">No skills available.</p>\r
            }\r
          </div>\r
        </div>\r
\r
        <p class="text-[9px] text-outline/70 mt-1">Multiple skills select kar sakte ho</p>\r
      </div>\r
\r
      @if (newVendor.skill?.length > 0) {\r
      <div class="flex flex-wrap gap-1.5">\r
        @for (svc of newVendor.skill; track svc) {\r
        <span\r
          class="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold flex items-center gap-1.5">\r
          {{ svc }}\r
          <button type="button" (click)="toggleSkill(svc)"\r
            class="cursor-pointer hover:text-error leading-none font-black">\u2715</button>\r
        </span>\r
        }\r
      </div>\r
      }\r
    </div>\r
    }\r
\r
    @if (currentStep === 4) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
\r
      @if (isEditMode && selectedVendor && selectedVendor.contract_files.length > 0) {\r
      <div class="space-y-2">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-outline">\r
          Existing Documents ({{ selectedVendor.contract_files.length }})\r
        </p>\r
        @for (file of selectedVendor.contract_files; track file) {\r
        <a [href]="file" target="_blank" rel="noopener noreferrer"\r
          class="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 hover:bg-slate-50 transition-all">\r
          <span class="material-symbols-outlined text-primary text-[16px]">description</span>\r
          <span class="truncate text-[10px] font-medium text-slate-700 dark:text-slate-200">{{ getFileName(file)\r
            }}</span>\r
          <span class="material-symbols-outlined text-slate-400 text-[15px] ml-auto">open_in_new</span>\r
        </a>\r
        }\r
      </div>\r
      }\r
\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">\r
          {{ isEditMode ? 'Add More Documents' : 'Contract Documents' }}\r
          <span class="normal-case font-normal text-outline/60 tracking-normal ml-1">(Optional)</span>\r
        </label>\r
        <label\r
          class="border-2 border-dashed border-outline-variant/20 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/30 transition-all cursor-pointer"\r
          [class.border-primary]="contractFiles.length > 0">\r
          <span class="material-symbols-outlined text-primary text-3xl">upload_file</span>\r
          <p class="text-[10px] font-bold text-on-surface">Click to upload or drag &amp; drop</p>\r
          <p class="text-[9px] text-outline/70 text-center">\r
            PDF \xB7 Word (.doc/.docx) \xB7 JPG \xB7 PNG<br>\r
            Max <strong>10 MB</strong> per file \xB7 Up to <strong>10 files</strong>\r
          </p>\r
          <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple class="hidden"\r
            (change)="onContractFilesSelected($event)">\r
        </label>\r
      </div>\r
\r
      @if (contractFiles.length > 0) {\r
      <div class="space-y-2">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-outline">\r
          {{ contractFiles.length }} naya file{{ contractFiles.length > 1 ? 's' : '' }} selected\r
        </p>\r
        @for (f of contractFiles; track $index) {\r
        <div\r
          class="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 group">\r
          <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" [ngClass]="getFileIconBg(f.name)">\r
            <span class="material-symbols-outlined text-base" [ngClass]="getFileIconColor(f.name)">{{\r
              getFileIcon(f.name) }}</span>\r
          </div>\r
          <div class="flex-1 min-w-0">\r
            <p class="text-xs font-bold text-on-surface truncate">{{ f.name }}</p>\r
            <p class="text-[9px] text-outline font-medium">{{ getFileSize(f.size) }}</p>\r
          </div>\r
          <button (click)="removeContractFile($index)"\r
            class="p-1 text-outline hover:text-error transition-colors rounded-lg hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100">\r
            <span class="material-symbols-outlined text-base">close</span>\r
          </button>\r
        </div>\r
        }\r
      </div>\r
      }\r
\r
      @if (fileError) {\r
      <div class="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">\r
        <span class="material-symbols-outlined text-error text-base">error</span>\r
        <p class="text-xs font-bold text-error">{{ fileError }}</p>\r
      </div>\r
      }\r
    </div>\r
    }\r
\r
    @if (stepError) {\r
    <div class="mt-4 flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 px-4 py-3 rounded-xl">\r
      <span class="material-symbols-outlined text-error text-lg">error</span>\r
      <p class="text-sm font-bold text-error">{{ stepError }}</p>\r
    </div>\r
    }\r
  </div>\r
\r
\r
  <div dialog-footer class="flex gap-3 shrink-0">\r
    @if (currentStep > 1) {\r
    <button (click)="prevStep()" [disabled]="isSaving"\r
      class="flex-1 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-black uppercase tracking-wide cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1">\r
      <span class="material-symbols-outlined text-sm">arrow_back</span> Back\r
    </button>\r
    } @else {\r
    <button (click)="showAddModal = false"\r
      class="flex-1 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-black uppercase tracking-wide cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">\r
      Cancel\r
    </button>\r
    }\r
\r
    @if (currentStep < 4) { <button (click)="nextStep()"\r
      class="flex-2 min-w-[140px] py-2.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-1">\r
      Next <span class="material-symbols-outlined text-sm">arrow_forward</span>\r
      </button>\r
      } @else {\r
      <button (click)="addVendor()" [disabled]="isSaving"\r
        class="flex-2 min-w-[140px] py-2.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">\r
        @if (isSaving) {\r
        <span class="material-symbols-outlined animate-spin text-xs">progress_activity</span> Saving...\r
        } @else if (isEditMode) {\r
        <span class="material-symbols-outlined text-sm">save</span> Update\r
        } @else {\r
        <span class="material-symbols-outlined text-sm">check_circle</span> Onboard\r
        }\r
      </button>\r
      }\r
  </div>\r
\r
</app-common-dialog>\r
\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 INVOICE MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showInvoiceModal" maxWidth="max-w-3xl" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl max-h-[88vh] flex flex-col my-auto animate-in zoom-in-95 duration-300"\r
  (closed)="showInvoiceModal = false">\r
\r
  <div class="flex justify-between items-center px-6 pt-5 pb-4 border-b border-outline-variant/10 shrink-0">\r
    <h3 class="text-xl font-black tracking-tight">\r
      New Invoice Submission\r
    </h3>\r
\r
    <button (click)="showInvoiceModal = false"\r
      class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer">\r
      <span class="material-symbols-outlined text-[20px]">close</span>\r
    </button>\r
  </div>\r
\r
  <div class="flex-1 overflow-y-auto px-6 py-4 min-h-0">\r
\r
    <div class="grid grid-cols-2 gap-4 mb-6">\r
      <!-- Project Select -->\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>\r
        <select [(ngModel)]="invoiceForm.project_id" (change)="getProject($event)"\r
          class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none bg-white">\r
          <option value="" disabled>Select Project</option>\r
          @for (p of projects; track p.id) {\r
          <option [value]="p.id">{{ p.name }}</option>\r
          }\r
        </select>\r
      </div>\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
          Invoice #\r
        </label>\r
\r
        <input [(ngModel)]="invoiceForm.number" type="text" readonly\r
          class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20">\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
          Date\r
        </label>\r
\r
        <input type="date" [value]="invoiceForm.rawDate" (change)="onInvoiceDateChange($any($event.target).value)"\r
          class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">\r
        <p class="text-[9px] text-outline/60 mt-1">Selected: {{ invoiceForm.date }}</p>\r
      </div>\r
\r
    </div>\r
\r
    <div class="mb-5">\r
\r
      <div class="flex items-center justify-between mb-3">\r
\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline">\r
          Items\r
        </label>\r
\r
        <button (click)="addInvoiceItem()"\r
          class="text-primary text-[10px] font-black uppercase tracking-widest cursor-pointer hover:underline flex items-center gap-1">\r
\r
          <span class="material-symbols-outlined text-sm">add</span>\r
          Add Item\r
        </button>\r
\r
      </div>\r
      <div class="grid items-center gap-x-2 mb-1 px-1" [style.grid-template-columns]="\r
            hasLaborItems()\r
            ? '130px 1fr 60px 70px 100px 80px 90px 32px'\r
            : '130px 1fr 60px 100px 80px 90px 32px'\r
          ">\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline">\r
          Type\r
        </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline">\r
          Description\r
        </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Qty\r
        </span>\r
\r
        @if (hasLaborItems()) {\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Hours\r
        </span>\r
        }\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Rate (\u20B9)\r
        </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Tax %\r
        </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-right">\r
          Total (\u20B9)\r
        </span>\r
\r
        <span></span>\r
      </div>\r
\r
      <div class="border-t border-outline-variant/10 mb-2"></div>\r
\r
\r
      <div class="space-y-2">\r
\r
        @for (item of invoiceForm.items; track $index) {\r
\r
        <div class="grid items-center gap-x-2" [style.grid-template-columns]="\r
              hasLaborItems()\r
              ? '130px 1fr 60px 70px 100px 80px 90px 32px'\r
              : '130px 1fr 60px 100px 80px 90px 32px'\r
            ">\r
\r
          <div class="relative">\r
\r
            <select [(ngModel)]="item.type" (ngModelChange)="onTypeChange(item)"\r
              class="w-full appearance-none px-2 py-2 pr-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest text-[11px] font-medium outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">\r
\r
              <option value="" disabled>Select</option>\r
              <option value="material">Material</option>\r
              <option value="equipment">Equipment</option>\r
              <option value="labor">Labor</option>\r
              <option value="others">Others</option>\r
\r
            </select>\r
\r
            <span\r
              class="material-symbols-outlined absolute right-1.5 top-1/2 -translate-y-1/2 text-outline text-xs pointer-events-none">\r
              expand_more\r
            </span>\r
\r
          </div>\r
\r
          <input [(ngModel)]="item.description" type="text" placeholder="Description"\r
            class="w-full px-2 py-2 rounded-xl border border-outline-variant/20 text-[11px] font-medium outline-none focus:ring-2 focus:ring-primary/20">\r
\r
          <input [(ngModel)]="item.quantity" type="number" min="1" placeholder="1"\r
            (ngModelChange)="calculateInvoiceTotals()"\r
            class="w-full px-2 py-2 rounded-xl border border-outline-variant/20 text-[11px] font-medium text-center outline-none focus:ring-2 focus:ring-primary/20">\r
\r
          @if (hasLaborItems()) {\r
\r
          @if (item.type === 'labor') {\r
\r
          <input [(ngModel)]="item.hours" type="number" min="1" placeholder="Hrs"\r
            (ngModelChange)="calculateInvoiceTotals()"\r
            class="w-full px-2 py-2 rounded-xl border border-primary/30 bg-primary/5 text-[11px] font-medium text-center outline-none">\r
\r
          } @else {\r
\r
          <div></div>\r
\r
          }\r
\r
          }\r
\r
\r
          <div class="relative">\r
\r
            <span class="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-black text-outline/60">\r
              \u20B9\r
            </span>\r
\r
            <input [(ngModel)]="item.unitPrice" type="number" min="0" placeholder="0"\r
              (ngModelChange)="calculateInvoiceTotals()"\r
              class="w-full pl-5 pr-2 py-2 rounded-xl border border-outline-variant/20 text-[11px] font-medium outline-none focus:ring-2 focus:ring-primary/20">\r
\r
          </div>\r
\r
\r
          <div class="relative">\r
\r
            <select [(ngModel)]="item.gst" (ngModelChange)="calculateInvoiceTotals()"\r
              class="w-full appearance-none px-2 py-2 pr-5 rounded-xl border border-outline-variant/20 bg-surface-container-lowest text-[11px] font-bold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer text-center">\r
\r
              <option [ngValue]="0">0%</option>\r
              <option [ngValue]="5">5%</option>\r
              <option [ngValue]="12">12%</option>\r
              <option [ngValue]="18">18%</option>\r
              <option [ngValue]="28">28%</option>\r
\r
            </select>\r
\r
            <span\r
              class="material-symbols-outlined absolute right-1 top-1/2 -translate-y-1/2 text-outline text-xs pointer-events-none">\r
              expand_more\r
            </span>\r
\r
          </div>\r
\r
\r
          <div class="text-right">\r
\r
            <p class="text-[11px] font-black text-on-surface">\r
              \u20B9{{ (item.total || 0) | number:'1.0-2' }}\r
            </p>\r
\r
            @if (item.gstAmount > 0) {\r
            <p class="text-[8px] text-outline leading-tight">\r
              incl. \u20B9{{ item.gstAmount | number:'1.0-2' }} TAX\r
            </p>\r
            }\r
\r
          </div>\r
\r
          @if (invoiceForm.items.length > 1) {\r
\r
          <button (click)="removeInvoiceItem($index)"\r
            class="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-error transition-colors rounded-lg hover:bg-red-50 cursor-pointer flex-shrink-0">\r
\r
            <span class="material-symbols-outlined text-sm">\r
              delete\r
            </span>\r
\r
          </button>\r
\r
          } @else {\r
\r
          <div class="w-8 h-8"></div>\r
\r
          }\r
\r
        </div>\r
\r
        }\r
\r
      </div>\r
\r
    </div>\r
\r
\r
    <div class="bg-surface-container-low rounded-2xl p-4 space-y-2.5">\r
\r
      <div class="flex justify-between text-xs">\r
        <span class="font-bold text-outline">\r
          Subtotal (excl. TAX)\r
        </span>\r
\r
        <span class="font-black">\r
          \u20B9{{ (invoiceForm.subtotal || 0) | number:'1.0-2' }}\r
        </span>\r
      </div>\r
\r
\r
      @if (invoiceForm.gstBreakdown?.length > 0) {\r
\r
      <div class="space-y-1">\r
\r
        @for (gb of invoiceForm.gstBreakdown; track gb.rate) {\r
\r
        <div class="flex justify-between text-[10px]">\r
\r
          <span class="text-outline">\r
            TAX @ {{ gb.rate }}%\r
          </span>\r
\r
          <span class="font-bold text-amber-600">\r
            \u20B9{{ gb.amount | number:'1.0-2' }}\r
          </span>\r
\r
        </div>\r
\r
        }\r
\r
      </div>\r
\r
      }\r
\r
      <div class="flex justify-between text-xs">\r
\r
        <span class="font-bold text-outline">\r
          Total TAX\r
        </span>\r
\r
        <span class="font-black text-amber-600">\r
          \u20B9{{ (invoiceForm.taxAmount || 0) | number:'1.0-2' }}\r
        </span>\r
\r
      </div>\r
\r
      <div class="flex justify-between text-sm border-t border-outline-variant/10 pt-2.5">\r
\r
        <span class="font-black text-on-surface">\r
          Grand Total\r
        </span>\r
\r
        <span class="font-black text-primary text-base">\r
          \u20B9{{ (invoiceForm.grandTotal || 0) | number:'1.0-2' }}\r
        </span>\r
\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
  <div class="flex gap-3 px-6 py-4 border-t border-outline-variant/10 shrink-0">\r
\r
    <button (click)="showInvoiceModal = false"\r
      class="flex-1 py-3 rounded-2xl border border-outline-variant/20 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">\r
\r
      Cancel\r
\r
    </button>\r
\r
    <button (click)="submitInvoice()" [disabled]="isSavingInvoice"\r
      class="flex-1 py-3 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">\r
\r
      @if (isSavingInvoice) {\r
\r
      <span class="material-symbols-outlined animate-spin text-sm">\r
        progress_activity\r
      </span>\r
\r
      Saving...\r
\r
      } @else {\r
\r
      <span class="material-symbols-outlined text-sm">\r
        send\r
      </span>\r
\r
      Submit Invoice\r
\r
      }\r
\r
    </button>\r
\r
  </div>\r
\r
</app-common-dialog>\r
\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 VENDOR DETAILS MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showVendorDetailModal && !!selectedVendor" maxWidth="max-w-2xl"\r
  backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl flex flex-col max-h-[92vh] overflow-hidden"\r
  (closed)="showVendorDetailModal = false">\r
  @if (selectedVendor) {\r
\r
  <div class="flex justify-between items-center px-5 pt-4 pb-2 border-b border-outline-variant/10">\r
    <h3 class="text-2xl font-black tracking-tight">Vendor Details</h3>\r
\r
    <div class="flex items-center gap-2">\r
      <span (click)="editVendorDetail(selectedVendor)"\r
        class="w-[34px] h-[34px] flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">\r
        <span class="material-symbols-outlined text-[18px]">edit</span>\r
      </span>\r
\r
      <button (click)="showVendorDetailModal = false"\r
        class="w-[34px] h-[34px] flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">\r
        <span class="material-symbols-outlined text-[18px]">close</span>\r
      </button>\r
    </div>\r
  </div>\r
\r
\r
  <div class="px-5 py-3 space-y-3 overflow-y-auto">\r
    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl space-y-3">\r
\r
      <div class="flex items-center justify-between">\r
        <h3 class="text-[14px] font-black">Contact Details</h3>\r
\r
        <div class="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded-full">\r
          <span class="material-symbols-outlined text-[13px]">verified</span>\r
          <span class="text-[10px] font-bold uppercase">Verified</span>\r
        </div>\r
      </div>\r
\r
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">\r
\r
        <div class="bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2 space-y-1">\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">SPOC</p>\r
          <p class="text-[12px] font-bold">{{ selectedVendor.spoc.name }}</p>\r
          <p class="text-[14px] text-slate-500">{{ selectedVendor.spoc.email }}</p>\r
          <p class="text-[12px] text-slate-500">{{ selectedVendor.spoc.phone }}</p>\r
        </div>\r
\r
        <div class="bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2 space-y-1">\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">GST</p>\r
          <p class="text-[12px] font-bold uppercase break-all">\r
            {{ selectedVendor.kyc.gst || '\u2014' }}\r
          </p>\r
\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">PAN</p>\r
          <p class="text-[12px] font-bold uppercase break-all">\r
            {{ selectedVendor.kyc.pan || '\u2014' }}\r
          </p>\r
        </div>\r
\r
        <div class="bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2 space-y-1 col-span-1 md:col-span-2">\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">Skills</p>\r
          <div class="flex flex-wrap gap-1">\r
            @for (svc of selectedVendor.skill; track svc) {\r
            <span class="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">\r
              {{ svc }}\r
            </span>\r
            }\r
          </div>\r
        </div>\r
\r
      </div>\r
\r
      @if (selectedVendor.contract_files.length > 0) {\r
      <div class="space-y-2">\r
        <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">\r
          Documents ({{ selectedVendor.contract_files.length }})\r
        </p>\r
\r
        <div class="flex flex-col gap-2 max-h-[120px] overflow-y-auto">\r
          @for (file of selectedVendor.contract_files; track file) {\r
          <a [href]="file" target="_blank"\r
            class="flex items-center justify-between bg-slate-50 dark:bg-slate-900/40 px-3 py-2 rounded-xl">\r
\r
            <span class="text-[12px] font-medium truncate">\r
              {{ getFileName(file) }}\r
            </span>\r
\r
            <span class="material-symbols-outlined text-[15px] text-slate-400">download</span>\r
          </a>\r
          }\r
        </div>\r
      </div>\r
      }\r
\r
    </div>\r
  </div>\r
\r
  <div class="px-5 pb-4 pt-2 flex justify-center">\r
    <button (click)="showVendorDetailModal = false"\r
      class="w-[110px] h-[34px] rounded-lg bg-slate-200 dark:bg-slate-700 text-[11px] font-bold uppercase">\r
      Close\r
    </button>\r
  </div>\r
\r
  }\r
</app-common-dialog>\r
\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 AUDIT MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showAuditModal" maxWidth="max-w-2xl" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl p-5 max-h-[92vh] overflow-hidden"\r
  (closed)="showAuditModal = false">\r
  <div class="flex justify-between items-start mb-5">\r
    <h3 class="text-2xl font-black leading-none">Compliance Audit</h3>\r
    <button (click)="showAuditModal = false"\r
      class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">\r
      <span class="material-symbols-outlined text-[18px]">close</span>\r
    </button>\r
  </div>\r
  <div class="space-y-5">\r
    <div>\r
      <div class="flex items-center justify-between mb-2">\r
        <label class="text-xs font-black uppercase tracking-wide">Quality</label>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary">{{ auditForm.quality\r
          }}/10</span>\r
      </div>\r
      <input [(ngModel)]="auditForm.quality" type="range" min="1" max="10"\r
        class="w-full h-2 accent-primary cursor-pointer">\r
    </div>\r
    <div>\r
      <div class="flex items-center justify-between mb-2">\r
        <label class="text-xs font-black uppercase tracking-wide">Timeliness</label>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">{{\r
          auditForm.timeliness }}/10</span>\r
      </div>\r
      <input [(ngModel)]="auditForm.timeliness" type="range" min="1" max="10"\r
        class="w-full h-2 accent-secondary cursor-pointer">\r
    </div>\r
    <div>\r
      <div class="flex items-center justify-between mb-2">\r
        <label class="text-xs font-black uppercase tracking-wide">Safety</label>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-green-100 text-green-700">{{ auditForm.safety\r
          }}/10</span>\r
      </div>\r
      <input [(ngModel)]="auditForm.safety" type="range" min="1" max="10" class="w-full h-2 cursor-pointer"\r
        style="accent-color:#16a34a">\r
    </div>\r
    <div class="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between">\r
      <span class="text-[11px] font-black uppercase tracking-wider text-outline">Overall Score</span>\r
      <span class="text-2xl font-black" [class.text-green-600]="auditScore >= 80"\r
        [class.text-amber-500]="auditScore < 80 && auditScore >= 50" [class.text-red-500]="auditScore < 50">{{\r
        auditScore }}%</span>\r
    </div>\r
    <div>\r
      <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-2 block">Observations</label>\r
      <textarea [(ngModel)]="auditForm.observations" rows="3" placeholder="Add observations or audit notes..."\r
        class="w-full px-3 py-3 rounded-2xl border border-outline-variant/20 text-xs font-medium outline-none resize-none focus:ring-2 focus:ring-primary/20"></textarea>\r
    </div>\r
  </div>\r
  <div class="flex gap-3 mt-6">\r
    <button (click)="showAuditModal = false"\r
      class="flex-1 py-3 rounded-xl border border-outline-variant/20 text-xs font-black uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">Cancel</button>\r
    <button (click)="submitAudit()" [disabled]="isSavingAudit"\r
      class="flex-1 py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed">\r
      @if (isSavingAudit) {\r
      <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Saving...\r
      } @else {\r
      <span class="material-symbols-outlined text-sm">task_alt</span> Submit Audit\r
      }\r
    </button>\r
  </div>\r
</app-common-dialog>\r
\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 BILLING MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showBillingModal" maxWidth="max-w-2xl" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl p-5 animate-in zoom-in-95 duration-300"\r
  (closed)="showBillingModal = false">\r
  <div class="flex justify-between items-center mb-6">\r
    <h3 class="text-2xl font-black tracking-tight">Billing Summary</h3>\r
    <button (click)="showBillingModal = false"\r
      class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer">\r
      <span class="material-symbols-outlined text-[22px]">close</span>\r
    </button>\r
  </div>\r
  <div class="grid grid-cols-2 gap-4 mb-5">\r
    <div class="bg-surface-container-low p-5 rounded-2xl text-center">\r
      <p class="text-[10px] font-black uppercase tracking-widest text-outline mb-2">Total Invoices</p>\r
      <p class="text-3xl font-black text-on-surface">{{ invoices.length }}</p>\r
    </div>\r
    <div class="bg-primary/5 border border-primary/10 p-5 rounded-2xl text-center">\r
      <p class="text-[10px] font-black uppercase tracking-widest text-outline mb-2">Budget Allocated</p>\r
      <p class="text-xl font-black text-primary">{{ selectedVendor?.budget ?? '\u2014' }}</p>\r
    </div>\r
  </div>\r
  @if (invoices.length > 0) {\r
  <div class="mb-4 flex items-center justify-between px-1">\r
    <span class="text-xs font-bold text-outline uppercase tracking-wider">Total Billed</span>\r
    <span class="font-black text-primary text-lg">\u20B9{{ totalBilled | number }}</span>\r
  </div>\r
  }\r
  <div class="space-y-3 pr-1 max-h-[85vh] overflow-y-auto">\r
    @for (inv of invoices; track inv.id) {\r
    <div\r
      class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors">\r
      <div class="flex items-center gap-3">\r
        <div class="w-10 h-10 rounded-xl flex items-center justify-center"\r
          [ngClass]="inv.status === 'Paid' ? 'bg-green-100' : inv.status === 'Cancelled' ? 'bg-red-100' : 'bg-amber-100'">\r
          <span class="material-symbols-outlined text-sm"\r
            [ngClass]="inv.status === 'Paid' ? 'text-green-600' : inv.status === 'Cancelled' ? 'text-red-600' : 'text-amber-600'">\r
            {{ inv.status === 'Paid' ? 'check_circle' : inv.status === 'Cancelled' ? 'cancel' : 'pending' }}\r
          </span>\r
        </div>\r
        <div>\r
          <p class="font-black text-sm text-on-surface">{{ inv.invoice_number }}</p>\r
          <p class="text-[10px] text-outline font-bold uppercase tracking-widest mt-0.5">{{ formatDate(inv.invoice_date)\r
            }}</p>\r
        </div>\r
      </div>\r
      <div class="text-right flex flex-col items-end gap-1">\r
        <p class="font-black text-base text-on-surface">\u20B9{{ (+inv.grand_total).toLocaleString('en-IN') }}</p>\r
        <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase"\r
          [ngClass]="inv.status === 'Paid' ? 'bg-green-100 text-green-700' : inv.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'">\r
          {{ inv.status }}\r
        </span>\r
        <button (click)="viewInvoice(inv)"\r
          class="text-[10px] font-black text-primary flex items-center gap-1 hover:underline cursor-pointer">\r
          <span class="material-symbols-outlined text-[12px]">open_in_new</span> View Invoice\r
        </button>\r
      </div>\r
    </div>\r
    } @empty {\r
    <div class="py-12 flex flex-col items-center gap-3 text-outline">\r
      <span class="material-symbols-outlined text-5xl">receipt_long</span>\r
      <p class="font-bold text-sm">No billing records found.</p>\r
    </div>\r
    }\r
  </div>\r
  <div class="flex gap-3 mt-6">\r
    <button (click)="openSubmission(); showBillingModal = false"\r
      class="flex-1 py-3 rounded-2xl border border-primary text-primary text-xs font-black uppercase tracking-wide cursor-pointer hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">\r
      <span class="material-symbols-outlined text-sm">add</span> New Invoice\r
    </button>\r
    <button (click)="showBillingModal = false"\r
      class="w-[120px] py-3 rounded-2xl bg-on-surface text-white text-xs font-black uppercase tracking-wide cursor-pointer shadow-md hover:scale-[1.02] transition-transform">Close</button>\r
  </div>\r
</app-common-dialog>
`, styles: ['@charset "UTF-8";\n\n/* src/app/modules/vendors/vendors.scss */\n:host {\n  display: block;\n  font-family:\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  --blue: #1a6bff;\n  --blue-light: #e8f0ff;\n  --gold: #c47d00;\n  --gold-bg: #fff8e6;\n  --text-primary: #111827;\n  --text-secondary: #6b7280;\n  --text-muted: #9ca3af;\n  --border: #e5e7eb;\n  --surface: #f9fafb;\n  --white: #ffffff;\n  --radius: 12px;\n  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10);\n  --shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.15);\n}\n.vp-wrapper {\n  background: var(--surface);\n  min-height: auto;\n  padding: 40px 48px;\n  width: 100%;\n  margin: 0;\n}\n.vp-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 32px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.vp-header__right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.vp-title {\n  font-family:\n    "Space Grotesk",\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  font-size: 26px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n  letter-spacing: -0.3px;\n}\n.vp-subtitle {\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.vp-subtitle strong {\n  color: var(--text-primary);\n  font-weight: 700;\n}\n.btn-filter {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 18px;\n  border: 1.5px solid var(--border);\n  border-radius: 24px;\n  background: var(--white);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-filter:hover,\n.btn-filter.active {\n  border-color: var(--blue);\n  color: var(--blue);\n  background: var(--blue-light);\n}\n.btn-add {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: var(--blue);\n  color: white;\n  border: none;\n  border-radius: 24px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.3);\n}\n.btn-add:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.4);\n  transform: translateY(-1px);\n}\n.btn-add:active {\n  transform: translateY(0);\n}\n.vp-stats {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.stat-card {\n  background: var(--white);\n  border-radius: var(--radius);\n  padding: 24px 28px 20px;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n}\n.stat-card:hover {\n  box-shadow: var(--shadow-md);\n  transform: translateY(-2px);\n}\n.stat-label {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n}\n.stat-value {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 34px;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.stat-value--gold {\n  color: var(--gold);\n}\n.stat-bar {\n  height: 3px;\n  width: 40px;\n  border-radius: 4px;\n  margin-top: 4px;\n}\n.stat-bar--blue {\n  background: var(--blue);\n}\n.stat-bar--gold {\n  background: var(--gold);\n}\n.vp-loading {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 48px 0;\n  justify-content: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  font-weight: 500;\n}\n.loading-spinner {\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--border);\n  border-top-color: var(--blue);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.vp-empty {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1.5px dashed var(--border);\n  padding: 48px 40px;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  margin-bottom: 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.vp-empty svg {\n  opacity: 0.35;\n}\n.vp-empty p {\n  margin: 0;\n}\n.vp-empty strong {\n  color: var(--blue);\n  font-weight: 600;\n}\n.vp-vendor-list {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  margin-bottom: 24px;\n  overflow: hidden;\n}\n.vendor-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--border);\n  transition: background 0.15s;\n}\n.vendor-card:last-child {\n  border-bottom: none;\n}\n.vendor-card:hover {\n  background: var(--surface);\n}\n.vendor-card__info {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.vendor-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--blue-light);\n  color: var(--blue);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n  letter-spacing: 0.5px;\n}\n.vendor-name {\n  font-weight: 600;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.vendor-services {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 320px;\n}\n.vendor-card__meta {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-shrink: 0;\n}\n.vendor-badge {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.3px;\n}\n.vendor-badge--active {\n  background: #ecfdf5;\n  color: #059669;\n}\n.vendor-badge--pending {\n  background: #fff8e6;\n  color: var(--gold);\n}\n.vendor-badge--inactive {\n  background: var(--surface);\n  color: var(--text-muted);\n}\n.vendor-compliance {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.vp-activity {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  padding: 28px 32px;\n}\n.vp-activity__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.activity-title {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.btn-link {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: var(--blue);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  transition: opacity 0.15s;\n}\n.btn-link:hover {\n  opacity: 0.75;\n}\n.activity-list {\n  display: flex;\n  flex-direction: column;\n}\n.activity-item {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 18px 0;\n  border-bottom: 1px solid var(--border);\n}\n.activity-item:last-child {\n  border-bottom: none;\n}\n.activity-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  color: var(--text-secondary);\n}\n.activity-icon--invoice {\n  background: #fff8e6;\n  border-color: #f5e0b0;\n  color: var(--gold);\n}\n.activity-icon--cert {\n  background: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #059669;\n}\n.activity-icon--assign {\n  background: var(--blue-light);\n  border-color: #c7d9ff;\n  color: var(--blue);\n}\n.activity-content {\n  flex: 1;\n  min-width: 0;\n}\n.activity-item__title {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 3px;\n}\n.activity-item__desc {\n  font-size: 13px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.activity-time {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--text-muted);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.activity-empty {\n  padding: 32px 0;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n}\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(10, 14, 30, 0.55);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 24px;\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal {\n  background: var(--white);\n  border-radius: 18px;\n  width: 100%;\n  max-width: 740px;\n  max-height: 92vh;\n  overflow-y: auto;\n  box-shadow: var(--shadow-lg);\n  animation: slideUp 0.25s ease;\n  scrollbar-width: thin;\n  scrollbar-color: var(--border) transparent;\n}\n.modal::-webkit-scrollbar {\n  width: 5px;\n}\n.modal::-webkit-scrollbar-track {\n  background: transparent;\n}\n.modal::-webkit-scrollbar-thumb {\n  background: var(--border);\n  border-radius: 4px;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 28px 28px 20px;\n  position: sticky;\n  top: 0;\n  background: var(--white);\n  z-index: 1;\n  border-bottom: 1px solid var(--border);\n}\n.modal__title {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.modal__subtitle {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.modal__close {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  color: var(--text-muted);\n  border-radius: 8px;\n  transition: all 0.15s;\n  line-height: 1;\n}\n.modal__close:hover {\n  background: var(--surface);\n  color: var(--text-primary);\n}\n.modal__close:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.modal__form {\n  padding: 24px 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group--full {\n  width: 100%;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-row--3-1 {\n  grid-template-columns: 3fr 1.2fr;\n}\n.form-col {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-label {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  margin-bottom: 2px;\n}\n.required-star {\n  color: #ef4444;\n  margin-left: 2px;\n}\n.form-optional {\n  color: var(--text-muted);\n  font-weight: 400;\n  font-size: 10px;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.form-input {\n  padding: 10px 14px;\n  border: 1.5px solid var(--border);\n  border-radius: 8px;\n  font-size: 14px;\n  color: var(--text-primary);\n  background: var(--white);\n  transition: border-color 0.18s, box-shadow 0.18s;\n  font-family: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n.form-input::placeholder {\n  color: var(--text-muted);\n}\n.form-input:focus {\n  outline: none;\n  border-color: var(--blue);\n  box-shadow: 0 0 0 3px rgba(26, 107, 255, 0.1);\n}\n.form-input--error {\n  border-color: #ef4444 !important;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08) !important;\n}\n.mt-8 {\n  margin-top: 8px;\n}\n.form-hint {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.form-error {\n  font-size: 11px;\n  color: #ef4444;\n  font-weight: 500;\n  margin-top: 2px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.form-error::before {\n  content: "\\26a0";\n  font-size: 10px;\n}\n.form-api-error {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: #fff1f1;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #dc2626;\n  font-size: 13px;\n  font-weight: 500;\n}\n.form-api-error svg {\n  flex-shrink: 0;\n}\n.upload-zone {\n  border: 2px dashed var(--border);\n  border-radius: 10px;\n  padding: 32px 20px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: var(--surface);\n}\n.upload-zone:hover {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone--dragging {\n  border-color: var(--blue);\n  background: var(--blue-light);\n  transform: scale(1.01);\n}\n.upload-zone--filled {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone__content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  color: var(--text-muted);\n}\n.upload-zone__text {\n  font-size: 11.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n}\n.upload-zone__text--filled {\n  color: var(--blue);\n  text-transform: none;\n  font-weight: 600;\n  font-size: 13px;\n  letter-spacing: 0;\n}\n.modal__actions {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 12px;\n  margin-top: 8px;\n}\n.btn-cancel {\n  padding: 13px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  background: white;\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel:hover {\n  border-color: var(--text-secondary);\n  color: var(--text-primary);\n  background: var(--surface);\n}\n.btn-cancel:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-approve {\n  padding: 13px;\n  border: none;\n  border-radius: 10px;\n  background: var(--blue);\n  color: white;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.35);\n}\n.btn-approve:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.45);\n  transform: translateY(-1px);\n}\n.btn-approve:active {\n  transform: translateY(0);\n}\n.btn-approve:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n  box-shadow: none !important;\n}\n.btn-spinner {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: center;\n}\n.spin {\n  animation: spin 0.9s linear infinite;\n}\n@media (max-width: 768px) {\n  .vp-wrapper {\n    padding: 24px 20px;\n  }\n  .vp-stats {\n    grid-template-columns: 1fr;\n  }\n  .vp-header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .vp-header__right {\n    justify-content: space-between;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .form-row--3-1 {\n    grid-template-columns: 1fr;\n  }\n  .modal__actions {\n    grid-template-columns: 1fr 1fr;\n  }\n  .vendor-services {\n    max-width: 180px;\n  }\n}\n/*# sourceMappingURL=vendors.css.map */\n'] }]
  }], null, { projectId: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Vendors, { className: "Vendors", filePath: "app/modules/vendors/vendors.ts", lineNumber: 26 });
})();

// src/app/modules/vendors/vendors-routing-module.ts
var routes = [
  { path: "", component: Vendors },
  {
    path: ":id",
    component: Vendors
  }
];
var VendorsRoutingModule = class _VendorsRoutingModule {
  static \u0275fac = function VendorsRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _VendorsRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/vendors/pipes/count-by-role-pipe.ts
var CountByRolePipe = class _CountByRolePipe {
  transform(workers, skillRaw) {
    return workers.filter((w) => w.skillRaw === skillRaw).length;
  }
  static \u0275fac = function CountByRolePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountByRolePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "countByRole", type: _CountByRolePipe, pure: true, standalone: false });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountByRolePipe, [{
    type: Pipe,
    args: [{
      name: "countByRole",
      standalone: false
    }]
  }], null, null);
})();

// src/app/modules/vendors/vendors-module.ts
var VendorsModule = class _VendorsModule {
  static \u0275fac = function VendorsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _VendorsModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, VendorsRoutingModule, FormsModule, ReactiveFormsModule, CommonDialogComponent] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsModule, [{
    type: NgModule,
    args: [{
      declarations: [Vendors, CountByRolePipe],
      imports: [CommonModule, VendorsRoutingModule, FormsModule, ReactiveFormsModule, CommonDialogComponent]
    }]
  }], null, null);
})();
export {
  VendorsModule
};
//# sourceMappingURL=chunk-S6QME5EK.js.map
