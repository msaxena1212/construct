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
      {
        path: 'menu-management',
        loadChildren: () =>
          import('./menu-management/menu-management-module').then((m) => m.MenuManagementModule),
      },
      {
        path: 'company-management',
        loadChildren: () =>
          import('./company-management/company-management-module').then(
            (m) => m.CompanyManagementModule,
          ),
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects-module').then((m) => m.ProjectsModule),
      },
      { path: 'tasks', loadChildren: () => import('./tasks/tasks-module').then((m) => m.TasksModule) },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar-module').then((m) => m.CalendarModule),
      },
      {
        path: 'timeline',
        loadChildren: () => import('./timeline/timeline-module').then((m) => m.TimelineModule),
      },
      {
        path: 'site-manager',
        loadChildren: () => import('./site-manager/site-manager-module').then((m) => m.SiteManagerModule),
        
      },
      {
        path: 'resources',
        loadChildren: () => import('./resources/resources-module').then(m => m.ResourcesModule)
      },
      {
        path: 'masters',
        loadChildren: () => import('./master/master-module').then(m => m.MasterModule)
      },
      { path: 'resources/vendors', loadChildren: () => import('./vendors/vendors-module').then(m => m.VendorsModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile-module').then(m => m.ProfileModule) },
      { path: 'analytics/labor', loadChildren: () => import('./labor/labor-module').then(m => m.LaborModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }
