import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuManagementRoutingModule } from './menu-management-routing-module';
import { MenuManagement } from './menu-management';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material-module';

@NgModule({
  declarations: [
    MenuManagement
  ],
  imports: [
    CommonModule,
    MenuManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class MenuManagementModule { }
