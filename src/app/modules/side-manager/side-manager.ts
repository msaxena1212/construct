import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../projects/services/project-service';

@Component({
  selector: 'app-side-manager',
  standalone: false,
  templateUrl: './side-manager.html',
  styleUrl: './side-manager.scss',
})
export class SideManager implements OnInit {
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
}