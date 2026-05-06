import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../shared/interfaces/core.interface';
import { ITeam } from '../../../../shared/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = environment.serverUrl + '/api/v1';

  constructor(private http: HttpClient) { }

  getTeamMembers(): Observable<ApiResponse<ITeam[]>> {
    return this.http.get<ApiResponse<ITeam[]>>(`${this.baseUrl}/team`);
  }

  inviteUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/invite`, data);
  }

  toggleStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/team/${id}/status`, { isActive });
  }

  updateUser(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/team/${id}`, formData);
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/roles`);
  }
}
