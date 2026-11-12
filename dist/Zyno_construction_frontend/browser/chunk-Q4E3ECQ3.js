import {
  CommonModule,
  Component,
  NgModule,
  RouterModule,
  RouterOutlet,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement
} from "./chunk-23RKHPSU.js";

// src/app/modules/users/users.ts
var Users = class _Users {
  static \u0275fac = function Users_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Users)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Users, selectors: [["app-users"]], standalone: false, decls: 1, vars: 0, template: function Users_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], styles: ["\n.router[_ngcontent-%COMP%] {\n  padding: 10px;\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 auto;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n[_ngcontent-%COMP%]::-moz-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #fff;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #cbc8c8;\n  border-radius: 10px;\n}\n/*# sourceMappingURL=users.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Users, [{
    type: Component,
    args: [{ selector: "app-users", standalone: false, template: "<router-outlet></router-outlet>", styles: ["/* src/app/modules/users/users.scss */\n.router {\n  padding: 10px;\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 auto;\n}\n::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n::-moz-scrollbar {\n  width: 5px;\n  height: 5px;\n}\n::-webkit-scrollbar-track {\n  background: #fff;\n}\n::-webkit-scrollbar-thumb {\n  background-color: #cbc8c8;\n  border-radius: 10px;\n}\n/*# sourceMappingURL=users.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Users, { className: "Users", filePath: "app/modules/users/users.ts", lineNumber: 9 });
})();

// src/app/modules/users/users-routing-module.ts
var routes = [
  {
    path: "",
    component: Users,
    children: [
      {
        path: "team-list",
        loadChildren: () => import("./chunk-ZBUZAU36.js").then((m) => m.UserListModule)
      },
      { path: "role-master", loadChildren: () => import("./chunk-HN7GZVSZ.js").then((m) => m.RoleManagementModule) }
    ]
  }
];
var UsersRoutingModule = class _UsersRoutingModule {
  static \u0275fac = function UsersRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UsersRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/modules/users/users-module.ts
var UsersModule = class _UsersModule {
  static \u0275fac = function UsersModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UsersModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersModule, [{
    type: NgModule,
    args: [{
      declarations: [
        Users
      ],
      imports: [
        CommonModule,
        UsersRoutingModule,
        RouterModule
      ]
    }]
  }], null, null);
})();
export {
  UsersModule
};
//# sourceMappingURL=chunk-Q4E3ECQ3.js.map
