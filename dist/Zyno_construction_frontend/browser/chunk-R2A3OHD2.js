import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  __decorate,
  catchError,
  inject,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-F27QM527.js";

// src/app/shared/services/master/material-master.ts
var MaterialMasterService = class MaterialMasterService2 {
  http;
  baseUrl = `${environment.serverUrl}/api/v1`;
  getAllMaterial_Master = `${this.baseUrl}/getAllMaterial_Master`;
  createMaterial_Master = `${this.baseUrl}/createMaterial_Master`;
  updateMaterial_Master = `${this.baseUrl}/updateMaterial_Master`;
  deleteMaterial_Master = `${this.baseUrl}/deleteMaterial_Master`;
  getMaterial_MasterById = `${this.baseUrl}/getMaterial_MasterById`;
  materialsSubject = new BehaviorSubject([]);
  materials$ = this.materialsSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadMaterials() {
    this.http.get(this.getAllMaterial_Master).subscribe({
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
    return this.http.post(this.createMaterial_Master, material).pipe(tap((res) => {
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
    return this.http.put(`${this.updateMaterial_Master}/${id}`, data);
  }
  // DELETE
  deleteMaterial(id) {
    return this.http.delete(`${this.deleteMaterial_Master}/${id}`);
  }
  getMaterialBySku(sku) {
    return this.materialsSubject.value.find((m) => m.sku === sku);
  }
  getMaterialMasterById(id) {
    return this.http.get(`${this.getMaterial_MasterById}/${id}`);
  }
  static \u0275fac = function MaterialMasterService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || MaterialMasterService2)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: MaterialMasterService2, factory: MaterialMasterService2.\u0275fac, providedIn: "root" });
};
MaterialMasterService = __decorate([
  Injectable({
    providedIn: "root"
  })
], MaterialMasterService);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaterialMasterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }, {
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/shared/services/master/category-serveice.ts
var CategoryServeice = class _CategoryServeice {
  http = inject(HttpClient);
  baseUrl = `${environment.serverUrl}/api/v1`;
  // Observable Data
  categoriesSubject = new BehaviorSubject([]);
  categories$ = this.categoriesSubject.asObservable();
  // =========================
  // GET ALL CATEGORIES
  // =========================
  loadCategories() {
    return this.http.get(`${this.baseUrl}/getAllCategory`).pipe(tap((res) => {
      const categories = res?.data || [];
      this.categoriesSubject.next(categories);
    }));
  }
  // =========================
  // CREATE CATEGORY
  // =========================
  addCategory(data) {
    return this.http.post(`${this.baseUrl}/createCategory`, data);
  }
  // =========================
  // UPDATE CATEGORY
  // =========================
  updateCategory(id, data) {
    return this.http.put(`${this.baseUrl}/updateCategory/${id}`, data);
  }
  // =========================
  // DELETE CATEGORY
  // =========================
  deleteCategory(id) {
    return this.http.delete(`${this.baseUrl}/deleteCategory/${id}`);
  }
  static \u0275fac = function CategoryServeice_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryServeice)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CategoryServeice, factory: _CategoryServeice.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryServeice, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/shared/services/master/equipment.ts
var Equipment = class _Equipment {
  http;
  baseUrl = `${environment.serverUrl}/api/v1`;
  getAllMaterial_Master = `${this.baseUrl}/getAllequipment_Master`;
  createMaterial_Master = `${this.baseUrl}/createequipment_Master`;
  updateMaterial_Master = `${this.baseUrl}/updateequipment_Master`;
  deleteMaterial_Master = `${this.baseUrl}/deleteequipment_Master`;
  getMaterial_MasterById = `${this.baseUrl}/getequipment_MasterById`;
  materialsSubject = new BehaviorSubject([]);
  materials$ = this.materialsSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  loadMaterials() {
    this.http.get(this.getAllMaterial_Master).subscribe({
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
    return this.http.post(this.createMaterial_Master, material).pipe(tap((res) => {
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
    return this.http.put(`${this.updateMaterial_Master}/${id}`, data);
  }
  // DELETE
  deleteMaterial(id) {
    return this.http.delete(`${this.deleteMaterial_Master}/${id}`);
  }
  getMaterialBySku(sku) {
    return this.materialsSubject.value.find((m) => m.sku === sku);
  }
  getMaterialMasterById(id) {
    return this.http.get(`${this.getMaterial_MasterById}/${id}`);
  }
  static \u0275fac = function Equipment_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Equipment)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _Equipment, factory: _Equipment.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Equipment, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  MaterialMasterService,
  CategoryServeice,
  Equipment
};
//# sourceMappingURL=chunk-R2A3OHD2.js.map
