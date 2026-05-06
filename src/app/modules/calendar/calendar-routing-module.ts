import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Calendar } from './calendar';

const routes: Routes = [{ path: '', component: Calendar }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
