import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleMaster } from './role-master';

const routes: Routes = [{ path: '', component: RoleMaster }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleMasterRoutingModule { }
