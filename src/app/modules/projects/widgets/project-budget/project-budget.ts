import { Component, inject, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-project-budget',
  standalone: false,
  templateUrl: './project-budget.html',
  styleUrl: './project-budget.scss',
})
export class ProjectBudget implements OnInit {
  private projectService = inject(ProjectService);
  @Input() projectId!: number;
  budgetData: any;

  constructor() { }

  ngOnInit() {
    this.getProjectBudget();
  }


  getProjectBudget() {
    this.projectService.projectByesBudget(this.projectId).subscribe({
      next: (res: any) => {
        console.log(res);

        this.budgetData = res.data || [];
      },
      error: (err) => {
        console.error('Budget API Error:', err);
      }
    });
  }

  get budgetUsedPercentage(): number {
  if (!this.budgetData?.budget_total) return 0;

  return Math.min(
    (this.budgetData.grand_total / this.budgetData.budget_total) * 100,
    100
  );
}


get totalResources() {
  return (
    Number(this.budgetData.total_labor || 0) +
    Number(this.budgetData.total_material || 0) +
    Number(this.budgetData.total_equipment || 0) +
    Number(this.budgetData.total_others || 0)
  );
}

get laborPercent() {
  return this.totalResources
    ? (Number(this.budgetData.total_labor) / this.totalResources) * 100
    : 0;
}

get materialPercent() {
  return this.totalResources
    ? (Number(this.budgetData.total_material) / this.totalResources) * 100
    : 0;
}

get equipmentPercent() {
  return this.totalResources
    ? (Number(this.budgetData.total_equipment) / this.totalResources) * 100
    : 0;
}

get othersPercent() {
  return this.totalResources
    ? (Number(this.budgetData.total_others) / this.totalResources) * 100
    : 0;
}
}