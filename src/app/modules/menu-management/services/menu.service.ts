import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = environment.serverUrl + '/api/v1/modules';

  constructor(private http: HttpClient) { }

  getMenus(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  createMenu(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateMenu(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  resetToCanonical(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-canonical`, {});
  }
}
