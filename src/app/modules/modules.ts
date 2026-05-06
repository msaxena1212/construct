import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth/auth';
import { SidebarService } from '../shared/services/sidebar.service';
import { SidebarMenu } from '../shared/interfaces/sidebar-menu.interface';
import { AuthInterface } from '../shared/interfaces/auth.interface';
import { environment } from '../../environments/environment';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modules',
  standalone: false,
  templateUrl: './modules.html',
  styleUrl: './modules.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }),
        animate('200ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' })),
      ]),
    ]),
  ],
})
export class Modules implements OnInit, AfterContentChecked, DoCheck {
  showAndProfile: boolean = false;
  showList: boolean = false;
  navIndexvalue: any = null;
  currentRoute: any;
  isSidebarCollapsed: boolean = false;
  currentDateTime: string = '';
  currentUser!: AuthInterface | null;
  navData: SidebarMenu[] = [];
  serverUrl = environment.serverUrl;

  constructor(
    private changeDref: ChangeDetectorRef,
    private router: Router,
    private _authservice: AuthService,
    private sidebarService: SidebarService
  ) {
    let i = Number(localStorage.getItem('index'));
    this.navIndexvalue = i;
    const sidebarState = localStorage.getItem('sidebarCollapsed');
    this.isSidebarCollapsed = sidebarState === 'true';
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', this.isSidebarCollapsed.toString());
  }

  ngOnInit(): void {
    this._authservice.userS.subscribe((user: AuthInterface | null) => {
      this.currentUser = user;
    });

    this.sidebarService.getSidebarHierarchy().subscribe({
      next: (data) => this.navData = data,
      error: (err) => console.error("Sidebar load error", err)
    });

    window.addEventListener('click', (event) => {
      this.showAndProfile = false;
      this.showList = false;
    });

    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  ngDoCheck(): void {
    this.currentRoute = this.router.url;
  }

  ngAfterContentChecked(): void {
    this.changeDref.detectChanges();
  }

  updateDateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    this.currentDateTime = `${now.toLocaleDateString('en-IN', options)} , ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  }

  navToggel(index: any, nav: any, event: Event) {
    if (!nav.subMenu || nav.subMenu.length === 0) return;
    event.preventDefault();
    event.stopPropagation();

    if (this.navIndexvalue === index) {
      this.navIndexvalue = null;
      localStorage.removeItem('index');
    } else {
      this.navIndexvalue = index;
      localStorage.setItem('index', index.toString());
    }
  }

  showDropdown(e: any) {
    e.stopPropagation();
    this.showList = !this.showList;
  }

  profile() {
    this.router.navigate(['/master/profile']);
  }

  onLogout() {
    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#063178',
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Log out',
      cancelButtonText: 'Not Now',
    }).then((result) => {
      if (result.value) {
        this._authservice.logout();
      }
    });
  }
}
