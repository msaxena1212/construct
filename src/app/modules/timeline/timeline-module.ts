import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing-module';
import { Timeline } from './timeline';

@NgModule({
  declarations: [Timeline],
  imports: [CommonModule, TimelineRoutingModule],
})
export class TimelineModule {}
