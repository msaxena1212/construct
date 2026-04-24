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
  ) { }

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
            res.company_id
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
            res.data.company_id
          );
        }
      }),
    );
  }

  logout() {
    this.userS.next(null);
    localStorage.removeItem(this.LS_KEY);
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
    company_id: number
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
      company_id: company_id
    };
    this.userS.next(userS);
    localStorage.setItem(this.LS_KEY, JSON.stringify(userS));
    return userS;
  }
}
