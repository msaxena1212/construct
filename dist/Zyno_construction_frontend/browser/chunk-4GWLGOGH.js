import {
  CommonModule,
  Component,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction5,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F27QM527.js";

// src/app/modules/calendar/calendar.ts
var _c0 = (a0, a1, a2, a3, a4) => ({ "bg-orange-500": a0, "bg-blue-500": a1, "bg-emerald-500": a2, "bg-red-500": a3, "bg-purple-500": a4 });
function Calendar_div_57_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, " Today ");
    \u0275\u0275elementEnd();
  }
}
function Calendar_div_57_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r1 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c0, event_r1.type === "concrete", event_r1.type === "electrical", event_r1.type === "plumbing", event_r1.type === "deadline", event_r1.type === "holiday"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", event_r1.title, " ");
  }
}
function Calendar_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, Calendar_div_57_span_4_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 28);
    \u0275\u0275template(6, Calendar_div_57_div_6_Template, 2, 8, "div", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const day_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", day_r2.date, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", day_r2.today);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", day_r2.events);
  }
}
var Calendar = class _Calendar {
  currentDate = /* @__PURE__ */ new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
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
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  calendarDays = [];
  events = [
    { date: "2026-01-26", title: "Republic Day", type: "holiday" },
    { date: "2026-03-04", title: "Holi", type: "holiday" },
    { date: "2026-03-21", title: "Eid-ul-Fitr", type: "holiday" },
    { date: "2026-03-26", title: "Ram Navami", type: "holiday" },
    { date: "2026-03-31", title: "Mahavir Jayanti", type: "holiday" },
    { date: "2026-04-03", title: "Good Friday", type: "holiday" },
    { date: "2026-05-01", title: "Buddha Purnima", type: "holiday" },
    { date: "2026-05-27", title: "Bakrid", type: "holiday" },
    { date: "2026-06-26", title: "Muharram", type: "holiday" },
    { date: "2026-08-15", title: "Independence Day", type: "holiday" },
    { date: "2026-08-26", title: "Id-e-Milad", type: "holiday" },
    { date: "2026-09-04", title: "Janmashtami", type: "holiday" },
    { date: "2026-10-02", title: "Gandhi Jayanti", type: "holiday" },
    { date: "2026-10-20", title: "Dussehra", type: "holiday" },
    { date: "2026-11-08", title: "Diwali", type: "holiday" },
    { date: "2026-11-24", title: "Guru Nanak Jayanti", type: "holiday" },
    { date: "2026-12-25", title: "Christmas", type: "holiday" }
  ];
  ngOnInit() {
    this.generateCalendar();
    this.mapHolidays();
  }
  generateCalendar() {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push({
        empty: true
      });
    }
    for (let day = 1; day <= totalDays; day++) {
      const fullDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = this.events.filter((x) => x.date === fullDate);
      const today = /* @__PURE__ */ new Date();
      this.calendarDays.push({
        empty: false,
        date: day,
        fullDate,
        today: today.getDate() === day && today.getMonth() === this.currentMonth && today.getFullYear() === this.currentYear,
        events: dayEvents
      });
    }
  }
  // PREVIOUS
  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }
  holidays = [];
  mapHolidays() {
    this.calendarDays.forEach((day) => {
      const dateString = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(day.date).padStart(2, "0")}`;
      const holiday = this.holidays.find((h) => h.date === dateString);
      if (holiday) {
        day.events.push({
          title: holiday.localName,
          type: "holiday"
        });
      }
    });
  }
  // NEXT
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }
  static \u0275fac = function Calendar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Calendar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Calendar, selectors: [["app-calendar"]], standalone: false, decls: 58, vars: 3, consts: [[1, "min-h-screen", "bg-gradient-to-br", "from-slate-100", "via-white", "to-orange-50", "dark:from-slate-950", "dark:via-slate-900", "dark:to-slate-950", "p-6"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-5", "mb-8"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white", "tracking-tight"], [1, "text-slate-500", "dark:text-slate-400", "mt-1"], [1, "flex", "flex-wrap", "gap-3"], [1, "px-5", "py-3", "rounded-2xl", "bg-orange-500", "hover:bg-orange-600", "text-white", "font-semibold", "shadow-lg", "shadow-orange-500/30", "transition-all", "duration-300", "hover:-translate-y-1"], [1, "bg-white/80", "dark:bg-slate-900/90", "backdrop-blur-xl", "rounded-[32px]", "border", "border-white/40", "dark:border-slate-800", "shadow-[0_20px_60px_rgba(0,0,0,0.08)]", "overflow-hidden"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-5", "p-6", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-4"], ["type", "button", 1, "h-12", "w-12", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-orange-50", "dark:hover:bg-slate-700", "transition-all", "duration-300", "hover:scale-105", 3, "click"], [1, "material-symbols-outlined", "text-[22px]", "text-slate-700", "dark:text-white"], [1, "min-w-[170px]"], [1, "text-2xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-sm", "text-slate-500", "dark:text-slate-400"], [1, "flex", "flex-wrap", "items-center", "gap-4"], [1, "flex", "items-center", "gap-2"], [1, "w-3", "h-3", "rounded-full", "bg-orange-500"], [1, "text-sm", "text-slate-600", "dark:text-slate-300"], [1, "w-3", "h-3", "rounded-full", "bg-blue-500"], [1, "w-3", "h-3", "rounded-full", "bg-emerald-500"], [1, "w-3", "h-3", "rounded-full", "bg-red-500"], [1, "grid", "grid-cols-7", "gap-px", "bg-slate-200", "dark:bg-slate-800"], [1, "bg-slate-50", "dark:bg-slate-900", "py-4", "text-center", "text-sm", "font-bold", "text-slate-500", "dark:text-slate-400"], ["class", "min-h-[170px] bg-white dark:bg-slate-900 p-3 hover:bg-orange-50/40 dark:hover:bg-slate-800 transition-all duration-300 relative", 4, "ngFor", "ngForOf"], [1, "min-h-[170px]", "bg-white", "dark:bg-slate-900", "p-3", "hover:bg-orange-50/40", "dark:hover:bg-slate-800", "transition-all", "duration-300", "relative"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-200"], ["class", "px-2 py-1 text-[10px] rounded-full bg-orange-500 text-white font-bold", 4, "ngIf"], [1, "space-y-2"], ["class", "p-2 rounded-xl text-xs font-semibold text-white shadow-md truncate", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "px-2", "py-1", "text-[10px]", "rounded-full", "bg-orange-500", "text-white", "font-bold"], [1, "p-2", "rounded-xl", "text-xs", "font-semibold", "text-white", "shadow-md", "truncate", 3, "ngClass"]], template: function Calendar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, " Construction Calendar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Project schedule, labor planning & site activities ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "button", 5);
      \u0275\u0275text(9, " + Add Activity ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "div", 8)(13, "button", 9);
      \u0275\u0275listener("click", function Calendar_Template_button_click_13_listener() {
        return ctx.previousMonth();
      });
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 11)(17, "h2", 12);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p", 13);
      \u0275\u0275text(20, " Site Work Timeline ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "button", 9);
      \u0275\u0275listener("click", function Calendar_Template_button_click_21_listener() {
        return ctx.nextMonth();
      });
      \u0275\u0275elementStart(22, "span", 10);
      \u0275\u0275text(23, " chevron_right ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 14)(25, "div", 15);
      \u0275\u0275element(26, "div", 16);
      \u0275\u0275elementStart(27, "span", 17);
      \u0275\u0275text(28, " Concrete Work ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 15);
      \u0275\u0275element(30, "div", 18);
      \u0275\u0275elementStart(31, "span", 17);
      \u0275\u0275text(32, " Electrical ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 15);
      \u0275\u0275element(34, "div", 19);
      \u0275\u0275elementStart(35, "span", 17);
      \u0275\u0275text(36, " Plumbing ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 15);
      \u0275\u0275element(38, "div", 20);
      \u0275\u0275elementStart(39, "span", 17);
      \u0275\u0275text(40, " Deadline ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "div", 21)(42, "div", 22);
      \u0275\u0275text(43, " Sun ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 22);
      \u0275\u0275text(45, " Mon ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 22);
      \u0275\u0275text(47, " Tue ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 22);
      \u0275\u0275text(49, " Wed ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 22);
      \u0275\u0275text(51, " Thu ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 22);
      \u0275\u0275text(53, " Fri ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div", 22);
      \u0275\u0275text(55, " Sat ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 21);
      \u0275\u0275template(57, Calendar_div_57_Template, 7, 3, "div", 23);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(18);
      \u0275\u0275textInterpolate2(" ", ctx.months[ctx.currentMonth], " ", ctx.currentYear, " ");
      \u0275\u0275advance(39);
      \u0275\u0275property("ngForOf", ctx.calendarDays);
    }
  }, dependencies: [NgClass, NgForOf, NgIf], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Calendar, [{
    type: Component,
    args: [{ selector: "app-calendar", standalone: false, template: `<!-- Construction Calendar UI -->\r
<div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">\r
\r
  <!-- Header -->\r
  <div\r
    class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">\r
\r
    <div>\r
      <h1\r
        class="text-3xl font-black text-slate-800 dark:text-white tracking-tight">\r
        Construction Calendar\r
      </h1>\r
\r
      <p class="text-slate-500 dark:text-slate-400 mt-1">\r
        Project schedule, labor planning & site activities\r
      </p>\r
    </div>\r
\r
    <!-- Actions -->\r
    <div class="flex flex-wrap gap-3">\r
\r
      <button\r
        class="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1">\r
        + Add Activity\r
      </button>\r
\r
    </div>\r
\r
  </div>\r
\r
  <!-- Calendar Card -->\r
  <div\r
    class="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl rounded-[32px] border border-white/40 dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">\r
\r
    <!-- Top -->\r
  <div\r
  class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-6 border-b border-slate-200 dark:border-slate-800">\r
\r
  <!-- Month -->\r
  <div class="flex items-center gap-4">\r
\r
    <!-- PREVIOUS -->\r
    <button\r
      type="button"\r
      (click)="previousMonth()"\r
      class="h-12 w-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105">\r
\r
      <span\r
        class="material-symbols-outlined text-[22px] text-slate-700 dark:text-white">\r
        chevron_left\r
      </span>\r
\r
    </button>\r
\r
    <!-- MONTH -->\r
    <div class="min-w-[170px]">\r
\r
      <h2\r
        class="text-2xl font-black text-slate-800 dark:text-white">\r
\r
        {{ months[currentMonth] }} {{ currentYear }}\r
\r
      </h2>\r
\r
      <p\r
        class="text-sm text-slate-500 dark:text-slate-400">\r
        Site Work Timeline\r
      </p>\r
\r
    </div>\r
\r
    <!-- NEXT -->\r
    <button\r
      type="button"\r
      (click)="nextMonth()"\r
      class="h-12 w-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105">\r
\r
      <span\r
        class="material-symbols-outlined text-[22px] text-slate-700 dark:text-white">\r
        chevron_right\r
      </span>\r
\r
    </button>\r
\r
  </div>\r
\r
  <!-- Legend -->\r
  <div class="flex flex-wrap items-center gap-4">\r
\r
    <div class="flex items-center gap-2">\r
      <div class="w-3 h-3 rounded-full bg-orange-500"></div>\r
\r
      <span class="text-sm text-slate-600 dark:text-slate-300">\r
        Concrete Work\r
      </span>\r
    </div>\r
\r
    <div class="flex items-center gap-2">\r
      <div class="w-3 h-3 rounded-full bg-blue-500"></div>\r
\r
      <span class="text-sm text-slate-600 dark:text-slate-300">\r
        Electrical\r
      </span>\r
    </div>\r
\r
    <div class="flex items-center gap-2">\r
      <div class="w-3 h-3 rounded-full bg-emerald-500"></div>\r
\r
      <span class="text-sm text-slate-600 dark:text-slate-300">\r
        Plumbing\r
      </span>\r
    </div>\r
\r
    <div class="flex items-center gap-2">\r
      <div class="w-3 h-3 rounded-full bg-red-500"></div>\r
\r
      <span class="text-sm text-slate-600 dark:text-slate-300">\r
        Deadline\r
      </span>\r
    </div>\r
\r
  </div>\r
\r
</div>\r
\r
    <!-- Week Days -->\r
    <div\r
      class="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800">\r
\r
      <div\r
        class="bg-slate-50 dark:bg-slate-900 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">\r
        Sun\r
      </div>\r
\r
      <div\r
        class="bg-slate-50 dark:bg-slate-900 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">\r
        Mon\r
      </div>\r
\r
      <div\r
        class="bg-slate-50 dark:bg-slate-900 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">\r
        Tue\r
      </div>\r
\r
      <div\r
        class="bg-slate-50 dark:bg-slate-900 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">\r
        Wed\r
      </div>\r
\r
      <div\r
        class="bg-slate-50 dark:bg-slate-900 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">\r
        Thu\r
      </div>\r
\r
      <div\r
        class="bg-slate-50 dark:bg-slate-900 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">\r
        Fri\r
      </div>\r
\r
      <div\r
        class="bg-slate-50 dark:bg-slate-900 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">\r
        Sat\r
      </div>\r
\r
    </div>\r
\r
    <!-- Calendar Grid -->\r
    <div\r
      class="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800">\r
\r
      <!-- Day -->\r
      <div\r
        *ngFor="let day of calendarDays"\r
        class="min-h-[170px] bg-white dark:bg-slate-900 p-3 hover:bg-orange-50/40 dark:hover:bg-slate-800 transition-all duration-300 relative">\r
\r
        <!-- Date -->\r
        <div class="flex items-center justify-between mb-3">\r
\r
          <span\r
            class="text-sm font-bold text-slate-700 dark:text-slate-200">\r
            {{ day.date }}\r
          </span>\r
\r
          <span\r
            *ngIf="day.today"\r
            class="px-2 py-1 text-[10px] rounded-full bg-orange-500 text-white font-bold">\r
            Today\r
          </span>\r
\r
        </div>\r
\r
        <!-- Events -->\r
        <div class="space-y-2">\r
\r
          <!-- Event -->\r
          <div\r
            *ngFor="let event of day.events"\r
            class="p-2 rounded-xl text-xs font-semibold text-white shadow-md truncate"\r
           [ngClass]="{\r
             'bg-orange-500': event.type === 'concrete',\r
             'bg-blue-500': event.type === 'electrical',\r
             'bg-emerald-500': event.type === 'plumbing',\r
             'bg-red-500': event.type === 'deadline',\r
             'bg-purple-500': event.type === 'holiday'\r
           }">\r
\r
            {{ event.title }}\r
  \r
          </div>\r
\r
        </div>\r
\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Calendar, { className: "Calendar", filePath: "app/modules/calendar/calendar.ts", lineNumber: 9 });
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
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, CalendarRoutingModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarModule, [{
    type: NgModule,
    args: [{
      declarations: [Calendar],
      imports: [CommonModule, CalendarRoutingModule]
    }]
  }], null, null);
})();
export {
  CalendarModule
};
//# sourceMappingURL=chunk-4GWLGOGH.js.map
