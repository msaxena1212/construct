import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing-module';
import { Calendar } from './calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Calendar],
  imports: [CommonModule, CalendarRoutingModule, FormsModule, ReactiveFormsModule],
})
export class CalendarModule {}
