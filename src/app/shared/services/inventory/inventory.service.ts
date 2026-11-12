import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface InventoryLocationBalance {
  location_id: number;
  code: string;
  name: string;
  location_type: string;
  balance: number;
}

export interface InventoryMaterialRow {
  material_id: number;
  name: string;
  sku: string;
  unit_of_measure: string;
  counter_available: number;
  unplaced: number;
  in_transit: number;
  quarantined: number;
  locations: InventoryLocationBalance[];
  reconciliation: { consistent: boolean; by_location_type: Record<string, number>; location_total: number };
}

export interface InventoryBalances {
  project_id: number;
  materials: InventoryMaterialRow[];
  locations: { id: number; code: string; name: string; location_type: string; status: string }[];
}

export interface InventoryMovement {
  id: number;
  createdAt: string;
  movement_type: string;
  quantity: string;
  unit_of_measure: string;
  material: { id: number; name: string; sku: string } | null;
  location: { id: number; code: string; name: string } | null;
  transfer_id: number | null;
  reference_id: string | null;
  reason: string | null;
}

/** Typed client for /api/v1/inventory. Balances and history are returned by the server; nothing is computed here. */
@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly apiUrl = `${environment.serverUrl}/api/v1/inventory`;

  constructor(private http: HttpClient) {}

  balances(projectId: number): Observable<{ data: InventoryBalances }> {
    return this.http.get<{ data: InventoryBalances }>(`${this.apiUrl}/balances`, { params: new HttpParams().set('project_id', String(projectId)) });
  }

  movements(projectId: number, materialId?: number): Observable<{ data: InventoryMovement[] }> {
    let params = new HttpParams().set('project_id', String(projectId));
    if (materialId) params = params.set('material_id', String(materialId));
    return this.http.get<{ data: InventoryMovement[] }>(`${this.apiUrl}/movements`, { params });
  }

  receive(body: { project_id: number; material_id: number; location_id: number; quantity: number; reference: string; idempotency_key: string }) {
    return this.http.post<{ already_processed: boolean; data: InventoryMovement }>(`${this.apiUrl}/receipts`, body);
  }

  issue(body: { project_id: number; material_id: number; location_id: number; quantity: number; activity: string; requested_by: string; idempotency_key: string }) {
    return this.http.post<{ already_processed: boolean; data: InventoryMovement }>(`${this.apiUrl}/issues`, body);
  }
}
