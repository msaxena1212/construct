import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-ai-agents-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-agents-hub.html',
})
export class AiAgentsHub implements OnInit, OnChanges {
  @Input() projectId: string | number = '';

  loading = false;
  runningAgents = false;
  insights: any = null;
  modelStatus: any = null;
  indiaCompliance: any = null;

  // Copilot Chat
  copilotQuery = '';
  copilotLoading = false;
  copilotHistory: { role: 'user' | 'assistant'; text: string; timestamp: Date; unavailable?: boolean }[] = [];

  presetQueries = [
    'Summarize current CPI, SPI, and budget overrun risks',
    'Which materials are low on stock and need urgent reordering?',
    'List open high-severity safety hazards and pending RFIs',
    'Audit pending vendor RA bills and statutory compliance flags',
  ];

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.projectId) {
      this.loadAll();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && !changes['projectId'].firstChange && this.projectId) {
      this.loadAll();
    }
  }

  loadAll(): void {
    if (!this.projectId) return;
    this.loading = true;
    this.projectService.getAgentInsights(this.projectId).subscribe({
      next: (res) => {
        this.insights = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });

    this.projectService.getAgentModelStatus().subscribe({
      next: (res) => {
        this.modelStatus = res.data;
      },
      error: () => {},
    });

    this.projectService.getIndiaCompliance(this.projectId).subscribe({
      next: (res) => {
        this.indiaCompliance = res.data;
      },
      error: () => {},
    });
  }

  runAgentsNow(): void {
    if (!this.projectId || this.runningAgents) return;
    this.runningAgents = true;
    this.projectService.runProjectAgents(this.projectId).subscribe({
      next: (res) => {
        this.runningAgents = false;
        const created = res.data?.created || 0;
        if (created > 0) {
          this.toastr.success(`Autonomous Swarm finished: ${created} new follow-up action(s) created.`);
        } else {
          this.toastr.info('All 11 autonomous agents verified project controls. No new anomalies detected.');
        }
        this.loadAll();
      },
      error: (err) => {
        this.runningAgents = false;
        this.toastr.error(err?.error?.message || 'Failed to trigger autonomous agents.');
      },
    });
  }

  askCopilot(preset?: string): void {
    const q = (preset || this.copilotQuery || '').trim();
    if (!q || !this.projectId || this.copilotLoading) return;
    if (!preset) this.copilotQuery = '';

    this.copilotHistory.push({ role: 'user', text: q, timestamp: new Date() });
    this.copilotLoading = true;

    this.projectService.askCopilot(this.projectId, q).subscribe({
      next: (res) => {
        this.copilotLoading = false;
        const answer = res?.data?.answer || 'No response received from Zyno Copilot.';
        this.copilotHistory.push({ role: 'assistant', text: answer, timestamp: new Date() });
      },
      error: (err) => {
        this.copilotLoading = false;
        const msg = err?.error?.message || 'AI model endpoint is currently offline or unreachable. Deterministic agents remain active.';
        this.copilotHistory.push({ role: 'assistant', text: msg, timestamp: new Date(), unavailable: true });
      },
    });
  }

  getAgentIcon(agentId: string): string {
    const icons: Record<string, string> = {
      approval_chaser: 'schedule_send',
      retention_watcher: 'savings',
      guarantee_watcher: 'account_balance',
      cost_watcher: 'monitoring',
      india_compliance: 'gavel',
      safety_sentinel: 'health_and_safety',
      procurement_burn: 'inventory_2',
      rfi_assistant: 'engineering',
      dispute_risk: 'balance',
      subcontractor_performance: 'verified',
      briefing: 'auto_awesome',
    };
    return icons[agentId] || 'smart_toy';
  }

  getHealthColor(score: number): string {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 65) return 'text-blue-500';
    if (score >= 45) return 'text-amber-500';
    return 'text-rose-500';
  }
}
