import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../projects/services/project-service';
import { IProjectTask } from '../../shared/interfaces/project.interface';
import {
  IProject,
  IMilestone
} from '../../shared/interfaces/project.interface';
import { Router } from '@angular/router';

interface CalendarEvent {
  title: string;
  type:
  | 'project-start'
  | 'project-end'
  | 'milestone-start'
  | 'milestone-end';

  project?: IProject;
  milestone?: IMilestone;
}

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar implements OnInit {

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  currentDate = new Date();

  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();

  projects: IProject[] = [];

  calendarDays: any[] = [];

  selectedProject: IProject | null = null;
  showProjectDetails = false;
  showAddActivityModal = false;
  activityForm = {
    projectId: '',
    title: '',
    date: '',
    type: 'activity',
    description: ''
  };
  calendarActivities: any[] = [];
  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }
  openAddActivity() {
    this.showAddActivityModal = true;
  }

  closeAddActivity() {
    this.showAddActivityModal = false;
  }
  saveActivity(): void {
    console.log('Activity Saved', this.activityForm);

    this.closeAddActivity();

  }
  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {

        this.projects = res.data || [];

        this.generateCalendar();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(
      this.currentYear,
      this.currentMonth,
      1
    );

    const lastDay = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    );

    const daysInMonth = lastDay.getDate();

    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {

      this.calendarDays.push({
        date: '',
        fullDate: '',
        today: false,
        events: []
      });

    }

    for (let day = 1; day <= daysInMonth; day++) {

      const dateObj = new Date(
        this.currentYear,
        this.currentMonth,
        day
      );

      const fullDate =
        dateObj.toISOString().split('T')[0];

      const events: CalendarEvent[] = [];

      this.projects.forEach(project => {

        const startDate =
          project.start_date?.split('T')[0];

        const completionDate =
          project.completion_date?.split('T')[0];

        if (startDate === fullDate) {

          events.push({
            title: 'Project Started',
            type: 'project-start',
            project
          });

        }

        if (completionDate === fullDate) {

          events.push({
            title: 'Project Completion',
            type: 'project-end',
            project
          });

        }

        project.milestones?.forEach(milestone => {

          const milestoneStart =
            milestone.startDate?.split('T')[0];

          const milestoneEnd =
            milestone.endDate?.split('T')[0];

          if (milestoneStart === fullDate) {

            events.push({
              title: milestone.name,
              type: 'milestone-start',
              project,
              milestone
            });

          }

          if (milestoneEnd === fullDate) {

            events.push({
              title: milestone.name,
              type: 'milestone-end',
              project,
              milestone
            });

          }

        });

      });

      const today = new Date();

      this.calendarDays.push({
        date: day,
        fullDate,
        today:
          day === today.getDate() &&
          this.currentMonth === today.getMonth() &&
          this.currentYear === today.getFullYear(),
        events
      });

    }
  }

  previousMonth(): void {

    this.currentMonth--;

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }

    this.generateCalendar();
  }

  nextMonth(): void {

    this.currentMonth++;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

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
}