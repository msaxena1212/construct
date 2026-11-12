import {
  AuthService
} from "./chunk-2M3NZLNK.js";
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
  Location,
  NgModule,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-23RKHPSU.js";

// src/app/modules/profile/profile.ts
function ProfileComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 45);
    \u0275\u0275text(1, " Updating Profile... ");
  }
}
function ProfileComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 46);
    \u0275\u0275text(1, "sync_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Synchronize Profile ");
  }
}
var ProfileComponent = class _ProfileComponent {
  fb;
  authService;
  toast;
  location;
  profileForm;
  currentUser = null;
  loading = false;
  selectedFile = null;
  avatarPreview = null;
  serverUrl = environment.serverUrl;
  constructor(fb, authService, toast, location) {
    this.fb = fb;
    this.authService = authService;
    this.toast = toast;
    this.location = location;
    this.profileForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile: [""]
    });
    this.authService.userS.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          mobile: user.mobile
        });
      }
    });
  }
  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  updateProfile() {
    if (this.profileForm.invalid) {
      this.toast.error("Please fix the errors in the form.");
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append("data", JSON.stringify(this.profileForm.value));
    if (this.selectedFile) {
      formData.append("avatar", this.selectedFile);
    }
    this.authService.updateProfile(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.currentUser = this.authService.getAuthUser();
        this.toast.success("Profile updated successfully!");
        this.selectedFile = null;
        this.avatarPreview = null;
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to update profile");
      }
    });
  }
  static \u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ToastrService), \u0275\u0275directiveInject(Location));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], standalone: false, decls: 72, vars: 8, consts: [[1, "max-w-4xl", "mx-auto", "p-8", "animate-in"], [1, "mb-12", "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-6"], [1, "flex", "items-center", "gap-4"], [1, "w-12", "h-12", "rounded-2xl", "bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400", "flex", "items-center", "justify-center", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-all", "border-none", "cursor-pointer", "shadow-sm", 3, "click"], [1, "text-4xl", "md:text-5xl", "font-black", "tracking-tighter", "text-slate-900", "dark:text-slate-50"], [1, "text-slate-500", "dark:text-slate-400", "max-w-xl", "leading-relaxed", "text-lg", "font-light", "mt-1"], [1, "flex", "items-center", "gap-3", "bg-white/50", "dark:bg-slate-900/50", "backdrop-blur-xl", "p-2", "rounded-2xl", "border", "border-white", "dark:border-slate-800", "shadow-xl", "shadow-slate-200/50", "dark:shadow-none"], [1, "px-4", "py-2", "bg-emerald-50", "dark:bg-emerald-900/20", "text-emerald-600", "dark:text-emerald-400", "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "rounded-xl", "border", "border-emerald-100", "dark:border-emerald-800/50", "flex", "items-center", "gap-2"], [1, "w-1.5", "h-1.5", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8"], [1, "lg:col-span-4", "space-y-6"], [1, "bg-white", "dark:bg-slate-900", "rounded-[32px]", "p-8", "border", "border-slate-100", "dark:border-slate-800", "shadow-2xl", "shadow-slate-200/50", "dark:shadow-none", "relative", "overflow-hidden", "group"], [1, "absolute", "inset-0", "bg-linear-to-br", "from-blue-600/5", "to-indigo-600/5", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-700"], [1, "relative", "z-10", "flex", "flex-col", "items-center"], [1, "relative", "group/avatar", "mb-6"], [1, "w-32", "h-32", "rounded-[40px]", "bg-slate-100", "dark:bg-slate-800", "overflow-hidden", "border-4", "border-white", "dark:border-slate-800", "shadow-2xl", "transition-transform", "duration-500", "group-hover/avatar:scale-[1.02]"], ["alt", "Avatar", 1, "w-full", "h-full", "object-cover", 3, "src"], ["for", "profile-avatar-upload", 1, "absolute", "inset-0", "flex", "items-center", "justify-center", "bg-slate-900/60", "opacity-0", "group-hover/avatar:opacity-100", "transition-all", "rounded-[40px]", "cursor-pointer", "backdrop-blur-sm", "border-2", "border-white/20"], [1, "text-white", "text-3xl"], ["id", "profile-avatar-upload", "type", "file", "accept", "image/*", 1, "hidden", 3, "change"], [1, "text-2xl", "font-black", "text-slate-900", "dark:text-slate-50", "tracking-tight", "leading-none"], [1, "text-[10px]", "text-slate-400", "font-black", "uppercase", "tracking-[0.2em]", "mt-3", "bg-slate-50", "dark:bg-slate-800", "px-4", "py-1.5", "rounded-full", "border", "border-slate-100", "dark:border-slate-700"], [1, "bg-linear-to-br", "from-slate-900", "to-slate-800", "dark:from-slate-800", "dark:to-slate-950", "rounded-[32px]", "p-8", "text-white", "shadow-2xl", "relative", "overflow-hidden"], [1, "absolute", "-right-10", "-bottom-10", "w-40", "h-40", "bg-blue-600/20", "rounded-full", "blur-3xl"], [1, "relative", "z-10", "space-y-6"], [1, "w-12", "h-12", "rounded-2xl", "bg-white/10", "backdrop-blur-md", "flex", "items-center", "justify-center", "border", "border-white/10"], [1, "text-blue-400"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-white/50"], [1, "text-sm", "font-bold"], [1, "lg:col-span-8"], [1, "bg-white", "dark:bg-slate-900", "rounded-[32px]", "p-10", "border", "border-slate-100", "dark:border-slate-800", "shadow-2xl", "shadow-slate-200/50", "dark:shadow-none"], [1, "space-y-8", 3, "ngSubmit", "formGroup"], [1, "space-y-6"], [1, "flex", "items-center", "gap-4", "mb-2"], [1, "w-1.5", "h-6", "bg-blue-600", "rounded-full"], [1, "text-lg", "font-black", "text-slate-900", "dark:text-slate-50", "uppercase", "tracking-widest"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [1, "space-y-2"], [1, "text-[10px]", "font-black", "text-slate-400", "uppercase", "tracking-widest", "ml-1"], ["formControlName", "firstname", "type", "text", "placeholder", "First Name", 1, "w-full", "px-6", "py-4", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "text-sm", "font-bold", "placeholder-slate-400", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner", "dark:text-slate-100"], ["formControlName", "lastname", "type", "text", "placeholder", "Last Name", 1, "w-full", "px-6", "py-4", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "text-sm", "font-bold", "placeholder-slate-400", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner", "dark:text-slate-100"], ["formControlName", "email", "type", "email", "placeholder", "Email Address", 1, "w-full", "px-6", "py-4", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "text-sm", "font-bold", "placeholder-slate-400", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner", "dark:text-slate-100"], ["formControlName", "mobile", "type", "text", "placeholder", "Phone Number", 1, "w-full", "px-6", "py-4", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-2xl", "text-sm", "font-bold", "placeholder-slate-400", "focus:ring-4", "focus:ring-blue-100/50", "dark:focus:ring-blue-900/20", "outline-none", "transition-all", "shadow-inner", "dark:text-slate-100"], [1, "pt-8", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "justify-end"], ["type", "submit", 1, "px-10", "py-4", "bg-linear-to-br", "from-slate-900", "to-slate-800", "dark:from-white", "dark:to-slate-200", "text-white", "dark:text-slate-900", "rounded-2xl", "font-black", "text-[11px]", "uppercase", "tracking-[0.2em]", "shadow-2xl", "hover:scale-[1.05]", "active:scale-[0.98]", "transition-all", "border-none", "cursor-pointer", "flex", "items-center", "gap-3", 3, "disabled"], [1, "w-4", "h-4", "border-2", "border-slate-400", "border-t-white", "rounded-full", "animate-spin"], [1, "text-sm"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_3_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(4, "mat-icon");
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 4);
      \u0275\u0275text(8, "My Profile");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 5);
      \u0275\u0275text(10, "Manage your personal information, security, and profile identity.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 6)(12, "span", 7);
      \u0275\u0275element(13, "div", 8);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 9)(16, "div", 10)(17, "div", 11);
      \u0275\u0275element(18, "div", 12);
      \u0275\u0275elementStart(19, "div", 13)(20, "div", 14)(21, "div", 15);
      \u0275\u0275element(22, "img", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "label", 17)(24, "mat-icon", 18);
      \u0275\u0275text(25, "photo_camera");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "input", 19);
      \u0275\u0275listener("change", function ProfileComponent_Template_input_change_26_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "h3", 20);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p", 21);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 22);
      \u0275\u0275element(32, "div", 23);
      \u0275\u0275elementStart(33, "div", 24)(34, "div", 2)(35, "div", 25)(36, "mat-icon", 26);
      \u0275\u0275text(37, "verified_user");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div")(39, "p", 27);
      \u0275\u0275text(40, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "p", 28);
      \u0275\u0275text(42, "Verified Account");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(43, "div", 29)(44, "div", 30)(45, "form", 31);
      \u0275\u0275listener("ngSubmit", function ProfileComponent_Template_form_ngSubmit_45_listener() {
        return ctx.updateProfile();
      });
      \u0275\u0275elementStart(46, "div", 32)(47, "div", 33);
      \u0275\u0275element(48, "div", 34);
      \u0275\u0275elementStart(49, "h4", 35);
      \u0275\u0275text(50, "General Information");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 36)(52, "div", 37)(53, "label", 38);
      \u0275\u0275text(54, "First Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(55, "input", 39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div", 37)(57, "label", 38);
      \u0275\u0275text(58, "Last Name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(59, "input", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div", 37)(61, "label", 38);
      \u0275\u0275text(62, "Email Address");
      \u0275\u0275elementEnd();
      \u0275\u0275element(63, "input", 41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 37)(65, "label", 38);
      \u0275\u0275text(66, "Phone Number");
      \u0275\u0275elementEnd();
      \u0275\u0275element(67, "input", 42);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "div", 43)(69, "button", 44);
      \u0275\u0275conditionalCreate(70, ProfileComponent_Conditional_70_Template, 2, 0)(71, ProfileComponent_Conditional_71_Template, 3, 0);
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate1(" ", (ctx.currentUser == null ? null : ctx.currentUser.roleName) || "Member", " ");
      \u0275\u0275advance(8);
      \u0275\u0275property("src", ctx.avatarPreview || ((ctx.currentUser == null ? null : ctx.currentUser.avatar) ? ctx.serverUrl + (ctx.currentUser == null ? null : ctx.currentUser.avatar) : "https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop"), \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate2("", ctx.currentUser == null ? null : ctx.currentUser.firstname, " ", ctx.currentUser == null ? null : ctx.currentUser.lastname);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.currentUser == null ? null : ctx.currentUser.email);
      \u0275\u0275advance(15);
      \u0275\u0275property("formGroup", ctx.profileForm);
      \u0275\u0275advance(24);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 70 : 71);
    }
  }, dependencies: [\u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatIcon], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileComponent, [{
    type: Component,
    args: [{ selector: "app-profile", standalone: false, template: `<div class="max-w-4xl mx-auto p-8 animate-in">\r
    <!-- Header Section -->\r
    <div class="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">\r
        <div class="flex items-center gap-4">\r
            <button (click)="goBack()" class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border-none cursor-pointer shadow-sm">\r
                <mat-icon>arrow_back</mat-icon>\r
            </button>\r
            <div>\r
                <h1 class="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-50">My Profile</h1>\r
                <p class="text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed text-lg font-light mt-1">Manage your personal information, security, and profile identity.</p>\r
            </div>\r
        </div>\r
        <div class="flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-2 rounded-2xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">\r
            <span class="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-2">\r
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>\r
                {{ currentUser?.roleName || 'Member' }}\r
            </span>\r
        </div>\r
    </div>\r
\r
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">\r
        <!-- Sidebar: Profile Identity -->\r
        <div class="lg:col-span-4 space-y-6">\r
            <div class="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">\r
                <div class="absolute inset-0 bg-linear-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>\r
                \r
                <div class="relative z-10 flex flex-col items-center">\r
                    <div class="relative group/avatar mb-6">\r
                        <div class="w-32 h-32 rounded-[40px] bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transition-transform duration-500 group-hover/avatar:scale-[1.02]">\r
                            <img [src]="avatarPreview || (currentUser?.avatar ? serverUrl + currentUser?.avatar : 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop')" \r
                                 class="w-full h-full object-cover" alt="Avatar">\r
                        </div>\r
                        <label for="profile-avatar-upload" class="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 group-hover/avatar:opacity-100 transition-all rounded-[40px] cursor-pointer backdrop-blur-sm border-2 border-white/20">\r
                            <mat-icon class="text-white text-3xl">photo_camera</mat-icon>\r
                        </label>\r
                        <input id="profile-avatar-upload" type="file" class="hidden" (change)="onFileSelected($event)" accept="image/*">\r
                    </div>\r
\r
                    <h3 class="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-none">{{ currentUser?.firstname }} {{ currentUser?.lastname }}</h3>\r
                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-3 bg-slate-50 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-100 dark:border-slate-700">{{ currentUser?.email }}</p>\r
                </div>\r
            </div>\r
\r
            <!-- Stats/Info Card -->\r
            <div class="bg-linear-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">\r
                <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>\r
                <div class="relative z-10 space-y-6">\r
                    <div class="flex items-center gap-4">\r
                        <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">\r
                            <mat-icon class="text-blue-400">verified_user</mat-icon>\r
                        </div>\r
                        <div>\r
                            <p class="text-[10px] font-black uppercase tracking-widest text-white/50">Status</p>\r
                            <p class="text-sm font-bold">Verified Account</p>\r
                        </div>\r
                    </div>\r
                </div>\r
            </div>\r
        </div>\r
\r
        <!-- Main Content: Settings Form -->\r
        <div class="lg:col-span-8">\r
            <div class="bg-white dark:bg-slate-900 rounded-[32px] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">\r
                <form [formGroup]="profileForm" (ngSubmit)="updateProfile()" class="space-y-8">\r
                    <div class="space-y-6">\r
                        <div class="flex items-center gap-4 mb-2">\r
                            <div class="w-1.5 h-6 bg-blue-600 rounded-full"></div>\r
                            <h4 class="text-lg font-black text-slate-900 dark:text-slate-50 uppercase tracking-widest">General Information</h4>\r
                        </div>\r
\r
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>\r
                                <input formControlName="firstname" type="text"\r
                                    class="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner dark:text-slate-100"\r
                                    placeholder="First Name">\r
                            </div>\r
\r
                            <div class="space-y-2">\r
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>\r
                                <input formControlName="lastname" type="text"\r
                                    class="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner dark:text-slate-100"\r
                                    placeholder="Last Name">\r
                            </div>\r
                        </div>\r
\r
                        <div class="space-y-2">\r
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>\r
                            <input formControlName="email" type="email"\r
                                class="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner dark:text-slate-100"\r
                                placeholder="Email Address">\r
                        </div>\r
\r
                        <div class="space-y-2">\r
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>\r
                            <input formControlName="mobile" type="text"\r
                                class="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/20 outline-none transition-all shadow-inner dark:text-slate-100"\r
                                placeholder="Phone Number">\r
                        </div>\r
                    </div>\r
\r
                    <div class="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">\r
                        <button type="submit" [disabled]="loading"\r
                            class="px-10 py-4 bg-linear-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.05] active:scale-[0.98] transition-all border-none cursor-pointer flex items-center gap-3">\r
                            @if (loading) {\r
                                <div class="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>\r
                                Updating Profile...\r
                            } @else {\r
                                <mat-icon class="text-sm">sync_alt</mat-icon>\r
                                Synchronize Profile\r
                            }\r
                        </button>\r
                    </div>\r
                </form>\r
            </div>\r
        </div>\r
    </div>\r
</div>\r
` }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: ToastrService }, { type: Location }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "app/modules/profile/profile.ts", lineNumber: 14 });
})();

// src/app/modules/profile/profile-module.ts
var routes = [
  { path: "", component: ProfileComponent }
];
var ProfileModule = class _ProfileModule {
  static \u0275fac = function ProfileModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ProfileModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileModule, [{
    type: NgModule,
    args: [{
      declarations: [ProfileComponent],
      imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MaterialModule
      ]
    }]
  }], null, null);
})();
export {
  ProfileModule
};
//# sourceMappingURL=chunk-HY4XL2EV.js.map
