import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing-module';
import { Materials } from './materials/materials';
import { Contracts } from './contracts/contracts';
import { FormsModule } from '@angular/forms';
import { EquipmentInventory } from './equipment-inventory/equipment-inventory';
import { VendorAddComponent } from '../../shared/components/vendor-add-modal/vendor-add-modal';

@NgModule({
  declarations: [Materials, Contracts, EquipmentInventory],
  imports: [CommonModule, ResourcesRoutingModule, FormsModule,VendorAddComponent],
})
export class ResourcesModule {}
