import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeHistoryServices {
  private baseUrl = environment.serverUrl + '/api/v1/team';

  constructor(private http: HttpClient) { }

  getEmployeeHistory(userId: number, page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/history`, {
      params: { page, limit } as any,
    });
  }
  getAllEmployeesForSuperAdmin(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/api/v1/getAllUsers`);
  }
}