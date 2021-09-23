import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  resetting: boolean;
  step = 1;
  constructor(private fb: FormBuilder, private title: Title, private authservice: AuthService, private message: NzMessageService) {
    this.title.setTitle('Reset Password');
   }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      username: [null, Validators.required]
    });
  }


  submitForm() {
    for (const i in this.resetForm.controls) {
      if (this.resetForm.controls.hasOwnProperty(i)) {
        this.resetForm.controls[i].markAsDirty();
        this.resetForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.resetForm.valid) {
      this.resetting = true;
      this.resetForm.disable();
      this.authservice.sendNewPassword(this.resetForm.value).subscribe((data: any) => {
        this.resetting = false;
        this.resetForm.enable();
        if (data.status === 'success') {
          this.message.success(data.message);
          this.step = 2;
        }
      }, (error: any) => {
        this.resetForm.enable();
        this.resetting = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            this.resetForm.setErrors({
              badRequest: error.error.message
            });
          } else if (error.status === 401) {
            this.resetForm.setErrors({
              unAuthorized: error.error.message
            });
          }
        }
      });
    }
  }
}
