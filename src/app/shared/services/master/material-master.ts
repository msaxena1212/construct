import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface Material {
  name: string;
  sku: string;
  category: string;
  cost: number;
  status: string;
  stockAvailable: number;
}

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root',
})
export class MaterialMasterService { private baseUrl = `${environment.serverUrl}/api/v1`;

  private getAllMaterial_Master = `${this.baseUrl}/getAllMaterial_Master`;
  private createMaterial_Master = `${this.baseUrl}/createMaterial_Master`;
  private updateMaterial_Master = `${this.baseUrl}/updateMaterial_Master`;
  private deleteMaterial_Master = `${this.baseUrl}/deleteMaterial_Master`;
  private getMaterial_MasterById = `${this.baseUrl}/getMaterial_MasterById`;

  private materialsSubject = new BehaviorSubject<Material[]>([]);
  materials$ = this.materialsSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  loadMaterials() {
    this.http.get<any>(this.getAllMaterial_Master).subscribe({
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
    return this.http.post<any>(this.createMaterial_Master, material).pipe(
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
    return this.http.put<any>(`${this.updateMaterial_Master}/${id}`, data);
  }

  // DELETE
  deleteMaterial(id: number) {
    return this.http.delete<any>(`${this.deleteMaterial_Master}/${id}`);
  }

  getMaterialBySku(sku: string) {
    return this.materialsSubject.value.find((m: Material) => m.sku === sku);
  }

  getMaterialMasterById(id: any): Observable<any> {
    return this.http.get<any>(`${this.getMaterial_MasterById}/${id}`);
  }


}


