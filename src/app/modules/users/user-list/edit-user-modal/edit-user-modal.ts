import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../services/team.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.html',
})
export class EditUserModalComponent implements OnInit {
  teamForm: FormGroup;
  roles: any[] = [];
  loading = false;
  selectedFile: File | null = null;
  avatarPreview: string | null = null;
  serverUrl = environment.serverUrl;

  constructor(
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private teamService: TeamService,
    private toast: ToastrService
  ) {
    this.roles = data.roles || [];
    this.teamForm = this.fb.group({
      firstname: [data.user.firstname, Validators.required],
      lastname: [data.user.lastname, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      role_id: [data.user.role_id, Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUser() {
    if (this.teamForm.invalid) {
      this.toast.error("Please fill in all required fields correctly.");
      this.teamForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.teamForm.value));
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.teamService.updateUser(this.data.user.id, formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toast.success(res.message || "User updated successfully!");
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to update user");
      }
    });
  }
}
