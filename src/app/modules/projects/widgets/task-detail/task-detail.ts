import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { ToastrService } from 'ngx-toastr';
import { IProjectSubTask, IProjectTask, IUser, IProjectTaskDependency, IProject } from '../../../../shared/interfaces/project.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDialogComponent } from '../../../../shared/components/common-dialog/common-dialog';
import { environment } from '../../../../../environments/environment';

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
  showAllAttachments = false;

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
  milestones: any;
  subMilestones: any;

  constructor() { }

  ngOnInit() {
    if (this.task) {
      this.projectService.getProjectTasks(this.task.project_id).subscribe((res: any) => {
        this.allTasks = res.data;
      });
      this.fetchTeamMembers();

    }

  }

  environment = environment;

  getAvatarUrl(avatar?: string): string {
    if (!avatar) {
      return 'assets/default-avatar.png';
    }

    if (avatar.startsWith('http')) {
      return avatar;
    }

    return `${this.environment.serverUrl}${avatar}`;
  }

  onMilestoneChange(event: any) {
    const milestoneId = event.target.value || this.task.milestone_id;

    const milestone = this.milestones.find(
      (m: any) => m.id == milestoneId
    );

    this.subMilestones = milestone?.children || [];
  }

  fetchTeamMembers() {
    this.projectService.getProjectById(this.task.project_id.toString()).subscribe({
      next: (res: any) => {
        this.teamMembers = res.data.team_members || [];
        this.milestones = res.data.milestones_with_child || [];
        this.onMilestoneChange({ target: { value: this.task.milestone_id } });
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
    if (!this.isEditing) return;

    const newStatus = !item.completed;
    this.projectService.updateSubTask(item?.id!, { completed: newStatus }).subscribe({
      next: () => {
        item.completed = newStatus;
        this.task.progress = this.checklistProgress;
      }
    });
  }

  addSubTask() {
    if (!this.isEditing || !this.newSubTaskTitle.trim()) return;

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
    if (!this.isEditing) return;

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
    if (!this.isEditing) return;

    if (item.title !== newTitle) {
      this.projectService.updateSubTask(item?.id!, { title: newTitle }).subscribe({
        next: () => item.title = newTitle,
        error: () => this.toastr.error('Error updating sub-task')
      });
    }
  }

  postComment() {
    const trimmedComment = this.newComment?.trim();
    if (!trimmedComment) return;

    this.projectService.addTaskComment(this.task.id, trimmedComment).subscribe({
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
      },
      error: () => this.toastr.error('Error posting comment')
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

  // ---------- New helpers added to match the redesigned UI ----------

  /** Badge color classes for the task priority pill (High/Medium/Low). */
  priorityBadgeClass(): string {
    switch ((this.task?.priority || '').toLowerCase()) {
      case 'high': return 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400';
      case 'medium': return 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
      case 'low': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
      default: return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
    }
  }

  /** Derives a display status for a sub-task purely from the existing `completed` boolean. */
  subTaskStatus(item: IProjectSubTask): string {
    return item.completed ? 'Completed' : 'Pending';
  }

  subTaskStatusClass(item: IProjectSubTask): string {
    return item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500';
  }

  /** Color classes for the FS/SS/FF/SF dependency-type chip. */
  depTypeClass(type: string): string {
    switch (type) {
      case 'FS': return 'bg-blue-100 text-blue-600';
      case 'SS': return 'bg-emerald-100 text-emerald-600';
      case 'FF': return 'bg-violet-100 text-violet-600';
      case 'SF': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  }

  /** Icon + colors for an attachment, based on its file extension. */
  getFileIconMeta(name: string): { icon: string; bg: string; color: string } {
    const ext = name?.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return { icon: 'picture_as_pdf', bg: 'bg-red-100', color: 'text-red-600' };
      case 'xlsx':
      case 'xls':
      case 'csv':
        return { icon: 'table_chart', bg: 'bg-emerald-100', color: 'text-emerald-600' };
      case 'doc':
      case 'docx':
        return { icon: 'description', bg: 'bg-blue-100', color: 'text-blue-600' };
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return { icon: 'image', bg: 'bg-violet-100', color: 'text-violet-600' };
      default:
        return { icon: 'draft', bg: 'bg-slate-100', color: 'text-slate-500' };
    }
  }

  /** Attachments shown in the card: first 3 unless "View all" was clicked. */
  get visibleAttachments() {
    if (!this.task?.attachments) return [];
    return this.showAllAttachments ? this.task.attachments : this.task.attachments.slice(0, 3);
  }

  toggleAttachmentsView() {
    this.showAllAttachments = !this.showAllAttachments;
  }
}