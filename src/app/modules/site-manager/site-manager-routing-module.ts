import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteManager } from './site-manager';

const routes: Routes = [{ path: '', component: SiteManager }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteManagerRoutingModule {}
