import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { ToastrService } from 'ngx-toastr';
import { IProjectTask, IUser } from '../../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-task-detail',
  standalone: false,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  @Input() task!: IProjectTask;
  @Output() close = new EventEmitter<void>();

  isEditing = false;
  newComment = '';
  newSubTaskTitle = '';
  showUploadModal = false;
  isUploading = false;

  teamMembers: IUser[] = [];
  loggedInUser = { name: 'James Wilson' };

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.task) {
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
      due_date: this.task.due_date
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
    if (!this.task?.subtasks || this.task.subtasks.length === 0) return 0;
    const completed = this.task.subtasks.filter((i: IProjectTask) => i.is_completed).length;
    return Math.round((completed / this.task.subtasks.length) * 100);
  }

  toggleChecklist(item: IProjectTask) {
    const newStatus = !item.is_completed;
    this.projectService.updateTask(item.id, { is_completed: newStatus }).subscribe({
      next: () => {
        item.is_completed = newStatus;
        this.task.progress = this.checklistProgress;
      }
    });
  }

  addSubTask() {
    if (!this.newSubTaskTitle.trim()) return;

    const payload = {
      title: this.newSubTaskTitle.trim(),
      parent_id: this.task.id,
      status: 'To Do',
      priority: 'Medium Priority'
    };

    this.projectService.createTask(this.task.project_id.toString(), payload).subscribe({
      next: (res) => {
        if (!this.task.subtasks) this.task.subtasks = [];
        this.task.subtasks.push(res.data);
        this.newSubTaskTitle = '';
        this.toastr.success('Sub-task added');
      },
      error: () => this.toastr.error('Error adding sub-task')
    });
  }

  removeSubTask(item: IProjectTask) {
    this.projectService.deleteTask(item.id).subscribe({
      next: () => {
        if (this.task.subtasks) {
          this.task.subtasks = this.task.subtasks.filter((i: IProjectTask) => i.id !== item.id);
        }
        this.toastr.info('Sub-task removed');
      }
    });
  }

  onSubTaskChange(item: IProjectTask, newTitle: string) {
    if (item.title !== newTitle) {
      this.projectService.updateTask(item.id, { title: newTitle }).subscribe({
        next: () => item.title = newTitle
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
          user: { id: 0, firstname: 'You', lastname: '' },
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
}