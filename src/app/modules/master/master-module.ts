import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing-module';
import { MaterialMaster } from './material-master/material-master';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MaterialMaster],
  imports: [CommonModule, MasterRoutingModule,FormsModule],
})
export class MasterModule {}
