import {
  TeamService
} from "./chunk-RJ7DGS3L.js";
import {
  CommonDialogComponent
} from "./chunk-VKQYMIUT.js";
import {
  MaterialModule
} from "./chunk-KSOTQAYO.js";
import "./chunk-3OEUFLPR.js";
import "./chunk-26HEUADP.js";
import {
  MatIcon
} from "./chunk-KPIKLNUA.js";
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
  NgControlStatus,
  NgControlStatusGroup,
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
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  Output,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction5,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-23RKHPSU.js";

// src/app/modules/users/user-list/invite-user-modal/invite-user-modal.ts
function InviteUserModalComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "First name is required");
    \u0275\u0275elementEnd();
  }
}
function InviteUserModalComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "Last name is required");
    \u0275\u0275elementEnd();
  }
}
function InviteUserModalComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "Please enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function InviteUserModalComponent_div_32_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275listener("click", function InviteUserModalComponent_div_32_div_1_Template_div_click_0_listener() {
      const role_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectRole(role_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r2.name, " ");
  }
}
function InviteUserModalComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275template(1, InviteUserModalComponent_div_32_div_1_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.roles);
  }
}
function InviteUserModalComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1, "Role assignment is required");
    \u0275\u0275elementEnd();
  }
}
var InviteUserModalComponent = class _InviteUserModalComponent {
  fb;
  teamService;
  toast;
  elRef;
  open = false;
  roles = [];
  closed = new EventEmitter();
  saved = new EventEmitter();
  teamForm;
  isRoleDropdownOpen = false;
  constructor(fb, teamService, toast, elRef) {
    this.fb = fb;
    this.teamService = teamService;
    this.toast = toast;
    this.elRef = elRef;
    this.teamForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role_id: ["", Validators.required]
    });
  }
  ngOnInit() {
  }
  get selectedRoleName() {
    const role = this.roles.find((r) => r.id === this.teamForm.get("role_id")?.value);
    return role ? role.name : null;
  }
  toggleRoleDropdown() {
    this.isRoleDropdownOpen = !this.isRoleDropdownOpen;
  }
  selectRole(role) {
    this.teamForm.get("role_id")?.setValue(role.id);
    this.teamForm.get("role_id")?.markAsTouched();
    this.isRoleDropdownOpen = false;
  }
  onClickOutside(event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isRoleDropdownOpen = false;
    }
  }
  inviteUser() {
    if (this.teamForm.invalid) {
      this.toast.error("Please fill in all required fields correctly.");
      this.teamForm.markAllAsTouched();
      return;
    }
    this.teamService.inviteUser(this.teamForm.value).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Invite sent successfully!");
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Failed to invite user");
      }
    });
  }
  static \u0275fac = function InviteUserModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InviteUserModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TeamService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(ElementRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InviteUserModalComponent, selectors: [["app-invite-user-modal"]], hostBindings: function InviteUserModalComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function InviteUserModalComponent_click_HostBindingHandler($event) {
        return ctx.onClickOutside($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { open: "open", roles: "roles" }, outputs: { closed: "closed", saved: "saved" }, standalone: false, decls: 41, vars: 17, consts: [[3, "open"], [1, "flex", "justify-between", "items-center", "px-6", "py-4", "border-b", "dark:border-slate-800"], [1, "m-0", "text-lg", "font-semibold", "text-slate-800", "dark:text-slate-100"], ["type", "button", 1, "material-symbols-outlined", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "transition-colors", "cursor-pointer", "border-none", "bg-transparent", "flex", "items-center", "justify-center", "p-1", "rounded-full", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "p-6", "space-y-5", "bg-white", "dark:bg-slate-900"], [1, "grid", "grid-cols-2", "gap-4"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-2", "block", "ml-1"], ["type", "text", "formControlName", "firstname", "placeholder", "John", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-xl", "p-3", "text-sm", "text-slate-900", "dark:text-slate-50", "font-medium", "focus:ring-2", "focus:ring-blue-500/20", "transition-all", "outline-none"], ["class", "text-red-500 text-[10px] mt-1 ml-1 font-medium italic", 4, "ngIf"], ["type", "text", "formControlName", "lastname", "placeholder", "Doe", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "boder-none", "rounded-xl", "p-3", "text-sm", "text-slate-900", "dark:text-slate-50", "font-medium", "focus:ring-2", "focus:ring-blue-500/20", "transition-all", "outline-none"], ["type", "email", "formControlName", "email", "placeholder", "example@zyno.com", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-xl", "p-3", "text-sm", "text-slate-900", "dark:text-slate-50", "font-medium", "focus:ring-2", "focus:ring-blue-500/20", "transition-all", "outline-none"], [1, "relative"], ["type", "button", 1, "w-full", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "p-3", "pr-8", "text-sm", "text-left", "font-medium", "focus:ring-2", "focus:ring-blue-500/20", "transition-all", "outline-none", "flex", "items-center", "justify-between", 3, "click"], [1, "material-symbols-outlined", "text-slate-400", "text-lg", "transition-transform"], ["class", "absolute z-10 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden", 4, "ngIf"], [1, "px-6", "py-4", "bg-slate-50", "dark:bg-slate-950", "flex", "justify-end", "gap-3", "rounded-b-lg"], ["type", "button", 1, "px-5", "py-2.5", "rounded-xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "transition-all", "cursor-pointer", "bg-transparent", "border-none", 3, "click"], ["type", "submit", 1, "px-6", "py-2.5", "rounded-xl", "text-[10px]", "font-black", "uppercase", "tracking-widest", "bg-blue-600", "text-white", "hover:bg-blue-700", "active:scale-95", "transition-all", "cursor-pointer", "shadow-lg", "shadow-blue-500/20", "border-none", "disabled:opacity-50", "disabled:cursor-not-allowed", "flex", "items-center", "gap-2", 3, "disabled"], [1, "material-symbols-outlined", "text-sm"], [1, "text-red-500", "text-[10px]", "mt-1", "ml-1", "font-medium", "italic"], [1, "absolute", "z-10", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-lg", "divide-y", "divide-slate-100", "dark:divide-slate-800", "overflow-hidden"], ["class", "px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors", 3, "click", 4, "ngFor", "ngForOf"], [1, "px-4", "py-3", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "hover:bg-slate-50", "dark:hover:bg-slate-800", "cursor-pointer", "transition-colors", 3, "click"]], template: function InviteUserModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-common-dialog", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Invite New Member");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function InviteUserModalComponent_Template_button_click_4_listener() {
        return ctx.closed.emit();
      });
      \u0275\u0275text(5, "close");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "form", 4);
      \u0275\u0275listener("ngSubmit", function InviteUserModalComponent_Template_form_ngSubmit_6_listener() {
        return ctx.inviteUser();
      });
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "div")(10, "label", 7);
      \u0275\u0275text(11, "First Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 8);
      \u0275\u0275template(13, InviteUserModalComponent_div_13_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "label", 7);
      \u0275\u0275text(16, "Last Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 10);
      \u0275\u0275template(18, InviteUserModalComponent_div_18_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div")(20, "label", 7);
      \u0275\u0275text(21, "Email Address");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 11);
      \u0275\u0275template(23, InviteUserModalComponent_div_23_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div")(25, "label", 7);
      \u0275\u0275text(26, "Assign Role");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 12)(28, "button", 13);
      \u0275\u0275listener("click", function InviteUserModalComponent_Template_button_click_28_listener() {
        return ctx.toggleRoleDropdown();
      });
      \u0275\u0275text(29);
      \u0275\u0275elementStart(30, "span", 14);
      \u0275\u0275text(31, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(32, InviteUserModalComponent_div_32_Template, 2, 1, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275template(33, InviteUserModalComponent_div_33_Template, 2, 0, "div", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 16)(35, "button", 17);
      \u0275\u0275listener("click", function InviteUserModalComponent_Template_button_click_35_listener() {
        return ctx.closed.emit();
      });
      \u0275\u0275text(36, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 18)(38, "span", 19);
      \u0275\u0275text(39, "send");
      \u0275\u0275elementEnd();
      \u0275\u0275text(40, " Send Invite ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_11_0;
      \u0275\u0275property("open", ctx.open);
      \u0275\u0275advance(6);
      \u0275\u0275property("formGroup", ctx.teamForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.teamForm.get("firstname")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.teamForm.get("firstname")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.teamForm.get("lastname")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.teamForm.get("lastname")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.teamForm.get("email")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.teamForm.get("email")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275classProp("text-slate-400", !ctx.selectedRoleName)("text-slate-900", ctx.selectedRoleName)("dark:text-slate-50", ctx.selectedRoleName);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.selectedRoleName || "Select a role", " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.isRoleDropdownOpen);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isRoleDropdownOpen);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_11_0 = ctx.teamForm.get("role_id")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx.teamForm.get("role_id")) == null ? null : tmp_11_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.teamForm.invalid);
    }
  }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CommonDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InviteUserModalComponent, [{
    type: Component,
    args: [{ selector: "app-invite-user-modal", standalone: false, template: `<app-common-dialog [open]="open">\r
    <div class="flex justify-between items-center px-6 py-4 border-b dark:border-slate-800">\r
        <h3 class="m-0 text-lg font-semibold text-slate-800 dark:text-slate-100">Invite New Member</h3>\r
        <button type="button" (click)="closed.emit()"\r
            class="material-symbols-outlined text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">close</button>\r
    </div>\r
\r
    <form [formGroup]="teamForm" (ngSubmit)="inviteUser()">\r
        <div class="p-6 space-y-5 bg-white dark:bg-slate-900">\r
            <div class="grid grid-cols-2 gap-4">\r
                <div>\r
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">First\r
                        Name</label>\r
                    <input type="text" formControlName="firstname" placeholder="John"\r
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm text-slate-900 dark:text-slate-50 font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none">\r
                    <div *ngIf="teamForm.get('firstname')?.invalid && teamForm.get('firstname')?.touched"\r
                        class="text-red-500 text-[10px] mt-1 ml-1 font-medium italic">First name is required</div>\r
                </div>\r
                <div>\r
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Last\r
                        Name</label>\r
                    <input type="text" formControlName="lastname" placeholder="Doe"\r
                        class="w-full bg-slate-50 dark:bg-slate-800 boder-none rounded-xl p-3 text-sm text-slate-900 dark:text-slate-50 font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none">\r
                    <div *ngIf="teamForm.get('lastname')?.invalid && teamForm.get('lastname')?.touched"\r
                        class="text-red-500 text-[10px] mt-1 ml-1 font-medium italic">Last name is required</div>\r
                </div>\r
            </div>\r
\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Email\r
                    Address</label>\r
                <input type="email" formControlName="email" placeholder="example@zyno.com"\r
                    class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm text-slate-900 dark:text-slate-50 font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none">\r
                <div *ngIf="teamForm.get('email')?.invalid && teamForm.get('email')?.touched"\r
                    class="text-red-500 text-[10px] mt-1 ml-1 font-medium italic">Please enter a valid email</div>\r
            </div>\r
\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Assign\r
                    Role</label>\r
                <div class="relative">\r
                    <button type="button" (click)="toggleRoleDropdown()"\r
                        class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 pr-8 text-sm text-left font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none flex items-center justify-between"\r
                        [class.text-slate-400]="!selectedRoleName" [class.text-slate-900]="selectedRoleName"\r
                        [class.dark:text-slate-50]="selectedRoleName">\r
                        {{ selectedRoleName || 'Select a role' }}\r
                        <span class="material-symbols-outlined text-slate-400 text-lg transition-transform"\r
                            [class.rotate-180]="isRoleDropdownOpen">expand_more</span>\r
                    </button>\r
\r
                    <div *ngIf="isRoleDropdownOpen"\r
                        class="absolute z-10 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">\r
                        <div *ngFor="let role of roles" (click)="selectRole(role)"\r
                            class="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">\r
                            {{ role.name }}\r
                        </div>\r
                    </div>\r
                </div>\r
                <div *ngIf="teamForm.get('role_id')?.invalid && teamForm.get('role_id')?.touched"\r
                    class="text-red-500 text-[10px] mt-1 ml-1 font-medium italic">Role assignment is required</div>\r
            </div>\r
        </div>\r
\r
        <div class="px-6 py-4 bg-slate-50 dark:bg-slate-950 flex justify-end gap-3 rounded-b-lg">\r
            <button type="button" (click)="closed.emit()"\r
                class="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer bg-transparent border-none">\r
                Cancel\r
            </button>\r
            <button type="submit" [disabled]="teamForm.invalid"\r
                class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-blue-500/20 border-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">\r
                <span class="material-symbols-outlined text-sm">send</span>\r
                Send Invite\r
            </button>\r
        </div>\r
    </form>\r
</app-common-dialog>` }]
  }], () => [{ type: FormBuilder }, { type: TeamService }, { type: ToastrService }, { type: ElementRef }], { open: [{
    type: Input
  }], roles: [{
    type: Input
  }], closed: [{
    type: Output
  }], saved: [{
    type: Output
  }], onClickOutside: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InviteUserModalComponent, { className: "InviteUserModalComponent", filePath: "app/modules/users/user-list/invite-user-modal/invite-user-modal.ts", lineNumber: 11 });
})();

// src/app/modules/users/user-list/edit-user-modal/edit-user-modal.ts
function EditUserModalComponent_img_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 29);
    \u0275\u0275listener("error", function EditUserModalComponent_img_15_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAvatarError());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.avatarPreview || ctx_r1.serverUrl + ctx_r1.user.avatar, \u0275\u0275sanitizeUrl);
  }
}
function EditUserModalComponent_mat_icon_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 30);
    \u0275\u0275text(1, "person");
    \u0275\u0275elementEnd();
  }
}
function EditUserModalComponent_div_44_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function EditUserModalComponent_div_44_div_2_Template_div_click_0_listener() {
      const role_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectRole(role_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const role_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-blue-600", role_r4.id === ((tmp_3_0 = ctx_r1.teamForm.get("role_id")) == null ? null : tmp_3_0.value))("text-white", role_r4.id === ((tmp_4_0 = ctx_r1.teamForm.get("role_id")) == null ? null : tmp_4_0.value))("hover:bg-blue-700", role_r4.id === ((tmp_5_0 = ctx_r1.teamForm.get("role_id")) == null ? null : tmp_5_0.value));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r4.name, " ");
  }
}
function EditUserModalComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275template(2, EditUserModalComponent_div_44_div_2_Template, 2, 7, "div", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.roles);
  }
}
function EditUserModalComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 35);
    \u0275\u0275text(1, " Saving Changes... ");
  }
}
function EditUserModalComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 36);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Update Member ");
  }
}
var EditUserModalComponent = class _EditUserModalComponent {
  fb;
  teamService;
  toast;
  elRef;
  open = false;
  user;
  roles = [];
  closed = new EventEmitter();
  saved = new EventEmitter();
  teamForm;
  loading = false;
  selectedFile = null;
  avatarPreview = null;
  avatarError = false;
  serverUrl = environment.serverUrl;
  isRoleDropdownOpen = false;
  constructor(fb, teamService, toast, elRef) {
    this.fb = fb;
    this.teamService = teamService;
    this.toast = toast;
    this.elRef = elRef;
    this.teamForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role_id: ["", Validators.required]
    });
  }
  ngOnInit() {
    if (this.user) {
      this.avatarError = false;
      this.teamForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        role_id: this.user.role_id
      });
      this.avatarPreview = this.user.avatar ? `${this.serverUrl}${this.user.avatar}` : null;
    }
  }
  ngOnChanges() {
    if (this.user) {
      this.avatarError = false;
      this.teamForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        role_id: this.user.role_id
      });
      this.avatarPreview = this.user.avatar ? `${this.serverUrl}${this.user.avatar}` : null;
    }
  }
  get selectedRoleName() {
    const role = this.roles.find((r) => r.id === this.teamForm.get("role_id")?.value);
    return role ? role.name : null;
  }
  toggleRoleDropdown() {
    this.isRoleDropdownOpen = !this.isRoleDropdownOpen;
  }
  selectRole(role) {
    this.teamForm.get("role_id")?.setValue(role.id);
    this.teamForm.get("role_id")?.markAsTouched();
    this.isRoleDropdownOpen = false;
  }
  onClickOutside(event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isRoleDropdownOpen = false;
    }
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.avatarError = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onAvatarError() {
    this.avatarError = true;
  }
  updateUser() {
    if (this.teamForm.invalid) {
      this.toast.error("Please fill in all required fields correctly.");
      this.teamForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append("data", JSON.stringify(this.teamForm.value));
    if (this.selectedFile) {
      formData.append("avatar", this.selectedFile);
    }
    this.teamService.updateUser(this.user.id, formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toast.success(res.message || "User updated successfully!");
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to update user");
      }
    });
  }
  static \u0275fac = function EditUserModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EditUserModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TeamService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(ElementRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditUserModalComponent, selectors: [["app-edit-user-modal"]], hostBindings: function EditUserModalComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function EditUserModalComponent_click_HostBindingHandler($event) {
        return ctx.onClickOutside($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { open: "open", user: "user", roles: "roles" }, outputs: { closed: "closed", saved: "saved" }, standalone: false, features: [\u0275\u0275NgOnChangesFeature], decls: 51, vars: 16, consts: [[3, "open"], [1, "px-6", "py-5"], [1, "flex", "items-center", "justify-between", "mb-6", "pb-4", "border-b", "border-slate-100", "dark:border-slate-800"], [1, "text-xl", "font-black", "text-slate-900", "dark:text-slate-50", "tracking-tight"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest", "mt-1"], ["type", "button", 1, "w-9", "h-9", "rounded-xl", "bg-slate-50", "dark:bg-slate-800", "flex", "items-center", "justify-center", "text-slate-400", "hover:text-slate-900", "dark:hover:text-white", "transition-all", "border-none", "cursor-pointer", "shrink-0", 3, "click"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "flex", "flex-col", "items-center", "gap-3", "pb-2"], [1, "relative", "group"], [1, "w-20", "h-20", "rounded-[28px]", "bg-slate-100", "dark:bg-slate-800", "overflow-hidden", "border-4", "border-white", "dark:border-slate-800", "shadow-xl", "flex", "items-center", "justify-center"], ["class", "w-full h-full object-cover", "alt", "Avatar", 3, "src", "error", 4, "ngIf"], ["class", "text-slate-300 dark:text-slate-600 scale-125", 4, "ngIf"], ["for", "avatar-upload", 1, "absolute", "inset-0", "flex", "items-center", "justify-center", "bg-slate-900/40", "opacity-0", "group-hover:opacity-100", "transition-all", "rounded-[28px]", "cursor-pointer", "backdrop-blur-xs"], [1, "text-white"], ["id", "avatar-upload", "type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "text-[9px]", "font-black", "text-slate-400", "uppercase", "tracking-widest"], [1, "grid", "grid-cols-2", "gap-4"], [1, "space-y-1.5"], [1, "text-[10px]", "font-black", "text-slate-400", "uppercase", "tracking-widest", "ml-1"], ["formControlName", "firstname", "type", "text", "placeholder", "e.g. John", 1, "w-full", "px-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "text-sm", "font-bold", "placeholder-slate-400", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner"], ["formControlName", "lastname", "type", "text", "placeholder", "e.g. Doe", 1, "w-full", "px-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "text-sm", "font-bold", "placeholder-slate-400", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner"], ["formControlName", "email", "type", "email", "placeholder", "john.doe@company.com", 1, "w-full", "px-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "text-sm", "font-bold", "placeholder-slate-400", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner"], [1, "relative"], ["type", "button", 1, "w-full", "px-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "text-sm", "font-bold", "text-left", "flex", "items-center", "justify-between", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner", "cursor-pointer", 3, "click"], [1, "text-slate-400", "transition-transform"], ["class", "absolute z-10 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden", 4, "ngIf"], [1, "flex", "gap-3", "pt-4"], ["type", "button", 1, "flex-1", "py-3", "bg-slate-50", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400", "rounded-xl", "font-black", "text-[11px]", "uppercase", "tracking-widest", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-all", "border-none", "cursor-pointer", 3, "click"], ["type", "submit", 1, "flex-1", "py-3", "bg-linear-to-br", "from-blue-600", "to-indigo-700", "text-white", "rounded-xl", "font-black", "text-[11px]", "uppercase", "tracking-widest", "shadow-xl", "shadow-blue-500/25", "hover:scale-[1.02]", "active:scale-[0.98]", "transition-all", "border-none", "cursor-pointer", "flex", "items-center", "justify-center", "gap-2", 3, "disabled"], ["alt", "Avatar", 1, "w-full", "h-full", "object-cover", 3, "error", "src"], [1, "text-slate-300", "dark:text-slate-600", "scale-125"], [1, "absolute", "z-10", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-xl", "overflow-hidden"], [1, "max-h-52", "overflow-y-auto", "scroll-smooth", "custom-scrollbar", "divide-y", "divide-slate-100", "dark:divide-slate-800"], ["class", "px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors", 3, "bg-blue-600", "text-white", "hover:bg-blue-700", "click", 4, "ngFor", "ngForOf"], [1, "px-4", "py-2.5", "text-sm", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:bg-slate-50", "dark:hover:bg-slate-800", "cursor-pointer", "transition-colors", 3, "click"], [1, "w-4", "h-4", "border-2", "border-white/30", "border-t-white", "rounded-full", "animate-spin"], [1, "text-sm"]], template: function EditUserModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-common-dialog", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h2", 3);
      \u0275\u0275text(5, "Edit Team Member");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Modify account details and permissions");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function EditUserModalComponent_Template_button_click_8_listener() {
        return ctx.closed.emit();
      });
      \u0275\u0275elementStart(9, "mat-icon");
      \u0275\u0275text(10, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "form", 6);
      \u0275\u0275listener("ngSubmit", function EditUserModalComponent_Template_form_ngSubmit_11_listener() {
        return ctx.updateUser();
      });
      \u0275\u0275elementStart(12, "div", 7)(13, "div", 8)(14, "div", 9);
      \u0275\u0275template(15, EditUserModalComponent_img_15_Template, 1, 1, "img", 10)(16, EditUserModalComponent_mat_icon_16_Template, 2, 0, "mat-icon", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "label", 12)(18, "mat-icon", 13);
      \u0275\u0275text(19, "photo_camera");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "input", 14);
      \u0275\u0275listener("change", function EditUserModalComponent_Template_input_change_20_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "p", 15);
      \u0275\u0275text(22, "Click to change profile picture");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 16)(24, "div", 17)(25, "label", 18);
      \u0275\u0275text(26, "First Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 17)(29, "label", 18);
      \u0275\u0275text(30, "Last Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "input", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 17)(33, "label", 18);
      \u0275\u0275text(34, "Email Address");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 17)(37, "label", 18);
      \u0275\u0275text(38, "Access Role");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 22)(40, "button", 23);
      \u0275\u0275listener("click", function EditUserModalComponent_Template_button_click_40_listener() {
        return ctx.toggleRoleDropdown();
      });
      \u0275\u0275text(41);
      \u0275\u0275elementStart(42, "mat-icon", 24);
      \u0275\u0275text(43, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(44, EditUserModalComponent_div_44_Template, 3, 1, "div", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 26)(46, "button", 27);
      \u0275\u0275listener("click", function EditUserModalComponent_Template_button_click_46_listener() {
        return ctx.closed.emit();
      });
      \u0275\u0275text(47, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "button", 28);
      \u0275\u0275conditionalCreate(49, EditUserModalComponent_Conditional_49_Template, 2, 0)(50, EditUserModalComponent_Conditional_50_Template, 3, 0);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("open", ctx.open);
      \u0275\u0275advance(11);
      \u0275\u0275property("formGroup", ctx.teamForm);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", (ctx.avatarPreview || (ctx.user == null ? null : ctx.user.avatar)) && !ctx.avatarError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !(ctx.avatarPreview || (ctx.user == null ? null : ctx.user.avatar)) || ctx.avatarError);
      \u0275\u0275advance(24);
      \u0275\u0275classProp("text-slate-400", !ctx.selectedRoleName)("text-slate-900", ctx.selectedRoleName)("dark:text-slate-50", ctx.selectedRoleName);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.selectedRoleName || "Select a role", " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.isRoleDropdownOpen);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isRoleDropdownOpen);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 49 : 50);
    }
  }, dependencies: [NgForOf, NgIf, MatIcon, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CommonDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditUserModalComponent, [{
    type: Component,
    args: [{ selector: "app-edit-user-modal", standalone: false, template: `<app-common-dialog [open]="open">\r
    <div class="px-6 py-5">\r
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">\r
            <div>\r
                <h2 class="text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight">Edit Team Member</h2>\r
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Modify account details\r
                    and permissions</p>\r
            </div>\r
            <button type="button" (click)="closed.emit()"\r
                class="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border-none cursor-pointer shrink-0">\r
                <mat-icon>close</mat-icon>\r
            </button>\r
        </div>\r
\r
        <form [formGroup]="teamForm" (ngSubmit)="updateUser()" class="space-y-5">\r
            <div class="flex flex-col items-center gap-3 pb-2">\r
                <div class="relative group">\r
                    <div\r
                        class="w-20 h-20 rounded-[28px] bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center">\r
                        <img *ngIf="(avatarPreview || user?.avatar) && !avatarError"\r
                            [src]="avatarPreview || (serverUrl + user.avatar)" class="w-full h-full object-cover"\r
                            (error)="onAvatarError()" alt="Avatar">\r
                        <mat-icon *ngIf="!(avatarPreview || user?.avatar) || avatarError"\r
                            class="text-slate-300 dark:text-slate-600 scale-125">person</mat-icon>\r
                    </div>\r
                    <label for="avatar-upload"\r
                        class="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all rounded-[28px] cursor-pointer backdrop-blur-xs">\r
                        <mat-icon class="text-white">photo_camera</mat-icon>\r
                    </label>\r
                    <input id="avatar-upload" type="file" class="hidden" (change)="onFileSelected($event)"\r
                        accept="image/*">\r
                </div>\r
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Click to change profile\r
                    picture</p>\r
            </div>\r
\r
            <div class="grid grid-cols-2 gap-4">\r
                <div class="space-y-1.5">\r
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First\r
                        Name</label>\r
                    <input formControlName="firstname" type="text"\r
                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner"\r
                        placeholder="e.g. John">\r
                </div>\r
\r
                <div class="space-y-1.5">\r
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last\r
                        Name</label>\r
                    <input formControlName="lastname" type="text"\r
                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner"\r
                        placeholder="e.g. Doe">\r
                </div>\r
            </div>\r
\r
            <div class="space-y-1.5">\r
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email\r
                    Address</label>\r
                <input formControlName="email" type="email"\r
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner"\r
                    placeholder="john.doe@company.com">\r
            </div>\r
\r
            <div class="space-y-1.5">\r
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Role</label>\r
                <div class="relative">\r
                    <button type="button" (click)="toggleRoleDropdown()"\r
                        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-left flex items-center justify-between focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner cursor-pointer"\r
                        [class.text-slate-400]="!selectedRoleName" [class.text-slate-900]="selectedRoleName"\r
                        [class.dark:text-slate-50]="selectedRoleName">\r
                        {{ selectedRoleName || 'Select a role' }}\r
                        <mat-icon class="text-slate-400 transition-transform"\r
                            [class.rotate-180]="isRoleDropdownOpen">expand_more</mat-icon>\r
                    </button>\r
\r
                    <div *ngIf="isRoleDropdownOpen"\r
                        class="absolute z-10 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">\r
                        <div\r
                            class="max-h-52 overflow-y-auto scroll-smooth custom-scrollbar divide-y divide-slate-100 dark:divide-slate-800">\r
                            <div *ngFor="let role of roles" (click)="selectRole(role)"\r
                                class="px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"\r
                                [class.bg-blue-600]="role.id === teamForm.get('role_id')?.value"\r
                                [class.text-white]="role.id === teamForm.get('role_id')?.value"\r
                                [class.hover:bg-blue-700]="role.id === teamForm.get('role_id')?.value">\r
                                {{ role.name }}\r
                            </div>\r
                        </div>\r
                    </div>\r
                </div>\r
            </div>\r
\r
            <div class="flex gap-3 pt-4">\r
                <button type="button" (click)="closed.emit()"\r
                    class="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border-none cursor-pointer">\r
                    Cancel\r
                </button>\r
                <button type="submit" [disabled]="loading"\r
                    class="flex-1 py-3 bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all border-none cursor-pointer flex items-center justify-center gap-2">\r
                    @if (loading) {\r
                    <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>\r
                    Saving Changes...\r
                    } @else {\r
                    <mat-icon class="text-sm">save</mat-icon>\r
                    Update Member\r
                    }\r
                </button>\r
            </div>\r
        </form>\r
    </div>\r
</app-common-dialog>` }]
  }], () => [{ type: FormBuilder }, { type: TeamService }, { type: ToastrService }, { type: ElementRef }], { open: [{
    type: Input
  }], user: [{
    type: Input
  }], roles: [{
    type: Input
  }], closed: [{
    type: Output
  }], saved: [{
    type: Output
  }], onClickOutside: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditUserModalComponent, { className: "EditUserModalComponent", filePath: "app/modules/users/user-list/edit-user-modal/edit-user-modal.ts", lineNumber: 12 });
})();

// src/app/modules/users/user-list/user-list.ts
var _c0 = () => ["Owner", "Admin", "Architect", "Engineer"];
var _c1 = (a0, a1, a2, a3, a4) => ({ "bg-amber-50 text-amber-700 border-amber-200": a0, "bg-rose-50 text-rose-700 border-rose-200": a1, "bg-blue-50 text-blue-700 border-blue-200": a2, "bg-emerald-50 text-emerald-700 border-emerald-200": a3, "bg-slate-100 text-slate-700 border-slate-200": a4 });
function UserList_For_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 24);
  }
  if (rf & 2) {
    const element_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r2.serverUrl + element_r2.avatar, \u0275\u0275sanitizeUrl);
  }
}
function UserList_For_33_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", element_r2.firstname.charAt(0) || "?", "", element_r2.lastname.charAt(0) || "", " ");
  }
}
function UserList_For_33_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275element(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", element_r2.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", element_r2.isActive ? "bg-green-500" : "bg-red-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r2.isActive ? "ACTIVE" : "INACTIVE", " ");
  }
}
function UserList_For_33_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275element(1, "span", 41);
    \u0275\u0275text(2, " Pending Setup ");
    \u0275\u0275elementEnd();
  }
}
function UserList_For_33_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function UserList_For_33_Conditional_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const element_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleStatus(element_r2));
    });
    \u0275\u0275elementStart(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", element_r2.isActive ? "bg-red-50 text-red-600 hover:bg-red-600" : "bg-green-50 text-green-600 hover:bg-green-600");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", element_r2.isActive ? "block" : "check_circle", " ");
  }
}
function UserList_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 16)(1, "td", 21)(2, "div", 22)(3, "div", 23);
    \u0275\u0275conditionalCreate(4, UserList_For_33_Conditional_4_Template, 1, 1, "img", 24)(5, UserList_For_33_Conditional_5_Template, 2, 2, "span", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h4", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 27);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "td", 28)(12, "div")(13, "p", 29);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 30);
    \u0275\u0275text(16, " Registered Email ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "td", 31)(18, "span", 32);
    \u0275\u0275element(19, "span", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 31);
    \u0275\u0275conditionalCreate(22, UserList_For_33_Conditional_22_Template, 3, 3, "span", 32)(23, UserList_For_33_Conditional_23_Template, 3, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td", 35)(25, "div", 36)(26, "button", 37);
    \u0275\u0275listener("click", function UserList_For_33_Template_button_click_26_listener() {
      const element_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(element_r2));
    });
    \u0275\u0275elementStart(27, "span", 38);
    \u0275\u0275text(28, " edit ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, UserList_For_33_Conditional_29_Template, 3, 2, "button", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const element_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275conditional(element_r2.avatar ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", element_r2.firstname, " ", element_r2.lastname, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", element_r2.mobile || "No Mobile Assigned", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", element_r2.email, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(10, _c1, (element_r2.role == null ? null : element_r2.role.name) === "Owner", element_r2.role == null ? null : element_r2.role.name == null ? null : element_r2.role.name.includes("Admin"), element_r2.role == null ? null : element_r2.role.name == null ? null : element_r2.role.name.includes("Architect"), element_r2.role == null ? null : element_r2.role.name == null ? null : element_r2.role.name.includes("Engineer"), !\u0275\u0275pureFunction0(9, _c0).includes((element_r2.role == null ? null : element_r2.role.name) || "")));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (element_r2.role == null ? null : element_r2.role.name) || "Unassigned", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(element_r2.isInviteAccepted ? 22 : 23);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(element_r2.isInviteAccepted ? 29 : -1);
  }
}
function UserList_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "span", 45);
    \u0275\u0275text(3, " group ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 46);
    \u0275\u0275text(5, " No Team Members Found ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 47);
    \u0275\u0275text(7, " Add your first team member ");
    \u0275\u0275elementEnd()();
  }
}
function UserList_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 48)(2, "mat-icon", 49);
    \u0275\u0275text(3, "group_off");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h4", 50);
    \u0275\u0275text(5, "No Teammates Discovered");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 51);
    \u0275\u0275text(7, "Your structural hierarchy is currently empty. Start by inviting new members to your organization.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 52);
    \u0275\u0275listener("click", function UserList_Conditional_35_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openInviteModal());
    });
    \u0275\u0275elementStart(9, "mat-icon", 53);
    \u0275\u0275text(10, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Invite First Member ");
    \u0275\u0275elementEnd()();
  }
}
var UserList = class _UserList {
  fb;
  teamService;
  toast;
  teamMembers = [];
  roles = [];
  serverUrl = environment.serverUrl;
  showInviteModal = false;
  showEditModal = false;
  selectedUser = null;
  constructor(fb, teamService, toast) {
    this.fb = fb;
    this.teamService = teamService;
    this.toast = toast;
  }
  ngOnInit() {
    this.loadRoles();
    this.loadTeam();
  }
  loadRoles() {
    this.teamService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
      error: (err) => console.error(err)
    });
  }
  loadTeam() {
    this.teamService.getTeamMembers().subscribe({
      next: (res) => {
        if (res && res.data && res.data.length > 0) {
          this.teamMembers = res.data;
        }
      },
      error: (err) => {
        this.toast.error("Failed to load team members.");
      }
    });
  }
  openInviteModal() {
    this.showInviteModal = true;
  }
  openEditModal(user) {
    this.selectedUser = user;
    this.showEditModal = true;
  }
  onModalSaved() {
    this.loadTeam();
    this.showInviteModal = false;
    this.showEditModal = false;
    this.selectedUser = null;
  }
  closeInviteModal() {
    this.showInviteModal = false;
  }
  closeEditModal() {
    this.showEditModal = false;
    this.selectedUser = null;
  }
  toggleStatus(member) {
    const newStatus = !member.isActive;
    this.teamService.toggleStatus(member.id, newStatus).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Status updated.");
        this.loadTeam();
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Failed to update status");
      }
    });
  }
  static \u0275fac = function UserList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserList)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(TeamService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserList, selectors: [["app-user-list"]], standalone: false, decls: 38, vars: 8, consts: [[1, "team-management-container", "m-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-xl", "shadow-slate-200/50", "dark:shadow-none", "border", "border-slate-100", "dark:border-slate-800", "overflow-hidden"], [1, "px-8", "py-6", "border-b", "border-slate-50", "dark:border-slate-800", "flex", "justify-between", "items-center"], [1, "text-3xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest", "mt-1"], [1, "flex", "items-center", "gap-2"], [1, "text-[10px]", "font-black", "text-slate-400", "uppercase", "tracking-widest", "bg-slate-50", "dark:bg-slate-800", "px-3", "py-1.5", "rounded-full", "border", "border-slate-100", "dark:border-slate-700"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "overflow-x-auto", "px-2", "pb-4"], [1, "w-full", "min-w-[1000px]", "border-separate", "border-spacing-y-3"], [1, "px-6", "py-4", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "px-6", "py-4", "text-center", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "sticky", "right-0", "z-10", "bg-white", "dark:bg-slate-900", "px-6", "py-4", "text-right", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "group", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], ["class", "flex flex-col items-center justify-center py-24", 4, "ngIf"], [1, "p-20", "text-center", "bg-slate-50/30", "dark:bg-transparent"], [3, "closed", "saved", "open", "roles"], [3, "closed", "saved", "open", "roles", "user"], [1, "px-6", "py-5", "rounded-l-3xl", "border-y", "border-l", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-4"], [1, "w-14", "h-14", "rounded-2xl", "overflow-hidden", "bg-gradient-to-br", "from-slate-100", "to-slate-200", "dark:from-slate-800", "dark:to-slate-700", "flex", "items-center", "justify-center", "border", "border-white", "dark:border-slate-700", "shadow-sm", "shrink-0"], ["alt", "Avatar", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "font-black", "text-sm", "text-slate-600", "dark:text-slate-200", "uppercase"], [1, "font-black", "text-sm", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "text-xs", "text-slate-400", "font-medium", "mt-1"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "font-black", "text-slate-800", "dark:text-white", "text-sm", "break-all"], [1, "text-[11px]", "text-slate-400", "font-bold", "uppercase", "tracking-wide"], [1, "px-6", "py-5", "border-y", "border-slate-200", "dark:border-slate-800", "text-center"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "border", "text-[11px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "w-2", "h-2", "rounded-full", "bg-current"], [1, "inline-flex", "items-center", "gap-2", "px-3", "py-1.5", "rounded-full", "bg-amber-50", "text-amber-700", "border", "border-amber-200", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "sticky", "right-0", "z-10", "bg-white", "dark:bg-slate-900", "group-hover:bg-slate-50", "dark:group-hover:bg-slate-800/80", "px-6", "py-5", "rounded-r-3xl", "border-y", "border-r", "border-slate-200", "dark:border-slate-800", "transition-all", "duration-300"], [1, "flex", "items-center", "justify-end", "gap-2"], [1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-11", "h-11", "rounded-2xl", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "ngClass"], [1, "w-2", "h-2", "rounded-full", 3, "ngClass"], [1, "w-2", "h-2", "rounded-full", "bg-amber-500"], [1, "w-11", "h-11", "rounded-2xl", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click", "ngClass"], [1, "flex", "flex-col", "items-center", "justify-center", "py-24"], [1, "w-24", "h-24", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5", "shadow-inner"], [1, "material-symbols-outlined", "text-5xl", "text-slate-400"], [1, "text-xl", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "text-slate-400", "mt-2"], [1, "w-20", "h-20", "bg-slate-100", "dark:bg-slate-800", "rounded-[32px]", "flex", "items-center", "justify-center", "mx-auto", "mb-6", "shadow-inner"], [1, "text-slate-300", "text-4xl"], [1, "text-lg", "font-black", "text-slate-900", "dark:text-slate-50", "mb-2"], [1, "text-sm", "text-slate-400", "max-w-xs", "mx-auto", "font-medium"], [1, "mt-8", "px-6", "py-3", "bg-blue-600", "text-white", "rounded-xl", "font-bold", "hover:bg-blue-700", "transition-all", "shadow-lg", "shadow-blue-500/20", "flex", "items-center", "gap-2", "mx-auto", "border-none", "cursor-pointer", 3, "click"], [1, "text-sm"]], template: function UserList_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h3", 3);
      \u0275\u0275text(5, "Team Management ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Invite new members to your organization and assign roles mapping system boundaries.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 5)(9, "span", 6);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275listener("click", function UserList_Template_button_click_11_listener() {
        return ctx.openInviteModal();
      });
      \u0275\u0275element(12, "div", 8);
      \u0275\u0275elementStart(13, "div", 9)(14, "span", 10);
      \u0275\u0275text(15, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275text(16, " Invite Member ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 11)(18, "table", 12)(19, "thead")(20, "tr")(21, "th", 13);
      \u0275\u0275text(22, " Team Member ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 13);
      \u0275\u0275text(24, " Email ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 14);
      \u0275\u0275text(26, " Role ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th", 14);
      \u0275\u0275text(28, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th", 15);
      \u0275\u0275text(30, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "tbody");
      \u0275\u0275repeaterCreate(32, UserList_For_33_Template, 30, 16, "tr", 16, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(34, UserList_div_34_Template, 8, 0, "div", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, UserList_Conditional_35_Template, 12, 0, "div", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "app-invite-user-modal", 19);
      \u0275\u0275listener("closed", function UserList_Template_app_invite_user_modal_closed_36_listener() {
        return ctx.closeInviteModal();
      })("saved", function UserList_Template_app_invite_user_modal_saved_36_listener() {
        return ctx.onModalSaved();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "app-edit-user-modal", 20);
      \u0275\u0275listener("closed", function UserList_Template_app_edit_user_modal_closed_37_listener() {
        return ctx.closeEditModal();
      })("saved", function UserList_Template_app_edit_user_modal_saved_37_listener() {
        return ctx.onModalSaved();
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1(" ", ctx.teamMembers.length, " Members ");
      \u0275\u0275advance(22);
      \u0275\u0275repeater(ctx.teamMembers);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.teamMembers.length === 0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.teamMembers.length === 0 ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showInviteModal)("roles", ctx.roles);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showEditModal)("roles", ctx.roles)("user", ctx.selectedUser);
    }
  }, dependencies: [NgClass, NgIf, MatIcon, InviteUserModalComponent, EditUserModalComponent], styles: ["\n.main[_ngcontent-%COMP%]   .main-table[_ngcontent-%COMP%] {\n  border: 1px solid rgb(168, 168, 168);\n  border-radius: 4px;\n}\n.main[_ngcontent-%COMP%]   .main-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 32px;\n}\n.main[_ngcontent-%COMP%]   .main-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 900;\n  font-size: 11px;\n  border-bottom: 1px solid #dadada;\n  background-color: rgb(119, 119, 119);\n  color: #fff;\n  font-weight: 400;\n}\n.main[_ngcontent-%COMP%]   .main-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: 900;\n  font-size: 14px;\n  border: 1px solid #dadada;\n  font-weight: 400;\n  font-size: 10px;\n}\n.main[_ngcontent-%COMP%]   .main-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin: 0 8px 0 0;\n  color: #063178;\n  cursor: pointer;\n}\n.main[_ngcontent-%COMP%]   .main-table[_ngcontent-%COMP%]   .paddin-box[_ngcontent-%COMP%] {\n  padding: 16px 32px 32px 32px;\n}\n[_nghost-%COMP%]  .mat-mdc-paginator-container {\n  display: -webkit-inline-box;\n}\n[_nghost-%COMP%]  .mat-sort-header-content {\n  text-align: initial;\n}\n[_nghost-%COMP%]  .mdc-data-table__cell, \n.mdc-data-table__header-cell[_ngcontent-%COMP%] {\n  padding: 0 10px 0 10px;\n}\n.job-nav[_ngcontent-%COMP%] {\n  padding: 2% 2%;\n}\n.save-style[_ngcontent-%COMP%] {\n  float: right;\n  margin: 0% 5% 4%;\n  font-size: 11px;\n}\n.example-section[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.example-margin[_ngcontent-%COMP%] {\n  margin: 0 12px;\n}\n.mainModule[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #ebebeb;\n  border-radius: 5px;\n  display: inline-block;\n  position: relative;\n  box-shadow: 1px 2px 3px 1px rgba(131, 131, 131, 0.6705882353);\n}\n.example-list-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  margin-top: 4px;\n}\n.example-list-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: inline;\n  padding: 0px 30px;\n}\n[_nghost-%COMP%]  .label {\n  width: 100px;\n}\n.example-section[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.example-margin[_ngcontent-%COMP%] {\n  margin: 0 12px;\n}\nul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  margin-top: 4px;\n}\nimg.empty-img[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.empty-screen[_ngcontent-%COMP%] {\n  padding: 40px 0px;\n}\n.empty-screen[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #397bd5;\n  font-weight: 500;\n  padding: 19px 0px 0px 22px;\n  text-align: center;\n}\n.btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background-color: #063178;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  margin-bottom: 12px;\n}\n.parentMenu[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0 0 0 32px;\n}\n.childMenu[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0 0 0 65px;\n}\n.chiledPart[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  overflow: hidden;\n}\n.m_count[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 15px;\n  top: 12px;\n  background: white;\n  display: inline-block;\n  aspect-ratio: 1/1;\n  width: 20px;\n  text-align: center;\n  border-radius: 5px;\n  line-height: 20px;\n  box-shadow: inset 0px 0px 5px 1px rgba(6, 49, 120, 0.5411764706);\n  color: #706967;\n  font-size: 8px;\n}\n.upIcon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 42px;\n  margin-top: 12px;\n  float: right;\n  color: white;\n}\n.form_head[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #5c6bc0 0%,\n      #3f51b5 100%);\n  color: white;\n  padding: 18px 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.form_head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 500;\n  letter-spacing: 0.3px;\n}\n/*# sourceMappingURL=user-list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserList, [{
    type: Component,
    args: [{ selector: "app-user-list", standalone: false, template: `<div class="team-management-container m-4">\r
\r
  <div\r
    class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">\r
    <div class="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">\r
      <div>\r
        <h3 class="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Team Management\r
        </h3>\r
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Invite new members to your\r
          organization and assign roles mapping system boundaries.</p>\r
      </div>\r
      <div class="flex items-center gap-2">\r
        <span\r
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700">\r
          {{ teamMembers.length }} Members\r
        </span>\r
\r
        <button (click)="openInviteModal()"\r
          class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff]">\r
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
          Invite Member\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="overflow-x-auto px-2 pb-4">\r
\r
      <table class="w-full min-w-[1000px] border-separate border-spacing-y-3">\r
\r
        <thead>\r
          <tr>\r
            <th class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
              Team Member\r
            </th>\r
\r
            <th class="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
              Email\r
            </th>\r
\r
            <th class="px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
              Role\r
            </th>\r
\r
            <th class="px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
              Status\r
            </th>\r
\r
            <th\r
              class="sticky right-0 z-10 bg-white dark:bg-slate-900 px-6 py-4 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">\r
              Actions\r
            </th>\r
          </tr>\r
\r
        </thead>\r
\r
        <tbody>\r
\r
          @for (element of teamMembers; track $index) {\r
\r
          <tr\r
            class="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
            <td class="px-6 py-5 rounded-l-3xl border-y border-l border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-center gap-4">\r
\r
                <div\r
                  class="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center border border-white dark:border-slate-700 shadow-sm shrink-0">\r
\r
                  @if (element.avatar) {\r
\r
                  <img [src]="serverUrl + element.avatar" class="w-full h-full object-cover" alt="Avatar">\r
\r
                  } @else {\r
\r
                  <span class="font-black text-sm text-slate-600 dark:text-slate-200 uppercase">\r
\r
                    {{ element.firstname.charAt(0) || '?' }}{{ element.lastname.charAt(0) || '' }}\r
\r
                  </span>\r
\r
                  }\r
\r
                </div>\r
\r
                <div>\r
\r
                  <h4\r
                    class="font-black text-sm text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                    {{ element.firstname }} {{ element.lastname }}\r
\r
                  </h4>\r
\r
                  <p class="text-xs text-slate-400 font-medium mt-1">\r
\r
                    {{ element.mobile || 'No Mobile Assigned' }}\r
\r
                  </p>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
            <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div>\r
\r
                <p class="font-black text-slate-800 dark:text-white text-sm break-all">\r
\r
                  {{ element.email }}\r
\r
                </p>\r
\r
                <p class="text-[11px] text-slate-400 font-bold uppercase tracking-wide">\r
\r
                  Registered Email\r
\r
                </p>\r
\r
              </div>\r
\r
            </td>\r
\r
            <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 text-center">\r
\r
              <span [ngClass]="{\r
              'bg-amber-50 text-amber-700 border-amber-200': element.role?.name === 'Owner',\r
              'bg-rose-50 text-rose-700 border-rose-200': element.role?.name?.includes('Admin'),\r
              'bg-blue-50 text-blue-700 border-blue-200': element.role?.name?.includes('Architect'),\r
              'bg-emerald-50 text-emerald-700 border-emerald-200': element.role?.name?.includes('Engineer'),\r
              'bg-slate-100 text-slate-700 border-slate-200': !['Owner', 'Admin', 'Architect', 'Engineer'].includes(element.role?.name|| '')\r
            }"\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wide">\r
\r
                <span class="w-2 h-2 rounded-full bg-current">\r
                </span>\r
\r
                {{ element.role?.name || 'Unassigned' }}\r
\r
              </span>\r
\r
            </td>\r
\r
            <td class="px-6 py-5 border-y border-slate-200 dark:border-slate-800 text-center">\r
\r
              @if (element.isInviteAccepted) {\r
\r
              <span [ngClass]="element.isActive\r
              ? 'bg-green-50 text-green-700 border-green-200'\r
              : 'bg-red-50 text-red-700 border-red-200'"\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wide">\r
\r
                <span class="w-2 h-2 rounded-full" [ngClass]="element.isActive\r
                ? 'bg-green-500'\r
                : 'bg-red-500'">\r
                </span>\r
\r
                {{ element.isActive ? 'ACTIVE' : 'INACTIVE' }}\r
\r
              </span>\r
\r
              } @else {\r
\r
              <span\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-black uppercase tracking-wide">\r
\r
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>\r
\r
                Pending Setup\r
\r
              </span>\r
\r
              }\r
\r
            </td>\r
\r
            <td\r
              class="sticky right-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/80 px-6 py-5 rounded-r-3xl border-y border-r border-slate-200 dark:border-slate-800 transition-all duration-300">\r
\r
              <div class="flex items-center justify-end gap-2">\r
\r
                <button (click)="openEditModal(element)"\r
                  class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                  <span class="material-symbols-outlined text-[18px]">\r
                    edit\r
                  </span>\r
\r
                </button>\r
\r
                @if (element.isInviteAccepted) {\r
\r
                <button (click)="toggleStatus(element)" [ngClass]="element.isActive\r
                ? 'bg-red-50 text-red-600 hover:bg-red-600'\r
                : 'bg-green-50 text-green-600 hover:bg-green-600'"\r
                  class="w-11 h-11 rounded-2xl hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center">\r
\r
                  <span class="material-symbols-outlined text-[18px]">\r
\r
                    {{ element.isActive ? 'block' : 'check_circle' }}\r
\r
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
          }\r
\r
        </tbody>\r
\r
      </table>\r
\r
      <div *ngIf="teamMembers.length === 0" class="flex flex-col items-center justify-center py-24">\r
\r
        <div\r
          class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 shadow-inner">\r
\r
          <span class="material-symbols-outlined text-5xl text-slate-400">\r
\r
            group\r
\r
          </span>\r
\r
        </div>\r
\r
        <p class="text-xl font-black text-slate-700 dark:text-slate-200">\r
\r
          No Team Members Found\r
\r
        </p>\r
\r
        <p class="text-sm text-slate-400 mt-2">\r
\r
          Add your first team member\r
\r
        </p>\r
\r
      </div>\r
\r
    </div>\r
\r
    @if (teamMembers.length === 0) {\r
    <div class="p-20 text-center bg-slate-50/30 dark:bg-transparent">\r
      <div\r
        class="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner">\r
        <mat-icon class="text-slate-300 text-4xl">group_off</mat-icon>\r
      </div>\r
      <h4 class="text-lg font-black text-slate-900 dark:text-slate-50 mb-2">No Teammates Discovered</h4>\r
      <p class="text-sm text-slate-400 max-w-xs mx-auto font-medium">Your structural hierarchy is currently empty. Start\r
        by inviting new members to your organization.</p>\r
      <button (click)="openInviteModal()"\r
        class="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 mx-auto border-none cursor-pointer">\r
        <mat-icon class="text-sm">person_add</mat-icon>\r
        Invite First Member\r
      </button>\r
    </div>\r
    }\r
  </div>\r
\r
  <app-invite-user-modal [open]="showInviteModal" [roles]="roles" (closed)="closeInviteModal()"\r
    (saved)="onModalSaved()"></app-invite-user-modal>\r
\r
  <app-edit-user-modal [open]="showEditModal" [roles]="roles" [user]="selectedUser" (closed)="closeEditModal()"\r
    (saved)="onModalSaved()"></app-edit-user-modal>\r
</div>`, styles: ["/* src/app/modules/users/user-list/user-list.scss */\n.main .main-table {\n  border: 1px solid rgb(168, 168, 168);\n  border-radius: 4px;\n}\n.main .main-table table {\n  width: 100%;\n  padding: 32px;\n}\n.main .main-table table th {\n  font-weight: 900;\n  font-size: 11px;\n  border-bottom: 1px solid #dadada;\n  background-color: rgb(119, 119, 119);\n  color: #fff;\n  font-weight: 400;\n}\n.main .main-table table td {\n  font-weight: 900;\n  font-size: 14px;\n  border: 1px solid #dadada;\n  font-weight: 400;\n  font-size: 10px;\n}\n.main .main-table table td a {\n  margin: 0 8px 0 0;\n  color: #063178;\n  cursor: pointer;\n}\n.main .main-table .paddin-box {\n  padding: 16px 32px 32px 32px;\n}\n:host::ng-deep .mat-mdc-paginator-container {\n  display: -webkit-inline-box;\n}\n:host::ng-deep .mat-sort-header-content {\n  text-align: initial;\n}\n:host::ng-deep .mdc-data-table__cell,\n.mdc-data-table__header-cell {\n  padding: 0 10px 0 10px;\n}\n.job-nav {\n  padding: 2% 2%;\n}\n.save-style {\n  float: right;\n  margin: 0% 5% 4%;\n  font-size: 11px;\n}\n.example-section {\n  margin: 12px 0;\n}\n.example-margin {\n  margin: 0 12px;\n}\n.mainModule {\n  width: 100%;\n  background: #ebebeb;\n  border-radius: 5px;\n  display: inline-block;\n  position: relative;\n  box-shadow: 1px 2px 3px 1px rgba(131, 131, 131, 0.6705882353);\n}\n.example-list-section ul {\n  list-style-type: none;\n  margin-top: 4px;\n}\n.example-list-section ul li {\n  display: inline;\n  padding: 0px 30px;\n}\n:host::ng-deep .label {\n  width: 100px;\n}\n.example-section {\n  margin: 12px 0;\n}\n.example-margin {\n  margin: 0 12px;\n}\nul {\n  list-style-type: none;\n  margin-top: 4px;\n}\nimg.empty-img {\n  width: 100%;\n}\n.empty-screen {\n  padding: 40px 0px;\n}\n.empty-screen .row p {\n  font-size: 16px;\n  color: #397bd5;\n  font-weight: 500;\n  padding: 19px 0px 0px 22px;\n  text-align: center;\n}\n.btns button {\n  background-color: #063178;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  margin-bottom: 12px;\n}\n.parentMenu {\n  width: 100%;\n  margin: 0 0 0 32px;\n}\n.childMenu {\n  width: 100%;\n  margin: 0 0 0 65px;\n}\n.chiledPart {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  overflow: hidden;\n}\n.m_count {\n  position: absolute;\n  right: 15px;\n  top: 12px;\n  background: white;\n  display: inline-block;\n  aspect-ratio: 1/1;\n  width: 20px;\n  text-align: center;\n  border-radius: 5px;\n  line-height: 20px;\n  box-shadow: inset 0px 0px 5px 1px rgba(6, 49, 120, 0.5411764706);\n  color: #706967;\n  font-size: 8px;\n}\n.upIcon mat-icon {\n  margin-right: 42px;\n  margin-top: 12px;\n  float: right;\n  color: white;\n}\n.form_head {\n  background:\n    linear-gradient(\n      135deg,\n      #5c6bc0 0%,\n      #3f51b5 100%);\n  color: white;\n  padding: 18px 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.form_head h3 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 500;\n  letter-spacing: 0.3px;\n}\n/*# sourceMappingURL=user-list.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: TeamService }, { type: ToastrService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserList, { className: "UserList", filePath: "app/modules/users/user-list/user-list.ts", lineNumber: 15 });
})();

// src/app/modules/users/user-list/user-list-routing-module.ts
var routes = [{ path: "", component: UserList }];
var UserListRoutingModule = class _UserListRoutingModule {
  static \u0275fac = function UserListRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserListRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UserListRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserListRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/users/user-list/user-list-module.ts
var UserListModule = class _UserListModule {
  static \u0275fac = function UserListModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserListModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UserListModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    UserListRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonDialogComponent
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserListModule, [{
    type: NgModule,
    args: [{
      declarations: [
        UserList,
        InviteUserModalComponent,
        EditUserModalComponent
      ],
      imports: [
        CommonModule,
        UserListRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        CommonDialogComponent
      ]
    }]
  }], null, null);
})();
export {
  UserListModule
};
//# sourceMappingURL=chunk-ZBUZAU36.js.map
