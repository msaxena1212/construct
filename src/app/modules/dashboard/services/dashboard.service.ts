import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

interface Project {
  id: number;
  name: string;
  address: string;
  progress: number; 
} 
export interface DashboardApiResponse {
  success: boolean;
  data: {
    totalBudget: number;
    projects: { total: number; thisMonth: number; projectList: Project[]; };
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
