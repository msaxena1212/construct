import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing-module';
import { VendorsHistory } from './vendors-history/vendors-history';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectHistory } from './project-history/project-history';
import { MaterialInventoryHistory } from './material-inventory-history/material-inventory-history';

@NgModule({
  declarations: [VendorsHistory, ProjectHistory, MaterialInventoryHistory],
  imports: [CommonModule, HistoryRoutingModule, FormsModule, ReactiveFormsModule],
})
export class HistoryModule {}
