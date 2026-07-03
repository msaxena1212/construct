import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsHistory } from './vendors-history/vendors-history';
import { ProjectHistory } from './project-history/project-history';
import { MaterialInventoryHistory } from './material-inventory-history/material-inventory-history';

const routes: Routes = [
  { path: 'history/vendor', component: VendorsHistory },
  { path: 'history/project', component: ProjectHistory },
  { path: 'history/resources/materials', component: MaterialInventoryHistory },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule { }
