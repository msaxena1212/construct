import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing-module';
import { Vendors } from './vendors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountByRolePipe } from './pipes/count-by-role-pipe';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog';

@NgModule({
  declarations: [Vendors, CountByRolePipe],
  imports: [CommonModule, VendorsRoutingModule, FormsModule, ReactiveFormsModule, CommonDialogComponent],
})
export class VendorsModule {}
