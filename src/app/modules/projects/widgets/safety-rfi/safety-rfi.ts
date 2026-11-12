import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-safety-rfi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './safety-rfi.html',
})
export class SafetyRfi implements OnInit, OnChanges {
  @Input() projectId: string | number = '';

  activeSubTab: 'safety' | 'rfis' = 'safety';
  loading = false;

  // Safety State
  safetyMetrics: any = null;
  incidents: any[] = [];
  toolboxTalks: any[] = [];
  showIncidentForm = false;
  showTalkForm = false;

  newIncident = {
    title: '',
    location: '',
    severity: 'near_miss',
    category: 'Working at Height',
    description: '',
    immediate_action: '',
  };

  newTalk = {
    topic: '',
    attendee_count: 18,
    trade: 'All Site Trades',
    key_points_discussed: '',
  };

  // RFI State
  rfis: any[] = [];
  showRfiForm = false;
  answeringRfi: any = null;
  rfiAnswerText = '';

  newRfi = {
    subject: '',
    question: '',
    discipline: 'Structural',
    priority: 'medium',
    drawing_reference: '',
    cost_impact: false,
    schedule_impact: false,
  };

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
    this.projectService.getSafetySummary(this.projectId).subscribe({
      next: (res) => {
        this.safetyMetrics = res.data?.metrics || null;
        this.incidents = res.data?.recent_incidents || [];
        this.toolboxTalks = res.data?.recent_talks || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });

    this.projectService.getProjectRFIs(this.projectId).subscribe({
      next: (res) => {
        this.rfis = res.data || [];
      },
      error: () => {},
    });
  }

  submitIncident(): void {
    if (!this.projectId || !this.newIncident.title.trim()) {
      this.toastr.warning('Incident title is required.');
      return;
    }
    this.projectService.createSafetyIncident(this.projectId, this.newIncident).subscribe({
      next: () => {
        this.toastr.success('Safety incident logged.');
        this.showIncidentForm = false;
        this.newIncident = {
          title: '',
          location: '',
          severity: 'near_miss',
          category: 'Working at Height',
          description: '',
          immediate_action: '',
        };
        this.loadAll();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Could not log incident.');
      },
    });
  }

  markIncidentClosed(inc: any): void {
    this.projectService.updateSafetyIncident(this.projectId, inc.id, { status: 'closed' }).subscribe({
      next: () => {
        this.toastr.success('Safety incident marked closed.');
        this.loadAll();
      },
      error: () => {
        this.toastr.error('Failed to update incident.');
      },
    });
  }

  submitToolboxTalk(): void {
    if (!this.projectId || !this.newTalk.topic.trim()) {
      this.toastr.warning('Toolbox talk topic is required.');
      return;
    }
    this.projectService.createToolboxTalk(this.projectId, this.newTalk).subscribe({
      next: () => {
        this.toastr.success('Toolbox talk recorded.');
        this.showTalkForm = false;
        this.newTalk = {
          topic: '',
          attendee_count: 18,
          trade: 'All Site Trades',
          key_points_discussed: '',
        };
        this.loadAll();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Could not save toolbox talk.');
      },
    });
  }

  submitRfi(): void {
    if (!this.projectId || !this.newRfi.subject.trim() || !this.newRfi.question.trim()) {
      this.toastr.warning('RFI subject and technical question are required.');
      return;
    }
    this.projectService.createRFI(this.projectId, this.newRfi).subscribe({
      next: () => {
        this.toastr.success('RFI submitted with AI technical draft.');
        this.showRfiForm = false;
        this.newRfi = {
          subject: '',
          question: '',
          discipline: 'Structural',
          priority: 'medium',
          drawing_reference: '',
          cost_impact: false,
          schedule_impact: false,
        };
        this.loadAll();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to submit RFI.');
      },
    });
  }

  openAnswerRfi(rfi: any): void {
    this.answeringRfi = rfi;
    this.rfiAnswerText = rfi.ai_draft_response || '';
  }

  submitRfiAnswer(): void {
    if (!this.answeringRfi || !this.rfiAnswerText.trim()) return;
    this.projectService.answerRFI(this.projectId, this.answeringRfi.id, this.rfiAnswerText.trim()).subscribe({
      next: () => {
        this.toastr.success(`RFI ${this.answeringRfi.rfi_number} answered.`);
        this.answeringRfi = null;
        this.rfiAnswerText = '';
        this.loadAll();
      },
      error: () => {
        this.toastr.error('Failed to record RFI answer.');
      },
    });
  }
}
