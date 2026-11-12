import {
  environment
} from "./chunk-A27VMC3V.js";
import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  catchError,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-23RKHPSU.js";

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

export {
  MaterialService
};
//# sourceMappingURL=chunk-7UB2JTFJ.js.map
