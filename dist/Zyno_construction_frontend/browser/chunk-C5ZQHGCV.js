import {
  CommonDialogComponent
} from "./chunk-WS53KIOQ.js";
import {
  MAT_DIALOG_DATA,
  MatCheckbox,
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
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
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-WFU7JF4C.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Inject,
  Injectable,
  NgClass,
  NgModule,
  RouterModule,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
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
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-F27QM527.js";

// src/app/modules/users/role-management/services/role.service.ts
var RoleService = class _RoleService {
  http;
  baseUrl = environment.serverUrl + "/api/v1/roles";
  constructor(http) {
    this.http = http;
  }
  getRoles() {
    return this.http.get(this.baseUrl);
  }
  createRole(data) {
    return this.http.post(this.baseUrl, data);
  }
  updateRole(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deleteRole(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getRolePermissions(roleId) {
    return this.http.get(`${this.baseUrl}/${roleId}/permissions`);
  }
  updateRolePermissions(roleId, permissions) {
    return this.http.post(`${this.baseUrl}/${roleId}/permissions`, { permissions });
  }
  static \u0275fac = function RoleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RoleService, factory: _RoleService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/users/role-management/role-form-dialog/role-form-dialog.ts
function RoleFormDialog_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, "Role name is required");
    \u0275\u0275elementEnd();
  }
}
var RoleFormDialog = class _RoleFormDialog {
  dialogRef;
  data;
  fb;
  roleService;
  toast;
  roleForm;
  isEditMode = false;
  constructor(dialogRef, data, fb, roleService, toast) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.fb = fb;
    this.roleService = roleService;
    this.toast = toast;
    this.isEditMode = !!data.role;
    this.roleForm = this.fb.group({
      name: [data.role?.name || "", Validators.required],
      type: [data.role?.type || "CUSTOM", Validators.required]
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    if (this.roleForm.invalid) {
      this.toast.error("Please fill required fields");
      this.roleForm.markAllAsTouched();
      return;
    }
    const request$ = this.isEditMode ? this.roleService.updateRole(this.data.role.id, this.roleForm.value) : this.roleService.createRole(this.roleForm.value);
    request$.subscribe({
      next: (res) => {
        this.toast.success(res.message);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error(err.error?.message || `Failed to ${this.isEditMode ? "update" : "create"} role`);
      }
    });
  }
  static \u0275fac = function RoleFormDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleFormDialog)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleFormDialog, selectors: [["app-role-form-dialog"]], standalone: false, decls: 20, vars: 7, consts: [["panelClass", "rounded-2xl shadow-none", 3, "showBackdrop"], [1, "flex", "justify-between", "items-center", "p-2", "border-b", "dark:border-slate-800"], ["mat-dialog-title", "", 1, "m-0", "text-lg", "font-bold", "text-slate-800", "dark:text-slate-100"], ["type", "button", 1, "material-symbols-outlined", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "transition-colors", "cursor-pointer", "border-none", "bg-transparent", "flex", "items-center", "justify-center", "p-1", "rounded-full", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "p-6", "space-y-6", "bg-white", "dark:bg-slate-900"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-2", "block", "ml-1"], ["type", "text", "formControlName", "name", "placeholder", "e.g. Site Engineer", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-xl", "p-3", "text-sm", "text-slate-900", "dark:text-slate-50", "font-bold", "focus:ring-2", "focus:ring-blue-500/20", "transition-all", "outline-none"], [1, "text-red-500", "text-[10px]", "mt-1", "ml-1", "font-medium", "italic"], [1, "px-6", "py-4", "bg-slate-50", "dark:bg-slate-950", "flex", "justify-end", "gap-3", "rounded-b-lg", "border-t", "dark:border-slate-800"], ["type", "button", 1, "px-5", "py-2.5", "rounded-xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "transition-all", "cursor-pointer", "bg-transparent", "border-none", 3, "click"], ["type", "submit", 1, "px-6", "py-2.5", "rounded-xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "bg-blue-600", "text-white", "hover:bg-blue-700", "active:scale-95", "transition-all", "cursor-pointer", "shadow-lg", "shadow-blue-500/20", "border-none", "disabled:opacity-50", "disabled:cursor-not-allowed", "flex", "items-center", "gap-2", 3, "disabled"], [1, "text-sm"]], template: function RoleFormDialog_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-common-dialog", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function RoleFormDialog_Template_button_click_4_listener() {
        return ctx.dialogRef.close();
      });
      \u0275\u0275text(5, "close");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "form", 4);
      \u0275\u0275listener("ngSubmit", function RoleFormDialog_Template_form_ngSubmit_6_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(7, "div", 5)(8, "div")(9, "label", 6);
      \u0275\u0275text(10, "Role Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "input", 7);
      \u0275\u0275conditionalCreate(12, RoleFormDialog_Conditional_12_Template, 2, 0, "div", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 9)(14, "button", 10);
      \u0275\u0275listener("click", function RoleFormDialog_Template_button_click_14_listener() {
        return ctx.dialogRef.close();
      });
      \u0275\u0275text(15, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 11)(17, "mat-icon", 12);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275property("showBackdrop", false);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Edit" : "Create", " Company Role ");
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.roleForm);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(((tmp_3_0 = ctx.roleForm.get("name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.roleForm.get("name")) == null ? null : tmp_3_0.touched) ? 12 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.roleForm.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isEditMode ? "save" : "add_circle");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Save Changes" : "Create Role", " ");
    }
  }, dependencies: [\u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatDialogTitle, MatIcon, CommonDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleFormDialog, [{
    type: Component,
    args: [{ selector: "app-role-form-dialog", standalone: false, template: `<app-common-dialog [showBackdrop]="false" panelClass="rounded-2xl shadow-none">\r
<div class="flex justify-between items-center p-2 border-b dark:border-slate-800">\r
    <h3 mat-dialog-title class="m-0 text-lg font-bold text-slate-800 dark:text-slate-100">\r
        {{ isEditMode ? 'Edit' : 'Create' }} Company Role\r
    </h3>\r
    <button type="button" (click)="this.dialogRef.close()"\r
        class="material-symbols-outlined text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">close</button>\r
</div>\r
\r
<form [formGroup]="roleForm" (ngSubmit)="onSubmit()">\r
    <div class="p-6 space-y-6 bg-white dark:bg-slate-900">\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Role\r
                Name</label>\r
            <input type="text" formControlName="name" placeholder="e.g. Site Engineer"\r
                class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm text-slate-900 dark:text-slate-50 font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none">\r
            @if(roleForm.get('name')?.invalid && roleForm.get('name')?.touched){\r
            <div class="text-red-500 text-[10px] mt-1 ml-1 font-medium italic">Role name is required</div>\r
            }\r
        </div>\r
\r
        <!-- <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Role Type</label>\r
            <div class="relative">\r
                <select formControlName="type"\r
                    class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 pr-8 text-sm text-slate-900 dark:text-slate-50 font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none appearance-none cursor-pointer">\r
                    <option value="CUSTOM">Custom Entity Role</option>\r
                    <option value="STATIC" disabled>Static Core System Role</option>\r
                </select>\r
                <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>\r
            </div>\r
            <p class="text-[9px] text-slate-400 mt-2 ml-1 italic font-medium">Static roles are system-protected and cannot be modified.</p>\r
        </div> -->\r
    </div>\r
\r
    <div\r
        class="px-6 py-4 bg-slate-50 dark:bg-slate-950 flex justify-end gap-3 rounded-b-lg border-t dark:border-slate-800">\r
        <button type="button" (click)="this.dialogRef.close()"\r
            class="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer bg-transparent border-none">\r
            Cancel\r
        </button>\r
        <button type="submit" [disabled]="roleForm.invalid"\r
            class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-blue-500/20 border-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">\r
            <mat-icon class="text-sm">{{ isEditMode ? 'save' : 'add_circle' }}</mat-icon>\r
            {{ isEditMode ? 'Save Changes' : 'Create Role' }}\r
        </button>\r
    </div>\r
</form>\r
</app-common-dialog>\r
` }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: FormBuilder }, { type: RoleService }, { type: ToastrService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleFormDialog, { className: "RoleFormDialog", filePath: "app/modules/users/role-management/role-form-dialog/role-form-dialog.ts", lineNumber: 12 });
})();

// src/app/modules/users/role-management/role-management.ts
var _c0 = (a0, a1) => ({ "bg-blue-50 text-blue-700 border-blue-200": a0, "bg-emerald-50 text-emerald-700 border-emerald-200": a1 });
var _c1 = (a0, a1) => ({ "bg-blue-500": a0, "bg-emerald-500": a1 });
var _forTrack0 = ($index, $item) => $item.id;
function RoleManagement_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function RoleManagement_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePermissions());
    });
    \u0275\u0275elementStart(1, "mat-icon", 10);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Back to Roles ");
    \u0275\u0275elementEnd();
  }
}
function RoleManagement_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function RoleManagement_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openRoleDialog());
    });
    \u0275\u0275element(1, "div", 12);
    \u0275\u0275elementStart(2, "div", 13)(3, "span", 14);
    \u0275\u0275text(4, " add ");
    \u0275\u0275elementEnd()();
    \u0275\u0275text(5, " Create New Role ");
    \u0275\u0275elementEnd();
  }
}
function RoleManagement_Conditional_10_For_23_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function RoleManagement_Conditional_10_For_23_Conditional_31_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const role_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEdit(role_r5));
    });
    \u0275\u0275elementStart(1, "span", 43);
    \u0275\u0275text(2, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "button", 45);
    \u0275\u0275listener("click", function RoleManagement_Conditional_10_For_23_Conditional_31_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const role_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDelete(role_r5.id, role_r5.type));
    });
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5, " delete ");
    \u0275\u0275elementEnd()();
  }
}
function RoleManagement_Conditional_10_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 23)(1, "td", 24)(2, "div", 25)(3, "div", 26);
    \u0275\u0275element(4, "div", 27);
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h4", 29);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 30);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "td", 31)(13, "span", 32);
    \u0275\u0275element(14, "span", 33);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 31)(17, "div", 34)(18, "p", 35);
    \u0275\u0275text(19, " Access Control ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 36);
    \u0275\u0275text(21, " Role Based Permissions ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "td", 37)(23, "span", 38);
    \u0275\u0275element(24, "span", 39);
    \u0275\u0275text(25, " Active ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 40)(27, "div", 41)(28, "button", 42);
    \u0275\u0275listener("click", function RoleManagement_Conditional_10_For_23_Template_button_click_28_listener() {
      const role_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPermissions(role_r5));
    });
    \u0275\u0275elementStart(29, "span", 43);
    \u0275\u0275text(30, " security ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(31, RoleManagement_Conditional_10_For_23_Conditional_31_Template, 6, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r5 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", role_r5.name.charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", role_r5.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" UID : #", role_r5.id, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(7, _c0, role_r5.type === "STATIC", role_r5.type === "CUSTOM"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(10, _c1, role_r5.type === "STATIC", role_r5.type === "CUSTOM"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r5.type === "STATIC" ? "System Protected" : "Custom Defined", " ");
    \u0275\u0275advance(16);
    \u0275\u0275conditional(role_r5.type !== "STATIC" ? 31 : -1);
  }
}
function RoleManagement_Conditional_10_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 46)(2, "div", 47)(3, "div", 48)(4, "span", 49);
    \u0275\u0275text(5, " admin_panel_settings ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 50);
    \u0275\u0275text(7, " No Roles Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 51);
    \u0275\u0275text(9, " Create your first access role ");
    \u0275\u0275elementEnd()()()();
  }
}
function RoleManagement_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 15)(2, "div")(3, "h3", 16);
    \u0275\u0275text(4, "Active Organizational Roles ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 17);
    \u0275\u0275text(6, "System Boundaries & Custom Access Definitions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 18)(8, "table", 19)(9, "thead")(10, "tr")(11, "th", 20);
    \u0275\u0275text(12, " Role Identity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 20);
    \u0275\u0275text(14, " Access Type ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 20);
    \u0275\u0275text(16, " Permissions ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 21);
    \u0275\u0275text(18, " Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 22);
    \u0275\u0275text(20, " Actions ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, RoleManagement_Conditional_10_For_23_Template, 32, 13, "tr", 23, _forTrack0, false, RoleManagement_Conditional_10_ForEmpty_24_Template, 10, 0, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r1.roles);
  }
}
function RoleManagement_Conditional_11_For_30_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 70);
    \u0275\u0275text(1, "subdirectory_arrow_right");
    \u0275\u0275elementEnd();
  }
}
function RoleManagement_Conditional_11_For_30_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r9.title);
  }
}
function RoleManagement_Conditional_11_For_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 65)(1, "td", 62)(2, "div", 4);
    \u0275\u0275conditionalCreate(3, RoleManagement_Conditional_11_For_30_Conditional_3_Template, 2, 0, "mat-icon", 70);
    \u0275\u0275elementStart(4, "div", 71)(5, "mat-icon", 72);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "p", 73);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, RoleManagement_Conditional_11_For_30_Conditional_10_Template, 2, 1, "p", 74);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "td", 63)(12, "mat-checkbox", 75);
    \u0275\u0275listener("change", function RoleManagement_Conditional_11_For_30_Template_mat_checkbox_change_12_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePermission(item_r9, "can_create", $event.checked));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 63)(14, "mat-checkbox", 75);
    \u0275\u0275listener("change", function RoleManagement_Conditional_11_For_30_Template_mat_checkbox_change_14_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePermission(item_r9, "can_read", $event.checked));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 63)(16, "mat-checkbox", 75);
    \u0275\u0275listener("change", function RoleManagement_Conditional_11_For_30_Template_mat_checkbox_change_16_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePermission(item_r9, "can_update", $event.checked));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 63)(18, "mat-checkbox", 76);
    \u0275\u0275listener("change", function RoleManagement_Conditional_11_For_30_Template_mat_checkbox_change_18_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePermission(item_r9, "can_delete", $event.checked));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("padding-left", item_r9.depth * 32, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r9.depth > 0 ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r9.icon || "domain");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r9.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r9.title ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", item_r9.permissions.can_create);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", item_r9.permissions.can_read);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", item_r9.permissions.can_update);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", item_r9.permissions.can_delete);
  }
}
function RoleManagement_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 52)(2, "div")(3, "h3", 53)(4, "mat-icon", 54);
    \u0275\u0275text(5, "security");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Access Configuration: ");
    \u0275\u0275elementStart(7, "span", 55);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 56);
    \u0275\u0275text(10, "Define CRUD matrix for core application modules");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 57);
    \u0275\u0275listener("click", function RoleManagement_Conditional_11_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePermissions());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 58)(15, "table", 59)(16, "thead", 60)(17, "tr", 61)(18, "th", 62);
    \u0275\u0275text(19, "Application Module");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 63);
    \u0275\u0275text(21, "Create");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 63);
    \u0275\u0275text(23, "Read");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 63);
    \u0275\u0275text(25, "Update");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 63);
    \u0275\u0275text(27, "Delete");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "tbody", 64);
    \u0275\u0275repeaterCreate(29, RoleManagement_Conditional_11_For_30_Template, 19, 10, "tr", 65, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 66)(32, "button", 67);
    \u0275\u0275listener("click", function RoleManagement_Conditional_11_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePermissions());
    });
    \u0275\u0275text(33, " Cancel Configuration ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 68);
    \u0275\u0275listener("click", function RoleManagement_Conditional_11_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePermissions());
    });
    \u0275\u0275elementStart(35, "mat-icon", 69);
    \u0275\u0275text(36, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275text(37, " Apply Permissions Globally ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.managingPermissionsRoleName);
    \u0275\u0275advance(21);
    \u0275\u0275repeater(ctx_r1.rolePermissions);
  }
}
var RoleManagement = class _RoleManagement {
  roleService;
  toast;
  dialog;
  roles = [];
  // Permissions state
  managingPermissionsRoleId = null;
  managingPermissionsRoleName = "";
  rolePermissions = [];
  constructor(roleService, toast, dialog) {
    this.roleService = roleService;
    this.toast = toast;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadRoles();
  }
  openRoleDialog(role = null) {
    const dialogRef = this.dialog.open(RoleFormDialog, {
      width: "500px",
      data: { role },
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRoles();
      }
    });
  }
  onEdit(role) {
    if (role.type === "STATIC") {
      this.toast.warning("Static roles cannot be edited", "Edit Restricted");
      return;
    }
    this.openRoleDialog(role);
  }
  onDelete(id, type) {
    if (type === "STATIC") {
      this.toast.error("Static roles cannot be deleted", "Action Blocked");
      return;
    }
    if (confirm("Are you sure you want to delete this role from your company?")) {
      this.roleService.deleteRole(id).subscribe({
        next: (res) => {
          this.toast.success(res.message);
          this.loadRoles();
        },
        error: (err) => {
          this.toast.error(err.error?.message || "Failed to delete role");
        }
      });
    }
  }
  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
      error: (err) => {
        this.toast.error("Failed to load company roles");
      }
    });
  }
  // --- PERMISSIONS MANAGEMENT ---
  openPermissions(role) {
    this.managingPermissionsRoleId = role.id;
    this.managingPermissionsRoleName = role.name;
    this.roleService.getRolePermissions(role.id).subscribe({
      next: (res) => {
        this.rolePermissions = this.buildHierarchy(res.data);
      },
      error: (err) => {
        this.toast.error("Failed to load permissions");
        this.closePermissions();
      }
    });
  }
  closePermissions() {
    this.managingPermissionsRoleId = null;
    this.managingPermissionsRoleName = "";
    this.rolePermissions = [];
  }
  savePermissions() {
    if (!this.managingPermissionsRoleId)
      return;
    const payloads = this.rolePermissions.map((m) => __spreadValues({
      module_id: m.id
    }, m.permissions));
    this.roleService.updateRolePermissions(this.managingPermissionsRoleId, payloads).subscribe({
      next: (res) => {
        this.toast.success("Permissions saved successfully!");
        this.closePermissions();
      },
      error: (err) => {
        this.toast.error("Failed to update permissions");
      }
    });
  }
  togglePermission(element, perm, checked) {
    element.permissions[perm] = checked;
    if (perm !== "read" && checked) {
      element.permissions["read"] = true;
    }
  }
  buildHierarchy(rawMenus) {
    const map = /* @__PURE__ */ new Map();
    const roots = [];
    rawMenus.forEach((menu) => map.set(menu.id, __spreadProps(__spreadValues({}, menu), { children: [] })));
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
        if (item.children && item.children.length > 0)
          flatten(item.children, depth + 1);
      });
    };
    flatten(roots, 0);
    return flattenedList;
  }
  static \u0275fac = function RoleManagement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleManagement)(\u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleManagement, selectors: [["app-role-management"]], standalone: false, decls: 12, vars: 2, consts: [[1, "role-management-container", "p-6", "space-y-6"], [1, "flex", "justify-between", "items-center", "bg-white", "dark:bg-slate-900", "p-6", "rounded-2xl", "shadow-sm", "border", "border-slate-100", "dark:border-slate-800"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "mt-1", "m-0", "max-w-2xl"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "text-slate-500", "hover:text-slate-800", "dark:hover:text-white", "transition-all", "font-bold", "text-xs", "uppercase", "tracking-widest", "bg-transparent", "border-none", "cursor-pointer"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-xl", "shadow-slate-200/50", "dark:shadow-none", "border", "border-slate-100", "dark:border-slate-800", "overflow-hidden"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-xl", "shadow-slate-200/50", "dark:shadow-none", "border", "border-slate-100", "dark:border-slate-800", "overflow-hidden", "fade-in"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "text-slate-500", "hover:text-slate-800", "dark:hover:text-white", "transition-all", "font-bold", "text-xs", "uppercase", "tracking-widest", "bg-transparent", "border-none", "cursor-pointer", 3, "click"], [1, "text-sm"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "px-8", "py-6", "border-b", "border-slate-50", "dark:border-slate-800", "flex", "justify-between", "items-center"], [1, "text-xl", "font-black", "text-slate-900", "dark:text-slate-50", "m-0", "tracking-tight"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest", "mt-1"], [1, "overflow-x-auto", "px-2", "pb-4"], [1, "w-full", "min-w-[1100px]", "border-separate", "border-spacing-y-3"], [1, "px-6", "py-4", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "px-6", "py-4", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "px-6", "py-4", "text-right", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "group", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "px-6", "py-5", "rounded-l-3xl", "border-y", "border-l", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-12", "h-12", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "relative", "z-10", "text-primary", "font-black", "text-sm", "uppercase"], [1, "font-black", "text-sm", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "text-[11px]", "text-slate-400", "font-semibold", "mt-1", "uppercase", "tracking-wide"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-2xl", "border", "text-[11px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "w-2", "h-2", "rounded-full", 3, "ngClass"], [1, "flex", "flex-col", "gap-1"], [1, "font-black", "text-slate-800", "dark:text-white", "text-sm"], [1, "text-[11px]", "text-slate-400", "font-bold", "uppercase", "tracking-wide"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800", "text-center"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-2xl", "bg-green-50", "text-green-700", "border", "border-green-200", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "w-2", "h-2", "rounded-full", "bg-green-500"], [1, "px-6", "py-5", "rounded-r-3xl", "border-y", "border-r", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "justify-end", "gap-2"], ["title", "Configure Permissions", 1, "w-11", "h-11", "rounded-2xl", "bg-blue-50", "text-blue-600", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], ["title", "Edit Role", 1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-primary", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], ["title", "Delete Role", 1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], ["colspan", "5", 1, "py-24"], [1, "flex", "flex-col", "items-center", "justify-center"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-2"], [1, "px-8", "py-6", "border-b", "border-slate-50", "dark:border-slate-800", "flex", "justify-between", "items-center", "bg-slate-900", "text-white"], [1, "text-xl", "font-black", "m-0", "tracking-tight", "flex", "items-center", "gap-2"], [1, "text-blue-400"], [1, "text-blue-400", "uppercase", "tracking-tighter"], [1, "text-[9px]", "text-slate-400", "font-black", "uppercase", "tracking-widest", "mt-1"], [1, "w-10", "h-10", "rounded-full", "bg-white/10", "hover:bg-white/20", "transition-all", "flex", "items-center", "justify-center", "border-none", "text-white", "cursor-pointer", 3, "click"], [1, "overflow-x-auto", "max-h-[600px]"], [1, "w-full", "text-left", "border-collapse", "sticky-header"], [1, "sticky", "top-0", "z-10"], [1, "bg-slate-50", "dark:bg-slate-800", "text-[10px]", "uppercase", "tracking-widest", "text-slate-400", "font-black", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "p-6"], [1, "p-6", "text-center"], [1, "divide-y", "divide-slate-50", "dark:divide-slate-800/50"], [1, "hover:bg-slate-50/30", "dark:hover:bg-slate-800/10", "transition-colors"], [1, "p-6", "bg-slate-50", "dark:bg-slate-950", "border-t", "dark:border-slate-800", "flex", "justify-end", "gap-4"], [1, "px-6", "py-3", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "hover:text-slate-800", "dark:hover:text-white", "transition-all", "bg-transparent", "border-none", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-2", "px-8", "py-3", "bg-emerald-600", "hover:bg-emerald-700", "text-white", "rounded-xl", "font-bold", "transition-all", "active:scale-95", "shadow-lg", "shadow-emerald-500/25", "border-none", "cursor-pointer", 3, "click"], [1, "text-lg"], [1, "text-slate-300", "text-sm"], [1, "w-8", "h-8", "rounded-xl", "bg-blue-50", "dark:bg-blue-900/20", "flex", "items-center", "justify-center"], [1, "text-blue-500", "text-sm"], [1, "text-xs", "font-black", "text-slate-800", "dark:text-slate-200", "m-0", "uppercase", "tracking-tight"], [1, "text-[9px]", "text-slate-400", "font-bold", "uppercase", "mt-0.5"], ["color", "primary", 3, "change", "checked"], ["color", "warn", 3, "change", "checked"]], template: function RoleManagement_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Company Roles & Permissions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Manage access levels, edit custom roles, and assign complex operational permissions specifically within your company environment.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4);
      \u0275\u0275conditionalCreate(8, RoleManagement_Conditional_8_Template, 4, 0, "button", 5)(9, RoleManagement_Conditional_9_Template, 6, 0, "button", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, RoleManagement_Conditional_10_Template, 25, 1, "div", 7)(11, RoleManagement_Conditional_11_Template, 38, 1, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.managingPermissionsRoleId ? 8 : 9);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.managingPermissionsRoleId ? 10 : 11);
    }
  }, dependencies: [NgClass, MatCheckbox, MatIcon], styles: ['\n.role-management-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 84px);\n  font-family:\n    "Roboto",\n    "Outfit",\n    sans-serif;\n}\n.header-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.header-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0 0 8px 0;\n}\n.header-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0;\n  font-size: 15px;\n}\n.split-view[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.form-card[_ngcontent-%COMP%] {\n  flex: 1 1 350px;\n  min-width: 300px;\n  max-width: 450px;\n  border-radius: 12px;\n}\n.form-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background-color: #0f172a;\n  padding: 16px 20px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 20px -16px;\n}\n.form-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  color: white;\n  margin: 0;\n  font-size: 18px;\n}\n.role-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 2px;\n}\n.mt-16[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 20px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.table-card[_ngcontent-%COMP%] {\n  flex: 2 1 600px;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 0px;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  color: #0f172a;\n  margin: 0;\n  font-size: 18px;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n.table-container[_ngcontent-%COMP%] {\n  max-height: calc(100vh - 250px);\n  overflow: auto;\n  border-radius: 0 0 12px 12px;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.table-container[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #475569;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.table-container[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-container[_ngcontent-%COMP%]   .interactive-row[_ngcontent-%COMP%]:hover {\n  background-color: #f8fafc;\n}\n.table-container[_ngcontent-%COMP%]   .editing-row[_ngcontent-%COMP%] {\n  background-color: #f0fdf4 !important;\n  border-left: 3px solid #22c55e;\n}\n.actions-header[_ngcontent-%COMP%], \n.actions-cell[_ngcontent-%COMP%] {\n  text-align: right;\n  width: 140px;\n  padding-right: 20px !important;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  display: inline-block;\n}\n.badge.badge-static[_ngcontent-%COMP%] {\n  background-color: #f1f5f9;\n  color: #475569;\n  border: 1px dashed #cbd5e1;\n}\n.badge.badge-custom[_ngcontent-%COMP%] {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.light-code[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 12px;\n  color: #334155;\n}\n.no-data[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n.permissions-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e2e8f0;\n}\n.permissions-header[_ngcontent-%COMP%] {\n  background-color: #f8fafc;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex !important;\n  justify-content: space-between;\n  align-items: center;\n  margin: -16px -16px 20px -16px;\n  width: calc(100% + 32px);\n}\n.permissions-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1e293b;\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.highlight[_ngcontent-%COMP%] {\n  color: #6366f1;\n}\n.close-btn[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n.close-btn[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.max-h-permissions[_ngcontent-%COMP%] {\n  max-height: calc(100vh - 280px);\n}\n.center-col[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100px;\n  padding: 0 !important;\n}\n.mt-20[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.ml-2[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.tree-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.tree-icon[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  margin-right: 6px;\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  margin-top: -4px;\n}\n.module-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  margin-right: 8px;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: #0284c7;\n}\n.fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=role-management.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleManagement, [{
    type: Component,
    args: [{ selector: "app-role-management", standalone: false, template: `<div class="role-management-container p-6 space-y-6">\r
  <!-- Header Section -->\r
  <div\r
    class="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">\r
    <div>\r
      <h2 class="text-3xl font-black text-slate-800 dark:text-white">Company Roles & Permissions</h2>\r
      <p class="text-slate-500 dark:text-slate-400 mt-1 m-0 max-w-2xl">Manage access levels, edit custom roles, and\r
        assign complex operational permissions specifically within your company environment.</p>\r
    </div>\r
    <div class="flex items-center gap-3">\r
      @if(managingPermissionsRoleId){\r
      <button (click)="closePermissions()"\r
        class="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all font-bold text-xs uppercase tracking-widest bg-transparent border-none cursor-pointer">\r
        <mat-icon class="text-sm">arrow_back</mat-icon>\r
        Back to Roles\r
      </button>\r
      } @else {\r
      <button (click)="openRoleDialog()"\r
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
        Create New Role\r
      </button>\r
      }\r
    </div>\r
  </div>\r
\r
  @if (!managingPermissionsRoleId) {\r
  <!-- Roles Listing -->\r
  <div\r
    class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">\r
    <div class="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">\r
      <div>\r
        <h3 class="text-xl font-black text-slate-900 dark:text-slate-50 m-0 tracking-tight">Active Organizational Roles\r
        </h3>\r
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">System Boundaries & Custom Access\r
          Definitions</p>\r
      </div>\r
    </div>\r
\r
  <div class="overflow-x-auto px-2 pb-4">\r
\r
  <table\r
    class="w-full min-w-[1100px] border-separate border-spacing-y-3">\r
\r
    <!-- Head -->\r
    <thead>\r
\r
      <tr>\r
\r
        <th\r
          class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
          Role Identity\r
        </th>\r
\r
        <th\r
          class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
          Access Type\r
        </th>\r
\r
        <th\r
          class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
          Permissions\r
        </th>\r
\r
        <th\r
          class="px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
          Status\r
        </th>\r
\r
        <th\r
          class="px-6 py-4 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
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
      @for (role of roles; track role.id) {\r
\r
      <tr\r
        class="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
        <!-- Role -->\r
        <td\r
          class="px-6 py-5 rounded-l-3xl border-y border-l border-slate-200 dark:border-slate-800">\r
\r
          <div class="flex items-center gap-4">\r
\r
            <!-- Avatar -->\r
            <div\r
              class="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
\r
              <div\r
                class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity">\r
              </div>\r
\r
              <span\r
                class="relative z-10 text-primary font-black text-sm uppercase">\r
\r
                {{ role.name.charAt(0) }}\r
\r
              </span>\r
\r
            </div>\r
\r
            <!-- Info -->\r
            <div>\r
\r
              <h4\r
                class="font-black text-sm text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                {{ role.name }}\r
\r
              </h4>\r
\r
              <p\r
                class="text-[11px] text-slate-400 font-semibold mt-1 uppercase tracking-wide">\r
\r
                UID : #{{ role.id }}\r
\r
              </p>\r
\r
            </div>\r
\r
          </div>\r
\r
        </td>\r
\r
        <!-- Access Type -->\r
        <td\r
          class="px-6 py-5 border-y border-slate-200 dark:border-slate-800">\r
\r
          <span\r
            [ngClass]="{\r
              'bg-blue-50 text-blue-700 border-blue-200': role.type === 'STATIC',\r
              'bg-emerald-50 text-emerald-700 border-emerald-200': role.type === 'CUSTOM'\r
            }"\r
            class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-[11px] font-black uppercase tracking-wide">\r
\r
            <span\r
              class="w-2 h-2 rounded-full"\r
              [ngClass]="{\r
                'bg-blue-500': role.type === 'STATIC',\r
                'bg-emerald-500': role.type === 'CUSTOM'\r
              }">\r
            </span>\r
\r
            {{ role.type === 'STATIC'\r
              ? 'System Protected'\r
              : 'Custom Defined' }}\r
\r
          </span>\r
\r
        </td>\r
\r
        <!-- Permissions -->\r
        <td\r
          class="px-6 py-5 border-y border-slate-200 dark:border-slate-800">\r
\r
          <div class="flex flex-col gap-1">\r
\r
            <p\r
              class="font-black text-slate-800 dark:text-white text-sm">\r
\r
              Access Control\r
\r
            </p>\r
\r
            <p\r
              class="text-[11px] text-slate-400 font-bold uppercase tracking-wide">\r
\r
              Role Based Permissions\r
\r
            </p>\r
\r
          </div>\r
\r
        </td>\r
\r
        <!-- Status -->\r
        <td\r
          class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 text-center">\r
\r
          <span\r
            class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-50 text-green-700 border border-green-200 text-[11px] font-black uppercase tracking-wide">\r
\r
            <span class="w-2 h-2 rounded-full bg-green-500"></span>\r
\r
            Active\r
\r
          </span>\r
\r
        </td>\r
\r
        <!-- Actions -->\r
        <td\r
          class="px-6 py-5 rounded-r-3xl border-y border-r border-slate-200 dark:border-slate-800">\r
\r
          <div\r
            class="flex items-center justify-end gap-2">\r
\r
            <!-- Permissions -->\r
            <button\r
              (click)="openPermissions(role)"\r
              title="Configure Permissions"\r
              class="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
              <span class="material-symbols-outlined text-[18px]">\r
                security\r
              </span>\r
\r
            </button>\r
\r
            @if (role.type !== 'STATIC') {\r
\r
            <!-- Edit -->\r
            <button\r
              (click)="onEdit(role)"\r
              title="Edit Role"\r
              class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
              <span class="material-symbols-outlined text-[18px]">\r
                edit\r
              </span>\r
\r
            </button>\r
\r
            <!-- Delete -->\r
            <button\r
              (click)="onDelete(role.id, role.type)"\r
              title="Delete Role"\r
              class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
              <span class="material-symbols-outlined text-[18px]">\r
                delete\r
              </span>\r
\r
            </button>\r
\r
            }\r
\r
          </div>\r
\r
        </td>\r
\r
      </tr>\r
\r
      } @empty {\r
\r
      <!-- Empty -->\r
      <tr>\r
\r
        <td colspan="5" class="py-24">\r
\r
          <div\r
            class="flex flex-col items-center justify-center">\r
\r
            <div\r
              class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 shadow-inner">\r
\r
              <span\r
                class="material-symbols-outlined text-5xl text-slate-400">\r
\r
                admin_panel_settings\r
\r
              </span>\r
\r
            </div>\r
\r
            <p\r
              class="text-xl font-black text-slate-700 dark:text-slate-200">\r
\r
              No Roles Found\r
\r
            </p>\r
\r
            <p\r
              class="text-sm text-slate-400 mt-2">\r
\r
              Create your first access role\r
\r
            </p>\r
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
</div>\r
  </div>\r
  } @else {\r
  <!-- Permissions View -->\r
  <div\r
    class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden fade-in">\r
    <div\r
      class="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-900 text-white">\r
      <div>\r
        <h3 class="text-xl font-black m-0 tracking-tight flex items-center gap-2">\r
          <mat-icon class="text-blue-400">security</mat-icon>\r
          Access Configuration: <span class="text-blue-400 uppercase tracking-tighter">{{ managingPermissionsRoleName\r
            }}</span>\r
        </h3>\r
        <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Define CRUD matrix for core\r
          application modules</p>\r
      </div>\r
      <button (click)="closePermissions()"\r
        class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border-none text-white cursor-pointer">\r
        <mat-icon>close</mat-icon>\r
      </button>\r
    </div>\r
\r
    <div class="overflow-x-auto max-h-[600px]">\r
      <table class="w-full text-left border-collapse sticky-header">\r
        <thead class="sticky top-0 z-10">\r
          <tr\r
            class="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase tracking-widest text-slate-400 font-black border-b border-slate-100 dark:border-slate-800">\r
            <th class="p-6">Application Module</th>\r
            <th class="p-6 text-center">Create</th>\r
            <th class="p-6 text-center">Read</th>\r
            <th class="p-6 text-center">Update</th>\r
            <th class="p-6 text-center">Delete</th>\r
          </tr>\r
        </thead>\r
        <tbody class="divide-y divide-slate-50 dark:divide-slate-800/50">\r
          @for (item of rolePermissions; track item.id) {\r
          <tr class="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition-colors">\r
            <td class="p-6">\r
              <div [style.padding-left.px]="item.depth * 32" class="flex items-center gap-3">\r
                @if (item.depth > 0) {\r
                <mat-icon class="text-slate-300 text-sm">subdirectory_arrow_right</mat-icon>\r
                }\r
                <div class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">\r
                  <mat-icon class="text-blue-500 text-sm">{{ item.icon || 'domain' }}</mat-icon>\r
                </div>\r
                <div>\r
                  <p class="text-xs font-black text-slate-800 dark:text-slate-200 m-0 uppercase tracking-tight">{{\r
                    item.name }}</p>\r
                  @if (item.title) {\r
                  <p class="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{{ item.title }}</p>\r
                  }\r
                </div>\r
              </div>\r
            </td>\r
            <td class="p-6 text-center">\r
              <mat-checkbox [checked]="item.permissions.can_create" color="primary"\r
                (change)="togglePermission(item, 'can_create', $event.checked)"></mat-checkbox>\r
            </td>\r
            <td class="p-6 text-center">\r
              <mat-checkbox [checked]="item.permissions.can_read" color="primary"\r
                (change)="togglePermission(item, 'can_read', $event.checked)"></mat-checkbox>\r
            </td>\r
            <td class="p-6 text-center">\r
              <mat-checkbox [checked]="item.permissions.can_update" color="primary"\r
                (change)="togglePermission(item, 'can_update', $event.checked)"></mat-checkbox>\r
            </td>\r
            <td class="p-6 text-center">\r
              <mat-checkbox [checked]="item.permissions.can_delete" color="warn"\r
                (change)="togglePermission(item, 'can_delete', $event.checked)"></mat-checkbox>\r
            </td>\r
          </tr>\r
          }\r
        </tbody>\r
      </table>\r
    </div>\r
\r
    <div class="p-6 bg-slate-50 dark:bg-slate-950 border-t dark:border-slate-800 flex justify-end gap-4">\r
      <button (click)="closePermissions()"\r
        class="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all bg-transparent border-none cursor-pointer">\r
        Cancel Configuration\r
      </button>\r
      <button (click)="savePermissions()"\r
        class="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-500/25 border-none cursor-pointer">\r
        <mat-icon class="text-lg">verified</mat-icon>\r
        Apply Permissions Globally\r
      </button>\r
    </div>\r
  </div>\r
  }\r
</div>`, styles: ['/* src/app/modules/users/role-management/role-management.scss */\n.role-management-container {\n  padding: 24px;\n  background-color: #f8fafc;\n  min-height: calc(100vh - 84px);\n  font-family:\n    "Roboto",\n    "Outfit",\n    sans-serif;\n}\n.header-section {\n  margin-bottom: 24px;\n}\n.header-section h2 {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0 0 8px 0;\n}\n.header-section p {\n  color: #64748b;\n  margin: 0;\n  font-size: 15px;\n}\n.split-view {\n  display: flex;\n  gap: 24px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.form-card {\n  flex: 1 1 350px;\n  min-width: 300px;\n  max-width: 450px;\n  border-radius: 12px;\n}\n.form-card mat-card-header {\n  background-color: #0f172a;\n  padding: 16px 20px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 20px -16px;\n}\n.form-card mat-card-header mat-card-title {\n  color: white;\n  margin: 0;\n  font-size: 18px;\n}\n.role-form {\n  display: flex;\n  flex-direction: column;\n}\n.full-width {\n  width: 100%;\n  margin-bottom: 2px;\n}\n.mt-16 {\n  margin-top: 16px;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n.form-actions button {\n  padding: 6px 20px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.table-card {\n  flex: 2 1 600px;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.table-card mat-card-header {\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 0px;\n}\n.table-card mat-card-header mat-card-title {\n  color: #0f172a;\n  margin: 0;\n  font-size: 18px;\n}\n.table-card mat-card-content {\n  padding: 0 !important;\n}\n.table-container {\n  max-height: calc(100vh - 250px);\n  overflow: auto;\n  border-radius: 0 0 12px 12px;\n}\n.table-container table {\n  width: 100%;\n}\n.table-container th.mat-header-cell {\n  background-color: #ffffff;\n  color: #475569;\n  font-weight: 600;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.table-container td.mat-cell {\n  padding: 8px 16px;\n  font-size: 14px;\n  color: #334155;\n  border-bottom: 1px solid #f1f5f9;\n}\n.table-container .interactive-row:hover {\n  background-color: #f8fafc;\n}\n.table-container .editing-row {\n  background-color: #f0fdf4 !important;\n  border-left: 3px solid #22c55e;\n}\n.actions-header,\n.actions-cell {\n  text-align: right;\n  width: 140px;\n  padding-right: 20px !important;\n}\n.badge {\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  display: inline-block;\n}\n.badge.badge-static {\n  background-color: #f1f5f9;\n  color: #475569;\n  border: 1px dashed #cbd5e1;\n}\n.badge.badge-custom {\n  background-color: #e0e7ff;\n  color: #3730a3;\n}\n.light-code {\n  background: #e2e8f0;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 12px;\n  color: #334155;\n}\n.no-data {\n  padding: 40px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n.permissions-card {\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e2e8f0;\n}\n.permissions-header {\n  background-color: #f8fafc;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex !important;\n  justify-content: space-between;\n  align-items: center;\n  margin: -16px -16px 20px -16px;\n  width: calc(100% + 32px);\n}\n.permissions-header mat-card-title {\n  margin: 0;\n  color: #1e293b;\n  font-size: 20px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.highlight {\n  color: #6366f1;\n}\n.close-btn {\n  color: #64748b;\n}\n.close-btn:hover {\n  color: #0f172a;\n}\n.close-btn {\n  margin-left: auto;\n}\n.max-h-permissions {\n  max-height: calc(100vh - 280px);\n}\n.center-col {\n  text-align: center;\n  width: 100px;\n  padding: 0 !important;\n}\n.mt-20 {\n  margin-top: 20px;\n}\n.ml-2 {\n  margin-left: 8px;\n}\n.tree-cell {\n  display: flex;\n  align-items: center;\n}\n.tree-icon {\n  color: #94a3b8;\n  margin-right: 6px;\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  margin-top: -4px;\n}\n.module-icon {\n  font-size: 18px;\n  height: 18px;\n  width: 18px;\n  margin-right: 8px;\n}\n.text-primary {\n  color: #0284c7;\n}\n.fade-in {\n  animation: fadeIn 0.3s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=role-management.css.map */\n'] }]
  }], () => [{ type: RoleService }, { type: ToastrService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleManagement, { className: "RoleManagement", filePath: "app/modules/users/role-management/role-management.ts", lineNumber: 13 });
})();

// src/app/modules/users/role-management/role-management-routing-module.ts
var routes = [{ path: "", component: RoleManagement }];
var RoleManagementRoutingModule = class _RoleManagementRoutingModule {
  static \u0275fac = function RoleManagementRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleManagementRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _RoleManagementRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleManagementRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/users/role-management/role-management-module.ts
var RoleManagementModule = class _RoleManagementModule {
  static \u0275fac = function RoleManagementModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleManagementModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _RoleManagementModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    RoleManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonDialogComponent
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleManagementModule, [{
    type: NgModule,
    args: [{
      declarations: [
        RoleManagement,
        RoleFormDialog
      ],
      imports: [
        CommonModule,
        RoleManagementRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        CommonDialogComponent
      ]
    }]
  }], null, null);
})();
export {
  RoleManagementModule
};
//# sourceMappingURL=chunk-C5ZQHGCV.js.map
