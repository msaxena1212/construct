import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing-module';
import { RoleManagement } from './role-management';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material-module';

@NgModule({
  declarations: [
    RoleManagement
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class RoleManagementModule { }
