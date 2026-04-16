import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from './services/team.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
})
export class UserList implements OnInit {
  teamForm!: FormGroup;
  teamMembers: any[] = [];
  roles: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'mobile', 'role', 'status', 'actions'];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private toast: ToastrService
  ) {
    this.teamForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadTeam();
  }

  loadRoles() {
    this.teamService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
      error: (err) => console.error(err)
    });
  }

  loadTeam() {
    this.teamService.getTeamMembers().subscribe({
      next: (res) => {
        this.teamMembers = res.data;
      },
      error: (err) => {
        this.toast.error("Failed to load team members.");
      }
    });
  }

  inviteUser() {
    if (this.teamForm.invalid) {
      this.toast.error("Please fill in a valid email and select a role.");
      return;
    }
    this.teamService.inviteUser(this.teamForm.value).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Invite sent successfully!");
        this.teamForm.reset();
        this.loadTeam();
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Failed to invite user");
      }
    });
  }

  toggleStatus(member: any) {
    const newStatus = !member.isActive;
    this.teamService.toggleStatus(member.id, newStatus).subscribe({
      next: (res) => {
        this.toast.success(res.message || "Status updated.");
        this.loadTeam();
      },
      error: (err) => {
        this.toast.error(err.error?.message || "Failed to update status");
      }
    });
  }
}