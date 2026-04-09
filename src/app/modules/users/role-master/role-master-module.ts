import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleMasterRoutingModule } from './role-master-routing-module';
import { RoleMaster } from './role-master';


@NgModule({
  declarations: [
    RoleMaster
  ],
  imports: [
    CommonModule,
    RoleMasterRoutingModule
  ]
})
export class RoleMasterModule { }
