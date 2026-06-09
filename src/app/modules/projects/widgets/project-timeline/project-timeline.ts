import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Input
} from '@angular/core';

import Gantt from 'frappe-gantt';
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

  @ViewChild('gantt', { static: true })
  ganttContainer!: ElementRef;

  gantt: any;

  currentView: 'Day' | 'Week' | 'Month' = 'Week';

  phasesData: any[] = [];
  loading = false;

  constructor(private projectService: ProjectService) { }


  ngAfterViewInit(): void {
    this.fetchTimelineData();

    const gantt = this.ganttContainer.nativeElement;

    ['click', 'scroll', 'mousemove', 'mouseup', 'mousedown', 'wheel']
      .forEach(event => {

        gantt.addEventListener(event, () => {
          this.applyColors();
        });

      });

  }

  // -----------------------------
  // API CALL (DYNAMIC DATA)
  // -----------------------------

  fetchTimelineData() {

    this.projectService.getProjectTimeline(this.projectId).subscribe({
      next: (res) => {

        // your EXACT data
        this.phasesData = res.data.milestones_with_child || [];

        console.log('RAW API:', this.phasesData);

        setTimeout(() => {
          this.renderGantt();
        }, 0);
      }
    });

  }

  // -----------------------------
  // FLATTEN API DATA → GANTT FORMAT
  // -----------------------------
  buildGanttTasks(data: any[]): any[] {

    const tasks: any[] = [];

    data.forEach((phase) => {

      let minStart: string | null = null;
      let maxEnd: string | null = null;

      // ---------------------------
      // CHILDREN
      // ---------------------------
      phase.children?.forEach((child: any) => {

        if (child.startDate && child.endDate) {

          const start = child.startDate;
          const end = child.endDate;

          tasks.push({
            id: `child-${child.id}`,   // 🔥 IMPORTANT FIX
            name: child.name,
            start,
            end,
            progress: child.progress ?? 0
          });

          // for parent auto range
          if (!minStart || start < minStart) minStart = start;
          if (!maxEnd || end > maxEnd) maxEnd = end;
        }

      });

      // ---------------------------
      // PARENT (ALWAYS SHOW)
      // ---------------------------
      const start = phase.startDate || minStart;
      const end = phase.endDate || maxEnd;

      tasks.push({
        id: `${phase.id}`,   // 🔥 IMPORTANT FIX
        name: phase.name,
        start: start,
        end: end,
        progress: phase.progress ?? 0
      });

    });

    return tasks;
  }

  // -----------------------------
  // RENDER GANTT
  // -----------------------------
  renderGantt(): void {

    const ganttTasks = this.buildGanttTasks(this.phasesData);

    console.log('FINAL GANTT TASKS:', ganttTasks);

    const container = this.ganttContainer.nativeElement;

    container.innerHTML = '';

    this.gantt = new Gantt(container, ganttTasks, {
      view_mode: this.currentView
    } as any);

    setTimeout(() => {
      const svg = this.ganttContainer.nativeElement.querySelector('svg');
      if (svg) {
        svg.style.minHeight = '100px';
        svg.style.height = '100%';
      }

      this.applyColors();

    }, 0);
  }

  // -----------------------------
  // VIEW CHANGE (BUTTON ONLY)
  // -----------------------------
  changeView(mode: 'Day' | 'Week' | 'Month'): void {

    this.currentView = mode;

    if (!this.gantt) return;

    this.gantt.change_view_mode(mode);

    setTimeout(() => {
      this.applyColors();
    }, 0);
  }

  // -----------------------------
  // COLORS (NO SCROLL ISSUE)
  // -----------------------------
  applyColors(): void {

    const colors = [
      '#3b82f6',
      '#f59e0b',
      '#10b981',
      '#8b5cf6',
      '#ef4444',
      '#06b6d4',
      '#ec4899',
      '#84cc16'
    ];

    const container = this.ganttContainer.nativeElement;

    const bars = container.querySelectorAll('.bar');
    const progressBars = container.querySelectorAll('.bar-progress');

    bars.forEach((bar: any, index: number) => {
      const color = colors[index % colors.length];
      bar.setAttribute('fill', color);
      bar.style.fill = color;
    });

    progressBars.forEach((bar: any, index: number) => {
      const color = colors[index % colors.length];
      bar.setAttribute('fill', color);
      bar.style.fill = color;
      bar.style.opacity = '0.75';
    });
  }
}