import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../services/team.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-edit-user-modal',
  standalone: false,
  templateUrl: './edit-user-modal.html',
})
export class EditUserModalComponent implements OnInit, OnChanges {
  @Input() open = false;
  @Input() user: any;
  @Input() roles: any[] = [];
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  teamForm: FormGroup;
  loading = false;
  selectedFile: File | null = null;
  avatarPreview: string | null = null;
  avatarError = false;
  serverUrl = environment.serverUrl;
  isRoleDropdownOpen = false;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private toast: ToastrService,
    private elRef: ElementRef
  ) {
    this.teamForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.avatarError = false;
      this.teamForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        role_id: this.user.role_id
      });
      this.avatarPreview = this.user.avatar ? `${this.serverUrl}${this.user.avatar}` : null;
    }
  }

  ngOnChanges(): void {
    if (this.user) {
      this.avatarError = false;
      this.teamForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        role_id: this.user.role_id
      });
      this.avatarPreview = this.user.avatar ? `${this.serverUrl}${this.user.avatar}` : null;
    }
  }

  get selectedRoleName(): string | null {
    const role = this.roles.find(r => r.id === this.teamForm.get('role_id')?.value);
    return role ? role.name : null;
  }

  toggleRoleDropdown() {
    this.isRoleDropdownOpen = !this.isRoleDropdownOpen;
  }

  selectRole(role: any) {
    this.teamForm.get('role_id')?.setValue(role.id);
    this.teamForm.get('role_id')?.markAsTouched();
    this.isRoleDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isRoleDropdownOpen = false;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.avatarError = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onAvatarError() {
    this.avatarError = true;
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

    this.teamService.updateUser(this.user.id, formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toast.success(res.message || "User updated successfully!");
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || "Failed to update user");
      }
    });
  }
}