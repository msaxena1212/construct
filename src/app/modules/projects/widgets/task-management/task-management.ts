import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectService } from '../../services/project-service';
import { ToastrService } from 'ngx-toastr';
import { IProjectTask } from '../../../../shared/interfaces/project.interface';

interface TaskColumn {
  id: string;
  title: string;
  color: string;
  count: number;
  tasks: IProjectTask[];
}

@Component({
  selector: 'app-task-management',
  standalone: false,
  templateUrl: './task-management.html',
  styleUrl: './task-management.scss',
})
export class TaskManagement implements OnInit {
  @Input() projectId: string | number = '';
  @Input() selectedMember = 'All Members';

  loading = false;
  selectedTask: IProjectTask | null = null;
  showAddTaskModal = false;
  targetStep: string = 'To Do';

  newComment = '';
  isUploading = false;
  activeTaskTab = 'Subtasks'; // Subtasks, Attachments, Discussion, History

  columns: TaskColumn[] = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-400', count: 0, tasks: [] },
    { id: 'inprogress', title: 'In Progress', color: 'bg-amber-500', count: 0, tasks: [] },
    { id: 'review', title: 'Review', color: 'bg-blue-600', count: 0, tasks: [] },
    { id: 'completed', title: 'Completed', color: 'bg-green-500', count: 0, tasks: [] }
  ];

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.projectId) {
      this.fetchTasks();
    }
  }

  fetchTasks() {
    this.loading = true;
    this.projectService.getProjectTasks(this.projectId).subscribe({
      next: (res) => {
        this.mapTasksToColumns(res.data);
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to load project tasks');
        this.loading = false;
      }
    });
  }

  mapTasksToColumns(tasks: IProjectTask[]) {
    // Reset tasks
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
      priorityClass: this.getPriorityClass(t.priority),
      is_completed: t.status === 'Completed'
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

  addNewTask(taskData: any) {
    const payload = {
      ...taskData,
      status: this.targetStep
    };

    this.projectService.createTask(this.projectId, payload).subscribe({
      next: (res) => {
        const newTask = this.transformTask(res.data);
        const column = this.columns.find(c => c.title === newTask.status);
        if (column) {
          column.tasks.unshift(newTask);
          this.updateCounts();
        }
        this.showAddTaskModal = false;
        this.toastr.success('Task created successfully');
      },
      error: () => this.toastr.error('Error creating task')
    });
  }

  drop(event: CdkDragDrop<IProjectTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus: any = event.container.id === 'todo' ? 'To Do'
        : event.container.id === 'inprogress' ? 'In Progress'
          : event.container.id === 'review' ? 'Review' : 'Completed';

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Persistence
      this.projectService.updateTask(task.id, { status: newStatus }).subscribe({
        next: () => {
          task.status = newStatus;
          task.priorityClass = this.getPriorityClass(task.priority);
          this.updateCounts();
        },
        error: () => {
          this.toastr.error('Failed to update task status');
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
