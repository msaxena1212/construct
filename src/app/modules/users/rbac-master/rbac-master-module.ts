import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RbacMasterRoutingModule } from './rbac-master-routing-module';
import { RbacMaster } from './rbac-master';


@NgModule({
  declarations: [
    RbacMaster
  ],
  imports: [
    CommonModule,
    RbacMasterRoutingModule
  ]
})
export class RbacMasterModule { }
