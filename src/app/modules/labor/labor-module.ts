import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaborRoutingModule } from './labor-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    LaborRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LaborModule { }
