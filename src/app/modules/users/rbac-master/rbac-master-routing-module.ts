import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbacMaster } from './rbac-master';

const routes: Routes = [{ path: '', component: RbacMaster }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RbacMasterRoutingModule { }
