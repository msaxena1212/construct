import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Authservice } from '../auth-material/authservice';
import { MaterialModule } from '../../@shared/material/material-module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, MaterialModule, MatIconModule, MatProgressSpinnerModule,
    RouterModule, MatButtonModule, MatFormFieldModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, AfterViewInit {
  @ViewChild('loginTemp') temp!: ElementRef;
  loginForm: any;
  isLogIn: boolean = false;
  loginData: any;
  loading: boolean = false;
  errorMessage: any;
  wrong: any;
  empMainId: any;
  showLoader: boolean = false;
  isSubmited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: Authservice,
    private route: Router,
    private toast: ToastrService,
    private renderer: Renderer2

  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }
  ngOnInit(): void { }

  ngAfterViewInit() {
    let data: any = localStorage.getItem('signInUser');
    let data1 = JSON.parse(data)
    if (data1.email) {
      this.renderer.setStyle(
        this.temp.nativeElement, 'display', 'none');
      this.route.navigate(['/master/dashboard'])
    }
  }

  get login() { return this.loginForm.controls };

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  // loginFormSubmit() {
  //   if (this.loginForm.invalid) {
  //     this.toast.error('Enter an Valid email', 'Something Went Wrong')
  //     return;
  //   }
  //   this.isSubmited = true;
  //   this.showLoader = true;
  //   let data = {
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password
  //   }
  //   this._authService.signIn(data).subscribe(
  //     (res:any) => {
  //       this.showLoader = false;
  //       if(res.code === "404"){
  //         return
  //       }else if(res.code === "200"){
  //         this.toast.success('Welcome to Zyno Construction Management', 'Login Successful');
  //         this.route.navigate(['master']);
  //       }
  //     },
  //     (err:any) => {
  //       this.showLoader = false;
  //       if (err.status === 404) {
  //         //console.log(err)
  //         this.toast.error("You have entered an invalid credentials");
  //       }
  //       else {
  //         this.toast.error('Invalid User & Password!','Error Message');
  //       }
  //     })
  // }

  loginFormSubmit() {
    this.isSubmited = true;

    if (this.loginForm.invalid) {
      this.toast.error('Please enter valid credentials', 'Validation Error');
      return;
    }
    this.showLoader = true;
    setTimeout(() => {
      const userData = {
        email: this.loginForm.value.email,
      };
      localStorage.setItem('signInUser', JSON.stringify(userData));

      this.showLoader = false;
      this.toast.success('Welcome to Zyno Construction Management', 'Login Successful');
      this.route.navigate(['/master/dashboard']).then(() => {
        console.log('Navigation successful');
      }).catch((error) => {
        console.error('Navigation error:', error);
      });
    }, 500);
  }

}
