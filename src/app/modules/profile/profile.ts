import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { AuthInterface } from '../../shared/interfaces/auth.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: AuthInterface | null = null;
  loading = false;
  selectedFile: File | null = null;
  avatarPreview: string | null = null;
  serverUrl = environment.serverUrl;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private location: Location
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['']
    });

    this.authService.userS.subscribe((user: AuthInterface | null) => {
      this.currentUser = user;
      if (user) {
        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          mobile: (user as any).mobile
        });
      }
    });
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

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

  updateProfile() {
    if (this.profileForm.invalid) {
      this.toast.error("Please fix the errors in the form.");
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.profileForm.value));
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.authService.updateProfile(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.currentUser = this.authService.getAuthUser();
        this.toast.success("Profile updated successfully!");
        this.selectedFile = null;
        this.avatarPreview = null;
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to update profile");
      }
    });
  }
}
