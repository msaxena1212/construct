import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockTransferContext } from '../../../shared/services/stock-transfer/stock-transfer-context';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../projects/services/project-service';
import { MaterialService } from '../../../shared/services/materials/materials';
import {
  StockTransfer,
  StockTransferService,
  StoreLocation,
  StockTransferStatus,
} from '../../../shared/services/stock-transfer/stock-transfer.service';

interface DraftLine {
  material_id: number | null;
  requested_qty: number | null;
}

/**
 * Transfer Register (and Approval Queue when opened at /approvals).
 * Project context comes from the `projectId` query parameter, never from a hardcoded project.
 */
@Component({
  selector: 'app-stock-transfer-register',
  standalone: false,
  templateUrl: './stock-transfer-register.html',
  styleUrl: './stock-transfer-register.scss',
})
export class StockTransferRegister implements OnInit, OnDestroy {
  mode: 'register' | 'approvals' = 'register';
  projects: any[] = [];
  projectId: number | null = null;
  locations: StoreLocation[] = [];
  materials: any[] = [];

  transfers: StockTransfer[] = [];
  statusFilter: StockTransferStatus | '' = '';
  page = 1;
  limit = 25;
  total = 0;

  loading = false;
  loadError: string | null = null;

  showCreate = false;
  creating = false;
  draft = {
    source_location_id: null as number | null,
    destination_location_id: null as number | null,
    reason: '',
    required_date: '',
    lines: [{ material_id: null, requested_qty: null }] as DraftLine[],
  };

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private materialService: MaterialService,
    private transferService: StockTransferService,
    private toastr: ToastrService,
    private context: StockTransferContext
  ) {}

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'] === 'approvals' ? 'approvals' : 'register';
    if (this.mode === 'approvals') this.statusFilter = 'submitted';

    this.subs.add(this.materialService.materials$.subscribe((list: any[]) => (this.materials = list || [])));
    this.materialService.loadMaterials();

    this.subs.add(
      this.projectService.getProjects().subscribe({
        next: (res: any) => (this.projects = res.data || []),
        error: () => this.toastr.error('Could not load projects.'),
      })
    );
    this.subs.add(
      this.route.queryParams.subscribe((params) => {
        const fromUrl = params['projectId'] ? Number(params['projectId']) : null;
        // No project in the URL (for example the sidebar entry): restore the last project chosen, once.
        if (!fromUrl && this.context.read()) {
          this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: this.context.read() }, queryParamsHandling: 'merge', replaceUrl: true });
          return;
        }
        this.context.write(fromUrl);
        if (fromUrl !== this.projectId) {
          this.projectId = fromUrl;
          this.page = 1;
          this.loadProjectContext();
          this.loadTransfers();
        }
        // "New Transfer Request" opens the create form on this page once a project is known.
        if (params['action'] === 'new' && this.projectId) {
          this.openCreate();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Transfers move project stock, so the selectable id is the project-stock record id, not the master
   * material id. getAllMaterials returns master rows with their project stock nested underneath.
   */
  get projectMaterials(): { id: number; name: string; sku: string }[] {
    const out: { id: number; name: string; sku: string }[] = [];
    for (const m of this.materials) {
      for (const ps of m.material_project_stock || []) {
        if (Number(ps.project_id) === Number(this.projectId) && !ps.isDeleted) {
          out.push({ id: ps.id, name: m.name, sku: ps.sku });
        }
      }
    }
    return out;
  }

  onProjectChange(value: string): void {
    const pid = value ? Number(value) : null;
    this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: pid }, queryParamsHandling: 'merge' });
  }

  onStatusChange(): void {
    this.page = 1;
    this.loadTransfers();
  }

  loadTransfers(): void {
    this.loading = true;
    this.loadError = null;
    // The approval queue always asks the server for submitted requests only; completed or historical rows never appear there.
    const status = this.mode === 'approvals' ? 'submitted' : this.statusFilter || undefined;
    const filters = { projectId: this.projectId ?? undefined, status, page: this.page, limit: this.limit };
    this.subs.add(
      this.transferService.listTransfers(filters).subscribe({
        next: (res) => {
          this.transfers = res.data.rows;
          this.total = res.data.count;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.loadError = err?.error?.message || 'Could not load transfers.';
        },
      })
    );
  }

  nextPage(delta: number): void {
    const last = Math.max(1, Math.ceil(this.total / this.limit));
    const next = Math.min(Math.max(1, this.page + delta), last);
    if (next !== this.page) {
      this.page = next;
      this.loadTransfers();
    }
  }

  private loadProjectContext(): void {
    this.locations = [];
    if (!this.projectId) return;
    this.subs.add(
      this.transferService.listLocations(this.projectId).subscribe({
        // The system in-transit location is never a user-selectable source or destination.
        next: (res) => (this.locations = (res.data || []).filter((l) => l.location_type !== 'in_transit')),
        error: () => this.toastr.error('Could not load store locations.'),
      })
    );
  }

  openCreate(): void {
    if (!this.projectId) {
      this.toastr.warning('Select a project first.');
      return;
    }
    this.draft = { source_location_id: null, destination_location_id: null, reason: '', required_date: '', lines: [{ material_id: null, requested_qty: null }] };
    this.showCreate = true;
  }

  addLine(): void {
    this.draft.lines.push({ material_id: null, requested_qty: null });
  }

  removeLine(index: number): void {
    if (this.draft.lines.length > 1) this.draft.lines.splice(index, 1);
  }

  /** Client-side checks are only for usability. The server re-validates every field. */
  createTransfer(): void {
    if (!this.draft.source_location_id || !this.draft.destination_location_id) {
      this.toastr.warning('Choose a source and a destination.');
      return;
    }
    if (!this.draft.reason.trim()) {
      this.toastr.warning('A reason is required.');
      return;
    }
    const lines = this.draft.lines
      .filter((l) => l.material_id)
      .map((l) => ({ material_id: Number(l.material_id), requested_qty: Number(l.requested_qty) }));
    if (lines.length === 0) {
      this.toastr.warning('Add at least one material line.');
      return;
    }
    this.creating = true;
    this.subs.add(
      this.transferService
        .createTransfer({
          source_location_id: Number(this.draft.source_location_id),
          destination_location_id: Number(this.draft.destination_location_id),
          reason: this.draft.reason.trim(),
          required_date: this.draft.required_date || null,
          lines,
        })
        .subscribe({
          next: (res) => {
            this.creating = false;
            this.showCreate = false;
            this.toastr.success(`Draft ${res.data.transfer_number} created. No stock has moved.`);
            this.router.navigate(['/master/stock-transfer', res.data.id], { queryParams: { projectId: this.projectId } });
          },
          error: (err) => {
            this.creating = false;
            this.toastr.error(err?.error?.message || 'Could not create the transfer.');
          },
        })
    );
  }

  locationLabel(id: number): string {
    const loc = this.locations.find((l) => Number(l.id) === Number(id));
    return loc ? `${loc.name} (${loc.code})` : `#${id}`;
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }
}
