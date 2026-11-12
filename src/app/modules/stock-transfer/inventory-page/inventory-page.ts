import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../projects/services/project-service';
import { InventoryBalances, InventoryLocationBalance, InventoryMaterialRow, InventoryMovement, InventoryService } from '../../../shared/services/inventory/inventory.service';
import { StockTransferContext } from '../../../shared/services/stock-transfer/stock-transfer-context';

/**
 * Project inventory: balances by material and location, stock in (receipt), stock out (issue) and history.
 * Every figure comes from the API. Submissions carry an idempotency key that is kept across failed retries
 * and replaced only after success, and the submit button is disabled while a request is in flight.
 */
@Component({
  selector: 'app-inventory-page',
  standalone: false,
  templateUrl: './inventory-page.html',
  styleUrl: './inventory-page.scss',
})
export class InventoryPage implements OnInit, OnDestroy {
  projects: any[] = [];
  projectId: number | null = null;
  balances: InventoryBalances | null = null;
  movements: InventoryMovement[] = [];
  loadError: string | null = null;
  loading = false;

  stockInBusy = false;
  stockOutBusy = false;
  stockInTouched = false;
  stockOutTouched = false;
  stockIn = { material_id: null as number | null, location_id: null as number | null, quantity: null as number | null, reference: '' };
  stockOut = { material_id: null as number | null, location_id: null as number | null, quantity: null as number | null, activity: '', requested_by: '' };
  stockInKey = this.newKey();
  stockOutKey = this.newKey();

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private inventory: InventoryService,
    private toastr: ToastrService,
    private context: StockTransferContext
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.projectService.getProjects().subscribe({
        next: (res: any) => (this.projects = res.data || []),
        error: () => this.toastr.error('Could not load projects.'),
      })
    );
    this.subs.add(
      this.route.queryParams.subscribe((params) => {
        const fromUrl = params['projectId'] ? Number(params['projectId']) : null;
        // No project in the URL: restore the last project chosen on the stock-transfer screens, once.
        if (!fromUrl && this.context.read()) {
          this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: this.context.read() }, queryParamsHandling: 'merge', replaceUrl: true });
          return;
        }
        this.context.write(fromUrl);
        const pid = fromUrl;
        if (pid !== this.projectId) {
          this.projectId = pid;
          this.stockIn = { material_id: null, location_id: null, quantity: null, reference: '' };
          this.stockOut = { material_id: null, location_id: null, quantity: null, activity: '', requested_by: '' };
          this.reload();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /** Physical locations only: the system in-transit location is never offered for stock in or out. */
  get storeLocations(): { id: number; code: string; name: string; location_type: string; status: string }[] {
    return (this.balances?.locations || []).filter((l) => l.location_type !== 'in_transit');
  }

  get stockInLocations() {
    return this.storeLocations.filter((l) => l.status === 'active');
  }

  get stockOutLocations() {
    return this.storeLocations.filter((l) => l.status === 'active' && l.location_type !== 'quarantine');
  }

  /**
   * 'Reconciled' only when the server's independent check passes and no project or location balance is negative.
   * Otherwise the row must be reviewed: a negative balance or a failed check is never shown as reconciled.
   */
  reviewRequired(row: InventoryMaterialRow): boolean {
    return (
      !row.reconciliation.consistent ||
      row.unplaced < 0 ||
      row.in_transit < 0 ||
      row.locations.some((l) => l.balance < 0)
    );
  }

  /** Per-material balances for one location, for the table cells. */
  balanceAt(row: InventoryMaterialRow, locationId: number): InventoryLocationBalance | undefined {
    return row.locations.find((l) => Number(l.location_id) === Number(locationId));
  }

  get materials(): InventoryMaterialRow[] {
    return this.balances?.materials || [];
  }

  onProjectChange(value: string): void {
    const pid = value ? Number(value) : null;
    this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: pid }, queryParamsHandling: 'merge' });
  }

  reload(): void {
    this.balances = null;
    this.movements = [];
    this.loadError = null;
    if (!this.projectId) return;
    this.loading = true;
    this.subs.add(
      this.inventory.balances(this.projectId).subscribe({
        next: (res) => {
          this.balances = res.data;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.loadError = err?.error?.message || 'Could not load inventory for this project.';
        },
      })
    );
    this.subs.add(
      this.inventory.movements(this.projectId).subscribe({
        next: (res) => (this.movements = res.data || []),
        error: () => (this.movements = []),
      })
    );
  }

  locationName(id: number | null): string {
    const loc = this.balances?.locations.find((l) => Number(l.id) === Number(id));
    return loc ? `${loc.name} (${loc.code})` : '—';
  }

  stockInError(): string | null {
    if (!this.projectId) return 'Select a project first.';
    if (!this.stockIn.material_id) return 'Choose a material.';
    if (!this.stockIn.location_id) return 'Choose the receiving location.';
    const q = Number(this.stockIn.quantity);
    if (!Number.isInteger(q) || q <= 0) return 'Quantity must be a whole number above zero.';
    if (!this.stockIn.reference.trim()) return 'Enter the PO/GRN or opening-stock authorization reference.';
    return null;
  }

  stockOutError(): string | null {
    if (!this.projectId) return 'Select a project first.';
    if (!this.stockOut.material_id) return 'Choose a material.';
    if (!this.stockOut.location_id) return 'Choose the issuing location.';
    const q = Number(this.stockOut.quantity);
    if (!Number.isInteger(q) || q <= 0) return 'Quantity must be a whole number above zero.';
    const row = this.materials.find((m) => m.material_id === Number(this.stockOut.material_id));
    const loc = row?.locations.find((l) => l.location_id === Number(this.stockOut.location_id));
    if (loc && q > loc.balance) return `Only ${loc.balance} ${row?.unit_of_measure} available at this location.`;
    if (!this.stockOut.activity.trim()) return 'Enter the activity or work reference this material is issued against.';
    if (!this.stockOut.requested_by.trim()) return 'Enter who requested the material.';
    return null;
  }

  /** Unit of measure of the selected material, shown next to the quantity field. */
  uomFor(materialId: number | null): string {
    if (!materialId) return '';
    return this.materials.find((m) => m.material_id === Number(materialId))?.unit_of_measure || '';
  }

  submitStockIn(): void {
    this.stockInTouched = true;
    const error = this.stockInError();
    if (error) {
      this.toastr.warning(error);
      return;
    }
    if (this.stockInBusy) return;
    this.stockInBusy = true;
    this.subs.add(
      this.inventory
        .receive({
          project_id: Number(this.projectId),
          material_id: Number(this.stockIn.material_id),
          location_id: Number(this.stockIn.location_id),
          quantity: Number(this.stockIn.quantity),
          reference: this.stockIn.reference.trim(),
          idempotency_key: this.stockInKey,
        })
        .subscribe({
          next: (res) => {
            this.stockInBusy = false;
            this.stockInTouched = false;
            this.stockInKey = this.newKey();
            this.toastr.success(res.already_processed ? 'This receipt was already recorded; nothing changed.' : 'Receipt recorded.');
            this.stockIn = { ...this.stockIn, quantity: null, reference: '' };
            this.reload();
          },
          error: (err) => {
            this.stockInBusy = false;
            this.toastr.error(err?.error?.message || 'Receipt failed. You can retry safely with the same form.');
          },
        })
    );
  }

  submitStockOut(): void {
    this.stockOutTouched = true;
    const error = this.stockOutError();
    if (error) {
      this.toastr.warning(error);
      return;
    }
    if (this.stockOutBusy) return;
    this.stockOutBusy = true;
    this.subs.add(
      this.inventory
        .issue({
          project_id: Number(this.projectId),
          material_id: Number(this.stockOut.material_id),
          location_id: Number(this.stockOut.location_id),
          quantity: Number(this.stockOut.quantity),
          activity: this.stockOut.activity.trim(),
          requested_by: this.stockOut.requested_by.trim(),
          idempotency_key: this.stockOutKey,
        })
        .subscribe({
          next: (res) => {
            this.stockOutBusy = false;
            this.stockOutTouched = false;
            this.stockOutKey = this.newKey();
            this.toastr.success(res.already_processed ? 'This issue was already recorded; nothing changed.' : 'Material issued.');
            this.stockOut = { ...this.stockOut, quantity: null, activity: '', requested_by: '' };
            this.reload();
          },
          error: (err) => {
            this.stockOutBusy = false;
            this.toastr.error(err?.error?.message || 'Issue failed. You can retry safely with the same form.');
          },
        })
    );
  }

  private newKey(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `k-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
