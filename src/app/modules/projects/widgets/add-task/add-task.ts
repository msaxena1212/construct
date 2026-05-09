import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project-service';
import { IProjectTask, IUser } from '../../../../shared/interfaces/project.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
  imports: [CommonModule, FormsModule, ToastrModule, ReactiveFormsModule],
})
export class AddTask implements OnInit {
  @Input() projectId: string | number = '';
  @Input() milestoneId: string | number | null = null;
  @Input() initialStatus: string = 'To Do';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  private projectService = inject(ProjectService);
  private toast = inject(ToastrService);
  private fb = inject(FormBuilder);

  taskForm!: FormGroup;
checklist: {
  title: string;
  itemName: string;
  qty: number;
  equipment: string;
  completed: boolean;
}[] = [];

showSubTaskForm = false;
editingIndex: number | null = null;

newSubTask = {
   title: '',
  itemName: '',
  qty: 1,
  equipment: ''
};

  dependencies: any[] = [];
  attachments: any[] = [];

  selectedPredecessorId = '';
  selectedDepType = 'FS';
  depLag = 0;
  allTasks: IProjectTask[] = [];

  priorities = [
    { label: 'High Priority', class: 'bg-red-100 text-red-700' },
    { label: 'Medium Priority', class: 'bg-blue-100 text-blue-700' },
    { label: 'Low Priority', class: 'bg-amber-100 text-amber-700' }
  ];

  dependencyTypes = [
    { id: 'FS', name: 'Finish-to-Start (FS)', desc: 'Predecessor must finish before Successor can start' },
    { id: 'SS', name: 'Start-to-Start (SS)', desc: 'Predecessor must start before Successor can start' },
    { id: 'FF', name: 'Finish-to-Finish (FF)', desc: 'Predecessor must finish before Successor can finish' },
    { id: 'SF', name: 'Start-to-Finish (SF)', desc: 'Predecessor must start before Successor can finish' }
  ];

  teamMembers: IUser[] = [];
  vendors: any[] = [];

  ngOnInit() {
    this.initForm();
    this.projectService.getProjectTasks(this.projectId).subscribe((res: any) => {
      this.allTasks = res.data;
    });
    if (this.projectId) {
      this.fetchTeamMembers();
      this.fetchVendors();
    }
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: ['Medium Priority'],
      status: [this.initialStatus],
      startDate: [new Date().toISOString().split('T')[0]],
      duration: [5],
      assigneeId: [''],
      vendorId: [''],
      initialComment: ['']
    });
  }

  fetchTeamMembers() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.teamMembers = res.data.team_members || [];
      }
    });
  }

  fetchVendors() {
  this.projectService.getVendors().subscribe({
    next: (res) => {
      this.vendors = res.data || [];
    }
  });
}

 addSubTask() {

  if (
    this.newSubTask.title.trim() &&
    this.newSubTask.itemName.trim()
  ) {

    const payload = {
      title: this.newSubTask.title,
      itemName: this.newSubTask.itemName,
      qty: this.newSubTask.qty,
      equipment: this.newSubTask.equipment,
      completed: false
    };

    // EDIT
    if (this.editingIndex !== null) {

      this.checklist[this.editingIndex] = payload;

      this.editingIndex = null;

    } else {

      // CREATE
      this.checklist.push(payload);
    }

    // RESET
    this.newSubTask = {
      title: '',
      itemName: '',
      qty: 1,
      equipment: ''
    };

    this.showSubTaskForm = false;
  }
}

  editSubTask(index: number) {

  const item = this.checklist[index];

  this.newSubTask = {
    title: item.title,
    itemName: item.itemName,
    qty: item.qty,
    equipment: item.equipment
  };

  this.editingIndex = index;
  this.showSubTaskForm = true;
}

  removeSubTask(index: number) {
    this.checklist.splice(index, 1);
  }

  addDependency() {
    if (this.selectedPredecessorId) {
      const pred = this.allTasks.find(t => t.id === Number(this.selectedPredecessorId));
      const typeObj = this.dependencyTypes.find(t => t.id === this.selectedDepType);
      this.dependencies.push({
        predecessor_id: Number(this.selectedPredecessorId),
        predecessorTitle: pred?.title,
        type: this.selectedDepType,
        typeName: typeObj?.name,
        lag: this.depLag
      });
      this.selectedPredecessorId = '';
    }
  }

  getSelectedDepDesc() {
    return this.dependencyTypes.find(t => t.id === this.selectedDepType)?.desc || '';
  }

  removeDependency(index: number) {
    this.dependencies.splice(index, 1);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      this.attachments.push({
        name: files[i].name,
        size: (files[i].size / 1024).toFixed(1) + ' KB',
        icon: 'description',
        color: 'blue'
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const payload = {
        ...formValue,
        milestone_id: this.milestoneId,
        vendor_id: formValue.vendorId,
        sub_tasks: this.checklist,
        dependencies: this.dependencies,
        assignees: formValue.assigneeId ? [Number(formValue.assigneeId)] : [],
        // Convert startDate + duration to due_date for backend
        due_date: this.calculateDueDate(formValue.startDate, formValue.duration)
      };

      this.projectService.createTask(this.projectId, payload).subscribe({
        next: (res) => {
          this.save.emit(res.data);
          this.toast.success('Task initialized successfully');
          this.close.emit();
        },
        error: () => this.toast.error('Failed to initialize task')
      });
    }
  }

  private calculateDueDate(startDate: string, duration: number): string {
    const date = new Date(startDate);
    date.setDate(date.getDate() + duration);
    return date.toISOString().split('T')[0];
  }
}