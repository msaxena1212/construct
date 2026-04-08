import { Routes } from '@angular/router';
import { AuthGuard } from './@auth/auth-material/auth-guard';
import { Login } from './@auth/login/login';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/@auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'master',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/@modules/master-module').then((m) => m.MasterModule)
  },
  {
    path: 'auth',
    redirectTo: 'auth/login'
  }
];
