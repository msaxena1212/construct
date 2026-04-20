import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  standalone: false,
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  @Input() task: any;
  @Output() close = new EventEmitter<void>();

  isEditing = false;
  newComment = '';

  teamMembers = [
    { name: 'Elena Rodriguez', role: 'Lead Structural Eng.', avatar: 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop' },
    { name: 'Marcus Thorne', role: 'Senior Manager', avatar: 'https://initials.io/avatar/MT/256' },
    { name: 'Sarah Chen', role: 'Editor', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy6kguFDpbdu22RXyzkZYEhqX6zZEB61_rkYQakGSdDaKyicjFqwYwX-xV5AeD4JAF9upktLl2kbkNOl3sxreIDp_iEcEWUdbCVjEz9nEXXpojx3wKwjlZF92kfgLYHm5oSnZe9N6e1e2YfXckf7J2h87fMzxNpkEyhzpr3Xf1vGcvdgdN7DSMD0iPxAN7SB3qZK_Q68q__M_ytxq4yEtFU89urVWQwwb00q9zAV-1Fegc3uv9XKviFvE0GKZzh7pIyTXBVUF2Pjd0' }
  ];

  loggedInUser = { name: 'James Wilson' };
  showUploadModal = false;
  newSubTaskTitle = '';

  checklist = [
    { title: 'Verify rebar spacing against blueprint v4.2', completed: true },
    { title: 'Check corrosion protection coating integrity', completed: true },
    { title: 'Document weld points in the Northeast corner', completed: false },
    { title: 'Final structural engineer sign-off', completed: false }
  ];

  activities: any[] = [
    { author: 'Marcus Thorne', action: 'updated status to In Review', time: '2 hours ago', isSystem: false },
    { author: 'Elena Rodriguez', action: 'attached blueprint_v4.pdf', time: 'Yesterday 4:32 PM', isSystem: false },
    { author: 'System', action: 'initialized task', time: 'Oct 12th 10:15 AM', isSystem: true }
  ];

  attachments: any[] = [
    { name: 'blueprint_v4.pdf', size: '4.2 MB', date: 'Oct 12', icon: 'picture_as_pdf', color: 'red' },
    { name: 'site_survey_photo.jpg', size: '1.8 MB', date: 'Oct 13', icon: 'image', color: 'blue' }
  ];

  ngOnInit() {
    if (this.task && !this.task.assigneeName) {
      this.task.assigneeName = 'Elena Rodriguez';
    }
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  onClose() {
    this.close.emit();
  }

  logActivity(action: string) {
    this.activities.unshift({
      author: this.loggedInUser.name,
      action: action,
      time: 'Just now',
      isSystem: false
    });
  }

  get checklistProgress() {
    if (this.checklist.length === 0) return 0;
    const completed = this.checklist.filter(i => i.completed).length;
    return Math.round((completed / this.checklist.length) * 100);
  }

  toggleChecklist(item: any) {
    item.completed = !item.completed;
    if (this.task) {
      this.task.progress = this.checklistProgress;
    }
  }

  addSubTask() {
    if (!this.newSubTaskTitle.trim()) return;
    this.checklist.push({ title: this.newSubTaskTitle.trim(), completed: false });
    this.logActivity(`added sub-task: "${this.newSubTaskTitle.trim()}"`);
    this.newSubTaskTitle = '';
    if (this.task) {
      this.task.progress = this.checklistProgress;
    }
  }

  removeSubTask(item: any) {
    this.checklist = this.checklist.filter(i => i !== item);
    this.logActivity(`deleted sub-task: "${item.title}"`);
    if (this.task) {
      this.task.progress = this.checklistProgress;
    }
  }

  onSubTaskChange(item: any, newTitle: string) {
    if (item.title !== newTitle) {
      item.title = newTitle;
      this.logActivity(`updated a sub-task`);
    }
  }

  postComment() {
    if (!this.newComment.trim()) return;
    this.logActivity(`commented: "${this.newComment}"`);
    this.newComment = '';
  }

  openUploadModal() {
    this.showUploadModal = true;
  }

  simulateUpload() {
    this.attachments.push({
      name: `new_document_${this.attachments.length + 1}.pdf`,
      size: '1.1 MB',
      date: 'Just now',
      icon: 'description',
      color: 'slate'
    });
    this.logActivity(`attached new document`);
    this.showUploadModal = false;
  }


  onAssigneeSelect(event: any) {
    const selected = this.teamMembers.find(m => m.name === event.target.value);
    if (selected && this.task) {
      this.task.assigneeName = selected.name;
      this.task.assignee = selected.avatar; // Assuming task.assignee stores avatar URL
    }
  }
}
