import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbacRoleList } from './rbac-role-list/rbac-role-list';
import { RbacRoleCreate } from './rbac-role-list/rbac-role-create/rbac-role-create';

const routes: Routes = [
  { path: '', component: RbacRoleList },
  {
    path: 'rbac-role-create', component:RbacRoleCreate
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RbacRoleMasterRoutingModule { }
