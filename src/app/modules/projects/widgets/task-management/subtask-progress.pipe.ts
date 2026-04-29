import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtaskProgress',
  standalone: false
})
export class SubtaskProgressPipe implements PipeTransform {
  transform(subtasks: any[]): number {
    if (!subtasks || subtasks.length === 0) return 0;
    const completed = subtasks.filter(s => s.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  }
}
