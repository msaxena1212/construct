import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProjectService } from '../services/project-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project-wizard',
  standalone: false,
  templateUrl: './new-project-wizard.html',
  styleUrl: './new-project-wizard.scss',
})
export class NewProjectWizard implements OnInit {
  currentStep: number = 1;
  projectForm: FormGroup;
  availableMembers: any[] = [];
  selectedFiles: File[] = [];
  loading = false;
  showAssignDropdown = false;
  newMilestoneName = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      // Step 1: General Info
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['Commercial Renovation', Validators.required],
      completionDate: ['', Validators.required],
      address: ['', Validators.required],
      
      // Step 2: Team (FormArray of objects { user_id, name, role, avatar })
      team: this.fb.array([]),
      
      // Step 3: Budget & Milestones
      budgetTotal: [null, [Validators.required, Validators.min(1000)]],
      milestones: this.fb.array([
        this.createMilestone('Site Preparation & Foundations', 'Phase 1', 'primary'),
        this.createMilestone('Structural Framing', 'Phase 2', 'outline')
      ]),

      // Step 4: Documents (Tracking only for UI, binary files handled separately)
      documents: this.fb.array([])
    });
  }

  ngOnInit() {
    this.fetchTeamMembers();
  }

  // --- Getters ---
  get f() { return this.projectForm.controls; }
  get team() { return this.projectForm.get('team') as FormArray; }
  get milestones() { return this.projectForm.get('milestones') as FormArray; }
  get documents() { return this.projectForm.get('documents') as FormArray; }

  // --- Data Fetching ---
  fetchTeamMembers() {
    this.projectService.getTeamMembers().subscribe({
      next: (res) => {
        this.availableMembers = res.data;
      },
      error: (err) => {
        this.toastr.error('Failed to load team members');
      }
    });
  }

  // --- Step Logic ---
  nextStep() {
    if (this.isStepValid(this.currentStep)) {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    } else {
      this.toastr.warning('Please complete all required fields for this step.');
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setStep(step: number) {
    // Only allow jumping back, or jumping forward if the current step is valid
    if (step < this.currentStep || this.isStepValid(this.currentStep)) {
      this.currentStep = step;
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.f['name'].valid && this.f['type'].valid && this.f['address'].valid && this.f['completionDate'].valid;
      case 2:
        return this.team.length > 0;
      case 3:
        return this.f['budgetTotal'].valid;
      case 4:
        return true; // Documentation is optional in validation
      default:
        return true;
    }
  }

  // --- Step 2: Team Management ---
  addMember(member: any) {
    const isAlreadyAdded = this.team.value.find((m: any) => m.user_id === member.id);
    if (!isAlreadyAdded) {
      this.team.push(this.fb.group({
        user_id: [member.id],
        name: [member.firstname + ' ' + member.lastname],
        role: [member.role?.name || 'Technical Staff'],
        avatar: [member.avatar || 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop']
      }));
    }
    this.showAssignDropdown = false;
  }

  removeMember(index: number) {
    this.team.removeAt(index);
  }

  // --- Step 3: Milestones ---
  createMilestone(name: string, phase: string, color: string): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      phase: [phase],
      color: [color]
    });
  }

  addMilestone() {
    if (this.newMilestoneName.trim()) {
      this.milestones.push(this.createMilestone(
        this.newMilestoneName.trim(), 
        `Phase ${this.milestones.length + 1}`, 
        'secondary'
      ));
      this.newMilestoneName = '';
    }
  }

  removeMilestone(index: number) {
    this.milestones.removeAt(index);
  }

  // --- Step 4: Documents ---
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);
        this.documents.push(this.fb.group({
            name: [file.name],
            size: [(file.size / 1024).toFixed(2) + ' KB']
        }));
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.documents.removeAt(index);
  }

  // --- Final Execution ---
  initializeProject() {
    if (this.projectForm.invalid) {
      this.toastr.error('Please fix the errors in the form before initializing.');
      return;
    }

    this.loading = true;
    const formData = new FormData();

    // Prepare the JSON data matching the backend ProjectController
    const payload = {
      name: this.projectForm.value.name,
      type: this.projectForm.value.type,
      address: this.projectForm.value.address,
      completionDate: this.projectForm.value.completionDate,
      budgetTotal: this.projectForm.value.budgetTotal,
      milestones: this.projectForm.value.milestones,
      // Map team array to just user_id and role for backend
      team: this.projectForm.value.team.map((m: any) => ({
        user_id: m.user_id,
        role: m.role
      }))
    };

    formData.append('data', JSON.stringify(payload));

    // Append files
    this.selectedFiles.forEach((file) => {
      formData.append('blueprints', file);
    });

    this.projectService.createProject(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('Project initialized successfully!');
        this.router.navigate(['/master/projects']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.toastr.error(err.error?.message || 'Error initializing project');
      }
    });
  }
}
