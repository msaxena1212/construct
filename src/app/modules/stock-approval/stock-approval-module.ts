import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockApprovalRoutingModule} from './stock-approval-routing-module';
import { StockApproval } from './stock-approval';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog';

@NgModule({
  declarations: [StockApproval],
   exports: [StockApproval],
  imports: [
    CommonModule, 
   StockApprovalRoutingModule, 
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,CommonDialogComponent
  ],
})
export class StockApprovalModule{ }
