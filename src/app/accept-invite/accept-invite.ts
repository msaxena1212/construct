import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-accept-invite',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './accept-invite.html',
  styleUrls: ['./accept-invite.scss']
})
export class AcceptInvite implements OnInit {
  acceptForm!: FormGroup;
  token: string | null = null;
  loading = false;
  invitedEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    // Acquire the dynamic URL search token
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.toast.error('Invalid or missing cryptographic invite token.');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.acceptForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.fetchInviteInfo();
  }

  fetchInviteInfo() {
    this.http.get(`${environment.serverUrl}/api/v1/invite-info?token=${this.token}`).subscribe({
      next: (res: any) => {
        if(res.data) {
          this.invitedEmail = res.data.email;
          this.acceptForm.patchValue({
            firstname: res.data.firstname,
            lastname: res.data.lastname
          });
        }
      },
      error: (err) => {
        this.toast.error(err.error?.message || 'Token may have expired or is invalid.');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onSubmit(): void {
    if (this.acceptForm.invalid) {
      this.toast.warning('Please fill all required fields correctly to unlock your account.');
      return;
    }

    this.loading = true;
    const payload = {
      ...this.acceptForm.value,
      inviteToken: this.token
    };

    // Fire directly bypassing standard Auth Guards via our backend exempt array configuration
    this.http.post(`${environment.serverUrl}/api/v1/accept-invite`, payload).subscribe({
      next: (res: any) => {
        this.toast.success(res.message || 'Environment keys accepted! You may now sign in natively.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || 'Failed to authenticate and link environment account.');
      }
    });
  }
}
