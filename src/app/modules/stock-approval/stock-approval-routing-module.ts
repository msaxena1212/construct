import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockApproval } from './stock-approval';

const routes: Routes = [{ path: '', component: StockApproval }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockApprovalRoutingModule {}
