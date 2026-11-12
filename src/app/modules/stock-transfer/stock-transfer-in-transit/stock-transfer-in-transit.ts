import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StockTransfer, StockTransferService } from '../../../shared/services/stock-transfer/stock-transfer.service';
import { StockTransferContext } from '../../../shared/services/stock-transfer/stock-transfer-context';

/** In-transit board: every dispatched transfer that still has quantity outside a location. */
@Component({
  selector: 'app-stock-transfer-in-transit',
  standalone: false,
  templateUrl: './stock-transfer-in-transit.html',
  styleUrl: './stock-transfer-in-transit.scss',
})
export class StockTransferInTransit implements OnInit, OnDestroy {
  projectId: number | null = null;
  rows: StockTransfer[] = [];
  loading = false;
  loadError: string | null = null;
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StockTransferService,
    private toastr: ToastrService,
    private context: StockTransferContext
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.queryParams.subscribe((params) => {
        const fromUrl = params['projectId'] ? Number(params['projectId']) : null;
        // No project in the URL: restore the last project chosen on the stock-transfer screens, once.
        if (!fromUrl && this.context.read()) {
          this.router.navigate([], { relativeTo: this.route, queryParams: { projectId: this.context.read() }, queryParamsHandling: 'merge', replaceUrl: true });
          return;
        }
        this.context.write(fromUrl);
        this.projectId = fromUrl;
        this.load();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  load(): void {
    this.loading = true;
    this.loadError = null;
    this.subs.add(
      this.service.listInTransit(this.projectId ?? undefined).subscribe({
        next: (res) => {
          this.rows = res.data || [];
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.loadError = err?.error?.message || 'Could not load the in-transit board.';
          this.toastr.error(this.loadError ?? 'Could not load the in-transit board.');
        },
      })
    );
  }

  open(t: StockTransfer): void {
    this.router.navigate(['/master/stock-transfer', t.id], { queryParams: { projectId: t.project_id } });
  }
}
