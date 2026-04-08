import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Rbacmaster } from './rbacmaster/rbacmaster';

const routes: Routes = [
  {
    path: '',
    component: Rbacmaster,
  },
  {
    path: 'rbac-role-master',
    loadChildren: () =>
      import('./rbacmaster/rbac-role-master/rbac-role-master-module').then(
        (m) => m.RbacRoleMasterModule
      ),
  },
 {
    path: 'user-master',
    loadChildren: () =>
      import('./rbacmaster/usermaster/usermaster-module').then((m) => m.UsermasterModule),
  },

  // {
  //   path: 'role-assign-admin-user',
  //   loadChildren: () =>
  //     import('./rbacmaster/role-assign/role-assign.module').then(
  //       (m) => m.RoleAssignModule
  //     ),
  // },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RbacmasterRoutingModule { }
