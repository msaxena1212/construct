import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project-service';
import { IUser } from '../../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask implements OnInit {
  @Input() projectId: string | number = '';
  @Input() initialStatus: string = 'To Do';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  task = {
    title: '',
    description: '',
    priority: 'Medium Priority' as 'High Priority' | 'Medium Priority' | 'Low Priority',
    date: new Date().toISOString().split('T')[0],
    status: '' as 'To Do' | 'In Progress' | 'Review' | 'Completed',
    assigneeId: ''
  };

  priorities = [
    { label: 'High Priority', class: 'bg-red-100 text-red-700' },
    { label: 'Medium Priority', class: 'bg-blue-100 text-blue-700' },
    { label: 'Low Priority', class: 'bg-amber-100 text-amber-700' }
  ];

  teamMembers: IUser[] = [];

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.task.status = this.initialStatus as any;
    if (this.projectId) {
      this.fetchTeamMembers();
    }
  }

  fetchTeamMembers() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.teamMembers = res.data.team_members || [];
      }
    });
  }

  onAssigneeSelect(event: any) {
    this.task.assigneeId = event.target.value;
  }

  onSubmit() {
    if (this.task.title.trim()) {
      const payload = {
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        status: this.task.status,
        due_date: this.task.date,
        assignees: this.task.assigneeId ? [this.task.assigneeId] : []
      };

      this.projectService.createTask(this.projectId, payload).subscribe({
        next: (res) => {
          this.save.emit(res.data);
          this.toastr.success('Task created successfully');
          this.close.emit();
        },
        error: () => this.toastr.error('Failed to create task')
      });
    }
  }
}
