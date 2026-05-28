import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryServeice {

  private http = inject(HttpClient);

  private readonly baseUrl =
    `${environment.serverUrl}/api/v1`;

  // Observable Data
  private categoriesSubject = new BehaviorSubject<any[]>([]);

  categories$ = this.categoriesSubject.asObservable();

  // =========================
  // GET ALL CATEGORIES
  // =========================
  loadCategories() {

    return this.http
      .get<any>(`${this.baseUrl}/getAllCategory`)
      .pipe(
        tap((res) => {

          const categories = res?.data || [];

          this.categoriesSubject.next(categories);
        })
      );
  }

  // =========================
  // CREATE CATEGORY
  // =========================
  addCategory(data: any) {

    return this.http.post(
      `${this.baseUrl}/createCategory`,
      data
    );
  }

  // =========================
  // UPDATE CATEGORY
  // =========================
  updateCategory(id: number, data: any) {

    return this.http.put(
      `${this.baseUrl}/updateCategory/${id}`,
      data
    );
  }

  // =========================
  // DELETE CATEGORY
  // =========================
  deleteCategory(id: number) {

    return this.http.delete(
      `${this.baseUrl}/deleteCategory/${id}`
    );
  }
}
