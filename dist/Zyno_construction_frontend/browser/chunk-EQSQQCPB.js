import {
  AuthService
} from "./chunk-D4MSAAMA.js";
import {
  MatProgressSpinner,
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
import "./chunk-M3DYL5PG.js";
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
} from "./chunk-WFU7JF4C.js";
import {
  CommonModule,
  Component,
  NgClass,
  NgIf,
  NgModule,
  Router,
  RouterModule,
  RouterOutlet,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-F27QM527.js";

// src/app/auth/auth.ts
var Auth = class _Auth {
  static \u0275fac = function Auth_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Auth)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Auth, selectors: [["app-auth"]], standalone: false, decls: 1, vars: 0, template: function Auth_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Auth, [{
    type: Component,
    args: [{ selector: "app-auth", standalone: false, template: "<router-outlet></router-outlet>" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Auth, { className: "Auth", filePath: "app/auth/auth.ts", lineNumber: 9 });
})();

// src/app/auth/login/login.ts
var _c0 = (a0) => ({ "register-mode": a0 });
function Login_div_15_div_9_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function Login_div_15_div_9_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function Login_div_15_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275template(1, Login_div_15_div_9_span_1_Template, 2, 0, "span", 23)(2, Login_div_15_div_9_span_2_Template, 2, 0, "span", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.login["email"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.login["email"].hasError("email"));
  }
}
function Login_div_15_div_17_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function Login_div_15_div_17_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Minimum 6 characters required");
    \u0275\u0275elementEnd();
  }
}
function Login_div_15_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275template(1, Login_div_15_div_17_span_1_Template, 2, 0, "span", 23)(2, Login_div_15_div_17_span_2_Template, 2, 0, "span", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.login["password"].hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.login["password"].hasError("minlength"));
  }
}
function Login_div_15_mat_spinner_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 27);
  }
}
function Login_div_15_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
  }
}
function Login_div_15_mat_icon_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "arrow_forward");
    \u0275\u0275elementEnd();
  }
}
function Login_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "form", 13);
    \u0275\u0275listener("ngSubmit", function Login_div_15_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loginFormSubmit());
    });
    \u0275\u0275elementStart(2, "div", 14)(3, "label");
    \u0275\u0275text(4, "Email Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 15)(6, "mat-icon");
    \u0275\u0275text(7, "mail_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, Login_div_15_div_9_Template, 3, 2, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 14)(11, "label");
    \u0275\u0275text(12, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 15)(14, "mat-icon");
    \u0275\u0275text(15, "lock_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, Login_div_15_div_17_Template, 3, 2, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 19)(19, "a", 20);
    \u0275\u0275text(20, "Forgot password?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 21);
    \u0275\u0275template(22, Login_div_15_mat_spinner_22_Template, 1, 0, "mat-spinner", 22)(23, Login_div_15_span_23_Template, 2, 0, "span", 23)(24, Login_div_15_mat_icon_24_Template, 2, 0, "mat-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 24)(26, "span");
    \u0275\u0275text(27, "Are you a new company?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "a", 25);
    \u0275\u0275listener("click", function Login_div_15_Template_a_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleView());
    });
    \u0275\u0275text(29, "Register Now");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.loginForm);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.login["email"].touched) && ctx_r1.login["email"].invalid);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.login["password"].touched) && ctx_r1.login["password"].invalid);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.showLoader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showLoader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.showLoader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.showLoader);
  }
}
function Login_div_16_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "Company name is required");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "Mobile is required");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "Enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "Min 6 characters");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_mat_spinner_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 27);
  }
}
function Login_div_16_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Create Account");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_mat_icon_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check_circle_outline");
    \u0275\u0275elementEnd();
  }
}
function Login_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "form", 28);
    \u0275\u0275listener("ngSubmit", function Login_div_16_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.registerFormSubmit());
    });
    \u0275\u0275elementStart(2, "div", 29)(3, "div", 30)(4, "label");
    \u0275\u0275text(5, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 15)(7, "mat-icon");
    \u0275\u0275text(8, "person_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, Login_div_16_div_10_Template, 2, 0, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 30)(12, "label");
    \u0275\u0275text(13, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 15);
    \u0275\u0275element(15, "input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, Login_div_16_div_16_Template, 2, 0, "div", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 14)(18, "label");
    \u0275\u0275text(19, "Company Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 15)(21, "mat-icon");
    \u0275\u0275text(22, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, Login_div_16_div_24_Template, 2, 0, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 14)(26, "label");
    \u0275\u0275text(27, "Mobile Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 15)(29, "mat-icon");
    \u0275\u0275text(30, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, Login_div_16_div_32_Template, 2, 0, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 14)(34, "label");
    \u0275\u0275text(35, "Work Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 15)(37, "mat-icon");
    \u0275\u0275text(38, "mail_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "input", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, Login_div_16_div_40_Template, 2, 0, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 14)(42, "label");
    \u0275\u0275text(43, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 15)(45, "mat-icon");
    \u0275\u0275text(46, "lock_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "input", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275template(48, Login_div_16_div_48_Template, 2, 0, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 21);
    \u0275\u0275template(50, Login_div_16_mat_spinner_50_Template, 1, 0, "mat-spinner", 22)(51, Login_div_16_span_51_Template, 2, 0, "span", 23)(52, Login_div_16_mat_icon_52_Template, 2, 0, "mat-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 24)(54, "span");
    \u0275\u0275text(55, "Already have an account?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "a", 25);
    \u0275\u0275listener("click", function Login_div_16_Template_a_click_56_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleView());
    });
    \u0275\u0275text(57, "Sign In");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.registerForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.register["firstname"].touched) && ctx_r1.register["firstname"].invalid);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.register["lastname"].touched) && ctx_r1.register["lastname"].invalid);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.register["name"].touched) && ctx_r1.register["name"].invalid);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.register["mobile"].touched) && ctx_r1.register["mobile"].invalid);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.register["email"].touched) && ctx_r1.register["email"].invalid);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", (ctx_r1.isSubmited || ctx_r1.register["password"].touched) && ctx_r1.register["password"].invalid);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.showLoader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showLoader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.showLoader);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.showLoader);
  }
}
var Login = class _Login {
  fb;
  route;
  toast;
  auth;
  loginForm;
  registerForm;
  isRegistering = false;
  showLoader = false;
  isSubmited = false;
  constructor(fb, route, toast, auth) {
    this.fb = fb;
    this.route = route;
    this.toast = toast;
    this.auth = auth;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
    this.registerForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile: ["", [Validators.required]],
      name: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.auth.getAuthUser()) {
      this.route.navigate(["/master/dashboard"]);
    }
  }
  get login() {
    return this.loginForm.controls;
  }
  get register() {
    return this.registerForm.controls;
  }
  toggleView() {
    this.isRegistering = !this.isRegistering;
    this.isSubmited = false;
  }
  loginFormSubmit() {
    this.isSubmited = true;
    if (this.loginForm.invalid) {
      this.toast.error("Please enter valid credentials", "Validation Error");
      return;
    }
    this.showLoader = true;
    this.auth.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        this.showLoader = false;
        this.toast.success("Welcome back!", "Login Successful");
        this.route.navigate(["/master/dashboard"]);
      },
      error: (err) => {
        this.showLoader = false;
        this.toast.error(err.error?.message || "Login failed", "Error");
      }
    });
  }
  registerFormSubmit() {
    this.isSubmited = true;
    if (this.registerForm.invalid) {
      this.toast.error("Please fix the validation errors", "Validation Error");
      return;
    }
    this.showLoader = true;
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.showLoader = false;
        this.toast.success("Company Registered and Login Successful!", "Welcome");
        this.route.navigate(["/master/dashboard"]);
      },
      error: (err) => {
        this.showLoader = false;
        this.toast.error(err.error?.message || "Registration failed", "Error");
      }
    });
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], standalone: false, decls: 17, vars: 7, consts: [[1, "splitra-auth-page"], [1, "auth-container"], [1, "glass-bg"], [1, "blob", "blob-1"], [1, "blob", "blob-2"], [1, "blob", "blob-3"], [1, "auth-card", 3, "ngClass"], [1, "auth-branding"], [1, "logo-wrapper"], ["src", "assets/image/zyno_construction_logo.png", "alt", "Zyno Construction Logo", 1, "brand-logo"], [1, "auth-forms-wrapper"], ["class", "auth-form-container", 4, "ngIf"], [1, "auth-form-container"], [1, "modern-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "input-wrapper"], ["type", "email", "formControlName", "email", "placeholder", "superadmin@zyno.com"], ["class", "error-msg", 4, "ngIf"], ["type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"], [1, "form-actions"], ["href", "javascript:void(0)", 1, "forgot-link"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["diameter", "20", "class", "btn-spinner", 4, "ngIf"], [4, "ngIf"], [1, "toggle-action"], ["href", "javascript:void(0)", 3, "click"], [1, "error-msg"], ["diameter", "20", 1, "btn-spinner"], [1, "modern-form", "register-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "form-group", "half"], ["type", "text", "formControlName", "firstname", "placeholder", "John"], ["type", "text", "formControlName", "lastname", "placeholder", "Doe"], ["type", "text", "formControlName", "name", "placeholder", "Zyno Builders LLC"], ["type", "tel", "formControlName", "mobile", "placeholder", "+1 (555) 000-0000"], ["type", "email", "formControlName", "email", "placeholder", "admin@company.com"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7)(8, "div", 8);
      \u0275\u0275element(9, "img", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "h2");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 10);
      \u0275\u0275template(15, Login_div_15_Template, 30, 7, "div", 11)(16, Login_div_16_Template, 58, 11, "div", 11);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c0, ctx.isRegistering));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isRegistering ? "Start Your Journey" : "Welcome Back");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isRegistering ? "Create your company account to revolutionize your construction management." : "Sign in to access your Zyno operations dashboard.");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.isRegistering);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isRegistering);
    }
  }, dependencies: [NgClass, NgIf, MatIcon, MatProgressSpinner, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['@import "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";\n\n\n.splitra-auth-page[_ngcontent-%COMP%] {\n  font-family: "Outfit", sans-serif;\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #0f172a;\n  position: relative;\n  overflow: hidden;\n}\n.glass-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  background-image: url(/assets/image/zyno_construction.jpg);\n  background-size: cover;\n  background-position: center;\n}\n.glass-bg[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.85);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n}\n.blob[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  z-index: 1;\n  opacity: 0.6;\n  animation: _ngcontent-%COMP%_float 20s infinite ease-in-out alternate;\n}\n.blob-1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: #3b82f6;\n  top: -10%;\n  left: 10%;\n  animation-delay: 0s;\n}\n.blob-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: #06b6d4;\n  bottom: 0%;\n  right: 15%;\n  animation-delay: -5s;\n}\n.blob-3[_ngcontent-%COMP%] {\n  width: 350px;\n  height: 350px;\n  background: #8b5cf6;\n  top: 40%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  animation-delay: -10s;\n}\n@keyframes _ngcontent-%COMP%_float {\n  0% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -50px) scale(1.1);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.9);\n  }\n  100% {\n    transform: translate(0, 0) scale(1);\n  }\n}\n.auth-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  max-width: 1000px;\n  padding: 20px;\n  display: flex;\n  justify-content: center;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  border-radius: 24px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  min-height: 550px;\n}\n.auth-branding[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 60px 40px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1) 0%,\n      rgba(6, 182, 212, 0.1) 100%);\n  border-right: 1px solid rgba(255, 255, 255, 0.05);\n}\n.logo-wrapper[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n  text-align: center;\n}\n.brand-logo[_ngcontent-%COMP%] {\n  max-height: 70px;\n  max-width: 100%;\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\n}\n.auth-branding[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 36px;\n  font-weight: 700;\n  margin: 0 0 15px 0;\n  line-height: 1.2;\n}\n.auth-branding[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n}\n.auth-forms-wrapper[_ngcontent-%COMP%] {\n  flex: 1.2;\n  padding: 60px 50px;\n  background: rgba(15, 23, 42, 0.4);\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.auth-form-container[_ngcontent-%COMP%] {\n  width: 100%;\n  animation: _ngcontent-%COMP%_fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n@keyframes _ngcontent-%COMP%_fadeSlideUp {\n  0% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.modern-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  flex: 1;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #cbd5e1;\n  font-size: 14px;\n  font-weight: 500;\n  margin-bottom: 8px;\n}\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-wrapper[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 16px;\n  color: #64748b;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  transition: color 0.3s ease;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within   mat-icon[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  padding: 14px 16px 14px 48px;\n  border-radius: 12px;\n  color: #fff;\n  font-size: 15px;\n  font-family: inherit;\n  transition: all 0.3s ease;\n}\n.input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background: rgba(255, 255, 255, 0.08);\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);\n}\n.input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #475569;\n}\n.error-msg[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 12px;\n  margin-top: 6px;\n  display: flex;\n  align-items: center;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 30px;\n  margin-top: -10px;\n}\n.forgot-link[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-size: 14px;\n  text-decoration: none;\n  font-weight: 500;\n  transition: color 0.3s ease;\n}\n.forgot-link[_ngcontent-%COMP%]:hover {\n  color: #60a5fa;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6 0%,\n      #06b6d4 100%);\n  color: white;\n  border: none;\n  padding: 16px;\n  border-radius: 12px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  transition: all 0.3s ease;\n  box-shadow: 0 10px 20px -10px rgba(59, 130, 246, 0.5);\n  font-family: inherit;\n  margin-top: 10px;\n}\n.btn-primary[_ngcontent-%COMP%]:not(:disabled):hover {\n  transform: translateY(-2px);\n  box-shadow: 0 15px 25px -10px rgba(59, 130, 246, 0.6);\n}\n.btn-primary[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.btn-spinner[_ngcontent-%COMP%] {\n  margin: 0;\n}\n[_nghost-%COMP%]     .mat-mdc-progress-spinner circle {\n  stroke: #fff !important;\n}\n.toggle-action[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n.toggle-action[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-weight: 600;\n  text-decoration: none;\n  margin-left: 5px;\n  transition: color 0.3s;\n}\n.toggle-action[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #60a5fa;\n  text-decoration: underline;\n}\n.register-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n@media (max-width: 900px) {\n  .auth-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .auth-branding[_ngcontent-%COMP%] {\n    padding: 40px 30px;\n    border-right: none;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n  }\n  .auth-forms-wrapper[_ngcontent-%COMP%] {\n    padding: 40px 30px;\n  }\n}\n@media (max-width: 600px) {\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=login.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", standalone: false, template: `<div class="splitra-auth-page">\r
  <div class="auth-container">\r
    \r
    <!-- Background elements for visual wow factor -->\r
    <div class="glass-bg">\r
      <div class="blob blob-1"></div>\r
      <div class="blob blob-2"></div>\r
      <div class="blob blob-3"></div>\r
    </div>\r
\r
    <div class="auth-card" [ngClass]="{'register-mode': isRegistering}">\r
      \r
      <!-- Logo Side or Image Header -->\r
      <div class="auth-branding">\r
        <div class="logo-wrapper">\r
          <img src="assets/image/zyno_construction_logo.png" alt="Zyno Construction Logo" class="brand-logo" />\r
        </div>\r
        <h2>{{ isRegistering ? 'Start Your Journey' : 'Welcome Back' }}</h2>\r
        <p>{{ isRegistering ? 'Create your company account to revolutionize your construction management.' : 'Sign in to access your Zyno operations dashboard.' }}</p>\r
      </div>\r
\r
      <!-- Forms Side -->\r
      <div class="auth-forms-wrapper">\r
        \r
        <!-- LOGIN FORM -->\r
        <div class="auth-form-container" *ngIf="!isRegistering">\r
          <form [formGroup]="loginForm" (ngSubmit)="loginFormSubmit()" class="modern-form">\r
            \r
            <div class="form-group">\r
              <label>Email Address</label>\r
              <div class="input-wrapper">\r
                <mat-icon>mail_outline</mat-icon>\r
                <input type="email" formControlName="email" placeholder="superadmin@zyno.com" />\r
              </div>\r
              <div class="error-msg" *ngIf="(isSubmited || login['email'].touched) && login['email'].invalid">\r
                <span *ngIf="login['email'].hasError('required')">Email is required</span>\r
                <span *ngIf="login['email'].hasError('email')">Please enter a valid email</span>\r
              </div>\r
            </div>\r
\r
            <div class="form-group">\r
              <label>Password</label>\r
              <div class="input-wrapper">\r
                <mat-icon>lock_outline</mat-icon>\r
                <input type="password" formControlName="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />\r
              </div>\r
              <div class="error-msg" *ngIf="(isSubmited || login['password'].touched) && login['password'].invalid">\r
                <span *ngIf="login['password'].hasError('required')">Password is required</span>\r
                <span *ngIf="login['password'].hasError('minlength')">Minimum 6 characters required</span>\r
              </div>\r
            </div>\r
\r
            <div class="form-actions">\r
              <a href="javascript:void(0)" class="forgot-link">Forgot password?</a>\r
            </div>\r
\r
            <button type="submit" class="btn-primary" [disabled]="showLoader">\r
              <mat-spinner *ngIf="showLoader" diameter="20" class="btn-spinner"></mat-spinner>\r
              <span *ngIf="!showLoader">Sign In</span>\r
              <mat-icon *ngIf="!showLoader">arrow_forward</mat-icon>\r
            </button>\r
\r
            <div class="toggle-action">\r
              <span>Are you a new company?</span>\r
              <a href="javascript:void(0)" (click)="toggleView()">Register Now</a>\r
            </div>\r
            \r
          </form>\r
        </div>\r
\r
        <!-- REGSITER FORM -->\r
        <div class="auth-form-container" *ngIf="isRegistering">\r
          <form [formGroup]="registerForm" (ngSubmit)="registerFormSubmit()" class="modern-form register-form">\r
            \r
            <div class="form-row">\r
              <div class="form-group half">\r
                <label>First Name</label>\r
                <div class="input-wrapper">\r
                  <mat-icon>person_outline</mat-icon>\r
                  <input type="text" formControlName="firstname" placeholder="John" />\r
                </div>\r
                <div class="error-msg" *ngIf="(isSubmited || register['firstname'].touched) && register['firstname'].invalid">Required</div>\r
              </div>\r
              <div class="form-group half">\r
                <label>Last Name</label>\r
                <div class="input-wrapper">\r
                  <input type="text" formControlName="lastname" placeholder="Doe" />\r
                </div>\r
                <div class="error-msg" *ngIf="(isSubmited || register['lastname'].touched) && register['lastname'].invalid">Required</div>\r
              </div>\r
            </div>\r
\r
            <div class="form-group">\r
              <label>Company Name</label>\r
              <div class="input-wrapper">\r
                <mat-icon>business</mat-icon>\r
                <input type="text" formControlName="name" placeholder="Zyno Builders LLC" />\r
              </div>\r
              <div class="error-msg" *ngIf="(isSubmited || register['name'].touched) && register['name'].invalid">Company name is required</div>\r
            </div>\r
\r
            <div class="form-group">\r
              <label>Mobile Number</label>\r
              <div class="input-wrapper">\r
                <mat-icon>phone</mat-icon>\r
                <input type="tel" formControlName="mobile" placeholder="+1 (555) 000-0000" />\r
              </div>\r
              <div class="error-msg" *ngIf="(isSubmited || register['mobile'].touched) && register['mobile'].invalid">Mobile is required</div>\r
            </div>\r
\r
            <div class="form-group">\r
              <label>Work Email</label>\r
              <div class="input-wrapper">\r
                <mat-icon>mail_outline</mat-icon>\r
                <input type="email" formControlName="email" placeholder="admin@company.com" />\r
              </div>\r
              <div class="error-msg" *ngIf="(isSubmited || register['email'].touched) && register['email'].invalid">Enter a valid email</div>\r
            </div>\r
\r
            <div class="form-group">\r
              <label>Password</label>\r
              <div class="input-wrapper">\r
                <mat-icon>lock_outline</mat-icon>\r
                <input type="password" formControlName="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />\r
              </div>\r
              <div class="error-msg" *ngIf="(isSubmited || register['password'].touched) && register['password'].invalid">Min 6 characters</div>\r
            </div>\r
\r
            <button type="submit" class="btn-primary" [disabled]="showLoader">\r
              <mat-spinner *ngIf="showLoader" diameter="20" class="btn-spinner"></mat-spinner>\r
              <span *ngIf="!showLoader">Create Account</span>\r
              <mat-icon *ngIf="!showLoader">check_circle_outline</mat-icon>\r
            </button>\r
\r
            <div class="toggle-action">\r
              <span>Already have an account?</span>\r
              <a href="javascript:void(0)" (click)="toggleView()">Sign In</a>\r
            </div>\r
\r
          </form>\r
        </div>\r
\r
      </div>\r
    </div>\r
  </div>\r
</div>`, styles: ['@import "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";\n\n/* src/app/auth/login/login.scss */\n.splitra-auth-page {\n  font-family: "Outfit", sans-serif;\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #0f172a;\n  position: relative;\n  overflow: hidden;\n}\n.glass-bg {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  background-image: url(/assets/image/zyno_construction.jpg);\n  background-size: cover;\n  background-position: center;\n}\n.glass-bg::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.85);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n}\n.blob {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  z-index: 1;\n  opacity: 0.6;\n  animation: float 20s infinite ease-in-out alternate;\n}\n.blob-1 {\n  width: 400px;\n  height: 400px;\n  background: #3b82f6;\n  top: -10%;\n  left: 10%;\n  animation-delay: 0s;\n}\n.blob-2 {\n  width: 300px;\n  height: 300px;\n  background: #06b6d4;\n  bottom: 0%;\n  right: 15%;\n  animation-delay: -5s;\n}\n.blob-3 {\n  width: 350px;\n  height: 350px;\n  background: #8b5cf6;\n  top: 40%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  animation-delay: -10s;\n}\n@keyframes float {\n  0% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -50px) scale(1.1);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.9);\n  }\n  100% {\n    transform: translate(0, 0) scale(1);\n  }\n}\n.auth-container {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  max-width: 1000px;\n  padding: 20px;\n  display: flex;\n  justify-content: center;\n}\n.auth-card {\n  width: 100%;\n  display: flex;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  border-radius: 24px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  min-height: 550px;\n}\n.auth-branding {\n  flex: 1;\n  padding: 60px 40px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1) 0%,\n      rgba(6, 182, 212, 0.1) 100%);\n  border-right: 1px solid rgba(255, 255, 255, 0.05);\n}\n.logo-wrapper {\n  margin-bottom: 30px;\n  text-align: center;\n}\n.brand-logo {\n  max-height: 70px;\n  max-width: 100%;\n  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));\n}\n.auth-branding h2 {\n  color: #fff;\n  font-size: 36px;\n  font-weight: 700;\n  margin: 0 0 15px 0;\n  line-height: 1.2;\n}\n.auth-branding p {\n  color: #94a3b8;\n  font-size: 16px;\n  line-height: 1.6;\n  margin: 0;\n}\n.auth-forms-wrapper {\n  flex: 1.2;\n  padding: 60px 50px;\n  background: rgba(15, 23, 42, 0.4);\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.auth-form-container {\n  width: 100%;\n  animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n@keyframes fadeSlideUp {\n  0% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.modern-form {\n  display: flex;\n  flex-direction: column;\n}\n.form-row {\n  display: flex;\n  gap: 20px;\n}\n.form-group {\n  margin-bottom: 24px;\n  flex: 1;\n}\n.form-group label {\n  display: block;\n  color: #cbd5e1;\n  font-size: 14px;\n  font-weight: 500;\n  margin-bottom: 8px;\n}\n.input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-wrapper mat-icon {\n  position: absolute;\n  left: 16px;\n  color: #64748b;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  transition: color 0.3s ease;\n}\n.input-wrapper:focus-within mat-icon {\n  color: #3b82f6;\n}\n.input-wrapper input {\n  width: 100%;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  padding: 14px 16px 14px 48px;\n  border-radius: 12px;\n  color: #fff;\n  font-size: 15px;\n  font-family: inherit;\n  transition: all 0.3s ease;\n}\n.input-wrapper input:focus {\n  outline: none;\n  background: rgba(255, 255, 255, 0.08);\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);\n}\n.input-wrapper input::placeholder {\n  color: #475569;\n}\n.error-msg {\n  color: #ef4444;\n  font-size: 12px;\n  margin-top: 6px;\n  display: flex;\n  align-items: center;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 30px;\n  margin-top: -10px;\n}\n.forgot-link {\n  color: #3b82f6;\n  font-size: 14px;\n  text-decoration: none;\n  font-weight: 500;\n  transition: color 0.3s ease;\n}\n.forgot-link:hover {\n  color: #60a5fa;\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6 0%,\n      #06b6d4 100%);\n  color: white;\n  border: none;\n  padding: 16px;\n  border-radius: 12px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  transition: all 0.3s ease;\n  box-shadow: 0 10px 20px -10px rgba(59, 130, 246, 0.5);\n  font-family: inherit;\n  margin-top: 10px;\n}\n.btn-primary:not(:disabled):hover {\n  transform: translateY(-2px);\n  box-shadow: 0 15px 25px -10px rgba(59, 130, 246, 0.6);\n}\n.btn-primary:active {\n  transform: translateY(0);\n}\n.btn-primary:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.btn-spinner {\n  margin: 0;\n}\n:host ::ng-deep .mat-mdc-progress-spinner circle {\n  stroke: #fff !important;\n}\n.toggle-action {\n  margin-top: 30px;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 15px;\n}\n.toggle-action a {\n  color: #3b82f6;\n  font-weight: 600;\n  text-decoration: none;\n  margin-left: 5px;\n  transition: color 0.3s;\n}\n.toggle-action a:hover {\n  color: #60a5fa;\n  text-decoration: underline;\n}\n.register-form .form-group {\n  margin-bottom: 20px;\n}\n@media (max-width: 900px) {\n  .auth-card {\n    flex-direction: column;\n  }\n  .auth-branding {\n    padding: 40px 30px;\n    border-right: none;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n  }\n  .auth-forms-wrapper {\n    padding: 40px 30px;\n  }\n}\n@media (max-width: 600px) {\n  .form-row {\n    flex-direction: column;\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=login.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: Router }, { type: ToastrService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "app/auth/login/login.ts", lineNumber: 13 });
})();

// src/app/auth/auth-routing-module.ts
var routes = [
  {
    path: "",
    component: Auth,
    children: [
      {
        path: "login",
        component: Login
      }
    ]
  }
];
var AuthRoutingModule = class _AuthRoutingModule {
  static \u0275fac = function AuthRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/auth/auth-module.ts
var AuthModule = class _AuthModule {
  static \u0275fac = function AuthModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
    type: NgModule,
    args: [{
      declarations: [
        Auth,
        Login
      ],
      imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule
      ]
    }]
  }], null, null);
})();
export {
  AuthModule
};
//# sourceMappingURL=chunk-EQSQQCPB.js.map
