import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing-module';
import { Tasks } from './tasks';

@NgModule({
  declarations: [Tasks],
  imports: [CommonModule, TasksRoutingModule],
})
export class TasksModule {}
