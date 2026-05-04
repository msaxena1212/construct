import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing-module';
import { Calendar } from './calendar';

@NgModule({
  declarations: [Calendar],
  imports: [CommonModule, CalendarRoutingModule],
})
export class CalendarModule {}
