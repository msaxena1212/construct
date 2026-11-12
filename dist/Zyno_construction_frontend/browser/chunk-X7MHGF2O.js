import {
  ProjectService
} from "./chunk-52DGP4Y7.js";
import "./chunk-2M3NZLNK.js";
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
  CommonModule,
  Component,
  DatePipe,
  HostListener,
  HttpClient,
  HttpParams,
  Injectable,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  Router,
  RouterModule,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction4,
  ɵɵpureFunction5,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-23RKHPSU.js";

// src/app/modules/calendar/meeting-services.ts
var MeetingServices = class _MeetingServices {
  http;
  apiUrl = environment.serverUrl + "/api/v1/meetings";
  constructor(http) {
    this.http = http;
  }
  getMeetings(filters) {
    let params = new HttpParams();
    if (filters?.project_id)
      params = params.set("project_id", filters.project_id);
    if (filters?.vendor_id)
      params = params.set("vendor_id", filters.vendor_id);
    if (filters?.date)
      params = params.set("date", filters.date);
    return this.http.get(this.apiUrl, { params });
  }
  createMeeting(data) {
    return this.http.post(this.apiUrl, data);
  }
  updateMeeting(id, data) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteMeeting(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static \u0275fac = function MeetingServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MeetingServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MeetingServices, factory: _MeetingServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MeetingServices, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/calendar/calendar.ts
var _c0 = (a0, a1) => ({ "cursor-pointer hover:bg-slate-50": a0, "cursor-default opacity-60": a1 });
var _c1 = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var _c2 = (a0) => ({ "grid-template-columns": a0 });
var _c3 = (a0, a1, a2, a3) => ({ "bg-emerald-600": a0, "bg-red-500": a1, "bg-blue-600": a2, "bg-amber-500": a3 });
var _c4 = (a0, a1, a2, a3, a4) => ({ "bg-emerald-600": a0, "bg-red-500": a1, "bg-blue-600": a2, "bg-amber-500": a3, "bg-violet-600": a4 });
var _c5 = (a0, a1, a2, a3, a4) => ({ "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800": a0, "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800": a1, "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800": a2, "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800": a3, "bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800": a4 });
var _c6 = () => [];
function Calendar_div_16_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Calendar_div_16_div_9_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Calendar_div_16_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("click", function Calendar_div_16_div_9_Template_div_click_0_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleProjectFilter(+p_r4.id));
    });
    \u0275\u0275elementStart(1, "span", 41);
    \u0275\u0275template(2, Calendar_div_16_div_9_span_2_Template, 2, 0, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 51)(4, "p", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 53);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-orange-500", ctx_r1.isProjectFilterSelected(+p_r4.id))("border-orange-500", ctx_r1.isProjectFilterSelected(+p_r4.id))("border-slate-300", !ctx_r1.isProjectFilterSelected(+p_r4.id))("dark:border-slate-600", !ctx_r1.isProjectFilterSelected(+p_r4.id))("bg-white", !ctx_r1.isProjectFilterSelected(+p_r4.id))("dark:bg-slate-900", !ctx_r1.isProjectFilterSelected(+p_r4.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isProjectFilterSelected(+p_r4.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.type || "");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusBadge(p_r4.status || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r4.status || "", " ");
  }
}
function Calendar_div_16_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function Calendar_div_16_button_13_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.selectAllProjects();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1, " Clear ");
    \u0275\u0275elementEnd();
  }
}
function Calendar_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275listener("click", function Calendar_div_16_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 39)(2, "div", 40);
    \u0275\u0275listener("click", function Calendar_div_16_Template_div_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleAllProjects());
    });
    \u0275\u0275elementStart(3, "span", 41);
    \u0275\u0275template(4, Calendar_div_16_span_4_Template, 2, 0, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 43);
    \u0275\u0275text(6, "All Projects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 44);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, Calendar_div_16_div_9_Template, 10, 18, "div", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 46)(11, "span", 47);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, Calendar_div_16_button_13_Template, 2, 0, "button", 48);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-orange-50", ctx_r1.isAllProjectsSelected)("dark:bg-orange-900/20", ctx_r1.isAllProjectsSelected)("hover:bg-slate-50", !ctx_r1.isAllProjectsSelected)("dark:hover:bg-slate-700", !ctx_r1.isAllProjectsSelected);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-orange-500", ctx_r1.isAllProjectsSelected)("border-orange-500", ctx_r1.isAllProjectsSelected)("border-slate-300", !ctx_r1.isAllProjectsSelected)("dark:border-slate-600", !ctx_r1.isAllProjectsSelected)("bg-white", !ctx_r1.isAllProjectsSelected)("dark:bg-slate-900", !ctx_r1.isAllProjectsSelected);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAllProjectsSelected);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.projects.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.projects);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isAllProjectsSelected ? "Showing all" : ctx_r1.selectedProjectIds.length + " selected", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedProjectIds.length > 0);
  }
}
function Calendar_span_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, ctx_r1.selectedDate, "dd MMM yyyy"));
  }
}
function Calendar_span_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(2, 2, ctx_r1.weekStart, "dd MMM"), " - ", \u0275\u0275pipeBind2(3, 5, ctx_r1.weekEnd, "dd MMM yyyy"));
  }
}
function Calendar_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.months[ctx_r1.currentMonth], " ", ctx_r1.currentYear);
  }
}
function Calendar_div_66_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r6, " ");
  }
}
function Calendar_div_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, Calendar_div_66_div_1_Template, 2, 1, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c1));
  }
}
function Calendar_ng_container_67_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "div", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 71);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const day_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pureFunction0(10, _c1)[ctx_r1.getDayOfWeek(day_r7.fullDate)], " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-orange-500", day_r7.today)("text-white", day_r7.today)("text-slate-700", !day_r7.today)("dark:text-slate-200", !day_r7.today);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", day_r7.date, " ");
  }
}
function Calendar_ng_container_67_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "span", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const hour_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatHour(hour_r8), " ");
  }
}
function Calendar_ng_container_67_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275element(1, "div", 75)(2, "div", 76);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("top", ctx_r1.getCurrentTimeTop(), "px");
  }
}
function Calendar_ng_container_67_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 80);
  }
}
function Calendar_ng_container_67_div_10_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275listener("click", function Calendar_ng_container_67_div_10_ng_container_2_div_1_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const event_r10 = \u0275\u0275nextContext().$implicit;
      const day_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDayEventsForEvent(event_r10, day_r11, $event));
    });
    \u0275\u0275elementStart(1, "div", 84);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("top", ctx_r1.getEventTop(event_r10.meeting == null ? null : event_r10.meeting.time), "px")("height", ctx_r1.getEventHeight(event_r10.meeting == null ? null : event_r10.meeting.duration) + 20, "px");
    \u0275\u0275property("ngClass", "bg-violet-600 text-white");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r10.meeting == null ? null : event_r10.meeting.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r10.meeting == null ? null : event_r10.meeting.time);
  }
}
function Calendar_ng_container_67_div_10_ng_container_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275listener("click", function Calendar_ng_container_67_div_10_ng_container_2_div_2_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const event_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.openProjectDetails(event_r10.project, event_r10.milestone, event_r10.type !== "project-end");
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "div", 87);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r10 = \u0275\u0275nextContext().$implicit;
    const day_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("top", ctx_r1.getAllDayEventTop(event_r10, day_r11), "px");
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(4, _c3, event_r10.type === "project-start", event_r10.type === "project-end", event_r10.type === "milestone-start", event_r10.type === "milestone-end"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r10.project == null ? null : event_r10.project.name);
  }
}
function Calendar_ng_container_67_div_10_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Calendar_ng_container_67_div_10_ng_container_2_div_1_Template, 5, 7, "div", 81)(2, Calendar_ng_container_67_div_10_ng_container_2_div_2_Template, 3, 9, "div", 82);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r10.type === "meeting" && (event_r10.meeting == null ? null : event_r10.meeting.time));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r10.type !== "meeting");
  }
}
function Calendar_ng_container_67_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275template(1, Calendar_ng_container_67_div_10_div_1_Template, 1, 0, "div", 78)(2, Calendar_ng_container_67_div_10_ng_container_2_Template, 3, 2, "ng-container", 79);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.hours);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", day_r11.events);
  }
}
function Calendar_ng_container_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 59);
    \u0275\u0275element(2, "div", 60);
    \u0275\u0275elementStart(3, "div", 61);
    \u0275\u0275template(4, Calendar_ng_container_67_div_4_Template, 5, 11, "div", 62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 63)(6, "div", 64);
    \u0275\u0275template(7, Calendar_ng_container_67_div_7_Template, 3, 1, "div", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 66);
    \u0275\u0275template(9, Calendar_ng_container_67_div_9_Template, 3, 2, "div", 67)(10, Calendar_ng_container_67_div_10_Template, 3, 2, "div", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(6, _c2, ctx_r1.currentView === "Day" ? "1fr" : "repeat(7, 1fr)"));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.calendarDays);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.hours);
    \u0275\u0275advance();
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction1(8, _c2, ctx_r1.currentView === "Day" ? "1fr" : "repeat(7, 1fr)"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.currentTimeVisible());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.calendarDays);
  }
}
function Calendar_ng_container_68_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r13, " ");
  }
}
function Calendar_ng_container_68_div_4_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 97);
    \u0275\u0275listener("click", function Calendar_ng_container_68_div_4_button_4_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const day_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.openAddMeeting(day_r15.fullDate);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "span", 98);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd()();
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "rocket_launch");
    \u0275\u0275elementContainerEnd();
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "flag");
    \u0275\u0275elementContainerEnd();
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "outlined_flag");
    \u0275\u0275elementContainerEnd();
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "flag_circle");
    \u0275\u0275elementContainerEnd();
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "video_call");
    \u0275\u0275elementContainerEnd();
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r18 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u23F0 ", event_r18.meeting == null ? null : event_r18.meeting.time);
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_12_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "Meeting");
    \u0275\u0275elementContainerEnd();
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_12_ng_container_1_Template, 2, 1, "ng-container", 34)(2, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_12_ng_container_2_Template, 2, 0, "ng-container", 34);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r18.meeting == null ? null : event_r18.meeting.time);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(event_r18.meeting == null ? null : event_r18.meeting.time));
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r18 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(event_r18.title);
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275listener("click", function Calendar_ng_container_68_div_4_ng_container_6_div_1_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r17);
      const event_r18 = \u0275\u0275nextContext().$implicit;
      const day_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      event_r18.type !== "meeting" ? ctx_r1.openProjectDetails(event_r18.project, event_r18.milestone, event_r18.type !== "project-end") : ctx_r1.openDayEvents(day_r15, $event);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "span", 101);
    \u0275\u0275elementContainerStart(2, 20);
    \u0275\u0275template(3, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_3_Template, 2, 0, "ng-container", 21)(4, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_4_Template, 2, 0, "ng-container", 21)(5, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_5_Template, 2, 0, "ng-container", 21)(6, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_6_Template, 2, 0, "ng-container", 21)(7, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_7_Template, 2, 0, "ng-container", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 102)(9, "div", 103);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 104);
    \u0275\u0275template(12, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_12_Template, 3, 2, "ng-container", 34)(13, Calendar_ng_container_68_div_4_ng_container_6_div_1_ng_container_13_Template, 2, 1, "ng-container", 34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const event_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(10, _c4, event_r18.type === "project-start", event_r18.type === "project-end", event_r18.type === "milestone-start", event_r18.type === "milestone-end", event_r18.type === "meeting"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngSwitch", event_r18.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "project-start");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "project-end");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "milestone-start");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "milestone-end");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "meeting");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", event_r18.type === "meeting" ? event_r18.meeting == null ? null : event_r18.meeting.title : event_r18.project == null ? null : event_r18.project.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", event_r18.type === "meeting");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r18.type !== "meeting");
  }
}
function Calendar_ng_container_68_div_4_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Calendar_ng_container_68_div_4_ng_container_6_div_1_Template, 14, 16, "div", 99);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const i_r19 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", i_r19 < 3);
  }
}
function Calendar_ng_container_68_div_4_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", day_r15.events.length - 3, " more ");
  }
}
function Calendar_ng_container_68_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275listener("click", function Calendar_ng_container_68_div_4_Template_div_click_0_listener($event) {
      const day_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDayEvents(day_r15, $event));
    });
    \u0275\u0275elementStart(1, "div", 92)(2, "span", 93);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, Calendar_ng_container_68_div_4_button_4_Template, 3, 0, "button", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 95);
    \u0275\u0275template(6, Calendar_ng_container_68_div_4_ng_container_6_Template, 2, 1, "ng-container", 79)(7, Calendar_ng_container_68_div_4_div_7_Template, 2, 1, "div", 96);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const day_r15 = ctx.$implicit;
    \u0275\u0275classProp("opacity-0", !day_r15.date)("pointer-events-none", !day_r15.date)("ring-2", day_r15.today)("ring-orange-400", day_r15.today)("ring-inset", day_r15.today)("cursor-pointer", day_r15.date && day_r15.events.length > 0)("cursor-default", day_r15.date && day_r15.events.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-orange-500", day_r15.today)("text-white", day_r15.today)("rounded-full", day_r15.today)("w-7", day_r15.today)("h-7", day_r15.today)("flex", day_r15.today)("items-center", day_r15.today)("justify-center", day_r15.today);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", day_r15.date, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", day_r15.date);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", day_r15.events);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", day_r15.events.length > 3);
  }
}
function Calendar_ng_container_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 56);
    \u0275\u0275template(2, Calendar_ng_container_68_div_2_Template, 2, 1, "div", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 56);
    \u0275\u0275template(4, Calendar_ng_container_68_div_4_Template, 8, 34, "div", 89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(3, _c1));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.calendarDays)("ngForTrackBy", ctx_r1.trackByDate);
  }
}
function Calendar_Conditional_69_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 137);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.type, " ");
  }
}
function Calendar_Conditional_69_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "span", 139);
    \u0275\u0275text(2, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 140);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.address);
  }
}
function Calendar_Conditional_69_div_72_img_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 145);
    \u0275\u0275listener("error", function Calendar_Conditional_69_div_72_img_1_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r21);
      const member_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onAvatarError(member_r22.avatar));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.getAvatarUrl(member_r22.avatar), \u0275\u0275sanitizeUrl);
  }
}
function Calendar_Conditional_69_div_72_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const member_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", member_r22.firstname ? member_r22.firstname.charAt(0) : "?", " ");
  }
}
function Calendar_Conditional_69_div_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 141);
    \u0275\u0275template(1, Calendar_Conditional_69_div_72_img_1_Template, 1, 1, "img", 142)(2, Calendar_Conditional_69_div_72_div_2_Template, 2, 1, "div", 143);
    \u0275\u0275elementStart(3, "span", 144);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const member_r22 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", member_r22.avatar && !ctx_r1.failedAvatars.has(member_r22.avatar));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !member_r22.avatar || ctx_r1.failedAvatars.has(member_r22.avatar));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", member_r22.firstname || "", " ", member_r22.lastname || "", " ");
  }
}
function Calendar_Conditional_69_div_73_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 152);
    \u0275\u0275text(1, " Filtered ");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_69_div_73_div_7_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 162);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ms_r23 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ms_r23.phase);
  }
}
function Calendar_Conditional_69_div_73_div_7_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ms_r23 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(2, 2, ms_r23.startDate, "dd MMM"), " \u2192 ", \u0275\u0275pipeBind2(3, 5, ms_r23.endDate, "dd MMM yyyy"), " ");
  }
}
function Calendar_Conditional_69_div_73_div_7_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementContainerEnd();
  }
}
function Calendar_Conditional_69_div_73_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "div", 154)(2, "div", 51)(3, "p", 155);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, Calendar_Conditional_69_div_73_div_7_p_5_Template, 2, 1, "p", 156);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 157);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 158)(9, "span", 159);
    \u0275\u0275text(10, "date_range");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, Calendar_Conditional_69_div_73_div_7_ng_container_11_Template, 4, 8, "ng-container", 34)(12, Calendar_Conditional_69_div_73_div_7_ng_container_12_Template, 2, 0, "ng-container", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 160)(14, "div", 132);
    \u0275\u0275element(15, "div", 161);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ms_r23 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ms_r23.name || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ms_r23.phase && ms_r23.phase !== "null");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusBadge(ms_r23.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ms_r23.status || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ms_r23.startDate && ms_r23.endDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ms_r23.startDate || !ms_r23.endDate);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ms_r23.progress || 0, "%");
  }
}
function Calendar_Conditional_69_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 147)(2, "h3", 148);
    \u0275\u0275text(3, " Milestones ");
    \u0275\u0275elementStart(4, "span", 149);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, Calendar_Conditional_69_div_73_span_6_Template, 2, 0, "span", 150);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, Calendar_Conditional_69_div_73_div_7_Template, 16, 9, "div", 151);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("(", ctx_r1.selectedMilestone ? 1 : (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.milestones == null ? null : ctx_r1.selectedProject.milestones.length) || 0, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedMilestone);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.displayedMilestones);
  }
}
function Calendar_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275listener("click", function Calendar_Conditional_69_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeProjectDetails());
    });
    \u0275\u0275elementStart(1, "div", 107);
    \u0275\u0275listener("click", function Calendar_Conditional_69_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 108)(3, "div")(4, "p", 109);
    \u0275\u0275text(5, "Project Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 110);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 111)(9, "button", 112);
    \u0275\u0275listener("click", function Calendar_Conditional_69_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToProject(ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.id));
    });
    \u0275\u0275elementStart(10, "span", 113);
    \u0275\u0275text(11, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Open Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 114);
    \u0275\u0275listener("click", function Calendar_Conditional_69_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeProjectDetails());
    });
    \u0275\u0275elementStart(14, "span", 8);
    \u0275\u0275text(15, "close");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 115)(17, "div", 116)(18, "span", 117);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, Calendar_Conditional_69_span_20_Template, 2, 1, "span", 118);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 119)(22, "div", 120)(23, "p", 121)(24, "span", 113);
    \u0275\u0275text(25, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " Start ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "p", 122);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 120)(31, "p", 121)(32, "span", 113);
    \u0275\u0275text(33, "event_available");
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " Completion ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 122);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 120)(39, "p", 121)(40, "span", 113);
    \u0275\u0275text(41, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " Budget ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p", 122);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 120)(46, "p", 121)(47, "span", 113);
    \u0275\u0275text(48, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275text(49, " Used ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "p", 122);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(52, Calendar_Conditional_69_div_52_Template, 5, 1, "div", 123);
    \u0275\u0275elementStart(53, "div")(54, "div", 124)(55, "span", 125);
    \u0275\u0275text(56, "Overall Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span", 126);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 127);
    \u0275\u0275element(60, "div", 128);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 129)(62, "span", 130);
    \u0275\u0275text(63, "Budget Used");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "span", 131);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 132);
    \u0275\u0275element(67, "div", 133);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div")(69, "h3", 134);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "div", 116);
    \u0275\u0275template(72, Calendar_Conditional_69_div_72_Template, 5, 4, "div", 135);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(73, Calendar_Conditional_69_div_73_Template, 8, 3, "div", 34);
    \u0275\u0275elementStart(74, "button", 136);
    \u0275\u0275listener("click", function Calendar_Conditional_69_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAddMeetingForProject(ctx_r1.selectedProject));
    });
    \u0275\u0275elementStart(75, "span", 8);
    \u0275\u0275text(76, "video_call");
    \u0275\u0275elementEnd();
    \u0275\u0275text(77, " Schedule a Meeting for this Project ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.name);
    \u0275\u0275advance(11);
    \u0275\u0275classMap(ctx_r1.getStatusBadge((ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.status) || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.status) || "\u2014", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedProject.type && (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.type) !== "null" && (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.type) !== "undefined");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedProject.createdAt ? \u0275\u0275pipeBind2(29, 21, ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.createdAt, "dd MMM yyyy") : "\u2014", " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedProject.completion_date ? \u0275\u0275pipeBind2(37, 24, ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.completion_date, "dd MMM yyyy") : "\u2014", " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.budget_total));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.budget_used));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedProject.address && (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.address) !== "null");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.project_progress) || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getProgressColor((ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.project_progress) || 0));
    \u0275\u0275styleProp("width", (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.project_progress) || 0, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.getTotalBudgetPercent(ctx_r1.selectedProject), "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.getTotalBudgetPercent(ctx_r1.selectedProject), "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Team Members (", (ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.team_members == null ? null : ctx_r1.selectedProject.team_members.length) || 0, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.selectedProject == null ? null : ctx_r1.selectedProject.team_members);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showMilestonesInPanel);
  }
}
function Calendar_Conditional_70_div_12_ng_container_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(event_r26.project == null ? null : event_r26.project.type);
  }
}
function Calendar_Conditional_70_div_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 173)(2, "div", 51)(3, "div", 174);
    \u0275\u0275element(4, "div", 175);
    \u0275\u0275elementStart(5, "span", 176);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 122);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 177);
    \u0275\u0275template(10, Calendar_Conditional_70_div_12_ng_container_1_span_10_Template, 2, 1, "span", 34);
    \u0275\u0275elementStart(11, "span", 178);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 179);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "button", 180);
    \u0275\u0275listener("click", function Calendar_Conditional_70_div_12_ng_container_1_Template_button_click_15_listener($event) {
      \u0275\u0275restoreView(_r25);
      const event_r26 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.navigateToProjectDetails(event_r26.project, event_r26.milestone);
      ctx_r1.closeDayEventsPanel();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(16, "span", 159);
    \u0275\u0275text(17, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Open ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(8, _c3, event_r26.type === "project-start", event_r26.type === "project-end", event_r26.type === "milestone-start", event_r26.type === "milestone-end"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r26.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((event_r26.project == null ? null : event_r26.project.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", event_r26.project.type);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusBadge((event_r26.project == null ? null : event_r26.project.status) || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (event_r26.project == null ? null : event_r26.project.status) || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (event_r26.project == null ? null : event_r26.project.project_progress) || 0, "%");
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", event_r26.meeting == null ? null : event_r26.meeting.time);
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 189);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", event_r26.meeting == null ? null : event_r26.meeting.duration, " min) ");
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 162);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F4C1} ", event_r26.meeting == null ? null : event_r26.meeting.project == null ? null : event_r26.meeting.project.name, " ");
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 162);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F3E2} ", event_r26.meeting == null ? null : event_r26.meeting.vendor == null ? null : event_r26.meeting.vendor.name, " ");
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 190);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", event_r26.meeting == null ? null : event_r26.meeting.description, " ");
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_ng_container_15_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 193);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r28 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", a_r28, " ");
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 191);
    \u0275\u0275template(2, Calendar_Conditional_70_div_12_ng_container_2_ng_container_15_span_2_Template, 2, 1, "span", 192);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", event_r26.meeting.attendees);
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 194);
    \u0275\u0275listener("click", function Calendar_Conditional_70_div_12_ng_container_2_button_17_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r29);
      const event_r26 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openMeetLink(event_r26.meeting.meet_link, $event));
    });
    \u0275\u0275elementStart(1, "span", 159);
    \u0275\u0275text(2, "video_call");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Join ");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_70_div_12_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 173)(2, "div", 51)(3, "div", 174)(4, "span", 181);
    \u0275\u0275text(5, "video_call");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 182);
    \u0275\u0275text(7, " Meeting");
    \u0275\u0275template(8, Calendar_Conditional_70_div_12_ng_container_2_ng_container_8_Template, 2, 1, "ng-container", 34)(9, Calendar_Conditional_70_div_12_ng_container_2_span_9_Template, 2, 1, "span", 183);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 122);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, Calendar_Conditional_70_div_12_ng_container_2_p_12_Template, 2, 1, "p", 156)(13, Calendar_Conditional_70_div_12_ng_container_2_p_13_Template, 2, 1, "p", 156)(14, Calendar_Conditional_70_div_12_ng_container_2_p_14_Template, 2, 1, "p", 184)(15, Calendar_Conditional_70_div_12_ng_container_2_ng_container_15_Template, 3, 1, "ng-container", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 185);
    \u0275\u0275template(17, Calendar_Conditional_70_div_12_ng_container_2_button_17_Template, 4, 0, "button", 186);
    \u0275\u0275elementStart(18, "button", 187);
    \u0275\u0275listener("click", function Calendar_Conditional_70_div_12_ng_container_2_Template_button_click_18_listener($event) {
      \u0275\u0275restoreView(_r27);
      const event_r26 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditMeeting(event_r26.meeting, $event));
    });
    \u0275\u0275elementStart(19, "span", 159);
    \u0275\u0275text(20, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 188);
    \u0275\u0275listener("click", function Calendar_Conditional_70_div_12_ng_container_2_Template_button_click_22_listener($event) {
      \u0275\u0275restoreView(_r27);
      const event_r26 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteMeeting(event_r26.meeting, $event));
    });
    \u0275\u0275elementStart(23, "span", 159);
    \u0275\u0275text(24, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " Delete ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const event_r26 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", event_r26.meeting.time);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r26.meeting.duration && event_r26.meeting.duration > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((event_r26.meeting == null ? null : event_r26.meeting.title) || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r26.meeting.project == null ? null : event_r26.meeting.project.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r26.meeting.vendor == null ? null : event_r26.meeting.vendor.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r26.meeting.description && event_r26.meeting.description.trim() !== "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (event_r26.meeting == null ? null : event_r26.meeting.attendees) && event_r26.meeting.attendees.length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (event_r26.meeting == null ? null : event_r26.meeting.meet_link) && event_r26.meeting.meet_link.trim() !== "");
  }
}
function Calendar_Conditional_70_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 172);
    \u0275\u0275template(1, Calendar_Conditional_70_div_12_ng_container_1_Template, 19, 13, "ng-container", 34)(2, Calendar_Conditional_70_div_12_ng_container_2_Template, 26, 8, "ng-container", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r26 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(3, _c5, event_r26.type === "project-start", event_r26.type === "project-end", event_r26.type === "milestone-start", event_r26.type === "milestone-end", event_r26.type === "meeting"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r26.type !== "meeting");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", event_r26.type === "meeting");
  }
}
function Calendar_Conditional_70_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 195);
    \u0275\u0275text(1, " No events for this day. ");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 163);
    \u0275\u0275listener("click", function Calendar_Conditional_70_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDayEventsPanel());
    });
    \u0275\u0275elementStart(1, "div", 164);
    \u0275\u0275listener("click", function Calendar_Conditional_70_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 165)(3, "div")(4, "p", 166);
    \u0275\u0275text(5, "All Events");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 167);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 168);
    \u0275\u0275listener("click", function Calendar_Conditional_70_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDayEventsPanel());
    });
    \u0275\u0275elementStart(9, "span", 8);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 169);
    \u0275\u0275template(12, Calendar_Conditional_70_div_12_Template, 3, 9, "div", 170)(13, Calendar_Conditional_70_div_13_Template, 2, 0, "div", 171);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedDayLabel);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.selectedDayEvents);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.selectedDayEvents.length);
  }
}
function Calendar_Conditional_71_div_36_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 241);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_36_div_2_Template_div_click_0_listener() {
      const h_r32 = \u0275\u0275restoreView(_r31).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectHour(h_r32));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r32 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r1.getSelectedHour() === h_r32 ? "bg-violet-600 text-white" : "text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", h_r32, " ");
  }
}
function Calendar_Conditional_71_div_36_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 241);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_36_div_4_Template_div_click_0_listener() {
      const m_r34 = \u0275\u0275restoreView(_r33).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectMinute(m_r34));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r34 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r1.getSelectedMinute() === m_r34 ? "bg-violet-600 text-white" : "text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r34, " ");
  }
}
function Calendar_Conditional_71_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 237);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_36_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 238);
    \u0275\u0275template(2, Calendar_Conditional_71_div_36_div_2_Template, 2, 2, "div", 239);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 240);
    \u0275\u0275template(4, Calendar_Conditional_71_div_36_div_4_Template, 2, 2, "div", 239);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.timeHours);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.timeMinutes);
  }
}
function Calendar_Conditional_71_div_47_div_1_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 247);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_71_div_47_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 244);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_47_div_1_Template_div_click_0_listener() {
      const opt_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectDuration(opt_r36.value));
    });
    \u0275\u0275elementStart(1, "span", 245);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, Calendar_Conditional_71_div_47_div_1_span_3_Template, 2, 0, "span", 246);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r36 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r36.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.meetingForm.duration === opt_r36.value);
  }
}
function Calendar_Conditional_71_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 242);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_47_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275template(1, Calendar_Conditional_71_div_47_div_1_Template, 4, 2, "div", 243);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.durationOptions);
  }
}
function Calendar_Conditional_71_ng_container_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 248)(2, "span", 249);
    \u0275\u0275text(3, "folder");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSelectedProjectName(), " ");
  }
}
function Calendar_Conditional_71_ng_template_53_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 254);
    \u0275\u0275listener("click", function Calendar_Conditional_71_ng_template_53_div_5_div_1_Template_div_click_0_listener() {
      const p_r39 = \u0275\u0275restoreView(_r38).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectProject(p_r39));
    });
    \u0275\u0275elementStart(1, "p", 245);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r39 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r39.name);
  }
}
function Calendar_Conditional_71_ng_template_53_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 252);
    \u0275\u0275template(1, Calendar_Conditional_71_ng_template_53_div_5_div_1_Template, 3, 1, "div", 253);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.projects);
  }
}
function Calendar_Conditional_71_ng_template_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 213);
    \u0275\u0275listener("click", function Calendar_Conditional_71_ng_template_53_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showProjectDropdown = !ctx_r1.showProjectDropdown);
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 250);
    \u0275\u0275text(4, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, Calendar_Conditional_71_ng_template_53_div_5_Template, 2, 1, "div", 251);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("text-slate-400", !ctx_r1.meetingForm.project_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSelectedProjectName() || "Select Project", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showProjectDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showProjectDropdown);
  }
}
function Calendar_Conditional_71_div_58_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 257);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 258);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_58_span_1_Template_button_click_2_listener($event) {
      const vid_r41 = \u0275\u0275restoreView(_r40).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.removeVendor(vid_r41);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(3, "span", 159);
    \u0275\u0275text(4, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const vid_r41 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getVendorName(vid_r41), " ");
  }
}
function Calendar_Conditional_71_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 255);
    \u0275\u0275template(1, Calendar_Conditional_71_div_58_span_1_Template, 5, 1, "span", 256);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.meetingForm.selectedVendorIds);
  }
}
function Calendar_Conditional_71_div_65_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 265);
    \u0275\u0275text(1, "No vendors available ");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_71_div_65_div_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 271);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_71_div_65_div_3_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r44 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r44.email);
  }
}
function Calendar_Conditional_71_div_65_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 266);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_65_div_3_Template_div_click_0_listener($event) {
      const v_r44 = \u0275\u0275restoreView(_r43).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleVendor(v_r44.id, $event));
    });
    \u0275\u0275elementStart(1, "span", 267);
    \u0275\u0275template(2, Calendar_Conditional_71_div_65_div_3_span_2_Template, 2, 0, "span", 268);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 269)(4, "p", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, Calendar_Conditional_71_div_65_div_3_p_6_Template, 2, 1, "p", 270);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r44 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.isVendorSelected(v_r44.id) ? "bg-violet-600 border-violet-600" : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isVendorSelected(v_r44.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r44.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", v_r44.email);
  }
}
function Calendar_Conditional_71_div_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 259);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_65_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 260);
    \u0275\u0275template(2, Calendar_Conditional_71_div_65_div_2_Template, 2, 0, "div", 261)(3, Calendar_Conditional_71_div_65_div_3_Template, 7, 4, "div", 262);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 263)(5, "button", 264);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_65_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.showVendorDropdown = false;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(6, " OK ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.vendors.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.vendors);
  }
}
function Calendar_Conditional_71_div_75_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 282);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r46 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r46.email);
  }
}
function Calendar_Conditional_71_div_75_div_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 283);
    \u0275\u0275text(1, "Existing");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_71_div_75_div_1_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 284);
    \u0275\u0275text(1, "External");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_71_div_75_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 274)(1, "div", 275);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 276)(4, "span", 277);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, Calendar_Conditional_71_div_75_div_1_span_6_Template, 2, 1, "span", 278);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, Calendar_Conditional_71_div_75_div_1_span_7_Template, 2, 0, "span", 279)(8, Calendar_Conditional_71_div_75_div_1_span_8_Template, 2, 0, "span", 280);
    \u0275\u0275elementStart(9, "button", 281);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_75_div_1_Template_button_click_9_listener() {
      const a_r46 = \u0275\u0275restoreView(_r45).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeAttendee(a_r46.email));
    });
    \u0275\u0275elementStart(10, "span", 113);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r46 = ctx.$implicit;
    \u0275\u0275property("ngClass", a_r46.isExisting ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700" : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", a_r46.isExisting ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (a_r46.name || a_r46.email).charAt(0).toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r46.name || a_r46.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", a_r46.name && a_r46.name !== a_r46.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", a_r46.isExisting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !a_r46.isExisting);
  }
}
function Calendar_Conditional_71_div_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 272);
    \u0275\u0275template(1, Calendar_Conditional_71_div_75_div_1_Template, 12, 7, "div", 273);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.selectedAttendees);
  }
}
function Calendar_Conditional_71_div_81_div_1_img_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 293);
    \u0275\u0275listener("error", function Calendar_Conditional_71_div_81_div_1_img_2_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r49);
      const opt_r48 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onAvatarError(opt_r48.avatar));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r48 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r1.getAvatarUrl(opt_r48.avatar), \u0275\u0275sanitizeUrl);
  }
}
function Calendar_Conditional_71_div_81_div_1_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 294);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r48 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (opt_r48.name || opt_r48.email || "?").charAt(0).toUpperCase(), " ");
  }
}
function Calendar_Conditional_71_div_81_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 287);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_81_div_1_Template_div_click_0_listener($event) {
      const opt_r48 = \u0275\u0275restoreView(_r47).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectAttendee(opt_r48, $event));
    });
    \u0275\u0275elementStart(1, "div", 288);
    \u0275\u0275template(2, Calendar_Conditional_71_div_81_div_1_img_2_Template, 1, 1, "img", 289)(3, Calendar_Conditional_71_div_81_div_1_span_3_Template, 2, 1, "span", 290);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 51)(5, "p", 52);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 291);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 292);
    \u0275\u0275text(10, "Existing User");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const opt_r48 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", opt_r48.avatar && !ctx_r1.failedAvatars.has(opt_r48.avatar));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !opt_r48.avatar || ctx_r1.failedAvatars.has(opt_r48.avatar));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", opt_r48.name || opt_r48.email, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r48.email);
  }
}
function Calendar_Conditional_71_div_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 285);
    \u0275\u0275listener("click", function Calendar_Conditional_71_div_81_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275template(1, Calendar_Conditional_71_div_81_div_1_Template, 11, 4, "div", 286);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredAttendeeOptions);
  }
}
function Calendar_Conditional_71_span_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 295);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
  }
}
function Calendar_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 196);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMeetingModal());
    });
    \u0275\u0275elementStart(1, "div", 197);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 198)(3, "div", 15)(4, "div", 199)(5, "span", 200);
    \u0275\u0275text(6, "video_call");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "p", 201);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "h3", 110);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 202);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMeetingModal());
    });
    \u0275\u0275elementStart(13, "span", 8);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 203)(16, "div")(17, "label", 204);
    \u0275\u0275text(18, "Meeting Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 205);
    \u0275\u0275twoWayListener("ngModelChange", function Calendar_Conditional_71_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingForm.title, $event) || (ctx_r1.meetingForm.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 206)(21, "div")(22, "label", 204);
    \u0275\u0275text(23, "Date *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 207);
    \u0275\u0275twoWayListener("ngModelChange", function Calendar_Conditional_71_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingForm.dateInput, $event) || (ctx_r1.meetingForm.dateInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div")(26, "label", 204);
    \u0275\u0275text(27, "Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 6)(29, "button", 208);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_button_click_29_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleTimeDropdown($event));
    });
    \u0275\u0275elementStart(30, "span", 209);
    \u0275\u0275text(31, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 210);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 211);
    \u0275\u0275text(35, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(36, Calendar_Conditional_71_div_36_Template, 5, 2, "div", 212);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 206)(38, "div")(39, "label", 204);
    \u0275\u0275text(40, "Duration");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 6)(42, "button", 213);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_button_click_42_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.showDurationDropdown = !ctx_r1.showDurationDropdown;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(43, "span");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 211);
    \u0275\u0275text(46, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(47, Calendar_Conditional_71_div_47_Template, 2, 1, "div", 214);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div")(49, "label", 204);
    \u0275\u0275text(50, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 6);
    \u0275\u0275template(52, Calendar_Conditional_71_ng_container_52_Template, 5, 1, "ng-container", 215)(53, Calendar_Conditional_71_ng_template_53_Template, 6, 6, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "div")(56, "label", 204);
    \u0275\u0275text(57, "Vendors");
    \u0275\u0275elementEnd();
    \u0275\u0275template(58, Calendar_Conditional_71_div_58_Template, 2, 1, "div", 216);
    \u0275\u0275elementStart(59, "div", 6)(60, "button", 217);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_button_click_60_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleVendorDropdown($event));
    });
    \u0275\u0275elementStart(61, "span");
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "span", 218);
    \u0275\u0275text(64, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(65, Calendar_Conditional_71_div_65_Template, 7, 2, "div", 219);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div")(67, "label", 204);
    \u0275\u0275text(68, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "textarea", 220);
    \u0275\u0275twoWayListener("ngModelChange", function Calendar_Conditional_71_Template_textarea_ngModelChange_69_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingForm.description, $event) || (ctx_r1.meetingForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "div")(71, "label", 204);
    \u0275\u0275text(72, " Meeting Attendees ");
    \u0275\u0275elementStart(73, "span", 221);
    \u0275\u0275text(74, "\u2014 Email invitations will be sent automatically");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(75, Calendar_Conditional_71_div_75_Template, 2, 1, "div", 222);
    \u0275\u0275elementStart(76, "div", 6)(77, "div", 223)(78, "span", 224);
    \u0275\u0275text(79, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "input", 225);
    \u0275\u0275listener("input", function Calendar_Conditional_71_Template_input_input_80_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAttendeeSearch($event.target.value));
    })("keydown", function Calendar_Conditional_71_Template_input_keydown_80_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAttendeeKeydown($event));
    })("click", function Calendar_Conditional_71_Template_input_click_80_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(81, Calendar_Conditional_71_div_81_Template, 2, 1, "div", 226);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "p", 227);
    \u0275\u0275text(83, "\u{1F4E7} Each attendee will receive an email invitation with meeting details and join link");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "div", 228)(85, "p", 229)(86, "span", 230);
    \u0275\u0275text(87, "video_call");
    \u0275\u0275elementEnd();
    \u0275\u0275text(88, " Add Meeting Link ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "input", 231);
    \u0275\u0275twoWayListener("ngModelChange", function Calendar_Conditional_71_Template_input_ngModelChange_89_listener($event) {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.meetingForm.meet_link, $event) || (ctx_r1.meetingForm.meet_link = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "p", 232);
    \u0275\u0275text(91, "This link will be included in the email invitation");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 233)(93, "button", 234);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_button_click_93_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMeetingModal());
    });
    \u0275\u0275text(94, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "button", 235);
    \u0275\u0275listener("click", function Calendar_Conditional_71_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveMeeting());
    });
    \u0275\u0275template(96, Calendar_Conditional_71_span_96_Template, 2, 0, "span", 236);
    \u0275\u0275text(97);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const projectDropdown_r50 = \u0275\u0275reference(54);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingMeeting ? "Edit" : "New", " Meeting ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingMeeting ? "Update Meeting" : "Schedule Meeting", " ");
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingForm.title);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingForm.dateInput);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.formatTimeDisplay());
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showTimeDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showTimeDropdown);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.getDurationLabel());
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showDurationDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showDurationDropdown);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.prefilledProjectId)("ngIfElse", projectDropdown_r50);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", (ctx_r1.meetingForm.selectedVendorIds || \u0275\u0275pureFunction0(29, _c6)).length > 0);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-slate-400", !(ctx_r1.meetingForm.selectedVendorIds || \u0275\u0275pureFunction0(30, _c6)).length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.meetingForm.selectedVendorIds || \u0275\u0275pureFunction0(31, _c6)).length ? ctx_r1.getSelectedVendorNames() : "Select Vendors", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showVendorDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showVendorDropdown);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingForm.description);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.selectedAttendees.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.attendeeSearchText);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showAttendeeSuggestions);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.meetingForm.meet_link);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", !ctx_r1.meetingForm.title || !ctx_r1.meetingForm.dateInput || ctx_r1.isSavingMeeting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSavingMeeting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSavingMeeting ? "Saving..." : ctx_r1.editingMeeting ? "Update Meeting" : "Save Meeting", " ");
  }
}
var Calendar = class _Calendar {
  router;
  projectService;
  meetingService;
  serverUrl = environment.serverUrl;
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  selectedProjectIds = [];
  showProjectFilterDropdown = false;
  currentDate = /* @__PURE__ */ new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  hours = Array.from({ length: 24 }, (_, i) => i);
  projects = [];
  vendors = [];
  meetings = [];
  calendarDays = [];
  currentView = "Month";
  selectedProject = null;
  selectedMilestone = null;
  showProjectDetails = false;
  isNavigationChanged = false;
  prefilledProjectId = void 0;
  showMilestonesInPanel = true;
  selectedDate = /* @__PURE__ */ new Date();
  weekStart;
  weekEnd;
  showMeetingModal = false;
  isSavingMeeting = false;
  editingMeeting = null;
  meetingForm = this.blankForm();
  showDayEventsPanel = false;
  selectedDayEvents = [];
  selectedDayLabel = "";
  selectedDayFullDate = "";
  showProjectDropdown = false;
  showVendorDropdown = false;
  allAttendeeOptions = [];
  filteredAttendeeOptions = [];
  showAttendeeSuggestions = false;
  attendeeSearchText = "";
  selectedAttendees = [];
  // Duration custom dropdown state
  showDurationDropdown = false;
  durationOptions = [
    { value: 15, label: "15 min" },
    { value: 30, label: "30 min" },
    { value: 45, label: "45 min" },
    { value: 60, label: "1 hour" },
    { value: 90, label: "1.5 hours" },
    { value: 120, label: "2 hours" }
  ];
  showTimeDropdown = false;
  timeHours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  timeMinutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  constructor(router, projectService, meetingService) {
    this.router = router;
    this.projectService = projectService;
    this.meetingService = meetingService;
  }
  ngOnInit() {
    this.calculateWeekRange();
    this.loadVendors();
    this.loadMeetings();
    this.loadProjects();
    this.loadAttendeeOptions();
  }
  toLocalDateString(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  parseJsonArray(value) {
    if (Array.isArray(value))
      return value;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }
  failedAvatars = /* @__PURE__ */ new Set();
  onAvatarError(avatar) {
    this.failedAvatars.add(avatar);
  }
  getAvatarUrl(avatar) {
    if (!avatar)
      return "";
    if (avatar.startsWith("http"))
      return avatar;
    return this.serverUrl + avatar;
  }
  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
        if (!this.selectedProjectIds.length) {
          this.selectedProjectIds = this.projects.map((p) => Number(p.id));
        }
        this.generateCalendar();
      },
      error: (err) => console.error("loadProjects:", err)
    });
  }
  loadVendors() {
    this.projectService.getVendors().subscribe({
      next: (res) => {
        this.vendors = res.data || [];
        this.generateCalendar();
      },
      error: (err) => console.error("loadVendors:", err)
    });
  }
  loadMeetings() {
    this.meetingService.getMeetings().subscribe({
      next: (res) => {
        this.meetings = res.data || [];
        this.generateCalendar();
      },
      error: (err) => console.error("loadMeetings:", err)
    });
  }
  loadAttendeeOptions() {
    this.projectService.getTeamMembers().subscribe({
      next: (res) => {
        const users = res.data || [];
        const seen = /* @__PURE__ */ new Set();
        const options = [];
        users.forEach((member) => {
          const email = (member.email || "").trim();
          const key = email || `id-${member.id}`;
          if (!seen.has(key) && email) {
            seen.add(key);
            options.push({
              id: member.id,
              name: `${member.firstname || ""} ${member.lastname || ""}`.trim(),
              email,
              avatar: member.avatar || null,
              isExisting: true
            });
          }
        });
        this.allAttendeeOptions = options;
      },
      error: (err) => {
        console.error("getTeamMembers failed, falling back:", err);
        this.loadAttendeeOptionsFromProjects();
      }
    });
  }
  loadAttendeeOptionsFromProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        const seen = /* @__PURE__ */ new Set();
        const options = [];
        (res.data || []).forEach((project) => {
          (project.team_members || []).forEach((member) => {
            const key = member.email || `id-${member.id}`;
            if (!seen.has(key)) {
              seen.add(key);
              options.push({
                id: member.id,
                name: `${member.firstname || ""} ${member.lastname || ""}`.trim(),
                email: member.email || "",
                avatar: member.avatar,
                isExisting: true
              });
            }
          });
        });
        this.allAttendeeOptions = options;
      },
      error: (err) => console.error("loadAttendeeOptionsFromProjects:", err)
    });
  }
  getEventsForDate(fullDate) {
    const events = [];
    this.filteredProjects.forEach((project) => {
      const startDate = project.createdAt?.split("T")[0];
      const completionDate = project.completion_date?.split("T")[0];
      if (startDate === fullDate) {
        events.push({ title: "Project Started", type: "project-start", project });
      }
      if (completionDate === fullDate) {
        events.push({ title: "Project Completion", type: "project-end", project });
      }
      project.milestones?.forEach((ms) => {
        const msStart = ms.startDate?.split("T")[0];
        const msEnd = ms.endDate?.split("T")[0];
        if (msStart === fullDate) {
          events.push({ title: ms.name, type: "milestone-start", project, milestone: ms });
        }
        if (msEnd === fullDate) {
          events.push({ title: ms.name, type: "milestone-end", project, milestone: ms });
        }
      });
    });
    this.meetings.filter((m) => {
      if (m.date?.split("T")[0] !== fullDate)
        return false;
      return m.project_id ? this.selectedProjectIds.includes(Number(m.project_id)) : this.isAllProjectsSelected;
    }).forEach((meeting) => {
      const project = this.projects.find((p) => Number(p.id) === Number(meeting.project_id));
      const vendor = this.vendors.find((v) => Number(v.id) === Number(meeting.vendor_id));
      events.push({
        title: meeting.title,
        type: "meeting",
        meeting: __spreadProps(__spreadValues({}, meeting), { project, vendor })
      });
    });
    return events;
  }
  generateCalendar() {
    switch (this.currentView) {
      case "Day":
        this.generateDayView();
        break;
      case "Week":
        this.generateWeekView();
        break;
      default:
        this.generateMonthView();
        break;
    }
    this.refreshDayEventsPanel();
  }
  refreshDayEventsPanel() {
    if (this.showDayEventsPanel && this.selectedDayFullDate) {
      const refreshed = this.calendarDays.find((d) => d.fullDate === this.selectedDayFullDate);
      if (refreshed)
        this.selectedDayEvents = [...refreshed.events];
    }
  }
  formatHour(hour) {
    if (hour === 0)
      return "12 AM";
    if (hour < 12)
      return `${hour} AM`;
    if (hour === 12)
      return "12 PM";
    return `${hour - 12} PM`;
  }
  getDayOfWeek(fullDate) {
    if (!fullDate)
      return 0;
    return new Date(fullDate).getDay();
  }
  getEventTop(time) {
    if (!time)
      return 0;
    const [h, m] = time.split(":").map(Number);
    return (h * 60 + (m || 0)) * (64 / 60);
  }
  getEventHeight(duration) {
    return Math.max((duration || 30) * (64 / 60), 24);
  }
  getAllDayEventTop(event, day) {
    const nonMeetingEvents = day.events.filter((e) => e.type !== "meeting");
    const idx = nonMeetingEvents.indexOf(event);
    return idx * 32;
  }
  get filteredProjects() {
    return this.projects.filter((p) => this.selectedProjectIds.includes(Number(p.id)));
  }
  get isAllProjectsSelected() {
    return this.projects.length > 0 && this.selectedProjectIds.length === this.projects.length;
  }
  toggleAllProjects() {
    if (this.isAllProjectsSelected) {
      this.selectedProjectIds = [];
    } else {
      this.selectedProjectIds = this.projects.map((p) => Number(p.id));
    }
    this.generateCalendar();
  }
  selectAllProjects() {
    this.selectedProjectIds = this.projects.map((p) => Number(p.id));
    this.generateCalendar();
  }
  toggleProjectFilter(projectId) {
    const idx = this.selectedProjectIds.indexOf(projectId);
    if (idx === -1) {
      this.selectedProjectIds.push(projectId);
    } else {
      this.selectedProjectIds.splice(idx, 1);
    }
    this.generateCalendar();
  }
  isProjectFilterSelected(projectId) {
    return this.selectedProjectIds.includes(projectId);
  }
  currentTimeVisible() {
    return this.calendarDays.some((d) => d.today);
  }
  getCurrentTimeTop() {
    const now = /* @__PURE__ */ new Date();
    return (now.getHours() * 60 + now.getMinutes()) * (64 / 60);
  }
  openDayEventsForEvent(event, day, $event) {
    $event.stopPropagation();
    this.selectedDayEvents = [...day.events];
    this.selectedDayFullDate = day.fullDate;
    const [y, m, d] = day.fullDate.split("-").map(Number);
    this.selectedDayLabel = `${d} ${this.months[m - 1]} ${y}`;
    this.showDayEventsPanel = true;
  }
  generateDayView() {
    this.calendarDays = [];
    const d = this.selectedDate;
    const fullDate = this.toLocalDateString(d.getFullYear(), d.getMonth(), d.getDate());
    const todayStr = this.toLocalDateString(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
    this.calendarDays.push({
      date: d.getDate(),
      fullDate,
      today: fullDate === todayStr,
      events: this.getEventsForDate(fullDate)
    });
  }
  generateWeekView() {
    this.calendarDays = [];
    const todayStr = this.toLocalDateString(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
    for (let i = 0; i < 7; i++) {
      const current = new Date(this.weekStart);
      current.setDate(this.weekStart.getDate() + i);
      const fullDate = this.toLocalDateString(current.getFullYear(), current.getMonth(), current.getDate());
      this.calendarDays.push({
        date: current.getDate(),
        fullDate,
        today: fullDate === todayStr,
        events: this.getEventsForDate(fullDate)
      });
    }
  }
  generateMonthView() {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const todayStr = this.toLocalDateString(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.calendarDays.push({ date: "", fullDate: "", today: false, events: [] });
    }
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const fullDate = this.toLocalDateString(this.currentYear, this.currentMonth, day);
      this.calendarDays.push({
        date: day,
        fullDate,
        events: this.getEventsForDate(fullDate),
        today: fullDate === todayStr
      });
    }
  }
  previousMonth() {
    if (this.currentView === "Day") {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() - 1);
      this.generateCalendar();
    } else if (this.currentView === "Week") {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() - 7);
      this.calculateWeekRange();
      this.generateCalendar();
    } else {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.generateCalendar();
    }
    this.isNavigationChanged = !this.isTodaySelected();
  }
  nextMonth() {
    if (this.currentView === "Day") {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() + 1);
      this.generateCalendar();
    } else if (this.currentView === "Week") {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() + 7);
      this.calculateWeekRange();
      this.generateCalendar();
    } else {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.generateCalendar();
    }
    this.isNavigationChanged = !this.isTodaySelected();
  }
  goToToday() {
    this.selectedDate = /* @__PURE__ */ new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.calculateWeekRange();
    this.generateCalendar();
    this.isNavigationChanged = false;
  }
  changeView(view) {
    this.currentView = view;
    this.isNavigationChanged = !this.isTodaySelected();
    if (view === "Week")
      this.calculateWeekRange();
    this.generateCalendar();
  }
  isTodaySelected() {
    const todayStr = this.toLocalDateString(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
    if (this.currentView === "Day") {
      const selStr = this.toLocalDateString(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate());
      return selStr === todayStr;
    }
    if (this.currentView === "Week") {
      const today = new Date(this.currentDate);
      today.setHours(0, 0, 0, 0);
      return today >= this.weekStart && today <= this.weekEnd;
    }
    return this.currentMonth === this.currentDate.getMonth() && this.currentYear === this.currentDate.getFullYear();
  }
  calculateWeekRange() {
    const date = new Date(this.selectedDate);
    const day = date.getDay();
    this.weekStart = new Date(date);
    this.weekStart.setDate(date.getDate() - day);
    this.weekStart.setHours(0, 0, 0, 0);
    this.weekEnd = new Date(this.weekStart);
    this.weekEnd.setDate(this.weekStart.getDate() + 6);
    this.weekEnd.setHours(23, 59, 59, 999);
  }
  openProjectDetails(project, milestone, showMilestones = true) {
    if (!project)
      return;
    this.selectedProject = project;
    this.selectedMilestone = milestone || null;
    this.showMilestonesInPanel = showMilestones;
    this.showProjectDetails = true;
  }
  closeProjectDetails() {
    this.showProjectDetails = false;
    this.selectedProject = null;
    this.selectedMilestone = null;
    this.showMilestonesInPanel = true;
  }
  get displayedMilestones() {
    if (this.selectedMilestone) {
      return [this.selectedMilestone];
    }
    return this.selectedProject?.milestones || [];
  }
  navigateToProject(id) {
    if (!id)
      return;
    this.showProjectDetails = false;
    this.showDayEventsPanel = false;
    this.selectedProject = null;
    this.selectedMilestone = null;
    this.router.navigate(["master/projects", id]);
  }
  navigateToProjectDetails(project, milestone) {
    if (!project)
      return;
    this.selectedProject = project;
    this.selectedMilestone = milestone || null;
    this.showProjectDetails = true;
  }
  openDayEvents(day, $event) {
    $event.stopPropagation();
    if (!day.date || !day.events.length)
      return;
    this.selectedDayEvents = [...day.events];
    this.selectedDayFullDate = day.fullDate;
    const [y, m, d] = day.fullDate.split("-").map(Number);
    this.selectedDayLabel = `${d} ${this.months[m - 1]} ${y}`;
    this.showDayEventsPanel = true;
  }
  closeDayEventsPanel() {
    this.showDayEventsPanel = false;
  }
  blankForm() {
    return {
      title: "",
      description: "",
      attendees: [],
      duration: 30,
      project_id: void 0,
      vendor_id: void 0,
      vendor_ids: [],
      meet_link: "",
      dateInput: "",
      timeInput: "10:00",
      selectedVendorIds: []
    };
  }
  openAddMeeting(prefillDate) {
    this.editingMeeting = null;
    this.meetingForm = this.blankForm();
    this.selectedAttendees = [];
    this.attendeeSearchText = "";
    this.prefilledProjectId = void 0;
    this.showDurationDropdown = false;
    this.showTimeDropdown = false;
    if (prefillDate)
      this.meetingForm.dateInput = prefillDate;
    this.showMeetingModal = true;
  }
  openAddMeetingForProject(project) {
    if (!project?.id)
      return;
    this.editingMeeting = null;
    this.meetingForm = this.blankForm();
    this.selectedAttendees = [];
    this.attendeeSearchText = "";
    this.prefilledProjectId = Number(project.id);
    this.meetingForm.project_id = Number(project.id);
    this.showDurationDropdown = false;
    this.showTimeDropdown = false;
    this.showMeetingModal = true;
  }
  openEditMeeting(meeting, $event) {
    $event.stopPropagation();
    $event.preventDefault();
    const snap = __spreadValues({}, meeting);
    const rawAttendees = this.parseJsonArray(snap.attendees);
    const parsedAttendees = rawAttendees.map((entry) => {
      const match = entry.match(/^(.*?)\s*<(.+)>$/);
      if (match) {
        const email = match[2].trim();
        const found2 = this.allAttendeeOptions.find((x) => x.email.toLowerCase() === email.toLowerCase());
        return { id: found2?.id || 0, name: match[1].trim(), email, isExisting: !!found2 };
      }
      const found = this.allAttendeeOptions.find((x) => x.email.toLowerCase() === entry.toLowerCase());
      return { id: found?.id || 0, name: entry, email: entry, isExisting: !!found };
    });
    const vendorIds = [];
    if (snap.vendor_id)
      vendorIds.push(Number(snap.vendor_id));
    this.parseJsonArray(snap.vendor_ids).forEach((id) => {
      const n = Number(id);
      if (!isNaN(n) && !vendorIds.includes(n))
        vendorIds.push(n);
    });
    this.editingMeeting = snap;
    this.prefilledProjectId = void 0;
    this.meetingForm = {
      title: snap.title,
      description: snap.description || "",
      attendees: [...rawAttendees],
      duration: Number(snap.duration) || 30,
      project_id: snap.project_id ? Number(snap.project_id) : void 0,
      vendor_id: snap.vendor_id ? Number(snap.vendor_id) : void 0,
      vendor_ids: [...vendorIds],
      meet_link: snap.meet_link || "",
      dateInput: snap.date,
      timeInput: snap.time || "10:00",
      selectedVendorIds: [...vendorIds]
    };
    this.selectedAttendees = parsedAttendees;
    this.attendeeSearchText = "";
    this.showVendorDropdown = false;
    this.showDurationDropdown = false;
    this.showTimeDropdown = false;
    this.showDayEventsPanel = false;
    this.showMeetingModal = true;
  }
  closeMeetingModal() {
    this.showMeetingModal = false;
    this.editingMeeting = null;
    this.meetingForm = this.blankForm();
    this.selectedAttendees = [];
    this.attendeeSearchText = "";
    this.showVendorDropdown = false;
    this.showDurationDropdown = false;
    this.showTimeDropdown = false;
    this.prefilledProjectId = void 0;
  }
  selectProject(project) {
    this.meetingForm.project_id = project.id;
    this.showProjectDropdown = false;
  }
  getSelectedProjectName() {
    const project = this.projects.find((p) => Number(p.id) === Number(this.meetingForm.project_id));
    return project?.name || "";
  }
  toggleVendorDropdown($event) {
    $event.stopPropagation();
    this.showVendorDropdown = !this.showVendorDropdown;
  }
  isVendorSelected(vendorId) {
    return (this.meetingForm.selectedVendorIds || []).includes(vendorId);
  }
  toggleVendor(vendorId, $event) {
    $event.stopPropagation();
    $event.preventDefault();
    const ids = [...this.meetingForm.selectedVendorIds || []];
    const idx = ids.indexOf(vendorId);
    if (idx === -1) {
      ids.push(vendorId);
    } else {
      ids.splice(idx, 1);
    }
    this.meetingForm.selectedVendorIds = ids;
    this.meetingForm.vendor_id = ids[0] ?? void 0;
    this.meetingForm.vendor_ids = ids;
  }
  removeVendor(vendorId) {
    const ids = (this.meetingForm.selectedVendorIds || []).filter((id) => id !== vendorId);
    this.meetingForm.selectedVendorIds = ids;
    this.meetingForm.vendor_id = ids[0] ?? void 0;
    this.meetingForm.vendor_ids = ids;
  }
  getSelectedVendorNames() {
    const ids = this.meetingForm.selectedVendorIds || [];
    return this.vendors.filter((v) => ids.includes(v.id)).map((v) => v.name).join(", ");
  }
  getDurationLabel() {
    const found = this.durationOptions.find((o) => o.value === this.meetingForm.duration);
    return found ? found.label : "Select Duration";
  }
  selectDuration(value) {
    this.meetingForm.duration = value;
    this.showDurationDropdown = false;
  }
  toggleTimeDropdown($event) {
    $event.stopPropagation();
    this.showTimeDropdown = !this.showTimeDropdown;
  }
  getSelectedHour() {
    return (this.meetingForm.timeInput || "10:00").split(":")[0] || "10";
  }
  getSelectedMinute() {
    return (this.meetingForm.timeInput || "10:00").split(":")[1] || "00";
  }
  selectHour(h) {
    const mm = this.getSelectedMinute();
    this.meetingForm.timeInput = `${h}:${mm}`;
  }
  selectMinute(m) {
    const hh = this.getSelectedHour();
    this.meetingForm.timeInput = `${hh}:${m}`;
    this.showTimeDropdown = false;
  }
  formatTimeDisplay() {
    const t = this.meetingForm.timeInput || "10:00";
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
  }
  get selectedProjectsLabel() {
    if (this.isAllProjectsSelected)
      return "All Projects";
    if (this.selectedProjectIds.length === 0)
      return "No Projects";
    if (this.selectedProjectIds.length === 1) {
      const project = this.projects.find((p) => Number(p.id) === this.selectedProjectIds[0]);
      return project?.name || "1 Project";
    }
    return `${this.selectedProjectIds.length} Projects`;
  }
  onDocumentClick() {
    this.showVendorDropdown = false;
    this.showProjectDropdown = false;
    this.showAttendeeSuggestions = false;
    this.showProjectFilterDropdown = false;
    this.showDurationDropdown = false;
    this.showTimeDropdown = false;
  }
  onAttendeeSearch(value) {
    this.attendeeSearchText = value;
    const q = value.trim().toLowerCase();
    if (q.length < 3) {
      this.filteredAttendeeOptions = [];
      this.showAttendeeSuggestions = false;
      return;
    }
    const isEmailSearch = q.includes("@");
    this.filteredAttendeeOptions = this.allAttendeeOptions.filter((opt) => !this.selectedAttendees.some((a) => a.email === opt.email) && (isEmailSearch ? (opt.email || "").toLowerCase().includes(q) : (opt.name || "").toLowerCase().includes(q)));
    this.showAttendeeSuggestions = this.filteredAttendeeOptions.length > 0;
  }
  selectAttendee(opt, $event) {
    $event.stopPropagation();
    if (!this.selectedAttendees.some((a) => a.email === opt.email)) {
      this.selectedAttendees = [...this.selectedAttendees, __spreadProps(__spreadValues({}, opt), { isExisting: true })];
    }
    this.attendeeSearchText = "";
    this.showAttendeeSuggestions = false;
  }
  removeAttendee(email) {
    this.selectedAttendees = this.selectedAttendees.filter((a) => a.email !== email);
  }
  onAttendeeKeydown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const raw = this.attendeeSearchText.trim().replace(/,$/, "");
      if (!raw)
        return;
      const existing = this.allAttendeeOptions.find((x) => x.email.toLowerCase() === raw.toLowerCase() || x.name.toLowerCase() === raw.toLowerCase());
      if (existing) {
        if (!this.selectedAttendees.some((a) => a.email === existing.email))
          this.selectedAttendees = [...this.selectedAttendees, existing];
      } else {
        const isEmail = raw.includes("@");
        if (!this.selectedAttendees.some((a) => a.email === raw))
          this.selectedAttendees = [
            ...this.selectedAttendees,
            { id: 0, name: isEmail ? raw.split("@")[0] : raw, email: raw, isExisting: false }
          ];
      }
      this.attendeeSearchText = "";
      this.showAttendeeSuggestions = false;
    }
  }
  saveMeeting() {
    if (!this.meetingForm.title || !this.meetingForm.dateInput || this.isSavingMeeting)
      return;
    const attendeeStrings = this.selectedAttendees.map((a) => a.name && a.name !== a.email ? `${a.name} <${a.email}>` : a.email);
    const payload = {
      title: this.meetingForm.title,
      description: this.meetingForm.description,
      date: this.meetingForm.dateInput,
      time: this.meetingForm.timeInput || "10:00",
      duration: this.meetingForm.duration || 30,
      attendees: attendeeStrings,
      meet_link: this.meetingForm.meet_link,
      project_id: this.meetingForm.project_id ? Number(this.meetingForm.project_id) : void 0,
      vendor_id: this.meetingForm.vendor_id ? Number(this.meetingForm.vendor_id) : void 0,
      vendor_ids: this.meetingForm.selectedVendorIds
    };
    this.isSavingMeeting = true;
    if (this.editingMeeting?.id) {
      this.meetingService.updateMeeting(this.editingMeeting.id, payload).subscribe({
        next: () => {
          this.loadMeetings();
          this.closeMeetingModal();
          this.isSavingMeeting = false;
        },
        error: (err) => {
          console.error(err);
          this.isSavingMeeting = false;
        }
      });
    } else {
      this.meetingService.createMeeting(payload).subscribe({
        next: () => {
          this.loadMeetings();
          this.closeMeetingModal();
          this.isSavingMeeting = false;
        },
        error: (err) => {
          console.error(err);
          this.isSavingMeeting = false;
        }
      });
    }
  }
  deleteMeeting(meeting, $event) {
    $event.stopPropagation();
    if (!meeting.id)
      return;
    if (!confirm(`Delete "${meeting.title}"?`))
      return;
    this.meetingService.deleteMeeting(meeting.id).subscribe({
      next: () => {
        this.selectedDayEvents = this.selectedDayEvents.filter((e) => e.meeting?.id !== meeting.id);
        if (!this.selectedDayEvents.length)
          this.showDayEventsPanel = false;
        this.loadMeetings();
      },
      error: (err) => console.error(err)
    });
  }
  getVendorName(vendorId) {
    return this.vendors.find((v) => v.id === vendorId)?.name || "";
  }
  openMeetLink(url, $event) {
    $event.stopPropagation();
    if (url)
      window.open(url, "_blank");
  }
  getProgressColor(p) {
    return p >= 70 ? "bg-emerald-500" : p >= 30 ? "bg-amber-500" : "bg-red-500";
  }
  getStatusBadge(status) {
    const map = {
      "On Track": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      "At Risk": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      "Delayed": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      "Completed": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      "Not Started": "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
    };
    return map[status] || "bg-slate-100 text-slate-600";
  }
  getTotalBudgetPercent(project) {
    const total = Number(project.budget_total) || 0;
    const used = Number(project.budget_used) || 0;
    return total ? Math.min(Math.round(used / total * 100), 100) : 0;
  }
  formatCurrency(val) {
    const n = Number(val) || 0;
    if (n >= 1e5)
      return `\u20B9${(n / 1e5).toFixed(1)}L`;
    if (n >= 1e3)
      return `\u20B9${(n / 1e3).toFixed(1)}K`;
    return `\u20B9${n}`;
  }
  trackByDate(_, day) {
    return day.fullDate;
  }
  static \u0275fac = function Calendar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Calendar)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(MeetingServices));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Calendar, selectors: [["app-calendar"]], hostBindings: function Calendar_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function Calendar_click_HostBindingHandler() {
        return ctx.onDocumentClick();
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 72, vars: 25, consts: [["projectDropdown", ""], [1, "min-h-screen", "bg-gradient-to-br", "from-slate-100", "via-white", "to-orange-50", "dark:from-slate-950", "dark:via-slate-900", "dark:to-slate-950", "p-4", "lg:p-6"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-4", "mb-6"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white", "tracking-tight"], [1, "text-slate-500", "dark:text-slate-400", "mt-1", "text-sm"], [1, "flex", "flex-wrap", "gap-3"], [1, "relative"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-300", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-200", "font-semibold", "text-sm", "transition-all", "duration-200", "hover:border-orange-400", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "material-symbols-outlined", "text-[16px]", "transition-transform", "duration-200"], ["class", "absolute z-50 top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden", "style", "min-width: 220px; max-width: calc(100vw - 2.5rem); max-height: 300px;", 3, "click", 4, "ngIf"], [1, "px-4", "py-2.5", "rounded-xl", "border", "border-slate-300", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-200", "font-semibold", "text-sm", "transition-all", "duration-200", 3, "click", "disabled", "ngClass"], [1, "flex", "items-center", "gap-2", "px-5", "py-2.5", "rounded-xl", "bg-orange-500", "hover:bg-orange-600", "text-white", "font-semibold", "shadow-lg", "shadow-orange-500/30", "transition-all", "duration-300", "hover:-translate-y-0.5", "text-sm", "cursor-pointer", 3, "click"], [1, "bg-white/80", "dark:bg-slate-900/90", "backdrop-blur-xl", "rounded-[28px]", "overflow-hidden", "border", "border-white/40", "dark:border-slate-800", "shadow-[0_20px_60px_rgba(0,0,0,0.08)]"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-4", "p-5", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-3"], ["type", "button", 1, "h-10", "w-10", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-orange-50", "dark:hover:bg-slate-700", "transition-all", "duration-200", "hover:scale-105", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[20px]", "text-slate-700", "dark:text-white"], [1, "w-[180px]", "text-center", "flex", "items-center", "justify-center"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white", "whitespace-nowrap"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [1, "timeline-toolbar", "flex", "p-1", "bg-slate-100", "dark:bg-slate-800", "rounded-xl"], [1, "px-4", "py-2", "text-sm", "font-semibold", "rounded-lg", "transition-all", "duration-200", "cursor-pointer", 3, "click", "ngClass"], [1, "flex", "flex-wrap", "items-center", "gap-x-4", "gap-y-2"], [1, "flex", "items-center", "gap-1.5"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-emerald-600"], [1, "text-xs", "text-slate-500", "dark:text-slate-400"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-red-500"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-blue-600"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-amber-500"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-violet-600"], ["class", "grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800", 4, "ngIf"], [4, "ngIf"], [1, "fixed", "inset-0", "z-50", "bg-black/50", "backdrop-blur-sm", "flex", "justify-end"], [1, "fixed", "inset-0", "z-50", "bg-black/50", "backdrop-blur-sm", "flex", "items-end", "lg:items-center", "justify-center", "p-4"], [1, "fixed", "inset-0", "z-[60]", "bg-black/60", "backdrop-blur-sm", "flex", "items-end", "lg:items-center", "justify-center", "p-4"], [1, "absolute", "z-50", "top-full", "left-0", "mt-1", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "shadow-xl", "overflow-hidden", 2, "min-width", "220px", "max-width", "calc(100vw - 2.5rem)", "max-height", "300px", 3, "click"], [1, "overflow-y-auto", "custom-scrollbar", "dropdown-scroll", 2, "max-height", "260px"], [1, "flex", "items-center", "gap-3", "px-4", "py-3", "cursor-pointer", "transition-colors", "border-b", "border-slate-100", "dark:border-slate-700", 3, "click"], [1, "flex-shrink-0", "w-4", "h-4", "rounded", "border-2", "flex", "items-center", "justify-center", "transition-all"], ["class", "material-symbols-outlined text-white", "style", "font-size:11px;font-variation-settings:'wght' 700", 4, "ngIf"], [1, "text-sm", "font-bold", "text-slate-800", "dark:text-white"], [1, "ml-auto", "text-xs", "font-bold", "text-slate-400"], ["class", "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors", 3, "click", 4, "ngFor", "ngForOf"], [1, "px-4", "py-2.5", "border-t", "border-slate-100", "dark:border-slate-700", "flex", "items-center", "justify-between", "bg-slate-50", "dark:bg-slate-800/80"], [1, "text-xs", "text-slate-400", "font-medium"], ["class", "text-xs font-bold text-orange-500 hover:text-orange-600 cursor-pointer", 3, "click", 4, "ngIf"], [1, "material-symbols-outlined", "text-white", 2, "font-size", "11px", "font-variation-settings", "'wght' 700"], [1, "flex", "items-center", "gap-3", "px-4", "py-3", "cursor-pointer", "hover:bg-orange-50", "dark:hover:bg-orange-900/10", "transition-colors", 3, "click"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-semibold", "text-slate-800", "dark:text-white", "truncate"], [1, "text-xs", "text-slate-400", "truncate"], [1, "text-[9px]", "font-bold", "px-1.5", "py-0.5", "rounded-full", "shrink-0"], [1, "text-xs", "font-bold", "text-orange-500", "hover:text-orange-600", "cursor-pointer", 3, "click"], [1, "grid", "grid-cols-7", "gap-px", "bg-slate-100", "dark:bg-slate-800"], ["class", "bg-slate-50 dark:bg-slate-900 py-3 text-center text-xs font-bold text-slate-400 uppercase", 4, "ngFor", "ngForOf"], [1, "bg-slate-50", "dark:bg-slate-900", "py-3", "text-center", "text-xs", "font-bold", "text-slate-400", "uppercase"], [1, "flex", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "w-16", "shrink-0"], [1, "flex-1", "grid", 3, "ngStyle"], ["class", "py-3 text-center border-l border-slate-100 dark:border-slate-800 first:border-l-0", 4, "ngFor", "ngForOf"], [1, "flex", "overflow-y-auto", "pt-2.5", 2, "max-height", "600px"], [1, "w-16", "shrink-0", "relative"], ["class", "h-16 relative", 4, "ngFor", "ngForOf"], [1, "flex-1", "grid", "relative", 3, "ngStyle"], ["class", "absolute left-0 right-0 z-20 flex items-center pointer-events-none", 3, "top", 4, "ngIf"], ["class", "relative border-l border-slate-100 dark:border-slate-800 first:border-l-0", 4, "ngFor", "ngForOf"], [1, "py-3", "text-center", "border-l", "border-slate-100", "dark:border-slate-800", "first:border-l-0"], [1, "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest"], [1, "mt-1", "mx-auto", "w-8", "h-8", "flex", "items-center", "justify-center", "rounded-full", "text-sm", "font-black"], [1, "h-16", "relative"], [1, "absolute", "-top-2.5", "right-2", "text-[11px]", "text-slate-400", "font-semibold"], [1, "absolute", "left-0", "right-0", "z-20", "flex", "items-center", "pointer-events-none"], [1, "w-2.5", "h-2.5", "rounded-full", "bg-red-500", "-ml-1.5", "shrink-0"], [1, "flex-1", "h-[1.5px]", "bg-red-500"], [1, "relative", "border-l", "border-slate-100", "dark:border-slate-800", "first:border-l-0"], ["class", "h-16 border-t border-slate-200 dark:border-slate-700", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], [1, "h-16", "border-t", "border-slate-200", "dark:border-slate-700"], ["class", "absolute left-2 right-2 rounded-xl px-3 py-2 cursor-pointer hover:brightness-110 transition-all shadow-lg z-10", 3, "top", "height", "ngClass", "click", 4, "ngIf"], ["class", "absolute left-1 right-1 rounded-lg px-2 py-1 cursor-pointer hover:brightness-110 transition-all shadow-sm z-10", "style", "height: 28px;", 3, "top", "ngClass", "click", 4, "ngIf"], [1, "absolute", "left-2", "right-2", "rounded-xl", "px-3", "py-2", "cursor-pointer", "hover:brightness-110", "transition-all", "shadow-lg", "z-10", 3, "click", "ngClass"], [1, "text-[15px]", "font-bold", "truncate"], [1, "text-[13px]", "opacity-80", "truncate"], [1, "absolute", "left-1", "right-1", "rounded-lg", "px-2", "py-1", "cursor-pointer", "hover:brightness-110", "transition-all", "shadow-sm", "z-10", 2, "height", "28px", 3, "click", "ngClass"], [1, "text-[10px]", "font-bold", "text-white", "truncate"], ["class", "bg-slate-50 dark:bg-slate-900 py-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest", 4, "ngFor", "ngForOf"], ["class", "min-h-[140px] bg-white dark:bg-slate-900 p-2.5 hover:bg-orange-50/30 dark:hover:bg-slate-800/60 transition-all duration-200 relative group", 3, "opacity-0", "pointer-events-none", "ring-2", "ring-orange-400", "ring-inset", "cursor-pointer", "cursor-default", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "bg-slate-50", "dark:bg-slate-900", "py-3", "text-center", "text-xs", "font-bold", "text-slate-400", "dark:text-slate-500", "uppercase", "tracking-widest"], [1, "min-h-[140px]", "bg-white", "dark:bg-slate-900", "p-2.5", "hover:bg-orange-50/30", "dark:hover:bg-slate-800/60", "transition-all", "duration-200", "relative", "group", 3, "click"], [1, "flex", "items-start", "justify-between", "mb-2"], [1, "text-[13px]", "font-black", "text-slate-600", "dark:text-slate-300"], ["class", "cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-6 h-6 rounded-md bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center hover:bg-orange-200", 3, "click", 4, "ngIf"], [1, "space-y-[4px]"], ["class", "text-center font-bold cursor-pointer transition-all duration-150 hover:bg-slate-200 dark:hover:bg-slate-700", "style", "font-size:10px; padding: 3px 6px; color:#94a3b8; background:rgba(148,163,184,0.15); border-radius:6px;", 4, "ngIf"], [1, "cursor-pointer", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-200", "w-6", "h-6", "rounded-md", "bg-orange-100", "dark:bg-orange-900/40", "flex", "items-center", "justify-center", "hover:bg-orange-200", 3, "click"], [1, "material-symbols-outlined", "text-[14px]", "text-orange-600", "cursor-pointer"], ["class", "cursor-pointer hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] transition-all duration-150 w-full overflow-hidden flex items-center gap-2", "style", "padding: 6px 8px; border-radius: 9px; box-shadow: 0 2px 6px rgba(0,0,0,0.20);", 3, "ngClass", "click", 4, "ngIf"], [1, "cursor-pointer", "hover:scale-[1.02]", "hover:brightness-105", "active:scale-[0.98]", "transition-all", "duration-150", "w-full", "overflow-hidden", "flex", "items-center", "gap-2", 2, "padding", "6px 8px", "border-radius", "9px", "box-shadow", "0 2px 6px rgba(0,0,0,0.20)", 3, "click", "ngClass"], [1, "material-symbols-outlined", "text-white", "shrink-0", 2, "font-size", "13px", "line-height", "1"], [2, "min-width", "0", "flex", "1", "overflow", "hidden"], [1, "text-white", "truncate", 2, "font-size", "12px", "font-weight", "800", "line-height", "1.4"], [1, "truncate", 2, "font-size", "10.5px", "font-weight", "600", "line-height", "1.3", "color", "rgba(255,255,255,0.88)"], [1, "text-center", "font-bold", "cursor-pointer", "transition-all", "duration-150", "hover:bg-slate-200", "dark:hover:bg-slate-700", 2, "font-size", "10px", "padding", "3px 6px", "color", "#94a3b8", "background", "rgba(148,163,184,0.15)", "border-radius", "6px"], [1, "fixed", "inset-0", "z-50", "bg-black/50", "backdrop-blur-sm", "flex", "justify-end", 3, "click"], [1, "w-full", "sm:w-[250px]", "md:w-[350px]", "lg:w-[480px]", "bg-white", "dark:bg-slate-900", "h-full", "overflow-y-auto", "shadow-2xl", 3, "click"], [1, "sticky", "top-0", "bg-white/95", "dark:bg-slate-900/95", "backdrop-blur-sm", "border-b", "border-slate-200", "dark:border-slate-800", "px-6", "py-4", "flex", "items-center", "justify-between", "z-10"], [1, "text-xs", "font-bold", "text-orange-500", "uppercase", "tracking-widest", "mb-0.5"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white", "leading-tight"], [1, "flex", "items-center", "gap-2"], [1, "px-3", "py-1.5", "rounded-lg", "bg-orange-500", "text-white", "text-xs", "font-bold", "hover:bg-orange-600", "transition-colors", "flex", "items-center", "gap-1", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[14px]"], [1, "h-8", "w-8", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-slate-200", "transition-colors", "cursor-pointer", 3, "click"], [1, "p-6", "space-y-6"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-bold"], ["class", "px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300", 4, "ngIf"], [1, "grid", "grid-cols-2", "gap-3"], [1, "rounded-2xl", "bg-slate-50", "dark:bg-slate-800", "p-4"], [1, "text-xs", "text-slate-400", "mb-1", "flex", "items-center", "gap-1"], [1, "font-bold", "text-slate-800", "dark:text-white", "text-sm"], ["class", "flex items-start gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800", 4, "ngIf"], [1, "flex", "justify-between", "mb-2"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "font-black", "text-orange-500"], [1, "h-2.5", "bg-slate-200", "dark:bg-slate-700", "rounded-full", "overflow-hidden"], [1, "h-2.5", "rounded-full", "transition-all", "duration-700"], [1, "flex", "justify-between", "mt-3", "mb-1"], [1, "text-xs", "text-slate-400"], [1, "text-xs", "font-bold", "text-slate-500"], [1, "h-1.5", "bg-slate-200", "dark:bg-slate-700", "rounded-full", "overflow-hidden"], [1, "h-1.5", "rounded-full", "bg-blue-500", "transition-all", "duration-700"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200", "mb-3"], ["class", "flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800", 4, "ngFor", "ngForOf"], [1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-3", "rounded-2xl", "border-2", "border-dashed", "border-violet-300", "dark:border-violet-700", "text-violet-600", "dark:text-violet-400", "font-bold", "text-sm", "hover:bg-violet-50", "dark:hover:bg-violet-900/20", "transition-all", "duration-200", "cursor-pointer", 3, "click"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "bg-slate-100", "text-slate-600", "dark:bg-slate-800", "dark:text-slate-300"], [1, "flex", "items-start", "gap-2", "px-4", "py-3", "rounded-xl", "bg-slate-50", "dark:bg-slate-800"], [1, "material-symbols-outlined", "text-[18px]", "text-orange-500", "mt-0.5"], [1, "text-sm", "text-slate-700", "dark:text-slate-300"], [1, "flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "bg-slate-100", "dark:bg-slate-800"], ["class", "w-5 h-5 rounded-full object-cover", "alt", "", 3, "src", "error", 4, "ngIf"], ["class", "w-5 h-5 rounded-full bg-orange-200 dark:bg-orange-900/60 flex items-center justify-center text-[10px] font-bold text-orange-700", 4, "ngIf"], [1, "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300"], ["alt", "", 1, "w-5", "h-5", "rounded-full", "object-cover", 3, "error", "src"], [1, "w-5", "h-5", "rounded-full", "bg-orange-200", "dark:bg-orange-900/60", "flex", "items-center", "justify-center", "text-[10px]", "font-bold", "text-orange-700"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-orange-500"], ["class", "text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 font-bold", 4, "ngIf"], ["class", "border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-2.5 hover:border-orange-300 dark:hover:border-orange-700 transition-colors", 4, "ngFor", "ngForOf"], [1, "text-[10px]", "px-2", "py-0.5", "rounded-full", "bg-blue-100", "text-blue-600", "dark:bg-blue-900/40", "dark:text-blue-300", "font-bold"], [1, "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "p-4", "mb-2.5", "hover:border-orange-300", "dark:hover:border-orange-700", "transition-colors"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "font-bold", "text-slate-800", "dark:text-white", "text-sm", "truncate"], ["class", "text-xs text-slate-400 mt-0.5", 4, "ngIf"], [1, "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "shrink-0"], [1, "flex", "items-center", "gap-2", "mt-2.5", "text-xs", "text-slate-400"], [1, "material-symbols-outlined", "text-[13px]"], [1, "mt-2"], [1, "h-1.5", "rounded-full", "bg-orange-400", "transition-all", "duration-500"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "fixed", "inset-0", "z-50", "bg-black/50", "backdrop-blur-sm", "flex", "items-end", "lg:items-center", "justify-center", "p-4", 3, "click"], [1, "w-full", "max-w-3xl", "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-2xl", "overflow-hidden", "flex", "flex-col", 2, "max-height", "80vh", 3, "click"], [1, "flex", "items-center", "justify-between", "p-6", "border-b", "border-slate-200", "dark:border-slate-800", "shrink-0"], [1, "text-xs", "font-bold", "text-orange-500", "uppercase", "tracking-widest"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white"], [1, "h-8", "w-8", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-slate-200", "dark:hover:bg-slate-700", "transition-colors", "cursor-pointer", 3, "click"], [1, "overflow-y-auto", "p-6", "space-y-3", "custom-scrollbar", "dropdown-scroll"], ["class", "rounded-2xl p-4 transition-all duration-200 hover:shadow-md", 3, "ngClass", 4, "ngFor", "ngForOf"], ["class", "text-center py-8 text-slate-400 text-sm", 4, "ngIf"], [1, "rounded-2xl", "p-4", "transition-all", "duration-200", "hover:shadow-md", 3, "ngClass"], [1, "flex", "items-start", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "w-2", "h-2", "rounded-full", "shrink-0", 3, "ngClass"], [1, "text-xs", "font-bold", "uppercase", "tracking-wide", "text-slate-400"], [1, "flex", "items-center", "gap-3", "mt-2", "text-xs", "text-slate-500"], [1, "px-2", "py-0.5", "rounded-full", "font-bold"], [1, "ml-auto", "font-bold", "text-orange-500"], [1, "shrink-0", "flex", "items-center", "gap-1", "px-3", "py-1.5", "rounded-xl", "bg-orange-500", "text-white", "text-[11px]", "font-bold", "hover:bg-orange-600", "transition-colors", "whitespace-nowrap", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[16px]", "text-violet-600"], [1, "text-xs", "font-bold", "text-violet-600", "uppercase", "tracking-wide"], ["class", "font-normal normal-case text-violet-400", 4, "ngIf"], ["class", "text-xs text-slate-500 mt-1 leading-relaxed", 4, "ngIf"], [1, "flex", "flex-col", "gap-1.5", "shrink-0"], ["class", "flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 text-white text-[11px] font-bold hover:bg-violet-700 transition-colors whitespace-nowrap cursor-pointer", 3, "click", 4, "ngIf"], [1, "flex", "items-center", "justify-center", "gap-1", "px-3", "py-1.5", "rounded-xl", "bg-blue-50", "dark:bg-blue-900/20", "text-blue-600", "text-[11px]", "font-bold", "hover:bg-blue-100", "dark:hover:bg-blue-900/40", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "justify-center", "gap-1", "px-3", "py-1.5", "rounded-xl", "bg-red-50", "dark:bg-red-900/20", "text-red-500", "text-[11px]", "font-bold", "hover:bg-red-100", "dark:hover:bg-red-900/40", "transition-colors", "cursor-pointer", 3, "click"], [1, "font-normal", "normal-case", "text-violet-400"], [1, "text-xs", "text-slate-500", "mt-1", "leading-relaxed"], [1, "flex", "flex-wrap", "gap-1", "mt-2"], ["class", "px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-[10px] font-semibold", 4, "ngFor", "ngForOf"], [1, "px-2", "py-0.5", "rounded-full", "bg-violet-100", "dark:bg-violet-900/40", "text-violet-700", "dark:text-violet-300", "text-[10px]", "font-semibold"], [1, "flex", "items-center", "gap-1", "px-3", "py-1.5", "rounded-xl", "bg-violet-600", "text-white", "text-[11px]", "font-bold", "hover:bg-violet-700", "transition-colors", "whitespace-nowrap", "cursor-pointer", 3, "click"], [1, "text-center", "py-8", "text-slate-400", "text-sm"], [1, "fixed", "inset-0", "z-[60]", "bg-black/60", "backdrop-blur-sm", "flex", "items-end", "lg:items-center", "justify-center", "p-4", 3, "click"], [1, "w-full", "max-w-2xl", "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-2xl", "h-[80vh]", "flex", "flex-col", "overflow-hidden", 3, "click"], [1, "sticky", "top-0", "bg-white", "dark:bg-slate-900", "rounded-t-3xl", "border-b", "border-slate-200", "dark:border-slate-800", "px-6", "py-4", "flex", "items-center", "justify-between", "z-10", "shrink-0"], [1, "w-9", "h-9", "rounded-xl", "bg-violet-100", "dark:bg-violet-900/40", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[20px]", "text-violet-600"], [1, "text-xs", "font-bold", "text-violet-500", "uppercase", "tracking-widest"], [1, "h-9", "w-9", "rounded-xl", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-slate-200", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex-1", "overflow-y-auto", "p-6", "space-y-5"], [1, "block", "text-xs", "font-bold", "text-slate-600", "dark:text-slate-400", "mb-1.5"], ["type", "text", "placeholder", "e.g. Site progress review", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "px-4", "py-3", "text-sm", "bg-white", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-violet-400", "transition-all", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["type", "date", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "px-4", "py-3", "text-sm", "bg-white", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-violet-400", "transition-all", "cursor-pointer", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "w-full", "flex", "items-center", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "hover:border-violet-400", "focus:ring-2", "focus:ring-violet-400", "transition-all", "overflow-hidden", "px-3", "py-3", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "mr-2", "shrink-0"], [1, "flex-1", "text-left", "text-sm", "text-slate-800", "dark:text-white"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "transition-transform", "duration-200"], ["class", "absolute z-50 top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden flex w-full min-w-[140px] max-w-[calc(100vw-2.5rem)] sm:w-40", 3, "click", 4, "ngIf"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "px-4", "py-3", "text-sm", "bg-white", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "hover:border-violet-400", "focus:ring-2", "focus:ring-violet-400", "transition-all", "cursor-pointer", 3, "click"], ["class", "absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden custom-scrollbar dropdown-scroll", "style", "max-height: 192px; overflow-y: auto;", 3, "click", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["class", "flex flex-wrap gap-1.5 mb-2", 4, "ngIf"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "px-4", "py-3", "text-sm", "bg-white", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-violet-400", "transition-all", "hover:border-violet-400", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "transition-transform", "duration-200", "cursor-pointer"], ["class", "absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl flex flex-col", "style", "max-height: 220px;", 3, "click", 4, "ngIf"], ["rows", "2", "placeholder", "Agenda, location notes...", 1, "w-full", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "px-4", "py-3", "text-sm", "bg-white", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-violet-400", "transition-all", "resize-none", 3, "ngModelChange", "ngModel"], [1, "font-normal", "text-slate-400", "ml-1"], ["class", "flex flex-wrap gap-2 mb-3 p-2 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60", 4, "ngIf"], [1, "flex", "items-center", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "bg-white", "dark:bg-slate-800", "focus-within:ring-2", "focus-within:ring-violet-400", "transition-all", "overflow-hidden"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "ml-3", "shrink-0"], ["type", "text", "placeholder", "Search name or email, press Enter or comma to add...", 1, "flex-1", "px-3", "py-3", "text-sm", "bg-transparent", "text-slate-800", "dark:text-white", "focus:outline-none", 3, "input", "keydown", "click", "value"], ["class", "absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-48 overflow-y-auto custom-scrollbar dropdown-scroll", 3, "click", 4, "ngIf"], [1, "mt-1.5", "text-[11px]", "text-slate-400"], [1, "rounded-2xl", "border", "border-violet-200", "dark:border-violet-800", "bg-violet-50", "dark:bg-violet-900/20", "p-4"], [1, "text-xs", "font-bold", "text-violet-700", "dark:text-violet-300", "mb-3", "flex", "items-center", "gap-1.5"], [1, "material-symbols-outlined", "text-[15px]"], ["type", "url", "placeholder", "https://meet.google.com/xxx-xxxx-xxx", 1, "w-full", "border", "border-violet-200", "dark:border-violet-700", "rounded-xl", "px-4", "py-2.5", "text-sm", "bg-white", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-violet-400", "transition-all", 3, "ngModelChange", "ngModel"], [1, "mt-1.5", "text-[11px]", "text-violet-500"], [1, "flex", "gap-3", "pt-1"], [1, "flex-1", "py-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "text-slate-600", "dark:text-slate-300", "font-semibold", "text-sm", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex-1", "py-3", "rounded-xl", "bg-violet-600", "hover:bg-violet-700", "disabled:bg-slate-300", "dark:disabled:bg-slate-700", "disabled:cursor-not-allowed", "text-white", "font-bold", "text-sm", "shadow-lg", "shadow-violet-500/30", "transition-all", "duration-200", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", 3, "click", "disabled"], ["class", "material-symbols-outlined text-[16px] animate-spin", 4, "ngIf"], [1, "absolute", "z-50", "top-full", "left-0", "mt-1", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-xl", "overflow-hidden", "flex", "w-full", "min-w-[140px]", "max-w-[calc(100vw-2.5rem)]", "sm:w-40", 3, "click"], [1, "flex-1", "overflow-y-auto", "custom-scrollbar", "dropdown-scroll", "border-r", "border-slate-100", "dark:border-slate-700", 2, "max-height", "200px"], ["class", "text-center py-2 text-sm font-semibold cursor-pointer transition-colors", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "flex-1", "overflow-y-auto", "custom-scrollbar", "dropdown-scroll", 2, "max-height", "200px"], [1, "text-center", "py-2", "text-sm", "font-semibold", "cursor-pointer", "transition-colors", 3, "click", "ngClass"], [1, "absolute", "z-50", "top-full", "left-0", "right-0", "mt-1", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-xl", "overflow-hidden", "custom-scrollbar", "dropdown-scroll", 2, "max-height", "192px", "overflow-y", "auto", 3, "click"], ["class", "flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors", 3, "click", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "justify-between", "px-4", "py-3", "cursor-pointer", "hover:bg-violet-50", "dark:hover:bg-violet-900/20", "transition-colors", 3, "click"], [1, "text-sm", "font-medium", "text-slate-800", "dark:text-white"], ["class", "material-symbols-outlined text-violet-600 text-[16px]", 4, "ngIf"], [1, "material-symbols-outlined", "text-violet-600", "text-[16px]"], [1, "w-full", "flex", "items-center", "border", "border-violet-300", "dark:border-violet-700", "rounded-xl", "px-4", "py-3", "text-sm", "bg-violet-50", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "cursor-default"], [1, "material-symbols-outlined", "text-[16px]", "text-violet-500", "mr-2"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400", "cursor-pointer"], ["class", "absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden custom-scrollbar dropdown-scroll", "style", "max-height: 192px; overflow-y: auto;", 4, "ngIf"], [1, "absolute", "z-50", "top-full", "left-0", "right-0", "mt-1", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-xl", "overflow-hidden", "custom-scrollbar", "dropdown-scroll", 2, "max-height", "192px", "overflow-y", "auto"], ["class", "px-4 py-3 cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors", 3, "click", 4, "ngFor", "ngForOf"], [1, "px-4", "py-3", "cursor-pointer", "hover:bg-violet-50", "dark:hover:bg-violet-900/20", "transition-colors", 3, "click"], [1, "flex", "flex-wrap", "gap-1.5", "mb-2"], ["class", "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-semibold", 4, "ngFor", "ngForOf"], [1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "rounded-full", "bg-violet-100", "dark:bg-violet-900/40", "text-violet-700", "dark:text-violet-300", "text-xs", "font-semibold"], ["type", "button", 1, "hover:text-violet-900", "dark:hover:text-violet-100", "leading-none", "cursor-pointer", 3, "click"], [1, "absolute", "z-50", "top-full", "left-0", "right-0", "mt-1", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-xl", "flex", "flex-col", 2, "max-height", "220px", 3, "click"], [1, "overflow-y-auto", "flex-1", "custom-scrollbar", "dropdown-scroll"], ["class", "px-4 py-3 text-sm text-slate-400 text-center", 4, "ngIf"], ["class", "flex items-center gap-3 px-4 py-2.5 hover:bg-violet-50 dark:hover:bg-violet-900/20 cursor-pointer transition-colors select-none", 3, "click", 4, "ngFor", "ngForOf"], [1, "shrink-0", "px-3", "py-2", "border-t", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "rounded-b-xl"], ["type", "button", 1, "w-12", "py-1", "rounded-lg", "bg-violet-600", "text-white", "text-xs", "font-bold", "hover:bg-violet-700", "transition-colors", "cursor-pointer", 3, "click"], [1, "px-4", "py-3", "text-sm", "text-slate-400", "text-center"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "hover:bg-violet-50", "dark:hover:bg-violet-900/20", "cursor-pointer", "transition-colors", "select-none", 3, "click"], [1, "flex-shrink-0", "w-4", "h-4", "rounded", "border-2", "flex", "items-center", "justify-center", "transition-all", "pointer-events-none", 3, "ngClass"], ["class", "material-symbols-outlined text-white pointer-events-none", "style", "font-size:11px;font-variation-settings:'wght' 700", 4, "ngIf"], [1, "flex-1", "min-w-0", "pointer-events-none"], ["class", "text-xs text-slate-400 truncate", 4, "ngIf"], [1, "material-symbols-outlined", "text-white", "pointer-events-none", 2, "font-size", "11px", "font-variation-settings", "'wght' 700"], [1, "flex", "flex-wrap", "gap-2", "mb-3", "p-2", "border", "border-slate-100", "dark:border-slate-700", "rounded-xl", "bg-slate-50", "dark:bg-slate-800/60"], ["class", "inline-flex items-center gap-2 px-2 py-1 rounded-full border shadow-sm", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "inline-flex", "items-center", "gap-2", "px-2", "py-1", "rounded-full", "border", "shadow-sm", 3, "ngClass"], [1, "w-6", "h-6", "rounded-full", "flex", "items-center", "justify-center", "text-[10px]", "font-bold", "shrink-0", 3, "ngClass"], [1, "flex", "flex-col", "leading-tight", "min-w-0"], [1, "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-200", "truncate"], ["class", "text-[10px] text-slate-400 truncate", 4, "ngIf"], ["class", "px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold whitespace-nowrap", 4, "ngIf"], ["class", "px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold whitespace-nowrap", 4, "ngIf"], ["type", "button", 1, "text-slate-400", "hover:text-red-500", "transition-colors", 3, "click"], [1, "text-[10px]", "text-slate-400", "truncate"], [1, "px-1.5", "py-0.5", "rounded-full", "bg-emerald-100", "text-emerald-700", "text-[9px]", "font-bold", "whitespace-nowrap"], [1, "px-1.5", "py-0.5", "rounded-full", "bg-amber-100", "text-amber-700", "text-[9px]", "font-bold", "whitespace-nowrap"], [1, "absolute", "z-50", "top-full", "left-0", "right-0", "mt-1", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-xl", "max-h-48", "overflow-y-auto", "custom-scrollbar", "dropdown-scroll", 3, "click"], ["class", "flex items-center gap-3 px-4 py-2.5 hover:bg-violet-50 dark:hover:bg-violet-900/20 cursor-pointer transition-colors", 3, "click", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "hover:bg-violet-50", "dark:hover:bg-violet-900/20", "cursor-pointer", "transition-colors", 3, "click"], [1, "w-8", "h-8", "rounded-full", "shrink-0", "overflow-hidden", "bg-violet-100", "dark:bg-violet-900/60", "flex", "items-center", "justify-center"], ["class", "w-full h-full object-cover rounded-full", "alt", "", 3, "src", "error", 4, "ngIf"], ["class", "text-sm font-bold text-violet-700 dark:text-violet-300", 4, "ngIf"], [1, "text-xs", "text-slate-500", "dark:text-slate-400", "truncate"], [1, "inline-block", "mt-1", "px-1.5", "py-0.5", "rounded-full", "bg-emerald-100", "text-emerald-700", "text-[9px]", "font-bold"], ["alt", "", 1, "w-full", "h-full", "object-cover", "rounded-full", 3, "error", "src"], [1, "text-sm", "font-bold", "text-violet-700", "dark:text-violet-300"], [1, "material-symbols-outlined", "text-[16px]", "animate-spin"]], template: function Calendar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
      \u0275\u0275text(4, "Calendar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Project schedules, milestones & team meetings");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "button", 7);
      \u0275\u0275listener("click", function Calendar_Template_button_click_9_listener($event) {
        ctx.showProjectFilterDropdown = !ctx.showProjectFilterDropdown;
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "folder_open");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 9);
      \u0275\u0275text(15, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, Calendar_div_16_Template, 14, 25, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 11);
      \u0275\u0275listener("click", function Calendar_Template_button_click_17_listener() {
        return ctx.goToToday();
      });
      \u0275\u0275text(18, " Today ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 12);
      \u0275\u0275listener("click", function Calendar_Template_button_click_19_listener() {
        return ctx.openAddMeeting();
      });
      \u0275\u0275elementStart(20, "span", 8);
      \u0275\u0275text(21, "video_call");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " Schedule Meeting ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 13)(24, "div", 14)(25, "div", 15)(26, "button", 16);
      \u0275\u0275listener("click", function Calendar_Template_button_click_26_listener() {
        return ctx.previousMonth();
      });
      \u0275\u0275elementStart(27, "span", 17);
      \u0275\u0275text(28, "chevron_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 18)(30, "h2", 19);
      \u0275\u0275elementContainerStart(31, 20);
      \u0275\u0275template(32, Calendar_span_32_Template, 3, 4, "span", 21)(33, Calendar_span_33_Template, 4, 8, "span", 21)(34, Calendar_span_34_Template, 2, 2, "span", 22);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "button", 16);
      \u0275\u0275listener("click", function Calendar_Template_button_click_35_listener() {
        return ctx.nextMonth();
      });
      \u0275\u0275elementStart(36, "span", 17);
      \u0275\u0275text(37, "chevron_right");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 23)(39, "button", 24);
      \u0275\u0275listener("click", function Calendar_Template_button_click_39_listener() {
        return ctx.changeView("Day");
      });
      \u0275\u0275text(40, "Day");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "button", 24);
      \u0275\u0275listener("click", function Calendar_Template_button_click_41_listener() {
        return ctx.changeView("Week");
      });
      \u0275\u0275text(42, "Week");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 24);
      \u0275\u0275listener("click", function Calendar_Template_button_click_43_listener() {
        return ctx.changeView("Month");
      });
      \u0275\u0275text(44, "Month");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(45, "div", 25)(46, "div", 26);
      \u0275\u0275element(47, "div", 27);
      \u0275\u0275elementStart(48, "span", 28);
      \u0275\u0275text(49, "Project Start");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 26);
      \u0275\u0275element(51, "div", 29);
      \u0275\u0275elementStart(52, "span", 28);
      \u0275\u0275text(53, "Project End");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "div", 26);
      \u0275\u0275element(55, "div", 30);
      \u0275\u0275elementStart(56, "span", 28);
      \u0275\u0275text(57, "Milestone Start");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 26);
      \u0275\u0275element(59, "div", 31);
      \u0275\u0275elementStart(60, "span", 28);
      \u0275\u0275text(61, "Milestone End");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div", 26);
      \u0275\u0275element(63, "div", 32);
      \u0275\u0275elementStart(64, "span", 28);
      \u0275\u0275text(65, "Meeting");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(66, Calendar_div_66_Template, 2, 2, "div", 33)(67, Calendar_ng_container_67_Template, 11, 10, "ng-container", 34)(68, Calendar_ng_container_68_Template, 5, 4, "ng-container", 34);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(69, Calendar_Conditional_69_Template, 78, 27, "div", 35);
      \u0275\u0275conditionalCreate(70, Calendar_Conditional_70_Template, 14, 3, "div", 36);
      \u0275\u0275conditionalCreate(71, Calendar_Conditional_71_Template, 98, 32, "div", 37);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275classProp("border-orange-400", ctx.selectedProjectIds.length > 0)("text-orange-600", ctx.selectedProjectIds.length > 0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.selectedProjectsLabel, " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.showProjectFilterDropdown);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.showProjectFilterDropdown);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.isNavigationChanged)("ngClass", \u0275\u0275pureFunction2(22, _c0, ctx.isNavigationChanged, !ctx.isNavigationChanged));
      \u0275\u0275advance(14);
      \u0275\u0275property("ngSwitch", ctx.currentView);
      \u0275\u0275advance();
      \u0275\u0275property("ngSwitchCase", "Day");
      \u0275\u0275advance();
      \u0275\u0275property("ngSwitchCase", "Week");
      \u0275\u0275advance(6);
      \u0275\u0275property("ngClass", ctx.currentView === "Day" ? "bg-orange-500 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", ctx.currentView === "Week" ? "bg-orange-500 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngClass", ctx.currentView === "Month" ? "bg-orange-500 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700");
      \u0275\u0275advance(23);
      \u0275\u0275property("ngIf", ctx.currentView === "Day" || ctx.currentView === "Week");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentView === "Day" || ctx.currentView === "Week");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentView === "Month");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showProjectDetails ? 69 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDayEventsPanel ? 70 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showMeetingModal ? 71 : -1);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\ninput[type=date][_ngcontent-%COMP%] {\n  cursor: pointer;\n}\ninput[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n}\ninput[type=time][_ngcontent-%COMP%] {\n  cursor: pointer;\n}\ninput[type=time][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n}\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.dropdown-scroll[_ngcontent-%COMP%] {\n  overscroll-behavior: contain;\n  scroll-behavior: smooth;\n}\n/*# sourceMappingURL=calendar.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Calendar, [{
    type: Component,
    args: [{ selector: "app-calendar", standalone: false, template: `<div\r
  class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 lg:p-6">\r
\r
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">\r
    <div>\r
      <h1 class="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Calendar</h1>\r
      <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">Project schedules, milestones &amp; team meetings</p>\r
    </div>\r
    <div class="flex flex-wrap gap-3">\r
\r
      <div class="relative">\r
        <button (click)="showProjectFilterDropdown = !showProjectFilterDropdown; $event.stopPropagation()"\r
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all duration-200 hover:border-orange-400 cursor-pointer"\r
          [class.border-orange-400]="selectedProjectIds.length > 0"\r
          [class.text-orange-600]="selectedProjectIds.length > 0">\r
          <span class="material-symbols-outlined text-[18px]">folder_open</span>\r
          <span>\r
            {{ selectedProjectsLabel }}\r
          </span>\r
          <span class="material-symbols-outlined text-[16px] transition-transform duration-200"\r
            [class.rotate-180]="showProjectFilterDropdown">\r
            expand_more\r
          </span>\r
        </button>\r
\r
        <div *ngIf="showProjectFilterDropdown" (click)="$event.stopPropagation()"\r
          class="absolute z-50 top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden"\r
          style="min-width: 220px; max-width: calc(100vw - 2.5rem); max-height: 300px;">\r
\r
          <div class="overflow-y-auto custom-scrollbar dropdown-scroll" style="max-height: 260px;">\r
\r
            <div (click)="toggleAllProjects()"\r
              class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-700"\r
              [class.bg-orange-50]="isAllProjectsSelected" [class.dark:bg-orange-900/20]="isAllProjectsSelected"\r
              [class.hover:bg-slate-50]="!isAllProjectsSelected"\r
              [class.dark:hover:bg-slate-700]="!isAllProjectsSelected">\r
              <span class="flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all"\r
                [class.bg-orange-500]="isAllProjectsSelected" [class.border-orange-500]="isAllProjectsSelected"\r
                [class.border-slate-300]="!isAllProjectsSelected" [class.dark:border-slate-600]="!isAllProjectsSelected"\r
                [class.bg-white]="!isAllProjectsSelected" [class.dark:bg-slate-900]="!isAllProjectsSelected">\r
                <span *ngIf="isAllProjectsSelected" class="material-symbols-outlined text-white"\r
                  style="font-size:11px;font-variation-settings:'wght' 700">check</span>\r
              </span>\r
              <span class="text-sm font-bold text-slate-800 dark:text-white">All Projects</span>\r
              <span class="ml-auto text-xs font-bold text-slate-400">{{ projects.length }}</span>\r
            </div>\r
\r
            <div *ngFor="let p of projects" (click)="toggleProjectFilter(+p.id)"\r
              class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors">\r
              <span class="flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all"\r
                [class.bg-orange-500]="isProjectFilterSelected(+p.id)"\r
                [class.border-orange-500]="isProjectFilterSelected(+p.id)"\r
                [class.border-slate-300]="!isProjectFilterSelected(+p.id)"\r
                [class.dark:border-slate-600]="!isProjectFilterSelected(+p.id)"\r
                [class.bg-white]="!isProjectFilterSelected(+p.id)"\r
                [class.dark:bg-slate-900]="!isProjectFilterSelected(+p.id)">\r
                <span *ngIf="isProjectFilterSelected(+p.id)" class="material-symbols-outlined text-white"\r
                  style="font-size:11px;font-variation-settings:'wght' 700">check</span>\r
              </span>\r
              <div class="flex-1 min-w-0">\r
                <p class="text-sm font-semibold text-slate-800 dark:text-white truncate">{{ p.name }}</p>\r
                <p class="text-xs text-slate-400 truncate">{{ p.type || '' }}</p>\r
              </div>\r
              <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"\r
                [class]="getStatusBadge(p.status || '')">\r
                {{ p.status || '' }}\r
              </span>\r
            </div>\r
          </div>\r
\r
          <div\r
            class="px-4 py-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">\r
            <span class="text-xs text-slate-400 font-medium">\r
              {{ isAllProjectsSelected ? 'Showing all' : selectedProjectIds.length + ' selected' }}\r
            </span>\r
            <button *ngIf="selectedProjectIds.length > 0" (click)="selectAllProjects(); $event.stopPropagation()"\r
              class="text-xs font-bold text-orange-500 hover:text-orange-600 cursor-pointer">\r
              Clear\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <button (click)="goToToday()" [disabled]="!isNavigationChanged" [ngClass]="{\r
    'cursor-pointer hover:bg-slate-50': isNavigationChanged,\r
    'cursor-default opacity-60': !isNavigationChanged\r
  }" class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all duration-200">\r
        Today\r
      </button>\r
\r
      <button (click)="openAddMeeting()"\r
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 text-sm cursor-pointer">\r
        <span class="material-symbols-outlined text-[18px]">video_call</span>\r
        Schedule Meeting\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div\r
    class="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/40 dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">\r
    <div\r
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-b border-slate-200 dark:border-slate-800">\r
      <div class="flex items-center gap-3">\r
        <button type="button" (click)="previousMonth()"\r
          class="h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105 cursor-pointer">\r
          <span class="material-symbols-outlined text-[20px] text-slate-700 dark:text-white ">chevron_left</span>\r
        </button>\r
        <div class="w-[180px] text-center flex items-center justify-center">\r
          <h2 class="text-xl font-black text-slate-800 dark:text-white whitespace-nowrap">\r
            <ng-container [ngSwitch]="currentView">\r
              <span *ngSwitchCase="'Day'">{{ selectedDate | date:'dd MMM yyyy' }}</span>\r
              <span *ngSwitchCase="'Week'">{{ weekStart | date:'dd MMM' }} - {{ weekEnd | date:'dd MMM yyyy' }}</span>\r
              <span *ngSwitchDefault>{{ months[currentMonth] }} {{ currentYear }}</span>\r
            </ng-container>\r
          </h2>\r
        </div>\r
        <button type="button" (click)="nextMonth()"\r
          class="h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105 cursor-pointer">\r
          <span class="material-symbols-outlined text-[20px] text-slate-700 dark:text-white">chevron_right</span>\r
        </button>\r
        <div class="timeline-toolbar flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">\r
          <button class="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"\r
            [ngClass]="currentView === 'Day' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'"\r
            (click)="changeView('Day')">Day</button>\r
          <button class="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"\r
            [ngClass]="currentView === 'Week' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'"\r
            (click)="changeView('Week')">Week</button>\r
          <button class="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"\r
            [ngClass]="currentView === 'Month' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'"\r
            (click)="changeView('Month')">Month</button>\r
        </div>\r
      </div>\r
\r
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2">\r
        <div class="flex items-center gap-1.5">\r
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>\r
          <span class="text-xs text-slate-500 dark:text-slate-400">Project Start</span>\r
        </div>\r
        <div class="flex items-center gap-1.5">\r
          <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>\r
          <span class="text-xs text-slate-500 dark:text-slate-400">Project End</span>\r
        </div>\r
        <div class="flex items-center gap-1.5">\r
          <div class="w-2.5 h-2.5 rounded-full bg-blue-600"></div>\r
          <span class="text-xs text-slate-500 dark:text-slate-400">Milestone Start</span>\r
        </div>\r
        <div class="flex items-center gap-1.5">\r
          <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>\r
          <span class="text-xs text-slate-500 dark:text-slate-400">Milestone End</span>\r
        </div>\r
        <div class="flex items-center gap-1.5">\r
          <div class="w-2.5 h-2.5 rounded-full bg-violet-600"></div>\r
          <span class="text-xs text-slate-500 dark:text-slate-400">Meeting</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="currentView === 'Day' || currentView === 'Week'"\r
      class="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800">\r
\r
      <div *ngFor="let d of ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']"\r
        class="bg-slate-50 dark:bg-slate-900 py-3 text-center text-xs font-bold text-slate-400 uppercase">\r
        {{ d }}\r
      </div>\r
\r
    </div>\r
\r
    <ng-container *ngIf="currentView === 'Day' || currentView === 'Week'">\r
      <div class="flex border-b border-slate-200 dark:border-slate-800">\r
        <div class="w-16 shrink-0"></div>\r
        <div class="flex-1 grid"\r
          [ngStyle]="{'grid-template-columns': currentView === 'Day' ? '1fr' : 'repeat(7, 1fr)'}">\r
          <div *ngFor="let day of calendarDays"\r
            class="py-3 text-center border-l border-slate-100 dark:border-slate-800 first:border-l-0">\r
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">\r
              {{ ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][getDayOfWeek(day.fullDate)] }}\r
            </div>\r
            <div class="mt-1 mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-black"\r
              [class.bg-orange-500]="day.today" [class.text-white]="day.today" [class.text-slate-700]="!day.today"\r
              [class.dark:text-slate-200]="!day.today">\r
              {{ day.date }}\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="flex overflow-y-auto pt-2.5" style="max-height: 600px;">\r
\r
        <div class="w-16 shrink-0 relative">\r
          <div *ngFor="let hour of hours" class="h-16 relative">\r
            <span class="absolute -top-2.5 right-2 text-[11px] text-slate-400 font-semibold">\r
              {{ formatHour(hour) }}\r
            </span>\r
          </div>\r
        </div>\r
\r
\r
        <div class="flex-1 grid relative"\r
          [ngStyle]="{'grid-template-columns': currentView === 'Day' ? '1fr' : 'repeat(7, 1fr)'}">\r
\r
          <div *ngIf="currentTimeVisible()" class="absolute left-0 right-0 z-20 flex items-center pointer-events-none"\r
            [style.top.px]="getCurrentTimeTop()">\r
            <div class="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1.5 shrink-0"></div>\r
            <div class="flex-1 h-[1.5px] bg-red-500"></div>\r
          </div>\r
\r
          <div *ngFor="let day of calendarDays; let colIdx = index"\r
            class="relative border-l border-slate-100 dark:border-slate-800 first:border-l-0">\r
\r
            <div *ngFor="let hour of hours" class="h-16 border-t border-slate-200 dark:border-slate-700"></div>\r
\r
            <ng-container *ngFor="let event of day.events">\r
              <div *ngIf="event.type === 'meeting' && event.meeting?.time"\r
                class="absolute left-2 right-2 rounded-xl px-3 py-2 cursor-pointer hover:brightness-110 transition-all shadow-lg z-10"\r
                [style.top.px]="getEventTop(event.meeting?.time)"\r
                [style.height.px]="getEventHeight(event.meeting?.duration) + 20" [ngClass]="'bg-violet-600 text-white'"\r
                (click)="openDayEventsForEvent(event, day, $event)">\r
                <div class="text-[15px] font-bold truncate">{{ event.meeting?.title }}</div>\r
                <div class="text-[13px] opacity-80 truncate">{{ event.meeting?.time }}</div>\r
              </div>\r
\r
              <div *ngIf="event.type !== 'meeting'"\r
                class="absolute left-1 right-1 rounded-lg px-2 py-1 cursor-pointer hover:brightness-110 transition-all shadow-sm z-10"\r
                [style.top.px]="getAllDayEventTop(event, day)" style="height: 28px;" [ngClass]="{\r
              'bg-emerald-600': event.type === 'project-start',\r
              'bg-red-500': event.type === 'project-end',\r
              'bg-blue-600': event.type === 'milestone-start',\r
              'bg-amber-500': event.type === 'milestone-end'\r
            }"\r
                (click)="openProjectDetails(event.project, event.milestone, event.type !== 'project-end'); $event.stopPropagation()">\r
                <div class="text-[10px] font-bold text-white truncate">{{ event.project?.name }}</div>\r
              </div>\r
            </ng-container>\r
          </div>\r
        </div>\r
      </div>\r
    </ng-container>\r
\r
    <ng-container *ngIf="currentView === 'Month'">\r
      <div class="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800">\r
        <div *ngFor="let d of ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']"\r
          class="bg-slate-50 dark:bg-slate-900 py-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">\r
          {{ d }}\r
        </div>\r
      </div>\r
\r
      <div class="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800">\r
        <div *ngFor="let day of calendarDays; trackBy: trackByDate" [class.opacity-0]="!day.date"\r
          [class.pointer-events-none]="!day.date" [class.ring-2]="day.today" [class.ring-orange-400]="day.today"\r
          [class.ring-inset]="day.today" [class.cursor-pointer]="day.date && day.events.length > 0"\r
          [class.cursor-default]="day.date && day.events.length === 0"\r
          class="min-h-[140px] bg-white dark:bg-slate-900 p-2.5 hover:bg-orange-50/30 dark:hover:bg-slate-800/60 transition-all duration-200 relative group"\r
          (click)="openDayEvents(day, $event)">\r
\r
          <div class="flex items-start justify-between mb-2">\r
            <span [class.bg-orange-500]="day.today" [class.text-white]="day.today" [class.rounded-full]="day.today"\r
              [class.w-7]="day.today" [class.h-7]="day.today" [class.flex]="day.today" [class.items-center]="day.today"\r
              [class.justify-center]="day.today" class="text-[13px] font-black text-slate-600 dark:text-slate-300">\r
              {{ day.date }}\r
            </span>\r
            <button *ngIf="day.date" (click)="openAddMeeting(day.fullDate); $event.stopPropagation()"\r
              class="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-6 h-6 rounded-md bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center hover:bg-orange-200">\r
              <span class="material-symbols-outlined text-[14px] text-orange-600 cursor-pointer">add</span>\r
            </button>\r
          </div>\r
\r
          <div class="space-y-[4px]">\r
            <ng-container *ngFor="let event of day.events; let i = index">\r
              <div *ngIf="i < 3"\r
                (click)="event.type !== 'meeting' ? openProjectDetails(event.project, event.milestone, event.type !== 'project-end') : openDayEvents(day,$event); $event.stopPropagation()"\r
                class="cursor-pointer hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] transition-all duration-150 w-full overflow-hidden flex items-center gap-2"\r
                style="padding: 6px 8px; border-radius: 9px; box-shadow: 0 2px 6px rgba(0,0,0,0.20);" [ngClass]="{\r
              'bg-emerald-600': event.type === 'project-start',\r
              'bg-red-500':     event.type === 'project-end',\r
              'bg-blue-600':    event.type === 'milestone-start',\r
              'bg-amber-500':   event.type === 'milestone-end',\r
              'bg-violet-600':  event.type === 'meeting'\r
            }">\r
                <span class="material-symbols-outlined text-white shrink-0" style="font-size:13px; line-height:1;">\r
                  <ng-container [ngSwitch]="event.type">\r
                    <ng-container *ngSwitchCase="'project-start'">rocket_launch</ng-container>\r
                    <ng-container *ngSwitchCase="'project-end'">flag</ng-container>\r
                    <ng-container *ngSwitchCase="'milestone-start'">outlined_flag</ng-container>\r
                    <ng-container *ngSwitchCase="'milestone-end'">flag_circle</ng-container>\r
                    <ng-container *ngSwitchCase="'meeting'">video_call</ng-container>\r
                  </ng-container>\r
                </span>\r
                <div style="min-width:0; flex:1; overflow:hidden;">\r
                  <div class="text-white truncate" style="font-size:12px; font-weight:800; line-height:1.4;">\r
                    {{ event.type === 'meeting' ? event.meeting?.title : event.project?.name }}\r
                  </div>\r
                  <div class="truncate"\r
                    style="font-size:10.5px; font-weight:600; line-height:1.3; color:rgba(255,255,255,0.88);">\r
                    <ng-container *ngIf="event.type === 'meeting'">\r
                      <ng-container *ngIf="event.meeting?.time">\u23F0 {{ event.meeting?.time }}</ng-container>\r
                      <ng-container *ngIf="!event.meeting?.time">Meeting</ng-container>\r
                    </ng-container>\r
                    <ng-container *ngIf="event.type !== 'meeting'">{{ event.title }}</ng-container>\r
                  </div>\r
                </div>\r
              </div>\r
            </ng-container>\r
            <div *ngIf="day.events.length > 3"\r
              class="text-center font-bold cursor-pointer transition-all duration-150 hover:bg-slate-200 dark:hover:bg-slate-700"\r
              style="font-size:10px; padding: 3px 6px; color:#94a3b8; background:rgba(148,163,184,0.15); border-radius:6px;">\r
              +{{ day.events.length - 3 }} more\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </ng-container>\r
  </div>\r
\r
\r
  @if(showProjectDetails) {\r
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end" (click)="closeProjectDetails()">\r
    <div class="w-full sm:w-[250px] md:w-[350px] lg:w-[480px]\r
         bg-white dark:bg-slate-900 h-full overflow-y-auto shadow-2xl" (click)="$event.stopPropagation()">\r
      <div\r
        class="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">\r
        <div>\r
          <p class="text-xs font-bold text-orange-500 uppercase tracking-widest mb-0.5">Project Details</p>\r
          <h2 class="text-lg font-black text-slate-800 dark:text-white leading-tight">{{ selectedProject?.name }}</h2>\r
        </div>\r
        <div class="flex items-center gap-2">\r
          <button (click)="navigateToProject(selectedProject?.id)"\r
            class="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors flex items-center gap-1 cursor-pointer">\r
            <span class="material-symbols-outlined text-[14px]">open_in_new</span>\r
            Open Project\r
          </button>\r
          <button (click)="closeProjectDetails()"\r
            class="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer">\r
            <span class="material-symbols-outlined text-[18px]">close</span>\r
          </button>\r
        </div>\r
      </div>\r
\r
      <div class="p-6 space-y-6">\r
        <div class="flex flex-wrap gap-2">\r
          <span class="px-3 py-1 rounded-full text-xs font-bold"\r
            [class]="getStatusBadge(selectedProject?.status || '')">\r
            {{ selectedProject?.status || '\u2014' }}\r
          </span>\r
          <span\r
            *ngIf="selectedProject!.type && selectedProject?.type !== 'null' && selectedProject?.type !== 'undefined'"\r
            class="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">\r
            {{ selectedProject?.type }}\r
          </span>\r
        </div>\r
\r
        <div class="grid grid-cols-2 gap-3">\r
          <div class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">\r
              <span class="material-symbols-outlined text-[14px]">calendar_today</span> Start\r
            </p>\r
            <p class="font-bold text-slate-800 dark:text-white text-sm">\r
              {{ selectedProject!.createdAt ? (selectedProject?.createdAt | date:'dd MMM yyyy') : '\u2014' }}\r
            </p>\r
          </div>\r
          <div class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">\r
              <span class="material-symbols-outlined text-[14px]">event_available</span> Completion\r
            </p>\r
            <p class="font-bold text-slate-800 dark:text-white text-sm">\r
              {{ selectedProject!.completion_date ? (selectedProject?.completion_date | date:'dd MMM yyyy') : '\u2014' }}\r
            </p>\r
          </div>\r
          <div class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">\r
              <span class="material-symbols-outlined text-[14px]">payments</span> Budget\r
            </p>\r
            <p class="font-bold text-slate-800 dark:text-white text-sm">{{ formatCurrency(selectedProject?.budget_total)\r
              }}</p>\r
          </div>\r
          <div class="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">\r
            <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">\r
              <span class="material-symbols-outlined text-[14px]">account_balance_wallet</span> Used\r
            </p>\r
            <p class="font-bold text-slate-800 dark:text-white text-sm">{{ formatCurrency(selectedProject?.budget_used)\r
              }}</p>\r
          </div>\r
        </div>\r
\r
        <div *ngIf="selectedProject!.address && selectedProject?.address !== 'null'"\r
          class="flex items-start gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800">\r
          <span class="material-symbols-outlined text-[18px] text-orange-500 mt-0.5">location_on</span>\r
          <p class="text-sm text-slate-700 dark:text-slate-300">{{ selectedProject?.address }}</p>\r
        </div>\r
\r
        <div>\r
          <div class="flex justify-between mb-2">\r
            <span class="text-sm font-bold text-slate-700 dark:text-slate-200">Overall Progress</span>\r
            <span class="text-sm font-black text-orange-500">{{ selectedProject?.project_progress || 0 }}%</span>\r
          </div>\r
          <div class="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">\r
            <div class="h-2.5 rounded-full transition-all duration-700"\r
              [style.width.%]="selectedProject?.project_progress || 0"\r
              [class]="getProgressColor(selectedProject?.project_progress || 0)"></div>\r
          </div>\r
          <div class="flex justify-between mt-3 mb-1">\r
            <span class="text-xs text-slate-400">Budget Used</span>\r
            <span class="text-xs font-bold text-slate-500">{{ getTotalBudgetPercent(selectedProject!) }}%</span>\r
          </div>\r
          <div class="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">\r
            <div class="h-1.5 rounded-full bg-blue-500 transition-all duration-700"\r
              [style.width.%]="getTotalBudgetPercent(selectedProject!)"></div>\r
          </div>\r
        </div>\r
\r
        <div>\r
          <h3 class="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">\r
            Team Members ({{ selectedProject?.team_members?.length || 0 }})\r
          </h3>\r
          <div class="flex flex-wrap gap-2">\r
            <div *ngFor="let member of selectedProject?.team_members"\r
              class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">\r
              <img *ngIf="member.avatar && !failedAvatars.has(member.avatar)" [src]="getAvatarUrl(member.avatar)"\r
                class="w-5 h-5 rounded-full object-cover" alt="" (error)="onAvatarError(member.avatar)">\r
              <div *ngIf="!member.avatar || failedAvatars.has(member.avatar)"\r
                class="w-5 h-5 rounded-full bg-orange-200 dark:bg-orange-900/60 flex items-center justify-center text-[10px] font-bold text-orange-700">\r
                {{ member.firstname ? member.firstname.charAt(0) : '?' }}\r
              </div>\r
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">\r
                {{ member.firstname || '' }} {{ member.lastname || '' }}\r
              </span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div *ngIf="showMilestonesInPanel">\r
          <div class="flex items-center justify-between mb-3">\r
            <h3 class="text-sm font-black text-slate-700 dark:text-slate-200">\r
              Milestones\r
              <span class="text-orange-500">({{ selectedMilestone ? 1 : (selectedProject?.milestones?.length || 0)\r
                }})</span>\r
            </h3>\r
            <span *ngIf="selectedMilestone"\r
              class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 font-bold">\r
              Filtered\r
            </span>\r
          </div>\r
\r
          <div *ngFor="let ms of displayedMilestones"\r
            class="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-2.5 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">\r
            <div class="flex items-start justify-between gap-2">\r
              <div class="flex-1 min-w-0">\r
                <p class="font-bold text-slate-800 dark:text-white text-sm truncate">{{ ms.name || '\u2014' }}</p>\r
                <p *ngIf="ms.phase && ms.phase !== 'null'" class="text-xs text-slate-400 mt-0.5">{{ ms.phase }}</p>\r
              </div>\r
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"\r
                [class]="getStatusBadge(ms.status)">{{ ms.status || '\u2014' }}</span>\r
            </div>\r
            <div class="flex items-center gap-2 mt-2.5 text-xs text-slate-400">\r
              <span class="material-symbols-outlined text-[13px]">date_range</span>\r
              <ng-container *ngIf="ms.startDate && ms.endDate">\r
                {{ ms.startDate | date:'dd MMM' }} \u2192 {{ ms.endDate | date:'dd MMM yyyy' }}\r
              </ng-container>\r
              <ng-container *ngIf="!ms.startDate || !ms.endDate">\u2014</ng-container>\r
            </div>\r
            <div class="mt-2">\r
              <div class="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">\r
                <div class="h-1.5 rounded-full bg-orange-400 transition-all duration-500"\r
                  [style.width.%]="ms.progress || 0"></div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <button (click)="openAddMeetingForProject(selectedProject)"\r
          class="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-violet-300 dark:border-violet-700 text-violet-600 dark:text-violet-400 font-bold text-sm hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200 cursor-pointer">\r
          <span class="material-symbols-outlined text-[18px]">video_call</span>\r
          Schedule a Meeting for this Project\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
  }\r
\r
\r
  @if(showDayEventsPanel) {\r
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:items-center justify-center p-4"\r
    (click)="closeDayEventsPanel()">\r
    <div class="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"\r
      style="max-height: 80vh;" (click)="$event.stopPropagation()">\r
      <div class="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">\r
        <div>\r
          <p class="text-xs font-bold text-orange-500 uppercase tracking-widest">All Events</p>\r
          <h3 class="text-lg font-black text-slate-800 dark:text-white">{{ selectedDayLabel }}</h3>\r
        </div>\r
        <button (click)="closeDayEventsPanel()"\r
          class="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">\r
          <span class="material-symbols-outlined text-[18px]">close</span>\r
        </button>\r
      </div>\r
\r
      <div class="overflow-y-auto p-6 space-y-3 custom-scrollbar dropdown-scroll">\r
        <div *ngFor="let event of selectedDayEvents" class="rounded-2xl p-4 transition-all duration-200 hover:shadow-md"\r
          [ngClass]="{\r
            'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800': event.type === 'project-start',\r
            'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800': event.type === 'project-end',\r
            'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800': event.type === 'milestone-start',\r
            'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800': event.type === 'milestone-end',\r
            'bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800': event.type === 'meeting'\r
          }">\r
\r
          <ng-container *ngIf="event.type !== 'meeting'">\r
            <div class="flex items-start justify-between gap-3">\r
              <div class="flex-1 min-w-0">\r
                <div class="flex items-center gap-2 mb-1">\r
                  <div class="w-2 h-2 rounded-full shrink-0" [ngClass]="{\r
          'bg-emerald-600': event.type === 'project-start',\r
          'bg-red-500': event.type === 'project-end',\r
          'bg-blue-600': event.type === 'milestone-start',\r
          'bg-amber-500': event.type === 'milestone-end'\r
        }"></div>\r
                  <span class="text-xs font-bold uppercase tracking-wide text-slate-400">{{ event.title }}</span>\r
                </div>\r
                <p class="font-bold text-slate-800 dark:text-white text-sm">{{ event.project?.name || '\u2014' }}</p>\r
                <div class="flex items-center gap-3 mt-2 text-xs text-slate-500">\r
                  <span *ngIf="event.project!.type">{{ event.project?.type }}</span>\r
                  <span class="px-2 py-0.5 rounded-full font-bold"\r
                    [class]="getStatusBadge(event.project?.status || '')">\r
                    {{ event.project?.status || '\u2014' }}\r
                  </span>\r
                  <span class="ml-auto font-bold text-orange-500">{{ event.project?.project_progress || 0 }}%</span>\r
                </div>\r
              </div>\r
              <button\r
                (click)="navigateToProjectDetails(event.project, event.milestone); closeDayEventsPanel(); $event.stopPropagation()"\r
                class="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500 text-white text-[11px] font-bold hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer">\r
                <span class="material-symbols-outlined text-[13px]">open_in_new</span>\r
                Open\r
              </button>\r
            </div>\r
          </ng-container>\r
\r
          <ng-container *ngIf="event.type === 'meeting'">\r
            <div class="flex items-start justify-between gap-3">\r
              <div class="flex-1 min-w-0">\r
                <div class="flex items-center gap-2 mb-1">\r
                  <span class="material-symbols-outlined text-[16px] text-violet-600">video_call</span>\r
                  <span class="text-xs font-bold text-violet-600 uppercase tracking-wide">\r
                    Meeting<ng-container *ngIf="event.meeting!.time"> \xB7 {{ event.meeting?.time }}</ng-container>\r
                    <span *ngIf="event.meeting!.duration && event.meeting!.duration! > 0"\r
                      class="font-normal normal-case text-violet-400">\r
                      ({{ event.meeting?.duration }} min)\r
                    </span>\r
                  </span>\r
                </div>\r
                <p class="font-bold text-slate-800 dark:text-white text-sm">{{ event.meeting?.title || '\u2014' }}</p>\r
                <p *ngIf="event.meeting!.project?.name" class="text-xs text-slate-400 mt-0.5">\r
                  \u{1F4C1} {{ event.meeting?.project?.name }}\r
                </p>\r
                <p *ngIf="event.meeting!.vendor?.name" class="text-xs text-slate-400 mt-0.5">\r
                  \u{1F3E2} {{ event.meeting?.vendor?.name }}\r
                </p>\r
                <p *ngIf="event.meeting!.description && event.meeting!.description!.trim() !== ''"\r
                  class="text-xs text-slate-500 mt-1 leading-relaxed">\r
                  {{ event.meeting?.description }}\r
                </p>\r
                <ng-container *ngIf="event.meeting?.attendees && event.meeting!.attendees!.length > 0">\r
                  <div class="flex flex-wrap gap-1 mt-2">\r
                    <span *ngFor="let a of event.meeting!.attendees"\r
                      class="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-[10px] font-semibold">\r
                      {{ a }}\r
                    </span>\r
                  </div>\r
                </ng-container>\r
              </div>\r
              <div class="flex flex-col gap-1.5 shrink-0">\r
                <button *ngIf="event.meeting?.meet_link && event.meeting!.meet_link!.trim() !== ''"\r
                  (click)="openMeetLink(event.meeting!.meet_link, $event)"\r
                  class="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 text-white text-[11px] font-bold hover:bg-violet-700 transition-colors whitespace-nowrap cursor-pointer">\r
                  <span class="material-symbols-outlined text-[13px]">video_call</span>\r
                  Join\r
                </button>\r
                <button (click)="openEditMeeting(event.meeting!, $event)"\r
                  class="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-pointer">\r
                  <span class="material-symbols-outlined text-[13px]">edit</span>\r
                  Edit\r
                </button>\r
                <button (click)="deleteMeeting(event.meeting!, $event)"\r
                  class="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer">\r
                  <span class="material-symbols-outlined text-[13px]">delete</span>\r
                  Delete\r
                </button>\r
              </div>\r
            </div>\r
          </ng-container>\r
        </div>\r
\r
        <div *ngIf="!selectedDayEvents.length" class="text-center py-8 text-slate-400 text-sm">\r
          No events for this day.\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
  }\r
\r
\r
  @if(showMeetingModal) {\r
  <div class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end lg:items-center justify-center p-4"\r
    (click)="closeMeetingModal()">\r
    <div\r
      class="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl h-[80vh] flex flex-col overflow-hidden"\r
      (click)="$event.stopPropagation()">\r
      <div\r
        class="sticky top-0 bg-white dark:bg-slate-900 rounded-t-3xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10 shrink-0">\r
        <div class="flex items-center gap-3">\r
          <div class="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">\r
            <span class="material-symbols-outlined text-[20px] text-violet-600">video_call</span>\r
          </div>\r
          <div>\r
            <p class="text-xs font-bold text-violet-500 uppercase tracking-widest">\r
              {{ editingMeeting ? 'Edit' : 'New' }} Meeting\r
            </p>\r
            <h3 class="text-lg font-black text-slate-800 dark:text-white leading-tight">\r
              {{ editingMeeting ? 'Update Meeting' : 'Schedule Meeting' }}\r
            </h3>\r
          </div>\r
        </div>\r
        <button (click)="closeMeetingModal()"\r
          class="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer">\r
          <span class="material-symbols-outlined text-[18px]">close</span>\r
        </button>\r
      </div>\r
\r
      <div class="flex-1 overflow-y-auto p-6 space-y-5">\r
        <div>\r
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Meeting Title *</label>\r
          <input [(ngModel)]="meetingForm.title" type="text"\r
            class="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"\r
            placeholder="e.g. Site progress review">\r
        </div>\r
\r
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
          <div>\r
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Date *</label>\r
            <input [(ngModel)]="meetingForm.dateInput" type="date"\r
              class="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all cursor-pointer">\r
          </div>\r
\r
          <div>\r
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Time</label>\r
            <div class="relative">\r
              <button type="button" (click)="toggleTimeDropdown($event)"\r
                class="w-full flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:border-violet-400 focus:ring-2 focus:ring-violet-400 transition-all overflow-hidden px-3 py-3 cursor-pointer">\r
                <span class="material-symbols-outlined text-[18px] text-slate-400 mr-2 shrink-0">schedule</span>\r
                <span class="flex-1 text-left text-sm text-slate-800 dark:text-white">{{ formatTimeDisplay() }}</span>\r
                <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200"\r
                  [class.rotate-180]="showTimeDropdown">\r
                  expand_more\r
                </span>\r
              </button>\r
\r
              <div *ngIf="showTimeDropdown" (click)="$event.stopPropagation()"\r
                class="absolute z-50 top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden flex w-full min-w-[140px] max-w-[calc(100vw-2.5rem)] sm:w-40">\r
                <div\r
                  class="flex-1 overflow-y-auto custom-scrollbar dropdown-scroll border-r border-slate-100 dark:border-slate-700"\r
                  style="max-height: 200px;">\r
                  <div *ngFor="let h of timeHours" (click)="selectHour(h)"\r
                    class="text-center py-2 text-sm font-semibold cursor-pointer transition-colors"\r
                    [ngClass]="getSelectedHour() === h ? 'bg-violet-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/20'">\r
                    {{ h }}\r
                  </div>\r
                </div>\r
                <div class="flex-1 overflow-y-auto custom-scrollbar dropdown-scroll" style="max-height: 200px;">\r
                  <div *ngFor="let m of timeMinutes" (click)="selectMinute(m)"\r
                    class="text-center py-2 text-sm font-semibold cursor-pointer transition-colors"\r
                    [ngClass]="getSelectedMinute() === m ? 'bg-violet-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/20'">\r
                    {{ m }}\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
          <div>\r
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Duration</label>\r
            <div class="relative">\r
              <button type="button" (click)="showDurationDropdown = !showDurationDropdown; $event.stopPropagation()"\r
                class="w-full flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:border-violet-400 focus:ring-2 focus:ring-violet-400 transition-all cursor-pointer">\r
                <span>{{ getDurationLabel() }}</span>\r
                <span class="material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200"\r
                  [class.rotate-180]="showDurationDropdown">\r
                  expand_more\r
                </span>\r
              </button>\r
              <div *ngIf="showDurationDropdown" (click)="$event.stopPropagation()"\r
                class="absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden custom-scrollbar dropdown-scroll"\r
                style="max-height: 192px; overflow-y: auto;">\r
                <div *ngFor="let opt of durationOptions" (click)="selectDuration(opt.value)"\r
                  class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">\r
                  <span class="text-sm font-medium text-slate-800 dark:text-white">{{ opt.label }}</span>\r
                  <span *ngIf="meetingForm.duration === opt.value"\r
                    class="material-symbols-outlined text-violet-600 text-[16px]">check</span>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div>\r
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Project</label>\r
            <div class="relative">\r
              <ng-container *ngIf="prefilledProjectId; else projectDropdown">\r
                <div\r
                  class="w-full flex items-center border border-violet-300 dark:border-violet-700 rounded-xl px-4 py-3 text-sm bg-violet-50 dark:bg-slate-800 text-slate-800 dark:text-white cursor-default">\r
                  <span class="material-symbols-outlined text-[16px] text-violet-500 mr-2">folder</span>\r
                  {{ getSelectedProjectName() }}\r
                </div>\r
              </ng-container>\r
              <ng-template #projectDropdown>\r
                <button type="button" (click)="showProjectDropdown = !showProjectDropdown"\r
                  class="w-full flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:border-violet-400 focus:ring-2 focus:ring-violet-400 transition-all cursor-pointer">\r
                  <span [class.text-slate-400]="!meetingForm.project_id">\r
                    {{ getSelectedProjectName() || 'Select Project' }}\r
                  </span>\r
                  <span class="material-symbols-outlined text-[18px] text-slate-400 cursor-pointer"\r
                    [class.rotate-180]="showProjectDropdown">\r
                    expand_more\r
                  </span>\r
                </button>\r
                <div *ngIf="showProjectDropdown"\r
                  class="absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden custom-scrollbar dropdown-scroll"\r
                  style="max-height: 192px; overflow-y: auto;">\r
                  <div *ngFor="let p of projects" (click)="selectProject(p)"\r
                    class="px-4 py-3 cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">\r
                    <p class="text-sm font-medium text-slate-800 dark:text-white">{{ p.name }}</p>\r
                  </div>\r
                </div>\r
              </ng-template>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div>\r
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Vendors</label>\r
\r
          <div *ngIf="(meetingForm.selectedVendorIds || []).length > 0" class="flex flex-wrap gap-1.5 mb-2">\r
            <span *ngFor="let vid of meetingForm.selectedVendorIds"\r
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-semibold">\r
              {{ getVendorName(vid) }}\r
              <button type="button" (click)="removeVendor(vid); $event.stopPropagation()"\r
                class="hover:text-violet-900 dark:hover:text-violet-100 leading-none cursor-pointer">\r
                <span class="material-symbols-outlined text-[13px]">close</span>\r
              </button>\r
            </span>\r
          </div>\r
          <div class="relative">\r
            <button type="button" (click)="toggleVendorDropdown($event)"\r
              class="w-full flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all hover:border-violet-400 cursor-pointer">\r
              <span [class.text-slate-400]="!(meetingForm.selectedVendorIds || []).length">\r
                {{ (meetingForm.selectedVendorIds || []).length ? getSelectedVendorNames() : 'Select Vendors' }}\r
              </span>\r
              <span\r
                class="material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200 cursor-pointer"\r
                [class.rotate-180]="showVendorDropdown">expand_more</span>\r
            </button>\r
            <div *ngIf="showVendorDropdown" (click)="$event.stopPropagation()"\r
              class="absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl flex flex-col"\r
              style="max-height: 220px;">\r
\r
              <div class="overflow-y-auto flex-1 custom-scrollbar dropdown-scroll">\r
                <div *ngIf="!vendors.length" class="px-4 py-3 text-sm text-slate-400 text-center">No vendors available\r
                </div>\r
                <div *ngFor="let v of vendors" (click)="toggleVendor(v.id, $event)"\r
                  class="flex items-center gap-3 px-4 py-2.5 hover:bg-violet-50 dark:hover:bg-violet-900/20 cursor-pointer transition-colors select-none">\r
                  <span\r
                    class="flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all pointer-events-none"\r
                    [ngClass]="isVendorSelected(v.id) ? 'bg-violet-600 border-violet-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'">\r
                    <span *ngIf="isVendorSelected(v.id)"\r
                      class="material-symbols-outlined text-white pointer-events-none"\r
                      style="font-size:11px;font-variation-settings:'wght' 700">check</span>\r
                  </span>\r
                  <div class="flex-1 min-w-0 pointer-events-none">\r
                    <p class="text-sm font-semibold text-slate-800 dark:text-white truncate">{{ v.name }}</p>\r
                    <p *ngIf="v.email" class="text-xs text-slate-400 truncate">{{ v.email }}</p>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div\r
                class="shrink-0 px-3 py-2 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-b-xl">\r
                <button type="button" (click)="showVendorDropdown = false; $event.stopPropagation()"\r
                  class="w-12 py-1 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors cursor-pointer">\r
                  OK\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div>\r
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Description</label>\r
          <textarea [(ngModel)]="meetingForm.description" rows="2"\r
            class="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"\r
            placeholder="Agenda, location notes..."></textarea>\r
        </div>\r
\r
        <div>\r
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">\r
            Meeting Attendees\r
            <span class="font-normal text-slate-400 ml-1">\u2014 Email invitations will be sent automatically</span>\r
          </label>\r
          <div *ngIf="selectedAttendees.length > 0"\r
            class="flex flex-wrap gap-2 mb-3 p-2 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60">\r
            <div *ngFor="let a of selectedAttendees"\r
              class="inline-flex items-center gap-2 px-2 py-1 rounded-full border shadow-sm"\r
              [ngClass]="a.isExisting ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700' : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700'">\r
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"\r
                [ngClass]="a.isExisting ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'">\r
                {{ (a.name || a.email).charAt(0).toUpperCase() }}\r
              </div>\r
              <div class="flex flex-col leading-tight min-w-0">\r
                <span class="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{{ a.name || a.email\r
                  }}</span>\r
                <span *ngIf="a.name && a.name !== a.email" class="text-[10px] text-slate-400 truncate">{{ a.email\r
                  }}</span>\r
              </div>\r
              <span *ngIf="a.isExisting"\r
                class="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold whitespace-nowrap">Existing</span>\r
              <span *ngIf="!a.isExisting"\r
                class="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold whitespace-nowrap">External</span>\r
              <button type="button" (click)="removeAttendee(a.email)"\r
                class="text-slate-400 hover:text-red-500 transition-colors">\r
                <span class="material-symbols-outlined text-[14px]">close</span>\r
              </button>\r
            </div>\r
          </div>\r
          <div class="relative">\r
            <div\r
              class="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-violet-400 transition-all overflow-hidden">\r
              <span class="material-symbols-outlined text-[18px] text-slate-400 ml-3 shrink-0">person_add</span>\r
              <input type="text" [value]="attendeeSearchText" (input)="onAttendeeSearch($any($event.target).value)"\r
                (keydown)="onAttendeeKeydown($event)" (click)="$event.stopPropagation()"\r
                class="flex-1 px-3 py-3 text-sm bg-transparent text-slate-800 dark:text-white focus:outline-none"\r
                placeholder="Search name or email, press Enter or comma to add...">\r
            </div>\r
            <div *ngIf="showAttendeeSuggestions" (click)="$event.stopPropagation()"\r
              class="absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-48 overflow-y-auto custom-scrollbar dropdown-scroll">\r
              <div *ngFor="let opt of filteredAttendeeOptions" (click)="selectAttendee(opt, $event)"\r
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-violet-50 dark:hover:bg-violet-900/20 cursor-pointer transition-colors">\r
                <div\r
                  class="w-8 h-8 rounded-full shrink-0 overflow-hidden bg-violet-100 dark:bg-violet-900/60 flex items-center justify-center">\r
                  <img *ngIf="opt.avatar && !failedAvatars.has(opt.avatar)" [src]="getAvatarUrl(opt.avatar)"\r
                    class="w-full h-full object-cover rounded-full" alt="" (error)="onAvatarError(opt.avatar)">\r
                  <span *ngIf="!opt.avatar || failedAvatars.has(opt.avatar)"\r
                    class="text-sm font-bold text-violet-700 dark:text-violet-300">\r
                    {{ (opt.name || opt.email || '?').charAt(0).toUpperCase() }}\r
                  </span>\r
                </div>\r
                <div class="flex-1 min-w-0">\r
                  <p class="text-sm font-semibold text-slate-800 dark:text-white truncate">{{ opt.name || opt.email }}\r
                  </p>\r
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ opt.email }}</p>\r
                  <span\r
                    class="inline-block mt-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">Existing\r
                    User</span>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
          <p class="mt-1.5 text-[11px] text-slate-400">\u{1F4E7} Each attendee will receive an email invitation with meeting\r
            details and join link</p>\r
        </div>\r
\r
        <div class="rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/20 p-4">\r
          <p class="text-xs font-bold text-violet-700 dark:text-violet-300 mb-3 flex items-center gap-1.5">\r
            <span class="material-symbols-outlined text-[15px]">video_call</span>\r
            Add Meeting Link\r
          </p>\r
          <input [(ngModel)]="meetingForm.meet_link" type="url"\r
            class="w-full border border-violet-200 dark:border-violet-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"\r
            placeholder="https://meet.google.com/xxx-xxxx-xxx">\r
          <p class="mt-1.5 text-[11px] text-violet-500">This link will be included in the email invitation</p>\r
        </div>\r
\r
        <div class="flex gap-3 pt-1">\r
          <button (click)="closeMeetingModal()"\r
            class="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">\r
            Cancel\r
          </button>\r
          <button (click)="saveMeeting()" [disabled]="!meetingForm.title || !meetingForm.dateInput || isSavingMeeting"\r
            class="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-violet-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">\r
            <span *ngIf="isSavingMeeting"\r
              class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>\r
            {{ isSavingMeeting ? 'Saving...' : (editingMeeting ? 'Update Meeting' : 'Save Meeting') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
  }\r
\r
</div>`, styles: ["/* src/app/modules/calendar/calendar.scss */\ninput[type=date] {\n  cursor: pointer;\n}\ninput[type=date]::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n}\ninput[type=time] {\n  cursor: pointer;\n}\ninput[type=time]::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n}\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.dropdown-scroll {\n  overscroll-behavior: contain;\n  scroll-behavior: smooth;\n}\n/*# sourceMappingURL=calendar.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ProjectService }, { type: MeetingServices }], { onDocumentClick: [{
    type: HostListener,
    args: ["document:click"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Calendar, { className: "Calendar", filePath: "app/modules/calendar/calendar.ts", lineNumber: 35 });
})();

// src/app/modules/calendar/calendar-routing-module.ts
var routes = [{ path: "", component: Calendar }];
var CalendarRoutingModule = class _CalendarRoutingModule {
  static \u0275fac = function CalendarRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalendarRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CalendarRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/calendar/calendar-module.ts
var CalendarModule = class _CalendarModule {
  static \u0275fac = function CalendarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalendarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CalendarModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, CalendarRoutingModule, FormsModule, ReactiveFormsModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarModule, [{
    type: NgModule,
    args: [{
      declarations: [Calendar],
      imports: [CommonModule, CalendarRoutingModule, FormsModule, ReactiveFormsModule]
    }]
  }], null, null);
})();
export {
  CalendarModule
};
//# sourceMappingURL=chunk-X7MHGF2O.js.map
