import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Timeline } from './timeline';

const routes: Routes = [{ path: '', component: Timeline }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelineRoutingModule {}
