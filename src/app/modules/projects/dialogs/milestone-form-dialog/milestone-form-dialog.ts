import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MilestoneStatus } from '../../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-milestone-form-dialog',
  standalone: false,
  templateUrl: './milestone-form-dialog.html',
  styleUrl: './milestone-form-dialog.scss',
})
export class MilestoneFormDialog implements OnInit {
  isEditingMilestone = false;
  form!: FormGroup;
  colorDropdownOpen = false;

  constructor(
    public dialogRef: MatDialogRef<MilestoneFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.isEditingMilestone = !!data?.milestone;
    this.form = this.fb.group({
      name: [this.data?.milestone?.name || '', [Validators.required]],
      progress: [this.data?.milestone?.progress || 0, [Validators.min(0), Validators.max(100)]],
      color: [this.data?.milestone?.color || 'blue-600', [Validators.required]],
      status: [this.data?.milestone?.status || MilestoneStatus.NOT_STARTED, [Validators.required]],
      startDate: [this.data?.milestone?.startDate || null, [Validators.required]],
      endDate: [this.data?.milestone?.endDate || null, [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.data?.milestone) {
      this.form.patchValue(this.data.milestone)
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
   
colorOptions = [
  { value: 'blue-600', label: 'Blue', hex: '#2563eb' },
  { value: 'indigo-600', label: 'Indigo', hex: '#4f46e5' },
  { value: 'emerald-600', label: 'Emerald', hex: '#059669' },
  { value: 'amber-600', label: 'Amber', hex: '#d97706' },
  { value: 'rose-600', label: 'Rose', hex: '#e11d48' },
  { value: 'purple-600', label: 'Purple', hex: '#9333ea' },
  { value: 'cyan-600', label: 'Cyan', hex: '#0891b2' }
];

selectColor(value: string) {
  this.form.get('color')?.setValue(value);
  this.colorDropdownOpen = false;
}

getColorLabel(value: string): string {
  return this.colorOptions.find(c => c.value === value)?.label || 'Select Color';
}

getColorHex(value: string): string {
  return this.colorOptions.find(c => c.value === value)?.hex || '#94a3b8';
}

  saveMilestone() {
    if (this.form.invalid) {
      this.toastr.error('Please fill in all required fields correctly');
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.form.value,
      startDate: this.formatDate(this.form.value.startDate),
      endDate: this.formatDate(this.form.value.endDate),
      parent_id: this.data.parent_id || null
    };

    const request$ = this.isEditingMilestone
      ? this.projectService.updateMilestone(this.data.project?.id, this.data.milestone.id, payload)
      : this.projectService.createMilestone(this.data.project?.id, payload);

    request$.subscribe({
      next: () => {
        this.toastr.success(`Milestone ${this.isEditingMilestone ? 'updated' : 'saved'} successfully`);
        this.dialogRef.close(this.form.value);
      },
      error: () => {
        this.toastr.error(`Failed to ${this.isEditingMilestone ? 'update' : 'save'} milestone`);
      }
    });
  }
}
