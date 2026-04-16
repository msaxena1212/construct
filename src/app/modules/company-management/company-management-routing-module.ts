import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyManagement } from './company-management';

const routes: Routes = [{ path: '', component: CompanyManagement }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyManagementRoutingModule { }
