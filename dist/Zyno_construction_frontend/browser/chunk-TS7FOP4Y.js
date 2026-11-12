import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable
} from "./chunk-23RKHPSU.js";

// src/app/modules/master/skill-master/skill-master-services.ts
var SkillMasterServices = class _SkillMasterServices {
  http = inject(HttpClient);
  baseUrl = `${environment.serverUrl}/api/v1/skill`;
  // Observable Data
  skillsSubject = new BehaviorSubject([]);
  skills$ = this.skillsSubject.asObservable();
  // =========================
  // GET ALL SKILLS
  // =========================
  loadSkills() {
    return this.http.get(`${this.baseUrl}/list`).pipe(tap((res) => {
      const skills = res?.data || [];
      this.skillsSubject.next(skills);
    }));
  }
  // =========================
  // CREATE SKILL
  // =========================
  addSkill(data) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }
  // =========================
  // UPDATE SKILL
  // =========================
  updateSkill(id, data) {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }
  // =========================
  // DELETE SKILL
  // =========================
  deleteSkill(id) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  static \u0275fac = function SkillMasterServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkillMasterServices)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SkillMasterServices, factory: _SkillMasterServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkillMasterServices, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  SkillMasterServices
};
//# sourceMappingURL=chunk-TS7FOP4Y.js.map
