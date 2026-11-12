import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CashOutForecast,
  CriticalPath,
  PortfolioBrief,
  PortfolioOverview,
  PortfolioProject,
  PortfolioService,
  Rag,
  VendorScore,
  VendorScorecard,
} from './services/portfolio.service';

type Section = 'overview' | 'cash' | 'vendors' | 'brief' | 'path' | 'narrative';

const SOURCE_LABELS: Record<string, string> = {
  payment_requests: 'Payment requests',
  ra_bills: 'RA bills',
  vendor_invoices: 'Vendor invoices',
  open_purchase_orders: 'Open purchase orders',
};

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  overview: PortfolioOverview | null = null;
  cash: CashOutForecast | null = null;
  vendorCard: VendorScorecard | null = null;
  brief: PortfolioBrief | null = null;
  path: CriticalPath | null = null;

  loading: Record<Section, boolean> = { overview: true, cash: true, vendors: true, brief: true, path: false, narrative: false };
  errors: Partial<Record<Section, string>> = {};

  expandedProjectId: number | null = null;
  pathProjectId: number | null = null;
  expandedVendorId: number | null = null;
  vendorFilter: 'all' | 'needs_attention' = 'needs_attention';

  constructor(private service: PortfolioService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.fetch('overview', this.service.overview(), (d) => {
      this.overview = d;
      if (!this.pathProjectId && d.projects.length) this.showPath(d.projects[0].id);
    });
    this.fetch('cash', this.service.cashFlow(13), (d) => (this.cash = d));
    this.fetch('vendors', this.service.vendors(), (d) => (this.vendorCard = d));
    this.fetch('brief', this.service.brief(false), (d) => (this.brief = d));
  }

  generateNarrative(): void {
    this.loading['narrative'] = true;
    delete this.errors['narrative'];
    this.service.brief(true).subscribe({
      next: (d) => {
        this.brief = d;
        this.loading['narrative'] = false;
      },
      error: () => {
        this.errors['narrative'] = 'The briefing could not be requested.';
        this.loading['narrative'] = false;
      },
    });
  }

  showPath(projectId: number): void {
    this.pathProjectId = projectId;
    this.fetch('path', this.service.criticalPath(projectId), (d) => (this.path = d));
  }

  onPathProjectChange(event: Event): void {
    const id = Number((event.target as HTMLSelectElement).value);
    if (id) this.showPath(id);
  }

  toggleProject(id: number): void {
    this.expandedProjectId = this.expandedProjectId === id ? null : id;
  }

  toggleVendor(id: number): void {
    this.expandedVendorId = this.expandedVendorId === id ? null : id;
  }

  openProject(p: PortfolioProject): void {
    this.router.navigate(['/master/projects'], { queryParams: { projectId: p.id } });
  }

  setVendorFilter(filter: 'all' | 'needs_attention'): void {
    this.vendorFilter = filter;
  }

  get vendorsShown(): VendorScore[] {
    const all = this.vendorCard?.vendors ?? [];
    return this.vendorFilter === 'all' ? all : all.filter((v) => v.grade === 'C' || v.grade === 'D' || v.score < 80);
  }

  // ---- formatting -----------------------------------------------------------------------------------------------
  /** Indian crore / lakh notation for large rupee amounts. */
  inr(value: number | null | undefined): string {
    if (value === null || value === undefined) return '—';
    const abs = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(2)} Cr`;
    if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(2)} L`;
    return `${sign}₹${abs.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  }

  index(value: number | null | undefined): string {
    return value === null || value === undefined ? '—' : value.toFixed(2);
  }

  indexClass(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'text-slate-400';
    if (value < 0.85) return 'text-red-600 font-bold';
    if (value < 0.95) return 'text-amber-600 font-bold';
    return 'text-emerald-600 font-bold';
  }

  ragClasses(rag: Rag): string {
    switch (rag) {
      case 'red':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
      case 'amber':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
    }
  }

  gradeClasses(grade: string): string {
    switch (grade) {
      case 'A':
        return 'bg-emerald-100 text-emerald-700';
      case 'B':
        return 'bg-sky-100 text-sky-700';
      case 'C':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  }

  severityClasses(severity: string): string {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  sourceLabel(key: string): string {
    return SOURCE_LABELS[key] ?? key;
  }

  sources(by: Record<string, number>): { key: string; amount: number }[] {
    return Object.keys(by).map((key) => ({ key, amount: by[key] }));
  }

  /** Bar height for a week, as a percentage of the largest week. */
  barHeight(total: number): number {
    const max = Math.max(1, ...(this.cash?.weeks ?? []).map((w) => w.total));
    return Math.max(total > 0 ? 3 : 0, Math.round((total / max) * 100));
  }

  /** Left offset (percent) of a task bar on the critical-path chart. */
  barLeft(start: string): number {
    const span = this.path?.duration_days ?? 1;
    const anchor = this.path?.anchor_date ? new Date(this.path.anchor_date).getTime() : 0;
    return Math.max(0, Math.min(98, ((new Date(start).getTime() - anchor) / 86400000 / span) * 100));
  }

  barWidth(days: number): number {
    const span = this.path?.duration_days ?? 1;
    return Math.max(2, Math.min(100, (days / span) * 100));
  }

  private fetch<T>(section: Section, source: Observable<T>, assign: (d: T) => void): void {
    this.loading[section] = true;
    delete this.errors[section];
    source.subscribe({
      next: (d) => {
        assign(d);
        this.loading[section] = false;
      },
      error: (err) => {
        this.errors[section] = err?.status === 403 ? 'You do not have access to this view.' : 'This section could not be loaded.';
        this.loading[section] = false;
      },
    });
  }
}
