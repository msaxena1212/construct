import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Auth } from './auth';
import { Login } from './login/login';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Auth,
    Login
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
