import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class ForgotPasswordModule { }
