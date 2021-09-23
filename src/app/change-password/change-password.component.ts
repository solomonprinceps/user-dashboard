import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isProcessing: boolean;
  routeParam: Params;
  constructor(private fb: FormBuilder, private title: Title, 
    private authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
      this.title.setTitle('Change Password');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param: Params) => {
      this.routeParam = param;
    });
    this.changePasswordForm = this.fb.group({
      oldpassword: [null, [Validators.required]],
      newpassword: [null, [Validators.required]],
      confirmpassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.changePasswordForm.controls.confirmpassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePasswordForm.controls.newpassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  }


  changePassword(): void {
    for (const i in this.changePasswordForm.controls) {
      if (this.changePasswordForm.controls.hasOwnProperty(i)) {
        this.changePasswordForm.controls[i].markAsDirty();
        this.changePasswordForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.changePasswordForm.valid) {
      const {oldpassword, newpassword} = this.changePasswordForm.value;
      this.changePasswordForm.disable();
      this.isProcessing = true;
      this.authservice.changePassword({oldpassword, newpassword}).subscribe((data: any) => {
        this.isProcessing = false;
        this.changePasswordForm.enable();
        if (data.status === 'success') {
          this.changePasswordForm.reset();
          if (this.routeParam.redirectTo) {
            this.router.navigateByUrl(this.routeParam.redirectTo);
          }
        }
      }, (error: any) => {
        this.changePasswordForm.enable();
        this.isProcessing = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            this.changePasswordForm.setErrors({
              badRequest: error.error.message
            });
          } else if (error.status === 401) {
            this.changePasswordForm.setErrors({
              unAuthorized: error.error.message
            });
          }
        }
      });
    }
  }
}
