import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../@shared/material/material-module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, ToastrModule, MaterialModule, MatIconModule, MatProgressSpinnerModule,
    RouterModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {

}
