import {
  FormsModule
} from "./chunk-YLIHD5YA.js";
import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  NgForOf,
  NgModule,
  Router,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-23RKHPSU.js";

// src/app/modules/dashboard/services/dashboard.service.ts
var DashboardService = class _DashboardService {
  http;
  baseUrl = `${environment.serverUrl}/api/v1/dashboard`;
  constructor(http) {
    this.http = http;
  }
  getDashboardStats() {
    return this.http.get(this.baseUrl);
  }
  static \u0275fac = function DashboardService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/dashboard/dashboard.ts
function Dashboard_div_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 1)(2, "div", 32)(3, "span", 5);
    \u0275\u0275text(4, " apartment ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "h4", 33);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 20);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 34)(11, "p", 35);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 36);
    \u0275\u0275element(14, "div", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r1 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", project_r1.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", project_r1.address, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", project_r1.progress || 0, "% Completed ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", project_r1.progress || 0, "%");
  }
}
var Dashboard = class _Dashboard {
  dashboardService;
  router;
  stats = {
    totalBudget: 0,
    projects: { total: 0, thisMonth: 0, projectList: [] },
    materials: { total: 0, newAdded: 0 },
    equipment: { total: 0, active: 0 }
  };
  constructor(dashboardService, router) {
    this.dashboardService = dashboardService;
    this.router = router;
  }
  ngOnInit() {
    this.loadDashboardStats();
  }
  goToAddMaterial() {
    this.router.navigate(["/master/masters/material"]);
  }
  goToAddEquipment() {
    this.router.navigate(["/master/masters/equipment"]);
  }
  goToAddQuote() {
    this.router.navigate(["/master/resources/quotations"]);
  }
  goToAddVendor() {
    this.router.navigate(["/master/resources/vendors"]);
  }
  goToProjects() {
    this.router.navigate(["/master/projects"]);
  }
  goToPortfolio() {
    this.router.navigate(["/master/portfolio"]);
  }
  formatBudget(value) {
    if (!value)
      return "0";
    if (value >= 1e6) {
      return (value / 1e6).toFixed(2).replace(/\.00$/, "") + " M";
    }
    if (value >= 1e5) {
      return (value / 1e5).toFixed(2).replace(/\.00$/, "") + " L";
    }
    if (value >= 1e3) {
      return (value / 1e3).toFixed(2).replace(/\.00$/, "") + " K";
    }
    return value.toString();
  }
  loadDashboardStats() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res) => {
        if (res?.success && res?.data) {
          this.stats = {
            totalBudget: res.data.totalBudget ?? 0,
            projects: {
              total: res.data.projects?.total ?? 0,
              thisMonth: res.data.projects?.thisMonth ?? 0,
              projectList: res.data.projects?.projectList ?? []
            },
            materials: {
              total: res.data.materials?.total ?? 0,
              newAdded: res.data.materials?.newAdded ?? 0
            },
            equipment: {
              total: res.data.equipment?.total ?? 0,
              active: res.data.equipment?.active ?? 0
            }
          };
        }
      },
      error: () => {
        this.stats = {
          totalBudget: 0,
          projects: { total: 0, thisMonth: 0, projectList: [] },
          materials: { total: 0, newAdded: 0 },
          equipment: { total: 0, active: 0 }
        };
      }
    });
  }
  static \u0275fac = function Dashboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dashboard)(\u0275\u0275directiveInject(DashboardService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Dashboard, selectors: [["app-dashboard"]], standalone: false, decls: 94, vars: 8, consts: [["type", "button", 1, "w-full", "mb-8", "flex", "items-center", "justify-between", "gap-4", "rounded-3xl", "p-6", "text-left", "text-white", "bg-gradient-to-r", "from-slate-900", "via-slate-800", "to-blue-900", "shadow-sm", "hover:shadow-lg", "transition", 3, "click"], [1, "flex", "items-center", "gap-4"], [1, "material-symbols-outlined", "text-4xl"], [1, "text-lg", "font-black"], [1, "text-sm", "text-slate-300"], [1, "material-symbols-outlined", "text-3xl"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-4", "gap-6", "mb-8"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "p-6", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-between", "mb-5"], [1, "text-slate-400", "text-sm", "font-bold", "uppercase", "tracking-wide"], [1, "text-4xl", "font-black", "text-slate-900", "dark:text-white", "mt-2"], [1, "w-16", "h-16", "rounded-3xl", "bg-blue-50", "flex", "items-center", "justify-center", "text-blue-600"], [1, "text-emerald-500", "font-bold", "text-sm"], [1, "w-16", "h-16", "rounded-3xl", "bg-violet-50", "flex", "items-center", "justify-center", "text-violet-600"], [1, "w-16", "h-16", "rounded-3xl", "bg-amber-50", "flex", "items-center", "justify-center", "text-amber-600"], [1, "w-16", "h-16", "rounded-3xl", "bg-emerald-50", "flex", "items-center", "justify-center", "text-emerald-600"], [1, "grid", "grid-cols-1", "xl:grid-cols-3", "gap-6"], [1, "xl:col-span-2", "bg-white", "dark:bg-slate-900", "rounded-3xl", "p-6", "shadow-sm", "border", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-white"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "space-y-4"], ["class", "flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 hover:shadow-lg transition-all", 4, "ngFor", "ngForOf"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-white", "mb-6"], [1, "grid", "grid-cols-2", "gap-4"], [1, "p-5", "rounded-3xl", "bg-blue-50", "hover:bg-blue-100", "transition-all", "text-blue-600", "flex", "flex-col", "items-center", "gap-3", 3, "click"], [1, "font-black", "text-sm"], [1, "p-5", "rounded-3xl", "bg-violet-50", "hover:bg-violet-100", "transition-all", "text-violet-600", "flex", "flex-col", "items-center", "gap-3", 3, "click"], [1, "p-5", "rounded-3xl", "bg-emerald-50", "hover:bg-emerald-100", "transition-all", "text-emerald-600", "flex", "flex-col", "items-center", "gap-3", 3, "click"], [1, "p-5", "rounded-3xl", "bg-amber-50", "hover:bg-amber-100", "transition-all", "text-amber-600", "flex", "flex-col", "items-center", "gap-3", 3, "click"], [1, "flex", "items-center", "justify-between", "p-5", "rounded-3xl", "bg-slate-50", "dark:bg-slate-800/60", "hover:shadow-lg", "transition-all"], [1, "w-14", "h-14", "rounded-2xl", "bg-blue-100", "text-blue-600", "flex", "items-center", "justify-center"], [1, "font-black", "text-slate-800", "dark:text-white", "text-lg"], [1, "text-right"], [1, "text-sm", "font-black", "text-emerald-600"], [1, "w-40", "h-2", "rounded-full", "bg-slate-200", "mt-2", "overflow-hidden"], [1, "h-full", "rounded-full", "bg-gradient-to-r", "from-primary", "to-violet-500"]], template: function Dashboard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "button", 0);
      \u0275\u0275listener("click", function Dashboard_Template_button_click_0_listener() {
        return ctx.goToPortfolio();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "monitoring");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div")(5, "p", 3);
      \u0275\u0275text(6, "Portfolio Command Center");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Cost and schedule indices, risk by project, committed cash-out, critical path and subcontractor scores.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "span", 5);
      \u0275\u0275text(10, "arrow_forward");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 6)(12, "div", 7)(13, "div", 8)(14, "div")(15, "p", 9);
      \u0275\u0275text(16, " Total Projects ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "h2", 10);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 11)(20, "span", 5);
      \u0275\u0275text(21, " domain ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "p", 12);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 7)(25, "div", 8)(26, "div")(27, "p", 9);
      \u0275\u0275text(28, " Materials ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "h2", 10);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 13)(32, "span", 5);
      \u0275\u0275text(33, " inventory_2 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "p", 12);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div", 7)(37, "div", 8)(38, "div")(39, "p", 9);
      \u0275\u0275text(40, " Equipment ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "h2", 10);
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 14)(44, "span", 5);
      \u0275\u0275text(45, " engineering ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(46, "p", 12);
      \u0275\u0275text(47);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div", 7)(49, "div", 8)(50, "div")(51, "p", 9);
      \u0275\u0275text(52, " Total Budget ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "h2", 10);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 15)(56, "span", 5);
      \u0275\u0275text(57, " payments ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(58, "div", 16)(59, "div", 17)(60, "div", 18)(61, "div")(62, "h3", 19);
      \u0275\u0275text(63, " Active Projects ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "p", 20);
      \u0275\u0275text(65, " Current running construction sites ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "button", 21);
      \u0275\u0275listener("click", function Dashboard_Template_button_click_66_listener() {
        return ctx.goToProjects();
      });
      \u0275\u0275text(67, " View All ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "div", 22);
      \u0275\u0275template(69, Dashboard_div_69_Template, 15, 5, "div", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div", 7)(71, "h3", 24);
      \u0275\u0275text(72, " Quick Actions ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "div", 25)(74, "button", 26);
      \u0275\u0275listener("click", function Dashboard_Template_button_click_74_listener() {
        return ctx.goToAddMaterial();
      });
      \u0275\u0275elementStart(75, "span", 2);
      \u0275\u0275text(76, " add_box ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "span", 27);
      \u0275\u0275text(78, " Add Material ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(79, "button", 28);
      \u0275\u0275listener("click", function Dashboard_Template_button_click_79_listener() {
        return ctx.goToAddQuote();
      });
      \u0275\u0275elementStart(80, "span", 2);
      \u0275\u0275text(81, " receipt_long ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "span", 27);
      \u0275\u0275text(83, " Create Quote ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(84, "button", 29);
      \u0275\u0275listener("click", function Dashboard_Template_button_click_84_listener() {
        return ctx.goToAddVendor();
      });
      \u0275\u0275elementStart(85, "span", 2);
      \u0275\u0275text(86, " groups ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "span", 27);
      \u0275\u0275text(88, " Vendors ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(89, "button", 30);
      \u0275\u0275listener("click", function Dashboard_Template_button_click_89_listener() {
        return ctx.goToAddEquipment();
      });
      \u0275\u0275elementStart(90, "span", 2);
      \u0275\u0275text(91, " precision_manufacturing ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "span", 27);
      \u0275\u0275text(93, " Equipment ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275textInterpolate1(" ", ctx.stats.projects.total, " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" +", ctx.stats.projects.thisMonth, " This Month ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.stats.materials.total, " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" +", ctx.stats.materials.newAdded, " New Added ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.stats.equipment.total, " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.stats.equipment.active, " Active ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.formatBudget(ctx.stats.totalBudget), " ");
      \u0275\u0275advance(15);
      \u0275\u0275property("ngForOf", ctx.stats.projects.projectList);
    }
  }, dependencies: [NgForOf], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dashboard, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: false, template: '<!-- Portfolio command center entry -->\r\n<button type="button" (click)="goToPortfolio()"\r\n  class="w-full mb-8 flex items-center justify-between gap-4 rounded-3xl p-6 text-left text-white bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 shadow-sm hover:shadow-lg transition">\r\n  <div class="flex items-center gap-4">\r\n    <span class="material-symbols-outlined text-4xl">monitoring</span>\r\n    <div>\r\n      <p class="text-lg font-black">Portfolio Command Center</p>\r\n      <p class="text-sm text-slate-300">Cost and schedule indices, risk by project, committed cash-out, critical path and subcontractor scores.</p>\r\n    </div>\r\n  </div>\r\n  <span class="material-symbols-outlined text-3xl">arrow_forward</span>\r\n</button>\r\n\r\n<!-- Stats -->\r\n<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">\r\n\r\n  <!-- Card -->\r\n  <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">\r\n\r\n    <div class="flex items-center justify-between mb-5">\r\n\r\n      <div>\r\n        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">\r\n          Total Projects\r\n        </p>\r\n\r\n        <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-2">\r\n          {{ stats.projects.total }}\r\n        </h2>\r\n      </div>\r\n\r\n      <div class="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600">\r\n        <span class="material-symbols-outlined text-3xl">\r\n          domain\r\n        </span>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <p class="text-emerald-500 font-bold text-sm">\r\n      +{{ stats.projects.thisMonth }} This Month\r\n    </p>\r\n\r\n  </div>\r\n\r\n  <!-- Card -->\r\n  <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">\r\n\r\n    <div class="flex items-center justify-between mb-5">\r\n\r\n      <div>\r\n        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">\r\n          Materials\r\n        </p>\r\n\r\n        <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-2">\r\n          {{ stats.materials.total }}\r\n        </h2>\r\n      </div>\r\n\r\n      <div class="w-16 h-16 rounded-3xl bg-violet-50 flex items-center justify-center text-violet-600">\r\n        <span class="material-symbols-outlined text-3xl">\r\n          inventory_2\r\n        </span>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <p class="text-emerald-500 font-bold text-sm">\r\n      +{{ stats.materials.newAdded }} New Added\r\n    </p>\r\n\r\n  </div>\r\n\r\n  <!-- Card -->\r\n  <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">\r\n\r\n    <div class="flex items-center justify-between mb-5">\r\n\r\n      <div>\r\n        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">\r\n          Equipment\r\n        </p>\r\n\r\n        <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-2">\r\n          {{ stats.equipment.total }}\r\n        </h2>\r\n      </div>\r\n\r\n      <div class="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600">\r\n        <span class="material-symbols-outlined text-3xl">\r\n          engineering\r\n        </span>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <p class="text-emerald-500 font-bold text-sm">\r\n      {{ stats.equipment.active }} Active\r\n    </p>\r\n\r\n  </div>\r\n\r\n  <!-- Card -->\r\n  <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">\r\n\r\n    <div class="flex items-center justify-between mb-5">\r\n\r\n      <div>\r\n        <p class="text-slate-400 text-sm font-bold uppercase tracking-wide">\r\n          Total Budget\r\n        </p>\r\n\r\n        <h2 class="text-4xl font-black text-slate-900 dark:text-white mt-2">\r\n          {{ formatBudget(stats.totalBudget) }}\r\n        </h2>\r\n      </div>\r\n\r\n      <div class="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600">\r\n        <span class="material-symbols-outlined text-3xl">\r\n          payments\r\n        </span>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <!-- <p class="text-emerald-500 font-bold text-sm">\r\n      +18% Growth\r\n    </p> -->\r\n\r\n  </div>\r\n\r\n</div>\r\n\r\n<!-- Main Grid -->\r\n<div class="grid grid-cols-1 xl:grid-cols-3 gap-6">\r\n\r\n  <!-- Projects -->\r\n  <div\r\n    class="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">\r\n\r\n    <div class="flex items-center justify-between mb-6">\r\n\r\n      <div>\r\n        <h3 class="text-2xl font-black text-slate-900 dark:text-white">\r\n          Active Projects\r\n        </h3>\r\n\r\n        <p class="text-sm text-slate-400 mt-1">\r\n          Current running construction sites\r\n        </p>\r\n      </div>\r\n\r\n      <button\r\n        (click)="goToProjects()"\r\n        class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r\n\r\n        View All\r\n      </button>\r\n\r\n    </div>\r\n\r\n    <div class="space-y-4">\r\n\r\n  <div\r\n    *ngFor="let project of stats.projects.projectList"\r\n    class="flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 hover:shadow-lg transition-all">\r\n\r\n    <div class="flex items-center gap-4">\r\n\r\n      <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">\r\n        <span class="material-symbols-outlined text-3xl">\r\n          apartment\r\n        </span>\r\n      </div>\r\n\r\n      <div>\r\n        <h4 class="font-black text-slate-800 dark:text-white text-lg">\r\n          {{ project.name }}\r\n        </h4>\r\n\r\n        <p class="text-sm text-slate-400 mt-1">\r\n          {{ project.address }}\r\n        </p>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class="text-right">\r\n\r\n      <p class="text-sm font-black text-emerald-600">\r\n        {{ project.progress || 0 }}% Completed\r\n      </p>\r\n\r\n      <div class="w-40 h-2 rounded-full bg-slate-200 mt-2 overflow-hidden">\r\n        <div\r\n          class="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"\r\n          [style.width.%]="project.progress || 0">\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>\r\n\r\n  </div>\r\n\r\n  <!-- Quick Actions -->\r\n  <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">\r\n\r\n    <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-6">\r\n      Quick Actions\r\n    </h3>\r\n\r\n    <div class="grid grid-cols-2 gap-4">\r\n\r\n      <button\r\n        (click)="goToAddMaterial()"\r\n        class="p-5 rounded-3xl bg-blue-50 hover:bg-blue-100 transition-all text-blue-600 flex flex-col items-center gap-3">\r\n        <span class="material-symbols-outlined text-4xl">\r\n          add_box\r\n        </span>\r\n\r\n        <span class="font-black text-sm">\r\n          Add Material\r\n        </span>\r\n      </button>\r\n\r\n      <button\r\n        (click)="goToAddQuote()"\r\n        class="p-5 rounded-3xl bg-violet-50 hover:bg-violet-100 transition-all text-violet-600 flex flex-col items-center gap-3">\r\n        <span class="material-symbols-outlined text-4xl">\r\n          receipt_long\r\n        </span>\r\n\r\n        <span class="font-black text-sm">\r\n          Create Quote\r\n        </span>\r\n      </button>\r\n\r\n      <button\r\n        (click)="goToAddVendor()"\r\n        class="p-5 rounded-3xl bg-emerald-50 hover:bg-emerald-100 transition-all text-emerald-600 flex flex-col items-center gap-3">\r\n        <span class="material-symbols-outlined text-4xl">\r\n          groups\r\n        </span>\r\n\r\n        <span class="font-black text-sm">\r\n          Vendors\r\n        </span>\r\n      </button>\r\n\r\n      <button\r\n       (click)="goToAddEquipment()"\r\n        class="p-5 rounded-3xl bg-amber-50 hover:bg-amber-100 transition-all text-amber-600 flex flex-col items-center gap-3">\r\n        <span class="material-symbols-outlined text-4xl">\r\n          precision_manufacturing\r\n        </span>\r\n\r\n        <span class="font-black text-sm">\r\n          Equipment\r\n        </span>\r\n      </button>\r\n\r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>' }]
  }], () => [{ type: DashboardService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "app/modules/dashboard/dashboard.ts", lineNumber: 25 });
})();

// src/app/modules/dashboard/dashboard-routing-module.ts
var routes = [{ path: "", component: Dashboard }];
var DashboardRoutingModule = class _DashboardRoutingModule {
  static \u0275fac = function DashboardRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/dashboard/dashboard-module.ts
var DashboardModule = class _DashboardModule {
  static \u0275fac = function DashboardModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardModule, [{
    type: NgModule,
    args: [{
      declarations: [
        Dashboard
      ],
      imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule
      ]
    }]
  }], null, null);
})();
export {
  DashboardModule
};
//# sourceMappingURL=chunk-FWR4PXWU.js.map
