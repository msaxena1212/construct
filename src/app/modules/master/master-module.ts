import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing-module';
import { MaterialMaster } from './material-master/material-master';
import { FormsModule } from '@angular/forms';
import { EquipmentMaster } from './equipment-master/equipment-master';
import { SkillMaster } from './skill-master/skill-master';

@NgModule({
  declarations: [MaterialMaster, EquipmentMaster, SkillMaster],
  imports: [CommonModule, MasterRoutingModule, FormsModule],
})
export class MasterModule {}
