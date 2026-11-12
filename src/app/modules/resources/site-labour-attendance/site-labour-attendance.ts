import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../projects/services/project-service';
import { ToastrService } from 'ngx-toastr';

export interface SiteLabourLog {
  id: number | string;
  projectId: number | string;
  projectName: string;
  attendanceDate: string;
  tradeType: string;
  skillLevel: 'Skilled' | 'Semi-Skilled' | 'Unskilled' | 'Foreman' | 'Supervisor';
  headcount: number;
  shift: 'Day' | 'Night' | 'Overtime';
  workLocation: string;
  overtimeHours: number;
  dailyWageRate: number;
  totalCost: number;
  contractorName: string;
  notes: string;
  status: 'Verified' | 'Pending Review';
}

@Component({
  selector: 'app-site-labour-attendance',
  standalone: false,
  templateUrl: './site-labour-attendance.html',
  styleUrl: './site-labour-attendance.scss'
})
export class SiteLabourAttendanceComponent implements OnInit {
  projects: any[] = [];
  selectedProjectId: string = 'all';
  searchQuery: string = '';
  selectedTrade: string = 'all';

  labourLogs: SiteLabourLog[] = [
    {
      id: 1,
      projectId: 1,
      projectName: 'Skyline Commercial Towers',
      attendanceDate: '2026-10-27',
      tradeType: 'Carpenters & Shuttering',
      skillLevel: 'Skilled',
      headcount: 18,
      shift: 'Day',
      workLocation: 'Tower A • 6th Floor Deck',
      overtimeHours: 2,
      dailyWageRate: 850,
      totalCost: 19125,
      contractorName: 'Om Shanti Construction Gang',
      notes: 'Shuttering for main slab beam staging',
      status: 'Verified'
    },
    {
      id: 2,
      projectId: 1,
      projectName: 'Skyline Commercial Towers',
      attendanceDate: '2026-10-27',
      tradeType: 'Steel Fixers & Barbenders',
      skillLevel: 'Skilled',
      headcount: 14,
      shift: 'Day',
      workLocation: 'Tower A • Core Wall Reinforcement',
      overtimeHours: 1,
      dailyWageRate: 900,
      totalCost: 14175,
      contractorName: 'Apex Subcontracting Services',
      notes: 'Tying vertical dowels 32mm Fe550D',
      status: 'Verified'
    },
    {
      id: 3,
      projectId: 2,
      projectName: 'Metro Rail Corridor 4',
      attendanceDate: '2026-10-27',
      tradeType: 'Masons & Plasterers',
      skillLevel: 'Semi-Skilled',
      headcount: 22,
      shift: 'Day',
      workLocation: 'Station Concourse Level',
      overtimeHours: 0,
      dailyWageRate: 750,
      totalCost: 16500,
      contractorName: 'National Infra Labourers',
      notes: 'Blockwork masonry perimeter walls',
      status: 'Verified'
    },
    {
      id: 4,
      projectId: 2,
      projectName: 'Metro Rail Corridor 4',
      attendanceDate: '2026-10-27',
      tradeType: 'Electricians & Cable Pullers',
      skillLevel: 'Skilled',
      headcount: 8,
      shift: 'Night',
      workLocation: 'Trackbed Conduit Route 2',
      overtimeHours: 4,
      dailyWageRate: 950,
      totalCost: 11400,
      contractorName: 'PowerTech Electricals',
      notes: 'Night shift cable tray installation',
      status: 'Pending Review'
    },
    {
      id: 5,
      projectId: 3,
      projectName: 'Green Valley Residential Villas',
      attendanceDate: '2026-10-27',
      tradeType: 'General Helpers & Labourers',
      skillLevel: 'Unskilled',
      headcount: 35,
      shift: 'Day',
      workLocation: 'Roadway & Landscape Zone',
      overtimeHours: 0,
      dailyWageRate: 600,
      totalCost: 21000,
      contractorName: 'Kaveri Labour Syndicate',
      notes: 'Earth leveling, material carrying and curing',
      status: 'Verified'
    }
  ];

  filteredLogs: SiteLabourLog[] = [];
  showAddModal: boolean = false;

  newLog: Partial<SiteLabourLog> = {
    projectId: 1,
    tradeType: 'Carpenters & Shuttering',
    skillLevel: 'Skilled',
    headcount: 10,
    shift: 'Day',
    workLocation: '',
    overtimeHours: 0,
    dailyWageRate: 800,
    contractorName: '',
    notes: '',
    attendanceDate: new Date().toISOString().split('T')[0]
  };

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.applyFilters();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = res.data || [];
      },
      error: () => {
        // Fallback projects if API unavailable
        this.projects = [
          { id: 1, name: 'Skyline Commercial Towers' },
          { id: 2, name: 'Metro Rail Corridor 4' },
          { id: 3, name: 'Green Valley Residential Villas' }
        ];
      }
    });
  }

  applyFilters(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredLogs = this.labourLogs.filter(log => {
      const matchProject = this.selectedProjectId === 'all' || String(log.projectId) === String(this.selectedProjectId);
      const matchTrade = this.selectedTrade === 'all' || log.tradeType === this.selectedTrade;
      const matchSearch = !q ||
        log.tradeType.toLowerCase().includes(q) ||
        log.contractorName.toLowerCase().includes(q) ||
        log.workLocation.toLowerCase().includes(q) ||
        log.projectName.toLowerCase().includes(q);

      return matchProject && matchTrade && matchSearch;
    });
  }

  get totalPersonnel(): number {
    return this.filteredLogs.reduce((sum, l) => sum + (l.headcount || 0), 0);
  }

  get totalDailyCost(): number {
    return this.filteredLogs.reduce((sum, l) => sum + (l.totalCost || 0), 0);
  }

  get totalOvertimeHours(): number {
    return this.filteredLogs.reduce((sum, l) => sum + (l.overtimeHours * l.headcount || 0), 0);
  }

  openRecordModal(): void {
    this.newLog = {
      projectId: this.projects[0]?.id || 1,
      tradeType: 'Carpenters & Shuttering',
      skillLevel: 'Skilled',
      headcount: 10,
      shift: 'Day',
      workLocation: '',
      overtimeHours: 0,
      dailyWageRate: 800,
      contractorName: '',
      notes: '',
      attendanceDate: new Date().toISOString().split('T')[0]
    };
    this.showAddModal = true;
  }

  saveAttendance(): void {
    if (!this.newLog.workLocation || !this.newLog.headcount || !this.newLog.dailyWageRate) {
      this.toastr.warning('Please enter work location, headcount, and daily wage rate.');
      return;
    }

    const selectedProj = this.projects.find(p => String(p.id) === String(this.newLog.projectId));
    const baseWage = (this.newLog.headcount || 0) * (this.newLog.dailyWageRate || 0);
    const otWage = (this.newLog.overtimeHours || 0) * ((this.newLog.dailyWageRate || 0) / 8 * 1.5) * (this.newLog.headcount || 0);

    const log: SiteLabourLog = {
      id: Date.now(),
      projectId: this.newLog.projectId || 1,
      projectName: selectedProj ? selectedProj.name : 'Active Site',
      attendanceDate: this.newLog.attendanceDate || new Date().toISOString().split('T')[0],
      tradeType: this.newLog.tradeType || 'General Labour',
      skillLevel: this.newLog.skillLevel || 'Skilled',
      headcount: Number(this.newLog.headcount),
      shift: this.newLog.shift || 'Day',
      workLocation: this.newLog.workLocation || 'Site Main',
      overtimeHours: Number(this.newLog.overtimeHours || 0),
      dailyWageRate: Number(this.newLog.dailyWageRate),
      totalCost: Math.round(baseWage + otWage),
      contractorName: this.newLog.contractorName || 'Direct Gang',
      notes: this.newLog.notes || '',
      status: 'Verified'
    };

    this.labourLogs.unshift(log);
    this.applyFilters();
    this.showAddModal = false;
    this.toastr.success('Labour attendance gang log recorded successfully.');
  }
}
