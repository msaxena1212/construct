import {
  MaterialService
} from "./chunk-7UB2JTFJ.js";
import {
  ProjectService
} from "./chunk-52DGP4Y7.js";
import "./chunk-2M3NZLNK.js";
import {
  MatSelectModule
} from "./chunk-26HEUADP.js";
import {
  MatButtonModule,
  MatCardModule
} from "./chunk-DRAYAONG.js";
import {
  MatFormFieldModule
} from "./chunk-T3AUGCAJ.js";
import {
  ToastrService
} from "./chunk-QR7MRZIR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-YLIHD5YA.js";
import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  HttpClient,
  HttpParams,
  Injectable,
  Input,
  NgForOf,
  NgIf,
  NgModule,
  Router,
  RouterLink,
  RouterModule,
  Subscription,
  TitleCasePipe,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-23RKHPSU.js";

// src/app/shared/services/stock-transfer/stock-transfer.service.ts
var StockTransferService = class _StockTransferService {
  http;
  apiUrl = `${environment.serverUrl}/api/v1/stock-transfers`;
  constructor(http) {
    this.http = http;
  }
  listLocations(projectId) {
    return this.http.get(`${this.apiUrl}/locations`, {
      params: new HttpParams().set("project_id", String(projectId))
    });
  }
  createLocation(body) {
    return this.http.post(`${this.apiUrl}/locations`, body);
  }
  listTransfers(filters) {
    let params = new HttpParams();
    if (filters.projectId)
      params = params.set("project_id", String(filters.projectId));
    if (filters.status)
      params = params.set("status", filters.status);
    if (filters.page)
      params = params.set("page", String(filters.page));
    if (filters.limit)
      params = params.set("limit", String(filters.limit));
    return this.http.get(this.apiUrl, { params });
  }
  listInTransit(projectId) {
    let params = new HttpParams();
    if (projectId)
      params = params.set("project_id", String(projectId));
    return this.http.get(`${this.apiUrl}/in-transit`, { params });
  }
  getTransfer(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getHistory(id) {
    return this.http.get(`${this.apiUrl}/${id}/history`);
  }
  createTransfer(body) {
    return this.http.post(this.apiUrl, body);
  }
  submit(id) {
    return this.http.put(`${this.apiUrl}/${id}/submit`, {});
  }
  /** override_reason is used only by a Super Admin approving a request they created; the server enforces that. */
  approve(id, lines, decision_reason, override_reason) {
    return this.http.put(`${this.apiUrl}/${id}/approve`, { lines, decision_reason, override_reason });
  }
  reject(id, reason) {
    return this.http.put(`${this.apiUrl}/${id}/reject`, { reason });
  }
  cancel(id, reason) {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, { reason });
  }
  checkOut(id, body) {
    return this.http.post(`${this.apiUrl}/${id}/checkout`, body);
  }
  checkIn(id, body) {
    return this.http.post(`${this.apiUrl}/${id}/checkin`, body);
  }
  declareShortage(id, body) {
    return this.http.post(`${this.apiUrl}/${id}/shortages`, body);
  }
  writeOffShortage(discrepancyId, body) {
    return this.http.post(`${this.apiUrl}/shortages/${discrepancyId}/write-off`, body);
  }
  reverseDispatch(id, body) {
    return this.http.post(`${this.apiUrl}/${id}/reverse`, body);
  }
  static \u0275fac = function StockTransferService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StockTransferService, factory: _StockTransferService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/shared/services/stock-transfer/stock-transfer-context.ts
var STOCK_TRANSFER_BASE = "/master/stock-transfer";
var STORAGE_KEY = "zyno.stockTransfer.projectId";
var StockTransferContext = class _StockTransferContext {
  read() {
    try {
      const value = Number(sessionStorage.getItem(STORAGE_KEY));
      return Number.isSafeInteger(value) && value > 0 ? value : null;
    } catch {
      return null;
    }
  }
  write(projectId) {
    try {
      if (projectId && Number.isSafeInteger(projectId) && projectId > 0) {
        sessionStorage.setItem(STORAGE_KEY, String(projectId));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
    }
  }
  static \u0275fac = function StockTransferContext_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferContext)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StockTransferContext, factory: _StockTransferContext.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferContext, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/modules/stock-transfer/stock-transfer-nav/stock-transfer-nav.ts
function StockTransferNav_a_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5);
    \u0275\u0275text(1, "New Transfer Request");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.active === "new");
    \u0275\u0275property("routerLink", ctx_r0.base)("queryParams", ctx_r0.newQuery);
    \u0275\u0275attribute("aria-current", ctx_r0.active === "new" ? "page" : null);
  }
}
function StockTransferNav_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "New Transfer Request");
    \u0275\u0275elementEnd();
  }
}
function StockTransferNav_p_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Project selected: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", ctx_r0.projectId);
  }
}
function StockTransferNav_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1, "No project selected");
    \u0275\u0275elementEnd();
  }
}
var StockTransferNav = class _StockTransferNav {
  active = "register";
  projectId = null;
  /** Where the Back button goes. */
  backTo = "register";
  backLabel = "Back to Stock Transfers";
  base = STOCK_TRANSFER_BASE;
  /**
   * Computed once per input change. A getter would return a new object on every change-detection pass,
   * which the router-link bindings treat as an endless update (NG0103).
   */
  query = {};
  newQuery = {};
  backPath = STOCK_TRANSFER_BASE;
  ngOnChanges() {
    this.query = this.projectId ? { projectId: this.projectId } : {};
    this.newQuery = __spreadProps(__spreadValues({}, this.query), { action: "new" });
    this.backPath = this.backTo === "inventory" ? `${this.base}/inventory` : this.base;
  }
  static \u0275fac = function StockTransferNav_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferNav)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockTransferNav, selectors: [["app-stock-transfer-nav"]], inputs: { active: "active", projectId: "projectId", backTo: "backTo", backLabel: "backLabel" }, standalone: false, features: [\u0275\u0275NgOnChangesFeature], decls: 20, vars: 29, consts: [["newDisabled", ""], [1, "st-navbar"], ["role", "link", 1, "st-back", 3, "routerLink", "queryParams", "aria-label"], ["aria-hidden", "true", 1, "st-back-arrow"], ["aria-label", "Stock transfer sections", 1, "st-tabs"], [1, "st-tab", 3, "routerLink", "queryParams"], ["class", "st-tab", 3, "routerLink", "queryParams", "active", 4, "ngIf", "ngIfElse"], ["class", "st-project-chip", 4, "ngIf"], ["class", "st-project-chip warn", 4, "ngIf"], ["aria-disabled", "true", "title", "Select a project first", 1, "st-tab", "disabled"], [1, "st-project-chip"], [1, "st-project-chip", "warn"]], template: function StockTransferNav_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 1)(1, "a", 2)(2, "span", 3);
      \u0275\u0275text(3, "\u2190");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "nav", 4)(7, "a", 5);
      \u0275\u0275text(8, "Project Inventory");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "a", 5);
      \u0275\u0275text(10, "All Transfers");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 5);
      \u0275\u0275text(12, "In-transit Board");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 5);
      \u0275\u0275text(14, "Approval Queue");
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, StockTransferNav_a_15_Template, 2, 5, "a", 6)(16, StockTransferNav_ng_template_16_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275template(18, StockTransferNav_p_18_Template, 4, 1, "p", 7)(19, StockTransferNav_p_19_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const newDisabled_r2 = \u0275\u0275reference(17);
      \u0275\u0275advance();
      \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(ctx.backLabel));
      \u0275\u0275property("routerLink", ctx.backPath)("queryParams", ctx.query);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.backLabel);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.active === "inventory");
      \u0275\u0275property("routerLink", ctx.base + "/inventory")("queryParams", ctx.query);
      \u0275\u0275attribute("aria-current", ctx.active === "inventory" ? "page" : null);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.active === "register");
      \u0275\u0275property("routerLink", ctx.base)("queryParams", ctx.query);
      \u0275\u0275attribute("aria-current", ctx.active === "register" ? "page" : null);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.active === "in-transit");
      \u0275\u0275property("routerLink", ctx.base + "/in-transit")("queryParams", ctx.query);
      \u0275\u0275attribute("aria-current", ctx.active === "in-transit" ? "page" : null);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.active === "approvals");
      \u0275\u0275property("routerLink", ctx.base + "/approvals")("queryParams", ctx.query);
      \u0275\u0275attribute("aria-current", ctx.active === "approvals" ? "page" : null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.projectId)("ngIfElse", newDisabled_r2);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.projectId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.projectId);
    }
  }, dependencies: [NgIf, RouterLink], styles: ["\n.st-navbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px 16px;\n  padding: 10px 0 12px;\n  margin-bottom: 12px;\n  border-bottom: 1px solid #dfe5ea;\n}\n.st-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 40px;\n  padding: 8px 14px;\n  border-radius: 8px;\n  background: #1565c0;\n  color: #fff;\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  transition: background 0.15s ease, box-shadow 0.15s ease;\n}\n.st-back[_ngcontent-%COMP%]:hover {\n  background: #0d47a1;\n}\n.st-back[_ngcontent-%COMP%]:active {\n  background: #0a3880;\n}\n.st-back[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #90caf9;\n  outline-offset: 2px;\n}\n.st-back-arrow[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  line-height: 1;\n}\n.st-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  flex: 1 1 auto;\n}\n.st-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 36px;\n  padding: 6px 12px;\n  border-radius: 6px;\n  color: #37474f;\n  text-decoration: none;\n  font-size: 0.9rem;\n  border: 1px solid transparent;\n}\n.st-tab[_ngcontent-%COMP%]:hover {\n  background: #eef3f8;\n}\n.st-tab[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #1565c0;\n  outline-offset: 1px;\n}\n.st-tab.active[_ngcontent-%COMP%] {\n  color: #0d47a1;\n  font-weight: 700;\n  background: #e3f2fd;\n  border-color: #90caf9;\n}\n.st-tab.disabled[_ngcontent-%COMP%] {\n  color: #9aa5ae;\n  cursor: not-allowed;\n}\n.st-project-chip[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: #eceff1;\n  font-size: 0.85rem;\n  color: #37474f;\n}\n.st-project-chip.warn[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #8d4b00;\n}\n@media (max-width: 600px) {\n  .st-navbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .st-back[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .st-tabs[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=stock-transfer-nav.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferNav, [{
    type: Component,
    args: [{ selector: "app-stock-transfer-nav", standalone: false, template: `<header class="st-navbar">
  <a class="st-back" [routerLink]="backPath" [queryParams]="query" role="link" aria-label="{{ backLabel }}">
    <span class="st-back-arrow" aria-hidden="true">&larr;</span>
    <span>{{ backLabel }}</span>
  </a>

  <nav class="st-tabs" aria-label="Stock transfer sections">
    <a [routerLink]="base + '/inventory'" [queryParams]="query" class="st-tab"
       [class.active]="active === 'inventory'" [attr.aria-current]="active === 'inventory' ? 'page' : null">Project Inventory</a>
    <a [routerLink]="base" [queryParams]="query" class="st-tab"
       [class.active]="active === 'register'" [attr.aria-current]="active === 'register' ? 'page' : null">All Transfers</a>
    <a [routerLink]="base + '/in-transit'" [queryParams]="query" class="st-tab"
       [class.active]="active === 'in-transit'" [attr.aria-current]="active === 'in-transit' ? 'page' : null">In-transit Board</a>
    <a [routerLink]="base + '/approvals'" [queryParams]="query" class="st-tab"
       [class.active]="active === 'approvals'" [attr.aria-current]="active === 'approvals' ? 'page' : null">Approval Queue</a>
    <a [routerLink]="base" [queryParams]="newQuery" class="st-tab"
       [class.active]="active === 'new'" [attr.aria-current]="active === 'new' ? 'page' : null"
       *ngIf="projectId; else newDisabled">New Transfer Request</a>
    <ng-template #newDisabled>
      <span class="st-tab disabled" aria-disabled="true" title="Select a project first">New Transfer Request</span>
    </ng-template>
  </nav>

  <p class="st-project-chip" *ngIf="projectId">Project selected: <strong>#{{ projectId }}</strong></p>
  <p class="st-project-chip warn" *ngIf="!projectId">No project selected</p>
</header>
`, styles: ["/* src/app/modules/stock-transfer/stock-transfer-nav/stock-transfer-nav.scss */\n.st-navbar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px 16px;\n  padding: 10px 0 12px;\n  margin-bottom: 12px;\n  border-bottom: 1px solid #dfe5ea;\n}\n.st-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 40px;\n  padding: 8px 14px;\n  border-radius: 8px;\n  background: #1565c0;\n  color: #fff;\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  transition: background 0.15s ease, box-shadow 0.15s ease;\n}\n.st-back:hover {\n  background: #0d47a1;\n}\n.st-back:active {\n  background: #0a3880;\n}\n.st-back:focus-visible {\n  outline: 3px solid #90caf9;\n  outline-offset: 2px;\n}\n.st-back-arrow {\n  font-size: 1.1rem;\n  line-height: 1;\n}\n.st-tabs {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  flex: 1 1 auto;\n}\n.st-tab {\n  display: inline-flex;\n  align-items: center;\n  min-height: 36px;\n  padding: 6px 12px;\n  border-radius: 6px;\n  color: #37474f;\n  text-decoration: none;\n  font-size: 0.9rem;\n  border: 1px solid transparent;\n}\n.st-tab:hover {\n  background: #eef3f8;\n}\n.st-tab:focus-visible {\n  outline: 2px solid #1565c0;\n  outline-offset: 1px;\n}\n.st-tab.active {\n  color: #0d47a1;\n  font-weight: 700;\n  background: #e3f2fd;\n  border-color: #90caf9;\n}\n.st-tab.disabled {\n  color: #9aa5ae;\n  cursor: not-allowed;\n}\n.st-project-chip {\n  margin: 0;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: #eceff1;\n  font-size: 0.85rem;\n  color: #37474f;\n}\n.st-project-chip.warn {\n  background: #fff3e0;\n  color: #8d4b00;\n}\n@media (max-width: 600px) {\n  .st-navbar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .st-back {\n    justify-content: center;\n  }\n  .st-tabs {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=stock-transfer-nav.css.map */\n"] }]
  }], null, { active: [{
    type: Input
  }], projectId: [{
    type: Input
  }], backTo: [{
    type: Input
  }], backLabel: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockTransferNav, { className: "StockTransferNav", filePath: "app/modules/stock-transfer/stock-transfer-nav/stock-transfer-nav.ts", lineNumber: 16 });
})();

// src/app/modules/stock-transfer/stock-transfer-register/stock-transfer-register.ts
var _c0 = (a0) => ["/master/stock-transfer", a0];
var _c1 = (a0) => ({ projectId: a0 });
function StockTransferRegister_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Requests awaiting approval for this project. Completed, cancelled and rejected transfers are not listed here.");
    \u0275\u0275elementEnd();
  }
}
function StockTransferRegister_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Internal moves between central warehouse, project stores, site stores and quarantine. Creating a request does not move stock.");
    \u0275\u0275elementEnd();
  }
}
function StockTransferRegister_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("ngValue", p_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.name);
  }
}
function StockTransferRegister_label_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1, " Status ");
    \u0275\u0275elementStart(2, "select", 18);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferRegister_label_18_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.statusFilter, $event) || (ctx_r2.statusFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function StockTransferRegister_label_18_Template_select_change_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onStatusChange());
    });
    \u0275\u0275elementStart(3, "option", 19);
    \u0275\u0275text(4, "All statuses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 20);
    \u0275\u0275text(6, "Draft");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 21);
    \u0275\u0275text(8, "Submitted (awaiting approval)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 22);
    \u0275\u0275text(10, "Approved");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 23);
    \u0275\u0275text(12, "In transit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 24);
    \u0275\u0275text(14, "Partially received");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 25);
    \u0275\u0275text(16, "Reconciliation required");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 26);
    \u0275\u0275text(18, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 27);
    \u0275\u0275text(20, "Rejected");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 28);
    \u0275\u0275text(22, "Cancelled");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.statusFilter);
  }
}
function StockTransferRegister_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, "Select a project to see its stock transfers.");
    \u0275\u0275elementEnd();
  }
}
function StockTransferRegister_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.loadError);
  }
}
function StockTransferRegister_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, "Loading transfers\u2026");
    \u0275\u0275elementEnd();
  }
}
function StockTransferRegister_div_22_table_1_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "a", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 39);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 36);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 36);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 36);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td")(24, "a", 38);
    \u0275\u0275text(25, "Open");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(19, _c0, t_r4.id))("queryParams", \u0275\u0275pureFunction1(21, _c1, ctx_r2.projectId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4.transfer_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.locationLabel(t_r4.source_location_id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.locationLabel(t_r4.destination_location_id));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-status", t_r4.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 14, t_r4.status));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r4.totals.approved);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4.totals.dispatched);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4.totals.outstanding);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4.required_date || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 16, t_r4.createdAt, "dd MMM yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(23, _c0, t_r4.id))("queryParams", \u0275\u0275pureFunction1(25, _c1, ctx_r2.projectId));
  }
}
function StockTransferRegister_div_22_table_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 35)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Transfer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "From");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 36);
    \u0275\u0275text(12, "Approved");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 36);
    \u0275\u0275text(14, "Dispatched");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 36);
    \u0275\u0275text(16, "Outstanding in transit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Required");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275template(23, StockTransferRegister_div_22_table_1_tr_23_Template, 26, 27, "tr", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r2.transfers);
  }
}
function StockTransferRegister_div_22_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, "No transfers match these filters.");
    \u0275\u0275elementEnd();
  }
}
function StockTransferRegister_div_22_nav_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 40)(1, "button", 41);
    \u0275\u0275listener("click", function StockTransferRegister_div_22_nav_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.nextPage(-1));
    });
    \u0275\u0275text(2, "Previous");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 41);
    \u0275\u0275listener("click", function StockTransferRegister_div_22_nav_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.nextPage(1));
    });
    \u0275\u0275text(6, "Next");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.page <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r2.page, " of ", ctx_r2.pageCount);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.page >= ctx_r2.pageCount);
  }
}
function StockTransferRegister_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275template(1, StockTransferRegister_div_22_table_1_Template, 24, 1, "table", 33)(2, StockTransferRegister_div_22_ng_template_2_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, StockTransferRegister_div_22_nav_4_Template, 7, 4, "nav", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const noRows_r6 = \u0275\u0275reference(3);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.transfers.length)("ngIfElse", noRows_r6);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r2.total > ctx_r2.limit);
  }
}
function StockTransferRegister_div_23_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", l_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", l_r8.name, " (", l_r8.code, ") \u2014 ", l_r8.location_type);
  }
}
function StockTransferRegister_div_23_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", l_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", l_r9.name, " (", l_r9.code, ") \u2014 ", l_r9.location_type);
  }
}
function StockTransferRegister_div_23_div_27_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r12 = ctx.$implicit;
    \u0275\u0275property("ngValue", m_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", m_r12.name, " (", m_r12.sku, ")");
  }
}
function StockTransferRegister_div_23_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "select", 54);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferRegister_div_23_div_27_Template_select_ngModelChange_1_listener($event) {
      const line_r11 = \u0275\u0275restoreView(_r10).$implicit;
      \u0275\u0275twoWayBindingSet(line_r11.material_id, $event) || (line_r11.material_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "option", 9);
    \u0275\u0275text(3, "Choose material\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, StockTransferRegister_div_23_div_27_option_4_Template, 2, 3, "option", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferRegister_div_23_div_27_Template_input_ngModelChange_5_listener($event) {
      const line_r11 = \u0275\u0275restoreView(_r10).$implicit;
      \u0275\u0275twoWayBindingSet(line_r11.requested_qty, $event) || (line_r11.requested_qty = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 41);
    \u0275\u0275listener("click", function StockTransferRegister_div_23_div_27_Template_button_click_6_listener() {
      const i_r13 = \u0275\u0275restoreView(_r10).index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeLine(i_r13));
    });
    \u0275\u0275text(7, "Remove");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r11 = ctx.$implicit;
    const i_r13 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", line_r11.material_id);
    \u0275\u0275property("name", "mat" + i_r13);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.projectMaterials);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", line_r11.requested_qty);
    \u0275\u0275property("name", "qty" + i_r13);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.draft.lines.length === 1);
  }
}
function StockTransferRegister_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275listener("click", function StockTransferRegister_div_23_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreate = false);
    });
    \u0275\u0275elementStart(1, "div", 43);
    \u0275\u0275listener("click", function StockTransferRegister_div_23_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h2", 44);
    \u0275\u0275text(3, "New transfer request");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 17);
    \u0275\u0275text(5, "Saved as a draft. Stock moves only after approval and check-out.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7, " Source location ");
    \u0275\u0275elementStart(8, "select", 45);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferRegister_div_23_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.draft.source_location_id, $event) || (ctx_r2.draft.source_location_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 9);
    \u0275\u0275text(10, "Choose\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, StockTransferRegister_div_23_option_11_Template, 2, 4, "option", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label");
    \u0275\u0275text(13, " Destination location ");
    \u0275\u0275elementStart(14, "select", 46);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferRegister_div_23_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.draft.destination_location_id, $event) || (ctx_r2.draft.destination_location_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 9);
    \u0275\u0275text(16, "Choose\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, StockTransferRegister_div_23_option_17_Template, 2, 4, "option", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label");
    \u0275\u0275text(19, " Reason ");
    \u0275\u0275elementStart(20, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferRegister_div_23_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.draft.reason, $event) || (ctx_r2.draft.reason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label");
    \u0275\u0275text(22, " Required by ");
    \u0275\u0275elementStart(23, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferRegister_div_23_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.draft.required_date, $event) || (ctx_r2.draft.required_date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "fieldset", 49)(25, "legend");
    \u0275\u0275text(26, "Materials (whole units)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, StockTransferRegister_div_23_div_27_Template, 8, 7, "div", 50);
    \u0275\u0275elementStart(28, "button", 51);
    \u0275\u0275listener("click", function StockTransferRegister_div_23_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addLine());
    });
    \u0275\u0275text(29, "Add material");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 52)(31, "button", 51);
    \u0275\u0275listener("click", function StockTransferRegister_div_23_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreate = false);
    });
    \u0275\u0275text(32, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 6);
    \u0275\u0275listener("click", function StockTransferRegister_div_23_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createTransfer());
    });
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.draft.source_location_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.locations);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.draft.destination_location_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.locations);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.draft.reason);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.draft.required_date);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.draft.lines);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r2.creating);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.creating ? "Saving\u2026" : "Save draft", " ");
  }
}
var StockTransferRegister = class _StockTransferRegister {
  route;
  router;
  projectService;
  materialService;
  transferService;
  toastr;
  context;
  mode = "register";
  projects = [];
  projectId = null;
  locations = [];
  materials = [];
  transfers = [];
  statusFilter = "";
  page = 1;
  limit = 25;
  total = 0;
  loading = false;
  loadError = null;
  showCreate = false;
  creating = false;
  draft = {
    source_location_id: null,
    destination_location_id: null,
    reason: "",
    required_date: "",
    lines: [{ material_id: null, requested_qty: null }]
  };
  subs = new Subscription();
  constructor(route, router, projectService, materialService, transferService, toastr, context) {
    this.route = route;
    this.router = router;
    this.projectService = projectService;
    this.materialService = materialService;
    this.transferService = transferService;
    this.toastr = toastr;
    this.context = context;
  }
  ngOnInit() {
    this.mode = this.route.snapshot.data["mode"] === "approvals" ? "approvals" : "register";
    if (this.mode === "approvals")
      this.statusFilter = "submitted";
    this.subs.add(this.materialService.materials$.subscribe((list) => this.materials = list || []));
    this.materialService.loadMaterials();
    this.subs.add(this.projectService.getProjects().subscribe({
      next: (res) => this.projects = res.data || [],
      error: () => this.toastr.error("Could not load projects.")
    }));
    this.subs.add(this.route.queryParams.subscribe((params) => {
      const fromUrl = params["projectId"] ? Number(params["projectId"]) : null;
      if (!fromUrl && this.context.read()) {
        this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: this.context.read() }, queryParamsHandling: "merge", replaceUrl: true });
        return;
      }
      this.context.write(fromUrl);
      if (fromUrl !== this.projectId) {
        this.projectId = fromUrl;
        this.page = 1;
        this.loadProjectContext();
        this.loadTransfers();
      }
      if (params["action"] === "new" && this.projectId) {
        this.openCreate();
      }
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  /**
   * Transfers move project stock, so the selectable id is the project-stock record id, not the master
   * material id. getAllMaterials returns master rows with their project stock nested underneath.
   */
  get projectMaterials() {
    const out = [];
    for (const m of this.materials) {
      for (const ps of m.material_project_stock || []) {
        if (Number(ps.project_id) === Number(this.projectId) && !ps.isDeleted) {
          out.push({ id: ps.id, name: m.name, sku: ps.sku });
        }
      }
    }
    return out;
  }
  onProjectChange(value) {
    const pid = value ? Number(value) : null;
    this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: pid }, queryParamsHandling: "merge" });
  }
  onStatusChange() {
    this.page = 1;
    this.loadTransfers();
  }
  loadTransfers() {
    this.loading = true;
    this.loadError = null;
    const status = this.mode === "approvals" ? "submitted" : this.statusFilter || void 0;
    const filters = { projectId: this.projectId ?? void 0, status, page: this.page, limit: this.limit };
    this.subs.add(this.transferService.listTransfers(filters).subscribe({
      next: (res) => {
        this.transfers = res.data.rows;
        this.total = res.data.count;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.loadError = err?.error?.message || "Could not load transfers.";
      }
    }));
  }
  nextPage(delta) {
    const last = Math.max(1, Math.ceil(this.total / this.limit));
    const next = Math.min(Math.max(1, this.page + delta), last);
    if (next !== this.page) {
      this.page = next;
      this.loadTransfers();
    }
  }
  loadProjectContext() {
    this.locations = [];
    if (!this.projectId)
      return;
    this.subs.add(this.transferService.listLocations(this.projectId).subscribe({
      // The system in-transit location is never a user-selectable source or destination.
      next: (res) => this.locations = (res.data || []).filter((l) => l.location_type !== "in_transit"),
      error: () => this.toastr.error("Could not load store locations.")
    }));
  }
  openCreate() {
    if (!this.projectId) {
      this.toastr.warning("Select a project first.");
      return;
    }
    this.draft = { source_location_id: null, destination_location_id: null, reason: "", required_date: "", lines: [{ material_id: null, requested_qty: null }] };
    this.showCreate = true;
  }
  addLine() {
    this.draft.lines.push({ material_id: null, requested_qty: null });
  }
  removeLine(index) {
    if (this.draft.lines.length > 1)
      this.draft.lines.splice(index, 1);
  }
  /** Client-side checks are only for usability. The server re-validates every field. */
  createTransfer() {
    if (!this.draft.source_location_id || !this.draft.destination_location_id) {
      this.toastr.warning("Choose a source and a destination.");
      return;
    }
    if (!this.draft.reason.trim()) {
      this.toastr.warning("A reason is required.");
      return;
    }
    const lines = this.draft.lines.filter((l) => l.material_id).map((l) => ({ material_id: Number(l.material_id), requested_qty: Number(l.requested_qty) }));
    if (lines.length === 0) {
      this.toastr.warning("Add at least one material line.");
      return;
    }
    this.creating = true;
    this.subs.add(this.transferService.createTransfer({
      source_location_id: Number(this.draft.source_location_id),
      destination_location_id: Number(this.draft.destination_location_id),
      reason: this.draft.reason.trim(),
      required_date: this.draft.required_date || null,
      lines
    }).subscribe({
      next: (res) => {
        this.creating = false;
        this.showCreate = false;
        this.toastr.success(`Draft ${res.data.transfer_number} created. No stock has moved.`);
        this.router.navigate(["/master/stock-transfer", res.data.id], { queryParams: { projectId: this.projectId } });
      },
      error: (err) => {
        this.creating = false;
        this.toastr.error(err?.error?.message || "Could not create the transfer.");
      }
    }));
  }
  locationLabel(id) {
    const loc = this.locations.find((l) => Number(l.id) === Number(id));
    return loc ? `${loc.name} (${loc.code})` : `#${id}`;
  }
  get pageCount() {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }
  static \u0275fac = function StockTransferRegister_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferRegister)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(MaterialService), \u0275\u0275directiveInject(StockTransferService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(StockTransferContext));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockTransferRegister, selectors: [["app-stock-transfer-register"]], standalone: false, decls: 24, vars: 15, consts: [["noRows", ""], [1, "st-page"], ["backTo", "inventory", "backLabel", "Back to Project Inventory", 3, "active", "projectId"], [1, "st-header"], ["class", "st-sub", 4, "ngIf"], [1, "st-actions"], ["type", "button", 1, "st-btn", "primary", 3, "click", "disabled"], [1, "st-filters"], ["aria-label", "Project", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "st-empty", 4, "ngIf"], ["class", "st-error", "role", "alert", 4, "ngIf"], ["class", "st-loading", 4, "ngIf"], ["class", "st-table-wrap", 4, "ngIf"], ["class", "st-modal-backdrop", 3, "click", 4, "ngIf"], [1, "st-sub"], ["aria-label", "Status", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "draft"], ["value", "submitted"], ["value", "approved"], ["value", "in_transit"], ["value", "partially_received"], ["value", "reconciliation_required"], ["value", "completed"], ["value", "rejected"], ["value", "cancelled"], [1, "st-empty"], ["role", "alert", 1, "st-error"], [1, "st-loading"], [1, "st-table-wrap"], ["class", "st-table", 4, "ngIf", "ngIfElse"], ["class", "st-pager", 4, "ngIf"], [1, "st-table"], [1, "num"], [4, "ngFor", "ngForOf"], [3, "routerLink", "queryParams"], [1, "st-status"], [1, "st-pager"], ["type", "button", 1, "st-btn", 3, "click", "disabled"], [1, "st-modal-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "st-create-title", 1, "st-modal", 3, "click"], ["id", "st-create-title"], ["name", "source", 3, "ngModelChange", "ngModel"], ["name", "destination", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "500", "name", "reason", 3, "ngModelChange", "ngModel"], ["type", "date", "name", "required", 3, "ngModelChange", "ngModel"], [1, "st-lines"], ["class", "st-line", 4, "ngFor", "ngForOf"], ["type", "button", 1, "st-btn", 3, "click"], [1, "st-modal-actions"], [1, "st-line"], ["aria-label", "Material", 3, "ngModelChange", "ngModel", "name"], ["type", "number", "min", "1", "step", "1", "aria-label", "Requested quantity", 3, "ngModelChange", "ngModel", "name"]], template: function StockTransferRegister_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275element(1, "app-stock-transfer-nav", 2);
      \u0275\u0275elementStart(2, "header", 3)(3, "div")(4, "h1");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(6, StockTransferRegister_p_6_Template, 2, 0, "p", 4)(7, StockTransferRegister_p_7_Template, 2, 0, "p", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "button", 6);
      \u0275\u0275listener("click", function StockTransferRegister_Template_button_click_9_listener() {
        return ctx.openCreate();
      });
      \u0275\u0275text(10, "New transfer request");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "section", 7)(12, "label");
      \u0275\u0275text(13, " Project ");
      \u0275\u0275elementStart(14, "select", 8);
      \u0275\u0275listener("ngModelChange", function StockTransferRegister_Template_select_ngModelChange_14_listener($event) {
        return ctx.onProjectChange($event);
      });
      \u0275\u0275elementStart(15, "option", 9);
      \u0275\u0275text(16, "Select a project");
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, StockTransferRegister_option_17_Template, 2, 2, "option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, StockTransferRegister_label_18_Template, 23, 1, "label", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, StockTransferRegister_p_19_Template, 2, 0, "p", 12)(20, StockTransferRegister_p_20_Template, 2, 1, "p", 13)(21, StockTransferRegister_p_21_Template, 2, 0, "p", 14)(22, StockTransferRegister_div_22_Template, 5, 3, "div", 15)(23, StockTransferRegister_div_23_Template, 35, 11, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("active", ctx.mode === "approvals" ? "approvals" : "register")("projectId", ctx.projectId);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.mode === "approvals" ? "Approval Queue" : "All Transfers");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.mode === "approvals");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.mode !== "approvals");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.projectId);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngModel", ctx.projectId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.projects);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.mode !== "approvals");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.projectId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loadError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.projectId && !ctx.loading && !ctx.loadError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showCreate);
    }
  }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, NgModel, RouterLink, StockTransferNav, TitleCasePipe, DatePipe], styles: ["\n.st-page[_ngcontent-%COMP%] {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub[_ngcontent-%COMP%] {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link[_ngcontent-%COMP%] {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary[_ngcontent-%COMP%] {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger[_ngcontent-%COMP%] {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.st-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.st-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.st-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed][_ngcontent-%COMP%] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit][_ngcontent-%COMP%], \n.st-status[data-status=partially_received][_ngcontent-%COMP%] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required][_ngcontent-%COMP%], \n.st-status[data-status=rejected][_ngcontent-%COMP%], \n.st-status[data-status=cancelled][_ngcontent-%COMP%] {\n  background: #ffebee;\n}\n.st-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.st-summary[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.st-pager[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.st-empty[_ngcontent-%COMP%], \n.st-loading[_ngcontent-%COMP%] {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.st-timeline[_ngcontent-%COMP%] {\n  padding-left: 18px;\n}\n.st-timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n}\n.st-overdue[_ngcontent-%COMP%] {\n  background: #fff8e1;\n}\n.st-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines[_ngcontent-%COMP%] {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .st-summary[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=stock-transfer-register.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferRegister, [{
    type: Component,
    args: [{ selector: "app-stock-transfer-register", standalone: false, template: `<div class="st-page">
  <app-stock-transfer-nav
    [active]="mode === 'approvals' ? 'approvals' : 'register'"
    [projectId]="projectId"
    backTo="inventory"
    backLabel="Back to Project Inventory">
  </app-stock-transfer-nav>

  <header class="st-header">
    <div>
      <h1>{{ mode === 'approvals' ? 'Approval Queue' : 'All Transfers' }}</h1>
      <p class="st-sub" *ngIf="mode === 'approvals'">Requests awaiting approval for this project. Completed, cancelled and rejected transfers are not listed here.</p>
      <p class="st-sub" *ngIf="mode !== 'approvals'">Internal moves between central warehouse, project stores, site stores and quarantine. Creating a request does not move stock.</p>
    </div>
    <div class="st-actions">
      <button type="button" class="st-btn primary" (click)="openCreate()" [disabled]="!projectId">New transfer request</button>
    </div>
  </header>

  <section class="st-filters">
    <label>
      Project
      <select [ngModel]="projectId" (ngModelChange)="onProjectChange($event)" aria-label="Project">
        <option [ngValue]="null">Select a project</option>
        <option *ngFor="let p of projects" [ngValue]="p.id">{{ p.name }}</option>
      </select>
    </label>
    <label *ngIf="mode !== 'approvals'">
      Status
      <select [(ngModel)]="statusFilter" (change)="onStatusChange()" aria-label="Status">
        <option value="">All statuses</option>
        <option value="draft">Draft</option>
        <option value="submitted">Submitted (awaiting approval)</option>
        <option value="approved">Approved</option>
        <option value="in_transit">In transit</option>
        <option value="partially_received">Partially received</option>
        <option value="reconciliation_required">Reconciliation required</option>
        <option value="completed">Completed</option>
        <option value="rejected">Rejected</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </label>
  </section>

  <p class="st-empty" *ngIf="!projectId">Select a project to see its stock transfers.</p>

  <p class="st-error" *ngIf="loadError" role="alert">{{ loadError }}</p>
  <p class="st-loading" *ngIf="loading">Loading transfers\u2026</p>

  <div class="st-table-wrap" *ngIf="projectId && !loading && !loadError">
    <table class="st-table" *ngIf="transfers.length; else noRows">
      <thead>
        <tr>
          <th>Transfer</th>
          <th>From</th>
          <th>To</th>
          <th>Status</th>
          <th class="num">Approved</th>
          <th class="num">Dispatched</th>
          <th class="num">Outstanding in transit</th>
          <th>Required</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let t of transfers">
          <td><a [routerLink]="['/master/stock-transfer', t.id]" [queryParams]="{ projectId: projectId }">{{ t.transfer_number }}</a></td>
          <td>{{ locationLabel(t.source_location_id) }}</td>
          <td>{{ locationLabel(t.destination_location_id) }}</td>
          <td><span class="st-status" [attr.data-status]="t.status">{{ t.status | titlecase }}</span></td>
          <td class="num">{{ t.totals.approved }}</td>
          <td class="num">{{ t.totals.dispatched }}</td>
          <td class="num">{{ t.totals.outstanding }}</td>
          <td>{{ t.required_date || '\u2014' }}</td>
          <td>{{ t.createdAt | date: 'dd MMM yyyy' }}</td>
          <td><a [routerLink]="['/master/stock-transfer', t.id]" [queryParams]="{ projectId: projectId }">Open</a></td>
        </tr>
      </tbody>
    </table>
    <ng-template #noRows>
      <p class="st-empty">No transfers match these filters.</p>
    </ng-template>

    <nav class="st-pager" *ngIf="total > limit">
      <button type="button" class="st-btn" (click)="nextPage(-1)" [disabled]="page <= 1">Previous</button>
      <span>Page {{ page }} of {{ pageCount }}</span>
      <button type="button" class="st-btn" (click)="nextPage(1)" [disabled]="page >= pageCount">Next</button>
    </nav>
  </div>

  <div class="st-modal-backdrop" *ngIf="showCreate" (click)="showCreate = false">
    <div class="st-modal" role="dialog" aria-modal="true" aria-labelledby="st-create-title" (click)="$event.stopPropagation()">
      <h2 id="st-create-title">New transfer request</h2>
      <p class="st-sub">Saved as a draft. Stock moves only after approval and check-out.</p>

      <label>
        Source location
        <select [(ngModel)]="draft.source_location_id" name="source">
          <option [ngValue]="null">Choose\u2026</option>
          <option *ngFor="let l of locations" [ngValue]="l.id">{{ l.name }} ({{ l.code }}) \u2014 {{ l.location_type }}</option>
        </select>
      </label>
      <label>
        Destination location
        <select [(ngModel)]="draft.destination_location_id" name="destination">
          <option [ngValue]="null">Choose\u2026</option>
          <option *ngFor="let l of locations" [ngValue]="l.id">{{ l.name }} ({{ l.code }}) \u2014 {{ l.location_type }}</option>
        </select>
      </label>
      <label>
        Reason
        <input type="text" [(ngModel)]="draft.reason" maxlength="500" name="reason" />
      </label>
      <label>
        Required by
        <input type="date" [(ngModel)]="draft.required_date" name="required" />
      </label>

      <fieldset class="st-lines">
        <legend>Materials (whole units)</legend>
        <div class="st-line" *ngFor="let line of draft.lines; let i = index">
          <select [(ngModel)]="line.material_id" [name]="'mat' + i" aria-label="Material">
            <option [ngValue]="null">Choose material\u2026</option>
            <option *ngFor="let m of projectMaterials" [ngValue]="m.id">{{ m.name }} ({{ m.sku }})</option>
          </select>
          <input type="number" min="1" step="1" [(ngModel)]="line.requested_qty" [name]="'qty' + i" aria-label="Requested quantity" />
          <button type="button" class="st-btn" (click)="removeLine(i)" [disabled]="draft.lines.length === 1">Remove</button>
        </div>
        <button type="button" class="st-btn" (click)="addLine()">Add material</button>
      </fieldset>

      <div class="st-modal-actions">
        <button type="button" class="st-btn" (click)="showCreate = false">Cancel</button>
        <button type="button" class="st-btn primary" (click)="createTransfer()" [disabled]="creating">
          {{ creating ? 'Saving\u2026' : 'Save draft' }}
        </button>
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/modules/stock-transfer/stock-transfer-register/stock-transfer-register.scss */\n.st-page {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header h1 {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters label,\n.st-grid label {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap {\n  overflow-x: auto;\n}\n.st-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table th,\n.st-table td {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table .num {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit],\n.st-status[data-status=partially_received] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required],\n.st-status[data-status=rejected],\n.st-status[data-status=cancelled] {\n  background: #ffebee;\n}\n.st-card {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card h2 {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary {\n  display: flex;\n  gap: 16px;\n}\n.st-summary div {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary span {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary strong {\n  font-size: 1.2rem;\n}\n.st-pager {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error {\n  color: #c62828;\n}\n.st-empty,\n.st-loading {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb {\n  margin-bottom: 8px;\n}\n.st-timeline {\n  padding-left: 18px;\n}\n.st-timeline li {\n  margin-bottom: 6px;\n}\n.st-overdue {\n  background: #fff8e1;\n}\n.st-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal label {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line select {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page {\n    padding: 12px;\n  }\n  .st-summary {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=stock-transfer-register.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: ProjectService }, { type: MaterialService }, { type: StockTransferService }, { type: ToastrService }, { type: StockTransferContext }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockTransferRegister, { className: "StockTransferRegister", filePath: "app/modules/stock-transfer/stock-transfer-register/stock-transfer-register.ts", lineNumber: 30 });
})();

// src/app/shared/services/inventory/inventory.service.ts
var InventoryService = class _InventoryService {
  http;
  apiUrl = `${environment.serverUrl}/api/v1/inventory`;
  constructor(http) {
    this.http = http;
  }
  balances(projectId) {
    return this.http.get(`${this.apiUrl}/balances`, { params: new HttpParams().set("project_id", String(projectId)) });
  }
  movements(projectId, materialId) {
    let params = new HttpParams().set("project_id", String(projectId));
    if (materialId)
      params = params.set("material_id", String(materialId));
    return this.http.get(`${this.apiUrl}/movements`, { params });
  }
  receive(body) {
    return this.http.post(`${this.apiUrl}/receipts`, body);
  }
  issue(body) {
    return this.http.post(`${this.apiUrl}/issues`, body);
  }
  static \u0275fac = function InventoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventoryService, factory: _InventoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/stock-transfer/stock-transfer-detail/stock-transfer-detail.ts
function StockTransferDetail_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Loading transfer\u2026");
    \u0275\u0275elementEnd();
  }
}
function StockTransferDetail_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.loadError);
  }
}
function StockTransferDetail_ng_container_4_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Reason: ", ctx_r0.transfer.reason);
  }
}
function StockTransferDetail_ng_container_4_ol_34_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 29)(2, "span", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("done", i_r3 < ctx_r0.stepIndex)("current", i_r3 === ctx_r0.stepIndex);
    \u0275\u0275attribute("aria-current", i_r3 === ctx_r0.stepIndex ? "step" : null);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r3 < ctx_r0.stepIndex ? "check" : s_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.label);
  }
}
function StockTransferDetail_ng_container_4_ol_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 27);
    \u0275\u0275template(1, StockTransferDetail_ng_container_4_ol_34_li_1_Template, 6, 7, "li", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.steps);
  }
}
function StockTransferDetail_ng_container_4_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31)(1, "span", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("data-status", ctx_r0.transfer.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.transfer.status === "rejected" ? "cancel" : "block");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" This transfer was ", ctx_r0.transfer.status, ". No further stock movement is possible. ");
  }
}
function StockTransferDetail_ng_container_4_tr_62_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275element(1, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("title", ctx_r0.dispatchPercent(l_r4) + "% dispatched");
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.dispatchPercent(l_r4), "%");
  }
}
function StockTransferDetail_ng_container_4_tr_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, StockTransferDetail_ng_container_4_tr_62_div_6_Template, 2, 3, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 24);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 24);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 24);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 24);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 24);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 24);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 24)(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const l_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.materialName(l_r4.material_id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", l_r4.unit_of_measure, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", l_r4.dispatched > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r4.requested_qty);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r4.approved_qty ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r4.dispatched);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r4.received_accepted);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r4.received_quarantined);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r4.reversed);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r4.shortage);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(l_r4.outstanding);
  }
}
function StockTransferDetail_ng_container_4_section_65_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_65_div_5_Template_input_ngModelChange_3_listener($event) {
      const l_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.approvalDraft[l_r7.id], $event) || (ctx_r0.approvalDraft[l_r7.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const l_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Line #", l_r7.material_id, " approved quantity ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.approvalDraft[l_r7.id]);
    \u0275\u0275property("name", "appr" + l_r7.id);
  }
}
function StockTransferDetail_ng_container_4_section_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Approval");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4, "You cannot approve a transfer you requested. Approved quantities cannot exceed requested quantities.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, StockTransferDetail_ng_container_4_section_65_div_5_Template, 4, 3, "div", 34);
    \u0275\u0275elementStart(6, "label");
    \u0275\u0275text(7, "Decision note ");
    \u0275\u0275elementStart(8, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_65_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.approvalReason, $event) || (ctx_r0.approvalReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "label");
    \u0275\u0275text(10, "Super Admin override reason ");
    \u0275\u0275elementStart(11, "span", 12);
    \u0275\u0275text(12, "(only when approving a request you created; at least 10 characters; recorded in the audit history)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_65_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.overrideReason, $event) || (ctx_r0.overrideReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 37)(15, "button", 38);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_65_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.approve());
    });
    \u0275\u0275text(16, "Approve");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label");
    \u0275\u0275text(18, "Rejection reason ");
    \u0275\u0275elementStart(19, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_65_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.rejectReason, $event) || (ctx_r0.rejectReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 37)(21, "button", 40);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_65_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.reject());
    });
    \u0275\u0275text(22, "Reject");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r0.transfer.lines);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.approvalReason);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.overrideReason);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.rejectReason);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy);
  }
}
function StockTransferDetail_ng_container_4_section_66_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "button", 38);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_66_div_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.submit());
    });
    \u0275\u0275text(2, "Submit for approval");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.busy);
  }
}
function StockTransferDetail_ng_container_4_section_66_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label");
    \u0275\u0275text(2, "Cancellation reason ");
    \u0275\u0275elementStart(3, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_66_div_4_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.cancelReason, $event) || (ctx_r0.cancelReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 37)(5, "button", 40);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_66_div_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancel());
    });
    \u0275\u0275text(6, "Cancel transfer");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cancelReason);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy);
  }
}
function StockTransferDetail_ng_container_4_section_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Request");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, StockTransferDetail_ng_container_4_section_66_div_3_Template, 3, 1, "div", 43)(4, StockTransferDetail_ng_container_4_section_66_div_4_Template, 7, 2, "div", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.canSubmit);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canCancel);
  }
}
function StockTransferDetail_ng_container_4_section_67_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_67_tr_15_Template_input_ngModelChange_6_listener($event) {
      const l_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.checkoutQty[l_r12.id], $event) || (ctx_r0.checkoutQty[l_r12.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const l_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", l_r12.material_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((l_r12.approved_qty ?? 0) - l_r12.dispatched);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.checkoutQty[l_r12.id]);
    \u0275\u0275property("name", "out" + l_r12.id)("disabled", (l_r12.approved_qty ?? 0) - l_r12.dispatched <= 0);
  }
}
function StockTransferDetail_ng_container_4_section_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Source check-out");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4, "Enter the quantity physically picked and dispatched for each line. Source stock decreases once; the goods stay traceable in transit.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "table", 23)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Line");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 24);
    \u0275\u0275text(11, "Remaining to dispatch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Dispatch quantity");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, StockTransferDetail_ng_container_4_section_67_tr_15_Template, 7, 5, "tr", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "label");
    \u0275\u0275text(17, "Dispatch / challan reference ");
    \u0275\u0275elementStart(18, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_67_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.dispatchRef, $event) || (ctx_r0.dispatchRef = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 37)(20, "button", 38);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_67_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.checkOut());
    });
    \u0275\u0275text(21, "Check out stock");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r0.transfer.lines);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.dispatchRef);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy);
  }
}
function StockTransferDetail_ng_container_4_section_68_table_5_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_68_table_5_tr_12_Template_input_ngModelChange_6_listener($event) {
      const l_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.checkinAccepted[l_r15.id], $event) || (ctx_r0.checkinAccepted[l_r15.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_68_table_5_tr_12_Template_input_ngModelChange_8_listener($event) {
      const l_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.checkinQuarantined[l_r15.id], $event) || (ctx_r0.checkinQuarantined[l_r15.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const l_r15 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", l_r15.material_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(l_r15.outstanding);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.checkinAccepted[l_r15.id]);
    \u0275\u0275property("name", "acc" + l_r15.id);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.checkinQuarantined[l_r15.id]);
    \u0275\u0275property("name", "qua" + l_r15.id);
  }
}
function StockTransferDetail_ng_container_4_section_68_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 23)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Line");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 24);
    \u0275\u0275text(6, "Outstanding");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Accepted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Quarantined");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, StockTransferDetail_ng_container_4_section_68_table_5_tr_12_Template, 9, 6, "tr", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r0.outstandingLines);
  }
}
function StockTransferDetail_ng_container_4_section_68_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "Nothing is outstanding in transit.");
    \u0275\u0275elementEnd();
  }
}
function StockTransferDetail_ng_container_4_section_68_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r16 = ctx.$implicit;
    \u0275\u0275property("ngValue", loc_r16.id)("disabled", loc_r16.location_type !== "quarantine");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", loc_r16.name, " (", loc_r16.code, ") \u2014 ", loc_r16.location_type, " ");
  }
}
function StockTransferDetail_ng_container_4_section_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Destination check-in");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4, "Accepted goods go to the destination. Damaged or rejected goods go to quarantine. Anything not received stays in transit.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, StockTransferDetail_ng_container_4_section_68_table_5_Template, 13, 1, "table", 47)(6, StockTransferDetail_ng_container_4_section_68_ng_template_6_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(8, "div", 41)(9, "label");
    \u0275\u0275text(10, "Quarantine location ");
    \u0275\u0275elementStart(11, "select", 48);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_68_Template_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.quarantineLocationId, $event) || (ctx_r0.quarantineLocationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(12, "option", 49);
    \u0275\u0275text(13, "Not needed");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, StockTransferDetail_ng_container_4_section_68_option_14_Template, 2, 5, "option", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label");
    \u0275\u0275text(16, "Receipt reference ");
    \u0275\u0275elementStart(17, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_68_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.receiptRef, $event) || (ctx_r0.receiptRef = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 37)(19, "button", 38);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_68_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.checkIn());
    });
    \u0275\u0275text(20, "Check in");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const nothingOutstanding_r17 = \u0275\u0275reference(7);
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.outstandingLines.length)("ngIfElse", nothingOutstanding_r17);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.quarantineLocationId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.locations);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.receiptRef);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy || !ctx_r0.outstandingLines.length);
  }
}
function StockTransferDetail_ng_container_4_section_69_table_3_tr_13_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_69_table_3_tr_13_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const d_r19 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.writeOff(d_r19));
    });
    \u0275\u0275text(1, "Authorized write-off");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275property("disabled", ctx_r0.busy);
  }
}
function StockTransferDetail_ng_container_4_section_69_table_3_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275template(10, StockTransferDetail_ng_container_4_section_69_table_3_tr_13_button_10_Template, 2, 1, "button", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r19 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", d_r19.transfer_line_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r19.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r19.reason);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r19.status === "open" ? "Open" : "Written off");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", d_r19.status === "open");
  }
}
function StockTransferDetail_ng_container_4_section_69_table_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 23)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Line");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 24);
    \u0275\u0275text(6, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, StockTransferDetail_ng_container_4_section_69_table_3_tr_13_Template, 11, 5, "tr", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r0.transfer.discrepancies);
  }
}
function StockTransferDetail_ng_container_4_section_69_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "No shortages declared.");
    \u0275\u0275elementEnd();
  }
}
function StockTransferDetail_ng_container_4_section_69_div_6_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r21 = ctx.$implicit;
    \u0275\u0275property("ngValue", l_r21.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("#", l_r21.material_id, " (outstanding ", l_r21.outstanding, ")");
  }
}
function StockTransferDetail_ng_container_4_section_69_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "label");
    \u0275\u0275text(2, "Line ");
    \u0275\u0275elementStart(3, "select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_69_div_6_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.shortageLine, $event) || (ctx_r0.shortageLine = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 49);
    \u0275\u0275text(5, "Choose\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, StockTransferDetail_ng_container_4_section_69_div_6_option_6_Template, 2, 3, "option", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8, "Quantity ");
    \u0275\u0275elementStart(9, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_69_div_6_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.shortageQty, $event) || (ctx_r0.shortageQty = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Reason ");
    \u0275\u0275elementStart(12, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_69_div_6_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.shortageReason, $event) || (ctx_r0.shortageReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 61);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_69_div_6_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.declareShortage());
    });
    \u0275\u0275text(14, "Declare shortage");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shortageLine);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.outstandingLines);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shortageQty);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.shortageReason);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.busy);
  }
}
function StockTransferDetail_ng_container_4_section_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Shortages and discrepancies");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, StockTransferDetail_ng_container_4_section_69_table_3_Template, 14, 1, "table", 47)(4, StockTransferDetail_ng_container_4_section_69_ng_template_4_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(6, StockTransferDetail_ng_container_4_section_69_div_6_Template, 15, 6, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const noDisc_r22 = \u0275\u0275reference(5);
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.transfer.discrepancies.length)("ngIfElse", noDisc_r22);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.canCheckIn);
  }
}
function StockTransferDetail_ng_container_4_section_70_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r24 = ctx.$implicit;
    \u0275\u0275property("ngValue", l_r24.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("#", l_r24.material_id, " (outstanding ", l_r24.outstanding, ")");
  }
}
function StockTransferDetail_ng_container_4_section_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "Authorized dispatch reversal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4, "Returns goods that were dispatched but never received back to the source location.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 41)(6, "label");
    \u0275\u0275text(7, "Line ");
    \u0275\u0275elementStart(8, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_70_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.reverseLine, $event) || (ctx_r0.reverseLine = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 49);
    \u0275\u0275text(10, "Choose\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, StockTransferDetail_ng_container_4_section_70_option_11_Template, 2, 3, "option", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label");
    \u0275\u0275text(13, "Quantity ");
    \u0275\u0275elementStart(14, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_70_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.reverseQty, $event) || (ctx_r0.reverseQty = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label");
    \u0275\u0275text(16, "Reason ");
    \u0275\u0275elementStart(17, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_ng_container_4_section_70_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.reverseReason, $event) || (ctx_r0.reverseReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 37)(19, "button", 40);
    \u0275\u0275listener("click", function StockTransferDetail_ng_container_4_section_70_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.reverseDispatch());
    });
    \u0275\u0275text(20, "Reverse dispatch");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.reverseLine);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.outstandingLines);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.reverseQty);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.reverseReason);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy);
  }
}
function StockTransferDetail_ng_container_4_section_71_li_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r25 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, e_r25.event_type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(6, 5, e_r25.createdAt, "dd MMM yyyy, HH:mm"), " \xB7 user #", e_r25.actor_id ?? "\u2014");
  }
}
function StockTransferDetail_ng_container_4_section_71_table_7_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 24);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r26 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 4, m_r26.createdAt, "dd MMM yyyy, HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r26.movement_type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r26.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r26.location_id ? ctx_r0.locationName(m_r26.location_id) : "In transit");
  }
}
function StockTransferDetail_ng_container_4_section_71_table_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 23)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "When");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 24);
    \u0275\u0275text(8, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Location");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, StockTransferDetail_ng_container_4_section_71_table_7_tr_12_Template, 10, 7, "tr", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r0.history.movements);
  }
}
function StockTransferDetail_ng_container_4_section_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 22)(1, "h2");
    \u0275\u0275text(2, "History");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ol", 65);
    \u0275\u0275template(4, StockTransferDetail_ng_container_4_section_71_li_4_Template, 7, 8, "li", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "Stock movements");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, StockTransferDetail_ng_container_4_section_71_table_7_Template, 13, 1, "table", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.history.events);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.history.movements.length);
  }
}
function StockTransferDetail_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "header", 11)(2, "div")(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "span", 13);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, StockTransferDetail_ng_container_4_p_10_Template, 2, 1, "p", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 15)(12, "div", 16)(13, "span", 17);
    \u0275\u0275text(14, "fact_check");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Approved");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 18)(20, "span", 17);
    \u0275\u0275text(21, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "Dispatched");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 19)(27, "span", 17);
    \u0275\u0275text(28, "hourglass_top");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30, "Outstanding in transit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "strong");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "section", 20);
    \u0275\u0275template(34, StockTransferDetail_ng_container_4_ol_34_Template, 2, 1, "ol", 21)(35, StockTransferDetail_ng_container_4_ng_template_35_Template, 4, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "section", 22)(38, "h2");
    \u0275\u0275text(39, "Lines");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "table", 23)(41, "thead")(42, "tr")(43, "th");
    \u0275\u0275text(44, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "th", 24);
    \u0275\u0275text(46, "Requested");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "th", 24);
    \u0275\u0275text(48, "Approved");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "th", 24);
    \u0275\u0275text(50, "Dispatched");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "th", 24);
    \u0275\u0275text(52, "Accepted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "th", 24);
    \u0275\u0275text(54, "Quarantined");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "th", 24);
    \u0275\u0275text(56, "Reversed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "th", 24);
    \u0275\u0275text(58, "Written off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "th", 24);
    \u0275\u0275text(60, "Outstanding");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "tbody");
    \u0275\u0275template(62, StockTransferDetail_ng_container_4_tr_62_Template, 24, 11, "tr", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "p", 12);
    \u0275\u0275text(64, "Quantities are derived from the stock ledger. Rejected or damaged goods are counted as quarantined, not lost.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(65, StockTransferDetail_ng_container_4_section_65_Template, 23, 6, "section", 26)(66, StockTransferDetail_ng_container_4_section_66_Template, 5, 2, "section", 26)(67, StockTransferDetail_ng_container_4_section_67_Template, 22, 3, "section", 26)(68, StockTransferDetail_ng_container_4_section_68_Template, 21, 7, "section", 26)(69, StockTransferDetail_ng_container_4_section_69_Template, 7, 3, "section", 26)(70, StockTransferDetail_ng_container_4_section_70_Template, 21, 6, "section", 26)(71, StockTransferDetail_ng_container_4_section_71_Template, 8, 2, "section", 26);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const terminalState_r27 = \u0275\u0275reference(36);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.transfer.transfer_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.locationName(ctx_r0.transfer.source_location_id), " \u2192 ", ctx_r0.locationName(ctx_r0.transfer.destination_location_id), " \xB7 ");
    \u0275\u0275advance();
    \u0275\u0275attribute("data-status", ctx_r0.transfer.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 19, ctx_r0.transfer.status));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.transfer.reason);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.transfer.totals.approved);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.transfer.totals.dispatched);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.transfer.totals.outstanding);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.stepIndex >= 0)("ngIfElse", terminalState_r27);
    \u0275\u0275advance(28);
    \u0275\u0275property("ngForOf", ctx_r0.transfer.lines);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.canApprove);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canSubmit || ctx_r0.canCancel);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canCheckOut);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canCheckIn);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.transfer.status !== "draft" && ctx_r0.transfer.status !== "cancelled" && ctx_r0.transfer.status !== "rejected");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canCheckIn);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.history);
  }
}
function StockTransferDetail_div_5_li_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r29 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r29);
  }
}
function StockTransferDetail_div_5_label_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 73);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_div_5_label_6_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.dialog.reason, $event) || (ctx_r0.dialog.reason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.dialog.reasonLabel, "", ctx_r0.dialog.reasonRequired ? " (required)" : "", " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.dialog.reason);
    \u0275\u0275attribute("aria-invalid", !!ctx_r0.dialog.error);
  }
}
function StockTransferDetail_div_5_label_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function StockTransferDetail_div_5_label_7_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r31);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.dialog.overrideReason, $event) || (ctx_r0.dialog.overrideReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.dialog.overrideLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.dialog.overrideReason);
  }
}
function StockTransferDetail_div_5_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.dialog.error);
  }
}
function StockTransferDetail_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275listener("click", function StockTransferDetail_div_5_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDialog());
    });
    \u0275\u0275elementStart(1, "div", 68);
    \u0275\u0275listener("click", function StockTransferDetail_div_5_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h2", 69);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 70);
    \u0275\u0275template(5, StockTransferDetail_div_5_li_5_Template, 2, 1, "li", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, StockTransferDetail_div_5_label_6_Template, 3, 4, "label", 7)(7, StockTransferDetail_div_5_label_7_Template, 3, 2, "label", 7)(8, StockTransferDetail_div_5_p_8_Template, 2, 1, "p", 6);
    \u0275\u0275elementStart(9, "div", 71)(10, "button", 72);
    \u0275\u0275listener("click", function StockTransferDetail_div_5_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDialog());
    });
    \u0275\u0275text(11, "Back");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 61);
    \u0275\u0275listener("click", function StockTransferDetail_div_5_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmDialog());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.dialog.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.dialog.summary);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dialog.reasonLabel);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dialog.overrideLabel);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dialog.error);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("danger", ctx_r0.dialog.danger)("primary", !ctx_r0.dialog.danger);
    \u0275\u0275property("disabled", ctx_r0.busy);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.dialog.confirmLabel);
  }
}
var StockTransferDetail = class _StockTransferDetail {
  route;
  router;
  service;
  inventory;
  toastr;
  transfer = null;
  dialog = null;
  history = null;
  locations = [];
  loading = true;
  busy = false;
  loadError = null;
  approvalDraft = {};
  approvalReason = "";
  /** Only a Super Admin approving a request they created needs this; the server records it. */
  overrideReason = "";
  rejectReason = "";
  cancelReason = "";
  checkoutKey = this.newKey();
  checkoutQty = {};
  dispatchRef = "";
  checkinKey = this.newKey();
  checkinAccepted = {};
  checkinQuarantined = {};
  quarantineLocationId = null;
  receiptRef = "";
  shortageLine = null;
  shortageQty = null;
  shortageReason = "";
  writeOffKey = this.newKey();
  reverseKey = this.newKey();
  reverseLine = null;
  reverseQty = null;
  reverseReason = "";
  transferId = 0;
  subs = new Subscription();
  constructor(route, router, service, inventory, toastr) {
    this.route = route;
    this.router = router;
    this.service = service;
    this.inventory = inventory;
    this.toastr = toastr;
  }
  ngOnInit() {
    this.subs.add(this.route.paramMap.subscribe((params) => {
      this.transferId = Number(params.get("id"));
      this.reload();
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  /** Stable arrays, recomputed only when a transfer is loaded. Getters would create new arrays on every check. */
  outstandingLines = [];
  openDiscrepancies = [];
  applyTransfer(t) {
    this.transfer = t;
    this.outstandingLines = (t?.lines || []).filter((l) => l.outstanding > 0);
    this.openDiscrepancies = (t?.discrepancies || []).filter((d) => d.status === "open");
  }
  get canApprove() {
    return this.transfer?.status === "submitted";
  }
  get canSubmit() {
    return this.transfer?.status === "draft";
  }
  get canCancel() {
    return ["draft", "submitted", "approved"].includes(this.transfer?.status || "");
  }
  get canCheckOut() {
    return ["approved", "in_transit", "partially_received"].includes(this.transfer?.status || "");
  }
  get canCheckIn() {
    return ["in_transit", "partially_received", "reconciliation_required"].includes(this.transfer?.status || "");
  }
  get locationName() {
    return (id) => {
      const loc = this.locations.find((l) => Number(l.id) === Number(id));
      return loc ? `${loc.name} (${loc.code})` : `#${id}`;
    };
  }
  reload() {
    this.loading = true;
    this.loadError = null;
    this.subs.add(this.service.getTransfer(this.transferId).subscribe({
      next: (res) => {
        this.applyTransfer(res.data);
        this.loading = false;
        this.resetDraftsFromTransfer();
        this.loadLocations();
        this.loadMaterialNames();
      },
      error: (err) => {
        this.loading = false;
        this.loadError = err?.error?.message || "Could not load this transfer.";
      }
    }));
    this.subs.add(this.service.getHistory(this.transferId).subscribe({
      next: (res) => this.history = res.data,
      error: () => this.history = null
    }));
  }
  /** Lifecycle shown as a progress stepper above the lines. */
  steps = [
    { key: "draft", label: "Draft", icon: "edit_note" },
    { key: "submitted", label: "Submitted", icon: "send" },
    { key: "approved", label: "Approved", icon: "verified" },
    { key: "in_transit", label: "In transit", icon: "local_shipping" },
    { key: "completed", label: "Completed", icon: "task_alt" }
  ];
  /** Index of the current step, or -1 for terminal states outside the normal path (rejected, cancelled). */
  get stepIndex() {
    switch (this.transfer?.status) {
      case "draft":
        return 0;
      case "submitted":
        return 1;
      case "approved":
        return 2;
      case "in_transit":
      case "partially_received":
      case "reconciliation_required":
        return 3;
      case "completed":
        return 4;
      default:
        return -1;
    }
  }
  materialNames = {};
  materialName(id) {
    return this.materialNames[Number(id)] || "#" + id;
  }
  /** Share of the approved quantity that has been dispatched, for the per-line progress bar. */
  dispatchPercent(l) {
    const base = Number(l.approved_qty ?? l.requested_qty) || 0;
    return base > 0 ? Math.min(100, Math.round(Number(l.dispatched) / base * 100)) : 0;
  }
  loadMaterialNames() {
    if (!this.transfer || Object.keys(this.materialNames).length)
      return;
    this.subs.add(this.inventory.balances(this.transfer.project_id).subscribe({
      next: (res) => {
        for (const m of res.data?.materials || []) {
          this.materialNames[Number(m.material_id)] = m.name + (m.sku ? " (" + m.sku + ")" : "");
        }
      },
      error: () => {
      }
    }));
  }
  loadLocations() {
    if (!this.transfer || this.locations.length)
      return;
    this.subs.add(this.service.listLocations(this.transfer.project_id).subscribe({
      next: (res) => this.locations = res.data || [],
      error: () => this.toastr.error("Could not load store locations.")
    }));
  }
  resetDraftsFromTransfer() {
    if (!this.transfer)
      return;
    this.approvalDraft = {};
    for (const line of this.transfer.lines) {
      this.approvalDraft[line.id] = line.approved_qty ?? line.requested_qty;
    }
  }
  submit() {
    this.runAction(() => this.service.submit(this.transferId), "Submitted for approval.");
  }
  approve() {
    if (!this.transfer)
      return;
    for (const l of this.transfer.lines) {
      const n = Number(this.approvalDraft[l.id]);
      if (!Number.isInteger(n) || n < 0 || n > l.requested_qty) {
        return this.warn(`Approved quantity for ${this.lineLabel(l.id)} must be a whole number between 0 and ${l.requested_qty}.`);
      }
    }
    const lines = this.transfer.lines.map((l) => ({ line_id: l.id, approved_qty: Number(this.approvalDraft[l.id] ?? 0) }));
    this.runAction(() => this.service.approve(this.transferId, lines, this.approvalReason || void 0, this.overrideReason.trim() || void 0), "Transfer approved.");
  }
  reject() {
    if (!this.rejectReason.trim())
      return this.warn("Enter a reason to reject.");
    this.openDialog({
      kind: "reject",
      title: "Reject this transfer request?",
      summary: ["The request is closed and no stock moves.", "The requester can raise a new request."],
      reasonLabel: "Rejection reason",
      reasonRequired: true,
      reason: this.rejectReason.trim(),
      confirmLabel: "Reject request",
      danger: true
    });
  }
  cancel() {
    if (!this.cancelReason.trim())
      return this.warn("Enter a reason to cancel.");
    this.openDialog({
      kind: "cancel",
      title: "Cancel this transfer?",
      summary: ["No stock has moved, so nothing needs reversing."],
      reasonLabel: "Cancellation reason",
      reasonRequired: true,
      reason: this.cancelReason.trim(),
      confirmLabel: "Cancel transfer",
      danger: true
    });
  }
  checkOut() {
    const error = this.checkoutError();
    if (error)
      return this.warn(error);
    const lines = this.checkoutPayload();
    const summary = this.transfer ? lines.map((l) => `Line ${this.lineLabel(l.line_id)}: dispatch ${l.quantity} ${this.uomOf(l.line_id)}`) : [];
    summary.push("Source stock decreases once. The goods are recorded as in transit until received.");
    this.openDialog({
      kind: "checkout",
      title: "Check out stock",
      summary,
      reasonRequired: false,
      reason: "",
      confirmLabel: "Check out stock",
      payload: lines
    });
  }
  checkIn() {
    const error = this.checkinError();
    if (error)
      return this.warn(error);
    const lines = this.checkinPayload();
    const summary = lines.map((l) => `Line ${this.lineLabel(l.line_id)}: accept ${l.accepted_qty}, quarantine ${l.quarantined_qty} ${this.uomOf(l.line_id)}`);
    summary.push("Accepted stock becomes available at the destination. Quarantined stock is held separately and is not available for consumption.");
    summary.push("Anything not received stays in transit until a shortage is resolved.");
    this.openDialog({
      kind: "checkin",
      title: "Record destination check-in",
      summary,
      reasonRequired: false,
      reason: "",
      confirmLabel: "Check in",
      payload: { lines, quarantine: this.quarantineLocationId }
    });
  }
  declareShortage() {
    if (!this.shortageLine || !this.shortageQty || !this.shortageReason.trim()) {
      return this.warn("Choose a line, a quantity and a reason.");
    }
    this.runAction(() => this.service.declareShortage(this.transferId, { line_id: Number(this.shortageLine), quantity: Number(this.shortageQty), reason: this.shortageReason.trim() }), "Shortage declared. It stays in transit until an authorized write-off.");
    this.shortageReason = "";
    this.shortageQty = null;
  }
  writeOff(d) {
    this.openDialog({
      kind: "writeoff",
      title: "Authorized write-off",
      summary: [
        `Write off ${d.quantity} unit(s) as a confirmed loss.`,
        "This is an authorized stock adjustment. It reduces the project total and cannot be undone.",
        "You cannot write off a shortage that you declared yourself."
      ],
      reasonLabel: "Reason for the write-off",
      reasonRequired: true,
      reason: "",
      confirmLabel: "Write off",
      danger: true,
      payload: d,
      overrideLabel: "Super Admin override reason (only if you declared this shortage; at least 10 characters)",
      overrideReason: ""
    });
  }
  reverseDispatch() {
    const error = this.reverseError();
    if (error)
      return this.warn(error);
    this.openDialog({
      kind: "reverse",
      title: "Reverse dispatch to source",
      summary: [
        `Return ${this.reverseQty} ${this.uomOf(Number(this.reverseLine))} of line ${this.lineLabel(Number(this.reverseLine))} to the source location.`,
        "Only goods that were dispatched and not yet received can be returned."
      ],
      reasonLabel: "Reason for the reversal",
      reasonRequired: true,
      reason: this.reverseReason.trim(),
      confirmLabel: "Reverse dispatch",
      danger: true
    });
  }
  /** Opens the in-app confirmation dialog. Native confirm() and prompt() are not used. */
  openDialog(d) {
    this.dialog = __spreadProps(__spreadValues({}, d), { error: null });
  }
  closeDialog() {
    this.dialog = null;
  }
  /** Runs the confirmed action. The reason is validated here before anything is sent to the server. */
  confirmDialog() {
    const d = this.dialog;
    if (!d || this.busy)
      return;
    if (d.reasonRequired && !d.reason.trim()) {
      d.error = "A reason is required.";
      return;
    }
    const reason = d.reason.trim();
    this.dialog = null;
    switch (d.kind) {
      case "reject":
        this.runAction(() => this.service.reject(this.transferId, reason), "Transfer rejected.");
        break;
      case "cancel":
        this.runAction(() => this.service.cancel(this.transferId, reason), "Transfer cancelled.");
        break;
      case "checkout":
        this.runKeyed(() => this.service.checkOut(this.transferId, { idempotency_key: this.checkoutKey, lines: d.payload, dispatch_reference: this.dispatchRef || void 0 }), "Check-out recorded. Stock is now in transit.", () => {
          this.checkoutKey = this.newKey();
          this.checkoutQty = {};
          this.dispatchRef = "";
        });
        break;
      case "checkin":
        this.runKeyed(() => this.service.checkIn(this.transferId, {
          idempotency_key: this.checkinKey,
          quarantine_location_id: d.payload.lines.some((l) => l.quarantined_qty > 0) ? Number(d.payload.quarantine) : void 0,
          receipt_reference: this.receiptRef || void 0,
          lines: d.payload.lines
        }), "Check-in recorded.", () => {
          this.checkinKey = this.newKey();
          this.checkinAccepted = {};
          this.checkinQuarantined = {};
          this.receiptRef = "";
        });
        break;
      case "writeoff":
        this.runKeyed(() => this.service.writeOffShortage(d.payload.id, {
          reason,
          idempotency_key: this.writeOffKey,
          override_reason: (d.overrideReason || "").trim() || void 0
        }), "Shortage written off.", () => this.writeOffKey = this.newKey());
        break;
      case "reverse":
        this.runKeyed(() => this.service.reverseDispatch(this.transferId, {
          line_id: Number(this.reverseLine),
          quantity: Number(this.reverseQty),
          reason,
          idempotency_key: this.reverseKey
        }), "Dispatch reversed to source.", () => {
          this.reverseKey = this.newKey();
          this.reverseQty = null;
          this.reverseReason = "";
        });
        break;
    }
  }
  lineLabel(lineId) {
    const line = this.transfer?.lines.find((l) => Number(l.id) === Number(lineId));
    return line ? `#${line.material_id}` : `#${lineId}`;
  }
  uomOf(lineId) {
    const line = this.transfer?.lines.find((l) => Number(l.id) === Number(lineId));
    return line?.unit_of_measure || "units";
  }
  /** Client-side checks for usability only. The server enforces every rule again. */
  checkoutError() {
    if (!this.transfer)
      return "Transfer not loaded.";
    const requested = Object.entries(this.checkoutQty).filter(([, q]) => q !== null && q !== void 0 && String(q) !== "");
    if (requested.length === 0)
      return "Enter a quantity to dispatch.";
    for (const [id, q] of requested) {
      const line = this.transfer.lines.find((l) => Number(l.id) === Number(id));
      if (!line)
        return "A line is no longer on this transfer.";
      const n = Number(q);
      if (!Number.isInteger(n) || n <= 0)
        return `Dispatch quantity for ${this.lineLabel(line.id)} must be a whole number above zero.`;
      const remaining = (line.approved_qty ?? 0) - line.dispatched;
      if (n > remaining)
        return `Dispatch quantity for ${this.lineLabel(line.id)} exceeds the approved quantity remaining (${remaining} ${line.unit_of_measure}).`;
    }
    return null;
  }
  checkoutPayload() {
    return Object.entries(this.checkoutQty).filter(([, q]) => Number(q) > 0).map(([id, q]) => ({ line_id: Number(id), quantity: Number(q) }));
  }
  checkinError() {
    const lines = this.checkinPayload();
    if (lines.length === 0)
      return "Enter accepted or quarantined quantities.";
    for (const l of lines) {
      const line = this.outstandingLines.find((x) => x.id === l.line_id);
      if (!line)
        return "A line is no longer in transit.";
      if (!Number.isInteger(l.accepted_qty) || !Number.isInteger(l.quarantined_qty) || l.accepted_qty < 0 || l.quarantined_qty < 0) {
        return `Quantities for ${this.lineLabel(line.id)} must be whole numbers.`;
      }
      if (l.accepted_qty + l.quarantined_qty > line.outstanding) {
        return `Accepted plus quarantined for ${this.lineLabel(line.id)} exceeds the outstanding in-transit quantity (${line.outstanding} ${line.unit_of_measure}).`;
      }
    }
    if (lines.some((l) => l.quarantined_qty > 0) && !this.quarantineLocationId) {
      return "Choose a quarantine location for damaged or rejected goods.";
    }
    return null;
  }
  checkinPayload() {
    return this.outstandingLines.map((l) => ({
      line_id: l.id,
      accepted_qty: Number(this.checkinAccepted[l.id] || 0),
      quarantined_qty: Number(this.checkinQuarantined[l.id] || 0)
    })).filter((l) => l.accepted_qty + l.quarantined_qty > 0);
  }
  reverseError() {
    if (!this.reverseLine || !this.reverseQty || !this.reverseReason.trim())
      return "Choose a line, a quantity and a reason.";
    const line = this.outstandingLines.find((l) => l.id === Number(this.reverseLine));
    if (!line)
      return "Choose a line that still has goods in transit.";
    const n = Number(this.reverseQty);
    if (!Number.isInteger(n) || n <= 0)
      return "The reversal quantity must be a whole number above zero.";
    if (n > line.outstanding)
      return `Reversal exceeds the outstanding in-transit quantity (${line.outstanding} ${line.unit_of_measure}).`;
    return null;
  }
  backToRegister() {
    this.router.navigate(["/master/stock-transfer"], { queryParams: { projectId: this.transfer?.project_id } });
  }
  /** Plain actions: refresh from the server response on success; keep the screen state on failure. */
  runAction(call, success) {
    if (this.busy)
      return;
    this.busy = true;
    this.subs.add(call().subscribe({
      next: (res) => {
        this.busy = false;
        this.toastr.success(success);
        if (res?.data)
          this.applyTransfer(res.data);
        this.reload();
      },
      error: (err) => {
        this.busy = false;
        this.toastr.error(err?.error?.message || "The action could not be completed.");
      }
    }));
  }
  /** Keyed actions: the idempotency key is replaced only after the server confirms success. */
  runKeyed(call, success, onSuccess) {
    if (this.busy)
      return;
    this.busy = true;
    this.subs.add(call().subscribe({
      next: (res) => {
        this.busy = false;
        onSuccess();
        if (res?.already_processed)
          this.toastr.info("This request was already processed; nothing changed.");
        else
          this.toastr.success(success);
        if (res?.data)
          this.applyTransfer(res.data);
        this.reload();
      },
      error: (err) => {
        this.busy = false;
        this.toastr.error(err?.error?.message || "The action could not be completed. You can retry safely.");
      }
    }));
  }
  /** Shows a validation hint. Returns void so callers can use `return this.warn(...)` in void methods. */
  warn(message) {
    this.toastr.warning(message);
  }
  newKey() {
    return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `k-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
  static \u0275fac = function StockTransferDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferDetail)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(StockTransferService), \u0275\u0275directiveInject(InventoryService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockTransferDetail, selectors: [["app-stock-transfer-detail"]], standalone: false, decls: 6, vars: 5, consts: [["terminalState", ""], ["nothingOutstanding", ""], ["noDisc", ""], [1, "st-page"], ["active", "detail", "backTo", "register", "backLabel", "Back to Stock Transfers", 3, "projectId"], ["class", "st-loading", 4, "ngIf"], ["class", "st-error", "role", "alert", 4, "ngIf"], [4, "ngIf"], ["class", "st-modal-backdrop", 3, "click", 4, "ngIf"], [1, "st-loading"], ["role", "alert", 1, "st-error"], [1, "st-header"], [1, "st-sub"], [1, "st-status"], ["class", "st-sub", 4, "ngIf"], [1, "st-summary"], [1, "st-kpi", "k-approved"], [1, "material-symbols-outlined"], [1, "st-kpi", "k-dispatched"], [1, "st-kpi", "k-transit"], ["aria-label", "Transfer progress", 1, "st-card", "st-flow"], ["class", "st-steps", 4, "ngIf", "ngIfElse"], [1, "st-card"], [1, "st-table"], [1, "num"], [4, "ngFor", "ngForOf"], ["class", "st-card", 4, "ngIf"], [1, "st-steps"], [3, "done", "current", 4, "ngFor", "ngForOf"], [1, "dot"], [1, "lbl"], [1, "st-terminal"], ["class", "st-bar", 4, "ngIf"], [1, "st-bar"], ["class", "st-grid", 4, "ngFor", "ngForOf"], ["type", "text", "maxlength", "500", "name", "apprReason", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "500", "name", "overrideReason", 3, "ngModelChange", "ngModel"], [1, "st-actions"], ["type", "button", 1, "st-btn", "primary", 3, "click", "disabled"], ["type", "text", "maxlength", "500", "name", "rejReason", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "st-btn", "danger", 3, "click", "disabled"], [1, "st-grid"], ["type", "number", "min", "0", "step", "1", 3, "ngModelChange", "ngModel", "name"], ["class", "st-actions", 4, "ngIf"], ["type", "text", "maxlength", "500", "name", "cancelReason", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "200", "name", "dispatchRef", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "1", "aria-label", "Dispatch quantity", 3, "ngModelChange", "ngModel", "name", "disabled"], ["class", "st-table", 4, "ngIf", "ngIfElse"], ["name", "quarantine", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", "disabled", 4, "ngFor", "ngForOf"], ["type", "text", "maxlength", "200", "name", "receiptRef", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "1", "aria-label", "Accepted quantity", 3, "ngModelChange", "ngModel", "name"], ["type", "number", "min", "0", "step", "1", "aria-label", "Quarantined quantity", 3, "ngModelChange", "ngModel", "name"], [3, "ngValue", "disabled"], ["class", "st-grid", 4, "ngIf"], ["type", "button", "class", "st-btn danger", 3, "disabled", "click", 4, "ngIf"], ["name", "shortLine", 3, "ngModelChange", "ngModel"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["type", "number", "min", "1", "step", "1", "name", "shortQty", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "500", "name", "shortReason", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "st-btn", 3, "click", "disabled"], ["name", "revLine", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "step", "1", "name", "revQty", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "500", "name", "revReason", 3, "ngModelChange", "ngModel"], [1, "st-timeline"], ["class", "st-table", 4, "ngIf"], [1, "st-modal-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "st-dialog-title", 1, "st-modal", 3, "click"], ["id", "st-dialog-title"], [1, "st-summary-list"], [1, "st-modal-actions"], ["type", "button", 1, "st-btn", 3, "click"], ["type", "text", "maxlength", "500", "name", "dialogReason", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "500", "name", "dialogOverride", 3, "ngModelChange", "ngModel"]], template: function StockTransferDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 3);
      \u0275\u0275element(1, "app-stock-transfer-nav", 4);
      \u0275\u0275template(2, StockTransferDetail_p_2_Template, 2, 0, "p", 5)(3, StockTransferDetail_p_3_Template, 2, 1, "p", 6)(4, StockTransferDetail_ng_container_4_Template, 72, 21, "ng-container", 7)(5, StockTransferDetail_div_5_Template, 14, 11, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("projectId", (ctx.transfer == null ? null : ctx.transfer.project_id) ?? null);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loadError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.transfer && !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.dialog);
    }
  }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, NgModel, StockTransferNav, TitleCasePipe, DatePipe], styles: ['\n.st-page[_ngcontent-%COMP%] {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub[_ngcontent-%COMP%] {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link[_ngcontent-%COMP%] {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary[_ngcontent-%COMP%] {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger[_ngcontent-%COMP%] {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.st-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.st-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.st-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed][_ngcontent-%COMP%] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit][_ngcontent-%COMP%], \n.st-status[data-status=partially_received][_ngcontent-%COMP%] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required][_ngcontent-%COMP%], \n.st-status[data-status=rejected][_ngcontent-%COMP%], \n.st-status[data-status=cancelled][_ngcontent-%COMP%] {\n  background: #ffebee;\n}\n.st-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.st-summary[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.st-pager[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.st-empty[_ngcontent-%COMP%], \n.st-loading[_ngcontent-%COMP%] {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.st-timeline[_ngcontent-%COMP%] {\n  padding-left: 18px;\n}\n.st-timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n}\n.st-overdue[_ngcontent-%COMP%] {\n  background: #fff8e1;\n}\n.st-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines[_ngcontent-%COMP%] {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .st-summary[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.st-summary-list[_ngcontent-%COMP%] {\n  padding-left: 18px;\n  margin: 8px 0;\n}\n.st-status[_ngcontent-%COMP%] {\n  text-transform: capitalize;\n  font-weight: 600;\n  padding: 3px 10px;\n}\n.st-status[data-status=draft][_ngcontent-%COMP%] {\n  background: #eceff1;\n  color: #455a64;\n}\n.st-status[data-status=submitted][_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.st-status[data-status=approved][_ngcontent-%COMP%] {\n  background: #e8eaf6;\n  color: #283593;\n}\n.st-status[data-status=in_transit][_ngcontent-%COMP%], \n.st-status[data-status=partially_received][_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #0d47a1;\n}\n.st-status[data-status=completed][_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #1b5e20;\n}\n.st-status[data-status=reconciliation_required][_ngcontent-%COMP%], \n.st-status[data-status=rejected][_ngcontent-%COMP%], \n.st-status[data-status=cancelled][_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #b71c1c;\n}\n.st-summary[_ngcontent-%COMP%] {\n  gap: 12px;\n}\n.st-kpi[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  column-gap: 10px;\n  align-items: center;\n  min-width: 150px;\n  padding: 10px 14px;\n  border-radius: 12px;\n  border: 1px solid #e0e4e8;\n  background: #fff;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);\n}\n.st-kpi[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  grid-row: span 2;\n  font-size: 26px;\n  padding: 8px;\n  border-radius: 10px;\n}\n.st-kpi[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  font-size: 0.75rem;\n  color: #5b6470;\n  align-self: end;\n}\n.st-kpi[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  align-self: start;\n}\n.st-kpi.k-approved[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  background: #e8eaf6;\n  color: #283593;\n}\n.st-kpi.k-dispatched[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #0d47a1;\n}\n.st-kpi.k-transit[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.st-flow[_ngcontent-%COMP%] {\n  padding: 18px 16px 12px;\n}\n.st-steps[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n  margin: 0;\n  padding: 0;\n}\n.st-steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  text-align: center;\n}\n.st-steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(:first-child)::before {\n  content: "";\n  position: absolute;\n  top: 17px;\n  right: 50%;\n  width: 100%;\n  height: 3px;\n  background: #dfe3e8;\n  z-index: 0;\n}\n.st-steps[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]:not(:first-child)::before, \n.st-steps[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%]:not(:first-child)::before {\n  background: #1565c0;\n}\n.st-steps[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  z-index: 1;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  background: #eceff1;\n  color: #78909c;\n  border: 2px solid #dfe3e8;\n  transition: all 0.25s;\n}\n.st-steps[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.st-steps[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #1565c0;\n  border-color: #1565c0;\n  color: #fff;\n}\n.st-steps[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  background: #fff;\n  border-color: #1565c0;\n  color: #1565c0;\n  box-shadow: 0 0 0 5px rgba(21, 101, 192, 0.15);\n}\n.st-steps[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 0.78rem;\n  color: #78909c;\n}\n.st-steps[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%], \n.st-steps[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  color: #1f2933;\n  font-weight: 600;\n}\n.st-terminal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  padding: 10px 12px;\n  border-radius: 10px;\n  background: #ffebee;\n  color: #b71c1c;\n  font-weight: 600;\n}\n.st-bar[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  height: 5px;\n  border-radius: 3px;\n  background: #e6eaee;\n  overflow: hidden;\n  max-width: 180px;\n}\n.st-bar[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #42a5f5,\n      #1565c0);\n  border-radius: 3px;\n  transition: width 0.4s;\n}\n.st-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background 0.15s;\n}\n.st-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f5f9ff;\n}\n@media (max-width: 600px) {\n  .st-steps[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n    font-size: 0.66rem;\n  }\n  .st-kpi[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=stock-transfer-detail.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferDetail, [{
    type: Component,
    args: [{ selector: "app-stock-transfer-detail", standalone: false, template: `<div class="st-page">
  <app-stock-transfer-nav active="detail" [projectId]="transfer?.project_id ?? null" backTo="register" backLabel="Back to Stock Transfers"></app-stock-transfer-nav>

  <p class="st-loading" *ngIf="loading">Loading transfer\u2026</p>
  <p class="st-error" *ngIf="loadError" role="alert">{{ loadError }}</p>

  <ng-container *ngIf="transfer && !loading">
    <header class="st-header">
      <div>
        <h1>{{ transfer.transfer_number }}</h1>
        <p class="st-sub">
          {{ locationName(transfer.source_location_id) }} \u2192 {{ locationName(transfer.destination_location_id) }}
          \xB7 <span class="st-status" [attr.data-status]="transfer.status">{{ transfer.status | titlecase }}</span>
        </p>
        <p class="st-sub" *ngIf="transfer.reason">Reason: {{ transfer.reason }}</p>
      </div>
      <div class="st-summary">
        <div class="st-kpi k-approved"><span class="material-symbols-outlined">fact_check</span><span>Approved</span><strong>{{ transfer.totals.approved }}</strong></div>
        <div class="st-kpi k-dispatched"><span class="material-symbols-outlined">local_shipping</span><span>Dispatched</span><strong>{{ transfer.totals.dispatched }}</strong></div>
        <div class="st-kpi k-transit"><span class="material-symbols-outlined">hourglass_top</span><span>Outstanding in transit</span><strong>{{ transfer.totals.outstanding }}</strong></div>
      </div>
    </header>

    <!-- Lifecycle -->
    <section class="st-card st-flow" aria-label="Transfer progress">
      <ol class="st-steps" *ngIf="stepIndex >= 0; else terminalState">
        <li *ngFor="let s of steps; let i = index" [class.done]="i < stepIndex" [class.current]="i === stepIndex" [attr.aria-current]="i === stepIndex ? 'step' : null">
          <span class="dot"><span class="material-symbols-outlined">{{ i < stepIndex ? 'check' : s.icon }}</span></span>
          <span class="lbl">{{ s.label }}</span>
        </li>
      </ol>
      <ng-template #terminalState>
        <p class="st-terminal" [attr.data-status]="transfer.status">
          <span class="material-symbols-outlined">{{ transfer.status === 'rejected' ? 'cancel' : 'block' }}</span>
          This transfer was {{ transfer.status }}. No further stock movement is possible.
        </p>
      </ng-template>
    </section>

    <section class="st-card">
      <h2>Lines</h2>
      <table class="st-table">
        <thead>
          <tr>
            <th>Material</th>
            <th class="num">Requested</th>
            <th class="num">Approved</th>
            <th class="num">Dispatched</th>
            <th class="num">Accepted</th>
            <th class="num">Quarantined</th>
            <th class="num">Reversed</th>
            <th class="num">Written off</th>
            <th class="num">Outstanding</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let l of transfer.lines">
            <td>
              <strong>{{ materialName(l.material_id) }}</strong> <span class="st-sub">({{ l.unit_of_measure }})</span>
              <div class="st-bar" *ngIf="l.dispatched > 0" [attr.title]="dispatchPercent(l) + '% dispatched'"><div [style.width.%]="dispatchPercent(l)"></div></div>
            </td>
            <td class="num">{{ l.requested_qty }}</td>
            <td class="num">{{ l.approved_qty ?? '\u2014' }}</td>
            <td class="num">{{ l.dispatched }}</td>
            <td class="num">{{ l.received_accepted }}</td>
            <td class="num">{{ l.received_quarantined }}</td>
            <td class="num">{{ l.reversed }}</td>
            <td class="num">{{ l.shortage }}</td>
            <td class="num"><strong>{{ l.outstanding }}</strong></td>
          </tr>
        </tbody>
      </table>
      <p class="st-sub">Quantities are derived from the stock ledger. Rejected or damaged goods are counted as quarantined, not lost.</p>
    </section>

    <!-- Approval -->
    <section class="st-card" *ngIf="canApprove">
      <h2>Approval</h2>
      <p class="st-sub">You cannot approve a transfer you requested. Approved quantities cannot exceed requested quantities.</p>
      <div class="st-grid" *ngFor="let l of transfer.lines">
        <label>Line #{{ l.material_id }} approved quantity
          <input type="number" min="0" step="1" [(ngModel)]="approvalDraft[l.id]" [name]="'appr' + l.id" />
        </label>
      </div>
      <label>Decision note <input type="text" maxlength="500" [(ngModel)]="approvalReason" name="apprReason" /></label>
      <label>Super Admin override reason <span class="st-sub">(only when approving a request you created; at least 10 characters; recorded in the audit history)</span>
        <input type="text" maxlength="500" [(ngModel)]="overrideReason" name="overrideReason" />
      </label>
      <div class="st-actions">
        <button type="button" class="st-btn primary" (click)="approve()" [disabled]="busy">Approve</button>
      </div>
      <label>Rejection reason <input type="text" maxlength="500" [(ngModel)]="rejectReason" name="rejReason" /></label>
      <div class="st-actions">
        <button type="button" class="st-btn danger" (click)="reject()" [disabled]="busy">Reject</button>
      </div>
    </section>

    <!-- Draft / cancel -->
    <section class="st-card" *ngIf="canSubmit || canCancel">
      <h2>Request</h2>
      <div class="st-actions" *ngIf="canSubmit">
        <button type="button" class="st-btn primary" (click)="submit()" [disabled]="busy">Submit for approval</button>
      </div>
      <div *ngIf="canCancel">
        <label>Cancellation reason <input type="text" maxlength="500" [(ngModel)]="cancelReason" name="cancelReason" /></label>
        <div class="st-actions">
          <button type="button" class="st-btn danger" (click)="cancel()" [disabled]="busy">Cancel transfer</button>
        </div>
      </div>
    </section>

    <!-- Source check-out -->
    <section class="st-card" *ngIf="canCheckOut">
      <h2>Source check-out</h2>
      <p class="st-sub">Enter the quantity physically picked and dispatched for each line. Source stock decreases once; the goods stay traceable in transit.</p>
      <table class="st-table">
        <thead><tr><th>Line</th><th class="num">Remaining to dispatch</th><th>Dispatch quantity</th></tr></thead>
        <tbody>
          <tr *ngFor="let l of transfer.lines">
            <td>#{{ l.material_id }}</td>
            <td class="num">{{ (l.approved_qty ?? 0) - l.dispatched }}</td>
            <td><input type="number" min="0" step="1" [(ngModel)]="checkoutQty[l.id]" [name]="'out' + l.id" [disabled]="(l.approved_qty ?? 0) - l.dispatched <= 0" aria-label="Dispatch quantity" /></td>
          </tr>
        </tbody>
      </table>
      <label>Dispatch / challan reference <input type="text" maxlength="200" [(ngModel)]="dispatchRef" name="dispatchRef" /></label>
      <div class="st-actions">
        <button type="button" class="st-btn primary" (click)="checkOut()" [disabled]="busy">Check out stock</button>
      </div>
    </section>

    <!-- Destination check-in -->
    <section class="st-card" *ngIf="canCheckIn">
      <h2>Destination check-in</h2>
      <p class="st-sub">Accepted goods go to the destination. Damaged or rejected goods go to quarantine. Anything not received stays in transit.</p>
      <table class="st-table" *ngIf="outstandingLines.length; else nothingOutstanding">
        <thead><tr><th>Line</th><th class="num">Outstanding</th><th>Accepted</th><th>Quarantined</th></tr></thead>
        <tbody>
          <tr *ngFor="let l of outstandingLines">
            <td>#{{ l.material_id }}</td>
            <td class="num">{{ l.outstanding }}</td>
            <td><input type="number" min="0" step="1" [(ngModel)]="checkinAccepted[l.id]" [name]="'acc' + l.id" aria-label="Accepted quantity" /></td>
            <td><input type="number" min="0" step="1" [(ngModel)]="checkinQuarantined[l.id]" [name]="'qua' + l.id" aria-label="Quarantined quantity" /></td>
          </tr>
        </tbody>
      </table>
      <ng-template #nothingOutstanding><p class="st-sub">Nothing is outstanding in transit.</p></ng-template>
      <div class="st-grid">
        <label>Quarantine location
          <select [(ngModel)]="quarantineLocationId" name="quarantine">
            <option [ngValue]="null">Not needed</option>
            <option *ngFor="let loc of locations" [ngValue]="loc.id" [disabled]="loc.location_type !== 'quarantine'">
              {{ loc.name }} ({{ loc.code }}) \u2014 {{ loc.location_type }}
            </option>
          </select>
        </label>
        <label>Receipt reference <input type="text" maxlength="200" [(ngModel)]="receiptRef" name="receiptRef" /></label>
      </div>
      <div class="st-actions">
        <button type="button" class="st-btn primary" (click)="checkIn()" [disabled]="busy || !outstandingLines.length">Check in</button>
      </div>
    </section>

    <!-- Discrepancies -->
    <section class="st-card" *ngIf="transfer.status !== 'draft' && transfer.status !== 'cancelled' && transfer.status !== 'rejected'">
      <h2>Shortages and discrepancies</h2>
      <table class="st-table" *ngIf="transfer.discrepancies.length; else noDisc">
        <thead><tr><th>Line</th><th class="num">Quantity</th><th>Reason</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let d of transfer.discrepancies">
            <td>#{{ d.transfer_line_id }}</td>
            <td class="num">{{ d.quantity }}</td>
            <td>{{ d.reason }}</td>
            <td>{{ d.status === 'open' ? 'Open' : 'Written off' }}</td>
            <td><button type="button" class="st-btn danger" *ngIf="d.status === 'open'" (click)="writeOff(d)" [disabled]="busy">Authorized write-off</button></td>
          </tr>
        </tbody>
      </table>
      <ng-template #noDisc><p class="st-sub">No shortages declared.</p></ng-template>

      <div class="st-grid" *ngIf="canCheckIn">
        <label>Line
          <select [(ngModel)]="shortageLine" name="shortLine">
            <option [ngValue]="null">Choose\u2026</option>
            <option *ngFor="let l of outstandingLines" [ngValue]="l.id">#{{ l.material_id }} (outstanding {{ l.outstanding }})</option>
          </select>
        </label>
        <label>Quantity <input type="number" min="1" step="1" [(ngModel)]="shortageQty" name="shortQty" /></label>
        <label>Reason <input type="text" maxlength="500" [(ngModel)]="shortageReason" name="shortReason" /></label>
        <button type="button" class="st-btn" (click)="declareShortage()" [disabled]="busy">Declare shortage</button>
      </div>
    </section>

    <!-- Reversal -->
    <section class="st-card" *ngIf="canCheckIn">
      <h2>Authorized dispatch reversal</h2>
      <p class="st-sub">Returns goods that were dispatched but never received back to the source location.</p>
      <div class="st-grid">
        <label>Line
          <select [(ngModel)]="reverseLine" name="revLine">
            <option [ngValue]="null">Choose\u2026</option>
            <option *ngFor="let l of outstandingLines" [ngValue]="l.id">#{{ l.material_id }} (outstanding {{ l.outstanding }})</option>
          </select>
        </label>
        <label>Quantity <input type="number" min="1" step="1" [(ngModel)]="reverseQty" name="revQty" /></label>
        <label>Reason <input type="text" maxlength="500" [(ngModel)]="reverseReason" name="revReason" /></label>
      </div>
      <div class="st-actions">
        <button type="button" class="st-btn danger" (click)="reverseDispatch()" [disabled]="busy">Reverse dispatch</button>
      </div>
    </section>

    <!-- History -->
    <section class="st-card" *ngIf="history">
      <h2>History</h2>
      <ol class="st-timeline">
        <li *ngFor="let e of history.events">
          <strong>{{ e.event_type | titlecase }}</strong>
          <span class="st-sub">{{ e.createdAt | date: 'dd MMM yyyy, HH:mm' }} \xB7 user #{{ e.actor_id ?? '\u2014' }}</span>
        </li>
      </ol>
      <h3>Stock movements</h3>
      <table class="st-table" *ngIf="history.movements.length">
        <thead><tr><th>When</th><th>Type</th><th class="num">Quantity</th><th>Location</th></tr></thead>
        <tbody>
          <tr *ngFor="let m of history.movements">
            <td>{{ m.createdAt | date: 'dd MMM yyyy, HH:mm' }}</td>
            <td>{{ m.movement_type }}</td>
            <td class="num">{{ m.quantity }}</td>
            <td>{{ m.location_id ? locationName(m.location_id) : 'In transit' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </ng-container>

  <!-- In-app confirmation dialog (replaces native confirm() and prompt()). -->
  <div class="st-modal-backdrop" *ngIf="dialog" (click)="closeDialog()">
    <div class="st-modal" role="dialog" aria-modal="true" aria-labelledby="st-dialog-title" (click)="$event.stopPropagation()">
      <h2 id="st-dialog-title">{{ dialog.title }}</h2>
      <ul class="st-summary-list">
        <li *ngFor="let s of dialog.summary">{{ s }}</li>
      </ul>
      <label *ngIf="dialog.reasonLabel">
        {{ dialog.reasonLabel }}{{ dialog.reasonRequired ? ' (required)' : '' }}
        <input type="text" maxlength="500" [(ngModel)]="dialog.reason" name="dialogReason" [attr.aria-invalid]="!!dialog.error" />
      </label>
      <label *ngIf="dialog.overrideLabel">
        {{ dialog.overrideLabel }}
        <input type="text" maxlength="500" [(ngModel)]="dialog.overrideReason" name="dialogOverride" />
      </label>
      <p class="st-error" *ngIf="dialog.error" role="alert">{{ dialog.error }}</p>
      <div class="st-modal-actions">
        <button type="button" class="st-btn" (click)="closeDialog()">Back</button>
        <button type="button" class="st-btn" [class.danger]="dialog.danger" [class.primary]="!dialog.danger" (click)="confirmDialog()" [disabled]="busy">{{ dialog.confirmLabel }}</button>
      </div>
    </div>
  </div>
</div>
`, styles: ['/* src/app/modules/stock-transfer/stock-transfer-detail/stock-transfer-detail.scss */\n.st-page {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header h1 {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters label,\n.st-grid label {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap {\n  overflow-x: auto;\n}\n.st-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table th,\n.st-table td {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table .num {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit],\n.st-status[data-status=partially_received] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required],\n.st-status[data-status=rejected],\n.st-status[data-status=cancelled] {\n  background: #ffebee;\n}\n.st-card {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card h2 {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary {\n  display: flex;\n  gap: 16px;\n}\n.st-summary div {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary span {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary strong {\n  font-size: 1.2rem;\n}\n.st-pager {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error {\n  color: #c62828;\n}\n.st-empty,\n.st-loading {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb {\n  margin-bottom: 8px;\n}\n.st-timeline {\n  padding-left: 18px;\n}\n.st-timeline li {\n  margin-bottom: 6px;\n}\n.st-overdue {\n  background: #fff8e1;\n}\n.st-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal label {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line select {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page {\n    padding: 12px;\n  }\n  .st-summary {\n    flex-wrap: wrap;\n  }\n}\n.st-summary-list {\n  padding-left: 18px;\n  margin: 8px 0;\n}\n.st-status {\n  text-transform: capitalize;\n  font-weight: 600;\n  padding: 3px 10px;\n}\n.st-status[data-status=draft] {\n  background: #eceff1;\n  color: #455a64;\n}\n.st-status[data-status=submitted] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.st-status[data-status=approved] {\n  background: #e8eaf6;\n  color: #283593;\n}\n.st-status[data-status=in_transit],\n.st-status[data-status=partially_received] {\n  background: #e3f2fd;\n  color: #0d47a1;\n}\n.st-status[data-status=completed] {\n  background: #e8f5e9;\n  color: #1b5e20;\n}\n.st-status[data-status=reconciliation_required],\n.st-status[data-status=rejected],\n.st-status[data-status=cancelled] {\n  background: #ffebee;\n  color: #b71c1c;\n}\n.st-summary {\n  gap: 12px;\n}\n.st-kpi {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  column-gap: 10px;\n  align-items: center;\n  min-width: 150px;\n  padding: 10px 14px;\n  border-radius: 12px;\n  border: 1px solid #e0e4e8;\n  background: #fff;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);\n}\n.st-kpi .material-symbols-outlined {\n  grid-row: span 2;\n  font-size: 26px;\n  padding: 8px;\n  border-radius: 10px;\n}\n.st-kpi span:nth-child(2) {\n  font-size: 0.75rem;\n  color: #5b6470;\n  align-self: end;\n}\n.st-kpi strong {\n  font-size: 1.35rem;\n  align-self: start;\n}\n.st-kpi.k-approved .material-symbols-outlined {\n  background: #e8eaf6;\n  color: #283593;\n}\n.st-kpi.k-dispatched .material-symbols-outlined {\n  background: #e3f2fd;\n  color: #0d47a1;\n}\n.st-kpi.k-transit .material-symbols-outlined {\n  background: #fff3e0;\n  color: #e65100;\n}\n.st-flow {\n  padding: 18px 16px 12px;\n}\n.st-steps {\n  list-style: none;\n  display: flex;\n  margin: 0;\n  padding: 0;\n}\n.st-steps li {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  text-align: center;\n}\n.st-steps li:not(:first-child)::before {\n  content: "";\n  position: absolute;\n  top: 17px;\n  right: 50%;\n  width: 100%;\n  height: 3px;\n  background: #dfe3e8;\n  z-index: 0;\n}\n.st-steps li.done:not(:first-child)::before,\n.st-steps li.current:not(:first-child)::before {\n  background: #1565c0;\n}\n.st-steps .dot {\n  z-index: 1;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  background: #eceff1;\n  color: #78909c;\n  border: 2px solid #dfe3e8;\n  transition: all 0.25s;\n}\n.st-steps .dot .material-symbols-outlined {\n  font-size: 20px;\n}\n.st-steps li.done .dot {\n  background: #1565c0;\n  border-color: #1565c0;\n  color: #fff;\n}\n.st-steps li.current .dot {\n  background: #fff;\n  border-color: #1565c0;\n  color: #1565c0;\n  box-shadow: 0 0 0 5px rgba(21, 101, 192, 0.15);\n}\n.st-steps .lbl {\n  margin-top: 6px;\n  font-size: 0.78rem;\n  color: #78909c;\n}\n.st-steps li.current .lbl,\n.st-steps li.done .lbl {\n  color: #1f2933;\n  font-weight: 600;\n}\n.st-terminal {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  padding: 10px 12px;\n  border-radius: 10px;\n  background: #ffebee;\n  color: #b71c1c;\n  font-weight: 600;\n}\n.st-bar {\n  margin-top: 6px;\n  height: 5px;\n  border-radius: 3px;\n  background: #e6eaee;\n  overflow: hidden;\n  max-width: 180px;\n}\n.st-bar div {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #42a5f5,\n      #1565c0);\n  border-radius: 3px;\n  transition: width 0.4s;\n}\n.st-table tbody tr {\n  transition: background 0.15s;\n}\n.st-table tbody tr:hover {\n  background: #f5f9ff;\n}\n@media (max-width: 600px) {\n  .st-steps .lbl {\n    font-size: 0.66rem;\n  }\n  .st-kpi {\n    min-width: 0;\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=stock-transfer-detail.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: StockTransferService }, { type: InventoryService }, { type: ToastrService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockTransferDetail, { className: "StockTransferDetail", filePath: "app/modules/stock-transfer/stock-transfer-detail/stock-transfer-detail.ts", lineNumber: 43 });
})();

// src/app/modules/stock-transfer/stock-transfer-in-transit/stock-transfer-in-transit.ts
var _c02 = (a0) => ({ projectId: a0 });
var _c12 = () => ({});
function StockTransferInTransit_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function StockTransferInTransit_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.loadError);
  }
}
function StockTransferInTransit_section_10_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, " No dispatched transfer for this project has outstanding quantity. Completed and not-yet-dispatched transfers are listed under All Transfers. ");
    \u0275\u0275elementEnd();
  }
}
function StockTransferInTransit_section_10_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Select a project first to see its in-transit transfers.");
    \u0275\u0275elementEnd();
  }
}
function StockTransferInTransit_section_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 10)(1, "h2");
    \u0275\u0275text(2, "Nothing is in transit");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, StockTransferInTransit_section_10_p_3_Template, 2, 0, "p", 11)(4, StockTransferInTransit_section_10_p_4_Template, 2, 0, "p", 11);
    \u0275\u0275elementStart(5, "div", 12)(6, "a", 13);
    \u0275\u0275text(7, "View all transfers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "a", 14);
    \u0275\u0275text(9, "Back to Stock Transfers");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.projectId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.projectId);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", "/master/stock-transfer")("queryParams", ctx_r0.projectId ? \u0275\u0275pureFunction1(6, _c02, ctx_r0.projectId) : \u0275\u0275pureFunction0(8, _c12));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", "/master/stock-transfer")("queryParams", ctx_r0.projectId ? \u0275\u0275pureFunction1(9, _c02, ctx_r0.projectId) : \u0275\u0275pureFunction0(11, _c12));
  }
}
function StockTransferInTransit_table_11_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 18);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 16);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 16)(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td")(18, "button", 19);
    \u0275\u0275listener("click", function StockTransferInTransit_table_11_tr_17_Template_button_click_18_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.open(t_r3));
    });
    \u0275\u0275text(19, "Open");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275classProp("st-overdue", t_r3.status === "reconciliation_required");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.transfer_number);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-status", t_r3.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 9, t_r3.status));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r3.totals.approved);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.totals.dispatched);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r3.totals.outstanding);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.first_dispatched_at ? \u0275\u0275pipeBind2(16, 11, t_r3.first_dispatched_at, "dd MMM yyyy, HH:mm") : "\u2014");
  }
}
function StockTransferInTransit_table_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 15)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Transfer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 16);
    \u0275\u0275text(8, "Approved");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 16);
    \u0275\u0275text(10, "Dispatched");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 16);
    \u0275\u0275text(12, "Outstanding");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Dispatched at");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275template(17, StockTransferInTransit_table_11_tr_17_Template, 20, 14, "tr", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r0.rows);
  }
}
var StockTransferInTransit = class _StockTransferInTransit {
  route;
  router;
  service;
  toastr;
  context;
  projectId = null;
  rows = [];
  loading = false;
  loadError = null;
  subs = new Subscription();
  constructor(route, router, service, toastr, context) {
    this.route = route;
    this.router = router;
    this.service = service;
    this.toastr = toastr;
    this.context = context;
  }
  ngOnInit() {
    this.subs.add(this.route.queryParams.subscribe((params) => {
      const fromUrl = params["projectId"] ? Number(params["projectId"]) : null;
      if (!fromUrl && this.context.read()) {
        this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: this.context.read() }, queryParamsHandling: "merge", replaceUrl: true });
        return;
      }
      this.context.write(fromUrl);
      this.projectId = fromUrl;
      this.load();
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  load() {
    this.loading = true;
    this.loadError = null;
    this.subs.add(this.service.listInTransit(this.projectId ?? void 0).subscribe({
      next: (res) => {
        this.rows = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.loadError = err?.error?.message || "Could not load the in-transit board.";
        this.toastr.error(this.loadError ?? "Could not load the in-transit board.");
      }
    }));
  }
  open(t) {
    this.router.navigate(["/master/stock-transfer", t.id], { queryParams: { projectId: t.project_id } });
  }
  static \u0275fac = function StockTransferInTransit_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferInTransit)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(StockTransferService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(StockTransferContext));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockTransferInTransit, selectors: [["app-stock-transfer-in-transit"]], standalone: false, decls: 12, vars: 5, consts: [[1, "st-page"], ["active", "in-transit", "backTo", "register", "backLabel", "Back to Stock Transfers", 3, "projectId"], [1, "st-header"], [1, "st-sub"], ["class", "st-loading", 4, "ngIf"], ["class", "st-error", "role", "alert", 4, "ngIf"], ["class", "st-card st-empty-state", 4, "ngIf"], ["class", "st-table", 4, "ngIf"], [1, "st-loading"], ["role", "alert", 1, "st-error"], [1, "st-card", "st-empty-state"], ["class", "st-sub", 4, "ngIf"], [1, "st-actions"], [1, "st-btn", "primary", 3, "routerLink", "queryParams"], [1, "st-btn", 3, "routerLink", "queryParams"], [1, "st-table"], [1, "num"], [3, "st-overdue", 4, "ngFor", "ngForOf"], [1, "st-status"], ["type", "button", 1, "st-btn", 3, "click"]], template: function StockTransferInTransit_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-stock-transfer-nav", 1);
      \u0275\u0275elementStart(2, "header", 2)(3, "div")(4, "h1");
      \u0275\u0275text(5, "In-transit Board");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7, "Dispatched transfers with quantities not yet accepted, quarantined, reversed or written off.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(8, StockTransferInTransit_p_8_Template, 2, 0, "p", 4)(9, StockTransferInTransit_p_9_Template, 2, 1, "p", 5)(10, StockTransferInTransit_section_10_Template, 10, 12, "section", 6)(11, StockTransferInTransit_table_11_Template, 18, 1, "table", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("projectId", ctx.projectId);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loadError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.loadError && !ctx.rows.length);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.rows.length);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, StockTransferNav, TitleCasePipe, DatePipe], styles: ["\n.st-page[_ngcontent-%COMP%] {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub[_ngcontent-%COMP%] {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link[_ngcontent-%COMP%] {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary[_ngcontent-%COMP%] {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger[_ngcontent-%COMP%] {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.st-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.st-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.st-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed][_ngcontent-%COMP%] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit][_ngcontent-%COMP%], \n.st-status[data-status=partially_received][_ngcontent-%COMP%] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required][_ngcontent-%COMP%], \n.st-status[data-status=rejected][_ngcontent-%COMP%], \n.st-status[data-status=cancelled][_ngcontent-%COMP%] {\n  background: #ffebee;\n}\n.st-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.st-summary[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.st-pager[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.st-empty[_ngcontent-%COMP%], \n.st-loading[_ngcontent-%COMP%] {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.st-timeline[_ngcontent-%COMP%] {\n  padding-left: 18px;\n}\n.st-timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n}\n.st-overdue[_ngcontent-%COMP%] {\n  background: #fff8e1;\n}\n.st-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines[_ngcontent-%COMP%] {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .st-summary[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=stock-transfer-in-transit.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferInTransit, [{
    type: Component,
    args: [{ selector: "app-stock-transfer-in-transit", standalone: false, template: `<div class="st-page">
  <app-stock-transfer-nav active="in-transit" [projectId]="projectId" backTo="register" backLabel="Back to Stock Transfers"></app-stock-transfer-nav>

  <header class="st-header">
    <div>
      <h1>In-transit Board</h1>
      <p class="st-sub">Dispatched transfers with quantities not yet accepted, quarantined, reversed or written off.</p>
    </div>
  </header>

  <p class="st-loading" *ngIf="loading">Loading\u2026</p>
  <p class="st-error" *ngIf="loadError" role="alert">{{ loadError }}</p>

  <section class="st-card st-empty-state" *ngIf="!loading && !loadError && !rows.length">
    <h2>Nothing is in transit</h2>
    <p class="st-sub" *ngIf="projectId">
      No dispatched transfer for this project has outstanding quantity. Completed and not-yet-dispatched transfers are listed under All Transfers.
    </p>
    <p class="st-sub" *ngIf="!projectId">Select a project first to see its in-transit transfers.</p>
    <div class="st-actions">
      <a class="st-btn primary" [routerLink]="'/master/stock-transfer'" [queryParams]="projectId ? { projectId: projectId } : {}">View all transfers</a>
      <a class="st-btn" [routerLink]="'/master/stock-transfer'" [queryParams]="projectId ? { projectId: projectId } : {}">Back to Stock Transfers</a>
    </div>
  </section>

  <table class="st-table" *ngIf="!loading && rows.length">
    <thead>
      <tr>
        <th>Transfer</th>
        <th>Status</th>
        <th class="num">Approved</th>
        <th class="num">Dispatched</th>
        <th class="num">Outstanding</th>
        <th>Dispatched at</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let t of rows" [class.st-overdue]="t.status === 'reconciliation_required'">
        <td>{{ t.transfer_number }}</td>
        <td><span class="st-status" [attr.data-status]="t.status">{{ t.status | titlecase }}</span></td>
        <td class="num">{{ t.totals.approved }}</td>
        <td class="num">{{ t.totals.dispatched }}</td>
        <td class="num"><strong>{{ t.totals.outstanding }}</strong></td>
        <td>{{ t.first_dispatched_at ? (t.first_dispatched_at | date: 'dd MMM yyyy, HH:mm') : '\u2014' }}</td>
        <td><button type="button" class="st-btn" (click)="open(t)">Open</button></td>
      </tr>
    </tbody>
  </table>
</div>
`, styles: ["/* src/app/modules/stock-transfer/stock-transfer-in-transit/stock-transfer-in-transit.scss */\n.st-page {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header h1 {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters label,\n.st-grid label {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap {\n  overflow-x: auto;\n}\n.st-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table th,\n.st-table td {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table .num {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit],\n.st-status[data-status=partially_received] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required],\n.st-status[data-status=rejected],\n.st-status[data-status=cancelled] {\n  background: #ffebee;\n}\n.st-card {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card h2 {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary {\n  display: flex;\n  gap: 16px;\n}\n.st-summary div {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary span {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary strong {\n  font-size: 1.2rem;\n}\n.st-pager {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error {\n  color: #c62828;\n}\n.st-empty,\n.st-loading {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb {\n  margin-bottom: 8px;\n}\n.st-timeline {\n  padding-left: 18px;\n}\n.st-timeline li {\n  margin-bottom: 6px;\n}\n.st-overdue {\n  background: #fff8e1;\n}\n.st-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal label {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line select {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page {\n    padding: 12px;\n  }\n  .st-summary {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=stock-transfer-in-transit.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: StockTransferService }, { type: ToastrService }, { type: StockTransferContext }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockTransferInTransit, { className: "StockTransferInTransit", filePath: "app/modules/stock-transfer/stock-transfer-in-transit/stock-transfer-in-transit.ts", lineNumber: 15 });
})();

// src/app/modules/stock-transfer/inventory-page/inventory-page.ts
function InventoryPage_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("ngValue", p_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.name);
  }
}
function InventoryPage_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "Select a project to see its inventory.");
    \u0275\u0275elementEnd();
  }
}
function InventoryPage_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Loading inventory\u2026");
    \u0275\u0275elementEnd();
  }
}
function InventoryPage_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.loadError);
  }
}
function InventoryPage_ng_container_18_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "No project stock records exist for this project yet.");
    \u0275\u0275elementEnd();
  }
}
function InventoryPage_ng_container_18_div_5_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", loc_r4.name, " (", loc_r4.code, ")");
  }
}
function InventoryPage_ng_container_18_div_5_tr_20_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const loc_r5 = ctx.$implicit;
    const row_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r1.balanceAt(row_r6, loc_r5.id)) == null ? null : tmp_6_0.balance) ?? 0);
  }
}
function InventoryPage_ng_container_18_div_5_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, InventoryPage_ng_container_18_div_5_tr_20_td_7_Template, 2, 1, "td", 51);
    \u0275\u0275elementStart(8, "td", 52);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 52);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 52);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 52)(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "span", 54);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", row_r6.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.sku);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.unit_of_measure);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.storeLocations);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.unplaced);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.in_transit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.quarantined);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r6.counter_available);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-status", ctx_r1.reviewRequired(row_r6) ? "rejected" : "completed");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.reviewRequired(row_r6) ? "Review Required" : "Reconciled");
  }
}
function InventoryPage_ng_container_18_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "table", 50)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, InventoryPage_ng_container_18_div_5_th_8_Template, 2, 2, "th", 51);
    \u0275\u0275elementStart(9, "th", 52);
    \u0275\u0275text(10, "Unplaced");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 52);
    \u0275\u0275text(12, "In transit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 52);
    \u0275\u0275text(14, "Quarantined");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 52);
    \u0275\u0275text(16, "Ledger total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Check");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, InventoryPage_ng_container_18_div_5_tr_20_Template, 20, 10, "tr", 53);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r1.storeLocations);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.materials);
  }
}
function InventoryPage_ng_container_18_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = ctx.$implicit;
    \u0275\u0275property("ngValue", m_r7.material_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", m_r7.name, " (", m_r7.unit_of_measure, ")");
  }
}
function InventoryPage_ng_container_18_option_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", l_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", l_r8.name, " (", l_r8.code, ")");
  }
}
function InventoryPage_ng_container_18_p_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r9 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r9);
  }
}
function InventoryPage_ng_container_18_option_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", m_r10.material_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", m_r10.name, " (", m_r10.unit_of_measure, ")");
  }
}
function InventoryPage_ng_container_18_option_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r11 = ctx.$implicit;
    \u0275\u0275property("ngValue", l_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", l_r11.name, " (", l_r11.code, ")");
  }
}
function InventoryPage_ng_container_18_p_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r12 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r12);
  }
}
function InventoryPage_ng_container_18_p_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "No stock movements recorded for this project yet.");
    \u0275\u0275elementEnd();
  }
}
function InventoryPage_ng_container_18_table_112_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 52);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 7, m_r13.createdAt, "dd MMM yyyy, HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r13.movement_type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((m_r13.material == null ? null : m_r13.material.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r13.location ? m_r13.location.name + " (" + m_r13.location.code + ")" : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", m_r13.quantity, " ", m_r13.unit_of_measure);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r13.transfer_id ? "Transfer #" + m_r13.transfer_id : m_r13.reference_id || "\u2014");
  }
}
function InventoryPage_ng_container_18_table_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 50)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "When");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 52);
    \u0275\u0275text(12, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Reference");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, InventoryPage_ng_container_18_table_112_tr_16_Template, 14, 10, "tr", 53);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.movements);
  }
}
function InventoryPage_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "section", 15)(2, "h2");
    \u0275\u0275text(3, "Balances");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, InventoryPage_ng_container_18_p_4_Template, 2, 0, "p", 8)(5, InventoryPage_ng_container_18_div_5_Template, 21, 2, "div", 16);
    \u0275\u0275elementStart(6, "p", 3);
    \u0275\u0275text(7, "Ledger total = unplaced + location balances + in transit. Quarantined stock is counted in the location balance but is never issued.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 17)(9, "section", 18)(10, "h2", 19);
    \u0275\u0275text(11, "Stock in (receipt)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 3);
    \u0275\u0275text(13, "Records goods received into a store. A PO/GRN or opening-stock authorization reference is required.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 20)(15, "label", 21)(16, "span", 22);
    \u0275\u0275text(17, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 23);
    \u0275\u0275text(19, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockIn.material_id, $event) || (ctx_r1.stockIn.material_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 6);
    \u0275\u0275text(22, "Choose a material\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, InventoryPage_ng_container_18_option_23_Template, 2, 3, "option", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 20)(25, "label", 25)(26, "span", 22);
    \u0275\u0275text(27, "Receiving location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 23);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockIn.location_id, $event) || (ctx_r1.stockIn.location_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(31, "option", 6);
    \u0275\u0275text(32, "Choose a location\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, InventoryPage_ng_container_18_option_33_Template, 2, 3, "option", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 20)(35, "label", 27)(36, "span", 22);
    \u0275\u0275text(37, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 23);
    \u0275\u0275text(39, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 28)(41, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockIn.quantity, $event) || (ctx_r1.stockIn.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 30);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 20)(45, "label", 31)(46, "span", 22);
    \u0275\u0275text(47, "PO / GRN / authorization reference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 23);
    \u0275\u0275text(49, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockIn.reference, $event) || (ctx_r1.stockIn.reference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(51, InventoryPage_ng_container_18_p_51_Template, 2, 1, "p", 33);
    \u0275\u0275elementStart(52, "div", 34)(53, "button", 35);
    \u0275\u0275listener("click", function InventoryPage_ng_container_18_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitStockIn());
    });
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "section", 36)(56, "h2", 37);
    \u0275\u0275text(57, "Stock out (issue)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "p", 3);
    \u0275\u0275text(59, "Issues material from a store against a project activity. Quarantined and in-transit stock cannot be issued.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 20)(61, "label", 38)(62, "span", 22);
    \u0275\u0275text(63, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "span", 23);
    \u0275\u0275text(65, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_select_ngModelChange_66_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockOut.material_id, $event) || (ctx_r1.stockOut.material_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(67, "option", 6);
    \u0275\u0275text(68, "Choose a material\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(69, InventoryPage_ng_container_18_option_69_Template, 2, 3, "option", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "div", 20)(71, "label", 40)(72, "span", 22);
    \u0275\u0275text(73, "Issuing location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span", 23);
    \u0275\u0275text(75, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "select", 41);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_select_ngModelChange_76_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockOut.location_id, $event) || (ctx_r1.stockOut.location_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(77, "option", 6);
    \u0275\u0275text(78, "Choose a location\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275template(79, InventoryPage_ng_container_18_option_79_Template, 2, 3, "option", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div", 20)(81, "label", 42)(82, "span", 22);
    \u0275\u0275text(83, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "span", 23);
    \u0275\u0275text(85, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "div", 28)(87, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_input_ngModelChange_87_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockOut.quantity, $event) || (ctx_r1.stockOut.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "span", 30);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(90, "div", 20)(91, "label", 44)(92, "span", 22);
    \u0275\u0275text(93, "Activity / work reference");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "span", 23);
    \u0275\u0275text(95, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_input_ngModelChange_96_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockOut.activity, $event) || (ctx_r1.stockOut.activity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(97, "div", 20)(98, "label", 46)(99, "span", 22);
    \u0275\u0275text(100, "Requested by");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "span", 23);
    \u0275\u0275text(102, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(103, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function InventoryPage_ng_container_18_Template_input_ngModelChange_103_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.stockOut.requested_by, $event) || (ctx_r1.stockOut.requested_by = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(104, InventoryPage_ng_container_18_p_104_Template, 2, 1, "p", 33);
    \u0275\u0275elementStart(105, "div", 34)(106, "button", 35);
    \u0275\u0275listener("click", function InventoryPage_ng_container_18_Template_button_click_106_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitStockOut());
    });
    \u0275\u0275text(107);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(108, "section", 15)(109, "h2");
    \u0275\u0275text(110, "Recent movements");
    \u0275\u0275elementEnd();
    \u0275\u0275template(111, InventoryPage_ng_container_18_p_111_Template, 2, 0, "p", 8)(112, InventoryPage_ng_container_18_table_112_Template, 17, 1, "table", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.materials.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.materials.length);
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockIn.material_id);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockInTouched && !ctx_r1.stockIn.material_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.materials);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockIn.location_id);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockInTouched && !ctx_r1.stockIn.location_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.stockInLocations);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockIn.quantity);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockInTouched && !ctx_r1.stockIn.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.uomFor(ctx_r1.stockIn.material_id) || "UOM");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockIn.reference);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockInTouched && !ctx_r1.stockIn.reference.trim());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stockInTouched && ctx_r1.stockInError());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.stockInBusy);
    \u0275\u0275attribute("aria-busy", ctx_r1.stockInBusy);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.stockInBusy ? "Recording receipt\u2026" : "Record receipt", " ");
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockOut.material_id);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockOutTouched && !ctx_r1.stockOut.material_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.materials);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockOut.location_id);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockOutTouched && !ctx_r1.stockOut.location_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.stockOutLocations);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockOut.quantity);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockOutTouched && !ctx_r1.stockOut.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.uomFor(ctx_r1.stockOut.material_id) || "UOM");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockOut.activity);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockOutTouched && !ctx_r1.stockOut.activity.trim());
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.stockOut.requested_by);
    \u0275\u0275attribute("aria-invalid", ctx_r1.stockOutTouched && !ctx_r1.stockOut.requested_by.trim());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stockOutTouched && ctx_r1.stockOutError());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.stockOutBusy);
    \u0275\u0275attribute("aria-busy", ctx_r1.stockOutBusy);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.stockOutBusy ? "Issuing material\u2026" : "Issue material", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.movements.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.movements.length);
  }
}
var InventoryPage = class _InventoryPage {
  route;
  router;
  projectService;
  inventory;
  toastr;
  context;
  projects = [];
  projectId = null;
  balances = null;
  movements = [];
  loadError = null;
  loading = false;
  stockInBusy = false;
  stockOutBusy = false;
  stockInTouched = false;
  stockOutTouched = false;
  stockIn = { material_id: null, location_id: null, quantity: null, reference: "" };
  stockOut = { material_id: null, location_id: null, quantity: null, activity: "", requested_by: "" };
  stockInKey = this.newKey();
  stockOutKey = this.newKey();
  subs = new Subscription();
  constructor(route, router, projectService, inventory, toastr, context) {
    this.route = route;
    this.router = router;
    this.projectService = projectService;
    this.inventory = inventory;
    this.toastr = toastr;
    this.context = context;
  }
  ngOnInit() {
    this.subs.add(this.projectService.getProjects().subscribe({
      next: (res) => this.projects = res.data || [],
      error: () => this.toastr.error("Could not load projects.")
    }));
    this.subs.add(this.route.queryParams.subscribe((params) => {
      const fromUrl = params["projectId"] ? Number(params["projectId"]) : null;
      if (!fromUrl && this.context.read()) {
        this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: this.context.read() }, queryParamsHandling: "merge", replaceUrl: true });
        return;
      }
      this.context.write(fromUrl);
      const pid = fromUrl;
      if (pid !== this.projectId) {
        this.projectId = pid;
        this.stockIn = { material_id: null, location_id: null, quantity: null, reference: "" };
        this.stockOut = { material_id: null, location_id: null, quantity: null, activity: "", requested_by: "" };
        this.reload();
      }
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  /** Physical locations only: the system in-transit location is never offered for stock in or out. */
  get storeLocations() {
    return (this.balances?.locations || []).filter((l) => l.location_type !== "in_transit");
  }
  get stockInLocations() {
    return this.storeLocations.filter((l) => l.status === "active");
  }
  get stockOutLocations() {
    return this.storeLocations.filter((l) => l.status === "active" && l.location_type !== "quarantine");
  }
  /**
   * 'Reconciled' only when the server's independent check passes and no project or location balance is negative.
   * Otherwise the row must be reviewed: a negative balance or a failed check is never shown as reconciled.
   */
  reviewRequired(row) {
    return !row.reconciliation.consistent || row.unplaced < 0 || row.in_transit < 0 || row.locations.some((l) => l.balance < 0);
  }
  /** Per-material balances for one location, for the table cells. */
  balanceAt(row, locationId) {
    return row.locations.find((l) => Number(l.location_id) === Number(locationId));
  }
  get materials() {
    return this.balances?.materials || [];
  }
  onProjectChange(value) {
    const pid = value ? Number(value) : null;
    this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: pid }, queryParamsHandling: "merge" });
  }
  reload() {
    this.balances = null;
    this.movements = [];
    this.loadError = null;
    if (!this.projectId)
      return;
    this.loading = true;
    this.subs.add(this.inventory.balances(this.projectId).subscribe({
      next: (res) => {
        this.balances = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.loadError = err?.error?.message || "Could not load inventory for this project.";
      }
    }));
    this.subs.add(this.inventory.movements(this.projectId).subscribe({
      next: (res) => this.movements = res.data || [],
      error: () => this.movements = []
    }));
  }
  locationName(id) {
    const loc = this.balances?.locations.find((l) => Number(l.id) === Number(id));
    return loc ? `${loc.name} (${loc.code})` : "\u2014";
  }
  stockInError() {
    if (!this.projectId)
      return "Select a project first.";
    if (!this.stockIn.material_id)
      return "Choose a material.";
    if (!this.stockIn.location_id)
      return "Choose the receiving location.";
    const q = Number(this.stockIn.quantity);
    if (!Number.isInteger(q) || q <= 0)
      return "Quantity must be a whole number above zero.";
    if (!this.stockIn.reference.trim())
      return "Enter the PO/GRN or opening-stock authorization reference.";
    return null;
  }
  stockOutError() {
    if (!this.projectId)
      return "Select a project first.";
    if (!this.stockOut.material_id)
      return "Choose a material.";
    if (!this.stockOut.location_id)
      return "Choose the issuing location.";
    const q = Number(this.stockOut.quantity);
    if (!Number.isInteger(q) || q <= 0)
      return "Quantity must be a whole number above zero.";
    const row = this.materials.find((m) => m.material_id === Number(this.stockOut.material_id));
    const loc = row?.locations.find((l) => l.location_id === Number(this.stockOut.location_id));
    if (loc && q > loc.balance)
      return `Only ${loc.balance} ${row?.unit_of_measure} available at this location.`;
    if (!this.stockOut.activity.trim())
      return "Enter the activity or work reference this material is issued against.";
    if (!this.stockOut.requested_by.trim())
      return "Enter who requested the material.";
    return null;
  }
  /** Unit of measure of the selected material, shown next to the quantity field. */
  uomFor(materialId) {
    if (!materialId)
      return "";
    return this.materials.find((m) => m.material_id === Number(materialId))?.unit_of_measure || "";
  }
  submitStockIn() {
    this.stockInTouched = true;
    const error = this.stockInError();
    if (error) {
      this.toastr.warning(error);
      return;
    }
    if (this.stockInBusy)
      return;
    this.stockInBusy = true;
    this.subs.add(this.inventory.receive({
      project_id: Number(this.projectId),
      material_id: Number(this.stockIn.material_id),
      location_id: Number(this.stockIn.location_id),
      quantity: Number(this.stockIn.quantity),
      reference: this.stockIn.reference.trim(),
      idempotency_key: this.stockInKey
    }).subscribe({
      next: (res) => {
        this.stockInBusy = false;
        this.stockInTouched = false;
        this.stockInKey = this.newKey();
        this.toastr.success(res.already_processed ? "This receipt was already recorded; nothing changed." : "Receipt recorded.");
        this.stockIn = __spreadProps(__spreadValues({}, this.stockIn), { quantity: null, reference: "" });
        this.reload();
      },
      error: (err) => {
        this.stockInBusy = false;
        this.toastr.error(err?.error?.message || "Receipt failed. You can retry safely with the same form.");
      }
    }));
  }
  submitStockOut() {
    this.stockOutTouched = true;
    const error = this.stockOutError();
    if (error) {
      this.toastr.warning(error);
      return;
    }
    if (this.stockOutBusy)
      return;
    this.stockOutBusy = true;
    this.subs.add(this.inventory.issue({
      project_id: Number(this.projectId),
      material_id: Number(this.stockOut.material_id),
      location_id: Number(this.stockOut.location_id),
      quantity: Number(this.stockOut.quantity),
      activity: this.stockOut.activity.trim(),
      requested_by: this.stockOut.requested_by.trim(),
      idempotency_key: this.stockOutKey
    }).subscribe({
      next: (res) => {
        this.stockOutBusy = false;
        this.stockOutTouched = false;
        this.stockOutKey = this.newKey();
        this.toastr.success(res.already_processed ? "This issue was already recorded; nothing changed." : "Material issued.");
        this.stockOut = __spreadProps(__spreadValues({}, this.stockOut), { quantity: null, activity: "", requested_by: "" });
        this.reload();
      },
      error: (err) => {
        this.stockOutBusy = false;
        this.toastr.error(err?.error?.message || "Issue failed. You can retry safely with the same form.");
      }
    }));
  }
  newKey() {
    return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `k-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
  static \u0275fac = function InventoryPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryPage)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(InventoryService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(StockTransferContext));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InventoryPage, selectors: [["app-inventory-page"]], standalone: false, decls: 19, vars: 8, consts: [[1, "st-page"], ["active", "inventory", "backTo", "register", "backLabel", "Back to Stock Transfers", 3, "projectId"], [1, "st-header"], [1, "st-sub"], [1, "st-filters"], ["aria-label", "Project", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["class", "st-empty", 4, "ngIf"], ["class", "st-loading", 4, "ngIf"], ["class", "st-error", "role", "alert", 4, "ngIf"], [4, "ngIf"], [1, "st-empty"], [1, "st-loading"], ["role", "alert", 1, "st-error"], [1, "st-card"], ["class", "st-table-wrap", 4, "ngIf"], [1, "st-grid-two"], ["aria-labelledby", "stock-in-title", 1, "st-card", "st-form"], ["id", "stock-in-title"], [1, "st-field"], ["for", "inMaterial"], [1, "st-label-text"], ["aria-hidden", "true", 1, "st-req"], ["id", "inMaterial", "name", "inMaterial", "required", "", 3, "ngModelChange", "ngModel"], ["for", "inLocation"], ["id", "inLocation", "name", "inLocation", "required", "", 3, "ngModelChange", "ngModel"], ["for", "inQty"], [1, "st-qty-row"], ["id", "inQty", "type", "number", "min", "1", "step", "1", "inputmode", "numeric", "name", "inQty", "required", "", 3, "ngModelChange", "ngModel"], ["aria-label", "Unit of measure", 1, "st-uom"], ["for", "inRef"], ["id", "inRef", "type", "text", "maxlength", "200", "name", "inRef", "required", "", 3, "ngModelChange", "ngModel"], ["class", "st-field-error", "role", "alert", 4, "ngIf"], [1, "st-actions"], ["type", "button", 1, "st-btn", "primary", "st-submit", 3, "click", "disabled"], ["aria-labelledby", "stock-out-title", 1, "st-card", "st-form"], ["id", "stock-out-title"], ["for", "outMaterial"], ["id", "outMaterial", "name", "outMaterial", "required", "", 3, "ngModelChange", "ngModel"], ["for", "outLocation"], ["id", "outLocation", "name", "outLocation", "required", "", 3, "ngModelChange", "ngModel"], ["for", "outQty"], ["id", "outQty", "type", "number", "min", "1", "step", "1", "inputmode", "numeric", "name", "outQty", "required", "", 3, "ngModelChange", "ngModel"], ["for", "outActivity"], ["id", "outActivity", "type", "text", "maxlength", "200", "name", "outActivity", "required", "", 3, "ngModelChange", "ngModel"], ["for", "outRequested"], ["id", "outRequested", "type", "text", "maxlength", "120", "name", "outRequested", "required", "", 3, "ngModelChange", "ngModel"], ["class", "st-table", 4, "ngIf"], [1, "st-table-wrap"], [1, "st-table"], ["class", "num", 4, "ngFor", "ngForOf"], [1, "num"], [4, "ngFor", "ngForOf"], [1, "st-status"], ["role", "alert", 1, "st-field-error"]], template: function InventoryPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-stock-transfer-nav", 1);
      \u0275\u0275elementStart(2, "header", 2)(3, "div")(4, "h1");
      \u0275\u0275text(5, "Project Inventory");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7, "Stock by material and location, with stock in, stock out and the movement history. All figures come from the stock ledger.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "section", 4)(9, "label");
      \u0275\u0275text(10, " Project ");
      \u0275\u0275elementStart(11, "select", 5);
      \u0275\u0275listener("ngModelChange", function InventoryPage_Template_select_ngModelChange_11_listener($event) {
        return ctx.onProjectChange($event);
      });
      \u0275\u0275elementStart(12, "option", 6);
      \u0275\u0275text(13, "Select a project");
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, InventoryPage_option_14_Template, 2, 2, "option", 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(15, InventoryPage_p_15_Template, 2, 0, "p", 8)(16, InventoryPage_p_16_Template, 2, 0, "p", 9)(17, InventoryPage_p_17_Template, 2, 1, "p", 10)(18, InventoryPage_ng_container_18_Template, 113, 40, "ng-container", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("projectId", ctx.projectId);
      \u0275\u0275advance(10);
      \u0275\u0275property("ngModel", ctx.projectId);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.projects);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.projectId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loadError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.projectId && ctx.balances && !ctx.loading);
    }
  }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, RequiredValidator, MaxLengthValidator, MinValidator, NgModel, StockTransferNav, DatePipe], styles: ['@charset "UTF-8";\n\n\n.st-page[_ngcontent-%COMP%] {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub[_ngcontent-%COMP%] {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link[_ngcontent-%COMP%] {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary[_ngcontent-%COMP%] {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger[_ngcontent-%COMP%] {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.st-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.st-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.st-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed][_ngcontent-%COMP%] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit][_ngcontent-%COMP%], \n.st-status[data-status=partially_received][_ngcontent-%COMP%] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required][_ngcontent-%COMP%], \n.st-status[data-status=rejected][_ngcontent-%COMP%], \n.st-status[data-status=cancelled][_ngcontent-%COMP%] {\n  background: #ffebee;\n}\n.st-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.st-summary[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.st-pager[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.st-empty[_ngcontent-%COMP%], \n.st-loading[_ngcontent-%COMP%] {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.st-timeline[_ngcontent-%COMP%] {\n  padding-left: 18px;\n}\n.st-timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n}\n.st-overdue[_ngcontent-%COMP%] {\n  background: #fff8e1;\n}\n.st-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines[_ngcontent-%COMP%] {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .st-summary[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.st-grid-two[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));\n  gap: 12px;\n}\n.st-grid-two[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.85rem;\n  margin-bottom: 8px;\n}\n.st-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.st-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n}\n.st-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #1f2a37;\n}\n.st-req[_ngcontent-%COMP%] {\n  color: #c62828;\n  font-weight: 700;\n}\n.st-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.st-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 42px;\n  box-sizing: border-box;\n  padding: 8px 12px;\n  border: 1px solid #78909c;\n  border-radius: 6px;\n  background: #ffffff;\n  color: #102a43;\n  font-size: 0.95rem;\n  font-family: inherit;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n.st-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  appearance: auto;\n  -webkit-appearance: menulist;\n  padding-right: 32px;\n}\n.st-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover, \n.st-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover {\n  border-color: #37474f;\n}\n.st-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible, \n.st-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n  border-color: #1565c0;\n  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.25);\n}\n.st-field[_ngcontent-%COMP%]   input[aria-invalid=true][_ngcontent-%COMP%], \n.st-field[_ngcontent-%COMP%]   select[aria-invalid=true][_ngcontent-%COMP%] {\n  border-color: #c62828;\n  background: #fff5f5;\n}\n.st-qty-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  gap: 8px;\n}\n.st-qty-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n.st-uom[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-width: 64px;\n  justify-content: center;\n  padding: 0 10px;\n  border-radius: 6px;\n  background: #eceff1;\n  border: 1px solid #b0bec5;\n  color: #263238;\n  font-weight: 600;\n  font-size: 0.85rem;\n}\n.st-field-error[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 8px 10px;\n  border-radius: 6px;\n  background: #ffebee;\n  color: #b71c1c;\n  font-size: 0.85rem;\n}\n.st-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  font-size: 1rem;\n}\n.st-submit[_ngcontent-%COMP%]:disabled {\n  cursor: progress;\n  opacity: 0.6;\n}\n@media (max-width: 600px) {\n  .st-qty-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .st-uom[_ngcontent-%COMP%] {\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=inventory-page.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryPage, [{
    type: Component,
    args: [{ selector: "app-inventory-page", standalone: false, template: `<div class="st-page">
  <app-stock-transfer-nav active="inventory" [projectId]="projectId" backTo="register" backLabel="Back to Stock Transfers"></app-stock-transfer-nav>

  <header class="st-header">
    <div>
      <h1>Project Inventory</h1>
      <p class="st-sub">Stock by material and location, with stock in, stock out and the movement history. All figures come from the stock ledger.</p>
    </div>
  </header>

  <section class="st-filters">
    <label>
      Project
      <select [ngModel]="projectId" (ngModelChange)="onProjectChange($event)" aria-label="Project">
        <option [ngValue]="null">Select a project</option>
        <option *ngFor="let p of projects" [ngValue]="p.id">{{ p.name }}</option>
      </select>
    </label>
  </section>

  <p class="st-empty" *ngIf="!projectId">Select a project to see its inventory.</p>
  <p class="st-loading" *ngIf="loading">Loading inventory\u2026</p>
  <p class="st-error" *ngIf="loadError" role="alert">{{ loadError }}</p>

  <ng-container *ngIf="projectId && balances && !loading">
    <!-- Balances -->
    <section class="st-card">
      <h2>Balances</h2>
      <p class="st-empty" *ngIf="!materials.length">No project stock records exist for this project yet.</p>
      <div class="st-table-wrap" *ngIf="materials.length">
        <table class="st-table">
          <thead>
            <tr>
              <th>Material</th>
              <th>UOM</th>
              <th class="num" *ngFor="let loc of storeLocations">{{ loc.name }} ({{ loc.code }})</th>
              <th class="num">Unplaced</th>
              <th class="num">In transit</th>
              <th class="num">Quarantined</th>
              <th class="num">Ledger total</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of materials">
              <td>{{ row.name }} <span class="st-sub">{{ row.sku }}</span></td>
              <td>{{ row.unit_of_measure }}</td>
              <td class="num" *ngFor="let loc of storeLocations">{{ balanceAt(row, loc.id)?.balance ?? 0 }}</td>
              <td class="num">{{ row.unplaced }}</td>
              <td class="num">{{ row.in_transit }}</td>
              <td class="num">{{ row.quarantined }}</td>
              <td class="num"><strong>{{ row.counter_available }}</strong></td>
              <td><span class="st-status" [attr.data-status]="reviewRequired(row) ? 'rejected' : 'completed'">{{ reviewRequired(row) ? 'Review Required' : 'Reconciled' }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="st-sub">Ledger total = unplaced + location balances + in transit. Quarantined stock is counted in the location balance but is never issued.</p>
    </section>

    <div class="st-grid-two">
      <!-- Stock in -->
      <section class="st-card st-form" aria-labelledby="stock-in-title">
        <h2 id="stock-in-title">Stock in (receipt)</h2>
        <p class="st-sub">Records goods received into a store. A PO/GRN or opening-stock authorization reference is required.</p>

        <div class="st-field">
          <label for="inMaterial"><span class="st-label-text">Material</span><span class="st-req" aria-hidden="true">*</span></label>
          <select id="inMaterial" name="inMaterial" [(ngModel)]="stockIn.material_id" required [attr.aria-invalid]="stockInTouched && !stockIn.material_id">
            <option [ngValue]="null">Choose a material\u2026</option>
            <option *ngFor="let m of materials" [ngValue]="m.material_id">{{ m.name }} ({{ m.unit_of_measure }})</option>
          </select>
        </div>

        <div class="st-field">
          <label for="inLocation"><span class="st-label-text">Receiving location</span><span class="st-req" aria-hidden="true">*</span></label>
          <select id="inLocation" name="inLocation" [(ngModel)]="stockIn.location_id" required [attr.aria-invalid]="stockInTouched && !stockIn.location_id">
            <option [ngValue]="null">Choose a location\u2026</option>
            <option *ngFor="let l of stockInLocations" [ngValue]="l.id">{{ l.name }} ({{ l.code }})</option>
          </select>
        </div>

        <div class="st-field">
          <label for="inQty"><span class="st-label-text">Quantity</span><span class="st-req" aria-hidden="true">*</span></label>
          <div class="st-qty-row">
            <input id="inQty" type="number" min="1" step="1" inputmode="numeric" name="inQty" [(ngModel)]="stockIn.quantity" required [attr.aria-invalid]="stockInTouched && !stockIn.quantity" />
            <span class="st-uom" aria-label="Unit of measure">{{ uomFor(stockIn.material_id) || 'UOM' }}</span>
          </div>
        </div>

        <div class="st-field">
          <label for="inRef"><span class="st-label-text">PO / GRN / authorization reference</span><span class="st-req" aria-hidden="true">*</span></label>
          <input id="inRef" type="text" maxlength="200" name="inRef" [(ngModel)]="stockIn.reference" required [attr.aria-invalid]="stockInTouched && !stockIn.reference.trim()" />
        </div>

        <p class="st-field-error" *ngIf="stockInTouched && stockInError() as err" role="alert">{{ err }}</p>

        <div class="st-actions">
          <button type="button" class="st-btn primary st-submit" (click)="submitStockIn()" [disabled]="stockInBusy" [attr.aria-busy]="stockInBusy">
            {{ stockInBusy ? 'Recording receipt\u2026' : 'Record receipt' }}
          </button>
        </div>
      </section>

      <!-- Stock out -->
      <section class="st-card st-form" aria-labelledby="stock-out-title">
        <h2 id="stock-out-title">Stock out (issue)</h2>
        <p class="st-sub">Issues material from a store against a project activity. Quarantined and in-transit stock cannot be issued.</p>

        <div class="st-field">
          <label for="outMaterial"><span class="st-label-text">Material</span><span class="st-req" aria-hidden="true">*</span></label>
          <select id="outMaterial" name="outMaterial" [(ngModel)]="stockOut.material_id" required [attr.aria-invalid]="stockOutTouched && !stockOut.material_id">
            <option [ngValue]="null">Choose a material\u2026</option>
            <option *ngFor="let m of materials" [ngValue]="m.material_id">{{ m.name }} ({{ m.unit_of_measure }})</option>
          </select>
        </div>

        <div class="st-field">
          <label for="outLocation"><span class="st-label-text">Issuing location</span><span class="st-req" aria-hidden="true">*</span></label>
          <select id="outLocation" name="outLocation" [(ngModel)]="stockOut.location_id" required [attr.aria-invalid]="stockOutTouched && !stockOut.location_id">
            <option [ngValue]="null">Choose a location\u2026</option>
            <option *ngFor="let l of stockOutLocations" [ngValue]="l.id">{{ l.name }} ({{ l.code }})</option>
          </select>
        </div>

        <div class="st-field">
          <label for="outQty"><span class="st-label-text">Quantity</span><span class="st-req" aria-hidden="true">*</span></label>
          <div class="st-qty-row">
            <input id="outQty" type="number" min="1" step="1" inputmode="numeric" name="outQty" [(ngModel)]="stockOut.quantity" required [attr.aria-invalid]="stockOutTouched && !stockOut.quantity" />
            <span class="st-uom" aria-label="Unit of measure">{{ uomFor(stockOut.material_id) || 'UOM' }}</span>
          </div>
        </div>

        <div class="st-field">
          <label for="outActivity"><span class="st-label-text">Activity / work reference</span><span class="st-req" aria-hidden="true">*</span></label>
          <input id="outActivity" type="text" maxlength="200" name="outActivity" [(ngModel)]="stockOut.activity" required [attr.aria-invalid]="stockOutTouched && !stockOut.activity.trim()" />
        </div>

        <div class="st-field">
          <label for="outRequested"><span class="st-label-text">Requested by</span><span class="st-req" aria-hidden="true">*</span></label>
          <input id="outRequested" type="text" maxlength="120" name="outRequested" [(ngModel)]="stockOut.requested_by" required [attr.aria-invalid]="stockOutTouched && !stockOut.requested_by.trim()" />
        </div>

        <p class="st-field-error" *ngIf="stockOutTouched && stockOutError() as err" role="alert">{{ err }}</p>

        <div class="st-actions">
          <button type="button" class="st-btn primary st-submit" (click)="submitStockOut()" [disabled]="stockOutBusy" [attr.aria-busy]="stockOutBusy">
            {{ stockOutBusy ? 'Issuing material\u2026' : 'Issue material' }}
          </button>
        </div>
      </section>
    </div>

    <!-- History -->
    <section class="st-card">
      <h2>Recent movements</h2>
      <p class="st-empty" *ngIf="!movements.length">No stock movements recorded for this project yet.</p>
      <table class="st-table" *ngIf="movements.length">
        <thead>
          <tr>
            <th>When</th>
            <th>Type</th>
            <th>Material</th>
            <th>Location</th>
            <th class="num">Quantity</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let m of movements">
            <td>{{ m.createdAt | date: 'dd MMM yyyy, HH:mm' }}</td>
            <td>{{ m.movement_type }}</td>
            <td>{{ m.material?.name || '\u2014' }}</td>
            <td>{{ m.location ? m.location.name + ' (' + m.location.code + ')' : '\u2014' }}</td>
            <td class="num">{{ m.quantity }} {{ m.unit_of_measure }}</td>
            <td>{{ m.transfer_id ? 'Transfer #' + m.transfer_id : (m.reference_id || '\u2014') }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </ng-container>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/modules/stock-transfer/inventory-page/inventory-page.scss */\n.st-page {\n  padding: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.st-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-header h1 {\n  font-size: 1.5rem;\n  margin: 0;\n}\n.st-sub {\n  color: #5b6470;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.st-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.st-link {\n  color: #1565c0;\n  text-decoration: none;\n  cursor: pointer;\n  margin-right: 8px;\n}\n.st-btn {\n  padding: 6px 12px;\n  border: 1px solid #b0bec5;\n  border-radius: 6px;\n  background: #fff;\n  cursor: pointer;\n}\n.st-btn.primary {\n  background: #1565c0;\n  color: #fff;\n  border-color: #1565c0;\n}\n.st-btn.danger {\n  background: #c62828;\n  color: #fff;\n  border-color: #c62828;\n}\n.st-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.st-filters {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.st-filters label,\n.st-grid label {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.85rem;\n  gap: 4px;\n}\n.st-grid {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  margin: 8px 0;\n}\n.st-table-wrap {\n  overflow-x: auto;\n}\n.st-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.st-table th,\n.st-table td {\n  border-bottom: 1px solid #e0e4e8;\n  padding: 8px;\n  text-align: left;\n  vertical-align: middle;\n}\n.st-table .num {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n.st-status {\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #eceff1;\n  font-size: 0.8rem;\n}\n.st-status[data-status=completed] {\n  background: #e8f5e9;\n}\n.st-status[data-status=in_transit],\n.st-status[data-status=partially_received] {\n  background: #e3f2fd;\n}\n.st-status[data-status=reconciliation_required],\n.st-status[data-status=rejected],\n.st-status[data-status=cancelled] {\n  background: #ffebee;\n}\n.st-card {\n  background: #fff;\n  border: 1px solid #e0e4e8;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 12px 0;\n}\n.st-card h2 {\n  font-size: 1.1rem;\n  margin: 0 0 8px;\n}\n.st-summary {\n  display: flex;\n  gap: 16px;\n}\n.st-summary div {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.st-summary span {\n  font-size: 0.8rem;\n  color: #5b6470;\n}\n.st-summary strong {\n  font-size: 1.2rem;\n}\n.st-pager {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.st-error {\n  color: #c62828;\n}\n.st-empty,\n.st-loading {\n  color: #5b6470;\n  padding: 12px 0;\n}\n.st-crumb {\n  margin-bottom: 8px;\n}\n.st-timeline {\n  padding-left: 18px;\n}\n.st-timeline li {\n  margin-bottom: 6px;\n}\n.st-overdue {\n  background: #fff8e1;\n}\n.st-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 16px;\n}\n.st-modal {\n  background: #fff;\n  border-radius: 10px;\n  padding: 20px;\n  width: min(640px, 100%);\n  max-height: 90vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.st-modal label {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.9rem;\n}\n.st-modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.st-lines {\n  border: 1px solid #e0e4e8;\n  border-radius: 8px;\n  padding: 10px;\n}\n.st-line {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 6px;\n}\n.st-line select {\n  flex: 1;\n}\n@media (max-width: 600px) {\n  .st-page {\n    padding: 12px;\n  }\n  .st-summary {\n    flex-wrap: wrap;\n  }\n}\n.st-grid-two {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));\n  gap: 12px;\n}\n.st-grid-two label {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 0.85rem;\n  margin-bottom: 8px;\n}\n.st-form {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.st-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n}\n.st-field > label {\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #1f2a37;\n}\n.st-req {\n  color: #c62828;\n  font-weight: 700;\n}\n.st-field input,\n.st-field select {\n  width: 100%;\n  min-height: 42px;\n  box-sizing: border-box;\n  padding: 8px 12px;\n  border: 1px solid #78909c;\n  border-radius: 6px;\n  background: #ffffff;\n  color: #102a43;\n  font-size: 0.95rem;\n  font-family: inherit;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n.st-field select {\n  appearance: auto;\n  -webkit-appearance: menulist;\n  padding-right: 32px;\n}\n.st-field input:hover,\n.st-field select:hover {\n  border-color: #37474f;\n}\n.st-field input:focus-visible,\n.st-field select:focus-visible {\n  outline: none;\n  border-color: #1565c0;\n  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.25);\n}\n.st-field input[aria-invalid=true],\n.st-field select[aria-invalid=true] {\n  border-color: #c62828;\n  background: #fff5f5;\n}\n.st-qty-row {\n  display: flex;\n  align-items: stretch;\n  gap: 8px;\n}\n.st-qty-row input {\n  flex: 1 1 auto;\n}\n.st-uom {\n  display: inline-flex;\n  align-items: center;\n  min-width: 64px;\n  justify-content: center;\n  padding: 0 10px;\n  border-radius: 6px;\n  background: #eceff1;\n  border: 1px solid #b0bec5;\n  color: #263238;\n  font-weight: 600;\n  font-size: 0.85rem;\n}\n.st-field-error {\n  margin: 0;\n  padding: 8px 10px;\n  border-radius: 6px;\n  background: #ffebee;\n  color: #b71c1c;\n  font-size: 0.85rem;\n}\n.st-submit {\n  width: 100%;\n  min-height: 44px;\n  font-size: 1rem;\n}\n.st-submit:disabled {\n  cursor: progress;\n  opacity: 0.6;\n}\n@media (max-width: 600px) {\n  .st-qty-row {\n    flex-direction: column;\n  }\n  .st-uom {\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=inventory-page.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: ProjectService }, { type: InventoryService }, { type: ToastrService }, { type: StockTransferContext }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InventoryPage, { className: "InventoryPage", filePath: "app/modules/stock-transfer/inventory-page/inventory-page.ts", lineNumber: 20 });
})();

// src/app/modules/stock-transfer/stock-transfer-routing-module.ts
var routes = [
  { path: "", component: StockTransferRegister, data: { mode: "register" } },
  { path: "approvals", component: StockTransferRegister, data: { mode: "approvals" } },
  { path: "in-transit", component: StockTransferInTransit },
  { path: "inventory", component: InventoryPage },
  { path: ":id", component: StockTransferDetail }
];
var StockTransferRoutingModule = class _StockTransferRoutingModule {
  static \u0275fac = function StockTransferRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _StockTransferRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/stock-transfer/stock-transfer-module.ts
var StockTransferModule = class _StockTransferModule {
  static \u0275fac = function StockTransferModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockTransferModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _StockTransferModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [DatePipe, DecimalPipe], imports: [
    CommonModule,
    FormsModule,
    StockTransferRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockTransferModule, [{
    type: NgModule,
    args: [{
      declarations: [StockTransferRegister, StockTransferDetail, StockTransferInTransit, InventoryPage, StockTransferNav],
      imports: [
        CommonModule,
        FormsModule,
        StockTransferRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule
      ],
      providers: [DatePipe, DecimalPipe]
    }]
  }], null, null);
})();
export {
  StockTransferModule
};
//# sourceMappingURL=chunk-DOO4SRWZ.js.map
