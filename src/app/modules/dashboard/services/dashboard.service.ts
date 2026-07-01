import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface DashboardApiResponse {
  success: boolean;
  data: {
    projects: { total: number; thisMonth: number };
    materials: { total: number; newAdded: number };
    equipment: { total: number; active: number };
  };
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = `${environment.serverUrl}/api/v1/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardApiResponse> {
    return this.http.get<DashboardApiResponse>(this.baseUrl);
  }
}
