import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthInterface } from '../../interfaces/auth.interface';

const databaseKey: any = environment.serverUrl;

const routes = {
  auth: {
    login: () => `${databaseKey}/api/auth/signin`,
    register: () => `${databaseKey}/api/v1/register-company`
  },
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userS: any = new BehaviorSubject(null);
  private LS_KEY = 'auth_user';

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {
    this.userS.next(this.getAuthUser());
  }

  public getAuthUser(): AuthInterface | null {
    const data = localStorage.getItem(this.LS_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  public getToken(): string | null {
    const user = this.getAuthUser();
    return user ? user.accessToken : null;
  }

  signIn(data: any): Observable<any> {
    return this.http.post<any>(routes.auth.login(), data).pipe(
      tap((res) => {
        if (res.accessToken) {
          this.authenticationUser(
            res.id,
            res.email,
            res.name,
            res.firstname,
            res.lastname,
            res.roleName,
            res.role_id,
            res.accessToken,
            res.company_id,
            res.avatar
          );
        }
      }),
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(routes.auth.register(), data).pipe(
      tap((res) => {
        if (res.accessToken && res.data) {
          this.authenticationUser(
            res.data.id,
            res.data.email,
            res.data.name,
            res.data.firstname,
            res.data.lastname,
            res.data.roleName,
            res.data.role_id,
            res.accessToken,
            res.data.company_id,
            res.data.avatar
          );
        }
      }),
    );
  }

  logout() {
    this.userS.next(null);
    localStorage.removeItem(this.LS_KEY);
    localStorage.removeItem('permissions'); 
    localStorage.clear();
    sessionStorage.clear();
    try {
      // Clear secure image blob object URLs
      const injector = (window as any).__secureImageService;
      if (injector && injector.clearCache) {
        injector.clearCache();
      }
    } catch (e) {}
    this.route.navigate(['']);
  }

  authenticationUser(
    id: any,
    email: string,
    name: string,
    firstname: string,
    lastname: string,
    roleName: string,
    roleId: string,
    accessToken: string,
    company_id: number,
    avatar?: string
  ) {
    const userS: AuthInterface = {
      id,
      email,
      name,
      firstname,
      lastname,
      roleName,
      roleId,
      accessToken,
      company_id: company_id,
      avatar: avatar
    };
    this.userS.next(userS);
    localStorage.setItem(this.LS_KEY, JSON.stringify(userS));
    return userS;
  }

  updateProfile(formData: FormData): Observable<any> {
    return this.http.put<any>(`${databaseKey}/api/v1/profile`, formData).pipe(
      tap((res) => {
        if (res.data) {
          const currentUser = this.getAuthUser();
          if (currentUser) {
            this.authenticationUser(
              res.data.id,
              res.data.email,
              res.data.name || currentUser.name,
              res.data.firstname,
              res.data.lastname,
              currentUser.roleName,
              currentUser.roleId,
              currentUser.accessToken,
              res.data.company_id,
              res.data.avatar
            );
          }
        }
      })
    );
  }
  
  getRolePermissions(roleId: number | string): Observable<any> {
  return this.http.get(
    `${databaseKey}/api/v1/roles/${roleId}/permissions`
  );
}
}
