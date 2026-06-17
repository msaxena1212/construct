import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-project-timeline',
  standalone: false,
  templateUrl: './project-timeline.html',
  styleUrls: ['./project-timeline.scss']
})
export class ProjectTimeline implements AfterViewInit {

  @Input() projectId!: number;
  @Input() selectedMember: any;

  phasesData: any[] = [];
  currentView: 'Day' | 'Week' | 'Month' = 'Week';
  timelineColumns: Array<{ label: string; date: Date }> = [];
  ganttRows: any[] = [];
  gridTemplate = '220px repeat(14, 42px)';
  private isSyncingScroll = false;

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
    this.buildTimeline();
  }

  trackByRow(index: number, row: any): number | string {
    return row.id ?? index;
  }

  private buildTimeline(): void {
    const rows: any[] = [];
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    this.phasesData.forEach((phase: any, phaseIndex: number) => {
      const phaseColor = this.taskColors[phaseIndex % this.taskColors.length];

      const addRow = (item: any, isChild = false, parentId: number | null = null, indentLevel = 0, startOverride?: string, endOverride?: string, rowType?: string) => {
        // Determine start/end values, prefer overrides then common fields
        const rawStart = startOverride ?? item.startDate ?? item.start_date ?? item.due_date;
        const rawEnd = endOverride ?? item.endDate ?? item.end_date ?? item.due_date;
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

        const displayName = item.name ?? item.title ?? item.task_title ?? `#${item.id}`;
        const childCount = (item.sub_tasks?.length ?? item.tasks?.length ?? item.children?.length) || 0;
        const type = rowType ?? (indentLevel === 0 ? 'milestone' : indentLevel === 1 ? 'submilestone' : indentLevel === 2 ? 'task' : indentLevel >= 3 ? 'subtask' : 'item');

        let progressValue = item.progress ?? 0;
        if (type === 'milestone') {
          progressValue = item.milestone_progress ?? item.progress ?? 0;
        } else if (type === 'submilestone') {
          progressValue = item.submilestone_progress ?? item.progress ?? 0;
        } else if (type === 'task') {
          progressValue = item.task_progress ?? item.progress ?? 0;
        } else if (type === 'subtask') {
          if (typeof item.completed === 'boolean') {
            progressValue = item.completed ? 100 : 0;
          } else {
            progressValue = item.progress ?? 0;
          }
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

      addRow(phase, false, null, 0, undefined, undefined, 'milestone');
      phase.children?.forEach((child: any) => {
        addRow(child, true, phase.id, 1, undefined, undefined, 'submilestone');

        // Add tasks under the child (submilestone)
        child.tasks?.forEach((task: any) => {
          // Use `due_date` as a single-day task when no explicit start/end exist
          addRow(task, true, child.id, 2, task.startDate ?? task.start_date ?? task.due_date, task.endDate ?? task.end_date ?? task.due_date, 'task');

          // Add sub_tasks under the task (if they have start/end)
          task.sub_tasks?.forEach((sub: any) => {
            addRow(sub, true, task.id, 3, sub.startDate ?? sub.start_date, sub.endDate ?? sub.end_date ?? sub.endDate, 'subtask');
          });
        });
      });
    });

    if (!minDate || !maxDate) {
      minDate = new Date();
      maxDate = new Date(minDate);
      maxDate.setDate(maxDate.getDate() + 6);
    }

    maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59);

    this.timelineColumns = this.getDateLabels(minDate, maxDate, this.currentView);
    const columnWidth = this.currentView === 'Day' ? 60 : this.currentView === 'Week' ? 100 : 140;
    const sidebarWidth = 300; // increased to provide a larger sidebar for titles/badges
    this.gridTemplate = `${sidebarWidth}px repeat(${this.timelineColumns.length}, ${columnWidth}px)`;

    this.ganttRows = rows.map((row) => {
      const start = this.parseDate(row.startDate)!;
      const end = this.parseDate(row.endDate)!;
      const startOfMinDate = new Date(minDate!.getFullYear(), minDate!.getMonth(), minDate!.getDate(), 0, 0, 0);
      const startOfMaxDate = new Date(maxDate!.getFullYear(), maxDate!.getMonth(), maxDate!.getDate(), 0, 0, 0);
      
      // Clamp start and end to timeline boundaries
      const clampedStart = start < startOfMinDate ? startOfMinDate : start;
      const clampedEnd = end > startOfMaxDate ? startOfMaxDate : end;
      
      let startIndex = 0;
      let span = 1;

      if (this.currentView === 'Day') {
        startIndex = this.diffDaysFloor(startOfMinDate, clampedStart);
        span = Math.max(1, this.diffDaysFloor(clampedStart, clampedEnd) + 1);
      } else if (this.currentView === 'Week') {
        // Calculate which week each date belongs to
        const startWeekIndex = this.getWeekIndex(startOfMinDate, clampedStart);
        const endWeekIndex = this.getWeekIndex(startOfMinDate, clampedEnd);
        startIndex = startWeekIndex;
        span = Math.max(1, endWeekIndex - startWeekIndex + 1);
      } else if (this.currentView === 'Month') {
        // Calculate which month each date belongs to
        const startMonthIndex = this.getMonthIndex(startOfMinDate, clampedStart);
        const endMonthIndex = this.getMonthIndex(startOfMinDate, clampedEnd);
        startIndex = startMonthIndex;
        span = Math.max(1, endMonthIndex - startMonthIndex + 1);
      }
      
      return {
        ...row,
        startIndex: Math.max(0, startIndex),
        span: Math.min(span, this.timelineColumns.length - Math.max(0, startIndex))
      };
    });

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

  private getStartOfISOWeek(date: Date): Date {
    const d = new Date(date);
    // getDay: 0 (Sun) .. 6 (Sat). ISO week starts Monday.
    const day = (d.getDay() + 6) % 7; // 0 -> Mon, 6 -> Sun
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}