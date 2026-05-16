import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideManager } from './side-manager';

const routes: Routes = [{ path: '', component: SideManager }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideManagerRoutingModule {}
