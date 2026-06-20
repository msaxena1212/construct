import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing-module';
import { VendorsHistory } from './vendors-history/vendors-history';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendorsHistory],
  imports: [CommonModule, HistoryRoutingModule, FormsModule, ReactiveFormsModule],
})
export class HistoryModule { }
