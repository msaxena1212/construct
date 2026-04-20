import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Projects } from './projects';
import { NewProjectWizard } from './new-project-wizard/new-project-wizard';
import { ProjectDetail } from './project-detail/project-detail';

const routes: Routes = [
  { path: '', component: Projects },
  { path: 'new-project', component: NewProjectWizard },
  { path: 'edit-project/:id', component: NewProjectWizard },
  { path: ':id', component: ProjectDetail },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule { }
