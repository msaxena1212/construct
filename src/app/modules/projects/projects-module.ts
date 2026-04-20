import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing-module';
import { Projects } from './projects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetail } from './project-detail/project-detail';
import { NewProjectWizard } from './new-project-wizard/new-project-wizard';
import { TaskManagement } from './widgets/task-management/task-management';
import { ProjectTimeline } from './widgets/project-timeline/project-timeline';
import { ProjectBudget } from './widgets/project-budget/project-budget';
import { SiteGallery } from './widgets/site-gallery/site-gallery';
import { ProjectFiles } from './widgets/project-files/project-files';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskDetail } from './widgets/task-detail/task-detail';
import { AddTask } from './widgets/add-task/add-task';
import { SubtaskProgressPipe } from './widgets/task-management/subtask-progress.pipe';

@NgModule({
  declarations: [
    Projects,
    ProjectDetail,
    NewProjectWizard,
    TaskManagement,
    ProjectTimeline,
    ProjectBudget,
    SiteGallery,
    ProjectFiles,
    TaskDetail,
    AddTask,
    SubtaskProgressPipe,
  ],
  imports: [CommonModule, ProjectsRoutingModule, FormsModule, ReactiveFormsModule, DragDropModule],
})
export class ProjectsModule { }
