import {
  Component,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵtext
} from "./chunk-23RKHPSU.js";

// src/app/core/interceptors/access-denied/access-denied.ts
var AccessDenied = class _AccessDenied {
  router;
  constructor(router) {
    this.router = router;
  }
  goBack() {
    this.router.navigate(["/master/dashboard"]);
  }
  static \u0275fac = function AccessDenied_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccessDenied)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccessDenied, selectors: [["app-access-denied"]], decls: 11, vars: 0, consts: [[1, "mt-20", "flex", "items-center", "justify-center", "bg-gray-50"], [1, "bg-white", "shadow-lg", "rounded-xl", "p-8", "max-w-lg", "text-center"], [1, "text-red-500", "text-6xl", "mb-4"], [1, "material-icons", "text-7xl"], [1, "text-3xl", "font-bold", "mb-3"], [1, "text-gray-600", "mb-6"], [1, "px-6", "py-3", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", 3, "click"]], template: function AccessDenied_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "lock");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(5, "h1", 4);
      \u0275\u0275text(6, " Access Denied ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "p", 5);
      \u0275\u0275text(8, " You do not have permission to access this page. Please contact your administrator for access. ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "button", 6);
      \u0275\u0275domListener("click", function AccessDenied_Template_button_click_9_listener() {
        return ctx.goBack();
      });
      \u0275\u0275text(10, " Go Dashboard ");
      \u0275\u0275domElementEnd()()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccessDenied, [{
    type: Component,
    args: [{ selector: "app-access-denied", standalone: true, template: '<div class="mt-20 flex items-center justify-center bg-gray-50">\r\n  <div class="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center">\r\n\r\n    <div class="text-red-500 text-6xl mb-4">\r\n      <span class="material-icons text-7xl">lock</span>\r\n    </div>\r\n\r\n    <h1 class="text-3xl font-bold mb-3">\r\n      Access Denied\r\n    </h1>\r\n\r\n    <p class="text-gray-600 mb-6">\r\n      You do not have permission to access this page.\r\n      Please contact your administrator for access.\r\n    </p>\r\n\r\n    <button\r\n      (click)="goBack()"\r\n      class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">\r\n      Go Dashboard\r\n    </button>\r\n\r\n  </div>\r\n</div>' }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccessDenied, { className: "AccessDenied", filePath: "app/core/interceptors/access-denied/access-denied.ts", lineNumber: 9 });
})();
export {
  AccessDenied
};
//# sourceMappingURL=chunk-S32563QS.js.map
