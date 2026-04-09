import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './users';

const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
      {
        path: 'rbac-master',
        loadChildren: () =>
          import('./rbac-master/rbac-master-module').then((m) => m.RbacMasterModule),
      },
      {
        path: 'role-master',
        loadChildren: () =>
          import('./role-master/role-master-module').then((m) => m.RoleMasterModule),
      },
      {
        path: 'user-list',
        loadChildren: () => import('./user-list/user-list-module').then((m) => m.UserListModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
