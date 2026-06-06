import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MaterialModule
} from "./chunk-33HPODTN.js";
import "./chunk-5YJQBWTN.js";
import "./chunk-E3SOVO5U.js";
import {
  MatIcon
} from "./chunk-ZGY4FKYW.js";
import {
  MatButton,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from "./chunk-Y354W3EZ.js";
import "./chunk-NKQ2I3NH.js";
import {
  ToastrService
} from "./chunk-YLGXRPVA.js";
import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  FormsModule,
  ReactiveFormsModule
} from "./chunk-WFU7JF4C.js";
import {
  CommonModule,
  Component,
  DatePipe,
  HttpClient,
  Injectable,
  NgClass,
  NgIf,
  NgModule,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-F27QM527.js";

// src/app/modules/company-management/services/company.service.ts
var CompanyService = class _CompanyService {
  http;
  baseUrl = environment.serverUrl + "/api/v1/companies";
  constructor(http) {
    this.http = http;
  }
  getCompanies() {
    return this.http.get(this.baseUrl);
  }
  toggleStatus(id, isActive) {
    return this.http.put(`${this.baseUrl}/${id}/status`, { isActive });
  }
  static \u0275fac = function CompanyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CompanyService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CompanyService, factory: _CompanyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompanyService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/company-management/company-management.ts
function CompanyManagement_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, " ID ");
    \u0275\u0275elementEnd();
  }
}
function CompanyManagement_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r1.id, " ");
  }
}
function CompanyManagement_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, " Organization Name ");
    \u0275\u0275elementEnd();
  }
}
function CompanyManagement_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(element_r2.name);
  }
}
function CompanyManagement_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, " Primary Email ");
    \u0275\u0275elementEnd();
  }
}
function CompanyManagement_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17)(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(element_r3.email);
  }
}
function CompanyManagement_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, " Registration Date ");
    \u0275\u0275elementEnd();
  }
}
function CompanyManagement_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, element_r4.createdAt, "mediumDate"), " ");
  }
}
function CompanyManagement_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, " Environment Status ");
    \u0275\u0275elementEnd();
  }
}
function CompanyManagement_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17)(1, "span", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", element_r5.isActive ? "active" : "inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r5.isActive ? "Active" : "Disabled", " ");
  }
}
function CompanyManagement_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, " Account Action ");
    \u0275\u0275elementEnd();
  }
}
function CompanyManagement_td_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 17)(1, "button", 20);
    \u0275\u0275listener("click", function CompanyManagement_td_29_Template_button_click_1_listener() {
      const element_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.toggleCompanyStatus(element_r7));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", element_r7.isActive ? "warn" : "primary");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(element_r7.isActive ? "block" : "check_circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r7.isActive ? "Disable Access" : "Enable Access", " ");
  }
}
function CompanyManagement_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 21);
  }
}
function CompanyManagement_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 22);
  }
}
function CompanyManagement_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1, " No registered environments found! ");
    \u0275\u0275elementEnd();
  }
}
var CompanyManagement = class _CompanyManagement {
  companyService;
  toast;
  companies = [];
  displayedColumns = ["id", "name", "email", "createdAt", "status", "actions"];
  constructor(companyService, toast) {
    this.companyService = companyService;
    this.toast = toast;
  }
  ngOnInit() {
    this.loadCompanies();
  }
  loadCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (res) => {
        this.companies = res.data;
      },
      error: (err) => {
        if (err.status === 403) {
          this.toast.error("You don't have super admin access.");
        } else {
          this.toast.error("Failed to load companies");
        }
      }
    });
  }
  toggleCompanyStatus(company) {
    const newStatus = !company.isActive;
    this.companyService.toggleStatus(company.id, newStatus).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Status updated successfully");
        this.loadCompanies();
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Failed to update status");
      }
    });
  }
  static \u0275fac = function CompanyManagement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CompanyManagement)(\u0275\u0275directiveInject(CompanyService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CompanyManagement, selectors: [["app-company-management"]], standalone: false, decls: 33, vars: 4, consts: [[1, "company-management-container"], [1, "header-section"], [1, "table-card", "mt-3"], [1, "pt-3"], ["mat-table", "", 1, "mat-elevation-z1", "w-100", "table-container", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "email"], ["matColumnDef", "createdAt"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-data pt-5 pb-5 text-center text-muted", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "light-code"], [1, "badge", 3, "ngClass"], ["mat-stroked-button", "", 3, "click", "color"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-data", "pt-5", "pb-5", "text-center", "text-muted"]], template: function CompanyManagement_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Company Profiles (Super Admin Access)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Manage external organizations utilizing the platform. Enable or disable user environments globally.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "mat-card", 2)(7, "mat-card-header")(8, "mat-card-title");
      \u0275\u0275text(9, "Registered Companies");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "mat-card-content", 3)(11, "table", 4);
      \u0275\u0275elementContainerStart(12, 5);
      \u0275\u0275template(13, CompanyManagement_th_13_Template, 2, 0, "th", 6)(14, CompanyManagement_td_14_Template, 2, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(15, 8);
      \u0275\u0275template(16, CompanyManagement_th_16_Template, 2, 0, "th", 6)(17, CompanyManagement_td_17_Template, 3, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 9);
      \u0275\u0275template(19, CompanyManagement_th_19_Template, 2, 0, "th", 6)(20, CompanyManagement_td_20_Template, 3, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(21, 10);
      \u0275\u0275template(22, CompanyManagement_th_22_Template, 2, 0, "th", 6)(23, CompanyManagement_td_23_Template, 3, 4, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(24, 11);
      \u0275\u0275template(25, CompanyManagement_th_25_Template, 2, 0, "th", 6)(26, CompanyManagement_td_26_Template, 3, 2, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(27, 12);
      \u0275\u0275template(28, CompanyManagement_th_28_Template, 2, 0, "th", 6)(29, CompanyManagement_td_29_Template, 5, 3, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(30, CompanyManagement_tr_30_Template, 1, 0, "tr", 13)(31, CompanyManagement_tr_31_Template, 1, 0, "tr", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275template(32, CompanyManagement_div_32_Template, 2, 0, "div", 15);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("dataSource", ctx.companies);
      \u0275\u0275advance(19);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.companies.length === 0);
    }
  }, dependencies: [NgClass, NgIf, MatButton, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIcon, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompanyManagement, [{
    type: Component,
    args: [{ selector: "app-company-management", standalone: false, template: `<div class="company-management-container">\r
  <div class="header-section">\r
    <h2>Company Profiles (Super Admin Access)</h2>\r
    <p>Manage external organizations utilizing the platform. Enable or disable user environments globally.</p>\r
  </div>\r
\r
  <mat-card class="table-card mt-3">\r
    <mat-card-header>\r
      <mat-card-title>Registered Companies</mat-card-title>\r
    </mat-card-header>\r
\r
    <mat-card-content class="pt-3">\r
        <table mat-table [dataSource]="companies" class="mat-elevation-z1 w-100 table-container">\r
\r
          <ng-container matColumnDef="id">\r
            <th mat-header-cell *matHeaderCellDef> ID </th>\r
            <td mat-cell *matCellDef="let element"> {{element.id}} </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="name">\r
            <th mat-header-cell *matHeaderCellDef> Organization Name </th>\r
            <td mat-cell *matCellDef="let element"> <strong>{{element.name}}</strong> </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="email">\r
            <th mat-header-cell *matHeaderCellDef> Primary Email </th>\r
            <td mat-cell *matCellDef="let element"> <span class="light-code">{{element.email}}</span> </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="createdAt">\r
            <th mat-header-cell *matHeaderCellDef> Registration Date </th>\r
            <td mat-cell *matCellDef="let element"> {{element.createdAt | date:'mediumDate'}} </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="status">\r
            <th mat-header-cell *matHeaderCellDef> Environment Status </th>\r
            <td mat-cell *matCellDef="let element"> \r
              <span class="badge" [ngClass]="element.isActive ? 'active' : 'inactive'">\r
                {{element.isActive ? 'Active' : 'Disabled'}}\r
              </span>\r
            </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="actions">\r
            <th mat-header-cell *matHeaderCellDef> Account Action </th>\r
            <td mat-cell *matCellDef="let element">\r
               <button mat-stroked-button [color]="element.isActive ? 'warn' : 'primary'" (click)="toggleCompanyStatus(element)">\r
                  <mat-icon>{{ element.isActive ? 'block' : 'check_circle' }}</mat-icon>\r
                  {{ element.isActive ? 'Disable Access' : 'Enable Access' }}\r
               </button>\r
            </td>\r
          </ng-container>\r
\r
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\r
        </table>\r
        \r
        <div *ngIf="companies.length === 0" class="no-data pt-5 pb-5 text-center text-muted">\r
          No registered environments found!\r
        </div>\r
    </mat-card-content>\r
  </mat-card>\r
</div>\r
` }]
  }], () => [{ type: CompanyService }, { type: ToastrService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CompanyManagement, { className: "CompanyManagement", filePath: "app/modules/company-management/company-management.ts", lineNumber: 11 });
})();

// src/app/modules/company-management/company-management-routing-module.ts
var routes = [{ path: "", component: CompanyManagement }];
var CompanyManagementRoutingModule = class _CompanyManagementRoutingModule {
  static \u0275fac = function CompanyManagementRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CompanyManagementRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CompanyManagementRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompanyManagementRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/company-management/company-management-module.ts
var CompanyManagementModule = class _CompanyManagementModule {
  static \u0275fac = function CompanyManagementModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CompanyManagementModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CompanyManagementModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    CompanyManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompanyManagementModule, [{
    type: NgModule,
    args: [{
      declarations: [
        CompanyManagement
      ],
      imports: [
        CommonModule,
        CompanyManagementRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
      ]
    }]
  }], null, null);
})();
export {
  CompanyManagementModule
};
//# sourceMappingURL=chunk-ZUA3RLBL.js.map
