import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Materials } from './materials/materials';
import { Contracts } from './contracts/contracts';
import { EquipmentInventory } from './equipment-inventory/equipment-inventory';
import { Quotations } from './quotations/quotations';
import { NewQuotations } from './new-quotations/new-quotations';

const routes: Routes = [
  { path: 'materials', component: Materials },
  { path: 'contracts', component: Contracts },
  { path: 'equipment-inventory', component: EquipmentInventory },
  { path: 'quotations', component: Quotations },
  { path: 'quotations/new', component:NewQuotations },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
