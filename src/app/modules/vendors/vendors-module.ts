import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing-module';
import { Vendors } from './vendors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountByRolePipe } from './pipes/count-by-role-pipe';

@NgModule({
  declarations: [Vendors, CountByRolePipe],
  imports: [CommonModule, VendorsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class VendorsModule {}
