import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface VendorTask {
  id: number;
  vendor_id: number;
  title: string;
  status: string;
  statusRaw: string;
  date: string | null;
}

@Injectable({ providedIn: 'root' })
export class VendorTaskService {
  private readonly base = `${environment.serverUrl}/api/v1/vendors`;

  private tasksSubject = new BehaviorSubject<VendorTask[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  tasks$ = this.tasksSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadTasks(vendorId: string | number): void {
    this.loadingSubject.next(true);
    this.http.get<{ success: boolean; data: VendorTask[] }>(
      `${this.base}/${vendorId}/tasks`
    ).subscribe({
      next: (res) => {
        if (res.success) this.tasksSubject.next(res.data);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('[VendorTaskService.loadTasks]', err);
        this.loadingSubject.next(false);
      },
    });
  }

  createTask(vendorId: string | number, payload: {
    title: string;
    status?: string;
    task_date?: string | null;
  }): Observable<any> {
    return this.http
      .post<{ success: boolean; data: VendorTask }>(
        `${this.base}/${vendorId}/tasks`,
        payload
      )
      .pipe(
        tap((res) => {
          if (res.success) {
            this.tasksSubject.next([res.data, ...this.tasksSubject.value]);
          }
        })
      );
  }

  updateTask(taskId: number, payload: Partial<{ title: string; status: string; task_date: string }>): Observable<any> {
    return this.http.put<any>(`${this.base}/tasks/${taskId}`, payload).pipe(
      tap((res) => {
        if (res.success) {
          const list = this.tasksSubject.value.map((t) =>
            t.id === taskId ? res.data : t
          );
          this.tasksSubject.next(list);
        }
      })
    );
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/tasks/${taskId}`).pipe(
      tap(() => {
        this.tasksSubject.next(this.tasksSubject.value.filter((t) => t.id !== taskId));
      })
    );
  }

  clearTasks(): void {
    this.tasksSubject.next([]);
  }
}