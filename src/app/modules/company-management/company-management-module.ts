import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyManagementRoutingModule } from './company-management-routing-module';
import { CompanyManagement } from './company-management';
import { MaterialModule } from '../../shared/material/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyManagement
  ],
  imports: [
    CommonModule,
    CompanyManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CompanyManagementModule { }
