import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing-module';
import { Materials } from './materials/materials';
import { Contracts } from './contracts/contracts';
import { FormsModule } from '@angular/forms';
import { EquipmentInventory } from './equipment-inventory/equipment-inventory';
import { VendorAddComponent } from '../../shared/components/vendor-add-modal/vendor-add-modal';
import { Quotations } from './quotations/quotations';
import { NewQuotations } from './new-quotations/new-quotations';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog';
import { InvoicesLiabilitiesComponent } from './invoices-liabilities/invoices-liabilities';
import { SiteLabourAttendanceComponent } from './site-labour-attendance/site-labour-attendance';

@NgModule({
  declarations: [Materials, Contracts, EquipmentInventory, Quotations, NewQuotations, InvoicesLiabilitiesComponent, SiteLabourAttendanceComponent],
  imports: [CommonModule, ResourcesRoutingModule, FormsModule, VendorAddComponent, CommonDialogComponent],
})
export class ResourcesModule {}
