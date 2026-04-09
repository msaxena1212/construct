import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, TitleStrategy } from '@angular/router';
import Swal from 'sweetalert2';
import { Authservice } from '../../@auth/auth-material/authservice';
import { TopLoaderservice } from '../../@shared/services/top-loaderservice';
import { switchMap, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../@shared/material/material-module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AgGridModule } from 'ag-grid-angular';


@Component({
  selector: 'app-master',
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressBarModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LoadingBarHttpClientModule, AgGridModule
  ],
  templateUrl: './master.html',
  styleUrl: './master.css',
})
export class Master implements OnInit, AfterContentChecked, DoCheck {
  showAndProfile: boolean = false
  showList: boolean = false;
  classList: any;
  isRemarkActive: boolean = true
  nextElementSibling: any;
  navIndexvalue: any = null;
  progres: boolean = true;
  currentRoute: any;
  subscription: any;
  isSidebarCollapsed: boolean = false;


  constructor(public dialog: MatDialog, private changeDref: ChangeDetectorRef,
    private router: Router, private activatedRoute: ActivatedRoute,
    private lodaerService: TopLoaderservice, private _authservice: Authservice,
  ) {

    let i = Number(localStorage.getItem('index'));
    this.navIndexvalue = i;
    const sidebarState = localStorage.getItem('sidebarCollapsed');
    this.isSidebarCollapsed = sidebarState === 'true';

    let clip: any = document.getElementById('clip');
    // if(this.navIndexvalue){
    //   clip.classList.add('rotate');
    // }else{
    //   clip.classList.remove('rotate');
    // }
  }
  navData = [
    {
      menuitem: 'Dashboard', routevalue: 'dashboard',
    },
    {
      menuitem: 'User Management',
      subMenu: [
        { submenuitem: 'Role', routevalue: 'user-management/rbacmaster/rbac-role-master' },
        { submenuitem: 'Menu', routevalue: 'user-management/rbacmaster/user-master' },
      ]
    },
    {
      menuitem: 'Projects', routevalue: 'exotel',
    },
    {
      menuitem: 'Team Management', routevalue: 'course-management',
    },
    {
      menuitem: 'Contracts', routevalue: 'content-library',
    },
    {
      menuitem: 'Tasks', routevalue: 'assessment-library',
    },
    {
      menuitem: 'Calendar', routevalue: 'assessment-management',
    },
    {
      menuitem: 'Timeline', routevalue: 'selfassessment-survey',
    },
    {
      menuitem: 'Labor', routevalue: 'selfassessment-survey',
    },
    {
      menuitem: 'Reports', routevalue: 'selfassessment-survey',
    },
    {
      menuitem: 'Vendors', routevalue: 'selfassessment-survey',
    },
    {
      menuitem: 'Materials', routevalue: 'selfassessment-survey',
    },
    {
      menuitem: 'Settings', routevalue: 'selfassessment-survey',
    },
    // {
    //   menuitem: 'Masters',
    //   subMenu: [
    //     // { submenuitem: 'Vehicles', routevalue: 'allmastertable/course-type' },
    //     // { submenuitem: 'Drivers', routevalue: 'allmastertable/category-master' },
    //     // { submenuitem: 'Routes', routevalue: 'allmastertable/skill-master' },
    //     // { submenuitem: 'Role', routevalue: 'allmastertable/role'},
    //     // { submenuitem: 'Employee Type', routevalue: 'allmastertable/employee-type'},
    //     // { submenuitem: 'Job Type', routevalue: 'allmastertable/job-type'},
    //     // { submenuitem: 'Location', routevalue: 'allmastertable/location'},
    //     // { submenuitem: 'Marital Status', routevalue: 'allmastertable/maritalstatus'},
    //   ]
    // },
    // {
    //   menuitem: 'Employee Master',
    //   subMenu: [
    //     { submenuitem: 'Employee', routevalue: 'employee-master/employee' },
    //     { submenuitem: 'Punch IN/OUT', routevalue: 'employee-master/punch-in-out'},
    //     {submenuitem:'Attendance'},
    //     {submenuitem:'Payslip'},
    //     {submenuitem:'Full N Final Settlement'},
    //     {submenuitem:'Apply Resignation'},
    //   ]
    // },
    // {
    //   menuitem: 'Leave',
    //   subMenu: [
    //     {submenuitem:'Leave Master'},
    //   ]
    // },
    // {
    //   menuitem: 'Admin Setting',
    //   subMenu: [
    //     {submenuitem:'Enum Type'},
    //     {submenuitem:'Enum Value'},
    //   ]
    // },
    // {
    //   menuitem: 'Ledger/Accounts (MVP)', routevalue: './ledger-accounts'
    // },
    // {
    //   menuitem: 'Dashboard & Reports',routevalue: './dashboard & reports'
    // },
    // {
    //   menuitem: 'All Transactions', routevalue: './all-transation'
    // },
    // {
    //   menuitem: 'Roles and Access',
    //   subMenu: [
    //     { submenuitem: 'User', routevalue: 'roles-and-access/user' },
    //     { submenuitem: 'Assign Role and Access', routevalue: 'roles-and-access/assign-roles' },
    //     {submenuitem:'Dealer',routevalue:'roles-and-access/dealer'},
    //     {submenuitem:'Driver',routevalue:'roles-and-access/drivers'}
    //   ]
    // // },
    // {
    //   menuitem: 'Cluster,Zone & City Mapping', routevalue: 'inventory/cluster-city-list'
    //   },
    // {
    //   menuitem: 'Inventory',
    //   subMenu: [{ submenuitem: 'Vendor Creation', routevalue: 'inventory/inventoryform' },
    //   { submenuitem: 'Item Creation', routevalue: 'inventory/item-creation' },
    //   { submenuitem: 'View And Update Inventory', routevalue: 'inventory/view-inventory-list' },
    //   // { submenuitem: 'Transfer/Replace/Remove Asset', routevalue: 'inventory/transferring-table' },
    //     //  {submenuitem: 'Master Of Cluster', routevalue: 'inventory/master-of-cluster'}
    //   ]
    // },

    // {
    //   menuitem: 'Document Verification',
    //   subMenu: [{ submenuitem: 'Driver', routevalue: './document/driver-list' },
    //   { submenuitem: 'Dealer', routevalue: './document/dealer2' },
    // ]
    // },
    // {
    //   menuitem: 'Tagging', routevalue: './tagging'
    // },
    // {
    //   menuitem: 'Enable-Payment-Type',routevalue: './payment-type'
    // },

    // {
    //   menuitem:'Dealer Scheme', routevalue:'./dealer-scheme'
    // },
    // {
    //   menuitem: 'Geofencing Alert',
    //   subMenu: [
    //     { submenuitem: 'Battery Movement Action', routevalue: 'geofencing-alert/geofecing-mov-action' },
    //     { submenuitem: 'Battery Charging Action', routevalue: 'geofencing-alert/geofecing-charging-action' }
    //   ]
    // },
    // {
    //   menuitem: 'Service Request',
    //   subMenu: [
    //     { submenuitem: 'Manage SR', routevalue: 'service-request/manage-sr' },
    //     { submenuitem: 'SR Reports', routevalue: 'service-request/sr-reports' },
    //     { submenuitem: 'Mapping SR', routevalue: 'service-request/mapping-sr' }
    //   ]

    // },
    // {
    //   menuitem: 'Penalty Config',
    //   subMenu: [
    //     { submenuitem: 'Absent Days', routevalue: 'penalty-cofig/absent-days' },
    //     { submenuitem: 'Lost Item', routevalue: 'penalty-cofig/lost-item' },


    //   ]
    // },
  ]
  toggleaccordian: boolean = false
  toggleAccordian(event: any, index: any, name: any) {
    // this.toggleaccordian=!this.toggleaccordian
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', this.isSidebarCollapsed.toString());
  }


  nav1: any[] = []
  ngOnInit(): void {
    //  this.side.SideList().subscribe((res:any)=>{
    //   this.navData=res.data
    //   // console.log("data",this.navData);
    //  })
    window.addEventListener('click', (event) => {
      this.showAndProfile = false;
      event.stopPropagation();
      // //console.log("body clicked")
    })
    window.addEventListener('click', (event) => {
      event.stopPropagation()
      this.showList = false;
    })
    this.event();
  }
  ngDoCheck(): void {

    let url = this.router.url;
    this.currentRoute = url
    // console.log(this.currentRoute
    //   , '<--current route');
  }

  ngAfterContentChecked(): void {
    this.lodaerService.showHideLoader().subscribe(
      (res: boolean) => {
        this.progres = res;
      }
    )
    this.changeDref.detectChanges();
  }

  navToggel(index: any, nav: any, event: Event) {

    // 👉 If menu has NO submenu, do nothing
    if (!nav.subMenu || nav.subMenu.length === 0) {
      return;
    }

    // 👉 Stop navigation for Masters
    event.preventDefault();
    event.stopPropagation();

    // 👉 Toggle Masters submenu
    if (this.navIndexvalue === index) {
      this.navIndexvalue = null;
      localStorage.removeItem('index');
    } else {
      this.navIndexvalue = index;
      localStorage.setItem('index', index.toString());
    }
  }

  toggleProfile(e: any) {
    e.stopPropagation()
    this.showAndProfile = !this.showAndProfile

  }
  proflieCLick(e: any) {
    e.stopPropagation()
    this.showAndProfile = false;


  }
  logoutCLick(e: any) {
    e.stopPropagation()
    this.showAndProfile = false;

  }

  showDropdown(e: any) {
    e.stopPropagation();
    this.showList = !this.showList;
    console.log(e, 'PPPPPPPPPPPPPPPPPPPPPPPPP')
  }
  profile() {
    Swal.fire("Coming Soon..")
  }
  onLogout() {
    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,

      cancelButtonColor: "#063178",
      confirmButtonColor: "#f44336",
      confirmButtonText: 'Log out',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.value) {
        this._authservice.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('EmpMainId');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  MyDatadata: any;
  newArr: any;
  event() {
    let data = {
      userType: "Admin"
    }
    // this.subscription = timer(0, 10*5000).pipe(
    //   switchMap(() => this.battery.postNoti(data))).subscribe((res:any)=>{
    //    this.MyDatadata=res.data
    //    this.newArr=this.MyDatadata.map(i=>i.id)
    //     if(res.data.length>=1){
    //      if (this.dialog.openDialogs.length>0)
    //      {
    //       // console.log(1);

    //     }else{
    //     const dialogRef = this.dialog.open(BatteryAlertComponent, {
    //       width: '550px',
    //        disableClose: true ,
    //       data:{name:this.MyDatadata}
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log('The dialog was closed');
    //     });
    //   }
    //   }else{
    //     return ;
    //   }
    //   })
  }

}