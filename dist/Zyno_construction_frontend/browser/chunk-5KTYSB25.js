import {
  ProjectService
} from "./chunk-52DGP4Y7.js";
import {
  CommonDialogComponent
} from "./chunk-VKQYMIUT.js";
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
  FormsModule
} from "./chunk-YLIHD5YA.js";
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
} from "./chunk-23RKHPSU.js";

// src/app/modules/stock-approval/stock-approval.ts
var _c0 = (a0, a1, a2) => ({ "bg-amber-100 text-amber-700": a0, "bg-emerald-100 text-emerald-700": a1, "bg-rose-100 text-rose-700": a2 });
function StockApproval_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "div", 16);
    \u0275\u0275elementEnd();
  }
}
function StockApproval_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 19);
    \u0275\u0275text(4, " No Stock Requests Found ");
    \u0275\u0275elementEnd()();
  }
}
function StockApproval_div_21_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "button", 41);
    \u0275\u0275listener("click", function StockApproval_div_21_div_42_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const request_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openApproveDialog(request_r2.id));
    });
    \u0275\u0275elementStart(2, "span", 42);
    \u0275\u0275text(3, " task_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Approve");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 43);
    \u0275\u0275listener("click", function StockApproval_div_21_div_42_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const request_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openRejectDialog(request_r2.id));
    });
    \u0275\u0275elementStart(7, "span", 42);
    \u0275\u0275text(8, " cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Reject");
    \u0275\u0275elementEnd()()();
  }
}
function StockApproval_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "div", 22)(3, "div", 23)(4, "span", 24);
    \u0275\u0275text(5, " inventory ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h3", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 26);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 27)(11, "span", 28);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 29)(14, "div", 30)(15, "div", 31)(16, "p", 32);
    \u0275\u0275text(17, " Requested Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h4", 33);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 31)(21, "p", 32);
    \u0275\u0275text(22, " Available Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "h4", 33);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 34)(26, "div", 35)(27, "span", 36);
    \u0275\u0275text(28, " Material ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 37);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 35)(32, "span", 36);
    \u0275\u0275text(33, " Project ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 37);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 35)(37, "span", 36);
    \u0275\u0275text(38, " Created ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 38);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(42, StockApproval_div_21_div_42_Template, 11, 0, "div", 39);
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
  selectedFilter = "all";
  filteredRequests = [];
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
      // next: (res: any) => {
      //   this.stockRequests = res.data || [];
      //   console.log("ddkjdkkdjkkdjf",res.data)
      //   this.loading = false;
      // },
      next: (res) => {
        this.stockRequests = res.data || [];
        this.filterRequests(this.selectedFilter);
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
        this.filterRequests(this.selectedFilter);
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
        this.filterRequests(this.selectedFilter);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  showRequestDialog = false;
  dialogData = {
    title: "",
    subtitle: "",
    action: "",
    requestId: null
  };
  openApproveDialog(id) {
    this.dialogData = {
      title: "Approve Request",
      subtitle: "Are you sure you want to approve this request?",
      action: "approve",
      requestId: id
    };
    this.showRequestDialog = true;
  }
  openRejectDialog(id) {
    this.dialogData = {
      title: "Reject Request",
      subtitle: "Are you sure you want to reject this request?",
      action: "reject",
      requestId: id
    };
    this.showRequestDialog = true;
  }
  confirmAction() {
    if (this.dialogData.action === "approve") {
      this.approveRequest(this.dialogData.requestId);
    }
    if (this.dialogData.action === "reject") {
      this.rejectRequest(this.dialogData.requestId);
    }
    this.closeDialog();
  }
  closeDialog() {
    this.showRequestDialog = false;
  }
  filterRequests(status) {
    this.selectedFilter = status;
    if (status === "all") {
      this.filteredRequests = [...this.stockRequests];
      return;
    }
    this.filteredRequests = this.stockRequests.filter((request) => request.status?.toLowerCase() === status);
  }
  static \u0275fac = function StockApproval_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockApproval)(\u0275\u0275directiveInject(ProjectService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockApproval, selectors: [["app-stock-approval"]], standalone: false, decls: 28, vars: 14, consts: [[1, "p-4", "sm:p-6", "flex", "flex-col", "gap-6", "animate-in", "fade-in", "duration-500"], [1, "flex", "flex-col", "xl:flex-row", "xl:items-center", "xl:justify-between", "gap-5"], [1, "text-2xl", "sm:text-3xl", "font-black", "text-slate-800", "dark:text-white", "tracking-tight"], [1, "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "flex", "flex-wrap", "items-center", "justify-start", "xl:justify-center", "gap-2", "overflow-x-auto", "custom-scrollbar", "smooth-scroll", "pb-1"], [1, "shrink-0", "px-6", "py-2.5", "rounded-full", "text-sm", "font-bold", "transition-all", "duration-300", 3, "click", "ngClass"], [1, "px-5", "py-3", "rounded-2xl", "bg-primary/10", "text-primary", "font-bold", "text-sm", "w-fit", "shrink-0"], ["class", "flex items-center justify-center py-20", 4, "ngIf"], ["class", "rounded-3xl border border-dashed border-slate-300 dark:border-slate-700\n           p-10 sm:p-16 text-center bg-white dark:bg-slate-900", 4, "ngIf"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-3", "gap-6"], ["class", "group rounded-[28px] overflow-hidden\n             bg-white dark:bg-slate-900\n             border border-slate-200 dark:border-slate-800\n             shadow-sm hover:shadow-2xl\n             hover:-translate-y-1 transition-all duration-300", 4, "ngFor", "ngForOf"], ["maxWidth", "max-w-xl", "icon", "warning", "cancelLabel", "Cancel", "primaryLabel", "Confirm", 3, "closed", "primary", "open", "title", "subtitle", "showCloseButton", "showFooter"], [1, "p-6", "sm:p-8", "text-center", "max-h-[60vh]", "overflow-y-auto", "custom-scrollbar", "smooth-scroll"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-amber-700", "text-xs", "mt-3"], [1, "flex", "items-center", "justify-center", "py-20"], [1, "h-14", "w-14", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "rounded-3xl", "border", "border-dashed", "border-slate-300", "dark:border-slate-700", "p-10", "sm:p-16", "text-center", "bg-white", "dark:bg-slate-900"], [1, "material-symbols-outlined", "text-6xl", "text-slate-400"], [1, "mt-4", "text-xl", "font-bold", "text-slate-700", "dark:text-white"], [1, "group", "rounded-[28px]", "overflow-hidden", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "shadow-sm", "hover:shadow-2xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "p-6", "border-b", "border-slate-100", "dark:border-slate-800", "flex", "items-start", "justify-between", "gap-4"], [1, "min-w-0"], [1, "h-14", "w-14", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center", "mb-4"], [1, "material-symbols-outlined", "text-3xl"], [1, "text-lg", "font-bold", "text-slate-800", "dark:text-white", "leading-snug", "break-words"], [1, "text-sm", "text-slate-500", "mt-1"], [1, "shrink-0"], [1, "px-4", "py-2", "rounded-full", "text-xs", "font-bold", "uppercase", "tracking-wide", "whitespace-nowrap", 3, "ngClass"], [1, "p-6", "flex", "flex-col", "gap-4"], [1, "grid", "grid-cols-2", "gap-4"], [1, "rounded-2xl", "bg-slate-50", "dark:bg-slate-800", "p-4"], [1, "text-xs", "text-slate-500", "mb-1"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white"], [1, "flex", "flex-col", "gap-3", "text-sm"], [1, "flex", "items-center", "justify-between", "gap-2"], [1, "text-slate-500", "shrink-0"], [1, "font-bold", "text-slate-700", "dark:text-slate-200", "truncate"], [1, "font-semibold", "text-slate-700", "dark:text-slate-200", "truncate"], ["class", "p-6 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4", 4, "ngIf"], [1, "p-6", "pt-0", "flex", "flex-col", "sm:flex-row", "items-stretch", "sm:items-center", "gap-4"], [1, "group", "flex-1", "h-12", "rounded-2xl", "bg-gradient-to-r", "from-emerald-500", "via-green-500", "to-teal-500", "hover:from-emerald-400", "hover:via-green-400", "hover:to-teal-400", "text-white", "font-bold", "tracking-wide", "shadow-[0_10px_25px_rgba(16,185,129,0.35)]", "hover:shadow-[0_15px_35px_rgba(16,185,129,0.55)]", "transition-all", "duration-300", "hover:-translate-y-1", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[20px]", "transition-transform", "duration-300", "group-hover:scale-125"], [1, "group", "flex-1", "h-12", "rounded-2xl", "bg-gradient-to-r", "from-rose-500", "via-red-500", "to-pink-500", "hover:from-rose-400", "hover:via-red-400", "hover:to-pink-400", "text-white", "font-bold", "tracking-wide", "shadow-[0_10px_25px_rgba(244,63,94,0.35)]", "hover:shadow-[0_15px_35px_rgba(244,63,94,0.55)]", "transition-all", "duration-300", "hover:-translate-y-1", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click"]], template: function StockApproval_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, " Stock Requests ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Manage all material stock requests easily ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "button", 5);
      \u0275\u0275listener("click", function StockApproval_Template_button_click_8_listener() {
        return ctx.filterRequests("all");
      });
      \u0275\u0275text(9, " All ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function StockApproval_Template_button_click_10_listener() {
        return ctx.filterRequests("pending");
      });
      \u0275\u0275text(11, " Pending ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 5);
      \u0275\u0275listener("click", function StockApproval_Template_button_click_12_listener() {
        return ctx.filterRequests("approved");
      });
      \u0275\u0275text(13, " Approved ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 5);
      \u0275\u0275listener("click", function StockApproval_Template_button_click_14_listener() {
        return ctx.filterRequests("rejected");
      });
      \u0275\u0275text(15, " Rejected ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 6);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, StockApproval_div_18_Template, 2, 0, "div", 7)(19, StockApproval_div_19_Template, 5, 0, "div", 8);
      \u0275\u0275elementStart(20, "div", 9);
      \u0275\u0275template(21, StockApproval_div_21_Template, 43, 17, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "app-common-dialog", 11);
      \u0275\u0275listener("closed", function StockApproval_Template_app_common_dialog_closed_22_listener() {
        return ctx.closeDialog();
      })("primary", function StockApproval_Template_app_common_dialog_primary_22_listener() {
        return ctx.confirmAction();
      });
      \u0275\u0275elementStart(23, "div", 12)(24, "p", 13);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p", 14);
      \u0275\u0275text(27, " This action will update the request status immediately and cannot be undone later. ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("ngClass", ctx.selectedFilter === "all" ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", ctx.selectedFilter === "pending" ? "bg-amber-500 text-white shadow-md shadow-amber-500/30" : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", ctx.selectedFilter === "approved" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", ctx.selectedFilter === "rejected" ? "bg-rose-500 text-white shadow-md shadow-rose-500/30" : "bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" Total Requests : ", ctx.filteredRequests.length || 0, " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredRequests.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredRequests);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showRequestDialog)("title", ctx.dialogData.title)("subtitle", ctx.dialogData.subtitle)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.dialogData.subtitle, " ");
    }
  }, dependencies: [NgClass, NgForOf, NgIf, CommonDialogComponent, DatePipe], styles: ["\n.container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 600;\n  margin-bottom: 24px;\n  color: #1f2937;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 18px;\n  margin-top: 40px;\n}\n.request-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.request-card[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  transition: 0.3s ease;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.request-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n}\nmat-card-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n  font-size: 22px;\n  color: #111827;\n}\nmat-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font-size: 15px;\n  color: #4b5563;\n}\nmat-card-actions[_ngcontent-%COMP%] {\n  padding: 16px;\n  display: flex;\n  gap: 10px;\n}\n.details-card[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);\n}\n.details-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.pending[_ngcontent-%COMP%] {\n  color: orange;\n  font-weight: bold;\n}\n.approved[_ngcontent-%COMP%] {\n  color: green;\n  font-weight: bold;\n}\n.rejected[_ngcontent-%COMP%] {\n  color: red;\n  font-weight: bold;\n}\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n}\n/*# sourceMappingURL=stock-approval.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StockApproval, [{
    type: Component,
    args: [{ selector: "app-stock-approval", standalone: false, template: `<section class="p-4 sm:p-6 flex flex-col gap-6 animate-in fade-in duration-500">\r
  <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">\r
\r
    <div>\r
      <h2 class="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">\r
        Stock Requests\r
      </h2>\r
\r
      <p class="text-slate-500 dark:text-slate-400 mt-1">\r
        Manage all material stock requests easily\r
      </p>\r
    </div>\r
\r
    <div\r
      class="flex flex-wrap items-center justify-start xl:justify-center gap-2 overflow-x-auto custom-scrollbar smooth-scroll pb-1">\r
\r
      <button (click)="filterRequests('all')" [ngClass]="selectedFilter === 'all'\r
      ? 'bg-primary text-white shadow-md shadow-primary/30'\r
      : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary'"\r
        class="shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300">\r
\r
        All\r
      </button>\r
\r
      <button (click)="filterRequests('pending')" [ngClass]="selectedFilter === 'pending'\r
      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'\r
      : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600'"\r
        class="shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300">\r
\r
        Pending\r
      </button>\r
\r
      <button (click)="filterRequests('approved')" [ngClass]="selectedFilter === 'approved'\r
      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'\r
      : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'"\r
        class="shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300">\r
\r
        Approved\r
      </button>\r
\r
      <button (click)="filterRequests('rejected')" [ngClass]="selectedFilter === 'rejected'\r
      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'\r
      : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600'"\r
        class="shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300">\r
\r
        Rejected\r
      </button>\r
\r
    </div>\r
\r
    <div class="px-5 py-3 rounded-2xl bg-primary/10 text-primary font-bold text-sm w-fit shrink-0">\r
      Total Requests : {{ filteredRequests.length || 0 }}\r
    </div>\r
\r
  </div>\r
\r
  <div *ngIf="loading" class="flex items-center justify-center py-20">\r
    <div class="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin">\r
    </div>\r
  </div>\r
\r
  <div *ngIf="!loading && filteredRequests.length === 0" class="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700\r
           p-10 sm:p-16 text-center bg-white dark:bg-slate-900">\r
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
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">\r
\r
    <div *ngFor="let request of filteredRequests" class="group rounded-[28px] overflow-hidden\r
             bg-white dark:bg-slate-900\r
             border border-slate-200 dark:border-slate-800\r
             shadow-sm hover:shadow-2xl\r
             hover:-translate-y-1 transition-all duration-300">\r
\r
      <div class="p-6 border-b border-slate-100 dark:border-slate-800\r
               flex items-start justify-between gap-4">\r
\r
        <div class="min-w-0">\r
\r
          <div class="h-14 w-14 rounded-2xl bg-primary/10 text-primary\r
                   flex items-center justify-center mb-4">\r
\r
            <span class="material-symbols-outlined text-3xl">\r
              inventory\r
            </span>\r
\r
          </div>\r
\r
          <h3 class="text-lg font-bold text-slate-800 dark:text-white leading-snug break-words">\r
            {{ request.task_title }}\r
          </h3>\r
\r
          <p class="text-sm text-slate-500 mt-1">\r
            Request ID #{{ request.id }}\r
          </p>\r
\r
        </div>\r
\r
        <div class="shrink-0">\r
\r
          <span class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap" [ngClass]="{\r
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
      <div class="p-6 flex flex-col gap-4">\r
\r
        <div class="grid grid-cols-2 gap-4">\r
\r
          <div class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
\r
            <p class="text-xs text-slate-500 mb-1">\r
              Requested Qty\r
            </p>\r
\r
            <h4 class="text-xl font-black text-slate-800 dark:text-white">\r
              {{ request.requested_qty }}\r
            </h4>\r
\r
          </div>\r
\r
          <div class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
\r
            <p class="text-xs text-slate-500 mb-1">\r
              Available Qty\r
            </p>\r
\r
            <h4 class="text-xl font-black text-slate-800 dark:text-white">\r
              {{ request.available_qty }}\r
            </h4>\r
\r
          </div>\r
\r
        </div>\r
\r
        <div class="flex flex-col gap-3 text-sm">\r
\r
          <div class="flex items-center justify-between gap-2">\r
\r
            <span class="text-slate-500 shrink-0">\r
              Material ID\r
            </span>\r
\r
            <span class="font-bold text-slate-700 dark:text-slate-200 truncate">\r
              #{{ request.material_id }}\r
            </span>\r
\r
          </div>\r
\r
          <div class="flex items-center justify-between gap-2">\r
\r
            <span class="text-slate-500 shrink-0">\r
              Project ID\r
            </span>\r
\r
            <span class="font-bold text-slate-700 dark:text-slate-200 truncate">\r
              #{{ request.project_id }}\r
            </span>\r
\r
          </div>\r
\r
          <div class="flex items-center justify-between gap-2">\r
\r
            <span class="text-slate-500 shrink-0">\r
              Created\r
            </span>\r
\r
            <span class="font-semibold text-slate-700 dark:text-slate-200 truncate">\r
              {{ request.createdAt | date:'mediumDate' }}\r
            </span>\r
\r
          </div>\r
\r
        </div>\r
\r
      </div>\r
\r
      <div *ngIf="request.status === 'pending'"\r
        class="p-6 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">\r
        <button (click)="openApproveDialog(request.id)" class="group flex-1 h-12 rounded-2xl\r
           bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500\r
           hover:from-emerald-400 hover:via-green-400 hover:to-teal-400\r
           text-white font-bold tracking-wide\r
           shadow-[0_10px_25px_rgba(16,185,129,0.35)]\r
           hover:shadow-[0_15px_35px_rgba(16,185,129,0.55)]\r
           transition-all duration-300\r
           hover:-translate-y-1\r
           flex items-center justify-center gap-2 cursor-pointer">\r
\r
          <span class="material-symbols-outlined text-[20px]\r
             transition-transform duration-300\r
             group-hover:scale-125">\r
            task_alt\r
          </span>\r
\r
          <span>Approve</span>\r
\r
        </button>\r
\r
        <button (click)="openRejectDialog(request.id)" class="group flex-1 h-12 rounded-2xl\r
           bg-gradient-to-r from-rose-500 via-red-500 to-pink-500\r
           hover:from-rose-400 hover:via-red-400 hover:to-pink-400\r
           text-white font-bold tracking-wide\r
           shadow-[0_10px_25px_rgba(244,63,94,0.35)]\r
           hover:shadow-[0_15px_35px_rgba(244,63,94,0.55)]\r
           transition-all duration-300\r
           hover:-translate-y-1\r
           flex items-center justify-center gap-2 cursor-pointer">\r
\r
          <span class="material-symbols-outlined text-[20px]\r
             transition-transform duration-300\r
             group-hover:scale-125">\r
            cancel\r
          </span>\r
\r
          <span>Reject</span>\r
\r
        </button>\r
\r
      </div>\r
    </div>\r
\r
  </div>\r
\r
  <app-common-dialog [open]="showRequestDialog" maxWidth="max-w-xl" [title]="dialogData.title"\r
    [subtitle]="dialogData.subtitle" icon="warning" [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel"\r
    primaryLabel="Confirm" (closed)="closeDialog()" (primary)="confirmAction()">\r
\r
    <div class="p-6 sm:p-8 text-center max-h-[60vh] overflow-y-auto custom-scrollbar smooth-scroll">\r
      <p class="text-outline text-sm font-medium">\r
        {{ dialogData.subtitle }}\r
      </p>\r
\r
      <p class="text-amber-700 text-xs mt-3">\r
        This action will update the request status immediately and cannot be undone later.\r
      </p>\r
    </div>\r
\r
\r
  </app-common-dialog>\r
\r
\r
</section>`, styles: ["/* src/app/modules/stock-approval/stock-approval.scss */\n.container {\n  padding: 24px;\n  background: #f5f7fb;\n  min-height: 100vh;\n}\n.title {\n  font-size: 28px;\n  font-weight: 600;\n  margin-bottom: 24px;\n  color: #1f2937;\n}\n.loading {\n  text-align: center;\n  font-size: 18px;\n  margin-top: 40px;\n}\n.request-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.request-card {\n  border-radius: 16px;\n  transition: 0.3s ease;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.request-card:hover {\n  transform: translateY(-4px);\n}\nmat-card-content h3 {\n  margin-bottom: 14px;\n  font-size: 22px;\n  color: #111827;\n}\nmat-card-content p {\n  margin: 8px 0;\n  font-size: 15px;\n  color: #4b5563;\n}\nmat-card-actions {\n  padding: 16px;\n  display: flex;\n  gap: 10px;\n}\n.details-card {\n  margin-top: 30px;\n  padding: 20px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);\n}\n.details-card h2 {\n  margin-bottom: 16px;\n}\n.pending {\n  color: orange;\n  font-weight: bold;\n}\n.approved {\n  color: green;\n  font-weight: bold;\n}\n.rejected {\n  color: red;\n  font-weight: bold;\n}\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll {\n  scroll-behavior: smooth;\n}\n/*# sourceMappingURL=stock-approval.css.map */\n"] }]
  }], () => [{ type: ProjectService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockApproval, { className: "StockApproval", filePath: "app/modules/stock-approval/stock-approval.ts", lineNumber: 12 });
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
    MatButtonModule,
    CommonDialogComponent
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
        MatButtonModule,
        CommonDialogComponent
      ]
    }]
  }], null, null);
})();

export {
  StockApprovalModule
};
//# sourceMappingURL=chunk-5KTYSB25.js.map
