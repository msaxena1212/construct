import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing-module';
import { Vendors } from './vendors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [Vendors],
  imports: [CommonModule, VendorsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class VendorsModule { }
