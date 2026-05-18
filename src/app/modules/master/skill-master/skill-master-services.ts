import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillMasterServices {

  private http = inject(HttpClient);

  private readonly baseUrl =
    `${environment.serverUrl}/api/v1/skill`;

  // Observable Data
  private skillsSubject = new BehaviorSubject<any[]>([]);

  skills$ = this.skillsSubject.asObservable();

  // =========================
  // GET ALL SKILLS
  // =========================
  loadSkills() {

    return this.http
      .get<any>(`${this.baseUrl}/list`)
      .pipe(
        tap((res) => {

          const skills = res?.data || [];

          this.skillsSubject.next(skills);
        })
      );
  }

  // =========================
  // CREATE SKILL
  // =========================
  addSkill(data: any) {

    return this.http.post(
      `${this.baseUrl}/create`,
      data
    );
  }

  // =========================
  // UPDATE SKILL
  // =========================
  updateSkill(id: number, data: any) {

    return this.http.put(
      `${this.baseUrl}/update/${id}`,
      data
    );
  }

  // =========================
  // DELETE SKILL
  // =========================
  deleteSkill(id: number) {

    return this.http.delete(
      `${this.baseUrl}/delete/${id}`
    );
  }
}