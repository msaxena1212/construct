import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {// component.ts

// component.ts

currentDate = new Date();

currentMonth = this.currentDate.getMonth();
currentYear = this.currentDate.getFullYear();

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

weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

calendarDays: any[] = [];

events = [
  {
    date: '2026-05-05',
    title: 'Foundation Work',
    type: 'concrete'
  },
  {
    date: '2026-05-12',
    title: 'Electrical Setup',
    type: 'electrical'
  },
  {
    date: '2026-05-18',
    title: 'Plumbing Line',
    type: 'plumbing'
  },
  {
    date: '2026-05-25',
    title: 'Project Deadline',
    type: 'deadline'
  }
];

ngOnInit(): void {
  this.generateCalendar();
}

generateCalendar(): void {

  this.calendarDays = [];

  const firstDay =
    new Date(this.currentYear, this.currentMonth, 1);

  const lastDay =
    new Date(this.currentYear, this.currentMonth + 1, 0);

  const totalDays = lastDay.getDate();

  const startDay = firstDay.getDay();

  // Empty Boxes
  for (let i = 0; i < startDay; i++) {

    this.calendarDays.push({
      empty: true
    });

  }

  // Month Dates
  for (let day = 1; day <= totalDays; day++) {

    const fullDate =
      `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const dayEvents =
      this.events.filter(x => x.date === fullDate);

    const today = new Date();

    this.calendarDays.push({
      empty: false,
      date: day,
      fullDate: fullDate,
      today:
        today.getDate() === day &&
        today.getMonth() === this.currentMonth &&
        today.getFullYear() === this.currentYear,
      events: dayEvents
    });

  }
}

// PREVIOUS
previousMonth(): void {

  if (this.currentMonth === 0) {

    this.currentMonth = 11;
    this.currentYear--;

  } else {

    this.currentMonth--;

  }

  this.generateCalendar();
}

// NEXT
nextMonth(): void {

  if (this.currentMonth === 11) {

    this.currentMonth = 0;
    this.currentYear++;

  } else {

    this.currentMonth++;

  }

  this.generateCalendar();
}
}