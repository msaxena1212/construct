import {
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule
} from "./chunk-ZGY4FKYW.js";
import {
  MatButton,
  MatButtonModule,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-Y354W3EZ.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix
} from "./chunk-NKQ2I3NH.js";
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
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-WFU7JF4C.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  HttpClient,
  NgIf,
  Router,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-F27QM527.js";

// src/app/accept-invite/accept-invite.ts
function AcceptInvite_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon", 22);
    \u0275\u0275text(2, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.invitedEmail, " ");
  }
}
function AcceptInvite_mat_error_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password must be at least 6 characters ");
    \u0275\u0275elementEnd();
  }
}
function AcceptInvite_span_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Accept Invitation");
    \u0275\u0275elementEnd();
  }
}
function AcceptInvite_span_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Syncing Profile...");
    \u0275\u0275elementEnd();
  }
}
var AcceptInvite = class _AcceptInvite {
  fb;
  route;
  router;
  http;
  toast;
  acceptForm;
  token = null;
  loading = false;
  invitedEmail = "";
  constructor(fb, route, router, http, toast) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.http = http;
    this.toast = toast;
  }
  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token");
    if (!this.token) {
      this.toast.error("Invalid or missing cryptographic invite token.");
      this.router.navigate(["/auth/login"]);
      return;
    }
    this.acceptForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      mobile: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.fetchInviteInfo();
  }
  fetchInviteInfo() {
    this.http.get(`${environment.serverUrl}/api/v1/invite-info?token=${this.token}`).subscribe({
      next: (res) => {
        if (res.data) {
          this.invitedEmail = res.data.email;
          this.acceptForm.patchValue({
            firstname: res.data.firstname,
            lastname: res.data.lastname
          });
        }
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Token may have expired or is invalid.");
        this.router.navigate(["/auth/login"]);
      }
    });
  }
  onSubmit() {
    if (this.acceptForm.invalid) {
      this.toast.warning("Please fill all required fields correctly to unlock your account.");
      return;
    }
    this.loading = true;
    const payload = __spreadProps(__spreadValues({}, this.acceptForm.value), {
      inviteToken: this.token
    });
    this.http.post(`${environment.serverUrl}/api/v1/accept-invite`, payload).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Environment keys accepted! You may now sign in natively.");
        this.router.navigate(["/auth/login"]);
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to authenticate and link environment account.");
      }
    });
  }
  static \u0275fac = function AcceptInvite_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AcceptInvite)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AcceptInvite, selectors: [["app-accept-invite"]], decls: 42, vars: 6, consts: [[1, "accept-invite-wrapper"], [1, "blur-blob"], [1, "blur-blob", "blob-2"], [1, "accept-invite-card", "mat-elevation-z12"], [1, "header-center"], [1, "brand"], [2, "font-size", "32px", "width", "32px", "height", "32px", "color", "#2563eb"], [1, "mt-3"], ["class", "email-badge mt-2", 4, "ngIf"], [1, "pt-4"], [1, "d-flex", "flex-column", "gap-2", 3, "ngSubmit", "formGroup"], [1, "row"], [1, "col-md-6"], ["appearance", "outline", 1, "w-100"], ["matInput", "", "formControlName", "firstname", "placeholder", "Enter first name", "required", ""], ["matInput", "", "formControlName", "lastname", "placeholder", "Enter last name", "required", ""], ["matInput", "", "formControlName", "mobile", "placeholder", "e.g. +1 555-1234", "required", ""], ["matSuffix", ""], ["matInput", "", "formControlName", "password", "type", "password", "placeholder", "Min 6 characters", "required", ""], [4, "ngIf"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "mt-3", "submit-btn", 3, "disabled"], [1, "email-badge", "mt-2"], [2, "font-size", "16px", "width", "16px", "height", "16px", "vertical-align", "middle", "margin-right", "4px"]], template: function AcceptInvite_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "mat-card", 3)(4, "mat-card-header", 4)(5, "div", 5)(6, "mat-icon", 6);
      \u0275\u0275text(7, "business");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card-title", 7);
      \u0275\u0275text(9, "Finalize Your Account");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "mat-card-subtitle");
      \u0275\u0275text(11, " You have been invited to join the Zyno Construction platform. Provide your final credentials below to activate your account. ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, AcceptInvite_div_12_Template, 4, 1, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "mat-card-content", 9)(14, "form", 10);
      \u0275\u0275listener("ngSubmit", function AcceptInvite_Template_form_ngSubmit_14_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(15, "div", 11)(16, "div", 12)(17, "mat-form-field", 13)(18, "mat-label");
      \u0275\u0275text(19, "First Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 12)(22, "mat-form-field", 13)(23, "mat-label");
      \u0275\u0275text(24, "Last Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "input", 15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "mat-form-field", 13)(27, "mat-label");
      \u0275\u0275text(28, "Mobile Phone");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "input", 16);
      \u0275\u0275elementStart(30, "mat-icon", 17);
      \u0275\u0275text(31, "phone");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "mat-form-field", 13)(33, "mat-label");
      \u0275\u0275text(34, "Secure Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 18);
      \u0275\u0275elementStart(36, "mat-icon", 17);
      \u0275\u0275text(37, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275template(38, AcceptInvite_mat_error_38_Template, 2, 0, "mat-error", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 20);
      \u0275\u0275template(40, AcceptInvite_span_40_Template, 2, 0, "span", 19)(41, AcceptInvite_span_41_Template, 2, 0, "span", 19);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(12);
      \u0275\u0275property("ngIf", ctx.invitedEmail);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.acceptForm);
      \u0275\u0275advance(24);
      \u0275\u0275property("ngIf", (tmp_2_0 = ctx.acceptForm.get("password")) == null ? null : tmp_2_0.hasError("minlength"));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.acceptForm.invalid || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatFormFieldModule, MatFormField, MatLabel, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconModule, MatIcon], styles: ["\n.accept-invite-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #f1f5f9;\n  overflow: hidden;\n}\n.blur-blob[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 500px;\n  height: 500px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(37, 99, 235, 0.15) 0%,\n      rgba(37, 99, 235, 0) 70%);\n  border-radius: 50%;\n  top: -100px;\n  left: -100px;\n  pointer-events: none;\n}\n.blob-2[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      circle,\n      rgba(16, 185, 129, 0.12) 0%,\n      rgba(16, 185, 129, 0) 70%);\n  bottom: -150px;\n  right: -150px;\n  top: auto;\n  left: auto;\n}\n.accept-invite-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 450px;\n  padding: 30px;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  z-index: 10;\n  border: 1px solid rgba(255, 255, 255, 0.5);\n}\n.header-center[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.header-center[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  padding: 16px;\n  border-radius: 50%;\n  margin-bottom: 8px;\n}\n.header-center[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  color: #0f172a;\n  letter-spacing: -0.02em;\n}\n.header-center[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n  margin-top: 8px;\n  line-height: 1.5;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  height: 50px;\n  font-size: 16px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  border-radius: 8px;\n  background-color: #2563eb;\n  color: white;\n  transition: all 0.2s ease-in-out;\n  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1);\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #1d4ed8;\n  transform: translateY(-1px);\n  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.15);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #94a3b8;\n  box-shadow: none;\n}\n.email-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #f1f5f9;\n  color: #334155;\n  padding: 6px 14px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 600;\n  margin-top: 10px;\n  border: 1px solid #e2e8f0;\n}\n/*# sourceMappingURL=accept-invite.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AcceptInvite, [{
    type: Component,
    args: [{ selector: "app-accept-invite", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule
    ], template: `<div class="accept-invite-wrapper">\r
  <div class="blur-blob"></div>\r
  <div class="blur-blob blob-2"></div>\r
\r
  <mat-card class="accept-invite-card mat-elevation-z12">\r
    <mat-card-header class="header-center">\r
      <div class="brand">\r
        <mat-icon style="font-size: 32px; width: 32px; height: 32px; color: #2563eb;">business</mat-icon>\r
      </div>\r
      <mat-card-title class="mt-3">Finalize Your Account</mat-card-title>\r
      <mat-card-subtitle>\r
        You have been invited to join the Zyno Construction platform. Provide your final credentials below to activate your account.\r
      </mat-card-subtitle>\r
      <div class="email-badge mt-2" *ngIf="invitedEmail">\r
         <mat-icon style="font-size: 16px; width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">email</mat-icon>\r
         {{ invitedEmail }}\r
      </div>\r
    </mat-card-header>\r
\r
    <mat-card-content class="pt-4">\r
      <form [formGroup]="acceptForm" (ngSubmit)="onSubmit()" class="d-flex flex-column gap-2">\r
        \r
        <div class="row">\r
          <div class="col-md-6">\r
            <mat-form-field appearance="outline" class="w-100">\r
              <mat-label>First Name</mat-label>\r
              <input matInput formControlName="firstname" placeholder="Enter first name" required>\r
            </mat-form-field>\r
          </div>\r
          <div class="col-md-6">\r
            <mat-form-field appearance="outline" class="w-100">\r
              <mat-label>Last Name</mat-label>\r
              <input matInput formControlName="lastname" placeholder="Enter last name" required>\r
            </mat-form-field>\r
          </div>\r
        </div>\r
\r
        <mat-form-field appearance="outline" class="w-100">\r
          <mat-label>Mobile Phone</mat-label>\r
          <input matInput formControlName="mobile" placeholder="e.g. +1 555-1234" required>\r
          <mat-icon matSuffix>phone</mat-icon>\r
        </mat-form-field>\r
\r
        <mat-form-field appearance="outline" class="w-100">\r
          <mat-label>Secure Password</mat-label>\r
          <input matInput formControlName="password" type="password" placeholder="Min 6 characters" required>\r
          <mat-icon matSuffix>lock</mat-icon>\r
          <mat-error *ngIf="acceptForm.get('password')?.hasError('minlength')">\r
            Password must be at least 6 characters\r
          </mat-error>\r
        </mat-form-field>\r
\r
        <button mat-flat-button color="primary" type="submit" [disabled]="acceptForm.invalid || loading" class="mt-3 submit-btn">\r
          <span *ngIf="!loading">Accept Invitation</span>\r
          <span *ngIf="loading">Syncing Profile...</span>\r
        </button>\r
\r
      </form>\r
    </mat-card-content>\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/app/accept-invite/accept-invite.scss */\n.accept-invite-wrapper {\n  position: relative;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #f1f5f9;\n  overflow: hidden;\n}\n.blur-blob {\n  position: absolute;\n  width: 500px;\n  height: 500px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(37, 99, 235, 0.15) 0%,\n      rgba(37, 99, 235, 0) 70%);\n  border-radius: 50%;\n  top: -100px;\n  left: -100px;\n  pointer-events: none;\n}\n.blob-2 {\n  background:\n    radial-gradient(\n      circle,\n      rgba(16, 185, 129, 0.12) 0%,\n      rgba(16, 185, 129, 0) 70%);\n  bottom: -150px;\n  right: -150px;\n  top: auto;\n  left: auto;\n}\n.accept-invite-card {\n  width: 100%;\n  max-width: 450px;\n  padding: 30px;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  z-index: 10;\n  border: 1px solid rgba(255, 255, 255, 0.5);\n}\n.header-center {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  margin-bottom: 10px;\n}\n.header-center .brand {\n  background: #eff6ff;\n  padding: 16px;\n  border-radius: 50%;\n  margin-bottom: 8px;\n}\n.header-center mat-card-title {\n  font-size: 24px;\n  font-weight: 800;\n  color: #0f172a;\n  letter-spacing: -0.02em;\n}\n.header-center mat-card-subtitle {\n  font-size: 14px;\n  color: #64748b;\n  margin-top: 8px;\n  line-height: 1.5;\n}\n.submit-btn {\n  height: 50px;\n  font-size: 16px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  border-radius: 8px;\n  background-color: #2563eb;\n  color: white;\n  transition: all 0.2s ease-in-out;\n  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1);\n}\n.submit-btn:hover:not(:disabled) {\n  background-color: #1d4ed8;\n  transform: translateY(-1px);\n  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.15);\n}\n.submit-btn:disabled {\n  background-color: #94a3b8;\n  box-shadow: none;\n}\n.email-badge {\n  display: inline-block;\n  background: #f1f5f9;\n  color: #334155;\n  padding: 6px 14px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 600;\n  margin-top: 10px;\n  border: 1px solid #e2e8f0;\n}\n/*# sourceMappingURL=accept-invite.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ActivatedRoute }, { type: Router }, { type: HttpClient }, { type: ToastrService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AcceptInvite, { className: "AcceptInvite", filePath: "app/accept-invite/accept-invite.ts", lineNumber: 30 });
})();
export {
  AcceptInvite
};
//# sourceMappingURL=chunk-G3NJMBEY.js.map
