import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing-module';
import { Modules } from './modules';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material-module';

@NgModule({
  declarations: [Modules],
  imports: [CommonModule, ModulesRoutingModule, RouterModule, MaterialModule],
})
export class ModulesModule { }
