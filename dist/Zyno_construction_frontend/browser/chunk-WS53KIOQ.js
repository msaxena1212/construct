import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgClass,
  NgTemplateOutlet,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-F27QM527.js";

// src/app/shared/components/common-dialog/common-dialog.ts
var _c0 = ["*", [["", "dialog-header-actions", ""]], [["", "dialog-footer", ""]]];
var _c1 = ["*", "[dialog-header-actions]", "[dialog-footer]"];
var _c2 = (a0, a1, a2) => [a0, a1, a2];
function CommonDialogComponent_Conditional_0_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CommonDialogComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function CommonDialogComponent_Conditional_0_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onBackdropClick());
    });
    \u0275\u0275template(1, CommonDialogComponent_Conditional_0_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const dialogPanel_r3 = \u0275\u0275reference(2);
    \u0275\u0275property("ngClass", ctx_r1.backdropClass);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", dialogPanel_r3);
  }
}
function CommonDialogComponent_Conditional_0_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CommonDialogComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CommonDialogComponent_Conditional_0_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 3);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const dialogPanel_r3 = \u0275\u0275reference(2);
    \u0275\u0275property("ngTemplateOutlet", dialogPanel_r3);
  }
}
function CommonDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CommonDialogComponent_Conditional_0_Conditional_0_Template, 2, 2, "div", 1)(1, CommonDialogComponent_Conditional_0_Conditional_1_Template, 1, 1, "ng-container");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.showBackdrop ? 0 : 1);
  }
}
function CommonDialogComponent_ng_template_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 5);
  }
}
function CommonDialogComponent_ng_template_1_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r1.iconClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.resolvedIcon, " ");
  }
}
function CommonDialogComponent_ng_template_1_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r1.resolvedBadgeClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.badge, " ");
  }
}
function CommonDialogComponent_ng_template_1_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.title, " ");
  }
}
function CommonDialogComponent_ng_template_1_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.subtitle, " ");
  }
}
function CommonDialogComponent_ng_template_1_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function CommonDialogComponent_ng_template_1_Conditional_2_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(1, " close ");
    \u0275\u0275elementEnd();
  }
}
function CommonDialogComponent_ng_template_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 9);
    \u0275\u0275conditionalCreate(2, CommonDialogComponent_ng_template_1_Conditional_2_Conditional_2_Template, 2, 2, "span", 10);
    \u0275\u0275elementStart(3, "div", 11);
    \u0275\u0275conditionalCreate(4, CommonDialogComponent_ng_template_1_Conditional_2_Conditional_4_Template, 2, 2, "span", 12);
    \u0275\u0275conditionalCreate(5, CommonDialogComponent_ng_template_1_Conditional_2_Conditional_5_Template, 2, 1, "h3", 13);
    \u0275\u0275conditionalCreate(6, CommonDialogComponent_ng_template_1_Conditional_2_Conditional_6_Template, 2, 1, "p", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 15);
    \u0275\u0275projection(8, 1);
    \u0275\u0275conditionalCreate(9, CommonDialogComponent_ng_template_1_Conditional_2_Conditional_9_Template, 2, 0, "button", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", ctx_r1.headerClass);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.resolvedIcon ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.badge ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.title ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.subtitle ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.showCloseButton ? 9 : -1);
  }
}
function CommonDialogComponent_ng_template_1_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function CommonDialogComponent_ng_template_1_Conditional_5_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function CommonDialogComponent_ng_template_1_Conditional_5_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.primary.emit());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.cancelLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.primaryDisabled)("ngClass", ctx_r1.primaryButtonClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.primaryLabel, " ");
  }
}
function CommonDialogComponent_ng_template_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275projection(1, 2);
    \u0275\u0275conditionalCreate(2, CommonDialogComponent_ng_template_1_Conditional_5_Conditional_2_Template, 4, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showDefaultFooterButtons ? 2 : -1);
  }
}
function CommonDialogComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275listener("click", function CommonDialogComponent_ng_template_1_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275conditionalCreate(1, CommonDialogComponent_ng_template_1_Conditional_1_Template, 1, 0, "div", 5);
    \u0275\u0275conditionalCreate(2, CommonDialogComponent_ng_template_1_Conditional_2_Template, 10, 6, "div", 6);
    \u0275\u0275elementStart(3, "div", 7);
    \u0275\u0275projection(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CommonDialogComponent_ng_template_1_Conditional_5_Template, 3, 1, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("max-width", ctx_r1.computedMaxWidth);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(6, _c2, ctx_r1.dialogWidthClass, ctx_r1.panelClass, ctx_r1.dialogVariantClass));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.variant === "danger" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.title || ctx_r1.subtitle || ctx_r1.badge || ctx_r1.icon || ctx_r1.showCloseButton ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.showFooter ? 5 : -1);
  }
}
var CommonDialogComponent = class _CommonDialogComponent {
  standardWidthClass = "!max-w-3xl";
  standardHeightClass = "!h-[82vh] !max-h-[82vh]";
  dangerWidthClass = "!max-w-xl";
  dangerHeightClass = "!h-auto !max-h-[90vh]";
  open = true;
  showBackdrop = true;
  closeOnBackdrop = true;
  size = "";
  height = "";
  maxWidth = "";
  panelClass = "";
  contentClass = "min-h-0 flex-1 overflow-y-auto";
  backdropClass = "bg-slate-900/40";
  variant = "default";
  title = "";
  subtitle = "";
  badge = "";
  badgeClass = "";
  icon = "";
  showCloseButton = false;
  showFooter = false;
  showDefaultFooterButtons = true;
  cancelLabel = "Cancel";
  primaryLabel = "Save";
  primaryDisabled = false;
  closed = new EventEmitter();
  cancelled = new EventEmitter();
  primary = new EventEmitter();
  get dialogWidthClass() {
    if (this.isDanger) {
      return this.dangerWidthClass;
    }
    return this.maxWidth || this.standardWidthClass;
  }
  get dialogHeightClass() {
    if (this.isDanger) {
      return this.dangerHeightClass;
    }
    return this.height || this.standardHeightClass;
  }
  get computedMaxWidth() {
    const maxWidthClass = this.maxWidth || (this.isDanger ? "max-w-xl" : "max-w-3xl");
    return this.getMaxWidthValue(maxWidthClass);
  }
  getMaxWidthValue(maxWidthClass) {
    const normalized = maxWidthClass.replace(/^!/, "").trim();
    switch (normalized) {
      case "max-w-xs":
        return "20rem";
      case "max-w-sm":
        return "24rem";
      case "max-w-md":
        return "28rem";
      case "max-w-lg":
        return "32rem";
      case "max-w-xl":
        return "36rem";
      case "max-w-2xl":
        return "42rem";
      case "max-w-3xl":
        return "48rem";
      case "max-w-4xl":
        return "56rem";
      case "max-w-5xl":
        return "64rem";
      case "max-w-6xl":
        return "72rem";
      case "max-w-7xl":
        return "80rem";
      case "max-w-full":
        return "100%";
      default:
        return "min(48rem, calc(100vw - 2rem))";
    }
  }
  get isDanger() {
    return this.variant === "danger";
  }
  get dialogVariantClass() {
    return this.isDanger ? "border-red-200 dark:border-red-950/40" : "border-slate-200/70 dark:border-slate-800/70";
  }
  get headerClass() {
    return this.isDanger ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 border-b" : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 border-b";
  }
  get resolvedIcon() {
    if (this.icon)
      return this.icon;
    if (this.isDanger)
      return "delete_forever";
    return "";
  }
  get resolvedBadgeClass() {
    if (this.badgeClass)
      return this.badgeClass;
    return this.variant === "danger" ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300" : "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300";
  }
  get iconClass() {
    return this.variant === "danger" ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300" : "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300";
  }
  get primaryButtonClass() {
    return this.variant === "danger" ? "bg-red-600 text-white hover:bg-red-700 shadow-red-500/20" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20";
  }
  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.closed.emit();
    }
  }
  onCancel() {
    this.cancelled.emit();
    this.closed.emit();
  }
  static \u0275fac = function CommonDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CommonDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommonDialogComponent, selectors: [["app-common-dialog"]], inputs: { open: "open", showBackdrop: "showBackdrop", closeOnBackdrop: "closeOnBackdrop", size: "size", height: "height", maxWidth: "maxWidth", panelClass: "panelClass", contentClass: "contentClass", backdropClass: "backdropClass", variant: "variant", title: "title", subtitle: "subtitle", badge: "badge", badgeClass: "badgeClass", icon: "icon", showCloseButton: "showCloseButton", showFooter: "showFooter", showDefaultFooterButtons: "showDefaultFooterButtons", cancelLabel: "cancelLabel", primaryLabel: "primaryLabel", primaryDisabled: "primaryDisabled" }, outputs: { closed: "closed", cancelled: "cancelled", primary: "primary" }, ngContentSelectors: _c1, decls: 3, vars: 1, consts: [["dialogPanel", ""], [1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "p-4", "overflow-y-hidden", "backdrop-blur-sm", 3, "ngClass"], [1, "fixed", "inset-0", "z-[100]", "flex", "items-center", "justify-center", "p-4", "overflow-y-hidden", "backdrop-blur-sm", 3, "click", "ngClass"], [4, "ngTemplateOutlet"], [1, "common-dialog-panel", "w-full", "max-h-[90vh]", "bg-white", "dark:bg-slate-900", "rounded-[28px]", "border", "overflow-hidden", "shadow-[0_25px_80px_-30px_rgba(15,23,42,0.6)]", "flex", "flex-col", 3, "click", "ngClass"], [1, "h-1", "w-full", "bg-red-600", "dark:bg-red-500"], [1, "common-dialog-header", "shrink-0", "px-6", "py-5", "border-b", "flex", "items-center", "justify-between", "gap-4", 3, "ngClass"], [1, "common-dialog-body"], [1, "common-dialog-footer", "shrink-0", "px-6", "py-4", "bg-slate-50", "dark:bg-slate-950", "border-t", "border-slate-100", "dark:border-slate-800", "flex", "items-center", "justify-end", "gap-3"], [1, "min-w-0", "flex", "items-center", "gap-3"], [1, "material-symbols-outlined", "h-10", "w-10", "rounded-xl", "grid", "place-items-center", "shrink-0", "text-[24px]", "leading-none", "align-middle", 3, "ngClass"], [1, "min-w-0"], [1, "inline-flex", "w-fit", "items-center", "rounded-full", "px-2.5", "py-1", "text-[10px]", "font-black", "uppercase", "tracking-widest", 3, "ngClass"], [1, "mt-1", "truncate", "text-lg", "font-bold", "text-slate-900", "dark:text-slate-50"], [1, "mt-0.5", "truncate", "text-xs", "font-medium", "text-slate-500", "dark:text-slate-400"], [1, "flex", "shrink-0", "items-center", "gap-2"], ["type", "button", 1, "material-symbols-outlined", "h-9", "w-9", "rounded-full", "bg-transparent", "text-slate-400", "hover:bg-slate-100", "hover:text-slate-900", "dark:hover:bg-slate-800", "dark:hover:text-white", "transition-colors", "flex", "items-center", "justify-center"], ["type", "button", 1, "material-symbols-outlined", "h-9", "w-9", "rounded-full", "bg-transparent", "text-slate-400", "hover:bg-slate-100", "hover:text-slate-900", "dark:hover:bg-slate-800", "dark:hover:text-white", "transition-colors", "flex", "items-center", "justify-center", 3, "click"], ["type", "button", 1, "min-w-[9rem]", "px-5", "py-3", "rounded-full", "text-[11px]", "font-black", "uppercase", "tracking-widest", "text-slate-500", "hover:text-slate-900", "dark:text-slate-400", "dark:hover:text-white", "hover:bg-slate-100", "dark:hover:bg-slate-800", "border", "border-slate-200", "dark:border-slate-800", 3, "click"], ["type", "button", 1, "min-w-[9rem]", "px-5", "py-3", "rounded-full", "text-[11px]", "font-black", "uppercase", "tracking-widest", "shadow-lg", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled", "ngClass"]], template: function CommonDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275conditionalCreate(0, CommonDialogComponent_Conditional_0_Template, 2, 1);
      \u0275\u0275template(1, CommonDialogComponent_ng_template_1_Template, 6, 10, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.open ? 0 : -1);
    }
  }, dependencies: [CommonModule, NgClass, NgTemplateOutlet], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.common-dialog-panel[_ngcontent-%COMP%] {\n  width: min(48rem, 100vw - 2rem);\n  max-width: min(48rem, 100vw - 2rem);\n  height: auto;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.22s ease, opacity 0.22s ease;\n  will-change: transform, opacity;\n}\n.common-dialog-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-height: 78px;\n}\n.common-dialog-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-height: 72px;\n}\n.common-dialog-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.common-dialog-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 9rem;\n  min-height: 3rem;\n}\n.common-dialog-header[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 2.5rem;\n}\n/*# sourceMappingURL=common-dialog.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CommonDialogComponent, [{
    type: Component,
    args: [{ selector: "app-common-dialog", standalone: true, imports: [CommonModule], template: `@if (open) {\r
  @if (showBackdrop) {\r
    <div\r
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-hidden backdrop-blur-sm"\r
      [ngClass]="backdropClass"\r
      (click)="onBackdropClick()">\r
\r
      <ng-container *ngTemplateOutlet="dialogPanel"></ng-container>\r
\r
    </div>\r
  } @else {\r
    <ng-container *ngTemplateOutlet="dialogPanel"></ng-container>\r
  }\r
}\r
\r
<ng-template #dialogPanel>\r
\r
  <div\r
    class="common-dialog-panel w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-[28px] border overflow-hidden shadow-[0_25px_80px_-30px_rgba(15,23,42,0.6)] flex flex-col"\r
    [ngClass]="[dialogWidthClass, panelClass, dialogVariantClass]"\r
    [style.max-width]="computedMaxWidth"\r
    (click)="$event.stopPropagation()">\r
\r
    @if (variant === 'danger') {\r
      <div class="h-1 w-full bg-red-600 dark:bg-red-500"></div>\r
    }\r
\r
    @if (title || subtitle || badge || icon || showCloseButton) {\r
\r
      <div\r
        class="common-dialog-header shrink-0 px-6 py-5 border-b flex items-center justify-between gap-4"\r
        [ngClass]="headerClass">\r
\r
        <div class="min-w-0 flex items-center gap-3">\r
\r
          @if (resolvedIcon) {\r
            <span\r
              class="material-symbols-outlined h-10 w-10 rounded-xl grid place-items-center shrink-0 text-[24px] leading-none align-middle"\r
              [ngClass]="iconClass">\r
              {{ resolvedIcon }}\r
            </span>\r
          }\r
\r
          <div class="min-w-0">\r
\r
            @if (badge) {\r
              <span\r
                class="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest"\r
                [ngClass]="resolvedBadgeClass">\r
                {{ badge }}\r
              </span>\r
            }\r
\r
            @if (title) {\r
              <h3 class="mt-1 truncate text-lg font-bold text-slate-900 dark:text-slate-50">\r
                {{ title }}\r
              </h3>\r
            }\r
\r
            @if (subtitle) {\r
              <p class="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">\r
                {{ subtitle }}\r
              </p>\r
            }\r
\r
          </div>\r
\r
        </div>\r
\r
        <div class="flex shrink-0 items-center gap-2">\r
\r
          <ng-content select="[dialog-header-actions]"></ng-content>\r
\r
          @if (showCloseButton) {\r
            <button\r
              type="button"\r
              (click)="onCancel()"\r
              class="material-symbols-outlined h-9 w-9 rounded-full bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors flex items-center justify-center">\r
              close\r
            </button>\r
          }\r
\r
        </div>\r
\r
      </div>\r
    }\r
\r
    <!-- BODY -->\r
\r
    <div class="common-dialog-body">\r
      <ng-content></ng-content>\r
    </div>\r
\r
    @if (showFooter) {\r
\r
      <div\r
        class="common-dialog-footer shrink-0 px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">\r
\r
        <ng-content select="[dialog-footer]"></ng-content>\r
\r
        @if (showDefaultFooterButtons) {\r
\r
          <button\r
            type="button"\r
            (click)="onCancel()"\r
            class="min-w-[9rem] px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800">\r
            {{ cancelLabel }}\r
          </button>\r
\r
          <button\r
            type="button"\r
            (click)="primary.emit()"\r
            [disabled]="primaryDisabled"\r
            class="min-w-[9rem] px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"\r
            [ngClass]="primaryButtonClass">\r
            {{ primaryLabel }}\r
          </button>\r
\r
        }\r
\r
      </div>\r
\r
    }\r
\r
  </div>\r
\r
</ng-template>`, styles: ["/* src/app/shared/components/common-dialog/common-dialog.scss */\n:host {\n  display: contents;\n}\n.common-dialog-panel {\n  width: min(48rem, 100vw - 2rem);\n  max-width: min(48rem, 100vw - 2rem);\n  height: auto;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.22s ease, opacity 0.22s ease;\n  will-change: transform, opacity;\n}\n.common-dialog-header {\n  flex-shrink: 0;\n  min-height: 78px;\n}\n.common-dialog-footer {\n  flex-shrink: 0;\n  min-height: 72px;\n}\n.common-dialog-body {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.common-dialog-footer button {\n  min-width: 9rem;\n  min-height: 3rem;\n}\n.common-dialog-header .material-symbols-outlined {\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 2.5rem;\n}\n/*# sourceMappingURL=common-dialog.css.map */\n"] }]
  }], null, { open: [{
    type: Input
  }], showBackdrop: [{
    type: Input
  }], closeOnBackdrop: [{
    type: Input
  }], size: [{
    type: Input
  }], height: [{
    type: Input
  }], maxWidth: [{
    type: Input
  }], panelClass: [{
    type: Input
  }], contentClass: [{
    type: Input
  }], backdropClass: [{
    type: Input
  }], variant: [{
    type: Input
  }], title: [{
    type: Input
  }], subtitle: [{
    type: Input
  }], badge: [{
    type: Input
  }], badgeClass: [{
    type: Input
  }], icon: [{
    type: Input
  }], showCloseButton: [{
    type: Input
  }], showFooter: [{
    type: Input
  }], showDefaultFooterButtons: [{
    type: Input
  }], cancelLabel: [{
    type: Input
  }], primaryLabel: [{
    type: Input
  }], primaryDisabled: [{
    type: Input
  }], closed: [{
    type: Output
  }], cancelled: [{
    type: Output
  }], primary: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommonDialogComponent, { className: "CommonDialogComponent", filePath: "app/shared/components/common-dialog/common-dialog.ts", lineNumber: 11 });
})();

export {
  CommonDialogComponent
};
//# sourceMappingURL=chunk-WS53KIOQ.js.map
