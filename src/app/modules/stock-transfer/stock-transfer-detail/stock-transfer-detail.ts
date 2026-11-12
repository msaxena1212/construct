import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  StockTransfer,
  StockTransferDiscrepancy,
  StockTransferHistory,
  StockTransferLine,
  StockTransferService,
  StoreLocation,
} from '../../../shared/services/stock-transfer/stock-transfer.service';
import { InventoryService } from '../../../shared/services/inventory/inventory.service';

/** State of the in-app confirmation dialog that replaces native confirm() and prompt(). */
export interface ActionDialog {
  kind: 'reject' | 'cancel' | 'checkout' | 'checkin' | 'writeoff' | 'reverse';
  title: string;
  summary: string[];
  reasonLabel?: string;
  reasonRequired: boolean;
  reason: string;
  confirmLabel: string;
  danger?: boolean;
  payload?: any;
  /** Optional second field, shown when the action needs a Super Admin override (e.g. self write-off). */
  overrideLabel?: string;
  overrideReason?: string;
  error: string | null;
}

/**
 * Transfer detail and workflow actions. Every figure shown comes from the server response; this screen
 * never calculates stock balances. Each state-changing form carries an idempotency key that is kept across
 * failed retries and replaced only after success, so a repeated click cannot post stock twice.
 */
@Component({
  selector: 'app-stock-transfer-detail',
  standalone: false,
  templateUrl: './stock-transfer-detail.html',
  styleUrl: './stock-transfer-detail.scss',
})
export class StockTransferDetail implements OnInit, OnDestroy {
  transfer: StockTransfer | null = null;
  dialog: ActionDialog | null = null;
  history: StockTransferHistory | null = null;
  locations: StoreLocation[] = [];
  loading = true;
  busy = false;
  loadError: string | null = null;

  approvalDraft: Record<number, number> = {};
  approvalReason = '';
  /** Only a Super Admin approving a request they created needs this; the server records it. */
  overrideReason = '';
  rejectReason = '';
  cancelReason = '';

  checkoutKey = this.newKey();
  checkoutQty: Record<number, number | null> = {};
  dispatchRef = '';

  checkinKey = this.newKey();
  checkinAccepted: Record<number, number | null> = {};
  checkinQuarantined: Record<number, number | null> = {};
  quarantineLocationId: number | null = null;
  receiptRef = '';

  shortageLine: number | null = null;
  shortageQty: number | null = null;
  shortageReason = '';

  writeOffKey = this.newKey();
  reverseKey = this.newKey();
  reverseLine: number | null = null;
  reverseQty: number | null = null;
  reverseReason = '';

  private transferId = 0;
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StockTransferService,
    private inventory: InventoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        this.transferId = Number(params.get('id'));
        this.reload();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /** Stable arrays, recomputed only when a transfer is loaded. Getters would create new arrays on every check. */
  outstandingLines: StockTransferLine[] = [];
  openDiscrepancies: StockTransferDiscrepancy[] = [];

  private applyTransfer(t: StockTransfer | null): void {
    this.transfer = t;
    this.outstandingLines = (t?.lines || []).filter((l) => l.outstanding > 0);
    this.openDiscrepancies = (t?.discrepancies || []).filter((d) => d.status === 'open');
  }

  get canApprove(): boolean {
    return this.transfer?.status === 'submitted';
  }

  get canSubmit(): boolean {
    return this.transfer?.status === 'draft';
  }

  get canCancel(): boolean {
    return ['draft', 'submitted', 'approved'].includes(this.transfer?.status || '');
  }

  get canCheckOut(): boolean {
    return ['approved', 'in_transit', 'partially_received'].includes(this.transfer?.status || '');
  }

  get canCheckIn(): boolean {
    return ['in_transit', 'partially_received', 'reconciliation_required'].includes(this.transfer?.status || '');
  }

  get locationName(): (id: number) => string {
    return (id: number) => {
      const loc = this.locations.find((l) => Number(l.id) === Number(id));
      return loc ? `${loc.name} (${loc.code})` : `#${id}`;
    };
  }

  reload(): void {
    this.loading = true;
    this.loadError = null;
    this.subs.add(
      this.service.getTransfer(this.transferId).subscribe({
        next: (res) => {
          this.applyTransfer(res.data);
          this.loading = false;
          this.resetDraftsFromTransfer();
          this.loadLocations();
          this.loadMaterialNames();
        },
        error: (err) => {
          this.loading = false;
          this.loadError = err?.error?.message || 'Could not load this transfer.';
        },
      })
    );
    this.subs.add(
      this.service.getHistory(this.transferId).subscribe({
        next: (res) => (this.history = res.data),
        error: () => (this.history = null),
      })
    );
  }

  /** Lifecycle shown as a progress stepper above the lines. */
  readonly steps = [
    { key: 'draft', label: 'Draft', icon: 'edit_note' },
    { key: 'submitted', label: 'Submitted', icon: 'send' },
    { key: 'approved', label: 'Approved', icon: 'verified' },
    { key: 'in_transit', label: 'In transit', icon: 'local_shipping' },
    { key: 'completed', label: 'Completed', icon: 'task_alt' },
  ];

  /** Index of the current step, or -1 for terminal states outside the normal path (rejected, cancelled). */
  get stepIndex(): number {
    switch (this.transfer?.status) {
      case 'draft': return 0;
      case 'submitted': return 1;
      case 'approved': return 2;
      case 'in_transit':
      case 'partially_received':
      case 'reconciliation_required': return 3;
      case 'completed': return 4;
      default: return -1;
    }
  }

  materialNames: Record<number, string> = {};

  materialName(id: number): string {
    return this.materialNames[Number(id)] || '#' + id;
  }

  /** Share of the approved quantity that has been dispatched, for the per-line progress bar. */
  dispatchPercent(l: StockTransferLine): number {
    const base = Number(l.approved_qty ?? l.requested_qty) || 0;
    return base > 0 ? Math.min(100, Math.round((Number(l.dispatched) / base) * 100)) : 0;
  }

  private loadMaterialNames(): void {
    if (!this.transfer || Object.keys(this.materialNames).length) return;
    this.subs.add(
      this.inventory.balances(this.transfer.project_id).subscribe({
        next: (res) => {
          for (const m of res.data?.materials || []) {
            this.materialNames[Number(m.material_id)] = m.name + (m.sku ? ' (' + m.sku + ')' : '');
          }
        },
        error: () => { /* names are cosmetic; the id is shown instead */ },
      })
    );
  }

  private loadLocations(): void {
    if (!this.transfer || this.locations.length) return;
    this.subs.add(
      this.service.listLocations(this.transfer.project_id).subscribe({
        next: (res) => (this.locations = res.data || []),
        error: () => this.toastr.error('Could not load store locations.'),
      })
    );
  }

  private resetDraftsFromTransfer(): void {
    if (!this.transfer) return;
    this.approvalDraft = {};
    for (const line of this.transfer.lines) {
      this.approvalDraft[line.id] = line.approved_qty ?? line.requested_qty;
    }
  }

  submit(): void {
    this.runAction(() => this.service.submit(this.transferId), 'Submitted for approval.');
  }

  approve(): void {
    if (!this.transfer) return;
    for (const l of this.transfer.lines) {
      const n = Number(this.approvalDraft[l.id]);
      if (!Number.isInteger(n) || n < 0 || n > l.requested_qty) {
        return this.warn(`Approved quantity for ${this.lineLabel(l.id)} must be a whole number between 0 and ${l.requested_qty}.`);
      }
    }
    const lines = this.transfer.lines.map((l) => ({ line_id: l.id, approved_qty: Number(this.approvalDraft[l.id] ?? 0) }));
    this.runAction(
      () => this.service.approve(this.transferId, lines, this.approvalReason || undefined, this.overrideReason.trim() || undefined),
      'Transfer approved.'
    );
  }

  reject(): void {
    if (!this.rejectReason.trim()) return this.warn('Enter a reason to reject.');
    this.openDialog({
      kind: 'reject',
      title: 'Reject this transfer request?',
      summary: ['The request is closed and no stock moves.', 'The requester can raise a new request.'],
      reasonLabel: 'Rejection reason',
      reasonRequired: true,
      reason: this.rejectReason.trim(),
      confirmLabel: 'Reject request',
      danger: true,
    });
  }

  cancel(): void {
    if (!this.cancelReason.trim()) return this.warn('Enter a reason to cancel.');
    this.openDialog({
      kind: 'cancel',
      title: 'Cancel this transfer?',
      summary: ['No stock has moved, so nothing needs reversing.'],
      reasonLabel: 'Cancellation reason',
      reasonRequired: true,
      reason: this.cancelReason.trim(),
      confirmLabel: 'Cancel transfer',
      danger: true,
    });
  }

  checkOut(): void {
    const error = this.checkoutError();
    if (error) return this.warn(error);
    const lines = this.checkoutPayload();
    const summary = this.transfer ? lines.map((l) => `Line ${this.lineLabel(l.line_id)}: dispatch ${l.quantity} ${this.uomOf(l.line_id)}`) : [];
    summary.push('Source stock decreases once. The goods are recorded as in transit until received.');
    this.openDialog({
      kind: 'checkout',
      title: 'Check out stock',
      summary,
      reasonRequired: false,
      reason: '',
      confirmLabel: 'Check out stock',
      payload: lines,
    });
  }

  checkIn(): void {
    const error = this.checkinError();
    if (error) return this.warn(error);
    const lines = this.checkinPayload();
    const summary = lines.map(
      (l) => `Line ${this.lineLabel(l.line_id)}: accept ${l.accepted_qty}, quarantine ${l.quarantined_qty} ${this.uomOf(l.line_id)}`
    );
    summary.push('Accepted stock becomes available at the destination. Quarantined stock is held separately and is not available for consumption.');
    summary.push('Anything not received stays in transit until a shortage is resolved.');
    this.openDialog({
      kind: 'checkin',
      title: 'Record destination check-in',
      summary,
      reasonRequired: false,
      reason: '',
      confirmLabel: 'Check in',
      payload: { lines, quarantine: this.quarantineLocationId },
    });
  }

  declareShortage(): void {
    if (!this.shortageLine || !this.shortageQty || !this.shortageReason.trim()) {
      return this.warn('Choose a line, a quantity and a reason.');
    }
    this.runAction(
      () => this.service.declareShortage(this.transferId, { line_id: Number(this.shortageLine), quantity: Number(this.shortageQty), reason: this.shortageReason.trim() }),
      'Shortage declared. It stays in transit until an authorized write-off.'
    );
    this.shortageReason = '';
    this.shortageQty = null;
  }

  writeOff(d: StockTransferDiscrepancy): void {
    this.openDialog({
      kind: 'writeoff',
      title: 'Authorized write-off',
      summary: [
        `Write off ${d.quantity} unit(s) as a confirmed loss.`,
        'This is an authorized stock adjustment. It reduces the project total and cannot be undone.',
        'You cannot write off a shortage that you declared yourself.',
      ],
      reasonLabel: 'Reason for the write-off',
      reasonRequired: true,
      reason: '',
      confirmLabel: 'Write off',
      danger: true,
      payload: d,
      overrideLabel: 'Super Admin override reason (only if you declared this shortage; at least 10 characters)',
      overrideReason: '',
    });
  }

  reverseDispatch(): void {
    const error = this.reverseError();
    if (error) return this.warn(error);
    this.openDialog({
      kind: 'reverse',
      title: 'Reverse dispatch to source',
      summary: [
        `Return ${this.reverseQty} ${this.uomOf(Number(this.reverseLine))} of line ${this.lineLabel(Number(this.reverseLine))} to the source location.`,
        'Only goods that were dispatched and not yet received can be returned.',
      ],
      reasonLabel: 'Reason for the reversal',
      reasonRequired: true,
      reason: this.reverseReason.trim(),
      confirmLabel: 'Reverse dispatch',
      danger: true,
    });
  }

  /** Opens the in-app confirmation dialog. Native confirm() and prompt() are not used. */
  openDialog(d: Omit<ActionDialog, 'error'>): void {
    this.dialog = { ...d, error: null };
  }

  closeDialog(): void {
    this.dialog = null;
  }

  /** Runs the confirmed action. The reason is validated here before anything is sent to the server. */
  confirmDialog(): void {
    const d = this.dialog;
    if (!d || this.busy) return;
    if (d.reasonRequired && !d.reason.trim()) {
      d.error = 'A reason is required.';
      return;
    }
    const reason = d.reason.trim();
    this.dialog = null;
    switch (d.kind) {
      case 'reject':
        this.runAction(() => this.service.reject(this.transferId, reason), 'Transfer rejected.');
        break;
      case 'cancel':
        this.runAction(() => this.service.cancel(this.transferId, reason), 'Transfer cancelled.');
        break;
      case 'checkout':
        this.runKeyed(
          () => this.service.checkOut(this.transferId, { idempotency_key: this.checkoutKey, lines: d.payload, dispatch_reference: this.dispatchRef || undefined }),
          'Check-out recorded. Stock is now in transit.',
          () => {
            this.checkoutKey = this.newKey();
            this.checkoutQty = {};
            this.dispatchRef = '';
          }
        );
        break;
      case 'checkin':
        this.runKeyed(
          () =>
            this.service.checkIn(this.transferId, {
              idempotency_key: this.checkinKey,
              quarantine_location_id: d.payload.lines.some((l: any) => l.quarantined_qty > 0) ? Number(d.payload.quarantine) : undefined,
              receipt_reference: this.receiptRef || undefined,
              lines: d.payload.lines,
            }),
          'Check-in recorded.',
          () => {
            this.checkinKey = this.newKey();
            this.checkinAccepted = {};
            this.checkinQuarantined = {};
            this.receiptRef = '';
          }
        );
        break;
      case 'writeoff':
        this.runKeyed(
          () =>
            this.service.writeOffShortage(d.payload.id, {
              reason,
              idempotency_key: this.writeOffKey,
              override_reason: (d.overrideReason || '').trim() || undefined,
            }),
          'Shortage written off.',
          () => (this.writeOffKey = this.newKey())
        );
        break;
      case 'reverse':
        this.runKeyed(
          () =>
            this.service.reverseDispatch(this.transferId, {
              line_id: Number(this.reverseLine),
              quantity: Number(this.reverseQty),
              reason,
              idempotency_key: this.reverseKey,
            }),
          'Dispatch reversed to source.',
          () => {
            this.reverseKey = this.newKey();
            this.reverseQty = null;
            this.reverseReason = '';
          }
        );
        break;
    }
  }

  lineLabel(lineId: number): string {
    const line = this.transfer?.lines.find((l) => Number(l.id) === Number(lineId));
    return line ? `#${line.material_id}` : `#${lineId}`;
  }

  uomOf(lineId: number): string {
    const line = this.transfer?.lines.find((l) => Number(l.id) === Number(lineId));
    return line?.unit_of_measure || 'units';
  }

  /** Client-side checks for usability only. The server enforces every rule again. */
  checkoutError(): string | null {
    if (!this.transfer) return 'Transfer not loaded.';
    const requested = Object.entries(this.checkoutQty).filter(([, q]) => q !== null && q !== undefined && String(q) !== '');
    if (requested.length === 0) return 'Enter a quantity to dispatch.';
    for (const [id, q] of requested) {
      const line = this.transfer.lines.find((l) => Number(l.id) === Number(id));
      if (!line) return 'A line is no longer on this transfer.';
      const n = Number(q);
      if (!Number.isInteger(n) || n <= 0) return `Dispatch quantity for ${this.lineLabel(line.id)} must be a whole number above zero.`;
      const remaining = (line.approved_qty ?? 0) - line.dispatched;
      if (n > remaining) return `Dispatch quantity for ${this.lineLabel(line.id)} exceeds the approved quantity remaining (${remaining} ${line.unit_of_measure}).`;
    }
    return null;
  }

  checkoutPayload(): { line_id: number; quantity: number }[] {
    return Object.entries(this.checkoutQty)
      .filter(([, q]) => Number(q) > 0)
      .map(([id, q]) => ({ line_id: Number(id), quantity: Number(q) }));
  }

  checkinError(): string | null {
    const lines = this.checkinPayload();
    if (lines.length === 0) return 'Enter accepted or quarantined quantities.';
    for (const l of lines) {
      const line = this.outstandingLines.find((x) => x.id === l.line_id);
      if (!line) return 'A line is no longer in transit.';
      if (!Number.isInteger(l.accepted_qty) || !Number.isInteger(l.quarantined_qty) || l.accepted_qty < 0 || l.quarantined_qty < 0) {
        return `Quantities for ${this.lineLabel(line.id)} must be whole numbers.`;
      }
      if (l.accepted_qty + l.quarantined_qty > line.outstanding) {
        return `Accepted plus quarantined for ${this.lineLabel(line.id)} exceeds the outstanding in-transit quantity (${line.outstanding} ${line.unit_of_measure}).`;
      }
    }
    if (lines.some((l) => l.quarantined_qty > 0) && !this.quarantineLocationId) {
      return 'Choose a quarantine location for damaged or rejected goods.';
    }
    return null;
  }

  checkinPayload(): { line_id: number; accepted_qty: number; quarantined_qty: number }[] {
    return this.outstandingLines
      .map((l) => ({
        line_id: l.id,
        accepted_qty: Number(this.checkinAccepted[l.id] || 0),
        quarantined_qty: Number(this.checkinQuarantined[l.id] || 0),
      }))
      .filter((l) => l.accepted_qty + l.quarantined_qty > 0);
  }

  reverseError(): string | null {
    if (!this.reverseLine || !this.reverseQty || !this.reverseReason.trim()) return 'Choose a line, a quantity and a reason.';
    const line = this.outstandingLines.find((l) => l.id === Number(this.reverseLine));
    if (!line) return 'Choose a line that still has goods in transit.';
    const n = Number(this.reverseQty);
    if (!Number.isInteger(n) || n <= 0) return 'The reversal quantity must be a whole number above zero.';
    if (n > line.outstanding) return `Reversal exceeds the outstanding in-transit quantity (${line.outstanding} ${line.unit_of_measure}).`;
    return null;
  }

  backToRegister(): void {
    this.router.navigate(['/master/stock-transfer'], { queryParams: { projectId: this.transfer?.project_id } });
  }

  /** Plain actions: refresh from the server response on success; keep the screen state on failure. */
  private runAction(call: () => any, success: string): void {
    if (this.busy) return;
    this.busy = true;
    this.subs.add(
      call().subscribe({
        next: (res: any) => {
          this.busy = false;
          this.toastr.success(success);
          if (res?.data) this.applyTransfer(res.data);
          this.reload();
        },
        error: (err: any) => {
          this.busy = false;
          this.toastr.error(err?.error?.message || 'The action could not be completed.');
        },
      })
    );
  }

  /** Keyed actions: the idempotency key is replaced only after the server confirms success. */
  private runKeyed(call: () => any, success: string, onSuccess: () => void): void {
    if (this.busy) return;
    this.busy = true;
    this.subs.add(
      call().subscribe({
        next: (res: any) => {
          this.busy = false;
          onSuccess();
          if (res?.already_processed) this.toastr.info('This request was already processed; nothing changed.');
          else this.toastr.success(success);
          if (res?.data) this.applyTransfer(res.data);
          this.reload();
        },
        error: (err: any) => {
          this.busy = false;
          this.toastr.error(err?.error?.message || 'The action could not be completed. You can retry safely.');
        },
      })
    );
  }

  /** Shows a validation hint. Returns void so callers can use `return this.warn(...)` in void methods. */
  private warn(message: string): void {
    this.toastr.warning(message);
  }

  private newKey(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `k-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
