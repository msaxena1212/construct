import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborRoutingModule } from './labor-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Labor } from './labor';

@NgModule({
  declarations: [Labor],
  imports: [CommonModule,
    LaborRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LaborModule { }
