import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-23RKHPSU.js";

// src/app/modules/users/user-list/services/team.service.ts
var TeamService = class _TeamService {
  http;
  baseUrl = environment.serverUrl + "/api/v1";
  constructor(http) {
    this.http = http;
  }
  getTeamMembers() {
    return this.http.get(`${this.baseUrl}/team`);
  }
  inviteUser(data) {
    return this.http.post(`${this.baseUrl}/invite`, data);
  }
  toggleStatus(id, isActive) {
    return this.http.put(`${this.baseUrl}/team/${id}/status`, { isActive });
  }
  updateUser(id, formData) {
    return this.http.put(`${this.baseUrl}/team/${id}`, formData);
  }
  getRoles() {
    return this.http.get(`${this.baseUrl}/roles`);
  }
  static \u0275fac = function TeamService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeamService, factory: _TeamService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeamService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  TeamService
};
//# sourceMappingURL=chunk-RJ7DGS3L.js.map
