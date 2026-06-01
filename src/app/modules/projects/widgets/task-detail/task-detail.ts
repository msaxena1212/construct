import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { ToastrService } from 'ngx-toastr';
import { IProjectSubTask, IProjectTask, IUser, IProjectTaskDependency, IProject } from '../../../../shared/interfaces/project.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDialogComponent } from '../../../../shared/components/common-dialog/common-dialog';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
  imports: [
    CommonModule,
    FormsModule,
    CommonDialogComponent,
  ]
})
export class TaskDetail implements OnInit {
  @Input() task!: IProjectTask;
  @Output() close = new EventEmitter<void>();

  private projectService = inject(ProjectService);
  private toastr = inject(ToastrService);
  allTasks: IProjectTask[] = [];

  isEditing = false;
  newComment = '';
  newSubTaskTitle = '';
  showUploadModal = false;
  showDeleteSubTaskModal = false;
  subTaskToDelete: number | null = null;
  isUploading = false;

  selectedPredecessorId: any = '';
  selectedDepType: 'FS' | 'SS' | 'FF' | 'SF' = 'FS';
  depLag = 0;

  dependencyTypes = [
    { id: 'FS', name: 'Finish-to-Start (FS)', desc: 'Predecessor must finish before Successor can start' },
    { id: 'SS', name: 'Start-to-Start (SS)', desc: 'Predecessor must start before Successor can start' },
    { id: 'FF', name: 'Finish-to-Finish (FF)', desc: 'Predecessor must finish before Successor can finish' },
    { id: 'SF', name: 'Start-to-Finish (SF)', desc: 'Predecessor must start before Successor can finish' }
  ];

  teamMembers: IUser[] = [];
  loggedInUser = { name: 'James Wilson' };

  constructor() { }

  ngOnInit() {
    if (this.task) {
      this.projectService.getProjectTasks(this.task.project_id).subscribe((res: any) => {
        this.allTasks = res.data;
      });
      this.fetchTeamMembers();
    }
  }

  fetchTeamMembers() {
    this.projectService.getProjectById(this.task.project_id.toString()).subscribe({
      next: (res) => {
        this.teamMembers = res.data.team_members || [];
      }
    });
  }

  toggleEditMode() {
    if (this.isEditing) {
      this.saveTaskUpdates();
    }
    this.isEditing = !this.isEditing;
  }

  saveTaskUpdates() {
    const payload = {
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      status: this.task.status,
      due_date: this.task.due_date,
      dependencies: this.task.dependencies
    };

    this.projectService.updateTask(this.task.id, payload).subscribe({
      next: () => this.toastr.success('Task details updated'),
      error: () => this.toastr.error('Failed to update task details')
    });
  }

  onClose() {
    this.close.emit();
  }

  get checklistProgress() {
    if (!this.task?.sub_tasks || this.task.sub_tasks.length === 0) return 0;
    const completed = this.task.sub_tasks.filter((i: IProjectSubTask) => i.completed).length;
    return Math.round((completed / this.task.sub_tasks.length) * 100);
  }

  toggleChecklist(item: IProjectSubTask) {
    const newStatus = !item.completed;
    this.projectService.updateSubTask(item?.id!, { completed: newStatus }).subscribe({
      next: () => {
        item.completed = newStatus;
        this.task.progress = this.checklistProgress;
      }
    });
  }

  addSubTask() {
    if (!this.newSubTaskTitle.trim()) return;

    this.projectService.createSubTask(this.task.id, this.newSubTaskTitle.trim()).subscribe({
      next: (res) => {
        if (!this.task.sub_tasks) this.task.sub_tasks = [];
        this.task.sub_tasks.push(res.data as unknown as IProjectSubTask);
        this.newSubTaskTitle = '';
        this.toastr.success('Sub-task added');
      },
      error: () => this.toastr.error('Error adding sub-task')
    });
  }

  openDeleteSubTaskDialog(subTaskId: number) {
    this.subTaskToDelete = subTaskId;
    this.showDeleteSubTaskModal = true;
  }

  closeDeleteSubTaskDialog() {
    this.showDeleteSubTaskModal = false;
    this.subTaskToDelete = null;
  }

  confirmDeleteSubTask() {
    if (!this.subTaskToDelete) return;

    this.removeSubTask(this.subTaskToDelete);
  }

  removeSubTask(subTaskId: number) {
    this.projectService.deleteSubTask(subTaskId).subscribe({
      next: () => {
        if (this.task.sub_tasks) {
          this.task.sub_tasks = this.task.sub_tasks.filter((i: IProjectSubTask) => i.id !== subTaskId);
        }
        this.closeDeleteSubTaskDialog();
        this.toastr.info('Sub-task removed');
      }
    });
  }

  onSubTaskChange(item: IProjectSubTask, newTitle: string) {
    if (item.title !== newTitle) {
      this.projectService.updateSubTask(item?.id!, { title: newTitle }).subscribe({
        next: () => item.title = newTitle,
        error: () => this.toastr.error('Error updating sub-task')
      });
    }
  }

  postComment() {
    if (!this.newComment.trim()) return;

    this.projectService.addTaskComment(this.task.id, this.newComment).subscribe({
      next: (res) => {
        if (!this.task.comments) this.task.comments = [];
        this.task.comments.unshift(res.data);

        if (!this.task.activities) this.task.activities = [];
        this.task.activities.unshift({
          id: Date.now(),
          task_id: Number(this.task.id),
          user_id: 0,
          user: { id: 0, firstname: 'You', lastname: '' } as unknown as IUser,
          detail: `commented: "${this.newComment}"`,
          createdAt: new Date().toISOString(),
          action_type: 'COMMENT'
        });

        this.newComment = '';
        this.toastr.success('Comment posted');
      }
    });
  }

  openUploadModal() {
    this.showUploadModal = true;
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('attachments', files[i]);
    }

    this.isUploading = true;
    this.projectService.uploadTaskAttachment(this.task.id, formData).subscribe({
      next: (res) => {
        if (!this.task.attachments) this.task.attachments = [];
        this.task.attachments.push(...res.data);
        this.isUploading = false;
        this.showUploadModal = false;
        this.toastr.success('Files uploaded');
      },
      error: () => {
        this.isUploading = false;
        this.toastr.error('Upload failed');
      }
    });
  }

  onAssigneeSelect(event: any) {
    const userId = event.target.value;
    this.projectService.updateTask(this.task.id, { assignees: [userId] }).subscribe({
      next: () => {
        this.toastr.success('Assignee updated');
      }
    });
  }

  addDependency() {
    if (!this.selectedPredecessorId) return;

    const pred = this.allTasks.find(t => t.id === Number(this.selectedPredecessorId));
    if (!pred) return;

    if (!this.task.dependencies) this.task.dependencies = [];

    // Check if already exists
    if (this.task.dependencies.some(d => d.predecessor_id === Number(this.selectedPredecessorId))) {
      this.toastr.warning('Dependency already exists');
      return;
    }

    this.task.dependencies.push({
      id: 0,
      task_id: this.task.id,
      predecessor_id: Number(this.selectedPredecessorId),
      type: this.selectedDepType,
      lag: this.depLag
    });

    this.selectedPredecessorId = '';
    this.depLag = 0;
  }

  getSelectedDepDesc() {
    return this.dependencyTypes.find(t => t.id === this.selectedDepType)?.desc || '';
  }

  removeDependency(dep: any) {
    if (this.task.dependencies) {
      this.task.dependencies = this.task.dependencies.filter((d: any) => d !== dep);
    }
  }

  getTaskTitle(id: number | string) {
    const taskId = typeof id === 'string' ? Number(id) : id;
    return this.allTasks.find((t: IProjectTask) => t.id === taskId)?.title || `Task #${id}`;
  }
}
