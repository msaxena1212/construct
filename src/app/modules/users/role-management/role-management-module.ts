import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing-module';
import { RoleManagement } from './role-management';
import { RoleFormDialog } from './role-form-dialog/role-form-dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material-module';
import { CommonDialogComponent } from '../../../shared/components/common-dialog/common-dialog';

@NgModule({
  declarations: [
    RoleManagement,
    RoleFormDialog
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonDialogComponent
  ]
})
export class RoleManagementModule { }
