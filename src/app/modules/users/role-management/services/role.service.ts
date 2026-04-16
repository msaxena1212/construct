import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:3000/api/v1/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  createRole(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateRole(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getRolePermissions(roleId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${roleId}/permissions`);
  }

  updateRolePermissions(roleId: number, permissions: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${roleId}/permissions`, { permissions });
  }
}
