import {
  require_sweetalert2_all
} from "./chunk-SWZ3X6NF.js";
import {
  CommonDialogComponent
} from "./chunk-VKQYMIUT.js";
import {
  MaterialModule
} from "./chunk-KSOTQAYO.js";
import "./chunk-3OEUFLPR.js";
import "./chunk-26HEUADP.js";
import "./chunk-KPIKLNUA.js";
import "./chunk-DRAYAONG.js";
import "./chunk-T3AUGCAJ.js";
import {
  ToastrService
} from "./chunk-QR7MRZIR.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-YLIHD5YA.js";
import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  CommonModule,
  Component,
  HostListener,
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
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-23RKHPSU.js";

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
  resetToCanonical() {
    return this.http.post(`${this.baseUrl}/reset-canonical`, {});
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
function MenuManagement_For_46_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 78);
  }
}
function MenuManagement_For_46_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275element(1, "div", 80);
    \u0275\u0275elementStart(2, "span", 81);
    \u0275\u0275text(3, " \u21B3 ");
    \u0275\u0275elementEnd()();
  }
}
function MenuManagement_For_46_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1, " Parent ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_For_46_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275text(1, " Child ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_For_46_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
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
function MenuManagement_For_46_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, " Top Level ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_For_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 22)(1, "td", 51);
    \u0275\u0275template(2, MenuManagement_For_46_div_2_Template, 1, 0, "div", 52);
    \u0275\u0275elementStart(3, "div", 53);
    \u0275\u0275template(4, MenuManagement_For_46_div_4_Template, 4, 0, "div", 54);
    \u0275\u0275elementStart(5, "div", 55)(6, "span", 56);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 57)(9, "div", 58);
    \u0275\u0275template(10, MenuManagement_For_46_span_10_Template, 2, 0, "span", 59)(11, MenuManagement_For_46_span_11_Template, 2, 0, "span", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h4", 61);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 62);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "td", 63)(17, "span", 64);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 63)(20, "div", 57)(21, "p", 65);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 66);
    \u0275\u0275text(24, " Route Path ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "td", 63);
    \u0275\u0275template(26, MenuManagement_For_46_span_26_Template, 2, 1, "span", 67)(27, MenuManagement_For_46_span_27_Template, 2, 0, "span", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 69)(29, "div", 70);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "td", 69)(32, "button", 71);
    \u0275\u0275listener("click", function MenuManagement_For_46_Template_button_click_32_listener() {
      const menu_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleStatus(menu_r2));
    });
    \u0275\u0275element(33, "span", 72);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "td", 73)(36, "div", 74)(37, "button", 75);
    \u0275\u0275listener("click", function MenuManagement_For_46_Template_button_click_37_listener() {
      const menu_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editMenu(menu_r2));
    });
    \u0275\u0275elementStart(38, "span", 76);
    \u0275\u0275text(39, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "button", 77);
    \u0275\u0275listener("click", function MenuManagement_For_46_Template_button_click_40_listener() {
      const menu_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteMenu(menu_r2.id));
    });
    \u0275\u0275elementStart(41, "span", 76);
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
    \u0275\u0275property("title", "Click to switch to " + (menu_r2.status ? "Inactive" : "Active"))("ngClass", menu_r2.status ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", menu_r2.status ? "bg-green-500" : "bg-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", menu_r2.status ? "ACTIVE" : "INACTIVE", " ");
  }
}
function MenuManagement_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "div", 87)(2, "span", 88);
    \u0275\u0275text(3, " dashboard_customize ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 89);
    \u0275\u0275text(5, " No Modules Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 90);
    \u0275\u0275text(7, " Create your first sidebar module ");
    \u0275\u0275elementEnd()();
  }
}
function MenuManagement_p_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 91);
    \u0275\u0275text(1, " Module Name is required ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_div_94_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 98);
    \u0275\u0275text(1, " check ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_div_94_For_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 102);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const menu_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", "\u21B3 ".repeat(menu_r6.depth), " ");
  }
}
function MenuManagement_div_94_For_8_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 103);
    \u0275\u0275text(1, " check ");
    \u0275\u0275elementEnd();
  }
}
function MenuManagement_div_94_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275listener("click", function MenuManagement_div_94_For_8_Template_div_click_0_listener() {
      const menu_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectParent(menu_r6.id));
    });
    \u0275\u0275elementStart(1, "span", 99);
    \u0275\u0275template(2, MenuManagement_div_94_For_8_span_2_Template, 2, 1, "span", 100);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, MenuManagement_div_94_For_8_span_4_Template, 2, 0, "span", 101);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_15_0;
    const menu_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("padding-left", 20 + menu_r6.depth * 20, "px");
    \u0275\u0275property("ngClass", ((tmp_12_0 = ctx_r2.menuForm.get("parentId")) == null ? null : tmp_12_0.value) === menu_r6.id ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", menu_r6.depth > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", menu_r6.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_15_0 = ctx_r2.menuForm.get("parentId")) == null ? null : tmp_15_0.value) === menu_r6.id);
  }
}
function MenuManagement_div_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275element(1, "div", 93);
    \u0275\u0275elementStart(2, "div", 94)(3, "div", 95);
    \u0275\u0275listener("click", function MenuManagement_div_94_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectParent(null));
    });
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "-- Top Level --");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MenuManagement_div_94_span_6_Template, 2, 0, "span", 96);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, MenuManagement_div_94_For_8_Template, 5, 6, "div", 97, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", !((tmp_1_0 = ctx_r2.menuForm.get("parentId")) == null ? null : tmp_1_0.value) ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !((tmp_2_0 = ctx_r2.menuForm.get("parentId")) == null ? null : tmp_2_0.value));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.menus);
  }
}
var MenuManagement = class _MenuManagement {
  fb;
  menuService;
  toast;
  isEditing = false;
  editingId = null;
  showModal = false;
  parentDropdownOpen = false;
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
  loadMenus() {
    this.menuService.getMenus().subscribe({
      next: (res) => {
        this.menus = this.buildHierarchy(res.data || []);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || "Failed to load available menus");
      }
    });
  }
  toggleStatus(menu) {
    const updatedStatus = !menu.status;
    this.menuService.updateMenu(menu.id, __spreadProps(__spreadValues({}, menu), {
      status: updatedStatus
    })).subscribe({
      next: () => {
        menu.status = updatedStatus;
        this.toast.success(`Module "${menu.name}" marked ${updatedStatus ? "Active" : "Inactive"}`);
      },
      error: (err) => {
        this.toast.error(err?.error?.message || "Failed to update module status");
      }
    });
  }
  syncCanonical() {
    import_sweetalert2.default.fire({
      title: "Reset to Canonical 10 Domains?",
      text: "This will ensure all 10 enterprise domains and default working routes are restored.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3a66b0",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Restore Default Hierarchy"
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuService.resetToCanonical().subscribe({
          next: (res) => {
            this.toast.success(res.message || "Canonical menus restored successfully!");
            this.loadMenus();
          },
          error: (err) => {
            this.toast.error(err?.error?.message || "Failed to restore canonical menus");
          }
        });
      }
    });
  }
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
  getParentName(parentId) {
    if (!parentId)
      return "None";
    const parent = this.menus.find((m) => m.id === parentId);
    return parent ? parent.name : "Unknown";
  }
  toggleParentDropdown() {
    this.parentDropdownOpen = !this.parentDropdownOpen;
  }
  closeParentDropdown() {
    this.parentDropdownOpen = false;
  }
  selectParent(id) {
    this.menuForm.get("parentId")?.setValue(id);
    this.parentDropdownOpen = false;
  }
  getSelectedParentLabel() {
    const selectedId = this.menuForm.get("parentId")?.value;
    if (!selectedId) {
      return "-- Top Level --";
    }
    const selected = this.menus.find((m) => m.id === selectedId);
    if (!selected) {
      return "-- Top Level --";
    }
    const prefix = selected.depth > 0 ? "\u21B3 ".repeat(selected.depth) : "";
    return `${prefix}${selected.name}`;
  }
  onDocumentClick(event) {
    if (!this.parentDropdownOpen) {
      return;
    }
    const target = event.target;
    if (!target.closest(".parent-dropdown-wrapper")) {
      this.parentDropdownOpen = false;
    }
  }
  openCreateModal() {
    this.isEditing = false;
    this.editingId = null;
    this.parentDropdownOpen = false;
    this.menuForm.reset({
      icon: "domain",
      order: 0,
      status: true,
      parentId: null
    });
    this.showModal = true;
  }
  editMenu(menu) {
    this.isEditing = true;
    this.editingId = menu.id;
    this.parentDropdownOpen = false;
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
  closeModal() {
    this.showModal = false;
    this.parentDropdownOpen = false;
    this.isEditing = false;
    this.editingId = null;
    this.menuForm.reset({
      icon: "domain",
      order: 0,
      status: true,
      parentId: null
    });
  }
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MenuManagement, selectors: [["app-menu-management"]], hostBindings: function MenuManagement_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function MenuManagement_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 102, vars: 13, consts: [[1, "menu-management-container"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "lg:justify-between", "gap-5", "mb-8"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "mt-1", "text-sm", "font-medium"], [1, "flex", "items-center", "gap-3"], ["title", "Restore all 10 canonical enterprise domains and default working routes", 1, "flex", "items-center", "gap-2", "px-5", "py-3.5", "rounded-2xl", "font-bold", "text-slate-700", "dark:text-slate-200", "bg-slate-100", "dark:bg-slate-800", "hover:bg-slate-200", "dark:hover:bg-slate-700", "transition-all", "border", "border-slate-200", "dark:border-slate-700", "shadow-sm", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[20px]", "text-primary"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "cursor-pointer", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "table-scroll-wrapper", "custom-scrollbar", "overflow-x-auto", "pb-4"], [1, "w-full", "table-fixed", "border-separate", "border-spacing-y-3"], [2, "width", "24%"], [2, "width", "13%"], [2, "width", "16%"], [2, "width", "15%"], [2, "width", "8%"], [2, "width", "11%"], [1, "px-6", "py-4", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "px-6", "py-4", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "sticky", "right-0", "z-10", "bg-slate-50", "dark:bg-slate-900", "px-6", "py-4", "text-right", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "group", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], ["class", "flex flex-col items-center justify-center py-24", 4, "ngIf"], ["maxWidth", "max-w-3xl", "backdropClass", "bg-slate-900/50", "panelClass", "relative flex flex-col max-h-[90vh] overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 animate-in zoom-in-95 duration-300", 3, "closed", "open"], [1, "absolute", "inset-x-0", "top-0", "h-1", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container"], [1, "shrink-0", "flex", "items-center", "justify-between", "px-8", "py-6", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "text-2xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-sm", "text-slate-400", "mt-1", "font-medium"], [1, "w-11", "h-11", "rounded-2xl", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-all", "flex", "items-center", "justify-center", 3, "click"], [1, "material-symbols-outlined"], [1, "p-8", "flex-1", "min-h-0", "overflow-y-auto", "custom-scrollbar"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-2", "block"], ["formControlName", "name", "type", "text", "placeholder", "e.g. USER_MANAGEMENT", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], ["class", "text-red-500 text-xs mt-2 font-semibold", 4, "ngIf"], ["formControlName", "title", "type", "text", "placeholder", "e.g. User Management", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], ["formControlName", "path", "type", "text", "placeholder", "e.g. /master/users", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-5"], [1, "relative"], ["formControlName", "icon", "type", "text", "placeholder", "e.g. dashboard", 1, "w-full", "pl-5", "pr-14", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], [1, "material-symbols-outlined", "absolute", "right-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["formControlName", "order", "type", "number", "placeholder", "0", 1, "w-full", "px-5", "py-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", "focus:border-primary", "transition-all"], [1, "relative", "parent-dropdown-wrapper"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "gap-3", "px-5", "py-4", "rounded-2xl", "border", "bg-white", "dark:bg-slate-950", "text-sm", "font-bold", "text-left", "outline-none", "transition-all", 3, "click", "ngClass"], [1, "truncate", "text-slate-800", "dark:text-white"], [1, "material-symbols-outlined", "text-slate-400", "shrink-0", "transition-transform", "duration-200", 3, "ngClass"], ["class", "dropdown-panel absolute left-0 right-0 top-full mt-2 z-30 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden", 4, "ngIf"], [1, "flex", "items-center", "justify-end", "gap-4", "pt-6", "border-t", "border-slate-200", "dark:border-slate-800"], ["type", "button", 1, "px-6", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "text-sm", "font-bold", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-all", 3, "click"], ["type", "submit", 1, "px-7", "py-3", "rounded-2xl", "bg-gradient-to-r", "from-primary", "to-primary-container", "text-white", "text-sm", "font-black", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-all", "flex", "items-center", "gap-2", "disabled:opacity-50", "disabled:hover:scale-100", 3, "disabled"], [1, "px-6", "py-5", "rounded-l-3xl", "border-y", "border-l", "border-slate-200", "dark:border-slate-800", "relative", "overflow-hidden"], ["class", "absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-violet-500", 4, "ngIf"], [1, "flex", "items-center", "gap-4", "min-w-0"], ["class", "flex items-center gap-1 shrink-0 text-violet-500", 4, "ngIf"], [1, "w-12", "h-12", "rounded-2xl", "flex", "items-center", "justify-center", "group-hover:scale-110", "transition-transform", "duration-300", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-[22px]"], [1, "min-w-0"], [1, "flex", "items-center", "gap-2", "mb-1"], ["class", "px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-wider", 4, "ngIf"], ["class", "px-2 py-0.5 rounded-lg bg-violet-100 text-violet-700 text-[9px] font-black uppercase tracking-wider", 4, "ngIf"], [1, "font-black", "text-sm", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors", "truncate"], [1, "text-xs", "text-slate-400", "font-medium", "mt-1", "truncate"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800", "overflow-hidden"], [1, "inline-flex", "items-center", "max-w-full", "px-3", "py-1.5", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide", "truncate"], [1, "font-black", "text-slate-800", "dark:text-white", "text-sm", "truncate"], [1, "text-[11px]", "text-slate-400", "font-bold", "uppercase", "tracking-wide"], ["class", "inline-flex items-center gap-2 max-w-full px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-[11px] font-black uppercase tracking-wide truncate", 4, "ngIf"], ["class", "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-black uppercase tracking-wide", 4, "ngIf"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800", "text-center"], [1, "w-11", "h-11", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center", "mx-auto", "font-black"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "text-[11px]", "font-black", "uppercase", "tracking-wide", "border", "cursor-pointer", "hover:scale-105", "transition-all", "shadow-sm", "active:scale-95", 3, "click", "title", "ngClass"], [1, "w-2", "h-2", "rounded-full", 3, "ngClass"], [1, "sticky", "right-0", "z-10", "bg-white", "dark:bg-slate-900", "group-hover:bg-slate-50", "dark:group-hover:bg-slate-800/80", "px-6", "py-5", "rounded-r-3xl", "border-y", "border-r", "border-slate-200", "dark:border-slate-800", "transition-all", "duration-300"], [1, "flex", "items-center", "justify-end", "gap-2"], [1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "shrink-0", 3, "click"], [1, "absolute", "left-0", "top-3", "bottom-3", "w-1.5", "rounded-r-full", "bg-violet-500"], [1, "flex", "items-center", "gap-1", "shrink-0", "text-violet-500"], [1, "w-5", "h-[2px]", "bg-violet-400", "rounded-full"], [1, "text-lg", "font-black"], [1, "px-2", "py-0.5", "rounded-lg", "bg-emerald-100", "text-emerald-700", "text-[9px]", "font-black", "uppercase", "tracking-wider"], [1, "px-2", "py-0.5", "rounded-lg", "bg-violet-100", "text-violet-700", "text-[9px]", "font-black", "uppercase", "tracking-wider"], [1, "inline-flex", "items-center", "gap-2", "max-w-full", "px-3", "py-1.5", "rounded-full", "bg-violet-100", "text-violet-700", "border", "border-violet-200", "text-[11px]", "font-black", "uppercase", "tracking-wide", "truncate"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "bg-slate-100", "text-slate-600", "border", "border-slate-200", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "flex", "flex-col", "items-center", "justify-center", "py-24"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-2"], [1, "text-red-500", "text-xs", "mt-2", "font-semibold"], [1, "dropdown-panel", "absolute", "left-0", "right-0", "top-full", "mt-2", "z-30", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "shadow-2xl", "overflow-hidden"], [1, "h-1", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container"], [1, "max-h-64", "overflow-y-auto", "custom-scrollbar", "py-2"], [1, "dropdown-item", "flex", "items-center", "justify-between", "px-5", "py-3", "cursor-pointer", "text-sm", "font-bold", "transition-colors", 3, "click", "ngClass"], ["class", "material-symbols-outlined text-[18px] text-primary", 4, "ngIf"], [1, "dropdown-item", "flex", "items-center", "justify-between", "px-5", "py-3", "cursor-pointer", "text-sm", "font-bold", "transition-colors", 3, "padding-left", "ngClass"], [1, "material-symbols-outlined", "text-[18px]", "text-primary"], [1, "truncate", "flex", "items-center", "gap-1"], ["class", "text-violet-400 font-black", 4, "ngIf"], ["class", "material-symbols-outlined text-[18px] text-primary shrink-0", 4, "ngIf"], [1, "text-violet-400", "font-black"], [1, "material-symbols-outlined", "text-[18px]", "text-primary", "shrink-0"]], template: function MenuManagement_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, " Module & Menu Management ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, " Configure sidebar menus with nesting, sorting and permissions across all 10 enterprise domains. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "button", 5);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_8_listener() {
        return ctx.syncCanonical();
      });
      \u0275\u0275elementStart(9, "span", 6);
      \u0275\u0275text(10, " sync_alt ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Restore Canonical Domains ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_12_listener() {
        return ctx.openCreateModal();
      });
      \u0275\u0275element(13, "div", 8);
      \u0275\u0275elementStart(14, "div", 9)(15, "span", 10);
      \u0275\u0275text(16, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275text(17, " Create Module ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 11)(19, "table", 12)(20, "colgroup");
      \u0275\u0275element(21, "col", 13)(22, "col", 14)(23, "col", 15)(24, "col", 16)(25, "col", 17)(26, "col", 18)(27, "col", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "thead")(29, "tr")(30, "th", 19);
      \u0275\u0275text(31, " Module ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "th", 19);
      \u0275\u0275text(33, " Title ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "th", 19);
      \u0275\u0275text(35, " Path ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "th", 19);
      \u0275\u0275text(37, " Parent ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "th", 20);
      \u0275\u0275text(39, " Order ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "th", 20);
      \u0275\u0275text(41, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "th", 21);
      \u0275\u0275text(43, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(44, "tbody");
      \u0275\u0275repeaterCreate(45, MenuManagement_For_46_Template, 43, 19, "tr", 22, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(47, MenuManagement_div_47_Template, 8, 0, "div", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "app-common-dialog", 24);
      \u0275\u0275listener("closed", function MenuManagement_Template_app_common_dialog_closed_48_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275element(49, "div", 25);
      \u0275\u0275elementStart(50, "div", 26)(51, "div")(52, "h2", 27);
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "p", 28);
      \u0275\u0275text(55, " Configure sidebar modules & navigation hierarchy ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "button", 29);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_56_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275elementStart(57, "span", 30);
      \u0275\u0275text(58, " close ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(59, "div", 31)(60, "form", 32);
      \u0275\u0275listener("ngSubmit", function MenuManagement_Template_form_ngSubmit_60_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(61, "div")(62, "label", 33);
      \u0275\u0275text(63, " Module Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(64, "input", 34);
      \u0275\u0275template(65, MenuManagement_p_65_Template, 2, 0, "p", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div")(67, "label", 33);
      \u0275\u0275text(68, " Display Title ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(69, "input", 36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div")(71, "label", 33);
      \u0275\u0275text(72, " Route Path ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(73, "input", 37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "div", 38)(75, "div")(76, "label", 33);
      \u0275\u0275text(77, " Material Icon ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "div", 39);
      \u0275\u0275element(79, "input", 40);
      \u0275\u0275elementStart(80, "span", 41);
      \u0275\u0275text(81);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(82, "div")(83, "label", 33);
      \u0275\u0275text(84, " Sort Order ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(85, "input", 42);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(86, "div", 43)(87, "label", 33);
      \u0275\u0275text(88, " Parent Module ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "button", 44);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_89_listener() {
        return ctx.toggleParentDropdown();
      });
      \u0275\u0275elementStart(90, "span", 45);
      \u0275\u0275text(91);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "span", 46);
      \u0275\u0275text(93, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(94, MenuManagement_div_94_Template, 9, 2, "div", 47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "div", 48)(96, "button", 49);
      \u0275\u0275listener("click", function MenuManagement_Template_button_click_96_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275text(97, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(98, "button", 50)(99, "span", 10);
      \u0275\u0275text(100);
      \u0275\u0275elementEnd();
      \u0275\u0275text(101);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(45);
      \u0275\u0275repeater(ctx.menus);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.menus.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showModal);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Update Module" : "Create New Module", " ");
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.menuForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.menuForm.get("name")) == null ? null : tmp_5_0.hasError("required")) && ((tmp_5_0 = ctx.menuForm.get("name")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx.menuForm.get("icon")) == null ? null : tmp_6_0.value) || "dashboard", " ");
      \u0275\u0275advance(8);
      \u0275\u0275property("ngClass", ctx.parentDropdownOpen ? "border-primary ring-2 ring-primary/30" : "border-slate-200 dark:border-slate-800");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.getSelectedParentLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.parentDropdownOpen ? "rotate-180" : "");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.parentDropdownOpen);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.menuForm.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "save" : "add_circle", " ");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Update Module" : "Create Module", " ");
    }
  }, dependencies: [NgClass, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CommonDialogComponent], styles: ['\n.menu-management-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 64px);\n  font-family:\n    "Roboto",\n    "Outfit",\n    sans-serif;\n}\n.header-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.header-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0 0 8px 0;\n}\n.header-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0;\n  font-size: 15px;\n}\n.table-scroll-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.table-scroll-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.table-scroll-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.table-scroll-wrapper[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #cbd5e1;\n  border-radius: 20px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: #94a3b8;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-corner {\n  background: transparent;\n}\n[_nghost-%COMP%]     * {\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n}\n[_nghost-%COMP%]     *::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n[_nghost-%COMP%]     *::-webkit-scrollbar-track {\n  background: transparent;\n}\n[_nghost-%COMP%]     *::-webkit-scrollbar-thumb {\n  background-color: #cbd5e1;\n  border-radius: 20px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  transition: background-color 0.2s ease;\n}\n[_nghost-%COMP%]     *::-webkit-scrollbar-thumb:hover {\n  background-color: #94a3b8;\n}\n[_nghost-%COMP%]     *::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.parent-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-panel[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dropdown-fade-in 0.15s ease-out;\n  transform-origin: top;\n}\n.parent-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  margin: 0 8px;\n  width: calc(100% - 16px);\n}\n.parent-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:first-child {\n  margin-top: 2px;\n}\n.parent-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 2px;\n}\n@keyframes _ngcontent-%COMP%_dropdown-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n.split-view[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.form-card[_ngcontent-%COMP%] {\n  flex: 1 1 350px;\n  min-width: 300px;\n  max-width: 450px;\n  border-radius: 12px;\n}\n.form-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background-color: #003b4d;\n  padding: 16px 20px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 20px -16px;\n}\n.form-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  color: white;\n  margin: 0;\n  font-size: 18px;\n}\n.menu-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.row-fields[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.half-width[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 24px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.table-card[_ngcontent-%COMP%] {\n  flex: 2 1 600px;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 0px;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  color: #0f172a;\n  margin: 0;\n  font-size: 18px;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n.table-container[_ngcontent-%COMP%] {\n  max-height: calc(100vh - 250px);\n  overflow: auto;\n  border-radius: 0 0 12px 12px;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.table-container[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%] {\n  background-color: #f8fafc;\n  color: #475569;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.table-container[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-container[_ngcontent-%COMP%]   .interactive-row[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n}\n.tree-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.tree-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  color: #94a3b8;\n  margin-right: 6px;\n  margin-top: -4px;\n}\n.hierarchical-option[_ngcontent-%COMP%] {\n  font-family: inherit;\n}\n.l-arrow[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  font-weight: bold;\n}\n.dim[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.light-code[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 12px;\n  color: #334155;\n}\n.preview-icon[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  font-size: 20px;\n  height: 20px;\n  width: 20px;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: #0284c7;\n}\n.order-box[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  border: 1px solid #cbd5e1;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 13px;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  display: inline-block;\n}\n.badge.active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #166534;\n}\n.badge.inactive[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.badge.badge-parent[_ngcontent-%COMP%] {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.badge.top-level[_ngcontent-%COMP%] {\n  background-color: #f1f5f9;\n  color: #64748b;\n  border: 1px dashed #cbd5e1;\n}\n.no-data[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n/*# sourceMappingURL=menu-management.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuManagement, [{
    type: Component,
    args: [{ selector: "app-menu-management", standalone: false, template: `<div class="menu-management-container">\r
\r
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">\r
\r
    <div>\r
      <h2 class="text-3xl font-black text-slate-800 dark:text-white">\r
        Module & Menu Management\r
      </h2>\r
\r
      <p class="text-slate-500 mt-1 text-sm font-medium">\r
        Configure sidebar menus with nesting, sorting and permissions across all 10 enterprise domains.\r
      </p>\r
    </div>\r
\r
    <div class="flex items-center gap-3">\r
      <button (click)="syncCanonical()"\r
        title="Restore all 10 canonical enterprise domains and default working routes"\r
        class="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer">\r
        <span class="material-symbols-outlined text-[20px] text-primary">\r
          sync_alt\r
        </span>\r
        Restore Canonical Domains\r
      </button>\r
\r
      <button (click)="openCreateModal()"\r
        class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] cursor-pointer">\r
\r
        <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">\r
        </div>\r
\r
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
    </div>\r
\r
  </div>\r
\r
  <div class="table-scroll-wrapper custom-scrollbar overflow-x-auto pb-4">\r
\r
    <table class="w-full table-fixed border-separate border-spacing-y-3">\r
\r
      <colgroup>\r
        <col style="width:24%">\r
        <col style="width:13%">\r
        <col style="width:16%">\r
        <col style="width:15%">\r
        <col style="width:8%">\r
        <col style="width:11%">\r
        <col style="width:13%">\r
      </colgroup>\r
\r
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
          <th\r
            class="sticky right-0 z-10 bg-slate-50 dark:bg-slate-900 px-6 py-4 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
            Actions\r
          </th>\r
\r
        </tr>\r
\r
      </thead>\r
      <tbody>\r
\r
        @for (menu of menus; track menu.id) {\r
\r
        <tr\r
          class="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
          <td\r
            class="px-6 py-5 rounded-l-3xl border-y border-l border-slate-200 dark:border-slate-800 relative overflow-hidden">\r
\r
            <div *ngIf="menu.depth > 0" class="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-violet-500">\r
            </div>\r
\r
            <div class="flex items-center gap-4 min-w-0" [style.padding-left.px]="menu.depth * 22">\r
\r
\r
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
\r
              <div\r
                class="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0"\r
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
\r
              <div class="min-w-0">\r
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
\r
                <h4\r
                  class="font-black text-sm text-slate-800 dark:text-white group-hover:text-primary transition-colors truncate">\r
\r
                  {{ menu.name }}\r
\r
                </h4>\r
\r
\r
                <p class="text-xs text-slate-400 font-medium mt-1 truncate">\r
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
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 overflow-hidden">\r
\r
            <span\r
              class="inline-flex items-center max-w-full px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide truncate">\r
\r
              {{ menu.title || '-' }}\r
\r
            </span>\r
          </td>\r
\r
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 overflow-hidden">\r
\r
            <div class="min-w-0">\r
\r
              <p class="font-black text-slate-800 dark:text-white text-sm truncate">\r
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
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 overflow-hidden">\r
\r
            <span *ngIf="menu.parentId"\r
              class="inline-flex items-center gap-2 max-w-full px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-[11px] font-black uppercase tracking-wide truncate">\r
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
\r
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
\r
          <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 text-center">\r
\r
            <button\r
              type="button"\r
              (click)="toggleStatus(menu)"\r
              [title]="'Click to switch to ' + (menu.status ? 'Inactive' : 'Active')"\r
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide border cursor-pointer hover:scale-105 transition-all shadow-sm active:scale-95"\r
              [ngClass]="menu.status\r
              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'\r
              : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'">\r
\r
              <span class="w-2 h-2 rounded-full" [ngClass]="menu.status\r
                ? 'bg-green-500'\r
                : 'bg-red-500'">\r
              </span>\r
\r
              {{ menu.status ? 'ACTIVE' : 'INACTIVE' }}\r
\r
            </button>\r
\r
          </td>\r
\r
\r
          <td\r
            class="sticky right-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/80 px-6 py-5 rounded-r-3xl border-y border-r border-slate-200 dark:border-slate-800 transition-all duration-300">\r
\r
            <div class="flex items-center justify-end gap-2">\r
\r
\r
              <button (click)="editMenu(menu)"\r
                class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center shrink-0">\r
\r
                <span class="material-symbols-outlined text-[18px]">\r
                  edit\r
                </span>\r
\r
              </button>\r
\r
\r
              <button (click)="deleteMenu(menu.id)"\r
                class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center shrink-0">\r
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
  <app-common-dialog [open]="showModal" maxWidth="max-w-3xl" backdropClass="bg-slate-900/50"\r
    panelClass="relative flex flex-col max-h-[90vh] overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 animate-in zoom-in-95 duration-300"\r
    (closed)="closeModal()">\r
\r
    <div\r
      class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-container to-secondary-container">\r
    </div>\r
\r
    <div class="shrink-0 flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">\r
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
    <div class="p-8 flex-1 min-h-0 overflow-y-auto custom-scrollbar">\r
\r
      <form [formGroup]="menuForm" (ngSubmit)="onSubmit()" class="space-y-6">\r
\r
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
\r
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
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">\r
\r
\r
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
        <div class="relative parent-dropdown-wrapper">\r
\r
          <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
\r
            Parent Module\r
\r
          </label>\r
\r
\r
          <button type="button" (click)="toggleParentDropdown()"\r
            class="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border bg-white dark:bg-slate-950 text-sm font-bold text-left outline-none transition-all"\r
            [ngClass]="parentDropdownOpen\r
                ? 'border-primary ring-2 ring-primary/30'\r
                : 'border-slate-200 dark:border-slate-800'">\r
\r
            <span class="truncate text-slate-800 dark:text-white">\r
              {{ getSelectedParentLabel() }}\r
            </span>\r
\r
            <span class="material-symbols-outlined text-slate-400 shrink-0 transition-transform duration-200"\r
              [ngClass]="parentDropdownOpen ? 'rotate-180' : ''">\r
              expand_more\r
            </span>\r
\r
          </button>\r
\r
\r
          <div *ngIf="parentDropdownOpen"\r
            class="dropdown-panel absolute left-0 right-0 top-full mt-2 z-30 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">\r
\r
\r
            <div class="h-1 bg-gradient-to-r from-primary via-primary-container to-secondary-container"></div>\r
\r
            <div class="max-h-64 overflow-y-auto custom-scrollbar py-2">\r
\r
\r
              <div (click)="selectParent(null)"\r
                class="dropdown-item flex items-center justify-between px-5 py-3 cursor-pointer text-sm font-bold transition-colors"\r
                [ngClass]="!menuForm.get('parentId')?.value\r
                    ? 'bg-primary/10 text-primary'\r
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">\r
\r
                <span>-- Top Level --</span>\r
\r
                <span *ngIf="!menuForm.get('parentId')?.value"\r
                  class="material-symbols-outlined text-[18px] text-primary">\r
                  check\r
                </span>\r
\r
              </div>\r
\r
              @for (menu of menus; track menu.id) {\r
\r
              <div (click)="selectParent(menu.id)"\r
                class="dropdown-item flex items-center justify-between px-5 py-3 cursor-pointer text-sm font-bold transition-colors"\r
                [style.padding-left.px]="20 + (menu.depth * 20)" [ngClass]="menuForm.get('parentId')?.value === menu.id\r
                    ? 'bg-primary/10 text-primary'\r
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">\r
\r
                <span class="truncate flex items-center gap-1">\r
                  <span *ngIf="menu.depth > 0" class="text-violet-400 font-black">\r
                    {{ '\u21B3 '.repeat(menu.depth) }}\r
                  </span>\r
                  {{ menu.name }}\r
                </span>\r
\r
                <span *ngIf="menuForm.get('parentId')?.value === menu.id"\r
                  class="material-symbols-outlined text-[18px] text-primary shrink-0">\r
                  check\r
                </span>\r
\r
              </div>\r
\r
              }\r
\r
            </div>\r
\r
          </div>\r
\r
        </div>\r
\r
\r
        <div class="flex items-center justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">\r
\r
          <button type="button" (click)="closeModal()"\r
            class="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">\r
\r
            Cancel\r
\r
          </button>\r
\r
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
</div>`, styles: ['/* src/app/modules/menu-management/menu-management.scss */\n.menu-management-container {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 64px);\n  font-family:\n    "Roboto",\n    "Outfit",\n    sans-serif;\n}\n.header-section {\n  margin-bottom: 24px;\n}\n.header-section h2 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0 0 8px 0;\n}\n.header-section p {\n  color: #64748b;\n  margin: 0;\n  font-size: 15px;\n}\n.table-scroll-wrapper {\n  width: 100%;\n}\n.table-scroll-wrapper table {\n  box-sizing: border-box;\n}\n.table-scroll-wrapper table th,\n.table-scroll-wrapper table td {\n  box-sizing: border-box;\n}\n.custom-scrollbar {\n  scroll-behavior: smooth;\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: #cbd5e1;\n  border-radius: 20px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: #94a3b8;\n}\n.custom-scrollbar::-webkit-scrollbar-corner {\n  background: transparent;\n}\n:host ::ng-deep * {\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n}\n:host ::ng-deep *::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n:host ::ng-deep *::-webkit-scrollbar-track {\n  background: transparent;\n}\n:host ::ng-deep *::-webkit-scrollbar-thumb {\n  background-color: #cbd5e1;\n  border-radius: 20px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  transition: background-color 0.2s ease;\n}\n:host ::ng-deep *::-webkit-scrollbar-thumb:hover {\n  background-color: #94a3b8;\n}\n:host ::ng-deep *::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.parent-dropdown-wrapper .dropdown-panel {\n  animation: dropdown-fade-in 0.15s ease-out;\n  transform-origin: top;\n}\n.parent-dropdown-wrapper .dropdown-item {\n  border-radius: 12px;\n  margin: 0 8px;\n  width: calc(100% - 16px);\n}\n.parent-dropdown-wrapper .dropdown-item:first-child {\n  margin-top: 2px;\n}\n.parent-dropdown-wrapper .dropdown-item:last-child {\n  margin-bottom: 2px;\n}\n@keyframes dropdown-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n.split-view {\n  display: flex;\n  gap: 24px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.form-card {\n  flex: 1 1 350px;\n  min-width: 300px;\n  max-width: 450px;\n  border-radius: 12px;\n}\n.form-card mat-card-header {\n  background-color: #003b4d;\n  padding: 16px 20px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 20px -16px;\n}\n.form-card mat-card-header mat-card-title {\n  color: white;\n  margin: 0;\n  font-size: 18px;\n}\n.menu-form {\n  display: flex;\n  flex-direction: column;\n}\n.full-width {\n  width: 100%;\n  margin-bottom: 8px;\n}\n.row-fields {\n  display: flex;\n  gap: 16px;\n}\n.half-width {\n  flex: 1;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.form-actions button {\n  padding: 6px 24px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.table-card {\n  flex: 2 1 600px;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.table-card mat-card-header {\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 0px;\n}\n.table-card mat-card-header mat-card-title {\n  color: #0f172a;\n  margin: 0;\n  font-size: 18px;\n}\n.table-card mat-card-content {\n  padding: 0 !important;\n}\n.table-container {\n  max-height: calc(100vh - 250px);\n  overflow: auto;\n  border-radius: 0 0 12px 12px;\n}\n.table-container table {\n  width: 100%;\n}\n.table-container th.mat-header-cell {\n  background-color: #f8fafc;\n  color: #475569;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.table-container td.mat-cell {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-container .interactive-row:hover {\n  background-color: #f1f5f9;\n}\n.tree-cell {\n  display: flex;\n  align-items: center;\n}\n.tree-icon {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  color: #94a3b8;\n  margin-right: 6px;\n  margin-top: -4px;\n}\n.hierarchical-option {\n  font-family: inherit;\n}\n.l-arrow {\n  margin-right: 6px;\n  font-weight: bold;\n}\n.dim {\n  color: #64748b;\n}\n.light-code {\n  background: #e2e8f0;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 12px;\n  color: #334155;\n}\n.preview-icon {\n  vertical-align: middle;\n  font-size: 20px;\n  height: 20px;\n  width: 20px;\n}\n.text-primary {\n  color: #0284c7;\n}\n.order-box {\n  background: #f1f5f9;\n  border: 1px solid #cbd5e1;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 13px;\n}\n.badge {\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  display: inline-block;\n}\n.badge.active {\n  background-color: #dcfce7;\n  color: #166534;\n}\n.badge.inactive {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.badge.badge-parent {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.badge.top-level {\n  background-color: #f1f5f9;\n  color: #64748b;\n  border: 1px dashed #cbd5e1;\n}\n.no-data {\n  padding: 40px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n/*# sourceMappingURL=menu-management.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: MenuService }, { type: ToastrService }], { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
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
//# sourceMappingURL=chunk-KZNZ7CNT.js.map
