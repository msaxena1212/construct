import { Component, OnInit, inject } from '@angular/core';
import { VendorsServices, Vendor } from '../../vendors/services/vendors-services';
import { VendorInvoiceService, VendorInvoice } from '../../vendors/services/vendors-invoice-services';
import { VendorAuditService, VendorAudit } from '../../vendors/services/vendors-audit-services';
import { VendorsLaborServices, LaborWorker, LaborStats } from '../../vendors/services/vendors-labor-services';
import { ProjectService } from '../../projects/services/project-service';
import { IProjectTask } from '../../../shared/interfaces/project.interface';

interface ResolvedSettlement {
  type: string;
  completion: number | null;
  milestoneNames: string[];
  subMilestoneNames: string[];
  taskNames: string[];
}

interface VendorRecord {
  vendor: Vendor;
  loaded: boolean;
  loading: boolean;
  tasks: IProjectTask[];
  invoices: VendorInvoice[];
  audits: VendorAudit[];
  laborWorkers: LaborWorker[];
  laborStats: LaborStats;
  projectData: any;
  milestoneMap: Record<number, string>;
  subMilestoneMap: Record<number, string>;
  taskMap: Record<number, string>;
  totalBilled: number;
  totalPaid: number;
  totalDailyLaborCost: number;
}

@Component({
  selector: 'app-vendors-history',
  standalone: false,
  templateUrl: './vendors-history.html',
  styleUrl: './vendors-history.scss',
})
export class VendorsHistory implements OnInit {
  private vendorService = inject(VendorsServices);
  private invoiceService = inject(VendorInvoiceService);
  private auditService = inject(VendorAuditService);
  private laborService = inject(VendorsLaborServices);
  private projectService = inject(ProjectService);

  vendors: Vendor[] = [];
  searchTerm = '';
  statusFilter = 'all';
  exporting = false;

  expandedVendorId: string | null = null;
  records: Record<string, VendorRecord> = {};

  Math = Math;
  Number = Number;

  ngOnInit(): void {
    this.vendorService.vendors$.subscribe((v) => (this.vendors = v));
    if (this.vendorService.getVendors().length === 0) {
      this.vendorService.loadVendors();
    } else {
      this.vendors = this.vendorService.getVendors();
    }
  }

  get filteredVendors(): Vendor[] {
    let list = [...this.vendors];
    if (this.statusFilter !== 'all') {
      list = list.filter((v) => v.status.toLowerCase() === this.statusFilter);
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(term) ||
          v.email.toLowerCase().includes(term) ||
          v.skill.some((s) => s.toLowerCase().includes(term))
      );
    }
    return list;
  }

  toggleVendor(vendor: Vendor): void {
    if (this.expandedVendorId === vendor.id) {
      this.expandedVendorId = null;
      return;
    }
    this.expandedVendorId = vendor.id;
    if (!this.records[vendor.id] || !this.records[vendor.id].loaded) {
      this.loadVendorRecord(vendor);
    }
  }

  isExpanded(vendor: Vendor): boolean {
    return this.expandedVendorId === vendor.id;
  }

  private loadVendorRecord(vendor: Vendor): Promise<VendorRecord> {
    return new Promise((resolve) => {
      const rec: VendorRecord = {
        vendor,
        loaded: false,
        loading: true,
        tasks: [],
        invoices: [],
        audits: [],
        laborWorkers: [],
        laborStats: {
          totalPersonnel: 0, onSite: 0, remaining: 0,
          activePersonnel: 0, skillCompliance: '0%', skillComposition: [],
        },
        projectData: null,
        milestoneMap: {},
        subMilestoneMap: {},
        taskMap: {},
        totalBilled: 0,
        totalPaid: 0,
        totalDailyLaborCost: 0,
      };
      this.records[vendor.id] = rec;

      let pending = vendor.project_id ? 5 : 3;
      const finish = () => {
        pending--;
        if (pending <= 0) {
          rec.loaded = true;
          rec.loading = false;
          this.computeTotals(rec);
          resolve(rec);
        }
      };

      this.invoiceService.loadInvoices(vendor.id);
      const invSub = this.invoiceService.invoices$.subscribe((invs) => {
        rec.invoices = invs;
      });
      setTimeout(() => { invSub.unsubscribe(); finish(); }, 450);

      this.auditService.loadAudits(vendor.id);
      const audSub = this.auditService.audits$.subscribe((auds) => {
        rec.audits = auds;
      });
      setTimeout(() => { audSub.unsubscribe(); finish(); }, 450);

      this.laborService.loadLaborForVendor(vendor.id);
      const laborSub = this.laborService.workers$.subscribe((w) => (rec.laborWorkers = w));
      const laborStatsSub = this.laborService.stats$.subscribe((s) => (rec.laborStats = s));
      setTimeout(() => { laborSub.unsubscribe(); laborStatsSub.unsubscribe(); finish(); }, 450);

      if (vendor.project_id) {
        this.projectService.getProjectById(vendor.project_id).subscribe({
          next: (res: any) => {
            rec.projectData = res?.data ?? null;
            this.buildMilestoneMaps(rec);
            finish();
          },
          error: () => { rec.projectData = null; finish(); },
        });
        this.projectService.getProjectTasks(vendor.project_id).subscribe({
          next: (res: any) => {
            rec.tasks = res?.data || [];
            this.buildTaskMap(rec);
            finish();
          },
          error: () => { rec.tasks = []; finish(); },
        });
      }
    });
  }

  private buildMilestoneMaps(rec: VendorRecord): void {
    const withChild = Array.isArray(rec.projectData?.milestones_with_child)
      ? rec.projectData.milestones_with_child
      : [];
    withChild.forEach((m: any) => {
      if (!m.parent_id) {
        rec.milestoneMap[Number(m.id)] = m.name ?? m.title ?? `Milestone #${m.id}`;
      } else {
        rec.subMilestoneMap[Number(m.id)] = m.name ?? m.title ?? `Sub-Milestone #${m.id}`;
      }
      (m.children || []).forEach((c: any) => {
        rec.subMilestoneMap[Number(c.id)] = c.name ?? c.title ?? `Sub-Milestone #${c.id}`;
      });
    });
  }

  private buildTaskMap(rec: VendorRecord): void {
    rec.tasks.forEach((t: any) => {
      rec.taskMap[Number(t.id)] = t.title ?? `Task #${t.id}`;
    });
  }

  private computeTotals(rec: VendorRecord): void {
    rec.totalBilled = rec.invoices
      .filter((i) => i.status !== 'Cancelled')
      .reduce((s, i) => s + (Number(i.grand_total) || 0), 0);

    rec.totalPaid = rec.invoices.reduce(
      (s, i) => s + (Number(i.paid_amount) || 0),
      0
    );

    rec.totalDailyLaborCost = rec.laborWorkers.reduce(
      (s, w) => s + (Number(w.daily_rate) || 0) * (w.labor_count || 0),
      0
    );
  }


  getInvoiceItems(inv: VendorInvoice): any[] {
    if (Array.isArray(inv.items)) return inv.items;
    try {
      const parsed = JSON.parse(inv.items as any);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  invoiceHasLabor(inv: VendorInvoice): boolean {
    return this.getInvoiceItems(inv).some((i: any) => i.type === 'labor');
  }

  resolveSettlement(rec: VendorRecord, inv: VendorInvoice): ResolvedSettlement | null {
    if (!inv.settlement_type) return null;
    return {
      type: this.settlementLabel(inv.settlement_type),
      completion: inv.settlement_completion ?? null,
      milestoneNames: (inv.milestone_ids || []).map(
        (id) => rec.milestoneMap[Number(id)] ?? `Milestone #${id}`
      ),
      subMilestoneNames: (inv.sub_milestone_ids || []).map(
        (id) => rec.subMilestoneMap[Number(id)] ?? `Sub-Milestone #${id}`
      ),
      taskNames: (inv.task_ids || []).map(
        (id) => rec.taskMap[Number(id)] ?? `Task #${id}`
      ),
    };
  }

  settlementLabel(type: string): string {
    const map: Record<string, string> = {
      work_poc: 'Work POC',
      milestone: 'Milestone',
      lumpsum: 'Lump Sum',
    };
    return map[type] ?? type;
  }

  budgetUsage(rec: VendorRecord): { allocated: number; invoiced: number; percent: number; exceeded: boolean; exceededBy: number } {
    const allocated = Number(rec.vendor.budget_allocation) || 0;
    const invoiced = rec.totalBilled;
    const percent = allocated > 0 ? Math.round((invoiced / allocated) * 100) : 0;
    const exceeded = allocated > 0 && invoiced > allocated;
    return { allocated, invoiced, percent, exceeded, exceededBy: exceeded ? invoiced - allocated : 0 };
  }

  getInvoiceStatusColor(status: string): string {
    const map: Record<string, string> = {
      Paid: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
      Pending: 'bg-amber-100 text-amber-700',
      'Partially Paid': 'bg-blue-100 text-blue-700',
    };
    return map[status] ?? 'bg-slate-100 text-slate-600';
  }

  getTaskStatusColor(status: unknown): string {
    const normalized = String(status ?? '').toLowerCase().replace(/\s+/g, '_');
    const map: Record<string, string> = {
      completed: 'bg-green-100 text-green-700',
      in_progress: 'bg-blue-100 text-blue-700',
      review: 'bg-purple-100 text-purple-700',
      to_do: 'bg-amber-100 text-amber-700',
      pending: 'bg-amber-100 text-amber-700',
      on_hold: 'bg-slate-100 text-slate-500',
    };
    return map[normalized] ?? 'bg-slate-100 text-slate-500';
  }

  getAuditColor(score: number): string {
    if (score >= 80) return 'bg-green-100 text-green-700';
    if (score >= 50) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() ?? filePath;
  }

  formatDate(dateInput: string | Date | undefined | null): string {
    if (!dateInput) return '—';
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime())) return String(dateInput || '—');
    const dd = String(d.getDate()).padStart(2, '0');
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    const yyyy = d.getFullYear();
    return `${dd}/${mmm}/${yyyy}`;
  }

  formatDateTime(dateInput: string | Date | undefined | null): string {
    if (!dateInput) return '—';
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime())) return String(dateInput || '—');
    return `${this.formatDate(d)} · ${d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  }

  formatAmount(amount?: number | string | null): string {
    const n = Number(amount) || 0;
    return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }

  toNumber(val: any): number {
    return Number(val) || 0;
  }

  remainingAmount(inv: VendorInvoice): number {
    return Math.max(0, this.toNumber(inv.grand_total) - this.toNumber(inv.paid_amount));
  }


  viewInvoice(rec: VendorRecord, inv: VendorInvoice): void {
    const invoiceItems = this.getInvoiceItems(inv);

    const gstMap: Record<number, number> = {};
    invoiceItems.forEach((item: any) => {
      const rate = Number(item.gst) || 0;
      const amt = Number(item.gstAmount) || 0;
      if (amt > 0) gstMap[rate] = (gstMap[rate] || 0) + amt;
    });

    const taxRows = Object.entries(gstMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([rate, amount]) => `
        <div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
          <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
          <span style="font-weight:600;">₹${Number(amount).toLocaleString('en-IN')}</span>
        </div>`).join('');

    const hasLabor = invoiceItems.some((i: any) => i.type === 'labor');
    const itemRows = invoiceItems.map((item: any) => {
      const isLabor = item.type === 'labor';
      const typeLabel = item.type ? String(item.type).charAt(0).toUpperCase() + String(item.type).slice(1) : '—';
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${typeLabel}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.description || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 0}</td>
        ${hasLabor ? `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${isLabor ? (item.hours || 0) + 'h' : ''}</td>` : ''}
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.unitPrice || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.gst || 0}%</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.gstAmount || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">₹${Number(item.total || 0).toLocaleString('en-IN')}</td>
      </tr>`;
    }).join('');

    const settlement = this.resolveSettlement(rec, inv);
    const settlementBlock = settlement ? `
      <div style="margin-top:24px;padding:14px 16px;background:#eff6ff;border-radius:10px;border:1px solid #dbeafe;">
        <p style="margin:0 0 6px;font-weight:800;font-size:12px;color:#1d4ed8;text-transform:uppercase;letter-spacing:.04em;">Settlement Mapping — ${settlement.type}</p>
        ${settlement.completion != null ? `<p style="margin:2px 0;font-size:12px;color:#334155;"><strong>Completion:</strong> ${settlement.completion}%</p>` : ''}
        ${settlement.milestoneNames.length ? `<p style="margin:2px 0;font-size:12px;color:#334155;"><strong>Milestones:</strong> ${settlement.milestoneNames.join(', ')}</p>` : ''}
        ${settlement.subMilestoneNames.length ? `<p style="margin:2px 0;font-size:12px;color:#334155;"><strong>Sub-Milestones:</strong> ${settlement.subMilestoneNames.join(', ')}</p>` : ''}
        ${settlement.taskNames.length ? `<p style="margin:2px 0;font-size:12px;color:#334155;"><strong>Tasks:</strong> ${settlement.taskNames.join(', ')}</p>` : ''}
      </div>` : '';

    const paymentHistory: any[] = Array.isArray(inv.payment_history) ? inv.payment_history : [];
    const paymentRows = paymentHistory.length > 0 ? `
      <div style="margin-top:24px;">
        <h3 style="font-size:14px;font-weight:900;margin-bottom:10px;color:#1e293b;">Payment History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="background:#f1f5f9;">
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">#</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Date</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Mode</th>
            <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;">Reference</th>
            <th style="padding:8px 12px;text-align:right;font-size:11px;text-transform:uppercase;">Amount</th>
          </tr></thead>
          <tbody>
            ${paymentHistory.map((p, i) => `
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${i + 1}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${this.formatDate(p.paid_at)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.mode || '—'}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.reference || '—'}${p.clearance_date ? ' (Clr: ' + this.formatDate(p.clearance_date) + ')' : ''}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;text-align:right;">₹${Number(p.amount).toLocaleString('en-IN')}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>` : '';

    const projectName = rec.projectData?.name || 'Project not linked';

    const html = `<!DOCTYPE html>
<html><head><title>Invoice ${inv.invoice_number}</title>
<style>
  body { font-family: sans-serif; padding: 40px; color: #1e293b; }
  h1 { font-size: 24px; font-weight: 900; margin: 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; }
  th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; }
  @media print { button { display: none !important; } }
</style></head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <div><h1>Tax Invoice</h1><p style="color:#64748b;margin:4px 0 0;">${rec.vendor.name}</p></div>
    <div style="text-align:right;">
      <p style="font-weight:900;font-size:18px;margin:0;">${inv.invoice_number}</p>
      <p style="color:#64748b;margin:4px 0 0;">${this.formatDate(inv.invoice_date)}</p>
      <span style="display:inline-block;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;
        background:${inv.status === 'Paid' ? '#dcfce7' : inv.status === 'Cancelled' ? '#fee2e2' : inv.status === 'Partially Paid' ? '#dbeafe' : '#fef3c7'};
        color:${inv.status === 'Paid' ? '#15803d' : inv.status === 'Cancelled' ? '#dc2626' : inv.status === 'Partially Paid' ? '#1d4ed8' : '#b45309'};margin-top:6px;">
        ${inv.status}
      </span>
    </div>
  </div>

  <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
    <p style="margin:0;font-weight:700;">Bill To: ${rec.vendor.name}</p>
    <p style="margin:4px 0 0;color:#64748b;">${rec.vendor.address?.street || ''} ${rec.vendor.address?.pincode || ''}</p>
    <p style="margin:4px 0 0;color:#64748b;">GST: ${rec.vendor.kyc?.gst || '—'} | PAN: ${rec.vendor.kyc?.pan || '—'}</p>
    <p style="margin:6px 0 0;"><span style="font-size:11px;font-weight:700;text-transform:uppercase;color:#94a3b8;">Project:</span> <span style="font-weight:700;">${projectName}</span></p>
  </div>

  <table>
    <thead><tr>
      <th>Type</th><th>Description</th><th style="text-align:center;">Qty</th>
      ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ''}
      <th style="text-align:right;">Rate (₹)</th><th style="text-align:center;">Tax %</th>
      <th style="text-align:right;">Tax (₹)</th><th style="text-align:right;">Total (₹)</th>
    </tr></thead>
    <tbody>${itemRows}</tbody>
  </table>

  <div style="margin-top:24px;max-width:340px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Subtotal</span><span style="font-weight:700;">₹${Number(inv.subtotal).toLocaleString('en-IN')}</span>
    </div>
    ${taxRows}
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Total Tax</span><span style="font-weight:700;">₹${Number(inv.tax_amount).toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:12px 0;">
      <span style="font-weight:900;">Grand Total</span>
      <span style="color:#4f46e5;font-size:18px;font-weight:900;">₹${Number(inv.grand_total).toLocaleString('en-IN')}</span>
    </div>
    ${Number(inv.paid_amount) > 0 ? `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:2px solid #e5e7eb;">
      <span style="color:#16a34a;font-weight:700;">Paid Amount</span><span style="color:#16a34a;font-weight:900;">₹${Number(inv.paid_amount).toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;">
      <span style="color:#dc2626;font-weight:700;">Remaining</span>
      <span style="color:#dc2626;font-weight:900;">₹${Math.max(0, Number(inv.grand_total) - Number(inv.paid_amount)).toLocaleString('en-IN')}</span>
    </div>` : ''}
  </div>

  ${settlementBlock}
  ${paymentRows}

  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()" style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body></html>`;

    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }


  downloadVendorReport(rec: VendorRecord): void {
    const v = rec.vendor;
    const projectName = rec.projectData?.name || 'Project not linked';
    const invoiceRows = rec.invoices.map((inv) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${inv.invoice_number}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${this.formatDate(inv.invoice_date)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(inv.grand_total)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(inv.paid_amount)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${inv.status}</td>
      </tr>`).join('');

    const auditRows = rec.audits.map((a) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${this.formatDate(a.audit_date || a.createdAt)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.quality}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.timeliness}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${a.safety}/10</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:700;">${Math.round(Number(a.composite_score))}%</td>
      </tr>`).join('');

    const laborRows = rec.laborWorkers.map((w) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${w.skill}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:center;">${w.labor_count}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;text-align:right;">${this.formatAmount(w.daily_rate)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${w.statusLabel || w.status}</td>
      </tr>`).join('');

    const html = `<!DOCTYPE html>
<html><head><title>Vendor Report - ${v.name}</title>
<style>
  body { font-family: sans-serif; padding: 36px; color: #1e293b; }
  h1 { font-size: 22px; font-weight: 900; margin: 0 0 4px; }
  h2 { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: #475569; margin: 28px 0 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; margin-top: 6px; }
  th { background: #f1f5f9; padding: 8px 10px; text-align: left; font-size: 10px; text-transform: uppercase; }
  @media print { button { display: none !important; } }
</style></head>
<body>
  <h1>Vendor Report — ${v.name}</h1>
  <p style="color:#64748b;margin:0;">Generated on ${this.formatDate(new Date())}</p>

  <h2>Vendor Details</h2>
  <p><strong>SPOC:</strong> ${v.spoc.name} · ${v.spoc.phone}</p>
  <p><strong>GST:</strong> ${v.kyc.gst || '—'} &nbsp; <strong>PAN:</strong> ${v.kyc.pan || '—'}</p>
  <p><strong>Address:</strong> ${v.address.street}, ${v.address.pincode}</p>
  <p><strong>Budget Allocated:</strong> ${v.budget} &nbsp; <strong>Compliance Score:</strong> ${v.compliance_score}%</p>
  <p><strong>Project:</strong> ${projectName}</p>

  <h2>Invoices (${rec.invoices.length})</h2>
  <table>
    <thead><tr><th>Invoice #</th><th>Date</th><th style="text-align:right;">Amount</th><th style="text-align:right;">Paid</th><th>Status</th></tr></thead>
    <tbody>${invoiceRows || '<tr><td colspan="5" style="padding:12px;text-align:center;color:#94a3b8;">No invoices</td></tr>'}</tbody>
  </table>

  <h2>Audits (${rec.audits.length})</h2>
  <table>
    <thead><tr><th>Date</th><th style="text-align:center;">Quality</th><th style="text-align:center;">Timeliness</th><th style="text-align:center;">Safety</th><th style="text-align:center;">Score</th></tr></thead>
    <tbody>${auditRows || '<tr><td colspan="5" style="padding:12px;text-align:center;color:#94a3b8;">No audits</td></tr>'}</tbody>
  </table>

  <h2>Labor (${rec.laborWorkers.length})</h2>
  <table>
    <thead><tr><th>Skill</th><th style="text-align:center;">Count</th><th style="text-align:right;">Rate/day</th><th>Status</th></tr></thead>
    <tbody>${laborRows || '<tr><td colspan="4" style="padding:12px;text-align:center;color:#94a3b8;">No labor records</td></tr>'}</tbody>
  </table>

  <div style="margin-top:30px;text-align:center;">
    <button onclick="window.print()" style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body></html>`;

    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }


  async exportAllToCsv(): Promise<void> {
    if (this.exporting) return;
    this.exporting = true;

    try {
      for (const v of this.filteredVendors) {
        if (!this.records[v.id] || !this.records[v.id].loaded) {
          await this.loadVendorRecord(v);
        }
      }

      const rows: string[] = [];
      rows.push('Vendor,Project,Record Type,Reference,Date,Amount,Status,Details');

      const esc = (val: any) => `"${String(val ?? '—').replace(/"/g, '""')}"`;

      this.filteredVendors.forEach((v) => {
        const rec = this.records[v.id];
        if (!rec) return;
        const projectName = rec.projectData?.name || 'Not linked';

        rec.invoices.forEach((inv) => {
          rows.push([
            esc(v.name), esc(projectName), esc('Invoice'), esc(inv.invoice_number),
            esc(this.formatDate(inv.invoice_date)), esc(this.toNumber(inv.grand_total)),
            esc(inv.status), esc(`Paid: ${this.formatAmount(inv.paid_amount)}`),
          ].join(','));

          (inv.payment_history || []).forEach((p) => {
            rows.push([
              esc(v.name), esc(projectName), esc('Payment'), esc(inv.invoice_number),
              esc(this.formatDate(p.paid_at)), esc(this.toNumber(p.amount)),
              esc(p.mode), esc(p.reference ? `Ref: ${p.reference}` : '—'),
            ].join(','));
          });
        });

        rec.audits.forEach((a) => {
          rows.push([
            esc(v.name), esc(projectName), esc('Audit'), esc('—'),
            esc(this.formatDate(a.audit_date || a.createdAt)), esc('—'),
            esc(`${Math.round(Number(a.composite_score))}%`), esc(a.observations || '—'),
          ].join(','));
        });

        rec.laborWorkers.forEach((w) => {
          rows.push([
            esc(v.name), esc(projectName), esc('Labor'), esc(w.skill),
            esc('—'), esc(this.toNumber(w.daily_rate) * (w.labor_count || 0)),
            esc(w.statusLabel || w.status), esc(`Count: ${w.labor_count} · Assigned: ${w.assign_worker || 'Unassigned'}`),
          ].join(','));
        });
      });

      if (rows.length === 1) {
        alert('No data found across vendors to export.');
        return;
      }

      const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vendor-history-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      this.exporting = false;
    }
  }
}