import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing-module';
import { Timeline } from './timeline';
import { ProjectsModule } from '../projects/projects-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Timeline],
  imports: [CommonModule, TimelineRoutingModule, ProjectsModule, FormsModule],
})
export class TimelineModule {}
