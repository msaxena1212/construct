import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Portfolio } from './portfolio';

const routes: Routes = [{ path: '', component: Portfolio }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
