import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthInterface } from '../../interfaces/auth.interface';

const databaseKey: any = environment.serverUrl;

const routes = {
  auth: {
    login: () => `${databaseKey}/api/Employee/UserLogin`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private route: Router,
  ) {}
  userS: any = new BehaviorSubject(null);

  signIn(data: any): Observable<any> {
    return this.http.post<any>(routes.auth.login(), data).pipe(
      tap((res) => {
        if (res.code === '404') {
          // this.toster.error(`${res.message}`);
          return;
        } else if (res.code === '200') {
          const user = res.resultData[0];
          this.authenticationUser(
            user.id,
            user.employeeCode,
            `${user.firstName} ${user.lastName}`,
            user.roleName,
            user.roleId,
            user.emailId,
          );
        } else {
          // this.toster.error('Something went wrong please try again.!', 'Error Message');
          return;
        }
      }),
    );
  }

  logout() {
    this.userS.next(null);
    this.route.navigate(['']);
    localStorage.removeItem('signInUser');
  }

  authenticationUser(
    id: any,
    email: string,
    name: string,
    roleName: string,
    roleId: string,
    emailId: string,
  ) {
    const userS: AuthInterface = {
      id,
      email,
      name,
      roleName,
      roleId,
      emailId,
    };
    this.userS.next(userS);
    localStorage.setItem('signInUser', JSON.stringify(userS));
    return userS;
  }
}
