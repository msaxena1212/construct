import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:3000/api/v1/modules';

  constructor(private http: HttpClient) {}

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
}
