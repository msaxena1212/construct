import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectService } from '../../services/project-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IProjectTask, IMilestone, TaskStatus, IUser } from '../../../../shared/interfaces/project.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskDetail } from "../task-detail/task-detail";
import { AddTask } from "../add-task/add-task";
import { SubtaskProgressPipe } from '../../../../shared/pipes/subtask-progress.pipe';
import { environment } from '../../../../../environments/environment';

interface TaskColumn {
  id: string;
  title: string;
  color: string;
  count: number;
  tasks: IProjectTask[];
}

@Component({
  selector: 'app-task-management',
  standalone: true,
  templateUrl: './task-management.html',
  styleUrl: './task-management.scss',
  imports: [
    DragDropModule,
    CommonModule,
    FormsModule,
    ToastrModule,
    TaskDetail,
    AddTask,
    SubtaskProgressPipe
  ]
})
export class TaskManagement implements OnInit, OnChanges {
  @Input() projectId: string | number = '';
  selectedMember = 'All Members';
  @Input() team_members: IUser[] = [];
  @Input() milestones?: IMilestone[] = [];

  loading = false;
  selectedTask: IProjectTask | null = null;
  showAddTaskModal = false;
  targetStep: string = 'To Do';

  newComment = '';
  isUploading = false;
  activeTaskTab = 'Subtasks';

  selectedMilestoneId: number | null = null;
  allTasks: IProjectTask[] = [];

  milestoneDropdownOpen = false;

  columns: TaskColumn[] = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-400', count: 0, tasks: [] },
    { id: 'inprogress', title: 'In Progress', color: 'bg-amber-500', count: 0, tasks: [] },
    { id: 'review', title: 'Review', color: 'bg-blue-600', count: 0, tasks: [] },
    { id: 'completed', title: 'Completed', color: 'bg-green-500', count: 0, tasks: [] }
  ];

  environment = environment;

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    if (this.projectId) {
      this.fetchTasks();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let projectChanged = false;

    if (changes['projectId'] && !changes['projectId'].isFirstChange()) {
      projectChanged = true;
      this.selectedMilestoneId = null;
      this.allTasks = [];
      this.mapTasksToColumns([]);
    }

    if (changes['milestones']) {
      const currentMilestones = this.milestones || [];

      if (currentMilestones.length > 0) {
        const stillValid = currentMilestones.some(m => m.id === this.selectedMilestoneId);

        if (!this.selectedMilestoneId || !stillValid) {
          this.selectedMilestoneId = currentMilestones[0].id;
        }
      } else {
        this.selectedMilestoneId = null;
      }
    }

    if (projectChanged && this.projectId) {
      this.fetchTasks();
    } else if (this.selectedMilestoneId) {
      this.filterTasks();
    }
  }

  toggleMilestoneDropdown() {
    this.milestoneDropdownOpen = !this.milestoneDropdownOpen;
  }

  getSelectedMilestoneName(): string {
    const found = (this.milestones || []).find(m => m.id === this.selectedMilestoneId);
    return found ? found.name : 'Select Milestone';
  }

  selectMilestone(milestoneId: number) {
    this.selectedMilestoneId = Number(milestoneId);
    this.milestoneDropdownOpen = false;
    this.filterTasks();
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.milestoneDropdownOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.milestoneDropdownOpen = false;
    }
  }

  getAvatarUrl(avatar?: string): string {
    if (!avatar) {
      return 'assets/default-avatar.png';
    }
    if (avatar.startsWith('http')) {
      return avatar;
    }
    return `${this.environment.serverUrl}${avatar}`;
  }

  fetchTasks() {
    this.loading = true;
    this.projectService.getProjectTasks(this.projectId).subscribe({
      next: (res) => {
        this.allTasks = res.data;
        this.filterTasks();
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to load project tasks');
        this.loading = false;
      }
    });
  }

  filterTasks() {
    if (!this.selectedMilestoneId) return;
    const filtered = this.allTasks.filter(
      t => t.milestone_id != null && Number(t.milestone_id) === Number(this.selectedMilestoneId)
    );
    this.mapTasksToColumns(filtered);
  }

  mapTasksToColumns(tasks: IProjectTask[]) {
    this.columns.forEach(col => col.tasks = []);
    tasks.forEach(task => {
      const mappedTask = this.transformTask(task);
      const column = this.columns.find(c => c.title === mappedTask.status);
      if (column) {
        column.tasks.push(mappedTask);
      }
    });
    this.updateCounts();
  }

  transformTask(t: IProjectTask): IProjectTask {
    return {
      ...t,
      priorityClass: this.getPriorityClass(t.priority)
    };
  }

  getPriorityClass(p: string): string {
    switch (p) {
      case 'High Priority': return 'bg-red-100 text-red-700';
      case 'Medium Priority': return 'bg-blue-100 text-blue-700';
      case 'Low Priority': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-500';
    }
  }

  updateCounts() {
    this.columns.forEach(col => col.count = col.tasks.length);
  }

  openAddTaskModal(columnTitle: string = 'To Do') {
    this.targetStep = columnTitle;
    this.showAddTaskModal = true;
  }

  addNewTask(task: any) {
    const newTask = this.transformTask(task);
    this.allTasks.push(newTask);
    const column = this.columns.find(c => c.title === newTask.status);
    if (column) {
      column.tasks.unshift(newTask);
      this.updateCounts();
    }
    this.showAddTaskModal = false;
    this.toastr.success('Task created successfully');
  }

  drop(event: CdkDragDrop<IProjectTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const containerId = event.container.id;
      let newStatus: TaskStatus;

      switch (containerId) {
        case 'todo': newStatus = 'To Do'; break;
        case 'inprogress': newStatus = 'In Progress'; break;
        case 'review': newStatus = 'Review'; break;
        case 'completed': newStatus = 'Completed'; break;
        default: newStatus = 'To Do';
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.projectService.updateTask(task.id, { status: newStatus }).subscribe({
        next: () => {
          task.status = newStatus;
          task.priorityClass = this.getPriorityClass(task.priority);
          this.updateCounts();
        },
        error: () => {
          this.toastr.error('Failed to update task status');
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
          this.updateCounts();
        }
      });
    }
  }

  openTaskDetail(task: IProjectTask) {
    this.selectedTask = task;
    this.activeTaskTab = 'Subtasks';
  }

  closeTaskDetail() {
    this.selectedTask = null;
  }
}