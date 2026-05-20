import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteManagerRoutingModule} from './site-manager-routing-module';
import { SiteManager } from './site-manager';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SiteManager],
   exports: [SiteManager],
  imports: [
    CommonModule, 
    SiteManagerRoutingModule, 
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
})
export class SiteManagerModule{ }
