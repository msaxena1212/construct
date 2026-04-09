import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit, AfterViewInit {
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
    private route: Router,
    private toast: ToastrService,
    private renderer: Renderer2,
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    let data: any = localStorage.getItem('signInUser');
    let data1 = JSON.parse(data);
    if (data1.email) {
      this.route.navigate(['/master/dashboard']);
    }
  }

  get login() {
    return this.loginForm.controls;
  }

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
      this.route.navigate(['/master/dashboard']);
    }, 500);
  }
}
