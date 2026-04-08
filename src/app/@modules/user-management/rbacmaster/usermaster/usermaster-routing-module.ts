import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuMaster } from './menu-master/menu-master';

const routes: Routes = [
  { path: '', component: MenuMaster }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermasterRoutingModule { }
