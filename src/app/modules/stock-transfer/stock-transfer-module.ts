import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StockTransferRoutingModule } from './stock-transfer-routing-module';
import { StockTransferRegister } from './stock-transfer-register/stock-transfer-register';
import { StockTransferDetail } from './stock-transfer-detail/stock-transfer-detail';
import { StockTransferInTransit } from './stock-transfer-in-transit/stock-transfer-in-transit';
import { InventoryPage } from './inventory-page/inventory-page';
import { StockTransferNav } from './stock-transfer-nav/stock-transfer-nav';

@NgModule({
  declarations: [StockTransferRegister, StockTransferDetail, StockTransferInTransit, InventoryPage, StockTransferNav],
  imports: [
    CommonModule,
    FormsModule,
    StockTransferRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [DatePipe, DecimalPipe],
})
export class StockTransferModule {}
