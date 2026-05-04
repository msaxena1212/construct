import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface Material {
  name: string;
  sku: string;
  category: string;
  icon: string;
  bg: string;
  text: string;
  border?: string;
  stock: {
    current: number;
    total: number;
    percent: number;
  };
  cost: string;
  supplier: string;
  status: 'Optimal' | 'Adequate' | 'Critical';
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = `${environment.serverUrl}/materials`;
  private materialsSubject = new BehaviorSubject<Material[]>([]);
  materials$ = this.materialsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMaterials();
  }

  loadMaterials() {
    this.http.get<Material[]>(this.apiUrl).subscribe(data => {
      this.materialsSubject.next(data);
    });
  }

  getMaterials() {
    return this.materialsSubject.value;
  }

  addMaterial(material: Material) {
    // In a real app, this would be a POST call
    const current = this.materialsSubject.value;
    this.materialsSubject.next([...current, material]);
  }

  updateMaterial(sku: string, updated: Partial<Material>) {
    // In a real app, this would be a PUT/PATCH call
    const current = this.materialsSubject.value;
    const index = current.findIndex((m: Material) => m.sku === sku);
    if (index !== -1) {
      current[index] = { ...current[index], ...updated } as Material;
      this.materialsSubject.next([...current]);
    }
  }

  deleteMaterial(sku: string) {
    // In a real app, this would be a DELETE call
    const current = this.materialsSubject.value;
    this.materialsSubject.next(current.filter((m: Material) => m.sku !== sku));
  }

  getMaterialBySku(sku: string) {
    return this.materialsSubject.value.find((m: Material) => m.sku === sku);
  }
}

