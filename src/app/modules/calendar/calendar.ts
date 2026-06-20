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
  selectedProjectIds: number[] = [];
  showProjectFilterDropdown = false;
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  hours = Array.from({ length: 24 }, (_, i) => i);
  projects: IProject[] = [];
  vendors: any[] = [];
  meetings: IMeeting[] = [];
  calendarDays: any[] = [];
  currentView: 'Day' | 'Week' | 'Month' = 'Month';
  selectedProject: IProject | null = null;
  selectedMilestone: IMilestone | null = null;
  showProjectDetails = false;
  isNavigationChanged = false;
  prefilledProjectId: number | undefined = undefined;

  showMilestonesInPanel = true;

  selectedDate = new Date();
  weekStart!: Date;
  weekEnd!: Date;
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
    this.calculateWeekRange();
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
      next: (res) => {
        this.projects = res.data || [];
        if (!this.selectedProjectIds.length) {
          this.selectedProjectIds = this.projects.map(p => Number(p.id));
        }
        this.generateCalendar();
      },
      error: (err) => console.error('loadProjects:', err),
    });
  }

  loadVendors(): void {
    this.projectService.getVendors().subscribe({
      next: (res) => { this.vendors = res.data || []; this.generateCalendar(); },
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
              email,
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

  private getEventsForDate(fullDate: string): CalendarEvent[] {
    const events: CalendarEvent[] = [];

    this.filteredProjects.forEach(project => {
      const startDate = project.createdAt?.split('T')[0];
      const completionDate = project.completion_date?.split('T')[0];

      if (startDate === fullDate) {
        events.push({ title: 'Project Started', type: 'project-start', project });
      }
      if (completionDate === fullDate) {
        events.push({ title: 'Project Completion', type: 'project-end', project });
      }

      project.milestones?.forEach(ms => {
        const msStart = ms.startDate?.split('T')[0];
        const msEnd = ms.endDate?.split('T')[0];
        if (msStart === fullDate) {
          events.push({ title: ms.name, type: 'milestone-start', project, milestone: ms });
        }
        if (msEnd === fullDate) {
          events.push({ title: ms.name, type: 'milestone-end', project, milestone: ms });
        }
      });
    });

    this.meetings
      .filter(m => {
        if (m.date?.split('T')[0] !== fullDate) return false;
        return m.project_id
          ? this.selectedProjectIds.includes(Number(m.project_id))
          : this.isAllProjectsSelected;
      })
      .forEach(meeting => {
        const project = this.projects.find(p => Number(p.id) === Number(meeting.project_id));
        const vendor = this.vendors.find(v => Number(v.id) === Number(meeting.vendor_id));
        events.push({
          title: meeting.title,
          type: 'meeting',
          meeting: { ...meeting, project, vendor } as any
        });
      });

    return events;
  }

  generateCalendar(): void {
    switch (this.currentView) {
      case 'Day': this.generateDayView(); break;
      case 'Week': this.generateWeekView(); break;
      default: this.generateMonthView(); break;
    }
    this.refreshDayEventsPanel();
  }

  private refreshDayEventsPanel(): void {
    if (this.showDayEventsPanel && this.selectedDayFullDate) {
      const refreshed = this.calendarDays.find(d => d.fullDate === this.selectedDayFullDate);
      if (refreshed) this.selectedDayEvents = [...refreshed.events];
    }
  }

  formatHour(hour: number): string {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  }

  getDayOfWeek(fullDate: string): number {
    if (!fullDate) return 0;
    return new Date(fullDate).getDay();
  }

  getEventTop(time: string | undefined): number {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return (h * 60 + (m || 0)) * (64 / 60);
  }

  getEventHeight(duration: number | undefined): number {
    return Math.max((duration || 30) * (64 / 60), 24);
  }

  getAllDayEventTop(event: CalendarEvent, day: any): number {
    const nonMeetingEvents = day.events.filter((e: CalendarEvent) => e.type !== 'meeting');
    const idx = nonMeetingEvents.indexOf(event);
    return idx * 32;
  }

  get filteredProjects(): IProject[] {
    return this.projects.filter(p => this.selectedProjectIds.includes(Number(p.id)));
  }

  get isAllProjectsSelected(): boolean {
    return this.projects.length > 0 &&
      this.selectedProjectIds.length === this.projects.length;
  }

  toggleAllProjects(): void {
    if (this.isAllProjectsSelected) {
      this.selectedProjectIds = [];
    } else {
      this.selectedProjectIds = this.projects.map(p => Number(p.id));
    }
    this.generateCalendar();
  }

  selectAllProjects(): void {
    this.selectedProjectIds = this.projects.map(p => Number(p.id));
    this.generateCalendar();
  }

  toggleProjectFilter(projectId: number): void {
    const idx = this.selectedProjectIds.indexOf(projectId);
    if (idx === -1) {
      this.selectedProjectIds.push(projectId);
    } else {
      this.selectedProjectIds.splice(idx, 1);
    }
    this.generateCalendar();
  }

  isProjectFilterSelected(projectId: number): boolean {
    return this.selectedProjectIds.includes(projectId);
  }
  currentTimeVisible(): boolean {
    return this.calendarDays.some((d: any) => d.today);
  }

  getCurrentTimeTop(): number {
    const now = new Date();
    return (now.getHours() * 60 + now.getMinutes()) * (64 / 60);
  }

  openDayEventsForEvent(event: CalendarEvent, day: any, $event: Event): void {
    $event.stopPropagation();
    this.selectedDayEvents = [...day.events];
    this.selectedDayFullDate = day.fullDate;
    const [y, m, d] = day.fullDate.split('-').map(Number);
    this.selectedDayLabel = `${d} ${this.months[m - 1]} ${y}`;
    this.showDayEventsPanel = true;
  }

  generateDayView(): void {
    this.calendarDays = [];
    const d = this.selectedDate;
    const fullDate = this.toLocalDateString(d.getFullYear(), d.getMonth(), d.getDate());
    const todayStr = this.toLocalDateString(
      this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()
    );
    this.calendarDays.push({
      date: d.getDate(), fullDate, today: fullDate === todayStr,
      events: this.getEventsForDate(fullDate)
    });
  }

  generateWeekView(): void {
    this.calendarDays = [];
    const todayStr = this.toLocalDateString(
      this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()
    );
    for (let i = 0; i < 7; i++) {
      const current = new Date(this.weekStart);
      current.setDate(this.weekStart.getDate() + i);
      const fullDate = this.toLocalDateString(current.getFullYear(), current.getMonth(), current.getDate());
      this.calendarDays.push({
        date: current.getDate(), fullDate, today: fullDate === todayStr,
        events: this.getEventsForDate(fullDate)
      });
    }
  }

  generateMonthView(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const todayStr = this.toLocalDateString(
      this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()
    );

    for (let i = 0; i < firstDay.getDay(); i++) {
      this.calendarDays.push({ date: '', fullDate: '', today: false, events: [] });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const fullDate = this.toLocalDateString(this.currentYear, this.currentMonth, day);
      this.calendarDays.push({
        date: day, fullDate, events: this.getEventsForDate(fullDate), today: fullDate === todayStr
      });
    }
  }

  previousMonth(): void {
    if (this.currentView === 'Day') {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() - 1);
      this.generateCalendar();
    } else if (this.currentView === 'Week') {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() - 7);
      this.calculateWeekRange();
      this.generateCalendar();
    } else {
      this.currentMonth--;
      if (this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
      this.generateCalendar();
    }
    this.isNavigationChanged = !this.isTodaySelected();
  }

  nextMonth(): void {
    if (this.currentView === 'Day') {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() + 1);
      this.generateCalendar();
    } else if (this.currentView === 'Week') {
      this.selectedDate = new Date(this.selectedDate);
      this.selectedDate.setDate(this.selectedDate.getDate() + 7);
      this.calculateWeekRange();
      this.generateCalendar();
    } else {
      this.currentMonth++;
      if (this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
      this.generateCalendar();
    }
    this.isNavigationChanged = !this.isTodaySelected();
  }

  goToToday(): void {
    this.selectedDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.calculateWeekRange();
    this.generateCalendar();
    this.isNavigationChanged = false;
  }

  changeView(view: 'Day' | 'Week' | 'Month'): void {
    this.currentView = view;
    this.isNavigationChanged = !this.isTodaySelected();
    if (view === 'Week') this.calculateWeekRange();
    this.generateCalendar();
  }

  private isTodaySelected(): boolean {
    const todayStr = this.toLocalDateString(
      this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()
    );
    if (this.currentView === 'Day') {
      const selStr = this.toLocalDateString(
        this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()
      );
      return selStr === todayStr;
    }
    if (this.currentView === 'Week') {
      const today = new Date(this.currentDate);
      today.setHours(0, 0, 0, 0);
      return today >= this.weekStart && today <= this.weekEnd;
    }

    return this.currentMonth === this.currentDate.getMonth() &&
      this.currentYear === this.currentDate.getFullYear();
  }

  calculateWeekRange(): void {
    const date = new Date(this.selectedDate);
    const day = date.getDay();
    this.weekStart = new Date(date);
    this.weekStart.setDate(date.getDate() - day);
    this.weekStart.setHours(0, 0, 0, 0);
    this.weekEnd = new Date(this.weekStart);
    this.weekEnd.setDate(this.weekStart.getDate() + 6);
    this.weekEnd.setHours(23, 59, 59, 999);
  }

  openProjectDetails(project?: IProject, milestone?: IMilestone, showMilestones: boolean = true): void {
    if (!project) return;
    this.selectedProject = project;
    this.selectedMilestone = milestone || null;
    this.showMilestonesInPanel = showMilestones;
    this.showProjectDetails = true;
  }

  closeProjectDetails(): void {
    this.showProjectDetails = false;
    this.selectedProject = null;
    this.selectedMilestone = null;
    this.showMilestonesInPanel = true;
  }

  get displayedMilestones(): IMilestone[] {
    if (this.selectedMilestone) {
      return [this.selectedMilestone];
    }
    return this.selectedProject?.milestones || [];
  }

  navigateToProject(id?: number): void {
    if (!id) return;
    this.showProjectDetails = false;
    this.showDayEventsPanel = false;
    this.selectedProject = null;
    this.selectedMilestone = null;
    this.router.navigate(['master/projects', id]);
  }

  navigateToProjectDetails(project: any, milestone?: IMilestone): void {
    if (!project) return;
    this.selectedProject = project;
    this.selectedMilestone = milestone || null;
    this.showProjectDetails = true;
  }

  openDayEvents(day: any, $event: Event): void {
    $event.stopPropagation();
    if (!day.date || !day.events.length) return;
    this.selectedDayEvents = [...day.events];
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
    this.prefilledProjectId = undefined;
    if (prefillDate) this.meetingForm.dateInput = prefillDate;
    this.showMeetingModal = true;
  }

  openAddMeetingForProject(project: IProject | null): void {
    if (!project?.id) return;
    this.editingMeeting = null;
    this.meetingForm = this.blankForm();
    this.selectedAttendees = [];
    this.attendeeSearchText = '';
    this.prefilledProjectId = Number(project.id);
    this.meetingForm.project_id = Number(project.id);
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
    this.prefilledProjectId = undefined;
    this.meetingForm = {
      title: snap.title, description: snap.description || '',
      attendees: [...rawAttendees], duration: Number(snap.duration) || 30,
      project_id: snap.project_id ? Number(snap.project_id) : undefined,
      vendor_id: snap.vendor_id ? Number(snap.vendor_id) : undefined,
      vendor_ids: [...vendorIds], meet_link: snap.meet_link || '',
      dateInput: snap.date, timeInput: snap.time || '10:00',
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
    this.prefilledProjectId = undefined;
  }

  selectProject(project: any): void {
    this.meetingForm.project_id = project.id;
    this.showProjectDropdown = false;
  }

  getSelectedProjectName(): string {
    const project = this.projects.find(p => Number(p.id) === Number(this.meetingForm.project_id));
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

  get selectedProjectsLabel(): string {
    if (this.isAllProjectsSelected) return 'All Projects';
    if (this.selectedProjectIds.length === 0) return 'No Projects';
    if (this.selectedProjectIds.length === 1) {
      const project = this.projects.find(p => Number(p.id) === this.selectedProjectIds[0]);
      return project?.name || '1 Project';
    }
    return `${this.selectedProjectIds.length} Projects`;
  }
  @HostListener('document:click')
  onDocumentClick(): void {
    this.showVendorDropdown = false;
    this.showProjectDropdown = false;
    this.showAttendeeSuggestions = false;
    this.showProjectFilterDropdown = false;
  }

  onAttendeeSearch(value: string): void {
    this.attendeeSearchText = value;
    const q = value.trim().toLowerCase();
    if (q.length < 3) { this.filteredAttendeeOptions = []; this.showAttendeeSuggestions = false; return; }
    const isEmailSearch = q.includes('@');
    this.filteredAttendeeOptions = this.allAttendeeOptions.filter(opt =>
      !this.selectedAttendees.some(a => a.email === opt.email) &&
      (isEmailSearch ? (opt.email || '').toLowerCase().includes(q) : (opt.name || '').toLowerCase().includes(q))
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
      const existing = this.allAttendeeOptions.find(
        x => x.email.toLowerCase() === raw.toLowerCase() || x.name.toLowerCase() === raw.toLowerCase()
      );
      if (existing) {
        if (!this.selectedAttendees.some(a => a.email === existing.email))
          this.selectedAttendees = [...this.selectedAttendees, existing];
      } else {
        const isEmail = raw.includes('@');
        if (!this.selectedAttendees.some(a => a.email === raw))
          this.selectedAttendees = [...this.selectedAttendees,
          { id: 0, name: isEmail ? raw.split('@')[0] : raw, email: raw, isExisting: false }];
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
        next: () => { this.loadMeetings(); this.closeMeetingModal(); this.isSavingMeeting = false; },
        error: (err) => { console.error(err); this.isSavingMeeting = false; },
      });
    } else {
      this.meetingService.createMeeting(payload).subscribe({
        next: () => { this.loadMeetings(); this.closeMeetingModal(); this.isSavingMeeting = false; },
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