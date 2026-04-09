import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Modules } from './modules';

const routes: Routes = [
  {
    path: '',
    component: Modules,
    children: [
      {
        path: 'user-management',
        loadChildren: () => import('./users/users-module').then((m) => m.UsersModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
      },
    ],
  },
  { path: 'users', loadChildren: () => import('./users/users-module').then(m => m.UsersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
