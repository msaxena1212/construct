import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface MaterialHistory {
  id?: number;
  name: string;
  sku: string;
  category?: string;
  stockIn?: number;
  stockUsed?: number;
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
        this.historySubject.next(res?.data || []);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Failed to load material history', err);
        this.historySubject.next([]);
        this.loadingSubject.next(false);
      },
    });
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