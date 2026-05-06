import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from './services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { InviteUserModalComponent } from './invite-user-modal/invite-user-modal';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal';
import { ITeam } from '../../../shared/interfaces/project.interface';
import { ApiResponse } from '../../../shared/interfaces/core.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
})
export class UserList implements OnInit {
  teamMembers: ITeam[] = [];
  roles: any[] = [];
  serverUrl = environment.serverUrl;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

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
      next: (res: ApiResponse<ITeam[]>) => {
        if (res && res.data && res.data.length > 0) {
          this.teamMembers = res.data;
        }
      },
      error: (err) => {
        this.toast.error("Failed to load team members.");
      }
    });
  }

  openInviteModal() {
    const dialogRef = this.dialog.open(InviteUserModalComponent, {
      width: '500px',
      data: { roles: this.roles },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTeam();
      }
    });
  }

  openEditModal(user: any) {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '500px',
      data: { user, roles: this.roles },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTeam();
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