import {
  environment
} from "./chunk-M3DYL5PG.js";
import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  map,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-F27QM527.js";

// src/app/modules/vendors/services/vendors-services.ts
var STATUS_MAP = {
  active: { color: "bg-green-100 text-green-700", label: "Active" },
  pending: { color: "bg-amber-100 text-amber-700", label: "Pending" },
  inactive: { color: "bg-red-100 text-red-600", label: "Inactive" }
};
var ICON_MAP = {
  invoice: { material: "receipt_long", color: "text-secondary" },
  cert: { material: "task_alt", color: "text-primary" },
  assign: { material: "domain_add", color: "text-on-tertiary-fixed-variant" }
};
var VendorsServices = class _VendorsServices {
  http;
  vendorUrl = `${environment.serverUrl}/api/v1/vendors`;
  activityUrl = `${environment.serverUrl}/api/v1/activities`;
  vendorsSubject = new BehaviorSubject([]);
  statsSubject = new BehaviorSubject({ totalActive: 0, pendingPayments: "\u20B90", compliantPartners: "0%" });
  activitiesSubject = new BehaviorSubject([]);
  loadingSubject = new BehaviorSubject(false);
  vendors$ = this.vendorsSubject.asObservable();
  stats$ = this.statsSubject.asObservable();
  activities$ = this.activitiesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  constructor(http) {
    this.http = http;
    this.loadAll();
  }
  parseContractFiles(raw) {
    if (!raw)
      return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed))
        return parsed.map((p) => `${environment.serverUrl}${p}`);
      return [`${environment.serverUrl}${parsed}`];
    } catch {
      return [`${environment.serverUrl}${raw}`];
    }
  }
  mapVendor(b) {
    const s = STATUS_MAP[b.status] ?? STATUS_MAP["pending"];
    const formatBudget = (n) => {
      if (!n)
        return "\u20B90";
      if (n >= 1e7)
        return `\u20B9${(n / 1e7).toFixed(1)}Cr`;
      if (n >= 1e5)
        return `\u20B9${(n / 1e5).toFixed(1)}L`;
      if (n >= 1e3)
        return `\u20B9${(n / 1e3).toFixed(1)}k`;
      return `\u20B9${n}`;
    };
    const parseSkill = () => {
      try {
        if (Array.isArray(b.skill)) {
          return b.skill.flatMap((s2) => {
            if (typeof s2 === "string" && s2.startsWith("[")) {
              return JSON.parse(s2).map((x) => x.replace(/['"]/g, "").trim());
            }
            return [s2.replace(/['"]/g, "").trim()];
          });
        }
        if (typeof b.skill === "string") {
          if (b.skill.startsWith("[")) {
            return JSON.parse(b.skill).map((x) => x.replace(/['"]/g, "").trim());
          }
          return b.skill.split(",").map((s2) => s2.replace(/['"]/g, "").trim()).filter(Boolean);
        }
        return [];
      } catch {
        return [];
      }
    };
    return {
      company_id: b.company_id,
      id: b.id,
      project_id: b.project_id ?? null,
      name: b.name,
      type: "Subcontractor",
      email: b.official_email,
      phone: b.official_phone,
      spoc: { name: b.spoc_name, role: "SPOC", phone: b.spoc_phone, email: b.official_email },
      kyc: { gst: b.gst_no, pan: b.pan_card_no },
      address: { street: b.physical_address, city: "", pincode: b.pincode },
      projects: [],
      balance: "\u20B90.00",
      budget: formatBudget(b.budget_allocation),
      budget_allocation: b.budget_allocation ?? 0,
      status: s.label,
      statusColor: s.color,
      icon: "business",
      assignee: "All Members",
      skill: parseSkill(),
      compliance_score: b.compliance_score,
      contract_files: this.parseContractFiles(b.contract_file),
      tasks: [],
      audits: [],
      invoices: []
    };
  }
  mapActivity(a) {
    const { material, color } = ICON_MAP[a.icon] ?? { material: "info", color: "text-outline" };
    return {
      id: a.id,
      icon: material,
      iconColor: color,
      title: a.title,
      desc: a.description,
      time: a.time ?? a.time_label
    };
  }
  loadAll() {
    this.loadVendors();
    this.loadStats();
    this.loadActivities();
  }
  loadVendors() {
    this.http.get(this.vendorUrl).subscribe({
      next: (res) => {
        if (res.success)
          this.vendorsSubject.next(res.data.map((v) => this.mapVendor(v)));
      },
      error: (err) => console.error("[loadVendors]", err)
    });
  }
  loadStats() {
    this.http.get(`${this.vendorUrl}/stats`).subscribe({
      next: (res) => {
        if (res.success)
          this.statsSubject.next(res.data);
      },
      error: (err) => console.error("[loadStats]", err)
    });
  }
  loadActivities(limit = 20) {
    this.http.get(`${this.activityUrl}?limit=${limit}`).subscribe({
      next: (res) => {
        if (res.success)
          this.activitiesSubject.next(res.data.map((a) => this.mapActivity(a)));
      },
      error: (err) => console.error("[loadActivities]", err)
    });
  }
  createVendor(formData) {
    return this.http.post(this.vendorUrl, formData).pipe(tap((res) => {
      if (res.success) {
        this.vendorsSubject.next([this.mapVendor(res.data), ...this.vendorsSubject.value]);
        this.loadStats();
        this.loadActivities();
      }
    }));
  }
  updateVendor(id, body) {
    const isFormData = body instanceof FormData;
    const request$ = isFormData ? this.http.put(`${this.vendorUrl}/${id}`, body) : this.http.put(`${this.vendorUrl}/${id}`, body);
    return request$.pipe(tap((res) => {
      if (res.success) {
        const list = this.vendorsSubject.value;
        const idx = list.findIndex((v) => v.id === id);
        if (idx !== -1) {
          list[idx] = this.mapVendor(res.data);
          this.vendorsSubject.next([...list]);
        }
        this.loadStats();
      }
    }));
  }
  deleteVendor(id) {
    return this.http.delete(`${this.vendorUrl}/${id}`).pipe(tap(() => {
      this.vendorsSubject.next(this.vendorsSubject.value.filter((v) => v.id !== id));
      this.loadStats();
    }));
  }
  getVendorByIdFromApi(id) {
    return this.http.get(`${this.vendorUrl}/${id}`).pipe(map((res) => this.mapVendor(res.data)));
  }
  getVendorById(id) {
    return this.vendorsSubject.value.find((v) => v.id === id);
  }
  getVendors() {
    return this.vendorsSubject.value;
  }
  static \u0275fac = function VendorsServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorsServices)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VendorsServices, factory: _VendorsServices.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorsServices, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  VendorsServices
};
//# sourceMappingURL=chunk-PVCBN2NP.js.map
