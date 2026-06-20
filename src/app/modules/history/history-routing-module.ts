import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsHistory } from './vendors-history/vendors-history';

const routes: Routes = [
  { path: 'history/vendor', component: VendorsHistory }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule { }
