import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeHistoryServices } from './employee-history-services';
import { TeamService } from '../../users/user-list/services/team.service';
import { AuthService } from '../../../shared/services/auth/auth';

interface HistoryEntry {
  id: string;
  type: string;
  message: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

interface TeamMember {
  id: number;
  firstname: string;
  lastname: string;
  email?: string;
  mobile?: string;
  isActive?: boolean;
  role?: { name: string };
}

@Component({
  selector: 'app-employee-history',
  standalone: false,
  templateUrl: './employee-history.html',
  styleUrl: './employee-history.scss',
})
export class EmployeeHistory implements OnInit {
  employeeId: number | null = null;
  employeeName: string = '';
  history: HistoryEntry[] = [];
  creationActions = ['INVITED', 'INVITE_ACCEPTED', 'ROLE_ASSIGNED'];
  teamMembers: TeamMember[] = [];
  loadingMembers = false;

  loading = false;

  page = 1;
  limit = 20;
  total = 0;
  totalPages = 1;

  skeletonArray = [1, 2, 3, 4];

  dropdownOpen = false;
  isSuperAdmin = false;

  typeConfig: Record<string, { icon: string; color: string; label: string }> = {
    INVITED: { icon: 'send', color: 'blue', label: 'Invited' },
    INVITE_ACCEPTED: { icon: 'check_circle', color: 'emerald', label: 'Setup Complete' },
    ROLE_ASSIGNED: { icon: 'admin_panel_settings', color: 'purple', label: 'Role Assigned' },
    ROLE_UPDATED: { icon: 'admin_panel_settings', color: 'purple', label: 'Role Updated' },
    PROFILE_UPDATED: { icon: 'edit', color: 'amber', label: 'Profile Updated' },
    STATUS_ACTIVATED: { icon: 'check_circle', color: 'emerald', label: 'Activated' },
    STATUS_DEACTIVATED: { icon: 'block', color: 'rose', label: 'Deactivated' },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeHistoryServices: EmployeeHistoryServices,
    private teamService: TeamService,
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    const authUser = this.authService.getAuthUser();
    this.isSuperAdmin = authUser?.roleName === 'SUPER_ADMIN';

    const idParam = this.route.snapshot.paramMap.get('id');

    if (!this.isSuperAdmin) {
      this.employeeId = authUser?.id ?? null;
    } else if (idParam && !isNaN(Number(idParam))) {
      this.employeeId = Number(idParam);
    }

    this.loadTeamMembers();
  }

  loadTeamMembers() {
    this.loadingMembers = true;
    const request$ = this.isSuperAdmin
      ? this.employeeHistoryServices.getAllEmployeesForSuperAdmin()
      : this.teamService.getTeamMembers();

    request$.subscribe({
      next: (res) => {
        this.teamMembers = res.data || [];
        this.loadingMembers = false;

        if (this.employeeId) {
          this.loadHistory(1);
        } else if (this.isSuperAdmin && this.teamMembers.length > 0) {
          this.employeeId = this.teamMembers[0].id;
          this.loadHistory(1);
        }
      },
      error: () => {
        this.loadingMembers = false;
        this.toast.error('Failed to load team members');
      }
    });
  }

  isCreationAction(type: string): boolean {
    return this.creationActions.includes(type);
  }

  get selectedMember(): TeamMember | undefined {
    return this.teamMembers.find(m => m.id === this.employeeId);
  }

  toggleDropdown() {
    if (!this.isSuperAdmin) return;
    if (this.loadingMembers || this.teamMembers.length === 0) return;
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectEmployee(member: TeamMember) {
    if (!this.isSuperAdmin) return;
    this.dropdownOpen = false;
    if (this.employeeId === member.id) return;
    this.employeeId = member.id;
    this.router.navigate(['/master/history/employee-history', this.employeeId]);
    this.loadHistory(1);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.employee-dropdown')) {
      this.dropdownOpen = false;
    }
  }

  loadHistory(targetPage: number) {
    if (!this.employeeId) return;
    if (targetPage < 1) return;
    if (this.totalPages && targetPage > this.totalPages) return;

    this.page = targetPage;
    this.loading = true;

    this.employeeHistoryServices.getEmployeeHistory(this.employeeId, this.page, this.limit).subscribe({
      next: (res) => {
        this.employeeName = res.employee?.name || '';
        this.history = res.data || [];
        this.total = res.pagination?.total || 0;
        this.totalPages = res.pagination?.totalPages || 1;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.toast.error(err.error?.message || 'Failed to load employee history');
      }
    });
  }

  goToPage(p: number) {
    if (p === this.page || p < 1 || p > this.totalPages) return;
    this.loadHistory(p);
  }

  prevPage() {
    this.goToPage(this.page - 1);
  }

  nextPage() {
    this.goToPage(this.page + 1);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.page;
    const delta = 1;
    const pages: number[] = [];

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== -1) {
        pages.push(-1);
      }
    }
    return pages;
  }

  get rangeStart(): number {
    return this.total === 0 ? 0 : (this.page - 1) * this.limit + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.page * this.limit, this.total);
  }

  getTypeConfig(type: string) {
    return this.typeConfig[type] || { icon: 'history', color: 'slate', label: type };
  }

  humanizeRole(role: string | undefined | null): string {
    if (!role) return 'Unassigned';
    return role
      .toLowerCase()
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  trackByEntry(index: number, item: HistoryEntry) {
    return item.id;
  }
}