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
import { SubtaskProgressPipe } from '../../shared/pipes/subtask-progress.pipe';
import { MilestoneFormDialog } from './dialogs/milestone-form-dialog/milestone-form-dialog';
import { MaterialModule } from '../../shared/material/material-module';
import { TaskFormDialog } from './dialogs/task-form-dialog/task-form-dialog';
import { StockApprovalModule } from '../stock-approval/stock-approval-module';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog';

@NgModule({
  declarations: [
    Projects,
    ProjectDetail,
    NewProjectWizard,
    ProjectTimeline,
    ProjectBudget,
    SiteGallery,
    ProjectFiles,
    MilestoneFormDialog,
    TaskFormDialog,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MaterialModule,
    TaskManagement,
    StockApprovalModule,
    CommonDialogComponent
  ],
})
export class ProjectsModule {}
