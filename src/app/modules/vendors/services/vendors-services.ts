import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface BackendVendor {
  id: string;
  project_id: number | null;
  project_ids: number[] | string | null;
  company_id: string;
  name: string;
  spoc_name: string;
  spoc_phone: string;
  official_email: string;
  official_phone: string;
  gst_no: string;
  pan_card_no: string;
  physical_address: string;
  pincode: string;
  budget_allocation: number;
  skill: string[] | string;
  contract_file: string | null;
  status: 'active' | 'pending' | 'inactive';
  compliance_score: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
}

export interface VendorStats {
  totalActive: number;
  pendingPayments: number;
  compliantPartners: string;
}

export interface Activity {
  id: number;
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
  time: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  number: string;
  amount: number;
  status: string;
  date: string;
  items: InvoiceItem[];
  taxAmount: number;
  taxRate: number;
  subtotal: number;
}

export interface Vendor {
  company_id: any;
  project_id: number | null;
  project_ids: number[];
  id: string;
  name: string;
  created_at?: string;
  type: string;
  email: string;
  phone: string;
  spoc: { name: string; role: string; phone: string; email: string };
  kyc: { gst: string; pan: string };
  address: { street: string; city: string; pincode: string };
  projects: string[];
  balance: string;
  budget: string;
  budget_allocation: number;
  status: string;
  statusColor: string;
  icon: string;
  assignee: string;
  skill: string[];
  compliance_score: number;
  contract_files: string[];
  tasks: { title: string; status: string; date: string }[];
  audits: { date: string; score: number; notes: string }[];
  invoices: Invoice[];
}

const STATUS_MAP: Record<string, { color: string; label: string }> = {
  active: { color: 'bg-green-100 text-green-700', label: 'Active' },
  pending: { color: 'bg-amber-100 text-amber-700', label: 'Pending' },
  inactive: { color: 'bg-red-100 text-red-600', label: 'Inactive' },
};

const ICON_MAP: Record<string, { material: string; color: string }> = {
  invoice: { material: 'receipt_long', color: 'text-secondary' },
  cert: { material: 'task_alt', color: 'text-primary' },
  assign: { material: 'domain_add', color: 'text-on-tertiary-fixed-variant' },
};

@Injectable({ providedIn: 'root' })
export class VendorsServices {
  private readonly vendorUrl = `${environment.serverUrl}/api/v1/vendors`;
  private readonly activityUrl = `${environment.serverUrl}/api/v1/activities`;

  private vendorsSubject = new BehaviorSubject<Vendor[]>([]);
  private statsSubject = new BehaviorSubject<VendorStats>({ totalActive: 0, pendingPayments: 0, compliantPartners: '0%' });
  private activitiesSubject = new BehaviorSubject<Activity[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  vendors$ = this.vendorsSubject.asObservable();
  stats$ = this.statsSubject.asObservable();
  activities$ = this.activitiesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAll();
  }

  private parseContractFiles(raw: string | null): string[] {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(p => `${environment.serverUrl}${p}`);
      return [`${environment.serverUrl}${parsed}`];
    } catch {
      return [`${environment.serverUrl}${raw}`];
    }
  }


  private parseProjectIds(raw: number[] | string | null | undefined, fallbackProjectId: number | null): number[] {
    if (Array.isArray(raw)) {
      return raw.map(Number).filter((v) => !isNaN(v));
    }
    if (typeof raw === 'string' && raw.trim() !== '') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.map(Number).filter((v) => !isNaN(v));
      } catch {
        return raw.split(',').map((v) => Number(v.trim())).filter((v) => !isNaN(v));
      }
    }
    return fallbackProjectId ? [Number(fallbackProjectId)] : [];
  }

  private mapVendor(b: BackendVendor): Vendor {
    const s = STATUS_MAP[b.status] ?? STATUS_MAP['pending'];

    const formatBudget = (n: number): string => {
      if (!n) return '₹0';
      if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(1)}Cr`;
      if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)}L`;
      if (n >= 1_000) return `₹${(n / 1_000).toFixed(1)}k`;
      return `₹${n}`;
    };

    const parseSkill = (): string[] => {
      try {
        if (Array.isArray(b.skill)) {
          return b.skill.flatMap((s: any) => {
            if (typeof s === 'string' && s.startsWith('[')) {
              return JSON.parse(s).map((x: string) => x.replace(/['"]/g, '').trim());
            }
            return [s.replace(/['"]/g, '').trim()];
          });
        }
        if (typeof b.skill === 'string') {
          if (b.skill.startsWith('[')) {
            return JSON.parse(b.skill).map((x: string) => x.replace(/['"]/g, '').trim());
          }
          return b.skill.split(',').map((s: string) => s.replace(/['"]/g, '').trim()).filter(Boolean);
        }
        return [];
      } catch { return []; }
    };

    return {
      company_id: b.company_id,
      id: b.id,
      project_id: b.project_id ?? null,
      project_ids: this.parseProjectIds(b.project_ids, b.project_id), // 🔁 updated to use helper
      name: b.name,
      type: 'Subcontractor',
      created_at: b.createdAt,
      email: b.official_email,
      phone: b.official_phone,
      spoc: { name: b.spoc_name, role: 'SPOC', phone: b.spoc_phone, email: b.official_email },
      kyc: { gst: b.gst_no, pan: b.pan_card_no },
      address: { street: b.physical_address, city: '', pincode: b.pincode },
      projects: [],
      balance: '₹0.00',
      budget: formatBudget(b.budget_allocation),
      budget_allocation: b.budget_allocation ?? 0,
      status: s.label,
      statusColor: s.color,
      icon: 'business',
      assignee: 'All Members',
      skill: parseSkill(),
      compliance_score: b.compliance_score,
      contract_files: this.parseContractFiles(b.contract_file),
      tasks: [],
      audits: [],
      invoices: [],
    };
  }

  private mapActivity(a: any): Activity {
    const { material, color } = ICON_MAP[a.icon] ?? { material: 'info', color: 'text-outline' };
    return {
      id: a.id,
      icon: material,
      iconColor: color,
      title: a.title,
      desc: a.description,
      time: a.time ?? a.time_label,
    };
  }

  loadAll(): void {
    this.loadVendors();
    this.loadStats();
    this.loadActivities();
  }

  loadVendors(): void {
    this.http.get<ApiListResponse<BackendVendor>>(this.vendorUrl).subscribe({
      next: (res) => { if (res.success) this.vendorsSubject.next(res.data.map(v => this.mapVendor(v))); },
      error: (err) => console.error('[loadVendors]', err),
    });
  }

  loadStats(): void {
    this.http.get<ApiSingleResponse<VendorStats>>(`${this.vendorUrl}/stats`).subscribe({
      next: (res) => { if (res.success) this.statsSubject.next(res.data); },
      error: (err) => console.error('[loadStats]', err),
    });
  }

  loadActivities(limit = 20): void {
    this.http.get<ApiListResponse<any>>(`${this.activityUrl}?limit=${limit}`).subscribe({
      next: (res) => { if (res.success) this.activitiesSubject.next(res.data.map(a => this.mapActivity(a))); },
      error: (err) => console.error('[loadActivities]', err),
    });
  }

  createVendor(formData: FormData): Observable<ApiSingleResponse<BackendVendor>> {
    return this.http.post<ApiSingleResponse<BackendVendor>>(this.vendorUrl, formData).pipe(
      tap((res) => {
        if (res.success) {
          this.vendorsSubject.next([this.mapVendor(res.data), ...this.vendorsSubject.value]);
          this.loadStats();
          this.loadActivities();
        }
      }),
    );
  }

  updateVendor(id: string, body: FormData | Partial<BackendVendor>): Observable<ApiSingleResponse<BackendVendor>> {
    const isFormData = body instanceof FormData;
    const request$ = isFormData
      ? this.http.put<ApiSingleResponse<BackendVendor>>(`${this.vendorUrl}/${id}`, body)
      : this.http.put<ApiSingleResponse<BackendVendor>>(`${this.vendorUrl}/${id}`, body);

    return request$.pipe(
      tap((res) => {
        if (res.success) {
          const list = this.vendorsSubject.value;
          const idx = list.findIndex(v => v.id === id);
          if (idx !== -1) {
            list[idx] = this.mapVendor(res.data);
            this.vendorsSubject.next([...list]);
          }
          this.loadStats();
        }
      }),
    );
  }

  deleteVendor(id: string): Observable<any> {
    return this.http.delete(`${this.vendorUrl}/${id}`).pipe(
      tap(() => {
        this.vendorsSubject.next(this.vendorsSubject.value.filter(v => v.id !== id));
        this.loadStats();
      }),
    );
  }

  getVendorByIdFromApi(id: string): Observable<Vendor> {
    return this.http
      .get<ApiSingleResponse<BackendVendor>>(`${this.vendorUrl}/${id}`)
      .pipe(map(res => this.mapVendor(res.data)));
  }

  getVendorById(id: string): Vendor | undefined {
    return this.vendorsSubject.value.find(v => v.id === id);
  }

  getVendors(): Vendor[] {
    return this.vendorsSubject.value;
  }
}