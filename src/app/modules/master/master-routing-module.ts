import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialMaster } from './material-master/material-master';

const routes: Routes = [
  {
    path: 'material',
    component: MaterialMaster
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
