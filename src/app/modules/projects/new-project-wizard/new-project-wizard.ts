import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProjectService } from '../services/project-service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { IProject, ITeam, IUser } from '../../../shared/interfaces/project.interface';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-project-wizard',
  standalone: false,
  templateUrl: './new-project-wizard.html',
  styleUrl: './new-project-wizard.scss',
})
export class NewProjectWizard implements OnInit {
  currentStep: number = 1;
  projectForm: FormGroup;
  availableMembers: ITeam[] = [];
  selectedFiles: File[] = [];
  loading = false;
  showAssignDropdown = false;
  showBudgetBreakdownDialog = false;
  newMilestoneName = '';
  thumbnailFile: File | null = null;
  thumbnailPreview: string | null = null;

  budgetBreakdown: FormGroup;

  editMode = false;
  projectId: string | null = null;
  existingDocuments: any[] = [];
  serverUrl = environment.serverUrl;
  allDetails: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['Commercial Renovation', Validators.required],
      completionDate: ['', Validators.required],
      address: ['', Validators.required],
      thumbnail: [null],
      team: this.fb.array([]),
      budgetTotal: [null, [Validators.required, Validators.min(0)]],
      milestones: this.fb.array([]),
      documents: this.fb.array([])
    });

    this.budgetBreakdown = this.fb.group({
      material: [0, [Validators.min(0)]],
      equipment: [0, [Validators.min(0)]],
      labor: [0, [Validators.min(0)]],
      other: [0, [Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.fetchTeamMembers();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.projectId = id;
        this.loadProjectForEdit(id);
      } else {
        // Default milestones for new project
        this.addDefaultMilestones();
      }
    });
  }

  addDefaultMilestones() {
    if (this.milestones.length === 0) {
      this.milestones.push(this.createMilestone('Site Preparation & Foundations', 'Phase 1', 'primary'));
      this.milestones.push(this.createMilestone('Structural Framing', 'Phase 2', 'outline'));
    }
  }

  loadProjectForEdit(id: string) {
    this.loading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (res) => {
        const p = res.data;
        const t: any = res.data;
        this.allDetails = res.data;
        this.projectForm.patchValue({
          name: p.name,
          type: p.type || 'Commercial Renovation',
          completionDate: p.completion_date?.split('T')[0],
          address: p.address,
          budgetTotal: p.budget_total
        });

        this.budgetBreakdown.valueChanges.subscribe(() => {
          const total = this.budgetBreakdownTotal;
          this.projectForm.get('budgetTotal')?.setValue(total, { emitEvent: false });
        });

        this.budgetBreakdown.patchValue({
          material: t.material || 0,
          equipment: t.equipment || 0,
          labor: t.labor || 0,
          other: t.other || 0
        });

        if (p.thumbnail) {
          if (p.thumbnail.startsWith('http')) {
            this.thumbnailPreview = p.thumbnail;
          } else {
            const baseUrl = this.serverUrl.endsWith('/') ? this.serverUrl.slice(0, -1) : this.serverUrl;
            const thumbPath = p.thumbnail.startsWith('/') ? p.thumbnail : `/${p.thumbnail}`;
            this.thumbnailPreview = `${baseUrl}${thumbPath}`;
          }
        }

        // Patch Team
        this.team.clear();
        p.team_members?.forEach((m) => {
          const role = (m as any).PROJECT_TEAM?.role || 'Technical Staff';
          this.team.push(this.fb.group({
            user_id: [m.id],
            name: [`${m.firstname} ${m.lastname}`],
            role: [role],
            avatar: [m.avatar || 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop']
          }));
        });

        // Patch Milestones
        this.milestones.clear();
        const milestonesWithChildren = t.milestones_with_child || p.milestones || [];
        milestonesWithChildren.forEach((m: any) => {
          this.milestones.push(this.createMilestoneFromData(m));
        });

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Failed to load project details.');
      }
    });
  }

  // --- Getters ---
  get f() { return this.projectForm.controls; }
  get team() { return this.projectForm.get('team') as FormArray; }
  get milestones() { return this.projectForm.get('milestones') as FormArray; }
  get milestoneTree() { return this.milestones; }
  get documents() { return this.projectForm.get('documents') as FormArray; }

  get budgetBreakdownTotal(): number {
    const breakdown = this.budgetBreakdown.value;
    return ['material', 'equipment', 'labor', 'other']
      .reduce((sum, key) => sum + Number(breakdown[key] || 0), 0);
  }

  get budgetTotalValue(): number {
    return Number(this.projectForm.get('budgetTotal')?.value ?? 0);
  }

  get usedBudget(): number {
    return this.budgetBreakdownTotal;
  }

  get remainingBudget(): number {
    return this.budgetTotalValue - this.usedBudget;
  }

  openBudgetAllocationDialog() {
    this.showBudgetBreakdownDialog = true;
  }

  closeBudgetBreakdownDialog() {
    this.showBudgetBreakdownDialog = false;
  }

  saveBudgetBreakdown() {
    this.projectForm.get('budgetTotal')?.setValue(this.budgetBreakdownTotal);
    this.showBudgetBreakdownDialog = false;
  }

  // --- Data Fetching ---
  fetchTeamMembers() {
    this.projectService.getTeamMembers().subscribe({
      next: (res) => {
        this.availableMembers = res.data;
      },
      error: () => {
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
    if (step < this.currentStep || this.isStepValid(this.currentStep)) {
      this.currentStep = step;
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.f['name'].valid && this.f['type'].valid && this.f['completionDate'].valid && this.f['address'].valid;
      case 2:
        return this.team.length > 0;
      case 3:
        return this.f['budgetTotal'].valid;
      case 4:
        return true;
      default:
        return true;
    }
  }

  // --- Step 2: Team Management ---
  addMember(member: ITeam) {
    const isAlreadyAdded = this.team.value.find((m: any) => m.user_id === member.id);
    if (!isAlreadyAdded) {
      this.team.push(this.fb.group({
        user_id: [member.id],
        name: [member.firstname + ' ' + member.lastname],
        firstname: [member.firstname],
        lastname: [member.lastname],
        role: [member.role?.name || 'Technical Staff'],
        avatar: [member.avatar || null]
      }));
    } else {
      this.toastr.warning('Member already added');
    }
    this.showAssignDropdown = false;
  }

  removeMember(index: number) {
    this.team.removeAt(index);
  }

  // --- Step 3: Milestones ---
  createMilestone(name: string, phase: string, color: string): FormGroup {
    return this.fb.group({
      id: [null],
      name: [name, Validators.required],
      phase: [phase],
      color: [color],
      progress: [0],
      status: ['Not Started'],
      startDate: [null],
      endDate: [null],
      children: this.fb.array([])
    });
  }

  createMilestoneFromData(milestone: any): FormGroup {
    return this.fb.group({
      id: [milestone.id || null],
      name: [milestone.name || '', Validators.required],
      phase: [milestone.phase || 'Drafting'],
      color: [milestone.color || 'primary'],
      progress: [milestone.milestone_progress || milestone.submilestone_progress || 0],
      status: [milestone.status || 'Not Started'],
      startDate: [milestone.startDate || milestone.start_date || null],
      endDate: [milestone.endDate || milestone.end_date || null],
      children: this.fb.array((milestone.children || []).map((child: any) => this.createMilestoneFromData(child)))
    });
  }

  getMilestoneChildren(milestone: AbstractControl): FormArray {

    return milestone.get('children') as FormArray;
  }

  addMilestone() {
    if (this.newMilestoneName.trim()) {
      this.milestoneTree.push(this.createMilestone(
        this.newMilestoneName.trim(),
        `Phase ${this.milestoneTree.length + 1}`,
        'secondary'
      ));
      this.newMilestoneName = '';
    }
  }

  removeMilestone(index: number) {
    this.milestoneTree.removeAt(index);
  }

  removeChildMilestone(parent: AbstractControl, childIndex: number) {
    this.getMilestoneChildren(parent).removeAt(childIndex);
  }

  // --- Thumbnail ---
  onThumbnailSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.thumbnailFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
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
  saveProject() {

    if (this.projectForm.invalid) {
      this.toastr.error('Please fix the errors in the form before saving.');
      return;
    }

    this.loading = true;

    const formData = new FormData();

    const milestones: any[] = [];

    this.milestoneTree.value.forEach((parent: any) => {

      milestones.push({
        id: parent.id,
        name: parent.name,
        phase: parent.phase,
        progress: parent.progress,
        color: parent.color,
        status: parent.status,
        startDate: parent.startDate,
        endDate: parent.endDate,
        parent_id: null
      });

      if (parent.children?.length) {

        parent.children.forEach((child: any) => {

          milestones.push({
            id: child.id,
            name: child.name,
            phase: child.phase,
            progress: child.submilestone_progress || child.submilestone_progress,
            color: child.color,
            status: child.status,
            startDate: child.startDate,
            endDate: child.endDate,
            parent_id: parent.id
          });

        });

      }

    });

    const payload = {
      name: this.projectForm.value.name,
      type: this.projectForm.value.type,
      address: this.projectForm.value.address,
      completionDate: this.projectForm.value.completionDate,
      budgetTotal: this.projectForm.value.budgetTotal,
      material_total: this.budgetBreakdown.value.material,
      equipment_total: this.budgetBreakdown.value.equipment,
      labor_total: this.budgetBreakdown.value.labor,
      other_total: this.budgetBreakdown.value.other,
      milestones: milestones,
      team: this.projectForm.value.team.map((m: any) => ({
        user_id: m.user_id,
        role: m.role
      }))
    };

    formData.append('data', JSON.stringify(payload));

    if (this.thumbnailFile) {
      formData.append('thumbnail', this.thumbnailFile);
    }

    this.selectedFiles.forEach((file) => {
      formData.append('blueprints', file);
    });

    const request =
      this.editMode && this.projectId
        ? this.projectService.updateProject(this.projectId, formData)
        : this.projectService.createProject(formData);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(
          this.editMode ? 'Project updated!' : 'Project initialized!'
        );
        this.router.navigate(['/master/projects']);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error?.message || 'Error saving project');
      }
    });
  }

  cancel() {
    this.location.back();
  }
}
