import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegistering: boolean = false;
  showLoader: boolean = false;
  isSubmited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toast: ToastrService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });

    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.auth.getAuthUser()) {
      this.route.navigate(['/master/dashboard']);
    }
  }

  get login() {
    return this.loginForm.controls;
  }

  get register() {
    return this.registerForm.controls;
  }

  toggleView() {
    this.isRegistering = !this.isRegistering;
    this.isSubmited = false;
  }

  // loginFormSubmit() {
  //   this.isSubmited = true;
  //   if (this.loginForm.invalid) {
  //     this.toast.error('Please enter valid credentials', 'Validation Error');
  //     return;
  //   }
    
  //   this.showLoader = true;
  //   this.auth.signIn(this.loginForm.value).subscribe({
  //     next: (res) => {
  //       this.showLoader = false;
  //       this.toast.success('Welcome back!', 'Login Successful');
  //       this.route.navigate(['/master/dashboard']);
  //     },
  //     error: (err) => {
  //       this.showLoader = false;
  //       this.toast.error(err.error?.message || 'Login failed', 'Error');
  //     }
  //   });
  // }

  loginFormSubmit() {
  this.isSubmited = true;

  if (this.loginForm.invalid) {
    this.toast.error('Please enter valid credentials', 'Validation Error');
    return;
  }

  this.showLoader = true;

  this.auth.signIn(this.loginForm.value).subscribe({
    next: (res) => {

      this.auth.getRolePermissions(res.role_id).subscribe({
        next: (permissionRes) => {

          localStorage.setItem(
            'permissions',
            JSON.stringify(permissionRes.data)
          );

          this.showLoader = false;
          this.toast.success('Welcome back!', 'Login Successful');
          this.route.navigate(['/master/dashboard']);
        },
        error: (err) => {
          this.showLoader = false;
          this.toast.error(
            err.error?.message || 'Permission loading failed',
            'Error'
          );
        }
      });

    },
    error: (err) => {
      this.showLoader = false;
      this.toast.error(
        err.error?.message || 'Login failed',
        'Error'
      );
    }
  });
}

  registerFormSubmit() {
    this.isSubmited = true;
    if (this.registerForm.invalid) {
      this.toast.error('Please fix the validation errors', 'Validation Error');
      return;
    }
    
    this.showLoader = true;
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.showLoader = false;
        this.toast.success('Company Registered and Login Successful!', 'Welcome');
        this.route.navigate(['/master/dashboard']);
      },
      error: (err) => {
        this.showLoader = false;
        this.toast.error(err.error?.message || 'Registration failed', 'Error');
      }
    });
  }
}
