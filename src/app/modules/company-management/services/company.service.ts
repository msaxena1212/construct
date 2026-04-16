import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = environment.serverUrl + '/api/v1/companies';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  toggleStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/status`, { isActive });
  }
}
