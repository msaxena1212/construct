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
  getProjectHistory(projectId: string | number, params?: { action_type?: string; limit?: number; offset?: number }): Observable<ApiResponse<any[]>> {
    let query = '';
    if (params) {
      const parts: string[] = [];
      if (params.action_type) parts.push(`action_type=${params.action_type}`);
      if (params.limit) parts.push(`limit=${params.limit}`);
      if (params.offset) parts.push(`offset=${params.offset}`);
      if (parts.length) query = `?${parts.join('&')}`;
    }
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/projects/${projectId}/history${query}`);
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

  createSubTask(taskId: string | number, title: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/tasks/${taskId}/subtasks`, { title });
  }

  updateSubTask(subTaskId: number, data: { title?: string; completed?: boolean }): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/subtasks/${subTaskId}`, data);
  }

  deleteSubTask(subTaskId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/subtasks/${subTaskId}`);
  }

  getUpdates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/updates`);
  }

  getTasks(): Observable<ApiResponse<IProjectTask[]>> {
    return this.http.get<ApiResponse<IProjectTask[]>>(`${this.apiUrl}/tasks`);
  }

  getProjectTimeline(projectId: string | number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/timeline`);
  }

  uploadDocuments(projectId: string | number, files: File[]): Observable<ApiResponse<any>> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/documents`, formData);
  }

  // --- Milestone Management ---
  createMilestone(projectId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/milestones`, data);
  }

  updateMilestone(projectId: string | number, milestoneId: string | number, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/projects/${projectId}/milestones/${milestoneId}`, data);
  }

  // Vendors
  getVendors(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/vendors`);
  }
  // materials
  getMaterialByprojectId(projectId: string | number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/getMaterialByprojectId/${projectId}`
    );



  }
  requestAdditionalStock(payload: {
    material_id: number;
    task_title: string;
    requested_qty: number;
    available_qty: number;
    project_id: string | number;
  }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/stock-request`, payload);
  }

  updateAdditionalStockRequest(id: number, payload: any) {
    return this.http.put(
      `${this.apiUrl}/stock-request/${id}`,
      payload
    );
  }

  // side manger
  getAllStockRequests(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/stock-request`);
  }

  getStockRequestById(projectId: string | number): Observable<ApiResponse<IProjectTask[]>> {
    return this.http.get<ApiResponse<IProjectTask[]>>(`${this.apiUrl}/stock-request/${projectId}`);
  }

  approveStockRequest(id: number) {
    return this.http.put(
      `${this.apiUrl}/stock-request/${id}/approve`,
      {}
    );
  }

  rejectStockRequest(id: number) {
    return this.http.put(
      `${this.apiUrl}/stock-request/${id}/reject`,
      {}
    );
  }

  projectByesBudget(id: number) {
    return this.http.get(
      `${this.apiUrl}/getBudget_vendorProjectById/${id}`,
    );
  }

  getLaborByVendor(id: number) {
    return this.http.get(
      `${this.apiUrl}/vendors_labor/vendor/${id}`,
    );
  }
}

