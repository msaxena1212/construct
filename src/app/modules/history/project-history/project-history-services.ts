import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/interfaces/core.interface';

export interface IProjectHistory {
  id: number;
  project_id: number;
  user_id: number | null;
  action_type: string;
  detail: string;
  meta?: any;
  createdAt: string;
  user?: { id: number; firstname: string; lastname: string; avatar?: string };
}

@Injectable({
  providedIn: 'root',
})
export class ProjectHistoryServices {
  private apiUrl = environment.serverUrl + '/api/v1';

  constructor(private http: HttpClient) {}

  getProjectHistory(projectId: string | number): Observable<ApiResponse<IProjectHistory[]>> {
    return this.http.get<ApiResponse<IProjectHistory[]>>(`${this.apiUrl}/projects/${projectId}/history`);
  }
}
