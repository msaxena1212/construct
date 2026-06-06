import {
  StockApprovalModule
} from "./chunk-7DQMMLXF.js";
import {
  DragDropModule,
  TaskManagement
} from "./chunk-V5A7NUGT.js";
import {
  ProjectService
} from "./chunk-VBCWJQVV.js";
import {
  CommonDialogComponent
} from "./chunk-WS53KIOQ.js";
import {
  MAT_DIALOG_DATA,
  MatDatepicker,
  MatDatepickerInput,
  MatDialog,
  MatDialogRef,
  MaterialModule
} from "./chunk-33HPODTN.js";
import "./chunk-5YJQBWTN.js";
import "./chunk-E3SOVO5U.js";
import {
  MatIcon
} from "./chunk-ZGY4FKYW.js";
import "./chunk-Y354W3EZ.js";
import "./chunk-NKQ2I3NH.js";
import {
  ToastrService
} from "./chunk-YLGXRPVA.js";
import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-WFU7JF4C.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  DatePipe,
  EventEmitter,
  Inject,
  Input,
  Location,
  NgClass,
  NgForOf,
  NgModule,
  Output,
  Router,
  RouterLink,
  RouterModule,
  SlicePipe,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction7,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-F27QM527.js";

// src/app/modules/projects/projects.ts
var _c0 = (a0) => ["/master/projects/edit-project/", a0];
var _c1 = (a0) => ["/master/projects/", a0];
var _forTrack0 = ($index, $item) => $item.id;
function Projects_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r1 = ctx.$implicit;
    \u0275\u0275property("value", member_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(member_r1);
  }
}
function Projects_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "div", 21);
    \u0275\u0275elementStart(2, "p", 22);
    \u0275\u0275text(3, "Scanning Project Portfolios...");
    \u0275\u0275elementEnd()();
  }
}
function Projects_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 23);
    \u0275\u0275text(2, "warning_amber");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 25);
    \u0275\u0275listener("click", function Projects_Conditional_28_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fetchProjects());
    });
    \u0275\u0275text(6, "Retry Fetch");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function Projects_Conditional_29_For_2_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 47);
  }
  if (rf & 2) {
    const member_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r2.serverUrl + member_r4.avatar || "https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop", \u0275\u0275sanitizeUrl);
  }
}
function Projects_Conditional_29_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275element(2, "img", 28)(3, "div", 29);
    \u0275\u0275elementStart(4, "div", 30)(5, "div")(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h3", 32);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 33)(11, "div", 34)(12, "div")(13, "div", 35)(14, "span", 36);
    \u0275\u0275text(15, "Global Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 37);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 38);
    \u0275\u0275element(19, "div", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 40)(21, "div", 41)(22, "p", 42);
    \u0275\u0275text(23, "Est. Completion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 43);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 44)(28, "p", 42);
    \u0275\u0275text(29, "Budget Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 43);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 45)(33, "div", 46);
    \u0275\u0275repeaterCreate(34, Projects_Conditional_29_For_2_For_35_Template, 1, 1, "img", 47, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 48)(37, "span", 49);
    \u0275\u0275text(38, " Manage Project ");
    \u0275\u0275elementStart(39, "span", 50);
    \u0275\u0275text(40, "arrow_forward");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(41, "div", 51);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 52)(43, "span", 53)(44, "span", 54);
    \u0275\u0275text(45, "update");
    \u0275\u0275elementEnd();
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 55);
    \u0275\u0275text(49);
    \u0275\u0275pipe(50, "slice");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(23, _c0, project_r5.id));
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.getThumbnailUrl(project_r5.thumbnail), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(project_r5.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r5.name);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", project_r5.progress || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", project_r5.progress || 0, "%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 14, project_r5.completion_date || project_r5.end_date));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("\u20B9", ((project_r5.budget_used || 0) / 1e5).toFixed(1), "L / \u20B9", ((project_r5.budget_total || 0) / 1e5).toFixed(1), "L");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(project_r5.team_members);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(25, _c1, project_r5.id));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" Created ", \u0275\u0275pipeBind2(47, 16, project_r5.createdAt || project_r5.start_date, "short"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(50, 19, project_r5.address || "", 0, 20), "", (project_r5.address || "").length > 20 ? "..." : "");
  }
}
function Projects_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, Projects_Conditional_29_For_2_Template, 51, 27, "div", 26, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filteredProjects);
  }
}
var Projects = class _Projects {
  projectService;
  projects = [];
  loading = true;
  error = null;
  availableTeamMembers = ["All Members"];
  selectedMember = "All Members";
  serverUrl = environment.serverUrl;
  constructor(projectService) {
    this.projectService = projectService;
  }
  ngOnInit() {
    this.fetchProjects();
  }
  get filteredProjects() {
    if (this.selectedMember === "All Members")
      return this.projects;
    return this.projects.filter((p) => p.team_members?.some((m) => m.firstname + " " + m.lastname === this.selectedMember));
  }
  fetchProjects() {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data;
        this.extractUniqueMembers();
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load projects. Please try again.";
        this.loading = false;
        console.error(err);
      }
    });
  }
  extractUniqueMembers() {
    const memberSet = /* @__PURE__ */ new Set();
    this.projects.forEach((p) => {
      p.team_members?.forEach((m) => {
        memberSet.add(m.firstname + " " + m.lastname);
      });
    });
    this.availableTeamMembers = ["All Members", ...Array.from(memberSet)];
  }
  getStatusClass(status) {
    switch (status) {
      case "On Track":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "At Risk":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Delayed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  }
  getThumbnailUrl(thumbnail) {
    if (!thumbnail)
      return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop";
    if (thumbnail.startsWith("http"))
      return thumbnail;
    const baseUrl = this.serverUrl.endsWith("/") ? this.serverUrl.slice(0, -1) : this.serverUrl;
    const thumbPath = thumbnail.startsWith("/") ? thumbnail : `/${thumbnail}`;
    return `${baseUrl}${thumbPath}`;
  }
  static \u0275fac = function Projects_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Projects)(\u0275\u0275directiveInject(ProjectService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Projects, selectors: [["app-projects"]], standalone: false, decls: 30, vars: 2, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-row", "justify-between", "items-center", "gap-8", "mb-12"], [1, "space-y-2"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "max-w-xl", "leading-relaxed", "text-lg", "font-light"], [1, "flex", "flex-wrap", "items-center", "gap-4", "bg-white/50", "dark:bg-slate-900/50", "backdrop-blur-xl", "p-2", "rounded-4x", "border", "border-white", "dark:border-slate-800", "shadow-2xl", "shadow-slate-200/50", "dark:shadow-none"], [1, "flex", "items-center", "gap-3", "px-4", "h-14", "bg-white", "dark:bg-slate-800", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-700/50", "shadow-sm", "transition-all", "hover:border-blue-200", "dark:hover:border-blue-900/30", "group", "relative"], [1, "text-slate-400", "group-hover:text-blue-500", "transition-colors"], [1, "bg-transparent", "border-none", "text-[11px]", "font-black", "uppercase", "tracking-widest", "text-slate-700", "dark:text-slate-300", "outline-none", "cursor-pointer", "appearance-none", "pr-8", "min-w-[140px]", "z-10", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "material-symbols-outlined", "absolute", "right-4", "text-slate-400", "text-sm", "pointer-events-none", "group-hover:text-blue-500", "transition-colors"], [1, "relative", "group", "flex-1"], [1, "material-symbols-outlined", "absolute", "left-5", "top-1/2", "-translate-y-1/2", "text-slate-400", "group-focus-within:text-blue-600", "transition-all"], ["placeholder", "Search projects, sites or status...", "type", "text", 1, "w-full", "pl-14", "pr-6", "h-14", "bg-white", "dark:bg-slate-800", "border", "border-slate-100", "dark:border-slate-700/50", "rounded-2xl", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "text-sm", "font-bold", "placeholder-slate-400", "outline-none", "transition-all", "shadow-sm", "group-hover:border-blue-200", "dark:group-hover:border-blue-900/30"], ["routerLink", "/master/projects/new-project", 1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "flex", "flex-col", "items-center", "justify-center", "h-96"], [1, "bg-red-50", "dark:bg-red-900/20", "border", "border-red-100", "dark:border-red-800", "p-12", "rounded-3xl", "text-center", "max-w-2xl", "mx-auto"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-3", "gap-8"], [1, "w-16", "h-16", "border-4", "border-blue-600", "border-t-transparent", "rounded-full", "animate-spin"], [1, "mt-6", "text-slate-400", "font-black", "uppercase", "tracking-[0.2em]", "text-xs"], [1, "material-symbols-outlined", "text-red-600", "text-6xl", "mb-6"], [1, "text-2xl", "font-black", "text-red-900", "dark:text-red-400", "tracking-tight"], [1, "mt-8", "px-10", "py-4", "bg-red-600", "text-white", "rounded-2xl", "font-black", "text-sm", "shadow-xl", "shadow-red-500/20", "hover:bg-red-700", "transition-all", 3, "click"], [1, "bg-white", "dark:bg-slate-900", "rounded-[32px]", "overflow-hidden", "border", "border-slate-100", "dark:border-slate-800", "shadow-xl", "group", "hover:shadow-2xl", "hover:border-blue-500/30", "transition-all", "duration-500", "flex", "flex-col", "h-full", "relative"], [1, "relative", "h-48", "overflow-hidden", 3, "routerLink"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-110", "transition-transform", "duration-1000", 3, "src"], [1, "absolute", "inset-0", "bg-linear-to-t", "from-slate-900/80", "via-transparent", "to-transparent"], [1, "absolute", "bottom-4", "left-6", "right-6", "flex", "justify-between", "items-end"], [1, "text-[10px]", "font-black", "text-white/70", "uppercase", "tracking-widest"], [1, "text-xl", "font-black", "text-white", "tracking-tighter", "leading-none", "mt-1"], [1, "p-8", "flex-1", "flex", "flex-col"], [1, "space-y-6", "mt-auto"], [1, "flex", "justify-between", "items-end", "mb-2.5"], [1, "text-[10px]", "font-black", "text-slate-400", "uppercase", "tracking-widest"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-slate-50"], [1, "w-full", "h-2", "bg-slate-100", "dark:bg-slate-800", "rounded-full", "overflow-hidden", "shadow-inner"], [1, "h-full", "bg-blue-600", "rounded-full", "transition-all", "duration-1000", "shadow-md", "shadow-blue-500/20"], [1, "grid", "grid-cols-2", "gap-4", "pt-4", "border-t", "border-slate-100", "dark:border-slate-800/50"], [1, "space-y-1"], [1, "text-[9px]", "font-black", "text-slate-400", "uppercase", "tracking-widest"], [1, "text-xs", "font-bold", "text-slate-900", "dark:text-slate-50"], [1, "space-y-1", "text-right"], [1, "flex", "items-center", "justify-between", "pt-6"], [1, "flex", "-space-x-3", "overflow-hidden"], [1, "w-9", "h-9", "rounded-xl", "border-4", "border-white", "dark:border-slate-900", "object-cover", "shadow-sm", "hover:translate-y-[-4px]", "transition-transform", 3, "src"], [1, "group/btn", "relative", "px-8", "py-3.5", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "rounded-2xl", "font-black", "text-[11px]", "uppercase", "tracking-widest", "shadow-xl", "hover:scale-[1.05]", "active:scale-[0.98]", "transition-all", "overflow-hidden", 3, "routerLink"], [1, "relative", "z-10", "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", "text-[16px]", "group-hover/btn:translate-x-1", "transition-transform"], [1, "absolute", "inset-0", "bg-blue-600", "translate-x-full", "group-hover/btn:translate-x-0", "transition-transform", "duration-500", "rounded-2xl"], [1, "px-8", "py-3", "bg-slate-50/50", "dark:bg-slate-800/30", "flex", "items-center", "justify-between"], [1, "text-[9px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest", "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", "text-[14px]"], [1, "text-[9px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest"]], template: function Projects_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "Discovery");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Explore active construction sites, monitor progress health, and initialize new project blueprints.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "mat-icon", 7);
      \u0275\u0275text(10, "filter_alt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function Projects_Template_select_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedMember, $event) || (ctx.selectedMember = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(12, Projects_For_13_Template, 2, 2, "option", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 11)(17, "span", 12);
      \u0275\u0275text(18, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 14);
      \u0275\u0275element(21, "div", 15);
      \u0275\u0275elementStart(22, "div", 16)(23, "span", 17);
      \u0275\u0275text(24, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "span");
      \u0275\u0275text(26, "New Project");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(27, Projects_Conditional_27_Template, 4, 0, "div", 18)(28, Projects_Conditional_28_Template, 7, 1, "div", 19)(29, Projects_Conditional_29_Template, 3, 0, "div", 20);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedMember);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.availableTeamMembers);
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.loading ? 27 : ctx.error ? 28 : 29);
    }
  }, dependencies: [RouterLink, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, MatIcon, SlicePipe, DatePipe], styles: ["\n/*# sourceMappingURL=projects.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Projects, [{
    type: Component,
    args: [{ selector: "app-projects", standalone: false, template: `<div class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
  <div class="flex flex-row justify-between items-center gap-8 mb-12">\r
    <div class="space-y-2">\r
      <h1 class="text-3xl font-black text-slate-800 dark:text-white">Discovery</h1>\r
      <p class="text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed text-lg font-light">Explore active\r
        construction sites, monitor progress health, and initialize new project blueprints.</p>\r
    </div>\r
    <div\r
      class="flex flex-wrap items-center gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-2 rounded-4x border border-white dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">\r
      <!-- Member Filter -->\r
      <div\r
        class="flex items-center gap-3 px-4 h-14 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm transition-all hover:border-blue-200 dark:hover:border-blue-900/30 group relative">\r
        <mat-icon class="text-slate-400 group-hover:text-blue-500 transition-colors">filter_alt</mat-icon>\r
        <select [(ngModel)]="selectedMember"\r
          class="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 outline-none cursor-pointer appearance-none pr-8 min-w-[140px] z-10">\r
          @for (member of availableTeamMembers; track member) {\r
          <option [value]="member">{{ member }}</option>\r
          }\r
        </select>\r
        <span\r
          class="material-symbols-outlined absolute right-4 text-slate-400 text-sm pointer-events-none group-hover:text-blue-500 transition-colors">expand_more</span>\r
      </div>\r
\r
      <!-- Search Input -->\r
      <div class="relative group flex-1">\r
        <span\r
          class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all">search</span>\r
        <input\r
          class="w-full pl-14 pr-6 h-14 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 text-sm font-bold placeholder-slate-400 outline-none transition-all shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-900/30"\r
          placeholder="Search projects, sites or status..." type="text" />\r
      </div>\r
\r
      <!-- Add Button -->\r
      <button routerLink="/master/projects/new-project"\r
        class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r
\r
      <!-- Glow -->\r
      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
      </div>\r
\r
      <!-- Icon -->\r
      <div\r
        class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">\r
\r
        <span class="material-symbols-outlined text-[20px]">\r
          add\r
        </span>\r
\r
      </div>\r
        <span>New Project</span>\r
      </button>\r
    </div>\r
  </div>\r
\r
  @if (loading) {\r
  <div class="flex flex-col items-center justify-center h-96">\r
    <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>\r
    <p class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Scanning Project Portfolios...</p>\r
  </div>\r
  } @else if (error) {\r
  <div\r
    class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-12 rounded-3xl text-center max-w-2xl mx-auto">\r
    <span class="material-symbols-outlined text-red-600 text-6xl mb-6">warning_amber</span>\r
    <h3 class="text-2xl font-black text-red-900 dark:text-red-400 tracking-tight">{{ error }}</h3>\r
    <button (click)="fetchProjects()"\r
      class="mt-8 px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all">Retry\r
      Fetch</button>\r
  </div>\r
  } @else {\r
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">\r
    @for (project of filteredProjects; track project.id) {\r
    <div\r
      class="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl group hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full relative">\r
\r
      <!-- Project Image & Status Overlay -->\r
      <div class="relative h-48 overflow-hidden" [routerLink]="['/master/projects/edit-project/', project.id]">\r
        <img [src]="getThumbnailUrl(project.thumbnail)"\r
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />\r
        <div class="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent"></div>\r
\r
        <!-- <div class="absolute top-4 right-4 animate-in">\r
          <span [class]="getStatusClass(project.status)"\r
            class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md flex items-center gap-2">\r
            <span class="w-2 h-2 rounded-full shadow-inner animate-pulse"\r
              [class]="project.status === 'On Track' ? 'bg-emerald-500' : 'bg-amber-500'"></span>\r
            {{ project.status }}\r
          </span>\r
        </div> -->\r
\r
        <div class="absolute bottom-4 left-6 right-6 flex justify-between items-end">\r
          <div>\r
            <span class="text-[10px] font-black text-white/70 uppercase tracking-widest">{{ project.type }}</span>\r
            <h3 class="text-xl font-black text-white tracking-tighter leading-none mt-1">{{ project.name }}</h3>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Project Body -->\r
      <div class="p-8 flex-1 flex flex-col">\r
        <!-- <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium mb-8">\r
            A structural development located in {{ project.address || 'Unknown Location' }}. High-precision construction\r
            phase currently in progress.\r
          </p> -->\r
\r
        <div class="space-y-6 mt-auto">\r
          <!-- Progress Indicator -->\r
          <div>\r
            <div class="flex justify-between items-end mb-2.5">\r
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Progress</span>\r
              <span class="text-sm font-black text-slate-900 dark:text-slate-50">{{ project.progress || 0 }}%</span>\r
            </div>\r
            <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">\r
              <div class="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-md shadow-blue-500/20"\r
                [style.width.%]="project.progress || 0"></div>\r
            </div>\r
          </div>\r
\r
          <!-- Metadata Bento Row -->\r
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">\r
            <div class="space-y-1">\r
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Est. Completion</p>\r
              <p class="text-xs font-bold text-slate-900 dark:text-slate-50">{{ (project.completion_date ||\r
                project.end_date) | date }}</p>\r
            </div>\r
            <div class="space-y-1 text-right">\r
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Budget Status</p>\r
              <p class="text-xs font-bold text-slate-900 dark:text-slate-50">\u20B9{{ ((project.budget_used || 0) /\r
                100000).toFixed(1) }}L / \u20B9{{ ((project.budget_total || 0) / 100000).toFixed(1) }}L</p>\r
            </div>\r
          </div>\r
\r
          <!-- Action Row -->\r
          <div class="flex items-center justify-between pt-6">\r
            <div class="flex -space-x-3 overflow-hidden">\r
              @for (member of project.team_members; track member.id) {\r
              <img\r
                [src]="serverUrl + member.avatar || 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop'"\r
                class="w-9 h-9 rounded-xl border-4 border-white dark:border-slate-900 object-cover shadow-sm hover:translate-y-[-4px] transition-transform" />\r
              }\r
            </div>\r
            <button [routerLink]="['/master/projects/', project.id]"\r
              class="group/btn relative px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-[1.05] active:scale-[0.98] transition-all overflow-hidden">\r
              <span class="relative z-10 flex items-center gap-2">\r
                Manage Project <span\r
                  class="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>\r
              </span>\r
              <div\r
                class="absolute inset-0 bg-blue-600 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 rounded-2xl">\r
              </div>\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Subtle Bottom Indicator -->\r
      <div class="px-8 py-3 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">\r
        <span class="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">\r
          <span class="material-symbols-outlined text-[14px]">update</span>\r
          Created {{ (project.createdAt || project.start_date) | date:'short' }}\r
        </span>\r
        <span class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{{ (project.address || '') |\r
          slice:0:20 }}{{\r
          (project.address || '').length > 20 ? '...' : '' }}</span>\r
      </div>\r
    </div>\r
    }\r
  </div>\r
  }\r
</div>`, styles: ["/* src/app/modules/projects/projects.scss */\n/*# sourceMappingURL=projects.css.map */\n"] }]
  }], () => [{ type: ProjectService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Projects, { className: "Projects", filePath: "app/modules/projects/projects.ts", lineNumber: 12 });
})();

// src/app/modules/projects/new-project-wizard/new-project-wizard.ts
var _c02 = () => ({ standalone: true });
var _forTrack02 = ($index, $item) => $item.id;
function NewProjectWizard_Conditional_65_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 51);
    \u0275\u0275elementStart(1, "div", 52)(2, "mat-icon", 53);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.thumbnailPreview, \u0275\u0275sanitizeUrl);
  }
}
function NewProjectWizard_Conditional_65_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 54);
    \u0275\u0275text(1, "add_photo_alternate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 55);
    \u0275\u0275text(3, "Add Thumbnail");
    \u0275\u0275elementEnd();
  }
}
function NewProjectWizard_Conditional_65_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44);
    \u0275\u0275text(1, "Project name is required (min 3 chars).");
    \u0275\u0275elementEnd();
  }
}
function NewProjectWizard_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 33)(2, "div")(3, "h3", 34);
    \u0275\u0275text(4, " General Project Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 35);
    \u0275\u0275text(6, "Establish the identity and physical location of the project site.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 36)(8, "input", 37, 0);
    \u0275\u0275listener("change", function NewProjectWizard_Conditional_65_Template_input_change_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onThumbnailSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 38);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_65_Template_div_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const thumbInput_r3 = \u0275\u0275reference(9);
      return \u0275\u0275resetView(thumbInput_r3.click());
    });
    \u0275\u0275conditionalCreate(11, NewProjectWizard_Conditional_65_Conditional_11_Template, 4, 1)(12, NewProjectWizard_Conditional_65_Conditional_12_Template, 4, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 39)(14, "div", 40)(15, "label", 41);
    \u0275\u0275text(16, "Project Name ");
    \u0275\u0275elementStart(17, "span", 42);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(19, "input", 43);
    \u0275\u0275conditionalCreate(20, NewProjectWizard_Conditional_65_Conditional_20_Template, 2, 0, "p", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div")(22, "label", 41);
    \u0275\u0275text(23, "Project Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 45)(25, "select", 46)(26, "option");
    \u0275\u0275text(27, "Commercial Renovation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option");
    \u0275\u0275text(29, "Residential New Build");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option");
    \u0275\u0275text(31, "Industrial Facility");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option");
    \u0275\u0275text(33, "Infrastructure");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "span", 47);
    \u0275\u0275text(35, "expand_more");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div")(37, "label", 41);
    \u0275\u0275text(38, "Estimated Completion");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "input", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 40)(41, "label", 41);
    \u0275\u0275text(42, "Project Site Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 45)(44, "span", 49);
    \u0275\u0275text(45, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "input", 50);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.thumbnailPreview ? 11 : 12);
    \u0275\u0275advance(8);
    \u0275\u0275classProp("ring-rose-500", ctx_r1.f["name"].touched && ctx_r1.f["name"].invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.f["name"].touched && ctx_r1.f["name"].invalid ? 20 : -1);
    \u0275\u0275advance(19);
    \u0275\u0275classProp("ring-rose-500", ctx_r1.f["completionDate"].touched && ctx_r1.f["completionDate"].invalid);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("ring-rose-500", ctx_r1.f["address"].touched && ctx_r1.f["address"].invalid);
  }
}
function NewProjectWizard_Conditional_66_For_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 62);
  }
  if (rf & 2) {
    const member_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.serverUrl + member_r6.avatar, \u0275\u0275sanitizeUrl);
  }
}
function NewProjectWizard_Conditional_66_For_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", member_r6.firstname.charAt(0), "", member_r6.lastname.charAt(0), " ");
  }
}
function NewProjectWizard_Conditional_66_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275conditionalCreate(1, NewProjectWizard_Conditional_66_For_9_Conditional_1_Template, 1, 1, "img", 62)(2, NewProjectWizard_Conditional_66_For_9_Conditional_2_Template, 2, 2, "div", 63);
    \u0275\u0275elementStart(3, "div", 29)(4, "p", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 64);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 65);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_66_For_9_Template_button_click_8_listener() {
      const \u0275$index_218_r7 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeMember(\u0275$index_218_r7));
    });
    \u0275\u0275elementStart(9, "mat-icon", 66);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "mat-icon", 67);
    \u0275\u0275text(12, "check_circle");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const member_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(member_r6.avatar ? 1 : 2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(member_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(member_r6.role);
  }
}
function NewProjectWizard_Conditional_66_Conditional_16_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 71);
  }
  if (rf & 2) {
    const member_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r1.serverUrl + member_r9.avatar, \u0275\u0275sanitizeUrl);
  }
}
function NewProjectWizard_Conditional_66_Conditional_16_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", member_r9.firstname.charAt(0), "", member_r9.lastname.charAt(0), " ");
  }
}
function NewProjectWizard_Conditional_66_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_66_Conditional_16_For_2_Template_div_click_0_listener() {
      const member_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.addMember(member_r9));
    });
    \u0275\u0275conditionalCreate(1, NewProjectWizard_Conditional_66_Conditional_16_For_2_Conditional_1_Template, 1, 1, "img", 71)(2, NewProjectWizard_Conditional_66_Conditional_16_For_2_Conditional_2_Template, 2, 2, "div", 63);
    \u0275\u0275elementStart(3, "div", 29)(4, "p", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 64);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-icon", 72);
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const member_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(member_r9.avatar ? 1 : 2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", member_r9.firstname, " ", member_r9.lastname);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (member_r9.role == null ? null : member_r9.role.name) || "Staff");
  }
}
function NewProjectWizard_Conditional_66_Conditional_16_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "mat-icon", 73);
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 74);
    \u0275\u0275text(4, "No available members");
    \u0275\u0275elementEnd()();
  }
}
function NewProjectWizard_Conditional_66_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275repeaterCreate(1, NewProjectWizard_Conditional_66_Conditional_16_For_2_Template, 10, 4, "div", 68, _forTrack02, false, NewProjectWizard_Conditional_66_Conditional_16_ForEmpty_3_Template, 5, 0, "div", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableMembers);
  }
}
function NewProjectWizard_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 56)(2, "h3", 34);
    \u0275\u0275text(3, " Architecture & Site Team");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 35);
    \u0275\u0275text(5, "Assign lead architects, site managers, and safety officers.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 14)(7, "div", 57);
    \u0275\u0275repeaterCreate(8, NewProjectWizard_Conditional_66_For_9_Template, 13, 3, "div", 58, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(10, "div", 45)(11, "button", 59);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_66_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAssignDropdown = !ctx_r1.showAssignDropdown);
    });
    \u0275\u0275elementStart(12, "mat-icon", 60);
    \u0275\u0275text(13, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 10);
    \u0275\u0275text(15, "Assign Member");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, NewProjectWizard_Conditional_66_Conditional_16_Template, 4, 1, "div", 61);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.team.value);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.showAssignDropdown ? 16 : -1);
  }
}
function NewProjectWizard_Conditional_67_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 3)(2, "div", 88);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 3)(6, "span", 90);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 91);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_67_For_27_Template_button_click_8_listener() {
      const \u0275$index_332_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeMilestone(\u0275$index_332_r12));
    });
    \u0275\u0275elementStart(9, "mat-icon", 66);
    \u0275\u0275text(10, "delete_outline");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ms_r13 = ctx.$implicit;
    const \u0275$index_332_r12 = ctx.$index;
    \u0275\u0275property("formGroup", ms_r13);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275$index_332_r12 + 1, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", "text-blue-600 bg-blue-50 dark:bg-blue-900/20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ms_r13.value.phase);
  }
}
function NewProjectWizard_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 56)(2, "h3", 34);
    \u0275\u0275text(3, "Fiscal Parameters & Timeline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 35);
    \u0275\u0275text(5, "Defining the commercial constraints and chronological milestones.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 39)(7, "div", 75)(8, "label", 41);
    \u0275\u0275text(9, "Total Project Budget ");
    \u0275\u0275elementStart(10, "span", 42);
    \u0275\u0275text(11, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 45)(13, "span", 76);
    \u0275\u0275text(14, "\u20B9");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 75)(17, "label", 41);
    \u0275\u0275text(18, "Contingency Fund (%)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 79)(21, "h4", 80)(22, "mat-icon", 81);
    \u0275\u0275text(23, "flag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Initial Phase Milestones ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 82);
    \u0275\u0275repeaterCreate(26, NewProjectWizard_Conditional_67_For_27_Template, 11, 4, "div", 83, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 3)(29, "div", 84)(30, "span", 85);
    \u0275\u0275text(31, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function NewProjectWizard_Conditional_67_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newMilestoneName, $event) || (ctx_r1.newMilestoneName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function NewProjectWizard_Conditional_67_Template_input_keyup_enter_32_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addMilestone());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "button", 87);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_67_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addMilestone());
    });
    \u0275\u0275elementStart(34, "mat-icon");
    \u0275\u0275text(35, "add");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275classProp("ring-rose-500", ctx_r1.f["budgetTotal"].touched && ctx_r1.f["budgetTotal"].invalid);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.milestones.controls);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newMilestoneName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c02));
  }
}
function NewProjectWizard_Conditional_68_Conditional_19_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102)(1, "div", 103)(2, "mat-icon", 104);
    \u0275\u0275text(3, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 105);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 106);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const doc_r16 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(doc_r16.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(doc_r16.size);
  }
}
function NewProjectWizard_Conditional_68_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99)(1, "h4", 100);
    \u0275\u0275text(2, "Existing Site Records");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 101);
    \u0275\u0275repeaterCreate(4, NewProjectWizard_Conditional_68_Conditional_19_For_5_Template, 8, 2, "div", 102, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.existingDocuments);
  }
}
function NewProjectWizard_Conditional_68_Conditional_20_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 108)(1, "div", 3)(2, "div", 109)(3, "mat-icon", 110);
    \u0275\u0275text(4, "description");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 111);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 3)(8, "span", 112);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 113);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_68_Conditional_20_For_5_Template_button_click_10_listener() {
      const \u0275$index_427_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeFile(\u0275$index_427_r18));
    });
    \u0275\u0275elementStart(11, "mat-icon", 66);
    \u0275\u0275text(12, "delete_outline");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const doc_r19 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(doc_r19.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(doc_r19.size);
  }
}
function NewProjectWizard_Conditional_68_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99)(1, "h4", 100);
    \u0275\u0275text(2, "New Upload Queue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 107);
    \u0275\u0275repeaterCreate(4, NewProjectWizard_Conditional_68_Conditional_20_For_5_Template, 13, 2, "div", 108, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.documents.value);
  }
}
function NewProjectWizard_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 56)(2, "h3", 34);
    \u0275\u0275text(3, "Logistics & Finalization");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 35);
    \u0275\u0275text(5, "Review all settings and initialize the project workspace.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 14)(7, "div", 92);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_68_Template_div_click_7_listener() {
      \u0275\u0275restoreView(_r14);
      const fileInput_r15 = \u0275\u0275reference(9);
      return \u0275\u0275resetView(fileInput_r15.click());
    });
    \u0275\u0275elementStart(8, "input", 93, 1);
    \u0275\u0275listener("change", function NewProjectWizard_Conditional_68_Template_input_change_8_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 94)(11, "mat-icon", 95);
    \u0275\u0275text(12, "cloud_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "h4", 96);
    \u0275\u0275text(14, "Upload Project Blueprints");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 97);
    \u0275\u0275text(16, " Drag and drop architecture plans, floor layouts, or site maps (PDF, DWG).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 98);
    \u0275\u0275text(18, "Browse Repository");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, NewProjectWizard_Conditional_68_Conditional_19_Template, 6, 0, "div", 99);
    \u0275\u0275conditionalCreate(20, NewProjectWizard_Conditional_68_Conditional_20_Template, 6, 0, "div", 99);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275conditional(ctx_r1.existingDocuments.length > 0 ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.documents.length > 0 ? 20 : -1);
  }
}
function NewProjectWizard_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 114);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_70_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(1, "mat-icon", 81);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Back ");
    \u0275\u0275elementEnd();
  }
}
function NewProjectWizard_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275text(1, "Save as Draft");
    \u0275\u0275elementEnd();
  }
}
function NewProjectWizard_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 115);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_73_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mat-icon", 81);
    \u0275\u0275text(3, "arrow_forward");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentStep === 1 ? "Configure Team & Roles" : ctx_r1.currentStep === 2 ? "Define Budget & Schedule" : "Initialize Documentation", " ");
  }
}
function NewProjectWizard_Conditional_74_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 117);
    \u0275\u0275text(1, "sync");
    \u0275\u0275elementEnd();
  }
}
function NewProjectWizard_Conditional_74_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.editMode ? "check_circle" : "rocket_launch");
  }
}
function NewProjectWizard_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 116);
    \u0275\u0275listener("click", function NewProjectWizard_Conditional_74_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveProject());
    });
    \u0275\u0275conditionalCreate(1, NewProjectWizard_Conditional_74_Conditional_1_Template, 2, 0, "mat-icon", 117);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, NewProjectWizard_Conditional_74_Conditional_3_Template, 2, 1, "mat-icon", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loading ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading ? ctx_r1.editMode ? "Updating Structural Matrix..." : "Initializing Blueprint..." : ctx_r1.editMode ? "Finalize Project Update" : "Initialize Live Project", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.loading ? 3 : -1);
  }
}
var NewProjectWizard = class _NewProjectWizard {
  fb;
  projectService;
  toastr;
  router;
  route;
  location;
  currentStep = 1;
  projectForm;
  availableMembers = [];
  selectedFiles = [];
  loading = false;
  showAssignDropdown = false;
  newMilestoneName = "";
  thumbnailFile = null;
  thumbnailPreview = null;
  editMode = false;
  projectId = null;
  existingDocuments = [];
  serverUrl = environment.serverUrl;
  constructor(fb, projectService, toastr, router, route, location) {
    this.fb = fb;
    this.projectService = projectService;
    this.toastr = toastr;
    this.router = router;
    this.route = route;
    this.location = location;
    this.projectForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      type: ["Commercial Renovation", Validators.required],
      completionDate: ["", Validators.required],
      address: ["", Validators.required],
      thumbnail: [null],
      team: this.fb.array([]),
      budgetTotal: [null, [Validators.required, Validators.min(1e3)]],
      milestones: this.fb.array([]),
      documents: this.fb.array([])
    });
  }
  ngOnInit() {
    this.fetchTeamMembers();
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.editMode = true;
        this.projectId = id;
        this.loadProjectForEdit(id);
      } else {
        this.addDefaultMilestones();
      }
    });
  }
  addDefaultMilestones() {
    if (this.milestones.length === 0) {
      this.milestones.push(this.createMilestone("Site Preparation & Foundations", "Phase 1", "primary"));
      this.milestones.push(this.createMilestone("Structural Framing", "Phase 2", "outline"));
    }
  }
  loadProjectForEdit(id) {
    this.loading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (res) => {
        const p = res.data;
        this.projectForm.patchValue({
          name: p.name,
          type: p.type || "Commercial Renovation",
          completionDate: p.completion_date?.split("T")[0],
          address: p.address,
          budgetTotal: p.budget_total
        });
        if (p.thumbnail) {
          if (p.thumbnail.startsWith("http")) {
            this.thumbnailPreview = p.thumbnail;
          } else {
            const baseUrl = this.serverUrl.endsWith("/") ? this.serverUrl.slice(0, -1) : this.serverUrl;
            const thumbPath = p.thumbnail.startsWith("/") ? p.thumbnail : `/${p.thumbnail}`;
            this.thumbnailPreview = `${baseUrl}${thumbPath}`;
          }
        }
        this.team.clear();
        p.team_members?.forEach((m) => {
          const role = m.PROJECT_TEAM?.role || "Technical Staff";
          this.team.push(this.fb.group({
            user_id: [m.id],
            name: [`${m.firstname} ${m.lastname}`],
            role: [role],
            avatar: [m.avatar || "https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop"]
          }));
        });
        this.milestones.clear();
        p.milestones?.forEach((m) => {
          this.milestones.push(this.createMilestone(m.name, m.phase || "Drafting", m.color || "primary"));
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error("Failed to load project details.");
      }
    });
  }
  // --- Getters ---
  get f() {
    return this.projectForm.controls;
  }
  get team() {
    return this.projectForm.get("team");
  }
  get milestones() {
    return this.projectForm.get("milestones");
  }
  get documents() {
    return this.projectForm.get("documents");
  }
  // --- Data Fetching ---
  fetchTeamMembers() {
    this.projectService.getTeamMembers().subscribe({
      next: (res) => {
        this.availableMembers = res.data;
      },
      error: () => {
        this.toastr.error("Failed to load team members");
      }
    });
  }
  // --- Step Logic ---
  nextStep() {
    if (this.isStepValid(this.currentStep)) {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    } else {
      this.toastr.warning("Please complete all required fields for this step.");
    }
  }
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  setStep(step) {
    if (step < this.currentStep || this.isStepValid(this.currentStep)) {
      this.currentStep = step;
    }
  }
  isStepValid(step) {
    switch (step) {
      case 1:
        return this.f["name"].valid && this.f["type"].valid && this.f["completionDate"].valid && this.f["address"].valid;
      case 2:
        return this.team.length > 0;
      case 3:
        return this.f["budgetTotal"].valid;
      case 4:
        return true;
      default:
        return true;
    }
  }
  // --- Step 2: Team Management ---
  addMember(member) {
    const isAlreadyAdded = this.team.value.find((m) => m.user_id === member.id);
    if (!isAlreadyAdded) {
      this.team.push(this.fb.group({
        user_id: [member.id],
        name: [member.firstname + " " + member.lastname],
        firstname: [member.firstname],
        lastname: [member.lastname],
        role: [member.role?.name || "Technical Staff"],
        avatar: [member.avatar || null]
      }));
    } else {
      this.toastr.warning("Member already added");
    }
    this.showAssignDropdown = false;
  }
  removeMember(index) {
    this.team.removeAt(index);
  }
  // --- Step 3: Milestones ---
  createMilestone(name, phase, color) {
    return this.fb.group({
      name: [name, Validators.required],
      phase: [phase],
      color: [color]
    });
  }
  addMilestone() {
    if (this.newMilestoneName.trim()) {
      this.milestones.push(this.createMilestone(this.newMilestoneName.trim(), `Phase ${this.milestones.length + 1}`, "secondary"));
      this.newMilestoneName = "";
    }
  }
  removeMilestone(index) {
    this.milestones.removeAt(index);
  }
  // --- Thumbnail ---
  onThumbnailSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.thumbnailFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  // --- Step 4: Documents ---
  onFileSelected(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);
      this.documents.push(this.fb.group({
        name: [file.name],
        size: [(file.size / 1024).toFixed(2) + " KB"]
      }));
    }
  }
  removeFile(index) {
    this.selectedFiles.splice(index, 1);
    this.documents.removeAt(index);
  }
  // --- Final Execution ---
  saveProject() {
    if (this.projectForm.invalid) {
      this.toastr.error("Please fix the errors in the form before saving.");
      return;
    }
    this.loading = true;
    const formData = new FormData();
    const payload = {
      name: this.projectForm.value.name,
      type: this.projectForm.value.type,
      address: this.projectForm.value.address,
      completionDate: this.projectForm.value.completionDate,
      budgetTotal: this.projectForm.value.budgetTotal,
      milestones: this.projectForm.value.milestones,
      team: this.projectForm.value.team.map((m) => ({
        user_id: m.user_id,
        role: m.role
      }))
    };
    formData.append("data", JSON.stringify(payload));
    if (this.thumbnailFile) {
      formData.append("thumbnail", this.thumbnailFile);
    }
    this.selectedFiles.forEach((file) => {
      formData.append("blueprints", file);
    });
    const request = this.editMode && this.projectId ? this.projectService.updateProject(this.projectId, formData) : this.projectService.createProject(formData);
    request.subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(this.editMode ? "Project updated!" : "Project initialized!");
        this.router.navigate(["/master/projects"]);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error?.message || "Error saving project");
      }
    });
  }
  cancel() {
    this.location.back();
  }
  static \u0275fac = function NewProjectWizard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NewProjectWizard)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Location));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewProjectWizard, selectors: [["app-new-project-wizard"]], standalone: false, decls: 75, vars: 29, consts: [["thumbInput", ""], ["fileInput", ""], [1, "bg-white/80", "dark:bg-slate-950/80", "backdrop-blur-xl", "flex", "justify-between", "items-center", "h-20", "px-8", "border-b", "border-slate-100", "dark:border-slate-800", "w-full", "mb-8", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "w-10", "h-10", "rounded-2xl", "bg-blue-600", "flex", "items-center", "justify-center", "text-white", "shadow-lg", "shadow-blue-500/20"], [1, "text-xl", "font-black", "tracking-tight", "text-slate-900", "dark:text-slate-50", "block", "leading-none"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest", "mt-1", "block"], [1, "flex", "items-center", "gap-6"], [1, "text-slate-400", "hover:text-rose-500", "transition-all", "flex", "items-center", "gap-2", "cursor-pointer", "border-none", "bg-transparent", "group", 3, "click"], [1, "material-symbols-outlined", "text-[20px]", "group-hover:rotate-90", "transition-transform"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest"], [1, "px-8", "pb-20", "w-full"], [1, "flex", "flex-col", "md:flex-row", "gap-12"], [1, "w-full", "md:w-72", "shrink-0"], [1, "space-y-8"], [1, "text-3xl", "font-black", "text-slate-900", "dark:text-slate-50", "mb-2", "tracking-tight"], [1, "text-xs", "text-slate-400", "leading-relaxed", "font-medium"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "gap-4", "py-4", "px-5", "rounded-2xl", "transition-all", "cursor-pointer", "border", "border-transparent", 3, "click", "ngClass"], [1, "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-xl", "text-xs", "font-black", "shadow-sm", 3, "ngClass"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-slate-50", "m-0"], [1, "text-[9px]", "uppercase", "tracking-widest", "font-black", "mt-0.5", 3, "ngClass"], [1, "p-6", "bg-blue-50", "dark:bg-blue-900/10", "rounded-2xl", "border", "border-blue-100", "dark:border-blue-800/50", "shadow-sm", "shadow-blue-500/5"], [1, "text-blue-500", "mb-3"], [1, "text-[11px]", "font-bold", "text-blue-900", "dark:text-blue-300", "leading-relaxed", "uppercase", "tracking-wider"], [1, "flex-1", 3, "formGroup"], [1, "bg-white", "dark:bg-slate-900", "rounded-[32px]", "p-12", "shadow-2xl", "shadow-slate-200/50", "dark:shadow-none", "border", "border-slate-100", "dark:border-slate-800"], [1, "flex", "justify-between", "items-center", "gap-4", "mt-16", "pt-10", "border-t", "border-slate-50", "dark:border-slate-800"], [1, "px-8", "py-4", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-all", "flex", "items-center", "gap-3", "border-none", "bg-transparent", "cursor-pointer"], [1, "flex-1"], [1, "px-8", "py-4", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "transition-all", "cursor-pointer", "bg-transparent", "border-none"], [1, "flex", "items-center", "gap-3", "px-10", "py-4", "bg-blue-600", "text-white", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "shadow-xl", "shadow-blue-500/30", "hover:bg-blue-700", "active:scale-95", "transition-all", "cursor-pointer", "border-none"], [1, "flex", "items-center", "gap-3", "px-10", "py-4", "bg-emerald-600", "text-white", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "shadow-xl", "shadow-emerald-500/30", "hover:bg-emerald-700", "active:scale-95", "transition-all", "cursor-pointer", "disabled:opacity-50", "border-none", 3, "disabled"], [1, "mb-10", "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-6"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-slate-50", "mb-1", "tracking-tight"], [1, "text-sm", "text-slate-400", "font-medium"], [1, "relative", "group", "shrink-0"], ["type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "w-32", "h-32", "rounded-3xl", "bg-slate-50", "dark:bg-slate-800", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-700", "flex", "flex-col", "items-center", "justify-center", "cursor-pointer", "overflow-hidden", "transition-all", "hover:border-blue-500", "group-hover:shadow-xl", "shadow-slate-200/50", "dark:shadow-none", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-10"], [1, "col-span-full"], [1, "block", "text-[10px]", "uppercase", "tracking-widest", "font-black", "text-slate-400", "mb-3", "ml-1"], [1, "text-rose-500"], ["formControlName", "name", "placeholder", "e.g., Sky-Rise Residences Phase II", "type", "text", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "p-5", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "ring-1", "ring-slate-200", "dark:ring-slate-700", "focus:ring-2", "focus:ring-blue-500/20", "outline-none", "transition-all", "placeholder:text-slate-300", "dark:placeholder:text-slate-600"], [1, "text-[10px]", "text-rose-500", "mt-2", "ml-1", "font-bold", "italic", "tracking-wide"], [1, "relative"], ["formControlName", "type", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "p-5", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "ring-1", "ring-slate-200", "dark:ring-slate-700", "focus:ring-2", "focus:ring-blue-500/20", "outline-none", "appearance-none", "cursor-pointer"], [1, "material-symbols-outlined", "absolute", "right-4", "top-1/2", "-translate-y-1/2", "text-slate-400", "pointer-events-none"], ["type", "date", "formControlName", "completionDate", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "p-5", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "ring-1", "ring-slate-200", "dark:ring-slate-700", "focus:ring-2", "focus:ring-blue-500/20", "outline-none", "transition-all"], [1, "material-symbols-outlined", "absolute", "left-5", "top-1/2", "-translate-y-1/2", "text-blue-500", "text-lg"], ["placeholder", "Search address or enter coordinates", "type", "text", "formControlName", "address", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "p-5", "pl-14", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "ring-1", "ring-slate-200", "dark:ring-slate-700", "focus:ring-2", "focus:ring-blue-500/20", "outline-none", "transition-all", "placeholder:text-slate-300", "dark:placeholder:text-slate-600"], [1, "w-full", "h-full", "object-cover", 3, "src"], [1, "absolute", "inset-0", "bg-black/40", "opacity-0", "group-hover:opacity-100", "transition-opacity", "flex", "items-center", "justify-center"], [1, "text-white"], [1, "text-slate-300", "mb-1"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "mb-10"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-6"], [1, "flex", "items-center", "gap-5", "p-5", "bg-slate-50", "dark:bg-slate-800/50", "border", "border-slate-100", "dark:border-slate-800", "rounded-3xl", "group", "relative", "transition-all", "hover:bg-white", "dark:hover:bg-slate-800", "hover:shadow-xl", "hover:shadow-slate-200/50", "dark:hover:shadow-none"], [1, "w-full", "h-full", "flex", "flex-col", "items-center", "justify-center", "gap-3", "p-8", "bg-slate-50", "dark:bg-slate-800/30", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-700", "rounded-3xl", "hover:bg-white", "dark:hover:bg-slate-800", "hover:border-blue-400", "transition-all", "text-slate-400", "hover:text-blue-600", "cursor-pointer", "group", 3, "click"], [1, "text-3xl", "group-hover:rotate-90", "transition-transform"], [1, "absolute", "top-full", "left-0", "mt-4", "w-full", "bg-white", "dark:bg-slate-900", "border", "border-slate-100", "dark:border-slate-800", "rounded-3xl", "shadow-2xl", "z-50", "max-h-72", "overflow-y-auto", "overflow-x-hidden", "p-2"], [1, "w-14", "h-14", "rounded-2xl", "object-cover", "shadow-md", "border-2", "border-white", "dark:border-slate-700", 3, "src"], [1, "w-10", "h-10", "rounded-xl", "bg-slate-100", "dark:bg-slate-700", "flex", "items-center", "justify-center", "text-slate-500", "font-black", "text-xs", "uppercase"], [1, "text-[10px]", "text-slate-400", "font-black", "uppercase", "tracking-widest", "mt-1"], [1, "opacity-0", "group-hover:opacity-100", "w-8", "h-8", "rounded-full", "bg-rose-50", "text-rose-500", "hover:bg-rose-100", "transition-all", "flex", "items-center", "justify-center", "cursor-pointer", "border-none", "shadow-sm", 3, "click"], [1, "text-lg"], [1, "group-hover:opacity-0", "text-emerald-500", "transition-opacity"], [1, "flex", "items-center", "gap-4", "p-4", "hover:bg-slate-50", "dark:hover:bg-slate-800", "rounded-2xl", "cursor-pointer", "transition-all"], [1, "p-8", "text-center"], [1, "flex", "items-center", "gap-4", "p-4", "hover:bg-slate-50", "dark:hover:bg-slate-800", "rounded-2xl", "cursor-pointer", "transition-all", 3, "click"], [1, "w-10", "h-10", "rounded-xl", "object-cover", "shadow-md", "border-2", "border-white", "dark:border-slate-700", 3, "src"], [1, "text-slate-200", "group-hover:text-blue-500"], [1, "text-slate-200", "text-4xl", "mb-2"], [1, "text-xs", "text-slate-400", "font-bold", "uppercase", "tracking-widest"], [1, "space-y-2"], [1, "absolute", "left-5", "top-1/2", "-translate-y-1/2", "text-slate-400", "font-black"], ["placeholder", "0.00", "type", "number", "formControlName", "budgetTotal", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "p-5", "pl-10", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "ring-1", "ring-slate-200", "dark:ring-slate-700", "focus:ring-2", "focus:ring-blue-500/20", "outline-none", "transition-all", "placeholder:text-slate-300"], ["placeholder", "5%", "type", "text", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "p-5", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "ring-1", "ring-slate-200", "dark:ring-slate-700", "focus:ring-2", "focus:ring-blue-500/20", "outline-none", "transition-all", "placeholder:text-slate-300"], [1, "col-span-full", "pt-6"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-6", "flex", "items-center", "gap-2"], [1, "text-sm"], [1, "space-y-4", "mb-6"], [1, "flex", "items-center", "justify-between", "p-5", "bg-slate-50", "dark:bg-slate-800", "rounded-3xl", "group", "border", "border-slate-100", "dark:border-slate-700/50", "hover:bg-white", "dark:hover:bg-slate-800", "transition-all", "hover:shadow-lg", "hover:shadow-slate-200/30", 3, "formGroup"], [1, "relative", "flex-1"], [1, "material-symbols-outlined", "absolute", "left-5", "top-1/2", "-translate-y-1/2", "text-slate-400", "text-lg"], ["type", "text", "placeholder", "Add specialized milestone...", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "p-5", "pl-14", "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "ring-1", "ring-slate-200", "dark:ring-slate-700", "focus:ring-2", "focus:ring-blue-500/20", "outline-none", "transition-all", 3, "ngModelChange", "keyup.enter", "ngModel", "ngModelOptions"], [1, "w-14", "h-14", "bg-blue-600", "text-white", "rounded-2xl", "hover:bg-blue-700", "active:scale-95", "transition-all", "cursor-pointer", "flex", "items-center", "justify-center", "shadow-lg", "shadow-blue-500/20", "border-none", 3, "click"], [1, "w-10", "h-10", "rounded-2xl", "bg-white", "dark:bg-slate-700", "shadow-sm", "flex", "items-center", "justify-center", "text-blue-500", "font-black", "text-xs"], ["formControlName", "name", 1, "bg-transparent", "border-none", "outline-none", "text-sm", "font-black", "text-slate-900", "dark:text-slate-50", "w-full", "placeholder:text-slate-300"], [1, "text-[9px]", "font-black", "px-3", "py-1.5", "rounded-full", "uppercase", "tracking-widest", 3, "ngClass"], [1, "opacity-0", "group-hover:opacity-100", "w-8", "h-8", "rounded-full", "bg-rose-50", "text-rose-500", "hover:bg-rose-100", "transition-all", "flex", "items-center", "justify-center", "cursor-pointer", "border-none", 3, "click"], [1, "p-12", "bg-slate-50", "dark:bg-slate-800/30", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-700", "rounded-[40px]", "flex", "flex-col", "items-center", "text-center", "group", "hover:bg-white", "dark:hover:bg-slate-800", "hover:border-blue-400", "transition-all", "cursor-pointer", 3, "click"], ["type", "file", "multiple", "", 1, "hidden", 3, "change"], [1, "w-20", "h-20", "bg-white", "dark:bg-slate-700", "rounded-[32px]", "flex", "items-center", "justify-center", "text-slate-300", "group-hover:bg-blue-600", "group-hover:text-white", "transition-all", "mb-6", "shadow-xl", "shadow-slate-200/50", "dark:shadow-none"], [1, "text-4xl"], [1, "text-lg", "font-black", "text-slate-900", "dark:text-slate-50", "mb-1", "tracking-tight"], [1, "text-xs", "text-slate-400", "font-medium", "max-w-sm", "mb-8", "leading-relaxed", "uppercase", "tracking-wider"], [1, "px-8", "py-3", "bg-blue-50", "dark:bg-blue-900/20", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-blue-600", "hover:bg-blue-100", "transition-all", "pointer-events-none"], [1, "space-y-4"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "ml-1"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [1, "flex", "items-center", "justify-between", "p-4", "bg-slate-50", "dark:bg-slate-800/50", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-700/50"], [1, "flex", "items-center", "gap-3"], [1, "text-emerald-500"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300"], [1, "text-[9px]", "text-slate-400", "font-black", "uppercase"], [1, "space-y-3"], [1, "flex", "items-center", "justify-between", "p-4", "bg-blue-50/50", "dark:bg-blue-900/10", "rounded-2xl", "border", "border-blue-100/50", "dark:border-blue-800/30", "group"], [1, "w-10", "h-10", "rounded-xl", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "shadow-sm"], [1, "text-blue-500"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-slate-50"], [1, "text-[9px]", "text-slate-400", "font-black", "uppercase", "tracking-widest"], [1, "w-8", "h-8", "rounded-full", "bg-rose-50", "text-rose-500", "hover:bg-rose-100", "transition-all", "flex", "items-center", "justify-center", "cursor-pointer", "border-none", "shadow-sm", "opacity-0", "group-hover:opacity-100", 3, "click"], [1, "px-8", "py-4", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-all", "flex", "items-center", "gap-3", "border-none", "bg-transparent", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "px-10", "py-4", "bg-blue-600", "text-white", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "shadow-xl", "shadow-blue-500/30", "hover:bg-blue-700", "active:scale-95", "transition-all", "cursor-pointer", "border-none", 3, "click"], [1, "flex", "items-center", "gap-3", "px-10", "py-4", "bg-emerald-600", "text-white", "rounded-2xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "shadow-xl", "shadow-emerald-500/30", "hover:bg-emerald-700", "active:scale-95", "transition-all", "cursor-pointer", "disabled:opacity-50", "border-none", 3, "click", "disabled"], [1, "animate-spin", "text-sm"]], template: function NewProjectWizard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 2)(1, "div", 3)(2, "div", 4)(3, "mat-icon");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div")(6, "span", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 7)(11, "button", 8);
      \u0275\u0275listener("click", function NewProjectWizard_Template_button_click_11_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementStart(12, "span", 9);
      \u0275\u0275text(13, "close");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(16, "div", 11)(17, "div", 12)(18, "aside", 13)(19, "div", 14)(20, "div")(21, "h2", 15);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p", 16);
      \u0275\u0275text(24, "Defining the structural foundation and logistical parameters for your next milestone.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "nav", 17)(26, "div", 18);
      \u0275\u0275listener("click", function NewProjectWizard_Template_div_click_26_listener() {
        return ctx.setStep(1);
      });
      \u0275\u0275elementStart(27, "span", 19);
      \u0275\u0275text(28, "01");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div")(30, "p", 20);
      \u0275\u0275text(31, "General Info");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 21);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "div", 18);
      \u0275\u0275listener("click", function NewProjectWizard_Template_div_click_34_listener() {
        return ctx.setStep(2);
      });
      \u0275\u0275elementStart(35, "span", 19);
      \u0275\u0275text(36, "02");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div")(38, "p", 20);
      \u0275\u0275text(39, "Team & Roles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p", 21);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "div", 18);
      \u0275\u0275listener("click", function NewProjectWizard_Template_div_click_42_listener() {
        return ctx.setStep(3);
      });
      \u0275\u0275elementStart(43, "span", 19);
      \u0275\u0275text(44, "03");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div")(46, "p", 20);
      \u0275\u0275text(47, "Budget & Timeline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 21);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(50, "div", 18);
      \u0275\u0275listener("click", function NewProjectWizard_Template_div_click_50_listener() {
        return ctx.setStep(4);
      });
      \u0275\u0275elementStart(51, "span", 19);
      \u0275\u0275text(52, "04");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div")(54, "p", 20);
      \u0275\u0275text(55, "Documentation");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p", 21);
      \u0275\u0275text(57);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(58, "div", 22)(59, "mat-icon", 23);
      \u0275\u0275text(60, "lightbulb");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "p", 24);
      \u0275\u0275text(62, " Pro-tip: You can import existing project templates from your Dashboard to speed up this setup. ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(63, "section", 25)(64, "div", 26);
      \u0275\u0275conditionalCreate(65, NewProjectWizard_Conditional_65_Template, 47, 8, "div");
      \u0275\u0275conditionalCreate(66, NewProjectWizard_Conditional_66_Template, 17, 1, "div");
      \u0275\u0275conditionalCreate(67, NewProjectWizard_Conditional_67_Template, 36, 5, "div");
      \u0275\u0275conditionalCreate(68, NewProjectWizard_Conditional_68_Template, 21, 2, "div");
      \u0275\u0275elementStart(69, "div", 27);
      \u0275\u0275conditionalCreate(70, NewProjectWizard_Conditional_70_Template, 4, 0, "button", 28);
      \u0275\u0275element(71, "div", 29);
      \u0275\u0275conditionalCreate(72, NewProjectWizard_Conditional_72_Template, 2, 0, "button", 30);
      \u0275\u0275conditionalCreate(73, NewProjectWizard_Conditional_73_Template, 4, 1, "button", 31)(74, NewProjectWizard_Conditional_74_Template, 4, 4, "button", 32);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.editMode ? "architecture" : "rocket_launch");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.editMode ? "Update Project Blueprint" : "New Project Wizard");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Phase ", ctx.currentStep, " of 04 \u2022 Structural Definition");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.editMode ? "Exit Editor" : "Back to List");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.editMode ? "Edit Project" : "Create Project");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.currentStep === 1 ? "bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800" : "opacity-40 hover:opacity-100");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.currentStep === 1 ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", ctx.currentStep === 1 ? "text-blue-500" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.currentStep === 1 ? "In Progress" : ctx.currentStep > 1 ? "Completed" : "Upcoming");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.currentStep === 2 ? "bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800" : "opacity-40 hover:opacity-100");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.currentStep === 2 ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", ctx.currentStep === 2 ? "text-blue-500" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.currentStep === 2 ? "In Progress" : ctx.currentStep > 2 ? "Completed" : "Upcoming");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.currentStep === 3 ? "bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800" : "opacity-40 hover:opacity-100");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.currentStep === 3 ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", ctx.currentStep === 3 ? "text-blue-500" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.currentStep === 3 ? "In Progress" : ctx.currentStep > 3 ? "Completed" : "Upcoming");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.currentStep === 4 ? "bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800" : "opacity-40 hover:opacity-100");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.currentStep === 4 ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", ctx.currentStep === 4 ? "text-blue-500" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.currentStep === 4 ? "In Progress" : "Upcoming");
      \u0275\u0275advance(6);
      \u0275\u0275property("formGroup", ctx.projectForm);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep === 1 ? 65 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 2 ? 66 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 3 ? 67 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 4 ? 68 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep > 1 ? 70 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep === 1 ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep < 4 ? 73 : 74);
    }
  }, dependencies: [NgClass, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, FormGroupDirective, FormControlName, MatIcon], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewProjectWizard, [{
    type: Component,
    args: [{ selector: "app-new-project-wizard", standalone: false, template: `<!-- Custom Header for Wizard -->\r
<header\r
    class="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center h-20 px-8 border-b border-slate-100 dark:border-slate-800 w-full mb-8 shadow-sm">\r
    <div class="flex items-center gap-4">\r
        <div\r
            class="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">\r
            <mat-icon>{{ editMode ? 'architecture' : 'rocket_launch' }}</mat-icon>\r
        </div>\r
        <div>\r
            <span class="text-xl font-black tracking-tight text-slate-900 dark:text-slate-50 block leading-none">{{\r
                editMode ? 'Update Project Blueprint' : 'New Project Wizard' }}</span>\r
            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">Phase {{ currentStep\r
                }} of 04 \u2022 Structural Definition</span>\r
        </div>\r
    </div>\r
    <div class="flex items-center gap-6">\r
        <button (click)="cancel()"\r
            class="text-slate-400 hover:text-rose-500 transition-all flex items-center gap-2 cursor-pointer border-none bg-transparent group">\r
            <span class="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">close</span>\r
            <span class="text-[10px] font-black uppercase tracking-widest">{{ editMode ? 'Exit Editor' : 'Back to List'\r
                }}</span>\r
        </button>\r
    </div>\r
</header>\r
\r
<div class=" px-8 pb-20 w-full">\r
    <div class="flex flex-col md:flex-row gap-12">\r
        <!-- Left Column: Architectural Progress & Context -->\r
        <aside class="w-full md:w-72 shrink-0">\r
            <div class="space-y-8">\r
                <div>\r
                    <h2 class="text-3xl font-black text-slate-900 dark:text-slate-50 mb-2 tracking-tight">{{ editMode ?\r
                        'Edit Project' : 'Create Project' }}</h2>\r
                    <p class="text-xs text-slate-400 leading-relaxed font-medium">Defining the structural foundation and\r
                        logistical parameters for your next milestone.</p>\r
                </div>\r
\r
                <nav class="flex flex-col gap-2">\r
                    <!-- Step 1 -->\r
                    <div (click)="setStep(1)"\r
                        class="flex items-center gap-4 py-4 px-5 rounded-2xl transition-all cursor-pointer border border-transparent"\r
                        [ngClass]="currentStep === 1 ? 'bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800' : 'opacity-40 hover:opacity-100'">\r
                        <span class="flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black shadow-sm"\r
                            [ngClass]="currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'">01</span>\r
                        <div>\r
                            <p class="text-sm font-black text-slate-900 dark:text-slate-50 m-0">General Info</p>\r
                            <p class="text-[9px] uppercase tracking-widest font-black mt-0.5"\r
                                [ngClass]="currentStep === 1 ? 'text-blue-500' : 'text-slate-400'">{{ currentStep === 1\r
                                ? 'In Progress' : (currentStep > 1 ? 'Completed' : 'Upcoming') }}</p>\r
                        </div>\r
                    </div>\r
\r
                    <!-- Step 2 -->\r
                    <div (click)="setStep(2)"\r
                        class="flex items-center gap-4 py-4 px-5 rounded-2xl transition-all cursor-pointer border border-transparent"\r
                        [ngClass]="currentStep === 2 ? 'bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800' : 'opacity-40 hover:opacity-100'">\r
                        <span class="flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black shadow-sm"\r
                            [ngClass]="currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'">02</span>\r
                        <div>\r
                            <p class="text-sm font-black text-slate-900 dark:text-slate-50 m-0">Team & Roles</p>\r
                            <p class="text-[9px] uppercase tracking-widest font-black mt-0.5"\r
                                [ngClass]="currentStep === 2 ? 'text-blue-500' : 'text-slate-400'">{{ currentStep === 2\r
                                ? 'In Progress' : (currentStep > 2 ? 'Completed' : 'Upcoming') }}</p>\r
                        </div>\r
                    </div>\r
\r
                    <!-- Step 3 -->\r
                    <div (click)="setStep(3)"\r
                        class="flex items-center gap-4 py-4 px-5 rounded-2xl transition-all cursor-pointer border border-transparent"\r
                        [ngClass]="currentStep === 3 ? 'bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800' : 'opacity-40 hover:opacity-100'">\r
                        <span class="flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black shadow-sm"\r
                            [ngClass]="currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'">03</span>\r
                        <div>\r
                            <p class="text-sm font-black text-slate-900 dark:text-slate-50 m-0">Budget & Timeline</p>\r
                            <p class="text-[9px] uppercase tracking-widest font-black mt-0.5"\r
                                [ngClass]="currentStep === 3 ? 'text-blue-500' : 'text-slate-400'">{{ currentStep === 3\r
                                ? 'In Progress' : (currentStep > 3 ? 'Completed' : 'Upcoming') }}</p>\r
                        </div>\r
                    </div>\r
\r
                    <!-- Step 4 -->\r
                    <div (click)="setStep(4)"\r
                        class="flex items-center gap-4 py-4 px-5 rounded-2xl transition-all cursor-pointer border border-transparent"\r
                        [ngClass]="currentStep === 4 ? 'bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800' : 'opacity-40 hover:opacity-100'">\r
                        <span class="flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black shadow-sm"\r
                            [ngClass]="currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'">04</span>\r
                        <div>\r
                            <p class="text-sm font-black text-slate-900 dark:text-slate-50 m-0">Documentation</p>\r
                            <p class="text-[9px] uppercase tracking-widest font-black mt-0.5"\r
                                [ngClass]="currentStep === 4 ? 'text-blue-500' : 'text-slate-400'">{{ currentStep === 4\r
                                ? 'In Progress' : 'Upcoming' }}</p>\r
                        </div>\r
                    </div>\r
                </nav>\r
\r
                <div\r
                    class="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50 shadow-sm shadow-blue-500/5">\r
                    <mat-icon class="text-blue-500 mb-3">lightbulb</mat-icon>\r
                    <p\r
                        class="text-[11px] font-bold text-blue-900 dark:text-blue-300 leading-relaxed uppercase tracking-wider">\r
                        Pro-tip: You can import existing project templates from your Dashboard to speed up this setup.\r
                    </p>\r
                </div>\r
            </div>\r
        </aside>\r
\r
        <!-- Right Column: Form Canvas -->\r
        <section class="flex-1" [formGroup]="projectForm">\r
            <div\r
                class="bg-white dark:bg-slate-900 rounded-[32px] p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">\r
\r
                @if (currentStep === 1) {\r
                <!-- Step 1: General Info -->\r
                <div>\r
                    <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">\r
                        <div>\r
                            <h3 class="text-2xl font-black text-slate-900 dark:text-slate-50 mb-1 tracking-tight">\r
                                General Project Information</h3>\r
                            <p class="text-sm text-slate-400 font-medium">Establish the identity and physical location\r
                                of the project site.</p>\r
                        </div>\r
                        <!-- Thumbnail Upload -->\r
                        <div class="relative group shrink-0">\r
                            <input type="file" #thumbInput class="hidden" (change)="onThumbnailSelected($event)"\r
                                accept="image/*">\r
                            <div (click)="thumbInput.click()"\r
                                class="w-32 h-32 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-blue-500 group-hover:shadow-xl shadow-slate-200/50 dark:shadow-none">\r
                                @if (thumbnailPreview) {\r
                                <img [src]="thumbnailPreview" class="w-full h-full object-cover">\r
                                <div\r
                                    class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">\r
                                    <mat-icon class="text-white">edit</mat-icon>\r
                                </div>\r
                                } @else {\r
                                <mat-icon class="text-slate-300 mb-1">add_photo_alternate</mat-icon>\r
                                <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Add\r
                                    Thumbnail</span>\r
                                }\r
                            </div>\r
                        </div>\r
                    </div>\r
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">\r
                        <div class="col-span-full">\r
                            <label\r
                                class="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3 ml-1">Project\r
                                Name <span class="text-rose-500">*</span></label>\r
                            <input\r
                                class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 text-sm font-bold text-slate-900 dark:text-slate-50 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"\r
                                [class.ring-rose-500]="f['name'].touched && f['name'].invalid" formControlName="name"\r
                                placeholder="e.g., Sky-Rise Residences Phase II" type="text" />\r
                            @if (f['name'].touched && f['name'].invalid) {\r
                            <p class="text-[10px] text-rose-500 mt-2 ml-1 font-bold italic tracking-wide">Project name\r
                                is required (min 3 chars).</p>\r
                            }\r
                        </div>\r
                        <div>\r
                            <label\r
                                class="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3 ml-1">Project\r
                                Type</label>\r
                            <div class="relative">\r
                                <select\r
                                    class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 text-sm font-bold text-slate-900 dark:text-slate-50 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none cursor-pointer"\r
                                    formControlName="type">\r
                                    <option>Commercial Renovation</option>\r
                                    <option>Residential New Build</option>\r
                                    <option>Industrial Facility</option>\r
                                    <option>Infrastructure</option>\r
                                </select>\r
                                <span\r
                                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>\r
                            </div>\r
                        </div>\r
                        <div>\r
                            <label\r
                                class="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3 ml-1">Estimated\r
                                Completion</label>\r
                            <input [class.ring-rose-500]="f['completionDate'].touched && f['completionDate'].invalid"\r
                                class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 text-sm font-bold text-slate-900 dark:text-slate-50 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"\r
                                type="date" formControlName="completionDate" />\r
                        </div>\r
                        <div class="col-span-full">\r
                            <label\r
                                class="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3 ml-1">Project\r
                                Site Address</label>\r
                            <div class="relative">\r
                                <span\r
                                    class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 text-lg">location_on</span>\r
                                <input [class.ring-rose-500]="f['address'].touched && f['address'].invalid"\r
                                    class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 pl-14 text-sm font-bold text-slate-900 dark:text-slate-50 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"\r
                                    placeholder="Search address or enter coordinates" type="text"\r
                                    formControlName="address" />\r
                            </div>\r
                        </div>\r
                    </div>\r
                </div>\r
                }\r
\r
                @if (currentStep === 2) {\r
                <!-- Step 2: Team & Roles -->\r
                <div>\r
                    <div class="mb-10">\r
                        <h3 class="text-2xl font-black text-slate-900 dark:text-slate-50 mb-1 tracking-tight">\r
                            Architecture & Site Team</h3>\r
                        <p class="text-sm text-slate-400 font-medium">Assign lead architects, site managers, and safety\r
                            officers.</p>\r
                    </div>\r
                    <div class="space-y-8">\r
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">\r
                            @for (member of team.value; track i; let i = $index) {\r
                            <div\r
                                class="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-3xl group relative transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none">\r
\r
                                @if (member.avatar) {\r
                                <img [src]="serverUrl + member.avatar"\r
                                    class="w-14 h-14 rounded-2xl object-cover shadow-md border-2 border-white dark:border-slate-700" />\r
                                } @else {\r
                                <div\r
                                    class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-black text-xs uppercase">\r
                                    {{ member.firstname.charAt(0) }}{{ member.lastname.charAt(0) }}\r
                                </div>\r
                                }\r
                                <div class="flex-1">\r
                                    <p class="text-sm font-black text-slate-900 dark:text-slate-50 m-0">{{ member.name\r
                                        }}</p>\r
                                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{{\r
                                        member.role }}</p>\r
                                </div>\r
                                <button (click)="removeMember(i)"\r
                                    class="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all flex items-center justify-center cursor-pointer border-none shadow-sm">\r
                                    <mat-icon class="text-lg">close</mat-icon>\r
                                </button>\r
                                <mat-icon\r
                                    class="group-hover:opacity-0 text-emerald-500 transition-opacity">check_circle</mat-icon>\r
                            </div>\r
                            }\r
\r
                            <div class="relative">\r
                                <button (click)="showAssignDropdown = !showAssignDropdown"\r
                                    class="w-full h-full flex flex-col items-center justify-center gap-3 p-8 bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl hover:bg-white dark:hover:bg-slate-800 hover:border-blue-400 transition-all text-slate-400 hover:text-blue-600 cursor-pointer group">\r
                                    <mat-icon\r
                                        class="text-3xl group-hover:rotate-90 transition-transform">add_circle</mat-icon>\r
                                    <span class="text-[10px] font-black uppercase tracking-widest">Assign Member</span>\r
                                </button>\r
\r
                                @if (showAssignDropdown) {\r
                                <div\r
                                    class="absolute top-full left-0 mt-4 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl z-50 max-h-72 overflow-y-auto overflow-x-hidden p-2">\r
                                    @for (member of availableMembers; track member.id) {\r
                                    <div (click)="addMember(member)"\r
                                        class="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl cursor-pointer transition-all">\r
                                        @if (member.avatar) {\r
                                        <img [src]="serverUrl + member.avatar"\r
                                            class="w-10 h-10 rounded-xl object-cover shadow-md border-2 border-white dark:border-slate-700" />\r
                                        } @else {\r
                                        <div\r
                                            class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-black text-xs uppercase">\r
                                            {{ member.firstname.charAt(0) }}{{ member.lastname.charAt(0) }}\r
                                        </div>\r
                                        }\r
                                        <div class="flex-1">\r
                                            <p class="text-sm font-black text-slate-900 dark:text-slate-50 m-0">{{\r
                                                member.firstname }} {{ member.lastname }}</p>\r
                                            <p\r
                                                class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">\r
                                                {{ member.role?.name || 'Staff' }}</p>\r
                                        </div>\r
                                        <mat-icon class="text-slate-200 group-hover:text-blue-500">add</mat-icon>\r
                                    </div>\r
                                    } @empty {\r
                                    <div class="p-8 text-center">\r
                                        <mat-icon class="text-slate-200 text-4xl mb-2">person_off</mat-icon>\r
                                        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">No\r
                                            available members</p>\r
                                    </div>\r
                                    }\r
                                </div>\r
                                }\r
                            </div>\r
                        </div>\r
                    </div>\r
                </div>\r
                }\r
\r
                @if (currentStep === 3) {\r
                <!-- Step 3: Budget & Schedule -->\r
                <div>\r
                    <div class="mb-10">\r
                        <h3 class="text-2xl font-black text-slate-900 dark:text-slate-50 mb-1 tracking-tight">Fiscal\r
                            Parameters & Timeline</h3>\r
                        <p class="text-sm text-slate-400 font-medium">Defining the commercial constraints and\r
                            chronological milestones.</p>\r
                    </div>\r
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">\r
                        <div class="space-y-2">\r
                            <label\r
                                class="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3 ml-1">Total\r
                                Project Budget <span class="text-rose-500">*</span></label>\r
                            <div class="relative">\r
                                <span\r
                                    class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">\u20B9</span>\r
                                <input [class.ring-rose-500]="f['budgetTotal'].touched && f['budgetTotal'].invalid"\r
                                    class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 pl-10 text-sm font-bold text-slate-900 dark:text-slate-50 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300"\r
                                    placeholder="0.00" type="number" formControlName="budgetTotal" />\r
                            </div>\r
                        </div>\r
                        <div class="space-y-2">\r
                            <label\r
                                class="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3 ml-1">Contingency\r
                                Fund (%)</label>\r
                            <input\r
                                class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 text-sm font-bold text-slate-900 dark:text-slate-50 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300"\r
                                placeholder="5%" type="text" />\r
                        </div>\r
                        <div class="col-span-full pt-6">\r
                            <h4\r
                                class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">\r
                                <mat-icon class="text-sm">flag</mat-icon>\r
                                Initial Phase Milestones\r
                            </h4>\r
                            <div class="space-y-4 mb-6">\r
                                @for (ms of milestones.controls; track i; let i = $index) {\r
                                <div [formGroup]="$any(ms)"\r
                                    class="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl group border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-200/30">\r
                                    <div class="flex items-center gap-4">\r
                                        <div\r
                                            class="w-10 h-10 rounded-2xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-blue-500 font-black text-xs">\r
                                            {{ i + 1 }}\r
                                        </div>\r
                                        <input formControlName="name"\r
                                            class="bg-transparent border-none outline-none text-sm font-black text-slate-900 dark:text-slate-50 w-full placeholder:text-slate-300">\r
                                    </div>\r
                                    <div class="flex items-center gap-4">\r
                                        <span\r
                                            class="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest"\r
                                            [ngClass]="'text-blue-600 bg-blue-50 dark:bg-blue-900/20'">{{ ms.value.phase\r
                                            }}</span>\r
                                        <button (click)="removeMilestone(i)"\r
                                            class="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all flex items-center justify-center cursor-pointer border-none">\r
                                            <mat-icon class="text-lg">delete_outline</mat-icon>\r
                                        </button>\r
                                    </div>\r
                                </div>\r
                                }\r
                            </div>\r
                            <div class="flex items-center gap-4">\r
                                <div class="relative flex-1">\r
                                    <span\r
                                        class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">add_circle</span>\r
                                    <input type="text" [(ngModel)]="newMilestoneName"\r
                                        [ngModelOptions]="{standalone: true}" (keyup.enter)="addMilestone()"\r
                                        placeholder="Add specialized milestone..."\r
                                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-5 pl-14 text-sm font-bold text-slate-900 dark:text-slate-50 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">\r
                                </div>\r
                                <button (click)="addMilestone()"\r
                                    class="w-14 h-14 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center shadow-lg shadow-blue-500/20 border-none">\r
                                    <mat-icon>add</mat-icon>\r
                                </button>\r
                            </div>\r
                        </div>\r
                    </div>\r
                </div>\r
                }\r
\r
                @if (currentStep === 4) {\r
                <!-- Step 4: Documentation -->\r
                <div>\r
                    <div class="mb-10">\r
                        <h3 class="text-2xl font-black text-slate-900 dark:text-slate-50 mb-1 tracking-tight">Logistics\r
                            & Finalization</h3>\r
                        <p class="text-sm text-slate-400 font-medium">Review all settings and initialize the project\r
                            workspace.</p>\r
                    </div>\r
                    <div class="space-y-8">\r
                        <div (click)="fileInput.click()"\r
                            class="p-12 bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[40px] flex flex-col items-center text-center group hover:bg-white dark:hover:bg-slate-800 hover:border-blue-400 transition-all cursor-pointer">\r
                            <input #fileInput type="file" multiple class="hidden" (change)="onFileSelected($event)">\r
                            <div\r
                                class="w-20 h-20 bg-white dark:bg-slate-700 rounded-[32px] flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all mb-6 shadow-xl shadow-slate-200/50 dark:shadow-none">\r
                                <mat-icon class="text-4xl">cloud_upload</mat-icon>\r
                            </div>\r
                            <h4 class="text-lg font-black text-slate-900 dark:text-slate-50 mb-1 tracking-tight">Upload\r
                                Project Blueprints</h4>\r
                            <p\r
                                class="text-xs text-slate-400 font-medium max-w-sm mb-8 leading-relaxed uppercase tracking-wider">\r
                                Drag and drop architecture plans, floor layouts, or site maps (PDF, DWG).</p>\r
                            <button\r
                                class="px-8 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-100 transition-all pointer-events-none">Browse\r
                                Repository</button>\r
                        </div>\r
\r
                        @if (existingDocuments.length > 0) {\r
                        <div class="space-y-4">\r
                            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Existing\r
                                Site Records</h4>\r
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
                                @for (doc of existingDocuments; track doc.id) {\r
                                <div\r
                                    class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">\r
                                    <div class="flex items-center gap-3">\r
                                        <mat-icon class="text-emerald-500">verified</mat-icon>\r
                                        <span class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ doc.name\r
                                            }}</span>\r
                                    </div>\r
                                    <span class="text-[9px] text-slate-400 font-black uppercase">{{ doc.size }}</span>\r
                                </div>\r
                                }\r
                            </div>\r
                        </div>\r
                        }\r
\r
                        @if (documents.length > 0) {\r
                        <div class="space-y-4">\r
                            <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Upload\r
                                Queue</h4>\r
                            <div class="space-y-3">\r
                                @for (doc of documents.value; track i; let i = $index) {\r
                                <div\r
                                    class="flex items-center justify-between p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-800/30 group">\r
                                    <div class="flex items-center gap-4">\r
                                        <div\r
                                            class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">\r
                                            <mat-icon class="text-blue-500">description</mat-icon>\r
                                        </div>\r
                                        <span class="text-sm font-black text-slate-900 dark:text-slate-50">{{ doc.name\r
                                            }}</span>\r
                                    </div>\r
                                    <div class="flex items-center gap-4">\r
                                        <span class="text-[9px] text-slate-400 font-black uppercase tracking-widest">{{\r
                                            doc.size }}</span>\r
                                        <button (click)="removeFile(i)"\r
                                            class="w-8 h-8 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all flex items-center justify-center cursor-pointer border-none shadow-sm opacity-0 group-hover:opacity-100">\r
                                            <mat-icon class="text-lg">delete_outline</mat-icon>\r
                                        </button>\r
                                    </div>\r
                                </div>\r
                                }\r
                            </div>\r
                        </div>\r
                        }\r
                    </div>\r
                </div>\r
                }\r
\r
                <!-- Actions Footer -->\r
                <div\r
                    class="flex justify-between items-center gap-4 mt-16 pt-10 border-t border-slate-50 dark:border-slate-800">\r
                    @if (currentStep > 1) {\r
                    <button (click)="prevStep()"\r
                        class="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-3 border-none bg-transparent cursor-pointer">\r
                        <mat-icon class="text-sm">arrow_back</mat-icon>\r
                        Back\r
                    </button>\r
                    }\r
                    <div class="flex-1"></div>\r
\r
                    @if (currentStep === 1) {\r
                    <button\r
                        class="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer bg-transparent border-none">Save\r
                        as Draft</button>\r
                    }\r
\r
                    @if (currentStep < 4) { <button (click)="nextStep()"\r
                        class="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer border-none">\r
                        {{ currentStep === 1 ? 'Configure Team & Roles' : (currentStep === 2 ? 'Define Budget &\r
                        Schedule' : 'Initialize Documentation') }}\r
                        <mat-icon class="text-sm">arrow_forward</mat-icon>\r
                        </button>\r
                        } @else {\r
                        <button (click)="saveProject()" [disabled]="loading"\r
                            class="flex items-center gap-3 px-10 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 border-none">\r
                            @if (loading) {\r
                            <mat-icon class="animate-spin text-sm">sync</mat-icon>\r
                            }\r
                            {{ loading ? (editMode ? 'Updating Structural Matrix...' : 'Initializing Blueprint...') :\r
                            (editMode ? 'Finalize Project Update' : 'Initialize Live Project') }}\r
                            @if (!loading) {\r
                            <mat-icon class="text-sm">{{ editMode ? 'check_circle' : 'rocket_launch' }}</mat-icon>\r
                            }\r
                        </button>\r
                        }\r
                </div>\r
            </div>\r
        </section>\r
    </div>\r
</div>` }]
  }], () => [{ type: FormBuilder }, { type: ProjectService }, { type: ToastrService }, { type: Router }, { type: ActivatedRoute }, { type: Location }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewProjectWizard, { className: "NewProjectWizard", filePath: "app/modules/projects/new-project-wizard/new-project-wizard.ts", lineNumber: 16 });
})();

// src/app/shared/interfaces/project.interface.ts
var MilestoneStatus;
(function(MilestoneStatus2) {
  MilestoneStatus2["NOT_STARTED"] = "Not Started";
  MilestoneStatus2["IN_PROGRESS"] = "In Progress";
  MilestoneStatus2["ON_HOLD"] = "On Hold";
  MilestoneStatus2["COMPLETED"] = "Completed";
})(MilestoneStatus || (MilestoneStatus = {}));

// src/app/modules/projects/dialogs/milestone-form-dialog/milestone-form-dialog.ts
function MilestoneFormDialog_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " Name is required ");
    \u0275\u0275elementEnd();
  }
}
var MilestoneFormDialog = class _MilestoneFormDialog {
  dialogRef;
  data;
  projectService;
  toastr;
  fb;
  isEditingMilestone = false;
  form;
  constructor(dialogRef, data, projectService, toastr, fb) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.projectService = projectService;
    this.toastr = toastr;
    this.fb = fb;
    this.isEditingMilestone = !!data?.milestone;
    this.form = this.fb.group({
      name: [this.data?.milestone?.name || "", [Validators.required]],
      progress: [this.data?.milestone?.progress || 0, [Validators.min(0), Validators.max(100)]],
      color: [this.data?.milestone?.color || "blue-600", [Validators.required]],
      status: [this.data?.milestone?.status || MilestoneStatus.NOT_STARTED, [Validators.required]],
      startDate: [this.data?.milestone?.startDate || null, [Validators.required]],
      endDate: [this.data?.milestone?.endDate || null, [Validators.required]]
    });
  }
  ngOnInit() {
    if (this.data?.milestone) {
      this.form.patchValue(this.data.milestone);
    }
  }
  saveMilestone() {
    if (this.form.invalid) {
      this.toastr.error("Please fill in all required fields correctly");
      this.form.markAllAsTouched();
      return;
    }
    const payload = __spreadProps(__spreadValues({}, this.form.value), {
      parent_id: this.data.parent_id || null
    });
    const request$ = this.isEditingMilestone ? this.projectService.updateMilestone(this.data.project?.id, this.data.milestone.id, payload) : this.projectService.createMilestone(this.data.project?.id, payload);
    request$.subscribe({
      next: () => {
        this.toastr.success(`Milestone ${this.isEditingMilestone ? "updated" : "saved"} successfully`);
        this.dialogRef.close(this.form.value);
      },
      error: () => {
        this.toastr.error(`Failed to ${this.isEditingMilestone ? "update" : "save"} milestone`);
      }
    });
  }
  static \u0275fac = function MilestoneFormDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MilestoneFormDialog)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MilestoneFormDialog, selectors: [["app-milestone-form-dialog"]], standalone: false, decls: 39, vars: 9, consts: [["startPicker", ""], ["endPicker", ""], ["icon", "flag", "cancelLabel", "Cancel", "primaryLabel", "Save", 3, "cancelled", "primary", "title", "badge", "showCloseButton", "showFooter", "primaryDisabled"], [3, "formGroup"], [1, "p-7"], [1, "mb-5"], [1, "text-sm", "font-black", "block", "mb-2", "text-slate-700", "dark:text-slate-200"], ["type", "text", "formControlName", "name", "placeholder", "Enter milestone name", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all"], [1, "text-red-500", "text-xs", "mt-1"], ["formControlName", "color", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all"], ["value", "blue-600"], ["value", "indigo-600"], ["value", "emerald-600"], ["value", "amber-600"], ["value", "rose-600"], ["value", "purple-600"], ["value", "cyan-600"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["formControlName", "startDate", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "cursor-pointer", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all", 3, "click", "matDatepicker"], ["formControlName", "endDate", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "px-4", "py-3.5", "outline-none", "bg-white", "dark:bg-slate-900", "cursor-pointer", "focus:border-primary", "focus:ring-4", "focus:ring-primary/10", "transition-all", 3, "click", "matDatepicker"]], template: function MilestoneFormDialog_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "app-common-dialog", 2);
      \u0275\u0275listener("cancelled", function MilestoneFormDialog_Template_app_common_dialog_cancelled_0_listener() {
        return ctx.dialogRef.close();
      })("primary", function MilestoneFormDialog_Template_app_common_dialog_primary_0_listener() {
        return ctx.saveMilestone();
      });
      \u0275\u0275elementStart(1, "form", 3)(2, "div", 4)(3, "div", 5)(4, "label", 6);
      \u0275\u0275text(5, " Milestone Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "input", 7);
      \u0275\u0275conditionalCreate(7, MilestoneFormDialog_Conditional_7_Template, 2, 0, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "label", 6);
      \u0275\u0275text(10, " Color ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "select", 9)(12, "option", 10);
      \u0275\u0275text(13, "Blue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "option", 11);
      \u0275\u0275text(15, "Indigo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "option", 12);
      \u0275\u0275text(17, "Emerald");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "option", 13);
      \u0275\u0275text(19, "Amber");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "option", 14);
      \u0275\u0275text(21, "Rose");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "option", 15);
      \u0275\u0275text(23, "Purple");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "option", 16);
      \u0275\u0275text(25, "Cyan");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 17)(27, "div")(28, "label", 6);
      \u0275\u0275text(29, " Start Date ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "input", 18);
      \u0275\u0275listener("click", function MilestoneFormDialog_Template_input_click_30_listener() {
        \u0275\u0275restoreView(_r1);
        const startPicker_r2 = \u0275\u0275reference(32);
        return \u0275\u0275resetView(startPicker_r2.open());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div")(34, "label", 6);
      \u0275\u0275text(35, " End Date ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "input", 19);
      \u0275\u0275listener("click", function MilestoneFormDialog_Template_input_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        const endPicker_r3 = \u0275\u0275reference(38);
        return \u0275\u0275resetView(endPicker_r3.open());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_8_0;
      const startPicker_r2 = \u0275\u0275reference(32);
      const endPicker_r3 = \u0275\u0275reference(38);
      \u0275\u0275property("title", ctx.data.title)("badge", ctx.isEditingMilestone ? "Edit Milestone" : "Add Milestone")("showCloseButton", true)("showFooter", true)("primaryDisabled", ctx.form.invalid);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(((tmp_8_0 = ctx.form.get("name")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("name")) == null ? null : tmp_8_0.touched) ? 7 : -1);
      \u0275\u0275advance(23);
      \u0275\u0275property("matDatepicker", startPicker_r2);
      \u0275\u0275advance(6);
      \u0275\u0275property("matDatepicker", endPicker_r3);
    }
  }, dependencies: [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatDatepicker, MatDatepickerInput, CommonDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MilestoneFormDialog, [{
    type: Component,
    args: [{ selector: "app-milestone-form-dialog", standalone: false, template: `<app-common-dialog\r
  [title]="data.title"\r
  [badge]="isEditingMilestone ? 'Edit Milestone' : 'Add Milestone'"\r
  icon="flag"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Cancel"\r
  primaryLabel="Save"\r
  [primaryDisabled]="form.invalid"\r
  (cancelled)="dialogRef.close()"\r
  (primary)="saveMilestone()"\r
>\r
\r
   <form [formGroup]="form">\r
\r
  <div class="p-7">\r
\r
    <!-- Milestone Name -->\r
    <div class="mb-5">\r
      <label class="text-sm font-black block mb-2 text-slate-700 dark:text-slate-200">\r
        Milestone Name\r
      </label>\r
\r
      <input\r
        type="text"\r
        formControlName="name"\r
        placeholder="Enter milestone name"\r
        class="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none bg-white dark:bg-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">\r
\r
      @if(form.get('name')?.invalid && form.get('name')?.touched){\r
      <div class="text-red-500 text-xs mt-1">\r
        Name is required\r
      </div>\r
      }\r
    </div>\r
\r
    <!-- Color -->\r
    <div class="mb-5">\r
      <label class="text-sm font-black block mb-2 text-slate-700 dark:text-slate-200">\r
        Color\r
      </label>\r
\r
      <select\r
        formControlName="color"\r
        class="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none bg-white dark:bg-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">\r
\r
        <option value="blue-600">Blue</option>\r
        <option value="indigo-600">Indigo</option>\r
        <option value="emerald-600">Emerald</option>\r
        <option value="amber-600">Amber</option>\r
        <option value="rose-600">Rose</option>\r
        <option value="purple-600">Purple</option>\r
        <option value="cyan-600">Cyan</option>\r
\r
      </select>\r
    </div>\r
\r
    <!-- Dates -->\r
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
\r
      <div>\r
        <label class="text-sm font-black block mb-2 text-slate-700 dark:text-slate-200">\r
          Start Date\r
        </label>\r
\r
        <input\r
          [matDatepicker]="startPicker"\r
          formControlName="startDate"\r
          (click)="startPicker.open()"\r
          class="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none bg-white dark:bg-slate-900 cursor-pointer focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">\r
\r
        <mat-datepicker #startPicker></mat-datepicker>\r
      </div>\r
\r
      <div>\r
        <label class="text-sm font-black block mb-2 text-slate-700 dark:text-slate-200">\r
          End Date\r
        </label>\r
\r
        <input\r
          [matDatepicker]="endPicker"\r
          formControlName="endDate"\r
          (click)="endPicker.open()"\r
          class="w-full border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none bg-white dark:bg-slate-900 cursor-pointer focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all">\r
\r
        <mat-datepicker #endPicker></mat-datepicker>\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
  </form>\r
</app-common-dialog>` }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: ProjectService }, { type: ToastrService }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MilestoneFormDialog, { className: "MilestoneFormDialog", filePath: "app/modules/projects/dialogs/milestone-form-dialog/milestone-form-dialog.ts", lineNumber: 14 });
})();

// src/app/modules/projects/widgets/project-timeline/project-timeline.ts
var _forTrack03 = ($index, $item) => $item.title;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.name;
var _forTrack3 = ($index, $item) => $item.id;
function ProjectTimeline_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("value", p_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1);
  }
}
function ProjectTimeline_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r2 = ctx.$implicit;
    \u0275\u0275property("value", member_r2.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(member_r2.name);
  }
}
function ProjectTimeline_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "div", 55);
    \u0275\u0275elementStart(2, "p", 56);
    \u0275\u0275text(3, "Assembling Schedule...");
    \u0275\u0275elementEnd()();
  }
}
function ProjectTimeline_For_55_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275element(1, "div");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("w-1.5 h-1.5 rounded-full " + task_r3.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r3.name, " ");
  }
}
function ProjectTimeline_For_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 57)(2, "span", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 59);
    \u0275\u0275text(5, "add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 60);
    \u0275\u0275repeaterCreate(7, ProjectTimeline_For_55_For_8_Template, 3, 3, "div", 61, _forTrack3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const phase_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(phase_r4.title);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(phase_r4.tasks);
  }
}
function ProjectTimeline_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const header_r5 = ctx.$implicit;
    \u0275\u0275classProp("bg-blue-50/30", header_r5.isToday || header_r5.isCurrent);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-primary", header_r5.isToday || header_r5.isCurrent);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", header_r5.label, " ", header_r5.isToday || header_r5.isCurrent ? "(NOW)" : "", " ");
  }
}
function ProjectTimeline_For_65_For_2_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275element(1, "img", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", task_r6.assignee, \u0275\u0275sanitizeUrl);
  }
}
function ProjectTimeline_For_65_For_2_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", task_r6.completion, "%");
  }
}
function ProjectTimeline_For_65_For_2_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", task_r6.status, " ");
  }
}
function ProjectTimeline_For_65_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, ProjectTimeline_For_65_For_2_Conditional_1_Conditional_1_Template, 2, 1, "div", 68);
    \u0275\u0275conditionalCreate(2, ProjectTimeline_For_65_For_2_Conditional_1_Conditional_2_Template, 2, 1, "div", 69);
    \u0275\u0275conditionalCreate(3, ProjectTimeline_For_65_For_2_Conditional_1_Conditional_3_Template, 2, 1, "div", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r6 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("h-6 rounded-lg relative group shadow-sm transition-all duration-500 " + task_r6.color);
    \u0275\u0275styleProp("width", ctx_r6.viewType === "month" ? "20%" : task_r6.width)("left", ctx_r6.viewType === "month" ? "30%" : task_r6.left);
    \u0275\u0275classProp("critical-highlight", ctx_r6.showCriticalPath && task_r6.critical)("opacity-20", ctx_r6.showCriticalPath && !task_r6.critical);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r6.showTeamView && task_r6.assignee ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(task_r6.completion !== void 0 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(task_r6.status ? 3 : -1);
  }
}
function ProjectTimeline_For_65_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73)(2, "span", 74);
    \u0275\u0275text(3, "star");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 75);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r6 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("left", ctx_r6.viewType === "month" ? "40%" : task_r6.left);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(task_r6.milestoneTitle);
  }
}
function ProjectTimeline_For_65_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275conditionalCreate(1, ProjectTimeline_For_65_For_2_Conditional_1_Template, 4, 13, "div", 66)(2, ProjectTimeline_For_65_For_2_Conditional_2_Template, 6, 3, "div", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(task_r6.width ? 1 : task_r6.isMilestone ? 2 : -1);
  }
}
function ProjectTimeline_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 64);
    \u0275\u0275repeaterCreate(1, ProjectTimeline_For_65_For_2_Template, 3, 1, "div", 65, _forTrack3);
  }
  if (rf & 2) {
    const phase_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(phase_r8.tasks);
  }
}
function ProjectTimeline_For_75_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 83);
  }
  if (rf & 2) {
    const res_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("width", res_r9.utilization - 100, "%");
  }
}
function ProjectTimeline_For_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 76);
    \u0275\u0275element(2, "img", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 77)(4, "div", 78)(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "span", 79);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 80);
    \u0275\u0275element(12, "div", 81);
    \u0275\u0275conditionalCreate(13, ProjectTimeline_For_75_Conditional_13_Template, 1, 2, "div", 82);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const res_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", res_r9.avatar, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", res_r9.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(res_r9.role);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-error", res_r9.overAllocated)("text-primary", !res_r9.overAllocated);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", res_r9.overAllocated ? "Over-allocated (" + res_r9.utilization + "%)" : res_r9.utilization + "% Utilization", " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", res_r9.utilization > 100 ? 100 : res_r9.utilization, "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(res_r9.overAllocated ? 13 : -1);
  }
}
var ProjectTimeline = class _ProjectTimeline {
  projectService;
  projectId = "";
  selectedMember = "All Members";
  loading = true;
  viewType = "week";
  showCriticalPath = false;
  showTeamView = false;
  // Dynamic Timeline Logic
  timelineHeaders = [];
  startDate = /* @__PURE__ */ new Date();
  totalDurationDays = 90;
  // Default view window
  selectedProject = "";
  projects = [];
  team = [{ name: "All Members", avatar: "" }];
  phases = [];
  resources = [];
  constructor(projectService) {
    this.projectService = projectService;
  }
  ngOnInit() {
    this.initTimelineRange();
    if (this.projectId) {
      this.fetchTimelineData();
    }
  }
  initTimelineRange() {
    const today = /* @__PURE__ */ new Date();
    this.startDate = new Date(today);
    if (this.viewType === "day") {
      this.startDate.setDate(today.getDate() - 3);
      this.totalDurationDays = 14;
    } else if (this.viewType === "week") {
      this.startDate.setDate(today.getDate() - 21);
      this.totalDurationDays = 70;
    } else {
      this.startDate.setDate(today.getDate() - 60);
      this.totalDurationDays = 180;
    }
    this.generateTimelineHeaders();
  }
  generateTimelineHeaders() {
    this.timelineHeaders = [];
    const tempDate = new Date(this.startDate);
    if (this.viewType === "day") {
      for (let i = 0; i < 14; i++) {
        this.timelineHeaders.push({
          label: tempDate.toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
          isToday: tempDate.toDateString() === (/* @__PURE__ */ new Date()).toDateString()
        });
        tempDate.setDate(tempDate.getDate() + 1);
      }
    } else if (this.viewType === "week") {
      for (let i = 0; i < 10; i++) {
        this.timelineHeaders.push({
          label: tempDate.toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
          isCurrent: tempDate <= /* @__PURE__ */ new Date() && /* @__PURE__ */ new Date() < new Date(tempDate.getTime() + 7 * 24 * 60 * 60 * 1e3)
        });
        tempDate.setDate(tempDate.getDate() + 7);
      }
    } else {
      for (let i = 0; i < 6; i++) {
        this.timelineHeaders.push({
          label: tempDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
          isCurrent: tempDate.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && tempDate.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear()
        });
        tempDate.setMonth(tempDate.getMonth() + 1);
      }
    }
  }
  fetchTimelineData() {
    this.loading = true;
    this.projectService.getProjectTimeline(this.projectId).subscribe({
      next: (res) => {
        const project = res.data;
        this.selectedProject = project.name;
        this.projects = [project.name];
        if (project.team_members) {
          this.team = [{ name: "All Members", avatar: "" }, ...project.team_members];
          this.resources = project.team_members.map((m) => ({
            name: m.firstname + " " + m.lastname,
            role: m.project_team?.role || "Site Team",
            utilization: Math.floor(Math.random() * 40) + 60,
            avatar: m.avatar,
            overAllocated: Math.random() > 0.8
          }));
        }
        this.mapDataToPhases(project);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  mapDataToPhases(project) {
    const today = /* @__PURE__ */ new Date();
    const milestones = (project.milestones || []).map((m) => ({
      id: `m-${m.id}`,
      name: m.name,
      color: "bg-secondary",
      isMilestone: true,
      milestoneTitle: m.name,
      left: this.calculatePosition(new Date(m.createdAt || today))
    }));
    const tasks = (project.tasks || []).map((t) => ({
      id: `t-${t.id}`,
      name: t.title,
      color: t.status === "Completed" ? "bg-green-500" : t.priority === "High Priority" ? "bg-error" : "bg-primary",
      completion: t.status === "Completed" ? 100 : t.status === "In Progress" ? 45 : 0,
      status: t.status,
      left: this.calculatePosition(new Date(t.createdAt || today)),
      width: this.calculateWidth(new Date(t.createdAt || today), new Date(t.due_date || today)),
      assignee: t.assignees?.[0]?.avatar,
      critical: t.priority === "High Priority"
    }));
    this.phases = [
      { title: "PROJECT MILESTONES", tasks: milestones },
      { title: "CONSTRUCTION TASKS", tasks }
    ];
  }
  calculatePosition(date) {
    const diffTime = date.getTime() - this.startDate.getTime();
    const diffDays = diffTime / (1e3 * 3600 * 24);
    let pos = diffDays / this.totalDurationDays * 100;
    if (pos < 0)
      pos = 0;
    if (pos > 98)
      pos = 98;
    return pos + "%";
  }
  calculateWidth(start, end) {
    const diffTime = end.getTime() - start.getTime();
    let diffDays = diffTime / (1e3 * 3600 * 24);
    if (diffDays < 2)
      diffDays = 2;
    let width = diffDays / this.totalDurationDays * 100;
    if (width > 40)
      width = 40;
    return width + "%";
  }
  get filteredPhases() {
    if (this.selectedMember === "All Members")
      return this.phases;
    const member = this.team.find((m) => m.firstname + " " + m.lastname === this.selectedMember || m.name === this.selectedMember);
    return this.phases.map((p) => __spreadProps(__spreadValues({}, p), {
      tasks: p.tasks.filter((t) => t.assignee === member?.avatar || t.isMilestone)
    })).filter((p) => p.tasks.length > 0);
  }
  setViewType(type) {
    this.viewType = type;
    this.initTimelineRange();
    if (this.projectId)
      this.fetchTimelineData();
  }
  toggleCriticalPath() {
    this.showCriticalPath = !this.showCriticalPath;
  }
  toggleTeamView() {
    this.showTeamView = !this.showTeamView;
  }
  navigate(direction) {
    const days = direction === "next" ? 7 : -7;
    this.startDate.setDate(this.startDate.getDate() + days);
    this.generateTimelineHeaders();
    if (this.projectId)
      this.fetchTimelineData();
  }
  getCurrentDateLabel() {
    return this.startDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
  getTodayPosition() {
    const today = /* @__PURE__ */ new Date();
    const diffTime = today.getTime() - this.startDate.getTime();
    const diffDays = diffTime / (1e3 * 3600 * 24);
    let pos = diffDays / this.totalDurationDays * 100;
    if (pos < 0 || pos > 100)
      return "-100%";
    return pos + "%";
  }
  resetToToday() {
    this.initTimelineRange();
    if (this.projectId)
      this.fetchTimelineData();
  }
  static \u0275fac = function ProjectTimeline_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectTimeline)(\u0275\u0275directiveInject(ProjectService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectTimeline, selectors: [["app-project-timeline"]], inputs: { projectId: "projectId", selectedMember: "selectedMember" }, standalone: false, decls: 94, vars: 19, consts: [[1, "flex", "flex-col", "md:flex-row", "justify-between", "items-end", "gap-6", "mb-10", "mt-6"], [1, "space-y-2"], [1, "text-[10px]", "font-bold", "text-primary", "tracking-widest", "uppercase", "mb-2", "block"], [1, "flex", "items-center", "gap-4"], [1, "text-4xl", "font-extrabold", "tracking-tight", "text-slate-900"], [1, "flex", "items-center", "gap-2", "bg-white", "border", "border-slate-200", "px-3", "py-1.5", "rounded-xl", "shadow-sm"], [1, "material-symbols-outlined", "text-slate-400", "text-sm"], [1, "bg-transparent", "border-none", "text-xs", "font-black", "uppercase", "tracking-widest", "text-slate-700", "outline-none", "cursor-pointer", "appearance-none", "pr-4", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "flex", "gap-3", "bg-slate-100", "p-1.5", "rounded-xl", "border", "border-slate-200/50"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "rounded-lg", "shadow-sm", "font-semibold", "text-sm", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-lg"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "rounded-lg", "font-medium", "text-sm", "transition-all", "cursor-pointer", 3, "click"], [1, "w-px", "bg-slate-300", "self-stretch", "mx-1"], [1, "flex", "items-center", "gap-2", "px-3", "py-1", "bg-white", "rounded-lg", "shadow-sm", "border", "border-slate-200/50"], [1, "bg-transparent", "border-none", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-700", "outline-none", "cursor-pointer", "appearance-none", "pr-4", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-slate-200/50", "overflow-hidden", "flex", "flex-col", "h-[700px]"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b", "border-slate-100"], [1, "flex", "bg-slate-100", "rounded-lg", "p-1"], [1, "px-4", "py-1.5", "text-xs", "font-bold", "transition-all", "cursor-pointer", 3, "click"], [1, "text-sm", "font-bold", "text-slate-600", "uppercase", "tracking-wider"], [1, "flex", "gap-2"], [1, "p-2", "hover:bg-slate-100", "rounded-full", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined"], [1, "flex-1", "flex", "overflow-hidden", "relative"], [1, "absolute", "inset-0", "z-50", "bg-white/60", "backdrop-blur-sm", "flex", "flex-col", "items-center", "justify-center"], [1, "w-80", "border-r", "border-slate-100", "flex", "flex-col", "bg-slate-50/30"], [1, "h-12", "border-b", "border-slate-100", "flex", "items-center", "px-6"], [1, "text-[10px]", "font-bold", "text-slate-400", "tracking-widest", "uppercase"], [1, "flex-1", "overflow-y-auto", "no-scrollbar", "py-4", "space-y-6"], [1, "space-y-4", "px-6"], [1, "flex-1", "overflow-x-auto", "relative", "bg-white", "gantt-grid"], [1, "h-12", "border-b", "border-slate-100", "flex"], [1, "min-w-[1000px]", "flex"], [1, "flex-1", "border-r", "border-slate-100/50", "flex", "flex-col", "items-center", "justify-center", 3, "bg-blue-50/30"], [1, "py-4", "space-y-6", "min-w-[1000px]", "h-full", "relative"], [1, "absolute", "top-0", "bottom-0", "w-px", "bg-primary", "z-10", "transition-all", "duration-500"], [1, "w-3", "h-3", "bg-primary", "rounded-full", "absolute", "-top-1.5", "-left-1", "shadow-lg", "shadow-primary/40"], [1, "mt-8", "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], [1, "col-span-1", "md:col-span-2", "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-slate-100"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-sm", "font-black", "tracking-tight", "text-slate-900", "uppercase"], ["routerLink", "/team", 1, "text-xs", "font-bold", "text-primary", "cursor-pointer", "hover:underline"], [1, "space-y-5"], [1, "bg-gradient-to-br", "from-primary", "to-primary-container", "text-white", "rounded-xl", "p-6", "shadow-xl", "flex", "flex-col", "justify-between"], [1, "text-xs", "font-bold", "tracking-[0.2em]", "opacity-80", "uppercase", "mb-4"], [1, "text-5xl", "font-black", "tracking-tighter", "mb-2"], [1, "text-2xl", "opacity-60"], [1, "text-xs", "font-medium", "opacity-90", "leading-relaxed"], [1, "mt-6", "pt-4", "border-t", "border-white/10", "flex", "items-center", "justify-between"], [1, "text-[10px]", "font-bold", "tracking-widest", "uppercase"], [1, "text-[10px]", "font-bold", "bg-white/20", "px-2", "py-1", "rounded"], [1, "fixed", "bottom-8", "right-8", "w-14", "h-14", "bg-secondary", "shadow-xl", "rounded-full", "flex", "items-center", "justify-center", "text-white", "hover:scale-110", "active:scale-95", "transition-all", "z-50", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-3xl"], [1, "w-12", "h-12", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "mt-4", "text-xs", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "flex", "items-center", "justify-between", "group"], [1, "text-xs", "font-black", "text-slate-900"], [1, "material-symbols-outlined", "text-sm", "text-slate-400", "opacity-0", "group-hover:opacity-100", "cursor-pointer"], [1, "pl-4", "space-y-3"], [1, "text-[13px]", "text-slate-600", "font-medium", "flex", "items-center", "gap-2"], [1, "flex-1", "border-r", "border-slate-100/50", "flex", "flex-col", "items-center", "justify-center"], [1, "text-[10px]", "font-bold"], [1, "h-4"], [1, "h-8", "flex", "items-center", "relative"], [3, "class", "critical-highlight", "opacity-20", "width", "left"], [1, "absolute", "flex", "items-center", "transition-all", "duration-500", 3, "left"], [1, "absolute", "-top-3", "left-2", "w-5", "h-5", "rounded-full", "border-2", "border-white", "ring-1", "ring-slate-200", "overflow-hidden", "shadow-sm", "animate-in", "zoom-in-50"], [1, "absolute", "-right-12", "top-1.5", "text-[10px]", "font-bold", "text-primary"], [1, "absolute", "-right-12", "top-1.5", "text-[10px]", "font-bold", "text-slate-400"], [1, "w-full", "h-full", "object-cover", 3, "src"], [1, "absolute", "flex", "items-center", "transition-all", "duration-500"], [1, "w-6", "h-6", "rotate-45", "bg-secondary", "flex", "items-center", "justify-center", "shadow-lg", "cursor-pointer"], [1, "material-symbols-outlined", "text-white", "text-sm", "-rotate-45", 2, "font-variation-settings", "'FILL' 1"], [1, "ml-4", "text-[11px]", "font-bold", "text-secondary", "bg-secondary/10", "px-2", "py-0.5", "rounded"], [1, "w-10", "h-10", "rounded-full", "bg-slate-100", "overflow-hidden"], [1, "flex-1"], [1, "flex", "justify-between", "text-xs", "font-bold", "mb-1.5"], [1, "text-slate-400", "font-medium", "ml-2"], [1, "w-full", "h-2", "bg-slate-100", "rounded-full", "overflow-hidden"], [1, "h-full", "bg-primary", "rounded-l-full"], [1, "h-full", "bg-error", 3, "width"], [1, "h-full", "bg-error"]], template: function ProjectTimeline_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "Project Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3)(5, "h1", 4);
      \u0275\u0275text(6, "Construction Timeline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 5)(8, "span", 6);
      \u0275\u0275text(9, "folder_open");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function ProjectTimeline_Template_select_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedProject, $event) || (ctx.selectedProject = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(11, ProjectTimeline_For_12_Template, 2, 2, "option", 8, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(13, "div", 9)(14, "button", 10);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_14_listener() {
        return ctx.toggleCriticalPath();
      });
      \u0275\u0275elementStart(15, "span", 11);
      \u0275\u0275text(16, "show_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " Critical Path ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 12);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_18_listener() {
        return ctx.toggleTeamView();
      });
      \u0275\u0275elementStart(19, "span", 11);
      \u0275\u0275text(20, "groups");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, " Team View ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "div", 13);
      \u0275\u0275elementStart(23, "div", 14)(24, "span", 6);
      \u0275\u0275text(25, "filter_alt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "select", 15);
      \u0275\u0275twoWayListener("ngModelChange", function ProjectTimeline_Template_select_ngModelChange_26_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedMember, $event) || (ctx.selectedMember = $event);
        return $event;
      });
      \u0275\u0275template(27, ProjectTimeline_option_27_Template, 2, 2, "option", 16);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(28, "div", 17)(29, "div", 18)(30, "div", 3)(31, "div", 19)(32, "button", 20);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_32_listener() {
        return ctx.setViewType("day");
      });
      \u0275\u0275text(33, "Day");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "button", 20);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_34_listener() {
        return ctx.setViewType("week");
      });
      \u0275\u0275text(35, "Week");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 20);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_36_listener() {
        return ctx.setViewType("month");
      });
      \u0275\u0275text(37, "Month");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "h3", 21);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 22)(41, "button", 23);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_41_listener() {
        return ctx.navigate("prev");
      });
      \u0275\u0275elementStart(42, "span", 24);
      \u0275\u0275text(43, "chevron_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "button", 23);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_44_listener() {
        return ctx.navigate("next");
      });
      \u0275\u0275elementStart(45, "span", 24);
      \u0275\u0275text(46, "chevron_right");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "div", 25);
      \u0275\u0275conditionalCreate(48, ProjectTimeline_Conditional_48_Template, 4, 0, "div", 26);
      \u0275\u0275elementStart(49, "div", 27)(50, "div", 28)(51, "span", 29);
      \u0275\u0275text(52, "Phase / Task Name");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 30);
      \u0275\u0275repeaterCreate(54, ProjectTimeline_For_55_Template, 9, 1, "div", 31, _forTrack03);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 32)(57, "div", 33)(58, "div", 34);
      \u0275\u0275repeaterCreate(59, ProjectTimeline_For_60_Template, 3, 6, "div", 35, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "div", 36)(62, "div", 37);
      \u0275\u0275element(63, "div", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(64, ProjectTimeline_For_65_Template, 3, 0, null, null, _forTrack03);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(66, "div", 39)(67, "div", 40)(68, "div", 41)(69, "h4", 42);
      \u0275\u0275text(70, "RESOURCE ALLOCATION");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "a", 43);
      \u0275\u0275text(72, "Manage Team");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "div", 44);
      \u0275\u0275repeaterCreate(74, ProjectTimeline_For_75_Template, 14, 11, "div", 3, _forTrack2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "div", 45)(77, "div")(78, "h4", 46);
      \u0275\u0275text(79, "Current Velocity");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 47);
      \u0275\u0275text(81, "94");
      \u0275\u0275elementStart(82, "span", 48);
      \u0275\u0275text(83, "%");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(84, "p", 49);
      \u0275\u0275text(85, "The project is 4 days ahead of schedule. Site Prep phase is nearing completion.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(86, "div", 50)(87, "span", 51);
      \u0275\u0275text(88, "Next Milestone");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "span", 52);
      \u0275\u0275text(90, "Nov 02");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(91, "button", 53);
      \u0275\u0275listener("click", function ProjectTimeline_Template_button_click_91_listener() {
        return ctx.resetToToday();
      });
      \u0275\u0275elementStart(92, "span", 54);
      \u0275\u0275text(93, "calendar_today");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedProject);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.projects);
      \u0275\u0275advance(3);
      \u0275\u0275classMap(ctx.showCriticalPath ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-primary");
      \u0275\u0275advance(4);
      \u0275\u0275classMap(ctx.showTeamView ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-white/50 bg-transparent");
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedMember);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.team);
      \u0275\u0275advance(5);
      \u0275\u0275classMap(ctx.viewType === "day" ? "bg-white text-primary rounded shadow-sm" : "text-slate-500");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.viewType === "week" ? "bg-white text-primary rounded shadow-sm" : "text-slate-500");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.viewType === "month" ? "bg-white text-primary rounded shadow-sm" : "text-slate-500");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.getCurrentDateLabel());
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.loading ? 48 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.filteredPhases);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.timelineHeaders);
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("left", ctx.getTodayPosition())("opacity", ctx.getTodayPosition() === "-100%" ? 0 : 1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredPhases);
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.resources);
    }
  }, dependencies: [NgForOf, RouterLink, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n.gantt-grid[_ngcontent-%COMP%] {\n  background-image:\n    linear-gradient(\n      to right,\n      #f1f5f9 1px,\n      transparent 1px);\n  background-size: 100px 100%;\n}\n.no-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.no-scrollbar[_ngcontent-%COMP%] {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.critical-highlight[_ngcontent-%COMP%] {\n  border: 2px solid #fbbf24 !important;\n  box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);\n  animation: _ngcontent-%COMP%_pulse-critical 2s infinite;\n  z-index: 20;\n  opacity: 1 !important;\n}\n@keyframes _ngcontent-%COMP%_pulse-critical {\n  0% {\n    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);\n  }\n  70% {\n    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);\n  }\n}\n.transition-all[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 500ms;\n}\n/*# sourceMappingURL=project-timeline.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectTimeline, [{
    type: Component,
    args: [{ selector: "app-project-timeline", standalone: false, template: `<div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 mt-6">\r
    <div class="space-y-2">\r
        <span class="text-[10px] font-bold text-primary tracking-widest uppercase mb-2 block">Project Management</span>\r
        <div class="flex items-center gap-4">\r
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900">Construction Timeline</h1>\r
            <div class="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">\r
                <span class="material-symbols-outlined text-slate-400 text-sm">folder_open</span>\r
                <select [(ngModel)]="selectedProject"\r
                    class="bg-transparent border-none text-xs font-black uppercase tracking-widest text-slate-700 outline-none cursor-pointer appearance-none pr-4">\r
                    @for (p of projects; track p) { <option [value]="p">{{ p }}</option> }\r
                </select>\r
            </div>\r
        </div>\r
    </div>\r
    <div class="flex gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">\r
        <button (click)="toggleCriticalPath()"\r
            [class]="showCriticalPath ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-primary'"\r
            class="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm font-semibold text-sm transition-all cursor-pointer">\r
            <span class="material-symbols-outlined text-lg">show_chart</span>\r
            Critical Path\r
        </button>\r
        <button (click)="toggleTeamView()"\r
            [class]="showTeamView ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-white/50 bg-transparent'"\r
            class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer">\r
            <span class="material-symbols-outlined text-lg">groups</span>\r
            Team View\r
        </button>\r
        <div class="w-px bg-slate-300 self-stretch mx-1"></div>\r
        <div class="flex items-center gap-2 px-3 py-1 bg-white rounded-lg shadow-sm border border-slate-200/50">\r
            <span class="material-symbols-outlined text-slate-400 text-sm">filter_alt</span>\r
            <select [(ngModel)]="selectedMember"\r
                class="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-slate-700 outline-none cursor-pointer appearance-none pr-4">\r
                <option *ngFor="let member of team" [value]="member.name">{{ member.name }}</option>\r
            </select>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- Gantt Visualization Card -->\r
<div class="bg-white rounded-xl shadow-sm border border-slate-200/50 overflow-hidden flex flex-col h-[700px]">\r
    <!-- Gantt Controls -->\r
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">\r
        <div class="flex items-center gap-4">\r
            <div class="flex bg-slate-100 rounded-lg p-1">\r
                <button (click)="setViewType('day')"\r
                    [class]="viewType === 'day' ? 'bg-white text-primary rounded shadow-sm' : 'text-slate-500'"\r
                    class="px-4 py-1.5 text-xs font-bold transition-all cursor-pointer">Day</button>\r
                <button (click)="setViewType('week')"\r
                    [class]="viewType === 'week' ? 'bg-white text-primary rounded shadow-sm' : 'text-slate-500'"\r
                    class="px-4 py-1.5 text-xs font-bold transition-all cursor-pointer">Week</button>\r
                <button (click)="setViewType('month')"\r
                    [class]="viewType === 'month' ? 'bg-white text-primary rounded shadow-sm' : 'text-slate-500'"\r
                    class="px-4 py-1.5 text-xs font-bold transition-all cursor-pointer">Month</button>\r
            </div>\r
            <h3 class="text-sm font-bold text-slate-600 uppercase tracking-wider">{{ getCurrentDateLabel() }}</h3>\r
        </div>\r
        <div class="flex gap-2">\r
            <button (click)="navigate('prev')"\r
                class="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"><span\r
                    class="material-symbols-outlined">chevron_left</span></button>\r
            <button (click)="navigate('next')"\r
                class="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"><span\r
                    class="material-symbols-outlined">chevron_right</span></button>\r
        </div>\r
    </div>\r
\r
    <!-- Gantt Body -->\r
    <div class="flex-1 flex overflow-hidden relative">\r
        @if (loading) {\r
        <div class="absolute inset-0 z-50 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">\r
            <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>\r
            <p class="mt-4 text-xs font-black uppercase tracking-widest text-slate-400">Assembling Schedule...</p>\r
        </div>\r
        }\r
\r
        <!-- Task Labels Sidebar -->\r
        <div class="w-80 border-r border-slate-100 flex flex-col bg-slate-50/30">\r
            <div class="h-12 border-b border-slate-100 flex items-center px-6">\r
                <span class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Phase / Task Name</span>\r
            </div>\r
            <div class="flex-1 overflow-y-auto no-scrollbar py-4 space-y-6">\r
                @for (phase of filteredPhases; track phase.title) {\r
                <div class="space-y-4 px-6">\r
                    <div class="flex items-center justify-between group">\r
                        <span class="text-xs font-black text-slate-900">{{ phase.title }}</span>\r
                        <span\r
                            class="material-symbols-outlined text-sm text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer">add</span>\r
                    </div>\r
                    <div class="pl-4 space-y-3">\r
                        @for (task of phase.tasks; track task.id) {\r
                        <div class="text-[13px] text-slate-600 font-medium flex items-center gap-2">\r
                            <div [class]="'w-1.5 h-1.5 rounded-full ' + task.color"></div>\r
                            {{ task.name }}\r
                        </div>\r
                        }\r
                    </div>\r
                </div>\r
                }\r
            </div>\r
        </div>\r
\r
        <!-- Timeline Visualization -->\r
        <div class="flex-1 overflow-x-auto relative bg-white gantt-grid">\r
            <!-- Dates Header -->\r
            <div class="h-12 border-b border-slate-100 flex">\r
                <div class="min-w-[1000px] flex">\r
                    @for (header of timelineHeaders; track header.label) {\r
                    <div class="flex-1 border-r border-slate-100/50 flex flex-col items-center justify-center"\r
                        [class.bg-blue-50/30]="header.isToday || header.isCurrent">\r
                        <span class="text-[10px] font-bold" [class.text-primary]="header.isToday || header.isCurrent">\r
                            {{ header.label }} {{ (header.isToday || header.isCurrent) ? '(NOW)' : '' }}\r
                        </span>\r
                    </div>\r
                    }\r
                </div>\r
            </div>\r
\r
            <!-- Timeline Content Area -->\r
            <div class="py-4 space-y-6 min-w-[1000px] h-full relative">\r
                <!-- Current Date Line Indicator -->\r
                <div class="absolute top-0 bottom-0 w-px bg-primary z-10 transition-all duration-500"\r
                    [style.left]="getTodayPosition()"\r
                    [style.opacity]="getTodayPosition() === '-100%' ? 0 : 1">\r
                    <div class="w-3 h-3 bg-primary rounded-full absolute -top-1.5 -left-1 shadow-lg shadow-primary/40">\r
                    </div>\r
                </div>\r
\r
                @for (phase of filteredPhases; track phase.title) {\r
                <div class="h-4"></div> <!-- Header Row Space -->\r
                @for (task of phase.tasks; track task.id) {\r
                <div class="h-8 flex items-center relative">\r
                    @if (task.width) {\r
                    <!-- Task Bar -->\r
                    <div [class]="'h-6 rounded-lg relative group shadow-sm transition-all duration-500 ' + task.color"\r
                        [class.critical-highlight]="showCriticalPath && task.critical"\r
                        [class.opacity-20]="showCriticalPath && !task.critical"\r
                        [style.width]="viewType === 'month' ? '20%' : task.width"\r
                        [style.left]="viewType === 'month' ? '30%' : task.left">\r
                        <!-- Team View Avatars -->\r
                        @if (showTeamView && task.assignee) {\r
                        <div\r
                            class="absolute -top-3 left-2 w-5 h-5 rounded-full border-2 border-white ring-1 ring-slate-200 overflow-hidden shadow-sm animate-in zoom-in-50">\r
                            <img [src]="task.assignee" class="w-full h-full object-cover">\r
                        </div>\r
                        }\r
\r
                        @if (task.completion !== undefined) {\r
                        <div class="absolute -right-12 top-1.5 text-[10px] font-bold text-primary">{{ task.completion\r
                            }}%</div>\r
                        }\r
                        @if (task.status) {\r
                        <div class="absolute -right-12 top-1.5 text-[10px] font-bold text-slate-400">{{ task.status }}\r
                        </div>\r
                        }\r
                    </div>\r
                    } @else if (task.isMilestone) {\r
                    <!-- Milestone Marker -->\r
                    <div class="absolute flex items-center transition-all duration-500"\r
                        [style.left]="viewType === 'month' ? '40%' : task.left">\r
                        <div\r
                            class="w-6 h-6 rotate-45 bg-secondary flex items-center justify-center shadow-lg cursor-pointer">\r
                            <span class="material-symbols-outlined text-white text-sm -rotate-45"\r
                                style="font-variation-settings: 'FILL' 1;">star</span>\r
                        </div>\r
                        <span class="ml-4 text-[11px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">{{\r
                            task.milestoneTitle }}</span>\r
                    </div>\r
                    }\r
                </div>\r
                }\r
                }\r
            </div>\r
        </div>\r
    </div>\r
</div>\r
\r
<!-- Bottom Dashboard Stats / Resource Allocation -->\r
<div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">\r
    <div class="col-span-1 md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-100">\r
        <div class="flex justify-between items-center mb-6">\r
            <h4 class="text-sm font-black tracking-tight text-slate-900 uppercase">RESOURCE ALLOCATION</h4>\r
            <a routerLink="/team" class="text-xs font-bold text-primary cursor-pointer hover:underline">Manage Team</a>\r
        </div>\r
        <div class="space-y-5">\r
            @for (res of resources; track res.name) {\r
            <div class="flex items-center gap-4">\r
                <div class="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">\r
                    <img class="w-full h-full object-cover" [src]="res.avatar" />\r
                </div>\r
                <div class="flex-1">\r
                    <div class="flex justify-between text-xs font-bold mb-1.5">\r
                        <span>{{ res.name }} <span class="text-slate-400 font-medium ml-2">{{ res.role }}</span></span>\r
                        <span [class.text-error]="res.overAllocated" [class.text-primary]="!res.overAllocated">\r
                            {{ res.overAllocated ? 'Over-allocated (' + res.utilization + '%)' : res.utilization + '%\r
                            Utilization' }}\r
                        </span>\r
                    </div>\r
                    <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">\r
                        <div class="h-full bg-primary rounded-l-full"\r
                            [style.width.%]="res.utilization > 100 ? 100 : res.utilization"></div>\r
                        @if (res.overAllocated) {\r
                        <div class="h-full bg-error" [style.width.%]="res.utilization - 100"></div>\r
                        }\r
                    </div>\r
                </div>\r
            </div>\r
            }\r
        </div>\r
    </div>\r
\r
    <div\r
        class="bg-gradient-to-br from-primary to-primary-container text-white rounded-xl p-6 shadow-xl flex flex-col justify-between">\r
        <div>\r
            <h4 class="text-xs font-bold tracking-[0.2em] opacity-80 uppercase mb-4">Current Velocity</h4>\r
            <div class="text-5xl font-black tracking-tighter mb-2">94<span class="text-2xl opacity-60">%</span></div>\r
            <p class="text-xs font-medium opacity-90 leading-relaxed">The project is 4 days ahead of schedule. Site Prep\r
                phase is nearing completion.</p>\r
        </div>\r
        <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">\r
            <span class="text-[10px] font-bold tracking-widest uppercase">Next Milestone</span>\r
            <span class="text-[10px] font-bold bg-white/20 px-2 py-1 rounded">Nov 02</span>\r
        </div>\r
    </div>\r
</div>\r
\r
<button (click)="resetToToday()"\r
    class="fixed bottom-8 right-8 w-14 h-14 bg-secondary shadow-xl rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer">\r
    <span class="material-symbols-outlined text-3xl">calendar_today</span>\r
</button>`, styles: ["/* src/app/modules/projects/widgets/project-timeline/project-timeline.scss */\n.gantt-grid {\n  background-image:\n    linear-gradient(\n      to right,\n      #f1f5f9 1px,\n      transparent 1px);\n  background-size: 100px 100%;\n}\n.no-scrollbar::-webkit-scrollbar {\n  display: none;\n}\n.no-scrollbar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.critical-highlight {\n  border: 2px solid #fbbf24 !important;\n  box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);\n  animation: pulse-critical 2s infinite;\n  z-index: 20;\n  opacity: 1 !important;\n}\n@keyframes pulse-critical {\n  0% {\n    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);\n  }\n  70% {\n    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);\n  }\n}\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 500ms;\n}\n/*# sourceMappingURL=project-timeline.css.map */\n"] }]
  }], () => [{ type: ProjectService }], { projectId: [{
    type: Input
  }], selectedMember: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectTimeline, { className: "ProjectTimeline", filePath: "app/modules/projects/widgets/project-timeline/project-timeline.ts", lineNumber: 11 });
})();

// src/app/modules/projects/widgets/project-budget/project-budget.ts
var ProjectBudget = class _ProjectBudget {
  constructor() {
  }
  ngOnInit() {
  }
  static \u0275fac = function ProjectBudget_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectBudget)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectBudget, selectors: [["app-project-budget"]], standalone: false, decls: 245, vars: 0, consts: [[1, "grid", "grid-cols-12", "gap-6"], [1, "col-span-12", "lg:col-span-8", "bg-surface-container-lowest", "rounded-xl", "p-8", "shadow-[0_12_32px_rgba(15,23,42,0.06)]", "border", "border-outline-variant/10"], [1, "flex", "items-center", "justify-between", "mb-8"], [1, "text-lg", "font-bold"], [1, "flex", "items-center", "gap-2", "bg-secondary/10", "px-3", "py-1.5", "rounded-full", "text-secondary", "font-bold", "text-xs", "uppercase", "tracking-wider"], [1, "material-symbols-outlined", "text-[16px]"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-8"], [1, "p-6", "bg-surface-container-low", "rounded-xl", "border", "border-outline-variant/10"], [1, "text-outline", "text-xs", "font-bold", "tracking-widest", "uppercase", "mb-1"], [1, "text-3xl", "font-extrabold", "text-on-surface"], [1, "mt-4", "flex", "items-center", "gap-2", "text-blue-600", "text-xs", "font-bold"], [1, "mt-4", "flex", "items-center", "gap-2", "text-on-surface-variant", "text-xs", "font-bold"], [1, "w-full", "bg-surface-container-high", "h-2", "rounded-full", "overflow-hidden"], [1, "bg-primary", "h-full", "w-[46%]", "rounded-full"], [1, "mt-4", "flex", "items-center", "gap-2", "text-secondary", "text-xs", "font-bold"], [1, "mt-10"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-sm", "font-bold", "text-on-surface"], [1, "flex", "gap-4"], [1, "flex", "items-center", "gap-1.5", "text-xs", "text-on-surface-variant"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-primary"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-secondary"], [1, "h-48", "w-full", "bg-surface-container-low", "rounded-xl", "relative", "overflow-hidden", "group"], ["alt", "Analytics chart", "src", "https://lh3.googleusercontent.com/aida-public/AB6AXuAq45JcxatoyVepvtk4YL7qArQUIejesCp_YEnGr-BiIyHBJGI7xauPT3vUncmM9e91c8i_z6VoZuXzMb1Mg-2OrguP8rqbNLTUS1TcFOtD594zqZT8RAK9EJcXT65XFkJVVbsCUqg8qrMYP-3BY8OHlbAHWQgunkrZUJ9BNCIdgQD5O0FcThV_v_2QJM6pyadx9CCcfv_pYhmFycN9U_BTodaA3z-rrCicxtp5uKzkItFA0h0u9QMu-ocPMG9W3gUp9mibB65V-Dp6", 1, "w-full", "h-full", "object-cover", "opacity-20", "grayscale"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center"], [1, "text-outline", "font-medium", "text-sm", "flex", "items-center", "gap-2"], [1, "material-symbols-outlined"], [1, "col-span-12", "lg:col-span-4", "bg-surface-container-lowest", "rounded-xl", "p-8", "shadow-[0_12_32px_rgba(15,23,42,0.06)]", "border", "border-outline-variant/10", "flex", "flex-col"], [1, "text-lg", "font-bold", "mb-8"], [1, "flex-grow", "flex", "flex-col", "justify-center", "items-center", "py-6"], [1, "relative", "w-48", "h-48", "mb-8"], ["viewBox", "0 0 36 36", 1, "w-full", "h-full", "transform", "-rotate-90"], ["cx", "18", "cy", "18", "fill", "none", "r", "16", "stroke-width", "4", 1, "stroke-surface-container-high"], ["cx", "18", "cy", "18", "fill", "none", "r", "16", "stroke-dasharray", "60, 100", "stroke-linecap", "round", "stroke-width", "4", 1, "stroke-primary"], ["cx", "18", "cy", "18", "fill", "none", "r", "16", "stroke-dasharray", "35, 100", "stroke-dashoffset", "-60", "stroke-linecap", "round", "stroke-width", "4", 1, "stroke-secondary"], [1, "absolute", "inset-0", "flex", "flex-col", "items-center", "justify-center"], [1, "text-2xl", "font-black", "text-on-surface"], [1, "text-[10px]", "text-outline", "font-bold", "tracking-widest", "uppercase"], [1, "w-full", "space-y-4"], [1, "flex", "items-center", "justify-between", "p-3", "bg-surface-container-low", "rounded-lg"], [1, "flex", "items-center", "gap-3"], [1, "w-3", "h-3", "rounded-full", "bg-primary"], [1, "text-sm", "font-bold"], [1, "w-3", "h-3", "rounded-full", "bg-secondary"], [1, "w-3", "h-3", "rounded-full", "bg-surface-container-highest"], [1, "col-span-12"], [1, "flex", "items-center", "justify-between", "mb-6", "mt-8"], [1, "text-2xl", "font-extrabold", "tracking-tight"], [1, "flex", "rounded-lg", "bg-surface-container-low", "p-1"], [1, "px-4", "py-1.5", "bg-white", "shadow-sm", "rounded-md", "text-sm", "font-bold", "text-primary"], [1, "px-4", "py-1.5", "text-sm", "font-medium", "text-on-surface-variant", "hover:text-on-surface"], [1, "p-2", "bg-surface-container-low", "rounded-lg", "hover:bg-surface-container-high", "transition-colors"], [1, "space-y-4"], [1, "grid", "grid-cols-12", "px-6", "py-4", "text-xs", "font-bold", "tracking-widest", "text-outline", "uppercase"], [1, "col-span-4"], [1, "col-span-2", "text-right"], [1, "grid", "grid-cols-12", "items-center", "bg-surface-container-lowest", "rounded-xl", "p-6", "shadow-sm", "border", "border-outline-variant/10", "border-l-4", "border-l-secondary", "transition-all", "hover:translate-x-1"], [1, "col-span-4", "flex", "items-center", "gap-4"], [1, "w-12", "h-12", "rounded-lg", "bg-secondary/10", "flex", "items-center", "justify-center", "text-secondary"], [1, "font-bold", "text-on-surface"], [1, "text-xs", "text-on-surface-variant"], [1, "col-span-2", "text-right", "font-medium"], [1, "col-span-2", "text-right", "font-bold", "text-error"], [1, "col-span-2", "flex", "justify-end"], [1, "px-3", "py-1", "bg-error-container", "text-on-error-container", "rounded-full", "text-[10px]", "font-bold", "uppercase", "cursor-default"], [1, "grid", "grid-cols-12", "items-center", "bg-surface-container-lowest", "rounded-xl", "p-6", "shadow-sm", "border", "border-outline-variant/10", "border-l-4", "border-l-primary", "transition-all", "hover:translate-x-1"], [1, "w-12", "h-12", "rounded-lg", "bg-primary/10", "flex", "items-center", "justify-center", "text-primary"], [1, "col-span-2", "text-right", "font-bold", "text-green-600"], [1, "px-3", "py-1", "bg-primary/10", "text-primary", "rounded-full", "text-[10px]", "font-bold", "uppercase", "cursor-default"], [1, "grid", "grid-cols-12", "items-center", "bg-surface-container-lowest", "rounded-xl", "p-6", "shadow-sm", "border", "border-outline-variant/10", "border-l-4", "border-l-slate-300", "transition-all", "hover:translate-x-1"], [1, "w-12", "h-12", "rounded-lg", "bg-slate-100", "flex", "items-center", "justify-center", "text-slate-500"], [1, "col-span-2", "text-right", "font-bold", "text-on-surface-variant"], [1, "px-3", "py-1", "bg-surface-container-high", "text-outline", "rounded-full", "text-[10px]", "font-bold", "uppercase", "cursor-default"], [1, "col-span-12", "lg:col-span-6", "bg-surface-container-lowest", "rounded-xl", "p-8", "shadow-[0_12_32px_rgba(15,23,42,0.06)]", "border", "border-outline-variant/10"], [1, "text-primary", "text-xs", "font-bold", "hover:underline", "cursor-pointer"], [1, "space-y-6"], [1, "flex", "items-center", "justify-between", "group"], [1, "flex", "items-center", "gap-4"], [1, "w-10", "h-10", "rounded", "bg-surface-container-low", "flex", "items-center", "justify-center", "text-outline", "group-hover:bg-primary-fixed", "group-hover:text-primary", "transition-colors", "cursor-pointer"], [1, "material-symbols-outlined", "text-[20px]"], [1, "text-sm", "font-bold", "text-on-surface", "cursor-pointer", "hover:underline"], [1, "text-xs", "text-outline"], [1, "text-right"], [1, "text-sm", "font-extrabold", "text-on-surface"], [1, "text-[10px]", "font-bold", "text-secondary", "uppercase", "tracking-tighter"], [1, "text-[10px]", "font-bold", "text-green-600", "uppercase", "tracking-tighter"], [1, "col-span-12", "lg:col-span-6", "bg-primary", "rounded-xl", "p-8", "shadow-sm", "relative", "overflow-hidden", "text-white", "flex", "flex-col", "justify-center", "items-center", "text-center", "cursor-pointer", "hover:shadow-lg", "transition-shadow"], [1, "absolute", "inset-0", "opacity-10", "pointer-events-none"], ["height", "100%", "width", "100%", "xmlns", "http://www.w3.org/2000/svg"], ["height", "40", "id", "grid", "patternUnits", "userSpaceOnUse", "width", "40"], ["d", "M 40 0 L 0 0 0 40", "fill", "none", "stroke", "white", "stroke-width", "0.5"], ["fill", "url(#grid)", "height", "100%", "width", "100%"], [1, "relative", "z-10", "w-full", "max-w-sm"], [1, "w-20", "h-20", "bg-white/20", "backdrop-blur-md", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-6"], [1, "material-symbols-outlined", "text-4xl"], [1, "text-2xl", "font-bold", "mb-3"], [1, "text-blue-100", "mb-8", "text-sm", "leading-relaxed"], [1, "w-full", "py-4", "bg-white", "text-primary", "rounded-xl", "font-bold", "hover:bg-blue-50", "transition-colors", "shadow-lg", "cursor-pointer"], [1, "mt-4", "text-[11px]", "text-blue-200", "font-medium", "uppercase", "tracking-widest"]], template: function ProjectBudget_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h3", 3);
      \u0275\u0275text(4, "Financial Health Snapshot");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "span", 5);
      \u0275\u0275text(7, "warning");
      \u0275\u0275elementEnd();
      \u0275\u0275text(8, " Variance Warning: Foundation ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "p", 8);
      \u0275\u0275text(12, "TOTAL BUDGET");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 9);
      \u0275\u0275text(14, "\u20B92,450,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 10)(16, "span", 5);
      \u0275\u0275text(17, "trending_up");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18, " +4.2% from Initial Estimate ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 7)(20, "p", 8);
      \u0275\u0275text(21, "TOTAL SPENT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p", 9);
      \u0275\u0275text(23, "\u20B91,124,500");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 11)(25, "div", 12);
      \u0275\u0275element(26, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span");
      \u0275\u0275text(28, "46%");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "div", 7)(30, "p", 8);
      \u0275\u0275text(31, "REMAINING");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 9);
      \u0275\u0275text(33, "\u20B91,325,500");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 14)(35, "span", 5);
      \u0275\u0275text(36, "schedule");
      \u0275\u0275elementEnd();
      \u0275\u0275text(37, " 84 Days to Completion ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "div", 15)(39, "div", 16)(40, "span", 17);
      \u0275\u0275text(41, "Cumulative Spend vs. Budget");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 18)(43, "div", 19);
      \u0275\u0275element(44, "div", 20);
      \u0275\u0275text(45, " Budget ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 19);
      \u0275\u0275element(47, "div", 21);
      \u0275\u0275text(48, " Actual ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "div", 22);
      \u0275\u0275element(50, "img", 23);
      \u0275\u0275elementStart(51, "div", 24)(52, "p", 25)(53, "span", 26);
      \u0275\u0275text(54, "monitoring");
      \u0275\u0275elementEnd();
      \u0275\u0275text(55, " Real-time chart rendering active ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(56, "div", 27)(57, "h3", 28);
      \u0275\u0275text(58, "Resource Distribution");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "div", 29)(60, "div", 30);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(61, "svg", 31);
      \u0275\u0275element(62, "circle", 32)(63, "circle", 33)(64, "circle", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(65, "div", 35)(66, "span", 36);
      \u0275\u0275text(67, "\u20B91.1M");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "span", 37);
      \u0275\u0275text(69, "EXPENDITURE");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(70, "div", 38)(71, "div", 39)(72, "div", 40);
      \u0275\u0275element(73, "div", 41);
      \u0275\u0275elementStart(74, "span", 42);
      \u0275\u0275text(75, "Labor Costs");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "span", 42);
      \u0275\u0275text(77, "60%");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "div", 39)(79, "div", 40);
      \u0275\u0275element(80, "div", 43);
      \u0275\u0275elementStart(81, "span", 42);
      \u0275\u0275text(82, "Materials");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(83, "span", 42);
      \u0275\u0275text(84, "35%");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "div", 39)(86, "div", 40);
      \u0275\u0275element(87, "div", 44);
      \u0275\u0275elementStart(88, "span", 42);
      \u0275\u0275text(89, "Overhead");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(90, "span", 42);
      \u0275\u0275text(91, "5%");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(92, "div", 45)(93, "div", 46)(94, "h3", 47);
      \u0275\u0275text(95, "Itemized Cost Variance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "div", 18)(97, "div", 48)(98, "button", 49);
      \u0275\u0275text(99, "By Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "button", 50);
      \u0275\u0275text(101, "By Vendor");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(102, "button", 51)(103, "span", 26);
      \u0275\u0275text(104, "filter_list");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(105, "div", 52)(106, "div", 53)(107, "div", 54);
      \u0275\u0275text(108, "Work Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(109, "div", 55);
      \u0275\u0275text(110, "Estimated");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(111, "div", 55);
      \u0275\u0275text(112, "Actual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "div", 55);
      \u0275\u0275text(114, "Variance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "div", 55);
      \u0275\u0275text(116, "Status");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(117, "div", 56)(118, "div", 57)(119, "div", 58)(120, "span", 26);
      \u0275\u0275text(121, "foundation");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(122, "div")(123, "p", 59);
      \u0275\u0275text(124, "02-100 Foundation & Concrete");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "p", 60);
      \u0275\u0275text(126, "Includes rebar, pumping, and finishing");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(127, "div", 61);
      \u0275\u0275text(128, "\u20B9420,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "div", 61);
      \u0275\u0275text(130, "\u20B9465,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "div", 62);
      \u0275\u0275text(132, "+\u20B945,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(133, "div", 63)(134, "span", 64);
      \u0275\u0275text(135, "Over Budget");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(136, "div", 65)(137, "div", 57)(138, "div", 66)(139, "span", 26);
      \u0275\u0275text(140, "home_work");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(141, "div")(142, "p", 59);
      \u0275\u0275text(143, "03-400 Structural Steel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(144, "p", 60);
      \u0275\u0275text(145, "Framework and support installation");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(146, "div", 61);
      \u0275\u0275text(147, "\u20B9750,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(148, "div", 61);
      \u0275\u0275text(149, "\u20B9710,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "div", 67);
      \u0275\u0275text(151, "-\u20B940,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(152, "div", 63)(153, "span", 68);
      \u0275\u0275text(154, "Under Budget");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(155, "div", 69)(156, "div", 57)(157, "div", 70)(158, "span", 26);
      \u0275\u0275text(159, "electrical_services");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(160, "div")(161, "p", 59);
      \u0275\u0275text(162, "15-000 Electrical Systems");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(163, "p", 60);
      \u0275\u0275text(164, "Rough-in phase for Site 104");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(165, "div", 61);
      \u0275\u0275text(166, "\u20B9185,000");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(167, "div", 61);
      \u0275\u0275text(168, "\u20B9184,200");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(169, "div", 71);
      \u0275\u0275text(170, "-\u20B9800");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(171, "div", 63)(172, "span", 72);
      \u0275\u0275text(173, "On Track");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(174, "div", 73)(175, "div", 2)(176, "h3", 3);
      \u0275\u0275text(177, "Recent Invoices");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(178, "button", 74);
      \u0275\u0275text(179, "View All Invoices");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(180, "div", 75)(181, "div", 76)(182, "div", 77)(183, "div", 78)(184, "span", 79);
      \u0275\u0275text(185, "description");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(186, "div")(187, "p", 80);
      \u0275\u0275text(188, "Titan Concrete - #INV-882");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(189, "p", 81);
      \u0275\u0275text(190, "Oct 12, 2023 \u2022 Foundation Work");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(191, "div", 82)(192, "p", 83);
      \u0275\u0275text(193, "\u20B942,500.00");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(194, "p", 84);
      \u0275\u0275text(195, "Pending Approval");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(196, "div", 76)(197, "div", 77)(198, "div", 78)(199, "span", 79);
      \u0275\u0275text(200, "description");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(201, "div")(202, "p", 80);
      \u0275\u0275text(203, "SteelCore Fabrication - #INV-901");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(204, "p", 81);
      \u0275\u0275text(205, "Oct 08, 2023 \u2022 Structural Framework");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(206, "div", 82)(207, "p", 83);
      \u0275\u0275text(208, "\u20B9115,000.00");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(209, "p", 85);
      \u0275\u0275text(210, "Paid");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(211, "div", 76)(212, "div", 77)(213, "div", 78)(214, "span", 79);
      \u0275\u0275text(215, "description");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(216, "div")(217, "p", 80);
      \u0275\u0275text(218, "Allied Plumping Ltd - #INV-877");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(219, "p", 81);
      \u0275\u0275text(220, "Oct 05, 2023 \u2022 Drainage & HVAC");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(221, "div", 82)(222, "p", 83);
      \u0275\u0275text(223, "\u20B918,200.00");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(224, "p", 85);
      \u0275\u0275text(225, "Paid");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(226, "div", 86)(227, "div", 87);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(228, "svg", 88)(229, "defs")(230, "pattern", 89);
      \u0275\u0275element(231, "path", 90);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(232, "rect", 91);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(233, "div", 92)(234, "div", 93)(235, "span", 94);
      \u0275\u0275text(236, "cloud_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(237, "h3", 95);
      \u0275\u0275text(238, "Instant Invoice Processing");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(239, "p", 96);
      \u0275\u0275text(240, "Drop your invoices here. ZYNO AI will automatically categorize line items and flag potential variances before they occur.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(241, "button", 97);
      \u0275\u0275text(242, " Select Files to Upload ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(243, "p", 98);
      \u0275\u0275text(244, "Supports PDF, JPG, and XLSX (Max 50MB)");
      \u0275\u0275elementEnd()()()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectBudget, [{
    type: Component,
    args: [{ selector: "app-project-budget", standalone: false, template: '<!-- Bento Grid Layout -->\r\n<div class="grid grid-cols-12 gap-6">\r\n    <!-- High-Level Summary Card (Large) -->\r\n    <div\r\n        class="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_12_32px_rgba(15,23,42,0.06)] border border-outline-variant/10">\r\n        <div class="flex items-center justify-between mb-8">\r\n            <h3 class="text-lg font-bold">Financial Health Snapshot</h3>\r\n            <div\r\n                class="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-full text-secondary font-bold text-xs uppercase tracking-wider">\r\n                <span class="material-symbols-outlined text-[16px]">warning</span>\r\n                Variance Warning: Foundation\r\n            </div>\r\n        </div>\r\n        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">\r\n            <div class="p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">\r\n                <p class="text-outline text-xs font-bold tracking-widest uppercase mb-1">TOTAL BUDGET</p>\r\n                <p class="text-3xl font-extrabold text-on-surface">\u20B92,450,000</p>\r\n                <div class="mt-4 flex items-center gap-2 text-blue-600 text-xs font-bold">\r\n                    <span class="material-symbols-outlined text-[16px]">trending_up</span>\r\n                    +4.2% from Initial Estimate\r\n                </div>\r\n            </div>\r\n            <div class="p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">\r\n                <p class="text-outline text-xs font-bold tracking-widest uppercase mb-1">TOTAL SPENT</p>\r\n                <p class="text-3xl font-extrabold text-on-surface">\u20B91,124,500</p>\r\n                <div class="mt-4 flex items-center gap-2 text-on-surface-variant text-xs font-bold">\r\n                    <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">\r\n                        <div class="bg-primary h-full w-[46%] rounded-full"></div>\r\n                    </div>\r\n                    <span>46%</span>\r\n                </div>\r\n            </div>\r\n            <div class="p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">\r\n                <p class="text-outline text-xs font-bold tracking-widest uppercase mb-1">REMAINING</p>\r\n                <p class="text-3xl font-extrabold text-on-surface">\u20B91,325,500</p>\r\n                <div class="mt-4 flex items-center gap-2 text-secondary text-xs font-bold">\r\n                    <span class="material-symbols-outlined text-[16px]">schedule</span>\r\n                    84 Days to Completion\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="mt-10">\r\n            <div class="flex items-center justify-between mb-4">\r\n                <span class="text-sm font-bold text-on-surface">Cumulative Spend vs. Budget</span>\r\n                <div class="flex gap-4">\r\n                    <div class="flex items-center gap-1.5 text-xs text-on-surface-variant">\r\n                        <div class="w-2.5 h-2.5 rounded-full bg-primary"></div> Budget\r\n                    </div>\r\n                    <div class="flex items-center gap-1.5 text-xs text-on-surface-variant">\r\n                        <div class="w-2.5 h-2.5 rounded-full bg-secondary"></div> Actual\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- Chart Placeholder -->\r\n            <div class="h-48 w-full bg-surface-container-low rounded-xl relative overflow-hidden group">\r\n                <img alt="Analytics chart" class="w-full h-full object-cover opacity-20 grayscale"\r\n                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq45JcxatoyVepvtk4YL7qArQUIejesCp_YEnGr-BiIyHBJGI7xauPT3vUncmM9e91c8i_z6VoZuXzMb1Mg-2OrguP8rqbNLTUS1TcFOtD594zqZT8RAK9EJcXT65XFkJVVbsCUqg8qrMYP-3BY8OHlbAHWQgunkrZUJ9BNCIdgQD5O0FcThV_v_2QJM6pyadx9CCcfv_pYhmFycN9U_BTodaA3z-rrCicxtp5uKzkItFA0h0u9QMu-ocPMG9W3gUp9mibB65V-Dp6" />\r\n                <div class="absolute inset-0 flex items-center justify-center">\r\n                    <p class="text-outline font-medium text-sm flex items-center gap-2">\r\n                        <span class="material-symbols-outlined">monitoring</span>\r\n                        Real-time chart rendering active\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Material vs Labor Split (Small) -->\r\n    <div\r\n        class="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-[0_12_32px_rgba(15,23,42,0.06)] border border-outline-variant/10 flex flex-col">\r\n        <h3 class="text-lg font-bold mb-8">Resource Distribution</h3>\r\n        <div class="flex-grow flex flex-col justify-center items-center py-6">\r\n            <!-- Donut Chart Placeholder -->\r\n            <div class="relative w-48 h-48 mb-8">\r\n                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">\r\n                    <circle class="stroke-surface-container-high" cx="18" cy="18" fill="none" r="16" stroke-width="4">\r\n                    </circle>\r\n                    <circle class="stroke-primary" cx="18" cy="18" fill="none" r="16" stroke-dasharray="60, 100"\r\n                        stroke-linecap="round" stroke-width="4"></circle>\r\n                    <circle class="stroke-secondary" cx="18" cy="18" fill="none" r="16" stroke-dasharray="35, 100"\r\n                        stroke-dashoffset="-60" stroke-linecap="round" stroke-width="4"></circle>\r\n                </svg>\r\n                <div class="absolute inset-0 flex flex-col items-center justify-center">\r\n                    <span class="text-2xl font-black text-on-surface">\u20B91.1M</span>\r\n                    <span class="text-[10px] text-outline font-bold tracking-widest uppercase">EXPENDITURE</span>\r\n                </div>\r\n            </div>\r\n            <div class="w-full space-y-4">\r\n                <div class="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">\r\n                    <div class="flex items-center gap-3">\r\n                        <div class="w-3 h-3 rounded-full bg-primary"></div>\r\n                        <span class="text-sm font-bold">Labor Costs</span>\r\n                    </div>\r\n                    <span class="text-sm font-bold">60%</span>\r\n                </div>\r\n                <div class="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">\r\n                    <div class="flex items-center gap-3">\r\n                        <div class="w-3 h-3 rounded-full bg-secondary"></div>\r\n                        <span class="text-sm font-bold">Materials</span>\r\n                    </div>\r\n                    <span class="text-sm font-bold">35%</span>\r\n                </div>\r\n                <div class="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">\r\n                    <div class="flex items-center gap-3">\r\n                        <div class="w-3 h-3 rounded-full bg-surface-container-highest"></div>\r\n                        <span class="text-sm font-bold">Overhead</span>\r\n                    </div>\r\n                    <span class="text-sm font-bold">5%</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Itemized Costs Section (Full Width) -->\r\n    <div class="col-span-12">\r\n        <div class="flex items-center justify-between mb-6 mt-8">\r\n            <h3 class="text-2xl font-extrabold tracking-tight">Itemized Cost Variance</h3>\r\n            <div class="flex gap-4">\r\n                <div class="flex rounded-lg bg-surface-container-low p-1">\r\n                    <button class="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-primary">By\r\n                        Category</button>\r\n                    <button class="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface">By\r\n                        Vendor</button>\r\n                </div>\r\n                <button\r\n                    class="p-2 bg-surface-container-low rounded-lg hover:bg-surface-container-high transition-colors">\r\n                    <span class="material-symbols-outlined">filter_list</span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div class="space-y-4">\r\n            <!-- Category Header -->\r\n            <div class="grid grid-cols-12 px-6 py-4 text-xs font-bold tracking-widest text-outline uppercase">\r\n                <div class="col-span-4">Work Category</div>\r\n                <div class="col-span-2 text-right">Estimated</div>\r\n                <div class="col-span-2 text-right">Actual</div>\r\n                <div class="col-span-2 text-right">Variance</div>\r\n                <div class="col-span-2 text-right">Status</div>\r\n            </div>\r\n            <!-- Category Row 1 -->\r\n            <div\r\n                class="grid grid-cols-12 items-center bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10 border-l-4 border-l-secondary transition-all hover:translate-x-1">\r\n                <div class="col-span-4 flex items-center gap-4">\r\n                    <div class="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">\r\n                        <span class="material-symbols-outlined">foundation</span>\r\n                    </div>\r\n                    <div>\r\n                        <p class="font-bold text-on-surface">02-100 Foundation &amp; Concrete</p>\r\n                        <p class="text-xs text-on-surface-variant">Includes rebar, pumping, and finishing</p>\r\n                    </div>\r\n                </div>\r\n                <div class="col-span-2 text-right font-medium">\u20B9420,000</div>\r\n                <div class="col-span-2 text-right font-medium">\u20B9465,000</div>\r\n                <div class="col-span-2 text-right font-bold text-error">+\u20B945,000</div>\r\n                <div class="col-span-2 flex justify-end">\r\n                    <span\r\n                        class="px-3 py-1 bg-error-container text-on-error-container rounded-full text-[10px] font-bold uppercase cursor-default">Over\r\n                        Budget</span>\r\n                </div>\r\n            </div>\r\n            <!-- Category Row 2 -->\r\n            <div\r\n                class="grid grid-cols-12 items-center bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10 border-l-4 border-l-primary transition-all hover:translate-x-1">\r\n                <div class="col-span-4 flex items-center gap-4">\r\n                    <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">\r\n                        <span class="material-symbols-outlined">home_work</span>\r\n                    </div>\r\n                    <div>\r\n                        <p class="font-bold text-on-surface">03-400 Structural Steel</p>\r\n                        <p class="text-xs text-on-surface-variant">Framework and support installation</p>\r\n                    </div>\r\n                </div>\r\n                <div class="col-span-2 text-right font-medium">\u20B9750,000</div>\r\n                <div class="col-span-2 text-right font-medium">\u20B9710,000</div>\r\n                <div class="col-span-2 text-right font-bold text-green-600">-\u20B940,000</div>\r\n                <div class="col-span-2 flex justify-end">\r\n                    <span\r\n                        class="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase cursor-default">Under\r\n                        Budget</span>\r\n                </div>\r\n            </div>\r\n            <!-- Category Row 3 -->\r\n            <div\r\n                class="grid grid-cols-12 items-center bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10 border-l-4 border-l-slate-300 transition-all hover:translate-x-1">\r\n                <div class="col-span-4 flex items-center gap-4">\r\n                    <div class="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">\r\n                        <span class="material-symbols-outlined">electrical_services</span>\r\n                    </div>\r\n                    <div>\r\n                        <p class="font-bold text-on-surface">15-000 Electrical Systems</p>\r\n                        <p class="text-xs text-on-surface-variant">Rough-in phase for Site 104</p>\r\n                    </div>\r\n                </div>\r\n                <div class="col-span-2 text-right font-medium">\u20B9185,000</div>\r\n                <div class="col-span-2 text-right font-medium">\u20B9184,200</div>\r\n                <div class="col-span-2 text-right font-bold text-on-surface-variant">-\u20B9800</div>\r\n                <div class="col-span-2 flex justify-end">\r\n                    <span\r\n                        class="px-3 py-1 bg-surface-container-high text-outline rounded-full text-[10px] font-bold uppercase cursor-default">On\r\n                        Track</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Recent Invoices (Featured Card) -->\r\n    <div\r\n        class="col-span-12 lg:col-span-6 bg-surface-container-lowest rounded-xl p-8 shadow-[0_12_32px_rgba(15,23,42,0.06)] border border-outline-variant/10">\r\n        <div class="flex items-center justify-between mb-8">\r\n            <h3 class="text-lg font-bold">Recent Invoices</h3>\r\n            <button class="text-primary text-xs font-bold hover:underline cursor-pointer">View All Invoices</button>\r\n        </div>\r\n        <div class="space-y-6">\r\n            <div class="flex items-center justify-between group">\r\n                <div class="flex items-center gap-4">\r\n                    <div\r\n                        class="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-outline group-hover:bg-primary-fixed group-hover:text-primary transition-colors cursor-pointer">\r\n                        <span class="material-symbols-outlined text-[20px]">description</span>\r\n                    </div>\r\n                    <div>\r\n                        <p class="text-sm font-bold text-on-surface cursor-pointer hover:underline">Titan Concrete -\r\n                            #INV-882</p>\r\n                        <p class="text-xs text-outline">Oct 12, 2023 \u2022 Foundation Work</p>\r\n                    </div>\r\n                </div>\r\n                <div class="text-right">\r\n                    <p class="text-sm font-extrabold text-on-surface">\u20B942,500.00</p>\r\n                    <p class="text-[10px] font-bold text-secondary uppercase tracking-tighter">Pending Approval</p>\r\n                </div>\r\n            </div>\r\n            <div class="flex items-center justify-between group">\r\n                <div class="flex items-center gap-4">\r\n                    <div\r\n                        class="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-outline group-hover:bg-primary-fixed group-hover:text-primary transition-colors cursor-pointer">\r\n                        <span class="material-symbols-outlined text-[20px]">description</span>\r\n                    </div>\r\n                    <div>\r\n                        <p class="text-sm font-bold text-on-surface cursor-pointer hover:underline">SteelCore\r\n                            Fabrication - #INV-901</p>\r\n                        <p class="text-xs text-outline">Oct 08, 2023 \u2022 Structural Framework</p>\r\n                    </div>\r\n                </div>\r\n                <div class="text-right">\r\n                    <p class="text-sm font-extrabold text-on-surface">\u20B9115,000.00</p>\r\n                    <p class="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Paid</p>\r\n                </div>\r\n            </div>\r\n            <div class="flex items-center justify-between group">\r\n                <div class="flex items-center gap-4">\r\n                    <div\r\n                        class="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center text-outline group-hover:bg-primary-fixed group-hover:text-primary transition-colors cursor-pointer">\r\n                        <span class="material-symbols-outlined text-[20px]">description</span>\r\n                    </div>\r\n                    <div>\r\n                        <p class="text-sm font-bold text-on-surface cursor-pointer hover:underline">Allied Plumping Ltd\r\n                            - #INV-877</p>\r\n                        <p class="text-xs text-outline">Oct 05, 2023 \u2022 Drainage &amp; HVAC</p>\r\n                    </div>\r\n                </div>\r\n                <div class="text-right">\r\n                    <p class="text-sm font-extrabold text-on-surface">\u20B918,200.00</p>\r\n                    <p class="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Paid</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Upload Area (Featured Card) -->\r\n    <div\r\n        class="col-span-12 lg:col-span-6 bg-primary rounded-xl p-8 shadow-sm relative overflow-hidden text-white flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-lg transition-shadow">\r\n        <!-- Abstract Blueprint Background -->\r\n        <div class="absolute inset-0 opacity-10 pointer-events-none">\r\n            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">\r\n                <defs>\r\n                    <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">\r\n                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"></path>\r\n                    </pattern>\r\n                </defs>\r\n                <rect fill="url(#grid)" height="100%" width="100%"></rect>\r\n            </svg>\r\n        </div>\r\n        <div class="relative z-10 w-full max-w-sm">\r\n            <div\r\n                class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">\r\n                <span class="material-symbols-outlined text-4xl">cloud_upload</span>\r\n            </div>\r\n            <h3 class="text-2xl font-bold mb-3">Instant Invoice Processing</h3>\r\n            <p class="text-blue-100 mb-8 text-sm leading-relaxed">Drop your invoices here. ZYNO AI will automatically\r\n                categorize line items and flag potential variances before they occur.</p>\r\n            <button\r\n                class="w-full py-4 bg-white text-primary rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg cursor-pointer">\r\n                Select Files to Upload\r\n            </button>\r\n            <p class="mt-4 text-[11px] text-blue-200 font-medium uppercase tracking-widest">Supports PDF, JPG, and XLSX\r\n                (Max 50MB)</p>\r\n        </div>\r\n    </div>\r\n</div>' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectBudget, { className: "ProjectBudget", filePath: "app/modules/projects/widgets/project-budget/project-budget.ts", lineNumber: 9 });
})();

// src/app/modules/projects/widgets/project-files/project-files.ts
var _c03 = (a0) => ({ "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100/50 dark:border-blue-800/50": a0 });
var _forTrack04 = ($index, $item) => $item.name;
var _forTrack12 = ($index, $item) => $item.id;
function ProjectFiles_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "span", 23);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Signature Requested via Email ");
    \u0275\u0275elementEnd();
  }
}
function ProjectFiles_For_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r2.icon);
  }
}
function ProjectFiles_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275listener("click", function ProjectFiles_For_17_Template_div_click_0_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCategory(cat_r2.name));
    });
    \u0275\u0275elementStart(1, "div", 25)(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 27)(5, "h3", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, ProjectFiles_For_17_Conditional_9_Template, 3, 1, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.selectedCategory === cat_r2.name ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/50");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.selectedCategory === cat_r2.name ? "text-white" : cat_r2.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.selectedCategory === cat_r2.name ? "text-white" : "text-slate-600 dark:text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r2.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.selectedCategory === cat_r2.name ? "text-white/80" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", cat_r2.count, " Files");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedCategory === cat_r2.name ? 9 : -1);
  }
}
function ProjectFiles_For_24_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42)(1, "span", 10);
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Signed ");
    \u0275\u0275elementEnd();
  }
}
function ProjectFiles_For_24_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "a", 45)(2, "span", 46);
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " View Document ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 47)(6, "span", 46);
    \u0275\u0275text(7, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Download ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "div", 48);
    \u0275\u0275elementStart(10, "button", 49);
    \u0275\u0275listener("click", function ProjectFiles_For_24_Conditional_21_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const file_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteFile(file_r5));
    });
    \u0275\u0275elementStart(11, "span", 46);
    \u0275\u0275text(12, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Delete ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("href", file_r5.fullUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275property("href", file_r5.fullUrl, \u0275\u0275sanitizeUrl)("download", file_r5.name);
  }
}
function ProjectFiles_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("click", function ProjectFiles_For_24_Template_div_click_0_listener() {
      const file_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectFile(file_r5));
    });
    \u0275\u0275elementStart(1, "div", 33)(2, "div", 34)(3, "span", 35);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 36)(6, "h4", 37);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 38)(9, "span", 39);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 40);
    \u0275\u0275text(12, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 39);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "div", 41);
    \u0275\u0275conditionalCreate(16, ProjectFiles_For_24_Conditional_16_Template, 4, 0, "span", 42);
    \u0275\u0275elementStart(17, "div", 6)(18, "button", 43);
    \u0275\u0275listener("click", function ProjectFiles_For_24_Template_button_click_18_listener($event) {
      const file_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleFileDropdown(file_r5.id, $event));
    });
    \u0275\u0275elementStart(19, "span", 23);
    \u0275\u0275text(20, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, ProjectFiles_For_24_Conditional_21_Template, 14, 3, "div", 44);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const file_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(8, _c03, (ctx_r2.selectedFile == null ? null : ctx_r2.selectedFile.id) === file_r5.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", file_r5.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r5.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(file_r5.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(file_r5.type);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(file_r5.dateLabel);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(file_r5.status === "Signed" ? 16 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.showDropdownForFile === file_r5.id ? 21 : -1);
  }
}
function ProjectFiles_ForEmpty_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 50);
    \u0275\u0275text(2, "folder_open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 51);
    \u0275\u0275text(4, "No documents found in this category");
    \u0275\u0275elementEnd()();
  }
}
function ProjectFiles_Conditional_28_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 53);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.selectedFile.fullUrl, \u0275\u0275sanitizeUrl);
  }
}
function ProjectFiles_Conditional_28_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.selectedFile.icon);
  }
}
function ProjectFiles_Conditional_28_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function ProjectFiles_Conditional_28_Conditional_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.sendSignatureRequest());
    });
    \u0275\u0275text(1, " Request Stakeholder Signature ");
    \u0275\u0275elementEnd();
  }
}
function ProjectFiles_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 52);
    \u0275\u0275conditionalCreate(2, ProjectFiles_Conditional_28_Conditional_2_Template, 1, 1, "img", 53)(3, ProjectFiles_Conditional_28_Conditional_3_Template, 2, 1, "span", 54);
    \u0275\u0275elementStart(4, "div", 55)(5, "a", 56)(6, "span", 23);
    \u0275\u0275text(7, "zoom_in");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(8, "div", 57)(9, "div", 58)(10, "div")(11, "h3", 59);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 60);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 61);
    \u0275\u0275text(16, "v1.0");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 62)(18, "div", 63)(19, "span", 64);
    \u0275\u0275text(20, "Uploader");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 65);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 63)(24, "span", 64);
    \u0275\u0275text(25, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 66);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 67);
    \u0275\u0275conditionalCreate(29, ProjectFiles_Conditional_28_Conditional_29_Template, 2, 0, "button", 68);
    \u0275\u0275elementStart(30, "a", 69)(31, "span", 10);
    \u0275\u0275text(32, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " Download Original ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional((ctx_r2.selectedFile.mimetype == null ? null : ctx_r2.selectedFile.mimetype.startsWith("image/")) ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275property("href", ctx_r2.selectedFile.fullUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.selectedFile.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r2.selectedFile.size, " \u2022 ", ctx_r2.selectedFile.type);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.selectedFile.author);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r2.selectedFile.status === "Signed" ? "text-emerald-600" : "text-amber-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.selectedFile.status || "Pending Review");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedFile.status !== "Signed" ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r2.selectedFile.fullUrl, \u0275\u0275sanitizeUrl)("download", ctx_r2.selectedFile.name);
  }
}
function ProjectFiles_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 71);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 72);
    \u0275\u0275text(4, "Select a file to view details and preview");
    \u0275\u0275elementEnd()();
  }
}
var ProjectFiles = class _ProjectFiles {
  documents = [];
  uploadMedia = new EventEmitter();
  apiUrl = environment.serverUrl;
  searchQuery = "";
  selectedCategory = "All";
  categories = [
    { name: "All", icon: "grid_view", count: 0, color: "text-primary" },
    { name: "Drawings", icon: "architecture", count: 0, color: "text-secondary" },
    { name: "Photos", icon: "image", count: 0, color: "text-tertiary-container" },
    { name: "Legal", icon: "gavel", count: 0, color: "text-error" },
    { name: "Others", icon: "description", count: 0, color: "text-outline" }
  ];
  filteredFiles = [];
  selectedFile = null;
  viewAllFiles = false;
  showSignatureAlert = false;
  showDropdownForFile = null;
  constructor() {
  }
  ngOnInit() {
    this.processDocuments();
    if (this.filteredFiles.length > 0) {
      this.selectedFile = this.filteredFiles[0];
    }
  }
  ngOnChanges(changes) {
    if (changes["documents"]) {
      this.processDocuments();
    }
  }
  processDocuments() {
    if (!this.documents)
      return;
    const all = this.documents.map((doc) => __spreadProps(__spreadValues({}, doc), {
      fullUrl: doc.url.startsWith("http") ? doc.url : `${this.apiUrl}${doc.url}`,
      type: this.getFileType(doc.name, doc.mimetype),
      icon: this.getFileIcon(doc.mimetype),
      color: this.getFileColor(doc.mimetype),
      category: this.getFileCategory(doc.name, doc.mimetype),
      dateLabel: new Date(doc.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      author: "System Admin"
      // Placeholder until we have uploader info
    }));
    this.categories.forEach((cat) => {
      if (cat.name === "All")
        cat.count = all.length;
      else
        cat.count = all.filter((f) => f.category === cat.name).length;
    });
    this.applyFilters(all);
  }
  applyFilters(all) {
    const source = all || this.documents.map((doc) => __spreadProps(__spreadValues({}, doc), {
      fullUrl: doc.url.startsWith("http") ? doc.url : `${this.apiUrl}${doc.url}`,
      type: this.getFileType(doc.name, doc.mimetype),
      icon: this.getFileIcon(doc.mimetype),
      color: this.getFileColor(doc.mimetype),
      category: this.getFileCategory(doc.name, doc.mimetype),
      dateLabel: new Date(doc.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      author: "System Admin"
    }));
    this.filteredFiles = source.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === "All" || f.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    if (this.selectedFile && !this.filteredFiles.find((f) => f.id === this.selectedFile.id)) {
      this.selectedFile = this.filteredFiles[0] || null;
    } else if (!this.selectedFile && this.filteredFiles.length > 0) {
      this.selectedFile = this.filteredFiles[0];
    }
  }
  selectCategory(name) {
    this.selectedCategory = name;
    this.applyFilters();
  }
  getFileType(name, mimetype) {
    if (mimetype?.includes("pdf"))
      return "PDF";
    if (mimetype?.startsWith("image/"))
      return "IMG";
    const ext = name.split(".").pop()?.toUpperCase();
    return ext || "FILE";
  }
  getFileIcon(mimetype) {
    if (mimetype?.includes("pdf"))
      return "picture_as_pdf";
    if (mimetype?.startsWith("image/"))
      return "image";
    if (mimetype?.includes("word") || mimetype?.includes("text"))
      return "description";
    if (mimetype?.includes("excel") || mimetype?.includes("sheet"))
      return "table_chart";
    return "insert_drive_file";
  }
  getFileColor(mimetype) {
    if (mimetype?.includes("pdf"))
      return "bg-red-100 text-red-600";
    if (mimetype?.startsWith("image/"))
      return "bg-amber-100 text-amber-600";
    if (mimetype?.includes("word"))
      return "bg-blue-100 text-blue-600";
    return "bg-slate-100 text-slate-600";
  }
  getFileCategory(name, mimetype) {
    const n = name.toLowerCase();
    if (mimetype?.startsWith("image/"))
      return "Photos";
    if (n.includes("draw") || n.includes("blueprint") || n.includes("plan") || n.includes("cad"))
      return "Drawings";
    if (n.includes("contract") || n.includes("agree") || n.includes("legal"))
      return "Legal";
    return "Others";
  }
  get recentFiles() {
    return [...this.filteredFiles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  }
  toggleViewAll() {
    this.viewAllFiles = !this.viewAllFiles;
  }
  toggleFileDropdown(id, event) {
    event.stopPropagation();
    this.showDropdownForFile = this.showDropdownForFile === id ? null : id;
  }
  selectFile(file) {
    this.selectedFile = file;
  }
  deleteFile(file) {
    if (confirm(`Delete ${file.name}?`)) {
      alert("Delete functionality to be implemented");
    }
    this.showDropdownForFile = null;
  }
  sendSignatureRequest() {
    if (!this.selectedFile)
      return;
    this.showSignatureAlert = true;
    setTimeout(() => {
      this.showSignatureAlert = false;
      this.selectedFile.status = "Signed";
    }, 2500);
  }
  static \u0275fac = function ProjectFiles_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectFiles)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectFiles, selectors: [["app-project-files"]], inputs: { documents: "documents" }, outputs: { uploadMedia: "uploadMedia" }, standalone: false, features: [\u0275\u0275NgOnChangesFeature], decls: 30, vars: 5, consts: [[1, "grid", "grid-cols-12", "gap-8", "relative"], [1, "absolute", "top-4", "left-1/2", "-translate-x-1/2", "z-50", "bg-green-500", "text-white", "px-6", "py-3", "rounded-full", "font-bold", "shadow-xl", "animate-in", "slide-in-from-top-4", "flex", "items-center", "gap-2"], [1, "col-span-8", "flex", "flex-col", "gap-8"], [1, "flex", "justify-between", "items-center"], [1, "text-xl", "font-bold", "tracking-tight"], [1, "flex", "items-center", "gap-3"], [1, "relative"], [1, "material-symbols-outlined", "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "text-sm"], ["type", "text", "placeholder", "Search files...", 1, "pl-9", "pr-4", "py-2", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "text-sm", "focus:ring-2", "focus:ring-blue-500", "outline-none", "w-64", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "px-4", "py-2", "bg-blue-600", "text-white", "font-bold", "text-sm", "rounded-xl", "hover:bg-blue-700", "shadow-md", "transition-all", "cursor-pointer", "flex", "items-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "grid", "grid-cols-5", "gap-4"], [1, "p-5", "rounded-2xl", "cursor-pointer", "transition-all", "border", "group", "relative", "overflow-hidden", 3, "ngClass"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "p-6", "shadow-sm", "border", "border-slate-100", "dark:border-slate-800"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-sm", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "space-y-1"], [1, "flex", "items-center", "justify-between", "p-3", "rounded-xl", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-all", "group", "cursor-pointer", "border", "border-transparent", 3, "ngClass"], [1, "py-12", "flex", "flex-col", "items-center", "justify-center", "text-slate-400"], [1, "col-span-4"], [1, "sticky", "top-8", "space-y-6"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "overflow-hidden", "shadow-sm", "border", "border-slate-100", "dark:border-slate-800"], [1, "p-8", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-800", "rounded-3xl", "flex", "flex-col", "items-center", "justify-center", "text-center", "text-slate-400"], [1, "material-symbols-outlined"], [1, "p-5", "rounded-2xl", "cursor-pointer", "transition-all", "border", "group", "relative", "overflow-hidden", 3, "click", "ngClass"], [1, "flex", "justify-between", "items-start", "relative", "z-10"], [1, "material-symbols-outlined", "text-2xl", "transition-transform", "group-hover:scale-110", 3, "ngClass"], [1, "mt-4", "relative", "z-10"], [1, "font-bold", "text-xs", "uppercase", "tracking-widest", 3, "ngClass"], [1, "text-[10px]", "font-black", "mt-1", 3, "ngClass"], [1, "absolute", "-right-4", "-bottom-4", "opacity-10"], [1, "material-symbols-outlined", "text-8xl", "text-white"], [1, "flex", "items-center", "justify-between", "p-3", "rounded-xl", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-all", "group", "cursor-pointer", "border", "border-transparent", 3, "click", "ngClass"], [1, "flex", "items-center", "gap-4", "flex-1", "min-w-0"], [1, "w-10", "h-10", "flex", "items-center", "justify-center", "rounded-xl", "transition-colors", 3, "ngClass"], [1, "material-symbols-outlined", "text-xl"], [1, "min-w-0", "flex-1"], [1, "font-bold", "text-sm", "text-slate-900", "dark:text-slate-100", "truncate"], [1, "flex", "items-center", "gap-2", "mt-0.5"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase"], [1, "text-[10px]", "text-slate-300"], [1, "flex", "items-center", "gap-4"], [1, "flex", "items-center", "gap-1", "text-[10px]", "font-black", "text-emerald-600", "bg-emerald-50", "px-2", "py-1", "rounded", "uppercase", "tracking-widest"], [1, "p-2", "text-slate-400", "hover:text-blue-600", "transition-colors", 3, "click"], [1, "absolute", "right-0", "top-full", "mt-2", "w-48", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-800", "rounded-xl", "shadow-xl", "z-50", "py-2", "animate-in", "fade-in", "zoom-in-95"], ["target", "_blank", 1, "flex", "items-center", "gap-3", "px-4", "py-2", "text-sm", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-50", "dark:hover:bg-slate-800", "no-underline", 3, "href"], [1, "material-symbols-outlined", "text-lg"], [1, "flex", "items-center", "gap-3", "px-4", "py-2", "text-sm", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-50", "dark:hover:bg-slate-800", "no-underline", 3, "href", "download"], [1, "h-px", "bg-slate-100", "dark:bg-slate-800", "my-2"], [1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-2", "text-sm", "text-red-500", "hover:bg-red-50", "dark:hover:bg-red-900/20", 3, "click"], [1, "material-symbols-outlined", "text-6xl", "opacity-20"], [1, "mt-4", "font-bold"], [1, "aspect-[4/3]", "bg-slate-50", "dark:bg-slate-950", "flex", "items-center", "justify-center", "relative", "group"], [1, "w-full", "h-full", "object-cover", 3, "src"], [1, "material-symbols-outlined", "text-7xl", "text-slate-200", "dark:text-slate-800"], [1, "absolute", "inset-0", "bg-slate-900/40", "opacity-0", "group-hover:opacity-100", "transition-all", "flex", "items-center", "justify-center", "gap-3"], ["target", "_blank", 1, "w-12", "h-12", "bg-white", "rounded-full", "flex", "items-center", "justify-center", "text-slate-900", "hover:scale-110", "transition-transform", 3, "href"], [1, "p-6"], [1, "flex", "justify-between", "items-start", "mb-6"], [1, "font-black", "text-slate-900", "dark:text-slate-50", "leading-tight", "truncate", "w-48"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mt-1"], [1, "px-2", "py-1", "bg-slate-100", "dark:bg-slate-800", "rounded", "text-[8px]", "font-black", "uppercase", "tracking-tighter", "text-slate-500"], [1, "space-y-4", "pt-4", "border-t", "border-slate-50", "dark:border-slate-800"], [1, "flex", "justify-between"], [1, "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest"], [1, "text-xs", "font-black", "text-slate-700", "dark:text-slate-300"], [1, "text-xs", "font-black", 3, "ngClass"], [1, "mt-8", "space-y-3"], [1, "w-full", "py-4", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "rounded-2xl", "font-black", "text-[10px]", "uppercase", "tracking-widest", "hover:scale-[1.02]", "active:scale-95", "transition-all", "shadow-xl", "shadow-slate-900/10", "cursor-pointer"], [1, "w-full", "py-4", "border-2", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-center", "gap-2", "rounded-2xl", "font-black", "text-[10px]", "uppercase", "tracking-widest", "text-slate-600", "dark:text-slate-400", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-all", "no-underline", 3, "href", "download"], [1, "w-full", "py-4", "bg-slate-900", "dark:bg-white", "text-white", "dark:text-slate-900", "rounded-2xl", "font-black", "text-[10px]", "uppercase", "tracking-widest", "hover:scale-[1.02]", "active:scale-95", "transition-all", "shadow-xl", "shadow-slate-900/10", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-5xl", "mb-4", "opacity-20"], [1, "text-sm", "font-bold"]], template: function ProjectFiles_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ProjectFiles_Conditional_1_Template, 4, 0, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Project Repository");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "span", 7);
      \u0275\u0275text(9, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 8);
      \u0275\u0275twoWayListener("ngModelChange", function ProjectFiles_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ProjectFiles_Template_input_input_10_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "button", 9);
      \u0275\u0275listener("click", function ProjectFiles_Template_button_click_11_listener() {
        return ctx.uploadMedia.emit();
      });
      \u0275\u0275elementStart(12, "span", 10);
      \u0275\u0275text(13, "upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " Upload ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 11);
      \u0275\u0275repeaterCreate(16, ProjectFiles_For_17_Template, 10, 8, "div", 12, _forTrack04);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 13)(19, "div", 14)(20, "h2", 15);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 16);
      \u0275\u0275repeaterCreate(23, ProjectFiles_For_24_Template, 22, 10, "div", 17, _forTrack12, false, ProjectFiles_ForEmpty_25_Template, 5, 0, "div", 18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 19)(27, "div", 20);
      \u0275\u0275conditionalCreate(28, ProjectFiles_Conditional_28_Template, 34, 11, "div", 21)(29, ProjectFiles_Conditional_29_Template, 5, 0, "div", 22);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSignatureAlert ? 1 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.selectedCategory, " Documents");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredFiles);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.selectedFile ? 28 : 29);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectFiles, [{
    type: Component,
    args: [{ selector: "app-project-files", standalone: false, template: `<div class="grid grid-cols-12 gap-8 relative">\r
\r
    <!-- Signature Alert Overlay -->\r
    @if (showSignatureAlert) {\r
    <div\r
        class="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-in slide-in-from-top-4 flex items-center gap-2">\r
        <span class="material-symbols-outlined">check_circle</span>\r
        Signature Requested via Email\r
    </div>\r
    }\r
\r
    <!-- Main View -->\r
    <div class="col-span-8 flex flex-col gap-8">\r
        <div class="flex justify-between items-center">\r
            <h2 class="text-xl font-bold tracking-tight">Project Repository</h2>\r
            <div class="flex items-center gap-3">\r
                <div class="relative">\r
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>\r
                    <input type="text" [(ngModel)]="searchQuery" (input)="applyFilters()"\r
                        placeholder="Search files..."\r
                        class="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all" />\r
                </div>\r
                <button (click)="uploadMedia.emit()"\r
                    class="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-md transition-all cursor-pointer flex items-center gap-2">\r
                    <span class="material-symbols-outlined text-sm">upload</span> Upload\r
                </button>\r
            </div>\r
        </div>\r
\r
        <!-- Category Overview (Replacement for manual folders) -->\r
        <div class="grid grid-cols-5 gap-4">\r
            @for (cat of categories; track cat.name) {\r
            <div (click)="selectCategory(cat.name)"\r
                class="p-5 rounded-2xl cursor-pointer transition-all border group relative overflow-hidden"\r
                [ngClass]="selectedCategory === cat.name ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/50'">\r
                \r
                <div class="flex justify-between items-start relative z-10">\r
                    <span class="material-symbols-outlined text-2xl transition-transform group-hover:scale-110" \r
                        [ngClass]="selectedCategory === cat.name ? 'text-white' : cat.color">{{ cat.icon }}</span>\r
                </div>\r
                \r
                <div class="mt-4 relative z-10">\r
                    <h3 class="font-bold text-xs uppercase tracking-widest" \r
                        [ngClass]="selectedCategory === cat.name ? 'text-white' : 'text-slate-600 dark:text-slate-400'">{{ cat.name }}</h3>\r
                    <p class="text-[10px] font-black mt-1" \r
                        [ngClass]="selectedCategory === cat.name ? 'text-white/80' : 'text-slate-400'">{{ cat.count }} Files</p>\r
                </div>\r
\r
                @if (selectedCategory === cat.name) {\r
                    <div class="absolute -right-4 -bottom-4 opacity-10">\r
                        <span class="material-symbols-outlined text-8xl text-white">{{ cat.icon }}</span>\r
                    </div>\r
                }\r
            </div>\r
            }\r
        </div>\r
\r
        <!-- Files List -->\r
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">\r
            <div class="flex justify-between items-center mb-6">\r
                <h2 class="text-sm font-black uppercase tracking-widest text-slate-400">{{ selectedCategory }} Documents</h2>\r
            </div>\r
            \r
            <div class="space-y-1">\r
                @for (file of filteredFiles; track file.id) {\r
                <div (click)="selectFile(file)"\r
                    class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group cursor-pointer border border-transparent"\r
                    [ngClass]="{'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100/50 dark:border-blue-800/50': selectedFile?.id === file.id}">\r
                    \r
                    <div class="flex items-center gap-4 flex-1 min-w-0">\r
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl transition-colors" [ngClass]="file.color">\r
                            <span class="material-symbols-outlined text-xl">{{ file.icon }}</span>\r
                        </div>\r
                        <div class="min-w-0 flex-1">\r
                            <h4 class="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{{ file.name }}</h4>\r
                            <div class="flex items-center gap-2 mt-0.5">\r
                                <span class="text-[10px] text-slate-400 font-bold uppercase">{{ file.type }}</span>\r
                                <span class="text-[10px] text-slate-300">\u2022</span>\r
                                <span class="text-[10px] text-slate-400 font-bold uppercase">{{ file.dateLabel }}</span>\r
                            </div>\r
                        </div>\r
                    </div>\r
\r
                    <div class="flex items-center gap-4">\r
                        @if (file.status === 'Signed') {\r
                        <span class="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-widest">\r
                            <span class="material-symbols-outlined text-sm">verified</span> Signed\r
                        </span>\r
                        }\r
                        \r
                        <div class="relative">\r
                            <button (click)="toggleFileDropdown(file.id, $event)"\r
                                class="p-2 text-slate-400 hover:text-blue-600 transition-colors">\r
                                <span class="material-symbols-outlined">more_vert</span>\r
                            </button>\r
                            \r
                            @if (showDropdownForFile === file.id) {\r
                            <div class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95">\r
                                <a [href]="file.fullUrl" target="_blank" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 no-underline">\r
                                    <span class="material-symbols-outlined text-lg">visibility</span> View Document\r
                                </a>\r
                                <a [href]="file.fullUrl" [download]="file.name" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 no-underline">\r
                                    <span class="material-symbols-outlined text-lg">download</span> Download\r
                                </a>\r
                                <div class="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>\r
                                <button (click)="deleteFile(file)" class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">\r
                                    <span class="material-symbols-outlined text-lg">delete</span> Delete\r
                                </button>\r
                            </div>\r
                            }\r
                        </div>\r
                    </div>\r
                </div>\r
                } @empty {\r
                <div class="py-12 flex flex-col items-center justify-center text-slate-400">\r
                    <span class="material-symbols-outlined text-6xl opacity-20">folder_open</span>\r
                    <p class="mt-4 font-bold">No documents found in this category</p>\r
                </div>\r
                }\r
            </div>\r
        </div>\r
    </div>\r
\r
    <!-- Right Sidebar: Preview & Info -->\r
    <div class="col-span-4">\r
        <div class="sticky top-8 space-y-6">\r
            @if (selectedFile) {\r
            <div class="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">\r
                <div class="aspect-[4/3] bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative group">\r
                    @if (selectedFile.mimetype?.startsWith('image/')) {\r
                        <img [src]="selectedFile.fullUrl" class="w-full h-full object-cover" />\r
                    } @else {\r
                        <span class="material-symbols-outlined text-7xl text-slate-200 dark:text-slate-800">{{ selectedFile.icon }}</span>\r
                    }\r
                    <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">\r
                        <a [href]="selectedFile.fullUrl" target="_blank" \r
                            class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 transition-transform">\r
                            <span class="material-symbols-outlined">zoom_in</span>\r
                        </a>\r
                    </div>\r
                </div>\r
\r
                <div class="p-6">\r
                    <div class="flex justify-between items-start mb-6">\r
                        <div>\r
                            <h3 class="font-black text-slate-900 dark:text-slate-50 leading-tight truncate w-48">{{ selectedFile.name }}</h3>\r
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{{ selectedFile.size }} \u2022 {{ selectedFile.type }}</p>\r
                        </div>\r
                        <span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[8px] font-black uppercase tracking-tighter text-slate-500">v1.0</span>\r
                    </div>\r
\r
                    <div class="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">\r
                        <div class="flex justify-between">\r
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Uploader</span>\r
                            <span class="text-xs font-black text-slate-700 dark:text-slate-300">{{ selectedFile.author }}</span>\r
                        </div>\r
                        <div class="flex justify-between">\r
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>\r
                            <span class="text-xs font-black" [ngClass]="selectedFile.status === 'Signed' ? 'text-emerald-600' : 'text-amber-500'">{{ selectedFile.status || 'Pending Review' }}</span>\r
                        </div>\r
                    </div>\r
\r
                    <div class="mt-8 space-y-3">\r
                        @if (selectedFile.status !== 'Signed') {\r
                        <button (click)="sendSignatureRequest()"\r
                            class="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10 cursor-pointer">\r
                            Request Stakeholder Signature\r
                        </button>\r
                        }\r
                        <a [href]="selectedFile.fullUrl" [download]="selectedFile.name"\r
                            class="w-full py-4 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all no-underline">\r
                            <span class="material-symbols-outlined text-sm">download</span> Download Original\r
                        </a>\r
                    </div>\r
                </div>\r
            </div>\r
            } @else {\r
            <div class="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center text-slate-400">\r
                <span class="material-symbols-outlined text-5xl mb-4 opacity-20">info</span>\r
                <p class="text-sm font-bold">Select a file to view details and preview</p>\r
            </div>\r
            }\r
        </div>\r
    </div>\r
</div>` }]
  }], () => [], { documents: [{
    type: Input
  }], uploadMedia: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectFiles, { className: "ProjectFiles", filePath: "app/modules/projects/widgets/project-files/project-files.ts", lineNumber: 11 });
})();

// src/app/modules/projects/project-detail/project-detail.ts
var _c04 = (a0) => ["/master/projects/edit-project", a0];
var _c12 = (a0, a1, a2, a3, a4, a5, a6) => ({ "bg-blue-600": a0, "bg-indigo-600": a1, "bg-emerald-600": a2, "bg-amber-600": a3, "bg-rose-600": a4, "bg-purple-600": a5, "bg-cyan-600": a6 });
var _c2 = (a0, a1, a2, a3, a4, a5, a6) => ({ "text-blue-600": a0, "text-indigo-600": a1, "text-emerald-600": a2, "text-amber-600": a3, "text-rose-600": a4, "text-purple-600": a5, "text-cyan-600": a6 });
var _c3 = () => [];
var _forTrack05 = ($index, $item) => $item.name;
var _forTrack13 = ($index, $item) => $item.id;
function ProjectDetail_Conditional_0_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    \u0275\u0275property("value", m_r4.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r4.name);
  }
}
function ProjectDetail_Conditional_0_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "img", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", member_r5.role);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.serverUrl + member_r5.avatar, \u0275\u0275sanitizeUrl)("alt", member_r5.name);
  }
}
function ProjectDetail_Conditional_0_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_0_For_33_Template_button_click_0_listener() {
      const tab_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setActiveTab(tab_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r2.activeTab === tab_r7 ? "text-primary border-b-2 border-primary font-bold" : "text-outline hover:text-on-surface font-semibold");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r7, " ");
  }
}
function ProjectDetail_Conditional_0_Conditional_34_For_37_Conditional_32_For_5_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sm_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 1, sm_r12.startDate, "MMMd"));
  }
}
function ProjectDetail_Conditional_0_Conditional_34_For_37_Conditional_32_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_0_Conditional_34_For_37_Conditional_32_For_5_Template_div_click_0_listener() {
      const sm_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ms_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openEditSubMilestoneModal(ms_r10.id, sm_r12));
    });
    \u0275\u0275elementStart(1, "div", 71)(2, "div", 96)(3, "span", 97);
    \u0275\u0275text(4, "subdirectory_arrow_right");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "p", 98);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 99);
    \u0275\u0275element(9, "span", 100);
    \u0275\u0275text(10);
    \u0275\u0275conditionalCreate(11, ProjectDetail_Conditional_0_Conditional_34_For_37_Conditional_32_For_5_Conditional_11_Template, 5, 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 77)(13, "div", 78)(14, "span", 79);
    \u0275\u0275text(15, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 18)(20, "div", 101)(21, "div", 102)(22, "span", 103);
    \u0275\u0275text(23, "Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 104);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 105);
    \u0275\u0275element(27, "div", 106);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 107);
    \u0275\u0275text(29, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const sm_r12 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", sm_r12.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-emerald-500", sm_r12.status === "Completed")("bg-amber-500", sm_r12.status === "In Progress")("bg-slate-300", sm_r12.status !== "Completed" && sm_r12.status !== "In Progress");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sm_r12.status || "Pending", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(sm_r12.startDate ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(17, 14, sm_r12.startDate, "MMMd"), " \u2014 ", \u0275\u0275pipeBind2(18, 17, sm_r12.endDate, "MMMd"), " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", sm_r12.progress, "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", sm_r12.progress + "%");
  }
}
function ProjectDetail_Conditional_0_Conditional_34_For_37_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 91)(2, "div", 92)(3, "div", 93);
    \u0275\u0275repeaterCreate(4, ProjectDetail_Conditional_0_Conditional_34_For_37_Conditional_32_For_5_Template, 30, 20, "div", 94, _forTrack13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ms_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ms_r10.subMilestones);
  }
}
function ProjectDetail_Conditional_0_Conditional_34_For_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 69)(1, "td", 70)(2, "div", 71);
    \u0275\u0275element(3, "div", 72);
    \u0275\u0275elementStart(4, "div", 73);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_0_Conditional_34_For_37_Template_div_click_4_listener() {
      const ms_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openEditMilestoneModal(ms_r10));
    });
    \u0275\u0275elementStart(5, "h4", 74);
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "span", 75);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 76);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "td", 77)(12, "div", 78)(13, "span", 79);
    \u0275\u0275text(14, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 80)(19, "div", 81)(20, "div", 82)(21, "span", 83);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 84);
    \u0275\u0275text(24, "Completed");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 85);
    \u0275\u0275element(26, "div", 86);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "td", 87)(28, "div", 88)(29, "button", 89);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_0_Conditional_34_For_37_Template_button_click_29_listener() {
      const ms_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openAddSubMilestoneModal(ms_r10.id));
    });
    \u0275\u0275elementStart(30, "span", 90);
    \u0275\u0275text(31, "add_task");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(32, ProjectDetail_Conditional_0_Conditional_34_For_37_Conditional_32_Template, 6, 0, "tr");
  }
  if (rf & 2) {
    const ms_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction7(17, _c12, ms_r10.color === "blue-600", ms_r10.color === "indigo-600", ms_r10.color === "emerald-600", ms_r10.color === "amber-600", ms_r10.color === "rose-600", ms_r10.color === "purple-600", ms_r10.color === "cyan-600"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ms_r10.name, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (ms_r10.subMilestones == null ? null : ms_r10.subMilestones.length) || 0, " Sub-milestones ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(16, 11, ms_r10.startDate, "MMM d"), " \u2014 ", \u0275\u0275pipeBind2(17, 14, ms_r10.endDate, "MMM d"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction7(25, _c2, ms_r10.color === "blue-600", ms_r10.color === "indigo-600", ms_r10.color === "emerald-600", ms_r10.color === "amber-600", ms_r10.color === "rose-600", ms_r10.color === "purple-600", ms_r10.color === "cyan-600"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ms_r10.progress, "%");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ms_r10.progress + "%");
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction7(33, _c12, ms_r10.color === "blue-600", ms_r10.color === "indigo-600", ms_r10.color === "emerald-600", ms_r10.color === "amber-600", ms_r10.color === "rose-600", ms_r10.color === "purple-600", ms_r10.color === "cyan-600"));
    \u0275\u0275advance(6);
    \u0275\u0275conditional((ms_r10.subMilestones == null ? null : ms_r10.subMilestones.length) ? 32 : -1);
  }
}
function ProjectDetail_Conditional_0_Conditional_34_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 109);
    \u0275\u0275text(2, "No milestones created yet. ");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetail_Conditional_0_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 41)(2, "div", 42)(3, "span", 43);
    \u0275\u0275text(4, "analytics");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 44)(6, "div", 45)(7, "div", 46)(8, "div")(9, "h3", 47);
    \u0275\u0275text(10, "Milestone Synchronization");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 48);
    \u0275\u0275text(12, "Real-time Phase Integration Status ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 49);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_0_Conditional_34_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openAddMilestoneModal());
    });
    \u0275\u0275elementStart(14, "span", 50);
    \u0275\u0275text(15, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Add Milestone ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 51)(18, "span", 52);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 53);
    \u0275\u0275text(21, "Net Completion");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 54)(23, "div", 55)(24, "table", 56)(25, "thead")(26, "tr", 57)(27, "th", 58);
    \u0275\u0275text(28, "Milestone Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th", 59);
    \u0275\u0275text(30, "Dates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "th", 59);
    \u0275\u0275text(32, "Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "th", 60);
    \u0275\u0275text(34, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "tbody", 61);
    \u0275\u0275repeaterCreate(36, ProjectDetail_Conditional_0_Conditional_34_For_37_Template, 33, 41, null, null, _forTrack13);
    \u0275\u0275conditionalCreate(38, ProjectDetail_Conditional_0_Conditional_34_Conditional_38_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 62)(40, "div", 63)(41, "div", 64)(42, "span", 65);
    \u0275\u0275text(43, "Est. Completion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 66);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(47, "div", 67);
    \u0275\u0275elementStart(48, "div", 64)(49, "span", 65);
    \u0275\u0275text(50, "Capital Utilization");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 66);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "button", 68);
    \u0275\u0275text(54, " FULL AUDIT ");
    \u0275\u0275elementStart(55, "span", 50);
    \u0275\u0275text(56, "arrow_forward");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275textInterpolate1("", ctx_r2.project.progress, "%");
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r2.project.milestones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.project.milestones || ctx_r2.project.milestones.length === 0 ? 38 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(46, 5, ctx_r2.project.estimatedCompletion, "MMM dd, yyyy"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("\u20B9", (((ctx_r2.project.budget == null ? null : ctx_r2.project.budget.used) || 0) / 1e6).toFixed(1), "M / \u20B9", (((ctx_r2.project.budget == null ? null : ctx_r2.project.budget.total) || 0) / 1e6).toFixed(1), "M");
  }
}
function ProjectDetail_Conditional_0_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-task-management", 34);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("projectId", ctx_r2.project.id)("team_members", ctx_r2.project.team_members || \u0275\u0275pureFunction0(3, _c3))("milestones", ctx_r2.project.milestones || \u0275\u0275pureFunction0(4, _c3));
  }
}
function ProjectDetail_Conditional_0_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-project-timeline", 35);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("projectId", ctx_r2.project.id)("selectedMember", ctx_r2.selectedMember);
  }
}
function ProjectDetail_Conditional_0_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-project-budget");
  }
}
function ProjectDetail_Conditional_0_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-project-files", 110);
    \u0275\u0275listener("uploadMedia", function ProjectDetail_Conditional_0_Conditional_38_Template_app_project_files_uploadMedia_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openDrawingUpload());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("documents", ctx_r2.project.documents || \u0275\u0275pureFunction0(1, _c3));
  }
}
function ProjectDetail_Conditional_0_Conditional_39_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 122);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_0_Conditional_39_For_11_Template_button_click_0_listener() {
      const opt_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.auditFilter = opt_r15);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.auditFilter === opt_r15 ? "bg-primary text-white shadow-md" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r15, " ");
  }
}
function ProjectDetail_Conditional_0_Conditional_39_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 120)(1, "div", 123)(2, "span", 124);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 125)(5, "div", 126)(6, "div", 127)(7, "span", 128);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 129);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 130);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 131);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 132)(16, "div", 133)(17, "span", 134);
    \u0275\u0275text(18, "person");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "span", 135);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const entry_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", entry_r16.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r16.icon);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(entry_r16.action);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", entry_r16.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r16.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r16.time);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r16.detail);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(entry_r16.user);
  }
}
function ProjectDetail_Conditional_0_Conditional_39_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(' No audit entries for "', ctx_r2.auditFilter, '" type. ');
  }
}
function ProjectDetail_Conditional_0_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 111)(2, "div")(3, "h3", 112);
    \u0275\u0275text(4, "Project Audit Trail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 113);
    \u0275\u0275text(6, "Complete history from project creation to present day.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 114);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 115);
    \u0275\u0275repeaterCreate(10, ProjectDetail_Conditional_0_Conditional_39_For_11_Template, 2, 2, "button", 116, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 117);
    \u0275\u0275element(13, "div", 118);
    \u0275\u0275elementStart(14, "div", 119);
    \u0275\u0275repeaterCreate(15, ProjectDetail_Conditional_0_Conditional_39_For_16_Template, 21, 8, "div", 120, _forTrack13);
    \u0275\u0275conditionalCreate(17, ProjectDetail_Conditional_0_Conditional_39_Conditional_17_Template, 2, 1, "div", 121);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r2.filteredAudit.length, " entries");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.auditFilterOptions);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.filteredAudit);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.filteredAudit.length === 0 ? 17 : -1);
  }
}
function ProjectDetail_Conditional_0_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 136)(2, "span", 137);
    \u0275\u0275text(3, "construction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 138);
    \u0275\u0275text(5, "Module Under Construction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 139);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("The ", ctx_r2.activeTab, " module is being assembled.");
  }
}
function ProjectDetail_Conditional_0_Conditional_41_Template(rf, ctx) {
}
function ProjectDetail_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 12)(2, "nav", 13)(3, "a", 14);
    \u0275\u0275text(4, "Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 15);
    \u0275\u0275text(6, "chevron_right");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 17)(10, "div", 18)(11, "h1", 19);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 20);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 21)(16, "div", 22)(17, "span", 23);
    \u0275\u0275text(18, "filter_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetail_Conditional_0_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedMember, $event) || (ctx_r2.selectedMember = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 25);
    \u0275\u0275text(21, "All Team");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, ProjectDetail_Conditional_0_For_23_Template, 2, 2, "option", 26, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 27);
    \u0275\u0275repeaterCreate(25, ProjectDetail_Conditional_0_For_26_Template, 2, 3, "div", 28, _forTrack05);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 29)(28, "span", 30);
    \u0275\u0275text(29, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " Edit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 31);
    \u0275\u0275repeaterCreate(32, ProjectDetail_Conditional_0_For_33_Template, 2, 3, "button", 32, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(34, ProjectDetail_Conditional_0_Conditional_34_Template, 57, 8, "div", 33)(35, ProjectDetail_Conditional_0_Conditional_35_Template, 1, 5, "app-task-management", 34)(36, ProjectDetail_Conditional_0_Conditional_36_Template, 1, 2, "app-project-timeline", 35)(37, ProjectDetail_Conditional_0_Conditional_37_Template, 1, 0, "app-project-budget")(38, ProjectDetail_Conditional_0_Conditional_38_Template, 1, 2, "app-project-files", 36)(39, ProjectDetail_Conditional_0_Conditional_39_Template, 18, 2, "div", 37)(40, ProjectDetail_Conditional_0_Conditional_40_Template, 8, 1, "div", 38);
    \u0275\u0275conditionalCreate(41, ProjectDetail_Conditional_0_Conditional_41_Template, 0, 0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.project.type);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.project.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.project.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedMember);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.teamMembers);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.project.team);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c04, ctx_r2.project.id));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.tabs);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.activeTab === "Overview" ? 34 : ctx_r2.activeTab === "Tasks" ? 35 : ctx_r2.activeTab === "Timeline" ? 36 : ctx_r2.activeTab === "Budget" ? 37 : ctx_r2.activeTab === "Files" ? 38 : ctx_r2.activeTab === "Updates" ? 39 : 40);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r2.showAddUpdateModal ? 41 : -1);
  }
}
function ProjectDetail_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 140);
    \u0275\u0275elementStart(2, "p", 141);
    \u0275\u0275text(3, "Loading Blueprint...");
    \u0275\u0275elementEnd()();
  }
}
function ProjectDetail_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 142)(2, "h4", 143)(3, "span", 144);
    \u0275\u0275text(4, "mail");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Request Form Info ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 145);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showRFIComposer = false);
    });
    \u0275\u0275elementStart(7, "span", 124);
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 146)(10, "div", 147)(11, "span", 148);
    \u0275\u0275text(12, "To:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 149);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetail_Conditional_2_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.rfiForm.to, $event) || (ctx_r2.rfiForm.to = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 147)(15, "span", 148);
    \u0275\u0275text(16, "Cc:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 149);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetail_Conditional_2_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.rfiForm.cc, $event) || (ctx_r2.rfiForm.cc = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 147)(19, "span", 148);
    \u0275\u0275text(20, "Bcc:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 149);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetail_Conditional_2_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.rfiForm.bcc, $event) || (ctx_r2.rfiForm.bcc = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 147)(23, "span", 148);
    \u0275\u0275text(24, "Subject:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 150);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetail_Conditional_2_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.rfiForm.subject, $event) || (ctx_r2.rfiForm.subject = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 151)(27, "textarea", 152);
    \u0275\u0275twoWayListener("ngModelChange", function ProjectDetail_Conditional_2_Template_textarea_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.rfiForm.content, $event) || (ctx_r2.rfiForm.content = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 153)(29, "button", 154)(30, "span", 155);
    \u0275\u0275text(31, "attach_file");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 156);
    \u0275\u0275listener("click", function ProjectDetail_Conditional_2_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendRFI());
    });
    \u0275\u0275elementStart(33, "span", 144);
    \u0275\u0275text(34, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(35, " Send ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.rfiForm.to);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.rfiForm.cc);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.rfiForm.bcc);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.rfiForm.subject);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.rfiForm.content);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r2.rfiForm.to || !ctx_r2.rfiForm.subject);
  }
}
function ProjectDetail_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 157)(1, "div", 158)(2, "span", 159);
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 160);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 103);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r19 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(file_r19.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (file_r19.size / 1024).toFixed(0), "KB");
  }
}
function ProjectDetail_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, ProjectDetail_Conditional_14_For_2_Template, 8, 2, "div", 157, _forTrack05);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.selectedFiles);
  }
}
var ProjectDetail = class _ProjectDetail {
  route;
  projectService;
  toastr;
  dialog;
  project = null;
  loading = true;
  error = null;
  activeTab = "Overview";
  tabs = ["Overview", "Tasks", "Timeline", "Budget", "Files", "Updates"];
  teamMembers = [{ name: "All Members" }];
  selectedMember = "All Members";
  showAddUpdateModal = false;
  showRFIComposer = false;
  showDrawingUpload = false;
  rfiForm = { to: "", cc: "", bcc: "", subject: "", content: "" };
  selectedFiles = [];
  auditFilter = "All";
  auditFilterOptions = ["All", "Project", "Task", "Milestone", "Document", "Safety", "Budget", "Team"];
  auditTrail = [];
  serverUrl = environment.serverUrl;
  constructor(route, projectService, toastr, dialog) {
    this.route = route;
    this.projectService = projectService;
    this.toastr = toastr;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.fetchProjectDetails(id);
      }
    });
    this.mockAuditTrail();
  }
  fetchProjectDetails(id) {
    this.loading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (res) => {
        this.project = this.mapProjectData(res.data);
        this.loading = false;
        this.syncTeamMembers();
      },
      error: () => {
        this.loading = false;
        this.error = "Failed to load project details.";
        this.toastr.error(this.error);
      }
    });
  }
  mapProjectData(p) {
    const allMilestones = p.milestones || [];
    const parentMilestones = allMilestones.filter((m) => !m.parent_id).map((m, i) => __spreadProps(__spreadValues({}, m), {
      color: m.color || (i % 3 === 0 ? "blue-600" : i % 3 === 1 ? "indigo-600" : "emerald-600"),
      subMilestones: allMilestones.filter((sm) => sm.parent_id === m.id)
    }));
    const totalMs = parentMilestones.length;
    let totalProgress = 0;
    parentMilestones.forEach((m) => {
      totalProgress += m.progress || 0;
    });
    const progress = totalMs > 0 ? Math.round(totalProgress / totalMs) : 0;
    return __spreadProps(__spreadValues({}, p), {
      progress,
      milestones: parentMilestones,
      estimatedCompletion: p.completion_date,
      budget_summary: {
        total: p.budget_total || 0,
        used: p.budget_used || 0
      },
      team: (p.team_members || []).map((m) => ({
        name: `${m.firstname} ${m.lastname}`,
        role: m.PROJECT_TEAM?.role || "Technical Staff",
        avatar: m.avatar || "https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop"
      }))
    });
  }
  syncTeamMembers() {
    if (this.project?.team) {
      this.teamMembers = [{ name: "All Members" }, ...this.project.team];
    }
  }
  setActiveTab(tab) {
    this.activeTab = tab;
  }
  openRFIComposer() {
    this.showRFIComposer = true;
  }
  sendRFI() {
    this.toastr.success("RFI Sent Successfully");
    this.showRFIComposer = false;
  }
  openDrawingUpload() {
    this.showDrawingUpload = true;
    this.selectedFiles = [];
  }
  onFilesSelected(event) {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }
  submitDrawing() {
    if (this.selectedFiles.length === 0) {
      this.toastr.warning("Please select files to upload.");
      return;
    }
    if (!this.project)
      return;
    this.projectService.uploadDocuments(this.project.id, this.selectedFiles).subscribe({
      next: (res) => {
        this.toastr.success("Files uploaded successfully");
        this.showDrawingUpload = false;
        this.selectedFiles = [];
        this.fetchProjectDetails(this.project.id.toString());
      },
      error: (err) => {
        this.toastr.error("Failed to upload files.");
        console.error(err);
      }
    });
  }
  mockAuditTrail() {
    this.auditTrail = [
      { id: "a1", type: "Project", action: "Project Initialized", detail: "Project created in system.", user: "System", time: "Just now", icon: "rocket_launch", color: "text-blue-600 bg-blue-100" },
      { id: "a2", type: "Team", action: "Team Assigned", detail: "Resource allocation completed.", user: "Admin", time: "2 hours ago", icon: "group_add", color: "text-indigo-600 bg-indigo-100" }
    ];
  }
  get filteredAudit() {
    if (this.auditFilter === "All")
      return this.auditTrail;
    return this.auditTrail.filter((a) => a.type === this.auditFilter);
  }
  openAddMilestoneModal() {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: "500px",
      disableClose: false,
      height: "auto",
      data: {
        project: this.project,
        title: "Add Milestone"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.fetchProjectDetails(this.project.id.toString());
    });
  }
  openEditMilestoneModal(ms) {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: "500px",
      disableClose: false,
      height: "auto",
      data: {
        project: this.project,
        milestone: ms,
        title: "Edit Milestone"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchProjectDetails(this.project.id.toString());
      }
    });
  }
  openEditSubMilestoneModal(msId, sm) {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: "500px",
      disableClose: false,
      height: "auto",
      data: {
        project: this.project,
        milestone: sm,
        parent_id: msId,
        title: "Edit Sub Milestone"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchProjectDetails(this.project.id.toString());
      }
    });
  }
  openAddSubMilestoneModal(msId) {
    const dialogRef = this.dialog.open(MilestoneFormDialog, {
      width: "500px",
      disableClose: false,
      height: "auto",
      data: {
        project: this.project,
        parent_id: msId,
        title: "Add Sub Milestone"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchProjectDetails(this.project.id.toString());
      }
    });
  }
  static \u0275fac = function ProjectDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectDetail)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectDetail, selectors: [["app-project-detail"]], standalone: false, decls: 15, vars: 8, consts: [["fileInput", ""], [1, "flex", "justify-center", "flex-col", "items-center", "h-96"], [1, "fixed", "bottom-4", "right-4", "z-100", "w-[450px]", "bg-white", "dark:bg-slate-900", "rounded-t-2xl", "rounded-b-xl", "shadow-2xl", "border", "border-slate-200", "dark:border-slate-800", "flex", "flex-col", "overflow-hidden", "animate-in", "slide-in-from-bottom-8", "duration-300"], ["title", "Submit Project Drawing", "subtitle", "Upload CAD, PDF, or image files. They will be added to the project gallery.", "icon", "cloud_upload", "cancelLabel", "Cancel", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "primaryLabel", "primaryDisabled"], [1, "p-8"], [1, "border-2", "border-dashed", "border-slate-200", "dark:border-slate-800", "rounded-xl", "p-8", "flex", "flex-col", "items-center", "justify-center", "text-center", "cursor-pointer", "hover:bg-slate-50", "transition-colors", "mb-6", 3, "click"], [1, "material-symbols-outlined", "text-[32px]", "text-blue-500", "mb-2"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300"], [1, "text-[10px]", "text-slate-400", "mt-1"], ["type", "file", "multiple", "", "accept", "image/*,.pdf,.dwg,.dxf,.zip", 1, "hidden", 3, "change"], [1, "mb-6", "max-h-32", "overflow-y-auto", "space-y-2", "no-scrollbar"], [1, "mb-10", "flex", "flex-col", "md:flex-row", "justify-between", "items-start", "md:items-end", "gap-6"], [1, "space-y-4", "max-w-2xl"], [1, "flex", "items-center", "gap-2", "text-xs", "text-outline", "uppercase", "tracking-widest", "font-medium"], ["routerLink", "/dashboard", 1, "hover:text-primary", "transition-colors", "cursor-pointer"], [1, "material-symbols-outlined", "text-[10px]"], [1, "text-primary"], [1, "space-y-2"], [1, "flex", "items-center", "gap-4"], [1, "text-4xl", "md:text-5xl", "font-extrabold", "tracking-tighter", "text-on-surface"], [1, "text-on-surface-variant", "text-lg", "max-w-xl", "font-light"], [1, "flex", "items-center", "gap-6"], [1, "flex", "items-center", "gap-3", "bg-white", "dark:bg-slate-800", "px-4", "py-2", "rounded-xl", "border", "border-slate-100", "dark:border-slate-800", "shadow-sm", "self-start"], [1, "material-symbols-outlined", "text-slate-400", "text-sm"], [1, "bg-transparent", "border-none", "text-[11px]", "font-black", "uppercase", "tracking-widest", "text-on-surface", "outline-none", "cursor-pointer", "appearance-none", "pr-4", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "flex", "-space-x-3"], [1, "w-12", "h-12", "rounded-full", "ring-4", "ring-background", "overflow-hidden", 3, "title"], [1, "cursor-pointer", "bg-surface-container-high", "text-on-surface", "px-6", "py-3", "rounded-xl", "font-semibold", "border", "border-outline-variant/30", "hover:bg-surface-container-highest", "transition-all", "flex", "items-center", "gap-2", "hover:scale-[1.02]", "active:scale-[0.98]", 3, "routerLink"], [1, "material-symbols-outlined"], [1, "flex", "items-center", "gap-8", "border-none", "mb-10", "overflow-x-auto", "pb-2", "scrollbar-hide"], [1, "text-lg", "font-semibold", "transition-colors", "pb-2", "whitespace-nowrap", "cursor-pointer", 3, "class"], [1, "grid", "grid-cols-12", "gap-6"], [3, "projectId", "team_members", "milestones"], [3, "projectId", "selectedMember"], [3, "documents"], [1, "max-w-4xl", "mx-auto", "space-y-6"], [1, "flex", "items-center", "justify-center", "h-64", "bg-surface-container-low", "rounded-xl", "border", "border-dashed", "border-outline-variant/50"], [3, "src", "alt"], [1, "text-lg", "font-semibold", "transition-colors", "pb-2", "whitespace-nowrap", "cursor-pointer", 3, "click"], [1, "col-span-12", "lg:col-span-12", "bg-surface-container-lowest", "rounded-xl", "p-8", "shadow-[0_12_32px_rgba(15,23,42,0.06)]", "relative", "overflow-hidden", "group", "border", "border-outline-variant/10"], [1, "absolute", "top-0", "right-0", "p-8", "opacity-5", "group-hover:scale-110", "transition-transform", "duration-700"], [1, "material-symbols-outlined", "text-[150px]"], [1, "relative", "z-10", "flex", "flex-col", "h-full"], [1, "flex", "justify-between", "items-start", "mb-6"], [1, "flex", "justify-between", "items-center", "w-full"], [1, "text-xl", "font-black", "tracking-tight", "mb-0.5", "text-slate-900", "dark:text-slate-50"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest"], [1, "px-4", "py-2", "bg-blue-600", "cursor-pointer", "text-white", "rounded-xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "shadow-md", "hover:bg-blue-700", "transition-all", "flex", "items-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "text-right"], [1, "text-3xl", "font-black", "text-blue-600", "tracking-tighter"], [1, "text-[8px]", "uppercase", "tracking-[0.2em]", "font-black", "text-slate-400"], [1, "mt-auto", "space-y-6"], [1, "mt-auto", "w-full", "overflow-x-auto", "rounded-xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "w-full", "text-left", "border-collapse"], [1, "bg-slate-50", "dark:bg-slate-800/50", "border-b", "border-slate-100", "dark:border-slate-800", "text-[10px]", "uppercase", "tracking-widest", "text-slate-400", "font-black"], [1, "p-4", "rounded-tl-xl", "whitespace-nowrap"], [1, "p-4", "whitespace-nowrap"], [1, "p-4", "rounded-tr-xl", "whitespace-nowrap", "text-right"], [1, "bg-white", "dark:bg-transparent"], [1, "pt-4", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "flex-wrap", "items-center", "justify-between", "gap-4"], [1, "flex", "flex-wrap", "items-center", "gap-6"], [1, "flex", "flex-col"], [1, "text-[8px]", "text-slate-400", "uppercase", "font-black", "tracking-widest", "mb-0.5"], [1, "text-slate-900", "dark:text-slate-50", "text-[11px]", "font-black", "uppercase"], [1, "w-px", "h-6", "bg-slate-100", "dark:bg-slate-800"], [1, "text-blue-600", "font-black", "text-[9px]", "uppercase", "tracking-[0.2em]", "flex", "items-center", "gap-1.5", "hover:underline"], [1, "border-b", "border-slate-50", "dark:border-slate-800/50", "hover:bg-slate-50/50", "dark:hover:bg-slate-800/30", "transition-colors", "group"], [1, "p-4"], [1, "flex", "items-center", "gap-3"], [1, "w-1.5", "h-8", "rounded-full", "shadow-sm", 3, "ngClass"], [1, "cursor-pointer", "group/msname", 3, "click"], [1, "text-xs", "font-black", "text-slate-900", "dark:text-slate-100", "uppercase", "tracking-tight", "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", "text-[12px]", "opacity-0", "group-hover/msname:opacity-100", "transition-all", "text-blue-600"], [1, "text-[9px]", "font-bold", "text-slate-400", "mt-0.5", "block"], [1, "p-4", "align-middle"], [1, "flex", "items-center", "gap-2", "text-[10px]", "text-slate-500", "dark:text-slate-400", "font-bold", "tracking-tight", "bg-slate-50", "dark:bg-slate-800/50", "px-2", "py-1.5", "rounded-lg", "w-max"], [1, "material-symbols-outlined", "text-[12px]"], [1, "p-4", "align-middle", "w-48"], [1, "flex", "flex-col", "gap-1.5"], [1, "flex", "justify-between", "items-center", "text-[9px]", "font-black", "uppercase", "tracking-widest"], [3, "ngClass"], [1, "text-slate-400"], [1, "h-1.5", "w-full", "bg-slate-100", "dark:bg-slate-800", "rounded-full", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all", "duration-1000", 3, "ngClass"], [1, "p-4", "align-middle", "text-right"], [1, "flex", "items-center", "justify-end", "gap-2", "opacity-0", "group-hover:opacity-100", "transition-opacity"], ["title", "Add Sub-Milestone", 1, "w-8", "h-8", "cursor-pointer", "rounded-lg", "bg-slate-50", "dark:bg-slate-800", "text-slate-400", "hover:text-indigo-600", "hover:bg-indigo-50", "dark:hover:bg-indigo-900/20", "transition-colors", "flex", "items-center", "justify-center", 3, "click"], [1, "material-symbols-outlined", "text-[14px]"], ["colspan", "4", 1, "p-0", "border-b", "border-slate-100", "dark:border-slate-800/80"], [1, "bg-slate-50/50", "dark:bg-slate-800/10", "py-3", "px-6", "pr-4"], [1, "pl-6", "border-l-2", "border-slate-200", "dark:border-slate-700", "space-y-2"], [1, "flex", "items-center", "justify-between", "group/sm", "cursor-pointer", "hover:bg-white", "dark:hover:bg-slate-800", "p-2", "rounded-xl", "transition-all", "border", "border-transparent", "hover:border-slate-200", "dark:hover:border-slate-700", "shadow-sm", "hover:shadow-md"], [1, "flex", "items-center", "justify-between", "group/sm", "cursor-pointer", "hover:bg-white", "dark:hover:bg-slate-800", "p-2", "rounded-xl", "transition-all", "border", "border-transparent", "hover:border-slate-200", "dark:hover:border-slate-700", "shadow-sm", "hover:shadow-md", 3, "click"], [1, "w-8", "h-8", "rounded-xl", "bg-indigo-50", "dark:bg-indigo-900/30", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-sm", "text-indigo-500"], [1, "text-[11px]", "font-black", "text-slate-700", "dark:text-slate-300", "group-hover/sm:text-indigo-600", "transition-colors", "uppercase", "tracking-tight"], [1, "text-[9px]", "text-slate-400", "font-bold", "uppercase", "tracking-tighter", "mt-0.5", "flex", "items-center", "gap-1"], [1, "w-1.5", "h-1.5", "rounded-full"], [1, "flex", "flex-col", "items-end", "w-24"], [1, "w-full", "flex", "justify-between", "items-end", "mb-1"], [1, "text-[8px]", "font-black", "text-slate-400", "uppercase", "tracking-widest"], [1, "text-[9px]", "font-black", "text-slate-700", "dark:text-slate-300"], [1, "w-full", "h-1", "bg-slate-200", "dark:bg-slate-700", "rounded-full", "overflow-hidden"], [1, "h-full", "bg-indigo-500", "rounded-full", "transition-all"], [1, "opacity-0", "cursor-pointer", "group-hover/sm:opacity-100", "material-symbols-outlined", "text-[14px]", "text-slate-400", "hover:text-indigo-600", "transition-all", "p-1"], [1, "opacity-50", "mx-1"], ["colspan", "4", 1, "p-8", "text-center", "text-slate-400", "font-medium", "text-xs"], [3, "uploadMedia", "documents"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "tracking-tight"], [1, "text-sm", "text-on-surface-variant", "mt-1"], [1, "text-xs", "font-bold", "bg-primary/10", "text-primary", "px-3", "py-1", "rounded-full"], [1, "flex", "flex-wrap", "gap-2", "pb-4", "border-b", "border-outline-variant/20"], [1, "px-3", "py-1.5", "rounded-full", "text-xs", "font-bold", "transition-all", "cursor-pointer", 3, "ngClass"], [1, "relative"], [1, "absolute", "left-5", "top-0", "bottom-0", "w-0.5", "bg-linear-to-b", "from-primary/30", "via-outline-variant/30", "to-transparent"], [1, "space-y-1"], [1, "relative", "flex", "gap-4", "pl-14", "pb-6", "group"], [1, "pl-14", "py-10", "text-center", "text-on-surface-variant", "font-bold"], [1, "px-3", "py-1.5", "rounded-full", "text-xs", "font-bold", "transition-all", "cursor-pointer", 3, "click", "ngClass"], [1, "absolute", "left-0", "top-0", "w-10", "h-10", "rounded-full", "flex", "items-center", "justify-center", "shadow-sm", "border-2", "border-white", "dark:border-slate-900", "z-10", 3, "ngClass"], [1, "material-symbols-outlined", "text-[18px]"], [1, "flex-1", "bg-surface-container-lowest", "border", "border-outline-variant/10", "rounded-xl", "p-5", "shadow-sm", "hover:shadow-md", "transition-all", "group-hover:-translate-y-0.5"], [1, "flex", "items-start", "justify-between", "gap-4", "mb-2"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "font-bold", "text-sm", "text-on-surface"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "px-2", "py-0.5", "rounded-full", 3, "ngClass"], [1, "text-[10px]", "font-bold", "text-outline", "uppercase", "tracking-widest", "shrink-0"], [1, "text-sm", "text-on-surface-variant", "leading-relaxed", "mb-3"], [1, "flex", "items-center", "gap-2"], [1, "w-5", "h-5", "rounded-full", "bg-surface-container-high", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[12px]", "text-outline"], [1, "text-xs", "font-bold", "text-outline"], [1, "text-center"], [1, "material-symbols-outlined", "text-4xl", "text-outline", "mb-2"], [1, "text-on-surface", "font-bold", "text-lg"], [1, "text-outline", "text-sm", "mt-1"], [1, "w-16", "h-16", "border-4", "border-primary", "border-t-transparent", "rounded-full", "animate-spin"], [1, "mt-4", "text-on-surface-variant", "font-bold", "tracking-widest", "text-sm", "uppercase"], [1, "bg-slate-900", "dark:bg-slate-950", "text-white", "px-4", "py-3", "flex", "justify-between", "items-center"], [1, "text-sm", "font-bold", "tracking-widest", "uppercase", "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", "text-[16px]"], [1, "text-slate-400", "hover:text-white", "cursor-pointer", 3, "click"], [1, "p-4", "space-y-3", "bg-slate-50", "dark:bg-slate-800/20"], [1, "flex", "items-center", "border-b", "border-slate-200", "dark:border-slate-800", "pb-2"], [1, "text-xs", "font-bold", "text-slate-400", "w-12"], ["type", "text", 1, "flex-1", "bg-transparent", "border-none", "outline-none", "text-sm", "text-slate-900", "dark:text-slate-50", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "RFI Project Inquiry", 1, "flex-1", "bg-transparent", "border-none", "outline-none", "font-bold", "text-sm", "text-slate-900", "dark:text-slate-50", 3, "ngModelChange", "ngModel"], [1, "flex-1", "p-4", "bg-white", "dark:bg-slate-900"], ["placeholder", "Type your request here...", 1, "w-full", "h-32", "bg-transparent", "border-none", "outline-none", "text-sm", "text-slate-700", "dark:text-slate-300", "resize-none", 3, "ngModelChange", "ngModel"], [1, "p-3", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "justify-between", "items-center", "bg-slate-50", "dark:bg-slate-900"], [1, "text-slate-400", "hover:text-blue-500", "cursor-pointer"], [1, "material-symbols-outlined", "text-[20px]"], [1, "bg-blue-600", "text-white", "px-5", "py-2", "rounded-xl", "text-sm", "font-bold", "shadow-md", "hover:bg-blue-700", "disabled:opacity-50", "transition-colors", "cursor-pointer", "flex", "items-center", "gap-2", 3, "click", "disabled"], [1, "flex", "items-center", "justify-between", "bg-slate-50", "dark:bg-slate-800", "p-2", "rounded-lg", "border", "border-slate-100", "dark:border-slate-700"], [1, "flex", "items-center", "gap-2", "overflow-hidden"], [1, "material-symbols-outlined", "text-sm", "text-slate-400"], [1, "text-[10px]", "font-bold", "text-slate-600", "truncate"]], template: function ProjectDetail_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275conditionalCreate(0, ProjectDetail_Conditional_0_Template, 42, 9)(1, ProjectDetail_Conditional_1_Template, 4, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, ProjectDetail_Conditional_2_Template, 36, 6, "div", 2);
      \u0275\u0275elementStart(3, "app-common-dialog", 3);
      \u0275\u0275listener("closed", function ProjectDetail_Template_app_common_dialog_closed_3_listener() {
        return ctx.showDrawingUpload = false;
      })("primary", function ProjectDetail_Template_app_common_dialog_primary_3_listener() {
        return ctx.submitDrawing();
      });
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5);
      \u0275\u0275listener("click", function ProjectDetail_Template_div_click_5_listener() {
        \u0275\u0275restoreView(_r1);
        const fileInput_r18 = \u0275\u0275reference(13);
        return \u0275\u0275resetView(fileInput_r18.click());
      });
      \u0275\u0275elementStart(6, "span", 6);
      \u0275\u0275text(7, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 7);
      \u0275\u0275text(9, "Click to Select Files");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 8);
      \u0275\u0275text(11, "Images, PDFs, CAD up to 100MB");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 9, 0);
      \u0275\u0275listener("change", function ProjectDetail_Template_input_change_12_listener($event) {
        return ctx.onFilesSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, ProjectDetail_Conditional_14_Template, 3, 0, "div", 10);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.project ? 0 : 1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showRFIComposer ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDrawingUpload)("showCloseButton", true)("showFooter", true)("primaryLabel", "Upload " + (ctx.selectedFiles.length > 0 ? "(" + ctx.selectedFiles.length + ")" : ""))("primaryDisabled", ctx.selectedFiles.length === 0);
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.selectedFiles.length > 0 ? 14 : -1);
    }
  }, dependencies: [NgClass, RouterLink, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, TaskManagement, CommonDialogComponent, ProjectTimeline, ProjectBudget, ProjectFiles, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectDetail, [{
    type: Component,
    args: [{ selector: "app-project-detail", standalone: false, template: `@if (project) {\r
<!-- Project Header Section -->\r
<section class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">\r
  <div class="space-y-4 max-w-2xl">\r
    <nav class="flex items-center gap-2 text-xs text-outline uppercase tracking-widest font-medium">\r
      <a routerLink="/dashboard" class="hover:text-primary transition-colors cursor-pointer">Projects</a>\r
      <span class="material-symbols-outlined text-[10px]">chevron_right</span>\r
      <span class="text-primary">{{ project.type }}</span>\r
    </nav>\r
    <div class="space-y-2">\r
      <div class="flex items-center gap-4">\r
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">{{ project.name }}</h1>\r
      </div>\r
      <p class="text-on-surface-variant text-lg max-w-xl font-light">{{ project.description }}</p>\r
    </div>\r
  </div>\r
\r
  <div class="flex items-center gap-6">\r
    <div\r
      class="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm self-start">\r
      <span class="material-symbols-outlined text-slate-400 text-sm">filter_alt</span>\r
      <select [(ngModel)]="selectedMember"\r
        class="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-on-surface outline-none cursor-pointer appearance-none pr-4">\r
        <option value="">All Team</option>\r
        @for (m of teamMembers; track $index) {\r
        <option [value]="m.name">{{ m.name }}</option>\r
        }\r
      </select>\r
    </div>\r
    <!-- Team Avatars -->\r
    <div class="flex -space-x-3">\r
      @for (member of project.team; track member.name) {\r
      <div class="w-12 h-12 rounded-full ring-4 ring-background overflow-hidden" [title]="member.role">\r
        <img [src]="serverUrl + member.avatar" [alt]="member.name">\r
      </div>\r
      }\r
    </div>\r
    <button [routerLink]="['/master/projects/edit-project', project.id]"\r
      class="cursor-pointer bg-surface-container-high text-on-surface px-6 py-3 rounded-xl font-semibold border border-outline-variant/30 hover:bg-surface-container-highest transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">\r
      <span class="material-symbols-outlined">edit</span>\r
      Edit\r
    </button>\r
    <!-- <button (click)="showAddUpdateModal = true"\r
      class="cursor-pointer bg-linear-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">\r
      <span class="material-symbols-outlined">add</span>\r
      New Update\r
    </button> -->\r
  </div>\r
</section>\r
\r
<!-- Navigation Tabs -->\r
<div class="flex items-center gap-8 border-none mb-10 overflow-x-auto pb-2 scrollbar-hide">\r
  @for (tab of tabs; track tab) {\r
  <button (click)="setActiveTab(tab)"\r
    [class]="activeTab === tab ? 'text-primary border-b-2 border-primary font-bold' : 'text-outline hover:text-on-surface font-semibold'"\r
    class="text-lg font-semibold transition-colors pb-2 whitespace-nowrap cursor-pointer">\r
    {{ tab }}\r
  </button>\r
  }\r
</div>\r
\r
<!-- Bento Grid Content -->\r
@if (activeTab === 'Overview') {\r
<div class="grid grid-cols-12 gap-6">\r
  <!-- Progress & Stats (Large Card) -->\r
  <div\r
    class="col-span-12 lg:col-span-12 bg-surface-container-lowest rounded-xl p-8 shadow-[0_12_32px_rgba(15,23,42,0.06)] relative overflow-hidden group border border-outline-variant/10">\r
    <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">\r
      <span class="material-symbols-outlined text-[150px]">analytics</span>\r
    </div>\r
    <div class="relative z-10 flex flex-col h-full">\r
      <div class="flex justify-between items-start mb-6">\r
        <div class="flex justify-between items-center w-full">\r
          <div>\r
            <h3 class="text-xl font-black tracking-tight mb-0.5 text-slate-900 dark:text-slate-50">Milestone\r
              Synchronization</h3>\r
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Real-time Phase Integration Status\r
            </p>\r
          </div>\r
          <button (click)="openAddMilestoneModal()"\r
            class="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-blue-700 transition-all flex items-center gap-2">\r
            <span class="material-symbols-outlined text-sm">add</span>\r
            Add Milestone\r
          </button>\r
        </div>\r
        <div class="text-right">\r
          <span class="text-3xl font-black text-blue-600 tracking-tighter">{{ project.progress }}%</span>\r
          <p class="text-[8px] uppercase tracking-[0.2em] font-black text-slate-400">Net Completion</p>\r
        </div>\r
      </div>\r
\r
      <div class="mt-auto space-y-6">\r
        <div class="mt-auto w-full overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">\r
          <table class="w-full text-left border-collapse">\r
            <thead>\r
              <tr\r
                class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase tracking-widest text-slate-400 font-black">\r
                <th class="p-4 rounded-tl-xl whitespace-nowrap">Milestone Name</th>\r
                <th class="p-4 whitespace-nowrap">Dates</th>\r
                <th class="p-4 whitespace-nowrap">Progress</th>\r
                <th class="p-4 rounded-tr-xl whitespace-nowrap text-right">Actions</th>\r
              </tr>\r
            </thead>\r
            <tbody class="bg-white dark:bg-transparent">\r
              @for (ms of project.milestones; track ms.id) {\r
              <tr\r
                class="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">\r
                <td class="p-4">\r
                  <div class="flex items-center gap-3">\r
                    <div [ngClass]="{\r
                      'bg-blue-600': ms.color === 'blue-600',\r
                      'bg-indigo-600': ms.color === 'indigo-600',\r
                      'bg-emerald-600': ms.color === 'emerald-600',\r
                      'bg-amber-600': ms.color === 'amber-600',\r
                      'bg-rose-600': ms.color === 'rose-600',\r
                      'bg-purple-600': ms.color === 'purple-600',\r
                      'bg-cyan-600': ms.color === 'cyan-600'\r
                    }" class="w-1.5 h-8 rounded-full shadow-sm"></div>\r
                    <div class="cursor-pointer group/msname" (click)="openEditMilestoneModal(ms)">\r
                      <h4\r
                        class="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">\r
                        {{ ms.name }}\r
                        <span\r
                          class="material-symbols-outlined text-[12px] opacity-0 group-hover/msname:opacity-100 transition-all text-blue-600">edit</span>\r
                      </h4>\r
                      <span class="text-[9px] font-bold text-slate-400 mt-0.5 block">\r
                        {{ ms.subMilestones?.length || 0 }} Sub-milestones\r
                      </span>\r
                    </div>\r
                  </div>\r
                </td>\r
                <td class="p-4 align-middle">\r
                  <div\r
                    class="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-tight bg-slate-50 dark:bg-slate-800/50 px-2 py-1.5 rounded-lg w-max">\r
                    <span class="material-symbols-outlined text-[12px]">calendar_today</span>\r
                    {{ ms.startDate | date:'MMM d' }} \u2014 {{ ms.endDate | date:'MMM d' }}\r
                  </div>\r
                </td>\r
                <td class="p-4 align-middle w-48">\r
                  <div class="flex flex-col gap-1.5">\r
                    <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">\r
                      <span [ngClass]="{\r
                        'text-blue-600': ms.color === 'blue-600',\r
                        'text-indigo-600': ms.color === 'indigo-600',\r
                        'text-emerald-600': ms.color === 'emerald-600',\r
                        'text-amber-600': ms.color === 'amber-600',\r
                        'text-rose-600': ms.color === 'rose-600',\r
                        'text-purple-600': ms.color === 'purple-600',\r
                        'text-cyan-600': ms.color === 'cyan-600'\r
                      }">{{ ms.progress }}%</span>\r
                      <span class="text-slate-400">Completed</span>\r
                    </div>\r
                    <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">\r
                      <div [style.width]="ms.progress + '%'" [ngClass]="{\r
                        'bg-blue-600': ms.color === 'blue-600',\r
                        'bg-indigo-600': ms.color === 'indigo-600',\r
                        'bg-emerald-600': ms.color === 'emerald-600',\r
                        'bg-amber-600': ms.color === 'amber-600',\r
                        'bg-rose-600': ms.color === 'rose-600',\r
                        'bg-purple-600': ms.color === 'purple-600',\r
                        'bg-cyan-600': ms.color === 'cyan-600'\r
                      }" class="h-full rounded-full transition-all duration-1000"></div>\r
                    </div>\r
                  </div>\r
                </td>\r
                <td class="p-4 align-middle text-right">\r
                  <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">\r
                    <!-- <button (click)="openLinkSubProjectModal(ms)" title="Link Ops"\r
                      class="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center">\r
                      <span class="material-symbols-outlined text-[14px]">add_link</span>\r
                    </button> -->\r
                    <button (click)="openAddSubMilestoneModal(ms.id)" title="Add Sub-Milestone"\r
                      class="w-8 h-8 cursor-pointer rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center justify-center">\r
                      <span class="material-symbols-outlined text-[14px]">add_task</span>\r
                    </button>\r
                  </div>\r
                </td>\r
              </tr>\r
              @if (ms.subMilestones?.length) {\r
              <tr>\r
                <td colspan="4" class="p-0 border-b border-slate-100 dark:border-slate-800/80">\r
                  <div class="bg-slate-50/50 dark:bg-slate-800/10 py-3 px-6 pr-4">\r
                    <div class="pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-2">\r
                      @for (sm of ms.subMilestones; track sm.id) {\r
                      <div (click)="openEditSubMilestoneModal(ms.id, sm)"\r
                        class="flex items-center justify-between group/sm cursor-pointer hover:bg-white dark:hover:bg-slate-800 p-2 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-md">\r
                        <div class="flex items-center gap-3">\r
                          <div\r
                            class="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">\r
                            <span\r
                              class="material-symbols-outlined text-sm text-indigo-500">subdirectory_arrow_right</span>\r
                          </div>\r
                          <div>\r
                            <p\r
                              class="text-[11px] font-black text-slate-700 dark:text-slate-300 group-hover/sm:text-indigo-600 transition-colors uppercase tracking-tight">\r
                              {{ sm.name }}\r
                            </p>\r
                            <p\r
                              class="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5 flex items-center gap-1">\r
                              <span class="w-1.5 h-1.5 rounded-full" [class.bg-emerald-500]="sm.status === 'Completed'"\r
                                [class.bg-amber-500]="sm.status === 'In Progress'"\r
                                [class.bg-slate-300]="sm.status !== 'Completed' && sm.status !== 'In Progress'"></span>\r
                              {{ sm.status || 'Pending' }}\r
                              @if(sm.startDate){<span class="opacity-50 mx-1">\u2022</span> <span>{{ sm.startDate | date:'MMMd' }}</span>}\r
                            </p>\r
                          </div>\r
                        </div>\r
\r
                        <div class="p-4 align-middle">\r
                          <div\r
                            class="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-tight bg-slate-50 dark:bg-slate-800/50 px-2 py-1.5 rounded-lg w-max">\r
                            <span class="material-symbols-outlined text-[12px]">calendar_today</span>\r
                            {{ sm.startDate | date:'MMMd' }} \u2014 {{ sm.endDate | date:'MMMd' }}\r
                          </div>\r
                        </div>\r
                        <div class="flex items-center gap-4">\r
                          <div class="flex flex-col items-end w-24">\r
                            <div class="w-full flex justify-between items-end mb-1">\r
                              <span\r
                                class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Progress</span>\r
                              <span class="text-[9px] font-black text-slate-700 dark:text-slate-300">{{ sm.progress\r
                                }}%</span>\r
                            </div>\r
                            <div class="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">\r
                              <div [style.width]="sm.progress + '%'"\r
                                class="h-full bg-indigo-500 rounded-full transition-all">\r
                              </div>\r
                            </div>\r
                          </div>\r
                          <button\r
                            class="opacity-0 cursor-pointer group-hover/sm:opacity-100 material-symbols-outlined text-[14px] text-slate-400 hover:text-indigo-600 transition-all p-1">edit</button>\r
                        </div>\r
                      </div>\r
                      }\r
                    </div>\r
                  </div>\r
                </td>\r
              </tr>\r
              }\r
              }\r
              @if (!project.milestones || project.milestones.length === 0) {\r
              <tr>\r
                <td colspan="4" class="p-8 text-center text-slate-400 font-medium text-xs">No milestones created yet.\r
                </td>\r
              </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
\r
        <div\r
          class="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">\r
          <div class="flex flex-wrap items-center gap-6">\r
            <div class="flex flex-col">\r
              <span class="text-[8px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Est. Completion</span>\r
              <span class="text-slate-900 dark:text-slate-50 text-[11px] font-black uppercase">{{\r
                project.estimatedCompletion | date:'MMM dd, yyyy' }}</span>\r
            </div>\r
            <div class="w-px h-6 bg-slate-100 dark:bg-slate-800"></div>\r
            <div class="flex flex-col">\r
              <span class="text-[8px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Capital\r
                Utilization</span>\r
              <span class="text-slate-900 dark:text-slate-50 text-[11px] font-black uppercase">\u20B9{{\r
                ((project.budget?.used\r
                || 0) / 1000000).toFixed(1) }}M / \u20B9{{ ((project.budget?.total || 0) / 1000000).toFixed(1) }}M</span>\r
            </div>\r
          </div>\r
\r
          <button\r
            class="text-blue-600 font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 hover:underline">\r
            FULL AUDIT <span class="material-symbols-outlined text-sm">arrow_forward</span>\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
} @else if (activeTab === 'Tasks') {\r
<app-task-management [projectId]="project.id" [team_members]="project.team_members || []"\r
  [milestones]="project.milestones || []"></app-task-management>\r
} @else if (activeTab === 'Timeline') {\r
<app-project-timeline [projectId]="project.id" [selectedMember]="selectedMember"></app-project-timeline>\r
} @else if (activeTab === 'Budget') {\r
<app-project-budget></app-project-budget>\r
<!-- } @else if (activeTab === 'Gallery') {\r
<app-site-gallery (uploadMedia)="openDrawingUpload()" [projectId]="project.id"\r
  [documents]="project.documents || []"></app-site-gallery> -->\r
} @else if (activeTab === 'Files') {\r
<app-project-files [documents]="project.documents || []" (uploadMedia)="openDrawingUpload()"></app-project-files>\r
} @else if (activeTab === 'Updates') {\r
<!-- Full Audit Trail -->\r
<div class="max-w-4xl mx-auto space-y-6">\r
  <!-- Header -->\r
  <div class="flex items-center justify-between">\r
    <div>\r
      <h3 class="text-2xl font-bold tracking-tight">Project Audit Trail</h3>\r
      <p class="text-sm text-on-surface-variant mt-1">Complete history from project creation to present day.</p>\r
    </div>\r
    <span class="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">{{ filteredAudit.length }}\r
      entries</span>\r
  </div>\r
\r
  <!-- Filter Pills -->\r
  <div class="flex flex-wrap gap-2 pb-4 border-b border-outline-variant/20">\r
    @for (opt of auditFilterOptions; track opt) {\r
    <button (click)="auditFilter = opt" class="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"\r
      [ngClass]="auditFilter === opt ? 'bg-primary text-white shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'">\r
      {{ opt }}\r
    </button>\r
    }\r
  </div>\r
\r
  <!-- Timeline -->\r
  <div class="relative">\r
    <!-- Vertical Line -->\r
    <div\r
      class="absolute left-5 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/30 via-outline-variant/30 to-transparent">\r
    </div>\r
\r
    <div class="space-y-1">\r
      @for (entry of filteredAudit; track entry.id) {\r
      <div class="relative flex gap-4 pl-14 pb-6 group">\r
        <!-- Icon bubble -->\r
        <div\r
          class="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-2 border-white dark:border-slate-900 z-10"\r
          [ngClass]="entry.color">\r
          <span class="material-symbols-outlined text-[18px]">{{ entry.icon }}</span>\r
        </div>\r
\r
        <!-- Card -->\r
        <div\r
          class="flex-1 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-0.5">\r
          <div class="flex items-start justify-between gap-4 mb-2">\r
            <div class="flex items-center gap-2 flex-wrap">\r
              <span class="font-bold text-sm text-on-surface">{{ entry.action }}</span>\r
              <span class="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"\r
                [ngClass]="entry.color">{{ entry.type }}</span>\r
            </div>\r
            <span class="text-[10px] font-bold text-outline uppercase tracking-widest shrink-0">{{ entry.time }}</span>\r
          </div>\r
          <p class="text-sm text-on-surface-variant leading-relaxed mb-3">{{ entry.detail }}</p>\r
          <div class="flex items-center gap-2">\r
            <div class="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center">\r
              <span class="material-symbols-outlined text-[12px] text-outline">person</span>\r
            </div>\r
            <span class="text-xs font-bold text-outline">{{ entry.user }}</span>\r
          </div>\r
        </div>\r
      </div>\r
      }\r
\r
      @if (filteredAudit.length === 0) {\r
      <div class="pl-14 py-10 text-center text-on-surface-variant font-bold">\r
        No audit entries for "{{ auditFilter }}" type.\r
      </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
} @else {\r
<div\r
  class="flex items-center justify-center h-64 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/50">\r
  <div class="text-center">\r
    <span class="material-symbols-outlined text-4xl text-outline mb-2">construction</span>\r
    <h3 class="text-on-surface font-bold text-lg">Module Under Construction</h3>\r
    <p class="text-outline text-sm mt-1">The {{ activeTab }} module is being assembled.</p>\r
  </div>\r
</div>\r
}\r
\r
@if (showAddUpdateModal) {\r
<!-- <app-add-site-note (close)="showAddUpdateModal = false"></app-add-site-note> -->\r
}\r
} @else {\r
<!-- Loading State -->\r
<div class="flex justify-center flex-col items-center h-96">\r
  <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>\r
  <p class="mt-4 text-on-surface-variant font-bold tracking-widest text-sm uppercase">Loading Blueprint...</p>\r
</div>\r
}\r
\r
<!-- RFI Composer Mock Window (Bottom Right) -->\r
@if (showRFIComposer) {\r
<div\r
  class="fixed bottom-4 right-4 z-100 w-[450px] bg-white dark:bg-slate-900 rounded-t-2xl rounded-b-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">\r
  <div class="bg-slate-900 dark:bg-slate-950 text-white px-4 py-3 flex justify-between items-center">\r
    <h4 class="text-sm font-bold tracking-widest uppercase flex items-center gap-2">\r
      <span class="material-symbols-outlined text-[16px]">mail</span> Request Form Info\r
    </h4>\r
    <button (click)="showRFIComposer = false" class="text-slate-400 hover:text-white cursor-pointer">\r
      <span class="material-symbols-outlined text-[18px]">close</span>\r
    </button>\r
  </div>\r
  <div class="p-4 space-y-3 bg-slate-50 dark:bg-slate-800/20">\r
    <div class="flex items-center border-b border-slate-200 dark:border-slate-800 pb-2">\r
      <span class="text-xs font-bold text-slate-400 w-12">To:</span>\r
      <input type="text" [(ngModel)]="rfiForm.to"\r
        class="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-50">\r
    </div>\r
    <div class="flex items-center border-b border-slate-200 dark:border-slate-800 pb-2">\r
      <span class="text-xs font-bold text-slate-400 w-12">Cc:</span>\r
      <input type="text" [(ngModel)]="rfiForm.cc"\r
        class="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-50">\r
    </div>\r
    <div class="flex items-center border-b border-slate-200 dark:border-slate-800 pb-2">\r
      <span class="text-xs font-bold text-slate-400 w-12">Bcc:</span>\r
      <input type="text" [(ngModel)]="rfiForm.bcc"\r
        class="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-50">\r
    </div>\r
    <div class="flex items-center border-b border-slate-200 dark:border-slate-800 pb-2">\r
      <span class="text-xs font-bold text-slate-400 w-12">Subject:</span>\r
      <input type="text" [(ngModel)]="rfiForm.subject" placeholder="RFI Project Inquiry"\r
        class="flex-1 bg-transparent border-none outline-none font-bold text-sm text-slate-900 dark:text-slate-50">\r
    </div>\r
  </div>\r
  <div class="flex-1 p-4 bg-white dark:bg-slate-900">\r
    <textarea [(ngModel)]="rfiForm.content" placeholder="Type your request here..."\r
      class="w-full h-32 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-300 resize-none"></textarea>\r
  </div>\r
  <div\r
    class="p-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">\r
    <button class="text-slate-400 hover:text-blue-500 cursor-pointer">\r
      <span class="material-symbols-outlined text-[20px]">attach_file</span>\r
    </button>\r
    <button (click)="sendRFI()" [disabled]="!rfiForm.to || !rfiForm.subject"\r
      class="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-2">\r
      <span class="material-symbols-outlined text-[16px]">send</span> Send\r
    </button>\r
  </div>\r
</div>\r
}\r
\r
<!-- Submit Drawing Upload Modal (Center) -->\r
<app-common-dialog\r
  [open]="showDrawingUpload"\r
  title="Submit Project Drawing"\r
  subtitle="Upload CAD, PDF, or image files. They will be added to the project gallery."\r
  icon="cloud_upload"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Cancel"\r
  [primaryLabel]="'Upload ' + (selectedFiles.length > 0 ? '(' + selectedFiles.length + ')' : '')"\r
  [primaryDisabled]="selectedFiles.length === 0"\r
  (closed)="showDrawingUpload = false"\r
  (primary)="submitDrawing()"\r
>\r
  <div class="p-8">\r
\r
    <div (click)="fileInput.click()"\r
      class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors mb-6">\r
      <span class="material-symbols-outlined text-[32px] text-blue-500 mb-2">cloud_upload</span>\r
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Click to Select Files</p>\r
      <p class="text-[10px] text-slate-400 mt-1">Images, PDFs, CAD up to 100MB</p>\r
      <input type="file" #fileInput (change)="onFilesSelected($event)" multiple class="hidden"\r
        accept="image/*,.pdf,.dwg,.dxf,.zip">\r
    </div>\r
\r
    @if (selectedFiles.length > 0) {\r
    <div class="mb-6 max-h-32 overflow-y-auto space-y-2 no-scrollbar">\r
      @for (file of selectedFiles; track file.name) {\r
      <div\r
        class="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">\r
        <div class="flex items-center gap-2 overflow-hidden">\r
          <span class="material-symbols-outlined text-sm text-slate-400">description</span>\r
          <span class="text-[10px] font-bold text-slate-600 truncate">{{ file.name }}</span>\r
        </div>\r
        <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">{{ (file.size / 1024).toFixed(0)\r
          }}KB</span>\r
      </div>\r
      }\r
    </div>\r
    }\r
\r
  </div>\r
</app-common-dialog>\r
` }]
  }], () => [{ type: ActivatedRoute }, { type: ProjectService }, { type: ToastrService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectDetail, { className: "ProjectDetail", filePath: "app/modules/projects/project-detail/project-detail.ts", lineNumber: 17 });
})();

// src/app/modules/projects/projects-routing-module.ts
var routes = [
  { path: "", component: Projects },
  { path: "new-project", component: NewProjectWizard },
  { path: "edit-project/:id", component: NewProjectWizard },
  { path: ":id", component: ProjectDetail }
];
var ProjectsRoutingModule = class _ProjectsRoutingModule {
  static \u0275fac = function ProjectsRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectsRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ProjectsRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectsRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/projects/widgets/site-gallery/site-gallery.ts
var _forTrack06 = ($index, $item) => $item.url;
var _forTrack14 = ($index, $item) => $item.id;
function SiteGallery_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "img", 14)(2, "div", 15);
    \u0275\u0275elementStart(3, "div", 16)(4, "span", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h4", 18);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 19);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 20)(11, "button", 21)(12, "span", 22);
    \u0275\u0275text(13, "zoom_in");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 21)(15, "span", 22);
    \u0275\u0275text(16, "download");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const photo_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", photo_r1.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(photo_r1.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(photo_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(photo_r1.date);
  }
}
function SiteGallery_Conditional_19_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 25)(1, "div", 26)(2, "span", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 28)(5, "p", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 30);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const file_r2 = ctx.$implicit;
    \u0275\u0275property("href", file_r2.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((file_r2.mimetype == null ? null : file_r2.mimetype.includes("pdf")) ? "picture_as_pdf" : "description");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(file_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r2.date);
  }
}
function SiteGallery_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h4", 23);
    \u0275\u0275text(2, "Submitted Drawings & Files");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24);
    \u0275\u0275repeaterCreate(4, SiteGallery_Conditional_19_For_5_Template, 9, 4, "a", 25, _forTrack14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.files);
  }
}
var SiteGallery = class _SiteGallery {
  projectId = "";
  documents = [];
  uploadMedia = new EventEmitter();
  photos = [];
  files = [];
  apiUrl = environment.serverUrl;
  constructor() {
  }
  ngOnInit() {
    this.processDocuments();
  }
  ngOnChanges(changes) {
    if (changes["documents"]) {
      this.processDocuments();
    }
  }
  processDocuments() {
    if (!this.documents) {
      this.photos = [];
      this.files = [];
      return;
    }
    this.photos = this.documents.filter((doc) => doc.mimetype?.startsWith("image/")).map((doc) => ({
      url: doc.url.startsWith("http") ? doc.url : `${this.apiUrl}${doc.url}`,
      title: doc.name,
      date: new Date(doc.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      category: this.getCategory(doc.name)
    }));
    this.files = this.documents.filter((doc) => !doc.mimetype?.startsWith("image/")).map((doc) => ({
      id: doc.id,
      name: doc.name,
      url: doc.url.startsWith("http") ? doc.url : `${this.apiUrl}${doc.url}`,
      date: new Date(doc.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      mimetype: doc.mimetype
    }));
  }
  getCategory(filename) {
    const name = filename.toLowerCase();
    if (name.includes("site") || name.includes("view"))
      return "Site Overview";
    if (name.includes("found") || name.includes("pour"))
      return "Foundation";
    if (name.includes("steel") || name.includes("frame"))
      return "Structural";
    if (name.includes("finish") || name.includes("paint"))
      return "Finishing";
    return "General";
  }
  static \u0275fac = function SiteGallery_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SiteGallery)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SiteGallery, selectors: [["app-site-gallery"]], inputs: { projectId: "projectId", documents: "documents" }, outputs: { uploadMedia: "uploadMedia" }, standalone: false, features: [\u0275\u0275NgOnChangesFeature], decls: 20, vars: 1, consts: [[1, "space-y-8", "animate-in"], [1, "flex", "justify-between", "items-center"], [1, "text-2xl", "font-black", "tracking-tighter", "text-slate-900", "dark:text-slate-50"], [1, "flex", "gap-3"], [1, "p-3", "bg-white", "dark:bg-slate-900", "border", "border-slate-100", "dark:border-slate-800", "rounded-xl", "text-slate-400", "hover:text-blue-600", "transition-all", "shadow-sm"], [1, "material-symbols-outlined"], [1, "bg-blue-600", "text-white", "px-6", "py-2.5", "rounded-xl", "font-black", "text-[10px]", "uppercase", "tracking-widest", "shadow-lg", "shadow-blue-500/20", "hover:scale-105", "transition-all", "cursor-pointer", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "group", "relative", "aspect-square", "bg-slate-100", "dark:bg-slate-800", "rounded-3xl", "overflow-hidden", "border", "border-white/20", "shadow-xl"], [1, "aspect-square", "rounded-3xl", "border-2", "border-dashed", "border-slate-200", "dark:border-slate-800", "flex", "flex-col", "items-center", "justify-center", "gap-4", "text-slate-400", "hover:text-blue-600", "group", "hover:border-blue-500/50", "hover:bg-blue-50/50", "dark:hover:bg-blue-900/10", "transition-all"], [1, "w-16", "h-16", "rounded-2xl", "bg-slate-50", "dark:bg-slate-900", "flex", "items-center", "justify-center", "shadow-inner", "group-hover:scale-110", "transition-transform"], [1, "material-symbols-outlined", "text-3xl"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest"], [1, "mt-12"], [1, "w-full", "h-full", "object-cover", "group-hover:scale-110", "transition-transform", "duration-1000", 3, "src"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-900/90", "via-slate-900/20", "to-transparent", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-500"], [1, "absolute", "bottom-0", "left-0", "right-0", "p-6", "translate-y-4", "group-hover:translate-y-0", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-500"], [1, "bg-blue-600", "text-white", "text-[8px]", "font-black", "uppercase", "tracking-widest", "px-2", "py-1", "rounded", "mb-2", "inline-block"], [1, "text-white", "font-black", "tracking-tight"], [1, "text-white/60", "text-[10px]", "font-bold", "uppercase", "tracking-widest", "mt-1"], [1, "absolute", "top-4", "right-4", "flex", "gap-2", "translate-y-[-10px]", "group-hover:translate-y-0", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "w-8", "h-8", "rounded-lg", "bg-white/20", "backdrop-blur-md", "text-white", "flex", "items-center", "justify-center", "hover:bg-white/40", "transition-all"], [1, "material-symbols-outlined", "text-[18px]"], [1, "text-xs", "font-black", "uppercase", "tracking-[0.15em]", "text-slate-400", "mb-6"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-4"], ["target", "_blank", 1, "flex", "items-center", "gap-4", "p-4", "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "shadow-sm", "hover:border-blue-500/50", "hover:bg-blue-50/50", "dark:hover:bg-blue-900/10", "transition-all", "cursor-pointer", "group", "no-underline", 3, "href"], [1, "w-12", "h-12", "bg-blue-100", "dark:bg-blue-900/30", "text-blue-600", "dark:text-blue-400", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-[24px]"], [1, "flex-1", "overflow-hidden"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-slate-50", "truncate"], [1, "text-[10px]", "text-slate-500", "font-bold", "uppercase", "tracking-widest", "mt-0.5"]], template: function SiteGallery_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Site Visual Intelligence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3)(5, "button", 4)(6, "span", 5);
      \u0275\u0275text(7, "filter_list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 6);
      \u0275\u0275listener("click", function SiteGallery_Template_button_click_8_listener() {
        return ctx.uploadMedia.emit();
      });
      \u0275\u0275text(9, " Upload Media ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275repeaterCreate(11, SiteGallery_For_12_Template, 17, 4, "div", 8, _forTrack06);
      \u0275\u0275elementStart(13, "button", 9)(14, "div", 10)(15, "span", 11);
      \u0275\u0275text(16, "add_a_photo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "span", 12);
      \u0275\u0275text(18, "Add New Capture");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(19, SiteGallery_Conditional_19_Template, 6, 0, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.photos);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.files.length > 0 ? 19 : -1);
    }
  }, styles: ["\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out forwards;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.scrollbar-hide[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.scrollbar-hide[_ngcontent-%COMP%] {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n/*# sourceMappingURL=site-gallery.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SiteGallery, [{
    type: Component,
    args: [{ selector: "app-site-gallery", standalone: false, template: `<div class="space-y-8 animate-in">\r
    <div class="flex justify-between items-center">\r
        <h3 class="text-2xl font-black tracking-tighter text-slate-900 dark:text-slate-50">Site Visual Intelligence</h3>\r
        <div class="flex gap-3">\r
            <button\r
                class="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">\r
                <span class="material-symbols-outlined">filter_list</span>\r
            </button>\r
            <button (click)="uploadMedia.emit()"\r
                class="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all cursor-pointer">\r
                Upload Media\r
            </button>\r
        </div>\r
    </div>\r
\r
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\r
        @for (photo of photos; track photo.url) {\r
        <div\r
            class="group relative aspect-square bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden border border-white/20 shadow-xl">\r
            <img [src]="photo.url"\r
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />\r
            <div\r
                class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">\r
            </div>\r
\r
            <div\r
                class="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">\r
                <span\r
                    class="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded mb-2 inline-block">{{\r
                    photo.category }}</span>\r
                <h4 class="text-white font-black tracking-tight">{{ photo.title }}</h4>\r
                <p class="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">{{ photo.date }}</p>\r
            </div>\r
\r
            <div\r
                class="absolute top-4 right-4 flex gap-2 translate-y-[-10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
                <button\r
                    class="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all">\r
                    <span class="material-symbols-outlined text-[18px]">zoom_in</span>\r
                </button>\r
                <button\r
                    class="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all">\r
                    <span class="material-symbols-outlined text-[18px]">download</span>\r
                </button>\r
            </div>\r
        </div>\r
        }\r
\r
        <!-- Add Button Card -->\r
        <button\r
            class="aspect-square rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-blue-600 group hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all">\r
            <div\r
                class="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">\r
                <span class="material-symbols-outlined text-3xl">add_a_photo</span>\r
            </div>\r
            <span class="text-[10px] font-black uppercase tracking-widest">Add New Capture</span>\r
        </button>\r
    </div>\r
\r
    @if (files.length > 0) {\r
    <div class="mt-12">\r
        <h4 class="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-6">Submitted Drawings & Files</h4>\r
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\r
            @for (file of files; track file.id) {\r
            <a [href]="file.url" target="_blank"\r
                class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer group no-underline">\r
                <div\r
                    class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">\r
                    <span class="material-symbols-outlined text-[24px]">{{ file.mimetype?.includes('pdf') ? 'picture_as_pdf' : 'description' }}</span>\r
                </div>\r
                <div class="flex-1 overflow-hidden">\r
                    <p class="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">{{ file.name }}</p>\r
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{{ file.date }}</p>\r
                </div>\r
            </a>\r
            }\r
        </div>\r
    </div>\r
    }\r
</div>`, styles: ["/* src/app/modules/projects/widgets/site-gallery/site-gallery.scss */\n.animate-in {\n  animation: fadeIn 0.5s ease-out forwards;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.scrollbar-hide::-webkit-scrollbar {\n  display: none;\n}\n.scrollbar-hide {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n/*# sourceMappingURL=site-gallery.css.map */\n"] }]
  }], () => [], { projectId: [{
    type: Input
  }], documents: [{
    type: Input
  }], uploadMedia: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SiteGallery, { className: "SiteGallery", filePath: "app/modules/projects/widgets/site-gallery/site-gallery.ts", lineNumber: 11 });
})();

// src/app/modules/projects/dialogs/task-form-dialog/task-form-dialog.ts
var TaskFormDialog = class _TaskFormDialog {
  static \u0275fac = function TaskFormDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaskFormDialog)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskFormDialog, selectors: [["app-task-form-dialog"]], standalone: false, decls: 2, vars: 0, template: function TaskFormDialog_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "task-form-dialog works!");
      \u0275\u0275elementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaskFormDialog, [{
    type: Component,
    args: [{ selector: "app-task-form-dialog", standalone: false, template: "<p>task-form-dialog works!</p>\r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskFormDialog, { className: "TaskFormDialog", filePath: "app/modules/projects/dialogs/task-form-dialog/task-form-dialog.ts", lineNumber: 9 });
})();

// src/app/modules/projects/projects-module.ts
var ProjectsModule = class _ProjectsModule {
  static \u0275fac = function ProjectsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ProjectsModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MaterialModule,
    TaskManagement,
    StockApprovalModule,
    CommonDialogComponent
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectsModule, [{
    type: NgModule,
    args: [{
      declarations: [
        Projects,
        ProjectDetail,
        NewProjectWizard,
        ProjectTimeline,
        ProjectBudget,
        SiteGallery,
        ProjectFiles,
        MilestoneFormDialog,
        TaskFormDialog
      ],
      imports: [
        CommonModule,
        ProjectsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        MaterialModule,
        TaskManagement,
        StockApprovalModule,
        CommonDialogComponent
      ]
    }]
  }], null, null);
})();
export {
  ProjectsModule
};
//# sourceMappingURL=chunk-FHM6IDWT.js.map
