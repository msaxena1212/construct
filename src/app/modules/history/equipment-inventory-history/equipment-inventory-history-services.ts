import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface EquipmentHistory {
  id?: number | string;
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
  equipment_id?: number;
  equipment_master_id?: number;
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
export class EquipmentInventoryHistoryServices {
  private baseUrl = `${environment.serverUrl}/api/v1`;

  private historySubject = new BehaviorSubject<EquipmentHistory[]>([]);
  history$ = this.historySubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadEquipmentHistory() {
    this.loadingSubject.next(true);

    this.http.get<any>(`${this.baseUrl}/getAllequipments_history`).subscribe({
      next: (res) => {
        if (res?.code === 200 && Array.isArray(res?.data)) {
          const sorted = [...res.data].sort(
            (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          );
          this.historySubject.next(sorted);
        } else {
          this.historySubject.next([]);
        }
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Failed to load equipment history', err);
        this.historySubject.next([]);
        this.loadingSubject.next(false);
      },
    });
  }
}