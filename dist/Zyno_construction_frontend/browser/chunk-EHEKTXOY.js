import {
  TaskManagement
} from "./chunk-V5A7NUGT.js";
import {
  ProjectService
} from "./chunk-VBCWJQVV.js";
import "./chunk-WS53KIOQ.js";
import "./chunk-5YJQBWTN.js";
import {
  MatOption,
  MatSelect,
  MatSelectModule
} from "./chunk-E3SOVO5U.js";
import {
  MatFormField,
  MatFormFieldModule
} from "./chunk-NKQ2I3NH.js";
import "./chunk-YLGXRPVA.js";
import "./chunk-M3DYL5PG.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-WFU7JF4C.js";
import {
  CommonModule,
  Component,
  NgModule,
  RouterModule,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-F27QM527.js";

// src/app/modules/tasks/tasks.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function Tasks_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11)(1, "div", 15);
    \u0275\u0275element(2, "div", 16);
    \u0275\u0275elementStart(3, "span", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", project_r1.id);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-blue-500", project_r1.id === ctx_r1.selectedProjectId)("bg-slate-300", project_r1.id !== ctx_r1.selectedProjectId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", project_r1.name, " ");
  }
}
function Tasks_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 18);
    \u0275\u0275element(2, "app-task-management", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("projectId", ctx_r1.selectedProjectId)("milestones", ((tmp_2_0 = ctx_r1.getSelectedProject()) == null ? null : tmp_2_0.milestones) || \u0275\u0275pureFunction0(3, _c0))("team_members", ((tmp_3_0 = ctx_r1.getSelectedProject()) == null ? null : tmp_3_0.team_members) || \u0275\u0275pureFunction0(4, _c0));
  }
}
function Tasks_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 20)(2, "span", 21);
    \u0275\u0275text(3, "folder_open");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3", 22);
    \u0275\u0275text(5, "No Project Selected");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 23);
    \u0275\u0275text(7, "Please select a project from the dropdown above to view tasks ");
    \u0275\u0275elementEnd()();
  }
}
var Tasks = class _Tasks {
  projectService = inject(ProjectService);
  projects = [];
  selectedProjectId = null;
  ngOnInit() {
    this.fetchProjects();
  }
  fetchProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data;
        if (this.projects.length > 0) {
          this.selectedProjectId = this.projects[0].id;
        }
      },
      error: (err) => console.error("Error fetching projects", err)
    });
  }
  onProjectChange(projectId) {
    this.selectedProjectId = projectId;
  }
  getSelectedProject() {
    if (!this.selectedProjectId)
      return null;
    return this.projects.find((p) => p.id === this.selectedProjectId) || null;
  }
  static \u0275fac = function Tasks_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tasks)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Tasks, selectors: [["app-tasks"]], standalone: false, decls: 21, vars: 2, consts: [[1, "min-h-screen", "bg-slate-50/50", "dark:bg-slate-900/50"], [1, "w-full", "mb-4", "flex", "flex-col", "lg:flex-row", "lg:items-center", "justify-between", "gap-5", "px-4", "pt-4"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white", "leading-tight"], [1, "text-slate-500", "dark:text-slate-400", "font-medium", "mt-1"], [1, "project-select-wrapper", "flex", "items-center", "gap-4", "bg-white", "dark:bg-slate-800", "px-5", "py-3", "rounded-2xl", "shadow-sm", "border", "border-slate-200", "dark:border-slate-700", "shrink-0"], [1, "flex", "flex-col"], [1, "text-[10px]", "font-black", "uppercase", "tracking-[0.22em]", "text-slate-400", "leading-none", "mb-1"], [1, "text-sm", "font-semibold", "text-slate-700", "dark:text-slate-200"], [1, "h-10", "w-px", "bg-slate-200", "dark:bg-slate-700"], ["appearance", "outline", 1, "project-select-field"], [3, "ngModelChange", "selectionChange", "ngModel"], [3, "value"], [1, "w-full", "px-4", "pb-4"], [1, "bg-white", "dark:bg-slate-800", "rounded-[2rem]", "shadow-xl", "border", "border-slate-200/70", "dark:border-slate-700", "overflow-hidden"], [1, "flex", "flex-col", "items-center", "justify-center", "py-40", "bg-white", "dark:bg-slate-800", "rounded-[2rem]", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-700"], [1, "flex", "items-center", "gap-3"], [1, "w-2.5", "h-2.5", "rounded-full", "transition-all"], [1, "font-semibold", "text-slate-700", "dark:text-slate-200"], [1, "p-6"], [3, "projectId", "milestones", "team_members"], [1, "w-20", "h-20", "bg-slate-100", "dark:bg-slate-900", "rounded-full", "flex", "items-center", "justify-center", "mb-6"], [1, "material-symbols-outlined", "text-4xl", "text-slate-300"], [1, "text-xl", "font-bold", "text-slate-900", "dark:text-slate-50", "mb-2"], [1, "text-slate-500", "dark:text-slate-400"]], template: function Tasks_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, " Tasks Workspace ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Manage and monitor all construction project tasks ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "span", 6);
      \u0275\u0275text(10, " Project ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 7);
      \u0275\u0275text(12, " Active Workspace ");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(13, "div", 8);
      \u0275\u0275elementStart(14, "mat-form-field", 9)(15, "mat-select", 10);
      \u0275\u0275twoWayListener("ngModelChange", function Tasks_Template_mat_select_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedProjectId, $event) || (ctx.selectedProjectId = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function Tasks_Template_mat_select_selectionChange_15_listener($event) {
        return ctx.onProjectChange($event.value);
      });
      \u0275\u0275repeaterCreate(16, Tasks_For_17_Template, 5, 6, "mat-option", 11, _forTrack0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(18, "div", 12);
      \u0275\u0275conditionalCreate(19, Tasks_Conditional_19_Template, 3, 5, "div", 13)(20, Tasks_Conditional_20_Template, 8, 0, "div", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedProjectId);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.projects);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.selectedProjectId ? 19 : 20);
    }
  }, dependencies: [TaskManagement, MatFormField, MatSelect, MatOption, NgControlStatus, NgModel], styles: ["\n.project-select-wrapper[_ngcontent-%COMP%] {\n  min-height: 78px;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.project-select-field[_ngcontent-%COMP%] {\n  width: 260px;\n}\n.project-select-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none !important;\n}\n.project-select-field[_ngcontent-%COMP%]     .mat-mdc-form-field-wrapper {\n  padding-bottom: 0 !important;\n  margin: 0 !important;\n}\n.project-select-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background: #f8fafc !important;\n  border-radius: 14px !important;\n  height: 48px !important;\n  padding: 0 14px !important;\n  border: 1px solid #e2e8f0 !important;\n  box-shadow: none !important;\n}\n.project-select-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  height: 48px !important;\n  align-items: center !important;\n}\n.project-select-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  min-height: auto !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  display: flex !important;\n  align-items: center !important;\n  width: 100% !important;\n}\n.project-select-field[_ngcontent-%COMP%]     .mdc-notched-outline {\n  display: none !important;\n}\n.project-select-field[_ngcontent-%COMP%]     .mat-mdc-select-value {\n  font-size: 14px !important;\n  font-weight: 700 !important;\n  color: #1e293b !important;\n}\n.project-select-field[_ngcontent-%COMP%]     .mat-mdc-select-arrow {\n  color: #64748b !important;\n}\n  .todo-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n  .progress-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n  .review-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n  .completed-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n  .tasks-list::-webkit-scrollbar {\n  width: 6px;\n}\n  .tasks-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n  .tasks-list::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 999px;\n}\n  .tasks-list::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n.dark[_nghost-%COMP%]   .project-select-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, .dark   [_nghost-%COMP%]   .project-select-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background: #0f172a !important;\n  border-color: #334155 !important;\n}\n.dark[_nghost-%COMP%]   .project-select-field[_ngcontent-%COMP%]     .mat-mdc-select-value, .dark   [_nghost-%COMP%]   .project-select-field[_ngcontent-%COMP%]     .mat-mdc-select-value {\n  color: #f8fafc !important;\n}\n.dark[_nghost-%COMP%]   .project-select-field[_ngcontent-%COMP%]     .mat-mdc-select-arrow, .dark   [_nghost-%COMP%]   .project-select-field[_ngcontent-%COMP%]     .mat-mdc-select-arrow {\n  color: #cbd5e1 !important;\n}\n.dark[_nghost-%COMP%]     .tasks-list::-webkit-scrollbar-thumb, .dark   [_nghost-%COMP%]     .tasks-list::-webkit-scrollbar-thumb {\n  background: #475569;\n}\n/*# sourceMappingURL=tasks.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tasks, [{
    type: Component,
    args: [{ selector: "app-tasks", standalone: false, template: '<div class="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">\r\n    <div class="w-full mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-5 px-4 pt-4">\r\n        <div>\r\n            <h1 class="text-3xl font-black text-slate-800 dark:text-white leading-tight">\r\n                Tasks Workspace\r\n            </h1>\r\n            <p class="text-slate-500 dark:text-slate-400 font-medium mt-1">\r\n                Manage and monitor all construction project tasks\r\n            </p>\r\n        </div>\r\n        <div\r\n            class="project-select-wrapper flex items-center gap-4 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 shrink-0">\r\n\r\n            <div class="flex flex-col">\r\n                <span class="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 leading-none mb-1">\r\n                    Project\r\n                </span>\r\n                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">\r\n                    Active Workspace\r\n                </span>\r\n            </div>\r\n\r\n            <div class="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>\r\n\r\n            <mat-form-field appearance="outline" class="project-select-field">\r\n                <mat-select [(ngModel)]="selectedProjectId" (selectionChange)="onProjectChange($event.value)">\r\n                    @for (project of projects; track project.id) {\r\n                    <mat-option [value]="project.id">\r\n                        <div class="flex items-center gap-3">\r\n                            <div class="w-2.5 h-2.5 rounded-full transition-all"\r\n                                [class.bg-blue-500]="project.id === selectedProjectId"\r\n                                [class.bg-slate-300]="project.id !== selectedProjectId">\r\n                            </div>\r\n                            <span class="font-semibold text-slate-700 dark:text-slate-200">\r\n                                {{ project.name }}\r\n                            </span>\r\n                        </div>\r\n                    </mat-option>\r\n                    }\r\n                </mat-select>\r\n            </mat-form-field>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class="w-full px-4 pb-4">\r\n\r\n        @if (selectedProjectId) {\r\n\r\n        <div\r\n            class="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-200/70 dark:border-slate-700 overflow-hidden">\r\n            <div class="p-6">\r\n                <app-task-management [projectId]="selectedProjectId"\r\n                    [milestones]="getSelectedProject()?.milestones || []"\r\n                    [team_members]="getSelectedProject()?.team_members || []">\r\n                </app-task-management>\r\n            </div>\r\n        </div>\r\n\r\n        } @else {\r\n\r\n        <div\r\n            class="flex flex-col items-center justify-center py-40 bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700">\r\n            <div class="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">\r\n                <span class="material-symbols-outlined text-4xl text-slate-300">folder_open</span>\r\n            </div>\r\n            <h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">No Project Selected</h3>\r\n            <p class="text-slate-500 dark:text-slate-400">Please select a project from the dropdown above to view tasks\r\n            </p>\r\n        </div>\r\n\r\n        }\r\n\r\n    </div>\r\n\r\n</div>', styles: ["/* src/app/modules/tasks/tasks.scss */\n.project-select-wrapper {\n  min-height: 78px;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.project-select-field {\n  width: 260px;\n}\n.project-select-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none !important;\n}\n.project-select-field ::ng-deep .mat-mdc-form-field-wrapper {\n  padding-bottom: 0 !important;\n  margin: 0 !important;\n}\n.project-select-field ::ng-deep .mat-mdc-text-field-wrapper {\n  background: #f8fafc !important;\n  border-radius: 14px !important;\n  height: 48px !important;\n  padding: 0 14px !important;\n  border: 1px solid #e2e8f0 !important;\n  box-shadow: none !important;\n}\n.project-select-field ::ng-deep .mat-mdc-form-field-flex {\n  height: 48px !important;\n  align-items: center !important;\n}\n.project-select-field ::ng-deep .mat-mdc-form-field-infix {\n  min-height: auto !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  display: flex !important;\n  align-items: center !important;\n  width: 100% !important;\n}\n.project-select-field ::ng-deep .mdc-notched-outline {\n  display: none !important;\n}\n.project-select-field ::ng-deep .mat-mdc-select-value {\n  font-size: 14px !important;\n  font-weight: 700 !important;\n  color: #1e293b !important;\n}\n.project-select-field ::ng-deep .mat-mdc-select-arrow {\n  color: #64748b !important;\n}\n::ng-deep .todo-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n::ng-deep .progress-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n::ng-deep .review-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n::ng-deep .completed-column .tasks-list {\n  max-height: 430px;\n  overflow-y: auto;\n  padding-right: 6px;\n}\n::ng-deep .tasks-list::-webkit-scrollbar {\n  width: 6px;\n}\n::ng-deep .tasks-list::-webkit-scrollbar-track {\n  background: transparent;\n}\n::ng-deep .tasks-list::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 999px;\n}\n::ng-deep .tasks-list::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n:host-context(.dark) .project-select-field ::ng-deep .mat-mdc-text-field-wrapper {\n  background: #0f172a !important;\n  border-color: #334155 !important;\n}\n:host-context(.dark) .project-select-field ::ng-deep .mat-mdc-select-value {\n  color: #f8fafc !important;\n}\n:host-context(.dark) .project-select-field ::ng-deep .mat-mdc-select-arrow {\n  color: #cbd5e1 !important;\n}\n:host-context(.dark) ::ng-deep .tasks-list::-webkit-scrollbar-thumb {\n  background: #475569;\n}\n/*# sourceMappingURL=tasks.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Tasks, { className: "Tasks", filePath: "app/modules/tasks/tasks.ts", lineNumber: 11 });
})();

// src/app/modules/tasks/tasks-routing-module.ts
var routes = [{ path: "", component: Tasks }];
var TasksRoutingModule = class _TasksRoutingModule {
  static \u0275fac = function TasksRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TasksRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _TasksRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TasksRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/tasks/tasks-module.ts
var TasksModule = class _TasksModule {
  static \u0275fac = function TasksModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TasksModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _TasksModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    TasksRoutingModule,
    TaskManagement,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TasksModule, [{
    type: NgModule,
    args: [{
      declarations: [Tasks],
      imports: [
        CommonModule,
        TasksRoutingModule,
        TaskManagement,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule
      ]
    }]
  }], null, null);
})();
export {
  TasksModule
};
//# sourceMappingURL=chunk-EHEKTXOY.js.map
