import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  private apiUrl = environment.serverUrl + '/api/v1';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`);
  }

  getTeamMembers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/team`);
  }

  createProject(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects`, formData);
  }

  getUpdates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/updates`);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }
}
