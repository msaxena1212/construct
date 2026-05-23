import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing-module';
import { Labour } from './labour/labour';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Labour],
  imports: [CommonModule, AnalyticsRoutingModule, FormsModule,
    ReactiveFormsModule,],
})
export class AnalyticsModule {}
