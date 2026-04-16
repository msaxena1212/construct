import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './users';

const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      {
        path: 'team-list',
        loadChildren: () => import('./user-list/user-list-module').then((m) => m.UserListModule),
      },
      { path: 'role-master', loadChildren: () => import('./role-management/role-management-module').then(m => m.RoleManagementModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
