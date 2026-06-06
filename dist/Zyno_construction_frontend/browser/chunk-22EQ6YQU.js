import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "./chunk-QQ6KIQTM.js";
import {
  AuthService
} from "./chunk-D4MSAAMA.js";
import {
  require_sweetalert2_all
} from "./chunk-W7VRJKX7.js";
import {
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
  environment
} from "./chunk-M3DYL5PG.js";
import "./chunk-WFU7JF4C.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DOCUMENT,
  HttpClient,
  Inject,
  Injectable,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  RendererFactory2,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  RuntimeError,
  ViewEncapsulation,
  __toESM,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F27QM527.js";

// src/app/modules/modules.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// node_modules/@angular/animations/fesm2022/animations.mjs
/**
 * @license Angular v21.2.12
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var AnimationBuilder = class _AnimationBuilder {
  static \u0275fac = function AnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnimationBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AnimationBuilder,
    factory: () => (() => inject(BrowserAnimationBuilder))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  animationModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _nextAnimationId = 0;
  _renderer;
  constructor(rootRenderer, doc) {
    super();
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation2) {
    const id = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
    issueAnimationCommand(this._renderer, null, id, "register", [entry]);
    return new BrowserAnimationFactory(id, this._renderer);
  }
  static \u0275fac = function BrowserAnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowserAnimationBuilder)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(DOCUMENT));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BrowserAnimationBuilder,
    factory: _BrowserAnimationBuilder.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  _id;
  _renderer;
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  id;
  element;
  _renderer;
  parentPlayer = null;
  _started = false;
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
  }
  totalTime = 0;
};
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  return type === 0 || type === 1;
}

// src/app/shared/services/sidebar.service.ts
var SidebarService = class _SidebarService {
  http;
  baseUrl = environment.serverUrl + "/api/v1";
  constructor(http) {
    this.http = http;
  }
  getSidebarHierarchy() {
    return this.http.get(this.baseUrl + "/sidebar").pipe(map((res) => this.buildHierarchy(res.data)));
  }
  buildHierarchy(data) {
    const map2 = /* @__PURE__ */ new Map();
    const roots = [];
    data.forEach((item) => {
      map2.set(item.id, {
        id: item.id,
        name: item.name,
        path: item.path ? item.path.replace(/^\/+|\/+$/g, "") : "",
        // strip trailing/leading slashes
        icon: item.icon || "arrow_right",
        parentId: item.parentId,
        order: item.order,
        subMenu: []
      });
    });
    data.forEach((item) => {
      if (item.parentId && map2.has(item.parentId)) {
        const child = map2.get(item.id);
        child.subMenuName = item.name;
        map2.get(item.parentId).subMenu.push(child);
      } else {
        roots.push(map2.get(item.id));
      }
    });
    const resolvePaths = (nodes, cumulativePath = "") => {
      nodes.sort((a, b) => a.order - b.order);
      nodes.forEach((node) => {
        let nodePath = cumulativePath;
        if (node.path) {
          nodePath = cumulativePath ? `${cumulativePath}/${node.path}` : node.path;
        }
        node.path = nodePath;
        if (node.subMenu && node.subMenu.length > 0) {
          resolvePaths(node.subMenu, nodePath);
        }
      });
    };
    resolvePaths(roots, "");
    return roots;
  }
  static \u0275fac = function SidebarService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SidebarService, factory: _SidebarService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/modules.ts
var _c0 = (a0) => ({ "sidebar-collapsed": a0 });
function Modules_li_10_i_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 28);
  }
  if (rf & 2) {
    const i_r4 = \u0275\u0275nextContext().index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r4.navIndexvalue == i_r4 ? "open" : "");
  }
}
function Modules_li_10_li_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 29)(2, "mat-icon", 24);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const subNav_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", subNav_r6.path)("title", subNav_r6.subMenuName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(subNav_r6.icon || "folder");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(subNav_r6.subMenuName || subNav_r6.name);
  }
}
function Modules_li_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "a", 23);
    \u0275\u0275listener("click", function Modules_li_10_Template_a_click_1_listener($event) {
      const ctx_r1 = \u0275\u0275restoreView(_r1);
      const nav_r3 = ctx_r1.$implicit;
      const i_r4 = ctx_r1.index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.navToggel(i_r4, nav_r3, $event));
    });
    \u0275\u0275elementStart(2, "mat-icon", 24);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, Modules_li_10_i_6_Template, 1, 1, "i", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ul", 27);
    \u0275\u0275template(8, Modules_li_10_li_8_Template, 6, 4, "li", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const nav_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", !(nav_r3.subMenu == null ? null : nav_r3.subMenu.length) ? nav_r3.path : null)("title", nav_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nav_r3.icon || "folder");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nav_r3.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", nav_r3.subMenu == null ? null : nav_r3.subMenu.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r4.navIndexvalue == i_r4 ? "open" : "");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", nav_r3.subMenu);
  }
}
function Modules_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function Modules_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toggleSidebar());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "menu");
    \u0275\u0275elementEnd()();
  }
}
function Modules_div_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "p", 34);
    \u0275\u0275text(3, "Signed in as ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "div", 36);
    \u0275\u0275elementStart(7, "a", 37);
    \u0275\u0275listener("click", function Modules_div_35_Template_a_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.profile());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "person_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "My Profile");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "a", 38);
    \u0275\u0275listener("click", function Modules_div_35_Template_a_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onLogout());
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "logout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Sign Out");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("@fadeInOut", void 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r4.currentUser == null ? null : ctx_r4.currentUser.email);
  }
}
var Modules = class _Modules {
  changeDref;
  router;
  _authservice;
  sidebarService;
  showAndProfile = false;
  showList = false;
  navIndexvalue = null;
  currentRoute;
  isSidebarCollapsed = false;
  currentDateTime = "";
  currentUser;
  navData = [];
  serverUrl = environment.serverUrl;
  constructor(changeDref, router, _authservice, sidebarService) {
    this.changeDref = changeDref;
    this.router = router;
    this._authservice = _authservice;
    this.sidebarService = sidebarService;
    let i = Number(localStorage.getItem("index"));
    this.navIndexvalue = i;
    const sidebarState = localStorage.getItem("sidebarCollapsed");
    this.isSidebarCollapsed = sidebarState === "true";
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem("sidebarCollapsed", this.isSidebarCollapsed.toString());
  }
  ngOnInit() {
    this._authservice.userS.subscribe((user) => {
      this.currentUser = user;
    });
    this.sidebarService.getSidebarHierarchy().subscribe({
      next: (data) => this.navData = data,
      error: (err) => console.error("Sidebar load error", err)
    });
    window.addEventListener("click", (event) => {
      this.showAndProfile = false;
      this.showList = false;
    });
    setInterval(() => {
      this.updateDateTime();
    }, 1e3);
  }
  ngDoCheck() {
    this.currentRoute = this.router.url;
  }
  ngAfterContentChecked() {
    this.changeDref.detectChanges();
  }
  // speakJuice() {
  //   const speech = new SpeechSynthesisUtterance(
  //     'गन्ने का जूस, बड़ा गिलास, सिर्फ 20 रुपए'
  //   );
  //   speech.lang = 'hi-IN';
  //   const voices = window.speechSynthesis.getVoices();
  //   const femaleVoice = voices.find(
  //     voice =>
  //       voice.lang.includes('hi') ||
  //       voice.name.toLowerCase().includes('female') ||
  //       voice.name.toLowerCase().includes('zira')
  //   );
  //   if (femaleVoice) {
  //     speech.voice = femaleVoice;
  //   }
  //   speech.pitch = 1.2;
  //   speech.rate = 0.9;
  //   speech.volume = 1;
  //   window.speechSynthesis.cancel();
  //   window.speechSynthesis.speak(speech);
  // }
  updateDateTime() {
    const now = /* @__PURE__ */ new Date();
    const date = now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    this.currentDateTime = `${date} , ${time}`;
  }
  navToggel(index, nav, event) {
    if (!nav.subMenu || nav.subMenu.length === 0)
      return;
    event.preventDefault();
    event.stopPropagation();
    if (this.navIndexvalue === index) {
      this.navIndexvalue = null;
      localStorage.removeItem("index");
    } else {
      this.navIndexvalue = index;
      localStorage.setItem("index", index.toString());
    }
  }
  showDropdown(e) {
    e.stopPropagation();
    this.showList = !this.showList;
  }
  profile() {
    this.router.navigate(["/master/profile"]);
  }
  onLogout() {
    import_sweetalert2.default.fire({
      title: "Are you sure want to Logout?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#063178",
      confirmButtonColor: "#f44336",
      confirmButtonText: "Log out",
      cancelButtonText: "Not Now"
    }).then((result) => {
      if (result.value) {
        this._authservice.logout();
      }
    });
  }
  static \u0275fac = function Modules_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Modules)(\u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(SidebarService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Modules, selectors: [["app-modules"]], standalone: false, decls: 38, vars: 15, consts: [[1, "app-wrapper", 3, "ngClass"], [1, "sidebar"], [1, "sidebar-header"], [1, "sidebar-logo"], ["src", "../../../../assets/image/zyno_construction_logo.png", "alt", "Logo"], ["title", "Collapse Sidebar", 1, "sidebar-toggle-btn", 3, "click"], [1, "sidebar-nav"], [4, "ngFor", "ngForOf"], [1, "main-area"], [1, "top-header"], ["class", "header-toggle-btn", "title", "Open Sidebar", 3, "click", 4, "ngIf"], [1, "header-left"], [1, "header-right"], [1, "header-icons", 2, "cursor", "pointer"], [1, "relative"], [1, "profile-trigger", 3, "click"], [1, "profile-avatar-container"], ["alt", "User", 1, "profile-img", 3, "src"], [1, "status-indicator"], [1, "profile-meta", "hidden", "md:block"], [1, "dropdown-arrow"], ["class", "dropdown-profile-menu", 4, "ngIf"], [1, "flex-1", "overflow-y-auto", "blueprint-grid", "p-4"], ["routerLinkActive", "activeRoute", 1, "nav-link", 3, "click", "routerLink", "title"], [1, "nav-icon-material"], [1, "nav-text"], ["class", "arrow", 3, "ngClass", 4, "ngIf"], [1, "submenu", 3, "ngClass"], [1, "arrow", 3, "ngClass"], ["routerLinkActive", "activeRoute", 3, "routerLink", "title"], [1, "nav-text", 2, "padding-left", "20px"], ["title", "Open Sidebar", 1, "header-toggle-btn", 3, "click"], [1, "dropdown-profile-menu"], [1, "dropdown-header"], [1, "text-[10px]", "font-black", "uppercase", "tracking-widest", "text-slate-400", "mb-1"], [1, "text-sm", "font-bold", "text-slate-900", "dark:text-slate-100", "truncate"], [1, "dropdown-divider"], [1, "dropdown-item", 3, "click"], [1, "dropdown-item", "logout", 3, "click"]], template: function Modules_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 5);
      \u0275\u0275listener("click", function Modules_Template_button_click_5_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275elementStart(6, "mat-icon");
      \u0275\u0275text(7, "keyboard_double_arrow_left");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "nav", 6)(9, "ul");
      \u0275\u0275template(10, Modules_li_10_Template, 9, 7, "li", 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 8)(12, "header", 9);
      \u0275\u0275template(13, Modules_button_13_Template, 3, 0, "button", 10);
      \u0275\u0275elementStart(14, "div", 11)(15, "h3");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 12)(20, "a", 13)(21, "mat-icon", 13);
      \u0275\u0275text(22, "notifications");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 14)(24, "div", 15);
      \u0275\u0275listener("click", function Modules_Template_div_click_24_listener($event) {
        return ctx.showDropdown($event);
      });
      \u0275\u0275elementStart(25, "div", 16);
      \u0275\u0275element(26, "img", 17)(27, "div", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 19)(29, "h4");
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p");
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "mat-icon", 20);
      \u0275\u0275text(34, "expand_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(35, Modules_div_35_Template, 17, 2, "div", 21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "main", 22);
      \u0275\u0275element(37, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(13, _c0, ctx.isSidebarCollapsed));
      \u0275\u0275advance(10);
      \u0275\u0275property("ngForOf", ctx.navData);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.isSidebarCollapsed);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Welcome ", (ctx.currentUser == null ? null : ctx.currentUser.firstname) || "Zyno", " ", (ctx.currentUser == null ? null : ctx.currentUser.lastname) || "User", "!");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Its ", ctx.currentDateTime);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("active", ctx.showList);
      \u0275\u0275advance(2);
      \u0275\u0275property("src", (ctx.currentUser == null ? null : ctx.currentUser.avatar) ? ctx.serverUrl + (ctx.currentUser == null ? null : ctx.currentUser.avatar) : "../../../../assets/image/profile-photo.png", \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2("", ctx.currentUser == null ? null : ctx.currentUser.firstname, " ", ctx.currentUser == null ? null : ctx.currentUser.lastname);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate((ctx.currentUser == null ? null : ctx.currentUser.roleName) || "Administrator");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.showList);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, RouterOutlet, RouterLink, RouterLinkActive, MatIcon], styles: ["\n.app-wrapper[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  height: 100vh;\n  overflow: hidden;\n  transition: grid-template-columns 0.3s ease;\n  position: relative;\n}\n.app-wrapper.sidebar-collapsed[_ngcontent-%COMP%] {\n  grid-template-columns: 0 1fr;\n}\n.header-toggle-btn[_ngcontent-%COMP%] {\n  background: #3a66b0;\n  border: none;\n  color: #0b0b0b;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  margin-right: 15px;\n}\n.header-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.05);\n}\n.header-toggle-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.sidebar[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #090909;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n  transition: transform 0.3s ease, opacity 0.3s ease;\n  width: 250px;\n}\n.sidebar-collapsed[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  transform: translateX(-100%);\n  opacity: 0;\n  pointer-events: none;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 10px;\n  margin-bottom: 10px;\n  background: #fff;\n  position: relative;\n  z-index: 2;\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n}\n.sidebar-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 140px;\n  height: auto;\n}\n.sidebar-toggle-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  border: none;\n  color: #070707;\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  min-width: 32px;\n  min-height: 32px;\n}\n.sidebar-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: #3a66b0;\n  transform: scale(1.05);\n}\n.sidebar-toggle-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding: 0 0px 20px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 2px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.05);\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 10px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.5);\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: #060606;\n  text-decoration: none;\n  padding: 10px 12px;\n  border-radius: 6px;\n  transition: background 0.3s ease;\n  position: relative;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link.activeRoute[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3a66b0 0%,\n      #6c63ff 50%,\n      #8b5cf6 100%);\n  border-left: 3px solid #16484f;\n  color: #fff;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%], \n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .nav-icon-material[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  font-size: 20px;\n  margin-right: 12px;\n  flex-shrink: 0;\n  color: rgba(7, 7, 7, 0.6);\n  transition: color 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-icon-material[_ngcontent-%COMP%], \n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link.activeRoute[_ngcontent-%COMP%]   .nav-icon-material[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .nav-text[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%] {\n  margin-left: auto;\n  border: solid #101010;\n  border-width: 0 2px 2px 0;\n  padding: 4px;\n  transform: rotate(45deg);\n  transition: transform 0.3s ease;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .arrow.open[_ngcontent-%COMP%] {\n  transform: rotate(-135deg);\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%] {\n  display: none;\n  padding-left: 18px;\n  margin-top: 6px;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submenu.open[_ngcontent-%COMP%] {\n  display: block;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: #000000;\n  text-decoration: none;\n  padding: 8px 10px;\n  border-radius: 6px;\n  transition: background 0.3s ease;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]   a.activeRoute[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3a66b0 0%,\n      #6c63ff 50%,\n      #8b5cf6 100%);\n  color: #fff;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%], \n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   .nav-icon-material[_ngcontent-%COMP%] {\n  color: #000;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link.activeRoute[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%], \n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .nav-link.activeRoute[_ngcontent-%COMP%]   .nav-icon-material[_ngcontent-%COMP%], \n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]   a.activeRoute[_ngcontent-%COMP%]   .nav-icon-material[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.sidebar-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .nav-icon-material[_ngcontent-%COMP%] {\n  color: #000;\n}\n.main-area[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n}\n.top-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: #fff;\n  color: #000000;\n  padding: 18px 25px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  z-index: 1;\n  gap: 15px;\n}\n.top-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.top-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n}\n.top-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #3a66b0;\n}\n.top-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  font-size: 13px;\n  color: #3a66b0;\n}\n.top-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  filter: brightness(0) invert(1);\n}\n.top-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  width: 22px;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n.top-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n.profile-trigger[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 6px 12px;\n  border-radius: 16px;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  background: transparent;\n  border: 1px solid transparent;\n}\n.profile-trigger[_ngcontent-%COMP%]:hover, \n.profile-trigger.active[_ngcontent-%COMP%] {\n  background: rgba(58, 102, 176, 0.05);\n  border-color: rgba(58, 102, 176, 0.1);\n}\n.profile-trigger[_ngcontent-%COMP%]:hover   .dropdown-arrow[_ngcontent-%COMP%], \n.profile-trigger.active[_ngcontent-%COMP%]   .dropdown-arrow[_ngcontent-%COMP%] {\n  transform: translateY(2px);\n}\n.profile-trigger[_ngcontent-%COMP%]   .profile-avatar-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.profile-trigger[_ngcontent-%COMP%]   .profile-avatar-container[_ngcontent-%COMP%]   .profile-img[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  object-fit: cover;\n  border: 2px solid #fff;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);\n}\n.profile-trigger[_ngcontent-%COMP%]   .profile-avatar-container[_ngcontent-%COMP%]   .status-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -2px;\n  right: -2px;\n  width: 12px;\n  height: 12px;\n  background: #10b981;\n  border: 2px solid #fff;\n  border-radius: 50%;\n}\n.profile-trigger[_ngcontent-%COMP%]   .profile-meta[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 800;\n  color: #1e293b;\n  line-height: 1.2;\n}\n.profile-trigger[_ngcontent-%COMP%]   .profile-meta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #64748b;\n}\n.profile-trigger[_ngcontent-%COMP%]   .dropdown-arrow[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: #94a3b8;\n  transition: transform 0.3s ease;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 12px);\n  right: 0;\n  width: 240px;\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 20px;\n  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);\n  padding: 8px;\n  z-index: 1000;\n  transform-origin: top right;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-header[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: rgba(0, 0, 0, 0.05);\n  margin: 4px 8px;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 16px;\n  border-radius: 12px;\n  color: #475569;\n  font-size: 13px;\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #94a3b8;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover {\n  background: rgba(58, 102, 176, 0.08);\n  color: #3a66b0;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%] {\n  color: #3a66b0;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item.logout[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item.logout[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #fca5a5;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item.logout[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.dropdown-profile-menu[_ngcontent-%COMP%]   .dropdown-item.logout[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n@keyframes _ngcontent-%COMP%_dropdownPop {\n  from {\n    opacity: 0;\n    transform: translateY(-10px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.content-area[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #f5f5f5;\n  overflow-y: auto;\n}\n.content-area[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 2px;\n}\n.content-area[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #e0e0e0;\n}\n.content-area[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #bdbdbd;\n  border-radius: 10px;\n}\n.content-area[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #9e9e9e;\n}\n@media (max-width: 768px) {\n  .app-wrapper[_ngcontent-%COMP%] {\n    grid-template-columns: 250px 1fr;\n  }\n  .app-wrapper.sidebar-collapsed[_ngcontent-%COMP%] {\n    grid-template-columns: 0 1fr;\n  }\n}\n/*# sourceMappingURL=modules.css.map */"], data: { animation: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px) scale(0.95)" }),
        animate("200ms cubic-bezier(0, 0, 0.2, 1)", style({ opacity: 1, transform: "translateY(0) scale(1)" }))
      ]),
      transition(":leave", [
        animate("150ms cubic-bezier(0.4, 0, 1, 1)", style({ opacity: 0, transform: "translateY(-10px) scale(0.95)" }))
      ])
    ])
  ] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Modules, [{
    type: Component,
    args: [{ selector: "app-modules", standalone: false, animations: [
      trigger("fadeInOut", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px) scale(0.95)" }),
          animate("200ms cubic-bezier(0, 0, 0.2, 1)", style({ opacity: 1, transform: "translateY(0) scale(1)" }))
        ]),
        transition(":leave", [
          animate("150ms cubic-bezier(0.4, 0, 1, 1)", style({ opacity: 0, transform: "translateY(-10px) scale(0.95)" }))
        ])
      ])
    ], template: `<div class="app-wrapper" [ngClass]="{'sidebar-collapsed': isSidebarCollapsed}">\r
\r
    <!-- Sidebar -->\r
    <aside class="sidebar">\r
        <div class="sidebar-header">\r
            <div class="sidebar-logo">\r
                <img src="../../../../assets/image/zyno_construction_logo.png" alt="Logo">\r
            </div>\r
\r
            <!-- Toggle Button Inside Sidebar -->\r
            <button class="sidebar-toggle-btn" (click)="toggleSidebar()" title="Collapse Sidebar">\r
                <mat-icon>keyboard_double_arrow_left</mat-icon>\r
            </button>\r
        </div>\r
\r
        <nav class="sidebar-nav">\r
            <ul>\r
                <li *ngFor="let nav of navData; let i = index">\r
                    <a class="nav-link" routerLinkActive="activeRoute"\r
                        [routerLink]="!nav.subMenu?.length ? nav.path : null" (click)="navToggel(i, nav, $event)"\r
                        [title]="nav.name">\r
\r
                        <mat-icon class="nav-icon-material">{{ nav.icon || 'folder' }}</mat-icon>\r
                        <span class="nav-text">{{ nav.name }}</span>\r
\r
                        <i *ngIf="nav.subMenu?.length" class="arrow" [ngClass]="navIndexvalue == i ? 'open' : ''"></i>\r
                    </a>\r
\r
                    <ul class="submenu" [ngClass]="navIndexvalue == i ? 'open' : ''">\r
                        <li *ngFor="let subNav of nav.subMenu; let j = index">\r
                            <a [routerLink]="subNav.path" routerLinkActive="activeRoute" [title]="subNav.subMenuName">\r
                                <mat-icon class="nav-icon-material">{{ subNav.icon || 'folder' }}</mat-icon>\r
                                <span class="nav-text" style="padding-left: 20px;">{{ subNav.subMenuName || subNav.name\r
                                    }}</span>\r
                            </a>\r
                        </li>\r
                    </ul>\r
                </li>\r
            </ul>\r
        </nav>\r
    </aside>\r
\r
    <!-- Main Area -->\r
    <div class="main-area">\r
\r
        <!-- Header -->\r
        <header class="top-header">\r
            <!-- Toggle Button in Header (visible when sidebar is collapsed) -->\r
            <button class="header-toggle-btn" *ngIf="isSidebarCollapsed" (click)="toggleSidebar()" title="Open Sidebar">\r
                <mat-icon>menu</mat-icon>\r
            </button>\r
\r
            <div class="header-left">\r
                <h3>Welcome {{ currentUser?.firstname || 'Zyno' }} {{ currentUser?.lastname || 'User' }}!</h3>\r
                <p>Its {{currentDateTime}}</p>\r
            </div>\r
\r
            <div class="header-right">\r
                <!-- <img src="../../../../assets/image/notification-icon.png" class="header-icon" alt="Notifications"> -->\r
                <a class="header-icons" style="cursor:pointer;"><mat-icon class="header-icons"\r
                        style="cursor:pointer;">notifications</mat-icon></a>\r
                <!-- Consolidated Profile Trigger -->\r
                <div class="relative">\r
                    <div class="profile-trigger" (click)="showDropdown($event)" [class.active]="showList">\r
                        <div class="profile-avatar-container">\r
                            <img [src]="currentUser?.avatar ? serverUrl + currentUser?.avatar : '../../../../assets/image/profile-photo.png'"\r
                                class="profile-img" alt="User">\r
                            <div class="status-indicator"></div>\r
                        </div>\r
                        <div class="profile-meta hidden md:block">\r
                            <h4>{{ currentUser?.firstname }} {{ currentUser?.lastname }}</h4>\r
                            <p>{{ currentUser?.roleName || 'Administrator' }}</p>\r
                        </div>\r
                        <mat-icon class="dropdown-arrow">expand_more</mat-icon>\r
                    </div>\r
\r
                    <!-- Enhanced Dropdown Menu -->\r
                    <div class="dropdown-profile-menu" *ngIf="showList" @fadeInOut>\r
                        <div class="dropdown-header">\r
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Signed in as\r
                            </p>\r
                            <p class="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{{\r
                                currentUser?.email }}</p>\r
                        </div>\r
                        <div class="dropdown-divider"></div>\r
                        <a (click)="profile()" class="dropdown-item">\r
                            <mat-icon>person_outline</mat-icon>\r
                            <span>My Profile</span>\r
                        </a>\r
                        <a (click)="onLogout()" class="dropdown-item logout">\r
                            <mat-icon>logout</mat-icon>\r
                            <span>Sign Out</span>\r
                        </a>\r
                    </div>\r
                </div>\r
            </div>\r
        </header>\r
\r
        <!-- Content -->\r
        <main class="flex-1 overflow-y-auto blueprint-grid p-4">\r
            <router-outlet></router-outlet>\r
        </main>\r
\r
    </div>\r
</div>`, styles: ["/* src/app/modules/modules.scss */\n.app-wrapper {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  height: 100vh;\n  overflow: hidden;\n  transition: grid-template-columns 0.3s ease;\n  position: relative;\n}\n.app-wrapper.sidebar-collapsed {\n  grid-template-columns: 0 1fr;\n}\n.header-toggle-btn {\n  background: #3a66b0;\n  border: none;\n  color: #0b0b0b;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  margin-right: 15px;\n}\n.header-toggle-btn:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.05);\n}\n.header-toggle-btn mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.sidebar {\n  background: #fff;\n  color: #090909;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n  transition: transform 0.3s ease, opacity 0.3s ease;\n  width: 250px;\n}\n.sidebar-collapsed .sidebar {\n  transform: translateX(-100%);\n  opacity: 0;\n  pointer-events: none;\n}\n.sidebar-header {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 10px;\n  margin-bottom: 10px;\n  background: #fff;\n  position: relative;\n  z-index: 2;\n}\n.sidebar-logo {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #fff;\n}\n.sidebar-logo img {\n  width: 140px;\n  height: auto;\n}\n.sidebar-toggle-btn {\n  background: rgba(255, 255, 255, 0.1);\n  border: none;\n  color: #070707;\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  min-width: 32px;\n  min-height: 32px;\n}\n.sidebar-toggle-btn:hover {\n  background: #3a66b0;\n  transform: scale(1.05);\n}\n.sidebar-toggle-btn mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.sidebar-nav {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding: 0 0px 20px;\n}\n.sidebar-nav::-webkit-scrollbar {\n  width: 2px;\n}\n.sidebar-nav::-webkit-scrollbar-track {\n  background: rgba(255, 255, 255, 0.05);\n}\n.sidebar-nav::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 10px;\n}\n.sidebar-nav::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.5);\n}\n.sidebar-nav ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.sidebar-nav ul li {\n  margin-bottom: 10px;\n}\n.sidebar-nav ul li .nav-link {\n  display: flex;\n  align-items: center;\n  color: #060606;\n  text-decoration: none;\n  padding: 10px 12px;\n  border-radius: 6px;\n  transition: background 0.3s ease;\n  position: relative;\n}\n.sidebar-nav ul li .nav-link:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n.sidebar-nav ul li .nav-link.activeRoute {\n  background:\n    linear-gradient(\n      135deg,\n      #3a66b0 0%,\n      #6c63ff 50%,\n      #8b5cf6 100%);\n  border-left: 3px solid #16484f;\n  color: #fff;\n}\n.sidebar-nav ul li .nav-link .nav-icon,\n.sidebar-nav ul li .nav-link .nav-icon-material {\n  width: 20px;\n  height: 20px;\n  font-size: 20px;\n  margin-right: 12px;\n  flex-shrink: 0;\n  color: rgba(7, 7, 7, 0.6);\n  transition: color 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sidebar-nav ul li .nav-icon-material,\n.sidebar-nav ul li .nav-link.activeRoute .nav-icon-material {\n  color: #fff;\n}\n.sidebar-nav ul li .nav-link .nav-text {\n  white-space: nowrap;\n  overflow: hidden;\n}\n.sidebar-nav ul li .nav-link .arrow {\n  margin-left: auto;\n  border: solid #101010;\n  border-width: 0 2px 2px 0;\n  padding: 4px;\n  transform: rotate(45deg);\n  transition: transform 0.3s ease;\n}\n.sidebar-nav ul li .nav-link .arrow.open {\n  transform: rotate(-135deg);\n}\n.sidebar-nav ul li .submenu {\n  display: none;\n  padding-left: 18px;\n  margin-top: 6px;\n}\n.sidebar-nav ul li .submenu.open {\n  display: block;\n}\n.sidebar-nav ul li .submenu a {\n  display: flex;\n  align-items: center;\n  color: #000000;\n  text-decoration: none;\n  padding: 8px 10px;\n  border-radius: 6px;\n  transition: background 0.3s ease;\n}\n.sidebar-nav ul li .submenu a:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n.sidebar-nav ul li .submenu a.activeRoute {\n  background:\n    linear-gradient(\n      135deg,\n      #3a66b0 0%,\n      #6c63ff 50%,\n      #8b5cf6 100%);\n  color: #fff;\n}\n.sidebar-nav ul li .nav-link .nav-icon,\n.sidebar-nav ul li .nav-link .nav-icon-material {\n  color: #000;\n}\n.sidebar-nav ul li .nav-link.activeRoute .nav-icon,\n.sidebar-nav ul li .nav-link.activeRoute .nav-icon-material,\n.sidebar-nav ul li .submenu a.activeRoute .nav-icon-material {\n  color: #fff;\n}\n.sidebar-nav ul li .submenu a .nav-icon-material {\n  color: #000;\n}\n.main-area {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n}\n.top-header {\n  flex-shrink: 0;\n  background: #fff;\n  color: #000000;\n  padding: 18px 25px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  z-index: 1;\n  gap: 15px;\n}\n.top-header .header-left {\n  flex: 1;\n}\n.top-header .header-left h3 {\n  margin: 0;\n  font-size: 22px;\n}\n.top-header .header-left h3 span {\n  color: #3a66b0;\n}\n.top-header .header-left p {\n  margin: 5px 0 0;\n  font-size: 13px;\n  color: #3a66b0;\n}\n.top-header .header-right {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.header-icon {\n  filter: brightness(0) invert(1);\n}\n.top-header .header-right .header-icon {\n  width: 22px;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n.top-header .header-right .header-icon:hover {\n  transform: scale(1.1);\n}\n.profile-trigger {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 6px 12px;\n  border-radius: 16px;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  background: transparent;\n  border: 1px solid transparent;\n}\n.profile-trigger:hover,\n.profile-trigger.active {\n  background: rgba(58, 102, 176, 0.05);\n  border-color: rgba(58, 102, 176, 0.1);\n}\n.profile-trigger:hover .dropdown-arrow,\n.profile-trigger.active .dropdown-arrow {\n  transform: translateY(2px);\n}\n.profile-trigger .profile-avatar-container {\n  position: relative;\n}\n.profile-trigger .profile-avatar-container .profile-img {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  object-fit: cover;\n  border: 2px solid #fff;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);\n}\n.profile-trigger .profile-avatar-container .status-indicator {\n  position: absolute;\n  bottom: -2px;\n  right: -2px;\n  width: 12px;\n  height: 12px;\n  background: #10b981;\n  border: 2px solid #fff;\n  border-radius: 50%;\n}\n.profile-trigger .profile-meta h4 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 800;\n  color: #1e293b;\n  line-height: 1.2;\n}\n.profile-trigger .profile-meta p {\n  margin: 2px 0 0;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #64748b;\n}\n.profile-trigger .dropdown-arrow {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: #94a3b8;\n  transition: transform 0.3s ease;\n}\n.dropdown-profile-menu {\n  position: absolute;\n  top: calc(100% + 12px);\n  right: 0;\n  width: 240px;\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 20px;\n  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);\n  padding: 8px;\n  z-index: 1000;\n  transform-origin: top right;\n}\n.dropdown-profile-menu .dropdown-header {\n  padding: 12px 16px;\n}\n.dropdown-profile-menu .dropdown-divider {\n  height: 1px;\n  background: rgba(0, 0, 0, 0.05);\n  margin: 4px 8px;\n}\n.dropdown-profile-menu .dropdown-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 16px;\n  border-radius: 12px;\n  color: #475569;\n  font-size: 13px;\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.dropdown-profile-menu .dropdown-item mat-icon {\n  font-size: 20px;\n  color: #94a3b8;\n}\n.dropdown-profile-menu .dropdown-item:hover {\n  background: rgba(58, 102, 176, 0.08);\n  color: #3a66b0;\n}\n.dropdown-profile-menu .dropdown-item:hover mat-icon {\n  color: #3a66b0;\n}\n.dropdown-profile-menu .dropdown-item.logout {\n  color: #ef4444;\n}\n.dropdown-profile-menu .dropdown-item.logout mat-icon {\n  color: #fca5a5;\n}\n.dropdown-profile-menu .dropdown-item.logout:hover {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.dropdown-profile-menu .dropdown-item.logout:hover mat-icon {\n  color: #dc2626;\n}\n@keyframes dropdownPop {\n  from {\n    opacity: 0;\n    transform: translateY(-10px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.content-area {\n  flex: 1;\n  background: #f5f5f5;\n  overflow-y: auto;\n}\n.content-area::-webkit-scrollbar {\n  width: 2px;\n}\n.content-area::-webkit-scrollbar-track {\n  background: #e0e0e0;\n}\n.content-area::-webkit-scrollbar-thumb {\n  background: #bdbdbd;\n  border-radius: 10px;\n}\n.content-area::-webkit-scrollbar-thumb:hover {\n  background: #9e9e9e;\n}\n@media (max-width: 768px) {\n  .app-wrapper {\n    grid-template-columns: 250px 1fr;\n  }\n  .app-wrapper.sidebar-collapsed {\n    grid-template-columns: 0 1fr;\n  }\n}\n/*# sourceMappingURL=modules.css.map */\n"] }]
  }], () => [{ type: ChangeDetectorRef }, { type: Router }, { type: AuthService }, { type: SidebarService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Modules, { className: "Modules", filePath: "app/modules/modules.ts", lineNumber: 29 });
})();

// src/app/modules/modules-routing-module.ts
var routes = [
  {
    path: "",
    component: Modules,
    children: [
      {
        path: "team-management",
        loadChildren: () => import("./chunk-I6OUITXU.js").then((m) => m.UsersModule)
      },
      {
        path: "dashboard",
        loadChildren: () => import("./chunk-EELJIBUT.js").then((m) => m.DashboardModule)
      },
      {
        path: "menu-management",
        loadChildren: () => import("./chunk-SCVDHZ4Z.js").then((m) => m.MenuManagementModule)
      },
      {
        path: "company-management",
        loadChildren: () => import("./chunk-ZUA3RLBL.js").then((m) => m.CompanyManagementModule)
      },
      {
        path: "projects",
        loadChildren: () => import("./chunk-FHM6IDWT.js").then((m) => m.ProjectsModule)
      },
      { path: "tasks", loadChildren: () => import("./chunk-EHEKTXOY.js").then((m) => m.TasksModule) },
      {
        path: "calendar",
        loadChildren: () => import("./chunk-4GWLGOGH.js").then((m) => m.CalendarModule)
      },
      {
        path: "timeline",
        loadChildren: () => import("./chunk-KVU33QSG.js").then((m) => m.TimelineModule)
      },
      {
        path: "stock-approval",
        loadChildren: () => import("./chunk-TJOTKS64.js").then((m) => m.StockApprovalModule)
      },
      {
        path: "resources",
        loadChildren: () => import("./chunk-BNCTSQMQ.js").then((m) => m.ResourcesModule)
      },
      {
        path: "masters",
        loadChildren: () => import("./chunk-D4YCI3DL.js").then((m) => m.MasterModule)
      },
      // { path: 'resources/vendors/:projectId', loadChildren: () => import('./vendors/vendors-module').then(m => m.VendorsModule) },
      { path: "resources/vendors", loadChildren: () => import("./chunk-S6QME5EK.js").then((m) => m.VendorsModule) },
      { path: "profile", loadChildren: () => import("./chunk-Q6LPMZ2R.js").then((m) => m.ProfileModule) },
      { path: "analytics", loadChildren: () => import("./chunk-3PUEQFVN.js").then((m) => m.AnalyticsModule) }
    ]
  }
];
var ModulesRoutingModule = class _ModulesRoutingModule {
  static \u0275fac = function ModulesRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ModulesRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ModulesRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModulesRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/modules-module.ts
var ModulesModule = class _ModulesModule {
  static \u0275fac = function ModulesModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ModulesModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ModulesModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, ModulesRoutingModule, RouterModule, MaterialModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModulesModule, [{
    type: NgModule,
    args: [{
      declarations: [Modules],
      imports: [CommonModule, ModulesRoutingModule, RouterModule, MaterialModule]
    }]
  }], null, null);
})();
export {
  ModulesModule
};
//# sourceMappingURL=chunk-22EQ6YQU.js.map
