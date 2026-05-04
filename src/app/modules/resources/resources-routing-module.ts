import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Materials } from './materials/materials';
import { Contracts } from './contracts/contracts';

const routes: Routes = [
  { path: 'materials', component: Materials },
  { path: 'contracts', component: Contracts },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
