import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleManagement } from './role-management';

const routes: Routes = [{ path: '', component: RoleManagement }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
