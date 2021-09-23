import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordVisible = false;
  loggingIn: boolean;
  routeParams: Params;
  constructor(private fb: FormBuilder, private title: Title, 
    private service: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { 
      this.title.setTitle('Login');
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.routeParams = params;
    });
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  submitForm() {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.loginForm.valid) {
      this.loggingIn = true;
      this.loginForm.disable();
      this.service.login(this.loginForm.value).subscribe((user: any) => {
        this.loggingIn = false;
        this.loginForm.enable();
        this.service.storeToken(user.token);
        this.service.storeUser(user.borrower);
        if (user.firstlogin === '0') {
          this.router.navigate(['/change-password'], {queryParams: { redirectTo: 'dashboard'}});
        } else {
          if (this.routeParams.continue) {
            this.router.navigateByUrl(this.routeParams.continue);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      }, (error: any) => {
        this.loginForm.enable();
        this.loggingIn = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            this.loginForm.setErrors({
              badRequest: error.error.message
            });
          } else if (error.status === 401) {
            this.loginForm.setErrors({
              unAuthorized: error.error.message
            });
          }
        }
      });
    }
  }
}
