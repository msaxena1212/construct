import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-project-budget',
  standalone: false,
  templateUrl: './project-budget.html',
  styleUrl: './project-budget.scss',
})
export class ProjectBudget implements OnInit, OnChanges {
  private projectService = inject(ProjectService);
  @Input() projectId!: number;

  reconciliationData: any = null;
  isLoading = false;
  hasError = false;
  errorMessage = '';

  ngOnInit() {
    if (this.projectId) {
      this.getProjectBudget();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && !changes['projectId'].firstChange) {
      this.reconciliationData = null;
      this.getProjectBudget();
    }
  }

  getProjectBudget() {
    if (!this.projectId) return;
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.projectService.getProjectCostReconciliation(this.projectId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.reconciliationData = res.data || null;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err?.error?.message || err?.message || 'Failed to load project financial reconciliation metrics.';
        console.error('Budget Reconciliation API Error:', err);
      }
    });
  }

  // --- Financial Source of Truth Getters ---
  get approvedBudget(): number {
    return Number(this.reconciliationData?.approved_budget || 0);
  }

  get activeCommitments(): number {
    return Number(this.reconciliationData?.active_commitments || 0);
  }

  get actualCosts(): number {
    return Number(this.reconciliationData?.total_recognized_actual_costs || 0);
  }

  get projectedFinalCost(): number {
    return Number(this.reconciliationData?.projected_final_cost || (this.actualCosts + this.activeCommitments));
  }

  get budgetRemaining(): number {
    return Number(this.reconciliationData?.budget_variance ?? (this.approvedBudget - this.projectedFinalCost));
  }

  get budgetVariance(): number {
    return this.budgetRemaining;
  }

  get isOverBudget(): boolean {
    return this.budgetRemaining < 0;
  }

  get budgetUsedPercentage(): number {
    if (!this.approvedBudget || this.approvedBudget <= 0) return 0;
    return Math.max(0, (this.projectedFinalCost / this.approvedBudget) * 100);
  }

  get actualCostPercentage(): number {
    if (!this.approvedBudget || this.approvedBudget <= 0) return 0;
    return Math.max(0, (this.actualCosts / this.approvedBudget) * 100);
  }

  // --- Resource Distribution Breakdown ---
  // Named total is exactly total_recognized_actual_costs (actual recognized project expenditure)
  get materialCost(): number {
    return Number(this.reconciliationData?.consumed_material_cost || 0);
  }

  get labourCost(): number {
    return Number(this.reconciliationData?.recognized_labour_actuals || 0);
  }

  get equipmentCost(): number {
    return Number(this.reconciliationData?.recognized_equipment_actuals || 0);
  }

  get subcontractorCost(): number {
    return Number(this.reconciliationData?.recognized_subcontractor_actuals || 0);
  }

  get overheadCost(): number {
    return Number(this.reconciliationData?.recognized_overhead_actuals || 0);
  }

  get unmappedCost(): number {
    return Number(this.reconciliationData?.unmapped_costs || 0);
  }

  get totalExpenditure(): number {
    return this.actualCosts;
  }

  get labourPercent(): number {
    return this.totalExpenditure > 0 ? (this.labourCost / this.totalExpenditure) * 100 : 0;
  }

  get materialPercent(): number {
    return this.totalExpenditure > 0 ? (this.materialCost / this.totalExpenditure) * 100 : 0;
  }

  get equipmentPercent(): number {
    return this.totalExpenditure > 0 ? (this.equipmentCost / this.totalExpenditure) * 100 : 0;
  }

  get subcontractorPercent(): number {
    return this.totalExpenditure > 0 ? (this.subcontractorCost / this.totalExpenditure) * 100 : 0;
  }

  get overheadPercent(): number {
    return this.totalExpenditure > 0 ? (this.overheadCost / this.totalExpenditure) * 100 : 0;
  }

  get unmappedPercent(): number {
    return this.totalExpenditure > 0 ? (this.unmappedCost / this.totalExpenditure) * 100 : 0;
  }

  // --- Additional Verified Status Metrics ---
  get invoicedLiability(): number {
    return Number(this.reconciliationData?.total_invoiced_liability || 0);
  }

  get cashSettled(): number {
    return Number(this.reconciliationData?.total_cash_settled || 0);
  }

  get outstandingPayables(): number {
    return Number(this.reconciliationData?.outstanding_payables || 0);
  }

  get budgetHeads(): any[] {
    return this.reconciliationData?.budget_heads_breakdown || [];
  }

  // --- Indian Currency Formatter (₹3,55,67,788.00) ---
  formatIndianCurrency(amount: number | null | undefined): string {
    if (amount == null || isNaN(amount)) return '₹0.00';
    const isNegative = amount < 0;
    const absVal = Math.abs(amount).toFixed(2);
    const [intPart, decPart] = absVal.split('.');

    let lastThree = intPart.substring(intPart.length - 3);
    const otherNumbers = intPart.substring(0, intPart.length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const formattedInt = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return `${isNegative ? '-' : ''}₹${formattedInt}.${decPart}`;
  }
}