import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../projects/services/project-service';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-approval',
  standalone: false,
  templateUrl: './stock-approval.html',
  styleUrl: './stock-approval.scss',
})
export class StockApproval implements OnInit {
  stockRequests: any[] = [];
  selectedRequest: any = null;

  loading = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getAllRequests();
  }

  // Get All Requests
  getAllRequests() {
    this.loading = true;

    this.projectService.getAllStockRequests().subscribe({
      next: (res: any) => {
        this.stockRequests = res.data || [];
        console.log("ddkjdkkdjkkdjf",res.data)
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  // Approve Request
approveRequest(id: number) {

  this.projectService.approveStockRequest(id).subscribe({
    next: (res: any) => {

      console.log('Approved Successfully');

      // UI Update
      const request = this.stockRequests.find(r => r.id === id);

      if (request) {
        request.status = 'approved';
      }

    },
    error: (err) => {
      console.log(err);
    }
  });
}

  // Reject Request
rejectRequest(id: number) {

  this.projectService.rejectStockRequest(id).subscribe({
    next: (res: any) => {

      console.log('Rejected Successfully');

      // UI Update
      const request = this.stockRequests.find(r => r.id === id);

      if (request) {
        request.status = 'rejected';
      }

    },
    error: (err) => {
      console.log(err);
    }
  });
}

showRequestDialog = false;

dialogData = {
  title: '',
  subtitle: '',
  action: '',
  requestId: null as number | null
};

openApproveDialog(id: number) {
  this.dialogData = {
    title: 'Approve Request',
    subtitle: 'Are you sure you want to approve this request?',
    action: 'approve',
    requestId: id
  };

  this.showRequestDialog = true;
}

openRejectDialog(id: number) {
  this.dialogData = {
    title: 'Reject Request',
    subtitle: 'Are you sure you want to reject this request?',
    action: 'reject',
    requestId: id
  };

  this.showRequestDialog = true;
}

confirmAction() {

  if (this.dialogData.action === 'approve') {
    this.approveRequest(this.dialogData.requestId!);
  }

  if (this.dialogData.action === 'reject') {
    this.rejectRequest(this.dialogData.requestId!);
  }

  this.closeDialog();
}

closeDialog() {
  this.showRequestDialog = false;
}
}