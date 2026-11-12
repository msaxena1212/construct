import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Materials } from './materials/materials';
import { Contracts } from './contracts/contracts';
import { EquipmentInventory } from './equipment-inventory/equipment-inventory';
import { Quotations } from './quotations/quotations';
import { NewQuotations } from './new-quotations/new-quotations';
import { InvoicesLiabilitiesComponent } from './invoices-liabilities/invoices-liabilities';
import { SiteLabourAttendanceComponent } from './site-labour-attendance/site-labour-attendance';

const routes: Routes = [
  { path: 'materials', component: Materials },
  { path: 'contracts', component: Contracts },
  { path: 'equipment-inventory', component: EquipmentInventory },
  { path: 'equipment-transfer', component: EquipmentInventory, data: { mode: 'transfer' } },
  { path: 'quotations', component: Quotations },
  { path: 'quotations/new', component:NewQuotations },
  { path: 'invoices-liabilities', component: InvoicesLiabilitiesComponent },
  { path: 'site-labour-attendance', component: SiteLabourAttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
