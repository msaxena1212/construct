import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing-module';
import { Portfolio } from './portfolio';

@NgModule({
  declarations: [Portfolio],
  imports: [CommonModule, PortfolioRoutingModule],
})
export class PortfolioModule {}
