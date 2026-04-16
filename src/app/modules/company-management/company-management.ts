import { Component, OnInit } from '@angular/core';
import { CompanyService } from './services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-management',
  standalone: false,
  templateUrl: './company-management.html',
  styleUrls: ['./company-management.scss'],
})
export class CompanyManagement implements OnInit {
  companies: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'status', 'actions'];

  constructor(
    private companyService: CompanyService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe({
      next: (res) => {
        this.companies = res.data;
      },
      error: (err) => {
        if (err.status === 403) {
           this.toast.error("You don't have super admin access.");
        } else {
           this.toast.error("Failed to load companies");
        }
      }
    });
  }

  toggleCompanyStatus(company: any) {
    const newStatus = !company.isActive;
    this.companyService.toggleStatus(company.id, newStatus).subscribe({
       next: (res) => {
          this.toast.success(res.message || 'Status updated successfully');
          this.loadCompanies();
       },
       error: (err) => {
          this.toast.error(err.error?.message || 'Failed to update status');
       }
    });
  }
}
