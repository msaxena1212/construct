import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../interfaces/core.interface';
import { IProject } from '../../interfaces/project.interface';

export interface Material {
  name: string;
  sku: string;
  category: string;
  project_id: number; // added project_id to link with Project
  project_name: string; // optional, for easier display 
  cost: string;
  stockIn: number;
  material_master_id: number;
  vendor_name: string;
  vendor_id: string;
  status: 'ACTIVE';

}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseUrl = `${environment.serverUrl}/api/v1`;

  private apiUrlGetAllMaterials = `${this.baseUrl}/getAllMaterials`;
  private apiUrlCreateMaterial = `${this.baseUrl}/createMaterial`;
  private apiUrlUpdateMaterial = `${this.baseUrl}/updateMaterial`;
  private apiUrlDeleteMaterial = `${this.baseUrl}/deleteMaterial`;

  private materialsSubject = new BehaviorSubject<Material[]>([]);
  materials$ = this.materialsSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  loadMaterials() {
    this.http.get<any>(this.apiUrlGetAllMaterials).subscribe({
      next: (res) => {
        if (res?.message === 'Success') {
          this.materialsSubject.next(res.data || []);
        } else {
          this.materialsSubject.next([]);
        }
      },
      error: (err) => {
        console.error('[loadMaterials]', err);
        this.materialsSubject.next([]);
      },
    });
  }

  // 👇 agar sirf current value chahiye
  getMaterials() {
    return this.materialsSubject.value;
  }

  addMaterial(material: Material) {
    return this.http.post<any>(this.apiUrlCreateMaterial, material).pipe(
      tap((res) => {
        if (res?.success) {
          const current = this.materialsSubject.value;
          this.materialsSubject.next([...(current || []), res.data]);
        }
      }),
      catchError((err) => {
        console.error('[addMaterial]', err);
        return throwError(() => err);
      })
    );
  }

  // UPDATE
  updateMaterial(id: number, data: any) {
    return this.http.put<any>(`${this.apiUrlUpdateMaterial}/${id}`, data);
  }

  // DELETE
  deleteMaterial(id: number) {
    return this.http.delete<any>(`${this.apiUrlDeleteMaterial}/${id}`);
  }

  getMaterialBySku(sku: string) {
    return this.materialsSubject.value.find((m: Material) => m.sku === sku);
  }

 getProjects(): Observable<ApiResponse<IProject[]>> {
    return this.http.get<ApiResponse<IProject[]>>(`${this.baseUrl}/projects`);
  }


}

