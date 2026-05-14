import { Pipe, PipeTransform } from '@angular/core';
import { LaborWorker } from '../services/vendors-labor-services';

@Pipe({
  name: 'countByRole',
  standalone: false,
})
export class CountByRolePipe implements PipeTransform {
  transform(workers: LaborWorker[], roleRaw: any): number {
    return workers.filter(w => w.roleRaw === roleRaw).length;
  }
}
