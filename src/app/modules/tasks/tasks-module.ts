import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing-module';
import { Tasks } from './tasks';
import { TaskManagement } from "../projects/widgets/task-management/task-management";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Tasks],
  imports: [
    CommonModule, 
    TasksRoutingModule, 
    TaskManagement,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
})
export class TasksModule { }
