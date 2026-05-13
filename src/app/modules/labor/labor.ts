import { Component, OnInit, inject } from '@angular/core';
import { LaborServices, ContractorMetric, LaborStats } from '../labor/services/labor-services';

@Component({
  selector: 'app-labor',
  standalone: false,
  templateUrl: './labor.html',
  styleUrl: './labor.scss',
})
export class Labor implements OnInit {
  private analyticsService = inject(LaborServices);
  Math = Math;

  contractors: ContractorMetric[] = [];
  stats: LaborStats | null = null;

  team = [
    { name: 'All Members' },
    { name: 'Sarah Jenkins' },
    { name: 'Mark Thompson' }
  ];
  selectedMember = 'All Members';

  shiftActivity = [
    { name: 'Sarah Jenkins', role: 'Foreman', status: 'On Site', statusClass: 'bg-green-100 text-green-700', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAyOvDxwm7IY0fGzIcQewafXbHLkhV-OUeDRgpe-ymlTiSF9hWPY5xwBf-2prAqKdk9IcvsKvxTko5295kb7C7PYVsBgmb3T34K9pNFtGtJe89fMaS9GJ_8EjbgAxjAnY6Zm1m1Zw7sE2he8Oi2cJrVb6qMCuHA6g-_aA0cl19DhNAsXu41XLTSob64u0jvX1TDdqkvRc-gdbpX9OsXR1e3DVpAX0AknzrS7cwF9FPuxoMlyvVopoOqU3Y7xwR0OlwYFxh5RBNaWkr', activities: [{ label: 'Site Supervision: North Wing', left: '10%', width: '60%', type: 'primary' }, { label: 'Safety Audit', left: '75%', width: '15%', type: 'secondary' }] },
    { name: 'Mark Thompson', role: 'Specialist', status: 'Active', statusClass: 'bg-blue-100 text-blue-700', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvmrDmdNuYaE5vTixXe6B6Wbv3m1nAaRGc5AeHwtiGjCNtTkdqJt9_thcbj1ZTdTZzag-PHoimyOwQO-Vt9i1fHGa5hBC6XudSDWNKFcdtksoSSOKHlB79jV_dagoeD4b3vfmR_Bsh83DuEKlVupf5xcxS4MMW8a97mPzfu6gEuMVHsF1KdGw7q3xZYIemN0C8ANuiM4AAK9Q5krlxO6bnYXlmTEc04Fx6DJArq8ABEhFBOzFNsqzpEv5lj_YDyQGf9wughldNujAP', activities: [{ label: 'HVAC Installation & Testing', left: '5%', width: '80%', type: 'solid' }] }
  ];

  heatmap = Array(3).fill(0).map(() => Array(7).fill(0).map(() => Math.floor(Math.random() * 5)));

  profitabilityLeaks = [
    { zone: 'North Wing - Level 4', contractor: 'Vanguard Electrical', delta: -4200, trend: 'increasing', resolution: 'Investigate overtime logs' },
    { zone: 'East Plaza - Civil', contractor: 'Apex Concrete Solutions', delta: -1850, trend: 'stable', resolution: 'Material delay incurred holding costs' }
  ];

  ngOnInit(): void {
    this.analyticsService.contractors$.subscribe(c => this.contractors = c);
    this.analyticsService.laborStats$.subscribe(s => this.stats = s);
  }

  get filteredShiftActivity() {
    if (this.selectedMember === 'All Members') return this.shiftActivity;
    return this.shiftActivity.filter(w => w.name === this.selectedMember);
  }

  getEfficiencyColor(efficiency: number): string {
    if (efficiency > 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (efficiency > 75) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  }
}
