import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockTransferRegister } from './stock-transfer-register/stock-transfer-register';
import { StockTransferDetail } from './stock-transfer-detail/stock-transfer-detail';
import { StockTransferInTransit } from './stock-transfer-in-transit/stock-transfer-in-transit';
import { InventoryPage } from './inventory-page/inventory-page';

const routes: Routes = [
  { path: '', component: StockTransferRegister, data: { mode: 'register' } },
  { path: 'approvals', component: StockTransferRegister, data: { mode: 'approvals' } },
  { path: 'in-transit', component: StockTransferInTransit },
  { path: 'inventory', component: InventoryPage },
  { path: ':id', component: StockTransferDetail },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockTransferRoutingModule {}
