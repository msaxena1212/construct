import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsHistory } from './vendors-history/vendors-history';
import { ProjectHistory } from './project-history/project-history';
import { MaterialInventoryHistory } from './material-inventory-history/material-inventory-history';
import { EquipmentInventoryHistory } from './equipment-inventory-history/equipment-inventory-history';
import { EmployeeHistory } from './employee-history/employee-history';

const routes: Routes = [
  { path: 'history/vendor', component: VendorsHistory },
  { path: 'history/project', component: ProjectHistory },
  { path: 'history/resources/materials', component: MaterialInventoryHistory },
  { path: 'history/resources/equipment-inventory', component: EquipmentInventoryHistory },
  { path: 'employee-history/:id', component: EmployeeHistory },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule { }
