import {
  SkillMasterServices
} from "./chunk-TS7FOP4Y.js";
import {
  VendorAuditService,
  VendorInvoiceService,
  VendorsLaborServices
} from "./chunk-N77CZUWI.js";
import {
  VendorsServices
} from "./chunk-LTJWUNDC.js";
import {
  ProjectService
} from "./chunk-52DGP4Y7.js";
import "./chunk-2M3NZLNK.js";
import {
  CommonDialogComponent
} from "./chunk-VKQYMIUT.js";
import {
  ToastrService
} from "./chunk-QR7MRZIR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  PatternValidator,
  RangeValueAccessor,
  ReactiveFormsModule,
  ɵNgSelectMultipleOption
} from "./chunk-YLIHD5YA.js";
import "./chunk-A27VMC3V.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  HostListener,
  Input,
  NgClass,
  NgIf,
  NgModule,
  Pipe,
  Router,
  RouterModule,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
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
} from "./chunk-23RKHPSU.js";

// src/app/modules/vendors/vendors.ts
var _c0 = () => [];
var _c1 = (a0, a1, a2) => ({ "bg-green-100 text-green-700": a0, "bg-red-100 text-red-700": a1, "bg-amber-100 text-amber-700": a2 });
var _c2 = (a0, a1) => [a0, a1];
var _c3 = (a0, a1, a2) => ({ "bg-primary text-white shadow-md shadow-primary/30": a0, "bg-primary/80 text-white": a1, "bg-slate-200 text-slate-600": a2 });
var _c4 = (a0, a1, a2) => ({ "bg-green-100": a0, "bg-red-100": a1, "bg-amber-100": a2 });
var _c5 = (a0, a1, a2) => ({ "text-green-600": a0, "text-red-600": a1, "text-amber-600": a2 });
var _forTrack0 = ($index, $item) => $item.num;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.value;
var _forTrack3 = ($index, $item) => $item.name;
var _forTrack4 = ($index, $item) => $item.rate;
function Vendors_Conditional_1_For_55_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 208);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const svc_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(svc_r5);
  }
}
function Vendors_Conditional_1_For_55_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 208);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", v_r4.skill.length - 3);
  }
}
function Vendors_Conditional_1_For_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 197);
    \u0275\u0275listener("click", function Vendors_Conditional_1_For_55_Template_div_click_0_listener() {
      const v_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openVendorDetail(v_r4));
    });
    \u0275\u0275elementStart(1, "div", 198)(2, "span", 199);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 200)(5, "div", 201)(6, "span", 202);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "h3", 203);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 204);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 205)(14, "div", 206)(15, "span", 61);
    \u0275\u0275text(16, "mail");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 206)(19, "span", 61);
    \u0275\u0275text(20, "call");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 207);
    \u0275\u0275repeaterCreate(23, Vendors_Conditional_1_For_55_For_24_Template, 2, 1, "span", 208, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(25, Vendors_Conditional_1_For_55_Conditional_25_Template, 2, 1, "span", 208);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 209)(27, "div")(28, "p", 210);
    \u0275\u0275text(29, " Compliance Score ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 211);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 212)(33, "span", 213);
    \u0275\u0275text(34, "arrow_forward");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const v_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", v_r4.statusColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r4.status);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(v_r4.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", v_r4.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r4.type);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", v_r4.email, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", v_r4.phone, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(v_r4.skill.slice(0, 3));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(v_r4.skill.length > 3 ? 25 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("text-green-600", v_r4.compliance_score >= 90)("text-amber-600", v_r4.compliance_score < 90 && v_r4.compliance_score >= 70)("text-error", v_r4.compliance_score < 70);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r4.compliance_score, "% ");
  }
}
function Vendors_Conditional_1_ForEmpty_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 196)(1, "span", 214);
    \u0275\u0275text(2, "storefront");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 215);
    \u0275\u0275text(4, "No vendors found. Add your first vendor to get started.");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 177)(1, "div", 127)(2, "h2", 178);
    \u0275\u0275text(3, " Vendors & Partners ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 179);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 180);
    \u0275\u0275listener("click", function Vendors_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAddModal());
    });
    \u0275\u0275element(7, "div", 181);
    \u0275\u0275elementStart(8, "div", 182)(9, "span", 103);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd()();
    \u0275\u0275text(11, " Add New Vendor ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 183)(13, "div", 184);
    \u0275\u0275element(14, "div", 185);
    \u0275\u0275elementStart(15, "div", 186)(16, "div")(17, "p", 187);
    \u0275\u0275text(18, " Total Active ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "h3", 188);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 189);
    \u0275\u0275text(22, "Active Vendors");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 190)(24, "span", 191);
    \u0275\u0275text(25, " groups ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div", 192);
    \u0275\u0275element(27, "div", 185);
    \u0275\u0275elementStart(28, "div", 186)(29, "div")(30, "p", 187);
    \u0275\u0275text(31, " Pending Payments ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "h3", 188);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 189);
    \u0275\u0275text(36, "Awaiting Clearance");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 190)(38, "span", 191);
    \u0275\u0275text(39, " payments ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "div", 193);
    \u0275\u0275element(41, "div", 185);
    \u0275\u0275elementStart(42, "div", 186)(43, "div")(44, "p", 187);
    \u0275\u0275text(45, " Compliant Partners ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "h3", 188);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "p", 189);
    \u0275\u0275text(49, "Verified & Approved");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 190)(51, "span", 191);
    \u0275\u0275text(52, " verified ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(53, "div", 194);
    \u0275\u0275repeaterCreate(54, Vendors_Conditional_1_For_55_Template, 35, 15, "div", 195, _forTrack1, false, Vendors_Conditional_1_ForEmpty_56_Template, 5, 0, "div", 196);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Coordinate with ", ctx_r1.stats.totalActive, " active contractors and material suppliers. ");
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate1(" ", ctx_r1.stats.totalActive, " ");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(34, 5, ctx_r1.stats.pendingPayments, "1.0-2"), " ");
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1(" ", ctx_r1.stats.compliantPartners, " ");
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.filteredVendors);
  }
}
function Vendors_Conditional_2_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 224);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.laborStats.totalPersonnel);
  }
}
function Vendors_Conditional_2_Conditional_34_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 251);
    \u0275\u0275text(1, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" exceeds the allocated Budget ", ctx_r1.selectedVendor.budget, " by \u20B9", \u0275\u0275pipeBind2(3, 2, ctx_r1.budgetUsage.exceededBy, "1.0-0"), " ");
  }
}
function Vendors_Conditional_2_Conditional_34_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.budgetUsage.percent, "% utilized ");
  }
}
function Vendors_Conditional_2_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 250);
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_2_Conditional_34_Conditional_1_Template, 4, 5)(2, Vendors_Conditional_2_Conditional_34_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("text-red-600", ctx_r1.budgetUsage.exceeded)("text-outline", !ctx_r1.budgetUsage.exceeded);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.budgetUsage.exceeded ? 1 : 2);
  }
}
function Vendors_Conditional_2_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 241)(1, "div", 252)(2, "span", 253);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 254)(5, "div", 255)(6, "span", 9);
    \u0275\u0275text(7, " Project : ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 256);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 257);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 258);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "span", 259);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.icon, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.projectdata == null ? null : ctx_r1.projectdata.name) || "Project not linked", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", task_r7.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(14, 6, task_r7.due_date, "dd/MMM/yyyy"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getTaskStatusColor(task_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r7.status, " ");
  }
}
function Vendors_Conditional_2_ForEmpty_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 242);
    \u0275\u0275text(1, " No active tasks detected. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_2_For_83_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 265)(1, "button", 268);
    \u0275\u0275listener("click", function Vendors_Conditional_2_For_83_Conditional_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const inv_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.payInvoice(inv_r9));
    });
    \u0275\u0275elementStart(2, "span", 115);
    \u0275\u0275text(3, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 267);
    \u0275\u0275text(5, " Payment ");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_2_For_83_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 265)(1, "button", 269);
    \u0275\u0275listener("click", function Vendors_Conditional_2_For_83_Conditional_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const inv_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCancelInvoiceDialog(inv_r9));
    });
    \u0275\u0275elementStart(2, "span", 115);
    \u0275\u0275text(3, "cancel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 267);
    \u0275\u0275text(5, " Cancel ");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_2_For_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 249)(1, "td", 260);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 261);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 262);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 248)(8, "span", 263);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 248)(11, "div", 264)(12, "div", 265)(13, "button", 266);
    \u0275\u0275listener("click", function Vendors_Conditional_2_For_83_Template_button_click_13_listener() {
      const inv_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewInvoice(inv_r9));
    });
    \u0275\u0275elementStart(14, "span", 115);
    \u0275\u0275text(15, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 267);
    \u0275\u0275text(17, " View ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, Vendors_Conditional_2_For_83_Conditional_18_Template, 6, 0, "div", 265);
    \u0275\u0275conditionalCreate(19, Vendors_Conditional_2_For_83_Conditional_19_Template, 6, 0, "div", 265);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const inv_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r9.invoice_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", (+inv_r9.grand_total).toLocaleString("en-IN"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(inv_r9.invoice_date));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(7, _c1, inv_r9.status === "Paid", inv_r9.status === "Cancelled", inv_r9.status !== "Paid" && inv_r9.status !== "Cancelled"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r9.status, " ");
    \u0275\u0275advance(9);
    \u0275\u0275conditional(inv_r9.status !== "Cancelled" && inv_r9.status !== "Paid" ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(inv_r9.status !== "Cancelled" && inv_r9.status !== "Paid" && inv_r9.status !== "Partially Paid" ? 19 : -1);
  }
}
function Vendors_Conditional_2_ForEmpty_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 270);
    \u0275\u0275text(2, " No invoice records found. ");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 216)(2, "button", 217);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275elementStart(3, "span", 213);
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "h2", 218);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 219);
    \u0275\u0275text(9, "Partner Overview & Execution Hub");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 220)(11, "button", 221);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openVendorDetailData());
    });
    \u0275\u0275elementStart(12, "span", 61);
    \u0275\u0275text(13, "business_center");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Vendor Details ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 221);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAudit());
    });
    \u0275\u0275elementStart(16, "span", 61);
    \u0275\u0275text(17, "fact_check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Audits ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 222);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBilling());
    });
    \u0275\u0275elementStart(20, "span", 61);
    \u0275\u0275text(21, "receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " Billing ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 223);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openLaborModal());
    });
    \u0275\u0275elementStart(24, "span", 61);
    \u0275\u0275text(25, "engineering");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " Labor ");
    \u0275\u0275conditionalCreate(27, Vendors_Conditional_2_Conditional_27_Template, 2, 1, "span", 224);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 225)(29, "div", 226)(30, "span", 227);
    \u0275\u0275text(31, "Budget Allocated");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 152);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(34, Vendors_Conditional_2_Conditional_34_Template, 3, 5, "p", 228);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 229)(36, "span", 227);
    \u0275\u0275text(37, "Active Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "p", 152);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 230)(41, "span", 227);
    \u0275\u0275text(42, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 231);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 230)(46, "div", 232)(47, "span", 227);
    \u0275\u0275text(48, "Compliance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 233);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 234);
    \u0275\u0275element(52, "div", 235);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 236)(54, "div", 237)(55, "div", 238)(56, "h3", 239);
    \u0275\u0275text(57, "Service Tasks & Performance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 240);
    \u0275\u0275repeaterCreate(59, Vendors_Conditional_2_For_60_Template, 17, 9, "div", 241, _forTrack1, false, Vendors_Conditional_2_ForEmpty_61_Template, 2, 0, "p", 242);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 238)(63, "div", 243)(64, "h3", 244);
    \u0275\u0275text(65, "Vendor Invoicing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 245);
    \u0275\u0275listener("click", function Vendors_Conditional_2_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSubmission());
    });
    \u0275\u0275text(67, " + New Submission ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "table", 246)(69, "thead")(70, "tr", 247)(71, "th", 248);
    \u0275\u0275text(72, "Invoice #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "th", 248);
    \u0275\u0275text(74, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "th", 248);
    \u0275\u0275text(76, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "th", 248);
    \u0275\u0275text(78, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "th", 248);
    \u0275\u0275text(80, "Action");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(81, "tbody");
    \u0275\u0275repeaterCreate(82, Vendors_Conditional_2_For_83_Template, 20, 11, "tr", 249, _forTrack1, false, Vendors_Conditional_2_ForEmpty_84_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.name, " ");
    \u0275\u0275advance(20);
    \u0275\u0275conditional(ctx_r1.laborStats.totalPersonnel > 0 ? 27 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("border-red-500", ctx_r1.budgetUsage.exceeded);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.budget);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.budgetUsage.allocated > 0 ? 34 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.allTasks.length, " Tasks");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.selectedVendor.statusColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.status);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("text-green-600", ctx_r1.selectedVendor.compliance_score >= 90)("text-amber-600", ctx_r1.selectedVendor.compliance_score < 90);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.compliance_score, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.selectedVendor.compliance_score, "%");
    \u0275\u0275classProp("bg-green-600", ctx_r1.selectedVendor.compliance_score >= 90)("bg-amber-500", ctx_r1.selectedVendor.compliance_score < 90);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.allTasks || \u0275\u0275pureFunction0(22, _c0));
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r1.invoices);
  }
}
function Vendors_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 271);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 272);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Already Paid: \u20B9", (+(ctx_r1.selectedInvoice.paid_amount || 0)).toLocaleString("en-IN"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Remaining: \u20B9", ctx_r1.remainingAmount.toLocaleString("en-IN"), " ");
  }
}
function Vendors_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, " Settlement Mapping ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_43_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalProjectData.work_poc_completion, "% complete ");
  }
}
function Vendors_Conditional_43_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalProjectData.milestone_completion, "% complete ");
  }
}
function Vendors_Conditional_43_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalProjectData.lumpsum_completion, "% complete ");
  }
}
function Vendors_Conditional_43_Conditional_29_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 288)(1, "span", 292);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Loading... ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_43_Conditional_29_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 289);
    \u0275\u0275text(1, "No milestones found.");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_43_Conditional_29_Conditional_3_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 297);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", (m_r15.milestone_progress ?? m_r15.progress) >= 100 ? "text-green-600" : "text-amber-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r15.milestone_progress ?? m_r15.progress, "% ");
  }
}
function Vendors_Conditional_43_Conditional_29_Conditional_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 294)(1, "input", 295);
    \u0275\u0275listener("change", function Vendors_Conditional_43_Conditional_29_Conditional_3_For_1_Template_input_change_1_listener() {
      const m_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleMilestoneSelection(+m_r15.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 296);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Vendors_Conditional_43_Conditional_29_Conditional_3_For_1_Conditional_4_Template, 2, 2, "span", 297);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("bg-blue-50", ctx_r1.selectedMilestoneIds.includes(+m_r15.id));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.selectedMilestoneIds.includes(+m_r15.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r15.name ?? m_r15.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(m_r15.milestone_progress != null || m_r15.progress != null ? 4 : -1);
  }
}
function Vendors_Conditional_43_Conditional_29_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Vendors_Conditional_43_Conditional_29_Conditional_3_For_1_Template, 5, 5, "label", 293, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r1.milestones);
  }
}
function Vendors_Conditional_43_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 287);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Conditional_29_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_43_Conditional_29_Conditional_1_Template, 4, 0, "div", 288)(2, Vendors_Conditional_43_Conditional_29_Conditional_2_Template, 2, 0, "p", 289)(3, Vendors_Conditional_43_Conditional_29_Conditional_3_Template, 2, 0);
    \u0275\u0275elementStart(4, "div", 290)(5, "button", 291);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Conditional_29_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.applyMilestoneSelection();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(6, " OK ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isLoadingMilestones ? 1 : ctx_r1.milestones.length === 0 ? 2 : 3);
  }
}
function Vendors_Conditional_43_Conditional_41_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 298);
    \u0275\u0275text(1, " No sub-milestones found for selected milestones. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_43_Conditional_41_Conditional_2_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 297);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sm_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", (sm_r18.milestone_progress ?? sm_r18.progress) >= 100 ? "text-green-600" : "text-amber-500");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sm_r18.milestone_progress ?? sm_r18.progress, "% ");
  }
}
function Vendors_Conditional_43_Conditional_41_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 294)(1, "input", 295);
    \u0275\u0275listener("change", function Vendors_Conditional_43_Conditional_41_Conditional_2_For_1_Template_input_change_1_listener() {
      const sm_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleSubMilestoneSelection(+sm_r18.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 296);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Vendors_Conditional_43_Conditional_41_Conditional_2_For_1_Conditional_4_Template, 2, 2, "span", 297);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sm_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("bg-blue-50", ctx_r1.selectedSubMilestoneIds.includes(+sm_r18.id));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.selectedSubMilestoneIds.includes(+sm_r18.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sm_r18.name ?? sm_r18.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(sm_r18.milestone_progress != null || sm_r18.progress != null ? 4 : -1);
  }
}
function Vendors_Conditional_43_Conditional_41_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Vendors_Conditional_43_Conditional_41_Conditional_2_For_1_Template, 5, 5, "label", 293, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r1.availableSubMilestones);
  }
}
function Vendors_Conditional_43_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 287);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Conditional_41_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_43_Conditional_41_Conditional_1_Template, 2, 0, "div", 298)(2, Vendors_Conditional_43_Conditional_41_Conditional_2_Template, 2, 0);
    \u0275\u0275elementStart(3, "div", 290)(4, "button", 291);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Conditional_41_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.applySubMilestoneSelection();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(5, " OK ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.availableSubMilestones.length === 0 ? 1 : 2);
  }
}
function Vendors_Conditional_43_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 285)(1, "span", 251);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Selected milestones has no sub-milestones. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_43_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 283);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedSubMilestoneIds.length, " selected ");
  }
}
function Vendors_Conditional_43_Conditional_53_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 298);
    \u0275\u0275text(1, " No tasks found for selected sub-milestones. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_43_Conditional_53_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 294)(1, "input", 295);
    \u0275\u0275listener("change", function Vendors_Conditional_43_Conditional_53_Conditional_2_For_1_Template_input_change_1_listener() {
      const task_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleTaskSelection(+task_r21.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 296);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 299);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("bg-blue-50", ctx_r1.selectedTaskIds.includes(+task_r21.id));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.selectedTaskIds.includes(+task_r21.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r21.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getTaskStatusColor(task_r21.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r21.status, " ");
  }
}
function Vendors_Conditional_43_Conditional_53_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Vendors_Conditional_43_Conditional_53_Conditional_2_For_1_Template, 6, 6, "label", 293, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r1.availableTaskOptions);
  }
}
function Vendors_Conditional_43_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 287);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Conditional_53_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_43_Conditional_53_Conditional_1_Template, 2, 0, "div", 298)(2, Vendors_Conditional_43_Conditional_53_Conditional_2_Template, 2, 0);
    \u0275\u0275elementStart(3, "div", 290)(4, "button", 291);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Conditional_53_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.applyTaskSelection();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(5, " OK ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.availableTaskOptions.length === 0 ? 1 : 2);
  }
}
function Vendors_Conditional_43_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 285)(1, "span", 251);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Selected sub-milestones has no tasks. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_43_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 283);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.selectedTaskIds.length, " selected");
  }
}
function Vendors_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 273)(1, "div", 274);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSettlementTypeChange("work_poc"));
    });
    \u0275\u0275elementStart(2, "span", 275);
    \u0275\u0275text(3, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 276);
    \u0275\u0275text(5, "Work POC");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, Vendors_Conditional_43_Conditional_6_Template, 2, 1, "p", 277);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 274);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Template_div_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSettlementTypeChange("milestone"));
    });
    \u0275\u0275elementStart(8, "span", 275);
    \u0275\u0275text(9, "flag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 276);
    \u0275\u0275text(11, "Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, Vendors_Conditional_43_Conditional_12_Template, 2, 1, "p", 277);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 274);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Template_div_click_13_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSettlementTypeChange("lumpsum"));
    });
    \u0275\u0275elementStart(14, "span", 275);
    \u0275\u0275text(15, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 276);
    \u0275\u0275text(17, "Lump Sum");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, Vendors_Conditional_43_Conditional_18_Template, 2, 1, "p", 277);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 278)(20, "div", 35)(21, "label", 33);
    \u0275\u0275text(22, "Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 35)(24, "button", 279);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Template_button_click_24_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.milestoneDropdownOpen = !ctx_r1.milestoneDropdownOpen;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(25, "span", 280);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 281);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, Vendors_Conditional_43_Conditional_29_Template, 7, 1, "div", 282);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 283);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 35)(33, "label", 33);
    \u0275\u0275text(34, "Sub-Milestone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 35)(36, "button", 284);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Template_button_click_36_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.subMilestoneDropdownOpen = !ctx_r1.subMilestoneDropdownOpen;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(37, "span", 280);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 281);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(41, Vendors_Conditional_43_Conditional_41_Template, 6, 1, "div", 282);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(42, Vendors_Conditional_43_Conditional_42_Template, 4, 0, "p", 285)(43, Vendors_Conditional_43_Conditional_43_Template, 2, 1, "p", 283);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 35)(45, "label", 33);
    \u0275\u0275text(46, "Task");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 35)(48, "button", 284);
    \u0275\u0275listener("click", function Vendors_Conditional_43_Template_button_click_48_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.taskDropdownOpen = !ctx_r1.taskDropdownOpen;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(49, "span", 280);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 281);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(53, Vendors_Conditional_43_Conditional_53_Template, 6, 1, "div", 282);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(54, Vendors_Conditional_43_Conditional_54_Template, 4, 0, "p", 285)(55, Vendors_Conditional_43_Conditional_55_Template, 2, 1, "p", 283);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div")(57, "label", 33);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "input", 286);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_43_Template_input_ngModelChange_59_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.settlementCompletion, $event) || (ctx_r1.settlementCompletion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "p", 283);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.selectedSettlementType === "work_poc" ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" : "bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50/70 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-blue-500/10");
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.modalProjectData == null ? null : ctx_r1.modalProjectData.work_poc_completion) != null ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.selectedSettlementType === "milestone" ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" : "bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50/70 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-blue-500/10");
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.modalProjectData == null ? null : ctx_r1.modalProjectData.milestone_completion) != null ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.selectedSettlementType === "lumpsum" ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" : "bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50/70 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-blue-500/10");
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.modalProjectData == null ? null : ctx_r1.modalProjectData.lumpsum_completion) != null ? 18 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedMilestoneIds.length === 0 ? "Select milestones" : ctx_r1.selectedMilestoneIds.length + " milestone(s) selected", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.milestoneDropdownOpen ? "expand_less" : "expand_more");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.milestoneDropdownOpen ? 29 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedMilestoneIds.length, " selected ");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.availableSubMilestones.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedSubMilestoneIds.length === 0 ? ctx_r1.availableSubMilestones.length === 0 ? "Select milestone first" : "Select sub-milestones" : ctx_r1.selectedSubMilestoneIds.length + " sub-milestone(s) selected", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.subMilestoneDropdownOpen ? "expand_less" : "expand_more");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.subMilestoneDropdownOpen && ctx_r1.selectedMilestoneIds.length > 0 ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedMilestoneIds.length > 0 && ctx_r1.availableSubMilestones.length === 0 ? 42 : 43);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.availableTaskOptions.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedTaskIds.length === 0 ? ctx_r1.availableTaskOptions.length === 0 ? "Select sub-milestone first" : "Select tasks" : ctx_r1.selectedTaskIds.length + " task(s) selected", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.taskDropdownOpen ? "expand_less" : "expand_more");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.taskDropdownOpen && ctx_r1.selectedSubMilestoneIds.length > 0 ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedSubMilestoneIds.length > 0 && ctx_r1.availableTaskOptions.length === 0 ? 54 : 55);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.settlementCompletionLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settlementCompletion);
    \u0275\u0275property("readonly", !ctx_r1.isSettlementCompletionEditable)("ngClass", ctx_r1.isSettlementCompletionEditable ? "bg-white" : "bg-slate-100 text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSettlementCompletionEditable ? "Auto-filled from selection, editable." : "Auto-filled from selection, read-only.", " ");
  }
}
function Vendors_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1, " Payment amount cannot exceed the remaining invoice balance. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lumpsum Payment: \u20B9", \u0275\u0275pipeBind2(3, 1, ctx_r1.paymentForm.amount, "1.0-0"));
  }
}
function Vendors_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Remaining after this: \u20B9", ctx_r1.Math.max(0, ctx_r1.remainingAmount - ctx_r1.paymentForm.amount).toLocaleString("en-IN"), " ");
  }
}
function Vendors_div_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 300)(1, "div", 301);
    \u0275\u0275listener("click", function Vendors_div_78_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.onPaymentModeChange("Bank Transfer");
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(2, " Bank Transfer ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 301);
    \u0275\u0275listener("click", function Vendors_div_78_Template_div_click_3_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.onPaymentModeChange("UPI");
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(4, " UPI ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 301);
    \u0275\u0275listener("click", function Vendors_div_78_Template_div_click_5_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.onPaymentModeChange("Cheque");
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(6, " Cheque ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 301);
    \u0275\u0275listener("click", function Vendors_div_78_Template_div_click_7_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.onPaymentModeChange("Cash");
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(8, " Cash ");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 33);
    \u0275\u0275text(2, " Cheque Clearance Date ");
    \u0275\u0275elementStart(3, "span", 34);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 302);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_80_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.paymentForm.clearance_date, $event) || (ctx_r1.paymentForm.clearance_date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("click", function Vendors_Conditional_80_Template_input_click_5_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.paymentForm.clearance_date);
    \u0275\u0275property("min", ctx_r1.threeMonthsAgoDate)("max", ctx_r1.todayDate);
  }
}
function Vendors_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 33);
    \u0275\u0275text(2, " Reference / Transaction No. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 303);
    \u0275\u0275listener("input", function Vendors_Conditional_81_Template_input_input_3_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.paymentForm.reference = $event.target.value);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("col-span-1", ctx_r1.paymentForm.mode === "Cheque")("sm:col-start-2", ctx_r1.paymentForm.mode !== "Cheque");
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.paymentForm.reference);
  }
}
function Vendors_Conditional_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "span", 304);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 305);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.paymentError);
  }
}
function Vendors_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "span", 306);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 254)(4, "p", 307);
    \u0275\u0275text(5, "Budget Exceeded Warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 308);
    \u0275\u0275text(7, " The entered ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9, "Amount to Pay");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13, "Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 309);
    \u0275\u0275text(18, " Raise a Request to continue and allocate Budget, click ");
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20, '"Raise Request"');
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 310);
    \u0275\u0275listener("click", function Vendors_Conditional_83_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelBudgetExceedConfirm());
    });
    \u0275\u0275text(23, " \u2190 Edit Amount ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1(" (\u20B9", \u0275\u0275pipeBind2(11, 3, ctx_r1.budgetExceedDetails.thisAmount, "1.0-0"), ") exceeds the allocated ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" (\u20B9", \u0275\u0275pipeBind2(15, 6, ctx_r1.budgetExceedDetails.allocated, "1.0-0"), ") by \u20B9", \u0275\u0275pipeBind2(16, 9, ctx_r1.budgetExceedDetails.exceededBy, "1.0-0"), ". ");
  }
}
function Vendors_Conditional_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.activePersonnel, " ");
  }
}
function Vendors_Conditional_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_117_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.onSite, " ");
  }
}
function Vendors_Conditional_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.remaining, " ");
  }
}
function Vendors_Conditional_128_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_129_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.laborStats.totalPersonnel, " ");
  }
}
function Vendors_Conditional_144_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 311)(1, "span", 324);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 325);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.laborError);
  }
}
function Vendors_Conditional_144_Conditional_11_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 329);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_144_Conditional_11_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 330);
  }
}
function Vendors_Conditional_144_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 328);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Conditional_11_For_2_Template_div_click_0_listener() {
      const s_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.newLabor.skill = s_r28.value;
      return \u0275\u0275resetView(ctx_r1.showSkillDropdown = false);
    });
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_144_Conditional_11_For_2_Conditional_1_Template, 2, 0, "span", 329)(2, Vendors_Conditional_144_Conditional_11_For_2_Conditional_2_Template, 1, 0, "span", 330);
    \u0275\u0275elementStart(3, "p", 331);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r28 = ctx.$implicit;
    const \u0275$index_969_r29 = ctx.$index;
    const \u0275$count_969_r30 = ctx.$count;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-b", !(\u0275$index_969_r29 === \u0275$count_969_r30 - 1))("border-slate-100", !(\u0275$index_969_r29 === \u0275$count_969_r30 - 1))("dark:border-slate-700", !(\u0275$index_969_r29 === \u0275$count_969_r30 - 1));
    \u0275\u0275property("ngClass", ctx_r1.newLabor.skill === s_r28.value ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.newLabor.skill === s_r28.value ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r28.label);
  }
}
function Vendors_Conditional_144_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 326);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Conditional_11_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_144_Conditional_11_For_2_Template, 5, 9, "div", 327, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.skillOptions);
  }
}
function Vendors_Conditional_144_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 332);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Conditional_24_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 333);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Conditional_24_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.newLabor.status = "active";
      return \u0275\u0275resetView(ctx_r1.showStatusDropdown = false);
    });
    \u0275\u0275element(2, "span", 334);
    \u0275\u0275elementStart(3, "p", 335);
    \u0275\u0275text(4, "Active");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 336);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Conditional_24_Template_div_click_5_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.newLabor.status = "inactive";
      return \u0275\u0275resetView(ctx_r1.showStatusDropdown = false);
    });
    \u0275\u0275element(6, "span", 337);
    \u0275\u0275elementStart(7, "p", 335);
    \u0275\u0275text(8, "Inactive");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.newLabor.status === "active" ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.newLabor.status === "inactive" ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60");
  }
}
function Vendors_Conditional_144_Conditional_37_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 341);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_144_Conditional_37_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 328);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Conditional_37_For_2_Template_div_click_0_listener() {
      const m_r33 = \u0275\u0275restoreView(_r32).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.newLabor.assign_worker = m_r33.name;
      return \u0275\u0275resetView(ctx_r1.showAssignDropdown = false);
    });
    \u0275\u0275elementStart(1, "div", 339)(2, "span", 340);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 331);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, Vendors_Conditional_144_Conditional_37_For_2_Conditional_6_Template, 2, 0, "span", 341);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r33 = ctx.$implicit;
    const \u0275$index_1042_r34 = ctx.$index;
    const \u0275$count_1042_r35 = ctx.$count;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c2, ctx_r1.newLabor.assign_worker === m_r33.name ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200", !(\u0275$index_1042_r34 === \u0275$count_1042_r35 - 1) ? "border-b border-slate-100 dark:border-slate-700" : ""));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r33.name.charAt(0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r33.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.newLabor.assign_worker === m_r33.name ? 6 : -1);
  }
}
function Vendors_Conditional_144_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 326);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Conditional_37_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_144_Conditional_37_For_2_Template, 7, 7, "div", 338, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.assignableTeam);
  }
}
function Vendors_Conditional_144_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 292);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving\u2026 ");
  }
}
function Vendors_Conditional_144_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Confirm & Add Labor ");
  }
}
function Vendors_Conditional_144_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_144_Conditional_1_Template, 5, 1, "div", 311);
    \u0275\u0275elementStart(2, "div", 312)(3, "div", 313)(4, "label", 314);
    \u0275\u0275text(5, "Skill *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 315);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Template_button_click_6_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.showSkillDropdown = !ctx_r1.showSkillDropdown;
      ctx_r1.showStatusDropdown = false;
      ctx_r1.showAssignDropdown = false;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(7, "span", 316);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 317);
    \u0275\u0275text(10, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, Vendors_Conditional_144_Conditional_11_Template, 3, 0, "div", 318);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 57)(13, "label", 314);
    \u0275\u0275text(14, "Daily Rate (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 319);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_144_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newLabor.daily_rate, $event) || (ctx_r1.newLabor.daily_rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 313)(17, "label", 314);
    \u0275\u0275text(18, "Initial Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 315);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Template_button_click_19_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.showStatusDropdown = !ctx_r1.showStatusDropdown;
      ctx_r1.showSkillDropdown = false;
      ctx_r1.showAssignDropdown = false;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(20, "span", 320);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 317);
    \u0275\u0275text(23, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(24, Vendors_Conditional_144_Conditional_24_Template, 9, 2, "div", 321);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 57)(26, "label", 314);
    \u0275\u0275text(27, "Count (no. of labors) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 322);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_144_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newLabor.labor_count, $event) || (ctx_r1.newLabor.labor_count = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 313)(30, "label", 314);
    \u0275\u0275text(31, "Assign To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 315);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Template_button_click_32_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.showAssignDropdown = !ctx_r1.showAssignDropdown;
      ctx_r1.showSkillDropdown = false;
      ctx_r1.showStatusDropdown = false;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(33, "span", 316);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 317);
    \u0275\u0275text(36, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(37, Vendors_Conditional_144_Conditional_37_Template, 3, 0, "div", 318);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 323);
    \u0275\u0275listener("click", function Vendors_Conditional_144_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitLabor());
    });
    \u0275\u0275conditionalCreate(39, Vendors_Conditional_144_Conditional_39_Template, 3, 0)(40, Vendors_Conditional_144_Conditional_40_Template, 3, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.laborError ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r1.showSkillDropdown ? "border-2 border-primary ring-2 ring-primary/15" : "border border-slate-300 dark:border-slate-600 hover:border-primary/60");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-slate-400", !ctx_r1.newLabor.skill);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSkillLabel(ctx_r1.newLabor.skill) || "Select skill", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showSkillDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showSkillDropdown ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newLabor.daily_rate);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.showStatusDropdown ? "border-2 border-primary ring-2 ring-primary/15" : "border border-slate-300 dark:border-slate-600 hover:border-primary/60");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.newLabor.status);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showStatusDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showStatusDropdown ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newLabor.labor_count);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.showAssignDropdown ? "border-2 border-primary ring-2 ring-primary/15" : "border border-slate-300 dark:border-slate-600 hover:border-primary/60");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-slate-400", ctx_r1.newLabor.assign_worker === null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.newLabor.assign_worker ?? "Unassigned", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showAssignDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showAssignDropdown ? 37 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSavingLabor);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSavingLabor ? 39 : 40);
  }
}
function Vendors_Conditional_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81)(1, "span", 342);
    \u0275\u0275text(2, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 343);
    \u0275\u0275text(4, "Loading workforce data\u2026");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_146_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "span", 214);
    \u0275\u0275text(2, "person_search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 215);
    \u0275\u0275text(4, "No labors assigned yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 344);
    \u0275\u0275text(6, 'Click "Add Labor" above to onboard the first team member.');
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 378);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 379);
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 377);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_For_2_Template_div_click_0_listener() {
      const s_r38 = \u0275\u0275restoreView(_r37).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      ctx_r1.editLaborForm.skill = s_r38.value;
      return \u0275\u0275resetView(ctx_r1.showSkillDropdown = false);
    });
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_For_2_Conditional_1_Template, 2, 0, "span", 378)(2, Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_For_2_Conditional_2_Template, 1, 0, "span", 379);
    \u0275\u0275elementStart(3, "p", 380);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r38 = ctx.$implicit;
    const \u0275$index_1151_r39 = ctx.$index;
    const \u0275$count_1151_r40 = ctx.$count;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(3, _c2, ctx_r1.editLaborForm.skill === s_r38.value ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200", !(\u0275$index_1151_r39 === \u0275$count_1151_r40 - 1) ? "border-b border-slate-100 dark:border-slate-700" : ""));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.editLaborForm.skill === s_r38.value ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r38.label);
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 375);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_For_2_Template, 5, 6, "div", 376, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.skillOptions);
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 332);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Conditional_34_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 381);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Conditional_34_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext(4);
      ctx_r1.editLaborForm.status = "active";
      return \u0275\u0275resetView(ctx_r1.showStatusDropdown = false);
    });
    \u0275\u0275element(2, "span", 334);
    \u0275\u0275elementStart(3, "p", 335);
    \u0275\u0275text(4, "Active");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 377);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Conditional_34_Template_div_click_5_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext(4);
      ctx_r1.editLaborForm.status = "inactive";
      return \u0275\u0275resetView(ctx_r1.showStatusDropdown = false);
    });
    \u0275\u0275element(6, "span", 337);
    \u0275\u0275elementStart(7, "p", 335);
    \u0275\u0275text(8, "Inactive");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.editLaborForm.status === "active" ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.editLaborForm.status === "inactive" ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60");
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 368)(1, "span", 382);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.editLaborForm.assign_worker.charAt(0));
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 369);
    \u0275\u0275text(1, "person_off");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 384);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 377);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_For_2_Template_div_click_0_listener() {
      const m_r43 = \u0275\u0275restoreView(_r42).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      ctx_r1.editLaborForm.assign_worker = m_r43.name;
      return \u0275\u0275resetView(ctx_r1.showAssignDropdown = false);
    });
    \u0275\u0275elementStart(1, "div", 339)(2, "span", 340);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 380);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_For_2_Conditional_6_Template, 2, 0, "span", 384);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r43 = ctx.$implicit;
    const \u0275$index_1242_r44 = ctx.$index;
    const \u0275$count_1242_r45 = ctx.$count;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c2, ctx_r1.editLaborForm.assign_worker === m_r43.name ? "bg-primary/8 text-primary" : "hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200", !(\u0275$index_1242_r44 === \u0275$count_1242_r45 - 1) ? "border-b border-slate-100 dark:border-slate-700" : ""));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r43.name.charAt(0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r43.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.editLaborForm.assign_worker === m_r43.name ? 6 : -1);
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 383);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_For_2_Template, 7, 7, "div", 376, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.assignableTeam);
  }
}
function Vendors_Conditional_147_For_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 350)(1, "td", 352)(2, "div", 205)(3, "p", 353);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 354)(6, "div", 355)(7, "label", 356);
    \u0275\u0275text(8, "Skill");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 357);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Template_button_click_9_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.showSkillDropdown = !ctx_r1.showSkillDropdown;
      ctx_r1.showStatusDropdown = false;
      ctx_r1.showAssignDropdown = false;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(10, "span", 358);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 359);
    \u0275\u0275text(13, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, Vendors_Conditional_147_For_20_Conditional_0_Conditional_14_Template, 3, 0, "div", 360);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 57)(16, "label", 356);
    \u0275\u0275text(17, "Count");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 361);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_147_For_20_Conditional_0_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLaborForm.labor_count, $event) || (ctx_r1.editLaborForm.labor_count = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 57)(20, "label", 356);
    \u0275\u0275text(21, "Rate (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 362);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_147_For_20_Conditional_0_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLaborForm.daily_rate, $event) || (ctx_r1.editLaborForm.daily_rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 363)(24, "div", 35)(25, "label", 356);
    \u0275\u0275text(26, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 357);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Template_button_click_27_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.showStatusDropdown = !ctx_r1.showStatusDropdown;
      ctx_r1.showSkillDropdown = false;
      ctx_r1.showAssignDropdown = false;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(28, "div", 364);
    \u0275\u0275element(29, "span", 365);
    \u0275\u0275elementStart(30, "span", 366);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "span", 359);
    \u0275\u0275text(33, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(34, Vendors_Conditional_147_For_20_Conditional_0_Conditional_34_Template, 9, 2, "div", 321);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 35)(36, "label", 356);
    \u0275\u0275text(37, "Assign To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 357);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Template_button_click_38_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.showAssignDropdown = !ctx_r1.showAssignDropdown;
      ctx_r1.showSkillDropdown = false;
      ctx_r1.showStatusDropdown = false;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(39, "div", 367);
    \u0275\u0275conditionalCreate(40, Vendors_Conditional_147_For_20_Conditional_0_Conditional_40_Template, 3, 1, "div", 368)(41, Vendors_Conditional_147_For_20_Conditional_0_Conditional_41_Template, 2, 0, "span", 369);
    \u0275\u0275elementStart(42, "span", 370);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "span", 359);
    \u0275\u0275text(45, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(46, Vendors_Conditional_147_For_20_Conditional_0_Conditional_46_Template, 3, 0, "div", 371);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 372)(48, "button", 373);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r36);
      const worker_r46 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveLaborEdit(worker_r46.id));
    });
    \u0275\u0275elementStart(49, "span", 115);
    \u0275\u0275text(50, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(51, " Save Changes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "button", 374);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_0_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelLaborEdit());
    });
    \u0275\u0275text(53, " Cancel ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const worker_r46 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Editing Labor #", worker_r46.id, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r1.showSkillDropdown ? "border-2 border-primary ring-2 ring-primary/15" : "border border-slate-300 dark:border-slate-600 hover:border-primary/60");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getSkillLabel(ctx_r1.editLaborForm.skill) || "Select skill");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showSkillDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showSkillDropdown ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLaborForm.labor_count);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLaborForm.daily_rate);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r1.showStatusDropdown ? "border-2 border-primary ring-2 ring-primary/15" : "border border-slate-300 dark:border-slate-600 hover:border-primary/60");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.editLaborForm.status === "active" ? "bg-green-500" : "bg-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.editLaborForm.status);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showStatusDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showStatusDropdown ? 34 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.showAssignDropdown ? "border-2 border-primary ring-2 ring-primary/15" : "border border-slate-300 dark:border-slate-600 hover:border-primary/60");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.editLaborForm.assign_worker ? 40 : 41);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.editLaborForm.assign_worker || "Unassigned");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", ctx_r1.showAssignDropdown);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showAssignDropdown ? 46 : -1);
  }
}
function Vendors_Conditional_147_For_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 351)(1, "td", 385);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 386)(4, "span", 387);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 386)(7, "span", 387);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 388);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 389);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 386)(14, "span", 390);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 386)(17, "div", 391)(18, "button", 392);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_1_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r47);
      const worker_r46 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editLaborWorker(worker_r46.id));
    });
    \u0275\u0275elementStart(19, "span", 61);
    \u0275\u0275text(20, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 393);
    \u0275\u0275listener("click", function Vendors_Conditional_147_For_20_Conditional_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r47);
      const worker_r46 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteLaborWorker(worker_r46.id));
    });
    \u0275\u0275elementStart(22, "span", 61);
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const worker_r46 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(worker_r46.skill);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(worker_r46.labor_count);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(worker_r46.assign_worker);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", worker_r46.daily_rate);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", worker_r46.daily_rate * worker_r46.labor_count);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", worker_r46.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", worker_r46.status, " ");
  }
}
function Vendors_Conditional_147_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Vendors_Conditional_147_For_20_Conditional_0_Template, 54, 20, "tr", 350)(1, Vendors_Conditional_147_For_20_Conditional_1_Template, 24, 7, "tr", 351);
  }
  if (rf & 2) {
    const worker_r46 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.editingLaborId === worker_r46.id ? 0 : 1);
  }
}
function Vendors_Conditional_147_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "table", 345)(2, "thead")(3, "tr", 346)(4, "th", 347);
    \u0275\u0275text(5, "Skill ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 348);
    \u0275\u0275text(7, "Labor Count");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 348);
    \u0275\u0275text(9, "Assign ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 349);
    \u0275\u0275text(11, "Rate (\u20B9/day)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 349);
    \u0275\u0275text(13, "Daily Cost (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 348);
    \u0275\u0275text(15, "Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 348);
    \u0275\u0275text(17, "Action ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, Vendors_Conditional_147_For_20_Template, 2, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r1.laborWorkers);
  }
}
function Vendors_Conditional_152_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "span", 394);
    \u0275\u0275text(2, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 395);
    \u0275\u0275listener("change", function Vendors_Conditional_152_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r48);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateVendorStatus($event.target.value));
    });
    \u0275\u0275elementStart(4, "option", 396);
    \u0275\u0275text(5, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 397);
    \u0275\u0275text(7, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 398);
    \u0275\u0275text(9, "Inactive");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.selectedVendor.statusColor)("value", ctx_r1.selectedVendor.status);
  }
}
function Vendors_For_156_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 401);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_For_156_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 402);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r49 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.currentStep === step_r49.num ? "text-white" : "text-slate-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r49.num);
  }
}
function Vendors_For_156_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 404);
  }
  if (rf & 2) {
    const step_r49 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r1.currentStep > step_r49.num ? "bg-primary" : "bg-surface-container");
  }
}
function Vendors_For_156_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90)(1, "div", 399)(2, "div", 400);
    \u0275\u0275conditionalCreate(3, Vendors_For_156_Conditional_3_Template, 2, 0, "span", 401)(4, Vendors_For_156_Conditional_4_Template, 2, 2, "span", 402);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 403);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, Vendors_For_156_Conditional_7_Template, 1, 1, "div", 404);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r49 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(5, _c3, ctx_r1.currentStep === step_r49.num, ctx_r1.currentStep > step_r49.num, ctx_r1.currentStep < step_r49.num));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.currentStep > step_r49.num ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.currentStep === step_r49.num ? "text-slate-900" : "text-outline");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r49.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r49.num < ctx_r1.vendorSteps.length ? 7 : -1);
  }
}
function Vendors_Conditional_158_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92)(1, "div")(2, "label", 405);
    \u0275\u0275text(3, "Vendor Legal Name ");
    \u0275\u0275elementStart(4, "span", 406);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "input", 407);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_158_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.name, $event) || (ctx_r1.newVendor.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 408)(8, "div")(9, "label", 405);
    \u0275\u0275text(10, "SPOC Name ");
    \u0275\u0275elementStart(11, "span", 406);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 409);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_158_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.spoc.name, $event) || (ctx_r1.newVendor.spoc.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "label", 405);
    \u0275\u0275text(16, "SPOC Phone ");
    \u0275\u0275elementStart(17, "span", 406);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 35)(20, "input", 410);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_158_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.spoc.phone, $event) || (ctx_r1.newVendor.spoc.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function Vendors_Conditional_158_Template_input_input_20_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sanitizePhone($event, "spoc"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 411);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 408)(24, "div")(25, "label", 405);
    \u0275\u0275text(26, "Official Email ");
    \u0275\u0275elementStart(27, "span", 406);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 412);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_158_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.email, $event) || (ctx_r1.newVendor.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "label", 405);
    \u0275\u0275text(32, "Official Phone ");
    \u0275\u0275elementStart(33, "span", 406);
    \u0275\u0275text(34, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 35)(36, "input", 410);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_158_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.phone, $event) || (ctx_r1.newVendor.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function Vendors_Conditional_158_Template_input_input_36_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sanitizePhone($event, "official"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 411);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.spoc.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.spoc.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.spoc.phone == null ? null : ctx_r1.newVendor.spoc.phone.length) ?? 0, "/10");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.email);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.phone == null ? null : ctx_r1.newVendor.phone.length) ?? 0, "/10");
  }
}
function Vendors_Conditional_159_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92)(1, "div", 413)(2, "span", 414);
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 415);
    \u0275\u0275text(5, " Provide ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7, "GST No.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " or ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, "PAN Card No.");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u2014 at least one is required. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 408)(13, "div")(14, "label", 405);
    \u0275\u0275text(15, "GST No.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 35)(17, "input", 416);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_159_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r51);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.kyc.gst, $event) || (ctx_r1.newVendor.kyc.gst = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 411);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div")(21, "label", 405);
    \u0275\u0275text(22, "PAN Card No.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 35)(24, "input", 417);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_159_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r51);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.kyc.pan, $event) || (ctx_r1.newVendor.kyc.pan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 411);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "div", 418)(28, "div", 419)(29, "label", 405);
    \u0275\u0275text(30, "Physical Address ");
    \u0275\u0275elementStart(31, "span", 406);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "input", 420);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_159_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r51);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.address.street, $event) || (ctx_r1.newVendor.address.street = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div")(35, "label", 405);
    \u0275\u0275text(36, "Pincode ");
    \u0275\u0275elementStart(37, "span", 406);
    \u0275\u0275text(38, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "input", 421);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_159_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r51);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.address.pincode, $event) || (ctx_r1.newVendor.address.pincode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.kyc.gst);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.kyc.gst == null ? null : ctx_r1.newVendor.kyc.gst.length) ?? 0, "/15");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.kyc.pan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (ctx_r1.newVendor.kyc.pan == null ? null : ctx_r1.newVendor.kyc.pan.length) ?? 0, "/10");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.address.street);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.address.pincode);
  }
}
function Vendors_Conditional_160_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 434);
    \u0275\u0275listener("click", function Vendors_Conditional_160_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r53);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.newVendor.project_ids = []);
    });
    \u0275\u0275text(1, " Clear all ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_160_For_24_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 438);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_160_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 435)(1, "input", 436);
    \u0275\u0275listener("change", function Vendors_Conditional_160_For_24_Template_input_change_1_listener() {
      const p_r55 = \u0275\u0275restoreView(_r54).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleProject(p_r55.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 437);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Vendors_Conditional_160_For_24_Conditional_4_Template, 2, 0, "span", 438);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r55 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-primary/5", ctx_r1.isProjectSelected(p_r55.id));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.isProjectSelected(p_r55.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r55.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isProjectSelected(p_r55.id) ? 4 : -1);
  }
}
function Vendors_Conditional_160_ForEmpty_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 431);
    \u0275\u0275text(1, " No projects available. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_160_Conditional_26_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 439);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 440);
    \u0275\u0275listener("click", function Vendors_Conditional_160_Conditional_26_For_2_Template_button_click_2_listener() {
      const pid_r57 = \u0275\u0275restoreView(_r56).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleProject(pid_r57));
    });
    \u0275\u0275text(3, " \u2715 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pid_r57 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getProjectName(pid_r57), " ");
  }
}
function Vendors_Conditional_160_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 432);
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_160_Conditional_26_For_2_Template, 4, 1, "span", 439, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.newVendor.project_ids);
  }
}
function Vendors_Conditional_160_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 434);
    \u0275\u0275listener("click", function Vendors_Conditional_160_Conditional_38_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.newVendor.skill = []);
    });
    \u0275\u0275text(1, " Clear all ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_160_For_41_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 438);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_160_For_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 435)(1, "input", 436);
    \u0275\u0275listener("change", function Vendors_Conditional_160_For_41_Template_input_change_1_listener() {
      const s_r60 = \u0275\u0275restoreView(_r59).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleSkill(s_r60.label));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 437);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Vendors_Conditional_160_For_41_Conditional_4_Template, 2, 0, "span", 438);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r60 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-primary/5", ctx_r1.isSkillSelected(s_r60.label));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.isSkillSelected(s_r60.label));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r60.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSkillSelected(s_r60.label) ? 4 : -1);
  }
}
function Vendors_Conditional_160_ForEmpty_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 431);
    \u0275\u0275text(1, " No skills available. ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_160_Conditional_45_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 439);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 440);
    \u0275\u0275listener("click", function Vendors_Conditional_160_Conditional_45_For_2_Template_button_click_2_listener() {
      const svc_r62 = \u0275\u0275restoreView(_r61).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleSkill(svc_r62));
    });
    \u0275\u0275text(3, " \u2715 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const svc_r62 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", svc_r62, " ");
  }
}
function Vendors_Conditional_160_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 433);
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_160_Conditional_45_For_2_Template, 4, 1, "span", 439, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.newVendor.skill);
  }
}
function Vendors_Conditional_160_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92)(1, "div")(2, "label", 405);
    \u0275\u0275text(3, " Budget Allocation ");
    \u0275\u0275elementStart(4, "span", 406);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "span", 422);
    \u0275\u0275text(8, "\u20B9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 423);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_Conditional_160_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r52);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newVendor.budget, $event) || (ctx_r1.newVendor.budget = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 424);
    \u0275\u0275text(11, "Enter budget in INR (e.g. 500000)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 405);
    \u0275\u0275text(14, " Project ");
    \u0275\u0275elementStart(15, "span", 406);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 425)(18, "div", 426)(19, "span", 427);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, Vendors_Conditional_160_Conditional_21_Template, 2, 0, "button", 428);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 429);
    \u0275\u0275repeaterCreate(23, Vendors_Conditional_160_For_24_Template, 5, 5, "label", 430, _forTrack1, false, Vendors_Conditional_160_ForEmpty_25_Template, 2, 0, "p", 431);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(26, Vendors_Conditional_160_Conditional_26_Template, 3, 0, "div", 432);
    \u0275\u0275elementStart(27, "p", 424);
    \u0275\u0275text(28, "Multiple projects select kar sakte ho");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div")(30, "label", 405);
    \u0275\u0275text(31, " Skill / Services Offered ");
    \u0275\u0275elementStart(32, "span", 406);
    \u0275\u0275text(33, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 425)(35, "div", 426)(36, "span", 427);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, Vendors_Conditional_160_Conditional_38_Template, 2, 0, "button", 428);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 429);
    \u0275\u0275repeaterCreate(40, Vendors_Conditional_160_For_41_Template, 5, 5, "label", 430, _forTrack2, false, Vendors_Conditional_160_ForEmpty_42_Template, 2, 0, "p", 431);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "p", 424);
    \u0275\u0275text(44, "Multiple skills select kar sakte ho");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(45, Vendors_Conditional_160_Conditional_45_Template, 3, 0, "div", 433);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newVendor.budget);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.newVendor.project_ids == null ? null : ctx_r1.newVendor.project_ids.length) > 0 ? ctx_r1.newVendor.project_ids.length + " project(s) selected" : "Select projects", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.newVendor.project_ids == null ? null : ctx_r1.newVendor.project_ids.length) > 0 ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.projects);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((ctx_r1.newVendor.project_ids == null ? null : ctx_r1.newVendor.project_ids.length) > 0 ? 26 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.newVendor.skill == null ? null : ctx_r1.newVendor.skill.length) > 0 ? ctx_r1.newVendor.skill.length + " skill(s) selected" : "Select skills", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.newVendor.skill == null ? null : ctx_r1.newVendor.skill.length) > 0 ? 38 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.skillOptions);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((ctx_r1.newVendor.skill == null ? null : ctx_r1.newVendor.skill.length) > 0 ? 45 : -1);
  }
}
function Vendors_Conditional_161_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 448)(1, "span", 449);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 450);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 451);
    \u0275\u0275text(6, "open_in_new");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r64 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", file_r64, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getFileName(file_r64));
  }
}
function Vendors_Conditional_161_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121)(1, "p", 117);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, Vendors_Conditional_161_Conditional_1_For_4_Template, 7, 2, "a", 448, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Existing Documents (", ctx_r1.selectedVendor.contract_files.length, ") ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.selectedVendor.contract_files);
  }
}
function Vendors_Conditional_161_Conditional_22_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r65 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 452)(1, "div", 453)(2, "span", 454);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 455)(5, "p", 456);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 457);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 458);
    \u0275\u0275listener("click", function Vendors_Conditional_161_Conditional_22_For_4_Template_button_click_9_listener() {
      const $index_r66 = \u0275\u0275restoreView(_r65).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeContractFile($index_r66));
    });
    \u0275\u0275elementStart(10, "span", 459);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const f_r67 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getFileIconBg(f_r67.name));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getFileIconColor(f_r67.name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getFileIcon(f_r67.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(f_r67.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFileSize(f_r67.size));
  }
}
function Vendors_Conditional_161_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121)(1, "p", 117);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, Vendors_Conditional_161_Conditional_22_For_4_Template, 12, 5, "div", 452, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.contractFiles.length, " naya file", ctx_r1.contractFiles.length > 1 ? "s" : "", " selected ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.contractFiles);
  }
}
function Vendors_Conditional_161_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 447)(1, "span", 460);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 461);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.fileError);
  }
}
function Vendors_Conditional_161_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_161_Conditional_1_Template, 5, 1, "div", 121);
    \u0275\u0275elementStart(2, "div")(3, "label", 405);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "span", 441);
    \u0275\u0275text(6, "(Optional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "label", 442)(8, "span", 443);
    \u0275\u0275text(9, "upload_file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 444);
    \u0275\u0275text(11, "Click to upload or drag & drop");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 445);
    \u0275\u0275text(13, " PDF \xB7 Word (.doc/.docx) \xB7 JPG \xB7 PNG");
    \u0275\u0275element(14, "br");
    \u0275\u0275text(15, " Max ");
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17, "10 MB");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " per file \xB7 Up to ");
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20, "10 files");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 446);
    \u0275\u0275listener("change", function Vendors_Conditional_161_Template_input_change_21_listener($event) {
      \u0275\u0275restoreView(_r63);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onContractFilesSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, Vendors_Conditional_161_Conditional_22_Template, 5, 2, "div", 121);
    \u0275\u0275conditionalCreate(23, Vendors_Conditional_161_Conditional_23_Template, 5, 1, "div", 447);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditMode && ctx_r1.selectedVendor && ctx_r1.selectedVendor.contract_files.length > 0 ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditMode ? "Add More Documents" : "Contract Documents", " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-primary", ctx_r1.contractFiles.length > 0);
    \u0275\u0275advance(15);
    \u0275\u0275conditional(ctx_r1.contractFiles.length > 0 ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.fileError ? 23 : -1);
  }
}
function Vendors_Conditional_162_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "span", 462);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 463);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.stepError);
  }
}
function Vendors_Conditional_164_Template(rf, ctx) {
  if (rf & 1) {
    const _r68 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 464);
    \u0275\u0275listener("click", function Vendors_Conditional_164_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r68);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(1, "span", 115);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Back ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSaving);
  }
}
function Vendors_Conditional_165_Template(rf, ctx) {
  if (rf & 1) {
    const _r69 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 465);
    \u0275\u0275listener("click", function Vendors_Conditional_165_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r69);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddModal = false);
    });
    \u0275\u0275text(1, " Cancel ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_166_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 466);
    \u0275\u0275listener("click", function Vendors_Conditional_166_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r70);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(1, " Next ");
    \u0275\u0275elementStart(2, "span", 115);
    \u0275\u0275text(3, "arrow_forward");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_Conditional_167_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 468);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving... ");
  }
}
function Vendors_Conditional_167_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Update ");
  }
}
function Vendors_Conditional_167_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Onboard ");
  }
}
function Vendors_Conditional_167_Template(rf, ctx) {
  if (rf & 1) {
    const _r71 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 467);
    \u0275\u0275listener("click", function Vendors_Conditional_167_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r71);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addVendor());
    });
    \u0275\u0275conditionalCreate(1, Vendors_Conditional_167_Conditional_1_Template, 3, 0)(2, Vendors_Conditional_167_Conditional_2_Template, 3, 0)(3, Vendors_Conditional_167_Conditional_3_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSaving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSaving ? 1 : ctx_r1.isEditMode ? 2 : 3);
  }
}
function Vendors_Conditional_206_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 118);
    \u0275\u0275text(1, " Hours ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_For_217_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r74 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 485);
    \u0275\u0275listener("click", function Vendors_For_217_Conditional_7_For_2_Template_div_click_0_listener() {
      const opt_r75 = \u0275\u0275restoreView(_r74).$implicit;
      const item_r73 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectType(item_r73, opt_r75.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r75 = ctx.$implicit;
    const item_r73 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap("px-3 py-2 text-[11px] font-medium cursor-pointer hover:bg-primary/10 " + (item_r73.type === opt_r75.value ? "text-primary bg-primary/5" : "text-on-surface"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r75.label, " ");
  }
}
function Vendors_For_217_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 483);
    \u0275\u0275listener("click", function Vendors_For_217_Conditional_7_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, Vendors_For_217_Conditional_7_For_2_Template, 2, 3, "div", 484, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.typeOptions);
  }
}
function Vendors_For_217_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r76 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 487);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_217_Conditional_10_Conditional_0_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r76);
      const item_r73 = \u0275\u0275nextContext(2).$implicit;
      \u0275\u0275twoWayBindingSet(item_r73.hours, $event) || (item_r73.hours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_217_Conditional_10_Conditional_0_Template_input_ngModelChange_0_listener() {
      \u0275\u0275restoreView(_r76);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.calculateInvoiceTotals());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r73 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275twoWayProperty("ngModel", item_r73.hours);
  }
}
function Vendors_For_217_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
}
function Vendors_For_217_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Vendors_For_217_Conditional_10_Conditional_0_Template, 1, 1, "input", 486)(1, Vendors_For_217_Conditional_10_Conditional_1_Template, 1, 0, "div");
  }
  if (rf & 2) {
    const item_r73 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(item_r73.type === "labor" ? 0 : 1);
  }
}
function Vendors_For_217_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r77 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 485);
    \u0275\u0275listener("click", function Vendors_For_217_Conditional_21_For_2_Template_div_click_0_listener() {
      const opt_r78 = \u0275\u0275restoreView(_r77).$implicit;
      const item_r73 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectGst(item_r73, opt_r78.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r78 = ctx.$implicit;
    const item_r73 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classMap("px-3 py-2 text-[11px] font-bold cursor-pointer hover:bg-primary/10 text-center " + (item_r73.gst === opt_r78.value ? "text-primary bg-primary/5" : "text-on-surface"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r78.label, " ");
  }
}
function Vendors_For_217_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 483);
    \u0275\u0275listener("click", function Vendors_For_217_Conditional_21_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275repeaterCreate(1, Vendors_For_217_Conditional_21_For_2_Template, 2, 3, "div", 484, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.gstOptions);
  }
}
function Vendors_For_217_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 480);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r73 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" incl. \u20B9", \u0275\u0275pipeBind2(2, 1, item_r73.gstAmount, "1.0-2"), " TAX ");
  }
}
function Vendors_For_217_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 488);
    \u0275\u0275listener("click", function Vendors_For_217_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r79);
      const $index_r80 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeInvoiceItem($index_r80));
    });
    \u0275\u0275elementStart(1, "span", 115);
    \u0275\u0275text(2, " delete ");
    \u0275\u0275elementEnd()();
  }
}
function Vendors_For_217_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 482);
  }
}
function Vendors_For_217_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 469)(1, "div", 35)(2, "button", 470);
    \u0275\u0275listener("click", function Vendors_For_217_Template_button_click_2_listener($event) {
      const item_r73 = \u0275\u0275restoreView(_r72).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.toggleDropdown(item_r73, "type"));
    });
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 471);
    \u0275\u0275text(6, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, Vendors_For_217_Conditional_7_Template, 3, 0, "div", 472);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 473);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_217_Template_input_ngModelChange_8_listener($event) {
      const item_r73 = \u0275\u0275restoreView(_r72).$implicit;
      \u0275\u0275twoWayBindingSet(item_r73.description, $event) || (item_r73.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 474);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_217_Template_input_ngModelChange_9_listener($event) {
      const item_r73 = \u0275\u0275restoreView(_r72).$implicit;
      \u0275\u0275twoWayBindingSet(item_r73.quantity, $event) || (item_r73.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_217_Template_input_ngModelChange_9_listener() {
      \u0275\u0275restoreView(_r72);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calculateInvoiceTotals());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, Vendors_For_217_Conditional_10_Template, 2, 1);
    \u0275\u0275elementStart(11, "div", 35)(12, "span", 475);
    \u0275\u0275text(13, " \u20B9 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 476);
    \u0275\u0275twoWayListener("ngModelChange", function Vendors_For_217_Template_input_ngModelChange_14_listener($event) {
      const item_r73 = \u0275\u0275restoreView(_r72).$implicit;
      \u0275\u0275twoWayBindingSet(item_r73.unitPrice, $event) || (item_r73.unitPrice = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Vendors_For_217_Template_input_ngModelChange_14_listener() {
      \u0275\u0275restoreView(_r72);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calculateInvoiceTotals());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 35)(16, "button", 470);
    \u0275\u0275listener("click", function Vendors_For_217_Template_button_click_16_listener($event) {
      const item_r73 = \u0275\u0275restoreView(_r72).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.toggleDropdown(item_r73, "gst"));
    });
    \u0275\u0275elementStart(17, "span", 477);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 471);
    \u0275\u0275text(20, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, Vendors_For_217_Conditional_21_Template, 3, 0, "div", 472);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 478)(23, "p", 479);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, Vendors_For_217_Conditional_26_Template, 3, 4, "p", 480);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(27, Vendors_For_217_Conditional_27_Template, 3, 0, "button", 481)(28, Vendors_For_217_Conditional_28_Template, 1, 0, "div", 482);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r73 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("grid-template-columns", ctx_r1.hasLaborItems() ? "130px 1fr 60px 70px 100px 80px 90px 32px" : "130px 1fr 60px 100px 80px 90px 32px");
    \u0275\u0275advance(2);
    \u0275\u0275classMap("w-full flex items-center justify-between gap-1 px-2 py-2 rounded-xl border bg-surface-container-lowest text-[11px] font-medium outline-none cursor-pointer transition-all " + (item_r73.typeOpen ? "border-primary ring-2 ring-primary/20" : "border-outline-variant/20"));
    \u0275\u0275advance();
    \u0275\u0275classMap(item_r73.type ? "text-on-surface" : "text-outline");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTypeLabel(item_r73.type), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", item_r73.typeOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r73.typeOpen ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", item_r73.description);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", item_r73.quantity);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasLaborItems() ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r73.unitPrice);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("w-full flex items-center justify-between gap-1 px-2 py-2 rounded-xl border bg-surface-container-lowest text-[11px] font-bold outline-none cursor-pointer transition-all " + (item_r73.gstOpen ? "border-primary ring-2 ring-primary/20" : "border-outline-variant/20"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r73.gst, "%");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-180", item_r73.gstOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r73.gstOpen ? 21 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(25, 23, item_r73.total || 0, "1.0-2"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r73.gstAmount > 0 ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.invoiceForm.items.length > 1 ? 27 : 28);
  }
}
function Vendors_Conditional_225_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 489)(1, "span", 490);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 491);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const gb_r81 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" TAX @ ", gb_r81.rate, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(5, 2, gb_r81.amount, "1.0-2"), " ");
  }
}
function Vendors_Conditional_225_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 127);
    \u0275\u0275repeaterCreate(1, Vendors_Conditional_225_For_2_Template, 6, 5, "div", 489, _forTrack4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.invoiceForm.gstBreakdown);
  }
}
function Vendors_Conditional_242_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 292);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving... ");
  }
}
function Vendors_Conditional_243_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Submit Invoice ");
  }
}
function Vendors_Conditional_245_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 510);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const svc_r83 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", svc_r83, " ");
  }
}
function Vendors_Conditional_245_Conditional_45_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 514)(1, "span", 515);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 516);
    \u0275\u0275text(4, "download");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r84 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", file_r84, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFileName(file_r84), " ");
  }
}
function Vendors_Conditional_245_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121)(1, "p", 503);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 513);
    \u0275\u0275repeaterCreate(4, Vendors_Conditional_245_Conditional_45_For_5_Template, 5, 2, "a", 514, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Documents (", ctx_r1.selectedVendor.contract_files.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.selectedVendor.contract_files);
  }
}
function Vendors_Conditional_245_Template(rf, ctx) {
  if (rf & 1) {
    const _r82 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 492)(1, "h3", 160);
    \u0275\u0275text(2, "Vendor Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 493)(4, "span", 494);
    \u0275\u0275listener("click", function Vendors_Conditional_245_Template_span_click_4_listener() {
      \u0275\u0275restoreView(_r82);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editVendorDetail(ctx_r1.selectedVendor));
    });
    \u0275\u0275elementStart(5, "span", 140);
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 494);
    \u0275\u0275listener("click", function Vendors_Conditional_245_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r82);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showVendorDetailModal = false);
    });
    \u0275\u0275elementStart(8, "span", 140);
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 495)(11, "div", 496)(12, "div", 232)(13, "h3", 497);
    \u0275\u0275text(14, "Contact Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 498)(16, "span", 499);
    \u0275\u0275text(17, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 500);
    \u0275\u0275text(19, "Verified");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 501)(21, "div", 502)(22, "p", 503);
    \u0275\u0275text(23, "SPOC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 504);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 505);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 506);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 502)(31, "p", 503);
    \u0275\u0275text(32, "GST");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p", 507);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 503);
    \u0275\u0275text(36, "PAN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 507);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 508)(40, "p", 503);
    \u0275\u0275text(41, "Skills");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 509);
    \u0275\u0275repeaterCreate(43, Vendors_Conditional_245_For_44_Template, 2, 1, "span", 510, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(45, Vendors_Conditional_245_Conditional_45_Template, 6, 1, "div", 121);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 511)(47, "button", 512);
    \u0275\u0275listener("click", function Vendors_Conditional_245_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r82);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showVendorDetailModal = false);
    });
    \u0275\u0275text(48, " Close ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(25);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.spoc.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.spoc.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedVendor.spoc.phone);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.kyc.gst || "\u2014", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedVendor.kyc.pan || "\u2014", " ");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.selectedVendor.skill);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedVendor.contract_files.length > 0 ? 45 : -1);
  }
}
function Vendors_Conditional_288_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 292);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving... ");
  }
}
function Vendors_Conditional_289_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Submit Audit ");
  }
}
function Vendors_Conditional_309_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 169)(1, "span", 517);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Exceeded ");
    \u0275\u0275elementEnd();
  }
}
function Vendors_Conditional_310_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 170)(1, "span", 518);
    \u0275\u0275text(2, "Total Billed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 519);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(5, 1, ctx_r1.totalBilled));
  }
}
function Vendors_For_313_Template(rf, ctx) {
  if (rf & 1) {
    const _r85 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 172)(1, "div", 264)(2, "div", 520)(3, "span", 521);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "p", 522);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 523);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 524)(11, "p", 525);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 526);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 527);
    \u0275\u0275listener("click", function Vendors_For_313_Template_button_click_15_listener() {
      const inv_r86 = \u0275\u0275restoreView(_r85).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewInvoice(inv_r86));
    });
    \u0275\u0275elementStart(16, "span", 251);
    \u0275\u0275text(17, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " View Invoice ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const inv_r86 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(8, _c4, inv_r86.status === "Paid", inv_r86.status === "Cancelled", inv_r86.status !== "Paid" && inv_r86.status !== "Cancelled"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(12, _c5, inv_r86.status === "Paid", inv_r86.status === "Cancelled", inv_r86.status !== "Paid" && inv_r86.status !== "Cancelled"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r86.status === "Paid" ? "check_circle" : inv_r86.status === "Cancelled" ? "cancel" : "pending", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(inv_r86.invoice_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(inv_r86.invoice_date), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", (+inv_r86.grand_total).toLocaleString("en-IN"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(16, _c1, inv_r86.status === "Paid", inv_r86.status === "Cancelled", inv_r86.status !== "Paid" && inv_r86.status !== "Cancelled"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r86.status, " ");
  }
}
function Vendors_ForEmpty_314_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 173)(1, "span", 214);
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 528);
    \u0275\u0275text(4, "No billing records found.");
    \u0275\u0275elementEnd()();
  }
}
var Vendors = class _Vendors {
  projectId = "";
  showPaymentModeDropdown = false;
  projectdata = null;
  modalProjectData = null;
  _pendingEditVendor = null;
  vendorService = inject(VendorsServices);
  laborService = inject(VendorsLaborServices);
  invoiceService = inject(VendorInvoiceService);
  auditService = inject(VendorAuditService);
  skillMasterService = inject(SkillMasterServices);
  projectService = inject(ProjectService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);
  showSkillDropdown = false;
  showStatusDropdown = false;
  showAssignDropdown = false;
  showProjectDropdown = false;
  allTasks = [];
  settlementTasks = [];
  skillOptions = [];
  milestoneDropdownOpen = false;
  subMilestoneDropdownOpen = false;
  taskDropdownOpen = false;
  selectedInvoice = null;
  showSettlementCards = false;
  selectedSettlementType = "work_poc";
  milestones = [];
  subMilestones = [];
  milestoneTasks = [];
  selectedMilestoneId = null;
  selectedSubMilestoneId = null;
  selectedMilestoneIds = [];
  selectedSubMilestoneIds = [];
  selectedTaskIds = [];
  settlementCompletion = null;
  isLoadingMilestones = false;
  isLoadingSubMilestones = false;
  showAddModal = false;
  showInvoiceModal = false;
  showVendorDetailModal = false;
  payInvoiceeModal = false;
  showCancelInvoiceModal = false;
  showAuditModal = false;
  showBillingModal = false;
  showLaborModal = false;
  showAddLaborForm = false;
  currentStep = 1;
  stepError = "";
  fileError = "";
  contractFiles = [];
  showBudgetExceedConfirm = false;
  budgetExceedDetails = null;
  vendorSteps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "KYC & Address" },
    { num: 3, label: "Budget" },
    { num: 4, label: "Documents" }
  ];
  paymentForm = {
    amount: null,
    project_id: null,
    mode: "",
    reference: "",
    clearance_date: ""
  };
  paymentError = "";
  isProcessingPayment = false;
  isEditMode = false;
  editingVendorId = null;
  isSaving = false;
  isDeleting = false;
  isSavingLabor = false;
  isSavingAudit = false;
  isSavingInvoice = false;
  isCancellingInvoice = false;
  laborError = "";
  viewingVendorId = null;
  selectedVendor = void 0;
  vendors = [];
  projects = [];
  stats = { totalActive: 0, pendingPayments: 0, compliantPartners: "0%" };
  activities = [];
  laborWorkers = [];
  laborStats = {
    totalPersonnel: 0,
    onSite: 0,
    remaining: 0,
    activePersonnel: 0,
    skillCompliance: "0%",
    skillComposition: []
  };
  laborLoading = false;
  invoices = [];
  vendorAudits = [];
  newLabor = this.defaultLabor();
  newVendor = this.defaultVendor();
  invoiceForm = this.defaultInvoice();
  auditForm = { quality: 5, timeliness: 5, safety: 5, observations: "" };
  editingLaborId = null;
  editLaborForm = {};
  team = [];
  assignableTeam = [];
  selectedMember = "All Members";
  statusOptions = [
    { value: "active", label: "Active" },
    { value: "on_site", label: "On Site" },
    { value: "off_duty", label: "Off Duty" },
    { value: "inactive", label: "Inactive" }
  ];
  typeOptions = [
    { value: "material", label: "Material" },
    { value: "equipment", label: "Equipment" },
    { value: "labor", label: "Labor" },
    { value: "others", label: "Others" }
  ];
  gstOptions = [
    { value: 0, label: "0%" },
    { value: 5, label: "5%" },
    { value: 12, label: "12%" },
    { value: 18, label: "18%" },
    { value: 28, label: "28%" }
  ];
  sumRate = (acc, w) => acc + (Number(w.daily_rate) || 0) * (w.labor_count || 0);
  Math = Math;
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.viewingVendorId = params.get("id");
      this.syncSelectedVendor();
    });
    this.getSkill();
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
      this.syncSelectedVendor();
    });
    this.vendorService.stats$.subscribe((s) => this.stats = s);
    this.vendorService.activities$.subscribe((a) => this.activities = a);
    this.laborService.workers$.subscribe((w) => this.laborWorkers = w);
    this.laborService.stats$.subscribe((s) => this.laborStats = s);
    this.laborService.loading$.subscribe((l) => this.laborLoading = l);
    this.invoiceService.invoices$.subscribe((inv) => this.invoices = inv);
    this.auditService.audits$.subscribe((audits) => this.vendorAudits = audits);
    this.loadProjects();
    this.loadTeamMembers();
  }
  loadVendorSubData(vendorId) {
    this.invoiceService.loadInvoices(vendorId);
    this.auditService.loadAudits(vendorId);
    this.laborService.loadLaborForVendor(vendorId);
    const projectId = this.selectedVendor?.project_id;
    if (projectId) {
      this.loadProjectTasks(projectId);
      this.projectService.getProjectById(projectId).subscribe({
        next: (res) => {
          this.projectdata = res?.data ?? null;
          this.setProjectMilestones(res?.data ?? {});
          this.updateSettlementCompletionFromProject();
        },
        error: (err) => {
          this.projectdata = null;
          console.error("Project load failed", err);
        }
      });
    } else {
      this.allTasks = [];
      this.projectdata = null;
      this.setProjectMilestones({});
    }
  }
  getSkill() {
    this.skillMasterService.loadSkills().subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data)) {
          this.skillOptions = res.data.map((s) => ({
            value: s.skill_name?.toLowerCase().replace(/\s+/g, "_") ?? s.id,
            label: s.skill_name ?? s.name
          }));
          if (this._pendingEditVendor) {
            this.editVendorDetail(this._pendingEditVendor);
            this._pendingEditVendor = null;
          }
        }
      }
    });
  }
  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = Array.isArray(res?.data) ? res.data : [];
      },
      error: (err) => console.error("Project list load failed", err)
    });
  }
  getProjectById() {
    if (!this.projectId)
      return;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.projectdata = res?.data ?? null;
      },
      error: (err) => console.error("Project load failed", err)
    });
  }
  getProject(projectEvent) {
    const projectIdValue = typeof projectEvent === "object" && projectEvent !== null && "target" in projectEvent ? projectEvent.target.value : projectEvent;
    const selectedId = Number(projectIdValue);
    this.milestones = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.selectedMilestoneId = null;
    this.selectedSubMilestoneId = null;
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    if (selectedId) {
      this.showSettlementCards = true;
      this.paymentForm.project_id = selectedId;
      this.loadProjectTasks(selectedId, "settlement");
      this.isLoadingMilestones = true;
      this.projectService.getProjectById(selectedId).subscribe({
        next: (res) => {
          this.modalProjectData = res?.data ?? null;
          this.setProjectMilestones(res?.data ?? {});
          this.updateSettlementCompletionFromProject();
          this.isLoadingMilestones = false;
        },
        error: (err) => {
          this.modalProjectData = null;
          this.isLoadingMilestones = false;
          console.error("Selected project load failed", err);
        }
      });
    } else {
      this.showSettlementCards = false;
      this.modalProjectData = null;
      this.settlementTasks = [];
      this.setProjectMilestones({});
    }
  }
  syncSelectedVendor() {
    if (!this.viewingVendorId) {
      this.selectedVendor = void 0;
      return;
    }
    const local = this.vendorService.getVendorById(this.viewingVendorId);
    if (local) {
      this.selectedVendor = local;
      this.loadVendorSubData(this.viewingVendorId);
    } else {
      this.vendorService.getVendorByIdFromApi(this.viewingVendorId).subscribe({
        next: (v) => {
          this.selectedVendor = v;
          this.loadVendorSubData(this.viewingVendorId);
        },
        error: () => this.router.navigate(["/master/resources/vendors"])
      });
    }
  }
  loadTeamMembers() {
    this.projectService.getTeamMembers().subscribe({
      next: (res) => {
        const members = Array.isArray(res?.data) ? res.data : [];
        const mapped = members.map((m) => {
          const fullName = m.name ?? m.full_name ?? m.username ?? [m.firstname, m.lastname].filter(Boolean).join(" ").trim();
          return { name: fullName };
        }).filter((m) => !!m.name);
        this.assignableTeam = [...mapped];
        this.team = [{ name: "All Members" }, ...mapped];
      },
      error: (err) => {
        console.error("[loadTeamMembers]", err);
        this.assignableTeam = [];
        this.team = [{ name: "All Members" }];
      }
    });
  }
  get filteredVendors() {
    if (this.selectedMember === "All Members")
      return this.vendors;
    return this.vendors.filter((v) => v.assignee === this.selectedMember);
  }
  get availableSubMilestones() {
    if (this.selectedMilestoneIds.length === 0)
      return [];
    const withChild = Array.isArray(this.modalProjectData?.milestones_with_child) ? this.modalProjectData.milestones_with_child : [];
    const result = [];
    withChild.filter((m) => this.selectedMilestoneIds.includes(Number(m.id))).forEach((m) => {
      if (Array.isArray(m.children))
        result.push(...m.children);
    });
    return result;
  }
  get availableTaskOptions() {
    if (!this.selectedSubMilestoneIds.length)
      return [];
    return this.settlementTasks.filter((task) => this.selectedSubMilestoneIds.includes(Number(task.submilestone_id)));
  }
  get isSettlementCompletionEditable() {
    return this.selectedSettlementType === "work_poc";
  }
  get settlementCompletionLabel() {
    return "% Complete";
  }
  get remainingAmount() {
    if (!this.selectedInvoice)
      return 0;
    const grandTotal = parseFloat(String(this.selectedInvoice.grand_total)) || 0;
    const alreadyPaid = parseFloat(String(this.selectedInvoice.paid_amount)) || 0;
    return Math.max(0, grandTotal - alreadyPaid);
  }
  get lumpsumPaidDisplay() {
    if (!this.selectedInvoice)
      return "";
    const entered = Number(this.paymentForm.amount) || 0;
    const total = Number(this.selectedInvoice.grand_total) || 0;
    return `\u20B9${entered.toLocaleString("en-IN")} / \u20B9${total.toLocaleString("en-IN")}`;
  }
  get budgetUsage() {
    const allocated = Number(this.selectedVendor?.budget_allocation) || 0;
    const invoiced = (this.invoices || []).filter((inv) => inv.status !== "Cancelled").reduce((sum, inv) => sum + (Number(inv.grand_total) || 0), 0);
    const percent = allocated > 0 ? Math.round(invoiced / allocated * 100) : 0;
    const exceeded = allocated > 0 && invoiced > allocated;
    return { allocated, invoiced, percent, exceeded, exceededBy: exceeded ? invoiced - allocated : 0 };
  }
  get totalBilled() {
    return this.invoices.filter((inv) => inv.status !== "Cancelled").reduce((acc, inv) => acc + Number(inv.grand_total), 0);
  }
  get todayDate() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  get threeMonthsAgoDate() {
    const date = /* @__PURE__ */ new Date();
    date.setMonth(date.getMonth() - 3);
    return date.toISOString().split("T")[0];
  }
  get auditScore() {
    return Math.round((this.auditForm.quality + this.auditForm.timeliness + this.auditForm.safety) / 30 * 100);
  }
  loadProjectTasks(projectId, target = "main") {
    this.projectService.getProjectTasks(projectId).subscribe({
      next: (res) => {
        if (target === "settlement") {
          this.settlementTasks = res?.data || [];
        } else {
          this.allTasks = res?.data || [];
        }
        this.syncSelectedTasksWithOptions();
      },
      error: (err) => {
        if (target === "settlement")
          this.settlementTasks = [];
        else
          this.allTasks = [];
        console.error("Task load failed", err);
      }
    });
  }
  setProjectMilestones(projectData) {
    const withChild = Array.isArray(projectData?.milestones_with_child) ? projectData.milestones_with_child : [];
    this.milestones = withChild.filter((m) => !m.parent_id);
    this.subMilestones = [];
    this.milestoneTasks = [];
  }
  updateSettlementCompletionFromProject() {
    const fieldMap = {
      work_poc: "work_poc_completion",
      milestone: "milestone_completion",
      lumpsum: "lumpsum_completion"
    };
    const rawValue = this.modalProjectData?.[fieldMap[this.selectedSettlementType]];
    this.settlementCompletion = rawValue == null || rawValue === "" ? null : Number(rawValue);
  }
  getItemProgress(item) {
    const rawProgress = item?.milestone_progress ?? item?.progress ?? item?.completion ?? item?.percent_complete ?? item?.percentage;
    if (rawProgress != null && rawProgress !== "") {
      const progress = Number(rawProgress);
      return Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : null;
    }
    const status = String(item?.status ?? "").toLowerCase().replace(/\s+/g, "_");
    if (status === "completed")
      return 100;
    if (status === "in_progress" || status === "review")
      return 50;
    if (status === "pending" || status === "to_do" || status === "on_hold")
      return 0;
    return null;
  }
  averageProgress(items) {
    const values = items.map((item) => this.getItemProgress(item)).filter((value) => value !== null);
    if (values.length === 0)
      return null;
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }
  updateSettlementCompletionFromSelection() {
    const selectedTasks = this.settlementTasks.filter((task) => this.selectedTaskIds.includes(Number(task.id)));
    const selectedSubMilestones = this.availableSubMilestones.filter((sm) => this.selectedSubMilestoneIds.includes(Number(sm.id)));
    const selectedMilestones = this.milestones.filter((m) => this.selectedMilestoneIds.includes(Number(m.id)));
    const progress = (selectedTasks.length > 0 ? this.averageProgress(selectedTasks) : null) ?? (selectedSubMilestones.length > 0 ? this.averageProgress(selectedSubMilestones) : null) ?? (selectedMilestones.length > 0 ? this.averageProgress(selectedMilestones) : null);
    if (progress != null) {
      this.settlementCompletion = progress;
    } else {
      this.updateSettlementCompletionFromProject();
    }
  }
  syncSelectedTasksWithOptions() {
    const allowedTaskIds = this.availableTaskOptions.map((task) => Number(task.id));
    this.selectedTaskIds = this.selectedTaskIds.filter((id) => allowedTaskIds.includes(Number(id)));
  }
  applyMilestoneSelection() {
    this.onMilestoneMultiSelect();
    this.milestoneDropdownOpen = false;
  }
  applySubMilestoneSelection() {
    this.onSubMilestoneMultiSelect();
    this.subMilestoneDropdownOpen = false;
  }
  applyTaskSelection() {
    this.onTaskMultiSelect();
    this.taskDropdownOpen = false;
  }
  onMilestoneMultiSelect() {
    this.selectedMilestoneIds = this.selectedMilestoneIds.map((id) => Number(id));
    const allowedSubIds = this.availableSubMilestones.map((m) => Number(m.id));
    this.selectedSubMilestoneIds = this.selectedSubMilestoneIds.filter((id) => allowedSubIds.includes(Number(id)));
    this.syncSelectedTasksWithOptions();
    this.updateSettlementCompletionFromSelection();
  }
  onSubMilestoneMultiSelect() {
    this.selectedSubMilestoneIds = this.selectedSubMilestoneIds.map((id) => Number(id));
    this.syncSelectedTasksWithOptions();
    this.updateSettlementCompletionFromSelection();
  }
  onTaskMultiSelect() {
    this.selectedTaskIds = this.selectedTaskIds.map((id) => Number(id));
    this.updateSettlementCompletionFromSelection();
  }
  toggleMilestoneSelection(id) {
    const idx = this.selectedMilestoneIds.indexOf(id);
    if (idx === -1)
      this.selectedMilestoneIds.push(id);
    else
      this.selectedMilestoneIds.splice(idx, 1);
    this.onMilestoneMultiSelect();
  }
  toggleSubMilestoneSelection(id) {
    const idx = this.selectedSubMilestoneIds.indexOf(id);
    if (idx === -1)
      this.selectedSubMilestoneIds.push(id);
    else
      this.selectedSubMilestoneIds.splice(idx, 1);
    this.onSubMilestoneMultiSelect();
  }
  toggleTaskSelection(id) {
    const idx = this.selectedTaskIds.indexOf(id);
    if (idx === -1)
      this.selectedTaskIds.push(id);
    else
      this.selectedTaskIds.splice(idx, 1);
    this.onTaskMultiSelect();
  }
  onMilestoneSelect(milestoneId) {
    this.selectedMilestoneId = milestoneId;
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.selectedSubMilestoneId = null;
    this.isLoadingSubMilestones = true;
    this.subMilestones = (this.projectdata?.milestones ?? []).filter((m) => m.parent_id === milestoneId);
    this.isLoadingSubMilestones = false;
  }
  onSubMilestoneSelect(subMilestone) {
    this.selectedSubMilestoneId = subMilestone.id;
    if (subMilestone.amount) {
      this.paymentForm.amount = Number(subMilestone.amount);
    }
    this.milestoneTasks = (this.allTasks ?? []).filter((t) => t.milestone_id === subMilestone.id);
  }
  onSettlementTypeChange(type) {
    this.selectedSettlementType = type;
    this.selectedMilestoneId = null;
    this.selectedSubMilestoneId = null;
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.milestoneDropdownOpen = false;
    this.subMilestoneDropdownOpen = false;
    this.taskDropdownOpen = false;
    this.updateSettlementCompletionFromProject();
  }
  closeAllDropdowns() {
    this.milestoneDropdownOpen = false;
    this.subMilestoneDropdownOpen = false;
    this.taskDropdownOpen = false;
  }
  openVendorDetail(vendor) {
    this.router.navigate(["/master/resources/vendors", vendor.id]);
  }
  closeDetail() {
    this.laborService.clearWorkers();
    this.invoiceService.clearInvoices();
    this.auditService.clearAudits();
    this.projectdata = null;
    this.router.navigate(["/master/resources/vendors"]);
  }
  openVendorDetailData() {
    this.showVendorDetailModal = true;
  }
  getFileName(filePath) {
    return filePath.split("/").pop() ?? filePath;
  }
  openAddModal() {
    this.isEditMode = false;
    this.editingVendorId = null;
    this.newVendor = this.defaultVendor();
    if (this.projectId) {
      this.newVendor.project_ids = [Number(this.projectId)];
    }
    this.contractFiles = [];
    this.stepError = "";
    this.fileError = "";
    this.currentStep = 1;
    this.showAddModal = true;
  }
  editVendorDetail(vendor) {
    const v = vendor ?? this.selectedVendor;
    if (!v)
      return;
    if (this.skillOptions.length === 0) {
      this._pendingEditVendor = v;
      return;
    }
    this.isEditMode = true;
    this.editingVendorId = v.id;
    this.currentStep = 1;
    this.stepError = "";
    this.fileError = "";
    this.contractFiles = [];
    const rawSkills = Array.isArray(v.skill) ? [...v.skill] : v.skill ? String(v.skill).split(",").map((s) => s.trim()).filter(Boolean) : [];
    const normalizedSkills = rawSkills.map((raw) => {
      const match = this.skillOptions.find((opt) => opt.label.toLowerCase() === raw.toLowerCase() || opt.value.toLowerCase() === raw.toLowerCase() || opt.label.toLowerCase().replace(/\s+/g, "_") === raw.toLowerCase());
      return match ? match.label : raw;
    });
    this.newVendor = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      spoc: { name: v.spoc?.name ?? "", phone: v.spoc?.phone ?? "" },
      kyc: { gst: v.kyc?.gst ?? "", pan: v.kyc?.pan ?? "" },
      address: { street: v.address?.street ?? "", pincode: v.address?.pincode ?? "" },
      budget: String(v.budget_allocation ?? ""),
      skill: normalizedSkills,
      project_ids: Array.isArray(v.project_ids) ? [...v.project_ids] : v.project_id ? [Number(v.project_id)] : []
    };
    this.showVendorDetailModal = false;
    this.showAddModal = true;
  }
  nextStep() {
    this.stepError = "";
    if (this.currentStep === 1) {
      if (!this.newVendor.name?.trim()) {
        this.stepError = "Vendor Legal Name is required.";
        return;
      }
      if (!this.newVendor.spoc.name?.trim()) {
        this.stepError = "SPOC Name is required.";
        return;
      }
      if (!this.newVendor.spoc.phone?.trim() || this.newVendor.spoc.phone.length < 10) {
        this.stepError = "SPOC Phone must be 10 digits.";
        return;
      }
      if (!this.newVendor.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newVendor.email)) {
        this.stepError = "Enter a valid official email address.";
        return;
      }
      if (!this.newVendor.phone?.trim() || this.newVendor.phone.length < 10) {
        this.stepError = "Official phone must be 10 digits.";
        return;
      }
    }
    if (this.currentStep === 2) {
      const gst = this.newVendor.kyc.gst?.trim();
      const pan = this.newVendor.kyc.pan?.trim();
      if (!gst && !pan) {
        this.stepError = "At least one of GST No. or PAN Card No. is required.";
        return;
      }
      if (gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst)) {
        this.stepError = "Invalid GST format. Expected: 22AAAAA0000A1Z5";
        return;
      }
      if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
        this.stepError = "Invalid PAN format. Expected: ABCDE1234F";
        return;
      }
      if (!this.newVendor.address.street?.trim()) {
        this.stepError = "Physical address is required.";
        return;
      }
      if (!this.newVendor.address.pincode?.trim() || this.newVendor.address.pincode.length < 6) {
        this.stepError = "Enter a valid 6-digit pincode.";
        return;
      }
    }
    if (this.currentStep === 3) {
      if (!this.newVendor.budget?.toString().trim()) {
        this.stepError = "Budget allocation is required.";
        return;
      }
      if (!this.newVendor.project_ids || this.newVendor.project_ids.length === 0) {
        this.stepError = "At least one project is required.";
        return;
      }
      if (!this.newVendor.skill || this.newVendor.skill.length === 0) {
        this.stepError = "At least one skill is required.";
        return;
      }
    }
    if (this.currentStep < 4)
      this.currentStep++;
  }
  prevStep() {
    this.stepError = "";
    if (this.currentStep > 1)
      this.currentStep--;
  }
  addVendor() {
    if (this.isSaving)
      return;
    this.stepError = "";
    this.isEditMode ? this.updateVendorData() : this.createVendorData();
  }
  createVendorData() {
    const fd = new FormData();
    fd.append("vendorLegalName", this.newVendor.name);
    fd.append("spocName", this.newVendor.spoc.name);
    fd.append("spocPhone", this.newVendor.spoc.phone);
    fd.append("officialEmail", this.newVendor.email);
    fd.append("officialPhone", this.newVendor.phone);
    fd.append("gstNo", this.newVendor.kyc.gst ?? "");
    fd.append("panCardNo", this.newVendor.kyc.pan ?? "");
    fd.append("physicalAddress", this.newVendor.address.street);
    fd.append("pincode", this.newVendor.address.pincode);
    fd.append("budgetAllocation", this.newVendor.budget);
    fd.append("skill", Array.isArray(this.newVendor.skill) ? this.newVendor.skill.join(", ") : this.newVendor.skill);
    const resolvedProjectIds = this.newVendor.project_ids?.length ? this.newVendor.project_ids : this.projectId ? [Number(this.projectId)] : [];
    if (resolvedProjectIds.length > 0) {
      fd.append("project_ids", JSON.stringify(resolvedProjectIds));
    }
    this.contractFiles.forEach((file) => fd.append("contractFiles", file));
    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.currentStep = 1;
        this.contractFiles = [];
      },
      error: (err) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? "Vendor onboard failed. Please try again.";
      }
    });
  }
  updateVendorData() {
    if (!this.editingVendorId)
      return;
    const fd = new FormData();
    fd.append("name", this.newVendor.name);
    fd.append("spoc_name", this.newVendor.spoc.name);
    fd.append("spoc_phone", this.newVendor.spoc.phone);
    fd.append("official_email", this.newVendor.email);
    fd.append("official_phone", this.newVendor.phone);
    fd.append("gst_no", this.newVendor.kyc.gst?.toUpperCase() || "");
    fd.append("pan_card_no", this.newVendor.kyc.pan?.toUpperCase() || "");
    fd.append("physical_address", this.newVendor.address.street);
    fd.append("pincode", this.newVendor.address.pincode);
    fd.append("budget_allocation", String(parseFloat(String(this.newVendor.budget).replace(/[^0-9.]/g, "")) || 0));
    fd.append("skill", Array.isArray(this.newVendor.skill) ? this.newVendor.skill.join(", ") : this.newVendor.skill);
    const resolvedProjectIds = this.newVendor.project_ids?.length ? this.newVendor.project_ids : this.projectId ? [Number(this.projectId)] : [];
    if (resolvedProjectIds.length > 0) {
      fd.append("project_ids", JSON.stringify(resolvedProjectIds));
    }
    this.contractFiles.forEach((file) => fd.append("contractFiles", file));
    this.isSaving = true;
    this.vendorService.updateVendor(this.editingVendorId, fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.isEditMode = false;
        this.editingVendorId = null;
        this.currentStep = 1;
        this.contractFiles = [];
        if (this.selectedVendor) {
          const updated = this.vendorService.getVendorById(this.selectedVendor.id);
          if (updated)
            this.selectedVendor = updated;
        }
      },
      error: (err) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? "Update failed. Please try again.";
      }
    });
  }
  updateVendorStatus(status) {
    if (!this.selectedVendor)
      return;
    const statusKey = status.toLowerCase();
    this.vendorService.updateVendor(this.selectedVendor.id, { status: statusKey }).subscribe({
      next: () => {
        const updated = this.vendorService.getVendorById(this.selectedVendor.id);
        if (updated)
          this.selectedVendor = updated;
      },
      error: (err) => alert("Status update failed: " + (err?.error?.message ?? "Server error"))
    });
  }
  deleteVendor(id) {
    if (this.isDeleting)
      return;
    if (!confirm("Are you sure you want to remove this vendor?"))
      return;
    this.isDeleting = true;
    this.vendorService.deleteVendor(id).subscribe({
      next: () => {
        this.isDeleting = false;
      },
      error: (err) => {
        this.isDeleting = false;
        alert("Delete failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  toggleProject(id) {
    if (!Array.isArray(this.newVendor.project_ids))
      this.newVendor.project_ids = [];
    const idx = this.newVendor.project_ids.indexOf(id);
    if (idx === -1)
      this.newVendor.project_ids.push(id);
    else
      this.newVendor.project_ids.splice(idx, 1);
  }
  isProjectSelected(id) {
    if (!Array.isArray(this.newVendor.project_ids))
      return false;
    return this.newVendor.project_ids.includes(id);
  }
  getProjectName(id) {
    return this.projects.find((p) => p.id === id)?.name ?? "";
  }
  toggleSkill(skillLabel) {
    if (!Array.isArray(this.newVendor.skill))
      this.newVendor.skill = [];
    const idx = this.newVendor.skill.findIndex((s) => s.toLowerCase() === skillLabel.toLowerCase());
    if (idx === -1)
      this.newVendor.skill.push(skillLabel);
    else
      this.newVendor.skill.splice(idx, 1);
  }
  isSkillSelected(skillLabel) {
    if (!Array.isArray(this.newVendor.skill))
      return false;
    return this.newVendor.skill.some((s) => s.toLowerCase() === skillLabel.toLowerCase());
  }
  getSkillLabel(value) {
    return this.skillOptions.find((s) => s.value === value)?.label || "";
  }
  onContractFilesSelected(event) {
    const input = event.target;
    if (!input.files)
      return;
    this.fileError = "";
    const MAX_SIZE = 10 * 1024 * 1024;
    const ALLOWED = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png"
    ];
    const incoming = Array.from(input.files);
    const combined = [...this.contractFiles, ...incoming];
    if (combined.length > 10) {
      this.fileError = "Maximum 10 files allowed.";
      return;
    }
    for (const f of incoming) {
      if (!ALLOWED.includes(f.type)) {
        this.fileError = `"${f.name}" has an unsupported format.`;
        return;
      }
      if (f.size > MAX_SIZE) {
        this.fileError = `"${f.name}" exceeds the 10 MB limit (${this.getFileSize(f.size)}).`;
        return;
      }
    }
    this.contractFiles = combined;
    input.value = "";
  }
  removeContractFile(index) {
    this.contractFiles = this.contractFiles.filter((_, i) => i !== index);
    this.fileError = "";
  }
  getFileSize(bytes) {
    if (bytes < 1024)
      return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  getFileIcon(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf")
      return "picture_as_pdf";
    if (ext === "doc" || ext === "docx")
      return "description";
    if (["jpg", "jpeg", "png"].includes(ext))
      return "image";
    return "attach_file";
  }
  getFileIconBg(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf")
      return "bg-red-100 dark:bg-red-900/30";
    if (ext === "doc" || ext === "docx")
      return "bg-blue-100 dark:bg-blue-900/30";
    if (["jpg", "jpeg", "png"].includes(ext))
      return "bg-green-100 dark:bg-green-900/30";
    return "bg-surface-container";
  }
  getFileIconColor(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf")
      return "text-red-600";
    if (ext === "doc" || ext === "docx")
      return "text-blue-600";
    if (["jpg", "jpeg", "png"].includes(ext))
      return "text-green-600";
    return "text-outline";
  }
  openSubmission() {
    if (!this.selectedVendor)
      return;
    this.modalProjectData = null;
    let started = false;
    const sub = this.invoiceService.loading$.subscribe((loading) => {
      if (started && !loading) {
        this.invoiceForm = this.defaultInvoice();
        this.invoiceForm.project_id = Number(this.selectedVendor?.project_id) || null;
        if (this.selectedVendor?.project_id) {
          this.getProject(this.selectedVendor.project_id);
        }
        this.showInvoiceModal = true;
        sub.unsubscribe();
      }
    });
    started = true;
    this.invoiceService.loadInvoices(this.selectedVendor.id);
  }
  onTypeChange(item) {
    if (item.type !== "labor")
      item.hours = 0;
    this.calculateInvoiceTotals();
  }
  getTypeLabel(value) {
    return this.typeOptions.find((o) => o.value === value)?.label || "Select";
  }
  toggleDropdown(item, field) {
    const isOpen = field === "type" ? item.typeOpen : item.gstOpen;
    this.closeAllItemDropdowns();
    if (field === "type")
      item.typeOpen = !isOpen;
    else
      item.gstOpen = !isOpen;
  }
  closeAllItemDropdowns() {
    (this.invoiceForm?.items || []).forEach((i) => {
      i.typeOpen = false;
      i.gstOpen = false;
    });
  }
  selectType(item, value) {
    item.type = value;
    item.typeOpen = false;
    this.onTypeChange(item);
  }
  selectGst(item, value) {
    item.gst = value;
    item.gstOpen = false;
    this.calculateInvoiceTotals();
  }
  hasLaborItems() {
    return this.invoiceForm.items.some((item) => item.type === "labor");
  }
  addInvoiceItem() {
    this.invoiceForm.items.push({
      type: "",
      description: "",
      quantity: 1,
      hours: 0,
      unitPrice: 0,
      gst: 18,
      gstAmount: 0,
      baseAmount: 0,
      total: 0
    });
  }
  removeInvoiceItem(index) {
    if (this.invoiceForm.items.length > 1) {
      this.invoiceForm.items.splice(index, 1);
      this.calculateInvoiceTotals();
    }
  }
  calculateInvoiceTotals() {
    let subtotal = 0;
    let totalGST = 0;
    const gstMap = {};
    this.invoiceForm.items.forEach((item) => {
      const qty = Number(item.quantity) || 0;
      const rate = Number(item.unitPrice) || 0;
      const hours = Number(item.hours) || 0;
      const gst = Number(item.gst) || 0;
      item.baseAmount = item.type === "labor" ? qty * hours * rate : qty * rate;
      item.gstAmount = item.baseAmount * gst / 100;
      item.total = item.baseAmount + item.gstAmount;
      subtotal += item.baseAmount;
      totalGST += item.gstAmount;
      if (item.gstAmount > 0) {
        gstMap[gst] = (gstMap[gst] || 0) + item.gstAmount;
      }
    });
    this.invoiceForm.subtotal = subtotal;
    this.invoiceForm.taxAmount = totalGST;
    this.invoiceForm.grandTotal = subtotal + totalGST;
    this.invoiceForm.gstBreakdown = Object.entries(gstMap).map(([rateStr, amount]) => ({ rate: Number(rateStr), amount })).sort((a, b) => a.rate - b.rate);
  }
  submitInvoice() {
    if (this.isSavingInvoice || !this.selectedVendor)
      return;
    this.isSavingInvoice = true;
    const payload = {
      project_id: this.selectedVendor?.project_id,
      invoice_number: this.invoiceForm.number,
      invoice_date: this.invoiceForm.date,
      items: this.invoiceForm.items,
      subtotal: this.invoiceForm.subtotal,
      tax_rate: this.invoiceForm.taxRate ?? 0,
      tax_amount: this.invoiceForm.taxAmount,
      grand_total: this.invoiceForm.grandTotal
    };
    this.invoiceService.createInvoice(this.selectedVendor.id, payload).subscribe({
      next: () => {
        this.isSavingInvoice = false;
        this.showInvoiceModal = false;
        this.vendorService.loadStats();
      },
      error: (err) => {
        this.isSavingInvoice = false;
        alert("Invoice submission failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  openBilling() {
    if (this.selectedVendor && this.invoices.length === 0) {
      this.invoiceService.loadInvoices(this.selectedVendor.id);
    }
    this.showBillingModal = true;
  }
  payInvoice(inv) {
    if (inv.status === "Cancelled") {
      alert("This invoice has been cancelled and can no longer accept payments.");
      return;
    }
    this.selectedInvoice = inv;
    const selectedProjectId = inv.project_id ? Number(inv.project_id) : null;
    this.paymentForm = {
      amount: null,
      project_id: selectedProjectId,
      mode: "",
      reference: "",
      clearance_date: ""
    };
    this.selectedSettlementType = "work_poc";
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    this.settlementCompletion = null;
    this.milestones = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.showSettlementCards = false;
    this.modalProjectData = null;
    this.showBudgetExceedConfirm = false;
    this.budgetExceedDetails = null;
    this.paymentError = "";
    this.isProcessingPayment = false;
    this.payInvoiceeModal = true;
    if (selectedProjectId) {
      this.getProject(selectedProjectId);
    }
  }
  closePayModal() {
    this.payInvoiceeModal = false;
    this.selectedInvoice = null;
    this.paymentForm = { amount: null, project_id: null, mode: "", reference: "", clearance_date: "" };
    this.paymentError = "";
    this.isProcessingPayment = false;
    this.showSettlementCards = false;
    this.selectedSettlementType = "work_poc";
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    this.settlementCompletion = null;
    this.milestones = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.modalProjectData = null;
    this.milestoneDropdownOpen = false;
    this.subMilestoneDropdownOpen = false;
    this.taskDropdownOpen = false;
    this.showBudgetExceedConfirm = false;
    this.budgetExceedDetails = null;
  }
  onPaymentModeChange(mode) {
    this.paymentForm.mode = mode;
    this.showPaymentModeDropdown = false;
    if (mode === "Cash") {
      this.paymentForm.reference = "";
      this.paymentForm.clearance_date = "";
    }
    if (mode !== "Cheque") {
      this.paymentForm.clearance_date = "";
    }
  }
  confirmPayment() {
    if (!this.selectedInvoice || this.isProcessingPayment)
      return;
    this.paymentError = "";
    if (!this.paymentForm.amount || this.paymentForm.amount <= 0) {
      this.paymentError = "Please enter a valid amount.";
      return;
    }
    if (!this.paymentForm.mode) {
      this.paymentError = "Please select a payment mode.";
      return;
    }
    if (this.paymentForm.mode === "Cheque") {
      if (!this.paymentForm.clearance_date) {
        this.paymentError = "Please select cheque clearance date.";
        return;
      }
      const selectedDate = new Date(this.paymentForm.clearance_date);
      const today = /* @__PURE__ */ new Date();
      const threeMonthsAgo = /* @__PURE__ */ new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      threeMonthsAgo.setHours(0, 0, 0, 0);
      if (selectedDate < threeMonthsAgo) {
        this.paymentError = "Cheque clearance date cannot be more than 3 months in the past.";
        return;
      }
      if (selectedDate > today) {
        this.paymentError = "Cheque clearance date cannot be in the future.";
        return;
      }
    }
    const paidNow = Number(this.paymentForm.amount) || 0;
    const allocated = this.budgetUsage.allocated;
    const projectedTotal = this.budgetUsage.invoiced + paidNow;
    if (allocated > 0 && projectedTotal > allocated && !this.showBudgetExceedConfirm) {
      this.budgetExceedDetails = {
        allocated,
        invoiced: this.budgetUsage.invoiced,
        thisAmount: paidNow,
        exceededBy: projectedTotal - allocated
      };
      this.showBudgetExceedConfirm = true;
      return;
    }
    this.proceedPayment();
  }
  proceedPayment() {
    if (!this.selectedInvoice)
      return;
    this.isProcessingPayment = true;
    const paidNow = Number(this.paymentForm.amount);
    const alreadyPaid = Number(this.selectedInvoice.paid_amount) || 0;
    const grandTotal = Number(this.selectedInvoice.grand_total);
    const totalAfterThis = alreadyPaid + paidNow;
    const resolvedStatus = totalAfterThis >= grandTotal ? "Paid" : "Partially Paid";
    const referenceValue = String(this.paymentForm.reference ?? "").trim();
    const payload = {
      status: resolvedStatus,
      amount: paidNow,
      mode: this.paymentForm.mode,
      reference: referenceValue !== "" ? referenceValue : null,
      clearance_date: this.paymentForm.clearance_date || null,
      budget_exceeded: false
    };
    if (this.showSettlementCards && this.paymentForm.project_id) {
      payload.settlement_type = this.selectedSettlementType;
      payload.settlement_completion = this.settlementCompletion;
      payload.milestone_ids = [...this.selectedMilestoneIds];
      payload.sub_milestone_ids = [...this.selectedSubMilestoneIds];
      payload.task_ids = [...this.selectedTaskIds];
    }
    this.invoiceService.updateStatus(this.selectedInvoice.id, payload).subscribe({
      next: () => {
        this.isProcessingPayment = false;
        this.closePayModal();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err) => {
        this.isProcessingPayment = false;
        this.paymentError = err?.error?.message ?? "Payment failed. Please try again.";
      }
    });
  }
  raisePaymentRequest() {
    if (!this.selectedInvoice || this.isProcessingPayment)
      return;
    if (!this.paymentForm.amount || this.paymentForm.amount <= 0) {
      this.paymentError = "Please enter a valid amount.";
      return;
    }
    if (!this.paymentForm.mode) {
      this.paymentError = "Please select a payment mode.";
      return;
    }
    this.isProcessingPayment = true;
    this.paymentError = "";
    const payload = {
      amount: Number(this.paymentForm.amount),
      mode: this.paymentForm.mode,
      reference: String(this.paymentForm.reference ?? "").trim() || null,
      clearance_date: this.paymentForm.clearance_date || null,
      budget_allocated: this.budgetExceedDetails?.allocated,
      budget_invoiced: this.budgetExceedDetails?.invoiced,
      exceeded_by: this.budgetExceedDetails?.exceededBy
    };
    if (this.showSettlementCards && this.paymentForm.project_id) {
      payload.settlement_type = this.selectedSettlementType;
      payload.settlement_completion = this.settlementCompletion;
      payload.milestone_ids = [...this.selectedMilestoneIds];
      payload.sub_milestone_ids = [...this.selectedSubMilestoneIds];
      payload.task_ids = [...this.selectedTaskIds];
    }
    const vendorId = this.selectedVendor.id;
    const invoiceId = this.selectedInvoice.id;
    this.invoiceService.raisePaymentRequest(vendorId, invoiceId, payload).subscribe({
      next: () => {
        this.isProcessingPayment = false;
        this.closePayModal();
        this.invoiceService.loadInvoices(vendorId);
        this.toastr.success(`Payment request of \u20B9${Number(payload.amount).toLocaleString("en-IN")} via ${payload.mode} has been raised. Invoice will remain pending until approved by Finance team.`, "Payment Request Raised");
      },
      error: (err) => {
        this.isProcessingPayment = false;
        this.paymentError = err?.error?.message ?? "Payment request failed. Please try again.";
      }
    });
  }
  cancelBudgetExceedConfirm() {
    this.showBudgetExceedConfirm = false;
    this.budgetExceedDetails = null;
  }
  openCancelInvoiceDialog(inv) {
    this.selectedInvoice = inv;
    this.showCancelInvoiceModal = true;
  }
  closeCancelInvoiceDialog() {
    this.showCancelInvoiceModal = false;
    this.selectedInvoice = null;
  }
  confirmCancelInvoice() {
    if (!this.selectedInvoice || this.isCancellingInvoice)
      return;
    if (this.selectedInvoice.status === "Partially Paid") {
      alert("This invoice has partial payments recorded and cannot be cancelled.");
      this.closeCancelInvoiceDialog();
      return;
    }
    this.isCancellingInvoice = true;
    this.invoiceService.updateStatus(this.selectedInvoice.id, { status: "Cancelled" }).subscribe({
      next: () => {
        this.isCancellingInvoice = false;
        this.closeCancelInvoiceDialog();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err) => {
        this.isCancellingInvoice = false;
        alert("Cancel failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  viewInvoice(inv) {
    const vendor = this.selectedVendor;
    let invoiceItems = [];
    try {
      invoiceItems = Array.isArray(inv.items) ? inv.items : JSON.parse(inv.items);
    } catch {
      invoiceItems = [];
    }
    const gstMap = {};
    invoiceItems.forEach((item) => {
      const gstRate = Number(item.gst) || 0;
      const gstAmt = Number(item.gstAmount) || 0;
      if (gstAmt > 0)
        gstMap[gstRate] = (gstMap[gstRate] || 0) + gstAmt;
    });
    const taxBreakdownRows = Object.entries(gstMap).sort(([a], [b]) => Number(a) - Number(b)).map(([rate, amount]) => `<div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
          <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
          <span style="font-weight:600;">\u20B9${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
        </div>`).join("");
    const hasLabor = invoiceItems.some((item) => item.type === "labor");
    const itemRows = invoiceItems.map((item) => {
      const isLabor = item.type === "labor";
      const typeLabel = item.type ? String(item.type).charAt(0).toUpperCase() + String(item.type).slice(1) : "\u2014";
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${typeLabel}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.description || "\u2014"}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 0}</td>
        ${hasLabor ? `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${isLabor ? (item.hours || 0) + "h" : ""}</td>` : ""}
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">\u20B9${Number(item.unitPrice || 0).toLocaleString("en-IN")}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.gst || 0}%</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">\u20B9${Number(item.gstAmount || 0).toLocaleString("en-IN")}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">\u20B9${Number(item.total || 0).toLocaleString("en-IN")}</td>
      </tr>`;
    }).join("");
    const paymentHistory = Array.isArray(inv.payment_history) ? inv.payment_history : [];
    const paymentHistoryRows = paymentHistory.length > 0 ? `
      <div style="margin-top:32px;">
        <h3 style="font-size:15px;font-weight:900;margin-bottom:12px;color:#1e293b;">Payment History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f1f5f9;">
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">#</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Date</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Mode</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Reference</th>
              <th style="padding:8px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${paymentHistory.map((p, i) => `
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${i + 1}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${new Date(p.paid_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.mode || "\u2014"}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.reference || "\u2014"}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;text-align:right;">\u20B9${Number(p.amount).toLocaleString("en-IN")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>` : "";
    const projectName = this.projectdata?.name || this.modalProjectData?.name || null;
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Invoice ${inv.invoice_number}</title>
  <style>
    body { font-family: sans-serif; padding: 40px; color: #1e293b; }
    h1 { font-size: 24px; font-weight: 900; margin: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
    @media print { button { display: none !important; } }
  </style>
</head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <div>
      <h1>Tax Invoice</h1>
      <p style="color:#64748b;margin:4px 0 0;">${vendor?.name ?? ""}</p>
    </div>
    <div style="text-align:right;">
      <p style="font-weight:900;font-size:18px;margin:0;">${inv.invoice_number}</p>
      <p style="color:#64748b;margin:4px 0 0;">${this.formatDate(inv.invoice_date)}</p>
      <span style="display:inline-block;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;
        background:${inv.status === "Paid" ? "#dcfce7" : inv.status === "Cancelled" ? "#fee2e2" : inv.status === "Partially Paid" ? "#dbeafe" : "#fef3c7"};
        color:${inv.status === "Paid" ? "#15803d" : inv.status === "Cancelled" ? "#dc2626" : inv.status === "Partially Paid" ? "#1d4ed8" : "#b45309"};margin-top:6px;">
        ${inv.status}
      </span>
    </div>
  </div>
  ${vendor ? `
  <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
    <p style="margin:0;font-weight:700;">Bill To: ${vendor.name}</p>
    <p style="margin:4px 0 0;color:#64748b;">${vendor.address?.street || ""} ${vendor.address?.pincode || ""}</p>
    <p style="margin:4px 0 0;color:#64748b;">GST: ${vendor.kyc?.gst || "\u2014"} | PAN: ${vendor.kyc?.pan || "\u2014"}</p>
    ${projectName ? `<p style="margin:6px 0 0;"><span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Project:</span> <span style="font-weight:700;color:#1e293b;">${projectName}</span></p>` : ""}
  </div>` : ""}
  <table>
    <thead>
      <tr>
        <th>Type</th><th>Description</th>
        <th style="text-align:center;">Qty</th>
        ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ""}
        <th style="text-align:right;">Rate (\u20B9)</th>
        <th style="text-align:center;">Tax %</th>
        <th style="text-align:right;">Tax (\u20B9)</th>
        <th style="text-align:right;">Total (\u20B9)</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>
  <div style="margin-top:24px;max-width:340px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Subtotal (excl. Tax)</span>
      <span style="font-weight:700;">\u20B9${Number(inv.subtotal).toLocaleString("en-IN")}</span>
    </div>
    ${taxBreakdownRows}
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Total Tax</span>
      <span style="font-weight:700;">\u20B9${Number(inv.tax_amount).toLocaleString("en-IN")}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:12px 0;">
      <span style="font-weight:900;">Grand Total</span>
      <span style="color:#4f46e5;font-size:18px;font-weight:900;">\u20B9${Number(inv.grand_total).toLocaleString("en-IN")}</span>
    </div>
    ${Number(inv.paid_amount) > 0 ? `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:2px solid #e5e7eb;">
      <span style="color:#16a34a;font-weight:700;">Paid Amount</span>
      <span style="color:#16a34a;font-weight:900;">\u20B9${Number(inv.paid_amount).toLocaleString("en-IN")}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;">
      <span style="color:#dc2626;font-weight:700;">Remaining</span>
      <span style="color:#dc2626;font-weight:900;">\u20B9${Math.max(0, Number(inv.grand_total) - Number(inv.paid_amount)).toLocaleString("en-IN")}</span>
    </div>` : ""}
  </div>
  ${paymentHistoryRows}
  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()"
      style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body>
</html>`;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  }
  openAudit() {
    const latest = this.vendorAudits[0];
    this.auditForm = latest ? {
      quality: Number(latest.quality),
      timeliness: Number(latest.timeliness),
      safety: Number(latest.safety),
      observations: latest.observations ?? ""
    } : { quality: 5, timeliness: 5, safety: 5, observations: "" };
    this.showAuditModal = true;
  }
  submitAudit() {
    if (this.isSavingAudit || !this.selectedVendor)
      return;
    this.isSavingAudit = true;
    this.auditService.createAudit(this.selectedVendor.id, {
      quality: this.auditForm.quality,
      timeliness: this.auditForm.timeliness,
      safety: this.auditForm.safety,
      observations: this.auditForm.observations
    }).subscribe({
      next: (res) => {
        this.isSavingAudit = false;
        this.showAuditModal = false;
        if (this.selectedVendor && res.data?.composite_score != null) {
          this.selectedVendor.compliance_score = Math.round(res.data.composite_score);
        }
        this.vendorService.loadVendors();
      },
      error: (err) => {
        this.isSavingAudit = false;
        alert("Audit failed: " + (err?.error?.message ?? "Server error"));
      }
    });
  }
  openLaborModal() {
    if (!this.selectedVendor)
      return;
    this.newLabor = this.defaultLabor();
    this.showAddLaborForm = false;
    this.laborError = "";
    this.editingLaborId = null;
    this.laborService.loadLaborForVendor(this.selectedVendor.id);
    this.showLaborModal = true;
  }
  closeLaborModal() {
    this.showLaborModal = false;
    this.showAddLaborForm = false;
    this.editingLaborId = null;
  }
  toggleAddLaborForm() {
    this.newLabor = this.defaultLabor();
    this.laborError = "";
    this.editingLaborId = null;
    this.showAddLaborForm = !this.showAddLaborForm;
  }
  submitLabor() {
    if (this.isSavingLabor || !this.selectedVendor)
      return;
    this.laborError = "";
    if (!this.newLabor.skill) {
      this.laborError = "Skill is required.";
      return;
    }
    const laborCount = Math.max(1, parseInt(this.newLabor.labor_count) || 1);
    const payload = {
      vendor_id: this.selectedVendor.id,
      skill: this.newLabor.skill,
      status: this.newLabor.status || "active",
      daily_rate: parseFloat(this.newLabor.daily_rate) || 0,
      labor_count: laborCount,
      assign_worker: this.newLabor.assign_worker || null
    };
    this.isSavingLabor = true;
    this.laborService.addWorker(payload).subscribe({
      next: () => {
        this.isSavingLabor = false;
        this.showAddLaborForm = false;
        this.newLabor = this.defaultLabor();
      },
      error: (err) => {
        this.isSavingLabor = false;
        this.laborError = err?.error?.message ?? "Failed to add worker.";
      }
    });
  }
  editLaborWorker(id) {
    this.showSkillDropdown = this.showStatusDropdown = this.showAssignDropdown = false;
    const worker = this.laborWorkers.find((w) => w.id === id);
    if (!worker)
      return;
    this.editingLaborId = id;
    this.editLaborForm = {
      skill: worker.skillRaw,
      status: worker.status,
      daily_rate: worker.daily_rate,
      labor_count: worker.labor_count,
      assign_worker: worker.assign_worker ?? ""
    };
  }
  saveLaborEdit(id) {
    const payload = {
      skill: this.editLaborForm.skill,
      status: this.editLaborForm.status,
      daily_rate: parseFloat(this.editLaborForm.daily_rate) || 0,
      labor_count: Math.max(1, parseInt(this.editLaborForm.labor_count) || 1),
      assign_worker: this.editLaborForm.assign_worker ?? null
    };
    this.laborService.updateWorker(id, payload).subscribe({
      next: () => {
        this.editingLaborId = null;
      },
      error: (err) => alert("Update failed: " + (err?.error?.message ?? "Server error"))
    });
  }
  cancelLaborEdit() {
    this.editingLaborId = null;
  }
  deleteLaborWorker(id) {
    if (!confirm("Remove this worker?"))
      return;
    this.laborService.deleteWorker(id).subscribe({
      error: (err) => alert("Delete failed: " + (err?.error?.message ?? "Server error"))
    });
  }
  updateLaborStatus(worker, status) {
    this.laborService.updateWorker(worker.id, { status }).subscribe();
  }
  updateTaskStatus(task, statusRaw) {
    this.projectService.updateTask(task.id, { status: statusRaw }).subscribe();
  }
  getSkillBarWidth(count) {
    const max = Math.max(...this.laborStats.skillComposition.map((s) => s.count), 1);
    return Math.round(count / max * 100);
  }
  getSkillBarColor(skill) {
    const colors = {
      "Masonry": "bg-blue-500",
      "Electrical": "bg-yellow-500",
      "Structural Steel": "bg-red-500",
      "Plumbing": "bg-green-500",
      "HVAC": "bg-purple-500",
      "Carpentry": "bg-orange-400",
      "Painting": "bg-pink-400",
      "Other": "bg-slate-400"
    };
    return colors[skill] ?? "bg-slate-400";
  }
  getTaskStatusColor(status) {
    const normalizedStatus = String(status ?? "").toLowerCase().replace(/\s+/g, "_");
    const map = {
      "completed": "bg-green-100 text-green-700",
      "in_progress": "bg-blue-100 text-blue-700",
      "review": "bg-purple-100 text-purple-700",
      "to_do": "bg-amber-100 text-amber-700",
      "pending": "bg-amber-100 text-amber-700",
      "on_hold": "bg-slate-100 text-slate-500"
    };
    return map[normalizedStatus] ?? "bg-slate-100 text-slate-500";
  }
  sanitizePhone(event, field) {
    const input = event.target;
    const cleaned = input.value.replace(/\D/g, "").slice(0, 10);
    input.value = cleaned;
    if (field === "spoc")
      this.newVendor.spoc.phone = cleaned;
    else
      this.newVendor.phone = cleaned;
  }
  onDocumentClick() {
    this.showSkillDropdown = false;
    this.showStatusDropdown = false;
    this.showAssignDropdown = false;
    this.showProjectDropdown = false;
    this.closeAllItemDropdowns();
  }
  defaultVendor() {
    return {
      name: "",
      email: "",
      phone: "",
      spoc: { name: "", phone: "" },
      kyc: { gst: "", pan: "" },
      address: { street: "", pincode: "" },
      budget: "",
      skill: [],
      project_ids: []
    };
  }
  getInvoicePrefix() {
    const rawName = String(this.selectedVendor?.name ?? "");
    const letters = rawName.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase();
    const prefix = letters.padEnd(3, "X");
    return prefix === "XXX" ? "VND" : prefix;
  }
  generateInvoiceNumber() {
    const prefix = this.getInvoicePrefix();
    const existing = this.invoices || [];
    const regex = new RegExp("^(?:INV-)?" + prefix + "-(\\d{5})$", "i");
    const maxNum = existing.reduce((max, inv) => {
      const match = String(inv.invoice_number || "").match(regex);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    const nextNum = String(maxNum + 1).padStart(5, "0");
    return `INV-${prefix}-${nextNum}`;
  }
  onInvoiceDateChange(value) {
    if (!value)
      return;
    const date = new Date(value);
    this.invoiceForm.date = this.formatDate(date);
    this.invoiceForm.rawDate = value;
  }
  defaultInvoice() {
    const today = /* @__PURE__ */ new Date();
    return {
      project_id: this.selectedVendor?.project_id ? Number(this.selectedVendor.project_id) : null,
      number: this.generateInvoiceNumber(),
      date: this.formatDate(today),
      rawDate: today.toISOString().split("T")[0],
      items: [{
        type: "",
        description: "",
        quantity: 1,
        hours: 0,
        unitPrice: 0,
        gst: 18,
        baseAmount: 0,
        gstAmount: 0,
        total: 0
      }],
      subtotal: 0,
      taxAmount: 0,
      taxRate: 0,
      grandTotal: 0,
      gstBreakdown: []
    };
  }
  formatDate(dateInput) {
    if (!dateInput)
      return "\u2014";
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime()))
      return String(dateInput || "\u2014");
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = d.toLocaleString("en-US", { month: "short" });
    const yyyy = d.getFullYear();
    return `${dd}/${mmm}/${yyyy}`;
  }
  defaultLabor() {
    return { skill: "", status: "active", daily_rate: "", labor_count: 1, assign_worker: "" };
  }
  static \u0275fac = function Vendors_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Vendors)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Vendors, selectors: [["app-vendors"]], hostBindings: function Vendors_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function Vendors_click_HostBindingHandler() {
        return ctx.onDocumentClick();
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { projectId: "projectId" }, standalone: false, decls: 322, vars: 109, consts: [[1, "px-4", "pt-2", "pb-6", "flex", "flex-col", "gap-4", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "space-y-8", "animate-in", "slide-in-from-right", "duration-500"], ["maxWidth", "max-w-3xl", "backdropClass", "bg-slate-950/60", "panelClass", "bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-800", "title", "Vendor Invoice Payment", "subtitle", "Review invoice details and record payment", "cancelLabel", "Cancel", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "primaryLabel", "primaryDisabled"], [1, "space-y-5", "px-1", "py-1", 3, "click"], [1, "rounded-2xl", "border", "border-slate-200", "bg-gradient-to-br", "from-slate-50", "via-white", "to-emerald-50/50", "p-5", "shadow-sm", "dark:border-slate-800", "dark:from-slate-900", "dark:via-slate-950", "dark:to-slate-900"], [1, "flex", "flex-col", "gap-5", "sm:flex-row", "sm:items-start", "sm:justify-between"], [1, "flex", "items-start", "gap-3"], [1, "flex", "h-11", "w-11", "shrink-0", "items-center", "justify-center", "rounded-2xl", "bg-emerald-100", "text-emerald-700", "dark:bg-emerald-500/15", "dark:text-emerald-300"], [1, "material-symbols-outlined", "text-[22px]"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "mt-1", "text-lg", "font-black", "leading-tight", "text-slate-900", "dark:text-white"], [1, "mt-1", "text-xs", "font-semibold", "text-slate-500"], [1, "rounded-2xl", "bg-white", "px-5", "py-4", "text-left", "shadow-sm", "ring-1", "ring-slate-200", "sm:min-w-[210px]", "sm:text-right", "dark:bg-slate-900", "dark:ring-slate-800"], [1, "mt-1", "text-2xl", "font-black", "text-emerald-600", "dark:text-emerald-400"], [1, "mt-5", "grid", "grid-cols-1", "gap-3", "sm:grid-cols-2"], [1, "rounded-xl", "border", "border-slate-100", "bg-white/80", "px-4", "py-3", "dark:border-slate-800", "dark:bg-slate-900/70"], [1, "mt-1", "text-sm", "font-black", "text-slate-800", "dark:text-slate-100"], [1, "rounded-xl", "border", "border-amber-100", "bg-amber-50/70", "px-4", "py-3", "dark:border-amber-500/20", "dark:bg-amber-500/10"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-amber-600/70"], [1, "mt-1", "text-sm", "font-black", "text-amber-700", "dark:text-amber-300"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm", "dark:border-slate-800", "dark:bg-slate-900"], [1, "mb-4", "flex", "flex-col", "gap-2", "sm:flex-row", "sm:items-center", "sm:justify-between"], [1, "flex", "items-center", "text-sm"], [1, "font-black", "text-slate-500", "uppercase", "mr-2"], [1, "font-black", "text-slate-800", "dark:text-slate-100"], [1, "w-fit", "rounded-full", "bg-blue-50", "px-3", "py-1", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-blue-700", "dark:bg-blue-500/10", "dark:text-blue-300"], [1, "rounded-2xl", "border", "border-slate-200", "bg-slate-50/80", "p-5", "shadow-sm", "dark:border-slate-800", "dark:bg-slate-900/70"], [1, "mb-4", "flex", "items-center", "gap-3"], [1, "flex", "h-9", "w-9", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-emerald-100", "text-emerald-700", "dark:bg-emerald-500/15", "dark:text-emerald-300"], [1, "material-symbols-outlined", "text-[19px]"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "font-semibold", "text-slate-500"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [1, "block", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-1.5"], [1, "text-red-500"], [1, "relative"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-sm", "font-black", "text-slate-400"], ["type", "number", "min", "0", "placeholder", "Enter Amount", 1, "w-full", "pl-8", "pr-3", "py-3", "border", "border-slate-200", "rounded-xl", "bg-white", "text-sm", "font-black", "text-slate-800", "outline-none", "transition", "focus:border-emerald-400", "focus:ring-4", "focus:ring-emerald-500/10", "dark:border-slate-700", "dark:bg-slate-950", "dark:text-slate-100", 3, "ngModelChange", "ngModel", "max"], [1, "mt-1", "text-[10px]", "font-semibold", "text-red-600"], [1, "text-[10px]", "text-emerald-600", "mt-1", "font-bold", "flex", "items-center", "justify-between"], [1, "text-[10px]", "text-amber-600", "mt-1", "font-semibold"], [1, "block", "text-xs", "font-bold", "text-slate-600", "dark:text-slate-400", "mb-1.5"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "px-4", "py-3", "text-sm", "bg-white", "dark:bg-slate-800", "text-slate-800", "dark:text-white", "hover:border-emerald-400", "focus:ring-2", "focus:ring-emerald-400", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]", "text-slate-400"], ["class", "absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden", 4, "ngIf"], [1, "mt-4", "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], [3, "col-span-1", "sm:col-start-2"], [1, "mt-4", "flex", "items-start", "gap-2", "bg-red-50", "border", "border-red-200", "px-4", "py-3", "rounded-xl", "dark:bg-red-500/10", "dark:border-red-500/20"], [1, "mt-4", "flex", "items-start", "gap-3", "bg-red-50", "border", "border-red-200", "px-4", "py-3", "rounded-xl", "dark:bg-red-500/10", "dark:border-red-500/20"], ["size", "sm", "variant", "danger", "title", "Cancel Invoice", "subtitle", "This action will reject the invoice and cannot be undone.", "icon", "delete_forever", "cancelLabel", "Keep Invoice", "primaryLabel", "Cancel Invoice", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "primaryDisabled"], [1, "px-6", "py-5"], [1, "text-sm", "font-medium", "text-slate-600", "dark:text-slate-300"], ["maxWidth", "max-w-[798px]", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-[2rem] max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 my-4", 3, "closed", "open"], [1, "sticky", "top-0", "z-20", "bg-gradient-to-br", "from-slate-800", "via-slate-900", "to-slate-950", "px-4", "sm:px-6", "py-4", "text-white", "relative", "shrink-0", "overflow-hidden"], [1, "absolute", "top-0", "right-0", "p-4", "opacity-5", "select-none", "pointer-events-none"], [1, "material-symbols-outlined", "text-[70px]"], [1, "flex", "justify-between", "items-start", "gap-4", "relative", "z-10"], [1, "min-w-0"], [1, "text-2xl", "sm:text-xl", "font-black", "tracking-tight", "mt-1", "truncate"], [1, "text-[11px]", "sm:text-xs", "text-slate-400", "font-medium", "mt-0.5", "break-words"], [1, "p-2", "hover:bg-white/10", "rounded-lg", "transition-all", "cursor-pointer", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-lg"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-2", "mt-4", "relative", "z-10"], [1, "bg-white/5", "border", "border-white/10", "rounded-xl", "px-3", "py-2", "min-w-0"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-white/50", "truncate"], [1, "text-base", "sm:text-lg", "font-black", "mt-0.5", "truncate"], [1, "text-white/30"], [1, "text-base", "sm:text-lg", "font-black", "mt-0.5", "text-green-400", "truncate"], [1, "text-base", "sm:text-lg", "font-black", "mt-0.5", "text-amber-400", "truncate"], [1, "flex-1", "overflow-y-auto", "p-1", "sm:p-2", "lg:p-2", "pb-56"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-6", "lg:gap-8"], [1, "lg:col-span-12", "min-w-0", "space-y-6"], [1, "bg-slate-50", "dark:bg-slate-800/50", "rounded-2xl", "p-1", "sm:p-2"], [1, "border-2", "border-dashed", "border-outline-variant/20", "rounded-2xl"], [1, "w-full", "flex", "items-center", "justify-between", "gap-3", "px-4", "sm:px-6", "py-4", "text-left", "hover:bg-surface-container-low", "transition-colors", "cursor-pointer", "rounded-t-2xl", 3, "click"], [1, "flex", "items-center", "gap-3", "min-w-0"], [1, "w-8", "h-8", "bg-primary/10", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-primary", "text-base"], [1, "text-sm", "font-black", "text-on-surface", "truncate"], [1, "material-symbols-outlined", "text-outline", "shrink-0"], [1, "px-4", "sm:px-6", "pb-6", "space-y-4", "border-t", "border-outline-variant/10"], [1, "py-16", "flex", "flex-col", "items-center", "gap-3", "text-outline"], [1, "py-16", "flex", "flex-col", "items-center", "gap-3", "text-outline", "text-center"], [1, "overflow-x-auto", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "mt-3"], [1, "shrink-0", "px-4", "sm:px-6", "py-3", "border-t", "border-surface-container", "bg-surface-container-lowest/50", "flex", "justify-end"], [1, "w-full", "sm:w-[90px]", "py-2", "rounded-lg", "bg-on-surface", "text-white", "text-xs", "font-bold", "uppercase", "tracking-wide", "cursor-pointer", "shadow-md", "hover:opacity-90", "hover:shadow-lg", "transition-all", 3, "click"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/40", "panelClass", "bg-white dark:bg-slate-900 rounded-2xl my-auto flex flex-col max-h-[92vh] overflow-hidden", 3, "closed", "open", "title", "subtitle", "showCloseButton", "showFooter", "showDefaultFooterButtons"], [1, "bg-surface-container-low", "px-3", "py-2", "rounded-xl", "flex", "items-center", "justify-between", "h-[42px]", "mx-6", "mt-3"], [1, "px-6", "pt-5", "pb-4", "shrink-0"], [1, "flex", "items-center"], [1, "flex", "items-center", "flex-1", "min-w-0"], [1, "flex-1", "overflow-y-auto", "px-6", "pb-2", 2, "min-height", "0"], [1, "space-y-4", "animate-in", "fade-in", "slide-in-from-right-4", "duration-300"], [1, "mt-4", "flex", "items-center", "gap-3", "bg-red-50", "dark:bg-red-900/20", "border", "border-red-200", "px-4", "py-3", "rounded-xl"], ["dialog-footer", "", 1, "flex", "gap-3", "shrink-0"], [1, "flex-1", "min-w-[140px]", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "disabled:opacity-50", "flex", "items-center", "justify-center", "gap-1", 3, "disabled"], [1, "flex-1", "min-w-[100px]", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:opacity-90", "hover:shadow-xl", "transition-all", "flex", "items-center", "justify-center", "gap-1"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:opacity-90", "hover:shadow-xl", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", 3, "disabled"], ["maxWidth", "max-w-3xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl max-h-[88vh] flex flex-col my-auto animate-in zoom-in-95 duration-300", 3, "closed", "open"], [1, "sticky", "top-0", "z-10", "flex", "justify-between", "items-center", "px-6", "pt-2", "pb-4", "border-b", "border-outline-variant/10", "bg-white/95", "dark:bg-slate-900/95", "backdrop-blur-sm", "rounded-t-3xl", "shrink-0"], [1, "text-xl", "font-black", "tracking-tight"], [1, "p-1.5", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "flex-1", "overflow-y-auto", "px-6", "py-4", "min-h-0"], [1, "grid", "grid-cols-2", "gap-4", "mb-6"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], ["type", "text", "readonly", "", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "cursor-pointer", 3, "change", "value"], [1, "text-[9px]", "text-outline/60", "mt-1"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "bg-slate-50", "cursor-not-allowed", 3, "value"], [1, "mb-5"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "text-primary", "text-[10px]", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "hover:underline", "flex", "items-center", "gap-1", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "grid", "items-center", "gap-x-2", "mb-1", "px-1"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline", "text-center"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline", "text-right"], [1, "border-t", "border-outline-variant/10", "mb-2"], [1, "space-y-2"], [1, "grid", "items-center", "gap-x-2", 3, "grid-template-columns"], [1, "bg-surface-container-low", "rounded-2xl", "p-4", "space-y-2.5"], [1, "flex", "justify-between", "text-xs"], [1, "font-bold", "text-outline"], [1, "font-black"], [1, "space-y-1"], [1, "font-black", "text-amber-600"], [1, "flex", "justify-between", "text-sm", "border-t", "border-outline-variant/10", "pt-2.5"], [1, "font-black", "text-on-surface"], [1, "font-black", "text-primary", "text-base"], [1, "flex", "gap-3", "px-6", "py-4", "border-t", "border-outline-variant/10", "shrink-0"], [1, "flex-1", "py-3", "rounded-2xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", 3, "click"], [1, "flex-1", "py-3", "rounded-2xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:brightness-110", "transition-all", "duration-200", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl flex flex-col max-h-[92vh] overflow-hidden", 3, "closed", "open"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl p-5 max-h-[92vh] overflow-hidden", 3, "closed", "open"], [1, "flex", "justify-between", "items-start", "mb-5"], [1, "text-2xl", "font-black", "leading-none"], [1, "p-1.5", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "space-y-5"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-xs", "font-black", "uppercase", "tracking-wide"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-primary/10", "text-primary"], ["type", "range", "min", "1", "max", "10", 1, "w-full", "h-2", "accent-primary", "cursor-pointer", 3, "ngModelChange", "ngModel"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-secondary/10", "text-secondary"], ["type", "range", "min", "1", "max", "10", 1, "w-full", "h-2", "accent-secondary", "cursor-pointer", 3, "ngModelChange", "ngModel"], [1, "text-[10px]", "font-black", "px-2.5", "py-1", "rounded-full", "bg-green-100", "text-green-700"], ["type", "range", "min", "1", "max", "10", 1, "w-full", "h-2", "cursor-pointer", 2, "accent-color", "#16a34a", 3, "ngModelChange", "ngModel"], [1, "bg-slate-100", "dark:bg-slate-800", "rounded-2xl", "px-4", "py-3", "flex", "items-center", "justify-between"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wider", "text-outline"], [1, "text-2xl", "font-black"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-2", "block"], ["rows", "3", "placeholder", "Add observations or audit notes...", 1, "w-full", "px-3", "py-3", "rounded-2xl", "border", "border-outline-variant/20", "text-xs", "font-medium", "outline-none", "resize-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-3", "mt-6"], [1, "flex-1", "py-3", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex-1", "py-3", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "flex", "items-center", "justify-center", "gap-2", "shadow-lg", "shadow-primary/20", "hover:brightness-110", "hover:shadow-xl", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["maxWidth", "max-w-2xl", "backdropClass", "bg-slate-900/50", "panelClass", "bg-white dark:bg-slate-900 rounded-3xl max-h-[88vh] flex flex-col p-0 animate-in zoom-in-95 duration-300", 3, "closed", "open"], [1, "sticky", "top-0", "z-10", "flex", "justify-between", "items-center", "px-5", "pt-5", "pb-4", "bg-white/95", "dark:bg-slate-900/95", "backdrop-blur-sm", "rounded-t-3xl", "shrink-0"], [1, "text-2xl", "font-black", "tracking-tight"], [1, "p-2", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "transition-colors", "cursor-pointer", 3, "click"], [1, "flex-1", "overflow-y-auto", "px-5", "pb-2", "min-h-0"], [1, "grid", "grid-cols-2", "gap-4", "mb-5", "mt-1"], [1, "bg-surface-container-low", "p-5", "rounded-2xl", "text-center"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-2"], [1, "text-3xl", "font-black", "text-on-surface"], [1, "bg-primary/5", "border", "border-primary/10", "p-5", "rounded-2xl", "text-center"], [1, "text-xl", "font-black", "text-primary"], [1, "text-[9px]", "font-bold", "text-red-600", "mt-1", "flex", "items-center", "justify-center", "gap-1"], [1, "mb-4", "flex", "items-center", "justify-between", "px-1"], [1, "space-y-3", "pr-1"], [1, "flex", "items-center", "justify-between", "p-4", "bg-surface-container-low", "rounded-2xl", "hover:bg-surface-container", "transition-colors"], [1, "py-12", "flex", "flex-col", "items-center", "gap-3", "text-outline"], [1, "flex", "gap-3", "px-5", "py-4", "border-t", "border-outline-variant/10", "shrink-0"], [1, "flex-1", "py-3", "rounded-2xl", "border", "border-primary", "text-primary", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-primary/5", "transition-colors", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "w-[120px]", "py-3", "rounded-2xl", "bg-on-surface", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-md", "hover:opacity-90", "hover:shadow-lg", "transition-all", 3, "click"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-4"], [1, "text-3xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "mt-1", "text-sm", "font-medium"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "cursor-pointer", 3, "click"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-5", "mb-8"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-blue-400", "via-indigo-400", "to-violet-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "absolute", "top-0", "right-0", "w-24", "h-24", "bg-white/10", "rounded-full", "-mr-8", "-mt-8"], [1, "flex", "items-center", "justify-between", "relative", "z-10"], [1, "text-[10px]", "uppercase", "tracking-[0.25em]", "text-white/80", "font-semibold"], [1, "text-4xl", "font-black", "mt-3"], [1, "text-xs", "text-white/70", "mt-1"], [1, "w-14", "h-14", "rounded-2xl", "bg-white/20", "backdrop-blur-md", "border", "border-white/20", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[30px]"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-amber-400", "via-orange-400", "to-orange-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-emerald-400", "via-green-400", "to-teal-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-6"], [1, "cursor-pointer", "bg-surface-container-lowest", "p-6", "rounded-2xl", "group", "hover:shadow-2xl", "hover:border-primary/20", "border", "border-transparent", "transition-all", "duration-300", "relative", "overflow-hidden"], [1, "col-span-3", "py-24", "flex", "flex-col", "items-center", "gap-4", "text-outline"], [1, "cursor-pointer", "bg-surface-container-lowest", "p-6", "rounded-2xl", "group", "hover:shadow-2xl", "hover:border-primary/20", "border", "border-transparent", "transition-all", "duration-300", "relative", "overflow-hidden", 3, "click"], [1, "absolute", "top-0", "right-0", "p-4"], [1, "px-3", "py-1", "text-[10px]", "font-bold", "uppercase", "tracking-wider", "rounded-full", 3, "ngClass"], [1, "flex", "items-start", "gap-4", "mb-6"], [1, "w-14", "h-14", "bg-surface-container-high", "rounded-xl", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-outline"], [1, "font-bold", "text-lg", "text-on-surface", "leading-tight", "group-hover:text-primary", "transition-colors"], [1, "text-sm", "text-outline"], [1, "space-y-3"], [1, "flex", "items-center", "gap-3", "text-sm", "text-on-surface-variant"], [1, "mt-4", "flex", "flex-wrap", "gap-1.5"], [1, "px-2", "py-0.5", "bg-surface-container-low", "text-[10px]", "font-bold", "text-outline", "rounded-full"], [1, "mt-5", "flex", "items-center", "justify-between"], [1, "text-[10px]", "font-bold", "text-outline", "uppercase", "tracking-wider"], [1, "font-black", "text-lg"], [1, "cursor-pointer", "p-2", "text-primary", "hover:bg-primary/5", "rounded-full", "transition-colors"], [1, "material-symbols-outlined"], [1, "material-symbols-outlined", "text-5xl"], [1, "font-bold"], [1, "flex", "items-center", "gap-4", "flex-wrap"], [1, "p-2", "hover:bg-surface-container", "rounded-lg", "cursor-pointer", "transition-colors", 3, "click"], [1, "text-3xl", "font-black", "tracking-tight", "text-on-surface"], [1, "text-sm", "text-outline", "font-medium"], [1, "ml-auto", "flex", "gap-3", "flex-wrap"], [1, "px-5", "py-2.5", "bg-surface-container-highest", "text-primary", "rounded-xl", "font-bold", "flex", "items-center", "gap-2", "hover:bg-surface-dim", "transition-colors", "cursor-pointer", 3, "click"], [1, "px-5", "py-2.5", "bg-primary", "text-white", "rounded-xl", "font-bold", "flex", "items-center", "gap-2", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", "cursor-pointer", 3, "click"], [1, "px-5", "py-2.5", "bg-surface-container-highest", "text-secondary", "rounded-xl", "font-bold", "flex", "items-center", "gap-2", "hover:bg-surface-dim", "transition-colors", "cursor-pointer", 3, "click"], [1, "bg-secondary", "text-white", "text-[10px]", "font-black", "px-2", "py-0.5", "rounded-full"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-6"], [1, "bg-surface-container-low", "p-6", "rounded-2xl", "flex", "flex-col", "justify-between", "min-h-32", "border-l-4", "border-primary"], [1, "text-xs", "font-bold", "text-outline", "uppercase", "tracking-widest"], [1, "text-[10px]", "font-bold", "mt-1", "flex", "items-center", "gap-1", 3, "text-red-600", "text-outline"], [1, "bg-surface-container-low", "p-6", "rounded-2xl", "flex", "flex-col", "justify-between", "h-32", "border-l-4", "border-secondary"], [1, "bg-surface-container-low", "p-6", "rounded-2xl", "flex", "flex-col", "justify-between", "h-32"], [1, "px-3", "py-1", "rounded-full", "text-xs", "font-bold", "uppercase", "tracking-wider", "w-fit", 3, "ngClass"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-black"], [1, "w-full", "bg-surface-container-high", "h-2", "rounded-full", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8"], [1, "lg:col-span-12", "w-full", "space-y-6"], [1, "bg-surface-container-lowest", "p-8", "rounded-3xl", "shadow-sm", "border", "border-outline-variant/10"], [1, "text-xl", "font-black", "mb-6"], [1, "space-y-4"], [1, "flex", "items-center", "gap-6", "p-4", "bg-surface-container-low", "rounded-2xl", "border", "border-transparent", "hover:border-primary/20", "transition-all", "group"], [1, "text-center", "py-12", "text-outline", "font-bold", "italic"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-xl", "font-black"], [1, "text-primary", "text-xs", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "hover:underline", 3, "click"], [1, "w-full", "text-left"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "border-b", "border-surface-container"], [1, "py-4"], [1, "border-b", "border-surface-container/50", "hover:bg-surface-container-low/30", "transition-colors"], [1, "text-[10px]", "font-bold", "mt-1", "flex", "items-center", "gap-1"], [1, "material-symbols-outlined", "text-[12px]"], [1, "w-12", "h-12", "bg-white", "rounded-xl", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-primary"], [1, "flex-1"], [1, "flex", "items-center", "gap-1", "mb-1"], [1, "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200"], [1, "font-bold", "text-on-surface"], [1, "text-xs", "text-outline"], [1, "px-3", "py-1", "rounded-lg", "text-[10px]", "font-black", "uppercase", "tracking-widest", 3, "ngClass"], [1, "py-4", "font-bold"], [1, "py-4", "font-black"], [1, "py-4", "text-sm", "text-outline"], [1, "px-2", "py-0.5", "rounded", "text-[10px]", "font-black", "uppercase", "tracking-tighter", 3, "ngClass"], [1, "flex", "items-center", "gap-3"], [1, "relative", "group"], [1, "text-primary", "opacity-80", "hover:opacity-100", "cursor-pointer", 3, "click"], [1, "absolute", "bottom-full", "left-1/2", "-translate-x-1/2", "mb-2", "hidden", "group-hover:block", "bg-gray-900", "text-white", "text-[10px]", "px-2", "py-1", "rounded", "whitespace-nowrap", "z-10"], [1, "text-green-600", "opacity-80", "hover:opacity-100", "cursor-pointer", 3, "click"], [1, "text-red-600", "opacity-80", "hover:opacity-100", "cursor-pointer", 3, "click"], ["colspan", "5", 1, "text-center", "py-8", "text-outline", "font-bold", "italic"], [1, "mt-1", "text-[10px]", "font-semibold", "text-slate-500"], [1, "text-[10px]", "font-semibold", "text-amber-600"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-3", "mb-4"], [1, "cursor-pointer", "rounded-2xl", "border", "p-4", "flex", "flex-col", "items-center", "justify-center", "gap-1", "transition-all", 3, "click", "ngClass"], [1, "material-symbols-outlined", "text-2xl"], [1, "text-xs", "font-black", "uppercase", "tracking-wider"], [1, "text-[10px]", "font-bold", "mt-1", "opacity-80"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "border", "border-slate-200", "rounded-xl", "px-3", "py-2.5", "text-xs", "font-semibold", "bg-white", "outline-none", "focus:ring-2", "focus:ring-blue-500/20", "cursor-pointer", "dark:bg-slate-950", "dark:border-slate-700", 3, "click"], [1, "truncate", "text-slate-600", "dark:text-slate-300"], [1, "material-symbols-outlined", "text-slate-400", "text-sm", "ml-1"], [1, "absolute", "z-50", "mt-1", "w-full", "bg-white", "border", "border-slate-200", "rounded-xl", "shadow-lg", "max-h-48", "overflow-y-auto", "dark:bg-slate-950", "dark:border-slate-700"], [1, "text-[10px]", "text-slate-400", "mt-1"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "border", "border-slate-200", "rounded-xl", "px-3", "py-2.5", "text-xs", "font-semibold", "bg-white", "outline-none", "focus:ring-2", "focus:ring-blue-500/20", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", "dark:bg-slate-950", "dark:border-slate-700", 3, "click", "disabled"], [1, "text-[10px]", "text-amber-600", "mt-1", "flex", "items-center", "gap-1"], ["type", "number", "min", "0", "max", "100", 1, "w-full", "border", "border-slate-200", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-blue-500/20", "dark:bg-slate-950", "dark:border-slate-700", 3, "ngModelChange", "ngModel", "readonly", "ngClass"], [1, "absolute", "z-50", "mt-1", "w-full", "bg-white", "border", "border-slate-200", "rounded-xl", "shadow-lg", "max-h-48", "overflow-y-auto", "dark:bg-slate-950", "dark:border-slate-700", 3, "click"], [1, "flex", "items-center", "gap-2", "text-slate-400", "text-xs", "p-3"], [1, "text-xs", "text-slate-400", "italic", "p-3"], [1, "shrink-0", "px-3", "py-2", "border-t", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-950", "rounded-b-xl"], ["type", "button", 1, "w-12", "py-1", "rounded-lg", "bg-violet-600", "text-white", "text-xs", "font-bold", "hover:bg-violet-700", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "animate-spin", "text-sm"], [1, "flex", "items-center", "gap-2", "px-3", "py-2.5", "hover:bg-blue-50", "cursor-pointer", "transition-colors", "dark:hover:bg-blue-500/10", 3, "bg-blue-50"], [1, "flex", "items-center", "gap-2", "px-3", "py-2.5", "hover:bg-blue-50", "cursor-pointer", "transition-colors", "dark:hover:bg-blue-500/10"], ["type", "checkbox", 1, "w-3.5", "h-3.5", "accent-blue-600", "cursor-pointer", "rounded", "flex-shrink-0", 3, "change", "checked"], [1, "text-xs", "font-semibold", "text-slate-700", "flex-1", "truncate", "dark:text-slate-300"], [1, "text-[9px]", "font-black", "shrink-0", 3, "ngClass"], [1, "px-3", "py-2.5", "text-xs", "text-slate-400", "italic"], [1, "text-[9px]", "font-bold", "px-1.5", "py-0.5", "rounded", "shrink-0", 3, "ngClass"], [1, "absolute", "z-50", "top-full", "left-0", "right-0", "mt-1", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-xl", "shadow-xl", "overflow-hidden"], [1, "px-4", "py-3", "cursor-pointer", "hover:bg-emerald-50", "dark:hover:bg-emerald-900/20", "transition-colors", 3, "click"], ["type", "date", 1, "w-full", "px-3", "py-3", "rounded-xl", "border", "border-slate-200", "bg-white", "text-sm", "font-bold", "text-slate-800", "outline-none", "transition", "focus:border-emerald-400", "focus:ring-4", "focus:ring-emerald-500/10", "cursor-pointer", "dark:border-slate-700", "dark:bg-slate-950", "dark:text-slate-100", 3, "ngModelChange", "click", "ngModel", "min", "max"], ["type", "text", "placeholder", "e.g. UTR123456789", "autocomplete", "off", 1, "w-full", "border", "border-slate-200", "rounded-xl", "bg-white", "px-3", "py-3", "text-sm", "font-bold", "text-slate-800", "outline-none", "transition", "placeholder:text-slate-400", "focus:border-emerald-400", "focus:ring-4", "focus:ring-emerald-500/10", "dark:border-slate-700", "dark:bg-slate-950", "dark:text-slate-100", 3, "input", "value"], [1, "material-symbols-outlined", "text-red-600", "text-[18px]", "shrink-0", "mt-0.5"], [1, "text-xs", "font-bold", "text-red-600", "break-words", "flex-1"], [1, "material-symbols-outlined", "text-red-600", "text-[20px]", "shrink-0", "mt-0.5"], [1, "text-xs", "font-black", "text-red-700", "mb-1"], [1, "text-[11px]", "font-semibold", "text-red-600", "leading-relaxed"], [1, "text-[10px]", "font-bold", "text-red-500", "mt-1"], ["type", "button", 1, "mt-2", "text-[10px]", "font-black", "text-slate-500", "hover:underline", "cursor-pointer", 3, "click"], [1, "mt-4", "flex", "items-start", "gap-3", "bg-red-50", "dark:bg-red-900/20", "border", "border-red-200", "px-4", "py-3", "rounded-xl"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "mt-4", 2, "overflow", "visible"], [1, "min-w-0", "relative"], [1, "text-[9px]", "font-black", "uppercase", "tracking-wide", "text-outline", "mb-1.5", "block"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-3", "py-2.5", "rounded-xl", "text-xs", "font-semibold", "bg-white", "dark:bg-slate-900", "text-on-surface", "transition-all", "cursor-pointer", 3, "click", "ngClass"], [1, "truncate"], [1, "material-symbols-outlined", "text-sm", "text-slate-400", "shrink-0", "transition-transform", "duration-200"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "right-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.12)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden", 2, "max-height", "200px", "overflow-y", "auto", "scrollbar-width", "thin", "scrollbar-color", "#cbd5e1 transparent"], ["type", "number", "min", "0", "placeholder", "e.g. 800", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-slate-300", "dark:border-slate-600", "text-xs", "font-semibold", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/15", "bg-white", "dark:bg-slate-900", "transition-all", 3, "ngModelChange", "ngModel"], [1, "truncate", "capitalize"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "right-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.12)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden"], ["type", "number", "min", "1", "placeholder", "e.g. 5", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-slate-300", "dark:border-slate-600", "text-xs", "font-semibold", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/15", "bg-white", "dark:bg-slate-900", "transition-all", 3, "ngModelChange", "ngModel"], [1, "w-full", "py-4", "rounded-2xl", "bg-primary", "text-white", "font-black", "uppercase", "tracking-widest", "shadow-lg", "shadow-primary/20", "hover:brightness-110", "transition-all", "duration-200", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", "cursor-pointer", "mt-2", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-error", "text-lg", "shrink-0"], [1, "text-sm", "font-bold", "text-error", "break-words"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "right-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.12)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden", 2, "max-height", "200px", "overflow-y", "auto", "scrollbar-width", "thin", "scrollbar-color", "#cbd5e1 transparent", 3, "click"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "cursor-pointer", "transition-colors", 3, "ngClass", "border-b", "border-slate-100", "dark:border-slate-700"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "cursor-pointer", "transition-colors", 3, "click", "ngClass"], [1, "material-symbols-outlined", "text-primary", "text-[16px]", "shrink-0"], [1, "w-4", "shrink-0"], [1, "text-xs", "font-semibold", "truncate"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "right-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.12)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden", 3, "click"], [1, "flex", "items-center", "gap-2", "px-4", "py-3", "cursor-pointer", "border-b", "border-slate-100", "dark:border-slate-700", "transition-colors", 3, "click", "ngClass"], [1, "w-2", "h-2", "rounded-full", "bg-green-500", "shrink-0"], [1, "text-xs", "font-semibold"], [1, "flex", "items-center", "gap-2", "px-4", "py-3", "cursor-pointer", "transition-colors", 3, "click", "ngClass"], [1, "w-2", "h-2", "rounded-full", "bg-slate-400", "shrink-0"], [1, "flex", "items-center", "gap-2", "px-4", "py-2.5", "cursor-pointer", "transition-colors", 3, "ngClass"], [1, "w-6", "h-6", "rounded-full", "bg-primary/10", "flex", "items-center", "justify-center", "shrink-0"], [1, "text-[9px]", "font-black", "text-primary"], [1, "material-symbols-outlined", "text-primary", "text-[15px]", "ml-auto", "shrink-0"], [1, "material-symbols-outlined", "text-4xl", "animate-spin"], [1, "text-sm", "font-bold"], [1, "text-sm"], [1, "w-full", "text-sm"], [1, "bg-slate-100", "dark:bg-slate-800", "border-b", "border-slate-200", "dark:border-slate-700"], [1, "px-4", "py-3", "text-left", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "px-4", "py-3", "text-center", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "px-4", "py-3", "text-right", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline"], [1, "border-b", "border-slate-200", "dark:border-slate-700", "bg-primary/5", "dark:bg-primary/10"], [1, "border-b", "border-slate-200", "dark:border-slate-700", "hover:bg-slate-50", "dark:hover:bg-slate-800/50", "transition-colors"], ["colspan", "7", 1, "px-3", "py-4"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-primary"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "gap-2", 2, "overflow", "visible"], [1, "relative", "col-span-2", "sm:col-span-2"], [1, "text-[9px]", "font-bold", "text-outline", "uppercase", "block", "mb-1"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-2.5", "py-2", "rounded-xl", "text-xs", "font-bold", "bg-white", "dark:bg-slate-900", "text-on-surface", "transition-all", "cursor-pointer", 3, "click", "ngClass"], [1, "truncate", "text-[11px]"], [1, "material-symbols-outlined", "text-sm", "text-slate-400", "shrink-0", "transition-transform", "duration-200", "ml-1"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.14)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden", 2, "min-width", "200px", "max-height", "200px", "overflow-y", "auto", "scrollbar-width", "thin", "scrollbar-color", "#cbd5e1 transparent"], ["type", "number", "min", "1", 1, "w-full", "px-2.5", "py-2", "rounded-xl", "border", "border-slate-300", "dark:border-slate-600", "text-xs", "font-bold", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/15", "bg-white", "dark:bg-slate-900", "transition-all", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "w-full", "px-2.5", "py-2", "rounded-xl", "border", "border-slate-300", "dark:border-slate-600", "text-xs", "font-bold", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/15", "bg-white", "dark:bg-slate-900", "transition-all", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-2", 2, "overflow", "visible"], [1, "flex", "items-center", "gap-1.5", "truncate"], [1, "w-2", "h-2", "rounded-full", "shrink-0", 3, "ngClass"], [1, "capitalize", "text-[11px]", "truncate"], [1, "flex", "items-center", "gap-1.5", "min-w-0", "overflow-hidden"], [1, "w-5", "h-5", "rounded-full", "bg-primary/10", "flex", "items-center", "justify-center", "shrink-0"], [1, "material-symbols-outlined", "text-[14px]", "text-slate-400", "shrink-0"], [1, "text-[11px]", "truncate"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.14)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden", 2, "min-width", "180px", "max-height", "200px", "overflow-y", "auto", "scrollbar-width", "thin", "scrollbar-color", "#cbd5e1 transparent"], [1, "flex", "flex-col", "sm:flex-row", "gap-2", "pt-1"], [1, "flex-1", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:brightness-110", "transition-all", "shadow-md", "shadow-primary/20", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], [1, "flex-1", "py-2.5", "rounded-xl", "border-2", "border-outline-variant/30", "text-xs", "font-black", "uppercase", "cursor-pointer", "hover:bg-slate-100", "dark:hover:bg-slate-700", "transition-colors", 3, "click"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.14)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden", 2, "min-width", "200px", "max-height", "200px", "overflow-y", "auto", "scrollbar-width", "thin", "scrollbar-color", "#cbd5e1 transparent", 3, "click"], [1, "flex", "items-center", "gap-2", "px-3", "py-2.5", "cursor-pointer", "transition-colors", 3, "ngClass"], [1, "flex", "items-center", "gap-2", "px-3", "py-2.5", "cursor-pointer", "transition-colors", 3, "click", "ngClass"], [1, "material-symbols-outlined", "text-primary", "text-[14px]", "shrink-0"], [1, "w-3.5", "shrink-0"], [1, "text-xs", "font-semibold", "whitespace-nowrap"], [1, "flex", "items-center", "gap-2", "px-3", "py-2.5", "cursor-pointer", "border-b", "border-slate-100", "dark:border-slate-700", "transition-colors", 3, "click", "ngClass"], [1, "text-[8px]", "font-black", "text-primary"], [1, "absolute", "z-[999]", "top-[calc(100%+4px)]", "left-0", "bg-white", "dark:bg-slate-800", "rounded-xl", "shadow-[0_8px_30px_rgba(0,0,0,0.14)]", "border", "border-slate-200", "dark:border-slate-600", "overflow-hidden", 2, "min-width", "180px", "max-height", "200px", "overflow-y", "auto", "scrollbar-width", "thin", "scrollbar-color", "#cbd5e1 transparent", 3, "click"], [1, "material-symbols-outlined", "text-primary", "text-[14px]", "ml-auto", "shrink-0"], [1, "px-4", "py-3", "text-sm", "font-bold", "text-on-surface"], [1, "px-4", "py-3", "text-center"], [1, "inline-block", "px-2.5", "py-1", "bg-primary/10", "text-primary", "font-black", "text-xs", "rounded-lg"], [1, "px-4", "py-3", "text-right", "font-semibold", "text-on-surface"], [1, "px-4", "py-3", "text-right", "font-black", "text-lg", "text-primary"], [1, "inline-block", "px-3", "py-1.5", "text-[10px]", "font-black", "uppercase", "tracking-widest", "rounded-lg", 3, "ngClass"], [1, "flex", "items-center", "justify-center", "gap-2"], ["title", "Edit", 1, "p-1.5", "text-slate-400", "hover:text-primary", "transition-colors", "rounded-lg", "hover:bg-primary/10", "cursor-pointer", 3, "click"], ["title", "Delete", 1, "p-1.5", "text-slate-400", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "dark:hover:bg-red-900/20", "cursor-pointer", 3, "click"], [1, "text-[11px]", "font-bold", "uppercase", "tracking-widest", "text-outline"], [1, "px-3", "py-1", "rounded-full", "text-[12px]", "font-bold", "uppercase", "cursor-pointer", "border", "border-outline-variant/20", "outline-none", 3, "change", "ngClass", "value"], ["value", "Active"], ["value", "Pending"], ["value", "Inactive"], [1, "flex", "flex-col", "items-center", "gap-1", "w-28", "min-w-0"], [1, "w-9", "h-9", "flex-none", "rounded-full", "flex", "items-center", "justify-center", "text-sm", "font-black", "transition-all", "duration-300", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-sm", "text-white"], [3, "ngClass"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "whitespace-nowrap", 3, "ngClass"], [1, "flex-1", "h-0.5", "mx-2", "mb-4", "rounded-full", "transition-all", "duration-500", 3, "ngClass"], [1, "text-[9px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1.5", "block"], [1, "text-error"], ["type", "text", "placeholder", "e.g. Skyline Structural Engineering", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "transition-shadow", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "text", "placeholder", "Full Name", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "tel", "inputmode", "numeric", "pattern", "[0-9]*", "placeholder", "10-digit number", "maxlength", "10", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", "pr-12", 3, "ngModelChange", "input", "ngModel"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-[9px]", "font-black", "text-outline/50"], ["type", "email", "placeholder", "official@vendor.com", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "justify-center", "gap-2", "bg-amber-50", "dark:bg-amber-900/20", "border", "border-amber-200", "rounded-xl", "px-4", "py-3"], [1, "material-symbols-outlined", "text-amber-600", "text-base"], [1, "text-[10px]", "font-bold", "text-amber-700", "dark:text-amber-400", "leading-relaxed", "text-center"], ["type", "text", "maxlength", "15", "placeholder", "22AAAAA0000A1Z5", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "uppercase", "outline-none", "focus:ring-2", "focus:ring-primary/20", "pr-12", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "10", "placeholder", "ABCDE1234F", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "uppercase", "outline-none", "focus:ring-2", "focus:ring-primary/20", "pr-12", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-3", "gap-3"], [1, "col-span-2"], ["type", "text", "placeholder", "Industrial Area, Sector 5...", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "tel", "maxlength", "6", "placeholder", "400001", 1, "w-full", "px-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-sm", "font-black", "text-outline"], ["type", "text", "placeholder", "500000", 1, "w-full", "pl-7", "pr-3", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "text-[9px]", "text-outline/70", "mt-1"], [1, "border", "border-outline-variant/20", "rounded-xl", "overflow-hidden", "bg-surface-container-lowest"], [1, "flex", "items-center", "justify-between", "px-4", "py-2.5", "bg-surface-container", "border-b", "border-outline-variant/10"], [1, "text-[10px]", "font-bold", "text-outline"], ["type", "button", 1, "text-[9px]", "font-black", "text-error", "hover:underline", "cursor-pointer"], [1, "max-h-44", "overflow-y-auto", "divide-y", "divide-outline-variant/10"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "hover:bg-surface-container", "cursor-pointer", "transition-colors", 3, "bg-primary/5"], [1, "text-center", "py-6", "text-outline", "text-xs", "font-bold", "italic"], [1, "flex", "flex-wrap", "gap-1.5", "mt-2"], [1, "flex", "flex-wrap", "gap-1.5"], ["type", "button", 1, "text-[9px]", "font-black", "text-error", "hover:underline", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "gap-3", "px-4", "py-2.5", "hover:bg-surface-container", "cursor-pointer", "transition-colors"], ["type", "checkbox", 1, "w-4", "h-4", "rounded", "accent-primary", "cursor-pointer", "flex-shrink-0", 3, "change", "checked"], [1, "text-xs", "font-semibold", "text-on-surface"], [1, "ml-auto", "material-symbols-outlined", "text-primary", "text-base"], [1, "px-2.5", "py-1", "bg-primary/10", "text-primary", "rounded-full", "text-[10px]", "font-bold", "flex", "items-center", "gap-1.5"], ["type", "button", 1, "cursor-pointer", "hover:text-error", "leading-none", "font-black", 3, "click"], [1, "normal-case", "font-normal", "text-outline/60", "tracking-normal", "ml-1"], [1, "border-2", "border-dashed", "border-outline-variant/20", "rounded-xl", "p-6", "flex", "flex-col", "items-center", "justify-center", "gap-2", "hover:bg-slate-50", "dark:hover:bg-slate-800", "hover:border-primary/30", "transition-all", "cursor-pointer"], [1, "material-symbols-outlined", "text-primary", "text-3xl"], [1, "text-[10px]", "font-bold", "text-on-surface"], [1, "text-[9px]", "text-outline/70", "text-center"], ["type", "file", "accept", ".pdf,.doc,.docx,.jpg,.jpeg,.png", "multiple", "", 1, "hidden", 3, "change"], [1, "flex", "items-center", "gap-2", "bg-red-50", "border", "border-red-200", "px-4", "py-3", "rounded-xl"], ["target", "_blank", "rel", "noopener noreferrer", 1, "flex", "items-center", "gap-3", "bg-surface-container-low", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/10", "hover:bg-slate-50", "transition-all", 3, "href"], [1, "material-symbols-outlined", "text-primary", "text-[16px]"], [1, "truncate", "text-[10px]", "font-medium", "text-slate-700", "dark:text-slate-200"], [1, "material-symbols-outlined", "text-slate-400", "text-[15px]", "ml-auto"], [1, "flex", "items-center", "gap-3", "bg-surface-container-low", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/10", "group"], [1, "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "material-symbols-outlined", "text-base", 3, "ngClass"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-bold", "text-on-surface", "truncate"], [1, "text-[9px]", "text-outline", "font-medium"], [1, "p-1", "text-outline", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "cursor-pointer", "opacity-0", "group-hover:opacity-100", 3, "click"], [1, "material-symbols-outlined", "text-base"], [1, "material-symbols-outlined", "text-error", "text-base"], [1, "text-xs", "font-bold", "text-error"], [1, "material-symbols-outlined", "text-error", "text-lg"], [1, "text-sm", "font-bold", "text-error"], [1, "flex-1", "min-w-[140px]", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "disabled:opacity-50", "flex", "items-center", "justify-center", "gap-1", 3, "click", "disabled"], [1, "flex-1", "min-w-[100px]", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", 3, "click"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:opacity-90", "hover:shadow-xl", "transition-all", "flex", "items-center", "justify-center", "gap-1", 3, "click"], [1, "flex-2", "min-w-[140px]", "py-2.5", "rounded-xl", "bg-primary", "text-white", "text-xs", "font-black", "uppercase", "tracking-wide", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:opacity-90", "hover:shadow-xl", "transition-all", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "material-symbols-outlined", "animate-spin", "text-xs"], [1, "grid", "items-center", "gap-x-2"], ["type", "button", 3, "click"], [1, "material-symbols-outlined", "text-outline", "text-xs", "transition-transform", "duration-200"], [1, "absolute", "z-20", "mt-1", "w-full", "bg-surface-container-lowest", "rounded-xl", "border", "border-outline-variant/20", "shadow-lg", "overflow-hidden"], ["type", "text", "placeholder", "Description", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-medium", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "placeholder", "1", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-medium", "text-center", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "left-2", "top-1/2", "-translate-y-1/2", "text-[10px]", "font-black", "text-outline/60"], ["type", "number", "min", "0", "placeholder", "0", 1, "w-full", "pl-5", "pr-2", "py-2", "rounded-xl", "border", "border-outline-variant/20", "text-[11px]", "font-medium", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "text-on-surface"], [1, "text-right"], [1, "text-[11px]", "font-black", "text-on-surface"], [1, "text-[8px]", "text-outline", "leading-tight"], [1, "w-8", "h-8", "flex", "items-center", "justify-center", "text-slate-300", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "cursor-pointer", "flex-shrink-0"], [1, "w-8", "h-8"], [1, "absolute", "z-20", "mt-1", "w-full", "bg-surface-container-lowest", "rounded-xl", "border", "border-outline-variant/20", "shadow-lg", "overflow-hidden", 3, "click"], [3, "class"], [3, "click"], ["type", "number", "min", "1", "placeholder", "Hrs", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-primary/30", "bg-primary/5", "text-[11px]", "font-medium", "text-center", "outline-none", 3, "ngModel"], ["type", "number", "min", "1", "placeholder", "Hrs", 1, "w-full", "px-2", "py-2", "rounded-xl", "border", "border-primary/30", "bg-primary/5", "text-[11px]", "font-medium", "text-center", "outline-none", 3, "ngModelChange", "ngModel"], [1, "w-8", "h-8", "flex", "items-center", "justify-center", "text-slate-300", "hover:text-error", "transition-colors", "rounded-lg", "hover:bg-red-50", "cursor-pointer", "flex-shrink-0", 3, "click"], [1, "flex", "justify-between", "text-[10px]"], [1, "text-outline"], [1, "font-bold", "text-amber-600"], [1, "flex", "justify-between", "items-center", "px-5", "pt-4", "pb-2", "border-b", "border-outline-variant/10"], [1, "flex", "items-center", "gap-2"], [1, "w-[34px]", "h-[34px]", "flex", "items-center", "justify-center", "rounded-lg", "hover:bg-slate-100", "dark:hover:bg-slate-800", "cursor-pointer", 3, "click"], [1, "px-5", "py-3", "space-y-3", "overflow-y-auto"], [1, "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "p-3", "rounded-2xl", "space-y-3"], [1, "text-[14px]", "font-black"], [1, "flex", "items-center", "gap-1", "bg-green-50", "text-green-600", "px-2", "py-0.5", "rounded-full"], [1, "material-symbols-outlined", "text-[13px]"], [1, "text-[10px]", "font-bold", "uppercase"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-2"], [1, "bg-slate-50", "dark:bg-slate-900/40", "rounded-xl", "px-3", "py-2", "space-y-1"], [1, "text-[12px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "text-[12px]", "font-bold"], [1, "text-[14px]", "text-slate-500"], [1, "text-[12px]", "text-slate-500"], [1, "text-[12px]", "font-bold", "uppercase", "break-all"], [1, "bg-slate-50", "dark:bg-slate-900/40", "rounded-xl", "px-3", "py-2", "space-y-1", "col-span-1", "md:col-span-2"], [1, "flex", "flex-wrap", "gap-1"], [1, "text-[11px]", "font-semibold", "bg-slate-100", "dark:bg-slate-800", "px-2", "py-0.5", "rounded-full"], [1, "px-5", "pb-4", "pt-2", "flex", "justify-center"], [1, "w-[110px]", "h-[34px]", "rounded-lg", "bg-slate-200", "dark:bg-slate-700", "text-[11px]", "font-bold", "uppercase", "cursor-pointer", 3, "click"], [1, "flex", "flex-col", "gap-2", "max-h-[120px]", "overflow-y-auto"], ["target", "_blank", 1, "flex", "items-center", "justify-between", "bg-slate-50", "dark:bg-slate-900/40", "px-3", "py-2", "rounded-xl", 3, "href"], [1, "text-[12px]", "font-medium", "truncate"], [1, "material-symbols-outlined", "text-[15px]", "text-slate-400"], [1, "material-symbols-outlined", "text-[11px]"], [1, "text-xs", "font-bold", "text-outline", "uppercase", "tracking-wider"], [1, "font-black", "text-primary", "text-lg"], [1, "w-10", "h-10", "rounded-xl", "flex", "items-center", "justify-center", 3, "ngClass"], [1, "material-symbols-outlined", "text-sm", 3, "ngClass"], [1, "font-black", "text-sm", "text-on-surface"], [1, "text-[10px]", "text-outline", "font-bold", "uppercase", "tracking-widest", "mt-0.5"], [1, "text-right", "flex", "flex-col", "items-end", "gap-1"], [1, "font-black", "text-base", "text-on-surface"], [1, "px-2.5", "py-1", "rounded-md", "text-[10px]", "font-black", "uppercase", 3, "ngClass"], [1, "text-[10px]", "font-black", "text-primary", "flex", "items-center", "gap-1", "hover:underline", "cursor-pointer", 3, "click"], [1, "font-bold", "text-sm"]], template: function Vendors_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, Vendors_Conditional_1_Template, 57, 8)(2, Vendors_Conditional_2_Template, 85, 23, "div", 1);
      \u0275\u0275elementStart(3, "app-common-dialog", 2);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_3_listener() {
        return ctx.closePayModal();
      })("primary", function Vendors_Template_app_common_dialog_primary_3_listener() {
        return ctx.showBudgetExceedConfirm ? ctx.raisePaymentRequest() : ctx.confirmPayment();
      });
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275listener("click", function Vendors_Template_div_click_4_listener() {
        return ctx.closeAllDropdowns();
      });
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "span", 8);
      \u0275\u0275text(10, "receipt_long");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div")(12, "p", 9);
      \u0275\u0275text(13, "Invoice");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p", 10);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p", 11);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 12)(19, "p", 9);
      \u0275\u0275text(20, " Grand Total ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p", 13);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, Vendors_Conditional_23_Template, 4, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 14)(25, "div", 15)(26, "p", 9);
      \u0275\u0275text(27, "Subtotal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p", 16);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 17)(31, "p", 18);
      \u0275\u0275text(32, " Tax Amount ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p", 19);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(35, "div", 20)(36, "div", 21)(37, "div", 22)(38, "span", 23);
      \u0275\u0275text(39, " Project : ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span", 24);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(42, Vendors_Conditional_42_Template, 2, 0, "span", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(43, Vendors_Conditional_43_Template, 62, 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 26)(45, "div", 27)(46, "div", 28)(47, "span", 29);
      \u0275\u0275text(48, "payments");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div")(50, "p", 30);
      \u0275\u0275text(51, "Payment Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p", 31);
      \u0275\u0275text(53, " Enter amount, mode and transaction reference. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(54, "div", 32)(55, "div")(56, "label", 33);
      \u0275\u0275text(57, " Amount to Pay ");
      \u0275\u0275elementStart(58, "span", 34);
      \u0275\u0275text(59, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div", 35)(61, "span", 36);
      \u0275\u0275text(62, "\u20B9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "input", 37);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.paymentForm.amount, $event) || (ctx.paymentForm.amount = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(64, Vendors_Conditional_64_Template, 2, 0, "p", 38);
      \u0275\u0275conditionalCreate(65, Vendors_Conditional_65_Template, 4, 4, "p", 39);
      \u0275\u0275conditionalCreate(66, Vendors_Conditional_66_Template, 2, 1, "p", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div")(68, "label", 41);
      \u0275\u0275text(69, " Payment Mode ");
      \u0275\u0275elementStart(70, "span", 34);
      \u0275\u0275text(71, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "div", 35)(73, "button", 42);
      \u0275\u0275listener("click", function Vendors_Template_button_click_73_listener() {
        return ctx.showPaymentModeDropdown = !ctx.showPaymentModeDropdown;
      });
      \u0275\u0275elementStart(74, "span");
      \u0275\u0275text(75);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "span", 43);
      \u0275\u0275text(77, " expand_more ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(78, Vendors_div_78_Template, 9, 0, "div", 44);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(79, "div", 45);
      \u0275\u0275conditionalCreate(80, Vendors_Conditional_80_Template, 6, 3, "div");
      \u0275\u0275conditionalCreate(81, Vendors_Conditional_81_Template, 4, 5, "div", 46);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(82, Vendors_Conditional_82_Template, 5, 1, "div", 47);
      \u0275\u0275conditionalCreate(83, Vendors_Conditional_83_Template, 24, 12, "div", 48);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(84, "app-common-dialog", 49);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_84_listener() {
        return ctx.closeCancelInvoiceDialog();
      })("primary", function Vendors_Template_app_common_dialog_primary_84_listener() {
        return ctx.confirmCancelInvoice();
      });
      \u0275\u0275elementStart(85, "div", 50)(86, "p", 51);
      \u0275\u0275text(87, " Are you sure you want to cancel invoice ");
      \u0275\u0275elementStart(88, "strong");
      \u0275\u0275text(89);
      \u0275\u0275elementEnd();
      \u0275\u0275text(90, "? ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(91, "app-common-dialog", 52);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_91_listener() {
        return ctx.closeLaborModal();
      });
      \u0275\u0275elementStart(92, "div", 53)(93, "div", 54)(94, "span", 55);
      \u0275\u0275text(95, "engineering");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(96, "div", 56)(97, "div", 57)(98, "h3", 58);
      \u0275\u0275text(99, "Labor Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "p", 59);
      \u0275\u0275text(101, "Manage Labor");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(102, "button", 60);
      \u0275\u0275listener("click", function Vendors_Template_button_click_102_listener() {
        return ctx.closeLaborModal();
      });
      \u0275\u0275elementStart(103, "span", 61);
      \u0275\u0275text(104, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(105, "div", 62)(106, "div", 63)(107, "p", 64);
      \u0275\u0275text(108, "Active");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(109, "p", 65);
      \u0275\u0275conditionalCreate(110, Vendors_Conditional_110_Template, 2, 0, "span", 66)(111, Vendors_Conditional_111_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(112, "div", 63)(113, "p", 64);
      \u0275\u0275text(114, "On Site");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "p", 67);
      \u0275\u0275conditionalCreate(116, Vendors_Conditional_116_Template, 2, 0, "span", 66)(117, Vendors_Conditional_117_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(118, "div", 63)(119, "p", 64);
      \u0275\u0275text(120, "Remaining");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "p", 68);
      \u0275\u0275conditionalCreate(122, Vendors_Conditional_122_Template, 2, 0, "span", 66)(123, Vendors_Conditional_123_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(124, "div", 63)(125, "p", 64);
      \u0275\u0275text(126, "Labors");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "p", 65);
      \u0275\u0275conditionalCreate(128, Vendors_Conditional_128_Template, 2, 0, "span", 66)(129, Vendors_Conditional_129_Template, 1, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(130, "div", 69)(131, "div", 70)(132, "div", 71)(133, "div", 72)(134, "div", 73)(135, "button", 74);
      \u0275\u0275listener("click", function Vendors_Template_button_click_135_listener() {
        return ctx.toggleAddLaborForm();
      });
      \u0275\u0275elementStart(136, "div", 75)(137, "div", 76)(138, "span", 77);
      \u0275\u0275text(139);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(140, "span", 78);
      \u0275\u0275text(141);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(142, "span", 79);
      \u0275\u0275text(143);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(144, Vendors_Conditional_144_Template, 41, 24, "div", 80);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(145, Vendors_Conditional_145_Template, 5, 0, "div", 81)(146, Vendors_Conditional_146_Template, 7, 0, "div", 82)(147, Vendors_Conditional_147_Template, 21, 0, "div", 83);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(148, "div", 84)(149, "button", 85);
      \u0275\u0275listener("click", function Vendors_Template_button_click_149_listener() {
        return ctx.closeLaborModal();
      });
      \u0275\u0275text(150, " Done ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(151, "app-common-dialog", 86);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_151_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275conditionalCreate(152, Vendors_Conditional_152_Template, 10, 2, "div", 87);
      \u0275\u0275elementStart(153, "div", 88)(154, "div", 89);
      \u0275\u0275repeaterCreate(155, Vendors_For_156_Template, 8, 9, "div", 90, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(157, "div", 91);
      \u0275\u0275conditionalCreate(158, Vendors_Conditional_158_Template, 39, 7, "div", 92);
      \u0275\u0275conditionalCreate(159, Vendors_Conditional_159_Template, 40, 6, "div", 92);
      \u0275\u0275conditionalCreate(160, Vendors_Conditional_160_Template, 46, 9, "div", 92);
      \u0275\u0275conditionalCreate(161, Vendors_Conditional_161_Template, 24, 6, "div", 92);
      \u0275\u0275conditionalCreate(162, Vendors_Conditional_162_Template, 5, 1, "div", 93);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(163, "div", 94);
      \u0275\u0275conditionalCreate(164, Vendors_Conditional_164_Template, 4, 1, "button", 95)(165, Vendors_Conditional_165_Template, 2, 0, "button", 96);
      \u0275\u0275conditionalCreate(166, Vendors_Conditional_166_Template, 4, 0, "button", 97)(167, Vendors_Conditional_167_Template, 4, 2, "button", 98);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(168, "app-common-dialog", 99);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_168_listener() {
        return ctx.showInvoiceModal = false;
      });
      \u0275\u0275elementStart(169, "div", 100)(170, "h3", 101);
      \u0275\u0275text(171, "New Invoice Submission");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(172, "button", 102);
      \u0275\u0275listener("click", function Vendors_Template_button_click_172_listener() {
        return ctx.showInvoiceModal = false;
      });
      \u0275\u0275elementStart(173, "span", 103);
      \u0275\u0275text(174, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(175, "div", 104)(176, "div", 105)(177, "div")(178, "label", 106);
      \u0275\u0275text(179, " Invoice # ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(180, "input", 107);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_180_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.invoiceForm.number, $event) || (ctx.invoiceForm.number = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(181, "div")(182, "label", 106);
      \u0275\u0275text(183, " Date ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(184, "input", 108);
      \u0275\u0275listener("change", function Vendors_Template_input_change_184_listener($event) {
        return ctx.onInvoiceDateChange($event.target.value);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(185, "p", 109);
      \u0275\u0275text(186);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(187, "div")(188, "label", 106);
      \u0275\u0275text(189, " Project ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(190, "input", 110);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(191, "div", 111)(192, "div", 112)(193, "label", 113);
      \u0275\u0275text(194, " Items ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(195, "button", 114);
      \u0275\u0275listener("click", function Vendors_Template_button_click_195_listener() {
        return ctx.addInvoiceItem();
      });
      \u0275\u0275elementStart(196, "span", 115);
      \u0275\u0275text(197, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(198, " Add Item ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(199, "div", 116)(200, "span", 117);
      \u0275\u0275text(201, " Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(202, "span", 117);
      \u0275\u0275text(203, " Description ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(204, "span", 118);
      \u0275\u0275text(205, " Qty ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(206, Vendors_Conditional_206_Template, 2, 0, "span", 118);
      \u0275\u0275elementStart(207, "span", 118);
      \u0275\u0275text(208, " Rate (\u20B9) ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(209, "span", 118);
      \u0275\u0275text(210, " Tax % ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(211, "span", 119);
      \u0275\u0275text(212, " Total (\u20B9) ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(213, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275element(214, "div", 120);
      \u0275\u0275elementStart(215, "div", 121);
      \u0275\u0275repeaterCreate(216, Vendors_For_217_Template, 29, 26, "div", 122, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(218, "div", 123)(219, "div", 124)(220, "span", 125);
      \u0275\u0275text(221, " Subtotal (excl. TAX) ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(222, "span", 126);
      \u0275\u0275text(223);
      \u0275\u0275pipe(224, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(225, Vendors_Conditional_225_Template, 3, 0, "div", 127);
      \u0275\u0275elementStart(226, "div", 124)(227, "span", 125);
      \u0275\u0275text(228, " Total TAX ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(229, "span", 128);
      \u0275\u0275text(230);
      \u0275\u0275pipe(231, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(232, "div", 129)(233, "span", 130);
      \u0275\u0275text(234, " Grand Total ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(235, "span", 131);
      \u0275\u0275text(236);
      \u0275\u0275pipe(237, "number");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(238, "div", 132)(239, "button", 133);
      \u0275\u0275listener("click", function Vendors_Template_button_click_239_listener() {
        return ctx.showInvoiceModal = false;
      });
      \u0275\u0275text(240, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(241, "button", 134);
      \u0275\u0275listener("click", function Vendors_Template_button_click_241_listener() {
        return ctx.submitInvoice();
      });
      \u0275\u0275conditionalCreate(242, Vendors_Conditional_242_Template, 3, 0)(243, Vendors_Conditional_243_Template, 3, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(244, "app-common-dialog", 135);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_244_listener() {
        return ctx.showVendorDetailModal = false;
      });
      \u0275\u0275conditionalCreate(245, Vendors_Conditional_245_Template, 49, 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(246, "app-common-dialog", 136);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_246_listener() {
        return ctx.showAuditModal = false;
      });
      \u0275\u0275elementStart(247, "div", 137)(248, "h3", 138);
      \u0275\u0275text(249, "Compliance Audit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(250, "button", 139);
      \u0275\u0275listener("click", function Vendors_Template_button_click_250_listener() {
        return ctx.showAuditModal = false;
      });
      \u0275\u0275elementStart(251, "span", 140);
      \u0275\u0275text(252, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(253, "div", 141)(254, "div")(255, "div", 142)(256, "label", 143);
      \u0275\u0275text(257, "Quality");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(258, "span", 144);
      \u0275\u0275text(259);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(260, "input", 145);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_260_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.quality, $event) || (ctx.auditForm.quality = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(261, "div")(262, "div", 142)(263, "label", 143);
      \u0275\u0275text(264, "Timeliness");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(265, "span", 146);
      \u0275\u0275text(266);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(267, "input", 147);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_267_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.timeliness, $event) || (ctx.auditForm.timeliness = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(268, "div")(269, "div", 142)(270, "label", 143);
      \u0275\u0275text(271, "Safety");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(272, "span", 148);
      \u0275\u0275text(273);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(274, "input", 149);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_input_ngModelChange_274_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.safety, $event) || (ctx.auditForm.safety = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(275, "div", 150)(276, "span", 151);
      \u0275\u0275text(277, "Overall Score");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(278, "span", 152);
      \u0275\u0275text(279);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(280, "div")(281, "label", 153);
      \u0275\u0275text(282, "Observations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(283, "textarea", 154);
      \u0275\u0275twoWayListener("ngModelChange", function Vendors_Template_textarea_ngModelChange_283_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.auditForm.observations, $event) || (ctx.auditForm.observations = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(284, "div", 155)(285, "button", 156);
      \u0275\u0275listener("click", function Vendors_Template_button_click_285_listener() {
        return ctx.showAuditModal = false;
      });
      \u0275\u0275text(286, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(287, "button", 157);
      \u0275\u0275listener("click", function Vendors_Template_button_click_287_listener() {
        return ctx.submitAudit();
      });
      \u0275\u0275conditionalCreate(288, Vendors_Conditional_288_Template, 3, 0)(289, Vendors_Conditional_289_Template, 3, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(290, "app-common-dialog", 158);
      \u0275\u0275listener("closed", function Vendors_Template_app_common_dialog_closed_290_listener() {
        return ctx.showBillingModal = false;
      });
      \u0275\u0275elementStart(291, "div", 159)(292, "h3", 160);
      \u0275\u0275text(293, "Billing Summary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(294, "button", 161);
      \u0275\u0275listener("click", function Vendors_Template_button_click_294_listener() {
        return ctx.showBillingModal = false;
      });
      \u0275\u0275elementStart(295, "span", 8);
      \u0275\u0275text(296, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(297, "div", 162)(298, "div", 163)(299, "div", 164)(300, "p", 165);
      \u0275\u0275text(301, " Total Invoices ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(302, "p", 166);
      \u0275\u0275text(303);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(304, "div", 167)(305, "p", 165);
      \u0275\u0275text(306, " Budget Allocated ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(307, "p", 168);
      \u0275\u0275text(308);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(309, Vendors_Conditional_309_Template, 4, 0, "p", 169);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(310, Vendors_Conditional_310_Template, 6, 3, "div", 170);
      \u0275\u0275elementStart(311, "div", 171);
      \u0275\u0275repeaterCreate(312, Vendors_For_313_Template, 19, 20, "div", 172, _forTrack1, false, Vendors_ForEmpty_314_Template, 5, 0, "div", 173);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(315, "div", 174)(316, "button", 175);
      \u0275\u0275listener("click", function Vendors_Template_button_click_316_listener() {
        ctx.openSubmission();
        return ctx.showBillingModal = false;
      });
      \u0275\u0275elementStart(317, "span", 115);
      \u0275\u0275text(318, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(319, " New Invoice ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(320, "button", 176);
      \u0275\u0275listener("click", function Vendors_Template_button_click_320_listener() {
        return ctx.showBillingModal = false;
      });
      \u0275\u0275text(321, " Close ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.selectedVendor ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.payInvoiceeModal)("showCloseButton", true)("showFooter", true)("primaryLabel", ctx.showBudgetExceedConfirm ? "Raise Request" : "Confirm Payment")("primaryDisabled", ctx.isProcessingPayment);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1(" ", ctx.selectedInvoice == null ? null : ctx.selectedInvoice.invoice_number, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.formatDate(ctx.selectedInvoice == null ? null : ctx.selectedInvoice.invoice_date), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" \u20B9", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.grand_total) || 0)).toLocaleString("en-IN"), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedInvoice && +(ctx.selectedInvoice.paid_amount ?? 0) > 0 ? 23 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" \u20B9", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.subtotal) || 0)).toLocaleString("en-IN"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" \u20B9", (+((ctx.selectedInvoice == null ? null : ctx.selectedInvoice.tax_amount) || 0)).toLocaleString("en-IN"), " ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", (ctx.modalProjectData == null ? null : ctx.modalProjectData.name) || "Project not linked", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSettlementCards ? 42 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSettlementCards ? 43 : -1);
      \u0275\u0275advance(20);
      \u0275\u0275twoWayProperty("ngModel", ctx.paymentForm.amount);
      \u0275\u0275property("max", ctx.remainingAmount);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paymentForm.amount && ctx.paymentForm.amount > ctx.remainingAmount ? 64 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedSettlementType === "lumpsum" && ctx.paymentForm.amount && ctx.paymentForm.amount > 0 ? 65 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paymentForm.amount && ctx.paymentForm.amount > 0 && ctx.selectedInvoice ? 66 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275classProp("text-slate-400", !ctx.paymentForm.mode);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.paymentForm.mode || "Select mode", " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("rotate-180", ctx.showPaymentModeDropdown);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.showPaymentModeDropdown);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.paymentForm.mode === "Cheque" ? 80 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paymentForm.mode && ctx.paymentForm.mode !== "Cash" ? 81 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paymentError ? 82 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showBudgetExceedConfirm && ctx.budgetExceedDetails ? 83 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showCancelInvoiceModal && !!ctx.selectedInvoice)("showCloseButton", true)("showFooter", true)("primaryDisabled", ctx.isCancellingInvoice);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.selectedInvoice == null ? null : ctx.selectedInvoice.invoice_number);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showLaborModal && !!ctx.selectedVendor);
      \u0275\u0275advance(19);
      \u0275\u0275conditional(ctx.laborLoading ? 110 : 111);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.laborLoading ? 116 : 117);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.laborLoading ? 122 : 123);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.laborLoading ? 128 : 129);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1(" ", ctx.showAddLaborForm ? "expand_less" : "person_add", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.showAddLaborForm ? "Cancel" : "Add New Labor", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.showAddLaborForm ? "close" : "add", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAddLaborForm ? 144 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.laborLoading ? 145 : ctx.laborWorkers.length === 0 ? 146 : !ctx.showAddLaborForm ? 147 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("title", \u0275\u0275interpolate1("", ctx.isEditMode ? "Update" : "Onboard New", " Vendor"))("subtitle", \u0275\u0275interpolate(ctx.isEditMode ? "Update vendor information." : "Add vendor information."))("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true)("showDefaultFooterButtons", false);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditMode && ctx.selectedVendor ? 152 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.vendorSteps);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.currentStep === 1 ? 158 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 2 ? 159 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 3 ? 160 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currentStep === 4 ? 161 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.stepError ? 162 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep > 1 ? 164 : 165);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentStep < 4 ? 166 : 167);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showInvoiceModal);
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.invoiceForm.number);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.invoiceForm.rawDate);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Selected: ", ctx.invoiceForm.date);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", (ctx.modalProjectData == null ? null : ctx.modalProjectData.name) || "");
      \u0275\u0275advance(9);
      \u0275\u0275styleProp("grid-template-columns", ctx.hasLaborItems() ? "130px 1fr 60px 70px 100px 80px 90px 32px" : "130px 1fr 60px 100px 80px 90px 32px");
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.hasLaborItems() ? 206 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.invoiceForm.items);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(224, 100, ctx.invoiceForm.subtotal || 0, "1.0-2"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional((ctx.invoiceForm.gstBreakdown == null ? null : ctx.invoiceForm.gstBreakdown.length) > 0 ? 225 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(231, 103, ctx.invoiceForm.taxAmount || 0, "1.0-2"), " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(237, 106, ctx.invoiceForm.grandTotal || 0, "1.0-2"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.isSavingInvoice);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSavingInvoice ? 242 : 243);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showVendorDetailModal && !!ctx.selectedVendor);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedVendor ? 245 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showAuditModal);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate1("", ctx.auditForm.quality, "/10");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.quality);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.auditForm.timeliness, "/10");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.timeliness);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.auditForm.safety, "/10");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.safety);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("text-green-600", ctx.auditScore >= 80)("text-amber-500", ctx.auditScore < 80 && ctx.auditScore >= 50)("text-red-500", ctx.auditScore < 50);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.auditScore, "%");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.auditForm.observations);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.isSavingAudit);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSavingAudit ? 288 : 289);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showBillingModal);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.invoices.length);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.selectedVendor == null ? null : ctx.selectedVendor.budget) ?? "\u2014");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.budgetUsage.exceeded ? 309 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.invoices.length > 0 ? 310 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.invoices);
    }
  }, dependencies: [NgClass, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, NgControlStatus, MaxLengthValidator, PatternValidator, MinValidator, MaxValidator, NgModel, CommonDialogComponent, DecimalPipe, DatePipe], styles: ['@charset "UTF-8";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  --blue: #1a6bff;\n  --blue-light: #e8f0ff;\n  --gold: #c47d00;\n  --gold-bg: #fff8e6;\n  --text-primary: #111827;\n  --text-secondary: #6b7280;\n  --text-muted: #9ca3af;\n  --border: #e5e7eb;\n  --surface: #f9fafb;\n  --white: #ffffff;\n  --radius: 12px;\n  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10);\n  --shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.15);\n}\n.vp-wrapper[_ngcontent-%COMP%] {\n  background: var(--surface);\n  min-height: auto;\n  padding: 40px 48px;\n  width: 100%;\n  margin: 0;\n}\n.vp-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 32px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.vp-header__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.vp-title[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  font-size: 26px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n  letter-spacing: -0.3px;\n}\n.vp-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.vp-subtitle[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-weight: 700;\n}\n.btn-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 18px;\n  border: 1.5px solid var(--border);\n  border-radius: 24px;\n  background: var(--white);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-filter[_ngcontent-%COMP%]:hover, \n.btn-filter.active[_ngcontent-%COMP%] {\n  border-color: var(--blue);\n  color: var(--blue);\n  background: var(--blue-light);\n}\n.btn-add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: var(--blue);\n  color: white;\n  border: none;\n  border-radius: 24px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.3);\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.4);\n  transform: translateY(-1px);\n}\n.btn-add[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.vp-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  padding: 24px 28px 20px;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-md);\n  transform: translateY(-2px);\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 34px;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.stat-value--gold[_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.stat-bar[_ngcontent-%COMP%] {\n  height: 3px;\n  width: 40px;\n  border-radius: 4px;\n  margin-top: 4px;\n}\n.stat-bar--blue[_ngcontent-%COMP%] {\n  background: var(--blue);\n}\n.stat-bar--gold[_ngcontent-%COMP%] {\n  background: var(--gold);\n}\n.vp-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 48px 0;\n  justify-content: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  font-weight: 500;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--border);\n  border-top-color: var(--blue);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.vp-empty[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1.5px dashed var(--border);\n  padding: 48px 40px;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  margin-bottom: 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.vp-empty[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  opacity: 0.35;\n}\n.vp-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.vp-empty[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--blue);\n  font-weight: 600;\n}\n.vp-vendor-list[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  margin-bottom: 24px;\n  overflow: hidden;\n}\n.vendor-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--border);\n  transition: background 0.15s;\n}\n.vendor-card[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.vendor-card[_ngcontent-%COMP%]:hover {\n  background: var(--surface);\n}\n.vendor-card__info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.vendor-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--blue-light);\n  color: var(--blue);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n  letter-spacing: 0.5px;\n}\n.vendor-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.vendor-services[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 320px;\n}\n.vendor-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-shrink: 0;\n}\n.vendor-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.3px;\n}\n.vendor-badge--active[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n}\n.vendor-badge--pending[_ngcontent-%COMP%] {\n  background: #fff8e6;\n  color: var(--gold);\n}\n.vendor-badge--inactive[_ngcontent-%COMP%] {\n  background: var(--surface);\n  color: var(--text-muted);\n}\n.vendor-compliance[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.vp-activity[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  padding: 28px 32px;\n}\n.vp-activity__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.activity-title[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.btn-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: var(--blue);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  transition: opacity 0.15s;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.activity-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 18px 0;\n  border-bottom: 1px solid var(--border);\n}\n.activity-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.activity-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  color: var(--text-secondary);\n}\n.activity-icon--invoice[_ngcontent-%COMP%] {\n  background: #fff8e6;\n  border-color: #f5e0b0;\n  color: var(--gold);\n}\n.activity-icon--cert[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #059669;\n}\n.activity-icon--assign[_ngcontent-%COMP%] {\n  background: var(--blue-light);\n  border-color: #c7d9ff;\n  color: var(--blue);\n}\n.activity-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.activity-item__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 3px;\n}\n.activity-item__desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--text-muted);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.activity-empty[_ngcontent-%COMP%] {\n  padding: 32px 0;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(10, 14, 30, 0.55);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 24px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: 18px;\n  width: 100%;\n  max-width: 740px;\n  max-height: 92vh;\n  overflow-y: auto;\n  box-shadow: var(--shadow-lg);\n  animation: _ngcontent-%COMP%_slideUp 0.25s ease;\n  scrollbar-width: thin;\n  scrollbar-color: var(--border) transparent;\n}\n.modal[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n}\n.modal[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.modal[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--border);\n  border-radius: 4px;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 28px 28px 20px;\n  position: sticky;\n  top: 0;\n  background: var(--white);\n  z-index: 1;\n  border-bottom: 1px solid var(--border);\n}\n.modal__title[_ngcontent-%COMP%] {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.modal__subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.modal__close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  color: var(--text-muted);\n  border-radius: 8px;\n  transition: all 0.15s;\n  line-height: 1;\n}\n.modal__close[_ngcontent-%COMP%]:hover {\n  background: var(--surface);\n  color: var(--text-primary);\n}\n.modal__close[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.modal__form[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group--full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-row--3-1[_ngcontent-%COMP%] {\n  grid-template-columns: 3fr 1.2fr;\n}\n.form-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  margin-bottom: 2px;\n}\n.required-star[_ngcontent-%COMP%] {\n  color: #ef4444;\n  margin-left: 2px;\n}\n.form-optional[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-weight: 400;\n  font-size: 10px;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.form-input[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border: 1.5px solid var(--border);\n  border-radius: 8px;\n  font-size: 14px;\n  color: var(--text-primary);\n  background: var(--white);\n  transition: border-color 0.18s, box-shadow 0.18s;\n  font-family: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--blue);\n  box-shadow: 0 0 0 3px rgba(26, 107, 255, 0.1);\n}\n.form-input--error[_ngcontent-%COMP%] {\n  border-color: #ef4444 !important;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08) !important;\n}\n.mt-8[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.form-hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.form-error[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #ef4444;\n  font-weight: 500;\n  margin-top: 2px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.form-error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 10px;\n}\n.form-api-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: #fff1f1;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #dc2626;\n  font-size: 13px;\n  font-weight: 500;\n}\n.form-api-error[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.upload-zone[_ngcontent-%COMP%] {\n  border: 2px dashed var(--border);\n  border-radius: 10px;\n  padding: 32px 20px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: var(--surface);\n}\n.upload-zone[_ngcontent-%COMP%]:hover {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone--dragging[_ngcontent-%COMP%] {\n  border-color: var(--blue);\n  background: var(--blue-light);\n  transform: scale(1.01);\n}\n.upload-zone--filled[_ngcontent-%COMP%] {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  color: var(--text-muted);\n}\n.upload-zone__text[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n}\n.upload-zone__text--filled[_ngcontent-%COMP%] {\n  color: var(--blue);\n  text-transform: none;\n  font-weight: 600;\n  font-size: 13px;\n  letter-spacing: 0;\n}\n.modal__actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 12px;\n  margin-top: 8px;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  background: white;\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  border-color: var(--text-secondary);\n  color: var(--text-primary);\n  background: var(--surface);\n}\n.btn-cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-approve[_ngcontent-%COMP%] {\n  padding: 13px;\n  border: none;\n  border-radius: 10px;\n  background: var(--blue);\n  color: white;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.35);\n}\n.btn-approve[_ngcontent-%COMP%]:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.45);\n  transform: translateY(-1px);\n}\n.btn-approve[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn-approve[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n  box-shadow: none !important;\n}\n.btn-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: center;\n}\n.spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 0.9s linear infinite;\n}\n@media (max-width: 768px) {\n  .vp-wrapper[_ngcontent-%COMP%] {\n    padding: 24px 20px;\n  }\n  .vp-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .vp-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .vp-header__right[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-row--3-1[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal__actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .vendor-services[_ngcontent-%COMP%] {\n    max-width: 180px;\n  }\n}\ninput[type=date][_ngcontent-%COMP%] {\n  cursor: pointer;\n}\ninput[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n}\n/*# sourceMappingURL=vendors.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Vendors, [{
    type: Component,
    args: [{ selector: "app-vendors", standalone: false, template: `<section class="px-4 pt-2 pb-6 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
  @if (!selectedVendor) {\r
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">\r
    <div class="space-y-1">\r
      <h2 class="text-3xl font-black tracking-tight text-slate-800 dark:text-white">\r
        Vendors &amp; Partners\r
      </h2>\r
      <p class="text-slate-500 mt-1 text-sm font-medium">\r
        Coordinate with {{ stats.totalActive }} active contractors and material suppliers.\r
      </p>\r
    </div>\r
    <button (click)="openAddModal()"\r
      class="group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] cursor-pointer">\r
      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>\r
      <div\r
        class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">\r
        <span class="material-symbols-outlined text-[20px]">add</span>\r
      </div>\r
      Add New Vendor\r
    </button>\r
  </div>\r
\r
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">\r
    <div\r
      class="group relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">\r
      <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>\r
\r
      <div class="flex items-center justify-between relative z-10">\r
        <div>\r
          <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">\r
            Total Active\r
          </p>\r
\r
          <h3 class="text-4xl font-black mt-3">\r
            {{ stats.totalActive }}\r
          </h3>\r
\r
          <p class="text-xs text-white/70 mt-1">Active Vendors</p>\r
        </div>\r
\r
        <div\r
          class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">\r
          <span class="material-symbols-outlined text-[30px]"> groups </span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div\r
      class="group relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">\r
      <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>\r
\r
      <div class="flex items-center justify-between relative z-10">\r
        <div>\r
          <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">\r
            Pending Payments\r
          </p>\r
\r
          <h3 class="text-4xl font-black mt-3">\r
            \u20B9{{ stats.pendingPayments | number:'1.0-2' }}\r
          </h3>\r
\r
          <p class="text-xs text-white/70 mt-1">Awaiting Clearance</p>\r
        </div>\r
\r
        <div\r
          class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">\r
          <span class="material-symbols-outlined text-[30px]"> payments </span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div\r
      class="group relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">\r
      <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>\r
\r
      <div class="flex items-center justify-between relative z-10">\r
        <div>\r
          <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">\r
            Compliant Partners\r
          </p>\r
\r
          <h3 class="text-4xl font-black mt-3">\r
            {{ stats.compliantPartners }}\r
          </h3>\r
\r
          <p class="text-xs text-white/70 mt-1">Verified & Approved</p>\r
        </div>\r
\r
        <div\r
          class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">\r
          <span class="material-symbols-outlined text-[30px]"> verified </span>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\r
    @for (v of filteredVendors; track v.id) {\r
    <div (click)="openVendorDetail(v)"\r
      class="cursor-pointer bg-surface-container-lowest p-6 rounded-2xl group hover:shadow-2xl hover:border-primary/20 border border-transparent transition-all duration-300 relative overflow-hidden">\r
      <div class="absolute top-0 right-0 p-4">\r
        <span class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full" [ngClass]="v.statusColor">\r
          {{ v.status }}</span>\r
      </div>\r
      <div class="flex items-start gap-4 mb-6">\r
        <div class="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center">\r
          <span class="material-symbols-outlined text-outline">{{ v.icon }}</span>\r
        </div>\r
        <div>\r
          <h3 class="font-bold text-lg text-on-surface leading-tight group-hover:text-primary transition-colors">\r
            {{ v.name }}\r
          </h3>\r
          <p class="text-sm text-outline">{{ v.type }}</p>\r
        </div>\r
      </div>\r
      <div class="space-y-3">\r
        <div class="flex items-center gap-3 text-sm text-on-surface-variant">\r
          <span class="material-symbols-outlined text-lg">mail</span> {{ v.email }}\r
        </div>\r
        <div class="flex items-center gap-3 text-sm text-on-surface-variant">\r
          <span class="material-symbols-outlined text-lg">call</span> {{ v.phone }}\r
        </div>\r
      </div>\r
      <div class="mt-4 flex flex-wrap gap-1.5">\r
        @for (svc of v.skill.slice(0, 3); track svc) {\r
        <span class="px-2 py-0.5 bg-surface-container-low text-[10px] font-bold text-outline rounded-full">{{ svc\r
          }}</span>\r
        }\r
        @if (v.skill.length > 3) {\r
        <span class="px-2 py-0.5 bg-surface-container-low text-[10px] font-bold text-outline rounded-full">+{{\r
          v.skill.length - 3 }}</span>\r
        }\r
      </div>\r
      <div class="mt-5 flex items-center justify-between">\r
        <div>\r
          <p class="text-[10px] font-bold text-outline uppercase tracking-wider">\r
            Compliance Score\r
          </p>\r
          <p class="font-black text-lg" [class.text-green-600]="v.compliance_score >= 90"\r
            [class.text-amber-600]="v.compliance_score < 90 && v.compliance_score >= 70"\r
            [class.text-error]="v.compliance_score < 70">\r
            {{ v.compliance_score }}%\r
          </p>\r
        </div>\r
        <button class="cursor-pointer p-2 text-primary hover:bg-primary/5 rounded-full transition-colors">\r
          <span class="material-symbols-outlined">arrow_forward</span>\r
        </button>\r
      </div>\r
    </div>\r
    } @empty {\r
    <div class="col-span-3 py-24 flex flex-col items-center gap-4 text-outline">\r
      <span class="material-symbols-outlined text-5xl">storefront</span>\r
      <p class="font-bold">No vendors found. Add your first vendor to get started.</p>\r
    </div>\r
    }\r
  </div>\r
\r
  } @else {\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 VENDOR DETAIL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <div class="space-y-8 animate-in slide-in-from-right duration-500">\r
    <div class="flex items-center gap-4 flex-wrap">\r
      <button (click)="closeDetail()"\r
        class="p-2 hover:bg-surface-container rounded-lg cursor-pointer transition-colors">\r
        <span class="material-symbols-outlined">arrow_back</span>\r
      </button>\r
      <div>\r
        <h2 class="text-3xl font-black tracking-tight text-on-surface">\r
          {{ selectedVendor.name }}\r
        </h2>\r
        <p class="text-sm text-outline font-medium">Partner Overview &amp; Execution Hub</p>\r
      </div>\r
      <div class="ml-auto flex gap-3 flex-wrap">\r
        <button\r
          class="px-5 py-2.5 bg-surface-container-highest text-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer"\r
          (click)="openVendorDetailData()">\r
          <span class="material-symbols-outlined text-lg">business_center</span> Vendor Details\r
        </button>\r
        <button\r
          class="px-5 py-2.5 bg-surface-container-highest text-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer"\r
          (click)="openAudit()">\r
          <span class="material-symbols-outlined text-lg">fact_check</span> Audits\r
        </button>\r
        <button\r
          class="px-5 py-2.5 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer"\r
          (click)="openBilling()">\r
          <span class="material-symbols-outlined text-lg">receipt</span> Billing\r
        </button>\r
        <button\r
          class="px-5 py-2.5 bg-surface-container-highest text-secondary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer"\r
          (click)="openLaborModal()">\r
          <span class="material-symbols-outlined text-lg">engineering</span> Labor\r
          @if (laborStats.totalPersonnel > 0) {\r
          <span class="bg-secondary text-white text-[10px] font-black px-2 py-0.5 rounded-full">{{\r
            laborStats.totalPersonnel }}</span>\r
          }\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">\r
      <div\r
        class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between min-h-32 border-l-4 border-primary"\r
        [class.border-red-500]="budgetUsage.exceeded">\r
        <span class="text-xs font-bold text-outline uppercase tracking-widest">Budget Allocated</span>\r
        <p class="text-2xl font-black">{{ selectedVendor.budget }}</p>\r
        @if (budgetUsage.allocated > 0) {\r
        <p class="text-[10px] font-bold mt-1 flex items-center gap-1" [class.text-red-600]="budgetUsage.exceeded"\r
          [class.text-outline]="!budgetUsage.exceeded">\r
          @if (budgetUsage.exceeded) {\r
          <span class="material-symbols-outlined text-[12px]">warning</span>\r
          exceeds the allocated Budget {{ selectedVendor.budget }} by \u20B9{{ budgetUsage.exceededBy | number:'1.0-0' }}\r
          } @else {\r
          {{ budgetUsage.percent }}% utilized\r
          }\r
        </p>\r
        }\r
      </div>\r
      <div\r
        class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-32 border-l-4 border-secondary">\r
        <span class="text-xs font-bold text-outline uppercase tracking-widest">Active Tasks</span>\r
        <p class="text-2xl font-black">{{ allTasks.length }} Tasks</p>\r
      </div>\r
      <div class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-32">\r
        <span class="text-xs font-bold text-outline uppercase tracking-widest">Status</span>\r
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit"\r
          [ngClass]="selectedVendor.statusColor">{{ selectedVendor.status }}</span>\r
      </div>\r
      <div class="bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between h-32">\r
        <div class="flex items-center justify-between">\r
          <span class="text-xs font-bold text-outline uppercase tracking-widest">Compliance</span>\r
          <span class="text-sm font-black" [class.text-green-600]="selectedVendor.compliance_score >= 90"\r
            [class.text-amber-600]="selectedVendor.compliance_score < 90">\r
            {{ selectedVendor.compliance_score }}%\r
          </span>\r
        </div>\r
        <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">\r
          <div class="h-full rounded-full transition-all" [class.bg-green-600]="selectedVendor.compliance_score >= 90"\r
            [class.bg-amber-500]="selectedVendor.compliance_score < 90"\r
            [style.width.%]="selectedVendor.compliance_score"></div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">\r
      <div class="lg:col-span-12 w-full space-y-6">\r
        <div class="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">\r
          <h3 class="text-xl font-black mb-6">Service Tasks &amp; Performance</h3>\r
          <div class="space-y-4">\r
            @for (task of allTasks || []; track task.id) {\r
            <div\r
              class="flex items-center gap-6 p-4 bg-surface-container-low rounded-2xl border border-transparent hover:border-primary/20 transition-all group">\r
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">\r
                <span class="material-symbols-outlined text-primary">\r
                  {{ selectedVendor.icon }}\r
                </span>\r
              </div>\r
\r
              <div class="flex-1">\r
                <div class="flex items-center gap-1 mb-1">\r
                  <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">\r
                    Project :\r
                  </span>\r
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-200">\r
                    {{ projectdata?.name || 'Project not linked' }}\r
                  </span>\r
                </div>\r
\r
                <p class="font-bold text-on-surface">\r
                  {{ task.title }}\r
                </p>\r
\r
                <p class="text-xs text-outline">\r
                  {{ task.due_date | date: 'dd/MMM/yyyy' }}\r
                </p>\r
              </div>\r
\r
              <span class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"\r
                [ngClass]="getTaskStatusColor(task.status)">\r
                {{ task.status }}\r
              </span>\r
            </div>\r
            } @empty {\r
            <p class="text-center py-12 text-outline font-bold italic">\r
              No active tasks detected.\r
            </p>\r
            }\r
          </div>\r
        </div>\r
\r
        <div class="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">\r
          <div class="flex justify-between items-center mb-6">\r
            <h3 class="text-xl font-black">Vendor Invoicing</h3>\r
            <button (click)="openSubmission()"\r
              class="text-primary text-xs font-black uppercase tracking-widest cursor-pointer hover:underline">\r
              + New Submission\r
            </button>\r
          </div>\r
          <table class="w-full text-left">\r
            <thead>\r
              <tr\r
                class="text-[10px] font-black uppercase tracking-widest text-outline border-b border-surface-container">\r
                <th class="py-4">Invoice #</th>\r
                <th class="py-4">Amount</th>\r
                <th class="py-4">Date</th>\r
                <th class="py-4">Status</th>\r
                <th class="py-4">Action</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (inv of invoices; track inv.id) {\r
              <tr class="border-b border-surface-container/50 hover:bg-surface-container-low/30 transition-colors">\r
                <td class="py-4 font-bold">{{ inv.invoice_number }}</td>\r
                <td class="py-4 font-black">\r
                  \u20B9{{ (+inv.grand_total).toLocaleString('en-IN') }}\r
                </td>\r
                <td class="py-4 text-sm text-outline">{{ formatDate(inv.invoice_date) }}</td>\r
                <td class="py-4">\r
                  <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter" [ngClass]="{\r
                          'bg-green-100 text-green-700': inv.status === 'Paid',\r
                          'bg-red-100 text-red-700': inv.status === 'Cancelled',\r
                          'bg-amber-100 text-amber-700':\r
                            inv.status !== 'Paid' && inv.status !== 'Cancelled',\r
                        }">\r
                    {{ inv.status }}\r
                  </span>\r
                </td>\r
                <td class="py-4">\r
                  <div class="flex items-center gap-3">\r
\r
                    <div class="relative group">\r
                      <button (click)="viewInvoice(inv)"\r
                        class="text-primary opacity-80 hover:opacity-100 cursor-pointer">\r
                        <span class="material-symbols-outlined text-sm">visibility</span>\r
                      </button>\r
                      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block \r
                  bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">\r
                        View\r
                      </div>\r
                    </div>\r
\r
                    @if (inv.status !== 'Cancelled' && inv.status !== 'Paid') {\r
                    <div class="relative group">\r
                      <button (click)="payInvoice(inv)"\r
                        class="text-green-600 opacity-80 hover:opacity-100 cursor-pointer">\r
                        <span class="material-symbols-outlined text-sm">payments</span>\r
                      </button>\r
                      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block \r
                    bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">\r
                        Payment\r
                      </div>\r
                    </div>\r
                    }\r
                    @if (inv.status !== 'Cancelled' && inv.status !== 'Paid' && inv.status !== 'Partially Paid') {\r
                    <div class="relative group">\r
                      <button (click)="openCancelInvoiceDialog(inv)"\r
                        class="text-red-600 opacity-80 hover:opacity-100 cursor-pointer">\r
                        <span class="material-symbols-outlined text-sm">cancel</span>\r
                      </button>\r
                      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block \r
                bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">\r
                        Cancel\r
                      </div>\r
                    </div>\r
                    }\r
                  </div>\r
                </td>\r
              </tr>\r
              } @empty {\r
              <tr>\r
                <td colspan="5" class="text-center py-8 text-outline font-bold italic">\r
                  No invoice records found.\r
                </td>\r
              </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
  }\r
  <app-common-dialog [open]="payInvoiceeModal" maxWidth="max-w-3xl" backdropClass="bg-slate-950/60"\r
    panelClass="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-800"\r
    title="Vendor Invoice Payment" subtitle="Review invoice details and record payment" [showCloseButton]="true"\r
    [showFooter]="true" cancelLabel="Cancel"\r
    [primaryLabel]="showBudgetExceedConfirm ? 'Raise Request' : 'Confirm Payment'"\r
    [primaryDisabled]="isProcessingPayment" (closed)="closePayModal()"\r
    (primary)="showBudgetExceedConfirm ? raisePaymentRequest() : confirmPayment()">\r
    <div class="space-y-5 px-1 py-1" (click)="closeAllDropdowns()">\r
      <div\r
        class="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">\r
        <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">\r
          <div class="flex items-start gap-3">\r
            <div\r
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">\r
              <span class="material-symbols-outlined text-[22px]">receipt_long</span>\r
            </div>\r
            <div>\r
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice</p>\r
              <p class="mt-1 text-lg font-black leading-tight text-slate-900 dark:text-white">\r
                {{ selectedInvoice?.invoice_number }}\r
              </p>\r
              <p class="mt-1 text-xs font-semibold text-slate-500">\r
                {{ formatDate(selectedInvoice?.invoice_date) }}\r
              </p>\r
            </div>\r
          </div>\r
\r
          <div\r
            class="rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-slate-200 sm:min-w-[210px] sm:text-right dark:bg-slate-900 dark:ring-slate-800">\r
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">\r
              Grand Total\r
            </p>\r
            <p class="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">\r
              \u20B9{{ (+(selectedInvoice?.grand_total || 0)).toLocaleString('en-IN') }}\r
            </p>\r
            @if (selectedInvoice && +((selectedInvoice.paid_amount) ?? 0) > 0) {\r
            <p class="mt-1 text-[10px] font-semibold text-slate-500">\r
              Already Paid: \u20B9{{ (+((selectedInvoice.paid_amount) || 0)).toLocaleString('en-IN') }}\r
            </p>\r
            <p class="text-[10px] font-semibold text-amber-600">\r
              Remaining: \u20B9{{ remainingAmount.toLocaleString('en-IN') }}\r
            </p>\r
            }\r
          </div>\r
        </div>\r
\r
        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">\r
          <div\r
            class="rounded-xl border border-slate-100 bg-white/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70">\r
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Subtotal</p>\r
            <p class="mt-1 text-sm font-black text-slate-800 dark:text-slate-100">\r
              \u20B9{{ (+(selectedInvoice?.subtotal || 0)).toLocaleString('en-IN') }}\r
            </p>\r
          </div>\r
          <div\r
            class="rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 dark:border-amber-500/20 dark:bg-amber-500/10">\r
            <p class="text-[10px] font-black uppercase tracking-widest text-amber-600/70">\r
              Tax Amount\r
            </p>\r
            <p class="mt-1 text-sm font-black text-amber-700 dark:text-amber-300">\r
              \u20B9{{ (+(selectedInvoice?.tax_amount || 0)).toLocaleString('en-IN') }}\r
            </p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">\r
        <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">\r
          <div class="flex items-center text-sm">\r
            <span class="font-black text-slate-500 uppercase mr-2"> Project : </span>\r
\r
            <span class="font-black text-slate-800 dark:text-slate-100">\r
              {{ modalProjectData?.name || 'Project not linked' }}\r
            </span>\r
          </div>\r
          @if (showSettlementCards) {\r
          <span\r
            class="w-fit rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">\r
            Settlement Mapping\r
          </span>\r
          }\r
        </div>\r
\r
        @if (showSettlementCards) {\r
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">\r
          <div (click)="onSettlementTypeChange('work_poc')" [ngClass]="\r
                selectedSettlementType === 'work_poc'\r
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'\r
                  : 'bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50/70 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-blue-500/10'\r
              "\r
            class="cursor-pointer rounded-2xl border p-4 flex flex-col items-center justify-center gap-1 transition-all">\r
            <span class="material-symbols-outlined text-2xl">account_balance_wallet</span>\r
            <p class="text-xs font-black uppercase tracking-wider">Work POC</p>\r
            @if (modalProjectData?.work_poc_completion != null) {\r
            <p class="text-[10px] font-bold mt-1 opacity-80">\r
              {{ modalProjectData.work_poc_completion }}% complete\r
            </p>\r
            }\r
          </div>\r
          <div (click)="onSettlementTypeChange('milestone')" [ngClass]="\r
                selectedSettlementType === 'milestone'\r
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'\r
                  : 'bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50/70 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-blue-500/10'\r
              "\r
            class="cursor-pointer rounded-2xl border p-4 flex flex-col items-center justify-center gap-1 transition-all">\r
            <span class="material-symbols-outlined text-2xl">flag</span>\r
            <p class="text-xs font-black uppercase tracking-wider">Milestone</p>\r
            @if (modalProjectData?.milestone_completion != null) {\r
            <p class="text-[10px] font-bold mt-1 opacity-80">\r
              {{ modalProjectData.milestone_completion }}% complete\r
            </p>\r
            }\r
          </div>\r
          <div (click)="onSettlementTypeChange('lumpsum')" [ngClass]="\r
                selectedSettlementType === 'lumpsum'\r
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'\r
                  : 'bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50/70 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-blue-500/10'\r
              "\r
            class="cursor-pointer rounded-2xl border p-4 flex flex-col items-center justify-center gap-1 transition-all">\r
            <span class="material-symbols-outlined text-2xl">payments</span>\r
            <p class="text-xs font-black uppercase tracking-wider">Lump Sum</p>\r
            @if (modalProjectData?.lumpsum_completion != null) {\r
            <p class="text-[10px] font-bold mt-1 opacity-80">\r
              {{ modalProjectData.lumpsum_completion }}% complete\r
            </p>\r
            }\r
          </div>\r
        </div>\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
          <div class="relative">\r
            <label\r
              class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Milestone</label>\r
            <div class="relative">\r
              <button type="button" (click)="milestoneDropdownOpen = !milestoneDropdownOpen; $event.stopPropagation()"\r
                class="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer dark:bg-slate-950 dark:border-slate-700">\r
                <span class="truncate text-slate-600 dark:text-slate-300">\r
                  {{\r
                  selectedMilestoneIds.length === 0\r
                  ? 'Select milestones'\r
                  : selectedMilestoneIds.length +\r
                  '\r
                  milestone(s) selected'\r
                  }}\r
                </span>\r
                <span class="material-symbols-outlined text-slate-400 text-sm ml-1">{{\r
                  milestoneDropdownOpen ? 'expand_less' : 'expand_more'\r
                  }}</span>\r
              </button>\r
              @if (milestoneDropdownOpen) {\r
              <div\r
                class="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto dark:bg-slate-950 dark:border-slate-700"\r
                (click)="$event.stopPropagation()">\r
                @if (isLoadingMilestones) {\r
                <div class="flex items-center gap-2 text-slate-400 text-xs p-3">\r
                  <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>\r
                  Loading...\r
                </div>\r
                } @else if (milestones.length === 0) {\r
                <p class="text-xs text-slate-400 italic p-3">No milestones found.</p>\r
                } @else {\r
                @for (m of milestones; track m.id) {\r
                <label\r
                  class="flex items-center gap-2 px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors dark:hover:bg-blue-500/10"\r
                  [class.bg-blue-50]="selectedMilestoneIds.includes(+m.id)">\r
                  <input type="checkbox" [checked]="selectedMilestoneIds.includes(+m.id)"\r
                    (change)="toggleMilestoneSelection(+m.id)"\r
                    class="w-3.5 h-3.5 accent-blue-600 cursor-pointer rounded flex-shrink-0" />\r
                  <span class="text-xs font-semibold text-slate-700 flex-1 truncate dark:text-slate-300">{{ m.name ??\r
                    m.title }}</span>\r
                  @if (m.milestone_progress != null || m.progress != null) {\r
                  <span class="text-[9px] font-black shrink-0"\r
                    [ngClass]="(m.milestone_progress ?? m.progress) >= 100 ? 'text-green-600' : 'text-amber-500'">\r
                    {{ m.milestone_progress ?? m.progress }}%\r
                  </span>\r
                  }\r
                </label>\r
                }\r
                }\r
\r
                <div\r
                  class="shrink-0 px-3 py-2 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-b-xl">\r
                  <button type="button" (click)="applyMilestoneSelection(); $event.stopPropagation()"\r
                    class="w-12 py-1 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors cursor-pointer">\r
                    OK\r
                  </button>\r
                </div>\r
              </div>\r
              }\r
            </div>\r
            <p class="text-[10px] text-slate-400 mt-1">\r
              {{ selectedMilestoneIds.length }} selected\r
            </p>\r
          </div>\r
\r
          <div class="relative">\r
            <label\r
              class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Sub-Milestone</label>\r
            <div class="relative">\r
              <button type="button" (click)="\r
                    subMilestoneDropdownOpen = !subMilestoneDropdownOpen; $event.stopPropagation()\r
                  " [disabled]="availableSubMilestones.length === 0"\r
                class="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-950 dark:border-slate-700">\r
                <span class="truncate text-slate-600 dark:text-slate-300">\r
                  {{\r
                  selectedSubMilestoneIds.length === 0\r
                  ? availableSubMilestones.length === 0\r
                  ? 'Select milestone\r
                  first'\r
                  : 'Select sub-milestones'\r
                  : selectedSubMilestoneIds.length + ' sub-milestone(s) selected'\r
                  }}\r
                </span>\r
                <span class="material-symbols-outlined text-slate-400 text-sm ml-1">{{\r
                  subMilestoneDropdownOpen ? 'expand_less' : 'expand_more'\r
                  }}</span>\r
              </button>\r
              @if (subMilestoneDropdownOpen && selectedMilestoneIds.length > 0) {\r
              <div\r
                class="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto dark:bg-slate-950 dark:border-slate-700"\r
                (click)="$event.stopPropagation()">\r
                @if (availableSubMilestones.length === 0) {\r
                <div class="px-3 py-2.5 text-xs text-slate-400 italic">\r
                  No sub-milestones found for selected milestones.\r
                </div>\r
                } @else {\r
                @for (sm of availableSubMilestones; track sm.id) {\r
                <label\r
                  class="flex items-center gap-2 px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors dark:hover:bg-blue-500/10"\r
                  [class.bg-blue-50]="selectedSubMilestoneIds.includes(+sm.id)">\r
                  <input type="checkbox" [checked]="selectedSubMilestoneIds.includes(+sm.id)"\r
                    (change)="toggleSubMilestoneSelection(+sm.id)"\r
                    class="w-3.5 h-3.5 accent-blue-600 cursor-pointer rounded flex-shrink-0" />\r
                  <span class="text-xs font-semibold text-slate-700 flex-1 truncate dark:text-slate-300">{{ sm.name ??\r
                    sm.title }}</span>\r
                  @if (sm.milestone_progress != null || sm.progress != null) {\r
                  <span class="text-[9px] font-black shrink-0"\r
                    [ngClass]="(sm.milestone_progress ?? sm.progress) >= 100 ? 'text-green-600' : 'text-amber-500'">\r
                    {{ sm.milestone_progress ?? sm.progress }}%\r
                  </span>\r
                  }\r
                </label>\r
                }\r
                }\r
                <!-- OK BUTTON -->\r
                <div\r
                  class="shrink-0 px-3 py-2 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-b-xl">\r
                  <button type="button" (click)="applySubMilestoneSelection(); $event.stopPropagation()"\r
                    class="w-12 py-1 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors cursor-pointer">\r
                    OK\r
                  </button>\r
                </div>\r
              </div>\r
              }\r
            </div>\r
            @if (selectedMilestoneIds.length > 0 && availableSubMilestones.length === 0) {\r
            <p class="text-[10px] text-amber-600 mt-1 flex items-center gap-1">\r
              <span class="material-symbols-outlined text-[12px]">info</span>\r
              Selected milestones has no sub-milestones.\r
            </p>\r
            } @else {\r
            <p class="text-[10px] text-slate-400 mt-1">\r
              {{ selectedSubMilestoneIds.length }} selected\r
            </p>\r
            }\r
          </div>\r
\r
          <!-- Task Dropdown -->\r
          <div class="relative">\r
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Task</label>\r
            <div class="relative">\r
              <button type="button" (click)="taskDropdownOpen = !taskDropdownOpen; $event.stopPropagation()"\r
                [disabled]="availableTaskOptions.length === 0"\r
                class="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-950 dark:border-slate-700">\r
                <span class="truncate text-slate-600 dark:text-slate-300">\r
                  {{\r
                  selectedTaskIds.length === 0\r
                  ? availableTaskOptions.length === 0\r
                  ? 'Select sub-milestone first'\r
                  : 'Select tasks'\r
                  : selectedTaskIds.length + ' task(s) selected'\r
                  }}\r
                </span>\r
                <span class="material-symbols-outlined text-slate-400 text-sm ml-1">{{\r
                  taskDropdownOpen ? 'expand_less' : 'expand_more'\r
                  }}</span>\r
              </button>\r
              @if (taskDropdownOpen && selectedSubMilestoneIds.length > 0) {\r
              <div\r
                class="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto dark:bg-slate-950 dark:border-slate-700"\r
                (click)="$event.stopPropagation()">\r
                @if (availableTaskOptions.length === 0) {\r
                <div class="px-3 py-2.5 text-xs text-slate-400 italic">\r
                  No tasks found for selected sub-milestones.\r
                </div>\r
                } @else {\r
                @for (task of availableTaskOptions; track task.id) {\r
                <label\r
                  class="flex items-center gap-2 px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors dark:hover:bg-blue-500/10"\r
                  [class.bg-blue-50]="selectedTaskIds.includes(+task.id)">\r
                  <input type="checkbox" [checked]="selectedTaskIds.includes(+task.id)"\r
                    (change)="toggleTaskSelection(+task.id)"\r
                    class="w-3.5 h-3.5 accent-blue-600 cursor-pointer rounded flex-shrink-0" />\r
                  <span class="text-xs font-semibold text-slate-700 flex-1 truncate dark:text-slate-300">{{ task.title\r
                    }}</span>\r
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"\r
                    [ngClass]="getTaskStatusColor(task.status)">\r
                    {{ task.status }}\r
                  </span>\r
                </label>\r
                }\r
                }\r
                <!-- OK BUTTON -->\r
                <div\r
                  class="shrink-0 px-3 py-2 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-b-xl">\r
                  <button type="button" (click)="applyTaskSelection(); $event.stopPropagation()"\r
                    class="w-12 py-1 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors cursor-pointer">\r
                    OK\r
                  </button>\r
                </div>\r
              </div>\r
              }\r
            </div>\r
            @if (selectedSubMilestoneIds.length > 0 && availableTaskOptions.length === 0) {\r
            <p class="text-[10px] text-amber-600 mt-1 flex items-center gap-1">\r
              <span class="material-symbols-outlined text-[12px]">info</span>\r
              Selected sub-milestones has no tasks.\r
            </p>\r
            } @else {\r
            <p class="text-[10px] text-slate-400 mt-1">{{ selectedTaskIds.length }} selected</p>\r
            }\r
          </div>\r
\r
          <!-- Settlement Completion -->\r
          <div>\r
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">\r
              {{ settlementCompletionLabel }}\r
            </label>\r
            <input [(ngModel)]="settlementCompletion" type="number" min="0" max="100"\r
              [readonly]="!isSettlementCompletionEditable" [ngClass]="\r
                  isSettlementCompletionEditable\r
                    ? 'bg-white'\r
                    : 'bg-slate-100 text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400'\r
                "\r
              class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-950 dark:border-slate-700" />\r
            <p class="text-[10px] text-slate-400 mt-1">\r
              {{\r
              isSettlementCompletionEditable\r
              ? 'Auto-filled from selection, editable.'\r
              : 'Auto-filled from selection,\r
              read-only.'\r
              }}\r
            </p>\r
          </div>\r
        </div>\r
        }\r
      </div>\r
\r
      <!-- Payment Fields -->\r
      <div\r
        class="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">\r
        <div class="mb-4 flex items-center gap-3">\r
          <div\r
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">\r
            <span class="material-symbols-outlined text-[19px]">payments</span>\r
          </div>\r
          <div>\r
            <p class="text-sm font-black text-slate-900 dark:text-white">Payment Details</p>\r
            <p class="text-[11px] font-semibold text-slate-500">\r
              Enter amount, mode and transaction reference.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <!-- Payment Amount and Mode -->\r
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
          <div>\r
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">\r
              Amount to Pay <span class="text-red-500">*</span>\r
            </label>\r
\r
            <div class="relative">\r
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">\u20B9</span>\r
\r
              <input [(ngModel)]="paymentForm.amount" type="number" min="0" [max]="remainingAmount"\r
                placeholder="Enter Amount"\r
                class="w-full pl-8 pr-3 py-3 border border-slate-200 rounded-xl bg-white text-sm font-black text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />\r
            </div>\r
\r
            <!-- Amount Validation Error -->\r
            @if (paymentForm.amount && paymentForm.amount > remainingAmount) {\r
            <p class="mt-1 text-[10px] font-semibold text-red-600">\r
              Payment amount cannot exceed the remaining invoice balance.\r
            </p>\r
            }\r
\r
            @if (\r
            selectedSettlementType === 'lumpsum' && paymentForm.amount && paymentForm.amount > 0\r
            ) {\r
            <p class="text-[10px] text-emerald-600 mt-1 font-bold flex items-center justify-between">\r
              <span>Lumpsum Payment: \u20B9{{ paymentForm.amount | number: '1.0-0' }}</span>\r
            </p>\r
            }\r
\r
            @if (paymentForm.amount && paymentForm.amount > 0 && selectedInvoice) {\r
            <p class="text-[10px] text-amber-600 mt-1 font-semibold">\r
              Remaining after this: \u20B9{{\r
              Math.max(0, remainingAmount - paymentForm.amount).toLocaleString('en-IN')\r
              }}\r
            </p>\r
            }\r
          </div>\r
\r
          <div>\r
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">\r
              Payment Mode <span class="text-red-500">*</span>\r
            </label>\r
\r
            <div class="relative">\r
              <button type="button" (click)="showPaymentModeDropdown = !showPaymentModeDropdown"\r
                class="w-full flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:border-emerald-400 focus:ring-2 focus:ring-emerald-400 transition-all cursor-pointer">\r
\r
                <span [class.text-slate-400]="!paymentForm.mode">\r
                  {{ paymentForm.mode || 'Select mode' }}\r
                </span>\r
\r
                <span class="material-symbols-outlined text-[18px] text-slate-400"\r
                  [class.rotate-180]="showPaymentModeDropdown">\r
                  expand_more\r
                </span>\r
              </button>\r
\r
              <div *ngIf="showPaymentModeDropdown"\r
                class="absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">\r
\r
                <div class="px-4 py-3 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"\r
                  (click)="onPaymentModeChange('Bank Transfer'); $event.stopPropagation()">\r
                  Bank Transfer\r
                </div>\r
\r
                <div class="px-4 py-3 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"\r
                  (click)="onPaymentModeChange('UPI'); $event.stopPropagation()">\r
                  UPI\r
                </div>\r
\r
                <div class="px-4 py-3 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"\r
                  (click)="onPaymentModeChange('Cheque'); $event.stopPropagation()">\r
                  Cheque\r
                </div>\r
\r
                <div class="px-4 py-3 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"\r
                  (click)="onPaymentModeChange('Cash'); $event.stopPropagation()">\r
                  Cash\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">\r
          @if (paymentForm.mode === 'Cheque') {\r
          <div>\r
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">\r
              Cheque Clearance Date <span class="text-red-500">*</span>\r
            </label>\r
            <input [(ngModel)]="paymentForm.clearance_date" type="date" [min]="threeMonthsAgoDate" [max]="todayDate"\r
              (click)="$event.stopPropagation()"\r
              class="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 cursor-pointer dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />\r
          </div>\r
          }\r
\r
          @if (paymentForm.mode && paymentForm.mode !== 'Cash') {\r
          <div [class.col-span-1]="paymentForm.mode === 'Cheque'"\r
            [class.sm:col-start-2]="paymentForm.mode !== 'Cheque'">\r
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">\r
              Reference / Transaction No.\r
            </label>\r
            <input [value]="paymentForm.reference" (input)="paymentForm.reference = $any($event.target).value"\r
              type="text" placeholder="e.g. UTR123456789" autocomplete="off"\r
              class="w-full border border-slate-200 rounded-xl bg-white px-3 py-3 text-sm font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />\r
          </div>\r
          }\r
        </div>\r
        @if (paymentError) {\r
        <div\r
          class="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 px-4 py-3 rounded-xl dark:bg-red-500/10 dark:border-red-500/20">\r
          <span class="material-symbols-outlined text-red-600 text-[18px] shrink-0 mt-0.5">error</span>\r
          <p class="text-xs font-bold text-red-600 break-words flex-1">{{ paymentError }}</p>\r
        </div>\r
        }\r
        @if (showBudgetExceedConfirm && budgetExceedDetails) {\r
        <div\r
          class="mt-4 flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3 rounded-xl dark:bg-red-500/10 dark:border-red-500/20">\r
          <span class="material-symbols-outlined text-red-600 text-[20px] shrink-0 mt-0.5">warning</span>\r
          <div class="flex-1">\r
            <p class="text-xs font-black text-red-700 mb-1">Budget Exceeded Warning</p>\r
            <p class="text-[11px] font-semibold text-red-600 leading-relaxed">\r
              The entered <strong>Amount to Pay</strong>\r
              (\u20B9{{ budgetExceedDetails.thisAmount | number:'1.0-0' }}) exceeds the allocated\r
              <strong>Budget</strong>\r
              (\u20B9{{ budgetExceedDetails.allocated | number:'1.0-0' }})\r
              by \u20B9{{ budgetExceedDetails.exceededBy | number:'1.0-0' }}.\r
            </p>\r
            <p class="text-[10px] font-bold text-red-500 mt-1">\r
              Raise a Request to continue and allocate Budget, click <strong>"Raise Request"</strong>.\r
            </p>\r
            <button (click)="cancelBudgetExceedConfirm()" type="button"\r
              class="mt-2 text-[10px] font-black text-slate-500 hover:underline cursor-pointer">\r
              \u2190 Edit Amount\r
            </button>\r
          </div>\r
        </div>\r
        }\r
      </div>\r
\r
    </div>\r
  </app-common-dialog>\r
\r
  <app-common-dialog [open]="showCancelInvoiceModal && !!selectedInvoice" size="sm" variant="danger"\r
    title="Cancel Invoice" subtitle="This action will reject the invoice and cannot be undone." icon="delete_forever"\r
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Keep Invoice" primaryLabel="Cancel Invoice"\r
    [primaryDisabled]="isCancellingInvoice" (closed)="closeCancelInvoiceDialog()" (primary)="confirmCancelInvoice()">\r
    <div class="px-6 py-5">\r
      <p class="text-sm font-medium text-slate-600 dark:text-slate-300">\r
        Are you sure you want to cancel invoice\r
        <strong>{{ selectedInvoice?.invoice_number }}</strong>?\r
      </p>\r
    </div>\r
  </app-common-dialog>\r
</section>\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 LABOR MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showLaborModal && !!selectedVendor" maxWidth="max-w-[798px]" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-[2rem] max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 my-4"\r
  (closed)="closeLaborModal()">\r
\r
  <div\r
    class="sticky top-0 z-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4 sm:px-6 py-4 text-white relative shrink-0 overflow-hidden">\r
    <div class="absolute top-0 right-0 p-4 opacity-5 select-none pointer-events-none">\r
      <span class="material-symbols-outlined text-[70px]">engineering</span>\r
    </div>\r
    <div class="flex justify-between items-start gap-4 relative z-10">\r
      <div class="min-w-0">\r
        <h3 class="text-2xl sm:text-xl font-black tracking-tight mt-1 truncate">Labor Details</h3>\r
        <p class="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 break-words">Manage Labor</p>\r
      </div>\r
      <button (click)="closeLaborModal()"\r
        class="p-2 hover:bg-white/10 rounded-lg transition-all cursor-pointer shrink-0">\r
        <span class="material-symbols-outlined text-lg">close</span>\r
      </button>\r
    </div>\r
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 relative z-10">\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">Active</p>\r
        <p class="text-base sm:text-lg font-black mt-0.5 truncate">\r
          @if (laborLoading) { <span class="text-white/30">\u2014</span> } @else { {{ laborStats.activePersonnel }} }\r
        </p>\r
      </div>\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">On Site</p>\r
        <p class="text-base sm:text-lg font-black mt-0.5 text-green-400 truncate">\r
          @if (laborLoading) { <span class="text-white/30">\u2014</span> } @else { {{ laborStats.onSite }} }\r
        </p>\r
      </div>\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">Remaining</p>\r
        <p class="text-base sm:text-lg font-black mt-0.5 text-amber-400 truncate">\r
          @if (laborLoading) { <span class="text-white/30">\u2014</span> } @else { {{ laborStats.remaining }} }\r
        </p>\r
      </div>\r
      <div class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-0">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-white/50 truncate">Labors</p>\r
        <p class="text-base sm:text-lg font-black mt-0.5 truncate">\r
          @if (laborLoading) { <span class="text-white/30">\u2014</span> } @else { {{ laborStats.totalPersonnel }} }\r
        </p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="flex-1 overflow-y-auto p-1 sm:p-2 lg:p-2 pb-56">\r
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">\r
      <div class="lg:col-span-12 min-w-0 space-y-6">\r
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-1 sm:p-2">\r
          <div class="border-2 border-dashed border-outline-variant/20 rounded-2xl">\r
\r
            <button (click)="toggleAddLaborForm()"\r
              class="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 text-left hover:bg-surface-container-low transition-colors cursor-pointer rounded-t-2xl">\r
              <div class="flex items-center gap-3 min-w-0">\r
                <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">\r
                  <span class="material-symbols-outlined text-primary text-base">\r
                    {{ showAddLaborForm ? 'expand_less' : 'person_add' }}\r
                  </span>\r
                </div>\r
                <span class="text-sm font-black text-on-surface truncate">\r
                  {{ showAddLaborForm ? 'Cancel' : 'Add New Labor' }}\r
                </span>\r
              </div>\r
              <span class="material-symbols-outlined text-outline shrink-0">\r
                {{ showAddLaborForm ? 'close' : 'add' }}\r
              </span>\r
            </button>\r
\r
            @if (showAddLaborForm) {\r
            <div class="px-4 sm:px-6 pb-6 space-y-4 border-t border-outline-variant/10">\r
              @if (laborError) {\r
              <div\r
                class="mt-4 flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 px-4 py-3 rounded-xl">\r
                <span class="material-symbols-outlined text-error text-lg shrink-0">error</span>\r
                <p class="text-sm font-bold text-error break-words">{{ laborError }}</p>\r
              </div>\r
              }\r
\r
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" style="overflow:visible;">\r
\r
                <div class="min-w-0 relative">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1.5 block">Skill *</label>\r
                  <button type="button"\r
                    (click)="showSkillDropdown = !showSkillDropdown; showStatusDropdown = false; showAssignDropdown = false; $event.stopPropagation()"\r
                    class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-on-surface transition-all cursor-pointer"\r
                    [ngClass]="showSkillDropdown ? 'border-2 border-primary ring-2 ring-primary/15' : 'border border-slate-300 dark:border-slate-600 hover:border-primary/60'">\r
                    <span [class.text-slate-400]="!newLabor.skill" class="truncate">\r
                      {{ getSkillLabel(newLabor.skill) || 'Select skill' }}\r
                    </span>\r
                    <span\r
                      class="material-symbols-outlined text-sm text-slate-400 shrink-0 transition-transform duration-200"\r
                      [class.rotate-180]="showSkillDropdown">expand_more</span>\r
                  </button>\r
                  @if (showSkillDropdown) {\r
                  <div (click)="$event.stopPropagation()"\r
                    class="absolute z-[999] top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 dark:border-slate-600 overflow-hidden"\r
                    style="max-height:200px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;">\r
                    @for (s of skillOptions; track s.value; let last = $last) {\r
                    <div (click)="newLabor.skill = s.value; showSkillDropdown = false"\r
                      class="flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors"\r
                      [ngClass]="newLabor.skill === s.value ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200'"\r
                      [class.border-b]="!last" [class.border-slate-100]="!last" [class.dark:border-slate-700]="!last">\r
                      @if (newLabor.skill === s.value) {\r
                      <span class="material-symbols-outlined text-primary text-[16px] shrink-0">check</span>\r
                      } @else { <span class="w-4 shrink-0"></span> }\r
                      <p class="text-xs font-semibold truncate">{{ s.label }}</p>\r
                    </div>\r
                    }\r
                  </div>\r
                  }\r
                </div>\r
\r
                <div class="min-w-0">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1.5 block">Daily Rate\r
                    (\u20B9)</label>\r
                  <input [(ngModel)]="newLabor.daily_rate" type="number" min="0" placeholder="e.g. 800"\r
                    class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white dark:bg-slate-900 transition-all" />\r
                </div>\r
\r
                <div class="min-w-0 relative">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1.5 block">Initial\r
                    Status</label>\r
                  <button type="button"\r
                    (click)="showStatusDropdown = !showStatusDropdown; showSkillDropdown = false; showAssignDropdown = false; $event.stopPropagation()"\r
                    class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-on-surface transition-all cursor-pointer"\r
                    [ngClass]="showStatusDropdown ? 'border-2 border-primary ring-2 ring-primary/15' : 'border border-slate-300 dark:border-slate-600 hover:border-primary/60'">\r
                    <span class="truncate capitalize">{{ newLabor.status }}</span>\r
                    <span\r
                      class="material-symbols-outlined text-sm text-slate-400 shrink-0 transition-transform duration-200"\r
                      [class.rotate-180]="showStatusDropdown">expand_more</span>\r
                  </button>\r
                  @if (showStatusDropdown) {\r
                  <div (click)="$event.stopPropagation()"\r
                    class="absolute z-[999] top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 dark:border-slate-600 overflow-hidden">\r
                    <div (click)="newLabor.status = 'active'; showStatusDropdown = false"\r
                      class="flex items-center gap-2 px-4 py-3 cursor-pointer border-b border-slate-100 dark:border-slate-700 transition-colors"\r
                      [ngClass]="newLabor.status === 'active' ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60'">\r
                      <span class="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>\r
                      <p class="text-xs font-semibold">Active</p>\r
                    </div>\r
                    <div (click)="newLabor.status = 'inactive'; showStatusDropdown = false"\r
                      class="flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors"\r
                      [ngClass]="newLabor.status === 'inactive' ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60'">\r
                      <span class="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>\r
                      <p class="text-xs font-semibold">Inactive</p>\r
                    </div>\r
                  </div>\r
                  }\r
                </div>\r
\r
                <div class="min-w-0">\r
                  <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1.5 block">Count (no. of\r
                    labors) *</label>\r
                  <input [(ngModel)]="newLabor.labor_count" type="number" min="1" placeholder="e.g. 5"\r
                    class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white dark:bg-slate-900 transition-all" />\r
                </div>\r
              </div>\r
\r
\r
              <div class="min-w-0 relative">\r
                <label class="text-[9px] font-black uppercase tracking-wide text-outline mb-1.5 block">Assign To</label>\r
                <button type="button"\r
                  (click)="showAssignDropdown = !showAssignDropdown; showSkillDropdown = false; showStatusDropdown = false; $event.stopPropagation()"\r
                  class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-on-surface transition-all cursor-pointer"\r
                  [ngClass]="showAssignDropdown ? 'border-2 border-primary ring-2 ring-primary/15' : 'border border-slate-300 dark:border-slate-600 hover:border-primary/60'">\r
                  <span [class.text-slate-400]="newLabor.assign_worker === null" class="truncate">\r
                    {{ newLabor.assign_worker ?? 'Unassigned' }}\r
                  </span>\r
                  <span\r
                    class="material-symbols-outlined text-sm text-slate-400 shrink-0 transition-transform duration-200"\r
                    [class.rotate-180]="showAssignDropdown">expand_more</span>\r
                </button>\r
                @if (showAssignDropdown) {\r
                <div (click)="$event.stopPropagation()"\r
                  class="absolute z-[999] top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 dark:border-slate-600 overflow-hidden"\r
                  style="max-height:200px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;">\r
                  @for (m of assignableTeam; track m.name; let last = $last) {\r
                  <div (click)="newLabor.assign_worker = m.name; showAssignDropdown = false"\r
                    class="flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors"\r
                    [ngClass]="[newLabor.assign_worker === m.name ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200', !last ? 'border-b border-slate-100 dark:border-slate-700' : '']">\r
                    <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">\r
                      <span class="text-[9px] font-black text-primary">{{ m.name.charAt(0) }}</span>\r
                    </div>\r
                    <p class="text-xs font-semibold truncate">{{ m.name }}</p>\r
                    @if (newLabor.assign_worker === m.name) {\r
                    <span class="material-symbols-outlined text-primary text-[15px] ml-auto shrink-0">check</span>\r
                    }\r
                  </div>\r
                  }\r
                </div>\r
                }\r
              </div>\r
\r
              <button (click)="submitLabor()" [disabled]="isSavingLabor"\r
                class="w-full py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2">\r
                @if (isSavingLabor) {\r
                <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>\r
                Saving\u2026\r
                } @else {\r
                <span class="material-symbols-outlined text-sm">add_circle</span>\r
                Confirm &amp; Add Labor\r
                }\r
              </button>\r
            </div>\r
            }\r
          </div>\r
\r
          @if (laborLoading) {\r
          <div class="py-16 flex flex-col items-center gap-3 text-outline">\r
            <span class="material-symbols-outlined text-4xl animate-spin">progress_activity</span>\r
            <p class="text-sm font-bold">Loading workforce data\u2026</p>\r
          </div>\r
          } @else if (laborWorkers.length === 0) {\r
          <div class="py-16 flex flex-col items-center gap-3 text-outline text-center">\r
            <span class="material-symbols-outlined text-5xl">person_search</span>\r
            <p class="font-bold">No labors assigned yet.</p>\r
            <p class="text-sm">Click "Add Labor" above to onboard the first team member.</p>\r
          </div>\r
\r
          } @else if (!showAddLaborForm) {\r
          <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 mt-3">\r
            <table class="w-full text-sm">\r
              <thead>\r
                <tr class="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">\r
                  <th class="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-outline">Skill\r
                  </th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Labor\r
                    Count</th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Assign\r
                  </th>\r
                  <th class="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-outline">Rate\r
                    (\u20B9/day)</th>\r
                  <th class="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-outline">Daily\r
                    Cost (\u20B9)</th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Status\r
                  </th>\r
                  <th class="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-outline">Action\r
                  </th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (worker of laborWorkers; track worker.id) {\r
\r
                @if (editingLaborId === worker.id) {\r
                <tr class="border-b border-slate-200 dark:border-slate-700 bg-primary/5 dark:bg-primary/10">\r
                  <td colspan="7" class="px-3 py-4">\r
                    <div class="space-y-3">\r
                      <p class="text-[10px] font-black uppercase tracking-widest text-primary">\r
                        Editing Labor #{{ worker.id }}\r
                      </p>\r
\r
                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" style="overflow:visible;">\r
\r
                        <div class="relative col-span-2 sm:col-span-2">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Skill</label>\r
                          <button type="button"\r
                            (click)="showSkillDropdown = !showSkillDropdown; showStatusDropdown = false; showAssignDropdown = false; $event.stopPropagation()"\r
                            class="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-on-surface transition-all cursor-pointer"\r
                            [ngClass]="showSkillDropdown ? 'border-2 border-primary ring-2 ring-primary/15' : 'border border-slate-300 dark:border-slate-600 hover:border-primary/60'">\r
                            <span class="truncate text-[11px]">{{ getSkillLabel(editLaborForm.skill) || 'Select skill'\r
                              }}</span>\r
                            <span\r
                              class="material-symbols-outlined text-sm text-slate-400 shrink-0 transition-transform duration-200 ml-1"\r
                              [class.rotate-180]="showSkillDropdown">expand_more</span>\r
                          </button>\r
                          @if (showSkillDropdown) {\r
\r
                          <div (click)="$event.stopPropagation()"\r
                            class="absolute z-[999] top-[calc(100%+4px)] left-0 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-slate-200 dark:border-slate-600 overflow-hidden"\r
                            style="min-width:200px;max-height:200px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;">\r
                            @for (s of skillOptions; track s.value; let last = $last) {\r
                            <div (click)="editLaborForm.skill = s.value; showSkillDropdown = false"\r
                              class="flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors"\r
                              [ngClass]="[editLaborForm.skill === s.value ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200', !last ? 'border-b border-slate-100 dark:border-slate-700' : '']">\r
                              @if (editLaborForm.skill === s.value) {\r
                              <span class="material-symbols-outlined text-primary text-[14px] shrink-0">check</span>\r
                              } @else { <span class="w-3.5 shrink-0"></span> }\r
                              <p class="text-xs font-semibold whitespace-nowrap">{{ s.label }}</p>\r
                            </div>\r
                            }\r
                          </div>\r
                          }\r
                        </div>\r
\r
\r
                        <div class="min-w-0">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Count</label>\r
                          <input [(ngModel)]="editLaborForm.labor_count" type="number" min="1"\r
                            class="w-full px-2.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white dark:bg-slate-900 transition-all" />\r
                        </div>\r
\r
\r
                        <div class="min-w-0">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Rate (\u20B9)</label>\r
                          <input [(ngModel)]="editLaborForm.daily_rate" type="number" min="0"\r
                            class="w-full px-2.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 bg-white dark:bg-slate-900 transition-all" />\r
                        </div>\r
                      </div>\r
\r
\r
                      <div class="grid grid-cols-2 gap-2" style="overflow:visible;">\r
\r
                        <div class="relative">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Status</label>\r
                          <button type="button"\r
                            (click)="showStatusDropdown = !showStatusDropdown; showSkillDropdown = false; showAssignDropdown = false; $event.stopPropagation()"\r
                            class="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-on-surface transition-all cursor-pointer"\r
                            [ngClass]="showStatusDropdown ? 'border-2 border-primary ring-2 ring-primary/15' : 'border border-slate-300 dark:border-slate-600 hover:border-primary/60'">\r
                            <div class="flex items-center gap-1.5 truncate">\r
                              <span class="w-2 h-2 rounded-full shrink-0"\r
                                [ngClass]="editLaborForm.status === 'active' ? 'bg-green-500' : 'bg-slate-400'"></span>\r
                              <span class="capitalize text-[11px] truncate">{{ editLaborForm.status }}</span>\r
                            </div>\r
                            <span\r
                              class="material-symbols-outlined text-sm text-slate-400 shrink-0 transition-transform duration-200 ml-1"\r
                              [class.rotate-180]="showStatusDropdown">expand_more</span>\r
                          </button>\r
                          @if (showStatusDropdown) {\r
                          <div (click)="$event.stopPropagation()"\r
                            class="absolute z-[999] top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 dark:border-slate-600 overflow-hidden">\r
                            <div (click)="editLaborForm.status = 'active'; showStatusDropdown = false"\r
                              class="flex items-center gap-2 px-3 py-2.5 cursor-pointer border-b border-slate-100 dark:border-slate-700 transition-colors"\r
                              [ngClass]="editLaborForm.status === 'active' ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60'">\r
                              <span class="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>\r
                              <p class="text-xs font-semibold">Active</p>\r
                            </div>\r
                            <div (click)="editLaborForm.status = 'inactive'; showStatusDropdown = false"\r
                              class="flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors"\r
                              [ngClass]="editLaborForm.status === 'inactive' ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60'">\r
                              <span class="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>\r
                              <p class="text-xs font-semibold">Inactive</p>\r
                            </div>\r
                          </div>\r
                          }\r
                        </div>\r
\r
                        <div class="relative">\r
                          <label class="text-[9px] font-bold text-outline uppercase block mb-1">Assign To</label>\r
                          <button type="button"\r
                            (click)="showAssignDropdown = !showAssignDropdown; showSkillDropdown = false; showStatusDropdown = false; $event.stopPropagation()"\r
                            class="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-on-surface transition-all cursor-pointer"\r
                            [ngClass]="showAssignDropdown ? 'border-2 border-primary ring-2 ring-primary/15' : 'border border-slate-300 dark:border-slate-600 hover:border-primary/60'">\r
                            <div class="flex items-center gap-1.5 min-w-0 overflow-hidden">\r
                              @if (editLaborForm.assign_worker) {\r
                              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">\r
                                <span class="text-[8px] font-black text-primary">{{\r
                                  editLaborForm.assign_worker.charAt(0) }}</span>\r
                              </div>\r
                              } @else {\r
                              <span\r
                                class="material-symbols-outlined text-[14px] text-slate-400 shrink-0">person_off</span>\r
                              }\r
                              <span class="text-[11px] truncate">{{ editLaborForm.assign_worker || 'Unassigned'\r
                                }}</span>\r
                            </div>\r
                            <span\r
                              class="material-symbols-outlined text-sm text-slate-400 shrink-0 transition-transform duration-200 ml-1"\r
                              [class.rotate-180]="showAssignDropdown">expand_more</span>\r
                          </button>\r
                          @if (showAssignDropdown) {\r
                          <div (click)="$event.stopPropagation()"\r
                            class="absolute z-[999] top-[calc(100%+4px)] left-0 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-slate-200 dark:border-slate-600 overflow-hidden"\r
                            style="min-width:180px;max-height:200px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;">\r
\r
                            @for (m of assignableTeam; track m.name; let last = $last) {\r
                            <div (click)="editLaborForm.assign_worker = m.name; showAssignDropdown = false"\r
                              class="flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors"\r
                              [ngClass]="[editLaborForm.assign_worker === m.name ? 'bg-primary/8 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200', !last ? 'border-b border-slate-100 dark:border-slate-700' : '']">\r
                              <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">\r
                                <span class="text-[9px] font-black text-primary">{{ m.name.charAt(0) }}</span>\r
                              </div>\r
                              <p class="text-xs font-semibold whitespace-nowrap">{{ m.name }}</p>\r
                              @if (editLaborForm.assign_worker === m.name) {\r
                              <span\r
                                class="material-symbols-outlined text-primary text-[14px] ml-auto shrink-0">check</span>\r
                              }\r
                            </div>\r
                            }\r
                          </div>\r
                          }\r
                        </div>\r
                      </div>\r
\r
                      <div class="flex flex-col sm:flex-row gap-2 pt-1">\r
                        <button (click)="saveLaborEdit(worker.id)"\r
                          class="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide cursor-pointer hover:brightness-110 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5">\r
                          <span class="material-symbols-outlined text-sm">check_circle</span>\r
                          Save Changes\r
                        </button>\r
                        <button (click)="cancelLaborEdit()"\r
                          class="flex-1 py-2.5 rounded-xl border-2 border-outline-variant/30 text-xs font-black uppercase cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">\r
                          Cancel\r
                        </button>\r
                      </div>\r
                    </div>\r
                  </td>\r
                </tr>\r
\r
\r
                } @else {\r
                <tr\r
                  class="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">\r
                  <td class="px-4 py-3 text-sm font-bold text-on-surface">{{ worker.skill }}</td>\r
                  <td class="px-4 py-3 text-center">\r
                    <span class="inline-block px-2.5 py-1 bg-primary/10 text-primary font-black text-xs rounded-lg">{{\r
                      worker.labor_count }}</span>\r
                  </td>\r
                  <td class="px-4 py-3 text-center">\r
                    <span class="inline-block px-2.5 py-1 bg-primary/10 text-primary font-black text-xs rounded-lg">{{\r
                      worker.assign_worker }}</span>\r
                  </td>\r
                  <td class="px-4 py-3 text-right font-semibold text-on-surface">\u20B9{{ worker.daily_rate }}</td>\r
                  <td class="px-4 py-3 text-right font-black text-lg text-primary">\u20B9{{ worker.daily_rate *\r
                    worker.labor_count }}</td>\r
                  <td class="px-4 py-3 text-center">\r
                    <span class="inline-block px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg"\r
                      [ngClass]="worker.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'">\r
                      {{ worker.status }}\r
                    </span>\r
                  </td>\r
                  <td class="px-4 py-3 text-center">\r
                    <div class="flex items-center justify-center gap-2">\r
                      <button (click)="editLaborWorker(worker.id)"\r
                        class="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"\r
                        title="Edit">\r
                        <span class="material-symbols-outlined text-lg">edit</span>\r
                      </button>\r
                      <button (click)="deleteLaborWorker(worker.id)"\r
                        class="p-1.5 text-slate-400 hover:text-error transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"\r
                        title="Delete">\r
                        <span class="material-symbols-outlined text-lg">delete</span>\r
                      </button>\r
                    </div>\r
                  </td>\r
                </tr>\r
                }\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div\r
    class="shrink-0 px-4 sm:px-6 py-3 border-t border-surface-container bg-surface-container-lowest/50 flex justify-end">\r
    <button (click)="closeLaborModal()"\r
      class="w-full sm:w-[90px] py-2 rounded-lg bg-on-surface text-white text-xs font-bold uppercase tracking-wide cursor-pointer shadow-md hover:opacity-90 hover:shadow-lg transition-all">\r
      Done\r
    </button>\r
  </div>\r
</app-common-dialog>\r
\r
<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 ADD / EDIT VENDOR MODAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
<app-common-dialog [open]="showAddModal" maxWidth="max-w-2xl" backdropClass="bg-slate-900/40"\r
  panelClass="bg-white dark:bg-slate-900 rounded-2xl my-auto flex flex-col max-h-[92vh] overflow-hidden"\r
  title="{{ isEditMode ? 'Update' : 'Onboard New' }} Vendor"\r
  subtitle="{{ isEditMode ? 'Update vendor information.' : 'Add vendor information.' }}" [showCloseButton]="true"\r
  [showFooter]="true" [showDefaultFooterButtons]="false" (closed)="showAddModal = false">\r
  @if (isEditMode && selectedVendor) {\r
  <div class="bg-surface-container-low px-3 py-2 rounded-xl flex items-center justify-between h-[42px] mx-6 mt-3">\r
    <span class="text-[11px] font-bold uppercase tracking-widest text-outline">Status</span>\r
    <select\r
      class="px-3 py-1 rounded-full text-[12px] font-bold uppercase cursor-pointer border border-outline-variant/20 outline-none"\r
      (change)="updateVendorStatus($any($event.target).value)" [ngClass]="selectedVendor.statusColor"\r
      [value]="selectedVendor.status">\r
      <option value="Active">Active</option>\r
      <option value="Pending">Pending</option>\r
      <option value="Inactive">Inactive</option>\r
    </select>\r
  </div>\r
  }\r
  <div class="px-6 pt-5 pb-4 shrink-0">\r
    <div class="flex items-center">\r
      @for (step of vendorSteps; track step.num) {\r
      <div class="flex items-center flex-1 min-w-0">\r
        <div class="flex flex-col items-center gap-1 w-28 min-w-0">\r
          <div\r
            class="w-9 h-9 flex-none rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 shrink-0"\r
            [ngClass]="{\r
                'bg-primary text-white shadow-md shadow-primary/30': currentStep === step.num,\r
                'bg-primary/80 text-white': currentStep > step.num,\r
                'bg-slate-200 text-slate-600': currentStep < step.num,\r
              }">\r
            @if (currentStep > step.num) {\r
            <span class="material-symbols-outlined text-sm text-white">check</span>\r
            } @else {\r
            <span [ngClass]="currentStep === step.num ? 'text-white' : 'text-slate-600'">{{\r
              step.num\r
              }}</span>\r
            }\r
          </div>\r
\r
          <span class="text-xs font-bold uppercase tracking-wider whitespace-nowrap"\r
            [ngClass]="currentStep === step.num ? 'text-slate-900' : 'text-outline'">\r
            {{ step.label }}\r
          </span>\r
        </div>\r
\r
        @if (step.num < vendorSteps.length) { <div\r
          class="flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500"\r
          [ngClass]="currentStep > step.num ? 'bg-primary' : 'bg-surface-container'">\r
      </div>\r
      }\r
    </div>\r
    }\r
  </div>\r
  </div>\r
\r
  <div class="flex-1 overflow-y-auto px-6 pb-2" style="min-height: 0">\r
    @if (currentStep === 1) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Vendor Legal Name <span\r
            class="text-error">*</span></label>\r
        <input [(ngModel)]="newVendor.name" type="text" placeholder="e.g. Skyline Structural Engineering"\r
          class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-shadow" />\r
      </div>\r
      <div class="grid grid-cols-2 gap-3">\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">SPOC Name <span\r
              class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.spoc.name" type="text" placeholder="Full Name"\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20" />\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">SPOC Phone <span\r
              class="text-error">*</span></label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.spoc.phone" type="tel" inputmode="numeric" pattern="[0-9]*"\r
              placeholder="10-digit number" maxlength="10" (input)="sanitizePhone($event, 'spoc')"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 pr-12" />\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.spoc.phone?.length ?? 0 }}/10</span>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="grid grid-cols-2 gap-3">\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Official Email <span\r
              class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.email" type="email" placeholder="official@vendor.com"\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20" />\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Official Phone <span\r
              class="text-error">*</span></label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.phone" type="tel" inputmode="numeric" pattern="[0-9]*"\r
              placeholder="10-digit number" maxlength="10" (input)="sanitizePhone($event, 'official')"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 pr-12" />\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.phone?.length ?? 0 }}/10</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    }\r
\r
    @if (currentStep === 2) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
      <div\r
        class="flex items-center justify-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl px-4 py-3">\r
        <span class="material-symbols-outlined text-amber-600 text-base">info</span>\r
        <p class="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed text-center">\r
          Provide <strong>GST No.</strong> or <strong>PAN Card No.</strong> \u2014 at least one is\r
          required.\r
        </p>\r
      </div>\r
      <div class="grid grid-cols-2 gap-3">\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">GST No.</label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.kyc.gst" type="text" maxlength="15" placeholder="22AAAAA0000A1Z5"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-primary/20 pr-12" />\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.kyc.gst?.length ?? 0 }}/15</span>\r
          </div>\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">PAN Card No.</label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.kyc.pan" type="text" maxlength="10" placeholder="ABCDE1234F"\r
              class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-primary/20 pr-12" />\r
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-outline/50">{{\r
              newVendor.kyc.pan?.length ?? 0 }}/10</span>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="grid grid-cols-3 gap-3">\r
        <div class="col-span-2">\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Physical Address\r
            <span class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.address.street" type="text" placeholder="Industrial Area, Sector 5..."\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20" />\r
        </div>\r
        <div>\r
          <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">Pincode <span\r
              class="text-error">*</span></label>\r
          <input [(ngModel)]="newVendor.address.pincode" type="tel" maxlength="6" placeholder="400001"\r
            class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20" />\r
        </div>\r
      </div>\r
    </div>\r
    }\r
\r
    @if (currentStep === 3) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">\r
          Budget Allocation <span class="text-error">*</span>\r
        </label>\r
        <div class="relative">\r
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-outline">\u20B9</span>\r
          <input [(ngModel)]="newVendor.budget" type="text" placeholder="500000"\r
            class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20" />\r
        </div>\r
        <p class="text-[9px] text-outline/70 mt-1">Enter budget in INR (e.g. 500000)</p>\r
      </div>\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">\r
          Project <span class="text-error">*</span>\r
        </label>\r
\r
        <div class="border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-lowest">\r
          <div\r
            class="flex items-center justify-between px-4 py-2.5 bg-surface-container border-b border-outline-variant/10">\r
            <span class="text-[10px] font-bold text-outline">\r
              {{\r
              newVendor.project_ids?.length > 0\r
              ? newVendor.project_ids.length + ' project(s) selected'\r
              : 'Select projects'\r
              }}\r
            </span>\r
            @if (newVendor.project_ids?.length > 0) {\r
            <button type="button" (click)="newVendor.project_ids = []"\r
              class="text-[9px] font-black text-error hover:underline cursor-pointer">\r
              Clear all\r
            </button>\r
            }\r
          </div>\r
\r
          <div class="max-h-44 overflow-y-auto divide-y divide-outline-variant/10">\r
            @for (p of projects; track p.id) {\r
            <label\r
              class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container cursor-pointer transition-colors"\r
              [class.bg-primary/5]="isProjectSelected(p.id)">\r
              <input type="checkbox" [checked]="isProjectSelected(p.id)" (change)="toggleProject(p.id)"\r
                class="w-4 h-4 rounded accent-primary cursor-pointer flex-shrink-0" />\r
              <span class="text-xs font-semibold text-on-surface">{{ p.name }}</span>\r
              @if (isProjectSelected(p.id)) {\r
              <span class="ml-auto material-symbols-outlined text-primary text-base">check</span>\r
              }\r
            </label>\r
            } @empty {\r
            <p class="text-center py-6 text-outline text-xs font-bold italic">\r
              No projects available.\r
            </p>\r
            }\r
          </div>\r
        </div>\r
\r
        @if (newVendor.project_ids?.length > 0) {\r
        <div class="flex flex-wrap gap-1.5 mt-2">\r
          @for (pid of newVendor.project_ids; track pid) {\r
          <span\r
            class="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold flex items-center gap-1.5">\r
            {{ getProjectName(pid) }}\r
            <button type="button" (click)="toggleProject(pid)"\r
              class="cursor-pointer hover:text-error leading-none font-black">\r
              \u2715\r
            </button>\r
          </span>\r
          }\r
        </div>\r
        }\r
        <p class="text-[9px] text-outline/70 mt-1">Multiple projects select kar sakte ho</p>\r
      </div>\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">\r
          Skill / Services Offered <span class="text-error">*</span>\r
        </label>\r
\r
        <div class="border border-outline-variant/20 rounded-xl overflow-hidden bg-surface-container-lowest">\r
          <div\r
            class="flex items-center justify-between px-4 py-2.5 bg-surface-container border-b border-outline-variant/10">\r
            <span class="text-[10px] font-bold text-outline">\r
              {{\r
              newVendor.skill?.length > 0\r
              ? newVendor.skill.length + ' skill(s) selected'\r
              : 'Select skills'\r
              }}\r
            </span>\r
            @if (newVendor.skill?.length > 0) {\r
            <button type="button" (click)="newVendor.skill = []"\r
              class="text-[9px] font-black text-error hover:underline cursor-pointer">\r
              Clear all\r
            </button>\r
            }\r
          </div>\r
\r
          <div class="max-h-44 overflow-y-auto divide-y divide-outline-variant/10">\r
            @for (s of skillOptions; track s.value) {\r
            <label\r
              class="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container cursor-pointer transition-colors"\r
              [class.bg-primary/5]="isSkillSelected(s.label)">\r
              <input type="checkbox" [checked]="isSkillSelected(s.label)" (change)="toggleSkill(s.label)"\r
                class="w-4 h-4 rounded accent-primary cursor-pointer flex-shrink-0" />\r
              <span class="text-xs font-semibold text-on-surface">{{ s.label }}</span>\r
              @if (isSkillSelected(s.label)) {\r
              <span class="ml-auto material-symbols-outlined text-primary text-base">check</span>\r
              }\r
            </label>\r
            } @empty {\r
            <p class="text-center py-6 text-outline text-xs font-bold italic">\r
              No skills available.\r
            </p>\r
            }\r
          </div>\r
        </div>\r
\r
        <p class="text-[9px] text-outline/70 mt-1">Multiple skills select kar sakte ho</p>\r
      </div>\r
\r
      @if (newVendor.skill?.length > 0) {\r
      <div class="flex flex-wrap gap-1.5">\r
        @for (svc of newVendor.skill; track svc) {\r
        <span\r
          class="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold flex items-center gap-1.5">\r
          {{ svc }}\r
          <button type="button" (click)="toggleSkill(svc)"\r
            class="cursor-pointer hover:text-error leading-none font-black">\r
            \u2715\r
          </button>\r
        </span>\r
        }\r
      </div>\r
      }\r
    </div>\r
    }\r
\r
    @if (currentStep === 4) {\r
    <div class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">\r
      @if (isEditMode && selectedVendor && selectedVendor.contract_files.length > 0) {\r
      <div class="space-y-2">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-outline">\r
          Existing Documents ({{ selectedVendor.contract_files.length }})\r
        </p>\r
        @for (file of selectedVendor.contract_files; track file) {\r
        <a [href]="file" target="_blank" rel="noopener noreferrer"\r
          class="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 hover:bg-slate-50 transition-all">\r
          <span class="material-symbols-outlined text-primary text-[16px]">description</span>\r
          <span class="truncate text-[10px] font-medium text-slate-700 dark:text-slate-200">{{\r
            getFileName(file)\r
            }}</span>\r
          <span class="material-symbols-outlined text-slate-400 text-[15px] ml-auto">open_in_new</span>\r
        </a>\r
        }\r
      </div>\r
      }\r
\r
      <div>\r
        <label class="text-[9px] font-black uppercase tracking-widest text-outline mb-1.5 block">\r
          {{ isEditMode ? 'Add More Documents' : 'Contract Documents' }}\r
          <span class="normal-case font-normal text-outline/60 tracking-normal ml-1">(Optional)</span>\r
        </label>\r
        <label\r
          class="border-2 border-dashed border-outline-variant/20 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/30 transition-all cursor-pointer"\r
          [class.border-primary]="contractFiles.length > 0">\r
          <span class="material-symbols-outlined text-primary text-3xl">upload_file</span>\r
          <p class="text-[10px] font-bold text-on-surface">Click to upload or drag &amp; drop</p>\r
          <p class="text-[9px] text-outline/70 text-center">\r
            PDF \xB7 Word (.doc/.docx) \xB7 JPG \xB7 PNG<br />\r
            Max <strong>10 MB</strong> per file \xB7 Up to <strong>10 files</strong>\r
          </p>\r
          <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple class="hidden"\r
            (change)="onContractFilesSelected($event)" />\r
        </label>\r
      </div>\r
\r
      @if (contractFiles.length > 0) {\r
      <div class="space-y-2">\r
        <p class="text-[9px] font-black uppercase tracking-widest text-outline">\r
          {{ contractFiles.length }} naya file{{ contractFiles.length > 1 ? 's' : '' }} selected\r
        </p>\r
        @for (f of contractFiles; track $index) {\r
        <div\r
          class="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 group">\r
          <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" [ngClass]="getFileIconBg(f.name)">\r
            <span class="material-symbols-outlined text-base" [ngClass]="getFileIconColor(f.name)">{{\r
              getFileIcon(f.name) }}</span>\r
          </div>\r
          <div class="flex-1 min-w-0">\r
            <p class="text-xs font-bold text-on-surface truncate">{{ f.name }}</p>\r
            <p class="text-[9px] text-outline font-medium">{{ getFileSize(f.size) }}</p>\r
          </div>\r
          <button (click)="removeContractFile($index)"\r
            class="p-1 text-outline hover:text-error transition-colors rounded-lg hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100">\r
            <span class="material-symbols-outlined text-base">close</span>\r
          </button>\r
        </div>\r
        }\r
      </div>\r
      }\r
\r
      @if (fileError) {\r
      <div class="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">\r
        <span class="material-symbols-outlined text-error text-base">error</span>\r
        <p class="text-xs font-bold text-error">{{ fileError }}</p>\r
      </div>\r
      }\r
    </div>\r
    }\r
\r
    @if (stepError) {\r
    <div class="mt-4 flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 px-4 py-3 rounded-xl">\r
      <span class="material-symbols-outlined text-error text-lg">error</span>\r
      <p class="text-sm font-bold text-error">{{ stepError }}</p>\r
    </div>\r
    }\r
  </div>\r
\r
  <div dialog-footer class="flex gap-3 shrink-0">\r
    @if (currentStep > 1) {\r
    <button (click)="prevStep()" [disabled]="isSaving"\r
      class="flex-1 min-w-[140px] py-2.5 rounded-xl border border-outline-variant/20 text-xs font-black uppercase tracking-wide cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-1">\r
      <span class="material-symbols-outlined text-sm">arrow_back</span> Back\r
    </button>\r
    } @else {\r
    <button (click)="showAddModal = false"\r
      class="flex-1 min-w-[100px] py-2.5 rounded-xl border border-outline-variant/20 text-xs font-black uppercase tracking-wide cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">\r
      Cancel\r
    </button>\r
    }\r
\r
    @if (currentStep < 4) { <button (click)="nextStep()"\r
      class="flex-2 min-w-[140px] py-2.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide cursor-pointer shadow-lg shadow-primary/20 hover:opacity-90 hover:shadow-xl transition-all flex items-center justify-center gap-1">\r
      Next <span class="material-symbols-outlined text-sm">arrow_forward</span>\r
      </button>\r
      } @else {\r
      <button (click)="addVendor()" [disabled]="isSaving"\r
        class="flex-2 min-w-[140px] py-2.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide cursor-pointer shadow-lg shadow-primary/20 hover:opacity-90 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">\r
        @if (isSaving) {\r
        <span class="material-symbols-outlined animate-spin text-xs">progress_activity</span>\r
        Saving...\r
        } @else if (isEditMode) {\r
        <span class="material-symbols-outlined text-sm">save</span> Update\r
        } @else {\r
        <span class="material-symbols-outlined text-sm">check_circle</span> Onboard\r
        }\r
      </button>\r
      }\r
  </div>\r
</app-common-dialog>\r
\r
<app-common-dialog [open]="showInvoiceModal" maxWidth="max-w-3xl" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl max-h-[88vh] flex flex-col my-auto animate-in zoom-in-95 duration-300"\r
  (closed)="showInvoiceModal = false">\r
\r
  <div\r
    class="sticky top-0 z-10 flex justify-between items-center px-6 pt-2 pb-4 border-b border-outline-variant/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-t-3xl shrink-0">\r
    <h3 class="text-xl font-black tracking-tight">New Invoice Submission</h3>\r
\r
    <button (click)="showInvoiceModal = false"\r
      class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer">\r
      <span class="material-symbols-outlined text-[20px]">close</span>\r
    </button>\r
  </div>\r
\r
  <div class="flex-1 overflow-y-auto px-6 py-4 min-h-0">\r
    <div class="grid grid-cols-2 gap-4 mb-6">\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
          Invoice #\r
        </label>\r
\r
        <input [(ngModel)]="invoiceForm.number" type="text" readonly\r
          class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20" />\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
          Date\r
        </label>\r
\r
        <input type="date" [value]="invoiceForm.rawDate" (change)="onInvoiceDateChange($any($event.target).value)"\r
          class="w-full px-3 py-2.5 rounded-xl border border-outline-variant/20 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer" />\r
        <p class="text-[9px] text-outline/60 mt-1">Selected: {{ invoiceForm.date }}</p>\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
          Project\r
        </label>\r
\r
        <input type="text" [value]="modalProjectData?.name || ''" readonly\r
          class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold bg-slate-50 cursor-not-allowed" />\r
      </div>\r
    </div>\r
\r
    <div class="mb-5">\r
      <div class="flex items-center justify-between mb-3">\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline"> Items </label>\r
\r
        <button (click)="addInvoiceItem()"\r
          class="text-primary text-[10px] font-black uppercase tracking-widest cursor-pointer hover:underline flex items-center gap-1">\r
          <span class="material-symbols-outlined text-sm">add</span>\r
          Add Item\r
        </button>\r
      </div>\r
      <div class="grid items-center gap-x-2 mb-1 px-1" [style.grid-template-columns]="\r
          hasLaborItems()\r
            ? '130px 1fr 60px 70px 100px 80px 90px 32px'\r
            : '130px 1fr 60px 100px 80px 90px 32px'\r
        ">\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline"> Type </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline">\r
          Description\r
        </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Qty\r
        </span>\r
\r
        @if (hasLaborItems()) {\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Hours\r
        </span>\r
        }\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Rate (\u20B9)\r
        </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-center">\r
          Tax %\r
        </span>\r
\r
        <span class="text-[9px] font-black uppercase tracking-widest text-outline text-right">\r
          Total (\u20B9)\r
        </span>\r
\r
        <span></span>\r
      </div>\r
\r
      <div class="border-t border-outline-variant/10 mb-2"></div>\r
\r
      <div class="space-y-2">\r
        @for (item of invoiceForm.items; track $index) {\r
        <div class="grid items-center gap-x-2" [style.grid-template-columns]="\r
              hasLaborItems()\r
                ? '130px 1fr 60px 70px 100px 80px 90px 32px'\r
                : '130px 1fr 60px 100px 80px 90px 32px'\r
            ">\r
\r
          <div class="relative">\r
            <button type="button" (click)="$event.stopPropagation(); toggleDropdown(item, 'type')" [class]="'w-full flex items-center justify-between gap-1 px-2 py-2 rounded-xl border bg-surface-container-lowest text-[11px] font-medium outline-none cursor-pointer transition-all ' +\r
                       (item.typeOpen ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/20')">\r
              <span [class]="item.type ? 'text-on-surface' : 'text-outline'">\r
                {{ getTypeLabel(item.type) }}\r
              </span>\r
              <span class="material-symbols-outlined text-outline text-xs transition-transform duration-200"\r
                [class.rotate-180]="item.typeOpen">\r
                expand_more\r
              </span>\r
            </button>\r
\r
            @if (item.typeOpen) {\r
            <div (click)="$event.stopPropagation()"\r
              class="absolute z-20 mt-1 w-full bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-lg overflow-hidden">\r
              @for (opt of typeOptions; track opt.value) {\r
              <div (click)="selectType(item, opt.value)" [class]="'px-3 py-2 text-[11px] font-medium cursor-pointer hover:bg-primary/10 ' +\r
                         (item.type === opt.value ? 'text-primary bg-primary/5' : 'text-on-surface')">\r
                {{ opt.label }}\r
              </div>\r
              }\r
            </div>\r
            }\r
          </div>\r
\r
          <input [(ngModel)]="item.description" type="text" placeholder="Description"\r
            class="w-full px-2 py-2 rounded-xl border border-outline-variant/20 text-[11px] font-medium outline-none focus:ring-2 focus:ring-primary/20" />\r
\r
          <input [(ngModel)]="item.quantity" type="number" min="1" placeholder="1"\r
            (ngModelChange)="calculateInvoiceTotals()"\r
            class="w-full px-2 py-2 rounded-xl border border-outline-variant/20 text-[11px] font-medium text-center outline-none focus:ring-2 focus:ring-primary/20" />\r
\r
          @if (hasLaborItems()) {\r
          @if (item.type === 'labor') {\r
          <input [(ngModel)]="item.hours" type="number" min="1" placeholder="Hrs"\r
            (ngModelChange)="calculateInvoiceTotals()"\r
            class="w-full px-2 py-2 rounded-xl border border-primary/30 bg-primary/5 text-[11px] font-medium text-center outline-none" />\r
          } @else {\r
          <div></div>\r
          }\r
          }\r
\r
          <div class="relative">\r
            <span class="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-black text-outline/60">\r
              \u20B9\r
            </span>\r
\r
            <input [(ngModel)]="item.unitPrice" type="number" min="0" placeholder="0"\r
              (ngModelChange)="calculateInvoiceTotals()"\r
              class="w-full pl-5 pr-2 py-2 rounded-xl border border-outline-variant/20 text-[11px] font-medium outline-none focus:ring-2 focus:ring-primary/20" />\r
          </div>\r
\r
          <div class="relative">\r
            <button type="button" (click)="$event.stopPropagation(); toggleDropdown(item, 'gst')" [class]="'w-full flex items-center justify-between gap-1 px-2 py-2 rounded-xl border bg-surface-container-lowest text-[11px] font-bold outline-none cursor-pointer transition-all ' +\r
                       (item.gstOpen ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/20')">\r
              <span class="text-on-surface">{{ item.gst }}%</span>\r
              <span class="material-symbols-outlined text-outline text-xs transition-transform duration-200"\r
                [class.rotate-180]="item.gstOpen">\r
                expand_more\r
              </span>\r
            </button>\r
\r
            @if (item.gstOpen) {\r
            <div (click)="$event.stopPropagation()"\r
              class="absolute z-20 mt-1 w-full bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-lg overflow-hidden">\r
              @for (opt of gstOptions; track opt.value) {\r
              <div (click)="selectGst(item, opt.value)" [class]="'px-3 py-2 text-[11px] font-bold cursor-pointer hover:bg-primary/10 text-center ' +\r
                         (item.gst === opt.value ? 'text-primary bg-primary/5' : 'text-on-surface')">\r
                {{ opt.label }}\r
              </div>\r
              }\r
            </div>\r
            }\r
          </div>\r
\r
          <div class="text-right">\r
            <p class="text-[11px] font-black text-on-surface">\r
              \u20B9{{ item.total || 0 | number: '1.0-2' }}\r
            </p>\r
\r
            @if (item.gstAmount > 0) {\r
            <p class="text-[8px] text-outline leading-tight">\r
              incl. \u20B9{{ item.gstAmount | number: '1.0-2' }} TAX\r
            </p>\r
            }\r
          </div>\r
\r
          @if (invoiceForm.items.length > 1) {\r
          <button (click)="removeInvoiceItem($index)"\r
            class="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-error transition-colors rounded-lg hover:bg-red-50 cursor-pointer flex-shrink-0">\r
            <span class="material-symbols-outlined text-sm"> delete </span>\r
          </button>\r
          } @else {\r
          <div class="w-8 h-8"></div>\r
          }\r
        </div>\r
        }\r
      </div>\r
    </div>\r
\r
    <div class="bg-surface-container-low rounded-2xl p-4 space-y-2.5">\r
      <div class="flex justify-between text-xs">\r
        <span class="font-bold text-outline"> Subtotal (excl. TAX) </span>\r
\r
        <span class="font-black"> \u20B9{{ invoiceForm.subtotal || 0 | number: '1.0-2' }} </span>\r
      </div>\r
\r
      @if (invoiceForm.gstBreakdown?.length > 0) {\r
      <div class="space-y-1">\r
        @for (gb of invoiceForm.gstBreakdown; track gb.rate) {\r
        <div class="flex justify-between text-[10px]">\r
          <span class="text-outline"> TAX @ {{ gb.rate }}% </span>\r
\r
          <span class="font-bold text-amber-600"> \u20B9{{ gb.amount | number: '1.0-2' }} </span>\r
        </div>\r
        }\r
      </div>\r
      }\r
\r
      <div class="flex justify-between text-xs">\r
        <span class="font-bold text-outline"> Total TAX </span>\r
\r
        <span class="font-black text-amber-600">\r
          \u20B9{{ invoiceForm.taxAmount || 0 | number: '1.0-2' }}\r
        </span>\r
      </div>\r
\r
      <div class="flex justify-between text-sm border-t border-outline-variant/10 pt-2.5">\r
        <span class="font-black text-on-surface"> Grand Total </span>\r
\r
        <span class="font-black text-primary text-base">\r
          \u20B9{{ invoiceForm.grandTotal || 0 | number: '1.0-2' }}\r
        </span>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="flex gap-3 px-6 py-4 border-t border-outline-variant/10 shrink-0">\r
    <button (click)="showInvoiceModal = false"\r
      class="flex-1 py-3 rounded-2xl border border-outline-variant/20 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">\r
      Cancel\r
    </button>\r
\r
    <button (click)="submitInvoice()" [disabled]="isSavingInvoice"\r
      class="flex-1 py-3 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest cursor-pointer shadow-lg shadow-primary/20 hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">\r
      @if (isSavingInvoice) {\r
      <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>\r
      Saving...\r
      } @else {\r
      <span class="material-symbols-outlined text-sm">send</span>\r
      Submit Invoice\r
      }\r
    </button>\r
  </div>\r
</app-common-dialog>\r
\r
<app-common-dialog [open]="showVendorDetailModal && !!selectedVendor" maxWidth="max-w-2xl"\r
  backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl flex flex-col max-h-[92vh] overflow-hidden"\r
  (closed)="showVendorDetailModal = false">\r
  @if (selectedVendor) {\r
  <div class="flex justify-between items-center px-5 pt-4 pb-2 border-b border-outline-variant/10">\r
    <h3 class="text-2xl font-black tracking-tight">Vendor Details</h3>\r
\r
    <div class="flex items-center gap-2">\r
      <span (click)="editVendorDetail(selectedVendor)"\r
        class="w-[34px] h-[34px] flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">\r
        <span class="material-symbols-outlined text-[18px]">edit</span>\r
      </span>\r
\r
      <button (click)="showVendorDetailModal = false"\r
        class="w-[34px] h-[34px] flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">\r
        <span class="material-symbols-outlined text-[18px]">close</span>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div class="px-5 py-3 space-y-3 overflow-y-auto">\r
    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl space-y-3">\r
      <div class="flex items-center justify-between">\r
        <h3 class="text-[14px] font-black">Contact Details</h3>\r
\r
        <div class="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded-full">\r
          <span class="material-symbols-outlined text-[13px]">verified</span>\r
          <span class="text-[10px] font-bold uppercase">Verified</span>\r
        </div>\r
      </div>\r
\r
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">\r
        <div class="bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2 space-y-1">\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">SPOC</p>\r
          <p class="text-[12px] font-bold">{{ selectedVendor.spoc.name }}</p>\r
          <p class="text-[14px] text-slate-500">{{ selectedVendor.spoc.email }}</p>\r
          <p class="text-[12px] text-slate-500">{{ selectedVendor.spoc.phone }}</p>\r
        </div>\r
\r
        <div class="bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2 space-y-1">\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">GST</p>\r
          <p class="text-[12px] font-bold uppercase break-all">\r
            {{ selectedVendor.kyc.gst || '\u2014' }}\r
          </p>\r
\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">PAN</p>\r
          <p class="text-[12px] font-bold uppercase break-all">\r
            {{ selectedVendor.kyc.pan || '\u2014' }}\r
          </p>\r
        </div>\r
\r
        <div class="bg-slate-50 dark:bg-slate-900/40 rounded-xl px-3 py-2 space-y-1 col-span-1 md:col-span-2">\r
          <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">Skills</p>\r
          <div class="flex flex-wrap gap-1">\r
            @for (svc of selectedVendor.skill; track svc) {\r
            <span class="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">\r
              {{ svc }}\r
            </span>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      @if (selectedVendor.contract_files.length > 0) {\r
      <div class="space-y-2">\r
        <p class="text-[12px] font-black uppercase tracking-widest text-slate-400">\r
          Documents ({{ selectedVendor.contract_files.length }})\r
        </p>\r
\r
        <div class="flex flex-col gap-2 max-h-[120px] overflow-y-auto">\r
          @for (file of selectedVendor.contract_files; track file) {\r
          <a [href]="file" target="_blank"\r
            class="flex items-center justify-between bg-slate-50 dark:bg-slate-900/40 px-3 py-2 rounded-xl">\r
            <span class="text-[12px] font-medium truncate">\r
              {{ getFileName(file) }}\r
            </span>\r
\r
            <span class="material-symbols-outlined text-[15px] text-slate-400">download</span>\r
          </a>\r
          }\r
        </div>\r
      </div>\r
      }\r
    </div>\r
  </div>\r
\r
  <div class="px-5 pb-4 pt-2 flex justify-center">\r
    <button (click)="showVendorDetailModal = false"\r
      class="w-[110px] h-[34px] rounded-lg bg-slate-200 dark:bg-slate-700 text-[11px] font-bold uppercase cursor-pointer">\r
      Close\r
    </button>\r
  </div>\r
  }\r
</app-common-dialog>\r
\r
<app-common-dialog [open]="showAuditModal" maxWidth="max-w-2xl" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl p-5 max-h-[92vh] overflow-hidden"\r
  (closed)="showAuditModal = false">\r
  <div class="flex justify-between items-start mb-5">\r
    <h3 class="text-2xl font-black leading-none">Compliance Audit</h3>\r
    <button (click)="showAuditModal = false"\r
      class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">\r
      <span class="material-symbols-outlined text-[18px]">close</span>\r
    </button>\r
  </div>\r
  <div class="space-y-5">\r
    <div>\r
      <div class="flex items-center justify-between mb-2">\r
        <label class="text-xs font-black uppercase tracking-wide">Quality</label>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary">{{ auditForm.quality\r
          }}/10</span>\r
      </div>\r
      <input [(ngModel)]="auditForm.quality" type="range" min="1" max="10"\r
        class="w-full h-2 accent-primary cursor-pointer" />\r
    </div>\r
    <div>\r
      <div class="flex items-center justify-between mb-2">\r
        <label class="text-xs font-black uppercase tracking-wide">Timeliness</label>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">{{\r
          auditForm.timeliness }}/10</span>\r
      </div>\r
      <input [(ngModel)]="auditForm.timeliness" type="range" min="1" max="10"\r
        class="w-full h-2 accent-secondary cursor-pointer" />\r
    </div>\r
    <div>\r
      <div class="flex items-center justify-between mb-2">\r
        <label class="text-xs font-black uppercase tracking-wide">Safety</label>\r
        <span class="text-[10px] font-black px-2.5 py-1 rounded-full bg-green-100 text-green-700">{{ auditForm.safety\r
          }}/10</span>\r
      </div>\r
      <input [(ngModel)]="auditForm.safety" type="range" min="1" max="10" class="w-full h-2 cursor-pointer"\r
        style="accent-color: #16a34a" />\r
    </div>\r
    <div class="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between">\r
      <span class="text-[11px] font-black uppercase tracking-wider text-outline">Overall Score</span>\r
      <span class="text-2xl font-black" [class.text-green-600]="auditScore >= 80"\r
        [class.text-amber-500]="auditScore < 80 && auditScore >= 50" [class.text-red-500]="auditScore < 50">{{\r
        auditScore }}%</span>\r
    </div>\r
    <div>\r
      <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-2 block">Observations</label>\r
      <textarea [(ngModel)]="auditForm.observations" rows="3" placeholder="Add observations or audit notes..."\r
        class="w-full px-3 py-3 rounded-2xl border border-outline-variant/20 text-xs font-medium outline-none resize-none focus:ring-2 focus:ring-primary/20"></textarea>\r
    </div>\r
  </div>\r
  <div class="flex gap-3 mt-6">\r
    <button (click)="showAuditModal = false"\r
      class="flex-1 py-3 rounded-xl border border-outline-variant/20 text-xs font-black uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">\r
      Cancel\r
    </button>\r
    <button (click)="submitAudit()" [disabled]="isSavingAudit"\r
      class="flex-1 py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed">\r
      @if (isSavingAudit) {\r
      <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>\r
      Saving...\r
      } @else {\r
      <span class="material-symbols-outlined text-sm">task_alt</span> Submit Audit\r
      }\r
    </button>\r
  </div>\r
</app-common-dialog>\r
\r
<app-common-dialog [open]="showBillingModal" maxWidth="max-w-2xl" backdropClass="bg-slate-900/50"\r
  panelClass="bg-white dark:bg-slate-900 rounded-3xl max-h-[88vh] flex flex-col p-0 animate-in zoom-in-95 duration-300"\r
  (closed)="showBillingModal = false">\r
\r
  <div\r
    class="sticky top-0 z-10 flex justify-between items-center px-5 pt-5 pb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-t-3xl shrink-0">\r
    <h3 class="text-2xl font-black tracking-tight">Billing Summary</h3>\r
    <button (click)="showBillingModal = false"\r
      class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer">\r
      <span class="material-symbols-outlined text-[22px]">close</span>\r
    </button>\r
  </div>\r
\r
  <div class="flex-1 overflow-y-auto px-5 pb-2 min-h-0">\r
    <div class="grid grid-cols-2 gap-4 mb-5 mt-1">\r
      <div class="bg-surface-container-low p-5 rounded-2xl text-center">\r
        <p class="text-[10px] font-black uppercase tracking-widest text-outline mb-2">\r
          Total Invoices\r
        </p>\r
        <p class="text-3xl font-black text-on-surface">{{ invoices.length }}</p>\r
      </div>\r
      <div class="bg-primary/5 border border-primary/10 p-5 rounded-2xl text-center">\r
        <p class="text-[10px] font-black uppercase tracking-widest text-outline mb-2">\r
          Budget Allocated\r
        </p>\r
        <p class="text-xl font-black text-primary">{{ selectedVendor?.budget ?? '\u2014' }}</p>\r
        @if (budgetUsage.exceeded) {\r
        <p class="text-[9px] font-bold text-red-600 mt-1 flex items-center justify-center gap-1">\r
          <span class="material-symbols-outlined text-[11px]">warning</span>\r
          Exceeded\r
        </p>\r
        }\r
      </div>\r
    </div>\r
\r
    @if (invoices.length > 0) {\r
    <div class="mb-4 flex items-center justify-between px-1">\r
      <span class="text-xs font-bold text-outline uppercase tracking-wider">Total Billed</span>\r
      <span class="font-black text-primary text-lg">\u20B9{{ totalBilled | number }}</span>\r
    </div>\r
    }\r
\r
    <div class="space-y-3 pr-1">\r
      @for (inv of invoices; track inv.id) {\r
      <div\r
        class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors">\r
        <div class="flex items-center gap-3">\r
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" [ngClass]="{\r
                'bg-green-100': inv.status === 'Paid',\r
                'bg-red-100': inv.status === 'Cancelled',\r
                'bg-amber-100': inv.status !== 'Paid' && inv.status !== 'Cancelled',\r
              }">\r
            <span class="material-symbols-outlined text-sm" [ngClass]="{\r
                  'text-green-600': inv.status === 'Paid',\r
                  'text-red-600': inv.status === 'Cancelled',\r
                  'text-amber-600': inv.status !== 'Paid' && inv.status !== 'Cancelled',\r
                }">\r
              {{\r
              inv.status === 'Paid'\r
              ? 'check_circle'\r
              : inv.status === 'Cancelled'\r
              ? 'cancel'\r
              : 'pending'\r
              }}\r
            </span>\r
          </div>\r
          <div>\r
            <p class="font-black text-sm text-on-surface">{{ inv.invoice_number }}</p>\r
            <p class="text-[10px] text-outline font-bold uppercase tracking-widest mt-0.5">\r
              {{ formatDate(inv.invoice_date) }}\r
            </p>\r
          </div>\r
        </div>\r
        <div class="text-right flex flex-col items-end gap-1">\r
          <p class="font-black text-base text-on-surface">\r
            \u20B9{{ (+inv.grand_total).toLocaleString('en-IN') }}\r
          </p>\r
          <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase" [ngClass]="{\r
                'bg-green-100 text-green-700': inv.status === 'Paid',\r
                'bg-red-100 text-red-700': inv.status === 'Cancelled',\r
                'bg-amber-100 text-amber-700': inv.status !== 'Paid' && inv.status !== 'Cancelled',\r
              }">\r
            {{ inv.status }}\r
          </span>\r
          <button (click)="viewInvoice(inv)"\r
            class="text-[10px] font-black text-primary flex items-center gap-1 hover:underline cursor-pointer">\r
            <span class="material-symbols-outlined text-[12px]">open_in_new</span> View Invoice\r
          </button>\r
        </div>\r
      </div>\r
      } @empty {\r
      <div class="py-12 flex flex-col items-center gap-3 text-outline">\r
        <span class="material-symbols-outlined text-5xl">receipt_long</span>\r
        <p class="font-bold text-sm">No billing records found.</p>\r
      </div>\r
      }\r
    </div>\r
  </div>\r
\r
  <div class="flex gap-3 px-5 py-4 border-t border-outline-variant/10 shrink-0">\r
    <button (click)="openSubmission(); showBillingModal = false"\r
      class="flex-1 py-3 rounded-2xl border border-primary text-primary text-xs font-black uppercase tracking-wide cursor-pointer hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">\r
      <span class="material-symbols-outlined text-sm">add</span> New Invoice\r
    </button>\r
    <button (click)="showBillingModal = false"\r
      class="w-[120px] py-3 rounded-2xl bg-on-surface text-white text-xs font-black uppercase tracking-wide cursor-pointer shadow-md hover:opacity-90 hover:shadow-lg transition-all">\r
      Close\r
    </button>\r
  </div>\r
</app-common-dialog>`, styles: ['@charset "UTF-8";\n\n/* src/app/modules/vendors/vendors.scss */\n:host {\n  display: block;\n  font-family:\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  --blue: #1a6bff;\n  --blue-light: #e8f0ff;\n  --gold: #c47d00;\n  --gold-bg: #fff8e6;\n  --text-primary: #111827;\n  --text-secondary: #6b7280;\n  --text-muted: #9ca3af;\n  --border: #e5e7eb;\n  --surface: #f9fafb;\n  --white: #ffffff;\n  --radius: 12px;\n  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);\n  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.10);\n  --shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.15);\n}\n.vp-wrapper {\n  background: var(--surface);\n  min-height: auto;\n  padding: 40px 48px;\n  width: 100%;\n  margin: 0;\n}\n.vp-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 32px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.vp-header__right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.vp-title {\n  font-family:\n    "Space Grotesk",\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  font-size: 26px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n  letter-spacing: -0.3px;\n}\n.vp-subtitle {\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.vp-subtitle strong {\n  color: var(--text-primary);\n  font-weight: 700;\n}\n.btn-filter {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 18px;\n  border: 1.5px solid var(--border);\n  border-radius: 24px;\n  background: var(--white);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-filter:hover,\n.btn-filter.active {\n  border-color: var(--blue);\n  color: var(--blue);\n  background: var(--blue-light);\n}\n.btn-add {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: var(--blue);\n  color: white;\n  border: none;\n  border-radius: 24px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.3);\n}\n.btn-add:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.4);\n  transform: translateY(-1px);\n}\n.btn-add:active {\n  transform: translateY(0);\n}\n.vp-stats {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.stat-card {\n  background: var(--white);\n  border-radius: var(--radius);\n  padding: 24px 28px 20px;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n}\n.stat-card:hover {\n  box-shadow: var(--shadow-md);\n  transform: translateY(-2px);\n}\n.stat-label {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n}\n.stat-value {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 34px;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.stat-value--gold {\n  color: var(--gold);\n}\n.stat-bar {\n  height: 3px;\n  width: 40px;\n  border-radius: 4px;\n  margin-top: 4px;\n}\n.stat-bar--blue {\n  background: var(--blue);\n}\n.stat-bar--gold {\n  background: var(--gold);\n}\n.vp-loading {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 48px 0;\n  justify-content: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  font-weight: 500;\n}\n.loading-spinner {\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--border);\n  border-top-color: var(--blue);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.vp-empty {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1.5px dashed var(--border);\n  padding: 48px 40px;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n  margin-bottom: 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.vp-empty svg {\n  opacity: 0.35;\n}\n.vp-empty p {\n  margin: 0;\n}\n.vp-empty strong {\n  color: var(--blue);\n  font-weight: 600;\n}\n.vp-vendor-list {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  margin-bottom: 24px;\n  overflow: hidden;\n}\n.vendor-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--border);\n  transition: background 0.15s;\n}\n.vendor-card:last-child {\n  border-bottom: none;\n}\n.vendor-card:hover {\n  background: var(--surface);\n}\n.vendor-card__info {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.vendor-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--blue-light);\n  color: var(--blue);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n  letter-spacing: 0.5px;\n}\n.vendor-name {\n  font-weight: 600;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.vendor-services {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 320px;\n}\n.vendor-card__meta {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-shrink: 0;\n}\n.vendor-badge {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.3px;\n}\n.vendor-badge--active {\n  background: #ecfdf5;\n  color: #059669;\n}\n.vendor-badge--pending {\n  background: #fff8e6;\n  color: var(--gold);\n}\n.vendor-badge--inactive {\n  background: var(--surface);\n  color: var(--text-muted);\n}\n.vendor-compliance {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.vp-activity {\n  background: var(--white);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  padding: 28px 32px;\n}\n.vp-activity__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.activity-title {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.btn-link {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: var(--blue);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  transition: opacity 0.15s;\n}\n.btn-link:hover {\n  opacity: 0.75;\n}\n.activity-list {\n  display: flex;\n  flex-direction: column;\n}\n.activity-item {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 18px 0;\n  border-bottom: 1px solid var(--border);\n}\n.activity-item:last-child {\n  border-bottom: none;\n}\n.activity-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  color: var(--text-secondary);\n}\n.activity-icon--invoice {\n  background: #fff8e6;\n  border-color: #f5e0b0;\n  color: var(--gold);\n}\n.activity-icon--cert {\n  background: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #059669;\n}\n.activity-icon--assign {\n  background: var(--blue-light);\n  border-color: #c7d9ff;\n  color: var(--blue);\n}\n.activity-content {\n  flex: 1;\n  min-width: 0;\n}\n.activity-item__title {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 3px;\n}\n.activity-item__desc {\n  font-size: 13px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.activity-time {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  color: var(--text-muted);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.activity-empty {\n  padding: 32px 0;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 14px;\n}\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(10, 14, 30, 0.55);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 24px;\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal {\n  background: var(--white);\n  border-radius: 18px;\n  width: 100%;\n  max-width: 740px;\n  max-height: 92vh;\n  overflow-y: auto;\n  box-shadow: var(--shadow-lg);\n  animation: slideUp 0.25s ease;\n  scrollbar-width: thin;\n  scrollbar-color: var(--border) transparent;\n}\n.modal::-webkit-scrollbar {\n  width: 5px;\n}\n.modal::-webkit-scrollbar-track {\n  background: transparent;\n}\n.modal::-webkit-scrollbar-thumb {\n  background: var(--border);\n  border-radius: 4px;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.modal__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 28px 28px 20px;\n  position: sticky;\n  top: 0;\n  background: var(--white);\n  z-index: 1;\n  border-bottom: 1px solid var(--border);\n}\n.modal__title {\n  font-family:\n    "Space Grotesk",\n    system-ui,\n    sans-serif;\n  font-size: 20px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.modal__subtitle {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.modal__close {\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  color: var(--text-muted);\n  border-radius: 8px;\n  transition: all 0.15s;\n  line-height: 1;\n}\n.modal__close:hover {\n  background: var(--surface);\n  color: var(--text-primary);\n}\n.modal__close:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.modal__form {\n  padding: 24px 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group--full {\n  width: 100%;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.form-row--3-1 {\n  grid-template-columns: 3fr 1.2fr;\n}\n.form-col {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-label {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  margin-bottom: 2px;\n}\n.required-star {\n  color: #ef4444;\n  margin-left: 2px;\n}\n.form-optional {\n  color: var(--text-muted);\n  font-weight: 400;\n  font-size: 10px;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.form-input {\n  padding: 10px 14px;\n  border: 1.5px solid var(--border);\n  border-radius: 8px;\n  font-size: 14px;\n  color: var(--text-primary);\n  background: var(--white);\n  transition: border-color 0.18s, box-shadow 0.18s;\n  font-family: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n.form-input::placeholder {\n  color: var(--text-muted);\n}\n.form-input:focus {\n  outline: none;\n  border-color: var(--blue);\n  box-shadow: 0 0 0 3px rgba(26, 107, 255, 0.1);\n}\n.form-input--error {\n  border-color: #ef4444 !important;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08) !important;\n}\n.mt-8 {\n  margin-top: 8px;\n}\n.form-hint {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.form-error {\n  font-size: 11px;\n  color: #ef4444;\n  font-weight: 500;\n  margin-top: 2px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.form-error::before {\n  content: "\\26a0";\n  font-size: 10px;\n}\n.form-api-error {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: #fff1f1;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: #dc2626;\n  font-size: 13px;\n  font-weight: 500;\n}\n.form-api-error svg {\n  flex-shrink: 0;\n}\n.upload-zone {\n  border: 2px dashed var(--border);\n  border-radius: 10px;\n  padding: 32px 20px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: var(--surface);\n}\n.upload-zone:hover {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone--dragging {\n  border-color: var(--blue);\n  background: var(--blue-light);\n  transform: scale(1.01);\n}\n.upload-zone--filled {\n  border-color: var(--blue);\n  background: var(--blue-light);\n}\n.upload-zone__content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  color: var(--text-muted);\n}\n.upload-zone__text {\n  font-size: 11.5px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n}\n.upload-zone__text--filled {\n  color: var(--blue);\n  text-transform: none;\n  font-weight: 600;\n  font-size: 13px;\n  letter-spacing: 0;\n}\n.modal__actions {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 12px;\n  margin-top: 8px;\n}\n.btn-cancel {\n  padding: 13px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  background: white;\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n}\n.btn-cancel:hover {\n  border-color: var(--text-secondary);\n  color: var(--text-primary);\n  background: var(--surface);\n}\n.btn-cancel:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-approve {\n  padding: 13px;\n  border: none;\n  border-radius: 10px;\n  background: var(--blue);\n  color: white;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.8px;\n  cursor: pointer;\n  transition: all 0.18s ease;\n  box-shadow: 0 2px 8px rgba(26, 107, 255, 0.35);\n}\n.btn-approve:hover {\n  background: #1259e0;\n  box-shadow: 0 4px 16px rgba(26, 107, 255, 0.45);\n  transform: translateY(-1px);\n}\n.btn-approve:active {\n  transform: translateY(0);\n}\n.btn-approve:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n  box-shadow: none !important;\n}\n.btn-spinner {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: center;\n}\n.spin {\n  animation: spin 0.9s linear infinite;\n}\n@media (max-width: 768px) {\n  .vp-wrapper {\n    padding: 24px 20px;\n  }\n  .vp-stats {\n    grid-template-columns: 1fr;\n  }\n  .vp-header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .vp-header__right {\n    justify-content: space-between;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .form-row--3-1 {\n    grid-template-columns: 1fr;\n  }\n  .modal__actions {\n    grid-template-columns: 1fr 1fr;\n  }\n  .vendor-services {\n    max-width: 180px;\n  }\n}\ninput[type=date] {\n  cursor: pointer;\n}\ninput[type=date]::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n}\n/*# sourceMappingURL=vendors.css.map */\n'] }]
  }], null, { projectId: [{
    type: Input
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Vendors, { className: "Vendors", filePath: "app/modules/vendors/vendors.ts", lineNumber: 27 });
})();

// src/app/modules/vendors/vendors-routing-module.ts
var routes = [
  { path: "", component: Vendors },
  {
    path: ":id",
    component: Vendors
  }
];
var VendorsRoutingModule = class _VendorsRoutingModule {
  static \u0275fac = function VendorsRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _VendorsRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/vendors/pipes/count-by-role-pipe.ts
var CountByRolePipe = class _CountByRolePipe {
  transform(workers, skillRaw) {
    return workers.filter((w) => w.skillRaw === skillRaw).length;
  }
  static \u0275fac = function CountByRolePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountByRolePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "countByRole", type: _CountByRolePipe, pure: true, standalone: false });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountByRolePipe, [{
    type: Pipe,
    args: [{
      name: "countByRole",
      standalone: false
    }]
  }], null, null);
})();

// src/app/modules/vendors/vendors-module.ts
var VendorsModule = class _VendorsModule {
  static \u0275fac = function VendorsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _VendorsModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, VendorsRoutingModule, FormsModule, ReactiveFormsModule, CommonDialogComponent] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsModule, [{
    type: NgModule,
    args: [{
      declarations: [Vendors, CountByRolePipe],
      imports: [CommonModule, VendorsRoutingModule, FormsModule, ReactiveFormsModule, CommonDialogComponent]
    }]
  }], null, null);
})();
export {
  VendorsModule
};
//# sourceMappingURL=chunk-UL2JWDIA.js.map
