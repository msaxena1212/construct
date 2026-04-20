import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Modules } from './modules';

const routes: Routes = [
  {
    path: '',
    component: Modules,
    children: [
      {
        path: 'team-management',
        loadChildren: () => import('./users/users-module').then((m) => m.UsersModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
      },
      { path: 'menu-management', loadChildren: () => import('./menu-management/menu-management-module').then(m => m.MenuManagementModule) },
      { path: 'company-management', loadChildren: () => import('./company-management/company-management-module').then(m => m.CompanyManagementModule) },
      { path: 'projects', loadChildren: () => import('./projects/projects-module').then(m => m.ProjectsModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }
