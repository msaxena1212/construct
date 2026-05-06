import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing-module';
import { UserList } from './user-list';
import { MaterialModule } from '../../../shared/material/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { InviteUserModalComponent } from './invite-user-modal/invite-user-modal';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal';


@NgModule({
  declarations: [
    UserList,
    InviteUserModalComponent,
    EditUserModalComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserListModule { }
