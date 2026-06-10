import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IMeeting {
  id?: number;
  title: string;
  description?: string;
  date: string;
  time?: string;
  duration?: number;
  attendees?: string[];
  meet_link?: string;
  project_id?: number;
  vendor_id?: number;
  vendor_ids?: number[]; 
  company_id?: number;
  created_by?: number;
  project?: { id: number; name: string; type: string; status: string };
  vendor?: { id: number; name: string };
  creator?: { id: number; firstname: string; lastname: string; avatar?: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface IMeetingFilters {
  project_id?: number;
  vendor_id?: number;
  date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeetingServices {
  private apiUrl = environment.serverUrl + '/api/v1/meetings';

  constructor(private http: HttpClient) {}

  getMeetings(filters?: IMeetingFilters): Observable<ApiResponse<IMeeting[]>> {
    let params = new HttpParams();
    if (filters?.project_id) params = params.set('project_id', filters.project_id);
    if (filters?.vendor_id)  params = params.set('vendor_id', filters.vendor_id);
    if (filters?.date)       params = params.set('date', filters.date);
    return this.http.get<ApiResponse<IMeeting[]>>(this.apiUrl, { params });
  }

  createMeeting(data: IMeeting): Observable<ApiResponse<IMeeting>> {
    return this.http.post<ApiResponse<IMeeting>>(this.apiUrl, data);
  }

  updateMeeting(id: number, data: Partial<IMeeting>): Observable<ApiResponse<IMeeting>> {
    return this.http.put<ApiResponse<IMeeting>>(`${this.apiUrl}/${id}`, data);
  }

  deleteMeeting(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}