import {
  CategoryServeice,
  Equipment,
  MaterialMasterService
} from "./chunk-R2A3OHD2.js";
import {
  VendorsServices
} from "./chunk-PVCBN2NP.js";
import {
  CommonDialogComponent
} from "./chunk-WS53KIOQ.js";
import {
  ToastrService
} from "./chunk-YLGXRPVA.js";
import {
  environment
} from "./chunk-M3DYL5PG.js";
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
} from "./chunk-WFU7JF4C.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  EventEmitter,
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
  catchError,
  inject,
  setClassMetadata,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
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
} from "./chunk-F27QM527.js";

// src/app/shared/services/materials/materials.ts
var MaterialService = class _MaterialService {
  http;
  baseUrl = `${environment.serverUrl}/api/v1`;
  apiUrlGetAllMaterials = `${this.baseUrl}/getAllMaterials`;
  apiUrlCreateMaterial = `${this.baseUrl}/createMaterial`;
  apiUrlUpdateMaterial = `${this.baseUrl}/updateMaterial`;
  apiUrlDeleteMaterial = `${this.baseUrl}/deleteMaterial`;
  apiUrlMaterialStockTransfer = `${this.baseUrl}/material_stock_transfer`;
  materialsSubject = new BehaviorSubject([]);
  materials$ = this.materialsSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadMaterials() {
    this.http.get(this.apiUrlGetAllMaterials).subscribe({
      next: (res) => {
        if (res?.message === "Success") {
          this.materialsSubject.next(res.data || []);
        } else {
          this.materialsSubject.next([]);
        }
      },
      error: (err) => {
        console.error("[loadMaterials]", err);
        this.materialsSubject.next([]);
      }
    });
  }
  // 👇 agar sirf current value chahiye
  getMaterials() {
    return this.materialsSubject.value;
  }
  addMaterial(material) {
    return this.http.post(this.apiUrlCreateMaterial, material).pipe(tap((res) => {
      if (res?.success) {
        const current = this.materialsSubject.value;
        this.materialsSubject.next([...current || [], res.data]);
      }
    }), catchError((err) => {
      console.error("[addMaterial]", err);
      return throwError(() => err);
    }));
  }
  // UPDATE
  updateMaterial(id, data) {
    return this.http.put(`${this.apiUrlUpdateMaterial}/${id}`, data);
  }
  material_stock_transfer(id, data) {
    return this.http.put(`${this.apiUrlMaterialStockTransfer}/${id}`, data);
  }
  // DELETE
  deleteMaterial(id) {
    return this.http.delete(`${this.apiUrlDeleteMaterial}/${id}`);
  }
  getMaterialBySku(sku) {
    return this.materialsSubject.value.find((m) => m.sku === sku);
  }
  getProjects() {
    return this.http.get(`${this.baseUrl}/projects`);
  }
  static \u0275fac = function MaterialService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaterialService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MaterialService, factory: _MaterialService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

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
function Materials_For_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 101);
    \u0275\u0275listener("click", function Materials_For_41_Template_button_click_0_listener() {
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
function Materials_For_75_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 122);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length, " ", (item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) === 1 ? "Project" : "Projects", " ");
  }
}
function Materials_For_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 30)(1, "td", 102)(2, "div", 103)(3, "div", 104);
    \u0275\u0275element(4, "div", 105);
    \u0275\u0275elementStart(5, "span", 106);
    \u0275\u0275text(6, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 2)(8, "p", 107);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 33)(11, "span", 108);
    \u0275\u0275text(12, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 109);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 110)(16, "span", 111);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 110)(19, "div", 112)(20, "div", 113)(21, "div", 114)(22, "span", 115);
    \u0275\u0275text(23, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "span", 116);
    \u0275\u0275text(27, "Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 117);
    \u0275\u0275element(29, "div", 118);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "td", 110)(31, "div", 119);
    \u0275\u0275listener("click", function Materials_For_75_Template_div_click_31_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) > 0 && ctx_r2.openProjectStockPopup(item_r5));
    });
    \u0275\u0275elementStart(32, "div", 120)(33, "span", 35);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 121);
    \u0275\u0275conditionalCreate(36, Materials_For_75_Conditional_36_Template, 2, 2, "span", 122);
    \u0275\u0275elementStart(37, "span", 123);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "span", 124);
    \u0275\u0275text(40, " arrow_forward_ios ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "td", 110)(42, "div", 125)(43, "span", 126);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 127);
    \u0275\u0275text(46, " Per Unit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "td", 110)(48, "div", 23)(49, "div", 128);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div")(52, "p", 129);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 130);
    \u0275\u0275text(55, " Verified Supplier ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "td", 131)(57, "div", 132)(58, "div", 33)(59, "button", 133);
    \u0275\u0275listener("click", function Materials_For_75_Template_button_click_59_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAssignProjectModal(item_r5));
    });
    \u0275\u0275elementStart(60, "span", 35);
    \u0275\u0275text(61, " assignment_ind ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "button", 134);
    \u0275\u0275listener("click", function Materials_For_75_Template_button_click_62_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openStockTransferModal(item_r5));
    });
    \u0275\u0275elementStart(63, "span", 35);
    \u0275\u0275text(64, " transfer_within_a_station ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "button", 135);
    \u0275\u0275listener("click", function Materials_For_75_Template_button_click_65_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r5));
    });
    \u0275\u0275elementStart(66, "span", 35);
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
    \u0275\u0275textInterpolate1(" \u20B9", item_r5.cost, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", item_r5.vendor_name.charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r5.vendor_name, " ");
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", !(item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length))("ngClass", (item_r5.material_project_stock == null ? null : item_r5.material_project_stock.length) ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50");
  }
}
function Materials_For_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 136);
    \u0275\u0275listener("click", function Materials_For_84_Template_button_click_0_listener() {
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
function Materials_option_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r8 = ctx.$implicit;
    \u0275\u0275property("value", material_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", material_r8.name, " ");
  }
}
function Materials_For_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275property("value", p_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r9.name);
  }
}
function Materials_For_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r10 = ctx.$implicit;
    \u0275\u0275property("value", v_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r10.name);
  }
}
function Materials_Conditional_143_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r12 = ctx.$implicit;
    \u0275\u0275property("value", p_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r12.name);
  }
}
function Materials_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "label", 41);
    \u0275\u0275text(4, "Material Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 137);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_143_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.name, $event) || (ctx_r2.materialToEdit.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 41);
    \u0275\u0275text(8, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 138);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_143_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.sku, $event) || (ctx_r2.materialToEdit.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "label", 41);
    \u0275\u0275text(12, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 139);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_143_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.category, $event) || (ctx_r2.materialToEdit.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 47);
    \u0275\u0275text(15, "Concrete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 48);
    \u0275\u0275text(17, "Steel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 49);
    \u0275\u0275text(19, "Electrical");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 50);
    \u0275\u0275text(21, "Lumber");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 51);
    \u0275\u0275text(23, "Finishing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 52);
    \u0275\u0275text(25, "Chemicals");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div")(27, "label", 41);
    \u0275\u0275text(28, " Stock In");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 140);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_143_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.stockIn, $event) || (ctx_r2.materialToEdit.stockIn = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "label", 41);
    \u0275\u0275text(32, " Cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_143_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.cost, $event) || (ctx_r2.materialToEdit.cost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function Materials_Conditional_143_Template_input_blur_33_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.formatCostEdit());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div")(35, "label", 41);
    \u0275\u0275text(36, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 42);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_Conditional_143_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.project_id, $event) || (ctx_r2.materialToEdit.project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function Materials_Conditional_143_Template_select_change_37_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.getProject($event));
    });
    \u0275\u0275repeaterCreate(38, Materials_Conditional_143_For_39_Template, 2, 2, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.sku);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.category);
    \u0275\u0275advance(16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.stockIn);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.cost);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.project_id);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function Materials_For_160_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 146);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r15 = ctx.$implicit;
    \u0275\u0275property("ngValue", project_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r15.name, " ");
  }
}
function Materials_For_160_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 142)(2, "div", 143)(3, "label", 144);
    \u0275\u0275text(4, " Select Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 145);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_For_160_Template_select_ngModelChange_5_listener($event) {
      const item_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(item_r14.project_id, $event) || (item_r14.project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function Materials_For_160_Template_select_change_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.validateAssignedStock());
    });
    \u0275\u0275elementStart(6, "option", 146);
    \u0275\u0275text(7, " Choose Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, Materials_For_160_For_9_Template, 2, 2, "option", 146, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 147)(11, "label", 144);
    \u0275\u0275text(12, " Stock Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 148);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_For_160_Template_input_ngModelChange_13_listener($event) {
      const item_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(item_r14.stock, $event) || (item_r14.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function Materials_For_160_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.validateAssignedStock());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 149)(15, "button", 150);
    \u0275\u0275listener("click", function Materials_For_160_Template_button_click_15_listener() {
      const $index_r16 = \u0275\u0275restoreView(_r13).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeProjectRow($index_r16));
    });
    \u0275\u0275elementStart(16, "span", 35);
    \u0275\u0275text(17, " delete ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", item_r14.project_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", item_r14.stock);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.assignedProjects.length === 1);
  }
}
function Materials_Conditional_177_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "span", 69);
    \u0275\u0275text(2, " error ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 151);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.projectAssignError, " ");
  }
}
function Materials_Conditional_179_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77)(1, "p", 152);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 153);
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
function Materials_Conditional_182_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80)(1, "div", 154)(2, "span", 155);
    \u0275\u0275text(3, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h4", 126);
    \u0275\u0275text(5, " No Project Assigned ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 156);
    \u0275\u0275text(7, " This material is not assigned to any project yet. ");
    \u0275\u0275elementEnd()();
  }
}
function Materials_Conditional_183_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 157)(1, "div", 132)(2, "div", 103)(3, "div", 158)(4, "span", 97);
    \u0275\u0275text(5, " apartment ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h4", 122);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 159);
    \u0275\u0275text(10, " Assigned Project ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 73)(12, "h4", 72);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 160);
    \u0275\u0275text(15, " Units ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", p_r17.project_name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", p_r17.stockUsed, " ");
  }
}
function Materials_Conditional_183_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275repeaterCreate(1, Materials_Conditional_183_For_2_Template, 16, 2, "div", 157, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.selectedProjectStock.material_project_stock);
  }
}
function Materials_Conditional_184_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 161);
    \u0275\u0275listener("click", function Materials_Conditional_184_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 162);
    \u0275\u0275listener("click", function Materials_Conditional_184_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 163);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 94)(5, "div")(6, "label", 164);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 165)(9, "option");
    \u0275\u0275text(10, "Usage Rate (Highest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option");
    \u0275\u0275text(12, "Usage Rate (Lowest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option");
    \u0275\u0275text(14, "Stock Level (Asc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option");
    \u0275\u0275text(16, "Stock Level (Desc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option");
    \u0275\u0275text(18, "Newest Additions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div")(20, "label", 164);
    \u0275\u0275text(21, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 166)(23, "button", 167);
    \u0275\u0275text(24, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 168);
    \u0275\u0275text(26, "Preferred");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 168);
    \u0275\u0275text(28, "New");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "button", 169);
    \u0275\u0275listener("click", function Materials_Conditional_184_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275text(30, "Apply Filters");
    \u0275\u0275elementEnd()()();
  }
}
function Materials_For_203_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 179);
    \u0275\u0275listener("click", function Materials_For_203_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const $index_r21 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeTransferRow($index_r21));
    });
    \u0275\u0275elementStart(1, "span", 35);
    \u0275\u0275text(2, " delete ");
    \u0275\u0275elementEnd()();
  }
}
function Materials_For_203_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r23 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", p_r23.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r23.name, " (Stock : ", ctx_r2.getProjectStock(p_r23.id), ") ");
  }
}
function Materials_For_203_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 174)(1, "div", 180)(2, "div", 33)(3, "span", 181);
    \u0275\u0275text(4, " inventory ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 182);
    \u0275\u0275text(6, " Available Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 183);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectStock(item_r22.from_project_id), " ");
  }
}
function Materials_For_203_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r24 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", p_r24.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r24.name, " (Stock : ", ctx_r2.getProjectStock(p_r24.id), ") ");
  }
}
function Materials_For_203_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 177)(1, "div", 180)(2, "div", 33)(3, "span", 184);
    \u0275\u0275text(4, " warehouse ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 185);
    \u0275\u0275text(6, " Current Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 186);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectStock(item_r22.to_project_id), " ");
  }
}
function Materials_For_203_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275conditionalCreate(1, Materials_For_203_Conditional_1_Template, 3, 0, "button", 170);
    \u0275\u0275elementStart(2, "div", 171)(3, "div")(4, "label", 98);
    \u0275\u0275text(5, " From Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 172);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_For_203_Template_select_ngModelChange_6_listener($event) {
      const item_r22 = \u0275\u0275restoreView(_r19).$implicit;
      \u0275\u0275twoWayBindingSet(item_r22.from_project_id, $event) || (item_r22.from_project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(7, "option", 173);
    \u0275\u0275text(8, "Select Project");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, Materials_For_203_For_10_Template, 2, 3, "option", 53, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, Materials_For_203_Conditional_11_Template, 9, 1, "div", 174);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 175)(13, "div", 176)(14, "span", 97);
    \u0275\u0275text(15, " east ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div")(17, "label", 98);
    \u0275\u0275text(18, " To Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 172);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_For_203_Template_select_ngModelChange_19_listener($event) {
      const item_r22 = \u0275\u0275restoreView(_r19).$implicit;
      \u0275\u0275twoWayBindingSet(item_r22.to_project_id, $event) || (item_r22.to_project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 173);
    \u0275\u0275text(21, "Select Project");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, Materials_For_203_For_23_Template, 2, 3, "option", 53, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, Materials_For_203_Conditional_24_Template, 9, 1, "div", 177);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div")(26, "label", 98);
    \u0275\u0275text(27, " Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 178);
    \u0275\u0275twoWayListener("ngModelChange", function Materials_For_203_Template_input_ngModelChange_28_listener($event) {
      const item_r22 = \u0275\u0275restoreView(_r19).$implicit;
      \u0275\u0275twoWayBindingSet(item_r22.quantity, $event) || (item_r22.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.stockTransferData.transfers.length > 1 ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", item_r22.from_project_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r22.from_project_id ? 11 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", item_r22.to_project_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r22.to_project_id ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r22.quantity);
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
          // 👈 name bhi jayega
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
      console.log("Add new vendor selected", this.showAddVendorModal, value);
      this.newMaterial.vendor_id = "";
      return;
    }
    const vendor = this.vendors.find((v) => v.id == value);
    this.newMaterial.vendor_name = vendor?.name || "";
    this.newMaterial.vendor_id = value || "";
    console.log(vendor, "selected vendor");
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
    const totalQty = this.getTotalTransferQty();
    if (totalQty > this.stockTransferData.stockIn) {
      this.toast.error("Total transfer quantity exceeds available stock");
      return;
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
        this.toast.success("Material transferred successfully");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Materials, selectors: [["app-materials"]], standalone: false, decls: 213, vars: 62, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-on-surface-variant/80", "font-medium"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-6"], [1, "bg-surface-container-lowest", "p-6", "rounded-xl", "border", "border-outline-variant/10", "shadow-sm", "flex", "flex-col", "justify-between", "h-32"], [1, "text-xs", "font-bold", "uppercase", "tracking-widest", "text-outline"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-black"], [1, "text-xs", "font-bold", "text-green-600"], [1, "bg-surface-container-lowest", "p-6", "rounded-xl", "border", "border-outline-variant/10", "shadow-sm", "flex", "flex-col", "justify-between", "h-32", "border-l-4", "border-l-secondary-container"], [1, "text-3xl", "font-black", "text-secondary"], [1, "material-symbols-outlined", "text-secondary-container", 2, "font-variation-settings", "'FILL' 1"], [1, "text-3xl", "font-black", "text-primary"], [1, "material-symbols-outlined", "text-outline"], [1, "flex", "items-center", "gap-2", "overflow-x-auto", "hide-scrollbar", "pb-1"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "class"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200/60", "dark:border-slate-800", "shadow-sm", "overflow-hidden"], [1, "overflow-hidden", "rounded-[30px]", "border", "border-slate-200/60", "dark:border-slate-800", "bg-white/80", "dark:bg-slate-900/80", "backdrop-blur-xl", "shadow-[0_20px_60px_rgba(0,0,0,0.08)]"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "justify-between", "gap-4", "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "bg-gradient-to-r", "from-slate-50", "via-white", "to-slate-100", "dark:from-slate-900", "dark:via-slate-900", "dark:to-slate-950"], [1, "text-2xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-sm", "text-slate-500", "dark:text-slate-400", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-3", "h-11", "px-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search materials...", 1, "w-full", "bg-transparent", "outline-none", "text-sm", "font-medium", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "px-4", "py-4"], [1, "w-full", "min-w-[1150px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[9999]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4", "px-6", "py-5", "bg-slate-50", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-primary", "hover:text-white", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "ngClass"], ["title", "New Inventory Item", "icon", "inventory_2", "cancelLabel", "Cancel", "primaryLabel", "Add to Inventory", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModelChange", "change", "ngModel"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModelChange", "ngModel"], ["value", "Concrete"], ["value", "Steel"], ["value", "Electrical"], ["value", "Lumber"], ["value", "Finishing"], ["value", "Chemicals"], [3, "value"], ["type", "number", "min", "1", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["min", "1", "type", "number", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "blur", "ngModel"], ["value", "", "disabled", "", "selected", ""], ["value", "ADD_NEW", 1, "text-primary", "font-bold"], ["title", "Edit Material", "icon", "edit_square", "cancelLabel", "Cancel", "primaryLabel", "Save Changes", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], ["title", "Assign Material", "subtitle", "Allocate stock project wise", "cancelLabel", "Cancel", "primaryLabel", "Assign Stock", "panelClass", "max-w-3xl", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], [1, "p-6"], [1, "mb-6", "p-4", "rounded-2xl", "bg-slate-50", "dark:bg-slate-800/40", "border", "border-slate-200", "dark:border-slate-700"], [1, "text-[10px]", "uppercase", "tracking-[0.2em]", "font-black", "text-slate-400", "mb-1"], [1, "text-sm", "md:text-base", "font-black", "text-slate-900", "dark:text-white"], [1, "md:text-right"], [1, "text-lg", "font-black", "text-emerald-600"], [1, "space-y-3"], [1, "p-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/60", "dark:bg-slate-800/30", "transition-all"], ["type", "button", 1, "mt-5", "w-full", "border-2", "border-dashed", "border-indigo-300", "dark:border-indigo-700", "rounded-2xl", "py-3.5", "text-indigo-600", "dark:text-indigo-400", "font-black", "text-sm", "hover:bg-indigo-50", "dark:hover:bg-indigo-900/10", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "mt-6", "p-5", "rounded-2xl", "border", "border-indigo-200", "dark:border-indigo-800", "bg-indigo-50", "dark:bg-indigo-900/10"], [1, "grid", "grid-cols-2", "gap-4"], [1, "text-2xl", "font-black", "text-indigo-600"], [1, "text-right"], [1, "text-2xl", "font-black", 3, "ngClass"], [1, "mt-5", "flex", "items-start", "gap-3", "px-4", "py-3", "rounded-2xl", "bg-rose-50", "dark:bg-rose-900/10", "border", "border-rose-200", "dark:border-rose-800", "text-rose-700", "dark:text-rose-400"], ["variant", "danger", "title", "Delete Material?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], ["title", "Project Assignment", "panelClass", "p-6 max-w-2xl", 3, "closed", "open", "subtitle", "showCloseButton", "showFooter", "contentClass"], [1, "p-7"], [1, "flex", "flex-col", "items-center", "justify-center", "py-14", "text-center"], [1, "space-y-4", "max-h-[420px]", "overflow-y-auto", "pr-1"], [1, "fixed", "inset-0", "z-[90]"], ["title", "Stock Transfer", "subtitle", "Move material stock between projects", "icon", "swap_horiz", "cancelLabel", "Cancel", "primaryLabel", "Transfer Stock", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], [1, "p-6", "space-y-8"], [1, "flex", "items-center", "gap-4", "p-4", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-slate-50", "dark:bg-slate-800/30"], [1, "w-14", "h-14", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[26px]"], [1, "flex-1", "min-w-0"], [1, "text-lg", "font-black", "truncate"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mt-2"], [1, "px-3", "py-1", "rounded-xl", "bg-slate-200", "dark:bg-slate-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-emerald-100", "text-emerald-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-amber-100", "text-amber-700", "text-[11px]", "font-black"], [1, "space-y-4"], [1, "relative", "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "shadow-sm"], [1, "w-full", "py-3", "rounded-2xl", "border-2", "border-dashed", "border-primary/30", "text-primary", "font-black", "hover:bg-primary/5", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "material-symbols-outlined"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-2", "block"], ["rows", "3", "placeholder", "Write transfer note...", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-4", "focus:ring-primary/20", "resize-none", 3, "ngModelChange", "ngModel"], [3, "close", "save", "contractSelect", "onlyNumberEvent", "onlyAlphaNumericEvent", "pasteNumericEvent", "pasteAlphaNumericEvent", "showAddModal", "newVendor", "errorMsg", "contractFile", "isSaving"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "click"], [1, "px-6", "py-5", "rounded-l-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "overflow-hidden"], [1, "absolute", "inset-0", "bg-primary/10", "opacity-0", "group-hover:opacity-100", "blur-xl", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10", "group-hover:scale-110", "transition-transform"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "px-4", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "w-[210px]", "flex", "flex-col", "gap-3"], [1, "flex", "items-center", "gap-3", "text-sm", "font-black"], [1, "flex", "items-center", "gap-1", "text-slate-800", "dark:text-slate-100"], [1, "material-symbols-outlined", "text-[16px]"], [1, "ml-2", "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "inline-flex", "items-center", "gap-3", "px-3.5", "py-2", "rounded-xl", "border", "transition-all", "duration-300", 3, "click", "ngClass"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "flex", "flex-col", "leading-tight", "min-w-[90px]"], [1, "text-sm", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wide", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", "text-slate-400"], [1, "flex", "flex-col"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-12", "h-12", "rounded-full", "bg-gradient-to-br", "from-amber-400", "via-orange-500", "to-red-500", "flex", "items-center", "justify-center", "text-sm", "font-black", "text-white", "shadow-lg"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-[11px]", "text-slate-400", "font-medium"], [1, "px-6", "py-5", "rounded-r-[28px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-4"], ["title", "Assign to Project", 1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["title", "Transfer Stock", 1, "w-11", "h-11", "rounded-2xl", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click", "disabled", "ngClass"], ["title", "Delete Material", 1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "click", "ngClass"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "ngModelChange", "ngModel"], ["disabled", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModelChange", "ngModel"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "blur", "ngModel"], [1, "grid", "grid-cols-12", "gap-3", "items-end"], [1, "col-span-12", "md:col-span-7"], [1, "text-[9px]", "uppercase", "tracking-[0.18em]", "font-black", "text-slate-400", "mb-1.5", "block"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-indigo-500/20", "focus:border-indigo-500", "transition-all", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [1, "col-span-9", "md:col-span-4"], ["type", "number", "min", "1", "placeholder", "Enter qty", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-indigo-500/20", "focus:border-indigo-500", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "col-span-3", "md:col-span-1", "flex", "justify-end"], ["type", "button", 1, "w-11", "h-11", "rounded-xl", "bg-rose-100", "text-rose-600", "hover:bg-rose-200", "transition-all", "flex", "items-center", "justify-center", "disabled:opacity-40", "cursor-pointer", "disabled:hover:bg-rose-100", 3, "click", "disabled"], [1, "text-sm", "font-semibold", "leading-relaxed"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], [1, "w-20", "h-20", "rounded-3xl", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5"], [1, "material-symbols-outlined", "text-[40px]", "text-slate-400"], [1, "text-sm", "text-slate-500", "mt-2"], [1, "p-5", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/70", "dark:bg-slate-800/40"], [1, "w-14", "h-14", "rounded-2xl", "bg-indigo-100", "dark:bg-indigo-500/10", "text-indigo-600", "flex", "items-center", "justify-center"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "text-[11px]", "uppercase", "tracking-wide", "text-slate-400", "font-bold"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], [1, "w-full", "p-2", "bg-surface-container", "rounded-lg", "text-xs", "font-bold", "outline-none"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "bg-primary", "text-white", "rounded", "text-[10px]", "font-bold"], [1, "px-2", "py-1", "bg-surface-container", "text-outline", "rounded", "text-[10px]", "font-bold"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center"], [1, "grid", "grid-cols-1", "md:grid-cols-[1fr_auto_1fr_130px]", "gap-4", "items-start"], [1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-bold", "outline-none", "focus:ring-4", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["value", ""], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-emerald-50", "dark:bg-emerald-500/10", "border", "border-emerald-200", "dark:border-emerald-500/20"], [1, "hidden", "md:flex", "justify-center", "pt-6"], [1, "w-12", "h-12", "rounded-2xl", "bg-primary", "text-white", "flex", "items-center", "justify-center", "shadow-lg"], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-blue-50", "dark:bg-blue-500/10", "border", "border-blue-200", "dark:border-blue-500/20"], ["type", "number", "min", "1", "placeholder", "0", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-black", "outline-none", "focus:ring-4", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center", 3, "click"], [1, "flex", "items-center", "justify-between"], [1, "material-symbols-outlined", "text-[18px]", "text-emerald-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-emerald-700", "dark:text-emerald-300"], [1, "text-lg", "font-black", "text-emerald-700", "dark:text-emerald-300"], [1, "material-symbols-outlined", "text-[18px]", "text-blue-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-blue-700", "dark:text-blue-300"], [1, "text-lg", "font-black", "text-blue-700", "dark:text-blue-300"]], template: function Materials_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Materials Inventory ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Precision tracking across active construction sites");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "span", 7);
      \u0275\u0275text(10, " Total SKU ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 8)(12, "span", 9);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, " Active ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 11)(17, "span", 7);
      \u0275\u0275text(18, " Assigned Items ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 12);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 13);
      \u0275\u0275text(23, " assignment_turned_in ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 6)(25, "span", 7);
      \u0275\u0275text(26, " Inventory Value ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 8)(28, "span", 14);
      \u0275\u0275text(29);
      \u0275\u0275pipe(30, "number");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 6)(32, "span", 7);
      \u0275\u0275text(33, " Not Assigned ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 8)(35, "span", 9);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span", 15);
      \u0275\u0275text(38, " pending_actions ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "div", 16);
      \u0275\u0275repeaterCreate(40, Materials_For_41_Template, 2, 3, "button", 17, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 18)(43, "div", 19)(44, "div", 20)(45, "div")(46, "h3", 21);
      \u0275\u0275text(47, " Materials Inventory ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 22);
      \u0275\u0275text(49, " Smart warehouse stock & supplier management ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 23)(51, "div", 24)(52, "span", 25);
      \u0275\u0275text(53, " search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Materials_Template_input_ngModelChange_54_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(55, "div", 27)(56, "table", 28)(57, "thead")(58, "tr")(59, "th", 29);
      \u0275\u0275text(60, " Material ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "th", 29);
      \u0275\u0275text(62, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "th", 29);
      \u0275\u0275text(64, " Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "th", 29);
      \u0275\u0275text(66, " Assigned Projects ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "th", 29);
      \u0275\u0275text(68, " Cost ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "th", 29);
      \u0275\u0275text(70, " Vendor ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "th", 29);
      \u0275\u0275text(72, " Action ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(73, "tbody");
      \u0275\u0275repeaterCreate(74, Materials_For_75_Template, 68, 18, "tr", 30, _forTrack0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(76, "div", 31)(77, "p", 32);
      \u0275\u0275text(78);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "div", 33)(80, "button", 34);
      \u0275\u0275listener("click", function Materials_Template_button_click_80_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(81, "span", 35);
      \u0275\u0275text(82, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(83, Materials_For_84_Template, 2, 2, "button", 36, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(85, "button", 34);
      \u0275\u0275listener("click", function Materials_Template_button_click_85_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(86, "span", 35);
      \u0275\u0275text(87, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(88, "app-common-dialog", 37);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_88_listener() {
        return ctx.showAddModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_88_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275elementStart(89, "div", 38)(90, "div", 39)(91, "div", 40)(92, "label", 41);
      \u0275\u0275text(93, "Material Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "select", 42);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_select_ngModelChange_94_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.material_master_id, $event) || (ctx.newMaterial.material_master_id = $event);
        return $event;
      });
      \u0275\u0275listener("change", function Materials_Template_select_change_94_listener($event) {
        return ctx.getSelectedMat($event);
      });
      \u0275\u0275elementStart(95, "option", 43);
      \u0275\u0275text(96, "Select Material");
      \u0275\u0275elementEnd();
      \u0275\u0275template(97, Materials_option_97_Template, 2, 2, "option", 44);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(98, "div")(99, "label", 41);
      \u0275\u0275text(100, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(101, "input", 45);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_101_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(102, "div")(103, "label", 41);
      \u0275\u0275text(104, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "select", 46);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_select_ngModelChange_105_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.category, $event) || (ctx.newMaterial.category = $event);
        return $event;
      });
      \u0275\u0275elementStart(106, "option", 47);
      \u0275\u0275text(107, "Concrete");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "option", 48);
      \u0275\u0275text(109, "Steel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(110, "option", 49);
      \u0275\u0275text(111, "Electrical");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "option", 50);
      \u0275\u0275text(113, "Lumber");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(114, "option", 51);
      \u0275\u0275text(115, "Finishing");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(116, "option", 52);
      \u0275\u0275text(117, "Chemicals");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(118, "div")(119, "label", 41);
      \u0275\u0275text(120, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "select", 42);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_select_ngModelChange_121_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.project_id, $event) || (ctx.newMaterial.project_id = $event);
        return $event;
      });
      \u0275\u0275listener("change", function Materials_Template_select_change_121_listener($event) {
        return ctx.getProject($event);
      });
      \u0275\u0275repeaterCreate(122, Materials_For_123_Template, 2, 2, "option", 53, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(124, "div")(125, "label", 41);
      \u0275\u0275text(126, " Stock In");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "input", 54);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_127_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.stockIn, $event) || (ctx.newMaterial.stockIn = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(128, "div")(129, "label", 41);
      \u0275\u0275text(130, " Cost");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "input", 55);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_input_ngModelChange_131_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275listener("blur", function Materials_Template_input_blur_131_listener() {
        return ctx.formatCost();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(132, "div")(133, "label", 41);
      \u0275\u0275text(134, "Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(135, "select", 42);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_select_ngModelChange_135_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.vendor_id, $event) || (ctx.newMaterial.vendor_id = $event);
        return $event;
      });
      \u0275\u0275listener("change", function Materials_Template_select_change_135_listener($event) {
        return ctx.getvendor($event);
      });
      \u0275\u0275elementStart(136, "option", 56);
      \u0275\u0275text(137, "Select Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(138, Materials_For_139_Template, 2, 2, "option", 53, _forTrack0);
      \u0275\u0275elementStart(140, "option", 57);
      \u0275\u0275text(141, "+ Add New Vendor");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(142, "app-common-dialog", 58);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_142_listener() {
        return ctx.showEditModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_142_listener() {
        return ctx.updateMaterial();
      });
      \u0275\u0275conditionalCreate(143, Materials_Conditional_143_Template, 40, 6, "div", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(144, "app-common-dialog", 59);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_144_listener() {
        return ctx.showAssignProjectModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_144_listener() {
        return ctx.assignProjects();
      });
      \u0275\u0275elementStart(145, "div", 60)(146, "div", 61)(147, "div", 39)(148, "div")(149, "p", 62);
      \u0275\u0275text(150, " Material Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(151, "p", 63);
      \u0275\u0275text(152);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(153, "div", 64)(154, "p", 62);
      \u0275\u0275text(155, " Available Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(156, "p", 65);
      \u0275\u0275text(157);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(158, "div", 66);
      \u0275\u0275repeaterCreate(159, Materials_For_160_Template, 18, 4, "div", 67, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(161, "button", 68);
      \u0275\u0275listener("click", function Materials_Template_button_click_161_listener() {
        return ctx.addProjectRow();
      });
      \u0275\u0275elementStart(162, "span", 69);
      \u0275\u0275text(163, " add ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(164, " Add More Project ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(165, "div", 70)(166, "div", 71)(167, "div")(168, "p", 62);
      \u0275\u0275text(169, " Total Assigned ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(170, "p", 72);
      \u0275\u0275text(171);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(172, "div", 73)(173, "p", 62);
      \u0275\u0275text(174, " Remaining Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(175, "p", 74);
      \u0275\u0275text(176);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(177, Materials_Conditional_177_Template, 5, 1, "div", 75);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(178, "app-common-dialog", 76);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_178_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_178_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275conditionalCreate(179, Materials_Conditional_179_Template, 6, 1, "div", 77);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(180, "app-common-dialog", 78);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_180_listener() {
        return ctx.showProjectStockPopup = false;
      });
      \u0275\u0275elementStart(181, "div", 79);
      \u0275\u0275conditionalCreate(182, Materials_Conditional_182_Template, 8, 0, "div", 80)(183, Materials_Conditional_183_Template, 3, 0, "div", 81);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(184, Materials_Conditional_184_Template, 31, 0, "div", 82);
      \u0275\u0275elementStart(185, "app-common-dialog", 83);
      \u0275\u0275listener("closed", function Materials_Template_app_common_dialog_closed_185_listener() {
        return ctx.showStockTransferModal = false;
      })("primary", function Materials_Template_app_common_dialog_primary_185_listener() {
        return ctx.transferStock();
      });
      \u0275\u0275elementStart(186, "div", 84)(187, "div", 85)(188, "div", 86)(189, "span", 87);
      \u0275\u0275text(190, " inventory_2 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(191, "div", 88)(192, "h3", 89);
      \u0275\u0275text(193);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(194, "div", 90)(195, "div", 91);
      \u0275\u0275text(196);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(197, "div", 92);
      \u0275\u0275text(198);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(199, "div", 93);
      \u0275\u0275text(200);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(201, "div", 94);
      \u0275\u0275repeaterCreate(202, Materials_For_203_Template, 29, 6, "div", 95, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(204, "button", 96);
      \u0275\u0275listener("click", function Materials_Template_button_click_204_listener() {
        return ctx.addTransferRow();
      });
      \u0275\u0275elementStart(205, "span", 97);
      \u0275\u0275text(206, " add ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(207, " Add Transfer Row ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(208, "div")(209, "label", 98);
      \u0275\u0275text(210, " Remarks ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(211, "textarea", 99);
      \u0275\u0275twoWayListener("ngModelChange", function Materials_Template_textarea_ngModelChange_211_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.stockTransferData.transfer_note, $event) || (ctx.stockTransferData.transfer_note = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(212, "app-vendor-add-modal", 100);
      \u0275\u0275listener("close", function Materials_Template_app_vendor_add_modal_close_212_listener() {
        return ctx.showAddVendorModal = false;
      })("save", function Materials_Template_app_vendor_add_modal_save_212_listener() {
        return ctx.addVendor();
      })("contractSelect", function Materials_Template_app_vendor_add_modal_contractSelect_212_listener($event) {
        return ctx.onContractFileSelected($event);
      })("onlyNumberEvent", function Materials_Template_app_vendor_add_modal_onlyNumberEvent_212_listener($event) {
        return ctx.onlyNumbers($event);
      })("onlyAlphaNumericEvent", function Materials_Template_app_vendor_add_modal_onlyAlphaNumericEvent_212_listener($event) {
        return ctx.onlyAlphanumeric($event);
      })("pasteNumericEvent", function Materials_Template_app_vendor_add_modal_pasteNumericEvent_212_listener($event) {
        return ctx.stripNonNumericOnPaste($event.event, $event.field, $event.len);
      })("pasteAlphaNumericEvent", function Materials_Template_app_vendor_add_modal_pasteAlphaNumericEvent_212_listener($event) {
        return ctx.stripNonAlphanumericOnPaste($event.event, $event.field, $event.len);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate1(" ", ctx.materials.length, " ");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ctx.noOfProjectsAssigned, " ");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(30, 58, ctx.getInventoryValue(), "1.0-0"), " ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.noOfProjectsNotAssigned, " ");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(20);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredMaterials.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - ", ctx.endItem, " of ", ctx.filteredMaterials.length, " Materials ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(61, _c0).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.material_master_id);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.MaterialMaster);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.category);
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.project_id);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.projects);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.stockIn);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.vendor_id);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.vendors);
      \u0275\u0275advance(4);
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToEdit ? 143 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showAssignProjectModal)("showCloseButton", true)("showFooter", true)("contentClass", "overflow-y-auto");
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
      \u0275\u0275conditional(ctx.projectAssignError ? 177 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.materialToDelete ? 179 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showProjectStockPopup)("subtitle", ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.name)("showCloseButton", true)("showFooter", false)("contentClass", "overflow-y-auto");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!(ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.material_project_stock == null ? null : ctx.selectedProjectStock.material_project_stock.length) ? 182 : 183);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showFilters ? 184 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showStockTransferModal)("showCloseButton", true)("showFooter", true)("contentClass", "min-h-0 overflow-y-auto");
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
      \u0275\u0275advance();
      \u0275\u0275property("showAddModal", ctx.showAddVendorModal)("newVendor", ctx.newVendor)("errorMsg", ctx.errorMsg)("contractFile", ctx.contractFile)("isSaving", ctx.isSaving);
    }
  }, dependencies: [NgClass, NgForOf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, VendorAddComponent, CommonDialogComponent, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Materials, [{
    type: Component,
    args: [{ selector: "app-materials", standalone: false, template: `<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Materials Inventory\r
            </h2>\r
            <p class="text-on-surface-variant/80 font-medium">Precision tracking across active construction sites</p>\r
        </div>\r
        <!-- <div class="flex gap-3">\r
            <div\r
                class="flex items-center gap-3 bg-surface-container-highest px-4 py-2 rounded-xl border border-outline-variant/10 shadow-sm">\r
                <span class="material-symbols-outlined text-outline text-sm">filter_alt</span>\r
                <select [(ngModel)]="selectedMember"\r
                    class="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-on-surface outline-none cursor-pointer appearance-none pr-4">\r
                    <option *ngFor="let m of team" [value]="m.name">{{ m.name }}</option>\r
                </select>\r
            </div>\r
            <button (click)="showFilters = !showFilters"\r
                class="px-5 py-2.5 bg-surface-container-highest text-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer">\r
                <span class="material-symbols-outlined text-lg"\r
                    style="font-variation-settings: 'FILL' 1;">filter_list</span>\r
                Filters\r
            </button>\r
            <button (click)="exportReport()"\r
                class="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer">\r
                <span class="material-symbols-outlined text-lg">download</span>\r
                Export Report\r
            </button>\r
            <button (click)="openAddModal()"\r
                class="hidden md:flex items-center gap-2 px-6 py-2.5 bg-surface-container-lowest text-on-surface font-bold rounded-xl shadow-sm border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer">\r
                <span class="material-symbols-outlined" style="font-size: 20px;">add_box</span>\r
                New Material\r
            </button>\r
        </div> -->\r
    </div>\r
\r
\r
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">\r
\r
        <!-- Total SKU -->\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Total SKU\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black">\r
                    {{ materials.length }}\r
                </span>\r
\r
                <span class="text-xs font-bold text-green-600">\r
                    Active\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
        <!-- Assigned -->\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32 border-l-4 border-l-secondary-container">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Assigned Items\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black text-secondary">\r
                    {{ noOfProjectsAssigned }}\r
                </span>\r
\r
                <span class="material-symbols-outlined text-secondary-container"\r
                    style="font-variation-settings: 'FILL' 1;">\r
                    assignment_turned_in\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
        <!-- Inventory Value -->\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Inventory Value\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black text-primary">\r
                    \u20B9{{getInventoryValue() | number:'1.0-0'\r
                    }}\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
        <!-- Not Assigned -->\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Not Assigned\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black">\r
                    {{ noOfProjectsNotAssigned }}\r
                </span>\r
\r
                <span class="material-symbols-outlined text-outline">\r
                    pending_actions\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
    </div>\r
    <!-- Filter Tabs -->\r
    <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">\r
        @for (tab of categories; track tab) {\r
        <button (click)="changeTab(tab)"\r
            [class]="selectedTab === tab.category_name ? 'bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-dim'"\r
            class="px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-colors">\r
            {{ tab.category_name }}\r
        </button>\r
        }\r
        <!-- <div\r
            class="ml-auto flex items-center gap-4 text-xs font-bold text-outline uppercase tracking-widest px-4 cursor-pointer hover:text-primary transition-colors">\r
            Sorted by: Usage Rate\r
            <span class="material-symbols-outlined text-sm">unfold_more</span>\r
        </div> -->\r
    </div>\r
\r
    <!-- Inventory Table Container -->\r
    <div\r
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">\r
\r
        <!-- Table Wrapper -->\r
        <div\r
            class="overflow-hidden rounded-[30px] border border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">\r
\r
            <!-- Header -->\r
            <div\r
                class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">\r
\r
                <div>\r
\r
                    <h3 class="text-2xl font-black tracking-tight text-slate-800 dark:text-white">\r
                        Materials Inventory\r
                    </h3>\r
\r
                    <p class="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">\r
                        Smart warehouse stock & supplier management\r
                    </p>\r
\r
                </div>\r
\r
                <!-- Actions -->\r
                <div class="flex items-center gap-3">\r
\r
                    <!-- Search -->\r
                    <div\r
                        class="flex items-center gap-3 h-11 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">\r
\r
                        <span class="material-symbols-outlined text-slate-400 text-[20px]">\r
                            search\r
                        </span>\r
\r
                        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
                            placeholder="Search materials..."\r
                            class="w-full bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
            <!-- Table -->\r
            <div class="overflow-x-auto px-4 py-4">\r
\r
                <table class="w-full min-w-[1150px] border-separate border-spacing-y-4">\r
\r
                    <!-- Head -->\r
                    <thead>\r
\r
                        <tr>\r
\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Material\r
                            </th>\r
\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Category\r
                            </th>\r
\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Stock\r
                            </th>\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Assigned Projects\r
                            </th>\r
\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Cost\r
                            </th>\r
\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Vendor\r
                            </th>\r
\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Action\r
                            </th>\r
\r
                        </tr>\r
\r
                    </thead>\r
\r
                    <!-- Body -->\r
                    <tbody>\r
\r
                        @for (item of paginatedMaterials; track item.id) {\r
\r
                        <tr\r
                            class="group relative z-0 hover:z-[9999] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
                            <!-- Material -->\r
                            <td\r
                                class="px-6 py-5 rounded-l-[28px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
                                <div class="flex items-center gap-4">\r
\r
                                    <!-- Icon -->\r
                                    <div\r
                                        class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">\r
\r
                                        <div\r
                                            class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity">\r
                                        </div>\r
\r
                                        <span\r
                                            class="material-symbols-outlined text-primary text-[24px] relative z-10 group-hover:scale-110 transition-transform">\r
                                            inventory_2\r
                                        </span>\r
\r
                                    </div>\r
\r
                                    <!-- Info -->\r
                                    <div class="space-y-1">\r
\r
                                        <p\r
                                            class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                                            {{ item.name }}\r
\r
                                        </p>\r
\r
                                        <div class="flex items-center gap-2">\r
\r
                                            <span\r
                                                class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
                                                SKU\r
                                            </span>\r
\r
                                            <span class="text-xs text-slate-400 font-semibold">\r
                                                {{ item.sku }}\r
                                            </span>\r
\r
                                        </div>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Category -->\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <span\r
                                    class="inline-flex items-center px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide">\r
\r
                                    {{ item.category }}\r
\r
                                </span>\r
\r
                            </td>\r
\r
                            <!-- Stock -->\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div class="w-[210px] flex flex-col gap-3">\r
\r
                                    <div class="flex items-center gap-3 text-sm font-black">\r
\r
                                        <!-- Available -->\r
                                        <div class="flex items-center gap-1 text-slate-800 dark:text-slate-100">\r
\r
                                            <span class="material-symbols-outlined text-[16px]">\r
                                                inventory_2\r
                                            </span>\r
\r
                                            <span>{{ item.stockRemaining }}</span>\r
\r
                                        </div>\r
\r
                                        <!-- Status -->\r
                                        <span [ngClass]="item.stockUsed >= item.stockRemaining\r
      ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'\r
      : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'" class="ml-2 px-2.5 py-1 rounded-full\r
           text-[10px] font-black uppercase tracking-wide">Stock\r
\r
                                        </span>\r
\r
                                    </div>\r
                                    <!-- Progress -->\r
                                    <div\r
                                        class="relative w-full h-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">\r
\r
                                        <div class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container transition-all duration-700"\r
                                            [style.width.%]="item.stockRemaining > 100 ? 100 : item.stockRemaining">\r
                                        </div>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <td class="px-6 py-5 bg-white dark:bg-slate-900\r
         border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div (click)="item.material_project_stock?.length > 0 && openProjectStockPopup(item)"\r
                                    class="inline-flex items-center gap-3 px-3.5 py-2\r
           rounded-xl border transition-all duration-300" [ngClass]="item.material_project_stock?.length > 0\r
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/10'\r
      : 'cursor-not-allowed opacity-70 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'">\r
\r
                                    <!-- Icon -->\r
                                    <div [ngClass]="item.material_project_stock?.length > 0\r
        ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600'\r
        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'"\r
                                        class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">\r
\r
                                        <span class="material-symbols-outlined text-[18px]">\r
\r
                                            {{ item.material_project_stock?.length > 0\r
                                            ? 'apartment'\r
                                            : 'inventory_2' }}\r
\r
                                        </span>\r
\r
                                    </div>\r
\r
                                    <!-- Content -->\r
                                      <div class="flex flex-col leading-tight min-w-[90px]">\r
\r
                                        @if ((item.material_project_stock?.length || 0) > 0) {\r
                                        <span class="text-sm font-black text-slate-800 dark:text-white">\r
                                            {{ item.material_project_stock?.length }}\r
                                            {{ item.material_project_stock?.length === 1 ? 'Project' : 'Projects' }}\r
                                        </span>\r
                                        }\r
\r
                                        <span [ngClass]="(item.material_project_stock?.length || 0) > 0\r
            ? 'text-indigo-600 dark:text-indigo-400'\r
            : 'text-rose-500 dark:text-rose-400'" class="text-[10px] font-bold uppercase tracking-wide">\r
\r
                                            {{ (item.material_project_stock?.length || 0) > 0\r
                                            ? 'Assigned'\r
                                            : 'Not Assigned' }}\r
\r
                                        </span>\r
\r
                                    </div>\r
\r
\r
                                    <!-- Arrow -->\r
                                    <span class="material-symbols-outlined text-[14px]\r
             text-slate-400">\r
\r
                                        arrow_forward_ios\r
\r
                                    </span>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Cost -->\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div class="flex flex-col">\r
\r
                                    <span class="text-lg font-black text-slate-800 dark:text-white">\r
                                        \u20B9{{ item.cost }}\r
                                    </span>\r
\r
                                    <span class="text-[11px] text-slate-400 font-semibold">\r
                                        Per Unit\r
                                    </span>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Vendor -->\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div class="flex items-center gap-3">\r
\r
                                    <div\r
                                        class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center text-sm font-black text-white shadow-lg">\r
\r
                                        {{ item.vendor_name.charAt(0) }}\r
\r
                                    </div>\r
\r
                                    <div>\r
\r
                                        <p class="text-sm font-black text-slate-700 dark:text-slate-200">\r
                                            {{ item.vendor_name }}\r
                                        </p>\r
\r
                                        <p class="text-[11px] text-slate-400 font-medium">\r
                                            Verified Supplier\r
                                        </p>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Status -->\r
                            <td\r
                                class="px-6 py-5 rounded-r-[28px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
                                <div class="flex items-center justify-between gap-4">\r
\r
                                    <!-- Status -->\r
                                    <!-- <span\r
                                        class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wide"\r
                                        [ngClass]="item.status === 'ASSIGNED'\r
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'\r
                                : 'bg-amber-50 text-amber-700 border border-amber-200'">\r
\r
                                        <span class="w-2.5 h-2.5 rounded-full" [ngClass]="item.status === 'ASSIGNED'\r
                                    ? 'bg-emerald-500'\r
                                    : 'bg-amber-500'">\r
                                        </span>\r
\r
                                        {{ item.status }}\r
\r
                                    </span> -->\r
\r
                                    <!-- Actions -->\r
                                    <div class="flex items-center gap-2">\r
\r
                                        <!-- Edit -->\r
                                        <button (click)="openAssignProjectModal(item)" title="Assign to Project"\r
                                            class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                            <span class="material-symbols-outlined text-[18px]">\r
                                                assignment_ind\r
                                            </span>\r
\r
                                        </button>\r
                                        <button (click)="openStockTransferModal(item)" title="Transfer Stock"\r
                                            [disabled]="!item.material_project_stock?.length" [ngClass]="\r
      item.material_project_stock?.length\r
        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer'\r
        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'\r
    " class="w-11 h-11 rounded-2xl transition-all duration-200 flex items-center justify-center">\r
\r
                                            <span class="material-symbols-outlined text-[18px]">\r
                                                transfer_within_a_station\r
                                            </span>\r
\r
                                        </button>\r
\r
                                        <!-- Delete -->\r
                                        <button (click)="openDeleteModal($event, item)" title="Delete Material"\r
                                            class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                            <span class="material-symbols-outlined text-[18px]">\r
                                                delete\r
                                            </span>\r
\r
                                        </button>\r
\r
                                    </div>\r
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
\r
        </div>\r
\r
        <!-- Pagination -->\r
        <div\r
            class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">\r
\r
            <!-- Count -->\r
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500">\r
\r
                Showing\r
                {{ filteredMaterials.length ? ((page - 1) * pageSize) + 1 : 0 }}\r
                -\r
                {{endItem}}\r
\r
                of\r
\r
                {{ filteredMaterials.length}} Materials\r
\r
            </p>\r
\r
            <!-- Pagination Buttons -->\r
            <div class="flex items-center gap-2">\r
\r
                <!-- Prev -->\r
                <button (click)="prevPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_left\r
                    </span>\r
\r
                </button>\r
\r
                <!-- Numbers -->\r
                @for (p of [].constructor(totalPages()); track $index) {\r
\r
                <button (click)="goToPage($index + 1)"\r
                    class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer"\r
                    [ngClass]="page === ($index + 1)\r
                ? 'bg-primary text-white shadow-md'\r
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'">\r
\r
                    {{ $index + 1 }}\r
\r
                </button>\r
\r
                }\r
\r
                <!-- Next -->\r
                <button (click)="nextPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_right\r
                    </span>\r
\r
                </button>\r
\r
            </div>\r
\r
        </div>\r
\r
    </div>\r
</section>\r
\r
<!-- Modals -->\r
<!-- Add Material Modal -->\r
<app-common-dialog\r
    [open]="showAddModal"\r
    title="New Inventory Item"\r
    icon="inventory_2"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Add to Inventory"\r
    (closed)="showAddModal = false"\r
    (primary)="addMaterial()"\r
>\r
    <div class="p-8">\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material\r
                    Name</label>\r
                <select [(ngModel)]="newMaterial.material_master_id" (change)="getSelectedMat($event)"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
\r
                    <option value="" disabled>Select Material</option>\r
\r
                    <option *ngFor="let material of MaterialMaster" [value]="material.id">\r
                        {{ material.name }}\r
                    </option>\r
\r
                </select>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>\r
                <input [(ngModel)]="newMaterial.sku" type="text" placeholder="SKU-XXX-X"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
                <select [(ngModel)]="newMaterial.category"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                    <option value="Concrete">Concrete</option>\r
                    <option value="Steel">Steel</option>\r
                    <option value="Electrical">Electrical</option>\r
                    <option value="Lumber">Lumber</option>\r
                    <option value="Finishing">Finishing</option>\r
                    <option value="Chemicals">Chemicals</option>\r
                </select>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>\r
                <select [(ngModel)]="newMaterial.project_id" (change)="getProject($event)"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                    @for (p of projects; track p.id) {\r
                    <option [value]="p.id">{{ p.name }}</option>\r
                    }\r
                </select>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                    Stock In</label>\r
                <input [(ngModel)]="newMaterial.stockIn" type="number" min="1"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                    Cost</label>\r
                <input [(ngModel)]="newMaterial.cost" min="1" type="number" (blur)="formatCost()" placeholder="0.00"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Vendor</label>\r
                <select [(ngModel)]="newMaterial.vendor_id" (change)="getvendor($event)"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                    <option value="" disabled selected>Select Vendor</option>\r
                    @for (v of vendors; track v.id) {\r
                    <option [value]="v.id">{{ v.name }}</option>\r
                    }\r
                    <option value="ADD_NEW" class="text-primary font-bold">+ Add New Vendor</option>\r
                </select>\r
            </div>\r
        </div>\r
\r
    </div>\r
</app-common-dialog>\r
\r
<!-- Edit Material Modal -->\r
<app-common-dialog\r
    [open]="showEditModal && !!materialToEdit"\r
    title="Edit Material"\r
    icon="edit_square"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Save Changes"\r
    (closed)="showEditModal = false"\r
    (primary)="updateMaterial()"\r
>\r
    @if (materialToEdit) {\r
    <div class="p-8">\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material\r
                    Name</label>\r
                <input [(ngModel)]="materialToEdit.name" type="text" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>\r
                <input [(ngModel)]="materialToEdit.sku" type="text" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-slate-50 dark:bg-slate-800/50 text-sm font-bold outline-none cursor-not-allowed">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
                <select [(ngModel)]="materialToEdit.category" disabled\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                    <option value="Concrete">Concrete</option>\r
                    <option value="Steel">Steel</option>\r
                    <option value="Electrical">Electrical</option>\r
                    <option value="Lumber">Lumber</option>\r
                    <option value="Finishing">Finishing</option>\r
                    <option value="Chemicals">Chemicals</option>\r
                </select>\r
            </div>\r
\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                    Stock In</label>\r
                <input [(ngModel)]="materialToEdit.stockIn" type="number"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30"\r
                    readonly>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                    Cost</label>\r
                <input [(ngModel)]="materialToEdit.cost" type="number" (blur)="formatCostEdit()" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
        </div>\r
\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>\r
            <select [(ngModel)]="materialToEdit.project_id" (change)="getProject($event)"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                @for (p of projects; track p.id) {\r
                <option [value]="p.id">{{ p.name }}</option>\r
                }\r
            </select>\r
        </div>\r
\r
    </div>\r
    }\r
</app-common-dialog>\r
\r
<app-common-dialog\r
    [open]="showAssignProjectModal"\r
    title="Assign Material"\r
    subtitle="Allocate stock project wise"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Assign Stock"\r
    (closed)="showAssignProjectModal = false"\r
    (primary)="assignProjects()"\r
    panelClass="max-w-3xl"\r
    [contentClass]="'overflow-y-auto'"\r
>\r
    <div class="p-6">\r
\r
            <!-- Material Info -->\r
            <div class="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40\r
               border border-slate-200 dark:border-slate-700">\r
\r
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
\r
                    <div>\r
                        <p class="text-[10px] uppercase tracking-[0.2em]\r
                      font-black text-slate-400 mb-1">\r
                            Material Name\r
                        </p>\r
\r
                        <p class="text-sm md:text-base font-black text-slate-900 dark:text-white">\r
                            {{ materialToEdit?.name }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="md:text-right">\r
                        <p class="text-[10px] uppercase tracking-[0.2em]\r
                      font-black text-slate-400 mb-1">\r
                            Available Stock\r
                        </p>\r
\r
                        <p class="text-lg font-black text-emerald-600">\r
                            {{ materialToEdit?.stockRemaining }}\r
                        </p>\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
            <!-- Dynamic Rows -->\r
            <div class="space-y-3">\r
\r
                @for (item of assignedProjects; track $index) {\r
\r
                <div class="p-4 rounded-2xl border border-slate-200\r
                 dark:border-slate-700 bg-slate-50/60\r
                 dark:bg-slate-800/30 transition-all">\r
\r
                    <div class="grid grid-cols-12 gap-3 items-end">\r
\r
                        <!-- Project -->\r
                        <div class="col-span-12 md:col-span-7">\r
\r
                            <label class="text-[9px] uppercase tracking-[0.18em]\r
                       font-black text-slate-400 mb-1.5 block">\r
\r
                                Select Project\r
                            </label>\r
\r
                            <select [(ngModel)]="item.project_id" (change)="validateAssignedStock()" class="w-full px-4 py-3 rounded-xl border\r
                       border-slate-200 dark:border-slate-700\r
                       bg-white dark:bg-slate-900\r
                       text-sm font-semibold outline-none\r
                       focus:ring-2 focus:ring-indigo-500/20\r
                       focus:border-indigo-500 transition-all">\r
\r
                                <option [ngValue]="null">\r
                                    Choose Project\r
                                </option>\r
\r
                                @for (project of projects; track project.id) {\r
                                <option [ngValue]="project.id">\r
                                    {{ project.name }}\r
                                </option>\r
                                }\r
\r
                            </select>\r
\r
                        </div>\r
\r
                        <!-- Qty -->\r
                        <div class="col-span-9 md:col-span-4">\r
\r
                            <label class="text-[9px] uppercase tracking-[0.18em]\r
                       font-black text-slate-400 mb-1.5 block">\r
\r
                                Stock Qty\r
                            </label>\r
\r
                            <input type="number" min="1" [(ngModel)]="item.stock" (input)="validateAssignedStock()"\r
                                placeholder="Enter qty" class="w-full px-4 py-3 rounded-xl border\r
                       border-slate-200 dark:border-slate-700\r
                       bg-white dark:bg-slate-900\r
                       text-sm font-semibold outline-none\r
                       focus:ring-2 focus:ring-indigo-500/20\r
                       focus:border-indigo-500 transition-all">\r
\r
                        </div>\r
\r
                        <!-- Remove -->\r
                        <div class="col-span-3 md:col-span-1 flex justify-end">\r
\r
                            <button type="button" (click)="removeProjectRow($index)"\r
                                [disabled]="assignedProjects.length === 1" class="w-11 h-11 rounded-xl bg-rose-100\r
                       text-rose-600 hover:bg-rose-200\r
                       transition-all flex items-center\r
                       justify-center disabled:opacity-40\r
                       cursor-pointer disabled:hover:bg-rose-100">\r
\r
                                <span class="material-symbols-outlined text-[18px]">\r
                                    delete\r
                                </span>\r
\r
                            </button>\r
\r
                        </div>\r
\r
                    </div>\r
\r
                </div>\r
\r
                }\r
\r
            </div>\r
\r
            <!-- Add More -->\r
            <button type="button" (click)="addProjectRow()" class="mt-5 w-full border-2 border-dashed\r
               border-indigo-300 dark:border-indigo-700\r
               rounded-2xl py-3.5 text-indigo-600\r
               dark:text-indigo-400 font-black text-sm\r
               hover:bg-indigo-50 dark:hover:bg-indigo-900/10\r
               transition-all flex items-center\r
               justify-center gap-2">\r
\r
                <span class="material-symbols-outlined text-[20px]">\r
                    add\r
                </span>\r
\r
                Add More Project\r
\r
            </button>\r
\r
            <!-- Summary -->\r
            <div class="mt-6 p-5 rounded-2xl border border-indigo-200\r
               dark:border-indigo-800 bg-indigo-50\r
               dark:bg-indigo-900/10">\r
\r
                <div class="grid grid-cols-2 gap-4">\r
\r
                    <div>\r
                        <p class="text-[10px] uppercase tracking-[0.2em]\r
                      font-black text-slate-400 mb-1">\r
                            Total Assigned\r
                        </p>\r
\r
                        <p class="text-2xl font-black text-indigo-600">\r
                            {{ getTotalAssignedStock() }}\r
                        </p>\r
                    </div>\r
\r
                    <div class="text-right">\r
                        <p class="text-[10px] uppercase tracking-[0.2em]\r
                      font-black text-slate-400 mb-1">\r
                            Remaining Stock\r
                        </p>\r
\r
                        <p [ngClass]="getRemainingStock() < 0\r
                ? 'text-rose-600'\r
                : 'text-emerald-600'" class="text-2xl font-black">\r
\r
                            {{ getRemainingStock() }}\r
                        </p>\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
            <!-- Error -->\r
            @if (projectAssignError) {\r
\r
            <div class="mt-5 flex items-start gap-3 px-4 py-3 rounded-2xl\r
               bg-rose-50 dark:bg-rose-900/10\r
               border border-rose-200 dark:border-rose-800\r
               text-rose-700 dark:text-rose-400">\r
\r
                <span class="material-symbols-outlined text-[20px]">\r
                    error\r
                </span>\r
\r
                <p class="text-sm font-semibold leading-relaxed">\r
                    {{ projectAssignError }}\r
                </p>\r
\r
            </div>\r
\r
            }\r
\r
        </div>\r
\r
    </app-common-dialog>\r
\r
<!-- Delete Confirmation Modal -->\r
<app-common-dialog\r
    [open]="showDeleteModal && !!materialToDelete"\r
    variant="danger"\r
    title="Delete Material?"\r
    subtitle="This action cannot be undone."\r
    icon="delete_forever"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    cancelLabel="Cancel"\r
    primaryLabel="Delete Item"\r
    (closed)="showDeleteModal = false"\r
    (primary)="confirmDelete()"\r
>\r
    @if (materialToDelete) {\r
    <div class="p-8 text-center">\r
        <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
                class="text-on-surface font-black">"{{ materialToDelete.name }}"</span>? This action cannot be undone.\r
        </p>\r
    </div>\r
    }\r
</app-common-dialog>\r
\r
<!-- Project Assignment Popup -->\r
<app-common-dialog\r
    [open]="showProjectStockPopup"\r
    title="Project Assignment"\r
    [subtitle]="selectedProjectStock?.name"\r
    [showCloseButton]="true"\r
    [showFooter]="false"\r
    (closed)="showProjectStockPopup = false"\r
    panelClass="p-6 max-w-2xl"\r
    [contentClass]="'overflow-y-auto'"\r
>\r
    <div class="p-7">\r
\r
            @if (!selectedProjectStock?.material_project_stock?.length) {\r
\r
            <!-- Empty -->\r
            <div class="flex flex-col items-center justify-center\r
               py-14 text-center">\r
\r
                <div class="w-20 h-20 rounded-3xl bg-slate-100\r
                 dark:bg-slate-800 flex items-center\r
                 justify-center mb-5">\r
\r
                    <span class="material-symbols-outlined text-[40px]\r
                   text-slate-400">\r
\r
                        inventory_2\r
\r
                    </span>\r
\r
                </div>\r
\r
                <h4 class="text-lg font-black text-slate-800\r
                 dark:text-white">\r
\r
                    No Project Assigned\r
\r
                </h4>\r
\r
                <p class="text-sm text-slate-500 mt-2">\r
\r
                    This material is not assigned to any project yet.\r
\r
                </p>\r
\r
            </div>\r
\r
            } @else {\r
\r
            <!-- Assigned Projects -->\r
            <div class="space-y-4 max-h-[420px] overflow-y-auto pr-1">\r
\r
                @for (p of selectedProjectStock.material_project_stock; track $index) {\r
\r
                <div class="p-5 rounded-2xl border border-slate-200\r
                 dark:border-slate-700 bg-slate-50/70\r
                 dark:bg-slate-800/40">\r
\r
                    <div class="flex items-center justify-between gap-4">\r
\r
                        <!-- Left -->\r
                        <div class="flex items-center gap-4">\r
\r
                            <div class="w-14 h-14 rounded-2xl\r
                       bg-indigo-100 dark:bg-indigo-500/10\r
                       text-indigo-600 flex items-center\r
                       justify-center">\r
\r
                                <span class="material-symbols-outlined">\r
                                    apartment\r
                                </span>\r
\r
                            </div>\r
\r
                            <div>\r
\r
                                <h4 class="text-sm font-black text-slate-800\r
                         dark:text-white">\r
\r
                                    {{ p.project_name }}\r
\r
                                </h4>\r
\r
                                <p class="text-xs text-slate-400 mt-1">\r
\r
                                    Assigned Project\r
\r
                                </p>\r
\r
                            </div>\r
\r
                        </div>\r
\r
                        <!-- Stock -->\r
                        <div class="text-right">\r
\r
                            <h4 class="text-2xl font-black text-indigo-600">\r
\r
                                {{ p.stockUsed }}\r
\r
                            </h4>\r
\r
                            <p class="text-[11px] uppercase tracking-wide\r
                       text-slate-400 font-bold">\r
\r
                                Units\r
\r
                            </p>\r
\r
                        </div>\r
\r
                    </div>\r
\r
                </div>\r
\r
                }\r
\r
            </div>\r
\r
            }\r
\r
        </div>\r
\r
    </app-common-dialog>\r
\r
<!-- Filters Dropdown Overlay -->\r
@if (showFilters) {\r
<div class="fixed inset-0 z-[90]" (click)="showFilters = false">\r
    <div class="absolute top-32 right-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 p-6 w-72 animate-in fade-in slide-in-from-top-4 duration-300"\r
        (click)="$event.stopPropagation()">\r
        <h4 class="text-xs font-black uppercase tracking-widest text-outline mb-4">Advanced Filters</h4>\r
        <div class="space-y-4">\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Sort Order</label>\r
                <select class="w-full p-2 bg-surface-container rounded-lg text-xs font-bold outline-none">\r
                    <option>Usage Rate (Highest)</option>\r
                    <option>Usage Rate (Lowest)</option>\r
                    <option>Stock Level (Asc)</option>\r
                    <option>Stock Level (Desc)</option>\r
                    <option>Newest Additions</option>\r
                </select>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Supplier Status</label>\r
                <div class="flex flex-wrap gap-2">\r
                    <button class="px-2 py-1 bg-primary text-white rounded text-[10px] font-bold">Active</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">Preferred</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">New</button>\r
                </div>\r
            </div>\r
        </div>\r
        <button (click)="showFilters = false"\r
            class="w-full mt-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">Apply\r
            Filters</button>\r
    </div>\r
</div>\r
}\r
\r
<app-common-dialog\r
    [open]="showStockTransferModal"\r
    title="Stock Transfer"\r
    subtitle="Move material stock between projects"\r
    icon="swap_horiz"\r
    [showCloseButton]="true"\r
    [showFooter]="true"\r
    [contentClass]="'min-h-0 overflow-y-auto'"\r
    cancelLabel="Cancel"\r
    primaryLabel="Transfer Stock"\r
    (closed)="showStockTransferModal = false"\r
    (primary)="transferStock()"\r
>\r
\r
        <!-- Body -->\r
        <div class="p-6 space-y-8">\r
\r
            <!-- Material -->\r
            <div\r
                class="flex items-center gap-4 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">\r
\r
                <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">\r
\r
                    <span class="material-symbols-outlined text-[26px]">\r
                        inventory_2\r
                    </span>\r
\r
                </div>\r
\r
                <div class="flex-1 min-w-0">\r
\r
                    <h3 class="text-lg font-black truncate">\r
                        {{ selectedMaterial?.name }}\r
                    </h3>\r
\r
                    <div class="flex flex-wrap items-center gap-2 mt-2">\r
\r
                        <div class="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-[11px] font-black">\r
                            SKU : {{ selectedMaterial?.sku }}\r
                        </div>\r
\r
                        <div class="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-700 text-[11px] font-black">\r
                            Main Stock : {{ stockTransferData.stockIn }}\r
                        </div>\r
\r
                        <div class="px-3 py-1 rounded-xl bg-amber-100 text-amber-700 text-[11px] font-black">\r
                            Transfer Qty : {{ getTotalTransferQty() }}\r
                        </div>\r
\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
            <!-- Transfer Rows -->\r
            <div class="space-y-4">\r
\r
                @for (item of stockTransferData.transfers; track $index) {\r
\r
                <div\r
                    class="relative p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">\r
\r
                    <!-- Remove -->\r
                    @if (stockTransferData.transfers.length > 1) {\r
                    <button (click)="removeTransferRow($index)"\r
                        class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center">\r
\r
                        <span class="material-symbols-outlined text-[18px]">\r
                            delete\r
                        </span>\r
\r
                    </button>\r
                    }\r
\r
                    <!-- Row -->\r
                    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_130px] gap-4 items-start">\r
\r
                        <!-- From -->\r
                        <div>\r
\r
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
                                From Project\r
                            </label>\r
\r
                            <select [(ngModel)]="item.from_project_id"\r
                                class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/20">\r
\r
                                <option value="">Select Project</option>\r
\r
                                @for (p of projects; track p.id) {\r
                                <option [value]="p.id">\r
                                    {{ p.name }} (Stock : {{ getProjectStock(p.id) }})\r
                                </option>\r
                                }\r
\r
                            </select>\r
\r
                            <!-- From Project Selected Stock -->\r
                            @if (item.from_project_id) {\r
                            <div\r
                                class="mt-3 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">\r
\r
                                <div class="flex items-center justify-between">\r
\r
                                    <div class="flex items-center gap-2">\r
\r
                                        <span class="material-symbols-outlined text-[18px] text-emerald-600">\r
                                            inventory\r
                                        </span>\r
\r
                                        <span\r
                                            class="text-[11px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">\r
                                            Available Stock\r
                                        </span>\r
\r
                                    </div>\r
\r
                                    <span class="text-lg font-black text-emerald-700 dark:text-emerald-300">\r
                                        {{ getProjectStock(item.from_project_id) }}\r
                                    </span>\r
\r
                                </div>\r
\r
                            </div>\r
                            }\r
\r
                        </div>\r
\r
                        <!-- Arrow -->\r
                        <div class="hidden md:flex justify-center pt-6">\r
\r
                            <div\r
                                class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">\r
\r
                                <span class="material-symbols-outlined">\r
                                    east\r
                                </span>\r
\r
                            </div>\r
\r
                        </div>\r
\r
                        <!-- To -->\r
                        <div>\r
\r
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
                                To Project\r
                            </label>\r
\r
                            <select [(ngModel)]="item.to_project_id"\r
                                class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/20">\r
\r
                                <option value="">Select Project</option>\r
\r
                                @for (p of projects; track p.id) {\r
                                <option [value]="p.id">\r
                                    {{ p.name }} (Stock : {{ getProjectStock(p.id) }})\r
                                </option>\r
                                }\r
\r
                            </select>\r
\r
                            <!-- To Project Selected Stock -->\r
                            @if (item.to_project_id) {\r
                            <div\r
                                class="mt-3 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">\r
\r
                                <div class="flex items-center justify-between">\r
\r
                                    <div class="flex items-center gap-2">\r
\r
                                        <span class="material-symbols-outlined text-[18px] text-blue-600">\r
                                            warehouse\r
                                        </span>\r
\r
                                        <span\r
                                            class="text-[11px] font-black uppercase tracking-wide text-blue-700 dark:text-blue-300">\r
                                            Current Stock\r
                                        </span>\r
\r
                                    </div>\r
\r
                                    <span class="text-lg font-black text-blue-700 dark:text-blue-300">\r
                                        {{ getProjectStock(item.to_project_id) }}\r
                                    </span>\r
\r
                                </div>\r
\r
                            </div>\r
                            }\r
\r
                        </div>\r
\r
                        <!-- Qty -->\r
                        <div>\r
\r
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
                                Quantity\r
                            </label>\r
\r
                            <input [(ngModel)]="item.quantity" type="number" min="1" placeholder="0"\r
                                class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-black outline-none focus:ring-4 focus:ring-primary/20">\r
\r
                        </div>\r
\r
                    </div>\r
\r
                </div>\r
\r
                }\r
\r
            </div>\r
\r
            <!-- Add -->\r
            <button (click)="addTransferRow()"\r
                class="w-full py-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-black hover:bg-primary/5 transition-all flex items-center justify-center gap-2">\r
\r
                <span class="material-symbols-outlined">\r
                    add\r
                </span>\r
\r
                Add Transfer Row\r
\r
            </button>\r
\r
            <!-- Note -->\r
            <div>\r
\r
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
                    Remarks\r
                </label>\r
\r
                <textarea [(ngModel)]="stockTransferData.transfer_note" rows="3" placeholder="Write transfer note..."\r
                    class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/20 resize-none"></textarea>\r
\r
            </div>\r
\r
        </div>\r
\r
</app-common-dialog>\r
\r
<app-vendor-add-modal [showAddModal]="showAddVendorModal" [newVendor]="newVendor" [errorMsg]="errorMsg"\r
    [contractFile]="contractFile" [isSaving]="isSaving" (close)="showAddVendorModal = false" (save)="addVendor()"\r
    (contractSelect)="onContractFileSelected($event)" (onlyNumberEvent)="onlyNumbers($event)"\r
    (onlyAlphaNumericEvent)="onlyAlphanumeric($event)"\r
    (pasteNumericEvent)="stripNonNumericOnPaste($event.event, $event.field, $event.len)"\r
    (pasteAlphaNumericEvent)="stripNonAlphanumericOnPaste($event.event, $event.field, $event.len)">\r
</app-vendor-add-modal>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Materials, { className: "Materials", filePath: "app/modules/resources/materials/materials.ts", lineNumber: 17 });
})();

// src/app/modules/resources/contracts/contracts.ts
var Contracts = class _Contracts {
  static \u0275fac = function Contracts_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Contracts)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Contracts, selectors: [["app-contracts"]], standalone: false, decls: 2, vars: 0, template: function Contracts_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "contracts works!");
      \u0275\u0275elementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Contracts, [{
    type: Component,
    args: [{ selector: "app-contracts", standalone: false, template: "<p>contracts works!</p>\r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Contracts, { className: "Contracts", filePath: "app/modules/resources/contracts/contracts.ts", lineNumber: 9 });
})();

// src/app/shared/services/equipment-inventory/equipment-inventory.ts
var EquipmentInventoryService = class _EquipmentInventoryService {
  http;
  baseUrl = `${environment.serverUrl}/api/v1`;
  apiUrlGetAllMaterials = `${this.baseUrl}/getAllequipments`;
  apiUrlCreateMaterial = `${this.baseUrl}/createequipment`;
  apiUrlUpdateMaterial = `${this.baseUrl}/updateequipment`;
  apiUrlEquipmentStockTransfer = `${this.baseUrl}/equipment_stock_transfer`;
  apiUrlDeleteMaterial = `${this.baseUrl}/deleteequipment`;
  materialsSubject = new BehaviorSubject([]);
  materials$ = this.materialsSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadMaterials() {
    this.http.get(this.apiUrlGetAllMaterials).subscribe({
      next: (res) => {
        if (res?.message === "Success") {
          this.materialsSubject.next(res.data || []);
        } else {
          this.materialsSubject.next([]);
        }
      },
      error: (err) => {
        console.error("[loadMaterials]", err);
        this.materialsSubject.next([]);
      }
    });
  }
  // 👇 agar sirf current value chahiye
  getMaterials() {
    return this.materialsSubject.value;
  }
  addMaterial(material) {
    return this.http.post(this.apiUrlCreateMaterial, material).pipe(tap((res) => {
      if (res?.success) {
        const current = this.materialsSubject.value;
        this.materialsSubject.next([...current || [], res.data]);
      }
    }), catchError((err) => {
      console.error("[addMaterial]", err);
      return throwError(() => err);
    }));
  }
  // UPDATE
  updateMaterial(id, data) {
    return this.http.put(`${this.apiUrlUpdateMaterial}/${id}`, data);
  }
  equipment_stock_transfer(id, data) {
    return this.http.put(`${this.apiUrlEquipmentStockTransfer}/${id}`, data);
  }
  // DELETE
  deleteMaterial(id) {
    return this.http.delete(`${this.apiUrlDeleteMaterial}/${id}`);
  }
  getMaterialBySku(sku) {
    return this.materialsSubject.value.find((m) => m.sku === sku);
  }
  getProjects() {
    return this.http.get(`${this.baseUrl}/projects`);
  }
  static \u0275fac = function EquipmentInventoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EquipmentInventoryService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EquipmentInventoryService, factory: _EquipmentInventoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EquipmentInventoryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/resources/equipment-inventory/equipment-inventory.ts
var _c02 = () => [];
var _forTrack02 = ($index, $item) => $item.sku;
var _forTrack1 = ($index, $item) => $item.id;
function EquipmentInventory_For_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 110);
    \u0275\u0275listener("click", function EquipmentInventory_For_41_Template_button_click_0_listener() {
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
function EquipmentInventory_For_75_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 131);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length, " ", (item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) === 1 ? "Project" : "Projects", " ");
  }
}
function EquipmentInventory_For_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 31)(1, "td", 111)(2, "div", 112)(3, "div", 113);
    \u0275\u0275element(4, "div", 114);
    \u0275\u0275elementStart(5, "span", 115);
    \u0275\u0275text(6, " construction ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 2)(8, "p", 116);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 34)(11, "span", 117);
    \u0275\u0275text(12, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 118);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(15, "td", 119)(16, "span", 120);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 119)(19, "div", 121)(20, "div", 122)(21, "div", 123)(22, "span", 124);
    \u0275\u0275text(23, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "span", 125);
    \u0275\u0275text(27, "Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 126);
    \u0275\u0275element(29, "div", 127);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "td", 119)(31, "div", 128);
    \u0275\u0275listener("click", function EquipmentInventory_For_75_Template_div_click_31_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView((item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) > 0 && ctx_r2.openProjectStockPopup(item_r5));
    });
    \u0275\u0275elementStart(32, "div", 129)(33, "span", 36);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 130);
    \u0275\u0275conditionalCreate(36, EquipmentInventory_For_75_Conditional_36_Template, 2, 2, "span", 131);
    \u0275\u0275elementStart(37, "span", 132);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "span", 133);
    \u0275\u0275text(40, " arrow_forward_ios ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "td", 119)(42, "div", 134)(43, "span", 135);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 136);
    \u0275\u0275text(46, " Per Unit ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "td", 119)(48, "div", 23)(49, "div", 137);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div")(52, "p", 138);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 139);
    \u0275\u0275text(55, " Verified Supplier ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "td", 140)(57, "div", 141)(58, "div", 34)(59, "button", 142);
    \u0275\u0275listener("click", function EquipmentInventory_For_75_Template_button_click_59_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAssignProjectModal(item_r5));
    });
    \u0275\u0275elementStart(60, "span", 36);
    \u0275\u0275text(61, " assignment_ind ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "button", 143);
    \u0275\u0275listener("click", function EquipmentInventory_For_75_Template_button_click_62_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openStockTransferModal(item_r5));
    });
    \u0275\u0275elementStart(63, "span", 36);
    \u0275\u0275text(64, " transfer_within_a_station ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "button", 144);
    \u0275\u0275listener("click", function EquipmentInventory_For_75_Template_button_click_65_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal($event, item_r5));
    });
    \u0275\u0275elementStart(66, "span", 36);
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
    \u0275\u0275textInterpolate1(" ", item_r5.vendor_name.charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r5.vendor_name, " ");
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", !(item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length))("ngClass", (item_r5.equipment_project_stock == null ? null : item_r5.equipment_project_stock.length) ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50");
  }
}
function EquipmentInventory_For_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 145);
    \u0275\u0275listener("click", function EquipmentInventory_For_84_Template_button_click_0_listener() {
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
function EquipmentInventory_option_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const material_r8 = ctx.$implicit;
    \u0275\u0275property("value", material_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", material_r8.name, " ");
  }
}
function EquipmentInventory_For_128_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275property("value", p_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r9.name);
  }
}
function EquipmentInventory_For_144_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r10 = ctx.$implicit;
    \u0275\u0275property("value", v_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r10.name, " ");
  }
}
function EquipmentInventory_ng_container_153_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r12 = ctx.$implicit;
    \u0275\u0275property("value", p_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r12.name);
  }
}
function EquipmentInventory_ng_container_153_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 39)(2, "h3", 40);
    \u0275\u0275text(3, "Edit material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 41);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_153_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275elementStart(5, "span", 42);
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 43)(8, "div", 44)(9, "label", 45);
    \u0275\u0275text(10, "Material Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 146);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 45);
    \u0275\u0275text(14, "SKU Code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 147);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "label", 45);
    \u0275\u0275text(18, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 148)(20, "option", 51);
    \u0275\u0275text(21, "Concrete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 52);
    \u0275\u0275text(23, "Steel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 53);
    \u0275\u0275text(25, "Electrical");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 54);
    \u0275\u0275text(27, "Lumber");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 55);
    \u0275\u0275text(29, "Finishing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 56);
    \u0275\u0275text(31, "Chemicals");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div")(33, "label", 45);
    \u0275\u0275text(34, " Stock In");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "input", 149);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div")(37, "label", 45);
    \u0275\u0275text(38, " Cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 150);
    \u0275\u0275listener("blur", function EquipmentInventory_ng_container_153_Template_input_blur_39_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.formatCostEdit());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div")(41, "label", 45);
    \u0275\u0275text(42, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "select", 46);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_ng_container_153_Template_select_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.materialToEdit.project_id, $event) || (ctx_r2.materialToEdit.project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function EquipmentInventory_ng_container_153_Template_select_change_43_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.getProject($event));
    });
    \u0275\u0275repeaterCreate(44, EquipmentInventory_ng_container_153_For_45_Template, 2, 2, "option", 57, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 62)(47, "button", 63);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_153_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(48, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 64);
    \u0275\u0275listener("click", function EquipmentInventory_ng_container_153_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateMaterial());
    });
    \u0275\u0275text(50, "Save Changes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("value", ctx_r2.materialToEdit.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.materialToEdit.sku);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.materialToEdit.category);
    \u0275\u0275advance(16);
    \u0275\u0275property("value", ctx_r2.materialToEdit.stockIn);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.materialToEdit.cost);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.materialToEdit.project_id);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.projects);
  }
}
function EquipmentInventory_For_177_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 155);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r15 = ctx.$implicit;
    \u0275\u0275property("ngValue", project_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", project_r15.name, " ");
  }
}
function EquipmentInventory_For_177_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 78)(1, "div", 151)(2, "div", 152)(3, "label", 153);
    \u0275\u0275text(4, " Select Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 154);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_For_177_Template_select_ngModelChange_5_listener($event) {
      const item_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(item_r14.project_id, $event) || (item_r14.project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function EquipmentInventory_For_177_Template_select_change_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.validateAssignedStock());
    });
    \u0275\u0275elementStart(6, "option", 155);
    \u0275\u0275text(7, " Choose Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, EquipmentInventory_For_177_For_9_Template, 2, 2, "option", 155, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 156)(11, "label", 153);
    \u0275\u0275text(12, " Stock Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 157);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_For_177_Template_input_ngModelChange_13_listener($event) {
      const item_r14 = \u0275\u0275restoreView(_r13).$implicit;
      \u0275\u0275twoWayBindingSet(item_r14.stock, $event) || (item_r14.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function EquipmentInventory_For_177_Template_input_input_13_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.validateAssignedStock());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 158)(15, "button", 159);
    \u0275\u0275listener("click", function EquipmentInventory_For_177_Template_button_click_15_listener() {
      const $index_r16 = \u0275\u0275restoreView(_r13).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeProjectRow($index_r16));
    });
    \u0275\u0275elementStart(16, "span", 36);
    \u0275\u0275text(17, " delete ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", item_r14.project_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", item_r14.stock);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.assignedProjects.length === 1);
  }
}
function EquipmentInventory_Conditional_194_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "span", 80);
    \u0275\u0275text(2, " error ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 160);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.projectAssignError, " ");
  }
}
function EquipmentInventory_Conditional_197_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89)(1, "div", 161)(2, "span", 162);
    \u0275\u0275text(3, " inventory_2 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h4", 135);
    \u0275\u0275text(5, " No Project Assigned ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 163);
    \u0275\u0275text(7, " This material is not assigned to any project yet. ");
    \u0275\u0275elementEnd()();
  }
}
function EquipmentInventory_Conditional_198_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164)(1, "div", 141)(2, "div", 112)(3, "div", 165)(4, "span", 42);
    \u0275\u0275text(5, " apartment ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h4", 131);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 166);
    \u0275\u0275text(10, " Assigned Project ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 84)(12, "h4", 83);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 167);
    \u0275\u0275text(15, " Units ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", p_r17.project_name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", p_r17.stockUsed, " ");
  }
}
function EquipmentInventory_Conditional_198_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275repeaterCreate(1, EquipmentInventory_Conditional_198_For_2_Template, 16, 2, "div", 164, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.selectedProjectStock.equipment_project_stock);
  }
}
function EquipmentInventory_Conditional_199_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 168);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_199_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275elementStart(1, "div", 169);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_199_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "h4", 170);
    \u0275\u0275text(3, "Advanced Filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 103)(5, "div")(6, "label", 171);
    \u0275\u0275text(7, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 172)(9, "option");
    \u0275\u0275text(10, "Usage Rate (Highest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option");
    \u0275\u0275text(12, "Usage Rate (Lowest)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option");
    \u0275\u0275text(14, "Stock Level (Asc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option");
    \u0275\u0275text(16, "Stock Level (Desc)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option");
    \u0275\u0275text(18, "Newest Additions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div")(20, "label", 171);
    \u0275\u0275text(21, "Supplier Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 173)(23, "button", 174);
    \u0275\u0275text(24, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 175);
    \u0275\u0275text(26, "Preferred");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 175);
    \u0275\u0275text(28, "New");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "button", 176);
    \u0275\u0275listener("click", function EquipmentInventory_Conditional_199_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFilters = false);
    });
    \u0275\u0275text(30, "Apply Filters");
    \u0275\u0275elementEnd()()();
  }
}
function EquipmentInventory_For_218_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 187);
    \u0275\u0275listener("click", function EquipmentInventory_For_218_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const $index_r21 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeTransferRow($index_r21));
    });
    \u0275\u0275elementStart(1, "span", 36);
    \u0275\u0275text(2, " delete ");
    \u0275\u0275elementEnd()();
  }
}
function EquipmentInventory_For_218_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r23 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", p_r23.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r23.name, " (Stock : ", ctx_r2.getProjectStock(p_r23.id), ") ");
  }
}
function EquipmentInventory_For_218_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 182)(1, "div", 188)(2, "div", 34)(3, "span", 189);
    \u0275\u0275text(4, " inventory ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 190);
    \u0275\u0275text(6, " Available Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 191);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectStock(item_r22.from_project_id), " ");
  }
}
function EquipmentInventory_For_218_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r24 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", p_r24.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r24.name, " (Stock : ", ctx_r2.getProjectStock(p_r24.id), ") ");
  }
}
function EquipmentInventory_For_218_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 185)(1, "div", 188)(2, "div", 34)(3, "span", 192);
    \u0275\u0275text(4, " warehouse ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 193);
    \u0275\u0275text(6, " Current Stock ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 194);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProjectStock(item_r22.to_project_id), " ");
  }
}
function EquipmentInventory_For_218_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104);
    \u0275\u0275conditionalCreate(1, EquipmentInventory_For_218_Conditional_1_Template, 3, 0, "button", 177);
    \u0275\u0275elementStart(2, "div", 178)(3, "div")(4, "label", 179);
    \u0275\u0275text(5, " From Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 180);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_For_218_Template_select_ngModelChange_6_listener($event) {
      const item_r22 = \u0275\u0275restoreView(_r19).$implicit;
      \u0275\u0275twoWayBindingSet(item_r22.from_project_id, $event) || (item_r22.from_project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(7, "option", 181);
    \u0275\u0275text(8, "Select Project");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, EquipmentInventory_For_218_For_10_Template, 2, 3, "option", 57, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, EquipmentInventory_For_218_Conditional_11_Template, 9, 1, "div", 182);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 183)(13, "div", 184)(14, "span", 42);
    \u0275\u0275text(15, " east ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div")(17, "label", 179);
    \u0275\u0275text(18, " To Project ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 180);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_For_218_Template_select_ngModelChange_19_listener($event) {
      const item_r22 = \u0275\u0275restoreView(_r19).$implicit;
      \u0275\u0275twoWayBindingSet(item_r22.to_project_id, $event) || (item_r22.to_project_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 181);
    \u0275\u0275text(21, "Select Project");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, EquipmentInventory_For_218_For_23_Template, 2, 3, "option", 57, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, EquipmentInventory_For_218_Conditional_24_Template, 9, 1, "div", 185);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div")(26, "label", 179);
    \u0275\u0275text(27, " Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 186);
    \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_For_218_Template_input_ngModelChange_28_listener($event) {
      const item_r22 = \u0275\u0275restoreView(_r19).$implicit;
      \u0275\u0275twoWayBindingSet(item_r22.quantity, $event) || (item_r22.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.stockTransferData.transfers.length > 1 ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", item_r22.from_project_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r22.from_project_id ? 11 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", item_r22.to_project_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.projects);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r22.to_project_id ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r22.quantity);
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
  addMaterial() {
    this.materialService.addMaterial(__spreadValues({}, this.newMaterial)).subscribe({
      next: (res) => {
        console.log("Material created", res);
        this.showAddModal = false;
        this.toast.success("Material added successfully");
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
    this.showEditModal = true;
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
      console.log("Add new vendor selected", this.showAddVendorModal, value);
      this.newMaterial.vendor_id = "";
      return;
    }
    const vendor = this.vendors.find((v) => v.id == value);
    this.newMaterial.vendor_name = vendor?.name || "";
    this.newMaterial.vendor_id = value || "";
    console.log(vendor, "selected vendor");
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
      equipment_id: this.materialToEdit.id,
      projects: projectsWithName
    };
    console.log(payload);
    this.materialService.updateMaterial(this.materialToEdit.id, payload).subscribe({
      next: () => {
        this.showEditModal = false;
        this.materialToEdit = null;
        this.toast.success("Material updated successfully");
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
    const totalQty = this.getTotalTransferQty();
    if (totalQty > this.stockTransferData.stockIn) {
      this.toast.error("Total transfer quantity exceeds available stock");
      return;
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
        this.toast.success("Material transferred successfully");
        this.materialService.loadMaterials();
        this.showStockTransferModal = false;
      },
      error: (err) => {
        console.error("Update failed", err);
        this.toast.error(err?.error?.message || "Failed to update material");
      }
    });
  }
  static \u0275fac = function EquipmentInventory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EquipmentInventory)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EquipmentInventory, selectors: [["app-equipment-inventory"]], standalone: false, decls: 229, vars: 61, consts: [[1, "p-4", "flex", "flex-col", "gap-8", "pb-32", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500"], [1, "flex", "flex-col", "md:flex-row", "md:items-end", "justify-between", "gap-6"], [1, "space-y-1"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-on-surface-variant/80", "font-medium"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-6"], [1, "bg-surface-container-lowest", "p-6", "rounded-xl", "border", "border-outline-variant/10", "shadow-sm", "flex", "flex-col", "justify-between", "h-32"], [1, "text-xs", "font-bold", "uppercase", "tracking-widest", "text-outline"], [1, "flex", "items-baseline", "gap-2"], [1, "text-3xl", "font-black"], [1, "text-xs", "font-bold", "text-green-600"], [1, "bg-surface-container-lowest", "p-6", "rounded-xl", "border", "border-outline-variant/10", "shadow-sm", "flex", "flex-col", "justify-between", "h-32", "border-l-4", "border-l-secondary-container"], [1, "text-3xl", "font-black", "text-secondary"], [1, "material-symbols-outlined", "text-secondary-container", 2, "font-variation-settings", "'FILL' 1"], [1, "text-3xl", "font-black", "text-primary"], [1, "material-symbols-outlined", "text-outline"], [1, "flex", "items-center", "gap-2", "overflow-x-auto", "hide-scrollbar", "pb-1"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "class"], [1, "bg-white", "dark:bg-slate-900", "rounded-2xl", "border", "border-slate-200/60", "dark:border-slate-800", "shadow-sm", "overflow-hidden"], [1, "overflow-hidden", "rounded-[28px]", "border", "border-slate-200/70", "dark:border-slate-800", "bg-white/70", "dark:bg-slate-900/70", "backdrop-blur-xl", "shadow-[0_10px_40px_rgba(0,0,0,0.06)]"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "justify-between", "gap-4", "px-6", "py-5", "border-b", "border-slate-200", "dark:border-slate-800", "bg-gradient-to-r", "from-slate-50", "to-white", "dark:from-slate-900", "dark:to-slate-950"], [1, "text-xl", "font-black", "tracking-tight", "text-slate-800", "dark:text-white"], [1, "text-sm", "text-slate-500", "font-medium", "mt-1"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "gap-2", "px-4", "h-11", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "shadow-sm", "w-full", "lg:w-[320px]"], [1, "material-symbols-outlined", "text-slate-400", "text-[20px]"], ["type", "text", "placeholder", "Search equipment...", 1, "bg-transparent", "outline-none", "text-sm", "font-medium", "w-full", "text-slate-700", "dark:text-slate-200", "placeholder:text-slate-400", 3, "ngModelChange", "ngModel"], [1, "overflow-x-auto", "px-4", "py-4"], [1, "w-full", "min-w-[1100px]", "border-separate", "border-spacing-y-4"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.18em]", "text-slate-400"], [1, "px-6", "text-left", "text-[11px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400"], [1, "group", "relative", "z-0", "hover:z-[9999]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl"], [1, "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4", "px-6", "py-5", "bg-slate-50", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-primary", "hover:text-white", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "ngClass"], ["panelClass", "p-8 max-w-lg", 3, "closed", "open", "contentClass"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "text-2xl", "font-black", "tracking-tight"], [1, "p-2", "hover:bg-slate-100", "dark:hover:bg-slate-800", "rounded-lg", "transition-colors", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "md:col-span-2"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-1", "block"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModelChange", "change", "ngModel"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "placeholder", "SKU-XXX-X", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModelChange", "ngModel"], ["value", "Concrete"], ["value", "Steel"], ["value", "Electrical"], ["value", "Lumber"], ["value", "Finishing"], ["value", "Chemicals"], [3, "value"], ["type", "number", "min", "1", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "ngModel"], ["min", "1", "type", "number", "placeholder", "0.00", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "ngModelChange", "blur", "ngModel"], ["value", "", "disabled", "", "selected", ""], ["value", "ADD_NEW", 1, "text-primary", "font-bold"], [1, "flex", "gap-3", "mt-8"], [1, "flex-1", "py-3", "rounded-xl", "border", "border-outline-variant/20", "text-sm", "font-bold", "cursor-pointer", "hover:bg-slate-50", "transition-colors", 3, "click"], [1, "flex-1", "py-3", "rounded-xl", "bg-primary", "text-white", "text-sm", "font-bold", "cursor-pointer", "shadow-lg", "shadow-primary/20", "hover:scale-[1.02]", "transition-transform", 3, "click"], [4, "ngIf"], ["variant", "danger", "title", "Delete Material?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"], ["title", "Assign Equipment", "subtitle", "Allocate stock project wise", "cancelLabel", "Cancel", "primaryLabel", "Assign Stock", "panelClass", "max-w-3xl", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "primaryDisabled", "contentClass"], [1, "p-7"], [1, "mb-6", "p-4", "rounded-2xl", "bg-slate-50", "dark:bg-slate-800/40", "border", "border-slate-200", "dark:border-slate-700"], [1, "text-[10px]", "uppercase", "tracking-[0.2em]", "font-black", "text-slate-400", "mb-1"], [1, "text-sm", "md:text-base", "font-black", "text-slate-900", "dark:text-white"], [1, "md:text-right"], [1, "text-lg", "font-black", "text-emerald-600"], [1, "space-y-3"], [1, "p-4", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/60", "dark:bg-slate-800/30", "transition-all"], ["type", "button", 1, "mt-5", "w-full", "border-2", "border-dashed", "border-indigo-300", "dark:border-indigo-700", "rounded-2xl", "py-3.5", "text-indigo-600", "dark:text-indigo-400", "font-black", "text-sm", "hover:bg-indigo-50", "dark:hover:bg-indigo-900/10", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-[20px]"], [1, "mt-6", "p-5", "rounded-2xl", "border", "border-indigo-200", "dark:border-indigo-800", "bg-indigo-50", "dark:bg-indigo-900/10"], [1, "grid", "grid-cols-2", "gap-4"], [1, "text-2xl", "font-black", "text-indigo-600"], [1, "text-right"], [1, "text-2xl", "font-black", 3, "ngClass"], [1, "mt-5", "flex", "items-start", "gap-3", "px-4", "py-3", "rounded-2xl", "bg-rose-50", "dark:bg-rose-900/10", "border", "border-rose-200", "dark:border-rose-800", "text-rose-700", "dark:text-rose-400"], ["title", "Project Assignment", "panelClass", "p-6 max-w-2xl", 3, "closed", "open", "subtitle", "showCloseButton", "showFooter", "contentClass"], [1, "p-6"], [1, "flex", "flex-col", "items-center", "justify-center", "py-14", "text-center"], [1, "space-y-4", "max-h-[420px]", "overflow-y-auto", "pr-1"], [1, "fixed", "inset-0", "z-[90]"], ["title", "Stock Transfer", "subtitle", "Move material stock between projects", "icon", "swap_horiz", "cancelLabel", "Cancel", "primaryLabel", "Transfer Stock", 3, "closed", "primary", "open", "showCloseButton", "showFooter", "contentClass"], [1, "p-6", "space-y-8"], [1, "flex", "items-center", "gap-4", "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-slate-50", "dark:bg-slate-800/30"], [1, "w-14", "h-14", "rounded-2xl", "bg-primary/10", "text-primary", "flex", "items-center", "justify-center"], [1, "material-symbols-outlined", "text-[26px]"], [1, "flex-1", "min-w-0"], [1, "text-lg", "font-black", "truncate"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mt-2"], [1, "px-3", "py-1", "rounded-xl", "bg-slate-200", "dark:bg-slate-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-emerald-100", "text-emerald-700", "text-[11px]", "font-black"], [1, "px-3", "py-1", "rounded-xl", "bg-amber-100", "text-amber-700", "text-[11px]", "font-black"], [1, "space-y-4"], [1, "relative", "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900", "shadow-sm"], [1, "w-full", "py-4", "rounded-2xl", "border-2", "border-dashed", "border-primary/30", "text-primary", "font-black", "hover:bg-primary/5", "transition-all", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "p-5", "rounded-3xl", "border", "border-slate-200", "dark:border-slate-800", "bg-white", "dark:bg-slate-900"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-3", "block"], ["rows", "4", "placeholder", "Write transfer note...", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50", "dark:bg-slate-800", "text-sm", "font-semibold", "outline-none", "focus:ring-4", "focus:ring-primary/20", "resize-none", 3, "ngModelChange", "ngModel"], [3, "close", "save", "contractSelect", "onlyNumberEvent", "onlyAlphaNumericEvent", "pasteNumericEvent", "pasteAlphaNumericEvent", "showAddModal", "newVendor", "errorMsg", "contractFile", "isSaving"], [1, "px-6", "py-2", "rounded-full", "font-bold", "text-sm", "whitespace-nowrap", "cursor-pointer", "transition-colors", 3, "click"], [1, "px-6", "py-5", "rounded-l-[26px]", "bg-white", "dark:bg-slate-900", "border", "border-r-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "gap-4"], [1, "relative", "w-14", "h-14", "rounded-2xl", "bg-gradient-to-br", "from-primary/20", "to-primary/5", "flex", "items-center", "justify-center", "shadow-inner"], [1, "absolute", "inset-0", "rounded-2xl", "bg-primary/10", "scale-110", "blur-xl", "opacity-0", "group-hover:opacity-100", "transition-opacity"], [1, "material-symbols-outlined", "text-primary", "text-[24px]", "relative", "z-10"], [1, "font-black", "text-[15px]", "text-slate-800", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "px-2", "py-0.5", "rounded-lg", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wide", "text-slate-500"], [1, "text-xs", "text-slate-400", "font-semibold"], [1, "px-6", "py-5", "bg-white", "dark:bg-slate-900", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "inline-flex", "items-center", "px-4", "py-1.5", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300", "text-[11px]", "font-black", "uppercase", "tracking-wide"], [1, "w-[210px]", "flex", "flex-col", "gap-3"], [1, "flex", "items-center", "gap-3", "text-sm", "font-black"], [1, "flex", "items-center", "gap-1", "text-slate-800", "dark:text-slate-100"], [1, "material-symbols-outlined", "text-[16px]"], [1, "ml-2", "px-2.5", "py-1", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-wide", 3, "ngClass"], [1, "relative", "w-full", "h-3", "rounded-full", "overflow-hidden", "bg-slate-100", "dark:bg-slate-800"], [1, "absolute", "inset-y-0", "left-0", "rounded-full", "bg-gradient-to-r", "from-primary", "via-primary-container", "to-secondary-container", "transition-all", "duration-700"], [1, "inline-flex", "items-center", "gap-3", "px-3.5", "py-2", "rounded-xl", "border", "transition-all", "duration-300", 3, "click", "ngClass"], [1, "w-9", "h-9", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", 3, "ngClass"], [1, "flex", "flex-col", "leading-tight", "min-w-[90px]"], [1, "text-sm", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wide", 3, "ngClass"], [1, "material-symbols-outlined", "text-[14px]", "text-slate-400"], [1, "flex", "flex-col"], [1, "text-lg", "font-black", "text-slate-800", "dark:text-white"], [1, "text-[11px]", "text-slate-400", "font-semibold"], [1, "w-12", "h-12", "rounded-full", "bg-gradient-to-br", "from-amber-400", "via-orange-500", "to-red-500", "flex", "items-center", "justify-center", "text-sm", "font-black", "text-white", "shadow-lg"], [1, "text-sm", "font-black", "text-slate-700", "dark:text-slate-200"], [1, "text-[11px]", "text-slate-400", "font-medium"], [1, "px-6", "py-5", "rounded-r-[26px]", "bg-white", "dark:bg-slate-900", "border", "border-l-0", "border-slate-200", "dark:border-slate-800", "shadow-sm"], [1, "flex", "items-center", "justify-between", "gap-4"], ["title", "Assign to Project", 1, "w-11", "h-11", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-blue-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["title", "Transfer Stock", 1, "w-11", "h-11", "rounded-2xl", "transition-all", "duration-200", "flex", "items-center", "justify-center", 3, "click", "disabled", "ngClass"], ["title", "Delete Material", 1, "w-11", "h-11", "rounded-2xl", "bg-red-50", "text-red-600", "hover:bg-red-600", "hover:text-white", "shadow-sm", "hover:shadow-lg", "transition-all", "duration-200", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "click", "ngClass"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "value"], ["type", "text", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "bg-slate-50", "dark:bg-slate-800/50", "text-sm", "font-bold", "outline-none", "cursor-not-allowed", 3, "value"], ["disabled", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "bg-white", "dark:bg-slate-900", 3, "ngModel"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "value"], ["type", "number", "readonly", "", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-outline-variant/20", "dark:border-slate-800", "text-sm", "font-bold", "outline-none", "focus:ring-2", "focus:ring-primary/30", 3, "blur", "value"], [1, "grid", "grid-cols-12", "gap-3", "items-end"], [1, "col-span-12", "md:col-span-7"], [1, "text-[9px]", "uppercase", "tracking-[0.18em]", "font-black", "text-slate-400", "mb-1.5", "block"], [1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-indigo-500/20", "focus:border-indigo-500", "transition-all", 3, "ngModelChange", "change", "ngModel"], [3, "ngValue"], [1, "col-span-9", "md:col-span-4"], ["type", "number", "min", "1", "placeholder", "Enter qty", 1, "w-full", "px-4", "py-3", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-semibold", "outline-none", "focus:ring-2", "focus:ring-indigo-500/20", "focus:border-indigo-500", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "col-span-3", "md:col-span-1", "flex", "justify-end"], ["type", "button", 1, "w-11", "h-11", "rounded-xl", "bg-rose-100", "text-rose-600", "hover:bg-rose-200", "transition-all", "flex", "items-center", "justify-center", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "text-sm", "font-semibold", "leading-relaxed"], [1, "w-20", "h-20", "rounded-3xl", "bg-slate-100", "dark:bg-slate-800", "flex", "items-center", "justify-center", "mb-5"], [1, "material-symbols-outlined", "text-[40px]", "text-slate-400"], [1, "text-sm", "text-slate-500", "mt-2"], [1, "p-5", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-slate-50/70", "dark:bg-slate-800/40"], [1, "w-14", "h-14", "rounded-2xl", "bg-indigo-100", "dark:bg-indigo-500/10", "text-indigo-600", "flex", "items-center", "justify-center"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "text-[11px]", "uppercase", "tracking-wide", "text-slate-400", "font-bold"], [1, "fixed", "inset-0", "z-[90]", 3, "click"], [1, "absolute", "top-32", "right-8", "bg-white", "dark:bg-slate-900", "rounded-2xl", "shadow-2xl", "border", "border-outline-variant/20", "p-6", "w-72", "animate-in", "fade-in", "slide-in-from-top-4", "duration-300", 3, "click"], [1, "text-xs", "font-black", "uppercase", "tracking-widest", "text-outline", "mb-4"], [1, "text-[10px]", "font-bold", "text-outline", "mb-1", "block"], [1, "w-full", "p-2", "bg-surface-container", "rounded-lg", "text-xs", "font-bold", "outline-none"], [1, "flex", "flex-wrap", "gap-2"], [1, "px-2", "py-1", "bg-primary", "text-white", "rounded", "text-[10px]", "font-bold"], [1, "px-2", "py-1", "bg-surface-container", "text-outline", "rounded", "text-[10px]", "font-bold"], [1, "w-full", "mt-6", "py-2", "bg-primary", "text-white", "rounded-xl", "text-xs", "font-black", "uppercase", "tracking-widest", 3, "click"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center"], [1, "grid", "grid-cols-1", "md:grid-cols-[1fr_auto_1fr_130px]", "gap-4", "items-start"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "mb-2", "block"], [1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-bold", "outline-none", "focus:ring-4", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], ["value", ""], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-emerald-50", "dark:bg-emerald-500/10", "border", "border-emerald-200", "dark:border-emerald-500/20"], [1, "hidden", "md:flex", "justify-center", "pt-6"], [1, "w-12", "h-12", "rounded-2xl", "bg-primary", "text-white", "flex", "items-center", "justify-center", "shadow-lg"], [1, "mt-3", "px-4", "py-3", "rounded-2xl", "bg-blue-50", "dark:bg-blue-500/10", "border", "border-blue-200", "dark:border-blue-500/20"], ["type", "number", "min", "1", "placeholder", "0", 1, "w-full", "px-4", "py-3", "rounded-2xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-900", "text-sm", "font-black", "outline-none", "focus:ring-4", "focus:ring-primary/20", 3, "ngModelChange", "ngModel"], [1, "absolute", "top-4", "right-4", "w-9", "h-9", "rounded-xl", "bg-red-50", "text-red-500", "hover:bg-red-100", "transition-all", "flex", "items-center", "justify-center", 3, "click"], [1, "flex", "items-center", "justify-between"], [1, "material-symbols-outlined", "text-[18px]", "text-emerald-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-emerald-700", "dark:text-emerald-300"], [1, "text-lg", "font-black", "text-emerald-700", "dark:text-emerald-300"], [1, "material-symbols-outlined", "text-[18px]", "text-blue-600"], [1, "text-[11px]", "font-black", "uppercase", "tracking-wide", "text-blue-700", "dark:text-blue-300"], [1, "text-lg", "font-black", "text-blue-700", "dark:text-blue-300"]], template: function EquipmentInventory_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Equipment Inventory ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Precision tracking across active construction sites");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "span", 7);
      \u0275\u0275text(10, " Total SKU ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 8)(12, "span", 9);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, " Active ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 11)(17, "span", 7);
      \u0275\u0275text(18, " Assigned Items ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 12);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 13);
      \u0275\u0275text(23, " assignment_turned_in ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 6)(25, "span", 7);
      \u0275\u0275text(26, " Inventory Value ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 8)(28, "span", 14);
      \u0275\u0275text(29);
      \u0275\u0275pipe(30, "number");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 6)(32, "span", 7);
      \u0275\u0275text(33, " Not Assigned ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 8)(35, "span", 9);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span", 15);
      \u0275\u0275text(38, " pending_actions ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "div", 16);
      \u0275\u0275repeaterCreate(40, EquipmentInventory_For_41_Template, 2, 3, "button", 17, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 18)(43, "div", 19)(44, "div", 20)(45, "div")(46, "h3", 21);
      \u0275\u0275text(47, " Equipment Inventory ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 22);
      \u0275\u0275text(49, " Live equipment availability & supplier tracking ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 23)(51, "div", 24)(52, "span", 25);
      \u0275\u0275text(53, " search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_54_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(55, "div", 27)(56, "table", 28)(57, "thead")(58, "tr")(59, "th", 29);
      \u0275\u0275text(60, " Equipment ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "th", 29);
      \u0275\u0275text(62, " Category ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "th", 29);
      \u0275\u0275text(64, " Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "th", 30);
      \u0275\u0275text(66, " Assigned Projects ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "th", 29);
      \u0275\u0275text(68, " Cost ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "th", 29);
      \u0275\u0275text(70, " Vendor ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "th", 29);
      \u0275\u0275text(72, " Action ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(73, "tbody");
      \u0275\u0275repeaterCreate(74, EquipmentInventory_For_75_Template, 68, 18, "tr", 31, _forTrack02);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(76, "div", 32)(77, "p", 33);
      \u0275\u0275text(78);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "div", 34)(80, "button", 35);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_80_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(81, "span", 36);
      \u0275\u0275text(82, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(83, EquipmentInventory_For_84_Template, 2, 2, "button", 37, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(85, "button", 35);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_85_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(86, "span", 36);
      \u0275\u0275text(87, " chevron_right ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(88, "app-common-dialog", 38);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_88_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275elementStart(89, "div", 39)(90, "h3", 40);
      \u0275\u0275text(91, "New Equipment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "button", 41);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_92_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275elementStart(93, "span", 42);
      \u0275\u0275text(94, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(95, "div", 43)(96, "div", 44)(97, "label", 45);
      \u0275\u0275text(98, "Equipment Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "select", 46);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_select_ngModelChange_99_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.equipment_master_id, $event) || (ctx.newMaterial.equipment_master_id = $event);
        return $event;
      });
      \u0275\u0275listener("change", function EquipmentInventory_Template_select_change_99_listener($event) {
        return ctx.getSelectedMat($event);
      });
      \u0275\u0275elementStart(100, "option", 47);
      \u0275\u0275text(101, "Select Equipment");
      \u0275\u0275elementEnd();
      \u0275\u0275template(102, EquipmentInventory_option_102_Template, 2, 2, "option", 48);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(103, "div")(104, "label", 45);
      \u0275\u0275text(105, "SKU Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "input", 49);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_106_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.sku, $event) || (ctx.newMaterial.sku = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(107, "div")(108, "label", 45);
      \u0275\u0275text(109, "Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(110, "select", 50);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_select_ngModelChange_110_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.category, $event) || (ctx.newMaterial.category = $event);
        return $event;
      });
      \u0275\u0275elementStart(111, "option", 51);
      \u0275\u0275text(112, "Concrete");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "option", 52);
      \u0275\u0275text(114, "Steel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "option", 53);
      \u0275\u0275text(116, "Electrical");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(117, "option", 54);
      \u0275\u0275text(118, "Lumber");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(119, "option", 55);
      \u0275\u0275text(120, "Finishing");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "option", 56);
      \u0275\u0275text(122, "Chemicals");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(123, "div")(124, "label", 45);
      \u0275\u0275text(125, "Project");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(126, "select", 46);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_select_ngModelChange_126_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.project_id, $event) || (ctx.newMaterial.project_id = $event);
        return $event;
      });
      \u0275\u0275listener("change", function EquipmentInventory_Template_select_change_126_listener($event) {
        return ctx.getProject($event);
      });
      \u0275\u0275repeaterCreate(127, EquipmentInventory_For_128_Template, 2, 2, "option", 57, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(129, "div")(130, "label", 45);
      \u0275\u0275text(131, " Stock In");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(132, "input", 58);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_132_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.stockIn, $event) || (ctx.newMaterial.stockIn = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(133, "div")(134, "label", 45);
      \u0275\u0275text(135, " Cost");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(136, "input", 59);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_input_ngModelChange_136_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.cost, $event) || (ctx.newMaterial.cost = $event);
        return $event;
      });
      \u0275\u0275listener("blur", function EquipmentInventory_Template_input_blur_136_listener() {
        return ctx.formatCost();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(137, "div")(138, "label", 45);
      \u0275\u0275text(139, "Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(140, "select", 46);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_select_ngModelChange_140_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newMaterial.vendor_id, $event) || (ctx.newMaterial.vendor_id = $event);
        return $event;
      });
      \u0275\u0275listener("change", function EquipmentInventory_Template_select_change_140_listener($event) {
        return ctx.getvendor($event);
      });
      \u0275\u0275elementStart(141, "option", 60);
      \u0275\u0275text(142, "Select Vendor");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(143, EquipmentInventory_For_144_Template, 2, 2, "option", 57, _forTrack1);
      \u0275\u0275elementStart(145, "option", 61);
      \u0275\u0275text(146, " + Add New Vendor ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(147, "div", 62)(148, "button", 63);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_148_listener() {
        return ctx.showAddModal = false;
      });
      \u0275\u0275text(149, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "button", 64);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_150_listener() {
        return ctx.addMaterial();
      });
      \u0275\u0275text(151, "Add to Inventory");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(152, "app-common-dialog", 38);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_152_listener() {
        return ctx.showEditModal = false;
      });
      \u0275\u0275template(153, EquipmentInventory_ng_container_153_Template, 51, 6, "ng-container", 65);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(154, "app-common-dialog", 66);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_154_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function EquipmentInventory_Template_app_common_dialog_primary_154_listener() {
        return ctx.confirmDelete();
      });
      \u0275\u0275elementStart(155, "div", 67)(156, "p", 68);
      \u0275\u0275text(157, "Are you sure you want to remove ");
      \u0275\u0275elementStart(158, "span", 69);
      \u0275\u0275text(159);
      \u0275\u0275elementEnd();
      \u0275\u0275text(160, "? This action cannot be undone. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(161, "app-common-dialog", 70);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_161_listener() {
        return ctx.showAssignProjectModal = false;
      })("primary", function EquipmentInventory_Template_app_common_dialog_primary_161_listener() {
        return ctx.assignProjects();
      });
      \u0275\u0275elementStart(162, "div", 71)(163, "div", 72)(164, "div", 43)(165, "div")(166, "p", 73);
      \u0275\u0275text(167, " Equipment Name ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(168, "p", 74);
      \u0275\u0275text(169);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(170, "div", 75)(171, "p", 73);
      \u0275\u0275text(172, " Available Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(173, "p", 76);
      \u0275\u0275text(174);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(175, "div", 77);
      \u0275\u0275repeaterCreate(176, EquipmentInventory_For_177_Template, 18, 4, "div", 78, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(178, "button", 79);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_178_listener() {
        return ctx.addProjectRow();
      });
      \u0275\u0275elementStart(179, "span", 80);
      \u0275\u0275text(180, " add ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(181, " Add More Project ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(182, "div", 81)(183, "div", 82)(184, "div")(185, "p", 73);
      \u0275\u0275text(186, " Total Assigned ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(187, "p", 83);
      \u0275\u0275text(188);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(189, "div", 84)(190, "p", 73);
      \u0275\u0275text(191, " Remaining Stock ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(192, "p", 85);
      \u0275\u0275text(193);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(194, EquipmentInventory_Conditional_194_Template, 5, 1, "div", 86);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(195, "app-common-dialog", 87);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_195_listener() {
        return ctx.showProjectStockPopup = false;
      });
      \u0275\u0275elementStart(196, "div", 88);
      \u0275\u0275conditionalCreate(197, EquipmentInventory_Conditional_197_Template, 8, 0, "div", 89)(198, EquipmentInventory_Conditional_198_Template, 3, 0, "div", 90);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(199, EquipmentInventory_Conditional_199_Template, 31, 0, "div", 91);
      \u0275\u0275elementStart(200, "app-common-dialog", 92);
      \u0275\u0275listener("closed", function EquipmentInventory_Template_app_common_dialog_closed_200_listener() {
        return ctx.showStockTransferModal = false;
      })("primary", function EquipmentInventory_Template_app_common_dialog_primary_200_listener() {
        return ctx.transferStock();
      });
      \u0275\u0275elementStart(201, "div", 93)(202, "div", 94)(203, "div", 95)(204, "span", 96);
      \u0275\u0275text(205, " inventory_2 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(206, "div", 97)(207, "h3", 98);
      \u0275\u0275text(208);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(209, "div", 99)(210, "div", 100);
      \u0275\u0275text(211);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(212, "div", 101);
      \u0275\u0275text(213);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(214, "div", 102);
      \u0275\u0275text(215);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(216, "div", 103);
      \u0275\u0275repeaterCreate(217, EquipmentInventory_For_218_Template, 29, 6, "div", 104, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(219, "button", 105);
      \u0275\u0275listener("click", function EquipmentInventory_Template_button_click_219_listener() {
        return ctx.addTransferRow();
      });
      \u0275\u0275elementStart(220, "span", 42);
      \u0275\u0275text(221, " add ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(222, " Add Transfer Row ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(223, "div", 106)(224, "label", 107);
      \u0275\u0275text(225, " Remarks ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(226, "textarea", 108);
      \u0275\u0275twoWayListener("ngModelChange", function EquipmentInventory_Template_textarea_ngModelChange_226_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.stockTransferData.transfer_note, $event) || (ctx.stockTransferData.transfer_note = $event);
        return $event;
      });
      \u0275\u0275text(227, "      ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(228, "app-vendor-add-modal", 109);
      \u0275\u0275listener("close", function EquipmentInventory_Template_app_vendor_add_modal_close_228_listener() {
        return ctx.showAddVendorModal = false;
      })("save", function EquipmentInventory_Template_app_vendor_add_modal_save_228_listener() {
        return ctx.addVendor();
      })("contractSelect", function EquipmentInventory_Template_app_vendor_add_modal_contractSelect_228_listener($event) {
        return ctx.onContractFileSelected($event);
      })("onlyNumberEvent", function EquipmentInventory_Template_app_vendor_add_modal_onlyNumberEvent_228_listener($event) {
        return ctx.onlyNumbers($event);
      })("onlyAlphaNumericEvent", function EquipmentInventory_Template_app_vendor_add_modal_onlyAlphaNumericEvent_228_listener($event) {
        return ctx.onlyAlphanumeric($event);
      })("pasteNumericEvent", function EquipmentInventory_Template_app_vendor_add_modal_pasteNumericEvent_228_listener($event) {
        return ctx.stripNonNumericOnPaste($event.event, $event.field, $event.len);
      })("pasteAlphaNumericEvent", function EquipmentInventory_Template_app_vendor_add_modal_pasteAlphaNumericEvent_228_listener($event) {
        return ctx.stripNonAlphanumericOnPaste($event.event, $event.field, $event.len);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate1(" ", ctx.materials.length, " ");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ctx.noOfProjectsAssigned, " ");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(30, 57, ctx.getInventoryValue(), "1.0-0"), " ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.noOfProjectsNotAssigned, " ");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(20);
      \u0275\u0275repeater(ctx.paginatedMaterials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredMaterials.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - ", ctx.endItem, " of ", ctx.filteredMaterials.length, " Equipment ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(60, _c02).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showAddModal)("contentClass", "overflow-y-auto");
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.equipment_master_id);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.MaterialMaster);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.sku);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.category);
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.project_id);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.projects);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.stockIn);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.cost);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newMaterial.vendor_id);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.vendors);
      \u0275\u0275advance(9);
      \u0275\u0275property("open", ctx.showEditModal && !!ctx.materialToEdit)("contentClass", "overflow-y-auto");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.materialToEdit);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.materialToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1('"', ctx.materialToDelete == null ? null : ctx.materialToDelete.name, '"');
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showAssignProjectModal)("showCloseButton", true)("showFooter", true)("primaryDisabled", ctx.getRemainingStock() < 0)("contentClass", "overflow-y-auto");
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
      \u0275\u0275conditional(ctx.projectAssignError ? 194 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showProjectStockPopup)("subtitle", ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.name)("showCloseButton", true)("showFooter", false)("contentClass", "overflow-y-auto");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!(ctx.selectedProjectStock == null ? null : ctx.selectedProjectStock.equipment_project_stock == null ? null : ctx.selectedProjectStock.equipment_project_stock.length) ? 197 : 198);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showFilters ? 199 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showStockTransferModal)("showCloseButton", true)("showFooter", true)("contentClass", "min-h-0 overflow-y-auto");
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
  }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, VendorAddComponent, CommonDialogComponent, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EquipmentInventory, [{
    type: Component,
    args: [{ selector: "app-equipment-inventory", standalone: false, template: `<!-- Content Area -->\r
<section class="p-4 flex flex-col gap-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">\r
    <!-- Page Header & Key Metrics -->\r
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">\r
        <div class="space-y-1">\r
            <h2 class="text-3xl font-black text-slate-800 dark:text-white">Equipment Inventory\r
            </h2>\r
            <p class="text-on-surface-variant/80 font-medium">Precision tracking across active construction sites</p>\r
        </div>\r
        <!-- <div class="flex gap-3">\r
            <div\r
                class="flex items-center gap-3 bg-surface-container-highest px-4 py-2 rounded-xl border border-outline-variant/10 shadow-sm">\r
                <span class="material-symbols-outlined text-outline text-sm">filter_alt</span>\r
                <select [(ngModel)]="selectedMember"\r
                    class="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-on-surface outline-none cursor-pointer appearance-none pr-4">\r
                    <option *ngFor="let m of team" [value]="m.name">{{ m.name }}</option>\r
                </select>\r
            </div>\r
            <button (click)="showFilters = !showFilters"\r
                class="px-5 py-2.5 bg-surface-container-highest text-primary rounded-xl font-bold flex items-center gap-2 hover:bg-surface-dim transition-colors cursor-pointer">\r
                <span class="material-symbols-outlined text-lg"\r
                    style="font-variation-settings: 'FILL' 1;">filter_list</span>\r
                Filters\r
            </button>\r
         \r
        </div> -->\r
    </div>\r
\r
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">\r
\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Total SKU\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black">\r
                    {{ materials.length }}\r
                </span>\r
\r
                <span class="text-xs font-bold text-green-600">\r
                    Active\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32 border-l-4 border-l-secondary-container">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Assigned Items\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black text-secondary">\r
                    {{ noOfProjectsAssigned }}\r
                </span>\r
\r
                <span class="material-symbols-outlined text-secondary-container"\r
                    style="font-variation-settings: 'FILL' 1;">\r
                    assignment_turned_in\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Inventory Value\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black text-primary">\r
                    \u20B9{{getInventoryValue() | number:'1.0-0'\r
                    }}\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
        <div\r
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col justify-between h-32">\r
\r
            <span class="text-xs font-bold uppercase tracking-widest text-outline">\r
                Not Assigned\r
            </span>\r
\r
            <div class="flex items-baseline gap-2">\r
\r
                <span class="text-3xl font-black">\r
                    {{noOfProjectsNotAssigned }}\r
                </span>\r
\r
                <span class="material-symbols-outlined text-outline">\r
                    pending_actions\r
                </span>\r
\r
            </div>\r
\r
        </div>\r
\r
    </div>\r
\r
    <!-- Filter Tabs -->\r
    <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">\r
        @for (tab of categories; track tab) {\r
        <button (click)="changeTab(tab)"\r
            [class]="selectedTab === tab.category_name ? 'bg-gradient-to-r from-[#3a66b0] via-[#5b7fd1] to-[#7c4dff] text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-dim'"\r
            class="px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-colors">\r
            {{ tab.category_name }}\r
        </button>\r
        }\r
\r
    </div>\r
\r
    <!-- Inventory Table Container -->\r
    <div\r
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">\r
\r
        <!-- Table Wrapper -->\r
        <div\r
            class="overflow-hidden rounded-[28px] border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">\r
\r
            <!-- Top Bar -->\r
            <div\r
                class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">\r
\r
                <div>\r
\r
                    <h3 class="text-xl font-black tracking-tight text-slate-800 dark:text-white">\r
                        Equipment Inventory\r
                    </h3>\r
\r
                    <p class="text-sm text-slate-500 font-medium mt-1">\r
                        Live equipment availability & supplier tracking\r
                    </p>\r
\r
                </div>\r
\r
                <div class="flex items-center gap-3">\r
\r
                    <div\r
                        class="flex items-center gap-2 px-4 h-11 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm w-full lg:w-[320px]">\r
\r
                        <span class="material-symbols-outlined text-slate-400 text-[20px]">\r
                            search\r
                        </span>\r
\r
                        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
                            placeholder="Search equipment..."\r
                            class="bg-transparent outline-none text-sm font-medium w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400">\r
\r
                    </div>\r
                </div>\r
\r
            </div>\r
\r
            <!-- Table -->\r
            <div class="overflow-x-auto px-4 py-4">\r
\r
                <table class="w-full min-w-[1100px] border-separate border-spacing-y-4">\r
\r
                    <!-- Head -->\r
                    <thead>\r
\r
                        <tr>\r
\r
                            <th\r
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">\r
                                Equipment\r
                            </th>\r
\r
                            <th\r
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">\r
                                Category\r
                            </th>\r
\r
                            <th\r
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">\r
                                Stock\r
                            </th>\r
\r
                            <th class="px-6 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">\r
                                Assigned Projects\r
                            </th>\r
\r
\r
                            <th\r
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">\r
                                Cost\r
                            </th>\r
\r
                            <th\r
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">\r
                                Vendor\r
                            </th>\r
\r
                            <th\r
                                class="px-6 text-left text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">\r
                                Action\r
                            </th>\r
\r
                        </tr>\r
\r
                    </thead>\r
\r
                    <!-- Body -->\r
                    <tbody>\r
\r
                        @for (item of paginatedMaterials; track item.sku) {\r
\r
                        <tr\r
                            class="group relative z-0 hover:z-[9999] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl">\r
\r
                            <!-- Equipment -->\r
                            <td\r
                                class="px-6 py-5 rounded-l-[26px] bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
                                <div class="flex items-center gap-4">\r
\r
                                    <!-- Icon -->\r
                                    <div\r
                                        class="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">\r
\r
                                        <div\r
                                            class="absolute inset-0 rounded-2xl bg-primary/10 scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity">\r
                                        </div>\r
\r
                                        <span class="material-symbols-outlined text-primary text-[24px] relative z-10">\r
                                            construction\r
                                        </span>\r
\r
                                    </div>\r
\r
                                    <!-- Info -->\r
                                    <div class="space-y-1">\r
\r
                                        <p\r
                                            class="font-black text-[15px] text-slate-800 dark:text-white group-hover:text-primary transition-colors">\r
\r
                                            {{ item.name }}\r
\r
                                        </p>\r
\r
                                        <div class="flex items-center gap-2">\r
\r
                                            <span\r
                                                class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-wide text-slate-500">\r
                                                SKU\r
                                            </span>\r
\r
                                            <span class="text-xs text-slate-400 font-semibold">\r
                                                {{ item.sku }}\r
                                            </span>\r
\r
                                        </div>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Category -->\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <span\r
                                    class="inline-flex items-center px-4 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wide">\r
\r
                                    {{ item.category }}\r
\r
                                </span>\r
\r
                            </td>\r
\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div class="w-[210px] flex flex-col gap-3">\r
\r
                                    <div class="flex items-center gap-3 text-sm font-black">\r
\r
                                        <!-- Available -->\r
                                        <div class="flex items-center gap-1 text-slate-800 dark:text-slate-100">\r
\r
                                            <span class="material-symbols-outlined text-[16px]">\r
                                                inventory_2\r
                                            </span>\r
\r
                                            <span>{{ item.stockRemaining }}</span>\r
\r
                                        </div>\r
\r
                                        <!-- Status -->\r
                                        <span [ngClass]="item.stockUsed >= item.stockRemaining\r
      ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'\r
      : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'" class="ml-2 px-2.5 py-1 rounded-full\r
           text-[10px] font-black uppercase tracking-wide">Stock\r
\r
                                        </span>\r
\r
                                    </div>\r
                                    <!-- Progress -->\r
                                    <div\r
                                        class="relative w-full h-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">\r
\r
                                        <div class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container transition-all duration-700"\r
                                            [style.width.%]="item.stockIn > 100 ? 100 : item.stockIn">\r
                                        </div>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <td class="px-6 py-5 bg-white dark:bg-slate-900\r
         border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div (click)="item.equipment_project_stock?.length > 0 && openProjectStockPopup(item)"\r
                                    class="inline-flex items-center gap-3 px-3.5 py-2\r
           rounded-xl border transition-all duration-300" [ngClass]="item.equipment_project_stock?.length > 0\r
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-900/10'\r
      : 'cursor-not-allowed opacity-70 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'">\r
\r
                                    <!-- Icon -->\r
                                    <div [ngClass]="item.equipment_project_stock?.length > 0\r
        ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600'\r
        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'"\r
                                        class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">\r
\r
                                        <span class="material-symbols-outlined text-[18px]">\r
\r
                                            {{ item.equipment_project_stock?.length > 0\r
                                            ? 'apartment'\r
                                            : 'inventory_2' }}\r
\r
                                        </span>\r
\r
                                    </div>\r
\r
                                    <!-- Content -->\r
                                    <div class="flex flex-col leading-tight min-w-[90px]">\r
\r
                                        @if ((item.equipment_project_stock?.length || 0) > 0) {\r
                                        <span class="text-sm font-black text-slate-800 dark:text-white">\r
                                            {{ item.equipment_project_stock?.length }}\r
                                            {{ item.equipment_project_stock?.length === 1 ? 'Project' : 'Projects' }}\r
                                        </span>\r
                                        }\r
\r
                                        <span [ngClass]="(item.equipment_project_stock?.length || 0) > 0\r
            ? 'text-indigo-600 dark:text-indigo-400'\r
            : 'text-rose-500 dark:text-rose-400'" class="text-[10px] font-bold uppercase tracking-wide">\r
\r
                                            {{ (item.equipment_project_stock?.length || 0) > 0\r
                                            ? 'Assigned'\r
                                            : 'Not Assigned' }}\r
\r
                                        </span>\r
\r
                                    </div>\r
\r
                                    <!-- Arrow -->\r
                                    <span class="material-symbols-outlined text-[14px]\r
             text-slate-400">\r
\r
                                        arrow_forward_ios\r
\r
                                    </span>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Cost -->\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div class="flex flex-col">\r
\r
                                    <span class="text-lg font-black text-slate-800 dark:text-white">\r
                                        \u20B9{{ item.cost }}\r
                                    </span>\r
\r
                                    <span class="text-[11px] text-slate-400 font-semibold">\r
                                        Per Unit\r
                                    </span>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Vendor -->\r
                            <td\r
                                class="px-6 py-5 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">\r
\r
                                <div class="flex items-center gap-3">\r
\r
                                    <div\r
                                        class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center text-sm font-black text-white shadow-lg">\r
\r
                                        {{ item.vendor_name.charAt(0) }}\r
\r
                                    </div>\r
\r
                                    <div>\r
\r
                                        <p class="text-sm font-black text-slate-700 dark:text-slate-200">\r
                                            {{ item.vendor_name }}\r
                                        </p>\r
\r
                                        <p class="text-[11px] text-slate-400 font-medium">\r
                                            Verified Supplier\r
                                        </p>\r
\r
                                    </div>\r
\r
                                </div>\r
\r
                            </td>\r
\r
                            <!-- Status -->\r
                            <td\r
                                class="px-6 py-5 rounded-r-[26px] bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 shadow-sm">\r
\r
                                <div class="flex items-center justify-between gap-4">\r
                                    <!-- Actions -->\r
                                    <div class="flex items-center gap-2">\r
\r
                                        <!-- Edit -->\r
                                        <button (click)="openAssignProjectModal(item)" title="Assign to Project"\r
                                            class="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                            <span class="material-symbols-outlined text-[18px]">\r
                                                assignment_ind\r
                                            </span>\r
\r
                                        </button>\r
                                        <button (click)="openStockTransferModal(item)" title="Transfer Stock"\r
                                            [disabled]="!item.equipment_project_stock?.length" [ngClass]="\r
      item.equipment_project_stock?.length\r
        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-lg cursor-pointer'\r
        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'\r
    " class="w-11 h-11 rounded-2xl transition-all duration-200 flex items-center justify-center">\r
\r
                                            <span class="material-symbols-outlined text-[18px]">\r
                                                transfer_within_a_station\r
                                            </span>\r
\r
                                        </button>\r
\r
                                        <!-- Delete -->\r
                                        <button (click)="openDeleteModal($event, item)" title="Delete Material"\r
                                            class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">\r
\r
                                            <span class="material-symbols-outlined text-[18px]">\r
                                                delete\r
                                            </span>\r
\r
                                        </button>\r
\r
                                    </div>\r
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
\r
        </div>\r
\r
        <!-- Pagination -->\r
        <div\r
            class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">\r
\r
            <!-- Count -->\r
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500">\r
\r
                Showing\r
                {{ filteredMaterials.length ? ((page - 1) * pageSize) + 1 : 0 }}\r
                -\r
                {{endItem}}\r
\r
                of\r
\r
                {{ filteredMaterials.length}} Equipment\r
\r
            </p>\r
            <!-- Pagination Buttons -->\r
            <div class="flex items-center gap-2">\r
\r
                <!-- Prev -->\r
                <button (click)="prevPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_left\r
                    </span>\r
\r
                </button>\r
\r
                <!-- Numbers -->\r
                @for (p of [].constructor(totalPages()); track $index) {\r
\r
                <button (click)="goToPage($index + 1)"\r
                    class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer"\r
                    [ngClass]="page === ($index + 1)\r
                ? 'bg-primary text-white shadow-md'\r
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'">\r
\r
                    {{ $index + 1 }}\r
\r
                </button>\r
\r
                }\r
\r
                <!-- Next -->\r
                <button (click)="nextPage()"\r
                    class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        chevron_right\r
                    </span>\r
\r
                </button>\r
\r
            </div>\r
\r
        </div>\r
\r
    </div>\r
</section>\r
\r
<!-- Modals -->\r
<!-- Add Material Modal -->\r
<app-common-dialog [open]="showAddModal" (closed)="showAddModal = false" panelClass="p-8 max-w-lg"\r
    [contentClass]="'overflow-y-auto'">\r
    <div class="flex justify-between items-center mb-6">\r
        <h3 class="text-2xl font-black tracking-tight">New Equipment</h3>\r
        <button (click)="showAddModal = false"\r
            class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">\r
            <span class="material-symbols-outlined">close</span>\r
        </button>\r
    </div>\r
\r
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
        <div class="md:col-span-2">\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Equipment\r
                Name</label>\r
            <select [(ngModel)]="newMaterial.equipment_master_id" (change)="getSelectedMat($event)"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
\r
                <option value="" disabled>Select Equipment</option>\r
\r
                <option *ngFor="let material of MaterialMaster" [value]="material.id">\r
                    {{ material.name }}\r
                </option>\r
\r
            </select>\r
        </div>\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>\r
            <input [(ngModel)]="newMaterial.sku" type="text" placeholder="SKU-XXX-X"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
        </div>\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
            <select [(ngModel)]="newMaterial.category"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                <option value="Concrete">Concrete</option>\r
                <option value="Steel">Steel</option>\r
                <option value="Electrical">Electrical</option>\r
                <option value="Lumber">Lumber</option>\r
                <option value="Finishing">Finishing</option>\r
                <option value="Chemicals">Chemicals</option>\r
            </select>\r
        </div>\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>\r
            <select [(ngModel)]="newMaterial.project_id" (change)="getProject($event)"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                @for (p of projects; track p.id) {\r
                <option [value]="p.id">{{ p.name }}</option>\r
                }\r
            </select>\r
        </div>\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                Stock In</label>\r
            <input [(ngModel)]="newMaterial.stockIn" type="number" min="1"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
        </div>\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                Cost</label>\r
            <input [(ngModel)]="newMaterial.cost" min="1" type="number" (blur)="formatCost()" placeholder="0.00"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
        </div>\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Vendor</label>\r
            <select [(ngModel)]="newMaterial.vendor_id" (change)="getvendor($event)"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                <option value="" disabled selected>Select Vendor</option>\r
\r
                @for (v of vendors; track v.id) {\r
                <option [value]="v.id">\r
                    {{ v.name }}\r
                </option>\r
                }\r
\r
                <option value="ADD_NEW" class="text-primary font-bold">\r
                    + Add New Vendor\r
                </option>\r
            </select>\r
        </div>\r
    </div>\r
\r
    <div class="flex gap-3 mt-8">\r
        <button (click)="showAddModal = false"\r
            class="flex-1 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors">Cancel</button>\r
        <button (click)="addMaterial()"\r
            class="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Add\r
            to Inventory</button>\r
    </div>\r
</app-common-dialog>\r
\r
<!-- Edit Material Modal -->\r
<app-common-dialog [open]="showEditModal && !!materialToEdit" (closed)="showEditModal = false" panelClass="p-8 max-w-lg"\r
    [contentClass]="'overflow-y-auto'">\r
    <ng-container *ngIf="materialToEdit">\r
        <div class="flex justify-between items-center mb-6">\r
            <h3 class="text-2xl font-black tracking-tight">Edit material</h3>\r
            <button (click)="showEditModal = false"\r
                class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">\r
                <span class="material-symbols-outlined">close</span>\r
            </button>\r
        </div>\r
\r
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div class="md:col-span-2">\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Material\r
                    Name</label>\r
                <input [value]="materialToEdit.name" type="text" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">SKU Code</label>\r
                <input [value]="materialToEdit.sku" type="text" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-slate-50 dark:bg-slate-800/50 text-sm font-bold outline-none cursor-not-allowed">\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Category</label>\r
                <select [ngModel]="materialToEdit.category" disabled\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                    <option value="Concrete">Concrete</option>\r
                    <option value="Steel">Steel</option>\r
                    <option value="Electrical">Electrical</option>\r
                    <option value="Lumber">Lumber</option>\r
                    <option value="Finishing">Finishing</option>\r
                    <option value="Chemicals">Chemicals</option>\r
                </select>\r
            </div>\r
\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                    Stock In</label>\r
                <input [value]="materialToEdit.stockIn" type="number"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30"\r
                    readonly>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">\r
                    Cost</label>\r
                <input [value]="materialToEdit.cost" type="number" (blur)="formatCostEdit()" readonly\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/30">\r
            </div>\r
\r
\r
            <!-- <div>\r
                <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Supplier</label>\r
                <select [(ngModel)]="materialToEdit.vendor_id" (change)="getvendor($event)"\r
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                    @for (v of vendors; track v.id) {\r
                    <option [value]="v.id">{{ v.name }}</option>\r
                    }\r
                </select>\r
            </div> -->\r
        </div>\r
\r
        <div>\r
            <label class="text-[10px] font-black uppercase tracking-widest text-outline mb-1 block">Project</label>\r
            <select [(ngModel)]="materialToEdit.project_id" (change)="getProject($event)"\r
                class="w-full px-4 py-3 rounded-xl border border-outline-variant/20 dark:border-slate-800 text-sm font-bold outline-none bg-white dark:bg-slate-900">\r
                @for (p of projects; track p.id) {\r
                <option [value]="p.id">{{ p.name }}</option>\r
                }\r
            </select>\r
        </div>\r
\r
        <div class="flex gap-3 mt-8">\r
            <button (click)="showEditModal = false"\r
                class="flex-1 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors">Cancel</button>\r
            <button (click)="updateMaterial()"\r
                class="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Save\r
                Changes</button>\r
        </div>\r
    </ng-container>\r
</app-common-dialog>\r
\r
<!-- Delete Confirmation Modal -->\r
<app-common-dialog [open]="showDeleteModal && !!materialToDelete" variant="danger" title="Delete Material?"\r
    subtitle="This action cannot be undone." icon="delete_forever" [showCloseButton]="true" [showFooter]="true"\r
    cancelLabel="Cancel" primaryLabel="Delete Item" (closed)="showDeleteModal = false" (primary)="confirmDelete()">\r
    <div class="p-8 text-center">\r
        <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
                class="text-on-surface font-black">"{{ materialToDelete?.name }}"</span>? This action cannot be undone.\r
        </p>\r
    </div>\r
</app-common-dialog>\r
\r
<app-common-dialog [open]="showAssignProjectModal" title="Assign Equipment" subtitle="Allocate stock project wise"\r
    [showCloseButton]="true" [showFooter]="true" cancelLabel="Cancel" primaryLabel="Assign Stock"\r
    [primaryDisabled]="getRemainingStock() < 0" (closed)="showAssignProjectModal = false" (primary)="assignProjects()"\r
    panelClass="max-w-3xl" [contentClass]="'overflow-y-auto'">\r
    <div class="p-7">\r
\r
        <!-- Material Info -->\r
        <div class="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40\r
           border border-slate-200 dark:border-slate-700">\r
\r
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
\r
                <div>\r
                    <p class="text-[10px] uppercase tracking-[0.2em]\r
                  font-black text-slate-400 mb-1">\r
                        Equipment Name\r
                    </p>\r
\r
                    <p class="text-sm md:text-base font-black text-slate-900 dark:text-white">\r
                        {{ materialToEdit?.name }}\r
                    </p>\r
                </div>\r
\r
                <div class="md:text-right">\r
                    <p class="text-[10px] uppercase tracking-[0.2em]\r
                  font-black text-slate-400 mb-1">\r
                        Available Stock\r
                    </p>\r
\r
                    <p class="text-lg font-black text-emerald-600">\r
                        {{ materialToEdit?.stockRemaining }}\r
                    </p>\r
                </div>\r
\r
            </div>\r
\r
        </div>\r
\r
        <!-- Dynamic Rows -->\r
        <div class="space-y-3">\r
\r
            @for (item of assignedProjects; track $index) {\r
\r
            <div class="p-4 rounded-2xl border border-slate-200\r
             dark:border-slate-700 bg-slate-50/60\r
             dark:bg-slate-800/30 transition-all">\r
\r
                <div class="grid grid-cols-12 gap-3 items-end">\r
\r
                    <!-- Project -->\r
                    <div class="col-span-12 md:col-span-7">\r
\r
                        <label class="text-[9px] uppercase tracking-[0.18em]\r
                   font-black text-slate-400 mb-1.5 block">\r
\r
                            Select Project\r
                        </label>\r
\r
                        <select [(ngModel)]="item.project_id" (change)="validateAssignedStock()" class="w-full px-4 py-3 rounded-xl border\r
                   border-slate-200 dark:border-slate-700\r
                   bg-white dark:bg-slate-900\r
                   text-sm font-semibold outline-none\r
                   focus:ring-2 focus:ring-indigo-500/20\r
                   focus:border-indigo-500 transition-all">\r
\r
                            <option [ngValue]="null">\r
                                Choose Project\r
                            </option>\r
\r
                            @for (project of projects; track project.id) {\r
                            <option [ngValue]="project.id">\r
                                {{ project.name }}\r
                            </option>\r
                            }\r
\r
                        </select>\r
\r
                    </div>\r
\r
                    <!-- Qty -->\r
                    <div class="col-span-9 md:col-span-4">\r
\r
                        <label class="text-[9px] uppercase tracking-[0.18em]\r
                   font-black text-slate-400 mb-1.5 block">\r
\r
                            Stock Qty\r
                        </label>\r
\r
                        <input type="number" min="1" [(ngModel)]="item.stock" (input)="validateAssignedStock()"\r
                            placeholder="Enter qty" class="w-full px-4 py-3 rounded-xl border\r
                   border-slate-200 dark:border-slate-700\r
                   bg-white dark:bg-slate-900\r
                   text-sm font-semibold outline-none\r
                   focus:ring-2 focus:ring-indigo-500/20\r
                   focus:border-indigo-500 transition-all">\r
\r
                    </div>\r
\r
                    <!-- Remove -->\r
                    <div class="col-span-3 md:col-span-1 flex justify-end">\r
\r
                        <button type="button" (click)="removeProjectRow($index)"\r
                            [disabled]="assignedProjects.length === 1" class="w-11 h-11 rounded-xl bg-rose-100\r
                   text-rose-600 hover:bg-rose-200\r
                   transition-all flex items-center\r
                   justify-center disabled:opacity-40\r
                   disabled:cursor-not-allowed">\r
\r
                            <span class="material-symbols-outlined text-[18px]">\r
                                delete\r
                            </span>\r
\r
                        </button>\r
\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
            }\r
\r
        </div>\r
\r
        <!-- Add More -->\r
        <button type="button" (click)="addProjectRow()" class="mt-5 w-full border-2 border-dashed\r
           border-indigo-300 dark:border-indigo-700\r
           rounded-2xl py-3.5 text-indigo-600\r
           dark:text-indigo-400 font-black text-sm\r
           hover:bg-indigo-50 dark:hover:bg-indigo-900/10\r
           transition-all flex items-center\r
           justify-center gap-2">\r
\r
            <span class="material-symbols-outlined text-[20px]">\r
                add\r
            </span>\r
\r
            Add More Project\r
\r
        </button>\r
\r
        <!-- Summary -->\r
        <div class="mt-6 p-5 rounded-2xl border border-indigo-200\r
           dark:border-indigo-800 bg-indigo-50\r
           dark:bg-indigo-900/10">\r
\r
            <div class="grid grid-cols-2 gap-4">\r
\r
                <div>\r
                    <p class="text-[10px] uppercase tracking-[0.2em]\r
                  font-black text-slate-400 mb-1">\r
                        Total Assigned\r
                    </p>\r
\r
                    <p class="text-2xl font-black text-indigo-600">\r
                        {{ getTotalAssignedStock() }}\r
                    </p>\r
                </div>\r
\r
                <div class="text-right">\r
                    <p class="text-[10px] uppercase tracking-[0.2em]\r
                  font-black text-slate-400 mb-1">\r
                        Remaining Stock\r
                    </p>\r
\r
                    <p [ngClass]="getRemainingStock() < 0\r
            ? 'text-rose-600'\r
            : 'text-emerald-600'" class="text-2xl font-black">\r
\r
                        {{ getRemainingStock() }}\r
                    </p>\r
                </div>\r
\r
            </div>\r
\r
        </div>\r
\r
        <!-- Error -->\r
        @if (projectAssignError) {\r
\r
        <div class="mt-5 flex items-start gap-3 px-4 py-3 rounded-2xl\r
           bg-rose-50 dark:bg-rose-900/10\r
           border border-rose-200 dark:border-rose-800\r
           text-rose-700 dark:text-rose-400">\r
\r
            <span class="material-symbols-outlined text-[20px]">\r
                error\r
            </span>\r
\r
            <p class="text-sm font-semibold leading-relaxed">\r
                {{ projectAssignError }}\r
            </p>\r
\r
        </div>\r
\r
        }\r
\r
    </div>\r
\r
</app-common-dialog>\r
\r
<app-common-dialog [open]="showProjectStockPopup" title="Project Assignment" [subtitle]="selectedProjectStock?.name"\r
    [showCloseButton]="true" [showFooter]="false" (closed)="showProjectStockPopup = false" panelClass="p-6 max-w-2xl"\r
    [contentClass]="'overflow-y-auto'">\r
    <div class="p-6">\r
\r
        @if (!selectedProjectStock?.equipment_project_stock?.length) {\r
\r
        <!-- Empty -->\r
        <div class="flex flex-col items-center justify-center\r
               py-14 text-center">\r
\r
            <div class="w-20 h-20 rounded-3xl bg-slate-100\r
                 dark:bg-slate-800 flex items-center\r
                 justify-center mb-5">\r
\r
                <span class="material-symbols-outlined text-[40px]\r
                   text-slate-400">\r
\r
                    inventory_2\r
\r
                </span>\r
\r
            </div>\r
\r
            <h4 class="text-lg font-black text-slate-800\r
                 dark:text-white">\r
\r
                No Project Assigned\r
\r
            </h4>\r
\r
            <p class="text-sm text-slate-500 mt-2">\r
\r
                This material is not assigned to any project yet.\r
\r
            </p>\r
\r
        </div>\r
\r
        } @else {\r
\r
        <!-- Assigned Projects -->\r
        <div class="space-y-4 max-h-[420px] overflow-y-auto pr-1">\r
\r
            @for (p of selectedProjectStock.equipment_project_stock; track $index) {\r
\r
            <div class="p-5 rounded-2xl border border-slate-200\r
                 dark:border-slate-700 bg-slate-50/70\r
                 dark:bg-slate-800/40">\r
\r
                <div class="flex items-center justify-between gap-4">\r
\r
                    <!-- Left -->\r
                    <div class="flex items-center gap-4">\r
\r
                        <div class="w-14 h-14 rounded-2xl\r
                       bg-indigo-100 dark:bg-indigo-500/10\r
                       text-indigo-600 flex items-center\r
                       justify-center">\r
\r
                            <span class="material-symbols-outlined">\r
                                apartment\r
                            </span>\r
\r
                        </div>\r
\r
                        <div>\r
\r
                            <h4 class="text-sm font-black text-slate-800\r
                         dark:text-white">\r
\r
                                {{ p.project_name }}\r
\r
                            </h4>\r
\r
                            <p class="text-xs text-slate-400 mt-1">\r
\r
                                Assigned Project\r
\r
                            </p>\r
\r
                        </div>\r
\r
                    </div>\r
\r
                    <!-- Stock -->\r
                    <div class="text-right">\r
\r
                        <h4 class="text-2xl font-black text-indigo-600">\r
\r
                            {{ p.stockUsed }}\r
\r
                        </h4>\r
\r
                        <p class="text-[11px] uppercase tracking-wide\r
                       text-slate-400 font-bold">\r
\r
                            Units\r
\r
                        </p>\r
\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
            }\r
\r
        </div>\r
\r
        }\r
\r
    </div>\r
\r
</app-common-dialog>\r
\r
<!-- Filters Dropdown Overlay -->\r
@if (showFilters) {\r
<div class="fixed inset-0 z-[90]" (click)="showFilters = false">\r
    <div class="absolute top-32 right-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/20 p-6 w-72 animate-in fade-in slide-in-from-top-4 duration-300"\r
        (click)="$event.stopPropagation()">\r
        <h4 class="text-xs font-black uppercase tracking-widest text-outline mb-4">Advanced Filters</h4>\r
        <div class="space-y-4">\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Sort Order</label>\r
                <select class="w-full p-2 bg-surface-container rounded-lg text-xs font-bold outline-none">\r
                    <option>Usage Rate (Highest)</option>\r
                    <option>Usage Rate (Lowest)</option>\r
                    <option>Stock Level (Asc)</option>\r
                    <option>Stock Level (Desc)</option>\r
                    <option>Newest Additions</option>\r
                </select>\r
            </div>\r
            <div>\r
                <label class="text-[10px] font-bold text-outline mb-1 block">Supplier Status</label>\r
                <div class="flex flex-wrap gap-2">\r
                    <button class="px-2 py-1 bg-primary text-white rounded text-[10px] font-bold">Active</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">Preferred</button>\r
                    <button\r
                        class="px-2 py-1 bg-surface-container text-outline rounded text-[10px] font-bold">New</button>\r
                </div>\r
            </div>\r
        </div>\r
        <button (click)="showFilters = false"\r
            class="w-full mt-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">Apply\r
            Filters</button>\r
    </div>\r
\r
\r
</div>\r
}\r
\r
<app-common-dialog [open]="showStockTransferModal" title="Stock Transfer"\r
    subtitle="Move material stock between projects" icon="swap_horiz" [showCloseButton]="true" [showFooter]="true"\r
    [contentClass]="'min-h-0 overflow-y-auto'" cancelLabel="Cancel" primaryLabel="Transfer Stock"\r
    (closed)="showStockTransferModal = false" (primary)="transferStock()">\r
\r
    <div class="p-6 space-y-8">\r
\r
        <!-- Material Card -->\r
        <div\r
            class="flex items-center gap-4 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">\r
\r
            <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">\r
                <span class="material-symbols-outlined text-[26px]">\r
                    inventory_2\r
                </span>\r
            </div>\r
\r
            <div class="flex-1 min-w-0">\r
                <h3 class="text-lg font-black truncate">\r
                    {{ selectedMaterial?.name }}\r
                </h3>\r
\r
                <div class="flex flex-wrap items-center gap-2 mt-2">\r
\r
                    <div class="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-[11px] font-black">\r
                        SKU : {{ selectedMaterial?.sku }}\r
                    </div>\r
\r
                    <div class="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-700 text-[11px] font-black">\r
                        Main Stock : {{ stockTransferData.stockIn }}\r
                    </div>\r
\r
                    <div class="px-3 py-1 rounded-xl bg-amber-100 text-amber-700 text-[11px] font-black">\r
                        Transfer Qty : {{ getTotalTransferQty() }}\r
                    </div>\r
\r
                </div>\r
            </div>\r
        </div>\r
\r
        <!-- Transfer Rows Section -->\r
        <div class="space-y-4">\r
\r
            @for (item of stockTransferData.transfers; track $index) {\r
\r
            <div\r
                class="relative p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">\r
\r
                @if (stockTransferData.transfers.length > 1) {\r
                <button (click)="removeTransferRow($index)"\r
                    class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center">\r
\r
                    <span class="material-symbols-outlined text-[18px]">\r
                        delete\r
                    </span>\r
\r
                </button>\r
                }\r
\r
                <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_130px] gap-4 items-start">\r
\r
                    <!-- From Project -->\r
                    <div>\r
\r
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
                            From Project\r
                        </label>\r
\r
                        <select [(ngModel)]="item.from_project_id"\r
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/20">\r
\r
                            <option value="">Select Project</option>\r
\r
                            @for (p of projects; track p.id) {\r
                            <option [value]="p.id">\r
                                {{ p.name }} (Stock : {{ getProjectStock(p.id) }})\r
                            </option>\r
                            }\r
\r
                        </select>\r
\r
                        @if (item.from_project_id) {\r
\r
                        <div\r
                            class="mt-3 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">\r
\r
                            <div class="flex items-center justify-between">\r
\r
                                <div class="flex items-center gap-2">\r
\r
                                    <span class="material-symbols-outlined text-[18px] text-emerald-600">\r
                                        inventory\r
                                    </span>\r
\r
                                    <span\r
                                        class="text-[11px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">\r
                                        Available Stock\r
                                    </span>\r
\r
                                </div>\r
\r
                                <span class="text-lg font-black text-emerald-700 dark:text-emerald-300">\r
                                    {{ getProjectStock(item.from_project_id) }}\r
                                </span>\r
\r
                            </div>\r
\r
                        </div>\r
\r
                        }\r
\r
                    </div>\r
\r
                    <!-- Arrow -->\r
                    <div class="hidden md:flex justify-center pt-6">\r
\r
                        <div\r
                            class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">\r
\r
                            <span class="material-symbols-outlined">\r
                                east\r
                            </span>\r
\r
                        </div>\r
\r
                    </div>\r
\r
                    <!-- To Project -->\r
                    <div>\r
\r
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
                            To Project\r
                        </label>\r
\r
                        <select [(ngModel)]="item.to_project_id"\r
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/20">\r
\r
                            <option value="">Select Project</option>\r
\r
                            @for (p of projects; track p.id) {\r
                            <option [value]="p.id">\r
                                {{ p.name }} (Stock : {{ getProjectStock(p.id) }})\r
                            </option>\r
                            }\r
\r
                        </select>\r
\r
                        @if (item.to_project_id) {\r
\r
                        <div\r
                            class="mt-3 px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">\r
\r
                            <div class="flex items-center justify-between">\r
\r
                                <div class="flex items-center gap-2">\r
\r
                                    <span class="material-symbols-outlined text-[18px] text-blue-600">\r
                                        warehouse\r
                                    </span>\r
\r
                                    <span\r
                                        class="text-[11px] font-black uppercase tracking-wide text-blue-700 dark:text-blue-300">\r
                                        Current Stock\r
                                    </span>\r
\r
                                </div>\r
\r
                                <span class="text-lg font-black text-blue-700 dark:text-blue-300">\r
                                    {{ getProjectStock(item.to_project_id) }}\r
                                </span>\r
\r
                            </div>\r
\r
                        </div>\r
\r
                        }\r
\r
                    </div>\r
\r
                    <!-- Quantity -->\r
                    <div>\r
\r
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">\r
                            Quantity\r
                        </label>\r
\r
                        <input [(ngModel)]="item.quantity" type="number" min="1" placeholder="0"\r
                            class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-black outline-none focus:ring-4 focus:ring-primary/20">\r
\r
                    </div>\r
\r
                </div>\r
\r
            </div>\r
\r
            }\r
\r
            <!-- Add Row Button -->\r
            <button (click)="addTransferRow()"\r
                class="w-full py-4 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-black hover:bg-primary/5 transition-all flex items-center justify-center gap-2">\r
\r
                <span class="material-symbols-outlined">\r
                    add\r
                </span>\r
\r
                Add Transfer Row\r
\r
            </button>\r
\r
        </div>\r
\r
        <!-- Remarks Card -->\r
        <div class="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">\r
\r
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block">\r
                Remarks\r
            </label>\r
\r
            <textarea [(ngModel)]="stockTransferData.transfer_note" rows="4" placeholder="Write transfer note..."\r
                class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/20 resize-none">\r
      </textarea>\r
\r
        </div>\r
\r
    </div>\r
\r
</app-common-dialog>\r
\r
<app-vendor-add-modal [showAddModal]="showAddVendorModal" [newVendor]="newVendor" [errorMsg]="errorMsg"\r
    [contractFile]="contractFile" [isSaving]="isSaving" (close)="showAddVendorModal = false" (save)="addVendor()"\r
    (contractSelect)="onContractFileSelected($event)" (onlyNumberEvent)="onlyNumbers($event)"\r
    (onlyAlphaNumericEvent)="onlyAlphanumeric($event)"\r
    (pasteNumericEvent)="stripNonNumericOnPaste($event.event, $event.field, $event.len)"\r
    (pasteAlphaNumericEvent)="stripNonAlphanumericOnPaste($event.event, $event.field, $event.len)">\r
</app-vendor-add-modal>` }]
  }], null, null);
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
function Quotations_For_82_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 65)(2, "button", 66);
    \u0275\u0275listener("click", function Quotations_For_82_div_47_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const quote_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openViewModal(quote_r2));
    });
    \u0275\u0275elementStart(3, "span", 35);
    \u0275\u0275text(4, " visibility ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " View Details ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 67);
    \u0275\u0275listener("click", function Quotations_For_82_div_47_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const quote_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openNegotiateModal(quote_r2));
    });
    \u0275\u0275elementStart(7, "span", 35);
    \u0275\u0275text(8, " handshake ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Approval Action ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "div", 68);
    \u0275\u0275elementStart(11, "button", 69);
    \u0275\u0275listener("click", function Quotations_For_82_div_47_Template_button_click_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const quote_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeleteModal(quote_r2, $event));
    });
    \u0275\u0275elementStart(12, "span", 35);
    \u0275\u0275text(13, " block ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Delete Quote ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const quote_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", quote_r2.status == "Approved")("ngClass", \u0275\u0275pureFunction2(2, _c1, quote_r2.status == "Approved", quote_r2.status != "Approved"));
  }
}
function Quotations_For_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 30)(1, "td", 42)(2, "div", 20)(3, "div", 43)(4, "span", 44);
    \u0275\u0275text(5, " description ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 45)(7, "p", 46);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 47)(10, "span", 48);
    \u0275\u0275text(11, " calendar_month ");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(14, "td", 49)(15, "div", 50)(16, "div", 51);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "p", 52);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 53);
    \u0275\u0275text(22, " Sales Executive ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "td", 49)(24, "span", 54);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 49)(27, "div", 55)(28, "span", 35);
    \u0275\u0275text(29, " inventory_2 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 56);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "td", 49)(33, "div")(34, "p", 57);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p", 58);
    \u0275\u0275text(37, " Total Value ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "td", 49)(39, "div", 59)(40, "span");
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "td", 60)(43, "div", 61)(44, "button", 62);
    \u0275\u0275listener("click", function Quotations_For_82_Template_button_click_44_listener($event) {
      const quote_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDropdown(quote_r2.id, $event));
    });
    \u0275\u0275elementStart(45, "span", 13);
    \u0275\u0275text(46, " more_vert ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(47, Quotations_For_82_div_47_Template, 15, 5, "div", 63);
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
    \u0275\u0275textInterpolate1(" ", quote_r2.sales_person.charAt(0), " ");
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
function Quotations_For_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function Quotations_For_91_Template_button_click_0_listener() {
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
function Quotations_Conditional_96_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 86)(1, "td", 87)(2, "p", 88);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 89);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 90);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 91);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 92);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 92);
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
function Quotations_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 71)(2, "div", 72)(3, "p", 73);
    \u0275\u0275text(4, "Originating Member");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 74);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 75)(8, "p", 73);
    \u0275\u0275text(9, "Grand Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 76);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 77)(13, "h4", 78);
    \u0275\u0275text(14, "Allocated Items");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 79)(16, "table", 80)(17, "thead", 81)(18, "tr")(19, "th", 82);
    \u0275\u0275text(20, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 83);
    \u0275\u0275text(22, "Qty ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 82);
    \u0275\u0275text(24, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 83);
    \u0275\u0275text(26, "Unit Price ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 84);
    \u0275\u0275text(28, "Total ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "tbody");
    \u0275\u0275template(30, Quotations_Conditional_96_tr_30_Template, 14, 6, "tr", 85);
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
function Quotations_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "div")(2, "label", 93);
    \u0275\u0275text(3, "Current Status Profile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 94)(5, "button", 95);
    \u0275\u0275listener("click", function Quotations_Conditional_98_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectQuoteStatus("Approved"));
    });
    \u0275\u0275text(6, " Approve ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 95);
    \u0275\u0275listener("click", function Quotations_Conditional_98_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectQuoteStatus("Rejected"));
    });
    \u0275\u0275text(8, " Reject ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div")(10, "label", 93);
    \u0275\u0275text(11, "Vendor Feedback & Log");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 96);
    \u0275\u0275twoWayListener("ngModelChange", function Quotations_Conditional_98_Template_textarea_ngModelChange_12_listener($event) {
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
function Quotations_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "p", 97);
    \u0275\u0275text(2, "Are you sure you want to remove ");
    \u0275\u0275elementStart(3, "span", 98);
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
  quotes = [];
  searchQuery = "";
  activeDropdownId = null;
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
    this.quotationService.quotes$.subscribe((q) => {
      this.quotes = q.data || [];
      console.log(this.quotes, "this.quotes");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Quotations, selectors: [["app-quotations"]], standalone: false, decls: 101, vars: 23, consts: [[1, "bg-slate-50/50", "min-h-screen", "animate-in", "p-4", 3, "click"], [1, "flex", "justify-between", "items-center", "mb-10"], [1, "text-3xl", "font-black", "text-slate-800", "dark:text-white"], [1, "text-slate-500"], ["routerLink", "/master/resources/quotations/new", 1, "group", "relative", "overflow-hidden", "flex", "items-center", "gap-3", "px-7", "py-3.5", "rounded-2xl", "font-bold", "text-white", "transition-all", "duration-300", "shadow-[0_10px_30px_rgba(58,102,176,0.35)]", "hover:shadow-[0_15px_40px_rgba(58,102,176,0.45)]", "hover:-translate-y-1", "bg-gradient-to-r", "from-[#3a66b0]", "via-[#5b7fd1]", "to-[#7c4dff]"], [1, "absolute", "inset-0", "bg-white/10", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-300"], [1, "relative", "z-10", "w-6", "h-6", "rounded-xl", "bg-white/15", "backdrop-blur-sm", "flex", "items-center", "justify-center", "border", "border-white/20"], [1, "material-symbols-outlined", "text-[20px]"], [1, "relative", "z-10", "tracking-wide"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-6", "mb-10"], [1, "bg-white", "p-6", "rounded-3xl", "border", "border-slate-200/60", "shadow-sm"], [1, "flex", "items-center", "gap-4", "mb-4"], [1, "w-12", "h-12", "rounded-2xl", "bg-blue-50", "flex", "items-center", "justify-center", "text-blue-600"], [1, "material-symbols-outlined"], [1, "text-sm", "font-medium", "text-slate-500", "uppercase", "tracking-wider"], [1, "text-2xl", "font-bold", "text-slate-900"], [1, "w-12", "h-12", "rounded-2xl", "bg-amber-50", "flex", "items-center", "justify-center", "text-amber-600"], [1, "w-12", "h-12", "rounded-2xl", "bg-green-50", "flex", "items-center", "justify-center", "text-green-600"], [1, "w-12", "h-12", "rounded-2xl", "bg-slate-50", "flex", "items-center", "justify-center", "text-slate-600"], [1, "bg-white", "rounded-3xl", "border", "border-slate-200/60", "shadow-sm", "mb-6", "p-4"], [1, "flex", "items-center", "gap-4"], [1, "relative", "flex-1"], [1, "material-symbols-outlined", "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "text", "placeholder", "Search by quote number or salesperson...", 1, "w-full", "pl-12", "pr-4", "py-3", "bg-slate-50", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-primary/20", "transition-all", 3, "ngModelChange", "ngModel"], [1, "bg-gradient-to-br", "from-white", "via-slate-50", "to-primary/5", "rounded-[2rem]", "border", "border-slate-200/60", "shadow-[0_10px_40px_rgba(0,0,0,0.06)]", "overflow-hidden"], [1, "overflow-x-auto", "overflow-y-visible", "px-2", "pb-24", "relative"], [1, "w-full", "h-auto", "min-w-[1200px]", "border-separate", "border-spacing-y-3", "relative"], [1, "px-8", "py-4", "text-left", "text-[11px]", "font-black", "text-slate-500", "uppercase", "tracking-[0.2em]"], [1, "px-8", "py-4", "text-center", "text-[11px]", "font-black", "text-slate-500", "uppercase", "tracking-[0.2em]"], [1, "px-8", "py-4", "text-right", "text-[11px]", "font-black", "text-slate-500", "uppercase", "tracking-[0.2em]"], [1, "group", "relative", "hover:z-[999]", "bg-white", "dark:bg-slate-900", "hover:bg-slate-50", "dark:hover:bg-slate-800/80", "transition-all", "duration-300", "hover:shadow-xl", "hover:-translate-y-1", "rounded-3xl", "cursor-default"], [1, "flex", "flex-col", "md:flex-row", "items-center", "justify-between", "gap-4", "px-6", "py-5", "bg-slate-50", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "items-center", "gap-2"], [1, "w-9", "h-9", "rounded-xl", "border", "border-slate-200", "dark:border-slate-700", "bg-white", "dark:bg-slate-800", "flex", "items-center", "justify-center", "hover:bg-primary", "hover:text-white", "transition-all", "cursor-pointer", 3, "click"], [1, "material-symbols-outlined", "text-[18px]"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "ngClass"], ["title", "Quotation Breakdown", "icon", "request_quote", 3, "closed", "open", "subtitle", "badge", "badgeClass", "showCloseButton"], [1, "p-10", "space-y-8"], ["title", "Vendor Approval Hub", "subtitle", "Lifecycle Correction & Feedback", "icon", "approval", "cancelLabel", "Discard Changes", "primaryLabel", "Update", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], ["variant", "danger", "title", "Delete Quotation?", "subtitle", "This action cannot be undone.", "icon", "delete_forever", "cancelLabel", "Cancel", "primaryLabel", "Delete Item", 3, "closed", "primary", "open", "showCloseButton", "showFooter"], [1, "p-8", "text-center"], [1, "px-8", "py-6", "rounded-l-3xl", "border-y", "border-l", "border-slate-200", "dark:border-slate-800"], [1, "w-14", "h-14", "rounded-3xl", "bg-gradient-to-br", "from-primary", "via-violet-500", "to-fuchsia-500", "flex", "items-center", "justify-center", "text-white", "shadow-lg", "shadow-primary/20", "group-hover:scale-110", "group-hover:rotate-6", "transition-all", "duration-300"], [1, "material-symbols-outlined", "text-[26px]"], [1, "space-y-1"], [1, "text-sm", "font-black", "text-slate-900", "dark:text-white", "group-hover:text-primary", "transition-colors"], [1, "inline-flex", "items-center", "gap-1", "text-[11px]", "font-bold", "text-slate-400", "uppercase", "tracking-wider"], [1, "material-symbols-outlined", "text-[14px]"], [1, "px-8", "py-6", "border-y", "border-slate-200", "dark:border-slate-800"], [1, "flex", "items-center", "gap-3"], [1, "w-11", "h-11", "rounded-full", "bg-gradient-to-br", "from-amber-400", "to-orange-500", "flex", "items-center", "justify-center", "text-sm", "font-black", "text-white", "shadow-md"], [1, "text-sm", "font-bold", "text-slate-800", "dark:text-slate-100"], [1, "text-[11px]", "text-slate-400", "font-medium"], [1, "inline-flex", "items-center", "px-4", "py-2", "rounded-full", "bg-violet-100", "text-violet-700", "text-[11px]", "font-black", "uppercase", "tracking-wider", "border", "border-violet-200"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-2xl", "bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-200"], [1, "text-sm", "font-black"], [1, "text-lg", "font-black", "text-slate-900", "dark:text-white"], [1, "text-[11px]", "text-emerald-500", "font-bold", "uppercase", "tracking-wide"], [1, "flex", "justify-center"], [1, "px-8", "py-6", "text-right", "relative", "rounded-r-3xl", "border-y", "border-r", "border-slate-200", "dark:border-slate-800", "overflow-visible"], [1, "relative", "inline-block"], ["type", "button", "title", "More Options", 1, "relative", "z-20", "w-11", "h-11", "rounded-2xl", "bg-white", "dark:bg-slate-800", "hover:bg-primary", "hover:text-white", "shadow-md", "border", "border-slate-200", "dark:border-slate-700", "text-slate-500", "transition-all", "duration-300", "flex", "items-center", "justify-center", "ml-auto", "hover:scale-110", "cursor-pointer", 3, "click"], ["class", "absolute right-0 top-14 w-56 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] border border-slate-100 dark:border-slate-800 z-[99999999] overflow-hidden", 4, "ngIf"], [1, "absolute", "right-0", "top-14", "w-56", "bg-white", "dark:bg-slate-900", "rounded-3xl", "shadow-[0_25px_80px_rgba(0,0,0,0.25)]", "border", "border-slate-100", "dark:border-slate-800", "z-[99999999]", "overflow-hidden"], [1, "p-3", "space-y-2"], ["title", "View Details", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-xs", "font-bold", "text-slate-700", "dark:text-slate-200", "hover:bg-primary/10", "rounded-2xl", "transition-all", "cursor-pointer", 3, "click"], ["title", "Approval Action", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-xs", "font-bold", "rounded-2xl", "transition-all", 3, "click", "disabled", "ngClass"], [1, "h-px", "bg-slate-100", "dark:bg-slate-800", "my-2"], ["title", "Delete Quote", 1, "w-full", "flex", "items-center", "gap-3", "px-4", "py-3", "text-xs", "font-bold", "text-red-500", "hover:bg-red-50", "dark:hover:bg-red-500/10", "rounded-2xl", "transition-all", "cursor-pointer", 3, "click"], [1, "w-9", "h-9", "rounded-xl", "text-xs", "font-black", "transition-all", "cursor-pointer", 3, "click", "ngClass"], [1, "grid", "grid-cols-2", "gap-8"], [1, "bg-slate-50", "dark:bg-slate-800/50", "p-6", "rounded-3xl", "border", "border-slate-100", "dark:border-slate-800"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-2"], [1, "font-bold", "text-slate-900", "dark:text-slate-200"], [1, "bg-slate-50", "dark:bg-slate-800/50", "p-6", "rounded-3xl", "border", "border-slate-100", "dark:border-slate-800", "text-right"], [1, "text-2xl", "font-black", "text-primary"], [1, "space-y-4"], [1, "text-xs", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-400", "px-4"], [1, "bg-white", "dark:bg-slate-900", "rounded-[2rem]", "border", "border-slate-100", "dark:border-slate-800", "overflow-hidden", "shadow-sm"], [1, "w-full", "text-left"], [1, "bg-slate-50", "dark:bg-slate-800/30"], [1, "px-6", "py-4", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400"], [1, "px-6", "py-4", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "text-center"], [1, "px-6", "py-4", "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "text-right"], ["class", "border-t border-slate-50 dark:border-slate-800", 4, "ngFor", "ngForOf"], [1, "border-t", "border-slate-50", "dark:border-slate-800"], [1, "px-6", "py-4"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-slate-100"], [1, "text-[10px]", "font-semibold", "text-slate-400", "truncate", "max-w-[200px]"], [1, "px-6", "py-4", "text-center", "font-bold", "text-slate-600", "dark:text-slate-400"], [1, "px-6", "py-4", "text-left", "font-bold", "text-slate-600", "dark:text-slate-400"], [1, "px-6", "py-4", "text-right", "font-black", "text-slate-900", "dark:text-slate-200"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-2", "block", "ml-1"], [1, "grid", "grid-cols-6", "gap-3"], [1, "col-span-3", "py-4", "rounded-3xl", "border", "text-xs", "font-black", "uppercase", "transition-all", "duration-300", 3, "click", "ngClass"], ["placeholder", "Enter details about price revisions, terms updated, or rejection reason...", "rows", "5", 1, "w-full", "p-6", "bg-slate-50", "dark:bg-slate-800", "border-none", "rounded-[2rem]", "text-sm", "font-medium", "outline-none", "focus:ring-2", "focus:ring-amber-500/20", "transition-all", "resize-none", "shadow-inner", 3, "ngModelChange", "ngModel"], [1, "text-outline", "text-sm", "font-medium"], [1, "text-on-surface", "font-black"]], template: function Quotations_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function Quotations_Template_div_click_0_listener() {
        return ctx.closeDropdown();
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Sales Quotations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Manage and track material & equipment quotes from various vendors");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "a", 4);
      \u0275\u0275element(8, "div", 5);
      \u0275\u0275elementStart(9, "div", 6)(10, "span", 7);
      \u0275\u0275text(11, " add ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "span", 8);
      \u0275\u0275text(13, " New Quotation ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "div", 12)(18, "span", 13);
      \u0275\u0275text(19, "request_quote");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div")(21, "p", 14);
      \u0275\u0275text(22, "Total Quotes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "h3", 15);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(25, "div", 10)(26, "div", 11)(27, "div", 16)(28, "span", 13);
      \u0275\u0275text(29, "drafts");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div")(31, "p", 14);
      \u0275\u0275text(32, "Drafts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "h3", 15);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(35, "div", 10)(36, "div", 11)(37, "div", 17)(38, "span", 13);
      \u0275\u0275text(39, "verified");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div")(41, "p", 14);
      \u0275\u0275text(42, "Approved");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "h3", 15);
      \u0275\u0275text(44);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(45, "div", 10)(46, "div", 11)(47, "div", 18)(48, "span", 13);
      \u0275\u0275text(49, "payments");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div")(51, "p", 14);
      \u0275\u0275text(52, "Total Value");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "h3", 15);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(55, "div", 19)(56, "div", 20)(57, "div", 21)(58, "span", 22);
      \u0275\u0275text(59, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function Quotations_Template_input_ngModelChange_60_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Quotations_Template_input_ngModelChange_60_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(61, "div", 24)(62, "div", 25)(63, "table", 26)(64, "thead")(65, "tr")(66, "th", 27);
      \u0275\u0275text(67, " Quote Details ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "th", 27);
      \u0275\u0275text(69, " Sales Person ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "th", 27);
      \u0275\u0275text(71, " Type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "th", 27);
      \u0275\u0275text(73, " Items ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "th", 27);
      \u0275\u0275text(75, " Amount ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "th", 28);
      \u0275\u0275text(77, " Status ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "th", 29);
      \u0275\u0275text(79, " Actions ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(80, "tbody");
      \u0275\u0275repeaterCreate(81, Quotations_For_82_Template, 48, 14, "tr", 30, _forTrack03);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(83, "div", 31)(84, "p", 32);
      \u0275\u0275text(85);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "div", 33)(87, "button", 34);
      \u0275\u0275listener("click", function Quotations_Template_button_click_87_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275elementStart(88, "span", 35);
      \u0275\u0275text(89, " chevron_left ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(90, Quotations_For_91_Template, 2, 2, "button", 36, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementStart(92, "button", 34);
      \u0275\u0275listener("click", function Quotations_Template_button_click_92_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275elementStart(93, "span", 35);
      \u0275\u0275text(94, " chevron_right ");
      \u0275\u0275elementEnd()()()()()()();
      \u0275\u0275elementStart(95, "app-common-dialog", 37);
      \u0275\u0275listener("closed", function Quotations_Template_app_common_dialog_closed_95_listener() {
        return ctx.closeViewModal();
      });
      \u0275\u0275conditionalCreate(96, Quotations_Conditional_96_Template, 31, 3, "div", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "app-common-dialog", 39);
      \u0275\u0275listener("closed", function Quotations_Template_app_common_dialog_closed_97_listener() {
        return ctx.closeNegotiateModal();
      })("primary", function Quotations_Template_app_common_dialog_primary_97_listener() {
        return ctx.updateQuoteStatus();
      });
      \u0275\u0275conditionalCreate(98, Quotations_Conditional_98_Template, 13, 9, "div", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "app-common-dialog", 40);
      \u0275\u0275listener("closed", function Quotations_Template_app_common_dialog_closed_99_listener() {
        return ctx.showDeleteModal = false;
      })("primary", function Quotations_Template_app_common_dialog_primary_99_listener() {
        return ctx.confirmDelete(ctx.quoteToDelete);
      });
      \u0275\u0275conditionalCreate(100, Quotations_Conditional_100_Template, 6, 1, "div", 41);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(24);
      \u0275\u0275textInterpolate(ctx.quotes.length);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.draftQuotesCount);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.approvedQuotesCount);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("\u20B9", ctx.totalValue.toLocaleString());
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(21);
      \u0275\u0275repeater(ctx.paginatedQuotes);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Showing ", ctx.filteredQuotes.length ? (ctx.page - 1) * ctx.pageSize + 1 : 0, " - ", ctx.endItem, " of ", ctx.filteredQuotes.length, " Quotes ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(22, _c03).constructor(ctx.totalPages()));
      \u0275\u0275advance(5);
      \u0275\u0275property("open", ctx.showViewModal && !!ctx.selectedQuote)("subtitle", ctx.selectedQuote ? "ID: " + ctx.selectedQuote.quotation_number : "")("badge", (ctx.selectedQuote == null ? null : ctx.selectedQuote.status) || "")("badgeClass", ctx.selectedQuote ? ctx.getStatusClass(ctx.selectedQuote.status) : "")("showCloseButton", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedQuote ? 96 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showNegotiateModal && !!ctx.selectedQuote)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedQuote ? 98 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal && !!ctx.quoteToDelete)("showCloseButton", true)("showFooter", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.quoteToDelete ? 100 : -1);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, RouterLink, DefaultValueAccessor, NgControlStatus, NgModel, CommonDialogComponent, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Quotations, [{
    type: Component,
    args: [{ selector: "app-quotations", standalone: false, template: `<div (click)="closeDropdown()" class="bg-slate-50/50 min-h-screen animate-in p-4">\r
  <!-- Header -->\r
  <div class="flex justify-between items-center mb-10">\r
    <div>\r
      <h1 class="text-3xl font-black text-slate-800 dark:text-white">Sales Quotations</h1>\r
      <p class="text-slate-500">Manage and track material & equipment quotes from various vendors</p>\r
    </div>\r
    <a routerLink="/master/resources/quotations/new"\r
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
      <!-- Text -->\r
      <span class="relative z-10 tracking-wide">\r
        New Quotation\r
      </span>\r
\r
    </a>\r
  </div>\r
\r
  <!-- Stats Grid -->\r
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">\r
    <div class="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">\r
      <div class="flex items-center gap-4 mb-4">\r
        <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">\r
          <span class="material-symbols-outlined">request_quote</span>\r
        </div>\r
        <div>\r
          <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Quotes</p>\r
          <h3 class="text-2xl font-bold text-slate-900">{{quotes.length}}</h3>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">\r
      <div class="flex items-center gap-4 mb-4">\r
        <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">\r
          <span class="material-symbols-outlined">drafts</span>\r
        </div>\r
        <div>\r
          <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Drafts</p>\r
          <h3 class="text-2xl font-bold text-slate-900">{{draftQuotesCount}}</h3>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">\r
      <div class="flex items-center gap-4 mb-4">\r
        <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">\r
          <span class="material-symbols-outlined">verified</span>\r
        </div>\r
        <div>\r
          <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Approved</p>\r
          <h3 class="text-2xl font-bold text-slate-900">{{approvedQuotesCount}}</h3>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">\r
      <div class="flex items-center gap-4 mb-4">\r
        <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">\r
          <span class="material-symbols-outlined">payments</span>\r
        </div>\r
        <div>\r
          <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Value</p>\r
          <h3 class="text-2xl font-bold text-slate-900">\u20B9{{totalValue.toLocaleString()}}</h3>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Search and Filters -->\r
  <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm mb-6 p-4">\r
    <div class="flex items-center gap-4">\r
      <div class="relative flex-1">\r
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>\r
        <input type="text" [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange()"\r
          placeholder="Search by quote number or salesperson..."\r
          class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all">\r
      </div>\r
    </div>\r
  </div>\r
  <!-- Quotes List -->\r
  <div\r
    class="bg-gradient-to-br from-white via-slate-50 to-primary/5 rounded-[2rem] border border-slate-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">\r
\r
    <!-- Table -->\r
    <div class="overflow-x-auto overflow-y-visible px-2 pb-24 relative">\r
\r
      <table class="w-full h-auto min-w-[1200px] border-separate border-spacing-y-3 relative">\r
\r
        <!-- Table Head -->\r
        <thead>\r
          <tr>\r
\r
            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">\r
              Quote Details\r
            </th>\r
\r
            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">\r
              Sales Person\r
            </th>\r
\r
            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">\r
              Type\r
            </th>\r
\r
            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">\r
              Items\r
            </th>\r
\r
            <th class="px-8 py-4 text-left text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">\r
              Amount\r
            </th>\r
\r
            <th class="px-8 py-4 text-center text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">\r
              Status\r
            </th>\r
\r
            <th class="px-8 py-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">\r
              Actions\r
            </th>\r
\r
          </tr>\r
        </thead>\r
\r
        <!-- Table Body -->\r
        <tbody>\r
          @for (quote of paginatedQuotes; track quote.id) {\r
\r
          <tr\r
            class="group relative hover:z-[999] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl cursor-default">\r
\r
            <!-- Quote -->\r
            <td class="px-8 py-6 rounded-l-3xl border-y border-l border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-center gap-4">\r
\r
                <div\r
                  class="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary via-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">\r
\r
                  <span class="material-symbols-outlined text-[26px]">\r
                    description\r
                  </span>\r
\r
                </div>\r
\r
                <div class="space-y-1">\r
\r
                  <p\r
                    class="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">\r
\r
                    {{quote.quotation_number}}\r
\r
                  </p>\r
\r
                  <div\r
                    class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">\r
\r
                    <span class="material-symbols-outlined text-[14px]">\r
                      calendar_month\r
                    </span>\r
\r
                    {{quote.date | date:'mediumDate'}}\r
\r
                  </div>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Sales Person -->\r
            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex items-center gap-3">\r
\r
                <div\r
                  class="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-black text-white shadow-md">\r
\r
                  {{quote.sales_person.charAt(0)}}\r
\r
                </div>\r
\r
                <div>\r
\r
                  <p class="text-sm font-bold text-slate-800 dark:text-slate-100">\r
                    {{quote.sales_person}}\r
                  </p>\r
\r
                  <p class="text-[11px] text-slate-400 font-medium">\r
                    Sales Executive\r
                  </p>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Type -->\r
            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">\r
\r
              <span\r
                class="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-[11px] font-black uppercase tracking-wider border border-violet-200">\r
\r
                {{quote.quotation_type}}\r
\r
              </span>\r
\r
            </td>\r
\r
            <!-- Items -->\r
            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div\r
                class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">\r
\r
                <span class="material-symbols-outlined text-[18px]">\r
                  inventory_2\r
                </span>\r
\r
                <span class="text-sm font-black">\r
                  {{quote.items.length}}\r
                </span>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Amount -->\r
            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div>\r
\r
                <p class="text-lg font-black text-slate-900 dark:text-white">\r
                  \u20B9{{quote.total_amount.toLocaleString()}}\r
                </p>\r
\r
                <p class="text-[11px] text-emerald-500 font-bold uppercase tracking-wide">\r
                  Total Value\r
                </p>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Status -->\r
            <td class="px-8 py-6 border-y border-slate-200 dark:border-slate-800">\r
\r
              <div class="flex justify-center">\r
\r
                <span\r
                  [class]="'px-5 py-2 rounded-full text-[11px] font-black tracking-[0.15em] uppercase shadow-sm border ' + getStatusClass(quote.status)">\r
\r
                  {{quote.status}}\r
\r
                </span>\r
\r
              </div>\r
\r
            </td>\r
\r
            <!-- Actions -->\r
            <td\r
              class="px-8 py-6 text-right relative rounded-r-3xl border-y border-r border-slate-200 dark:border-slate-800 overflow-visible">\r
\r
              <div class="relative inline-block">\r
\r
                <!-- More Button -->\r
                <button type="button" (click)="toggleDropdown(quote.id, $event)" title="More Options"\r
                  class="relative z-20 w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 hover:bg-primary hover:text-white shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 transition-all duration-300 flex items-center justify-center ml-auto hover:scale-110 cursor-pointer">\r
\r
                  <span class="material-symbols-outlined">\r
                    more_vert\r
                  </span>\r
\r
                </button>\r
\r
                <!-- Dropdown -->\r
                <div *ngIf="activeDropdownId === quote.id"\r
                  class="absolute right-0 top-14 w-56 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] border border-slate-100 dark:border-slate-800 z-[99999999] overflow-hidden">\r
\r
                  <div class="p-3 space-y-2">\r
\r
                    <!-- View -->\r
                    <button (click)="openViewModal(quote)" title="View Details"\r
                      class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/10 rounded-2xl transition-all cursor-pointer">\r
\r
                      <span class="material-symbols-outlined text-[18px]">\r
                        visibility\r
                      </span>\r
\r
                      View Details\r
\r
                    </button>\r
\r
                    <!-- Approval -->\r
                    <button [disabled]="quote.status == 'Approved'" (click)="openNegotiateModal(quote)" title="Approval Action"\r
                      class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-2xl transition-all"\r
                      [ngClass]="{\r
                    'text-gray-400 bg-gray-100 cursor-not-allowed opacity-60':\r
                    quote.status == 'Approved',\r
\r
                    'text-amber-600 hover:bg-amber-50 cursor-pointer':\r
                    quote.status != 'Approved'\r
                  }">\r
\r
                      <span class="material-symbols-outlined text-[18px]">\r
                        handshake\r
                      </span>\r
\r
                      Approval Action\r
\r
                    </button>\r
\r
                    <div class="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>\r
\r
                    <!-- Delete -->\r
                    <button (click)="openDeleteModal(quote, $event)" title="Delete Quote"\r
                      class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all cursor-pointer">\r
\r
                      <span class="material-symbols-outlined text-[18px]">\r
                        block\r
                      </span>\r
\r
                      Delete Quote\r
\r
                    </button>\r
\r
                  </div>\r
\r
                </div>\r
\r
              </div>\r
\r
            </td>\r
\r
          </tr>\r
\r
          }\r
        </tbody>\r
\r
      </table>\r
      <div\r
        class="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">\r
        <!-- Count -->\r
        <p class="text-xs font-bold uppercase tracking-wider text-slate-500"> Showing {{ filteredQuotes.length ? ((page\r
          - 1) * pageSize) + 1 : 0 }} - {{endItem}} of {{ filteredQuotes.length}} Quotes </p>\r
        <!-- Pagination Buttons -->\r
        <div class="flex items-center gap-2"> <!-- Prev --> <button (click)="prevPage()"\r
            class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">\r
            <span class="material-symbols-outlined text-[18px]"> chevron_left </span> </button> <!-- Numbers --> @for (p\r
          of [].constructor(totalPages()); track $index) { <button (click)="goToPage($index + 1)"\r
            class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer"\r
            [ngClass]="page === ($index + 1) ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'">\r
            {{ $index + 1 }} </button> } <!-- Next --> <button (click)="nextPage()"\r
            class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">\r
            <span class="material-symbols-outlined text-[18px]"> chevron_right </span> </button> </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- View Details Modal -->\r
<app-common-dialog\r
  [open]="showViewModal && !!selectedQuote"\r
  title="Quotation Breakdown"\r
  [subtitle]="selectedQuote ? 'ID: ' + selectedQuote.quotation_number : ''"\r
  [badge]="selectedQuote?.status || ''"\r
  [badgeClass]="selectedQuote ? getStatusClass(selectedQuote.status) : ''"\r
  icon="request_quote"\r
  [showCloseButton]="true"\r
  (closed)="closeViewModal()"\r
>\r
  @if (selectedQuote) {\r
    <div class="p-10 space-y-8">\r
      <div class="grid grid-cols-2 gap-8">\r
        <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">\r
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Originating Member</p>\r
          <p class="font-bold text-slate-900 dark:text-slate-200">{{ selectedQuote.sales_person }}</p>\r
        </div>\r
        <div\r
          class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-right">\r
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Grand Total</p>\r
          <p class="text-2xl font-black text-primary">\u20B9{{ selectedQuote.total_amount.toLocaleString() }}</p>\r
        </div>\r
      </div>\r
\r
      <div class="space-y-4">\r
        <h4 class="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-4">Allocated Items</h4>\r
        <div\r
          class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">\r
          <table class="w-full text-left">\r
            <thead class="bg-slate-50 dark:bg-slate-800/30">\r
              <tr>\r
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Material</th>\r
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Qty\r
                </th>\r
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>\r
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Unit\r
                  Price\r
                </th>\r
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Total\r
                </th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              <tr *ngFor="let item of selectedQuote.items" class="border-t border-slate-50 dark:border-slate-800">\r
                <td class="px-6 py-4">\r
                  <p class="text-sm font-bold text-slate-900 dark:text-slate-100">{{ item.name }}</p>\r
                  <p class="text-[10px] font-semibold text-slate-400 truncate max-w-[200px]">Vendor: {{ item.vendor_name\r
                    }}</p>\r
                </td>\r
                <td class="px-6 py-4 text-center font-bold text-slate-600 dark:text-slate-400">{{ item.quantity }}</td>\r
                <td class="px-6 py-4 text-left font-bold text-slate-600 dark:text-slate-400">{{ item.category }}</td>\r
                <td class="px-6 py-4 text-right font-black text-slate-900 dark:text-slate-200">\u20B9{{\r
                  item.unitPrice.toLocaleString() }}</td>\r
                <td class="px-6 py-4 text-right font-black text-slate-900 dark:text-slate-200">\u20B9{{\r
                  item.totalPrice.toLocaleString() }}</td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</app-common-dialog>\r
\r
<!-- Negotiation Modal -->\r
<app-common-dialog\r
  [open]="showNegotiateModal && !!selectedQuote"\r
  title="Vendor Approval Hub"\r
  subtitle="Lifecycle Correction & Feedback"\r
  icon="approval"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Discard Changes"\r
  primaryLabel="Update"\r
  (closed)="closeNegotiateModal()"\r
  (primary)="updateQuoteStatus()"\r
>\r
  @if (selectedQuote) {\r
\r
    <div class="p-10 space-y-8">\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Current Status\r
          Profile</label>\r
        <div class="grid grid-cols-6 gap-3">\r
\r
          <button (click)="selectQuoteStatus('Approved')" [ngClass]="{\r
    'bg-green-600 text-white border-green-600 shadow-lg': selectedQuote.status === 'Approved',\r
    'bg-white text-green-600 hover:bg-green-50': selectedQuote.status !== 'Approved'\r
  }" class="col-span-3 py-4 rounded-3xl border text-xs font-black uppercase transition-all duration-300">\r
\r
            Approve\r
          </button>\r
\r
          <button (click)="selectQuoteStatus('Rejected')" [ngClass]="{\r
    'bg-red-600 text-white border-red-600 shadow-lg': selectedQuote.status === 'Rejected',\r
    'bg-white text-red-600 hover:bg-red-50': selectedQuote.status !== 'Rejected'\r
  }" class="col-span-3 py-4 rounded-3xl border text-xs font-black uppercase transition-all duration-300">\r
\r
            Reject\r
          </button>\r
\r
        </div>\r
      </div>\r
\r
      <div>\r
        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Vendor Feedback &\r
          Log</label>\r
        <textarea [(ngModel)]="negotiationFeedback"\r
          placeholder="Enter details about price revisions, terms updated, or rejection reason..." rows="5"\r
          class="w-full p-6 bg-slate-50 dark:bg-slate-800 border-none rounded-[2rem] text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none shadow-inner"></textarea>\r
      </div>\r
    </div>\r
\r
  }\r
</app-common-dialog>\r
\r
<app-common-dialog\r
  [open]="showDeleteModal && !!quoteToDelete"\r
  variant="danger"\r
  title="Delete Quotation?"\r
  subtitle="This action cannot be undone."\r
  icon="delete_forever"\r
  [showCloseButton]="true"\r
  [showFooter]="true"\r
  cancelLabel="Cancel"\r
  primaryLabel="Delete Item"\r
  (closed)="showDeleteModal = false"\r
  (primary)="confirmDelete(quoteToDelete!)"\r
>\r
  @if (quoteToDelete) {\r
    <div class="p-8 text-center">\r
    <p class="text-outline text-sm font-medium">Are you sure you want to remove <span\r
        class="text-on-surface font-black">"{{ quoteToDelete.quotation_number }}"</span>? This action cannot be undone.\r
    </p>\r
    </div>\r
  }\r
</app-common-dialog>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Quotations, { className: "Quotations", filePath: "app/modules/resources/quotations/quotations.ts", lineNumber: 14 });
})();

// src/app/modules/resources/new-quotations/new-quotations.ts
function NewQuotations_div_28_div_14_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "span", 48);
    \u0275\u0275text(2, " done ");
    \u0275\u0275elementEnd()();
  }
}
function NewQuotations_div_28_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function NewQuotations_div_28_div_14_Template_div_click_0_listener() {
      const mat_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMaterial(mat_r4.sku));
    });
    \u0275\u0275element(1, "div", 26)(2, "div", 27)(3, "div");
    \u0275\u0275elementStart(4, "div", 28);
    \u0275\u0275template(5, NewQuotations_div_28_div_14_div_5_Template, 3, 0, "div", 29);
    \u0275\u0275elementStart(6, "div", 30)(7, "div");
    \u0275\u0275element(8, "div", 31);
    \u0275\u0275elementStart(9, "span", 32);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 33)(12, "h3", 34);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 35)(15, "span", 36);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "span", 37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 38)(19, "div", 39)(20, "div")(21, "p", 40);
    \u0275\u0275text(22, " Unit Cost ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 41)(24, "span", 42);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 43)(27, "p", 44);
    \u0275\u0275text(28, " SKU ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 45);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(31, "div")(32, "span", 46);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const mat_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("group relative overflow-hidden rounded-[32px] cursor-pointer transition-all duration-500 border " + (ctx_r1.selectedMaterials.has(mat_r4.sku) ? "border-primary/30 bg-gradient-to-br from-primary/10 via-white to-indigo-50 dark:from-primary/20 dark:via-slate-900 dark:to-slate-950 shadow-[0_25px_60px_rgba(99,102,241,0.22)] scale-[1.02]" : "border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("h-1.5 w-full transition-all duration-500 " + (ctx_r1.selectedMaterials.has(mat_r4.sku) ? "bg-gradient-to-r from-primary via-indigo-500 to-violet-500" : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-primary/60 group-hover:via-indigo-400 group-hover:to-violet-400"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.selectedMaterials.has(mat_r4.sku));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("relative w-16 h-16 rounded-[22px] flex items-center justify-center\n             transition-all duration-500 overflow-hidden " + (ctx_r1.selectedMaterials.has(mat_r4.sku) ? "bg-gradient-to-br from-primary to-indigo-600 text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)] rotate-3 scale-105" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:scale-110 group-hover:rotate-3"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", mat_r4.icon || "inventory_2", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", mat_r4.name, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", mat_r4.category, " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" \u20B9", mat_r4.cost, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", mat_r4.sku, " ");
    \u0275\u0275advance();
    \u0275\u0275classMap("mt-5 w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-black transition-all duration-300 " + (ctx_r1.selectedMaterials.has(mat_r4.sku) ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-primary/10 group-hover:text-primary"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedMaterials.has(mat_r4.sku) ? "check_circle" : "add_circle", " ");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedMaterials.has(mat_r4.sku) ? "Selected" : "Select " + (ctx_r1.selectedType === "MATERIAL" ? "Material" : "Equipment"), " ");
  }
}
function NewQuotations_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14)(4, "select", 15);
    \u0275\u0275twoWayListener("ngModelChange", function NewQuotations_div_28_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedType, $event) || (ctx_r1.selectedType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function NewQuotations_div_28_Template_select_change_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTypeChange());
    });
    \u0275\u0275elementStart(5, "option", 16);
    \u0275\u0275text(6, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 17);
    \u0275\u0275text(8, "Equipment");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 18)(10, "span", 19);
    \u0275\u0275text(11, " search ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function NewQuotations_div_28_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.searchQuery, $event) || (ctx_r1.searchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function NewQuotations_div_28_Template_input_input_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filterResources());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 21);
    \u0275\u0275template(14, NewQuotations_div_28_div_14_Template, 35, 16, "div", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 23)(16, "button", 24);
    \u0275\u0275listener("click", function NewQuotations_div_28_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(17, " Continue to Vendors ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedType);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.searchQuery);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.filteredMaterials);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("px-8 py-3 rounded-2xl font-bold text-white transition-all shadow-lg " + (ctx_r1.selectedMaterials.size > 0 ? "bg-primary shadow-primary/20 hover:-translate-y-0.5" : "bg-slate-300 opacity-50 cursor-not-allowed"));
    \u0275\u0275property("disabled", ctx_r1.selectedMaterials.size === 0);
  }
}
function NewQuotations_div_29_tr_18_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r8 = ctx.$implicit;
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", vendor_r8.id)("selected", vendor_r8.id === item_r7.vendorId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r8.name, " ");
  }
}
function NewQuotations_div_29_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 63)(1, "td", 64)(2, "div", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 64)(7, "select", 67);
    \u0275\u0275listener("change", function NewQuotations_div_29_tr_18_Template_select_change_7_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onVendorChange(item_r7, $event));
    });
    \u0275\u0275elementStart(8, "option", 68);
    \u0275\u0275text(9, " Select Vendor... ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, NewQuotations_div_29_tr_18_option_10_Template, 2, 3, "option", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 64)(12, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function NewQuotations_div_29_tr_18_Template_input_ngModelChange_12_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275twoWayBindingSet(item_r7.quantity, $event) || (item_r7.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function NewQuotations_div_29_tr_18_Template_input_input_12_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkQuantity(item_r7, $event));
    })("ngModelChange", function NewQuotations_div_29_tr_18_Template_input_ngModelChange_12_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateLineTotal(item_r7));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 64)(14, "div", 65);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 71)(17, "div", 72);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 73)(20, "button", 74);
    \u0275\u0275listener("click", function NewQuotations_div_29_tr_18_Template_button_click_20_listener() {
      const i_r9 = \u0275\u0275restoreView(_r6).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeQuoteItem(i_r9));
    });
    \u0275\u0275elementStart(21, "span", 3);
    \u0275\u0275text(22, " delete ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r7.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.materialSku, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.vendors);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r7.quantity);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", item_r7.unitPrice.toLocaleString(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", item_r7.totalPrice.toLocaleString(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.quoteItems.length === 1);
  }
}
function NewQuotations_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 49)(2, "table", 50)(3, "thead", 51)(4, "tr")(5, "th", 52);
    \u0275\u0275text(6, " Material ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 52);
    \u0275\u0275text(8, " Select Vendor ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 52);
    \u0275\u0275text(10, " Quantity ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 52);
    \u0275\u0275text(12, " Unit Price ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 53);
    \u0275\u0275text(14, " Total ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 54);
    \u0275\u0275text(16, " Action ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, NewQuotations_div_29_tr_18_Template, 23, 7, "tr", 55);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 23)(20, "button", 56);
    \u0275\u0275listener("click", function NewQuotations_div_29_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(21, "span", 57);
    \u0275\u0275text(22, " west ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, " Previous Step ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 58)(26, "div", 59)(27, "p", 60);
    \u0275\u0275text(28, " Grand Total ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "h2", 61);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "button", 62);
    \u0275\u0275listener("click", function NewQuotations_div_29_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r5);
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
    \u0275\u0275elementStart(0, "div", 91)(1, "div")(2, "p", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 92)(5, "span", 93);
    \u0275\u0275text(6, " local_shipping ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 94);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 43)(10, "p", 72);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 95);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", item_r11.name, " (x", item_r11.quantity, ") ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", item_r11.vendor_name || "No Vendor Selected", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u20B9", item_r11.totalPrice.toLocaleString(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" @ \u20B9", item_r11.unitPrice.toLocaleString(), "/unit ");
  }
}
function NewQuotations_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 77);
    \u0275\u0275element(2, "div", 78);
    \u0275\u0275elementStart(3, "div", 79)(4, "div")(5, "div", 80);
    \u0275\u0275text(6, " Draft Quotation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2", 81);
    \u0275\u0275text(8, "Summary");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 43)(10, "p", 82);
    \u0275\u0275text(11, "Generated On");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 83);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 84)(16, "div", 85)(17, "h3", 86);
    \u0275\u0275text(18, " Item Breakdown ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 87);
    \u0275\u0275template(20, NewQuotations_div_30_div_20_Template, 14, 5, "div", 88);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 89)(22, "button", 56);
    \u0275\u0275listener("click", function NewQuotations_div_30_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(23, "span", 57);
    \u0275\u0275text(24, " west ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, " Make Changes ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 59)(28, "p", 60);
    \u0275\u0275text(29, " Grand Total ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "h2", 61);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 90);
    \u0275\u0275listener("click", function NewQuotations_div_30_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitQuote());
    });
    \u0275\u0275elementStart(33, "span", 46);
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
  // ADD THIS
  equipmentService = inject(Equipment);
  vendorService = inject(VendorsServices);
  quotationService = inject(QuotationService);
  toast = inject(ToastrService);
  router = inject(Router);
  currentStep = 1;
  materials = [];
  // ADD THIS
  equipments = [];
  vendors = [];
  today = /* @__PURE__ */ new Date();
  searchQuery = "";
  selectedMaterials = /* @__PURE__ */ new Set();
  // For Step 2
  quoteItems = [];
  selectedVendor;
  selectedType = "MATERIAL";
  filteredMaterialsTab = [];
  // =========================
  // FILTER RESOURCES
  // =========================
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
  // LOAD DATA BY TYPE
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewQuotations, selectors: [["app-new-quotations"]], standalone: false, decls: 31, vars: 15, consts: [[1, "bg-slate-50/50", "animate-in"], [1, "flex", "justify-between", "items-center", "mb-8"], ["routerLink", "/master/resources/quotations", 1, "group", "inline-flex", "items-center", "gap-2.5", "px-4", "py-2", "bg-white", "dark:bg-slate-800", "border", "border-slate-200", "dark:border-slate-700", "rounded-2xl", "text-slate-600", "dark:text-slate-400", "hover:text-primary", "hover:border-primary/30", "hover:bg-primary/5", "hover:-translate-x-1", "transition-all", "shadow-sm", "mb-4"], [1, "material-symbols-outlined", "text-[20px]"], [1, "text-xs", "font-black", "uppercase", "tracking-widest"], [1, "text-4xl", "font-black", "tracking-tight", "text-slate-900", "border-l-4", "border-primary", "pl-6", "py-1"], [1, "flex", "items-center", "gap-4", "bg-white", "px-6", "py-3", "rounded-2xl", "border", "border-slate-200/60", "shadow-sm"], [1, "text-sm", "font-bold"], [1, "w-8", "h-px", "bg-slate-200"], ["class", "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20", 4, "ngIf"], ["class", " mx-auto animate-in fade-in zoom-in-95 duration-500 mb-20", 4, "ngIf"], [1, "space-y-6", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-500", "mb-20"], [1, "bg-white", "rounded-3xl", "border", "border-slate-200/60", "shadow-sm", "p-6"], [1, "flex", "items-center", "gap-4", "mb-6"], [1, "w-1/2"], [1, "w-full", "px-4", "py-3", "bg-slate-50", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-primary/20", "transition-all", 3, "ngModelChange", "change", "ngModel"], ["value", "MATERIAL"], ["value", "EQUIPMENT"], [1, "relative", "w-1/2"], [1, "material-symbols-outlined", "absolute", "left-4", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "text", "placeholder", "Search materials or equipments...", 1, "w-full", "pl-12", "pr-4", "py-3", "bg-slate-50", "border-none", "rounded-2xl", "text-sm", "focus:ring-2", "focus:ring-primary/20", "transition-all", 3, "ngModelChange", "input", "ngModel"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "xl:grid-cols-3", "gap-6"], [3, "class", "click", 4, "ngFor", "ngForOf"], [1, "fixed", "bottom-0", "left-66", "right-0", "z-50", "flex", "justify-end", "gap-4", "p-4", "bg-white", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800"], [3, "click", "disabled"], [3, "click"], [1, "absolute", "inset-0", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-700", "bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_45%)]"], [1, "absolute", "inset-0", "rounded-[32px]", "opacity-0", "group-hover:opacity-100", "transition-all", "duration-500", "border", "border-primary/10"], [1, "relative", "p-6"], ["class", "absolute top-5 right-5 w-9 h-9 rounded-2xl\n               bg-gradient-to-br from-primary to-indigo-600\n               text-white flex items-center justify-center\n               shadow-[0_10px_25px_rgba(99,102,241,0.35)]\n               animate-in zoom-in-50 duration-300", 4, "ngIf"], [1, "flex", "items-start", "gap-4", "mb-6"], [1, "absolute", "inset-0", "bg-gradient-to-tr", "from-white/20", "to-transparent"], [1, "material-symbols-outlined", "text-[28px]", "relative", "z-10"], [1, "flex-1", "min-w-0", "pt-1"], [1, "text-[17px]", "font-black", "tracking-tight", "text-slate-900", "dark:text-white", "leading-tight", "line-clamp-2"], [1, "flex", "items-center", "gap-2", "mt-3"], [1, "px-3", "py-1", "rounded-full", "bg-slate-100", "dark:bg-slate-800", "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "text-slate-500"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "rounded-2xl", "border", "border-slate-100", "dark:border-slate-800", "bg-slate-50/70", "dark:bg-slate-800/40", "p-4"], [1, "flex", "items-center", "justify-between"], [1, "text-[10px]", "uppercase", "tracking-[0.25em]", "font-black", "text-slate-400", "mb-1.5"], [1, "flex", "items-end", "gap-1"], [1, "text-3xl", "font-black", "tracking-tight", "text-slate-900", "dark:text-white"], [1, "text-right"], [1, "text-[9px]", "uppercase", "tracking-[0.22em]", "font-black", "text-slate-400", "mb-1.5"], [1, "px-3", "py-1.5", "rounded-xl", "bg-white", "dark:bg-slate-900", "border", "border-slate-200", "dark:border-slate-700", "text-[11px]", "font-bold", "text-slate-600", "dark:text-slate-300", "shadow-sm"], [1, "material-symbols-outlined", "text-[18px]"], [1, "absolute", "top-5", "right-5", "w-9", "h-9", "rounded-2xl", "bg-gradient-to-br", "from-primary", "to-indigo-600", "text-white", "flex", "items-center", "justify-center", "shadow-[0_10px_25px_rgba(99,102,241,0.35)]", "animate-in", "zoom-in-50", "duration-300"], [1, "material-symbols-outlined", "text-[18px]", "font-bold"], [1, "bg-white", "rounded-3xl", "border", "border-slate-200/60", "shadow-sm", "overflow-hidden"], [1, "w-full", "text-left", "border-collapse"], [1, "bg-slate-50/50"], [1, "px-8", "py-5", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest"], [1, "px-8", "py-5", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "text-right"], [1, "px-6", "py-5", "text-xs", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "text-center"], ["class", "border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-all", 4, "ngFor", "ngForOf"], [1, "px-8", "py-4", "rounded-2xl", "font-black", "uppercase", "tracking-widest", "text-slate-400", "hover:text-slate-900", "hover:bg-slate-100", "transition-all", "flex", "items-center", "gap-3", 3, "click"], [1, "material-symbols-outlined", "text-sm"], [1, "flex", "gap-4", "items-center"], [1, "flex", "items-center", "gap-4", "mr-6"], [1, "text-sm", "font-bold", "text-slate-400", "uppercase", "tracking-wide"], [1, "text-3xl", "font-black", "text-slate-900"], [1, "px-10", "py-3", "bg-primary", "rounded-2xl", "font-bold", "text-white", "transition-all", "shadow-lg", "shadow-primary/20", "hover:-translate-y-0.5", 3, "click"], [1, "border-b", "border-slate-50", "last:border-none", "hover:bg-slate-50/50", "transition-all"], [1, "px-8", "py-6"], [1, "text-sm", "font-bold", "text-slate-900"], [1, "text-xs", "text-slate-400"], [1, "w-full", "bg-slate-50", "border-none", "rounded-xl", "text-sm", "p-3", "focus:ring-2", "focus:ring-primary/20", "transition-all", "font-semibold", "text-slate-700", 3, "change"], ["value", ""], [3, "value", "selected", 4, "ngFor", "ngForOf"], ["type", "number", "min", "1", "max", "1000", 1, "w-24", "bg-slate-50", "border-none", "rounded-xl", "text-sm", "p-3", "focus:ring-2", "focus:ring-primary/20", "transition-all", "font-bold", 3, "ngModelChange", "input", "ngModel"], [1, "px-8", "py-6", "text-right"], [1, "text-sm", "font-black", "text-slate-900"], [1, "px-6", "py-6", "text-center"], ["type", "button", 1, "w-11", "h-11", "rounded-2xl", "bg-rose-50", "text-rose-600", "hover:bg-rose-100", "hover:scale-105", "transition-all", "flex", "items-center", "justify-center", "mx-auto", "disabled:opacity-40", "disabled:cursor-not-allowed", "disabled:hover:scale-100", "disabled:hover:bg-rose-50", 3, "click", "disabled"], [3, "value", "selected"], [1, "mx-auto", "animate-in", "fade-in", "zoom-in-95", "duration-500", "mb-20"], [1, "bg-white", "rounded-[2rem]", "border", "border-slate-200/60", "shadow-2xl", "p-10", "relative", "overflow-hidden"], [1, "absolute", "-top-20", "-right-20", "w-64", "h-64", "bg-primary/5", "rounded-full", "blur-3xl"], [1, "flex", "justify-between", "items-start", "mb-12", "relative", "z-10"], [1, "bg-primary/10", "text-primary", "px-4", "py-1.5", "rounded-full", "text-[10px]", "font-black", "uppercase", "tracking-[0.2em]", "mb-4", "inline-block"], [1, "text-4xl", "font-black", "text-slate-900", "tracking-tight"], [1, "text-xs", "font-black", "text-slate-400", "uppercase", "tracking-widest", "mb-1"], [1, "text-lg", "font-bold", "text-slate-900"], [1, "max-w-4xl", "mx-auto", "space-y-8", "relative", "z-10"], [1, "bg-slate-50/80", "rounded-3xl", "p-8", "border", "border-slate-100"], [1, "text-xs", "font-black", "text-slate-400", "uppercase", "tracking-[0.2em]", "mb-6"], [1, "space-y-4"], ["class", "flex justify-between items-center pb-4 border-b border-slate-200/60 last:border-none last:pb-0", 4, "ngFor", "ngForOf"], [1, "fixed", "bottom-0", "left-66", "right-0", "z-[9999]", "flex", "justify-end", "gap-4", "p-4", "bg-white", "dark:bg-slate-900", "border-t", "border-slate-200", "dark:border-slate-800", 2, "opacity", "1"], [1, "px-10", "py-3", "bg-primary", "rounded-2xl", "font-bold", "text-white", "transition-all", "shadow-lg", "shadow-primary/20", "hover:-translate-y-0.5", "flex", "items-center", "gap-2", 3, "click"], [1, "flex", "justify-between", "items-center", "pb-4", "border-b", "border-slate-200/60", "last:border-none", "last:pb-0"], [1, "flex", "items-center", "gap-2", "mt-1"], [1, "material-symbols-outlined", "text-[14px]", "text-slate-400"], [1, "text-[12px]", "font-semibold", "text-slate-500"], [1, "text-[11px]", "font-bold", "text-slate-400"]], template: function NewQuotations_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "a", 2)(4, "span", 3);
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
      \u0275\u0275template(28, NewQuotations_div_28_Template, 18, 6, "div", 9)(29, NewQuotations_div_29_Template, 33, 2, "div", 9)(30, NewQuotations_div_30_Template, 37, 6, "div", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275classMap("flex items-center gap-2 " + (ctx.currentStep >= 1 ? "text-primary" : "text-slate-400"));
      \u0275\u0275advance();
      \u0275\u0275classMap("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (ctx.currentStep >= 1 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"));
      \u0275\u0275advance(5);
      \u0275\u0275classMap("flex items-center gap-2 " + (ctx.currentStep >= 2 ? "text-primary" : "text-slate-400"));
      \u0275\u0275advance();
      \u0275\u0275classMap("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (ctx.currentStep >= 2 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"));
      \u0275\u0275advance(5);
      \u0275\u0275classMap("flex items-center gap-2 " + (ctx.currentStep >= 3 ? "text-primary" : "text-slate-400"));
      \u0275\u0275advance();
      \u0275\u0275classMap("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + (ctx.currentStep >= 3 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"));
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.currentStep === 1);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentStep === 2);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.currentStep === 3);
    }
  }, dependencies: [NgForOf, NgIf, RouterLink, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewQuotations, [{
    type: Component,
    args: [{ selector: "app-new-quotations", standalone: false, template: `<div class="bg-slate-50/50 animate-in">\r
  <!-- Header -->\r
  <div class="flex justify-between items-center mb-8">\r
    <div>\r
      <a routerLink="/master/resources/quotations"\r
        class="group inline-flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:-translate-x-1 transition-all shadow-sm mb-4">\r
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>\r
        <span class="text-xs font-black uppercase tracking-widest">Back to List</span>\r
      </a>\r
      <h1 class="text-4xl font-black tracking-tight text-slate-900 border-l-4 border-primary pl-6 py-1">New Quotation\r
      </h1>\r
    </div>\r
\r
    <!-- Stepper Indicator -->\r
    <div class="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-200/60 shadow-sm">\r
      <div [class]="'flex items-center gap-2 ' + (currentStep >= 1 ? 'text-primary' : 'text-slate-400')">\r
        <div\r
          [class]="'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (currentStep >= 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400')">\r
          1</div>\r
        <span class="text-sm font-bold">Items</span>\r
      </div>\r
      <div class="w-8 h-px bg-slate-200"></div>\r
      <div [class]="'flex items-center gap-2 ' + (currentStep >= 2 ? 'text-primary' : 'text-slate-400')">\r
        <div\r
          [class]="'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (currentStep >= 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400')">\r
          2</div>\r
        <span class="text-sm font-bold">Vendors</span>\r
      </div>\r
      <div class="w-8 h-px bg-slate-200"></div>\r
      <div [class]="'flex items-center gap-2 ' + (currentStep >= 3 ? 'text-primary' : 'text-slate-400')">\r
        <div\r
          [class]="'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ' + (currentStep >= 3 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400')">\r
          3</div>\r
        <span class="text-sm font-bold">Review</span>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Step 1: Material Selection -->\r
  <div *ngIf="currentStep === 1" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">\r
    <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6">\r
      <div class="flex items-center gap-4 mb-6">\r
\r
        <div class="w-1/2">\r
          <select [(ngModel)]="selectedType" (change)="onTypeChange()"\r
            class="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all">\r
\r
            <option value="MATERIAL">Material</option>\r
            <option value="EQUIPMENT">Equipment</option>\r
\r
          </select>\r
        </div>\r
\r
        <div class="relative w-1/2">\r
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
            <!-- Stats Section -->\r
            <div class="rounded-2xl border border-slate-100 dark:border-slate-800\r
               bg-slate-50/70 dark:bg-slate-800/40 p-4">\r
\r
              <div class="flex items-center justify-between">\r
\r
                <!-- Price -->\r
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
                <!-- SKU -->\r
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
            <!-- Bottom CTA -->\r
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
      class="fixed bottom-0 left-66 right-0 z-50 flex justify-end gap-4 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">\r
      <button (click)="nextStep()" [disabled]="selectedMaterials.size === 0"\r
        [class]="'px-8 py-3 rounded-2xl font-bold text-white transition-all shadow-lg ' + (selectedMaterials.size > 0 ? 'bg-primary shadow-primary/20 hover:-translate-y-0.5' : 'bg-slate-300 opacity-50 cursor-not-allowed')">\r
        Continue to Vendors\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Step 2: Details & Vendors -->\r
  <div *ngIf="currentStep === 2" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">\r
\r
    <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">\r
\r
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
            <!-- Delete Column -->\r
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
            <!-- Material -->\r
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
            <!-- Vendor -->\r
            <td class="px-8 py-6">\r
\r
              <select (change)="onVendorChange(item, $event)" class="w-full bg-slate-50 border-none rounded-xl text-sm p-3\r
                     focus:ring-2 focus:ring-primary/20 transition-all\r
                     font-semibold text-slate-700">\r
\r
                <option value="">\r
                  Select Vendor...\r
                </option>\r
\r
                <option *ngFor="let vendor of vendors" [value]="vendor.id" [selected]="vendor.id === item.vendorId">\r
\r
                  {{vendor.name}}\r
\r
                </option>\r
\r
              </select>\r
\r
            </td>\r
\r
            <!-- Quantity -->\r
            <td class="px-8 py-6">\r
              <input type="number" min="1" max="1000" [(ngModel)]="item.quantity" (input)="checkQuantity(item, $event)"\r
                (ngModelChange)="updateLineTotal(item)" class="w-24 bg-slate-50 border-none rounded-xl text-sm p-3\r
    focus:ring-2 focus:ring-primary/20 transition-all font-bold" />\r
            </td>\r
\r
            <!-- Unit Price -->\r
            <td class="px-8 py-6">\r
\r
              <div class="text-sm font-bold text-slate-900">\r
                \u20B9{{item.unitPrice.toLocaleString()}}\r
              </div>\r
\r
            </td>\r
\r
            <!-- Total -->\r
            <td class="px-8 py-6 text-right">\r
\r
              <div class="text-sm font-black text-slate-900">\r
                \u20B9{{item.totalPrice.toLocaleString()}}\r
              </div>\r
\r
            </td>\r
\r
            <!-- Delete Button -->\r
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
    <!-- Footer -->\r
    <div\r
      class="fixed bottom-0 left-66 right-0 z-50 flex justify-end gap-4 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">\r
\r
      <button (click)="prevStep()" class="px-8 py-4 rounded-2xl font-black uppercase tracking-widest\r
             text-slate-400 hover:text-slate-900 hover:bg-slate-100\r
             transition-all flex items-center gap-3">\r
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
      <div class="flex gap-4 items-center">\r
\r
        <div class="flex items-center gap-4 mr-6">\r
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
               hover:-translate-y-0.5">\r
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
  <!-- Step 3: Summary -->\r
  <div *ngIf="currentStep === 3" class=" mx-auto animate-in fade-in zoom-in-95 duration-500 mb-20">\r
    <div class="bg-white rounded-[2rem] border border-slate-200/60 shadow-2xl p-10 relative overflow-hidden">\r
      <!-- Watermark/Decor -->\r
      <div class="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>\r
\r
      <div class="flex justify-between items-start mb-12 relative z-10">\r
        <div>\r
          <div\r
            class="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">\r
            Draft Quotation</div>\r
          <h2 class="text-4xl font-black text-slate-900 tracking-tight">Summary</h2>\r
        </div>\r
        <div class="text-right">\r
          <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Generated On</p>\r
          <p class="text-lg font-bold text-slate-900">{{ today | date:'MMM dd, yyyy' }}</p>\r
        </div>\r
      </div>\r
\r
     <div class="max-w-4xl mx-auto space-y-8 relative z-10">\r
\r
  <div class="bg-slate-50/80 rounded-3xl p-8 border border-slate-100">\r
    <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">\r
      Item Breakdown\r
    </h3>\r
\r
    <div class="space-y-4">\r
      <div *ngFor="let item of quoteItems"\r
        class="flex justify-between items-center pb-4 border-b border-slate-200/60 last:border-none last:pb-0">\r
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
        <div class="text-right">\r
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
    <div\r
  class="fixed bottom-0 left-66 right-0 z-[9999]\r
         flex justify-end gap-4 p-4\r
         bg-white dark:bg-slate-900\r
         border-t border-slate-200 dark:border-slate-800"\r
  style="opacity:1;">\r
\r
        <button (click)="prevStep()" class="px-8 py-4 rounded-2xl font-black uppercase tracking-widest\r
           text-slate-400 hover:text-slate-900 hover:bg-slate-100\r
           transition-all flex items-center gap-3">\r
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
          <div class="flex items-center gap-4 mr-6">\r
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
           hover:-translate-y-0.5 flex items-center gap-2">\r
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

// src/app/modules/resources/resources-routing-module.ts
var routes = [
  { path: "materials", component: Materials },
  { path: "contracts", component: Contracts },
  { path: "equipment-inventory", component: EquipmentInventory },
  { path: "quotations", component: Quotations },
  { path: "quotations/new", component: NewQuotations }
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
      declarations: [Materials, Contracts, EquipmentInventory, Quotations, NewQuotations],
      imports: [CommonModule, ResourcesRoutingModule, FormsModule, VendorAddComponent, CommonDialogComponent]
    }]
  }], null, null);
})();
export {
  ResourcesModule
};
//# sourceMappingURL=chunk-BNCTSQMQ.js.map
