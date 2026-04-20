import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  @Input() initialStatus: string = 'To Do';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  task = {
    title: '',
    description: '',
    priority: 'Medium Priority',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: '',
    assigneeName: '',
    assignee: ''
  };

  priorities = [
    { label: 'High Priority', class: 'bg-red-100 text-red-700' },
    { label: 'Medium Priority', class: 'bg-blue-100 text-blue-700' },
    { label: 'Low Priority', class: 'bg-amber-100 text-amber-700' }
  ];

  teamMembers = [
    { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop' },
    { name: 'Marcus Thorne', avatar: 'https://initials.io/avatar/MT/256' },
    { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy6kguFDpbdu22RXyzkZYEhqX6zZEB61_rkYQakGSdDaKyicjFqwYwX-xV5AeD4JAF9upktLl2kbkNOl3sxreIDp_iEcEWUdbCVjEz9nEXXpojx3wKwjlZF92kfgLYHm5oSnZe9N6e1e2YfXckf7J2h87fMzxNpkEyhzpr3Xf1vGcvdgdN7DSMD0iPxAN7SB3qZK_Q68q__M_ytxq4yEtFU89urVWQwwb00q9zAV-1Fegc3uv9XKviFvE0GKZzh7pIyTXBVUF2Pjd0' }
  ];

  constructor() { }

  ngOnInit() {
    this.task.status = this.initialStatus;
  }

  onAssigneeSelect(event: any) {
    const selected = this.teamMembers.find(m => m.name === event.target.value);
    if (selected) {
      this.task.assigneeName = selected.name;
      this.task.assignee = selected.avatar;
    }
  }

  onSubmit() {
    if (this.task.title.trim()) {
      const priorityObj = this.priorities.find(p => p.label === this.task.priority);
      this.save.emit({
        ...this.task,
        priorityClass: priorityObj?.class || 'bg-slate-100 text-slate-700'
      });
      this.close.emit();
    }
  }
}
