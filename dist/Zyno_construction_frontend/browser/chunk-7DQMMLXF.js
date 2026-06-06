import {
  ProjectService
} from "./chunk-VBCWJQVV.js";
import {
  MatSelectModule
} from "./chunk-E3SOVO5U.js";
import {
  MatButtonModule,
  MatCardModule
} from "./chunk-Y354W3EZ.js";
import {
  MatFormFieldModule
} from "./chunk-NKQ2I3NH.js";
import {
  FormsModule
} from "./chunk-WFU7JF4C.js";
import {
  CommonModule,
  Component,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-F27QM527.js";

// src/app/modules/stock-approval/stock-approval.ts
var _c0 = (a0, a1, a2) => ({ "bg-amber-100 text-amber-700": a0, "bg-emerald-100 text-emerald-700": a1, "bg-rose-100 text-rose-700": a2 });
function StockApproval_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "div", 10);
    \u0275\u0275elementEnd();
  }
}
function StockApproval_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 12);
    \u0275\u0275text(2, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 13);
    \u0275\u0275text(4, " No Stock Requests Found ");
    \u0275\u0275elementEnd()();
  }
}
function StockApproval_div_12_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "button", 33);
    \u0275\u0275listener("click", function StockApproval_div_12_div_42_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const request_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.approveRequest(request_r2.id));
    });
    \u0275\u0275text(2, " Approve ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 34);
    \u0275\u0275listener("click", function StockApproval_div_12_div_42_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const request_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.rejectRequest(request_r2.id));
    });
    \u0275\u0275text(4, " Reject ");
    \u0275\u0275elementEnd()();
  }
}
function StockApproval_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div")(3, "div", 16)(4, "span", 17);
    \u0275\u0275text(5, " inventory ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h3", 18);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 19);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "span", 20);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 21)(14, "div", 22)(15, "div", 23)(16, "p", 24);
    \u0275\u0275text(17, " Requested Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h4", 25);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 23)(21, "p", 24);
    \u0275\u0275text(22, " Available Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "h4", 25);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 26)(26, "div", 27)(27, "span", 28);
    \u0275\u0275text(28, " Material ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 29);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 27)(32, "span", 28);
    \u0275\u0275text(33, " Project ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 29);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 27)(37, "span", 28);
    \u0275\u0275text(38, " Created ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 30);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(42, StockApproval_div_12_div_42_Template, 5, 0, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r2 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", request_r2.task_title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Request ID #", request_r2.id, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(13, _c0, request_r2.status === "pending", request_r2.status === "approved", request_r2.status === "rejected"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r2.status, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", request_r2.requested_qty, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", request_r2.available_qty, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" #", request_r2.material_id, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" #", request_r2.project_id, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(41, 10, request_r2.createdAt, "mediumDate"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", request_r2.status === "pending");
  }
}
var StockApproval = class _StockApproval {
  projectService;
  stockRequests = [];
  selectedRequest = null;
  loading = false;
  constructor(projectService) {
    this.projectService = projectService;
  }
  ngOnInit() {
    this.getAllRequests();
  }
  // Get All Requests
  getAllRequests() {
    this.loading = true;
    this.projectService.getAllStockRequests().subscribe({
      next: (res) => {
        this.stockRequests = res.data || [];
        console.log("ddkjdkkdjkkdjf", res.data);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }
  // Approve Request
  approveRequest(id) {
    this.projectService.approveStockRequest(id).subscribe({
      next: (res) => {
        console.log("Approved Successfully");
        const request = this.stockRequests.find((r) => r.id === id);
        if (request) {
          request.status = "approved";
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  // Reject Request
  rejectRequest(id) {
    this.projectService.rejectStockRequest(id).subscribe({
      next: (res) => {
        console.log("Rejected Successfully");
        const request = this.stockRequests.find((r) => r.id === id);
        if (request) {
          request.status = "rejected";
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  static \u0275fac = function StockApproval_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockApproval)(\u0275\u0275directiveInject(ProjectService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockApproval, selectors: [["app-stock-approval"]], standalone: false, decls: 13, vars: 4, consts: [[1, "p-6", "flex", "flex-col", "gap-6", "animate-in", "fade-in", "duration-500"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-5"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white", "tracking-tight"], [1, "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "px-5", "py-3", "rounded-2xl", "bg-primary/10", "text-primary", "font-bold", "text-sm", "w-fit"], ["class", "flex items-center justify-center py-20", 4, "ngIf"], ["class", "rounded-3xl border border-dashed border-slate-300 dark:border-slate-700\n           p-16 text-center bg-white dark:bg-slate-900", 4, "ngIf"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-3", "gap-6"], ["class", "group rounded-[28px] overflow-hidden\n             bg-white dark:bg-slate-900\n             border border-slate-200 dark:border-slate-800\n             shadow-sm hover:shadow-2xl\n             hover:-translate-y-1 transition-all duration-300", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "justify-center", "py-20"], [1, "h-14", "w-14", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "rounded-3xl", "border", "border-dashed", "border-slate-300", "dark:border-slate-700", "p-16", "text-center", "bg-white", "dark:bg-slate-900"], [1, "material-symbols-outlined", "text-6xl", "text-slate-400"], [1, "mt-4", "text-xl", "font-bold", "text-slate-700", "dark:text-white"], [1, "group", "rounded-[28px]", "overflow-hidden", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "shadow-sm", "hover:shadow-2xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "p-6", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-start", "justify-between", "gap-4"], [1, "h-14", "w-14", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center", "mb-4"], [1, "material-symbols-outlined", "text-3xl"], [1, "text-lg", "font-bold", "text-slate-800", "dark:text-white", "leading-snug"], [1, "text-sm", "text-slate-500", "mt-1"], [1, "px-4", "py-2", "rounded-full", "text-xs", "font-bold", "uppercase", "tracking-wide", 3, "ngClass"], [1, "p-6", "flex", "flex-col", "gap-4"], [1, "grid", "grid-cols-2", "gap-4"], [1, "rounded-2xl", "bg-slate-50", "dark:bg-slate-800", "p-4"], [1, "text-xs", "text-slate-500", "mb-1"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "flex-col", "gap-3", "text-sm"], [1, "flex", "items-center", "justify-between"], [1, "text-slate-500"], [1, "font-bold", "text-slate-700", "dark:text-slate-200"], [1, "font-semibold", "text-slate-700", "dark:text-slate-200"], ["class", "p-6 pt-0 flex items-center gap-3", 4, "ngIf"], [1, "p-6", "pt-0", "flex", "items-center", "gap-3"], [1, "flex-1", "h-12", "rounded-2xl", "bg-emerald-500", "hover:bg-emerald-600", "text-white", "font-bold", "transition-all", "duration-300", "hover:scale-[1.02]", "shadow-lg", "shadow-emerald-500/20", 3, "click"], [1, "flex-1", "h-12", "rounded-2xl", "bg-rose-500", "hover:bg-rose-600", "text-white", "font-bold", "transition-all", "duration-300", "hover:scale-[1.02]", "shadow-lg", "shadow-rose-500/20", 3, "click"]], template: function StockApproval_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, " Stock Requests ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Manage all material stock requests easily ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, StockApproval_div_9_Template, 2, 0, "div", 5)(10, StockApproval_div_10_Template, 5, 0, "div", 6);
      \u0275\u0275elementStart(11, "div", 7);
      \u0275\u0275template(12, StockApproval_div_12_Template, 43, 17, "div", 8);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" Total Requests : ", ctx.stockRequests.length || 0, " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.stockRequests.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.stockRequests);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, DatePipe], styles: ["\n.container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 600;\n  margin-bottom: 24px;\n  color: #1f2937;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 18px;\n  margin-top: 40px;\n}\n.request-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.request-card[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  transition: 0.3s ease;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.request-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n}\nmat-card-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n  font-size: 22px;\n  color: #111827;\n}\nmat-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font-size: 15px;\n  color: #4b5563;\n}\nmat-card-actions[_ngcontent-%COMP%] {\n  padding: 16px;\n  display: flex;\n  gap: 10px;\n}\n.details-card[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);\n}\n.details-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.pending[_ngcontent-%COMP%] {\n  color: orange;\n  font-weight: bold;\n}\n.approved[_ngcontent-%COMP%] {\n  color: green;\n  font-weight: bold;\n}\n.rejected[_ngcontent-%COMP%] {\n  color: red;\n  font-weight: bold;\n}\n/*# sourceMappingURL=stock-approval.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockApproval, [{
    type: Component,
    args: [{ selector: "app-stock-approval", standalone: false, template: `<section class="p-6 flex flex-col gap-6 animate-in fade-in duration-500">\r
\r
  <!-- Header -->\r
  <div\r
    class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">\r
\r
    <div>\r
      <h2\r
        class="text-3xl font-black text-slate-800 dark:text-white tracking-tight">\r
        Stock Requests\r
      </h2>\r
\r
      <p class="text-slate-500 dark:text-slate-400 mt-1">\r
        Manage all material stock requests easily\r
      </p>\r
    </div>\r
\r
    <!-- Count -->\r
    <div\r
      class="px-5 py-3 rounded-2xl bg-primary/10 text-primary font-bold text-sm w-fit">\r
      Total Requests : {{ stockRequests.length || 0 }}\r
    </div>\r
\r
  </div>\r
\r
  <!-- Loading -->\r
  <div *ngIf="loading"\r
    class="flex items-center justify-center py-20">\r
\r
    <div\r
      class="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin">\r
    </div>\r
\r
  </div>\r
\r
  <!-- Empty State -->\r
  <div *ngIf="!loading && stockRequests.length === 0"\r
    class="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700\r
           p-16 text-center bg-white dark:bg-slate-900">\r
\r
    <span class="material-symbols-outlined text-6xl text-slate-400">\r
      inventory_2\r
    </span>\r
\r
    <h3 class="mt-4 text-xl font-bold text-slate-700 dark:text-white">\r
      No Stock Requests Found\r
    </h3>\r
\r
  </div>\r
\r
  <!-- Grid -->\r
  <div\r
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">\r
\r
    <div *ngFor="let request of stockRequests"\r
      class="group rounded-[28px] overflow-hidden\r
             bg-white dark:bg-slate-900\r
             border border-slate-200 dark:border-slate-800\r
             shadow-sm hover:shadow-2xl\r
             hover:-translate-y-1 transition-all duration-300">\r
\r
      <!-- Top -->\r
      <div\r
        class="p-6 border-b border-slate-100 dark:border-slate-800\r
               flex items-start justify-between gap-4">\r
\r
        <div>\r
\r
          <div\r
            class="h-14 w-14 rounded-2xl bg-primary/10 text-primary\r
                   flex items-center justify-center mb-4">\r
\r
            <span class="material-symbols-outlined text-3xl">\r
              inventory\r
            </span>\r
\r
          </div>\r
\r
          <h3\r
            class="text-lg font-bold text-slate-800 dark:text-white leading-snug">\r
            {{ request.task_title }}\r
          </h3>\r
\r
          <p class="text-sm text-slate-500 mt-1">\r
            Request ID #{{ request.id }}\r
          </p>\r
\r
        </div>\r
\r
        <!-- Status -->\r
        <div>\r
\r
          <span\r
            class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide"\r
            [ngClass]="{\r
              'bg-amber-100 text-amber-700': request.status === 'pending',\r
              'bg-emerald-100 text-emerald-700': request.status === 'approved',\r
              'bg-rose-100 text-rose-700': request.status === 'rejected'\r
            }">\r
\r
            {{ request.status }}\r
\r
          </span>\r
\r
        </div>\r
\r
      </div>\r
\r
      <!-- Body -->\r
      <div class="p-6 flex flex-col gap-4">\r
\r
        <div\r
          class="grid grid-cols-2 gap-4">\r
\r
          <div\r
            class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
\r
            <p class="text-xs text-slate-500 mb-1">\r
              Requested Qty\r
            </p>\r
\r
            <h4\r
              class="text-xl font-black text-slate-800 dark:text-white">\r
              {{ request.requested_qty }}\r
            </h4>\r
\r
          </div>\r
\r
          <div\r
            class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
\r
            <p class="text-xs text-slate-500 mb-1">\r
              Available Qty\r
            </p>\r
\r
            <h4\r
              class="text-xl font-black text-slate-800 dark:text-white">\r
              {{ request.available_qty }}\r
            </h4>\r
\r
          </div>\r
\r
        </div>\r
\r
        <!-- Info -->\r
        <div class="flex flex-col gap-3 text-sm">\r
\r
          <div class="flex items-center justify-between">\r
\r
            <span class="text-slate-500">\r
              Material ID\r
            </span>\r
\r
            <span class="font-bold text-slate-700 dark:text-slate-200">\r
              #{{ request.material_id }}\r
            </span>\r
\r
          </div>\r
\r
          <div class="flex items-center justify-between">\r
\r
            <span class="text-slate-500">\r
              Project ID\r
            </span>\r
\r
            <span class="font-bold text-slate-700 dark:text-slate-200">\r
              #{{ request.project_id }}\r
            </span>\r
\r
          </div>\r
\r
          <div class="flex items-center justify-between">\r
\r
            <span class="text-slate-500">\r
              Created\r
            </span>\r
\r
            <span class="font-semibold text-slate-700 dark:text-slate-200">\r
              {{ request.createdAt | date:'mediumDate' }}\r
            </span>\r
\r
          </div>\r
\r
        </div>\r
\r
      </div>\r
\r
      <!-- Footer -->\r
      <div\r
        *ngIf="request.status === 'pending'"\r
        class="p-6 pt-0 flex items-center gap-3">\r
\r
        <!-- Approve -->\r
        <button\r
          (click)="approveRequest(request.id)"\r
          class="flex-1 h-12 rounded-2xl\r
                 bg-emerald-500 hover:bg-emerald-600\r
                 text-white font-bold\r
                 transition-all duration-300\r
                 hover:scale-[1.02]\r
                 shadow-lg shadow-emerald-500/20">\r
\r
          Approve\r
\r
        </button>\r
\r
        <!-- Reject -->\r
        <button\r
          (click)="rejectRequest(request.id)"\r
          class="flex-1 h-12 rounded-2xl\r
                 bg-rose-500 hover:bg-rose-600\r
                 text-white font-bold\r
                 transition-all duration-300\r
                 hover:scale-[1.02]\r
                 shadow-lg shadow-rose-500/20">\r
\r
          Reject\r
\r
        </button>\r
\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
</section>`, styles: ["/* src/app/modules/stock-approval/stock-approval.scss */\n.container {\n  padding: 24px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.title {\n  font-size: 28px;\n  font-weight: 600;\n  margin-bottom: 24px;\n  color: #1f2937;\n}\n.loading {\n  text-align: center;\n  font-size: 18px;\n  margin-top: 40px;\n}\n.request-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.request-card {\n  border-radius: 16px;\n  transition: 0.3s ease;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.request-card:hover {\n  transform: translateY(-4px);\n}\nmat-card-content h3 {\n  margin-bottom: 14px;\n  font-size: 22px;\n  color: #111827;\n}\nmat-card-content p {\n  margin: 8px 0;\n  font-size: 15px;\n  color: #4b5563;\n}\nmat-card-actions {\n  padding: 16px;\n  display: flex;\n  gap: 10px;\n}\n.details-card {\n  margin-top: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);\n}\n.details-card h2 {\n  margin-bottom: 16px;\n}\n.pending {\n  color: orange;\n  font-weight: bold;\n}\n.approved {\n  color: green;\n  font-weight: bold;\n}\n.rejected {\n  color: red;\n  font-weight: bold;\n}\n/*# sourceMappingURL=stock-approval.css.map */\n"] }]
  }], () => [{ type: ProjectService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockApproval, { className: "StockApproval", filePath: "app/modules/stock-approval/stock-approval.ts", lineNumber: 10 });
})();

// src/app/modules/stock-approval/stock-approval-routing-module.ts
var routes = [{ path: "", component: StockApproval }];
var StockApprovalRoutingModule = class _StockApprovalRoutingModule {
  static \u0275fac = function StockApprovalRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockApprovalRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _StockApprovalRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockApprovalRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/stock-approval/stock-approval-module.ts
var StockApprovalModule = class _StockApprovalModule {
  static \u0275fac = function StockApprovalModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockApprovalModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _StockApprovalModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    StockApprovalRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockApprovalModule, [{
    type: NgModule,
    args: [{
      declarations: [StockApproval],
      exports: [StockApproval],
      imports: [
        CommonModule,
        StockApprovalRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatCardModule,
        MatButtonModule
      ]
    }]
  }], null, null);
})();

export {
  StockApprovalModule
};
//# sourceMappingURL=chunk-7DQMMLXF.js.map
