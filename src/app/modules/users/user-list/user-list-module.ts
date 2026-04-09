import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing-module';
import { UserList } from './user-list';
import { MaterialModule } from '../../../shared/material/material-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserList
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserListModule { }
