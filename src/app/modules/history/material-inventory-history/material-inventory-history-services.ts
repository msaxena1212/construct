import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface MaterialHistory {
  id?: number | string;
  name: string;
  sku: string;
  category?: string;
  stockIn?: number;
  stockUsed?: number;
  stockRemaining?: number;
  cost?: string;
  vendor_name?: string;
  project_name?: string;
  status?: string;
  note?: string;
  material_id?: number;
  material_master_id?: number;
  project_id?: number;
  vendor_id?: number;
  quotation_id?: number;
  createdAt?: string;

  user_id?: number;
  created_by?: string;
  user?: {
    id: number;
    firstname?: string;
    lastname?: string;
    email?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MaterialInventoryHistoryServices {

  private baseUrl = `${environment.serverUrl}/api/v1`;

  private historySubject = new BehaviorSubject<MaterialHistory[]>([]);
  history$ = this.historySubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadMaterialHistory() {
    this.loadingSubject.next(true);

    this.http.get<any>(`${this.baseUrl}/getAllMaterialHistory`).subscribe({
      next: (res) => {
        const flattened = this.flattenHistory(res?.data || []);
        this.historySubject.next(flattened);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Failed to load material history', err);
        this.historySubject.next([]);
        this.loadingSubject.next(false);
      },
    });
  }

  private flattenHistory(rawData: any[]): MaterialHistory[] {
    const flattened: MaterialHistory[] = rawData.map((item) => ({
      ...item,
      id: `hist-${item.id}`,
      status: (item.status || 'UPDATED').toUpperCase(),
    }));

    return flattened.sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  getMaterialHistoryById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/getMaterialHistoryById/${id}`);
  }

  getMaterialHistoryByMaterialId(materialId: number) {
    return this.http.get<any>(`${this.baseUrl}/getMaterialHistoryByMaterialId/${materialId}`);
  }

  getMaterialHistoryByMaterialMasterId(masterId: number) {
    return this.http.get<any>(`${this.baseUrl}/getMaterialHistoryByMaterialMasterId/${masterId}`);
  }
}