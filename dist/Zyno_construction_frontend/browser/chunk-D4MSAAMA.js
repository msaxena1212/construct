import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  Router,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-F27QM527.js";

// src/app/shared/services/auth/auth.ts
var databaseKey = environment.serverUrl;
var routes = {
  auth: {
    login: () => `${databaseKey}/api/auth/signin`,
    register: () => `${databaseKey}/api/v1/register-company`
  }
};
var AuthService = class _AuthService {
  http;
  route;
  userS = new BehaviorSubject(null);
  LS_KEY = "auth_user";
  constructor(http, route) {
    this.http = http;
    this.route = route;
    this.userS.next(this.getAuthUser());
  }
  getAuthUser() {
    const data = localStorage.getItem(this.LS_KEY);
    if (!data)
      return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  getToken() {
    const user = this.getAuthUser();
    return user ? user.accessToken : null;
  }
  signIn(data) {
    return this.http.post(routes.auth.login(), data).pipe(tap((res) => {
      if (res.accessToken) {
        this.authenticationUser(res.id, res.email, res.name, res.firstname, res.lastname, res.roleName, res.role_id, res.accessToken, res.company_id, res.avatar);
      }
    }));
  }
  register(data) {
    return this.http.post(routes.auth.register(), data).pipe(tap((res) => {
      if (res.accessToken && res.data) {
        this.authenticationUser(res.data.id, res.data.email, res.data.name, res.data.firstname, res.data.lastname, res.data.roleName, res.data.role_id, res.accessToken, res.data.company_id, res.data.avatar);
      }
    }));
  }
  logout() {
    this.userS.next(null);
    localStorage.removeItem(this.LS_KEY);
    this.route.navigate([""]);
  }
  authenticationUser(id, email, name, firstname, lastname, roleName, roleId, accessToken, company_id, avatar) {
    const userS = {
      id,
      email,
      name,
      firstname,
      lastname,
      roleName,
      roleId,
      accessToken,
      company_id,
      avatar
    };
    this.userS.next(userS);
    localStorage.setItem(this.LS_KEY, JSON.stringify(userS));
    return userS;
  }
  updateProfile(formData) {
    return this.http.put(`${databaseKey}/api/v1/profile`, formData).pipe(tap((res) => {
      if (res.data) {
        const currentUser = this.getAuthUser();
        if (currentUser) {
          this.authenticationUser(res.data.id, res.data.email, res.data.name || currentUser.name, res.data.firstname, res.data.lastname, currentUser.roleName, currentUser.roleId, currentUser.accessToken, res.data.company_id, res.data.avatar);
        }
      }
    }));
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-D4MSAAMA.js.map
