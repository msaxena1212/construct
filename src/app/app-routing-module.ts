import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'accept-invite',
    loadComponent: () => import('./accept-invite/accept-invite').then(m => m.AcceptInvite)
  },
  {
    path: 'master',
    canActivate:[authGuard],
    loadChildren: () => import('../app/modules/modules-module').then((m) => m.ModulesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
