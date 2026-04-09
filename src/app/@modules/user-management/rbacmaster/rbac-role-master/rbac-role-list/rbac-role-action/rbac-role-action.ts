import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { RbacRoleDialog } from '../rbac-role-dialog/rbac-role-dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../../../@shared/material/material-module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rbac-role-action',
  standalone: true,
  imports: [
    CommonModule, 
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
  templateUrl: './rbac-role-action.html',
  styleUrl: './rbac-role-action.css',
})
export class RbacRoleAction implements ICellRendererAngularComp {
  isChecked = false;
  checkedActive: any;
  checkedAuther: any;
  checkBox: any;
  role_id: any;
  assignAction: any;
  public cellValue: any;
  public params: any;
  
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router: Router,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.params?.context?.componentParent) {
      this.assignAction = this.params.context.componentParent.assignAction;
    }

    if (!this.assignAction) {
      this.assignAction = { Write: true, Read: true, Edit: true, Delete: true };
    }
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.cellValue = this.getValueToDisplay(params);
    
    if (params.context?.componentParent) {
      this.assignAction = params.context.componentParent.assignAction;
    }

    if (!this.assignAction) {
      this.assignAction = { Write: true, Read: true, Edit: true, Delete: true };
    }
  }

  getValueToDisplay(params: ICellRendererParams) {
    this.role_id = params.data.role_master_id;
    return params.valueFormatted ? params.valueFormatted : params.data.role_master_id;
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  edit() {
    this.router.navigate(["/master/user-management/rbacmaster/rbac-role-master/rbac-role-create"], {
      queryParams: { role_master_id: this.cellValue }
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  // delete(e: any) {
  //   e.stopPropagation();
    
  //   Swal.fire({
  //     title: 'Are you sure want to remove?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     cancelButtonColor: "#f44336",
  //     confirmButtonColor: "#3f51b5",
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No'
  //   }).then((result) => {
  //     if (result.value) {
  //       // Call delete service here
  //       // this._rbackService.deleteRoleAssign(this.role_id).subscribe((res: any) => {
  //       //   window.location.reload();
  //       // });
        
  //       Swal.fire(
  //         'Deleted!',
  //         'Role has been deleted successfully.',
  //         'success'
  //       );
        
  //       // Notify parent to refresh grid
  //       if (this.params?.context?.componentParent?.onDeleteRole) {
  //         this.params.context.componentParent.onDeleteRole(this.params.data);
  //       }
  //     }
  //   });
  // }

  openDialog(e?: any) {
    if (e) {
      e.stopPropagation();
    }
    
    const dialogRef = this.dialog.open(RbacRoleDialog, {
      data: { role_master_id: this.cellValue }
    });
      
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.params?.context?.componentParent?.loadMockData) {
        this.params.context.componentParent.loadMockData();
      }
    });
  }
}