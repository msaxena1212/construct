import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialMaster } from './material-master/material-master';
import { EquipmentMaster } from './equipment-master/equipment-master';
import { SkillMaster } from './skill-master/skill-master';

const routes: Routes = [
  {
    path: 'material',
    component: MaterialMaster
  },
  {
    path: 'equipment',
    component: EquipmentMaster
  },
  {
    path: 'skill',
    component: SkillMaster
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
