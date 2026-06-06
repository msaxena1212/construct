import {
  require_sweetalert2_all
} from "./chunk-W7VRJKX7.js";
import {
  CommonDialogComponent
} from "./chunk-WS53KIOQ.js";
import {
  MaterialModule
} from "./chunk-33HPODTN.js";
import "./chunk-5YJQBWTN.js";
import "./chunk-E3SOVO5U.js";
import {
  MatIcon
} from "./chunk-ZGY4FKYW.js";
import {
  MatButton
} from "./chunk-Y354W3EZ.js";
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
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-WFU7JF4C.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  NgClass,
  NgIf,
  NgModule,
  RouterModule,
  __spreadProps,
  __spreadValues,
  __toESM,
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
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F27QM527.js";

// src/app/modules/menu-management/menu-management.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/modules/menu-management/services/menu.service.ts
var MenuService = class _MenuService {
  http;
  baseUrl = environment.serverUrl + "/api/v1/modules";
  constructor(http) {
    this.http = http;
  }
  getMenus() {
    return this.http.get(this.baseUrl);
  }
  createMenu(data) {
    return this.http.post(this.baseUrl, data);
  }
  updateMenu(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deleteMenu(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  static \u0275fac = function MenuService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MenuService, factory: _MenuService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/menu-management/menu-management.ts
var _forTrack0 = ($index, $item) => $item.id;
function MenuManagement_For_33_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 67);
  }
}
function MenuManagement_For_33_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275element(1, "div", 69);
    \u0275\u0275elementStart(2, "span", 70);
    \u0275\u0275text(3, " \u21B3 ");
    \u0275\u0275elementEnd()();
  }
}
function MenuManagement_For_33_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1, " Parent ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_For_33_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1, " Child ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_For_33_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const menu_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u21B3 ", ctx_r2.getParentName(menu_r2.parentId), " ");
  }
}
function MenuManagement_For_33_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275text(1, " Top Level ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 13)(1, "td", 41);
    \u0275\u0275template(2, MenuManagement_For_33_div_2_Template, 1, 0, "div", 42);
    \u0275\u0275elementStart(3, "div", 43);
    \u0275\u0275template(4, MenuManagement_For_33_div_4_Template, 4, 0, "div", 44);
    \u0275\u0275elementStart(5, "div", 45)(6, "span", 46);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "div", 47);
    \u0275\u0275template(10, MenuManagement_For_33_span_10_Template, 2, 0, "span", 48)(11, MenuManagement_For_33_span_11_Template, 2, 0, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h4", 50);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 51);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "td", 52)(17, "span", 53);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 52)(20, "div")(21, "p", 54);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 55);
    \u0275\u0275text(24, " Route Path ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "td", 52);
    \u0275\u0275template(26, MenuManagement_For_33_span_26_Template, 2, 1, "span", 56)(27, MenuManagement_For_33_span_27_Template, 2, 0, "span", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 58)(29, "div", 59);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "td", 58)(32, "span", 60);
    \u0275\u0275element(33, "span", 61);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "td", 62)(36, "div", 63)(37, "button", 64);
    \u0275\u0275listener("click", function MenuManagement_For_33_Template_button_click_37_listener() {
      const menu_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editMenu(menu_r2));
    });
    \u0275\u0275elementStart(38, "span", 65);
    \u0275\u0275text(39, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "button", 66);
    \u0275\u0275listener("click", function MenuManagement_For_33_Template_button_click_40_listener() {
      const menu_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteMenu(menu_r2.id));
    });
    \u0275\u0275elementStart(41, "span", 65);
    \u0275\u0275text(42, " delete ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", menu_r2.depth > 0);
    \u0275\u0275advance();
    \u0275\u0275styleProp("padding-left", menu_r2.depth * 22, "px");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", menu_r2.depth > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", menu_r2.depth > 0 ? "bg-violet-100 text-violet-600" : "bg-primary/10 text-primary");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", menu_r2.icon || "dashboard", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", menu_r2.depth === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", menu_r2.depth > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", menu_r2.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Module ID : #", menu_r2.id, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", menu_r2.title || "-", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", menu_r2.path || "-", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", menu_r2.parentId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !menu_r2.parentId);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", menu_r2.order, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", menu_r2.status ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", menu_r2.status ? "bg-green-500" : "bg-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", menu_r2.status ? "ACTIVE" : "INACTIVE", " ");
  }
}
function MenuManagement_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "div", 76)(2, "span", 77);
    \u0275\u0275text(3, " dashboard_customize ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 78);
    \u0275\u0275text(5, " No Modules Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 79);
    \u0275\u0275text(7, " Create your first sidebar module ");
    \u0275\u0275elementEnd()();
  }
}
function MenuManagement_p_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 80);
    \u0275\u0275text(1, " Module Name is required ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_For_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const menu_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", menu_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", menu_r4.depth > 0 ? "\u21B3 ".repeat(menu_r4.depth) : "", " ", menu_r4.name, " ");
  }
}
var MenuManagement = class _MenuManagement {
  fb;
  menuService;
  toast;
  isEditing = false;
  editingId = null;
  // MODAL
  showModal = false;
  menuForm;
  menus = [];
  displayedColumns = [
    "id",
    "name",
    "title",
    "path",
    "icon",
    "parent",
    "order",
    "status",
    "actions"
  ];
  constructor(fb, menuService, toast) {
    this.fb = fb;
    this.menuService = menuService;
    this.toast = toast;
  }
  ngOnInit() {
    this.initForm();
    this.loadMenus();
  }
  initForm() {
    this.menuForm = this.fb.group({
      name: ["", Validators.required],
      title: [""],
      path: [""],
      icon: ["domain"],
      order: [0],
      parentId: [null],
      status: [true]
    });
  }
  // =========================
  // LOAD MENUS
  // =========================
  loadMenus() {
    this.menuService.getMenus().subscribe({
      next: (res) => {
        this.menus = this.buildHierarchy(res.data);
      },
      error: () => {
        this.toast.error("Failed to load available menus");
      }
    });
  }
  // =========================
  // HIERARCHY
  // =========================
  buildHierarchy(rawMenus) {
    const map = /* @__PURE__ */ new Map();
    const roots = [];
    rawMenus.forEach((menu) => {
      map.set(menu.id, __spreadProps(__spreadValues({}, menu), {
        children: []
      }));
    });
    rawMenus.forEach((menu) => {
      if (menu.parentId && map.has(menu.parentId)) {
        map.get(menu.parentId).children.push(map.get(menu.id));
      } else {
        roots.push(map.get(menu.id));
      }
    });
    const flattenedList = [];
    const flatten = (items, depth = 0) => {
      items.sort((a, b) => a.order - b.order);
      items.forEach((item) => {
        item.depth = depth;
        flattenedList.push(item);
        if (item.children?.length > 0) {
          flatten(item.children, depth + 1);
        }
      });
    };
    flatten(roots, 0);
    return flattenedList;
  }
  // =========================
  // GET PARENT NAME
  // =========================
  getParentName(parentId) {
    if (!parentId)
      return "None";
    const parent = this.menus.find((m) => m.id === parentId);
    return parent ? parent.name : "Unknown";
  }
  // =========================
  // OPEN CREATE MODAL
  // =========================
  openCreateModal() {
    this.isEditing = false;
    this.editingId = null;
    this.menuForm.reset({
      icon: "domain",
      order: 0,
      status: true,
      parentId: null
    });
    this.showModal = true;
  }
  // =========================
  // OPEN EDIT MODAL
  // =========================
  editMenu(menu) {
    this.isEditing = true;
    this.editingId = menu.id;
    this.menuForm.patchValue({
      name: menu.name,
      title: menu.title,
      path: menu.path,
      icon: menu.icon,
      order: menu.order,
      parentId: menu.parentId,
      status: menu.status
    });
    this.showModal = true;
  }
  // =========================
  // CLOSE MODAL
  // =========================
  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.editingId = null;
    this.menuForm.reset({
      icon: "domain",
      order: 0,
      status: true,
      parentId: null
    });
  }
  // =========================
  // DELETE
  // =========================
  deleteMenu(id) {
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: "This will permanently delete the module.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.deleteMenu(id).subscribe({
          next: () => {
            this.toast.success("Module deleted successfully");
            this.loadMenus();
          },
          error: (err) => {
            this.toast.error(err.error?.message || "Failed to delete module");
          }
        });
      }
    });
  }
  // editMenu(menu: any) {
  //   this.isEditing = true;
  //   this.editingId = menu.id;
  //   this.menuForm.patchValue({
  //     name: menu.name,
  //     title: menu.title,
  //     path: menu.path,
  //     icon: menu.icon,
  //     order: menu.order,
  //     parentId: menu.parentId,
  //     status: menu.status
  //   });
  // }
  // =========================
  // SUBMIT
  // =========================
  onSubmit() {
    if (this.menuForm.invalid) {
      this.toast.error("Please fill all required fields");
      return;
    }
    if (this.isEditing && this.editingId) {
      this.menuService.updateMenu(this.editingId, this.menuForm.value).subscribe({
        next: (res) => {
          this.toast.success(res.message || "Menu updated successfully!");
          this.closeModal();
          this.loadMenus();
        },
        error: (err) => {
          this.toast.error(err.error?.message || "Failed to update menu");
        }
      });
    } else {
      this.menuService.createMenu(this.menuForm.value).subscribe({
        next: (res) => {
          this.toast.success(res.message || "Menu created successfully!");
          this.closeModal();
          this.loadMenus();
        },
        error: (err) => {
          this.toast.error(err.error?.message || "Failed to create menu");
        }
      });
    }
  }
  static \u0275fac = function MenuManagement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuManagement)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MenuService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MenuManagement, selectors: [["app-menu-management"]], standalone: false, decls: 93, vars: 10, consts: [[1, "menu-management-container"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-5", "mb-8"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "mt-1", "text-sm", "font-medium"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "overflow-x-auto", "px-2", "pb-4"], [1, "w-full", "min-w-[1350px]", "border-separate", "border-spacing-y-3"], [1, "px-6", "py-4", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "px-6", "py-4", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "px-6", "py-4", "text-right", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "group", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], ["class", "flex flex-col items-center justify-center py-24", 4, "ngIf"], [1, "flex", "justify-end", "mb-5"], ["mat-raised-button", "", "color", "primary", 1, "!rounded-2xl", "!px-6", "!py-3", 3, "click"], ["maxWidth", "max-w-3xl", "backdropClass", "bg-slate-900/50", "panelClass", "relative rounded-[32px] bg-white dark:bg-slate-900 animate-in zoom-in-95 duration-300", 3, "closed", "open"], [1, "absolute", "inset-x-0", "top-0", "h-1", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container"], [1, "flex", "items-center", "justify-between", "px-8", "py-6", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "text-2xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-sm", "text-slate-400", "mt-1", "font-medium"], [1, "w-11", "h-11", "rounded-2xl", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", "flex", "items-center", "justify-center", 3, "click"], [1, "material-symbols-outlined"], [1, "p-8", "max-h-[80vh]", "overflow-y-auto"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-2", "block"], ["formControlName", "name", "type", "text", "placeholder", "e.g. USER_MANAGEMENT", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], ["class", "text-red-500 text-xs mt-2 font-semibold", 4, "ngIf"], ["formControlName", "title", "type", "text", "placeholder", "e.g. User Management", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], ["formControlName", "path", "type", "text", "placeholder", "e.g. /master/users", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-5"], [1, "relative"], ["formControlName", "icon", "type", "text", "placeholder", "e.g. dashboard", 1, "w-full", "pl-5", "pr-14", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], [1, "material-symbols-outlined", "absolute", "right-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["formControlName", "order", "type", "number", "placeholder", "0", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], ["formControlName", "parentId", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], [3, "ngValue"], [1, "flex", "items-center", "justify-end", "gap-4", "pt-6", "border-t", "border-slate-200", "dark:border-slate-800"], ["type", "button", 1, "px-6", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "text-sm", "font-bold", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-all", 3, "click"], ["type", "submit", 1, "px-7", "py-3", "rounded-2xl", "bg-gradient-to-r", "from-primary", "to-primary-container", "text-white", "text-sm", "font-black", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-all", "flex", "items-center", "gap-2", "disabled:opacity-50", "disabled:hover:scale-100", 3, "disabled"], [1, "px-6", "py-5", "rounded-l-3xl", "border-y", "border-l", "border-slate-200", "dark:border-slate-800", "relative"], ["class", "absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-violet-500", 4, "ngIf"], [1, "flex", "items-center", "gap-4"], ["class", "flex items-center gap-1 shrink-0 text-violet-500", 4, "ngIf"], [1, "w-12", "h-12", "rounded-2xl", "flex", "items-center", "justify-center", "group-hover:scale-110", "transition-transform", "duration-300", 3, "ngClass"], [1, "material-symbols-outlined", "text-[22px]"], [1, "flex", "items-center", "gap-2", "mb-1"], ["class", "px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-wider", 4, "ngIf"], ["class", "px-2 py-0.5 rounded-lg bg-violet-100 text-violet-700 text-[9px] font-black uppercase tracking-wider", 4, "ngIf"], [1, "font-black", "text-sm", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "text-xs", "text-slate-400", "font-medium", "mt-1"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "px-3", "py-1.5", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "font-black", "text-slate-800", "dark:text-white", "text-sm"], [1, "text-[11px]", "text-slate-400", "font-bold", "uppercase", "tracking-wide"], ["class", "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-[11px] font-black uppercase tracking-wide", 4, "ngIf"], ["class", "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-black uppercase tracking-wide", 4, "ngIf"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800", "text-center"], [1, "w-11", "h-11", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center", "mx-auto", "font-black"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-black", "uppercase", "tracking-wide", "border", 3, "ngClass"], [1, "w-2", "h-2", "rounded-full", 3, "ngClass"], [1, "px-6", "py-5", "rounded-r-3xl", "border-y", "border-r", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-end", "gap-2"], [1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "absolute", "left-0", "top-3", "bottom-3", "w-1.5", "rounded-r-full", "bg-violet-500"], [1, "flex", "items-center", "gap-1", "shrink-0", "text-violet-500"], [1, "w-5", "h-[2px]", "bg-violet-400", "rounded-full"], [1, "text-lg", "font-black"], [1, "px-2", "py-0.5", "rounded-lg", "bg-emerald-100", "text-emerald-700", "text-[9px]", "font-black", "uppercase", "tracking-wider"], [1, "px-2", "py-0.5", "rounded-lg", "bg-violet-100", "text-violet-700", "text-[9px]", "font-black", "uppercase", "tracking-wider"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "bg-violet-100", "text-violet-700", "border", "border-violet-200", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "bg-slate-100", "text-slate-600", "border", "border-slate-200", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "flex", "flex-col", "items-center", "justify-center", "py-24"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-2"], [1, "text-red-500", "text-xs", "mt-2", "font-semibold"]], template: function MenuManagement_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, " Module & Menu Management ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Configure sidebar menus with nesting, sorting and permissions. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_7_listener() {
        return ctx.openCreateModal();
      });
      \u0275\u0275element(8, "div", 5);
      \u0275\u0275elementStart(9, "div", 6)(10, "span", 7);
      \u0275\u0275text(11, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275text(12, " Create Module ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8)(14, "table", 9)(15, "thead")(16, "tr")(17, "th", 10);
      \u0275\u0275text(18, " Module ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th", 10);
      \u0275\u0275text(20, " Title ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th", 10);
      \u0275\u0275text(22, " Path ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 10);
      \u0275\u0275text(24, " Parent ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 11);
      \u0275\u0275text(26, " Order ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th", 11);
      \u0275\u0275text(28, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th", 12);
      \u0275\u0275text(30, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "tbody");
      \u0275\u0275repeaterCreate(32, MenuManagement_For_33_Template, 43, 18, "tr", 13, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(34, MenuManagement_div_34_Template, 8, 0, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 15)(36, "button", 16);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_36_listener() {
        return ctx.openCreateModal();
      });
      \u0275\u0275elementStart(37, "mat-icon");
      \u0275\u0275text(38, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(39, " Create Module ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "app-common-dialog", 17);
      \u0275\u0275listener("closed", function MenuManagement_Template_app_common_dialog_closed_40_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275element(41, "div", 18);
      \u0275\u0275elementStart(42, "div", 19)(43, "div")(44, "h2", 20);
      \u0275\u0275text(45);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p", 21);
      \u0275\u0275text(47, " Configure sidebar modules & navigation hierarchy ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "button", 22);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_48_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275elementStart(49, "span", 23);
      \u0275\u0275text(50, " close ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(51, "div", 24)(52, "form", 25);
      \u0275\u0275listener("ngSubmit", function MenuManagement_Template_form_ngSubmit_52_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(53, "div")(54, "label", 26);
      \u0275\u0275text(55, " Module Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(56, "input", 27);
      \u0275\u0275template(57, MenuManagement_p_57_Template, 2, 0, "p", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div")(59, "label", 26);
      \u0275\u0275text(60, " Display Title ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(61, "input", 29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "div")(63, "label", 26);
      \u0275\u0275text(64, " Route Path ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(65, "input", 30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 31)(67, "div")(68, "label", 26);
      \u0275\u0275text(69, " Material Icon ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div", 32);
      \u0275\u0275element(71, "input", 33);
      \u0275\u0275elementStart(72, "span", 34);
      \u0275\u0275text(73);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(74, "div")(75, "label", 26);
      \u0275\u0275text(76, " Sort Order ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(77, "input", 35);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "div")(79, "label", 26);
      \u0275\u0275text(80, " Parent Module ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "select", 36)(82, "option", 37);
      \u0275\u0275text(83, " -- Top Level -- ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(84, MenuManagement_For_85_Template, 2, 3, "option", 37, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(86, "div", 38)(87, "button", 39);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_87_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275text(88, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "button", 40)(90, "span", 7);
      \u0275\u0275text(91);
      \u0275\u0275elementEnd();
      \u0275\u0275text(92);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(32);
      \u0275\u0275repeater(ctx.menus);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.menus.length === 0);
      \u0275\u0275advance(6);
      \u0275\u0275property("open", ctx.showModal);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Update Module" : "Create New Module", " ");
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.menuForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.menuForm.get("name")) == null ? null : tmp_5_0.hasError("required")) && ((tmp_5_0 = ctx.menuForm.get("name")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx.menuForm.get("icon")) == null ? null : tmp_6_0.value) || "dashboard", " ");
      \u0275\u0275advance(9);
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.menus);
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.menuForm.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "save" : "add_circle", " ");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Update Module" : "Create Module", " ");
    }
  }, dependencies: [NgClass, NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButton, MatIcon, CommonDialogComponent], styles: ['\n.menu-management-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 64px);\n  font-family:\n    "Roboto",\n    "Outfit",\n    sans-serif;\n}\n.header-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.header-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0 0 8px 0;\n}\n.header-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0;\n  font-size: 15px;\n}\n.split-view[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.form-card[_ngcontent-%COMP%] {\n  flex: 1 1 350px;\n  min-width: 300px;\n  max-width: 450px;\n  border-radius: 12px;\n}\n.form-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background-color: #003b4d;\n  padding: 16px 20px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 20px -16px;\n}\n.form-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  color: white;\n  margin: 0;\n  font-size: 18px;\n}\n.menu-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.row-fields[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.half-width[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 24px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.table-card[_ngcontent-%COMP%] {\n  flex: 2 1 600px;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 0px;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  color: #0f172a;\n  margin: 0;\n  font-size: 18px;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n.table-container[_ngcontent-%COMP%] {\n  max-height: calc(100vh - 250px);\n  overflow: auto;\n  border-radius: 0 0 12px 12px;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.table-container[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%] {\n  background-color: #f8fafc;\n  color: #475569;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.table-container[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-container[_ngcontent-%COMP%]   .interactive-row[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n}\n.tree-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.tree-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  color: #94a3b8;\n  margin-right: 6px;\n  margin-top: -4px;\n}\n.hierarchical-option[_ngcontent-%COMP%] {\n  font-family: inherit;\n}\n.l-arrow[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  font-weight: bold;\n}\n.dim[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.light-code[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 12px;\n  color: #334155;\n}\n.preview-icon[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  font-size: 20px;\n  height: 20px;\n  width: 20px;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: #0284c7;\n}\n.order-box[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  border: 1px solid #cbd5e1;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 13px;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  display: inline-block;\n}\n.badge.active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #166534;\n}\n.badge.inactive[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.badge.badge-parent[_ngcontent-%COMP%] {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.badge.top-level[_ngcontent-%COMP%] {\n  background-color: #f1f5f9;\n  color: #64748b;\n  border: 1px dashed #cbd5e1;\n}\n.no-data[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n/*# sourceMappingURL=menu-management.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuManagement, [{
    type: Component,
    args: [{ selector: "app-menu-management", standalone: false, template: `<div class="menu-management-container">\r
\r
  <!-- Header -->\r
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">\r
\r
    <div>\r
      <h2 class="text-3xl font-black text-slate-800 dark:text-white">\r
        Module & Menu Management\r
      </h2>\r
\r
      <p class="text-slate-500 mt-1 text-sm font-medium">\r
        Configure sidebar menus with nesting, sorting and permissions.\r
      </p>\r
    </div>\r
\r
    <!-- Create Button -->\r
    <button (click)="openCreateModal()"\r
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
\r
      Create Module\r
\r
    </button>\r
\r
  </div>\r
\r
  <!-- Table -->\r
  <div class="overflow-x-auto px-2 pb-4">\r
\r
    <table class="w-full min-w-[1350px] border-separate border-spacing-y-3">\r
\r
      <!-- Head -->\r
      <thead>\r
\r
        <tr>\r
\r
          <th class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Module\r
          </th>\r
\r
          <th class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Title\r
          </th>\r
\r
          <th class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Path\r
          </th>\r
\r
          <th class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Parent\r
          </th>\r
\r
          <th class="px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Order\r
          </th>\r
\r
          <th class="px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Status\r
          </th>\r
\r
          <th class="px-6 py-4 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Actions\r
          </th>\r
\r
        </tr>\r
\r
      </thead>\r
\r
      <!-- Body -->\r
      <tbody>\r
\r
        @for (menu of menus; track menu.id) {\r
\r
        <tr\r
          class="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
          <!-- Module -->\r
          <td class="px-6 py-5 rounded-l-3xl border-y border-l border-slate-200 dark:border-slate-800 relative">\r
\r
            <!-- Left Border Child -->\r
            <div *ngIf="menu.depth > 0" class="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-violet-500">\r
            </div>\r
\r
            <div class="flex items-center gap-4" [style.padding-left.px]="menu.depth * 22">\r
\r
              <!-- Child Arrow -->\r
              <div *ngIf="menu.depth > 0" class="flex items-center gap-1 shrink-0 text-violet-500">\r
\r
                <div class="w-5 h-[2px] bg-violet-400 rounded-full"></div>\r
\r
                <span class="text-lg font-black">\r
                  \u21B3\r
                </span>\r
\r
              </div>\r
\r
              <!-- Icon -->\r
              <div\r
                class="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"\r
                [ngClass]="menu.depth > 0\r
                ? 'bg-violet-100 text-violet-600'\r
                : 'bg-primary/10 text-primary'">\r
\r
                <span class="material-symbols-outlined text-[22px]">\r
                  {{ menu.icon || 'dashboard' }}\r
                </span>\r
\r
              </div>\r
\r
              <!-- Info -->\r
              <div>\r
\r
                <!-- Parent / Child Badge -->\r
                <div class="flex items-center gap-2 mb-1">\r
\r
                  <span *ngIf="menu.depth === 0"\r
                    class="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-wider">\r
\r
                    Parent\r
\r
                  </span>\r
\r
                  <span *ngIf="menu.depth > 0"\r
                    class="px-2 py-0.5 rounded-lg bg-violet-100 text-violet-700 text-[9px] font-black uppercase tracking-wider">\r
\r
                    Child\r
\r
                  </span>\r
\r
                </div>\r
\r
                <!-- Name -->\r
                <h4\r
                  class="font-black text-sm text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                  {{ menu.name }}\r
\r
                </h4>\r
\r
                <!-- Extra -->\r
                <p class="text-xs text-slate-400 font-medium mt-1">\r
\r
                  Module ID : #{{ menu.id }}\r
\r
                </p>\r
\r
              </div>\r
\r
            </div>\r
\r
          </td>\r
\r
          <!-- Title -->\r
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800">\r
\r
            <span\r
              class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide">\r
\r
              {{ menu.title || '-' }}\r
\r
            </span>\r
\r
          </td>\r
\r
          <!-- Path -->\r
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800">\r
\r
            <div>\r
\r
              <p class="font-black text-slate-800 dark:text-white text-sm">\r
\r
                {{ menu.path || '-' }}\r
\r
              </p>\r
\r
              <p class="text-[11px] text-slate-400 font-bold uppercase tracking-wide">\r
\r
                Route Path\r
\r
              </p>\r
\r
            </div>\r
\r
          </td>\r
\r
          <!-- Parent -->\r
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800">\r
\r
            <span *ngIf="menu.parentId"\r
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-[11px] font-black uppercase tracking-wide">\r
\r
              \u21B3 {{ getParentName(menu.parentId) }}\r
\r
            </span>\r
\r
            <span *ngIf="!menu.parentId"\r
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-black uppercase tracking-wide">\r
\r
              Top Level\r
\r
            </span>\r
\r
          </td>\r
\r
          <!-- Order -->\r
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 text-center">\r
\r
            <div\r
              class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto font-black">\r
\r
              {{ menu.order }}\r
\r
            </div>\r
\r
          </td>\r
\r
          <!-- Status -->\r
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 text-center">\r
\r
            <span\r
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide border"\r
              [ngClass]="menu.status\r
              ? 'bg-green-50 text-green-700 border-green-200'\r
              : 'bg-red-50 text-red-700 border-red-200'">\r
\r
              <span class="w-2 h-2 rounded-full" [ngClass]="menu.status\r
                ? 'bg-green-500'\r
                : 'bg-red-500'">\r
              </span>\r
\r
              {{ menu.status ? 'ACTIVE' : 'INACTIVE' }}\r
\r
            </span>\r
\r
          </td>\r
\r
          <!-- Actions -->\r
          <td class="px-6 py-5 rounded-r-3xl border-y border-r border-slate-200 dark:border-slate-800">\r
\r
            <div class="flex items-center justify-end gap-2">\r
\r
              <!-- Edit -->\r
              <button (click)="editMenu(menu)"\r
                class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                <span class="material-symbols-outlined text-[18px]">\r
                  edit\r
                </span>\r
\r
              </button>\r
\r
              <!-- Delete -->\r
              <button (click)="deleteMenu(menu.id)"\r
                class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                <span class="material-symbols-outlined text-[18px]">\r
                  delete\r
                </span>\r
\r
              </button>\r
\r
            </div>\r
\r
          </td>\r
\r
        </tr>\r
\r
        }\r
\r
      </tbody>\r
\r
    </table>\r
\r
    <!-- Empty -->\r
    <div *ngIf="menus.length === 0" class="flex flex-col items-center justify-center py-24">\r
\r
      <div\r
        class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 shadow-inner">\r
\r
        <span class="material-symbols-outlined text-5xl text-slate-400">\r
\r
          dashboard_customize\r
\r
        </span>\r
\r
      </div>\r
\r
      <p class="text-xl font-black text-slate-700 dark:text-slate-200">\r
\r
        No Modules Found\r
\r
      </p>\r
\r
      <p class="text-sm text-slate-400 mt-2">\r
\r
        Create your first sidebar module\r
\r
      </p>\r
\r
    </div>\r
\r
  </div>\r
\r
  <!-- Create / Edit Button -->\r
  <div class="flex justify-end mb-5">\r
    <button mat-raised-button color="primary" (click)="openCreateModal()" class="!rounded-2xl !px-6 !py-3">\r
\r
      <mat-icon>add</mat-icon>\r
      Create Module\r
\r
    </button>\r
  </div>\r
\r
  <app-common-dialog\r
    [open]="showModal"\r
    maxWidth="max-w-3xl"\r
    backdropClass="bg-slate-900/50"\r
    panelClass="relative rounded-[32px] bg-white dark:bg-slate-900 animate-in zoom-in-95 duration-300"\r
    (closed)="closeModal()"\r
  >\r
\r
      <!-- Top Glow -->\r
      <div\r
        class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-container to-secondary-container">\r
      </div>\r
\r
      <!-- Header -->\r
      <div class="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">\r
\r
        <div>\r
\r
          <h2 class="text-2xl font-black tracking-tight text-slate-800 dark:text-white">\r
\r
            {{ isEditing ? 'Update Module' : 'Create New Module' }}\r
\r
          </h2>\r
\r
          <p class="text-sm text-slate-400 mt-1 font-medium">\r
\r
            Configure sidebar modules & navigation hierarchy\r
\r
          </p>\r
\r
        </div>\r
\r
        <!-- Close -->\r
        <button (click)="closeModal()"\r
          class="w-11 h-11 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center">\r
\r
          <span class="material-symbols-outlined">\r
            close\r
          </span>\r
\r
        </button>\r
\r
      </div>\r
\r
      <!-- Body -->\r
      <div class="p-8 max-h-[80vh] overflow-y-auto">\r
\r
        <form [formGroup]="menuForm" (ngSubmit)="onSubmit()" class="space-y-6">\r
\r
          <!-- Module Name -->\r
          <div>\r
\r
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
\r
              Module Name\r
\r
            </label>\r
\r
            <input formControlName="name" type="text" placeholder="e.g. USER_MANAGEMENT"\r
              class="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">\r
\r
            <p *ngIf="menuForm.get('name')?.hasError('required') && menuForm.get('name')?.touched"\r
              class="text-red-500 text-xs mt-2 font-semibold">\r
\r
              Module Name is required\r
\r
            </p>\r
\r
          </div>\r
\r
          <!-- Display Title -->\r
          <div>\r
\r
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
\r
              Display Title\r
\r
            </label>\r
\r
            <input formControlName="title" type="text" placeholder="e.g. User Management"\r
              class="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">\r
\r
          </div>\r
\r
          <!-- Route -->\r
          <div>\r
\r
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
\r
              Route Path\r
\r
            </label>\r
\r
            <input formControlName="path" type="text" placeholder="e.g. /master/users"\r
              class="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">\r
\r
          </div>\r
\r
          <!-- Row -->\r
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">\r
\r
            <!-- Icon -->\r
            <div>\r
\r
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
\r
                Material Icon\r
\r
              </label>\r
\r
              <div class="relative">\r
\r
                <input formControlName="icon" type="text" placeholder="e.g. dashboard"\r
                  class="w-full pl-5 pr-14 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">\r
\r
                <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">\r
\r
                  {{ menuForm.get('icon')?.value || 'dashboard' }}\r
\r
                </span>\r
\r
              </div>\r
\r
            </div>\r
\r
            <!-- Order -->\r
            <div>\r
\r
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
\r
                Sort Order\r
\r
              </label>\r
\r
              <input formControlName="order" type="number" placeholder="0"\r
                class="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">\r
\r
            </div>\r
\r
          </div>\r
\r
          <!-- Parent Module -->\r
          <div>\r
\r
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
\r
              Parent Module\r
\r
            </label>\r
\r
            <select formControlName="parentId"\r
              class="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">\r
\r
              <option [ngValue]="null">\r
                -- Top Level --\r
              </option>\r
\r
              @for (menu of menus; track menu.id) {\r
\r
              <option [ngValue]="menu.id">\r
\r
                {{ menu.depth > 0 ? '\u21B3 '.repeat(menu.depth) : '' }}\r
                {{ menu.name }}\r
\r
              </option>\r
\r
              }\r
\r
            </select>\r
\r
          </div>\r
\r
          <!-- Footer -->\r
          <div class="flex items-center justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">\r
\r
            <!-- Cancel -->\r
            <button type="button" (click)="closeModal()"\r
              class="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">\r
\r
              Cancel\r
\r
            </button>\r
\r
            <!-- Submit -->\r
            <button type="submit" [disabled]="menuForm.invalid"\r
              class="px-7 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-white text-sm font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100">\r
\r
              <span class="material-symbols-outlined text-[20px]">\r
\r
                {{ isEditing ? 'save' : 'add_circle' }}\r
\r
              </span>\r
\r
              {{ isEditing ? 'Update Module' : 'Create Module' }}\r
\r
            </button>\r
\r
          </div>\r
\r
        </form>\r
\r
      </div>\r
\r
  </app-common-dialog>\r
\r
</div>\r
`, styles: ['/* src/app/modules/menu-management/menu-management.scss */\n.menu-management-container {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 64px);\n  font-family:\n    "Roboto",\n    "Outfit",\n    sans-serif;\n}\n.header-section {\n  margin-bottom: 24px;\n}\n.header-section h2 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0 0 8px 0;\n}\n.header-section p {\n  color: #64748b;\n  margin: 0;\n  font-size: 15px;\n}\n.split-view {\n  display: flex;\n  gap: 24px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.form-card {\n  flex: 1 1 350px;\n  min-width: 300px;\n  max-width: 450px;\n  border-radius: 12px;\n}\n.form-card mat-card-header {\n  background-color: #003b4d;\n  padding: 16px 20px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 20px -16px;\n}\n.form-card mat-card-header mat-card-title {\n  color: white;\n  margin: 0;\n  font-size: 18px;\n}\n.menu-form {\n  display: flex;\n  flex-direction: column;\n}\n.full-width {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.row-fields {\n  display: flex;\n  gap: 16px;\n}\n.half-width {\n  flex: 1;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.form-actions button {\n  padding: 6px 24px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.table-card {\n  flex: 2 1 600px;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.table-card mat-card-header {\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 0px;\n}\n.table-card mat-card-header mat-card-title {\n  color: #0f172a;\n  margin: 0;\n  font-size: 18px;\n}\n.table-card mat-card-content {\n  padding: 0 !important;\n}\n.table-container {\n  max-height: calc(100vh - 250px);\n  overflow: auto;\n  border-radius: 0 0 12px 12px;\n}\n.table-container table {\n  width: 100%;\n}\n.table-container th.mat-header-cell {\n  background-color: #f8fafc;\n  color: #475569;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.table-container td.mat-cell {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-container .interactive-row:hover {\n  background-color: #f1f5f9;\n}\n.tree-cell {\n  display: flex;\n  align-items: center;\n}\n.tree-icon {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  color: #94a3b8;\n  margin-right: 6px;\n  margin-top: -4px;\n}\n.hierarchical-option {\n  font-family: inherit;\n}\n.l-arrow {\n  margin-right: 6px;\n  font-weight: bold;\n}\n.dim {\n  color: #64748b;\n}\n.light-code {\n  background: #e2e8f0;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 12px;\n  color: #334155;\n}\n.preview-icon {\n  vertical-align: middle;\n  font-size: 20px;\n  height: 20px;\n  width: 20px;\n}\n.text-primary {\n  color: #0284c7;\n}\n.order-box {\n  background: #f1f5f9;\n  border: 1px solid #cbd5e1;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 13px;\n}\n.badge {\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  display: inline-block;\n}\n.badge.active {\n  background-color: #dcfce7;\n  color: #166534;\n}\n.badge.inactive {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.badge.badge-parent {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.badge.top-level {\n  background-color: #f1f5f9;\n  color: #64748b;\n  border: 1px dashed #cbd5e1;\n}\n.no-data {\n  padding: 40px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n/*# sourceMappingURL=menu-management.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: MenuService }, { type: ToastrService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MenuManagement, { className: "MenuManagement", filePath: "app/modules/menu-management/menu-management.ts", lineNumber: 13 });
})();

// src/app/modules/menu-management/menu-management-routing-module.ts
var routes = [{ path: "", component: MenuManagement }];
var MenuManagementRoutingModule = class _MenuManagementRoutingModule {
  static \u0275fac = function MenuManagementRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuManagementRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _MenuManagementRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuManagementRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/menu-management/menu-management-module.ts
var MenuManagementModule = class _MenuManagementModule {
  static \u0275fac = function MenuManagementModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuManagementModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _MenuManagementModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    MenuManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonDialogComponent
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuManagementModule, [{
    type: NgModule,
    args: [{
      declarations: [
        MenuManagement
      ],
      imports: [
        CommonModule,
        MenuManagementRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        CommonDialogComponent
      ]
    }]
  }], null, null);
})();
export {
  MenuManagementModule
};
//# sourceMappingURL=chunk-SCVDHZ4Z.js.map
