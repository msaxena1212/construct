import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/interfaces/core.interface';
import { IProject, IProjectTask } from '../../../shared/interfaces/project.interface';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.serverUrl + '/api/v1';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<ApiResponse<IProject[]>> {
    return this.http.get<ApiResponse<IProject[]>>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string | number): Observable<ApiResponse<IProject>> {
    return this.http.get<ApiResponse<IProject>>(`${this.apiUrl}/projects/${id}`);
  }

  getTeamMembers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/team`);
  }

  createProject(formData: FormData): Observable<ApiResponse<IProject>> {
    return this.http.post<ApiResponse<IProject>>(`${this.apiUrl}/projects`, formData);
  }

  updateProject(id: string | number, formData: FormData): Observable<ApiResponse<IProject>> {
    return this.http.put<ApiResponse<IProject>>(`${this.apiUrl}/projects/${id}`, formData);
  }

  // --- Task Management ---
  getProjectTasks(projectId: string | number): Observable<ApiResponse<IProjectTask[]>> {
    return this.http.get<ApiResponse<IProjectTask[]>>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  createTask(projectId: string | number, taskData: any): Observable<ApiResponse<IProjectTask>> {
    return this.http.post<ApiResponse<IProjectTask>>(`${this.apiUrl}/projects/${projectId}/tasks`, taskData);
  }

  updateTask(taskId: string | number, taskData: any): Observable<ApiResponse<IProjectTask>> {
    return this.http.put<ApiResponse<IProjectTask>>(`${this.apiUrl}/tasks/${taskId}`, taskData);
  }

  deleteTask(taskId: string | number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/tasks/${taskId}`);
  }

  addTaskComment(taskId: string | number, content: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/tasks/${taskId}/comments`, { content });
  }

  uploadTaskAttachment(taskId: string | number, formData: FormData): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/tasks/${taskId}/attachments`, formData);
  }

  getUpdates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/updates`);
  }

  getTasks(): Observable<ApiResponse<IProjectTask[]>> {
    return this.http.get<ApiResponse<IProjectTask[]>>(`${this.apiUrl}/tasks`);
  }
}
