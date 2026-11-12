import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';

export type Rag = 'red' | 'amber' | 'green';

export interface RiskDriver {
  area: string;
  points: number;
  message: string;
  evidence: Record<string, unknown>;
}

export interface ProjectRisk {
  score: number;
  rag: Rag;
  drivers: RiskDriver[];
  unknown: string[];
}

export interface PortfolioProject {
  id: number;
  code: string | null;
  name: string;
  type: string;
  location: string | null;
  status: string;
  progress: number;
  completion_date: string | null;
  bac: number;
  ac: number;
  ev: number | null;
  pv: number | null;
  cpi: number | null;
  spi: number | null;
  eac: number | null;
  earned_value_note: string | null;
  risk: ProjectRisk;
  open_snags: { critical: number; high: number; medium: number; low: number };
  approvals_waiting: number;
  approvals_escalated: number;
  guarantees: { active_total: number; expiring: number; expired_active: number };
  days_since_dpr: number | null;
  overdue_tasks: number;
  avg_daily_workforce: number;
  pending_variations: { count: number; amount: number };
}

export interface PortfolioTotals {
  projects: number;
  bac: number;
  ac: number;
  ev: number;
  pv: number;
  cpi: number | null;
  spi: number | null;
  rag: { red: number; amber: number; green: number };
  by_status: Record<string, number>;
  approvals_waiting: number;
  approvals_escalated: number;
  guarantees_expired_active: number;
  guarantees_expiring: number;
  open_snags_high_or_critical: number;
  pending_variation_amount: number;
  avg_daily_workforce: number;
}

export interface PortfolioOverview {
  as_of: string;
  totals: PortfolioTotals;
  projects: PortfolioProject[];
}

export interface CashWeek {
  week: number;
  starts_on: string;
  total: number;
  overdue: number;
  cumulative: number;
  by_source: Record<string, number>;
  item_count: number;
}

export interface CashOutForecast {
  as_of: string;
  weeks: CashWeek[];
  total: number;
  average_week: number;
  peak_week: { week: number; starts_on: string; total: number } | null;
  beyond_horizon: { count: number; amount: number };
  by_source: Record<string, number>;
  by_project: { project_id: number; name: string; total: number }[];
  assumptions: string[];
  items_counted: number;
}

export interface CriticalTask {
  id: number;
  title: string;
  status: string;
  progress: number;
  duration_days: number;
  duration_basis: 'sub_tasks' | 'default';
  early_start: string;
  early_finish: string;
  float_days: number;
  critical: boolean;
}

export interface CriticalPath {
  project_id: number;
  project: string;
  applicable: boolean;
  reason?: string;
  cycle?: { id: number; title: string }[];
  anchor_date?: string;
  duration_days?: number;
  finish_date?: string;
  contract_completion_date?: string | null;
  days_to_contract_completion?: number | null;
  critical_path?: { id: number; title: string; status: string }[];
  method?: string;
  tasks: CriticalTask[];
}

export interface VendorScore {
  id: number;
  name: string;
  skill: string;
  project_id: number | null;
  status: string;
  gst_registered: boolean;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  reasons: { points: number; reason: string }[];
}

export interface VendorScorecard {
  vendors: VendorScore[];
  summary: { count: number; grades: Record<string, number>; average_score?: number };
}

export interface Finding {
  severity: 'high' | 'medium' | 'info';
  area: string;
  project_id?: number;
  message: string;
}

export interface PortfolioBrief {
  as_of: string;
  findings: Finding[];
  summary: string;
  narrative?: string | null;
  narrative_status?: 'generated' | 'unavailable';
  narrative_reason?: string;
}

interface Envelope<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly baseUrl = `${environment.serverUrl}/api/v1/portfolio`;

  constructor(private http: HttpClient) {}

  overview(): Observable<PortfolioOverview> {
    return this.http.get<Envelope<PortfolioOverview>>(`${this.baseUrl}/overview`).pipe(map((r) => r.data));
  }

  brief(narrative: boolean): Observable<PortfolioBrief> {
    const params = new HttpParams().set('narrative', narrative ? '1' : '0');
    return this.http.get<Envelope<PortfolioBrief>>(`${this.baseUrl}/brief`, { params }).pipe(map((r) => r.data));
  }

  cashFlow(weeks = 13, projectId?: number): Observable<CashOutForecast> {
    let params = new HttpParams().set('weeks', String(weeks));
    if (projectId) params = params.set('project_id', String(projectId));
    return this.http.get<Envelope<CashOutForecast>>(`${this.baseUrl}/cash-flow`, { params }).pipe(map((r) => r.data));
  }

  vendors(): Observable<VendorScorecard> {
    return this.http.get<Envelope<VendorScorecard>>(`${this.baseUrl}/vendors`).pipe(map((r) => r.data));
  }

  criticalPath(projectId: number): Observable<CriticalPath> {
    return this.http.get<Envelope<CriticalPath>>(`${this.baseUrl}/projects/${projectId}/critical-path`).pipe(map((r) => r.data));
  }
}
