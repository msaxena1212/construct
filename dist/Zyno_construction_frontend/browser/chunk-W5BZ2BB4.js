import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  CommonModule,
  Component,
  DatePipe,
  HttpClient,
  HttpParams,
  Injectable,
  NgModule,
  Router,
  RouterModule,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-23RKHPSU.js";

// src/app/modules/portfolio/services/portfolio.service.ts
var PortfolioService = class _PortfolioService {
  http;
  baseUrl = `${environment.serverUrl}/api/v1/portfolio`;
  constructor(http) {
    this.http = http;
  }
  overview() {
    return this.http.get(`${this.baseUrl}/overview`).pipe(map((r) => r.data));
  }
  brief(narrative) {
    const params = new HttpParams().set("narrative", narrative ? "1" : "0");
    return this.http.get(`${this.baseUrl}/brief`, { params }).pipe(map((r) => r.data));
  }
  cashFlow(weeks = 13, projectId) {
    let params = new HttpParams().set("weeks", String(weeks));
    if (projectId)
      params = params.set("project_id", String(projectId));
    return this.http.get(`${this.baseUrl}/cash-flow`, { params }).pipe(map((r) => r.data));
  }
  vendors() {
    return this.http.get(`${this.baseUrl}/vendors`).pipe(map((r) => r.data));
  }
  criticalPath(projectId) {
    return this.http.get(`${this.baseUrl}/projects/${projectId}/critical-path`).pipe(map((r) => r.data));
  }
  static \u0275fac = function PortfolioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PortfolioService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PortfolioService, factory: _PortfolioService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortfolioService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/portfolio/portfolio.ts
var _c0 = () => [];
var _c1 = () => ["A", "B", "C", "D"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.area;
var _forTrack2 = ($index, $item) => $item.week;
var _forTrack3 = ($index, $item) => $item.key;
function Portfolio_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("As of ", \u0275\u0275pipeBind2(2, 1, ctx_r0.overview.as_of, "d MMM y, h:mm a"), ".");
  }
}
function Portfolio_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errors.overview);
  }
}
function Portfolio_Conditional_13_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" (", ctx_r0.overview.totals.approvals_escalated, " late) ");
  }
}
function Portfolio_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 45)(2, "p", 46);
    \u0275\u0275text(3, "Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 47);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 48)(7, "span", 49);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 50);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 51);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 45)(14, "p", 46);
    \u0275\u0275text(15, "Cost and schedule index");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 52)(17, "div")(18, "span", 53);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 54);
    \u0275\u0275text(21, "CPI");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "span", 53);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 54);
    \u0275\u0275text(26, "SPI");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "p", 55);
    \u0275\u0275text(28, "Below 1.00 means over cost or behind plan.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 45)(30, "p", 46);
    \u0275\u0275text(31, "Spent against budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "h2", 47);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p", 56);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 57);
    \u0275\u0275element(37, "div", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 45)(39, "p", 46);
    \u0275\u0275text(40, "Needs a decision");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "ul", 59)(42, "li", 60)(43, "span", 61);
    \u0275\u0275text(44, "Approvals waiting");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "b");
    \u0275\u0275text(46);
    \u0275\u0275conditionalCreate(47, Portfolio_Conditional_13_Conditional_47_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "li", 60)(49, "span", 61);
    \u0275\u0275text(50, "Guarantees expired or expiring");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "b");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "li", 60)(54, "span", 61);
    \u0275\u0275text(55, "High or critical snags");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "b");
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "li", 60)(59, "span", 61);
    \u0275\u0275text(60, "Variations pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "b");
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.overview.totals.projects);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.overview.totals.rag.red, " red");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.overview.totals.rag.amber, " amber");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.overview.totals.rag.green, " green");
    \u0275\u0275advance(6);
    \u0275\u0275classMap(ctx_r0.indexClass(ctx_r0.overview.totals.cpi));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.index(ctx_r0.overview.totals.cpi));
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.indexClass(ctx_r0.overview.totals.spi));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.index(ctx_r0.overview.totals.spi));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.inr(ctx_r0.overview.totals.ac));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("of ", ctx_r0.inr(ctx_r0.overview.totals.bac), " approved budget");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.overview.totals.bac ? ctx_r0.overview.totals.ac / ctx_r0.overview.totals.bac * 100 : 0, "%");
    \u0275\u0275advance(8);
    \u0275\u0275classMap(ctx_r0.overview.totals.approvals_escalated ? "text-red-600" : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.overview.totals.approvals_waiting, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.overview.totals.approvals_escalated ? 47 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.overview.totals.guarantees_expired_active ? "text-red-600" : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.overview.totals.guarantees_expired_active, " / ", ctx_r0.overview.totals.guarantees_expiring);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.overview.totals.open_snags_high_or_critical);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.inr(ctx_r0.overview.totals.pending_variation_amount));
  }
}
function Portfolio_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "Loading the portfolio\u2026");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.brief == null ? null : ctx_r0.brief.narrative);
  }
}
function Portfolio_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" The AI briefing could not be written, so none is shown. ", ctx_r0.brief == null ? null : ctx_r0.brief.narrative_reason, " ");
  }
}
function Portfolio_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errors.narrative);
  }
}
function Portfolio_Conditional_29_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 62)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 64);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.severityClasses(f_r2.severity));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r2.severity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r2.message);
  }
}
function Portfolio_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 18);
    \u0275\u0275repeaterCreate(1, Portfolio_Conditional_29_For_2_Template, 5, 4, "li", 62, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.brief.findings);
  }
}
function Portfolio_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "No open portfolio issues.");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_For_62_Conditional_26_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 88)(1, "span", 89);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("+", d_r6.points);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r6.message);
  }
}
function Portfolio_For_62_Conditional_26_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 81);
    \u0275\u0275repeaterCreate(1, Portfolio_For_62_Conditional_26_Conditional_6_For_2_Template, 5, 2, "li", 88, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(p_r4.risk.drivers);
  }
}
function Portfolio_For_62_Conditional_26_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 82);
    \u0275\u0275text(1, "Nothing is adding to this project's risk.");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_For_62_Conditional_26_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Could not be calculated: ", p_r4.risk.unknown.join(", "), ". These add nothing to the score and are not assumed to be fine.");
  }
}
function Portfolio_For_62_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 77)(1, "td", 78)(2, "div", 79)(3, "div")(4, "h3", 80);
    \u0275\u0275text(5, "Why this score");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, Portfolio_For_62_Conditional_26_Conditional_6_Template, 3, 0, "ul", 81)(7, Portfolio_For_62_Conditional_26_Conditional_7_Template, 2, 0, "p", 82);
    \u0275\u0275conditionalCreate(8, Portfolio_For_62_Conditional_26_Conditional_8_Template, 2, 1, "p", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 84)(10, "h3", 80);
    \u0275\u0275text(11, "Facts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div");
    \u0275\u0275text(13, "Open snags: ");
    \u0275\u0275elementStart(14, "b");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div");
    \u0275\u0275text(18, "Approvals waiting: ");
    \u0275\u0275elementStart(19, "b");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div");
    \u0275\u0275text(23, "Overdue tasks: ");
    \u0275\u0275elementStart(24, "b");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " \xB7 Workforce (daily average): ");
    \u0275\u0275elementStart(27, "b");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div");
    \u0275\u0275text(30, "Last daily report: ");
    \u0275\u0275elementStart(31, "b");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div");
    \u0275\u0275text(34, "Variations pending: ");
    \u0275\u0275elementStart(35, "b");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div");
    \u0275\u0275text(39, "Planned completion: ");
    \u0275\u0275elementStart(40, "b");
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 85)(43, "button", 86);
    \u0275\u0275listener("click", function Portfolio_For_62_Conditional_26_Template_button_click_43_listener($event) {
      \u0275\u0275restoreView(_r5);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.showPath(p_r4.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(44, "Critical path");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 87);
    \u0275\u0275listener("click", function Portfolio_For_62_Conditional_26_Template_button_click_45_listener($event) {
      \u0275\u0275restoreView(_r5);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.openProject(p_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(46, "Open project");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(p_r4.risk.drivers.length ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r4.risk.unknown.length ? 8 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(p_r4.open_snags.critical + p_r4.open_snags.high + p_r4.open_snags.medium + p_r4.open_snags.low);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", p_r4.open_snags.critical + p_r4.open_snags.high, " high or critical)");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r4.approvals_waiting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", p_r4.approvals_escalated, " late)");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r4.overdue_tasks);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.avg_daily_workforce);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r4.days_since_dpr === null ? "none" : p_r4.days_since_dpr + " day(s) ago");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r4.pending_variations.count);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", ctx_r0.inr(p_r4.pending_variations.amount), ")");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r4.completion_date ?? "\u2014");
  }
}
function Portfolio_For_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 65);
    \u0275\u0275listener("click", function Portfolio_For_62_Template_tr_click_0_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleProject(p_r4.id));
    });
    \u0275\u0275elementStart(1, "td", 66)(2, "div", 67);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 68);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 69);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 70)(9, "div", 71);
    \u0275\u0275element(10, "div", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 73);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 74);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 74);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 74);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 74);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 74);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 75)(24, "span", 76);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(26, Portfolio_For_62_Conditional_26_Template, 47, 12, "tr", 77);
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-project", p_r4.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", p_r4.code, " \xB7 ", p_r4.location);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.status);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", p_r4.progress, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r4.progress, "%");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.indexClass(p_r4.cpi));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.index(p_r4.cpi));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.indexClass(p_r4.spi));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.index(p_r4.spi));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.inr(p_r4.bac));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.inr(p_r4.ac));
    \u0275\u0275advance();
    \u0275\u0275classProp("text-red-600", p_r4.eac !== null && p_r4.eac > p_r4.bac);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.inr(p_r4.eac));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.ragClasses(p_r4.risk.rag));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", p_r4.risk.score, " ", p_r4.risk.rag);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.expandedProjectId === p_r4.id ? 26 : -1);
  }
}
function Portfolio_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 90);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.inr(ctx_r0.cash.total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("over ", ctx_r0.cash.weeks.length, " weeks \xB7 ", ctx_r0.cash.items_counted, " items");
  }
}
function Portfolio_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errors.cash);
  }
}
function Portfolio_Conditional_72_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275element(1, "div", 99);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", "Week " + w_r7.week + " from " + w_r7.starts_on + ": " + ctx_r0.inr(w_r7.total) + (w_r7.overdue ? " (" + ctx_r0.inr(w_r7.overdue) + " overdue)" : ""));
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", ctx_r0.barHeight(w_r7.total), "%");
    \u0275\u0275classProp("bg-red-500", w_r7.overdue > 0);
  }
}
function Portfolio_Conditional_72_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("W", w_r8.week);
  }
}
function Portfolio_Conditional_72_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 60)(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.sourceLabel(s_r9.key));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.inr(s_r9.amount));
  }
}
function Portfolio_Conditional_72_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 97);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("Peak: week ", ctx_r0.cash.peak_week.week, " (", ctx_r0.cash.peak_week.starts_on, ") at ", ctx_r0.inr(ctx_r0.cash.peak_week.total), ". Red bars include overdue items.");
  }
}
function Portfolio_Conditional_72_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r10);
  }
}
function Portfolio_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275repeaterCreate(1, Portfolio_Conditional_72_For_2_Template, 2, 5, "div", 92, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 93);
    \u0275\u0275repeaterCreate(4, Portfolio_Conditional_72_For_5_Template, 2, 1, "div", 94, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 95)(7, "div")(8, "h3", 80);
    \u0275\u0275text(9, "By source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "ul", 96);
    \u0275\u0275repeaterCreate(11, Portfolio_Conditional_72_For_12_Template, 5, 2, "li", 60, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, Portfolio_Conditional_72_Conditional_13_Template, 2, 3, "p", 97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "h3", 80);
    \u0275\u0275text(16, "Assumptions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "ul", 98);
    \u0275\u0275repeaterCreate(18, Portfolio_Conditional_72_For_19_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.cash.weeks);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.cash.weeks);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r0.sources(ctx_r0.cash.by_source));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.cash.peak_week ? 13 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.cash.assumptions);
  }
}
function Portfolio_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_For_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", p_r11.id)("selected", p_r11.id === ctx_r0.pathProjectId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r11.name);
  }
}
function Portfolio_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errors.path);
  }
}
function Portfolio_Conditional_85_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 103);
    \u0275\u0275text(2, "Margin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "b", 104);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-red-600", ctx_r0.path.days_to_contract_completion < 0)("text-emerald-600", ctx_r0.path.days_to_contract_completion >= 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.path.days_to_contract_completion, " days");
  }
}
function Portfolio_Conditional_85_Conditional_0_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "div", 108)(2, "span", 109);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 110);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 111);
    \u0275\u0275element(7, "div", 112);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 113);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("title", t_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", t_r12.status, " \xB7 ", t_r12.duration_days, "d", t_r12.duration_basis === "default" ? " (assumed)" : "");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(t_r12.critical ? "bg-red-500" : "bg-sky-400");
    \u0275\u0275styleProp("left", ctx_r0.barLeft(t_r12.early_start), "%")("width", ctx_r0.barWidth(t_r12.duration_days), "%");
    \u0275\u0275property("title", t_r12.early_start + " to " + t_r12.early_finish);
    \u0275\u0275advance();
    \u0275\u0275classMap(t_r12.critical ? "text-red-600" : "text-slate-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r12.critical ? "CRITICAL" : t_r12.float_days + "d float");
  }
}
function Portfolio_Conditional_85_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102)(1, "div")(2, "span", 103);
    \u0275\u0275text(3, "Duration");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "b", 104);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "span", 103);
    \u0275\u0275text(8, "Finish by the plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "b", 104);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "span", 103);
    \u0275\u0275text(13, "Contract completion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "b", 104);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, Portfolio_Conditional_85_Conditional_0_Conditional_16_Template, 5, 5, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 105);
    \u0275\u0275repeaterCreate(18, Portfolio_Conditional_85_Conditional_0_For_19_Template, 10, 15, "div", 106, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 107);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.path.duration_days, " days");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.path.finish_date);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.path.contract_completion_date ?? "\u2014");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.path.days_to_contract_completion !== null && ctx_r0.path.days_to_contract_completion !== void 0 ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.path.tasks);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.path.method);
  }
}
function Portfolio_Conditional_85_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "b");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r13.title);
  }
}
function Portfolio_Conditional_85_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275text(1, "These tasks depend on each other in a loop, so no path can be calculated: ");
    \u0275\u0275repeaterCreate(2, Portfolio_Conditional_85_Conditional_1_For_3_Template, 2, 1, "b", null, _forTrack0);
    \u0275\u0275text(4, ". Remove one link to fix it.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.path.cycle ?? \u0275\u0275pureFunction0(0, _c0));
  }
}
function Portfolio_Conditional_85_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 101);
    \u0275\u0275text(1, "This project has no tasks yet, so there is no path to calculate.");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Portfolio_Conditional_85_Conditional_0_Template, 22, 5)(1, Portfolio_Conditional_85_Conditional_1_Template, 5, 1, "div", 100)(2, Portfolio_Conditional_85_Conditional_2_Template, 2, 0, "p", 101);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.path.applicable ? 0 : ctx_r0.path.reason === "dependency_cycle" ? 1 : 2);
  }
}
function Portfolio_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Calculating\u2026");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_Conditional_95_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.gradeClasses(g_r14));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", g_r14, " ", ctx_r0.vendorCard.summary.grades[g_r14]);
  }
}
function Portfolio_Conditional_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275repeaterCreate(1, Portfolio_Conditional_95_For_2_Template, 2, 4, "span", 114, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function Portfolio_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errors.vendors);
  }
}
function Portfolio_For_118_Conditional_12_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 88)(1, "b", 122);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r17 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-", r_r17.points);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r17.reason);
  }
}
function Portfolio_For_118_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 121);
    \u0275\u0275repeaterCreate(1, Portfolio_For_118_Conditional_12_Conditional_2_For_2_Template, 5, 2, "li", 88, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r16 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(v_r16.reasons);
  }
}
function Portfolio_For_118_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 82);
    \u0275\u0275text(1, "No deductions: registered, nothing rejected, no open snags.");
    \u0275\u0275elementEnd();
  }
}
function Portfolio_For_118_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 77)(1, "td", 120);
    \u0275\u0275conditionalCreate(2, Portfolio_For_118_Conditional_12_Conditional_2_Template, 3, 0, "ul", 121)(3, Portfolio_For_118_Conditional_12_Conditional_3_Template, 2, 0, "p", 82);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(v_r16.reasons.length ? 2 : 3);
  }
}
function Portfolio_For_118_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 65);
    \u0275\u0275listener("click", function Portfolio_For_118_Template_tr_click_0_listener() {
      const v_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleVendor(v_r16.id));
    });
    \u0275\u0275elementStart(1, "td", 116);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 117);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 118);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 30)(10, "span", 119);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(12, Portfolio_For_118_Conditional_12_Template, 4, 1, "tr", 77);
  }
  if (rf & 2) {
    const v_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r16.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r16.skill);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r16.gst_registered ? "Registered" : "Missing");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r16.score);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.gradeClasses(v_r16.grade));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r16.grade);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.expandedVendorId === v_r16.id ? 12 : -1);
  }
}
function Portfolio_ForEmpty_119_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 123);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.loading.vendors ? "Loading\u2026" : "No vendors to show.");
  }
}
var SOURCE_LABELS = {
  payment_requests: "Payment requests",
  ra_bills: "RA bills",
  vendor_invoices: "Vendor invoices",
  open_purchase_orders: "Open purchase orders"
};
var Portfolio = class _Portfolio {
  service;
  router;
  overview = null;
  cash = null;
  vendorCard = null;
  brief = null;
  path = null;
  loading = { overview: true, cash: true, vendors: true, brief: true, path: false, narrative: false };
  errors = {};
  expandedProjectId = null;
  pathProjectId = null;
  expandedVendorId = null;
  vendorFilter = "needs_attention";
  constructor(service, router) {
    this.service = service;
    this.router = router;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.fetch("overview", this.service.overview(), (d) => {
      this.overview = d;
      if (!this.pathProjectId && d.projects.length)
        this.showPath(d.projects[0].id);
    });
    this.fetch("cash", this.service.cashFlow(13), (d) => this.cash = d);
    this.fetch("vendors", this.service.vendors(), (d) => this.vendorCard = d);
    this.fetch("brief", this.service.brief(false), (d) => this.brief = d);
  }
  generateNarrative() {
    this.loading["narrative"] = true;
    delete this.errors["narrative"];
    this.service.brief(true).subscribe({
      next: (d) => {
        this.brief = d;
        this.loading["narrative"] = false;
      },
      error: () => {
        this.errors["narrative"] = "The briefing could not be requested.";
        this.loading["narrative"] = false;
      }
    });
  }
  showPath(projectId) {
    this.pathProjectId = projectId;
    this.fetch("path", this.service.criticalPath(projectId), (d) => this.path = d);
  }
  onPathProjectChange(event) {
    const id = Number(event.target.value);
    if (id)
      this.showPath(id);
  }
  toggleProject(id) {
    this.expandedProjectId = this.expandedProjectId === id ? null : id;
  }
  toggleVendor(id) {
    this.expandedVendorId = this.expandedVendorId === id ? null : id;
  }
  openProject(p) {
    this.router.navigate(["/master/projects"], { queryParams: { projectId: p.id } });
  }
  setVendorFilter(filter) {
    this.vendorFilter = filter;
  }
  get vendorsShown() {
    const all = this.vendorCard?.vendors ?? [];
    return this.vendorFilter === "all" ? all : all.filter((v) => v.grade === "C" || v.grade === "D" || v.score < 80);
  }
  // ---- formatting -----------------------------------------------------------------------------------------------
  /** Indian crore / lakh notation for large rupee amounts. */
  inr(value) {
    if (value === null || value === void 0)
      return "\u2014";
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 1e7)
      return `${sign}\u20B9${(abs / 1e7).toFixed(2)} Cr`;
    if (abs >= 1e5)
      return `${sign}\u20B9${(abs / 1e5).toFixed(2)} L`;
    return `${sign}\u20B9${abs.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  }
  index(value) {
    return value === null || value === void 0 ? "\u2014" : value.toFixed(2);
  }
  indexClass(value) {
    if (value === null || value === void 0)
      return "text-slate-400";
    if (value < 0.85)
      return "text-red-600 font-bold";
    if (value < 0.95)
      return "text-amber-600 font-bold";
    return "text-emerald-600 font-bold";
  }
  ragClasses(rag) {
    switch (rag) {
      case "red":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
      case "amber":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
      default:
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    }
  }
  gradeClasses(grade) {
    switch (grade) {
      case "A":
        return "bg-emerald-100 text-emerald-700";
      case "B":
        return "bg-sky-100 text-sky-700";
      case "C":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-red-100 text-red-700";
    }
  }
  severityClasses(severity) {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  }
  sourceLabel(key) {
    return SOURCE_LABELS[key] ?? key;
  }
  sources(by) {
    return Object.keys(by).map((key) => ({ key, amount: by[key] }));
  }
  /** Bar height for a week, as a percentage of the largest week. */
  barHeight(total) {
    const max = Math.max(1, ...(this.cash?.weeks ?? []).map((w) => w.total));
    return Math.max(total > 0 ? 3 : 0, Math.round(total / max * 100));
  }
  /** Left offset (percent) of a task bar on the critical-path chart. */
  barLeft(start) {
    const span = this.path?.duration_days ?? 1;
    const anchor = this.path?.anchor_date ? new Date(this.path.anchor_date).getTime() : 0;
    return Math.max(0, Math.min(98, (new Date(start).getTime() - anchor) / 864e5 / span * 100));
  }
  barWidth(days) {
    const span = this.path?.duration_days ?? 1;
    return Math.max(2, Math.min(100, days / span * 100));
  }
  fetch(section, source, assign) {
    this.loading[section] = true;
    delete this.errors[section];
    source.subscribe({
      next: (d) => {
        assign(d);
        this.loading[section] = false;
      },
      error: (err) => {
        this.errors[section] = err?.status === 403 ? "You do not have access to this view." : "This section could not be loaded.";
        this.loading[section] = false;
      }
    });
  }
  static \u0275fac = function Portfolio_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Portfolio)(\u0275\u0275directiveInject(PortfolioService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Portfolio, selectors: [["app-portfolio"]], standalone: false, decls: 120, vars: 28, consts: [[1, "space-y-8", "pb-10"], [1, "flex", "flex-wrap", "items-end", "justify-between", "gap-4"], [1, "text-3xl", "font-black", "text-slate-900", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "font-semibold"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-5", "py-3", "rounded-2xl", "bg-slate-900", "text-white", "dark:bg-white", "dark:text-slate-900", "font-bold", "text-sm", "hover:opacity-90", "transition", 3, "click"], [1, "material-symbols-outlined", "text-base"], [1, "rounded-2xl", "border", "border-red-200", "bg-red-50", "text-red-700", "p-4", "font-semibold"], ["data-testid", "kpis", 1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-4", "gap-6"], [1, "text-slate-400", "font-semibold"], ["data-testid", "brief", 1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "p-6", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "mb-4"], [1, "text-xl", "font-black", "text-slate-900", "dark:text-white"], [1, "text-sm", "text-slate-500"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-5", "py-3", "rounded-2xl", "bg-violet-600", "text-white", "font-bold", "text-sm", "hover:bg-violet-700", "disabled:opacity-60", "transition", 3, "click", "disabled"], ["data-testid", "narrative", 1, "rounded-2xl", "bg-violet-50", "dark:bg-violet-950/40", "border", "border-violet-200", "dark:border-violet-900", "p-5", "mb-5", "text-slate-800", "dark:text-slate-100", "whitespace-pre-line"], ["data-testid", "narrative-unavailable", 1, "rounded-2xl", "bg-amber-50", "border", "border-amber-200", "text-amber-800", "p-4", "mb-5", "text-sm"], [1, "text-red-600", "text-sm", "mb-3"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800"], [1, "text-emerald-600", "font-semibold"], [1, "text-slate-400"], ["data-testid", "risk-board", 1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden"], [1, "p-6", "pb-3"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "text-left", "text-xs", "uppercase", "tracking-wide", "text-slate-400", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "px-6", "py-3"], [1, "px-3", "py-3"], [1, "px-3", "py-3", "w-40"], [1, "px-3", "py-3", "text-right"], [1, "px-6", "py-3", "text-right"], ["data-testid", "cash", 1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "p-6", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800"], [1, "flex", "flex-wrap", "items-end", "justify-between", "gap-3", "mb-5"], [1, "text-right"], [1, "text-red-600", "text-sm"], ["data-testid", "critical-path", 1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "p-6", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800"], [1, "rounded-xl", "border", "border-slate-300", "dark:border-slate-600", "bg-white", "dark:bg-slate-800", "px-4", "py-2", "text-sm", "font-semibold", 3, "change", "value"], [3, "value", "selected"], ["data-testid", "vendors", 1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800", "overflow-hidden"], [1, "p-6", "pb-3", "flex", "flex-wrap", "items-end", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-3"], [1, "flex", "gap-1.5", "text-xs", "font-black"], [1, "inline-flex", "rounded-xl", "border", "border-slate-300", "dark:border-slate-600", "overflow-hidden", "text-xs", "font-bold"], ["type", "button", 1, "px-3", "py-2", 3, "click"], [1, "px-6", "pb-4", "text-red-600", "text-sm"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "p-6", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800"], [1, "text-slate-400", "text-sm", "font-bold", "uppercase", "tracking-wide"], [1, "text-4xl", "font-black", "text-slate-900", "dark:text-white", "mt-2"], [1, "flex", "gap-2", "mt-4", "text-xs", "font-bold"], [1, "px-3", "py-1", "rounded-full", "bg-red-100", "text-red-700"], [1, "px-3", "py-1", "rounded-full", "bg-amber-100", "text-amber-700"], [1, "px-3", "py-1", "rounded-full", "bg-emerald-100", "text-emerald-700"], [1, "flex", "items-baseline", "gap-6", "mt-2"], [1, "text-4xl", "font-black"], [1, "block", "text-xs", "text-slate-400", "font-bold", "mt-1"], [1, "text-xs", "text-slate-500", "mt-4"], [1, "text-sm", "text-slate-500", "mt-2"], [1, "h-2", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "mt-3", "overflow-hidden"], [1, "h-full", "rounded-full", "bg-blue-500"], [1, "mt-3", "space-y-2", "text-sm"], [1, "flex", "justify-between"], [1, "text-slate-600", "dark:text-slate-300"], [1, "py-3", "flex", "items-start", "gap-3"], [1, "shrink-0", "mt-0.5", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-black", "uppercase"], [1, "text-slate-700", "dark:text-slate-200"], [1, "border-b", "border-slate-50", "dark:border-slate-800/60", "hover:bg-slate-50", "dark:hover:bg-slate-800/40", "cursor-pointer", 3, "click"], [1, "px-6", "py-4"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "text-xs", "text-slate-400"], [1, "px-3", "py-4", "text-slate-600", "dark:text-slate-300"], [1, "px-3", "py-4"], [1, "h-2", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "overflow-hidden"], [1, "h-full", "bg-blue-500"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "px-3", "py-4", "text-right"], [1, "px-6", "py-4", "text-right"], [1, "inline-block", "min-w-[4.5rem]", "text-center", "px-3", "py-1", "rounded-full", "text-xs", "font-black", "uppercase"], [1, "bg-slate-50/70", "dark:bg-slate-800/30"], ["colspan", "9", 1, "px-6", "py-5"], [1, "grid", "md:grid-cols-2", "gap-6"], [1, "text-xs", "font-black", "uppercase", "tracking-wide", "text-slate-400", "mb-2"], [1, "space-y-2", "text-sm"], [1, "text-emerald-600", "text-sm", "font-semibold"], [1, "text-xs", "text-slate-400", "mt-3"], [1, "text-sm", "space-y-1", "text-slate-600", "dark:text-slate-300"], [1, "pt-2", "flex", "gap-3"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "bg-blue-600", "text-white", "text-xs", "font-bold", "hover:bg-blue-700", 3, "click"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "border", "border-slate-300", "dark:border-slate-600", "text-xs", "font-bold", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [1, "flex", "gap-3"], [1, "shrink-0", "font-black", "text-slate-900", "dark:text-white", "w-10"], [1, "text-xs", "text-slate-400", "font-bold"], [1, "bar-track", "flex", "items-end", "gap-2"], [1, "flex-1", "flex", "flex-col", "justify-end", "h-full", "group", "relative", 3, "title"], [1, "flex", "gap-2", "mt-2", "text-[10px]", "text-slate-400", "font-bold"], [1, "flex-1", "text-center"], [1, "grid", "md:grid-cols-2", "gap-6", "mt-6"], [1, "text-sm", "space-y-1"], [1, "text-xs", "text-slate-500", "mt-3"], [1, "text-xs", "text-slate-500", "space-y-1", "list-disc", "pl-4"], [1, "w-full", "rounded-t-lg", "bg-blue-500", "group-hover:bg-blue-600", "transition-all"], [1, "rounded-2xl", "bg-red-50", "border", "border-red-200", "text-red-700", "p-4", "text-sm"], [1, "text-slate-500", "text-sm"], [1, "flex", "flex-wrap", "gap-6", "text-sm", "mb-5"], [1, "text-slate-400", "font-bold", "block", "text-xs", "uppercase"], [1, "text-lg"], [1, "space-y-2"], [1, "grid", "grid-cols-12", "items-center", "gap-3", "text-sm"], [1, "text-xs", "text-slate-400", "mt-4"], [1, "col-span-4", "truncate", 3, "title"], [1, "font-semibold", "text-slate-800", "dark:text-slate-100"], [1, "block", "text-xs", "text-slate-400"], [1, "col-span-6", "relative", "h-6", "rounded", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "top-0", "h-6", "rounded", 3, "title"], [1, "col-span-2", "text-right", "text-xs", "font-bold"], [1, "px-2.5", "py-1", "rounded-full", 3, "class"], [1, "px-2.5", "py-1", "rounded-full"], [1, "px-6", "py-3", "font-bold", "text-slate-900", "dark:text-white"], [1, "px-3", "py-3", "text-slate-500"], [1, "px-3", "py-3", "text-right", "font-bold"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-black"], ["colspan", "5", 1, "px-6", "py-4"], [1, "space-y-1", "text-sm"], [1, "w-12", "text-red-600"], ["colspan", "5", 1, "px-6", "py-6", "text-slate-400"]], template: function Portfolio_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Portfolio Command Center");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Every project's cost, schedule and risk in one view. All figures come from the project records; nothing here is estimated by a model. ");
      \u0275\u0275conditionalCreate(7, Portfolio_Conditional_7_Template, 3, 4, "span", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function Portfolio_Template_button_click_8_listener() {
        return ctx.load();
      });
      \u0275\u0275elementStart(9, "span", 6);
      \u0275\u0275text(10, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Refresh ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, Portfolio_Conditional_12_Template, 2, 1, "div", 7);
      \u0275\u0275conditionalCreate(13, Portfolio_Conditional_13_Template, 63, 24, "div", 8)(14, Portfolio_Conditional_14_Template, 2, 0, "div", 9);
      \u0275\u0275elementStart(15, "section", 10)(16, "div", 11)(17, "div")(18, "h2", 12);
      \u0275\u0275text(19, "What needs attention");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "p", 13);
      \u0275\u0275text(21, "Findings are calculated from the records, most urgent first.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "button", 14);
      \u0275\u0275listener("click", function Portfolio_Template_button_click_22_listener() {
        return ctx.generateNarrative();
      });
      \u0275\u0275elementStart(23, "span", 6);
      \u0275\u0275text(24, "auto_awesome");
      \u0275\u0275elementEnd();
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(26, Portfolio_Conditional_26_Template, 2, 1, "div", 15);
      \u0275\u0275conditionalCreate(27, Portfolio_Conditional_27_Template, 2, 1, "div", 16);
      \u0275\u0275conditionalCreate(28, Portfolio_Conditional_28_Template, 2, 1, "div", 17);
      \u0275\u0275conditionalCreate(29, Portfolio_Conditional_29_Template, 3, 0, "ul", 18)(30, Portfolio_Conditional_30_Template, 2, 0, "p", 19)(31, Portfolio_Conditional_31_Template, 2, 0, "p", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "section", 21)(33, "div", 22)(34, "h2", 12);
      \u0275\u0275text(35, "Project risk board");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p", 13);
      \u0275\u0275text(37, "Risk is a transparent score from 0 to 100: cost, schedule, snags, approvals, guarantees, reporting and overdue tasks. Select a row to see exactly why.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 23)(39, "table", 24)(40, "thead")(41, "tr", 25)(42, "th", 26);
      \u0275\u0275text(43, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "th", 27);
      \u0275\u0275text(45, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "th", 28);
      \u0275\u0275text(47, "Progress");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "th", 29);
      \u0275\u0275text(49, "CPI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "th", 29);
      \u0275\u0275text(51, "SPI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "th", 29);
      \u0275\u0275text(53, "Budget");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "th", 29);
      \u0275\u0275text(55, "Spent");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "th", 29);
      \u0275\u0275text(57, "Forecast (EAC)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "th", 30);
      \u0275\u0275text(59, "Risk");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(60, "tbody");
      \u0275\u0275repeaterCreate(61, Portfolio_For_62_Template, 27, 24, null, null, _forTrack0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(63, "section", 31)(64, "div", 32)(65, "div")(66, "h2", 12);
      \u0275\u0275text(67, "Committed cash-out, next 13 weeks");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "p", 13);
      \u0275\u0275text(69, "Money already committed to be paid. Client receipts are not modelled, so this is cash-out, not net cash flow.");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(70, Portfolio_Conditional_70_Template, 5, 3, "div", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(71, Portfolio_Conditional_71_Template, 2, 1, "div", 34);
      \u0275\u0275conditionalCreate(72, Portfolio_Conditional_72_Template, 20, 1)(73, Portfolio_Conditional_73_Template, 2, 0, "p", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "section", 35)(75, "div", 32)(76, "div")(77, "h2", 12);
      \u0275\u0275text(78, "Critical path");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "p", 13);
      \u0275\u0275text(80, "The chain of tasks that sets the finish date. A delay on any red bar moves the project; the others have float.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "select", 36);
      \u0275\u0275listener("change", function Portfolio_Template_select_change_81_listener($event) {
        return ctx.onPathProjectChange($event);
      });
      \u0275\u0275repeaterCreate(82, Portfolio_For_83_Template, 2, 3, "option", 37, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(84, Portfolio_Conditional_84_Template, 2, 1, "div", 34);
      \u0275\u0275conditionalCreate(85, Portfolio_Conditional_85_Template, 3, 1)(86, Portfolio_Conditional_86_Template, 2, 0, "p", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "section", 38)(88, "div", 39)(89, "div")(90, "h2", 12);
      \u0275\u0275text(91, "Subcontractor and supplier scorecard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "p", 13);
      \u0275\u0275text(93, "Registration, goods rejected on receipt, open snags, compliance and unpaid invoices. Select a row for the reasons.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(94, "div", 40);
      \u0275\u0275conditionalCreate(95, Portfolio_Conditional_95_Template, 3, 1, "div", 41);
      \u0275\u0275elementStart(96, "div", 42)(97, "button", 43);
      \u0275\u0275listener("click", function Portfolio_Template_button_click_97_listener() {
        return ctx.setVendorFilter("needs_attention");
      });
      \u0275\u0275text(98, "Needs attention");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "button", 43);
      \u0275\u0275listener("click", function Portfolio_Template_button_click_99_listener() {
        return ctx.setVendorFilter("all");
      });
      \u0275\u0275text(100, "All");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(101, Portfolio_Conditional_101_Template, 2, 1, "div", 44);
      \u0275\u0275elementStart(102, "div", 23)(103, "table", 24)(104, "thead")(105, "tr", 25)(106, "th", 26);
      \u0275\u0275text(107, "Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "th", 27);
      \u0275\u0275text(109, "Trade");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(110, "th", 27);
      \u0275\u0275text(111, "GST");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "th", 29);
      \u0275\u0275text(113, "Score");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(114, "th", 30);
      \u0275\u0275text(115, "Grade");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(116, "tbody");
      \u0275\u0275repeaterCreate(117, Portfolio_For_118_Template, 13, 8, null, null, _forTrack0, false, Portfolio_ForEmpty_119_Template, 3, 1, "tr");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.overview ? 7 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.errors.overview ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.overview ? 13 : ctx.loading.overview ? 14 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.loading.narrative);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.loading.narrative ? "Writing the briefing\u2026" : "Write an AI briefing", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.brief == null ? null : ctx.brief.narrative_status) === "generated" && (ctx.brief == null ? null : ctx.brief.narrative) ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.brief == null ? null : ctx.brief.narrative_status) === "unavailable" ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errors.narrative ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.brief && ctx.brief.findings.length ? 29 : ctx.brief ? 30 : ctx.loading.brief ? 31 : -1);
      \u0275\u0275advance(32);
      \u0275\u0275repeater((ctx.overview == null ? null : ctx.overview.projects) ?? \u0275\u0275pureFunction0(26, _c0));
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.cash ? 70 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errors.cash ? 71 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.cash ? 72 : ctx.loading.cash ? 73 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275property("value", ctx.pathProjectId);
      \u0275\u0275advance();
      \u0275\u0275repeater((ctx.overview == null ? null : ctx.overview.projects) ?? \u0275\u0275pureFunction0(27, _c0));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.errors.path ? 84 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.path ? 85 : ctx.loading.path ? 86 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.vendorCard ? 95 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("bg-slate-900", ctx.vendorFilter === "needs_attention")("text-white", ctx.vendorFilter === "needs_attention");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("bg-slate-900", ctx.vendorFilter === "all")("text-white", ctx.vendorFilter === "all");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.errors.vendors ? 101 : -1);
      \u0275\u0275advance(16);
      \u0275\u0275repeater(ctx.vendorsShown);
    }
  }, dependencies: [DatePipe], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.bar-track[_ngcontent-%COMP%] {\n  height: 140px;\n}\n/*# sourceMappingURL=portfolio.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Portfolio, [{
    type: Component,
    args: [{ selector: "app-portfolio", standalone: false, template: `<div class="space-y-8 pb-10">

  <!-- Header -->
  <div class="flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 class="text-3xl font-black text-slate-900 dark:text-white">Portfolio Command Center</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-1">
        Every project's cost, schedule and risk in one view. All figures come from the project records; nothing here is estimated by a model.
        @if (overview) { <span class="font-semibold">As of {{ overview.as_of | date: 'd MMM y, h:mm a' }}.</span> }
      </p>
    </div>
    <button type="button" (click)="load()"
      class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition">
      <span class="material-symbols-outlined text-base">refresh</span> Refresh
    </button>
  </div>

  @if (errors.overview) {
    <div class="rounded-2xl border border-red-200 bg-red-50 text-red-700 p-4 font-semibold">{{ errors.overview }}</div>
  }

  <!-- KPI cards -->
  @if (overview) {
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" data-testid="kpis">
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">Projects</p>
        <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-2">{{ overview.totals.projects }}</h2>
        <div class="flex gap-2 mt-4 text-xs font-bold">
          <span class="px-3 py-1 rounded-full bg-red-100 text-red-700">{{ overview.totals.rag.red }} red</span>
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-700">{{ overview.totals.rag.amber }} amber</span>
          <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">{{ overview.totals.rag.green }} green</span>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">Cost and schedule index</p>
        <div class="flex items-baseline gap-6 mt-2">
          <div>
            <span class="text-4xl font-black" [class]="indexClass(overview.totals.cpi)">{{ index(overview.totals.cpi) }}</span>
            <span class="block text-xs text-slate-400 font-bold mt-1">CPI</span>
          </div>
          <div>
            <span class="text-4xl font-black" [class]="indexClass(overview.totals.spi)">{{ index(overview.totals.spi) }}</span>
            <span class="block text-xs text-slate-400 font-bold mt-1">SPI</span>
          </div>
        </div>
        <p class="text-xs text-slate-500 mt-4">Below 1.00 means over cost or behind plan.</p>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">Spent against budget</p>
        <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-2">{{ inr(overview.totals.ac) }}</h2>
        <p class="text-sm text-slate-500 mt-2">of {{ inr(overview.totals.bac) }} approved budget</p>
        <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-3 overflow-hidden">
          <div class="h-full rounded-full bg-blue-500" [style.width.%]="overview.totals.bac ? (overview.totals.ac / overview.totals.bac) * 100 : 0"></div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">Needs a decision</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li class="flex justify-between"><span class="text-slate-600 dark:text-slate-300">Approvals waiting</span>
            <b [class]="overview.totals.approvals_escalated ? 'text-red-600' : ''">{{ overview.totals.approvals_waiting }} @if (overview.totals.approvals_escalated) { ({{ overview.totals.approvals_escalated }} late) }</b></li>
          <li class="flex justify-between"><span class="text-slate-600 dark:text-slate-300">Guarantees expired or expiring</span>
            <b [class]="overview.totals.guarantees_expired_active ? 'text-red-600' : ''">{{ overview.totals.guarantees_expired_active }} / {{ overview.totals.guarantees_expiring }}</b></li>
          <li class="flex justify-between"><span class="text-slate-600 dark:text-slate-300">High or critical snags</span><b>{{ overview.totals.open_snags_high_or_critical }}</b></li>
          <li class="flex justify-between"><span class="text-slate-600 dark:text-slate-300">Variations pending</span><b>{{ inr(overview.totals.pending_variation_amount) }}</b></li>
        </ul>
      </div>
    </div>
  } @else if (loading.overview) {
    <div class="text-slate-400 font-semibold">Loading the portfolio\u2026</div>
  }

  <!-- Brief -->
  <section class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800" data-testid="brief">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h2 class="text-xl font-black text-slate-900 dark:text-white">What needs attention</h2>
        <p class="text-sm text-slate-500">Findings are calculated from the records, most urgent first.</p>
      </div>
      <button type="button" (click)="generateNarrative()" [disabled]="loading.narrative"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 disabled:opacity-60 transition">
        <span class="material-symbols-outlined text-base">auto_awesome</span>
        {{ loading.narrative ? 'Writing the briefing\u2026' : 'Write an AI briefing' }}
      </button>
    </div>

    @if (brief?.narrative_status === 'generated' && brief?.narrative) {
      <div class="rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 p-5 mb-5 text-slate-800 dark:text-slate-100 whitespace-pre-line" data-testid="narrative">{{ brief?.narrative }}</div>
    }
    @if (brief?.narrative_status === 'unavailable') {
      <div class="rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 p-4 mb-5 text-sm" data-testid="narrative-unavailable">
        The AI briefing could not be written, so none is shown. {{ brief?.narrative_reason }}
      </div>
    }
    @if (errors.narrative) { <div class="text-red-600 text-sm mb-3">{{ errors.narrative }}</div> }

    @if (brief && brief.findings.length) {
      <ul class="divide-y divide-slate-100 dark:divide-slate-800">
        @for (f of brief.findings; track $index) {
          <li class="py-3 flex items-start gap-3">
            <span class="shrink-0 mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-black uppercase" [class]="severityClasses(f.severity)">{{ f.severity }}</span>
            <span class="text-slate-700 dark:text-slate-200">{{ f.message }}</span>
          </li>
        }
      </ul>
    } @else if (brief) {
      <p class="text-emerald-600 font-semibold">No open portfolio issues.</p>
    } @else if (loading.brief) {
      <p class="text-slate-400">Loading\u2026</p>
    }
  </section>

  <!-- Project risk board -->
  <section class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden" data-testid="risk-board">
    <div class="p-6 pb-3">
      <h2 class="text-xl font-black text-slate-900 dark:text-white">Project risk board</h2>
      <p class="text-sm text-slate-500">Risk is a transparent score from 0 to 100: cost, schedule, snags, approvals, guarantees, reporting and overdue tasks. Select a row to see exactly why.</p>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100 dark:border-slate-800">
            <th class="px-6 py-3">Project</th><th class="px-3 py-3">Status</th><th class="px-3 py-3 w-40">Progress</th>
            <th class="px-3 py-3 text-right">CPI</th><th class="px-3 py-3 text-right">SPI</th>
            <th class="px-3 py-3 text-right">Budget</th><th class="px-3 py-3 text-right">Spent</th><th class="px-3 py-3 text-right">Forecast (EAC)</th>
            <th class="px-6 py-3 text-right">Risk</th>
          </tr>
        </thead>
        <tbody>
          @for (p of overview?.projects ?? []; track p.id) {
            <tr class="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer" (click)="toggleProject(p.id)" [attr.data-project]="p.id">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-900 dark:text-white">{{ p.name }}</div>
                <div class="text-xs text-slate-400">{{ p.code }} \xB7 {{ p.location }}</div>
              </td>
              <td class="px-3 py-4 text-slate-600 dark:text-slate-300">{{ p.status }}</td>
              <td class="px-3 py-4">
                <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"><div class="h-full bg-blue-500" [style.width.%]="p.progress"></div></div>
                <div class="text-xs text-slate-400 mt-1">{{ p.progress }}%</div>
              </td>
              <td class="px-3 py-4 text-right" [class]="indexClass(p.cpi)">{{ index(p.cpi) }}</td>
              <td class="px-3 py-4 text-right" [class]="indexClass(p.spi)">{{ index(p.spi) }}</td>
              <td class="px-3 py-4 text-right">{{ inr(p.bac) }}</td>
              <td class="px-3 py-4 text-right">{{ inr(p.ac) }}</td>
              <td class="px-3 py-4 text-right" [class.text-red-600]="p.eac !== null && p.eac > p.bac">{{ inr(p.eac) }}</td>
              <td class="px-6 py-4 text-right">
                <span class="inline-block min-w-[4.5rem] text-center px-3 py-1 rounded-full text-xs font-black uppercase" [class]="ragClasses(p.risk.rag)">{{ p.risk.score }} {{ p.risk.rag }}</span>
              </td>
            </tr>
            @if (expandedProjectId === p.id) {
              <tr class="bg-slate-50/70 dark:bg-slate-800/30">
                <td colspan="9" class="px-6 py-5">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 class="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Why this score</h3>
                      @if (p.risk.drivers.length) {
                        <ul class="space-y-2 text-sm">
                          @for (d of p.risk.drivers; track d.area) {
                            <li class="flex gap-3"><span class="shrink-0 font-black text-slate-900 dark:text-white w-10">+{{ d.points }}</span><span class="text-slate-600 dark:text-slate-300">{{ d.message }}</span></li>
                          }
                        </ul>
                      } @else { <p class="text-emerald-600 text-sm font-semibold">Nothing is adding to this project's risk.</p> }
                      @if (p.risk.unknown.length) {
                        <p class="text-xs text-slate-400 mt-3">Could not be calculated: {{ p.risk.unknown.join(', ') }}. These add nothing to the score and are not assumed to be fine.</p>
                      }
                    </div>
                    <div class="text-sm space-y-1 text-slate-600 dark:text-slate-300">
                      <h3 class="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Facts</h3>
                      <div>Open snags: <b>{{ p.open_snags.critical + p.open_snags.high + p.open_snags.medium + p.open_snags.low }}</b> ({{ p.open_snags.critical + p.open_snags.high }} high or critical)</div>
                      <div>Approvals waiting: <b>{{ p.approvals_waiting }}</b> ({{ p.approvals_escalated }} late)</div>
                      <div>Overdue tasks: <b>{{ p.overdue_tasks }}</b> \xB7 Workforce (daily average): <b>{{ p.avg_daily_workforce }}</b></div>
                      <div>Last daily report: <b>{{ p.days_since_dpr === null ? 'none' : p.days_since_dpr + ' day(s) ago' }}</b></div>
                      <div>Variations pending: <b>{{ p.pending_variations.count }}</b> ({{ inr(p.pending_variations.amount) }})</div>
                      <div>Planned completion: <b>{{ p.completion_date ?? '\u2014' }}</b></div>
                      <div class="pt-2 flex gap-3">
                        <button type="button" (click)="showPath(p.id); $event.stopPropagation()" class="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700">Critical path</button>
                        <button type="button" (click)="openProject(p); $event.stopPropagation()" class="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">Open project</button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  </section>

  <!-- Cash-out forecast -->
  <section class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800" data-testid="cash">
    <div class="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        <h2 class="text-xl font-black text-slate-900 dark:text-white">Committed cash-out, next 13 weeks</h2>
        <p class="text-sm text-slate-500">Money already committed to be paid. Client receipts are not modelled, so this is cash-out, not net cash flow.</p>
      </div>
      @if (cash) {
        <div class="text-right">
          <div class="text-3xl font-black text-slate-900 dark:text-white">{{ inr(cash.total) }}</div>
          <div class="text-xs text-slate-400 font-bold">over {{ cash.weeks.length }} weeks \xB7 {{ cash.items_counted }} items</div>
        </div>
      }
    </div>

    @if (errors.cash) { <div class="text-red-600 text-sm">{{ errors.cash }}</div> }
    @if (cash) {
      <div class="bar-track flex items-end gap-2">
        @for (w of cash.weeks; track w.week) {
          <div class="flex-1 flex flex-col justify-end h-full group relative"
            [title]="'Week ' + w.week + ' from ' + w.starts_on + ': ' + inr(w.total) + (w.overdue ? ' (' + inr(w.overdue) + ' overdue)' : '')">
            <div class="w-full rounded-t-lg bg-blue-500 group-hover:bg-blue-600 transition-all" [style.height.%]="barHeight(w.total)"
              [class.bg-red-500]="w.overdue > 0"></div>
          </div>
        }
      </div>
      <div class="flex gap-2 mt-2 text-[10px] text-slate-400 font-bold">
        @for (w of cash.weeks; track w.week) { <div class="flex-1 text-center">W{{ w.week }}</div> }
      </div>
      <div class="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 class="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">By source</h3>
          <ul class="text-sm space-y-1">
            @for (s of sources(cash.by_source); track s.key) {
              <li class="flex justify-between"><span class="text-slate-600 dark:text-slate-300">{{ sourceLabel(s.key) }}</span><b>{{ inr(s.amount) }}</b></li>
            }
          </ul>
          @if (cash.peak_week) { <p class="text-xs text-slate-500 mt-3">Peak: week {{ cash.peak_week.week }} ({{ cash.peak_week.starts_on }}) at {{ inr(cash.peak_week.total) }}. Red bars include overdue items.</p> }
        </div>
        <div>
          <h3 class="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Assumptions</h3>
          <ul class="text-xs text-slate-500 space-y-1 list-disc pl-4">
            @for (a of cash.assumptions; track $index) { <li>{{ a }}</li> }
          </ul>
        </div>
      </div>
    } @else if (loading.cash) { <p class="text-slate-400">Loading\u2026</p> }
  </section>

  <!-- Critical path -->
  <section class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800" data-testid="critical-path">
    <div class="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        <h2 class="text-xl font-black text-slate-900 dark:text-white">Critical path</h2>
        <p class="text-sm text-slate-500">The chain of tasks that sets the finish date. A delay on any red bar moves the project; the others have float.</p>
      </div>
      <select class="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold" [value]="pathProjectId" (change)="onPathProjectChange($event)">
        @for (p of overview?.projects ?? []; track p.id) { <option [value]="p.id" [selected]="p.id === pathProjectId">{{ p.name }}</option> }
      </select>
    </div>
    @if (errors.path) { <div class="text-red-600 text-sm">{{ errors.path }}</div> }
    @if (path) {
      @if (path.applicable) {
        <div class="flex flex-wrap gap-6 text-sm mb-5">
          <div><span class="text-slate-400 font-bold block text-xs uppercase">Duration</span><b class="text-lg">{{ path.duration_days }} days</b></div>
          <div><span class="text-slate-400 font-bold block text-xs uppercase">Finish by the plan</span><b class="text-lg">{{ path.finish_date }}</b></div>
          <div><span class="text-slate-400 font-bold block text-xs uppercase">Contract completion</span><b class="text-lg">{{ path.contract_completion_date ?? '\u2014' }}</b></div>
          @if (path.days_to_contract_completion !== null && path.days_to_contract_completion !== undefined) {
            <div><span class="text-slate-400 font-bold block text-xs uppercase">Margin</span>
              <b class="text-lg" [class.text-red-600]="path.days_to_contract_completion < 0" [class.text-emerald-600]="path.days_to_contract_completion >= 0">{{ path.days_to_contract_completion }} days</b></div>
          }
        </div>
        <div class="space-y-2">
          @for (t of path.tasks; track t.id) {
            <div class="grid grid-cols-12 items-center gap-3 text-sm">
              <div class="col-span-4 truncate" [title]="t.title">
                <span class="font-semibold text-slate-800 dark:text-slate-100">{{ t.title }}</span>
                <span class="block text-xs text-slate-400">{{ t.status }} \xB7 {{ t.duration_days }}d{{ t.duration_basis === 'default' ? ' (assumed)' : '' }}</span>
              </div>
              <div class="col-span-6 relative h-6 rounded bg-slate-100 dark:bg-slate-800">
                <div class="absolute top-0 h-6 rounded" [class]="t.critical ? 'bg-red-500' : 'bg-sky-400'" [style.left.%]="barLeft(t.early_start)" [style.width.%]="barWidth(t.duration_days)"
                  [title]="t.early_start + ' to ' + t.early_finish"></div>
              </div>
              <div class="col-span-2 text-right text-xs font-bold" [class]="t.critical ? 'text-red-600' : 'text-slate-500'">{{ t.critical ? 'CRITICAL' : t.float_days + 'd float' }}</div>
            </div>
          }
        </div>
        <p class="text-xs text-slate-400 mt-4">{{ path.method }}</p>
      } @else if (path.reason === 'dependency_cycle') {
        <div class="rounded-2xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm">These tasks depend on each other in a loop, so no path can be calculated:
          @for (c of path.cycle ?? []; track c.id) { <b> {{ c.title }}</b> }. Remove one link to fix it.</div>
      } @else {
        <p class="text-slate-500 text-sm">This project has no tasks yet, so there is no path to calculate.</p>
      }
    } @else if (loading.path) { <p class="text-slate-400">Calculating\u2026</p> }
  </section>

  <!-- Vendor scorecard -->
  <section class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden" data-testid="vendors">
    <div class="p-6 pb-3 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="text-xl font-black text-slate-900 dark:text-white">Subcontractor and supplier scorecard</h2>
        <p class="text-sm text-slate-500">Registration, goods rejected on receipt, open snags, compliance and unpaid invoices. Select a row for the reasons.</p>
      </div>
      <div class="flex items-center gap-3">
        @if (vendorCard) {
          <div class="flex gap-1.5 text-xs font-black">
            @for (g of ['A', 'B', 'C', 'D']; track g) { <span class="px-2.5 py-1 rounded-full" [class]="gradeClasses(g)">{{ g }} {{ vendorCard.summary.grades[g] }}</span> }
          </div>
        }
        <div class="inline-flex rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden text-xs font-bold">
          <button type="button" class="px-3 py-2" [class.bg-slate-900]="vendorFilter === 'needs_attention'" [class.text-white]="vendorFilter === 'needs_attention'" (click)="setVendorFilter('needs_attention')">Needs attention</button>
          <button type="button" class="px-3 py-2" [class.bg-slate-900]="vendorFilter === 'all'" [class.text-white]="vendorFilter === 'all'" (click)="setVendorFilter('all')">All</button>
        </div>
      </div>
    </div>
    @if (errors.vendors) { <div class="px-6 pb-4 text-red-600 text-sm">{{ errors.vendors }}</div> }
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead><tr class="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100 dark:border-slate-800">
          <th class="px-6 py-3">Vendor</th><th class="px-3 py-3">Trade</th><th class="px-3 py-3">GST</th><th class="px-3 py-3 text-right">Score</th><th class="px-6 py-3 text-right">Grade</th></tr></thead>
        <tbody>
          @for (v of vendorsShown; track v.id) {
            <tr class="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer" (click)="toggleVendor(v.id)">
              <td class="px-6 py-3 font-bold text-slate-900 dark:text-white">{{ v.name }}</td>
              <td class="px-3 py-3 text-slate-500">{{ v.skill }}</td>
              <td class="px-3 py-3">{{ v.gst_registered ? 'Registered' : 'Missing' }}</td>
              <td class="px-3 py-3 text-right font-bold">{{ v.score }}</td>
              <td class="px-6 py-3 text-right"><span class="px-3 py-1 rounded-full text-xs font-black" [class]="gradeClasses(v.grade)">{{ v.grade }}</span></td>
            </tr>
            @if (expandedVendorId === v.id) {
              <tr class="bg-slate-50/70 dark:bg-slate-800/30"><td colspan="5" class="px-6 py-4">
                @if (v.reasons.length) {
                  <ul class="space-y-1 text-sm">@for (r of v.reasons; track $index) { <li class="flex gap-3"><b class="w-12 text-red-600">-{{ r.points }}</b><span class="text-slate-600 dark:text-slate-300">{{ r.reason }}</span></li> }</ul>
                } @else { <p class="text-emerald-600 text-sm font-semibold">No deductions: registered, nothing rejected, no open snags.</p> }
              </td></tr>
            }
          } @empty {
            <tr><td colspan="5" class="px-6 py-6 text-slate-400">{{ loading.vendors ? 'Loading\u2026' : 'No vendors to show.' }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  </section>
</div>
`, styles: ["/* src/app/modules/portfolio/portfolio.scss */\n:host {\n  display: block;\n}\n.bar-track {\n  height: 140px;\n}\n/*# sourceMappingURL=portfolio.css.map */\n"] }]
  }], () => [{ type: PortfolioService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Portfolio, { className: "Portfolio", filePath: "app/modules/portfolio/portfolio.ts", lineNumber: 31 });
})();

// src/app/modules/portfolio/portfolio-routing-module.ts
var routes = [{ path: "", component: Portfolio }];
var PortfolioRoutingModule = class _PortfolioRoutingModule {
  static \u0275fac = function PortfolioRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PortfolioRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _PortfolioRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortfolioRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/portfolio/portfolio-module.ts
var PortfolioModule = class _PortfolioModule {
  static \u0275fac = function PortfolioModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PortfolioModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _PortfolioModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, PortfolioRoutingModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PortfolioModule, [{
    type: NgModule,
    args: [{
      declarations: [Portfolio],
      imports: [CommonModule, PortfolioRoutingModule]
    }]
  }], null, null);
})();
export {
  PortfolioModule
};
//# sourceMappingURL=chunk-W5BZ2BB4.js.map
