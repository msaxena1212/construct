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

  // Get Single Request Details
  // getRequestById(id: number) {
  //   this.projectService.getStockRequestById(id).subscribe({
  //     next: (res: any) => {
  //       this.selectedRequest = res.data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // Approve Request
  approveRequest(id: number) {
    console.log('Approved:', id);

    // call approve api here
  }

  // Reject Request
  rejectRequest(id: number) {
    console.log('Rejected:', id);

    // call reject api here
  }
}