import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-project-timeline',
  standalone: false,
  templateUrl: './project-timeline.html',
  styleUrls: ['./project-timeline.scss']
})
export class ProjectTimeline implements AfterViewInit {

  @ViewChild('timelineTable') timelineTable?: ElementRef<HTMLElement>;

  @Input() projectId!: number;
  @Input() selectedMember: any;

  phasesData: any[] = [];
  currentView: 'Day' | 'Week' | 'Month' = 'Week';
  timelineColumns: Array<{ label: string; date: Date }> = [];
  ganttRows: any[] = [];
  gridTemplate = '320px repeat(14, minmax(140px, 1fr))';
  private readonly defaultSidebarWidth = 320;
  private readonly minColumnWidth = 140;
  private allTimelineColumns: Array<{ label: string; date: Date }> = [];
  private timelineRows: any[] = [];
  private timelineWindowStartIndex = 0;

  private readonly taskColors = [
    '#3b82f6',
    '#0ea5e9',
    '#22c55e',
    '#a855f7',
    '#f97316',
    '#ef4444',
    '#14b8a6',
    '#facc15'
  ];

  constructor(private projectService: ProjectService) { }

  ngAfterViewInit(): void {
    this.fetchTimelineData();
  }

  fetchTimelineData(): void {
    this.projectService.getProjectTimeline(this.projectId).subscribe({
      next: (res) => {
        this.phasesData = res.data?.milestones_with_child || [];
        this.buildTimeline();
      }
    });
  }

  changeView(mode: 'Day' | 'Week' | 'Month'): void {
    this.currentView = mode;
    this.timelineWindowStartIndex = 0;
    this.buildTimeline();
  }

  trackByRow(index: number, row: any): number | string {
    return row.id ?? index;
  }

  scrollTimeline(direction: 'left' | 'right'): void {
    if (!this.allTimelineColumns.length) {
      return;
    }

    const visibleCount = this.getVisibleColumnCount();
    let maxStartIndex = Math.max(0, this.allTimelineColumns.length - visibleCount);

    if (direction === 'left' && this.timelineWindowStartIndex === 0) {
      this.extendTimelineLeft();
      this.timelineWindowStartIndex = 0;
    } else if (direction === 'right' && this.timelineWindowStartIndex === maxStartIndex) {
      const previousLength = this.allTimelineColumns.length;
      this.extendTimelineRight();
      this.timelineWindowStartIndex = previousLength;
    } else {
      this.timelineWindowStartIndex = direction === 'right'
        ? Math.min(maxStartIndex, this.timelineWindowStartIndex + visibleCount)
        : Math.max(0, this.timelineWindowStartIndex - visibleCount);
    }

    maxStartIndex = Math.max(0, this.allTimelineColumns.length - visibleCount);
    this.timelineWindowStartIndex = Math.min(this.timelineWindowStartIndex, maxStartIndex);

    this.timelineTable?.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    this.updateVisibleTimeline();
  }

  // private buildTimeline(): void {
  //   const rows: any[] = [];
  //   let minDate: Date | null = null;
  //   let maxDate: Date | null = null;

  //   this.phasesData.forEach((phase: any, phaseIndex: number) => {
  //     const phaseColor = this.taskColors[phaseIndex % this.taskColors.length];

  //     const addRow = (item: any, isChild = false, parentId: number | null = null, indentLevel = 0, startOverride?: string, endOverride?: string, rowType?: string) => {
  //       // Determine start/end values, prefer overrides then common fields
  //       const rawStart = startOverride ?? item.startDate ?? item.start_date ?? item.due_date;
  //       const rawEnd = endOverride ?? item.endDate ?? item.end_date ?? item.due_date;
  //       if (!rawStart || !rawEnd) {
  //         return;
  //       }

  //       const start = this.parseDate(rawStart);
  //       const end = this.parseDate(rawEnd);
  //       if (!start || !end) {
  //         return;
  //       }

  //       minDate = !minDate || start < minDate ? start : minDate;
  //       maxDate = !maxDate || end > maxDate ? end : maxDate;

  //       const displayName = item.name ?? item.title ?? item.task_title ?? `#${item.id}`;
  //       const childCount = (item.sub_tasks?.length ?? item.tasks?.length ?? item.children?.length) || 0;
  //       const type = rowType ?? (indentLevel === 0 ? 'milestone' : indentLevel === 1 ? 'submilestone' : indentLevel === 2 ? 'task' : indentLevel >= 3 ? 'subtask' : 'item');

  //       let progressValue = item.progress ?? 0;
  //       if (type === 'milestone') {
  //         progressValue = item.milestone_progress ?? item.progress ?? 0;
  //       } else if (type === 'submilestone') {
  //         progressValue = item.submilestone_progress ?? item.progress ?? 0;
  //       } else if (type === 'task') {
  //         progressValue = item.task_progress ?? item.progress ?? 0;
  //       } else if (type === 'subtask') {
  //         if (typeof item.completed === 'boolean') {
  //           progressValue = item.completed ? 100 : 0;
  //         } else {
  //           progressValue = item.progress ?? 0;
  //         }
  //       }

  //       rows.push({
  //         id: item.id,
  //         name: displayName,
  //         startDate: this.formatDateOnly(rawStart),
  //         endDate: this.formatDateOnly(rawEnd),
  //         progress: progressValue,
  //         completed: item.completed ?? null,
  //         color: phaseColor,
  //         isParent: !isChild && !!item.children?.length,
  //         isChild,
  //         parentId,
  //         indentLevel,
  //         childCount,
  //         hasChildren: childCount > 0,
  //         type
  //       });
  //     };

  //     addRow(phase, false, null, 0, undefined, undefined, 'milestone');
  //     phase.children?.forEach((child: any) => {
  //       addRow(child, true, phase.id, 1, undefined, undefined, 'submilestone');

  //       // Add tasks under the child (submilestone)
  //       child.tasks?.forEach((task: any) => {
  //         // Use `due_date` as a single-day task when no explicit start/end exist
  //         addRow(task, true, child.id, 2, task.startDate ?? task.start_date ?? task.due_date, task.endDate ?? task.end_date ?? task.due_date, 'task');

  //         // Add sub_tasks under the task (if they have start/end)
  //         task.sub_tasks?.forEach((sub: any) => {
  //           addRow(sub, true, task.id, 3, sub.startDate ?? sub.start_date, sub.endDate ?? sub.end_date ?? sub.endDate, 'subtask');
  //         });
  //       });
  //     });
  //   });

  //   if (!minDate || !maxDate) {
  //     minDate = new Date();
  //     maxDate = new Date(minDate);
  //     maxDate.setDate(maxDate.getDate() + 6);
  //   }

  //   // const today = new Date();
  //   // let timelineStart = this.currentView === 'Day'
  //   //   ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  //   //   : new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 0, 0, 0);

  //   // if (this.currentView === 'Week') {
  //   //   timelineStart = this.getStartOfISOWeek(timelineStart);
  //   // } else if (this.currentView === 'Month') {
  //   //   timelineStart = new Date(timelineStart.getFullYear(), timelineStart.getMonth(), 1, 0, 0, 0);
  //   // }
  //   const today = new Date();
  //   let timelineStart: Date;

  //   if (this.currentView === 'Day') {
  //     timelineStart = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate(),
  //       0, 0, 0
  //     );
  //   } else if (this.currentView === 'Week') {
  //     timelineStart = this.getStartOfISOWeek(today);
  //   } else {
  //     timelineStart = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       1,
  //       0, 0, 0
  //     );
  //   }

  //   let timelineEnd = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59);
  //   if (timelineEnd < timelineStart) {
  //     timelineEnd = new Date(timelineStart);
  //     timelineEnd.setDate(timelineEnd.getDate() + 6);
  //     timelineEnd.setHours(23, 59, 59, 999);
  //   }

  //   timelineEnd = this.ensureMinimumTimelineEnd(timelineStart, timelineEnd, this.currentView);
  //   this.allTimelineColumns = this.getDateLabels(timelineStart, timelineEnd, this.currentView);
  //   this.timelineRows = rows;
  //   this.timelineWindowStartIndex = Math.min(
  //     this.timelineWindowStartIndex,
  //     Math.max(0, this.allTimelineColumns.length - this.getVisibleColumnCount())
  //   );
  //   this.updateVisibleTimeline();

  // }

  private buildTimeline(): void {

    const rows: any[] = [];
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    this.phasesData.forEach((phase: any, phaseIndex: number) => {

      const phaseColor =
        this.taskColors[phaseIndex % this.taskColors.length];

      const addRow = (
        item: any,
        isChild = false,
        parentId: number | null = null,
        indentLevel = 0,
        startOverride?: string,
        endOverride?: string,
        rowType?: string
      ) => {

        const rawStart =
          startOverride ??
          item.startDate ??
          item.start_date ??
          item.due_date;

        const rawEnd =
          endOverride ??
          item.endDate ??
          item.end_date ??
          item.due_date;

        if (!rawStart || !rawEnd) {
          return;
        }

        const start = this.parseDate(rawStart);
        const end = this.parseDate(rawEnd);

        if (!start || !end) {
          return;
        }

        minDate = !minDate || start < minDate ? start : minDate;
        maxDate = !maxDate || end > maxDate ? end : maxDate;

        const displayName =
          item.name ??
          item.title ??
          item.task_title ??
          `#${item.id}`;

        const childCount =
          (item.sub_tasks?.length ??
            item.tasks?.length ??
            item.children?.length) || 0;

        const type =
          rowType ??
          (
            indentLevel === 0
              ? 'milestone'
              : indentLevel === 1
                ? 'submilestone'
                : indentLevel === 2
                  ? 'task'
                  : indentLevel >= 3
                    ? 'subtask'
                    : 'item'
          );

        let progressValue = item.progress ?? 0;

        if (type === 'milestone') {
          progressValue =
            item.milestone_progress ??
            item.progress ??
            0;
        }
        else if (type === 'submilestone') {
          progressValue =
            item.submilestone_progress ??
            item.progress ??
            0;
        }
        else if (type === 'task') {
          progressValue =
            item.task_progress ??
            item.progress ??
            0;
        }
        else if (type === 'subtask') {
          progressValue =
            typeof item.completed === 'boolean'
              ? item.completed ? 100 : 0
              : (item.progress ?? 0);
        }

        rows.push({
          id: item.id,
          name: displayName,
          startDate: this.formatDateOnly(rawStart),
          endDate: this.formatDateOnly(rawEnd),
          progress: progressValue,
          completed: item.completed ?? null,
          color: phaseColor,
          isParent: !isChild && !!item.children?.length,
          isChild,
          parentId,
          indentLevel,
          childCount,
          hasChildren: childCount > 0,
          type
        });
      };

      addRow(
        phase,
        false,
        null,
        0,
        undefined,
        undefined,
        'milestone'
      );

      phase.children?.forEach((child: any) => {

        addRow(
          child,
          true,
          phase.id,
          1,
          undefined,
          undefined,
          'submilestone'
        );

        child.tasks?.forEach((task: any) => {

          addRow(
            task,
            true,
            child.id,
            2,
            task.startDate ??
            task.start_date ??
            task.due_date,

            task.endDate ??
            task.end_date ??
            task.due_date,

            'task'
          );

          task.sub_tasks?.forEach((sub: any) => {

            addRow(
              sub,
              true,
              task.id,
              3,
              sub.startDate ?? sub.start_date,
              sub.endDate ?? sub.end_date,
              'subtask'
            );

          });

        });

      });

    });

    if (!minDate || !maxDate) {

      minDate = new Date();

      maxDate = new Date(minDate);

      maxDate.setDate(
        maxDate.getDate() + 30
      );
    }

    let timelineStart: Date;

    if (this.currentView === 'Day') {
      timelineStart = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
        0,
        0,
        0,
        0
      );
      timelineStart.setDate(timelineStart.getDate() - 365);

    } else if (this.currentView === 'Week') {
      timelineStart = this.getStartOfISOWeek(minDate);
      timelineStart.setDate(timelineStart.getDate() - 7 * 52);
    } else {
      timelineStart = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        1,
        0, 0, 0
      );
      timelineStart.setMonth(timelineStart.getMonth() - 24);
    }

    let timelineEnd = new Date(maxDate);

    // Future buffer
    if (this.currentView === 'Day') {
      timelineEnd.setDate(timelineEnd.getDate() + 365);
    } else if (this.currentView === 'Week') {
      timelineEnd.setDate(timelineEnd.getDate() + 7 * 52);
    } else {
      timelineEnd.setMonth(timelineEnd.getMonth() + 24);
    }

    timelineEnd.setHours(
      23,
      59,
      59,
      999
    );

    timelineEnd =
      this.ensureMinimumTimelineEnd(
        timelineStart,
        timelineEnd,
        this.currentView
      );

    this.allTimelineColumns =
      this.getDateLabels(
        timelineStart,
        timelineEnd,
        this.currentView
      );

    this.timelineRows = rows;

    const today = new Date();
    const maxStartIndex = Math.max(0, this.allTimelineColumns.length - this.getVisibleColumnCount());
    this.timelineWindowStartIndex = this.getStartIndexForDate(today);
    this.timelineWindowStartIndex = Math.min(this.timelineWindowStartIndex, maxStartIndex);

    this.updateVisibleTimeline();

    console.log('Min Date:', minDate);
    console.log('Max Date:', maxDate);
    console.log('Timeline Start:', timelineStart);
    console.log('Timeline End:', timelineEnd);
    console.log('Columns:', this.allTimelineColumns.length);

  }

  private updateVisibleTimeline(): void {
    const visibleCount = this.getVisibleColumnCount();
    const maxStartIndex = Math.max(0, this.allTimelineColumns.length - visibleCount);
    this.timelineWindowStartIndex = Math.min(this.timelineWindowStartIndex, maxStartIndex);

    this.timelineColumns = this.allTimelineColumns.slice(
      this.timelineWindowStartIndex,
      this.timelineWindowStartIndex + visibleCount
    );

    const sidebarWidth = this.getSidebarWidth();
    const minColumnWidth = this.getMinColumnWidth();
    this.gridTemplate = `${sidebarWidth}px repeat(${this.timelineColumns.length}, minmax(${minColumnWidth}px, 1fr))`;

    if (!this.timelineColumns.length) {
      this.ganttRows = [];
      return;
    }

    const visibleStart = this.getColumnStartDate(this.timelineColumns[0].date);
    const visibleEnd = this.getColumnEndDate(this.timelineColumns[this.timelineColumns.length - 1].date);

    this.ganttRows = this.timelineRows.map((row) => {
      const start = this.parseDate(row.startDate)!;
      const end = this.parseDate(row.endDate)!;

      const isVisible = end >= visibleStart && start <= visibleEnd;
      if (!isVisible) {
        return {
          ...row,
          startIndex: 0,
          span: 1,
          isVisible: false
        };
      }

      const clampedStart = start < visibleStart ? visibleStart : start;
      const clampedEnd = end > visibleEnd ? visibleEnd : end;

      let startIndex = 0;
      let span = 1;

      if (this.currentView === 'Day') {
        startIndex = this.diffDaysFloor(visibleStart, clampedStart);
        span = Math.max(1, this.diffDaysFloor(clampedStart, clampedEnd) + 1);
      } else if (this.currentView === 'Week') {
        // Calculate which week each date belongs to
        const startWeekIndex = this.getWeekIndex(visibleStart, clampedStart);
        const endWeekIndex = this.getWeekIndex(visibleStart, clampedEnd);
        startIndex = startWeekIndex;
        span = Math.max(1, endWeekIndex - startWeekIndex + 1);
      } else if (this.currentView === 'Month') {
        // Calculate which month each date belongs to
        const startMonthIndex = this.getMonthIndex(visibleStart, clampedStart);
        const endMonthIndex = this.getMonthIndex(visibleStart, clampedEnd);
        startIndex = startMonthIndex;
        span = Math.max(1, endMonthIndex - startMonthIndex + 1);
      }

      return {
        ...row,
        startIndex: Math.max(0, startIndex),
        span: Math.min(span, this.timelineColumns.length - Math.max(0, startIndex)),
        isVisible: true
      };
    });
  }

  private getSidebarWidth(): number {
    const containerWidth = this.timelineTable?.nativeElement.clientWidth ?? window.innerWidth;
    if (containerWidth <= 640) {
      return 220;
    }
    if (containerWidth <= 900) {
      return 260;
    }
    return this.defaultSidebarWidth;
  }

  private getMinColumnWidth(): number {
    if (this.currentView === 'Day') {
      return 140;
    }
    if (this.currentView === 'Week') {
      return 160;
    }
    return 180;
  }

  private getVisibleColumnCount(): number {
    const containerWidth = this.timelineTable?.nativeElement.clientWidth ?? window.innerWidth;
    const availableWidth = Math.max(0, containerWidth - this.getSidebarWidth());
    const visibleCount = Math.max(1, Math.floor(availableWidth / this.getMinColumnWidth()));
    return Math.min(visibleCount, this.allTimelineColumns.length || 1);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateVisibleTimeline();
  }

  private ensureMinimumTimelineEnd(start: Date, end: Date, viewMode: 'Day' | 'Week' | 'Month'): Date {
    const minimumEnd = new Date(start);
    const visibleCount = this.getVisibleColumnCount();

    if (viewMode === 'Day') {
      minimumEnd.setDate(minimumEnd.getDate() + visibleCount - 1);
      minimumEnd.setHours(23, 59, 59, 999);
    } else if (viewMode === 'Week') {
      minimumEnd.setDate(minimumEnd.getDate() + (visibleCount * 7) - 1);
      minimumEnd.setHours(23, 59, 59, 999);
    } else {
      minimumEnd.setMonth(minimumEnd.getMonth() + visibleCount);
      minimumEnd.setDate(0);
      minimumEnd.setHours(23, 59, 59, 999);
    }

    return end < minimumEnd ? minimumEnd : end;
  }

  private getColumnStartDate(date: Date): Date {
    if (this.currentView === 'Week') {
      return this.getStartOfISOWeek(date);
    }

    if (this.currentView === 'Month') {
      return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  }

  private getColumnEndDate(date: Date): Date {
    if (this.currentView === 'Week') {
      const weekEnd = this.getStartOfISOWeek(date);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      return weekEnd;
    }

    if (this.currentView === 'Month') {
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
      return monthEnd;
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }

  private parseDate(value: string): Date | null {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private diffDays(start: Date, end: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((end.getTime() - start.getTime()) / msPerDay);
  }

  private diffDaysFloor(start: Date, end: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0);
    return Math.floor((e.getTime() - s.getTime()) / msPerDay);
  }

  private getDateLabels(start: Date, end: Date, viewMode: 'Day' | 'Week' | 'Month'): Array<{ label: string; date: Date }> {
    const labels: Array<{ label: string; date: Date }> = [];

    if (viewMode === 'Day') {
      const cursor = new Date(start);
      while (cursor <= end) {
        const day = cursor.getDate();
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][cursor.getMonth()];
        labels.push({ label: `${day} ${month}`, date: new Date(cursor) });
        cursor.setDate(cursor.getDate() + 1);
      }
    } else if (viewMode === 'Week') {
      const cursor = new Date(start);
      const weeksSeen = new Set<string>();
      while (cursor <= end) {
        const weekStart = this.getStartOfISOWeek(cursor);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        if (weekEnd > end) weekEnd.setTime(end.getTime());

        const isoWeekNumber = this.getISOWeekNumber(weekStart);
        const key = `${weekStart.getFullYear()}-W${isoWeekNumber}`;
        if (!weeksSeen.has(key)) {
          weeksSeen.add(key);
          const startDay = weekStart.getDate();
          const startMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][weekStart.getMonth()];
          const endDay = weekEnd.getDate();
          const endMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][weekEnd.getMonth()];
          labels.push({ label: `Week ${isoWeekNumber}\n${startDay} ${startMonth} - ${endDay} ${endMonth}`, date: new Date(weekStart) });
        }

        const next = new Date(weekStart);
        next.setDate(next.getDate() + 7);
        cursor.setTime(next.getTime());
      }
    } else {
      const cursor = new Date(start);
      const monthsSeen = new Set<string>();
      while (cursor <= end) {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][cursor.getMonth()];
        const year = cursor.getFullYear();
        const key = `${month} ${year}`;
        if (!monthsSeen.has(key)) {
          monthsSeen.add(key);
          labels.push({ label: key, date: new Date(cursor) });
        }
        cursor.setMonth(cursor.getMonth() + 1);
        cursor.setDate(1);
      }
    }

    return labels;
  }

  private formatDateOnly(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  private getISOWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNumber;
  }

  private getWeekIndex(referenceDate: Date, targetDate: Date): number {
    // Calculate which week column the target date falls into (0-based)
    // Use the ISO week start (Monday) for both reference and target so week columns align.
    const refWeekStart = this.getStartOfISOWeek(referenceDate);
    const targetWeekStart = this.getStartOfISOWeek(targetDate);
    const days = this.diffDaysFloor(refWeekStart, targetWeekStart);
    if (days <= 0) return 0;
    return Math.floor(days / 7);
  }

  private getMonthIndex(referenceDate: Date, targetDate: Date): number {
    // Calculate which month column the target date falls into
    let monthIndex = 0;
    const cursor = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
    const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    while (cursor < target) {
      cursor.setMonth(cursor.getMonth() + 1);
      monthIndex++;
    }
    return monthIndex;
  }

  private getStartIndexForDate(date: Date): number {
    if (!this.allTimelineColumns.length) {
      return 0;
    }

    const visibleCount = this.getVisibleColumnCount();
    const maxStartIndex = Math.max(0, this.allTimelineColumns.length - visibleCount);

    const index = this.allTimelineColumns.findIndex((column) => {
      const start = this.getColumnStartDate(column.date);
      const end = this.getColumnEndDate(column.date);
      return date >= start && date <= end;
    });

    if (index === -1) {
      const firstStart = this.getColumnStartDate(this.allTimelineColumns[0].date);
      const lastEnd = this.getColumnEndDate(this.allTimelineColumns[this.allTimelineColumns.length - 1].date);
      if (date < firstStart) {
        return 0;
      }
      if (date > lastEnd) {
        return maxStartIndex;
      }
      return 0;
    }

    return Math.min(Math.max(0, index), maxStartIndex);
  }

  private extendTimelineLeft(): void {
    if (!this.allTimelineColumns.length) {
      return;
    }

    const firstColumn = this.allTimelineColumns[0];
    let newStart: Date;

    if (this.currentView === 'Day') {
      newStart = new Date(firstColumn.date);
      newStart.setDate(newStart.getDate() - 30);
      const newColumns = this.buildDateRange(newStart, this.addDays(newStart, 29), 'Day');
      this.allTimelineColumns = [...newColumns, ...this.allTimelineColumns];
    } else if (this.currentView === 'Week') {
      newStart = this.getStartOfISOWeek(this.addDays(firstColumn.date, -7 * 4));
      const newColumns = this.buildDateRange(newStart, this.addDays(newStart, 7 * 4 - 1), 'Week');
      this.allTimelineColumns = [...newColumns, ...this.allTimelineColumns];
    } else {
      newStart = new Date(firstColumn.date.getFullYear(), firstColumn.date.getMonth() - 4, 1);
      const newColumns = this.buildDateRange(newStart, this.addMonths(newStart, 4), 'Month');
      this.allTimelineColumns = [...newColumns, ...this.allTimelineColumns];
    }
  }

  private extendTimelineRight(): void {
    if (!this.allTimelineColumns.length) {
      return;
    }

    const lastColumn = this.allTimelineColumns[this.allTimelineColumns.length - 1];
    let newStart: Date;
    let newEnd: Date;

    if (this.currentView === 'Day') {
      newStart = this.addDays(lastColumn.date, 1);
      newEnd = this.addDays(newStart, 29);
      const newColumns = this.buildDateRange(newStart, newEnd, 'Day');
      this.allTimelineColumns = [...this.allTimelineColumns, ...newColumns];
    } else if (this.currentView === 'Week') {
      newStart = this.addDays(lastColumn.date, 7);
      newEnd = this.addDays(newStart, 7 * 4 - 1);
      const newColumns = this.buildDateRange(this.getStartOfISOWeek(newStart), this.getStartOfISOWeek(newEnd), 'Week');
      this.allTimelineColumns = [...this.allTimelineColumns, ...newColumns];
    } else {
      newStart = this.addMonths(lastColumn.date, 1);
      newEnd = this.addMonths(newStart, 4);
      const newColumns = this.buildDateRange(newStart, newEnd, 'Month');
      this.allTimelineColumns = [...this.allTimelineColumns, ...newColumns];
    }
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  private buildDateRange(start: Date, end: Date, viewMode: 'Day' | 'Week' | 'Month'): Array<{ label: string; date: Date }> {
    const labels: Array<{ label: string; date: Date }> = [];
    const cursor = new Date(start);

    if (viewMode === 'Day') {
      while (cursor <= end) {
        const day = cursor.getDate();
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][cursor.getMonth()];
        labels.push({ label: `${day} ${month}`, date: new Date(cursor) });
        cursor.setDate(cursor.getDate() + 1);
      }
    } else if (viewMode === 'Week') {
      while (cursor <= end) {
        const weekStart = this.getStartOfISOWeek(cursor);
        const isoWeekNumber = this.getISOWeekNumber(weekStart);
        const weekEnd = this.addDays(weekStart, 6);
        const startDay = weekStart.getDate();
        const startMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][weekStart.getMonth()];
        const endDay = weekEnd.getDate();
        const endMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][weekEnd.getMonth()];
        labels.push({ label: `Week ${isoWeekNumber}\n${startDay} ${startMonth} - ${endDay} ${endMonth}`, date: new Date(weekStart) });
        cursor.setDate(cursor.getDate() + 7);
      }
    } else {
      while (cursor <= end) {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][cursor.getMonth()];
        const year = cursor.getFullYear();
        labels.push({ label: `${month} ${year}`, date: new Date(cursor) });
        cursor.setMonth(cursor.getMonth() + 1);
        cursor.setDate(1);
      }
    }

    return labels;
  }

  private getStartOfISOWeek(date: Date): Date {
    const d = new Date(date);
    // getDay: 0 (Sun) .. 6 (Sat). ISO week starts Monday.
    const day = (d.getDay() + 6) % 7; // 0 -> Mon, 6 -> Sun
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}
