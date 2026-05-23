import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Labour } from './labour/labour';

const routes: Routes = [

    { path: 'labor', component: Labour }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
