import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  FormsModule,
  ReactiveFormsModule
} from "./chunk-WFU7JF4C.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  HttpClient,
  HttpParams,
  Injectable,
  NgClass,
  NgModule,
  RouterModule,
  Subject,
  __spreadProps,
  __spreadValues,
  finalize,
  inject,
  map,
  setClassMetadata,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction3,
  ɵɵpureFunction5,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F27QM527.js";

// src/app/modules/analytics/services/labor-services.ts
var LaborServices = class _LaborServices {
  http = inject(HttpClient);
  BASE = `${environment.serverUrl}/api/v1/labor`;
  contractorsSubject = new BehaviorSubject([]);
  laborStatsSubject = new BehaviorSubject(null);
  shiftActivitySubject = new BehaviorSubject([]);
  heatmapSubject = new BehaviorSubject([]);
  vendorsSubject = new BehaviorSubject([]);
  loadingSubject = new BehaviorSubject(false);
  errorSubject = new BehaviorSubject(null);
  contractors$ = this.contractorsSubject.asObservable();
  laborStats$ = this.laborStatsSubject.asObservable();
  shiftActivity$ = this.shiftActivitySubject.asObservable();
  heatmap$ = this.heatmapSubject.asObservable();
  vendors$ = this.vendorsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  loadDashboard(companyId, vendorId) {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    let params = new HttpParams().set("company_id", companyId);
    if (vendorId)
      params = params.set("vendor_id", vendorId);
    this.http.get(`${this.BASE}/dashboard`, { params }).pipe(finalize(() => this.loadingSubject.next(false))).subscribe({
      next: (res) => {
        if (res.success) {
          this.contractorsSubject.next(res.data.contractors ?? []);
          this.laborStatsSubject.next(res.data.stats ?? null);
          this.heatmapSubject.next(res.data.heatmap ?? []);
          this.shiftActivitySubject.next(res.data.shiftActivity ?? []);
          this.vendorsSubject.next(res.data.vendors ?? []);
        } else {
          this.errorSubject.next(res.message || "Data load nahi hua");
        }
      },
      error: (err) => {
        this.errorSubject.next(err?.error?.message);
      }
    });
  }
  filterByVendor(companyId, vendorId) {
    let params = new HttpParams().set("company_id", companyId);
    if (vendorId)
      params = params.set("vendor_id", vendorId);
    this.http.get(`${this.BASE}/contractor-metrics`, { params }).subscribe({
      next: (r) => this.contractorsSubject.next(r.data ?? []),
      error: () => this.contractorsSubject.next([])
    });
    this.http.get(`${this.BASE}/shift-activity`, { params }).subscribe({
      next: (r) => this.shiftActivitySubject.next(r.data ?? []),
      error: () => this.shiftActivitySubject.next([])
    });
  }
  addWorker(worker) {
    return this.http.post(`${this.BASE}`, worker).pipe(map((r) => r.data), tap(() => this.loadDashboard(worker.company_id)));
  }
  updateWorker(id, companyId, updates) {
    return this.http.patch(`${this.BASE}/${id}`, __spreadProps(__spreadValues({}, updates), { company_id: companyId })).pipe(map(() => void 0), tap(() => this.loadDashboard(companyId)));
  }
  deleteWorker(id, companyId) {
    return this.http.delete(`${this.BASE}/${id}?company_id=${companyId}`).pipe(map(() => void 0), tap(() => this.loadDashboard(companyId)));
  }
  clearError() {
    this.errorSubject.next(null);
  }
  static \u0275fac = function LaborServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LaborServices)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LaborServices, factory: _LaborServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LaborServices, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/modules/analytics/labour/labour.ts
var _c0 = () => [1, 2, 3, 4, 5];
var _c1 = () => [1, 2, 3, 4];
var _c2 = (a0, a1, a2) => ({ "text-emerald-500": a0, "text-rose-500": a1, "text-slate-300": a2 });
var _c3 = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
var _c4 = (a0, a1, a2, a3, a4) => ({ "bg-indigo-700": a0, "bg-indigo-500": a1, "bg-indigo-300": a2, "bg-indigo-100": a3, "bg-slate-50 dark:bg-slate-800/50": a4 });
var _c5 = (a0, a1, a2) => ({ "bg-indigo-600 border-indigo-200 text-white shadow-lg": a0, "bg-amber-100 border-amber-200 text-amber-700": a1, "bg-slate-900 border-slate-700 text-white": a2 });
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.vendor_id;
var _forTrack2 = ($index, $item) => $item.name;
var _forTrack3 = ($index, $item) => $item.label;
function Labour_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 47);
    \u0275\u0275elementStart(2, "p", 48);
    \u0275\u0275text(3, " Loading Dashboard\u2026 ");
    \u0275\u0275elementEnd()();
  }
}
function Labour_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "span", 49);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 29)(6, "button", 51);
    \u0275\u0275listener("click", function Labour_Conditional_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refresh());
    });
    \u0275\u0275text(7, " Retry ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 52);
    \u0275\u0275listener("click", function Labour_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissError());
    });
    \u0275\u0275elementStart(9, "span", 53);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error, " ");
  }
}
function Labour_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Labour_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.stats == null ? null : ctx_r1.stats.totalPersonnel) ?? 0, " ");
  }
}
function Labour_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Labour_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.stats == null ? null : ctx_r1.stats.skillCompliance) ?? 0, "% ");
  }
}
function Labour_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Labour_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.stats == null ? null : ctx_r1.stats.activeCrews) ?? 0, " ");
  }
}
function Labour_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Labour_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.stats == null ? null : ctx_r1.stats.overtimeAlerts) ?? 0, " ");
  }
}
function Labour_Conditional_36_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function Labour_Conditional_36_For_4_Template_button_click_0_listener() {
      const v_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onVendorChange(v_r5.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r1.selectedVendorId === v_r5.id ? "px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all shrink-0" : "px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shrink-0");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r5.name, " ");
  }
}
function Labour_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 54);
    \u0275\u0275text(2, " Filter by Vendor: ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, Labour_Conditional_36_For_4_Template, 2, 2, "button", 55, _forTrack0);
    \u0275\u0275elementStart(5, "button", 56);
    \u0275\u0275listener("click", function Labour_Conditional_36_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refresh());
    });
    \u0275\u0275elementStart(6, "span", 53);
    \u0275\u0275text(7, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Refresh ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.vendorOptions);
  }
}
function Labour_Conditional_48_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 58);
  }
}
function Labour_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275repeaterCreate(1, Labour_Conditional_48_For_2_Template, 1, 0, "div", 58, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function Labour_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 59);
    \u0275\u0275text(2, " group_off ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 60);
    \u0275\u0275text(4, " No contractor data found. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 61);
    \u0275\u0275text(6, " Labor workers add karo is company/vendor ke liye. ");
    \u0275\u0275elementEnd()();
  }
}
function Labour_Conditional_50_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 68)(1, "td", 69)(2, "div", 70);
    \u0275\u0275element(3, "img", 71);
    \u0275\u0275elementStart(4, "div")(5, "p", 72);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 73);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(9, "td", 74)(10, "span", 75);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 74)(13, "p", 76);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 74)(16, "p", 76);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 74)(19, "div", 77)(20, "div", 78);
    \u0275\u0275element(21, "div", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 80);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "td", 81)(25, "span", 82);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", c_r6.logo || "https://ui-avatars.com/api/?name=" + c_r6.name + "&background=6366f1&color=fff", \u0275\u0275sanitizeUrl)("alt", c_r6.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", c_r6.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", c_r6.personnel, " Personnel \u2022 ", c_r6.tasks, " Tasks ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getEfficiencyColor(+c_r6.efficiency));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r6.efficiency, "% ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", c_r6.safetyScore, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", c_r6.retentionRate, "% ");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", c_r6.adherenceToSchedule, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", c_r6.adherenceToSchedule, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(15, _c2, c_r6.trend === "up", c_r6.trend === "down", c_r6.trend !== "up" && c_r6.trend !== "down"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r6.trend === "up" ? "trending_up" : c_r6.trend === "down" ? "trending_down" : "horizontal_rule", " ");
  }
}
function Labour_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "table", 62)(2, "thead")(3, "tr", 63)(4, "th", 64);
    \u0275\u0275text(5, " Subcontractor ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 65);
    \u0275\u0275text(7, " Efficiency ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 65);
    \u0275\u0275text(9, " Safety SPI ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 65);
    \u0275\u0275text(11, " Retention ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 65);
    \u0275\u0275text(13, " Schedule ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 66);
    \u0275\u0275text(15, " Trend ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 67);
    \u0275\u0275repeaterCreate(17, Labour_Conditional_50_For_18_Template, 27, 19, "tr", 68, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r1.contractors);
  }
}
function Labour_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 83);
  }
  if (rf & 2) {
    const i_r7 = ctx.$implicit;
    \u0275\u0275classMap("bg-indigo-" + (i_r7 * 100 + 400));
  }
}
function Labour_Conditional_64_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 84);
  }
}
function Labour_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275repeaterCreate(1, Labour_Conditional_64_For_2_Template, 1, 0, "div", 84, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c3));
  }
}
function Labour_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "p", 60);
    \u0275\u0275text(2, " Koi heatmap data nahi hai. ");
    \u0275\u0275elementEnd()();
  }
}
function Labour_Conditional_66_For_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 85);
  }
  if (rf & 2) {
    const val_r8 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(1, _c4, val_r8 >= 4, val_r8 === 3, val_r8 === 2, val_r8 === 1, val_r8 === 0));
  }
}
function Labour_Conditional_66_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Labour_Conditional_66_For_2_For_1_Template, 1, 7, "div", 85, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275repeater(row_r9);
  }
}
function Labour_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275repeaterCreate(1, Labour_Conditional_66_For_2_Template, 2, 0, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.heatmap);
  }
}
function Labour_Conditional_71_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 86)(2, "span", 87);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 88);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 89);
    \u0275\u0275element(7, "div", 90);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const skill_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", skill_r10.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", skill_r10.count, " Personnel ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.skillBarWidth(skill_r10.count), "%")("background-color", skill_r10.color);
  }
}
function Labour_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275repeaterCreate(1, Labour_Conditional_71_For_2_Template, 8, 6, "div", null, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.stats.skillsDistribution);
  }
}
function Labour_Conditional_77_For_2_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102)(1, "span", 103);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const act_r11 = ctx.$implicit;
    \u0275\u0275styleProp("left", act_r11.left)("width", act_r11.width);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(6, _c5, act_r11.type === "primary", act_r11.type === "secondary", act_r11.type !== "primary" && act_r11.type !== "secondary"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", act_r11.label, " ");
  }
}
function Labour_Conditional_77_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91)(1, "div", 92);
    \u0275\u0275element(2, "img", 93);
    \u0275\u0275elementStart(3, "div")(4, "p", 94);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 95);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 96);
    \u0275\u0275element(9, "div", 97);
    \u0275\u0275repeaterCreate(10, Labour_Conditional_77_For_2_For_11_Template, 3, 10, "div", 98, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 99)(13, "div", 100);
    \u0275\u0275element(14, "div", 101);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const worker_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", worker_r12.avatar || "https://ui-avatars.com/api/?name=" + worker_r12.name + "&background=6366f1&color=fff&size=128", \u0275\u0275sanitizeUrl)("alt", worker_r12.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", worker_r12.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", worker_r12.role, " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(worker_r12.activities);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(worker_r12.statusClass);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", worker_r12.status, " ");
  }
}
function Labour_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275repeaterCreate(1, Labour_Conditional_77_For_2_Template, 16, 7, "div", 91, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredShiftActivity);
  }
}
var Labour = class _Labour {
  svc = inject(LaborServices);
  destroy$ = new Subject();
  Math = Math;
  // ── Context ─────────────────────────────────────────────
  // AuthService se inject karo real app mein
  companyId = 1;
  // ── Data (API se aata hai) ───────────────────────────────
  contractors = [];
  stats = null;
  heatmap = [];
  shiftActivity = [];
  vendors = [];
  // ── UI State ─────────────────────────────────────────────
  loading = false;
  error = null;
  selectedVendorId = null;
  selectedMember = "All Members";
  // ── Computed ─────────────────────────────────────────────
  get vendorOptions() {
    return [
      { id: null, name: "All Vendors" },
      ...this.vendors.map((v) => ({ id: v.id, name: v.name }))
    ];
  }
  get teamMembers() {
    return ["All Members", ...this.shiftActivity.map((w) => w.name)];
  }
  get filteredShiftActivity() {
    if (this.selectedMember === "All Members")
      return this.shiftActivity;
    return this.shiftActivity.filter((w) => w.name === this.selectedMember);
  }
  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit() {
    this.svc.contractors$.pipe(takeUntil(this.destroy$)).subscribe((c) => this.contractors = c);
    this.svc.laborStats$.pipe(takeUntil(this.destroy$)).subscribe((s) => this.stats = s);
    this.svc.heatmap$.pipe(takeUntil(this.destroy$)).subscribe((h) => this.heatmap = h);
    this.svc.shiftActivity$.pipe(takeUntil(this.destroy$)).subscribe((sa) => this.shiftActivity = sa);
    this.svc.vendors$.pipe(takeUntil(this.destroy$)).subscribe((v) => this.vendors = v);
    this.svc.loading$.pipe(takeUntil(this.destroy$)).subscribe((l) => this.loading = l);
    this.svc.error$.pipe(takeUntil(this.destroy$)).subscribe((e) => this.error = e);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // ── Vendor filter ─────────────────────────────────────────
  onVendorChange(vendorId) {
    this.selectedVendorId = vendorId;
    this.svc.filterByVendor(this.companyId, vendorId ?? void 0);
  }
  // ── Refresh ───────────────────────────────────────────────
  refresh() {
    this.svc.loadDashboard(this.companyId, this.selectedVendorId ?? void 0);
  }
  // ── Dismiss error ─────────────────────────────────────────
  dismissError() {
    this.svc.clearError();
  }
  // ── Helpers ───────────────────────────────────────────────
  getEfficiencyColor(e) {
    if (e > 90)
      return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (e > 75)
      return "text-amber-600  bg-amber-50  border-amber-100";
    return "text-rose-600   bg-rose-50   border-rose-100";
  }
  skillBarWidth(count) {
    const max = this.stats?.totalPersonnel || 1;
    return Math.min(count / max * 300, 100);
  }
  static \u0275fac = function Labour_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Labour)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Labour, selectors: [["app-labour"]], standalone: false, decls: 83, vars: 12, consts: [[1, "max-w-full", "mx-auto", "p-4", "md:p-8", "animate-in", "fade-in", "duration-700"], [1, "fixed", "inset-0", "bg-white/70", "dark:bg-slate-900/70", "backdrop-blur-sm", "z-50", "flex", "flex-col", "items-center", "justify-center", "gap-4"], [1, "mb-6", "flex", "items-center", "gap-4", "bg-rose-50", "border", "border-rose-200", "text-rose-700", "px-6", "py-4", "rounded-2xl", "shadow-sm"], [1, "flex", "flex-col", "lg:flex-row", "justify-between", "items-start", "lg:items-center", "gap-8", "mb-12"], [1, "text-indigo-600", "font-black", "tracking-[0.3em]", "uppercase", "text-[10px]", "mb-2"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "max-w-xl", "text-lg", "font-medium", "leading-relaxed"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "w-full", "lg:w-auto"], [1, "glass-card", "p-6", "rounded-[2rem]", "border", "border-white/40", "dark:border-slate-800/50", "shadow-xl"], [1, "text-[10px]", "font-black", "uppercase", "text-slate-400", "tracking-widest", "mb-1"], [1, "text-3xl", "font-black", "text-slate-900", "dark:text-slate-50"], [1, "animate-pulse", "text-slate-300"], [1, "text-3xl", "font-black", "text-emerald-600"], [1, "glass-card", "p-6", "rounded-[2rem]", "border", "border-white/40", "dark:border-slate-800/50", "shadow-xl", "border-l-4", "border-l-amber-500"], [1, "text-[10px]", "font-black", "uppercase", "text-amber-600", "tracking-widest", "mb-1"], [1, "flex", "items-center", "gap-3", "mb-8", "overflow-x-auto", "pb-2", "flex-wrap"], [1, "grid", "grid-cols-1", "xl:grid-cols-12", "gap-8", "mb-12"], [1, "xl:col-span-8", "space-y-8"], [1, "glass-card", "rounded-[2.5rem]", "border", "border-white/40", "dark:border-slate-800/50", "shadow-2xl", "overflow-hidden"], [1, "p-8", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "justify-between", "items-center", "bg-white/30", "dark:bg-slate-900/30"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-slate-50", "tracking-tight"], [1, "text-sm", "text-slate-500", "font-medium", "italic", "mt-0.5"], ["type", "button", 1, "px-6", "py-3", "bg-slate-900", "dark:bg-slate-50", "text-white", "dark:text-slate-900", "font-black", "rounded-xl", "text-xs", "hover:scale-105", "transition-all"], [1, "p-8", "space-y-4"], [1, "p-16", "text-center"], [1, "overflow-x-auto"], [1, "glass-card", "rounded-[2.5rem]", "p-8", "border", "border-white/40", "dark:border-slate-800/50", "shadow-2xl", "overflow-hidden"], [1, "flex", "justify-between", "items-start", "mb-10"], [1, "text-sm", "text-slate-500", "font-medium"], [1, "flex", "items-center", "gap-3"], [1, "flex", "gap-1"], [1, "w-3", "h-3", "rounded-[2px]", 3, "class"], [1, "text-[10px]", "font-black", "uppercase", "text-slate-400", "tracking-widest"], [1, "grid", "grid-cols-7", "gap-4"], [1, "h-32", "flex", "items-center", "justify-center"], [1, "xl:col-span-4", "space-y-8"], [1, "glass-card", "rounded-[2.5rem]", "p-8", "border", "border-white/40", "dark:border-slate-800/50", "shadow-2xl"], [1, "text-xl", "font-black", "text-slate-900", "dark:text-slate-50", "tracking-tight", "mb-8"], [1, "space-y-6"], [1, "mt-20"], [1, "flex", "items-center", "gap-6", "mb-12"], [1, "text-3xl", "font-black", "text-slate-900", "dark:text-slate-50", "tracking-tight"], [1, "h-px", "flex-1", "bg-slate-100", "dark:bg-slate-800"], [1, "grid", "grid-cols-1", "gap-4"], ["type", "button", 1, "fixed", "bottom-10", "right-10", "w-16", "h-16", "bg-slate-900", "dark:bg-slate-50", "text-white", "dark:text-slate-900", "rounded-full", "shadow-2xl", "flex", "items-center", "justify-center", "hover:scale-110", "active:scale-95", "transition-all", "z-50", "group"], [1, "material-symbols-outlined", "text-3xl"], [1, "absolute", "right-full", "mr-6", "py-3", "px-5", "bg-slate-900", "text-white", "text-[10px]", "font-black", "uppercase", "tracking-widest", "rounded-2xl", "opacity-0", "group-hover:opacity-100", "transition-all", "pointer-events-none", "whitespace-nowrap", "shadow-xl"], [1, "w-12", "h-12", "rounded-full", "border-4", "border-indigo-500", "border-t-transparent", "animate-spin"], [1, "text-sm", "font-black", "text-slate-400", "uppercase", "tracking-widest"], [1, "material-symbols-outlined"], [1, "text-sm", "font-bold", "flex-1"], ["type", "button", 1, "px-4", "py-2", "bg-rose-600", "text-white", "rounded-xl", "text-xs", "font-black", "hover:bg-rose-700", "transition-all", 3, "click"], ["type", "button", 1, "text-rose-400", "hover:text-rose-600", "transition-all", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "shrink-0"], ["type", "button", 3, "ngClass"], ["type", "button", 1, "ml-auto", "flex", "items-center", "gap-2", "px-4", "py-2.5", "bg-slate-100", "dark:bg-slate-800", "text-slate-500", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "hover:bg-slate-200", "transition-all", "shrink-0", 3, "click"], ["type", "button", 3, "click", "ngClass"], [1, "h-14", "bg-slate-100", "dark:bg-slate-800", "rounded-2xl", "animate-pulse"], [1, "material-symbols-outlined", "text-5xl", "text-slate-200", "mb-4", "block"], [1, "text-slate-400", "font-bold", "text-sm"], [1, "text-slate-300", "text-xs", "mt-1"], [1, "w-full", "text-left", "border-collapse"], [1, "bg-slate-50/50", "dark:bg-slate-900/50", "text-slate-400"], [1, "px-8", "py-5", "text-[10px]", "uppercase", "font-black", "tracking-widest"], [1, "px-6", "py-5", "text-[10px]", "uppercase", "font-black", "tracking-widest", "text-center"], [1, "px-8", "py-5", "text-[10px]", "uppercase", "font-black", "tracking-widest", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800/50"], [1, "hover:bg-slate-50/50", "dark:hover:bg-slate-900/20", "transition-all", "group"], [1, "px-8", "py-5"], [1, "flex", "items-center", "gap-4"], [1, "w-10", "h-10", "rounded-xl", "bg-slate-100", "p-1", "object-contain", "shadow-sm", 3, "src", "alt"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-slate-50"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest"], [1, "px-6", "py-5", "text-center"], [1, "px-3", "py-1", "rounded-lg", "text-[10px]", "font-black", "border"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-300"], [1, "flex", "flex-col", "items-center", "gap-1"], [1, "w-16", "h-1.5", "bg-slate-100", "dark:bg-slate-800", "rounded-full", "overflow-hidden"], [1, "h-full", "bg-indigo-500"], [1, "text-[9px]", "font-black", "text-slate-400"], [1, "px-8", "py-5", "text-right"], [1, "material-symbols-outlined", 3, "ngClass"], [1, "w-3", "h-3", "rounded-[2px]"], [1, "aspect-[2/1]", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "animate-pulse"], [1, "aspect-[2/1]", "rounded-2xl", "transition-all", "hover:scale-105", "cursor-help", "shadow-sm", 3, "ngClass"], [1, "flex", "justify-between", "items-end", "mb-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500"], [1, "text-xs", "font-black", "text-slate-900", "dark:text-slate-50"], [1, "w-full", "h-2.5", "bg-slate-100", "dark:bg-slate-800", "rounded-full", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all", "duration-700"], [1, "glass-card", "p-6", "rounded-3xl", "border", "border-white/40", "dark:border-slate-800/50", "shadow-xl", "flex", "flex-col", "md:flex-row", "items-center", "gap-8", "group", "hover:border-indigo-200", "transition-all"], [1, "flex", "items-center", "gap-4", "min-w-[240px]"], [1, "w-14", "h-14", "rounded-2xl", "shadow-lg", "group-hover:scale-110", "transition-transform", 3, "src", "alt"], [1, "font-black", "text-slate-900", "dark:text-slate-50"], [1, "text-[10px]", "text-slate-500", "uppercase", "font-black", "tracking-widest"], [1, "flex-1", "w-full", "relative", "h-10", "px-4"], [1, "absolute", "inset-0", "top-1/2", "-translate-y-1/2", "h-2", "bg-slate-50", "dark:bg-slate-800/50", "rounded-full"], [1, "absolute", "top-1/2", "-translate-y-1/2", "h-8", "rounded-xl", "border-2", "flex", "items-center", "px-4", "transition-all", "hover:scale-105", "cursor-pointer", 3, "ngClass", "left", "width"], [1, "min-w-[120px]", "text-right"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-widest", "shadow-sm"], [1, "w-2", "h-2", "rounded-full", "bg-current", "animate-pulse"], [1, "absolute", "top-1/2", "-translate-y-1/2", "h-8", "rounded-xl", "border-2", "flex", "items-center", "px-4", "transition-all", "hover:scale-105", "cursor-pointer", 3, "ngClass"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "truncate"]], template: function Labour_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, Labour_Conditional_1_Template, 4, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, Labour_Conditional_2_Template, 11, 1, "div", 2);
      \u0275\u0275elementStart(3, "header", 3)(4, "div")(5, "p", 4);
      \u0275\u0275text(6, " Workforce Intelligence ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h1", 5);
      \u0275\u0275text(8, " Labor Efficiency. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, " Real-time velocity tracking, contractor audits, and skill-gap analysis across all active infrastructure nodes. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 7)(12, "div", 8)(13, "p", 9);
      \u0275\u0275text(14, " Active Personnel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "p", 10);
      \u0275\u0275conditionalCreate(16, Labour_Conditional_16_Template, 2, 0, "span", 11)(17, Labour_Conditional_17_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 8)(19, "p", 9);
      \u0275\u0275text(20, " Skill Compliance ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p", 12);
      \u0275\u0275conditionalCreate(22, Labour_Conditional_22_Template, 2, 0, "span", 11)(23, Labour_Conditional_23_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 8)(25, "p", 9);
      \u0275\u0275text(26, " Active Crews ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 10);
      \u0275\u0275conditionalCreate(28, Labour_Conditional_28_Template, 2, 0, "span", 11)(29, Labour_Conditional_29_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 13)(31, "p", 14);
      \u0275\u0275text(32, " Overtime Alerts ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p", 10);
      \u0275\u0275conditionalCreate(34, Labour_Conditional_34_Template, 2, 0, "span", 11)(35, Labour_Conditional_35_Template, 1, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(36, Labour_Conditional_36_Template, 9, 0, "div", 15);
      \u0275\u0275elementStart(37, "div", 16)(38, "div", 17)(39, "div", 18)(40, "div", 19)(41, "div")(42, "h2", 20);
      \u0275\u0275text(43, " Contractor Performance Vault ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "p", 21);
      \u0275\u0275text(45, " Auditing efficacy and adherence across primary subcontractors. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "button", 22);
      \u0275\u0275text(47, " Full Audit Report ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(48, Labour_Conditional_48_Template, 3, 1, "div", 23)(49, Labour_Conditional_49_Template, 7, 0, "div", 24)(50, Labour_Conditional_50_Template, 19, 0, "div", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "div", 26)(52, "div", 27)(53, "div")(54, "h3", 20);
      \u0275\u0275text(55, " Workforce Productivity Heatmap ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p", 28);
      \u0275\u0275text(57, " Task completion density \u2014 last 3 weeks, grouped by day. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 29)(59, "div", 30);
      \u0275\u0275repeaterCreate(60, Labour_For_61_Template, 1, 2, "div", 31, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "span", 32);
      \u0275\u0275text(63, " Intensity ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(64, Labour_Conditional_64_Template, 3, 1, "div", 33)(65, Labour_Conditional_65_Template, 3, 0, "div", 34)(66, Labour_Conditional_66_Template, 3, 0, "div", 33);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "div", 35)(68, "div", 36)(69, "h3", 37);
      \u0275\u0275text(70, " Skills Composition ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(71, Labour_Conditional_71_Template, 3, 0, "div", 38);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(72, "section", 39)(73, "div", 40)(74, "h2", 41);
      \u0275\u0275text(75, " Active Pulse Activity ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(76, "div", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(77, Labour_Conditional_77_Template, 3, 0, "div", 43);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "button", 44)(79, "span", 45);
      \u0275\u0275text(80, " add_chart ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "span", 46);
      \u0275\u0275text(82, " Manual Entry ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error ? 2 : -1);
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.loading ? 16 : 17);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading ? 22 : 23);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading ? 28 : 29);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading ? 34 : 35);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading && ctx.vendors.length > 0 ? 36 : -1);
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.loading ? 48 : ctx.contractors.length === 0 ? 49 : 50);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(11, _c0));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading ? 64 : ctx.heatmap.length === 0 ? 65 : 66);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(!ctx.loading && (ctx.stats == null ? null : ctx.stats.skillsDistribution == null ? null : ctx.stats.skillsDistribution.length) ? 71 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(!ctx.loading && ctx.filteredShiftActivity.length > 0 ? 77 : -1);
    }
  }, dependencies: [NgClass], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Labour, [{
    type: Component,
    args: [{ selector: "app-labour", standalone: false, template: `<div class="max-w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700">\r
\r
  <!-- LOADER -->\r
  @if (loading) {\r
  <div class="fixed inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">\r
    <div class="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>\r
    <p class="text-sm font-black text-slate-400 uppercase tracking-widest">\r
      Loading Dashboard\u2026\r
    </p>\r
  </div>\r
  }\r
\r
  <!-- ERROR -->\r
  @if (error) {\r
  <div class="mb-6 flex items-center gap-4 bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl shadow-sm">\r
    <span class="material-symbols-outlined">error</span>\r
\r
    <p class="text-sm font-bold flex-1">\r
      {{ error }}\r
    </p>\r
\r
    <div class="flex items-center gap-3">\r
      <button\r
        type="button"\r
        (click)="refresh()"\r
        class="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-black hover:bg-rose-700 transition-all"\r
      >\r
        Retry\r
      </button>\r
\r
      <button\r
        type="button"\r
        (click)="dismissError()"\r
        class="text-rose-400 hover:text-rose-600 transition-all"\r
      >\r
        <span class="material-symbols-outlined text-sm">close</span>\r
      </button>\r
    </div>\r
  </div>\r
  }\r
\r
  <!-- HEADER -->\r
  <header class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">\r
\r
    <div>\r
      <p class="text-indigo-600 font-black tracking-[0.3em] uppercase text-[10px] mb-2">\r
        Workforce Intelligence\r
      </p>\r
\r
      <h1 class="text-3xl font-black text-slate-800 dark:text-white">\r
        Labor Efficiency.\r
      </h1>\r
\r
      <p class="text-slate-500 dark:text-slate-400 max-w-xl text-lg font-medium leading-relaxed">\r
        Real-time velocity tracking, contractor audits, and skill-gap analysis\r
        across all active infrastructure nodes.\r
      </p>\r
    </div>\r
\r
    <!-- STATS -->\r
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">\r
\r
      <div class="glass-card p-6 rounded-[2rem] border border-white/40 dark:border-slate-800/50 shadow-xl">\r
        <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">\r
          Active Personnel\r
        </p>\r
\r
        <p class="text-3xl font-black text-slate-900 dark:text-slate-50">\r
          @if (loading) {\r
          <span class="animate-pulse text-slate-300">\u2014</span>\r
          } @else {\r
          {{ stats?.totalPersonnel ?? 0 }}\r
          }\r
        </p>\r
      </div>\r
\r
      <div class="glass-card p-6 rounded-[2rem] border border-white/40 dark:border-slate-800/50 shadow-xl">\r
        <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">\r
          Skill Compliance\r
        </p>\r
\r
        <p class="text-3xl font-black text-emerald-600">\r
          @if (loading) {\r
          <span class="animate-pulse text-slate-300">\u2014</span>\r
          } @else {\r
          {{ stats?.skillCompliance ?? 0 }}%\r
          }\r
        </p>\r
      </div>\r
\r
      <div class="glass-card p-6 rounded-[2rem] border border-white/40 dark:border-slate-800/50 shadow-xl">\r
        <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">\r
          Active Crews\r
        </p>\r
\r
        <p class="text-3xl font-black text-slate-900 dark:text-slate-50">\r
          @if (loading) {\r
          <span class="animate-pulse text-slate-300">\u2014</span>\r
          } @else {\r
          {{ stats?.activeCrews ?? 0 }}\r
          }\r
        </p>\r
      </div>\r
\r
      <div class="glass-card p-6 rounded-[2rem] border border-white/40 dark:border-slate-800/50 shadow-xl border-l-4 border-l-amber-500">\r
        <p class="text-[10px] font-black uppercase text-amber-600 tracking-widest mb-1">\r
          Overtime Alerts\r
        </p>\r
\r
        <p class="text-3xl font-black text-slate-900 dark:text-slate-50">\r
          @if (loading) {\r
          <span class="animate-pulse text-slate-300">\u2014</span>\r
          } @else {\r
          {{ stats?.overtimeAlerts ?? 0 }}\r
          }\r
        </p>\r
      </div>\r
\r
    </div>\r
  </header>\r
\r
  <!-- FILTER -->\r
  @if (!loading && vendors.length > 0) {\r
\r
  <div class="flex items-center gap-3 mb-8 overflow-x-auto pb-2 flex-wrap">\r
\r
    <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">\r
      Filter by Vendor:\r
    </span>\r
\r
    @for (v of vendorOptions; track v.id) {\r
\r
    <button\r
      type="button"\r
      (click)="onVendorChange(v.id)"\r
      [ngClass]="selectedVendorId === v.id\r
      ? 'px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all shrink-0'\r
      : 'px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shrink-0'"\r
    >\r
      {{ v.name }}\r
    </button>\r
\r
    }\r
\r
    <button\r
      type="button"\r
      (click)="refresh()"\r
      class="ml-auto flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shrink-0"\r
    >\r
      <span class="material-symbols-outlined text-sm">refresh</span>\r
      Refresh\r
    </button>\r
\r
  </div>\r
\r
  }\r
\r
  <!-- MAIN GRID -->\r
  <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">\r
\r
    <!-- LEFT -->\r
    <div class="xl:col-span-8 space-y-8">\r
\r
      <!-- CONTRACTOR TABLE -->\r
      <div class="glass-card rounded-[2.5rem] border border-white/40 dark:border-slate-800/50 shadow-2xl overflow-hidden">\r
\r
        <div class="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/30 dark:bg-slate-900/30">\r
\r
          <div>\r
            <h2 class="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">\r
              Contractor Performance Vault\r
            </h2>\r
\r
            <p class="text-sm text-slate-500 font-medium italic mt-0.5">\r
              Auditing efficacy and adherence across primary subcontractors.\r
            </p>\r
          </div>\r
\r
          <button\r
            type="button"\r
            class="px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-black rounded-xl text-xs hover:scale-105 transition-all"\r
          >\r
            Full Audit Report\r
          </button>\r
\r
        </div>\r
\r
        @if (loading) {\r
\r
        <div class="p-8 space-y-4">\r
          @for (i of [1,2,3,4]; track i) {\r
          <div class="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>\r
          }\r
        </div>\r
\r
        }\r
\r
        @else if (contractors.length === 0) {\r
\r
        <div class="p-16 text-center">\r
          <span class="material-symbols-outlined text-5xl text-slate-200 mb-4 block">\r
            group_off\r
          </span>\r
\r
          <p class="text-slate-400 font-bold text-sm">\r
            No contractor data found.\r
          </p>\r
\r
          <p class="text-slate-300 text-xs mt-1">\r
            Labor workers add karo is company/vendor ke liye.\r
          </p>\r
        </div>\r
\r
        }\r
\r
        @else {\r
\r
        <div class="overflow-x-auto">\r
\r
          <table class="w-full text-left border-collapse">\r
\r
            <thead>\r
              <tr class="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400">\r
                <th class="px-8 py-5 text-[10px] uppercase font-black tracking-widest">\r
                  Subcontractor\r
                </th>\r
\r
                <th class="px-6 py-5 text-[10px] uppercase font-black tracking-widest text-center">\r
                  Efficiency\r
                </th>\r
\r
                <th class="px-6 py-5 text-[10px] uppercase font-black tracking-widest text-center">\r
                  Safety SPI\r
                </th>\r
\r
                <th class="px-6 py-5 text-[10px] uppercase font-black tracking-widest text-center">\r
                  Retention\r
                </th>\r
\r
                <th class="px-6 py-5 text-[10px] uppercase font-black tracking-widest text-center">\r
                  Schedule\r
                </th>\r
\r
                <th class="px-8 py-5 text-[10px] uppercase font-black tracking-widest text-right">\r
                  Trend\r
                </th>\r
              </tr>\r
            </thead>\r
\r
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">\r
\r
              @for (c of contractors; track c.vendor_id) {\r
\r
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all group">\r
\r
                <td class="px-8 py-5">\r
\r
                  <div class="flex items-center gap-4">\r
\r
                    <img\r
                      [src]="c.logo || ('https://ui-avatars.com/api/?name=' + c.name + '&background=6366f1&color=fff')"\r
                      [alt]="c.name"\r
                      class="w-10 h-10 rounded-xl bg-slate-100 p-1 object-contain shadow-sm"\r
                    >\r
\r
                    <div>\r
                      <p class="text-sm font-black text-slate-900 dark:text-slate-50">\r
                        {{ c.name }}\r
                      </p>\r
\r
                      <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">\r
                        {{ c.personnel }} Personnel \u2022 {{ c.tasks }} Tasks\r
                      </p>\r
                    </div>\r
\r
                  </div>\r
\r
                </td>\r
\r
                <td class="px-6 py-5 text-center">\r
                  <span\r
                    [class]="getEfficiencyColor(+c.efficiency)"\r
                    class="px-3 py-1 rounded-lg text-[10px] font-black border"\r
                  >\r
                    {{ c.efficiency }}%\r
                  </span>\r
                </td>\r
\r
                <td class="px-6 py-5 text-center">\r
                  <p class="text-sm font-black text-slate-700 dark:text-slate-300">\r
                    {{ c.safetyScore }}\r
                  </p>\r
                </td>\r
\r
                <td class="px-6 py-5 text-center">\r
                  <p class="text-sm font-black text-slate-700 dark:text-slate-300">\r
                    {{ c.retentionRate }}%\r
                  </p>\r
                </td>\r
\r
                <td class="px-6 py-5 text-center">\r
\r
                  <div class="flex flex-col items-center gap-1">\r
\r
                    <div class="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">\r
                      <div\r
                        class="h-full bg-indigo-500"\r
                        [style.width.%]="c.adherenceToSchedule"\r
                      ></div>\r
                    </div>\r
\r
                    <span class="text-[9px] font-black text-slate-400">\r
                      {{ c.adherenceToSchedule }}%\r
                    </span>\r
\r
                  </div>\r
\r
                </td>\r
\r
                <td class="px-8 py-5 text-right">\r
\r
                  <span\r
                    class="material-symbols-outlined"\r
                    [ngClass]="{\r
                      'text-emerald-500': c.trend === 'up',\r
                      'text-rose-500': c.trend === 'down',\r
                      'text-slate-300': c.trend !== 'up' && c.trend !== 'down'\r
                    }"\r
                  >\r
                    {{\r
                      c.trend === 'up'\r
                        ? 'trending_up'\r
                        : c.trend === 'down'\r
                        ? 'trending_down'\r
                        : 'horizontal_rule'\r
                    }}\r
                  </span>\r
\r
                </td>\r
\r
              </tr>\r
\r
              }\r
\r
            </tbody>\r
\r
          </table>\r
\r
        </div>\r
\r
        }\r
\r
      </div>\r
\r
      <!-- HEATMAP -->\r
      <div class="glass-card rounded-[2.5rem] p-8 border border-white/40 dark:border-slate-800/50 shadow-2xl overflow-hidden">\r
\r
        <div class="flex justify-between items-start mb-10">\r
\r
          <div>\r
            <h3 class="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">\r
              Workforce Productivity Heatmap\r
            </h3>\r
\r
            <p class="text-sm text-slate-500 font-medium">\r
              Task completion density \u2014 last 3 weeks, grouped by day.\r
            </p>\r
          </div>\r
\r
          <div class="flex items-center gap-3">\r
\r
            <div class="flex gap-1">\r
              @for (i of [1,2,3,4,5]; track i) {\r
              <div class="w-3 h-3 rounded-[2px]" [class]="'bg-indigo-' + (i * 100 + 400)"></div>\r
              }\r
            </div>\r
\r
            <span class="text-[10px] font-black uppercase text-slate-400 tracking-widest">\r
              Intensity\r
            </span>\r
\r
          </div>\r
\r
        </div>\r
\r
        @if (loading) {\r
\r
        <div class="grid grid-cols-7 gap-4">\r
          @for (i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]; track i) {\r
          <div class="aspect-[2/1] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"></div>\r
          }\r
        </div>\r
\r
        }\r
\r
        @else if (heatmap.length === 0) {\r
\r
        <div class="h-32 flex items-center justify-center">\r
          <p class="text-slate-400 font-bold text-sm">\r
            Koi heatmap data nahi hai.\r
          </p>\r
        </div>\r
\r
        }\r
\r
        @else {\r
\r
        <div class="grid grid-cols-7 gap-4">\r
\r
          @for (row of heatmap; track $index) {\r
          @for (val of row; track $index) {\r
\r
          <div\r
            class="aspect-[2/1] rounded-2xl transition-all hover:scale-105 cursor-help shadow-sm"\r
            [ngClass]="{\r
              'bg-indigo-700': val >= 4,\r
              'bg-indigo-500': val === 3,\r
              'bg-indigo-300': val === 2,\r
              'bg-indigo-100': val === 1,\r
              'bg-slate-50 dark:bg-slate-800/50': val === 0\r
            }"\r
          ></div>\r
\r
          }\r
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
    <!-- RIGHT -->\r
    <div class="xl:col-span-4 space-y-8">\r
\r
      <!-- SKILLS -->\r
      <div class="glass-card rounded-[2.5rem] p-8 border border-white/40 dark:border-slate-800/50 shadow-2xl">\r
\r
        <h3 class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight mb-8">\r
          Skills Composition\r
        </h3>\r
\r
        @if (!loading && stats?.skillsDistribution?.length) {\r
\r
        <div class="space-y-6">\r
\r
          @for (skill of stats!.skillsDistribution; track skill.name) {\r
\r
          <div>\r
\r
            <div class="flex justify-between items-end mb-2">\r
\r
              <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">\r
                {{ skill.name }}\r
              </span>\r
\r
              <span class="text-xs font-black text-slate-900 dark:text-slate-50">\r
                {{ skill.count }} Personnel\r
              </span>\r
\r
            </div>\r
\r
            <div class="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">\r
\r
              <div\r
                class="h-full rounded-full transition-all duration-700"\r
                [style.width.%]="skillBarWidth(skill.count)"\r
                [style.background-color]="skill.color"\r
              ></div>\r
\r
            </div>\r
\r
          </div>\r
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
  </div>\r
\r
  <!-- ACTIVE ACTIVITY -->\r
  <section class="mt-20">\r
\r
    <div class="flex items-center gap-6 mb-12">\r
\r
      <h2 class="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">\r
        Active Pulse Activity\r
      </h2>\r
\r
      <div class="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>\r
\r
    </div>\r
\r
    @if (!loading && filteredShiftActivity.length > 0) {\r
\r
    <div class="grid grid-cols-1 gap-4">\r
\r
      @for (worker of filteredShiftActivity; track worker.id) {\r
\r
      <div class="glass-card p-6 rounded-3xl border border-white/40 dark:border-slate-800/50 shadow-xl flex flex-col md:flex-row items-center gap-8 group hover:border-indigo-200 transition-all">\r
\r
        <!-- LEFT -->\r
        <div class="flex items-center gap-4 min-w-[240px]">\r
\r
          <img\r
            [src]="worker.avatar || ('https://ui-avatars.com/api/?name=' + worker.name + '&background=6366f1&color=fff&size=128')"\r
            [alt]="worker.name"\r
            class="w-14 h-14 rounded-2xl shadow-lg group-hover:scale-110 transition-transform"\r
          >\r
\r
          <div>\r
\r
            <p class="font-black text-slate-900 dark:text-slate-50">\r
              {{ worker.name }}\r
            </p>\r
\r
            <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest">\r
              {{ worker.role }}\r
            </p>\r
\r
          </div>\r
\r
        </div>\r
\r
        <!-- TIMELINE -->\r
        <div class="flex-1 w-full relative h-10 px-4">\r
\r
          <div class="absolute inset-0 top-1/2 -translate-y-1/2 h-2 bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>\r
\r
          @for (act of worker.activities; track act.label) {\r
\r
          <div\r
            class="absolute top-1/2 -translate-y-1/2 h-8 rounded-xl border-2 flex items-center px-4 transition-all hover:scale-105 cursor-pointer"\r
            [ngClass]="{\r
              'bg-indigo-600 border-indigo-200 text-white shadow-lg': act.type === 'primary',\r
              'bg-amber-100 border-amber-200 text-amber-700': act.type === 'secondary',\r
              'bg-slate-900 border-slate-700 text-white': act.type !== 'primary' && act.type !== 'secondary'\r
            }"\r
            [style.left]="act.left"\r
            [style.width]="act.width"\r
          >\r
\r
            <span class="text-[9px] font-black uppercase tracking-widest truncate">\r
              {{ act.label }}\r
            </span>\r
\r
          </div>\r
\r
          }\r
\r
        </div>\r
\r
        <!-- STATUS -->\r
        <div class="min-w-[120px] text-right">\r
\r
          <div\r
            [class]="worker.statusClass"\r
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"\r
          >\r
\r
            <div class="w-2 h-2 rounded-full bg-current animate-pulse"></div>\r
\r
            {{ worker.status }}\r
\r
          </div>\r
\r
        </div>\r
\r
      </div>\r
\r
      }\r
\r
    </div>\r
\r
    }\r
\r
  </section>\r
\r
</div>\r
\r
<!-- FLOAT BUTTON -->\r
<button\r
  type="button"\r
  class="fixed bottom-10 right-10 w-16 h-16 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"\r
>\r
\r
  <span class="material-symbols-outlined text-3xl">\r
    add_chart\r
  </span>\r
\r
  <span\r
    class="absolute right-full mr-6 py-3 px-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl"\r
  >\r
    Manual Entry\r
  </span>\r
\r
</button>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Labour, { className: "Labour", filePath: "app/modules/analytics/labour/labour.ts", lineNumber: 18 });
})();

// src/app/modules/analytics/analytics-routing-module.ts
var routes = [
  { path: "labor", component: Labour }
];
var AnalyticsRoutingModule = class _AnalyticsRoutingModule {
  static \u0275fac = function AnalyticsRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnalyticsRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AnalyticsRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalyticsRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/analytics/analytics-module.ts
var AnalyticsModule = class _AnalyticsModule {
  static \u0275fac = function AnalyticsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnalyticsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AnalyticsModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    AnalyticsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalyticsModule, [{
    type: NgModule,
    args: [{
      declarations: [Labour],
      imports: [
        CommonModule,
        AnalyticsRoutingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }]
  }], null, null);
})();
export {
  AnalyticsModule
};
//# sourceMappingURL=chunk-3PUEQFVN.js.map
