import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
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
  { date: '2026-01-26', title: 'Republic Day', type: 'holiday' },

  { date: '2026-03-04', title: 'Holi', type: 'holiday' },
  { date: '2026-03-21', title: 'Eid-ul-Fitr', type: 'holiday' },
  { date: '2026-03-26', title: 'Ram Navami', type: 'holiday' },
  { date: '2026-03-31', title: 'Mahavir Jayanti', type: 'holiday' },

  { date: '2026-04-03', title: 'Good Friday', type: 'holiday' },

  { date: '2026-05-01', title: 'Buddha Purnima', type: 'holiday' },
  { date: '2026-05-27', title: 'Bakrid', type: 'holiday' },

  { date: '2026-06-26', title: 'Muharram', type: 'holiday' },

  { date: '2026-08-15', title: 'Independence Day', type: 'holiday' },
  { date: '2026-08-26', title: 'Id-e-Milad', type: 'holiday' },

  { date: '2026-09-04', title: 'Janmashtami', type: 'holiday' },

  { date: '2026-10-02', title: 'Gandhi Jayanti', type: 'holiday' },
  { date: '2026-10-20', title: 'Dussehra', type: 'holiday' },

  { date: '2026-11-08', title: 'Diwali', type: 'holiday' },
  { date: '2026-11-24', title: 'Guru Nanak Jayanti', type: 'holiday' },

  { date: '2026-12-25', title: 'Christmas', type: 'holiday' }
];

ngOnInit(): void {
  this.generateCalendar();
  this.mapHolidays();
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

holidays: any[] = [];

mapHolidays() {

  this.calendarDays.forEach(day => {

    const dateString =
      `${this.currentYear}-${String(this.currentMonth + 1).padStart(2,'0')}-${String(day.date).padStart(2,'0')}`;

    const holiday = this.holidays.find(
      h => h.date === dateString
    );

    if (holiday) {

      day.events.push({
        title: holiday.localName,
        type: 'holiday'
      });

    }

  });

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