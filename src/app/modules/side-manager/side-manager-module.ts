import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideManagerRoutingModule} from './side-manager-routing-module';
import { SideManager } from './side-manager';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SideManager],
   exports: [SideManager],
  imports: [
    CommonModule, 
    SideManagerRoutingModule, 
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
})
export class SideManagerModule{ }
