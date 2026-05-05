import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-invite-user-modal',
  standalone: false,
  templateUrl: './invite-user-modal.html',
})
export class InviteUserModalComponent implements OnInit {
  teamForm: FormGroup;
  roles: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<InviteUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private teamService: TeamService,
    private toast: ToastrService
  ) {
    this.roles = data.roles || [];
    this.teamForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  inviteUser() {
    if (this.teamForm.invalid) {
      this.toast.error("Please fill in all required fields correctly.");
      this.teamForm.markAllAsTouched();
      return;
    }

    this.teamService.inviteUser(this.teamForm.value).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Invite sent successfully!");
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Failed to invite user");
      }
    });
  }
}
