import {
  VendorAuditService,
  VendorInvoiceService,
  VendorsLaborServices
} from "./chunk-N77CZUWI.js";
import {
  VendorsServices
} from "./chunk-LTJWUNDC.js";
import {
  ProjectService
} from "./chunk-52DGP4Y7.js";
import {
  AuthService
} from "./chunk-2M3NZLNK.js";
import {
  TeamService
} from "./chunk-RJ7DGS3L.js";
import {
  ToastrService
} from "./chunk-QR7MRZIR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  ReactiveFormsModule
} from "./chunk-YLIHD5YA.js";
import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  ActivatedRoute,
  BehaviorSubject,
  CommonModule,
  Component,
  DatePipe,
  HostListener,
  HttpClient,
  Injectable,
  Input,
  NgClass,
  NgModule,
  Router,
  RouterModule,
  __spreadProps,
  __spreadValues,
  catchError,
  forkJoin,
  inject,
  map,
  of,
  setClassMetadata,
  take,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction6,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-23RKHPSU.js";

// src/app/modules/history/vendors-history/vendors-history-services.ts
var VendorsHistoryServices = class _VendorsHistoryServices {
  http;
  base = `${environment.serverUrl}/api/v1/vendors`;
  historySubject = new BehaviorSubject([]);
  loadingSubject = new BehaviorSubject(false);
  history$ = this.historySubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  getVendorHistory(vendorId, params) {
    let httpParams = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== void 0 && value !== null) {
          httpParams[key] = String(value);
        }
      });
    }
    return this.http.get(`${this.base}/${vendorId}/history`, { params: httpParams });
  }
  getVendorHistorySummary(vendorId) {
    return this.http.get(`${this.base}/${vendorId}/history/summary`);
  }
  loadVendorHistory(vendorId, params) {
    this.loadingSubject.next(true);
    this.getVendorHistory(vendorId, params).subscribe({
      next: (res) => {
        if (res.success)
          this.historySubject.next(res.data);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error("[VendorsHistoryServices.loadVendorHistory]", err);
        this.loadingSubject.next(false);
      }
    });
  }
  clearHistory() {
    this.historySubject.next([]);
  }
  getHistory() {
    return this.historySubject.value;
  }
  static \u0275fac = function VendorsHistoryServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsHistoryServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VendorsHistoryServices, factory: _VendorsHistoryServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsHistoryServices, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/history/vendors-history/vendors-history.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.dateKey;
function VendorsHistory_Conditional_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function VendorsHistory_Conditional_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "remove");
    \u0275\u0275elementEnd();
  }
}
function VendorsHistory_Conditional_17_For_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function VendorsHistory_Conditional_17_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_17_For_19_Template_div_click_0_listener() {
      const v_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleVendorSelection(v_r5));
    });
    \u0275\u0275elementStart(1, "div", 46);
    \u0275\u0275conditionalCreate(2, VendorsHistory_Conditional_17_For_19_Conditional_2_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 47)(4, "span", 48);
    \u0275\u0275text(5, "business");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "p", 49);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 50)(10, "span", 51);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 52);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 53);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const v_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.selectedVendorIds.has(v_r5.id) ? "bg-primary border-primary" : "border-outline/40 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedVendorIds.has(v_r5.id) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.selectedVendorIds.has(v_r5.id) ? "bg-primary/15" : "bg-surface-container-high");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.selectedVendorIds.has(v_r5.id) ? "text-primary" : "text-outline");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(v_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", v_r5.statusColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r5.status);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-green-600", v_r5.compliance_score >= 90)("text-amber-500", v_r5.compliance_score < 90 && v_r5.compliance_score >= 70)("text-red-500", v_r5.compliance_score < 70);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", v_r5.compliance_score, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\xB7 Since ", ctx_r2.formatDate(v_r5.created_at));
  }
}
function VendorsHistory_Conditional_17_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 54);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 55);
    \u0275\u0275text(4, "No vendors found");
    \u0275\u0275elementEnd()();
  }
}
function VendorsHistory_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 25)(2, "div", 26)(3, "span", 27);
    \u0275\u0275text(4, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function VendorsHistory_Conditional_17_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dropdownSearch, $event) || (ctx_r2.dropdownSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 29);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_17_Template_div_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSelectAll());
    });
    \u0275\u0275elementStart(7, "div", 30);
    \u0275\u0275conditionalCreate(8, VendorsHistory_Conditional_17_Conditional_8_Template, 2, 0, "span", 31)(9, VendorsHistory_Conditional_17_Conditional_9_Template, 2, 0, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 33)(11, "p", 34);
    \u0275\u0275text(12, "All Vendors");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 35);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 36);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 37);
    \u0275\u0275repeaterCreate(18, VendorsHistory_Conditional_17_For_19_Template, 16, 15, "div", 38, _forTrack1, false, VendorsHistory_Conditional_17_ForEmpty_20_Template, 5, 0, "div", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 40)(22, "div", 41)(23, "span");
    \u0275\u0275text(24, "Active: ");
    \u0275\u0275elementStart(25, "span", 42);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Pending: ");
    \u0275\u0275elementStart(29, "span", 43);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "button", 44);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_17_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.vendorDropdownOpen = false);
    });
    \u0275\u0275text(32, "Done");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dropdownSearch);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.isAllSelected ? "bg-primary border-primary" : ctx_r2.isPartiallySelected ? "bg-primary/30 border-primary" : "border-outline/40 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isAllSelected ? 8 : ctx_r2.isPartiallySelected ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r2.vendors.length, " total");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.selectedVendorIds.size, "/", ctx_r2.vendors.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.dropdownFilteredVendors);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.activeCount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.pendingCount);
  }
}
function VendorsHistory_For_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.activeCategory === tab_r7.key ? "bg-white/20 text-white" : "bg-primary/10 text-primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCategoryCount(tab_r7.key), " ");
  }
}
function VendorsHistory_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function VendorsHistory_For_24_Template_button_click_0_listener() {
      const tab_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setActiveCategory(tab_r7.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, VendorsHistory_For_24_Conditional_2_Template, 2, 2, "span", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.activeCategory === tab_r7.key ? "bg-primary text-white shadow-sm" : "bg-surface-container-low text-slate-500 hover:bg-surface-container");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r7.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.getCategoryCount(tab_r7.key) > 0 ? 2 : -1);
  }
}
function VendorsHistory_Conditional_26_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 62);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_26_For_4_Template_button_click_3_listener() {
      const id_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeVendorSelection(id_r10));
    });
    \u0275\u0275elementStart(4, "span", 63);
    \u0275\u0275text(5, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const id_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getVendorNameById(id_r10));
  }
}
function VendorsHistory_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 58);
    \u0275\u0275text(2, "Showing:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, VendorsHistory_Conditional_26_For_4_Template, 6, 1, "div", 59, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(5, "button", 60);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_26_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearAllSelections());
    });
    \u0275\u0275text(6, "Clear all");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.selectedVendorIdsArray);
  }
}
function VendorsHistory_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " All Vendors \u2014 Activity History ");
  }
}
function VendorsHistory_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " No Vendor Selected ");
  }
}
function VendorsHistory_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedVendorIds.size, " Vendor(s) \u2014 Activity History ");
  }
}
function VendorsHistory_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 64);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 65);
    \u0275\u0275text(4, "Loading history\u2026");
    \u0275\u0275elementEnd()();
  }
}
function VendorsHistory_Conditional_38_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "span", 69);
    \u0275\u0275text(2, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 65);
    \u0275\u0275text(4, "No activity found for this filter.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 70);
    \u0275\u0275text(6, "Try selecting a different tab or vendor.");
    \u0275\u0275elementEnd()();
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_10_Template(rf, ctx) {
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90)(1, "span", 92);
    \u0275\u0275text(2, "Created By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 93);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ev_r11.createdBy, " ");
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91)(1, "span", 92);
    \u0275\u0275text(2, "Created At:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 94);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ev_r11.createdAt, " ");
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275conditionalCreate(1, VendorsHistory_Conditional_38_For_2_For_12_Conditional_14_Conditional_1_Template, 5, 1, "div", 90);
    \u0275\u0275conditionalCreate(2, VendorsHistory_Conditional_38_For_2_For_12_Conditional_14_Conditional_2_Template, 5, 1, "div", 91);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.createdBy ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.createdAt ? 2 : -1);
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90)(1, "span", 92);
    \u0275\u0275text(2, "Updated By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 95);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ev_r11.updatedBy, " ");
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91)(1, "span", 92);
    \u0275\u0275text(2, "Updated At:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 96);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ev_r11.updatedAt, " ");
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87);
    \u0275\u0275conditionalCreate(1, VendorsHistory_Conditional_38_For_2_For_12_Conditional_15_Conditional_1_Template, 5, 1, "div", 90);
    \u0275\u0275conditionalCreate(2, VendorsHistory_Conditional_38_For_2_For_12_Conditional_15_Conditional_2_Template, 5, 1, "div", 91);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.updatedBy ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.updatedAt ? 2 : -1);
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 97);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_38_For_2_For_12_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ev_r11 = \u0275\u0275nextContext().$implicit;
      return \u0275\u0275resetView(ev_r11.viewAction());
    });
    \u0275\u0275elementStart(1, "span", 98);
    \u0275\u0275text(2, "visibility");
    \u0275\u0275elementEnd()();
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90)(1, "span", 92);
    \u0275\u0275text(2, "Created By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 93);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ev_r11.createdBy, " ");
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91)(1, "span", 92);
    \u0275\u0275text(2, "Created At:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 94);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ev_r11.createdAt, " ");
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104);
    \u0275\u0275conditionalCreate(1, VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Conditional_12_Conditional_1_Template, 5, 1, "div", 90);
    \u0275\u0275conditionalCreate(2, VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Conditional_12_Conditional_2_Template, 5, 1, "div", 91);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.createdBy ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.createdAt ? 2 : -1);
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89);
    \u0275\u0275element(1, "div", 99);
    \u0275\u0275elementStart(2, "div", 79)(3, "div", 100)(4, "span", 101);
    \u0275\u0275text(5, "account_balance_wallet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "div", 82)(8, "span", 102);
    \u0275\u0275text(9, " Budget ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 103);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Conditional_12_Template, 3, 2, "div", 104);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2(" Budget of ", ctx_r2.formatAmount(ev_r11.budgetMeta.allocated), ' was allocated to Vendor "', ev_r11.vendorName, '". ');
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.createdBy || ev_r11.createdAt ? 12 : -1);
  }
}
function VendorsHistory_Conditional_38_For_2_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275element(1, "div", 78);
    \u0275\u0275elementStart(2, "div", 79)(3, "div", 80)(4, "span", 81);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "div", 82)(8, "span", 83);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, VendorsHistory_Conditional_38_For_2_For_12_Conditional_10_Template, 0, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 84);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 85);
    \u0275\u0275conditionalCreate(14, VendorsHistory_Conditional_38_For_2_For_12_Conditional_14_Template, 3, 2, "div", 86);
    \u0275\u0275conditionalCreate(15, VendorsHistory_Conditional_38_For_2_For_12_Conditional_15_Template, 3, 2, "div", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, VendorsHistory_Conditional_38_For_2_For_12_Conditional_16_Template, 3, 0, "button", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, VendorsHistory_Conditional_38_For_2_For_12_Conditional_17_Template, 13, 3, "div", 89);
  }
  if (rf & 2) {
    const ev_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ev_r11.iconBg);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ev_r11.iconBg);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ev_r11.iconColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ev_r11.icon);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r2.getCategoryBadgeClass(ev_r11.primaryCategory));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCategoryLabel(ev_r11.primaryCategory), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.isSingleVendorSelected && ctx_r2.isAllSelected ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ev_r11.description, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ev_r11.createdBy || ev_r11.createdAt ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.updatedBy || ev_r11.updatedAt ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.viewAction ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ev_r11.budgetMeta && ev_r11.id.includes("-onboard") ? 17 : -1);
  }
}
function VendorsHistory_Conditional_38_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 71)(2, "div", 72)(3, "span", 73);
    \u0275\u0275text(4, "calendar_today");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 33)(6, "h4", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 75);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 76);
    \u0275\u0275repeaterCreate(11, VendorsHistory_Conditional_38_For_2_For_12_Template, 18, 12, null, null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const dGroup_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(dGroup_r13.date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.countEventsInDateGroup(dGroup_r13), " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(dGroup_r13.events);
  }
}
function VendorsHistory_Conditional_38_Conditional_3_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 113);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function VendorsHistory_Conditional_38_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 112);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_38_Conditional_3_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.goToPage(1));
    });
    \u0275\u0275text(1, " 1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, VendorsHistory_Conditional_38_Conditional_3_Conditional_13_Conditional_2_Template, 2, 0, "span", 113);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.pageNumbers[0] > 2 ? 2 : -1);
  }
}
function VendorsHistory_Conditional_38_Conditional_3_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 114);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_38_Conditional_3_For_15_Template_button_click_0_listener() {
      const p_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.goToPage(p_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", p_r17 === ctx_r2.currentPage ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-surface-container-low");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r17, " ");
  }
}
function VendorsHistory_Conditional_38_Conditional_3_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 113);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function VendorsHistory_Conditional_38_Conditional_3_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, VendorsHistory_Conditional_38_Conditional_3_Conditional_16_Conditional_0_Template, 2, 0, "span", 113);
    \u0275\u0275elementStart(1, "button", 112);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_38_Conditional_3_Conditional_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.goToPage(ctx_r2.totalPages));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r2.pageNumbers[ctx_r2.pageNumbers.length - 1] < ctx_r2.totalPages - 1 ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.totalPages, " ");
  }
}
function VendorsHistory_Conditional_38_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "p", 105);
    \u0275\u0275text(2, " Showing ");
    \u0275\u0275elementStart(3, "span", 106);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " of ");
    \u0275\u0275elementStart(6, "span", 106);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " entries ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 107)(10, "button", 108);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_38_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.prevPage());
    });
    \u0275\u0275elementStart(11, "span", 109);
    \u0275\u0275text(12, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, VendorsHistory_Conditional_38_Conditional_3_Conditional_13_Template, 3, 1);
    \u0275\u0275repeaterCreate(14, VendorsHistory_Conditional_38_Conditional_3_For_15_Template, 2, 2, "button", 110, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(16, VendorsHistory_Conditional_38_Conditional_3_Conditional_16_Template, 3, 2);
    \u0275\u0275elementStart(17, "button", 111);
    \u0275\u0275listener("click", function VendorsHistory_Conditional_38_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.nextPage());
    });
    \u0275\u0275elementStart(18, "span", 109);
    \u0275\u0275text(19, "chevron_right");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r2.pageStartIndex, "\u2013", ctx_r2.pageEndIndex);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.totalFilteredEvents);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.pageNumbers[0] > 1 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.pageNumbers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.pageNumbers[ctx_r2.pageNumbers.length - 1] < ctx_r2.totalPages ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.currentPage === ctx_r2.totalPages);
  }
}
function VendorsHistory_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, VendorsHistory_Conditional_38_Conditional_0_Template, 7, 0, "div", 66);
    \u0275\u0275repeaterCreate(1, VendorsHistory_Conditional_38_For_2_Template, 13, 2, "div", 67, _forTrack2);
    \u0275\u0275conditionalCreate(3, VendorsHistory_Conditional_38_Conditional_3_Template, 20, 7, "div", 68);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.flatDateGroups.length === 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.flatDateGroups);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.totalFilteredEvents > 0 ? 3 : -1);
  }
}
var CATEGORY_META = {
  vendor: { label: "Vendor", badgeClass: "bg-pink-100 text-pink-700" },
  project: { label: "Project", badgeClass: "bg-indigo-100 text-indigo-700" },
  task: { label: "Task", badgeClass: "bg-blue-100 text-blue-700" },
  milestone: { label: "Milestone", badgeClass: "bg-purple-100 text-purple-700" },
  document: { label: "Document", badgeClass: "bg-slate-100 text-slate-600" },
  safety: { label: "Safety", badgeClass: "bg-emerald-100 text-emerald-700" },
  invoice: { label: "Invoice", badgeClass: "bg-amber-100 text-amber-700" },
  labor: { label: "Labor", badgeClass: "bg-teal-100 text-teal-700" },
  budget: { label: "Budget", badgeClass: "bg-violet-100 text-violet-700" }
};
function cleanNameStandalone(val) {
  if (val === null || val === void 0)
    return null;
  const str = String(val).trim();
  if (!str)
    return null;
  if (str.toLowerCase() === "unknown")
    return null;
  if (str.includes("@"))
    return null;
  return str;
}
function buildHistoryMeta(action, formattedDateTime, changedByName, fallbackUser, entityCreatedAtFormatted, entityCreatedByName) {
  const actor = cleanNameStandalone(changedByName) || fallbackUser;
  const meta = {};
  if (entityCreatedAtFormatted) {
    meta.createdAt = entityCreatedAtFormatted;
    meta.createdBy = cleanNameStandalone(entityCreatedByName) || actor;
  }
  if (action === "created") {
    if (!meta.createdAt) {
      meta.createdAt = formattedDateTime;
      meta.createdBy = actor;
    }
    return meta;
  }
  meta.updatedAt = formattedDateTime;
  meta.updatedBy = actor;
  if (!meta.createdAt) {
    meta.createdAt = formattedDateTime;
    meta.createdBy = actor;
  }
  return meta;
}
var VendorsHistory = class _VendorsHistory {
  http = inject(HttpClient);
  vendorApiBase = `${environment.serverUrl}/api/v1/vendors`;
  vendorService = inject(VendorsServices);
  invoiceService = inject(VendorInvoiceService);
  auditService = inject(VendorAuditService);
  laborService = inject(VendorsLaborServices);
  projectService = inject(ProjectService);
  historyService = inject(VendorsHistoryServices);
  vendors = [];
  exporting = false;
  records = {};
  selectedVendorIds = /* @__PURE__ */ new Set();
  vendorDropdownOpen = false;
  dropdownSearch = "";
  activeCategory = "all";
  searchQuery = "";
  pageSize = 20;
  currentPage = 1;
  categoryTabs = [
    { key: "all", label: "All" },
    { key: "vendor", label: "Vendors" },
    { key: "project", label: "Project" },
    { key: "task", label: "Task" },
    { key: "milestone", label: "Milestone" },
    { key: "document", label: "Document" },
    { key: "safety", label: "Safety" },
    { key: "invoice", label: "Invoices" },
    { key: "labor", label: "Labor" }
  ];
  cleanName(val) {
    if (val === null || val === void 0)
      return null;
    const str = String(val).trim();
    if (!str)
      return null;
    if (str.toLowerCase() === "unknown")
      return null;
    if (str.includes("@"))
      return null;
    return str;
  }
  get currentUserDisplayName() {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const user = JSON.parse(raw);
        return `${user?.firstname} ${user?.lastname}` || user?.username || "Unknown";
      }
    } catch {
    }
    return "Unknown";
  }
  getCategoryBadgeClass(cat) {
    return CATEGORY_META[cat]?.badgeClass ?? "bg-slate-100 text-slate-600";
  }
  getCategoryLabel(cat) {
    return CATEGORY_META[cat]?.label ?? cat;
  }
  ngOnInit() {
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
      this.selectedVendorIds = new Set(v.map((vendor) => vendor.id));
      v.forEach((vendor) => this.ensureVendorLoaded(vendor));
    });
    if (this.vendorService.getVendors().length === 0) {
      this.vendorService.loadVendors();
    } else {
      const existing = this.vendorService.getVendors();
      this.vendors = existing;
      this.selectedVendorIds = new Set(existing.map((v) => v.id));
      existing.forEach((v) => this.ensureVendorLoaded(v));
    }
  }
  ensureVendorLoaded(vendor) {
    if (!this.records[vendor.id]?.loaded && !this.records[vendor.id]?.loading) {
      this.loadVendorRecord(vendor);
    }
  }
  onDocumentClick(event) {
    const target = event.target;
    if (this.vendorDropdownOpen && !target.closest('[data-dropdown="vendor"]')) {
      this.vendorDropdownOpen = false;
    }
  }
  get vendorDropdownLabel() {
    if (this.selectedVendorIds.size === 0 || this.isAllSelected)
      return "All Vendors";
    if (this.selectedVendorIds.size === 1) {
      const id = [...this.selectedVendorIds][0];
      return this.vendors.find((v) => v.id === id)?.name ?? "1 Vendor";
    }
    return `${this.selectedVendorIds.size} Vendors`;
  }
  get isAllSelected() {
    return this.vendors.length > 0 && this.selectedVendorIds.size === this.vendors.length;
  }
  get isPartiallySelected() {
    return this.selectedVendorIds.size > 0 && !this.isAllSelected;
  }
  get isSingleVendorSelected() {
    return this.selectedVendorIds.size === 1;
  }
  get selectedVendorIdsArray() {
    return [...this.selectedVendorIds];
  }
  get dropdownFilteredVendors() {
    if (!this.dropdownSearch.trim())
      return this.vendors;
    const term = this.dropdownSearch.trim().toLowerCase();
    return this.vendors.filter((v) => v.name.toLowerCase().includes(term) || v.email.toLowerCase().includes(term) || v.skill.some((s) => s.toLowerCase().includes(term)));
  }
  toggleVendorDropdown() {
    this.vendorDropdownOpen = !this.vendorDropdownOpen;
    if (this.vendorDropdownOpen)
      this.dropdownSearch = "";
  }
  toggleSelectAll() {
    if (this.isAllSelected) {
      this.selectedVendorIds = /* @__PURE__ */ new Set();
    } else {
      this.selectedVendorIds = new Set(this.vendors.map((v) => v.id));
      this.vendors.forEach((v) => this.ensureVendorLoaded(v));
    }
    this._flatCache = null;
    this.currentPage = 1;
  }
  toggleVendorSelection(vendor) {
    const newSet = new Set(this.selectedVendorIds);
    if (newSet.has(vendor.id)) {
      newSet.delete(vendor.id);
    } else {
      newSet.add(vendor.id);
      this.ensureVendorLoaded(vendor);
    }
    this.selectedVendorIds = newSet;
    this._flatCache = null;
    this.currentPage = 1;
  }
  removeVendorSelection(id) {
    const newSet = new Set(this.selectedVendorIds);
    newSet.delete(id);
    this.selectedVendorIds = newSet;
    this._flatCache = null;
    this.currentPage = 1;
  }
  clearAllSelections() {
    this.selectedVendorIds = /* @__PURE__ */ new Set();
    this._flatCache = null;
    this.currentPage = 1;
  }
  getVendorNameById(id) {
    return this.vendors.find((v) => v.id === id)?.name ?? id;
  }
  setActiveCategory(key) {
    this.activeCategory = key;
    this.currentPage = 1;
  }
  onSearchChange() {
    this._flatCache = null;
    this.currentPage = 1;
  }
  getCategoryCount(key) {
    const matched = key === "all" ? this.timelineEvents : this.timelineEvents.filter((ev) => ev.categories.includes(key));
    const dateMap = /* @__PURE__ */ new Map();
    matched.forEach((ev) => {
      const dk = this.dateKey(ev.date);
      if (!dateMap.has(dk))
        dateMap.set(dk, []);
      dateMap.get(dk).push(ev);
    });
    let total = 0;
    dateMap.forEach((evs) => {
      const fakeGroup = { events: evs };
      total += this.countEventsInDateGroup(fakeGroup);
    });
    return total;
  }
  get activeCount() {
    return this.vendors.filter((v) => v.status.toLowerCase() === "active").length;
  }
  get pendingCount() {
    return this.vendors.filter((v) => v.status.toLowerCase() === "pending").length;
  }
  get inactiveCount() {
    return this.vendors.filter((v) => v.status.toLowerCase() === "inactive").length;
  }
  get displayVendors() {
    return this.vendors.filter((v) => this.selectedVendorIds.has(v.id));
  }
  get isTimelineLoading() {
    return this.displayVendors.some((v) => !this.records[v.id] || this.records[v.id].loading);
  }
  buildLaborDescription(vendorName, skill, count, dailyRate, status) {
    const dailyCost = dailyRate * count;
    const statusCap = status ? status.charAt(0).toUpperCase() + status.slice(1) : "Active";
    const noun = count === 1 ? "laborer" : "laborers";
    const verb = count === 1 ? "was" : "were";
    return `${count} ${skill} ${noun} ${verb} added to Vendor "${vendorName}" at a daily rate of ${this.formatAmount(dailyRate)} per laborer (total daily cost ${this.formatAmount(dailyCost)}). Current status: ${statusCap}.`;
  }
  _timelineCache = null;
  get timelineEvents() {
    const selectedKey = [...this.selectedVendorIds].sort().join(",");
    const loadedKey = this.displayVendors.filter((v) => this.records[v.id]?.loaded).map((v) => v.id).join(",");
    const key = `${selectedKey}|${loadedKey}`;
    if (this._timelineCache?.key === key)
      return this._timelineCache.events;
    const events = [];
    this.displayVendors.forEach((v) => {
      const rec = this.records[v.id];
      if (rec?.loaded)
        events.push(...this.buildVendorEvents(rec));
    });
    const sorted = events.sort((a, b) => b.date.getTime() - a.date.getTime());
    this._timelineCache = { key, events: sorted };
    return sorted;
  }
  get filteredTimelineEvents() {
    let events = this.activeCategory === "all" ? this.timelineEvents : this.timelineEvents.filter((ev) => ev.categories.includes(this.activeCategory));
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      events = events.filter((ev) => ev.description?.toLowerCase().includes(q) || ev.vendorName?.toLowerCase().includes(q) || ev.createdBy?.toLowerCase().includes(q) || ev.updatedBy?.toLowerCase().includes(q) || ev.subDetails?.some((d) => d.value?.toLowerCase().includes(q)));
    }
    return events;
  }
  get totalFilteredEvents() {
    return this.filteredTimelineEvents.length;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.totalFilteredEvents / this.pageSize));
  }
  get paginatedTimelineEvents() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTimelineEvents.slice(start, start + this.pageSize);
  }
  get pageStartIndex() {
    return this.totalFilteredEvents === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }
  get pageEndIndex() {
    return Math.min(this.currentPage * this.pageSize, this.totalFilteredEvents);
  }
  get pageNumbers() {
    const total = this.totalPages;
    const current = this.currentPage;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const pages = [];
    for (let i = start; i <= end; i++)
      pages.push(i);
    return pages;
  }
  goToPage(page) {
    if (page < 1 || page > this.totalPages)
      return;
    this.currentPage = page;
  }
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
  _flatCache = null;
  get flatDateGroups() {
    const selectedKey = [...this.selectedVendorIds].sort().join(",");
    const loadedKey = this.displayVendors.filter((v) => this.records[v.id]?.loaded).map((v) => v.id).join(",");
    const cacheKey = `${selectedKey}|${loadedKey}|${this.activeCategory}|${this.searchQuery}|${this.currentPage}`;
    if (this._flatCache?.key === cacheKey)
      return this._flatCache.groups;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    const events = this.paginatedTimelineEvents;
    const dateMap = /* @__PURE__ */ new Map();
    events.forEach((ev) => {
      const dk = this.dateKey(ev.date);
      if (!dateMap.has(dk)) {
        dateMap.set(dk, { date: ev.date, events: [] });
      }
      dateMap.get(dk).events.push(ev);
    });
    const groups = Array.from(dateMap.entries()).map(([dk, val]) => ({
      dateKey: dk,
      date: val.date,
      events: val.events.sort((a, b) => b.date.getTime() - a.date.getTime())
    })).sort((a, b) => b.date.getTime() - a.date.getTime());
    this._flatCache = { key: cacheKey, cat: this.activeCategory, groups };
    return groups;
  }
  countEventsInDateGroup(dGroup) {
    let count = dGroup.events.length;
    dGroup.events.forEach((ev) => {
      if (ev.budgetMeta && ev.id.includes("-onboard"))
        count++;
    });
    return count;
  }
  dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  parseDate(rawDate) {
    if (!rawDate)
      return null;
    const d = new Date(rawDate);
    return isNaN(d.getTime()) ? null : d;
  }
  addEvent(events, vendor, opts) {
    const hasCreated = !!(opts.meta?.createdAt || opts.meta?.createdBy);
    const hasUpdated = !!(opts.meta?.updatedAt || opts.meta?.updatedBy);
    if (hasCreated && hasUpdated) {
      const createdDate = this.parseDate(opts.createdRawDate ?? opts.rawDate);
      if (createdDate) {
        events.push({
          id: `${vendor.id}-${opts.idSuffix}-created`,
          vendorId: vendor.id,
          vendorName: vendor.name,
          date: createdDate,
          icon: opts.icon,
          iconBg: opts.iconBg,
          iconColor: opts.iconColor,
          description: opts.description,
          categories: opts.categories,
          primaryCategory: opts.categories[0],
          subDetails: opts.subDetails,
          viewAction: opts.viewAction,
          budgetMeta: opts.budgetMeta,
          createdAt: opts.meta?.createdAt,
          createdBy: opts.meta?.createdBy
        });
      }
      const updatedDate = this.parseDate(opts.updatedRawDate ?? opts.rawDate);
      if (updatedDate) {
        events.push({
          id: `${vendor.id}-${opts.idSuffix}-updated`,
          vendorId: vendor.id,
          vendorName: vendor.name,
          date: updatedDate,
          icon: opts.icon,
          iconBg: opts.iconBg,
          iconColor: opts.iconColor,
          description: opts.description,
          categories: opts.categories,
          primaryCategory: opts.categories[0],
          subDetails: opts.subDetails,
          viewAction: opts.viewAction,
          updatedAt: opts.meta?.updatedAt,
          updatedBy: opts.meta?.updatedBy
        });
      }
      return;
    }
    const d = this.parseDate(opts.rawDate);
    if (!d)
      return;
    events.push({
      id: `${vendor.id}-${opts.idSuffix}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      date: d,
      icon: opts.icon,
      iconBg: opts.iconBg,
      iconColor: opts.iconColor,
      description: opts.description,
      categories: opts.categories,
      primaryCategory: opts.categories[0],
      subDetails: opts.subDetails,
      viewAction: opts.viewAction,
      budgetMeta: opts.budgetMeta,
      createdAt: opts.meta?.createdAt,
      createdBy: opts.meta?.createdBy,
      updatedAt: opts.meta?.updatedAt,
      updatedBy: opts.meta?.updatedBy
    });
  }
  buildMeta(createdAtRaw, createdByRaw, updatedAtRaw, updatedByRaw) {
    const fallbackUser = this.currentUserDisplayName;
    const meta = {
      createdAt: createdAtRaw ? this.formatDateTime(createdAtRaw) : void 0,
      createdBy: createdAtRaw ? this.cleanName(createdByRaw) || this.cleanName(updatedByRaw) || fallbackUser : void 0
    };
    if (updatedAtRaw) {
      const updatedMs = new Date(updatedAtRaw).getTime();
      if (!isNaN(updatedMs)) {
        meta.updatedAt = this.formatDateTime(updatedAtRaw);
        meta.updatedBy = this.cleanName(updatedByRaw) || fallbackUser;
      }
    }
    return meta;
  }
  resolveDate(obj, ...fields) {
    for (const f of fields) {
      const val = obj?.[f];
      if (val) {
        const d = new Date(val);
        if (!isNaN(d.getTime()))
          return val;
      }
    }
    return null;
  }
  dateObjToStmt(d) {
    if (!d || isNaN(d.getTime()))
      return "\u2014";
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = d.toLocaleString("en-US", { month: "short" });
    return `${dd}-${mmm}-${d.getFullYear()}`;
  }
  extractAuditArray(raw) {
    if (!raw)
      return [];
    if (Array.isArray(raw))
      return raw;
    if (Array.isArray(raw.data))
      return raw.data;
    if (Array.isArray(raw.audits))
      return raw.audits;
    if (Array.isArray(raw.data?.audits))
      return raw.data.audits;
    return [];
  }
  formatDateTime(dateInput) {
    if (!dateInput)
      return "\u2014";
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime()))
      return "\u2014";
    return `${this.formatDate(d)}, ${this.formatTime(d)}`;
  }
  stmtDate(dateInput) {
    if (!dateInput)
      return "\u2014";
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime()))
      return "\u2014";
    return this.dateObjToStmt(d);
  }
  buildBudgetMeta(allocated, totalBilled, totalPaid) {
    const invoiced = totalBilled;
    const utilizationPercent = allocated > 0 ? Math.min(Math.round(invoiced / allocated * 100), 999) : 0;
    const exceeded = invoiced > allocated;
    return {
      allocated,
      invoiced,
      paid: totalPaid,
      remaining: Math.max(0, allocated - invoiced),
      utilizationPercent,
      exceeded,
      exceededBy: exceeded ? invoiced - allocated : 0
    };
  }
  buildVendorEvents(rec) {
    const v = rec.vendor;
    const events = [];
    const allocated = Number(v.budget_allocation) || 0;
    const projectName = rec.projectData?.name || null;
    const updatedAt = v.updated_at;
    const updatedBy = v.updated_by_name || null;
    const creationInfoMap = /* @__PURE__ */ new Map();
    rec.historyEvents.filter((h) => h.action === "created").forEach((h) => {
      const key = `${h.entity_type}-${h.entity_id ?? "vendor"}`;
      const cleanedName = this.cleanName(h.changed_by_name);
      if (!creationInfoMap.has(key) && cleanedName) {
        creationInfoMap.set(key, { name: cleanedName, at: h.createdAt });
      }
    });
    const getCreator = (entityType, entityId) => {
      const key = `${entityType}-${entityId ?? "vendor"}`;
      return creationInfoMap.get(key) || null;
    };
    const vendorCreationInfo = getCreator("vendor", null);
    const createdBy = this.cleanName(vendorCreationInfo?.name) || this.cleanName(v.created_by_name) || this.cleanName(updatedBy) || this.currentUserDisplayName;
    this.addEvent(events, v, {
      rawDate: v.created_at,
      createdRawDate: vendorCreationInfo?.at || v.created_at,
      updatedRawDate: updatedAt,
      icon: "person_add",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      description: `Vendor "${v.name}" was onboarded.`,
      idSuffix: "onboard",
      categories: ["vendor"],
      subDetails: [
        { label: "Vendor", value: v.name, valueColor: "text-pink-600" },
        { label: "Added On", value: this.stmtDate(v.created_at), valueColor: "text-slate-500" },
        { label: "Status", value: v.status, valueColor: v.status.toLowerCase() === "active" ? "text-green-600" : "text-amber-600" },
        { label: "SPOC", value: `${v.spoc?.name || "\u2014"} \xB7 ${v.spoc?.phone || "\u2014"}`, valueColor: "text-slate-700" },
        { label: "Email", value: v.email || "\u2014", valueColor: "text-slate-600" },
        { label: "Phone", value: v.phone || "\u2014", valueColor: "text-slate-600" },
        { label: "GST", value: v.kyc?.gst || "\u2014", valueColor: "text-slate-500" },
        { label: "PAN", value: v.kyc?.pan || "\u2014", valueColor: "text-slate-500" },
        { label: "Budget", value: allocated > 0 ? this.formatAmount(allocated) : "Not allocated", valueColor: "text-violet-600" },
        { label: "Compliance", value: `${v.compliance_score}%`, valueColor: v.compliance_score >= 90 ? "text-green-600" : v.compliance_score >= 70 ? "text-amber-600" : "text-red-500" },
        { label: "Skills", value: v.skill?.length ? v.skill.join(", ") : "Not specified", valueColor: "text-slate-600" },
        ...projectName ? [{ label: "Project", value: projectName, valueColor: "text-indigo-600" }] : []
      ],
      budgetMeta: allocated > 0 ? this.buildBudgetMeta(allocated, rec.totalBilled, rec.totalPaid) : void 0,
      meta: this.buildMeta(vendorCreationInfo?.at || v.created_at, createdBy, updatedAt, updatedBy)
    });
    if (projectName) {
      this.addEvent(events, v, {
        rawDate: v.created_at,
        createdRawDate: vendorCreationInfo?.at || v.created_at,
        updatedRawDate: updatedAt,
        icon: "folder_special",
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        description: `Vendor "${v.name}" was linked to Project "${projectName}". Current status: ${v.status}.`,
        idSuffix: "project-link",
        categories: ["project"],
        subDetails: [
          { label: "Vendor", value: v.name, valueColor: "text-pink-600" },
          { label: "Project", value: projectName, valueColor: "text-indigo-600" },
          { label: "Status", value: v.status, valueColor: v.status.toLowerCase() === "active" ? "text-green-600" : "text-amber-600" },
          { label: "Since", value: this.stmtDate(v.created_at), valueColor: "text-slate-500" }
        ],
        meta: this.buildMeta(vendorCreationInfo?.at || v.created_at, createdBy, updatedAt, updatedBy)
      });
    }
    if (allocated > 0 && rec.totalBilled > allocated) {
      const exceededBy = rec.totalBilled - allocated;
      const latestInvDate = this.getLatestInvoiceDate(rec);
      const utilPct = Math.round(rec.totalBilled / allocated * 100);
      this.addEvent(events, v, {
        rawDate: latestInvDate || v.created_at,
        icon: "warning",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        description: `Budget for Vendor "${v.name}" was exceeded by ${this.formatAmount(exceededBy)} (${utilPct}% utilized).`,
        idSuffix: "budget-exceeded",
        categories: ["budget"],
        subDetails: [
          { label: "Allocated", value: this.formatAmount(allocated), valueColor: "text-violet-600" },
          { label: "Invoiced", value: this.formatAmount(rec.totalBilled), valueColor: "text-red-500" },
          { label: "Exceeded By", value: this.formatAmount(exceededBy), valueColor: "text-red-600" }
        ],
        meta: { createdAt: this.formatDateTime(latestInvDate || v.created_at), createdBy }
      });
    }
    const invoiceHistoryMap = /* @__PURE__ */ new Map();
    rec.historyEvents.filter((h) => h.entity_type === "invoice" && h.entity_id != null).forEach((h) => {
      const key = String(h.entity_id);
      const existing = invoiceHistoryMap.get(key);
      if (!existing || new Date(h.createdAt) >= new Date(existing.createdAt)) {
        invoiceHistoryMap.set(key, h);
      }
    });
    const invoiceIdsWithHistory = new Set(invoiceHistoryMap.keys());
    const laborHistoryMap = /* @__PURE__ */ new Map();
    rec.historyEvents.filter((h) => h.entity_type === "labor" && h.entity_id != null).forEach((h) => {
      const key = String(h.entity_id);
      const existing = laborHistoryMap.get(key);
      if (!existing || new Date(h.createdAt) >= new Date(existing.createdAt)) {
        laborHistoryMap.set(key, h);
      }
    });
    const laborIdsWithHistory = new Set(laborHistoryMap.keys());
    rec.invoices.forEach((inv, idx) => {
      if (invoiceIdsWithHistory.has(String(inv.id)))
        return;
      const statusColorMap = {
        "Paid": "text-green-600",
        "Unpaid": "text-amber-600",
        "Pending": "text-amber-600",
        "Partially Paid": "text-blue-600",
        "Cancelled": "text-red-500"
      };
      const statusColor = statusColorMap[inv.status] ?? "text-slate-600";
      let icon = "receipt_long", iconBg = "bg-amber-100", iconColor = "text-amber-600";
      if (inv.status === "Paid") {
        icon = "payments";
        iconBg = "bg-green-100";
        iconColor = "text-green-600";
      } else if (inv.status === "Cancelled") {
        icon = "cancel";
        iconBg = "bg-red-100";
        iconColor = "text-red-600";
      }
      const subDetails = [
        { label: "Invoice", value: inv.invoice_number, valueColor: "text-slate-700" },
        { label: "Amount", value: this.formatAmount(inv.grand_total), valueColor: "text-amber-700" },
        { label: "Paid", value: this.formatAmount(inv.paid_amount), valueColor: "text-green-600" },
        { label: "Status", value: inv.status, valueColor: statusColor }
      ];
      const remainingAmt = this.remainingAmount(inv);
      if (remainingAmt > 0 && inv.status !== "Cancelled") {
        subDetails.push({ label: "Remaining", value: this.formatAmount(remainingAmt), valueColor: "text-red-500" });
      }
      const invCreationInfo = getCreator("invoice", inv.id);
      const invCreatedAt = invCreationInfo?.at || inv.created_at || inv.createdAt || inv.invoice_date;
      const invUpdatedAt = inv.updated_at || inv.updatedAt;
      const invUpdatedBy = inv.updated_by_name || inv.updatedByName;
      const invCreatedBy = this.cleanName(invCreationInfo?.name) || this.cleanName(inv.created_by_name) || this.cleanName(inv.createdByName) || this.cleanName(invUpdatedBy) || this.currentUserDisplayName;
      this.addEvent(events, v, {
        rawDate: inv.invoice_date || v.created_at,
        createdRawDate: invCreatedAt,
        updatedRawDate: invUpdatedAt,
        icon,
        iconBg,
        iconColor,
        description: `Invoice ${inv.invoice_number} (${inv.status}) \u2014 ${this.formatAmount(inv.grand_total)} for Vendor "${v.name}".`,
        idSuffix: `inv-synthetic-${inv.id ?? idx}`,
        categories: ["invoice"],
        subDetails,
        viewAction: () => this.viewInvoice(rec, inv),
        meta: this.buildMeta(invCreatedAt, invCreatedBy, invUpdatedAt, invUpdatedBy)
      });
    });
    rec.laborWorkers.forEach((w, idx) => {
      if (laborIdsWithHistory.has(String(w.id)))
        return;
      const skillLabel = String(w.skill || "").replace(/_/g, " ");
      const laborCount = w.labor_count || 0;
      const dailyRate = Number(w.daily_rate) || 0;
      const dailyCost = dailyRate * laborCount;
      const statusRaw = String(w.status || w.statusLabel || "active");
      const statusLabel = statusRaw.replace(/_/g, " ");
      const statusColor = statusRaw.toLowerCase().includes("active") ? "text-green-600" : statusRaw.toLowerCase().includes("inactive") ? "text-red-500" : "text-amber-600";
      const subDetails = [
        { label: "Skill", value: skillLabel, valueColor: "text-teal-600" },
        { label: "Count", value: String(laborCount), valueColor: "text-slate-700" },
        { label: "Daily Rate", value: this.formatAmount(dailyRate), valueColor: "text-teal-700" },
        { label: "Daily Cost", value: this.formatAmount(dailyCost), valueColor: "text-teal-800" },
        { label: "Status", value: statusLabel, valueColor: statusColor }
      ];
      if (w.assign_worker) {
        subDetails.push({ label: "Assigned To", value: String(w.assign_worker), valueColor: "text-slate-600" });
      }
      const laborCreationInfo = getCreator("labor", w.id);
      const lCreatedAt = laborCreationInfo?.at || w.created_at || w.createdAt || v.created_at;
      const lUpdatedAt = w.updated_at || w.updatedAt;
      const lUpdatedBy = w.updated_by_name || w.updatedByName;
      const lCreatedBy = laborCreationInfo?.name || w.created_by_name || w.createdByName || lUpdatedBy || this.currentUserDisplayName;
      this.addEvent(events, v, {
        rawDate: lCreatedAt,
        createdRawDate: lCreatedAt,
        updatedRawDate: lUpdatedAt,
        icon: "engineering",
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
        description: this.buildLaborDescription(v.name, skillLabel, laborCount, dailyRate, statusLabel),
        idSuffix: `labor-synthetic-${w.id ?? idx}`,
        categories: ["labor"],
        subDetails,
        meta: this.buildMeta(lCreatedAt, lCreatedBy, lUpdatedAt, lUpdatedBy)
      });
    });
    const vendorHistoryMap = /* @__PURE__ */ new Map();
    rec.historyEvents.filter((h) => h.entity_type === "vendor").forEach((h) => {
      const minuteKey = new Date(h.createdAt).toISOString().slice(0, 16);
      const valuesKey = JSON.stringify(h.new_values || {});
      const key = `${h.action}|${valuesKey}|${minuteKey}`;
      const existing = vendorHistoryMap.get(key);
      if (!existing) {
        vendorHistoryMap.set(key, h);
      }
    });
    const deduplicatedHistoryEvents = [
      ...rec.historyEvents.filter((h) => h.entity_type !== "labor" && h.entity_type !== "invoice" && h.entity_type !== "vendor"),
      ...Array.from(vendorHistoryMap.values()),
      ...Array.from(invoiceHistoryMap.values()),
      ...Array.from(laborHistoryMap.values())
    ];
    deduplicatedHistoryEvents.forEach((h) => {
      const isInvoice = h.entity_type === "invoice";
      const isLabor = h.entity_type === "labor";
      const isAudit = h.entity_type === "audit";
      const isVendor = h.entity_type === "vendor";
      let icon = "history", iconBg = "bg-slate-100", iconColor = "text-slate-600";
      let categories = ["vendor"];
      let viewAction;
      const subDetails = [];
      let eventDescription = h.description;
      const hFormatted = this.formatDateTime(h.createdAt);
      const hDateObj = this.parseDate(h.createdAt);
      let entityCreatedAtRaw = null;
      let entityCreatedByVal = null;
      if (isVendor) {
        categories = ["vendor"];
        icon = h.action === "deleted" ? "person_remove" : "edit";
        iconBg = "bg-pink-100";
        iconColor = "text-pink-600";
        entityCreatedAtRaw = vendorCreationInfo?.at || v.created_at;
        entityCreatedByVal = createdBy;
        const actionLabel = h.action === "deleted" ? "removed" : h.action === "updated" ? "updated" : h.action === "status_changed" ? "updated" : h.action === "created" ? "created" : h.action.replace(/_/g, " ");
        const oldName = h.old_values?.name;
        const newName = h.new_values?.name;
        const nameChanged = oldName && newName && oldName !== newName;
        const oldStatus = h.old_values?.status;
        const newStatus = h.new_values?.status || h.meta?.status;
        const statusChanged = oldStatus && newStatus && oldStatus !== newStatus;
        const newBudget = h.new_values?.budget_allocation || h.meta?.budget_allocation;
        const newEmail = h.new_values?.email || h.meta?.email;
        const newGst = h.new_values?.kyc?.gst || h.meta?.gst;
        const newPan = h.new_values?.kyc?.pan || h.meta?.pan;
        const newAddress = h.new_values?.address || h.meta?.address;
        const mainLine = h.action === "status_changed" ? `Status of Vendor "${v.name}" was updated.` : `Vendor "${nameChanged ? oldName : v.name}" was ${actionLabel}.`;
        const extraLines = [];
        if (nameChanged)
          extraLines.push(`Vendor name was changed from "${oldName}" to "${newName}".`);
        if (statusChanged)
          extraLines.push(`Status of Vendor "${v.name}" was changed from "${oldStatus}" to "${newStatus}".`);
        if (newBudget != null)
          extraLines.push(`Budget for Vendor "${v.name}" was updated to ${this.formatAmount(newBudget)}.`);
        if (newEmail)
          extraLines.push(`Email for Vendor "${v.name}" was updated to ${newEmail}.`);
        if (newGst)
          extraLines.push(`GST for Vendor "${v.name}" was updated to ${newGst}.`);
        if (newPan)
          extraLines.push(`PAN for Vendor "${v.name}" was updated to ${newPan}.`);
        eventDescription = extraLines.length > 0 ? extraLines.join("\n") : mainLine;
        subDetails.push({ label: "Action", value: actionLabel, valueColor: "text-pink-600" });
        subDetails.push({ label: "Date", value: this.dateObjToStmt(hDateObj), valueColor: "text-slate-500" });
        if (h.changed_by_name)
          subDetails.push({ label: "By", value: h.changed_by_name, valueColor: "text-slate-500" });
        if (nameChanged) {
          subDetails.push({ label: "Old Name", value: oldName, valueColor: "text-red-400" });
          subDetails.push({ label: "New Name", value: newName, valueColor: "text-green-600" });
        }
        if (statusChanged) {
          subDetails.push({ label: "Old Status", value: oldStatus, valueColor: "text-red-400" });
          subDetails.push({ label: "New Status", value: newStatus, valueColor: "text-green-600" });
        }
        if (newBudget != null)
          subDetails.push({ label: "Budget", value: this.formatAmount(newBudget), valueColor: "text-violet-600" });
        if (newEmail)
          subDetails.push({ label: "Email", value: newEmail, valueColor: "text-slate-600" });
        if (newGst)
          subDetails.push({ label: "GST", value: newGst, valueColor: "text-slate-500" });
        if (newPan)
          subDetails.push({ label: "PAN", value: newPan, valueColor: "text-slate-500" });
        if (newAddress)
          subDetails.push({
            label: "Address",
            value: typeof newAddress === "string" ? newAddress : [newAddress?.street, newAddress?.city, newAddress?.state, newAddress?.pincode].filter(Boolean).join(", "),
            valueColor: "text-slate-600"
          });
      }
      if (isInvoice) {
        categories = ["invoice"];
        if (h.action === "payment_added") {
          icon = "payments";
          iconBg = "bg-green-100";
          iconColor = "text-green-600";
          if (h.meta?.amount)
            subDetails.push({ label: "Amount", value: this.formatAmount(h.meta.amount), valueColor: "text-green-700" });
          if (h.meta?.mode)
            subDetails.push({ label: "Mode", value: h.meta.mode, valueColor: "text-slate-600" });
        } else if (h.action === "deleted") {
          icon = "cancel";
          iconBg = "bg-red-100";
          iconColor = "text-red-600";
        } else if (h.action === "created") {
          icon = "receipt_long";
          iconBg = "bg-amber-100";
          iconColor = "text-amber-600";
        } else {
          icon = "receipt_long";
          iconBg = "bg-blue-100";
          iconColor = "text-blue-600";
        }
        if (h.meta?.invoice_number)
          subDetails.push({ label: "Invoice", value: h.meta.invoice_number, valueColor: "text-slate-700" });
        if (h.meta?.grand_total)
          subDetails.push({ label: "Amount", value: this.formatAmount(h.meta.grand_total), valueColor: "text-amber-700" });
        const matchedInv = rec.invoices.find((i) => String(i.id) === String(h.entity_id));
        if (matchedInv)
          viewAction = () => this.viewInvoice(rec, matchedInv);
        if (matchedInv) {
          const invCreationInfo = getCreator("invoice", matchedInv.id);
          const matchedInvUpdatedBy = matchedInv.updated_by_name || matchedInv.updatedByName;
          entityCreatedAtRaw = invCreationInfo?.at || matchedInv.created_at || matchedInv.createdAt || matchedInv.invoice_date;
          entityCreatedByVal = invCreationInfo?.name || matchedInv.created_by_name || matchedInv.createdByName || matchedInvUpdatedBy || this.currentUserDisplayName;
        }
        const invNumberVal = h.meta?.invoice_number ?? matchedInv?.invoice_number;
        const invAmountVal = h.meta?.grand_total ?? matchedInv?.grand_total;
        if (invNumberVal != null) {
          const amountStr = invAmountVal != null ? ` (${this.formatAmount(invAmountVal)})` : "";
          const actionWord = h.action === "created" ? "created" : h.action === "deleted" ? "deleted" : h.action === "payment_added" ? "updated with a payment" : h.action === "status_changed" ? "updated" : "updated";
          eventDescription = `Invoice #${invNumberVal}${amountStr} was ${actionWord} for Vendor "${v.name}".`;
          if (h.action === "payment_added" && h.meta?.amount) {
            eventDescription += ` Payment of ${this.formatAmount(h.meta.amount)} was recorded${h.meta?.mode ? ` via ${h.meta.mode}` : ""}.`;
          }
        }
      }
      if (isLabor) {
        categories = ["labor"];
        icon = h.action === "deleted" ? "person_remove" : "engineering";
        iconBg = "bg-teal-100";
        iconColor = "text-teal-600";
        if (h.meta?.skill)
          subDetails.push({ label: "Skill", value: String(h.meta.skill).replace(/_/g, " "), valueColor: "text-teal-600" });
        if (h.meta?.labor_count != null)
          subDetails.push({ label: "Count", value: String(h.meta.labor_count), valueColor: "text-slate-700" });
        if (h.meta?.daily_rate != null)
          subDetails.push({ label: "Daily Rate", value: this.formatAmount(h.meta.daily_rate), valueColor: "text-teal-700" });
        const laborCount = Number(h.meta?.labor_count) || 0;
        const dailyRate = Number(h.meta?.daily_rate) || 0;
        if (laborCount > 0 && dailyRate > 0)
          subDetails.push({ label: "Daily Cost", value: this.formatAmount(laborCount * dailyRate), valueColor: "text-teal-800" });
        if (h.meta?.status)
          subDetails.push({ label: "Status", value: String(h.meta.status).replace(/_/g, " "), valueColor: "text-slate-600" });
        if (h.meta?.assign_worker)
          subDetails.push({ label: "Assigned To", value: h.meta.assign_worker, valueColor: "text-slate-600" });
        const matchedLabor = rec.laborWorkers.find((w) => String(w.id) === String(h.entity_id));
        if (matchedLabor) {
          const laborCreationInfo = getCreator("labor", matchedLabor.id);
          const matchedLaborUpdatedBy = matchedLabor.updated_by_name || matchedLabor.updatedByName;
          entityCreatedAtRaw = laborCreationInfo?.at || matchedLabor.created_at || matchedLabor.createdAt;
          entityCreatedByVal = laborCreationInfo?.name || matchedLabor.created_by_name || matchedLabor.createdByName || matchedLaborUpdatedBy || this.currentUserDisplayName;
        }
        const skillVal = h.meta?.skill ?? matchedLabor?.skill;
        const countVal = h.meta?.labor_count ?? matchedLabor?.labor_count;
        const rateVal = h.meta?.daily_rate ?? matchedLabor?.daily_rate;
        const statusVal = h.meta?.status ?? matchedLabor?.status ?? matchedLabor?.statusLabel;
        if (skillVal != null && countVal != null && rateVal != null) {
          const skill = String(skillVal).replace(/_/g, " ");
          const count = Number(countVal) || 0;
          const rate = Number(rateVal) || 0;
          const status = statusVal ? String(statusVal).replace(/_/g, " ") : "active";
          eventDescription = this.buildLaborDescription(v.name, skill, count, rate, status);
          if (!subDetails.find((d) => d.label === "Daily Rate"))
            subDetails.push({ label: "Daily Rate", value: this.formatAmount(rate), valueColor: "text-teal-700" });
          if (!subDetails.find((d) => d.label === "Daily Cost"))
            subDetails.push({ label: "Daily Cost", value: this.formatAmount(rate * count), valueColor: "text-teal-800" });
          if (!subDetails.find((d) => d.label === "Status"))
            subDetails.push({ label: "Status", value: status, valueColor: "text-slate-600" });
        }
      }
      if (isAudit) {
        categories = ["safety"];
        icon = h.action === "deleted" ? "cancel" : "fact_check";
        iconBg = "bg-emerald-100";
        iconColor = "text-emerald-600";
        const matchedAudit = rec.audits.find((a) => String(a.id) === String(h.entity_id));
        if (matchedAudit) {
          const auditCreationInfo = getCreator("audit", matchedAudit.id);
          const matchedAuditUpdatedBy = matchedAudit.updated_by_name || matchedAudit.updatedByName;
          entityCreatedAtRaw = auditCreationInfo?.at || matchedAudit.created_at || matchedAudit.createdAt || matchedAudit.audit_date || matchedAudit.auditDate;
          entityCreatedByVal = auditCreationInfo?.name || matchedAudit.created_by_name || matchedAudit.createdByName || matchedAuditUpdatedBy || this.currentUserDisplayName;
        }
        const scoreVal = h.meta?.composite_score ?? matchedAudit?.composite_score ?? matchedAudit?.compositeScore;
        const qualityVal = h.meta?.quality ?? matchedAudit?.quality;
        const timelinessVal = h.meta?.timeliness ?? matchedAudit?.timeliness;
        const safetyVal = h.meta?.safety ?? matchedAudit?.safety;
        const observationsVal = h.meta?.observations ?? matchedAudit?.observations;
        const actionWord = h.action === "created" ? "conducted" : h.action === "deleted" ? "deleted" : h.action === "updated" ? "updated" : "recorded";
        eventDescription = scoreVal != null ? `Audit for Vendor "${v.name}" was ${actionWord} with a composite score of ${Math.round(Number(scoreVal))}%.` : `Audit for Vendor "${v.name}" was ${actionWord}.`;
        if (qualityVal != null)
          subDetails.push({ label: "Quality", value: `${qualityVal}/10`, valueColor: "text-slate-700" });
        if (timelinessVal != null)
          subDetails.push({ label: "Timeliness", value: `${timelinessVal}/10`, valueColor: "text-slate-700" });
        if (safetyVal != null)
          subDetails.push({ label: "Safety", value: `${safetyVal}/10`, valueColor: "text-slate-700" });
        if (observationsVal)
          subDetails.push({ label: "Observations", value: observationsVal, valueColor: "text-slate-600" });
      }
      const entityCreatedFormatted = entityCreatedAtRaw ? this.formatDateTime(entityCreatedAtRaw) : null;
      const hMeta = buildHistoryMeta(h.action, hFormatted, h.changed_by_name, this.currentUserDisplayName, entityCreatedFormatted, entityCreatedByVal);
      this.addEvent(events, v, {
        rawDate: h.createdAt,
        createdRawDate: entityCreatedAtRaw || h.createdAt,
        updatedRawDate: h.createdAt,
        icon,
        iconBg,
        iconColor,
        description: eventDescription,
        idSuffix: `hist-${h.id}`,
        categories,
        subDetails,
        viewAction,
        meta: hMeta
      });
    });
    rec.tasks.forEach((t) => {
      const taskRawDate = this.resolveDate(t, "updated_at", "updatedAt", "created_at", "createdAt", "due_date", "dueDate", "start_date", "startDate");
      if (!this.parseDate(taskRawDate))
        return;
      const statusHuman = this.humanizeStatus(t.status);
      const tCreatedAt = t.created_at || t.createdAt;
      const tUpdatedAt = t.updated_at || t.updatedAt;
      const tUpdatedBy = t.updated_by_name || t.updatedByName;
      const tCreatedBy = t.created_by_name || t.createdByName || tUpdatedBy || this.currentUserDisplayName;
      this.addEvent(events, v, {
        rawDate: taskRawDate,
        createdRawDate: tCreatedAt,
        updatedRawDate: tUpdatedAt,
        icon: "checklist",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        description: `Task "${t.title}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ""} was marked as "${statusHuman}".`,
        idSuffix: `task-${t.id}`,
        categories: ["task"],
        subDetails: [
          { label: "Task", value: t.title, valueColor: "text-slate-700" },
          { label: "Status", value: statusHuman, valueColor: "text-blue-600" },
          ...projectName ? [{ label: "Project", value: projectName, valueColor: "text-indigo-600" }] : [],
          ...t.due_date || t.dueDate ? [{ label: "Due", value: this.stmtDate(t.due_date || t.dueDate), valueColor: "text-slate-500" }] : []
        ],
        meta: this.buildMeta(tCreatedAt, tCreatedBy, tUpdatedAt, tUpdatedBy)
      });
    });
    rec.milestones.forEach((m) => {
      const mRawDate = this.resolveDate(m, "updated_at", "updatedAt", "end_date", "endDate", "start_date", "startDate", "created_at", "createdAt");
      if (!this.parseDate(mRawDate))
        return;
      const progress = m.milestone_progress ?? m.milestoneProgress ?? m.progress ?? null;
      const mLabel = m.name || m.title || `Milestone #${m.id}`;
      const mCreatedAt = m.created_at || m.createdAt;
      const mUpdatedAt = m.updated_at || m.updatedAt;
      const mUpdatedBy = m.updated_by_name || m.updatedByName || this.currentUserDisplayName;
      const mCreatedBy = m.created_by_name || m.createdByName || mUpdatedBy || this.currentUserDisplayName;
      this.addEvent(events, v, {
        rawDate: mRawDate,
        createdRawDate: mCreatedAt,
        updatedRawDate: mUpdatedAt,
        icon: "flag",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        description: progress != null ? `Milestone "${mLabel}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ""} reached ${progress}% completion.` : `Milestone "${mLabel}" for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ""} was updated to "${this.humanizeStatus(m.status)}".`,
        idSuffix: `milestone-${m.id}`,
        categories: ["milestone"],
        subDetails: [
          { label: "Milestone", value: mLabel, valueColor: "text-purple-600" },
          ...progress != null ? [{ label: "Progress", value: `${progress}%`, valueColor: Number(progress) >= 80 ? "text-green-600" : Number(progress) >= 40 ? "text-amber-600" : "text-red-500" }] : [{ label: "Status", value: this.humanizeStatus(m.status), valueColor: "text-purple-600" }],
          ...projectName ? [{ label: "Project", value: projectName, valueColor: "text-indigo-600" }] : []
        ],
        meta: this.buildMeta(mCreatedAt, mCreatedBy, mUpdatedAt, mUpdatedBy)
      });
      (m.children || []).forEach((c) => {
        const cRawDate = this.resolveDate(c, "updated_at", "updatedAt", "end_date", "endDate", "start_date", "startDate", "created_at", "createdAt");
        if (!this.parseDate(cRawDate))
          return;
        const cLabel = c.name || c.title || `Sub-Milestone #${c.id}`;
        const cCreatedAt = c.created_at || c.createdAt;
        const cUpdatedAt = c.updated_at || c.updatedAt;
        const cUpdatedBy = c.updated_by_name || c.updatedByName || this.currentUserDisplayName;
        const cCreatedBy = c.created_by_name || c.createdByName || cUpdatedBy || this.currentUserDisplayName;
        this.addEvent(events, v, {
          rawDate: cRawDate,
          createdRawDate: cCreatedAt,
          updatedRawDate: cUpdatedAt,
          icon: "subdirectory_arrow_right",
          iconBg: "bg-purple-50",
          iconColor: "text-purple-500",
          description: `Sub-Milestone "${cLabel}" under "${mLabel}" for Vendor "${v.name}" was updated to "${this.humanizeStatus(c.status)}".`,
          idSuffix: `sub-milestone-${c.id}`,
          categories: ["milestone"],
          subDetails: [
            { label: "Sub-Milestone", value: cLabel, valueColor: "text-purple-500" },
            { label: "Parent", value: mLabel, valueColor: "text-purple-600" },
            { label: "Status", value: this.humanizeStatus(c.status), valueColor: "text-slate-600" }
          ],
          meta: this.buildMeta(cCreatedAt, cCreatedBy, cUpdatedAt, cUpdatedBy)
        });
      });
    });
    (v.contract_files || []).forEach((file, idx) => {
      const docDate = updatedAt || v.created_at;
      const fileName = this.getFileName(file);
      this.addEvent(events, v, {
        rawDate: docDate,
        createdRawDate: vendorCreationInfo?.at || v.created_at,
        updatedRawDate: updatedAt,
        icon: "description",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
        description: `Document "${fileName}" was uploaded for Vendor "${v.name}"${projectName ? ` under Project "${projectName}"` : ""}.`,
        idSuffix: `doc-${idx}`,
        categories: ["document"],
        subDetails: [
          { label: "File", value: fileName, valueColor: "text-slate-700" },
          { label: "Vendor", value: v.name, valueColor: "text-primary" },
          ...projectName ? [{ label: "Project", value: projectName, valueColor: "text-indigo-600" }] : []
        ],
        meta: this.buildMeta(vendorCreationInfo?.at || v.created_at, createdBy, updatedAt, updatedBy)
      });
    });
    return events;
  }
  humanizeStatus(status) {
    return String(status ?? "pending").replace(/_/g, " ");
  }
  formatTime(date) {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  }
  loadVendorRecord(vendor) {
    if (this.records[vendor.id]?.loading || this.records[vendor.id]?.loaded) {
      return Promise.resolve(this.records[vendor.id]);
    }
    const rec = {
      vendor,
      loaded: false,
      loading: true,
      tasks: [],
      invoices: [],
      audits: [],
      laborWorkers: [],
      laborStats: { totalPersonnel: 0, onSite: 0, remaining: 0, activePersonnel: 0, skillCompliance: "0%", skillComposition: [] },
      projectData: null,
      milestones: [],
      milestoneMap: {},
      subMilestoneMap: {},
      taskMap: {},
      totalBilled: 0,
      totalPaid: 0,
      totalDailyLaborCost: 0,
      historyEvents: []
    };
    this.records = __spreadProps(__spreadValues({}, this.records), { [vendor.id]: rec });
    return new Promise((resolve) => {
      const invoices$ = this.http.get(`${this.vendorApiBase}/${vendor.id}/invoices`).pipe(catchError(() => of(null)));
      const audits$ = this.http.get(`${this.vendorApiBase}/${vendor.id}/audits`).pipe(catchError(() => of(null)));
      const labor$ = this.http.get(`${environment.serverUrl}/api/v1/vendors_labor/vendor/${vendor.id}`).pipe(catchError(() => of(null)));
      const project$ = vendor.project_id ? this.projectService.getProjectById(vendor.project_id).pipe(take(1), catchError(() => of(null))) : of(null);
      const tasks$ = vendor.project_id ? this.projectService.getProjectTasks(vendor.project_id).pipe(take(1), catchError(() => of(null))) : of(null);
      const history$ = this.historyService.getVendorHistory(vendor.id, { limit: 200 }).pipe(catchError(() => of(null)));
      forkJoin({ invoices: invoices$, audits: audits$, labor: labor$, project: project$, tasks: tasks$, history: history$ }).subscribe({
        next: (results) => {
          const rawInv = results.invoices;
          rec.invoices = Array.isArray(rawInv) ? rawInv : Array.isArray(rawInv?.data) ? rawInv.data : [];
          rec.audits = this.extractAuditArray(results.audits);
          const rawLabor = results.labor;
          if (rawLabor) {
            rec.laborWorkers = Array.isArray(rawLabor.data) ? rawLabor.data : Array.isArray(rawLabor) ? rawLabor : [];
            if (rawLabor.stats)
              rec.laborStats = rawLabor.stats;
          }
          const projectRes = results.project;
          rec.projectData = projectRes?.data ?? projectRes ?? null;
          this.buildMilestoneMaps(rec);
          const tasksRes = results.tasks;
          rec.tasks = Array.isArray(tasksRes?.data) ? tasksRes.data : Array.isArray(tasksRes) ? tasksRes : [];
          this.buildTaskMap(rec);
          rec.historyEvents = results.history?.data || [];
          this.computeTotals(rec);
          rec.loaded = true;
          rec.loading = false;
          this._timelineCache = null;
          this._flatCache = null;
          this.records = __spreadProps(__spreadValues({}, this.records), { [vendor.id]: __spreadValues({}, rec) });
          resolve(rec);
        },
        error: (err) => {
          console.error(`[VendorsHistory] Error loading ${vendor.name}:`, err);
          rec.loaded = true;
          rec.loading = false;
          this._timelineCache = null;
          this._flatCache = null;
          this.records = __spreadProps(__spreadValues({}, this.records), { [vendor.id]: __spreadValues({}, rec) });
          resolve(rec);
        }
      });
    });
  }
  buildMilestoneMaps(rec) {
    const raw = rec.projectData;
    const withChild = Array.isArray(raw?.milestones_with_child) ? raw.milestones_with_child : Array.isArray(raw?.milestonesWithChild) ? raw.milestonesWithChild : Array.isArray(raw?.milestones) ? raw.milestones : [];
    rec.milestones = withChild.filter((m) => !m.parent_id);
    withChild.forEach((m) => {
      if (!m.parent_id) {
        rec.milestoneMap[Number(m.id)] = m.name ?? m.title ?? `Milestone #${m.id}`;
      } else {
        rec.subMilestoneMap[Number(m.id)] = m.name ?? m.title ?? `Sub-Milestone #${m.id}`;
      }
      (m.children || []).forEach((c) => {
        rec.subMilestoneMap[Number(c.id)] = c.name ?? c.title ?? `Sub-Milestone #${c.id}`;
      });
    });
    const childMap = {};
    withChild.forEach((m) => {
      if (m.parent_id) {
        const key = String(m.parent_id);
        if (!childMap[key])
          childMap[key] = [];
        childMap[key].push(m);
      }
    });
    rec.milestones.forEach((m) => {
      if (!m.children || m.children.length === 0)
        m.children = childMap[String(m.id)] || [];
    });
  }
  buildTaskMap(rec) {
    rec.tasks.forEach((t) => {
      rec.taskMap[Number(t.id)] = t.title ?? `Task #${t.id}`;
    });
  }
  computeTotals(rec) {
    rec.totalBilled = rec.invoices.filter((i) => i.status !== "Cancelled").reduce((s, i) => s + (Number(i.grand_total) || 0), 0);
    rec.totalPaid = rec.invoices.reduce((s, i) => s + (Number(i.paid_amount) || 0), 0);
    rec.totalDailyLaborCost = rec.laborWorkers.reduce((s, w) => s + (Number(w.daily_rate) || 0) * (w.labor_count || 0), 0);
  }
  getInvoiceItems(inv) {
    if (Array.isArray(inv.items))
      return inv.items;
    try {
      const parsed = JSON.parse(inv.items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  resolveSettlement(rec, inv) {
    if (!inv.settlement_type)
      return null;
    return {
      type: this.settlementLabel(inv.settlement_type),
      completion: inv.settlement_completion ?? null,
      milestoneNames: (inv.milestone_ids || []).map((id) => rec.milestoneMap[Number(id)] ?? `Milestone #${id}`),
      subMilestoneNames: (inv.sub_milestone_ids || []).map((id) => rec.subMilestoneMap[Number(id)] ?? `Sub-Milestone #${id}`),
      taskNames: (inv.task_ids || []).map((id) => rec.taskMap[Number(id)] ?? `Task #${id}`)
    };
  }
  settlementLabel(type) {
    const map2 = { work_poc: "Work POC", milestone: "Milestone", lumpsum: "Lump Sum" };
    return map2[type] ?? type;
  }
  remainingAmount(inv) {
    return Math.max(0, this.toNumber(inv.grand_total) - this.toNumber(inv.paid_amount));
  }
  getLatestInvoiceDate(rec) {
    if (!rec.invoices.length)
      return null;
    return [...rec.invoices].sort((a, b) => new Date(b.invoice_date).getTime() - new Date(a.invoice_date).getTime())[0].invoice_date;
  }
  getFileName(filePath) {
    return filePath.split("/").pop() ?? filePath;
  }
  formatDate(dateInput) {
    if (!dateInput)
      return "\u2014";
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime()))
      return String(dateInput || "\u2014");
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = d.toLocaleString("en-US", { month: "short" });
    return `${dd}/${mmm}/${d.getFullYear()}`;
  }
  formatAmount(amount) {
    const n = Number(amount) || 0;
    return `\u20B9${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  toNumber(val) {
    return Number(val) || 0;
  }
  viewInvoice(rec, inv) {
    const invoiceItems = this.getInvoiceItems(inv);
    const gstMap = {};
    invoiceItems.forEach((item) => {
      const rate = Number(item.gst) || 0;
      const amt = Number(item.gstAmount) || 0;
      if (amt > 0)
        gstMap[rate] = (gstMap[rate] || 0) + amt;
    });
    const taxRows = Object.entries(gstMap).sort(([a], [b]) => Number(a) - Number(b)).map(([rate, amount]) => `
      <div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
        <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
        <span style="font-weight:600;">\u20B9${Number(amount).toLocaleString("en-IN")}</span>
      </div>`).join("");
    const hasLabor = invoiceItems.some((i) => i.type === "labor");
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
    const settlement = this.resolveSettlement(rec, inv);
    const settlementBlock = settlement ? `
      <div style="margin-top:24px;padding:14px 16px;background:#eff6ff;border-radius:10px;border:1px solid #dbeafe;">
        <p style="margin:0 0 6px;font-weight:800;font-size:12px;color:#1d4ed8;text-transform:uppercase;">Settlement \u2014 ${settlement.type}</p>
        ${settlement.completion != null ? `<p style="margin:2px 0;font-size:12px;"><strong>Completion:</strong> ${settlement.completion}%</p>` : ""}
        ${settlement.milestoneNames.length ? `<p style="margin:2px 0;font-size:12px;"><strong>Milestones:</strong> ${settlement.milestoneNames.join(", ")}</p>` : ""}
        ${settlement.subMilestoneNames.length ? `<p style="margin:2px 0;font-size:12px;"><strong>Sub-Milestones:</strong> ${settlement.subMilestoneNames.join(", ")}</p>` : ""}
        ${settlement.taskNames.length ? `<p style="margin:2px 0;font-size:12px;"><strong>Tasks:</strong> ${settlement.taskNames.join(", ")}</p>` : ""}
      </div>` : "";
    const paymentHistory = Array.isArray(inv.payment_history) ? inv.payment_history : [];
    const paymentRows = paymentHistory.length > 0 ? `
      <div style="margin-top:24px;">
        <h3 style="font-size:14px;font-weight:900;margin-bottom:10px;color:#1e293b;">Payment History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:#f1f5f9;">
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">#</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Date</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Mode</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Reference</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;text-transform:uppercase;">Amount</th>
          </tr></thead>
          <tbody>${paymentHistory.map((p, i) => `
            <tr>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${i + 1}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${this.formatDate(p.paid_at || p.payment_date || p.date)}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.mode || "\u2014"}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.reference || "\u2014"}${p.clearance_date ? " (Clr: " + this.formatDate(p.clearance_date) + ")" : ""}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;text-align:right;">\u20B9${Number(p.amount).toLocaleString("en-IN")}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>` : "";
    const html = `<!DOCTYPE html><html><head><title>Invoice ${inv.invoice_number}</title>
<style>body{font-family:sans-serif;padding:40px;color:#1e293b;}h1{font-size:24px;font-weight:900;margin:0;}
table{width:100%;border-collapse:collapse;margin-top:16px;}th{background:#f1f5f9;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;}
@media print{button{display:none!important;}}</style></head><body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <div><h1>Tax Invoice</h1><p style="color:#64748b;margin:4px 0 0;">${rec.vendor.name}</p></div>
    <div style="text-align:right;">
      <p style="font-weight:900;font-size:18px;margin:0;">${inv.invoice_number}</p>
      <p style="color:#64748b;margin:4px 0 0;">${this.formatDate(inv.invoice_date)}</p>
      <span style="display:inline-block;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;
        background:${inv.status === "Paid" ? "#dcfce7" : inv.status === "Cancelled" ? "#fee2e2" : inv.status === "Partially Paid" ? "#dbeafe" : "#fef3c7"};
        color:${inv.status === "Paid" ? "#15803d" : inv.status === "Cancelled" ? "#dc2626" : inv.status === "Partially Paid" ? "#1d4ed8" : "#b45309"};
        margin-top:6px;">${inv.status}</span>
    </div>
  </div>
  <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
    <p style="margin:0;font-weight:700;">Bill To: ${rec.vendor.name}</p>
    <p style="margin:4px 0 0;color:#64748b;">${rec.vendor.address?.street || ""} ${rec.vendor.address?.pincode || ""}</p>
    <p style="margin:4px 0 0;color:#64748b;">GST: ${rec.vendor.kyc?.gst || "\u2014"} | PAN: ${rec.vendor.kyc?.pan || "\u2014"}</p>
    <p style="margin:6px 0 0;"><strong style="color:#94a3b8;font-size:11px;text-transform:uppercase;">Project:</strong>
      <strong>${rec.projectData?.name || "Not linked"}</strong></p>
  </div>
  <table><thead><tr>
    <th>Type</th><th>Description</th><th style="text-align:center;">Qty</th>
    ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ""}
    <th style="text-align:right;">Rate (\u20B9)</th><th style="text-align:center;">Tax %</th>
    <th style="text-align:right;">Tax (\u20B9)</th><th style="text-align:right;">Total (\u20B9)</th>
  </tr></thead><tbody>${itemRows}</tbody></table>
  <div style="margin-top:24px;max-width:340px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Subtotal</span><span style="font-weight:700;">\u20B9${Number(inv.subtotal).toLocaleString("en-IN")}</span>
    </div>
    ${taxRows}
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Total Tax</span><span style="font-weight:700;">\u20B9${Number(inv.tax_amount).toLocaleString("en-IN")}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:12px 0;">
      <span style="font-weight:900;">Grand Total</span>
      <span style="color:#4f46e5;font-size:18px;font-weight:900;">\u20B9${Number(inv.grand_total).toLocaleString("en-IN")}</span>
    </div>
    ${Number(inv.paid_amount) > 0 ? `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:2px solid #e5e7eb;">
      <span style="color:#16a34a;font-weight:700;">Paid</span>
      <span style="color:#16a34a;font-weight:900;">\u20B9${Number(inv.paid_amount).toLocaleString("en-IN")}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;">
      <span style="color:#dc2626;font-weight:700;">Remaining</span>
      <span style="color:#dc2626;font-weight:900;">\u20B9${Math.max(0, Number(inv.grand_total) - Number(inv.paid_amount)).toLocaleString("en-IN")}</span>
    </div>` : ""}
  </div>
  ${settlementBlock}${paymentRows}
  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()" style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body></html>`;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  }
  async exportAllToCsv() {
    if (this.exporting)
      return;
    this.exporting = true;
    try {
      const vendorsToExport = this.displayVendors;
      const pending = vendorsToExport.filter((v) => !this.records[v.id]?.loaded && !this.records[v.id]?.loading);
      await Promise.all(pending.map((v) => this.loadVendorRecord(v)));
      await new Promise((res) => {
        const check = () => {
          const stillLoading = vendorsToExport.some((v) => this.records[v.id]?.loading);
          if (!stillLoading) {
            res();
          } else {
            setTimeout(check, 200);
          }
        };
        check();
      });
      const rows = [];
      rows.push("Vendor,Project,Record Type,Reference,Date,Amount,Status,Details,Created At,Created By,Updated At,Updated By");
      const esc = (val) => `"${String(val ?? "\u2014").replace(/"/g, '""')}"`;
      const fallbackUser = this.currentUserDisplayName;
      vendorsToExport.forEach((v) => {
        const rec = this.records[v.id];
        if (!rec)
          return;
        const projectName = rec.projectData?.name || "Not linked";
        const creationInfoMap = /* @__PURE__ */ new Map();
        rec.historyEvents.filter((h) => h.action === "created").forEach((h) => {
          const key = `${h.entity_type}-${h.entity_id ?? "vendor"}`;
          const cleanedName = this.cleanName(h.changed_by_name);
          if (!creationInfoMap.has(key) && cleanedName) {
            creationInfoMap.set(key, { name: cleanedName, at: h.createdAt });
          }
        });
        const getCreatorCsv = (entityType, entityId) => {
          const key = `${entityType}-${entityId ?? "vendor"}`;
          return creationInfoMap.get(key) || null;
        };
        const updatedBy = v.updated_by_name || fallbackUser;
        const vendorCreator = getCreatorCsv("vendor", null);
        const createdBy = vendorCreator?.name || v.created_by_name || updatedBy;
        rec.invoices.forEach((inv) => {
          const invCreator = getCreatorCsv("invoice", inv.id);
          const iCreatedAt = invCreator?.at || inv.created_at || inv.createdAt || inv.invoice_date;
          const iUpdatedAt = inv.updated_at || inv.updatedAt || "";
          const iUpdatedBy = inv.updated_by_name || "";
          const iCreatedBy = invCreator?.name || inv.created_by_name || iUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc("Invoice"), esc(inv.invoice_number), esc(this.formatDate(inv.invoice_date)), esc(this.toNumber(inv.grand_total)), esc(inv.status), esc(`Paid: ${this.formatAmount(inv.paid_amount)}`), esc(this.formatDateTime(iCreatedAt)), esc(iCreatedBy), esc(this.formatDateTime(iUpdatedAt)), esc(iUpdatedBy || "\u2014")].join(","));
          (inv.payment_history || []).forEach((p) => {
            rows.push([esc(v.name), esc(projectName), esc("Payment"), esc(inv.invoice_number), esc(this.formatDate(p.paid_at || p.payment_date)), esc(this.toNumber(p.amount)), esc(p.mode), esc(p.reference ? `Ref: ${p.reference}` : "\u2014"), esc("\u2014"), esc("\u2014"), esc("\u2014"), esc("\u2014")].join(","));
          });
        });
        rec.audits.forEach((a2) => {
          const auditCreator = getCreatorCsv("audit", a2.id);
          const aCreatedAt = auditCreator?.at || a2.created_at || a2.createdAt;
          const aUpdatedBy = a2.updated_by_name || "";
          const aCreatedBy = auditCreator?.name || a2.created_by_name || aUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc("Audit"), esc("\u2014"), esc(this.formatDate(a2.audit_date || a2.auditDate || a2.createdAt || a2.created_at)), esc("\u2014"), esc(`${Math.round(Number(a2.composite_score ?? a2.compositeScore ?? 0))}%`), esc(a2.observations || "\u2014"), esc(this.formatDateTime(aCreatedAt)), esc(aCreatedBy), esc(this.formatDateTime(a2.updated_at || a2.updatedAt)), esc(aUpdatedBy || "\u2014")].join(","));
        });
        rec.laborWorkers.forEach((w) => {
          const laborCreator = getCreatorCsv("labor", w.id);
          const lCreatedAt = laborCreator?.at || w.created_at || w.createdAt;
          const lUpdatedBy = w.updated_by_name || "";
          const lCreatedBy = laborCreator?.name || w.created_by_name || lUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc("Labor"), esc(w.skill), esc("\u2014"), esc(this.toNumber(w.daily_rate) * (w.labor_count || 0)), esc(w.statusLabel || w.status), esc(`Count: ${w.labor_count} \xB7 Assigned: ${w.assign_worker || "Unassigned"}`), esc(this.formatDateTime(lCreatedAt)), esc(lCreatedBy), esc(this.formatDateTime(w.updated_at || w.updatedAt)), esc(lUpdatedBy || "\u2014")].join(","));
        });
        rec.tasks.forEach((t) => {
          const tUpdatedBy = t.updated_by_name || "";
          const tCreatedBy = t.created_by_name || tUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc("Task"), esc(t.title), esc(this.formatDate(t.due_date || t.dueDate)), esc("\u2014"), esc(t.status), esc(`Subtasks: ${(t.subtasks || []).length}`), esc(this.formatDateTime(t.created_at || t.createdAt)), esc(tCreatedBy), esc(this.formatDateTime(t.updated_at || t.updatedAt)), esc(tUpdatedBy || "\u2014")].join(","));
        });
        rec.milestones.forEach((m) => {
          const mUpdatedBy = m.updated_by_name || "";
          const mCreatedBy = m.created_by_name || mUpdatedBy || fallbackUser;
          rows.push([esc(v.name), esc(projectName), esc("Milestone"), esc(m.name || m.title), esc(`${this.formatDate(m.start_date)} \u2192 ${this.formatDate(m.end_date)}`), esc("\u2014"), esc(m.status || "\u2014"), esc(`Sub-milestones: ${(m.children || []).length}`), esc(this.formatDateTime(m.created_at || m.createdAt)), esc(mCreatedBy), esc(this.formatDateTime(m.updated_at)), esc(mUpdatedBy || "\u2014")].join(","));
        });
        const allocated = Number(v.budget_allocation) || 0;
        rows.push([esc(v.name), esc(projectName), esc("Budget"), esc("Allocation Summary"), esc(this.formatDate(v.created_at)), esc(allocated), esc(allocated > 0 && rec.totalBilled > allocated ? "Exceeded" : "Within Budget"), esc(`Invoiced: ${this.formatAmount(rec.totalBilled)} | Paid: ${this.formatAmount(rec.totalPaid)} | Remaining: ${this.formatAmount(Math.max(0, allocated - rec.totalBilled))}`), esc(this.formatDateTime(vendorCreator?.at || v.created_at)), esc(createdBy), esc(this.formatDateTime(v.updated_at)), esc(updatedBy)].join(","));
      });
      if (rows.length <= 1) {
        alert("No data to export.");
        return;
      }
      const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vendor-history-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      this.exporting = false;
    }
  }
  static \u0275fac = function VendorsHistory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsHistory)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VendorsHistory, selectors: [["app-vendors-history"]], hostBindings: function VendorsHistory_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function VendorsHistory_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 39, vars: 13, consts: [["vendorDropdownRef", ""], [1, "px-4", "pt-2", "pb-8", "flex", "flex-col", "gap-5", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-4"], [1, "space-y-1"], [1, "text-3xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "mt-1", "text-sm", "font-medium"], [1, "flex", "items-center", "gap-3", "flex-wrap"], ["data-dropdown", "vendor", 1, "relative"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "rounded-xl", "font-bold", "text-sm", "bg-white", "dark:bg-slate-900", "border", "border-outline-variant/20", "text-on-surface", "hover:bg-surface-container-low", "transition-colors", "cursor-pointer", "shadow-sm", "min-w-[200px]", 3, "click"], [1, "material-symbols-outlined", "text-primary", "text-lg"], [1, "flex-1", "text-left", "truncate"], [1, "material-symbols-outlined", "text-outline", "text-base", "transition-transform", "duration-200"], [1, "absolute", "right-0", "top-full", "mt-1.5", "w-72", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-outline-variant/20", "shadow-xl", "z-50", "overflow-hidden"], [1, "flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-xl", "font-bold", "text-sm", "bg-surface-container-highest", "text-primary", "hover:bg-surface-dim", "transition-colors", "cursor-pointer", "disabled:opacity-60", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-lg"], [1, "flex", "items-center", "gap-1.5", "overflow-x-auto", "pb-1", "-mx-1", "px-1"], [1, "flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-full", "text-sm", "font-bold", "whitespace-nowrap", "transition-colors", "cursor-pointer", "shrink-0", 3, "ngClass"], [1, "flex", "flex-col", "gap-5"], [1, "flex", "flex-wrap", "gap-2", "items-center"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap"], [1, "text-lg", "font-black", "text-on-surface"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-outline-variant/20", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "max-w-[320px]"], [1, "material-symbols-outlined", "text-outline", "text-[20px]"], ["type", "text", "placeholder", "Search history...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "py-16", "flex", "flex-col", "items-center", "gap-3", "text-outline", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-outline-variant/10"], [1, "px-3", "py-2.5", "border-b", "border-outline-variant/10"], [1, "relative"], [1, "absolute", "left-2.5", "top-1/2", "-translate-y-1/2", "material-symbols-outlined", "text-outline", "text-[15px]"], ["type", "text", "placeholder", "Search vendors\u2026", 1, "w-full", "pl-8", "pr-3", "py-1.5", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-surface-container-lowest", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "border-b", "border-outline-variant/10", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "transition-all", 3, "ngClass"], [1, "material-symbols-outlined", "text-white", "text-[11px]"], [1, "material-symbols-outlined", "text-primary", "text-[11px]"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-black", "text-on-surface"], [1, "text-[10px]", "text-outline"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded-full", "bg-primary/10", "text-primary"], [1, "max-h-60", "overflow-y-auto"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "border-b", "border-outline-variant/5"], [1, "py-6", "text-center", "text-outline"], [1, "px-4", "py-2.5", "border-t", "border-outline-variant/10", "bg-surface-container-low", "flex", "items-center", "justify-between", "gap-3"], [1, "flex", "gap-3", "text-[10px]", "font-bold", "text-outline"], [1, "text-green-600", "font-black"], [1, "text-amber-600", "font-black"], [1, "text-[11px]", "font-black", "text-primary", "hover:underline", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "border-b", "border-outline-variant/5", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "shrink-0", "transition-all", 3, "ngClass"], [1, "w-7", "h-7", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", 3, "ngClass"], [1, "text-xs", "font-bold", "truncate", "text-on-surface"], [1, "flex", "items-center", "gap-1.5", "mt-0.5", "flex-wrap"], [1, "text-[9px]", "font-bold", "px-1.5", "py-0.5", "rounded-full", 3, "ngClass"], [1, "text-[10px]", "font-semibold"], [1, "text-[9px]", "text-outline", "font-semibold"], [1, "material-symbols-outlined", "text-2xl"], [1, "text-xs", "font-bold", "mt-1"], [1, "flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-full", "text-sm", "font-bold", "whitespace-nowrap", "transition-colors", "cursor-pointer", "shrink-0", 3, "click", "ngClass"], [1, "text-[10px]", "font-black", "px-1.5", "py-0.5", "rounded-full", 3, "ngClass"], [1, "text-[11px]", "font-black", "text-outline", "uppercase", "tracking-widest"], [1, "flex", "items-center", "gap-1.5", "px-3", "py-1", "rounded-full", "bg-primary/10", "border", "border-primary/20"], [1, "text-[11px]", "font-bold", "text-outline", "hover:text-primary", "transition-colors", "cursor-pointer", "underline", 3, "click"], [1, "text-[11px]", "font-black", "text-primary"], [1, "text-primary/60", "hover:text-primary", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[13px]"], [1, "material-symbols-outlined", "text-3xl", "animate-spin"], [1, "text-sm", "font-bold"], [1, "py-16", "flex", "flex-col", "items-center", "gap-2", "text-outline", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-outline-variant/10"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap", "px-1", "pt-2", "pb-1", "border-t", "border-outline-variant/10", "mt-1"], [1, "material-symbols-outlined", "text-4xl"], [1, "text-xs", "text-outline/70"], [1, "flex", "items-center", "gap-3", "px-1"], [1, "w-9", "h-9", "rounded-xl", "bg-primary/10", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-primary", "text-[16px]"], [1, "text-sm", "font-black", "text-on-surface"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-primary/10", "text-primary", "shrink-0"], [1, "ml-4", "pl-7", "border-l-2", "border-dashed", "border-outline-variant/20", "flex", "flex-col", "gap-2"], [1, "relative", "bg-white", "dark:bg-slate-900", "border", "border-outline-variant/10", "rounded-2xl", "shadow-sm", "hover:bg-surface-container-low", "transition-colors"], [1, "absolute", "-left-[33px]", "top-4", "w-3", "h-3", "rounded-full", "border-2", "border-white", "dark:border-slate-950", "shadow-sm", 3, "ngClass"], [1, "flex", "items-start", "gap-3", "px-4", "py-3.5"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "mt-0.5", 3, "ngClass"], [1, "material-symbols-outlined", "text-[16px]", 3, "ngClass"], [1, "flex", "items-center", "gap-2", "flex-wrap", "mb-1"], [1, "text-[9px]", "font-black", "px-2", "py-0.5", "rounded-full", "uppercase", "tracking-wide", 3, "ngClass"], [1, "text-sm", "font-semibold", "text-on-surface", "leading-snug", 2, "white-space", "pre-line"], [1, "flex", "flex-col", "gap-3", "shrink-0", 2, "min-width", "210px", "max-width", "260px"], [1, "rounded-xl", "border", "border-pink-200", "dark:border-pink-800/40", "bg-pink-50/60", "dark:bg-pink-900/10", "px-3", "py-2", "shadow-sm"], [1, "rounded-xl", "border", "border-blue-200", "dark:border-blue-800/40", "bg-blue-50/60", "dark:bg-blue-900/10", "px-3", "py-2", "shadow-sm"], ["title", "View details", 1, "p-1.5", "text-primary", "hover:bg-primary/10", "rounded-lg", "transition-colors", "cursor-pointer", "shrink-0", "mt-0.5"], [1, "relative", "bg-white", "dark:bg-slate-900", "border", "border-violet-200/60", "rounded-2xl", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "flex", "items-center", "justify-between", "gap-2", "mt-1"], [1, "text-[8px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-pink-100", "text-pink-700", "whitespace-nowrap", "max-w-[140px]", "truncate"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-pink-100", "text-pink-700", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-blue-100", "text-blue-700", "whitespace-nowrap", "max-w-[140px]", "truncate"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-blue-100", "text-blue-700", "whitespace-nowrap"], ["title", "View details", 1, "p-1.5", "text-primary", "hover:bg-primary/10", "rounded-lg", "transition-colors", "cursor-pointer", "shrink-0", "mt-0.5", 3, "click"], [1, "material-symbols-outlined", "text-base"], [1, "absolute", "-left-[33px]", "top-4", "w-3", "h-3", "rounded-full", "border-2", "border-white", "dark:border-slate-950", "shadow-sm", "bg-violet-100"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "mt-0.5", "bg-violet-100"], [1, "material-symbols-outlined", "text-[16px]", "text-violet-600"], [1, "text-[9px]", "font-black", "px-2", "py-0.5", "rounded-full", "uppercase", "tracking-wide", "bg-violet-100", "text-violet-700"], [1, "text-sm", "font-semibold", "text-on-surface", "leading-snug"], [1, "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "px-3", "py-2", "shrink-0", 2, "min-width", "210px", "max-width", "260px"], [1, "text-xs", "font-semibold", "text-outline"], [1, "font-black", "text-on-surface"], [1, "flex", "items-center", "gap-1"], ["title", "Previous page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-surface-container-low", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-[18px]"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", 3, "ngClass"], ["title", "Next page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-surface-container-low", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", 3, "click", "disabled"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "text-slate-500", "hover:bg-surface-container-low", "cursor-pointer", "transition-colors", 3, "click"], [1, "px-1", "text-xs", "font-bold", "text-outline"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", 3, "click", "ngClass"]], template: function VendorsHistory_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "section", 1)(1, "div", 2)(2, "div", 3)(3, "h2", 4);
      \u0275\u0275text(4, "Vendor History");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 5);
      \u0275\u0275text(6, " Complete activity timeline \u2014 invoices, payments, milestones, tasks, audits & labor. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 6)(8, "div", 7, 0)(10, "button", 8);
      \u0275\u0275listener("click", function VendorsHistory_Template_button_click_10_listener() {
        return ctx.toggleVendorDropdown();
      });
      \u0275\u0275elementStart(11, "span", 9);
      \u0275\u0275text(12, "storefront");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "span", 10);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 11);
      \u0275\u0275text(16, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, VendorsHistory_Conditional_17_Template, 33, 9, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 13);
      \u0275\u0275listener("click", function VendorsHistory_Template_button_click_18_listener() {
        return ctx.exportAllToCsv();
      });
      \u0275\u0275elementStart(19, "span", 14);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 15);
      \u0275\u0275repeaterCreate(23, VendorsHistory_For_24_Template, 3, 3, "button", 16, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 17);
      \u0275\u0275conditionalCreate(26, VendorsHistory_Conditional_26_Template, 7, 0, "div", 18);
      \u0275\u0275elementStart(27, "div", 19)(28, "div")(29, "h3", 20);
      \u0275\u0275conditionalCreate(30, VendorsHistory_Conditional_30_Template, 1, 0)(31, VendorsHistory_Conditional_31_Template, 1, 0)(32, VendorsHistory_Conditional_32_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 21)(34, "span", 22);
      \u0275\u0275text(35, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function VendorsHistory_Template_input_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function VendorsHistory_Template_input_ngModelChange_36_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(37, VendorsHistory_Conditional_37_Template, 5, 0, "div", 24)(38, VendorsHistory_Conditional_38_Template, 4, 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.vendorDropdownLabel);
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.vendorDropdownOpen);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.vendorDropdownOpen ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.exporting);
      \u0275\u0275advance();
      \u0275\u0275classProp("animate-spin", ctx.exporting);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.exporting ? "progress_activity" : "download", " ");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.exporting ? "Preparing Export\u2026" : "Export All (CSV)", " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.categoryTabs);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.isAllSelected && ctx.selectedVendorIds.size > 0 ? 26 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isAllSelected ? 30 : ctx.selectedVendorIds.size === 0 ? 31 : 32);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isTimelineLoading ? 37 : 38);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.animate-in[_ngcontent-%COMP%] {\n  animation-fill-mode: both;\n}\n/*# sourceMappingURL=vendors-history.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsHistory, [{
    type: Component,
    args: [{ selector: "app-vendors-history", standalone: false, template: `<section class="px-4 pt-2 pb-8 flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">\r
    <div class="space-y-1">\r
      <h2 class="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Vendor History</h2>\r
      <p class="text-slate-500 mt-1 text-sm font-medium">\r
        Complete activity timeline \u2014 invoices, payments, milestones, tasks, audits &amp; labor.\r
      </p>\r
    </div>\r
\r
    <div class="flex items-center gap-3 flex-wrap">\r
\r
      <div class="relative" data-dropdown="vendor" #vendorDropdownRef>\r
        <button (click)="toggleVendorDropdown()"\r
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-outline-variant/20 text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer shadow-sm min-w-[200px]">\r
          <span class="material-symbols-outlined text-primary text-lg">storefront</span>\r
          <span class="flex-1 text-left truncate">{{ vendorDropdownLabel }}</span>\r
          <span class="material-symbols-outlined text-outline text-base transition-transform duration-200"\r
            [class.rotate-180]="vendorDropdownOpen">expand_more</span>\r
        </button>\r
\r
        @if (vendorDropdownOpen) {\r
        <div\r
          class="absolute right-0 top-full mt-1.5 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/20 shadow-xl z-50 overflow-hidden">\r
\r
          <div class="px-3 py-2.5 border-b border-outline-variant/10">\r
            <div class="relative">\r
              <span\r
                class="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[15px]">search</span>\r
              <input [(ngModel)]="dropdownSearch" type="text" placeholder="Search vendors\u2026"\r
                class="w-full pl-8 pr-3 py-1.5 rounded-xl border border-outline-variant/20 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest" />\r
            </div>\r
          </div>\r
\r
          <div (click)="toggleSelectAll()"\r
            class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant/10">\r
            <div class="w-4 h-4 rounded flex items-center justify-center border-2 transition-all"\r
              [ngClass]="isAllSelected ? 'bg-primary border-primary' : isPartiallySelected ? 'bg-primary/30 border-primary' : 'border-outline/40 bg-white dark:bg-slate-800'">\r
              @if (isAllSelected) {\r
              <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
              } @else if (isPartiallySelected) {\r
              <span class="material-symbols-outlined text-primary text-[11px]">remove</span>\r
              }\r
            </div>\r
            <div class="flex-1 min-w-0">\r
              <p class="text-xs font-black text-on-surface">All Vendors</p>\r
              <p class="text-[10px] text-outline">{{ vendors.length }} total</p>\r
            </div>\r
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">\r
              {{ selectedVendorIds.size }}/{{ vendors.length }}\r
            </span>\r
          </div>\r
\r
          <div class="max-h-60 overflow-y-auto">\r
            @for (v of dropdownFilteredVendors; track v.id) {\r
            <div (click)="toggleVendorSelection(v)"\r
              class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant/5">\r
              <div class="w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all"\r
                [ngClass]="selectedVendorIds.has(v.id) ? 'bg-primary border-primary' : 'border-outline/40 bg-white dark:bg-slate-800'">\r
                @if (selectedVendorIds.has(v.id)) {\r
                <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
                }\r
              </div>\r
              <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"\r
                [ngClass]="selectedVendorIds.has(v.id) ? 'bg-primary/15' : 'bg-surface-container-high'">\r
                <span class="material-symbols-outlined text-[14px]"\r
                  [ngClass]="selectedVendorIds.has(v.id) ? 'text-primary' : 'text-outline'">business</span>\r
              </div>\r
              <div class="flex-1 min-w-0">\r
                <p class="text-xs font-bold truncate text-on-surface">{{ v.name }}</p>\r
                <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">\r
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full" [ngClass]="v.statusColor">{{ v.status\r
                    }}</span>\r
                  <span class="text-[10px] font-semibold" [class.text-green-600]="v.compliance_score >= 90"\r
                    [class.text-amber-500]="v.compliance_score < 90 && v.compliance_score >= 70"\r
                    [class.text-red-500]="v.compliance_score < 70">{{ v.compliance_score }}%</span>\r
                  <span class="text-[9px] text-outline font-semibold">\xB7 Since {{ formatDate(v.created_at) }}</span>\r
                </div>\r
              </div>\r
            </div>\r
            } @empty {\r
            <div class="py-6 text-center text-outline">\r
              <span class="material-symbols-outlined text-2xl">search_off</span>\r
              <p class="text-xs font-bold mt-1">No vendors found</p>\r
            </div>\r
            }\r
          </div>\r
\r
          <div\r
            class="px-4 py-2.5 border-t border-outline-variant/10 bg-surface-container-low flex items-center justify-between gap-3">\r
            <div class="flex gap-3 text-[10px] font-bold text-outline">\r
              <span>Active: <span class="text-green-600 font-black">{{ activeCount }}</span></span>\r
              <span>Pending: <span class="text-amber-600 font-black">{{ pendingCount }}</span></span>\r
            </div>\r
            <button (click)="vendorDropdownOpen = false"\r
              class="text-[11px] font-black text-primary hover:underline cursor-pointer">Done</button>\r
          </div>\r
        </div>\r
        }\r
      </div>\r
\r
      <button (click)="exportAllToCsv()" [disabled]="exporting"\r
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-surface-container-highest text-primary hover:bg-surface-dim transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">\r
        <span class="material-symbols-outlined text-lg" [class.animate-spin]="exporting">\r
          {{ exporting ? 'progress_activity' : 'download' }}\r
        </span>\r
        {{ exporting ? 'Preparing Export\u2026' : 'Export All (CSV)' }}\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div class="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">\r
    @for (tab of categoryTabs; track tab.key) {\r
    <button (click)="setActiveCategory(tab.key)"\r
      class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0"\r
      [ngClass]="activeCategory === tab.key\r
        ? 'bg-primary text-white shadow-sm'\r
        : 'bg-surface-container-low text-slate-500 hover:bg-surface-container'">\r
      {{ tab.label }}\r
\r
      @if (getCategoryCount(tab.key) > 0) {\r
      <span class="text-[10px] font-black px-1.5 py-0.5 rounded-full"\r
        [ngClass]="activeCategory === tab.key ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'">\r
        {{ getCategoryCount(tab.key) }}\r
      </span>\r
      }\r
    </button>\r
    }\r
  </div>\r
\r
  <div class="flex flex-col gap-5">\r
    @if (!isAllSelected && selectedVendorIds.size > 0) {\r
    <div class="flex flex-wrap gap-2 items-center">\r
      <span class="text-[11px] font-black text-outline uppercase tracking-widest">Showing:</span>\r
      @for (id of selectedVendorIdsArray; track id) {\r
      <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">\r
        <span class="text-[11px] font-black text-primary">{{ getVendorNameById(id) }}</span>\r
        <button (click)="removeVendorSelection(id)"\r
          class="text-primary/60 hover:text-primary transition-colors cursor-pointer">\r
          <span class="material-symbols-outlined text-[13px]">close</span>\r
        </button>\r
      </div>\r
      }\r
      <button (click)="clearAllSelections()"\r
        class="text-[11px] font-bold text-outline hover:text-primary transition-colors cursor-pointer underline">Clear\r
        all</button>\r
    </div>\r
    }\r
\r
    <div class="flex items-center justify-between gap-3 flex-wrap">\r
      <div>\r
        <h3 class="text-lg font-black text-on-surface">\r
          @if (isAllSelected) {\r
          All Vendors \u2014 Activity History\r
          } @else if (selectedVendorIds.size === 0) {\r
          No Vendor Selected\r
          } @else {\r
          {{ selectedVendorIds.size }} Vendor(s) \u2014 Activity History\r
          }\r
        </h3>\r
      </div>\r
\r
      <div\r
        class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-outline-variant/20 bg-white dark:bg-slate-900 shadow-sm w-full max-w-[320px]">\r
        <span class="material-symbols-outlined text-outline text-[20px]">search</span>\r
        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()" placeholder="Search history..."\r
          class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
      </div>\r
    </div>\r
\r
    @if (isTimelineLoading) {\r
    <div\r
      class="py-16 flex flex-col items-center gap-3 text-outline bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/10">\r
      <span class="material-symbols-outlined text-3xl animate-spin">progress_activity</span>\r
      <p class="text-sm font-bold">Loading history\u2026</p>\r
    </div>\r
\r
    } @else {\r
\r
    @if (flatDateGroups.length === 0) {\r
    <div\r
      class="py-16 flex flex-col items-center gap-2 text-outline bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/10">\r
      <span class="material-symbols-outlined text-4xl">history</span>\r
      <p class="text-sm font-bold">No activity found for this filter.</p>\r
      <p class="text-xs text-outline/70">Try selecting a different tab or vendor.</p>\r
    </div>\r
    }\r
\r
    @for (dGroup of flatDateGroups; track dGroup.dateKey) {\r
    <div class="flex flex-col gap-2">\r
\r
      <div class="flex items-center gap-3 px-1">\r
        <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">\r
          <span class="material-symbols-outlined text-primary text-[16px]">calendar_today</span>\r
        </div>\r
        <div class="flex-1 min-w-0">\r
          <h4 class="text-sm font-black text-on-surface">{{ formatDate(dGroup.date) }}</h4>\r
        </div>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">\r
          {{ countEventsInDateGroup(dGroup) }}\r
        </span>\r
      </div>\r
\r
      <div class="ml-4 pl-7 border-l-2 border-dashed border-outline-variant/20 flex flex-col gap-2">\r
        @for (ev of dGroup.events; track ev.id) {\r
\r
        <div\r
          class="relative bg-white dark:bg-slate-900 border border-outline-variant/10 rounded-2xl shadow-sm hover:bg-surface-container-low transition-colors">\r
\r
          <div\r
            class="absolute -left-[33px] top-4 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 shadow-sm"\r
            [ngClass]="ev.iconBg"></div>\r
\r
          <div class="flex items-start gap-3 px-4 py-3.5">\r
\r
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" [ngClass]="ev.iconBg">\r
              <span class="material-symbols-outlined text-[16px]" [ngClass]="ev.iconColor">{{ ev.icon }}</span>\r
            </div>\r
\r
            <div class="flex-1 min-w-0">\r
              <div class="flex items-center gap-2 flex-wrap mb-1">\r
                <span class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide"\r
                  [ngClass]="getCategoryBadgeClass(ev.primaryCategory)">\r
                  {{ getCategoryLabel(ev.primaryCategory) }}\r
                </span>\r
                @if (!isSingleVendorSelected && isAllSelected) {\r
                }\r
              </div>\r
              <p class="text-sm font-semibold text-on-surface leading-snug" style="white-space: pre-line">\r
                {{ ev.description }}\r
              </p>\r
            </div>\r
\r
            <div class="flex flex-col gap-3 shrink-0" style="min-width: 210px; max-width: 260px;">\r
\r
              @if (ev.createdBy || ev.createdAt) {\r
              <div\r
                class="rounded-xl border border-pink-200 dark:border-pink-800/40 bg-pink-50/60 dark:bg-pink-900/10 px-3 py-2 shadow-sm">\r
                @if (ev.createdBy) {\r
                <div class="flex items-center justify-between gap-2">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
                    By:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap max-w-[140px] truncate">\r
                    {{ ev.createdBy }}\r
                  </span>\r
                </div>\r
                }\r
                @if (ev.createdAt) {\r
                <div class="flex items-center justify-between gap-2 mt-1">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
                    At:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap">\r
                    {{ ev.createdAt }}\r
                  </span>\r
                </div>\r
                }\r
              </div>\r
              }\r
\r
              @if (ev.updatedBy || ev.updatedAt) {\r
              <div\r
                class="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50/60 dark:bg-blue-900/10 px-3 py-2 shadow-sm">\r
                @if (ev.updatedBy) {\r
                <div class="flex items-center justify-between gap-2">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Updated\r
                    By:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap max-w-[140px] truncate">\r
                    {{ ev.updatedBy }}\r
                  </span>\r
                </div>\r
                }\r
                @if (ev.updatedAt) {\r
                <div class="flex items-center justify-between gap-2 mt-1">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Updated\r
                    At:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">\r
                    {{ ev.updatedAt }}\r
                  </span>\r
                </div>\r
                }\r
              </div>\r
              }\r
\r
            </div>\r
\r
            @if (ev.viewAction) {\r
            <button (click)="ev.viewAction()"\r
              class="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer shrink-0 mt-0.5"\r
              title="View details">\r
              <span class="material-symbols-outlined text-base">visibility</span>\r
            </button>\r
            }\r
\r
          </div>\r
        </div>\r
\r
        @if (ev.budgetMeta && ev.id.includes('-onboard')) {\r
        <div class="relative bg-white dark:bg-slate-900 border border-violet-200/60 rounded-2xl shadow-sm">\r
\r
          <div\r
            class="absolute -left-[33px] top-4 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 shadow-sm bg-violet-100">\r
          </div>\r
\r
          <div class="flex items-start gap-3 px-4 py-3.5">\r
\r
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-violet-100">\r
              <span class="material-symbols-outlined text-[16px] text-violet-600">account_balance_wallet</span>\r
            </div>\r
\r
            <div class="flex-1 min-w-0">\r
              <div class="flex items-center gap-2 flex-wrap mb-1">\r
                <span\r
                  class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide bg-violet-100 text-violet-700">\r
                  Budget\r
                </span>\r
              </div>\r
              <p class="text-sm font-semibold text-on-surface leading-snug">\r
                Budget of {{ formatAmount(ev.budgetMeta.allocated) }} was allocated to Vendor "{{ ev.vendorName }}".\r
              </p>\r
            </div>\r
\r
            @if (ev.createdBy || ev.createdAt) {\r
            <div\r
              class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 shrink-0"\r
              style="min-width: 210px; max-width: 260px;">\r
              @if (ev.createdBy) {\r
              <div class="flex items-center justify-between gap-2">\r
                <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
                  By:</span>\r
                <span\r
                  class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap max-w-[140px] truncate">\r
                  {{ ev.createdBy }}\r
                </span>\r
              </div>\r
              }\r
              @if (ev.createdAt) {\r
              <div class="flex items-center justify-between gap-2 mt-1">\r
                <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
                  At:</span>\r
                <span\r
                  class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap">\r
                  {{ ev.createdAt }}\r
                </span>\r
              </div>\r
              }\r
            </div>\r
            }\r
\r
          </div>\r
        </div>\r
        }\r
        }\r
      </div>\r
    </div>\r
    }\r
\r
    @if (totalFilteredEvents > 0) {\r
    <div\r
      class="flex items-center justify-between gap-3 flex-wrap px-1 pt-2 pb-1 border-t border-outline-variant/10 mt-1">\r
      <p class="text-xs font-semibold text-outline">\r
        Showing <span class="font-black text-on-surface">{{ pageStartIndex }}\u2013{{ pageEndIndex }}</span>\r
        of <span class="font-black text-on-surface">{{ totalFilteredEvents }}</span> entries\r
      </p>\r
\r
      <div class="flex items-center gap-1">\r
        <button (click)="prevPage()" [disabled]="currentPage === 1"\r
          class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"\r
          title="Previous page">\r
          <span class="material-symbols-outlined text-[18px]">chevron_left</span>\r
        </button>\r
\r
        @if (pageNumbers[0] > 1) {\r
        <button (click)="goToPage(1)"\r
          class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-surface-container-low cursor-pointer transition-colors">\r
          1\r
        </button>\r
        @if (pageNumbers[0] > 2) {\r
        <span class="px-1 text-xs font-bold text-outline">\u2026</span>\r
        }\r
        }\r
\r
        @for (p of pageNumbers; track p) {\r
        <button (click)="goToPage(p)"\r
          class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-colors"\r
          [ngClass]="p === currentPage ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-surface-container-low'">\r
          {{ p }}\r
        </button>\r
        }\r
\r
        @if (pageNumbers[pageNumbers.length - 1] < totalPages) { @if (pageNumbers[pageNumbers.length - 1] < totalPages -\r
          1) { <span class="px-1 text-xs font-bold text-outline">\u2026</span>\r
          }\r
          <button (click)="goToPage(totalPages)"\r
            class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-surface-container-low cursor-pointer transition-colors">\r
            {{ totalPages }}\r
          </button>\r
          }\r
\r
          <button (click)="nextPage()" [disabled]="currentPage === totalPages"\r
            class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"\r
            title="Next page">\r
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>\r
          </button>\r
      </div>\r
    </div>\r
    }\r
    }\r
  </div>\r
</section>`, styles: ["/* src/app/modules/history/vendors-history/vendors-history.scss */\n:host {\n  display: block;\n}\n.animate-in {\n  animation-fill-mode: both;\n}\n/*# sourceMappingURL=vendors-history.css.map */\n"] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VendorsHistory, { className: "VendorsHistory", filePath: "app/modules/history/vendors-history/vendors-history.ts", lineNumber: 226 });
})();

// src/app/modules/history/project-history/project-history-services.ts
var ProjectHistoryServices = class _ProjectHistoryServices {
  http;
  apiUrl = environment.serverUrl + "/api/v1";
  constructor(http) {
    this.http = http;
  }
  getProjectHistory(projectId) {
    return this.http.get(`${this.apiUrl}/projects/${projectId}/history`);
  }
  static \u0275fac = function ProjectHistoryServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectHistoryServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProjectHistoryServices, factory: _ProjectHistoryServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectHistoryServices, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/history/project-history/project-history.ts
var _forTrack02 = ($index, $item) => $item.key;
var _forTrack12 = ($index, $item) => $item.id;
var _forTrack22 = ($index, $item) => $item.date;
function ProjectHistory_Conditional_8_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ProjectHistory_Conditional_8_Conditional_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "remove");
    \u0275\u0275elementEnd();
  }
}
function ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", (p_r5.status || "").toLowerCase() === "active" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r5.status, " ");
  }
}
function ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", p_r5.progress, "%");
  }
}
function ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 Since ", ctx_r1.formatShortDate(p_r5.createdAt));
  }
}
function ProjectHistory_Conditional_8_Conditional_8_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_8_Conditional_8_For_19_Template_div_click_0_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleProject(p_r5));
    });
    \u0275\u0275elementStart(1, "div", 46);
    \u0275\u0275conditionalCreate(2, ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_2_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 47)(4, "span", 48);
    \u0275\u0275text(5, "business");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "p", 49);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 50);
    \u0275\u0275conditionalCreate(10, ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_10_Template, 2, 2, "span", 51);
    \u0275\u0275conditionalCreate(11, ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_11_Template, 2, 1, "span", 52);
    \u0275\u0275conditionalCreate(12, ProjectHistory_Conditional_8_Conditional_8_For_19_Conditional_12_Template, 2, 1, "span", 53);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isProjectSelected(p_r5) ? "bg-primary border-primary" : "border-outline/40 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectSelected(p_r5) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isProjectSelected(p_r5) ? "bg-primary/15" : "bg-surface-container-high");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isProjectSelected(p_r5) ? "text-primary" : "text-outline");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r5.status ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r5.progress !== void 0 && p_r5.progress !== null ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r5.createdAt ? 12 : -1);
  }
}
function ProjectHistory_Conditional_8_Conditional_8_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 54);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 55);
    \u0275\u0275text(4, "No projects found");
    \u0275\u0275elementEnd()();
  }
}
function ProjectHistory_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "div", 26)(3, "span", 27);
    \u0275\u0275text(4, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectHistory_Conditional_8_Conditional_8_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.projectSearchQuery, $event) || (ctx_r1.projectSearchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ProjectHistory_Conditional_8_Conditional_8_Template_input_ngModelChange_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onProjectSearch());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 29);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_8_Conditional_8_Template_div_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleAllProjects());
    });
    \u0275\u0275elementStart(7, "div", 30);
    \u0275\u0275conditionalCreate(8, ProjectHistory_Conditional_8_Conditional_8_Conditional_8_Template, 2, 0, "span", 31)(9, ProjectHistory_Conditional_8_Conditional_8_Conditional_9_Template, 2, 0, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 33)(11, "p", 34);
    \u0275\u0275text(12, "All Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 35);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 36);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 37);
    \u0275\u0275repeaterCreate(18, ProjectHistory_Conditional_8_Conditional_8_For_19_Template, 13, 8, "div", 38, _forTrack12, false, ProjectHistory_Conditional_8_Conditional_8_ForEmpty_20_Template, 5, 0, "div", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 40)(22, "div", 41)(23, "span");
    \u0275\u0275text(24, "Active: ");
    \u0275\u0275elementStart(25, "span", 42);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Pending: ");
    \u0275\u0275elementStart(29, "span", 43);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "button", 44);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_8_Conditional_8_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeDropdown());
    });
    \u0275\u0275text(32, "Done");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.projectSearchQuery);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.isAllSelected ? "bg-primary border-primary" : ctx_r1.isPartiallySelected ? "bg-primary/30 border-primary" : "border-outline/40 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isAllSelected ? 8 : ctx_r1.isPartiallySelected ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.projects.length, " total");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.selectedProjectIds.length, "/", ctx_r1.projects.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.filteredProjects);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.activeProjectsCount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.pendingProjectsCount);
  }
}
function ProjectHistory_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "button", 20);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDropdown());
    });
    \u0275\u0275elementStart(2, "span", 21);
    \u0275\u0275text(3, "apartment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 23);
    \u0275\u0275text(7, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, ProjectHistory_Conditional_8_Conditional_8_Template, 33, 9, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.projectSelectorLabel);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.dropdownOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.dropdownOpen ? 8 : -1);
  }
}
function ProjectHistory_For_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.activeTab === tab_r7.key ? "bg-white/20 text-white" : "bg-primary/10 text-primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r7.count, " ");
  }
}
function ProjectHistory_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function ProjectHistory_For_15_Template_button_click_0_listener() {
      const tab_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setActiveTab(tab_r7.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, ProjectHistory_For_15_Conditional_2_Template, 2, 2, "span", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.activeTab === tab_r7.key ? "bg-primary text-white shadow-sm" : "bg-surface-container-low text-slate-500 hover:bg-surface-container");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r7.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r7.count > 0 ? 2 : -1);
  }
}
function ProjectHistory_Conditional_16_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 61);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_16_For_4_Template_button_click_2_listener() {
      const p_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeProjectChip(p_r10.id));
    });
    \u0275\u0275text(3, " close ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r10.name, " ");
  }
}
function ProjectHistory_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 58);
    \u0275\u0275text(2, "Showing:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ProjectHistory_Conditional_16_For_4_Template, 4, 1, "span", 59, _forTrack12);
    \u0275\u0275elementStart(5, "button", 60);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearAllChips());
    });
    \u0275\u0275text(6, " Clear all ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.selectedProjectsList);
  }
}
function ProjectHistory_Conditional_21_Template(rf, ctx) {
}
function ProjectHistory_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 62);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 63);
    \u0275\u0275text(4, "Loading projects\u2026");
    \u0275\u0275elementEnd()();
  }
}
function ProjectHistory_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 64);
    \u0275\u0275text(2, "folder_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 63);
    \u0275\u0275text(4, "Select a project to view its history.");
    \u0275\u0275elementEnd()();
  }
}
function ProjectHistory_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 62);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 63);
    \u0275\u0275text(4, "Loading history\u2026");
    \u0275\u0275elementEnd()();
  }
}
function ProjectHistory_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 65);
    \u0275\u0275text(2, "warning_amber");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 67);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_29_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fetchHistory());
    });
    \u0275\u0275text(6, " Retry ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function ProjectHistory_Conditional_30_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1, "No project selected.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 70);
    \u0275\u0275text(3, "Select at least one project from the dropdown above.");
    \u0275\u0275elementEnd();
  }
}
function ProjectHistory_Conditional_30_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 70);
    \u0275\u0275text(3, "Try a different search term or tab.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('No results for "', ctx_r1.searchQuery, '".');
  }
}
function ProjectHistory_Conditional_30_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 70);
    \u0275\u0275text(3, "Try selecting a different tab or project.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('No "', ctx_r1.activeTab, '" entries found.');
  }
}
function ProjectHistory_Conditional_30_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 64);
    \u0275\u0275text(2, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ProjectHistory_Conditional_30_Conditional_0_Conditional_3_Template, 4, 0)(4, ProjectHistory_Conditional_30_Conditional_0_Conditional_4_Template, 4, 1)(5, ProjectHistory_Conditional_30_Conditional_0_Conditional_5_Template, 4, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.selectedProjectIds.length === 0 && ctx_r1.projects.length > 0 ? 3 : ctx_r1.searchQuery.trim() ? 4 : 5);
  }
}
function ProjectHistory_Conditional_30_For_2_For_12_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88)(1, "span", 90);
    \u0275\u0275text(2, "Created By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 91);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r12 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", entry_r12.metaCreatedBy, " ");
  }
}
function ProjectHistory_Conditional_30_For_2_For_12_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89)(1, "span", 90);
    \u0275\u0275text(2, "Created At:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 92);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r12 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", entry_r12.metaCreatedAt, " ");
  }
}
function ProjectHistory_Conditional_30_For_2_For_12_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275conditionalCreate(1, ProjectHistory_Conditional_30_For_2_For_12_Conditional_13_Conditional_1_Template, 5, 1, "div", 88);
    \u0275\u0275conditionalCreate(2, ProjectHistory_Conditional_30_For_2_For_12_Conditional_13_Conditional_2_Template, 5, 1, "div", 89);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r12.metaCreatedBy ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r12.metaCreatedAt ? 2 : -1);
  }
}
function ProjectHistory_Conditional_30_For_2_For_12_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88)(1, "span", 90);
    \u0275\u0275text(2, "Updated By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 93);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r12 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", entry_r12.metaUpdatedBy, " ");
  }
}
function ProjectHistory_Conditional_30_For_2_For_12_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89)(1, "span", 90);
    \u0275\u0275text(2, "Updated At:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 94);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r12 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", entry_r12.metaUpdatedAt, " ");
  }
}
function ProjectHistory_Conditional_30_For_2_For_12_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87);
    \u0275\u0275conditionalCreate(1, ProjectHistory_Conditional_30_For_2_For_12_Conditional_14_Conditional_1_Template, 5, 1, "div", 88);
    \u0275\u0275conditionalCreate(2, ProjectHistory_Conditional_30_For_2_For_12_Conditional_14_Conditional_2_Template, 5, 1, "div", 89);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r12.metaUpdatedBy ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r12.metaUpdatedAt ? 2 : -1);
  }
}
function ProjectHistory_Conditional_30_For_2_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275element(1, "div", 78);
    \u0275\u0275elementStart(2, "div", 79)(3, "div", 80)(4, "span", 81);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "div", 82)(8, "span", 83);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 84);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 85);
    \u0275\u0275conditionalCreate(13, ProjectHistory_Conditional_30_For_2_For_12_Conditional_13_Template, 3, 2, "div", 86);
    \u0275\u0275conditionalCreate(14, ProjectHistory_Conditional_30_For_2_For_12_Conditional_14_Template, 3, 2, "div", 87);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", entry_r12.colorClass);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", entry_r12.colorClass);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r12.icon);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", entry_r12.colorClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r12.category, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", entry_r12.statement, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(entry_r12.metaCreatedBy || entry_r12.metaCreatedAt ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r12.metaUpdatedBy || entry_r12.metaUpdatedAt ? 14 : -1);
  }
}
function ProjectHistory_Conditional_30_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 71)(2, "div", 72)(3, "span", 73);
    \u0275\u0275text(4, "calendar_today");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 33)(6, "h4", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 75);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 76);
    \u0275\u0275repeaterCreate(11, ProjectHistory_Conditional_30_For_2_For_12_Template, 15, 8, "div", 77, _forTrack12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r13 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(group_r13.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", group_r13.entries.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r13.entries);
  }
}
function ProjectHistory_Conditional_30_Conditional_3_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 103);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function ProjectHistory_Conditional_30_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 102);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_30_Conditional_3_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToPage(1));
    });
    \u0275\u0275text(1, " 1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, ProjectHistory_Conditional_30_Conditional_3_Conditional_13_Conditional_2_Template, 2, 0, "span", 103);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[0] > 2 ? 2 : -1);
  }
}
function ProjectHistory_Conditional_30_Conditional_3_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 104);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_30_Conditional_3_For_15_Template_button_click_0_listener() {
      const p_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToPage(p_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", p_r17 === ctx_r1.currentPage ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-surface-container-low bg-transparent");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r17, " ");
  }
}
function ProjectHistory_Conditional_30_Conditional_3_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 103);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function ProjectHistory_Conditional_30_Conditional_3_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, ProjectHistory_Conditional_30_Conditional_3_Conditional_16_Conditional_0_Template, 2, 0, "span", 103);
    \u0275\u0275elementStart(1, "button", 102);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_30_Conditional_3_Conditional_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.totalPages));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.pageNumbers[ctx_r1.pageNumbers.length - 1] < ctx_r1.totalPages - 1 ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.totalPages, " ");
  }
}
function ProjectHistory_Conditional_30_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69)(1, "p", 95);
    \u0275\u0275text(2, " Showing ");
    \u0275\u0275elementStart(3, "span", 96);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " of ");
    \u0275\u0275elementStart(6, "span", 96);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " entries ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 97)(10, "button", 98);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_30_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prevPage());
    });
    \u0275\u0275elementStart(11, "span", 99);
    \u0275\u0275text(12, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, ProjectHistory_Conditional_30_Conditional_3_Conditional_13_Template, 3, 1);
    \u0275\u0275repeaterCreate(14, ProjectHistory_Conditional_30_Conditional_3_For_15_Template, 2, 2, "button", 100, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(16, ProjectHistory_Conditional_30_Conditional_3_Conditional_16_Template, 3, 2);
    \u0275\u0275elementStart(17, "button", 101);
    \u0275\u0275listener("click", function ProjectHistory_Conditional_30_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275elementStart(18, "span", 99);
    \u0275\u0275text(19, "chevron_right");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.pageStartIndex, "\u2013", ctx_r1.pageEndIndex);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.totalFilteredEntries);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.pageNumbers[0] > 1 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pageNumbers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[ctx_r1.pageNumbers.length - 1] < ctx_r1.totalPages ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
  }
}
function ProjectHistory_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProjectHistory_Conditional_30_Conditional_0_Template, 6, 1, "div", 18);
    \u0275\u0275repeaterCreate(1, ProjectHistory_Conditional_30_For_2_Template, 13, 2, "div", 68, _forTrack22);
    \u0275\u0275conditionalCreate(3, ProjectHistory_Conditional_30_Conditional_3_Template, 20, 7, "div", 69);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.groupedHistory.length === 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.groupedHistory);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.totalFilteredEntries > 0 ? 3 : -1);
  }
}
var ProjectHistory = class _ProjectHistory {
  historyService;
  projectService;
  toastr;
  route;
  projectId;
  error = null;
  projects = [];
  loadingProjects = false;
  records = {};
  dropdownOpen = false;
  projectSearchQuery = "";
  filteredProjects = [];
  selectedProjectIds = [];
  activeTab = "All";
  searchQuery = "";
  tabs = [
    { key: "All", label: "All", count: 0 },
    { key: "Project", label: "Project", count: 0 },
    { key: "Task", label: "Task", count: 0 },
    { key: "Timeline", label: "Timeline", count: 0 },
    { key: "Milestone", label: "Milestone", count: 0 },
    { key: "Budget", label: "Budget", count: 0 },
    { key: "Document", label: "Document", count: 0 }
  ];
  pageSize = 20;
  currentPage = 1;
  _displayCache = null;
  _groupCache = null;
  constructor(historyService, projectService, toastr, route) {
    this.historyService = historyService;
    this.projectService = projectService;
    this.toastr = toastr;
    this.route = route;
  }
  onDocumentClick(event) {
    const target = event.target;
    if (this.dropdownOpen && !target.closest('[data-dropdown="project"]')) {
      this.dropdownOpen = false;
    }
  }
  ngOnInit() {
    if (this.projectId) {
      this.loadingProjects = false;
      this.selectedProjectIds = [this.projectId];
      this.ensureProjectLoaded({ id: this.projectId });
      return;
    }
    const routeProjectId = this.route.snapshot.queryParamMap.get("projectId") || this.route.snapshot.paramMap.get("projectId");
    if (routeProjectId) {
      this.projectId = routeProjectId;
      this.loadingProjects = false;
      this.selectedProjectIds = [routeProjectId];
      this.ensureProjectLoaded({ id: routeProjectId });
      return;
    }
    this.loadProjectList();
  }
  ngOnChanges(changes) {
    if (changes["projectId"] && !changes["projectId"].firstChange && this.projectId) {
      this.selectedProjectIds = [this.projectId];
      this.ensureProjectLoaded({ id: this.projectId });
      this.invalidateCaches();
      this.currentPage = 1;
    }
  }
  loadProjectList() {
    this.loadingProjects = true;
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
        this.filteredProjects = [...this.projects];
        this.loadingProjects = false;
        if (this.projects.length > 0) {
          this.selectedProjectIds = this.projects.map((p) => p.id);
          this.projects.forEach((p) => this.ensureProjectLoaded(p));
        }
      },
      error: () => {
        this.loadingProjects = false;
        this.toastr.error("Failed to load projects list");
      }
    });
  }
  ensureProjectLoaded(project) {
    const id = String(project.id);
    if (this.records[id]?.loaded || this.records[id]?.loading)
      return;
    this.loadProjectRecord(project);
  }
  formatDisplayDate(dateInput) {
    if (!dateInput)
      return "N/A";
    const d = new Date(dateInput);
    if (isNaN(d.getTime()))
      return "N/A";
    const mmm = d.toLocaleString("en-US", { month: "short" });
    return `${d.getDate()} ${mmm} ${d.getFullYear()}`;
  }
  loadProjectRecord(project) {
    const id = String(project.id);
    const rec = {
      project,
      loaded: false,
      loading: true,
      context: {
        name: null,
        status: null,
        documents: [],
        milestoneMap: {},
        subMilestoneMap: {},
        subMilestoneParentMap: {}
      },
      rawHistory: []
    };
    this.records = __spreadProps(__spreadValues({}, this.records), { [id]: rec });
    const projectDetail$ = this.projectService.getProjectById(project.id).pipe(map((res) => res?.data || res), catchError(() => of(null)));
    const history$ = this.historyService.getProjectHistory(project.id).pipe(map((res) => res.data || []), catchError(() => of([])));
    forkJoin({ detail: projectDetail$, history: history$ }).subscribe({
      next: ({ detail, history }) => {
        const foundInList = this.projects.find((p) => String(p.id) === id);
        const flatMilestones = Array.isArray(detail?.milestones) ? detail.milestones : [];
        const milestoneMap = {};
        const subMilestoneMap = {};
        const subMilestoneParentMap = {};
        flatMilestones.forEach((ms) => {
          if (ms?.id == null)
            return;
          if (ms.parent_id === null || ms.parent_id === void 0) {
            milestoneMap[String(ms.id)] = ms.name ?? `Milestone #${ms.id}`;
          } else {
            subMilestoneMap[String(ms.id)] = ms.name ?? `Sub-Milestone #${ms.id}`;
          }
        });
        flatMilestones.forEach((ms) => {
          if (ms?.id == null || ms.parent_id === null || ms.parent_id === void 0)
            return;
          subMilestoneParentMap[String(ms.id)] = milestoneMap[String(ms.parent_id)] ?? null;
        });
        rec.context = {
          name: detail?.name || foundInList?.name || project?.name || null,
          status: detail?.status || foundInList?.status || project?.status || null,
          documents: detail?.documents || foundInList?.documents || [],
          milestoneMap,
          subMilestoneMap,
          subMilestoneParentMap
        };
        rec.rawHistory = history || [];
        rec.loaded = true;
        rec.loading = false;
        this.records = __spreadProps(__spreadValues({}, this.records), { [id]: __spreadValues({}, rec) });
        this.invalidateCaches();
      },
      error: () => {
        rec.loaded = true;
        rec.loading = false;
        this.records = __spreadProps(__spreadValues({}, this.records), { [id]: __spreadValues({}, rec) });
        this.invalidateCaches();
      }
    });
  }
  invalidateCaches() {
    this._displayCache = null;
    this._groupCache = null;
  }
  fetchHistory() {
    this.error = null;
    this.effectiveIds.forEach((id) => {
      const rec = this.records[String(id)];
      if (!rec || !rec.loaded && !rec.loading) {
        const projectObj = this.projects.find((p) => String(p.id) === String(id)) || { id };
        this.loadProjectRecord(projectObj);
      }
    });
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.projectSearchQuery = "";
      this.filteredProjects = [...this.projects];
    }
  }
  closeDropdown() {
    this.dropdownOpen = false;
  }
  onProjectSearch() {
    const q = (this.projectSearchQuery || "").trim().toLowerCase();
    this.filteredProjects = !q ? [...this.projects] : this.projects.filter((p) => (p.name || "").toLowerCase().includes(q));
  }
  get isAllSelected() {
    return this.projects.length > 0 && this.selectedProjectIds.length === this.projects.length;
  }
  get isPartiallySelected() {
    return this.selectedProjectIds.length > 0 && !this.isAllSelected;
  }
  isProjectSelected(p) {
    return this.selectedProjectIds.some((id) => String(id) === String(p.id));
  }
  toggleAllProjects() {
    if (this.isAllSelected) {
      this.selectedProjectIds = [];
    } else {
      this.selectedProjectIds = this.projects.map((p) => p.id);
      this.projects.forEach((p) => this.ensureProjectLoaded(p));
    }
    this.invalidateCaches();
    this.currentPage = 1;
  }
  toggleProject(p) {
    if (!p?.id)
      return;
    const idx = this.selectedProjectIds.findIndex((id) => String(id) === String(p.id));
    if (idx > -1) {
      this.selectedProjectIds = this.selectedProjectIds.filter((_, i) => i !== idx);
    } else {
      this.selectedProjectIds = [...this.selectedProjectIds, p.id];
      this.ensureProjectLoaded(p);
    }
    this.invalidateCaches();
    this.currentPage = 1;
  }
  removeProjectChip(id) {
    this.selectedProjectIds = this.selectedProjectIds.filter((pid) => String(pid) !== String(id));
    this.invalidateCaches();
    this.currentPage = 1;
  }
  clearAllChips() {
    this.selectedProjectIds = [];
    this.invalidateCaches();
    this.currentPage = 1;
  }
  get selectedProjectsList() {
    return this.projects.filter((p) => this.isProjectSelected(p));
  }
  get projectSelectorLabel() {
    if (!this.projects.length)
      return "Select Project";
    if (this.isAllSelected)
      return "All Projects";
    if (this.selectedProjectIds.length === 0)
      return "Select Project";
    return `${this.selectedProjectIds.length} Project${this.selectedProjectIds.length === 1 ? "" : "s"}`;
  }
  get sectionHeadingLabel() {
    if (this.activeTab !== "All") {
      return `${this.activeTab} \u2014 Activity History`;
    }
    if (this.isAllSelected)
      return "All Projects \u2014 Activity History";
    if (this.selectedProjectIds.length === 0)
      return "No Project Selected";
    return `${this.selectedProjectIds.length} Project(s) \u2014 Activity History`;
  }
  get activeProjectsCount() {
    return this.projects.filter((p) => (p.status || "").toLowerCase() === "active").length;
  }
  get pendingProjectsCount() {
    return this.projects.filter((p) => (p.status || "").toLowerCase() !== "active").length;
  }
  formatShortDate(dateInput) {
    if (!dateInput)
      return "\u2014";
    const d = new Date(dateInput);
    if (isNaN(d.getTime()))
      return "\u2014";
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = d.toLocaleString("en-US", { month: "short" });
    return `${dd}/${mmm}/${d.getFullYear()}`;
  }
  get effectiveIds() {
    if (this.projects.length > 0) {
      return this.selectedProjectIds;
    }
    return this.projectId ? [this.projectId] : [];
  }
  get isTimelineLoading() {
    const ids = this.effectiveIds;
    if (!ids.length)
      return this.loadingProjects;
    return ids.some((id) => !this.records[String(id)]?.loaded);
  }
  get loading() {
    return this.isTimelineLoading;
  }
  mapCategory(actionType) {
    const type = (actionType || "").toUpperCase();
    if (type.includes("MILESTONE"))
      return "Milestone";
    if (type.includes("DOCUMENT") || type.includes("BLUEPRINT") || type.includes("FILE") || type.includes("UPLOAD"))
      return "Document";
    if (type.includes("SUBTASK") || type.includes("TASK"))
      return "Task";
    if (type.includes("BUDGET"))
      return "Budget";
    if (type.includes("TIMELINE") || type.includes("PROGRESS") || type.includes("SCHEDULE"))
      return "Timeline";
    return "Project";
  }
  mapIcon(category) {
    switch (category) {
      case "Milestone":
        return "flag";
      case "Task":
        return "task_alt";
      case "Document":
        return "description";
      case "Budget":
        return "payments";
      case "Timeline":
        return "schedule";
      default:
        return "rocket_launch";
    }
  }
  mapColor(category) {
    switch (category) {
      case "Milestone":
        return "text-purple-600 bg-purple-100";
      case "Task":
        return "text-emerald-600 bg-emerald-100";
      case "Document":
        return "text-amber-600 bg-amber-100";
      case "Budget":
        return "text-orange-600 bg-orange-100";
      case "Timeline":
        return "text-cyan-600 bg-cyan-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  }
  getActionLabel(actionType) {
    return (actionType || "").toLowerCase().split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  cleanName(val) {
    if (val === null || val === void 0)
      return null;
    const str = String(val).trim();
    if (!str)
      return null;
    if (str.toLowerCase() === "unknown")
      return null;
    if (str.includes("@"))
      return null;
    return str;
  }
  currentUserDisplayName() {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const user = JSON.parse(raw);
        const name = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();
        return name || user?.username || "Unknown";
      }
    } catch {
    }
    return "Unknown";
  }
  formatDateTime(dateInput) {
    if (!dateInput)
      return "\u2014";
    const d = new Date(dateInput);
    if (isNaN(d.getTime()))
      return "\u2014";
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = d.toLocaleString("en-US", { month: "short" });
    const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    return `${dd}/${mmm}/${d.getFullYear()}, ${time}`;
  }
  buildRowMeta(h, actorName, fallbackUser) {
    const actor = this.cleanName(actorName) || fallbackUser;
    const formatted = this.formatDateTime(h.createdAt);
    const isCreated = (h.action_type || "").toUpperCase().includes("CREATED");
    if (isCreated) {
      return { createdAt: formatted, createdBy: actor };
    }
    return { updatedAt: formatted, updatedBy: actor };
  }
  getMetaVal(m, keys) {
    if (!m)
      return null;
    for (const k of keys) {
      const v = m[k];
      if (v !== void 0 && v !== null && v !== "")
        return v;
    }
    return null;
  }
  getActionWord(actionType) {
    const type = (actionType || "").toUpperCase();
    if (type.includes("DELETED"))
      return "deleted";
    if (type.includes("UPLOAD"))
      return "uploaded";
    if (type.includes("STATUS"))
      return "status changed";
    if (type.includes("ADDED"))
      return "added";
    if (type.includes("CREATED"))
      return "created";
    if (type.includes("UPDATED"))
      return "updated";
    return this.getActionLabel(actionType).toLowerCase();
  }
  extractQuoted(text, regex) {
    if (!text)
      return null;
    const match = text.match(regex);
    return match ? match[1] : null;
  }
  findDocumentNameNearTime(createdAt, documents) {
    if (!documents?.length)
      return null;
    const target = new Date(createdAt).getTime();
    let closest = null;
    let closestDiff = Infinity;
    for (const doc of documents) {
      const docTime = new Date(doc.createdAt).getTime();
      const diff = Math.abs(docTime - target);
      if (diff < closestDiff) {
        closestDiff = diff;
        closest = doc;
      }
    }
    return closest && closestDiff <= 2 * 60 * 1e3 ? closest.name : null;
  }
  buildStatement(h, category, ctx) {
    const m = this.parseMeta(h.meta);
    const type = (h.action_type || "").toUpperCase();
    const actionWord = this.getActionWord(h.action_type);
    const detail = (h.detail || "").trim();
    const fallback = detail || this.getActionLabel(h.action_type);
    const projectName = ctx.name || this.getMetaVal(m, ["project_name", "projectName", "name"]);
    const projectStatus = this.getMetaVal(m, ["status", "new_status", "newStatus"]) || ctx.status;
    switch (category) {
      case "Project": {
        if (!projectName)
          return fallback;
        let stmt = `Project "${projectName}" was ${actionWord}.`;
        if (projectStatus)
          stmt += ` Current status: ${projectStatus}.`;
        return stmt;
      }
      case "Task": {
        const taskName = this.getMetaVal(m, ["task_name", "taskName"]) || this.extractQuoted(detail, /task\s+"([^"]+)"/i);
        const status = this.getMetaVal(m, ["status", "new_status", "newStatus", "task_status"]);
        const subtaskName = this.getMetaVal(m, ["subtask_name", "subTaskName"]);
        if (!taskName || !projectName)
          return fallback;
        if (type.includes("SUBTASK")) {
          if (!subtaskName)
            return fallback;
          if (type.includes("DELETED")) {
            return `Sub-task "${subtaskName}" was deleted from Task "${taskName}" for Project "${projectName}".`;
          }
          if (status) {
            return `Sub-task "${subtaskName}" on Task "${taskName}" for Project "${projectName}" was marked as "${status}".`;
          }
          return `Sub-task "${subtaskName}" was added to Task "${taskName}" for Project "${projectName}".`;
        }
        if (type.includes("COMMENT")) {
          return `A comment was added to Task "${taskName}" for Project "${projectName}".`;
        }
        if (type.includes("STATUS")) {
          if (!status)
            return fallback;
          return `Task "${taskName}" for Project "${projectName}" status was changed to "${status}".`;
        }
        if (status) {
          return `Task "${taskName}" for Project "${projectName}" was ${actionWord} with status "${status}".`;
        }
        return `Task "${taskName}" for Project "${projectName}" was ${actionWord}.`;
      }
      case "Milestone": {
        const milestoneName = this.getMetaVal(m, ["milestone_name", "milestoneName", "name"]) || this.extractQuoted(detail, /milestone\s+"([^"]+)"/i);
        const subMilestoneName = this.getMetaVal(m, ["submilestone_name", "subMilestoneName", "sub_milestone_name"]);
        const metaProgress = this.getMetaVal(m, ["progress", "milestone_progress", "completion"]);
        let progress = metaProgress;
        if (progress == null) {
          const percentages = detail.match(/(\d+)%/g);
          if (percentages && percentages.length > 0) {
            progress = percentages[percentages.length - 1].replace("%", "");
          }
        }
        if (subMilestoneName) {
          if (!projectName || progress == null)
            return fallback;
          return `Sub-Milestone "${subMilestoneName}" for Project "${projectName}" reached ${progress}% completion.`;
        }
        if (!projectName || !milestoneName || progress == null)
          return fallback;
        return `Milestone "${milestoneName}" for Project "${projectName}" reached ${progress}% completion.`;
      }
      case "Timeline": {
        const event = this.getMetaVal(m, ["event"]);
        const fmtDate = (d) => this.formatDisplayDate(d);
        if (event === "timeline_created") {
          const msCount = this.getMetaVal(m, ["milestone_count"]);
          const subCount = this.getMetaVal(m, ["submilestone_count"]);
          const start = this.getMetaVal(m, ["start_date"]);
          const end = this.getMetaVal(m, ["end_date"]);
          let stmt = `Timeline created for Project "${projectName || "\u2014"}"`;
          if (msCount != null)
            stmt += ` with ${msCount} milestone(s)`;
          if (subCount != null && Number(subCount) > 0)
            stmt += ` and ${subCount} sub-milestone(s)`;
          if (start || end)
            stmt += ` scheduled from ${fmtDate(start)} to ${fmtDate(end)}`;
          return stmt + ".";
        }
        if (event === "milestone_added") {
          const milestoneName2 = this.getMetaVal(m, ["milestone_name"]);
          if (!milestoneName2)
            return fallback;
          return `Milestone "${milestoneName2}" was added to the project timeline with a planned duration from ${fmtDate(this.getMetaVal(m, ["start_date"]))} to ${fmtDate(this.getMetaVal(m, ["end_date"]))}.`;
        }
        if (event === "submilestone_added") {
          const subName = this.getMetaVal(m, ["submilestone_name"]);
          const parentName = this.getMetaVal(m, ["parent_milestone_name"]);
          if (!subName)
            return fallback;
          return `Sub-milestone "${subName}" was added under "${parentName || "\u2014"}", scheduled from ${fmtDate(this.getMetaVal(m, ["start_date"]))} to ${fmtDate(this.getMetaVal(m, ["end_date"]))}.`;
        }
        if (event === "bulk_updated") {
          const count = this.getMetaVal(m, ["count"]);
          return `Project timeline was updated. The schedule for ${count} milestone(s) was modified for Project "${projectName || "\u2014"}".`;
        }
        if (event === "milestone_date_changed") {
          const milestoneName2 = this.getMetaVal(m, ["milestone_name"]);
          if (!milestoneName2)
            return fallback;
          return `Milestone "${milestoneName2}" schedule was changed from ${fmtDate(this.getMetaVal(m, ["old_start_date"]))} \u2013 ${fmtDate(this.getMetaVal(m, ["old_end_date"]))} to ${fmtDate(this.getMetaVal(m, ["new_start_date"]))} \u2013 ${fmtDate(this.getMetaVal(m, ["new_end_date"]))}.`;
        }
        if (event === "submilestone_date_changed") {
          const subName = this.getMetaVal(m, ["submilestone_name"]);
          if (!subName)
            return fallback;
          return `Sub-milestone "${subName}" timeline was updated from ${fmtDate(this.getMetaVal(m, ["old_start_date"]))} \u2013 ${fmtDate(this.getMetaVal(m, ["old_end_date"]))} to ${fmtDate(this.getMetaVal(m, ["new_start_date"]))} \u2013 ${fmtDate(this.getMetaVal(m, ["new_end_date"]))}.`;
        }
        const taskName = this.getMetaVal(m, ["task_name", "taskName"]) || this.extractQuoted(detail, /task\s+"([^"]+)"/i);
        const milestoneName = this.getMetaVal(m, ["milestone_name", "milestoneName", "name"]) || this.extractQuoted(detail, /milestone\s+"([^"]+)"/i);
        const subMilestoneName = this.getMetaVal(m, ["submilestone_name", "subMilestoneName", "sub_milestone_name"]);
        if (taskName && subMilestoneName) {
          return `Task "${taskName}" is scheduled under Sub-Milestone "${subMilestoneName}" for Project "${projectName || "\u2014"}".`;
        }
        if (taskName && milestoneName) {
          return `Task "${taskName}" is scheduled under Milestone "${milestoneName}" for Project "${projectName || "\u2014"}".`;
        }
        if (milestoneName || subMilestoneName) {
          let stmt = "Schedule updated for";
          if (milestoneName)
            stmt += ` milestone "${milestoneName}"`;
          if (milestoneName && subMilestoneName)
            stmt += " and";
          if (subMilestoneName)
            stmt += ` sub-milestone "${subMilestoneName}"`;
          return stmt + ".";
        }
        return detail ? detail.charAt(0).toUpperCase() + detail.slice(1) + "." : fallback;
      }
      case "Budget": {
        const amount = this.getMetaVal(m, ["budget_allocation", "budget", "amount", "total"]);
        if (amount == null)
          return fallback;
        const amt = Number(amount) || 0;
        return `Budget of \u20B9${amt.toLocaleString("en-IN")} was ${actionWord} for Project "${projectName || "\u2014"}".`;
      }
      case "Document": {
        const metaFileName = this.getMetaVal(m, ["file_name", "fileName", "document_name", "documentName", "name"]);
        const fileName = metaFileName || this.findDocumentNameNearTime(h.createdAt, ctx.documents);
        if (!fileName)
          return fallback;
        return `Document "${fileName}" was ${actionWord} for Project "${projectName || "\u2014"}".`;
      }
      default:
        return fallback;
    }
  }
  parseMeta(meta) {
    if (!meta)
      return {};
    if (typeof meta === "string") {
      try {
        return JSON.parse(meta);
      } catch {
        return {};
      }
    }
    return meta;
  }
  buildProjectDisplayEvents(rec) {
    const fallbackUser = this.currentUserDisplayName();
    return (rec.rawHistory || []).map((h) => {
      const category = this.mapCategory(h.action_type);
      const date = new Date(h.createdAt);
      const actorName = h.user ? this.cleanName(`${h.user.firstname} ${h.user.lastname}`) : null;
      const rowMeta = this.buildRowMeta(h, actorName, fallbackUser);
      const statement = this.buildStatement(h, category, rec.context);
      return __spreadProps(__spreadValues({}, h), {
        category,
        icon: this.mapIcon(category),
        colorClass: this.mapColor(category),
        dateLabel: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        timeLabel: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        userName: actorName || fallbackUser,
        statement,
        projectLabel: rec.context.name || void 0,
        metaCreatedAt: rowMeta.createdAt,
        metaCreatedBy: rowMeta.createdBy,
        metaUpdatedAt: rowMeta.updatedAt,
        metaUpdatedBy: rowMeta.updatedBy
      });
    });
  }
  get displayHistory() {
    const ids = this.effectiveIds;
    const selectedKey = [...ids].map(String).sort().join(",");
    const loadedKey = ids.filter((id) => this.records[String(id)]?.loaded).map(String).join(",");
    const key = `${selectedKey}|${loadedKey}`;
    if (this._displayCache?.key === key)
      return this._displayCache.events;
    const events = [];
    ids.forEach((id) => {
      const rec = this.records[String(id)];
      if (rec?.loaded)
        events.push(...this.buildProjectDisplayEvents(rec));
    });
    const sorted = events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    this._displayCache = { key, events: sorted };
    this.tabs.forEach((tab) => {
      tab.count = tab.key === "All" ? sorted.length : sorted.filter((h) => h.category === tab.key).length;
    });
    return sorted;
  }
  get filteredDisplayHistory() {
    const all = this.displayHistory;
    let filtered = this.activeTab === "All" ? all : all.filter((h) => h.category === this.activeTab);
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((h) => h.statement?.toLowerCase().includes(q) || h.projectLabel?.toLowerCase().includes(q) || h.userName?.toLowerCase().includes(q) || h.metaCreatedBy?.toLowerCase().includes(q) || h.metaUpdatedBy?.toLowerCase().includes(q) || this.getActionLabel(h.action_type)?.toLowerCase().includes(q));
    }
    return filtered;
  }
  get totalFilteredEntries() {
    return this.filteredDisplayHistory.length;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.totalFilteredEntries / this.pageSize));
  }
  get paginatedDisplayHistory() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDisplayHistory.slice(start, start + this.pageSize);
  }
  get pageStartIndex() {
    return this.totalFilteredEntries === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }
  get pageEndIndex() {
    return Math.min(this.currentPage * this.pageSize, this.totalFilteredEntries);
  }
  get pageNumbers() {
    const total = this.totalPages;
    const current = this.currentPage;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const pages = [];
    for (let i = start; i <= end; i++)
      pages.push(i);
    return pages;
  }
  goToPage(page) {
    if (page < 1 || page > this.totalPages)
      return;
    this.currentPage = page;
  }
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
  get groupedHistory() {
    const ids = this.effectiveIds;
    const selectedKey = [...ids].map(String).sort().join(",");
    const loadedKey = ids.filter((id) => this.records[String(id)]?.loaded).map(String).join(",");
    const key = `${selectedKey}|${loadedKey}|${this.activeTab}|${this.searchQuery}|${this.currentPage}`;
    if (this._groupCache?.key === key)
      return this._groupCache.groups;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    const filtered = this.paginatedDisplayHistory;
    const groups = {};
    filtered.forEach((h) => {
      if (!groups[h.dateLabel])
        groups[h.dateLabel] = [];
      groups[h.dateLabel].push(h);
    });
    const result = Object.keys(groups).map((date) => ({ date, entries: groups[date] }));
    this._groupCache = { key, groups: result };
    return result;
  }
  setActiveTab(tab) {
    this.activeTab = tab;
    this.currentPage = 1;
  }
  onSearchChange() {
    this._groupCache = null;
    this.currentPage = 1;
  }
  exportCsv() {
    const rows = [
      ["Date", "Time", "Project", "Category", "Action", "Detail", "User", "Created At", "Created By", "Updated At", "Updated By"],
      ...this.displayHistory.map((h) => [
        h.dateLabel,
        h.timeLabel,
        h.projectLabel || "\u2014",
        h.category,
        this.getActionLabel(h.action_type),
        h.statement || h.detail || "",
        h.userName,
        h.metaCreatedAt || "\u2014",
        h.metaCreatedBy || "\u2014",
        h.metaUpdatedAt || "\u2014",
        h.metaUpdatedBy || "\u2014"
      ])
    ];
    const csvContent = rows.map((r) => r.map((c) => `"${(c || "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `project-history-${this.projectId || "all"}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
  static \u0275fac = function ProjectHistory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectHistory)(\u0275\u0275directiveInject(ProjectHistoryServices), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectHistory, selectors: [["app-project-history"]], hostBindings: function ProjectHistory_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function ProjectHistory_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { projectId: "projectId" }, standalone: false, features: [\u0275\u0275NgOnChangesFeature], decls: 31, vars: 6, consts: [[1, "px-4", "pt-2", "pb-8", "flex", "flex-col", "gap-5", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-4"], [1, "space-y-1"], [1, "text-3xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "mt-1", "text-sm", "font-medium"], [1, "flex", "items-center", "gap-3", "flex-wrap"], ["data-dropdown", "project", 1, "relative"], [1, "flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-full", "font-bold", "text-sm", "bg-surface-container-highest", "text-primary", "hover:bg-surface-dim", "transition-colors", "cursor-pointer", "border-none", 3, "click"], [1, "material-symbols-outlined", "text-lg"], [1, "flex", "items-center", "gap-1.5", "overflow-x-auto", "pb-1", "-mx-1", "px-1"], [1, "flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-full", "text-sm", "font-bold", "whitespace-nowrap", "transition-colors", "cursor-pointer", "shrink-0", "border-none", 3, "ngClass"], [1, "flex", "items-center", "gap-2", "flex-wrap", "-mt-2"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap"], [1, "text-lg", "font-black", "text-on-surface"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-outline-variant/20", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "max-w-[320px]"], [1, "material-symbols-outlined", "text-outline", "text-[20px]"], ["type", "text", "placeholder", "Search history...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "py-16", "flex", "flex-col", "items-center", "gap-3", "text-outline", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-outline-variant/10"], [1, "py-16", "flex", "flex-col", "items-center", "gap-2", "text-outline", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-outline-variant/10"], [1, "bg-red-50", "dark:bg-red-900/20", "border", "border-red-100", "dark:border-red-800", "p-8", "rounded-2xl", "text-center"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "rounded-xl", "font-bold", "text-sm", "bg-white", "dark:bg-slate-900", "border", "border-outline-variant/20", "text-on-surface", "hover:bg-surface-container-low", "transition-colors", "cursor-pointer", "shadow-sm", "min-w-[200px]", 3, "click"], [1, "material-symbols-outlined", "text-primary", "text-lg"], [1, "flex-1", "text-left", "truncate"], [1, "material-symbols-outlined", "text-outline", "text-base", "transition-transform", "duration-200"], [1, "absolute", "right-0", "top-full", "mt-1.5", "w-72", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-outline-variant/20", "shadow-xl", "z-50", "overflow-hidden"], [1, "px-3", "py-2.5", "border-b", "border-outline-variant/10"], [1, "relative"], [1, "absolute", "left-2.5", "top-1/2", "-translate-y-1/2", "material-symbols-outlined", "text-outline", "text-[15px]"], ["type", "text", "placeholder", "Search projects\u2026", 1, "w-full", "pl-8", "pr-3", "py-1.5", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-surface-container-lowest", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "border-b", "border-outline-variant/10", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "transition-all", 3, "ngClass"], [1, "material-symbols-outlined", "text-white", "text-[11px]"], [1, "material-symbols-outlined", "text-primary", "text-[11px]"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-black", "text-on-surface"], [1, "text-[10px]", "text-outline"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded-full", "bg-primary/10", "text-primary"], [1, "max-h-60", "overflow-y-auto"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "border-b", "border-outline-variant/5"], [1, "py-6", "text-center", "text-outline"], [1, "px-4", "py-2.5", "border-t", "border-outline-variant/10", "bg-surface-container-low", "flex", "items-center", "justify-between", "gap-3"], [1, "flex", "gap-3", "text-[10px]", "font-bold", "text-outline"], [1, "text-green-600", "font-black"], [1, "text-amber-600", "font-black"], [1, "text-[11px]", "font-black", "text-primary", "hover:underline", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-surface-container-low", "transition-colors", "border-b", "border-outline-variant/5", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "shrink-0", "transition-all", 3, "ngClass"], [1, "w-7", "h-7", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", 3, "ngClass"], [1, "text-xs", "font-bold", "truncate", "text-on-surface"], [1, "flex", "items-center", "gap-1.5", "mt-0.5", "flex-wrap"], [1, "text-[9px]", "font-bold", "px-1.5", "py-0.5", "rounded-full", 3, "ngClass"], [1, "text-[10px]", "font-semibold", "text-slate-400"], [1, "text-[9px]", "text-outline", "font-semibold"], [1, "material-symbols-outlined", "text-2xl"], [1, "text-xs", "font-bold", "mt-1"], [1, "flex", "items-center", "gap-1.5", "px-4", "py-2", "rounded-full", "text-sm", "font-bold", "whitespace-nowrap", "transition-colors", "cursor-pointer", "shrink-0", "border-none", 3, "click", "ngClass"], [1, "text-[10px]", "font-black", "px-1.5", "py-0.5", "rounded-full", 3, "ngClass"], [1, "text-xs", "font-black", "text-outline", "uppercase", "tracking-wide"], [1, "flex", "items-center", "gap-1.5", "pl-3", "pr-2", "py-1", "rounded-full", "bg-primary/10", "text-primary", "text-xs", "font-bold"], [1, "text-xs", "font-bold", "text-outline", "underline", "hover:text-primary", "transition-colors", "border-none", "bg-transparent", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[14px]", "leading-none", "border-none", "bg-transparent", "cursor-pointer", "text-primary", "hover:text-primary/70", "p-0", 3, "click"], [1, "material-symbols-outlined", "text-3xl", "animate-spin"], [1, "text-sm", "font-bold"], [1, "material-symbols-outlined", "text-4xl"], [1, "material-symbols-outlined", "text-red-600", "text-4xl", "mb-3"], [1, "text-sm", "font-bold", "text-red-700", "dark:text-red-400"], [1, "mt-4", "px-6", "py-2.5", "bg-red-600", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", "hover:bg-red-700", "transition-all", "border-none", "cursor-pointer", 3, "click"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap", "px-1", "pt-2", "pb-1", "border-t", "border-outline-variant/10", "mt-1"], [1, "text-xs", "text-outline/70"], [1, "flex", "items-center", "gap-3", "px-1"], [1, "w-9", "h-9", "rounded-xl", "bg-primary/10", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-primary", "text-[16px]"], [1, "text-sm", "font-black", "text-on-surface"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-primary/10", "text-primary", "shrink-0"], [1, "ml-4", "pl-7", "border-l-2", "border-dashed", "border-outline-variant/20", "flex", "flex-col", "gap-2"], [1, "relative", "bg-white", "dark:bg-slate-900", "border", "border-outline-variant/10", "rounded-2xl", "shadow-sm", "hover:bg-surface-container-low", "transition-colors"], [1, "absolute", "-left-[33px]", "top-4", "w-3", "h-3", "rounded-full", "border-2", "border-white", "dark:border-slate-950", "shadow-sm", 3, "ngClass"], [1, "flex", "items-start", "gap-3", "px-4", "py-3.5"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "mt-0.5", 3, "ngClass"], [1, "material-symbols-outlined", "text-[16px]"], [1, "flex", "items-center", "gap-2", "flex-wrap", "mb-1"], [1, "text-[9px]", "font-black", "px-2", "py-0.5", "rounded-full", "uppercase", "tracking-wide", 3, "ngClass"], [1, "text-sm", "font-semibold", "text-on-surface", "leading-snug", 2, "white-space", "pre-line"], [1, "flex", "flex-col", "gap-3", "shrink-0", 2, "min-width", "210px", "max-width", "260px"], [1, "rounded-xl", "border", "border-pink-200", "dark:border-pink-800/40", "bg-pink-50/60", "dark:bg-pink-900/10", "px-3", "py-2", "shadow-sm"], [1, "rounded-xl", "border", "border-blue-200", "dark:border-blue-800/40", "bg-blue-50/60", "dark:bg-blue-900/10", "px-3", "py-2", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "flex", "items-center", "justify-between", "gap-2", "mt-1"], [1, "text-[8px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-pink-100", "text-pink-700", "whitespace-nowrap", "max-w-[140px]", "truncate"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-pink-100", "text-pink-700", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-blue-100", "text-blue-700", "whitespace-nowrap", "max-w-[140px]", "truncate"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-blue-100", "text-blue-700", "whitespace-nowrap"], [1, "text-xs", "font-semibold", "text-outline"], [1, "font-black", "text-on-surface"], [1, "flex", "items-center", "gap-1"], ["title", "Previous page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-surface-container-low", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-[18px]"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "border-none", 3, "ngClass"], ["title", "Next page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-surface-container-low", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click", "disabled"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "text-slate-500", "hover:bg-surface-container-low", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click"], [1, "px-1", "text-xs", "font-bold", "text-outline"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "border-none", 3, "click", "ngClass"]], template: function ProjectHistory_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Project History");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, " Complete activity timeline \u2014 milestones, tasks, documents, budget & team changes. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275conditionalCreate(8, ProjectHistory_Conditional_8_Template, 9, 4, "div", 6);
      \u0275\u0275elementStart(9, "button", 7);
      \u0275\u0275listener("click", function ProjectHistory_Template_button_click_9_listener() {
        return ctx.exportCsv();
      });
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " Export All (CSV) ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 9);
      \u0275\u0275repeaterCreate(14, ProjectHistory_For_15_Template, 3, 3, "button", 10, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, ProjectHistory_Conditional_16_Template, 7, 0, "div", 11);
      \u0275\u0275elementStart(17, "div", 12)(18, "div")(19, "h3", 13);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, ProjectHistory_Conditional_21_Template, 0, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 14)(23, "span", 15);
      \u0275\u0275text(24, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function ProjectHistory_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function ProjectHistory_Template_input_ngModelChange_25_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(26, ProjectHistory_Conditional_26_Template, 5, 0, "div", 17)(27, ProjectHistory_Conditional_27_Template, 5, 0, "div", 18)(28, ProjectHistory_Conditional_28_Template, 5, 0, "div", 17)(29, ProjectHistory_Conditional_29_Template, 7, 1, "div", 19)(30, ProjectHistory_Conditional_30_Template, 4, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.projects.length > 0 ? 8 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.projects.length > 0 && ctx.selectedProjectIds.length > 0 && ctx.selectedProjectIds.length < ctx.projects.length ? 16 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.sectionHeadingLabel, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab !== "All" ? 21 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loadingProjects ? 26 : !ctx.projectId && ctx.selectedProjectIds.length === 0 && ctx.projects.length === 0 ? 27 : ctx.loading ? 28 : ctx.error ? 29 : 30);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectHistory, [{
    type: Component,
    args: [{ selector: "app-project-history", standalone: false, template: `<section class="px-4 pt-2 pb-8 flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
\r
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">\r
    <div class="space-y-1">\r
      <h2 class="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Project History</h2>\r
      <p class="text-slate-500 mt-1 text-sm font-medium">\r
        Complete activity timeline \u2014 milestones, tasks, documents, budget &amp; team changes.\r
      </p>\r
    </div>\r
\r
    <div class="flex items-center gap-3 flex-wrap">\r
\r
      @if (projects.length > 0) {\r
      <div class="relative" data-dropdown="project">\r
        <button (click)="toggleDropdown()"\r
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-outline-variant/20 text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer shadow-sm min-w-[200px]">\r
          <span class="material-symbols-outlined text-primary text-lg">apartment</span>\r
          <span class="flex-1 text-left truncate">{{ projectSelectorLabel }}</span>\r
          <span class="material-symbols-outlined text-outline text-base transition-transform duration-200"\r
            [class.rotate-180]="dropdownOpen">expand_more</span>\r
        </button>\r
\r
        @if (dropdownOpen) {\r
        <div\r
          class="absolute right-0 top-full mt-1.5 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/20 shadow-xl z-50 overflow-hidden">\r
\r
          <div class="px-3 py-2.5 border-b border-outline-variant/10">\r
            <div class="relative">\r
              <span\r
                class="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[15px]">search</span>\r
              <input [(ngModel)]="projectSearchQuery" (ngModelChange)="onProjectSearch()" type="text"\r
                placeholder="Search projects\u2026"\r
                class="w-full pl-8 pr-3 py-1.5 rounded-xl border border-outline-variant/20 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest" />\r
            </div>\r
          </div>\r
\r
          <div (click)="toggleAllProjects()"\r
            class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant/10">\r
            <div class="w-4 h-4 rounded flex items-center justify-center border-2 transition-all"\r
              [ngClass]="isAllSelected ? 'bg-primary border-primary' : isPartiallySelected ? 'bg-primary/30 border-primary' : 'border-outline/40 bg-white dark:bg-slate-800'">\r
              @if (isAllSelected) {\r
              <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
              } @else if (isPartiallySelected) {\r
              <span class="material-symbols-outlined text-primary text-[11px]">remove</span>\r
              }\r
            </div>\r
            <div class="flex-1 min-w-0">\r
              <p class="text-xs font-black text-on-surface">All Projects</p>\r
              <p class="text-[10px] text-outline">{{ projects.length }} total</p>\r
            </div>\r
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">\r
              {{ selectedProjectIds.length }}/{{ projects.length }}\r
            </span>\r
          </div>\r
\r
          <div class="max-h-60 overflow-y-auto">\r
            @for (p of filteredProjects; track p.id) {\r
            <div (click)="toggleProject(p)"\r
              class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant/5">\r
              <div class="w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all"\r
                [ngClass]="isProjectSelected(p) ? 'bg-primary border-primary' : 'border-outline/40 bg-white dark:bg-slate-800'">\r
                @if (isProjectSelected(p)) {\r
                <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
                }\r
              </div>\r
              <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"\r
                [ngClass]="isProjectSelected(p) ? 'bg-primary/15' : 'bg-surface-container-high'">\r
                <span class="material-symbols-outlined text-[14px]"\r
                  [ngClass]="isProjectSelected(p) ? 'text-primary' : 'text-outline'">business</span>\r
              </div>\r
              <div class="flex-1 min-w-0">\r
                <p class="text-xs font-bold truncate text-on-surface">{{ p.name }}</p>\r
                <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">\r
                  @if (p.status) {\r
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full"\r
                    [ngClass]="(p.status || '').toLowerCase() === 'active' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'">\r
                    {{ p.status }}\r
                  </span>\r
                  }\r
                  @if (p.progress !== undefined && p.progress !== null) {\r
                  <span class="text-[10px] font-semibold text-slate-400">{{ p.progress }}%</span>\r
                  }\r
                  @if (p.createdAt) {\r
                  <span class="text-[9px] text-outline font-semibold">\xB7 Since {{ formatShortDate(p.createdAt) }}</span>\r
                  }\r
                </div>\r
              </div>\r
            </div>\r
            } @empty {\r
            <div class="py-6 text-center text-outline">\r
              <span class="material-symbols-outlined text-2xl">search_off</span>\r
              <p class="text-xs font-bold mt-1">No projects found</p>\r
            </div>\r
            }\r
          </div>\r
\r
          <div\r
            class="px-4 py-2.5 border-t border-outline-variant/10 bg-surface-container-low flex items-center justify-between gap-3">\r
            <div class="flex gap-3 text-[10px] font-bold text-outline">\r
              <span>Active: <span class="text-green-600 font-black">{{ activeProjectsCount }}</span></span>\r
              <span>Pending: <span class="text-amber-600 font-black">{{ pendingProjectsCount }}</span></span>\r
            </div>\r
            <button (click)="closeDropdown()"\r
              class="text-[11px] font-black text-primary hover:underline cursor-pointer">Done</button>\r
          </div>\r
        </div>\r
        }\r
      </div>\r
      }\r
\r
      <button (click)="exportCsv()"\r
        class="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-surface-container-highest text-primary hover:bg-surface-dim transition-colors cursor-pointer border-none">\r
        <span class="material-symbols-outlined text-lg">download</span>\r
        Export All (CSV)\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div class="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">\r
    @for (tab of tabs; track tab.key) {\r
    <button (click)="setActiveTab(tab.key)"\r
      class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 border-none"\r
      [ngClass]="activeTab === tab.key\r
        ? 'bg-primary text-white shadow-sm'\r
        : 'bg-surface-container-low text-slate-500 hover:bg-surface-container'">\r
      {{ tab.label }}\r
      @if (tab.count > 0) {\r
      <span class="text-[10px] font-black px-1.5 py-0.5 rounded-full"\r
        [ngClass]="activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'">\r
        {{ tab.count }}\r
      </span>\r
      }\r
    </button>\r
    }\r
  </div>\r
\r
  @if (projects.length > 0 && selectedProjectIds.length > 0 && selectedProjectIds.length < projects.length) { <div\r
    class="flex items-center gap-2 flex-wrap -mt-2">\r
    <span class="text-xs font-black text-outline uppercase tracking-wide">Showing:</span>\r
    @for (p of selectedProjectsList; track p.id) {\r
    <span class="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">\r
      {{ p.name }}\r
      <button (click)="removeProjectChip(p.id)"\r
        class="material-symbols-outlined text-[14px] leading-none border-none bg-transparent cursor-pointer text-primary hover:text-primary/70 p-0">\r
        close\r
      </button>\r
    </span>\r
    }\r
    <button (click)="clearAllChips()"\r
      class="text-xs font-bold text-outline underline hover:text-primary transition-colors border-none bg-transparent cursor-pointer">\r
      Clear all\r
    </button>\r
    </div>\r
    }\r
\r
    <div class="flex items-center justify-between gap-3 flex-wrap">\r
      <div>\r
        <h3 class="text-lg font-black text-on-surface">\r
          {{ sectionHeadingLabel }}\r
        </h3>\r
        @if (activeTab !== 'All') {\r
        }\r
      </div>\r
\r
      <div\r
        class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-outline-variant/20 bg-white dark:bg-slate-900 shadow-sm w-full max-w-[320px]">\r
        <span class="material-symbols-outlined text-outline text-[20px]">search</span>\r
        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()" placeholder="Search history..."\r
          class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
      </div>\r
    </div>\r
\r
    @if (loadingProjects) {\r
    <div\r
      class="py-16 flex flex-col items-center gap-3 text-outline bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/10">\r
      <span class="material-symbols-outlined text-3xl animate-spin">progress_activity</span>\r
      <p class="text-sm font-bold">Loading projects\u2026</p>\r
    </div>\r
    }\r
\r
    @else if (!projectId && selectedProjectIds.length === 0 && projects.length === 0) {\r
    <div\r
      class="py-16 flex flex-col items-center gap-2 text-outline bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/10">\r
      <span class="material-symbols-outlined text-4xl">folder_off</span>\r
      <p class="text-sm font-bold">Select a project to view its history.</p>\r
    </div>\r
    }\r
\r
    @else if (loading) {\r
    <div\r
      class="py-16 flex flex-col items-center gap-3 text-outline bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/10">\r
      <span class="material-symbols-outlined text-3xl animate-spin">progress_activity</span>\r
      <p class="text-sm font-bold">Loading history\u2026</p>\r
    </div>\r
    }\r
\r
    @else if (error) {\r
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-8 rounded-2xl text-center">\r
      <span class="material-symbols-outlined text-red-600 text-4xl mb-3">warning_amber</span>\r
      <p class="text-sm font-bold text-red-700 dark:text-red-400">{{ error }}</p>\r
      <button (click)="fetchHistory()"\r
        class="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all border-none cursor-pointer">\r
        Retry\r
      </button>\r
    </div>\r
    }\r
\r
    @else {\r
\r
    @if (groupedHistory.length === 0) {\r
    <div\r
      class="py-16 flex flex-col items-center gap-2 text-outline bg-white dark:bg-slate-900 rounded-2xl border border-outline-variant/10">\r
      <span class="material-symbols-outlined text-4xl">history</span>\r
      @if (selectedProjectIds.length === 0 && projects.length > 0) {\r
      <p class="text-sm font-bold">No project selected.</p>\r
      <p class="text-xs text-outline/70">Select at least one project from the dropdown above.</p>\r
      } @else if (searchQuery.trim()) {\r
      <p class="text-sm font-bold">No results for "{{ searchQuery }}".</p>\r
      <p class="text-xs text-outline/70">Try a different search term or tab.</p>\r
      } @else {\r
      <p class="text-sm font-bold">No "{{ activeTab }}" entries found.</p>\r
      <p class="text-xs text-outline/70">Try selecting a different tab or project.</p>\r
      }\r
    </div>\r
    }\r
\r
    @for (group of groupedHistory; track group.date) {\r
    <div class="flex flex-col gap-2">\r
\r
      <div class="flex items-center gap-3 px-1">\r
        <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">\r
          <span class="material-symbols-outlined text-primary text-[16px]">calendar_today</span>\r
        </div>\r
        <div class="flex-1 min-w-0">\r
          <h4 class="text-sm font-black text-on-surface">{{ group.date }}</h4>\r
        </div>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">\r
          {{ group.entries.length }}\r
        </span>\r
      </div>\r
\r
      <div class="ml-4 pl-7 border-l-2 border-dashed border-outline-variant/20 flex flex-col gap-2">\r
        @for (entry of group.entries; track entry.id) {\r
\r
        <div\r
          class="relative bg-white dark:bg-slate-900 border border-outline-variant/10 rounded-2xl shadow-sm hover:bg-surface-container-low transition-colors">\r
\r
          <div\r
            class="absolute -left-[33px] top-4 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 shadow-sm"\r
            [ngClass]="entry.colorClass"></div>\r
\r
          <div class="flex items-start gap-3 px-4 py-3.5">\r
\r
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"\r
              [ngClass]="entry.colorClass">\r
              <span class="material-symbols-outlined text-[16px]">{{ entry.icon }}</span>\r
            </div>\r
\r
            <div class="flex-1 min-w-0">\r
              <div class="flex items-center gap-2 flex-wrap mb-1">\r
                <span class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide"\r
                  [ngClass]="entry.colorClass">\r
                  {{ entry.category }}\r
                </span>\r
              </div>\r
              <p class="text-sm font-semibold text-on-surface leading-snug" style="white-space: pre-line">\r
                {{ entry.statement }}\r
              </p>\r
            </div>\r
\r
            <div class="flex flex-col gap-3 shrink-0" style="min-width: 210px; max-width: 260px;">\r
\r
              @if (entry.metaCreatedBy || entry.metaCreatedAt) {\r
              <div\r
                class="rounded-xl border border-pink-200 dark:border-pink-800/40 bg-pink-50/60 dark:bg-pink-900/10 px-3 py-2 shadow-sm">\r
                @if (entry.metaCreatedBy) {\r
                <div class="flex items-center justify-between gap-2">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
                    By:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap max-w-[140px] truncate">\r
                    {{ entry.metaCreatedBy }}\r
                  </span>\r
                </div>\r
                }\r
                @if (entry.metaCreatedAt) {\r
                <div class="flex items-center justify-between gap-2 mt-1">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
                    At:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap">\r
                    {{ entry.metaCreatedAt }}\r
                  </span>\r
                </div>\r
                }\r
              </div>\r
              }\r
\r
              @if (entry.metaUpdatedBy || entry.metaUpdatedAt) {\r
              <div\r
                class="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50/60 dark:bg-blue-900/10 px-3 py-2 shadow-sm">\r
                @if (entry.metaUpdatedBy) {\r
                <div class="flex items-center justify-between gap-2">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Updated\r
                    By:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap max-w-[140px] truncate">\r
                    {{ entry.metaUpdatedBy }}\r
                  </span>\r
                </div>\r
                }\r
                @if (entry.metaUpdatedAt) {\r
                <div class="flex items-center justify-between gap-2 mt-1">\r
                  <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Updated\r
                    At:</span>\r
                  <span\r
                    class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">\r
                    {{ entry.metaUpdatedAt }}\r
                  </span>\r
                </div>\r
                }\r
              </div>\r
              }\r
\r
            </div>\r
\r
          </div>\r
        </div>\r
        }\r
      </div>\r
    </div>\r
    }\r
\r
    @if (totalFilteredEntries > 0) {\r
    <div\r
      class="flex items-center justify-between gap-3 flex-wrap px-1 pt-2 pb-1 border-t border-outline-variant/10 mt-1">\r
      <p class="text-xs font-semibold text-outline">\r
        Showing <span class="font-black text-on-surface">{{ pageStartIndex }}\u2013{{ pageEndIndex }}</span>\r
        of <span class="font-black text-on-surface">{{ totalFilteredEntries }}</span> entries\r
      </p>\r
\r
      <div class="flex items-center gap-1">\r
        <button (click)="prevPage()" [disabled]="currentPage === 1"\r
          class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-none bg-transparent"\r
          title="Previous page">\r
          <span class="material-symbols-outlined text-[18px]">chevron_left</span>\r
        </button>\r
\r
        @if (pageNumbers[0] > 1) {\r
        <button (click)="goToPage(1)"\r
          class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-surface-container-low cursor-pointer transition-colors border-none bg-transparent">\r
          1\r
        </button>\r
        @if (pageNumbers[0] > 2) {\r
        <span class="px-1 text-xs font-bold text-outline">\u2026</span>\r
        }\r
        }\r
\r
        @for (p of pageNumbers; track p) {\r
        <button (click)="goToPage(p)"\r
          class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-colors border-none"\r
          [ngClass]="p === currentPage ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-surface-container-low bg-transparent'">\r
          {{ p }}\r
        </button>\r
        }\r
\r
        @if (pageNumbers[pageNumbers.length - 1] < totalPages) { @if (pageNumbers[pageNumbers.length - 1] < totalPages -\r
          1) { <span class="px-1 text-xs font-bold text-outline">\u2026</span>\r
          }\r
          <button (click)="goToPage(totalPages)"\r
            class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-surface-container-low cursor-pointer transition-colors border-none bg-transparent">\r
            {{ totalPages }}\r
          </button>\r
          }\r
\r
          <button (click)="nextPage()" [disabled]="currentPage === totalPages"\r
            class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-none bg-transparent"\r
            title="Next page">\r
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>\r
          </button>\r
      </div>\r
    </div>\r
    }\r
    }\r
</section>` }]
  }], () => [{ type: ProjectHistoryServices }, { type: ProjectService }, { type: ToastrService }, { type: ActivatedRoute }], { projectId: [{
    type: Input
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectHistory, { className: "ProjectHistory", filePath: "app/modules/history/project-history/project-history.ts", lineNumber: 52 });
})();

// src/app/modules/history/material-inventory-history/material-inventory-history-services.ts
var MaterialInventoryHistoryServices = class _MaterialInventoryHistoryServices {
  http;
  baseUrl = `${environment.serverUrl}/api/v1`;
  historySubject = new BehaviorSubject([]);
  history$ = this.historySubject.asObservable();
  loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadMaterialHistory() {
    this.loadingSubject.next(true);
    this.http.get(`${this.baseUrl}/getAllMaterialHistory`).subscribe({
      next: (res) => {
        const flattened = this.flattenHistory(res?.data || []);
        this.historySubject.next(flattened);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error("Failed to load material history", err);
        this.historySubject.next([]);
        this.loadingSubject.next(false);
      }
    });
  }
  flattenHistory(rawData) {
    const flattened = rawData.map((item) => __spreadProps(__spreadValues({}, item), {
      id: `hist-${item.id}`,
      status: (item.status || "UPDATED").toUpperCase()
    }));
    return flattened.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }
  getMaterialHistoryById(id) {
    return this.http.get(`${this.baseUrl}/getMaterialHistoryById/${id}`);
  }
  getMaterialHistoryByMaterialId(materialId) {
    return this.http.get(`${this.baseUrl}/getMaterialHistoryByMaterialId/${materialId}`);
  }
  getMaterialHistoryByMaterialMasterId(masterId) {
    return this.http.get(`${this.baseUrl}/getMaterialHistoryByMaterialMasterId/${masterId}`);
  }
  static \u0275fac = function MaterialInventoryHistoryServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaterialInventoryHistoryServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MaterialInventoryHistoryServices, factory: _MaterialInventoryHistoryServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialInventoryHistoryServices, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/history/material-inventory-history/material-inventory-history.ts
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack13 = ($index, $item) => $item.dateLabel;
function MaterialInventoryHistory_Conditional_16_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function MaterialInventoryHistory_Conditional_16_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "remove");
    \u0275\u0275elementEnd();
  }
}
function MaterialInventoryHistory_Conditional_16_For_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function MaterialInventoryHistory_Conditional_16_For_19_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 Since ", \u0275\u0275pipeBind2(2, 1, m_r4.since, "dd/MMM/yyyy"));
  }
}
function MaterialInventoryHistory_Conditional_16_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_16_For_19_Template_div_click_0_listener() {
      const m_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMaterial(m_r4.id));
    });
    \u0275\u0275elementStart(1, "div", 48);
    \u0275\u0275conditionalCreate(2, MaterialInventoryHistory_Conditional_16_For_19_Conditional_2_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "span", 50);
    \u0275\u0275text(5, "inventory_2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "p", 51);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 52)(10, "span", 53);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 54);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, MaterialInventoryHistory_Conditional_16_For_19_Conditional_14_Template, 3, 4, "span", 55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isMaterialChecked(m_r4.id) ? "bg-primary border-primary" : "border-slate-300 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isMaterialChecked(m_r4.id) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isMaterialChecked(m_r4.id) ? "bg-primary/15" : "bg-slate-100 dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isMaterialChecked(m_r4.id) ? "text-primary" : "text-slate-400");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(m_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getMaterialStatusClass(m_r4.utilization));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getMaterialStatusLabel(m_r4.utilization), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-green-600", m_r4.utilization >= 90)("text-amber-500", m_r4.utilization < 90 && m_r4.utilization >= 70)("text-red-500", m_r4.utilization < 70);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", m_r4.utilization, "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r4.since ? 14 : -1);
  }
}
function MaterialInventoryHistory_Conditional_16_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 56);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 57);
    \u0275\u0275text(4, "No materials found");
    \u0275\u0275elementEnd()();
  }
}
function MaterialInventoryHistory_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_16_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 27)(2, "div", 28)(3, "span", 29);
    \u0275\u0275text(4, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function MaterialInventoryHistory_Conditional_16_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.materialSearchQuery, $event) || (ctx_r1.materialSearchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 31);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_16_Template_div_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleAllMaterials());
    });
    \u0275\u0275elementStart(7, "div", 32);
    \u0275\u0275conditionalCreate(8, MaterialInventoryHistory_Conditional_16_Conditional_8_Template, 2, 0, "span", 33)(9, MaterialInventoryHistory_Conditional_16_Conditional_9_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 35)(11, "p", 36);
    \u0275\u0275text(12, "All Materials");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 37);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 38);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 39);
    \u0275\u0275repeaterCreate(18, MaterialInventoryHistory_Conditional_16_For_19_Template, 15, 15, "div", 40, _forTrack03, false, MaterialInventoryHistory_Conditional_16_ForEmpty_20_Template, 5, 0, "div", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 42)(22, "div", 43)(23, "span");
    \u0275\u0275text(24, "Active: ");
    \u0275\u0275elementStart(25, "span", 44);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Pending: ");
    \u0275\u0275elementStart(29, "span", 45);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "button", 46);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_16_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyFilterDone());
    });
    \u0275\u0275text(32, "Done");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.materialSearchQuery);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.allMaterialsSelected ? "bg-primary border-primary" : ctx_r1.isPartiallySelected ? "bg-primary/30 border-primary" : "border-slate-300 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allMaterialsSelected ? 8 : ctx_r1.isPartiallySelected ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.uniqueMaterials.length, " total");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.selectedMaterialIds.size, "/", ctx_r1.uniqueMaterials.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.filteredMaterialOptions);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.activeMaterialsCount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.pendingMaterialsCount);
  }
}
function MaterialInventoryHistory_For_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.selectedTab === tab_r6 ? "bg-white/25 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.tabCounts[tab_r6], " ");
  }
}
function MaterialInventoryHistory_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function MaterialInventoryHistory_For_23_Template_button_click_0_listener() {
      const tab_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeTab(tab_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, MaterialInventoryHistory_For_23_Conditional_2_Template, 2, 3, "span", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.selectedTab === tab_r6 ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-dim");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r6, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.tabCounts[tab_r6] > 0 ? 2 : -1);
  }
}
function MaterialInventoryHistory_Conditional_24_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 64);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_24_For_4_Template_button_click_2_listener() {
      const m_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeMaterialChip(m_r9.id));
    });
    \u0275\u0275text(3, " close ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r9.name, " ");
  }
}
function MaterialInventoryHistory_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 61);
    \u0275\u0275text(2, "Showing:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, MaterialInventoryHistory_Conditional_24_For_4_Template, 4, 1, "span", 62, _forTrack03);
    \u0275\u0275elementStart(5, "button", 63);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_24_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearAllMaterialChips());
    });
    \u0275\u0275text(6, " Clear all ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.selectedMaterialsList);
  }
}
function MaterialInventoryHistory_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "div", 65);
    \u0275\u0275elementStart(2, "p", 66);
    \u0275\u0275text(3, "Loading history...");
    \u0275\u0275elementEnd()();
  }
}
function MaterialInventoryHistory_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1, " No history records found. ");
    \u0275\u0275elementEnd();
  }
}
function MaterialInventoryHistory_Conditional_35_For_2_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275element(1, "div", 75);
    \u0275\u0275elementStart(2, "div", 76)(3, "div", 77)(4, "span", 78);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "div", 79)(8, "span", 80);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 81);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 82)(13, "div", 83)(14, "div", 84)(15, "span", 85);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 86);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 87)(20, "span", 85);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 88);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getActivityIconClass(item_r10.status || ""));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getActivityIconClass(item_r10.status || ""));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getActivityIcon(item_r10.status || ""));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.statusBadgeClass(item_r10.status || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r10.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getActivityText(item_r10), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getMetaBoxClass(item_r10.status || ""));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getMetaLabel(item_r10.status || ""), " By: ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getMetaBadgeClass(item_r10.status || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getActorName(item_r10), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getMetaLabel(item_r10.status || ""), " At: ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getMetaBadgeClass(item_r10.status || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(24, 13, item_r10.createdAt, "dd/MMM/yyyy, h:mm a"), " ");
  }
}
function MaterialInventoryHistory_Conditional_35_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "span", 70);
    \u0275\u0275text(4, "calendar_today");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 35)(6, "h4", 71);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 72);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 73);
    \u0275\u0275repeaterCreate(11, MaterialInventoryHistory_Conditional_35_For_2_For_12_Template, 25, 16, "div", 74, _forTrack03);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r11 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(group_r11.dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", group_r11.count, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r11.items);
  }
}
function MaterialInventoryHistory_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, MaterialInventoryHistory_Conditional_35_For_2_Template, 13, 2, "div", 67, _forTrack13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.groupedHistory);
  }
}
function MaterialInventoryHistory_Conditional_36_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function MaterialInventoryHistory_Conditional_36_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 95);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_36_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(1));
    });
    \u0275\u0275text(1, " 1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, MaterialInventoryHistory_Conditional_36_Conditional_13_Conditional_2_Template, 2, 0, "span", 96);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[0] > 2 ? 2 : -1);
  }
}
function MaterialInventoryHistory_Conditional_36_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 97);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_36_For_15_Template_button_click_0_listener() {
      const p_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(p_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", p_r15 === ctx_r1.page ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r15, " ");
  }
}
function MaterialInventoryHistory_Conditional_36_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function MaterialInventoryHistory_Conditional_36_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, MaterialInventoryHistory_Conditional_36_Conditional_16_Conditional_0_Template, 2, 0, "span", 96);
    \u0275\u0275elementStart(1, "button", 95);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_36_Conditional_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.totalPages));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[ctx_r1.pageNumbers.length - 1] < ctx_r1.totalPages - 1 ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.totalPages, " ");
  }
}
function MaterialInventoryHistory_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 89);
    \u0275\u0275text(2, " Showing ");
    \u0275\u0275elementStart(3, "span", 90);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " of ");
    \u0275\u0275elementStart(6, "span", 90);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " entries ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 91)(10, "button", 92);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_36_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevPage());
    });
    \u0275\u0275elementStart(11, "span", 13);
    \u0275\u0275text(12, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, MaterialInventoryHistory_Conditional_36_Conditional_13_Template, 3, 1);
    \u0275\u0275repeaterCreate(14, MaterialInventoryHistory_Conditional_36_For_15_Template, 2, 2, "button", 93, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(16, MaterialInventoryHistory_Conditional_36_Conditional_16_Template, 3, 2);
    \u0275\u0275elementStart(17, "button", 94);
    \u0275\u0275listener("click", function MaterialInventoryHistory_Conditional_36_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275elementStart(18, "span", 13);
    \u0275\u0275text(19, "chevron_right");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.pageStartIndex, "\u2013", ctx_r1.pageEndIndex);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.totalFilteredEntries);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.pageNumbers[0] > 1 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pageNumbers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[ctx_r1.pageNumbers.length - 1] < ctx_r1.totalPages ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.page === ctx_r1.totalPages);
  }
}
var MaterialInventoryHistory = class _MaterialInventoryHistory {
  historyService = inject(MaterialInventoryHistoryServices);
  loading = false;
  history = [];
  paginatedHistory = [];
  selectedTab = "All";
  tabs = ["All", "CREATED", "UPDATED", "ASSIGNED", "TRANSFER"];
  searchQuery = "";
  page = 1;
  pageSize = 20;
  isFilterOpen = false;
  materialSearchQuery = "";
  selectedMaterialIds = /* @__PURE__ */ new Set();
  ngOnInit() {
    this.historyService.loadMaterialHistory();
    this.historyService.history$.subscribe((data) => {
      this.history = data || [];
      this.page = 1;
      this.selectedMaterialIds = new Set(this.uniqueMaterials.map((m) => m.id));
      this.updatePagination();
    });
    this.historyService.loading$.subscribe((l) => this.loading = l);
  }
  onDocumentClick(event) {
    const target = event.target;
    if (this.isFilterOpen && !target.closest(".material-filter-dropdown")) {
      this.isFilterOpen = false;
    }
  }
  get uniqueMaterials() {
    const map2 = /* @__PURE__ */ new Map();
    for (const item of this.history) {
      const id = item.material_master_id ?? item.material_id;
      if (!id)
        continue;
      if (!map2.has(id)) {
        map2.set(id, {
          id,
          name: item.name,
          sku: item.sku,
          since: item.createdAt,
          stockIn: 0,
          stockUsed: 0,
          utilization: 0
        });
      }
      const m = map2.get(id);
      m.stockIn += item.stockIn || 0;
      if ((item.status || "").toUpperCase() === "ASSIGNED") {
        m.stockUsed += item.stockUsed || 0;
      }
      if (item.createdAt && (!m.since || new Date(item.createdAt) < new Date(m.since))) {
        m.since = item.createdAt;
      }
    }
    return Array.from(map2.values()).map((m) => __spreadProps(__spreadValues({}, m), {
      utilization: m.stockIn > 0 ? Math.min(100, Math.round(m.stockUsed / m.stockIn * 100)) : 0
    }));
  }
  get filteredMaterialOptions() {
    if (!this.materialSearchQuery)
      return this.uniqueMaterials;
    const q = this.materialSearchQuery.toLowerCase();
    return this.uniqueMaterials.filter((m) => m.name?.toLowerCase().includes(q) || m.sku?.toLowerCase().includes(q));
  }
  get allMaterialsSelected() {
    return this.uniqueMaterials.length > 0 && this.selectedMaterialIds.size === this.uniqueMaterials.length;
  }
  get isPartiallySelected() {
    return this.selectedMaterialIds.size > 0 && !this.allMaterialsSelected;
  }
  get selectedMaterialsList() {
    return this.uniqueMaterials.filter((m) => this.selectedMaterialIds.has(m.id));
  }
  get selectedMaterialsLabel() {
    if (this.allMaterialsSelected)
      return "All Materials";
    if (this.selectedMaterialIds.size === 0)
      return "No Material Selected";
    if (this.selectedMaterialIds.size === 1) {
      const id = Array.from(this.selectedMaterialIds)[0];
      return this.uniqueMaterials.find((x) => x.id === id)?.name || "1 Selected";
    }
    return `${this.selectedMaterialIds.size} Materials Selected`;
  }
  get sectionHeadingLabel() {
    if (this.allMaterialsSelected) {
      return this.selectedTab === "All" ? "All Materials" : this.selectedTab;
    }
    if (this.selectedMaterialIds.size === 0) {
      return "No Material Selected";
    }
    return `${this.selectedMaterialIds.size} Material(s)`;
  }
  getMaterialStatusLabel(utilization) {
    return utilization > 0 ? "Active" : "Pending";
  }
  getMaterialStatusClass(utilization) {
    return utilization > 0 ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600";
  }
  get activeMaterialsCount() {
    return this.uniqueMaterials.filter((m) => m.utilization > 0).length;
  }
  get pendingMaterialsCount() {
    return this.uniqueMaterials.filter((m) => m.utilization === 0).length;
  }
  toggleFilterDropdown() {
    this.isFilterOpen = !this.isFilterOpen;
  }
  isMaterialChecked(id) {
    return this.selectedMaterialIds.has(id);
  }
  toggleMaterial(id) {
    if (this.selectedMaterialIds.has(id)) {
      this.selectedMaterialIds.delete(id);
    } else {
      this.selectedMaterialIds.add(id);
    }
    this.page = 1;
    this.updatePagination();
  }
  toggleAllMaterials() {
    if (this.allMaterialsSelected) {
      this.selectedMaterialIds.clear();
    } else {
      this.selectedMaterialIds = new Set(this.uniqueMaterials.map((m) => m.id));
    }
    this.page = 1;
    this.updatePagination();
  }
  removeMaterialChip(id) {
    this.selectedMaterialIds.delete(id);
    this.page = 1;
    this.updatePagination();
  }
  clearAllMaterialChips() {
    this.selectedMaterialIds.clear();
    this.page = 1;
    this.updatePagination();
  }
  applyFilterDone() {
    this.isFilterOpen = false;
    this.page = 1;
    this.updatePagination();
  }
  get materialFilteredHistory() {
    return this.history.filter((h) => {
      const id = h.material_master_id ?? h.material_id;
      return id ? this.selectedMaterialIds.has(id) : false;
    });
  }
  get tabCounts() {
    const base = this.materialFilteredHistory;
    const counts = { All: base.length };
    for (const tab of this.tabs) {
      if (tab === "All")
        continue;
      counts[tab] = base.filter((h) => (h.status || "").toUpperCase() === tab).length;
    }
    return counts;
  }
  get filteredHistory() {
    let filtered = this.materialFilteredHistory;
    if (this.selectedTab !== "All") {
      filtered = filtered.filter((h) => (h.status || "").toUpperCase() === this.selectedTab);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((h) => h.name?.toLowerCase().includes(q) || h.sku?.toLowerCase().includes(q) || h.category?.toLowerCase().includes(q) || h.vendor_name?.toLowerCase().includes(q) || h.project_name?.toLowerCase().includes(q) || h.created_by?.toLowerCase().includes(q));
    }
    return filtered;
  }
  get totalFilteredEntries() {
    return this.filteredHistory.length;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.totalFilteredEntries / this.pageSize));
  }
  get pageStartIndex() {
    return this.totalFilteredEntries === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }
  get pageEndIndex() {
    return Math.min(this.page * this.pageSize, this.totalFilteredEntries);
  }
  get pageNumbers() {
    const total = this.totalPages;
    const current = this.page;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const pages = [];
    for (let i = start; i <= end; i++)
      pages.push(i);
    return pages;
  }
  goToPage(p) {
    if (p < 1 || p > this.totalPages)
      return;
    this.page = p;
    this.updatePagination();
  }
  nextPage() {
    this.goToPage(this.page + 1);
  }
  prevPage() {
    this.goToPage(this.page - 1);
  }
  get groupedHistory() {
    const groups = {};
    for (const item of this.paginatedHistory) {
      const key = item.createdAt ? new Date(item.createdAt).toDateString() : "Unknown Date";
      if (!groups[key])
        groups[key] = [];
      groups[key].push(item);
    }
    return Object.keys(groups).sort((a, b) => {
      if (a === "Unknown Date")
        return 1;
      if (b === "Unknown Date")
        return -1;
      return new Date(b).getTime() - new Date(a).getTime();
    }).map((key) => ({
      dateLabel: key === "Unknown Date" ? key : this.formatGroupDate(key),
      count: groups[key].length,
      items: groups[key]
    }));
  }
  formatGroupDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  getActivityText(item) {
    const status = (item.status || "").toUpperCase();
    const name = item.name || "Material";
    const sku = item.sku ? ` (SKU: ${item.sku})` : "";
    const costText = item.cost ? ` at \u20B9${item.cost} per unit` : "";
    switch (status) {
      case "CREATED":
        return `Material "${name}"${sku} was added to inventory with ${item.stockIn || 0} units from vendor "${item.vendor_name || "N/A"}"${costText}.`;
      case "UPDATED":
        return `Material "${name}"${sku} stock was replenished by ${item.stockIn || 0} units from vendor "${item.vendor_name || "N/A"}"${costText}.`;
      case "ASSIGNED":
        return `${item.stockUsed || 0} units of Material "${name}"${sku} were assigned to Project "${item.project_name || "N/A"}"${costText}.`;
      case "TRANSFER":
        return `${item.stockUsed || 0} units of Material "${name}"${sku} were transferred to Project "${item.project_name || "N/A"}"${item.note ? ` with note: "${item.note}"` : ""}.`;
      default:
        return `Stock movement recorded for Material "${name}"${sku}.`;
    }
  }
  getActivityIcon(status) {
    switch ((status || "").toUpperCase()) {
      case "CREATED":
        return "add_circle";
      case "UPDATED":
        return "edit";
      case "ASSIGNED":
        return "assignment_turned_in";
      case "TRANSFER":
        return "swap_horiz";
      default:
        return "inventory_2";
    }
  }
  getActivityIconClass(status) {
    switch ((status || "").toUpperCase()) {
      case "CREATED":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "UPDATED":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
      case "ASSIGNED":
        return "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
      case "TRANSFER":
        return "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  }
  statusBadgeClass(status) {
    switch ((status || "").toUpperCase()) {
      case "CREATED":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "UPDATED":
        return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
      case "ASSIGNED":
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
      case "TRANSFER":
        return "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
      default:
        return "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  }
  getMetaLabel(status) {
    const s = (status || "").toUpperCase();
    if (s === "CREATED")
      return "CREATED";
    if (s === "ASSIGNED")
      return "ASSIGNED";
    if (s === "TRANSFER")
      return "TRANSFERRED";
    return "UPDATED";
  }
  getMetaBoxClass(status) {
    const s = (status || "").toUpperCase();
    switch (s) {
      case "CREATED":
        return "bg-rose-50 dark:bg-rose-500/5 border-pink-200 dark:border-pink-800/40";
      case "ASSIGNED":
        return "bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-800/40";
      case "TRANSFER":
        return "bg-purple-50 dark:bg-purple-500/5 border-purple-200 dark:border-purple-800/40";
      default:
        return "bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-800/40";
    }
  }
  getMetaBadgeClass(status) {
    const s = (status || "").toUpperCase();
    switch (s) {
      case "CREATED":
        return "bg-pink-100 text-pink-700";
      case "ASSIGNED":
        return "bg-amber-100 text-amber-700";
      case "TRANSFER":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  }
  currentUserDisplayName() {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const user = JSON.parse(raw);
        const name = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();
        return name || user?.username || "System";
      }
    } catch {
    }
    return "System";
  }
  getActorName(item) {
    if (item.created_by && item.created_by.trim().length > 0) {
      return item.created_by;
    }
    if (item.user) {
      const fullName = `${item.user.firstname || ""} ${item.user.lastname || ""}`.trim();
      if (fullName)
        return fullName;
    }
    return this.currentUserDisplayName();
  }
  changeTab(tab) {
    this.selectedTab = tab;
    this.page = 1;
    this.updatePagination();
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  updatePagination() {
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }
    const start = (this.page - 1) * this.pageSize;
    this.paginatedHistory = this.filteredHistory.slice(start, start + this.pageSize);
  }
  exportCSV() {
    const rows = this.filteredHistory;
    if (!rows.length)
      return;
    const headers = [
      "Material",
      "SKU",
      "Category",
      "Stock In",
      "Stock Used",
      "Cost",
      "Vendor",
      "Project",
      "Status",
      "Note",
      "Created By",
      "Date"
    ];
    const csvRows = rows.map((r) => [
      r.name || "",
      r.sku || "",
      r.category || "",
      r.stockIn ?? 0,
      r.stockUsed ?? 0,
      r.cost ?? 0,
      r.vendor_name || "",
      r.project_name || "",
      r.status || "",
      r.note || "",
      this.getActorName(r),
      r.createdAt ? new Date(r.createdAt).toLocaleString() : ""
    ]);
    const csvContent = [headers, ...csvRows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `material-inventory-history-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  static \u0275fac = function MaterialInventoryHistory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaterialInventoryHistory)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MaterialInventoryHistory, selectors: [["app-material-inventory-history"]], hostBindings: function MaterialInventoryHistory_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function MaterialInventoryHistory_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 37, vars: 11, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-on-surface-variant/80", "font-medium"], [1, "flex", "items-center", "gap-3"], [1, "relative", "material-filter-dropdown"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "rounded-xl", "font-bold", "text-sm", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "text-slate-700", "dark:text-slate-200", "hover:shadow-md", "transition-all", "cursor-pointer", "shadow-sm", "min-w-[200px]", 3, "click"], [1, "material-symbols-outlined", "text-primary", "text-lg"], [1, "flex-1", "text-left", "truncate"], [1, "material-symbols-outlined", "text-slate-400", "text-base", "transition-transform", "duration-200"], [1, "absolute", "right-0", "top-full", "mt-1.5", "w-80", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xl", "z-50", "overflow-hidden"], [1, "flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-2xl", "bg-slate-800", "dark:bg-slate-700", "text-white", "font-bold", "text-sm", "shadow-lg", "hover:shadow-xl", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "flex", "items-center", "gap-2", "overflow-x-auto", "hide-scrollbar", "pb-1"], [1, "flex", "items-center", "gap-2", "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "class"], [1, "flex", "items-center", "gap-2", "flex-wrap", "-mt-4"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "max-w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search history...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-col", "items-center", "justify-center", "gap-3", "py-16"], [1, "text-center", "py-16", "text-slate-400", "font-bold", "rounded-3xl", "border", "border-dashed", "border-slate-200", "dark:border-slate-800"], [1, "flex", "flex-col", "gap-6"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap", "px-1", "pt-4", "pb-1", "mt-2", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "absolute", "right-0", "top-full", "mt-1.5", "w-80", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xl", "z-50", "overflow-hidden", 3, "click"], [1, "px-3", "py-2.5", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "relative"], [1, "absolute", "left-2.5", "top-1/2", "-translate-y-1/2", "material-symbols-outlined", "text-slate-400", "text-[15px]"], ["type", "text", "placeholder", "Search materials\u2026", 1, "w-full", "pl-8", "pr-3", "py-1.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "text-[11px]", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-slate-50", "dark:bg-slate-800", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800/60", "transition-colors", "border-b", "border-slate-100", "dark:border-slate-800", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "transition-all", 3, "ngClass"], [1, "material-symbols-outlined", "text-white", "text-[11px]"], [1, "material-symbols-outlined", "text-primary", "text-[11px]"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "text-slate-400"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded-full", "bg-primary/10", "text-primary"], [1, "max-h-60", "overflow-y-auto"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800/60", "transition-colors", "border-b", "border-slate-50", "dark:border-slate-800/50"], [1, "py-6", "text-center", "text-slate-400"], [1, "px-4", "py-2.5", "border-t", "border-slate-100", "dark:border-slate-800", "bg-slate-50", "dark:bg-slate-800/60", "flex", "items-center", "justify-between", "gap-3"], [1, "flex", "gap-3", "text-[10px]", "font-bold", "text-slate-400"], [1, "text-green-600", "font-black"], [1, "text-amber-600", "font-black"], [1, "text-[11px]", "font-black", "text-primary", "hover:underline", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800/60", "transition-colors", "border-b", "border-slate-50", "dark:border-slate-800/50", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "shrink-0", "transition-all", 3, "ngClass"], [1, "w-7", "h-7", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", 3, "ngClass"], [1, "text-xs", "font-bold", "truncate", "text-slate-800", "dark:text-white"], [1, "flex", "items-center", "gap-1.5", "mt-0.5", "flex-wrap"], [1, "text-[9px]", "font-bold", "px-1.5", "py-0.5", "rounded-full", 3, "ngClass"], [1, "text-[10px]", "font-semibold"], [1, "text-[9px]", "text-slate-400", "font-semibold"], [1, "material-symbols-outlined", "text-2xl"], [1, "text-xs", "font-bold", "mt-1"], [1, "flex", "items-center", "gap-2", "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "click"], [1, "px-2", "py-0.5", "rounded-full", "text-[11px]", "font-black", 3, "class"], [1, "px-2", "py-0.5", "rounded-full", "text-[11px]", "font-black"], [1, "text-xs", "font-black", "text-slate-400", "uppercase", "tracking-wide"], [1, "flex", "items-center", "gap-1.5", "pl-3", "pr-2", "py-1", "rounded-full", "bg-primary/10", "text-primary", "text-xs", "font-bold"], [1, "text-xs", "font-bold", "text-slate-400", "underline", "hover:text-primary", "transition-colors", "border-none", "bg-transparent", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[14px]", "leading-none", "border-none", "bg-transparent", "cursor-pointer", "text-primary", "hover:text-primary/70", "p-0", 3, "click"], [1, "h-10", "w-10", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "text-sm", "font-bold", "text-slate-400"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "gap-3", "px-1"], [1, "w-9", "h-9", "rounded-xl", "bg-primary/10", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-primary", "text-[16px]"], [1, "text-sm", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-primary/10", "text-primary", "shrink-0"], [1, "ml-4", "pl-7", "border-l-2", "border-dashed", "border-slate-200", "dark:border-slate-800", "flex", "flex-col", "gap-2"], [1, "relative", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "shadow-sm", "hover:shadow-md", "transition-all", "duration-300"], [1, "absolute", "-left-[33px]", "top-4", "w-3", "h-3", "rounded-full", "border-2", "border-white", "dark:border-slate-950", "shadow-sm", 3, "ngClass"], [1, "flex", "items-start", "gap-3", "px-4", "py-3.5"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "mt-0.5", 3, "ngClass"], [1, "material-symbols-outlined", "text-[16px]"], [1, "flex", "items-center", "gap-2", "flex-wrap", "mb-1"], [1, "text-[9px]", "font-black", "px-2", "py-0.5", "rounded-full", "uppercase", "tracking-wide", 3, "ngClass"], [1, "text-sm", "font-semibold", "text-slate-800", "dark:text-slate-100", "leading-snug"], [1, "flex", "flex-col", "gap-3", "shrink-0", 2, "min-width", "210px", "max-width", "260px"], [1, "rounded-xl", "border", "px-3", "py-2", "shadow-sm", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "text-[8px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "whitespace-nowrap", "max-w-[140px]", "truncate", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "gap-2", "mt-1"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "whitespace-nowrap", 3, "ngClass"], [1, "text-xs", "font-semibold", "text-slate-400"], [1, "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "items-center", "gap-1"], ["title", "Previous page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click", "disabled"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "border-none", 3, "ngClass"], ["title", "Next page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click", "disabled"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click"], [1, "px-1", "text-xs", "font-bold", "text-slate-400"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "border-none", 3, "click", "ngClass"]], template: function MaterialInventoryHistory_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Material Inventory History");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Complete activity timeline \u2014 stock in, updates, transfers & assignments.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "button", 7);
      \u0275\u0275listener("click", function MaterialInventoryHistory_Template_button_click_9_listener($event) {
        ctx.toggleFilterDropdown();
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "inventory_2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 9);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, MaterialInventoryHistory_Conditional_16_Template, 33, 9, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 12);
      \u0275\u0275listener("click", function MaterialInventoryHistory_Template_button_click_17_listener() {
        return ctx.exportCSV();
      });
      \u0275\u0275elementStart(18, "span", 13);
      \u0275\u0275text(19, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20, " Export All (CSV) ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 14);
      \u0275\u0275repeaterCreate(22, MaterialInventoryHistory_For_23_Template, 3, 4, "button", 15, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, MaterialInventoryHistory_Conditional_24_Template, 7, 0, "div", 16);
      \u0275\u0275elementStart(25, "div", 17)(26, "h3", 18);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 19)(29, "span", 20);
      \u0275\u0275text(30, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function MaterialInventoryHistory_Template_input_ngModelChange_31_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function MaterialInventoryHistory_Template_input_ngModelChange_31_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div");
      \u0275\u0275conditionalCreate(33, MaterialInventoryHistory_Conditional_33_Template, 4, 0, "div", 22);
      \u0275\u0275conditionalCreate(34, MaterialInventoryHistory_Conditional_34_Template, 2, 0, "div", 23);
      \u0275\u0275conditionalCreate(35, MaterialInventoryHistory_Conditional_35_Template, 3, 0, "div", 24);
      \u0275\u0275conditionalCreate(36, MaterialInventoryHistory_Conditional_36_Template, 20, 7, "div", 25);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.selectedMaterialsLabel);
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.isFilterOpen);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isFilterOpen ? 16 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isPartiallySelected ? 24 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.sectionHeadingLabel, " \u2014 Activity History ");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading && !ctx.paginatedHistory.length ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading && ctx.paginatedHistory.length ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading && ctx.totalFilteredEntries > 0 ? 36 : -1);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\nhtml[_ngcontent-%COMP%] {\n  scrollbar-gutter: stable;\n}\n/*# sourceMappingURL=material-inventory-history.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialInventoryHistory, [{
    type: Component,
    args: [{ selector: "app-material-inventory-history", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Material Inventory History</h2>\r
            <p class="text-on-surface-variant/80 font-medium">Complete activity timeline \u2014 stock in, updates, transfers\r
                & assignments.</p>\r
        </div>\r
\r
        <div class="flex items-center gap-3">\r
\r
            <div class="relative material-filter-dropdown">\r
                <button (click)="toggleFilterDropdown(); $event.stopPropagation()"\r
                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:shadow-md transition-all cursor-pointer shadow-sm min-w-[200px]">\r
                    <span class="material-symbols-outlined text-primary text-lg">inventory_2</span>\r
                    <span class="flex-1 text-left truncate">{{ selectedMaterialsLabel }}</span>\r
                    <span class="material-symbols-outlined text-slate-400 text-base transition-transform duration-200"\r
                        [class.rotate-180]="isFilterOpen">expand_more</span>\r
                </button>\r
\r
                @if (isFilterOpen) {\r
                <div (click)="$event.stopPropagation()"\r
                    class="absolute right-0 top-full mt-1.5 w-80 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden">\r
\r
                    <div class="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">\r
                        <div class="relative">\r
                            <span\r
                                class="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[15px]">search</span>\r
                            <input [(ngModel)]="materialSearchQuery" type="text" placeholder="Search materials\u2026"\r
                                class="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50 dark:bg-slate-800" />\r
                        </div>\r
                    </div>\r
\r
                    <div (click)="toggleAllMaterials()"\r
                        class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-100 dark:border-slate-800">\r
                        <div class="w-4 h-4 rounded flex items-center justify-center border-2 transition-all"\r
                            [ngClass]="allMaterialsSelected ? 'bg-primary border-primary' : isPartiallySelected ? 'bg-primary/30 border-primary' : 'border-slate-300 bg-white dark:bg-slate-800'">\r
                            @if (allMaterialsSelected) {\r
                            <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
                            } @else if (isPartiallySelected) {\r
                            <span class="material-symbols-outlined text-primary text-[11px]">remove</span>\r
                            }\r
                        </div>\r
                        <div class="flex-1 min-w-0">\r
                            <p class="text-xs font-black text-slate-800 dark:text-white">All Materials</p>\r
                            <p class="text-[10px] text-slate-400">{{ uniqueMaterials.length }} total</p>\r
                        </div>\r
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">\r
                            {{ selectedMaterialIds.size }}/{{ uniqueMaterials.length }}\r
                        </span>\r
                    </div>\r
\r
                    <div class="max-h-60 overflow-y-auto">\r
                        @for (m of filteredMaterialOptions; track m.id) {\r
                        <div (click)="toggleMaterial(m.id)"\r
                            class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800/50">\r
                            <div class="w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all"\r
                                [ngClass]="isMaterialChecked(m.id) ? 'bg-primary border-primary' : 'border-slate-300 bg-white dark:bg-slate-800'">\r
                                @if (isMaterialChecked(m.id)) {\r
                                <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
                                }\r
                            </div>\r
                            <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"\r
                                [ngClass]="isMaterialChecked(m.id) ? 'bg-primary/15' : 'bg-slate-100 dark:bg-slate-800'">\r
                                <span class="material-symbols-outlined text-[14px]"\r
                                    [ngClass]="isMaterialChecked(m.id) ? 'text-primary' : 'text-slate-400'">inventory_2</span>\r
                            </div>\r
                            <div class="flex-1 min-w-0">\r
                                <p class="text-xs font-bold truncate text-slate-800 dark:text-white">{{ m.name }}</p>\r
\r
                                <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">\r
                                    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full"\r
                                        [ngClass]="getMaterialStatusClass(m.utilization)">\r
                                        {{ getMaterialStatusLabel(m.utilization) }}\r
                                    </span>\r
                                    <span class="text-[10px] font-semibold" [class.text-green-600]="m.utilization >= 90"\r
                                        [class.text-amber-500]="m.utilization < 90 && m.utilization >= 70"\r
                                        [class.text-red-500]="m.utilization < 70">{{ m.utilization }}%</span>\r
                                    @if (m.since) {\r
                                    <span class="text-[9px] text-slate-400 font-semibold">\xB7 Since {{ m.since |\r
                                        date:'dd/MMM/yyyy' }}</span>\r
                                    }\r
                                </div>\r
                            </div>\r
                        </div>\r
                        } @empty {\r
                        <div class="py-6 text-center text-slate-400">\r
                            <span class="material-symbols-outlined text-2xl">search_off</span>\r
                            <p class="text-xs font-bold mt-1">No materials found</p>\r
                        </div>\r
                        }\r
                    </div>\r
\r
                    <div\r
                        class="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between gap-3">\r
                        <div class="flex gap-3 text-[10px] font-bold text-slate-400">\r
                            <span>Active: <span class="text-green-600 font-black">{{ activeMaterialsCount\r
                                    }}</span></span>\r
                            <span>Pending: <span class="text-amber-600 font-black">{{ pendingMaterialsCount\r
                                    }}</span></span>\r
                        </div>\r
                        <button (click)="applyFilterDone()"\r
                            class="text-[11px] font-black text-primary hover:underline cursor-pointer">Done</button>\r
                    </div>\r
                </div>\r
                }\r
            </div>\r
\r
            <button (click)="exportCSV()"\r
                class="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer">\r
                <span class="material-symbols-outlined text-[18px]">download</span>\r
                Export All (CSV)\r
            </button>\r
        </div>\r
    </div>\r
\r
    <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">\r
        @for (tab of tabs; track tab) {\r
        <button (click)="changeTab(tab)"\r
            [class]="selectedTab === tab ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-dim'"\r
            class="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-colors">\r
            {{ tab }}\r
            @if (tabCounts[tab] > 0) {\r
            <span\r
                [class]="selectedTab === tab ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'"\r
                class="px-2 py-0.5 rounded-full text-[11px] font-black">\r
                {{ tabCounts[tab] }}\r
            </span>\r
            }\r
        </button>\r
        }\r
    </div>\r
\r
    @if (isPartiallySelected) {\r
    <div class="flex items-center gap-2 flex-wrap -mt-4">\r
        <span class="text-xs font-black text-slate-400 uppercase tracking-wide">Showing:</span>\r
        @for (m of selectedMaterialsList; track m.id) {\r
        <span\r
            class="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">\r
            {{ m.name }}\r
            <button (click)="removeMaterialChip(m.id)"\r
                class="material-symbols-outlined text-[14px] leading-none border-none bg-transparent cursor-pointer text-primary hover:text-primary/70 p-0">\r
                close\r
            </button>\r
        </span>\r
        }\r
        <button (click)="clearAllMaterialChips()"\r
            class="text-xs font-bold text-slate-400 underline hover:text-primary transition-colors border-none bg-transparent cursor-pointer">\r
            Clear all\r
        </button>\r
    </div>\r
    }\r
\r
    <div class="flex items-center justify-between gap-3 flex-wrap">\r
        <h3 class="text-xl font-black text-slate-800 dark:text-white">\r
            {{ sectionHeadingLabel }} \u2014 Activity History\r
        </h3>\r
\r
        <div\r
            class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full max-w-[320px]">\r
            <span class="material-symbols-outlined text-slate-400 text-[20px]">search</span>\r
            <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
                placeholder="Search history..."\r
                class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
        </div>\r
    </div>\r
\r
    <div>\r
\r
        @if (loading) {\r
        <div class="flex flex-col items-center justify-center gap-3 py-16">\r
            <div class="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>\r
            <p class="text-sm font-bold text-slate-400">Loading history...</p>\r
        </div>\r
        }\r
\r
        @if (!loading && !paginatedHistory.length) {\r
        <div\r
            class="text-center py-16 text-slate-400 font-bold rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">\r
            No history records found.\r
        </div>\r
        }\r
\r
        @if (!loading && paginatedHistory.length) {\r
        <div class="flex flex-col gap-6">\r
            @for (group of groupedHistory; track group.dateLabel) {\r
            <div class="flex flex-col gap-2">\r
\r
                <div class="flex items-center gap-3 px-1">\r
                    <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">\r
                        <span class="material-symbols-outlined text-primary text-[16px]">calendar_today</span>\r
                    </div>\r
                    <div class="flex-1 min-w-0">\r
                        <h4 class="text-sm font-black text-slate-800 dark:text-white">{{ group.dateLabel }}</h4>\r
                    </div>\r
                    <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">\r
                        {{ group.count }}\r
                    </span>\r
                </div>\r
\r
                <div\r
                    class="ml-4 pl-7 border-l-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col gap-2">\r
                    @for (item of group.items; track item.id) {\r
\r
                    <div\r
                        class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">\r
\r
                        <div [ngClass]="getActivityIconClass(item.status || '')"\r
                            class="absolute -left-[33px] top-4 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 shadow-sm">\r
                        </div>\r
\r
                        <div class="flex items-start gap-3 px-4 py-3.5">\r
\r
                            <div [ngClass]="getActivityIconClass(item.status || '')"\r
                                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5">\r
                                <span class="material-symbols-outlined text-[16px]">{{ getActivityIcon(item.status ||\r
                                    '')\r
                                    }}</span>\r
                            </div>\r
\r
                            <div class="flex-1 min-w-0">\r
                                <div class="flex items-center gap-2 flex-wrap mb-1">\r
                                    <span [ngClass]="statusBadgeClass(item.status || '')"\r
                                        class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">\r
                                        {{ item.status }}\r
                                    </span>\r
                                </div>\r
                                <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">\r
                                    {{ getActivityText(item) }}\r
                                </p>\r
                            </div>\r
\r
                            <div class="flex flex-col gap-3 shrink-0" style="min-width: 210px; max-width: 260px;">\r
\r
                                <div [ngClass]="getMetaBoxClass(item.status || '')"\r
                                    class="rounded-xl border px-3 py-2 shadow-sm">\r
                                    <div class="flex items-center justify-between gap-2">\r
                                        <span\r
                                            class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">\r
                                            {{ getMetaLabel(item.status || '') }} By:\r
                                        </span>\r
                                        <span [ngClass]="getMetaBadgeClass(item.status || '')"\r
                                            class="text-[8.5px] font-black px-2 py-0.5 rounded-full whitespace-nowrap max-w-[140px] truncate">\r
                                            {{ getActorName(item) }}\r
                                        </span>\r
                                    </div>\r
                                    <div class="flex items-center justify-between gap-2 mt-1">\r
                                        <span\r
                                            class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">\r
                                            {{ getMetaLabel(item.status || '') }} At:\r
                                        </span>\r
                                        <span [ngClass]="getMetaBadgeClass(item.status || '')"\r
                                            class="text-[8.5px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">\r
                                            {{ item.createdAt | date:'dd/MMM/yyyy, h:mm a' }}\r
                                        </span>\r
                                    </div>\r
                                </div>\r
\r
                            </div>\r
\r
                        </div>\r
                    </div>\r
                    }\r
                </div>\r
            </div>\r
            }\r
        </div>\r
        }\r
\r
        @if (!loading && totalFilteredEntries > 0) {\r
        <div\r
            class="flex items-center justify-between gap-3 flex-wrap px-1 pt-4 pb-1 mt-2 border-t border-slate-200 dark:border-slate-800">\r
            <p class="text-xs font-semibold text-slate-400">\r
                Showing <span class="font-black text-slate-800 dark:text-white">{{ pageStartIndex }}\u2013{{ pageEndIndex\r
                    }}</span>\r
                of <span class="font-black text-slate-800 dark:text-white">{{ totalFilteredEntries }}</span> entries\r
            </p>\r
\r
            <div class="flex items-center gap-1">\r
                <button (click)="prevPage()" [disabled]="page === 1"\r
                    class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-none bg-transparent"\r
                    title="Previous page">\r
                    <span class="material-symbols-outlined text-[18px]">chevron_left</span>\r
                </button>\r
\r
                @if (pageNumbers[0] > 1) {\r
                <button (click)="goToPage(1)"\r
                    class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border-none bg-transparent">\r
                    1\r
                </button>\r
                @if (pageNumbers[0] > 2) {\r
                <span class="px-1 text-xs font-bold text-slate-400">\u2026</span>\r
                }\r
                }\r
\r
                @for (p of pageNumbers; track p) {\r
                <button (click)="goToPage(p)"\r
                    class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-colors border-none"\r
                    [ngClass]="p === page ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent'">\r
                    {{ p }}\r
                </button>\r
                }\r
\r
                @if (pageNumbers[pageNumbers.length - 1] < totalPages) { @if (pageNumbers[pageNumbers.length - 1] <\r
                    totalPages - 1) { <span class="px-1 text-xs font-bold text-slate-400">\u2026</span>\r
                    }\r
                    <button (click)="goToPage(totalPages)"\r
                        class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border-none bg-transparent">\r
                        {{ totalPages }}\r
                    </button>\r
                    }\r
\r
                    <button (click)="nextPage()" [disabled]="page === totalPages"\r
                        class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-none bg-transparent"\r
                        title="Next page">\r
                        <span class="material-symbols-outlined text-[18px]">chevron_right</span>\r
                    </button>\r
            </div>\r
        </div>\r
        }\r
    </div>\r
\r
</section>`, styles: ["/* src/app/modules/history/material-inventory-history/material-inventory-history.scss */\nhtml {\n  scrollbar-gutter: stable;\n}\n/*# sourceMappingURL=material-inventory-history.css.map */\n"] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MaterialInventoryHistory, { className: "MaterialInventoryHistory", filePath: "app/modules/history/material-inventory-history/material-inventory-history.ts", lineNumber: 29 });
})();

// src/app/modules/history/equipment-inventory-history/equipment-inventory-history-services.ts
var EquipmentInventoryHistoryServices = class _EquipmentInventoryHistoryServices {
  http;
  baseUrl = `${environment.serverUrl}/api/v1`;
  historySubject = new BehaviorSubject([]);
  history$ = this.historySubject.asObservable();
  loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadEquipmentHistory() {
    this.loadingSubject.next(true);
    this.http.get(`${this.baseUrl}/getAllequipments_history`).subscribe({
      next: (res) => {
        if (res?.code === 200 && Array.isArray(res?.data)) {
          const sorted = [...res.data].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          this.historySubject.next(sorted);
        } else {
          this.historySubject.next([]);
        }
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error("Failed to load equipment history", err);
        this.historySubject.next([]);
        this.loadingSubject.next(false);
      }
    });
  }
  static \u0275fac = function EquipmentInventoryHistoryServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EquipmentInventoryHistoryServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EquipmentInventoryHistoryServices, factory: _EquipmentInventoryHistoryServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EquipmentInventoryHistoryServices, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/history/equipment-inventory-history/equipment-inventory-history.ts
var _forTrack04 = ($index, $item) => $item.id;
var _forTrack14 = ($index, $item) => $item.dateLabel;
function EquipmentInventoryHistory_Conditional_16_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventoryHistory_Conditional_16_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "remove");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventoryHistory_Conditional_16_For_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventoryHistory_Conditional_16_For_19_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 Since ", \u0275\u0275pipeBind2(2, 1, m_r4.since, "dd/MMM/yyyy"));
  }
}
function EquipmentInventoryHistory_Conditional_16_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_16_For_19_Template_div_click_0_listener() {
      const m_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleEquipment(m_r4.id));
    });
    \u0275\u0275elementStart(1, "div", 48);
    \u0275\u0275conditionalCreate(2, EquipmentInventoryHistory_Conditional_16_For_19_Conditional_2_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "span", 50);
    \u0275\u0275text(5, "construction");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "p", 51);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 52)(10, "span", 53);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 54);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, EquipmentInventoryHistory_Conditional_16_For_19_Conditional_14_Template, 3, 4, "span", 55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isEquipmentChecked(m_r4.id) ? "bg-primary border-primary" : "border-slate-300 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEquipmentChecked(m_r4.id) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isEquipmentChecked(m_r4.id) ? "bg-primary/15" : "bg-slate-100 dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isEquipmentChecked(m_r4.id) ? "text-primary" : "text-slate-400");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(m_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getEquipmentStatusClass(m_r4.utilization));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEquipmentStatusLabel(m_r4.utilization), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-green-600", m_r4.utilization >= 90)("text-amber-500", m_r4.utilization < 90 && m_r4.utilization >= 70)("text-red-500", m_r4.utilization < 70);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", m_r4.utilization, "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r4.since ? 14 : -1);
  }
}
function EquipmentInventoryHistory_Conditional_16_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 56);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 57);
    \u0275\u0275text(4, "No equipment found");
    \u0275\u0275elementEnd()();
  }
}
function EquipmentInventoryHistory_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_16_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 27)(2, "div", 28)(3, "span", 29);
    \u0275\u0275text(4, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventoryHistory_Conditional_16_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.equipmentSearchQuery, $event) || (ctx_r1.equipmentSearchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 31);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_16_Template_div_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleAllEquipments());
    });
    \u0275\u0275elementStart(7, "div", 32);
    \u0275\u0275conditionalCreate(8, EquipmentInventoryHistory_Conditional_16_Conditional_8_Template, 2, 0, "span", 33)(9, EquipmentInventoryHistory_Conditional_16_Conditional_9_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 35)(11, "p", 36);
    \u0275\u0275text(12, "All Equipment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 37);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 38);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 39);
    \u0275\u0275repeaterCreate(18, EquipmentInventoryHistory_Conditional_16_For_19_Template, 15, 15, "div", 40, _forTrack04, false, EquipmentInventoryHistory_Conditional_16_ForEmpty_20_Template, 5, 0, "div", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 42)(22, "div", 43)(23, "span");
    \u0275\u0275text(24, "Active: ");
    \u0275\u0275elementStart(25, "span", 44);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Pending: ");
    \u0275\u0275elementStart(29, "span", 45);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "button", 46);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_16_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyFilterDone());
    });
    \u0275\u0275text(32, "Done");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.equipmentSearchQuery);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.allEquipmentsSelected ? "bg-primary border-primary" : ctx_r1.isPartiallySelected ? "bg-primary/30 border-primary" : "border-slate-300 bg-white dark:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.allEquipmentsSelected ? 8 : ctx_r1.isPartiallySelected ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.uniqueEquipments.length, " total");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.selectedEquipmentIds.size, "/", ctx_r1.uniqueEquipments.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.filteredEquipmentOptions);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.activeEquipmentsCount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.pendingEquipmentsCount);
  }
}
function EquipmentInventoryHistory_For_23_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.selectedTab === tab_r6 ? "bg-white/25 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.tabCounts[tab_r6], " ");
  }
}
function EquipmentInventoryHistory_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_For_23_Template_button_click_0_listener() {
      const tab_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeTab(tab_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, EquipmentInventoryHistory_For_23_Conditional_2_Template, 2, 3, "span", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.selectedTab === tab_r6 ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-dim");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r6, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.tabCounts[tab_r6] > 0 ? 2 : -1);
  }
}
function EquipmentInventoryHistory_Conditional_24_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 64);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_24_For_4_Template_button_click_2_listener() {
      const m_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeEquipmentChip(m_r9.id));
    });
    \u0275\u0275text(3, " close ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r9.name, " ");
  }
}
function EquipmentInventoryHistory_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 61);
    \u0275\u0275text(2, "Showing:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, EquipmentInventoryHistory_Conditional_24_For_4_Template, 4, 1, "span", 62, _forTrack04);
    \u0275\u0275elementStart(5, "button", 63);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_24_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearAllEquipmentChips());
    });
    \u0275\u0275text(6, " Clear all ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.selectedEquipmentsList);
  }
}
function EquipmentInventoryHistory_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "div", 65);
    \u0275\u0275elementStart(2, "p", 66);
    \u0275\u0275text(3, "Loading history...");
    \u0275\u0275elementEnd()();
  }
}
function EquipmentInventoryHistory_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1, " No history records found. ");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventoryHistory_Conditional_35_For_2_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275element(1, "div", 75);
    \u0275\u0275elementStart(2, "div", 76)(3, "div", 77)(4, "span", 78);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "div", 79)(8, "span", 80);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 81);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 82)(13, "div", 83)(14, "div", 84)(15, "span", 85);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 86);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 87)(20, "span", 85);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 88);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getActivityIconClass(item_r10.status || ""));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getActivityIconClass(item_r10.status || ""));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getActivityIcon(item_r10.status || ""));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.statusBadgeClass(item_r10.status || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r10.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getActivityText(item_r10), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getMetaBoxClass(item_r10.status || ""));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getMetaLabel(item_r10.status || ""), " By: ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getMetaBadgeClass(item_r10.status || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getActorName(item_r10), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getMetaLabel(item_r10.status || ""), " At: ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getMetaBadgeClass(item_r10.status || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(24, 13, item_r10.createdAt, "dd/MMM/yyyy, h:mm a"), " ");
  }
}
function EquipmentInventoryHistory_Conditional_35_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "span", 70);
    \u0275\u0275text(4, "calendar_today");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 35)(6, "h4", 71);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 72);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 73);
    \u0275\u0275repeaterCreate(11, EquipmentInventoryHistory_Conditional_35_For_2_For_12_Template, 25, 16, "div", 74, _forTrack04);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r11 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(group_r11.dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", group_r11.count, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r11.items);
  }
}
function EquipmentInventoryHistory_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, EquipmentInventoryHistory_Conditional_35_For_2_Template, 13, 2, "div", 67, _forTrack14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.groupedHistory);
  }
}
function EquipmentInventoryHistory_Conditional_36_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventoryHistory_Conditional_36_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 95);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_36_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(1));
    });
    \u0275\u0275text(1, " 1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, EquipmentInventoryHistory_Conditional_36_Conditional_13_Conditional_2_Template, 2, 0, "span", 96);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[0] > 2 ? 2 : -1);
  }
}
function EquipmentInventoryHistory_Conditional_36_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 97);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_36_For_15_Template_button_click_0_listener() {
      const p_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(p_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", p_r15 === ctx_r1.page ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r15, " ");
  }
}
function EquipmentInventoryHistory_Conditional_36_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventoryHistory_Conditional_36_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, EquipmentInventoryHistory_Conditional_36_Conditional_16_Conditional_0_Template, 2, 0, "span", 96);
    \u0275\u0275elementStart(1, "button", 95);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_36_Conditional_16_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.totalPages));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[ctx_r1.pageNumbers.length - 1] < ctx_r1.totalPages - 1 ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.totalPages, " ");
  }
}
function EquipmentInventoryHistory_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 89);
    \u0275\u0275text(2, " Showing ");
    \u0275\u0275elementStart(3, "span", 90);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " of ");
    \u0275\u0275elementStart(6, "span", 90);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " entries ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 91)(10, "button", 92);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_36_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevPage());
    });
    \u0275\u0275elementStart(11, "span", 13);
    \u0275\u0275text(12, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, EquipmentInventoryHistory_Conditional_36_Conditional_13_Template, 3, 1);
    \u0275\u0275repeaterCreate(14, EquipmentInventoryHistory_Conditional_36_For_15_Template, 2, 2, "button", 93, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(16, EquipmentInventoryHistory_Conditional_36_Conditional_16_Template, 3, 2);
    \u0275\u0275elementStart(17, "button", 94);
    \u0275\u0275listener("click", function EquipmentInventoryHistory_Conditional_36_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275elementStart(18, "span", 13);
    \u0275\u0275text(19, "chevron_right");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.pageStartIndex, "\u2013", ctx_r1.pageEndIndex);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.totalFilteredEntries);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.pageNumbers[0] > 1 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pageNumbers);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pageNumbers[ctx_r1.pageNumbers.length - 1] < ctx_r1.totalPages ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.page === ctx_r1.totalPages);
  }
}
var EquipmentInventoryHistory = class _EquipmentInventoryHistory {
  historyService = inject(EquipmentInventoryHistoryServices);
  loading = false;
  history = [];
  paginatedHistory = [];
  selectedTab = "All";
  tabs = ["All", "CREATED", "UPDATED", "ASSIGNED", "TRANSFER"];
  searchQuery = "";
  page = 1;
  pageSize = 20;
  isFilterOpen = false;
  equipmentSearchQuery = "";
  selectedEquipmentIds = /* @__PURE__ */ new Set();
  ngOnInit() {
    this.historyService.loadEquipmentHistory();
    this.historyService.history$.subscribe((data) => {
      this.history = data || [];
      this.page = 1;
      this.selectedEquipmentIds = new Set(this.uniqueEquipments.map((m) => m.id));
      this.updatePagination();
    });
    this.historyService.loading$.subscribe((l) => this.loading = l);
  }
  onDocumentClick(event) {
    const target = event.target;
    if (this.isFilterOpen && !target.closest(".equipment-filter-dropdown")) {
      this.isFilterOpen = false;
    }
  }
  get uniqueEquipments() {
    const map2 = /* @__PURE__ */ new Map();
    for (const item of this.history) {
      const id = item.equipment_master_id ?? item.equipment_id;
      if (!id)
        continue;
      if (!map2.has(id)) {
        map2.set(id, {
          id,
          name: item.name,
          sku: item.sku,
          since: item.createdAt,
          stockIn: 0,
          stockUsed: 0,
          utilization: 0
        });
      }
      const m = map2.get(id);
      m.stockIn = Math.max(m.stockIn, item.stockIn || 0);
      const status = (item.status || "").toUpperCase();
      if (status === "TRANSFER" || status === "ASSIGNED") {
        m.stockUsed += item.stockUsed || 0;
      }
      if (item.createdAt && (!m.since || new Date(item.createdAt) < new Date(m.since))) {
        m.since = item.createdAt;
      }
    }
    return Array.from(map2.values()).map((m) => __spreadProps(__spreadValues({}, m), {
      utilization: m.stockIn > 0 ? Math.min(100, Math.round(m.stockUsed / m.stockIn * 100)) : 0
    }));
  }
  get filteredEquipmentOptions() {
    if (!this.equipmentSearchQuery)
      return this.uniqueEquipments;
    const q = this.equipmentSearchQuery.toLowerCase();
    return this.uniqueEquipments.filter((m) => m.name?.toLowerCase().includes(q) || m.sku?.toLowerCase().includes(q));
  }
  get allEquipmentsSelected() {
    return this.uniqueEquipments.length > 0 && this.selectedEquipmentIds.size === this.uniqueEquipments.length;
  }
  get isPartiallySelected() {
    return this.selectedEquipmentIds.size > 0 && !this.allEquipmentsSelected;
  }
  get selectedEquipmentsList() {
    return this.uniqueEquipments.filter((m) => this.selectedEquipmentIds.has(m.id));
  }
  get selectedEquipmentsLabel() {
    if (this.allEquipmentsSelected)
      return "All Equipment";
    if (this.selectedEquipmentIds.size === 0)
      return "No Equipment Selected";
    if (this.selectedEquipmentIds.size === 1) {
      const id = Array.from(this.selectedEquipmentIds)[0];
      return this.uniqueEquipments.find((x) => x.id === id)?.name || "1 Selected";
    }
    return `${this.selectedEquipmentIds.size} Equipment Selected`;
  }
  get sectionHeadingLabel() {
    if (this.allEquipmentsSelected) {
      return this.selectedTab === "All" ? "All Equipment" : this.selectedTab;
    }
    if (this.selectedEquipmentIds.size === 0) {
      return "No Equipment Selected";
    }
    return `${this.selectedEquipmentIds.size} Equipment`;
  }
  getEquipmentStatusLabel(utilization) {
    return utilization > 0 ? "Active" : "Pending";
  }
  getEquipmentStatusClass(utilization) {
    return utilization > 0 ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600";
  }
  get activeEquipmentsCount() {
    return this.uniqueEquipments.filter((m) => m.utilization > 0).length;
  }
  get pendingEquipmentsCount() {
    return this.uniqueEquipments.filter((m) => m.utilization === 0).length;
  }
  toggleFilterDropdown() {
    this.isFilterOpen = !this.isFilterOpen;
  }
  isEquipmentChecked(id) {
    return this.selectedEquipmentIds.has(id);
  }
  toggleEquipment(id) {
    if (this.selectedEquipmentIds.has(id)) {
      this.selectedEquipmentIds.delete(id);
    } else {
      this.selectedEquipmentIds.add(id);
    }
    this.page = 1;
    this.updatePagination();
  }
  toggleAllEquipments() {
    if (this.allEquipmentsSelected) {
      this.selectedEquipmentIds.clear();
    } else {
      this.selectedEquipmentIds = new Set(this.uniqueEquipments.map((m) => m.id));
    }
    this.page = 1;
    this.updatePagination();
  }
  removeEquipmentChip(id) {
    this.selectedEquipmentIds.delete(id);
    this.page = 1;
    this.updatePagination();
  }
  clearAllEquipmentChips() {
    this.selectedEquipmentIds.clear();
    this.page = 1;
    this.updatePagination();
  }
  applyFilterDone() {
    this.isFilterOpen = false;
    this.page = 1;
    this.updatePagination();
  }
  get equipmentFilteredHistory() {
    return this.history.filter((h) => {
      const id = h.equipment_master_id ?? h.equipment_id;
      return id ? this.selectedEquipmentIds.has(id) : false;
    });
  }
  get tabCounts() {
    const base = this.equipmentFilteredHistory;
    const counts = { All: base.length };
    for (const tab of this.tabs) {
      if (tab === "All")
        continue;
      counts[tab] = base.filter((h) => (h.status || "").toUpperCase() === tab).length;
    }
    return counts;
  }
  get filteredHistory() {
    let filtered = this.equipmentFilteredHistory;
    if (this.selectedTab !== "All") {
      filtered = filtered.filter((h) => (h.status || "").toUpperCase() === this.selectedTab);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((h) => h.name?.toLowerCase().includes(q) || h.sku?.toLowerCase().includes(q) || h.category?.toLowerCase().includes(q) || h.vendor_name?.toLowerCase().includes(q) || h.project_name?.toLowerCase().includes(q) || h.created_by?.toLowerCase().includes(q));
    }
    return filtered;
  }
  get totalFilteredEntries() {
    return this.filteredHistory.length;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.totalFilteredEntries / this.pageSize));
  }
  get pageStartIndex() {
    return this.totalFilteredEntries === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }
  get pageEndIndex() {
    return Math.min(this.page * this.pageSize, this.totalFilteredEntries);
  }
  get pageNumbers() {
    const total = this.totalPages;
    const current = this.page;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const pages = [];
    for (let i = start; i <= end; i++)
      pages.push(i);
    return pages;
  }
  goToPage(p) {
    if (p < 1 || p > this.totalPages)
      return;
    this.page = p;
    this.updatePagination();
  }
  nextPage() {
    this.goToPage(this.page + 1);
  }
  prevPage() {
    this.goToPage(this.page - 1);
  }
  get groupedHistory() {
    const groups = {};
    for (const item of this.paginatedHistory) {
      const key = item.createdAt ? new Date(item.createdAt).toDateString() : "Unknown Date";
      if (!groups[key])
        groups[key] = [];
      groups[key].push(item);
    }
    return Object.keys(groups).sort((a, b) => {
      if (a === "Unknown Date")
        return 1;
      if (b === "Unknown Date")
        return -1;
      return new Date(b).getTime() - new Date(a).getTime();
    }).map((key) => ({
      dateLabel: key === "Unknown Date" ? key : this.formatGroupDate(key),
      count: groups[key].length,
      items: groups[key]
    }));
  }
  formatGroupDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  pluralize(count, singular, plural = singular + "s") {
    return count === 1 ? singular : plural;
  }
  getActivityText(item) {
    const status = (item.status || "").toUpperCase();
    const name = item.name || "Equipment";
    const sku = item.sku ? ` (SKU: ${item.sku})` : "";
    const costText = item.cost ? ` at \u20B9${item.cost} per unit` : "";
    const stockInCount = item.stockIn || 0;
    const stockUsedCount = item.stockUsed || 0;
    switch (status) {
      case "CREATED":
        return `Equipment "${name}"${sku} was added to inventory with ${stockInCount} ${this.pluralize(stockInCount, "unit")} from vendor "${item.vendor_name || "N/A"}"${costText}.`;
      case "UPDATED":
        return `Equipment "${name}"${sku} stock was replenished by ${stockInCount} ${this.pluralize(stockInCount, "unit")} from vendor "${item.vendor_name || "N/A"}"${costText}.`;
      case "ASSIGNED":
        return `${stockUsedCount} ${this.pluralize(stockUsedCount, "unit")} of Equipment "${name}"${sku} ${stockUsedCount === 1 ? "was" : "were"} assigned to Project "${item.project_name || "N/A"}".`;
      case "TRANSFER":
        return `${stockUsedCount} ${this.pluralize(stockUsedCount, "unit")} of Equipment "${name}"${sku} ${stockUsedCount === 1 ? "was" : "were"} transferred to Project "${item.project_name || "N/A"}"${item.note ? ` with note: "${item.note}"` : ""}.`;
      default:
        return `Stock movement recorded for Equipment "${name}"${sku}.`;
    }
  }
  getActivityIcon(status) {
    switch ((status || "").toUpperCase()) {
      case "CREATED":
        return "add_circle";
      case "UPDATED":
        return "edit";
      case "ASSIGNED":
        return "assignment_ind";
      case "TRANSFER":
        return "swap_horiz";
      default:
        return "construction";
    }
  }
  getActivityIconClass(status) {
    switch ((status || "").toUpperCase()) {
      case "CREATED":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "UPDATED":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
      case "ASSIGNED":
        return "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
      case "TRANSFER":
        return "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  }
  statusBadgeClass(status) {
    switch ((status || "").toUpperCase()) {
      case "CREATED":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "UPDATED":
        return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
      case "ASSIGNED":
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
      case "TRANSFER":
        return "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
      default:
        return "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  }
  getMetaLabel(status) {
    const s = (status || "").toUpperCase();
    if (s === "CREATED")
      return "CREATED";
    if (s === "ASSIGNED")
      return "ASSIGNED";
    if (s === "TRANSFER")
      return "TRANSFERRED";
    return "UPDATED";
  }
  getMetaBoxClass(status) {
    const s = (status || "").toUpperCase();
    switch (s) {
      case "CREATED":
        return "bg-rose-50 dark:bg-rose-500/5 border-pink-200 dark:border-pink-800/40";
      case "ASSIGNED":
        return "bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-800/40";
      case "TRANSFER":
        return "bg-purple-50 dark:bg-purple-500/5 border-purple-200 dark:border-purple-800/40";
      default:
        return "bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-800/40";
    }
  }
  getMetaBadgeClass(status) {
    const s = (status || "").toUpperCase();
    switch (s) {
      case "CREATED":
        return "bg-pink-100 text-pink-700";
      case "ASSIGNED":
        return "bg-amber-100 text-amber-700";
      case "TRANSFER":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  }
  currentUserDisplayName() {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) {
        const user = JSON.parse(raw);
        const name = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();
        return name || user?.username || "System";
      }
    } catch {
    }
    return "System";
  }
  getActorName(item) {
    if (item.created_by && item.created_by.trim().length > 0) {
      return item.created_by;
    }
    if (item.user) {
      const fullName = `${item.user.firstname || ""} ${item.user.lastname || ""}`.trim();
      if (fullName)
        return fullName;
    }
    return this.currentUserDisplayName();
  }
  changeTab(tab) {
    this.selectedTab = tab;
    this.page = 1;
    this.updatePagination();
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  updatePagination() {
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }
    const start = (this.page - 1) * this.pageSize;
    this.paginatedHistory = this.filteredHistory.slice(start, start + this.pageSize);
  }
  exportCSV() {
    const rows = this.filteredHistory;
    if (!rows.length)
      return;
    const headers = [
      "Equipment",
      "SKU",
      "Category",
      "Stock In",
      "Stock Used",
      "Cost",
      "Vendor",
      "Project",
      "Status",
      "Note",
      "Created By",
      "Date"
    ];
    const csvRows = rows.map((r) => [
      r.name || "",
      r.sku || "",
      r.category || "",
      r.stockIn ?? 0,
      r.stockUsed ?? 0,
      r.cost ?? 0,
      r.vendor_name || "",
      r.project_name || "",
      r.status || "",
      r.note || "",
      this.getActorName(r),
      r.createdAt ? new Date(r.createdAt).toLocaleString() : ""
    ]);
    const csvContent = [headers, ...csvRows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `equipment-inventory-history-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  static \u0275fac = function EquipmentInventoryHistory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EquipmentInventoryHistory)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EquipmentInventoryHistory, selectors: [["app-equipment-inventory-history"]], hostBindings: function EquipmentInventoryHistory_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function EquipmentInventoryHistory_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 37, vars: 11, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-on-surface-variant/80", "font-medium"], [1, "flex", "items-center", "gap-3"], [1, "relative", "equipment-filter-dropdown"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "rounded-xl", "font-bold", "text-sm", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "text-slate-700", "dark:text-slate-200", "hover:shadow-md", "transition-all", "cursor-pointer", "shadow-sm", "min-w-[200px]", 3, "click"], [1, "material-symbols-outlined", "text-primary", "text-lg"], [1, "flex-1", "text-left", "truncate"], [1, "material-symbols-outlined", "text-slate-400", "text-base", "transition-transform", "duration-200"], [1, "absolute", "right-0", "top-full", "mt-1.5", "w-80", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xl", "z-50", "overflow-hidden"], [1, "flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-2xl", "bg-slate-800", "dark:bg-slate-700", "text-white", "font-bold", "text-sm", "shadow-lg", "hover:shadow-xl", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "flex", "items-center", "gap-2", "overflow-x-auto", "hide-scrollbar", "pb-1"], [1, "flex", "items-center", "gap-2", "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "class"], [1, "flex", "items-center", "gap-2", "flex-wrap", "-mt-4"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "max-w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search history...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-col", "items-center", "justify-center", "gap-3", "py-16"], [1, "text-center", "py-16", "text-slate-400", "font-bold", "rounded-3xl", "border", "border-dashed", "border-slate-200", "dark:border-slate-800"], [1, "flex", "flex-col", "gap-6"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap", "px-1", "pt-4", "pb-1", "mt-2", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "absolute", "right-0", "top-full", "mt-1.5", "w-80", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "shadow-xl", "z-50", "overflow-hidden", 3, "click"], [1, "px-3", "py-2.5", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "relative"], [1, "absolute", "left-2.5", "top-1/2", "-translate-y-1/2", "material-symbols-outlined", "text-slate-400", "text-[15px]"], ["type", "text", "placeholder", "Search equipment\u2026", 1, "w-full", "pl-8", "pr-3", "py-1.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "text-[11px]", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "bg-slate-50", "dark:bg-slate-800", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800/60", "transition-colors", "border-b", "border-slate-100", "dark:border-slate-800", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "transition-all", 3, "ngClass"], [1, "material-symbols-outlined", "text-white", "text-[11px]"], [1, "material-symbols-outlined", "text-primary", "text-[11px]"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "text-slate-400"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded-full", "bg-primary/10", "text-primary"], [1, "max-h-60", "overflow-y-auto"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800/60", "transition-colors", "border-b", "border-slate-50", "dark:border-slate-800/50"], [1, "py-6", "text-center", "text-slate-400"], [1, "px-4", "py-2.5", "border-t", "border-slate-100", "dark:border-slate-800", "bg-slate-50", "dark:bg-slate-800/60", "flex", "items-center", "justify-between", "gap-3"], [1, "flex", "gap-3", "text-[10px]", "font-bold", "text-slate-400"], [1, "text-green-600", "font-black"], [1, "text-amber-600", "font-black"], [1, "text-[11px]", "font-black", "text-primary", "hover:underline", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800/60", "transition-colors", "border-b", "border-slate-50", "dark:border-slate-800/50", 3, "click"], [1, "w-4", "h-4", "rounded", "flex", "items-center", "justify-center", "border-2", "shrink-0", "transition-all", 3, "ngClass"], [1, "w-7", "h-7", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", 3, "ngClass"], [1, "text-xs", "font-bold", "truncate", "text-slate-800", "dark:text-white"], [1, "flex", "items-center", "gap-1.5", "mt-0.5", "flex-wrap"], [1, "text-[9px]", "font-bold", "px-1.5", "py-0.5", "rounded-full", 3, "ngClass"], [1, "text-[10px]", "font-semibold"], [1, "text-[9px]", "text-slate-400", "font-semibold"], [1, "material-symbols-outlined", "text-2xl"], [1, "text-xs", "font-bold", "mt-1"], [1, "flex", "items-center", "gap-2", "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "click"], [1, "px-2", "py-0.5", "rounded-full", "text-[11px]", "font-black", 3, "class"], [1, "px-2", "py-0.5", "rounded-full", "text-[11px]", "font-black"], [1, "text-xs", "font-black", "text-slate-400", "uppercase", "tracking-wide"], [1, "flex", "items-center", "gap-1.5", "pl-3", "pr-2", "py-1", "rounded-full", "bg-primary/10", "text-primary", "text-xs", "font-bold"], [1, "text-xs", "font-bold", "text-slate-400", "underline", "hover:text-primary", "transition-colors", "border-none", "bg-transparent", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[14px]", "leading-none", "border-none", "bg-transparent", "cursor-pointer", "text-primary", "hover:text-primary/70", "p-0", 3, "click"], [1, "h-10", "w-10", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "text-sm", "font-bold", "text-slate-400"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "gap-3", "px-1"], [1, "w-9", "h-9", "rounded-xl", "bg-primary/10", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-primary", "text-[16px]"], [1, "text-sm", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-primary/10", "text-primary", "shrink-0"], [1, "ml-4", "pl-7", "border-l-2", "border-dashed", "border-slate-200", "dark:border-slate-800", "flex", "flex-col", "gap-2"], [1, "relative", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-2xl", "shadow-sm", "hover:shadow-md", "transition-all", "duration-300"], [1, "absolute", "-left-[33px]", "top-4", "w-3", "h-3", "rounded-full", "border-2", "border-white", "dark:border-slate-950", "shadow-sm", 3, "ngClass"], [1, "flex", "items-start", "gap-3", "px-4", "py-3.5"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "mt-0.5", 3, "ngClass"], [1, "material-symbols-outlined", "text-[16px]"], [1, "flex", "items-center", "gap-2", "flex-wrap", "mb-1"], [1, "text-[9px]", "font-black", "px-2", "py-0.5", "rounded-full", "uppercase", "tracking-wide", 3, "ngClass"], [1, "text-sm", "font-semibold", "text-slate-800", "dark:text-slate-100", "leading-snug"], [1, "flex", "flex-col", "gap-3", "shrink-0", 2, "min-width", "210px", "max-width", "260px"], [1, "rounded-xl", "border", "px-3", "py-2", "shadow-sm", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "text-[8px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "whitespace-nowrap", "max-w-[140px]", "truncate", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "gap-2", "mt-1"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "whitespace-nowrap", 3, "ngClass"], [1, "text-xs", "font-semibold", "text-slate-400"], [1, "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "items-center", "gap-1"], ["title", "Previous page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click", "disabled"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "border-none", 3, "ngClass"], ["title", "Next page", 1, "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-lg", "text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800", "disabled:opacity-40", "disabled:cursor-not-allowed", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click", "disabled"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", "transition-colors", "border-none", "bg-transparent", 3, "click"], [1, "px-1", "text-xs", "font-bold", "text-slate-400"], [1, "min-w-8", "h-8", "px-2", "flex", "items-center", "justify-center", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "border-none", 3, "click", "ngClass"]], template: function EquipmentInventoryHistory_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Equipment Inventory History");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Complete activity timeline \u2014 stock in, updates, transfers & assignments.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "button", 7);
      \u0275\u0275listener("click", function EquipmentInventoryHistory_Template_button_click_9_listener($event) {
        ctx.toggleFilterDropdown();
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "construction");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 9);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, EquipmentInventoryHistory_Conditional_16_Template, 33, 9, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 12);
      \u0275\u0275listener("click", function EquipmentInventoryHistory_Template_button_click_17_listener() {
        return ctx.exportCSV();
      });
      \u0275\u0275elementStart(18, "span", 13);
      \u0275\u0275text(19, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20, " Export All (CSV) ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 14);
      \u0275\u0275repeaterCreate(22, EquipmentInventoryHistory_For_23_Template, 3, 4, "button", 15, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, EquipmentInventoryHistory_Conditional_24_Template, 7, 0, "div", 16);
      \u0275\u0275elementStart(25, "div", 17)(26, "h3", 18);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 19)(29, "span", 20);
      \u0275\u0275text(30, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventoryHistory_Template_input_ngModelChange_31_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function EquipmentInventoryHistory_Template_input_ngModelChange_31_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div");
      \u0275\u0275conditionalCreate(33, EquipmentInventoryHistory_Conditional_33_Template, 4, 0, "div", 22);
      \u0275\u0275conditionalCreate(34, EquipmentInventoryHistory_Conditional_34_Template, 2, 0, "div", 23);
      \u0275\u0275conditionalCreate(35, EquipmentInventoryHistory_Conditional_35_Template, 3, 0, "div", 24);
      \u0275\u0275conditionalCreate(36, EquipmentInventoryHistory_Conditional_36_Template, 20, 7, "div", 25);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.selectedEquipmentsLabel);
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.isFilterOpen);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isFilterOpen ? 16 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isPartiallySelected ? 24 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.sectionHeadingLabel, " \u2014 Activity History ");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading && !ctx.paginatedHistory.length ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading && ctx.paginatedHistory.length ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading && ctx.totalFilteredEntries > 0 ? 36 : -1);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EquipmentInventoryHistory, [{
    type: Component,
    args: [{ selector: "app-equipment-inventory-history", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Equipment Inventory History</h2>\r
            <p class="text-on-surface-variant/80 font-medium">Complete activity timeline \u2014 stock in, updates, transfers\r
                & assignments.</p>\r
        </div>\r
\r
        <div class="flex items-center gap-3">\r
\r
            <div class="relative equipment-filter-dropdown">\r
                <button (click)="toggleFilterDropdown(); $event.stopPropagation()"\r
                    class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:shadow-md transition-all cursor-pointer shadow-sm min-w-[200px]">\r
                    <span class="material-symbols-outlined text-primary text-lg">construction</span>\r
                    <span class="flex-1 text-left truncate">{{ selectedEquipmentsLabel }}</span>\r
                    <span class="material-symbols-outlined text-slate-400 text-base transition-transform duration-200"\r
                        [class.rotate-180]="isFilterOpen">expand_more</span>\r
                </button>\r
\r
                @if (isFilterOpen) {\r
                <div (click)="$event.stopPropagation()"\r
                    class="absolute right-0 top-full mt-1.5 w-80 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden">\r
\r
                    <div class="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">\r
                        <div class="relative">\r
                            <span\r
                                class="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[15px]">search</span>\r
                            <input [(ngModel)]="equipmentSearchQuery" type="text" placeholder="Search equipment\u2026"\r
                                class="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50 dark:bg-slate-800" />\r
                        </div>\r
                    </div>\r
\r
                    <div (click)="toggleAllEquipments()"\r
                        class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-100 dark:border-slate-800">\r
                        <div class="w-4 h-4 rounded flex items-center justify-center border-2 transition-all"\r
                            [ngClass]="allEquipmentsSelected ? 'bg-primary border-primary' : isPartiallySelected ? 'bg-primary/30 border-primary' : 'border-slate-300 bg-white dark:bg-slate-800'">\r
                            @if (allEquipmentsSelected) {\r
                            <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
                            } @else if (isPartiallySelected) {\r
                            <span class="material-symbols-outlined text-primary text-[11px]">remove</span>\r
                            }\r
                        </div>\r
                        <div class="flex-1 min-w-0">\r
                            <p class="text-xs font-black text-slate-800 dark:text-white">All Equipment</p>\r
                            <p class="text-[10px] text-slate-400">{{ uniqueEquipments.length }} total</p>\r
                        </div>\r
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">\r
                            {{ selectedEquipmentIds.size }}/{{ uniqueEquipments.length }}\r
                        </span>\r
                    </div>\r
\r
                    <div class="max-h-60 overflow-y-auto">\r
                        @for (m of filteredEquipmentOptions; track m.id) {\r
                        <div (click)="toggleEquipment(m.id)"\r
                            class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-50 dark:border-slate-800/50">\r
                            <div class="w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all"\r
                                [ngClass]="isEquipmentChecked(m.id) ? 'bg-primary border-primary' : 'border-slate-300 bg-white dark:bg-slate-800'">\r
                                @if (isEquipmentChecked(m.id)) {\r
                                <span class="material-symbols-outlined text-white text-[11px]">check</span>\r
                                }\r
                            </div>\r
                            <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"\r
                                [ngClass]="isEquipmentChecked(m.id) ? 'bg-primary/15' : 'bg-slate-100 dark:bg-slate-800'">\r
                                <span class="material-symbols-outlined text-[14px]"\r
                                    [ngClass]="isEquipmentChecked(m.id) ? 'text-primary' : 'text-slate-400'">construction</span>\r
                            </div>\r
                            <div class="flex-1 min-w-0">\r
                                <p class="text-xs font-bold truncate text-slate-800 dark:text-white">{{ m.name }}</p>\r
\r
                                <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">\r
                                    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full"\r
                                        [ngClass]="getEquipmentStatusClass(m.utilization)">\r
                                        {{ getEquipmentStatusLabel(m.utilization) }}\r
                                    </span>\r
                                    <span class="text-[10px] font-semibold" [class.text-green-600]="m.utilization >= 90"\r
                                        [class.text-amber-500]="m.utilization < 90 && m.utilization >= 70"\r
                                        [class.text-red-500]="m.utilization < 70">{{ m.utilization }}%</span>\r
                                    @if (m.since) {\r
                                    <span class="text-[9px] text-slate-400 font-semibold">\xB7 Since {{ m.since |\r
                                        date:'dd/MMM/yyyy' }}</span>\r
                                    }\r
                                </div>\r
                            </div>\r
                        </div>\r
                        } @empty {\r
                        <div class="py-6 text-center text-slate-400">\r
                            <span class="material-symbols-outlined text-2xl">search_off</span>\r
                            <p class="text-xs font-bold mt-1">No equipment found</p>\r
                        </div>\r
                        }\r
                    </div>\r
\r
                    <div\r
                        class="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between gap-3">\r
                        <div class="flex gap-3 text-[10px] font-bold text-slate-400">\r
                            <span>Active: <span class="text-green-600 font-black">{{ activeEquipmentsCount\r
                                    }}</span></span>\r
                            <span>Pending: <span class="text-amber-600 font-black">{{ pendingEquipmentsCount\r
                                    }}</span></span>\r
                        </div>\r
                        <button (click)="applyFilterDone()"\r
                            class="text-[11px] font-black text-primary hover:underline cursor-pointer">Done</button>\r
                    </div>\r
                </div>\r
                }\r
            </div>\r
\r
            <button (click)="exportCSV()"\r
                class="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 dark:bg-slate-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer">\r
                <span class="material-symbols-outlined text-[18px]">download</span>\r
                Export All (CSV)\r
            </button>\r
        </div>\r
    </div>\r
\r
    <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">\r
        @for (tab of tabs; track tab) {\r
        <button (click)="changeTab(tab)"\r
            [class]="selectedTab === tab ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-dim'"\r
            class="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-colors">\r
            {{ tab }}\r
            @if (tabCounts[tab] > 0) {\r
            <span\r
                [class]="selectedTab === tab ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'"\r
                class="px-2 py-0.5 rounded-full text-[11px] font-black">\r
                {{ tabCounts[tab] }}\r
            </span>\r
            }\r
        </button>\r
        }\r
    </div>\r
\r
    @if (isPartiallySelected) {\r
    <div class="flex items-center gap-2 flex-wrap -mt-4">\r
        <span class="text-xs font-black text-slate-400 uppercase tracking-wide">Showing:</span>\r
        @for (m of selectedEquipmentsList; track m.id) {\r
        <span\r
            class="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">\r
            {{ m.name }}\r
            <button (click)="removeEquipmentChip(m.id)"\r
                class="material-symbols-outlined text-[14px] leading-none border-none bg-transparent cursor-pointer text-primary hover:text-primary/70 p-0">\r
                close\r
            </button>\r
        </span>\r
        }\r
        <button (click)="clearAllEquipmentChips()"\r
            class="text-xs font-bold text-slate-400 underline hover:text-primary transition-colors border-none bg-transparent cursor-pointer">\r
            Clear all\r
        </button>\r
    </div>\r
    }\r
\r
    <div class="flex items-center justify-between gap-3 flex-wrap">\r
        <h3 class="text-xl font-black text-slate-800 dark:text-white">\r
            {{ sectionHeadingLabel }} \u2014 Activity History\r
        </h3>\r
\r
        <div\r
            class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full max-w-[320px]">\r
            <span class="material-symbols-outlined text-slate-400 text-[20px]">search</span>\r
            <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
                placeholder="Search history..."\r
                class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
        </div>\r
    </div>\r
\r
    <div>\r
\r
        @if (loading) {\r
        <div class="flex flex-col items-center justify-center gap-3 py-16">\r
            <div class="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>\r
            <p class="text-sm font-bold text-slate-400">Loading history...</p>\r
        </div>\r
        }\r
\r
        @if (!loading && !paginatedHistory.length) {\r
        <div\r
            class="text-center py-16 text-slate-400 font-bold rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">\r
            No history records found.\r
        </div>\r
        }\r
\r
        @if (!loading && paginatedHistory.length) {\r
        <div class="flex flex-col gap-6">\r
            @for (group of groupedHistory; track group.dateLabel) {\r
            <div class="flex flex-col gap-2">\r
\r
                <div class="flex items-center gap-3 px-1">\r
                    <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">\r
                        <span class="material-symbols-outlined text-primary text-[16px]">calendar_today</span>\r
                    </div>\r
                    <div class="flex-1 min-w-0">\r
                        <h4 class="text-sm font-black text-slate-800 dark:text-white">{{ group.dateLabel }}</h4>\r
                    </div>\r
                    <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">\r
                        {{ group.count }}\r
                    </span>\r
                </div>\r
\r
                <div\r
                    class="ml-4 pl-7 border-l-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col gap-2">\r
                    @for (item of group.items; track item.id) {\r
\r
                    <div\r
                        class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">\r
\r
                        <div [ngClass]="getActivityIconClass(item.status || '')"\r
                            class="absolute -left-[33px] top-4 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 shadow-sm">\r
                        </div>\r
\r
                        <div class="flex items-start gap-3 px-4 py-3.5">\r
\r
                            <div [ngClass]="getActivityIconClass(item.status || '')"\r
                                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5">\r
                                <span class="material-symbols-outlined text-[16px]">{{ getActivityIcon(item.status ||\r
                                    '')\r
                                    }}</span>\r
                            </div>\r
\r
                            <div class="flex-1 min-w-0">\r
                                <div class="flex items-center gap-2 flex-wrap mb-1">\r
                                    <span [ngClass]="statusBadgeClass(item.status || '')"\r
                                        class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">\r
                                        {{ item.status }}\r
                                    </span>\r
                                </div>\r
                                <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">\r
                                    {{ getActivityText(item) }}\r
                                </p>\r
                            </div>\r
\r
                            <div class="flex flex-col gap-3 shrink-0" style="min-width: 210px; max-width: 260px;">\r
\r
                                <div [ngClass]="getMetaBoxClass(item.status || '')"\r
                                    class="rounded-xl border px-3 py-2 shadow-sm">\r
                                    <div class="flex items-center justify-between gap-2">\r
                                        <span\r
                                            class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">\r
                                            {{ getMetaLabel(item.status || '') }} By:\r
                                        </span>\r
                                        <span [ngClass]="getMetaBadgeClass(item.status || '')"\r
                                            class="text-[8.5px] font-black px-2 py-0.5 rounded-full whitespace-nowrap max-w-[140px] truncate">\r
                                            {{ getActorName(item) }}\r
                                        </span>\r
                                    </div>\r
                                    <div class="flex items-center justify-between gap-2 mt-1">\r
                                        <span\r
                                            class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">\r
                                            {{ getMetaLabel(item.status || '') }} At:\r
                                        </span>\r
                                        <span [ngClass]="getMetaBadgeClass(item.status || '')"\r
                                            class="text-[8.5px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">\r
                                            {{ item.createdAt | date:'dd/MMM/yyyy, h:mm a' }}\r
                                        </span>\r
                                    </div>\r
                                </div>\r
\r
                            </div>\r
\r
                        </div>\r
                    </div>\r
                    }\r
                </div>\r
            </div>\r
            }\r
        </div>\r
        }\r
\r
        @if (!loading && totalFilteredEntries > 0) {\r
        <div\r
            class="flex items-center justify-between gap-3 flex-wrap px-1 pt-4 pb-1 mt-2 border-t border-slate-200 dark:border-slate-800">\r
            <p class="text-xs font-semibold text-slate-400">\r
                Showing <span class="font-black text-slate-800 dark:text-white">{{ pageStartIndex }}\u2013{{ pageEndIndex\r
                    }}</span>\r
                of <span class="font-black text-slate-800 dark:text-white">{{ totalFilteredEntries }}</span> entries\r
            </p>\r
\r
            <div class="flex items-center gap-1">\r
                <button (click)="prevPage()" [disabled]="page === 1"\r
                    class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-none bg-transparent"\r
                    title="Previous page">\r
                    <span class="material-symbols-outlined text-[18px]">chevron_left</span>\r
                </button>\r
\r
                @if (pageNumbers[0] > 1) {\r
                <button (click)="goToPage(1)"\r
                    class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border-none bg-transparent">\r
                    1\r
                </button>\r
                @if (pageNumbers[0] > 2) {\r
                <span class="px-1 text-xs font-bold text-slate-400">\u2026</span>\r
                }\r
                }\r
\r
                @for (p of pageNumbers; track p) {\r
                <button (click)="goToPage(p)"\r
                    class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-colors border-none"\r
                    [ngClass]="p === page ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent'">\r
                    {{ p }}\r
                </button>\r
                }\r
\r
                @if (pageNumbers[pageNumbers.length - 1] < totalPages) { @if (pageNumbers[pageNumbers.length - 1] <\r
                    totalPages - 1) { <span class="px-1 text-xs font-bold text-slate-400">\u2026</span>\r
                    }\r
                    <button (click)="goToPage(totalPages)"\r
                        class="min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border-none bg-transparent">\r
                        {{ totalPages }}\r
                    </button>\r
                    }\r
\r
                    <button (click)="nextPage()" [disabled]="page === totalPages"\r
                        class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors border-none bg-transparent"\r
                        title="Next page">\r
                        <span class="material-symbols-outlined text-[18px]">chevron_right</span>\r
                    </button>\r
            </div>\r
        </div>\r
        }\r
    </div>\r
\r
</section>` }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EquipmentInventoryHistory, { className: "EquipmentInventoryHistory", filePath: "app/modules/history/equipment-inventory-history/equipment-inventory-history.ts", lineNumber: 29 });
})();

// src/app/modules/history/employee-history/employee-history-services.ts
var EmployeeHistoryServices = class _EmployeeHistoryServices {
  http;
  baseUrl = environment.serverUrl + "/api/v1/team";
  constructor(http) {
    this.http = http;
  }
  getEmployeeHistory(userId, page = 1, limit = 20) {
    return this.http.get(`${this.baseUrl}/${userId}/history`, {
      params: { page, limit }
    });
  }
  getAllEmployeesForSuperAdmin() {
    return this.http.get(`${environment.serverUrl}/api/v1/getAllUsers`);
  }
  static \u0275fac = function EmployeeHistoryServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmployeeHistoryServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmployeeHistoryServices, factory: _EmployeeHistoryServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeHistoryServices, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/history/employee-history/employee-history.ts
var _c0 = (a0, a1, a2, a3, a4, a5) => ({ "bg-purple-50 text-purple-600": a0, "bg-blue-50 text-blue-600": a1, "bg-amber-50 text-amber-600": a2, "bg-emerald-50 text-emerald-600": a3, "bg-rose-50 text-rose-600": a4, "bg-slate-100 text-slate-600": a5 });
var _c1 = (a0, a1, a2, a3, a4, a5) => ({ "bg-purple-50 text-purple-700 border-purple-200": a0, "bg-blue-50 text-blue-700 border-blue-200": a1, "bg-amber-50 text-amber-700 border-amber-200": a2, "bg-emerald-50 text-emerald-700 border-emerald-200": a3, "bg-rose-50 text-rose-700 border-rose-200": a4, "bg-slate-100 text-slate-700 border-slate-200": a5 });
var _forTrack05 = ($index, $item) => $item.id;
function EmployeeHistory_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", ctx_r0.employeeName);
  }
}
function EmployeeHistory_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Loading... ");
  }
}
function EmployeeHistory_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ", ctx_r0.selectedMember.firstname, " ", ctx_r0.selectedMember.lastname, " ");
  }
}
function EmployeeHistory_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Select Employee ");
  }
}
function EmployeeHistory_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, " expand_more ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("rotate-180", ctx_r0.dropdownOpen)("text-violet-500", ctx_r0.dropdownOpen);
  }
}
function EmployeeHistory_Conditional_22_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function EmployeeHistory_Conditional_22_For_3_Template_button_click_0_listener() {
      const member_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectEmployee(member_r3));
    });
    \u0275\u0275elementStart(1, "div", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const member_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", member_r3.id === ctx_r0.employeeId ? "bg-violet-600 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", member_r3.firstname, " ", member_r3.lastname, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.humanizeRole(member_r3.role == null ? null : member_r3.role.name), " ");
  }
}
function EmployeeHistory_Conditional_22_ForEmpty_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1, "No employees found");
    \u0275\u0275elementEnd();
  }
}
function EmployeeHistory_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 17);
    \u0275\u0275repeaterCreate(2, EmployeeHistory_Conditional_22_For_3_Template, 5, 4, "button", 18, _forTrack05, false, EmployeeHistory_Conditional_22_ForEmpty_4_Template, 2, 0, "div", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r0.dropdownOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.teamMembers);
  }
}
function EmployeeHistory_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 23);
  }
}
function EmployeeHistory_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, EmployeeHistory_Conditional_23_For_2_Template, 1, 0, "div", 23, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.skeletonArray);
  }
}
function EmployeeHistory_Conditional_24_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 36)(2, "span", 37);
    \u0275\u0275text(3, "Created By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39)(7, "span", 37);
    \u0275\u0275text(8, "Created At:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 40);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", entry_r4.created_by, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 2, entry_r4.created_at, "dd/MMM/yyyy, hh:mm a"), " ");
  }
}
function EmployeeHistory_Conditional_24_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "span", 37);
    \u0275\u0275text(3, "Updated By:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39)(7, "span", 37);
    \u0275\u0275text(8, "Updated At:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 42);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", entry_r4.updated_by, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 2, entry_r4.updated_at, "dd/MMM/yyyy, hh:mm a"), " ");
  }
}
function EmployeeHistory_Conditional_24_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 27)(2, "div", 28)(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 30)(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 32);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 33);
    \u0275\u0275conditionalCreate(11, EmployeeHistory_Conditional_24_For_2_Conditional_11_Template, 12, 5, "div", 34)(12, EmployeeHistory_Conditional_24_For_2_Conditional_12_Template, 12, 5, "div", 35);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction6(6, _c0, ctx_r0.getTypeConfig(entry_r4.type).color === "purple", ctx_r0.getTypeConfig(entry_r4.type).color === "blue", ctx_r0.getTypeConfig(entry_r4.type).color === "amber", ctx_r0.getTypeConfig(entry_r4.type).color === "emerald", ctx_r0.getTypeConfig(entry_r4.type).color === "rose", ctx_r0.getTypeConfig(entry_r4.type).color === "slate"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getTypeConfig(entry_r4.type).icon);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction6(13, _c1, ctx_r0.getTypeConfig(entry_r4.type).color === "purple", ctx_r0.getTypeConfig(entry_r4.type).color === "blue", ctx_r0.getTypeConfig(entry_r4.type).color === "amber", ctx_r0.getTypeConfig(entry_r4.type).color === "emerald", ctx_r0.getTypeConfig(entry_r4.type).color === "rose", ctx_r0.getTypeConfig(entry_r4.type).color === "slate"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getTypeConfig(entry_r4.type).label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", entry_r4.message, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isCreationAction(entry_r4.type) ? 11 : 12);
  }
}
function EmployeeHistory_Conditional_24_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 43)(2, "span", 44);
    \u0275\u0275text(3, "history");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 45);
    \u0275\u0275text(5, "No History Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 46);
    \u0275\u0275text(7, "This employee has no recorded activity yet.");
    \u0275\u0275elementEnd()();
  }
}
function EmployeeHistory_Conditional_24_Conditional_4_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function EmployeeHistory_Conditional_24_Conditional_4_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function EmployeeHistory_Conditional_24_Conditional_4_For_8_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const p_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.goToPage(p_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", p_r7 === ctx_r0.page ? "bg-violet-600 border-violet-600 text-white" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r7, " ");
  }
}
function EmployeeHistory_Conditional_24_Conditional_4_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EmployeeHistory_Conditional_24_Conditional_4_For_8_Conditional_0_Template, 2, 0, "span", 51)(1, EmployeeHistory_Conditional_24_Conditional_4_For_8_Conditional_1_Template, 2, 2, "button", 52);
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275conditional(p_r7 === -1 ? 0 : 1);
  }
}
function EmployeeHistory_Conditional_24_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "p", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 48)(4, "button", 49);
    \u0275\u0275listener("click", function EmployeeHistory_Conditional_24_Conditional_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.prevPage());
    });
    \u0275\u0275elementStart(5, "span", 50);
    \u0275\u0275text(6, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(7, EmployeeHistory_Conditional_24_Conditional_4_For_8_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(9, "button", 49);
    \u0275\u0275listener("click", function EmployeeHistory_Conditional_24_Conditional_4_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.nextPage());
    });
    \u0275\u0275elementStart(10, "span", 50);
    \u0275\u0275text(11, "chevron_right");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Showing ", ctx_r0.rangeStart, "\u2013", ctx_r0.rangeEnd, " of ", ctx_r0.total, " entries ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.pageNumbers);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.page === ctx_r0.totalPages);
  }
}
function EmployeeHistory_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, EmployeeHistory_Conditional_24_For_2_Template, 13, 20, "div", 24, \u0275\u0275componentInstance().trackByEntry, true, EmployeeHistory_Conditional_24_ForEmpty_3_Template, 8, 0, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, EmployeeHistory_Conditional_24_Conditional_4_Template, 12, 5, "div", 26);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.history);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.total > 0 ? 4 : -1);
  }
}
var EmployeeHistory = class _EmployeeHistory {
  route;
  router;
  employeeHistoryServices;
  teamService;
  authService;
  toast;
  employeeId = null;
  employeeName = "";
  history = [];
  creationActions = ["INVITED", "INVITE_ACCEPTED", "ROLE_ASSIGNED"];
  teamMembers = [];
  loadingMembers = false;
  loading = false;
  page = 1;
  limit = 20;
  total = 0;
  totalPages = 1;
  skeletonArray = [1, 2, 3, 4];
  dropdownOpen = false;
  isSuperAdmin = false;
  typeConfig = {
    INVITED: { icon: "send", color: "blue", label: "Invited" },
    INVITE_ACCEPTED: { icon: "check_circle", color: "emerald", label: "Setup Complete" },
    ROLE_ASSIGNED: { icon: "admin_panel_settings", color: "purple", label: "Role Assigned" },
    ROLE_UPDATED: { icon: "admin_panel_settings", color: "purple", label: "Role Updated" },
    PROFILE_UPDATED: { icon: "edit", color: "amber", label: "Profile Updated" },
    STATUS_ACTIVATED: { icon: "check_circle", color: "emerald", label: "Activated" },
    STATUS_DEACTIVATED: { icon: "block", color: "rose", label: "Deactivated" }
  };
  constructor(route, router, employeeHistoryServices, teamService, authService, toast) {
    this.route = route;
    this.router = router;
    this.employeeHistoryServices = employeeHistoryServices;
    this.teamService = teamService;
    this.authService = authService;
    this.toast = toast;
  }
  ngOnInit() {
    const authUser = this.authService.getAuthUser();
    this.isSuperAdmin = authUser?.roleName === "SUPER_ADMIN";
    const idParam = this.route.snapshot.paramMap.get("id");
    if (!this.isSuperAdmin) {
      this.employeeId = authUser?.id ?? null;
    } else if (idParam && !isNaN(Number(idParam))) {
      this.employeeId = Number(idParam);
    }
    this.loadTeamMembers();
  }
  loadTeamMembers() {
    this.loadingMembers = true;
    const request$ = this.isSuperAdmin ? this.employeeHistoryServices.getAllEmployeesForSuperAdmin() : this.teamService.getTeamMembers();
    request$.subscribe({
      next: (res) => {
        this.teamMembers = res.data || [];
        this.loadingMembers = false;
        if (this.employeeId) {
          this.loadHistory(1);
        } else if (this.isSuperAdmin && this.teamMembers.length > 0) {
          this.employeeId = this.teamMembers[0].id;
          this.loadHistory(1);
        }
      },
      error: () => {
        this.loadingMembers = false;
        this.toast.error("Failed to load team members");
      }
    });
  }
  isCreationAction(type) {
    return this.creationActions.includes(type);
  }
  get selectedMember() {
    return this.teamMembers.find((m) => m.id === this.employeeId);
  }
  toggleDropdown() {
    if (!this.isSuperAdmin)
      return;
    if (this.loadingMembers || this.teamMembers.length === 0)
      return;
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectEmployee(member) {
    if (!this.isSuperAdmin)
      return;
    this.dropdownOpen = false;
    if (this.employeeId === member.id)
      return;
    this.employeeId = member.id;
    this.router.navigate(["/master/history/employee-history", this.employeeId]);
    this.loadHistory(1);
  }
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest(".employee-dropdown")) {
      this.dropdownOpen = false;
    }
  }
  loadHistory(targetPage) {
    if (!this.employeeId)
      return;
    if (targetPage < 1)
      return;
    if (this.totalPages && targetPage > this.totalPages)
      return;
    this.page = targetPage;
    this.loading = true;
    this.employeeHistoryServices.getEmployeeHistory(this.employeeId, this.page, this.limit).subscribe({
      next: (res) => {
        this.employeeName = res.employee?.name || "";
        this.history = res.data || [];
        this.total = res.pagination?.total || 0;
        this.totalPages = res.pagination?.totalPages || 1;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to load employee history");
      }
    });
  }
  goToPage(p) {
    if (p === this.page || p < 1 || p > this.totalPages)
      return;
    this.loadHistory(p);
  }
  prevPage() {
    this.goToPage(this.page - 1);
  }
  nextPage() {
    this.goToPage(this.page + 1);
  }
  get pageNumbers() {
    const total = this.totalPages;
    const current = this.page;
    const delta = 1;
    const pages = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || i >= current - delta && i <= current + delta) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== -1) {
        pages.push(-1);
      }
    }
    return pages;
  }
  get rangeStart() {
    return this.total === 0 ? 0 : (this.page - 1) * this.limit + 1;
  }
  get rangeEnd() {
    return Math.min(this.page * this.limit, this.total);
  }
  getTypeConfig(type) {
    return this.typeConfig[type] || { icon: "history", color: "slate", label: type };
  }
  humanizeRole(role) {
    if (!role)
      return "Unassigned";
    return role.toLowerCase().split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  trackByEntry(index, item) {
    return item.id;
  }
  static \u0275fac = function EmployeeHistory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmployeeHistory)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(EmployeeHistoryServices), \u0275\u0275directiveInject(TeamService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeHistory, selectors: [["app-employee-history"]], hostBindings: function EmployeeHistory_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function EmployeeHistory_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 25, vars: 15, consts: [[1, "employee-history-container", "p-6", "space-y-6"], [1, "bg-white", "dark:bg-slate-900", "p-6", "rounded-2xl", "shadow-sm", "border", "border-slate-100", "dark:border-slate-800"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "md:justify-between", "gap-4"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white", "m-0"], [1, "text-primary"], [1, "text-slate-500", "dark:text-slate-400", "mt-1", "m-0", "max-w-2xl"], [1, "employee-dropdown", "flex", "items-center", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "shadow-sm", "overflow-visible", "min-w-[460px]", "transition-shadow", "duration-300", "hover:shadow-md"], [1, "px-5", "py-3", "border-r", "border-slate-200", "dark:border-slate-700", "min-w-[130px]"], [1, "text-[10px]", "font-black", "uppercase", "tracking-[0.18em]", "text-slate-400", "m-0"], [1, "text-[15px]", "font-bold", "text-slate-800", "dark:text-white", "mt-0.5", "mb-0"], [1, "relative", "flex-1", "px-3", "py-2"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "px-4", "py-3", "text-sm", "font-semibold", "text-slate-700", "dark:text-slate-100", "transition-all", "duration-300", "ease-out", 3, "click", "ngClass"], [1, "truncate"], [1, "material-symbols-outlined", "text-[20px]", "text-slate-500", "transition-transform", "duration-300", "ease-out", 3, "rotate-180", "text-violet-500"], [1, "absolute", "left-3", "right-3", "top-full", "mt-2", "z-30", "bg-white", "dark:bg-slate-900", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "shadow-xl", "overflow-hidden", "origin-top", "transition-all", "duration-200", "ease-out", 3, "ngClass"], [1, "space-y-4"], [1, "material-symbols-outlined", "text-[20px]", "text-slate-500", "transition-transform", "duration-300", "ease-out"], [1, "employee-scroll-list", "max-h-72", "overflow-y-auto"], ["type", "button", 1, "w-full", "px-4", "py-3", "text-left", "text-sm", "font-medium", "transition-colors", "duration-200", "ease-out", 3, "ngClass"], [1, "px-4", "py-3", "text-sm", "text-slate-400", "text-center"], ["type", "button", 1, "w-full", "px-4", "py-3", "text-left", "text-sm", "font-medium", "transition-colors", "duration-200", "ease-out", 3, "click", "ngClass"], [1, "font-semibold"], [1, "text-xs", "opacity-70"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "p-5", "animate-pulse", "h-24"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "justify-between", "gap-4", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "p-5", "hover:shadow-lg", "hover:-translate-y-0.5", "transition-all", "duration-300"], [1, "flex", "flex-col", "items-center", "justify-center", "py-24", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "flex", "flex-col", "sm:flex-row", "items-center", "justify-between", "gap-4", "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "p-4"], [1, "flex", "items-center", "gap-4", "min-w-0"], [1, "w-11", "h-11", "rounded-2xl", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-[20px]"], [1, "min-w-0"], [1, "inline-block", "px-2.5", "py-0.5", "rounded-full", "border", "text-[9px]", "font-black", "uppercase", "tracking-widest", "mb-1", 3, "ngClass"], [1, "text-sm", "font-bold", "text-slate-800", "dark:text-slate-100", "m-0", "leading-relaxed"], [1, "shrink-0", 2, "min-width", "210px", "max-width", "260px"], [1, "rounded-xl", "border", "border-pink-200", "dark:border-pink-800/40", "bg-pink-50/60", "dark:bg-pink-900/10", "px-3", "py-2", "shadow-sm"], [1, "rounded-xl", "border", "border-blue-200", "dark:border-blue-800/40", "bg-blue-50/60", "dark:bg-blue-900/10", "px-3", "py-2", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "text-[8px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-pink-100", "text-pink-700", "whitespace-nowrap", "max-w-[140px]", "truncate"], [1, "flex", "items-center", "justify-between", "gap-2", "mt-1"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-pink-100", "text-pink-700", "whitespace-nowrap"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-blue-100", "text-blue-700", "whitespace-nowrap", "max-w-[140px]", "truncate"], [1, "text-[8.5px]", "font-black", "px-2", "py-0.5", "rounded-full", "bg-blue-100", "text-blue-700", "whitespace-nowrap"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-2"], [1, "text-xs", "font-bold", "text-slate-400", "m-0"], [1, "flex", "items-center", "gap-1.5"], ["type", "button", 1, "w-9", "h-9", "flex", "items-center", "justify-center", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "text-slate-500", "disabled:opacity-40", "disabled:cursor-not-allowed", "hover:bg-violet-50", "dark:hover:bg-violet-900/20", "transition-all", "cursor-pointer", "bg-white", "dark:bg-slate-800", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "flex", "items-center", "justify-center", "text-slate-400", "text-xs", "font-black"], ["type", "button", 1, "w-9", "h-9", "flex", "items-center", "justify-center", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", "border", 3, "ngClass"], ["type", "button", 1, "w-9", "h-9", "flex", "items-center", "justify-center", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", "border", 3, "click", "ngClass"]], template: function EmployeeHistory_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h2", 3);
      \u0275\u0275text(5, " Employee History ");
      \u0275\u0275conditionalCreate(6, EmployeeHistory_Conditional_6_Template, 2, 1, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, " Complete activity trail across projects, materials, and equipment for this team member. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "p", 8);
      \u0275\u0275text(12, " Employee ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 9);
      \u0275\u0275text(14, " Select Employee ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 10)(16, "button", 11);
      \u0275\u0275listener("click", function EmployeeHistory_Template_button_click_16_listener() {
        return ctx.toggleDropdown();
      });
      \u0275\u0275elementStart(17, "span", 12);
      \u0275\u0275conditionalCreate(18, EmployeeHistory_Conditional_18_Template, 1, 0)(19, EmployeeHistory_Conditional_19_Template, 1, 2)(20, EmployeeHistory_Conditional_20_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, EmployeeHistory_Conditional_21_Template, 2, 4, "span", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, EmployeeHistory_Conditional_22_Template, 5, 2, "div", 14);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(23, EmployeeHistory_Conditional_23_Template, 3, 0, "div", 15);
      \u0275\u0275conditionalCreate(24, EmployeeHistory_Conditional_24_Template, 5, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.employeeName ? 6 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-violet-500", ctx.dropdownOpen)("ring-2", ctx.dropdownOpen)("ring-violet-100", ctx.dropdownOpen)("dark:ring-violet-900", ctx.dropdownOpen);
      \u0275\u0275property("ngClass", ctx.isSuperAdmin ? "hover:border-violet-400 hover:bg-white dark:hover:bg-slate-700 cursor-pointer" : "cursor-default");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loadingMembers ? 18 : ctx.selectedMember ? 19 : 20);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isSuperAdmin ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSuperAdmin ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading ? 24 : -1);
    }
  }, dependencies: [NgClass, DatePipe], styles: ["\n.employee-scroll-list[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: #c4b5fd transparent;\n}\n.employee-scroll-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n}\n.employee-scroll-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.employee-scroll-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #c4b5fd;\n  border-radius: 999px;\n}\n.employee-scroll-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: #a78bfa;\n}\n/*# sourceMappingURL=employee-history.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeHistory, [{
    type: Component,
    args: [{ selector: "app-employee-history", standalone: false, template: `<div class="employee-history-container p-6 space-y-6">\r
\r
  <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">\r
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">\r
\r
      <div>\r
        <h2 class="text-3xl font-black text-slate-800 dark:text-white m-0">\r
          Employee History\r
          @if (employeeName) {\r
          <span class="text-primary"> \u2014 {{ employeeName }}</span>\r
          }\r
        </h2>\r
        <p class="text-slate-500 dark:text-slate-400 mt-1 m-0 max-w-2xl">\r
          Complete activity trail across projects, materials, and equipment for this team member.\r
        </p>\r
      </div>\r
\r
      <div\r
        class="employee-dropdown flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-visible min-w-[460px] transition-shadow duration-300 hover:shadow-md">\r
\r
        <div class="px-5 py-3 border-r border-slate-200 dark:border-slate-700 min-w-[130px]">\r
          <p class="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 m-0">\r
            Employee\r
          </p>\r
          <p class="text-[15px] font-bold text-slate-800 dark:text-white mt-0.5 mb-0">\r
            Select Employee\r
          </p>\r
        </div>\r
\r
        <div class="relative flex-1 px-3 py-2">\r
          <button type="button" (click)="toggleDropdown()"\r
            class="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-100 transition-all duration-300 ease-out"\r
            [ngClass]="isSuperAdmin ? 'hover:border-violet-400 hover:bg-white dark:hover:bg-slate-700 cursor-pointer' : 'cursor-default'"\r
            [class.border-violet-500]="dropdownOpen" [class.ring-2]="dropdownOpen"\r
            [class.ring-violet-100]="dropdownOpen" [class.dark:ring-violet-900]="dropdownOpen">\r
\r
            <span class="truncate">\r
              @if (loadingMembers) {\r
              Loading...\r
              } @else if (selectedMember) {\r
              {{ selectedMember.firstname }} {{ selectedMember.lastname }}\r
              } @else {\r
              Select Employee\r
              }\r
            </span>\r
\r
            @if (isSuperAdmin) {\r
            <span\r
              class="material-symbols-outlined text-[20px] text-slate-500 transition-transform duration-300 ease-out"\r
              [class.rotate-180]="dropdownOpen" [class.text-violet-500]="dropdownOpen">\r
              expand_more\r
            </span>\r
            }\r
\r
          </button>\r
          @if (isSuperAdmin) {\r
          <div\r
            class="absolute left-3 right-3 top-full mt-2 z-30 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden origin-top transition-all duration-200 ease-out"\r
            [ngClass]="dropdownOpen\r
      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'\r
      : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'">\r
\r
            <div class="employee-scroll-list max-h-72 overflow-y-auto">\r
\r
              @for (member of teamMembers; track member.id) {\r
              <button type="button" (click)="selectEmployee(member)"\r
                class="w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ease-out"\r
                [ngClass]="member.id === employeeId\r
          ? 'bg-violet-600 text-white'\r
          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'">\r
\r
                <div class="font-semibold">\r
                  {{ member.firstname }} {{ member.lastname }}\r
                </div>\r
\r
                <div class="text-xs opacity-70">\r
                  {{ humanizeRole(member.role?.name) }}\r
                </div>\r
\r
              </button>\r
              }\r
\r
              @empty {\r
              <div class="px-4 py-3 text-sm text-slate-400 text-center">No employees found</div>\r
              }\r
            </div>\r
          </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  @if (loading) {\r
  <div class="space-y-4">\r
    @for (i of skeletonArray; track i) {\r
    <div\r
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 animate-pulse h-24">\r
    </div>\r
    }\r
  </div>\r
  }\r
\r
  @if (!loading) {\r
  <div class="space-y-4">\r
\r
    @for (entry of history; track trackByEntry($index, entry)) {\r
    <div\r
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">\r
\r
      <div class="flex items-center gap-4 min-w-0">\r
\r
        <div [ngClass]="{\r
              'bg-purple-50 text-purple-600': getTypeConfig(entry.type).color === 'purple',\r
              'bg-blue-50 text-blue-600': getTypeConfig(entry.type).color === 'blue',\r
              'bg-amber-50 text-amber-600': getTypeConfig(entry.type).color === 'amber',\r
              'bg-emerald-50 text-emerald-600': getTypeConfig(entry.type).color === 'emerald',\r
              'bg-rose-50 text-rose-600': getTypeConfig(entry.type).color === 'rose',\r
              'bg-slate-100 text-slate-600': getTypeConfig(entry.type).color === 'slate'\r
            }" class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0">\r
          <span class="material-symbols-outlined text-[20px]">{{ getTypeConfig(entry.type).icon }}</span>\r
        </div>\r
\r
        <div class="min-w-0">\r
          <span [ngClass]="{\r
                'bg-purple-50 text-purple-700 border-purple-200': getTypeConfig(entry.type).color === 'purple',\r
                'bg-blue-50 text-blue-700 border-blue-200': getTypeConfig(entry.type).color === 'blue',\r
                'bg-amber-50 text-amber-700 border-amber-200': getTypeConfig(entry.type).color === 'amber',\r
                'bg-emerald-50 text-emerald-700 border-emerald-200': getTypeConfig(entry.type).color === 'emerald',\r
                'bg-rose-50 text-rose-700 border-rose-200': getTypeConfig(entry.type).color === 'rose',\r
                'bg-slate-100 text-slate-700 border-slate-200': getTypeConfig(entry.type).color === 'slate'\r
              }"\r
            class="inline-block px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest mb-1">\r
            {{ getTypeConfig(entry.type).label }}\r
          </span>\r
\r
          <p class="text-sm font-bold text-slate-800 dark:text-slate-100 m-0 leading-relaxed">\r
            {{ entry.message }}\r
          </p>\r
        </div>\r
\r
      </div>\r
\r
      <div class="shrink-0" style="min-width: 210px; max-width: 260px;">\r
        @if (isCreationAction(entry.type)) {\r
        <div\r
          class="rounded-xl border border-pink-200 dark:border-pink-800/40 bg-pink-50/60 dark:bg-pink-900/10 px-3 py-2 shadow-sm">\r
          <div class="flex items-center justify-between gap-2">\r
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
              By:</span>\r
            <span\r
              class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap max-w-[140px] truncate">\r
              {{ entry.created_by }}\r
            </span>\r
          </div>\r
          <div class="flex items-center justify-between gap-2 mt-1">\r
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Created\r
              At:</span>\r
            <span class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap">\r
              {{ entry.created_at | date:'dd/MMM/yyyy, hh:mm a' }}\r
            </span>\r
          </div>\r
        </div>\r
        } @else {\r
        <div\r
          class="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50/60 dark:bg-blue-900/10 px-3 py-2 shadow-sm">\r
          <div class="flex items-center justify-between gap-2">\r
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Updated\r
              By:</span>\r
            <span\r
              class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap max-w-[140px] truncate">\r
              {{ entry.updated_by }}\r
            </span>\r
          </div>\r
          <div class="flex items-center justify-between gap-2 mt-1">\r
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Updated\r
              At:</span>\r
            <span class="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">\r
              {{ entry.updated_at | date:'dd/MMM/yyyy, hh:mm a' }}\r
            </span>\r
          </div>\r
        </div>\r
        }\r
      </div>\r
\r
    </div>\r
    }\r
    @empty {\r
    <div\r
      class="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">\r
      <div\r
        class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 shadow-inner">\r
        <span class="material-symbols-outlined text-5xl text-slate-400">history</span>\r
      </div>\r
      <p class="text-xl font-black text-slate-700 dark:text-slate-200">No History Found</p>\r
      <p class="text-sm text-slate-400 mt-2">This employee has no recorded activity yet.</p>\r
    </div>\r
    }\r
\r
  </div>\r
\r
  @if (total > 0) {\r
  <div\r
    class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">\r
\r
    <p class="text-xs font-bold text-slate-400 m-0">\r
      Showing {{ rangeStart }}\u2013{{ rangeEnd }} of {{ total }} entries\r
    </p>\r
\r
    <div class="flex items-center gap-1.5">\r
      <button type="button" (click)="prevPage()" [disabled]="page === 1"\r
        class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all cursor-pointer bg-white dark:bg-slate-800">\r
        <span class="material-symbols-outlined text-[18px]">chevron_left</span>\r
      </button>\r
\r
      @for (p of pageNumbers; track $index) {\r
      @if (p === -1) {\r
      <span class="w-9 h-9 flex items-center justify-center text-slate-400 text-xs font-black">\u2026</span>\r
      } @else {\r
      <button type="button" (click)="goToPage(p)"\r
        class="w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition-all cursor-pointer border"\r
        [ngClass]="p === page\r
              ? 'bg-violet-600 border-violet-600 text-white'\r
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/20'">\r
        {{ p }}\r
      </button>\r
      }\r
      }\r
\r
      <button type="button" (click)="nextPage()" [disabled]="page === totalPages"\r
        class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all cursor-pointer bg-white dark:bg-slate-800">\r
        <span class="material-symbols-outlined text-[18px]">chevron_right</span>\r
      </button>\r
    </div>\r
\r
  </div>\r
  }\r
\r
  }\r
\r
</div>`, styles: ["/* src/app/modules/history/employee-history/employee-history.scss */\n.employee-scroll-list {\n  scrollbar-width: thin;\n  scrollbar-color: #c4b5fd transparent;\n}\n.employee-scroll-list::-webkit-scrollbar {\n  width: 5px;\n}\n.employee-scroll-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n.employee-scroll-list::-webkit-scrollbar-thumb {\n  background-color: #c4b5fd;\n  border-radius: 999px;\n}\n.employee-scroll-list::-webkit-scrollbar-thumb:hover {\n  background-color: #a78bfa;\n}\n/*# sourceMappingURL=employee-history.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: EmployeeHistoryServices }, { type: TeamService }, { type: AuthService }, { type: ToastrService }], { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeHistory, { className: "EmployeeHistory", filePath: "app/modules/history/employee-history/employee-history.ts", lineNumber: 34 });
})();

// src/app/modules/history/history-routing-module.ts
var routes = [
  { path: "history/vendor", component: VendorsHistory },
  { path: "history/project", component: ProjectHistory },
  { path: "history/resources/materials", component: MaterialInventoryHistory },
  { path: "history/resources/equipment-inventory", component: EquipmentInventoryHistory },
  { path: "employee-history/:id", component: EmployeeHistory }
];
var HistoryRoutingModule = class _HistoryRoutingModule {
  static \u0275fac = function HistoryRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HistoryRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _HistoryRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/history/history-module.ts
var HistoryModule = class _HistoryModule {
  static \u0275fac = function HistoryModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HistoryModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _HistoryModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, HistoryRoutingModule, FormsModule, ReactiveFormsModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryModule, [{
    type: NgModule,
    args: [{
      declarations: [
        VendorsHistory,
        ProjectHistory,
        MaterialInventoryHistory,
        EquipmentInventoryHistory,
        EmployeeHistory
      ],
      imports: [CommonModule, HistoryRoutingModule, FormsModule, ReactiveFormsModule]
    }]
  }], null, null);
})();
export {
  HistoryModule
};
//# sourceMappingURL=chunk-2USUCRQ4.js.map
