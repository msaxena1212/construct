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
        path: 'portfolio',
        loadChildren: () => import('./portfolio/portfolio-module').then((m) => m.PortfolioModule),
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
        path: 'stock-approval',
        loadChildren: () => import('./stock-approval/stock-approval-module').then((m) => m.StockApprovalModule),

      },
      {
        path: 'stock-transfer',
        loadChildren: () => import('./stock-transfer/stock-transfer-module').then((m) => m.StockTransferModule),
      },
      {
        path: 'resources',
        loadChildren: () => import('./resources/resources-module').then(m => m.ResourcesModule)
      },
      {
        path: 'masters',
        loadChildren: () => import('./master/master-module').then(m => m.MasterModule)
      },
      // { path: 'resources/vendors/:projectId', loadChildren: () => import('./vendors/vendors-module').then(m => m.VendorsModule) },
      { path: 'resources/vendors', loadChildren: () => import('./vendors/vendors-module').then(m => m.VendorsModule) },

      { path: 'profile', loadChildren: () => import('./profile/profile-module').then(m => m.ProfileModule) },
      { path: 'access-denied', loadComponent: () => import('../core/interceptors/access-denied/access-denied').then(m => m.AccessDenied) },
      { path: 'history', loadChildren: () => import('./history/history-module').then(m => m.HistoryModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }
