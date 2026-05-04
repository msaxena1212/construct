import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing-module';
import { Materials } from './materials/materials';
import { Contracts } from './contracts/contracts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [Materials, Contracts],
  imports: [CommonModule, ResourcesRoutingModule,FormsModule],
})
export class ResourcesModule {}
