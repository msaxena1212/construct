import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsHistory } from './vendors-history/vendors-history';
import { ProjectHistory } from './project-history/project-history';

const routes: Routes = [
  { path: 'history/vendor', component: VendorsHistory },
  { path: 'history/project', component: ProjectHistory },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule { }
