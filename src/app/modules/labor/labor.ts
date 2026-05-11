// src/app/labor/labor.ts

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  LaborServices,
  ContractorMetric,
  LaborStats,
  ShiftWorker,
  Vendor,
} from './services/labor-services';

@Component({
  selector    : 'app-labor',
  standalone  : false,
  templateUrl : './labor.html',
  styleUrl    : './labor.scss',
})
export class Labor implements OnInit, OnDestroy {
  private svc      = inject(LaborServices);
  private destroy$ = new Subject<void>();

  Math = Math;

  // ── Context ─────────────────────────────────────────────
  // AuthService se inject karo real app mein
  companyId = 1;

  // ── Data (API se aata hai) ───────────────────────────────
  contractors  : ContractorMetric[] = [];
  stats        : LaborStats | null  = null;
  heatmap      : number[][]         = [];
  shiftActivity: ShiftWorker[]      = [];
  vendors      : Vendor[]           = [];

  // ── UI State ─────────────────────────────────────────────
  loading            = false;
  error: string|null = null;
  selectedVendorId: number | null = null;
  selectedMember      = 'All Members';

  // ── Computed ─────────────────────────────────────────────
  get vendorOptions(): { id: number | null; name: string }[] {
    return [
      { id: null, name: 'All Vendors' },
      ...this.vendors.map(v => ({ id: v.id, name: v.name })),
    ];
  }

  get teamMembers(): string[] {
    return ['All Members', ...this.shiftActivity.map(w => w.name)];
  }

  get filteredShiftActivity(): ShiftWorker[] {
    if (this.selectedMember === 'All Members') return this.shiftActivity;
    return this.shiftActivity.filter(w => w.name === this.selectedMember);
  }

  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit(): void {
    // Subscribe sab streams pe
    this.svc.contractors$
      .pipe(takeUntil(this.destroy$))
      .subscribe(c => (this.contractors = c));

    this.svc.laborStats$
      .pipe(takeUntil(this.destroy$))
      .subscribe(s => (this.stats = s));

    this.svc.heatmap$
      .pipe(takeUntil(this.destroy$))
      .subscribe(h => (this.heatmap = h));

    this.svc.shiftActivity$
      .pipe(takeUntil(this.destroy$))
      .subscribe(sa => (this.shiftActivity = sa));

    this.svc.vendors$
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => (this.vendors = v));

    this.svc.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(l => (this.loading = l));

    this.svc.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => (this.error = e));

    // API call karo — sab data aayega
    this.svc.loadDashboard(this.companyId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Vendor filter ─────────────────────────────────────────
  onVendorChange(vendorId: number | null): void {
    this.selectedVendorId = vendorId;
    this.svc.filterByVendor(this.companyId, vendorId ?? undefined);
  }

  // ── Refresh ───────────────────────────────────────────────
  refresh(): void {
    this.svc.loadDashboard(this.companyId, this.selectedVendorId ?? undefined);
  }

  // ── Dismiss error ─────────────────────────────────────────
  dismissError(): void {
    this.svc.clearError();
  }

  // ── Helpers ───────────────────────────────────────────────
  getEfficiencyColor(e: number): string {
    if (e > 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (e > 75) return 'text-amber-600  bg-amber-50  border-amber-100';
    return              'text-rose-600   bg-rose-50   border-rose-100';
  }

  skillBarWidth(count: number): number {
    const max = this.stats?.totalPersonnel || 1;
    return Math.min((count / max) * 300, 100);
  }
}