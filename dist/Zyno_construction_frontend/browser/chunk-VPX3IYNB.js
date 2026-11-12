import {
  CategoryServeice,
  Equipment,
  MaterialMasterService
} from "./chunk-GXADUZJV.js";
import {
  VendorsServices
} from "./chunk-LTJWUNDC.js";
import {
  EquipmentInventoryService
} from "./chunk-BSTSO5UF.js";
import {
  MaterialService
} from "./chunk-7UB2JTFJ.js";
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
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-YLIHD5YA.js";
import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  ActivatedRoute,
  BehaviorSubject,
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  EventEmitter,
  HostListener,
  HttpClient,
  Injectable,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  Output,
  Router,
  RouterLink,
  RouterModule,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  tap,
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
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-23RKHPSU.js";

// src/app/shared/components/vendor-add-modal/vendor-add-modal.ts
function VendorAddComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 33);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.errorMsg);
  }
}
function VendorAddComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.contractFile.name);
  }
}
function VendorAddComponent_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Click to upload contract PDF");
    \u0275\u0275elementEnd();
  }
}
function VendorAddComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "progress_activity");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Saving... ");
  }
}
function VendorAddComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Approve & Onboard ");
  }
}
var VendorAddComponent = class _VendorAddComponent {
  showAddModal = false;
  newVendor;
  errorMsg = "";
  contractFile = null;
  isSaving = false;
  close = new EventEmitter();
  save = new EventEmitter();
  contractSelect = new EventEmitter();
  onlyNumberEvent = new EventEmitter();
  onlyAlphaNumericEvent = new EventEmitter();
  pasteNumericEvent = new EventEmitter();
  pasteAlphaNumericEvent = new EventEmitter();
  ngOnInit() {
    console.log(this.showAddModal, "showAddModal");
  }
  onContractFileSelected(event) {
    const input = event.target;
    this.contractFile = input.files?.[0] ?? null;
  }
  closeModal() {
    this.close.emit();
  }
  saveVendor() {
    this.save.emit();
  }
  onFileChange(event) {
    this.contractSelect.emit(event);
  }
  onlyNumbers(event) {
    this.onlyNumberEvent.emit(event);
  }
  onlyAlphanumeric(event) {
    this.onlyAlphaNumericEvent.emit(event);
  }
  stripNonNumericOnPaste(event, field, len) {
    this.pasteNumericEvent.emit({ event, field, len });
  }
  stripNonAlphanumericOnPaste(event, field, len) {
    this.pasteAlphaNumericEvent.emit({ event, field, len });
  }
  static \u0275fac = function VendorAddComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorAddComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VendorAddComponent, selectors: [["app-vendor-add-modal"]], inputs: { showAddModal: "showAddModal", newVendor: "newVendor", errorMsg: "errorMsg", contractFile: "contractFile", isSaving: "isSaving" }, outputs: { close: "close", save: "save", contractSelect: "contractSelect", onlyNumberEvent: "onlyNumberEvent", onlyAlphaNumericEvent: "onlyAlphaNumericEvent", pasteNumericEvent: "pasteNumericEvent", pasteAlphaNumericEvent: "pasteAlphaNumericEvent" }, decls: 85, vars: 21, consts: [["maxWidth", "max-w-2xl", "panelClass", "p-8", 3, "closed", "open"], [1, "flex", "justify-between", "items-center", "mb-8"], [1, "text-2xl", "font-black", "tracking-tight"], [1, "text-sm", "text-outline", "font-medium", "mt-1"], [1, "p-2", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-xl", "transition-colors", 3, "click"], [1, "material-symbols-outlined"], [1, "mb-6", "flex", "items-center", "gap-3", "bg-red-50", "dark:bg-red-900/20", "border", "border-red-200", "dark:border-red-700", "px-4", "py-3", "rounded-xl"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1.5", "block"], ["type", "text", "placeholder", "e.g. Skyline Structural Engineering", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Full Name", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "mb-2", 3, "ngModelChange", "ngModel"], [1, "relative"], ["type", "tel", "inputmode", "numeric", "placeholder", "Phone Number (10 digits)", "maxlength", "10", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "pr-16", 3, "ngModelChange", "keypress", "paste", "ngModel"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-[10px]", "font-black", "text-outline/60", "pointer-events-none"], ["type", "email", "placeholder", "official@vendor.com", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "mb-2", 3, "ngModelChange", "ngModel"], ["type", "text", "inputmode", "text", "placeholder", "22AAAAA0000A1Z5", "maxlength", "15", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "uppercase", "pr-16", 3, "ngModelChange", "keypress", "paste", "ngModel"], [1, "mt-1", "text-[10px]", "text-outline/50", "font-semibold", "pl-1"], ["type", "text", "inputmode", "text", "placeholder", "ABCDE1234F", "maxlength", "10", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "uppercase", "pr-16", 3, "ngModelChange", "keypress", "paste", "ngModel"], [1, "md:col-span-2", "grid", "grid-cols-3", "gap-4"], [1, "col-span-2"], ["type", "text", "placeholder", "Suite #, Industrial Area...", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", 3, "ngModelChange", "ngModel"], ["type", "tel", "inputmode", "numeric", "placeholder", "6-digit PIN", "maxlength", "6", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", "pr-12", 3, "ngModelChange", "keypress", "paste", "ngModel"], ["type", "text", "placeholder", "e.g. 5,00,000", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Painting, Electrical, HVAC", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "outline-none", 3, "ngModelChange", "ngModel"], [1, "border-2", "border-dashed", "border-outline-variant/20", "rounded-2xl", "p-6", "flex", "flex-col", "items-center", "justify-center", "gap-2", "hover:bg-slate-50", "dark:hover:bg-slate-800", "transition-colors", "cursor-pointer"], [1, "material-symbols-outlined", "text-primary", "text-3xl"], [1, "text-xs", "font-bold", "text-primary"], [1, "text-xs", "font-bold", "text-outline", "uppercase", "tracking-widest"], ["type", "file", "accept", "application/pdf", 1, "hidden", 3, "change"], [1, "flex", "gap-4", "mt-10"], [1, "flex-1", "py-3.5", "rounded-2xl", "border", "border-outline-variant/20", "text-sm", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "hover:bg-slate-50", "transition-colors", 3, "click"], [1, "flex-1", "py-3.5", "rounded-2xl", "bg-primary", "text-white", "text-sm", "font-black", "uppercase", "tracking-widest", "cursor-pointer", "shadow-xl", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", "disabled:opacity-60", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-error", "text-lg"], [1, "text-sm", "font-bold", "text-error"], [1, "material-symbols-outlined", "animate-spin", "text-sm"]], template: function VendorAddComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-common-dialog", 0);
      \u0275\u0275listener("closed", function VendorAddComponent_Template_app_common_dialog_closed_0_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div")(3, "h3", 2);
      \u0275\u0275text(4, "Onboard New Partner");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Complete documentation to begin work.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function VendorAddComponent_Template_button_click_7_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(10, VendorAddComponent_Conditional_10_Template, 5, 1, "div", 6);
      \u0275\u0275elementStart(11, "div", 7)(12, "div", 8)(13, "label", 9);
      \u0275\u0275text(14, "Vendor Legal Name *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.name, $event) || (ctx.newVendor.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div")(17, "label", 9);
      \u0275\u0275text(18, "SPOC Name *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.spoc.name, $event) || (ctx.newVendor.spoc.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 12)(21, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.spoc.phone, $event) || (ctx.newVendor.spoc.phone = $event);
        return $event;
      });
      \u0275\u0275listener("keypress", function VendorAddComponent_Template_input_keypress_21_listener($event) {
        return ctx.onlyNumbers($event);
      })("paste", function VendorAddComponent_Template_input_paste_21_listener($event) {
        return ctx.stripNonNumericOnPaste($event, "spocPhone", 10);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 14);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div")(25, "label", 9);
      \u0275\u0275text(26, "Official Email & Phone *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.email, $event) || (ctx.newVendor.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 12)(29, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_29_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.phone, $event) || (ctx.newVendor.phone = $event);
        return $event;
      });
      \u0275\u0275listener("keypress", function VendorAddComponent_Template_input_keypress_29_listener($event) {
        return ctx.onlyNumbers($event);
      })("paste", function VendorAddComponent_Template_input_paste_29_listener($event) {
        return ctx.stripNonNumericOnPaste($event, "phone", 10);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 14);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div")(33, "label", 9);
      \u0275\u0275text(34, "GST No. *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 12)(36, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_36_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.kyc.gst, $event) || (ctx.newVendor.kyc.gst = $event);
        return $event;
      });
      \u0275\u0275listener("keypress", function VendorAddComponent_Template_input_keypress_36_listener($event) {
        return ctx.onlyAlphanumeric($event);
      })("paste", function VendorAddComponent_Template_input_paste_36_listener($event) {
        return ctx.stripNonAlphanumericOnPaste($event, "gst", 15);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span", 14);
      \u0275\u0275text(38);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "p", 17);
      \u0275\u0275text(40, " Format: 2-digit state \xB7 10-char PAN \xB7 1-digit entity \xB7 Z \xB7 1-digit checksum ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div")(42, "label", 9);
      \u0275\u0275text(43, "PAN Card No. *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 12)(45, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_45_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.kyc.pan, $event) || (ctx.newVendor.kyc.pan = $event);
        return $event;
      });
      \u0275\u0275listener("keypress", function VendorAddComponent_Template_input_keypress_45_listener($event) {
        return ctx.onlyAlphanumeric($event);
      })("paste", function VendorAddComponent_Template_input_paste_45_listener($event) {
        return ctx.stripNonAlphanumericOnPaste($event, "pan", 10);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "span", 14);
      \u0275\u0275text(47);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "p", 17);
      \u0275\u0275text(49, " Format: 5 letters \xB7 4 digits \xB7 1 letter \xA0(e.g. ABCDE1234F) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 19)(51, "div", 20)(52, "label", 9);
      \u0275\u0275text(53, "Physical Address *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.address.street, $event) || (ctx.newVendor.address.street = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div")(56, "label", 9);
      \u0275\u0275text(57, "Pincode *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 12)(59, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_59_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.address.pincode, $event) || (ctx.newVendor.address.pincode = $event);
        return $event;
      });
      \u0275\u0275listener("keypress", function VendorAddComponent_Template_input_keypress_59_listener($event) {
        return ctx.onlyNumbers($event);
      })("paste", function VendorAddComponent_Template_input_paste_59_listener($event) {
        return ctx.stripNonNumericOnPaste($event, "pincode", 6);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "span", 14);
      \u0275\u0275text(61);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(62, "div")(63, "label", 9);
      \u0275\u0275text(64, "Budget Allocation *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_65_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.budget, $event) || (ctx.newVendor.budget = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "div")(67, "label", 9);
      \u0275\u0275text(68, "Services (Comma Separated) *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "input", 24);
      \u0275\u0275twoWayListener("ngModelChange", function VendorAddComponent_Template_input_ngModelChange_69_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newVendor.services, $event) || (ctx.newVendor.services = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div", 8)(71, "label", 9);
      \u0275\u0275text(72, "Contract Documentation (PDF, max 10MB)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "label", 25)(74, "span", 26);
      \u0275\u0275text(75, "upload_file");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(76, VendorAddComponent_Conditional_76_Template, 2, 1, "p", 27)(77, VendorAddComponent_Conditional_77_Template, 2, 0, "p", 28);
      \u0275\u0275elementStart(78, "input", 29);
      \u0275\u0275listener("change", function VendorAddComponent_Template_input_change_78_listener($event) {
        return ctx.onContractFileSelected($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(79, "div", 30)(80, "button", 31);
      \u0275\u0275listener("click", function VendorAddComponent_Template_button_click_80_listener() {
        return ctx.closeModal();
      });
      \u0275\u0275text(81, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "button", 32);
      \u0275\u0275listener("click", function VendorAddComponent_Template_button_click_82_listener() {
        return ctx.saveVendor();
      });
      \u0275\u0275conditionalCreate(83, VendorAddComponent_Conditional_83_Template, 3, 0)(84, VendorAddComponent_Conditional_84_Template, 1, 0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("open", ctx.showAddModal);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.errorMsg ? 10 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.spoc.name);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.spoc.phone);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", (ctx.newVendor.spoc.phone == null ? null : ctx.newVendor.spoc.phone.length) ?? 0, "/10 ");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.email);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.phone);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", (ctx.newVendor.phone == null ? null : ctx.newVendor.phone.length) ?? 0, "/10 ");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.kyc.gst);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", (ctx.newVendor.kyc.gst == null ? null : ctx.newVendor.kyc.gst.length) ?? 0, "/15 ");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.kyc.pan);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", (ctx.newVendor.kyc.pan == null ? null : ctx.newVendor.kyc.pan.length) ?? 0, "/10 ");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.address.street);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.address.pincode);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", (ctx.newVendor.address.pincode == null ? null : ctx.newVendor.address.pincode.length) ?? 0, "/6 ");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.budget);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newVendor.services);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.contractFile ? 76 : 77);
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.isSaving);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSaving ? 83 : 84);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, CommonDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorAddComponent, [{
    type: Component,
    args: [{ selector: "app-vendor-add-modal", standalone: true, imports: [CommonModule, FormsModule, CommonDialogComponent], template: `<!-- child component html -->\r
<!--  -->\r
\r
<app-common-dialog [open]="showAddModal" maxWidth="max-w-2xl" panelClass="p-8" (closed)="closeModal()">\r
\r
    <div class="flex justify-between items-center mb-8">\r
      <div>\r
        <h3 class="text-2xl font-black tracking-tight">Onboard New Partner</h3>\r
        <p class="text-sm text-outline font-medium mt-1">Complete documentation to begin work.</p>\r
      </div>\r
      <button (click)="closeModal()"\r
        class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">\r
        <span class="material-symbols-outlined">close</span>\r
      </button>\r
    </div>\r
\r
    @if (errorMsg) {\r
    <div\r
      class="mb-6 flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-4 py-3 rounded-xl">\r
      <span class="material-symbols-outlined text-error text-lg">error</span>\r
      <p class="text-sm font-bold text-error">{{ errorMsg }}</p>\r
    </div>\r
    }\r
\r
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">\r
\r
      <div class="md:col-span-2">\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">Vendor Legal Name\r
          *</label>\r
        <input [(ngModel)]="newVendor.name" type="text" placeholder="e.g. Skyline Structural Engineering"\r
          class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20">\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">SPOC Name *</label>\r
\r
        <input [(ngModel)]="newVendor.spoc.name" type="text" placeholder="Full Name"\r
          class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none mb-2">\r
\r
        <div class="relative">\r
          <input [(ngModel)]="newVendor.spoc.phone" type="tel" inputmode="numeric"\r
            placeholder="Phone Number (10 digits)" maxlength="10" (keypress)="onlyNumbers($event)"\r
            (paste)="stripNonNumericOnPaste($event, 'spocPhone', 10)"\r
            class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none pr-16">\r
\r
          <span\r
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-outline/60 pointer-events-none">\r
            {{ newVendor.spoc.phone?.length ?? 0 }}/10\r
          </span>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">Official Email & Phone\r
          *</label>\r
        <input [(ngModel)]="newVendor.email" type="email" placeholder="official@vendor.com"\r
          class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none mb-2">\r
\r
        <div class="relative">\r
          <input [(ngModel)]="newVendor.phone" type="tel" inputmode="numeric" placeholder="Phone Number (10 digits)"\r
            maxlength="10" (keypress)="onlyNumbers($event)" (paste)="stripNonNumericOnPaste($event, 'phone', 10)"\r
            class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none pr-16">\r
          <span\r
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-outline/60 pointer-events-none">\r
            {{ newVendor.phone?.length ?? 0 }}/10\r
          </span>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">GST No. *</label>\r
        <div class="relative">\r
          <input [(ngModel)]="newVendor.kyc.gst" type="text" inputmode="text" placeholder="22AAAAA0000A1Z5"\r
            maxlength="15" (keypress)="onlyAlphanumeric($event)"\r
            (paste)="stripNonAlphanumericOnPaste($event, 'gst', 15)"\r
            class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none uppercase pr-16">\r
          <span\r
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-outline/60 pointer-events-none">\r
            {{ newVendor.kyc.gst?.length ?? 0 }}/15\r
          </span>\r
        </div>\r
\r
        <p class="mt-1 text-[10px] text-outline/50 font-semibold pl-1">\r
          Format: 2-digit state \xB7 10-char PAN \xB7 1-digit entity \xB7 Z \xB7 1-digit checksum\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">PAN Card No. *</label>\r
        <div class="relative">\r
          <input [(ngModel)]="newVendor.kyc.pan" type="text" inputmode="text" placeholder="ABCDE1234F" maxlength="10"\r
            (keypress)="onlyAlphanumeric($event)" (paste)="stripNonAlphanumericOnPaste($event, 'pan', 10)"\r
            class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none uppercase pr-16">\r
          <span\r
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-outline/60 pointer-events-none">\r
            {{ newVendor.kyc.pan?.length ?? 0 }}/10\r
          </span>\r
        </div>\r
\r
        <p class="mt-1 text-[10px] text-outline/50 font-semibold pl-1">\r
          Format: 5 letters \xB7 4 digits \xB7 1 letter &nbsp;(e.g. ABCDE1234F)\r
        </p>\r
      </div>\r
\r
      <div class="md:col-span-2 grid grid-cols-3 gap-4">\r
        <div class="col-span-2">\r
          <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">Physical Address\r
            *</label>\r
          <input [(ngModel)]="newVendor.address.street" type="text" placeholder="Suite #, Industrial Area..."\r
            class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none">\r
        </div>\r
\r
        <div>\r
          <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">Pincode *</label>\r
          <div class="relative">\r
            <input [(ngModel)]="newVendor.address.pincode" type="tel" inputmode="numeric" placeholder="6-digit PIN"\r
              maxlength="6" (keypress)="onlyNumbers($event)" (paste)="stripNonNumericOnPaste($event, 'pincode', 6)"\r
              class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none pr-12">\r
            <span\r
              class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-outline/60 pointer-events-none">\r
              {{ newVendor.address.pincode?.length ?? 0 }}/6\r
            </span>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">Budget Allocation\r
          *</label>\r
        <input [(ngModel)]="newVendor.budget" type="text" placeholder="e.g. 5,00,000"\r
          class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none">\r
      </div>\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">Services (Comma\r
          Separated) *</label>\r
        <input [(ngModel)]="newVendor.services" type="text" placeholder="Painting, Electrical, HVAC"\r
          class="w-full px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold outline-none">\r
      </div>\r
\r
      <div class="md:col-span-2">\r
        <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1.5 block">Contract Documentation\r
          (PDF, max 10MB)</label>\r
        <label\r
          class="border-2 border-dashed border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">\r
          <span class="material-symbols-outlined text-primary text-3xl">upload_file</span>\r
          @if (contractFile) {\r
          <p class="text-xs font-bold text-primary">{{ contractFile.name }}</p>\r
          } @else {\r
          <p class="text-xs font-bold text-outline uppercase tracking-widest">Click to upload contract PDF</p>\r
          }\r
          <input type="file" accept="application/pdf" class="hidden" (change)="onContractFileSelected($event)">\r
        </label>\r
      </div>\r
    </div>\r
\r
    <div class="flex gap-4 mt-10">\r
      <button (click)="closeModal()"\r
        class="flex-1 py-3.5 rounded-2xl border border-outline-variant/20 text-sm font-black uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors">\r
        Cancel\r
      </button>\r
      <button (click)="saveVendor()" [disabled]="isSaving"\r
        class="flex-1 py-3.5 rounded-2xl bg-primary text-white text-sm font-black uppercase tracking-widest cursor-pointer shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">\r
        @if (isSaving) {\r
        <span class="material-symbols-outlined animate-spin text-sm">progress_activity</span> Saving...\r
        } @else {\r
        Approve & Onboard\r
        }\r
      </button>\r
    </div>\r
</app-common-dialog>\r
` }]
  }], null, { showAddModal: [{
    type: Input
  }], newVendor: [{
    type: Input
  }], errorMsg: [{
    type: Input
  }], contractFile: [{
    type: Input
  }], isSaving: [{
    type: Input
  }], close: [{
    type: Output
  }], save: [{
    type: Output
  }], contractSelect: [{
    type: Output
  }], onlyNumberEvent: [{
    type: Output
  }], onlyAlphaNumericEvent: [{
    type: Output
  }], pasteNumericEvent: [{
    type: Output
  }], pasteAlphaNumericEvent: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VendorAddComponent, { className: "VendorAddComponent", filePath: "app/shared/components/vendor-add-modal/vendor-add-modal.ts", lineNumber: 12 });
})();

// src/app/modules/resources/materials/materials.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function Materials_For_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 98);
    \u0275\u0275listener("click", function Materials_For_63_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeTab(tab_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.selectedTab === tab_r2.category_name ? "bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-dim");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.category_name, " ");
  }
}
function Materials_For_97_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 119);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length, " ", (item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) === 1 ? "Project" : "Projects", " ");
  }
}
function Materials_For_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 32)(1, "td", 99)(2, "div", 100)(3, "div", 101);
    \u0275\u0275element(4, "div", 102);
    \u0275\u0275elementStart(5, "span", 103);
    \u0275\u0275text(6, "inventory_2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 2)(8, "p", 104);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 35)(11, "span", 105);
    \u0275\u0275text(12, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 106);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 107)(16, "span", 108);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 107)(19, "div", 109)(20, "div", 110)(21, "div", 111)(22, "span", 112);
    \u0275\u0275text(23, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "span", 113);
    \u0275\u0275text(27, "Stock");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 114);
    \u0275\u0275element(29, "div", 115);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "td", 107)(31, "div", 116);
    \u0275\u0275listener("click", function Materials_For_97_Template_div_click_31_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) > 0 && ctx_r2.openProjectStockPopup(item_r5));
    });
    \u0275\u0275elementStart(32, "div", 117)(33, "span", 37);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 118);
    \u0275\u0275conditionalCreate(36, Materials_For_97_Conditional_36_Template, 2, 2, "span", 119);
    \u0275\u0275elementStart(37, "span", 120);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "span", 121);
    \u0275\u0275text(40, "arrow_forward_ios");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "td", 107)(42, "div", 122)(43, "span", 123);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 124);
    \u0275\u0275text(46, "Per Unit");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "td", 107)(48, "div", 25)(49, "div", 125);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div")(52, "p", 126);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 127);
    \u0275\u0275text(55, "Verified Supplier");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "td", 128)(57, "div", 129)(58, "div", 35)(59, "button", 130);
    \u0275\u0275listener("click", function Materials_For_97_Template_button_click_59_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAssignProjectModal(item_r5));
    });
    \u0275\u0275elementStart(60, "span", 37);
    \u0275\u0275text(61, "assignment_ind");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "button", 131);
    \u0275\u0275listener("click", function Materials_For_97_Template_button_click_62_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openStockTransferModal(item_r5));
    });
    \u0275\u0275elementStart(63, "span", 37);
    \u0275\u0275text(64, "transfer_within_a_station");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "button", 132);
    \u0275\u0275listener("click", function Materials_For_97_Template_button_click_65_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r5));
    });
    \u0275\u0275elementStart(66, "span", 37);
    \u0275\u0275text(67, "delete");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", item_r5.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r5.sku);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r5.category, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(item_r5.stockRemaining);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r5.stockUsed >= item_r5.stockRemaining ? "bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", item_r5.stockRemaining > 100 ? 100 : item_r5.stockRemaining, "%");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", (item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) > 0 ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/10" : "cursor-not-allowed opacity-70 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", (item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) > 0 ? "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600" : "bg-slate-200 dark:bg-slate-700 text-slate-500");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) > 0 ? "apartment" : "inventory_2", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) || 0) > 0 ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ((item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) || 0) > 0 ? "text-indigo-600 dark:text-indigo-400" : "text-rose-500 dark:text-rose-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) || 0) > 0 ? "Assigned" : "Not Assigned", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u20B9", item_r5.cost);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (item_r5.vendor_name || "?").charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.vendor_name);
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", !(item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length))("ngClass", (item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50");
  }
}
function Materials_For_106_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 133);
    \u0275\u0275listener("click", function Materials_For_106_Template_button_click_0_listener() {
      const $index_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage($index_r7 + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.page === $index_r7 + 1 ? "bg-primary text-white shadow-md" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r7 + 1, " ");
  }
}
function Materials_Conditional_121_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 136);
    \u0275\u0275listener("click", function Materials_Conditional_121_For_2_Template_div_click_0_listener() {
      const material_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectMaterialMasterOption(material_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.material_master_id === material_r9.id ? "bg-primary/10 text-primary font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", material_r9.name, " ");
  }
}
function Materials_Conditional_121_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 135);
    \u0275\u0275text(1, "No materials found");
    \u0275\u0275elementEnd();
  }
}
function Materials_Conditional_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_121_For_2_Template, 2, 2, "div", 134, _forTrack0);
    \u0275\u0275conditionalCreate(3, Materials_Conditional_121_Conditional_3_Template, 2, 0, "div", 135);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.MaterialMaster);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(ctx_r2.MaterialMaster == null ? null : ctx_r2.MaterialMaster.length) ? 3 : -1);
  }
}
function Materials_Conditional_134_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 136);
    \u0275\u0275listener("click", function Materials_Conditional_134_For_2_Template_div_click_0_listener() {
      const cat_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectCategory("new", cat_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.category === cat_r11 ? "bg-primary/10 text-primary font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r11, " ");
  }
}
function Materials_Conditional_134_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_134_For_2_Template, 2, 2, "div", 134, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.categoryOptions);
  }
}
function Materials_Conditional_143_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 136);
    \u0275\u0275listener("click", function Materials_Conditional_143_For_2_Template_div_click_0_listener() {
      const p_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectProjectOption("new", p_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.project_id === p_r13.id ? "bg-primary/10 text-primary font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r13.name, " ");
  }
}
function Materials_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_143_For_2_Template, 2, 2, "div", 134, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function Materials_Conditional_160_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 136);
    \u0275\u0275listener("click", function Materials_Conditional_160_For_2_Template_div_click_0_listener() {
      const v_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectVendorOption(v_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.vendor_id === v_r16.id ? "bg-primary/10 text-primary font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r16.name, " ");
  }
}
function Materials_Conditional_160_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_160_For_2_Template, 2, 2, "div", 134, _forTrack0);
    \u0275\u0275elementStart(3, "div", 137);
    \u0275\u0275listener("click", function Materials_Conditional_160_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectVendorOption("ADD_NEW"));
    });
    \u0275\u0275elementStart(4, "span", 138);
    \u0275\u0275text(5, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Add New Vendor ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.vendors);
  }
}
function Materials_Conditional_162_Conditional_34_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 136);
    \u0275\u0275listener("click", function Materials_Conditional_162_Conditional_34_For_2_Template_div_click_0_listener() {
      const p_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectProjectOption("edit", p_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.project_id === p_r19.id ? "bg-primary/10 text-primary font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r19.name, " ");
  }
}
function Materials_Conditional_162_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_162_Conditional_34_For_2_Template, 2, 2, "div", 134, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function Materials_Conditional_162_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "div", 139)(3, "label", 43);
    \u0275\u0275text(4, "Material Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 140);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_162_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.name, $event) || (ctx_r2.materialToEdit.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 43);
    \u0275\u0275text(8, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_162_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.sku, $event) || (ctx_r2.materialToEdit.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "label", 43);
    \u0275\u0275text(12, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 142)(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 143);
    \u0275\u0275text(17, "lock");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div")(19, "label", 43);
    \u0275\u0275text(20, "Stock In");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 144);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_162_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.stockIn, $event) || (ctx_r2.materialToEdit.stockIn = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "label", 43);
    \u0275\u0275text(24, "Cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 145);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_162_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.cost, $event) || (ctx_r2.materialToEdit.cost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function Materials_Conditional_162_Template_input_blur_25_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.formatCostEdit());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 146)(27, "label", 43);
    \u0275\u0275text(28, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 44);
    \u0275\u0275listener("click", function Materials_Conditional_162_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("editProject"));
    });
    \u0275\u0275elementStart(30, "span", 45);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 46);
    \u0275\u0275text(33, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(34, Materials_Conditional_162_Conditional_34_Template, 3, 0, "div", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.sku);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.materialToEdit.category);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.stockIn);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.cost);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "editProject" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectName(ctx_r2.materialToEdit.project_id) || "Select Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "editProject" ? "rotate-180 text-primary" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "editProject" ? 34 : -1);
  }
}
function Materials_For_179_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 156);
    \u0275\u0275listener("click", function Materials_For_179_Conditional_10_For_2_Template_div_click_0_listener() {
      const project_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const \u0275$index_516_r21 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectAssignProjectOption(\u0275$index_516_r21, project_r23));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r23 = ctx.$implicit;
    const item_r24 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("ngClass", item_r24.project_id === project_r23.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r23.name, " ");
  }
}
function Materials_For_179_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_For_179_Conditional_10_For_2_Template, 2, 2, "div", 155, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function Materials_For_179_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61)(1, "div", 147)(2, "div", 148)(3, "label", 149);
    \u0275\u0275text(4, "Select Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 150);
    \u0275\u0275listener("click", function Materials_For_179_Template_button_click_5_listener() {
      const \u0275$index_516_r21 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("assign-" + \u0275$index_516_r21));
    });
    \u0275\u0275elementStart(6, "span", 45);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 46);
    \u0275\u0275text(9, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, Materials_For_179_Conditional_10_Template, 3, 0, "div", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 151)(12, "label", 149);
    \u0275\u0275text(13, "Stock Qty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 152);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_For_179_Template_input_ngModelChange_14_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r20).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.stock, $event) || (item_r24.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function Materials_For_179_Template_input_input_14_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.validateAssignedStock());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 153)(16, "button", 154);
    \u0275\u0275listener("click", function Materials_For_179_Template_button_click_16_listener() {
      const \u0275$index_516_r21 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeProjectRow(\u0275$index_516_r21));
    });
    \u0275\u0275elementStart(17, "span", 37);
    \u0275\u0275text(18, "delete");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r24 = ctx.$implicit;
    const \u0275$index_516_r21 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "assign-" + \u0275$index_516_r21 ? "border-indigo-500 ring-4 ring-indigo-500/10" : "border-slate-200 dark:border-slate-700");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r24.project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectName(item_r24.project_id) || "Choose Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "assign-" + \u0275$index_516_r21 ? "rotate-180 text-indigo-500" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "assign-" + \u0275$index_516_r21 ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r24.stock);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.assignedProjects.length === 1);
  }
}
function Materials_Conditional_196_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "span", 63);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 157);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.projectAssignError);
  }
}
function Materials_Conditional_198_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "p", 158);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 159);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, "? This action cannot be undone. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('"', ctx_r2.materialToDelete.name, '"');
  }
}
function Materials_Conditional_201_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 160)(2, "span", 161);
    \u0275\u0275text(3, "inventory_2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h4", 123);
    \u0275\u0275text(5, "No Project Assigned");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 162);
    \u0275\u0275text(7, "This material is not assigned to any project yet.");
    \u0275\u0275elementEnd()();
  }
}
function Materials_Conditional_202_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 163)(1, "div", 129)(2, "div", 100)(3, "div", 164)(4, "span", 94);
    \u0275\u0275text(5, "apartment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h4", 119);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 165);
    \u0275\u0275text(10, "Assigned Project");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 67)(12, "h4", 66);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 166);
    \u0275\u0275text(15, "Unit(s)");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r25 = ctx.$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(p_r25.project_name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r25.stockUsed);
  }
}
function Materials_Conditional_202_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_202_For_2_Template, 16, 2, "div", 163, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.selectedProjectStock.material_project_stock);
  }
}
function Materials_Conditional_203_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 179);
    \u0275\u0275listener("click", function Materials_Conditional_203_Conditional_13_For_2_Template_div_click_0_listener() {
      const opt_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectSortOption(opt_r28));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r28 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.selectedSort === opt_r28 ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r28, " ");
  }
}
function Materials_Conditional_203_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 173);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_203_Conditional_13_For_2_Template, 2, 2, "div", 178, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.sortOptions);
  }
}
function Materials_Conditional_203_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 167);
    \u0275\u0275listener("click", function Materials_Conditional_203_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 168);
    \u0275\u0275listener("click", function Materials_Conditional_203_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 169);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 91)(5, "div", 49)(6, "label", 170);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 171);
    \u0275\u0275listener("click", function Materials_Conditional_203_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("sortOrder"));
    });
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 172);
    \u0275\u0275text(12, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, Materials_Conditional_203_Conditional_13_Template, 3, 0, "div", 173);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "label", 170);
    \u0275\u0275text(16, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 174)(18, "button", 175);
    \u0275\u0275text(19, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 176);
    \u0275\u0275text(21, "Preferred");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 176);
    \u0275\u0275text(23, "New");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(24, "button", 177);
    \u0275\u0275listener("click", function Materials_Conditional_203_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275text(25, "Apply Filters");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "sortOrder" ? "border-primary ring-2 ring-primary/10" : "border-transparent");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedSort);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "sortOrder" ? "rotate-180 text-primary" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "sortOrder" ? 13 : -1);
  }
}
function Materials_For_227_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 188);
    \u0275\u0275listener("click", function Materials_For_227_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const \u0275$index_737_r31 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeTransferRow(\u0275$index_737_r31));
    });
    \u0275\u0275elementStart(1, "span", 37);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function Materials_For_227_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 190);
    \u0275\u0275listener("click", function Materials_For_227_Conditional_11_For_2_Template_div_click_0_listener() {
      const p_r33 = \u0275\u0275restoreView(_r32).$implicit;
      const \u0275$index_737_r31 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTransferProjectOption(\u0275$index_737_r31, "from", p_r33));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 191);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r33 = ctx.$implicit;
    const item_r34 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", item_r34.from_project_id === p_r33.id ? "bg-primary/10 text-primary font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r33.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Stock : ", ctx_r2.getProjectStock(p_r33.id));
  }
}
function Materials_For_227_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_For_227_Conditional_11_For_2_Template, 5, 3, "div", 189, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function Materials_For_227_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 183)(1, "div", 192)(2, "div", 35)(3, "span", 193);
    \u0275\u0275text(4, "inventory");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 194);
    \u0275\u0275text(6, "Available Stock");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 195);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.getProjectStock(item_r34.from_project_id));
  }
}
function Materials_For_227_Conditional_25_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 190);
    \u0275\u0275listener("click", function Materials_For_227_Conditional_25_For_2_Template_div_click_0_listener() {
      const p_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const \u0275$index_737_r31 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTransferProjectOption(\u0275$index_737_r31, "to", p_r36));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 191);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r36 = ctx.$implicit;
    const item_r34 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", item_r34.to_project_id === p_r36.id ? "bg-primary/10 text-primary font-black" : "text-slate-600 dark:text-slate-300");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r36.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Stock : ", ctx_r2.getProjectStock(p_r36.id));
  }
}
function Materials_For_227_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275repeaterCreate(1, Materials_For_227_Conditional_25_For_2_Template, 5, 3, "div", 189, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function Materials_For_227_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 186)(1, "div", 192)(2, "div", 35)(3, "span", 196);
    \u0275\u0275text(4, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 197);
    \u0275\u0275text(6, "Current Stock");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 198);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r34 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.getProjectStock(item_r34.to_project_id));
  }
}
function Materials_For_227_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275conditionalCreate(1, Materials_For_227_Conditional_1_Template, 3, 0, "button", 180);
    \u0275\u0275elementStart(2, "div", 181)(3, "div", 49)(4, "label", 95);
    \u0275\u0275text(5, "From Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 182);
    \u0275\u0275listener("click", function Materials_For_227_Template_button_click_6_listener() {
      const \u0275$index_737_r31 = \u0275\u0275restoreView(_r29).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("transferFrom-" + \u0275$index_737_r31));
    });
    \u0275\u0275elementStart(7, "span", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 46);
    \u0275\u0275text(10, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, Materials_For_227_Conditional_11_Template, 3, 0, "div", 47);
    \u0275\u0275conditionalCreate(12, Materials_For_227_Conditional_12_Template, 9, 1, "div", 183);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 184)(14, "div", 185)(15, "span", 94);
    \u0275\u0275text(16, "east");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 49)(18, "label", 95);
    \u0275\u0275text(19, "To Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 182);
    \u0275\u0275listener("click", function Materials_For_227_Template_button_click_20_listener() {
      const \u0275$index_737_r31 = \u0275\u0275restoreView(_r29).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("transferTo-" + \u0275$index_737_r31));
    });
    \u0275\u0275elementStart(21, "span", 45);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 46);
    \u0275\u0275text(24, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(25, Materials_For_227_Conditional_25_Template, 3, 0, "div", 47);
    \u0275\u0275conditionalCreate(26, Materials_For_227_Conditional_26_Template, 9, 1, "div", 186);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div")(28, "label", 95);
    \u0275\u0275text(29, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 187);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_For_227_Template_input_ngModelChange_30_listener($event) {
      const item_r34 = \u0275\u0275restoreView(_r29).$implicit;
      \u0275\u0275twoWayBindingSet(item_r34.quantity, $event) || (item_r34.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r34 = ctx.$implicit;
    const \u0275$index_737_r31 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.stockTransferData.transfers.length > 1 ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transferFrom-" + \u0275$index_737_r31 ? "border-primary ring-4 ring-primary/20" : "border-slate-200 dark:border-slate-700");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r34.from_project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectName(item_r34.from_project_id) || "Select Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transferFrom-" + \u0275$index_737_r31 ? "rotate-180 text-primary" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "transferFrom-" + \u0275$index_737_r31 ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r34.from_project_id ? 12 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transferTo-" + \u0275$index_737_r31 ? "border-primary ring-4 ring-primary/20" : "border-slate-200 dark:border-slate-700");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r34.to_project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectName(item_r34.to_project_id) || "Select Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transferTo-" + \u0275$index_737_r31 ? "rotate-180 text-primary" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "transferTo-" + \u0275$index_737_r31 ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r34.to_project_id ? 26 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r34.quantity);
  }
}
var Materials = class _Materials {
  materialService = inject(MaterialService);
  MaterialMasterService = inject(MaterialMasterService);
  router = inject(Router);
  vendorService = inject(VendorsServices);
  toast = inject(ToastrService);
  categoryService = inject(CategoryServeice);
  selectedTab = "All Materials";
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showFilters = false;
  materialToEdit;
  materialToDelete;
  newMaterial = this.getDefaultMaterial();
  materials = [];
  vendors = [];
  page = 1;
  pageSize = 5;
  paginatedMaterials = [];
  Math;
  MaterialMaster;
  projects = [];
  newVendor = {
    name: "",
    email: "",
    phone: "",
    budget: "",
    services: "",
    spoc: {
      name: "",
      phone: ""
    },
    kyc: {
      gst: "",
      pan: ""
    },
    address: {
      street: "",
      pincode: ""
    }
  };
  errorMsg = "";
  contractFile = null;
  isSaving = false;
  showAddVendorModal = false;
  Number;
  searchQuery;
  noOfProjectsAssigned = 0;
  noOfProjectsNotAssigned = 0;
  categories = [];
  openDropdown = null;
  categoryOptions = ["Concrete", "Steel", "Electrical", "Lumber", "Finishing", "Chemicals"];
  sortOptions = ["Usage Rate (Highest)", "Usage Rate (Lowest)", "Stock Level (Asc)", "Stock Level (Desc)", "Newest Additions"];
  selectedSort = this.sortOptions[0];
  ngOnInit() {
    this.materialService.loadMaterials();
    this.materialService.materials$.subscribe((m) => {
      this.materials = m;
      this.noOfProjectsAssigned = m.filter((x) => x.material_project_stock && x.material_project_stock.length > 0).length;
      this.noOfProjectsNotAssigned = m.filter((x) => !x.material_project_stock || x.material_project_stock.length === 0).length;
      this.page = 1;
      this.updatePagination();
    });
    this.loadProjects();
    this.MaterialMasterService.materials$.subscribe((m) => {
      this.MaterialMaster = m;
    });
    this.getVendors();
    this.getCategories();
  }
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest(".custom-dropdown-wrapper")) {
      this.openDropdown = null;
    }
  }
  toggleDropdown(name) {
    this.openDropdown = this.openDropdown === name ? null : name;
  }
  closeDropdown() {
    this.openDropdown = null;
  }
  getProjectName(id) {
    const p = this.projects.find((x) => x.id == id);
    return p?.name || "";
  }
  selectMaterialMasterOption(material) {
    this.newMaterial.material_master_id = material.id;
    this.getSelectedMat({ target: { value: material.id } });
    this.closeDropdown();
  }
  selectCategory(target, cat) {
    if (target === "new") {
      this.newMaterial.category = cat;
    } else {
      this.materialToEdit.category = cat;
    }
    this.closeDropdown();
  }
  selectProjectOption(target, project) {
    if (target === "new") {
      this.newMaterial.project_id = project.id;
      this.newMaterial.project_name = project.name;
    } else {
      this.materialToEdit.project_id = project.id;
      this.materialToEdit.project_name = project.name;
    }
    this.getProject({ target: { value: project.id } });
    this.closeDropdown();
  }
  selectVendorOption(vendor) {
    if (vendor === "ADD_NEW") {
      this.showAddVendorModal = true;
      this.newMaterial.vendor_id = "";
      this.newMaterial.vendor_name = "";
      this.closeDropdown();
      return;
    }
    this.newMaterial.vendor_id = vendor.id;
    this.newMaterial.vendor_name = vendor.name;
    this.closeDropdown();
  }
  selectAssignProjectOption(index, project) {
    this.assignedProjects[index].project_id = project.id;
    this.validateAssignedStock();
    this.closeDropdown();
  }
  selectTransferProjectOption(index, field, project) {
    if (field === "from") {
      this.stockTransferData.transfers[index].from_project_id = project.id;
    } else {
      this.stockTransferData.transfers[index].to_project_id = project.id;
    }
    this.closeDropdown();
  }
  selectSortOption(option) {
    this.selectedSort = option;
    this.closeDropdown();
  }
  getCategories() {
    this.categoryService.loadCategories().subscribe({
      next: () => {
        this.categoryService.categories$.subscribe((res) => {
          this.categories = [
            {
              category_name: "All Materials",
              isDefault: true
            },
            ...res.filter((c) => c.category_type === "Material")
          ];
          this.updatePagination();
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to load skills");
      }
    });
  }
  loadProjects() {
    this.materialService.getProjects().subscribe({
      next: (res) => {
        this.projects = res?.data || [];
        console.log("Projects =>", this.projects);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  get endItem() {
    return Math.min(this.page * this.pageSize, this.filteredMaterials.length);
  }
  get filteredMaterials() {
    let filtered = [...this.materials];
    if (this.selectedTab === "Low Stock") {
      filtered = filtered.filter((m) => m.stockIn < 20);
    } else if (this.selectedTab !== "All Materials") {
      filtered = filtered.filter((m) => (m.category || "").trim().toLowerCase() === this.selectedTab.trim().toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((material) => material.name?.toLowerCase().includes(q) || material.sku?.toLowerCase().includes(q) || material.category?.toLowerCase().includes(q));
    }
    return filtered;
  }
  changeTab(tab) {
    this.selectedTab = tab.category_name || tab;
    this.page = 1;
    this.updatePagination();
  }
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMaterials = this.filteredMaterials.slice(start, end);
  }
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  goToPage(p) {
    this.page = p;
    this.updatePagination();
  }
  totalPages() {
    return Math.ceil(this.filteredMaterials.length / this.pageSize);
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  onSupplierChange() {
    if (this.newMaterial.vendor_name === "ADD_NEW") {
      this.showAddModal = false;
      this.router.navigate(["/vendors"]);
    }
  }
  getDefaultMaterial() {
    return {
      name: "",
      sku: "",
      category: "Concrete",
      cost: "",
      project_id: 0,
      project_name: "",
      material_master_id: 0,
      stockIn: 0,
      vendor_name: "",
      vendor_id: "",
      status: "ASSIGNED"
    };
  }
  getInventoryValue() {
    return this.materials.reduce((sum, item) => {
      return sum + +item.cost * +item.stockIn;
    }, 0);
  }
  formatCost() {
    const value = Number(this.newMaterial.cost || 0);
    this.newMaterial.cost = value.toFixed(2);
  }
  formatCostEdit() {
    const value = Number(this.materialToEdit.cost || 0);
    this.materialToEdit.cost = value.toFixed(2);
  }
  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.showAddModal = true;
  }
  getProject(projectId) {
    const selectedId = Number(projectId.target.value);
    const project = this.projects.find((p) => p.id === selectedId);
    console.log(project, "project");
    this.newMaterial.project_name = project?.name || "";
    this.newMaterial.project_id = selectedId || 0;
  }
  addMaterial() {
    this.materialService.addMaterial(__spreadValues({}, this.newMaterial)).subscribe({
      next: (res) => {
        console.log("Material created", res);
        this.showAddModal = false;
        this.toast.success("Material added successfully");
        this.materialService.loadMaterials();
        this.getDefaultMaterial();
      },
      error: (err) => {
        console.error("Error creating material", err);
        this.toast.error(err?.error?.message || "Failed to add material");
      }
    });
  }
  openEditModal(event, material) {
    console.log(material);
    event.stopPropagation();
    this.materialToEdit = __spreadValues({}, material);
    this.showEditModal = true;
  }
  updateMaterial() {
    if (this.materialToEdit) {
      this.materialToEdit.stockPercent = Math.round(this.materialToEdit.stockCurrent / this.materialToEdit.stockTotal * 100);
      this.materialToEdit.status = "ASSIGNED";
      this.materialService.updateMaterial(this.materialToEdit.id, this.materialToEdit).subscribe({
        next: () => {
          this.showEditModal = false;
          this.materialToEdit = null;
          this.toast.success("Material updated successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Update failed", err);
          this.toast.error(err?.error?.message || "Failed to update material");
        }
      });
    }
  }
  openDeleteModal(event, material) {
    event.stopPropagation();
    this.materialToDelete = material;
    this.showDeleteModal = true;
  }
  confirmDelete() {
    if (this.materialToDelete) {
      this.materialService.deleteMaterial(this.materialToDelete.id).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.materialToDelete = null;
          this.toast.success("Material deleted successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Delete failed", err);
          this.toast.error(err?.error?.message || "Failed to delete material");
        }
      });
    }
  }
  calculateStatus(percent) {
    if (percent > 0) {
      return "ASSIGNED";
    }
    return "NOT ASSIGNED";
  }
  getSelectedMat(event) {
    const id = Number(event.target.value);
    if (!id)
      return;
    this.MaterialMasterService.getMaterialMasterById(id).subscribe({
      next: (res) => {
        const data = res?.data || res;
        this.newMaterial = __spreadProps(__spreadValues({}, this.newMaterial), {
          name: data?.name || "",
          sku: data?.sku || "",
          category: data?.category || "",
          material_master_id: data?.id || 0
        });
        console.log("Selected Material =>", this.newMaterial);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  getVendors() {
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
    });
  }
  addVendor() {
    if (this.isSaving)
      return;
    this.errorMsg = "";
    const fd = new FormData();
    fd.append("vendorLegalName", this.newVendor.name);
    fd.append("spocName", this.newVendor.spoc.name);
    fd.append("spocPhone", this.newVendor.spoc.phone);
    fd.append("officialEmail", this.newVendor.email);
    fd.append("officialPhone", this.newVendor.phone);
    fd.append("gstNo", this.newVendor.kyc.gst);
    fd.append("panCardNo", this.newVendor.kyc.pan);
    fd.append("physicalAddress", this.newVendor.address.street);
    fd.append("pincode", this.newVendor.address.pincode);
    fd.append("budgetAllocation", this.newVendor.budget);
    fd.append("services", this.newVendor.services);
    if (this.contractFile) {
      fd.append("contractFile", this.contractFile);
    }
    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddVendorModal = false;
        this.getVendors();
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMsg = err?.error?.message ?? "Vendor onboard failed. Please try again.";
      }
    });
  }
  onContractFileSelected(event) {
    this.contractFile = event.target.files[0];
  }
  onlyNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  onlyAlphanumeric(event) {
    const regex = /^[a-zA-Z0-9]$/;
    const key = event.key;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }
  stripNonNumericOnPaste(event, field, len) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData("text").replace(/\D/g, "").slice(0, len) || "";
    if (field === "phone") {
      this.newVendor.phone = pastedData;
    }
    if (field === "spocPhone") {
      this.newVendor.spoc.phone = pastedData;
    }
    if (field === "pincode") {
      this.newVendor.address.pincode = pastedData;
    }
  }
  stripNonAlphanumericOnPaste(event, field, len) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData("text").replace(/[^a-zA-Z0-9]/g, "").slice(0, len).toUpperCase() || "";
    if (field === "gst") {
      this.newVendor.kyc.gst = pastedData;
    }
    if (field === "pan") {
      this.newVendor.kyc.pan = pastedData;
    }
  }
  getvendor(event) {
    const value = event.target.value;
    if (value == "ADD_NEW") {
      this.showAddVendorModal = true;
      this.newMaterial.vendor_id = "";
      return;
    }
    const vendor = this.vendors.find((v) => v.id == value);
    this.newMaterial.vendor_name = vendor?.name || "";
    this.newMaterial.vendor_id = value || "";
  }
  showAssignProjectModal = false;
  selectedProjects = [];
  toggleProjectSelection(projectId) {
    if (this.selectedProjects.includes(projectId)) {
      this.selectedProjects = this.selectedProjects.filter((id) => id !== projectId);
    } else {
      this.selectedProjects.push(projectId);
    }
  }
  assignedProjects = [
    {
      project_id: null,
      stock: null
    }
  ];
  projectAssignError = "";
  openAssignProjectModal(material) {
    this.materialToEdit = material;
    this.assignedProjects = [
      {
        project_id: null,
        stock: null
      }
    ];
    this.projectAssignError = "";
    this.showAssignProjectModal = true;
  }
  addProjectRow() {
    this.assignedProjects.push({
      project_id: null,
      stock: null
    });
  }
  removeProjectRow(index) {
    if (this.assignedProjects.length === 1) {
      return;
    }
    this.assignedProjects.splice(index, 1);
    this.validateAssignedStock();
  }
  validateAssignedStock() {
    this.projectAssignError = "";
    let totalAssignedStock = 0;
    const selectedProjects = [];
    for (const item of this.assignedProjects) {
      if (!item.project_id || item.stock === null || item.stock === "") {
        this.projectAssignError = "Please select project and enter stock for all rows";
        return false;
      }
      if (+item.stock <= 0) {
        this.projectAssignError = "Stock quantity must be greater than 0";
        return false;
      }
      if (selectedProjects.includes(item.project_id)) {
        this.projectAssignError = "Same project cannot be selected multiple times";
        return false;
      }
      selectedProjects.push(item.project_id);
      totalAssignedStock += Number(item.stock);
    }
    if (totalAssignedStock > this.materialToEdit.stockIn) {
      this.projectAssignError = `Assigned stock (${totalAssignedStock}) cannot exceed available stock (${this.materialToEdit.stockIn})`;
      return false;
    }
    return true;
  }
  getTotalAssignedStock() {
    return this.assignedProjects.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  }
  getRemainingStock() {
    return Number(this.materialToEdit?.stockRemaining || 0) - this.getTotalAssignedStock();
  }
  assignProjects() {
    const isValid = this.validateAssignedStock();
    if (!isValid) {
      return;
    }
    const projectsWithName = this.assignedProjects.map((item) => {
      const project = this.projects.find((p) => p.id == item.project_id);
      return __spreadProps(__spreadValues({}, item), {
        project_name: project?.name || "",
        status: "ASSIGNED"
      });
    });
    const payload = {
      material_id: this.materialToEdit.id,
      projects: projectsWithName
    };
    console.log(payload);
    this.materialService.updateMaterial(this.materialToEdit.id, payload).subscribe({
      next: () => {
        this.showEditModal = false;
        this.materialToEdit = null;
        this.toast.success("Material updated successfully");
        this.materialService.loadMaterials();
        this.materialService.materials$.subscribe((m) => {
          this.materials = m;
          this.page = 1;
          this.updatePagination();
        });
        this.showAssignProjectModal = false;
      },
      error: (err) => {
        console.error("Update failed", err);
        this.toast.error(err?.error?.message || "Failed to update material");
      }
    });
  }
  selectedProjectStock = null;
  showProjectStockPopup = false;
  openProjectStockPopup(item) {
    this.selectedProjectStock = item;
    this.showProjectStockPopup = true;
  }
  showStockTransferModal = false;
  stockTransferData = {
    material_id: "",
    stockIn: 0,
    transfer_note: "",
    transfers: []
  };
  selectedMaterial = null;
  getProjectStock(projectId) {
    if (!projectId || !this.selectedMaterial?.material_project_stock) {
      return 0;
    }
    const stock = this.selectedMaterial.material_project_stock.find((x) => x.project_id == projectId);
    return stock?.stockUsed || 0;
  }
  openStockTransferModal(material) {
    this.selectedMaterial = material;
    console.log(material, "material for stock transfer");
    this.stockTransferData = {
      material_id: material.id,
      stockIn: material.stockIn,
      transfer_note: "",
      transfers: [
        {
          from_project_id: material.project_id || "",
          to_project_id: "",
          quantity: 0
        }
      ]
    };
    this.showStockTransferModal = true;
  }
  addTransferRow() {
    this.stockTransferData.transfers.push({
      from_project_id: "",
      to_project_id: "",
      quantity: 0
    });
  }
  removeTransferRow(index) {
    this.stockTransferData.transfers.splice(index, 1);
  }
  getTotalTransferQty() {
    return this.stockTransferData.transfers.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }
  /**
   * CONTAINED — Project Reallocation is under review. The current cross-project path adjusts project counters
   * without paired ledger movements, so it can show unplaced stock increasing in one project and going negative in
   * another. It is blocked until it is rebuilt as an atomic ledger operation (see the completion register).
   */
  transferStock() {
    this.toast.warning("Project Reallocation is under review and disabled. Use Stock Transfer within a project instead.");
    return;
  }
  legacyTransferStockUnused() {
    if (!this.stockTransferData.transfers.length) {
      this.toast.error("Add at least one transfer");
      return;
    }
    for (const item of this.stockTransferData.transfers) {
      if (!item.from_project_id) {
        this.toast.error("Select From Project");
        return;
      }
      if (!item.to_project_id) {
        this.toast.error("Select To Project");
        return;
      }
      if (item.from_project_id === item.to_project_id) {
        this.toast.error("From & To project cannot be same");
        return;
      }
      if (!item.quantity || item.quantity <= 0) {
        this.toast.error("Enter valid quantity");
        return;
      }
    }
    const takenBySource = /* @__PURE__ */ new Map();
    for (const t of this.stockTransferData.transfers) {
      const key = String(t.from_project_id);
      takenBySource.set(key, (takenBySource.get(key) || 0) + Number(t.quantity));
    }
    for (const [projectId, qty] of takenBySource) {
      if (qty > Number(this.getProjectStock(projectId))) {
        this.toast.error("Transfer quantity exceeds the stock held by the source project");
        return;
      }
    }
    const payload = {
      note: this.stockTransferData.transfer_note,
      transfers: this.stockTransferData.transfers.map((t) => ({
        from_project_id: t.from_project_id,
        to_project_id: t.to_project_id,
        quantity: t.quantity
      }))
    };
    this.materialService.material_stock_transfer(this.stockTransferData.material_id, payload).subscribe({
      next: () => {
        this.toast.success("Stock reallocated successfully");
        this.materialService.loadMaterials();
        this.showStockTransferModal = false;
      },
      error: (err) => {
        console.error("Update failed", err);
        this.toast.error(err?.error?.message || "Failed to update material");
      }
    });
  }
  static \u0275fac = function Materials_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Materials)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Materials, selectors: [["app-materials"]], hostBindings: function Materials_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function Materials_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 237, vars: 78, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-on-surface-variant/80", "font-medium"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-4", "gap-5", "mb-8"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-blue-400", "via-indigo-400", "to-violet-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "absolute", "top-0", "right-0", "w-28", "h-28", "bg-white/10", "rounded-full", "-mr-10", "-mt-10"], [1, "flex", "items-center", "justify-between", "relative", "z-10"], [1, "text-[10px]", "uppercase", "tracking-[0.25em]", "text-white/80", "font-semibold"], [1, "text-3xl", "font-black", "mt-2"], [1, "text-xs", "text-white/70", "mt-1"], [1, "w-14", "h-14", "rounded-2xl", "bg-white/20", "backdrop-blur-md", "border", "border-white/20", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[28px]"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-emerald-400", "via-green-400", "to-teal-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-amber-400", "via-orange-400", "to-orange-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "text-2xl", "font-black", "mt-2"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-slate-500", "via-slate-600", "to-slate-700", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "flex", "items-center", "gap-2", "overflow-x-auto", "custom-scrollbar", "smooth-scroll", "pb-1"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "class"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200/60", "dark:border-slate-800", "shadow-sm", "overflow-hidden"], [1, "overflow-hidden", "rounded-[30px]", "border", "border-slate-200/60", "dark:border-slate-800", "bg-white/80", "dark:bg-slate-900/80", "backdrop-blur-xl", "shadow-[0_20px_60px_rgba(0,0,0,0.08)]"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "justify-between", "gap-4", "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "bg-gradient-to-r", "from-slate-50", "via-white", "to-slate-100", "dark:from-slate-900", "dark:via-slate-900", "dark:to-slate-950"], [1, "text-2xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-sm", "text-slate-500", "dark:text-slate-400", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search materials...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "custom-scrollbar", "smooth-scroll", "px-4", "py-4"], [1, "w-full", "min-w-[1150px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[9999]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4", "px-6", "py-5", "bg-slate-50", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-primary", "hover:text-white", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "ngClass"], ["title", "New Inventory Item", "icon", "inventory_2", "cancelLabel", "Cancel", "primaryLabel", "Add to Inventory", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], [1, "p-8"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2", "relative", "custom-dropdown-wrapper"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-4", "py-3", "rounded-xl", "border-2", "text-sm", "font-bold", "text-left", "bg-white", "dark:bg-slate-900", "transition-all", 3, "click", "ngClass"], [3, "ngClass"], [1, "material-symbols-outlined", "text-lg", "transition-transform", "duration-200", 3, "ngClass"], [1, "dropdown-panel", "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-slate-200", "dark:border-slate-800", "max-h-56", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "p-2"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "relative", "custom-dropdown-wrapper"], ["type", "number", "min", "1", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["min", "1", "type", "number", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "blur", "ngModel"], ["title", "Edit Material", "icon", "edit_square", "cancelLabel", "Cancel", "primaryLabel", "Save Changes", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], ["title", "Assign Material", "subtitle", "Allocate stock project wise", "cancelLabel", "Cancel", "primaryLabel", "Assign Stock", "panelClass", "max-w-3xl", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], [1, "p-6"], [1, "mb-6", "p-4", "rounded-2xl", "bg-slate-50", "dark:bg-slate-800/40", "border", "border-slate-200", "dark:border-slate-700"], [1, "text-[10px]", "uppercase", "tracking-[0.2em]", "font-black", "text-slate-400", "mb-1"], [1, "text-sm", "md:text-base", "font-black", "text-slate-900", "dark:text-white"], [1, "md:text-right"], [1, "text-lg", "font-black", "text-emerald-600"], [1, "space-y-3"], [1, "p-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/60", "dark:bg-slate-800/30", "transition-all"], ["type", "button", 1, "mt-5", "w-full", "border-2", "border-dashed", "border-indigo-300", "dark:border-indigo-700", "rounded-2xl", "py-3.5", "text-indigo-600", "dark:text-indigo-400", "font-black", "text-sm", "hover:bg-indigo-50", "dark:hover:bg-indigo-900/10", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "mt-6", "p-5", "rounded-2xl", "border", "border-indigo-200", "dark:border-indigo-800", "bg-indigo-50", "dark:bg-indigo-900/10"], [1, "grid", "grid-cols-2", "gap-4"], [1, "text-2xl", "font-black", "text-indigo-600"], [1, "text-right"], [1, "text-2xl", "font-black", 3, "ngClass"], [1, "mt-5", "flex", "items-start", "gap-3", "px-4", "py-3", "rounded-2xl", "bg-rose-50", "dark:bg-rose-900/10", "border", "border-rose-200", "dark:border-rose-800", "text-rose-700", "dark:text-rose-400"], ["variant", "danger", "title", "Delete Material?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], ["title", "Project Assignment", "panelClass", "p-6 max-w-2xl", 3, "closed", "open", "subtitle", "showCloseButton", "showFooter", "contentClass"], [1, "p-7"], [1, "flex", "flex-col", "items-center", "justify-center", "py-14", "text-center"], [1, "space-y-4", "max-h-[420px]", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "pr-1"], [1, "fixed", "inset-0", "z-[90]"], ["title", "Project Reallocation", "subtitle", "Move material stock between projects", "icon", "swap_horiz", "cancelLabel", "Cancel", "primaryLabel", "Review Required", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], [1, "p-6", "space-y-8"], ["role", "alert", 1, "rounded-2xl", "border", "border-amber-300", "bg-amber-50", "p-4", "text-amber-900"], [1, "font-black", "text-sm"], [1, "text-xs", "mt-1"], [1, "flex", "items-center", "gap-4", "p-4", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-slate-50", "dark:bg-slate-800/30"], [1, "w-14", "h-14", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[26px]"], [1, "flex-1", "min-w-0"], [1, "text-lg", "font-black", "truncate"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mt-2"], [1, "px-3", "py-1", "rounded-xl", "bg-slate-200", "dark:bg-slate-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-emerald-100", "text-emerald-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-amber-100", "text-amber-700", "text-[11px]", "font-black"], [1, "space-y-4"], [1, "relative", "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "shadow-sm"], [1, "w-full", "py-3", "rounded-2xl", "border-2", "border-dashed", "border-primary/30", "text-primary", "font-black", "hover:bg-primary/5", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "material-symbols-outlined"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-2", "block"], ["rows", "3", "placeholder", "Write transfer note...", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-4", "focus:ring-primary/20", "resize-none", 3, "ngModelChange", "ngModel"], [3, "close", "save", "contractSelect", "onlyNumberEvent", "onlyAlphaNumericEvent", "pasteNumericEvent", "pasteAlphaNumericEvent", "showAddModal", "newVendor", "errorMsg", "contractFile", "isSaving"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "click"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "px-4", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "w-[210px]", "flex", "flex-col", "gap-3"], [1, "flex", "items-center", "gap-3", "text-sm", "font-black"], [1, "flex", "items-center", "gap-1", "text-slate-800", "dark:text-slate-100"], [1, "material-symbols-outlined", "text-[16px]"], [1, "ml-2", "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "inline-flex", "items-center", "gap-3", "px-3.5", "py-2", "rounded-xl", "border", "transition-all", "duration-300", 3, "click", "ngClass"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "flex", "flex-col", "leading-tight", "min-w-[90px]"], [1, "text-sm", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wide", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", "text-slate-400"], [1, "flex", "flex-col"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-12", "h-12", "rounded-full", "bg-gradient-to-br", "from-amber-400", "via-orange-500", "to-red-500", "flex", "items-center", "justify-center", "text-sm", "font-black", "text-white", "shadow-lg"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-[11px]", "text-slate-400", "font-medium"], [1, "px-6", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-4"], ["title", "Assign to Project", 1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["title", "Project Reallocation", 1, "w-11", "h-11", "rounded-2xl", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click", "disabled", "ngClass"], ["title", "Delete Material", 1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "click", "ngClass"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "cursor-pointer", "hover:bg-primary/10", "hover:text-primary", "transition-colors", 3, "ngClass"], [1, "px-4", "py-3", "text-sm", "text-slate-400", "font-medium", "text-center"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "cursor-pointer", "hover:bg-primary/10", "hover:text-primary", "transition-colors", 3, "click", "ngClass"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-black", "text-primary", "cursor-pointer", "hover:bg-primary/10", "transition-colors", "flex", "items-center", "gap-2", "border-t", "border-slate-100", "dark:border-slate-800", "mt-1", "pt-3", 3, "click"], [1, "material-symbols-outlined", "text-base"], [1, "md:col-span-2"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "bg-slate-50", "dark:bg-slate-800/50", "text-slate-500", "cursor-not-allowed", "flex", "items-center", "justify-between"], [1, "material-symbols-outlined", "text-base", "text-slate-400"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "blur", "ngModel"], [1, "relative", "custom-dropdown-wrapper", "mt-4"], [1, "grid", "grid-cols-12", "gap-3", "items-end"], [1, "col-span-12", "md:col-span-7", "relative", "custom-dropdown-wrapper"], [1, "text-[9px]", "uppercase", "tracking-[0.18em]", "font-black", "text-slate-400", "mb-1.5", "block"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-4", "py-3", "rounded-xl", "border", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "text-left", "outline-none", "transition-all", 3, "click", "ngClass"], [1, "col-span-9", "md:col-span-4"], ["type", "number", "min", "1", "placeholder", "Enter qty", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-indigo-500/20", "focus:border-indigo-500", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "col-span-3", "md:col-span-1", "flex", "justify-end"], ["type", "button", 1, "w-11", "h-11", "rounded-xl", "bg-rose-100", "text-rose-600", "hover:bg-rose-200", "transition-all", "flex", "items-center", "justify-center", "disabled:opacity-40", "cursor-pointer", "disabled:hover:bg-rose-100", 3, "click", "disabled"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "cursor-pointer", "hover:bg-indigo-50", "dark:hover:bg-indigo-500/10", "hover:text-indigo-600", "transition-colors", 3, "ngClass"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "cursor-pointer", "hover:bg-indigo-50", "dark:hover:bg-indigo-500/10", "hover:text-indigo-600", "transition-colors", 3, "click", "ngClass"], [1, "text-sm", "font-semibold", "leading-relaxed"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], [1, "w-20", "h-20", "rounded-3xl", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5"], [1, "material-symbols-outlined", "text-[40px]", "text-slate-400"], [1, "text-sm", "text-slate-500", "mt-2"], [1, "p-5", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/70", "dark:bg-slate-800/40"], [1, "w-14", "h-14", "rounded-2xl", "bg-indigo-100", "dark:bg-indigo-500/10", "text-indigo-600", "flex", "items-center", "justify-center"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "text-[11px]", "uppercase", "tracking-wide", "text-slate-400", "font-bold"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "p-2", "bg-surface-container", "rounded-lg", "text-xs", "font-bold", "outline-none", "border", 3, "click", "ngClass"], [1, "material-symbols-outlined", "text-base", "transition-transform", "duration-200", 3, "ngClass"], [1, "dropdown-panel", "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "rounded-xl", "shadow-2xl", "border", "border-slate-200", "dark:border-slate-800", "max-h-48", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "p-1.5"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "bg-primary", "text-white", "rounded", "text-[10px]", "font-bold"], [1, "px-2", "py-1", "bg-surface-container", "text-outline", "rounded", "text-[10px]", "font-bold"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"], [1, "px-3", "py-2", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "hover:bg-primary/10", "hover:text-primary", "transition-colors", 3, "ngClass"], [1, "px-3", "py-2", "rounded-lg", "text-xs", "font-bold", "cursor-pointer", "hover:bg-primary/10", "hover:text-primary", "transition-colors", 3, "click", "ngClass"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center"], [1, "grid", "grid-cols-1", "md:grid-cols-[1fr_auto_1fr_130px]", "gap-4", "items-start"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-4", "py-3", "rounded-2xl", "border", "bg-white", "dark:bg-slate-900", "text-sm", "font-bold", "text-left", "outline-none", "transition-all", 3, "click", "ngClass"], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-emerald-50", "dark:bg-emerald-500/10", "border", "border-emerald-200", "dark:border-emerald-500/20"], [1, "hidden", "md:flex", "justify-center", "pt-6"], [1, "w-12", "h-12", "rounded-2xl", "bg-primary", "text-white", "flex", "items-center", "justify-center", "shadow-lg"], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-blue-50", "dark:bg-blue-500/10", "border", "border-blue-200", "dark:border-blue-500/20"], ["type", "number", "min", "1", "placeholder", "0", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-black", "outline-none", "focus:ring-4", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center", 3, "click"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "cursor-pointer", "hover:bg-primary/10", "hover:text-primary", "transition-colors", "flex", "items-center", "justify-between", 3, "ngClass"], [1, "px-4", "py-2.5", "rounded-xl", "text-sm", "font-semibold", "cursor-pointer", "hover:bg-primary/10", "hover:text-primary", "transition-colors", "flex", "items-center", "justify-between", 3, "click", "ngClass"], [1, "text-[11px]", "text-slate-400", "font-bold"], [1, "flex", "items-center", "justify-between"], [1, "material-symbols-outlined", "text-[18px]", "text-emerald-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-emerald-700", "dark:text-emerald-300"], [1, "text-lg", "font-black", "text-emerald-700", "dark:text-emerald-300"], [1, "material-symbols-outlined", "text-[18px]", "text-blue-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-blue-700", "dark:text-blue-300"], [1, "text-lg", "font-black", "text-blue-700", "dark:text-blue-300"]], template: function Materials_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Materials Inventory ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Precision tracking across active construction sites");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
      \u0275\u0275element(9, "div", 7);
      \u0275\u0275elementStart(10, "div", 8)(11, "div")(12, "p", 9);
      \u0275\u0275text(13, "Total SKU");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "h3", 10);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p", 11);
      \u0275\u0275text(17, "Active Materials");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 12)(19, "span", 13);
      \u0275\u0275text(20, "inventory_2");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(21, "div", 14);
      \u0275\u0275element(22, "div", 7);
      \u0275\u0275elementStart(23, "div", 8)(24, "div")(25, "p", 9);
      \u0275\u0275text(26, "Assigned Items");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "h3", 10);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p", 11);
      \u0275\u0275text(30, "In Projects");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 12)(32, "span", 13);
      \u0275\u0275text(33, "assignment_turned_in");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(34, "div", 15);
      \u0275\u0275element(35, "div", 7);
      \u0275\u0275elementStart(36, "div", 8)(37, "div")(38, "p", 9);
      \u0275\u0275text(39, "Inventory Value");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "h3", 16);
      \u0275\u0275text(41);
      \u0275\u0275pipe(42, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "p", 11);
      \u0275\u0275text(44, "Total Stock Worth");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 12)(46, "span", 13);
      \u0275\u0275text(47, "account_balance_wallet");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(48, "div", 17);
      \u0275\u0275element(49, "div", 7);
      \u0275\u0275elementStart(50, "div", 8)(51, "div")(52, "p", 9);
      \u0275\u0275text(53, "Not Assigned");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "h3", 10);
      \u0275\u0275text(55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p", 11);
      \u0275\u0275text(57, "Awaiting Allocation");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 12)(59, "span", 13);
      \u0275\u0275text(60, "pending_actions");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(61, "div", 18);
      \u0275\u0275repeaterCreate(62, Materials_For_63_Template, 2, 3, "button", 19, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 20)(65, "div", 21)(66, "div", 22)(67, "div")(68, "h3", 23);
      \u0275\u0275text(69, "Materials Inventory ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "p", 24);
      \u0275\u0275text(71, "Smart warehouse stock & supplier management");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "div", 25)(73, "div", 26)(74, "span", 27);
      \u0275\u0275text(75, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "input", 28);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_76_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Materials_Template_input_ngModelChange_76_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(77, "div", 29)(78, "table", 30)(79, "thead")(80, "tr")(81, "th", 31);
      \u0275\u0275text(82, " Material");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "th", 31);
      \u0275\u0275text(84, " Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "th", 31);
      \u0275\u0275text(86, " Stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "th", 31);
      \u0275\u0275text(88, " Assigned Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "th", 31);
      \u0275\u0275text(90, " Cost");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "th", 31);
      \u0275\u0275text(92, " Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "th", 31);
      \u0275\u0275text(94, " Action");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(95, "tbody");
      \u0275\u0275repeaterCreate(96, Materials_For_97_Template, 68, 18, "tr", 32, _forTrack0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(98, "div", 33)(99, "p", 34);
      \u0275\u0275text(100);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(101, "div", 35)(102, "button", 36);
      \u0275\u0275listener("click", function Materials_Template_button_click_102_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(103, "span", 37);
      \u0275\u0275text(104, "chevron_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(105, Materials_For_106_Template, 2, 2, "button", 38, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(107, "button", 36);
      \u0275\u0275listener("click", function Materials_Template_button_click_107_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(108, "span", 37);
      \u0275\u0275text(109, "chevron_right");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(110, "app-common-dialog", 39);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_110_listener() {
        return ctx.showAddModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_110_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275elementStart(111, "div", 40)(112, "div", 41)(113, "div", 42)(114, "label", 43);
      \u0275\u0275text(115, "Material Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(116, "button", 44);
      \u0275\u0275listener("click", function Materials_Template_button_click_116_listener() {
        return ctx.toggleDropdown("matMaster");
      });
      \u0275\u0275elementStart(117, "span", 45);
      \u0275\u0275text(118);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(119, "span", 46);
      \u0275\u0275text(120, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(121, Materials_Conditional_121_Template, 4, 1, "div", 47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(122, "div")(123, "label", 43);
      \u0275\u0275text(124, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "input", 48);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_125_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(126, "div", 49)(127, "label", 43);
      \u0275\u0275text(128, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "button", 44);
      \u0275\u0275listener("click", function Materials_Template_button_click_129_listener() {
        return ctx.toggleDropdown("newCategory");
      });
      \u0275\u0275elementStart(130, "span");
      \u0275\u0275text(131);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(132, "span", 46);
      \u0275\u0275text(133, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(134, Materials_Conditional_134_Template, 3, 0, "div", 47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(135, "div", 49)(136, "label", 43);
      \u0275\u0275text(137, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(138, "button", 44);
      \u0275\u0275listener("click", function Materials_Template_button_click_138_listener() {
        return ctx.toggleDropdown("newProject");
      });
      \u0275\u0275elementStart(139, "span", 45);
      \u0275\u0275text(140);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(141, "span", 46);
      \u0275\u0275text(142, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(143, Materials_Conditional_143_Template, 3, 0, "div", 47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(144, "div")(145, "label", 43);
      \u0275\u0275text(146, "Stock In");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(147, "input", 50);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_147_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.stockIn, $event) || (ctx.newMaterial.stockIn = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(148, "div")(149, "label", 43);
      \u0275\u0275text(150, "Cost");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(151, "input", 51);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_151_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275listener("blur", function Materials_Template_input_blur_151_listener() {
        return ctx.formatCost();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(152, "div", 49)(153, "label", 43);
      \u0275\u0275text(154, "Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(155, "button", 44);
      \u0275\u0275listener("click", function Materials_Template_button_click_155_listener() {
        return ctx.toggleDropdown("newVendor");
      });
      \u0275\u0275elementStart(156, "span", 45);
      \u0275\u0275text(157);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(158, "span", 46);
      \u0275\u0275text(159, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(160, Materials_Conditional_160_Template, 7, 0, "div", 47);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(161, "app-common-dialog", 52);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_161_listener() {
        return ctx.showEditModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_161_listener() {
        return ctx.updateMaterial();
      });
      \u0275\u0275conditionalCreate(162, Materials_Conditional_162_Template, 35, 10, "div", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(163, "app-common-dialog", 53);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_163_listener() {
        return ctx.showAssignProjectModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_163_listener() {
        return ctx.assignProjects();
      });
      \u0275\u0275elementStart(164, "div", 54)(165, "div", 55)(166, "div", 41)(167, "div")(168, "p", 56);
      \u0275\u0275text(169, "Material Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(170, "p", 57);
      \u0275\u0275text(171);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(172, "div", 58)(173, "p", 56);
      \u0275\u0275text(174, "Available Stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(175, "p", 59);
      \u0275\u0275text(176);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(177, "div", 60);
      \u0275\u0275repeaterCreate(178, Materials_For_179_Template, 19, 7, "div", 61, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(180, "button", 62);
      \u0275\u0275listener("click", function Materials_Template_button_click_180_listener() {
        return ctx.addProjectRow();
      });
      \u0275\u0275elementStart(181, "span", 63);
      \u0275\u0275text(182, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(183, " Add More Project ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(184, "div", 64)(185, "div", 65)(186, "div")(187, "p", 56);
      \u0275\u0275text(188, "Total Assigned");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(189, "p", 66);
      \u0275\u0275text(190);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(191, "div", 67)(192, "p", 56);
      \u0275\u0275text(193, "Remaining Stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(194, "p", 68);
      \u0275\u0275text(195);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(196, Materials_Conditional_196_Template, 5, 1, "div", 69);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(197, "app-common-dialog", 70);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_197_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_197_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(198, Materials_Conditional_198_Template, 6, 1, "div", 71);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(199, "app-common-dialog", 72);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_199_listener() {
        return ctx.showProjectStockPopup = false;
      });
      \u0275\u0275elementStart(200, "div", 73);
      \u0275\u0275conditionalCreate(201, Materials_Conditional_201_Template, 8, 0, "div", 74)(202, Materials_Conditional_202_Template, 3, 0, "div", 75);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(203, Materials_Conditional_203_Template, 26, 4, "div", 76);
      \u0275\u0275elementStart(204, "app-common-dialog", 77);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_204_listener() {
        return ctx.showStockTransferModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_204_listener() {
        return ctx.transferStock();
      });
      \u0275\u0275elementStart(205, "div", 78)(206, "div", 79)(207, "p", 80);
      \u0275\u0275text(208, "Review Required \u2014 Project Reallocation is disabled");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(209, "p", 81);
      \u0275\u0275text(210, " Cross-project reallocation is not reconciled: it adjusts project counters without paired ledger movements, so unplaced stock can increase in one project and go negative in another. No reallocation is posted from here. Use Stock Transfer within a project for movements that must reconcile. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(211, "div", 82)(212, "div", 83)(213, "span", 84);
      \u0275\u0275text(214, "inventory_2");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(215, "div", 85)(216, "h3", 86);
      \u0275\u0275text(217);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(218, "div", 87)(219, "div", 88);
      \u0275\u0275text(220);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(221, "div", 89);
      \u0275\u0275text(222);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(223, "div", 90);
      \u0275\u0275text(224);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(225, "div", 91);
      \u0275\u0275repeaterCreate(226, Materials_For_227_Template, 31, 14, "div", 92, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(228, "button", 93);
      \u0275\u0275listener("click", function Materials_Template_button_click_228_listener() {
        return ctx.addTransferRow();
      });
      \u0275\u0275elementStart(229, "span", 94);
      \u0275\u0275text(230, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(231, " Add Transfer Row ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(232, "div")(233, "label", 95);
      \u0275\u0275text(234, "Remarks");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(235, "textarea", 96);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_textarea_ngModelChange_235_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.stockTransferData.transfer_note, $event) || (ctx.stockTransferData.transfer_note = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(236, "app-vendor-add-modal", 97);
      \u0275\u0275listener("close", function Materials_Template_app_vendor_add_modal_close_236_listener() {
        return ctx.showAddVendorModal = false;
      })("save", function Materials_Template_app_vendor_add_modal_save_236_listener() {
        return ctx.addVendor();
      })("contractSelect", function Materials_Template_app_vendor_add_modal_contractSelect_236_listener($event) {
        return ctx.onContractFileSelected($event);
      })("onlyNumberEvent", function Materials_Template_app_vendor_add_modal_onlyNumberEvent_236_listener($event) {
        return ctx.onlyNumbers($event);
      })("onlyAlphaNumericEvent", function Materials_Template_app_vendor_add_modal_onlyAlphaNumericEvent_236_listener($event) {
        return ctx.onlyAlphanumeric($event);
      })("pasteNumericEvent", function Materials_Template_app_vendor_add_modal_pasteNumericEvent_236_listener($event) {
        return ctx.stripNonNumericOnPaste($event.event, $event.field, $event.len);
      })("pasteAlphaNumericEvent", function Materials_Template_app_vendor_add_modal_pasteAlphaNumericEvent_236_listener($event) {
        return ctx.stripNonAlphanumericOnPaste($event.event, $event.field, $event.len);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.materials.length);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.noOfProjectsAssigned);
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(42, 74, ctx.getInventoryValue(), "1.0-0"));
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.noOfProjectsNotAssigned);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(20);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredMaterials.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - ", ctx.endItem, " of ", ctx.filteredMaterials.length, " Materials ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(77, _c0).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(6);
      \u0275\u0275property("ngClass", ctx.openDropdown === "matMaster" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.material_master_id ? "text-slate-800 dark:text-white" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.name || "Select Material", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "matMaster" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "matMaster" ? 121 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.openDropdown === "newCategory" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.newMaterial.category || "Select Category");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "newCategory" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "newCategory" ? 134 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.openDropdown === "newProject" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.project_name || "Select Project", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "newProject" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "newProject" ? 143 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.stockIn);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.openDropdown === "newVendor" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.vendor_id ? "text-slate-800 dark:text-white" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.vendor_name || "Select Vendor", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "newVendor" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "newVendor" ? 160 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("showCloseButton", true)("showFooter", true)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToEdit ? 162 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showAssignProjectModal)("showCloseButton", true)("showFooter", true)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1("", ctx.materialToEdit == null ? null : ctx.materialToEdit.name, " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.materialToEdit == null ? null : ctx.materialToEdit.stockRemaining);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.assignedProjects);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.getTotalAssignedStock());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.getRemainingStock() < 0 ? "text-rose-600" : "text-emerald-600");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getRemainingStock(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.projectAssignError ? 196 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToDelete ? 198 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showProjectStockPopup)("subtitle", ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.name)("showCloseButton", true)("showFooter", false)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!(ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.material_project_stock == null ? null : ctx.selectedProjectStock.material_project_stock.length) ? 201 : 202);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showFilters ? 203 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showStockTransferModal)("showCloseButton", true)("showFooter", true)("contentClass", "min-h-0 overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.selectedMaterial == null ? null : ctx.selectedMaterial.name);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("SKU : ", ctx.selectedMaterial == null ? null : ctx.selectedMaterial.sku);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Main Stock : ", ctx.stockTransferData.stockIn);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Transfer Qty : ", ctx.getTotalTransferQty());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.stockTransferData.transfers);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.stockTransferData.transfer_note);
      \u0275\u0275advance();
      \u0275\u0275property("showAddModal", ctx.showAddVendorModal)("newVendor", ctx.newVendor)("errorMsg", ctx.errorMsg)("contractFile", ctx.contractFile)("isSaving", ctx.isSaving);
    }
  }, dependencies: [NgClass, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, VendorAddComponent, CommonDialogComponent, DecimalPipe], styles: ["\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n}\n.custom-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-panel[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dropdownIn 0.16s ease-out;\n  transform-origin: top;\n}\n@keyframes _ngcontent-%COMP%_dropdownIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n/*# sourceMappingURL=materials.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Materials, [{
    type: Component,
    args: [{ selector: "app-materials", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-1">
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Materials Inventory
            </h2>
            <p class="text-on-surface-variant/80 font-medium">Precision tracking across active construction sites</p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">
            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="flex items-center justify-between relative z-10">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">Total SKU</p>
                    <h3 class="text-3xl font-black mt-2">{{ materials.length }}</h3>
                    <p class="text-xs text-white/70 mt-1">Active Materials</p>
                </div>
                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[28px]">inventory_2</span>
                </div>
            </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">
            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="flex items-center justify-between relative z-10">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">Assigned Items</p>
                    <h3 class="text-3xl font-black mt-2">{{ noOfProjectsAssigned }}</h3>
                    <p class="text-xs text-white/70 mt-1">In Projects</p>
                </div>
                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[28px]">assignment_turned_in</span>
                </div>
            </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">
            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="flex items-center justify-between relative z-10">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">Inventory Value</p>
                    <h3 class="text-2xl font-black mt-2">\u20B9{{ getInventoryValue() | number:'1.0-0' }}</h3>
                    <p class="text-xs text-white/70 mt-1">Total Stock Worth</p>
                </div>
                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[28px]">account_balance_wallet</span>
                </div>
            </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">
            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="flex items-center justify-between relative z-10">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">Not Assigned</p>
                    <h3 class="text-3xl font-black mt-2">{{ noOfProjectsNotAssigned }}</h3>
                    <p class="text-xs text-white/70 mt-1">Awaiting Allocation</p>
                </div>
                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[28px]">pending_actions</span>
                </div>
            </div>
        </div>

    </div>

    <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar smooth-scroll pb-1">
        @for (tab of categories; track tab) {
        <button (click)="changeTab(tab)"
            [class]="selectedTab === tab.category_name ? 'bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-dim'"
            class="px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-colors">
            {{ tab.category_name }}
        </button>
        }
    </div>

    <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">

        <div
            class="overflow-hidden rounded-[30px] border border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            <div
                class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                <div>
                    <h3 class="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Materials Inventory
                    </h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Smart warehouse stock &
                        supplier management</p>
                </div>

                <div class="flex items-center gap-3">
                    <div
                        class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">
                        <span class="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"
                            placeholder="Search materials..."
                            class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto custom-scrollbar smooth-scroll px-4 py-4">
                <table class="w-full min-w-[1150px] border-separate border-spacing-y-4">
                    <thead>
                        <tr>
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Material</th>
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Category</th>
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Stock</th>
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Assigned Projects</th>
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Cost</th>
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Vendor</th>
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @for (item of paginatedMaterials; track item.id) {
                        <tr
                            class="group relative z-0 hover:z-[9999] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">

                            <td
                                class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                                        <div
                                            class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity">
                                        </div>
                                        <span
                                            class="material-symbols-outlined text-primary text-[24px] relative z-10 group-hover:scale-110 transition-transform">inventory_2</span>
                                    </div>
                                    <div class="space-y-1">
                                        <p
                                            class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                                            {{ item.name }}</p>
                                        <div class="flex items-center gap-2">
                                            <span
                                                class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">SKU</span>
                                            <span class="text-xs text-slate-400 font-semibold">{{ item.sku }}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                                <span
                                    class="inline-flex items-center px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide">
                                    {{ item.category }}
                                </span>
                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                                <div class="w-[210px] flex flex-col gap-3">
                                    <div class="flex items-center gap-3 text-sm font-black">
                                        <div class="flex items-center gap-1 text-slate-800 dark:text-slate-100">
                                            <span class="material-symbols-outlined text-[16px]">inventory_2</span>
                                            <span>{{ item.stockRemaining }}</span>
                                        </div>
                                        <span [ngClass]="item.stockUsed >= item.stockRemaining
      ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
      : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'" class="ml-2 px-2.5 py-1 rounded-full
           text-[10px] font-black uppercase tracking-wide">Stock</span>
                                    </div>
                                    <div
                                        class="relative w-full h-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <div class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container transition-all duration-700"
                                            [style.width.%]="item.stockRemaining > 100 ? 100 : item.stockRemaining">
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                                <div (click)="item.material_project_stock?.length > 0 && openProjectStockPopup(item)"
                                    class="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl border transition-all duration-300"
                                    [ngClass]="item.material_project_stock?.length > 0
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/10'
      : 'cursor-not-allowed opacity-70 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'">
                                    <div [ngClass]="item.material_project_stock?.length > 0
        ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600'
        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'"
                                        class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                                        <span class="material-symbols-outlined text-[18px]">
                                            {{ item.material_project_stock?.length > 0 ? 'apartment' : 'inventory_2' }}
                                        </span>
                                    </div>
                                    <div class="flex flex-col leading-tight min-w-[90px]">
                                        @if ((item.material_project_stock?.length || 0) > 0) {
                                        <span class="text-sm font-black text-slate-800 dark:text-white">
                                            {{ item.material_project_stock?.length }}
                                            {{ item.material_project_stock?.length === 1 ? 'Project' : 'Projects' }}
                                        </span>
                                        }
                                        <span [ngClass]="(item.material_project_stock?.length || 0) > 0
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-rose-500 dark:text-rose-400'" class="text-[10px] font-bold uppercase tracking-wide">
                                            {{ (item.material_project_stock?.length || 0) > 0 ? 'Assigned' : 'Not
                                            Assigned' }}
                                        </span>
                                    </div>
                                    <span
                                        class="material-symbols-outlined text-[14px] text-slate-400">arrow_forward_ios</span>
                                </div>
                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                                <div class="flex flex-col">
                                    <span class="text-lg font-black text-slate-800 dark:text-white">\u20B9{{ item.cost
                                        }}</span>
                                    <span class="text-[11px] text-slate-400 font-semibold">Per Unit</span>
                                </div>
                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center text-sm font-black text-white shadow-lg">
                                        {{ (item.vendor_name || "?").charAt(0) }}
                                    </div>
                                    <div>
                                        <p class="text-sm font-black text-slate-700 dark:text-slate-200">{{
                                            item.vendor_name }}</p>
                                        <p class="text-[11px] text-slate-400 font-medium">Verified Supplier</p>
                                    </div>
                                </div>
                            </td>

                            <td
                                class="px-6 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">
                                <div class="flex items-center justify-between gap-4">
                                    <div class="flex items-center gap-2">
                                        <button (click)="openAssignProjectModal(item)" title="Assign to Project"
                                            class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">
                                            <span class="material-symbols-outlined text-[18px]">assignment_ind</span>
                                        </button>
                                        <button (click)="openStockTransferModal(item)" title="Project Reallocation"
                                            [disabled]="!item.material_project_stock?.length" [ngClass]="
      item.material_project_stock?.length
        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
    " class="w-11 h-11 rounded-2xl transition-all duration-200 flex items-center justify-center">
                                            <span
                                                class="material-symbols-outlined text-[18px]">transfer_within_a_station</span>
                                        </button>
                                        <button (click)="openDeleteModal($event, item)" title="Delete Material"
                                            class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">
                                            <span class="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </td>

                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <div
            class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500">
                Showing
                {{ filteredMaterials.length ? ((page - 1) * pageSize) + 1 : 0 }}
                -
                {{endItem}}
                of
                {{ filteredMaterials.length}} Materials
            </p>

            <div class="flex items-center gap-2">
                <button (click)="prevPage()"
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>

                @for (p of [].constructor(totalPages()); track $index) {
                <button (click)="goToPage($index + 1)"
                    class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer"
                    [ngClass]="page === ($index + 1)
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'">
                    {{ $index + 1 }}
                </button>
                }

                <button (click)="nextPage()"
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
            </div>
        </div>
    </div>
</section>

<app-common-dialog [open]="showAddModal" title="New Inventory Item" icon="inventory_2" [showCloseButton]="true"
    [showFooter]="true" cancelLabel="Cancel" primaryLabel="Add to Inventory" (closed)="showAddModal = false"
    (primary)="addMaterial()" [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div class="md:col-span-2 relative custom-dropdown-wrapper">
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material
                    Name</label>
                <button type="button" (click)="toggleDropdown('matMaster')"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-bold text-left bg-white dark:bg-slate-900 transition-all"
                    [ngClass]="openDropdown === 'matMaster' ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800'">
                    <span
                        [ngClass]="newMaterial.material_master_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                        {{ newMaterial.name || 'Select Material' }}
                    </span>
                    <span class="material-symbols-outlined text-lg transition-transform duration-200"
                        [ngClass]="openDropdown === 'matMaster' ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>
                @if (openDropdown === 'matMaster') {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                    @for (material of MaterialMaster; track material.id) {
                    <div (click)="selectMaterialMasterOption(material)"
                        class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                        [ngClass]="newMaterial.material_master_id === material.id ? 'bg-primary/10 text-primary font-black' : 'text-slate-600 dark:text-slate-300'">
                        {{ material.name }}
                    </div>
                    }
                    @if (!MaterialMaster?.length) {
                    <div class="px-4 py-3 text-sm text-slate-400 font-medium text-center">No materials found</div>
                    }
                </div>
                }
            </div>

            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>
                <input [(ngModel)]="newMaterial.sku" type="text" placeholder="SKU-XXX-X"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
            </div>

            <div class="relative custom-dropdown-wrapper">
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>
                <button type="button" (click)="toggleDropdown('newCategory')"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-bold text-left bg-white dark:bg-slate-900 transition-all"
                    [ngClass]="openDropdown === 'newCategory' ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800'">
                    <span>{{ newMaterial.category || 'Select Category' }}</span>
                    <span class="material-symbols-outlined text-lg transition-transform duration-200"
                        [ngClass]="openDropdown === 'newCategory' ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>
                @if (openDropdown === 'newCategory') {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                    @for (cat of categoryOptions; track cat) {
                    <div (click)="selectCategory('new', cat)"
                        class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                        [ngClass]="newMaterial.category === cat ? 'bg-primary/10 text-primary font-black' : 'text-slate-600 dark:text-slate-300'">
                        {{ cat }}
                    </div>
                    }
                </div>
                }
            </div>

            <div class="relative custom-dropdown-wrapper">
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>
                <button type="button" (click)="toggleDropdown('newProject')"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-bold text-left bg-white dark:bg-slate-900 transition-all"
                    [ngClass]="openDropdown === 'newProject' ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800'">
                    <span [ngClass]="newMaterial.project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                        {{ newMaterial.project_name || 'Select Project' }}
                    </span>
                    <span class="material-symbols-outlined text-lg transition-transform duration-200"
                        [ngClass]="openDropdown === 'newProject' ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>
                @if (openDropdown === 'newProject') {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                    @for (p of projects; track p.id) {
                    <div (click)="selectProjectOption('new', p)"
                        class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                        [ngClass]="newMaterial.project_id === p.id ? 'bg-primary/10 text-primary font-black' : 'text-slate-600 dark:text-slate-300'">
                        {{ p.name }}
                    </div>
                    }
                </div>
                }
            </div>

            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Stock In</label>
                <input [(ngModel)]="newMaterial.stockIn" type="number" min="1"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
            </div>
            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Cost</label>
                <input [(ngModel)]="newMaterial.cost" min="1" type="number" (blur)="formatCost()" placeholder="0.00"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
            </div>

            <div class="relative custom-dropdown-wrapper">
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Vendor</label>
                <button type="button" (click)="toggleDropdown('newVendor')"
                    class="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-bold text-left bg-white dark:bg-slate-900 transition-all"
                    [ngClass]="openDropdown === 'newVendor' ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800'">
                    <span [ngClass]="newMaterial.vendor_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                        {{ newMaterial.vendor_name || 'Select Vendor' }}
                    </span>
                    <span class="material-symbols-outlined text-lg transition-transform duration-200"
                        [ngClass]="openDropdown === 'newVendor' ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>
                @if (openDropdown === 'newVendor') {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                    @for (v of vendors; track v.id) {
                    <div (click)="selectVendorOption(v)"
                        class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                        [ngClass]="newMaterial.vendor_id === v.id ? 'bg-primary/10 text-primary font-black' : 'text-slate-600 dark:text-slate-300'">
                        {{ v.name }}
                    </div>
                    }
                    <div (click)="selectVendorOption('ADD_NEW')"
                        class="px-4 py-2.5 rounded-xl text-sm font-black text-primary cursor-pointer hover:bg-primary/10 transition-colors flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1 pt-3">
                        <span class="material-symbols-outlined text-base">add_circle</span>
                        Add New Vendor
                    </div>
                </div>
                }
            </div>
        </div>
    </div>
</app-common-dialog>

<app-common-dialog [open]="showEditModal && !!materialToEdit" title="Edit Material" icon="edit_square"
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" primaryLabel="Save Changes"
    (closed)="showEditModal = false" (primary)="updateMaterial()"
    [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    @if (materialToEdit) {
    <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material
                    Name</label>
                <input [(ngModel)]="materialToEdit.name" type="text" readonly
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
            </div>
            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>
                <input [(ngModel)]="materialToEdit.sku" type="text" readonly
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-slate-50 dark:bg-slate-800/50 text-sm font-bold outline-none cursor-not-allowed">
            </div>

            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>
                <div
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold bg-slate-50 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed flex items-center justify-between">
                    <span>{{ materialToEdit.category }}</span>
                    <span class="material-symbols-outlined text-base text-slate-400">lock</span>
                </div>
            </div>

            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Stock In</label>
                <input [(ngModel)]="materialToEdit.stockIn" type="number"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30"
                    readonly>
            </div>
            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Cost</label>
                <input [(ngModel)]="materialToEdit.cost" type="number" (blur)="formatCostEdit()" readonly
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
            </div>
        </div>

        <div class="relative custom-dropdown-wrapper mt-4">
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>
            <button type="button" (click)="toggleDropdown('editProject')"
                class="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-bold text-left bg-white dark:bg-slate-900 transition-all"
                [ngClass]="openDropdown === 'editProject' ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800'">
                <span [ngClass]="materialToEdit.project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                    {{ getProjectName(materialToEdit.project_id) || 'Select Project' }}
                </span>
                <span class="material-symbols-outlined text-lg transition-transform duration-200"
                    [ngClass]="openDropdown === 'editProject' ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
            </button>
            @if (openDropdown === 'editProject') {
            <div
                class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                @for (p of projects; track p.id) {
                <div (click)="selectProjectOption('edit', p)"
                    class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                    [ngClass]="materialToEdit.project_id === p.id ? 'bg-primary/10 text-primary font-black' : 'text-slate-600 dark:text-slate-300'">
                    {{ p.name }}
                </div>
                }
            </div>
            }
        </div>
    </div>
    }
</app-common-dialog>

<app-common-dialog [open]="showAssignProjectModal" title="Assign Material" subtitle="Allocate stock project wise"
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" primaryLabel="Assign Stock"
    (closed)="showAssignProjectModal = false" (primary)="assignProjects()" panelClass="max-w-3xl"
    [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    <div class="p-6">

        <div
            class="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Material Name</p>
                    <p class="text-sm md:text-base font-black text-slate-900 dark:text-white">{{ materialToEdit?.name }}
                    </p>
                </div>
                <div class="md:text-right">
                    <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Available Stock</p>
                    <p class="text-lg font-black text-emerald-600">{{ materialToEdit?.stockRemaining }}</p>
                </div>
            </div>
        </div>


        <div class="space-y-3">
            @for (item of assignedProjects; track item; let i = $index) {
            <div
                class="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30 transition-all">
                <div class="grid grid-cols-12 gap-3 items-end">

                    <div class="col-span-12 md:col-span-7 relative custom-dropdown-wrapper">
                        <label
                            class="text-[9px] uppercase tracking-[0.18em] font-black text-slate-400 mb-1.5 block">Select
                            Project</label>
                        <button type="button" (click)="toggleDropdown('assign-' + i)"
                            class="w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-sm font-semibold text-left outline-none transition-all"
                            [ngClass]="openDropdown === ('assign-' + i) ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-200 dark:border-slate-700'">
                            <span [ngClass]="item.project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                                {{ getProjectName(item.project_id) || 'Choose Project' }}
                            </span>
                            <span class="material-symbols-outlined text-lg transition-transform duration-200"
                                [ngClass]="openDropdown === ('assign-' + i) ? 'rotate-180 text-indigo-500' : 'text-slate-400'">expand_more</span>
                        </button>
                        @if (openDropdown === ('assign-' + i)) {
                        <div
                            class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                            @for (project of projects; track project.id) {
                            <div (click)="selectAssignProjectOption(i, project)"
                                class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors"
                                [ngClass]="item.project_id === project.id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 font-black' : 'text-slate-600 dark:text-slate-300'">
                                {{ project.name }}
                            </div>
                            }
                        </div>
                        }
                    </div>

                    <div class="col-span-9 md:col-span-4">
                        <label
                            class="text-[9px] uppercase tracking-[0.18em] font-black text-slate-400 mb-1.5 block">Stock
                            Qty</label>
                        <input type="number" min="1" [(ngModel)]="item.stock" (input)="validateAssignedStock()"
                            placeholder="Enter qty"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                    </div>

                    <div class="col-span-3 md:col-span-1 flex justify-end">
                        <button type="button" (click)="removeProjectRow(i)" [disabled]="assignedProjects.length === 1"
                            class="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-all flex items-center justify-center disabled:opacity-40 cursor-pointer disabled:hover:bg-rose-100">
                            <span class="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                    </div>

                </div>
            </div>
            }
        </div>

        <button type="button" (click)="addProjectRow()"
            class="mt-5 w-full border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-2xl py-3.5 text-indigo-600 dark:text-indigo-400 font-black text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-[20px]">add</span>
            Add More Project
        </button>

        <div
            class="mt-6 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/10">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Total Assigned</p>
                    <p class="text-2xl font-black text-indigo-600">{{ getTotalAssignedStock() }}</p>
                </div>
                <div class="text-right">
                    <p class="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Remaining Stock</p>
                    <p [ngClass]="getRemainingStock() < 0 ? 'text-rose-600' : 'text-emerald-600'"
                        class="text-2xl font-black">
                        {{ getRemainingStock() }}
                    </p>
                </div>
            </div>
        </div>

        @if (projectAssignError) {
        <div
            class="mt-5 flex items-start gap-3 px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400">
            <span class="material-symbols-outlined text-[20px]">error</span>
            <p class="text-sm font-semibold leading-relaxed">{{ projectAssignError }}</p>
        </div>
        }

    </div>
</app-common-dialog>

<app-common-dialog [open]="showDeleteModal && !!materialToDelete" variant="danger" title="Delete Material?"
    subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"
    cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="showDeleteModal = false" (primary)="confirmDelete()">
    @if (materialToDelete) {
    <div class="p-8 text-center">
        <p class="text-outline text-sm font-medium">Are you sure you want to remove <span
                class="text-on-surface font-black">"{{ materialToDelete.name }}"</span>? This action cannot be undone.
        </p>
    </div>
    }
</app-common-dialog>

<app-common-dialog [open]="showProjectStockPopup" title="Project Assignment" [subtitle]="selectedProjectStock?.name"
    [showCloseButton]="true" [showFooter]="false" (closed)="showProjectStockPopup = false" panelClass="p-6 max-w-2xl"
    [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    <div class="p-7">
        @if (!selectedProjectStock?.material_project_stock?.length) {
        <div class="flex flex-col items-center justify-center py-14 text-center">
            <div class="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
                <span class="material-symbols-outlined text-[40px] text-slate-400">inventory_2</span>
            </div>
            <h4 class="text-lg font-black text-slate-800 dark:text-white">No Project Assigned</h4>
            <p class="text-sm text-slate-500 mt-2">This material is not assigned to any project yet.</p>
        </div>
        } @else {
        <div class="space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar smooth-scroll pr-1">
            @for (p of selectedProjectStock.material_project_stock; track $index) {
            <div
                class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                            <span class="material-symbols-outlined">apartment</span>
                        </div>
                        <div>
                            <h4 class="text-sm font-black text-slate-800 dark:text-white">{{ p.project_name }}</h4>
                            <p class="text-xs text-slate-400 mt-1">Assigned Project</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <h4 class="text-2xl font-black text-indigo-600">{{ p.stockUsed }}</h4>
                        <p class="text-[11px] uppercase tracking-wide text-slate-400 font-bold">Unit(s)</p>
                    </div>
                </div>
            </div>
            }
        </div>
        }
    </div>
</app-common-dialog>

@if (showFilters) {
<div class="fixed inset-0 z-[90]" (click)="showFilters = false">
    <div class="absolute top-32 right-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 p-6 w-72 animate-in fade-in slide-in-from-top-4 duration-300"
        (click)="$event.stopPropagation()">
        <h4 class="text-xs font-black uppercase tracking-widest text-outline mb-4">Advanced Filters</h4>
        <div class="space-y-4">

            <div class="relative custom-dropdown-wrapper">
                <label class="text-[10px] font-bold text-outline mb-1 block">Sort Order</label>
                <button type="button" (click)="toggleDropdown('sortOrder')"
                    class="w-full flex items-center justify-between p-2 bg-surface-container rounded-lg text-xs font-bold outline-none border"
                    [ngClass]="openDropdown === 'sortOrder' ? 'border-primary ring-2 ring-primary/10' : 'border-transparent'">
                    <span>{{ selectedSort }}</span>
                    <span class="material-symbols-outlined text-base transition-transform duration-200"
                        [ngClass]="openDropdown === 'sortOrder' ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>
                @if (openDropdown === 'sortOrder') {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto custom-scrollbar smooth-scroll p-1.5">
                    @for (opt of sortOptions; track opt) {
                    <div (click)="selectSortOption(opt)"
                        class="px-3 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                        [ngClass]="selectedSort === opt ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300'">
                        {{ opt }}
                    </div>
                    }
                </div>
                }
            </div>

            <div>
                <label class="text-[10px] font-bold text-outline mb-1 block">Supplier Status</label>
                <div class="flex flex-wrap gap-2">
                    <button class="px-2 py-1 bg-primary text-white rounded text-[10px] font-bold">Active</button>
                    <button
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">Preferred</button>
                    <button
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">New</button>
                </div>
            </div>
        </div>
        <button (click)="showFilters = false"
            class="w-full mt-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">Apply
            Filters</button>
    </div>
</div>
}

<app-common-dialog [open]="showStockTransferModal" title="Project Reallocation"
    subtitle="Move material stock between projects" icon="swap_horiz" [showCloseButton]="true" [showFooter]="true"
    [contentClass]="'min-h-0 overflow-y-auto custom-scrollbar smooth-scroll'" cancelLabel="Cancel"
    primaryLabel="Review Required" (closed)="showStockTransferModal = false" (primary)="transferStock()">

    <div class="p-6 space-y-8">
        <div class="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900" role="alert">
            <p class="font-black text-sm">Review Required \u2014 Project Reallocation is disabled</p>
            <p class="text-xs mt-1">
                Cross-project reallocation is not reconciled: it adjusts project counters without paired ledger movements,
                so unplaced stock can increase in one project and go negative in another. No reallocation is posted from here.
                Use Stock Transfer within a project for movements that must reconcile.
            </p>
        </div>

        <div
            class="flex items-center gap-4 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[26px]">inventory_2</span>
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="text-lg font-black truncate">{{ selectedMaterial?.name }}</h3>
                <div class="flex flex-wrap items-center gap-2 mt-2">
                    <div class="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-[11px] font-black">SKU : {{
                        selectedMaterial?.sku }}</div>
                    <div class="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-700 text-[11px] font-black">Main Stock
                        : {{ stockTransferData.stockIn }}</div>
                    <div class="px-3 py-1 rounded-xl bg-amber-100 text-amber-700 text-[11px] font-black">Transfer Qty :
                        {{ getTotalTransferQty() }}</div>
                </div>
            </div>
        </div>

        <div class="space-y-4">
            @for (item of stockTransferData.transfers; track item; let i = $index) {
            <div
                class="relative p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">

                @if (stockTransferData.transfers.length > 1) {
                <button (click)="removeTransferRow(i)"
                    class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
                }

                <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_130px] gap-4 items-start">

                    <div class="relative custom-dropdown-wrapper">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">From
                            Project</label>
                        <button type="button" (click)="toggleDropdown('transferFrom-' + i)"
                            class="w-full flex items-center justify-between px-4 py-3 rounded-2xl border bg-white dark:bg-slate-900 text-sm font-bold text-left outline-none transition-all"
                            [ngClass]="openDropdown === ('transferFrom-' + i) ? 'border-primary ring-4 ring-primary/20' : 'border-slate-200 dark:border-slate-700'">
                            <span
                                [ngClass]="item.from_project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                                {{ getProjectName(item.from_project_id) || 'Select Project' }}
                            </span>
                            <span class="material-symbols-outlined text-lg transition-transform duration-200"
                                [ngClass]="openDropdown === ('transferFrom-' + i) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                        </button>
                        @if (openDropdown === ('transferFrom-' + i)) {
                        <div
                            class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                            @for (p of projects; track p.id) {
                            <div (click)="selectTransferProjectOption(i, 'from', p)"
                                class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between"
                                [ngClass]="item.from_project_id === p.id ? 'bg-primary/10 text-primary font-black' : 'text-slate-600 dark:text-slate-300'">
                                <span>{{ p.name }}</span>
                                <span class="text-[11px] text-slate-400 font-bold">Stock : {{ getProjectStock(p.id)
                                    }}</span>
                            </div>
                            }
                        </div>
                        }

                        @if (item.from_project_id) {
                        <div
                            class="mt-3 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span
                                        class="material-symbols-outlined text-[18px] text-emerald-600">inventory</span>
                                    <span
                                        class="text-[11px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Available
                                        Stock</span>
                                </div>
                                <span class="text-lg font-black text-emerald-700 dark:text-emerald-300">{{
                                    getProjectStock(item.from_project_id) }}</span>
                            </div>
                        </div>
                        }
                    </div>

                    <div class="hidden md:flex justify-center pt-6">
                        <div
                            class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                            <span class="material-symbols-outlined">east</span>
                        </div>
                    </div>

                    <div class="relative custom-dropdown-wrapper">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">To
                            Project</label>
                        <button type="button" (click)="toggleDropdown('transferTo-' + i)"
                            class="w-full flex items-center justify-between px-4 py-3 rounded-2xl border bg-white dark:bg-slate-900 text-sm font-bold text-left outline-none transition-all"
                            [ngClass]="openDropdown === ('transferTo-' + i) ? 'border-primary ring-4 ring-primary/20' : 'border-slate-200 dark:border-slate-700'">
                            <span [ngClass]="item.to_project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                                {{ getProjectName(item.to_project_id) || 'Select Project' }}
                            </span>
                            <span class="material-symbols-outlined text-lg transition-transform duration-200"
                                [ngClass]="openDropdown === ('transferTo-' + i) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                        </button>
                        @if (openDropdown === ('transferTo-' + i)) {
                        <div
                            class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto custom-scrollbar smooth-scroll p-2">
                            @for (p of projects; track p.id) {
                            <div (click)="selectTransferProjectOption(i, 'to', p)"
                                class="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between"
                                [ngClass]="item.to_project_id === p.id ? 'bg-primary/10 text-primary font-black' : 'text-slate-600 dark:text-slate-300'">
                                <span>{{ p.name }}</span>
                                <span class="text-[11px] text-slate-400 font-bold">Stock : {{ getProjectStock(p.id)
                                    }}</span>
                            </div>
                            }
                        </div>
                        }

                        @if (item.to_project_id) {
                        <div
                            class="mt-3 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-[18px] text-blue-600">warehouse</span>
                                    <span
                                        class="text-[11px] font-black uppercase tracking-wide text-blue-700 dark:text-blue-300">Current
                                        Stock</span>
                                </div>
                                <span class="text-lg font-black text-blue-700 dark:text-blue-300">{{
                                    getProjectStock(item.to_project_id) }}</span>
                            </div>
                        </div>
                        }
                    </div>

                    <div>
                        <label
                            class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Quantity</label>
                        <input [(ngModel)]="item.quantity" type="number" min="1" placeholder="0"
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-black outline-none focus:ring-4 focus:ring-primary/20">
                    </div>

                </div>
            </div>
            }
        </div>

        <button (click)="addTransferRow()"
            class="w-full py-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-black hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">add</span>
            Add Transfer Row
        </button>

        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Remarks</label>
            <textarea [(ngModel)]="stockTransferData.transfer_note" rows="3" placeholder="Write transfer note..."
                class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/20 resize-none"></textarea>
        </div>

    </div>
</app-common-dialog>

<app-vendor-add-modal [showAddModal]="showAddVendorModal" [newVendor]="newVendor" [errorMsg]="errorMsg"
    [contractFile]="contractFile" [isSaving]="isSaving" (close)="showAddVendorModal = false" (save)="addVendor()"
    (contractSelect)="onContractFileSelected($event)" (onlyNumberEvent)="onlyNumbers($event)"
    (onlyAlphaNumericEvent)="onlyAlphanumeric($event)"
    (pasteNumericEvent)="stripNonNumericOnPaste($event.event, $event.field, $event.len)"
    (pasteAlphaNumericEvent)="stripNonAlphanumericOnPaste($event.event, $event.field, $event.len)">
</app-vendor-add-modal>`, styles: ["/* src/app/modules/resources/materials/materials.scss */\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll {\n  scroll-behavior: smooth;\n}\n.custom-dropdown-wrapper .dropdown-panel {\n  animation: dropdownIn 0.16s ease-out;\n  transform-origin: top;\n}\n@keyframes dropdownIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n/*# sourceMappingURL=materials.css.map */\n"] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Materials, { className: "Materials", filePath: "app/modules/resources/materials/materials.ts", lineNumber: 17 });
})();

// src/app/modules/resources/contracts/contracts.ts
function Contracts_tr_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 44)(1, "td", 37)(2, "div", 45)(3, "div", 46)(4, "span", 8);
    \u0275\u0275text(5, "assignment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "span", 47);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 48);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "td", 37)(12, "div", 49);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 50);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 37)(17, "div", 51)(18, "span", 52);
    \u0275\u0275text(19, "domain");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 37)(22, "div", 53);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 54);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 55)(27, "div");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 56);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "td", 38)(34, "span", 57);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "td", 39)(37, "button", 58);
    \u0275\u0275listener("click", function Contracts_tr_102_Template_button_click_37_listener() {
      const contract_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewContract(contract_r2));
    });
    \u0275\u0275elementStart(38, "span", 59);
    \u0275\u0275text(39, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275text(40, " View ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const contract_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(contract_r2.contractNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(contract_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(contract_r2.vendorName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(contract_r2.vendorCategory);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", contract_r2.projectName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", contract_r2.contractValue.toLocaleString("en-IN"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Paid: \u20B9", contract_r2.paidAmount.toLocaleString("en-IN"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(29, 11, contract_r2.startDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("to ", \u0275\u0275pipeBind2(32, 14, contract_r2.endDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(contract_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", contract_r2.status, " ");
  }
}
function Contracts_tr_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 60)(2, "span", 61);
    \u0275\u0275text(3, "find_in_page");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 62);
    \u0275\u0275text(5, "No procurement contracts found matching your filters.");
    \u0275\u0275elementEnd()()();
  }
}
function Contracts_div_104_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64)(2, "div", 65)(3, "div")(4, "span", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 67);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 68);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 69);
    \u0275\u0275listener("click", function Contracts_div_104_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDetailModal = false);
    });
    \u0275\u0275elementStart(11, "span", 70);
    \u0275\u0275text(12, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 71)(14, "div")(15, "span", 72);
    \u0275\u0275text(16, "Total Contract Value");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 73);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "span", 72);
    \u0275\u0275text(21, "Paid Milestone Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 74);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div")(25, "span", 72);
    \u0275\u0275text(26, "Project Site");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "p", 75);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div")(30, "span", 72);
    \u0275\u0275text(31, "Execution Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 75);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 76)(35, "h4", 77);
    \u0275\u0275text(36, "Scope of Work & Agreement Terms");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 78);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 79)(40, "button", 80);
    \u0275\u0275listener("click", function Contracts_div_104_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDetailModal = false);
    });
    \u0275\u0275text(41, " Close ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedContract.contractNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedContract.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r2.selectedContract.vendorName, " (", ctx_r2.selectedContract.vendorCategory, ")");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r2.selectedContract.contractValue.toLocaleString("en-IN"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r2.selectedContract.paidAmount.toLocaleString("en-IN"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedContract.projectName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r2.selectedContract.startDate, " to ", ctx_r2.selectedContract.endDate);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedContract.scope, " ");
  }
}
function Contracts_div_105_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64)(2, "div", 81)(3, "h2", 82);
    \u0275\u0275text(4, "Create Procurement Contract Agreement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 69);
    \u0275\u0275listener("click", function Contracts_div_105_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreateModal = false);
    });
    \u0275\u0275elementStart(6, "span", 70);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 83)(9, "div", 84)(10, "label", 85);
    \u0275\u0275text(11, "Contract Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.title, $event) || (ctx_r2.newContract.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "label", 85);
    \u0275\u0275text(15, "Vendor / Supplier *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.vendorName, $event) || (ctx_r2.newContract.vendorName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "label", 85);
    \u0275\u0275text(19, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 88);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.vendorCategory, $event) || (ctx_r2.newContract.vendorCategory = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 89);
    \u0275\u0275text(22, "Raw Materials & Metals");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 90);
    \u0275\u0275text(24, "Concrete & Masonry");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 91);
    \u0275\u0275text(26, "Plant & Heavy Machinery");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 92);
    \u0275\u0275text(28, "Electrical & MEP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 93);
    \u0275\u0275text(30, "Subcontracting");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div")(32, "label", 85);
    \u0275\u0275text(33, "Contract Value (\u20B9 INR) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 94);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.contractValue, $event) || (ctx_r2.newContract.contractValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div")(36, "label", 85);
    \u0275\u0275text(37, "Project Site");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.projectName, $event) || (ctx_r2.newContract.projectName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div")(40, "label", 85);
    \u0275\u0275text(41, "Start Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.startDate, $event) || (ctx_r2.newContract.startDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div")(44, "label", 85);
    \u0275\u0275text(45, "End Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.endDate, $event) || (ctx_r2.newContract.endDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 84)(48, "label", 85);
    \u0275\u0275text(49, "Scope of Supply / Contract Terms");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "textarea", 97);
    \u0275\u0275twoWayListener("ngModelChange", function Contracts_div_105_Template_textarea_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newContract.scope, $event) || (ctx_r2.newContract.scope = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 98)(52, "button", 80);
    \u0275\u0275listener("click", function Contracts_div_105_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreateModal = false);
    });
    \u0275\u0275text(53, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 99);
    \u0275\u0275listener("click", function Contracts_div_105_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveNewContract());
    });
    \u0275\u0275text(55, " Save & Register Contract ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.vendorName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.vendorCategory);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.contractValue);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.projectName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.startDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.endDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newContract.scope);
  }
}
var Contracts = class _Contracts {
  contracts = [
    {
      id: 1,
      contractNumber: "PC-2026-081",
      title: "Structural Steel Supply & Fabrication",
      vendorName: "Apex Steel Industries Pvt Ltd",
      vendorCategory: "Raw Materials & Metals",
      projectName: "Skyline Commercial Towers",
      contractValue: 45e5,
      paidAmount: 225e4,
      startDate: "2026-03-01",
      endDate: "2026-11-30",
      status: "Active",
      scope: "Supply of IS 2062 Grade E250 structural steel beams, fabrication, and on-site delivery."
    },
    {
      id: 2,
      contractNumber: "PC-2026-094",
      title: "Ready Mix Concrete (RMC) M35/M40 Batching Agreement",
      vendorName: "Ultratech Premix Logistics",
      vendorCategory: "Concrete & Masonry",
      projectName: "Metro Rail Corridor 4",
      contractValue: 82e5,
      paidAmount: 51e5,
      startDate: "2026-01-15",
      endDate: "2026-12-31",
      status: "Active",
      scope: "Delivery of 14,000 m3 RMC with transit mixers, concrete pumping, and quality cube testing."
    },
    {
      id: 3,
      contractNumber: "PC-2026-102",
      title: "Heavy Earthmoving Excavator & Crane Leasing",
      vendorName: "Voltas Equipment Fleet Ltd",
      vendorCategory: "Plant & Heavy Machinery",
      projectName: "Green Valley Residential Villas",
      contractValue: 28e5,
      paidAmount: 14e5,
      startDate: "2026-04-10",
      endDate: "2026-09-30",
      status: "Under Review",
      scope: "Wet lease of 2x CAT 320D excavators and 1x 50-tonne mobile crawler crane with operators."
    },
    {
      id: 4,
      contractNumber: "PC-2026-115",
      title: "MEP Electrical Distribution & Substation Setup",
      vendorName: "Schneider Power Systems India",
      vendorCategory: "Electrical & MEP",
      projectName: "Skyline Commercial Towers",
      contractValue: 64e5,
      paidAmount: 64e5,
      startDate: "2025-08-01",
      endDate: "2026-05-15",
      status: "Completed",
      scope: "Supply and turnkey commissioning of 11kV transformers, HT panels, and busbar trunking."
    },
    {
      id: 5,
      contractNumber: "PC-2026-128",
      title: "Structural Glazing and Facade Works",
      vendorName: "Permasteelisa Architectural Glass",
      vendorCategory: "Subcontracting",
      projectName: "Metro Rail Corridor 4",
      contractValue: 39e5,
      paidAmount: 0,
      startDate: "2026-11-01",
      endDate: "2027-04-30",
      status: "Draft",
      scope: "DGU unitized facade installation, silicon sealants, wind load structural test certs."
    }
  ];
  filteredContracts = [];
  searchQuery = "";
  statusFilter = "All";
  showCreateModal = false;
  selectedContract = null;
  showDetailModal = false;
  newContract = {
    title: "",
    vendorName: "",
    vendorCategory: "Raw Materials & Metals",
    projectName: "Skyline Commercial Towers",
    contractValue: 0,
    startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    endDate: "",
    status: "Draft",
    scope: ""
  };
  ngOnInit() {
    this.filteredContracts = [...this.contracts];
  }
  get totalContractValue() {
    return this.contracts.reduce((sum, c) => sum + (c.contractValue || 0), 0);
  }
  get activeContractsCount() {
    return this.contracts.filter((c) => c.status === "Active").length;
  }
  get underReviewCount() {
    return this.contracts.filter((c) => c.status === "Under Review").length;
  }
  get totalPaidValue() {
    return this.contracts.reduce((sum, c) => sum + (c.paidAmount || 0), 0);
  }
  filterContracts() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredContracts = this.contracts.filter((c) => {
      const matchesSearch = !q || c.contractNumber.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.vendorName.toLowerCase().includes(q) || c.projectName.toLowerCase().includes(q);
      const matchesStatus = this.statusFilter === "All" || c.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
  viewContract(c) {
    this.selectedContract = c;
    this.showDetailModal = true;
  }
  openCreateModal() {
    this.newContract = {
      title: "",
      vendorName: "",
      vendorCategory: "Raw Materials & Metals",
      projectName: "Skyline Commercial Towers",
      contractValue: 0,
      startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      endDate: "",
      status: "Draft",
      scope: ""
    };
    this.showCreateModal = true;
  }
  saveNewContract() {
    if (!this.newContract.title || !this.newContract.vendorName || !this.newContract.contractValue) {
      alert("Please fill all mandatory fields (Title, Vendor, Value)");
      return;
    }
    const created = {
      id: Date.now(),
      contractNumber: `PC-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      title: this.newContract.title,
      vendorName: this.newContract.vendorName,
      vendorCategory: this.newContract.vendorCategory || "Procurement",
      projectName: this.newContract.projectName || "Active Site",
      contractValue: Number(this.newContract.contractValue),
      paidAmount: 0,
      startDate: this.newContract.startDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      endDate: this.newContract.endDate || "2027-01-01",
      status: this.newContract.status || "Draft",
      scope: this.newContract.scope || "Procurement agreement terms"
    };
    this.contracts.unshift(created);
    this.filterContracts();
    this.showCreateModal = false;
  }
  getStatusClass(status) {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300";
      case "Under Review":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300";
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300";
    }
  }
  static \u0275fac = function Contracts_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Contracts)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Contracts, selectors: [["app-contracts"]], standalone: false, decls: 106, vars: 12, consts: [[1, "bg-slate-50/50", "dark:bg-slate-950", "min-h-screen", "animate-in", "p-4", "sm:p-6", "lg:p-8"], [1, "flex", "flex-col", "sm:flex-row", "sm:justify-between", "sm:items-center", "gap-4", "mb-8"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "px-2.5", "py-0.5", "rounded-full", "bg-blue-500/10", "text-blue-600", "dark:text-blue-400", "border", "border-blue-500/20"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "text-sm"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "justify-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "w-full", "sm:w-auto", "cursor-pointer", 3, "click"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "relative", "z-10", "tracking-wide", "text-sm"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-5", "mb-8"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-blue-600", "via-indigo-600", "to-violet-700", "text-white", "shadow-lg", "shadow-blue-500/15"], [1, "flex", "items-center", "justify-between"], [1, "text-[10px]", "uppercase", "tracking-widest", "text-white/80", "font-bold"], [1, "text-3xl", "font-black", "mt-2"], [1, "text-xs", "text-white/70", "mt-1"], [1, "w-13", "h-13", "rounded-2xl", "bg-white/20", "backdrop-blur-md", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-3xl"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-emerald-500", "via-teal-600", "to-emerald-700", "text-white", "shadow-lg", "shadow-emerald-500/15"], [1, "text-2xl", "font-black", "mt-2"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-purple-500", "via-violet-600", "to-indigo-700", "text-white", "shadow-lg", "shadow-purple-500/15"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-amber-500", "via-orange-500", "to-amber-600", "text-white", "shadow-lg", "shadow-amber-500/15"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/80", "dark:border-slate-800", "shadow-sm", "mb-6", "p-4", "flex", "flex-col", "sm:flex-row", "items-center", "gap-4"], [1, "relative", "flex-1", "w-full"], [1, "material-symbols-outlined", "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "text", "placeholder", "Search contracts by ID, title, vendor name, or site project...", 1, "w-full", "pl-12", "pr-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "dark:text-white", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-blue-500/30", "transition-all", "outline-none", 3, "ngModelChange", "input", "ngModel"], [1, "flex", "items-center", "gap-3", "w-full", "sm:w-auto"], [1, "px-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "dark:text-white", "rounded-2xl", "text-xs", "font-bold", "border", "border-slate-200", "dark:border-slate-700", "outline-none", 3, "ngModelChange", "change", "ngModel"], ["value", "All"], ["value", "Active"], ["value", "Under Review"], ["value", "Completed"], ["value", "Draft"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/80", "dark:border-slate-800", "shadow-xl", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-sm", "text-slate-600", "dark:text-slate-300"], [1, "bg-slate-50", "dark:bg-slate-800/60", "text-[11px]", "font-black", "uppercase", "tracking-wider", "text-slate-500", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "px-6", "py-4"], [1, "px-6", "py-4", "text-center"], [1, "px-6", "py-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800/60"], ["class", "hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4", 4, "ngIf"], [1, "hover:bg-slate-50/70", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-2xl", "bg-blue-500/10", "text-blue-600", "dark:text-blue-400", "flex", "items-center", "justify-center", "shrink-0", "border", "border-blue-500/20"], [1, "text-xs", "font-black", "text-blue-600", "dark:text-blue-400", "tracking-wide", "font-mono"], [1, "font-bold", "text-slate-800", "dark:text-white", "mt-0.5", "line-clamp-1"], [1, "font-bold", "text-slate-800", "dark:text-slate-100"], [1, "text-[11px]", "text-slate-400"], [1, "flex", "items-center", "gap-1.5", "font-medium", "text-slate-700", "dark:text-slate-200"], [1, "material-symbols-outlined", "text-slate-400", "text-[16px]"], [1, "font-black", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-emerald-600", "dark:text-emerald-400", "font-semibold"], [1, "px-6", "py-4", "text-xs", "font-medium"], [1, "text-slate-400"], [1, "px-3", "py-1", "rounded-full", "text-[11px]", "font-black", "border", 3, "ngClass"], [1, "px-3.5", "py-1.5", "rounded-xl", "bg-blue-50", "hover:bg-blue-100", "text-blue-600", "dark:bg-blue-900/30", "dark:hover:bg-blue-900/50", "dark:text-blue-300", "text-xs", "font-bold", "transition-all", "cursor-pointer", "inline-flex", "items-center", "gap-1", 3, "click"], [1, "material-symbols-outlined", "text-[15px]"], ["colspan", "7", 1, "px-6", "py-12", "text-center", "text-slate-400"], [1, "material-symbols-outlined", "text-4xl", "mb-2"], [1, "font-medium", "text-sm"], [1, "fixed", "inset-0", "z-50", "bg-slate-900/60", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "max-w-2xl", "w-full", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "p-6", "sm:p-8", "animate-in", "fade-in", "zoom-in-95"], [1, "flex", "items-start", "justify-between", "mb-6"], [1, "text-xs", "font-mono", "font-bold", "text-blue-600", "dark:text-blue-400"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white", "mt-1"], [1, "text-xs", "text-slate-500"], [1, "w-8", "h-8", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "text-slate-500", "hover:text-slate-800", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "grid", "grid-cols-2", "gap-4", "mb-6", "p-4", "rounded-2xl", "bg-slate-50", "dark:bg-slate-800/50"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400"], [1, "text-lg", "font-black", "text-slate-900", "dark:text-white"], [1, "text-lg", "font-black", "text-emerald-600"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300"], [1, "mb-6"], [1, "text-xs", "font-black", "uppercase", "tracking-wider", "text-slate-500", "mb-2"], [1, "p-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-800", "text-xs", "text-slate-600", "dark:text-slate-300", "leading-relaxed", "bg-white", "dark:bg-slate-900"], [1, "flex", "justify-end", "gap-3"], [1, "px-5", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "font-bold", "text-xs", "text-slate-700", "dark:text-slate-300", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mb-4"], [1, "sm:col-span-2"], [1, "block", "text-xs", "font-bold", "text-slate-600", "dark:text-slate-300", "mb-1"], ["type", "text", "placeholder", "e.g. Structural Steel & Rebar Supply Order", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Supplier Company Name", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["value", "Raw Materials & Metals"], ["value", "Concrete & Masonry"], ["value", "Plant & Heavy Machinery"], ["value", "Electrical & MEP"], ["value", "Subcontracting"], ["type", "number", "placeholder", "e.g. 5000000", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Site Project Name", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Detailed deliverables, delivery milestones, liquidated damages, quality warranties...", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "gap-3", "pt-2"], [1, "px-6", "py-2.5", "rounded-xl", "bg-blue-600", "hover:bg-blue-700", "font-bold", "text-xs", "text-white", "shadow-lg", "shadow-blue-500/20", "cursor-pointer", 3, "click"]], template: function Contracts_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span", 3);
      \u0275\u0275text(5, " Purchase & Vendor Contracting ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 4);
      \u0275\u0275text(7, "Procurement Contracts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9, " Legally binding supplier purchase agreements, delivery terms, committed scopes, and payment milestones. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "button", 6);
      \u0275\u0275listener("click", function Contracts_Template_button_click_10_listener() {
        return ctx.openCreateModal();
      });
      \u0275\u0275elementStart(11, "div", 7)(12, "span", 8);
      \u0275\u0275text(13, "add");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "span", 9);
      \u0275\u0275text(15, "New Contract Agreement");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 10)(17, "div", 11)(18, "div", 12)(19, "div")(20, "p", 13);
      \u0275\u0275text(21, "Total Contracts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "h3", 14);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p", 15);
      \u0275\u0275text(25, "Vendor Master Contracts");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 16)(27, "span", 17);
      \u0275\u0275text(28, "description");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(29, "div", 18)(30, "div", 12)(31, "div")(32, "p", 13);
      \u0275\u0275text(33, "Total Contract Value");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "h3", 19);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p", 15);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 16)(39, "span", 17);
      \u0275\u0275text(40, "account_balance_wallet");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "div", 20)(42, "div", 12)(43, "div")(44, "p", 13);
      \u0275\u0275text(45, "Disbursed / Paid");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "h3", 19);
      \u0275\u0275text(47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 15);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 16)(51, "span", 17);
      \u0275\u0275text(52, "payments");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(53, "div", 21)(54, "div", 12)(55, "div")(56, "p", 13);
      \u0275\u0275text(57, "Under Legal Review");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "h3", 14);
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "p", 15);
      \u0275\u0275text(61, "Pending Compliance Sign-off");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div", 16)(63, "span", 17);
      \u0275\u0275text(64, "verified_user");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(65, "div", 22)(66, "div", 23)(67, "span", 24);
      \u0275\u0275text(68, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function Contracts_Template_input_ngModelChange_69_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function Contracts_Template_input_input_69_listener() {
        return ctx.filterContracts();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div", 26)(71, "select", 27);
      \u0275\u0275twoWayListener("ngModelChange", function Contracts_Template_select_ngModelChange_71_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function Contracts_Template_select_change_71_listener() {
        return ctx.filterContracts();
      });
      \u0275\u0275elementStart(72, "option", 28);
      \u0275\u0275text(73, "All Statuses");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "option", 29);
      \u0275\u0275text(75, "Active");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "option", 30);
      \u0275\u0275text(77, "Under Review");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "option", 31);
      \u0275\u0275text(79, "Completed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "option", 32);
      \u0275\u0275text(81, "Draft");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(82, "div", 33)(83, "div", 34)(84, "table", 35)(85, "thead", 36)(86, "tr")(87, "th", 37);
      \u0275\u0275text(88, "Contract ID & Title");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "th", 37);
      \u0275\u0275text(90, "Vendor & Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "th", 37);
      \u0275\u0275text(92, "Project Site");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "th", 37);
      \u0275\u0275text(94, "Value & Paid");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "th", 37);
      \u0275\u0275text(96, "Validity");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "th", 38);
      \u0275\u0275text(98, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "th", 39);
      \u0275\u0275text(100, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(101, "tbody", 40);
      \u0275\u0275template(102, Contracts_tr_102_Template, 41, 17, "tr", 41)(103, Contracts_tr_103_Template, 6, 0, "tr", 42);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(104, Contracts_div_104_Template, 42, 10, "div", 43)(105, Contracts_div_105_Template, 56, 8, "div", 43);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275textInterpolate(ctx.contracts.length);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1("\u20B9", (ctx.totalContractValue / 1e5).toFixed(1), " Lakhs");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.activeContractsCount, " Active In-Force");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("\u20B9", (ctx.totalPaidValue / 1e5).toFixed(1), " Lakhs");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", (ctx.totalPaidValue / (ctx.totalContractValue || 1) * 100).toFixed(0), "% Execution Rate");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.underReviewCount);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(31);
      \u0275\u0275property("ngForOf", ctx.filteredContracts);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredContracts.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showDetailModal && ctx.selectedContract);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showCreateModal);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Contracts, [{
    type: Component,
    args: [{ selector: "app-contracts", standalone: false, template: `<div class="bg-slate-50/50 dark:bg-slate-950 min-h-screen animate-in p-4 sm:p-6 lg:p-8">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          Purchase & Vendor Contracting
        </span>
      </div>
      <h1 class="text-3xl font-black text-slate-800 dark:text-white">Procurement Contracts</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm">
        Legally binding supplier purchase agreements, delivery terms, committed scopes, and payment milestones.
      </p>
    </div>

    <button (click)="openCreateModal()"
      class="group relative overflow-hidden flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] w-full sm:w-auto cursor-pointer">
      <div class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
        <span class="material-symbols-outlined text-[20px]">add</span>
      </div>
      <span class="relative z-10 tracking-wide text-sm">New Contract Agreement</span>
    </button>
  </div>

  <!-- KPI Metrics Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
    <!-- Total Contracts -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white shadow-lg shadow-blue-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Total Contracts</p>
          <h3 class="text-3xl font-black mt-2">{{ contracts.length }}</h3>
          <p class="text-xs text-white/70 mt-1">Vendor Master Contracts</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">description</span>
        </div>
      </div>
    </div>

    <!-- Active Value -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Total Contract Value</p>
          <h3 class="text-2xl font-black mt-2">\u20B9{{ (totalContractValue / 100000).toFixed(1) }} Lakhs</h3>
          <p class="text-xs text-white/70 mt-1">{{ activeContractsCount }} Active In-Force</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">account_balance_wallet</span>
        </div>
      </div>
    </div>

    <!-- Paid Amount -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 text-white shadow-lg shadow-purple-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Disbursed / Paid</p>
          <h3 class="text-2xl font-black mt-2">\u20B9{{ (totalPaidValue / 100000).toFixed(1) }} Lakhs</h3>
          <p class="text-xs text-white/70 mt-1">{{ ((totalPaidValue / (totalContractValue || 1)) * 100).toFixed(0) }}% Execution Rate</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">payments</span>
        </div>
      </div>
    </div>

    <!-- Under Review -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-amber-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Under Legal Review</p>
          <h3 class="text-3xl font-black mt-2">{{ underReviewCount }}</h3>
          <p class="text-xs text-white/70 mt-1">Pending Compliance Sign-off</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">verified_user</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Search & Filters -->
  <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-6 p-4 flex flex-col sm:flex-row items-center gap-4">
    <div class="relative flex-1 w-full">
      <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
      <input type="text" [(ngModel)]="searchQuery" (input)="filterContracts()"
        placeholder="Search contracts by ID, title, vendor name, or site project..."
        class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/30 transition-all outline-none">
    </div>

    <div class="flex items-center gap-3 w-full sm:w-auto">
      <select [(ngModel)]="statusFilter" (change)="filterContracts()"
        class="px-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none">
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Under Review">Under Review</option>
        <option value="Completed">Completed</option>
        <option value="Draft">Draft</option>
      </select>
    </div>
  </div>

  <!-- Contracts Table Card -->
  <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-600 dark:text-slate-300">
        <thead class="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th class="px-6 py-4">Contract ID & Title</th>
            <th class="px-6 py-4">Vendor & Category</th>
            <th class="px-6 py-4">Project Site</th>
            <th class="px-6 py-4">Value & Paid</th>
            <th class="px-6 py-4">Validity</th>
            <th class="px-6 py-4 text-center">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
          <tr *ngFor="let contract of filteredContracts" class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <span class="material-symbols-outlined text-[20px]">assignment</span>
                </div>
                <div>
                  <span class="text-xs font-black text-blue-600 dark:text-blue-400 tracking-wide font-mono">{{ contract.contractNumber }}</span>
                  <div class="font-bold text-slate-800 dark:text-white mt-0.5 line-clamp-1">{{ contract.title }}</div>
                </div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div class="font-bold text-slate-800 dark:text-slate-100">{{ contract.vendorName }}</div>
              <div class="text-[11px] text-slate-400">{{ contract.vendorCategory }}</div>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <span class="material-symbols-outlined text-slate-400 text-[16px]">domain</span>
                {{ contract.projectName }}
              </div>
            </td>

            <td class="px-6 py-4">
              <div class="font-black text-slate-900 dark:text-white">\u20B9{{ contract.contractValue.toLocaleString('en-IN') }}</div>
              <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Paid: \u20B9{{ contract.paidAmount.toLocaleString('en-IN') }}
              </div>
            </td>

            <td class="px-6 py-4 text-xs font-medium">
              <div>{{ contract.startDate | date:'mediumDate' }}</div>
              <div class="text-slate-400">to {{ contract.endDate | date:'mediumDate' }}</div>
            </td>

            <td class="px-6 py-4 text-center">
              <span class="px-3 py-1 rounded-full text-[11px] font-black border" [ngClass]="getStatusClass(contract.status)">
                {{ contract.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-right">
              <button (click)="viewContract(contract)"
                class="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">visibility</span>
                View
              </button>
            </td>
          </tr>

          <tr *ngIf="filteredContracts.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-slate-400">
              <span class="material-symbols-outlined text-4xl mb-2">find_in_page</span>
              <p class="font-medium text-sm">No procurement contracts found matching your filters.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Detail Modal -->
  <div *ngIf="showDetailModal && selectedContract" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
      <div class="flex items-start justify-between mb-6">
        <div>
          <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{{ selectedContract.contractNumber }}</span>
          <h2 class="text-xl font-black text-slate-800 dark:text-white mt-1">{{ selectedContract.title }}</h2>
          <p class="text-xs text-slate-500">{{ selectedContract.vendorName }} ({{ selectedContract.vendorCategory }})</p>
        </div>
        <button (click)="showDetailModal = false" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Contract Value</span>
          <p class="text-lg font-black text-slate-900 dark:text-white">\u20B9{{ selectedContract.contractValue.toLocaleString('en-IN') }}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Paid Milestone Total</span>
          <p class="text-lg font-black text-emerald-600">\u20B9{{ selectedContract.paidAmount.toLocaleString('en-IN') }}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project Site</span>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ selectedContract.projectName }}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Execution Period</span>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ selectedContract.startDate }} to {{ selectedContract.endDate }}</p>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Scope of Work & Agreement Terms</h4>
        <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900">
          {{ selectedContract.scope }}
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <button (click)="showDetailModal = false" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- Create Modal -->
  <div *ngIf="showCreateModal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-black text-slate-800 dark:text-white">Create Procurement Contract Agreement</h2>
        <button (click)="showCreateModal = false" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Contract Title *</label>
          <input type="text" [(ngModel)]="newContract.title" placeholder="e.g. Structural Steel & Rebar Supply Order"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Vendor / Supplier *</label>
          <input type="text" [(ngModel)]="newContract.vendorName" placeholder="Supplier Company Name"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Category</label>
          <select [(ngModel)]="newContract.vendorCategory"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Raw Materials & Metals">Raw Materials & Metals</option>
            <option value="Concrete & Masonry">Concrete & Masonry</option>
            <option value="Plant & Heavy Machinery">Plant & Heavy Machinery</option>
            <option value="Electrical & MEP">Electrical & MEP</option>
            <option value="Subcontracting">Subcontracting</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Contract Value (\u20B9 INR) *</label>
          <input type="number" [(ngModel)]="newContract.contractValue" placeholder="e.g. 5000000"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Project Site</label>
          <input type="text" [(ngModel)]="newContract.projectName" placeholder="Site Project Name"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Start Date</label>
          <input type="date" [(ngModel)]="newContract.startDate"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">End Date</label>
          <input type="date" [(ngModel)]="newContract.endDate"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Scope of Supply / Contract Terms</label>
          <textarea rows="3" [(ngModel)]="newContract.scope" placeholder="Detailed deliverables, delivery milestones, liquidated damages, quality warranties..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button (click)="showCreateModal = false" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          Cancel
        </button>
        <button (click)="saveNewContract()" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white shadow-lg shadow-blue-500/20 cursor-pointer">
          Save & Register Contract
        </button>
      </div>
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Contracts, { className: "Contracts", filePath: "app/modules/resources/contracts/contracts.ts", lineNumber: 24 });
})();

// src/app/modules/resources/equipment-inventory/equipment-inventory.ts
var _c02 = () => [];
var _forTrack02 = ($index, $item) => $item.sku;
var _forTrack1 = ($index, $item) => $item.id;
function EquipmentInventory_For_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 106);
    \u0275\u0275listener("click", function EquipmentInventory_For_67_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeTab(tab_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.selectedTab === tab_r2.category_name ? "bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-dim");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.category_name, " ");
  }
}
function EquipmentInventory_For_101_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length, " ", (item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) === 1 ? "Project" : "Projects", " ");
  }
}
function EquipmentInventory_For_101_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 34)(1, "td", 107)(2, "div", 108)(3, "div", 109);
    \u0275\u0275element(4, "div", 110);
    \u0275\u0275elementStart(5, "span", 111);
    \u0275\u0275text(6, " construction ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 2)(8, "p", 112);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 113)(11, "span", 114);
    \u0275\u0275text(12, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 115);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 116)(16, "span", 117);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 116)(19, "div", 118)(20, "div", 119)(21, "div", 120)(22, "span", 121);
    \u0275\u0275text(23, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "span", 122);
    \u0275\u0275text(27, "Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 123);
    \u0275\u0275element(29, "div", 124);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "td", 116)(31, "div", 125);
    \u0275\u0275listener("click", function EquipmentInventory_For_101_Template_div_click_31_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) > 0 && ctx_r2.openProjectStockPopup(item_r5));
    });
    \u0275\u0275elementStart(32, "div", 126)(33, "span", 39);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 127);
    \u0275\u0275conditionalCreate(36, EquipmentInventory_For_101_Conditional_36_Template, 2, 2, "span", 128);
    \u0275\u0275elementStart(37, "span", 129);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "span", 130);
    \u0275\u0275text(40, " arrow_forward_ios ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "td", 116)(42, "div", 131)(43, "span", 132);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 133);
    \u0275\u0275text(46, " Per Unit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "td", 116)(48, "div", 26)(49, "div", 134);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div")(52, "p", 135);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 136);
    \u0275\u0275text(55, " Verified Supplier ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "td", 137)(57, "div", 138)(58, "div", 113)(59, "button", 139);
    \u0275\u0275listener("click", function EquipmentInventory_For_101_Template_button_click_59_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAssignProjectModal(item_r5));
    });
    \u0275\u0275elementStart(60, "span", 39);
    \u0275\u0275text(61, " assignment_ind ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "button", 140);
    \u0275\u0275listener("click", function EquipmentInventory_For_101_Template_button_click_62_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openStockTransferModal(item_r5));
    });
    \u0275\u0275elementStart(63, "span", 39);
    \u0275\u0275text(64, " transfer_within_a_station ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "button", 141);
    \u0275\u0275listener("click", function EquipmentInventory_For_101_Template_button_click_65_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r5));
    });
    \u0275\u0275elementStart(66, "span", 39);
    \u0275\u0275text(67, " delete ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", item_r5.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", item_r5.sku, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r5.category, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(item_r5.stockRemaining);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r5.stockUsed >= item_r5.stockRemaining ? "bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", item_r5.stockIn > 100 ? 100 : item_r5.stockIn, "%");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", (item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) > 0 ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/10" : "cursor-not-allowed opacity-70 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", (item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) > 0 ? "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600" : "bg-slate-200 dark:bg-slate-700 text-slate-500");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) > 0 ? "apartment" : "inventory_2", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) || 0) > 0 ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ((item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) || 0) > 0 ? "text-indigo-600 dark:text-indigo-400" : "text-rose-500 dark:text-rose-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) || 0) > 0 ? "Assigned" : "Not Assigned", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" \u20B9", item_r5.cost, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (item_r5.vendor_name || "?").charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r5.vendor_name, " ");
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", !(item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length))("ngClass", (item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50");
  }
}
function EquipmentInventory_For_110_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 142);
    \u0275\u0275listener("click", function EquipmentInventory_For_110_Template_button_click_0_listener() {
      const $index_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage($index_r7 + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.page === $index_r7 + 1 ? "bg-primary text-white shadow-md" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r7 + 1, " ");
  }
}
function EquipmentInventory_Conditional_131_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_131_For_3_Template_div_click_0_listener() {
      const material_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectEquipmentAdd(material_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.equipment_master_id === material_r9.id ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", material_r9.name, " ");
  }
}
function EquipmentInventory_Conditional_131_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145);
    \u0275\u0275text(1, "No equipment found");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventory_Conditional_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_Conditional_131_For_3_Template, 2, 2, "div", 144, _forTrack1);
    \u0275\u0275conditionalCreate(4, EquipmentInventory_Conditional_131_Conditional_4_Template, 2, 0, "div", 145);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.MaterialMaster);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(ctx_r2.MaterialMaster == null ? null : ctx_r2.MaterialMaster.length) ? 4 : -1);
  }
}
function EquipmentInventory_Conditional_145_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_145_For_3_Template_div_click_0_listener() {
      const cat_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectCategoryAdd(cat_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.category === cat_r11 ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r11, " ");
  }
}
function EquipmentInventory_Conditional_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_Conditional_145_For_3_Template, 2, 2, "div", 144, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.categoryOptions);
  }
}
function EquipmentInventory_Conditional_155_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_155_For_3_Template_div_click_0_listener() {
      const p_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectProjectAdd(p_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.project_id === p_r13.id ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r13.name, " ");
  }
}
function EquipmentInventory_Conditional_155_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145);
    \u0275\u0275text(1, "No projects found");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventory_Conditional_155_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_Conditional_155_For_3_Template, 2, 2, "div", 144, _forTrack1);
    \u0275\u0275conditionalCreate(4, EquipmentInventory_Conditional_155_Conditional_4_Template, 2, 0, "div", 145);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.projects.length ? 4 : -1);
  }
}
function EquipmentInventory_Conditional_173_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_173_For_3_Template_div_click_0_listener() {
      const v_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectVendorAdd(v_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.newMaterial.vendor_id === v_r16.id ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r16.name, " ");
  }
}
function EquipmentInventory_Conditional_173_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_Conditional_173_For_3_Template, 2, 2, "div", 144, _forTrack1);
    \u0275\u0275elementStart(4, "div", 147);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_173_Template_div_click_4_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectAddNewVendor());
    });
    \u0275\u0275elementStart(5, "span", 121);
    \u0275\u0275text(6, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Add New Vendor ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.vendors);
  }
}
function EquipmentInventory_ng_container_180_Conditional_41_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_180_Conditional_41_For_3_Template_div_click_0_listener() {
      const p_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectProjectEdit(p_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.project_id === p_r19.id ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r19.name, " ");
  }
}
function EquipmentInventory_ng_container_180_Conditional_41_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145);
    \u0275\u0275text(1, "No projects found");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventory_ng_container_180_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_ng_container_180_Conditional_41_For_3_Template, 2, 2, "div", 144, _forTrack1);
    \u0275\u0275conditionalCreate(4, EquipmentInventory_ng_container_180_Conditional_41_Conditional_4_Template, 2, 0, "div", 145);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.projects.length ? 4 : -1);
  }
}
function EquipmentInventory_ng_container_180_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 42)(2, "h3", 43);
    \u0275\u0275text(3, "Edit material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 44);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_180_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275elementStart(5, "span", 45);
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 46)(8, "div", 47)(9, "label", 48);
    \u0275\u0275text(10, "Material Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 148);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 48);
    \u0275\u0275text(14, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 149);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "label", 48);
    \u0275\u0275text(18, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 150)(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 151);
    \u0275\u0275text(23, "expand_more");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div")(25, "label", 48);
    \u0275\u0275text(26, " Stock In");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 152);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "label", 48);
    \u0275\u0275text(30, " Cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 153);
    \u0275\u0275listener("blur", function EquipmentInventory_ng_container_180_Template_input_blur_31_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.formatCostEdit());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div")(33, "label", 48);
    \u0275\u0275text(34, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 49)(36, "button", 50);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_180_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("edit-project"));
    });
    \u0275\u0275elementStart(37, "span", 51);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 52);
    \u0275\u0275text(40, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(41, EquipmentInventory_ng_container_180_Conditional_41_Template, 5, 1, "div", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 58)(43, "button", 59);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_180_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(44, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 60);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_180_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateMaterial());
    });
    \u0275\u0275text(46, "Save Changes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("value", ctx_r2.materialToEdit.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.materialToEdit.sku);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.materialToEdit.category || "Select Category");
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r2.materialToEdit.stockIn);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.materialToEdit.cost);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "edit-project" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800 hover:border-primary/40");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.materialToEdit.project_name ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.materialToEdit.project_name || "Select Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "edit-project" ? "rotate-180 text-primary" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "edit-project" ? 41 : -1);
  }
}
function EquipmentInventory_For_204_Conditional_11_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275listener("click", function EquipmentInventory_For_204_Conditional_11_For_3_Template_div_click_0_listener() {
      const project_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const \u0275$index_598_r21 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectAssignProject(\u0275$index_598_r21, project_r23));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r23 = ctx.$implicit;
    const item_r24 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("ngClass", item_r24.project_id === project_r23.id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r23.name, " ");
  }
}
function EquipmentInventory_For_204_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145);
    \u0275\u0275text(1, "No projects found");
    \u0275\u0275elementEnd();
  }
}
function EquipmentInventory_For_204_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 158)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_For_204_Conditional_11_For_3_Template, 2, 2, "div", 144, _forTrack1);
    \u0275\u0275conditionalCreate(4, EquipmentInventory_For_204_Conditional_11_Conditional_4_Template, 2, 0, "div", 145);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.projects.length ? 4 : -1);
  }
}
function EquipmentInventory_For_204_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 154)(2, "div", 155)(3, "label", 156);
    \u0275\u0275text(4, " Select Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 49)(6, "button", 157);
    \u0275\u0275listener("click", function EquipmentInventory_For_204_Template_button_click_6_listener() {
      const \u0275$index_598_r21 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("assign-project-" + \u0275$index_598_r21));
    });
    \u0275\u0275elementStart(7, "span", 51);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 52);
    \u0275\u0275text(10, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, EquipmentInventory_For_204_Conditional_11_Template, 5, 1, "div", 158);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 159)(13, "label", 156);
    \u0275\u0275text(14, " Stock Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 160);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_For_204_Template_input_ngModelChange_15_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r20).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.stock, $event) || (item_r24.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function EquipmentInventory_For_204_Template_input_input_15_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.validateAssignedStock());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 161)(17, "button", 162);
    \u0275\u0275listener("click", function EquipmentInventory_For_204_Template_button_click_17_listener() {
      const \u0275$index_598_r21 = \u0275\u0275restoreView(_r20).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeProjectRow(\u0275$index_598_r21));
    });
    \u0275\u0275elementStart(18, "span", 39);
    \u0275\u0275text(19, " delete ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r24 = ctx.$implicit;
    const \u0275$index_598_r21 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "assign-project-" + \u0275$index_598_r21 ? "border-indigo-500 ring-4 ring-indigo-500/10" : "border-slate-200 dark:border-slate-700 hover:border-indigo-400/50");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r24.project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectNameById(item_r24.project_id) || "Choose Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "assign-project-" + \u0275$index_598_r21 ? "rotate-180 text-indigo-500" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "assign-project-" + \u0275$index_598_r21 ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r24.stock);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.assignedProjects.length === 1);
  }
}
function EquipmentInventory_Conditional_221_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "span", 76);
    \u0275\u0275text(2, " error ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 163);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.projectAssignError, " ");
  }
}
function EquipmentInventory_Conditional_224_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85)(1, "div", 164)(2, "span", 165);
    \u0275\u0275text(3, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h4", 132);
    \u0275\u0275text(5, " No Project Assigned ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 166);
    \u0275\u0275text(7, " This Equipment is not assigned to any project yet. ");
    \u0275\u0275elementEnd()();
  }
}
function EquipmentInventory_Conditional_225_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 167)(1, "div", 138)(2, "div", 108)(3, "div", 168)(4, "span", 45);
    \u0275\u0275text(5, " apartment ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h4", 128);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 169);
    \u0275\u0275text(10, " Assigned Project ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 80)(12, "h4", 79);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 170);
    \u0275\u0275text(15, " Unit(s) ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r25 = ctx.$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", p_r25.project_name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", p_r25.stockUsed, " ");
  }
}
function EquipmentInventory_Conditional_225_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275repeaterCreate(1, EquipmentInventory_Conditional_225_For_2_Template, 16, 2, "div", 167, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.selectedProjectStock.equipment_project_stock);
  }
}
function EquipmentInventory_Conditional_226_Conditional_14_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 184);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_226_Conditional_14_For_3_Template_div_click_0_listener() {
      const order_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectSortOrder(order_r28));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r28 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r2.selectedSortOrder === order_r28 ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r28, " ");
  }
}
function EquipmentInventory_Conditional_226_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 178)(1, "div", 182);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_Conditional_226_Conditional_14_For_3_Template, 2, 2, "div", 183, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.sortOrderOptions);
  }
}
function EquipmentInventory_Conditional_226_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 185);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_226_For_20_Template_button_click_0_listener() {
      const status_r30 = \u0275\u0275restoreView(_r29).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleSupplierStatus(status_r30));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r30 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r2.selectedSupplierStatus === status_r30 ? "bg-primary text-white" : "bg-surface-container text-outline hover:bg-surface-dim");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r30, " ");
  }
}
function EquipmentInventory_Conditional_226_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 171);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_226_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 172);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_226_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 173);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 99)(5, "div")(6, "label", 174);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 49)(9, "button", 175);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_226_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("sort-order"));
    });
    \u0275\u0275elementStart(10, "span", 176);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 177);
    \u0275\u0275text(13, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, EquipmentInventory_Conditional_226_Conditional_14_Template, 4, 0, "div", 178);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "label", 174);
    \u0275\u0275text(17, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 179);
    \u0275\u0275repeaterCreate(19, EquipmentInventory_Conditional_226_For_20_Template, 2, 2, "button", 180, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "button", 181);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_226_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275text(22, "Apply Filters");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "sort-order" ? "border-primary ring-2 ring-primary/10" : "border-transparent");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedSortOrder);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "sort-order" ? "rotate-180 text-primary" : "text-outline");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "sort-order" ? 14 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.supplierStatusOptions);
  }
}
function EquipmentInventory_For_245_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 195);
    \u0275\u0275listener("click", function EquipmentInventory_For_245_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r32);
      const \u0275$index_806_r33 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeTransferRow(\u0275$index_806_r33));
    });
    \u0275\u0275elementStart(1, "span", 39);
    \u0275\u0275text(2, " delete ");
    \u0275\u0275elementEnd()();
  }
}
function EquipmentInventory_For_245_Conditional_12_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 197);
    \u0275\u0275listener("click", function EquipmentInventory_For_245_Conditional_12_For_3_Template_div_click_0_listener() {
      const p_r35 = \u0275\u0275restoreView(_r34).$implicit;
      const \u0275$index_806_r33 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTransferFromProject(\u0275$index_806_r33, p_r35));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 198);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r35 = ctx.$implicit;
    const item_r36 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", item_r36.from_project_id === p_r35.id ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r35.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Stock : ", ctx_r2.getProjectStock(p_r35.id));
  }
}
function EquipmentInventory_For_245_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 158)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_For_245_Conditional_12_For_3_Template, 5, 3, "div", 196, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function EquipmentInventory_For_245_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 190)(1, "div", 199)(2, "div", 113)(3, "span", 200);
    \u0275\u0275text(4, " inventory ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 201);
    \u0275\u0275text(6, " Available Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 202);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r36 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectStock(item_r36.from_project_id), " ");
  }
}
function EquipmentInventory_For_245_Conditional_27_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 197);
    \u0275\u0275listener("click", function EquipmentInventory_For_245_Conditional_27_For_3_Template_div_click_0_listener() {
      const p_r38 = \u0275\u0275restoreView(_r37).$implicit;
      const \u0275$index_806_r33 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTransferToProject(\u0275$index_806_r33, p_r38));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 198);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r38 = ctx.$implicit;
    const item_r36 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", item_r36.to_project_id === p_r38.id ? "bg-primary/10 text-primary" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r38.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Stock : ", ctx_r2.getProjectStock(p_r38.id));
  }
}
function EquipmentInventory_For_245_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 158)(1, "div", 143);
    \u0275\u0275repeaterCreate(2, EquipmentInventory_For_245_Conditional_27_For_3_Template, 5, 3, "div", 196, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function EquipmentInventory_For_245_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 193)(1, "div", 199)(2, "div", 113)(3, "span", 203);
    \u0275\u0275text(4, " warehouse ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 204);
    \u0275\u0275text(6, " Current Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 205);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r36 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectStock(item_r36.to_project_id), " ");
  }
}
function EquipmentInventory_For_245_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275conditionalCreate(1, EquipmentInventory_For_245_Conditional_1_Template, 3, 0, "button", 186);
    \u0275\u0275elementStart(2, "div", 187)(3, "div")(4, "label", 188);
    \u0275\u0275text(5, " From Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 49)(7, "button", 189);
    \u0275\u0275listener("click", function EquipmentInventory_For_245_Template_button_click_7_listener() {
      const \u0275$index_806_r33 = \u0275\u0275restoreView(_r31).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("transfer-from-" + \u0275$index_806_r33));
    });
    \u0275\u0275elementStart(8, "span", 51);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 52);
    \u0275\u0275text(11, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, EquipmentInventory_For_245_Conditional_12_Template, 4, 0, "div", 158);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, EquipmentInventory_For_245_Conditional_13_Template, 9, 1, "div", 190);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 191)(15, "div", 192)(16, "span", 45);
    \u0275\u0275text(17, " east ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div")(19, "label", 188);
    \u0275\u0275text(20, " To Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 49)(22, "button", 189);
    \u0275\u0275listener("click", function EquipmentInventory_For_245_Template_button_click_22_listener() {
      const \u0275$index_806_r33 = \u0275\u0275restoreView(_r31).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown("transfer-to-" + \u0275$index_806_r33));
    });
    \u0275\u0275elementStart(23, "span", 51);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 52);
    \u0275\u0275text(26, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, EquipmentInventory_For_245_Conditional_27_Template, 4, 0, "div", 158);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, EquipmentInventory_For_245_Conditional_28_Template, 9, 1, "div", 193);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div")(30, "label", 188);
    \u0275\u0275text(31, " Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 194);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_For_245_Template_input_ngModelChange_32_listener($event) {
      const item_r36 = \u0275\u0275restoreView(_r31).$implicit;
      \u0275\u0275twoWayBindingSet(item_r36.quantity, $event) || (item_r36.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r36 = ctx.$implicit;
    const \u0275$index_806_r33 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.stockTransferData.transfers.length > 1 ? 1 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transfer-from-" + \u0275$index_806_r33 ? "border-primary ring-4 ring-primary/10" : "border-slate-200 dark:border-slate-700 hover:border-primary/40");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r36.from_project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectNameById(item_r36.from_project_id) || "Select Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transfer-from-" + \u0275$index_806_r33 ? "rotate-180 text-primary" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "transfer-from-" + \u0275$index_806_r33 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r36.from_project_id ? 13 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transfer-to-" + \u0275$index_806_r33 ? "border-primary ring-4 ring-primary/10" : "border-slate-200 dark:border-slate-700 hover:border-primary/40");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r36.to_project_id ? "text-slate-800 dark:text-white" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectNameById(item_r36.to_project_id) || "Select Project", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.openDropdown === "transfer-to-" + \u0275$index_806_r33 ? "rotate-180 text-primary" : "text-slate-400");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.openDropdown === "transfer-to-" + \u0275$index_806_r33 ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r36.to_project_id ? 28 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r36.quantity);
  }
}
var EquipmentInventory = class _EquipmentInventory {
  materialService = inject(EquipmentInventoryService);
  MaterialMasterService = inject(Equipment);
  router = inject(Router);
  vendorService = inject(VendorsServices);
  toast = inject(ToastrService);
  categoryService = inject(CategoryServeice);
  selectedTab = "All Equipment";
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showFilters = false;
  materialToEdit;
  materialToDelete;
  newMaterial = this.getDefaultMaterial();
  materials = [];
  vendors = [];
  page = 1;
  pageSize = 5;
  paginatedMaterials = [];
  Math;
  MaterialMaster;
  projects = [];
  newVendor = {
    name: "",
    email: "",
    phone: "",
    budget: "",
    services: "",
    spoc: {
      name: "",
      phone: ""
    },
    kyc: {
      gst: "",
      pan: ""
    },
    address: {
      street: "",
      pincode: ""
    }
  };
  errorMsg = "";
  contractFile = null;
  isSaving = false;
  showAddVendorModal = false;
  searchQuery;
  showAssignProjectModal = false;
  noOfProjectsAssigned = 0;
  noOfProjectsNotAssigned = 0;
  categories = [];
  openDropdown = null;
  categoryOptions = [
    "Concrete",
    "Steel",
    "Electrical",
    "Lumber",
    "Finishing",
    "Chemicals"
  ];
  sortOrderOptions = [
    "Usage Rate (Highest)",
    "Usage Rate (Lowest)",
    "Stock Level (Asc)",
    "Stock Level (Desc)",
    "Newest Additions"
  ];
  selectedSortOrder = this.sortOrderOptions[0];
  supplierStatusOptions = ["Active", "Preferred", "New"];
  selectedSupplierStatus = "Active";
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest(".custom-dropdown-wrapper")) {
      this.openDropdown = null;
    }
  }
  onEscapeKey() {
    this.openDropdown = null;
  }
  toggleDropdown(id, event) {
    if (event) {
      event.stopPropagation();
    }
    this.openDropdown = this.openDropdown === id ? null : id;
  }
  isDropdownOpen(id) {
    return this.openDropdown === id;
  }
  closeDropdown() {
    this.openDropdown = null;
  }
  /** True when opened from Plant & Machinery -> Machinery Transfers. */
  transferMode = inject(ActivatedRoute).snapshot.data["mode"] === "transfer";
  ngOnInit() {
    this.materialService.loadMaterials();
    this.materialService.materials$.subscribe((m) => {
      this.materials = m;
      this.noOfProjectsAssigned = m.filter((x) => x.equipment_project_stock && x.equipment_project_stock.length > 0).length;
      this.noOfProjectsNotAssigned = m.filter((x) => !x.equipment_project_stock || x.equipment_project_stock.length === 0).length;
      this.page = 1;
      this.updatePagination();
    });
    this.MaterialMasterService.loadMaterials();
    this.loadProjects();
    this.MaterialMasterService.materials$.subscribe((m) => {
      this.MaterialMaster = m;
    });
    this.getVendor();
    this.getCategories();
  }
  getCategories() {
    this.categoryService.loadCategories().subscribe({
      next: () => {
        this.categoryService.categories$.subscribe((res) => {
          this.categories = [
            {
              category_name: "All Equipment",
              isDefault: true
            },
            ...res.filter((c) => c.category_type === "Equipment")
          ];
          this.updatePagination();
        });
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to load skills");
      }
    });
  }
  get filteredMaterials() {
    let filtered = [...this.materials];
    if (this.selectedTab === "Low Stock") {
      filtered = filtered.filter((m) => m.stockIn < 20);
    } else if (this.selectedTab !== "All Equipment") {
      filtered = filtered.filter((m) => (m.category || "").trim().toLowerCase() === this.selectedTab.trim().toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter((material) => material.name?.toLowerCase().includes(q) || material.sku?.toLowerCase().includes(q) || material.category?.toLowerCase().includes(q));
    }
    return filtered;
  }
  getInventoryValue() {
    return this.materials.reduce((sum, item) => {
      return sum + +item.cost * +item.stockIn;
    }, 0);
  }
  getVendor() {
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
    });
  }
  loadProjects() {
    this.materialService.getProjects().subscribe({
      next: (res) => {
        this.projects = res?.data || [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  changeTab(tab) {
    this.selectedTab = tab.category_name || tab;
    this.page = 1;
    this.updatePagination();
  }
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMaterials = this.filteredMaterials.slice(start, end);
  }
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }
  get endItem() {
    return Math.min(this.page * this.pageSize, this.filteredMaterials.length);
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  goToPage(p) {
    this.page = p;
    this.updatePagination();
  }
  totalPages() {
    return Math.ceil(this.filteredMaterials.length / this.pageSize);
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  getDefaultMaterial() {
    return {
      name: "",
      sku: "",
      category: "Concrete",
      cost: "",
      project_id: 0,
      project_name: "",
      equipment_master_id: 0,
      stockIn: 0,
      vendor_name: "",
      vendor_id: "",
      status: "ASSIGNED"
    };
  }
  formatCost() {
    const value = Number(this.newMaterial.cost || 0);
    this.newMaterial.cost = value.toFixed(2);
  }
  formatCostEdit() {
    const value = Number(this.materialToEdit.cost || 0);
    this.materialToEdit.cost = value.toFixed(2);
  }
  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.closeDropdown();
    this.showAddModal = true;
  }
  onVendorSelect(event) {
    const value = event.target.value;
    if (value === "ADD_NEW") {
      this.showAddVendorModal = true;
      return;
    }
    const vendor = this.vendors.find((v) => v.id == value);
    this.newMaterial.vendor_name = vendor?.name || "";
    this.newMaterial.vendor_id = value || "";
  }
  getProject(projectId) {
    const selectedId = Number(projectId.target.value);
    const project = this.projects.find((p) => p.id === selectedId);
    this.newMaterial.project_name = project?.name || "";
    this.newMaterial.project_id = selectedId || 0;
  }
  selectEquipmentAdd(material) {
    this.closeDropdown();
    if (!material?.id)
      return;
    this.newMaterial.equipment_master_id = material.id;
    this.MaterialMasterService.getMaterialMasterById(material.id).subscribe({
      next: (res) => {
        const data = res?.data || res;
        this.newMaterial = __spreadProps(__spreadValues({}, this.newMaterial), {
          name: data?.name || "",
          sku: data?.sku || "",
          category: data?.category || "",
          equipment_master_id: data?.id || 0
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  selectCategoryAdd(cat) {
    this.newMaterial.category = cat;
    this.closeDropdown();
  }
  selectProjectAdd(project) {
    this.newMaterial.project_name = project?.name || "";
    this.newMaterial.project_id = project?.id || 0;
    this.closeDropdown();
  }
  selectVendorAdd(vendor) {
    this.newMaterial.vendor_name = vendor?.name || "";
    this.newMaterial.vendor_id = vendor?.id || "";
    this.closeDropdown();
  }
  selectAddNewVendor() {
    this.showAddVendorModal = true;
    this.newMaterial.vendor_id = "";
    this.closeDropdown();
  }
  addMaterial() {
    this.materialService.addMaterial(__spreadValues({}, this.newMaterial)).subscribe({
      next: (res) => {
        console.log("Material created", res);
        this.showAddModal = false;
        this.toast.success("Equipment added successfully");
        this.materialService.loadMaterials();
        this.newMaterial = this.getDefaultMaterial();
      },
      error: (err) => {
        console.error("Error creating material", err);
        this.toast.error(err?.error?.message || "Failed to add material");
      }
    });
  }
  openEditModal(event, material) {
    event.stopPropagation();
    this.materialToEdit = __spreadValues({}, material);
    this.closeDropdown();
    this.showEditModal = true;
  }
  selectProjectEdit(project) {
    if (!this.materialToEdit)
      return;
    this.materialToEdit.project_name = project?.name || "";
    this.materialToEdit.project_id = project?.id || 0;
    this.closeDropdown();
  }
  updateMaterial() {
    if (this.materialToEdit) {
      this.materialToEdit.stockPercent = Math.round(this.materialToEdit.stockCurrent / this.materialToEdit.stockTotal * 100);
      this.materialToEdit.status = this.calculateStatus(this.materialToEdit.stockPercent);
      this.materialService.updateMaterial(this.materialToEdit.id, this.materialToEdit).subscribe({
        next: () => {
          this.showEditModal = false;
          this.materialToEdit = null;
          this.toast.success("Material updated successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Update failed", err);
          this.toast.error(err?.error?.message || "Failed to update material");
        }
      });
    }
  }
  openDeleteModal(event, material) {
    event.stopPropagation();
    this.materialToDelete = material;
    this.showDeleteModal = true;
  }
  confirmDelete() {
    if (this.materialToDelete) {
      this.materialService.deleteMaterial(this.materialToDelete.id).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.materialToDelete = null;
          this.toast.success("Equipment deleted successfully");
          this.materialService.loadMaterials();
        },
        error: (err) => {
          console.error("Delete failed", err);
          this.toast.error(err?.error?.message || "Failed to delete equipment");
        }
      });
    }
  }
  calculateStatus(percent) {
    return "ASSIGNED";
  }
  exportReport() {
    console.log("Exporting materials report...");
    alert("Materials report exported successfully (Simulated)");
  }
  getSelectedMat(event) {
    const id = Number(event.target.value);
    if (!id)
      return;
    this.MaterialMasterService.getMaterialMasterById(id).subscribe({
      next: (res) => {
        const data = res?.data || res;
        this.newMaterial = __spreadProps(__spreadValues({}, this.newMaterial), {
          name: data?.name || "",
          sku: data?.sku || "",
          category: data?.category || "",
          equipment_master_id: data?.id || 0
        });
        console.log("Selected Material =>", this.newMaterial);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  addVendor() {
    if (this.isSaving)
      return;
    this.errorMsg = "";
    const fd = new FormData();
    fd.append("vendorLegalName", this.newVendor.name);
    fd.append("spocName", this.newVendor.spoc.name);
    fd.append("spocPhone", this.newVendor.spoc.phone);
    fd.append("officialEmail", this.newVendor.email);
    fd.append("officialPhone", this.newVendor.phone);
    fd.append("gstNo", this.newVendor.kyc.gst);
    fd.append("panCardNo", this.newVendor.kyc.pan);
    fd.append("physicalAddress", this.newVendor.address.street);
    fd.append("pincode", this.newVendor.address.pincode);
    fd.append("budgetAllocation", this.newVendor.budget);
    fd.append("services", this.newVendor.services);
    if (this.contractFile) {
      fd.append("contractFile", this.contractFile);
    }
    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddVendorModal = false;
        this.getVendor();
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMsg = err?.error?.message ?? "Vendor onboard failed. Please try again.";
      }
    });
  }
  onContractFileSelected(event) {
    this.contractFile = event.target.files[0];
  }
  onlyNumbers(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  onlyAlphanumeric(event) {
    const regex = /^[a-zA-Z0-9]$/;
    const key = event.key;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }
  stripNonNumericOnPaste(event, field, len) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData("text").replace(/\D/g, "").slice(0, len) || "";
    if (field === "phone") {
      this.newVendor.phone = pastedData;
    }
    if (field === "spocPhone") {
      this.newVendor.spoc.phone = pastedData;
    }
    if (field === "pincode") {
      this.newVendor.address.pincode = pastedData;
    }
  }
  stripNonAlphanumericOnPaste(event, field, len) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData("text").replace(/[^a-zA-Z0-9]/g, "").slice(0, len).toUpperCase() || "";
    if (field === "gst") {
      this.newVendor.kyc.gst = pastedData;
    }
    if (field === "pan") {
      this.newVendor.kyc.pan = pastedData;
    }
  }
  getvendor(event) {
    const value = event.target.value;
    if (value == "ADD_NEW") {
      this.showAddVendorModal = true;
      this.newMaterial.vendor_id = "";
      return;
    }
    const vendor = this.vendors.find((v) => v.id == value);
    this.newMaterial.vendor_name = vendor?.name || "";
    this.newMaterial.vendor_id = value || "";
  }
  assignedProjects = [
    {
      project_id: null,
      stock: null
    }
  ];
  projectAssignError = "";
  openAssignProjectModal(material) {
    this.materialToEdit = material;
    this.assignedProjects = [
      {
        project_id: null,
        stock: null
      }
    ];
    this.projectAssignError = "";
    this.closeDropdown();
    this.showAssignProjectModal = true;
  }
  addProjectRow() {
    this.assignedProjects.push({
      project_id: null,
      stock: null
    });
  }
  removeProjectRow(index) {
    if (this.assignedProjects.length === 1) {
      return;
    }
    this.assignedProjects.splice(index, 1);
    this.validateAssignedStock();
  }
  selectAssignProject(index, project) {
    if (!this.assignedProjects[index])
      return;
    this.assignedProjects[index].project_id = project?.id ?? null;
    this.validateAssignedStock();
    this.closeDropdown();
  }
  getProjectNameById(id) {
    if (!id)
      return "";
    const project = this.projects.find((p) => p.id == id);
    return project?.name || "";
  }
  validateAssignedStock() {
    this.projectAssignError = "";
    let totalAssignedStock = 0;
    const selectedProjects = [];
    for (const item of this.assignedProjects) {
      if (!item.project_id || item.stock === null || item.stock === "") {
        this.projectAssignError = "Please select project and enter stock for all rows";
        return false;
      }
      if (+item.stock <= 0) {
        this.projectAssignError = "Stock quantity must be greater than 0";
        return false;
      }
      if (selectedProjects.includes(item.project_id)) {
        this.projectAssignError = "Same project cannot be selected multiple times";
        return false;
      }
      selectedProjects.push(item.project_id);
      totalAssignedStock += Number(item.stock);
    }
    if (totalAssignedStock > this.materialToEdit.stockIn) {
      this.projectAssignError = `Assigned stock (${totalAssignedStock}) cannot exceed available stock (${this.materialToEdit.stockIn})`;
      return false;
    }
    return true;
  }
  getTotalAssignedStock() {
    return this.assignedProjects.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  }
  getRemainingStock() {
    return Number(this.materialToEdit?.stockRemaining || 0) - this.getTotalAssignedStock();
  }
  assignProjects() {
    const isValid = this.validateAssignedStock();
    if (!isValid) {
      return;
    }
    const projectsWithName = this.assignedProjects.map((item) => {
      const project = this.projects.find((p) => p.id == item.project_id);
      return __spreadProps(__spreadValues({}, item), {
        project_name: project?.name || "",
        status: "ASSIGNED"
      });
    });
    const payload = {
      equipment_id: this.materialToEdit.id,
      projects: projectsWithName
    };
    console.log(payload);
    this.materialService.updateMaterial(this.materialToEdit.id, payload).subscribe({
      next: () => {
        this.showEditModal = false;
        this.materialToEdit = null;
        this.toast.success("Equipment updated successfully");
        this.materialService.loadMaterials();
        this.showAssignProjectModal = false;
      },
      error: (err) => {
        console.error("Update failed", err);
        this.toast.error(err?.error?.message || "Failed to update material");
      }
    });
  }
  selectedProjectStock = null;
  showProjectStockPopup = false;
  openProjectStockPopup(item) {
    this.selectedProjectStock = item;
    this.showProjectStockPopup = true;
  }
  showStockTransferModal = false;
  stockTransferData = {
    material_id: "",
    stockIn: 0,
    transfer_note: "",
    transfers: []
  };
  selectedMaterial = null;
  getProjectStock(projectId) {
    if (!projectId || !this.selectedMaterial?.equipment_project_stock) {
      console.log("Stock for project", projectId, "=>");
      return 0;
    }
    const stock = this.selectedMaterial.equipment_project_stock.find((x) => x.project_id == projectId);
    console.log("Stock for project", projectId, "=>", stock);
    return stock?.stockUsed || 0;
  }
  openStockTransferModal(material) {
    this.selectedMaterial = material;
    this.stockTransferData = {
      material_id: material.id,
      stockIn: material.stockIn,
      transfer_note: "",
      transfers: [
        {
          from_project_id: material.project_id || "",
          to_project_id: "",
          quantity: 0
        }
      ]
    };
    this.closeDropdown();
    this.showStockTransferModal = true;
  }
  addTransferRow() {
    this.stockTransferData.transfers.push({
      from_project_id: "",
      to_project_id: "",
      quantity: 0
    });
  }
  removeTransferRow(index) {
    this.stockTransferData.transfers.splice(index, 1);
  }
  selectTransferFromProject(index, project) {
    if (!this.stockTransferData.transfers[index])
      return;
    this.stockTransferData.transfers[index].from_project_id = project?.id ?? "";
    this.closeDropdown();
  }
  selectTransferToProject(index, project) {
    if (!this.stockTransferData.transfers[index])
      return;
    this.stockTransferData.transfers[index].to_project_id = project?.id ?? "";
    this.closeDropdown();
  }
  getTotalTransferQty() {
    return this.stockTransferData.transfers.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }
  transferStock() {
    if (!this.stockTransferData.transfers.length) {
      this.toast.error("Add at least one transfer");
      return;
    }
    for (const item of this.stockTransferData.transfers) {
      if (!item.from_project_id) {
        this.toast.error("Select From Project");
        return;
      }
      if (!item.to_project_id) {
        this.toast.error("Select To Project");
        return;
      }
      if (item.from_project_id === item.to_project_id) {
        this.toast.error("From & To project cannot be same");
        return;
      }
      if (!item.quantity || item.quantity <= 0) {
        this.toast.error("Enter valid quantity");
        return;
      }
    }
    const takenBySource = /* @__PURE__ */ new Map();
    for (const t of this.stockTransferData.transfers) {
      const key = String(t.from_project_id);
      takenBySource.set(key, (takenBySource.get(key) || 0) + Number(t.quantity));
    }
    for (const [projectId, qty] of takenBySource) {
      if (qty > Number(this.getProjectStock(projectId))) {
        this.toast.error("Transfer quantity exceeds the stock held by the source project");
        return;
      }
    }
    const payload = {
      note: this.stockTransferData.transfer_note,
      transfers: this.stockTransferData.transfers.map((t) => ({
        from_project_id: t.from_project_id,
        to_project_id: t.to_project_id,
        quantity: t.quantity
      }))
    };
    this.materialService.equipment_stock_transfer(this.stockTransferData.material_id, payload).subscribe({
      next: () => {
        this.toast.success("Equipment reassigned successfully");
        this.materialService.loadMaterials();
        this.showStockTransferModal = false;
      },
      error: (err) => {
        console.error("Update failed", err);
        this.toast.error(err?.error?.message || "Failed to update material");
      }
    });
  }
  selectSortOrder(order) {
    this.selectedSortOrder = order;
    this.closeDropdown();
  }
  toggleSupplierStatus(status) {
    this.selectedSupplierStatus = status;
  }
  static \u0275fac = function EquipmentInventory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EquipmentInventory)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EquipmentInventory, selectors: [["app-equipment-inventory"]], hostBindings: function EquipmentInventory_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function EquipmentInventory_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument)("keydown.escape", function EquipmentInventory_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, standalone: false, decls: 256, vars: 77, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-on-surface-variant/80", "font-medium"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-4", "gap-5", "mb-8"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-blue-400", "via-indigo-400", "to-violet-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "absolute", "top-0", "right-0", "w-28", "h-28", "bg-white/10", "rounded-full", "-mr-10", "-mt-10"], [1, "absolute", "bottom-0", "left-0", "w-20", "h-20", "bg-black/5", "rounded-full", "-ml-6", "-mb-6"], [1, "flex", "items-center", "justify-between", "relative", "z-10"], [1, "text-[10px]", "uppercase", "tracking-[0.25em]", "text-white/80", "font-semibold"], [1, "text-3xl", "font-black", "tracking-tight", "mt-2"], [1, "text-xs", "text-white/70", "mt-1"], [1, "w-14", "h-14", "rounded-2xl", "bg-white/20", "backdrop-blur-md", "border", "border-white/20", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[30px]"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-emerald-400", "via-green-400", "to-teal-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-amber-400", "via-orange-400", "to-orange-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "text-2xl", "font-black", "tracking-tight", "mt-2"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-slate-600", "via-slate-700", "to-slate-800", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "flex", "items-center", "gap-2", "overflow-x-auto", "custom-scrollbar", "smooth-scroll", "pb-1"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", "shrink-0", 3, "class"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200/60", "dark:border-slate-800", "shadow-sm", "overflow-hidden"], [1, "overflow-hidden", "rounded-[28px]", "border", "border-slate-200/70", "dark:border-slate-800", "bg-white/70", "dark:bg-slate-900/70", "backdrop-blur-xl", "shadow-[0_10px_40px_rgba(0,0,0,0.06)]"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "justify-between", "gap-4", "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "bg-gradient-to-r", "from-slate-50", "to-white", "dark:from-slate-900", "dark:to-slate-950"], [1, "text-xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-sm", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-2", "px-4", "h-11", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search equipment...", 1, "bg-transparent", "outline-none", "text-sm", "font-medium", "w-full", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "custom-scrollbar", "smooth-scroll", "px-4", "py-4"], [1, "w-full", "min-w-[1100px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.18em]", "text-slate-400"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[9999]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4", "px-6", "py-5", "bg-slate-50", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2", "overflow-x-auto", "custom-scrollbar", "smooth-scroll", "max-w-full"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-primary", "hover:text-white", "transition-all", "cursor-pointer", "shrink-0", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", "shrink-0", 3, "ngClass"], ["panelClass", "p-8 max-w-lg", 3, "closed", "open", "contentClass"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-2xl", "font-black", "tracking-tight"], [1, "p-2", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], [1, "custom-dropdown-wrapper", "relative"], ["type", "button", 1, "w-full", "px-4", "py-3", "rounded-xl", "border-2", "flex", "items-center", "justify-between", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", "transition-all", "duration-200", "cursor-pointer", 3, "click", "ngClass"], [1, "truncate", "text-left", 3, "ngClass"], [1, "material-symbols-outlined", "text-[20px]", "shrink-0", "ml-2", "transition-transform", "duration-200", 3, "ngClass"], [1, "dropdown-panel", "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "border", "border-outline-variant/20", "dark:border-slate-800", "rounded-2xl", "shadow-xl", "overflow-hidden"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "truncate", "text-left", "text-slate-800", "dark:text-white"], ["type", "number", "min", "1", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["min", "1", "type", "number", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "blur", "ngModel"], [1, "flex", "gap-3", "mt-8"], [1, "flex-1", "py-3", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "cursor-pointer", "hover:bg-slate-50", "transition-colors", 3, "click"], [1, "flex-1", "py-3", "rounded-xl", "bg-primary", "text-white", "text-sm", "font-bold", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", 3, "click"], [4, "ngIf"], ["variant", "danger", "title", "Delete Equipment?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], ["title", "Assign Equipment", "subtitle", "Allocate stock project wise", "cancelLabel", "Cancel", "primaryLabel", "Assign Stock", "panelClass", "max-w-3xl", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "primaryDisabled", "contentClass"], [1, "p-7"], [1, "mb-6", "p-4", "rounded-2xl", "bg-slate-50", "dark:bg-slate-800/40", "border", "border-slate-200", "dark:border-slate-700"], [1, "text-[10px]", "uppercase", "tracking-[0.2em]", "font-black", "text-slate-400", "mb-1"], [1, "text-sm", "md:text-base", "font-black", "text-slate-900", "dark:text-white"], [1, "md:text-right"], [1, "text-lg", "font-black", "text-emerald-600"], [1, "space-y-3"], [1, "p-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/60", "dark:bg-slate-800/30", "transition-all"], ["type", "button", 1, "mt-5", "w-full", "border-2", "border-dashed", "border-indigo-300", "dark:border-indigo-700", "rounded-2xl", "py-3.5", "text-indigo-600", "dark:text-indigo-400", "font-black", "text-sm", "hover:bg-indigo-50", "dark:hover:bg-indigo-900/10", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "mt-6", "p-5", "rounded-2xl", "border", "border-indigo-200", "dark:border-indigo-800", "bg-indigo-50", "dark:bg-indigo-900/10"], [1, "grid", "grid-cols-2", "gap-4"], [1, "text-2xl", "font-black", "text-indigo-600"], [1, "text-right"], [1, "text-2xl", "font-black", 3, "ngClass"], [1, "mt-5", "flex", "items-start", "gap-3", "px-4", "py-3", "rounded-2xl", "bg-rose-50", "dark:bg-rose-900/10", "border", "border-rose-200", "dark:border-rose-800", "text-rose-700", "dark:text-rose-400"], ["title", "Project Assignment", "panelClass", "p-6 max-w-2xl", 3, "closed", "open", "subtitle", "showCloseButton", "showFooter", "contentClass"], [1, "p-6"], [1, "flex", "flex-col", "items-center", "justify-center", "py-14", "text-center"], [1, "space-y-4", "max-h-[420px]", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "pr-1"], [1, "fixed", "inset-0", "z-[90]"], ["title", "Reassign Equipment", "subtitle", "Move Equipment stock between projects", "icon", "swap_horiz", "cancelLabel", "Cancel", "primaryLabel", "Reassign Equipment", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], [1, "p-6", "space-y-8"], [1, "flex", "items-center", "gap-4", "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-slate-50", "dark:bg-slate-800/30"], [1, "w-14", "h-14", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[26px]"], [1, "flex-1", "min-w-0"], [1, "text-lg", "font-black", "truncate"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mt-2"], [1, "px-3", "py-1", "rounded-xl", "bg-slate-200", "dark:bg-slate-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-emerald-100", "text-emerald-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-amber-100", "text-amber-700", "text-[11px]", "font-black"], [1, "space-y-4"], [1, "relative", "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "shadow-sm"], [1, "w-full", "py-4", "rounded-2xl", "border-2", "border-dashed", "border-primary/30", "text-primary", "font-black", "hover:bg-primary/5", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-3", "block"], ["rows", "4", "placeholder", "Write transfer note...", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "text-sm", "font-semibold", "outline-none", "focus:ring-4", "focus:ring-primary/20", "resize-none", 3, "ngModelChange", "ngModel"], [3, "close", "save", "contractSelect", "onlyNumberEvent", "onlyAlphaNumericEvent", "pasteNumericEvent", "pasteAlphaNumericEvent", "showAddModal", "newVendor", "errorMsg", "contractFile", "isSaving"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", "shrink-0", 3, "click"], [1, "px-6", "py-5", "rounded-l-[26px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "shadow-inner"], [1, "absolute", "inset-0", "rounded-2xl", "bg-primary/10", "scale-110", "blur-xl", "opacity-0", "group-hover:opacity-100", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "flex", "items-center", "gap-2"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "px-4", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "w-[210px]", "flex", "flex-col", "gap-3"], [1, "flex", "items-center", "gap-3", "text-sm", "font-black"], [1, "flex", "items-center", "gap-1", "text-slate-800", "dark:text-slate-100"], [1, "material-symbols-outlined", "text-[16px]"], [1, "ml-2", "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "inline-flex", "items-center", "gap-3", "px-3.5", "py-2", "rounded-xl", "border", "transition-all", "duration-300", 3, "click", "ngClass"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "flex", "flex-col", "leading-tight", "min-w-[90px]"], [1, "text-sm", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wide", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", "text-slate-400"], [1, "flex", "flex-col"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-12", "h-12", "rounded-full", "bg-gradient-to-br", "from-amber-400", "via-orange-500", "to-red-500", "flex", "items-center", "justify-center", "text-sm", "font-black", "text-white", "shadow-lg"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-[11px]", "text-slate-400", "font-medium"], [1, "px-6", "py-5", "rounded-r-[26px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-4"], ["title", "Assign to Project", 1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["title", "Reassign Equipment", 1, "w-11", "h-11", "rounded-2xl", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click", "disabled", "ngClass"], ["title", "Delete Equipment", 1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", "shrink-0", 3, "click", "ngClass"], [1, "max-h-56", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "py-1.5"], [1, "px-4", "py-2.5", "text-sm", "font-bold", "cursor-pointer", "transition-colors", "duration-150", 3, "ngClass"], [1, "px-4", "py-3", "text-sm", "font-semibold", "text-slate-400"], [1, "px-4", "py-2.5", "text-sm", "font-bold", "cursor-pointer", "transition-colors", "duration-150", 3, "click", "ngClass"], [1, "px-4", "py-2.5", "text-sm", "font-black", "text-primary", "cursor-pointer", "transition-colors", "duration-150", "hover:bg-primary/5", "border-t", "border-outline-variant/10", "flex", "items-center", "gap-1.5", 3, "click"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "value"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "value"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "text-slate-500", "dark:text-slate-400", "cursor-not-allowed", "flex", "items-center", "justify-between"], [1, "material-symbols-outlined", "text-[20px]", "text-slate-300"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "value"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "blur", "value"], [1, "grid", "grid-cols-12", "gap-3", "items-end"], [1, "col-span-12", "md:col-span-7"], [1, "text-[9px]", "uppercase", "tracking-[0.18em]", "font-black", "text-slate-400", "mb-1.5", "block"], ["type", "button", 1, "w-full", "px-4", "py-3", "rounded-xl", "border-2", "flex", "items-center", "justify-between", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "transition-all", "duration-200", "cursor-pointer", 3, "click", "ngClass"], [1, "dropdown-panel", "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "shadow-xl", "overflow-hidden"], [1, "col-span-9", "md:col-span-4"], ["type", "number", "min", "1", "placeholder", "Enter qty", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-indigo-500/20", "focus:border-indigo-500", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "col-span-3", "md:col-span-1", "flex", "justify-end"], ["type", "button", 1, "w-11", "h-11", "rounded-xl", "bg-rose-100", "text-rose-600", "hover:bg-rose-200", "transition-all", "flex", "items-center", "justify-center", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "text-sm", "font-semibold", "leading-relaxed"], [1, "w-20", "h-20", "rounded-3xl", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5"], [1, "material-symbols-outlined", "text-[40px]", "text-slate-400"], [1, "text-sm", "text-slate-500", "mt-2"], [1, "p-5", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/70", "dark:bg-slate-800/40"], [1, "w-14", "h-14", "rounded-2xl", "bg-indigo-100", "dark:bg-indigo-500/10", "text-indigo-600", "flex", "items-center", "justify-center"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "text-[11px]", "uppercase", "tracking-wide", "text-slate-400", "font-bold"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], ["type", "button", 1, "w-full", "p-2", "rounded-lg", "border", "flex", "items-center", "justify-between", "bg-surface-container", "text-xs", "font-bold", "outline-none", "transition-all", "duration-200", "cursor-pointer", 3, "click", "ngClass"], [1, "truncate", "text-left"], [1, "material-symbols-outlined", "text-[16px]", "shrink-0", "ml-1", "transition-transform", "duration-200", 3, "ngClass"], [1, "dropdown-panel", "absolute", "z-50", "mt-2", "w-full", "bg-white", "dark:bg-slate-900", "border", "border-outline-variant/20", "dark:border-slate-800", "rounded-xl", "shadow-xl", "overflow-hidden"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "rounded", "text-[10px]", "font-bold", "transition-colors", "cursor-pointer", 3, "ngClass"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"], [1, "max-h-48", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "py-1"], [1, "px-3", "py-2", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "duration-150", 3, "ngClass"], [1, "px-3", "py-2", "text-xs", "font-bold", "cursor-pointer", "transition-colors", "duration-150", 3, "click", "ngClass"], [1, "px-2", "py-1", "rounded", "text-[10px]", "font-bold", "transition-colors", "cursor-pointer", 3, "click", "ngClass"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center"], [1, "grid", "grid-cols-1", "md:grid-cols-[1fr_auto_1fr_130px]", "gap-4", "items-start"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-2", "block"], ["type", "button", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border-2", "flex", "items-center", "justify-between", "bg-white", "dark:bg-slate-900", "text-sm", "font-bold", "outline-none", "transition-all", "duration-200", "cursor-pointer", 3, "click", "ngClass"], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-emerald-50", "dark:bg-emerald-500/10", "border", "border-emerald-200", "dark:border-emerald-500/20"], [1, "hidden", "md:flex", "justify-center", "pt-6"], [1, "w-12", "h-12", "rounded-2xl", "bg-primary", "text-white", "flex", "items-center", "justify-center", "shadow-lg"], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-blue-50", "dark:bg-blue-500/10", "border", "border-blue-200", "dark:border-blue-500/20"], ["type", "number", "min", "1", "placeholder", "0", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-black", "outline-none", "focus:ring-4", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center", 3, "click"], [1, "px-4", "py-2.5", "text-sm", "font-bold", "cursor-pointer", "transition-colors", "duration-150", "flex", "items-center", "justify-between", 3, "ngClass"], [1, "px-4", "py-2.5", "text-sm", "font-bold", "cursor-pointer", "transition-colors", "duration-150", "flex", "items-center", "justify-between", 3, "click", "ngClass"], [1, "text-[10px]", "font-semibold", "text-slate-400"], [1, "flex", "items-center", "justify-between"], [1, "material-symbols-outlined", "text-[18px]", "text-emerald-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-emerald-700", "dark:text-emerald-300"], [1, "text-lg", "font-black", "text-emerald-700", "dark:text-emerald-300"], [1, "material-symbols-outlined", "text-[18px]", "text-blue-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-blue-700", "dark:text-blue-300"], [1, "text-lg", "font-black", "text-blue-700", "dark:text-blue-300"]], template: function EquipmentInventory_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
      \u0275\u0275element(9, "div", 7)(10, "div", 8);
      \u0275\u0275elementStart(11, "div", 9)(12, "div")(13, "p", 10);
      \u0275\u0275text(14, " Total SKU ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "h3", 11);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p", 12);
      \u0275\u0275text(18, " Active Equipment ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 13)(20, "span", 14);
      \u0275\u0275text(21, " inventory_2 ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(22, "div", 15);
      \u0275\u0275element(23, "div", 7)(24, "div", 8);
      \u0275\u0275elementStart(25, "div", 9)(26, "div")(27, "p", 10);
      \u0275\u0275text(28, " Assigned Items ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "h3", 11);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p", 12);
      \u0275\u0275text(32, " Project Allocated ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 13)(34, "span", 14);
      \u0275\u0275text(35, " assignment_turned_in ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(36, "div", 16);
      \u0275\u0275element(37, "div", 7)(38, "div", 8);
      \u0275\u0275elementStart(39, "div", 9)(40, "div")(41, "p", 10);
      \u0275\u0275text(42, " Inventory Value ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "h3", 17);
      \u0275\u0275text(44);
      \u0275\u0275pipe(45, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p", 12);
      \u0275\u0275text(47, " Total Stock Worth ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div", 13)(49, "span", 14);
      \u0275\u0275text(50, " account_balance_wallet ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(51, "div", 18);
      \u0275\u0275element(52, "div", 7)(53, "div", 8);
      \u0275\u0275elementStart(54, "div", 9)(55, "div")(56, "p", 10);
      \u0275\u0275text(57, " Not Assigned ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "h3", 11);
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "p", 12);
      \u0275\u0275text(61, " Pending Allocation ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div", 13)(63, "span", 14);
      \u0275\u0275text(64, " pending_actions ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(65, "div", 19);
      \u0275\u0275repeaterCreate(66, EquipmentInventory_For_67_Template, 2, 3, "button", 20, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div", 21)(69, "div", 22)(70, "div", 23)(71, "div")(72, "h3", 24);
      \u0275\u0275text(73, " Equipment Inventory ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "p", 25);
      \u0275\u0275text(75, " Live equipment availability & supplier tracking ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "div", 26)(77, "div", 27)(78, "span", 28);
      \u0275\u0275text(79, " search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "input", 29);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_80_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_80_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(81, "div", 30)(82, "table", 31)(83, "thead")(84, "tr")(85, "th", 32);
      \u0275\u0275text(86, " Equipment ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "th", 32);
      \u0275\u0275text(88, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "th", 32);
      \u0275\u0275text(90, " Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "th", 33);
      \u0275\u0275text(92, " Assigned Projects ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "th", 32);
      \u0275\u0275text(94, " Cost ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "th", 32);
      \u0275\u0275text(96, " Vendor ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "th", 32);
      \u0275\u0275text(98, " Action ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(99, "tbody");
      \u0275\u0275repeaterCreate(100, EquipmentInventory_For_101_Template, 68, 18, "tr", 34, _forTrack02);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(102, "div", 35)(103, "p", 36);
      \u0275\u0275text(104);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "div", 37)(106, "button", 38);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_106_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(107, "span", 39);
      \u0275\u0275text(108, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(109, EquipmentInventory_For_110_Template, 2, 2, "button", 40, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(111, "button", 38);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_111_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(112, "span", 39);
      \u0275\u0275text(113, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(114, "app-common-dialog", 41);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_114_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275elementStart(115, "div", 42)(116, "h3", 43);
      \u0275\u0275text(117, "New Equipment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "button", 44);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_118_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275elementStart(119, "span", 45);
      \u0275\u0275text(120, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(121, "div", 46)(122, "div", 47)(123, "label", 48);
      \u0275\u0275text(124, "Equipment Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "div", 49)(126, "button", 50);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_126_listener() {
        return ctx.toggleDropdown("add-equipment");
      });
      \u0275\u0275elementStart(127, "span", 51);
      \u0275\u0275text(128);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "span", 52);
      \u0275\u0275text(130, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(131, EquipmentInventory_Conditional_131_Template, 5, 1, "div", 53);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(132, "div")(133, "label", 48);
      \u0275\u0275text(134, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(135, "input", 54);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_135_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(136, "div")(137, "label", 48);
      \u0275\u0275text(138, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(139, "div", 49)(140, "button", 50);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_140_listener() {
        return ctx.toggleDropdown("add-category");
      });
      \u0275\u0275elementStart(141, "span", 55);
      \u0275\u0275text(142);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(143, "span", 52);
      \u0275\u0275text(144, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(145, EquipmentInventory_Conditional_145_Template, 4, 0, "div", 53);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(146, "div")(147, "label", 48);
      \u0275\u0275text(148, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(149, "div", 49)(150, "button", 50);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_150_listener() {
        return ctx.toggleDropdown("add-project");
      });
      \u0275\u0275elementStart(151, "span", 51);
      \u0275\u0275text(152);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(153, "span", 52);
      \u0275\u0275text(154, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(155, EquipmentInventory_Conditional_155_Template, 5, 1, "div", 53);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(156, "div")(157, "label", 48);
      \u0275\u0275text(158, " Stock In");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(159, "input", 56);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_159_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.stockIn, $event) || (ctx.newMaterial.stockIn = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(160, "div")(161, "label", 48);
      \u0275\u0275text(162, " Cost");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(163, "input", 57);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_163_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275listener("blur", function EquipmentInventory_Template_input_blur_163_listener() {
        return ctx.formatCost();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(164, "div")(165, "label", 48);
      \u0275\u0275text(166, "Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(167, "div", 49)(168, "button", 50);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_168_listener() {
        return ctx.toggleDropdown("add-vendor");
      });
      \u0275\u0275elementStart(169, "span", 51);
      \u0275\u0275text(170);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(171, "span", 52);
      \u0275\u0275text(172, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(173, EquipmentInventory_Conditional_173_Template, 8, 0, "div", 53);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(174, "div", 58)(175, "button", 59);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_175_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275text(176, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(177, "button", 60);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_177_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275text(178, "Add to Inventory");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(179, "app-common-dialog", 41);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_179_listener() {
        return ctx.showEditModal = false;
      });
      \u0275\u0275template(180, EquipmentInventory_ng_container_180_Template, 47, 10, "ng-container", 61);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(181, "app-common-dialog", 62);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_181_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function EquipmentInventory_Template_app_common_dialog_primary_181_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275elementStart(182, "div", 63)(183, "p", 64);
      \u0275\u0275text(184, "Are you sure you want to remove ");
      \u0275\u0275elementStart(185, "span", 65);
      \u0275\u0275text(186);
      \u0275\u0275elementEnd();
      \u0275\u0275text(187, "? This action cannot be undone. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(188, "app-common-dialog", 66);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_188_listener() {
        return ctx.showAssignProjectModal = false;
      })("primary", function EquipmentInventory_Template_app_common_dialog_primary_188_listener() {
        return ctx.assignProjects();
      });
      \u0275\u0275elementStart(189, "div", 67)(190, "div", 68)(191, "div", 46)(192, "div")(193, "p", 69);
      \u0275\u0275text(194, " Equipment Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(195, "p", 70);
      \u0275\u0275text(196);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(197, "div", 71)(198, "p", 69);
      \u0275\u0275text(199, " Available Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(200, "p", 72);
      \u0275\u0275text(201);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(202, "div", 73);
      \u0275\u0275repeaterCreate(203, EquipmentInventory_For_204_Template, 20, 7, "div", 74, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(205, "button", 75);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_205_listener() {
        return ctx.addProjectRow();
      });
      \u0275\u0275elementStart(206, "span", 76);
      \u0275\u0275text(207, " add ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(208, " Add More Project ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(209, "div", 77)(210, "div", 78)(211, "div")(212, "p", 69);
      \u0275\u0275text(213, " Total Assigned ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(214, "p", 79);
      \u0275\u0275text(215);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(216, "div", 80)(217, "p", 69);
      \u0275\u0275text(218, " Remaining Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(219, "p", 81);
      \u0275\u0275text(220);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(221, EquipmentInventory_Conditional_221_Template, 5, 1, "div", 82);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(222, "app-common-dialog", 83);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_222_listener() {
        return ctx.showProjectStockPopup = false;
      });
      \u0275\u0275elementStart(223, "div", 84);
      \u0275\u0275conditionalCreate(224, EquipmentInventory_Conditional_224_Template, 8, 0, "div", 85)(225, EquipmentInventory_Conditional_225_Template, 3, 0, "div", 86);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(226, EquipmentInventory_Conditional_226_Template, 23, 4, "div", 87);
      \u0275\u0275elementStart(227, "app-common-dialog", 88);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_227_listener() {
        return ctx.showStockTransferModal = false;
      })("primary", function EquipmentInventory_Template_app_common_dialog_primary_227_listener() {
        return ctx.transferStock();
      });
      \u0275\u0275elementStart(228, "div", 89)(229, "div", 90)(230, "div", 91)(231, "span", 92);
      \u0275\u0275text(232, " inventory_2 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(233, "div", 93)(234, "h3", 94);
      \u0275\u0275text(235);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(236, "div", 95)(237, "div", 96);
      \u0275\u0275text(238);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(239, "div", 97);
      \u0275\u0275text(240);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(241, "div", 98);
      \u0275\u0275text(242);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(243, "div", 99);
      \u0275\u0275repeaterCreate(244, EquipmentInventory_For_245_Template, 33, 14, "div", 100, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(246, "button", 101);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_246_listener() {
        return ctx.addTransferRow();
      });
      \u0275\u0275elementStart(247, "span", 45);
      \u0275\u0275text(248, " add ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(249, " Add Transfer Row ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(250, "div", 102)(251, "label", 103);
      \u0275\u0275text(252, " Remarks ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(253, "textarea", 104);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_textarea_ngModelChange_253_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.stockTransferData.transfer_note, $event) || (ctx.stockTransferData.transfer_note = $event);
        return $event;
      });
      \u0275\u0275text(254, "      ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(255, "app-vendor-add-modal", 105);
      \u0275\u0275listener("close", function EquipmentInventory_Template_app_vendor_add_modal_close_255_listener() {
        return ctx.showAddVendorModal = false;
      })("save", function EquipmentInventory_Template_app_vendor_add_modal_save_255_listener() {
        return ctx.addVendor();
      })("contractSelect", function EquipmentInventory_Template_app_vendor_add_modal_contractSelect_255_listener($event) {
        return ctx.onContractFileSelected($event);
      })("onlyNumberEvent", function EquipmentInventory_Template_app_vendor_add_modal_onlyNumberEvent_255_listener($event) {
        return ctx.onlyNumbers($event);
      })("onlyAlphaNumericEvent", function EquipmentInventory_Template_app_vendor_add_modal_onlyAlphaNumericEvent_255_listener($event) {
        return ctx.onlyAlphanumeric($event);
      })("pasteNumericEvent", function EquipmentInventory_Template_app_vendor_add_modal_pasteNumericEvent_255_listener($event) {
        return ctx.stripNonNumericOnPaste($event.event, $event.field, $event.len);
      })("pasteAlphaNumericEvent", function EquipmentInventory_Template_app_vendor_add_modal_pasteAlphaNumericEvent_255_listener($event) {
        return ctx.stripNonAlphanumericOnPaste($event.event, $event.field, $event.len);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("", ctx.transferMode ? "Machinery Transfers" : "Equipment Inventory", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.transferMode ? "Use Reassign Equipment on a row to move machinery between projects" : "Precision tracking across active construction sites");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1(" ", ctx.materials.length, " ");
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate1(" ", ctx.noOfProjectsAssigned, " ");
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(45, 73, ctx.getInventoryValue(), "1.0-0"), " ");
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate1(" ", ctx.noOfProjectsNotAssigned, " ");
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(20);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredMaterials.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - ", ctx.endItem, " of ", ctx.filteredMaterials.length, " Equipment ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(76, _c02).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(12);
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-equipment" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800 hover:border-primary/40");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.name ? "text-slate-800 dark:text-white" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.name || "Select Equipment", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-equipment" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "add-equipment" ? 131 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-category" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800 hover:border-primary/40");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.category || "Select Category", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-category" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "add-category" ? 145 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-project" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800 hover:border-primary/40");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.project_name ? "text-slate-800 dark:text-white" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.project_name || "Select Project", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-project" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "add-project" ? 155 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.stockIn);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-vendor" ? "border-primary ring-4 ring-primary/10" : "border-outline-variant/20 dark:border-slate-800 hover:border-primary/40");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.newMaterial.vendor_name ? "text-slate-800 dark:text-white" : "text-slate-400");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.newMaterial.vendor_name || "Select Vendor", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.openDropdown === "add-vendor" ? "rotate-180 text-primary" : "text-slate-400");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.openDropdown === "add-vendor" ? 173 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.materialToEdit);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1('"', ctx.materialToDelete == null ? null : ctx.materialToDelete.name, '"');
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showAssignProjectModal)("showCloseButton", true)("showFooter", true)("primaryDisabled", ctx.getRemainingStock() < 0)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ctx.materialToEdit == null ? null : ctx.materialToEdit.name, " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.materialToEdit == null ? null : ctx.materialToEdit.stockRemaining, " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.assignedProjects);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1(" ", ctx.getTotalAssignedStock(), " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.getRemainingStock() < 0 ? "text-rose-600" : "text-emerald-600");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getRemainingStock(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.projectAssignError ? 221 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showProjectStockPopup)("subtitle", ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.name)("showCloseButton", true)("showFooter", false)("contentClass", "overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!(ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.equipment_project_stock == null ? null : ctx.selectedProjectStock.equipment_project_stock.length) ? 224 : 225);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showFilters ? 226 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showStockTransferModal)("showCloseButton", true)("showFooter", true)("contentClass", "min-h-0 overflow-y-auto custom-scrollbar smooth-scroll");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ctx.selectedMaterial == null ? null : ctx.selectedMaterial.name, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" SKU : ", ctx.selectedMaterial == null ? null : ctx.selectedMaterial.sku, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Main Stock : ", ctx.stockTransferData.stockIn, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Transfer Qty : ", ctx.getTotalTransferQty(), " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.stockTransferData.transfers);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.stockTransferData.transfer_note);
      \u0275\u0275advance(2);
      \u0275\u0275property("showAddModal", ctx.showAddVendorModal)("newVendor", ctx.newVendor)("errorMsg", ctx.errorMsg)("contractFile", ctx.contractFile)("isSaving", ctx.isSaving);
    }
  }, dependencies: [NgClass, NgIf, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, VendorAddComponent, CommonDialogComponent, DecimalPipe], styles: ["\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n}\n.custom-dropdown-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.custom-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-backdrop[_ngcontent-%COMP%] {\n  background: transparent;\n  cursor: default;\n}\n.custom-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-panel[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dropdownIn 0.16s ease-out;\n  transform-origin: top;\n  scroll-behavior: smooth;\n}\n@keyframes _ngcontent-%COMP%_dropdownIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n.custom-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-panel[_ngcontent-%COMP%] {\n  -webkit-overflow-scrolling: touch;\n}\n@media (max-width: 768px) {\n  .custom-dropdown-wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding-top: 0.65rem;\n    padding-bottom: 0.65rem;\n  }\n}\n@media (max-width: 480px) {\n  table[_ngcontent-%COMP%] {\n    min-width: 900px;\n  }\n}\n/*# sourceMappingURL=equipment-inventory.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EquipmentInventory, [{
    type: Component,
    args: [{ selector: "app-equipment-inventory", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-1">
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">{{ transferMode ? 'Machinery Transfers' : 'Equipment Inventory' }}
            </h2>
            <p class="text-on-surface-variant/80 font-medium">{{ transferMode ? 'Use Reassign Equipment on a row to move machinery between projects' : 'Precision tracking across active construction sites' }}</p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">

            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

            <div class="flex items-center justify-between relative z-10">

                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
                        Total SKU
                    </p>

                    <h3 class="text-3xl font-black tracking-tight mt-2">
                        {{ materials.length }}
                    </h3>

                    <p class="text-xs text-white/70 mt-1">
                        Active Equipment
                    </p>
                </div>

                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

                    <span class="material-symbols-outlined text-[30px]">
                        inventory_2
                    </span>

                </div>

            </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">

            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

            <div class="flex items-center justify-between relative z-10">

                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
                        Assigned Items
                    </p>

                    <h3 class="text-3xl font-black tracking-tight mt-2">
                        {{ noOfProjectsAssigned }}
                    </h3>

                    <p class="text-xs text-white/70 mt-1">
                        Project Allocated
                    </p>
                </div>

                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

                    <span class="material-symbols-outlined text-[30px]">
                        assignment_turned_in
                    </span>

                </div>

            </div>

        </div>

        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">

            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

            <div class="flex items-center justify-between relative z-10">

                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
                        Inventory Value
                    </p>

                    <h3 class="text-2xl font-black tracking-tight mt-2">
                        \u20B9{{ getInventoryValue() | number:'1.0-0' }}
                    </h3>

                    <p class="text-xs text-white/70 mt-1">
                        Total Stock Worth
                    </p>
                </div>

                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

                    <span class="material-symbols-outlined text-[30px]">
                        account_balance_wallet
                    </span>

                </div>

            </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl p-5
               bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800
               text-white shadow-lg hover:shadow-xl
               hover:-translate-y-1 transition-all duration-300">

            <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

            <div class="flex items-center justify-between relative z-10">

                <div>
                    <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
                        Not Assigned
                    </p>

                    <h3 class="text-3xl font-black tracking-tight mt-2">
                        {{ noOfProjectsNotAssigned }}
                    </h3>

                    <p class="text-xs text-white/70 mt-1">
                        Pending Allocation
                    </p>
                </div>

                <div
                    class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

                    <span class="material-symbols-outlined text-[30px]">
                        pending_actions
                    </span>

                </div>

            </div>

        </div>

    </div>

    <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar smooth-scroll pb-1">
        @for (tab of categories; track tab) {
        <button (click)="changeTab(tab)"
            [class]="selectedTab === tab.category_name ? 'bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-dim'"
            class="px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-colors shrink-0">
            {{ tab.category_name }}
        </button>
        }

    </div>

    <div
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
        <div
            class="overflow-hidden rounded-[28px] border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

            <div
                class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">

                <div>

                    <h3 class="text-xl font-black tracking-tight text-slate-800 dark:text-white">
                        Equipment Inventory
                    </h3>

                    <p class="text-sm text-slate-500 font-medium mt-1">
                        Live equipment availability & supplier tracking
                    </p>

                </div>

                <div class="flex items-center gap-3">

                    <div
                        class="flex items-center gap-2 px-4 h-11 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">

                        <span class="material-symbols-outlined text-slate-400 text-[20px]">
                            search
                        </span>

                        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"
                            placeholder="Search equipment..."
                            class="bg-transparent outline-none text-sm font-medium w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400">

                    </div>
                </div>

            </div>

            <div class="overflow-x-auto custom-scrollbar smooth-scroll px-4 py-4">

                <table class="w-full min-w-[1100px] border-separate border-spacing-y-4">
                    <thead>

                        <tr>
                            <th
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                Equipment
                            </th>

                            <th
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                Category
                            </th>

                            <th
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                Stock
                            </th>

                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Assigned Projects
                            </th>


                            <th
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                Cost
                            </th>

                            <th
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                Vendor
                            </th>

                            <th
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        @for (item of paginatedMaterials; track item.sku) {

                        <tr
                            class="group relative z-0 hover:z-[9999] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">

                            <td
                                class="px-6 py-5 rounded-l-[26px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">

                                <div class="flex items-center gap-4">

                                    <div
                                        class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">

                                        <div
                                            class="absolute inset-0 rounded-2xl bg-primary/10 scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        </div>

                                        <span class="material-symbols-outlined text-primary text-[24px] relative z-10">
                                            construction
                                        </span>

                                    </div>

                                    <div class="space-y-1">

                                        <p
                                            class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">

                                            {{ item.name }}

                                        </p>

                                        <div class="flex items-center gap-2">

                                            <span
                                                class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                                SKU
                                            </span>

                                            <span class="text-xs text-slate-400 font-semibold">
                                                {{ item.sku }}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">

                                <span
                                    class="inline-flex items-center px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide">

                                    {{ item.category }}

                                </span>

                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">

                                <div class="w-[210px] flex flex-col gap-3">

                                    <div class="flex items-center gap-3 text-sm font-black">
                                        <div class="flex items-center gap-1 text-slate-800 dark:text-slate-100">

                                            <span class="material-symbols-outlined text-[16px]">
                                                inventory_2
                                            </span>

                                            <span>{{ item.stockRemaining }}</span>

                                        </div>

                                        <span [ngClass]="item.stockUsed >= item.stockRemaining
      ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
      : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'" class="ml-2 px-2.5 py-1 rounded-full
           text-[10px] font-black uppercase tracking-wide">Stock

                                        </span>

                                    </div>
                                    <div
                                        class="relative w-full h-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">

                                        <div class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container transition-all duration-700"
                                            [style.width.%]="item.stockIn > 100 ? 100 : item.stockIn">
                                        </div>

                                    </div>

                                </div>

                            </td>

                            <td class="px-6 py-5 bg-white dark:bg-slate-900
         border-y border-slate-200 dark:border-slate-800">

                                <div (click)="item.equipment_project_stock?.length > 0 && openProjectStockPopup(item)"
                                    class="inline-flex items-center gap-3 px-3.5 py-2
           rounded-xl border transition-all duration-300" [ngClass]="item.equipment_project_stock?.length > 0
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/10'
      : 'cursor-not-allowed opacity-70 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'">

                                    <div [ngClass]="item.equipment_project_stock?.length > 0
        ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600'
        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'"
                                        class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">

                                        <span class="material-symbols-outlined text-[18px]">

                                            {{ item.equipment_project_stock?.length > 0
                                            ? 'apartment'
                                            : 'inventory_2' }}

                                        </span>

                                    </div>
                                    <div class="flex flex-col leading-tight min-w-[90px]">

                                        @if ((item.equipment_project_stock?.length || 0) > 0) {
                                        <span class="text-sm font-black text-slate-800 dark:text-white">
                                            {{ item.equipment_project_stock?.length }}
                                            {{ item.equipment_project_stock?.length === 1 ? 'Project' : 'Projects' }}
                                        </span>
                                        }

                                        <span [ngClass]="(item.equipment_project_stock?.length || 0) > 0
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-rose-500 dark:text-rose-400'" class="text-[10px] font-bold uppercase tracking-wide">

                                            {{ (item.equipment_project_stock?.length || 0) > 0
                                            ? 'Assigned'
                                            : 'Not Assigned' }}

                                        </span>

                                    </div>
                                    <span class="material-symbols-outlined text-[14px]
             text-slate-400">

                                        arrow_forward_ios

                                    </span>
                                </div>
                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">

                                <div class="flex flex-col">

                                    <span class="text-lg font-black text-slate-800 dark:text-white">
                                        \u20B9{{ item.cost }}
                                    </span>

                                    <span class="text-[11px] text-slate-400 font-semibold">
                                        Per Unit
                                    </span>
                                </div>
                            </td>

                            <td
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">

                                <div class="flex items-center gap-3">

                                    <div
                                        class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center text-sm font-black text-white shadow-lg">

                                        {{ (item.vendor_name || "?").charAt(0) }}

                                    </div>

                                    <div>

                                        <p class="text-sm font-black text-slate-700 dark:text-slate-200">
                                            {{ item.vendor_name }}
                                        </p>

                                        <p class="text-[11px] text-slate-400 font-medium">
                                            Verified Supplier
                                        </p>

                                    </div>

                                </div>

                            </td>

                            <td
                                class="px-6 py-5 rounded-r-[26px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">

                                <div class="flex items-center justify-between gap-4">
                                    <div class="flex items-center gap-2">
                                        <button (click)="openAssignProjectModal(item)" title="Assign to Project"
                                            class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">

                                            <span class="material-symbols-outlined text-[18px]">
                                                assignment_ind
                                            </span>

                                        </button>
                                        <button (click)="openStockTransferModal(item)" title="Reassign Equipment"
                                            [disabled]="!item.equipment_project_stock?.length" [ngClass]="
      item.equipment_project_stock?.length
        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
    " class="w-11 h-11 rounded-2xl transition-all duration-200 flex items-center justify-center">

                                            <span class="material-symbols-outlined text-[18px]">
                                                transfer_within_a_station
                                            </span>

                                        </button>

                                        <button (click)="openDeleteModal($event, item)" title="Delete Equipment"
                                            class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">

                                            <span class="material-symbols-outlined text-[18px]">
                                                delete
                                            </span>

                                        </button>

                                    </div>

                                </div>

                            </td>

                        </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

        <div
            class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">

            <p class="text-xs font-bold uppercase tracking-wider text-slate-500">

                Showing
                {{ filteredMaterials.length ? ((page - 1) * pageSize) + 1 : 0 }}
                -
                {{endItem}}

                of

                {{ filteredMaterials.length}} Equipment

            </p>

            <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar smooth-scroll max-w-full">

                <button (click)="prevPage()"
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shrink-0">

                    <span class="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>

                </button>

                @for (p of [].constructor(totalPages()); track $index) {

                <button (click)="goToPage($index + 1)"
                    class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0"
                    [ngClass]="page === ($index + 1)
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'">

                    {{ $index + 1 }}

                </button>

                }

                <!-- Next -->
                <button (click)="nextPage()"
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shrink-0">

                    <span class="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>

                </button>

            </div>

        </div>

    </div>
</section>

<app-common-dialog [open]="showAddModal" (closed)="showAddModal = false" panelClass="p-8 max-w-lg"
    [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-black tracking-tight">New Equipment</h3>
        <button (click)="showAddModal = false"
            class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
            <span class="material-symbols-outlined">close</span>
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Equipment
                Name</label>
            <div class="custom-dropdown-wrapper relative">
                <button type="button" (click)="toggleDropdown('add-equipment')"
                    class="w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between text-sm font-bold outline-none bg-white dark:bg-slate-900 transition-all duration-200 cursor-pointer"
                    [ngClass]="(openDropdown === ('add-equipment')) ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800 hover:border-primary/40'">
                    <span class="truncate text-left"
                        [ngClass]="newMaterial.name ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                        {{ newMaterial.name || 'Select Equipment' }}
                    </span>
                    <span class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                        [ngClass]="(openDropdown === ('add-equipment')) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>

                @if ((openDropdown === ('add-equipment'))) {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                        @for (material of MaterialMaster; track material.id) {
                        <div (click)="selectEquipmentAdd(material)"
                            class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150"
                            [ngClass]="newMaterial.equipment_master_id === material.id ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                            {{ material.name }}
                        </div>
                        }
                        @if (!MaterialMaster?.length) {
                        <div class="px-4 py-3 text-sm font-semibold text-slate-400">No equipment found</div>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>
            <input [(ngModel)]="newMaterial.sku" type="text" placeholder="SKU-XXX-X"
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
        </div>
        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>
            <div class="custom-dropdown-wrapper relative">
                <button type="button" (click)="toggleDropdown('add-category')"
                    class="w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between text-sm font-bold outline-none bg-white dark:bg-slate-900 transition-all duration-200 cursor-pointer"
                    [ngClass]="(openDropdown === ('add-category')) ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800 hover:border-primary/40'">
                    <span class="truncate text-left text-slate-800 dark:text-white">
                        {{ newMaterial.category || 'Select Category' }}
                    </span>
                    <span class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                        [ngClass]="(openDropdown === ('add-category')) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>

                @if ((openDropdown === ('add-category'))) {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                        @for (cat of categoryOptions; track cat) {
                        <div (click)="selectCategoryAdd(cat)"
                            class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150"
                            [ngClass]="newMaterial.category === cat ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                            {{ cat }}
                        </div>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>
            <div class="custom-dropdown-wrapper relative">
                <button type="button" (click)="toggleDropdown('add-project')"
                    class="w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between text-sm font-bold outline-none bg-white dark:bg-slate-900 transition-all duration-200 cursor-pointer"
                    [ngClass]="(openDropdown === ('add-project')) ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800 hover:border-primary/40'">
                    <span class="truncate text-left"
                        [ngClass]="newMaterial.project_name ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                        {{ newMaterial.project_name || 'Select Project' }}
                    </span>
                    <span class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                        [ngClass]="(openDropdown === ('add-project')) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>

                @if ((openDropdown === ('add-project'))) {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                        @for (p of projects; track p.id) {
                        <div (click)="selectProjectAdd(p)"
                            class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150"
                            [ngClass]="newMaterial.project_id === p.id ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                            {{ p.name }}
                        </div>
                        }
                        @if (!projects.length) {
                        <div class="px-4 py-3 text-sm font-semibold text-slate-400">No projects found</div>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">
                Stock In</label>
            <input [(ngModel)]="newMaterial.stockIn" type="number" min="1"
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
        </div>
        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">
                Cost</label>
            <input [(ngModel)]="newMaterial.cost" min="1" type="number" (blur)="formatCost()" placeholder="0.00"
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
        </div>
        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Vendor</label>
            <div class="custom-dropdown-wrapper relative">
                <button type="button" (click)="toggleDropdown('add-vendor')"
                    class="w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between text-sm font-bold outline-none bg-white dark:bg-slate-900 transition-all duration-200 cursor-pointer"
                    [ngClass]="(openDropdown === ('add-vendor')) ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800 hover:border-primary/40'">
                    <span class="truncate text-left"
                        [ngClass]="newMaterial.vendor_name ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                        {{ newMaterial.vendor_name || 'Select Vendor' }}
                    </span>
                    <span class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                        [ngClass]="(openDropdown === ('add-vendor')) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>

                @if ((openDropdown === ('add-vendor'))) {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                        @for (v of vendors; track v.id) {
                        <div (click)="selectVendorAdd(v)"
                            class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150"
                            [ngClass]="newMaterial.vendor_id === v.id ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                            {{ v.name }}
                        </div>
                        }
                        <div (click)="selectAddNewVendor()"
                            class="px-4 py-2.5 text-sm font-black text-primary cursor-pointer transition-colors duration-150 hover:bg-primary/5 border-t border-outline-variant/10 flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-[16px]">add</span>
                            Add New Vendor
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    </div>

    <div class="flex gap-3 mt-8">
        <button (click)="showAddModal = false"
            class="flex-1 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors">Cancel</button>
        <button (click)="addMaterial()"
            class="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Add
            to Inventory</button>
    </div>
</app-common-dialog>

<app-common-dialog [open]="showEditModal && !!materialToEdit" (closed)="showEditModal = false" panelClass="p-8 max-w-lg"
    [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    <ng-container *ngIf="materialToEdit">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-black tracking-tight">Edit material</h3>
            <button (click)="showEditModal = false"
                class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material
                    Name</label>
                <input [value]="materialToEdit.name" type="text" readonly
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
            </div>
            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>
                <input [value]="materialToEdit.sku" type="text" readonly
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-slate-50 dark:bg-slate-800/50 text-sm font-bold outline-none cursor-not-allowed">
            </div>
            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>
                <div
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm font-bold text-slate-500 dark:text-slate-400 cursor-not-allowed flex items-center justify-between">
                    <span>{{ materialToEdit.category || 'Select Category' }}</span>
                    <span class="material-symbols-outlined text-[20px] text-slate-300">expand_more</span>
                </div>
            </div>

            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">
                    Stock In</label>
                <input [value]="materialToEdit.stockIn" type="number"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30"
                    readonly>
            </div>
            <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">
                    Cost</label>
                <input [value]="materialToEdit.cost" type="number" (blur)="formatCostEdit()" readonly
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">
            </div>
        </div>

        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>
            <div class="custom-dropdown-wrapper relative">
                <button type="button" (click)="toggleDropdown('edit-project')"
                    class="w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between text-sm font-bold outline-none bg-white dark:bg-slate-900 transition-all duration-200 cursor-pointer"
                    [ngClass]="(openDropdown === ('edit-project')) ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant/20 dark:border-slate-800 hover:border-primary/40'">
                    <span class="truncate text-left"
                        [ngClass]="materialToEdit.project_name ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                        {{ materialToEdit.project_name || 'Select Project' }}
                    </span>
                    <span class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                        [ngClass]="(openDropdown === ('edit-project')) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                </button>

                @if ((openDropdown === ('edit-project'))) {
                <div
                    class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                        @for (p of projects; track p.id) {
                        <div (click)="selectProjectEdit(p)"
                            class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150"
                            [ngClass]="materialToEdit.project_id === p.id ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                            {{ p.name }}
                        </div>
                        }
                        @if (!projects.length) {
                        <div class="px-4 py-3 text-sm font-semibold text-slate-400">No projects found</div>
                        }
                    </div>
                </div>
                }
            </div>
        </div>

        <div class="flex gap-3 mt-8">
            <button (click)="showEditModal = false"
                class="flex-1 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors">Cancel</button>
            <button (click)="updateMaterial()"
                class="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Save
                Changes</button>
        </div>
    </ng-container>
</app-common-dialog>

<app-common-dialog [open]="showDeleteModal && !!materialToDelete" variant="danger" title="Delete Equipment?"
    subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"
    cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="showDeleteModal = false" (primary)="confirmDelete()">
    <div class="p-8 text-center">
        <p class="text-outline text-sm font-medium">Are you sure you want to remove <span
                class="text-on-surface font-black">"{{ materialToDelete?.name }}"</span>? This action cannot be undone.
        </p>
    </div>
</app-common-dialog>

<app-common-dialog [open]="showAssignProjectModal" title="Assign Equipment" subtitle="Allocate stock project wise"
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" primaryLabel="Assign Stock"
    [primaryDisabled]="getRemainingStock() < 0" (closed)="showAssignProjectModal = false" (primary)="assignProjects()"
    panelClass="max-w-3xl" [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    <div class="p-7">

        <div class="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40
           border border-slate-200 dark:border-slate-700">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <p class="text-[10px] uppercase tracking-[0.2em]
                  font-black text-slate-400 mb-1">
                        Equipment Name
                    </p>

                    <p class="text-sm md:text-base font-black text-slate-900 dark:text-white">
                        {{ materialToEdit?.name }}
                    </p>
                </div>

                <div class="md:text-right">
                    <p class="text-[10px] uppercase tracking-[0.2em]
                  font-black text-slate-400 mb-1">
                        Available Stock
                    </p>

                    <p class="text-lg font-black text-emerald-600">
                        {{ materialToEdit?.stockRemaining }}
                    </p>
                </div>

            </div>

        </div>

        <div class="space-y-3">

            @for (item of assignedProjects; track item; let i = $index) {

            <div class="p-4 rounded-2xl border border-slate-200
             dark:border-slate-700 bg-slate-50/60
             dark:bg-slate-800/30 transition-all">

                <div class="grid grid-cols-12 gap-3 items-end">

                    <div class="col-span-12 md:col-span-7">

                        <label class="text-[9px] uppercase tracking-[0.18em]
                   font-black text-slate-400 mb-1.5 block">

                            Select Project
                        </label>

                        <div class="custom-dropdown-wrapper relative">
                            <button type="button" (click)="toggleDropdown('assign-project-' + i)" class="w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between
                       bg-white dark:bg-slate-900 text-sm font-semibold outline-none
                       transition-all duration-200 cursor-pointer"
                                [ngClass]="(openDropdown === ('assign-project-' + i)) ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400/50'">
                                <span class="truncate text-left"
                                    [ngClass]="item.project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                                    {{ getProjectNameById(item.project_id) || 'Choose Project' }}
                                </span>
                                <span
                                    class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                                    [ngClass]="(openDropdown === ('assign-project-' + i)) ? 'rotate-180 text-indigo-500' : 'text-slate-400'">expand_more</span>
                            </button>

                            @if ((openDropdown === ('assign-project-' + i))) {
                            <div
                                class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                                <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                                    @for (project of projects; track project.id) {
                                    <div (click)="selectAssignProject(i, project)"
                                        class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150"
                                        [ngClass]="item.project_id === project.id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                                        {{ project.name }}
                                    </div>
                                    }
                                    @if (!projects.length) {
                                    <div class="px-4 py-3 text-sm font-semibold text-slate-400">No projects found</div>
                                    }
                                </div>
                            </div>
                            }
                        </div>

                    </div>

                    <div class="col-span-9 md:col-span-4">

                        <label class="text-[9px] uppercase tracking-[0.18em]
                   font-black text-slate-400 mb-1.5 block">

                            Stock Qty
                        </label>

                        <input type="number" min="1" [(ngModel)]="item.stock" (input)="validateAssignedStock()"
                            placeholder="Enter qty" class="w-full px-4 py-3 rounded-xl border
                   border-slate-200 dark:border-slate-700
                   bg-white dark:bg-slate-900
                   text-sm font-semibold outline-none
                   focus:ring-2 focus:ring-indigo-500/20
                   focus:border-indigo-500 transition-all">

                    </div>

                    <div class="col-span-3 md:col-span-1 flex justify-end">

                        <button type="button" (click)="removeProjectRow(i)" [disabled]="assignedProjects.length === 1"
                            class="w-11 h-11 rounded-xl bg-rose-100
                   text-rose-600 hover:bg-rose-200
                   transition-all flex items-center
                   justify-center disabled:opacity-40
                   disabled:cursor-not-allowed">

                            <span class="material-symbols-outlined text-[18px]">
                                delete
                            </span>

                        </button>

                    </div>

                </div>

            </div>

            }

        </div>

        <button type="button" (click)="addProjectRow()" class="mt-5 w-full border-2 border-dashed
           border-indigo-300 dark:border-indigo-700
           rounded-2xl py-3.5 text-indigo-600
           dark:text-indigo-400 font-black text-sm
           hover:bg-indigo-50 dark:hover:bg-indigo-900/10
           transition-all flex items-center
           justify-center gap-2">

            <span class="material-symbols-outlined text-[20px]">
                add
            </span>

            Add More Project

        </button>

        <div class="mt-6 p-5 rounded-2xl border border-indigo-200
           dark:border-indigo-800 bg-indigo-50
           dark:bg-indigo-900/10">

            <div class="grid grid-cols-2 gap-4">

                <div>
                    <p class="text-[10px] uppercase tracking-[0.2em]
                  font-black text-slate-400 mb-1">
                        Total Assigned
                    </p>

                    <p class="text-2xl font-black text-indigo-600">
                        {{ getTotalAssignedStock() }}
                    </p>
                </div>

                <div class="text-right">
                    <p class="text-[10px] uppercase tracking-[0.2em]
                  font-black text-slate-400 mb-1">
                        Remaining Stock
                    </p>

                    <p [ngClass]="getRemainingStock() < 0
            ? 'text-rose-600'
            : 'text-emerald-600'" class="text-2xl font-black">

                        {{ getRemainingStock() }}
                    </p>
                </div>

            </div>

        </div>

        @if (projectAssignError) {

        <div class="mt-5 flex items-start gap-3 px-4 py-3 rounded-2xl
           bg-rose-50 dark:bg-rose-900/10
           border border-rose-200 dark:border-rose-800
           text-rose-700 dark:text-rose-400">

            <span class="material-symbols-outlined text-[20px]">
                error
            </span>

            <p class="text-sm font-semibold leading-relaxed">
                {{ projectAssignError }}
            </p>

        </div>

        }

    </div>

</app-common-dialog>

<app-common-dialog [open]="showProjectStockPopup" title="Project Assignment" [subtitle]="selectedProjectStock?.name"
    [showCloseButton]="true" [showFooter]="false" (closed)="showProjectStockPopup = false" panelClass="p-6 max-w-2xl"
    [contentClass]="'overflow-y-auto custom-scrollbar smooth-scroll'">
    <div class="p-6">

        @if (!selectedProjectStock?.equipment_project_stock?.length) {

        <div class="flex flex-col items-center justify-center
               py-14 text-center">

            <div class="w-20 h-20 rounded-3xl bg-slate-100
                 dark:bg-slate-800 flex items-center
                 justify-center mb-5">

                <span class="material-symbols-outlined text-[40px]
                   text-slate-400">

                    inventory_2

                </span>

            </div>

            <h4 class="text-lg font-black text-slate-800
                 dark:text-white">

                No Project Assigned

            </h4>

            <p class="text-sm text-slate-500 mt-2">

                This Equipment is not assigned to any project yet.

            </p>

        </div>

        } @else {

        <div class="space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar smooth-scroll pr-1">

            @for (p of selectedProjectStock.equipment_project_stock; track $index) {

            <div class="p-5 rounded-2xl border border-slate-200
                 dark:border-slate-700 bg-slate-50/70
                 dark:bg-slate-800/40">

                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">

                        <div class="w-14 h-14 rounded-2xl
                       bg-indigo-100 dark:bg-indigo-500/10
                       text-indigo-600 flex items-center
                       justify-center">

                            <span class="material-symbols-outlined">
                                apartment
                            </span>

                        </div>

                        <div>

                            <h4 class="text-sm font-black text-slate-800
                         dark:text-white">

                                {{ p.project_name }}

                            </h4>

                            <p class="text-xs text-slate-400 mt-1">

                                Assigned Project

                            </p>

                        </div>

                    </div>

                    <div class="text-right">

                        <h4 class="text-2xl font-black text-indigo-600">

                            {{ p.stockUsed }}

                        </h4>

                        <p class="text-[11px] uppercase tracking-wide
                       text-slate-400 font-bold">

                            Unit(s)

                        </p>

                    </div>

                </div>

            </div>

            }

        </div>

        }

    </div>

</app-common-dialog>

@if (showFilters) {
<div class="fixed inset-0 z-[90]" (click)="showFilters = false">
    <div class="absolute top-32 right-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 p-6 w-72 animate-in fade-in slide-in-from-top-4 duration-300"
        (click)="$event.stopPropagation()">
        <h4 class="text-xs font-black uppercase tracking-widest text-outline mb-4">Advanced Filters</h4>
        <div class="space-y-4">
            <div>
                <label class="text-[10px] font-bold text-outline mb-1 block">Sort Order</label>
                <div class="custom-dropdown-wrapper relative">
                    <button type="button" (click)="toggleDropdown('sort-order')"
                        class="w-full p-2 rounded-lg border flex items-center justify-between bg-surface-container text-xs font-bold outline-none transition-all duration-200 cursor-pointer"
                        [ngClass]="(openDropdown === ('sort-order')) ? 'border-primary ring-2 ring-primary/10' : 'border-transparent'">
                        <span class="truncate text-left">{{ selectedSortOrder }}</span>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 ml-1 transition-transform duration-200"
                            [ngClass]="(openDropdown === ('sort-order')) ? 'rotate-180 text-primary' : 'text-outline'">expand_more</span>
                    </button>

                    @if ((openDropdown === ('sort-order'))) {
                    <div
                        class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
                        <div class="max-h-48 overflow-y-auto custom-scrollbar smooth-scroll py-1">
                            @for (order of sortOrderOptions; track order) {
                            <div (click)="selectSortOrder(order)"
                                class="px-3 py-2 text-xs font-bold cursor-pointer transition-colors duration-150"
                                [ngClass]="selectedSortOrder === order ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                                {{ order }}
                            </div>
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div>
                <label class="text-[10px] font-bold text-outline mb-1 block">Supplier Status</label>
                <div class="flex flex-wrap gap-2">
                    @for (status of supplierStatusOptions; track status) {
                    <button (click)="toggleSupplierStatus(status)"
                        class="px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer"
                        [ngClass]="selectedSupplierStatus === status ? 'bg-primary text-white' : 'bg-surface-container text-outline hover:bg-surface-dim'">
                        {{ status }}
                    </button>
                    }
                </div>
            </div>
        </div>
        <button (click)="showFilters = false"
            class="w-full mt-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">Apply
            Filters</button>
    </div>


</div>
}

<app-common-dialog [open]="showStockTransferModal" title="Reassign Equipment"
    subtitle="Move Equipment stock between projects" icon="swap_horiz" [showCloseButton]="true" [showFooter]="true"
    [contentClass]="'min-h-0 overflow-y-auto custom-scrollbar smooth-scroll'" cancelLabel="Cancel"
    primaryLabel="Reassign Equipment" (closed)="showStockTransferModal = false" (primary)="transferStock()">

    <div class="p-6 space-y-8">
        <div
            class="flex items-center gap-4 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">

            <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[26px]">
                    inventory_2
                </span>
            </div>

            <div class="flex-1 min-w-0">
                <h3 class="text-lg font-black truncate">
                    {{ selectedMaterial?.name }}
                </h3>

                <div class="flex flex-wrap items-center gap-2 mt-2">

                    <div class="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-[11px] font-black">
                        SKU : {{ selectedMaterial?.sku }}
                    </div>

                    <div class="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-700 text-[11px] font-black">
                        Main Stock : {{ stockTransferData.stockIn }}
                    </div>

                    <div class="px-3 py-1 rounded-xl bg-amber-100 text-amber-700 text-[11px] font-black">
                        Transfer Qty : {{ getTotalTransferQty() }}
                    </div>

                </div>
            </div>
        </div>

        <div class="space-y-4">

            @for (item of stockTransferData.transfers; track item; let i = $index) {

            <div
                class="relative p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">

                @if (stockTransferData.transfers.length > 1) {
                <button (click)="removeTransferRow(i)"
                    class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center">

                    <span class="material-symbols-outlined text-[18px]">
                        delete
                    </span>

                </button>
                }

                <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_130px] gap-4 items-start">
                    <div>

                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                            From Project
                        </label>

                        <div class="custom-dropdown-wrapper relative">
                            <button type="button" (click)="toggleDropdown('transfer-from-' + i)" class="w-full px-4 py-3 rounded-2xl border-2 flex items-center justify-between
                       bg-white dark:bg-slate-900 text-sm font-bold outline-none
                       transition-all duration-200 cursor-pointer"
                                [ngClass]="(openDropdown === ('transfer-from-' + i)) ? 'border-primary ring-4 ring-primary/10' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'">
                                <span class="truncate text-left"
                                    [ngClass]="item.from_project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                                    {{ getProjectNameById(item.from_project_id) || 'Select Project' }}
                                </span>
                                <span
                                    class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                                    [ngClass]="(openDropdown === ('transfer-from-' + i)) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                            </button>

                            @if ((openDropdown === ('transfer-from-' + i))) {
                            <div
                                class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                                <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                                    @for (p of projects; track p.id) {
                                    <div (click)="selectTransferFromProject(i, p)"
                                        class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150 flex items-center justify-between"
                                        [ngClass]="item.from_project_id === p.id ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                                        <span>{{ p.name }}</span>
                                        <span class="text-[10px] font-semibold text-slate-400">Stock : {{
                                            getProjectStock(p.id) }}</span>
                                    </div>
                                    }
                                </div>
                            </div>
                            }
                        </div>

                        @if (item.from_project_id) {

                        <div
                            class="mt-3 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">

                            <div class="flex items-center justify-between">

                                <div class="flex items-center gap-2">

                                    <span class="material-symbols-outlined text-[18px] text-emerald-600">
                                        inventory
                                    </span>

                                    <span
                                        class="text-[11px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                                        Available Stock
                                    </span>

                                </div>

                                <span class="text-lg font-black text-emerald-700 dark:text-emerald-300">
                                    {{ getProjectStock(item.from_project_id) }}
                                </span>

                            </div>

                        </div>

                        }

                    </div>

                    <div class="hidden md:flex justify-center pt-6">

                        <div
                            class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">

                            <span class="material-symbols-outlined">
                                east
                            </span>

                        </div>

                    </div>

                    <div>

                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                            To Project
                        </label>

                        <div class="custom-dropdown-wrapper relative">
                            <button type="button" (click)="toggleDropdown('transfer-to-' + i)" class="w-full px-4 py-3 rounded-2xl border-2 flex items-center justify-between
                       bg-white dark:bg-slate-900 text-sm font-bold outline-none
                       transition-all duration-200 cursor-pointer"
                                [ngClass]="(openDropdown === ('transfer-to-' + i)) ? 'border-primary ring-4 ring-primary/10' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'">
                                <span class="truncate text-left"
                                    [ngClass]="item.to_project_id ? 'text-slate-800 dark:text-white' : 'text-slate-400'">
                                    {{ getProjectNameById(item.to_project_id) || 'Select Project' }}
                                </span>
                                <span
                                    class="material-symbols-outlined text-[20px] shrink-0 ml-2 transition-transform duration-200"
                                    [ngClass]="(openDropdown === ('transfer-to-' + i)) ? 'rotate-180 text-primary' : 'text-slate-400'">expand_more</span>
                            </button>

                            @if ((openDropdown === ('transfer-to-' + i))) {
                            <div
                                class="dropdown-panel absolute z-50 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                                <div class="max-h-56 overflow-y-auto custom-scrollbar smooth-scroll py-1.5">
                                    @for (p of projects; track p.id) {
                                    <div (click)="selectTransferToProject(i, p)"
                                        class="px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors duration-150 flex items-center justify-between"
                                        [ngClass]="item.to_project_id === p.id ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'">
                                        <span>{{ p.name }}</span>
                                        <span class="text-[10px] font-semibold text-slate-400">Stock : {{
                                            getProjectStock(p.id) }}</span>
                                    </div>
                                    }
                                </div>
                            </div>
                            }
                        </div>

                        @if (item.to_project_id) {

                        <div
                            class="mt-3 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">

                            <div class="flex items-center justify-between">

                                <div class="flex items-center gap-2">

                                    <span class="material-symbols-outlined text-[18px] text-blue-600">
                                        warehouse
                                    </span>

                                    <span
                                        class="text-[11px] font-black uppercase tracking-wide text-blue-700 dark:text-blue-300">
                                        Current Stock
                                    </span>

                                </div>

                                <span class="text-lg font-black text-blue-700 dark:text-blue-300">
                                    {{ getProjectStock(item.to_project_id) }}
                                </span>

                            </div>

                        </div>

                        }

                    </div>

                    <div>

                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                            Quantity
                        </label>

                        <input [(ngModel)]="item.quantity" type="number" min="1" placeholder="0"
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-black outline-none focus:ring-4 focus:ring-primary/20">

                    </div>

                </div>

            </div>

            }

            <button (click)="addTransferRow()"
                class="w-full py-4 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-black hover:bg-primary/5 transition-all flex items-center justify-center gap-2">

                <span class="material-symbols-outlined">
                    add
                </span>

                Add Transfer Row

            </button>

        </div>

        <div class="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block">
                Remarks
            </label>

            <textarea [(ngModel)]="stockTransferData.transfer_note" rows="4" placeholder="Write transfer note..."
                class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/20 resize-none">
      </textarea>

        </div>

    </div>

</app-common-dialog>

<app-vendor-add-modal [showAddModal]="showAddVendorModal" [newVendor]="newVendor" [errorMsg]="errorMsg"
    [contractFile]="contractFile" [isSaving]="isSaving" (close)="showAddVendorModal = false" (save)="addVendor()"
    (contractSelect)="onContractFileSelected($event)" (onlyNumberEvent)="onlyNumbers($event)"
    (onlyAlphaNumericEvent)="onlyAlphanumeric($event)"
    (pasteNumericEvent)="stripNonNumericOnPaste($event.event, $event.field, $event.len)"
    (pasteAlphaNumericEvent)="stripNonAlphanumericOnPaste($event.event, $event.field, $event.len)">
</app-vendor-add-modal>`, styles: ["/* src/app/modules/resources/equipment-inventory/equipment-inventory.scss */\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll {\n  scroll-behavior: smooth;\n}\n.custom-dropdown-wrapper {\n  position: relative;\n}\n.custom-dropdown-wrapper .dropdown-backdrop {\n  background: transparent;\n  cursor: default;\n}\n.custom-dropdown-wrapper .dropdown-panel {\n  animation: dropdownIn 0.16s ease-out;\n  transform-origin: top;\n  scroll-behavior: smooth;\n}\n@keyframes dropdownIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n.custom-dropdown-wrapper .dropdown-panel {\n  -webkit-overflow-scrolling: touch;\n}\n@media (max-width: 768px) {\n  .custom-dropdown-wrapper button {\n    padding-top: 0.65rem;\n    padding-bottom: 0.65rem;\n  }\n}\n@media (max-width: 480px) {\n  table {\n    min-width: 900px;\n  }\n}\n/*# sourceMappingURL=equipment-inventory.css.map */\n"] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }], onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EquipmentInventory, { className: "EquipmentInventory", filePath: "app/modules/resources/equipment-inventory/equipment-inventory.ts", lineNumber: 17 });
})();

// src/app/shared/services/quotation.service.ts
var QuotationService = class _QuotationService {
  http;
  baseUrl = `${environment.serverUrl}/api/v1`;
  getall_material_quotation = `${this.baseUrl}/getall_quotation`;
  create_quotation = `${this.baseUrl}/create_quotation`;
  delete_quotation = `${this.baseUrl}/delete_quotation`;
  update_approval_quotation_status = `${this.baseUrl}/update_approval_quotation_status`;
  quotesSubject = new BehaviorSubject([]);
  quotes$ = this.quotesSubject.asObservable();
  constructor(http) {
    this.http = http;
    this.loadQuotes();
  }
  loadQuotes() {
    this.http.get(this.getall_material_quotation).subscribe((data) => {
      this.quotesSubject.next(data);
    });
  }
  getQuotes() {
    return this.quotesSubject.value;
  }
  addQuote(quote) {
    return this.http.post(this.create_quotation, quote).pipe(tap(() => this.loadQuotes()));
  }
  getQuoteById(id) {
    return this.quotesSubject.value.find((q) => q.id === id);
  }
  updateQuoteStatus(id, status, feedback) {
    const updateData = {
      status,
      vendor_feedback: feedback,
      last_updated: (/* @__PURE__ */ new Date()).toLocaleDateString()
    };
    return this.http.post(`${this.update_approval_quotation_status}/${id}`, updateData);
  }
  deleteQuote(id) {
    return this.http.delete(`${this.delete_quotation}/${id}`);
  }
  static \u0275fac = function QuotationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuotationService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _QuotationService, factory: _QuotationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuotationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/resources/quotations/quotations.ts
var _c03 = () => [];
var _c1 = (a0, a1) => ({ "text-gray-400 bg-gray-100 cursor-not-allowed opacity-60": a0, "text-amber-600 hover:bg-amber-50 cursor-pointer": a1 });
var _c2 = (a0, a1) => ({ "bg-green-600 text-white border-green-600 shadow-lg": a0, "bg-white text-green-600 hover:bg-green-50": a1 });
var _c3 = (a0, a1) => ({ "bg-red-600 text-white border-red-600 shadow-lg": a0, "bg-white text-red-600 hover:bg-red-50": a1 });
var _forTrack03 = ($index, $item) => $item.id;
function Quotations_For_98_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275listener("click", function Quotations_For_98_div_47_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 70)(2, "div", 71)(3, "button", 72);
    \u0275\u0275listener("click", function Quotations_For_98_div_47_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const quote_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openViewModal(quote_r2));
    });
    \u0275\u0275elementStart(4, "span", 39);
    \u0275\u0275text(5, " visibility ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " View Details ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 73);
    \u0275\u0275listener("click", function Quotations_For_98_div_47_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const quote_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openNegotiateModal(quote_r2));
    });
    \u0275\u0275elementStart(8, "span", 39);
    \u0275\u0275text(9, " handshake ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Approval Action ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "div", 74);
    \u0275\u0275elementStart(12, "button", 75);
    \u0275\u0275listener("click", function Quotations_For_98_div_47_Template_button_click_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const quote_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal(quote_r2, $event));
    });
    \u0275\u0275elementStart(13, "span", 39);
    \u0275\u0275text(14, " block ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " Delete Quote ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const quote_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", quote_r2.status == "Approved")("ngClass", \u0275\u0275pureFunction2(2, _c1, quote_r2.status == "Approved", quote_r2.status != "Approved"));
  }
}
function Quotations_For_98_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 34)(1, "td", 46)(2, "div", 24)(3, "div", 47)(4, "span", 48);
    \u0275\u0275text(5, " description ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 49)(7, "p", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 51)(10, "span", 52);
    \u0275\u0275text(11, " calendar_month ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(14, "td", 53)(15, "div", 54)(16, "div", 55);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "p", 56);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 57);
    \u0275\u0275text(22, " Sales Executive ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "td", 53)(24, "span", 58);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 53)(27, "div", 59)(28, "span", 39);
    \u0275\u0275text(29, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 60);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "td", 53)(33, "div")(34, "p", 61);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p", 62);
    \u0275\u0275text(37, " Total Value ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "td", 53)(39, "div", 63)(40, "span");
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "td", 64)(43, "div", 65)(44, "button", 66);
    \u0275\u0275listener("click", function Quotations_For_98_Template_button_click_44_listener($event) {
      const quote_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown(quote_r2.id, $event));
    });
    \u0275\u0275elementStart(45, "span", 67);
    \u0275\u0275text(46, " more_vert ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(47, Quotations_For_98_div_47_Template, 16, 5, "div", 68);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const quote_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", quote_r2.quotation_number, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(13, 11, quote_r2.date, "mediumDate"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (quote_r2.sales_person || "?").charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", quote_r2.sales_person, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", quote_r2.quotation_type, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", quote_r2.items.length, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u20B9", quote_r2.total_amount.toLocaleString(), " ");
    \u0275\u0275advance(5);
    \u0275\u0275classMap("px-5 py-2 rounded-full text-[11px] font-black tracking-[0.15em] uppercase shadow-sm border " + ctx_r2.getStatusClass(quote_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", quote_r2.status, " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r2.activeDropdownId === quote_r2.id);
  }
}
function Quotations_For_107_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function Quotations_For_107_Template_button_click_0_listener() {
      const $index_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage($index_r6 + 1));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.page === $index_r6 + 1 ? "bg-primary text-white shadow-md" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", $index_r6 + 1, " ");
  }
}
function Quotations_Conditional_112_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 92)(1, "td", 93)(2, "p", 94);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 95);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 96);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 97);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 98);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 98);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Vendor: ", item_r7.vendor_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", item_r7.unitPrice.toLocaleString());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", item_r7.totalPrice.toLocaleString());
  }
}
function Quotations_Conditional_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 77)(2, "div", 78)(3, "p", 79);
    \u0275\u0275text(4, "Originating Member");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 80);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 81)(8, "p", 79);
    \u0275\u0275text(9, "Grand Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 82);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 83)(13, "h4", 84);
    \u0275\u0275text(14, "Allocated Items");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 85)(16, "table", 86)(17, "thead", 87)(18, "tr")(19, "th", 88);
    \u0275\u0275text(20, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 89);
    \u0275\u0275text(22, "Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 88);
    \u0275\u0275text(24, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 89);
    \u0275\u0275text(26, "Unit Price ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 90);
    \u0275\u0275text(28, "Total ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "tbody");
    \u0275\u0275template(30, Quotations_Conditional_112_tr_30_Template, 14, 6, "tr", 91);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.selectedQuote.sales_person);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r2.selectedQuote.total_amount.toLocaleString());
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r2.selectedQuote.items);
  }
}
function Quotations_Conditional_114_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div")(2, "label", 99);
    \u0275\u0275text(3, "Current Status Profile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 100)(5, "button", 101);
    \u0275\u0275listener("click", function Quotations_Conditional_114_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectQuoteStatus("Approved"));
    });
    \u0275\u0275text(6, " Approve ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 101);
    \u0275\u0275listener("click", function Quotations_Conditional_114_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectQuoteStatus("Rejected"));
    });
    \u0275\u0275text(8, " Reject ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div")(10, "label", 99);
    \u0275\u0275text(11, "Vendor Feedback & Log");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 102);
    \u0275\u0275twoWayListener("ngModelChange", function Quotations_Conditional_114_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.negotiationFeedback, $event) || (ctx_r2.negotiationFeedback = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(3, _c2, ctx_r2.selectedQuote.status === "Approved", ctx_r2.selectedQuote.status !== "Approved"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(6, _c3, ctx_r2.selectedQuote.status === "Rejected", ctx_r2.selectedQuote.status !== "Rejected"));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.negotiationFeedback);
  }
}
function Quotations_Conditional_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "p", 103);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 104);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, "? This action cannot be undone. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('"', ctx_r2.quoteToDelete.quotation_number, '"');
  }
}
var Quotations = class _Quotations {
  quotationService = inject(QuotationService);
  toast = inject(ToastrService);
  route = inject(ActivatedRoute);
  quotes = [];
  searchQuery = "";
  activeDropdownId = null;
  isTenderContext = false;
  pageTitle = "Sales Quotations";
  pageSubtitle = "Manage and track material & equipment quotes from various vendors";
  // New Modal States
  showViewModal = false;
  showNegotiateModal = false;
  selectedQuote = null;
  negotiationFeedback = "";
  showDeleteModal = false;
  quoteToDelete = null;
  page = 1;
  pageSize = 5;
  paginatedQuotes = [];
  get draftQuotesCount() {
    return this.quotes?.filter((q) => q?.status === "Draft").length;
  }
  get approvedQuotesCount() {
    return this.quotes?.filter((q) => q?.status === "Approved").length;
  }
  get totalValue() {
    if (!this.quotes || !this.quotes.length) {
      return 0;
    }
    return this.quotes.reduce((acc, q) => {
      return acc + Number(q.total_amount ?? 0);
    }, 0);
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["context"] === "tender" || params["type"] === "tender") {
        this.isTenderContext = true;
        this.pageTitle = "Tender Quotations & Subcontractor Bids";
        this.pageSubtitle = "Competitive supplier and subcontractor quotation register for tender bidding";
      } else {
        this.isTenderContext = false;
        this.pageTitle = "Sales & Procurement Quotations";
        this.pageSubtitle = "Manage and track material & equipment quotes from various vendors";
      }
    });
    this.quotationService.quotes$.subscribe((q) => {
      this.quotes = q.data || [];
      this.page = 1;
      this.updatePagination();
    });
  }
  onSearchChange() {
    this.page = 1;
    this.updatePagination();
  }
  get filteredQuotes() {
    if (!this.searchQuery) {
      return this.quotes;
    }
    const q = this.searchQuery.toLowerCase();
    return this.quotes.filter((quote) => quote.quotation_number?.toLowerCase().includes(q) || quote.sales_person?.toLowerCase().includes(q) || quote.quotation_type?.toLowerCase().includes(q));
  }
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedQuotes = this.filteredQuotes.slice(start, end);
  }
  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }
  get endItem() {
    return Math.min(this.page * this.pageSize, this.filteredQuotes.length);
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  goToPage(p) {
    this.page = p;
    this.updatePagination();
  }
  totalPages() {
    return Math.ceil(this.filteredQuotes.length / this.pageSize);
  }
  getStatusClass(status) {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Draft":
        return "bg-slate-100 text-slate-600";
      case "Sent":
        return "bg-blue-100 text-blue-700";
      case "Negotiating":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  }
  // toggleDropdown(quoteId: string, event: Event) {
  //   event.stopPropagation();
  //   this.activeDropdownId = this.activeDropdownId === quoteId ? null : quoteId;
  // }
  // activeDropdownId: string | null = null;d
  toggleDropdown(id, event) {
    event.stopPropagation();
    if (this.activeDropdownId === id) {
      this.activeDropdownId = null;
    } else {
      this.activeDropdownId = id;
    }
  }
  closeDropdown() {
    this.activeDropdownId = null;
  }
  // --- Actions ---
  openViewModal(quote) {
    this.selectedQuote = quote;
    this.showViewModal = true;
    this.closeDropdown();
  }
  closeViewModal() {
    this.showViewModal = false;
    this.selectedQuote = null;
  }
  openNegotiateModal(quote) {
    this.selectedQuote = quote;
    this.negotiationFeedback = quote.vendorFeedback || "";
    this.showNegotiateModal = true;
    this.activeDropdownId = null;
    this.closeDropdown();
  }
  closeNegotiateModal() {
    this.quotationService.loadQuotes();
    this.showNegotiateModal = false;
    this.selectedQuote = null;
  }
  selectQuoteStatus(status) {
    this.selectedQuote.status = status;
  }
  updateQuoteStatus() {
    if (this.selectedQuote && this.selectedQuote.status == "Draft") {
      this.toast.error("Please select a  status.");
      return;
    }
    if (this.selectedQuote) {
      this.quotationService.updateQuoteStatus(this.selectedQuote.id, this.selectedQuote.status, this.negotiationFeedback).subscribe({
        next: (res) => {
          this.toast.success("Quote status updated successfully");
          this.closeNegotiateModal();
        },
        error: (err) => {
          this.toast.error(err?.error?.message || "Failed to update quote status");
          console.error(err);
        }
      });
    }
  }
  confirmDelete(quote) {
    this.quotationService.deleteQuote(quote.id).subscribe({
      next: () => {
        this.toast.success("Quote deleted successfully");
        this.quotationService.loadQuotes();
        this.closeDropdown();
        this.showDeleteModal = false;
      },
      error: (err) => {
        this.toast.error(err?.error?.message || "Failed to delete quote");
        console.error(err);
      }
    });
  }
  openDeleteModal(quote, event) {
    event.stopPropagation();
    this.quoteToDelete = quote;
    this.showDeleteModal = true;
    this.closeDropdown();
  }
  downloadPdf(quote) {
    this.closeDropdown();
    alert(`Generating PDF for ${quote.quotation_number}...`);
    setTimeout(() => {
      alert(`Format completed. ${quote.quotation_number}.pdf has been prepared for download.`);
    }, 1500);
  }
  static \u0275fac = function Quotations_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Quotations)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Quotations, selectors: [["app-quotations"]], standalone: false, decls: 117, vars: 25, consts: [[1, "bg-slate-50/50", "min-h-screen", "animate-in", "p-4", 3, "click"], [1, "flex", "flex-col", "sm:flex-row", "sm:justify-between", "sm:items-center", "gap-4", "mb-10"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500"], ["routerLink", "/master/resources/quotations/new", 1, "group", "relative", "overflow-hidden", "flex", "items-center", "justify-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "w-full", "sm:w-auto"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "relative", "z-10", "tracking-wide"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-4", "gap-5", "mb-8"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-blue-400", "via-indigo-400", "to-violet-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "absolute", "top-0", "right-0", "w-28", "h-28", "bg-white/10", "rounded-full", "-mr-10", "-mt-10"], [1, "absolute", "bottom-0", "left-0", "w-20", "h-20", "bg-black/5", "rounded-full", "-ml-6", "-mb-6"], [1, "flex", "items-center", "justify-between", "relative", "z-10"], [1, "text-[10px]", "uppercase", "tracking-[0.25em]", "text-white/80", "font-semibold"], [1, "text-3xl", "font-black", "tracking-tight", "mt-2"], [1, "text-xs", "text-white/70", "mt-1"], [1, "w-14", "h-14", "rounded-2xl", "bg-white/20", "backdrop-blur-md", "border", "border-white/20", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[30px]"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-amber-400", "via-orange-400", "to-orange-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-emerald-400", "via-green-400", "to-teal-500", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "group", "relative", "overflow-hidden", "rounded-3xl", "p-5", "bg-gradient-to-br", "from-slate-500", "via-slate-600", "to-slate-700", "text-white", "shadow-lg", "hover:shadow-xl", "hover:-translate-y-1", "transition-all", "duration-300"], [1, "text-2xl", "font-black", "tracking-tight", "mt-2"], [1, "bg-white", "rounded-3xl", "border", "border-slate-200/60", "shadow-sm", "mb-6", "p-4"], [1, "flex", "items-center", "gap-4"], [1, "relative", "flex-1"], [1, "material-symbols-outlined", "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "text", "placeholder", "Search by quote number or salesperson...", 1, "w-full", "pl-12", "pr-4", "py-3", "bg-slate-50", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-primary/20", "transition-all", 3, "ngModelChange", "ngModel"], [1, "bg-gradient-to-br", "from-white", "via-slate-50", "to-primary/5", "rounded-[2rem]", "border", "border-slate-200/60", "shadow-[0_10px_40px_rgba(0,0,0,0.06)]", "overflow-hidden"], [1, "overflow-x-auto", "overflow-y-visible", "custom-scrollbar", "smooth-scroll", "px-2", "pb-24", "relative"], [1, "w-full", "h-auto", "min-w-[1200px]", "border-separate", "border-spacing-y-3", "relative"], [1, "px-8", "py-4", "text-left", "text-[11px]", "font-black", "text-slate-500", "uppercase", "tracking-[0.2em]"], [1, "px-8", "py-4", "text-center", "text-[11px]", "font-black", "text-slate-500", "uppercase", "tracking-[0.2em]"], [1, "px-8", "py-4", "text-right", "text-[11px]", "font-black", "text-slate-500", "uppercase", "tracking-[0.2em]"], [1, "group", "relative", "hover:z-[999]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl", "cursor-default"], [1, "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4", "px-6", "py-5", "bg-slate-50", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2", "flex-wrap", "justify-center"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-primary", "hover:text-white", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "ngClass"], ["title", "Quotation Breakdown", "icon", "request_quote", 3, "closed", "open", "subtitle", "badge", "badgeClass", "showCloseButton"], [1, "p-6", "sm:p-10", "space-y-8"], ["title", "Vendor Approval Hub", "subtitle", "Lifecycle Correction & Feedback", "icon", "approval", "cancelLabel", "Discard Changes", "primaryLabel", "Update", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], ["variant", "danger", "title", "Delete Quotation?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "px-8", "py-6", "rounded-l-3xl", "border-y", "border-l", "border-slate-200", "dark:border-slate-800"], [1, "w-14", "h-14", "rounded-3xl", "bg-gradient-to-br", "from-primary", "via-violet-500", "to-fuchsia-500", "flex", "items-center", "justify-center", "text-white", "shadow-lg", "shadow-primary/20", "group-hover:scale-110", "group-hover:rotate-6", "transition-all", "duration-300"], [1, "material-symbols-outlined", "text-[26px]"], [1, "space-y-1"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-bold", "text-slate-400", "uppercase", "tracking-wider"], [1, "material-symbols-outlined", "text-[14px]"], [1, "px-8", "py-6", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-3"], [1, "w-11", "h-11", "rounded-full", "bg-gradient-to-br", "from-amber-400", "to-orange-500", "flex", "items-center", "justify-center", "text-sm", "font-black", "text-white", "shadow-md"], [1, "text-sm", "font-bold", "text-slate-800", "dark:text-slate-100"], [1, "text-[11px]", "text-slate-400", "font-medium"], [1, "inline-flex", "items-center", "px-4", "py-2", "rounded-full", "bg-violet-100", "text-violet-700", "text-[11px]", "font-black", "uppercase", "tracking-wider", "border", "border-violet-200"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "font-black"], [1, "text-lg", "font-black", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-emerald-500", "font-bold", "uppercase", "tracking-wide"], [1, "flex", "justify-center"], [1, "px-8", "py-6", "text-right", "relative", "rounded-r-3xl", "border-y", "border-r", "border-slate-200", "dark:border-slate-800", "overflow-visible"], [1, "relative", "inline-block"], ["type", "button", "title", "More Options", 1, "relative", "z-20", "w-11", "h-11", "rounded-2xl", "bg-white", "dark:bg-slate-800", "hover:bg-primary", "hover:text-white", "shadow-md", "border", "border-slate-200", "dark:border-slate-700", "text-slate-500", "transition-all", "duration-300", "flex", "items-center", "justify-center", "ml-auto", "hover:scale-110", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined"], ["class", "custom-dropdown-wrapper absolute right-0 top-14 w-56 z-[99999999]", 3, "click", 4, "ngIf"], [1, "custom-dropdown-wrapper", "absolute", "right-0", "top-14", "w-56", "z-[99999999]", 3, "click"], [1, "dropdown-panel", "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-[0_25px_80px_rgba(0,0,0,0.25)]", "border", "border-slate-100", "dark:border-slate-800", "overflow-hidden"], [1, "p-3", "space-y-2", "max-h-72", "overflow-y-auto", "custom-scrollbar", "smooth-scroll"], ["title", "View Details", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:bg-primary/10", "rounded-2xl", "transition-all", "cursor-pointer", 3, "click"], ["title", "Approval Action", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-xs", "font-bold", "rounded-2xl", "transition-all", 3, "click", "disabled", "ngClass"], [1, "h-px", "bg-slate-100", "dark:bg-slate-800", "my-2"], ["title", "Delete Quote", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-xs", "font-bold", "text-red-500", "hover:bg-red-50", "dark:hover:bg-red-500/10", "rounded-2xl", "transition-all", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "click", "ngClass"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "sm:gap-8"], [1, "bg-slate-50", "dark:bg-slate-800/50", "p-6", "rounded-3xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-2"], [1, "font-bold", "text-slate-900", "dark:text-slate-200"], [1, "bg-slate-50", "dark:bg-slate-800/50", "p-6", "rounded-3xl", "border", "border-slate-100", "dark:border-slate-800", "text-left", "sm:text-right"], [1, "text-2xl", "font-black", "text-primary"], [1, "space-y-4"], [1, "text-xs", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400", "px-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-[2rem]", "border", "border-slate-100", "dark:border-slate-800", "overflow-hidden", "shadow-sm", "overflow-x-auto", "custom-scrollbar", "smooth-scroll"], [1, "w-full", "text-left", "min-w-[600px]"], [1, "bg-slate-50", "dark:bg-slate-800/30"], [1, "px-6", "py-4", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "px-6", "py-4", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "text-center"], [1, "px-6", "py-4", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "text-right"], ["class", "border-t border-slate-50 dark:border-slate-800", 4, "ngFor", "ngForOf"], [1, "border-t", "border-slate-50", "dark:border-slate-800"], [1, "px-6", "py-4"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-slate-100"], [1, "text-[10px]", "font-semibold", "text-slate-400", "truncate", "max-w-[200px]"], [1, "px-6", "py-4", "text-center", "font-bold", "text-slate-600", "dark:text-slate-400"], [1, "px-6", "py-4", "text-left", "font-bold", "text-slate-600", "dark:text-slate-400"], [1, "px-6", "py-4", "text-right", "font-black", "text-slate-900", "dark:text-slate-200"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-2", "block", "ml-1"], [1, "grid", "grid-cols-2", "sm:grid-cols-6", "gap-3"], [1, "col-span-1", "sm:col-span-3", "py-4", "rounded-3xl", "border", "text-xs", "font-black", "uppercase", "transition-all", "duration-300", 3, "click", "ngClass"], ["placeholder", "Enter details about price revisions, terms updated, or rejection reason...", "rows", "5", 1, "w-full", "p-6", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-[2rem]", "text-sm", "font-medium", "outline-none", "focus:ring-2", "focus:ring-amber-500/20", "transition-all", "resize-none", "shadow-inner", "custom-scrollbar", "smooth-scroll", 3, "ngModelChange", "ngModel"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"]], template: function Quotations_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function Quotations_Template_div_click_0_listener() {
        return ctx.closeDropdown();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "a", 4);
      \u0275\u0275element(8, "div", 5);
      \u0275\u0275elementStart(9, "div", 6)(10, "span", 7);
      \u0275\u0275text(11, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "span", 8);
      \u0275\u0275text(13, " New Quotation ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 9)(15, "div", 10);
      \u0275\u0275element(16, "div", 11)(17, "div", 12);
      \u0275\u0275elementStart(18, "div", 13)(19, "div")(20, "p", 14);
      \u0275\u0275text(21, " Total Quotes ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "h3", 15);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p", 16);
      \u0275\u0275text(25, " All quotations ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 17)(27, "span", 18);
      \u0275\u0275text(28, " request_quote ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(29, "div", 19);
      \u0275\u0275element(30, "div", 11)(31, "div", 12);
      \u0275\u0275elementStart(32, "div", 13)(33, "div")(34, "p", 14);
      \u0275\u0275text(35, " Drafts ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "h3", 15);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "p", 16);
      \u0275\u0275text(39, " Pending review ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 17)(41, "span", 18);
      \u0275\u0275text(42, " drafts ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(43, "div", 20);
      \u0275\u0275element(44, "div", 11)(45, "div", 12);
      \u0275\u0275elementStart(46, "div", 13)(47, "div")(48, "p", 14);
      \u0275\u0275text(49, " Approved ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "h3", 15);
      \u0275\u0275text(51);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p", 16);
      \u0275\u0275text(53, " Successfully approved ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "div", 17)(55, "span", 18);
      \u0275\u0275text(56, " verified ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(57, "div", 21);
      \u0275\u0275element(58, "div", 11)(59, "div", 12);
      \u0275\u0275elementStart(60, "div", 13)(61, "div")(62, "p", 14);
      \u0275\u0275text(63, " Total Value ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "h3", 22);
      \u0275\u0275text(65);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "p", 16);
      \u0275\u0275text(67, " Quote worth ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "div", 17)(69, "span", 18);
      \u0275\u0275text(70, " payments ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(71, "div", 23)(72, "div", 24)(73, "div", 25)(74, "span", 26);
      \u0275\u0275text(75, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "input", 27);
      \u0275\u0275twoWayListener("ngModelChange", function Quotations_Template_input_ngModelChange_76_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Quotations_Template_input_ngModelChange_76_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(77, "div", 28)(78, "div", 29)(79, "table", 30)(80, "thead")(81, "tr")(82, "th", 31);
      \u0275\u0275text(83, " Quote Details ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "th", 31);
      \u0275\u0275text(85, " Sales Person ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "th", 31);
      \u0275\u0275text(87, " Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "th", 31);
      \u0275\u0275text(89, " Items ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "th", 31);
      \u0275\u0275text(91, " Amount ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "th", 32);
      \u0275\u0275text(93, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "th", 33);
      \u0275\u0275text(95, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(96, "tbody");
      \u0275\u0275repeaterCreate(97, Quotations_For_98_Template, 48, 14, "tr", 34, _forTrack03);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(99, "div", 35)(100, "p", 36);
      \u0275\u0275text(101);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "div", 37)(103, "button", 38);
      \u0275\u0275listener("click", function Quotations_Template_button_click_103_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(104, "span", 39);
      \u0275\u0275text(105, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(106, Quotations_For_107_Template, 2, 2, "button", 40, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(108, "button", 38);
      \u0275\u0275listener("click", function Quotations_Template_button_click_108_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(109, "span", 39);
      \u0275\u0275text(110, " chevron_right ");
      \u0275\u0275elementEnd()()()()()()();
      \u0275\u0275elementStart(111, "app-common-dialog", 41);
      \u0275\u0275listener("closed", function Quotations_Template_app_common_dialog_closed_111_listener() {
        return ctx.closeViewModal();
      });
      \u0275\u0275conditionalCreate(112, Quotations_Conditional_112_Template, 31, 3, "div", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "app-common-dialog", 43);
      \u0275\u0275listener("closed", function Quotations_Template_app_common_dialog_closed_113_listener() {
        return ctx.closeNegotiateModal();
      })("primary", function Quotations_Template_app_common_dialog_primary_113_listener() {
        return ctx.updateQuoteStatus();
      });
      \u0275\u0275conditionalCreate(114, Quotations_Conditional_114_Template, 13, 9, "div", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "app-common-dialog", 44);
      \u0275\u0275listener("closed", function Quotations_Template_app_common_dialog_closed_115_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function Quotations_Template_app_common_dialog_primary_115_listener() {
        return ctx.confirmDelete(ctx.quoteToDelete);
      });
      \u0275\u0275conditionalCreate(116, Quotations_Conditional_116_Template, 6, 1, "div", 45);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.pageTitle);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.pageSubtitle);
      \u0275\u0275advance(17);
      \u0275\u0275textInterpolate1(" ", ctx.quotes.length, " ");
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate1(" ", ctx.draftQuotesCount, " ");
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate1(" ", ctx.approvedQuotesCount, " ");
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate1(" \u20B9", ctx.totalValue.toLocaleString(), " ");
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(21);
      \u0275\u0275repeater(ctx.paginatedQuotes);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredQuotes.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - ", ctx.endItem, " of ", ctx.filteredQuotes.length, " Quotes ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(24, _c03).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showViewModal && !!ctx.selectedQuote)("subtitle", ctx.selectedQuote ? "ID: " + ctx.selectedQuote.quotation_number : "")("badge", (ctx.selectedQuote == null ? null : ctx.selectedQuote.status) || "")("badgeClass", ctx.selectedQuote ? ctx.getStatusClass(ctx.selectedQuote.status) : "")("showCloseButton", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedQuote ? 112 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showNegotiateModal && !!ctx.selectedQuote)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedQuote ? 114 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.quoteToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.quoteToDelete ? 116 : -1);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, RouterLink, DefaultValueAccessor, NgControlStatus, NgModel, CommonDialogComponent, DatePipe], styles: ["\n.custom-scrollbar[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n}\n.custom-dropdown-wrapper[_ngcontent-%COMP%]   .dropdown-panel[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dropdownIn 0.16s ease-out;\n  transform-origin: top;\n}\n@keyframes _ngcontent-%COMP%_dropdownIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n/*# sourceMappingURL=quotations.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Quotations, [{
    type: Component,
    args: [{ selector: "app-quotations", standalone: false, template: `<div (click)="closeDropdown()" class="bg-slate-50/50 min-h-screen animate-in p-4">
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
    <div>
      <h1 class="text-3xl font-black text-slate-800 dark:text-white">{{ pageTitle }}</h1>
      <p class="text-slate-500">{{ pageSubtitle }}</p>
    </div>
    <a routerLink="/master/resources/quotations/new"
      class="group relative overflow-hidden flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] w-full sm:w-auto">

      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
      </div>

      <div
        class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">

        <span class="material-symbols-outlined text-[20px]">
          add
        </span>

      </div>

      <span class="relative z-10 tracking-wide">
        New Quotation
      </span>

    </a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

    <div class="group relative overflow-hidden rounded-3xl p-5
           bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500
           text-white shadow-lg hover:shadow-xl
           hover:-translate-y-1 transition-all duration-300">

      <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

      <div class="flex items-center justify-between relative z-10">

        <div>
          <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
            Total Quotes
          </p>

          <h3 class="text-3xl font-black tracking-tight mt-2">
            {{ quotes.length }}
          </h3>

          <p class="text-xs text-white/70 mt-1">
            All quotations
          </p>
        </div>

        <div class="w-14 h-14 rounded-2xl
               bg-white/20 backdrop-blur-md
               border border-white/20
               flex items-center justify-center">

          <span class="material-symbols-outlined text-[30px]">
            request_quote
          </span>

        </div>

      </div>

    </div>

    <div class="group relative overflow-hidden rounded-3xl p-5
           bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500
           text-white shadow-lg hover:shadow-xl
           hover:-translate-y-1 transition-all duration-300">

      <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

      <div class="flex items-center justify-between relative z-10">

        <div>
          <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
            Drafts
          </p>

          <h3 class="text-3xl font-black tracking-tight mt-2">
            {{ draftQuotesCount }}
          </h3>

          <p class="text-xs text-white/70 mt-1">
            Pending review
          </p>
        </div>

        <div class="w-14 h-14 rounded-2xl
               bg-white/20 backdrop-blur-md
               border border-white/20
               flex items-center justify-center">

          <span class="material-symbols-outlined text-[30px]">
            drafts
          </span>

        </div>

      </div>

    </div>

    <div class="group relative overflow-hidden rounded-3xl p-5
           bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500
           text-white shadow-lg hover:shadow-xl
           hover:-translate-y-1 transition-all duration-300">

      <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

      <div class="flex items-center justify-between relative z-10">

        <div>
          <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
            Approved
          </p>

          <h3 class="text-3xl font-black tracking-tight mt-2">
            {{ approvedQuotesCount }}
          </h3>

          <p class="text-xs text-white/70 mt-1">
            Successfully approved
          </p>
        </div>

        <div class="w-14 h-14 rounded-2xl
               bg-white/20 backdrop-blur-md
               border border-white/20
               flex items-center justify-center">

          <span class="material-symbols-outlined text-[30px]">
            verified
          </span>

        </div>

      </div>

    </div>

    <div class="group relative overflow-hidden rounded-3xl p-5
           bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700
           text-white shadow-lg hover:shadow-xl
           hover:-translate-y-1 transition-all duration-300">

      <div class="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div class="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -ml-6 -mb-6"></div>

      <div class="flex items-center justify-between relative z-10">

        <div>
          <p class="text-[10px] uppercase tracking-[0.25em] text-white/80 font-semibold">
            Total Value
          </p>

          <h3 class="text-2xl font-black tracking-tight mt-2">
            \u20B9{{ totalValue.toLocaleString() }}
          </h3>

          <p class="text-xs text-white/70 mt-1">
            Quote worth
          </p>
        </div>

        <div class="w-14 h-14 rounded-2xl
               bg-white/20 backdrop-blur-md
               border border-white/20
               flex items-center justify-center">

          <span class="material-symbols-outlined text-[30px]">
            payments
          </span>

        </div>

      </div>

    </div>

  </div>

  <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm mb-6 p-4">
    <div class="flex items-center gap-4">
      <div class="relative flex-1">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"
          placeholder="Search by quote number or salesperson..."
          class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all">
      </div>
    </div>
  </div>

  <div
    class="bg-gradient-to-br from-white via-slate-50 to-primary/5 rounded-[2rem] border border-slate-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">

    <div class="overflow-x-auto overflow-y-visible custom-scrollbar smooth-scroll px-2 pb-24 relative">

      <table class="w-full h-auto min-w-[1200px] border-separate border-spacing-y-3 relative">

        <thead>
          <tr>

            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Quote Details
            </th>

            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Sales Person
            </th>

            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Type
            </th>

            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Items
            </th>

            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Amount
            </th>

            <th class="px-8 py-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Status
            </th>

            <th class="px-8 py-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>
          @for (quote of paginatedQuotes; track quote.id) {

          <tr
            class="group relative hover:z-[999] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl cursor-default">

            <td class="px-8 py-6 rounded-l-3xl border-y border-l border-slate-200 dark:border-slate-800">

              <div class="flex items-center gap-4">

                <div
                  class="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary via-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">

                  <span class="material-symbols-outlined text-[26px]">
                    description
                  </span>

                </div>

                <div class="space-y-1">

                  <p
                    class="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">

                    {{quote.quotation_number}}

                  </p>

                  <div
                    class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">

                    <span class="material-symbols-outlined text-[14px]">
                      calendar_month
                    </span>

                    {{quote.date | date:'mediumDate'}}

                  </div>

                </div>

              </div>

            </td>

            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">

              <div class="flex items-center gap-3">

                <div
                  class="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-black text-white shadow-md">

                  {{ (quote.sales_person || "?").charAt(0) }}

                </div>

                <div>

                  <p class="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {{quote.sales_person}}
                  </p>

                  <p class="text-[11px] text-slate-400 font-medium">
                    Sales Executive
                  </p>

                </div>

              </div>

            </td>

            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">

              <span
                class="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-[11px] font-black uppercase tracking-wider border border-violet-200">

                {{quote.quotation_type}}

              </span>

            </td>

            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">

              <div
                class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">

                <span class="material-symbols-outlined text-[18px]">
                  inventory_2
                </span>

                <span class="text-sm font-black">
                  {{quote.items.length}}
                </span>

              </div>

            </td>

            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">

              <div>

                <p class="text-lg font-black text-slate-900 dark:text-white">
                  \u20B9{{quote.total_amount.toLocaleString()}}
                </p>

                <p class="text-[11px] text-emerald-500 font-bold uppercase tracking-wide">
                  Total Value
                </p>

              </div>

            </td>

            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">

              <div class="flex justify-center">

                <span
                  [class]="'px-5 py-2 rounded-full text-[11px] font-black tracking-[0.15em] uppercase shadow-sm border ' + getStatusClass(quote.status)">

                  {{quote.status}}

                </span>

              </div>

            </td>

            <td
              class="px-8 py-6 text-right relative rounded-r-3xl border-y border-r border-slate-200 dark:border-slate-800 overflow-visible">

              <div class="relative inline-block">
                <button type="button" (click)="toggleDropdown(quote.id, $event)" title="More Options"
                  class="relative z-20 w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 hover:bg-primary hover:text-white shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 transition-all duration-300 flex items-center justify-center ml-auto hover:scale-110 cursor-pointer">

                  <span class="material-symbols-outlined">
                    more_vert
                  </span>

                </button>

                <div *ngIf="activeDropdownId === quote.id" (click)="$event.stopPropagation()"
                  class="custom-dropdown-wrapper absolute right-0 top-14 w-56 z-[99999999]">

                  <div
                    class="dropdown-panel bg-white dark:bg-slate-900 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] border border-slate-100 dark:border-slate-800 overflow-hidden">

                    <div class="p-3 space-y-2 max-h-72 overflow-y-auto custom-scrollbar smooth-scroll">
                      <button (click)="openViewModal(quote)" title="View Details"
                        class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/10 rounded-2xl transition-all cursor-pointer">

                        <span class="material-symbols-outlined text-[18px]">
                          visibility
                        </span>

                        View Details

                      </button>

                      <button [disabled]="quote.status == 'Approved'" (click)="openNegotiateModal(quote)"
                        title="Approval Action"
                        class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-2xl transition-all"
                        [ngClass]="{
                      'text-gray-400 bg-gray-100 cursor-not-allowed opacity-60':
                      quote.status == 'Approved',

                      'text-amber-600 hover:bg-amber-50 cursor-pointer':
                      quote.status != 'Approved'
                    }">

                        <span class="material-symbols-outlined text-[18px]">
                          handshake
                        </span>

                        Approval Action

                      </button>

                      <div class="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                      <button (click)="openDeleteModal(quote, $event)" title="Delete Quote"
                        class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all cursor-pointer">

                        <span class="material-symbols-outlined text-[18px]">
                          block
                        </span>

                        Delete Quote

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </td>

          </tr>

          }
        </tbody>

      </table>
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-500"> Showing {{ filteredQuotes.length ? ((page
          - 1) * pageSize) + 1 : 0 }} - {{endItem}} of {{ filteredQuotes.length}} Quotes </p>

        <div class="flex items-center gap-2 flex-wrap justify-center"> <!-- Prev --> <button (click)="prevPage()"
            class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[18px]"> chevron_left </span> </button> <!-- Numbers --> @for (p
          of [].constructor(totalPages()); track $index) { <button (click)="goToPage($index + 1)"
            class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer"
            [ngClass]="page === ($index + 1) ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'">
            {{ $index + 1 }} </button> } <!-- Next --> <button (click)="nextPage()"
            class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[18px]"> chevron_right </span> </button> </div>
      </div>
    </div>
  </div>
</div>


<app-common-dialog [open]="showViewModal && !!selectedQuote" title="Quotation Breakdown"
  [subtitle]="selectedQuote ? 'ID: ' + selectedQuote.quotation_number : ''" [badge]="selectedQuote?.status || ''"
  [badgeClass]="selectedQuote ? getStatusClass(selectedQuote.status) : ''" icon="request_quote" [showCloseButton]="true"
  (closed)="closeViewModal()">
  @if (selectedQuote) {
  <div class="p-6 sm:p-10 space-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
      <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
        <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Originating Member</p>
        <p class="font-bold text-slate-900 dark:text-slate-200">{{ selectedQuote.sales_person }}</p>
      </div>
      <div
        class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-left sm:text-right">
        <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Grand Total</p>
        <p class="text-2xl font-black text-primary">\u20B9{{ selectedQuote.total_amount.toLocaleString() }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-4">Allocated Items</h4>
      <div
        class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm overflow-x-auto custom-scrollbar smooth-scroll">
        <table class="w-full text-left min-w-[600px]">
          <thead class="bg-slate-50 dark:bg-slate-800/30">
            <tr>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Material</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Qty
              </th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Unit
                Price
              </th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of selectedQuote.items" class="border-t border-slate-50 dark:border-slate-800">
              <td class="px-6 py-4">
                <p class="text-sm font-bold text-slate-900 dark:text-slate-100">{{ item.name }}</p>
                <p class="text-[10px] font-semibold text-slate-400 truncate max-w-[200px]">Vendor: {{ item.vendor_name
                  }}</p>
              </td>
              <td class="px-6 py-4 text-center font-bold text-slate-600 dark:text-slate-400">{{ item.quantity }}</td>
              <td class="px-6 py-4 text-left font-bold text-slate-600 dark:text-slate-400">{{ item.category }}</td>
              <td class="px-6 py-4 text-right font-black text-slate-900 dark:text-slate-200">\u20B9{{
                item.unitPrice.toLocaleString() }}</td>
              <td class="px-6 py-4 text-right font-black text-slate-900 dark:text-slate-200">\u20B9{{
                item.totalPrice.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  }
</app-common-dialog>

<app-common-dialog [open]="showNegotiateModal && !!selectedQuote" title="Vendor Approval Hub"
  subtitle="Lifecycle Correction & Feedback" icon="approval" [showCloseButton]="true" [showFooter]="true"
  cancelLabel="Discard Changes" primaryLabel="Update" (closed)="closeNegotiateModal()" (primary)="updateQuoteStatus()">
  @if (selectedQuote) {

  <div class="p-6 sm:p-10 space-y-8">
    <div>
      <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Current Status
        Profile</label>
      <div class="grid grid-cols-2 sm:grid-cols-6 gap-3">

        <button (click)="selectQuoteStatus('Approved')" [ngClass]="{
    'bg-green-600 text-white border-green-600 shadow-lg': selectedQuote.status === 'Approved',
    'bg-white text-green-600 hover:bg-green-50': selectedQuote.status !== 'Approved'
  }" class="col-span-1 sm:col-span-3 py-4 rounded-3xl border text-xs font-black uppercase transition-all duration-300">

          Approve
        </button>

        <button (click)="selectQuoteStatus('Rejected')" [ngClass]="{
    'bg-red-600 text-white border-red-600 shadow-lg': selectedQuote.status === 'Rejected',
    'bg-white text-red-600 hover:bg-red-50': selectedQuote.status !== 'Rejected'
  }" class="col-span-1 sm:col-span-3 py-4 rounded-3xl border text-xs font-black uppercase transition-all duration-300">

          Reject
        </button>

      </div>
    </div>

    <div>
      <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Vendor Feedback &
        Log</label>
      <textarea [(ngModel)]="negotiationFeedback"
        placeholder="Enter details about price revisions, terms updated, or rejection reason..." rows="5"
        class="w-full p-6 bg-slate-50 dark:bg-slate-800 border-none rounded-[2rem] text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none shadow-inner custom-scrollbar smooth-scroll"></textarea>
    </div>
  </div>

  }
</app-common-dialog>

<app-common-dialog [open]="showDeleteModal && !!quoteToDelete" variant="danger" title="Delete Quotation?"
  subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"
  cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="showDeleteModal = false"
  (primary)="confirmDelete(quoteToDelete!)">
  @if (quoteToDelete) {
  <div class="p-8 text-center">
    <p class="text-outline text-sm font-medium">Are you sure you want to remove <span
        class="text-on-surface font-black">"{{ quoteToDelete.quotation_number }}"</span>? This action cannot be undone.
    </p>
  </div>
  }
</app-common-dialog>`, styles: ["/* src/app/modules/resources/quotations/quotations.scss */\n.custom-scrollbar {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 77, 255, 0.35) transparent;\n  scroll-behavior: smooth;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background-color: rgba(124, 77, 255, 0.35);\n  border-radius: 999px;\n  transition: background-color 0.2s ease;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(124, 77, 255, 0.6);\n}\n.smooth-scroll {\n  scroll-behavior: smooth;\n}\n.custom-dropdown-wrapper .dropdown-panel {\n  animation: dropdownIn 0.16s ease-out;\n  transform-origin: top;\n}\n@keyframes dropdownIn {\n  from {\n    opacity: 0;\n    transform: translateY(-6px) scaleY(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scaleY(1);\n  }\n}\n/*# sourceMappingURL=quotations.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Quotations, { className: "Quotations", filePath: "app/modules/resources/quotations/quotations.ts", lineNumber: 14 });
})();

// src/app/modules/resources/new-quotations/new-quotations.ts
function NewQuotations_div_28_div_9_button_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function NewQuotations_div_28_div_9_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function NewQuotations_div_28_div_9_button_3_Template_button_click_0_listener() {
      const opt_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectType(opt_r4.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, NewQuotations_div_28_div_9_button_3_span_2_Template, 2, 0, "span", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r1.selectedType === opt_r4.value ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r4.label, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedType === opt_r4.value);
  }
}
function NewQuotations_div_28_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "div", 27);
    \u0275\u0275template(3, NewQuotations_div_28_div_9_button_3_Template, 3, 3, "button", 28);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.typeOptions);
  }
}
function NewQuotations_div_28_div_15_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "span", 55);
    \u0275\u0275text(2, " done ");
    \u0275\u0275elementEnd()();
  }
}
function NewQuotations_div_28_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("click", function NewQuotations_div_28_div_15_Template_div_click_0_listener() {
      const mat_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMaterial(mat_r6.sku));
    });
    \u0275\u0275element(1, "div", 33)(2, "div", 34)(3, "div");
    \u0275\u0275elementStart(4, "div", 35);
    \u0275\u0275template(5, NewQuotations_div_28_div_15_div_5_Template, 3, 0, "div", 36);
    \u0275\u0275elementStart(6, "div", 37)(7, "div");
    \u0275\u0275element(8, "div", 38);
    \u0275\u0275elementStart(9, "span", 39);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 40)(12, "h3", 41);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 42)(15, "span", 43);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "span", 44);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 45)(19, "div", 46)(20, "div")(21, "p", 47);
    \u0275\u0275text(22, " Unit Cost ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 48)(24, "span", 49);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 50)(27, "p", 51);
    \u0275\u0275text(28, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 52);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(31, "div")(32, "span", 53);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const mat_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("group relative overflow-hidden rounded-[32px] cursor-pointer transition-all duration-500 border " + (ctx_r1.selectedMaterials.has(mat_r6.sku) ? "border-primary/30 bg-gradient-to-br from-primary/10 via-white to-indigo-50 dark:from-primary/20 dark:via-slate-900 dark:to-slate-950 shadow-[0_25px_60px_rgba(99,102,241,0.22)] scale-[1.02]" : "border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("h-1.5 w-full transition-all duration-500 " + (ctx_r1.selectedMaterials.has(mat_r6.sku) ? "bg-gradient-to-r from-primary via-indigo-500 to-violet-500" : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-primary/60 group-hover:via-indigo-400 group-hover:to-violet-400"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.selectedMaterials.has(mat_r6.sku));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("relative w-16 h-16 rounded-[22px] flex items-center justify-center\n             transition-all duration-500 overflow-hidden " + (ctx_r1.selectedMaterials.has(mat_r6.sku) ? "bg-gradient-to-br from-primary to-indigo-600 text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)] rotate-3 scale-105" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:scale-110 group-hover:rotate-3"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", mat_r6.icon || "inventory_2", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", mat_r6.name, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", mat_r6.category, " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" \u20B9", mat_r6.cost, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", mat_r6.sku, " ");
    \u0275\u0275advance();
    \u0275\u0275classMap("mt-5 w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-black transition-all duration-300 " + (ctx_r1.selectedMaterials.has(mat_r6.sku) ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-primary/10 group-hover:text-primary"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedMaterials.has(mat_r6.sku) ? "check_circle" : "add_circle", " ");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedMaterials.has(mat_r6.sku) ? "Selected" : "Select " + (ctx_r1.selectedType === "MATERIAL" ? "Material" : "Equipment"), " ");
  }
}
function NewQuotations_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14);
    \u0275\u0275listener("click", function NewQuotations_div_28_Template_div_click_3_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(4, "button", 15);
    \u0275\u0275listener("click", function NewQuotations_div_28_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleTypeDropdown());
    });
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 16);
    \u0275\u0275text(8, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, NewQuotations_div_28_div_9_Template, 4, 1, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 18)(11, "span", 19);
    \u0275\u0275text(12, " search ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function NewQuotations_div_28_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.searchQuery, $event) || (ctx_r1.searchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function NewQuotations_div_28_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filterResources());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 21);
    \u0275\u0275template(15, NewQuotations_div_28_div_15_Template, 35, 16, "div", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 23)(17, "button", 24);
    \u0275\u0275listener("click", function NewQuotations_div_28_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(18, " Continue to Vendors ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.typeDropdownOpen ? "ring-2 ring-primary/30 border-primary/40 bg-white" : "border-transparent hover:border-slate-200");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedType === "MATERIAL" ? "Material" : "Equipment");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.typeDropdownOpen ? "rotate-180" : "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.typeDropdownOpen);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.searchQuery);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.filteredMaterials);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("px-8 py-3 rounded-2xl font-bold text-white transition-all shadow-lg " + (ctx_r1.selectedMaterials.size > 0 ? "bg-primary shadow-primary/20 hover:-translate-y-0.5" : "bg-slate-300 opacity-50 cursor-not-allowed"));
    \u0275\u0275property("disabled", ctx_r1.selectedMaterials.size === 0);
  }
}
function NewQuotations_div_29_tr_18_div_13_button_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 91);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function NewQuotations_div_29_tr_18_div_13_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 89);
    \u0275\u0275listener("click", function NewQuotations_div_29_tr_18_div_13_button_3_Template_button_click_0_listener() {
      const vendor_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const item_r12 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectVendor(item_r12, vendor_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, NewQuotations_div_29_tr_18_div_13_button_3_span_2_Template, 2, 0, "span", 90);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r11 = ctx.$implicit;
    const item_r12 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("ngClass", item_r12.vendorId === vendor_r11.id ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r11.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r12.vendorId === vendor_r11.id);
  }
}
function NewQuotations_div_29_tr_18_div_13_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 92);
    \u0275\u0275text(1, "No vendors found ");
    \u0275\u0275elementEnd();
  }
}
function NewQuotations_div_29_tr_18_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85)(1, "div", 26)(2, "div", 86);
    \u0275\u0275template(3, NewQuotations_div_29_tr_18_div_13_button_3_Template, 3, 3, "button", 87)(4, NewQuotations_div_29_tr_18_div_13_p_4_Template, 2, 0, "p", 88);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.vendors);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.vendors.length);
  }
}
function NewQuotations_div_29_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 71)(1, "td", 72)(2, "div", 73);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 72)(7, "div", 75);
    \u0275\u0275listener("click", function NewQuotations_div_29_tr_18_Template_div_click_7_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(8, "button", 76);
    \u0275\u0275listener("click", function NewQuotations_div_29_tr_18_Template_button_click_8_listener() {
      const i_r9 = \u0275\u0275restoreView(_r8).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleVendorDropdown(i_r9));
    });
    \u0275\u0275elementStart(9, "span", 77);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 78);
    \u0275\u0275text(12, "expand_more");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, NewQuotations_div_29_tr_18_div_13_Template, 5, 2, "div", 79);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 72)(15, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function NewQuotations_div_29_tr_18_Template_input_ngModelChange_15_listener($event) {
      const item_r12 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r12.quantity, $event) || (item_r12.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function NewQuotations_div_29_tr_18_Template_input_input_15_listener($event) {
      const item_r12 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkQuantity(item_r12, $event));
    })("ngModelChange", function NewQuotations_div_29_tr_18_Template_input_ngModelChange_15_listener() {
      const item_r12 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateLineTotal(item_r12));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 72)(17, "div", 73);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 81)(20, "div", 82);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td", 83)(23, "button", 84);
    \u0275\u0275listener("click", function NewQuotations_div_29_tr_18_Template_button_click_23_listener() {
      const i_r9 = \u0275\u0275restoreView(_r8).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeQuoteItem(i_r9));
    });
    \u0275\u0275elementStart(24, "span", 3);
    \u0275\u0275text(25, " delete ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r12.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r12.materialSku, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.openVendorDropdownIndex === i_r9 ? "ring-2 ring-primary/30 bg-white" : "hover:bg-slate-100");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", item_r12.vendor_name ? "text-slate-700" : "text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r12.vendor_name || "Select Vendor...", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.openVendorDropdownIndex === i_r9 ? "rotate-180" : "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.openVendorDropdownIndex === i_r9);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r12.quantity);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", item_r12.unitPrice.toLocaleString(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", item_r12.totalPrice.toLocaleString(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.quoteItems.length === 1);
  }
}
function NewQuotations_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 56)(2, "table", 57)(3, "thead", 58)(4, "tr")(5, "th", 59);
    \u0275\u0275text(6, " Material ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 59);
    \u0275\u0275text(8, " Select Vendor ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 59);
    \u0275\u0275text(10, " Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 59);
    \u0275\u0275text(12, " Unit Price ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 60);
    \u0275\u0275text(14, " Total ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 61);
    \u0275\u0275text(16, " Action ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, NewQuotations_div_29_tr_18_Template, 26, 11, "tr", 62);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 63)(20, "button", 64);
    \u0275\u0275listener("click", function NewQuotations_div_29_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(21, "span", 65);
    \u0275\u0275text(22, " west ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, " Previous Step ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 66)(26, "div", 67)(27, "p", 68);
    \u0275\u0275text(28, " Grand Total ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "h2", 69);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "button", 70);
    \u0275\u0275listener("click", function NewQuotations_div_29_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(32, " Review Quote ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r1.quoteItems);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" \u20B9", ctx_r1.totalAmount.toLocaleString(), " ");
  }
}
function NewQuotations_div_30_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110)(1, "div")(2, "p", 73);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 111)(5, "span", 112);
    \u0275\u0275text(6, " local_shipping ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 113);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 99)(10, "p", 82);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 114);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", item_r14.name, " (x", item_r14.quantity, ") ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", item_r14.vendor_name || "No Vendor Selected", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", item_r14.totalPrice.toLocaleString(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" @ \u20B9", item_r14.unitPrice.toLocaleString(), "/unit ");
  }
}
function NewQuotations_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 93)(1, "div", 94);
    \u0275\u0275element(2, "div", 95);
    \u0275\u0275elementStart(3, "div", 96)(4, "div")(5, "div", 97);
    \u0275\u0275text(6, " Draft Quotation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2", 98);
    \u0275\u0275text(8, "Summary");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 99)(10, "p", 100);
    \u0275\u0275text(11, "Generated On");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 101);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 102)(16, "div", 103)(17, "h3", 104);
    \u0275\u0275text(18, " Item Breakdown ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 105);
    \u0275\u0275template(20, NewQuotations_div_30_div_20_Template, 14, 5, "div", 106);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 107)(22, "button", 64);
    \u0275\u0275listener("click", function NewQuotations_div_30_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(23, "span", 65);
    \u0275\u0275text(24, " west ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, " Make Changes ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 108)(28, "p", 68);
    \u0275\u0275text(29, " Grand Total ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "h2", 69);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 109);
    \u0275\u0275listener("click", function NewQuotations_div_30_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitQuote());
    });
    \u0275\u0275elementStart(33, "span", 53);
    \u0275\u0275text(34, " send ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, " Save Quote ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 3, ctx_r1.today, "MMM dd, yyyy"));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.quoteItems);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" \u20B9", ctx_r1.totalAmount.toLocaleString(), " ");
  }
}
var NewQuotations = class _NewQuotations {
  materialService = inject(MaterialMasterService);
  equipmentService = inject(Equipment);
  vendorService = inject(VendorsServices);
  quotationService = inject(QuotationService);
  toast = inject(ToastrService);
  router = inject(Router);
  currentStep = 1;
  materials = [];
  equipments = [];
  vendors = [];
  today = /* @__PURE__ */ new Date();
  searchQuery = "";
  selectedMaterials = /* @__PURE__ */ new Set();
  quoteItems = [];
  selectedVendor;
  selectedType = "MATERIAL";
  filteredMaterialsTab = [];
  typeDropdownOpen = false;
  typeOptions = [
    { label: "Material", value: "MATERIAL" },
    { label: "Equipment", value: "EQUIPMENT" }
  ];
  openVendorDropdownIndex = null;
  toggleTypeDropdown() {
    this.typeDropdownOpen = !this.typeDropdownOpen;
    this.openVendorDropdownIndex = null;
  }
  selectType(value) {
    this.selectedType = value;
    this.typeDropdownOpen = false;
    this.onTypeChange();
  }
  toggleVendorDropdown(index) {
    this.openVendorDropdownIndex = this.openVendorDropdownIndex === index ? null : index;
    this.typeDropdownOpen = false;
  }
  selectVendor(item, vendor) {
    item.vendorId = vendor.id;
    item.vendor_name = vendor.name;
    this.selectedVendor = vendor;
    this.openVendorDropdownIndex = null;
  }
  closeAllDropdowns() {
    this.typeDropdownOpen = false;
    this.openVendorDropdownIndex = null;
  }
  onTypeChange() {
    this.searchQuery = "";
    this.loadResourcesByType();
  }
  filterResources() {
    const query = this.searchQuery.toLowerCase().trim();
    if (this.selectedType === "MATERIAL") {
      this.filteredMaterialsTab = this.materials.filter((mat) => mat.name?.toLowerCase().includes(query) || mat.category?.toLowerCase().includes(query) || mat.sku?.toLowerCase().includes(query));
    } else {
      this.filteredMaterialsTab = this.equipments.filter((eq) => eq.name?.toLowerCase().includes(query) || eq.category?.toLowerCase().includes(query) || eq.sku?.toLowerCase().includes(query));
    }
  }
  checkQuantity(item, event) {
    let value = Number(event.target.value);
    if (value > 1e3) {
      value = 1e3;
    }
    if (value < 0) {
      value = 0;
    }
    item.quantity = value || 0;
    event.target.value = value || 0;
  }
  ngOnInit() {
    this.loadResourcesByType();
    this.vendorService.vendors$.subscribe((v) => {
      this.vendors = v;
    });
  }
  loadResourcesByType() {
    if (this.selectedType === "MATERIAL") {
      this.materialService.loadMaterials();
      this.materialService.materials$.subscribe((res) => {
        this.materials = res || [];
        this.filteredMaterialsTab = [...this.materials];
      });
    } else {
      this.equipmentService.loadMaterials();
      this.equipmentService.materials$.subscribe((res) => {
        this.equipments = res || [];
        this.filteredMaterialsTab = [...this.equipments];
      });
    }
  }
  get filteredMaterials() {
    return this.filteredMaterialsTab;
  }
  toggleMaterial(sku) {
    console.log(sku, "sku fdfgdfgffhfg");
    if (this.selectedMaterials.has(sku)) {
      this.selectedMaterials.delete(sku);
    } else {
      this.selectedMaterials.add(sku);
    }
  }
  nextStep() {
    if (this.currentStep === 1) {
      if (this.selectedMaterials.size === 0) {
        this.toast.error("Please select at least one item");
        return;
      }
      this.prepareQuoteItems();
    }
    if (this.currentStep === 2) {
      const missingVendor = this.quoteItems.find((item) => !item.vendorId);
      if (missingVendor) {
        this.toast.error(`Please select vendor for ${missingVendor.name}`);
        return;
      }
      const invalidQty = this.quoteItems.find((item) => !item.quantity || item.quantity <= 0);
      if (invalidQty) {
        this.toast.error(`Please enter valid quantity for ${invalidQty.name}`);
        return;
      }
    }
    this.currentStep++;
  }
  prevStep() {
    this.currentStep--;
  }
  prepareQuoteItems() {
    console.log(this.quoteItems, "this.quoteItems");
    const source = this.selectedType === "MATERIAL" ? this.materials : this.equipments;
    this.quoteItems = Array.from(this.selectedMaterials).map((sku) => {
      const mat = source.find((m) => m.sku === sku);
      console.log(mat, "mat");
      const defaultVendor = null;
      const cost = Number((mat?.cost || "0").toString().replace(/₹/g, "").replace(/,/g, "").trim());
      return {
        materialSku: sku,
        name: mat?.name || "",
        quantity: 1,
        unitPrice: cost || 0,
        totalPrice: cost || 0,
        vendorId: defaultVendor?.id ?? null,
        vendor_name: defaultVendor?.name ?? null,
        category: mat?.category || "",
        id: mat?.id || null,
        status: this.selectedType,
        material_master_id: this.selectedType === "MATERIAL" ? mat?.id : null,
        equipment_master_id: this.selectedType === "EQUIPMENT" ? mat?.id : null
      };
    });
  }
  updateLineTotal(item) {
    item.totalPrice = item.quantity * item.unitPrice;
  }
  get totalAmount() {
    return this.quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }
  onVendorChange(item, event) {
    const vendorId = event.target.value;
    const vendor = this.vendors.find((v) => v.id.toString() === vendorId.toString());
    if (vendor) {
      item.vendorId = vendor.id;
      item.vendor_name = vendor.name;
      this.selectedVendor = vendor;
    }
  }
  submitQuote() {
    if (!this.selectedVendor) {
      this.toast.error("Please select vendor");
      return;
    }
    if (!this.quoteItems || this.quoteItems.length === 0) {
      this.toast.error("Please add items");
      return;
    }
    const invalidQty = this.quoteItems.some((item) => !item.quantity || item.quantity <= 0);
    if (invalidQty) {
      this.toast.error("Please enter valid quantity");
      return;
    }
    console.log(this.quoteItems, "this.quoteItems");
    const payload = {
      date: (/* @__PURE__ */ new Date()).toLocaleString("sv-SE").replace("T", " "),
      sales_person: this.selectedVendor?.name || "",
      vendor_feedback: "",
      quotation_status: "Sent",
      quotation_type: this.selectedType,
      status: "Draft",
      items: this.quoteItems.map((item) => ({
        sku: item.materialSku || "",
        name: item.name || "",
        category: item.category || "",
        quantity: Number(item.quantity) || 0,
        unitPrice: Number(item.unitPrice || item.price) || 0,
        totalPrice: (Number(item.quantity) || 0) * (Number(item.unitPrice || item.price) || 0),
        vendor_id: item.vendorId || this.selectedVendor?.id || null,
        vendor_name: item.vendor_name || this.selectedVendor?.name || "",
        status: item.status || this.selectedType,
        material_master_id: item.material_master_id || null,
        equipment_master_id: item.equipment_master_id || null
      }))
    };
    this.quotationService.addQuote(payload).subscribe({
      next: (res) => {
        this.toast.success("Quotation submitted successfully!");
        this.router.navigate(["/master/resources/quotations"]);
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to submit quotation");
      }
    });
  }
  removeQuoteItem(index) {
    this.quoteItems.splice(index, 1);
    ;
  }
  static \u0275fac = function NewQuotations_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NewQuotations)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewQuotations, selectors: [["app-new-quotations"]], standalone: false, decls: 31, vars: 15, consts: [[1, "bg-slate-50/50", "animate-in", 3, "click"], [1, "flex", "flex-col", "lg:flex-row", "justify-between", "lg:items-center", "gap-4", "mb-8"], ["routerLink", "/master/resources/quotations", 1, "group", "inline-flex", "items-center", "gap-2.5", "px-4", "py-2", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "text-slate-600", "dark:text-slate-400", "hover:text-primary", "hover:border-primary/30", "hover:bg-primary/5", "hover:-translate-x-1", "transition-all", "shadow-sm", "mb-4"], [1, "material-symbols-outlined", "text-[20px]"], [1, "text-xs", "font-black", "uppercase", "tracking-widest"], [1, "text-2xl", "sm:text-4xl", "font-black", "tracking-tight", "text-slate-900", "border-l-4", "border-primary", "pl-6", "py-1"], [1, "flex", "items-center", "gap-4", "bg-white", "px-6", "py-3", "rounded-2xl", "border", "border-slate-200/60", "shadow-sm", "overflow-x-auto", "custom-scrollbar", "smooth-scroll"], [1, "text-sm", "font-bold"], [1, "w-8", "h-px", "bg-slate-200", "shrink-0"], ["class", "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20", 4, "ngIf"], ["class", " mx-auto animate-in fade-in zoom-in-95 duration-500 mb-20", 4, "ngIf"], [1, "space-y-6", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500", "mb-20"], [1, "bg-white", "rounded-3xl", "border", "border-slate-200/60", "shadow-sm", "p-4", "sm:p-6"], [1, "flex", "flex-col", "sm:flex-row", "items-stretch", "sm:items-center", "gap-4", "mb-6"], [1, "relative", "w-full", "sm:w-1/2", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "px-4", "py-3", "bg-slate-50", "border", "rounded-2xl", "text-sm", "font-semibold", "text-slate-700", "transition-all", 3, "click", "ngClass"], [1, "material-symbols-outlined", "text-slate-400", "transition-transform", "duration-200", 3, "ngClass"], ["class", "custom-dropdown-wrapper absolute left-0 right-0 top-[calc(100%+8px)] z-50", 4, "ngIf"], [1, "relative", "w-full", "sm:w-1/2"], [1, "material-symbols-outlined", "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "text", "placeholder", "Search materials or equipments...", 1, "w-full", "pl-12", "pr-4", "py-3", "bg-slate-50", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-primary/20", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-3", "gap-6"], [3, "class", "click", 4, "ngFor", "ngForOf"], [1, "fixed", "bottom-0", "left-0", "lg:left-66", "right-0", "z-50", "flex", "justify-end", "gap-4", "p-4", "bg-white", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [3, "click", "disabled"], [1, "custom-dropdown-wrapper", "absolute", "left-0", "right-0", "top-[calc(100%+8px)]", "z-50"], [1, "dropdown-panel", "bg-white", "rounded-2xl", "shadow-[0_20px_50px_rgba(0,0,0,0.12)]", "border", "border-slate-100", "overflow-hidden"], [1, "max-h-60", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "py-2"], ["type", "button", "class", "w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center justify-between", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-3", "text-sm", "font-semibold", "transition-all", "flex", "items-center", "justify-between", 3, "click", "ngClass"], ["class", "material-symbols-outlined text-[18px] text-primary", 4, "ngIf"], [1, "material-symbols-outlined", "text-[18px]", "text-primary"], [3, "click"], [1, "absolute", "inset-0", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-700", "bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_45%)]"], [1, "absolute", "inset-0", "rounded-[32px]", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-500", "border", "border-primary/10"], [1, "relative", "p-6"], ["class", "absolute top-5 right-5 w-9 h-9 rounded-2xl\n               bg-gradient-to-br from-primary to-indigo-600\n               text-white flex items-center justify-center\n               shadow-[0_10px_25px_rgba(99,102,241,0.35)]\n               animate-in zoom-in-50 duration-300", 4, "ngIf"], [1, "flex", "items-start", "gap-4", "mb-6"], [1, "absolute", "inset-0", "bg-gradient-to-tr", "from-white/20", "to-transparent"], [1, "material-symbols-outlined", "text-[28px]", "relative", "z-10"], [1, "flex-1", "min-w-0", "pt-1"], [1, "text-[17px]", "font-black", "tracking-tight", "text-slate-900", "dark:text-white", "leading-tight", "line-clamp-2"], [1, "flex", "items-center", "gap-2", "mt-3"], [1, "px-3", "py-1", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-800/40", "p-4"], [1, "flex", "items-center", "justify-between"], [1, "text-[10px]", "uppercase", "tracking-[0.25em]", "font-black", "text-slate-400", "mb-1.5"], [1, "flex", "items-end", "gap-1"], [1, "text-3xl", "font-black", "tracking-tight", "text-slate-900", "dark:text-white"], [1, "text-right"], [1, "text-[9px]", "uppercase", "tracking-[0.22em]", "font-black", "text-slate-400", "mb-1.5"], [1, "px-3", "py-1.5", "rounded-xl", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "text-[11px]", "font-bold", "text-slate-600", "dark:text-slate-300", "shadow-sm"], [1, "material-symbols-outlined", "text-[18px]"], [1, "absolute", "top-5", "right-5", "w-9", "h-9", "rounded-2xl", "bg-gradient-to-br", "from-primary", "to-indigo-600", "text-white", "flex", "items-center", "justify-center", "shadow-[0_10px_25px_rgba(99,102,241,0.35)]", "animate-in", "zoom-in-50", "duration-300"], [1, "material-symbols-outlined", "text-[18px]", "font-bold"], [1, "bg-white", "rounded-3xl", "border", "border-slate-200/60", "shadow-sm"], [1, "w-full", "text-left", "border-collapse"], [1, "bg-slate-50/50"], [1, "px-8", "py-5", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest"], [1, "px-8", "py-5", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "text-right"], [1, "px-6", "py-5", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "text-center"], ["class", "border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-all", 4, "ngFor", "ngForOf"], [1, "fixed", "bottom-0", "left-0", "lg:left-66", "right-0", "z-50", "flex", "flex-col", "sm:flex-row", "justify-end", "gap-4", "p-4", "bg-white", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "px-8", "py-4", "rounded-2xl", "font-black", "uppercase", "tracking-widest", "text-slate-400", "hover:text-slate-900", "hover:bg-slate-100", "transition-all", "flex", "items-center", "justify-center", "gap-3", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "flex", "flex-col", "sm:flex-row", "gap-4", "items-center"], [1, "flex", "items-center", "gap-4", "sm:mr-6"], [1, "text-sm", "font-bold", "text-slate-400", "uppercase", "tracking-wide"], [1, "text-3xl", "font-black", "text-slate-900"], [1, "px-10", "py-3", "bg-primary", "rounded-2xl", "font-bold", "text-white", "transition-all", "shadow-lg", "shadow-primary/20", "hover:-translate-y-0.5", "w-full", "sm:w-auto", 3, "click"], [1, "border-b", "border-slate-50", "last:border-none", "hover:bg-slate-50/50", "transition-all"], [1, "px-8", "py-6"], [1, "text-sm", "font-bold", "text-slate-900"], [1, "text-xs", "text-slate-400"], [1, "relative", "min-w-[180px]", 3, "click"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "gap-2", "px-4", "py-3", "bg-slate-50", "rounded-xl", "text-sm", "font-semibold", "text-left", "transition-all", 3, "click", "ngClass"], [1, "truncate", 3, "ngClass"], [1, "material-symbols-outlined", "text-slate-400", "text-[18px]", "shrink-0", "transition-transform", "duration-200", 3, "ngClass"], ["class", "custom-dropdown-wrapper absolute left-0 right-0 top-[calc(100%+8px)] z-[999] min-w-[200px]", 4, "ngIf"], ["type", "number", "min", "1", "max", "1000", 1, "w-24", "bg-slate-50", "border-none", "rounded-xl", "text-sm", "p-3", "focus:ring-2", "focus:ring-primary/20", "transition-all", "font-bold", 3, "ngModelChange", "input", "ngModel"], [1, "px-8", "py-6", "text-right"], [1, "text-sm", "font-black", "text-slate-900"], [1, "px-6", "py-6", "text-center"], ["type", "button", 1, "w-11", "h-11", "rounded-2xl", "bg-rose-50", "text-rose-600", "hover:bg-rose-100", "hover:scale-105", "transition-all", "flex", "items-center", "justify-center", "mx-auto", "disabled:opacity-40", "disabled:cursor-not-allowed", "disabled:hover:scale-100", "disabled:hover:bg-rose-50", 3, "click", "disabled"], [1, "custom-dropdown-wrapper", "absolute", "left-0", "right-0", "top-[calc(100%+8px)]", "z-[999]", "min-w-[200px]"], [1, "max-h-52", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "py-2"], ["type", "button", "class", "w-full text-left px-4 py-2.5 text-sm font-semibold transition-all flex items-center justify-between", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["class", "px-4 py-3 text-xs text-slate-400 text-center", 4, "ngIf"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-2.5", "text-sm", "font-semibold", "transition-all", "flex", "items-center", "justify-between", 3, "click", "ngClass"], ["class", "material-symbols-outlined text-[16px] text-primary", 4, "ngIf"], [1, "material-symbols-outlined", "text-[16px]", "text-primary"], [1, "px-4", "py-3", "text-xs", "text-slate-400", "text-center"], [1, "mx-auto", "animate-in", "fade-in", "zoom-in-95", "duration-500", "mb-20"], [1, "bg-white", "rounded-[2rem]", "border", "border-slate-200/60", "shadow-2xl", "p-6", "sm:p-10", "relative", "overflow-hidden"], [1, "absolute", "-top-20", "-right-20", "w-64", "h-64", "bg-primary/5", "rounded-full", "blur-3xl"], [1, "flex", "flex-col", "sm:flex-row", "justify-between", "items-start", "gap-4", "mb-12", "relative", "z-10"], [1, "bg-primary/10", "text-primary", "px-4", "py-1.5", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "mb-4", "inline-block"], [1, "text-3xl", "sm:text-4xl", "font-black", "text-slate-900", "tracking-tight"], [1, "text-left", "sm:text-right"], [1, "text-xs", "font-black", "text-slate-400", "uppercase", "tracking-widest", "mb-1"], [1, "text-lg", "font-bold", "text-slate-900"], [1, "max-w-4xl", "mx-auto", "space-y-8", "relative", "z-10"], [1, "bg-slate-50/80", "rounded-3xl", "p-6", "sm:p-8", "border", "border-slate-100"], [1, "text-xs", "font-black", "text-slate-400", "uppercase", "tracking-[0.2em]", "mb-6"], [1, "space-y-4", "max-h-[420px]", "overflow-y-auto", "custom-scrollbar", "smooth-scroll", "pr-1"], ["class", "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-slate-200/60 last:border-none last:pb-0", 4, "ngFor", "ngForOf"], [1, "fixed", "bottom-0", "left-0", "lg:left-66", "right-0", "z-[9999]", "flex", "flex-col", "sm:flex-row", "justify-end", "gap-4", "p-4", "bg-white", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800", 2, "opacity", "1"], [1, "flex", "items-center", "justify-center", "gap-4", "sm:mr-6"], [1, "px-10", "py-3", "bg-primary", "rounded-2xl", "font-bold", "text-white", "transition-all", "shadow-lg", "shadow-primary/20", "hover:-translate-y-0.5", "flex", "items-center", "justify-center", "gap-2", "w-full", "sm:w-auto", 3, "click"], [1, "flex", "flex-col", "sm:flex-row", "sm:justify-between", "sm:items-center", "gap-2", "pb-4", "border-b", "border-slate-200/60", "last:border-none", "last:pb-0"], [1, "flex", "items-center", "gap-2", "mt-1"], [1, "material-symbols-outlined", "text-[14px]", "text-slate-400"], [1, "text-[12px]", "font-semibold", "text-slate-500"], [1, "text-[11px]", "font-bold", "text-slate-400"]], template: function NewQuotations_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function NewQuotations_Template_div_click_0_listener() {
        return ctx.closeAllDropdowns();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div")(3, "a", 2)(4, "span", 3);
      \u0275\u0275text(5, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 4);
      \u0275\u0275text(7, "Back to List");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "h1", 5);
      \u0275\u0275text(9, "New Quotation ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div")(12, "div");
      \u0275\u0275text(13, " 1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 7);
      \u0275\u0275text(15, "Items");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(16, "div", 8);
      \u0275\u0275elementStart(17, "div")(18, "div");
      \u0275\u0275text(19, " 2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 7);
      \u0275\u0275text(21, "Vendors");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(22, "div", 8);
      \u0275\u0275elementStart(23, "div")(24, "div");
      \u0275\u0275text(25, " 3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 7);
      \u0275\u0275text(27, "Review");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(28, NewQuotations_div_28_Template, 19, 9, "div", 9)(29, NewQuotations_div_29_Template, 33, 2, "div", 9)(30, NewQuotations_div_30_Template, 37, 6, "div", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275classMap("flex items-center gap-2 shrink-0 " + (ctx.currentStep >= 1 ? "text-primary" : "text-slate-400"));
      \u0275\u0275advance();
      \u0275\u0275classMap("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (ctx.currentStep >= 1 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"));
      \u0275\u0275advance(5);
      \u0275\u0275classMap("flex items-center gap-2 shrink-0 " + (ctx.currentStep >= 2 ? "text-primary" : "text-slate-400"));
      \u0275\u0275advance();
      \u0275\u0275classMap("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (ctx.currentStep >= 2 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"));
      \u0275\u0275advance(5);
      \u0275\u0275classMap("flex items-center gap-2 shrink-0 " + (ctx.currentStep >= 3 ? "text-primary" : "text-slate-400"));
      \u0275\u0275advance();
      \u0275\u0275classMap("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (ctx.currentStep >= 3 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"));
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.currentStep === 1);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentStep === 2);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentStep === 3);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, RouterLink, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewQuotations, [{
    type: Component,
    args: [{ selector: "app-new-quotations", standalone: false, template: `<div class="bg-slate-50/50 animate-in" (click)="closeAllDropdowns()">\r
  <div class="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">\r
    <div>\r
      <a routerLink="/master/resources/quotations"\r
        class="group inline-flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:-translate-x-1 transition-all shadow-sm mb-4">\r
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>\r
        <span class="text-xs font-black uppercase tracking-widest">Back to List</span>\r
      </a>\r
      <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 border-l-4 border-primary pl-6 py-1">New\r
        Quotation\r
      </h1>\r
    </div>\r
\r
    <div\r
      class="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-200/60 shadow-sm overflow-x-auto custom-scrollbar smooth-scroll">\r
      <div [class]="'flex items-center gap-2 shrink-0 ' + (currentStep >= 1 ? 'text-primary' : 'text-slate-400')">\r
        <div\r
          [class]="'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (currentStep >= 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400')">\r
          1</div>\r
        <span class="text-sm font-bold">Items</span>\r
      </div>\r
      <div class="w-8 h-px bg-slate-200 shrink-0"></div>\r
      <div [class]="'flex items-center gap-2 shrink-0 ' + (currentStep >= 2 ? 'text-primary' : 'text-slate-400')">\r
        <div\r
          [class]="'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (currentStep >= 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400')">\r
          2</div>\r
        <span class="text-sm font-bold">Vendors</span>\r
      </div>\r
      <div class="w-8 h-px bg-slate-200 shrink-0"></div>\r
      <div [class]="'flex items-center gap-2 shrink-0 ' + (currentStep >= 3 ? 'text-primary' : 'text-slate-400')">\r
        <div\r
          [class]="'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (currentStep >= 3 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400')">\r
          3</div>\r
        <span class="text-sm font-bold">Review</span>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div *ngIf="currentStep === 1" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">\r
    <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-4 sm:p-6">\r
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">\r
\r
        <div class="relative w-full sm:w-1/2" (click)="$event.stopPropagation()">\r
\r
          <button type="button" (click)="toggleTypeDropdown()"\r
            class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border rounded-2xl text-sm font-semibold text-slate-700 transition-all"\r
            [ngClass]="typeDropdownOpen ? 'ring-2 ring-primary/30 border-primary/40 bg-white' : 'border-transparent hover:border-slate-200'">\r
            <span>{{ selectedType === 'MATERIAL' ? 'Material' : 'Equipment' }}</span>\r
            <span class="material-symbols-outlined text-slate-400 transition-transform duration-200"\r
              [ngClass]="typeDropdownOpen ? 'rotate-180' : ''">expand_more</span>\r
          </button>\r
\r
          <div *ngIf="typeDropdownOpen"\r
            class="custom-dropdown-wrapper absolute left-0 right-0 top-[calc(100%+8px)] z-50">\r
            <div\r
              class="dropdown-panel bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">\r
              <div class="max-h-60 overflow-y-auto custom-scrollbar smooth-scroll py-2">\r
                <button type="button" *ngFor="let opt of typeOptions" (click)="selectType(opt.value)"\r
                  class="w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center justify-between"\r
                  [ngClass]="selectedType === opt.value ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'">\r
                  {{ opt.label }}\r
                  <span *ngIf="selectedType === opt.value"\r
                    class="material-symbols-outlined text-[18px] text-primary">check</span>\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
\r
        </div>\r
\r
        <div class="relative w-full sm:w-1/2">\r
\r
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">\r
            search\r
          </span>\r
\r
          <input type="text" [(ngModel)]="searchQuery" (input)="filterResources()"\r
            placeholder="Search materials or equipments..."\r
            class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all">\r
\r
        </div>\r
\r
      </div>\r
\r
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">\r
\r
        <div *ngFor="let mat of filteredMaterials" (click)="toggleMaterial(mat.sku)" [class]="\r
      'group relative overflow-hidden rounded-[32px] cursor-pointer transition-all duration-500 border ' +\r
      (\r
        selectedMaterials.has(mat.sku)\r
          ? 'border-primary/30 bg-gradient-to-br from-primary/10 via-white to-indigo-50 dark:from-primary/20 dark:via-slate-900 dark:to-slate-950 shadow-[0_25px_60px_rgba(99,102,241,0.22)] scale-[1.02]'\r
          : 'border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]'\r
      )\r
    ">\r
\r
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700\r
             bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_45%)]">\r
          </div>\r
\r
          <div class="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100\r
             transition-all duration-500 border border-primary/10">\r
          </div>\r
\r
          <div [class]="\r
        'h-1.5 w-full transition-all duration-500 ' +\r
        (\r
          selectedMaterials.has(mat.sku)\r
            ? 'bg-gradient-to-r from-primary via-indigo-500 to-violet-500'\r
            : 'bg-transparent group-hover:bg-gradient-to-r group-hover:from-primary/60 group-hover:via-indigo-400 group-hover:to-violet-400'\r
        )\r
      ">\r
          </div>\r
\r
          <div class="relative p-6">\r
\r
            <div *ngIf="selectedMaterials.has(mat.sku)" class="absolute top-5 right-5 w-9 h-9 rounded-2xl\r
               bg-gradient-to-br from-primary to-indigo-600\r
               text-white flex items-center justify-center\r
               shadow-[0_10px_25px_rgba(99,102,241,0.35)]\r
               animate-in zoom-in-50 duration-300">\r
\r
              <span class="material-symbols-outlined text-[18px] font-bold">\r
                done\r
              </span>\r
\r
            </div>\r
\r
            <div class="flex items-start gap-4 mb-6">\r
\r
              <div [class]="\r
            'relative w-16 h-16 rounded-[22px] flex items-center justify-center\r
             transition-all duration-500 overflow-hidden ' +\r
            (\r
              selectedMaterials.has(mat.sku)\r
                ? 'bg-gradient-to-br from-primary to-indigo-600 text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)] rotate-3 scale-105'\r
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:scale-110 group-hover:rotate-3'\r
            )\r
          ">\r
\r
                <div class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent">\r
                </div>\r
\r
                <span class="material-symbols-outlined text-[28px] relative z-10">\r
                  {{ mat.icon || 'inventory_2' }}\r
                </span>\r
\r
              </div>\r
\r
              <div class="flex-1 min-w-0 pt-1">\r
\r
                <h3 class="text-[17px] font-black tracking-tight\r
                   text-slate-900 dark:text-white\r
                   leading-tight line-clamp-2">\r
\r
                  {{ mat.name }}\r
\r
                </h3>\r
\r
                <div class="flex items-center gap-2 mt-3">\r
\r
                  <span class="px-3 py-1 rounded-full\r
                     bg-slate-100 dark:bg-slate-800\r
                     text-[10px] font-black uppercase tracking-[0.2em]\r
                     text-slate-500">\r
\r
                    {{ mat.category }}\r
\r
                  </span>\r
\r
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse">\r
                  </span>\r
\r
                </div>\r
\r
              </div>\r
\r
            </div>\r
\r
            <div class="rounded-2xl border border-slate-100 dark:border-slate-800\r
               bg-slate-50/70 dark:bg-slate-800/40 p-4">\r
\r
              <div class="flex items-center justify-between">\r
\r
                <div>\r
\r
                  <p class="text-[10px] uppercase tracking-[0.25em]\r
                     font-black text-slate-400 mb-1.5">\r
\r
                    Unit Cost\r
\r
                  </p>\r
\r
                  <div class="flex items-end gap-1">\r
\r
                    <span class="text-3xl font-black tracking-tight\r
                       text-slate-900 dark:text-white">\r
\r
                      \u20B9{{ mat.cost }}\r
\r
                    </span>\r
\r
                  </div>\r
\r
                </div>\r
\r
                <div class="text-right">\r
\r
                  <p class="text-[9px] uppercase tracking-[0.22em]\r
                     font-black text-slate-400 mb-1.5">\r
\r
                    SKU\r
\r
                  </p>\r
\r
                  <div class="px-3 py-1.5 rounded-xl\r
                     bg-white dark:bg-slate-900\r
                     border border-slate-200 dark:border-slate-700\r
                     text-[11px] font-bold text-slate-600 dark:text-slate-300\r
                     shadow-sm">\r
\r
                    {{ mat.sku }}\r
\r
                  </div>\r
\r
                </div>\r
\r
              </div>\r
\r
            </div>\r
\r
            <div [class]="\r
          'mt-5 w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-black transition-all duration-300 ' +\r
          (\r
            selectedMaterials.has(mat.sku)\r
              ? 'bg-primary text-white shadow-lg shadow-primary/20'\r
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-primary/10 group-hover:text-primary'\r
          )\r
        ">\r
\r
              <span class="material-symbols-outlined text-[18px]">\r
                {{\r
                selectedMaterials.has(mat.sku)\r
                ? 'check_circle'\r
                : 'add_circle'\r
                }}\r
              </span>\r
\r
              {{\r
              selectedMaterials.has(mat.sku)\r
              ? 'Selected'\r
              : 'Select ' + (selectedType === 'MATERIAL' ? 'Material' : 'Equipment')\r
              }}\r
\r
            </div>\r
\r
          </div>\r
\r
        </div>\r
\r
      </div>\r
    </div>\r
\r
    <div\r
      class="fixed bottom-0 left-0 lg:left-66 right-0 z-50 flex justify-end gap-4 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">\r
      <button (click)="nextStep()" [disabled]="selectedMaterials.size === 0"\r
        [class]="'px-8 py-3 rounded-2xl font-bold text-white transition-all shadow-lg ' + (selectedMaterials.size > 0 ? 'bg-primary shadow-primary/20 hover:-translate-y-0.5' : 'bg-slate-300 opacity-50 cursor-not-allowed')">\r
        Continue to Vendors\r
      </button>\r
    </div>\r
  </div>\r
\r
  <div *ngIf="currentStep === 2" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">\r
    <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm">\r
      <table class="w-full text-left border-collapse">\r
\r
        <thead class="bg-slate-50/50">\r
\r
          <tr>\r
\r
            <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">\r
\r
              Material\r
            </th>\r
\r
            <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">\r
\r
              Select Vendor\r
            </th>\r
\r
            <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">\r
\r
              Quantity\r
            </th>\r
\r
            <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">\r
\r
              Unit Price\r
            </th>\r
\r
            <th class="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">\r
\r
              Total\r
            </th>\r
\r
            <th class="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">\r
\r
              Action\r
            </th>\r
\r
          </tr>\r
\r
        </thead>\r
\r
        <tbody>\r
\r
          <tr *ngFor="let item of quoteItems; let i = index"\r
            class="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-all">\r
\r
            <td class="px-8 py-6">\r
\r
              <div class="text-sm font-bold text-slate-900">\r
                {{item.name}}\r
              </div>\r
\r
              <div class="text-xs text-slate-400">\r
                {{item.materialSku}}\r
              </div>\r
\r
            </td>\r
\r
            <td class="px-8 py-6">\r
\r
              <div class="relative min-w-[180px]" (click)="$event.stopPropagation()">\r
\r
                <button type="button" (click)="toggleVendorDropdown(i)"\r
                  class="w-full flex items-center justify-between gap-2 px-4 py-3 bg-slate-50 rounded-xl text-sm font-semibold text-left transition-all"\r
                  [ngClass]="openVendorDropdownIndex === i ? 'ring-2 ring-primary/30 bg-white' : 'hover:bg-slate-100'">\r
                  <span class="truncate" [ngClass]="item.vendor_name ? 'text-slate-700' : 'text-slate-400'">\r
                    {{ item.vendor_name || 'Select Vendor...' }}\r
                  </span>\r
                  <span\r
                    class="material-symbols-outlined text-slate-400 text-[18px] shrink-0 transition-transform duration-200"\r
                    [ngClass]="openVendorDropdownIndex === i ? 'rotate-180' : ''">expand_more</span>\r
                </button>\r
\r
                <div *ngIf="openVendorDropdownIndex === i"\r
                  class="custom-dropdown-wrapper absolute left-0 right-0 top-[calc(100%+8px)] z-[999] min-w-[200px]">\r
                  <div\r
                    class="dropdown-panel bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">\r
                    <div class="max-h-52 overflow-y-auto custom-scrollbar smooth-scroll py-2">\r
                      <button type="button" *ngFor="let vendor of vendors" (click)="selectVendor(item, vendor)"\r
                        class="w-full text-left px-4 py-2.5 text-sm font-semibold transition-all flex items-center justify-between"\r
                        [ngClass]="item.vendorId === vendor.id ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'">\r
                        {{ vendor.name }}\r
                        <span *ngIf="item.vendorId === vendor.id"\r
                          class="material-symbols-outlined text-[16px] text-primary">check</span>\r
                      </button>\r
                      <p *ngIf="!vendors.length" class="px-4 py-3 text-xs text-slate-400 text-center">No vendors found\r
                      </p>\r
                    </div>\r
                  </div>\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
            <td class="px-8 py-6">\r
              <input type="number" min="1" max="1000" [(ngModel)]="item.quantity" (input)="checkQuantity(item, $event)"\r
                (ngModelChange)="updateLineTotal(item)" class="w-24 bg-slate-50 border-none rounded-xl text-sm p-3\r
    focus:ring-2 focus:ring-primary/20 transition-all font-bold" />\r
            </td>\r
\r
            <td class="px-8 py-6">\r
\r
              <div class="text-sm font-bold text-slate-900">\r
                \u20B9{{item.unitPrice.toLocaleString()}}\r
              </div>\r
\r
            </td>\r
\r
            <td class="px-8 py-6 text-right">\r
\r
              <div class="text-sm font-black text-slate-900">\r
                \u20B9{{item.totalPrice.toLocaleString()}}\r
              </div>\r
\r
            </td>\r
\r
            <td class="px-6 py-6 text-center">\r
\r
              <button (click)="removeQuoteItem(i)" type="button" [disabled]="quoteItems.length === 1" class="w-11 h-11 rounded-2xl bg-rose-50\r
         text-rose-600 hover:bg-rose-100\r
         hover:scale-105 transition-all\r
         flex items-center justify-center mx-auto\r
         disabled:opacity-40\r
         disabled:cursor-not-allowed\r
         disabled:hover:scale-100\r
         disabled:hover:bg-rose-50">\r
\r
                <span class="material-symbols-outlined text-[20px]">\r
                  delete\r
                </span>\r
\r
              </button>\r
\r
            </td>\r
\r
          </tr>\r
\r
        </tbody>\r
\r
      </table>\r
\r
    </div>\r
\r
    <div\r
      class="fixed bottom-0 left-0 lg:left-66 right-0 z-50 flex flex-col sm:flex-row justify-end gap-4 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">\r
\r
      <button (click)="prevStep()" class="px-8 py-4 rounded-2xl font-black uppercase tracking-widest\r
             text-slate-400 hover:text-slate-900 hover:bg-slate-100\r
             transition-all flex items-center justify-center gap-3">\r
\r
        <span class="material-symbols-outlined text-sm">\r
          west\r
        </span>\r
\r
        <span>\r
          Previous Step\r
        </span>\r
\r
      </button>\r
\r
      <div class="flex flex-col sm:flex-row gap-4 items-center">\r
\r
        <div class="flex items-center gap-4 sm:mr-6">\r
\r
          <p class="text-sm font-bold text-slate-400 uppercase tracking-wide">\r
            Grand Total\r
          </p>\r
\r
          <h2 class="text-3xl font-black text-slate-900">\r
            \u20B9{{totalAmount.toLocaleString()}}\r
          </h2>\r
\r
        </div>\r
\r
        <button (click)="nextStep()" class="px-10 py-3 bg-primary rounded-2xl font-bold text-white\r
               transition-all shadow-lg shadow-primary/20\r
               hover:-translate-y-0.5 w-full sm:w-auto">\r
\r
          Review Quote\r
\r
        </button>\r
\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
  <div *ngIf="currentStep === 3" class=" mx-auto animate-in fade-in zoom-in-95 duration-500 mb-20">\r
    <div class="bg-white rounded-[2rem] border border-slate-200/60 shadow-2xl p-6 sm:p-10 relative overflow-hidden">\r
      <div class="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>\r
\r
      <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-12 relative z-10">\r
        <div>\r
          <div\r
            class="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">\r
            Draft Quotation</div>\r
          <h2 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Summary</h2>\r
        </div>\r
        <div class="text-left sm:text-right">\r
          <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Generated On</p>\r
          <p class="text-lg font-bold text-slate-900">{{ today | date:'MMM dd, yyyy' }}</p>\r
        </div>\r
      </div>\r
\r
      <div class="max-w-4xl mx-auto space-y-8 relative z-10">\r
\r
        <div class="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-100">\r
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">\r
            Item Breakdown\r
          </h3>\r
\r
          <div class="space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar smooth-scroll pr-1">\r
            <div *ngFor="let item of quoteItems"\r
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-slate-200/60 last:border-none last:pb-0">\r
\r
              <div>\r
                <p class="text-sm font-bold text-slate-900">\r
                  {{item.name}} (x{{item.quantity}})\r
                </p>\r
\r
                <div class="flex items-center gap-2 mt-1">\r
                  <span class="material-symbols-outlined text-[14px] text-slate-400">\r
                    local_shipping\r
                  </span>\r
\r
                  <p class="text-[12px] font-semibold text-slate-500">\r
                    {{item.vendor_name || 'No Vendor Selected'}}\r
                  </p>\r
                </div>\r
              </div>\r
\r
              <div class="text-left sm:text-right">\r
                <p class="text-sm font-black text-slate-900">\r
                  \u20B9{{item.totalPrice.toLocaleString()}}\r
                </p>\r
\r
                <p class="text-[11px] font-bold text-slate-400">\r
                  &#64; \u20B9{{item.unitPrice.toLocaleString()}}/unit\r
                </p>\r
              </div>\r
\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- <div class="flex justify-between items-center px-8">\r
    <div>\r
      <p class="text-sm font-bold text-slate-400">\r
        Total Quotation Value\r
      </p>\r
\r
      <p class="text-[11px] font-bold text-slate-400 italic">\r
        Inclusive of all selected vendor prices\r
      </p>\r
    </div>\r
\r
    <div class="text-right">\r
      <h2 class="text-4xl font-black text-primary">\r
        \u20B9{{totalAmount.toLocaleString()}}\r
      </h2>\r
    </div>\r
  </div> -->\r
\r
      </div>\r
\r
      <div class="fixed bottom-0 left-0 lg:left-66 right-0 z-[9999]\r
         flex flex-col sm:flex-row justify-end gap-4 p-4\r
         bg-white dark:bg-slate-900\r
         border-t border-slate-200 dark:border-slate-800" style="opacity:1;">\r
\r
        <button (click)="prevStep()" class="px-8 py-4 rounded-2xl font-black uppercase tracking-widest\r
           text-slate-400 hover:text-slate-900 hover:bg-slate-100\r
           transition-all flex items-center justify-center gap-3">\r
\r
          <span class="material-symbols-outlined text-sm">\r
            west\r
          </span>\r
\r
          <span>\r
            Make Changes\r
          </span>\r
\r
        </button>\r
\r
        <div class="flex items-center justify-center gap-4 sm:mr-6">\r
\r
          <p class="text-sm font-bold text-slate-400 uppercase tracking-wide">\r
            Grand Total\r
          </p>\r
\r
          <h2 class="text-3xl font-black text-slate-900">\r
            \u20B9{{totalAmount.toLocaleString()}}\r
          </h2>\r
\r
        </div>\r
\r
        <button (click)="submitQuote()" class="px-10 py-3 bg-primary rounded-2xl font-bold text-white\r
           transition-all shadow-lg shadow-primary/20\r
           hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto">\r
\r
          <span class="material-symbols-outlined text-[18px]">\r
            send\r
          </span>\r
\r
          <span>\r
            Save Quote\r
          </span>\r
\r
        </button>\r
\r
      </div>\r
    </div>\r
  </div>\r
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewQuotations, { className: "NewQuotations", filePath: "app/modules/resources/new-quotations/new-quotations.ts", lineNumber: 19 });
})();

// src/app/modules/resources/invoices-liabilities/invoices-liabilities.ts
function InvoicesLiabilitiesComponent_tr_98_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function InvoicesLiabilitiesComponent_tr_98_button_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const inv_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openPaymentModal(inv_r2));
    });
    \u0275\u0275elementStart(1, "span", 58);
    \u0275\u0275text(2, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Disburse ");
    \u0275\u0275elementEnd();
  }
}
function InvoicesLiabilitiesComponent_tr_98_span_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1, "Settled");
    \u0275\u0275elementEnd();
  }
}
function InvoicesLiabilitiesComponent_tr_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 40)(1, "td", 33)(2, "div", 41)(3, "div", 42)(4, "span", 43);
    \u0275\u0275text(5, "receipt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "span", 44);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 45);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "td", 33)(13, "div", 46);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 47);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 33)(18, "div", 48)(19, "span", 49);
    \u0275\u0275text(20, "domain");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td", 33)(23, "div", 50);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 51);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "td", 52);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td", 33)(30, "span", 53);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "td", 34)(33, "span", 54);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "td", 35);
    \u0275\u0275template(36, InvoicesLiabilitiesComponent_tr_98_button_36_Template, 4, 0, "button", 55)(37, InvoicesLiabilitiesComponent_tr_98_span_37_Template, 2, 0, "span", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const inv_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(inv_r2.invoiceNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Due: ", \u0275\u0275pipeBind2(11, 17, inv_r2.dueDate, "mediumDate"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(inv_r2.vendorName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r2.vendorCategory);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", inv_r2.projectName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", inv_r2.totalAmount.toLocaleString("en-IN"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("GST: \u20B9", inv_r2.taxAmount.toLocaleString("en-IN"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", inv_r2.paidAmount.toLocaleString("en-IN"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-rose-600", inv_r2.liabilityBalance > 0)("text-slate-400", inv_r2.liabilityBalance === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u20B9", inv_r2.liabilityBalance.toLocaleString("en-IN"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(inv_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r2.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", inv_r2.liabilityBalance > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", inv_r2.liabilityBalance === 0);
  }
}
function InvoicesLiabilitiesComponent_tr_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 60)(2, "span", 61);
    \u0275\u0275text(3, "find_in_page");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 62);
    \u0275\u0275text(5, "No invoice liabilities found matching your search.");
    \u0275\u0275elementEnd()()();
  }
}
function InvoicesLiabilitiesComponent_div_100_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64)(2, "div", 65)(3, "div")(4, "span", 66);
    \u0275\u0275text(5, "Disburse Liability");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 67);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 68);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 69);
    \u0275\u0275listener("click", function InvoicesLiabilitiesComponent_div_100_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showPaymentModal = false);
    });
    \u0275\u0275elementStart(11, "span", 70);
    \u0275\u0275text(12, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 71)(14, "div")(15, "span", 72);
    \u0275\u0275text(16, "Current Outstanding");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 73);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "span", 72);
    \u0275\u0275text(21, "Total Invoice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 74);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 75)(25, "div")(26, "label", 76);
    \u0275\u0275text(27, "Disbursement Amount (\u20B9) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 77);
    \u0275\u0275twoWayListener("ngModelChange", function InvoicesLiabilitiesComponent_div_100_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentAmount, $event) || (ctx_r2.paymentAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div")(30, "label", 76);
    \u0275\u0275text(31, "Payment Channel / Mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "select", 78);
    \u0275\u0275twoWayListener("ngModelChange", function InvoicesLiabilitiesComponent_div_100_Template_select_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentMode, $event) || (ctx_r2.paymentMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(33, "option", 79);
    \u0275\u0275text(34, "NEFT / RTGS Online Transfer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 80);
    \u0275\u0275text(36, "Corporate Account Cheque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 81);
    \u0275\u0275text(38, "Bank Demand Draft");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 82);
    \u0275\u0275text(40, "CMS Direct Debit");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div")(42, "label", 76);
    \u0275\u0275text(43, "Bank Reference / UTR Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 83);
    \u0275\u0275twoWayListener("ngModelChange", function InvoicesLiabilitiesComponent_div_100_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentReference, $event) || (ctx_r2.paymentReference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 84)(46, "button", 85);
    \u0275\u0275listener("click", function InvoicesLiabilitiesComponent_div_100_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showPaymentModal = false);
    });
    \u0275\u0275text(47, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 86);
    \u0275\u0275listener("click", function InvoicesLiabilitiesComponent_div_100_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.recordPayment());
    });
    \u0275\u0275text(49, " Confirm Settlement ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.selectedInvoice.invoiceNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedInvoice.vendorName);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r2.selectedInvoice.liabilityBalance.toLocaleString("en-IN"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r2.selectedInvoice.totalAmount.toLocaleString("en-IN"));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentAmount);
    \u0275\u0275property("max", ctx_r2.selectedInvoice.liabilityBalance);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentMode);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentReference);
  }
}
var InvoicesLiabilitiesComponent = class _InvoicesLiabilitiesComponent {
  invoices = [
    {
      id: 1,
      invoiceNumber: "INV-2026-0891",
      vendorName: "Apex Steel Industries Pvt Ltd",
      vendorCategory: "Structural Metals",
      projectName: "Skyline Commercial Towers",
      invoiceDate: "2026-10-10",
      dueDate: "2026-11-10",
      subtotal: 18e5,
      taxAmount: 324e3,
      totalAmount: 2124e3,
      paidAmount: 1e6,
      liabilityBalance: 1124e3,
      status: "Partially Paid",
      paymentMode: "NEFT",
      refNo: "CMS-992144"
    },
    {
      id: 2,
      invoiceNumber: "INV-2026-0904",
      vendorName: "Ultratech Premix Logistics",
      vendorCategory: "Ready Mix Concrete",
      projectName: "Metro Rail Corridor 4",
      invoiceDate: "2026-10-15",
      dueDate: "2026-11-15",
      subtotal: 32e5,
      taxAmount: 576e3,
      totalAmount: 3776e3,
      paidAmount: 0,
      liabilityBalance: 3776e3,
      status: "Pending"
    },
    {
      id: 3,
      invoiceNumber: "INV-2026-0742",
      vendorName: "Voltas Equipment Fleet Ltd",
      vendorCategory: "Plant & Heavy Machinery",
      projectName: "Green Valley Residential Villas",
      invoiceDate: "2026-09-01",
      dueDate: "2026-10-01",
      subtotal: 95e4,
      taxAmount: 171e3,
      totalAmount: 1121e3,
      paidAmount: 0,
      liabilityBalance: 1121e3,
      status: "Overdue"
    },
    {
      id: 4,
      invoiceNumber: "INV-2026-0688",
      vendorName: "Schneider Power Systems India",
      vendorCategory: "Electrical & MEP",
      projectName: "Skyline Commercial Towers",
      invoiceDate: "2026-08-20",
      dueDate: "2026-09-20",
      subtotal: 42e5,
      taxAmount: 756e3,
      totalAmount: 4956e3,
      paidAmount: 4956e3,
      liabilityBalance: 0,
      status: "Paid",
      paymentMode: "RTGS",
      refNo: "AXIS-558921"
    },
    {
      id: 5,
      invoiceNumber: "INV-2026-0931",
      vendorName: "Shree Cement Logistics",
      vendorCategory: "Building Materials",
      projectName: "Metro Rail Corridor 4",
      invoiceDate: "2026-10-22",
      dueDate: "2026-11-22",
      subtotal: 145e4,
      taxAmount: 261e3,
      totalAmount: 1711e3,
      paidAmount: 5e5,
      liabilityBalance: 1211e3,
      status: "Partially Paid",
      paymentMode: "Bank Transfer"
    }
  ];
  filteredInvoices = [];
  searchQuery = "";
  statusFilter = "All";
  selectedInvoice = null;
  showPaymentModal = false;
  paymentAmount = 0;
  paymentReference = "";
  paymentMode = "NEFT";
  ngOnInit() {
    this.filteredInvoices = [...this.invoices];
  }
  get totalLiability() {
    return this.invoices.reduce((sum, inv) => sum + (inv.liabilityBalance || 0), 0);
  }
  get totalInvoiced() {
    return this.invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  }
  get totalSettled() {
    return this.invoices.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  }
  get pendingCount() {
    return this.invoices.filter((inv) => inv.status === "Pending" || inv.status === "Overdue").length;
  }
  filterInvoices() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredInvoices = this.invoices.filter((inv) => {
      const matchesSearch = !q || inv.invoiceNumber.toLowerCase().includes(q) || inv.vendorName.toLowerCase().includes(q) || inv.projectName.toLowerCase().includes(q);
      const matchesStatus = this.statusFilter === "All" || inv.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
  openPaymentModal(inv) {
    this.selectedInvoice = inv;
    this.paymentAmount = inv.liabilityBalance;
    this.paymentReference = "";
    this.paymentMode = "NEFT";
    this.showPaymentModal = true;
  }
  recordPayment() {
    if (!this.selectedInvoice || this.paymentAmount <= 0)
      return;
    this.selectedInvoice.paidAmount += Number(this.paymentAmount);
    this.selectedInvoice.liabilityBalance = Math.max(0, this.selectedInvoice.totalAmount - this.selectedInvoice.paidAmount);
    if (this.selectedInvoice.liabilityBalance === 0) {
      this.selectedInvoice.status = "Paid";
    } else {
      this.selectedInvoice.status = "Partially Paid";
    }
    this.selectedInvoice.paymentMode = this.paymentMode;
    this.selectedInvoice.refNo = this.paymentReference || "TXN-" + Math.floor(Math.random() * 89999 + 1e4);
    this.showPaymentModal = false;
    this.filterInvoices();
  }
  getStatusClass(status) {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300";
      case "Partially Paid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300";
      case "Overdue":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-300";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300";
    }
  }
  static \u0275fac = function InvoicesLiabilitiesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvoicesLiabilitiesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoicesLiabilitiesComponent, selectors: [["app-invoices-liabilities"]], standalone: false, decls: 101, vars: 11, consts: [[1, "bg-slate-50/50", "dark:bg-slate-950", "min-h-screen", "animate-in", "p-4", "sm:p-6", "lg:p-8"], [1, "flex", "flex-col", "sm:flex-row", "sm:justify-between", "sm:items-center", "gap-4", "mb-8"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "px-2.5", "py-0.5", "rounded-full", "bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "border", "border-emerald-500/20"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "text-sm"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-5", "mb-8"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-rose-500", "via-red-600", "to-rose-700", "text-white", "shadow-lg", "shadow-rose-500/15"], [1, "flex", "items-center", "justify-between"], [1, "text-[10px]", "uppercase", "tracking-widest", "text-white/80", "font-bold"], [1, "text-2xl", "font-black", "mt-2"], [1, "text-xs", "text-white/70", "mt-1"], [1, "w-13", "h-13", "rounded-2xl", "bg-white/20", "backdrop-blur-md", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-3xl"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-blue-600", "via-indigo-600", "to-blue-700", "text-white", "shadow-lg", "shadow-blue-500/15"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-emerald-500", "via-teal-600", "to-emerald-700", "text-white", "shadow-lg", "shadow-emerald-500/15"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-amber-500", "via-orange-500", "to-amber-600", "text-white", "shadow-lg", "shadow-amber-500/15"], [1, "text-3xl", "font-black", "mt-2"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/80", "dark:border-slate-800", "shadow-sm", "mb-6", "p-4", "flex", "flex-col", "sm:flex-row", "items-center", "gap-4"], [1, "relative", "flex-1", "w-full"], [1, "material-symbols-outlined", "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "text", "placeholder", "Search liabilities by invoice number, contractor vendor, or project...", 1, "w-full", "pl-12", "pr-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "dark:text-white", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-blue-500/30", "transition-all", "outline-none", 3, "ngModelChange", "input", "ngModel"], [1, "flex", "items-center", "gap-3", "w-full", "sm:w-auto"], [1, "px-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "dark:text-white", "rounded-2xl", "text-xs", "font-bold", "border", "border-slate-200", "dark:border-slate-700", "outline-none", 3, "ngModelChange", "change", "ngModel"], ["value", "All"], ["value", "Pending"], ["value", "Partially Paid"], ["value", "Overdue"], ["value", "Paid"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/80", "dark:border-slate-800", "shadow-xl", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-sm", "text-slate-600", "dark:text-slate-300"], [1, "bg-slate-50", "dark:bg-slate-800/60", "text-[11px]", "font-black", "uppercase", "tracking-wider", "text-slate-500", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "px-6", "py-4"], [1, "px-6", "py-4", "text-center"], [1, "px-6", "py-4", "text-right"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800/60"], ["class", "hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4", 4, "ngIf"], [1, "hover:bg-slate-50/70", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-2xl", "bg-emerald-500/10", "text-emerald-600", "dark:text-emerald-400", "flex", "items-center", "justify-center", "shrink-0", "border", "border-emerald-500/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "text-xs", "font-black", "text-slate-900", "dark:text-white", "font-mono"], [1, "text-[11px]", "text-slate-400", "mt-0.5"], [1, "font-bold", "text-slate-800", "dark:text-slate-100"], [1, "text-[11px]", "text-slate-400"], [1, "flex", "items-center", "gap-1.5", "font-medium", "text-slate-700", "dark:text-slate-200"], [1, "material-symbols-outlined", "text-slate-400", "text-[16px]"], [1, "font-black", "text-slate-900", "dark:text-white"], [1, "text-[10px]", "text-slate-400"], [1, "px-6", "py-4", "font-semibold", "text-emerald-600", "dark:text-emerald-400"], [1, "font-black", "text-sm"], [1, "px-3", "py-1", "rounded-full", "text-[11px]", "font-black", "border", 3, "ngClass"], ["class", "px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1", 3, "click", 4, "ngIf"], ["class", "text-xs font-bold text-slate-400", 4, "ngIf"], [1, "px-3.5", "py-1.5", "rounded-xl", "bg-emerald-50", "hover:bg-emerald-100", "text-emerald-700", "dark:bg-emerald-900/30", "dark:hover:bg-emerald-900/50", "dark:text-emerald-300", "text-xs", "font-bold", "transition-all", "cursor-pointer", "inline-flex", "items-center", "gap-1", 3, "click"], [1, "material-symbols-outlined", "text-[15px]"], [1, "text-xs", "font-bold", "text-slate-400"], ["colspan", "8", 1, "px-6", "py-12", "text-center", "text-slate-400"], [1, "material-symbols-outlined", "text-4xl", "mb-2"], [1, "font-medium", "text-sm"], [1, "fixed", "inset-0", "z-50", "bg-slate-900/60", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "max-w-lg", "w-full", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "p-6", "sm:p-8", "animate-in", "fade-in", "zoom-in-95"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-xs", "font-mono", "font-bold", "text-emerald-600"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-xs", "text-slate-500"], [1, "w-8", "h-8", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "text-slate-500", "hover:text-slate-800", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "p-4", "rounded-2xl", "bg-slate-50", "dark:bg-slate-800/50", "mb-4", "flex", "justify-between", "items-center"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400"], [1, "text-lg", "font-black", "text-rose-600"], [1, "text-sm", "font-bold", "text-slate-700", "dark:text-slate-300"], [1, "space-y-4", "mb-6"], [1, "block", "text-xs", "font-bold", "text-slate-600", "dark:text-slate-300", "mb-1"], ["type", "number", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel", "max"], [1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel"], ["value", "NEFT"], ["value", "Cheque"], ["value", "Demand Draft"], ["value", "Direct Debit"], ["type", "text", "placeholder", "e.g. CMS-998234812", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-emerald-500", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "gap-3"], [1, "px-5", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "font-bold", "text-xs", "text-slate-700", "dark:text-slate-300", "cursor-pointer", 3, "click"], [1, "px-6", "py-2.5", "rounded-xl", "bg-emerald-600", "hover:bg-emerald-700", "font-bold", "text-xs", "text-white", "shadow-lg", "shadow-emerald-500/20", "cursor-pointer", 3, "click"]], template: function InvoicesLiabilitiesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span", 3);
      \u0275\u0275text(5, " Finance & Accounts Ledger ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 4);
      \u0275\u0275text(7, "Invoices & Liabilities");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9, " Authoritative accounts payable register, outstanding contractor liabilities, tax invoices, and payment disbursements. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "div", 8)(13, "div")(14, "p", 9);
      \u0275\u0275text(15, "Outstanding Liabilities");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "h3", 10);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "p", 11);
      \u0275\u0275text(19, "Pending Accounts Payable");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 12)(21, "span", 13);
      \u0275\u0275text(22, "account_balance");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(23, "div", 14)(24, "div", 8)(25, "div")(26, "p", 9);
      \u0275\u0275text(27, "Total Invoiced (Gross)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "h3", 10);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p", 11);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 12)(33, "span", 13);
      \u0275\u0275text(34, "receipt_long");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(35, "div", 15)(36, "div", 8)(37, "div")(38, "p", 9);
      \u0275\u0275text(39, "Total Settled / Paid");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "h3", 10);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "p", 11);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div", 12)(45, "span", 13);
      \u0275\u0275text(46, "check_circle");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "div", 16)(48, "div", 8)(49, "div")(50, "p", 9);
      \u0275\u0275text(51, "Invoices Due / Pending");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "h3", 17);
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "p", 11);
      \u0275\u0275text(55, "Requires Payment Clearance");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 12)(57, "span", 13);
      \u0275\u0275text(58, "pending_actions");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(59, "div", 18)(60, "div", 19)(61, "span", 20);
      \u0275\u0275text(62, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function InvoicesLiabilitiesComponent_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function InvoicesLiabilitiesComponent_Template_input_input_63_listener() {
        return ctx.filterInvoices();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 22)(65, "select", 23);
      \u0275\u0275twoWayListener("ngModelChange", function InvoicesLiabilitiesComponent_Template_select_ngModelChange_65_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function InvoicesLiabilitiesComponent_Template_select_change_65_listener() {
        return ctx.filterInvoices();
      });
      \u0275\u0275elementStart(66, "option", 24);
      \u0275\u0275text(67, "All Invoices");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "option", 25);
      \u0275\u0275text(69, "Pending");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "option", 26);
      \u0275\u0275text(71, "Partially Paid");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "option", 27);
      \u0275\u0275text(73, "Overdue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "option", 28);
      \u0275\u0275text(75, "Paid");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(76, "div", 29)(77, "div", 30)(78, "table", 31)(79, "thead", 32)(80, "tr")(81, "th", 33);
      \u0275\u0275text(82, "Invoice # & Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "th", 33);
      \u0275\u0275text(84, "Vendor Creditor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "th", 33);
      \u0275\u0275text(86, "Project Site");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "th", 33);
      \u0275\u0275text(88, "Total Amount (Incl. GST)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "th", 33);
      \u0275\u0275text(90, "Paid / Settled");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "th", 33);
      \u0275\u0275text(92, "Liability Balance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "th", 34);
      \u0275\u0275text(94, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "th", 35);
      \u0275\u0275text(96, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(97, "tbody", 36);
      \u0275\u0275template(98, InvoicesLiabilitiesComponent_tr_98_Template, 38, 20, "tr", 37)(99, InvoicesLiabilitiesComponent_tr_99_Template, 6, 0, "tr", 38);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(100, InvoicesLiabilitiesComponent_div_100_Template, 50, 8, "div", 39);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275textInterpolate1("\u20B9", (ctx.totalLiability / 1e5).toFixed(2), " Lakhs");
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1("\u20B9", (ctx.totalInvoiced / 1e5).toFixed(2), " Lakhs");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.invoices.length, " Tax Invoices Booked");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("\u20B9", (ctx.totalSettled / 1e5).toFixed(2), " Lakhs");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", (ctx.totalSettled / (ctx.totalInvoiced || 1) * 100).toFixed(0), "% Discharge Rate");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.pendingCount);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(33);
      \u0275\u0275property("ngForOf", ctx.filteredInvoices);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredInvoices.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showPaymentModal && ctx.selectedInvoice);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxValidator, NgModel, DatePipe], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=invoices-liabilities.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvoicesLiabilitiesComponent, [{
    type: Component,
    args: [{ selector: "app-invoices-liabilities", standalone: false, template: `<div class="bg-slate-50/50 dark:bg-slate-950 min-h-screen animate-in p-4 sm:p-6 lg:p-8">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Finance & Accounts Ledger
        </span>
      </div>
      <h1 class="text-3xl font-black text-slate-800 dark:text-white">Invoices & Liabilities</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm">
        Authoritative accounts payable register, outstanding contractor liabilities, tax invoices, and payment disbursements.
      </p>
    </div>
  </div>

  <!-- KPI Metrics Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
    <!-- Outstanding Liabilities -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 text-white shadow-lg shadow-rose-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Outstanding Liabilities</p>
          <h3 class="text-2xl font-black mt-2">\u20B9{{ (totalLiability / 100000).toFixed(2) }} Lakhs</h3>
          <p class="text-xs text-white/70 mt-1">Pending Accounts Payable</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">account_balance</span>
        </div>
      </div>
    </div>

    <!-- Total Invoiced -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Total Invoiced (Gross)</p>
          <h3 class="text-2xl font-black mt-2">\u20B9{{ (totalInvoiced / 100000).toFixed(2) }} Lakhs</h3>
          <p class="text-xs text-white/70 mt-1">{{ invoices.length }} Tax Invoices Booked</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">receipt_long</span>
        </div>
      </div>
    </div>

    <!-- Total Settled -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Total Settled / Paid</p>
          <h3 class="text-2xl font-black mt-2">\u20B9{{ (totalSettled / 100000).toFixed(2) }} Lakhs</h3>
          <p class="text-xs text-white/70 mt-1">{{ ((totalSettled / (totalInvoiced || 1)) * 100).toFixed(0) }}% Discharge Rate</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">check_circle</span>
        </div>
      </div>
    </div>

    <!-- Pending Invoices -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-amber-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Invoices Due / Pending</p>
          <h3 class="text-3xl font-black mt-2">{{ pendingCount }}</h3>
          <p class="text-xs text-white/70 mt-1">Requires Payment Clearance</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">pending_actions</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Search & Filter Controls -->
  <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-6 p-4 flex flex-col sm:flex-row items-center gap-4">
    <div class="relative flex-1 w-full">
      <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
      <input type="text" [(ngModel)]="searchQuery" (input)="filterInvoices()"
        placeholder="Search liabilities by invoice number, contractor vendor, or project..."
        class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/30 transition-all outline-none">
    </div>

    <div class="flex items-center gap-3 w-full sm:w-auto">
      <select [(ngModel)]="statusFilter" (change)="filterInvoices()"
        class="px-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none">
        <option value="All">All Invoices</option>
        <option value="Pending">Pending</option>
        <option value="Partially Paid">Partially Paid</option>
        <option value="Overdue">Overdue</option>
        <option value="Paid">Paid</option>
      </select>
    </div>
  </div>

  <!-- Invoices & Liabilities Table -->
  <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-600 dark:text-slate-300">
        <thead class="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th class="px-6 py-4">Invoice # & Date</th>
            <th class="px-6 py-4">Vendor Creditor</th>
            <th class="px-6 py-4">Project Site</th>
            <th class="px-6 py-4">Total Amount (Incl. GST)</th>
            <th class="px-6 py-4">Paid / Settled</th>
            <th class="px-6 py-4">Liability Balance</th>
            <th class="px-6 py-4 text-center">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
          <tr *ngFor="let inv of filteredInvoices" class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <span class="material-symbols-outlined text-[20px]">receipt</span>
                </div>
                <div>
                  <span class="text-xs font-black text-slate-900 dark:text-white font-mono">{{ inv.invoiceNumber }}</span>
                  <div class="text-[11px] text-slate-400 mt-0.5">Due: {{ inv.dueDate | date:'mediumDate' }}</div>
                </div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div class="font-bold text-slate-800 dark:text-slate-100">{{ inv.vendorName }}</div>
              <div class="text-[11px] text-slate-400">{{ inv.vendorCategory }}</div>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <span class="material-symbols-outlined text-slate-400 text-[16px]">domain</span>
                {{ inv.projectName }}
              </div>
            </td>

            <td class="px-6 py-4">
              <div class="font-black text-slate-900 dark:text-white">\u20B9{{ inv.totalAmount.toLocaleString('en-IN') }}</div>
              <div class="text-[10px] text-slate-400">GST: \u20B9{{ inv.taxAmount.toLocaleString('en-IN') }}</div>
            </td>

            <td class="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
              \u20B9{{ inv.paidAmount.toLocaleString('en-IN') }}
            </td>

            <td class="px-6 py-4">
              <span class="font-black text-sm" [class.text-rose-600]="inv.liabilityBalance > 0" [class.text-slate-400]="inv.liabilityBalance === 0">
                \u20B9{{ inv.liabilityBalance.toLocaleString('en-IN') }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              <span class="px-3 py-1 rounded-full text-[11px] font-black border" [ngClass]="getStatusClass(inv.status)">
                {{ inv.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-right">
              <button *ngIf="inv.liabilityBalance > 0" (click)="openPaymentModal(inv)"
                class="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px]">payments</span>
                Disburse
              </button>
              <span *ngIf="inv.liabilityBalance === 0" class="text-xs font-bold text-slate-400">Settled</span>
            </td>
          </tr>

          <tr *ngIf="filteredInvoices.length === 0">
            <td colspan="8" class="px-6 py-12 text-center text-slate-400">
              <span class="material-symbols-outlined text-4xl mb-2">find_in_page</span>
              <p class="font-medium text-sm">No invoice liabilities found matching your search.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Record Payment Modal -->
  <div *ngIf="showPaymentModal && selectedInvoice" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="text-xs font-mono font-bold text-emerald-600">Disburse Liability</span>
          <h2 class="text-xl font-black text-slate-800 dark:text-white">{{ selectedInvoice.invoiceNumber }}</h2>
          <p class="text-xs text-slate-500">{{ selectedInvoice.vendorName }}</p>
        </div>
        <button (click)="showPaymentModal = false" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-4 flex justify-between items-center">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Outstanding</span>
          <p class="text-lg font-black text-rose-600">\u20B9{{ selectedInvoice.liabilityBalance.toLocaleString('en-IN') }}</p>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Invoice</span>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300">\u20B9{{ selectedInvoice.totalAmount.toLocaleString('en-IN') }}</p>
        </div>
      </div>

      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Disbursement Amount (\u20B9) *</label>
          <input type="number" [(ngModel)]="paymentAmount" [max]="selectedInvoice.liabilityBalance"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Payment Channel / Mode</label>
          <select [(ngModel)]="paymentMode"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="NEFT">NEFT / RTGS Online Transfer</option>
            <option value="Cheque">Corporate Account Cheque</option>
            <option value="Demand Draft">Bank Demand Draft</option>
            <option value="Direct Debit">CMS Direct Debit</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Bank Reference / UTR Number</label>
          <input type="text" [(ngModel)]="paymentReference" placeholder="e.g. CMS-998234812"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-emerald-500">
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <button (click)="showPaymentModal = false" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          Cancel
        </button>
        <button (click)="recordPayment()" class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white shadow-lg shadow-emerald-500/20 cursor-pointer">
          Confirm Settlement
        </button>
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/modules/resources/invoices-liabilities/invoices-liabilities.scss */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=invoices-liabilities.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoicesLiabilitiesComponent, { className: "InvoicesLiabilitiesComponent", filePath: "app/modules/resources/invoices-liabilities/invoices-liabilities.ts", lineNumber: 27 });
})();

// src/app/modules/resources/site-labour-attendance/site-labour-attendance.ts
function SiteLabourAttendanceComponent_option_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275property("value", p_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.name);
  }
}
function SiteLabourAttendanceComponent_tr_110_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", log_r2.overtimeHours, "h OT/man ");
  }
}
function SiteLabourAttendanceComponent_tr_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 46)(1, "td", 39)(2, "div", 47)(3, "div", 48)(4, "span", 8);
    \u0275\u0275text(5, "engineering");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "div", 49);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 50)(10, "span", 51);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 52);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(14, "td", 39)(15, "div", 53);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 52);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 54);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 40)(23, "span", 55);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "td", 56)(26, "span", 57);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, SiteLabourAttendanceComponent_tr_110_div_28_Template, 2, 1, "div", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td", 59);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "td", 60);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "td", 40)(34, "span", 61);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const log_r2 = ctx.$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(log_r2.tradeType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", log_r2.skillLevel, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r2.contractorName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(log_r2.projectName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 24, log_r2.attendanceDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", log_r2.workLocation, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", log_r2.headcount, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", log_r2.shift, " Shift");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", log_r2.overtimeHours > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", log_r2.dailyWageRate, "/day ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u20B9", log_r2.totalCost.toLocaleString("en-IN"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-emerald-100", log_r2.status === "Verified")("text-emerald-700", log_r2.status === "Verified")("border-emerald-300", log_r2.status === "Verified")("bg-amber-100", log_r2.status !== "Verified")("text-amber-700", log_r2.status !== "Verified")("border-amber-300", log_r2.status !== "Verified");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r2.status, " ");
  }
}
function SiteLabourAttendanceComponent_tr_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 63)(2, "span", 64);
    \u0275\u0275text(3, "engineering");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 65);
    \u0275\u0275text(5, "No site labour attendance records found matching filters.");
    \u0275\u0275elementEnd()()();
  }
}
function SiteLabourAttendanceComponent_div_112_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275property("value", p_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.name);
  }
}
function SiteLabourAttendanceComponent_div_112_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66)(1, "div", 67)(2, "div", 68)(3, "div")(4, "span", 69);
    \u0275\u0275text(5, "Site Workforce Register");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 70);
    \u0275\u0275text(7, "Record Labour Attendance Gang");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 71);
    \u0275\u0275listener("click", function SiteLabourAttendanceComponent_div_112_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showAddModal = false);
    });
    \u0275\u0275elementStart(9, "span", 72);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 73)(12, "div")(13, "label", 74);
    \u0275\u0275text(14, "Project Site *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 75);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.projectId, $event) || (ctx_r3.newLog.projectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(16, SiteLabourAttendanceComponent_div_112_option_16_Template, 2, 2, "option", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "label", 74);
    \u0275\u0275text(19, "Attendance Date *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 76);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.attendanceDate, $event) || (ctx_r3.newLog.attendanceDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div")(22, "label", 74);
    \u0275\u0275text(23, "Trade Category *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 75);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.tradeType, $event) || (ctx_r3.newLog.tradeType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(25, "option", 30);
    \u0275\u0275text(26, "Carpenters & Shuttering");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 31);
    \u0275\u0275text(28, "Steel Fixers & Barbenders");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 32);
    \u0275\u0275text(30, "Masons & Plasterers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 33);
    \u0275\u0275text(32, "Electricians & Cable Pullers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 34);
    \u0275\u0275text(34, "General Helpers & Labourers");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div")(36, "label", 74);
    \u0275\u0275text(37, "Skill Level");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "select", 75);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_select_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.skillLevel, $event) || (ctx_r3.newLog.skillLevel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(39, "option", 77);
    \u0275\u0275text(40, "Skilled Tradesman");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 78);
    \u0275\u0275text(42, "Semi-Skilled Assistant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 79);
    \u0275\u0275text(44, "Unskilled Helper");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 80);
    \u0275\u0275text(46, "Gang Foreman / Supervisor");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div")(48, "label", 74);
    \u0275\u0275text(49, "Headcount (Number of Men) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.headcount, $event) || (ctx_r3.newLog.headcount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div")(52, "label", 74);
    \u0275\u0275text(53, "Daily Wage Rate (\u20B9/head) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_input_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.dailyWageRate, $event) || (ctx_r3.newLog.dailyWageRate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div")(56, "label", 74);
    \u0275\u0275text(57, "Shift");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "select", 75);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_select_ngModelChange_58_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.shift, $event) || (ctx_r3.newLog.shift = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(59, "option", 83);
    \u0275\u0275text(60, "Day Shift (08:00 - 17:00)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "option", 84);
    \u0275\u0275text(62, "Night Shift (20:00 - 05:00)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "option", 85);
    \u0275\u0275text(64, "Special Overtime Shift");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div")(66, "label", 74);
    \u0275\u0275text(67, "Overtime Hours (per worker)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_input_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.overtimeHours, $event) || (ctx_r3.newLog.overtimeHours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 87)(70, "label", 74);
    \u0275\u0275text(71, "Work Location / Site Zone *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "input", 88);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_input_ngModelChange_72_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.workLocation, $event) || (ctx_r3.newLog.workLocation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 87)(74, "label", 74);
    \u0275\u0275text(75, "Subcontractor / Labour Contractor Gang");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "input", 89);
    \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_div_112_Template_input_ngModelChange_76_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newLog.contractorName, $event) || (ctx_r3.newLog.contractorName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "div", 90)(78, "button", 91);
    \u0275\u0275listener("click", function SiteLabourAttendanceComponent_div_112_Template_button_click_78_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showAddModal = false);
    });
    \u0275\u0275text(79, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "button", 92);
    \u0275\u0275listener("click", function SiteLabourAttendanceComponent_div_112_Template_button_click_80_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveAttendance());
    });
    \u0275\u0275text(81, " Confirm Attendance Log ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.projectId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.projects);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.attendanceDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.tradeType);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.skillLevel);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.headcount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.dailyWageRate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.shift);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.overtimeHours);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.workLocation);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newLog.contractorName);
  }
}
var SiteLabourAttendanceComponent = class _SiteLabourAttendanceComponent {
  projectService;
  toastr;
  projects = [];
  selectedProjectId = "all";
  searchQuery = "";
  selectedTrade = "all";
  labourLogs = [
    {
      id: 1,
      projectId: 1,
      projectName: "Skyline Commercial Towers",
      attendanceDate: "2026-10-27",
      tradeType: "Carpenters & Shuttering",
      skillLevel: "Skilled",
      headcount: 18,
      shift: "Day",
      workLocation: "Tower A \u2022 6th Floor Deck",
      overtimeHours: 2,
      dailyWageRate: 850,
      totalCost: 19125,
      contractorName: "Om Shanti Construction Gang",
      notes: "Shuttering for main slab beam staging",
      status: "Verified"
    },
    {
      id: 2,
      projectId: 1,
      projectName: "Skyline Commercial Towers",
      attendanceDate: "2026-10-27",
      tradeType: "Steel Fixers & Barbenders",
      skillLevel: "Skilled",
      headcount: 14,
      shift: "Day",
      workLocation: "Tower A \u2022 Core Wall Reinforcement",
      overtimeHours: 1,
      dailyWageRate: 900,
      totalCost: 14175,
      contractorName: "Apex Subcontracting Services",
      notes: "Tying vertical dowels 32mm Fe550D",
      status: "Verified"
    },
    {
      id: 3,
      projectId: 2,
      projectName: "Metro Rail Corridor 4",
      attendanceDate: "2026-10-27",
      tradeType: "Masons & Plasterers",
      skillLevel: "Semi-Skilled",
      headcount: 22,
      shift: "Day",
      workLocation: "Station Concourse Level",
      overtimeHours: 0,
      dailyWageRate: 750,
      totalCost: 16500,
      contractorName: "National Infra Labourers",
      notes: "Blockwork masonry perimeter walls",
      status: "Verified"
    },
    {
      id: 4,
      projectId: 2,
      projectName: "Metro Rail Corridor 4",
      attendanceDate: "2026-10-27",
      tradeType: "Electricians & Cable Pullers",
      skillLevel: "Skilled",
      headcount: 8,
      shift: "Night",
      workLocation: "Trackbed Conduit Route 2",
      overtimeHours: 4,
      dailyWageRate: 950,
      totalCost: 11400,
      contractorName: "PowerTech Electricals",
      notes: "Night shift cable tray installation",
      status: "Pending Review"
    },
    {
      id: 5,
      projectId: 3,
      projectName: "Green Valley Residential Villas",
      attendanceDate: "2026-10-27",
      tradeType: "General Helpers & Labourers",
      skillLevel: "Unskilled",
      headcount: 35,
      shift: "Day",
      workLocation: "Roadway & Landscape Zone",
      overtimeHours: 0,
      dailyWageRate: 600,
      totalCost: 21e3,
      contractorName: "Kaveri Labour Syndicate",
      notes: "Earth leveling, material carrying and curing",
      status: "Verified"
    }
  ];
  filteredLogs = [];
  showAddModal = false;
  newLog = {
    projectId: 1,
    tradeType: "Carpenters & Shuttering",
    skillLevel: "Skilled",
    headcount: 10,
    shift: "Day",
    workLocation: "",
    overtimeHours: 0,
    dailyWageRate: 800,
    contractorName: "",
    notes: "",
    attendanceDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
  constructor(projectService, toastr) {
    this.projectService = projectService;
    this.toastr = toastr;
  }
  ngOnInit() {
    this.loadProjects();
    this.applyFilters();
  }
  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
      },
      error: () => {
        this.projects = [
          { id: 1, name: "Skyline Commercial Towers" },
          { id: 2, name: "Metro Rail Corridor 4" },
          { id: 3, name: "Green Valley Residential Villas" }
        ];
      }
    });
  }
  applyFilters() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredLogs = this.labourLogs.filter((log) => {
      const matchProject = this.selectedProjectId === "all" || String(log.projectId) === String(this.selectedProjectId);
      const matchTrade = this.selectedTrade === "all" || log.tradeType === this.selectedTrade;
      const matchSearch = !q || log.tradeType.toLowerCase().includes(q) || log.contractorName.toLowerCase().includes(q) || log.workLocation.toLowerCase().includes(q) || log.projectName.toLowerCase().includes(q);
      return matchProject && matchTrade && matchSearch;
    });
  }
  get totalPersonnel() {
    return this.filteredLogs.reduce((sum, l) => sum + (l.headcount || 0), 0);
  }
  get totalDailyCost() {
    return this.filteredLogs.reduce((sum, l) => sum + (l.totalCost || 0), 0);
  }
  get totalOvertimeHours() {
    return this.filteredLogs.reduce((sum, l) => sum + (l.overtimeHours * l.headcount || 0), 0);
  }
  openRecordModal() {
    this.newLog = {
      projectId: this.projects[0]?.id || 1,
      tradeType: "Carpenters & Shuttering",
      skillLevel: "Skilled",
      headcount: 10,
      shift: "Day",
      workLocation: "",
      overtimeHours: 0,
      dailyWageRate: 800,
      contractorName: "",
      notes: "",
      attendanceDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    this.showAddModal = true;
  }
  saveAttendance() {
    if (!this.newLog.workLocation || !this.newLog.headcount || !this.newLog.dailyWageRate) {
      this.toastr.warning("Please enter work location, headcount, and daily wage rate.");
      return;
    }
    const selectedProj = this.projects.find((p) => String(p.id) === String(this.newLog.projectId));
    const baseWage = (this.newLog.headcount || 0) * (this.newLog.dailyWageRate || 0);
    const otWage = (this.newLog.overtimeHours || 0) * ((this.newLog.dailyWageRate || 0) / 8 * 1.5) * (this.newLog.headcount || 0);
    const log = {
      id: Date.now(),
      projectId: this.newLog.projectId || 1,
      projectName: selectedProj ? selectedProj.name : "Active Site",
      attendanceDate: this.newLog.attendanceDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      tradeType: this.newLog.tradeType || "General Labour",
      skillLevel: this.newLog.skillLevel || "Skilled",
      headcount: Number(this.newLog.headcount),
      shift: this.newLog.shift || "Day",
      workLocation: this.newLog.workLocation || "Site Main",
      overtimeHours: Number(this.newLog.overtimeHours || 0),
      dailyWageRate: Number(this.newLog.dailyWageRate),
      totalCost: Math.round(baseWage + otWage),
      contractorName: this.newLog.contractorName || "Direct Gang",
      notes: this.newLog.notes || "",
      status: "Verified"
    };
    this.labourLogs.unshift(log);
    this.applyFilters();
    this.showAddModal = false;
    this.toastr.success("Labour attendance gang log recorded successfully.");
  }
  static \u0275fac = function SiteLabourAttendanceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SiteLabourAttendanceComponent)(\u0275\u0275directiveInject(ProjectService), \u0275\u0275directiveInject(ToastrService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SiteLabourAttendanceComponent, selectors: [["app-site-labour-attendance"]], standalone: false, decls: 113, vars: 11, consts: [[1, "bg-slate-50/50", "dark:bg-slate-950", "min-h-screen", "animate-in", "p-4", "sm:p-6", "lg:p-8"], [1, "flex", "flex-col", "sm:flex-row", "sm:justify-between", "sm:items-center", "gap-4", "mb-8"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "px-2.5", "py-0.5", "rounded-full", "bg-indigo-500/10", "text-indigo-600", "dark:text-indigo-400", "border", "border-indigo-500/20"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500", "dark:text-slate-400", "text-sm"], [1, "group", "relative", "overflow-hidden", "flex", "items-center", "justify-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]", "w-full", "sm:w-auto", "cursor-pointer", 3, "click"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "relative", "z-10", "tracking-wide", "text-sm"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-5", "mb-8"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-indigo-600", "via-blue-600", "to-indigo-800", "text-white", "shadow-lg", "shadow-indigo-500/15"], [1, "flex", "items-center", "justify-between"], [1, "text-[10px]", "uppercase", "tracking-widest", "text-white/80", "font-bold"], [1, "text-3xl", "font-black", "mt-2"], [1, "text-xs", "text-white/70", "mt-1"], [1, "w-13", "h-13", "rounded-2xl", "bg-white/20", "backdrop-blur-md", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-3xl"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-emerald-500", "via-teal-600", "to-emerald-700", "text-white", "shadow-lg", "shadow-emerald-500/15"], [1, "text-2xl", "font-black", "mt-2"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-amber-500", "via-orange-500", "to-amber-600", "text-white", "shadow-lg", "shadow-amber-500/15"], [1, "rounded-3xl", "p-5", "bg-gradient-to-br", "from-purple-500", "via-indigo-600", "to-purple-700", "text-white", "shadow-lg", "shadow-purple-500/15"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/80", "dark:border-slate-800", "shadow-sm", "mb-6", "p-4", "flex", "flex-col", "md:flex-row", "items-center", "gap-4"], [1, "relative", "flex-1", "w-full"], [1, "material-symbols-outlined", "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "text", "placeholder", "Search by trade type, subcontractor gang, or work grid location...", 1, "w-full", "pl-12", "pr-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "dark:text-white", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-indigo-500/30", "transition-all", "outline-none", 3, "ngModelChange", "input", "ngModel"], [1, "flex", "items-center", "gap-3", "w-full", "md:w-auto"], [1, "px-4", "py-3", "bg-slate-50", "dark:bg-slate-800", "dark:text-white", "rounded-2xl", "text-xs", "font-bold", "border", "border-slate-200", "dark:border-slate-700", "outline-none", "w-full", "md:w-auto", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], ["value", "Carpenters & Shuttering"], ["value", "Steel Fixers & Barbenders"], ["value", "Masons & Plasterers"], ["value", "Electricians & Cable Pullers"], ["value", "General Helpers & Labourers"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "border", "border-slate-200/80", "dark:border-slate-800", "shadow-xl", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-sm", "text-slate-600", "dark:text-slate-300"], [1, "bg-slate-50", "dark:bg-slate-800/60", "text-[11px]", "font-black", "uppercase", "tracking-wider", "text-slate-500", "border-b", "border-slate-200", "dark:border-slate-800"], [1, "px-6", "py-4"], [1, "px-6", "py-4", "text-center"], [1, "divide-y", "divide-slate-100", "dark:divide-slate-800/60"], ["class", "hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4", 4, "ngIf"], [3, "value"], [1, "hover:bg-slate-50/70", "dark:hover:bg-slate-800/40", "transition-colors"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-2xl", "bg-indigo-500/10", "text-indigo-600", "dark:text-indigo-400", "flex", "items-center", "justify-center", "shrink-0", "border", "border-indigo-500/20"], [1, "font-bold", "text-slate-900", "dark:text-white"], [1, "flex", "items-center", "gap-2", "mt-0.5"], [1, "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded-md", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300"], [1, "text-[11px]", "text-slate-400"], [1, "font-medium", "text-slate-800", "dark:text-slate-200"], [1, "px-6", "py-4", "text-xs", "font-semibold", "text-slate-700", "dark:text-slate-300"], [1, "inline-flex", "items-center", "justify-center", "w-8", "h-8", "rounded-xl", "bg-blue-50", "dark:bg-blue-900/40", "text-blue-700", "dark:text-blue-300", "font-black", "text-sm"], [1, "px-6", "py-4", "text-xs"], [1, "font-bold", "text-slate-800", "dark:text-slate-200"], ["class", "text-amber-600 font-bold text-[11px]", 4, "ngIf"], [1, "px-6", "py-4", "font-mono", "font-bold", "text-xs", "text-slate-800", "dark:text-slate-200"], [1, "px-6", "py-4", "font-black", "text-sm", "text-emerald-600", "dark:text-emerald-400"], [1, "px-3", "py-1", "rounded-full", "text-[11px]", "font-black", "border"], [1, "text-amber-600", "font-bold", "text-[11px]"], ["colspan", "8", 1, "px-6", "py-12", "text-center", "text-slate-400"], [1, "material-symbols-outlined", "text-4xl", "mb-2"], [1, "font-medium", "text-sm"], [1, "fixed", "inset-0", "z-50", "bg-slate-900/60", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-3xl", "max-w-xl", "w-full", "border", "border-slate-200", "dark:border-slate-800", "shadow-2xl", "p-6", "sm:p-8", "animate-in", "fade-in", "zoom-in-95"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-xs", "font-mono", "font-bold", "text-indigo-600"], [1, "text-xl", "font-black", "text-slate-800", "dark:text-white"], [1, "w-8", "h-8", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "text-slate-500", "hover:text-slate-800", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mb-4"], [1, "block", "text-xs", "font-bold", "text-slate-600", "dark:text-slate-300", "mb-1"], [1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel"], ["value", "Skilled"], ["value", "Semi-Skilled"], ["value", "Unskilled"], ["value", "Foreman"], ["type", "number", "min", "1", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "100", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel"], ["value", "Day"], ["value", "Night"], ["value", "Overtime"], ["type", "number", "min", "0", "step", "0.5", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel"], [1, "sm:col-span-2"], ["type", "text", "placeholder", "e.g. Tower A \u2022 6th Floor Deck \u2022 Beam Shuttering", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "e.g. Om Shanti Construction Gang", 1, "w-full", "px-4", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "text-sm", "outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "gap-3", "pt-2"], [1, "px-5", "py-2.5", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "font-bold", "text-xs", "text-slate-700", "dark:text-slate-300", "cursor-pointer", 3, "click"], [1, "px-6", "py-2.5", "rounded-xl", "bg-indigo-600", "hover:bg-indigo-700", "font-bold", "text-xs", "text-white", "shadow-lg", "shadow-indigo-500/20", "cursor-pointer", 3, "click"]], template: function SiteLabourAttendanceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "span", 3);
      \u0275\u0275text(5, " H.R & Payroll \u2022 Site Workforce ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "h1", 4);
      \u0275\u0275text(7, "Site Labour Attendance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9, " Daily muster roll, contractor gang logs, trade skills, shifts, overtime tracking, and statutory wage calculation. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "button", 6);
      \u0275\u0275listener("click", function SiteLabourAttendanceComponent_Template_button_click_10_listener() {
        return ctx.openRecordModal();
      });
      \u0275\u0275elementStart(11, "div", 7)(12, "span", 8);
      \u0275\u0275text(13, "person_add");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "span", 9);
      \u0275\u0275text(15, "Record Labour Gang");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 10)(17, "div", 11)(18, "div", 12)(19, "div")(20, "p", 13);
      \u0275\u0275text(21, "Total Personnel On-Site");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "h3", 14);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p", 15);
      \u0275\u0275text(25, "Active Tradesmen Today");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 16)(27, "span", 17);
      \u0275\u0275text(28, "groups");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(29, "div", 18)(30, "div", 12)(31, "div")(32, "p", 13);
      \u0275\u0275text(33, "Today's Wage Accrual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "h3", 19);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p", 15);
      \u0275\u0275text(37, "Labour Cost Attributed");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 16)(39, "span", 17);
      \u0275\u0275text(40, "payments");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "div", 20)(42, "div", 12)(43, "div")(44, "p", 13);
      \u0275\u0275text(45, "Overtime Man-Hours");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "h3", 14);
      \u0275\u0275text(47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 15);
      \u0275\u0275text(49, "1.5x Premium Wage Multiplier");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 16)(51, "span", 17);
      \u0275\u0275text(52, "schedule");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(53, "div", 21)(54, "div", 12)(55, "div")(56, "p", 13);
      \u0275\u0275text(57, "Gangs Verified");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "h3", 14);
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "p", 15);
      \u0275\u0275text(61, "Trade Muster Records");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div", 16)(63, "span", 17);
      \u0275\u0275text(64, "fact_check");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(65, "div", 22)(66, "div", 23)(67, "span", 24);
      \u0275\u0275text(68, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_Template_input_ngModelChange_69_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function SiteLabourAttendanceComponent_Template_input_input_69_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div", 26)(71, "select", 27);
      \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_Template_select_ngModelChange_71_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedProjectId, $event) || (ctx.selectedProjectId = $event);
        return $event;
      });
      \u0275\u0275listener("change", function SiteLabourAttendanceComponent_Template_select_change_71_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(72, "option", 28);
      \u0275\u0275text(73, "All Projects");
      \u0275\u0275elementEnd();
      \u0275\u0275template(74, SiteLabourAttendanceComponent_option_74_Template, 2, 2, "option", 29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "select", 27);
      \u0275\u0275twoWayListener("ngModelChange", function SiteLabourAttendanceComponent_Template_select_ngModelChange_75_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedTrade, $event) || (ctx.selectedTrade = $event);
        return $event;
      });
      \u0275\u0275listener("change", function SiteLabourAttendanceComponent_Template_select_change_75_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(76, "option", 28);
      \u0275\u0275text(77, "All Trade Gangs");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "option", 30);
      \u0275\u0275text(79, "Carpenters & Shuttering");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "option", 31);
      \u0275\u0275text(81, "Steel Fixers & Barbenders");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "option", 32);
      \u0275\u0275text(83, "Masons & Plasterers");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "option", 33);
      \u0275\u0275text(85, "Electricians & Cable Pullers");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "option", 34);
      \u0275\u0275text(87, "General Helpers & Labourers");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(88, "div", 35)(89, "div", 36)(90, "table", 37)(91, "thead", 38)(92, "tr")(93, "th", 39);
      \u0275\u0275text(94, "Trade Gang & Skill");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "th", 39);
      \u0275\u0275text(96, "Project Site");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "th", 39);
      \u0275\u0275text(98, "Work Location");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "th", 40);
      \u0275\u0275text(100, "Headcount");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(101, "th", 39);
      \u0275\u0275text(102, "Shift & OT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "th", 39);
      \u0275\u0275text(104, "Daily Wage Rate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "th", 39);
      \u0275\u0275text(106, "Total Cost");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(107, "th", 40);
      \u0275\u0275text(108, "Status");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(109, "tbody", 41);
      \u0275\u0275template(110, SiteLabourAttendanceComponent_tr_110_Template, 36, 27, "tr", 42)(111, SiteLabourAttendanceComponent_tr_111_Template, 6, 0, "tr", 43);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(112, SiteLabourAttendanceComponent_div_112_Template, 82, 11, "div", 44);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275textInterpolate(ctx.totalPersonnel);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1("\u20B9", ctx.totalDailyCost.toLocaleString("en-IN"));
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1("", ctx.totalOvertimeHours, " hrs");
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.filteredLogs.length);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedProjectId);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.projects);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedTrade);
      \u0275\u0275advance(35);
      \u0275\u0275property("ngForOf", ctx.filteredLogs);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredLogs.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAddModal);
    }
  }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, DatePipe], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=site-labour-attendance.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SiteLabourAttendanceComponent, [{
    type: Component,
    args: [{ selector: "app-site-labour-attendance", standalone: false, template: `<div class="bg-slate-50/50 dark:bg-slate-950 min-h-screen animate-in p-4 sm:p-6 lg:p-8">
  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          H.R & Payroll \u2022 Site Workforce
        </span>
      </div>
      <h1 class="text-3xl font-black text-slate-800 dark:text-white">Site Labour Attendance</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm">
        Daily muster roll, contractor gang logs, trade skills, shifts, overtime tracking, and statutory wage calculation.
      </p>
    </div>

    <button (click)="openRecordModal()"
      class="group relative overflow-hidden flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(58,102,176,0.35)] hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)] hover:-translate-y-1 bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] w-full sm:w-auto cursor-pointer">
      <div class="relative z-10 w-6 h-6 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
        <span class="material-symbols-outlined text-[20px]">person_add</span>
      </div>
      <span class="relative z-10 tracking-wide text-sm">Record Labour Gang</span>
    </button>
  </div>

  <!-- KPI Metrics Banner -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
    <!-- Total Workforce -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 text-white shadow-lg shadow-indigo-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Total Personnel On-Site</p>
          <h3 class="text-3xl font-black mt-2">{{ totalPersonnel }}</h3>
          <p class="text-xs text-white/70 mt-1">Active Tradesmen Today</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">groups</span>
        </div>
      </div>
    </div>

    <!-- Daily Wage Commitment -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Today's Wage Accrual</p>
          <h3 class="text-2xl font-black mt-2">\u20B9{{ totalDailyCost.toLocaleString('en-IN') }}</h3>
          <p class="text-xs text-white/70 mt-1">Labour Cost Attributed</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">payments</span>
        </div>
      </div>
    </div>

    <!-- Overtime Hours -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg shadow-amber-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Overtime Man-Hours</p>
          <h3 class="text-3xl font-black mt-2">{{ totalOvertimeHours }} hrs</h3>
          <p class="text-xs text-white/70 mt-1">1.5x Premium Wage Multiplier</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">schedule</span>
        </div>
      </div>
    </div>

    <!-- Gangs Logged -->
    <div class="rounded-3xl p-5 bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-500/15">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-white/80 font-bold">Gangs Verified</p>
          <h3 class="text-3xl font-black mt-2">{{ filteredLogs.length }}</h3>
          <p class="text-xs text-white/70 mt-1">Trade Muster Records</p>
        </div>
        <div class="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">fact_check</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Search & Project Filters -->
  <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-6 p-4 flex flex-col md:flex-row items-center gap-4">
    <!-- Search Bar -->
    <div class="relative flex-1 w-full">
      <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
      <input type="text" [(ngModel)]="searchQuery" (input)="applyFilters()"
        placeholder="Search by trade type, subcontractor gang, or work grid location..."
        class="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none">
    </div>

    <!-- Project Filter -->
    <div class="flex items-center gap-3 w-full md:w-auto">
      <select [(ngModel)]="selectedProjectId" (change)="applyFilters()"
        class="px-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none w-full md:w-auto">
        <option value="all">All Projects</option>
        <option *ngFor="let p of projects" [value]="p.id">{{ p.name }}</option>
      </select>

      <!-- Trade Filter -->
      <select [(ngModel)]="selectedTrade" (change)="applyFilters()"
        class="px-4 py-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-700 outline-none w-full md:w-auto">
        <option value="all">All Trade Gangs</option>
        <option value="Carpenters & Shuttering">Carpenters & Shuttering</option>
        <option value="Steel Fixers & Barbenders">Steel Fixers & Barbenders</option>
        <option value="Masons & Plasterers">Masons & Plasterers</option>
        <option value="Electricians & Cable Pullers">Electricians & Cable Pullers</option>
        <option value="General Helpers & Labourers">General Helpers & Labourers</option>
      </select>
    </div>
  </div>

  <!-- Attendance Table -->
  <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-600 dark:text-slate-300">
        <thead class="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th class="px-6 py-4">Trade Gang & Skill</th>
            <th class="px-6 py-4">Project Site</th>
            <th class="px-6 py-4">Work Location</th>
            <th class="px-6 py-4 text-center">Headcount</th>
            <th class="px-6 py-4">Shift & OT</th>
            <th class="px-6 py-4">Daily Wage Rate</th>
            <th class="px-6 py-4">Total Cost</th>
            <th class="px-6 py-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
          <tr *ngFor="let log of filteredLogs" class="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                  <span class="material-symbols-outlined text-[20px]">engineering</span>
                </div>
                <div>
                  <div class="font-bold text-slate-900 dark:text-white">{{ log.tradeType }}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {{ log.skillLevel }}
                    </span>
                    <span class="text-[11px] text-slate-400">{{ log.contractorName }}</span>
                  </div>
                </div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div class="font-medium text-slate-800 dark:text-slate-200">{{ log.projectName }}</div>
              <div class="text-[11px] text-slate-400">{{ log.attendanceDate | date:'mediumDate' }}</div>
            </td>

            <td class="px-6 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ log.workLocation }}
            </td>

            <td class="px-6 py-4 text-center">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-black text-sm">
                {{ log.headcount }}
              </span>
            </td>

            <td class="px-6 py-4 text-xs">
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ log.shift }} Shift</span>
              <div *ngIf="log.overtimeHours > 0" class="text-amber-600 font-bold text-[11px]">
                +{{ log.overtimeHours }}h OT/man
              </div>
            </td>

            <td class="px-6 py-4 font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
              \u20B9{{ log.dailyWageRate }}/day
            </td>

            <td class="px-6 py-4 font-black text-sm text-emerald-600 dark:text-emerald-400">
              \u20B9{{ log.totalCost.toLocaleString('en-IN') }}
            </td>

            <td class="px-6 py-4 text-center">
              <span class="px-3 py-1 rounded-full text-[11px] font-black border"
                [class.bg-emerald-100]="log.status === 'Verified'"
                [class.text-emerald-700]="log.status === 'Verified'"
                [class.border-emerald-300]="log.status === 'Verified'"
                [class.bg-amber-100]="log.status !== 'Verified'"
                [class.text-amber-700]="log.status !== 'Verified'"
                [class.border-amber-300]="log.status !== 'Verified'">
                {{ log.status }}
              </span>
            </td>
          </tr>

          <tr *ngIf="filteredLogs.length === 0">
            <td colspan="8" class="px-6 py-12 text-center text-slate-400">
              <span class="material-symbols-outlined text-4xl mb-2">engineering</span>
              <p class="font-medium text-sm">No site labour attendance records found matching filters.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Record Labour Attendance Modal -->
  <div *ngIf="showAddModal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="text-xs font-mono font-bold text-indigo-600">Site Workforce Register</span>
          <h2 class="text-xl font-black text-slate-800 dark:text-white">Record Labour Attendance Gang</h2>
        </div>
        <button (click)="showAddModal = false" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Project Site *</label>
          <select [(ngModel)]="newLog.projectId"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <option *ngFor="let p of projects" [value]="p.id">{{ p.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Attendance Date *</label>
          <input type="date" [(ngModel)]="newLog.attendanceDate"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Trade Category *</label>
          <select [(ngModel)]="newLog.tradeType"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="Carpenters & Shuttering">Carpenters & Shuttering</option>
            <option value="Steel Fixers & Barbenders">Steel Fixers & Barbenders</option>
            <option value="Masons & Plasterers">Masons & Plasterers</option>
            <option value="Electricians & Cable Pullers">Electricians & Cable Pullers</option>
            <option value="General Helpers & Labourers">General Helpers & Labourers</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Skill Level</label>
          <select [(ngModel)]="newLog.skillLevel"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="Skilled">Skilled Tradesman</option>
            <option value="Semi-Skilled">Semi-Skilled Assistant</option>
            <option value="Unskilled">Unskilled Helper</option>
            <option value="Foreman">Gang Foreman / Supervisor</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Headcount (Number of Men) *</label>
          <input type="number" min="1" [(ngModel)]="newLog.headcount"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Daily Wage Rate (\u20B9/head) *</label>
          <input type="number" min="100" [(ngModel)]="newLog.dailyWageRate"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Shift</label>
          <select [(ngModel)]="newLog.shift"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="Day">Day Shift (08:00 - 17:00)</option>
            <option value="Night">Night Shift (20:00 - 05:00)</option>
            <option value="Overtime">Special Overtime Shift</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Overtime Hours (per worker)</label>
          <input type="number" min="0" step="0.5" [(ngModel)]="newLog.overtimeHours"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
        </div>

        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Work Location / Site Zone *</label>
          <input type="text" [(ngModel)]="newLog.workLocation" placeholder="e.g. Tower A \u2022 6th Floor Deck \u2022 Beam Shuttering"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
        </div>

        <div class="sm:col-span-2">
          <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Subcontractor / Labour Contractor Gang</label>
          <input type="text" [(ngModel)]="newLog.contractorName" placeholder="e.g. Om Shanti Construction Gang"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button (click)="showAddModal = false" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          Cancel
        </button>
        <button (click)="saveAttendance()" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white shadow-lg shadow-indigo-500/20 cursor-pointer">
          Confirm Attendance Log
        </button>
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/modules/resources/site-labour-attendance/site-labour-attendance.scss */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=site-labour-attendance.css.map */\n"] }]
  }], () => [{ type: ProjectService }, { type: ToastrService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SiteLabourAttendanceComponent, { className: "SiteLabourAttendanceComponent", filePath: "app/modules/resources/site-labour-attendance/site-labour-attendance.ts", lineNumber: 29 });
})();

// src/app/modules/resources/resources-routing-module.ts
var routes = [
  { path: "materials", component: Materials },
  { path: "contracts", component: Contracts },
  { path: "equipment-inventory", component: EquipmentInventory },
  { path: "equipment-transfer", component: EquipmentInventory, data: { mode: "transfer" } },
  { path: "quotations", component: Quotations },
  { path: "quotations/new", component: NewQuotations },
  { path: "invoices-liabilities", component: InvoicesLiabilitiesComponent },
  { path: "site-labour-attendance", component: SiteLabourAttendanceComponent }
];
var ResourcesRoutingModule = class _ResourcesRoutingModule {
  static \u0275fac = function ResourcesRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResourcesRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ResourcesRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResourcesRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/resources/resources-module.ts
var ResourcesModule = class _ResourcesModule {
  static \u0275fac = function ResourcesModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResourcesModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ResourcesModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, ResourcesRoutingModule, FormsModule, VendorAddComponent, CommonDialogComponent] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResourcesModule, [{
    type: NgModule,
    args: [{
      declarations: [Materials, Contracts, EquipmentInventory, Quotations, NewQuotations, InvoicesLiabilitiesComponent, SiteLabourAttendanceComponent],
      imports: [CommonModule, ResourcesRoutingModule, FormsModule, VendorAddComponent, CommonDialogComponent]
    }]
  }], null, null);
})();
export {
  ResourcesModule
};
//# sourceMappingURL=chunk-VPX3IYNB.js.map
