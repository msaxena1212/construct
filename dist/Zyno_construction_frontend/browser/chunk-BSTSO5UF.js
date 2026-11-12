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

export {
  EquipmentInventoryService
};
//# sourceMappingURL=chunk-BSTSO5UF.js.map
