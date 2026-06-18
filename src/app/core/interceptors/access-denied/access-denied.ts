import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-access-denied',
  standalone: true,
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.scss',
})
export class AccessDenied {
  
  constructor(private router: Router) {}

  goBack() {
    // window.history.back();
    this.router.navigate(['/master/dashboard']);
  }
}
