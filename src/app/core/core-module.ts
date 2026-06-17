import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing-module';
import { AccessDenied } from './interceptors/access-denied/access-denied';

@NgModule({
  declarations: [AccessDenied],
  imports: [CommonModule, CoreRoutingModule],
})
export class CoreModule {}
