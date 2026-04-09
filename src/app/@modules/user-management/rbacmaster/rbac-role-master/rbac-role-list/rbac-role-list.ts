import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridApi, GridReadyEvent, ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../../../../../@shared/material/material-module';
import { AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RbacRoleDialog } from './rbac-role-dialog/rbac-role-dialog';
import { RbacRoleAction } from './rbac-role-action/rbac-role-action';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-rbac-role-list',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToastrModule,
    MaterialModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './rbac-role-list.html',
  styleUrl: './rbac-role-list.css',
})
export class RbacRoleList implements OnInit {
  errorMessage: any;
  products: any = [];
  id: any;
  rowClass: string = 'rowClass';
  private gridApi!: GridApi<any>;
  rowData: any[] = [];
  assignAction: any = { Write: true, Read: true, Edit: true, Delete: true };
  loginUser: any;

  public context: any;

  public columnDefs: ColDef[] = [
    {
      headerName: 'S. No',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      filter: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 100,
      maxWidth: 150
    },
    {
      headerName: 'Role Name',
      field: 'role_master_name',
      sortable: true,
      filter: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 2,
      minWidth: 200
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 150,
      cellStyle: (params) => {
        if (params.value === 'Active') {
          return { color: 'green', fontWeight: 'bold' };
        } else if (params.value === 'Inactive') {
          return { color: 'red', fontWeight: 'bold' };
        }
        return null;
      }
    },
    {
      headerName: 'Action',
      field: 'action',
      flex: 1,
      minWidth: 150,
      cellRenderer: RbacRoleAction,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
      },
      sortable: false,
      filter: false,
      cellClass: 'grid-cell-centered'
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(
    public dialog: MatDialog,
    private location: Location
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit(): void {

    const lg: any = localStorage.getItem('signInUser');
    if (lg) {
      this.loginUser = JSON.parse(lg);
      console.log(this.loginUser, 'user login login user');
    }

    this.loadMockData();
  }

  loadMockData() {
    this.rowData = [
      {
        role_master_id: 1,
        role_master_name: 'Administrator',
        status: 'Active'
      },
      {
        role_master_id: 2,
        role_master_name: 'HR Manager',
        status: 'Active'
      },
      {
        role_master_id: 3,
        role_master_name: 'Employee',
        status: 'Active'
      },
      {
        role_master_id: 4,
        role_master_name: 'Department Head',
        status: 'Active'
      },
      {
        role_master_id: 5,
        role_master_name: 'Recruiter',
        status: 'Active'
      },
      {
        role_master_id: 6,
        role_master_name: 'Payroll Manager',
        status: 'Active'
      },
      {
        role_master_id: 7,
        role_master_name: 'Team Lead',
        status: 'Active'
      },
      {
        role_master_id: 8,
        role_master_name: 'Finance Manager',
        status: 'Inactive'
      },
      {
        role_master_id: 9,
        role_master_name: 'IT Support',
        status: 'Active'
      },
      {
        role_master_id: 10,
        role_master_name: 'Guest',
        status: 'Inactive'
      },
      {
        role_master_id: 11,
        role_master_name: 'Project Manager',
        status: 'Active'
      },
      {
        role_master_id: 12,
        role_master_name: 'Auditor',
        status: 'Active'
      }
    ];

    console.log('Row Data Loaded:', this.rowData);

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    console.log('Grid Ready', this.gridApi);

    if (this.rowData && this.rowData.length > 0) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }

    this.gridApi.sizeColumnsToFit();
  }

  onPageSizeChanged() {
    if (!this.gridApi) return;

    const value = Number(
      (document.getElementById('page-size') as HTMLInputElement)?.value
    );

    this.gridApi.setGridOption('paginationPageSize', value);
  }

  onFilterTextBoxChanged() {
    if (!this.gridApi) {
      return;
    }

    const value = (document.getElementById('filter-text-box') as HTMLInputElement)?.value;
    this.gridApi.setGridOption('quickFilterText', value);
  }

  onCellClicked(e: any) {
    if (e.column.getColId() === 'action') {
      return;
    }

    console.log('Cell clicked:', e.data);
    this.openRoleDialog(e.data);
  }

  onDeleteRole(data: any) {
    console.log('Delete role called from parent:', data);
    this.rowData = this.rowData.filter(role => role.role_master_id !== data.role_master_id);
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rowData);
    }
  }

  openRoleDialog(data: any) {
    const dialogRef = this.dialog.open(RbacRoleDialog, {
      width: '400px',
      data: {
        role_master_id: data.role_master_id,
        role_master_name: data.role_master_name,
        status: data.status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
      if (result) {
        this.loadMockData();
      }
    });
  }
}