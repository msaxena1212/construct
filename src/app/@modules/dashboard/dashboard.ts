import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, TitleStrategy } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../@shared/material/material-module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressBarModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LoadingBarHttpClientModule, AgGridModule, FlexLayoutModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  aiPanelOpen = false;
  fabOpen = false;
  isListening = false;
  chatInput = '';

  chatMessages: { from: 'user' | 'ai'; text: string }[] = [
    { from: 'user', text: 'Show me the latest safety reports from Sector 7.' },
    { from: 'ai', text: 'I am analyzing your request regarding "Show me the latest safety reports from Sector 7." The updated insights will be reflected in your dashboard shortly.' }
  ];

  quickActions = [
    { label: 'Auto-generate Daily Report', icon: '📄' },
    { label: 'Export Budget Variances', icon: '💹' }
  ];

  fabItems = [
    { icon: '📷', color: '#10b981', label: 'Camera' },
    { icon: '📊', color: '#2563eb', label: 'Reports' },
    { icon: '📅', color: '#f59e0b', label: 'Schedule' },
    { icon: '💬', color: '#8b5cf6', label: 'Message' }
  ];

  mapDots = Array.from({ length: 40 }, () => ({
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 5,
    active: Math.random() > 0.7
  }));

  benchmarks = [
    { month: 'OCT', day: '14', name: 'Level 02 Concrete Pour', project: 'SKYLINE TOWER PORTFOLIO' },
    { month: 'OCT', day: '17', name: 'HVAC System Audit', project: 'HARBOR BRIDGE RENOVATION' }
  ];

  complianceItems = [
    { name: 'FAA CLEARANCE', sub: 'ACTIVE · SKYLINE II', status: 'ok' },
    { name: 'SAFETY PERMIT', sub: 'EXPIRING IN 4 DAYS', status: 'warn' }
  ];

  onVoiceCommand(): void {
    if (this.aiPanelOpen) {
      this.closeAiPanel();
      return;
    }

    if (this.isListening) return;

    this.isListening = true;
    this.fabOpen = false;

    setTimeout(() => {
      this.isListening = false;
      this.aiPanelOpen = true;
    }, 2500);
  }

  closeAiPanel(): void {
    this.aiPanelOpen = false;
    this.isListening = false;
  }

  toggleFab(): void {
    this.fabOpen = !this.fabOpen;
  }

  sendChat(): void {
    const msg = this.chatInput.trim();
    if (!msg) return;
    this.chatMessages.push({ from: 'user', text: msg });
    this.chatInput = '';
    setTimeout(() => {
      this.chatMessages.push({
        from: 'ai',
        text: `Analyzing: "${msg}". Results will be reflected in your dashboard shortly.`
      });
    }, 800);
  }

  onChatKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.sendChat();
  }
}
