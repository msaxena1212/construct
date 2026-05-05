import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role-form-dialog',
  standalone: false,
  templateUrl: './role-form-dialog.html',
})
export class RoleFormDialog implements OnInit {
  roleForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RoleFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roleService: RoleService,
    private toast: ToastrService
  ) {
    this.isEditMode = !!data.role;
    this.roleForm = this.fb.group({
      name: [data.role?.name || '', Validators.required],
      type: [data.role?.type || 'CUSTOM', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.roleForm.invalid) {
      this.toast.error('Please fill required fields');
      this.roleForm.markAllAsTouched();
      return;
    }

    const request$ = this.isEditMode 
      ? this.roleService.updateRole(this.data.role.id, this.roleForm.value)
      : this.roleService.createRole(this.roleForm.value);

    request$.subscribe({
      next: (res) => {
        this.toast.success(res.message);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error(err.error?.message || `Failed to ${this.isEditMode ? 'update' : 'create'} role`);
      }
    });
  }
}
