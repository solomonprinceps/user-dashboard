import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const route: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  }
];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class ChangePasswordModule { }
