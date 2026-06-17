import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing-module';
import { AccessDenied } from './interceptors/access-denied/access-denied';

@NgModule({
   declarations: [],
  imports: [CommonModule, CoreRoutingModule, AccessDenied],
})
export class CoreModule {}
