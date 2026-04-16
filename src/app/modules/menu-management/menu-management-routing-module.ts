import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuManagement } from './menu-management';

const routes: Routes = [{ path: '', component: MenuManagement }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuManagementRoutingModule { }
