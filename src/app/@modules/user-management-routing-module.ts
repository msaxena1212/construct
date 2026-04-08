import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagement } from './user-management/user-management';

const routes: Routes = [
{ 
    path: '', 
    component: UserManagement,
    children: [
      {
        path: 'rbacmaster',
        loadChildren: () => import('./user-management/rbacmaster-module')  
          .then(m => m.RbacmasterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
