import {
  ProjectTimeline,
  ProjectsModule
} from "./chunk-QL7FDZME.js";
import "./chunk-QL3YK52R.js";
import "./chunk-SWZ3X6NF.js";
import "./chunk-5KTYSB25.js";
import "./chunk-EXICJZOE.js";
import "./chunk-BSTSO5UF.js";
import {
  ProjectService
} from "./chunk-52DGP4Y7.js";
import "./chunk-2M3NZLNK.js";
import "./chunk-VKQYMIUT.js";
import "./chunk-KSOTQAYO.js";
import "./chunk-3OEUFLPR.js";
import "./chunk-26HEUADP.js";
import "./chunk-KPIKLNUA.js";
import "./chunk-DRAYAONG.js";
import "./chunk-T3AUGCAJ.js";
import "./chunk-QR7MRZIR.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-YLIHD5YA.js";
import "./chunk-A27VMC3V.js";
import {
  CommonModule,
  Component,
  NgForOf,
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
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-23RKHPSU.js";

// src/app/modules/timeline/timeline.ts
function Timeline_option_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("value", p_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.name);
  }
}
var Timeline = class _Timeline {
  projectService;
  projects = [];
  selectedProjectId = "all";
  constructor(projectService) {
    this.projectService = projectService;
  }
  ngOnInit() {
    this.loadProjects();
  }
  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
      },
      error: (err) => {
        console.error("Failed to load projects list in timeline:", err);
      }
    });
  }
  onProjectChange(projectId) {
    this.selectedProjectId = projectId;
  }
  static \u0275fac = function Timeline_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Timeline)(\u0275\u0275directiveInject(ProjectService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Timeline, selectors: [["app-timeline"]], standalone: false, decls: 22, vars: 3, consts: [[1, "bg-slate-50/50", "dark:bg-slate-950", "min-h-screen", "animate-in", "p-4", "sm:p-6", "lg:p-8"], [1, "flex", "flex-col", "sm:flex-row", "sm:justify-between", "sm:items-center", "gap-4", "mb-8"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "px-2.5", "py-0.5", "rounded-full", "bg-blue-500/10", "text-blue-600", "dark:text-blue-400", "border", "border-blue-500/20"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "text-sm"], [1, "flex", "items-center", "gap-3", "w-full", "sm:w-auto"], [1, "flex", "items-center", "gap-2", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "px-4", "py-2.5", "rounded-2xl", "shadow-sm"], [1, "material-symbols-outlined", "text-slate-400", "text-[18px]"], [1, "text-xs", "font-bold", "text-slate-500", "dark:text-slate-400", "whitespace-nowrap"], [1, "bg-transparent", "text-xs", "font-black", "text-slate-800", "dark:text-white", "outline-none", "cursor-pointer", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], [1, "w-full"], [3, "projectId"], [3, "value"]], template: function Timeline_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span", 3);
      \u0275\u0275text(5, " Project Management \u2022 Interactive Schedule ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 4);
      \u0275\u0275text(7, "Gantt Timeline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9, " Multi-project master schedule, work breakdown milestones, sub-milestones, active site progress, and date dependencies. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "span", 8);
      \u0275\u0275text(13, "domain");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "label", 9);
      \u0275\u0275text(15, "Filter Project:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "select", 10);
      \u0275\u0275twoWayListener("ngModelChange", function Timeline_Template_select_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedProjectId, $event) || (ctx.selectedProjectId = $event);
        return $event;
      });
      \u0275\u0275listener("change", function Timeline_Template_select_change_16_listener() {
        return ctx.onProjectChange(ctx.selectedProjectId);
      });
      \u0275\u0275elementStart(17, "option", 11);
      \u0275\u0275text(18, "All Projects (Portfolio View)");
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, Timeline_option_19_Template, 2, 2, "option", 12);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "div", 13);
      \u0275\u0275element(21, "app-project-timeline", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedProjectId);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.projects);
      \u0275\u0275advance(2);
      \u0275\u0275property("projectId", ctx.selectedProjectId);
    }
  }, dependencies: [NgForOf, ProjectTimeline, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Timeline, [{
    type: Component,
    args: [{ selector: "app-timeline", standalone: false, template: '<div class="bg-slate-50/50 dark:bg-slate-950 min-h-screen animate-in p-4 sm:p-6 lg:p-8">\n  <!-- Page Header -->\n  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">\n    <div>\n      <div class="flex items-center gap-2 mb-1">\n        <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">\n          Project Management \u2022 Interactive Schedule\n        </span>\n      </div>\n      <h1 class="text-3xl font-black text-slate-800 dark:text-white">Gantt Timeline</h1>\n      <p class="text-slate-500 dark:text-slate-400 text-sm">\n        Multi-project master schedule, work breakdown milestones, sub-milestones, active site progress, and date dependencies.\n      </p>\n    </div>\n\n    <!-- Project Filter Dropdown -->\n    <div class="flex items-center gap-3 w-full sm:w-auto">\n      <div class="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl shadow-sm">\n        <span class="material-symbols-outlined text-slate-400 text-[18px]">domain</span>\n        <label class="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">Filter Project:</label>\n        <select [(ngModel)]="selectedProjectId" (change)="onProjectChange(selectedProjectId)"\n          class="bg-transparent text-xs font-black text-slate-800 dark:text-white outline-none cursor-pointer">\n          <option value="all">All Projects (Portfolio View)</option>\n          <option *ngFor="let p of projects" [value]="p.id">{{ p.name }}</option>\n        </select>\n      </div>\n    </div>\n  </div>\n\n  <!-- Interactive Gantt Timeline Widget -->\n  <div class="w-full">\n    <app-project-timeline [projectId]="selectedProjectId"></app-project-timeline>\n  </div>\n</div>' }]
  }], () => [{ type: ProjectService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Timeline, { className: "Timeline", filePath: "app/modules/timeline/timeline.ts", lineNumber: 10 });
})();

// src/app/modules/timeline/timeline-routing-module.ts
var routes = [{ path: "", component: Timeline }];
var TimelineRoutingModule = class _TimelineRoutingModule {
  static \u0275fac = function TimelineRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimelineRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _TimelineRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimelineRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/timeline/timeline-module.ts
var TimelineModule = class _TimelineModule {
  static \u0275fac = function TimelineModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimelineModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _TimelineModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, TimelineRoutingModule, ProjectsModule, FormsModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimelineModule, [{
    type: NgModule,
    args: [{
      declarations: [Timeline],
      imports: [CommonModule, TimelineRoutingModule, ProjectsModule, FormsModule]
    }]
  }], null, null);
})();
export {
  TimelineModule
};
//# sourceMappingURL=chunk-UEQC25DI.js.map
