import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-invite-user-modal',
  standalone: false,
  templateUrl: './invite-user-modal.html',
})
export class InviteUserModalComponent implements OnInit {
  @Input() open = false;
  @Input() roles: any[] = [];
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  teamForm: FormGroup;
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

  ngOnInit(): void { }

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

  inviteUser() {
    if (this.teamForm.invalid) {
      this.toast.error("Please fill in all required fields correctly.");
      this.teamForm.markAllAsTouched();
      return;
    }

    this.teamService.inviteUser(this.teamForm.value).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Invite sent successfully!");
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Failed to invite user");
      }
    });
  }
}