import { Component, OnInit, HostListener } from '@angular/core';
import { ProjectService } from '../projects/services/project-service';
import { IProject, IMilestone } from '../../shared/interfaces/project.interface';
import { Router } from '@angular/router';
import { MeetingServices, IMeeting } from '../calendar/meeting-services';
import { environment } from '../../../environments/environment';
export interface CalendarEvent {
  title: string;
  type: 'project-start' | 'project-end' | 'milestone-start' | 'milestone-end' | 'meeting';
  project?: IProject;
  milestone?: IMilestone;
  meeting?: IMeeting;
}

export interface IAttendeeOption {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isExisting?: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar implements OnInit {
  serverUrl = environment.serverUrl;
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();

  projects: IProject[] = [];
  vendors: any[] = [];
  meetings: IMeeting[] = [];
  calendarDays: any[] = [];

  selectedProject: IProject | null = null;
  showProjectDetails = false;

  showMeetingModal = false;
  isSavingMeeting = false;
  editingMeeting: IMeeting | null = null;
  meetingForm: Partial<IMeeting> & {
    dateInput: string;
    timeInput: string;
    selectedVendorIds: number[];
  } = this.blankForm();

  showDayEventsPanel = false;
  selectedDayEvents: CalendarEvent[] = [];
  selectedDayLabel = '';
  selectedDayFullDate = '';
  showProjectDropdown = false;
  showVendorDropdown = false;
  allAttendeeOptions: IAttendeeOption[] = [];
  filteredAttendeeOptions: IAttendeeOption[] = [];
  showAttendeeSuggestions = false;
  attendeeSearchText = '';
  selectedAttendees: IAttendeeOption[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private meetingService: MeetingServices,
  ) { }

  ngOnInit(): void {
    this.loadVendors();
    this.loadMeetings();
    this.loadProjects();
    this.loadAttendeeOptions();
  }

  private toLocalDateString(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  private parseJsonArray(value: any): any[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; }
      catch { return []; }
    }
    return [];
  }
  failedAvatars = new Set<string>();

  onAvatarError(avatar: string): void {
    this.failedAvatars.add(avatar);
  }
  getAvatarUrl(avatar: string | undefined): string {
    if (!avatar) return '';
    if (avatar.startsWith('http')) return avatar;
    return this.serverUrl + avatar;
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => { this.projects = res.data || []; this.generateCalendar(); },
      error: (err) => console.error('loadProjects:', err),
    });
  }

  loadVendors(): void {
    this.projectService.getVendors().subscribe({
      next: (res) => { this.vendors = res.data || []; },
      error: (err) => console.error('loadVendors:', err),
    });
  }

  loadMeetings(): void {
    this.meetingService.getMeetings().subscribe({
      next: (res) => { this.meetings = res.data || []; this.generateCalendar(); },
      error: (err) => console.error('loadMeetings:', err),
    });
  }

  loadAttendeeOptions(): void {
    this.projectService.getTeamMembers().subscribe({
      next: (res) => {
        const users = res.data || [];
        const seen = new Set<string>();
        const options: IAttendeeOption[] = [];

        users.forEach((member: any) => {
          const email = (member.email || '').trim();
          const key = email || `id-${member.id}`;
          if (!seen.has(key) && email) {
            seen.add(key);
            options.push({
              id: member.id,
              name: `${member.firstname || ''} ${member.lastname || ''}`.trim(),
              email: email,
              avatar: member.avatar || null,
              isExisting: true
            });
          }
        });

        this.allAttendeeOptions = options;
      },
      error: (err) => {
        console.error('getTeamMembers failed, falling back:', err);
        this.loadAttendeeOptionsFromProjects();
      },
    });
  }

  private loadAttendeeOptionsFromProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        const seen = new Set<string>();
        const options: IAttendeeOption[] = [];
        (res.data || []).forEach((project: IProject) => {
          (project.team_members || []).forEach((member: any) => {
            const key = member.email || `id-${member.id}`;
            if (!seen.has(key)) {
              seen.add(key);
              options.push({
                id: member.id,
                name: `${member.firstname || ''} ${member.lastname || ''}`.trim(),
                email: member.email || '',
                avatar: member.avatar,
                isExisting: true
              });
            }
          });
        });
        this.allAttendeeOptions = options;
      },
      error: (err) => console.error('loadAttendeeOptionsFromProjects:', err),
    });
  }
  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      this.calendarDays.push({ date: '', fullDate: '', today: false, events: [] });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const fullDate = this.toLocalDateString(this.currentYear, this.currentMonth, day);
      const events: CalendarEvent[] = [];

      this.projects.forEach(project => {
        const startDate = project.start_date?.split('T')[0];
        const completionDate = project.completion_date?.split('T')[0];
        if (startDate === fullDate)
          events.push({ title: 'Project Started', type: 'project-start', project });
        if (completionDate === fullDate)
          events.push({ title: 'Project Completion', type: 'project-end', project });

        project.milestones?.forEach(ms => {
          const msStart = ms.startDate?.split('T')[0];
          const msEnd = ms.endDate?.split('T')[0];
          if (msStart === fullDate)
            events.push({ title: ms.name, type: 'milestone-start', project, milestone: ms });
          if (msEnd === fullDate)
            events.push({ title: ms.name, type: 'milestone-end', project, milestone: ms });
        });
      });

      this.meetings
        .filter(m => m.date === fullDate)
        .forEach(meeting => events.push({ title: meeting.title, type: 'meeting', meeting }));

      const today = new Date();
      const todayStr = this.toLocalDateString(today.getFullYear(), today.getMonth(), today.getDate());

      this.calendarDays.push({ date: day, fullDate, events, today: fullDate === todayStr });
    }

    if (this.showDayEventsPanel && this.selectedDayFullDate) {
      const refreshed = this.calendarDays.find(d => d.fullDate === this.selectedDayFullDate);
      if (refreshed) this.selectedDayEvents = refreshed.events;
    }
  }

  previousMonth(): void {
    if (--this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
    this.generateCalendar();
  }
  nextMonth(): void {
    if (++this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
    this.generateCalendar();
  }
  goToToday(): void {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  openProjectDetails(project?: IProject): void {
    if (!project) return;
    this.selectedProject = project;
    this.showProjectDetails = true;
  }

  closeProjectDetails(): void {
    this.showProjectDetails = false;
    this.selectedProject = null;
  }

  navigateToProject(id?: number): void {
    if (!id) return;
    this.showProjectDetails = false;
    this.showDayEventsPanel = false;
    this.selectedProject = null;
    this.router.navigate(['/projects', id]);
  }

  openDayEvents(day: any, $event: Event): void {
    $event.stopPropagation();
    if (!day.date || !day.events.length) return;
    this.selectedDayEvents = day.events;
    this.selectedDayFullDate = day.fullDate;
    const [y, m, d] = day.fullDate.split('-').map(Number);
    this.selectedDayLabel = `${d} ${this.months[m - 1]} ${y}`;
    this.showDayEventsPanel = true;
  }

  closeDayEventsPanel(): void { this.showDayEventsPanel = false; }

  blankForm(): Partial<IMeeting> & { dateInput: string; timeInput: string; selectedVendorIds: number[] } {
    return {
      title: '', description: '', attendees: [],
      duration: 30, project_id: undefined,
      vendor_id: undefined, vendor_ids: [],
      meet_link: '', dateInput: '', timeInput: '10:00',
      selectedVendorIds: [],
    };
  }

  openAddMeeting(prefillDate?: string): void {
    this.editingMeeting = null;
    this.meetingForm = this.blankForm();
    this.selectedAttendees = [];
    this.attendeeSearchText = '';
    if (prefillDate) this.meetingForm.dateInput = prefillDate;
    this.showMeetingModal = true;
  }

  openEditMeeting(meeting: IMeeting, $event: Event): void {
    $event.stopPropagation();
    $event.preventDefault();

    const snap: IMeeting = { ...meeting };

    const rawAttendees: string[] = this.parseJsonArray(snap.attendees);
    const parsedAttendees: IAttendeeOption[] = rawAttendees.map(entry => {
      const match = entry.match(/^(.*?)\s*<(.+)>$/);
      if (match) {
        const email = match[2].trim();
        const found = this.allAttendeeOptions.find(x => x.email.toLowerCase() === email.toLowerCase());
        return { id: found?.id || 0, name: match[1].trim(), email, isExisting: !!found };
      }
      const found = this.allAttendeeOptions.find(x => x.email.toLowerCase() === entry.toLowerCase());
      return { id: found?.id || 0, name: entry, email: entry, isExisting: !!found };
    });

    const vendorIds: number[] = [];
    if (snap.vendor_id) vendorIds.push(Number(snap.vendor_id));
    this.parseJsonArray(snap.vendor_ids).forEach((id: any) => {
      const n = Number(id);
      if (!isNaN(n) && !vendorIds.includes(n)) vendorIds.push(n);
    });

    this.editingMeeting = snap;

    this.meetingForm = {
      title: snap.title,
      description: snap.description || '',
      attendees: [...rawAttendees],
      duration: Number(snap.duration) || 30,
      project_id: snap.project_id ? Number(snap.project_id) : undefined,
      vendor_id: snap.vendor_id ? Number(snap.vendor_id) : undefined,
      vendor_ids: [...vendorIds],
      meet_link: snap.meet_link || '',
      dateInput: snap.date,
      timeInput: snap.time || '10:00',
      selectedVendorIds: [...vendorIds],
    };

    this.selectedAttendees = parsedAttendees;
    this.attendeeSearchText = '';
    this.showVendorDropdown = false;

    this.showDayEventsPanel = false;
    this.showMeetingModal = true;
  }

  closeMeetingModal(): void {
    this.showMeetingModal = false;
    this.editingMeeting = null;
    this.meetingForm = this.blankForm();
    this.selectedAttendees = [];
    this.attendeeSearchText = '';
    this.showVendorDropdown = false;
  }


  selectProject(project: any) {
    this.meetingForm.project_id = project.id;
    this.showProjectDropdown = false;
  }

  getSelectedProjectName(): string {
    const project = this.projects.find(
      p => p.id === this.meetingForm.project_id
    );

    return project?.name || '';
  }
  closeTimePicker(input: HTMLInputElement): void {
    setTimeout(() => { input.blur(); }, 2000);
  }

  toggleVendorDropdown($event: Event): void {
    $event.stopPropagation();
    this.showVendorDropdown = !this.showVendorDropdown;
  }

  isVendorSelected(vendorId: number): boolean {
    return (this.meetingForm.selectedVendorIds || []).includes(vendorId);
  }

  toggleVendor(vendorId: number, $event: Event): void {
    $event.stopPropagation();
    $event.preventDefault();
    const ids = [...(this.meetingForm.selectedVendorIds || [])];
    const idx = ids.indexOf(vendorId);
    if (idx === -1) { ids.push(vendorId); } else { ids.splice(idx, 1); }
    this.meetingForm.selectedVendorIds = ids;
    this.meetingForm.vendor_id = ids[0] ?? undefined;
    this.meetingForm.vendor_ids = ids;
    this.showVendorDropdown = false;
  }

  removeVendor(vendorId: number): void {
    const ids = (this.meetingForm.selectedVendorIds || []).filter(id => id !== vendorId);
    this.meetingForm.selectedVendorIds = ids;
    this.meetingForm.vendor_id = ids[0] ?? undefined;
    this.meetingForm.vendor_ids = ids;
  }

  getSelectedVendorNames(): string {
    const ids = this.meetingForm.selectedVendorIds || [];
    return this.vendors.filter(v => ids.includes(v.id)).map(v => v.name).join(', ');
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.showVendorDropdown = false;
    this.showAttendeeSuggestions = false;
  }

  onAttendeeSearch(value: string): void {
    this.attendeeSearchText = value;
    const q = value.trim().toLowerCase();

    if (q.length < 3) {
      this.filteredAttendeeOptions = [];
      this.showAttendeeSuggestions = false;
      return;
    }

    const isEmailSearch = q.includes('@');

    this.filteredAttendeeOptions = this.allAttendeeOptions.filter(opt =>
      !this.selectedAttendees.some(a => a.email === opt.email) &&
      (
        isEmailSearch
          ? (opt.email || '').toLowerCase().includes(q)
          : (opt.name || '').toLowerCase().includes(q)
      )
    );

    this.showAttendeeSuggestions = this.filteredAttendeeOptions.length > 0;
  }

  selectAttendee(opt: IAttendeeOption, $event: Event): void {
    $event.stopPropagation();
    if (!this.selectedAttendees.some(a => a.email === opt.email)) {
      this.selectedAttendees = [...this.selectedAttendees, { ...opt, isExisting: true }];
    }
    this.attendeeSearchText = '';
    this.showAttendeeSuggestions = false;
  }

  removeAttendee(email: string): void {
    this.selectedAttendees = this.selectedAttendees.filter(a => a.email !== email);
  }

  onAttendeeKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const raw = this.attendeeSearchText.trim().replace(/,$/, '');
      if (!raw) return;

      // Name ya email dono se existing user dhundo
      const existing = this.allAttendeeOptions.find(
        x => x.email.toLowerCase() === raw.toLowerCase() ||
          x.name.toLowerCase() === raw.toLowerCase()
      );

      if (existing) {
        if (!this.selectedAttendees.some(a => a.email === existing.email)) {
          this.selectedAttendees = [...this.selectedAttendees, existing];
        }
      } else {
        // Email format check — agar valid email hai
        const isEmail = raw.includes('@');
        if (!this.selectedAttendees.some(a => a.email === raw)) {
          this.selectedAttendees = [
            ...this.selectedAttendees,
            {
              id: 0,
              name: isEmail ? raw.split('@')[0] : raw,  // email se name nikalo
              email: isEmail ? raw : raw,
              isExisting: false
            }
          ];
        }
      }
      this.attendeeSearchText = '';
      this.showAttendeeSuggestions = false;
    }
  }

  saveMeeting(): void {
    if (!this.meetingForm.title || !this.meetingForm.dateInput || this.isSavingMeeting) return;

    const attendeeStrings = this.selectedAttendees.map(a =>
      a.name && a.name !== a.email ? `${a.name} <${a.email}>` : a.email
    );

    const payload: IMeeting = {
      title: this.meetingForm.title!,
      description: this.meetingForm.description,
      date: this.meetingForm.dateInput,
      time: this.meetingForm.timeInput || '10:00',
      duration: this.meetingForm.duration || 30,
      attendees: attendeeStrings,
      meet_link: this.meetingForm.meet_link,
      project_id: this.meetingForm.project_id ? Number(this.meetingForm.project_id) : undefined,
      vendor_id: this.meetingForm.vendor_id ? Number(this.meetingForm.vendor_id) : undefined,
      vendor_ids: this.meetingForm.selectedVendorIds,
    };

    this.isSavingMeeting = true;

    if (this.editingMeeting?.id) {
      this.meetingService.updateMeeting(this.editingMeeting.id, payload).subscribe({
        next: () => {
          this.loadMeetings();
          this.closeMeetingModal();
          this.isSavingMeeting = false;
        },
        error: (err) => { console.error(err); this.isSavingMeeting = false; },
      });
    } else {
      this.meetingService.createMeeting(payload).subscribe({
        next: () => {
          this.loadMeetings();
          this.closeMeetingModal();
          this.isSavingMeeting = false;
        },
        error: (err) => { console.error(err); this.isSavingMeeting = false; },
      });
    }
  }

  deleteMeeting(meeting: IMeeting, $event: Event): void {
    $event.stopPropagation();
    if (!meeting.id) return;
    if (!confirm(`Delete "${meeting.title}"?`)) return;
    this.meetingService.deleteMeeting(meeting.id).subscribe({
      next: () => {
        this.selectedDayEvents = this.selectedDayEvents.filter(e => e.meeting?.id !== meeting.id);
        if (!this.selectedDayEvents.length) this.showDayEventsPanel = false;
        this.loadMeetings();
      },
      error: (err) => console.error(err),
    });
  }

  getVendorName(vendorId: number): string {
    return this.vendors.find(v => v.id === vendorId)?.name || '';
  }

  openMeetLink(url: string | undefined, $event: Event): void {
    $event.stopPropagation();
    if (url) window.open(url, '_blank');
  }

  getProgressColor(p: number): string {
    return p >= 70 ? 'bg-emerald-500' : p >= 30 ? 'bg-amber-500' : 'bg-red-500';
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      'On Track': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      'At Risk': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      'Delayed': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
      'Completed': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      'Not Started': 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    };
    return map[status] || 'bg-slate-100 text-slate-600';
  }

  getTotalBudgetPercent(project: IProject): number {
    const total = Number(project.budget_total) || 0;
    const used = Number(project.budget_used) || 0;
    return total ? Math.min(Math.round((used / total) * 100), 100) : 0;
  }

  formatCurrency(val: any): string {
    const n = Number(val) || 0;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n}`;
  }

  trackByDate(_: number, day: any): string { return day.fullDate; }
}